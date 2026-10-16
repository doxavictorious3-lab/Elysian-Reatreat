import { img } from '../data/site.js'
import Button from './Button.jsx'
export default function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] items-end text-ivory">
      <img src={img('elysian-hero', 1800, 1100)} alt="Sample resort landscape" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
      <div className="hero-rise relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32">
        <h1 className="max-w-3xl font-display text-5xl leading-[1.05] md:text-7xl">Slow mornings under open sky</h1>
        <p className="mt-5 max-w-xl text-lg text-ivory/85">Garden rooms, pool suites and long tables set among indigenous planting.</p>
        <Button to="/booking" className="mt-8">Plan your stay</Button>
      </div>
    </section>
  )
}
