import 'dotenv/config'
import readline from 'node:readline'
import { saveAdmin, findAdmin } from './db.js'
import { hashPassword } from './auth.js'

// One input stream for the whole script. In a terminal, typed passwords are hidden.
const tty = !!process.stdin.isTTY
let rl, queued
if (tty) {
  rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
} else {
  const chunks = []
  for await (const c of process.stdin) chunks.push(c)
  queued = Buffer.concat(chunks).toString().split('\n')
}
function ask(prompt, hidden = false) {
  if (!tty) return Promise.resolve((queued.shift() ?? '').replace(/\r$/, ''))
  return new Promise((resolve) => {
    let muted = false
    rl._writeToOutput = (s) => { if (!muted) process.stdout.write(s) }
    rl.question(prompt, (answer) => { if (hidden) process.stdout.write('\n'); resolve(answer) })
    muted = hidden
  })
}

const username = (process.argv[2] || await ask('Username: ')).trim().toLowerCase()
if (!/^[a-z0-9._-]{3,32}$/.test(username)) { console.error('Username must be 3-32 letters, numbers, dots, dashes or underscores.'); process.exit(1) }
const existing = !!findAdmin(username)
const pw = await ask(existing ? 'New password (replaces the old one): ' : 'Password: ', true)
if (pw.length < 12) { console.error('Password must be at least 12 characters.'); process.exit(1) }
if (pw !== await ask('Repeat password: ', true)) { console.error('Passwords do not match.'); process.exit(1) }
saveAdmin(username, hashPassword(pw))
console.log(existing ? `Password updated for ${username}.` : `Admin user ${username} created.`)
rl?.close()
