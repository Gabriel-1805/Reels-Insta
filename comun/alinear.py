#!/usr/bin/env python3
"""Alinea guion.txt (un párrafo por línea) con voz.wav usando las pausas reales del audio.
Uso: python3 comun/alinear.py episodios/ep01-qr      -> escribe tiempos.json
Necesita ffmpeg. Inicio de cada cláusula = medido en una pausa; tiempo de cada palabra = estimado por sílabas."""
import re, json, subprocess, sys
from pathlib import Path
ep=Path(sys.argv[1]); audio=str(ep/'voz.wav')
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',audio],capture_output=True,text=True).stdout)
r=subprocess.run(['ffmpeg','-hide_banner','-i',audio,'-af','silencedetect=noise=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
sil=[(float(e)-float(d),float(e),float(d)) for e,d in re.findall(r'silence_end: ([\d.]+) \| silence_duration: ([\d.]+)',r)]
t0=sil[0][1] if sil and sil[0][0]<0.05 else 0.0
t1=sil[-1][0] if sil and sil[-1][1]>=dur-0.1 else dur
sil=[s for s in sil if s[0]>t0+0.2 and s[1]<t1-0.1]
def syl(w):
    w=re.sub(r"[^\wáéíóúüñ]","",w.lower()); return max(1,len(re.findall(r"[aeiouáéíóúü]+",w)))
paras=[l.strip() for l in open(ep/'guion.txt',encoding='utf-8') if l.strip()]
cl=[]
for pi,p in enumerate(paras):
    for sent in re.split(r'(?<=[.!?])\s+',p):
        for c in re.split(r'(?<=[,;:])\s+',sent):
            cl.append({'p':pi,'t':c,'end':bool(re.search(r'[.!?]$',c))})
for c in cl: c['w']=sum(syl(w) for w in c['t'].split())
rem=sum(c['w'] for c in cl); cur=t0; used=set()
for i,c in enumerate(cl):
    c['s']=cur
    if i==len(cl)-1: c['e']=t1; c['snap']=False; break
    pred=cur+c['w']/rem*(t1-cur); win=0.9 if c['end'] else 0.5
    cand=[(j,s) for j,s in enumerate(sil) if j not in used and s[0]>=cur+0.25 and abs((s[0]+s[1])/2-pred)<=win and (s[2]>=0.2 if c['end'] else True)]
    if cand:
        j,s=min(cand,key=lambda x:abs((x[1][0]+x[1][1])/2-pred)-(0.6*x[1][2] if c['end'] else 0))
        used.add(j); c['e']=s[0]; c['snap']=True; nxt=s[1]
    else: c['e']=pred; c['snap']=False; nxt=pred
    rem-=c['w']; cur=nxt
caps=[]
for c in cl:
    ws=c['t'].split(); pesos=[syl(w) for w in ws]; tot=sum(pesos); t=c['s']
    for k,w in enumerate(ws):
        d=(c['e']-c['s'])*pesos[k]/tot
        caps.append({'w':w,'s':round(t,2),'e':round(t+d,2),**({'f':True} if k==len(ws)-1 else {})}); t+=d
pst={}
for c in cl: pst.setdefault(c['p'],c['s'])
json.dump({'caps':caps,'clauses':cl,'par_start':[round(pst[i],2) for i in sorted(pst)],'dur':round(dur,3)},open(ep/'tiempos.json','w',encoding='utf-8'),ensure_ascii=False)
print(f"{len(cl)} cláusulas, {sum(c['snap'] for c in cl[:-1])} de {len(cl)-1} ancladas a una pausa real. Audio {dur:.1f}s")
