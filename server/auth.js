import crypto from 'node:crypto'
import { findAdmin, getAdminById } from './db.js'

const SECRET = process.env.ADMIN_TOKEN_SECRET || ''
export const authEnabled = SECRET.length >= 32
const TTL = 8 * 60 * 60 * 1000 // sessions last 8 hours

// Passwords are stored as salted scrypt hashes, never as plain text
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('hex')
  return `scrypt$${salt}$${crypto.scryptSync(pw, salt, 64).toString('hex')}`
}
export function verifyPassword(pw, stored) {
  const [alg, salt, hash] = stored.split('$')
  if (alg !== 'scrypt' || !salt || !hash) return false
  const a = Buffer.from(hash, 'hex'), b = crypto.scryptSync(pw, salt, 64)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}
const DUMMY = hashPassword('timing-dummy') // so unknown usernames take as long as wrong passwords

const sign = (v) => crypto.createHmac('sha256', SECRET).update(v).digest('hex')
const makeToken = (uid) => { const body = `${uid}.${Date.now() + TTL}`; return `${body}.${sign(body)}` }

export function login(username, password) {
  const admin = findAdmin(String(username || '').trim().toLowerCase())
  const ok = verifyPassword(String(password || ''), admin ? admin.password_hash : DUMMY)
  return admin && ok ? makeToken(admin.id) : null
}
// Returns the admin user for a valid, unexpired token, otherwise null
export function adminFromToken(token = '') {
  const [uid, exp, sig] = token.split('.')
  if (!uid || !exp || !sig) return null
  const expected = sign(`${uid}.${exp}`)
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  return Number(exp) > Date.now() ? getAdminById(Number(uid)) || null : null
}
