const CDN_BASE = (import.meta?.env?.VITE_CDN_BASE_URL || "").replace(/\/$/, "");

const isRemote = (src) => /^(https?:)?\/\//i.test(src || "");
const isData = (src) => /^data:/i.test(src || "");

export const withCdn = (src) => {
  if (!src) return src;
  if (!CDN_BASE) return src;
  if (!src.startsWith("/")) return src;
  return `${CDN_BASE}${src}`;
};

const stripQuery = (src) => (src || "").split("?")[0];

const getExtension = (src) => {
  const clean = stripQuery(src);
  const idx = clean.lastIndexOf(".");
  if (idx === -1) return "";
  return clean.slice(idx + 1).toLowerCase();
};

const buildOptimizedPath = (src, width, format) => {
  const clean = stripQuery(src);
  if (!clean.startsWith("/")) return clean;
  const withoutExt = clean.replace(/\.[^/.]+$/, "");
  const rel = withoutExt.startsWith("/") ? withoutExt.slice(1) : withoutExt;
  return withCdn(`/optimized/${rel}-w${width}.${format}`);
};

export const getOptimizedImageSources = (src, widths = [320, 640, 960, 1600]) => {
  if (!src || isRemote(src) || isData(src)) {
    return { src: src };
  }

  const ext = getExtension(src);
  const fallbackFormat = ext === "png" ? "png" : "jpg";

  const avifSrcSet = widths
    .map((w) => `${buildOptimizedPath(src, w, "avif")} ${w}w`)
    .join(", ");
  const webpSrcSet = widths
    .map((w) => `${buildOptimizedPath(src, w, "webp")} ${w}w`)
    .join(", ");
  const fallbackSrcSet = widths
    .map((w) => `${buildOptimizedPath(src, w, fallbackFormat)} ${w}w`)
    .join(", ");

  const fallbackSrc = buildOptimizedPath(src, widths[0], fallbackFormat);

  return {
    avifSrcSet,
    webpSrcSet,
    fallbackSrcSet,
    fallbackSrc,
    fallbackType: fallbackFormat,
    src: withCdn(src),
  };
};
