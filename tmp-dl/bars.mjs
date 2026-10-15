import fs from 'node:fs'
import sharp from 'sharp'

const targets = [
  'IMG-20250911-WA0027.jpg',
  'IMG-20250911-WA0036.jpg',
  'IMG-20260805-WA0011.jpg',
  'IMG-20260805-WA0039.jpg',
  'IMG-20260805-WA0010.jpg',
]
for (const f of targets) {
  const img = await sharp('src/assets/waec results/' + f).rotate().toBuffer()
  const { data, info } = await sharp(img).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const W = info.width
  const kinds = []
  let cur = null
  for (let y = 0; y < info.height; y++) {
    let r = 0
    let g = 0
    let b = 0
    let n = 0
    for (let x = Math.round(W * 0.2); x < Math.round(W * 0.8); x += 5) {
      const i = (y * W + x) * 4
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      n++
    }
    r /= n
    g /= n
    b /= n
    const yellow = r > 150 && g > 140 && b < 150
    const navy = b > r + 20 && r < 130
    const k = yellow ? 'Y' : navy ? 'N' : '.'
    if (k !== cur) {
      kinds.push(`${y}:${k}`)
      cur = k
    }
  }
  console.log(f, info.width + 'x' + info.height)
  console.log(kinds.filter((s) => !s.endsWith(':.')).join(' '))
}
