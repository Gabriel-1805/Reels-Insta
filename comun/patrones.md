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
