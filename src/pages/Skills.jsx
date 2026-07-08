import { useState, useEffect, useRef } from 'react'
import '../styles/skills.css'

// ─── Skill Bar Component ───
function SkillBar({ name, level, delay }) {
  const [width, setWidth] = useState(0)
  const barRef = useRef(null)
  const [visible, setVisible] = useState(false)

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
    if (barRef.current) observer.observe(barRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setWidth(level), delay)
      return () => clearTimeout(timer)
    }
  }, [visible, level, delay])

  const getLevelLabel = (l) => {
    if (l >= 85) return 'Core'
    if (l >= 70) return 'Advanced'
    if (l >= 55) return 'Intermediate'
    return 'Learning'
  }

  const getLevelColor = (l) => {
    if (l >= 85) return 'var(--pink)'
    if (l >= 70) return 'var(--role-blue)'
    if (l >= 55) return '#a855f7'
    return 'var(--text-muted)'
  }

  return (
    <div className="skill-bar" ref={barRef}>
      <div className="skill-bar-header">
        <span className="skill-name">{name}</span>
        <span className="skill-level-label" style={{ color: getLevelColor(level) }}>
          {getLevelLabel(level)}
        </span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${getLevelColor(level)}, var(--blue))`,
            transition: `width 1s ease ${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

// ─── Category Card ───
function SkillCategory({ title, icon, skills, delay }) {
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
      { threshold: 0.05 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`skill-category ${visible ? 'skill-category-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="skill-category-header">
        <span className="skill-category-icon">{icon}</span>
        <h3 className="skill-category-title">{title}</h3>
      </div>
      <div className="skill-category-body">
        {skills.map(([name, level], i) => (
          <SkillBar key={name} name={name} level={level} delay={i * 80} />
        ))}
      </div>
    </div>
  )
}

// ─── Language Card ───
function LanguageCard({ name, level, percent, delay }) {
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

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
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setWidth(percent), delay)
      return () => clearTimeout(timer)
    }
  }, [visible, percent, delay])

  return (
    <div ref={ref} className={`lang-card ${visible ? 'lang-card-visible' : ''}`}>
      <div className="lang-info">
        <span className="lang-name">{name}</span>
        <span className="lang-level">{level}</span>
      </div>
      <div className="lang-bar-track">
        <div
          className="lang-bar-fill"
          style={{ width: `${width}%`, transition: `width 1.2s ease ${delay}ms` }}
        />
      </div>
    </div>
  )
}

// ─── Skills Data — Tier-Based Proficiency ───
// 🟢 Core → confident, interview-ready (85-100)
// 🔵 Advanced → solid practical experience (70-84)
// 🟡 Intermediate → used them, still growing (55-69)
// ⚪ Learning → exploring or academic exposure (0-54)

const skillCategories = [
  {
    title: 'Programming & Query',
    icon: '💻',
    skills: [
      ['Python', 92],
      ['SQL', 90],
      ['R', 75],
      ['Bash / Linux', 62],
      ['Java', 58],
      ['C', 48],
    ],
  },
  {
    title: 'Data Analysis & Statistics',
    icon: '📊',
    skills: [
      ['Pandas / NumPy', 90],
      ['Exploratory Data Analysis', 88],
      ['Data Cleaning & Wrangling', 86],
      ['Statistical Analysis', 78],
      ['Regression Analysis', 75],
      ['MCA / PCA', 72],
      ['Hypothesis Testing', 65],
    ],
  },
  {
    title: 'Machine Learning',
    icon: '🤖',
    skills: [
      ['Scikit-learn', 86],
      ['Supervised Learning', 84],
      ['Model Evaluation', 82],
      ['Cross Validation', 78],
      ['Hyperparameter Tuning', 74],
      ['Unsupervised Learning', 65],
    ],
  },
  {
    title: 'Deep Learning',
    icon: '🧠',
    skills: [
      ['PyTorch', 88],
      ['TensorFlow / Keras', 75],
      ['CNNs', 68],
      ['Transfer Learning', 72],
      ['Computer Vision', 62],
    ],
  },
  {
    title: 'NLP & Generative AI',
    icon: '💬',
    skills: [
      ['HuggingFace Transformers', 90],
      ['RAG', 86],
      ['Sentence Transformers', 86],
      ['LangChain', 78],
      ['Fine-Tuning (LoRA / PEFT)', 76],
      ['Prompt Engineering', 82],
      ['Vector DB (ChromaDB)', 80],
      ['Generative AI', 78],
    ],
  },
  {
    title: 'Data Visualization & BI',
    icon: '📈',
    skills: [
      ['Power BI (DAX)', 86],
      ['Matplotlib / Seaborn', 80],
      ['Dashboard Design', 82],
      ['KPI Analysis', 80],
      ['Tableau', 68],
      ['Data Storytelling', 76],
      ['Excel Advanced', 74],
      ['Power Query', 68],
    ],
  },
  {
    title: 'Databases & Cloud',
    icon: '🗄️',
    skills: [
      ['PostgreSQL', 82],
      ['SQL Server', 76],
      ['Oracle / PL-SQL', 74],
      ['MongoDB', 60],
      ['Data Modeling (Star Schema)', 75],
      ['OCI (Oracle Cloud)', 62],
    ],
  },
  {
    title: 'ETL & Data Engineering',
    icon: '⚙️',
    skills: [
      ['ETL Pipelines', 72],
      ['Talend', 74],
      ['Apache Airflow', 62],
      ['SQLAlchemy', 60],
      ['Apache Spark / PySpark', 55],
    ],
  },
  {
    title: 'Dev Tools & Deployment',
    icon: '🚀',
    skills: [
      ['Git / GitHub', 88],
      ['FastAPI', 84],
      ['REST APIs', 78],
      ['Streamlit', 76],
      ['Jupyter', 72],
      ['Docker', 65],
      ['Flask', 58],
    ],
  },
  {
    title: 'Web Scraping',
    icon: '🕸️',
    skills: [
      ['Selenium', 65],
      ['BeautifulSoup', 68],
    ],
  },
  
  {
    title: 'Soft Skills',
    icon: '🌟',
    skills: [
      ['Problem Solving', 92],
      ['Analytical Thinking', 90],
      ['Communication', 84],
      ['Adaptability', 88],
      ['Team Collaboration', 82],
      ['Attention to Detail', 86],
    ],
  },
]

const languages = [
  { name: 'Arabic', level: 'Native', percent: 100 },
  { name: 'Tamazight', level: 'Native', percent: 100 },
  { name: 'French', level: 'Fluent', percent: 88 },
  { name: 'English', level: 'Professional', percent: 78 },
]

// ─── Main Skills Page ───
function Skills() {
  const [bootDone, setBootDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="skills-page">
      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="skills-hero">
        <div className="skills-hero-label">SKILLS</div>
        <h1 className="skills-hero-heading">
          My<br />
          <span className="skills-hero-accent">Tech Stack</span>
        </h1>
        <p className="skills-hero-intro">
          A growing toolkit built through hands-on projects, internships, and continuous learning.
        </p>
      </section>

      {/* ═══════════════════════════════════════
          NEOFETCH TERMINAL
          ═══════════════════════════════════════ */}
      <section className="skills-terminal">
        <div className="skills-terminal-header">
          <span className="skills-terminal-dot dot-pink" />
          <span className="skills-terminal-dot dot-blue" />
          <span className="skills-terminal-title">hana@portfolio: ~ $ neofetch</span>
        </div>
        <div className="skills-terminal-body">
          <div className="neofetch-ascii">
            <pre>{`
    ███████╗██╗  ██╗██╗██╗     ██╗      ██████╗     
    ██╔════╝██║  ██║██║██║     ██║     ██╔═══██╗    
    ███████╗███████║██║██║     ██║     ██║   ██║    
    ╚════██║██╔══██║██║██║     ██║     ██║   ██║    
    ███████║██║  ██║██║███████╗███████╗╚██████╔╝    
    ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝ ╚═════╝     
            `}</pre>
          </div>
          <div className="neofetch-info">
            <div className="neofetch-line">
              <span className="neofetch-label">OS</span>
              <span className="neofetch-value">Junior Data Scientist & AI Engineer </span>
            </div>
            <div className="neofetch-line">
              <span className="neofetch-label">Kernel</span>
              <span className="neofetch-value">M.Sc. INSEA — Intelligent Systems</span>
            </div>
            <div className="neofetch-line">
              <span className="neofetch-label">Uptime</span>
              <span className="neofetch-value">2+ years hands-on experience</span>
            </div>
            <div className="neofetch-line">
              <span className="neofetch-label">Packages</span>
              <span className="neofetch-value">60+ skills, 4 languages</span>
            </div>
            <div className="neofetch-line">
              <span className="neofetch-label">Shell</span>
              <span className="neofetch-value">Python 3.x</span>
            </div>
            <div className="neofetch-line">
              <span className="neofetch-label">WM</span>
              <span className="neofetch-value">PyTorch + HuggingFace</span>
            </div>
            <div className="neofetch-line">
              <span className="neofetch-label">Status</span>
              <span className="neofetch-value" style={{ color: '#4ade80' }}>● Learning & building daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILL CATEGORIES GRID
          ═══════════════════════════════════════ */}
      <section className={`skills-grid ${bootDone ? 'skills-grid-visible' : ''}`}>
        {skillCategories.map((cat, i) => (
          <SkillCategory
            key={cat.title}
            title={cat.title}
            icon={cat.icon}
            skills={cat.skills}
            delay={i * 100}
          />
        ))}
      </section>

      {/* ═══════════════════════════════════════
          LANGUAGES
          ═══════════════════════════════════════ */}
      <section className={`skills-languages ${bootDone ? 'skills-languages-visible' : ''}`}>
        <div className="lang-terminal">
          <div className="lang-terminal-header">
            <span className="lang-terminal-dot dot-pink" />
            <span className="lang-terminal-dot dot-blue" />
            <span className="lang-terminal-title">hana@portfolio: ~ $ locale -a</span>
          </div>
          <div className="lang-terminal-body">
            <h3 className="lang-section-title">Languages</h3>
            <div className="lang-cards">
              {languages.map((lang, i) => (
                <LanguageCard
                  key={lang.name}
                  name={lang.name}
                  level={lang.level}
                  percent={lang.percent}
                  delay={i * 200}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills