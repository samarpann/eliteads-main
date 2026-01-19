import { motion } from "framer-motion";

interface GlitchTextProps {
  children: string;
  className?: string;
}

const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        animate={{
          textShadow: [
            "0 0 0 transparent",
            "2px 0 0 hsl(var(--neon-green) / 0.8), -2px 0 0 hsl(var(--gold) / 0.8)",
            "0 0 0 transparent",
            "-1px 0 0 hsl(var(--neon-green) / 0.5), 1px 0 0 hsl(var(--gold) / 0.5)",
            "0 0 0 transparent",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 z-0"
        style={{ clipPath: "inset(0 0 50% 0)" }}
        animate={{
          x: [0, 2, -2, 1, 0],
          opacity: [0, 0.5, 0, 0.3, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 4,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default GlitchText;
