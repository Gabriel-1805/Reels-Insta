#!/usr/bin/env python3
"""Control automático de concordancia: ¿pasa algo NUEVO en pantalla en cada cláusula de la voz?
Uso: python3 comun/concordancia.py episodios/ep03-gps     (necesita index.html y tiempos.json; node + gsap + jsdom)
Escribe concordancia_auto.md con, por cláusula: eventos de objeto, de cámara y de etiqueta, y avisa de:
  · SIN EVENTO: cláusula de ≥ 1,5 s sin ningún objeto ni cámara nuevos
  · SATURADA: más de 8 eventos de objeto en la misma cláusula
  · HUECO: más de 3,5 s seguidos sin ningún evento de objeto o de cámara"""
import sys, json, subprocess
from pathlib import Path
ep=Path(sys.argv[1]); raiz=Path(__file__).parent
T=json.loads((ep/'tiempos.json').read_text(encoding='utf-8'))
out=subprocess.run(['node',str(raiz/'concordancia.js'),str(ep/'index.html')],capture_output=True,text=True)
if out.returncode: sys.exit('No pude leer los eventos (¿falta npm install --no-save gsap jsdom?):\n'+out.stderr[-300:])
E=json.loads(out.stdout)['eventos']
filas=["| # | Tiempo | Cláusula | Objeto | Cámara | Etiqueta | Aviso |","|---|---|---|---|---|---|---|"];avisos=0
for k,c in enumerate(T['clauses']):
    dentro=[e for e in E if c['s']-.05<=e['t']<c['e']+.05]
    # un evento «de objeto» = (instante redondeado, elemento): los tweens con stagger sobre varios elementos cuentan una vez
    obj={(round(e['t'],1),e['quien']) for e in dentro if e['cat']=='objeto'}; cam=[e for e in dentro if e['cat']=='camara']; eti=[e for e in dentro if e['cat']=='etiqueta']
    av=[]
    if not obj and not cam and c['e']-c['s']>=1.5: av.append('SIN EVENTO')
    if len(obj)>8: av.append('SATURADA')
    avisos+=bool(av)
    filas.append(f"| {k} | {c['s']:.1f}–{c['e']:.1f} | {c['t'][:60]} | {len(obj)} | {len(cam)} | {len(eti)//3 if eti else 0} | {' · '.join(av)} |")
mov=sorted([e['t'] for e in E if e['cat'] in('objeto','camara')]); huecos=[]
prev=T['clauses'][0]['s']
for t in mov+[T['dur']]:
    if t-prev>3.5: huecos.append((round(prev,1),round(t,1)))
    prev=max(prev,t)
txt="# Control de concordancia (automático)\n\n"+"\n".join(filas)+"\n\n"
txt+=("**Huecos** (más de 3,5 s sin evento de objeto ni de cámara): "+(', '.join(f'{a}–{b} s' for a,b in huecos) if huecos else 'ninguno')+"\n")
(ep/'concordancia_auto.md').write_text(txt,encoding='utf-8')
print(txt); print(f"{avisos} cláusulas con aviso · {len(huecos)} huecos")
