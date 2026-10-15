import json, os, subprocess

m = json.load(open('tmp-dl/namemap.json'))
os.makedirs('tmp-dl/g', exist_ok=True)
for n, i in m.items():
    out = 'tmp-dl/g/' + n.rsplit('.', 1)[0] + '.jpg'
    subprocess.run(['curl', '-sL', '-o', out,
                    f'https://drive.google.com/thumbnail?id={i}&sz=w1600'])
    print(os.path.getsize(out), out)
