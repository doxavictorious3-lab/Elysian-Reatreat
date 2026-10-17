import nodemailer from 'nodemailer'
import crypto from 'node:crypto'
import { mkdir, appendFile, readFile, writeFile, rename } from 'node:fs/promises'
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env
const transport = SMTP_HOST ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined }) : null
const FILE = 'data/submissions.jsonl'

// Saves every submission to server/data/ (personal data: protect and delete per your privacy policy)
export async function save(type, data) {
  await mkdir('data', { recursive: true })
  const record = { id: crypto.randomUUID(), type, at: new Date().toISOString(), handled: false, data }
  await appendFile(FILE, JSON.stringify(record) + '\n')
}
// Sends plain-text email to the resort team when SMTP is configured
export async function notify(subject, lines, replyTo) {
  if (!transport) return
  await transport.sendMail({ from: MAIL_FROM, to: MAIL_TO, replyTo, subject, text: lines.join('\n') })
}
// Reads all saved submissions (older records without an id get a stable one from their position)
export async function readAll() {
  let raw = ''
  try { raw = await readFile(FILE, 'utf8') } catch (e) { if (e.code === 'ENOENT') return []; throw e }
  return raw.split('\n').filter(Boolean).flatMap((line, i) => {
    try { const r = JSON.parse(line); return [{ handled: false, ...r, id: r.id || `old-${i}` }] } catch { return [] }
  })
}
export async function setHandled(id, handled) {
  const all = await readAll()
  const rec = all.find((r) => r.id === id)
  if (!rec) return false
  rec.handled = handled
  await writeFile(FILE + '.tmp', all.map((r) => JSON.stringify(r)).join('\n') + '\n')
  await rename(FILE + '.tmp', FILE)
  return true
}
