import { motion, useScroll, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const ScrollProgress = () => {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.01,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left pointer-events-none overflow-hidden"
      style={{
        height: isMobile ? "0.5px" : "4px",
        maxWidth: "100vw",
        scaleX,
        background:
          "linear-gradient(90deg, hsl(142 70% 45%), hsl(45 90% 55%), hsl(150 70% 50%))",
        boxShadow: isMobile ? "none" : "0 0 10px hsl(142 70% 45% / 0.3)",
        willChange: "transform",
      }}
    />
  );
};

export default ScrollProgress;
