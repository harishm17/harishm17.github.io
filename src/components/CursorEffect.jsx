// src/components/CursorEffect.jsx
import { useEffect, useRef } from 'react'
import './CursorEffect.css'

export default function CursorEffect() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const raf     = useRef(null)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(max-width: 768px)').matches) return

    const dot    = dotRef.current
    const ringEl = ringRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => { dot.classList.add('cursor-dot--hover'); ringEl.classList.add('cursor-ring--hover') }
    const onLeave = () => { dot.classList.remove('cursor-dot--hover'); ringEl.classList.remove('cursor-ring--hover') }

    const onClick = (e) => {
      const ripple = document.createElement('div')
      ripple.className = 'cursor-ripple'
      ripple.style.left = e.clientX + 'px'
      ripple.style.top  = e.clientY + 'px'
      document.body.appendChild(ripple)
      ripple.addEventListener('animationend', () => ripple.remove())
    }

    const interactables = () => document.querySelectorAll('a, button, [role="button"], input, textarea, select, label')

    const attachHoverListeners = () => {
      interactables().forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    attachHoverListeners()
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      cancelAnimationFrame(raf.current)
      interactables().forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  )
}
