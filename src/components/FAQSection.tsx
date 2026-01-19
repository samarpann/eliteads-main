import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer: "We specialize in high-growth verticals including e-commerce, SaaS, fintech, health & wellness (nutra), gaming, and lead generation. Our team has deep expertise in both whitehat and aggressive scaling strategies across these industries."
  },
  {
    question: "What's your minimum ad spend requirement?",
    answer: "We typically work with clients spending $50,000+ per month on paid advertising. This allows us to implement proper testing frameworks and optimization strategies that deliver meaningful results. For smaller budgets, we offer consulting packages."
  },
  {
    question: "How do you handle tracking and attribution?",
    answer: "We implement server-side tracking solutions, first-party data collection, and advanced attribution modeling. We're partners with Voluum, Binom, and RedTrack, ensuring accurate data even with iOS 14+ privacy changes and cookie deprecation."
  },
  {
    question: "What's your typical timeline for seeing results?",
    answer: "Most clients see meaningful improvements within 30-60 days. Initial optimizations and quick wins happen in weeks 1-2, while more substantial scaling typically occurs in months 2-3. We provide weekly reporting and real-time dashboard access."
  },
  {
    question: "Do you offer performance-based pricing?",
    answer: "Yes, we offer hybrid pricing models that include a base management fee plus performance bonuses tied to exceeding agreed-upon KPIs. This aligns our incentives with your success and demonstrates our confidence in delivering results."
  },
  {
    question: "What platforms do you advertise on?",
    answer: "We manage campaigns across Meta (Facebook/Instagram), Google Ads, TikTok, YouTube, native advertising networks (Taboola, Outbrain), programmatic DSPs, and affiliate networks. Our multi-channel approach ensures optimal reach and diversification."
  },
  {
    question: "How do you protect against account bans?",
    answer: "We implement robust compliance frameworks, use proper cloaking techniques where applicable, maintain backup infrastructure, and have established agency relationships with major platforms. Our experience minimizes risk while maximizing scale."
  },
  {
    question: "Can you work with our existing team?",
    answer: "Absolutely. We often work alongside in-house marketing teams, providing specialized expertise in media buying, tracking, and optimization. We can function as an extension of your team or handle campaigns entirely independently."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeUp" className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono tracking-wider text-primary border border-primary/30 rounded-full bg-primary/5">
            <MessageCircle className="w-3 h-3 inline mr-2" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <ScrollReveal key={index} animation="fadeUp" delay={index * 0.05}>
              <motion.div
                className="mb-4"
                initial={false}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                    openIndex === index
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-card/50 border border-border/50 hover:border-primary/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-foreground pr-8">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 ${openIndex === index ? "text-primary" : "text-muted-foreground"}`} />
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground mt-4 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact CTA */}
        <ScrollReveal animation="fadeUp" delay={0.4} className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <motion.button
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FAQSection;
