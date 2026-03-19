import './Pages.css'

const jobs = [
  {
    title: 'Software Engineer (Core Team)',
    company: 'Purgo AI',
    location: 'San Francisco Bay Area',
    dates: 'Jun 2025 – Present',
    bullets: [
      'Engineered a full-stack validation platform for Databricks, automating IQ/OQ validation workflows to reduce validation cycles from days to 20 minutes via orchestrated API testing and audit-ready PDF generation',
      'Designed and implemented an LLM Evaluation Service, automating 20+ reliability checks (hallucination rate, PII leakage, traceability) to verify model safety and support enterprise audit readiness',
      'Built a graph-based retrieval layer that indexes Databricks catalog schemas and table lineage, serving semantic context to the code generation agent to boost SQL/PySpark execution accuracy by 12%',
      'Implemented an agent orchestration state machine (LangGraph Supervisor-Worker) that routes tasks between specialized agents (Research, Design, Coding) to reliably execute end-to-end data engineering workflows',
      'Architected an embedded eSignature workflow (Docusign API, OAuth2, webhooks), enabling in-platform signing and cutting approval cycle time by 50% through server-side envelope creation and event-driven status updates',
    ],
    tech: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'React', 'PostgreSQL', 'Databricks', 'DocuSign API', 'AWS'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Digitus Business Solutions',
    location: 'Bangalore, India',
    dates: 'May 2024 – Jul 2024',
    bullets: [
      'Engineered a text-to-SQL agent with dynamic schema discovery and execution-feedback retries, improving SQL execution accuracy from 52% to 76% on a 500-query evaluation set by automating joins across complex schemas',
      'Built a multimodal RAG system indexing internal knowledge (PPTs, videos) with layout-aware chunking and citation enforcement, reducing median time-to-resolution (TTR) from 20 min to 6 min',
      'Delivered a human-in-the-loop contract tool with risk detection, shortening reviews from 5 days to 2 days',
    ],
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'PostgreSQL', 'RAG', 'Multimodal AI'],
  },
  {
    title: 'Technology Consulting Intern – Data Analytics',
    company: 'PricewaterhouseCoopers',
    location: 'Bangalore, India',
    dates: 'May 2023 – Jul 2023',
    bullets: [
      'Built a sales forecasting pipeline using an XGBoost-SARIMA ensemble with feature engineering for seasonality and promotions, reducing MAPE by 15% over the baseline model for 50+ product SKUs',
      'Engineered an aspect-based sentiment analysis pipeline on 30k+ reviews to identify key satisfaction drivers',
    ],
    tech: ['Python', 'XGBoost', 'SARIMA', 'NLP', 'pandas', 'scikit-learn'],
  },
]

export default function ExperiencePage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Career</div>
        <h1 className="page-title">EXPERIENCE</h1>
        <p className="page-subtitle">Building production systems across AI, cloud, and full-stack domains.</p>
      </div>

      <div className="timeline">
        <div className="timeline-line" />
        {jobs.map((job, i) => (
          <div key={i} className="entry reveal">
            <div className="entry-header">
              <div>
                <h3>{job.company}</h3>
                <div className="institution">{job.title}</div>
                {job.location && <div className="institution-sub">{job.location}</div>}
              </div>
              <div className="entry-date">{job.dates}</div>
            </div>
            <ul>
              {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
            {job.tech && (
              <div className="tech-tags">
                {job.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
