import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const MASTER_DIR = path.join(ROOT, "design-assets", "motion-originals");
const PUBLIC_DIR = path.join(ROOT, "public", "motion");
const DOCS_DIR = path.join(ROOT, "docs");

const CANVAS = {
  width: 1024,
  height: 1536,
  margin: 31,
};

const rounds = {
  "1": [
    {
      legend: "Ash",
      source: "ash-portrait-v2.png",
      master: "ash-portrait-v3.png",
      published: "ash-portrait-v3.webp",
      alphaThreshold: 16,
    },
    {
      legend: "Rampart",
      source: "rampart-portrait-v2.png",
      master: "rampart-portrait-v3.png",
      published: "rampart-portrait-v3.webp",
      alphaThreshold: 16,
    },
    {
      legend: "Gibraltar",
      source: "gibraltar-portrait-clean.png",
      master: "gibraltar-portrait-v2.png",
      published: "gibraltar-portrait-v2.webp",
      alphaThreshold: 16,
    },
    {
      legend: "Bloodhound",
      source: "bloodhound-portrait-v2.png",
      master: "bloodhound-portrait-v3.png",
      published: "bloodhound-portrait-v3.webp",
      alphaThreshold: 16,
    },
  ],
};

function parseArgs() {
  const args = new Set(process.argv.slice(2));
  const roundArg = process.argv.find((arg) => arg.startsWith("--round="));

  return {
    round: roundArg?.split("=")[1] ?? "1",
    verify: args.has("--verify"),
  };
}

async function alphaBounds(input, threshold) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let left = info.width;
  let top = info.height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const alpha = data[(y * info.width + x) * 4 + 3];

      if (alpha < threshold) continue;

      left = Math.min(left, x);
      top = Math.min(top, y);
      right = Math.max(right, x);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < 0) {
    throw new Error(`No visible pixels found in ${input}`);
  }

  return {
    left,
    top,
    right,
    bottom,
    width: right - left + 1,
    height: bottom - top + 1,
  };
}

async function normalizePortrait(config, verify) {
  const sourcePath = path.join(MASTER_DIR, config.source);
  const masterPath = path.join(MASTER_DIR, config.master);
  const publishedPath = path.join(PUBLIC_DIR, config.published);
  const sourceMetadata = await sharp(sourcePath).metadata();
  const before = await alphaBounds(sourcePath, config.alphaThreshold);
  const contentHeight = CANVAS.height - CANVAS.margin * 2;
  const scale = contentHeight / before.height;
  const scaledWidth = Math.round(sourceMetadata.width * scale);
  const scaledHeight = Math.round(sourceMetadata.height * scale);
  const left = Math.round((CANVAS.width - scaledWidth) / 2);
  const top = CANVAS.margin - Math.round(before.top * scale);

  if (!verify) {
    const resized = await sharp(sourcePath)
      .resize({
        width: scaledWidth,
        height: scaledHeight,
        fit: "fill",
        kernel: sharp.kernel.lanczos3,
      })
      .png()
      .toBuffer();
    const sourceLeft = Math.max(0, -left);
    const sourceTop = Math.max(0, -top);
    const destinationLeft = Math.max(0, left);
    const destinationTop = Math.max(0, top);
    const compositeWidth = Math.min(
      scaledWidth - sourceLeft,
      CANVAS.width - destinationLeft,
    );
    const compositeHeight = Math.min(
      scaledHeight - sourceTop,
      CANVAS.height - destinationTop,
    );
    const visibleRegion = await sharp(resized)
      .extract({
        left: sourceLeft,
        top: sourceTop,
        width: compositeWidth,
        height: compositeHeight,
      })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: CANVAS.width,
        height: CANVAS.height,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{
        input: visibleRegion,
        left: destinationLeft,
        top: destinationTop,
      }])
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(masterPath);

    await sharp(masterPath)
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(publishedPath);
  }

  const [masterExists, publishedExists] = await Promise.all([
    fs.stat(masterPath).then(() => true, () => false),
    fs.stat(publishedPath).then(() => true, () => false),
  ]);

  if (!masterExists || !publishedExists) {
    throw new Error(`Missing normalized outputs for ${config.legend}`);
  }

  const after = await alphaBounds(masterPath, config.alphaThreshold);
  const [masterMetadata, publishedMetadata] = await Promise.all([
    sharp(masterPath).metadata(),
    sharp(publishedPath).metadata(),
  ]);
  const expectedBottom = CANVAS.height - CANVAS.margin;

  if (
    masterMetadata.width !== CANVAS.width
    || masterMetadata.height !== CANVAS.height
    || !masterMetadata.hasAlpha
  ) {
    throw new Error(`Invalid normalized master for ${config.legend}`);
  }

  if (
    Math.abs(after.top - CANVAS.margin) > 1
    || Math.abs(after.bottom + 1 - expectedBottom) > 1
  ) {
    throw new Error(`Invalid safe margins for ${config.legend}`);
  }

  if (
    publishedMetadata.format !== "webp"
    || publishedMetadata.width !== CANVAS.width
    || publishedMetadata.height !== CANVAS.height
    || !publishedMetadata.hasAlpha
  ) {
    throw new Error(`Invalid published portrait for ${config.legend}`);
  }

  return {
    legend: config.legend,
    source: config.source,
    master: config.master,
    published: config.published,
    alphaThreshold: config.alphaThreshold,
    before,
    after,
    scale: Number(scale.toFixed(6)),
    publishedFormat: publishedMetadata.format,
    publishedSize: `${publishedMetadata.width}x${publishedMetadata.height}`,
  };
}

async function createComparison(round, portraits) {
  const width = 1600;
  const headerHeight = 100;
  const rowHeight = 520;
  const portraitWidth = 300;
  const portraitHeight = 450;
  const height = headerHeight + rowHeight * portraits.length;
  const outputPath = path.join(
    DOCS_DIR,
    `legend-size-normalization-round-${round}.webp`,
  );
  const rows = portraits.map((portrait, index) => {
    const y = headerHeight + index * rowHeight;
    const guideTop = y + 60 + Math.round(portraitHeight * 0.02);
    const guideBottom = y + 60 + Math.round(portraitHeight * 0.98);

    return `
      <rect x="40" y="${y + 10}" width="1520" height="500" rx="18" fill="#111820" stroke="#29323d" />
      <text x="70" y="${y + 48}" fill="#f4f1eb" font-size="25" font-weight="700">${portrait.legend.toUpperCase()}</text>
      <line x1="110" y1="${guideTop}" x2="690" y2="${guideTop}" stroke="#fb7185" stroke-width="2" stroke-dasharray="8 8" opacity="0.8" />
      <line x1="110" y1="${guideBottom}" x2="690" y2="${guideBottom}" stroke="#fb7185" stroke-width="2" stroke-dasharray="8 8" opacity="0.8" />
      <line x1="910" y1="${guideTop}" x2="1490" y2="${guideTop}" stroke="#4ade80" stroke-width="2" stroke-dasharray="8 8" opacity="0.8" />
      <line x1="910" y1="${guideBottom}" x2="1490" y2="${guideBottom}" stroke="#4ade80" stroke-width="2" stroke-dasharray="8 8" opacity="0.8" />
    `;
  }).join("");
  const base = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#0a0f14" />
          <rect width="12" height="12" fill="#131b23" />
          <rect x="12" y="12" width="12" height="12" fill="#131b23" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#070b0f" />
      <text x="400" y="62" text-anchor="middle" fill="#fb7185" font-size="30" font-weight="800">ANTES</text>
      <text x="1200" y="62" text-anchor="middle" fill="#4ade80" font-size="30" font-weight="800">DEPOIS</text>
      ${rows}
      ${portraits.map((_, index) => {
        const y = headerHeight + index * rowHeight + 60;
        return `
          <rect x="250" y="${y}" width="${portraitWidth}" height="${portraitHeight}" fill="url(#grid)" stroke="#35404d" />
          <rect x="1050" y="${y}" width="${portraitWidth}" height="${portraitHeight}" fill="url(#grid)" stroke="#35404d" />
        `;
      }).join("")}
    </svg>
  `);
  const composites = [];

  for (const [index, portrait] of portraits.entries()) {
    const y = headerHeight + index * rowHeight + 60;
    const [before, after] = await Promise.all([
      sharp(path.join(MASTER_DIR, portrait.source))
        .resize({ width: portraitWidth, height: portraitHeight, fit: "fill" })
        .png()
        .toBuffer(),
      sharp(path.join(MASTER_DIR, portrait.master))
        .resize({ width: portraitWidth, height: portraitHeight, fit: "fill" })
        .png()
        .toBuffer(),
    ]);

    composites.push(
      { input: before, left: 250, top: y },
      { input: after, left: 1050, top: y },
    );
  }

  await sharp(base)
    .composite(composites)
    .webp({ quality: 90, effort: 6 })
    .toFile(outputPath);

  return path.relative(ROOT, outputPath).replaceAll(path.sep, "/");
}

async function main() {
  const { round, verify } = parseArgs();
  const portraits = rounds[round];

  if (!portraits) {
    throw new Error(`Unknown normalization round: ${round}`);
  }

  const report = [];

  for (const portrait of portraits) {
    report.push(await normalizePortrait(portrait, verify));
  }

  const comparisonPath = verify
    ? await fs.stat(path.join(DOCS_DIR, `legend-size-normalization-round-${round}.webp`))
      .then(() => `docs/legend-size-normalization-round-${round}.webp`)
    : await createComparison(round, portraits);

  console.log(JSON.stringify({
    round,
    verify,
    canvas: CANVAS,
    comparisonPath,
    portraits: report,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
