import sharp from 'sharp'

const p = 'src/assets/waec results/IMG-20260805-WA0011.jpg'
const img = await sharp(p).rotate().toBuffer()
const meta = await sharp(img).metadata()
const W = meta.width
const crop = async (top, height, out) => {
  await sharp(img)
    .extract({ left: 0, top, width: W, height })
    .resize({ width: 1500 })
    .jpeg({ quality: 92 })
    .toFile(out)
}
await crop(0, 380, 'tmp-dl/waec-a.jpg')
await crop(380, 400, 'tmp-dl/waec-b.jpg')
console.log('ok', W, meta.height)
