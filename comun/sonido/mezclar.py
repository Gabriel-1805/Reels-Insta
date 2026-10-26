#!/usr/bin/env python3
"""Mezcla voz + efectos en un solo audio.wav (−14 LUFS, pico ≤ −1,5 dBTP). Sin música.
Uso: python3 comun/sonido/mezclar.py episodios/ep01-qr     (necesita cues.json y voz.wav; usa numpy y ffmpeg)
Los efectos bajan 3 dB mientras habla la voz."""
import sys, json, subprocess, re
from pathlib import Path
import numpy as np
sys.path.insert(0,str(Path(__file__).parent))
from efectos import crear, GANANCIA, SR
ep=Path(sys.argv[1]); C=json.loads((ep/'cues.json').read_text()); TOT=C['tot']; cues=C['cues']; N=int(TOT*SR)
raw=subprocess.run(['ffmpeg','-v','error','-i',str(ep/'voz.wav'),'-ac','1','-ar',str(SR),'-f','f32le','-'],capture_output=True,check=True).stdout
voz=np.frombuffer(raw,dtype=np.float32).astype(np.float64); v=np.zeros(N); v[:min(N,len(voz))]=voz[:N]
# --- nivel de la voz y envolvente de actividad ---
fr=int(.02*SR); nf=N//fr; rms=np.sqrt((v[:nf*fr].reshape(nf,fr)**2).mean(1)); act=rms>rms.max()*.04
vrms=np.sqrt(np.mean((v[:nf*fr].reshape(nf,fr)[act]**2)))
env=np.zeros(nf); a_at,a_re=1-np.exp(-.02/.08),1-np.exp(-.02/.45)
for i in range(nf): env[i]=env[i-1]+(a_at if act[i]>env[i-1] else a_re)*(act[i]-env[i-1]) if i else float(act[0])
envs=np.interp(np.arange(N)/SR,(np.arange(nf)+.5)*.02,env)
# --- efectos ---
cache={}; bus=np.zeros(N)
for c in cues:
    d=c.get('d'); key=(c['n'],round(d,1) if d else None)
    if key not in cache: cache[key]=crear(c['n'],d)
    x=cache[key]*vrms*10**(GANANCIA[c['n']]/20)*c['v']; i=int(c['t']*SR); j=min(N,i+len(x))
    if i<N: bus[i:j]+=x[:j-i]
bus*=1-(1-10**(-3/20))*envs
mix=v+bus
tmp=ep/'_mezcla.wav'
import wave
w=wave.open(str(tmp),'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(mix/ max(1,np.abs(mix).max()),-1,1)*32767).astype(np.int16).tobytes()); w.close()
def medir(af):
    r=subprocess.run(['ffmpeg','-hide_banner','-i',str(tmp),'-af',af,'-f','null','-'],capture_output=True,text=True).stderr
    return json.loads(r[r.rindex('{'):r.rindex('}')+1])
j=medir('loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json')
af=f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={j['input_i']}:measured_LRA={j['input_lra']}:measured_TP={j['input_tp']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg','-y','-v','error','-i',str(tmp),'-af',af,'-ar','44100','-ac','1',str(ep/'audio.wav')],check=True); tmp.unlink()
# --- informe ---
dens=max((sum(1 for c in cues if t<=c['t']<t+1) for t in np.arange(0,TOT,.25)),default=0)
db=lambda x:20*np.log10(x+1e-12)
print(f"voz: {db(vrms):.1f} dBFS (RMS con voz) · efectos: {len(cues)} señales, máx. {dens} por segundo · audio.wav listo ({TOT:.0f} s, ≈ −14 LUFS, pico ≤ −1,5 dBTP)")
