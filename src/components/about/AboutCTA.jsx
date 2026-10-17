import { cta } from '../../data/aboutContent.js'
import AboutButton from './AboutButton.jsx'
import Reveal from './Reveal.jsx'

export default function AboutCTA() {
  return (
    <section aria-labelledby="about-cta-title" className="bg-[var(--a-green)] py-24 text-center text-[var(--a-ivory)] md:py-32">
      <Reveal className="mx-auto max-w-2xl px-5">
        <span aria-hidden="true" className="mx-auto mb-8 block h-px w-14 bg-[var(--a-gold)]" />
        <h2 id="about-cta-title" className="font-display text-4xl leading-tight md:text-6xl">{cta.heading}</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--a-ivory)]/85">{cta.text}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <AboutButton to={cta.primary.to} tone="goldOnGreen">{cta.primary.label}</AboutButton>
          <AboutButton to={cta.secondary.to} tone="outlineOnGreen">{cta.secondary.label}</AboutButton>
        </div>
      </Reveal>
    </section>
  )
}
