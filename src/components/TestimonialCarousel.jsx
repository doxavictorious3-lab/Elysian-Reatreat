import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TestimonialCard from './TestimonialCard.jsx'
export default function TestimonialCarousel({ items }) {
  const [i, setI] = useState(0)
  const b = 'rounded-full border border-charcoal/30 p-2 hover:bg-white'
  return (
    <div className="mx-auto max-w-2xl">
      <p className="mb-4 text-sm text-charcoal/60">Demo testimonials. Replace with genuine reviews before launch.</p>
      <div aria-live="polite"><TestimonialCard item={items[i]} /></div>
      <div className="mt-4 flex justify-center gap-3">
        <button className={b} aria-label="Previous testimonial" onClick={() => setI((i - 1 + items.length) % items.length)}><ChevronLeft /></button>
        <button className={b} aria-label="Next testimonial" onClick={() => setI((i + 1) % items.length)}><ChevronRight /></button>
      </div>
    </div>
  )
}
