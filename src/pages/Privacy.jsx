import Legal from './Legal.jsx'
export default function Privacy() {
  return <Legal title="Privacy policy" sections={[
    { h: 'What we collect', p: 'Describe the information collected through enquiry, contact and newsletter forms.' },
    { h: 'How we use it', p: 'Explain how enquiries are handled and how long data is kept.' },
    { h: 'Your rights', p: 'Explain how guests can access, correct or delete their data, and how to contact you.' },
  ]} />
}
