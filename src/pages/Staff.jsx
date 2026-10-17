import { useCallback, useEffect, useState } from 'react'
import usePageTitle from '../hooks/usePageTitle.js'
import Button from '../components/Button.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import LoadingState from '../components/LoadingState.jsx'
import { inputClass } from '../components/FormField.jsx'

const API = `${import.meta.env.VITE_API_URL || ''}/api/admin`
const KEY = 'staff-token'

async function call(path, token, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
  })
  const body = await res.json().catch(() => ({}))
  if (res.status === 401 && token) throw Object.assign(new Error('Session expired'), { auth: true })
  if (!res.ok) throw new Error(body.error || 'Request failed')
  return body
}
const patch = (path, token, data) => call(path, token, { method: 'PATCH', body: JSON.stringify(data) })
const when = (iso) => new Date(iso).toLocaleString()

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  async function submit(e) {
    e.preventDefault(); setError('')
    try { const { token } = await call('/login', null, { method: 'POST', body: JSON.stringify(form) }); onLogin(token) }
    catch (err) { setError(err.message) }
  }
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 px-5 py-24">
      <h1 className="font-display text-4xl">Staff sign in</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div><label htmlFor="u" className="mb-1 block text-sm font-medium">Username</label>
        <input id="u" autoComplete="username" className={inputClass} value={form.username} onChange={set('username')} /></div>
      <div><label htmlFor="p" className="mb-1 block text-sm font-medium">Password</label>
        <input id="p" type="password" autoComplete="current-password" className={inputClass} value={form.password} onChange={set('password')} /></div>
      <Button type="submit" variant="dark">Sign in</Button>
    </form>
  )
}

const STATUS_STYLE = { pending: 'bg-gold/30', confirmed: 'bg-forest text-ivory', declined: 'bg-charcoal/15', cancelled: 'bg-charcoal/15', completed: 'bg-forest/15' }
const ACTIONS = {
  pending: [['confirmed', 'Confirm'], ['declined', 'Decline']],
  confirmed: [['completed', 'Mark completed'], ['cancelled', 'Cancel']],
  declined: [['pending', 'Reopen']], cancelled: [['pending', 'Reopen']], completed: [],
}

function ReservationCard({ r, onUpdate }) {
  const [notes, setNotes] = useState(r.staffNotes)
  const nights = Math.round((new Date(r.checkOut) - new Date(r.checkIn)) / 86400000)
  return (
    <li className="rounded-2xl bg-white p-5">
      <div className="flex flex-wrap items-center gap-3">
        <strong>{r.reference}</strong>
        <span className={`rounded-full px-3 py-1 text-xs ${STATUS_STYLE[r.status]}`}>{r.status}</span>
        <span className="text-sm text-charcoal/60">received {when(r.createdAt)}</span>
      </div>
      <p className="mt-2 font-semibold">{r.guest.name} <a className="font-normal text-forest underline" href={`mailto:${r.guest.email}`}>{r.guest.email}</a>{r.guest.phone ? ` · ${r.guest.phone}` : ''}</p>
      <p className="mt-1">{r.room.name}: {r.checkIn} to {r.checkOut} ({nights} night{nights === 1 ? '' : 's'}), {r.adults} adult(s), {r.children} child(ren)</p>
      <p className="text-sm text-charcoal/70">Estimate: ${r.nightlyRate * nights} at ${r.nightlyRate} per night (sample pricing)</p>
      {r.requests && <p className="mt-2 whitespace-pre-wrap text-charcoal/80">Requests: {r.requests}</p>}
      <label htmlFor={`n${r.id}`} className="mt-3 block text-sm font-medium">Staff notes</label>
      <textarea id={`n${r.id}`} rows="2" className={inputClass} value={notes} onChange={(e) => setNotes(e.target.value)} />
      <div className="mt-3 flex flex-wrap gap-2">
        {notes !== r.staffNotes && <Button variant="outline" className="!py-2" onClick={() => onUpdate(r.id, { staffNotes: notes })}>Save notes</Button>}
        {ACTIONS[r.status].map(([status, label]) => <Button key={status} variant={status === 'confirmed' ? 'dark' : 'outline'} className="!py-2" onClick={() => onUpdate(r.id, { status })}>{label}</Button>)}
      </div>
    </li>
  )
}

function RoomEditor({ room, onSave }) {
  const [f, setF] = useState({ name: room.name, description: room.description, price: room.price, units: room.units, active: room.active })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
  return (
    <li className="rounded-2xl bg-white p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium">Name<input className={inputClass} value={f.name} onChange={set('name')} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium">Price per night<input type="number" min="0" className={inputClass} value={f.price} onChange={set('price')} /></label>
          <label className="text-sm font-medium">Rooms of this type<input type="number" min="1" className={inputClass} value={f.units} onChange={set('units')} /></label>
        </div>
      </div>
      <label className="mt-3 block text-sm font-medium">Description<textarea rows="2" className={inputClass} value={f.description} onChange={set('description')} /></label>
      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.active} onChange={set('active')} />Shown on the website</label>
        <Button variant="dark" className="!py-2" onClick={() => onSave(room.id, { ...f, price: Number(f.price), units: Number(f.units) })}>Save</Button>
      </div>
    </li>
  )
}

function Dashboard({ token, onLogout }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [tab, setTab] = useState('reservations')
  const [status, setStatus] = useState('pending')

  const fail = useCallback((err) => (err.auth ? onLogout() : setError(err.message)), [onLogout])
  const load = useCallback(async () => {
    try {
      const [r, m, rooms] = await Promise.all([call('/reservations', token), call('/messages', token), call('/rooms', token)])
      setData({ reservations: r.items, messages: m.items, rooms: rooms.items }); setError('')
    } catch (err) { fail(err) }
  }, [token, fail])
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t) }, [load])

  const run = (promise) => promise.then(() => load()).catch(fail)
  const updateReservation = (id, body) => { setError(''); return run(patch(`/reservations/${id}`, token, body)) }
  const toggleMessage = (m) => run(patch(`/messages/${m.id}`, token, { handled: !m.handled }))
  const saveRoom = (id, body) => { setError(''); return run(patch(`/rooms/${id}`, token, body)) }

  if (!data) return error ? <div className="p-8"><ErrorMessage>{error}</ErrorMessage></div> : <LoadingState />
  const pending = data.reservations.filter((r) => r.status === 'pending').length
  const unread = data.messages.filter((m) => !m.handled).length
  const shown = status === 'all' ? data.reservations : data.reservations.filter((r) => r.status === status)
  const pill = (on) => `rounded-full border px-4 py-2 text-sm ${on ? 'border-forest bg-forest text-ivory' : 'border-charcoal/25'}`

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">Staff area</h1>
        <div className="flex gap-2"><Button variant="outline" onClick={load}>Refresh</Button><Button variant="outline" onClick={onLogout}>Sign out</Button></div>
      </div>
      {error && <div className="mt-4"><ErrorMessage>{error}</ErrorMessage></div>}
      <div className="my-6 flex flex-wrap gap-2" role="tablist">
        <button role="tab" aria-selected={tab === 'reservations'} className={pill(tab === 'reservations')} onClick={() => setTab('reservations')}>Reservations ({pending} pending)</button>
        <button role="tab" aria-selected={tab === 'messages'} className={pill(tab === 'messages')} onClick={() => setTab('messages')}>Messages ({unread} new)</button>
        <button role="tab" aria-selected={tab === 'rooms'} className={pill(tab === 'rooms')} onClick={() => setTab('rooms')}>Rooms</button>
      </div>

      {tab === 'reservations' && (
        <>
          <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter by status">
            {['pending', 'confirmed', 'completed', 'declined', 'cancelled', 'all'].map((s) => <button key={s} aria-pressed={status === s} className={pill(status === s)} onClick={() => setStatus(s)}>{s[0].toUpperCase() + s.slice(1)}</button>)}
          </div>
          {shown.length === 0 ? <p className="py-12 text-center text-charcoal/60">Nothing to show.</p>
            : <ul className="space-y-4">{shown.map((r) => <ReservationCard key={r.id} r={r} onUpdate={updateReservation} />)}</ul>}
        </>
      )}

      {tab === 'messages' && (data.messages.length === 0 ? <p className="py-12 text-center text-charcoal/60">No messages yet.</p> : (
        <ul className="space-y-4">
          {data.messages.map((m) => (
            <li key={m.id} className={`rounded-2xl bg-white p-5 ${m.handled ? 'opacity-60' : ''}`}>
              <p className="text-sm text-charcoal/60">{when(m.createdAt)}{m.handled ? ' · handled' : ''}</p>
              <p className="mt-1 font-semibold">{m.name} <a className="font-normal text-forest underline" href={`mailto:${m.email}`}>{m.email}</a>{m.phone ? ` · ${m.phone}` : ''}</p>
              <p className="mt-2"><strong>{m.subject}</strong></p>
              <p className="whitespace-pre-wrap text-charcoal/80">{m.message}</p>
              <Button variant="outline" className="mt-4 !py-2" onClick={() => toggleMessage(m)}>{m.handled ? 'Mark as new' : 'Mark as handled'}</Button>
            </li>
          ))}
        </ul>
      ))}

      {tab === 'rooms' && (
        <>
          <p className="mb-4 text-sm text-charcoal/70">Changes appear on the public website straight away. "Rooms of this type" is how many can be booked for the same dates; confirming a reservation is blocked when none are free.</p>
          <ul className="space-y-4">{data.rooms.map((rm) => <RoomEditor key={`${rm.id}-${rm.name}-${rm.price}-${rm.units}-${rm.active}`} room={rm} onSave={saveRoom} />)}</ul>
        </>
      )}
    </section>
  )
}

export default function Staff() {
  usePageTitle('Staff')
  const [token, setToken] = useState(() => sessionStorage.getItem(KEY))
  useEffect(() => {
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex, nofollow'
    document.head.appendChild(m); return () => m.remove()
  }, [])
  const login = (t) => { sessionStorage.setItem(KEY, t); setToken(t) }
  const logout = useCallback(() => { sessionStorage.removeItem(KEY); setToken(null) }, [])
  return token ? <Dashboard token={token} onLogout={logout} /> : <Login onLogin={login} />
}
