import fs from 'node:fs'
import sharp from 'sharp'

const f = 'tmp-dl/about-banner-src.jpg'
const m = await sharp(f).metadata()
console.log(f, m.format, `${m.width}x${m.height}`, 'exif:', !!m.exif, `${(fs.statSync(f).size / 1024).toFixed(0)}KB`)

const H = 420
const thumb = await sharp(f).rotate().resize(900, H, { fit: 'inside' }).png().toBuffer()
await sharp({ create: { width: 900, height: H + 24, channels: 3, background: '#222' } })
  .composite([
    { input: Buffer.from('<svg width="900" height="24"><rect width="900" height="24" fill="#111"/><text x="6" y="17" font-family="monospace" font-size="13" fill="#0f0">NEW About banner (Drive 1Y8yqiWN...)</text></svg>'), top: 0, left: 0 },
    { input: thumb, top: 24, left: 0 },
  ])
  .jpeg({ quality: 85 })
  .toFile('tmp-dl/about-banner-view.jpg')
console.log('view -> tmp-dl/about-banner-view.jpg')
