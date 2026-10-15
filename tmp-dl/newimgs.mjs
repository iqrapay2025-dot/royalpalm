import sharp from 'sharp'

const items = [
  ['tmp-dl/1dFNzMw-nHtfLeY6IN1jV01tzV0Ig2lxr.bin', '1-leadership'],
  ['tmp-dl/1M806IKH3amY5T9QU4QhdT5fhS4fx_LoX.bin', '2-french'],
  ['tmp-dl/1cqval5-e0mZZfMsf-XHspPJJrFOzAulq.bin', '5-careerday'],
  ['tmp-dl/1hsQLJidWX650qlxAU5uyUMTsoskktYMr.bin', '6-welcome'],
]

const H = 330
const parts = []
let x = 0
for (const [p, l] of items) {
  const meta = await sharp(p).metadata()
  const w = Math.round((H * meta.width) / meta.height)
  const img = await sharp(p).resize(w, H, { fit: 'fill' }).toBuffer()
  const svg = Buffer.from(
    `<svg width="${w}" height="22"><rect width="${w}" height="22" fill="#111"/><text x="4" y="16" font-family="monospace" font-size="13" fill="#00ff00">${l} ${meta.width}x${meta.height}</text></svg>`,
  )
  parts.push({ input: img, left: x, top: 0 })
  parts.push({ input: svg, left: x, top: 0 })
  x += w
}
await sharp({ create: { width: x, height: H + 22, channels: 3, background: '#333' } })
  .composite(parts)
  .jpeg({ quality: 88 })
  .toFile('tmp-dl/new-imgs.jpg')
console.log('ok new-imgs', x)
