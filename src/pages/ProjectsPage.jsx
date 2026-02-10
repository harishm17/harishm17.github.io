import Projects from '../components/Projects'
import './Pages.css'

function ProjectsPage() {
  return (
    <div className="page projects-page">
      <div className="last-updated">Last Updated: February 2026</div>
      <h1 className="page-title">Projects</h1>
      <p className="page-subtitle">
        Explore my technical projects ranging from AI agents to web applications
      </p>
      <Projects showTitle={false} />
    </div>
  )
}

export default ProjectsPage
