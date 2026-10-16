import { img } from './site.js'
// Sample placeholder images. Replace src and alt with your own licensed photos.
const make = (cat, n) => Array.from({ length: n }, (_, i) => ({
  id: `${cat}-${i}`, category: cat, src: img(`gal-${cat}-${i}`, 1200, 800), thumb: img(`gal-${cat}-${i}`, 600, 450), alt: `Sample ${cat.toLowerCase()} photo ${i + 1}`,
}))
export const galleryCategories = ['Rooms', 'Dining', 'Gardens', 'Pool', 'Events']
export const galleryImages = galleryCategories.flatMap((c) => make(c, 3))
