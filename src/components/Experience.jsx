function Experience({ showTitle = true }) {
  const experiences = [
    {
      title: "Software Engineer Intern",
      company: "Purgo AI",
      date: "Jun 2025 - Present",
      location: "San Francisco Bay Area",
      points: [
        "Worked on a full-stack validation module (TypeScript, NestJS, React) to automate IQ/OQ testing for Databricks Clinical Data Repository validation, executing multi-step validation workflows to reduce manual checks by 80%",
        "Orchestrated a secure, end-to-end eSignature workflow by integrating the DocuSign API, managing the full OAuth 2.0 lifecycle for authentication, and processing real-time webhooks for signing notifications",
        "Automated service deployment to GCP Cloud Run using a CI/CD pipeline built with Docker and GitHub Actions"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Digitus Business Solutions Pvt. Ltd.",
      date: "May 2024 - Jul 2024",
      location: "Bengaluru, Karnataka, India",
      points: [
        "Built a self-correcting text-to-SQL chatbot featuring iterative refinement capabilities for database interaction",
        "Developed and deployed tools for automated Contract Generation and Contract Comparison",
        "Developed an integration interface between QAD ERP system and Malaysia's MyInvois tax authority portal, enabling automated submission of invoices and tax documents",
        "Implemented event notification system to track document submission status and receive real-time updates from the tax authority"
      ]
    },
    {
      title: "Technology Consultant Intern",
      company: "PwC India",
      date: "May 2023 - Jul 2023",
      location: "Bengaluru, Karnataka, India",
      points: [
        "Improved accuracy and added visualizations for Customer Segmentation and sales forecasting analyses",
        "Engineered Python solutions for product and store reviews analysis and customer churn prediction",
        "Developed and integrated APIs to incorporate the functionalities into an existing Django platform",
        "Designed custom PowerBI charts to visually communicate the client data insights for strategic decision making"
      ]
    },
    {
      title: "Young Research Fellow",
      company: "Indian Institute of Technology, Madras",
      date: "Sep 2021 - Sep 2022",
      location: "Chennai, Tamil Nadu, India",
      points: [
        "Advised by Prof. Karthik Raman (IIT Madras)",
        "Constructed and analyzed complex metabolic network models to investigate microbial interactions within diverse environmental conditions, aiming to identify key drivers of ecosystem stability",
        "Applied graph theory and centrality measures, including the Metabolic Support Index, to successfully identify pivotal microbial species essential for the health of the microbiome",
        "YRF Showcase Event - Poster Presentation of project outcomes to professors and fellow students"
      ]
    },
    {
      title: "Research Intern",
      company: "SciWhyLab",
      date: "May 2021 - Aug 2021",
      location: "Remote",
      points: [
        "Investigated the tumor microenvironment by analyzing bulk gene expression data to identify and predict the behavior of relative cell populations",
        "Experimented with PCA and other dimensionality reduction methods to reduce the large number of genes",
        "Employed SVM with hyperparameter tuning to obtain a Pearson correlation coefficient of 0.89"
      ]
    }
  ]

  return (
    <section id="experience">
      {showTitle && <h2>Experience</h2>}
      {experiences.map((exp, index) => (
        <div key={index} className="entry">
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
      ))}
    </section>
  )
}

export default Experience
