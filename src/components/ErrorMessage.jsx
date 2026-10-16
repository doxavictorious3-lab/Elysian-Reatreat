export default function ErrorMessage({ children }) {
  return <div role="alert" className="rounded-lg border border-red-700/40 bg-red-50 p-4 text-red-800">{children}</div>
}
