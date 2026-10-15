import fs from 'node:fs'
import sharp from 'sharp'

const files = fs.readdirSync('src/assets/waec-evidence').sort()
const pick = files.filter((f) => f.includes('2026')).slice(0, 8)
const H = 420
const parts = []
let x = 0
for (const f of pick) {
  const p = 'src/assets/waec-evidence/' + f
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
  .jpeg({ quality: 90 })
  .toFile('tmp-dl/evidence-sheet.jpg')
console.log('ok', pick.length)
