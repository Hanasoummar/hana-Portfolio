import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import '../styles/project-detail.css'

// ─── Full Project Data ───
const projectDetails = {
  '01': {
    id: '01',
    title: 'AI Ticket Similarity Assistant',
    category: 'Enterprise AI',
    date: 'Feb — Aug 2025',
    company: 'Oracle R&D Center',
    status: 'Production',
    github: null,
    demo: null,
    images: ['/assets/project-oracle.png','/assets/project-oracle-1.png','/assets/project-oracle-2.png'],
    overview: `Built an AI-powered Support Ticket Similarity Matching system at Oracle R&D Center. The system leverages advanced NLP and Deep Sentence Embeddings to automatically identify and group semantically similar customer support tickets, reducing manual triage time and improving response consistency.`,
    architecture: [
      'Ticket Input → Preprocessing',
      'Sentence Embeddings (all-MiniLM-L6-v2)',
      'ChromaDB Vector Store (cosine similarity)',
      'Top-K Retrieval (k=20)',
      'Cross-Encoder Reranking (ms-marco-MiniLM-L-6-v2)',
      'FastAPI Backend (async endpoints)',
      'React.js Frontend (real-time search UI)',
    ],
    features: [
      'Real-time semantic search across 10K+ tickets',
      'Cross-encoder reranking for top-5 precision',
      'Batch processing for historical backfill',
      'RESTful API with sub-200ms latency',
      'Dockerized deployment on Oracle Cloud',
    ],
    stack: ['Python', 'FastAPI', 'Sentence Transformers', 'ChromaDB', 'Cross-Encoder', 'React.js', 'Docker', 'OCI'],
    results: [
      { label: 'Tickets Processed', value: '10,000+' },
      { label: 'Search Latency', value: '<200ms' },
      { label: 'Accuracy', value: '94%' },
      { label: 'Triage Time Reduction', value: '60%' },
    ],
  },
  '02': {
    id: '02',
    title: 'HR Analytics Dashboard',
    category: 'Data & BI',
    date: '2025',
    company: 'Personal Project',
    status: 'Open Source',
    github: 'https://github.com/Hanasoummar/Hr_Analytics_Dashboard',
    demo: null,
    images: ['/assets/project-hr.png','/assets/project-hr-1.png','/assets/project-hr-2.png'],
    overview: `End-to-end HR analytics solution built from scratch. Generated a synthetic dataset of 8,950 employees using Python and Faker, then designed a two-view Tableau dashboard for leadership and HR operations. Uncovered retention patterns, pay gaps, and workforce distribution insights that would guide strategic HR decisions.`,
    architecture: [
      'Python + Faker → Synthetic Dataset (8,950 rows)',
      'Data Cleaning & Validation (Pandas)',
      'Tableau Prep → Data Import',
      'Two-View Dashboard Design',
      'Leadership View (KPIs, trends)',
      'HR Ops View (drill-down, filters)',
    ],
    features: [
      'Synthetic data generation with realistic distributions',
      'Retention rate analysis by department & tenure',
      'Gender pay gap visualization',
      'Workforce distribution across locations',
      'Interactive filters for dynamic exploration',
    ],
    stack: ['Python', 'Faker', 'Pandas', 'Tableau', 'Tableau Prep', 'CSV'],
    results: [
      { label: 'Synthetic Employees', value: '8,950' },
      { label: 'Dashboard Views', value: '2' },
      { label: 'Retention Rate', value: '88.8%' },
      { label: 'Pay Gap Surfaced', value: '~16%' },
    ],
  },
  '03': {
    id: '03',
    title: 'DarijaBERT LoRA Fine-Tuning',
    category: 'NLP Research',
    date: '2025',
    company: 'Research Project',
    status: 'Open Source',
    github: 'https://github.com/Hanasoummar/DarijaBert_Finetuning',
    demo: null,
    images: ['/assets/project-darija.png','/assets/project-darija-1.png','/assets/project-darija-2.png','/assets/project-darija-3.png','/assets/project-darija-4.png'],
    overview: `Fine-tuned SI2M-Lab/DarijaBERT using LoRA (PEFT) for efficient 10-class text classification of low-resource Moroccan dialectal Arabic (Darija). Built a complete production-ready pipeline with FastAPI backend and React frontend, achieving 82.7% accuracy on a 447-example dataset across 10 categories: Actualités, Cuisine, Culture, Divertissement, Santé, Sport, Technologie, Voyage, Économie, and Éducation.`,
    architecture: [
      'Dataset Curation (10 categories, 447 examples)',
      'Text Preprocessing & Normalization',
      'Tokenization (DarijaBERT tokenizer)',
      'LoRA Config (r=16, alpha=32, dropout=0.1)',
      'Fine-Tuning (10 epochs, lr=1e-4, batch=16)',
      'Evaluation (accuracy, F1, precision, recall)',
      'FastAPI Backend (async inference, ~128ms latency)',
      'React Frontend (live classification + batch CSV)',
    ],
    features: [
      'LoRA efficient fine-tuning (trainable params <1%)',
      '10-class domain-specific text classification',
      'Custom preprocessing for Darija text',
      'Full reproducible training pipeline',
      'Confusion matrix & training curves visualization',
      'FastAPI REST API with real-time inference',
      'React frontend with probability distribution',
      'Batch CSV classification support',
    ],
    stack: ['Python', 'PyTorch', 'HuggingFace', 'PEFT', 'LoRA', 'DarijaBERT', 'FastAPI', 'React', 'Vite', 'Jupyter'],
    results: [
      { label: 'Accuracy', value: '82.7%' },
      { label: 'F1-Score', value: '0.82' },
      { label: 'Categories', value: '10' },
      { label: 'Avg Latency', value: '~128ms' },
    ],
  },
  '04': {
    id: '04',
    title: 'FINVAULT — Banking Dashboard',
    category: 'Data & BI',
    date: '2026',
    company: 'Personal Project',
    status: 'Open Source',
    github: 'https://github.com/Hanasoummar/FINVAULT-Banking-Dashboard',
    demo: null,
    images: ['/assets/project-finvault.png','/assets/project-finvault-1.png','/assets/project-finvault-2.png','/assets/project-finvault-3.png',],
    overview: `FINVAULT is a fintech-style banking analytics dashboard integrating PostgreSQL, Python EDA, Power BI, DAX, and Power Query to deliver interactive insights into customer behavior, loans, deposits, and fee revenue. Analyzed 3,000+ clients to surface critical business findings for strategic decision-making.`,
    architecture: [
      'Raw CSV → PostgreSQL (data warehouse)',
      'Python EDA (Pandas, Matplotlib, Seaborn)',
      'SQL Queries (10+ analytical queries)',
      'Power Query Transformations',
      'DAX Measures (KPIs, calculated columns)',
      'Power BI Dashboard (multi-page)',
    ],
    features: [
      'Customer segmentation by income & behavior',
      'Loan vs deposit gap analysis',
      'Credit card cross-selling opportunities',
      'Fee revenue breakdown by product',
      'Interactive slicers for dynamic filtering',
    ],
    stack: ['Python', 'Pandas', 'PostgreSQL', 'Power BI', 'DAX', 'Power Query', 'SQL'],
    results: [
      { label: 'Clients Analyzed', value: '3,000+' },
      { label: 'Funding Gap', value: '$610M' },
      { label: 'Fee Revenue', value: '$158M' },
      { label: 'Debt Risk Correlation', value: 'r=0.37' },
    ],
  },
  '05': {
    id: '05',
    title: 'GenAI LinkedIn Post Generator',
    category: 'Generative AI',
    date: '2025',
    company: 'Personal Project',
    status: 'Open Source',
    github: 'https://github.com/Hanasoummar/Linkedin_Post_Generator_Using_Large_Language_Models',
    demo: null,
    images: ['/assets/project-linkedin.png','/assets/project-linkedin-1.png','/assets/project-linkedin-2.png'],
    overview: `Developed an LLM-powered content generation tool that analyzes a LinkedIn influencer's past posts, extracts topics and writing patterns, then generates new style-matched content on demand. Built as a two-stage pipeline with few-shot learning for precise tone matching.`,
    architecture: [
      'Stage 1: Ingest past posts → LLM analysis',
      'Extract: topic, language, length, tone, structure',
      'Stage 2: User selects topic / length / language',
      'Retrieve relevant past posts as few-shot examples',
      'Llama 3.3 via Groq API → Generate new post',
      'Streamlit UI for interactive experience',
    ],
    features: [
      'Writing style analysis from past posts',
      'Few-shot learning for tone consistency',
      'Topic & length customization',
      'Multi-language support (EN/FR/AR)',
      'One-click copy & regenerate',
    ],
    stack: ['Python', 'LangChain', 'Llama 3.3', 'Groq API', 'Streamlit', 'Few-Shot Learning'],
    results: [
      { label: 'Model', value: 'Llama 3.3' },
      { label: 'API', value: 'Groq' },
      { label: 'UI Framework', value: 'Streamlit' },
      { label: 'Pipeline Stages', value: '2' },
    ],
  },
  '06': {
    id: '06',
    title: 'Customer Shopping Behavior Analysis',
    category: 'Data & BI',
    date: '2024',
    company: 'Personal Project',
    status: 'Open Source',
    github: 'https://github.com/Hanasoummar/Customer_Shopping_Behavior',
    demo: null,
    images: ['/assets/project-shopping.png'],
    overview: `End-to-end retail analytics project analyzing customer shopping patterns. Pipeline: Python EDA → PostgreSQL → 10 SQL queries → Power BI. Uncovered subscriber rates, loyalty metrics, gender-based revenue differences, and discount dependencies to inform marketing strategy.`,
    architecture: [
      'Python EDA (Pandas, Matplotlib)',
      'Data Loading → PostgreSQL',
      '10 Analytical SQL Queries',
      'Power BI Data Model',
      'Interactive Dashboard (multi-page)',
    ],
    features: [
      'Customer segmentation by purchase behavior',
      'Subscription funnel analysis',
      'Gender-based revenue comparison',
      'Discount dependency identification',
      'Age group revenue breakdown',
    ],
    stack: ['Python', 'Pandas', 'PostgreSQL', 'SQL', 'Power BI', 'EDA'],
    results: [
      { label: 'Subscriber Rate', value: '7.3%' },
      { label: 'Loyal Customers', value: '79.9%' },
      { label: 'Male vs Female Revenue', value: '$157K vs $75K' },
      { label: 'Discount-Dependent SKUs', value: '~50%' },
    ],
  },
  '07': {
    id: '07',
    title: 'Decision Support System for HR Management',
    category: 'Data & BI',
    date: '2024',
    company: 'Academic Project',
    status: 'Private',
    github: null,
    demo: null,
    images: ['/assets/project-hr-bi.png'],
    overview: `Designed and implemented a complete end-to-end Business Intelligence solution to optimize Human Resource decision-making and operational tracking. Engineered ETL pipelines using Talend for data extraction, cleaning, and integration into a centralized SQL Server data warehouse.`,
    architecture: [
      'Multiple HR Data Sources',
      'Talend ETL (extraction, cleaning, transform)',
      'SQL Server Data Warehouse (Star Schema)',
      'Power BI Connection (DirectQuery)',
      'DAX Measures & KPIs',
      'Interactive Dashboards',
    ],
    features: [
      'Talend ETL pipeline automation',
      'Star schema dimensional modeling',
      'Power BI real-time dashboards',
      'Advanced DAX calculated measures',
      'KPI tracking for workforce metrics',
    ],
    stack: ['Talend', 'SQL Server', 'Power BI', 'DAX', 'ETL', 'Data Warehouse', 'Star Schema'],
    results: [
      { label: 'ETL Tool', value: 'Talend' },
      { label: 'Database', value: 'SQL Server' },
      { label: 'Schema', value: 'Star' },
      { label: 'Viz Platform', value: 'Power BI' },
    ],
  },
  '08': {
    id: '08',
    title: '3D Indoor Scene Segmentation',
    category: 'Computer Vision',
    date: 'Jul — Sep 2024',
    company: '3D Smart Factory',
    status: 'Internship',
    github: null,
    demo: null,
    images: ['/assets/project-3d.png'],
    overview: `Designed a 3D Indoor Scene Segmentation System using point cloud processing to automate spatial understanding of complex indoor environments. Developed deep learning models using PyTorch, applying advanced 3D semantic segmentation techniques for industrial applications.`,
    architecture: [
      '3D Point Cloud Acquisition (LiDAR/scans)',
      'Preprocessing (downsampling, normalization)',
      'PyTorch Model (PointNet++ / DGCNN)',
      'Semantic Segmentation (multi-class)',
      'W&B Experiment Tracking',
      'Open3D Visualization',
    ],
    features: [
      'Point cloud preprocessing pipeline',
      '3D semantic segmentation (PyTorch)',
      'Multi-class indoor object detection',
      'W&B hyperparameter tracking',
      'Open3D interactive visualization',
    ],
    stack: ['Python', 'PyTorch', 'Point Cloud', 'Open3D', 'W&B', 'NumPy'],
    results: [
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Viz', value: 'Open3D' },
      { label: 'Tracking', value: 'W&B' },
      { label: 'Data Type', value: 'Point Cloud' },
    ],
  },
}

// ─── Animated Counter Hook ───
function useAnimatedCounter(end, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    // Extract numeric value
    const numericMatch = end.toString().match(/[\d.]+/)
    if (!numericMatch) {
      setCount(end)
      return
    }

    const target = parseFloat(numericMatch[0])
    const prefix = end.toString().split(numericMatch[0])[0] || ''
    const suffix = end.toString().split(numericMatch[0])[1] || ''

    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = target * eased

      if (Number.isInteger(target)) {
        setCount(prefix + Math.floor(current).toLocaleString() + suffix)
      } else {
        setCount(prefix + current.toFixed(1) + suffix)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [hasStarted, end, duration])

  return { count, ref }
}

// ─── Image Gallery Component — Terminal Dots ARE Navigation ───
function ImageGallery({ images, title, projectId }) {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const touchStartX = useRef(0)

  // Reset to image 0 when project changes
  useEffect(() => {
    setCurrent(0)
  }, [projectId])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goToNext()
      else if (e.key === 'ArrowLeft') goToPrev()
    }
    if (images.length > 1) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [images.length, current])

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, images.length])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }, [isTransitioning, images.length])

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext()
      else goToPrev()
    }
  }

  const totalImages = images.length

  return (
    <div className="project-gallery-terminal">
      {/* Terminal Header — Dots ARE the image navigation */}
      <div className="project-gallery-header">
        <div className="project-gallery-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`project-gallery-dot-header ${i === current ? 'active' : ''}`}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true)
                  setCurrent(i)
                  setTimeout(() => setIsTransitioning(false), 500)
                }
              }}
              aria-label={`Image ${String(i + 1).padStart(2, '0')}`}
            >
              <span className="gallery-dot-label">{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <span className="project-gallery-title">
          hana@portfolio: ~ $ cat project_{projectId}/screenshot_{String(current + 1).padStart(2, '0')}.png
        </span>
        {totalImages > 1 && (
          <span className="project-gallery-counter">
            {String(current + 1).padStart(2, '0')}/{String(totalImages).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Image Area with hover navigation arrows */}
      <div 
        className="project-gallery-body"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {totalImages > 1 && (
          <>
            <button
              className="gallery-nav-arrow gallery-nav-prev"
              onClick={goToPrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="gallery-nav-arrow gallery-nav-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
        <img
          src={images[current]}
          alt={`${title} — image ${current + 1}`}
          className="project-gallery-img"
          style={{ 
            opacity: isTransitioning ? 0.7 : 1,
            transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
          }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="project-gallery-fallback">
          <span>📷</span>
          <span>{images[current]}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Navigation Arrows ───
function ProjectNav({ currentId }) {
  const ids = Object.keys(projectDetails).sort()
  const currentIndex = ids.indexOf(currentId)
  const prevId = currentIndex > 0 ? ids[currentIndex - 1] : null
  const nextId = currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null

  return (
    <div className="project-nav">
      {prevId ? (
        <Link to={`/projects/${prevId}`} className="project-nav-btn project-nav-prev">
          <span className="project-nav-arrow">←</span>
          <div className="project-nav-info">
            <span className="project-nav-label">Previous</span>
            <span className="project-nav-title">{projectDetails[prevId].title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      <Link to="/projects" className="project-nav-back">
        <span>~$</span> cd ../projects
      </Link>

      {nextId ? (
        <Link to={`/projects/${nextId}`} className="project-nav-btn project-nav-next">
          <div className="project-nav-info">
            <span className="project-nav-label">Next</span>
            <span className="project-nav-title">{projectDetails[nextId].title}</span>
          </div>
          <span className="project-nav-arrow">→</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

// ─── Animated Result Card ───
function ResultCard({ result, index }) {
  const { count, ref } = useAnimatedCounter(result.value, 1500 + index * 200)

  return (
    <div className="project-result-item" ref={ref}>
      <span className="project-result-value">{count}</span>
      <span className="project-result-label">{result.label}</span>
    </div>
  )
}

// ─── Main Project Detail Page ───
function ProjectDetail() {
  const { id } = useParams()
  const project = projectDetails[id]
  const pageRef = useRef(null)

  // Scroll to top on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="project-not-found">
          <h1>404: Project Not Found</h1>
          <Link to="/projects" className="project-not-found-link">
            ~$ cd /projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="project-detail-page" ref={pageRef}>
      {/* ═══════════════════════════════════════
          HERO — Title + Meta with gradient
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <div className="project-detail-hero">
          <div className="project-detail-hero-label">PROJECT {project.id}</div>
          <h1 className="project-detail-hero-title">{project.title}</h1>
          <div className="project-detail-hero-meta">
            <span className="project-detail-category">{project.category}</span>
            <span className="project-detail-date">{project.date}</span>
            {project.company && (
              <span className="project-detail-company">{project.company}</span>
            )}
            <span className={`project-detail-status project-status-${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {project.status}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          IMAGE GALLERY — Terminal with Dot Navigation
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <ImageGallery images={project.images} title={project.title} projectId={project.id} />
      </section>

      {/* ═══════════════════════════════════════
          OVERVIEW — Single clean block with accent border
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <div className="project-detail-terminal">
          <div className="project-detail-terminal-header">
            <span className="project-detail-dot dot-pink" />
            <span className="project-detail-dot dot-blue" />
            <span className="project-detail-terminal-title">hana@portfolio: ~ $ cat project_{project.id}/README.md</span>
          </div>
          <div className="project-detail-terminal-body">
            <p className="project-detail-overview">{project.overview}</p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RESULTS — Animated counters with gradient top
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <div className="project-results-bar">
          {project.results.map((result, i) => (
            <ResultCard key={i} result={result} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES + STACK (2-col)
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <div className="project-detail-grid">
          {/* Features */}
          <div className="project-detail-terminal">
            <div className="project-detail-terminal-header">
              <span className="project-detail-dot dot-pink" />
              <span className="project-detail-dot dot-blue" />
              <span className="project-detail-terminal-title">hana@portfolio: ~ $ ls features/</span>
            </div>
            <div className="project-detail-terminal-body">
              <ul className="project-features-list">
                {project.features.map((feat, i) => (
                  <li key={i} className="project-feature-item">
                    <span className="feature-bullet">▸</span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stack */}
          <div className="project-detail-terminal">
            <div className="project-detail-terminal-header">
              <span className="project-detail-dot dot-pink" />
              <span className="project-detail-dot dot-blue" />
              <span className="project-detail-terminal-title">hana@portfolio: ~ $ cat stack.json</span>
            </div>
            <div className="project-detail-terminal-body">
              <div className="project-stack-grid">
                {project.stack.map((tech, i) => (
                  <span key={i} className="project-stack-item">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ARCHITECTURE — Connected pipeline with timeline
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <div className="project-detail-terminal">
          <div className="project-detail-terminal-header">
            <span className="project-detail-dot dot-pink" />
            <span className="project-detail-dot dot-blue" />
            <span className="project-detail-terminal-title">hana@portfolio: ~ $ cat architecture.txt</span>
          </div>
          <div className="project-detail-terminal-body">
            <div className="project-architecture">
              {project.architecture.map((step, i) => (
                <div key={i} className="arch-step">
                  <span className="arch-text">{step}</span>
                </div>
              ))}
              <div className="arch-end">Output</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LINKS
          ═══════════════════════════════════════ */}
      <section className="project-detail-section">
        <div className="project-detail-links">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-link project-detail-link-github"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.135-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>View on GitHub</span>
              <span>↗</span>
            </a>
          ) : (
            <span className="project-detail-link project-detail-link-private">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
              </svg>
              <span>Private Repository</span>
            </span>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════ */}
      <ProjectNav currentId={id} />
    </div>
  )
}

export default ProjectDetail