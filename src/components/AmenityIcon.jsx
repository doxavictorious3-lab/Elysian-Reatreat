import { Wifi, Coffee, Snowflake, Waves, Dumbbell, Car, Flower2, Utensils } from 'lucide-react'
const map = {
  wifi: [Wifi, 'Wi-Fi'], breakfast: [Coffee, 'Breakfast'], aircon: [Snowflake, 'Air conditioning'], pool: [Waves, 'Pool access'],
  gym: [Dumbbell, 'Fitness room'], parking: [Car, 'Free parking'], spa: [Flower2, 'Spa treatments'], restaurant: [Utensils, 'Restaurant'],
}
export default function AmenityIcon({ type }) {
  const [Icon, label] = map[type] || []
  if (!Icon) return null
  return <span className="inline-flex items-center gap-2 text-sm"><Icon size={18} aria-hidden="true" />{label}</span>
}
