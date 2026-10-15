import fs from 'node:fs'
import sharp from 'sharp'

const dir = process.argv[2] ?? 'tmp-dl/gj'
const all = fs.readdirSync(dir).sort()
const idx = process.argv.slice(3).map(Number)
const CW = 300
const parts = []
let x = 0
const meta0 = []
for (const i of idx) {
  const f = all[i]
  const meta = await sharp(dir + '/' + f).metadata()
  const h = Math.round((CW * meta.height) / meta.width)
  meta0.push([i, f, meta.width, meta.height])
  const img = await sharp(dir + '/' + f).resize(CW, null).toBuffer()
  const svg = Buffer.from(
    `<svg width="${CW}" height="20"><rect width="${CW}" height="20" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="12" fill="#00ff00">${i} ${f} ${meta.width}x${meta.height}</text></svg>`,
  )
  parts.push({ input: img, left: x, top: 0 })
  parts.push({ input: svg, left: x, top: 0 })
  x += CW
}
const totalH = Math.max(
  ...idx.map((_, i) => parts[i * 2 + 1] ? 0 : 0),
  0,
)
// recompute max height
let maxH = 0
for (const i of idx) {
  const m = await sharp(dir + '/' + all[i]).metadata()
  maxH = Math.max(maxH, Math.round((CW * m.height) / m.width))
}
await sharp({ create: { width: idx.length * CW, height: maxH + 20, channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 88 })
  .toFile('tmp-dl/zoom.jpg')
console.log(JSON.stringify(meta0))
