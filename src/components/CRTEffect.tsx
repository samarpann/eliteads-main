import { motion } from "framer-motion";

interface CRTEffectProps {
  children: React.ReactNode;
  className?: string;
}

const CRTEffect = ({ children, className = "" }: CRTEffectProps) => {
  return (
    <div className={`crt-container relative ${className}`}>
      {/* CRT Screen curvature frame */}
      <div className="crt-frame absolute inset-0 pointer-events-none z-20">
        {/* Top-left curve shadow */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-black/40 to-transparent rounded-tl-3xl" />
        {/* Top-right curve shadow */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-black/40 to-transparent rounded-tr-3xl" />
        {/* Bottom-left curve shadow */}
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-black/40 to-transparent rounded-bl-3xl" />
        {/* Bottom-right curve shadow */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-black/40 to-transparent rounded-br-3xl" />
        
        {/* Edge vignette */}
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            boxShadow: "inset 0 0 100px 40px rgba(0,0,0,0.5), inset 0 0 200px 100px rgba(0,0,0,0.3)"
          }}
        />
      </div>

      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.15] rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Horizontal scanline animation */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] pointer-events-none z-10 opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5) 20%, hsl(var(--primary) / 0.8) 50%, hsl(var(--primary) / 0.5) 80%, transparent)",
        }}
        animate={{ 
          top: ["0%", "100%", "0%"]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />

      {/* RGB color separation / chromatic aberration effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 mix-blend-screen opacity-[0.03] rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(90deg, rgba(255,0,0,0.5) 0%, transparent 33%, transparent 66%, rgba(0,0,255,0.5) 100%)",
        }}
      />

      {/* Phosphor glow effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 rounded-3xl overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Screen flicker animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 rounded-3xl overflow-hidden bg-white/[0.02]"
        animate={{ 
          opacity: [0, 0.02, 0, 0.01, 0]
        }}
        transition={{ 
          duration: 0.15, 
          repeat: Infinity, 
          repeatDelay: 3,
          times: [0, 0.1, 0.2, 0.5, 1]
        }}
      />

      {/* Pixel grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] rounded-3xl overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 3px),
            linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 3px)
          `,
          backgroundSize: "3px 3px",
        }}
      />

      {/* Screen edge glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 rounded-3xl"
        style={{
          boxShadow: "0 0 30px 5px hsl(var(--primary) / 0.2), 0 0 60px 10px hsl(var(--primary) / 0.1)",
        }}
      />

      {/* Content */}
      <div className="relative z-5 crt-content">
        {children}
      </div>

      {/* CRT power LED */}
      <motion.div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ 
            boxShadow: [
              "0 0 5px hsl(var(--primary) / 0.8)",
              "0 0 15px hsl(var(--primary) / 1)",
              "0 0 5px hsl(var(--primary) / 0.8)",
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-pixel text-[6px] text-muted-foreground">PWR</span>
      </motion.div>
    </div>
  );
};

export default CRTEffect;
