# Así funciona

Proyecto de videos con HyperFrames. Reglas de estilo: `regla.md`.

## Primera vez (Codespaces)
1. Sube esta carpeta a un repo de GitHub y abre un Codespace.
2. `cd episodios/ep01-qr && npx hyperframes doctor` (Node 22+ y FFmpeg).
3. Si el CLI pide archivos de proyecto, ejecuta `npx hyperframes init` en una carpeta temporal y copia lo que falte; conserva nuestro `index.html`.
4. `npx hyperframes lint` y luego `npx hyperframes preview`.

## Voz TTS
- `npx hyperframes tts --help` para ver opciones; guarda el resultado como `voz.wav` en la carpeta del episodio.
- Descomenta la línea `<audio>` de `index.html`.
- Con la voz lista, transcribe (`npx hyperframes transcribe --help`) y sustituye los tiempos repartidos de `N` por los reales.

## Render final
GitHub → Actions → `render-video` → Run workflow. El MP4 queda como artefacto.
