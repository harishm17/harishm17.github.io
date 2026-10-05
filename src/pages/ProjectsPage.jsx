import { useState } from 'react'
import './Pages.css'

const projects = [
  {
    title: 'StudyBuddy – AI Exam Prep Coach',
    description: 'Turns course PDFs into topic notes, quizzes and graded practice exams. Documents are chunked by heading, embedded into pgvector (HNSW) and retrieved per topic, and generation runs on OpenAI or Anthropic models behind a shared provider interface. Includes a real-time voice coach on the OpenAI Realtime API over WebRTC, with its tool calls executed server-side. Two services (Next.js and FastAPI) connected by a Cloud Tasks job queue with retry handling, plus 85 backend tests.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'Prisma', 'OpenAI Realtime API', 'WebRTC', 'Anthropic API', 'Cloud Tasks', 'Docker', 'GitHub Actions'],
    categories: ['ai', 'fullstack', 'cloud', 'python'],
    github: 'https://github.com/harishm17/study_buddy',
    demo: '',
  },
  {
    title: 'Databricks IQ/OQ Test Library (Purgo AI)',
    description: 'Public library of the qualification tests behind Purgo\'s Databricks validation engine: 59 versioned test definitions in 17 suites, chaining 133 API calls across Azure and AWS, each with a manual procedure for auditors and a Gherkin scenario. I wrote every commit in this repo.',
    tech: ['Databricks', 'Unity Catalog', 'Azure', 'AWS', 'Gherkin', 'JSON'],
    categories: ['cloud'],
    github: 'https://github.com/PurgoAI/iqoq-testcases',
    demo: '',
  },
  {
    title: 'DivvyDo – Roommate Expense Manager',
    description: 'Expense splitting with five methods (equal, exact, percentage, shares, adjustment). Amounts are stored in integer cents and split with a largest-remainder method, so every split adds up exactly. Built on Supabase Postgres with row-level security, with edge functions for invites, CSV exports and merging duplicate people. 74 tests (Vitest).',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'Edge Functions', 'Tailwind CSS', 'Vitest'],
    categories: ['fullstack'],
    github: 'https://github.com/harishm17/task-manager',
    demo: '',
  },
  {
    title: 'Email Drafting Assistant',
    description: 'Turns a plain-language request into a Gmail draft. A planner step produces a structured plan, the app searches the inbox for context, and a drafting step writes the reply, which is saved as a draft rather than sent. PII is scrubbed before any text reaches the model, and both LLM steps return Pydantic-validated output.',
    tech: ['Python', 'LangChain', 'Gemini API', 'Gmail API', 'Pydantic', 'OAuth2'],
    categories: ['ai', 'python'],
    github: 'https://github.com/harishm17/smart_email',
    demo: '',
  },
]

const FILTERS = [
  { id: null,        label: 'All' },
  { id: 'ai',       label: 'AI / LLM' },
  { id: 'python',   label: 'Python' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'cloud',    label: 'Cloud' },
]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState(null)

  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Portfolio</div>
        <h1 className="page-title">PROJECTS</h1>
        <p className="page-subtitle">Projects built at the intersection of AI and engineering.</p>
      </div>

      {/* Category filter */}
      <div className="project-filters reveal">
        {FILTERS.map(f => (
          <button
            key={String(f.id)}
            className={`filter-chip mono${activeFilter === f.id ? ' filter-chip--active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="bento-grid">
        {projects.map((p, i) => {
          const dimmed = activeFilter !== null && !p.categories.includes(activeFilter)
          return (
            <div
              key={i}
              className={`bento-card entry${dimmed ? ' project-dimmed' : ''}`}
            >
              <div className="bento-card-inner">
                <h3 className="bento-card-title display">{p.title}</h3>
                <p className="details">{p.description}</p>
                <div className="tech-tags">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="bento-card-links">
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub ↗</a>}
                  {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-ghost">Live ↗</a>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
