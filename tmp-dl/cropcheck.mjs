import fs from 'node:fs'
import sharp from 'sharp'

const files = fs.readdirSync('src/assets/waec-evidence').filter((f) => f.includes('2026')).sort()
const pick = [files[1], files[5], files[12], files[20]]
const H = 620
const parts = []
let x = 0
for (const f of pick) {
  const p = 'src/assets/waec-evidence/' + f
  const img = await sharp(p).resize({ height: H }).toBuffer()
  const meta = await sharp(img).metadata()
  const w = meta.width
  parts.push({ input: img, left: x, top: 22 })
  parts.push({
    input: Buffer.from(
      `<svg width="${w}" height="22"><rect width="${w}" height="22" fill="#111"/><text x="4" y="16" font-family="monospace" font-size="13" fill="#00ff00">${f} ${w}x${H}</text></svg>`,
    ),
    left: x,
    top: 0,
  })
  x += w
}
await sharp({ create: { width: x, height: H + 22, channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 92 })
  .toFile('tmp-dl/crop-check.jpg')
console.log('ok', x)
