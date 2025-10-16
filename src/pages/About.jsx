import Education from '../components/Education'
import './Pages.css'

function About() {
  return (
    <div className="page about-page">
      <div className="last-updated">Last Updated: Mid October, 2025</div>
      <h1 className="page-title">About Me</h1>

      <div className="about-content">
        <div className="about-intro">
          <h2>Hello! 👋</h2>
          <p>
            I'm Harish Manoharan, a Master's student in Computer Science at the University of Texas at Dallas,
            maintaining a perfect 4.0 GPA as a Dean's Graduate Scholar.
          </p>
          <p>
            My journey in technology started at IIT Madras, where I completed an Integrated Dual Degree
            in Data Science and Biological Sciences. This unique combination sparked my interest in applying
            computational techniques to solve complex real-world problems.
          </p>
          <p>
            I'm passionate about building intelligent systems that leverage AI and machine learning. My work spans
            from developing multi-agent AI systems and full-stack applications to conducting research in bioinformatics
            and computer vision. I thrive on solving challenging problems and creating solutions that make a tangible impact.
          </p>
        </div>

        <div className="currently-section">
          <h2>Currently</h2>
          <div className="currently-list">
            <p>📚 Learning <strong>Go (Golang)</strong></p>
            <p>🔨 Building <strong>This website & Agentic workflows</strong></p>
            <p>📖 Reading <strong>Flowers for Algernon</strong> by Daniel Keyes</p>
          </div>
        </div>

        <div className="interests">
          <h2>Areas of Interest</h2>
          <div className="interest-tags">
            <span className="tag">AI & Machine Learning</span>
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
