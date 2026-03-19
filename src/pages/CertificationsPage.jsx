import './Pages.css'

const certs = [
  {
    name: 'AWS Solutions Architect Associate',
    issuer: 'Amazon Web Services',
    date: '',
    url: '',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '',
    url: '',
  },
  {
    name: 'DeepLearning.AI TensorFlow Developer Specialization',
    issuer: 'Coursera',
    date: 'Jun 2023',
    url: 'https://www.coursera.org/account/accomplishments/specialization/EMK8CANULYKT',
  },
  {
    name: 'Machine Learning',
    issuer: 'Coursera',
    date: '',
    url: 'https://www.coursera.org/account/accomplishments/verify/A97LKX4JCMYM',
  },
]

export default function CertificationsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Credentials</div>
        <h1 className="page-title">CERTIFICATIONS</h1>
        <p className="page-subtitle">Continuous learning across AI, cloud, and data engineering.</p>
      </div>

      <div className="certs-grid">
        {certs.map((c, i) => (
          <div key={i} className="cert-card entry reveal">
            <div className="cert-shimmer" />
            <h3 style={{fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: 8}}>{c.name}</h3>
            <div className="institution">{c.issuer}</div>
            {c.date && <div className="entry-date" style={{textAlign: 'left', marginLeft: 0, marginTop: 8}}>{c.date}</div>}
            {c.url && (
              <a href={c.url} target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
                style={{marginTop: 16, fontSize: '0.6rem'}}>
                View Credential ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
