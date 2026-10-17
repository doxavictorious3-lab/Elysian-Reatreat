import crypto from 'node:crypto'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { readAll, setHandled } from './mailer.js'

const { ADMIN_PASSWORD = '', ADMIN_TOKEN_SECRET = '' } = process.env
const enabled = ADMIN_PASSWORD.length >= 12 && ADMIN_TOKEN_SECRET.length >= 32
if (!enabled) console.warn('Staff area disabled: set ADMIN_PASSWORD (12+ chars) and ADMIN_TOKEN_SECRET (32+ chars) in .env')

const TTL = 8 * 60 * 60 * 1000 // sessions last 8 hours
const hash = (s) => crypto.createHash('sha256').update(String(s)).digest()
const same = (a, b) => crypto.timingSafeEqual(hash(a), hash(b))
const sign = (v) => crypto.createHmac('sha256', ADMIN_TOKEN_SECRET).update(v).digest('hex')
const makeToken = () => { const exp = String(Date.now() + TTL); return `${exp}.${sign(exp)}` }
const validToken = (t = '') => { const [exp, sig] = t.split('.'); return !!exp && !!sig && Number(exp) > Date.now() && same(sig, sign(exp)) }

const router = Router()
router.use((_req, res, next) => (enabled ? next() : res.status(503).json({ error: 'Staff area is not configured.' })))

router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false }), (req, res) => {
  const pw = req.body?.password
  if (typeof pw !== 'string' || !same(pw, ADMIN_PASSWORD)) return res.status(401).json({ error: 'Wrong password.' })
  res.json({ token: makeToken() })
})

router.use((req, res, next) => {
  const t = (req.headers.authorization || '').replace(/^Bearer /, '')
  return validToken(t) ? next() : res.status(401).json({ error: 'Please sign in.' })
})

router.get('/submissions', async (_req, res) => {
  try { res.json({ items: (await readAll()).reverse() }) }
  catch (err) { console.error(err); res.status(500).json({ error: 'Could not read submissions.' }) }
})

router.patch('/submissions/:id', async (req, res) => {
  if (typeof req.body?.handled !== 'boolean') return res.status(400).json({ error: 'Invalid input' })
  try { (await setHandled(req.params.id, req.body.handled)) ? res.json({ ok: true }) : res.status(404).json({ error: 'Not found' }) }
  catch (err) { console.error(err); res.status(500).json({ error: 'Could not update.' }) }
})

export default router
