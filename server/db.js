import { DatabaseSync } from 'node:sqlite' // built into Node 22.13+, no extra install needed
import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { seedRooms } from './seedRooms.js'

const file = process.env.DB_PATH || 'data/elysian.db'
mkdirSync(dirname(file), { recursive: true })
export const db = new DatabaseSync(file)
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;')

const NOW = "strftime('%Y-%m-%dT%H:%M:%SZ','now')"
db.exec(`
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL,
  max_guests INTEGER NOT NULL, bed TEXT NOT NULL, amenities TEXT NOT NULL DEFAULT '[]',
  price_per_night INTEGER NOT NULL, units INTEGER NOT NULL DEFAULT 1, image TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, phone TEXT,
  created_at TEXT NOT NULL DEFAULT (${NOW})
);
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guest_id INTEGER NOT NULL REFERENCES guests(id),
  room_id TEXT NOT NULL REFERENCES rooms(id),
  check_in TEXT NOT NULL, check_out TEXT NOT NULL,
  adults INTEGER NOT NULL, children INTEGER NOT NULL DEFAULT 0,
  requests TEXT, nightly_rate INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','declined','cancelled','completed')),
  staff_notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (${NOW}), updated_at TEXT NOT NULL DEFAULT (${NOW}),
  CHECK (check_out > check_in)
);
CREATE INDEX IF NOT EXISTS idx_res_room_dates ON reservations(room_id, check_in, check_out);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
  subject TEXT NOT NULL, message TEXT NOT NULL, handled INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (${NOW})
);
CREATE TABLE IF NOT EXISTS subscribers (email TEXT PRIMARY KEY, created_at TEXT NOT NULL DEFAULT (${NOW}));
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (${NOW})
);
`)

if (db.prepare('SELECT COUNT(*) AS n FROM rooms').get().n === 0) {
  const ins = db.prepare('INSERT INTO rooms (id,name,category,description,max_guests,bed,amenities,price_per_night,units,image) VALUES (?,?,?,?,?,?,?,?,?,?)')
  for (const r of seedRooms) ins.run(r.id, r.name, r.category, r.description, r.maxGuests, r.bed, JSON.stringify(r.amenities), r.price, r.units, r.image)
}

// ---------- rooms ----------
const toRoom = (r) => ({ id: r.id, name: r.name, category: r.category, description: r.description, maxGuests: r.max_guests, bed: r.bed, amenities: JSON.parse(r.amenities), price: r.price_per_night, units: r.units, image: r.image, active: !!r.active })
export const listRooms = ({ includeInactive = false } = {}) =>
  db.prepare(`SELECT * FROM rooms ${includeInactive ? '' : 'WHERE active = 1'} ORDER BY price_per_night, name`).all().map(toRoom)
export const getRoom = (id) => { const r = db.prepare('SELECT * FROM rooms WHERE id = ?').get(id); return r ? toRoom(r) : null }
const ROOM_COLUMNS = { name: 'name', category: 'category', description: 'description', bed: 'bed', maxGuests: 'max_guests', price: 'price_per_night', units: 'units', image: 'image', active: 'active' }
export function updateRoom(id, patch) {
  const sets = [], vals = []
  for (const [key, col] of Object.entries(ROOM_COLUMNS)) {
    if (key in patch) { sets.push(`${col} = ?`); vals.push(key === 'active' ? (patch.active ? 1 : 0) : patch[key]) }
  }
  if (sets.length && !db.prepare(`UPDATE rooms SET ${sets.join(', ')} WHERE id = ?`).run(...vals, id).changes) return null
  return getRoom(id)
}

// ---------- reservations ----------
export class AvailabilityError extends Error {}
export const referenceFor = (id) => `ER-${String(id).padStart(5, '0')}`
const BASE = `SELECT r.id, r.status, r.check_in, r.check_out, r.adults, r.children, r.requests, r.staff_notes, r.nightly_rate, r.created_at, r.updated_at,
  g.id AS guest_id, g.name AS guest_name, g.email AS guest_email, g.phone AS guest_phone, rm.id AS room_id, rm.name AS room_name
  FROM reservations r JOIN guests g ON g.id = r.guest_id JOIN rooms rm ON rm.id = r.room_id`
const toReservation = (r) => ({
  id: r.id, reference: referenceFor(r.id), status: r.status, checkIn: r.check_in, checkOut: r.check_out, adults: r.adults, children: r.children,
  requests: r.requests || '', staffNotes: r.staff_notes, nightlyRate: r.nightly_rate, createdAt: r.created_at, updatedAt: r.updated_at,
  guest: { id: r.guest_id, name: r.guest_name, email: r.guest_email, phone: r.guest_phone || '' }, room: { id: r.room_id, name: r.room_name },
})
export const listReservations = () => db.prepare(`${BASE} ORDER BY r.created_at DESC, r.id DESC`).all().map(toReservation)
export const getReservation = (id) => { const r = db.prepare(`${BASE} WHERE r.id = ?`).get(id); return r ? toReservation(r) : null }

export function createReservation(d, nightlyRate) {
  const email = d.email.toLowerCase()
  db.exec('BEGIN')
  try {
    db.prepare(`INSERT INTO guests (name, email, phone) VALUES (?, ?, ?)
      ON CONFLICT(email) DO UPDATE SET name = excluded.name, phone = COALESCE(excluded.phone, guests.phone)`).run(d.name, email, d.phone || null)
    const guest = db.prepare('SELECT id FROM guests WHERE email = ?').get(email)
    const info = db.prepare(`INSERT INTO reservations (guest_id, room_id, check_in, check_out, adults, children, requests, nightly_rate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(guest.id, d.roomId, d.checkIn, d.checkOut, d.adults, d.children, d.requests || null, nightlyRate)
    db.exec('COMMIT')
    return Number(info.lastInsertRowid)
  } catch (err) { db.exec('ROLLBACK'); throw err }
}

// Changes status and/or notes. Confirming checks that the room still has a free unit for those dates.
export function updateReservation(id, { status, staffNotes }) {
  db.exec('BEGIN IMMEDIATE')
  try {
    const cur = db.prepare('SELECT r.*, rm.units FROM reservations r JOIN rooms rm ON rm.id = r.room_id WHERE r.id = ?').get(id)
    if (!cur) { db.exec('ROLLBACK'); return null }
    if (status === 'confirmed' && cur.status !== 'confirmed') {
      const { n } = db.prepare(`SELECT COUNT(*) AS n FROM reservations
        WHERE room_id = ? AND status = 'confirmed' AND id != ? AND check_in < ? AND check_out > ?`).get(cur.room_id, id, cur.check_out, cur.check_in)
      if (n >= cur.units) throw new AvailabilityError('No availability for those dates')
    }
    db.prepare(`UPDATE reservations SET status = COALESCE(?, status), staff_notes = COALESCE(?, staff_notes), updated_at = ${NOW} WHERE id = ?`)
      .run(status ?? null, staffNotes ?? null, id)
    db.exec('COMMIT')
    return getReservation(id)
  } catch (err) { db.exec('ROLLBACK'); throw err }
}

// ---------- messages and newsletter ----------
export const addMessage = (m) => db.prepare('INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)').run(m.name, m.email.toLowerCase(), m.phone || null, m.subject, m.message)
export const listMessages = () => db.prepare('SELECT * FROM messages ORDER BY created_at DESC, id DESC').all().map((m) => ({ id: m.id, name: m.name, email: m.email, phone: m.phone || '', subject: m.subject, message: m.message, handled: !!m.handled, createdAt: m.created_at }))
export const setMessageHandled = (id, handled) => db.prepare('UPDATE messages SET handled = ? WHERE id = ?').run(handled ? 1 : 0, id).changes > 0
export const addSubscriber = (email) => db.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)').run(email.toLowerCase())

// ---------- admin users ----------
export const findAdmin = (username) => db.prepare('SELECT * FROM admins WHERE username = ?').get(username)
export const getAdminById = (id) => db.prepare('SELECT id, username FROM admins WHERE id = ?').get(id)
export const countAdmins = () => db.prepare('SELECT COUNT(*) AS n FROM admins').get().n
export const saveAdmin = (username, hash) => db.prepare(`INSERT INTO admins (username, password_hash) VALUES (?, ?)
  ON CONFLICT(username) DO UPDATE SET password_hash = excluded.password_hash`).run(username, hash)
