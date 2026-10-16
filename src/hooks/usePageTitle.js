import { useEffect } from 'react'
export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | Elysian Retreat` : 'Elysian Retreat'
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
