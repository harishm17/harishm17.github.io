function Research({ showTitle = true }) {

  const research = [
    {
      title: "Unsupervised Behavior Discovery and Genetics of Mice - Master's Thesis",
      institution: "Indian Institute of Technology, Madras & The Jackson Laboratory",
      date: "Jul 2023 - Jun 2024",
      advisors: "Advised by Prof. Balaraman Ravindran (IIT Madras) and Dr. Vivek Kumar (Jackson Laboratory)",
      technologies: ["Python", "PyTorch", "RNN", "Computer Vision", "Machine Learning", "Deep Learning"],
      points: [
        "Temporal Video segmentation and Action recognition using key point movement data from large mice video dataset",
        "Trained a bidirectional RNN autoencoder decoder model and performed k-means based clustering to segment videos"
      ],
      report: {
        title: "Master's Thesis Report",
        filename: "Harish___DDP_Report.pdf",
        description: ""
      }
    },
    {
      title: "Classified Rank-Maximal Matchings and Popular Matchings - Algorithms and Hardness",
      subtitle: "CS6130 - Advanced Graph Algorithms",
      institution: "Indian Institute of Technology, Madras",
      date: "Jan 2024 - May 2024",
      technologies: ["Graph Theory", "Algorithm Design", "Flow Networks", "NP-Hardness"],
      points: [
        "Presented research paper on classified rank maximal matching problem with laminar classifications",
        "Developed O(|E|²) algorithm for rank maximal matchings and proved NP-hardness for non-laminar cases",
        "Analyzed reduction from Independent Set Decision Problem to demonstrate computational complexity",
        "Implemented flow network construction and maxflow computation for optimal matching solutions"
      ],
      report: {
        title: "Paper Presentation Report",
        filename: "CS6130_Report.pdf",
        description: ""
      },
      slides: {
        title: "Project Slides",
        filename: "CS6130.pdf",
        description: ""
      }
    },
    {
      title: "Network and co-expression analysis identifies crucial gene signatures in COVID-19",
      institution: "Indian Institute of Technology, Madras",
      date: "Jan 2023 - May 2023",
      technologies: ["Network Analysis", "Gene Expression", "Bioinformatics", "COVID-19 Research"],
      points: [
        "Conducted comprehensive research analysis demonstrating advanced analytical capabilities",
        "Applied rigorous research methodology to investigate complex academic problems",
        "Produced detailed research findings showcasing analytical and critical thinking skills"
      ],
      report: {
        title: "AACB Research Report",
        filename: "AACB_Report.pdf",
        description: ""
      }
    },
    {
      title: "Identification of optimal intervention strategies for manipulating Home Microbiome - Young Research Fellowship",
      institution: "Indian Institute of Technology, Madras",
      date: "Sep 2021 - Sep 2022",
      advisors: "Advised by Prof. Karthik Raman (IIT Madras)",
      technologies: ["Python", "Graph Theory", "Network Analysis", "Bioinformatics"],
      points: [
        "Constructed and analyzed complex metabolic network models to investigate microbial interactions within diverse environmental conditions, aiming to identify key drivers of ecosystem stability",
        "Applied graph theory and centrality measures, including the Metabolic Support Index, to successfully identify pivotal microbial species essential for the health of the microbiome",
        "YRF Showcase Event - Poster Presentation of project outcomes to professors and fellow students"
      ],
      poster: {
        title: "Research Poster",
        filename: "Harish-YRF_poster.pdf",
        description: ""
      }
    },
    {
      title: "Tumor Deconvolution Challenge - Research Intern",
      institution: "SciWhyLab",
      date: "May 2021 - Aug 2021",
      technologies: ["Python", "PCA", "SVM", "Bioinformatics", "ML"],
      points: [
        "Investigated the tumor microenvironment by analyzing bulk gene expression data to identify and predict the behavior of relative cell populations",
        "Experimented with PCA and other dimensionality reduction methods to reduce the large number of genes",
        "Employed SVM with hyperparameter tuning to obtain a Pearson correlation coefficient of 0.89"
      ],
      github: {
        title: "GitHub Repository",
        url: "https://github.com/harishm17/Tumor-Deconvolution-Challenge",
        description: "Tumor deconvolution challenge repository with Jupyter notebooks and ML models"
      }
    }
  ]

  return (
    <section id="research">
      {showTitle && <h2>Research Experience</h2>}
      {research.map((item, index) => (
          <div key={index} className="entry research-entry">
            <div className="entry-header">
              <div>
                <h3>{item.title}</h3>
                {item.subtitle && <p className="project-subtitle">{item.subtitle}</p>}
                <p className="institution">{item.institution}</p>
                {item.advisors && <p className="advisors">{item.advisors}</p>}
              </div>
              <div className="entry-date">
                <p>{item.date}</p>
              </div>
            </div>
            {item.technologies && (
              <div className="tech-tags">
                {item.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            <ul className="details">
              {item.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            
            {/* Documents - Clean Tag-like Design */}
            {(item.poster || item.report || item.slides || item.github) && (
              <div className="research-documents">
                {item.poster && (
                  <a
                    href={`/${item.poster.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-item"
                    title={`View ${item.poster.title}`}
                    aria-label={`Download ${item.title} - Research Poster PDF`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    Research Poster
                  </a>
                )}
                
                {item.report && (
                  <a
                    href={`/${item.report.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-item"
                    title={`View ${item.report.title}`}
                    aria-label={`Download ${item.title} - Research Report PDF`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                    </svg>
                    Research Report
                  </a>
                )}
                
                {item.slides && (
                  <a
                    href={`/${item.slides.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-item"
                    title={`View ${item.slides.title}`}
                    aria-label={`Download ${item.title} - Project Slides PDF`}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                    Project Slides
                  </a>
                )}
                
                {item.github && (
                  <a
                    href={item.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-item"
                    title={`View ${item.github.title}`}
                    aria-label={`View ${item.title} on GitHub`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub Repository
                  </a>
                )}
              </div>
            )}
          </div>
      ))}
    </section>
  )
}

export default Research
