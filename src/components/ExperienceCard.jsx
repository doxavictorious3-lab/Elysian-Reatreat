export default function ExperienceCard({ item }) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white">
      <img src={item.image} alt={`${item.title} (sample photo)`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="p-5"><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-2 text-charcoal/70">{item.text}</p></div>
    </article>
  )
}
