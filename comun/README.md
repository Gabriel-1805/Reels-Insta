# comun/ — lo que se reutiliza en todos los episodios

| Archivo | Para qué sirve |
|---|---|
| `tokens.css` | Colores de marca, escenario 1080×1920, subtítulos, etiquetas con fondo y la máscara que impide que el QR/zoom pase por detrás de los subtítulos |
| `camara.js` | Polvo flotante y cámara virtual: `focus()`, `cam()`, `blur()` con paralaje del fondo y, desde la Fase 2, `tilt(inicio,dur,{rx,ry,rz})`: inclinación 3D con niebla de profundidad, y `enganchar()`: llega torcido y se endereza |
| `subtitulos.js` | Karaoke en grupos de ≤3 palabras; las `[palabras]` llevan recuadro azul con nodos |
| `etiquetas.js` | `etiquetas([[inicio,fin,'TEXTO','bad']])` — etiquetas con fondo propio; la línea guía se dibuja, aparece el nodo y luego el texto |
| `palabras.py` + `palabras_clave.txt` | Recuadros: lista fija (la del episodio + la común) y, si una cláusula no tiene ninguna, la palabra de contenido más larga |
| `alinear.py` | Alinea `guion.txt` con `voz.wav` usando las pausas reales del audio → `tiempos.json` |
| `construir.py` | Arma `index.html` del episodio juntando `comun/` + lo propio del episodio |
| `cierre.html/css/js` + `marca.json` + `marca/logo-avatar.png` | Escena de cierre común: al decir «Sígueme» aparece el perfil de la cuenta; al decir «envíaselo» sube la hoja de compartir con avatares chico/chica alternados; «amigo» elige un contacto y termina en «Enviado». Los tiempos salen de las palabras de la voz |
| `sonido.js` + `sonido/` | Sonido: `sfx(t,'nombre',vol,dur)` registra señales; `cam()`, `tilt()`, `etiquetas()` y el cierre registran las suyas. `sonido/efectos.py` sintetiza los efectos (whooshes graves y suaves; sonidos del QR electrónicos; originales, sin licencias); `mezclar.py` mezcla voz+efectos en `audio.wav` (−14 LUFS); `hacer_sonido.py` lo hace todo en un comando |
| `probar.js` | Banco de pruebas de la línea de tiempo (errores, cámara, animaciones que se pisan, determinismo). No ve imágenes |
| `patrones.md` | Recetas visuales validadas y dónde está su código |

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

## Fase 2 (perspectiva y profundidad)
- `construir.py` envuelve el mundo en `#tilt` y añade `#fog`: cualquier episodio puede llamar a `tilt()`.
- `tilt()` usa perspectiva 1400 y rotaciones; úsalo en planos amplios (en primeros planos desplaza el encuadre).
- Brillo: copia desenfocada del elemento debajo (`filter` de SVG), no `drop-shadow` sobre el propio elemento.
- No poner `transform` en el CSS de un elemento que GSAP vaya a animar desde cero: usar `fromTo`.

## Probar antes del preview
```
npm install --no-save gsap jsdom        # una vez
node comun/probar.js episodios/ep01-qr/index.html
```
Debe decir `animaciones que se pisan: 0` y `determinista: true`. Después, siempre, mirar el preview.

## Cierre común
- Cambiar usuario de la cuenta: `comun/marca.json`. Cambiar el logo: reemplazar `comun/marca/logo-avatar.png` (cuadrado, se incrusta solo).
- Título que aparece bajo el perfil: `episodios/epNN/cierre.json` → `{"titulo":"..."}`.
- El guion de cada episodio debe terminar con la frase fija: «Sígueme y envíaselo a ese amigo que…».
- Si la voz va muy rápida, el cierre espera a que cada paso se vea (perfil ≥ 1,3 s antes de la hoja; contacto ≥ 1 s después).
- Nombres y caras de los avatares: originales (Mati, Sofi, Nacho, Vale), alternando chico y chica; editar la lista `AV` en `cierre.js`.

## Sonido (Fase 3) — solo voz y efectos, sin música
```
npm install --no-save gsap jsdom                         # una vez
python3 comun/sonido/hacer_sonido.py episodios/ep01-qr   # construye, extrae señales, mezcla y reconstruye
```
- **Sin música de fondo** (decisión del Ep. 1). Los efectos bajan 3 dB mientras habla la voz.
- **Whooshes graves y suaves** (centro ≈ 150–430 Hz); **sonidos del QR electrónicos** (onda cuadrada + reducción de resolución): `tick`, `lock`, `beam`, `shimmer`, `confirm`, `enviado`, `pop`, `error`, `snap`.
- Niveles de cada tipo respecto a la voz: `GANANCIA` en `efectos.py`; volumen de cada señal: parámetro `v` de `sfx(...)` en `escena.js`.
- Evitar más de ~6 señales por segundo (el informe de `mezclar.py` lo indica).
- `index.html` usa `audio.wav` si existe; si no, `voz.wav`. Subir `audio.wav` al repo para que Actions lo use.
- La prueba mide niveles y tiempos, **no oye**: siempre escuchar el preview.
