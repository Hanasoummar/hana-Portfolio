import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/projects.css'

// ─── Project Card Component ───
function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`project-card ${visible ? 'project-card-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Terminal Header */}
      <div className="project-card-header">
        <div className="project-card-dots">
          <span className="project-card-dot dot-pink" />
          <span className="project-card-dot dot-blue" />
        </div>
        <span className="project-card-filename">project_{project.id}.md</span>
        <span className="project-card-category">{project.category}</span>
      </div>

      {/* Card Body */}
      <div className="project-card-body">
        {/* Image Area */}
        <div className="project-card-image-wrap">
          <img
            src={project.image}
            alt={project.title}
            className="project-card-image"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
          <div className="project-card-image-fallback">
            <span className="project-card-fallback-icon">📁</span>
            <span className="project-card-fallback-text">{project.image}</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="project-card-content">
          <div className="project-card-meta">
            <span className="project-card-number">{project.id}</span>
            <span className="project-card-date">{project.date}</span>
          </div>

          <h3 className="project-card-title">{project.title}</h3>

          <p className="project-card-desc">{project.short_desc}</p>

          {/* Tags */}
          <div className="project-card-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-card-tag">{tag}</span>
            ))}
          </div>

          {/* Stats */}
          <div className="project-card-stats">
            {project.stats.map((stat, i) => (
              <div key={i} className="project-card-stat">
                <span className="project-stat-label">{stat.label}</span>
                <span className="project-stat-value">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="project-card-links">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link project-card-link-github"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.135-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>View Code</span>
              </a>
            ) : (
              <span className="project-card-link project-card-link-private">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span>Private Repo</span>
              </span>
            )}

            <Link
              to={`/projects/${project.id}`}
              className="project-card-link project-card-link-details"
            >
              <span>Details</span>
              <span className="project-link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Filter Button ───
function FilterButton({ label, active, onClick }) {
  return (
    <button
      className={`filter-btn ${active ? 'filter-btn-active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

// ─── Projects Data ───
const allProjects = [
  {
    id: '01',
    title: 'AI Ticket Similarity Assistant',
    short_desc: 'Enterprise semantic search system for automated support ticket grouping at Oracle R&D.',
    tags: ['NLP', 'RAG', 'FastAPI', 'ChromaDB', 'Sentence Transformers', 'Cross-Encoder', 'React.js'],
    stats: [
      { label: 'Company', value: 'Oracle R&D' },
      { label: 'Status', value: 'Production' },
      { label: 'Duration', value: '6 months' },
    ],
    github: null,
    image: '/assets/project-oracle.png',
    category: 'Enterprise AI',
    date: 'Feb — Aug 2025',
  },
  {
    id: '02',
    title: 'HR Analytics Dashboard',
    short_desc: 'End-to-end HR analytics with synthetic data generation and Tableau dashboards.',
    tags: ['Tableau', 'Python', 'Faker', 'BI', 'Data Visualization', 'HR Analytics'],
    stats: [
      { label: 'Employees', value: '8,950' },
      { label: 'Tool', value: 'Tableau' },
      { label: 'Dataset', value: 'Synthetic' },
    ],
    github: 'https://github.com/Hanasoummar/Hr_Analytics_Dashboard',
    image: '/assets/project-hr.png',
    category: 'Data & BI',
    date: '2025',
  },
  {
    id: '03',
    title: 'DarijaBERT LoRA Fine-Tuning',
    short_desc: 'Low-resource NLP research: fine-tuned DarijaBERT for Moroccan dialect classification.',
    tags: ['LLM', 'LoRA', 'HuggingFace', 'NLP', 'PEFT', 'DarijaBERT', 'Low-Resource NLP'],
    stats: [
      { label: 'Accuracy', value: '79.67%' },
      { label: 'F1-Score', value: '78.91%' },
      { label: 'Type', value: 'Research-grade' },
    ],
    github: 'https://github.com/Hanasoummar/DarijaBert_Finetuning',
    image: '/assets/project-darija.png',
    category: 'NLP Research',
    date: '2025',
  },
  {
    id: '04',
    title: 'FINVAULT — Banking Dashboard',
    short_desc: 'Fintech banking analytics dashboard with PostgreSQL, Python EDA, and Power BI.',
    tags: ['Power BI', 'PostgreSQL', 'Python', 'DAX', 'Power Query', 'EDA', 'Banking'],
    stats: [
      { label: 'Clients', value: '3,000+' },
      { label: 'Funding Gap', value: '$610M' },
      { label: 'Fee Revenue', value: '$158M' },
    ],
    github: 'https://github.com/Hanasoummar/FINVAULT-Banking-Dashboard',
    image: '/assets/project-finvault.png',
    category: 'Data & BI',
    date: '2026',
  },
  {
    id: '05',
    title: 'GenAI LinkedIn Post Generator',
    short_desc: 'LLM-powered tool that analyzes writing style and generates tailored LinkedIn posts.',
    tags: ['LLM', 'LangChain', 'Streamlit', 'Llama 3.3', 'Groq API', 'Few-Shot Learning'],
    stats: [
      { label: 'Model', value: 'Llama 3.3' },
      { label: 'API', value: 'Groq' },
      { label: 'UI', value: 'Streamlit' },
    ],
    github: 'https://github.com/Hanasoummar/Linkedin_Post_Generator_Using_Large_Language_Models',
    image: '/assets/project-linkedin.png',
    category: 'Generative AI',
    date: '2025',
  },
  {
    id: '06',
    title: 'Customer Shopping Behavior Analysis',
    short_desc: 'Retail analytics with Python EDA, SQL queries, and Power BI dashboards.',
    tags: ['Python', 'SQL', 'PostgreSQL', 'Power BI', 'Retail Analytics', 'EDA'],
    stats: [
      { label: 'Subscriber Rate', value: '7.3%' },
      { label: 'Loyal Customers', value: '79.9%' },
      { label: 'Revenue Gap', value: '$82K' },
    ],
    github: 'https://github.com/Hanasoummar/Customer_Shopping_Behavior',
    image: '/assets/project-shopping.png',
    category: 'Data & BI',
    date: '2024',
  },
  {
    id: '07',
    title: 'Decision Support System for HR Management',
    short_desc: 'Complete BI solution with ETL pipelines, data warehouse, and Power BI dashboards.',
    tags: ['Power BI', 'DAX', 'Talend', 'SQL Server', 'ETL', 'Data Warehouse', 'BI'],
    stats: [
      { label: 'ETL Tool', value: 'Talend' },
      { label: 'Database', value: 'SQL Server' },
      { label: 'Viz', value: 'Power BI' },
    ],
    github: null,
    image: '/assets/project-hr-bi.png',
    category: 'Data & BI',
    date: '2024',
  },
  {
    id: '08',
    title: '3D Indoor Scene Segmentation',
    short_desc: 'PyTorch-based point cloud deep learning for spatial understanding of indoor environments.',
    tags: ['PyTorch', '3D Vision', 'Point Cloud', 'Open3D', 'W&B', 'Semantic Segmentation'],
    stats: [
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Viz', value: 'Open3D' },
      { label: 'Tracking', value: 'W&B' },
    ],
    github: null,
    image: '/assets/project-3d.png',
    category: 'Computer Vision',
    date: 'Jul — Sep 2024',
  },
]

const categories = ['All', 'Enterprise AI', 'NLP Research', 'Generative AI', 'Data & BI', 'Computer Vision']

// ─── Main Projects Page ───
function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter)

  return (
    <div className="projects-page">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="projects-hero">
        <div className="projects-hero-label">PORTFOLIO</div>
        <h1 className="projects-hero-heading">
          My<br />
          <span className="projects-hero-accent">Projects</span>
        </h1>
        <p className="projects-hero-intro">
          A collection of hands-on work spanning AI research, enterprise systems,
          data engineering, and business intelligence — built with real data and real impact.
        </p>
      </section>

      {/* ═══════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════ */}
      <section className="projects-stats-bar">
        <div className="projects-stat-item">
          <span className="projects-stat-number">{allProjects.length}</span>
          <span className="projects-stat-label">Projects</span>
        </div>
        <div className="projects-stat-divider" />
        <div className="projects-stat-item">
          <span className="projects-stat-number">5</span>
          <span className="projects-stat-label">Open Source</span>
        </div>
        <div className="projects-stat-divider" />
        <div className="projects-stat-item">
          <span className="projects-stat-number">3</span>
          <span className="projects-stat-label">Enterprise</span>
        </div>
        <div className="projects-stat-divider" />
        <div className="projects-stat-item">
          <span className="projects-stat-number">5</span>
          <span className="projects-stat-label">Categories</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FILTER BAR
          ═══════════════════════════════════════ */}
      <section className="projects-filter">
        <div className="projects-filter-label">~ $ filter --by</div>
        <div className="projects-filter-buttons">
          {categories.map(cat => (
            <FilterButton
              key={cat}
              label={cat}
              active={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS GRID
          ═══════════════════════════════════════ */}
      <section className="projects-grid">
        {filteredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </section>

      {/* ═══════════════════════════════════════
          GITHUB CTA
          ═══════════════════════════════════════ */}
      <section className="projects-github-cta">
        <div className="github-terminal">
          <div className="github-terminal-header">
            <span className="github-terminal-dot dot-pink" />
            <span className="github-terminal-dot dot-blue" />
            <span className="github-terminal-title">hana@portfolio: ~ $ git remote -v</span>
          </div>
          <div className="github-terminal-body">
            <p className="github-terminal-line">
              <span className="github-prompt">$</span>
              <span className="github-cmd">echo</span>
              <span className="github-string">"More projects on GitHub"</span>
            </p>
            <a
              href="https://github.com/Hanasoummar"
              target="_blank"
              rel="noopener noreferrer"
              className="github-cta-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.135-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>Visit GitHub Profile</span>
              <span className="github-cta-arrow">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects