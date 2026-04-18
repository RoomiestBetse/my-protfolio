const Footer = () => (
  <footer className="border-t border-border/40 py-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-lg font-bold uppercase tracking-tight">
        Betse<span className="gradient-text">.</span>
      </p>
      <div className="flex gap-6 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <a href="mailto:betse.essilfie@example.com" className="hover:text-foreground transition-colors">Email</a>
        <a href="#about" className="hover:text-foreground transition-colors">About</a>
        <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
      </div>
      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        © {new Date().getFullYear()} Betse Essilfie
      </p>
    </div>
  </footer>
);

export default Footer;
