import Education from '../components/Education'
import './Pages.css'

function About() {
  return (
    <div className="page about-page">
      <div className="last-updated">Last Updated: February 2026</div>
      <h1 className="page-title">About Me</h1>
      <p className="page-subtitle about-subtitle">
        Master's in CS at UT Dallas · Software Engineer at Purgo AI ·
        <br />
        Building <span className="nowrap">AI & full-stack systems</span>
      </p>

      <div className="about-content">
        <div className="about-hero">
          <div className="about-photo-wrap">
            <img src="/photo.JPG" alt="Harish Manoharan" className="about-photo" />
          </div>
          <div className="about-intro">
            <h2>Hello, I'm Harish 👋</h2>
            <p>
              I'm a Master's student in Computer Science at the University of Texas at Dallas, graduating in May 2026.
              I work as a Software Engineer (Core Team) at Purgo AI, building AI-powered data engineering platforms and LLM evaluation systems.
            </p>
            <p>
              My background started at IIT Madras with an Inter-disciplinary Dual Degree in Data Science and Biological Sciences - a combination that sparked my interest in applying computational techniques at the intersection of AI, data engineering, and intelligent systems.
            </p>
            <p>
              I specialize in full-stack applications with AI/ML: multi-agent orchestration, RAG pipelines, real-time voice interfaces, and automated evaluation. I work across the stack - architecture, backend, frontend - and focus on reliability through testing and monitoring.
            </p>
          </div>
        </div>

        <div className="about-cards">
          <div className="currently-section">
            <h2>Currently</h2>
            <ul className="currently-list">
              <li><span className="currently-icon">💼</span> Software Engineer (Core Team) at <strong>Purgo AI</strong></li>
              <li><span className="currently-icon">🎓</span> Graduating May 2026 - <strong>F-1 OPT</strong></li>
              <li><span className="currently-icon">🔨</span> Building <strong>Agentic workflows & LLM evaluation systems</strong></li>
              <li><span className="currently-icon">📚</span> Learning <strong>Advanced system design & distributed systems</strong></li>
            </ul>
          </div>

          <div className="interests">
            <h2>Areas of Interest</h2>
            <div className="interest-tags">
              <span className="tag">Applied AI</span>
              <span className="tag">Machine Learning</span>
              <span className="tag">Full-Stack Development</span>
              <span className="tag">Multi-Agent Systems</span>
              <span className="tag">Cloud Computing</span>
              <span className="tag">NLP</span>
              <span className="tag">Computer Vision</span>
              <span className="tag">Bioinformatics</span>
              <span className="tag">System Design</span>
            </div>
          </div>
        </div>

        <div className="education-section">
          <Education />
        </div>
      </div>
    </div>
  )
}

export default About
