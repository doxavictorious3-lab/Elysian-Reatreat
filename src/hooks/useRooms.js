import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_API_URL || ''
// Loads the active rooms from the backend database
export default function useRooms() {
  const [state, setState] = useState({ rooms: [], loading: true, error: false })
  useEffect(() => {
    let cancelled = false
    fetch(`${API}/api/rooms`)
      .then((r) => { if (!r.ok) throw new Error('bad response'); return r.json() })
      .then((d) => !cancelled && setState({ rooms: d.rooms, loading: false, error: false }))
      .catch(() => !cancelled && setState({ rooms: [], loading: false, error: true }))
    return () => { cancelled = true }
  }, [])
  return state
}
