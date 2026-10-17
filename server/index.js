import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { bookingSchema, contactSchema, newsletterSchema } from './schemas.js'
import * as db from './db.js'
import { notify } from './mailer.js'
import adminRouter from './admin.js'

const app = express()
app.set('trust proxy', 1) // needed behind hosts like Render so rate limiting sees real visitor IPs
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 60, standardHeaders: true, legacyHeaders: false, skip: (req) => req.path.startsWith('/admin') }))
app.use('/api/admin', adminRouter)

const invalid = (res, parsed) => res.status(400).json({ error: 'Invalid input', fields: parsed.error.flatten().fieldErrors })
const emailFailed = (err) => console.error('Email notification failed:', err.message)

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.get('/api/rooms', (_req, res) => res.json({ rooms: db.listRooms() }))

app.post('/api/booking', (req, res) => {
  const parsed = bookingSchema.safeParse(req.body)
  if (!parsed.success) return invalid(res, parsed)
  const d = parsed.data
  const room = db.getRoom(d.roomId)
  if (!room || !room.active) return res.status(400).json({ error: 'Invalid input', fields: { roomId: ['Choose an available room.'] } })
  if (d.adults + d.children > room.maxGuests) return res.status(400).json({ error: 'Invalid input', fields: { adults: [`${room.name} sleeps up to ${room.maxGuests} guests.`] } })
  try {
    const id = db.createReservation(d, room.price)
    const reference = db.referenceFor(id)
    notify(`Booking enquiry ${reference}: ${room.name}`, [`Reference: ${reference}`, `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || '-'}`, `Room: ${room.name}`, `Dates: ${d.checkIn} to ${d.checkOut}`, `Guests: ${d.adults} adults, ${d.children} children`, `Requests: ${d.requests || '-'}`], d.email).catch(emailFailed)
    res.json({ ok: true, reference })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Could not process your request. Please try again.' }) }
})

app.post('/api/contact', (req, res) => {
  const parsed = contactSchema.safeParse(req.body)
  if (!parsed.success) return invalid(res, parsed)
  const d = parsed.data
  try {
    db.addMessage(d)
    notify(`Website message: ${d.subject}`, [`Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || '-'}`, '', d.message], d.email).catch(emailFailed)
    res.json({ ok: true })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Could not process your request. Please try again.' }) }
})

app.post('/api/newsletter', (req, res) => {
  const parsed = newsletterSchema.safeParse(req.body)
  if (!parsed.success) return invalid(res, parsed)
  try { db.addSubscriber(parsed.data.email); res.json({ ok: true }) }
  catch (err) { console.error(err); res.status(500).json({ error: 'Could not process your request. Please try again.' }) }
})

app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' })
  console.error(err); res.status(500).json({ error: 'Server error' })
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
