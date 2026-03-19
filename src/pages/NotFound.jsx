import { Link } from 'react-router-dom'
import './Pages.css'

export default function NotFound() {
  return (
    <div className="page notfound-page">
      <div className="notfound-inner">
        <div className="section-eyebrow" style={{justifyContent: 'center'}}>Error</div>
        <h1 className="notfound-code display">404</h1>
        <p className="mono" style={{fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: 32}}>
          PAGE_NOT_FOUND
        </p>
        <p className="details" style={{maxWidth: 360, textAlign: 'center', marginBottom: 32}}>
          This page drifted off into the void. Let&apos;s get you back on track.
        </p>
        <Link to="/" className="btn-primary">← Back Home</Link>
      </div>
    </div>
  )
}
