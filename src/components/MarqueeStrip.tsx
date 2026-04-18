import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const MarqueeStrip = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Translate the entire strip horizontally as user scrolls through the section
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-55%"]);

  return (
    <section
      ref={ref}
      aria-label="Skills & Tools"
      className="relative py-10 md:py-14 border-y border-border/40 bg-background/40 backdrop-blur-md overflow-hidden"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground px-6 md:px-12 lg:px-20 mb-6">
        ( Skills &amp; Tools )
      </p>
      <div className="overflow-hidden">
        <motion.div style={{ x }} className="flex items-center gap-10 md:gap-16 pl-6 md:pl-12 lg:pl-20">
          {tags.map((t, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-14 shrink-0">
              <span className="text-3xl md:text-5xl lg:text-6xl font-display font-semibold uppercase tracking-tight text-foreground/60 hover:text-foreground transition-colors duration-300 whitespace-nowrap cursor-default">
                {t}
              </span>
              {i < tags.length - 1 && (
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-primary to-accent shrink-0 opacity-70" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MarqueeStrip;
