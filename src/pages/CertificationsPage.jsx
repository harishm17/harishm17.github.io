import Certifications from '../components/Certifications'
import './Pages.css'

function CertificationsPage() {
  return (
    <div className="page certifications-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
      <h1 className="page-title">Certifications</h1>
      <p className="page-subtitle">
        Professional certifications and continuous learning achievements
      </p>
      <Certifications showTitle={false} />
    </div>
  )
}

export default CertificationsPage
