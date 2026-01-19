import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Secondary trail with slower spring
  const trailX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer glow - large and subtle */}
      <motion.div
        className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-40 hidden lg:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(var(--neon-green) / 0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      
      {/* Middle glow - gold tint */}
      <motion.div
        className="fixed w-[250px] h-[250px] rounded-full pointer-events-none z-40 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(var(--gold) / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Inner glow - primary color */}
      <motion.div
        className="fixed w-[150px] h-[150px] rounded-full pointer-events-none z-40 hidden lg:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, hsl(var(--neon-green) / 0.1) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />
    </>
  );
};

export default CursorGlow;
