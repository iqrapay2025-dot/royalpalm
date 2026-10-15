import fs from 'node:fs'
import sharp from 'sharp'

const files = fs.readdirSync('src/assets/waec results').sort().filter((f) => f.includes('20260805'))
const parts = []
let x = 0
const H = 900
for (const f of files.slice(0, 4)) {
  const p = 'src/assets/waec results/' + f
  const m = await sharp(p).metadata()
  const w = Math.round((H * m.width) / m.height)
  const img = await sharp(p).resize(w, H, { fit: 'fill' }).toBuffer()
  const svg = Buffer.from(
    `<svg width="${w}" height="24"><rect width="${w}" height="24" fill="#111"/><text x="4" y="18" font-family="monospace" font-size="14" fill="#00ff00">${f} ${m.width}x${m.height}</text></svg>`,
  )
  parts.push({ input: img, left: x, top: 0 })
  parts.push({ input: svg, left: x, top: 0 })
  x += w
}
await sharp({ create: { width: x, height: H + 24, channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 90 })
  .toFile('tmp-dl/raw-sheet.jpg')
console.log('ok')
