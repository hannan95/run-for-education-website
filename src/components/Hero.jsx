import { useEffect, useState } from 'react'

export default function Hero() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch('/api/progress')
      .then((res) => res.json())
      .then((data) => setStats({ runners: data.runners ?? 0, raised: data.raised ?? 0 }))
      .catch(() => setStats({ runners: 0, raised: 0 }))
  }, [])

  return (
    <section id="top" className="hero">
      <div className="container">
        <p className="sub">A nationwide running event — Sunday, October 18, 2026 — Islamabad &amp; Partner Cities</p>
        <h1>Run for Education</h1>
        <p className="support">Every Step, Every Club, One Cause</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#register">Register Now</a>
          <a className="btn btn-ghost" href="#event">View Event Details</a>
        </div>
        <div className="impact-banner">
          <p className="impact-line">Every registration supports TCF's education programs.</p>
          <div className="stat-row">
            <div className="stat-primary">
              <span className="stat-num">{stats === null ? '—' : stats.runners.toLocaleString()}</span>
              <span className="stat-lbl">Runners registered nationwide</span>
            </div>
            <div className="stat-secondary">
              <span className="stat-num">{stats === null ? '—' : `PKR ${stats.raised.toLocaleString()}`}</span>
              <span className="stat-lbl">Raised for education</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
