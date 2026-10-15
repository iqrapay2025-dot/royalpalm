import sharp from 'sharp'

// Compare the freshly downloaded Welcome image with the existing campus-gate.webp
// (a previous session processed this same Drive ID into campus-gate.webp).
const a = 'tmp-dl/welcome-new.jpg'
const b = 'src/assets/campus-gate.webp'
for (const f of [a, b]) {
  const m = await sharp(f).metadata()
  console.log(f, m.format, `${m.width}x${m.height}`, 'exif:', !!m.exif)
}

const H = 420
const thumbs = await Promise.all(
  [a, b].map((f) => sharp(f).rotate().resize(640, H, { fit: 'inside' }).png().toBuffer()),
)
await sharp({ create: { width: 1300, height: H + 24, channels: 3, background: '#222' } })
  .composite([
    { input: Buffer.from('<svg width="650" height="24"><rect width="650" height="24" fill="#111"/><text x="6" y="17" font-family="monospace" font-size="13" fill="#0f0">NEW download (Drive 1hsQLJid...)</text></svg>'), top: 0, left: 0 },
    { input: Buffer.from('<svg width="650" height="24"><rect width="650" height="24" fill="#111"/><text x="6" y="17" font-family="monospace" font-size="13" fill="#0f0">EXISTING campus-gate.webp</text></svg>'), top: 0, left: 650 },
    { input: thumbs[0], top: 24, left: 0 },
    { input: thumbs[1], top: 24, left: 650 },
  ])
  .jpeg({ quality: 85 })
  .toFile('tmp-dl/welcome-cmp.jpg')
console.log('sheet -> tmp-dl/welcome-cmp.jpg')
