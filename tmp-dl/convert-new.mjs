import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const out = path.resolve('src/assets')
await mkdir(out, { recursive: true })

async function convert(source: string, destination: string, width: number, height: number) {
  await sharp(path.resolve('tmp-dl', source))
    .rotate()
    .resize(width, height, { fit: 'cover', position: 'attention' })
    .webp({ quality: 82 })
    .toFile(path.join(out, destination))
  console.log(`${source} -> src/assets/${destination}`)
}

// 1. Leadership banner
await convert('1dFNzMw-nHtfLeY6IN1jV01tzV0Ig2lxr.bin', 'leadership-banner.webp', 1600, 760)
// 5. Flagship event - RICO Annual Career Day
await convert('1cqval5-e0mZZfMsf-XHspPJJrFOzAulq.bin', 'career-day.webp', 1200, 800)
// 6. Welcome to RICO
await convert('1hsQLJidWX650qlxAU5uyUMTsoskktYMr.bin', 'campus-gate.webp', 1400, 900)
// 2. French teacher - Thomas Atabofack
await sharp(path.resolve('tmp-dl/1M806IKH3amY5T9QU4QhdT5fhS4fx_LoX.bin'))
  .rotate()
  .resize(480, 600, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82 })
  .toFile(path.join(out, 'staff', 'atabofack-thomas.webp'))
console.log('2. french -> src/assets/staff/atabofack-thomas.webp')
