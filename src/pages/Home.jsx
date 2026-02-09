import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AnimatedBackground from '../components/AnimatedBackground'
import './Pages.css'

function Home() {
  const [typedText, setTypedText] = useState('')
  const fullText = "Harish Manoharan"
  const [showCursor, setShowCursor] = useState(true)

  // Typing effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setShowCursor(false)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="page page-hero home-page">
      <AnimatedBackground />
      <div className="last-updated">Last Updated: February 2026</div>
      <div className="hero-section">
        <h1 className="hero-title">
          Hi, I'm{' '}
          <span className="highlight typed-text">
            {typedText}
            {showCursor && <span className="cursor">|</span>}
          </span>
        </h1>

        <div className="role-tags">
          <span className="role-tag">Software Engineer</span>
          <span className="role-tag">AI Engineer</span>
          <span className="role-tag">Full-Stack Developer</span>
        </div>

        <div className="hero-description">
          <p>
            Master's student in Computer Science at UT Dallas with a passion for building
            intelligent systems and scalable applications. I specialize in full-stack development,
            AI, and creating innovative solutions that make a real impact.
          </p>
        </div>

        <div className="cta-buttons">
          <Link to="/projects" className="cta-button primary">
            <span>View Projects</span>
            <span className="arrow">→</span>
          </Link>
          <a
            href="/HarishManoharan.pdf"
            className="cta-button resume"
            download
            aria-label="Download resume PDF"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Resume</span>
          </a>
          <Link to="/contact" className="cta-button tertiary">
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
