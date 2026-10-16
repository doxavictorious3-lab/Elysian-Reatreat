import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { navLinks, site } from '../data/site.js'
import Button from './Button.jsx'
import MobileMenu from './MobileMenu.jsx'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="bg-forest px-4 py-2 text-center text-sm text-ivory">{site.offer}</div>
      <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-display text-2xl text-forest">{site.name}</Link>
          <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'text-forest underline underline-offset-8 decoration-gold' : 'hover:text-forest'}>{l.label}</NavLink>
            ))}
            <Button to="/booking" variant="dark">Book now</Button>
          </nav>
          <button className="p-2 lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
