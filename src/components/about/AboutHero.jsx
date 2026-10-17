import { img } from '../../data/site.js'
import { hero, tagline } from '../../data/aboutContent.js'

export default function AboutHero() {
  return (
    <section aria-labelledby="about-title" className="relative isolate flex min-h-[78vh] items-end overflow-hidden bg-[var(--a-green)] text-[var(--a-ivory)]">
      <img src={img(hero.image.seed, 1800, 1100)} alt={hero.image.alt} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#173D32] via-[#173D32]/65 to-[#173D32]/20" />
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-40 md:pb-24">
        <p className="text-xs font-medium tracking-[0.28em] text-[var(--a-gold)]">{hero.eyebrow}</p>
        <h1 id="about-title" className="mt-6 max-w-3xl break-words font-display text-4xl leading-[1.08] sm:text-5xl md:text-7xl">
          {hero.titleLead}{' '}
          <span className="block italic text-[var(--a-gold)]">{hero.titleAccent}</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--a-ivory)]/90">{hero.text}</p>
        <div className="mt-10 flex items-center gap-4">
          <span aria-hidden="true" className="h-px w-14 bg-[var(--a-gold)]" />
          <p className="font-display text-lg italic text-[var(--a-gold)]">{tagline}</p>
        </div>
      </div>
    </section>
  )
}
