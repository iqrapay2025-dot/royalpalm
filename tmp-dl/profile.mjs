import sharp from 'sharp'

async function ink(p) {
  const img = sharp(p).rotate()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const out = []
  for (let y = 0; y < height; y++) {
    let n = 0
    for (let x = 0; x < width; x += 1) {
      const i = (y * width + x) * channels
      const max = Math.max(data[i], data[i + 1], data[i + 2])
      const min = Math.min(data[i], data[i + 1], data[i + 2])
      const sat = max === 0 ? 0 : (max - min) / max
      if (max < 200 || (sat > 0.3 && max < 250)) n++
    }
    out.push(n)
  }
  return { width, height, out }
}

const { width, height, out } = await ink(process.argv[2])
console.log(width + 'x' + height)
// print compact profile: y:count for rows with ink
let line = ''
for (let y = 0; y < height; y++) {
  if (out[y] > 3) line += (line ? ' ' : '') + y + ':' + out[y]
}
console.log(line)
