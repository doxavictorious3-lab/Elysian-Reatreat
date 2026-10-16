import usePageTitle from '../hooks/usePageTitle.js'
import SectionHeading from '../components/SectionHeading.jsx'
import Button from '../components/Button.jsx'
import EventPromotion from '../components/EventPromotion.jsx'
export default function Events() {
  usePageTitle('Events', 'Weddings, conferences and private events (demo).')
  return (
    <>
      <EventPromotion />
      <section className="mx-auto max-w-3xl px-5 pb-20 text-center">
        <SectionHeading align="center" title="Tell us about your event" subtitle="Add venues, capacities and packages here." />
        <Button to="/contact" variant="dark">Contact the events team</Button>
      </section>
    </>
  )
}
