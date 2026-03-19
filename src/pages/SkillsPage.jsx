import './Pages.css'

const skillCategories = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Java', 'C', 'R', 'Bash'],
  },
  {
    category: 'AI/ML & LLMs',
    skills: ['LangChain', 'LangGraph', 'OpenAI API', 'Gemini API', 'Langfuse', 'LlamaIndex', 'PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'spaCy'],
  },
  {
    category: 'Backend & Web Development',
    skills: ['FastAPI', 'NestJS', 'Django', 'Flask', 'NodeJS', 'Express', 'React', 'Next.js', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'Databases & Caching',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'ChromaDB', 'Pinecone', 'SQLAlchemy', 'Prisma'],
  },
  {
    category: 'Cloud & DevOps',
    skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Terraform', 'Linux'],
  },
  {
    category: 'Data Science & Analytics',
    skills: ['pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Jupyter', 'Data Visualization', 'Statistical Analysis'],
  },
]

export default function SkillsPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Capabilities</div>
        <h1 className="page-title">SKILLS</h1>
        <p className="page-subtitle">Technologies, frameworks, and tools I work with daily.</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((cat, i) => (
          <div key={i} className="glass-card skills-card reveal">
            <div className="section-eyebrow" style={{marginBottom: 16}}>{cat.category}</div>
            <div className="tech-tags" style={{marginTop: 0}}>
              {cat.skills.map(s => <span key={s} className="tech-tag">{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
