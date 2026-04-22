import { motion, useReducedMotion } from "framer-motion";
import { Calculator, Truck, BarChart2, Briefcase } from "lucide-react";
import { ScrambleText } from "@/components/animations/ScrambleText";
import { Reveal } from "@/components/animations/Reveal";

const services = [
  {
    n: "01",
    icon: Calculator,
    title: "Accounting & Bookkeeping",
    desc: "Sage 50, QuickBooks, Excel — financial reporting, reconciliations, and clean record-keeping.",
  },
  {
    n: "02",
    icon: Truck,
    title: "Operations & Logistics",
    desc: "Inventory management, routing, order processing, and keeping high-volume workflows on track.",
  },
  {
    n: "03",
    icon: BarChart2,
    title: "Data & Reporting",
    desc: "Excel (pivot tables, VLOOKUP, formulas), data entry, and turning raw numbers into clear summaries.",
  },
  {
    n: "04",
    icon: Briefcase,
    title: "Admin & Office",
    desc: "Microsoft Office Suite, Google Workspace, documentation, scheduling, and general business support.",
  },
];

const SkillsSection = () => {
  const reduce = useReducedMotion();
  return (
    <section id="skills" className="relative section-pad">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
            ( What I Bring )
          </p>
        </Reveal>
        <ScrambleText as="h2" text="SKILLS" className="mega-headline mb-16 gradient-text" />

        <div>
          <div className="hairline" />
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={reduce ? false : { opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glow-row group grid grid-cols-[auto_1fr] md:grid-cols-[auto_auto_1fr_2fr] items-center gap-6 md:gap-12 py-8 md:py-12 border-b border-border/40 hover:bg-foreground/[0.02] transition-colors px-2 md:px-4"
            >
              <motion.span
                className="font-display font-bold text-3xl md:text-5xl text-transparent"
                style={{ WebkitTextStroke: "1px hsl(var(--muted-foreground) / 0.5)" }}
                whileHover={reduce ? undefined : { scale: 1.15, color: "hsl(var(--primary))" }}
              >
                {s.n}
              </motion.span>
              <s.icon size={22} className="hidden md:block text-primary/60 group-hover:text-primary transition-colors" />
              <h3 className="font-display font-bold text-2xl md:text-4xl uppercase tracking-tight group-hover:gradient-text transition-all">
                {s.title}
              </h3>
              <p className="hidden md:block text-muted-foreground text-base leading-relaxed">{s.desc}</p>
              <p className="md:hidden col-span-2 text-muted-foreground text-sm leading-relaxed -mt-2">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
