// Starting rooms, inserted only when the rooms table is empty. After that, edit rooms in the staff area.
const p = (seed) => `https://picsum.photos/seed/${seed}/1200/800`
export const seedRooms = [
  { id: 'garden-room', name: 'Garden Room', category: 'Room', image: p('elysian-garden'), description: 'A calm room opening onto a private patio and the resort gardens.', maxGuests: 2, bed: 'King bed', amenities: ['wifi', 'breakfast', 'aircon'], price: 180, units: 4 },
  { id: 'pool-suite', name: 'Pool Suite', category: 'Suite', image: p('elysian-pool'), description: 'A spacious suite with a lounge area and steps to the main pool.', maxGuests: 3, bed: 'King bed + sofa bed', amenities: ['wifi', 'breakfast', 'aircon', 'pool'], price: 290, units: 2 },
  { id: 'family-villa', name: 'Family Villa', category: 'Villa', image: p('elysian-villa'), description: 'Two bedrooms, a shaded terrace and a small kitchenette for longer stays.', maxGuests: 5, bed: '1 king + 2 twin beds', amenities: ['wifi', 'breakfast', 'aircon', 'pool'], price: 420, units: 1 },
]
