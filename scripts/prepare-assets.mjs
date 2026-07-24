import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SOURCE_LOGO = resolve(ROOT, 'src/assets/images/logo.png')
const PUBLIC_DIR = resolve(ROOT, 'public')

const LOGO_SIZES = [
  { size: 80, name: 'logo-80.png' },
  { size: 112, name: 'logo-112.png' },
  { size: 192, name: 'logo-192.png' },
  { size: 512, name: 'logo-512.png' },
]

const OG_WIDTH = 1200
const OG_HEIGHT = 630
const BACKGROUND = '#0b0c0e'
const BRAND = '#ff6a13'

async function buildLogoVariants() {
  for (const variant of LOGO_SIZES) {
    await sharp(SOURCE_LOGO)
      .resize(variant.size, variant.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9, quality: 90 })
      .toFile(resolve(PUBLIC_DIR, variant.name))
  }

  await sharp(SOURCE_LOGO)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(resolve(PUBLIC_DIR, 'favicon.png'))
}

async function buildOgImage() {
  const logo = await sharp(SOURCE_LOGO).resize(300, 300, { fit: 'contain' }).png().toBuffer()

  const overlay = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.22" />
          <stop offset="60%" stop-color="${BRAND}" stop-opacity="0" />
        </linearGradient>
      </defs>
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="${BACKGROUND}" />
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glow)" />
      <rect x="0" y="${OG_HEIGHT - 10}" width="${OG_WIDTH}" height="10" fill="${BRAND}" />
      <text x="360" y="250" font-family="Arial, sans-serif" font-size="62" font-weight="700" fill="#f4f5f7">
        РАЗНОРАБОЧИЕ
      </text>
      <text x="360" y="326" font-family="Arial, sans-serif" font-size="62" font-weight="700" fill="${BRAND}">
        МОСКВА И ОБЛАСТЬ
      </text>
      <text x="360" y="400" font-family="Arial, sans-serif" font-size="32" fill="#a2a9b4">
        Бригада от 1 человека · от 3 500 ₽ за смену · 24/7
      </text>
    </svg>
  `)

  await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 4,
      background: BACKGROUND,
    },
  })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: logo, top: 165, left: 60 },
    ])
    .jpeg({ quality: 88, progressive: true })
    .toFile(resolve(PUBLIC_DIR, 'og-image.jpg'))
}

async function buildWebManifest() {
  const manifest = {
    name: 'Рабочий ресурс — разнорабочие в Москве и области',
    short_name: 'Рабочий ресурс',
    description: 'Бригады разнорабочих и специалистов по Москве и Московской области, круглосуточно',
    start_url: '/',
    display: 'standalone',
    background_color: BACKGROUND,
    theme_color: BACKGROUND,
    lang: 'ru-RU',
    icons: [
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }

  await writeFile(resolve(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8')
}

await mkdir(PUBLIC_DIR, { recursive: true })
await buildLogoVariants()
await buildOgImage()
await buildWebManifest()

console.log('Ассеты подготовлены: логотипы, og-image.jpg, site.webmanifest')
