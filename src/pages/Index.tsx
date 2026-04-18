import { lazy, Suspense, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { useLenis } from "@/hooks/useLenis";
import { motion, useScroll, useSpring, useMotionValue, useReducedMotion } from "framer-motion";

// Lazy-load every below-fold section so the hero renders immediately
const MarqueeStrip = lazy(() => import("@/components/MarqueeStrip"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const StackedProjects = lazy(() => import("@/components/StackedProjects"));
const CarProjectsSection = lazy(() => import("@/components/CarProjectsSection"));
const WavyMarqueeStrip = lazy(() => import("@/components/WavyMarqueeStrip"));
const StatsSection = lazy(() => import("@/components/StatsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  // Cursor-following aurora orbs
  const reduce = useReducedMotion();
  const rawX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const rawY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);
  const auroraX = useSpring(rawX, { stiffness: 22, damping: 18, mass: 1.2 });
  const auroraY = useSpring(rawY, { stiffness: 22, damping: 18, mass: 1.2 });
  const aurora2X = useSpring(rawX, { stiffness: 14, damping: 22, mass: 1.8 });
  const aurora2Y = useSpring(rawY, { stiffness: 14, damping: 22, mass: 1.8 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: globalThis.MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, rawX, rawY]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500"
      />

      {/* Background image */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 opacity-[0.28]"
        style={{
          backgroundImage: "url('/images/bg.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background/95" />

      {/* Cursor-following aurora */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            className="fixed -z-10 pointer-events-none"
            style={{
              x: auroraX,
              y: auroraY,
              translateX: "-50%",
              translateY: "-50%",
              width: 700,
              height: 700,
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(265 85% 55% / 0.13) 0%, transparent 70%)",
              willChange: "transform",
            }}
          />
          <motion.div
            aria-hidden
            className="fixed -z-10 pointer-events-none"
            style={{
              x: aurora2X,
              y: aurora2Y,
              translateX: "-50%",
              translateY: "-50%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, hsl(220 90% 60% / 0.10) 0%, transparent 70%)",
              willChange: "transform",
            }}
          />
        </>
      )}

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
          <WavyMarqueeStrip />
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
