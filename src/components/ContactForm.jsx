import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, submitForm } from '../utils/validation.js'
import FormField, { inputClass } from './FormField.jsx'
import Button from './Button.jsx'
import ErrorMessage from './ErrorMessage.jsx'
export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(contactSchema) })
  const [status, setStatus] = useState('idle')
  async function onSubmit(data) {
    setStatus('idle')
    try { await submitForm('contact', data); reset(); setStatus('success') } catch { setStatus('error') }
  }
  const f = (name) => ({ id: name, className: inputClass, 'aria-invalid': !!errors[name], ...register(name) })
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === 'success' && <p role="status" className="rounded-lg bg-forest/10 p-4 text-forest">Thank you. Your message has been sent and we will reply soon.</p>}
      {status === 'error' && <ErrorMessage>We could not send your message. Please try again.</ErrorMessage>}
      <FormField label="Name" name="name" error={errors.name?.message}><input {...f('name')} /></FormField>
      <FormField label="Email" name="email" error={errors.email?.message}><input type="email" {...f('email')} /></FormField>
      <FormField label="Phone" name="phone" optional><input type="tel" {...f('phone')} /></FormField>
      <FormField label="Subject" name="subject" error={errors.subject?.message}><input {...f('subject')} /></FormField>
      <FormField label="Message" name="message" error={errors.message?.message}><textarea rows="5" {...f('message')} /></FormField>
      <Button type="submit" variant="dark" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'}</Button>
    </form>
  )
}
