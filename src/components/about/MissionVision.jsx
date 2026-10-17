import { missionVision } from '../../data/aboutContent.js'
import Reveal from './Reveal.jsx'

export default function MissionVision() {
  return (
    <section aria-labelledby="mission-vision-title" className="bg-[var(--a-ivory)] py-24 text-[var(--a-green)] md:py-32">
      <h2 id="mission-vision-title" className="sr-only">Mission and vision</h2>
      <div className="mx-auto grid max-w-6xl gap-16 px-5 md:grid-cols-2 md:gap-0">
        {missionVision.map((b, i) => (
          <Reveal key={b.id} delay={i * 150}
            className={`md:px-12 ${i === 0 ? 'md:pl-0 md:border-r md:border-[var(--a-gold)]' : 'md:pr-0'}`}>
            <h3 className="text-xs font-medium uppercase tracking-[0.28em] text-[var(--a-green)]/70">{b.label}</h3>
            <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">{b.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
