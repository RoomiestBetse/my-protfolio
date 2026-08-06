import { ReactNode, useRef, MouseEvent } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Truck, Calculator, Car } from "lucide-react";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { Reveal } from "@/components/animations/Reveal";
import lordcoImg from "@/assets/lordco.jpg";
import carImg from "@/assets/car-exterior.jpg";

interface Project {
  n: string;
  client: string;
  date?: string;
  title: string;
  tagline: string;
  bullets: string[];
  tools: string[];
  icon: typeof Truck;
  media: ReactNode;
  link?: string;
  linkLabel?: string;
}

const projects: Project[] = [
  {
    n: "01",
    client: "MYVIC PROPERTY MANAGEMENT",
    date: "May 2026 – 2026",
    title: "Junior Accountant",
    tagline: "Accurate records, careful review, and dependable accounting support.",
    bullets: [
      "Support accounts payable and accounts receivable tasks",
      "Review invoices, statements, and supporting documents",
      "Maintain accounting files and tenant/vendor information",
      "Assist with bookkeeping and administrative tasks",
    ],
    tools: ["Accounts Payable", "Accounts Receivable", "Bookkeeping", "Invoice Review"],
    icon: Calculator,
    media: (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 bg-gradient-to-br from-violet-500/30 via-indigo-500/15 to-background flex items-center justify-center">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-primary/30 bg-background/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_80px_hsl(var(--primary)/0.25)]">
          <Calculator size={72} strokeWidth={1.2} className="text-primary" aria-hidden />
        </div>
      </div>
    ),
  },
  {
    n: "02",
    client: "LORDCO AUTO PARTS",
    date: "Sept 2023 – Apr 2026",
    title: "Driver & Dispatcher",
    tagline: "Coordinated time-sensitive operations with accuracy and clear communication.",
    bullets: [
      "Organized routes and managed time-sensitive requests",
      "Analyzed workflows to support efficient, on-time service",
      "Maintained accurate records and managed inventory",
      "Resolved operational issues to minimize disruptions",
    ],
    tools: ["Coordination", "Record Keeping", "Inventory", "Customer Service"],
    icon: Truck,
    media: (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 group">
        <img src={lordcoImg} alt="Lordco Auto Parts storefront" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider text-xs bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-border/50">
            Operations Experience <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "03",
    client: "WATERLOO FORD",
    date: "Oct 2020 – Dec 2021",
    title: "Service Porter",
    tagline: "Safe, timely vehicle transport backed by reliable route planning.",
    bullets: [
      "Transported vehicles between locations and to customers",
      "Used efficient routes to support timely deliveries",
      "Maintained vehicle safety and condition during transport",
    ],
    tools: ["Route Planning", "Time Management", "Vehicle Care", "Customer Service"],
    icon: Car,
    media: (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 group">
        <img src={carImg} alt="Vehicle representing service porter experience" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
      </div>
    ),
  },
];

const ProjectCard = ({ p, index, total }: { p: Project; index: number; total: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.4]);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: MouseEvent) => {
    if (reduce || !articleRef.current) return;
    const rect = articleRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -6);
    rotateY.set((x - 0.5) * 6);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const top = `calc(8vh + ${index * 28}px)`;

  return (
    <div ref={ref} className="lg:sticky lg:h-screen flex items-center" style={{ top, willChange: "transform" }}>
      <motion.article
        ref={articleRef}
        style={
          reduce
            ? { backgroundColor: "hsl(var(--card))", backdropFilter: "none" }
            : { scale, opacity, rotateX: springX, rotateY: springY, transformPerspective: 1200, backgroundColor: "hsl(var(--card))", backdropFilter: "none" }
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full border border-border/40 rounded-3xl p-6 md:p-10 lg:p-12 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
      >
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-display font-bold text-5xl md:text-6xl text-transparent" style={{ WebkitTextStroke: "1.5px hsl(var(--primary))" }}>
              {p.n}
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {p.client}
              </div>
              {p.date && (
                <div className="text-[10px] font-medium tracking-wide text-primary/70 mt-0.5">
                  {p.date}
                </div>
              )}
            </div>
          </div>

          <h3 className="display-headline mb-4 uppercase">
            {p.title}
          </h3>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{p.tagline}</p>

          <ul className="space-y-2 mb-6">
            {p.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                <ArrowUpRight size={14} className="text-primary mt-1 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mb-8">
            {p.tools.map((t) => (
              t === "Coming Soon" ? (
                <span key={t} className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary/50 text-primary bg-primary/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {t}
                </span>
              ) : (
                <span key={t} className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground">
                  {t}
                </span>
              )
            ))}
          </div>

          <a
            href={p.link ?? "#contact"}
            target={p.link ? "_blank" : undefined}
            rel={p.link ? "noopener noreferrer" : undefined}
            className={p.link ? "gradient-pill inline-flex items-center gap-2 !px-10 !py-4 !text-sm font-bold tracking-widest shadow-[0_0_40px_-5px_hsl(265_85%_55%/0.8)]" : "outline-pill"}
          >
            {p.linkLabel ?? "Let's Connect →"}
            {p.link && <ArrowUpRight size={15} />}
          </a>
        </div>

        <div className="order-first lg:order-last">{p.media}</div>
      </motion.article>
    </div>
  );
};

const StackedProjects = () => {
  return (
    <section id="projects" className="relative section-pad">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
            ( Professional Experience )
          </p>
        </Reveal>
        <ScrambleText as="h2" text="EXPERIENCE" className="mega-headline mb-16 gradient-text" />

        <div className="space-y-12 lg:space-y-0">
          {projects.map((p, i) => (
            <ProjectCard key={p.n} p={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedProjects;
