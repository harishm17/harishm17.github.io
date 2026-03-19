# UI/UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual redesign of harishm17.github.io into a dark-mode cosmic portfolio with particle universe hero, aurora background, custom cursor, glassmorphism cards, and Bebas Neue / DM Mono / Cabinet Grotesk typography across all 10 pages.

**Architecture:** Replace sidebar layout with floating top navbar. Add global CursorEffect and AuroraBackground components in App.jsx. Rewrite all CSS from scratch using new design tokens. Keep all React/Router structure, just replace JSX and CSS.

**Tech Stack:** React 19, React Router v7, Vite, Google Fonts (Bebas Neue, DM Mono, Cabinet Grotesk), Canvas API for particles, IntersectionObserver for scroll reveals.

**Spec:** `docs/superpowers/specs/2026-03-18-ui-ux-overhaul-design.md`

---

## File Map

### New Files (Create)
- `src/components/Navbar.jsx` — floating top nav with overlay menu
- `src/components/Navbar.css` — navbar styles
- `src/components/AuroraBackground.jsx` — ambient aurora blobs (all pages)
- `src/components/AuroraBackground.css` — aurora animation styles
- `src/components/CursorEffect.jsx` — custom cursor + ripple (desktop)
- `src/components/CursorEffect.css` — cursor styles
- `src/components/PageHeader.jsx` — reusable page title component
- `src/components/PageHeader.css` — page header styles

### Modified Files
- `index.source.html` — add new Google Fonts (Bebas Neue, DM Mono, Cabinet Grotesk)
- `src/index.css` — full rewrite: new design tokens, dark-only
- `src/App.css` — full rewrite: new layout without sidebar
- `src/App.jsx` — replace Sidebar/BottomNav with Navbar/AuroraBackground/CursorEffect
- `src/main.jsx` — remove ThemeProvider wrapper
- `src/pages/Pages.css` — full rewrite: new page container styles
- `src/pages/Home.jsx` — full rewrite: particle hero
- `src/pages/About.jsx` — full rewrite: split layout with photo
- `src/pages/ExperiencePage.jsx` — full rewrite: timeline layout
- `src/pages/ProjectsPage.jsx` — full rewrite: bento grid
- `src/pages/ResearchPage.jsx` — full rewrite: research cards
- `src/pages/SkillsPage.jsx` — full rewrite: category cards
- `src/pages/CertificationsPage.jsx` — full rewrite: cert grid
- `src/pages/LeadershipPage.jsx` — full rewrite: leadership timeline
- `src/pages/HobbiesPage.jsx` — full rewrite: mosaic grid
- `src/pages/ContactPage.jsx` — full rewrite: centered form
- `src/pages/NotFound.jsx` — update to match new design
- `src/components/Footer.jsx` — update footer to match new design
- `src/components/Footer.css` — rewrite footer styles

### Files to Gut/Neutralize
- `src/components/Sidebar.jsx` — kept but replaced with placeholder (Navbar takes over)
- `src/components/Sidebar.css` — empty/minimal
- `src/components/BottomNav.jsx` — removed from App.jsx (file stays)
- `src/components/ThemeToggle.jsx` — removed from usage
- `src/context/ThemeContext.jsx` — no longer used
- `src/components/AnimatedBackground.jsx` — replaced by AuroraBackground

---

## Task 1: Font Imports + Design Tokens

**Files:**
- Modify: `index.source.html`
- Modify: `src/index.css`

- [ ] **Step 1: Update font imports in index.source.html**

Replace the existing Google Fonts link with:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Rewrite src/index.css with new design tokens**

Replace entire file with:
```css
/* ============================================================
   COSMIC DESIGN SYSTEM — harishm17.github.io
   ============================================================ */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

:root {
  /* Background layers */
  --bg-base:        #02020a;
  --bg-surface:     #0a0a18;
  --bg-elevated:    #0f0f20;

  /* Glass system */
  --glass-bg:       rgba(255, 255, 255, 0.04);
  --glass-bg-hover: rgba(255, 255, 255, 0.07);
  --glass-border:   rgba(255, 255, 255, 0.08);
  --glass-border-hover: rgba(255, 255, 255, 0.18);
  --glass-blur:     blur(24px);

  /* Accent palette */
  --violet:         #7c3aed;
  --violet-light:   #9f6aff;
  --violet-glow:    rgba(124, 58, 237, 0.35);
  --cyan:           #22d3ee;
  --cyan-light:     #4ec9ff;
  --cyan-glow:      rgba(34, 211, 238, 0.25);
  --rose:           #fb7185;
  --rose-glow:      rgba(251, 113, 133, 0.25);
  --green:          #4ade80;

  /* Text hierarchy */
  --text-primary:   rgba(255, 255, 255, 0.92);
  --text-secondary: rgba(255, 255, 255, 0.5);
  --text-muted:     rgba(255, 255, 255, 0.25);
  --text-accent:    var(--violet-light);

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--violet), var(--cyan));
  --gradient-text:    linear-gradient(135deg, #fff 20%, var(--violet-light) 55%, var(--cyan-light) 85%);
  --gradient-hero:    linear-gradient(135deg, #fff 0%, rgba(159,106,255,0.95) 40%, rgba(78,201,255,0.9) 70%, rgba(251,113,133,0.8) 100%);

  /* Typography */
  --font-display: 'Bebas Neue', sans-serif;
  --font-mono:    'DM Mono', monospace;
  --font-body:    'Cabinet Grotesk', sans-serif;

  /* Spacing */
  --page-padding: 48px;
  --section-gap:  64px;

  /* Radius */
  --radius-sm:   8px;
  --radius-md:   14px;
  --radius-lg:   20px;
  --radius-xl:   28px;
  --radius-pill: 100px;

  /* Transitions */
  --ease-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 0.15s;
  --duration-base: 0.25s;
  --duration-slow: 0.4s;

  font-family: var(--font-body);
  line-height: 1.5;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* ============================================================ */
/* BASE */
/* ============================================================ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none; /* custom cursor active */
}

@media (max-width: 768px) {
  body { cursor: auto; }
}

a { color: inherit; text-decoration: none; }

*:focus-visible {
  outline: 2px solid var(--violet-light);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* ============================================================ */
/* GLASS CARD UTILITY */
/* ============================================================ */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: border-color var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

.glass-card:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

/* ============================================================ */
/* TYPOGRAPHY UTILITIES */
/* ============================================================ */
.display {
  font-family: var(--font-display);
  letter-spacing: 1px;
  line-height: 0.92;
}

.mono {
  font-family: var(--font-mono);
  letter-spacing: 0.05em;
}

.text-gradient {
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-accent { color: var(--violet-light); }
.text-cyan   { color: var(--cyan-light); }
.text-muted  { color: var(--text-muted); }

/* ============================================================ */
/* TECH TAGS / PILLS */
/* ============================================================ */
.tech-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: var(--radius-pill);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--violet-light);
  letter-spacing: 0.03em;
  transition: all var(--duration-fast) var(--ease-out);
  white-space: nowrap;
}

.tech-tag:hover {
  background: rgba(124, 58, 237, 0.2);
  border-color: var(--violet-light);
  transform: translateY(-1px);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

/* ============================================================ */
/* SCROLL REVEAL */
/* ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================================================ */
/* BUTTONS */
/* ============================================================ */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: var(--gradient-primary);
  color: #fff;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  border: none;
  cursor: pointer;
  transition: opacity var(--duration-fast), transform var(--duration-fast) var(--ease-spring);
}

.btn-primary:hover { opacity: 0.88; transform: translateY(-2px); }
.btn-primary:active { transform: translateY(0); }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border-radius: var(--radius-pill);
  border: 1px solid var(--glass-border);
  background: transparent;
  cursor: pointer;
  transition: color var(--duration-fast), border-color var(--duration-fast), transform var(--duration-fast);
}

.btn-ghost:hover {
  color: var(--text-primary);
  border-color: var(--glass-border-hover);
  transform: translateY(-2px);
}

/* ============================================================ */
/* SECTION HEADERS */
/* ============================================================ */
.section-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--violet-light);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.section-eyebrow::before {
  content: '';
  display: block;
  width: 24px;
  height: 1px;
  background: var(--violet-light);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(36px, 5vw, 56px);
  letter-spacing: 1px;
  line-height: 0.92;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 560px;
  margin-bottom: 40px;
}
```

- [ ] **Step 3: Verify dev server starts without errors**

Run: `npm run dev` in project root
Expected: Vite server starts, no import errors (fonts will load from CDN)

---

## Task 2: App Layout — Replace Sidebar with Navbar

**Files:**
- Create: `src/components/Navbar.jsx`
- Create: `src/components/Navbar.css`
- Create: `src/components/AuroraBackground.jsx`
- Modify: `src/App.jsx`
- Modify: `src/App.css`
- Modify: `src/main.jsx`

- [ ] **Step 1: Create AuroraBackground.jsx**

```jsx
// src/components/AuroraBackground.jsx
import './AuroraBackground.css'

export default function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
    </div>
  )
}
```

- [ ] **Step 2: Update AuroraBackground.css**

Replace existing `src/components/AnimatedBackground.css` or create new file:
```css
/* src/components/AuroraBackground.css */
.aurora-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: aurora-drift 22s ease-in-out infinite alternate;
}

.aurora-blob-1 {
  width: 650px; height: 450px;
  background: radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%);
  top: -120px; left: -120px;
  animation-duration: 22s;
}

.aurora-blob-2 {
  width: 550px; height: 550px;
  background: radial-gradient(ellipse, rgba(34,211,238,0.15) 0%, transparent 70%);
  bottom: -150px; right: -100px;
  animation-duration: 28s;
  animation-delay: -10s;
}

.aurora-blob-3 {
  width: 420px; height: 320px;
  background: radial-gradient(ellipse, rgba(251,113,133,0.12) 0%, transparent 70%);
  top: 45%; left: 38%;
  animation-duration: 18s;
  animation-delay: -5s;
}

@keyframes aurora-drift {
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(60px, -50px) scale(1.08); }
  66%  { transform: translate(-40px, 70px) scale(0.95); }
  100% { transform: translate(50px, 30px) scale(1.05); }
}
```

- [ ] **Step 3: Create Navbar.jsx**

```jsx
// src/components/Navbar.jsx
import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'

const primaryNav = [
  { path: '/projects', label: 'Work' },
  { path: '/research', label: 'Research' },
  { path: '/skills',   label: 'Skills' },
  { path: '/about',    label: 'About' },
  { path: '/contact',  label: 'Contact' },
]

const allNav = [
  { path: '/',               label: 'Home' },
  { path: '/about',          label: 'About' },
  { path: '/experience',     label: 'Experience' },
  { path: '/research',       label: 'Research' },
  { path: '/projects',       label: 'Work' },
  { path: '/skills',         label: 'Skills' },
  { path: '/certifications', label: 'Certifications' },
  { path: '/leadership',     label: 'Leadership' },
  { path: '/hobbies',        label: 'Beyond Code' },
  { path: '/contact',        label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <Link to="/" className="navbar__logo" onClick={close}>HM_</Link>

        <nav className="navbar__primary" aria-label="Primary navigation">
          {primaryNav.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <div className={`nav-overlay${menuOpen ? ' nav-overlay--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="nav-overlay__inner">
          <div className="nav-overlay__eyebrow mono text-muted">Navigation</div>
          <nav className="nav-overlay__links">
            {allNav.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-overlay__item${isActive ? ' nav-overlay__item--active' : ''}`}
                style={{ animationDelay: `${i * 0.05}s` }}
                onClick={close}
              >
                <span className="nav-overlay__num mono">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-overlay__socials">
            <a href="https://github.com/harishm17" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/harishm17" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="/HarishManoharan.pdf" download>Resume</a>
          </div>
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Create Navbar.css**

```css
/* src/components/Navbar.css */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  transition: background var(--duration-base), backdrop-filter var(--duration-base), padding var(--duration-base);
}

.navbar--scrolled {
  background: rgba(2, 2, 10, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--glass-border);
  padding: 14px 48px;
}

.navbar__logo {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition: color var(--duration-fast);
  cursor: pointer;
}
.navbar__logo:hover { color: var(--violet-light); }

.navbar__primary {
  display: flex;
  gap: 32px;
}

.navbar__link {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-secondary);
  transition: color var(--duration-fast);
  position: relative;
  padding-bottom: 2px;
}

.navbar__link::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background: var(--violet-light);
  transition: width var(--duration-base) var(--ease-out);
}

.navbar__link:hover,
.navbar__link--active {
  color: var(--text-primary);
}

.navbar__link:hover::after,
.navbar__link--active::after {
  width: 100%;
}

/* Hamburger */
.navbar__hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;
}

.navbar__hamburger span {
  display: block;
  height: 1px;
  background: var(--text-secondary);
  transition: all var(--duration-base) var(--ease-out);
  transform-origin: center;
}

.navbar__hamburger:hover span { background: var(--text-primary); }

.navbar__hamburger--open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
.navbar__hamburger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.navbar__hamburger--open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

/* Overlay */
.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
  background: rgba(2, 2, 10, 0.97);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--duration-slow) var(--ease-out);
}

.nav-overlay--open {
  opacity: 1;
  pointer-events: all;
}

.nav-overlay__inner {
  text-align: center;
  padding: 48px;
}

.nav-overlay__eyebrow {
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  margin-bottom: 48px;
}

.nav-overlay__links {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 56px;
}

.nav-overlay__item {
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 52px);
  letter-spacing: 2px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 4px 0;
  transition: color var(--duration-fast);
  animation: overlay-item-in 0.4s var(--ease-out) both;
}

.nav-overlay--open .nav-overlay__item {
  animation: overlay-item-in 0.4s var(--ease-out) both;
}

@keyframes overlay-item-in {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.nav-overlay__item:hover,
.nav-overlay__item--active {
  color: var(--text-primary);
}

.nav-overlay__item--active { color: var(--violet-light); }

.nav-overlay__num {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  opacity: 0.6;
  min-width: 28px;
  text-align: right;
}

.nav-overlay__socials {
  display: flex;
  gap: 28px;
  justify-content: center;
}

.nav-overlay__socials a {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--duration-fast);
}
.nav-overlay__socials a:hover { color: var(--text-primary); }

/* Mobile */
@media (max-width: 768px) {
  .navbar { padding: 16px 24px; }
  .navbar--scrolled { padding: 12px 24px; }
  .navbar__primary { display: none; }
  .nav-overlay__item { font-size: clamp(28px, 8vw, 44px); }
}
```

- [ ] **Step 5: Update App.css (layout without sidebar)**

Replace entire `src/App.css`:
```css
/* App layout — no sidebar, full-width pages */
* { box-sizing: border-box; margin: 0; padding: 0; }

*:focus-visible {
  outline: 2px solid var(--violet-light);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

body { background: var(--bg-base); }

.app {
  position: relative;
  min-height: 100vh;
}

/* All page content sits above the aurora layer */
.app > *:not(.aurora-bg):not(.cursor-dot):not(.cursor-ring) {
  position: relative;
  z-index: 1;
}

.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Entry cards (used across pages) */
.entry {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  padding: 28px 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  margin-bottom: 20px;
  transition: border-color var(--duration-base) var(--ease-out),
              transform var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.entry::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity var(--duration-base);
}

.entry:hover {
  border-color: var(--glass-border-hover);
  transform: translateY(-3px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.entry:hover::before { opacity: 1; }

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.entry h3 {
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.institution {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--violet-light);
  text-transform: uppercase;
}

.entry-date {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  text-align: right;
  flex-shrink: 0;
  margin-left: 20px;
}

.details {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-top: 10px;
  line-height: 1.7;
}

/* List items */
ul { list-style: none; padding: 0; margin-top: 10px; }

li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 0.94rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

li::before {
  content: '';
  position: absolute;
  left: 0; top: 0.7em;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--gradient-primary);
}

@media (max-width: 768px) {
  .entry { padding: 20px; }
  .entry-header { flex-direction: column; }
  .entry-date { text-align: left; margin-left: 0; margin-top: 6px; }
}
```

- [ ] **Step 6: Update App.jsx**

Replace entire `src/App.jsx`:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import AuroraBackground from './components/AuroraBackground'
import CursorEffect from './components/CursorEffect'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import ExperiencePage from './pages/ExperiencePage'
import ResearchPage from './pages/ResearchPage'
import ProjectsPage from './pages/ProjectsPage'
import CertificationsPage from './pages/CertificationsPage'
import LeadershipPage from './pages/LeadershipPage'
import SkillsPage from './pages/SkillsPage'
import HobbiesPage from './pages/HobbiesPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="app">
        <AuroraBackground />
        <CursorEffect />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/about"          element={<About />} />
            <Route path="/experience"     element={<ExperiencePage />} />
            <Route path="/research"       element={<ResearchPage />} />
            <Route path="/projects"       element={<ProjectsPage />} />
            <Route path="/hobbies"        element={<HobbiesPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/leadership"     element={<LeadershipPage />} />
            <Route path="/skills"         element={<SkillsPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="*"              element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </Router>
  )
}

export default App
```

- [ ] **Step 7: Update main.jsx (remove ThemeProvider)**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

---

## Task 3: CursorEffect Component

**Files:**
- Create: `src/components/CursorEffect.jsx`
- Create: `src/components/CursorEffect.css`

- [ ] **Step 1: Create CursorEffect.jsx**

```jsx
// src/components/CursorEffect.jsx
import { useEffect, useRef } from 'react'
import './CursorEffect.css'

export default function CursorEffect() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const raf     = useRef(null)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return

    const dot  = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    const onDown = (e) => {
      dot.classList.add('cursor-dot--click')
      ringEl.classList.add('cursor-ring--click')
      // Ripple
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = e.clientX + 'px'
      ripple.style.top  = e.clientY + 'px'
      document.body.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }

    const onUp = () => {
      dot.classList.remove('cursor-dot--click')
      ringEl.classList.remove('cursor-ring--click')
    }

    const onEnterInteractive = () => {
      dot.classList.add('cursor-dot--hover')
      ringEl.classList.add('cursor-ring--hover')
    }
    const onLeaveInteractive = () => {
      dot.classList.remove('cursor-dot--hover')
      ringEl.classList.remove('cursor-ring--hover')
    }

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .glass-card, .tech-tag, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    addHoverListeners()
    raf.current = requestAnimationFrame(animate)

    // Re-add listeners on route changes (MutationObserver)
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
```

- [ ] **Step 2: Create CursorEffect.css**

```css
/* src/components/CursorEffect.css */
.cursor-dot,
.cursor-ring {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: var(--violet-light);
  mix-blend-mode: screen;
  box-shadow: 0 0 16px var(--violet-light), 0 0 32px rgba(124, 58, 237, 0.3);
  transition: width 0.15s, height 0.15s, background 0.15s;
}

.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(159, 106, 255, 0.4);
  transition: width 0.25s var(--ease-out), height 0.25s var(--ease-out),
              border-color 0.2s, left 0.08s ease, top 0.08s ease;
}

.cursor-dot--hover  { width: 14px; height: 14px; }
.cursor-ring--hover { width: 56px; height: 56px; border-color: rgba(159, 106, 255, 0.6); }

.cursor-dot--click  { width: 16px; height: 16px; background: var(--cyan); }
.cursor-ring--click { width: 64px; height: 64px; border-color: rgba(78, 201, 255, 0.7); }

/* Ripple on click */
.cursor-ripple {
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%) scale(0);
  width: 280px; height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
  animation: cursor-ripple-out 0.7s ease-out forwards;
}

@keyframes cursor-ripple-out {
  to { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

@media (max-width: 768px) {
  .cursor-dot, .cursor-ring { display: none; }
}
```

---

## Task 4: Home Page — Particle Universe Hero

**Files:**
- Modify: `src/pages/Home.jsx` (full rewrite)
- Modify: `src/pages/Pages.css` (update home section)

- [ ] **Step 1: Rewrite Home.jsx**

```jsx
// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Pages.css'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles, animId
    let mouse = { x: -1000, y: -1000, down: false }
    const N = 140

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() { this.reset(true) }
      reset(initial = false) {
        this.x  = Math.random() * W
        this.y  = initial ? Math.random() * H : (Math.random() < 0.5 ? -10 : H + 10)
        this.ox = this.x; this.oy = this.y
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.r  = Math.random() * 1.8 + 0.4
        this.baseAlpha = Math.random() * 0.5 + 0.15
        this.alpha = this.baseAlpha
        this.depth = Math.random()
        this.twinkle = Math.random() * 0.02 + 0.005
        this.twinkleOff = Math.random() * Math.PI * 2
        const rv = Math.random()
        this.hue = rv < 0.5 ? 265 + Math.random()*20
                 : rv < 0.8 ? 195 + Math.random()*20
                 :             325 + Math.random()*15
        this.sat = 65 + Math.random() * 25
      }
      update(t) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        const inf = mouse.down ? 220 : 130
        if (dist < inf) {
          const f = 1 - dist / inf
          const push = mouse.down ? -1.0 : 0.7
          this.vx += (dx / dist) * f * push
          this.vy += (dy / dist) * f * push
          this.alpha = Math.min(1, this.baseAlpha + f * 0.5)
        } else {
          this.vx += (this.ox - this.x) * 0.0003
          this.vy += (this.oy - this.y) * 0.0003
          this.alpha += (this.baseAlpha - this.alpha) * 0.05
        }
        const damp = 0.94 + this.depth * 0.04
        this.vx *= damp; this.vy *= damp
        const speed = (1 - this.depth * 0.5) * 0.6
        this.x += this.vx * speed; this.y += this.vy * speed
        this.alpha *= 0.85 + Math.sin(t * this.twinkle + this.twinkleOff) * 0.15
        if (this.x < -50) this.x = W + 50
        if (this.x > W+50) this.x = -50
        if (this.y < -50) this.y = H + 50
        if (this.y > H+50) this.y = -50
      }
      draw() {
        const s = this.r * (1 - this.depth * 0.45)
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, s * 5)
        g.addColorStop(0,   `hsla(${this.hue},${this.sat}%,75%,${this.alpha})`)
        g.addColorStop(0.4, `hsla(${this.hue},${this.sat}%,60%,${this.alpha * 0.3})`)
        g.addColorStop(1,   `hsla(${this.hue},${this.sat}%,50%,0)`)
        ctx.beginPath()
        ctx.fillStyle = g
        ctx.arc(this.x, this.y, s * 5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i], pj = particles[j]
          const dx = pi.x - pj.x, dy = pi.y - pj.y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 110) {
            const a = (1 - d/110) * 0.1
            ctx.beginPath()
            ctx.strokeStyle = `hsla(${(pi.hue+pj.hue)/2},60%,70%,${a})`
            ctx.lineWidth = (1 - d/110) * 0.7
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.stroke()
          }
        }
      }
    }

    const drawHalo = () => {
      if (mouse.x < 0) return
      const r = mouse.down ? 180 : 90
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r)
      g.addColorStop(0, 'rgba(124,58,237,0.07)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.fillStyle = g
      ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const init = () => { resize(); particles = Array.from({length: N}, () => new Particle()) }

    let t = 0
    const loop = () => {
      t++
      ctx.clearRect(0, 0, W, H)
      drawHalo()
      drawConnections()
      particles.forEach(p => { p.update(t); p.draw() })
      animId = requestAnimationFrame(loop)
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onDown = () => { mouse.down = true }
    const onUp   = () => { mouse.down = false }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mouseup', onUp)
    canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000 })
    window.addEventListener('resize', resize)

    init()
    loop()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="home-page">
      {/* Intro overlay */}
      <div className="home-intro-overlay" aria-hidden="true">
        <span className="home-intro-text mono">harishm17.github.io</span>
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="home-canvas" aria-hidden="true" />

      {/* UI layer */}
      <div className="home-ui">
        <div className="home-hero">
          <div className="home-eyebrow section-eyebrow">
            Software &amp; AI Engineer
          </div>

          <h1 className="home-name display">
            <span className="home-name-fill">HARISH<br />MANOHARAN</span>
            <span className="home-name-outline" aria-hidden="true">HARISH<br />MANOHARAN</span>
          </h1>

          <p className="home-tagline">
            I build things that think.
          </p>

          <p className="home-description">
            Building intelligent systems at the intersection of AI and full-stack engineering.
            LLM evaluation, agentic workflows, and scalable backends.
          </p>

          <div className="home-ctas">
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <a href="/HarishManoharan.pdf" className="btn-ghost" download>Resume ↓</a>
            <Link to="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </div>

        {/* Floating status card */}
        <div className="home-status-card glass-card">
          <div className="home-status-header mono">
            <span className="home-status-dot" />
            Available
          </div>
          <div className="home-status-row">
            <div className="home-status-label mono">Role</div>
            <div className="home-status-val">Software + AI Engineer</div>
          </div>
          <div className="home-status-divider" />
          <div className="home-status-row">
            <div className="home-status-label mono">At</div>
            <div className="home-status-val">Purgo AI</div>
          </div>
          <div className="home-status-row">
            <div className="home-status-label mono">MS</div>
            <div className="home-status-val">CS · UT Dallas</div>
          </div>
          <div className="home-status-divider" />
          <div className="home-status-open mono">Open to opportunities</div>
        </div>

        {/* Bottom bar */}
        <div className="home-bottom">
          <div className="home-scroll-hint mono">
            <span className="home-scroll-line" />
            Scroll to explore
          </div>
          <div className="home-socials mono">
            <a href="https://github.com/harishm17" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/harishm17" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:harish_manoharan@outlook.com">Email</a>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Rewrite Pages.css**

Replace entire `src/pages/Pages.css`:
```css
/* ============================================================
   PAGES — base styles for all pages
   ============================================================ */

/* Standard page container */
.page {
  padding: 100px var(--page-padding) 80px;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  animation: page-in 0.5s var(--ease-out) both;
}

@keyframes page-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (min-width: 1440px) { .page { max-width: 1300px; } }
@media (min-width: 1920px) { .page { max-width: 1520px; } }

@media (max-width: 768px) {
  .page { padding: 80px 20px 60px; }
}

/* Page header component */
.page-header {
  margin-bottom: var(--section-gap);
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 88px);
  letter-spacing: 2px;
  line-height: 0.9;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.page-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.65;
  max-width: 520px;
}

/* ============================================================
   HOME PAGE
   ============================================================ */
.home-page {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.home-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Intro overlay */
.home-intro-overlay {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
  animation: intro-fade 0.7s ease 1.6s forwards;
  pointer-events: none;
}

@keyframes intro-fade {
  to { opacity: 0; pointer-events: none; }
}

.home-intro-text {
  font-size: 0.75rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: var(--text-muted);
  animation: intro-pulse 1.6s ease forwards;
}

@keyframes intro-pulse {
  0%   { opacity: 0; letter-spacing: 0.2em; }
  40%  { opacity: 1; letter-spacing: 0.6em; }
  80%  { opacity: 0.6; letter-spacing: 0.8em; }
  100% { opacity: 0; letter-spacing: 1em; }
}

/* UI layer */
.home-ui {
  position: absolute;
  inset: 0;
  z-index: 10;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}

.home-ui > * { pointer-events: all; }

/* Hero text */
.home-hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--page-padding);
  max-width: 700px;
}

.home-eyebrow {
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 2s forwards;
}

.home-name {
  font-size: clamp(72px, 11vw, 150px);
  line-height: 0.86;
  letter-spacing: 2px;
  position: relative;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 2.15s forwards;
  user-select: none;
}

.home-name-fill {
  position: absolute;
  inset: 0;
  background: var(--gradient-hero);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-text-stroke: 0px;
  animation: hero-shimmer 7s ease-in-out infinite alternate;
  display: block;
}

@keyframes hero-shimmer {
  from { background-position: 0% 0%; }
  to   { background-position: 100% 100%; }
}

.home-name-outline {
  visibility: hidden;
  display: block;
  -webkit-text-stroke: 1px rgba(255,255,255,0.1);
  color: transparent;
}

.home-tagline {
  font-family: var(--font-display);
  font-size: clamp(20px, 2.5vw, 28px);
  letter-spacing: 2px;
  color: var(--violet-light);
  margin-top: 16px;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 2.3s forwards;
}

.home-description {
  margin-top: 16px;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 380px;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 2.45s forwards;
}

.home-ctas {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 2.6s forwards;
}

/* Status card */
.home-status-card {
  position: absolute;
  right: var(--page-padding);
  top: 50%;
  transform: translateY(-50%);
  width: 210px;
  padding: 22px;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 2.9s forwards;
}

.home-status-header {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 16px;
}

.home-status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--green);
  animation: status-pulse 2s infinite;
}

@keyframes status-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.4); }
  50%       { box-shadow: 0 0 0 5px rgba(74,222,128,0); }
}

.home-status-row {
  display: flex;
  gap: 10px;
  align-items: baseline;
  margin-bottom: 6px;
}

.home-status-label {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  min-width: 28px;
}

.home-status-val {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-family: var(--font-body);
}

.home-status-divider {
  height: 1px;
  background: var(--glass-border);
  margin: 10px 0;
}

.home-status-open {
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  color: rgba(74,222,128,0.7);
  text-transform: uppercase;
}

/* Bottom bar */
.home-bottom {
  padding: 20px var(--page-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 0;
  animation: fade-up 0.8s var(--ease-out) 3.1s forwards;
}

.home-scroll-hint {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.home-scroll-line {
  display: block;
  width: 40px; height: 1px;
  background: var(--glass-border);
  position: relative;
  overflow: hidden;
}

.home-scroll-line::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: var(--violet-light);
  animation: scroll-run 2.5s ease-in-out infinite;
}

@keyframes scroll-run {
  0%   { left: -100%; }
  100% { left: 100%; }
}

.home-socials {
  display: flex;
  gap: 24px;
}

.home-socials a {
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color var(--duration-fast);
}

.home-socials a:hover { color: var(--text-secondary); }

/* Shared animation */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Mobile home */
@media (max-width: 768px) {
  .home-hero { padding: 0 24px; max-width: none; }
  .home-status-card { display: none; }
  .home-bottom { padding: 16px 24px; }
  .home-name { font-size: clamp(56px, 15vw, 100px); }
}
```

---

## Task 5: About Page

**Files:**
- Modify: `src/pages/About.jsx`

- [ ] **Step 1: Rewrite About.jsx**

Read current About.jsx first to preserve all content (bio, education data, etc.), then rewrite the JSX with the new design. Key layout:
- Page header with Bebas Neue "ABOUT"
- Split layout: bio/content left (55%), photo right (45%) on desktop
- Photo in a circular container with a chromatic gradient border
- Education as glassmorphism `.entry` cards
- All sections use `.reveal` for scroll animation

The rewrite should preserve all existing biographical content and education data from the current file but wrap it in the new component structure.

---

## Task 6: Experience Page

**Files:**
- Modify: `src/pages/ExperiencePage.jsx`
- Modify: `src/components/Experience.jsx` (if needed)

- [ ] **Step 1: Read current ExperiencePage.jsx and Experience.jsx to capture all job data**
- [ ] **Step 2: Rewrite ExperiencePage.jsx with timeline layout**

Each job gets an `.entry` card. Add a `timeline-line` element (1px left border with violet-to-cyan gradient) connecting the cards vertically. Page header uses new `section-eyebrow` + `page-title` pattern.

---

## Task 7: Projects Page (Bento Grid)

**Files:**
- Modify: `src/pages/ProjectsPage.jsx`
- Modify: `src/components/Projects.jsx` (if needed)
- Modify: `src/components/Projects.css`

- [ ] **Step 1: Read current ProjectsPage to capture all project data**
- [ ] **Step 2: Rewrite ProjectsPage.jsx with bento grid layout**

CSS grid with named areas. Featured project spans 2 columns. Each card shows:
- Project name (Bebas Neue)
- Short description
- Tech stack pills
- GitHub link + Demo link (appear on hover via opacity transition)
- Top accent border on hover (gradient)

---

## Task 8: Skills Page

**Files:**
- Modify: `src/pages/SkillsPage.jsx`
- Modify: `src/components/Skills.jsx`
- Modify: `src/components/Skills.css`

- [ ] **Step 1: Read current SkillsPage content**
- [ ] **Step 2: Rewrite SkillsPage with category card grid**

2-column grid of glassmorphism cards. Each category card:
- Category name as `.section-eyebrow`
- Skill tags as `.tech-tag` pills
- Hover lifts card and brightens border

---

## Task 9: Research, Certifications, Leadership, Hobbies Pages

**Files:**
- Modify: `src/pages/ResearchPage.jsx`
- Modify: `src/pages/CertificationsPage.jsx`
- Modify: `src/pages/LeadershipPage.jsx`
- Modify: `src/pages/HobbiesPage.jsx`
- Modify: `src/pages/HobbiesPage.css`

- [ ] **Step 1: Rewrite ResearchPage** — glassmorphism cards with title, abstract, PDF download buttons
- [ ] **Step 2: Rewrite CertificationsPage** — 2-3 column grid, shimmer top border, issuer/date/link
- [ ] **Step 3: Rewrite LeadershipPage** — minimal timeline matching experience style
- [ ] **Step 4: Rewrite HobbiesPage** — mosaic grid with large emoji tiles and Bebas Neue labels

---

## Task 10: Contact Page

**Files:**
- Modify: `src/pages/ContactPage.jsx`
- Modify: `src/pages/ContactPage.css`

- [ ] **Step 1: Rewrite ContactPage**

Centered layout with large Bebas Neue "LET'S TALK" heading. Form fields with glowing focus borders. Submit button uses `.btn-primary`. Social pills below form (GitHub, LinkedIn, Email).

Form keeps existing EmailJS integration from `src/config/emailjs.js`.

---

## Task 11: Footer + NotFound

**Files:**
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.css`
- Modify: `src/pages/NotFound.jsx`

- [ ] **Step 1: Rewrite Footer**

Minimal dark footer:
- "Let's work together →" CTA link to /contact
- Copyright line in DM Mono
- Social links row

- [ ] **Step 2: Rewrite NotFound.jsx**

Large Bebas Neue "404", DM Mono error message, link back home with `.btn-primary`.

---

## Task 12: ScrollReveal Hook + Final Polish

**Files:**
- Modify: `src/hooks/useScrollAnimation.js`

- [ ] **Step 1: Ensure useScrollAnimation uses IntersectionObserver + adds `reveal` and `visible` classes**

```js
// src/hooks/useScrollAnimation.js
import { useEffect, useRef } from 'react'

export function useScrollReveal(options = {}) {
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px' } = options
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) } },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}

// NOTE: useScrollRevealList not implemented as a hook (hooks in loops violate React rules).
// Instead, use a single container ref + querySelectorAll pattern:
export function useScrollRevealContainer(options = {}) {
  const { threshold = 0.1, staggerMs = 80, selector = '.reveal' } = options
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const items = Array.from(container.querySelectorAll(selector))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = items.indexOf(entry.target)
            setTimeout(() => {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }, Math.max(0, idx) * staggerMs)
          }
        })
      },
      { threshold }
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [threshold, staggerMs, selector])

  return containerRef
}
```

- [ ] **Step 2: Add `reveal` class to key elements across pages**

Add `className="reveal"` to `.entry`, `.glass-card`, section headers across all pages. The CSS already handles the animation via `.reveal` and `.reveal.visible`.

---

## Task 13: Build + Deploy

- [ ] **Step 1: Run full build**

```bash
npm run build
```
Expected: No errors. Dist folder generated.

- [ ] **Step 2: Preview build**

```bash
npm run preview
```
Check all pages load, animations work, no console errors.

- [ ] **Step 3: Deploy**

```bash
npm run deploy
```

---

## Notes

- The `ThemeContext.jsx` and `ThemeToggle.jsx` files are kept on disk but not imported anywhere.
- `AnimatedBackground.jsx` is kept but not used (replaced by `AuroraBackground.jsx`).
- `BottomNav.jsx` is kept on disk but not imported in App.jsx.
- All existing EmailJS configuration in `src/config/emailjs.js` is preserved as-is.
- The `deploy.sh` script handles copying built assets to root — run `npm run deploy` not `npm run build` for publishing.
