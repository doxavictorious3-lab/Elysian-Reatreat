import usePageTitle from '../hooks/usePageTitle.js'
import SectionHeading from '../components/SectionHeading.jsx'
export default function About() {
  usePageTitle('About', 'About Elysian Retreat (demo).')
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading title="About Elysian Retreat" subtitle="Elysian Retreat is an original, fictional resort brand created for this demo. Replace this page with your own story, values and team." />
    </section>
  )
}
