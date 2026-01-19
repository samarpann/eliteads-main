import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Database, Layers, Rocket, TestTube, TrendingUp, CheckCircle } from "lucide-react";
import { SectionDecorator, PixelArrow, PixelCorner } from "./PixelDecorations";
import PixelEmoji from "./PixelEmoji";

type EmojiType = "robot" | "diamond" | "rocket" | "flask" | "fire";

const steps: {
  icon: typeof Database;
  emoji: EmojiType;
  number: string;
  title: string;
  description: string;
  color: string;
}[] = [
  {
    icon: Database,
    emoji: "robot",
    number: "01",
    title: "Research & Data Mapping",
    description: "Deep-dive analysis of your market, competitors, and customer journey to identify high-impact opportunities.",
    color: "primary",
  },
  {
    icon: Layers,
    emoji: "diamond",
    number: "02",
    title: "Funnel Architecture",
    description: "Strategic funnel design optimized for each stage of the customer journey, from awareness to conversion.",
    color: "secondary",
  },
  {
    icon: Rocket,
    emoji: "rocket",
    number: "03",
    title: "Traffic Engineering",
    description: "Precision-targeted traffic acquisition across Meta, Google, TikTok, and programmatic networks.",
    color: "primary",
  },
  {
    icon: TestTube,
    emoji: "flask",
    number: "04",
    title: "Creative Testing",
    description: "AI-powered creative testing to identify winning ad combinations and messaging strategies.",
    color: "secondary",
  },
  {
    icon: TrendingUp,
    emoji: "fire",
    number: "05",
    title: "Scaling & Optimization",
    description: "Aggressive scaling of winning campaigns with continuous optimization to maximize ROAS.",
    color: "primary",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark accent section */}
      <div className="absolute inset-0 section-accent" />
      <div className="absolute inset-0 grid-pattern-gold opacity-20" />
      <div className="absolute top-0 left-0 right-0 glow-line-gold" />
      <div className="absolute top-1/2 left-0 w-full h-40 bg-gradient-radial from-secondary/6 to-transparent" />
      
      {/* Pixel Decorations */}
      <SectionDecorator variant="corners" />
      <PixelArrow direction="right" size={30} color="primary" className="absolute top-1/4 left-[3%] hidden xl:block" />
      <PixelArrow direction="left" size={30} color="secondary" className="absolute bottom-1/4 right-[3%] hidden xl:block" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge">
            Our Methodology
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            <span className="pixel-text-gold">PROVEN </span>
            <span className="pixel-text-neon">FRAMEWORK</span>
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            A systematic, data-driven approach that transforms your marketing 
            into a predictable, scalable revenue engine.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal Line - Desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="hidden lg:block absolute top-16 left-0 right-0 h-1 timeline-connector origin-left rounded-full"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                className="relative"
              >
                {/* Connector Line - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-8 top-20 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent" />
                )}

                {/* Step Card */}
                <div className="relative z-10 text-center lg:text-left">
                  {/* Pixel Emoji Icon Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15, type: "spring" }}
                    className={`w-16 h-16 mx-auto lg:mx-0 rounded-2xl flex items-center justify-center mb-5 ${
                      step.color === "primary" 
                        ? "bg-primary/20 border-2 border-primary/50" 
                        : "bg-secondary/20 border-2 border-secondary/50"
                    }`}
                  >
                    <PixelEmoji type={step.emoji} size={40} animate={false} />
                  </motion.div>

                  {/* Step Number */}
                  <div className={`font-orbitron text-3xl font-bold mb-3 ${
                    step.color === "primary" ? "gradient-text-neon" : "gradient-text-gold"
                  }`}>
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="font-orbitron text-base font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 glass-card px-8 py-4 rounded-full">
            <CheckCircle className="w-6 h-6 text-primary" />
            <span className="font-inter text-base text-foreground">
              Average client sees <span className="font-bold text-primary">3.2x ROAS improvement</span> within 90 days
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
