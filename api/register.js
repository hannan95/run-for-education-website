// Node.js serverless function — Vercel turns this into POST /api/register.

import { prisma } from '../lib/prisma.js'
import QRCode from 'qrcode'

const REGISTRATION_FEE = 3000
const CUSTOM_BIB_FEE = 1000

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, category, city, customBib, referralCode } = req.body || {}

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' })
  }
  const normalizedCategory = category === 'virtual' ? 'virtual' : 'physical'
  if (normalizedCategory === 'virtual' && !city) {
    return res.status(400).json({ error: 'City / partner club is required for virtual registration.' })
  }

  const registrant = await prisma.registrant.create({
    data: {
      name,
      email,
      phone,
      category: normalizedCategory,
      city: normalizedCategory === 'virtual' ? city : null,
      customBib: Boolean(customBib),
      referralCodeUsed: referralCode || null,
    },
  })

  const amountDue = REGISTRATION_FEE + (registrant.customBib ? CUSTOM_BIB_FEE : 0)
  await prisma.payment.create({
    data: { registrantId: registrant.id, amount: amountDue, status: 'pending' },
  })

  const qrDataUrl = await QRCode.toDataURL(registrant.id)

  // No-ops until RESEND_API_KEY is set — see .env.example.
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Run for Education <no-reply@runforeducation.pk>',
          to: email,
          subject: "You're registered for Run for Education 2026",
          html: `<p>Hi ${name},</p><p>Thanks for registering (${registrant.category}). Your registration ID is <b>${registrant.id}</b>. Amount due: PKR ${amountDue.toLocaleString()} — payment instructions will follow separately.</p>`,
        }),
      })
    } catch (err) {
      console.error('Confirmation email failed:', err)
    }
  }

  return res.status(200).json({
    ok: true,
    message: `Thanks, ${name}! You're registered.`,
    registrationId: registrant.id,
    amountDue,
    qrDataUrl,
  })
}
