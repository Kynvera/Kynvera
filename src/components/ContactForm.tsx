import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { trackEvent } from '../lib/analytics'

type FormData = {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
  privacyConsent: boolean
  website: string
}

type ValidationErrors = Partial<Record<keyof FormData, string>>

const initialForm: FormData = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  timeline: '',
  message: '',
  privacyConsent: false,
  website: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(form: FormData): ValidationErrors {
  const errors: ValidationErrors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!emailPattern.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  if (!form.projectType) errors.projectType = 'Choose a project type.'
  if (form.message.trim().length < 20) errors.message = 'Please share at least 20 characters.'
  if (!form.privacyConsent) errors.privacyConsent = 'Consent is required to send your message.'
  return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="form-error" id={id} role="alert">{message}</p> : null
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    const selectService = (event: Event) => {
      const serviceName = (event as CustomEvent<string>).detail
      setForm((current) => ({ ...current, projectType: serviceName }))
      setErrors((current) => ({ ...current, projectType: undefined }))
    }
    window.addEventListener('kynvera-service-select', selectService)
    return () => window.removeEventListener('kynvera-service-select', selectService)
  }, [])

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = event.target
    const value = type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value
    const nextForm = { ...form, [name]: value }
    setForm(nextForm)
    if (touched[name as keyof FormData]) setErrors(validateForm(nextForm))
    if (status !== 'idle') setStatus('idle')
  }

  const touchField = (name: keyof FormData) => {
    const nextTouched = { ...touched, [name]: true }
    setTouched(nextTouched)
    setErrors(validateForm(form))
  }

  const formErrors = validateForm(form)
  const isValid = Object.keys(formErrors).length === 0

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, projectType: true, message: true, privacyConsent: true })
    if (Object.keys(nextErrors).length > 0 || form.website) return

    const recipient = import.meta.env.VITE_CONTACT_EMAIL
    if (!recipient) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          projectType: form.projectType,
          budget: form.budget,
          timeline: form.timeline,
          message: form.message,
          _subject: `New Kynvera inquiry from ${form.name}`,
          _captcha: 'true',
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      setForm(initialForm)
      setErrors({})
      setTouched({})
      setStatus('success')
      trackEvent('form_submit')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={submitForm} noValidate>
      <div className="form-grid">
        <label className="form-field">
          <span>Name *</span>
          <input name="name" value={form.name} onChange={updateField} onBlur={() => touchField('name')} aria-invalid={Boolean(touched.name && errors.name)} aria-describedby="name-error" autoComplete="name" />
          <FieldError id="name-error" message={touched.name ? errors.name : undefined} />
        </label>
        <label className="form-field">
          <span>Email *</span>
          <input name="email" type="email" value={form.email} onChange={updateField} onBlur={() => touchField('email')} aria-invalid={Boolean(touched.email && errors.email)} aria-describedby="email-error" autoComplete="email" />
          <FieldError id="email-error" message={touched.email ? errors.email : undefined} />
        </label>
        <label className="form-field">
          <span>Company</span>
          <input name="company" value={form.company} onChange={updateField} autoComplete="organization" />
        </label>
        <label className="form-field">
          <span>Project type *</span>
          <select name="projectType" value={form.projectType} onChange={updateField} onBlur={() => touchField('projectType')} aria-invalid={Boolean(touched.projectType && errors.projectType)} aria-describedby="project-type-error">
            <option value="">Select one</option>
            <option value="Custom Software Development">Custom Software Development</option>
            <option value="AI / ML Consulting & Development">AI / ML Consulting & Development</option>
            <option value="Front-End / UI Development">Front-End / UI Development</option>
            <option value="Workshops & Training">Workshops & Training</option>
            <option value="Code Audit & Optimization">Code Audit & Optimization</option>
            <option value="Open-Source Support">Open-Source Support</option>
            <option value="Custom software">Custom software</option>
            <option value="AI / ML">AI / ML</option>
            <option value="Web experience">Web experience</option>
            <option value="Creative technology">Creative technology</option>
            <option value="Open-source collaboration">Open-source collaboration</option>
            <option value="Other">Other</option>
          </select>
          <FieldError id="project-type-error" message={touched.projectType ? errors.projectType : undefined} />
        </label>
        <label className="form-field">
          <span>Budget</span>
          <select name="budget" value={form.budget} onChange={updateField}>
            <option value="">Select one</option>
            <option value="Under $2,000">Under $2,000</option>
            <option value="$2,000 - $5,000">$2,000 - $5,000</option>
            <option value="$5,000 - $15,000">$5,000 - $15,000</option>
            <option value="$15,000+">$15,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
        <label className="form-field">
          <span>Timeline</span>
          <select name="timeline" value={form.timeline} onChange={updateField}>
            <option value="">Select one</option>
            <option value="As soon as possible">As soon as possible</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="1 - 3 months">1 - 3 months</option>
            <option value="Flexible">Flexible</option>
          </select>
        </label>
      </div>
      <label className="form-field">
        <span>Tell us about the idea *</span>
        <textarea name="message" value={form.message} onChange={updateField} onBlur={() => touchField('message')} aria-invalid={Boolean(touched.message && errors.message)} aria-describedby="message-error" rows={5} />
        <FieldError id="message-error" message={touched.message ? errors.message : undefined} />
      </label>
      <label className="form-consent">
        <input name="privacyConsent" type="checkbox" checked={form.privacyConsent} onChange={updateField} onBlur={() => touchField('privacyConsent')} aria-invalid={Boolean(touched.privacyConsent && errors.privacyConsent)} aria-describedby="consent-error" />
        <span>I agree that Kynvera may use these details to respond to my inquiry. *</span>
      </label>
      <FieldError id="consent-error" message={touched.privacyConsent ? errors.privacyConsent : undefined} />
      <label className="form-trap" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={updateField} /></label>
      <div className="form-submit-row">
        <button className="button button-primary" type="submit" disabled={!isValid || status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send inquiry'} <span className="arrow" aria-hidden="true">↗</span></button>
        <div className="form-status" role="status" aria-live="polite">
          {status === 'success' && 'Thanks. Your message has been sent.'}
          {status === 'error' && (import.meta.env.VITE_CONTACT_EMAIL ? 'Something went wrong. Please try again.' : 'Contact email is not configured yet.')}
        </div>
      </div>
    </form>
  )
}
