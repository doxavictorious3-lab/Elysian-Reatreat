import usePageTitle from '../hooks/usePageTitle.js'
import SectionHeading from '../components/SectionHeading.jsx'
import GalleryGrid from '../components/GalleryGrid.jsx'
import { galleryImages, galleryCategories } from '../data/gallery.js'
export default function Gallery() {
  usePageTitle('Gallery', 'Photo gallery of Elysian Retreat (sample images).')
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeading title="Gallery" subtitle="Use the arrow keys to browse and Escape to close the viewer." />
      <GalleryGrid images={galleryImages} filters={galleryCategories} />
    </section>
  )
}
