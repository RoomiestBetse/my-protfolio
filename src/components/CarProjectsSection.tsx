import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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

const TiltCard = ({
  i,
  c,
  onClick,
}: {
  i: number;
  c: (typeof carCards)[number];
  onClick: () => void;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
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
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={
        reduce
          ? undefined
          : { rotateX: springX, rotateY: springY, transformPerspective: 1000 }
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group text-left glass-card overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={c.img}
          alt={c.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        {/* "View Details" overlay */}
        <div className="absolute inset-0 flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider text-xs bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-border/50">
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

  return (
    <section id="cars" className="relative section-pad">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
            ( On The Side )
          </p>
        </Reveal>
        <ScrambleText as="h2" text="CARS." className="mega-headline mb-16" />

        <div className="grid md:grid-cols-2 gap-6">
          {carCards.map((c, i) => (
            <TiltCard key={c.title} i={i} c={c} onClick={() => setActive(i)} />
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="glass-card border-border/50 bg-background/90 backdrop-blur-xl max-w-lg">
          {active !== null && (
            <>
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] -mx-2 -mt-2 mb-2">
                <img
                  src={carCards[active].img}
                  alt={carCards[active].modalTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl uppercase">
                  {carCards[active].modalTitle}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="pt-2 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {carCards[active].modalDesc}
                    </p>
                    <ul className="space-y-1.5">
                      {carCards[active].bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-primary mt-0.5">*</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground/70 italic border-t border-border/40 pt-3">
                      {carCards[active].why}
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CarProjectsSection;
