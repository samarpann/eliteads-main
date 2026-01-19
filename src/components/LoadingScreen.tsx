import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/elite-ad-logo.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING SYSTEMS");
  const [showTagline, setShowTagline] = useState(false);

  const loadingMessages = [
    "INITIALIZING SYSTEMS",
    "CONNECTING TO GLOBAL NETWORK",
    "LOADING PERFORMANCE DATA",
    "CALIBRATING PRECISION PIXELS",
    "OPTIMIZING CAMPAIGN ENGINE",
    "READY FOR LAUNCH"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const messageIndex = Math.min(
      Math.floor(progress / 20),
      loadingMessages.length - 1
    );
    setLoadingText(loadingMessages[messageIndex]);
    
    if (progress > 70) {
      setShowTagline(true);
    }
  }, [progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Cinematic background layers */}
      <div className="absolute inset-0 bg-[hsl(150,30%,4%)]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(120 100% 50% / 0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: ["-20%", "20%", "-20%"],
          y: ["-10%", "10%", "-10%"],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(42 90% 55% / 0.1) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          x: ["30%", "-30%", "30%"],
          y: ["20%", "-20%", "20%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
            style={{ left: `${20 + i * 15}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
        }}
      />

      {/* Corner frames - premium style */}
      <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24">
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.div 
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </div>
      <div className="absolute top-6 sm:top-10 right-6 sm:right-10 w-16 sm:w-24 h-16 sm:h-24">
        <motion.div 
          className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-secondary to-transparent"
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-secondary to-transparent"
          initial={{ scaleY: 0, originY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 w-16 sm:w-24 h-16 sm:h-24">
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-accent to-transparent"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </div>
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-16 sm:w-24 h-16 sm:h-24">
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-primary to-transparent"
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-primary to-transparent"
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Outer glow rings */}
        <div className="relative mb-8">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(120 100% 50% / 0.15) 0%, transparent 70%)",
              width: "400px",
              height: "400px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(42 90% 55% / 0.1) 0%, transparent 70%)",
              width: "500px",
              height: "500px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Orbiting particles */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "hsl(120 100% 50%)" : "hsl(42 90% 55%)",
                boxShadow: `0 0 10px ${i % 2 === 0 ? "hsl(120 100% 50%)" : "hsl(42 90% 55%)"}`,
                left: "50%",
                top: "50%",
              }}
              animate={{
                x: [
                  Math.cos((i * Math.PI * 2) / 6) * 100,
                  Math.cos((i * Math.PI * 2) / 6 + Math.PI) * 100,
                  Math.cos((i * Math.PI * 2) / 6) * 100,
                ],
                y: [
                  Math.sin((i * Math.PI * 2) / 6) * 100,
                  Math.sin((i * Math.PI * 2) / 6 + Math.PI) * 100,
                  Math.sin((i * Math.PI * 2) / 6) * 100,
                ],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
            />
          ))}

          {/* Main logo */}
          <motion.img
            src={logo}
            alt="Elite Ad"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            className="h-28 sm:h-36 md:h-44 w-auto relative z-10"
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
            style={{
              filter: "drop-shadow(0 0 30px hsl(42 90% 55% / 0.8)) drop-shadow(0 0 60px hsl(120 100% 50% / 0.6))",
            }}
          />
        </div>

        {/* Loading status text */}
        <motion.div
          className="font-pixel text-xs sm:text-sm text-primary mb-4 text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {loadingText}
        </motion.div>

        {/* Premium progress bar */}
        <div className="relative w-72 sm:w-96 h-3 rounded-full overflow-hidden bg-black/50 border border-primary/30">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, hsl(120 100% 50%), hsl(42 90% 55%), hsl(175 70% 50%))",
              boxShadow: "0 0 20px hsl(120 100% 50% / 0.5)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Percentage with glow */}
        <motion.div 
          className="font-pixel text-2xl sm:text-3xl mt-4"
          style={{
            background: "linear-gradient(90deg, hsl(120 100% 50%), hsl(42 90% 55%), hsl(175 70% 50%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          animate={{
            textShadow: [
              "0 0 20px hsl(120 100% 50% / 0.5)",
              "0 0 40px hsl(120 100% 50% / 0.8)",
              "0 0 20px hsl(120 100% 50% / 0.5)",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {progress}%
        </motion.div>

        {/* Tagline reveal */}
        <AnimatePresence>
          {showTagline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <motion.p 
                className="font-orbitron text-sm sm:text-base text-muted-foreground tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                DRIVING ROI WITH PRECISION PIXELS
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom stats preview */}
      <motion.div
        className="absolute bottom-16 sm:bottom-20 left-0 right-0 flex justify-center gap-8 sm:gap-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: progress > 50 ? 0.6 : 0, y: progress > 50 ? 0 : 30 }}
        transition={{ duration: 0.5 }}
      >
        {[
          { label: "ROAS", value: "8.4x" },
          { label: "MARKETS", value: "47+" },
          { label: "AD SPEND", value: "$85M" },
        ].map((stat, i) => (
          <div key={stat.label} className="text-center">
            <div className="font-pixel text-[10px] text-muted-foreground mb-1">{stat.label}</div>
            <motion.div 
              className="font-orbitron text-sm sm:text-base text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 * i }}
            >
              {stat.value}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Loading Elite Ad text */}
      <motion.div 
        className="absolute bottom-6 sm:bottom-8 font-pixel text-[8px] sm:text-[10px] text-muted-foreground tracking-widest"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ELITE AD • PERFORMANCE MARKETING
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
