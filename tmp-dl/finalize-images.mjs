import { rename, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const A = (f) => path.resolve('src/assets', f)

// 1 & 2: the prior session generated the new photos under placeholder names;
// rename them to the filenames data.ts already imports.
await rename(A('welcome-campus.webp'), A('campus-gate.webp'))
console.log('welcome-campus.webp -> campus-gate.webp')

await rename(A('career-day-2.webp'), A('career-day.webp'))
console.log('career-day-2.webp -> career-day.webp')

// 3: replace the French teacher's staff headshot. The old file was a phone
// screenshot with the status bar baked in; the new source is a clean portrait.
await sharp(A('french-teacher.webp'))
  .rotate()
  .resize(480, 480, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82 })
  .toFile(path.resolve('src/assets/staff/atabofack-thomas.webp'))
console.log('french-teacher.webp -> staff/atabofack-thomas.webp (480x480)')

// 4: drop the now-consumed intermediate file.
await unlink(A('french-teacher.webp'))
console.log('removed french-teacher.webp')

console.log('done')
