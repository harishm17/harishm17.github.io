import './Education.css'

function Education() {
  const education = [
    {
      degree: "M.S. in Computer Science",
      institution: "University of Texas at Dallas",
      awards: "Dean's Graduate Scholar",
      date: "May 2026",
      gpa: "3.91/4.0",
      coursework: ["Design and Analysis of Algorithms", "Operating Systems", "Computer Architecture", "Database Design", "Machine Learning", "NLP", "Artificial Intelligence", "Web Programming", "Secure Software Development", "Big Data Analytics"]
    },
    {
      degree: "Inter-disciplinary Dual Degree: M.Tech, Data Science & B.S., Biological Sciences",
      institution: "Indian Institute of Technology Madras",
      awards: "INSPIRE Scholar, Young Research Fellow",
      date: "May 2024",
      gpa: "8.4/10.0",
      coursework: ["Linear Algebra", "Statistics", "Pattern Recognition and Machine Learning", "Deep Learning", "Artificial Intelligence", "Algorithmic Approaches to Computational Biology", "Reinforcement Learning", "Advanced Graph Algorithms"]
    }
  ]

  return (
    <section id="education">
      <h2>Education</h2>
      {education.map((edu, index) => (
        <div key={index} className="entry education-entry">
          <div className="entry-header">
            <div>
              <h3>{edu.degree}</h3>
              <p className="institution">{edu.institution}</p>
              {edu.awards && <p className="education-awards">{edu.awards}</p>}
            </div>
            <div className="entry-date">
              <p>{edu.date}</p>
              <p className="gpa">GPA: {edu.gpa}</p>
            </div>
          </div>
          <div className="coursework-section">
            <h4 className="coursework-title">Relevant Coursework</h4>
            <div className="coursework-badges">
              {edu.coursework.map((course, idx) => (
                <span key={idx} className="course-badge">
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Education
