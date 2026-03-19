import './Pages.css'

export default function About() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Who I Am</div>
        <h1 className="page-title">ABOUT</h1>
        <p className="page-subtitle">Engineer by training, builder by passion.</p>
      </div>

      <div className="about-split">
        {/* Left: bio content */}
        <div className="about-content">
          <div className="entry reveal">
            <p className="details">
              I'm a Master's student in Computer Science at the University of Texas at Dallas, graduating in May 2026.
              I work as a Software Engineer (Core Team) at Purgo AI, building AI-powered data engineering platforms and LLM evaluation systems.
            </p>
            <p className="details" style={{marginTop: '12px'}}>
              My background started at IIT Madras with an Inter-disciplinary Dual Degree in Data Science and Biological Sciences, a combination that sparked my interest in applying computational techniques at the intersection of AI, data engineering, and intelligent systems.
            </p>
            <p className="details" style={{marginTop: '12px'}}>
              I specialize in full-stack applications with AI/ML: multi-agent orchestration, RAG pipelines, real-time voice interfaces, and automated evaluation. I work across architecture, backend, and frontend, focusing on reliability through testing and monitoring.
            </p>
          </div>

          <div className="entry reveal" style={{marginTop: '24px'}}>
            <div className="section-eyebrow" style={{marginBottom: '16px'}}>Currently</div>
            <ul>
              <li>Software Engineer (Core Team) at <strong>Purgo AI</strong></li>
              <li>Graduating May 2026 · <strong>F-1 OPT</strong></li>
              <li>Building <strong>Agentic workflows &amp; LLM evaluation systems</strong></li>
              <li>Learning <strong>Advanced system design &amp; distributed systems</strong></li>
            </ul>
          </div>

          <div className="entry reveal" style={{marginTop: '24px'}}>
            <div className="section-eyebrow" style={{marginBottom: '16px'}}>Areas of Interest</div>
            <div className="tech-tags" style={{marginTop: 0}}>
              <span className="tech-tag">Applied AI</span>
              <span className="tech-tag">Machine Learning</span>
              <span className="tech-tag">Full-Stack Development</span>
              <span className="tech-tag">Multi-Agent Systems</span>
              <span className="tech-tag">Cloud Computing</span>
              <span className="tech-tag">NLP</span>
              <span className="tech-tag">Computer Vision</span>
              <span className="tech-tag">Bioinformatics</span>
              <span className="tech-tag">System Design</span>
            </div>
          </div>

          <div className="section-eyebrow" style={{marginTop: '48px', marginBottom: '24px'}}>Education</div>

          <div className="entry reveal">
            <div className="entry-header">
              <div>
                <h3>M.S. in Computer Science</h3>
                <div className="institution">University of Texas at Dallas</div>
                <div className="institution-sub">Dean's Graduate Scholar · GPA: 3.91/4.0</div>
              </div>
              <div className="entry-date">May 2026</div>
            </div>
            <div className="tech-tags" style={{marginTop: '16px'}}>
              {['Design and Analysis of Algorithms', 'Operating Systems', 'Computer Architecture', 'Database Design', 'Machine Learning', 'NLP', 'Artificial Intelligence', 'Web Programming', 'Secure Software Development', 'Big Data Analytics'].map(c => (
                <span key={c} className="tech-tag">{c}</span>
              ))}
            </div>
          </div>

          <div className="entry reveal">
            <div className="entry-header">
              <div>
                <h3>Inter-disciplinary Dual Degree: M.Tech, Data Science &amp; B.S., Biological Sciences</h3>
                <div className="institution">Indian Institute of Technology Madras</div>
                <div className="institution-sub">INSPIRE Scholar, Young Research Fellow · GPA: 8.4/10.0</div>
              </div>
              <div className="entry-date">May 2024</div>
            </div>
            <div className="tech-tags" style={{marginTop: '16px'}}>
              {['Linear Algebra', 'Statistics', 'Pattern Recognition and Machine Learning', 'Deep Learning', 'Artificial Intelligence', 'Algorithmic Approaches to Computational Biology', 'Reinforcement Learning', 'Advanced Graph Algorithms'].map(c => (
                <span key={c} className="tech-tag">{c}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="about-photo-wrap">
          <div className="about-photo-ring">
            <img src="/photo.JPG" alt="Harish Manoharan" className="about-photo" />
          </div>
          <div className="about-chips">
            <span className="tech-tag">📍 Dallas, TX</span>
            <span className="tech-tag">MS Computer Science</span>
            <span className="tech-tag">UT Dallas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
