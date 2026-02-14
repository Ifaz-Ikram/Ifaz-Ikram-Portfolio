import React from "react";
import { useInView } from "react-intersection-observer";

const LazySection = ({ children, minHeight = "500px", className = "" }) => {
  const { ref, inView } = useInView({
    rootMargin: "300px 0px",
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {inView ? children : null}
    </div>
  );
};

export default LazySection;
