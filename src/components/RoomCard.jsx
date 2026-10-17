import { Link } from 'react-router-dom'
import { Users, BedDouble } from 'lucide-react'
export default function RoomCard({ room }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white">
      <Link to={`/rooms/${room.id}`} aria-label={`View ${room.name}`}>
        <img src={room.image} alt={`${room.name} (sample photo)`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-6">
        <p className="text-sm text-gold">{room.category}</p>
        <h3 className="font-display text-2xl">{room.name}</h3>
        <p className="mt-2 text-charcoal/70">{room.description}</p>
        <p className="mt-4 flex gap-4 text-sm text-charcoal/70">
          <span className="flex items-center gap-1"><Users size={16} />Up to {room.maxGuests}</span>
          <span className="flex items-center gap-1"><BedDouble size={16} />{room.bed}</span>
        </p>
        <p className="mt-4 font-semibold">From ${room.price} <span className="text-sm font-normal text-charcoal/60">per night (sample pricing)</span></p>
      </div>
    </article>
  )
}
