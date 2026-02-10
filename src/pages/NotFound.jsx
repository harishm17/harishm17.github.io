import { Link } from 'react-router-dom'
import './Pages.css'

function NotFound() {
  return (
    <div className="page">
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="cta-button primary" style={{ display: 'inline-flex', marginTop: 16 }}>
        <span>Back to Home</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </Link>
    </div>
  )
}

export default NotFound
