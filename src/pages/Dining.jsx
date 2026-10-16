import usePageTitle from '../hooks/usePageTitle.js'
import DiningSection from '../components/DiningSection.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
export default function Dining() {
  usePageTitle('Dining', 'Restaurant and chef experiences at Elysian Retreat (demo).')
  return (
    <>
      <DiningSection showLink={false} />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <SectionHeading title="Menus and hours" subtitle="Add breakfast, lunch and dinner times, sample menus and dietary information here." />
      </section>
    </>
  )
}
