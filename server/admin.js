import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import * as db from './db.js'
import { authEnabled, login, adminFromToken } from './auth.js'

if (!authEnabled) console.warn('Admin area disabled: set ADMIN_TOKEN_SECRET (32+ characters) in .env')
else if (db.countAdmins() === 0) console.warn('No admin users yet. Create one with: npm run create-admin')

const router = Router()
router.use((_req, res, next) => (authEnabled ? next() : res.status(503).json({ error: 'Admin area is not configured.' })))

router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }), (req, res) => {
  const token = login(req.body?.username, req.body?.password)
  token ? res.json({ token }) : res.status(401).json({ error: 'Wrong username or password.' })
})

router.use((req, res, next) => {
  const admin = adminFromToken((req.headers.authorization || '').replace(/^Bearer /, ''))
  if (!admin) return res.status(401).json({ error: 'Please sign in.' })
  req.admin = admin
  next()
})

const safe = (fn) => (req, res) => { try { fn(req, res) } catch (err) { console.error(err); res.status(500).json({ error: 'Something went wrong.' }) } }
const idParam = (req) => Number.parseInt(req.params.id, 10)
const bad = (res) => res.status(400).json({ error: 'Invalid input' })

router.get('/me', (req, res) => res.json({ username: req.admin.username }))

router.get('/reservations', safe((_req, res) => res.json({ items: db.listReservations() })))
const reservationPatch = z.object({
  status: z.enum(['pending', 'confirmed', 'declined', 'cancelled', 'completed']).optional(),
  staffNotes: z.string().max(2000).optional(),
}).refine((v) => v.status !== undefined || v.staffNotes !== undefined)
router.patch('/reservations/:id', safe((req, res) => {
  const parsed = reservationPatch.safeParse(req.body)
  if (!parsed.success || !Number.isInteger(idParam(req))) return bad(res)
  try {
    const item = db.updateReservation(idParam(req), parsed.data)
    item ? res.json({ item }) : res.status(404).json({ error: 'Not found' })
  } catch (err) {
    if (err instanceof db.AvailabilityError) return res.status(409).json({ error: err.message })
    throw err
  }
}))

router.get('/messages', safe((_req, res) => res.json({ items: db.listMessages() })))
router.patch('/messages/:id', safe((req, res) => {
  if (typeof req.body?.handled !== 'boolean' || !Number.isInteger(idParam(req))) return bad(res)
  db.setMessageHandled(idParam(req), req.body.handled) ? res.json({ ok: true }) : res.status(404).json({ error: 'Not found' })
}))

router.get('/rooms', safe((_req, res) => res.json({ items: db.listRooms({ includeInactive: true }) })))
const roomPatch = z.object({
  name: z.string().trim().min(2).max(100), description: z.string().trim().min(1).max(1000),
  price: z.number().int().min(0).max(1000000), units: z.number().int().min(1).max(100), active: z.boolean(),
}).partial()
router.patch('/rooms/:id', safe((req, res) => {
  const parsed = roomPatch.safeParse(req.body)
  if (!parsed.success) return bad(res)
  const item = db.updateRoom(req.params.id, parsed.data)
  item ? res.json({ item }) : res.status(404).json({ error: 'Not found' })
}))

export default router
