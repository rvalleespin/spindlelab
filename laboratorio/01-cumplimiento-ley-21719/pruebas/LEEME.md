# Pruebas de los chequeos y del control de cookies

**2.354 comprobaciones en 13 baterías, medidas el 30-sep-2026 corriéndolas todas.**

⚠️ El número de antes, "1198 comprobaciones (23-sep)", estaba desfasado de tres maneras a la
vez, y las tres importan más que la cifra:

1. **Contaba baterías que no corrían.** `prueba-gemelo-completa` (370), `prueba-robots` (115)
   y `medir-cpu` reventaban antes de la primera aserción, porque `/tmp/spl-main-wt` dejó de
   ser un repositorio git. 485 comprobaciones figuraban en verde sin ejecutarse en ninguna
   parte. Arreglado el 27-sep: las rutas salen de `rutas.mjs`, que busca el código dentro del
   repositorio en vez de en una carpeta que el sistema borra.
2. **No contaba las tres baterías que miran la PANTALLA** (`prueba-portada-doce`,
   `prueba-portada-rehacer`, `prueba-portada-cierre`), que son las que cazan los errores de
   costura entre la API y la portada. Esos no los ve ninguna prueba de JSON.
3. **Los conteos individuales tampoco calzaban**: `prueba-destino` decía 530 y da 538.

Regla que sale de esto: **si el número del LEEME no se puede reproducir corriendo las
baterías hoy, el LEEME miente.** Se actualiza en el mismo cambio, o no se actualiza nunca.
sobre los dos módulos de chequeo, que comparten la lógica de validación de
destino y de descarga acotada, y sobre el control de cookies de spindlelab.cl:

- `verificaycumple/functions/api/chequeo.js` (rama `laboratorio/ley-21719`)
- `spindlelab-astro/functions/api/chequeo.js` (rama `main`)

**No hay runner ni dependencias.** Cada archivo se corre con `node <archivo>.mjs`
y termina con un resumen y un código de salida (0 bien, 1 mal).

Las rutas de import son **absolutas a los worktrees** (`/tmp/vyc-sub-wt/...`,
`/tmp/spl-main-wt/...`). Si los worktrees no existen, ajusta las primeras
líneas de cada archivo antes de correrlo.

Las tres del chequeo profundo (la tabla de más abajo) ya no piden eso: buscan el
código **dentro del repositorio** con `rutas.mjs` —el worktree propio primero, y
si no, cualquier otro worktree del mismo repo que tenga el archivo— y **imprimen
la ruta que eligieron**. Una prueba que no dice qué archivo cargó no deja
descubrir que cargó el equivocado.

Se pueden forzar:

| variable | qué es |
|---|---|
| `VYC_SITIO` | la carpeta `verificaycumple/` |
| `VYC_INDEX_HTML` / `PROFUNDO_JS` | un archivo concreto en vez de la búsqueda |
| `PROFUNDO_DATOS` | el banco de mediciones con navegador del 23 y 25-sep |
| `CHROME` | el binario de Chrome (solo las dos `prueba-portada-*.mjs`) |

El banco de mediciones **ya no es el cabo suelto**: desde el 26-sep vive en
`banco/`, que es justo donde `rutas.mjs` lo busca por defecto, así que
`prueba-profundo.mjs` corre sin pasarle una sola variable. Hasta ese día vivía en
el scratchpad de una sesión, bajo `/tmp`, dentro de una carpeta de 1 GB de
perfiles de Chrome: la batería **no corría en ninguna parte** salvo que alguien
supiera la ruta. Lo que se copió son los 16 archivos que el código abre por
nombre, 768 KB en total; el resto de esa carpeta sí es material de sesión y no
se trajo. Ver `banco/LEEME.md`.

Si aun así falta, `prueba-profundo.mjs` **no corre y lo dice** en vez de saltarse
las comprobaciones en silencio, que es lo correcto: un verde sin ellas no
significa lo mismo.

También están versionadas las mediciones de las que dependen los dos falsos
verdes que se cerraron: `medidas-25sep/` (seis sitios, la pared de Akamai) y
`medidas-26sep/` (treinta y cuatro portadas, el censo del que sale el corte de
`MAX_PETICIONES_PARED`). Viven junto a la prueba a propósito: son casos que no
se pueden perder cuando se borre una carpeta de sesión. Cada carpeta tiene su
`LEEME.md` con el método y con cómo rehacerlas.

| archivo | qué cubre |
|---|---|
| `prueba-destino.mjs` | Verifica y Cumple: validación de dominio, portón de destinos, redirecciones, mensajes de error, contrato de la respuesta, permiso antes de rastreadores, patrones de CMP, enlace a la política, www, tiempo lineal, no-store, el middleware que muda pages.dev a verifica.spindlelab.cl, peor caso de espera, página de bloqueo con 200, sitios armados con JavaScript, política que no se pudo leer, casilla del formulario, el texto de todas las respuestas, y la marca de retención rota o comentada que no puede retener lo que viene después (538) |
| `prueba-gemelo-completa.mjs` | spindlelab.cl: el informe inventado, notaciones de IP, redirecciones, sondas de agente, robots.txt ilegible, equivalencia ítem por ítem con la versión anterior, www, peor caso de espera, no-store, la página de bloqueo que llega con 200, llms.txt y sitemap.xml (manda lo que llegó, no el código), y que los dos detectores de bloqueo sean la misma lista (370) |
| `prueba-streaming.mjs` | la rama de streaming de spindlelab.cl, que es la que corre en producción: cuerpos reales, cancelación de la descarga, sitemap de 4,8 MB, www, página de bloqueo con una tilde partida entre dos trozos (23) |
| `prueba-vyc-streaming.mjs` | lo mismo para Verifica y Cumple, más la página de bloqueo, los sitios armados con JavaScript y la política que no se pudo leer (23) |
| `prueba-saltos.mjs` | bucle de redirecciones, cadena larga legítima, reloj compartido, la política que también sigue los saltos por el portón, el presupuesto de 50 subpeticiones por invocación de Cloudflare, el robots.txt ilegible que no puede sumar, y las dos listas de página de bloqueo, que son la misma (55) |
| `prueba-robots.mjs` | tabla comparativa de los casos de robots.txt, vieja contra nueva, lo que no puede retroceder, y el archivo que no se pudo leer: no baja a verde, queda sin confirmar, sale del denominador y no se afirma que no exista (115) |
| `medir-cpu.mjs` | costo por tamaño de portada, vieja contra nueva (tabla, sin aserciones) |
| `prueba-cookies.mjs` | el control de cookies de spindlelab.cl (`public/js/consent-banner.js`) con un DOM de mentira en `vm`: Analytics solo al aceptar, almacenamiento bloqueado, otra pestaña, bfcache con eventos encolados en cualquier orden, el `revoke` del Pixel sin `grant` en caliente, cookies heredadas, `_gcl_` (82) |
| `adversario.mjs` | entradas hechas para hacer sufrir al parser de spindlelab.cl (anidamiento extremo, etiqueta sin cerrar, miles de h2, prosa de 2,8 MB, miles de "<" sin cerrar) (tabla, sin aserciones) |

Los números entre paréntesis son las comprobaciones que cuenta cada archivo al
terminar ("N bien, 0 mal"). Si cambian, se actualizan acá en el mismo cambio.

## El chequeo profundo y los 12 puntos (25 y 26-sep)

Tres archivos más, sobre `verificaycumple/functions/api/profundo.js`,
`…/doce-puntos.js` y la portada que los dibuja:

| archivo | qué cubre |
|---|---|
| `prueba-profundo.mjs` | el informe del navegador, con peticiones y cookies REALES medidas por CDP el 23, el 25 y el 26-sep: los tres verbos (cargar, dejar cookie, enviar) que no se pueden colapsar, que un "no lo sabemos" no sume ni reste, y que ninguna caída nuestra salga como buena noticia. Su §23, su §32, su §33 y su §34 se apoyan en `medidas-26sep/`, que sí está versionado (730 al 26-sep; el resto necesita el banco de mediciones) |
| `prueba-doce-puntos.mjs` | qué dice el módulo de los 12 puntos sobre cinco políticas reales, punto por punto, contra una tabla comparada a mano; más el tope por IP y el contrato de la respuesta (247) |
| `prueba-portada-doce.mjs` | la portada DIBUJANDO los 12 puntos: levanta `index.html` en un Chrome de verdad y le contesta `/api/doce-puntos` con el cuerpo real del endpoint. Política legible, política que no se pudo leer, y la API declinando (43) |
| `prueba-portada-rehacer.mjs` | la portada cuando **"Volver a medirlo" falla**: mismo Chrome de verdad, y la API la contesta `profundo()` con una KV falsa que tiene el informe guardado y el contador por IP en su tope. El informe que la persona estaba leyendo tiene que seguir en pantalla, y la tarjeta de falla tiene que decir a qué dirección escribir (23) |
| `prueba-portada-cierre.mjs` | **el párrafo de cierre del informe profundo**, el de "Nada pendiente", mirado en el mismo Chrome de verdad. No comprueba que diga una frase: comprueba que lo que afirma no contradiga la medición que lo produjo. El caso es uhc.cl con el aviso que instala el kit (los cuatro verdes) más una cookie `_ym_uid` de primera parte sacada del censo (26) |

## La prueba que mira la pantalla, y por qué hizo falta (26-sep)

`prueba-portada-doce.mjs` es distinta de todas las demás y conviene saber por
qué antes de tocarla.

El 26-sep la sección de los 12 puntos salía **vacía en producción**, por el
camino de éxito y sin un solo error en consola. La API contesta
`{ ok, dominio, revisado, seccion }` con los doce dentro de `seccion`, y la
portada los buscaba en la raíz: `data.puntos` era `undefined`, la lista salía de
largo 0, y el código borraba la sección entera.

Las 247 comprobaciones de `prueba-doce-puntos.mjs` pasaban, y no podían hacer
otra cosa: afirman la forma anidada (`r.cuerpo.seccion.fuente`) contra el mismo
código que la produce. **La prueba y el código salían del mismo supuesto, así que
la prueba confirmaba el error en vez de encontrarlo.** Tercera vez, después de
las tres de "el doble de prueba miente" que están más abajo.

Por eso esta no mira el JSON, mira la pantalla:

- el HTML es `index.html` tal cual, servido por HTTP sin tocarle una línea (lo
  único que se le agrega es un conductor al final del `<body>`, que llena el
  campo, aprieta el botón y reporta lo que quedó dibujado);
- los cuerpos de las tres APIs los calcula el código real de los tres endpoints;
- el sitio que se revisa es el propio Verifica y Cumple, su portada y su
  política leídas del disco: nada de HTML inventado para la ocasión;
- quien decide si pasa es el navegador. Si la sección queda vacía, falla.

Es agnóstica a la forma del JSON a propósito: si mañana alguien aplana la
respuesta en la API y se olvida de la portada, o al revés, se cae igual.
Comprobado el 26-sep contra la copia del código de antes del arreglo: 24 de las
43 se caen, empezando por "la sección NO quedó vacía".

**Dos trampas de Chrome que ya costaron caro**, por si hay que escribir otra así:

- con un perfil **recién creado**, Chrome escribe el DOM en stdout y después
  **no se muere**. Ni el `timeout` de `execFileSync` ni esperar el evento
  `close` sirven, porque los procesos hijos siguen colgados del mismo pipe. Hay
  que esperar el `</html>` en la salida y matar el grupo entero;
- `--virtual-time-budget` adelanta los temporizadores pero se detiene mientras
  haya peticiones en vuelo, que es justo lo que se necesita. El presupuesto va
  por encima de lo que espera el conductor y por debajo de los 75 s del plazo
  del chequeo profundo, que no tiene que dispararse.

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

## El invariante que pasaba sin mirar nada (26-sep)

Una variante de lo mismo, y conviene tenerla aparte porque no se ve igual. El §32 dejó
escrito un invariante contra el falso verde que acababa de cerrar: **un ítem en verde que
hable de rastreadores tiene que decir de cuáles habla.** Estaba bien pensado y estaba mal
puesto: el bucle recorría los ítems de UN informe, el de uhc.cl, donde los verdes son tres.

El cuarto ítem que puede salir en verde es el del aviso de cookies, y uhc.cl no tiene
banner, así que ese ítem nunca entró al bucle. Su frase decía "no corrió ningún rastreador",
en absoluto, que es exactamente lo que el invariante prohíbe. **Pasó en verde porque no
miró.** Y es el informe que sale después de instalar el kit, cuando el gestor ya está
puesto, o sea el momento en que menos se puede prometer de más.

La corrección está en el mismo §32: el bucle recorre varios informes, y después **exige que
entre todos hayan salido los cuatro verdes**. Si mañana aparece un quinto ítem que puede ir
en verde y nadie lo agrega, la cuenta no calza y la prueba falla. Un invariante que no dice
sobre cuántos casos corrió no es un invariante.

El §33 cierra la otra mitad del mismo día: el motivo `portero` seguía diciendo "las ÚNICAS
cookies que quedaron son las del sistema que filtra robots" después de que su regla dejara
de comprobar el "todas" (ese fue el arreglo del §23). Con una cookie corriente al lado, el
motivo dispara igual y la frase es falsa, y el §23 no lo veía porque comprueba el motivo, no
lo que se dice. Se comprueba texto contra datos: si el informe afirma que son las únicas, la
medición tiene que mostrarlo. Las cookies corrientes del caso no se inventaron, son las que
scotiabank.cl escribió de verdad junto a su `_abck` (F5 + Akamai en el mismo sitio).

## El último falso verde: quedarnos ciegos salía a favor del sitio (26-sep)

El §34 cierra la familia entera. En `medirConNavegador` el título, el texto en pantalla y
`letras` salen del **mismo `Runtime.evaluate`**. Una pared con desafío de JavaScript se
recarga sola y destruye el contexto de ejecución, así que ese evaluate tira y los tres
detectores de texto se mueren juntos. Con ellos se mueren las tres primeras puertas de
`pareceBloqueo`, y la única que quedaba en pie era la lista de nombres de cookies, que es
justo de lo que el §23 había intentado dejar de depender.

La puerta genérica exigía `letras` numérico, así que la misma pared de tres peticiones
declinaba con el texto medido y sacaba **100/100 con tres verdes y "Nada pendiente"** con
`letras` en null. **El caso en que más falta hace reconocer la pared era exactamente el caso
en que no la reconocíamos.** Falta de dato no es dato a favor: un "no pudimos mirar" va a
sin-confirmar, nunca a verde.

La prueba vieja **bendecía el hueco**: afirmaba como correcto que tres peticiones sin dato
de texto no fueran bloqueo. Esa aserción se dio vuelta. Y el §34 no le pone `letras: null` a
una medición a mano —eso sería salir del mismo supuesto que el arreglo—: hace **reventar el
evaluate** en el navegador de mentira y deja que el `medirConNavegador` de producción
produzca la medición ciega. Después comprueba el otro lado sobre el censo entero: cegadas
las 34 portadas, las tres paredes declinan y las 31 reales siguen recibiendo informe.

La otra mitad del día es el **párrafo de cierre** (`prueba-portada-cierre.mjs`). Los cuatro
ítems en verde se acotaron el 26-sep con "de los que buscamos"; el cierre se quedó diciendo
"tu sitio no cargó rastreadores ni guardó nada antes de pedir permiso", en absoluto, sobre
dos cosas que solo se saben del catálogo. Es la frase más citable del informe y la que se
lee después de instalar el kit. Se comprueba texto contra datos, como el §33: el caso trae
una cookie de Yandex Metrica de primera parte —medida así en el censo, y fuera de nuestro
catálogo— así que el informe sale igual de verde y cualquier "no guardó nada" queda
desmentido por su propia medición. Que `_ym_uid` sea un rastreador lo sabe la prueba, no el
código; si lo supiera el código, la prueba no probaría nada.

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
