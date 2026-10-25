# regla.md — Serie "Así funciona"

Especificación viva para producir episodios de divulgación en formato vertical, renderizados con HyperFrames.
Los patrones salen de un análisis de un video de referencia. **Todo el contenido (guion, textos, gráficos) es original.**

Versión: **v0.4** · Fases 1 y 2 validadas en el Episodio 1 · Los valores `TBD` se completan al verificarlos.

Historial: v0.1 análisis inicial · v0.2 tokens del logo, flujo Codespaces+Actions · v0.3 cámara virtual, subtítulos sin choque, recuadros por frase, `comun/`, reglas del lint · **v0.4 perspectiva 3D, profundidad, etiquetas que se dibujan, escenario con celular que escanea, zoom a la pantalla, banco de pruebas.**

---

## 0. Principios

1. Hacer visible lo invisible: bajar de escala (objeto → capa → detalle).
2. La imagen explica, la voz guía, el subtítulo marca el ritmo.
3. Un concepto nuevo por tramo.
4. El final pide una acción concreta sobre una persona concreta.
5. Se copian **patrones**, nunca elementos del video de referencia.
6. Lo aprendido vive en archivos (`regla.md`, `comun/`), no en la memoria del chat.
7. **Coherencia física:** lo que se muestra debe poder ocurrir (p. ej. la cámara trasera del celular apunta al objeto; el espectador ve la pantalla, no la parte trasera).

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

## 3. Cámara virtual (Fase 1)

Todo el contenido vive dentro de un «mundo» (`#world`) y se anima la cámara, no los objetos.

- `focus(px,py,S)` lleva un punto del mundo al centro con zoom `S`.
- `cam(inicio,duración,estado,ease)` mueve mundo, rejilla y polvo con **paralaje** (rejilla 25 %, polvo 50 %, con tope de desplazamiento).
- `blur()` añade un pulso de desenfoque en los movimientos rápidos.
- Escalera de zoom: objeto completo → capa interna → detalle (2,2–2,3×).
- Transiciones por **movimiento continuo**, no por corte: pull-back, empuje, giro y **zoom-through** (destino ≈ 64×).
- Ritmo ráfaga → pausa: movimiento de ~1,2–1,4 s y luego deriva lenta (`ease:'none'`) mientras habla la voz.
- Todo se sitúa con **fracciones de escena** `T(i,f)` y **tiempos de cláusula** `C(k,f)`, nunca con segundos fijos.

---

## 4. Perspectiva y profundidad (Fase 2)

- `tilt(inicio,dur,{rx,ry,rz})` inclina el mundo en 3D (perspectiva 1400, rx ≈ 34–36°) y enciende la **niebla de profundidad** (`#fog`): lo lejano se funde con el fondo.
- **Úsalo en planos amplios.** En primeros planos desplaza el encuadre (la rotación no es sobre el punto enfocado).
- `enganchar(inicio,{rx,ry,rz})`: llega torcido y se endereza con rebote suave; sirve para el momento «se detecta / se fija».
- **Brillo:** copia desenfocada debajo (`feGaussianBlur` de SVG). No usar `drop-shadow` sobre el propio elemento.
- **Etiquetas que se dibujan:** la línea guía se traza (`scaleY`), aparece el nodo y luego el texto en una píldora con fondo.
- **El mundo tiene lugar, no solo objeto:** superficie en perspectiva (mesa), soporte, sombra, partículas y elementos que explican (celular, haz, bits).
- **Celular que escanea:** pantalla al frente (visor con esquinas de enfoque), haz desde el borde superior, bits que viajan del objeto al celular. Zoom a la pantalla cuando la voz explica el resultado.
- Metáfora de datos: bloques de respaldo que llegan a reconstruir una zona tapada.
- Receta por receta y su código: `comun/patrones.md`.

---

## 5. Subtítulos (Fase 1)

- **Franja superior reservada** (y ≈ 130–420). El contenido visual se desvanece con una máscara (`mask-image`) antes de llegar ahí: **nada pasa por detrás del texto.**
- Karaoke: palabra activa blanca en negrita, resto `--dim`. Grupos de ≤ 3 palabras, sin cruzar el final de una cláusula.
- **Recuadros azules con nodos:** una palabra clave por cláusula como mínimo (máx. 2): 1) lista fija (`palabras_clave.txt` del episodio + la común); 2) si no hay, la palabra de contenido más larga (≥ 5 letras, no conector); 3) cláusulas solo de conectores no llevan recuadro.
- Etiquetas inferiores con **fondo propio**. Zona inferior (25 %) libre para la interfaz de la plataforma.
- Tiempos: el inicio de cada cláusula es **medido** en las pausas del audio; el de cada palabra, **estimado por sílabas**.

---

## 6. Ritmo y guion

- Gancho en los primeros 3 s con una pregunta o paradoja visual.
- Plantilla: gancho · respuesta · mecanismo (3 zooms) · casos límite · resultado · dato · cierre · CTA.
- Palabras por minuto: el Ep. 1 salió a ~177 ppm (rápido). **Meta: 130–160 ppm; CTA ≤ 10 palabras con pausa previa ≥ 0,5 s.**
- `guion.md` por episodio (tiempo · narración · escena y edición · función · ppm).
- Un solo registro de voz (tú o vos). Cifras técnicas con fuente verificada antes de publicar.

---

## 7. Audio

- Voz limpia y sin música de fondo. Objetivo **−14 LUFS**, pico **≤ −1 dBFS** (con voz muy comprimida el pico limita: −14,7 LUFS es aceptable). Normalizar en dos pasadas (`loudnorm linear=true`) sin cambiar la duración.
- Voz: propia, o TTS gratuito local (**Kokoro**, voz `em_alex`).
- Música y efectos: `TBD` (Fase 3).

---

## 8. Estructura del repo

```
Reels-Insta/
├── regla.md
├── .github/workflows/render.yml
├── comun/   tokens.css camara.js subtitulos.js etiquetas.js palabras.py palabras_clave.txt
│            alinear.py construir.py probar.js README.md patrones.md
└── episodios/epNN-tema/
    ├── guion.txt guion.md voz.wav tiempos.json palabras_clave.txt
    ├── escena.css escena.mundo.html escena.clips.html escena.js   # lo propio del tema
    └── index.html            # GENERADO por construir.py (no se edita a mano)
```

---

## 9. Flujo de un episodio

1. Copiar `ep01-qr` a `epNN-tema` como base.
2. `guion.txt` (un párrafo por línea) + `voz.wav`.
3. `python3 comun/alinear.py episodios/epNN-tema`
4. Editar `escena.*` y `palabras_clave.txt` (recetas en `comun/patrones.md`).
5. `python3 comun/construir.py episodios/epNN-tema`
6. `node comun/probar.js episodios/epNN-tema/index.html` (0 solapes, determinista)
7. `npx hyperframes lint` → `preview` → commit/push.
8. Actions → `render-video` → descargar el MP4.

Git: `git add` desde la raíz; subir `voz.wav`; no subir `voces/`, `tmp/`, `*.mp4`, `.hyperframes/`.
**Entrega por zip:** subir el zip a la raíz del repo por la web, `git pull`, `python3 -m zipfile -e archivo.zip .`, `git rm -q archivo.zip`, reconstruir.

---

## 10. Reglas aprendidas del lint y de la animación

- No animar `autoAlpha`/`opacity`/`visibility` en elementos con clase `clip`: anima un hijo.
- No animar `left`/`top`/`width`/`height`: usar `x`, `y`, `scale`.
- Todo `<audio>` y elemento de la línea de tiempo lleva `id` (sin `id`, el audio sale mudo).
- Posiciones absolutas en la línea de tiempo; nunca encadenar `.to()` sin posición (se añade al final).
- No solapar dos animaciones de la misma propiedad sobre el mismo elemento.
- No poner `transform` en el CSS de un elemento que GSAP anime desde cero: usar `fromTo`.
- Las advertencias `nested_structure_needs_subcomposition` no bloquean el render (pendiente).
- Preview con video viejo: borrar `episodios/epNN/.hyperframes` (caché) y reabrir.
- La simulación (`probar.js`) no ve imágenes: **siempre mirar el preview** antes de dar algo por bueno.

---

## 11. Métricas por episodio

| Métrica | Dónde leerla | Meta |
|---|---|---|
| Retención a 3 s / media | Gráfico de retención | `TBD` |
| Finalización | % que llega al final | `TBD` |
| Compartidos / guardados / comentarios | Interacciones | `TBD` |

---

## 12. Checklist de producción

- [ ] Guion en tabla, ppm en rango, CTA corto, un solo registro de voz
- [ ] Gancho de 3 s con pregunta o paradoja
- [ ] Voz limpia, ≈ −14 LUFS, pico ≤ −1 dBFS
- [ ] `alinear.py` con ≥ 90 % de cláusulas ancladas
- [ ] Una palabra clave con recuadro por cláusula
- [ ] Nada entra en la franja de subtítulos
- [ ] La escena es físicamente coherente (qué cara se ve, hacia dónde apunta)
- [ ] `probar.js` sin solapes · `lint` sin errores · preview revisado
- [ ] Cifras con fuente verificada · render con Actions · métricas registradas

---

## 13. Hoja de ruta

| Fase | Contenido | Estado |
|---|---|---|
| 1 | Cámara virtual, transiciones, subtítulos sincronizados, `comun/` | ✅ Validada (Ep. 1) |
| 2 | Perspectiva 3D, profundidad, etiquetas que se dibujan, escenario con celular, zoom a la pantalla | ✅ Validada (Ep. 1) |
| 3 | Música de fondo y efectos de sonido | Siguiente (definir estilo) |
| 4 | 3D real (three.js o clips externos) | Probar primero en una escena aislada |

---

## 14. Pendientes

- [ ] Fase 3: estilo de música y efectos (whoosh en zooms, «tic» en números); revisar licencias
- [ ] Adaptar el TTS (Kokoro) para leer `guion.txt` y generar `voz.wav` dentro de `comun/`
- [ ] Resolver las advertencias de subcomposición del lint
- [ ] Verificar los porcentajes de corrección de errores (L 7 / M 15 / Q 25 / H 30 %) en ISO/IEC 18004
- [ ] Mejorar la sincronía palabra a palabra (alineación forzada)
- [ ] Registrar las métricas del Ep. 1
