import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/contact" className="footer-cta">
          Let&apos;s work together <span className="footer-arrow">→</span>
        </Link>
        <div className="footer-bottom">
          <span className="footer-copy mono">© {new Date().getFullYear()} Harish Manoharan</span>
          <div className="footer-links mono">
            <a href="https://github.com/harishm17" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/harishm17" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:harish_manoharan@outlook.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
