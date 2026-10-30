# Capturas de cierre · E13 con los cambios del 30-oct · sitio nuevo en la raíz

**30-oct-2026, 13:46 a 13:52 (Chile; reloj del contenedor en UTC, 16:46 a 16:52) · Mauro, cierre.**
Las 22 rutas del sitemap del build, desde la rama `claude/magical-franklin-ckfki2` en `0d9bce8a` (el acta de la vuelta 2
de Javiera sobre `4d794419`: `spindlelab-astro/` no cambió entre los dos). Sacado con `git archive` a una copia en el
scratchpad y construido ahí, para no tocar el árbol de la rama.

Antes de capturar:

- `npx astro build`: 22 páginas, sin errores ni avisos.
- `node e13/herramientas/extraer-texto.mjs --comprobar` (en la rama): 16 de 16 «igual», sale con 0.
- `node scripts/verificar.mjs --excluir /privacidad/`: 22 páginas a 390, «Sin hallazgos», sale con 0.
- El mismo con `--ancho 1440`: 22 páginas, «Sin hallazgos» (6 nodos sobre imagen: la portada, como en el acta).

## Qué hay

| Carpeta o archivo | Qué es | Tamaño |
|---|---|---|
| `primera/<ruta>-1440.jpg` | La primera pantalla a 1440 × 900, a su tamaño | 22 archivos |
| `primera/<ruta>-390.jpg` | La primera pantalla a 390 × 844 (teléfono, contexto táctil), a su tamaño | 22 archivos |
| `completa/home-1440.jpg`, `completa/contacto-1440.jpg` | La página entera a 1440, reducida a la mitad (720 de ancho) | 2 archivos |
| `completa/home-390.jpg`, `completa/contacto-390.jpg` | La página entera a 390, a su tamaño | 2 archivos |
| `hoja-primera-1440.jpg`, `hoja-primera-390.jpg` | Las 22 primeras pantallas de cada ancho en una hoja, en el orden del sitemap | 2 hojas |
| `registro.json` | Por captura: el `h1`, el desborde horizontal, el alto de la página, errores de consola y pedidos fallidos | |

En total 50 JPG, 4,5 MB. `<ruta>` es el camino con `_` en vez de `/` (`home`, `servicios_desarrollo-web`,
`blog_que-es-aeo-geo`…).

## Cómo se tomaron

`e13/herramientas/capturas-cierre-30oct.mjs <dist> <salida>` (sirve el `dist` en un puerto libre, Chromium 1194 de
Playwright) y `e13/herramientas/hojas-cierre-30oct.py <salida> e13/capturas-30oct`, que las pasa a JPG y arma las hojas.

- **Con el aviso de cookies ya contestado** (rechazo guardado), para que se vea la página. El aviso abierto lo midió
  Javiera en los 11 tamaños de la obra (acta del 30-oct, «La primera pantalla»): el botón amarillo entra entero.
- **La primera pantalla, a los 1,5 s de cargada**, con el video de la portada corriendo (se ve un cuadro del hilo de
  oro, no el póster). **La página entera, después de recorrerla** de arriba abajo, para que cada bloque llegue a su estado
  final.
- **48 de 48 capturas sin errores de consola, sin pedidos fallidos, sin desborde horizontal y con un solo `h1`.**
- Alto de la home: 7.459 px a 1440 y 9.012 a 390, los mismos que midieron Diego y Javiera (techos 7.800 y 9.300).
- `/trabajo/` a 1440 cabe entera en 900 px: su primera pantalla incluye el pie.

## Lo que miré

Las dos hojas enteras; la primera pantalla de la home a 1440 a tamaño real; la home entera a 1440 (reducida) y, a tamaño
real, la sección 2 y «Quién está detrás»; tres tramos de la home a 390 (portada y sección 2, método y soluciones, el caso
y «Quién está detrás»); `/contacto/` entera a 390.

- El amarillo está donde Ramón lo pidió y en nada más: el «Hablemos» del encabezado en 21 rutas (no en `/contacto/`, que
  es el destino) y «Hablemos de tu sitio» en la portada. Los demás botones siguen blancos o de placa.
- El logo del encabezado es la i con su disco en todas las rutas.
- La sección 2 se lee en dos columnas con los filetes a la misma altura a 1440, y apilada («En redes» primero) a 390.
- «Quién está detrás» se lee como un solo bloque, sin saltos grandes entre párrafos.
- `/contacto/` dice los dos caminos (con sitio y sin sitio) en el `h1`, la línea, la ayuda del campo y el paso 2.
- No vi nada roto, tapado ni cortado.
