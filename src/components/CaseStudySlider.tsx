import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react";

const caseStudies = [
  {
    client: "E-Commerce Giant",
    industry: "Retail",
    before: { roas: 1.2, cpa: 45, conversions: 1200 },
    after: { roas: 4.8, cpa: 12, conversions: 8500 },
    improvement: { roas: "+300%", cpa: "-73%", conversions: "+608%" },
    description: "Transformed underperforming campaigns into a conversion machine through AI-driven optimization.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    client: "FinTech Startup",
    industry: "Finance",
    before: { roas: 0.8, cpa: 120, conversions: 340 },
    after: { roas: 6.2, cpa: 28, conversions: 4200 },
    improvement: { roas: "+675%", cpa: "-77%", conversions: "+1135%" },
    description: "Scaled user acquisition while dramatically reducing cost per qualified lead.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    client: "Health & Wellness",
    industry: "Nutra",
    before: { roas: 2.1, cpa: 65, conversions: 890 },
    after: { roas: 8.4, cpa: 18, conversions: 12400 },
    improvement: { roas: "+300%", cpa: "-72%", conversions: "+1293%" },
    description: "Built a scalable funnel system that consistently delivers qualified buyers at scale.",
    gradient: "from-purple-500 to-pink-500"
  },
];

const CaseStudySlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const activeStudy = caseStudies[activeIndex];

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            CASE STUDIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Before & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">After</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real transformations from real campaigns. See how we turn struggling accounts into profit machines.
          </p>
        </ScrollReveal>

        {/* Case study selector */}
        <div className="flex justify-start md:justify-center gap-2 md:gap-4 mb-12 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {caseStudies.map((study, index) => (
            <button
              key={study.client}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50"
              }`}
            >
              {study.client}
            </button>
          ))}
        </div>

        {/* Before/After comparison */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {/* Before */}
          <div className="relative p-5 md:p-8 rounded-2xl bg-card/30 border border-red-500/20 backdrop-blur-sm">
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-mono">
              BEFORE
            </div>
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> ROAS
                </span>
                <span className="text-2xl font-bold text-red-400">{activeStudy.before.roas}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> CPA
                </span>
                <span className="text-2xl font-bold text-red-400">${activeStudy.before.cpa}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Conversions
                </span>
                <span className="text-2xl font-bold text-red-400">{activeStudy.before.conversions.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="relative p-5 md:p-8 rounded-2xl bg-card/30 border border-green-500/20 backdrop-blur-sm">
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-mono">
              AFTER
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-mono">
                {activeStudy.improvement.roas} ROAS
              </span>
            </div>
            <div className="mt-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> ROAS
                </span>
                <span className="text-2xl font-bold text-green-400">{activeStudy.after.roas}x</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> CPA
                </span>
                <span className="text-2xl font-bold text-green-400">${activeStudy.after.cpa}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" /> Conversions
                </span>
                <span className="text-2xl font-bold text-green-400">{activeStudy.after.conversions.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          key={`desc-${activeIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto"
        >
          {activeStudy.description}
        </motion.p>

        {/* Arrow indicator */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-16">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <ArrowRight className="w-6 h-6 text-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudySlider;
