# Paquete provisional · Ep. 02 — Bostezo contagioso

Contenido:
- `index.html`: composición vertical 1080×1920, con animación por GSAP, metadatos de pista HyperFrames y carga de `audio.wav`.
- `voz-original.wav`: audio original adjunto, conservado sin modificar.
- `audio.wav`: mezcla final de voz + efectos originales sintetizados, sin música.
- `voz-limpia.wav`: voz preparada sin efectos, entrada del generador.
- `audio-con-efectos.wav`: copia explícita de la mezcla final.
- `efectos-originales.wav`: pista de efectos aislada.
- `generar_efectos.py`: genera efectos con osciladores/ruido filtrado y los mezcla automáticamente.
- `cues.json` y `escena.js`: cronología de efectos por escena.
- `guion.md`: storyboard técnico y tiempos de escena.
- `fraseo.json`: bloques de actividad vocal detectados por energía RMS; no es una transcripción.
- `palabras_clave.txt`: términos visuales del episodio.

Duración WAV: 51.930 s. Segmentos acústicos detectados: 21.

## Precaución importante

El `index.html` es un primer armado visual y no fue renderizado con HyperFrames desde este entorno. Las etiquetas y la narración sugerida en `guion.md` son editoriales, no una transcripción literal ni subtítulos sincronizados. Antes de publicar, cotejar la voz palabra por palabra, adaptar los subtítulos karaoke y ejecutar `npx hyperframes lint` + preview. La estructura estándar del repo genera `index.html` desde `tiempos.json`, `escena.css`, `escena.mundo.html`, `escena.clips.html` y `escena.js`; este paquete entrega una composición directa y autocontenida para revisar el look, no reemplaza esos archivos fuente del pipeline.

El repositorio de GitHub no fue modificado.

## Diseño sonoro añadido

Se generaron 24 señales originales mediante síntesis programática: whooshes graves, bostezo aéreo sintético, pulsos, pops, taps y confirmaciones electrónicas. No se usaron grabaciones, samples ni música. Los efectos se mezclan por debajo de la voz y se atenúan aproximadamente 3 dB mientras hay locución.

Para regenerar desde la voz limpia: `pip install numpy scipy soundfile` y `python3 generar_efectos.py`. El archivo `audio.wav` ya contiene la mezcla final. `voz-original.wav` se conserva sin cambios. Los sonidos de bostezo son síntesis, no una grabación humana.
