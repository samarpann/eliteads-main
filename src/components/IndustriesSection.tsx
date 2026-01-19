import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Banknote, ShoppingCart, GraduationCap, Building, Code, Sun, Gamepad2 } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import PixelEmoji from "./PixelEmoji";

type EmojiType = "heart" | "coin" | "cart" | "graduate" | "building" | "code" | "sun" | "gamepad";

const industries: {
  icon: typeof Heart;
  emoji: EmojiType;
  title: string;
  description: string;
  stats: string;
}[] = [
  {
    icon: Heart,
    emoji: "heart",
    title: "Health & Wellness",
    description: "Supplements, fitness, mental health, and wellness brands scaling with compliant advertising.",
    stats: "$45M+ managed",
  },
  {
    icon: Banknote,
    emoji: "coin",
    title: "Finance & Fintech",
    description: "Banking, crypto, insurance, and investment platforms acquiring customers profitably.",
    stats: "12.4x avg ROAS",
  },
  {
    icon: ShoppingCart,
    emoji: "cart",
    title: "E-commerce & DTC",
    description: "Direct-to-consumer brands scaling from 6 to 8 figures with profitable paid media.",
    stats: "350+ brands",
  },
  {
    icon: GraduationCap,
    emoji: "graduate",
    title: "Education",
    description: "Online courses, edtech platforms, and educational institutions driving enrollments.",
    stats: "$8.50 avg CPL",
  },
  {
    icon: Building,
    emoji: "building",
    title: "Real Estate",
    description: "Property developers, agents, and investment firms generating qualified buyer leads.",
    stats: "85% close rate",
  },
  {
    icon: Code,
    emoji: "code",
    title: "SaaS & Software",
    description: "B2B and B2C software companies scaling user acquisition and reducing CAC.",
    stats: "42% CAC reduction",
  },
  {
    icon: Sun,
    emoji: "sun",
    title: "Solar & Home Services",
    description: "Solar installers, HVAC, and home improvement companies generating exclusive leads.",
    stats: "2.5M leads/month",
  },
  {
    icon: Gamepad2,
    emoji: "gamepad",
    title: "Gaming & Apps",
    description: "Mobile games and apps scaling user acquisition with precise LTV:CAC optimization.",
    stats: "$0.42 avg CPI",
  },
];

const IndustriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark gold-glow section */}
      <div className="absolute inset-0 section-gold-glow" />
      <div className="absolute inset-0 grid-pattern opacity-25" />
      <div className="absolute top-0 left-0 right-0 glow-line" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-40 bg-gradient-radial from-primary/8 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <ScrollReveal animation="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge">
            Industries We Serve
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            <span className="pixel-text-gold">VERTICAL </span>
            <span className="pixel-text-neon">EXPERTISE</span>
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            Deep industry knowledge combined with performance marketing expertise 
            delivers exceptional results across diverse verticals.
          </p>
        </ScrollReveal>

        {/* Industries Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {industries.map((industry) => (
            <StaggerItem key={industry.title}>
              <div className="group perspective h-full">
                <div className="glass-card rounded-2xl p-6 h-full border border-border/50 hover:border-secondary/50 transition-all duration-500 transform-gpu group-hover:-translate-y-2 group-hover:shadow-lg">
                  {/* Pixel Emoji Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-gold-light/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <PixelEmoji type={industry.emoji} size={36} animate={false} />
                  </div>

                  {/* Title */}
                  <h3 className="font-orbitron text-lg font-semibold text-foreground mb-3">
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm text-muted-foreground mb-5 leading-relaxed">
                    {industry.description}
                  </p>

                  {/* Stats Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="mono-number text-sm font-semibold text-primary">
                      {industry.stats}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default IndustriesSection;
