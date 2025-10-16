import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Pages.css'

function Home() {
  const [typedText, setTypedText] = useState('')
  const fullText = "Harish Manoharan"
  const [showCursor, setShowCursor] = useState(true)

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
    <div className="page home-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
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
          <span className="role-tag">AI Enthusiast</span>
          <span className="role-tag">Full-Stack Developer</span>
        </div>

        <div className="hero-description">
          <p>
            Master's student in Computer Science at UT Dallas with a passion for building
            intelligent systems and scalable applications. I specialize in full-stack development,
            AI/ML, and creating innovative solutions that make a real impact.
          </p>
        </div>

        <div className="cta-buttons">
          <Link to="/projects" className="cta-button primary">
            <span>View My Work</span>
            <span className="arrow">→</span>
          </Link>
          <Link to="/about" className="cta-button secondary">
            <span>About Me</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
