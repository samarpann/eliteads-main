import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

interface SmoothScrollContainerProps {
  children: ReactNode;
}

const SmoothScrollContainer = ({ children }: SmoothScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setScrollHeight(containerRef.current.scrollHeight);
      }
    };
    
    updateHeight();
    window.addEventListener("resize", updateHeight);
    
    // Update on content changes
    const observer = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  const y = useTransform(smoothY, [0, scrollHeight], [0, -scrollHeight]);

  return (
    <>
      <div style={{ height: scrollHeight }} />
      <motion.div
        ref={containerRef}
        className="fixed top-0 left-0 w-full"
        style={{ y }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default SmoothScrollContainer;
