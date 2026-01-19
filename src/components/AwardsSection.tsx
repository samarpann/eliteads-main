import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Award, Shield, Star, CheckCircle } from "lucide-react";

const awards = [
  {
    title: "Google Premier Partner",
    description: "Top 3% of Google Partners worldwide",
    year: "2024",
    icon: Award,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Meta Business Partner",
    description: "Certified Meta advertising partner",
    year: "2024",
    icon: Shield,
    gradient: "from-blue-600 to-indigo-500"
  },
  {
    title: "TikTok Marketing Partner",
    description: "Official TikTok for Business partner",
    year: "2024",
    icon: Star,
    gradient: "from-pink-500 to-red-500"
  },
  {
    title: "Clutch Top Agency",
    description: "Ranked #1 Performance Marketing",
    year: "2024",
    icon: Award,
    gradient: "from-orange-500 to-yellow-500"
  },
];

const certifications = [
  "Google Ads Certified",
  "Meta Blueprint Certified",
  "Google Analytics Certified",
  "Voluum Certified Partner",
  "Binom Elite Partner",
  "RedTrack Official Partner",
  "ClickBank Platinum",
  "Impact.com Partner",
];

const AwardsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            <Award className="w-3 h-3 inline mr-2" />
            RECOGNITION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Awards & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Recognized by the industry's leading platforms and organizations.
          </p>
        </ScrollReveal>

        {/* Awards grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" staggerDelay={0.1}>
          {awards.map((award) => (
            <StaggerItem key={award.title} animation="scale">
              <motion.div
                className="group relative p-4 md:p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Icon */}
                <motion.div 
                  className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br ${award.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: 10 }}
                >
                  <award.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>

                {/* Year badge */}
                <span className="inline-block px-2 py-0.5 mb-3 text-xs font-mono text-primary bg-primary/10 rounded">
                  {award.year}
                </span>

                <h3 className="text-sm md:text-lg font-semibold text-foreground mb-1">{award.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{award.description}</p>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${award.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Certifications */}
        <ScrollReveal animation="fadeUp">
          <div className="p-5 md:p-8 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm">
            <h3 className="text-base md:text-lg font-semibold text-foreground text-center mb-4 md:mb-6">
              Certifications & Partnerships
            </h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background/50 border border-border/50 text-xs md:text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {cert}
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default AwardsSection;
