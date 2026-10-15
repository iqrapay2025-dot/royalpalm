import fs from 'node:fs'
import sharp from 'sharp'

const dir = 'src/assets/waec results'
const files = fs.readdirSync(dir).filter((f) => f.includes('20250911')).sort()
const parts = []
let x = 0
const H = 380
for (const f of files) {
  const p = dir + '/' + f
  const meta = await sharp(p).metadata()
  const w = Math.round((H * meta.width) / meta.height)
  const img = await sharp(p).resize(w, H, { fit: 'fill' }).toBuffer()
  const svg = Buffer.from(
    `<svg width="${w}" height="20"><rect width="${w}" height="20" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="12" fill="#00ff00">${f} ${meta.width}x${meta.height}</text></svg>`,
  )
  parts.push({ input: img, left: x, top: 0 })
  parts.push({ input: svg, left: x, top: 0 })
  x += w
}
await sharp({ create: { width: x, height: H + 20, channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 92 })
  .toFile('tmp-dl/waec2025-orig.jpg')
console.log('ok', files.length, x)
