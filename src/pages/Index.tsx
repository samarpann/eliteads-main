import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsCounterSection from "@/components/StatsCounterSection";
import ClientLogosMarquee from "@/components/ClientLogosMarquee";
import ServicesSection from "@/components/ServicesSection";
import DashboardSection from "@/components/DashboardSection";
import LiveDashboard from "@/components/LiveDashboard";
import ProcessSection from "@/components/ProcessSection";
import IndustriesSection from "@/components/IndustriesSection";
import CaseStudySlider from "@/components/CaseStudySlider";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import VideoTestimonialsSection from "@/components/VideoTestimonialsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ROICalculator from "@/components/ROICalculator";
import TeamSection from "@/components/TeamSection";
import AwardsSection from "@/components/AwardsSection";
import ComparisonTable from "@/components/ComparisonTable";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import GlobalPresenceSection from "@/components/GlobalPresenceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AdvancedCursor from "@/components/AdvancedCursor";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";
import SoundToggle from "@/components/SoundToggle";
import NoiseTexture from "@/components/NoiseTexture";
import MorphingGradient from "@/components/MorphingGradient";
import MobileEffects from "@/components/MobileEffects";
import { retroSound } from "@/lib/retroSound";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const gradientRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const lastMouseRef = useRef({ x: 50, y: 50 });

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      retroSound.playIntro();
    }, 300);
  };

  // Optimized mouse tracking - only updates on movement
  useEffect(() => {
    if (isLoading) return;

    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let isAnimating = false;

    const updateGradient = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Stop when close enough
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        isAnimating = false;
        return;
      }

      currentX += dx * 0.08;
      currentY += dy * 0.08;

      if (gradientRef.current) {
        gradientRef.current.style.background = `radial-gradient(600px circle at ${currentX}% ${currentY}%, hsl(142 70% 45% / 0.07), transparent 40%)`;
      }

      rafRef.current = requestAnimationFrame(updateGradient);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;

      if (!isAnimating) {
        isAnimating = true;
        rafRef.current = requestAnimationFrame(updateGradient);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}</AnimatePresence>

      <div
        className={`min-h-screen bg-background overflow-x-hidden ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{ willChange: "auto", transition: "opacity 0.5s ease-in-out" }}
      >
        {/* Subtle background gradient */}
        <div
          ref={gradientRef}
          className="fixed inset-0 pointer-events-none z-0 opacity-20"
          style={{
            background: `radial-gradient(800px circle at 50% 50%, hsl(158 64% 40% / 0.05), transparent 50%)`,
          }}
        />

        {/* Premium cursor - desktop only */}
        <AdvancedCursor />
        {/* Mobile touch effects */}
        <MobileEffects />
        <ScrollProgress />
        <SoundToggle />
        <Header />

        <main className="relative z-10">
          <HeroSection />

          {/* Elegant section divider */}
          <div className="divider-elegant" />

          <StatsCounterSection />
          <ClientLogosMarquee />

          <div className="divider-elegant" />

          <ServicesSection />
          <LiveDashboard />

          <div className="divider-elegant" />

          <CaseStudySlider />
          <ProcessSection />

          <div className="divider-elegant" />

          <ROICalculator />
          <IndustriesSection />

          <div className="divider-elegant" />

          <VideoTestimonialsSection />
          <ComparisonTable />

          <div className="divider-elegant" />

          <TeamSection />
          <AwardsSection />

          <div className="divider-elegant" />

          <FAQSection />
          <BlogSection />

          <div className="divider-elegant" />

          <GlobalPresenceSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
