import path from 'node:path'
import sharp from 'sharp'

const out = path.resolve('src/assets')

async function convert(source, destination, width, height) {
  await sharp(path.resolve('tmp-dl', source))
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82 })
    .toFile(path.join(out, destination))
  console.log(`${source} -> src/assets/${destination}`)
}

// 5. Flagship event - RICO Annual Career Day (data.ts references career-day.webp)
await convert('1cqval5-e0mZZfMsf-XHspPJJrFOzAulq.bin', 'career-day.webp', 1200, 800)
// 6. Welcome to RICO (data.ts campusGate references campus-gate.webp)
await convert('1hsQLJidWX650qlxAU5uyUMTsoskktYMr.bin', 'campus-gate.webp', 1400, 900)
// 2. French teacher - Thomas Atabofack -> staff portrait slot
await sharp(path.resolve('tmp-dl/1M806IKH3amY5T9QU4QhdT5fhS4fx_LoX.bin'))
  .rotate()
  .resize(480, 600, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82 })
  .toFile(path.join(out, 'staff', 'atabofack-thomas.webp'))
console.log('2. french -> src/assets/staff/atabofack-thomas.webp')

// Side-by-side check copies for visual verification (throwaway, in tmp-dl)
await sharp(path.resolve('tmp-dl/1M806IKH3amY5T9QU4QhdT5fhS4fx_LoX.bin')).rotate().resize({ width: 480 }).jpeg().toFile(path.resolve('tmp-dl/check-french-new.jpg'))
console.log('check image written')
