import heroBg from '../assets/hero-bg.jpg'
import { DONATE_URL } from '../config.js'

export default function Hero() {
  return (
    <section id="top" className="hero" style={{ '--hero-bg': `url(${heroBg})` }}>
      <div className="container">
        <h1>Run for Education</h1>
        <p className="sub">A nationwide running event for educational awareness</p>
        <p className="support">Every Step, Every Club, One Cause</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#register">Register Now</a>
          <a className="btn btn-ghost" href="#event">View Event Details</a>
        </div>
        <div className="impact-banner">
          <p className="impact-line">Every registration supports TCF's education programs.</p>
          <a className="btn btn-ghost" href={DONATE_URL} target="_blank" rel="noopener noreferrer">
            Can't run? Donate now
          </a>
        </div>
      </div>
    </section>
  )
}
