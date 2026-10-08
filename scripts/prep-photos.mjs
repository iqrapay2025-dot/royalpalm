import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const inputDirectory = path.resolve('raw-staff-photos')
const outputDirectory = path.resolve('src/assets/staff')
const filenames = (await readdir(inputDirectory)).filter((filename) => path.extname(filename).toLowerCase() === '.jpg')
const seenSlugs = new Map()

await mkdir(outputDirectory, { recursive: true })

function slugPart(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

for (const filename of filenames.sort((a, b) => a.localeCompare(b))) {
  if (filename.startsWith('WFS_')) {
    console.log(`SKIP ${filename} -> starts with WFS_`)
    continue
  }
  if (filename.includes('(2)')) {
    console.log(`SKIP ${filename} -> contains (2)`)
    continue
  }

  const comma = filename.indexOf(',')
  if (comma < 0) {
    console.log(`SKIP ${filename} -> no comma`)
    continue
  }

  const surname = filename.slice(0, comma).trim()
  const firstName = filename.slice(comma + 1).trim().split(/\s+/)[0].replace(/[.,]+$/g, '')
  const slug = `${slugPart(surname)}-${slugPart(firstName)}`.replace(/-$/g, '')

  if (seenSlugs.has(slug)) {
    console.error(`COLLISION ${filename} -> ${slug}; already used by ${seenSlugs.get(slug)}`)
    continue
  }

  seenSlugs.set(slug, filename)
  const inputPath = path.join(inputDirectory, filename)
  const outputPath = path.join(outputDirectory, `${slug}.webp`)

  await sharp(inputPath)
    .rotate()
    .resize(480, 480, { fit: 'cover', position: 'north' })
    .webp({ quality: 80 })
    .toFile(outputPath)

  console.log(`${filename} -> src/assets/staff/${slug}.webp`)
}