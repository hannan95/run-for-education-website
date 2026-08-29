// Node.js serverless function — Vercel turns this into GET /api/progress.
// Powers the homepage's "Runners registered" / "PKR raised" stats. Cached
// lightly so the homepage isn't hitting the database on every page load.

import { prisma } from '../lib/prisma.js'

export default async function handler(req, res) {
  const [runners, paid] = await Promise.all([
    prisma.registrant.count({ where: { status: { not: 'cancelled' } } }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'success' } }),
  ])

  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60')
  return res.status(200).json({ runners, raised: paid._sum.amount || 0 })
}
