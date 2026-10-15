import sharp from 'sharp'
import fs from 'node:fs'
const f = fs.readdirSync('src/assets/waec results').sort()
for (const n of f) {
  const m = await sharp('src/assets/waec results/' + n).metadata()
  console.log(n, m.width + 'x' + m.height)
}
