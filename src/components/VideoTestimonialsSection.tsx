import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Quote, Star } from "lucide-react";
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CMO",
    company: "TechScale Inc",
    quote: "They transformed our entire acquisition strategy. We went from struggling to hit targets to consistently exceeding them by 200%. The team's expertise in tracking and optimization is unmatched.",
    rating: 5,
    metrics: { roas: "5.2x", growth: "+340%" },
    thumbnail: "SC"
  },
  {
    id: 2,
    name: "Marcus Williams",
    role: "Head of Growth",
    company: "FinanceFlow",
    quote: "The ROI we've seen is incredible. Their data-driven approach helped us identify opportunities we never knew existed. Best decision we made for our marketing.",
    rating: 5,
    metrics: { roas: "7.8x", growth: "+520%" },
    thumbnail: "MW"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "VP Marketing",
    company: "HealthFirst",
    quote: "Working with this team has been a game-changer. They don't just run campaigns—they build sustainable growth engines. Our CAC dropped 60% in 3 months.",
    rating: 5,
    metrics: { roas: "6.4x", growth: "+280%" },
    thumbnail: "ER"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Clients Say</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the leaders who've transformed their growth with us.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.id} animation="fadeUp">
              <motion.div
                className="group relative h-full p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 backdrop-blur-sm transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">{testimonial.thumbnail}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative mb-4">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                  <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Metrics */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <div className="text-xs text-muted-foreground">ROAS</div>
                    <div className="text-lg font-bold text-primary">{testimonial.metrics.roas}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Growth</div>
                    <div className="text-lg font-bold text-green-400">{testimonial.metrics.growth}</div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;
