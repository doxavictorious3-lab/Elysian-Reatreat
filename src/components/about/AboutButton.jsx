import { Link } from 'react-router-dom'

const tones = {
  goldOnGreen: 'bg-[var(--a-gold)] text-[var(--a-green)] hover:bg-[#e4d7bd] focus-visible:outline-[var(--a-gold)]',
  outlineOnGreen: 'border border-[var(--a-gold)] text-[var(--a-ivory)] hover:bg-white/10 focus-visible:outline-[var(--a-gold)]',
  greenOnIvory: 'bg-[var(--a-green)] text-[var(--a-ivory)] hover:bg-[#21564a] focus-visible:outline-[var(--a-green)]',
  outlineOnIvory: 'border border-[var(--a-green)] text-[var(--a-green)] hover:bg-[var(--a-green)]/10 focus-visible:outline-[var(--a-green)]',
}
export default function AboutButton({ to, tone, children }) {
  return (
    <Link to={to} className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 ${tones[tone]}`}>
      {children}
    </Link>
  )
}
