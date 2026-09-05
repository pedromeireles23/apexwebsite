import sharp from "sharp";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  console.error(
    "Usage: node scripts/extract-generated-checkerboard.mjs <input> <output>",
  );
  process.exit(1);
}

const { data, info } = await sharp(inputPath)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixelCount = width * height;
const background = new Uint8Array(pixelCount);
const queued = new Uint8Array(pixelCount);
const queue = new Uint32Array(pixelCount);
let queueStart = 0;
let queueEnd = 0;

function isCheckerboardCandidate(pixelIndex) {
  const offset = pixelIndex * 3;
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const minimum = Math.min(red, green, blue);
  const maximum = Math.max(red, green, blue);

  return minimum >= 225 && maximum - minimum <= 14;
}

function enqueue(pixelIndex) {
  if (queued[pixelIndex] || !isCheckerboardCandidate(pixelIndex)) return;
  queued[pixelIndex] = 1;
  queue[queueEnd++] = pixelIndex;
}

for (let x = 0; x < width; x += 1) {
  enqueue(x);
  enqueue((height - 1) * width + x);
}

for (let y = 0; y < height; y += 1) {
  enqueue(y * width);
  enqueue(y * width + width - 1);
}

while (queueStart < queueEnd) {
  const pixelIndex = queue[queueStart++];
  const x = pixelIndex % width;
  const y = Math.floor(pixelIndex / width);
  background[pixelIndex] = 1;

  for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
    for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
      if (offsetX === 0 && offsetY === 0) continue;
      const nextX = x + offsetX;
      const nextY = y + offsetY;
      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
        continue;
      }
      enqueue(nextY * width + nextX);
    }
  }
}

// Only the canvas-connected background may contribute to the one-pixel outer
// fringe cleanup below. Enclosed openings sit directly against equipment and
// limbs, so expanding those regions would erode valid character pixels.
const edgeConnectedBackground = new Uint8Array(background);

// Large checkerboard regions can be completely enclosed by equipment or limbs.
// Keep small near-white regions (such as armor highlights), but clear enclosed
// components large enough to be genuine background openings.
for (let seed = 0; seed < pixelCount; seed += 1) {
  if (queued[seed] || !isCheckerboardCandidate(seed)) continue;

  queueStart = 0;
  queueEnd = 0;
  let darkerSquares = 0;
  let lighterSquares = 0;
  queued[seed] = 1;
  queue[queueEnd++] = seed;

  while (queueStart < queueEnd) {
    const pixelIndex = queue[queueStart++];
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    const sourceOffset = pixelIndex * 3;
    const brightness =
      (data[sourceOffset] + data[sourceOffset + 1] + data[sourceOffset + 2]) /
      3;
    if (brightness < 249) darkerSquares += 1;
    else lighterSquares += 1;

    for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
      for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
        if (offsetX === 0 && offsetY === 0) continue;
        const nextX = x + offsetX;
        const nextY = y + offsetY;
        if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
          continue;
        }
        const nextIndex = nextY * width + nextX;
        if (queued[nextIndex] || !isCheckerboardCandidate(nextIndex)) continue;
        queued[nextIndex] = 1;
        queue[queueEnd++] = nextIndex;
      }
    }
  }

  const checkerBalance =
    Math.min(darkerSquares, lighterSquares) /
    Math.max(darkerSquares, lighterSquares, 1);

  // Thin equipment such as bow strings or rifle stocks can isolate a
  // checkerboard opening and leave one checker tone underrepresented. Smaller
  // openings still require a 35% balance; very large openings may use 15%,
  // which keeps solid white costume highlights below the removal threshold.
  const isBalancedOpening = queueEnd >= 800 && checkerBalance >= 0.35;
  const isLargeUnbalancedOpening = queueEnd >= 4000 && checkerBalance >= 0.15;

  if (isBalancedOpening || isLargeUnbalancedOpening) {
    for (let index = 0; index < queueEnd; index += 1) {
      background[queue[index]] = 1;
    }
  }
}

// The generated PNG bakes a one-pixel pale fringe into the outer character
// edge. Remove exactly that first canvas-facing foreground row without
// recursively shrinking the silhouette or eroding enclosed equipment gaps.
const cleanedBackground = new Uint8Array(background);
for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
  if (background[pixelIndex]) continue;
  const x = pixelIndex % width;
  const y = Math.floor(pixelIndex / width);

  for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
    for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
      const nextX = x + offsetX;
      const nextY = y + offsetY;
      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) {
        continue;
      }
      if (edgeConnectedBackground[nextY * width + nextX]) {
        cleanedBackground[pixelIndex] = 1;
      }
    }
  }
}
background.set(cleanedBackground);

const rgba = Buffer.alloc(pixelCount * 4);
let transparentPixels = 0;

for (let pixelIndex = 0; pixelIndex < pixelCount; pixelIndex += 1) {
  const sourceOffset = pixelIndex * 3;
  const targetOffset = pixelIndex * 4;
  rgba[targetOffset] = data[sourceOffset];
  rgba[targetOffset + 1] = data[sourceOffset + 1];
  rgba[targetOffset + 2] = data[sourceOffset + 2];
  rgba[targetOffset + 3] = background[pixelIndex] ? 0 : 255;
  if (background[pixelIndex]) transparentPixels += 1;
}

await sharp(rgba, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

console.log(
  JSON.stringify(
    {
      inputPath,
      outputPath,
      width,
      height,
      transparentPixels,
      transparentPercent: Number(
        ((transparentPixels / pixelCount) * 100).toFixed(2),
      ),
    },
    null,
    2,
  ),
);
