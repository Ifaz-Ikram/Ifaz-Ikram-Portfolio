import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useAutoCarousel = (images = [], intervalMs = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    rootMargin: "200px 0px",
    triggerOnce: true,
  });

  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images.length, currentIndex]);

  useEffect(() => {
    if (!inView || !hasMultiple) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [inView, hasMultiple, images.length, intervalMs]);

  return { ref, currentIndex, setCurrentIndex, inView };
};

export default useAutoCarousel;
