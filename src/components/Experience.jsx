import ScrollFadeIn from './ScrollFadeIn'

function Experience({ showTitle = true }) {
  const experiences = [
    {
      title: "Software Engineer (Core Team)",
      company: "Purgo AI",
      date: "Jun 2025 - Present",
      location: "San Francisco Bay Area",
      points: [
        "Engineered a full-stack validation platform for Databricks, automating IQ/OQ validation workflows to reduce validation cycles from days to 20 minutes via orchestrated API testing and audit-ready PDF generation",
        "Designed and implemented an LLM Evaluation Service, automating 20+ reliability checks (hallucination rate, PII leakage, traceability) to verify model safety and support enterprise audit readiness",
        "Built a graph-based retrieval layer that indexes Databricks catalog schemas and table lineage, serving semantic context to the code generation agent to boost SQL/PySpark execution accuracy by 12%",
        "Implemented an agent orchestration state machine (LangGraph Supervisor-Worker) that routes tasks between specialized agents (Research, Design, Coding) to reliably execute end-to-end data engineering workflows",
        "Architected an embedded eSignature workflow (Docusign API, OAuth2, webhooks), enabling in-platform signing and cutting approval cycle time by 50% through server-side envelope creation and event-driven status updates"
      ]
    },
    {
      title: "Software Engineer Intern",
      company: "Digitus Business Solutions",
      date: "May 2024 - Jul 2024",
      location: "Bangalore, India",
      points: [
        "Engineered a text-to-SQL agent with dynamic schema discovery and execution-feedback retries, improving SQL execution accuracy from 52% to 76% on a 500-query evaluation set by automating joins across complex schemas",
        "Built a multimodal RAG system indexing internal knowledge (PPTs, videos) with layout-aware chunking and citation enforcement, reducing median time-to-resolution (TTR) from 20 min to 6 min",
        "Delivered a human-in-the-loop contract tool with risk detection, shortening reviews from 5 days to 2 days"
      ]
    },
    {
      title: "Technology Consulting Intern - Data Analytics",
      company: "PricewaterhouseCoopers",
      date: "May 2023 - Jul 2023",
      location: "Bangalore, India",
      points: [
        "Built a sales forecasting pipeline using an XGBoost-SARIMA ensemble with feature engineering for seasonality and promotions, reducing MAPE by 15% over the baseline model for 50+ product SKUs",
        "Engineered an aspect-based sentiment analysis pipeline on 30k+ reviews to identify key satisfaction drivers"
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
