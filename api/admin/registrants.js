// Node.js serverless function — Vercel turns this into GET /api/admin/registrants.
// Protected by a shared secret (ADMIN_TOKEN) rather than a full login system —
// fine for one organizer checking registrations; move to real per-user admin
// accounts (see the AdminUser-style role split in the backend plan) before
// handing access to a bigger team.

import { prisma } from '../../lib/prisma.js'

export default async function handler(req, res) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'DELETE') {
    const { id } = req.body || {}
    if (!id) return res.status(400).json({ error: 'id is required' })
    await prisma.payment.deleteMany({ where: { registrantId: id } })
    await prisma.registrant.delete({ where: { id } })
    return res.status(200).json({ ok: true })
  }

  const registrants = await prisma.registrant.findMany({
    include: { payments: true },
    orderBy: { createdAt: 'desc' },
  })

  const url = new URL(req.url, 'http://localhost')
  if (url.searchParams.get('format') === 'csv') {
    const header = [
      'id', 'name', 'email', 'phone', 'category', 'city', 'packageType', 'customBib', 'customBibText',
      'wantsAmbassador', 'ambassadorContact', 'referralCodeUsed', 'status', 'amountDue', 'paymentStatus', 'createdAt',
    ]
    const rows = registrants.map((r) => [
      r.id, r.name, r.email, r.phone, r.category, r.city || '', r.packageType, r.customBib, r.customBibText || '',
      r.wantsAmbassador, r.ambassadorContact || '', r.referralCodeUsed || '', r.status,
      r.payments[0]?.amount ?? '', r.payments[0]?.status ?? '', r.createdAt.toISOString(),
    ])
    const csv = [header, ...rows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n')
    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename="registrants.csv"')
    return res.status(200).end(csv)
  }

  return res.status(200).json({ registrants })
}
