import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button.jsx'
const field = 'w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2.5 text-charcoal'
export default function BookingSearch() {
  const nav = useNavigate()
  const today = new Date().toISOString().slice(0, 10)
  const [v, setV] = useState({ checkIn: '', checkOut: '', adults: 2, children: 0 })
  const [error, setError] = useState('')
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  function submit(e) {
    e.preventDefault()
    if (!v.checkIn || !v.checkOut) return setError('Choose both a check-in and a check-out date.')
    if (v.checkOut <= v.checkIn) return setError('Check-out must be after check-in.')
    if (Number(v.adults) < 1) return setError('At least one adult is required.')
    nav(`/booking?${new URLSearchParams(v)}`)
  }
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-2xl bg-ivory p-5 text-charcoal shadow-xl sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
      <label className="text-sm font-medium">Check-in<input type="date" min={today} value={v.checkIn} onChange={set('checkIn')} className={field} /></label>
      <label className="text-sm font-medium">Check-out<input type="date" min={v.checkIn || today} value={v.checkOut} onChange={set('checkOut')} className={field} /></label>
      <label className="text-sm font-medium">Adults<input type="number" min="1" max="10" value={v.adults} onChange={set('adults')} className={field} /></label>
      <label className="text-sm font-medium">Children<input type="number" min="0" max="10" value={v.children} onChange={set('children')} className={field} /></label>
      <Button type="submit" variant="dark">Send enquiry</Button>
      {error && <p role="alert" className="text-sm text-red-700 sm:col-span-2 lg:col-span-5">{error}</p>}
    </form>
  )
}
