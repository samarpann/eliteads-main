import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, suffix = "", prefix = "", duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  {
    value: 8.4,
    suffix: "x",
    label: "ROAS Average",
    description: "Return on ad spend across all campaigns",
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    value: 2.5,
    suffix: "M+",
    label: "Leads Generated",
    description: "Qualified leads delivered to clients",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    value: 47,
    suffix: "+",
    label: "Markets Served",
    description: "Countries with active campaigns",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    value: 85,
    prefix: "$",
    suffix: "M",
    label: "Monthly Ad Spend",
    description: "Managed media budget per month",
    gradient: "from-orange-400 to-red-500"
  }
];

const StatsCounterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Section header */}
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            PERFORMANCE METRICS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Numbers That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary">Speak</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real results from real campaigns. Our data-driven approach delivers measurable growth.
          </p>
        </ScrollReveal>

        {/* Stats grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" staggerDelay={0.15}>
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label} animation="scale">
              <motion.div
                className="group relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Number */}
                <div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient}`}>
                  {isInView && (
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      prefix={stat.prefix}
                      duration={2 + index * 0.3}
                    />
                  )}
                </div>

                {/* Label */}
                <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-xs md:text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {stat.description}
                </p>

                {/* Corner accent */}
                <div className={`absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-r ${stat.gradient} opacity-50`} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom accent line */}
        <motion.div 
          className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default StatsCounterSection;
