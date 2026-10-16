import Button from './Button.jsx'
export default function EmptyState({ title, text, actionTo = '/', actionLabel = 'Back to home' }) {
  return (
    <div className="py-24 text-center">
      <h2 className="font-display text-3xl">{title}</h2>
      {text && <p className="mt-3 text-charcoal/70">{text}</p>}
      <Button to={actionTo} variant="dark" className="mt-6">{actionLabel}</Button>
    </div>
  )
}
