import sharp from 'sharp'

// About page banner (Drive 1Y8yqiWN8HjXKiWmPBkLVeuy4h2qOeVFV) -> about-banner.webp
const src = 'tmp-dl/about-banner-src.jpg'
const out = 'src/assets/about-banner.webp'
const meta = await sharp(src)
  .rotate()
  .resize(1400, 1400, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile(out)
console.log('about-banner.webp', `${meta.width}x${meta.height}`, `${(meta.size / 1024).toFixed(0)}KB`)
