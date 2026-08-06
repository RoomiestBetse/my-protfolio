import { RevealText } from "@/components/animations/RevealText";
import { Reveal } from "@/components/animations/Reveal";
import { MagneticButton } from "@/components/animations/MagneticButton";

const AboutSection = () => {
  return (
    <section id="about" className="relative section-pad overflow-hidden">
      {/* Static orbs — no parallax scroll listener */}
      <div className="absolute -top-20 -left-32 w-[420px] h-[420px] gradient-orb opacity-30 pointer-events-none" />
      <div className="absolute -bottom-20 -right-32 w-[420px] h-[420px] gradient-orb opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">
            ( About Me )
          </p>
        </Reveal>

        <RevealText as="h2" text="ABOUT ME" splitBy="letter" className="mega-headline gradient-text mb-12" />

        <div className="space-y-6 text-lg md:text-2xl text-foreground/85 leading-relaxed font-light max-w-3xl mx-auto">
          <Reveal delay={0.1}>
            <p>
              I'm a Business Administration Accounting student at <span className="gradient-text font-semibold">NAIT</span> with practical
              experience in bookkeeping, accounting support, invoice review, and financial record-keeping.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              During my time at MyVic Property Management, I reviewed invoices and statements, maintained tenant
              and vendor records, and supported accurate day-to-day accounting in a fast-paced office.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              My earlier dispatch and automotive operations experience strengthened my organization, communication,
              and problem-solving skills — strengths I now bring to every accounting task.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
