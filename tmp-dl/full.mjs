import sharp from 'sharp'

for (const [f, out] of [
  ['IMG-20250911-WA0027.jpg', 'tmp-dl/w2025.jpg'],
  ['IMG-20250911-WA0036.jpg', 'tmp-dl/w2025b.jpg'],
  ['IMG-20260805-WA0010.jpg', 'tmp-dl/w2026tall.jpg'],
]) {
  const img = await sharp('src/assets/waec results/' + f).rotate().toBuffer()
  const meta = await sharp(img).metadata()
  const W = 1300
  await sharp(img)
    .resize({ width: W })
    .jpeg({ quality: 90 })
    .toFile(out)
  console.log(f, meta.width + 'x' + meta.height, '->', out)
}
