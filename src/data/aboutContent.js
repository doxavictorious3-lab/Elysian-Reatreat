// All copy for the About page lives here, separate from the components.
// Image seeds feed the placeholder helper in data/site.js. Swap for your own licensed photos.
export const tagline = 'Where Nature Meets Refined Living.'

export const hero = {
  eyebrow: 'OUR STORY · OUR PHILOSOPHY',
  titleLead: 'A Place to Pause.',
  titleAccent: 'A Space to Reconnect.',
  text: 'At Elysian Retreat, we believe true luxury is found in the moments that matter: thoughtful service, peaceful surroundings, exceptional dining, and the freedom to simply be.',
  image: { seed: 'about-hero', alt: 'Sample photo: wide view of resort gardens' },
}

export const story = {
  heading: 'A Different Kind of Escape',
  paragraphs: [
    'Elysian Retreat was created around a simple idea: hospitality should be more than a place to stay. It should be an experience that allows people to slow down, reconnect, and discover the beauty of the present moment.',
    'Inspired by the harmony between nature and contemporary comfort, our resort concept brings together elegant spaces, welcoming service, and memorable experiences. Whether you are planning a peaceful getaway, sharing a meal with loved ones, or celebrating a special occasion, every detail is designed to make your time meaningful.',
  ],
  images: [
    { seed: 'about-story-1', alt: 'Sample photo: a quiet garden path' },
    { seed: 'about-story-2', alt: 'Sample photo: resort architecture among trees' },
  ],
}

export const philosophy = {
  heading: 'Luxury in the Details',
  paragraphs: [
    'We believe the finest hospitality is felt in the details. A warm welcome, a thoughtfully prepared meal, a tranquil setting, and service that anticipates your needs can transform an ordinary visit into an extraordinary memory.',
    'At Elysian Retreat, refinement does not need to be extravagant. It is about comfort without compromise, elegance without excess, and experiences that feel personal.',
  ],
  image: { seed: 'about-philosophy', alt: 'Sample photo: a calm terrace with garden views' },
}

export const missionVision = [
  { id: 'mission', label: 'Our Mission', text: 'To create memorable hospitality experiences through attentive service, thoughtfully designed spaces, and a welcoming atmosphere where every guest feels valued.' },
  { id: 'vision', label: 'Our Vision', text: 'To represent a new expression of boutique hospitality—one that brings together contemporary luxury, a connection to nature, and genuine human connection.' },
]

// icon names are mapped to lucide-react icons in ValuesSection
export const values = {
  heading: 'What We Believe In',
  items: [
    { id: 'hospitality', icon: 'heart', title: 'Exceptional Hospitality', text: 'We believe every guest deserves thoughtful attention, genuine warmth, and service delivered with care.' },
    { id: 'tranquility', icon: 'wind', title: 'Comfort & Tranquility', text: 'We value spaces that invite relaxation, offering a welcome pause from the demands of everyday life.' },
    { id: 'detail', icon: 'sparkles', title: 'Attention to Detail', text: 'From the atmosphere of our spaces to the quality of every experience, we believe small details make a lasting difference.' },
    { id: 'authenticity', icon: 'feather', title: 'Authenticity', text: 'We believe hospitality should feel personal, sincere, and welcoming rather than formal or distant.' },
    { id: 'responsible', icon: 'leaf', title: 'Responsible Living', text: 'We aspire to make considered choices that respect our surroundings, reduce unnecessary waste, and encourage a lasting appreciation for nature.' },
  ],
}

export const experience = {
  heading: 'An Invitation to Live Well',
  paragraphs: [
    'From thoughtfully imagined accommodation and curated dining to relaxing escapes and meaningful celebrations, Elysian Retreat is designed around the experiences people remember long after they leave.',
    'More than a destination, it is an invitation to slow down, reconnect, and enjoy the art of living well.',
  ],
  tiles: [
    { id: 'stay', title: 'Accommodation', text: 'Thoughtfully imagined', seed: 'about-tile-stay', alt: 'Sample photo: a calm bedroom' },
    { id: 'dine', title: 'Dining', text: 'Curated, shared, unhurried', seed: 'about-tile-dine', alt: 'Sample photo: a set dining table' },
    { id: 'escape', title: 'Experiences', text: 'Relaxing escapes', seed: 'about-tile-escape', alt: 'Sample photo: a poolside morning' },
    { id: 'celebrate', title: 'Celebrations', text: 'Meaningful occasions', seed: 'about-tile-celebrate', alt: 'Sample photo: an event table in the garden' },
  ],
  links: [
    { to: '/rooms', label: 'Explore Our Rooms' },
    { to: '/experiences', label: 'Discover Our Experiences' },
    { to: '/contact', label: 'Plan Your Visit' },
  ],
}

export const cta = {
  heading: 'Your Escape Begins Here.',
  text: 'Discover thoughtful hospitality, peaceful surroundings, and experiences designed around you.',
  primary: { to: '/rooms', label: 'Explore Our Rooms' },
  secondary: { to: '/contact', label: 'Contact Us' },
}
