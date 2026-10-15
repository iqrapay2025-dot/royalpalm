import { appendFile, mkdir, readdir, rm } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const sourceDir = path.resolve('src/assets/waec results')
const outputDir = path.resolve('src/assets/waec-evidence')
const logFile = path.resolve('tmp-dl/waec-evidence.log')
await rm(logFile, { force: true })
await rm(outputDir, { recursive: true, force: true })
await mkdir(outputDir, { recursive: true })
const files = (await readdir(sourceDir)).filter((f) => f.toLowerCase().endsWith('.jpg')).sort()

for (const file of files) {
  const match = file.match(/^IMG-(\d{4})(\d{4})-WA(\d+)\.jpg$/i)
  if (!match) continue
  const [, year, , number] = match
  const output = path.join(outputDir, `waec-${year}-${number}.webp`)

  const image = sharp(path.join(sourceDir, file)).rotate()
  const { width = 0, height = 0 } = await image.metadata()

  // Keep the WAEC banner, "Results" header, Candidate's Information block (which
  // carries the centre name) and the Subject/Grade table. Everything below the
  // table - Card Information, notes and footer - is dropped.
  const cropHeight = Math.round(height * 0.63)

  await image
    .extract({ left: 0, top: 0, width, height: cropHeight })
    .resize(1080, Math.round((cropHeight * 1080) / width), { fit: 'fill' })
    .webp({ quality: 88 })
    .toFile(output)

  await appendFile(logFile, `${file} -> waec-${year}-${number}.webp\n`)
}
await appendFile(logFile, `done ${files.length} sources\n`)