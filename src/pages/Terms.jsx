import Legal from './Legal.jsx'
export default function Terms() {
  return <Legal title="Terms and conditions" sections={[
    { h: 'Enquiries', p: 'Enquiries sent through this site are requests, not confirmed reservations.' },
    { h: 'Rates', p: 'Describe your real pricing, taxes, deposits and cancellation policy.' },
    { h: 'Use of this site', p: 'Describe acceptable use and liability limits.' },
  ]} />
}
