import RoomCard from './RoomCard.jsx'
export default function RoomGrid({ rooms }) {
  return <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{rooms.map((r) => <RoomCard key={r.id} room={r} />)}</div>
}
