#!/usr/bin/env python3
"""Alinea guion.txt (un párrafo por línea) con voz.wav.
Modo A (si existe segmentos.json, creado por comun/audio/segmentar.py): cada tramo entre pausas está transcrito, así que cada palabra del guion se asigna a su tramo REAL (tiempos exactos).
Modo B (sin segmentos.json): usa las pausas del audio y el reparto por sílabas (menos preciso con voces con muchas pausas).
Uso: python3 comun/alinear.py episodios/ep01-qr      -> escribe tiempos.json
Necesita ffmpeg. Inicio de cada cláusula = medido en una pausa; tiempo de cada palabra = estimado por sílabas."""
import re, json, subprocess, sys
from pathlib import Path
ep=Path(sys.argv[1]); audio=str(ep/'voz.wav')
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',audio],capture_output=True,text=True).stdout)
r=subprocess.run(['ffmpeg','-hide_banner','-i',audio,'-af','silencedetect=noise=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
sil=[(float(e)-float(d),float(e),float(d)) for e,d in re.findall(r'silence_end: ([\d.]+) \| silence_duration: ([\d.]+)',r)]
def syl(w):
    w=re.sub(r"[^\wáéíóúüñ]","",w.lower()); return max(1,len(re.findall(r"[aeiouáéíóúü]+",w)))
import unicodedata, difflib
def _k(w):
    w=unicodedata.normalize('NFD',w.lower()); w=''.join(c for c in w if unicodedata.category(c)!='Mn'); return re.sub(r'[^a-z0-9]','',w)
_NUM={'0':'cero','1':'uno','2':'dos','3':'tres','4':'cuatro','5':'cinco','6':'seis','7':'siete','8':'ocho','9':'nueve','10':'diez'}
def alinear_segmentos():
    seg=json.loads((ep/'segmentos.json').read_text(encoding='utf-8'))
    paras=[l.strip() for l in open(ep/'guion.txt',encoding='utf-8') if l.strip()]
    pal=[];cls=[]   # pal: palabras del guion con su cláusula/párrafo
    for pi,p in enumerate(paras):
        for sent in re.split(r'(?<=[.!?])\s+',p):
            for c in re.split(r'(?<=[,;:])\s+',sent):
                cls.append({'p':pi,'t':c,'end':bool(re.search(r'[.!?]$',c))})
                for w in c.split(): pal.append({'w':w,'k':_k(w),'c':len(cls)-1,'p':pi})
    vocab=sorted({x['k'] for x in pal})
    asr=[]   # palabras reconocidas con su tramo
    for si,g in enumerate(seg):
        for w in g['texto'].split():
            k=_k(_NUM.get(re.sub(r'\W','',w),w))
            if not k: continue
            if k not in vocab:
                m=difflib.get_close_matches(k,vocab,n=1,cutoff=.72); k=m[0] if m else k
            asr.append((k,si))
    sm=difflib.SequenceMatcher(None,[a[0] for a in asr],[x['k'] for x in pal],autojunk=False)
    seg_de=[None]*len(pal); aciertos=0
    for b in sm.get_matching_blocks():
        for d in range(b.size): seg_de[b.b+d]=asr[b.a+d][1]; aciertos+=1
    # palabras sin pareja: se reparten entre el tramo anterior y el siguiente según la capacidad de cada tramo
    total_syl=sum(syl(x['w']) for x in pal); habla=sum(g['e']-g['s'] for g in seg); tasa=total_syl/habla
    usado=[0.0]*len(seg)
    for i,x in enumerate(pal):
        if seg_de[i] is not None: usado[seg_de[i]]+=syl(x['w'])
    i=0
    while i<len(pal):
        if seg_de[i] is not None: i+=1; continue
        j=i
        while j<len(pal) and seg_de[j] is None: j+=1
        A=seg_de[i-1] if i>0 else 0; B=seg_de[j] if j<len(pal) else len(seg)-1
        k=A
        for q in range(i,j):
            n=syl(pal[q]['w'])
            while k<B and (seg[k]['e']-seg[k]['s'])*tasa-usado[k]<n*0.4: k+=1
            seg_de[q]=k; usado[k]+=n
        i=j
    for i in range(1,len(pal)): seg_de[i]=max(seg_de[i],seg_de[i-1])   # monótono
    caps=[]
    for k,g in enumerate(seg):
        idx=[i for i,s_ in enumerate(seg_de) if s_==k]
        if not idx: continue
        pesos=[syl(pal[i]['w']) for i in idx]; tot=sum(pesos); t=g['s']
        for n_,i in enumerate(idx):
            d=(g['e']-g['s'])*pesos[n_]/tot; caps.append({'i':i,'w':pal[i]['w'],'s':round(t,2),'e':round(t+d,2)}); t+=d
    caps.sort(key=lambda c:c['i'])
    for c in cls:
        ws=[x for x in caps if pal[x['i']]['c']==cls.index(c)]
        c['s']=ws[0]['s'] if ws else 0; c['e']=ws[-1]['e'] if ws else 0; c['w']=sum(syl(x['w']) for x in ws)
        c['snap']=bool(ws) and any(abs(c['e']-g['e'])<.03 for g in seg)
    for ci,c in enumerate(cls):
        ws=[x for x in caps if pal[x['i']]['c']==ci]
        if ws: ws[-1]['f']=True
    pst={}
    for x in caps: pst.setdefault(pal[x['i']]['p'],x['s'])
    for x in caps: x.pop('i')
    json.dump({'caps':caps,'clauses':cls,'par_start':[round(pst[i],2) for i in sorted(pst)],'dur':round(dur,3)},open(ep/'tiempos.json','w',encoding='utf-8'),ensure_ascii=False)
    print(f"modo A (segmentos): {aciertos} de {len(pal)} palabras del guion reconocidas ({100*aciertos//len(pal)} %), {len(pal)-aciertos} repartidas por capacidad. Audio {dur:.1f}s")
    sys.exit(0)
if (ep/'segmentos.json').exists(): alinear_segmentos()
t0=sil[0][1] if sil and sil[0][0]<0.05 else 0.0
t1=sil[-1][0] if sil and sil[-1][1]>=dur-0.1 else dur
sil=[s for s in sil if s[0]>t0+0.2 and s[1]<t1-0.1]
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
