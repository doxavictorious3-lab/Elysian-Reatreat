import { Heart, Wind, Sparkles, Feather, Leaf } from 'lucide-react'
import { values } from '../../data/aboutContent.js'
import Reveal from './Reveal.jsx'

const icons = { heart: Heart, wind: Wind, sparkles: Sparkles, feather: Feather, leaf: Leaf }

export default function ValuesSection() {
  return (
    <section aria-labelledby="values-title" className="bg-[var(--a-ivory-soft)] py-24 text-[var(--a-green)] md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <h2 id="values-title" className="mx-auto max-w-2xl text-center font-display text-4xl leading-tight md:text-5xl">{values.heading}</h2>
        <ul className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {values.items.map((v, i) => {
            const Icon = icons[v.icon]
            return (
              <li key={v.id}>
                <Reveal delay={(i % 3) * 120} className="border-t border-[var(--a-gold)] pt-7">
                  <span aria-hidden="true" className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--a-green)] text-[var(--a-gold)]">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-2xl">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-[var(--a-green)]/80">{v.text}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
