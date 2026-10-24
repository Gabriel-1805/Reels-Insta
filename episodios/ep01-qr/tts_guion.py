"""
Genera voz.wav a partir de guion.md con Piper (TTS local, gratuito).
Cada tramo se sitúa en el tiempo indicado en la tabla del guion.

Uso (en la carpeta del episodio):
  python3 tts_guion.py                 # usa la voz por defecto
  python3 tts_guion.py --pitch 0.92    # más grave (1.0 = sin cambio)
"""
import re, subprocess, sys, argparse, json
from pathlib import Path

VOCES = {
    "ald":     ("es_MX-ald-medium",   "es/es_MX/ald/medium"),
    "davefx":  ("es_ES-davefx-medium","es/es_ES/davefx/medium"),
}
ap = argparse.ArgumentParser()
ap.add_argument("--voz", default="ald", choices=VOCES)
ap.add_argument("--pitch", type=float, default=0.92)
ap.add_argument("--guion", default="guion.md")
ap.add_argument("--salida", default="voz.wav")
args = ap.parse_args()

nombre, ruta = VOCES[args.voz]
modelo = Path("voces") / f"{nombre}.onnx"
if not modelo.exists():
    modelo.parent.mkdir(exist_ok=True)
    base = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/{ruta}/{nombre}"
    for ext in (".onnx", ".onnx.json"):
        subprocess.run(["curl", "-sSL", "-o", str(modelo) + ("" if ext == ".onnx" else ".json"), base + ext], check=True)

# 1) Leer tramos de la tabla del guion: | mm:ss–mm:ss | tramo | narración | ... |
tramos = []
for linea in Path(args.guion).read_text(encoding="utf-8").splitlines():
    m = re.match(r"\|\s*(\d\d):(\d\d)\s*–", linea)
    if not m:
        continue
    cols = [c.strip() for c in linea.strip().strip("|").split("|")]
    inicio = int(m.group(1)) * 60 + int(m.group(2))
    texto = re.sub(r"[\[\]]", "", cols[2])
    tramos.append((inicio, texto))

Path("tmp").mkdir(exist_ok=True)
ficheros, filtros, entradas = [], [], []
for i, (t, texto) in enumerate(tramos):
    f = f"tmp/tramo_{i:02d}.wav"
    subprocess.run(["python3", "-m", "piper", "-m", str(modelo), "-f", f],
                   input=texto.encode("utf-8"), check=True)
    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
    siguiente = tramos[i + 1][0] if i + 1 < len(tramos) else 74
    if t + dur > siguiente:
        print(f"AVISO tramo {i}: dura {dur:.1f}s pero el hueco es {siguiente - t}s. Acorta el texto o la voz se encimará.")
    # Pitch más grave sin cambiar la velocidad: bajar la frecuencia y compensar con atempo
    p = args.pitch
    ms = int(t * 1000)
    filtros.append(f"[{i}:a]asetrate=22050*{p},aresample=22050,atempo={1/p:.4f},"
                   f"adelay={ms}|{ms},aformat=sample_rates=44100:channel_layouts=stereo[a{i}]")
    entradas += ["-i", f]

n = len(tramos)
mezcla = "".join(f"[a{i}]" for i in range(n)) + \
         f"amix=inputs={n}:normalize=0:duration=longest,loudnorm=I=-14:TP=-1:LRA=4[out]"
subprocess.run(["ffmpeg", "-y", *entradas, "-filter_complex", ";".join(filtros) + ";" + mezcla,
                "-map", "[out]", "-ar", "44100", "-ac", "2", args.salida], check=True,
               stderr=subprocess.DEVNULL)
print(f"Listo: {args.salida} ({n} tramos, voz {nombre}, pitch {args.pitch})")
