import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import ocrHandler from './api/ocr.js'
import trafficSignHandler from './api/traffic-sign.js'
import slotsHandler from './api/slots.js'

function apiDevPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/')) return next()

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {}
          } catch {
            req.body = {}
          }

          const mockRes = {
            status(code) {
              res.statusCode = code
              return this
            },
            json(data) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(data))
              return this
            },
          }

          try {
            if (req.url.startsWith('/api/ocr')) {
              await ocrHandler(req, mockRes)
            } else if (req.url.startsWith('/api/traffic-sign')) {
              await trafficSignHandler(req, mockRes)
            } else if (req.url.startsWith('/api/slots')) {
              await slotsHandler(req, mockRes)
            } else {
              next()
            }
          } catch (err) {
            console.error('API middleware error:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message }))
          }
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY

  return {
    plugins: [react(), apiDevPlugin()],
  }
})
