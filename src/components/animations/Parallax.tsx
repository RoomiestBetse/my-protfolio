import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const Parallax = ({ children, offset = 80, className }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y, willChange: "transform" }}>{children}</motion.div>
    </div>
  );
};
