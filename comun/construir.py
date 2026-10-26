#!/usr/bin/env python3
"""Arma episodios/<ep>/index.html a partir de comun/ + los archivos propios del episodio.
Uso: python3 comun/construir.py episodios/ep01-qr
Necesita en la carpeta del episodio: tiempos.json (alinear.py), escena.css, escena.mundo.html, escena.clips.html, escena.js, palabras_clave.txt"""
import sys, json, math, re, base64, html as H
from pathlib import Path
raiz=Path(__file__).parent; ep=Path(sys.argv[1]); sys.path.insert(0,str(raiz))
from palabras import marcar, limpia
rd=lambda p:Path(p).read_text(encoding='utf-8')
T=json.loads(rd(ep/'tiempos.json'))
caps=T['caps']; CL=[[round(c['s'],2),round(c['e'],2)] for c in T['clauses']]
ps=list(T['par_start']); ps[0]=0.0
CTA=round(ps[-1],1); TOT=float(math.ceil(T['dur']+0.5))
SC=[[ps[i],ps[i+1]] for i in range(len(ps)-2)]+[[ps[-2],CTA],[CTA,TOT]]
claves={limpia(l) for f in (raiz/'palabras_clave.txt',ep/'palabras_clave.txt') if f.exists() for l in rd(f).splitlines() if l.strip() and not l.startswith('#')}
res=marcar(caps,claves)
marca=json.loads(rd(raiz/'marca.json')); cj=json.loads(rd(ep/'cierre.json')) if (ep/'cierre.json').exists() else {}
logo='data:image/png;base64,'+base64.b64encode((raiz/'marca'/'logo-avatar.png').read_bytes()).decode()
CIERRE_HTML=(rd(raiz/'cierre.html').replace('__USUARIO__',H.escape(marca['usuario'])).replace('__TITULO__',H.escape(cj.get('titulo','')))
             .replace('__LOGO__',logo).replace('__CDUR__',str(round(TOT-CTA,2))))
AUDIO='audio.wav' if (ep/'audio.wav').exists() else 'voz.wav'; AUDIO_DUR=TOT if AUDIO=='audio.wav' else T['dur']
html=f"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Así funciona</title>
<style>
{rd(raiz/'tokens.css')}{rd(raiz/'cierre.css')}{rd(ep/'escena.css')}</style></head><body>
<div id="stage" data-composition-id="qr-ep01" data-start="0" data-width="1080" data-height="1920">
  <div id="bgclip" class="abs clip" data-start="0" data-duration="{TOT}" data-track-index="0"><div id="bg-grid" class="grid"></div><div id="dust"></div></div>
  <div id="qrclip" class="abs clip" data-start="0" data-duration="{CTA}" data-track-index="1"><div id="world"><div id="tilt">{rd(ep/'escena.mundo.html')}</div></div><div id="fog"></div></div>
  <div id="lbls" class="clip" data-start="0" data-duration="{CTA}" data-track-index="2"></div>
{rd(ep/'escena.clips.html')}
{CIERRE_HTML}
  <div id="cap" class="clip" data-start="0" data-duration="{TOT}" data-track-index="5"></div>
  <audio id="voz" src="{AUDIO}" data-start="0" data-duration="{AUDIO_DUR}" data-track-index="9" data-volume="1"></audio>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script>
  const tl=gsap.timeline({{paused:true}});
  const SC={json.dumps(SC)},CL={json.dumps(CL)},CTA={CTA},TOT={TOT};
  const T=(i,f)=>SC[i][0]+f*(SC[i][1]-SC[i][0]);
  const C=(k,f=0)=>CL[k][0]+f*(CL[k][1]-CL[k][0]);
  const CAPS={json.dumps(caps,ensure_ascii=False)};
{rd(raiz/'sonido.js')}
{rd(raiz/'camara.js')}
{rd(raiz/'etiquetas.js')}
{rd(raiz/'subtitulos.js')}
{rd(ep/'escena.js')}
{rd(raiz/'cierre.js')}
  window.__timelines=window.__timelines||{{}};window.__timelines['qr-ep01']=tl;
  </script>
</div></body></html>
"""
html=re.sub(r'__S(\d)S__',lambda m:str(SC[int(m.group(1))][0]),html)
html=re.sub(r'__S(\d)D__',lambda m:str(round(SC[int(m.group(1))][1]-SC[int(m.group(1))][0],2)),html).replace('__CTA__',str(CTA))
(ep/'index.html').write_text(html,encoding='utf-8')
sin=[r for r in res if r[0]=='ninguna']
print(f"index.html listo · {len(SC)} escenas · {len(caps)} palabras · recuadros: {sum(r[0]=='lista' for r in res)} cláusulas por lista, {sum(r[0]=='regla' for r in res)} por regla, {len(sin)} sin recuadro (solo conectores)")
for o,t,k in res: print(f"  {o:8} {' '.join(k) or '—':28} | {t[:55]}")
