import fs from 'node:fs'
import sharp from 'sharp'

const files = fs.readdirSync('src/assets/waec results').sort()
const pick = files.filter((_, i) => i % 4 === 0)
const H = 300
const parts = []
let x = 0
for (const f of pick) {
  const p = 'src/assets/waec results/' + f
  const meta = await sharp(p).metadata()
  const w = Math.round((H * meta.width) / meta.height)
  const img = await sharp(p).resize(w, H, { fit: 'fill' }).toBuffer()
  const svg = Buffer.from(
    `<svg width="${w}" height="20"><rect width="${w}" height="20" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="12" fill="#00ff00">${f}</text></svg>`,
  )
  parts.push({ input: img, left: x, top: 0 })
  parts.push({ input: svg, left: x, top: 0 })
  x += w
}
await sharp({ create: { width: x, height: H + 20, channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 85 })
  .toFile('tmp-dl/waec-sheet.jpg')
console.log('ok waec', pick.length, pick.join(','))
