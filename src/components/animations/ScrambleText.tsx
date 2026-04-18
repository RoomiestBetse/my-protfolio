import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#&*";

interface ScrambleTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export const ScrambleText = ({ text, as = "h2", className = "" }: ScrambleTextProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(text);
  const Tag = as as any;

  useEffect(() => {
    if (!inView || reduce) return;
    let iteration = 0;
    const totalFrames = text.length * 2.8;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || char === "." || char === "'" || char === ",") return char;
            if (i < Math.floor(iteration / 2.8)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration > totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 32);
    return () => clearInterval(interval);
  }, [inView, text, reduce]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display}
    </Tag>
  );
};
