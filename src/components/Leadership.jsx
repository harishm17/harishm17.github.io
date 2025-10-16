function Leadership({ showTitle = true }) {
  const activities = [
    {
      title: "Head, Coding and Logic Vertical",
      organization: "Shaastra, IIT Madras",
      date: "May 2021 - Apr 2022",
      points: [
        "Spearheaded a team of 20 coordinators and 10 volunteers, hosting 15 coding and logic related events",
        "Ideated two new contests and elevated event standards, attracting 6000+ participants"
      ]
    },
    {
      title: "Coordinator, Programming Club",
      organization: "Centre For Innovation (CFI)",
      date: "Apr 2020 - Apr 2021",
      points: [
        "Introduced and led tutorial sessions on Greedy and Dynamic Programming paradigms for college freshers",
        "Organized regular institute-wide programming contests to foster competitive programming culture among students"
      ]
    }
  ]

  return (
    <section id="leadership">
      {showTitle && <h2>Leadership & Volunteering</h2>}
      {activities.map((activity, index) => (
        <div key={index} className="entry">
          <div className="entry-header">
            <div>
              <h3>{activity.title}</h3>
              <p className="institution">{activity.organization}</p>
            </div>
            <div className="entry-date">
              <p>{activity.date}</p>
            </div>
          </div>
          <ul>
            {activity.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default Leadership
