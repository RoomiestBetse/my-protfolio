

# Full Site Redesign — Bold, Animated, Indigo

A close-match redesign inspired by the reference: oversized display typography, gradient pill CTAs, stacked-card project reveals, and a free-flowing scroll plastered with smooth, scroll-linked animations. Color story: deep navy base with an indigo → violet → fuchsia gradient as the signature accent.

## Color & Typography

- **Background**: deep near-black navy (`230 50% 5%`) with subtle gradient mesh and the existing `bg.jpeg` parallax dimmed further.
- **Accent gradient**: `from-indigo-500 via-violet-500 to-fuchsia-500` — used on CTA pills, headline highlights, numbered indices, glow blurs.
- **Primary**: indigo `240 90% 65%`. Secondary surfaces: glass over near-black.
- **Display font**: switch headings to a heavier face (Space Grotesk 700 stays, but bumped to `clamp(3rem, 9vw, 8rem)` for hero/section titles, tight letter-spacing, uppercase).
- **Body**: DM Sans stays.

## Scroll & Animation System

- Remove `scroll-snap` from `html`; switch sections to natural heights with generous spacing.
- Add **Lenis** (smooth-scroll library) for buttery momentum scrolling site-wide.
- Build a small `useScrollReveal` hook + reusable primitives:
  - `<RevealText>` — splits text into words/letters and staggers them in on view.
  - `<Parallax y={...}>` — wraps Framer Motion `useScroll` + `useTransform` for depth layers.
  - `<Counter>` — animated number count-up when in view.
- Hover micro-interactions: magnetic CTA pills, card lift + gradient border glow, image zoom-on-hover.

## Section-by-Section Redesign

**1. Navbar** — minimal top bar: ABOUT · PROJECTS · CARS · CONTACT (uppercase, wide-tracked). Gradient pill "CONTACT ME" on the right. Hides on scroll-down, reveals on scroll-up.

**2. Hero** — full-viewport. Massive `HI, I'M BETSE` (clamp huge, uppercase, gradient-fill on "BETSE"). Avatar floats centered behind the text with parallax + gentle float loop. Left: short tagline + role. Right: gradient "CONTACT ME" pill. Letter-by-letter reveal on the headline. Scroll indicator at bottom.

**3. Marquee strip** — auto-scrolling row of "trust" tags (Sage 50 · Excel · NAIT · Operations · Logistics · Inventory · Accounting…) that drifts horizontally. Adds the "logo bar" feel from screenshot 2 without fake client logos.

**4. About** — huge `ABOUT ME` headline centered. Centered paragraph block (5-line bio) with word-by-word reveal. Floating gradient orbs in the corners (replacing the 3D emoji decorations) with parallax. Gradient pill CTA "DOWNLOAD RESUME".

**5. Services / What I Do** (replaces Skills' visual style) — `SERVICES` mega-headline. Numbered list `01`, `02`, `03`, `04` with hairline dividers, large outlined numerals, title + one-line description. Each row slides in from the left and the number scales in. Categories: Accounting & Bookkeeping, Operations & Logistics, Data & Reporting, Problem Solving.

**6. Projects** — `PROJECTS` mega-headline. **Stacked-card** reveal: each project card is sticky-pinned and the next card slides up to overlap it (matches screenshot 6 exactly). Each card: `01 CLIENT / Lordco`, big imagery grid, "LIVE PROJECT" outlined pill (links to detail/modal). Cards: Lordco Operations, NAPA Logistics, RepairPal App (with the existing video).

**7. Cars** — keep as a personal-projects subsection styled to match: bold numbered cards, hover-zoom imagery, modal kept.

**8. Stats counters** — quick row before contact: years of hands-on experience, parts moved, GPA, etc. Animated count-up on view.

**9. Contact** — split layout. Left: enormous `LET'S GET IN TOUCH` (multi-line, gradient highlight) + email link. Right: minimalist form (underline-only inputs, no boxes), gradient "SEND" pill. Background gradient orb parallax.

**10. Footer** — slimmer, with social links and the gradient signature dot.

## Technical Plan

- Add deps: `@studio-freight/lenis` (smooth scroll), `clsx` already present.
- New files:
  - `src/components/animations/Reveal.tsx`, `RevealText.tsx`, `Parallax.tsx`, `Counter.tsx`, `Marquee.tsx`, `MagneticButton.tsx`
  - `src/hooks/useLenis.ts`
  - `src/components/StackedProjects.tsx` (sticky-pin stacked-card pattern using Framer Motion `useScroll`)
- Rewrite: `Index.tsx`, `Navbar.tsx`, `HeroSection.tsx`, `AboutSection.tsx`, `SkillsSection.tsx` (becomes Services), `ProjectsSection.tsx` + `AppShowcaseSection.tsx` (merged into stacked Projects), `CarProjectsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`.
- Update `src/index.css`: remove `scroll-snap`, drop `.snap-section` reliance, add gradient-text utility, mega-headline utility, marquee keyframes, color tokens.
- Update `tailwind.config.ts`: add font sizes for display clamps, indigo/violet/fuchsia in theme accents.
- Update memory (`mem://style/visual-identity`, `mem://ux/navigation-layout`) with new direction.

## Performance & QA

- Respect `prefers-reduced-motion` on every reveal/parallax primitive.
- `will-change` only on actively animating elements; throttle scroll listeners via Framer Motion's `useScroll`.
- Test on mobile viewport (756px and 375px) — mega-headlines use `clamp()` so they shrink gracefully; stacked cards collapse to a normal stack on `<lg` to avoid sticky issues.

## Out of Scope (will NOT change)

- Resume PDF, profile copy facts, image assets (avatar, car photos, app demo video) — all reused.
- No new pages or routes.

