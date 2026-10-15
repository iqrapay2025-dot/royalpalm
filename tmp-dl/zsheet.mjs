import fs from 'node:fs'
import sharp from 'sharp'

const dir = 'tmp-dl/gjpg'
const files = fs.readdirSync(dir).sort()
const idxs = process.argv.slice(2).map(Number)
const CW = 520
const CH = 400
const COLS = 3
const chosen = idxs.map((i) => files[i])
const rows = Math.ceil(chosen.length / COLS)
const parts = []
for (let r = 0; r < rows; r++) {
  const slice = chosen.slice(r * COLS, r * COLS + COLS)
  for (let i = 0; i < slice.length; i++) {
    const f = slice[i]
    const label = `${idxs[r * COLS + i] ?? ''} ${f ?? ''}`
    parts.push({
      input: Buffer.from(
        `<svg width="${CW}" height="20"><rect width="${CW}" height="20" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="13" fill="#00ff00">${label}</text></svg>`,
      ),
      top: r * (20 + CH),
      left: i * CW,
    })
    if (f) {
      const buf = await sharp(`${dir}/${f}`)
        .resize(CW - 4, CH - 4, { fit: 'inside' })
        .toBuffer()
      parts.push({ input: buf, top: r * (20 + CH) + 22, left: i * CW + 2 })
    }
  }
}
await sharp({ create: { width: COLS * CW, height: rows * (20 + CH), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 85 })
  .toFile('tmp-dl/zoom-sheet.jpg')
console.log('ok', chosen.length)
