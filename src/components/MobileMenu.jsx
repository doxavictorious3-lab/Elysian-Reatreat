import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { navLinks } from '../data/site.js'
import Button from './Button.jsx'
export default function MobileMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 bg-forest p-6 text-ivory lg:hidden">
      <button onClick={onClose} aria-label="Close menu" className="ml-auto block p-2"><X /></button>
      <nav className="mt-6 flex flex-col gap-5 font-display text-3xl">
        {navLinks.map((l) => <NavLink key={l.to} to={l.to} onClick={onClose}>{l.label}</NavLink>)}
      </nav>
      <Button to="/booking" onClick={onClose} className="mt-10">Book now</Button>
    </div>
  )
}
