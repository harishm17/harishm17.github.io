import './Projects.css'

function Projects({ showTitle = true }) {
  const projects = [
    {
      title: "Market Insights Agent",
      tags: ["Python", "FastAPI", "Redis", "Langfuse", "AI/ML"],
      github: "#",
      points: [
        "Architected a multi-agent financial analysis platform using Python and FastAPI, orchestrating specialized agents (Technical analysis, News & SEC Filings, Sentiment) to deliver comprehensive, real-time stock insights and advice",
        "Implemented a Redis caching layer for high-traffic endpoints (e.g., top stocks, news), significantly reducing API response latency for repeat queries and minimizing dependencies on external financial data sources",
        "Integrated Langfuse for end-to-end observability, enabling detailed tracing and evaluation of agent performance"
      ]
    },
    {
      title: "Smart Email Assistant",
      tags: ["Python", "LangChain", "Gemini", "Google APIs", "AI Agents"],
      github: "#",
      points: [
        "Architected a multi-agent system using LangChain and Gemini where a planner agent decomposes user requests for specialized retriever and drafting agents to synthesize information and generate context-aware responses",
        "Implemented a robust AI safety layer using Guardrails AI to structure outputs and redact PII, leveraging a separate LLM judge to validate the logical consistency and relevance of generated content",
        "Integrated Google Workspace APIs to allow for calendar event creation and contact management"
      ]
    },
    {
      title: "Othello Game Bot",
      tags: ["C++", "RL", "Neural Networks", "Game Theory"],
      github: "#",
      points: [
        "Built an AI-powered Othello game bot implementing minimax algorithm with alpha-beta pruning, reducing search space complexity by 60-70% and enabling deeper game tree exploration for optimal move selection",
        "Developed move ordering heuristics to prioritize high-value moves early in the search, significantly improving pruning efficiency and reducing nodes evaluated",
        "Trained a neural network to evaluate board positions and strategic value, enabling the bot to assess game states and anticipate opponent responses up to 8-10 moves ahead"
      ]
    },
    {
      title: "Unsupervised Behavior Discovery and Genetics of Mice",
      subtitle: "Indian Institute of Technology, Madras · Jul 2023 - Jun 2024",
      tags: ["Python", "PyTorch", "RNN", "Computer Vision", "ML"],
      points: [
        "Advised by Prof. Balaraman Ravindran (IIT Madras) and Dr. Vivek Kumar (Jackson Laboratory)",
        "Temporal Video segmentation and Action recognition using key point movement data from large mice video dataset",
        "Trained a bidirectional RNN autoencoder decoder model and performed k-means based clustering to segment videos"
      ]
    },
    {
      title: "Content Similarity Detection",
      subtitle: "Programming Club Project",
      tags: ["Python", "PyTorch", "LSTM", "NLP", "FastAPI"],
      points: [
        "Achieved a 95% F1-score in detecting content similarity by implementing a Siamese network with LSTM encoders",
        "Developed a web service with FastAPI showcasing the live application at the annual club open house"
      ]
    }
  ]

  return (
    <section id="projects">
      {showTitle && <h2>Projects</h2>}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
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
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
        ))}
      </div>
    </section>
  )
}

export default Projects
