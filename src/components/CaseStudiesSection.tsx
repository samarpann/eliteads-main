import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, DollarSign, Users, ArrowRight, Sparkles } from "lucide-react";
import { PixelStar, PixelHeart, PixelGem, PixelParticles } from "./PixelDecorations";
import PixelEmoji from "./PixelEmoji";

const caseStudies = [
  {
    industry: "E-commerce",
    company: "Premium DTC Brand",
    spend: "$2.4M",
    period: "12 months",
    results: {
      roas: 8.7,
      revenue: "$20.9M",
      cpa: -45,
    },
    description: "Scaled from $50K to $200K monthly spend while maintaining 8.7x ROAS through strategic creative testing and audience expansion.",
  },
  {
    industry: "SaaS",
    company: "B2B Software Platform",
    spend: "$850K",
    period: "8 months",
    results: {
      roas: 12.4,
      revenue: "$10.5M ARR",
      cpa: -38,
    },
    description: "Reduced customer acquisition cost by 38% while scaling MQL volume 4x through multi-channel attribution optimization.",
  },
  {
    industry: "Health & Wellness",
    company: "Supplement Brand",
    spend: "$1.8M",
    period: "10 months",
    results: {
      roas: 6.2,
      revenue: "$11.2M",
      cpa: -52,
    },
    description: "Navigated Facebook policy challenges while scaling profitably with compliant creative strategies and diversified traffic sources.",
  },
  {
    industry: "Finance",
    company: "Fintech Startup",
    spend: "$3.2M",
    period: "14 months",
    results: {
      roas: 15.8,
      revenue: "$50M+ funded",
      cpa: -61,
    },
    description: "Generated 125,000+ qualified leads for investment platform with industry-leading conversion rates and compliance adherence.",
  },
];

const AnimatedNumber = ({ value, suffix = "", prefix = "", delay = 0 }: { value: number; suffix?: string; prefix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const duration = 1500;
        const steps = 40;
        const increment = value / steps;
        let current = 0;
        const interval = setInterval(() => {
          current += increment;
          if (current >= value) {
            setCount(value);
            clearInterval(interval);
          } else {
            setCount(current);
          }
        }, duration / steps);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <span ref={ref} className="mono-number">
      {prefix}{count.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
    </span>
  );
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      style={{ 
        rotateX, 
        rotateY, 
        scale, 
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

const CaseStudiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark section */}
      <div className="absolute inset-0 section-dark" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-0 right-0 glow-line-gold" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-60 bg-gradient-radial from-secondary/6 to-transparent" />
      
      {/* Pixel Decorations */}
      <PixelParticles count={12} />
      <PixelStar size={22} color="primary" className="absolute top-16 left-[6%] hidden lg:block" delay={0} />
      <PixelStar size={18} color="accent" className="absolute top-24 right-[10%] hidden lg:block" delay={0.4} />
      <PixelGem size={20} color="secondary" className="absolute bottom-20 left-[12%] hidden lg:block" />
      <PixelHeart size={18} color="accent" className="absolute bottom-32 right-[8%] hidden lg:block" />

      {/* Floating Pixel Emoji Decorations */}
      <motion.div 
        className="absolute top-28 right-[5%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 8, -8, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="chart" size={42} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-36 left-[4%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -12, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="coin" size={38} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-1/2 left-[2%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -18, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="fire" size={36} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute bottom-24 right-[3%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="crown" size={40} animate={false} />
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
          <motion.span 
            className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge"
            animate={{ 
              boxShadow: [
                "0 0 10px hsl(var(--neon-green) / 0.3)",
                "0 0 20px hsl(var(--neon-green) / 0.5)",
                "0 0 10px hsl(var(--neon-green) / 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Proven Results
          </motion.span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            <span className="pixel-text-gold">CASE </span>
            <span className="pixel-text-neon">STUDIES</span>
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            Real results from real campaigns. See how we've transformed 
            marketing performance for brands across industries.
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
            >
              <TiltCard>
                <div className="glass-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 group relative overflow-hidden h-full">
                  {/* Animated gradient overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, hsl(var(--neon-green) / 0.05) 45%, hsl(var(--neon-green) / 0.1) 50%, hsl(var(--neon-green) / 0.05) 55%, transparent 60%)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                  
                  {/* Floating sparkle on hover */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-secondary" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <motion.span 
                          className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-semibold mb-3"
                          whileHover={{ scale: 1.1 }}
                        >
                          {study.industry}
                        </motion.span>
                        <h3 className="font-orbitron text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {study.company}
                        </h3>
                      </div>
                      <div className="text-right">
                        <motion.div 
                          className="mono-number text-lg font-bold text-primary"
                          animate={{ 
                            textShadow: [
                              "0 0 5px hsl(var(--neon-green) / 0.3)",
                              "0 0 15px hsl(var(--neon-green) / 0.6)",
                              "0 0 5px hsl(var(--neon-green) / 0.3)",
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          {study.spend}
                        </motion.div>
                        <div className="text-xs text-muted-foreground">{study.period}</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-inter text-sm text-muted-foreground mb-6 leading-relaxed">
                      {study.description}
                    </p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50">
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span className="text-2xl font-bold gradient-text-gold">
                            <AnimatedNumber value={study.results.roas} suffix="x" delay={300 + index * 100} />
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">ROAS</span>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <DollarSign className="w-4 h-4 text-secondary" />
                          <span className="text-lg font-bold text-foreground">{study.results.revenue}</span>
                        </div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">Revenue</span>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-2xl font-bold gradient-text-neon">
                            <AnimatedNumber value={Math.abs(study.results.cpa)} suffix="%" delay={500 + index * 100} />
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">CPA Reduction</span>
                      </motion.div>
                    </div>

                    {/* View Details */}
                    <div className="mt-6 pt-4 border-t border-border/30">
                      <motion.button 
                        className="flex items-center gap-2 text-primary font-medium text-sm group/btn"
                        whileHover={{ x: 5 }}
                      >
                        View Full Case Study
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <TiltCard className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--neon-green) / 0.3), hsl(var(--gold) / 0.3), hsl(var(--neon-green) / 0.3))",
                  backgroundSize: "200% 100%",
                  padding: "2px",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                {[
                  { value: 8.4, suffix: "x", label: "Average ROAS", delay: 1000 },
                  { value: 500, prefix: "$", suffix: "M+", label: "Revenue Generated", delay: 1100 },
                  { value: 42, suffix: "%", label: "Avg CPA Reduction", delay: 1200 },
                  { value: 350, suffix: "+", label: "Clients Served", delay: 1300 },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className={`mono-number text-3xl font-bold ${i % 2 === 0 ? 'gradient-text-gold' : 'gradient-text-neon'} mb-2`}
                      animate={{ 
                        textShadow: [
                          `0 0 10px hsl(var(--${i % 2 === 0 ? 'gold' : 'neon-green'}) / 0.3)`,
                          `0 0 20px hsl(var(--${i % 2 === 0 ? 'gold' : 'neon-green'}) / 0.6)`,
                          `0 0 10px hsl(var(--${i % 2 === 0 ? 'gold' : 'neon-green'}) / 0.3)`,
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <AnimatedNumber value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix} delay={stat.delay} />
                    </motion.div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
