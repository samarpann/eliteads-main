import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { PixelStar, PixelHeart, PixelCorner } from "./PixelDecorations";
import PixelEmoji from "./PixelEmoji";

type EmojiType = "chart" | "coin" | "users" | "target" | "fire";

const testimonials: {
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  emoji: EmojiType;
}[] = [
  {
    quote: "Elite Ad transformed our marketing from a cost center to our primary growth engine. Their data-driven approach delivered 12x ROAS in our first 6 months.",
    author: "Sarah Chen",
    title: "CMO",
    company: "TechScale Pro",
    rating: 5,
    emoji: "chart",
  },
  {
    quote: "The team's expertise in affiliate marketing and lead generation helped us reduce CAC by 45% while scaling to $5M monthly spend. Exceptional results.",
    author: "Michael Rodriguez",
    title: "VP of Growth",
    company: "FinanceHub",
    rating: 5,
    emoji: "coin",
  },
  {
    quote: "Working with Elite Ad feels like having an in-house performance team with 10x the expertise. They've become an indispensable extension of our marketing.",
    author: "Emily Watson",
    title: "Founder & CEO",
    company: "WellnessFirst",
    rating: 5,
    emoji: "users",
  },
  {
    quote: "Their funnel optimization and creative testing capabilities are unmatched. We've seen consistent 8x+ ROAS for over 18 months now.",
    author: "David Park",
    title: "Director of Marketing",
    company: "EcomGrowth",
    rating: 5,
    emoji: "target",
  },
  {
    quote: "Elite Ad's approach to tracking and attribution gave us visibility we never had before. Every dollar spent is now fully accounted for.",
    author: "Jessica Martinez",
    title: "Head of Digital",
    company: "SolarTech Solutions",
    rating: 5,
    emoji: "fire",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark warm section */}
      <div className="absolute inset-0 section-medium" />
      <div className="absolute inset-0 grid-pattern-gold opacity-15" />
      <div className="absolute top-0 left-0 right-0 glow-line" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-40 bg-gradient-radial from-gold/8 to-transparent" />
      
      {/* Pixel Decorations */}
      <PixelCorner position="top-left" size={45} color="secondary" className="m-6 hidden lg:block" />
      <PixelCorner position="bottom-right" size={45} color="primary" className="m-6 hidden lg:block" />
      <PixelHeart size={20} color="accent" className="absolute top-16 right-[12%] hidden lg:block" />
      <PixelStar size={16} color="secondary" className="absolute bottom-20 left-[8%] hidden lg:block" delay={0.5} />

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge">
            Client Success
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
            <span className="pixel-text-gold">WHAT OUR </span>
            <span className="pixel-text-neon">PARTNERS SAY</span>
          </h2>
          <p className="font-inter text-base sm:text-lg text-muted-foreground">
            Trusted by leading brands across industries to deliver 
            exceptional performance marketing results.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Testimonial Card */}
            <div className="testimonial-card text-center relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 hud-corner opacity-30" />
              <div className="absolute top-4 right-4 hud-corner rotate-90 opacity-30" />
              <div className="absolute bottom-4 left-4 hud-corner -rotate-90 opacity-30" />
              <div className="absolute bottom-4 right-4 hud-corner rotate-180 opacity-30" />

              {/* Pixel Emoji Icon */}
              <div className="flex justify-center mb-6">
                <motion.div 
                  key={`emoji-${activeIndex}`}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/30 to-gold-light/30 flex items-center justify-center"
                >
                  <PixelEmoji type={testimonials[activeIndex].emoji} size={40} animate={false} />
                </motion.div>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-secondary" />
                ))}
              </div>

              {/* Quote Text */}
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-inter text-xl md:text-2xl text-foreground mb-8 leading-relaxed"
              >
                "{testimonials[activeIndex].quote}"
              </motion.blockquote>

              {/* Author */}
              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="font-orbitron text-lg font-bold text-foreground mb-1">
                  {testimonials[activeIndex].author}
                </div>
                <div className="font-inter text-sm text-muted-foreground">
                  {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/10 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary/10 transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-3 sm:gap-6"
        >
          {["Meta Partner", "Google Premier", "TikTok Marketing", "Taboola Partner", "Outbrain Partner"].map((partner) => (
            <div
              key={partner}
              className="partner-badge"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
