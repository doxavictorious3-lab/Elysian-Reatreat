import { useEffect } from 'react'
export default function ToastNotification({ message, type = 'success', onClose }) {
  useEffect(() => { if (!message) return; const t = setTimeout(onClose, 5000); return () => clearTimeout(t) }, [message, onClose])
  if (!message) return null
  return (
    <div role="status" className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 text-sm text-ivory shadow-lg ${type === 'error' ? 'bg-red-800' : 'bg-forest'}`}>
      {message}
    </div>
  )
}
