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
              I'm an Accounting co-op student at <span className="gradient-text font-semibold">NAIT</span>,
              learning the ins and outs of financial reporting, business systems, and how operations actually run.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              I've worked in auto parts logistics and operations, so I know how to stay organized, catch
              mistakes early, and keep things running smoothly.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p>
              Right now I'm looking for opportunities in accounting, data entry, or business ops where I can
              jump in and make an impact.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.45} className="mt-12 flex justify-center">
          <MagneticButton href="/resume.pdf" download className="gradient-pill">
            Download Resume
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
};

export default AboutSection;
