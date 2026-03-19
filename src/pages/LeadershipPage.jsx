import './Pages.css'

const roles = [
  {
    title: 'Head, Coding and Logic Vertical',
    org: 'Shaastra, IIT Madras',
    dates: 'May 2021 – Apr 2022',
    impact: 'Spearheaded a team of 20 coordinators and 10 volunteers, hosting 15 coding and logic related events. Ideated two new contests and elevated event standards, attracting 6000+ participants.',
  },
  {
    title: 'Coordinator, Programming Club',
    org: 'Centre For Innovation (CFI)',
    dates: 'Apr 2020 – Apr 2021',
    impact: 'Introduced and led tutorial sessions on Greedy and Dynamic Programming paradigms for college freshers. Organized regular institute-wide programming contests to foster competitive programming culture among students.',
  },
]

export default function LeadershipPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Community</div>
        <h1 className="page-title">LEADERSHIP</h1>
        <p className="page-subtitle">Building teams and communities beyond the code.</p>
      </div>

      <div className="timeline">
        <div className="timeline-line" />
        {roles.map((r, i) => (
          <div key={i} className="entry reveal">
            <div className="entry-header">
              <div>
                <h3>{r.org}</h3>
                <div className="institution">{r.title}</div>
              </div>
              <div className="entry-date">{r.dates}</div>
            </div>
            {r.impact && <p className="details">{r.impact}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
