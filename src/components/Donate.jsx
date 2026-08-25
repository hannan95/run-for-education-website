import { DONATE_URL } from '../config.js'

export default function Donate() {
  return (
    <section id="donate">
      <div className="container">
        <p className="eyebrow">Donate</p>
        <h2 className="section-h">Not running? You can still be part of the movement.</h2>
        <div className="donate-grid">
          <div>
            <p className="lede">
              Every rupee goes directly to TCF's education programs. Donations are handled
              securely through TCF's own fundraising platform — you'll see the live total raised
              there.
            </p>
            <p className="sponsor-line">
              Corporate or sponsorship inquiries — <a href="#contact" style={{ color: 'var(--mint)' }}>get in touch</a>.
            </p>
          </div>
          <div>
            <a className="btn btn-primary" href={DONATE_URL} target="_blank" rel="noopener noreferrer">
              Donate now on TCF's site
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
