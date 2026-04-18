import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
  className?: string;
  onComplete?: () => void;
}

export const Counter = ({ to, from = 0, duration = 1800, suffix = "", decimals = 0, className, onComplete }: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(from + (to - from) * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
};
