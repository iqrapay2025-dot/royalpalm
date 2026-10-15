import os, subprocess, json

files = sorted(f for f in os.listdir('tmp-dl/g') if f.endswith('.jpg'))
TH = 260
rows = []
labels = []
for idx, f in enumerate(files, 1):
    labels.append(f'{idx:02d} {f[:-4]}')

# build montage command with sharp: create tiles with labels using svg
svg_parts = []
tiles = []
for idx, f in enumerate(files):
    tiles.append((idx, f))

# use sharp per image: resize + composite label
import math
cols = 6
tilew, tileh = TH, int(TH * 0.75) + 22
rows_n = math.ceil(len(files) / cols)
sheetw = cols * tilew
sheeth = rows_n * tileh

canvas = subprocess.run(['node', '-e', '''
const sharp=require('sharp');
(async()=>{
const cols=%d, tilew=%d, tileh=%d, rows=%d, sheetw=%d, sheeth=%d;
const fs=require('fs');
const files=JSON.parse(fs.readFileSync('tmp-dl/files.json'));
const canvas=sharp({create:{width:sheetw,height:sheeth,channels:3,background:'#222222'}});
const parts=[];
for(let i=0;i<files.length;i++){
  const r=Math.floor(i/cols), c=i%%cols;
  const label=String(i+1).padStart(2,'0')+' '+files[i].replace(/\\.jpg$/,'');
  const svg=`<svg width="${tilew}" height="20"><rect width="${tilew}" height="20" fill="#111"/><text x="4" y="14" font-family="monospace" font-size="12" fill="#0f0">${label}</text></svg>`;
  const img=await sharp('tmp-dl/g/'+files[i]).resize(tilew-4,tileh-24,{fit:'cover'}).toBuffer();
  parts.push({input:img,left:c*tilew+2,top:r*tileh+22});
  parts.push({input:Buffer.from(svg),left:c*tilew+2,top:r*tileh+1});
}
await canvas.composite(parts).jpeg({quality:80}).toFile('tmp-dl/sheet.jpg');
console.log('done');
})()
''' % (cols, tilew, tileh, rows_n, sheetw, sheeth)], capture_output=True, text=True)
print(canvas.stdout)
print(canvas.stderr[-2000:] if canvas.returncode else '')

json.dump(files, open('tmp-dl/files.json', 'w'))
print('files', len(files), 'sheet', sheetw, sheeth)
