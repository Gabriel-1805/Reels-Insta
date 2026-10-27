# Guion técnico · Ep. 02 — ¿Por qué se contagian los bostezos?

**Audio original analizado:** `voz-original.wav`  
**Audio preparado para render:** `audio.wav`  
**Duración detectada:** 51.93 s · mono · 32000 Hz  
**Formato de entrega:** vertical 1080×1920, 30 fps, colores de marca de Reels-Insta.

> **Estado: storyboard temporal listo; transcripción literal pendiente de cotejo.** Se midieron las pausas/fragmentos de voz del WAV, pero el entorno de trabajo no dispone de un transcriptor de voz local fiable. No presento texto supuesto como si fuera transcripción: la tabla incluye propuestas editoriales claramente identificadas como sugeridas. Los titulares son rótulos visuales, no subtítulos literales del audio.

## Fraseo detectado

La voz activa aparece en 21 bloques acústicos medidos por energía RMS. El detalle de inicio y final está en `fraseo.json`. Esos bloques no equivalen necesariamente a frases gramaticales: la locución puede hacer pausas internas.

## Plan de escena

**Narración sugerida de referencia (no es transcripción del WAV).** Sirve para orientar la edición, pero no se debe copiar a `guion.txt` ni usar con `alinear.py` hasta cotejar cada palabra con el audio.

| Tiempo | Narración sugerida · verificar | Rótulo visual | Escena y edición | Función |
|---|---|---|---|---|
| 00.00–06.70 | ¿Te pasó que ves a alguien bostezar y de repente sentís ganas de hacerlo vos también? | ¿POR QUÉ SE CONTAGIAN LOS BOSTEZOS? | Primer plano de un rostro ilustrado. La boca se abre progresivamente y una onda ámbar se expande hacia un segundo perfil. | Gancho visual / pregunta. |
| 06.70–11.70 | No es una reacción idéntica en todos, pero los gestos de otras personas pueden influir en nosotros. | TU CEREBRO CAPTA EL GESTO | Aparece un cerebro esquemático formado por nodos azules; se ilumina una ruta entre los ojos y el sistema nervioso. | Introduce percepción del gesto sin afirmar un mecanismo único. |
| 11.70–18.00 | El bostezo contagioso se ha relacionado con la percepción de la conducta ajena, la atención y el vínculo social. | IMITAMOS MÁS DE LO QUE NOTAMOS | Dos perfiles estilizados se sincronizan; pequeños nodos pasan de uno al otro. | Contagio conductual e interacción social. |
| 18.00–23.20 | A veces, con solo ver ese movimiento, parece que el cuerpo empieza a imitarlo. | VERLO PUEDE DESPERTAR EL IMPULSO | Un bostezo en el perfil A precede al del perfil B con una transición luminosa, no como causalidad universal. | Asociación, no regla universal. |
| 23.20–30.50 | Pero no todos responden igual; también importan el contexto, el interés y las diferencias individuales. | ATENCIÓN + CONTEXTO | Varios perfiles en una red; unos responden y otros permanecen neutrales. | Variabilidad individual. |
| 30.50–37.80 | La ciencia sigue investigando los mecanismos exactos; reducirlo a una sola causa sería simplificar demasiado. | LA EXPLICACIÓN NO ES ÚNICA | Capas transparentes con señales de atención, percepción y vínculo social; aparecen como hipótesis conectadas, no como respuesta definitiva. | Evita simplificar una cuestión científica compleja. |
| 37.80–47.60 | Ahora prestá atención: si alguien cerca tuyo bosteza, ¿te dan ganas de repetirlo? | ¿YA TE DIERON GANAS? | Regreso al primer rostro; la onda se acerca al espectador y el gesto queda en pausa antes del cierre. | Remate y pausa antes del CTA. |
| 47.60–51.93 | Sígueme y envíaselo a ese amigo que bosteza cuando te ve bostezar. | SÍGUEME Y ENVÍASELO A ESE AMIGO QUE… | Perfil original de “Así funciona”, botón Seguir→Siguiendo y una hoja de compartir con confirmación Enviado. | Cierre común; cotejar la frase con la voz real. |

## Reglas visuales aplicadas

- Fondo oscuro, rejilla técnica discreta, azul eléctrico `#4B5BFF`, ámbar `#FFB703`, tipografía sans serif.
- Un concepto por tramo; movimiento de cámara/escala continuo y etiquetas dentro de su propia tarjeta.
- El contenido visual no ocupa la franja superior de subtítulos ni la zona inferior de la interfaz de Instagram.
- Solo voz y efectos; no se añade música.
- La parte científica evita presentar una única causa como confirmada.
- El cierre respeta el patrón de la serie. La frase exacta de la voz debe coincidir con el CTA visual antes de publicar.

## Pendiente antes de publicar

1. Cotejar la transcripción de la locución, palabra por palabra, contra `audio.wav`.
2. Reemplazar los rótulos editoriales por subtítulos karaoke sincronizados con los tiempos medidos.
3. Verificar que el CTA pronunciado coincide con la frase fija de la serie y que la pausa anterior es suficiente.
4. Ejecutar `npx hyperframes lint`, generar preview y revisar visual y auditivamente el render.

**Importante:** este `index.html` está preparado como composición independiente con metadatos de HyperFrames y el audio asociado. No es una reconstrucción de `index.html` mediante `comun/construir.py`, ya que ese flujo exige `tiempos.json` con transcripción y otros archivos de escena. No subirlo como versión definitiva sin completar el cotejo indicado.

## Diseño sonoro original (sin samples de terceros)

Los efectos se generan por código y se mezclan en `audio.wav`; no se utiliza música ni material sonoro ajeno. La cronología editable está en `cues.json` y la referencia de escena en `escena.js`.

| Tiempo | Efecto | Función |
|---:|---|---|
| 0.25 s | `whoosh_low` | opening visual reveal |
| 0.95 s | `yawn_air` | first illustrated yawn |
| 2.45 s | `soft_pop` | first ripple |
| 4.95 s | `whoosh_soft` | second profile enters |
| 6.65 s | `pulse` | brain diagram appears |
| 8.35 s | `sparkle` | neural path lights |
| 11.65 s | `whoosh_low` | social network transition |
| 13.55 s | `soft_pop` | node connection |
| 14.85 s | `yawn_air` | two profiles yawn in sequence |
| 17.65 s | `whoosh_soft` | transition to individual differences |
| 23.20 s | `soft_pop` | first context card |
| 24.00 s | `soft_pop` | second context card |
| 24.80 s | `soft_pop` | third context card |
| 30.45 s | `whoosh_low` | research caveat transition |
| 31.15 s | `pulse` | layered hypothesis diagram |
| 37.55 s | `whoosh_soft` | return to face |
| 39.00 s | `yawn_air` | final illustrated yawn |
| 42.65 s | `pulse` | hold / anticipation |
| 47.55 s | `whoosh_low` | transition into CTA |
| 48.12 s | `tap` | follow button tap |
| 48.23 s | `confirm` | follow confirmation |
| 48.62 s | `whoosh_soft` | share sheet appears |
| 50.00 s | `tap` | send button tap |
| 50.30 s | `confirm` | sent confirmation |

Los sonidos de bostezo son síntesis aérea/tonal, no voces humanas grabadas. El script atenúa los efectos aproximadamente 3 dB mientras detecta voz activa. Escuchar el render completo antes de publicar.
