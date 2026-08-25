import { useEffect, useState } from 'react'

const GOAL = 500000

export default function Hero() {
  const [raised, setRaised] = useState(null)

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data) => setRaised(data.raised ?? 0))
      .catch(() => setRaised(0))
  }, [])

  const pct = raised === null ? 0 : Math.min(100, Math.round((raised / GOAL) * 100))

  return (
    <section id="top" className="hero">
      <div className="container">
        <p className="sub">Sunday, October 18, 2026 — Islamabad &amp; Partner Cities Nationwide</p>
        <h1>Run for Education</h1>
        <p className="support">Every Step, Every Club, One Cause</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#register">Register Now</a>
          <a className="btn btn-ghost" href="#donate">Donate</a>
        </div>
        <div className="progress-wrap">
          <div className="progress-label">
            <span>Help us raise <b>PKR 500,000</b> for TCF</span>
            <span>{raised === null ? '—' : `PKR ${raised.toLocaleString()} raised`}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </section>
  )
}
