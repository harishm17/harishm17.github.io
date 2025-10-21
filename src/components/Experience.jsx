import ScrollFadeIn from './ScrollFadeIn'

function Experience({ showTitle = true }) {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Purgo AI",
      date: "Jun 2025 - Present",
      location: "San Francisco Bay Area",
      points: [
        "Reduced manual validation checks by 80% by building a full-stack validation module automating IQ/OQ testing for Databricks Clinical Data Repository — TypeScript, NestJS, React",
        "Automated e-signing via DocuSign integration, managing OAuth 2.0 lifecycle and real-time webhook processing for signing notifications — eliminated manual document routing",
        "Accelerated deployment cycles by implementing CI/CD pipeline with Docker and GitHub Actions, automating service deployment to GCP Cloud Run"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Digitus Business Solutions Pvt. Ltd.",
      date: "May 2024 - Jul 2024",
      location: "Bengaluru, Karnataka, India",
      points: [
        "Enabled natural-language database queries by building a self-correcting text-to-SQL chatbot with iterative refinement — improved data access for non-technical users",
        "Streamlined legal workflows by developing automated Contract Generation and Comparison tools — reduced contract processing time significantly",
        "Automated tax compliance by integrating QAD ERP with Malaysia's MyInvois portal, enabling automated invoice submission and real-time status tracking — eliminated manual document filing"
      ]
    },
    {
      title: "Technology Consultant Intern",
      company: "PwC India",
      date: "May 2023 - Jul 2023",
      location: "Bengaluru, Karnataka, India",
      points: [
        "Improved customer segmentation accuracy by engineering Python solutions for review analysis and churn prediction — enabled data-driven client strategies",
        "Enhanced decision-making capabilities by designing custom PowerBI dashboards visualizing sales forecasts and customer insights — used by leadership for strategic planning",
        "Integrated analytics functionalities into existing Django platform via RESTful APIs — enabled real-time access to ML predictions"
      ]
    }
  ]

  return (
    <section id="experience">
      {showTitle && <h2>Experience</h2>}
      {experiences.map((exp, index) => (
        <ScrollFadeIn key={index} delay={index * 100}>
          <div className="entry">
          <div className="entry-header">
            <div>
              <h3>{exp.title}</h3>
              <p className="institution">{exp.company}</p>
            </div>
            <div className="entry-date">
              <p>{exp.date}</p>
              <p className="location">{exp.location}</p>
            </div>
          </div>
          <ul>
            {exp.points.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
          </div>
        </ScrollFadeIn>
      ))}
    </section>
  )
}

export default Experience
