import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
export default function Lightbox({ images, index, onClose, onChange }) {
  const closeRef = useRef(null)
  const open = index !== null
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    closeRef.current?.focus()
    const go = (d) => onChange((index + d + images.length) % images.length)
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; prev?.focus() }
  }, [open, index, images.length, onChange, onClose])
  if (!open) return null
  const img = images[index]
  const btn = 'absolute rounded-full bg-ivory/90 p-3 text-charcoal hover:bg-ivory'
  return (
    <div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 p-4">
      <button ref={closeRef} onClick={onClose} aria-label="Close" className={`${btn} right-4 top-4`}><X /></button>
      <button onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label="Previous image" className={`${btn} left-4`}><ChevronLeft /></button>
      <figure className="max-h-full max-w-4xl"><img src={img.src} alt={img.alt} className="max-h-[80vh] rounded-xl object-contain" /><figcaption className="mt-3 text-center text-ivory">{img.alt} ({index + 1} of {images.length})</figcaption></figure>
      <button onClick={() => onChange((index + 1) % images.length)} aria-label="Next image" className={`${btn} right-4`}><ChevronRight /></button>
    </div>
  )
}
