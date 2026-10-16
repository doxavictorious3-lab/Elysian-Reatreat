export const inputClass = 'w-full rounded-lg border border-charcoal/25 bg-white px-3 py-2.5 text-charcoal aria-[invalid=true]:border-red-700'
export default function FormField({ label, name, error, optional, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">{label}{optional && <span className="font-normal text-charcoal/60"> (optional)</span>}</label>
      {children}
      {error && <p id={`${name}-error`} role="alert" className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  )
}
