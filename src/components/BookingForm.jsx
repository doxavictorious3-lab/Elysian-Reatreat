import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, submitForm } from '../utils/validation.js'
import useRooms from '../hooks/useRooms.js'
import LoadingState from './LoadingState.jsx'
import FormField, { inputClass } from './FormField.jsx'
import Button from './Button.jsx'
import ErrorMessage from './ErrorMessage.jsx'
const nights = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000)
export default function BookingForm() {
  const [params] = useSearchParams()
  const { rooms, loading, error } = useRooms()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: { roomId: params.get('room') || '', checkIn: params.get('checkIn') || '', checkOut: params.get('checkOut') || '', adults: params.get('adults') || 2, children: params.get('children') || 0 },
  })
  const [summary, setSummary] = useState(null)
  const [failed, setFailed] = useState(false)
  async function onSubmit(data) {
    setFailed(false)
    const chosen = rooms.find((r) => r.id === data.roomId)
    if (chosen && data.adults + data.children > chosen.maxGuests) return setError('adults', { message: `${chosen.name} sleeps up to ${chosen.maxGuests} guests.` })
    try { const res = await submitForm('booking', data); setSummary({ ...data, reference: res.reference }) } catch { setFailed(true) }
  }
  const f = (name) => ({ id: name, className: inputClass, 'aria-invalid': !!errors[name], ...register(name) })
  if (loading) return <LoadingState label="Loading rooms…" />
  if (error) return <ErrorMessage>We could not load the rooms, so the form is unavailable. Please try again shortly.</ErrorMessage>
  if (summary) {
    const room = rooms.find((r) => r.id === summary.roomId); const n = nights(summary.checkIn, summary.checkOut)
    return (
      <section aria-live="polite" className="rounded-3xl bg-white p-8">
        <h2 className="font-display text-3xl">Enquiry summary</h2>
        <p className="mt-2 text-charcoal/70">Your reference: <strong>{summary.reference}</strong></p>
        <p className="mt-3 rounded-lg bg-gold/20 p-4">Your enquiry has been sent. No room is reserved and no payment has been taken until our team confirms availability with you.</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <div><dt className="text-sm text-charcoal/60">Guest</dt><dd>{summary.name} ({summary.email})</dd></div>
          <div><dt className="text-sm text-charcoal/60">Room</dt><dd>{room?.name}</dd></div>
          <div><dt className="text-sm text-charcoal/60">Dates</dt><dd>{summary.checkIn} to {summary.checkOut} ({n} night{n === 1 ? '' : 's'})</dd></div>
          <div><dt className="text-sm text-charcoal/60">Guests</dt><dd>{summary.adults} adult(s), {summary.children} child(ren)</dd></div>
          <div><dt className="text-sm text-charcoal/60">Sample price estimate</dt><dd>${(room?.price || 0) * n} (sample pricing, not a quote)</dd></div>
        </dl>
        <Button variant="dark" className="mt-6" onClick={() => setSummary(null)}>Edit enquiry</Button>
      </section>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {failed && <ErrorMessage>We could not send your enquiry. Please try again.</ErrorMessage>}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full name" name="name" error={errors.name?.message}><input {...f('name')} /></FormField>
        <FormField label="Email" name="email" error={errors.email?.message}><input type="email" {...f('email')} /></FormField>
        <FormField label="Phone" name="phone" optional><input type="tel" {...f('phone')} /></FormField>
        <FormField label="Room" name="roomId" error={errors.roomId?.message}>
          <select {...f('roomId')}><option value="">Choose a room</option>{rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
        </FormField>
        <FormField label="Check-in" name="checkIn" error={errors.checkIn?.message}><input type="date" {...f('checkIn')} /></FormField>
        <FormField label="Check-out" name="checkOut" error={errors.checkOut?.message}><input type="date" {...f('checkOut')} /></FormField>
        <FormField label="Adults" name="adults" error={errors.adults?.message}><input type="number" min="1" {...f('adults')} /></FormField>
        <FormField label="Children" name="children" error={errors.children?.message}><input type="number" min="0" {...f('children')} /></FormField>
      </div>
      <FormField label="Special requests" name="requests" optional><textarea rows="4" {...f('requests')} /></FormField>
      <Button type="submit" variant="dark" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send booking enquiry'}</Button>
    </form>
  )
}
