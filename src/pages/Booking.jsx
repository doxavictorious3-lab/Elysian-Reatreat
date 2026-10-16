import usePageTitle from '../hooks/usePageTitle.js'
import SectionHeading from '../components/SectionHeading.jsx'
import BookingForm from '../components/BookingForm.jsx'
export default function Booking() {
  usePageTitle('Booking request', 'Send a booking enquiry to Elysian Retreat (demo).')
  return (
    <section className="mx-auto max-w-3xl px-5 py-16">
      <SectionHeading title="Booking request" subtitle="Send us your dates and we will confirm availability. Submitting this form does not reserve a room." />
      <BookingForm />
    </section>
  )
}
