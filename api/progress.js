// Node.js serverless function — Vercel turns this into GET /api/progress.
// Returns the live fundraising total for the hero progress bar. Currently
// a static stub since there's no database yet — wire this to a real tally
// (e.g. sum of confirmed registrations + donations in Supabase/Mongo) once
// registration and donations are actually being stored.

export default async function handler(req, res) {
  return res.status(200).json({ raised: 0, goal: 500000 })
}
