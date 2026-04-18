import { ReactNode, useRef, MouseEvent, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Truck, Package, Smartphone } from "lucide-react";
import { RevealText } from "@/components/animations/RevealText";
import { Reveal } from "@/components/animations/Reveal";
import lordcoImg from "@/assets/lordco.jpg";
import napaImg from "@/assets/napa.jpg";

const AppDemoVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const play = () => { v.muted = true; v.play().catch(() => {}); };
    // Try immediately and on canplay
    play();
    v.addEventListener("canplay", play, { once: true });
    // Fallback: play on first user interaction anywhere on the page
    const onInteract = () => play();
    document.addEventListener("scroll", onInteract, { once: true, passive: true });
    document.addEventListener("click", onInteract, { once: true });
    document.addEventListener("pointerdown", onInteract, { once: true });
    return () => {
      v.removeEventListener("canplay", play);
      document.removeEventListener("scroll", onInteract);
      document.removeEventListener("click", onInteract);
      document.removeEventListener("pointerdown", onInteract);
    };
  }, []);
  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-fuchsia-500/30 via-indigo-500/20 to-violet-500/30 flex items-center justify-center">
      <div className="relative w-[180px] aspect-[9/16] rounded-[1.5rem] overflow-hidden border-4 border-foreground/10 shadow-2xl">
        <video
          ref={videoRef}
          src="/app-demo.mov"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

interface Project {
  n: string;
  client: string;
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
    client: " LORDCO AUTO PARTS",
    title: "Delivery & Operations",
    tagline: "High-volume routes, tight coordination, real-time decisions.",
    bullets: [
      "Managed delivery routes and urgent requests",
      "Sped up workflows to stay ahead of the day",
      "Kept documentation and inventory dialed in",
    ],
    tools: ["Workflow Management", "Inventory Systems", "Routing"],
    icon: Truck,
    media: (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 group">
        <img src={lordcoImg} alt="Lordco Auto Parts storefront" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider text-xs bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-border/50">
            View Project <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "02",
    client: "NAPA AUTO PARTS",
    title: "Inventory & Logistics",
    tagline: "Precise parts handling, time-sensitive orders, zero excuses.",
    bullets: [
      "Handled deliveries and kept inventory flowing",
      "Made sure urgent orders shipped on time",
      "Worked with the team to sort out issues fast",
    ],
    tools: ["Inventory Management", "Order Processing", "Parts Tracking"],
    icon: Package,
    media: (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/40 group">
        <img src={napaImg} alt="NAPA Auto Parts storefront" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="flex items-center gap-2 text-foreground font-semibold uppercase tracking-wider text-xs bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-border/50">
            View Project <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    ),
  },
  {
    n: "03",
    client: "PERSONAL BUILD",
    title: "RepairPal — Mobile App",
    tagline: "Helping car owners get honest prices from local shops.",
    bullets: [
      "Designed and built the full app experience",
      "Quote system with shop comparison",
      "Currently in development, prepping for launch",
    ],
    tools: ["Mobile App", "Product Design", "Marketplace"],
    icon: Smartphone,
    link: "https://car-repaipal-real.vercel.app/",
    linkLabel: "View App",
    media: <AppDemoVideo />,
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
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {p.client}
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
              <span key={t} className="text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full border border-border/60 text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          <a
            href={p.link ?? "#contact"}
            target={p.link ? "_blank" : undefined}
            rel={p.link ? "noopener noreferrer" : undefined}
            className={p.link ? "gradient-pill inline-flex items-center gap-2 !px-10 !py-4 !text-sm font-bold tracking-widest shadow-[0_0_40px_-5px_hsl(265_85%_55%/0.8)]" : "outline-pill"}
          >
            {p.linkLabel ?? "Live Project →"}
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
            ( Selected Work )
          </p>
        </Reveal>
        <RevealText as="h2" text="PROJECTS" splitBy="letter" className="mega-headline mb-16 gradient-text" />

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
