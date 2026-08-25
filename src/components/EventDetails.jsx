export default function EventDetails() {
  return (
    <section id="event" className="alt">
      <div className="container">
        <p className="eyebrow">Event Details</p>
        <h2 className="section-h">Race day</h2>
        <div className="details-cols">
          <div className="detail-block">
            <h4>Physical — Islamabad</h4>
            <dl>
              <dt>Date</dt>
              <dd>Sunday, October 18, 2026</dd>
              <dt>Venue / route</dt>
              <dd>Pending permit confirmation <span className="tbd">TBD</span></dd>
              <dt>Start time</dt>
              <dd><span className="tbd">TBD</span></dd>
            </dl>
          </div>
          <div className="detail-block">
            <h4>Virtual — Partner Cities</h4>
            <dl>
              <dt>When</dt>
              <dd>Same day, same cause — run through a partner running club in your city</dd>
              <dt>How it works</dt>
              <dd>Each club manages its own local run using a kit we provide: bib, materials, and guidance</dd>
              <dt>Participating cities / clubs</dt>
              <dd>Populated once clubs confirm <span className="tbd">TBD</span></dd>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
