import { useEffect, useRef } from 'react'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height
    let particles = []
    let mouse = { x: -9999, y: -9999 }
    let animationId = null

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.2
        this.speedY = (Math.random() - 0.5) * 0.2
        this.opacity = Math.random() * 0.35 + 0.1
        this.type = Math.random() < 0.5 ? 'pink' : 'blue'
        this.phase = Math.random() * Math.PI * 2
        this.driftSpeed = Math.random() * 0.006 + 0.002
      }
      update() {
        this.phase += this.driftSpeed
        this.x += this.speedX + Math.sin(this.phase) * 0.12
        this.y += this.speedY + Math.cos(this.phase * 0.7) * 0.12
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 160) {
          const force = (160 - dist) / 160 * 0.012
          this.x -= dx * force
          this.y -= dy * force
        }
        if (this.x < -50) this.x = width + 50
        if (this.x > width + 50) this.x = -50
        if (this.y < -50) this.y = height + 50
        if (this.y > height + 50) this.y = -50
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        if (this.type === 'pink') {
          ctx.fillStyle = `rgba(242, 108, 167, ${this.opacity})`
          ctx.shadowColor = 'rgba(242, 108, 167, 0.35)'
        } else {
          ctx.fillStyle = `rgba(0, 75, 127, ${this.opacity})`
          ctx.shadowColor = 'rgba(0, 75, 127, 0.3)'
        }
        ctx.shadowBlur = 14
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    function init() {
      resize()
      const particleCount = Math.min(70, (width * height) / 20000)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            const alpha = 0.03 * (1 - dist / 120)
            ctx.strokeStyle = `rgba(242, 108, 167, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      particles.forEach(p => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => resize()
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const handleTouchMove = (e) => { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    init()
    if (!prefersReducedMotion) {
      animate()
    } else {
      particles.forEach(p => p.draw())
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      particles = []
    }
  }, [])

  return <canvas id="particle-canvas" ref={canvasRef} />
}

export default ParticleCanvas
