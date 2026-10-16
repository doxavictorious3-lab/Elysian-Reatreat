import { img } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Button from './Button.jsx'
export default function EventPromotion() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
      <div>
        <SectionHeading title="Weddings, conferences and private events" subtitle="Share your capacity, spaces and event services here. This is placeholder copy." />
        <Button to="/events" variant="dark">Plan an event</Button>
      </div>
      <img src={img('events-promo', 1000, 750)} alt="Sample event space photo" loading="lazy" className="rounded-3xl object-cover" />
    </section>
  )
}
