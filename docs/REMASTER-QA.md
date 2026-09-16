# Cierre de QA de la remasterización

Fecha: 16 de septiembre de 2026.

Este informe corresponde al cierre de la remasterización anterior. La pasada posterior de paleta cálida, personalización y música está documentada en [Pulido cálido y música — QA final](PULIDO-CALIDO-QA.md).

## Alcance de la continuación

Se contrastaron el documento de remasterización, el código actual y los resultados de la ronda anterior. Esta carpeta no contiene `.git`, por lo que no fue posible obtener un diff histórico. Se conservó la implementación existente de las siete escenas y las 20 fotografías originales.

Quedaba validar las últimas correcciones de compatibilidad y completar la comprobación final:

- La animación de la carta podía quedar pausada e invisible en WebKit cuando el bloqueo del scroll desplazaba su escena fuera del viewport. Los diálogos abiertos ahora quedan excluidos de la pausa por escena fuera de pantalla. Se verificó su opacidad final y se inspeccionaron las capturas.
- El foco inicial de la introducción podía interferir con el botón para entrar directamente. El foco inicial respeta un control ya enfocado. Pasó el acceso con teclado y movimiento reducido en ambos motores.
- Se verificó el retorno del foco después de cerrar los tres sobres y la carta, así como el ajuste de ancho de la escena del vuelo en 375 × 667.

No fue necesario rehacer escenas ni reemplazar imágenes durante esta continuación.

## Resultado de las comprobaciones

`npm run build`: correcto, TypeScript y compilación de producción completados.

`npm run test:e2e`: **7 pruebas aprobadas**, duración total aproximada de 4,2 minutos.

| Motor | Tamaño CSS | Resultado |
| --- | --- | --- |
| Chromium / Chrome | 393 × 852 | Recorrido completo aprobado |
| Chromium / Chrome | 390 × 844 | Recorrido completo aprobado |
| Chromium / Chrome | 375 × 667 | Recorrido completo aprobado |
| Chromium / Chrome | 1440 × 900 | Recorrido completo aprobado |
| Chromium / Chrome | 393 × 852 | Teclado, movimiento reducido y resolución de assets aprobados |
| WebKit, emulación táctil | 393 × 852 | Recorrido completo aprobado |
| WebKit, emulación táctil | 393 × 852 | Teclado, movimiento reducido y resolución de assets aprobados |

Los recorridos verifican apertura y bloqueo narrativo, las siete escenas, las 20 imágenes cargadas, ausencia de placeholders retirados, sobres, carta completa, cierre, retorno del foco, regreso al comienzo, resize y ausencia de overflow horizontal. No se registraron errores de consola, excepciones de página ni respuestas HTTP de error en esos recorridos.

Se inspeccionaron las capturas finales de las siete escenas en 393 × 852 y escritorio, además de la carta, los sobres y los ajustes de móvil pequeño. Las capturas de inicio y final de las secciones largas permiten revisar el contenido que requiere scroll. Se confirmó visualmente que la carta de WebKit ya aparece y permite llegar a su firma.

## Evidencia local

- `.verification/remaster-393-*.png`: tamaño objetivo de iPhone 16 en Chrome.
- `.verification/remaster-webkit-393-*.png`: emulación táctil en WebKit.
- `.verification/remaster-390-*.png` y `remaster-375-*.png`: otros tamaños móviles.
- `.verification/remaster-1440-*.png`: escritorio.
- `.verification/test-results/.last-run.json`: estado de la ejecución final.
- `dist/`: compilación de producción.

## Límites de la validación

No quedan fallos conocidos de las pruebas ejecutadas. La emulación de tamaño y WebKit en Windows no equivale a ejecutar Safari en un iPhone físico. Quedan sin comprobar en hardware real la fluidez cercana a 60 FPS, los cambios de barras de Safari y las safe areas del dispositivo. No se afirma haber medido esos resultados.
