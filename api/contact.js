// Node.js serverless function — Vercel turns this into POST /api/contact.

import { prisma } from '../lib/prisma.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }

  await prisma.contactMessage.create({ data: { name, email, message } })

  return res.status(200).json({ ok: true })
}
