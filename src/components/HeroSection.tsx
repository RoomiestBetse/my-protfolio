import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef, useEffect, useState, MouseEvent } from "react";
import avatarImg from "@/assets/avatar.jpg";
import { MagneticButton } from "@/components/animations/MagneticButton";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#&*";

// Scramble on mount (no IntersectionObserver needed — hero is always visible)
const HeroScramble = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? text : "");

  useEffect(() => {
    if (reduce) return;
    const timeout = setTimeout(() => {
      let iteration = 0;
      const totalFrames = text.length * 2.8;
      const interval = setInterval(() => {
        setDisplay(
          text.split("").map((char, i) => {
            if (char === " " || char === "." || char === "'" || char === ",") return char;
            if (i < Math.floor(iteration / 2.8)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        iteration++;
        if (iteration > totalFrames) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 32);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, delay, reduce]);

  return <h1 className={className} aria-label={text}>{display}</h1>;
};

// Letter-by-letter animation using animate (not whileInView) so it fires on load
const AnimatedHeading = ({
  text,
  className,
  delay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) => {
  const reduce = useReducedMotion();
  const letters = text.split("");

  if (reduce) return <h1 className={className}>{text}</h1>;

  return (
    <h1 className={className} aria-label={text}>
      <motion.span
        aria-hidden
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        className="inline-flex flex-wrap"
      >
        {letters.map((l, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: "110%", opacity: 0, rotateZ: -6 },
              visible: { y: "0%", opacity: 1, rotateZ: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block overflow-visible"
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </motion.span>
    </h1>
  );
};

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
  const smx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });
  const handleAvatarMove = (e: MouseEvent) => {
    if (reduce || !avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.18);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.18);
  };
  const resetAvatar = () => { mx.set(0); my.set(0); };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16 px-6 md:px-12 lg:px-20">
      {/* Gradient orbs */}
      <div className="absolute -top-32 -left-40 w-[480px] h-[480px] gradient-orb opacity-40" />
      <div className="absolute -bottom-40 -right-32 w-[520px] h-[520px] gradient-orb opacity-30" />

      {/* Glow behind the name */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
        className="absolute left-0 top-1/3 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, hsl(265 85% 60% / 0.18) 0%, transparent 70%)", filter: "blur(20px)" }}
      />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto w-full">
        {/* Top tag row — slides in from left */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between mb-10 md:mb-16 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" style={{ animation: "radar-ring 1.6s ease-out infinite" }} />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            Available for opportunities
          </div>
          <div className="hidden sm:block">Edmonton, AB</div>
        </motion.div>

        <div className="relative">
          {/* Avatar — slides in from right */}
          <motion.div
            style={{ y: yAvatarScroll }}
            className="absolute right-0 md:right-10 -top-6 md:-top-10 w-44 md:w-72 lg:w-80 z-0"
          >
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                ref={avatarRef}
                onMouseMove={handleAvatarMove}
                onMouseLeave={resetAvatar}
                style={{ x: smx, y: smy, willChange: "transform" }}
                className="relative w-full aspect-square rounded-full overflow-hidden border border-border/50 float-y"
              >
                <img src={avatarImg} alt="Betse Essilfie" fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Headings */}
          <div className="relative z-10 overflow-hidden">
            <AnimatedHeading
              text="HI, I'M"
              delay={0.1}
              stagger={0.05}
              className="mega-headline text-foreground"
            />
            {/* "BETSE." — cryptic scramble on load */}
            <HeroScramble
              text="BETSE."
              delay={0.35}
              className="mega-headline gradient-text-animated"
            />
            {/* Flash underline that draws across after the name lands */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0.8 }}
              animate={{ scaleX: 1, opacity: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-[3px] w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 rounded-full mb-2"
            />
          </div>
        </div>

        <motion.div style={{ y: ySubtext }} className="relative z-10 mt-10 md:mt-16 grid md:grid-cols-2 gap-8 items-end">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            NAIT Accounting student and operations specialist — open to full-time, part-time, and co-op roles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 md:justify-end"
          >
            <MagneticButton href="#contact" className="gradient-pill">
              Contact Me
            </MagneticButton>
            <MagneticButton href="/resume.pdf" download className="outline-pill">
              View Resume
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em]"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
