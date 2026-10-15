import fs from 'node:fs'
import sharp from 'sharp'

const names = [
  '1G8TF3P3GkPUy6GrSLQ8xPAWTCNnpb-6d',
  '1H-I1TNxFVf6crPJHnEgPVeg9rYltMYzO',
  '1p3S6cqt21IZ2mrDkOJ8H1ozsjcyzXdrz',
  '1qyfy1gVSlnqfXLSIwpE1NbmeP_RBcuwU',
  '1doqlggg5-V2zPLQhygjTQD1MgAWSv5rS',
  '1eik9leL3X5O69d1_arZ9wtCQiEiGGmka',
  '1fjaJWa6mKxpK_mVV20Hk0HNjMoWl9tg-',
  '1huO5LNquwmcmJ5x_4myR22nTP94lubi9',
  '1YdPgmGrOBz0j7we-GcndLPgglZSNtjmI',
  '1m0UCQkAMLP86u_rd1NxCoVCkhGVNErPI',
  '1mAxrq9oVrykepPVafNqDItxXGuS1GMDG',
  '1sCZx91gvkjyZOMNGBnkeQZV-8MuVxpJK',
  '1ANhDbj4Y_kPBsxC1dz50qirNZi-yeTJ7',
  '1_kJ1nWgvgiPjyzB6i3iOhr431ikWwzXI',
  '1_cxhSTHP2pp1ixAMnTEC1HopUuRDuV0M',
]
const CW = 700
const CH = 520
const COLS = 3
const rows = Math.ceil(names.length / COLS)
const parts = []
const thumbs = await Promise.all(
  names.map(async (n) => {
    const meta = await sharp(`tmp-dl/gallery/${n}.jpg`).metadata()
    const w = Math.min(CW, Math.round((CH * meta.width) / meta.height))
    return sharp(`tmp-dl/gallery/${n}.jpg`).resize(w, CH).png().toBuffer()
  }),
)
for (let r = 0; r < rows; r++) {
  names.slice(r * COLS, r * COLS + COLS).forEach((n, i) => {
    parts.push({
      input: Buffer.from(
        `<svg width="${CW}" height="20"><rect width="${CW}" height="20" fill="#111"/><text x="4" y="15" font-family="monospace" font-size="13" fill="#00ff00">${n}</text></svg>`,
      ),
      top: r * (20 + CH),
      left: i * CW,
    })
  })
}
for (let r = 0; r < rows; r++) {
  thumbs.slice(r * COLS, r * COLS + COLS).forEach((buf, i) => {
    parts.push({ input: buf, top: r * (20 + CH) + 20, left: i * CW })
  })
}
await sharp({ create: { width: COLS * CW, height: rows * (20 + CH), channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 85 })
  .toFile('tmp-dl/zoom-a.jpg')
console.log('ok')
