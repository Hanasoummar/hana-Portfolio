import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/contact.css'

// ─── Typewriter hook ───
function useTypewriter(text, delay = 60, trigger = true) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!trigger) return
    setDisplayed('')
    setDone(false)
    let i = 0
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) {
        clearInterval(timer)
        setDone(true)
      }
    }, delay)
    return () => clearInterval(timer)
  }, [text, delay, trigger])

  return { displayed, done }
}

// ─── Terminal Line Component ───
function TerminalLine({ prompt, text, delay = 0, color = 'default', onComplete }) {
  const [visible, setVisible] = useState(false)
  const { displayed, done } = useTypewriter(text, 50, visible)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (done && onComplete) onComplete()
  }, [done, onComplete])

  const colorClass = {
    default: '',
    pink: 'tx-pink',
    blue: 'tx-blue',
    green: 'tx-green',
    muted: 'tx-muted',
  }[color] || ''

  return (
    <div className={`term-line ${visible ? 'term-line-visible' : ''}`}>
      {prompt && <span className="term-prompt">{prompt}</span>}
      <span className={`term-text ${colorClass}`}>{displayed}</span>
      {!done && visible && <span className="term-cursor">|</span>}
    </div>
  )
}

// ─── Contact Card (3D tilt) ───
function ContactCard({ icon, label, value, href, delay }) {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rx = (y - cy) / 10
    const ry = (cx - x) / 10
    setTransform(`perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)')
  }

  const content = (
    <div
      ref={cardRef}
      className="contact-card"
      style={{ transform, transition: 'transform 0.15s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="contact-card-glow" />
      <div className="contact-card-icon">{icon}</div>
      <div className="contact-card-info">
        <div className="contact-card-label">{label}</div>
        <div className="contact-card-value">{value}</div>
      </div>
      <div className="contact-card-arrow">→</div>
    </div>
  )

  return (
    <div className="contact-card-wrapper" style={{ animationDelay: `${delay}ms` }}>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="contact-card-link">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  )
}

// ─── Main Contact Page ───
function Contact() {
  const [bootComplete, setBootComplete] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')
  const [terminalLines, setTerminalLines] = useState([])
  const terminalRef = useRef(null)

  const bootLines = [
    { prompt: '$', text: 'ssh hana@portfolio.dev', color: 'green', delay: 200 },
    { prompt: '', text: 'Connecting to portfolio.dev...', color: 'muted', delay: 800 },
    { prompt: '', text: 'Connection established.', color: 'green', delay: 1400 },
    { prompt: '', text: 'Authenticating...', color: 'muted', delay: 1800 },
    { prompt: '', text: 'Access granted. Welcome, visitor.', color: 'blue', delay: 2400 },
    { prompt: '', text: '', color: 'default', delay: 3000 },
    { prompt: 'hana@portfolio:~$', text: ' cat contact.md', color: 'pink', delay: 3200 },
  ]

  useEffect(() => {
    const lastLine = bootLines[bootLines.length - 1]
    const totalTime = lastLine.delay + lastLine.text.length * 50 + 500
    const timer = setTimeout(() => setBootComplete(true), totalTime)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (bootComplete) {
      const t = setTimeout(() => setFormVisible(true), 400)
      return () => clearTimeout(t)
    }
  }, [bootComplete])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalLines, formStatus])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send')
      }

      setFormStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTerminalLines((prev) => [
        ...prev,
        { prompt: 'hana@portfolio:~$', text: ` echo "Message from ${formData.name}" > inbox/new.msg`, color: 'green' },
        { prompt: '', text: '[SUCCESS] Message delivered to inbox.', color: 'green' },
      ])
    } catch (err) {
      console.error('Form error:', err)
      setFormStatus('error')
      setTerminalLines((prev) => [
        ...prev,
        { prompt: '', text: '[ERROR] Server unreachable. Fallback to email client.', color: 'pink' },
      ])
      const mailto = `mailto:soummarhana@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} <${formData.email}>\n\n${formData.message}`)}`
      window.location.href = mailto
    }
  }

  return (
    <div className="contact-page">
      {/* ═══════════════════════════════════════
          SECTION 1: BOOT TERMINAL
          ═══════════════════════════════════════ */}
      <section className="contact-hero">
        <div className="contact-terminal">
          <div className="contact-terminal-header">
            <div className="contact-terminal-dots">
              <span className="contact-dot dot-pink" />
              <span className="contact-dot dot-blue" />
              <span className="contact-dot dot-green" />
            </div>
            <span className="contact-terminal-title">hana@portfolio: ~ $ ssh contact</span>
          </div>
          <div className="contact-terminal-body" ref={terminalRef}>
            {bootLines.map((line, i) => (
              <TerminalLine
                key={i}
                prompt={line.prompt}
                text={line.text}
                delay={line.delay}
                color={line.color}
              />
            ))}
            {bootComplete && (
              <>
                <div className="term-line term-line-visible">
                  <span className="term-prompt">hana@portfolio:~$</span>
                  <span className="term-text tx-pink"> cat contact.md</span>
                </div>
                <div className="term-line term-line-visible term-md">
                  <span className="term-text">
                    # Let's Connect<br />
                    Whether you have a project idea, a collaboration opportunity,<br />
                    or just want to talk AI — my inbox is always open.
                  </span>
                </div>
              </>
            )}
            {terminalLines.map((line, i) => (
              <TerminalLine
                key={`out-${i}`}
                prompt={line.prompt}
                text={line.text}
                delay={0}
                color={line.color}
              />
            ))}
            {formStatus === 'sending' && (
              <div className="term-line term-line-visible">
                <span className="term-prompt">$</span>
                <span className="term-text tx-muted">Transmitting packet to server...</span>
                <span className="term-spinner" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: CARDS + FORM — SIDE BY SIDE
          ═══════════════════════════════════════ */}
      <section className={`contact-split ${formVisible ? 'contact-split-visible' : ''}`}>
        {/* LEFT COLUMN: Cards stacked vertically */}
        <div className="contact-split-left">
          <h3 className="contact-split-title">
            <span className="contact-split-prompt">$</span> ls connections/
          </h3>
          <div className="contact-cards-col">
            <ContactCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              }
              label="Email"
              value="soummarhana@gmail.com"
              href="mailto:soummarhana@gmail.com"
              delay={0}
            />
            <ContactCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              }
              label="LinkedIn"
              value="linkedin.com/in/hanasoummar"
              href="https://linkedin.com/in/hanasoummar"
              delay={80}
            />
            <ContactCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              }
              label="GitHub"
              value="github.com/Hanasoummar"
              href="https://github.com/Hanasoummar"
              delay={160}
            />
            <ContactCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              }
              label="Location"
              value="Agadir, Morocco"
              delay={240}
            />
            <ContactCard
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              }
              label="Phone"
              value="+212 630 474 703"
              href="tel:+212630474703"
              delay={320}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Form */}
        <div className="contact-split-right">
          <div className="contact-form-terminal">
            <div className="contact-form-header">
              <div className="contact-form-dots">
                <span className="contact-form-dot dot-pink" />
                <span className="contact-form-dot dot-blue" />
              </div>
              <span className="contact-form-title">hana@portfolio: ~ $ nano message.txt</span>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="form-label">
                  <span className="form-prompt">$</span> name=
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="your_name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="form-prompt">$</span> email=
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="form-prompt">$</span> subject=
                </label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group form-group-textarea">
                <label className="form-label">
                  <span className="form-prompt">$</span> message=
                </label>
                <textarea
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Type your message here..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="form-submit"
                  disabled={formStatus === 'sending' || formStatus === 'sent'}
                >
                  {formStatus === 'idle' && (
                    <>
                      <span className="form-submit-prompt">$</span>
                      <span>./send_message.sh</span>
                    </>
                  )}
                  {formStatus === 'sending' && (
                    <>
                      <span className="form-spinner" />
                      <span>Sending...</span>
                    </>
                  )}
                  {formStatus === 'sent' && (
                    <>
                      <span>✓</span>
                      <span>Message Sent!</span>
                    </>
                  )}
                  {formStatus === 'error' && (
                    <>
                      <span>⚠</span>
                      <span>Retry</span>
                    </>
                  )}
                </button>

                <Link to="/cv-hana-soummar.pdf" className="form-download" target="_blank" download>
                  <span>📄</span>
                  <span>Download CV</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3: AVAILABILITY
          ═══════════════════════════════════════ */}
      <section className={`contact-availability ${formVisible ? 'contact-availability-visible' : ''}`}>
        <div className="avail-box">
          <div className="avail-status">
            <span className="avail-dot-green" />
            <span className="avail-status-text">Available for work</span>
          </div>

          <div className="avail-types">
            <div className="avail-type">
              <span className="avail-check">✓</span>
              <span>Full-time positions</span>
            </div>
            <div className="avail-type">
              <span className="avail-check">✓</span>
              <span>Freelance projects</span>
            </div>
            <div className="avail-type">
              <span className="avail-check">✓</span>
              <span>Research collaborations</span>
            </div>
          </div>

          <div className="avail-info">
            <p>📍Agadir, Morocco — also open to remote & relocation</p>
            <p>🗣 English, French, Tamazight, Arabic</p>
            <p>⏱ Usually responds within a few hours</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact