# patrones.md — recetas visuales validadas (Ep. 1)

Cada receta dice qué cuenta, dónde está el código y qué cuidar. Lo genérico ya está en `comun/`; lo propio del tema vive en `episodios/ep01-qr/escena.*` y se copia como base.

## En `comun/` (listo para usar)
| Receta | Función | Cuándo usarla |
|---|---|---|
| Cámara que se acerca/aleja/gira | `cam(inicio,dur,focus(x,y,zoom))` | Siempre; en lugar de cortes |
| Desenfoque en movimientos rápidos | `blur(inicio,dur)` | Zooms y alejamientos |
| Perspectiva 3D con niebla | `tilt(inicio,dur,{rx,ry,rz})` | Planos **amplios** (en primeros planos desplaza el encuadre) |
| Llega torcido y se endereza | `enganchar(inicio,{rx,ry,rz})` | Cuando algo «se detecta» o «se fija» |
| Etiqueta con línea guía que se dibuja | `etiquetas([[ini,fin,'TEXTO','bad']])` | Cada concepto nuevo |
| Subtítulos karaoke con recuadros | `subtitulos.js` + `palabras.py` | Siempre |

## En `episodios/ep01-qr/` (copiar y adaptar)
- **Objeto con soporte, sombra y mesa en perspectiva** (`escena.mundo.html` + `escena.css`): da la sensación de «lugar» y no de pantalla plana.
- **Celular que escanea** (`#cel`, `#cono`, `#beam`, `#bits`): el celular entra desde abajo, su **pantalla mira a la cámara** (visor con esquinas de enfoque) y el haz sale de su **borde superior** hacia el objeto. Los 0 y 1 viajan del objeto al celular.
  - Lección: la cámara trasera apunta al objeto, así que **nunca mostrar la parte trasera del celular hacia el espectador**.
- **Zoom a la pantalla** (S6): la cámara entra en la pantalla del celular (`focus(540,1230,2.7)`) y las filas del resultado aparecen al ritmo de la voz (`C(k,f)`).
- **Brillo**: copia desenfocada del grupo debajo (`<filter><feGaussianBlur>` de SVG), no `drop-shadow` sobre el propio elemento.
- **Bloques de respaldo** (`#bk .b`): nueve bloques llegan volando a reconstruir una zona tapada.
- **Zoom-through** al cierre: la cámara se mete en un módulo (destino ≈ 64×) hasta llenar la pantalla; de ahí nace la escena siguiente.

## Cómo adaptar una receta a otro tema
1. Copia el bloque de `escena.mundo.html` / `escena.css` / `escena.js` a tu episodio.
2. Cambia los textos y el objeto; deja las funciones de `comun/` tal cual.
3. Sitúa cada evento con `T(escena,fracción)` o `C(cláusula,fracción)`, nunca con segundos fijos.
4. `python3 comun/construir.py episodios/epNN` y `node comun/probar.js episodios/epNN/index.html`.
5. Mira el preview: la prueba no ve imágenes.

## Cierre común (`comun/cierre.*`)
Marco de celular con iconos propios, perfil de la cuenta (logo + usuario + Seguir→Siguiendo) y hoja de compartir con avatares originales chico/chica alternados. Se dispara con las palabras de la voz (`Sígueme`, `envíaselo`, `amigo`). No usa logos ni interfaz de terceros.

## Sonido (`comun/sonido.js`, `comun/sonido/`)
- Cada recurso visual debe llevar su `sfx(tiempo,'nombre',vol,dur)` junto al código que lo anima.
- Mapa útil: zoom/alejamiento → `whoosh_in`/`whoosh_out` (automático en `cam()`); inclinación → `tilt` (automático); etiqueta → `tick` o `error` (automático); haz de escaneo → `beam`; algo se fija → `lock`/`snap`; algo aparece en pantalla → `pop`/`tick`; confirmación → `confirm`/`enviado`; brillo/datos → `shimmer`; golpe físico → `thud`/`tap`/`scratch`/`splat`.
- Lecciones validadas: whooshes **graves** y suaves; tecnología **electrónica**; **sin música**; no más de ~6 señales por segundo; agrupar series (un «pop» de cada dos o tres).

## Personajes y ondas (Ep. 2, copiar de `episodios/ep02-bostezo/escena.js`)
- `persona(id,x,y,{piel,piel2,pelo,camisa,largo})` y `animal(id,x,y,'chimp'|'dog')`: ilustraciones originales en HTML/CSS (boca y párpados son `div` animables).
- `bostezar(p,t0,d)`: abre la boca, cierra los ojos y vuelve; registra el sonido `bostezo`. `onda(t0,x0,x1)`: tres anillos que viajan de un personaje a otro.
- Rayos X: la cámara entra en la cabeza, `cara` baja a opacidad .1 y aparece el cerebro (SVG con nodos que se iluminan con `stagger`).
- Los objetos van repartidos por un **mundo ancho** y la cámara se desplaza entre ellos (pan con `cam()`); si dos palabras se dicen con < 1 s de diferencia, encuadrar ambas en un solo plano.
- Evitar propiedades de GSAP que no existen (p. ej. pasar `s` o `r` de `focus()` a `tl.set`): usar `x`, `y`, `scale`, `rotation`.
- El identificador de la composición es el nombre de la carpeta del episodio (`construir.py`).

### Lecciones del Ep. 2 (revisión)
- **No inclinar en 3D a personajes**: la perspectiva deforma cabeza y hombros. `tilt()` solo para objetos y planos de entorno.
- **Cuello y hombros en una sola pieza:** torso con radios elípticos que se funde con el suelo, escote (elipse del color de la piel) y cuello trapezoidal con sombra bajo la barbilla.
- **`fromTo` con `immediateRender:false`** cuando el estado inicial del `from` no debe verse antes de que empiece la animación (anillos de onda).
- **Sala dentro de un portal:** un `div` con `overflow:hidden` en el fondo del mundo; la cámara entra con `cam()` + `blur()` (zoom ≈ 3) y sale con otra `cam()`. Dentro, figuras pequeñas con cejas (`rotation`), pupilas (`x`,`y`) y «?» (`scale`).
- **Bostezos con género:** `bostezar(p,t0,d,'m'|'f'|'c'|'d')` → sonido `bostezo_m` (grave), `bostezo_f` (agudo), `bostezo_c` (chimpancé), `bostezo_d` (perro). Síntesis: inhalación con aire + vocal con 3 formantes que baja de tono + exhalación.
- **Bostezos reales:** `bostezo_m` y `bostezo_f` salen de grabaciones propias (`comun/sonido/muestras/`), recortadas y con la pausa/cola de la chica eliminadas. La animación toma su duración de `DUR_BOST` en `escena.js` para que la boca siga al audio. Cuando una síntesis no convence, grabar una muestra real es el camino más fiable.
