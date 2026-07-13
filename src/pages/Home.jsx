import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import useScrollReveal from '../hooks/useScrollReveal'

function Home() {
  const videoRef = useRef(null)
  const soundBadgeRef = useRef(null)
  const playPauseBtnRef = useRef(null)
  const muteBtnRef = useRef(null)
  const fallbackRef = useRef(null)
  const [currentProject, setCurrentProject] = useState(0)
  const timelineReveal = useScrollReveal()

  const projects = [
    {
      number: '01',
      title: 'AI Ticket Similarity Assistant',
      tags: ['NLP', 'RAG', 'FastAPI', 'ChromaDB'],
      desc: 'Enterprise semantic search system built at Oracle R&D. Automated support ticket grouping using sentence embeddings, ChromaDB vector search, and cross-encoder reranking — deployed with FastAPI and React.js.',
      stats: ['🏢 Oracle R&D', '⚡ Production'],
      image: '/assets/project-oracle.png',
      github: null,
      demo: null
    },
    {
      number: '02',
      title: 'HR Analytics Dashboard',
      tags: ['Tableau', 'Python', 'Faker', 'BI'],
      desc: 'End-to-end HR analytics solution built from scratch: generated a synthetic dataset of 8,950 employees using Python and Faker, then designed a two-view Tableau dashboard for leadership and HR ops — uncovering retention patterns, pay gaps, and workforce distribution.',
      stats: ['👥 8,950 employees', '📊 Tableau'],
      image: '/assets/project-hr.png',
      github: 'https://github.com/Hanasoummar/Hr_Analytics_Dashboard',
      demo: null
    },
    {
      number: '03',
      title: 'DarijaBERT LoRA Fine-Tuning',
      tags: ['LLM', 'LoRA', 'HuggingFace', 'NLP'],
      desc: 'Fine-tuned SI2M-Lab/DarijaBERT using LoRA (PEFT) for efficient domain-specific classification of low-resource Moroccan dialectal Arabic. Full pipeline: dataset → preprocessing → tokenization → fine-tuning → evaluation → visualization.',
      stats: ['🎯 79.67% Accuracy', '🔬 Research-grade'],
      image: '/assets/project-darija.png',
      github: 'https://github.com/Hanasoummar/DarijaBert_Finetuning',
      demo: null
    }
  ]

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    const video = videoRef.current
    const fallback = fallbackRef.current
    const playPauseBtn = playPauseBtnRef.current
    const muteBtn = muteBtnRef.current
    const soundBadge = soundBadgeRef.current

    if (!video) return

    const handleError = () => {
      video.style.display = 'none'
      if (fallback) fallback.style.display = 'flex'
    }
    video.addEventListener('error', handleError)

    const unmute = () => {
      video.muted = false
      if (muteBtn) {
        muteBtn.textContent = '🔊'
        muteBtn.setAttribute('aria-label', 'Mute video')
      }
      if (soundBadge) soundBadge.classList.add('hidden')
    }

    const mute = () => {
      video.muted = true
      if (muteBtn) {
        muteBtn.textContent = '🔇'
        muteBtn.setAttribute('aria-label', 'Unmute video')
      }
    }

    const handlePlayPause = () => {
      if (video.paused) {
        video.play()
        if (playPauseBtn) {
          playPauseBtn.textContent = '⏸'
          playPauseBtn.setAttribute('aria-label', 'Pause video')
        }
      } else {
        video.pause()
        if (playPauseBtn) {
          playPauseBtn.textContent = '▶'
          playPauseBtn.setAttribute('aria-label', 'Play video')
        }
      }
    }

    const handleMuteToggle = () => {
      video.muted ? unmute() : mute()
    }

    const handleSoundBadge = () => {
      unmute()
    }

    if (playPauseBtn) playPauseBtn.addEventListener('click', handlePlayPause)
    if (muteBtn) muteBtn.addEventListener('click', handleMuteToggle)
    if (soundBadge) soundBadge.addEventListener('click', handleSoundBadge)

    return () => {
      video.removeEventListener('error', handleError)
      if (playPauseBtn) playPauseBtn.removeEventListener('click', handlePlayPause)
      if (muteBtn) muteBtn.removeEventListener('click', handleMuteToggle)
      if (soundBadge) soundBadge.removeEventListener('click', handleSoundBadge)
    }
  }, [])

  const project = projects[currentProject]

  return (
     <>
    <div className="main-content">
      {/* ═══════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════ */}
      <section className="hero">
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot dot-pink-1" />
            <div className="terminal-dot dot-pink-2" />
            <div className="terminal-dot dot-blue" />
            <span className="terminal-title">hana@portfolio: ~ $ whoami</span>
          </div>

          <div className="terminal-body">
            <div className="video-bg">
              <video
                ref={videoRef}
                className="avatar-video"
                src="/video/intro.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="video-fallback" ref={fallbackRef}>
                <div className="icon">🎬</div>
                <div className="msg">video/intro.mp4</div>
              </div>
            </div>

            <div className="gradient-overlay" />

            <button className="sound-badge" ref={soundBadgeRef} type="button">
              🔊 Tap for sound
            </button>

            <div className="identity-content">
              <div className="tagline">Data Scientist & AI Engineer</div>
              <h1 className="name">
                <span className="first">Hana</span>
                <span className="last">Soummar</span>
              </h1>
              <div className="role">
                whoami<span className="cursor" />
              </div>

              <div className="availability-badge">
                <span className="pulse-dot" />
                <span>Available for opportunities</span>
              </div>

              <p className="description">
                I don't just analyze data. I find the{' '}
                <span className="highlight">story inside it</span>
                {' '}and engineer the{' '}
                <span className="highlight">systems that act on it</span>.
                From <span className="accent">raw CSV to deployed AI</span> — building{' '}
                <span className="impact">intelligence that makes a difference</span>.
              </p>

              <div className="cta-group">
                <Link to="/projects" className="cta-primary">
                  <span>[{'>'}_]</span> Explore My Work
                </Link>
                <Link to="/contact" className="cta-secondary">
                  <span>✉</span> Get in Touch
                </Link>
              </div>

              <div className="social-links">
                <a
                  href="https://github.com/Hanasoummar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.135-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/hanasoummar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="mailto:soummarhana@gmail.com"
                  className="social-btn"
                  aria-label="Email"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="video-controls">
              <button
                className="control-btn"
                ref={playPauseBtnRef}
                type="button"
                aria-label="Pause video"
              >
                ⏸
              </button>
              <button
                className="control-btn"
                ref={muteBtnRef}
                type="button"
                aria-label="Unmute video"
              >
                🔇
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT SECTION
          ═══════════════════════════════════════ */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-left">
            <div className="about-label">ABOUT ME</div>
            <h2 className="about-heading">
              Data<br />
              Intelligence<br />
              <span className="about-accent">Impact</span>
            </h2>
            <div className="about-divider" />
          </div>
          <div className="about-right">
            <p className="about-text">
              I'm <strong>Hana Soummar</strong>, a <strong>Data Scientist</strong> and <strong>AI Engineer</strong> with an M.Sc. in <strong>Information Systems & Intelligent Systems</strong> from <strong>INSEA Morocco</strong>, dedicated to building <strong>intelligent systems</strong> that solve meaningful problems. I thrive at the intersection of <strong>artificial intelligence</strong>, <strong>data</strong>, and <strong>engineering</strong>, where data becomes intelligence and innovation becomes impact.
            </p>
            <p className="about-text">
              Passionate about <strong>continuous learning</strong> and <strong>creative problem-solving</strong>, I enjoy transforming <strong>complexity into clarity</strong> and designing technology that empowers people and organizations. My mission is simple: to build AI that is not only <strong>intelligent</strong>, but <strong>useful</strong>, <strong>scalable</strong>, and <strong>human-centered</strong>.
            </p>
            <p className="about-text">
              Fueled by <strong>curiosity</strong>, driven by <strong>purpose</strong>, and constantly exploring the next frontier of <strong>artificial intelligence</strong>.
            </p>
            <Link to="/about" className="about-link">
              <span className="about-link-icon">~$</span>
              Read full story
              <span className="about-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
            {/* ═══════════════════════════════════════
          FEATURED PROJECTS — 
          ═══════════════════════════════════════ */}
      <section className="projects-section">
        <div className="projects-header">
          <div className="projects-header-left">
            <div className="projects-label">FEATURED PROJECTS</div>
            <h2 className="projects-heading">
              Selected<br />
              <span className="projects-accent">Work</span>
            </h2>
          </div>
          <Link to="/projects" className="projects-view-all-top">
            <span className="projects-view-icon">~$</span>
            View all projects
            <span className="projects-view-arrow">→</span>
          </Link>
        </div>

        <div className="project-carousel">
          <div className="project-terminal">
            <div className="project-terminal-header">
              <div className="project-header-dots">
                {projects.map((p, i) => (
                  <button
                    key={i}
                    className={`project-header-dot ${i === currentProject ? 'active' : ''}`}
                    onClick={() => setCurrentProject(i)}
                    aria-label={`Go to project ${p.number}`}
                  >
                    <span className="project-dot-label">{p.number}</span>
                  </button>
                ))}
              </div>
              <span className="project-terminal-title">hana@portfolio: ~ $ cat project_{project.number}.md</span>
            </div>

            {/* Body with image as background */}
            <div className="project-terminal-body">
              {/* Background image on right */}
              <div className="project-bg-image">
                <img 
                  key={project.number}
                  src={project.image} 
                  alt={project.title}
                  className="project-bg-img"
                />
              </div>

              {/* Gradient overlay (dark on left, transparent on right) */}
              <div className="project-gradient-overlay" />

              {/* Text content on left */}
              <div className="project-info-area">
                <div className="project-info-header">
                  <span className="project-info-number">{project.number}</span>
                  <h3 className="project-info-title">{project.title}</h3>
                </div>
                <div className="project-info-tags">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="project-info-tag">{tag}</span>
                  ))}
                </div>
                <p className="project-info-desc">{project.desc}</p>
                <div className="project-info-stats">
                  {project.stats.map((stat, i) => (
                    <span key={i} className="project-info-stat">{stat}</span>
                  ))}
                </div>
                <div className="project-info-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link project-link-github"
                      aria-label="View on GitHub"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.135-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.255 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>View Code</span>
                    </a>
                  )}
                  {!project.github && (
                    <span className="project-link project-link-private">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                      <span>Private Repo</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
            {/* ═══════════════════════════════════════
          SKILLS SECTION — Categorized
          ═══════════════════════════════════════ */}
      <section className="home-skills-section">
        <div className="home-skills-header">
          <div className="home-skills-header-left">
            <div className="home-skills-label">TECH STACK</div>
            <h2 className="home-skills-heading">
              Core<br />
              <span className="home-skills-accent">Skills</span>
            </h2>
          </div>
          <Link to="/skills" className="home-skills-view-all">
            <span className="home-skills-view-icon">~$</span>
            See all skills
            <span className="home-skills-view-arrow">→</span>
          </Link>
        </div>

        <div className="home-skills-terminal">
          <div className="home-skills-terminal-header">
            <div className="home-skills-terminal-dot dot-pink" />
            <div className="home-skills-terminal-dot dot-blue" />
            <span className="home-skills-terminal-title">hana@portfolio: ~ $ ls skills/</span>
          </div>
          <div className="home-skills-terminal-body">
            <div className="home-skills-categories">
              {/* Machine Learning & AI */}
              <div className="home-skill-category">
                <div className="home-skill-cat-header">
                  <svg className="home-skill-cat-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="home-skill-cat-name">Machine Learning & AI</span>
                </div>
                <div className="home-skill-items">
                  <span className="home-skill-item">PyTorch</span>
                  <span className="home-skill-item">TensorFlow</span>
                  <span className="home-skill-item">Scikit-learn</span>
                </div>
              </div>

              {/* NLP & LLMs */}
              <div className="home-skill-category">
                <div className="home-skill-cat-header">
                  <svg className="home-skill-cat-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                  </svg>
                  <span className="home-skill-cat-name">NLP & LLMs</span>
                </div>
                <div className="home-skill-items">
                  <span className="home-skill-item">HuggingFace</span>
                  <span className="home-skill-item">Transformers</span>
                  <span className="home-skill-item">LangChain</span>
                   <span className="home-skill-item">Fine-Tuning</span>
                 <span className="home-skill-item">RAG</span>
                  <span className="home-skill-item">Vector DB</span>
                </div>
              </div>

              {/* Data Science & Analytics */}
              <div className="home-skill-category">
                <div className="home-skill-cat-header">
                  <svg className="home-skill-cat-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                  <span className="home-skill-cat-name">Data Science & Analytics</span>
                </div>
                <div className="home-skill-items">
                  <span className="home-skill-item">Pandas</span>
                  <span className="home-skill-item">NumPy</span>
                  <span className="home-skill-item">EDA</span>
                  <span className="home-skill-item">Power BI</span>
                  <span className="home-skill-item">Tableau</span>
                </div>
              </div>

              {/* Programming Languages */}
              <div className="home-skill-category">
                <div className="home-skill-cat-header">
                  <svg className="home-skill-cat-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                  </svg>
                  <span className="home-skill-cat-name">Programming Languages</span>
                </div>
                <div className="home-skill-items">
                  <span className="home-skill-item">Python</span>
                  <span className="home-skill-item">SQL</span>
                  <span className="home-skill-item">R</span>
                  <span className="home-skill-item">Java</span>
                  <span className="home-skill-item">C</span>
                </div>
              </div>

              {/* Backend & APIs */}
              <div className="home-skill-category">
                <div className="home-skill-cat-header">
                  <svg className="home-skill-cat-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                  <span className="home-skill-cat-name">Backend & APIs</span>
                </div>
                <div className="home-skill-items">
                  <span className="home-skill-item">FastAPI</span>
                  <span className="home-skill-item">REST APIs</span>
                  <span className="home-skill-item">Docker</span>
                  <span className="home-skill-item">Git</span>
                  <span className="home-skill-item">OCI</span>
                  <span className="home-skill-item">Airflow</span>
                  <span className="home-skill-item">Talend</span>
                </div>
              </div>

              {/* Databases */}
              <div className="home-skill-category">
                <div className="home-skill-cat-header">
                  <svg className="home-skill-cat-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                  <span className="home-skill-cat-name">Databases</span>
                </div>
                <div className="home-skill-items">
                  <span className="home-skill-item">PostgreSQL</span>
                  <span className="home-skill-item">Oracle</span>
                  <span className="home-skill-item">MongoDB</span>
                  <span className="home-skill-item">ChromaDB</span>
                  <span className="home-skill-item">SQL Server</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
            {/* ═══════════════════════════════════════
          EXPERIENCE — Interactive Timeline 
          ══════════════════════════════════════ */}
      <section  className={`timeline-section ${timelineReveal.isVisible ? 'revealed' : ''}`}
        ref={timelineReveal.ref} >
        <div className="timeline-header">
          <div className="timeline-header-left">
            <div className="timeline-label">MY JOURNEY</div>
            <h2 className="timeline-heading">
              Experience &<br />
              <span className="timeline-accent">Education</span>
            </h2>
          </div>
        </div>

        <div className="timeline-terminal">
          <div className="timeline-terminal-header">
            <div className="timeline-terminal-dot dot-pink" />
            <div className="timeline-terminal-dot dot-blue" />
            <span className="timeline-terminal-title">hana@portfolio: ~ $ cat journey.log --reverse</span>
          </div>
          <div className="timeline-terminal-body">
            <div className="timeline">
              {/* Center line */}
              <div className="timeline-line" />

              {/* 1. Oracle R&D — RIGHT */}
              <div className="timeline-item timeline-right timeline-highlight">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">Feb — Aug 2025</div>
                  <h3 className="timeline-title">AI Research Assistant</h3>
                  <p className="timeline-place">Oracle R&D Center</p>
                  <p className="timeline-desc">AI Ticket Similarity Matching — NLP, sentence embeddings, ChromaDB vector search, cross-encoder reranking, FastAPI, React.js.</p>
                  <span className="timeline-badge timeline-badge-highlight">Latest</span>
                </div>
              </div>

              {/* 2. 3D Smart Factory — LEFT */}
              <div className="timeline-item timeline-left timeline-internship">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">Jul — Sep 2024</div>
                  <h3 className="timeline-title">AI Intern</h3>
                  <p className="timeline-place">3D Smart Factory</p>
                  <p className="timeline-desc">3D Indoor Scene Segmentation using PyTorch, point cloud processing, W&B, Open3D.</p>
                </div>
              </div>

              {/* 3. Vala Orange — RIGHT */}
              <div className="timeline-item timeline-right timeline-internship">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">Apr — Jun 2023</div>
                  <h3 className="timeline-title">Web Development Intern</h3>
                  <p className="timeline-place">Vala Orange</p>
                  <p className="timeline-desc">Full-stack HR Management system using Laravel with interactive dashboards.</p>
                </div>
              </div>

              {/* 4. Master M2SI — LEFT */}
              <div className="timeline-item timeline-left">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">2023 — 2025</div>
                  <h3 className="timeline-title">Master — Information Systems & Intelligent Systems</h3>
                  <p className="timeline-place">INSEA Rabat</p>
                  <p className="timeline-desc">Advanced AI, Machine Learning, Data Engineering, Business Intelligence.</p>
                </div>
              </div>

              {/* 5. Licence LST — RIGHT */}
              <div className="timeline-item timeline-right">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">2022 — 2023</div>
                  <h3 className="timeline-title">Bachelor — Computer Science Engineering</h3>
                  <p className="timeline-place">FST Settat</p>
                  <span className="timeline-badge">Valedictorian</span>
                  <span className="timeline-badge">Honors</span>
                </div>
              </div>

              {/* 6. DEUST MIP — LEFT */}
              <div className="timeline-item timeline-left">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">2020 — 2022</div>
                  <h3 className="timeline-title">Undergraduate — Mathematics, Computer Science, Physics</h3>
                  <p className="timeline-place">FST Settat</p>
                  <span className="timeline-badge">Valedictorian</span>
                  <span className="timeline-badge">Honors</span>
                </div>
              </div>

              {/* 7. Baccalauréat — RIGHT (last) */}
              <div className="timeline-item timeline-right">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-date">2020</div>
                  <h3 className="timeline-title">High School Diploma — Mathematical Sciences</h3>
                  <p className="timeline-place">Lycée Houmman El Fetouaki-Inezgane</p>
                  <span className="timeline-badge">Honors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                {/* ═══════════════════════════════════════
          CONTACT CTA — Terminal Style
          ═══════════════════════════════════════ */}
      <section className="contact-section">
        <div className="contact-header">
          <div className="contact-header-left">
            <div className="contact-label">GET IN TOUCH</div>
            <h2 className="contact-heading">
              Let's<br />
              <span className="contact-accent">Connect</span>
            </h2>
          </div>
        </div>

        <div className="contact-terminal">
          <div className="contact-terminal-header">
            <div className="contact-terminal-dot dot-pink" />
            <div className="contact-terminal-dot dot-blue" />
            <span className="contact-terminal-title">hana@portfolio: ~ $ ./contact.sh</span>
          </div>
          <div className="contact-terminal-body">
            <div className="contact-command">
              <span className="contact-prompt">$</span>
              <span className="contact-cmd">echo</span>
              <span className="contact-string">"From research to reality: building impactful AI solutions"</span>
            </div>
            <p className="contact-output">
              Always open to meaningful collaborations, innovative ideas, and ambitious AI projects.
            </p>
            <div className="contact-actions">
              <Link to="/contact" className="contact-action-btn contact-action-primary">
                <span className="contact-action-icon">[&gt;_]</span> 
                <span className="contact-action-text">Start a conversation</span>
                <span className="contact-action-arrow">→</span>
              </Link>
              <a href="/Resume_HANA_SOUMMAR.pdf" className="contact-action-btn contact-action-secondary" download>
                <span className="contact-action-icon">📄</span>
                <span className="contact-action-text">Download CV</span>
                <span className="contact-action-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>


    </div>


    <button 
      className="back-to-top" 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  </>

)
}

export default Home