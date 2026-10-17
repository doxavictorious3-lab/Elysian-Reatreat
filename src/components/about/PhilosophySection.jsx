import { img } from '../../data/site.js'
import { philosophy } from '../../data/aboutContent.js'
import Reveal from './Reveal.jsx'

export default function PhilosophySection() {
  return (
    <section aria-labelledby="philosophy-title" className="overflow-hidden bg-[var(--a-green)] py-24 text-[var(--a-ivory)] md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-2">
        <Reveal className="relative order-last lg:order-none">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl border border-[var(--a-gold)]/50" />
          <img src={img(philosophy.image.seed, 1000, 800)} alt={philosophy.image.alt} loading="lazy" className="relative aspect-[5/4] w-full rounded-3xl object-cover" />
        </Reveal>
        <Reveal delay={150}>
          <h2 id="philosophy-title" className="font-display text-4xl leading-tight md:text-5xl">{philosophy.heading}</h2>
          <span aria-hidden="true" className="my-8 block h-px w-14 bg-[var(--a-gold)]" />
          <div className="space-y-5 text-lg leading-relaxed text-[var(--a-ivory)]/85">
            {philosophy.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
