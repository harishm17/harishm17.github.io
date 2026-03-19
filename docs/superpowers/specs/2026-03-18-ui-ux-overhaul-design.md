# UI/UX Overhaul Design Spec

> harishm17.github.io — Complete redesign, March 2026

## Goal

Transform the portfolio into a visually stunning, interactive dark-mode-only experience that makes visitors say "wow, how did he do that?" — combining a cursor-reactive particle universe, aurora ambient background, premium glassmorphism cards, and editorial typography across all 10 pages.

---

## Visual Identity

### Color System
- **Background**: `#02020a` (near-black with blue tint)
- **Surface/card bg**: `rgba(255,255,255,0.04)` with `blur(24px)`
- **Primary accent**: `#7c3aed` → `#9f6aff` (violet)
- **Secondary accent**: `#22d3ee` → `#4ec9ff` (cyan)
- **Tertiary accent**: `#fb7185` (rose/pink)
- **Success**: `#4ade80`
- **Text primary**: `rgba(255,255,255,0.9)`
- **Text secondary**: `rgba(255,255,255,0.5)`
- **Text muted**: `rgba(255,255,255,0.25)`

### Typography (3-font system)
- **Display**: Bebas Neue — hero headings, page titles, giant numbers
- **Mono**: DM Mono — labels, nav, tags, metadata, code
- **Body**: Cabinet Grotesk — descriptions, body text, cards

### Cards/Glass
- `background: rgba(255,255,255,0.04)`
- `backdrop-filter: blur(24px)`
- `border: 1px solid rgba(255,255,255,0.08)`
- `border-radius: 20px`
- Hover: border brightens to `rgba(255,255,255,0.15)`, slight translateY(-4px)

---

## Global Effects

### Aurora Background (all pages)
Three absolutely-positioned blobs in App layout:
- Blob 1: violet, top-left, 600×400px, blur 80px, opacity 0.1
- Blob 2: cyan, bottom-right, 500×500px, blur 80px, opacity 0.08
- Blob 3: rose, center, 400×300px, blur 80px, opacity 0.07
- All drift via CSS animation (20–25s alternating keyframe)

### Custom Cursor (desktop only)
- Glowing dot (10px, violet, `mix-blend-mode: screen`)
- Lagging ring (40px, 1px border) that follows with easing
- Expands on hover over interactive elements
- Click creates 300px ripple pulse

### Particle Canvas (Home page only)
- ~150 particles, multi-depth, cursor repel/attract
- Connection lines between nearby particles
- Mouse glow halo beneath cursor

### Scroll Reveal
- All section entries fade+slide up on IntersectionObserver
- Staggered delays (0.1s increments) for lists/grids

---

## Navigation

### Replace: Left sidebar → Floating top nav
- Position: fixed top, full-width, glassmorphism bar
- Logo: `HM_` in DM Mono (links to /)
- Primary links: Work · Research · Skills · About · Contact
- Right: hamburger for full overlay menu
- Full-screen overlay: lists all 10 routes with large Bebas Neue labels
- Mobile: hamburger only, slide-in overlay

### Remove
- `Sidebar.jsx` and `Sidebar.css` (keep file but replace content)
- `BottomNav.jsx` and `BottomNav.css` (remove from App.jsx)
- `ThemeToggle.jsx` — site goes dark-only

---

## Page Designs

### Home `/`
- Full-screen hero with particle canvas
- Intro overlay flash (site name fades in/out in 1.5s)
- Eyebrow: DM Mono "Software & AI Engineer"
- Hero name: Bebas Neue massive gradient text (chromatic shimmer)
- Tagline: "I build things that think."
- CTA: "View My Work" pill button + "Resume" ghost link
- Floating glassmorphism status card (top-right): current role, company, "open to opportunities" with green pulse dot
- Bottom bar: animated scroll indicator + social links

### About `/about`
- Page header: Bebas Neue "ABOUT" + DM Mono eyebrow
- Split layout: left content (60%), right photo (40%)
- Photo: circular with chromatic/gradient border ring
- Bio: 2-3 paragraphs with Cabinet Grotesk
- Education cards: glassmorphism, DM Mono dates
- Quick facts chips: location, MS CS, UT Dallas

### Experience `/experience`
- Vertical timeline with glowing left connector line (gradient)
- Each job: glassmorphism card, Bebas Neue company, DM Mono dates
- Role header with accent color
- Bullet points with custom gradient dots
- Tech stack pills per role

### Projects `/projects`
- Bento-grid layout (CSS grid areas)
- Featured project: spans 2 columns, larger card
- Each card: project name (Bebas Neue), description, tech stack pills, GitHub + Demo links
- Hover: card lifts, accent border glows, overlay links appear

### Research `/research`
- Cards with paper title, abstract snippet
- PDF/poster download buttons (gradient pills)
- Research area tags

### Skills `/skills`
- Categories as glassmorphism cards in a masonry-style grid
- Skill tags inside each: rounded pill with DM Mono text
- Section headers: Bebas Neue + gradient underline

### Certifications `/certifications`
- 2–3 column card grid
- Shimmer top-border effect per card
- Issuer, date, credential link

### Leadership `/leadership`
- Minimal timeline matching experience design
- Role + organization + impact note

### Hobbies `/hobbies`
- Mosaic grid with large visual tiles
- Emoji icons, Bebas Neue activity names
- More personal tone

### Contact `/contact`
- Centered full-height layout
- Large Bebas Neue heading
- Minimal form: name, email, message
- Animated input focus states (glowing border)
- Social link pills below form

---

## Content Changes

- Hero tagline: Add "I build things that think." below name
- Hero: Add "Currently building at Purgo AI" status chip
- Remove theme toggle (dark only)
- Remove BottomNav
- All pages: consistent "page-header" component with Bebas Neue title + DM Mono subtitle

---

## Tech Approach

- React 19 + React Router v7 (unchanged)
- Google Fonts: Add Bebas Neue, Cabinet Grotesk, DM Mono to `index.html`
- CSS: Full rewrite of `index.css`, `App.css`, `Pages.css`, all component CSS
- New components: `Navbar.jsx/css`, `AuroraBackground.jsx`, `CursorEffect.jsx`
- Remove: `ThemeContext.jsx` usage, `ThemeToggle.jsx`, `BottomNav`
- Main.jsx: Remove ThemeProvider wrapper
- App.jsx: Replace Sidebar + BottomNav with Navbar + CursorEffect + AuroraBackground
