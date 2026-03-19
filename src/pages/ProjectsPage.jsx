import './Pages.css'

const projects = [
  {
    title: 'Realtime Exam Prep Coach',
    description: 'AI exam-prep platform that converts course materials into topic-structured notes, quizzes, and graded practice exams using a multi-stage RAG pipeline with semantic chunking and hybrid retrieval. Features a real-time voice coach using WebRTC + OpenAI Realtime with tool-driven drills, concept-only guardrails, automated scoring, and latency/quality telemetry — achieving p95 time-to-first-audio of 600 ms. Deployed on GCP (Cloud Run/Cloud Tasks) with GitHub Actions CI/CD, Prisma + Postgres, and Google OAuth.',
    tech: ['Next.js', 'FastAPI', 'PostgreSQL', 'OpenAI Realtime API', 'WebRTC', 'GCP', 'Docker'],
    github: 'https://github.com/harishm17/study_buddy',
    demo: 'https://studybuddy-web-926688152635.us-central1.run.app/',
    featured: true,
  },
  {
    title: 'DivvyDo – Roommate Expense Manager',
    description: 'Production-ready expense splitting with 5 methods (equal/exact/percentage/shares/adjustment) — handles penny-perfect rounding across N participants. Comprehensive test suite (25 test files) covering financial calculations, balance computations, and component rendering. Admin tooling via Supabase Edge Functions — CSV exports, people merging with audit logs, invite system with token-based acceptance.',
    tech: ['React 19', 'TypeScript', 'Supabase', 'Edge Functions', 'Vitest'],
    github: 'https://github.com/harishm17/task-manager',
    demo: '',
    featured: true,
  },
  {
    title: 'Multi-agent Email Assistant',
    description: 'Tool-orchestrated email and calendar copilot that answers questions over inbox and schedule, drafts replies with personalized writing style, and manages calendar events through Google Workspace integration. Includes a safety and reliability stack with schema-validated tool outputs, PII redaction, policy checks, and an independent LLM judge; robust fallbacks and observability for latency and tool failures.',
    tech: ['Python', 'LangChain', 'LangGraph', 'Google Workspace APIs', 'Pydantic'],
    github: 'https://github.com/harishm17/smart_email',
    demo: '',
    featured: true,
  },
  {
    title: 'Coffee Check – AI Product Monitor',
    description: 'AI-powered product monitoring system using Anthropic Vision API — automatically detects visual changes, defects, and anomalies in product images. Multi-channel notification pipeline (email, webhook, dashboard) with configurable alert thresholds and severity levels. Dockerized full stack with PM2 process management and comprehensive test suite with Vitest covering detection accuracy and notification routing.',
    tech: ['Anthropic Vision', 'TypeScript', 'Node.js', 'Docker', 'Vitest'],
    github: 'https://github.com/harishm17/coffee_check',
    demo: '',
    featured: false,
  },
  {
    title: 'Fashion AI – Wardrobe Stylist',
    description: 'Multimodal AI wardrobe manager using Google Gemini — analyzes clothing images to extract attributes like color, style, and occasion suitability. Skin-tone-aware outfit recommendation engine that generates personalized style suggestions based on wardrobe contents and user preferences. Modular pipeline with separate analysis and recommendation stages supporting incremental wardrobe updates and cached profile regeneration.',
    tech: ['Gemini', 'Python', 'Streamlit', 'Multimodal AI', 'Computer Vision'],
    github: 'https://github.com/harishm17/fashion',
    demo: '',
    featured: false,
  },
]

export default function ProjectsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Portfolio</div>
        <h1 className="page-title">WORK</h1>
        <p className="page-subtitle">Projects built at the intersection of AI and engineering.</p>
      </div>

      <div className="bento-grid">
        {projects.map((p, i) => (
          <div key={i} className={`bento-card entry reveal${p.featured ? ' bento-card--featured' : ''}`}>
            <div className="bento-card-inner">
              <h3 className="bento-card-title display">{p.title}</h3>
              <p className="details">{p.description}</p>
              <div className="tech-tags">
                {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
              <div className="bento-card-links">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub ↗</a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">Live ↗</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
