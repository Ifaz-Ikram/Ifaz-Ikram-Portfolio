import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const OUTPUT_DIR = path.join(PUBLIC_DIR, "optimized");

const SIZES = [320, 640, 960, 1600];
const JPEG_QUALITY = 75;
const WEBP_QUALITY = 75;
const AVIF_QUALITY = 50;
const PNG_COMPRESSION = 9;
const MIN_BYTES = 0;

const isImage = (file) => /\.(jpe?g|png)$/i.test(file);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (fullPath.startsWith(OUTPUT_DIR)) continue;
      files.push(...(await walk(fullPath)));
    } else if (entry.isFile() && isImage(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
};

const buildOutputPath = (relativePath, width, format) => {
  const withoutExt = relativePath.replace(/\.[^/.]+$/, "");
  return path.join(OUTPUT_DIR, `${withoutExt}-w${width}.${format}`);
};

const optimizeFile = async (filePath) => {
  const stat = await fs.stat(filePath);
  if (stat.size < MIN_BYTES) return { filePath, skipped: true };

  const relativePath = path.relative(PUBLIC_DIR, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const fallbackFormat = ext === ".png" ? "png" : "jpg";

  const base = sharp(filePath);
  const metadata = await base.metadata();
  let widths = SIZES.slice();

  if (metadata.width) {
    widths = widths.filter((w) => w <= metadata.width);
    if (widths.length === 0) widths = [metadata.width];
  }

  for (const width of widths) {
    const resized = sharp(filePath).resize({
      width,
      withoutEnlargement: true,
    });

    const outAvif = buildOutputPath(relativePath, width, "avif");
    const outWebp = buildOutputPath(relativePath, width, "webp");
    const outFallback = buildOutputPath(relativePath, width, fallbackFormat);

    await fs.mkdir(path.dirname(outAvif), { recursive: true });

    await resized.clone().avif({ quality: AVIF_QUALITY }).toFile(outAvif);
    await resized.clone().webp({ quality: WEBP_QUALITY }).toFile(outWebp);

    if (fallbackFormat === "png") {
      await resized.clone().png({ compressionLevel: PNG_COMPRESSION }).toFile(outFallback);
    } else {
      await resized.clone().jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(outFallback);
    }
  }

  return { filePath, skipped: false };
};

const run = async () => {
  const files = await walk(PUBLIC_DIR);

  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const result = await optimizeFile(file);
      if (result.skipped) {
        skipped += 1;
        continue;
      }
      processed += 1;
      console.log(`optimized ${path.relative(ROOT, file)}`);
    } catch (error) {
      console.error(`failed ${path.relative(ROOT, file)}:`, error.message);
    }
  }

  console.log(`done. optimized: ${processed}, skipped: ${skipped}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
