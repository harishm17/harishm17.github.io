import './Pages.css'

const jobs = [
  {
    title: 'Software Engineer',
    company: 'Purgo AI',
    location: 'San Francisco Bay Area',
    dates: 'Jun 2026 – Present',
    bullets: [
      'Cut missed source tables by 70% (79 to 24 on a 103-ticket benchmark) by adding dbt lineage expansion that parses model SQL and resolves ref() and source() calls. I tested four variants and a repo-search alternative before shipping it.',
      'Moved the retrieval and drafting stages to a smaller reasoning model after a five-run, 102-ticket comparison: 7.6x cheaper with no loss in recall. I also set reasoning effort per stage to cut latency.',
      'Made the self-review loop for generated code more reliable: lint rules for Databricks runtime failures (each traced to a real failure), a recovery attempt when every candidate fails, and picking the candidate with the fewest failed checks.',
      'Added checks that generated dbt code names its sources exactly as the project declares them, so a recurring failure is caught in review rather than when the project builds.',
      "Reworked how long attachments are chunked and selected for context, and fixed gaps in Langfuse tracing. I'm the largest contributor to the pipeline's test suite (about 1,100 tests).",
    ],
    tech: ['Python', 'LangGraph', 'Databricks', 'dbt', 'PySpark', 'sqlglot', 'Langfuse', 'Azure OpenAI'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Purgo AI',
    location: 'San Francisco Bay Area',
    dates: 'Jun 2025 – May 2026',
    bullets: [
      'Primary engineer on the IQ/OQ (installation and operational qualification) engine that validates Databricks platforms for regulated customers on Azure and AWS: 59 automated tests in 17 suites, sandboxed execution, live job progress, and evidence reports for auditors.',
      'Built the LLM validation product across the UI, API and test engine. Its 19 tests and 100+ checks cover hallucination, accuracy and F1, demographic bias, determinism, latency under load, and traceability for Azure OpenAI and Databricks-served models.',
      'Wrote an LLM pipeline that turns requirement documents (PDF, DOCX, TXT) into executable test cases, with syntax validation and per-test regeneration from reviewer feedback.',
      'Built semantic table search on Pinecone for Polaris/Iceberg catalogs. On 188 real queries it found 26% more of the right tables than the existing search and ran about 20x faster (4.0 s to 0.18 s).',
      "Added a schema pre-filter to the agent's table retrieval that cut the share of wrong tables in context by 38% with no loss in recall (95 tickets), and integrated GraphRAG lineage search into the agent.",
      'Also built embedded DocuSign signing for validation reports, and PII/PHI masking (Presidio) for data sampled into LLM context.',
    ],
    tech: ['TypeScript', 'NestJS', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Pinecone', 'Presidio', 'GCP Cloud Run'],
  },
  {
    title: 'Software Engineer Intern',
    company: 'Digitus Business Solutions',
    location: 'Bangalore, India',
    dates: 'May 2024 – Jul 2024',
    bullets: [
      'Built a text-to-SQL agent with schema discovery and retries driven by execution errors. Execution accuracy went from 52% to 76% on a 500-query evaluation set.',
      'Built a multimodal RAG assistant over internal slide decks and videos, with layout-aware chunking and enforced citations. Median time to resolution dropped from 20 minutes to 6.',
      'Shipped a human-in-the-loop contract generation and comparison tool with risk detection, cutting legal review from 5 days to 2.',
      "Wrote the API integration between QAD ERP and Malaysia's MyInvois e-invoicing system, which clients use to submit invoices to the tax authority.",
    ],
    tech: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'PostgreSQL', 'RAG', 'Multimodal AI'],
  },
  {
    title: 'Technology Consulting Intern – Data Analytics',
    company: 'PwC',
    location: 'Bangalore, India',
    dates: 'May 2023 – Jul 2023',
    bullets: [
      'Built a sales forecasting pipeline (XGBoost and SARIMA ensemble with seasonality and promotion features) that cut MAPE by 15% against the baseline across 50+ SKUs.',
      'Built an aspect-based sentiment pipeline over 30k+ customer reviews to find what drove satisfaction and churn.',
      'Served model results through Django REST APIs and Power BI dashboards for the client team.',
    ],
    tech: ['Python', 'XGBoost', 'SARIMA', 'NLP', 'pandas', 'scikit-learn', 'Django REST Framework', 'Power BI'],
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
