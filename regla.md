# regla.md — Serie "Así funciona"

Especificación viva para producir episodios de divulgación en formato vertical, renderizados con HyperFrames.
Los patrones salen de un análisis de un video de referencia. **Todo el contenido (guion, textos, gráficos) es original.**

Versión: **v0.3** · Fase 1 (cámara y transiciones) validada en el Episodio 1 · Los valores `TBD` se completan al verificarlos.

Historial: v0.1 análisis inicial · v0.2 tokens medidos del logo, flujo Codespaces+Actions · **v0.3 cámara virtual, subtítulos sin choque, recuadros por frase, carpeta `comun/`, reglas del lint.**

---

## 0. Principios

1. Hacer visible lo invisible: bajar de escala (objeto → capa → detalle).
2. La imagen explica, la voz guía, el subtítulo marca el ritmo.
3. Un concepto nuevo por tramo.
4. El final pide una acción concreta sobre una persona concreta.
5. Se copian **patrones**, nunca elementos del video de referencia (frases, personajes, gráficos, cuentas).
6. Lo aprendido vive en archivos (`regla.md`, `comun/`), no en la memoria del chat.

---

## 1. Formato técnico

| Parámetro | Valor |
|---|---|
| Resolución | 1080 × 1920 (9:16) |
| FPS | 30 |
| Duración | 45–75 s (máx. 90 s) |
| Codec | H.264, 8–12 Mbps, AAC |
| Motor | HyperFrames (HTML + CSS + GSAP seekable → MP4) |

---

## 2. Tokens de marca (medidos en el logo)

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#192653` | Paneles, tarjetas |
| `--bg` | `#0B0F24` | Fondo general y módulos oscuros |
| `--blue` | `#4B5BFF` | Recuadros de palabra clave, nodos, bordes |
| `--amber` | `#FFB703` | Energía, datos, etiquetas |
| `--dim` | `#8A93B8` | Subtítulo inactivo |
| `--bad` | `#FF5A5F` | Errores y estados «no funciona» (✕) |

Tipografía: sans geométrica (Montserrat con fallback), pesos 400/600/800.
Fondo: radial oscuro + rejilla de plano técnico + partículas flotantes lentas.

---

## 3. Cámara virtual (Fase 1, validada)

Todo el contenido vive dentro de un «mundo» (`#world`) y se anima la cámara, no los objetos.

- `focus(px,py,S)` lleva un punto del mundo al centro con zoom `S`.
- `cam(inicio,duración,estado,ease)` mueve mundo, rejilla y polvo con **paralaje** (rejilla 25 %, polvo 50 %, con tope de desplazamiento).
- `blur()` añade un pulso de desenfoque en los movimientos rápidos.
- Escalera de zoom: objeto completo → capa interna → detalle (zooms de 2,2–2,3×).
- Transiciones por **movimiento continuo**, no por corte: pull-back, empuje, giro, y **zoom-through** (la cámara se mete en un módulo hasta llenar la pantalla y de ahí nace la escena siguiente; destino ≈ 64×).
- Ritmo ráfaga → pausa: movimiento de ~1,2–1,4 s y luego una deriva lenta (`ease:'none'`) mientras habla la voz.
- Las escenas se coreografían con **fracciones de la escena** `T(i,f)` y **tiempos de cláusula** `C(k,f)`, nunca con segundos fijos: así se adaptan a cualquier audio.

---

## 4. Subtítulos (Fase 1, validada)

- **Franja superior reservada** (y ≈ 130–420). El contenido visual se desvanece con una máscara (`mask-image`) antes de llegar a esa zona: **el QR/zoom nunca pasa por detrás del texto.**
- Karaoke: palabra activa blanca en negrita, resto `--dim`. Grupos de ≤ 3 palabras, sin cruzar el final de una cláusula.
- **Recuadros azules con nodos:** una palabra clave por cláusula como mínimo (máx. 2), con la regla combinada:
  1. lista fija (`palabras_clave.txt` del episodio + la común);
  2. si no hay, la palabra de contenido más larga (≥ 5 letras, no conector);
  3. cláusulas solo de conectores («Por eso,», «Sin embargo,») no llevan recuadro.
- Etiquetas inferiores con **fondo propio** (píldora oscura) para que no se mezclen con el contenido.
- Tiempos de palabra: el inicio de cada cláusula es **medido** en las pausas del audio; el de cada palabra, **estimado por sílabas** (puede desviarse unas décimas).
- Zona inferior (25 %) libre para la interfaz de la plataforma.

---

## 5. Ritmo y guion

- Gancho en los primeros 3 s con una pregunta o paradoja visual.
- Plantilla por tramos: gancho · respuesta · mecanismo (3 zooms) · casos límite · resultado · dato · cierre · CTA.
- Palabras por minuto: el audio del Ep. 1 salió a ~177 ppm (rápido); el cierre llegó a ~235. **Meta: 130–160 ppm; CTA ≤ 10 palabras y con pausa previa de ≥ 0,5 s.**
- Cada episodio: `guion.md` en tabla (tiempo · narración · escena y edición · función · ppm).
- Mantener un solo registro de voz (tú o vos): no mezclar «tenés» con «Sígueme».
- Cifras técnicas con fuente visible y verificada antes de publicar.

---

## 6. Audio

- Voz limpia y sin música de fondo. Objetivo: **−14 LUFS**, pico **≤ −1 dBFS** (con voz muy comprimida el pico limita: −14,7 LUFS es aceptable).
- Normalizar en dos pasadas (`loudnorm` con `linear=true`) sin cambiar la duración.
- Voz: propia, o TTS gratuito local (**Kokoro**, voz `em_alex`; suena mucho mejor que Piper).
- Música y efectos: `TBD` (Fase 3).

---

## 7. Estructura del repo (git)

```
Reels-Insta/
├── regla.md
├── .github/workflows/render.yml
├── comun/                       # se reutiliza en todos los episodios
│   ├── tokens.css  camara.js  subtitulos.js  etiquetas.js
│   ├── palabras.py  palabras_clave.txt
│   ├── alinear.py   construir.py
│   └── README.md
└── episodios/epNN-tema/
    ├── guion.txt  guion.md  voz.wav  tiempos.json  palabras_clave.txt
    ├── escena.css  escena.mundo.html  escena.clips.html  escena.js   # lo propio del tema
    └── index.html               # GENERADO por construir.py (no se edita a mano)
```

Cambiar la cámara o los subtítulos = editar `comun/` una vez y reconstruir cada episodio.

---

## 8. Flujo de un episodio

1. Copiar `ep01-qr` a `epNN-tema` como base.
2. `guion.txt` (un párrafo por línea) + `voz.wav`.
3. `python3 comun/alinear.py episodios/epNN-tema`
4. Editar `escena.*` y `palabras_clave.txt`.
5. `python3 comun/construir.py episodios/epNN-tema`
6. `npx hyperframes lint` → `preview` → commit y push.
7. GitHub → Actions → `render-video` → descargar el MP4.

Git: `git add` desde la raíz del repo; subir `voz.wav`; no subir `voces/`, `tmp/`, `*.mp4`, `.hyperframes/` (están en `.gitignore`).

---

## 9. Reglas aprendidas del lint de HyperFrames

- No animar `autoAlpha`/`opacity`/`visibility` en elementos con clase `clip`: anima un hijo.
- No animar `left`/`top`/`width`/`height`: usar `x`, `y`, `scale`.
- Todo `<audio>` y elemento de la línea de tiempo lleva `id` (sin `id`, el audio sale mudo).
- Animaciones seekable: `tl.set`/`tl.to` con posición absoluta; nunca encadenar `.to()` sin posición.
- No solapar dos animaciones de la misma propiedad sobre el mismo elemento.
- Las advertencias `nested_structure_needs_subcomposition` no bloquean el render (pendiente de resolver).
- Si el preview muestra un video viejo: borrar `episodios/epNN/.hyperframes` (caché) y reabrir.

---

## 10. Métricas por episodio

| Métrica | Dónde leerla | Meta |
|---|---|---|
| Retención a 3 s | Gráfico de retención | `TBD` |
| Retención media | Gráfico de retención | `TBD` |
| Finalización | % que llega al final | `TBD` |
| Compartidos / guardados / comentarios | Interacciones | `TBD` |

---

## 11. Checklist de producción

- [ ] Guion en tabla, ppm en rango, CTA corto
- [ ] Gancho de 3 s con pregunta o paradoja
- [ ] Voz limpia, −14 LUFS, pico ≤ −1 dBFS
- [ ] `alinear.py` con ≥ 90 % de cláusulas ancladas a una pausa real
- [ ] Una palabra clave con recuadro por cláusula
- [ ] Ningún elemento entra en la franja de subtítulos
- [ ] Cifras con fuente verificada
- [ ] `lint` sin errores · preview revisado
- [ ] Render con Actions · métricas registradas

---

## 12. Hoja de ruta

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Cámara virtual, transiciones, subtítulos sincronizados, `comun/` | ✅ Validada (Ep. 1) |
| 2 | Perspectiva 3D con CSS, brillo y profundidad de campo, etiquetas que se dibujan, metáforas del tema | Siguiente |
| 3 | Música de fondo y efectos de sonido | `TBD` (definir estilo) |
| 4 | 3D real (three.js o clips externos) | Probar primero en una escena aislada |

---

## 13. Pendientes

- [ ] Adaptar el TTS (Kokoro) para leer `guion.txt` y generar `voz.wav` dentro de `comun/`
- [ ] Resolver las advertencias de subcomposición del lint
- [ ] Verificar los porcentajes de corrección de errores (L 7 / M 15 / Q 25 / H 30 %) en la norma ISO/IEC 18004
- [ ] Definir estilo de música y efectos (Fase 3)
- [ ] Mejorar la sincronía palabra a palabra (alineación forzada)
- [ ] Registrar las métricas del Ep. 1
