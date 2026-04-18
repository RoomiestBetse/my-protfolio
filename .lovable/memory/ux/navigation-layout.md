---
name: Navigation & Layout
description: Floating pill navbar, free-flowing scroll, scroll progress bar, no sidebar
type: design
---
- Navbar: floating rounded-full pill at top, hides on scroll-down, reveals on scroll-up. Links: ABOUT, PROJECTS, CARS, CONTACT + gradient "Contact Me" pill.
- Scroll progress bar: 2px gradient bar fixed at top, driven by `useScroll` + spring.
- No SideNav (removed). No scroll-snap.
- Section order: Hero → MarqueeStrip → About → Services (Skills) → StackedProjects → Cars → Stats → Contact → Footer.
- Section padding via `.section-pad` (px-6/12/20, py-24/32).
- Stacked Projects: each card uses `lg:sticky` with stepped `top` offset and scroll-driven scale/opacity.
- Animation primitives in `src/components/animations/`: Reveal, RevealText (letter/word stagger), Parallax, Counter, Marquee, MagneticButton. All respect `prefers-reduced-motion`.
- Smooth scroll: Lenis via `useLenis()` hook in Index.
