import sharp from 'sharp'

const p = 'src/assets/waec results/IMG-20260805-WA0011.jpg'
const img = await sharp(p).rotate().toBuffer()
const m = await sharp(img).metadata()
// downscale whole screenshot so we can see full layout
await sharp(img)
  .resize(1100, Math.round((m.height * 1100) / m.width))
  .jpeg({ quality: 90 })
  .toFile('tmp-dl/waec-full.jpg')
console.log('ok', m.width, m.height)
