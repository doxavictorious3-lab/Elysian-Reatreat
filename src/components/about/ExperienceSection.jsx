import { img } from '../../data/site.js'
import { experience } from '../../data/aboutContent.js'
import AboutButton from './AboutButton.jsx'
import Reveal from './Reveal.jsx'

export default function ExperienceSection() {
  return (
    <section aria-labelledby="experience-title" className="bg-[var(--a-ivory)] py-24 text-[var(--a-green)] md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <h2 id="experience-title" className="font-display text-4xl leading-tight md:text-5xl">{experience.heading}</h2>
          <div className="space-y-5 text-lg leading-relaxed text-[var(--a-green)]/85">
            {experience.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </Reveal>
        <ul className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {experience.tiles.map((t, i) => (
            <li key={t.id}>
              <Reveal delay={i * 100} className="relative overflow-hidden rounded-2xl">
                <img src={img(t.seed, 600, 800)} alt={t.alt} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173D32]/90 via-transparent to-transparent" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-[var(--a-ivory)] md:p-5">
                  <p className="font-display text-xl md:text-2xl">{t.title}</p>
                  <p className="mt-1 text-sm text-[var(--a-gold)]">{t.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {experience.links.map((l, i) => (
            <AboutButton key={l.to} to={l.to} tone={i === 0 ? 'greenOnIvory' : 'outlineOnIvory'}>{l.label}</AboutButton>
          ))}
        </div>
      </div>
    </section>
  )
}
