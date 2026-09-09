import { useState, type FormEvent } from 'react'
import { trackEvent } from '../lib/analytics'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const isValid = emailPattern.test(email.trim()) && consent

  const submitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValid) return

    const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT
    const publication = import.meta.env.VITE_SUBSTACK_URL
    if (!endpoint && !publication) {
      setStatus('error')
      return
    }

    if (!endpoint && publication) {
      window.open(`${publication.replace(/\/$/, '')}/subscribe?email=${encodeURIComponent(email.trim())}`, '_blank', 'noopener,noreferrer')
      setStatus('success')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent: true }),
      })
      if (!response.ok) throw new Error('Signup failed')
      setEmail('')
      setConsent(false)
      setStatus('success')
      trackEvent('newsletter_signup')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="newsletter-signup">
      <div>
        <span className="newsletter-label">THE NEXT UPDATE</span>
        <h2>Follow the work.</h2>
        <p>Occasional notes on new projects, experiments, and things worth sharing.</p>
      </div>
      <form onSubmit={submitSignup} noValidate>
        <label className="newsletter-input">
          <span className="sr-only">Email address</span>
          <input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus('idle') }} placeholder="you@example.com" aria-label="Email address" required />
          <button type="submit" disabled={!isValid || status === 'sending'} aria-label="Subscribe to newsletter">{status === 'sending' ? '...' : '↗'}</button>
        </label>
        <label className="newsletter-consent"><input type="checkbox" checked={consent} onChange={(event) => { setConsent(event.target.checked); setStatus('idle') }} /> <span>I agree to receive occasional Kynvera updates.</span></label>
        <p className="newsletter-status" role="status" aria-live="polite">{status === 'success' && (import.meta.env.VITE_NEWSLETTER_ENDPOINT ? 'Thanks. Check your inbox to confirm.' : 'Continue in the new tab to finish signup.')}{status === 'error' && (import.meta.env.VITE_NEWSLETTER_ENDPOINT || import.meta.env.VITE_SUBSTACK_URL ? 'Signup failed. Please try again.' : 'Newsletter signup is not configured yet.')}</p>
      </form>
    </div>
  )
}
