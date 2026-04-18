import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ReactNode, useRef, MouseEvent, RefObject } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  download?: boolean;
  target?: string;
  rel?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className,
  href,
  onClick,
  download,
  target,
  rel,
  strength = 0.35,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const motionProps = {
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className,
  };

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};
