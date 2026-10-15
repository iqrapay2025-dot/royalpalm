import fs from 'node:fs'
import sharp from 'sharp'

// Convert the 47 downloaded gallery photos to webp, sequentially numbered
// (zero-padded so localeCompare sort in the app matches visual order).
const dir = 'tmp-dl/gallery'
const out = 'src/assets/gallery'
fs.mkdirSync(out, { recursive: true })
const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).sort()
let i = 0
let total = 0
for (const f of files) {
  i += 1
  const name = `gal-${String(i).padStart(2, '0')}.webp`
  const meta = await sharp(`${dir}/${f}`)
    .rotate()
    .resize(1400, 1800, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(`${out}/${name}`)
  total += meta.size
  console.log(name, `${meta.width}x${meta.height}`, `${(meta.size / 1024).toFixed(0)}KB`, `<- ${f}`)
}
console.log(`done: ${i} images, ${(total / 1024 / 1024).toFixed(1)}MB total`)
