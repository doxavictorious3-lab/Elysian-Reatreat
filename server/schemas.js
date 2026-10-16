import { z } from 'zod'
// Keep room ids and capacities in sync with ../src/data/rooms.js
export const rooms = { 'garden-room': { name: 'Garden Room', max: 2 }, 'pool-suite': { name: 'Pool Suite', max: 3 }, 'family-villa': { name: 'Family Villa', max: 5 } }
const oneLine = (max) => z.string().trim().max(max).transform((s) => s.replace(/[\r\n]+/g, ' '))
const email = z.string().trim().email().max(200)
export const newsletterSchema = z.object({ email })
export const contactSchema = z.object({
  name: oneLine(100).pipe(z.string().min(2)), email, phone: oneLine(40).optional(),
  subject: oneLine(150).pipe(z.string().min(3)), message: z.string().trim().min(10).max(2000),
})
export const bookingSchema = z.object({
  name: oneLine(100).pipe(z.string().min(2)), email, phone: oneLine(40).optional(),
  roomId: z.string().refine((id) => id in rooms, 'Unknown room'),
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1).max(10), children: z.coerce.number().int().min(0).max(10),
  requests: z.string().trim().max(1000).optional(),
}).superRefine((v, ctx) => {
  if (v.checkOut <= v.checkIn) ctx.addIssue({ code: 'custom', path: ['checkOut'], message: 'Check-out must be after check-in' })
  if (v.checkIn < new Date().toISOString().slice(0, 10)) ctx.addIssue({ code: 'custom', path: ['checkIn'], message: 'Check-in is in the past' })
  if (rooms[v.roomId] && v.adults + v.children > rooms[v.roomId].max) ctx.addIssue({ code: 'custom', path: ['adults'], message: 'Too many guests for this room' })
})
