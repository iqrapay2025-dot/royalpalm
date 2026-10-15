import fs from 'node:fs'
import sharp from 'sharp'

const dir = 'tmp-dl/gallery'
const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort()
const COLS = 8
const CW = 250
const CH = 190
const rows = Math.ceil(files.length / COLS)
const parts = []
const buffers = await Promise.all(files.map((f) => sharp(dir + '/' + f).rotate().resize(CW, CH, { fit: 'cover' }).toBuffer()))
for (let r = 0; r < rows; r++) {
  files.slice(r * COLS, r * COLS + COLS).forEach((f, i) => {
    const n = r * COLS + i
    parts.push({
      input: Buffer.from(
        `<svg width="${CW}" height="16"><rect width="${CW}" height="16" fill="#111"/><text x="3" y="12" font-family="monospace" font-size="10" fill="#00ff00">${n}</text></svg>`,
      ),
      top: r * (16 + CH),
      left: i * CW,
    })
    parts.push({ input: buffers[n], top: r * (16 + CH) + 16, left: i * CW })
  })
}
await sharp({ create: { width: COLS * CW, height: rows * (16 + CH), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 78 })
  .toFile('tmp-dl/gcontact.jpg')
console.log('ok', files.length, files.map((f, i) => `${i}:${f.slice(0, 8)}`).join(' '))
