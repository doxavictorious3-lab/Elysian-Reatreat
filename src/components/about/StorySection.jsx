import { img } from '../../data/site.js'
import { story } from '../../data/aboutContent.js'
import Reveal from './Reveal.jsx'

export default function StorySection() {
  const [main, accent] = story.images
  return (
    <section aria-labelledby="story-title" className="bg-[var(--a-ivory)] py-24 text-[var(--a-green)] md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <span aria-hidden="true" className="mb-8 block h-px w-14 bg-[var(--a-green)]/60" />
          <h2 id="story-title" className="font-display text-4xl leading-tight md:text-5xl">{story.heading}</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-[var(--a-green)]/85">
            {story.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
        </Reveal>
        <Reveal delay={150} className="relative pb-14 lg:col-span-6">
          <img src={img(main.seed, 900, 1100)} alt={main.alt} loading="lazy" className="ml-auto aspect-[4/5] w-4/5 rounded-t-[999px] rounded-b-2xl object-cover" />
          <img src={img(accent.seed, 600, 600)} alt={accent.alt} loading="lazy" className="absolute bottom-0 left-0 aspect-square w-2/5 rounded-2xl border-8 border-[var(--a-ivory)] object-cover" />
        </Reveal>
      </div>
    </section>
  )
}
