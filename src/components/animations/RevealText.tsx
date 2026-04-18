import { motion, useReducedMotion } from "framer-motion";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "letter";
}

export const RevealText = ({
  text,
  as = "h2",
  className = "",
  delay = 0,
  stagger = 0.04,
  splitBy = "word",
}: RevealTextProps) => {
  const reduce = useReducedMotion();
  const Tag = as as any;

  if (reduce) return <Tag className={className}>{text}</Tag>;

  const parts = splitBy === "letter" ? text.split("") : text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        className="inline"
      >
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden align-baseline">
            <motion.span
              variants={{
                hidden: { y: "110%", opacity: 0 },
                visible: { y: "0%", opacity: 1 },
              }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {part === " " ? "\u00A0" : part}
              {splitBy === "word" && i < parts.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
