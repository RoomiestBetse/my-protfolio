const Footer = () => (
  <footer className="relative border-t border-border/40 py-10 px-6 md:px-12 overflow-hidden">
    <div aria-hidden className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <p className="font-display font-bold uppercase tracking-tight text-foreground whitespace-nowrap" style={{ fontSize: "18vw", opacity: 0.03 }}>
        BETSE.
      </p>
    </div>
    <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-lg font-bold uppercase tracking-tight">
        Betse<span className="gradient-text">.</span>
      </p>
      <div className="flex gap-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <a href="mailto:betseessilfie@gmail.com" className="hover:text-foreground transition-colors">Email</a>
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#projects" className="hover:text-foreground transition-colors">Experience</a>
        <a href="/resume.pdf" download className="hover:text-foreground transition-colors">Resume</a>
      </div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        © {new Date().getFullYear()} Betse Essilfie
      </p>
    </div>
  </footer>
);


export default Footer;
