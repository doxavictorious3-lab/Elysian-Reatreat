import usePageTitle from '../hooks/usePageTitle.js'
import AboutHero from '../components/about/AboutHero.jsx'
import StorySection from '../components/about/StorySection.jsx'
import PhilosophySection from '../components/about/PhilosophySection.jsx'
import MissionVision from '../components/about/MissionVision.jsx'
import ValuesSection from '../components/about/ValuesSection.jsx'
import ExperienceSection from '../components/about/ExperienceSection.jsx'
import AboutCTA from '../components/about/AboutCTA.jsx'
import { tagline } from '../data/aboutContent.js'

// Brand colours for this page only. The rest of the site keeps its own tokens from index.css.
const brand = { '--a-green': '#173D32', '--a-ivory': '#F4EBDD', '--a-ivory-soft': '#FAF6EE', '--a-gold': '#D8C8A9' }

export default function About() {
  usePageTitle('About', `${tagline} The story, philosophy and values behind Elysian Retreat.`)
  return (
    <div style={brand} className="overflow-x-clip">
      <AboutHero />
      <StorySection />
      <PhilosophySection />
      <MissionVision />
      <ValuesSection />
      <ExperienceSection />
      <AboutCTA />
    </div>
  )
}
