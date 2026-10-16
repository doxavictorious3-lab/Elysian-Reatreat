// Replace these placeholders with your real details.
export const site = {
  name: 'Elysian Retreat',
  phone: '+254743750574',
  email: 'doxavictorious3@gmail.com',
  address: '64thstreet,Kimbo-Ruiru,Kenya',
  offer: 'Sample offer: stay three nights, get the fourth free (demo text).',
}
export const navLinks = [
  { to: '/rooms', label: 'Rooms' }, { to: '/dining', label: 'Dining' },
  { to: '/experiences', label: 'Experiences' }, { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' }, { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
export const legalLinks = [{ to: '/privacy', label: 'Privacy' }, { to: '/terms', label: 'Terms' }]
// Placeholder photos from picsum.photos. Swap for your own licensed images in src/assets/.
export const img = (seed, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`
