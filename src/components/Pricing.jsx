const ROWS = [
  { item: 'Standard Registration', price: '3,000' },
  { item: 'Custom / Personalized Bib', price: '+1,000' },
  { item: 'Merch (shirts, etc.)', price: 'Priced separately at checkout' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="alt">
      <div className="container">
        <p className="eyebrow">Pricing</p>
        <h2 className="section-h">What it costs</h2>
        <table className="pricing-table">
          <thead>
            <tr><th>Item</th><th>Price (PKR)</th></tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.item}><td>{r.item}</td><td>{r.price}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
