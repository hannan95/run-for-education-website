import { useState } from 'react'

const initial = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message)
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <p className="eyebrow">Contact</p>
        <h2 className="section-h">Get in touch</h2>
        <div className="contact-grid">
          <dl className="contact-info">
            <dt>Organizer</dt>
            <dd>Muhammad Saad</dd>
            <dt>Email</dt>
            <dd><a href="mailto:runforeducation.pk@gmail.com">runforeducation.pk@gmail.com</a></dd>
            <dt>Phone</dt>
            <dd>0342 5140356</dd>
          </dl>

          {status === 'success' ? (
            <div className="form-success">
              <h3>Message sent</h3>
              <p>We'll get back to you shortly.</p>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="c-name">Full name</label>
                  <input id="c-name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-message">Message</label>
                <input id="c-message" name="message" value={form.message} onChange={handleChange} placeholder="Club partnership, sponsorship, or general question" required />
              </div>
              {status === 'error' && <p className="form-error">{errorMsg}</p>}
              <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
