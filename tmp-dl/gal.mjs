import fs from 'node:fs'
import sharp from 'sharp'

const dir = 'tmp-dl/gallery'
const start = Number(process.argv[2] ?? 0)
const count = Number(process.argv[3] ?? 12)
const files = fs.readdirSync(dir).sort().slice(start, start + count)
const COLS = 3
const CW = 430
const CH = 330
const rows = Math.ceil(files.length / COLS)
const parts = []
for (let r = 0; r < rows; r++) {
  const row = files.slice(r * COLS, r * COLS + COLS)
  const cells = await Promise.all(
    row.map((f) => sharp(`${dir}/${f}`).resize(CW, CH, { fit: 'cover' }).toBuffer()),
  )
  row.forEach((f, i) => {
    parts.push({ input: cells[i], top: r * (22 + CH) + 22, left: i * CW })
    parts.push({
      input: Buffer.from(
        `<svg width="${CW}" height="22"><rect width="${CW}" height="22" fill="#111"/><text x="4" y="16" font-family="monospace" font-size="14" fill="#00ff00">#${start + r * COLS + i} ${f.slice(0, 28)}</text></svg>`,
      ),
      top: r * (22 + CH),
      left: i * CW,
    })
  })
}
await sharp({ create: { width: COLS * CW, height: rows * (22 + CH), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 82 })
  .toFile(`tmp-dl/gal-${start}.jpg`)
console.log('ok', start, files.length)
