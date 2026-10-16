import usePageTitle from '../hooks/usePageTitle.js'
export default function Legal({ title, sections }) {
  usePageTitle(title)
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="font-display text-5xl">{title}</h1>
      <p className="mt-4 rounded-lg bg-gold/20 p-4">Template text only, not legal advice. Have a qualified professional review and replace it before launch.</p>
      {sections.map((s) => <section key={s.h} className="mt-8"><h2 className="font-display text-2xl">{s.h}</h2><p className="mt-2 text-charcoal/80">{s.p}</p></section>)}
    </article>
  )
}
