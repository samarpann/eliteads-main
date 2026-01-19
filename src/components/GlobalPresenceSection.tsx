import { motion, useInView } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { MapPin, Globe } from "lucide-react";
import { PixelStar, PixelParticles, PixelCorner } from "./PixelDecorations";
import PixelEmoji from "./PixelEmoji";

// Lazy load the 3D globe for performance
const Globe3D = lazy(() => import("./Globe3D"));

const locations = [
  { name: "United States", position: { top: "35%", left: "20%" }, region: "North America" },
  { name: "United Kingdom", position: { top: "28%", left: "45%" }, region: "Europe" },
  { name: "UAE", position: { top: "45%", left: "58%" }, region: "Middle East" },
  { name: "Singapore", position: { top: "55%", left: "75%" }, region: "Asia Pacific" },
  { name: "India", position: { top: "45%", left: "68%" }, region: "South Asia" },
  { name: "Germany", position: { top: "30%", left: "48%" }, region: "Europe" },
];

const stats = [
  { label: "Countries", value: "47+" },
  { label: "Languages", value: "25+" },
  { label: "Time Zones", value: "24/7" },
  { label: "Team Members", value: "200+" },
];

const GlobalPresenceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="global" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark section with glow */}
      <div className="absolute inset-0 section-glow" />
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute top-0 left-0 right-0 glow-line-gold" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-80 bg-gradient-radial from-primary/6 to-transparent" />
      
      {/* Pixel Decorations */}
      <PixelParticles count={15} />
      <PixelCorner position="top-left" size={50} color="primary" className="m-4 hidden lg:block" />
      <PixelCorner position="top-right" size={50} color="secondary" className="m-4 hidden lg:block" />
      <PixelStar size={20} color="accent" className="absolute bottom-16 left-[10%] hidden lg:block" delay={0.3} />
      <PixelStar size={16} color="primary" className="absolute bottom-24 right-[15%] hidden lg:block" delay={0.7} />

      {/* Floating Pixel Emoji Decorations */}
      <motion.div 
        className="absolute top-20 left-[8%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -14, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="rocket" size={44} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-32 right-[6%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -18, 0],
            x: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="diamond" size={40} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-[5%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="users" size={38} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-28 right-[10%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -16, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="ninja" size={42} animate={false} />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge">
            Global Reach
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            <span className="pixel-text-gold">WORLDWIDE </span>
            <span className="pixel-text-neon">PRESENCE</span>
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            Operating across continents with local expertise and global capabilities 
            to scale your campaigns in any market.
          </p>
        </motion.div>

        {/* 3D Globe Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto mb-16"
        >
          <div className="glass-card rounded-3xl p-4 md:p-8 overflow-hidden">
            {/* 3D Globe */}
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-card/80 to-muted/20 border border-border/30">
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
              }>
                <Globe3D />
              </Suspense>
              
              {/* Overlay info */}
              <div className="absolute top-4 left-4 glass-card rounded-lg px-3 py-2 z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-xs text-primary uppercase tracking-wider">Live Operations</span>
                </div>
              </div>
              
              {/* Location count */}
              <div className="absolute top-4 right-4 glass-card rounded-lg px-3 py-2 z-10">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-mono text-xs text-foreground">6 Global HQs</span>
                </div>
              </div>

              {/* Globe Icon */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 text-muted-foreground/50 z-10">
                <Globe className="w-5 h-5" />
                <span className="font-mono text-xs">GLOBAL OPERATIONS</span>
              </div>
              
              {/* Drag hint */}
              <div className="absolute bottom-4 left-4 glass-card rounded-lg px-3 py-2 z-10">
                <span className="font-mono text-xs text-muted-foreground">Drag to rotate</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="glass-card rounded-xl p-6 text-center border border-primary/20 hover:border-primary/40 transition-colors duration-300"
            >
              <div className="mono-number text-3xl font-bold gradient-text-gold mb-2">
                {stat.value}
              </div>
              <div className="font-inter text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Regions List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {["North America", "Europe", "Middle East", "Asia Pacific", "South Asia", "Latin America"].map((region) => (
            <div
              key={region}
              className="flex items-center gap-2 px-4 py-2 glass-card rounded-full"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-inter text-sm text-foreground">{region}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;
