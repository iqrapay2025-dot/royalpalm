import sharp from 'sharp'

async function ink(p) {
  const img = sharp(p).rotate()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const out = []
  for (let y = 0; y < height; y++) {
    let n = 0
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * channels
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const sat = max === 0 ? 0 : (max - min) / max
      // ink = dark or saturated
      if (max < 200 || (sat > 0.25 && max < 250)) n++
    }
    out.push(n)
  }
  return { width, height, out }
}

function bands(vals, threshold, minGap) {
  const out = []
  let start = null
  let last = null
  for (let i = 0; i < vals.length; i++) {
    if (vals[i] > threshold) {
      if (start === null) start = i
      last = i
    } else if (start !== null && i - last > minGap) {
      out.push([start, last])
      start = null
    }
  }
  if (start !== null) out.push([start, last])
  return out
}

const { width, height, out } = await ink(process.argv[2] ?? 'src/assets/waec results/IMG-20250911-WA0027.jpg')
console.log(width + 'x' + height, 'maxink', Math.max(...out))
for (const [a, b] of bands(out, width / 20, 12)) console.log(a, b, b - a)
