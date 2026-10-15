import sharp from 'sharp'

const p = 'src/assets/waec results/IMG-20260805-WA0011.jpg'
const meta = await sharp(p).metadata()
const img = await sharp(p).rotate().toBuffer()
const m2 = await sharp(img).metadata()
console.log(m2.width, m2.height)
// keep top 52% which contains header + candidate info + some grades
const H = Math.round(m2.height * 0.52)
const crop = await sharp(img).extract({ left: 0, top: 0, width: m2.width, height: H }).toBuffer()
const w = 1300
await sharp(crop).resize(w, Math.round((H * w) / m2.width)).jpeg({ quality: 92 }).toFile('tmp-dl/waec-crop.jpg')
console.log('ok')
