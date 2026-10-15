import fs from 'node:fs'
import sharp from 'sharp'

const dir = process.argv[2] ?? 'tmp-dl/gjpg'
const start = Number(process.argv[3] ?? 0)
const end = Number(process.argv[4] ?? 24)
const files = fs.readdirSync(dir).sort().slice(start, end)
const COLS = 6
const CW = 260
const CH = 200
const rows = Math.ceil(files.length / COLS)
const parts = []
const bad = []

for (let r = 0; r < rows; r++) {
  const rowFiles = files.slice(r * COLS, r * COLS + COLS)
  for (let i = 0; i < COLS; i++) {
    const idx = r * COLS + i
    const f = rowFiles[i]
    const label = `${start + idx} ${f ?? ''}`
    parts.push({
      input: Buffer.from(
        `<svg width="${CW}" height="18"><rect width="${CW}" height="18" fill="#111"/><text x="4" y="13" font-family="monospace" font-size="11" fill="#00ff00">${label}</text></svg>`,
      ),
      top: r * (18 + CH),
      left: i * CW,
    })
    if (!f) continue
    let buf
    try {
      buf = await sharp(`${dir}/${f}`)
        .rotate()
        .resize(CW, CH, { fit: 'inside' })
        .jpeg()
        .toBuffer()
    } catch {
      bad.push(f)
      buf = await sharp({
        create: { width: CW - 20, height: CH - 20, channels: 3, background: '#600' },
      })
        .jpeg()
        .toBuffer()
    }
    parts.push({ input: buf, top: r * (18 + CH) + 18, left: i * CW })
  }
}

await sharp({
  create: { width: COLS * CW, height: rows * (18 + CH), channels: 3, background: '#333' },
})
  .composite(parts)
  .jpeg({ quality: 80 })
  .toFile(`tmp-dl/galsheet-${start}.jpg`)

console.log('ok', files.length, 'BAD:', bad.join(','))
