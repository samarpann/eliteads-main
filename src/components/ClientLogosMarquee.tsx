import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const clients = [
  { name: "TechCorp", industry: "SaaS" },
  { name: "FinanceHub", industry: "Fintech" },
  { name: "HealthPlus", industry: "Healthcare" },
  { name: "RetailMax", industry: "E-commerce" },
  { name: "TravelGo", industry: "Travel" },
  { name: "EduLearn", industry: "EdTech" },
  { name: "FoodDelivery", industry: "Food" },
  { name: "AutoDrive", industry: "Automotive" },
  { name: "GameStudio", industry: "Gaming" },
  { name: "CryptoVault", industry: "Crypto" },
  { name: "InsureSafe", industry: "Insurance" },
  { name: "RealEstatePro", industry: "Real Estate" },
];

const ClientLogosMarquee = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 mb-8">
        <ScrollReveal animation="fadeUp" className="text-center">
          <span className="text-xs font-mono tracking-wider text-muted-foreground">
            TRUSTED BY INDUSTRY LEADERS
          </span>
        </ScrollReveal>
      </div>

      {/* First row - left to right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          className="flex gap-4 md:gap-8 py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="px-4 md:px-8 py-3 md:py-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all duration-300 cursor-pointer">
                <div className="text-base md:text-xl font-bold text-muted-foreground group-hover:text-foreground transition-colors grayscale group-hover:grayscale-0">
                  {client.name}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                  {client.industry}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second row - right to left */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          className="flex gap-4 md:gap-8 py-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...clients.reverse(), ...clients].map((client, index) => (
            <div
              key={`${client.name}-rev-${index}`}
              className="flex-shrink-0 group"
            >
              <div className="px-4 md:px-8 py-3 md:py-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 hover:bg-card/50 transition-all duration-300 cursor-pointer">
                <div className="text-base md:text-xl font-bold text-muted-foreground group-hover:text-foreground transition-colors grayscale group-hover:grayscale-0">
                  {client.name}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground/50 group-hover:text-primary/70 transition-colors">
                  {client.industry}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogosMarquee;
