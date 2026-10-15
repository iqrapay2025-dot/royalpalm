import fs from 'node:fs'
import sharp from 'sharp'

const dir = 'tmp-dl/gallery'
const files = fs.readdirSync(dir)
const log = []
for (const f of files) {
  const p = `${dir}/${f}`
  const magic = fs.readFileSync(p).subarray(4, 12).toString('ascii')
  if (magic !== 'ftypheic') continue
  const id = f.replace(/\.jpg$/, '')
  const res = await fetch(`https://drive.google.com/thumbnail?id=${id}&sz=w2400`)
  if (!res.ok) {
    log.push(`FAIL ${id} ${res.status}`)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(p, buf)
  const meta = await sharp(p).metadata()
  log.push(`OK ${id} ${buf.length} ${meta.width}x${meta.height}`)
}
fs.writeFileSync('tmp-dl/refetch.log', log.join('\n'))

