// CSS-driven marquee — compositor thread, no JS per frame
const tags = [
  "BMW M3", "Subaru STI", "Auto Parts", "Garage Work",
  "Performance", "Diagnostics", "Car Culture", "RepairPal",
  "Mechanical", "Motorsport",
];

const BG = "hsl(230 50% 5%)";
const STRIP = "hsl(235 40% 8%)";

const WavyMarqueeStrip = () => (
  <div
    aria-label="Interests marquee"
    style={{ transform: "rotate(-2deg) scaleX(1.06)" }}
  >
    {/* Top wave */}
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
      style={{ width: "100%", height: 48, display: "block", marginBottom: -1 }}>
      <path d="M0,8 C360,8 480,42 720,42 C960,42 1080,8 1440,8 L1440,48 L0,48 Z" fill={BG} />
    </svg>

    {/* Strip */}
    <div className="overflow-hidden py-8 md:py-10" style={{ background: STRIP }}>
      <div
        className="flex w-max items-center gap-12"
        style={{ animation: "marquee 30s linear infinite", willChange: "transform" }}
      >
        {[...tags, ...tags].map((t, i) => (
          <div key={i} className="flex items-center gap-12 shrink-0">
            <span className="text-2xl md:text-4xl font-display font-semibold uppercase tracking-tight text-foreground/60 hover:text-foreground transition-colors duration-200 whitespace-nowrap cursor-default">
              {t}
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent shrink-0" />
          </div>
        ))}
      </div>
    </div>

    {/* Bottom wave */}
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none"
      style={{ width: "100%", height: 48, display: "block", marginTop: -1 }}>
      <path d="M0,40 C360,40 480,6 720,6 C960,6 1080,40 1440,40 L1440,0 L0,0 Z" fill={BG} />
    </svg>
  </div>
);

export default WavyMarqueeStrip;
