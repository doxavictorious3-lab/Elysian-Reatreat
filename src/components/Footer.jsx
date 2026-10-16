import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { navLinks, legalLinks, site } from '../data/site.js'
export default function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl">{site.name}</p>
          <p className="mt-3 max-w-xs text-ivory/70">A demo resort brand. Replace the details below with your own.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-ivory/80">
          {[...navLinks, ...legalLinks].map((l) => <Link key={l.to} to={l.to} className="hover:text-gold">{l.label}</Link>)}
        </nav>
        <address className="space-y-2 not-italic text-ivory/80">
          <p className="flex gap-2"><Phone size={18} />{site.phone}</p>
          <p className="flex gap-2"><Mail size={18} />{site.email}</p>
          <p className="flex gap-2"><MapPin size={18} />{site.address}</p>
        </address>
      </div>
      <p className="border-t border-ivory/15 py-5 text-center text-sm text-ivory/60">© {new Date().getFullYear()} {site.name}. Demo website.</p>
    </footer>
  )
}
