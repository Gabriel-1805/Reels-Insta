# Método para que las escenas concuerden con el guion (propuesto en el Ep. 3)

Problema que resuelve: escenas «temáticas» (un mapa, un pin…) que no ilustran lo que la voz dice en ese segundo.

## Las 5 reglas
1. **Tabla de concordancia aprobada ANTES de programar.** Por cada afirmación de la voz: tiempo · qué dice · qué se ve (literal) · en qué palabra se dispara · prueba sin sonido. Plantilla: `comun/plantillas/concordancia.md`.
2. **Una afirmación, un evento visual literal.** Si la voz afirma algo, debe haber algo en pantalla que lo muestre, en el momento de la palabra. Nada de metáforas decorativas.
3. **Tira de escenas.** `python3 comun/tira.py episodios/epNN` → `tira_escenas.png`: un fotograma del medio de cada frase con su texto debajo. Se revisa antes de renderizar.
4. **Control automático.** `python3 comun/concordancia.py episodios/epNN` → `concordancia_auto.md`: eventos de objeto, cámara y etiqueta por cláusula, con avisos `SIN EVENTO`, `SATURADA` y `HUECO` (> 3,5 s sin nada nuevo).
5. **Verificar los hechos** antes de animar (tabla «Verificación de hechos» en la concordancia): ✓ / matiz / sin verificar. La geometría y los números de pantalla deben ser coherentes (p. ej. tres círculos de 1, 2 y 3 km que realmente se cruzan en un punto).

## Prueba sin sonido
Para cada fila: apagando el audio, ¿se entiende la idea solo con la imagen y las etiquetas? Si no, la fila no está lista.

## Flujo completo (audio primero)
1. Audio aparte → análisis (duración, pausas, volumen, tono).
2. `python3 comun/audio/segmentar.py episodios/epNN` → `segmentos.json` (cada tramo entre pausas, transcrito).
3. Revisar el texto a mano → `guion.txt` (un párrafo por línea).
4. `python3 comun/alinear.py episodios/epNN` → `tiempos.json` (modo A, con tiempos medidos).
5. Tabla de concordancia → **aprobación**.
6. Escenas (`escena.*`) → `construir.py` → `hacer_sonido.py`.
7. `concordancia.py` y `tira.py` → ajustar.
8. `lint` → preview → Actions.
