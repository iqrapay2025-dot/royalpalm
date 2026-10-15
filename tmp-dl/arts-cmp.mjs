import sharp from 'sharp'

// Compare candidate 4:5 crops for the Arts track card.
const src = 'tmp-dl/arts-new.bin'
const [leftCrop, attention, centered] = await Promise.all([
  sharp(src).extract({ left: 0, top: 0, width: 768, height: 960 }).toBuffer(),
  sharp(src).resize(768, 960, { fit: 'cover', position: 'attention' }).toBuffer(),
  sharp(src).extract({ left: 256, top: 0, width: 768, height: 960 }).toBuffer(),
])
const thumbs = await Promise.all(
  [leftCrop, attention, centered].map((b) => sharp(b).resize(480, 600).toBuffer()),
)
await sharp({ create: { width: 480 * 3 + 8, height: 600, channels: 3, background: '#333' } })
  .composite(thumbs.map((input, i) => ({ input, left: i * 484, top: 0 })))
  .jpeg({ quality: 85 })
  .toFile('tmp-dl/arts-cmp.jpg')
console.log('ok: left | attention | centered')
