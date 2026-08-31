import { useState } from 'react'

const initial = {
  name: '', email: '', phone: '', category: 'physical', city: '',
  packageType: 'bib_medal_shirt', customBib: false, customBibText: '',
  referralCode: '', wantsAmbassador: false, ambassadorContact: '',
}

export default function Registration() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [result, setResult] = useState(null)

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

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setResult(data)
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
              <h5>Choose your pack</h5>
              <ul>
                <li>Bib + finisher medal</li>
                <li>Bib + finisher medal + official Run for Education t-shirt</li>
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
              {result?.registrationId && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--paper-dim)' }}>
                  Registration ID: {result.registrationId}<br />
                  Amount due: PKR {result.amountDue?.toLocaleString()} — payment instructions follow separately.
                </p>
              )}
              {result?.qrDataUrl && (
                <img src={result.qrDataUrl} alt="Registration QR code" width={140} height={140} style={{ marginTop: 12, borderRadius: 4 }} />
              )}
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
              <div className="field">
                <label htmlFor="packageType">Race pack</label>
                <select id="packageType" name="packageType" value={form.packageType} onChange={handleChange}>
                  <option value="bib_medal_shirt">Bib + medal + official t-shirt</option>
                  <option value="bib_medal">Bib + medal only</option>
                </select>
              </div>
              <label className="check-row">
                <input type="checkbox" name="customBib" checked={form.customBib} onChange={handleChange} />
                Add a custom / personalized bib (+PKR 1,000)
              </label>
              {form.customBib && (
                <div className="field">
                  <label htmlFor="customBibText">Your bib number or name</label>
                  <input
                    id="customBibText" name="customBibText" value={form.customBibText} onChange={handleChange}
                    placeholder="e.g. 07 or ALI" required
                  />
                </div>
              )}
              <div className="field">
                <label htmlFor="referralCode">Referral / ambassador code (optional)</label>
                <input id="referralCode" name="referralCode" value={form.referralCode} onChange={handleChange} />
              </div>
              <label className="check-row">
                <input type="checkbox" name="wantsAmbassador" checked={form.wantsAmbassador} onChange={handleChange} />
                Think you can help us make an impact? Become our Running Ambassador
              </label>
              {form.wantsAmbassador && (
                <div className="field">
                  <label htmlFor="ambassadorContact">Best way to reach you about it</label>
                  <input
                    id="ambassadorContact" name="ambassadorContact" value={form.ambassadorContact} onChange={handleChange}
                    placeholder="WhatsApp, Instagram, or just confirm your email/phone above" required
                  />
                </div>
              )}

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
