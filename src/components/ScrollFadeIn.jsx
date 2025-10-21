import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './ScrollFadeIn.css'

function ScrollFadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, once: true })

  return (
    <div
      ref={ref}
      className={`scroll-fade-in ${isVisible ? 'visible' : ''} fade-${direction}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default ScrollFadeIn
