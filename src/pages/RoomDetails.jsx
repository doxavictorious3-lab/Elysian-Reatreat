import { useParams } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle.js'
import { getRoom } from '../data/rooms.js'
import AmenityIcon from '../components/AmenityIcon.jsx'
import Button from '../components/Button.jsx'
import EmptyState from '../components/EmptyState.jsx'
export default function RoomDetails() {
  const { id } = useParams()
  const room = getRoom(id)
  usePageTitle(room?.name || 'Room not found', room?.description)
  if (!room) return <EmptyState title="We could not find that room" actionTo="/rooms" actionLabel="See all rooms" />
  return (
    <article className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-2">
      <img src={room.image} alt={`${room.name} (sample photo)`} className="w-full rounded-3xl object-cover" />
      <div>
        <p className="text-gold">{room.category}</p>
        <h1 className="font-display text-5xl">{room.name}</h1>
        <p className="mt-4 text-lg text-charcoal/75">{room.description}</p>
        <p className="mt-4">Sleeps up to {room.maxGuests}. {room.bed}.</p>
        <ul className="mt-6 grid gap-3">{room.amenities.map((a) => <li key={a}><AmenityIcon type={a} /></li>)}</ul>
        <p className="mt-6 text-2xl font-semibold">From ${room.samplePrice} <span className="text-base font-normal text-charcoal/60">per night (sample pricing)</span></p>
        <Button to={`/booking?room=${room.id}`} variant="dark" className="mt-6">Enquire about this room</Button>
      </div>
    </article>
  )
}
