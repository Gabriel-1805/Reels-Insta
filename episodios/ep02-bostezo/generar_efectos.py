#!/usr/bin/env python3
"""Genera efectos originales por síntesis y los mezcla con voz-limpia.wav.
No utiliza samples, grabaciones ni música de terceros. Requiere numpy, scipy y soundfile.
Ejecutar: python3 generar_efectos.py
Entradas: voz-limpia.wav, cues.json. Salidas: efectos-originales.wav, audio-con-efectos.wav, audio.wav.
"""
import json, math
from pathlib import Path
import numpy as np, soundfile as sf
from scipy import signal
BASE=Path(__file__).resolve().parent
C=json.loads((BASE/'cues.json').read_text(encoding='utf-8')); SR=int(C.get('sample_rate',44100))
def filt(x,cut,kind): return signal.sosfilt(signal.butter(4,cut,btype=kind,fs=SR,output='sos'),x)
def env(n,a=.01,r=.1):
 x=np.ones(n); aa=min(n,max(1,int(a*SR))); rr=min(n,max(1,int(r*SR))); x[:aa]=np.linspace(0,1,aa,endpoint=False); x[-rr:]*=np.linspace(1,0,rr); return x
def synth(name,d,seed):
 n=max(1,int(SR*d)); t=np.arange(n)/SR; rng=np.random.default_rng(seed)
 if name in ('whoosh_low','whoosh_soft'):
  q=filt(rng.normal(0,1,n),500 if name=='whoosh_low' else 850,'lowpass'); f0,f1=(190,90) if name=='whoosh_low' else (330,160); p=2*np.pi*(f0*t+(f1-f0)*t*t/(2*d)); x=(.55*q/(np.std(q)+1e-9)+.45*np.sin(p)+.22*np.sin(p*.5))*np.sin(np.pi*np.clip(t/d,0,1))**1.4
 elif name=='yawn_air':
  q=filt(rng.normal(0,1,n),1500,'lowpass'); q/=np.std(q)+1e-9; p=2*np.pi*np.cumsum(125+32*np.sin(2*np.pi*t/d))/SR; x=(.52*q+.25*(np.sin(p)+.28*np.sin(p*2.1)))*np.sin(np.pi*np.clip(t/d,0,1))**1.8
 elif name in ('soft_pop','tap','pulse','sparkle','confirm','thud','scratch'):
  if name=='soft_pop':
   f=420-230*np.clip(t/d,0,1); p=2*np.pi*np.cumsum(f)/SR; x=(np.sin(p)+.18*np.sin(p*2))*np.exp(-t*14)+.12*rng.normal(0,1,n)*np.exp(-t*55); x*=env(n,.002,min(.09,d/2))
  elif name=='tap':
   x=.55*np.sin(2*np.pi*760*t)*np.exp(-t*45)+.28*np.sin(2*np.pi*1120*t)*np.exp(-t*70)+.06*rng.normal(0,1,n)*np.exp(-t*90); x*=env(n,.001,min(.035,d/2))
  elif name=='pulse':
   x=filt((np.sin(2*np.pi*(95+25*np.cos(2*np.pi*t/d))*t)+.28*np.sin(2*np.pi*190*t))*np.sin(np.pi*np.clip(t/d,0,1))**1.5,400,'lowpass')
  elif name=='sparkle':
   f=300+180*np.sin(2*np.pi*t/d); p=2*np.pi*np.cumsum(f)/SR; x=(np.sin(p)+.22*np.sin(p*1.5))*np.exp(-t*2.7)+.12*filt(rng.normal(0,1,n),900,'lowpass')*np.exp(-t*4); x*=env(n,.01,min(.16,d/2))
  elif name=='confirm':
   x=np.zeros(n)
   for st,f,l in [(0,520,min(.13,d)),(min(.105,d*.45),690,min(.18,d*.7))]:
    i=int(st*SR); nn=min(n-i,int(l*SR))
    if nn>0: q=np.arange(nn)/SR; x[i:i+nn]+=.5*np.sin(2*np.pi*f*q)*np.exp(-q*18)
   x*=env(n,.002,min(.08,d/2))
  elif name=='thud':
   f=105-35*np.clip(t/d,0,1); p=2*np.pi*np.cumsum(f)/SR; x=(np.sin(p)*np.exp(-t*11)+.22*filt(rng.normal(0,1,n),300,'lowpass')*np.exp(-t*30)); x*=env(n,.002,min(.11,d/2))
  else:
   q=filt(filt(rng.normal(0,1,n),500,'highpass'),3800,'lowpass'); x=q*np.linspace(.2,1,n)*np.exp(-t*4.5); x*=env(n,.003,min(.07,d/2))
 peak=np.max(np.abs(x)); return x*(.8/peak) if peak>1e-12 else x
voice,sr0=sf.read(BASE/'voz-limpia.wav',always_2d=True)
if sr0!=SR: voice=signal.resample_poly(voice,SR,sr0,axis=0)
N=min(len(voice),int(C['duration']*SR)); voice=voice[:N]; fx=np.zeros((N,2))
for i,c in enumerate(C['cues']):
 q=synth(c['name'],c['dur'],730+i); st=int(c['t']*SR)
 if st>=N: continue
 n=min(len(q),N-st); q=q[:n]*c['vol']; pan=[-.18,.12,0,.16,-.12][i%5]; fx[st:st+n,0]+=q*math.sqrt((1-pan)/2); fx[st:st+n,1]+=q*math.sqrt((1+pan)/2)
m=voice.mean(axis=1); frame=int(.025*SR); hop=int(.01*SR); levels=[]; times=[]
for st in range(0,N-frame,hop): levels.append(np.sqrt(np.mean(m[st:st+frame]**2))); times.append((st+frame/2)/SR)
levels=np.array(levels); times=np.array(times); a=(levels>max(.004,np.percentile(levels,25)*1.9)).astype(float); v=np.interp(np.arange(N)/SR,times,a,left=0,right=0); w=max(1,int(.1*SR)); v=np.convolve(v,np.ones(w)/w,mode='same'); fx*= (1-v*(1-10**(-3/20)))[:,None]
p=np.max(np.abs(fx))
if p>.98: fx*=.98/p
sf.write(BASE/'efectos-originales.wav',fx,SR,subtype='PCM_16'); mix=voice.astype(float)+fx; p=np.max(np.abs(mix))
if p>.94: mix*=.94/p
sf.write(BASE/'audio-con-efectos.wav',mix,SR,subtype='PCM_16'); sf.write(BASE/'audio.wav',mix,SR,subtype='PCM_16')
print(f"OK: {len(C['cues'])} efectos; {N/SR:.2f}s; sin música")
