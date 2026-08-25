import { useState } from 'react'

const initial = { name: '', email: '', phone: '', category: 'physical', city: '', customBib: false }

export default function Registration() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/register', {
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
    <section id="register">
      <div className="container">
        <p className="eyebrow">Registration</p>
        <h2 className="section-h">Reserve your bib</h2>
        <div className="reg-layout">
          <div>
            <div className="reg-included">
              <h5>Included with registration</h5>
              <ul>
                <li>Race bib</li>
                <li>Official Run for Education t-shirt</li>
                <li>Finisher medal</li>
              </ul>
            </div>
            <div className="reg-included">
              <h5>Add-ons at checkout</h5>
              <ul>
                <li>Custom / personalized bib — choose your number or your own text (+PKR 1,000)</li>
                <li>Additional merch — priced separately</li>
              </ul>
            </div>
          </div>

          {status === 'success' ? (
            <div className="form-success">
              <h3>You're registered!</h3>
              <p>Check your email for confirmation. See you on race day.</p>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="field">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                  <option value="physical">Physical — Islamabad</option>
                  <option value="virtual">Virtual — partner club</option>
                </select>
              </div>
              {form.category === 'virtual' && (
                <div className="field">
                  <label htmlFor="city">Your city / partner club</label>
                  <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Lahore Runners Club" required />
                </div>
              )}
              <label className="check-row">
                <input type="checkbox" name="customBib" checked={form.customBib} onChange={handleChange} />
                Add a custom / personalized bib (+PKR 1,000)
              </label>

              {status === 'error' && <p className="form-error">{errorMsg}</p>}

              <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting…' : 'Submit Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
