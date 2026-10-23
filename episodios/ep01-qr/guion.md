# Guion · Ep. 01 — Cómo funciona un código QR

Duración planificada: 01:14 · 136 palabras · media 110 ppm.
Texto original. Los tiempos son un plan: al generar la voz TTS se reajustan con los tiempos reales (Whisper).
Las palabras entre corchetes en `index.html` salen con recuadro azul en el subtítulo.

| Tiempo | Tramo | Narración (TTS) | Escena y edición | ppm |
|---|---|---|---|---|
| 00:00–00:06 | Gancho | Tapa un trozo de un QR y sigue funcionando. Tapa una esquina y no. | Un parche tapa el centro del QR (✓) y luego una esquina (✕) | 140 |
| 00:06–00:13 | Ancla | Está en menús, entradas y pagos. ¿Pero qué hay dentro de esos cuadraditos? | Tarjetas MENÚ / ENTRADA / PAGO; el QR vuelve a ampliarse | 111 |
| 00:13–00:23 | Mecanismo 1 | Es una cuadrícula de cuadrados negros y blancos. Cada uno es un bit: un uno o un cero. | Módulos se encienden uno a uno; etiqueta NEGRO = 1 / BLANCO = 0 | 108 |
| 00:23–00:34 | Mecanismo 2 | Los tres cuadrados grandes de las esquinas le dicen a la cámara dónde empieza el código y cómo está girado. | Recuadro azul con nodos en las 3 esquinas; el QR gira | 109 |
| 00:34–00:45 | Mecanismo 3 | El resto guarda un enlace en bits. Leerlo no necesita internet: el móvil solo abre lo que dice. | Datos en ámbar; etiqueta SIN INTERNET | 98 |
| 00:45–00:55 | Caso límite 1 | Y hay un truco: guarda datos de sobra. Por eso aguanta un logo encima o un rasguño, hasta cierto punto. | Logo sobre el centro; etiqueta ~30 % (nivel H) | 120 |
| 00:55–01:03 | Caso límite 2 | Pero las esquinas no se pueden reconstruir, y sin margen blanco alrededor, tampoco se lee. | Esquina tapada ✕; se recorta el margen blanco ✕ | 112 |
| 01:03–01:09 | Dato | Nació en 1994 en Japón, para seguir piezas de coches. | Contador 1994 + fuente visible | 100 |
| 01:09–01:14 | CTA | Envíaselo a quien aún desconfía de escanear QR. | Hoja de compartir, toque y «Enviado ✓» | 96 |

Notas de fidelidad (para revisar antes de publicar):
- El QR del video es **ilustrativo** (no escaneable): lleva las esquinas, la línea de sincronía y datos aleatorios fijos.
- «Tapa una esquina y no» es la regla general: con una esquina tapada la mayoría de lectores no localizan el código.
- Nivel H de corrección de errores: recupera hasta ~30 %. Fuente en pantalla: Denso Wave / ISO/IEC 18004 (verificar antes de publicar).
