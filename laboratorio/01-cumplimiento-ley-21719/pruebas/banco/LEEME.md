# El banco de mediciones que `prueba-profundo.mjs` necesita

Dieciséis archivos, 768 KB. Son las peticiones y las cookies que Chrome registró por CDP
el 23 y el 25-sep-2026 en once sitios reales, con el mismo `medirConNavegador` que corre en
producción. No hay nada inventado acá: cada número que afirma `prueba-profundo.mjs` sobre
un sitio con nombre sale de uno de estos archivos.

## Por qué está acá y no en una carpeta de sesión

Hasta el 26-sep esto vivía en el scratchpad de una sesión de trabajo, bajo `/tmp`, dentro de
una carpeta de 1 GB llena de perfiles de Chrome. `rutas.mjs` lo buscaba en `banco/` y no lo
encontraba, así que **la batería entera no corría en ninguna parte** salvo que alguien
supiera pasarle `PROFUNDO_DATOS=/tmp/…`. Y el aviso que da al no encontrarlo es correcto pero
no ayuda: dice que se rehace midiendo de nuevo.

Una batería de pruebas que depende de una carpeta que el sistema borra sola es una batería
que el día que importa no está. Ya pasó dos veces en este mismo trabajo, con los worktrees
de `/tmp`, y está contado en la cabecera de `rutas.mjs`.

Lo que NO se copió es el resto de esa carpeta: los perfiles de Chrome, las capturas, los
guiones de medición. Eso sí es material de sesión y sí es enorme. Acá están solo los
dieciséis archivos que el código de la prueba abre por nombre.

## Qué hay

| carpeta | qué es |
|---|---|
| `ev0/` | awasi.com, hotelescumbres.cl, terrado.cl y time.cl. Una instantánea por sitio, con marca de tiempo absoluta en segundos. Son los dos casos canónicos de los tres verbos: awasi carga el Pixel de Meta y deja su cookie SIN enviar; hotelescumbres carga GA y envía SIN escribir ninguna cookie. |
| `ev1/` | lastorres.com, opticasclvision.cl, patagoniacamp.com y sgfertility.com. Guardaron las peticiones en `.txt` y las cookies en `.json` por separado; los adaptadores del principio de la prueba los normalizan sin tocar un dato. sgfertility no es un sitio medido, es una medición fallida, y está a propósito. |
| `ev2/` | skinology.cl, revitalaser.cl, aureamed.cl y kydoft.cl. Cada petición trae su fase: A es lo pasivo, B es lo que apareció después de mover el mouse. De acá sale el §14. |

## Cómo se rehace

Midiendo de nuevo, con Chrome headless en un puerto de CDP y un cliente `{ enviar, al }` de
veinte líneas sobre el `WebSocket` global de node, llamando a `medirConNavegador`. Es el
mismo método de `medidas-25sep/` y `medidas-26sep/`, que tienen su receta escrita. Si se
rehacen, las cifras de `prueba-profundo.mjs` cambian con ellas: son el retrato de once
sitios en una fecha, no constantes.
