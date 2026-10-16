import { useState, useCallback } from 'react'
import Lightbox from './Lightbox.jsx'
import EmptyState from './EmptyState.jsx'
export default function GalleryGrid({ images, filters }) {
  const [cat, setCat] = useState('All')
  const [index, setIndex] = useState(null)
  const list = cat === 'All' ? images : images.filter((i) => i.category === cat)
  const close = useCallback(() => setIndex(null), [])
  return (
    <div>
      {filters && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
          {['All', ...filters].map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm ${cat === c ? 'border-forest bg-forest text-ivory' : 'border-charcoal/25'}`}>{c}</button>)}
        </div>
      )}
      {list.length === 0 ? <EmptyState title="No photos in this category" /> : (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {list.map((im, i) => (
            <li key={im.id}><button onClick={() => setIndex(i)} aria-label={`Open ${im.alt}`} className="block w-full overflow-hidden rounded-2xl">
              <img src={im.thumb} alt={im.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105" />
            </button></li>
          ))}
        </ul>
      )}
      <Lightbox images={list} index={index} onClose={close} onChange={setIndex} />
    </div>
  )
}
