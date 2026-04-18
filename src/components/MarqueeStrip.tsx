import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

const tags = [
  "Sage 50",
  "Microsoft Excel",
  "NAIT Accounting",
  "Operations",
  "Logistics",
  "Inventory Systems",
  "Financial Reporting",
  "Data Entry",
  "Problem Solving",
  "Customer Service",
];

// Duplicate for seamless infinite loop
const items = [...tags, ...tags];

const MarqueeStrip = () => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce || !containerRef.current) return;
    const halfWidth = containerRef.current.scrollWidth / 2;
    let current = x.get() - delta * 0.045; // speed — lower = slower
    if (Math.abs(current) >= halfWidth) current = 0;
    x.set(current);
  });

  return (
    <section
      aria-label="Skills & Tools"
      className="relative py-10 md:py-14 border-y border-border/40 bg-background/40 backdrop-blur-md overflow-hidden"
    >
      <motion.div ref={containerRef} style={{ x }} className="flex w-max items-center gap-12">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="text-2xl md:text-4xl font-display font-semibold uppercase tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-300 whitespace-nowrap cursor-default">
              {t}
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shrink-0" />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default MarqueeStrip;
