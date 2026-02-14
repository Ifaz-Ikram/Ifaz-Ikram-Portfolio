import React from "react";
import { getOptimizedImageSources } from "../utils/media";

const OptimizedImage = ({
  src,
  alt = "",
  widths = [320, 640, 960, 1600],
  sizes,
  className,
  pictureClassName,
  ...imgProps
}) => {
  if (!src) return null;

  const sources = getOptimizedImageSources(src, widths);

  if (!sources.avifSrcSet && !sources.webpSrcSet && !sources.fallbackSrcSet) {
    return (
      <img
        src={sources.src || src}
        alt={alt}
        className={className}
        {...imgProps}
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      {sources.avifSrcSet && (
        <source type="image/avif" srcSet={sources.avifSrcSet} sizes={sizes} />
      )}
      {sources.webpSrcSet && (
        <source type="image/webp" srcSet={sources.webpSrcSet} sizes={sizes} />
      )}
      {sources.fallbackSrcSet && (
        <source
          type={`image/${sources.fallbackType}`}
          srcSet={sources.fallbackSrcSet}
          sizes={sizes}
        />
      )}
      <img
        src={sources.fallbackSrc || sources.src || src}
        alt={alt}
        className={className}
        {...imgProps}
      />
    </picture>
  );
};

export default OptimizedImage;
