import { img } from '../data/site.js'
import SectionHeading from './SectionHeading.jsx'
import Button from './Button.jsx'
export default function DiningSection({ showLink = true }) {
  return (
    <section className="bg-forest text-ivory">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2">
        <img src={img('dining-table', 1000, 800)} alt="Sample dining table photo" loading="lazy" className="rounded-3xl object-cover" />
        <div>
          <SectionHeading title="Long tables and open kitchens" subtitle="Describe your restaurant, menus and chef experiences here. This is placeholder copy." />
          {showLink && <Button to="/dining">Explore dining</Button>}
        </div>
      </div>
    </section>
  )
}
