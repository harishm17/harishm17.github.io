import ScrollFadeIn from './ScrollFadeIn'
import './Projects.css'

function Projects({ showTitle = true }) {
  const projects = [
    {
      title: "Market Insights Agent",
      tags: ["Python", "FastAPI", "Redis", "Langfuse", "AI/ML"],
      github: "#",
      featured: true,
      image: "/projects/market-insights.png", // Add your screenshot here
      points: [
        "Cut API response time 60% for 10K+ daily requests by implementing Redis caching layer — Python, FastAPI multi-agent platform orchestrating Technical, News, and Sentiment analysis",
        "Enabled real-time financial insights by architecting specialized agent system delivering comprehensive stock analysis and recommendations — reduced data source dependencies",
        "Improved agent reliability through Langfuse observability integration — detailed performance tracing and evaluation"
      ]
    },
    {
      title: "Smart Email Assistant",
      tags: ["Python", "LangChain", "Gemini", "Google APIs", "AI Agents"],
      github: "#",
      image: "/projects/email-assistant.png", // Add your screenshot here
      points: [
        "Automated email drafting and calendar management by building multi-agent system with LangChain and Gemini — planner, retriever, and drafting agents synthesize context-aware responses",
        "Ensured 100% PII protection through Guardrails AI safety layer with LLM judge validation — structured outputs and redacted sensitive information",
        "Enabled seamless workflow integration via Google Workspace APIs — calendar events and contact management directly from email interface"
      ]
    },
    {
      title: "Othello Game Bot",
      tags: ["C++", "RL", "Neural Networks", "Game Theory"],
      github: "#",
      image: "/projects/othello-bot.png", // Add your screenshot here
      points: [
        "Reduced search space by 60-70% through minimax with alpha-beta pruning — enabled 8-10 move lookahead for optimal move selection in C++",
        "Improved pruning efficiency by developing move ordering heuristics prioritizing high-value moves — significantly reduced nodes evaluated",
        "Enhanced strategic play by training neural network for board position evaluation — bot anticipates opponent responses accurately"
      ]
    },
    {
      title: "Content Similarity Detection",
      subtitle: "Programming Club Project",
      tags: ["Python", "PyTorch", "LSTM", "NLP", "FastAPI"],
      github: "#",
      image: "/projects/similarity-detection.png", // Add your screenshot here
      points: [
        "Achieved 95% F1-score in content similarity detection by implementing Siamese network with LSTM encoders — Python, PyTorch",
        "Showcased live plagiarism detection at annual club open house through FastAPI web service — demonstrated real-time text comparison capabilities"
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
