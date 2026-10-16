import usePageTitle from '../hooks/usePageTitle.js'
import SectionHeading from '../components/SectionHeading.jsx'
import ContactForm from '../components/ContactForm.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { site } from '../data/site.js'
export default function Contact() {
  usePageTitle('Contact', 'Contact Elysian Retreat.')
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-2">
      <div>
        <SectionHeading title="Get in touch" subtitle={`${site.phone} · ${site.email}`} />
        <ContactForm />
      </div>
      <div>
        <h2 className="font-display text-3xl">Newsletter</h2>
        <p className="mb-5 mt-2 text-charcoal/70">Seasonal offers and news (demo form).</p>
        <NewsletterForm />
      </div>
    </section>
  )
}
