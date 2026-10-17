import nodemailer from 'nodemailer'
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO } = process.env
const transport = SMTP_HOST ? nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 587, auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined }) : null
// Sends a plain-text alert to the resort team when SMTP is configured. The database is the record, email is just a notification.
export async function notify(subject, lines, replyTo) {
  if (!transport) return
  await transport.sendMail({ from: MAIL_FROM, to: MAIL_TO, replyTo, subject, text: lines.join('\n') })
}
