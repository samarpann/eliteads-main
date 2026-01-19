import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import LottieAnimation from "./LottieAnimation";
import {
  Users,
  Link2,
  Target,
  BarChart3,
  Zap,
  LineChart,
  ArrowRight,
  TrendingUp,
  Rocket,
  Settings
} from "lucide-react";

const services = [
  {
    icon: Users,
    lottieUrl: "https://lottie.host/933cece9-8973-4f96-857c-658f80455de8/mCszl9kLUP.json",
    title: "User Acquisition",
    description: "Scale your user base with precision-targeted campaigns across Meta, Google, TikTok, and programmatic networks.",
    metrics: { label: "Avg CPA Reduction", value: "42%" },
  },
  {
    icon: Link2,
    title: "Affiliate Marketing",
    description: "Build and manage high-performing affiliate networks that deliver qualified leads at predictable costs.",
    metrics: { label: "Partner Network", value: "5,000+" },
  },
  {
    icon: Target,
    lottieUrl: "https://lottie.host/d6b38c22-9214-4363-94df-73900b3f5457/N9b7Dk4x8v.json",
    title: "Lead Generation",
    description: "Multi-channel lead generation engines optimized for quality, conversion, and lifetime value.",
    metrics: { label: "Monthly Leads", value: "2.5M+" },
  },
  {
    icon: BarChart3,
    title: "Media Buying",
    description: "Strategic media buying across all major platforms with real-time optimization and transparent reporting.",
    metrics: { label: "Monthly Spend", value: "$85M+" },
  },
  {
    icon: Zap,
    title: "Funnel Optimization",
    description: "End-to-end funnel engineering that maximizes conversion rates at every touchpoint.",
    metrics: { label: "Avg Lift", value: "156%" },
  },
  {
    icon: LineChart,
    lottieUrl: "https://lottie.host/e8220f8c-473d-4c3d-b4a1-0ca9813c9e6d/6S8Zf9oKID.json",
    title: "CRO & Analytics",
    description: "Data-driven conversion rate optimization backed by advanced tracking and attribution modeling.",
    metrics: { label: "ROAS Improvement", value: "3.2x" },
  },
  {
    icon: Settings,
    title: "Tracking & Attribution",
    description: "Server-side tracking, first-party data solutions, and cross-platform attribution for complete visibility.",
    metrics: { label: "Data Accuracy", value: "99.7%" },
  },
  {
    icon: Rocket,
    lottieUrl: "https://lottie.host/64299b1e-6e86-4e5c-a563-146313b4c10c/pP0eW8C9J9.json",
    title: "Creative Testing",
    description: "AI-powered creative testing frameworks that identify winning ad combinations at scale.",
    metrics: { label: "Tests/Month", value: "10K+" },
  },
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });
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

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 section-warm" />
      <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-primary text-sm font-semibold uppercase tracking-wider mb-4">
            Our Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Full-Stack Performance Solutions
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            From user acquisition to conversion optimization, we offer comprehensive
            performance marketing services that drive measurable growth at scale.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <TiltCard>
                <div className="group h-full bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 cursor-pointer">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300 overflow-hidden">
                    {'lottieUrl' in service && service.lottieUrl ? (
                      <LottieAnimation url={service.lottieUrl as string} className="w-10 h-10" />
                    ) : (
                      <service.icon className="w-6 h-6 text-primary" />
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">
                        {service.metrics.label}
                      </span>
                      <span className="text-lg font-bold text-primary mono-number">
                        {service.metrics.value}
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-semibold px-8 py-4 rounded-full text-base hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <TrendingUp className="w-5 h-5" />
            Explore All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;