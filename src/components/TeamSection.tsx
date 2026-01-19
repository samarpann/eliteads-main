import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Linkedin } from "lucide-react";
import adityaPhoto from "@/assets/aditya-walia.webp";
import vishnuPhoto from "@/assets/vishnu-goyal.jpg";

const team = [
  {
    name: "Aditya Walia",
    role: "Co-Founder & Performance Lead",
    expertise: "Expert in scaling aggressive performance marketing campaigns in Nutra, Lead Gen & Pay Per Call. Specializes in server-side tracking, cloaking technologies, and maximizing ROAS through precision media buying.",
    photo: adityaPhoto,
    gradient: "from-primary to-cyan-500",
    social: { linkedin: "https://www.linkedin.com/in/aditya-walia-%F0%9F%90%90-a17753289" }
  },
  {
    name: "Vishnu Goyal",
    role: "Co-Founder & Digital Growth Architect",
    expertise: "Founder of ZeroAdo with background in CA. Full-stack digital growth expert with 30+ web projects, high-budget campaign management, and expertise in building scalable marketing ecosystems & complex funnel architectures.",
    photo: vishnuPhoto,
    gradient: "from-cyan-500 to-primary",
    social: { linkedin: "https://www.linkedin.com/in/vishnu-goyal-a4b8a5199" }
  },
];

const TeamSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            OUR TEAM
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Founders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two passionate performance marketers building the future of digital growth.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto" staggerDelay={0.1}>
          {team.map((member) => (
            <StaggerItem key={member.name} animation="fadeUp">
              <motion.div
                className="group relative p-5 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 text-center"
                whileHover={{ y: -5 }}
              >
                {/* Avatar */}
                <motion.div 
                  className={`w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 md:mb-6 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-3xl font-bold text-white shadow-lg overflow-hidden`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                </motion.div>

                {/* Info */}
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary text-xs md:text-sm font-medium mb-2 md:mb-3">{member.role}</p>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 md:mb-6">{member.expertise}</p>

                {/* Social links */}
                <div className="flex justify-center gap-3">
                  <a 
                    href={member.social.linkedin} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-background/50 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                  </a>
                </div>

                {/* Hover glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TeamSection;
