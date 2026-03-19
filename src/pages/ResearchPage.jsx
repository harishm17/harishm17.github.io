import './Pages.css'

const papers = [
  {
    title: "Unsupervised Behavior Discovery and Genetics of Mice – Master's Thesis",
    area: 'IIT Madras & The Jackson Laboratory · Jul 2023 – Jun 2024 · Advised by Prof. Balaraman Ravindran (IIT Madras) and Dr. Vivek Kumar (Jackson Laboratory)',
    abstract: 'Temporal video segmentation and action recognition using key point movement data from large mice video dataset. Trained a bidirectional RNN autoencoder decoder model and performed k-means based clustering to segment videos into distinct behavioral episodes for downstream genetic analysis.',
    tech: ['Python', 'PyTorch', 'RNN', 'Computer Vision', 'Machine Learning', 'Deep Learning'],
    pdf: '/Harish___DDP_Report.pdf',
    poster: null,
  },
  {
    title: 'Classified Rank-Maximal Matchings and Popular Matchings – Algorithms and Hardness',
    area: 'IIT Madras · CS6130 Advanced Graph Algorithms · Jan 2024 – May 2024',
    abstract: 'Presented research on the classified rank maximal matching problem with laminar classifications. Developed an O(|E|²) algorithm for rank maximal matchings and proved NP-hardness for non-laminar cases. Analyzed reduction from the Independent Set Decision Problem to demonstrate computational complexity and implemented flow network construction for optimal matching solutions.',
    tech: ['Graph Theory', 'Algorithm Design', 'Flow Networks', 'NP-Hardness'],
    pdf: '/CS6130_Report.pdf',
    poster: '/CS6130.pdf',
  },
  {
    title: 'Network and Co-expression Analysis Identifies Crucial Gene Signatures in COVID-19',
    area: 'IIT Madras · Jan 2023 – May 2023',
    abstract: 'Comprehensive network and co-expression analysis to identify gene signatures critical to COVID-19 pathology. Applied rigorous research methodology combining network analysis with gene expression data to investigate complex regulatory mechanisms and identify potential therapeutic targets.',
    tech: ['Network Analysis', 'Gene Expression', 'Bioinformatics', 'COVID-19 Research'],
    pdf: '/AACB_Report.pdf',
    poster: null,
  },
  {
    title: 'Identification of Optimal Intervention Strategies for Manipulating Home Microbiome – Young Research Fellowship',
    area: 'IIT Madras · Sep 2021 – Sep 2022 · Advised by Prof. Karthik Raman (IIT Madras)',
    abstract: 'Constructed and analyzed complex metabolic network models to investigate microbial interactions within diverse environmental conditions, aiming to identify key drivers of ecosystem stability. Applied graph theory and centrality measures, including the Metabolic Support Index, to identify pivotal microbial species essential for microbiome health. Presented findings at YRF Showcase Event via poster presentation.',
    tech: ['Python', 'Graph Theory', 'Network Analysis', 'Bioinformatics'],
    pdf: null,
    poster: '/Harish-YRF_poster.pdf',
  },
  {
    title: 'Tumor Deconvolution Challenge – Research Intern',
    area: 'SciWhyLab · May 2021 – Aug 2021',
    abstract: 'Investigated the tumor microenvironment by analyzing bulk gene expression data to identify and predict the behavior of relative cell populations. Experimented with PCA and other dimensionality reduction methods to reduce the large feature space of genes. Employed SVM with hyperparameter tuning to obtain a Pearson correlation coefficient of 0.89.',
    tech: ['Python', 'PCA', 'SVM', 'Bioinformatics', 'ML'],
    pdf: null,
    poster: null,
    github: 'https://github.com/harishm17/Tumor-Deconvolution-Challenge',
  },
]

export default function ResearchPage() {
  return (
    <div className="page">
      <div className="page-header">
        <div className="section-eyebrow">Academic</div>
        <h1 className="page-title">RESEARCH</h1>
        <p className="page-subtitle">Exploring the frontiers of AI safety, evaluation, and intelligent systems.</p>
      </div>

      <div>
        {papers.map((p, i) => (
          <div key={i} className="entry reveal">
            <div className="entry-header">
              <h3 style={{fontSize: '1.1rem', fontFamily: 'var(--font-body)', fontWeight: 700}}>{p.title}</h3>
            </div>
            {p.area && <div className="institution" style={{marginBottom: 12}}>{p.area}</div>}
            <p className="details">{p.abstract}</p>
            {p.tech && (
              <div className="tech-tags" style={{marginTop: 12}}>
                {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            )}
            <div className="tech-tags" style={{marginTop: 16}}>
              {p.pdf && <a href={p.pdf} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{fontSize: '0.65rem'}}>PDF ↗</a>}
              {p.poster && <a href={p.poster} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{fontSize: '0.65rem'}}>Poster ↗</a>}
              {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{fontSize: '0.65rem'}}>GitHub ↗</a>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
