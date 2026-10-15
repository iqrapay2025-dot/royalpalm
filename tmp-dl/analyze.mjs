import sharp from 'sharp'

async function analyze(p) {
  const img = sharp(p).rotate()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const rows = []
  for (let y = 0; y < height; y++) {
    let yellow = 0
    let lavender = 0
    let navy = 0
    let white = 0
    for (let x = 0; x < width; x += 2) {
      const i = (y * width + x) * channels
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      if (r > 225 && g > 200 && g < 245 && b > 100 && b < 200) yellow++
      else if (r > 190 && r < 245 && g > 190 && g < 245 && b > 235) lavender++
      else if (r < 60 && g < 60 && b > 70) navy++
      else if (r > 240 && g > 240 && b > 240) white++
    }
    rows.push({ y, yellow, lavender, navy, white })
  }
  return { width, height, rows }
}

function ranges(rows, key, threshold) {
  const out = []
  let start = null
  for (const r of rows) {
    if (r[key] > threshold) {
      if (start === null) start = r.y
    } else if (start !== null) {
      out.push([start, r.y - 1])
      start = null
    }
  }
  if (start !== null) out.push([start, rows.length - 1])
  return out
}

for (const p of [
  'src/assets/waec results/IMG-20260805-WA0011.jpg',
  'src/assets/waec results/IMG-20250911-WA0027.jpg',
]) {
  const { width, height, rows } = await analyze(p)
  console.log(p, width + 'x' + height)
  console.log('  yellow  ', JSON.stringify(ranges(rows, 'yellow', width / 8)))
  console.log('  lavender', JSON.stringify(ranges(rows, 'lavender', width / 8)))
  console.log('  navy    ', JSON.stringify(ranges(rows, 'navy', width / 4)))
}
