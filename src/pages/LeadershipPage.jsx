import Leadership from '../components/Leadership'
import './Pages.css'

function LeadershipPage() {
  return (
    <div className="page leadership-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
      <h1 className="page-title">Leadership & Volunteering</h1>
      <p className="page-subtitle">
        Community involvement and leadership experiences
      </p>
      <Leadership showTitle={false} />
    </div>
  )
}

export default LeadershipPage
