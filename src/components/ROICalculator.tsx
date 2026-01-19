import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { Calculator, TrendingUp, DollarSign, Users, ArrowRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const ROICalculator = () => {
  const [monthlySpend, setMonthlySpend] = useState(50000);
  const [currentROAS, setCurrentROAS] = useState(2);
  const [industry, setIndustry] = useState("ecommerce");

  const industries = [
    { id: "ecommerce", name: "E-Commerce", multiplier: 3.2 },
    { id: "saas", name: "SaaS", multiplier: 2.8 },
    { id: "finance", name: "Finance", multiplier: 3.5 },
    { id: "health", name: "Health/Nutra", multiplier: 4.0 },
    { id: "gaming", name: "Gaming", multiplier: 2.5 },
  ];

  const selectedIndustry = industries.find(i => i.id === industry) || industries[0];

  const projections = useMemo(() => {
    const projectedROAS = Math.min(currentROAS * selectedIndustry.multiplier, 12);
    const currentRevenue = monthlySpend * currentROAS;
    const projectedRevenue = monthlySpend * projectedROAS;
    const additionalRevenue = projectedRevenue - currentRevenue;
    const projectedLeads = Math.round((monthlySpend / 15) * selectedIndustry.multiplier);
    
    return {
      currentRevenue,
      projectedRevenue,
      additionalRevenue,
      projectedROAS: projectedROAS.toFixed(1),
      projectedLeads,
      roasImprovement: ((projectedROAS / currentROAS - 1) * 100).toFixed(0)
    };
  }, [monthlySpend, currentROAS, selectedIndustry]);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            <Calculator className="w-3 h-3 inline mr-2" />
            ROI CALCULATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            See Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Growth Potential</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Input your current metrics and see what's possible with our optimization strategies.
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <ScrollReveal animation="fadeLeft" className="p-5 md:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6 md:mb-8">Your Current Metrics</h3>
              
              {/* Monthly Spend Slider */}
              <div className="mb-6 md:mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm text-muted-foreground">Monthly Ad Spend</label>
                  <span className="text-lg font-bold text-foreground">${monthlySpend.toLocaleString()}</span>
                </div>
                <Slider
                  value={[monthlySpend]}
                  onValueChange={(value) => setMonthlySpend(value[0])}
                  min={5000}
                  max={500000}
                  step={5000}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>$5K</span>
                  <span>$500K</span>
                </div>
              </div>

              {/* Current ROAS Slider */}
              <div className="mb-6 md:mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm text-muted-foreground">Current ROAS</label>
                  <span className="text-lg font-bold text-foreground">{currentROAS.toFixed(1)}x</span>
                </div>
                <Slider
                  value={[currentROAS]}
                  onValueChange={(value) => setCurrentROAS(value[0])}
                  min={0.5}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>0.5x</span>
                  <span>5x</span>
                </div>
              </div>

              {/* Industry Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-3 block">Industry</label>
                <div className="grid grid-cols-2 gap-2">
                  {industries.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setIndustry(ind.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        industry === ind.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-card hover:bg-card/80 text-muted-foreground border border-border/50"
                      }`}
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Results */}
            <ScrollReveal animation="fadeRight" className="p-5 md:p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20 backdrop-blur-sm">
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6 md:mb-8">Projected Results</h3>
              
              <div className="space-y-6">
                {/* Projected ROAS */}
                <motion.div 
                  className="p-4 rounded-xl bg-background/50"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  key={projections.projectedROAS}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">Projected ROAS</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-primary">{projections.projectedROAS}x</div>
                      <div className="text-xs text-green-400">+{projections.roasImprovement}%</div>
                    </div>
                  </div>
                </motion.div>

                {/* Monthly Revenue */}
                <motion.div 
                  className="p-4 rounded-xl bg-background/50"
                  key={projections.projectedRevenue}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-green-400">${projections.projectedRevenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">from ${projections.currentRevenue.toLocaleString()}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Additional Revenue */}
                <motion.div 
                  className="p-4 rounded-xl bg-background/50"
                  key={projections.additionalRevenue}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">Additional Revenue</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-cyan-400">+${projections.additionalRevenue.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                    </div>
                  </div>
                </motion.div>

                {/* Projected Leads */}
                <motion.div 
                  className="p-4 rounded-xl bg-background/50"
                  key={projections.projectedLeads}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Users className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">Projected Leads</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl md:text-2xl font-bold text-purple-400">{projections.projectedLeads.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* CTA */}
              <motion.button
                className="w-full mt-8 py-4 px-6 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Your Custom Strategy
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
