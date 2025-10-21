import ScrollFadeIn from './ScrollFadeIn'
import './Skills.css'

function Skills({ showTitle = true }) {
  const skills = [
    {
      category: "Programming Languages",
      icon: "💻",
      items: [
        { name: "Python", level: "expert" },
        { name: "JavaScript", level: "expert" },
        { name: "TypeScript", level: "advanced" },
        { name: "SQL", level: "expert" },
        { name: "C++", level: "advanced" },
        { name: "Java", level: "intermediate" },
        { name: "C", level: "advanced" },
        { name: "R", level: "intermediate" },
        { name: "Bash", level: "advanced" }
      ],
      color: "#2563eb"
    },
    {
      category: "AI/ML & LLMs",
      icon: "🤖",
      items: [
        { name: "LangChain", level: "expert" },
        { name: "LangGraph", level: "expert" },
        { name: "OpenAI API", level: "expert" },
        { name: "Gemini API", level: "expert" },
        { name: "Langfuse", level: "advanced" },
        { name: "LlamaIndex", level: "advanced" },
        { name: "PyTorch", level: "expert" },
        { name: "TensorFlow", level: "advanced" },
        { name: "scikit-learn", level: "expert" },
        { name: "Hugging Face", level: "advanced" },
        { name: "spaCy", level: "advanced" }
      ],
      color: "#0891b2"
    },
    {
      category: "Backend & Web Development",
      icon: "⚙️",
      items: [
        { name: "FastAPI", level: "expert" },
        { name: "NestJS", level: "expert" },
        { name: "Django", level: "advanced" },
        { name: "Flask", level: "expert" },
        { name: "NodeJS", level: "expert" },
        { name: "Express", level: "advanced" },
        { name: "React", level: "expert" },
        { name: "Next.js", level: "advanced" },
        { name: "REST APIs", level: "expert" },
        { name: "GraphQL", level: "intermediate" }
      ],
      color: "#8b5cf6"
    },
    {
      category: "Databases & Caching",
      icon: "💾",
      items: [
        { name: "PostgreSQL", level: "expert" },
        { name: "MySQL", level: "advanced" },
        { name: "MongoDB", level: "advanced" },
        { name: "Redis", level: "expert" },
        { name: "ChromaDB", level: "advanced" },
        { name: "Pinecone", level: "advanced" },
        { name: "SQLAlchemy", level: "expert" },
        { name: "Prisma", level: "advanced" }
      ],
      color: "#10b981"
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      items: [
        { name: "AWS", level: "advanced" },
        { name: "GCP", level: "expert" },
        { name: "Docker", level: "expert" },
        { name: "Kubernetes", level: "intermediate" },
        { name: "GitHub Actions", level: "expert" },
        { name: "CI/CD", level: "expert" },
        { name: "Terraform", level: "intermediate" },
        { name: "Linux", level: "expert" }
      ],
      color: "#f59e0b"
    },
    {
      category: "Data Science & Analytics",
      icon: "📊",
      items: [
        { name: "pandas", level: "expert" },
        { name: "NumPy", level: "expert" },
        { name: "Matplotlib", level: "expert" },
        { name: "Seaborn", level: "expert" },
        { name: "Power BI", level: "advanced" },
        { name: "Jupyter", level: "expert" },
        { name: "Data Visualization", level: "expert" },
        { name: "Statistical Analysis", level: "advanced" }
      ],
      color: "#ec4899"
    }
  ]

  const getLevelDots = (level) => {
    const levels = {
      expert: 3,
      advanced: 2,
      intermediate: 1
    }
    return levels[level] || 1
  }

  return (
    <section id="skills">
      {showTitle && <h2>Technical Skills</h2>}
      <div className="skills-container">
        {skills.map((skillGroup, index) => (
          <ScrollFadeIn key={index} delay={index * 80}>
            <div className="skill-category-card">
              <div className="category-header">
                <span className="category-icon">{skillGroup.icon}</span>
                <h3>{skillGroup.category}</h3>
              </div>
              <div className="skill-badges">
                {skillGroup.items.map((skill, idx) => (
                  <div
                    key={idx}
                    className="skill-badge"
                    style={{ '--badge-color': skillGroup.color }}
                  >
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level-dots">
                      {[...Array(3)].map((_, i) => (
                        <span
                          key={i}
                          className={`level-dot ${i < getLevelDots(skill.level) ? 'active' : ''}`}
                          style={{ '--dot-color': skillGroup.color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  )
}

export default Skills
