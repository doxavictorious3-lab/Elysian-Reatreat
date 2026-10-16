import { img } from './site.js'
// All prices are SAMPLE pricing only.
export const rooms = [
  { id: 'garden-room', name: 'Garden Room', category: 'Room', image: img('elysian-garden'),
    description: 'A calm room opening onto a private patio and the resort gardens.',
    maxGuests: 2, bed: 'King bed', amenities: ['wifi', 'breakfast', 'aircon'], samplePrice: 180 },
  { id: 'pool-suite', name: 'Pool Suite', category: 'Suite', image: img('elysian-pool'),
    description: 'A spacious suite with a lounge area and steps to the main pool.',
    maxGuests: 3, bed: 'King bed + sofa bed', amenities: ['wifi', 'breakfast', 'aircon', 'pool'], samplePrice: 290 },
  { id: 'family-villa', name: 'Family Villa', category: 'Villa', image: img('elysian-villa'),
    description: 'Two bedrooms, a shaded terrace and a small kitchenette for longer stays.',
    maxGuests: 5, bed: '1 king + 2 twin beds', amenities: ['wifi', 'breakfast', 'aircon', 'pool'], samplePrice: 420 },
]
export const getRoom = (id) => rooms.find((r) => r.id === id)
