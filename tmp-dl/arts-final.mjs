import sharp from 'sharp'

// Final Arts track card image: 4:5 attention crop -> webp q82.
const meta = await sharp('tmp-dl/arts-new.bin')
  .rotate()
  .resize(768, 960, { fit: 'cover', position: 'attention' })
  .webp({ quality: 82 })
  .toFile('src/assets/arts-track.webp')
console.log(`arts-track.webp ${meta.width}x${meta.height} ${(meta.size / 1024).toFixed(0)}KB`)
