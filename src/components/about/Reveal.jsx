import { useEffect, useRef, useState } from 'react'

// Fades and lifts its content in once, when it scrolls into view.
// Shows immediately for visitors who prefer reduced motion or browsers without IntersectionObserver.
export default function Reveal({ className = '', delay = 0, children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!el || reduce || typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${className}`}>
      {children}
    </div>
  )
}
