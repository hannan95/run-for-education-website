import { useState } from 'react'

const ITEMS = [
  {
    q: "What's included in my registration?",
    a: "Every registration includes a race bib and a finisher medal. You can also choose to add the official Run for Education t-shirt at no extra cost — just pick your pack when you register.",
  },
  {
    q: "Can I join if I'm not in Islamabad?",
    a: 'Yes — register for the virtual race and run through one of our partner running clubs in your city, on the same day as the Islamabad event.',
  },
  {
    q: 'Where do the funds go?',
    a: "Every rupee raised goes toward The Citizens Foundation (TCF)'s education programs.",
  },
  {
    q: 'Is there a refund policy?',
    a: "We'll publish our full refund and transfer terms here before payment collection opens. In the meantime, if your plans change, email us and we'll sort it out on a case-by-case basis.",
    tbd: true,
  },
  {
    q: "My city doesn't have a partner club yet — can I still join?",
    a: "Reach out to us at runforeducation.pk@gmail.com — we're onboarding new club partners.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq">
      <div className="container">
        <p className="eyebrow">FAQ</p>
        <h2 className="section-h">Questions, answered</h2>
        <div className="faq-list">
          {ITEMS.map((item, i) => (
            <div className="faq-item" key={item.q}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{item.q}{item.tbd && <span className="tbd">TBD</span>}</span>
                <span className="mark">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <p className="faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
