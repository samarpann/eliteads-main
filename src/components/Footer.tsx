import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Twitter, Instagram, Youtube, Mail, ArrowRight } from "lucide-react";
import logo from "@/assets/elite-ad-logo.png";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const footerLinks = {
  services: [
    "User Acquisition",
    "Affiliate Marketing",
    "Lead Generation",
    "Media Buying",
    "Funnel Optimization",
    "CRO & Analytics",
  ],
  company: [
    "About Us",
    "Case Studies",
    "Careers",
    "Contact",
    "Blog",
    "Press",
  ],
  resources: [
    "Performance Blog",
    "Growth Playbooks",
    "Industry Reports",
    "Partner Program",
    "API Documentation",
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-accent pt-20 sm:pt-24 pb-8">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16" staggerDelay={0.1}>
          {/* Brand Column */}
          <StaggerItem className="lg:col-span-2">
            <motion.div 
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={logo}
                alt="Elite Ad"
                loading="lazy"
                decoding="async"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </motion.div>
            <p className="text-accent-foreground/80 mb-6 max-w-sm leading-relaxed">
              Performance marketing powerhouse delivering measurable growth 
              through data-driven strategies and cutting-edge technology.
            </p>
            
            {/* Newsletter */}
            <div className="bg-accent-foreground/5 rounded-2xl p-5 border border-accent-foreground/10">
              <div className="text-sm font-semibold text-accent-foreground mb-3">
                Subscribe to our newsletter
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-accent-foreground/10 border border-accent-foreground/20 rounded-lg px-4 py-2.5 text-sm text-accent-foreground placeholder:text-accent-foreground/50 focus:outline-none focus:border-primary"
                />
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg transition-colors duration-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </StaggerItem>

          {/* Services Links */}
          <StaggerItem>
            <h4 className="text-sm font-semibold text-accent-foreground mb-6 uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <a
                    href="#services"
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Company Links */}
          <StaggerItem>
            <h4 className="text-sm font-semibold text-accent-foreground mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Resources Links */}
          <StaggerItem>
            <h4 className="text-sm font-semibold text-accent-foreground mb-6 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-accent-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Bar */}
        <ScrollReveal animation="fadeUp" delay={0.3}>
          <div className="border-t border-accent-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-sm text-accent-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} Elite Ad. All rights reserved. | 
              <a href="#" className="hover:text-primary ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-primary ml-1">Terms of Service</a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-accent-foreground/10 flex items-center justify-center text-accent-foreground/70 hover:text-primary hover:bg-accent-foreground/20 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors duration-300"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default Footer;