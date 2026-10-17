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
  if (res.status === 401) throw Object.assign(new Error('auth'), { auth: true })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.error || 'Request failed')
  return body
}

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  async function submit(e) {
    e.preventDefault(); setError('')
    try { const { token } = await call('/login', null, { method: 'POST', body: JSON.stringify({ password }) }); onLogin(token) }
    catch (err) { setError(err.message === 'auth' ? 'Wrong password.' : err.message) }
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 px-5 py-24">
      <h1 className="font-display text-4xl">Staff sign in</h1>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <label htmlFor="pw" className="block text-sm font-medium">Password</label>
      <input id="pw" type="password" autoComplete="current-password" className={inputClass} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="dark">Sign in</Button>
    </form>
  )
}

function Summary({ item }) {
  const d = item.data
  if (item.type === 'booking') return <p>{d.roomId}: {d.checkIn} to {d.checkOut}, {d.adults} adult(s), {d.children} child(ren){d.requests ? `. Requests: ${d.requests}` : ''}</p>
  if (item.type === 'contact') return <p><strong>{d.subject}</strong><br />{d.message}</p>
  return <p>Newsletter signup</p>
}

function Dashboard({ token, onLogout }) {
  const [items, setItems] = useState(null)
  const [error, setError] = useState('')
  const [type, setType] = useState('all')
  const [onlyNew, setOnlyNew] = useState(true)

  const load = useCallback(async () => {
    try { setItems((await call('/submissions', token)).items); setError('') }
    catch (err) { err.auth ? onLogout() : setError(err.message) }
  }, [token, onLogout])
  useEffect(() => { load(); const t = setInterval(load, 60000); return () => clearInterval(t) }, [load])

  async function toggle(item) {
    try { await call(`/submissions/${item.id}`, token, { method: 'PATCH', body: JSON.stringify({ handled: !item.handled }) }); load() }
    catch (err) { err.auth ? onLogout() : setError(err.message) }
  }
  if (!items) return error ? <div className="p-8"><ErrorMessage>{error}</ErrorMessage></div> : <LoadingState />
  const shown = items.filter((i) => (type === 'all' || i.type === type) && (!onlyNew || !i.handled))
  const waiting = items.filter((i) => !i.handled && i.type !== 'newsletter').length
  const pill = (active) => `rounded-full border px-4 py-2 text-sm ${active ? 'border-forest bg-forest text-ivory' : 'border-charcoal/25'}`

  return (
    <section className="mx-auto max-w-4xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-4xl">Enquiries <span className="text-lg text-charcoal/60">({waiting} awaiting a reply)</span></h1>
        <div className="flex gap-2"><Button variant="outline" onClick={load}>Refresh</Button><Button variant="outline" onClick={onLogout}>Sign out</Button></div>
      </div>
      {error && <div className="mt-4"><ErrorMessage>{error}</ErrorMessage></div>}
      <div className="my-6 flex flex-wrap gap-2" role="group" aria-label="Filters">
        {['all', 'booking', 'contact', 'newsletter'].map((t) => <button key={t} aria-pressed={type === t} onClick={() => setType(t)} className={pill(type === t)}>{t[0].toUpperCase() + t.slice(1)}</button>)}
        <label className="ml-auto flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} />Hide handled</label>
      </div>
      {shown.length === 0 ? <p className="py-12 text-center text-charcoal/60">Nothing to show.</p> : (
        <ul className="space-y-4">
          {shown.map((i) => (
            <li key={i.id} className={`rounded-2xl bg-white p-5 ${i.handled ? 'opacity-60' : ''}`}>
              <p className="text-sm text-charcoal/60">{i.type} · {new Date(i.at).toLocaleString()}{i.handled ? ' · handled' : ''}</p>
              <p className="mt-1 font-semibold">{i.data.name || ''} <a className="font-normal text-forest underline" href={`mailto:${i.data.email}`}>{i.data.email}</a>{i.data.phone ? ` · ${i.data.phone}` : ''}</p>
              <div className="mt-2 whitespace-pre-wrap text-charcoal/80"><Summary item={i} /></div>
              <Button variant="outline" className="mt-4 !py-2" onClick={() => toggle(i)}>{i.handled ? 'Mark as new' : 'Mark as handled'}</Button>
            </li>
          ))}
        </ul>
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
