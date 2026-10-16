import usePageTitle from '../hooks/usePageTitle.js'
import EmptyState from '../components/EmptyState.jsx'
export default function NotFound() {
  usePageTitle('Page not found')
  return <EmptyState title="Page not found" text="That page does not exist." />
}
