# Pruebas de los chequeos y del control de cookies

712 comprobaciones (conteo del 23-sep-2026, al cierre de la segunda pasada de
arreglos) sobre los dos módulos de chequeo, que comparten la lógica de validación
de destino y de descarga acotada, y sobre el control de cookies de spindlelab.cl:

- `verificaycumple/functions/api/chequeo.js` (rama `laboratorio/ley-21719`)
- `spindlelab-astro/functions/api/chequeo.js` (rama `main`)

**No hay runner ni dependencias.** Cada archivo se corre con `node <archivo>.mjs`
y termina con un resumen y un código de salida (0 bien, 1 mal).

Las rutas de import son **absolutas a los worktrees** (`/tmp/vyc-sub-wt/...`,
`/tmp/spl-main-wt/...`). Si los worktrees no existen, ajusta las primeras
líneas de cada archivo antes de correrlo.

| archivo | qué cubre |
|---|---|
| `prueba-destino.mjs` | Verifica y Cumple: validación de dominio, portón de destinos, redirecciones, mensajes de error, contrato de la respuesta, permiso antes de rastreadores, patrones de CMP, enlace a la política, www, tiempo lineal, no-store, el middleware que muda pages.dev a verifica.spindlelab.cl, peor caso de espera, página de bloqueo con 200, sitios armados con JavaScript, política que no se pudo leer, casilla del formulario, el texto de todas las respuestas (396) |
| `prueba-gemelo-completa.mjs` | spindlelab.cl: el informe inventado, notaciones de IP, redirecciones, sondas de agente, robots.txt ilegible, equivalencia ítem por ítem con la versión anterior, www, peor caso de espera, no-store, y la página de bloqueo que llega con 200 (171) |
| `prueba-streaming.mjs` | la rama de streaming de spindlelab.cl, que es la que corre en producción: cuerpos reales, cancelación de la descarga, sitemap de 4,8 MB, www, página de bloqueo con una tilde partida entre dos trozos (23) |
| `prueba-vyc-streaming.mjs` | lo mismo para Verifica y Cumple, más la página de bloqueo, los sitios armados con JavaScript y la política que no se pudo leer (22) |
| `prueba-saltos.mjs` | bucle de redirecciones, cadena larga legítima, reloj compartido, y la política que también sigue los saltos por el portón (14) |
| `prueba-robots.mjs` | tabla comparativa de los casos de robots.txt, vieja contra nueva, y lo que no puede retroceder (4) |
| `medir-cpu.mjs` | costo por tamaño de portada, vieja contra nueva (tabla, sin aserciones) |
| `prueba-cookies.mjs` | el control de cookies de spindlelab.cl (`public/js/consent-banner.js`) con un DOM de mentira en `vm`: Analytics solo al aceptar, almacenamiento bloqueado, otra pestaña, bfcache con eventos encolados en cualquier orden, el `revoke` del Pixel sin `grant` en caliente, cookies heredadas, `_gcl_` (82) |
| `adversario.mjs` | entradas hechas para hacer sufrir al parser de spindlelab.cl (anidamiento extremo, etiqueta sin cerrar, miles de h2, prosa de 2,8 MB, miles de "<" sin cerrar) (tabla, sin aserciones) |

Los números entre paréntesis son las comprobaciones que cuenta cada archivo al
terminar ("N bien, 0 mal"). Si cambian, se actualizan acá en el mismo cambio.

## La versión vieja sale de git

`prueba-gemelo-completa.mjs`, `prueba-robots.mjs` y `medir-cpu.mjs` comparan el
chequeo de spindlelab.cl de hoy con el de antes de "El chequeo de /diagnostico/
deja de inventar informes". Esa versión vieja se lee del historial, del commit
`c2616e9` del worktree de `main`:

```js
const VIEJO = 'c2616e9dbe20d05d9e2edd973e76e7b7fdf9b09a';
const fuenteVieja = execFileSync('git', ['-C', '/tmp/spl-main-wt', 'show',
  `${VIEJO}:spindlelab-astro/functions/api/chequeo.js`]);
const viejo = await import('data:text/javascript;base64,' + fuenteVieja.toString('base64'));
```

Se importa como `data:` para no escribir nada en disco. Antes se importaba un
`./chequeo-viejo.mjs` que vivía en el scratchpad de una sesión y nunca se
versionó, así que estas tres pruebas no corrían en ningún otro lado
(`ERR_MODULE_NOT_FOUND`). Si el worktree de `main` no está en `/tmp/spl-main-wt`,
cambia la ruta del `-C`.

## Pendiente a la vista: el parser de spindlelab.cl no es lineal

`adversario.mjs` tiene una fila marcada PENDIENTE. El chequeo de spindlelab.cl,
con miles de "<" sin cerrar, crece al cuadrado: 100 ms con 16 KB, 1,6 s con
64 KB, 4,6 s con 100 KB (medido el 23-sep, igual antes y después del detector de
páginas de bloqueo). Lo que crece son las regex que ya estaban en `chequear()`:
la que borra etiquetas (`<[^>]+>`) y las de title, description, canonical, lang y
JSON-LD con `[^>]+`. Verifica y Cumple ya recorre las etiquetas en tiempo lineal
(`etiquetas()` y `tramosDeTexto()`); spindlelab.cl todavía no. Cuando se arregle,
esa fila tiene que bajar a pocos milisegundos.

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

## Y una de la página de bloqueo (23-sep)

www.bancoestado.cl le contesta a un lector automático un 200 de 650 bytes que dice
"se ha restringido este acceso", y los dos chequeos lo puntuaban como si fuera la
portada. La copia exacta está en `prueba-gemelo-completa.mjs` §12, junto a las
portadas chicas que el detector de spindlelab.cl NO puede atrapar (sin `<title>`,
con "acceso restringido" y su menú, con "protegido por reCAPTCHA", con la frase
solo dentro de un `<script>`). Si se afina el detector, esas siguen dando informe.
Ojo: el de Verifica y Cumple es distinto a propósito en un caso: una página de
menos de 3 KB sin `<html>`, `<head>`, `<body>` ni `<title>` la trata como
bloqueo aunque no diga nada de bloqueo. El de spindlelab.cl no, porque su mensaje
afirma que el sitio "no deja entrar a lectores automáticos" y eso hay que verlo
escrito en la página.
