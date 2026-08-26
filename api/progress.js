// Node.js serverless function — Vercel turns this into GET /api/progress.
// Returns live campaign stats for the hero impact banner. Currently a
// static stub since there's no database yet — wire this to a real tally
// (e.g. count of confirmed registrations, sum of donations, in
// Supabase/Mongo) once registration and donations are actually stored.

export default async function handler(req, res) {
  return res.status(200).json({ runners: 0, raised: 0 })
}
