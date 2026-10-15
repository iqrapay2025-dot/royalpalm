import fs from 'node:fs'
import sharp from 'sharp'

const dir = process.argv[2] ?? 'tmp-dl/gallery'
const start = Number(process.argv[3] ?? 0)
const count = Number(process.argv[4] ?? 24)
const files = fs.readdirSync(dir).sort().slice(start, start + count)
if (files.length === 0) {
  console.log('no files')
  process.exit(0)
}
const COLS = 6
const CW = 260
const CH = 200
const rows = Math.ceil(files.length / COLS)
const parts = []
const buffers = await Promise.all(
  files.map((f) => sharp(dir + '/' + f).resize(CW, CH, { fit: 'inside' }).toBuffer()),
)

for (let r = 0; r < rows; r++) {
  files.slice(r * COLS, r * COLS + COLS).forEach((f, i) => {
    parts.push({
      input: Buffer.from(
        `<svg width="${CW}" height="18"><rect width="${CW}" height="18" fill="#111"/><text x="4" y="13" font-family="monospace" font-size="11" fill="#00ff00">${start + r * COLS + i} ${f}</text></svg>`,
      ),
      top: r * (18 + CH),
      left: i * CW,
    })
  })
}
for (let r = 0; r < rows; r++) {
  buffers.slice(r * COLS, r * COLS + COLS).forEach((buf, i) => {
    parts.push({ input: buf, top: r * (18 + CH) + 18, left: i * CW })
  })
}
await sharp({ create: { width: COLS * CW, height: rows * (18 + CH), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 80 })
  .toFile(`tmp-dl/galsheet-${start}.jpg`)
console.log('ok', files.length)
