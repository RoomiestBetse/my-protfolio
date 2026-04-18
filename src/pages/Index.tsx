import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { useLenis } from "@/hooks/useLenis";
import { motion, useScroll, useSpring } from "framer-motion";

// Lazy-load every below-fold section so the hero renders immediately
const MarqueeStrip = lazy(() => import("@/components/MarqueeStrip"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const StackedProjects = lazy(() => import("@/components/StackedProjects"));
const CarProjectsSection = lazy(() => import("@/components/CarProjectsSection"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
      />

      {/* Background image, very subtle */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url('/images/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px)",
          willChange: "transform",
        }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/90 to-background" />
      {/* Film grain texture for premium depth */}
      <div aria-hidden className="grain-overlay" />

      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <MarqueeStrip />
          <AboutSection />
          <SkillsSection />
          <StackedProjects />
          <CarProjectsSection />
          <StatsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
