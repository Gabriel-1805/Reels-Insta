#!/usr/bin/env python3
"""Tira de escenas: un fotograma del MEDIO de cada frase de la voz, con su texto debajo. Sirve para ver de un vistazo si la imagen concuerda con lo que se dice.
Uso:  python3 comun/tira.py episodios/ep03-gps                 (captura con `npx hyperframes snapshot` y arma tira_escenas.png)
      python3 comun/tira.py episodios/ep03-gps --carpeta snapshots   (usa fotogramas ya capturados: frame-NN-at-Xs.png)
      añade --clausulas para un fotograma por cláusula (en vez de por frase)
Necesita: pillow (pip install pillow)."""
import sys, re, json, subprocess, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
ep=Path(sys.argv[1]); T=json.loads((ep/'tiempos.json').read_text(encoding='utf-8'))
por_clausula='--clausulas' in sys.argv
# grupos: por frase (hasta una cláusula que termine en . ? !) o por cláusula
grupos=[];cur=[]
for c in T['clauses']:
    cur.append(c)
    if por_clausula or c.get('end'): grupos.append(cur);cur=[]
if cur: grupos.append(cur)
puntos=[(round((g[0]['s']+g[-1]['e'])/2,1),' '.join(c['t'] for c in g)) for g in grupos]
carpeta=ep/(sys.argv[sys.argv.index('--carpeta')+1] if '--carpeta' in sys.argv else 'snapshots')
if '--carpeta' not in sys.argv:
    r=subprocess.run(['npx','hyperframes','snapshot','--at',','.join(str(t) for t,_ in puntos)],cwd=ep)
    if r.returncode: sys.exit('npx hyperframes snapshot falló: revisa que el preview/lint funcionan y que el comando existe (npx hyperframes snapshot --help).')
fotos={}
for f in carpeta.glob('frame-*-at-*s.png'):
    m=re.match(r'frame-(\d+)-at-([\d.]+)s\.png',f.name)
    if m: fotos[float(m.group(2))]=f
def cerca(t):
    k=min(fotos,key=lambda x:abs(x-t)) if fotos else None
    return fotos[k] if k is not None and abs(k-t)<0.35 else None
W,H=270,480;cols=4;pie=92;fuente=ImageFont.load_default()
filas=(len(puntos)+cols-1)//cols
hoja=Image.new('RGB',(cols*W,filas*(H+pie)),(16,18,30));d=ImageDraw.Draw(hoja);falt=[]
for i,(t,txt) in enumerate(puntos):
    x=(i%cols)*W;y=(i//cols)*(H+pie);f=cerca(t)
    if f: hoja.paste(Image.open(f).convert('RGB').resize((W,H),Image.LANCZOS),(x,y))
    else: d.rectangle([x,y,x+W,y+H],outline=(120,60,60));d.text((x+8,y+8),'SIN FOTOGRAMA',fill=(255,120,120));falt.append(t)
    d.rectangle([x,y,x+78,y+14],fill=(0,0,0));d.text((x+3,y+2),f'{i+1} · {t:.1f} s',fill=(255,210,0))
    d.multiline_text((x+5,y+H+5),'\n'.join(textwrap.wrap(txt,44)[:5]),fill=(230,230,240),font=fuente,spacing=2)
hoja.save(ep/'tira_escenas.png');print(f'tira_escenas.png: {len(puntos)} fotogramas'+(f' · faltan {falt}' if falt else ''))
