import fs from 'node:fs'
import sharp from 'sharp'

const start = Number(process.argv[2] ?? 0)
const end = Number(process.argv[3] ?? 24)
const files = fs.readdirSync('tmp-dl/g').sort().slice(start, end)
const COLS = 6
const CW = 260
const CH = 200
const rows = Math.ceil(files.length / COLS)
const parts = []
const thumbs = []
files.forEach((f, i) => {
  thumbs.push(sharp('tmp-dl/g/' + f).resize(CW, CH, { fit: 'inside' }).toBuffer())
})
const buffers = await Promise.all(thumbs)

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
    parts.push({
      input: buf,
      top: r * (18 + CH) + 18,
      left: i * CW,
    })
  })
}
await sharp({ create: { width: COLS * CW, height: rows * (18 + CH), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 80 })
  .toFile(`tmp-dl/gsheet-${start}.jpg`)
console.log('ok', files.length)

