import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const projectRoot = process.cwd();
const motionDirectory = path.join(projectRoot, "public", "motion");
const originalDirectory = path.join(
  projectRoot,
  "design-assets",
  "motion-originals"
);
const previewDirectory = path.join(projectRoot, ".asset-optimization-preview");
const applyChanges = process.argv.includes("--apply");
const compareOnly = process.argv.includes("--compare-only");
const verifyOnly = process.argv.includes("--verify");
const outputDirectory = applyChanges ? motionDirectory : previewDirectory;
const sourceFiles = [
  "app/components/ArchiveMotionPoster.tsx",
  "app/components/LegendShowcase.tsx",
  "app/components/LateSpecialMotionPosters.tsx",
];

fs.mkdirSync(outputDirectory, { recursive: true });

const usedAssets = new Set();

for (const sourceFile of sourceFiles) {
  const source = fs.readFileSync(path.join(projectRoot, sourceFile), "utf8");

  for (const match of source.matchAll(/\/motion\/([^"']+)/g)) {
    usedAssets.add(match[1]);
  }
}

if (verifyOnly) {
  const missingAssets = [...usedAssets].filter(
    (filename) => !fs.existsSync(path.join(motionDirectory, filename))
  );

  console.log({ references: usedAssets.size, missingAssets });
  process.exit(missingAssets.length === 0 ? 0 : 1);
}

const results = [];

for (const filename of [...usedAssets].sort()) {
  if (path.extname(filename).toLowerCase() !== ".webp") continue;

  const sourceName = `${path.basename(filename, ".webp")}.png`;
  const inputPath = path.join(originalDirectory, sourceName);

  if (!fs.existsSync(inputPath)) continue;

  const metadata = await sharp(inputPath).metadata();
  const outputName = filename;
  const outputPath = path.join(outputDirectory, outputName);

  if (!compareOnly) {
    if (metadata.format === "webp") {
      fs.copyFileSync(inputPath, outputPath);
    } else {
      await sharp(inputPath)
        .webp({
          quality: metadata.hasAlpha ? 92 : 88,
          alphaQuality: 100,
          effort: 6,
          smartSubsample: true,
        })
        .toFile(outputPath);
    }
  }

  const beforeBytes = fs.statSync(inputPath).size;
  const afterBytes = fs.statSync(outputPath).size;

  let psnr;

  if (compareOnly && metadata.format !== "webp") {
    const comparisonWidth = Math.min(metadata.width ?? 512, 512);
    const [original, optimized] = await Promise.all([
      sharp(inputPath)
        .resize({ width: comparisonWidth })
        .flatten({ background: "#05080b" })
        .removeAlpha()
        .raw()
        .toBuffer(),
      sharp(outputPath)
        .resize({ width: comparisonWidth })
        .flatten({ background: "#05080b" })
        .removeAlpha()
        .raw()
        .toBuffer(),
    ]);
    let squaredError = 0;

    for (let index = 0; index < original.length; index += 1) {
      const difference = original[index] - optimized[index];
      squaredError += difference * difference;
    }

    const meanSquaredError = squaredError / original.length;
    psnr = Number(
      (10 * Math.log10((255 * 255) / meanSquaredError)).toFixed(1)
    );
  }

  results.push({
    filename,
    outputName,
    width: metadata.width,
    height: metadata.height,
    alpha: Boolean(metadata.hasAlpha),
    beforeMB: Number((beforeBytes / 1024 / 1024).toFixed(2)),
    afterMB: Number((afterBytes / 1024 / 1024).toFixed(2)),
    savedPercent: Number(((1 - afterBytes / beforeBytes) * 100).toFixed(1)),
    ...(psnr ? { psnr } : {}),
  });
}

results.sort((left, right) => right.beforeMB - left.beforeMB);

const totals = results.reduce(
  (total, result) => ({
    beforeMB: total.beforeMB + result.beforeMB,
    afterMB: total.afterMB + result.afterMB,
  }),
  { beforeMB: 0, afterMB: 0 }
);

console.table(results);
console.log({
  mode: applyChanges ? "apply" : "preview",
  files: results.length,
  beforeMB: Number(totals.beforeMB.toFixed(2)),
  afterMB: Number(totals.afterMB.toFixed(2)),
  savedPercent: Number(
    ((1 - totals.afterMB / totals.beforeMB) * 100).toFixed(1)
  ),
});
