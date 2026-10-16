export default function LoadingState({ label = 'Loading…' }) {
  return <p role="status" className="py-16 text-center text-charcoal/70">{label}</p>
}
