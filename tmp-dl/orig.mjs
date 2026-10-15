import sharp from 'sharp'

const files = [
  'IMG-20260805-WA0011.jpg',
  'IMG-20260805-WA0015.jpg',
  'IMG-20250911-WA0027.jpg',
  'IMG-20250911-WA0032.jpg',
]
const COLS = 2
const CW = 620
const parts = []
for (let i = 0; i < files.length; i++) {
  const f = 'src/assets/waec results/' + files[i]
  const meta = await sharp(f).metadata()
  const buf = await sharp(f).rotate().resize(CW, 900, { fit: 'inside' }).toBuffer()
  parts.push({ input: buf, top: Math.floor(i / COLS) * (20 + 900), left: (i % COLS) * CW })
  parts.push({
    input: Buffer.from(
      `<svg width="${CW}" height="20"><rect width="${CW}" height="20" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="13" fill="#00ff00">${files[i]} orig ${meta.width}x${meta.height}</text></svg>`,
    ),
    top: Math.floor(i / COLS) * (20 + 900),
    left: (i % COLS) * CW,
  })
}
await sharp({ create: { width: COLS * CW, height: Math.ceil(files.length / COLS) * (20 + 900), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 88 })
  .toFile('tmp-dl/orig-sheet.jpg')
console.log('ok')
