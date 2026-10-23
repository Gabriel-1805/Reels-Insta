# regla.md — Serie "Así funciona"

Especificación viva para producir episodios de divulgación en formato vertical, renderizados con HyperFrames.
Los patrones salen de un análisis de video de referencia. **Todo el contenido (guion, textos, gráficos) es original.**

Versión: v0.2 · Los valores `TBD` se completan al verificarlos.

---

## 0. Principios

1. Hacer visible lo invisible: cada episodio explica un fenómeno cotidiano bajando de escala (objeto → capa → detalle).
2. La imagen explica, la voz guía, el subtítulo marca el ritmo.
3. Un solo concepto nuevo por tramo.
4. El final siempre pide una acción concreta sobre una persona concreta.
5. Se copian **patrones**, nunca elementos: ni frases, ni personajes, ni gráficos, ni cuentas del original.

---

## 1. Formato técnico

| Parámetro | Valor |
|---|---|
| Resolución | 1080 × 1920 (9:16) |
| FPS | 30 |
| Duración objetivo | 45–75 s (máx. 90 s) |
| Codec | H.264, 8–12 Mbps, AAC 44,1 kHz |
| Motor | HyperFrames (HTML + CSS + animación seekable → MP4) |

Mejoras sobre la referencia (720 × 1280, ~1,2 Mbps): subir resolución y bitrate para evitar bandas en degradados oscuros; añadir un ruido muy sutil al fondo si aparecen.

---

## 2. Tokens de marca (colores medidos en el logo)

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#192653` | Paneles, caja del logo |
| `--bg-deep` | `#0B0F24` | Fondo general (más oscuro que `--navy`) |
| `--blue` | `#4B5BFF` | Recuadros de palabra clave, nodos, bordes |
| `--amber` | `#FFB703` | Energía, carga, palabra de énfasis |
| `--text` | `#FFFFFF` | Subtítulo activo |
| `--text-dim` | `#8A93B8` | Subtítulo inactivo |
| `--rgb-accents` | rojo / verde / azul | Solo para elementos de pantalla o subpíxeles |

Tipografía: sans geométrica, pesos 400 / 600 / 800. Cursiva bold solo para una palabra de énfasis por escena.
Fondo: casi negro con rejilla de plano técnico a baja opacidad y partículas flotantes lentas.

---

## 3. Ritmo

- **Gancho (0–3 s):** una paradoja visual + una frase. Sin presentación ni logo previo.
- **Micropausa de 0,4 s** al cerrar el gancho, seguida de un empuje de cámara.
- **Señal visual** (zoom, etiqueta, número, cambio de escena) como mucho cada 6–8 s.
- **Patrón ráfaga → pausa:** transición rápida y luego 2–4 s casi estáticos donde mandan los subtítulos.
- **Cortes duros:** pocos (~6–8 por minuto). La velocidad viene del movimiento de cámara y los morphs.
- **Palabras por minuto:** `TBD`. Los valores de partida de la tabla de abajo salen de un resumen, no de una locución real, así que son solo una guía para el guion propio.

| Tramo | ppm guía | Motivo |
|---|---|---|
| Gancho | 140–150 | Densidad alta para enganchar |
| Mecanismo | 90–110 | Más tiempo visual para entender |
| Casos límite | 110–130 | Ritmo algo más ágil |
| CTA | ≤ 10 palabras en 5 s | Se tiene que poder leer |

---

## 4. Escenas y cámara

**Escalera de zoom** (de general a particular):
1. Objeto o situación cotidiana
2. Corte transversal / capa interna
3. Componente o detalle, con números

Reglas:
- Cada nivel dura 4–6 s.
- La transición entre niveles es un movimiento continuo de cámara, no un corte seco.
- Una etiqueta por concepto, con línea guía y mayúsculas pequeñas. **Máximo 3 a la vez.**
- Tamaño mínimo de etiqueta legible en móvil: 28 px sobre lienzo de 1080 de ancho.
- Los números animados aparecen solo cuando la voz los menciona.
- Un anillo o gesto de toque puede servir de anclaje visual en momentos de transición.

**Plantilla por tramos (% de duración):**

| Tramo | % | Contenido | Función |
|---|---|---|---|
| Gancho | 0–5 | Paradoja visual | Retener |
| Ancla | 5–15 | Situación cotidiana | Conectar |
| Mecanismo | 15–60 | 3 niveles de zoom con números | Explicar |
| Casos límite | 60–85 | 2 ejemplos curiosos | Sorprender |
| Dato | 85–92 | Cifra con fuente visible | Dar credibilidad |
| CTA | 92–100 | Acción concreta | Compartir |

---

## 5. Animación y efectos

- Cámara virtual con zoom continuo y desenfoque ligero en los extremos.
- Líneas o arcos de energía en `--amber`, con brillo suave (glow), no más de uno protagonista por escena.
- Contadores numéricos que cambian en vivo.
- Mockups de interfaz (teléfono, hoja de compartir) para el CTA.
- Partículas y burbujas lentas de fondo.
- Fuente del dato visible en pantalla al mostrar una cifra.
- Evitar: elementos decorativos sin función, más de un efecto de transición por escena.

---

## 6. Subtítulos

- Estilo karaoke: palabra activa en `--text` y negrita, resto en `--text-dim`.
- Palabra clave dentro de recuadro `--blue` con nodos en las esquinas (guiño al logo).
- Fragmentos de 1–3 palabras, máximo 2 líneas.
- Posición: centrado, a ~18 % desde arriba; zona inferior (25 %) libre para la interfaz de la plataforma.
- Entrada 0,1 s antes de la palabra que activa.
- **Legibilidad:** si el fondo es claro (piel, luz), añadir sombra suave o fondo semitransparente tras el texto.
- Emoji inline solo en palabras clave, máximo 1 por escena.

---

## 7. Audio

- Loudness integrado: **−14 LUFS**; LRA ≤ 4 LU.
- True peak: **≤ −1 dBTP** (la referencia llega a +0,6 dBFS; no se replica).
- Pausas entre ideas: 0,3–0,6 s. Pausa de 0,5 s antes del CTA.
- Voz: grabada o TTS, siempre limpia y comprimida de forma ligera.
- Música: `TBD` (género, nivel relativo a la voz, entrada y salida).
- Efectos de sonido: `TBD` (lista y momentos).

---

## 8. Estructura del proyecto (HyperFrames)

```
Reels-Insta/
├── regla.md
├── episodios/
│   └── ep01-tema/
│       ├── index.html        # composición
│       ├── guion.md          # tabla: tiempo | narración | escena | función
│       ├── voz.wav
│       └── captions.json     # palabras con tiempos (Whisper)
├── comun/
│   ├── tokens.css            # variables de la sección 2
│   ├── captions.js           # subtítulos karaoke
│   └── labels.js             # etiquetas con línea guía
└── .github/workflows/render.yml
```

Reglas técnicas:
- Las animaciones deben ser **seekables** (función del tiempo, sin depender de un reloj real), para que el render sea determinista.
- Todo el estilo sale de `tokens.css`; nada de colores sueltos.
- Cada episodio parte del mismo esqueleto de tramos (sección 4).

---

## 9. Flujo Codespaces + Actions

1. **Codespaces:** diseñar, previsualizar y ajustar la composición.
2. `npx hyperframes lint` antes de cada commit.
3. **Actions:** `workflow_dispatch` para el render final; el MP4 se sube como artefacto.
4. El MP4 final no se guarda en el repo (evita inflar el historial).
5. Cada episodio vive en su propia rama o carpeta.

---

## 10. Métricas por episodio

Registrar a las 24 h y a los 7 días.

| Métrica | Dónde leerla | Meta inicial |
|---|---|---|
| Retención a 3 s | Gráfico de retención | `TBD` |
| Retención media | Gráfico de retención | `TBD` |
| Finalización | % que llega al final | `TBD` |
| Compartidos | Interacciones | `TBD` |
| Guardados | Interacciones | `TBD` |
| Comentarios | Interacciones | `TBD` |

---

## 11. Checklist de producción

- [ ] Guion en tabla con tiempo, narración, escena y función
- [ ] Gancho de 3 s con paradoja clara
- [ ] ppm dentro de rango por tramo
- [ ] Señal visual cada 6–8 s
- [ ] Máximo 3 etiquetas simultáneas, legibles en móvil
- [ ] Subtítulos sincronizados, legibles y en zona segura
- [ ] Cifras con fuente visible
- [ ] CTA ≤ 10 palabras
- [ ] −14 LUFS y true peak ≤ −1 dBTP
- [ ] `lint` sin errores
- [ ] Preview en Codespaces
- [ ] Render final con Actions, en 1080 × 1920
- [ ] Revisar que no se copia ningún elemento del original
- [ ] Registrar métricas

---

## 12. Pendientes

- [ ] Describir música y efectos de la referencia (género, volumen, momentos)
- [ ] Completar ppm reales con la transcripción de Whisper
- [ ] Definir el primer tema de episodio
- [ ] Elegir voz: grabada o TTS
- [ ] Obtener métricas del primer episodio
