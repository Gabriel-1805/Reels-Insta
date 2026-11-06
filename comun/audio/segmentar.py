#!/usr/bin/env python3
"""Divide la voz en tramos entre pausas y transcribe cada tramo con Whisper → segmentos.json (con tiempos EXACTOS de inicio y fin).
Uso: python3 comun/audio/segmentar.py episodios/ep03-gps [--limite 240]    (se puede repetir: retoma donde quedó)
Necesita: ffmpeg, numpy, sherpa-onnx y el modelo whisper-small de sherpa-onnx (ver comun/README.md → «Audio primero»)."""
import sys, re, json, subprocess, wave, time, os
from pathlib import Path
import numpy as np
ep=Path(sys.argv[1]); LIM=float(sys.argv[sys.argv.index('--limite')+1]) if '--limite' in sys.argv else 240
MODELO=os.environ.get('WHISPER_DIR','/home/claude/work/sherpa-onnx-whisper-small/')
voz=str(ep/'voz.wav'); t_ini=time.time()
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',voz],capture_output=True,text=True).stdout)
r=subprocess.run(['ffmpeg','-hide_banner','-i',voz,'-af','silencedetect=noise=-38dB:d=0.12','-f','null','-'],capture_output=True,text=True).stderr
sil=sorted((float(e)-float(d),float(e)) for e,d in re.findall(r'silence_end: ([\d.]+) \| silence_duration: ([\d.]+)',r))
# tramos de habla = huecos entre pausas
pts=[0.0]; seg=[]; prev=0.0
for a,b in sil:
    if a-prev>=0.2: seg.append([round(prev,3),round(a,3)])
    prev=b
if dur-prev>=0.2: seg.append([round(prev,3),round(dur,3)])
f=ep/'segmentos.json'; hecho=json.loads(f.read_text(encoding='utf-8')) if f.exists() else []
ya={(h['s'],h['e']) for h in hecho}
import sherpa_onnx
rec=sherpa_onnx.OfflineRecognizer.from_whisper(encoder=MODELO+'small-encoder.int8.onnx',decoder=MODELO+'small-decoder.int8.onnx',tokens=MODELO+'small-tokens.txt',language='es',task='transcribe',num_threads=1)
raw=subprocess.run(['ffmpeg','-v','error','-i',voz,'-ac','1','-ar','16000','-f','f32le','-'],capture_output=True).stdout
x=np.frombuffer(raw,dtype=np.float32); sr=16000
for s,e in seg:
    if (s,e) in ya: continue
    if time.time()-t_ini>LIM: break
    p=np.zeros(int(.2*sr),dtype=np.float32); st=rec.create_stream(); st.accept_waveform(sr,np.concatenate([p,x[int(s*sr):int(e*sr)],p])); rec.decode_stream(st)
    hecho.append({'s':s,'e':e,'texto':st.result.text.strip()}); f.write_text(json.dumps(hecho,ensure_ascii=False,indent=1),encoding='utf-8')
print(f'{len(hecho)} de {len(seg)} tramos transcritos', 'LISTO' if len(hecho)>=len(seg) else 'PAUSA: vuelve a ejecutar')
