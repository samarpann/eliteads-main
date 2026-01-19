import { motion } from "framer-motion";
import logo from "@/assets/elite-ad-logo.png";
import { useIsMobile } from "@/hooks/use-mobile";

interface LogoShowcaseProps {
  size?: "sm" | "md" | "lg" | "xl";
  showGlowRings?: boolean;
  showParticles?: boolean;
  className?: string;
  priority?: boolean;
}

const LogoShowcase = ({ 
  size = "lg", 
  showGlowRings = true, 
  showParticles = true,
  className = "",
  priority = false,
}: LogoShowcaseProps) => {
  const isMobile = useIsMobile();
  
  const sizeClasses = {
    sm: "h-16 sm:h-20",
    md: "h-20 sm:h-28 md:h-32",
    lg: "h-28 sm:h-36 md:h-44 lg:h-52",
    xl: "h-36 sm:h-48 md:h-56 lg:h-64"
  };

  // Simplified mobile version
  if (isMobile) {
    return (
      <motion.div 
        className={`relative flex items-center justify-center ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Simple glow effect */}
        {showGlowRings && (
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, hsl(120 100% 50% / 0.2) 0%, transparent 60%)",
              filter: "blur(20px)",
              transform: "scale(1.5)",
            }}
          />
        )}

        {/* Main logo - optimized with priority loading */}
        <motion.img
          src={logo}
          alt="Elite Ad"
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={`${sizeClasses[size]} w-auto relative z-10`}
          animate={{
            filter: [
              "drop-shadow(0 0 10px hsl(42 90% 55% / 0.5))",
              "drop-shadow(0 0 20px hsl(120 100% 50% / 0.6))",
              "drop-shadow(0 0 10px hsl(42 90% 55% / 0.5))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    );
  }

  // Desktop version with full effects
  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
    >
      {/* Animated glow rings */}
      {showGlowRings && (
        <>
          <div
            className="absolute rounded-full animate-morph-1"
            style={{
              width: "150%",
              height: "150%",
              background: "radial-gradient(circle, hsl(120 100% 50% / 0.1) 0%, transparent 60%)",
              filter: "blur(20px)",
            }}
          />
          <div
            className="absolute rounded-full animate-morph-2"
            style={{
              width: "180%",
              height: "180%",
              background: "radial-gradient(circle, hsl(42 90% 55% / 0.08) 0%, transparent 60%)",
              filter: "blur(25px)",
            }}
          />
        </>
      )}

      {/* Floating particles around logo */}
      {showParticles && (
        <div className="absolute inset-0 pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{
                background: i % 2 === 0 ? "hsl(120 100% 50%)" : "hsl(42 90% 55%)",
                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 6)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 6)}%`,
                boxShadow: `0 0 6px ${i % 2 === 0 ? "hsl(120 100% 50%)" : "hsl(42 90% 55%)"}`,
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Main logo with premium effects - optimized */}
      <motion.div className="relative z-10">
        <motion.img
          src={logo}
          alt="Elite Ad"
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={`${sizeClasses[size]} w-auto relative z-10`}
          animate={{
            filter: [
              "drop-shadow(0 0 15px hsl(42 90% 55% / 0.6)) drop-shadow(0 0 30px hsl(120 100% 50% / 0.4))",
              "drop-shadow(0 0 25px hsl(120 100% 50% / 0.8)) drop-shadow(0 0 50px hsl(42 90% 55% / 0.5))",
              "drop-shadow(0 0 15px hsl(42 90% 55% / 0.6)) drop-shadow(0 0 30px hsl(120 100% 50% / 0.4))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default LogoShowcase;

