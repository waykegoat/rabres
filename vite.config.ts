import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { processLead } from './shared/lead.js'
import { SERVICES } from './src/data/services'
import { CITIES } from './src/data/cities'

const SITE_URL = (process.env.VITE_SITE_URL || 'https://rabochiy-resurs.ru').replace(/\/$/, '')

interface SitemapEntry {
  path: string
  priority: string
  changefreq: string
}

function collectSitemapEntries(): SitemapEntry[] {
  return [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/uslugi', priority: '0.9', changefreq: 'weekly' },
    { path: '/ceny', priority: '0.9', changefreq: 'weekly' },
    { path: '/geografiya', priority: '0.8', changefreq: 'monthly' },
    { path: '/o-kompanii', priority: '0.6', changefreq: 'monthly' },
    { path: '/kontakty', priority: '0.7', changefreq: 'monthly' },
    ...SERVICES.map((service) => ({
      path: `/uslugi/${service.slug}`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
    ...CITIES.map((city) => ({
      path: `/raznorabochie/${city.slug}`,
      priority: city.priority <= 2 ? '0.8' : '0.7',
      changefreq: 'monthly',
    })),
  ]
}

function buildSitemap(entries: SitemapEntry[]): string {
  const today = new Date().toISOString().slice(0, 10)
  const urls = entries
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${SITE_URL}${entry.path}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority}</priority>\n` +
        `  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function buildRobots(): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /politika-konfidencialnosti',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n')
}

function seoFilesPlugin(): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    async closeBundle() {
      const outDir = resolve(process.cwd(), 'dist')
      await writeFile(resolve(outDir, 'sitemap.xml'), buildSitemap(collectSitemapEntries()), 'utf8')
      await writeFile(resolve(outDir, 'robots.txt'), buildRobots(), 'utf8')
    },
  }
}

function leadDevEndpoint(): Plugin {
  return {
    name: 'lead-dev-endpoint',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/lead', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }

        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)

        let body: unknown = {}
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
        } catch {
          body = {}
        }

        const result = await processLead(body, req.socket.remoteAddress ?? 'dev', {
          botToken: process.env.TELEGRAM_BOT_TOKEN,
          chatId: process.env.TELEGRAM_CHAT_ID,
        })

        res.statusCode = result.status
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.end(JSON.stringify(result.body))
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), leadDevEndpoint(), seoFilesPlugin()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/vue') || id.includes('node_modules/@vue')) return 'vue'
          return undefined
        },
      },
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
})
