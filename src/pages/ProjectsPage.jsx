import { useState } from 'react'
import './Pages.css'

const projects = [
  {
    title: 'Realtime Exam Prep Coach',
    description: 'AI exam-prep platform that converts course materials into topic-structured notes, quizzes, and graded practice exams using a multi-stage RAG pipeline with semantic chunking and hybrid retrieval. Features a real-time voice coach using WebRTC + OpenAI Realtime with tool-driven drills, concept-only guardrails, automated scoring, and latency/quality telemetry (p95 time-to-first-audio of 600ms). Deployed on GCP with GitHub Actions CI/CD, Prisma + Postgres, and Google OAuth.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'Prisma', 'OpenAI Realtime API', 'WebRTC', 'LangChain', 'Vector Search', 'Redis', 'GCP Cloud Run', 'Docker', 'GitHub Actions', 'Google OAuth'],
    categories: ['ai', 'fullstack', 'cloud', 'python'],
    github: 'https://github.com/harishm17/study_buddy',
    demo: 'https://studybuddy-web-926688152635.us-central1.run.app/',
  },
  {
    title: 'DivvyDo – Roommate Expense Manager',
    description: 'Production-ready expense splitting with 5 methods (equal, exact, percentage, shares, adjustment), handling penny-perfect rounding across N participants. Comprehensive test suite (25 test files) covering financial calculations, balance computations, and component rendering. Admin tooling via Supabase Edge Functions: CSV exports, people merging with audit logs, invite system with token-based acceptance.',
    tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'Edge Functions', 'REST APIs', 'Tailwind CSS', 'Vitest'],
    categories: ['fullstack'],
    github: 'https://github.com/harishm17/task-manager',
    demo: '',
  },
  {
    title: 'Multi-agent Email Assistant',
    description: 'Tool-orchestrated email and calendar copilot that answers questions over inbox and schedule, drafts replies with personalized writing style, and manages calendar events through Google Workspace integration. Includes a safety and reliability stack with schema-validated tool outputs, PII redaction, policy checks, and an independent LLM judge with robust fallbacks and observability.',
    tech: ['Python', 'LangChain', 'LangGraph', 'OpenAI API', 'Google Workspace APIs', 'FastAPI', 'Pydantic', 'OAuth2', 'JSON Schema', 'Langfuse'],
    categories: ['ai', 'agents', 'python'],
    github: 'https://github.com/harishm17/smart_email',
    demo: '',
  },
  {
    title: 'Coffee Check – AI Product Monitor',
    description: 'AI-powered product monitoring system using Anthropic Vision API to automatically detect visual changes, defects, and anomalies in product images. Multi-channel notification pipeline (email, webhook, dashboard) with configurable alert thresholds and severity levels. Dockerized full stack with PM2 process management and comprehensive test suite covering detection accuracy and notification routing.',
    tech: ['Anthropic Vision API', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Webhooks', 'Docker', 'PM2', 'Vitest'],
    categories: ['ai', 'fullstack', 'cloud'],
    github: 'https://github.com/harishm17/coffee_check',
    demo: '',
  },
  {
    title: 'Fashion AI – Wardrobe Stylist',
    description: 'Multimodal AI wardrobe manager using Google Gemini that analyzes clothing images to extract attributes like color, style, and occasion suitability. Skin-tone-aware outfit recommendation engine generating personalized style suggestions based on wardrobe contents and user preferences. Modular pipeline with separate analysis and recommendation stages supporting incremental wardrobe updates.',
    tech: ['Gemini API', 'Python', 'Streamlit', 'Pillow', 'NumPy', 'Google Cloud', 'Multimodal AI', 'Computer Vision', 'JSON APIs'],
    categories: ['ai', 'python'],
    github: 'https://github.com/harishm17/fashion',
    demo: '',
  },
]

const FILTERS = [
  { id: null,        label: 'All' },
  { id: 'ai',       label: 'AI / LLM' },
  { id: 'agents',   label: 'Agents' },
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
