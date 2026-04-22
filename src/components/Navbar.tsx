import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MagneticButton } from "@/components/animations/MagneticButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#projects" },
  { label: "Cars", href: "#cars" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 120) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <motion.nav
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ willChange: "transform" }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 mt-4">
        <div className="flex items-center justify-between h-14 px-5 md:px-7 rounded-full bg-background/60 backdrop-blur-xl border border-border/40">
          <a href="#hero" className="font-display text-lg font-bold tracking-tight uppercase">
            Betse<span className="gradient-text">.</span>
          </a>

          <div className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-accent group-hover/link:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <MagneticButton href="#contact" className="gradient-pill !py-2.5 !px-5 !text-[11px]">
              Contact Me
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-20 left-6 right-6 rounded-3xl bg-background/95 backdrop-blur-xl border border-border/40 p-6 flex flex-col gap-5"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="gradient-pill text-center !py-3"
          >
            Contact Me
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
