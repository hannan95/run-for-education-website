import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local-dev-only stand-ins for the /api serverless functions, so the site
// works end to end with `npm run dev` alone. On Vercel, the files under
// /api handle these routes instead — this plugin never runs in production.
function localApiPlugin() {
  function readJson(req) {
    return new Promise((resolve, reject) => {
      let body = ''
      req.on('data', (chunk) => { body += chunk })
      req.on('end', () => {
        try { resolve(JSON.parse(body || '{}')) } catch (err) { reject(err) }
      })
    })
  }

  function sendJson(res, status, payload) {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  }

  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use('/api/register', async (req, res) => {
        if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' })
        try {
          const { name, email, phone, category, city, customBib } = await readJson(req)
          if (!name || !email || !phone) return sendJson(res, 400, { error: 'Name, email, and phone are required.' })
          if (category === 'virtual' && !city) return sendJson(res, 400, { error: 'City / partner club is required for virtual registration.' })
          console.log('New registration:', { name, email, phone, category, city, customBib })
          sendJson(res, 200, { ok: true, message: `Thanks, ${name}! You're registered.` })
        } catch {
          sendJson(res, 400, { error: 'Invalid request body.' })
        }
      })

      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' })
        try {
          const { name, email, message } = await readJson(req)
          if (!name || !email || !message) return sendJson(res, 400, { error: 'Name, email, and message are required.' })
          console.log('New contact message:', { name, email, message })
          sendJson(res, 200, { ok: true })
        } catch {
          sendJson(res, 400, { error: 'Invalid request body.' })
        }
      })

      server.middlewares.use('/api/progress', (req, res) => {
        sendJson(res, 200, { runners: 0, raised: 0 })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    port: 5174
  }
})
