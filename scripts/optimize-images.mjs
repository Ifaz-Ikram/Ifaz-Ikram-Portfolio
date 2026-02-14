import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMAGES_DIR = path.join(ROOT, "public", "images");
const EXTRA_FILES = [path.join(ROOT, "public", "ifaz.jpeg")];

const MAX_WIDTH = 1600;
const MIN_BYTES = 100 * 1024;
const JPEG_QUALITY = 75;
const PNG_COMPRESSION = 9;

const isImage = (file) => /\.(jpe?g|png)$/i.test(file);

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
    } else if (entry.isFile() && isImage(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
};

const optimizeFile = async (filePath) => {
  const stat = await fs.stat(filePath);
  if (stat.size < MIN_BYTES) return { filePath, skipped: true };

  const ext = path.extname(filePath).toLowerCase();
  const image = sharp(filePath);
  const metadata = await image.metadata();

  const needsResize = metadata.width && metadata.width > MAX_WIDTH;
  const pipeline = needsResize ? image.resize({ width: MAX_WIDTH, withoutEnlargement: true }) : image;

  let buffer;
  if (ext === ".png") {
    buffer = await pipeline.png({ compressionLevel: PNG_COMPRESSION }).toBuffer();
  } else {
    buffer = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  }

  await fs.writeFile(filePath, buffer);
  return { filePath, skipped: false, originalBytes: stat.size, newBytes: buffer.length };
};

const run = async () => {
  const files = [
    ...(await walk(IMAGES_DIR)),
    ...EXTRA_FILES.filter((file) => file.toLowerCase().match(/\.(jpe?g|png)$/))
  ];

  let processed = 0;
  let skipped = 0;
  let saved = 0;

  for (const file of files) {
    try {
      const result = await optimizeFile(file);
      if (result.skipped) {
        skipped += 1;
        continue;
      }
      processed += 1;
      saved += Math.max(0, result.originalBytes - result.newBytes);
      console.log(`optimized ${path.relative(ROOT, file)}`);
    } catch (error) {
      console.error(`failed ${path.relative(ROOT, file)}:`, error.message);
    }
  }

  console.log(`done. optimized: ${processed}, skipped: ${skipped}, bytes_saved: ${saved}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
