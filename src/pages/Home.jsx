import usePageTitle from '../hooks/usePageTitle.js'
import HeroSection from '../components/HeroSection.jsx'
import BookingSearch from '../components/BookingSearch.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import RoomGrid from '../components/RoomGrid.jsx'
import Button from '../components/Button.jsx'
import DiningSection from '../components/DiningSection.jsx'
import ExperienceCard from '../components/ExperienceCard.jsx'
import AmenityIcon from '../components/AmenityIcon.jsx'
import GalleryGrid from '../components/GalleryGrid.jsx'
import EventPromotion from '../components/EventPromotion.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { rooms } from '../data/rooms.js'
import { experiences, facilities } from '../data/experiences.js'
import { galleryImages } from '../data/gallery.js'
import { testimonials } from '../data/testimonials.js'
import { site } from '../data/site.js'
const wrap = 'mx-auto max-w-7xl px-5 py-20'
export default function Home() {
  usePageTitle('', 'Elysian Retreat: a demo luxury resort website.')
  return (
    <>
      <HeroSection />
      <div className="relative z-10 mx-auto -mt-10 max-w-6xl px-5"><BookingSearch /></div>
      <section className="mx-auto max-w-3xl px-5 py-24 text-center">
        <SectionHeading align="center" title="A resort built around the landscape" subtitle="Elysian Retreat is a fictional brand. Use this section to tell guests who you are, where you are and what a stay feels like." />
        <Button to="/about" variant="dark">Our story</Button>
      </section>
      <section className={wrap}>
        <SectionHeading title="Rooms and suites" subtitle="All prices are sample pricing for demonstration." />
        <RoomGrid rooms={rooms} />
        <Button to="/rooms" variant="dark" className="mt-10">See all rooms</Button>
      </section>
      <DiningSection />
      <section className={wrap}>
        <SectionHeading title="Things to do" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{experiences.map((e) => <ExperienceCard key={e.id} item={e} />)}</div>
      </section>
      <section className="bg-white"><div className={wrap}>
        <SectionHeading title="Facilities" />
        <ul className="grid grid-cols-2 gap-5 md:grid-cols-4">{facilities.map((f) => <li key={f}><AmenityIcon type={f} /></li>)}</ul>
      </div></section>
      <section className={wrap}>
        <SectionHeading title="Gallery" subtitle="Select a photo to enlarge it." />
        <GalleryGrid images={galleryImages.filter((_, i) => i % 3 === 0)} />
        <Button to="/gallery" variant="dark" className="mt-8">View full gallery</Button>
      </section>
      <EventPromotion />
      <section className="bg-ivory"><div className={wrap}>
        <SectionHeading align="center" title="Guest words" />
        <TestimonialCarousel items={testimonials} />
      </div></section>
      <section className={wrap}>
        <SectionHeading title="Finding us" subtitle={`${site.address}. Add directions, airport transfer times and a map here.`} />
      </section>
      <section className="bg-forest text-ivory"><div className="mx-auto max-w-3xl px-5 py-16 text-center">
        <h2 className="font-display text-4xl">Join the newsletter</h2>
        <div className="mt-6 flex justify-center text-charcoal"><NewsletterForm /></div>
      </div></section>
    </>
  )
}
