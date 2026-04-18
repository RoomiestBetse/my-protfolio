import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, MouseEvent } from "react";
import avatarImg from "@/assets/avatar.jpg";
import { RevealText } from "@/components/animations/RevealText";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yAvatarScroll = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const ySubtext = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Magnetic avatar
  const reduce = useReducedMotion();
  const avatarRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });
  const handleAvatarMove = (e: MouseEvent) => {
    if (reduce || !avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  };
  const resetAvatar = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20">
      {/* Gradient orbs */}
      <div className="absolute -top-32 -left-40 w-[480px] h-[480px] gradient-orb opacity-40" />
      <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] gradient-orb opacity-30" />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto w-full">
        {/* Top tag row */}
        <Reveal className="flex items-center justify-between mb-10 md:mb-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                style={{ animation: "radar-ring 1.6s ease-out infinite" }}
              />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            Available for opportunities
          </div>
          <div className="hidden sm:block">Edmonton, AB</div>
        </Reveal>

        <div className="relative">
          {/* Avatar floating behind */}
          <motion.div
            style={{ y: yAvatarScroll }}
            className="absolute right-0 md:right-10 -top-6 md:-top-10 w-44 md:w-72 lg:w-80 z-0"
          >
            <motion.div
              ref={avatarRef}
              onMouseMove={handleAvatarMove}
              onMouseLeave={resetAvatar}
              style={{ x: smx, y: smy }}
              className="relative w-full aspect-square rounded-full overflow-hidden border border-border/50 float-y"
            >
              <img src={avatarImg} alt="Betse Essilfie" fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Title stays fixed — subtitle scrolls away faster for depth */}
          <div className="relative z-10">
            <RevealText
              as="h1"
              text="HI, I'M"
              splitBy="letter"
              className="mega-headline text-foreground"
            />
            <RevealText
              as="h1"
              text="BETSE."
              splitBy="letter"
              delay={0.2}
              className="mega-headline gradient-text-animated"
            />
          </div>
        </div>

        <motion.div style={{ y: ySubtext }} className="relative z-10 mt-10 md:mt-16 grid md:grid-cols-2 gap-8 items-end">
          <Reveal delay={0.4}>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              NAIT Accounting co-op student and operations specialist. I keep businesses organized
              and their numbers on track.
            </p>
          </Reveal>

          <Reveal delay={0.55} className="flex flex-wrap gap-4 md:justify-end">
            <MagneticButton href="#contact" className="gradient-pill">
              Contact Me
            </MagneticButton>
            <MagneticButton href="/resume.pdf" download className="outline-pill">
              View Resume
            </MagneticButton>
          </Reveal>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em]"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
