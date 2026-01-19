import { motion, useInView, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur" | "slideUp";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const animations: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(4px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" }
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" }
  },
  slideUp: {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
  }
};

const ScrollReveal = ({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 0.7,
  once = true,
  threshold = 0.15
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      className={`gpu-accelerated ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for multiple children
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  threshold?: number;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  once = true,
  threshold = 0.1
}: StaggerContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
}

export const StaggerItem = ({
  children,
  className = "",
  animation = "fadeUp"
}: StaggerItemProps) => {
  const itemVariants: Variants = {
    hidden: animations[animation].hidden,
    visible: {
      ...animations[animation].visible,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div className={`gpu-accelerated ${className}`} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
