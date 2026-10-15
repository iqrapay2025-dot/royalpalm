import sharp from 'sharp'

const jobs = [
  ['tmp-dl/1dFNzMw-nHtfLeY6IN1jV01tzV0Ig2lxr.bin', 'src/assets/leadership-banner.webp', 1600],
  ['tmp-dl/1M806IKH3amY5T9QU4QhdT5fhS4fx_LoX.bin', 'src/assets/french-teacher.webp', 900],
  ['tmp-dl/1cqval5-e0mZZfMsf-XHspPJJrFOzAulq.bin', 'src/assets/career-day-2.webp', 1200],
  ['tmp-dl/1hsQLJidWX650qlxAU5uyUMTsoskktYMr.bin', 'src/assets/welcome-campus.webp', 1600],
]
for (const [src, out, w] of jobs) {
  const meta = await sharp(src).metadata()
  await sharp(src).rotate().resize({ width: Math.min(w, meta.width ?? w) }).webp({ quality: 84 }).toFile(out)
  console.log(out, meta.width, meta.height)
}
