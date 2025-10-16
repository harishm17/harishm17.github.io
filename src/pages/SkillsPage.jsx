import Skills from '../components/Skills'
import './Pages.css'

function SkillsPage() {
  return (
    <div className="page skills-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
      <h1 className="page-title">Technical Skills</h1>
      <p className="page-subtitle">
        Technologies and tools I work with
      </p>
      <Skills showTitle={false} />
    </div>
  )
}

export default SkillsPage
