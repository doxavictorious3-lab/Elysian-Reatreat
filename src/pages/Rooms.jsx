import { useState } from 'react'
import usePageTitle from '../hooks/usePageTitle.js'
import useRooms from '../hooks/useRooms.js'
import SectionHeading from '../components/SectionHeading.jsx'
import RoomGrid from '../components/RoomGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import LoadingState from '../components/LoadingState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
export default function Rooms() {
  usePageTitle('Rooms and suites', 'Browse rooms, suites and villas at Elysian Retreat.')
  const { rooms, loading, error } = useRooms()
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(rooms.map((r) => r.category))]
  const list = cat === 'All' ? rooms : rooms.filter((r) => r.category === cat)
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <SectionHeading title="Rooms and suites" subtitle="Prices shown are sample pricing for demonstration." />
      {loading ? <LoadingState label="Loading rooms…" /> : error ? <ErrorMessage>We could not load the rooms. Please try again shortly.</ErrorMessage> : (
        <>
          <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {cats.map((c) => <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm ${cat === c ? 'border-forest bg-forest text-ivory' : 'border-charcoal/25'}`}>{c}</button>)}
          </div>
          {list.length ? <RoomGrid rooms={list} /> : <EmptyState title="No rooms found" actionTo="/booking" actionLabel="Send an enquiry" />}
        </>
      )}
    </section>
  )
}
