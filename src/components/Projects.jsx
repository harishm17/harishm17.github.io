import ScrollFadeIn from './ScrollFadeIn'
import './Projects.css'

function Projects({ showTitle = true }) {
  const projects = [
    {
      title: "StudyBuddy - AI Exam Prep Platform",
      tags: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "OpenAI", "Docker"],
      github: "https://github.com/harishm17/study_buddy",
      featured: true,
      image: "/projects/studybuddy-quiz.png",
      points: [
        "Built end-to-end RAG pipeline processing PDF course materials into personalized quizzes and practice exams — 13K+ lines across Next.js frontend and FastAPI microservice",
        "Reduced LLM costs 85% through hybrid semantic search (15 relevant chunks vs full documents) — pgvector embeddings with keyword filtering",
        "Implemented AI-powered grading with detailed feedback for MCQ, short answer, and numerical questions — async job processing prevents timeouts"
      ]
    },
    {
      title: "DivvyDo - Roommate Expense Manager",
      tags: ["React 19", "TypeScript", "Supabase", "Edge Functions", "Vitest"],
      github: "https://github.com/harishm17/task-manager",
      featured: true,
      image: "/projects/divvydo-split.png",
      points: [
        "Shipped production-ready expense splitting with 5 methods (equal/exact/percentage/shares/adjustment) — handles penny-perfect rounding across N participants",
        "Built comprehensive test suite (25 test files) covering financial calculations, balance computations, and component rendering — Vitest with React Testing Library",
        "Implemented admin tooling via Supabase Edge Functions — CSV exports, people merging with audit logs, invite system with token-based acceptance"
      ]
    },
    {
      title: "Smart Email Assistant",
      tags: ["Python", "LangChain", "Gemini 1.5", "Google APIs", "Pydantic"],
      github: "https://github.com/harishm17/smart_email",
      image: "/projects/smart-email-draft.png",
      points: [
        "Architected multi-agent email system with LangChain ReAct pattern — Planner, Retriever, and Drafting agents collaborate for context-aware responses",
        "Implemented PII detection and redaction pipeline catching SSNs, credit cards, API keys, and phone numbers — pre-LLM scrubbing + post-LLM validation gate",
        "Integrated Google Workspace APIs with OAuth 2.0 token refresh — Gmail search, Calendar event creation, Contacts directory lookup"
      ]
    },
    {
      title: "Coffee Check - AI Product Monitor",
      tags: ["Claude Vision", "TypeScript", "Node.js", "Docker", "Vitest"],
      github: "https://github.com/harishm17/coffee_check",
      points: [
        "Built an AI-powered product monitoring system using Claude Vision API — automatically detects visual changes, defects, and anomalies in product images",
        "Implemented multi-channel notification pipeline (email, webhook, dashboard) with configurable alert thresholds and severity levels",
        "Dockerized the full stack with PM2 process management — includes comprehensive test suite with Vitest covering detection accuracy and notification routing"
      ]
    },
    {
      title: "Fashion AI - Wardrobe Stylist",
      tags: ["Gemini", "Python", "Streamlit", "Multimodal AI", "Computer Vision"],
      github: "https://github.com/harishm17/fashion",
      points: [
        "Built a multimodal AI wardrobe manager using Google Gemini — analyzes clothing images to extract attributes like color, style, and occasion suitability",
        "Implemented skin-tone-aware outfit recommendation engine that generates personalized style suggestions based on wardrobe contents and user preferences",
        "Architected a modular pipeline with separate analysis and recommendation stages — supports incremental wardrobe updates and cached profile regeneration"
      ]
    }
  ]

  return (
    <section id="projects">
      {showTitle && <h2>Projects</h2>}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ScrollFadeIn key={index} delay={index * 100}>
            <div className={`project-card ${project.featured ? 'featured' : ''}`}>
            {project.featured && (
              <div className="featured-ribbon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Featured</span>
              </div>
            )}
            <div className="project-header">
              <div>
                <h3>{project.title}</h3>
                {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                  title="View on GitHub"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>

            {project.tags && (
              <div className="project-tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="project-tag">{tag}</span>
                ))}
              </div>
            )}

            <ul className="project-points">
              {project.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  )
}

export default Projects
