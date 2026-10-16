import usePageTitle from '../hooks/usePageTitle.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ExperienceCard from '../components/ExperienceCard.jsx'
import { experiences } from '../data/experiences.js'
export default function Experiences() {
  usePageTitle('Experiences', 'Activities and experiences at Elysian Retreat (demo).')
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeading title="Experiences" subtitle="Sample activities. Replace with your own." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{experiences.map((e) => <ExperienceCard key={e.id} item={e} />)}</div>
    </section>
  )
}
