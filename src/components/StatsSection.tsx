import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Counter } from "@/components/animations/Counter";
import { Reveal } from "@/components/animations/Reveal";

const stats = [
  { value: 3, suffix: "+", label: "Years hands-on experience" },
  { value: 10, suffix: "k+", label: "Parts & orders handled" },
  { value: 2, suffix: "", label: "Major employers" },
  { value: 100, suffix: "%", label: "Effort, every shift" },
];

const PARTICLE_COUNT = 10;
const angles = Array.from({ length: PARTICLE_COUNT }, (_, i) => (i / PARTICLE_COUNT) * 360);

const ParticleBurst = ({ active }: { active: boolean }) => (
  <AnimatePresence>
    {active &&
      angles.map((angle, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent pointer-events-none"
          initial={{ x: "-50%", y: "-50%", opacity: 1, scale: 1 }}
          animate={{
            x: `calc(-50% + ${Math.cos((angle * Math.PI) / 180) * 48}px)`,
            y: `calc(-50% + ${Math.sin((angle * Math.PI) / 180) * 48}px)`,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      ))}
  </AnimatePresence>
);

const StatItem = ({ s, delay }: { s: (typeof stats)[number]; delay: number }) => {
  const [burst, setBurst] = useState(false);

  return (
    <Reveal delay={delay} className="text-center md:text-left">
      <div className="relative inline-block font-display font-bold text-5xl md:text-7xl gradient-text mb-3 leading-none">
        <ParticleBurst active={burst} />
        <Counter
          to={s.value}
          suffix={s.suffix}
          duration={1800}
          onComplete={() => setBurst(true)}
        />
      </div>
      <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-muted-foreground">
        {s.label}
      </p>
    </Reveal>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-20 border-y border-border/40 bg-background/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {stats.map((s, i) => (
          <StatItem key={s.label} s={s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
