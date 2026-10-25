# comun/ — lo que se reutiliza en todos los episodios

| Archivo | Para qué sirve |
|---|---|
| `tokens.css` | Colores de marca, escenario 1080×1920, subtítulos, etiquetas con fondo y la máscara que impide que el QR/zoom pase por detrás de los subtítulos |
| `camara.js` | Polvo flotante y cámara virtual: `focus()`, `cam()`, `blur()` con paralaje del fondo |
| `subtitulos.js` | Karaoke en grupos de ≤3 palabras; las `[palabras]` llevan recuadro azul con nodos |
| `etiquetas.js` | `etiquetas([[inicio,fin,'TEXTO','bad']])` — etiquetas con fondo propio |
| `palabras.py` + `palabras_clave.txt` | Recuadros: lista fija (la del episodio + la común) y, si una cláusula no tiene ninguna, la palabra de contenido más larga |
| `alinear.py` | Alinea `guion.txt` con `voz.wav` usando las pausas reales del audio → `tiempos.json` |
| `construir.py` | Arma `index.html` del episodio juntando `comun/` + lo propio del episodio |

## Episodio nuevo (resumen)
1. Copia `episodios/ep01-qr/` a `episodios/epNN-tema/` como base.
2. Escribe `guion.txt` (un párrafo por línea) y pon `voz.wav` (voz limpia, ≈ −14 LUFS, pico ≤ −1 dBFS).
3. `python3 comun/alinear.py episodios/epNN-tema`
4. Edita `escena.css`, `escena.mundo.html`, `escena.clips.html`, `escena.js` y `palabras_clave.txt` (lo propio del tema).
5. `python3 comun/construir.py episodios/epNN-tema`
6. `npx hyperframes lint` → `preview` → commit/push → Actions «render-video».

## Reglas aprendidas (HyperFrames lint)
- No animar `autoAlpha`/`opacity`/`visibility` en un elemento con clase `clip`: anima un hijo.
- No animar `left`/`top`/`width`/`height`: usa `x`, `y`, `scale`.
- Cada `<audio>` y elemento de la línea de tiempo necesita `id`.
- Todo debe poder buscarse en el tiempo (`tl.set`/`tl.to` con posición absoluta). Nunca encadenar `.to()` sin posición.
- No solapar dos animaciones de la misma propiedad sobre el mismo elemento.
- Si el preview muestra un video viejo: borrar la caché `episodios/epNN/.hyperframes`.
