// Node.js serverless function — Vercel turns this into POST /api/register.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, category, city, customBib } = req.body || {}

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' })
  }
  if (category === 'virtual' && !city) {
    return res.status(400).json({ error: 'City / partner club is required for virtual registration.' })
  }

  // Logs only — no persistence yet. Plug in a database (e.g. Supabase,
  // MongoDB Atlas) here to actually store registrations, and an email
  // service (e.g. Resend, SendGrid) to send confirmation emails. Read
  // secrets from environment variables (see .env.example), never hardcode.
  console.log('New registration:', { name, email, phone, category, city, customBib })

  return res.status(200).json({ ok: true, message: `Thanks, ${name}! You're registered.` })
}
