# Fotografías originales

No necesitas convertir ni renombrar los archivos actuales. La aplicación admite `.png`, `.jpg`, `.jpeg`, `.webp` y `.avif`, también con extensiones en mayúsculas.

El buscador usa el nombre de escena y tolera puntos adicionales: `scene4-letter02..png` y `scene7-main..png` ya funcionan. Se conserva el archivo original y su ruta exacta.

## Archivos utilizados

| Escena | Archivos reales | Encuadre |
| --- | --- | --- |
| 1 | `scene1-main.png` | Llena el marco, alineada arriba para preservar la cabeza. |
| 2 | `scene2-week1.png`, `scene2-week3.png`, `scene2-week5.png`, `scene2-graduation.png` | Marcos verticales; posición individual del rostro. |
| 3 | `scene3-her.png`, `scene3-me.png` | Se conserva la proporción vertical de ambas imágenes. |
| 4 | `scene4-letter01.jpg`, `scene4-letter02..png`, `scene4-letter03.jpg` | Proporciones 4:3, 4:5 y 4:3, respectivamente. |
| 5 | `scene5-main.png` | Retrato completo en su proporción original. |
| 6 · Principal | `scene6-memory00.png` | Fondo de pista y horizonte; figura central preservada. |
| 6 · Recuerdos | `scene6-memory01.jpg` a `scene6-memory05.jpg` | Marcos de proporciones individuales; se recortan las bandas negras del recuerdo 04. |
| 7 | `scene7-main..png`, `scene7-couple01..png`, `scene7-couple02.jpg` | Retrato de fondo y recuerdos 16:9 y 3:4. |

## Ajustar una fotografía

En `src/data/assets.ts`, dentro de `photoFraming`:

```ts
scene1main: { position: '50% 0%', ratio: '4 / 5' },
scene4letter01: { ratio: '4 / 3', position: '50% 55%' },
```

- `position`: horizontal y vertical. `50% 0%` centra y alinea arriba; `50% 50%` centra en ambos sentidos.
- `ratio`: proporción del marco para las tarjetas y fotos que usan tamaño natural.
- `fit`: por defecto `cover`, que llena el marco. `contain` muestra toda la foto y puede dejar márgenes.

No hay detección automática de rostros: cada encuadre actual se ha configurado a partir de las imágenes reales. Las proporciones adaptan las tarjetas para evitar recortes innecesarios; los fondos conservan una composición propia.

No se exige una resolución exacta. Para nuevas fotos, 900–1400 px de lado largo suelen bastar en retratos principales; 500–800 px en recuerdos pequeños. Los archivos existentes se conservan sin alteraciones.

Agregar/reemplazar un archivo actualiza Vite. Después de modificar fotos de una versión publicada, ejecuta `npm run build` de nuevo.
