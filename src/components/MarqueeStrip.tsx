// CSS-driven marquee — runs on compositor thread, zero JS per frame
const tags = [
  "Sage 50",
  "Microsoft Excel",
  "NAIT Accounting",
  "Operations",
  "Logistics",
  "Inventory Systems",
  "Financial Reporting",
  "QuickBooks",
  "Data Entry",
  "Google Workspace",
  "Problem Solving",
  "Customer Service",
];

const MarqueeStrip = () => (
  <section
    aria-label="Skills & Tools"
    className="relative border-y border-border/40 bg-background/60 py-10 md:py-14 overflow-hidden"
    style={{ transform: "rotate(-2deg) scaleX(1.05)", contain: "layout paint", willChange: "transform" }}
  >
    <div className="overflow-hidden">
      <div
        className="flex w-max items-center gap-12"
        style={{ animation: "marquee 35s linear infinite", willChange: "transform" }}
      >
        {[...tags, ...tags].map((t, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="text-2xl md:text-4xl font-display font-semibold uppercase tracking-tight text-foreground/70 hover:text-foreground transition-colors duration-200 whitespace-nowrap cursor-default">
              {t}
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shrink-0" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MarqueeStrip;
