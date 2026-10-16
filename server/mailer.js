import nodemailer from 'nodemailer'
import { mkdir, appendFile } from 'node:fs/promises'
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env
const transport = SMTP_HOST ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined }) : null

// Saves every submission to server/data/ (personal data: protect and delete per your privacy policy)
export async function save(type, data) {
  await mkdir('data', { recursive: true })
  await appendFile('data/submissions.jsonl', JSON.stringify({ type, at: new Date().toISOString(), data }) + '\n')
}
// Sends plain-text email to the resort team when SMTP is configured
export async function notify(subject, lines, replyTo) {
  if (!transport) return
  await transport.sendMail({ from: MAIL_FROM, to: MAIL_TO, replyTo, subject, text: lines.join('\n') })
}
