#!/usr/bin/env python3
"""
Narrador gratuito (Kokoro, local) + subtítulos sincronizados.

Qué hace:
  1. Lee los tramos del arreglo `N` de index.html: [inicio, fin, "texto con [palabras clave]"].
  2. Genera cada FRASE por separado con Kokoro (voz masculina en español).
  3. Mide la duración real de cada frase y calcula el tiempo de cada palabra.
  4. Mezcla todo en voz.wav (-14 LUFS) con un toque de calidez (EQ + compresión suave).
  5. Escribe los tiempos reales dentro de index.html (entre /*CAPS_START*/ y /*CAPS_END*/).

Uso (en la carpeta del episodio):
  pip install kokoro-onnx soundfile
  python3 tts_guion.py
  python3 tts_guion.py --voz em_santa --speed 0.95 --pitch 0.96
"""
import re, json, subprocess, argparse, sys
from pathlib import Path
import numpy as np, soundfile as sf

BASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0"
# Cómo se pronuncian ciertos términos (solo para la voz; el subtítulo conserva el original)
PRON = {"QR": "cu erre", "1994": "mil novecientos noventa y cuatro", "pF": "picofaradios"}
PAUSA_COMA = 0.18   # segundos de pausa después de , : ;
GAP_FRASE = 0.28    # segundos entre frases
MAX_SPEED = 1.15

ap = argparse.ArgumentParser()
ap.add_argument("--voz", default="em_alex", choices=["em_alex", "em_santa"])
ap.add_argument("--speed", type=float, default=0.97)
ap.add_argument("--pitch", type=float, default=0.97, help="1.0 = sin cambio; <1 más grave")
ap.add_argument("--html", default="index.html")
ap.add_argument("--salida", default="voz.wav")
ap.add_argument("--modelos", default="voces")
a = ap.parse_args()

# ---------- modelo ----------
mdir = Path(a.modelos); mdir.mkdir(exist_ok=True)
for f in ("kokoro-v1.0.onnx", "voices-v1.0.bin"):
    if not (mdir / f).exists():
        print(f"Descargando {f} ...", flush=True)
        subprocess.run(["curl", "-sSL", "-o", str(mdir / f), f"{BASE}/{f}"], check=True)
from kokoro_onnx import Kokoro
k = Kokoro(str(mdir / "kokoro-v1.0.onnx"), str(mdir / "voices-v1.0.bin"))

# ---------- guion (arreglo N de index.html) ----------
html = Path(a.html).read_text(encoding="utf-8")
m = re.search(r"const N=(.*?);\n", html)
if not m:
    sys.exit("No encuentro 'const N=' en index.html")
N = json.loads(m.group(1))

def pron(w):
    core = w.replace("[", "").replace("]", "")
    mm = re.match(r"^(\W*)(.*?)(\W*)$", core)
    pre, word, post = mm.groups()
    return pre + PRON.get(word, word) + post

def syl(w):
    w = re.sub(r"[^\wáéíóúüñ]", "", w.lower())
    return max(1, len(re.findall(r"[aeiouáéíóúü]+", w)))

def trim(x, sr, th=0.008):
    idx = np.where(np.abs(x) > th)[0]
    if len(idx) == 0:
        return x
    return x[max(0, idx[0] - int(.02 * sr)): idx[-1] + int(.06 * sr)]

def sintetizar(frases, speed):
    out = []
    for s in frases:
        texto = " ".join(pron(w) for w in s.split(" "))
        x, sr = k.create(texto, voice=a.voz, speed=speed, lang="es")
        out.append(trim(x, sr))
    return out, sr

def tiempos(frase, t0, dur):
    ws = frase.split(" ")
    pausas = [PAUSA_COMA if re.search(r"[,:;]$", w) else 0 for w in ws]
    pausas[-1] = 0
    hab = max(dur - sum(pausas), dur * 0.5)
    pesos = [syl(pron(w)) for w in ws]
    tot = sum(pesos)
    t, res = t0, []
    for i, w in enumerate(ws):
        d = hab * pesos[i] / tot
        res.append({"w": w, "s": round(t, 2), "e": round(t + d, 2)})
        t += d + pausas[i]
    res[-1]["f"] = True
    return res

# ---------- generar y colocar en el tiempo ----------
piezas, caps, cursor, sr = [], [], 0.0, 24000
print("\nTramo | previsto      | real")
for (ini, fin, txt) in N:
    frases = re.split(r"(?<=[.!?])\s+", txt.strip())
    inicio = max(float(ini), cursor)
    speed = a.speed
    audios, sr = sintetizar(frases, speed)
    total = sum(len(x) / sr for x in audios) + GAP_FRASE * (len(frases) - 1)
    disponible = fin - 0.15 - inicio
    if total > disponible > 0 and speed < MAX_SPEED:      # acelerar un poco si no cabe
        speed = min(MAX_SPEED, speed * total / disponible)
        audios, sr = sintetizar(frases, speed)
        total = sum(len(x) / sr for x in audios) + GAP_FRASE * (len(frases) - 1)
    t = inicio
    for fr, x in zip(frases, audios):
        d = len(x) / sr
        piezas.append((t, x))
        caps += tiempos(fr, t, d)
        t += d + GAP_FRASE
    t_fin = t - GAP_FRASE
    aviso = "" if t_fin <= fin else f"  <-- AVISO: se pasa {t_fin - fin:.1f}s de su escena; acorta el texto"
    print(f"{ini:>4.0f}-{fin:<4.0f}| speed {speed:.2f}  | {inicio:5.1f}-{t_fin:5.1f}{aviso}")
    cursor = t_fin + 0.2

# ---------- mezcla ----------
mix = np.zeros(int((max(t + len(x) / sr for t, x in piezas) + 1.0) * sr), dtype=np.float32)
fade = int(.008 * sr)
for t, x in piezas:
    x = x.astype(np.float32).copy()
    x[:fade] *= np.linspace(0, 1, fade); x[-fade:] *= np.linspace(1, 0, fade)
    i = int(t * sr); mix[i:i + len(x)] += x
sf.write("_mezcla.wav", mix, sr)

p = a.pitch
filtros = []
if abs(p - 1) > 1e-3:
    filtros += [f"asetrate={int(sr * p)}", f"aresample={sr}", f"atempo={1 / p:.4f}"]
filtros += ["highpass=f=70", "equalizer=f=150:t=q:w=0.9:g=2.5", "equalizer=f=3500:t=q:w=1.2:g=-1.5",
            "acompressor=threshold=-20dB:ratio=2.5:attack=15:release=150",
            "loudnorm=I=-14:TP=-1:LRA=7"]
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", "_mezcla.wav", "-af", ",".join(filtros),
                "-ar", "44100", "-ac", "2", a.salida], check=True)
Path("_mezcla.wav").unlink()

# ---------- subtítulos con tiempos reales dentro de index.html ----------
NUEVO = """  // ---- subtítulos karaoke (tiempos reales por palabra, generados por tts_guion.py) ----
  const CAPS=/*CAPS_START*/[]/*CAPS_END*/;
  const cap=document.getElementById('cap');
  const WORDS=CAPS.length?CAPS:N.flatMap(([a,b,txt])=>{const w=txt.split(' '),d=(b-a-0.4)/w.length;return w.map((x,i)=>({w:x,s:a+i*d,e:a+(i+1)*d}))});
  const G=[];let cur=[];
  WORDS.forEach(x=>{cur.push(x);if(cur.length===3||x.f){G.push(cur);cur=[];}});
  if(cur.length)G.push(cur);
  G.forEach((g,gi)=>{
    const el=document.createElement('div');el.className='chunk';
    const sp=g.map(x=>{const s=document.createElement('span');s.textContent=x.w.replace(/[\\[\\]]/g,'');if(/\\[.*\\]/.test(x.w))s.className='key';el.appendChild(s);return s;});
    cap.appendChild(el);
    const s0=Math.max(0,g[0].s-0.08),nx=G[gi+1];
    const e0=Math.max(s0+.2,Math.min(g[g.length-1].e+0.25,nx?nx[0].s-0.02:1e9));
    tl.set(el,{autoAlpha:1},s0).set(el,{autoAlpha:0},e0);
    sp.forEach((s,j)=>tl.set(s,{color:'#fff',fontWeight:800},g[j].s));
  });
"""
if "CAPS_START" not in html:   # primera vez: sustituye el bloque antiguo (reparto uniforme)
    html, n = re.subn(r"  // ---- subtítulos karaoke.*?(?=  // ---- etiquetas ----)", lambda _: NUEVO, html, flags=re.S)
    if n != 1:
        sys.exit("No pude localizar el bloque de subtítulos en index.html")
html = re.sub(r"/\*CAPS_START\*/.*?/\*CAPS_END\*/",
              lambda _: "/*CAPS_START*/" + json.dumps(caps, ensure_ascii=False) + "/*CAPS_END*/", html, flags=re.S)
Path(a.html).write_text(html, encoding="utf-8")
dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.salida],
                           capture_output=True, text=True).stdout)
print(f"\nListo: {a.salida} ({dur:.1f}s, voz {a.voz}) y {len(caps)} palabras sincronizadas en {a.html}")
