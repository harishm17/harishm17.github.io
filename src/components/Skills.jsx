import './Skills.css'

function Skills({ showTitle = true }) {
  const skills = [
    {
      category: "Programming Languages",
      icon: "💻",
      items: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "Java", "C", "R", "Bash"],
      color: "#2563eb"
    },
    {
      category: "AI/ML & LLMs",
      icon: "🤖",
      items: ["LangChain", "LangGraph", "OpenAI API", "Gemini API", "Langfuse", "LlamaIndex", "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "spaCy"],
      color: "#0891b2"
    },
    {
      category: "Backend & Web Development",
      icon: "⚙️",
      items: ["FastAPI", "NestJS", "Django", "Flask", "NodeJS", "Express", "React", "Next.js", "REST APIs", "GraphQL"],
      color: "#8b5cf6"
    },
    {
      category: "Databases & Caching",
      icon: "💾",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "ChromaDB", "Pinecone", "SQLAlchemy", "Prisma"],
      color: "#10b981"
    },
    {
      category: "Cloud & DevOps",
      icon: "☁️",
      items: ["AWS", "GCP", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Terraform", "Linux"],
      color: "#f59e0b"
    },
    {
      category: "Data Science & Analytics",
      icon: "📊",
      items: ["pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Jupyter", "Data Visualization", "Statistical Analysis"],
      color: "#ec4899"
    }
  ]

  return (
    <section id="skills">
      {showTitle && <h2>Technical Skills</h2>}
      <div className="skills-container">
        {skills.map((skillGroup, index) => (
          <div key={index} className="skill-category-card">
            <div className="category-header">
              <span className="category-icon">{skillGroup.icon}</span>
              <h3>{skillGroup.category}</h3>
            </div>
            <div className="skill-badges">
              {skillGroup.items.map((skill, idx) => (
                <span
                  key={idx}
                  className="skill-badge"
                  style={{ '--badge-color': skillGroup.color }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
