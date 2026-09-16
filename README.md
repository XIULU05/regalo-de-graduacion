# OPERATION: HOMEBOUND — Operación: Regreso a casa

Regalo de graduación en siete capítulos, con contenido en español. React, TypeScript, Vite y GSAP. La remasterización conserva las fotografías originales y la estructura modular del proyecto.

## Ejecutar

```sh
npm install
npm run dev
```

Abrir `http://127.0.0.1:5173/`. El servidor está limitado al equipo local.

```sh
npm run build
npm run preview
```

La versión de producción queda en `dist/`. No se ha publicado automáticamente.

## Editar textos y fotos

- `src/data/content.ts`: textos de los capítulos, mensajes de sobres y carta final.
- `content.recipient`: nombre personalizado, actualmente Vayholine Casilla.
- `src/warm.css`: pulido de la paleta crema, champagne y rosa empolvado, escala tipográfica y ambiente de color lento.
- `src/data/assets.ts`: resolución automática de archivos y encuadre individual en `photoFraming`.
- `public/assets/photos/`: las 20 imágenes originales. Ver el README de esa carpeta para nombres y proporciones.

Se reconocen PNG, JPG, JPEG, WebP y AVIF, sin distinguir mayúsculas en la búsqueda. El archivo se solicita con su nombre real, conservando mayúsculas y puntos. Por ejemplo, `photo('scene7-main')` encuentra `scene7-main..png`. No hace falta renombrar los archivos existentes.

Después de agregar o reemplazar una foto, Vite actualiza la vista. Para una versión publicada hay que volver a compilar. Evita mantener dos imágenes diferentes con el mismo nombre semántico de escena.

## Narrativa y movimiento

1. Tres piezas se unen en una insignia vectorial basada en la referencia Air Force aportada por el usuario. Hay una alternativa directa y acceso con teclado. El expediente se abre mediante su botón; los otros capítulos no se montan antes de abrirlo.
2. Línea de tiempo iluminada por el scroll, cuatro fotografías y hitos activos.
3. Dos mundos se acercan y comparten una línea de horizonte.
4. Una trayectoria de luz conecta sobres y fotos. Cada sobre abre una tarjeta de papel legible.
5. El retrato original contiene el efecto de memoria. No hay cuadrados adicionales ni filtros sobre su rostro.
6. `scene6-memory00.png` es el fondo real; cinco recuerdos lo acompañan con perspectiva. La escena permanece en pantalla brevemente mediante CSS sticky, con scroll nativo.
7. Retrato dorado y fotos de pareja. La carta ocupa un espacio íntimo con una transición de luz.

Los enlaces, botones, cierres y estados accesibles están en español. Los textos que ya forman parte de una fotografía se conservan en el archivo original.

No se usa WebGL, scroll artificial, video, detección de rostros ni servicios externos de imágenes. Las fuentes se sirven localmente. Las animaciones CSS se pausan fuera de escena; el movimiento ligado al scroll utiliza GSAP. `prefers-reduced-motion` ofrece estados finales estables. La carta y los sobres usan `dialog`, cierre con Escape y devolución explícita del foco, incluida la compatibilidad con WebKit.

## Música

La indicación posterior del usuario de integrar las dos canciones sustituye la nota del documento de pulido que posponía el audio.

- El último toque de las tres piezas, o «Entrar directamente», inicia el instrumental. La llamada a reproducir ocurre en ese gesto, antes del temporizador de transición, para favorecer la compatibilidad móvil.
- «Abre mi mensaje», en el capítulo 7, cambia a «23» de Morat. Al cerrar la carta vuelve al instrumental.
- Un único elemento de audio evita que las canciones se superpongan. El botón de sonido está disponible tanto en el recorrido como dentro de la carta. Pausar es una elección que se conserva al cambiar de canción.
- Si el navegador rechaza la reproducción automática, el botón «Activar música» permite iniciarla con otro toque. Los permisos del navegador siguen aplicándose.
- Los dos MP3 aportados están en la raíz del proyecto y Vite los incorpora a `dist/assets/`. No se han recortado ni modificado. El instrumental mide 84,8 MB y dura aproximadamente 59 minutos; el de Morat mide 4,5 MB. El reproductor no tiene fuente antes del desbloqueo y usa `preload="none"`; al reproducir, el navegador gestiona la descarga por rangos según el servidor. La reproducción inicial depende de la conexión.
- `src/components/Soundtrack.tsx` contiene el reproductor y sus controles. Los niveles iniciales son 30 % para el instrumental y 65 % para Morat; en algunos dispositivos el volumen depende del control del sistema.

## Pruebas

```sh
npx playwright install webkit
npm run test:e2e
```

Chrome instalado: 393 × 852, 390 × 844, 375 × 667 y 1440 × 900. WebKit: 393 × 852 con emulación táctil. Ambos motores comprueban también movimiento reducido. Las pruebas recorren todos los capítulos y verifican las 20 imágenes, errores de consola, overflow, sobres, carta, teclado, retorno, resize y orientación. Dos pruebas adicionales simulan la política multimedia para verificar bloqueo, activación, cambio de canción y pausa persistente. Capturas: `.verification/remaster-*.png`.

WebKit en Windows comprueba compatibilidad del motor, pero no sustituye la prueba en Safari en un iPhone físico. No se afirma una medición de 60 FPS en hardware real.

Contexto de entrenamiento: [fuentes oficiales y criterio editorial](docs/BMT-SOURCES.md).
