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
              I'm an Accounting co-op student at <span className="gradient-text font-semibold">NAIT</span> (expected graduation 2027),
              learning financial reporting, business systems, and how operations actually run.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              With 5+ years in auto parts logistics and operations, I know how to stay organized, catch
              mistakes early, and keep things running smoothly under pressure.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              I'm open to any opportunity — accounting, admin, operations, or anything where I can contribute
              and grow. I'm ready to get to work.
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
