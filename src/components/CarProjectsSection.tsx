import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import carProject from "@/assets/car-project.jpg";
import carExterior from "@/assets/car-exterior.jpg";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { Reveal } from "@/components/animations/Reveal";

const carCards = [
  {
    n: "01",
    img: carExterior,
    title: "BMW M3",
    desc: "I handle all the maintenance and aero work on this one. It's a lesson in precision and keeping a high-performance machine running right.",
    modalTitle: "2011 BMW M3",
    modalDesc: "I handle all the maintenance and aero work on this one. It's a lesson in precision and keeping a high-performance machine running right. I spend a lot of time in the garage, but the results are worth it.",
    bullets: [
      "Aero kit installation and fitment",
      "Interior trim restoration",
      "Routine high-mileage engine maintenance",
      "Sourcing specific OEM+ parts",
    ],
    why: "I like taking things apart to see how they work and making them better than I found them.",
  },
  {
    n: "02",
    img: carProject,
    title: "Subaru STI",
    desc: "This is my daily and my main troubleshooting project. I've focused on rebuilding it for reliability and engine output.",
    modalTitle: "2011 Subaru STI",
    modalDesc: "This is my daily and my main troubleshooting project. I've focused on rebuilding it for reliability and engine output. It's taught me a lot about diagnosing mechanical issues under pressure.",
    bullets: [
      "Engine output tuning for daily use",
      "Troubleshooting boost leaks and sensors",
      "Suspension refresh for reliability",
      "Mechanical diagnostics and repairs",
    ],
    why: "It's my way of practicing problem-solving on something that has to work every single morning.",
  },
];

// Floating cursor preview
const CursorPreview = ({
  card,
  x,
  y,
}: {
  card: (typeof carCards)[number] | null;
  x: any;
  y: any;
}) => (
  <AnimatePresence>
    {card && (
      <motion.div
        className="fixed top-0 left-0 z-[200] pointer-events-none"
        style={{ x, y }}
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.88 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-64 rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          style={{ background: "hsl(var(--card))", boxShadow: "0 20px 60px -10px hsl(265 85% 55% / 0.3)" }}
        >
          {/* Image peek */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
            <span
              className="absolute top-3 left-3 font-display font-bold text-xl text-transparent"
              style={{ WebkitTextStroke: "1px hsl(var(--primary))" }}
            >
              {card.n}
            </span>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h4 className="font-display font-bold text-base uppercase tracking-tight gradient-text">
              {card.modalTitle}
            </h4>
            <ul className="space-y-1">
              {card.bullets.slice(0, 2).map((b) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-foreground/70">
                  <span className="text-primary shrink-0">*</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-[10px] text-muted-foreground/60 italic pt-1 border-t border-border/30">
              Click to see more
            </p>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TiltCard = ({
  i,
  c,
  onClick,
  onHover,
  onLeave,
}: {
  i: number;
  c: (typeof carCards)[number];
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -10);
    rotateY.set((x - 0.5) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    onLeave();
  };

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={reduce ? undefined : { rotateX: springX, rotateY: springY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group text-left glass-card overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={c.img}
          alt={c.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider text-xs bg-background/80 px-4 py-2 rounded-full border border-border/50">
            View Details <ArrowUpRight size={13} />
          </span>
        </div>
        <span
          className="absolute top-4 left-4 font-display font-bold text-2xl text-transparent"
          style={{ WebkitTextStroke: "1px hsl(var(--foreground) / 0.6)" }}
        >
          {c.n}
        </span>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="display-headline uppercase mb-2">{c.title}</h3>
        <p className="text-muted-foreground">{c.desc}</p>
      </div>
    </motion.button>
  );
};

const CarProjectsSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(-9999);
  const rawY = useMotionValue(-9999);
  const cursorX = useSpring(rawX, { stiffness: 120, damping: 24 });
  const cursorY = useSpring(rawY, { stiffness: 120, damping: 24 });

  const handleSectionMouseMove = (e: MouseEvent<HTMLElement>) => {
    rawX.set(e.clientX + 24);
    rawY.set(e.clientY + 24);
  };

  return (
    <section
      id="cars"
      className="relative section-pad"
      onMouseMove={handleSectionMouseMove}
    >
      {/* Cursor-following preview — only on non-reduced-motion */}
      {!reduce && (
        <CursorPreview
          card={hovered !== null ? carCards[hovered] : null}
          x={cursorX}
          y={cursorY}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
            ( On The Side )
          </p>
        </Reveal>
        <ScrambleText as="h2" text="CARS." className="mega-headline mb-16" />

        <div className="grid md:grid-cols-2 gap-6">
          {carCards.map((c, i) => (
            <TiltCard
              key={c.title}
              i={i}
              c={c}
              onClick={() => setActive(i)}
              onHover={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent
          className="max-w-lg border-0 p-0 bg-transparent shadow-none"
        >
          {active !== null && (
            <ModalCard key={active} card={carCards[active]} />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

const ModalCard = ({ card }: { card: (typeof carCards)[number] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -10);
    rotateY.set((x - 0.5) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
            <motion.div
              ref={ref}
              aria-label={card.modalTitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={reduce ? {
                background: "hsl(var(--card))",
                boxShadow: "0 0 0 1px hsl(var(--border) / 0.5), 0 25px 80px -10px hsl(265 85% 55% / 0.4)",
                borderRadius: "1.5rem",
                overflow: "hidden",
              } : {
                rotateX: springX,
                rotateY: springY,
                transformPerspective: 1000,
                background: "hsl(var(--card))",
                boxShadow: "0 0 0 1px hsl(var(--border) / 0.5), 0 25px 80px -10px hsl(265 85% 55% / 0.4)",
                borderRadius: "1.5rem",
                overflow: "hidden",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <VisuallyHidden><DialogTitle>{card.modalTitle}</DialogTitle></VisuallyHidden>
              {/* Hero image */}
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={card.img}
                  alt={card.modalTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <span
                  className="absolute top-4 left-5 font-display font-bold text-4xl text-transparent"
                  style={{ WebkitTextStroke: "1.5px hsl(var(--primary))" }}
                >
                  {card.n}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <motion.h3
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-2xl font-bold uppercase gradient-text"
                >
                  {card.modalTitle}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-muted-foreground leading-relaxed text-sm"
                >
                  {card.modalDesc}
                </motion.p>

                <ul className="space-y-2">
                  {card.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.07, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-start gap-2 text-sm text-foreground/80"
                    >
                      <span className="text-primary mt-0.5 font-bold">*</span>
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="text-xs text-muted-foreground/60 italic pt-3"
                  style={{ borderTop: "1px solid hsl(var(--primary) / 0.2)" }}
                >
                  {card.why}
                </motion.p>
              </div>
            </motion.div>
  );
};

export default CarProjectsSection;
