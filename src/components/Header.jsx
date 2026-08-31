import logo from '../assets/run-for-education-logo.png'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="wordmark" href="#top">
          <span className="logo-crop header-logo-crop">
            <img src={logo} alt="Run for Education" />
          </span>
        </a>
        <nav className="site-nav">
          <a href="#about">About</a>
          <a href="#event">Event</a>
          <a href="#register">Register</a>
          <a href="#donate">Donate</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a className="btn btn-primary" href="#register">Register Now</a>
        </nav>
      </div>
    </header>
  )
}
