import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')) } catch (err) { reject(err) }
    })
    req.on('error', reject)
  })
}

function enhanceRes(res) {
  res.status = (code) => { res.statusCode = code; return res }
  res.json = (payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  }
  return res
}

// Local-dev-only bridge: routes /api/* straight to the same handler files
// Vercel runs in production, via Vite's SSR module loader. This keeps one
// source of truth per endpoint instead of a hand-duplicated copy that can
// silently drift from the real thing.
function localApiPlugin() {
  const routes = ['register', 'contact', 'admin/registrants']
  return {
    name: 'local-api',
    configureServer(server) {
      for (const route of routes) {
        server.middlewares.use(`/api/${route}`, async (req, res) => {
          enhanceRes(res)
          if (req.method !== 'GET') {
            try {
              req.body = await readJson(req)
            } catch {
              return res.status(400).json({ error: 'Invalid request body.' })
            }
          }
          try {
            const mod = await server.ssrLoadModule(`/api/${route}.js`)
            await mod.default(req, res)
          } catch (err) {
            console.error(`API route /api/${route} failed:`, err)
            if (!res.writableEnded) res.status(500).json({ error: 'Internal server error.' })
          }
        })
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), localApiPlugin()],
  server: {
    port: 5174
  }
})
