# Pulido cálido y música — QA final

16 de septiembre de 2026.

## Cambios de esta pasada

- Se conservaron React/TypeScript/Vite, las siete escenas, la navegación, la carta y las veinte fotografías originales.
- La interfaz pasó a crema, marfil, champagne, rosa empolvado y texto marrón cálido. Los colores originales de las fotografías permanecen intactos. Los fondos tienen un movimiento lento que se pausa fuera de escena, al ocultar la página y con movimiento reducido.
- Se equilibró la escala tipográfica: títulos más contenidos y textos secundarios mayores, especialmente en los capítulos 2, 3, 4, 6 y 7.
- La introducción conserva tres piezas táctiles y ahora forma una insignia vectorial basada en la referencia Air Force aportada. Vayholine Casilla aparece en la introducción y el expediente. El favicon y el color de la barra del navegador acompañan la paleta cálida.
- Se revisaron los hitos, las notas y los cierres para darles variedad y cercanía. Cada sobre tiene una despedida propia. La carta conserva su estructura y mensaje central.
- La trayectoria de las cartas tiene más presencia. Las cinco fotos del vuelo son mayores y están redistribuidas alrededor de la figura central.
- Se incorporaron los dos MP3 siguiendo la instrucción posterior del usuario, que actualiza la indicación del documento de posponer el audio.

## Comportamiento de la música

El instrumental comienza al unir la tercera pieza o pulsar «Entrar directamente». Morat comienza al abrir la carta del capítulo 7. Al cerrar la carta vuelve el instrumental. Un solo reproductor impide la superposición de canciones. La elección de pausar se conserva al cambiar de pista. Hay un control accesible en el recorrido y dentro de la carta; permite reintentar si el navegador bloquea el inicio.

No se solicita audio antes del desbloqueo. Los originales se conservan completos: aproximadamente 84,8 MB / 58:55 para el instrumental y 4,5 MB / 3:08 para Morat. Una conexión lenta puede demorar la reproducción; no se ha medido rendimiento de red móvil real.

## Verificación

- `npm run build`: correcto.
- `npm run test:e2e`: 9/9 pruebas aprobadas en la ronda completa.
- Después de corregir un fallo visual de composición de capas en las fotos de las cartas, se repitieron los cinco recorridos completos: 5/5 aprobados. La corrección conserva desplazamiento y giro suaves en 2D, evitando las superficies de imagen temporalmente vacías observadas durante el movimiento en 3D.
- Tamaños de Chrome: 393 × 852, 390 × 844, 375 × 667 y 1440 × 900. WebKit táctil: 393 × 852.
- Se comprobaron las siete escenas, veinte imágenes, apertura, sobres, carta, foco, teclado, movimiento reducido, retorno, resize y ausencia de overflow horizontal. Sin errores de consola o respuestas HTTP de error en los recorridos.
- Dos pruebas de política multimedia simulada comprueban activación, bloqueo inicial, recuperación, cambio a Morat y pausa persistente en Chrome y WebKit.
- Además se reprodujeron los MP3 reales en Chrome: ambos avanzaron en el tiempo, sin errores del reproductor, y se comprobó el regreso al instrumental. Esta comprobación verifica decodificación y reproducción del navegador; no evalúa el volumen acústico de un dispositivo físico.
- Se inspeccionaron capturas nuevas de móvil y escritorio, la insignia ensamblada y la carta de WebKit. Se corrigieron el espacio de las instrucciones en móvil pequeño y el tamaño del control de audio para reducir su ocupación sobre el contenido.

## Evidencia

- `.verification/remaster-*.png`: capturas actualizadas de esta pasada.
- `.verification/warm-insignia-assembled.png`: insignia después de unir las tres piezas.
- `.verification/audio-playback.json`: resultado de reproducción de los archivos reales.
- `.verification/audio-qa.mjs`: comprobación local reproducible de los MP3 con Vite en el puerto 5173.
- `.verification/test-results/.last-run.json`: estado de la última ejecución (cada comando de Playwright sustituye este archivo).

## Pendiente fuera de este entorno

No se ha probado en un iPhone físico. Safari real, las políticas de audio de cada dispositivo, safe areas y fluidez de 60 FPS siguen requiriendo validación en hardware. La emulación WebKit en Windows no sustituye esa prueba.
