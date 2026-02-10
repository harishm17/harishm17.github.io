import Experience from '../components/Experience'
import './Pages.css'

function ExperiencePage() {
  return (
    <div className="page experience-page">
      <div className="last-updated">Last Updated: February 2026</div>
      <h1 className="page-title">Professional Experience</h1>
      <p className="page-subtitle">
        My journey through software engineering, research, and innovation
      </p>
      <Experience showTitle={false} />
    </div>
  )
}

export default ExperiencePage
