export default function TestimonialCard({ item }) {
  return (
    <figure className="rounded-3xl bg-white p-8">
      <blockquote className="font-display text-2xl leading-snug">{item.text}</blockquote>
      <figcaption className="mt-4 text-sm text-charcoal/70">{item.name} (demo content)</figcaption>
    </figure>
  )
}
