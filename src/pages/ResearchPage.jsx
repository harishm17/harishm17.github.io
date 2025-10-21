import Research from '../components/Research'
import './Pages.css'

function ResearchPage() {
  return (
    <div className="page research-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
      <h1 className="page-title">Research Experience</h1>
      <p className="page-subtitle">
        Academic research in machine learning, bioinformatics, and computational biology
      </p>

      <Research showTitle={false} />
    </div>
  )
}

export default ResearchPage
