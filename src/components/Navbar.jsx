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
