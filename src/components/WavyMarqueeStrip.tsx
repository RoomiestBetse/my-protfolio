import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";

const tags = [
  "BMW M3",
  "Subaru STI",
  "Auto Parts",
  "Garage Work",
  "Performance",
  "Diagnostics",
  "Car Culture",
  "RepairPal",
  "Mechanical",
  "Motorsport",
];

const items = [...tags, ...tags];

// Background page colour — must match --background CSS var
const BG = "hsl(230 50% 5%)";
const STRIP = "hsl(235 40% 8%)";

const WavyMarqueeStrip = () => {
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduce || !containerRef.current) return;
    const halfWidth = containerRef.current.scrollWidth / 2;
    let current = x.get() - delta * 0.042;
    if (Math.abs(current) >= halfWidth) current = 0;
    x.set(current);
  });

  return (
    <div className="relative" aria-label="Interests marquee">
      {/* Top wave — page BG colour cuts into strip */}
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: 40, display: "block", marginBottom: -1 }}
      >
        <path
          d="M0,20 C120,40 240,0 360,20 C480,40 600,0 720,20 C840,40 960,0 1080,20 C1200,40 1320,0 1440,20 L1440,40 L0,40 Z"
          fill={BG}
        />
      </svg>

      {/* Strip body */}
      <div
        className="overflow-hidden py-8 md:py-12"
        style={{ background: STRIP }}
      >
        <motion.div
          ref={containerRef}
          style={{ x }}
          className="flex w-max items-center gap-12"
        >
          {items.map((t, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-2xl md:text-4xl font-display font-semibold uppercase tracking-tight text-foreground/60 hover:text-foreground transition-colors duration-300 whitespace-nowrap cursor-default">
                {t}
              </span>
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: 40, display: "block", marginTop: -1 }}
      >
        <path
          d="M0,20 C120,0 240,40 360,20 C480,0 600,40 720,20 C840,0 960,40 1080,20 C1200,0 1320,40 1440,20 L1440,0 L0,0 Z"
          fill={BG}
        />
      </svg>
    </div>
  );
};

export default WavyMarqueeStrip;
