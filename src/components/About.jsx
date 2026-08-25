import tcfLogo from '../assets/tcflogo.svg'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <p className="eyebrow">About / Our Story</p>
        <h2 className="section-h">Why we run</h2>
        <div className="about-grid">
          <div className="story">
            <p>
              Run for Education is built on a simple idea — that a country's future is only as
              strong as the education it gives its children. It brings together runners and
              running communities, starting with a flagship race in Islamabad and extending
              through local running clubs in other cities, all running for the same cause on the
              same day. Every runner who signs up, every rupee raised, and every kilometer covered
              goes toward getting more kids into classrooms and keeping them there.
            </p>
            <p>
              Because before a nation can lead, it must learn to teach. And that future doesn't
              begin someday — it begins with a single step, taken today.
            </p>
          </div>
          <div className="partner-card">
            <p className="k">In partnership with</p>
            <img src={tcfLogo} alt="The Citizens Foundation (TCF)" />
            <p>
              The Citizens Foundation (TCF) operates one of the largest networks of independently
              run schools in the world, educating underprivileged children across Pakistan's
              urban and rural communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
