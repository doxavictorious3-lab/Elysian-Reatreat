import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { bookingSchema, contactSchema, newsletterSchema, rooms } from './schemas.js'
import { save, notify } from './mailer.js'
import adminRouter from './admin.js'

const app = express()
app.set('trust proxy', 1) // needed behind hosts like Render so rate limiting sees real visitor IPs
app.use(helmet())
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false, skip: (req) => req.path.startsWith('/admin') }))
app.use('/api/admin', adminRouter)

// Wraps a route: validate -> save -> email -> respond
const handle = (type, schema, toMail) => async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input', fields: parsed.error.flatten().fieldErrors })
  try {
    await save(type, parsed.data)
    if (toMail) await notify(...toMail(parsed.data))
    res.json({ ok: true })
  } catch (err) {
    console.error(type, err)
    res.status(500).json({ error: 'Could not process your request. Please try again.' })
  }
}

app.post('/api/booking', handle('booking', bookingSchema, (d) => [
  `Booking enquiry: ${rooms[d.roomId].name}`,
  [`Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || '-'}`, `Room: ${rooms[d.roomId].name}`, `Dates: ${d.checkIn} to ${d.checkOut}`, `Guests: ${d.adults} adults, ${d.children} children`, `Requests: ${d.requests || '-'}`],
  d.email]))
app.post('/api/contact', handle('contact', contactSchema, (d) => [
  `Website message: ${d.subject}`, [`Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone || '-'}`, '', d.message], d.email]))
app.post('/api/newsletter', handle('newsletter', newsletterSchema, null))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`API listening on http://localhost:${port}`))
