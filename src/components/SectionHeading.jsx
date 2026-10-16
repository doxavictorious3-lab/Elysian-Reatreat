export default function SectionHeading({ title, subtitle, align = 'left' }) {
  return (
    <header className={`mb-10 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 className="font-display text-4xl leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-charcoal/75">{subtitle}</p>}
    </header>
  )
}
