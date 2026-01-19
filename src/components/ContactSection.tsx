import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { SectionDecorator, PixelArrow, PixelGem } from "./PixelDecorations";
import PixelEmoji from "./PixelEmoji";

const spendRanges = [
  "$10K - $50K",
  "$50K - $100K",
  "$100K - $500K",
  "$500K - $1M",
  "$1M+",
];

const verticals = [
  "E-commerce / DTC",
  "SaaS / Software",
  "Health & Wellness",
  "Finance / Fintech",
  "Education",
  "Real Estate",
  "Solar / Home Services",
  "Gaming / Apps",
  "Other",
];

const ContactSection = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    spend: "",
    vertical: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // ✅ Google Apps Script Web App URL - Connected to Google Sheets
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzTs9GzqoJDqyfAObMJRRu-QaFSSLOLxivTvWcOX2pZo95vqjm5xreuP5XbPfULJKNj7Q/exec';

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          spend: formData.spend,
          vertical: formData.vertical,
          message: formData.message,
        }),
      });

      // With 'no-cors', we can't read the response, but if we get here, it likely worked
      setIsSubmitted(true);
      setFormData({ name: "", email: "", spend: "", vertical: "", message: "" });

      // Redirect to success page after a short delay
      setTimeout(() => {
        navigate("/success");
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit. Please try again or email us directly at hello@elitead.io');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background - Dark gold-glow section */}
      <div className="absolute inset-0 section-gold-glow" />
      <div className="absolute inset-0 grid-pattern-gold opacity-20" />
      <div className="absolute top-0 left-0 right-0 glow-line" />
      <div className="absolute top-1/4 right-0 w-1/2 h-60 bg-gradient-radial from-secondary/10 to-transparent" />

      {/* Pixel Decorations */}
      <SectionDecorator variant="full" />
      <PixelArrow direction="down" size={28} color="secondary" className="absolute top-20 left-[5%] hidden xl:block" />
      <PixelGem size={22} color="primary" className="absolute top-1/3 right-[4%] hidden xl:block" />

      {/* Floating Pixel Emoji Decorations */}
      <motion.div
        className="absolute top-24 right-[12%] hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="rocket" size={44} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[8%] hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        <motion.div
          animate={{
            y: [0, -18, 0],
            x: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="crown" size={40} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-[3%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="fire" size={36} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-40 right-[6%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="diamond" size={38} animate={false} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-36 left-[15%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, type: "spring" }}
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelEmoji type="brain" size={42} animate={false} />
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block font-orbitron text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider mb-3 sm:mb-4 feature-badge">
                Let's Talk Growth
              </span>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6">
                <span className="pixel-text-gold">READY TO </span>
                <span className="pixel-text-neon">SCALE?</span>
              </h2>
              <p className="font-inter text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10">
                Partner with Elite Ad to transform your marketing into a
                predictable, scalable revenue engine. Let's discuss your goals.
              </p>

              {/* Contact Info */}
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-inter text-sm text-muted-foreground">Email</div>
                    <div className="font-inter text-foreground font-medium">hello@elitead.io</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-inter text-sm text-muted-foreground">Phone</div>
                    <div className="font-inter text-foreground font-medium">+1 (888) ELITE-AD</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-inter text-sm text-muted-foreground">Headquarters</div>
                    <div className="font-inter text-foreground font-medium">New York, NY</div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="glass-card rounded-2xl p-6 inline-block">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-orbitron text-sm font-semibold text-foreground">
                    Why Partner With Us
                  </span>
                </div>
                <ul className="space-y-3">
                  {[
                    "No long-term contracts required",
                    "Full transparency on spend & results",
                    "Dedicated performance team",
                    "Weekly strategy calls included",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card rounded-3xl p-8 md:p-10 border border-border/50">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block font-inter text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="John Smith"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block font-inter text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="john@company.com"
                      />
                    </div>

                    {/* Monthly Spend */}
                    <div>
                      <label htmlFor="spend" className="block font-inter text-sm font-medium text-foreground mb-2">
                        Monthly Ad Spend
                      </label>
                      <select
                        id="spend"
                        name="spend"
                        value={formData.spend}
                        onChange={handleChange}
                        required
                        className="form-input appearance-none cursor-pointer"
                      >
                        <option value="">Select range...</option>
                        {spendRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vertical */}
                    <div>
                      <label htmlFor="vertical" className="block font-inter text-sm font-medium text-foreground mb-2">
                        Industry / Vertical
                      </label>
                      <select
                        id="vertical"
                        name="vertical"
                        value={formData.vertical}
                        onChange={handleChange}
                        required
                        className="form-input appearance-none cursor-pointer"
                      >
                        <option value="">Select vertical...</option>
                        {verticals.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block font-inter text-sm font-medium text-foreground mb-2">
                        Tell Us About Your Goals
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="form-input resize-none"
                        placeholder="What are you looking to achieve?"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-gold flex items-center justify-center gap-2 font-orbitron disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Inquiry
                        </>
                      )}
                    </button>

                    {error && (
                      <p className="text-center text-sm text-red-400">{error}</p>
                    )}

                    <p className="text-center text-xs text-muted-foreground">
                      We typically respond within 24 hours.
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="font-orbitron text-2xl font-bold text-foreground mb-4">
                      Thank You!
                    </h3>
                    <p className="font-inter text-muted-foreground mb-6">
                      Your inquiry has been received. Our team will be in touch within 24 hours
                      to discuss how we can help scale your growth.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-outline-gold font-orbitron text-sm"
                    >
                      Submit Another Inquiry
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
