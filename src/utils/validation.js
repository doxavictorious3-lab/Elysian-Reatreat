import { z } from 'zod'
import { rooms } from '../data/rooms.js'

const today = () => new Date().toISOString().slice(0, 10)

export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Enter your full name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().optional(),
  roomId: z.string().min(1, 'Choose a room.'),
  checkIn: z.string().min(1, 'Choose a check-in date.').refine((d) => d >= today(), 'Check-in cannot be in the past.'),
  checkOut: z.string().min(1, 'Choose a check-out date.'),
  adults: z.coerce.number({ invalid_type_error: 'Enter the number of adults.' }).int().min(1, 'At least one adult is required.').max(10),
  children: z.coerce.number({ invalid_type_error: 'Enter 0 or more.' }).int().min(0, 'Cannot be negative.').max(10),
  requests: z.string().max(1000).optional(),
}).superRefine((v, ctx) => {
  if (v.checkIn && v.checkOut && v.checkOut <= v.checkIn)
    ctx.addIssue({ code: 'custom', path: ['checkOut'], message: 'Check-out must be after check-in.' })
  const room = rooms.find((r) => r.id === v.roomId)
  if (room && v.adults + v.children > room.maxGuests)
    ctx.addIssue({ code: 'custom', path: ['adults'], message: `${room.name} sleeps up to ${room.maxGuests} guests.` })
})

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.'),
  email: z.string().trim().email('Enter a valid email address.'),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(3, 'Add a short subject.'),
  message: z.string().trim().min(10, 'Message should be at least 10 characters.').max(2000),
})

export const newsletterSchema = z.object({ email: z.string().trim().email('Enter a valid email address.') })

// Sends a form to the backend in /server. In development Vite proxies /api to http://localhost:4000.
// In production set VITE_API_URL to your deployed API address, e.g. https://api.yourdomain.com
const API_BASE = import.meta.env.VITE_API_URL || ''
export async function submitForm(endpoint, data) {
  const res = await fetch(`${API_BASE}/api/${endpoint}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}
