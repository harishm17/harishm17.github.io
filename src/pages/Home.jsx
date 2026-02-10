import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import './Pages.css'

function Home() {
  const [typedText, setTypedText] = useState('')
  const fullText = "Harish Manoharan"
  const [showCursor, setShowCursor] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setShowCursor(false)
        setShowContent(true)
      }
    }, 80)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="page page-hero home-page">
      <div className="last-updated">Last Updated: February 2026</div>
      <AnimatedBackground />
      <div className="hero-section">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          <span>Available for opportunities</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-greeting">Hi, I'm</span>
          <span className="hero-name">
            <span className="highlight typed-text">
              {typedText}
              {showCursor && <span className="cursor">|</span>}
            </span>
          </span>
        </h1>

        <div className={`hero-roles ${showContent ? 'visible' : ''}`}>
          <span className="role-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Software Engineer
          </span>
          <span className="role-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
            AI Engineer
          </span>
          <span className="role-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            Full-Stack Developer
          </span>
        </div>

        <p className={`hero-description ${showContent ? 'visible' : ''}`}>
          Building intelligent systems and scalable applications at the intersection of
          AI, data engineering, and full-stack development. Currently crafting LLM evaluation
          frameworks and agentic workflows at Purgo AI.
        </p>

        <div className={`cta-buttons ${showContent ? 'visible' : ''}`}>
          <Link to="/projects" className="cta-button primary">
            <span>View Projects</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
          <a href="/HarishManoharan.pdf" className="cta-button secondary" download aria-label="Download resume">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Resume</span>
          </a>
          <Link to="/contact" className="cta-button ghost">
            <span>Get in Touch</span>
          </Link>
        </div>

        <div className={`hero-stats ${showContent ? 'visible' : ''}`}>
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">MS CS</span>
            <span className="stat-label">UT Dallas '26</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
