import tcfLogo from '../assets/tcflogo.svg'
import logo from '../assets/run-for-education-logo.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo-crop footer-logo-crop">
              <img src={logo} alt="Run for Education" />
            </span>
            <span className="footer-tagline">Every Step, Every Club, One Cause</span>
          </div>
          <div className="footer-partner">
            <img src={tcfLogo} alt="The Citizens Foundation (TCF)" />
            <span>In partnership with TCF</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Run for Education. Social links <span className="tbd">TBD</span></span>
          <div className="footer-legal">
            <span>Privacy Policy <span className="tbd">TBD</span></span>
            <span>Terms &amp; Conditions <span className="tbd">TBD</span></span>
            <span>Refund Policy <span className="tbd">TBD</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
