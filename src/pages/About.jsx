import Education from '../components/Education'
import './Pages.css'

function About() {
  return (
    <div className="page about-page">
      <div className="last-updated">Last Updated: February 2026</div>
      <h1 className="page-title">About Me</h1>

      <div className="about-content">
        <div className="about-intro">
          <h2>Hello! 👋</h2>
          <p>
            I'm Harish Manoharan, a Master's student in Computer Science at the University of Texas at Dallas,
            graduating in May 2026. I'm currently working as a Software Engineer (Core Team) at Purgo AI,
            where I build AI-powered data engineering platforms and LLM evaluation systems.
          </p>
          <p>
            My journey in technology started at IIT Madras, where I completed an Integrated Dual Degree
            in Data Science and Biological Sciences. This unique combination sparked my interest in applying
            computational techniques to solve complex real-world problems, particularly at the intersection of
            AI, data engineering, and intelligent systems.
          </p>
          <p>
            I specialize in building full-stack applications with AI/ML capabilities - from multi-agent orchestration
            systems and RAG pipelines to real-time voice interfaces and automated evaluation frameworks. My work spans
            the entire stack: designing system architectures, implementing backend services, building intuitive frontends,
            and ensuring reliability through comprehensive testing and monitoring. I thrive on solving challenging problems
            and creating solutions that make a tangible impact.
          </p>
        </div>

        <div className="currently-section">
          <h2>Currently</h2>
          <div className="currently-list">
            <p>💼 Software Engineer (Core Team) at <strong>Purgo AI</strong></p>
            <p>🎓 Graduating May 2026 - <strong>F-1 OPT</strong></p>
            <p>🔨 Building <strong>Agentic workflows & LLM evaluation systems</strong></p>
            <p>📚 Learning <strong>Advanced system design & distributed systems</strong></p>
          </div>
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

        <div className="education-section">
          <Education />
        </div>
      </div>
    </div>
  )
}

export default About
