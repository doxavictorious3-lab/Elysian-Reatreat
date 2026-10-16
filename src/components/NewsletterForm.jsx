import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, submitForm } from '../utils/validation.js'
import FormField, { inputClass } from './FormField.jsx'
import Button from './Button.jsx'
import ToastNotification from './ToastNotification.jsx'
export default function NewsletterForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(newsletterSchema) })
  const [toast, setToast] = useState({ message: '', type: 'success' })
  async function onSubmit(data) {
    try { await submitForm('newsletter', data); reset(); setToast({ message: 'Thanks for subscribing.', type: 'success' }) }
    catch { setToast({ message: 'Something went wrong. Try again.', type: 'error' }) }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-md flex-col gap-3 sm:flex-row sm:items-start">
      <div className="flex-1">
        <FormField label="Email address" name="email" error={errors.email?.message}>
          <input id="email" type="email" className={inputClass} aria-invalid={!!errors.email} {...register('email')} />
        </FormField>
      </div>
      <Button type="submit" disabled={isSubmitting} className="sm:mt-6">{isSubmitting ? 'Joining…' : 'Join the list'}</Button>
      <ToastNotification {...toast} onClose={() => setToast({ message: '' })} />
    </form>
  )
}
