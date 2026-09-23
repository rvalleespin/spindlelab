# Pruebas de los chequeos y del control de cookies

150 comprobaciones sobre los dos módulos de chequeo, que comparten la lógica de
validación de destino y de descarga acotada:

- `verificaycumple/functions/api/chequeo.js` (rama `laboratorio/ley-21719`)
- `spindlelab-astro/functions/api/chequeo.js` (rama `main`)

**No hay runner ni dependencias.** Cada archivo se corre con `node <archivo>.mjs`
y termina con un resumen y un código de salida (0 bien, 1 mal).

Las rutas de import son **absolutas a los worktrees** (`/tmp/vyc-sub-wt/...`,
`/tmp/spl-main-wt/...`). Si los worktrees no existen, ajusta las dos primeras
líneas de cada archivo antes de correrlo.

| archivo | qué cubre |
|---|---|
| `prueba-destino.mjs` | Verifica y Cumple: validación de dominio, portón de destinos, redirecciones, mensajes de error (73) |
| `prueba-gemelo-completa.mjs` | spindlelab.cl: el informe inventado, notaciones de IP, redirecciones, sondas de agente, robots.txt ilegible, equivalencia ítem por ítem con la versión anterior (51) |
| `prueba-streaming.mjs` | la rama de streaming de spindlelab.cl, que es la que corre en producción: cuerpos reales, cancelación de la descarga, sitemap de 4,8 MB (11) |
| `prueba-vyc-streaming.mjs` | lo mismo para Verifica y Cumple (7) |
| `prueba-saltos.mjs` | bucle de redirecciones (508), cadena larga legítima, reloj compartido (8) |
| `prueba-robots.mjs` | tabla comparativa de los cuatro casos de robots.txt, vieja contra nueva |
| `medir-cpu.mjs` | costo por tamaño de portada, vieja contra nueva |
| `prueba-cookies.mjs` | el control de cookies de spindlelab.cl (`public/js/consent-banner.js`) con un DOM de mentira en `vm`: Analytics solo al aceptar, almacenamiento bloqueado, otra pestaña, bfcache con eventos encolados en cualquier orden, el `revoke` del Pixel sin `grant` en caliente, cookies heredadas, `_gcl_` (82) |
| `adversario.mjs` | entradas hechas para hacer sufrir al parser (anidamiento extremo, etiqueta sin cerrar, miles de h2, prosa de 2,8 MB) |

## Por qué existen

Cada bloque de pruebas nació de un error real, no de una idea de cobertura. La
lección que más se repite: **el doble de prueba miente**. Tres veces en esta
sesión la prueba pasó y el código estaba mal, porque el doble no se parecía al
runtime:

- el doble no exponía `body.getReader()`, así que **las 73 primeras pruebas
  nunca tocaron la rama que corre en producción**;
- el doble declaraba un `content-length` que no correspondía al cuerpo, y eso
  disparaba la comprobación de lectura corta en casos que no tocaba;
- el doble guardaba un solo stream por URL, y la portada se pide cuatro veces.

Cuando una prueba falle, la primera pregunta es si el doble se parece al
runtime, no si el código está mal.

## Una más, del control de cookies (22-sep)

El `revoke` del Pixel de Meta **no descarta, retiene**: lo que se le pide con el permiso
retirado sale todo junto cuando se le devuelve. Eso no lo dice ninguna prueba con dobles; se
midió en un navegador real. Por eso el código nunca le devuelve el permiso en caliente. Si
alguna vez se toca esa parte, esa medición se repite antes de creerle a la documentación.
