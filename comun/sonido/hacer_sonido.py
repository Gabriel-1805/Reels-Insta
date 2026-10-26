#!/usr/bin/env python3
"""Todo el sonido de un episodio en un comando:  python3 comun/sonido/hacer_sonido.py episodios/ep01-qr
1) construye el index.html  2) extrae las señales (node + jsdom)  3) mezcla voz+música+efectos → audio.wav  4) vuelve a construir apuntando a audio.wav
Una vez:  npm install --no-save gsap jsdom"""
import sys, subprocess
from pathlib import Path
raiz=Path(__file__).resolve().parent.parent; ep=sys.argv[1]
run=lambda *a,**k:subprocess.run(a,check=True,**k)
run(sys.executable,str(raiz/'construir.py'),ep,stdout=subprocess.DEVNULL)
out=subprocess.run(['node',str(raiz/'sonido'/'extraer.js'),f'{ep}/index.html'],capture_output=True,text=True)
if out.returncode: sys.exit('No pude extraer las señales (¿falta npm install --no-save gsap jsdom?):\n'+out.stderr[-400:])
Path(ep,'cues.json').write_text(out.stdout)
run(sys.executable,str(raiz/'sonido'/'mezclar.py'),ep)
run(sys.executable,str(raiz/'construir.py'),ep,stdout=subprocess.DEVNULL)
print('Listo: index.html ahora usa audio.wav')
