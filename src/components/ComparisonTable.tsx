import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Check, X, Star, Zap } from "lucide-react";

const features = [
  {
    category: "Campaign Management",
    items: [
      { name: "Multi-platform campaigns", us: true, others: true },
      { name: "AI-powered optimization", us: true, others: false },
      { name: "Real-time bidding adjustments", us: true, others: "partial" },
      { name: "Creative testing at scale", us: true, others: false },
    ]
  },
  {
    category: "Tracking & Analytics",
    items: [
      { name: "Server-side tracking", us: true, others: false },
      { name: "Cross-platform attribution", us: true, others: "partial" },
      { name: "First-party data solutions", us: true, others: false },
      { name: "Real-time dashboards", us: true, others: true },
    ]
  },
  {
    category: "Support & Reporting",
    items: [
      { name: "Dedicated account manager", us: true, others: "partial" },
      { name: "Weekly strategy calls", us: true, others: false },
      { name: "24/7 Slack support", us: true, others: false },
      { name: "Custom reporting", us: true, others: true },
    ]
  },
  {
    category: "Results & Guarantees",
    items: [
      { name: "Performance guarantees", us: true, others: false },
      { name: "Transparent pricing", us: true, others: "partial" },
      { name: "No long-term contracts", us: true, others: false },
      { name: "Revenue share options", us: true, others: false },
    ]
  },
];

const ComparisonTable = () => {
  const renderValue = (value: boolean | string) => {
    if (value === true) {
      return (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
        >
          <Check className="w-4 h-4 text-green-500" />
        </motion.div>
      );
    }
    if (value === "partial") {
      return (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto"
        >
          <span className="text-yellow-500 text-xs">~</span>
        </motion.div>
      );
    }
    return (
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mx-auto"
      >
        <X className="w-4 h-4 text-red-500" />
      </motion.div>
    );
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            <Zap className="w-3 h-3 inline mr-2" />
            WHY US
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Difference</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how we stack up against typical agencies and in-house teams.
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.2}>
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 bg-card/50 border-b border-border/30 min-w-[400px]">
              <div className="text-xs md:text-sm font-medium text-muted-foreground">Features</div>
              <div className="text-center">
                <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full bg-primary/10 border border-primary/30">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                  <span className="font-semibold text-primary text-xs md:text-sm">Us</span>
                </div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-full bg-muted/50">
                  <span className="font-medium text-muted-foreground text-xs md:text-sm">Others</span>
                </div>
              </div>
            </div>

            {/* Feature sections */}
            {features.map((section, sectionIndex) => (
              <div key={section.category} className="min-w-[400px]">
                {/* Section header */}
                <div className="px-4 md:px-6 py-2 md:py-3 bg-muted/30 border-b border-border/30">
                  <span className="text-[10px] md:text-xs font-mono tracking-wider text-muted-foreground">
                    {section.category.toUpperCase()}
                  </span>
                </div>
                
                {/* Section items */}
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                    className="grid grid-cols-3 gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 border-b border-border/20 hover:bg-primary/5 transition-colors"
                  >
                    <div className="text-xs md:text-sm text-foreground">{item.name}</div>
                    <div className="text-center">{renderValue(item.us)}</div>
                    <div className="text-center">{renderValue(item.others)}</div>
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Footer CTA */}
            <div className="p-6 bg-gradient-to-r from-primary/10 to-cyan-500/10 text-center">
              <motion.button
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Growth Journey
              </motion.button>
            </div>
          </div>
        </ScrollReveal>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-8 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-green-500" />
            </div>
            Included
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <span className="text-yellow-500 text-[10px]">~</span>
            </div>
            Partial
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
              <X className="w-3 h-3 text-red-500" />
            </div>
            Not Included
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
