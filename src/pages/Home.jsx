// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './Pages.css'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, particles, animId
    let mouse = { x: -1000, y: -1000, down: false }
    const N = 140

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() { this.reset(true) }
      reset(initial = false) {
        this.x  = Math.random() * W
        this.y  = initial ? Math.random() * H : (Math.random() < 0.5 ? -10 : H + 10)
        this.ox = this.x; this.oy = this.y
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.r  = Math.random() * 1.8 + 0.4
        this.baseAlpha = Math.random() * 0.5 + 0.15
        this.alpha = this.baseAlpha
        this.depth = Math.random()
        this.twinkle = Math.random() * 0.02 + 0.005
        this.twinkleOff = Math.random() * Math.PI * 2
        const rv = Math.random()
        this.hue = rv < 0.5 ? 265 + Math.random()*20
                 : rv < 0.8 ? 195 + Math.random()*20
                 :             325 + Math.random()*15
        this.sat = 65 + Math.random() * 25
      }
      update(t) {
        const dx = this.x - mouse.x, dy = this.y - mouse.y
        const dist = Math.sqrt(dx*dx + dy*dy)
        const inf = mouse.down ? 220 : 130
        if (dist < inf) {
          const f = 1 - dist / inf
          const push = mouse.down ? -1.0 : 0.7
          this.vx += (dx / dist) * f * push
          this.vy += (dy / dist) * f * push
          this.alpha = Math.min(1, this.baseAlpha + f * 0.5)
        } else {
          this.vx += (this.ox - this.x) * 0.0003
          this.vy += (this.oy - this.y) * 0.0003
          this.alpha += (this.baseAlpha - this.alpha) * 0.05
        }
        const damp = 0.94 + this.depth * 0.04
        this.vx *= damp; this.vy *= damp
        const speed = (1 - this.depth * 0.5) * 0.6
        this.x += this.vx * speed; this.y += this.vy * speed
        this.alpha *= 0.85 + Math.sin(t * this.twinkle + this.twinkleOff) * 0.15
        if (this.x < -50) this.x = W + 50
        if (this.x > W+50) this.x = -50
        if (this.y < -50) this.y = H + 50
        if (this.y > H+50) this.y = -50
      }
      draw() {
        const s = this.r * (1 - this.depth * 0.45)
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, s * 5)
        g.addColorStop(0,   `hsla(${this.hue},${this.sat}%,75%,${this.alpha})`)
        g.addColorStop(0.4, `hsla(${this.hue},${this.sat}%,60%,${this.alpha * 0.3})`)
        g.addColorStop(1,   `hsla(${this.hue},${this.sat}%,50%,0)`)
        ctx.beginPath()
        ctx.fillStyle = g
        ctx.arc(this.x, this.y, s * 5, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i], pj = particles[j]
          const dx = pi.x - pj.x, dy = pi.y - pj.y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 110) {
            const a = (1 - d/110) * 0.1
            ctx.beginPath()
            ctx.strokeStyle = `hsla(${(pi.hue+pj.hue)/2},60%,70%,${a})`
            ctx.lineWidth = (1 - d/110) * 0.7
            ctx.moveTo(pi.x, pi.y)
            ctx.lineTo(pj.x, pj.y)
            ctx.stroke()
          }
        }
      }
    }

    const drawHalo = () => {
      if (mouse.x < 0) return
      const r = mouse.down ? 180 : 90
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, r)
      g.addColorStop(0, 'rgba(124,58,237,0.07)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath()
      ctx.fillStyle = g
      ctx.arc(mouse.x, mouse.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const init = () => { resize(); particles = Array.from({length: N}, () => new Particle()) }

    let t = 0
    const loop = () => {
      t++
      ctx.clearRect(0, 0, W, H)
      drawHalo()
      drawConnections()
      particles.forEach(p => { p.update(t); p.draw() })
      animId = requestAnimationFrame(loop)
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onDown = () => { mouse.down = true }
    const onUp   = () => { mouse.down = false }

    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mouseup', onUp)
    canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000 })
    window.addEventListener('resize', resize)

    init()
    loop()

    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mouseup', onUp)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="home-page">
      {/* Intro overlay */}
      <div className="home-intro-overlay" aria-hidden="true">
        <span className="home-intro-text mono">harishm17.github.io</span>
      </div>

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="home-canvas" aria-hidden="true" />

      {/* UI layer */}
      <div className="home-ui">
        <div className="home-hero">
          <div className="home-eyebrow section-eyebrow">
            Software Engineer · AI Systems
          </div>

          <h1 className="home-name display">
            <span className="home-name-fill">HARISH<br />MANOHARAN</span>
            <span className="home-name-outline" aria-hidden="true">HARISH<br />MANOHARAN</span>
          </h1>

          <p className="home-description">
            I engineer the gap between a great AI demo and a system people rely on —
            LLM evaluation pipelines, agentic workflows, and the backends that hold them together.
          </p>

          <div className="home-ctas">
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <a href="/HarishManoharan.pdf" className="btn-ghost" download>Resume ↓</a>
            <Link to="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </div>

        {/* Floating status card */}
        <div className="home-status-card glass-card">
          <div className="home-status-header mono">
            <span className="home-status-dot" />
            Available
          </div>
          <div className="home-status-row">
            <div className="home-status-label mono">Role</div>
            <div className="home-status-val">Software Engineer · AI Systems</div>
          </div>
          <div className="home-status-divider" />
          <div className="home-status-row">
            <div className="home-status-label mono">At</div>
            <div className="home-status-val">Purgo AI</div>
          </div>
          <div className="home-status-row">
            <div className="home-status-label mono">MS</div>
            <div className="home-status-val">CS · UT Dallas</div>
          </div>
          <div className="home-status-divider" />
          <div className="home-status-open mono">Open to opportunities</div>
        </div>

        {/* Bottom bar */}
        <div className="home-bottom">
          <div className="home-scroll-hint mono">
            <span className="home-scroll-line" />
            Scroll to explore
          </div>
          <div className="home-socials mono">
            <a href="https://github.com/harishm17" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/harishm17" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:harish_manoharan@outlook.com">Email</a>
          </div>
        </div>
      </div>
    </div>
  )
}
