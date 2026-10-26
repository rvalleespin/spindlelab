# Desvíos de Clara: home y marco (obra E13)

Archivos míos: `e13/texto/home.json`, `comun.json`, `trabajo.json`, `caso-combeau.json` y este. Copias con huella re-extraídas (`extraer-texto.mjs home comun trabajo caso-combeau`; `--comprobar` da «igual» para las cuatro). Texto sin commit.

## 1 · Qué cambié, por qué, de dónde sale

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| Home: de siete secciones (portada, cinta, índice corto, pruebas, servicios, quién, contacto) a las nueve del brief §4 | El mensaje y la acción cambian; el diseño no | brief §4; copy-secciones-v1.2 §2; v2-vigente/home.txt |
| Portada: rótulo = categoría, h1 «Te llegan consultas. Veamos dónde se cae el resto.», subtítulo, botón «Pedir la revisión de una página», microcopy, enlace «Chequear mi sitio ahora, sin registro» | Una sola acción principal; el chequeo baja a secundario | copy §2.1 |
| Se retira el formulario del chequeo de la portada (`home.chequeo.*`) | El chequeo vive en `/diagnostico/`; la portada pide una sola cosa | brief §2 |
| Se retiran la cinta, el índice corto y «Cada pieza, con un dato medido» (con 805 kB, 384 pruebas, 0,52 s, la ficha «Medido» y el aviso de cifras) | Praxi y los conceptos salen; los datos viven en sus páginas | brief §3 y §4; decisión 3 |
| «Lo que podemos hacer por ti»: cuatro bloques con precio (Búsqueda y visibilidad en IA, Anuncios en Google y redes, Sitio web a medida, Acompañamiento mensual) en el orden del documento, no el de E12 | Reagrupa lo que antes eran cuatro filas más una línea «también» | copy §2.5 |
| Precio de Búsqueda y visibilidad: «Desde $400.000 + IVA · una vez» (el v2 decía «Desde $400.000 + IVA.») | Es el texto exacto de `servicios-v3.json` y lo que la lectura fría de E12 pidió (no sabía si era una vez o al mes) | servicios-v3.json visibilidad-en-ia planes[0] |
| Precios de Anuncios con «/mes» y los nombres exactos de `oferta-v3.json` (el v2 decía «Google Ads desde $350.000 al mes») | Para que los guardianes `contiene` comparen texto con dato sin tocarlos | servicios-v3.json paid-media y redes-sociales planes[0] |
| «Lo que puedes revisar antes de contratar»: precios, método, chequeo, «probado primero en lo nuestro» (nombra Verifica y Cumple y enlaza a ella), caso Combeau y `[ Todo el trabajo ] (2)` | Reemplaza cinta, índice corto y pruebas. Verifica y Cumple no tiene tarjeta aparte para no repetir el mismo hecho | copy §2.6; brief §4 |
| «Chequeo abierto» dice «la dirección de tu sitio» y no «tu dominio» | El campo del chequeo ya dice «La dirección de tu sitio» desde la lectura fría de E12 | home.chequeo.label (E12) |
| Quién está detrás: h2 «Quién está detrás», pie con el cargo, p1 en singular, CV en primera persona, tres reglas, botón «Conocer a Ramón» | Quita «más de cinco años», «partners», «aprueba el código» | copy §2.7; revisión del 23-oct |
| FAQ: las cinco preguntas, con el texto del v2 vigente | Brief §7 criterio 3: el FAQPage del JSON-LD coincide con el visible | copy §2.8 |
| Cierre: «Empieza por una página.» en tinta y «Escríbenos la dirección de tu sitio y te respondemos con la revisión.» en gris | Sin «24 horas» ni «mini-diagnóstico» | copy §2.9 |
| `title` «SpindleLab · Marketing y crecimiento con IA» (43) y `description` (144) | Sin el «en Chile» del v2 (Ramón lo descartó) | v2-vigente/home.txt |
| Marco: menú Soluciones, Método, Nosotros, Trabajo, Blog, Contacto + botón «Pedir la revisión» → `/v3/contacto/` | Menú del documento | copy §3 |
| Pie: línea de marca, correo con asunto `Quiero mi revisión gratis`, «© 2026 SpindleLab · Chile»; `comun.pie.privacidad` queda a decidir | Texto del documento. El de E12 solo traía logo, correo y hora | copy §3 |
| Entidad: `comun.entidad.descripcion`, `.cargo`, `.sabe` (texto para `layout-a.ts`) | `layout-a.ts` todavía dice «Estudio de diseño y tecnología…»; yo no toco `.ts` | copy §3; v2-vigente/home.txt (JSON-LD) |
| `/trabajo/`: dos entradas (Combeau unida en una; Verifica y Cumple). Salen Praxi, los cuatro conceptos, «El chequeo de 21 señales» y spindlelab.cl. h1, entradilla, filtro, conteo, title y description reescritos | Brief §3. La description de E12 decía «rubros que atendemos» (insinuaba clientela) | brief §3; revisión del 23-oct (fila «medio») |
| Caso Combeau: `combeau.resultado.p2` reescrita sin fecha ni conteo («El panel existe y lo opera él. No tenemos un número ni una fecha de uso que mostrar.») | Su fuente dice que el login estaba en revisión; la frase validaba la hipótesis sin respaldo | revisión del 23-oct (fila «alto»); revision-panel-admin-bernardo.md:589-594 |
| Caso Combeau: cierre «pide la revisión de una página y te respondemos en un día hábil», botón «Pedir la revisión de una página», `[ Todo el trabajo ] (2)`; se retiran `combeau.siguiente.rotulo` y `.caso` (Praxi) | Sin «24 horas»; con un solo caso no hay «Siguiente» | brief §3; guía §3 |

## 2 · Ids

### 2.1 Home: todos, en orden de página (83)

`estado` es el de cada elemento en el JSON. Los marcados «queda» no cambian de texto; «cambia» trae su `antes` y `por_que`. `home.portada.og-alt` no se ve en la página (alt de la imagen al compartir).

**portada**
- `home.portada.video` (nota, queda) [referencia, no es texto de página]
- `home.portada.pausa` (boton, queda)
- `home.portada.rotulo` (rotulo, cambia)
- `home.portada.h1` (h1, cambia)
- `home.portada.entradilla` (entradilla, cambia)
- `home.portada.boton` (boton, nuevo)
- `home.portada.microcopy` (nota, nuevo)
- `home.portada.chequeo` (boton, nuevo)
- `home.portada.og-alt` (nota, nuevo)
**problema**
- `home.problema.h2` (h2, nuevo)
- `home.problema.p` (parrafo, nuevo)
**para-quien**
- `home.paraquien.h2` (h2, nuevo)
- `home.paraquien.p1` (parrafo, nuevo)
- `home.paraquien.p2` (parrafo, nuevo)
**como**
- `home.como.h2` (h2, nuevo)
- `home.como.1` (parrafo, nuevo)
- `home.como.2` (parrafo, nuevo)
- `home.como.3` (parrafo, nuevo)
- `home.como.4` (parrafo, nuevo)
- `home.como.boton` (boton, nuevo)
**soluciones**
- `home.soluciones.h2` (h2, nuevo)
- `home.soluciones.intro` (parrafo, nuevo)
- `home.soluciones.busqueda.nombre` (h2 h3, nuevo)
- `home.soluciones.busqueda.texto` (parrafo, nuevo)
- `home.soluciones.busqueda.precio` (nota, nuevo)
- `home.soluciones.busqueda.aud.boton` (boton, nuevo)
- `home.soluciones.busqueda.via.boton` (boton, nuevo)
- `home.soluciones.anuncios.nombre` (h2 h3, nuevo)
- `home.soluciones.anuncios.texto` (parrafo, nuevo)
- `home.soluciones.anuncios.precio` (nota, nuevo)
- `home.soluciones.anuncios.paid.boton` (boton, nuevo)
- `home.soluciones.anuncios.redes.boton` (boton, nuevo)
- `home.soluciones.sitio.nombre` (h2 h3, nuevo)
- `home.soluciones.sitio.texto` (parrafo, nuevo)
- `home.soluciones.sitio.precio` (nota, queda)
- `home.soluciones.sitio.dw.boton` (boton, queda)
- `home.soluciones.acompanamiento.nombre` (h2 h3, queda)
- `home.soluciones.acompanamiento.texto` (parrafo, cambia)
- `home.soluciones.acompanamiento.precio` (nota, queda)
- `home.soluciones.acompanamiento.boton` (boton, queda)
**pruebas**
- `home.pruebas.h2` (h2, nuevo)
- `home.pruebas.precios.titulo` (h2 h3, nuevo)
- `home.pruebas.precios.texto` (parrafo, nuevo)
- `home.pruebas.precios.boton` (boton, nuevo)
- `home.pruebas.metodo.titulo` (h2 h3, nuevo)
- `home.pruebas.metodo.texto` (parrafo, nuevo)
- `home.pruebas.metodo.boton` (boton, nuevo)
- `home.pruebas.chequeo.titulo` (h2 h3, nuevo)
- `home.pruebas.chequeo.texto` (parrafo, cambia)
- `home.pruebas.chequeo.boton` (boton, nuevo)
- `home.pruebas.propio.titulo` (h2 h3, nuevo)
- `home.pruebas.propio.texto` (parrafo, cambia)
- `home.pruebas.propio.aviso` (nota, nuevo)
- `home.pruebas.propio.boton` (boton, nuevo)
- `home.pruebas.pie-verifica` (nota, queda)
- `home.pruebas.caso.titulo` (h2 h3, nuevo)
- `home.pruebas.caso.texto` (parrafo, nuevo)
- `home.pruebas.caso.boton` (boton, nuevo)
- `home.pruebas.todo` (boton, cambia)
**quien**
- `home.quien.h2` (h2, cambia)
- `home.quien.pie` (nota, nuevo)
- `home.quien.p1` (parrafo, nuevo)
- `home.quien.cv` (parrafo, cambia)
- `home.quien.regla.1` (parrafo, nuevo)
- `home.quien.regla.2` (parrafo, nuevo)
- `home.quien.regla.3` (parrafo, nuevo)
- `home.quien.boton` (boton, queda)
- `home.quien.retrato` (nota, queda)
**faq**
- `home.faq.h2` (h2, nuevo)
- `home.faq.1.p` (h2 h3, nuevo)
- `home.faq.1.r` (parrafo, nuevo)
- `home.faq.2.p` (h2 h3, nuevo)
- `home.faq.2.r` (parrafo, nuevo)
- `home.faq.3.p` (h2 h3, nuevo)
- `home.faq.3.r` (parrafo, nuevo)
- `home.faq.4.p` (h2 h3, nuevo)
- `home.faq.4.r` (parrafo, nuevo)
- `home.faq.5.p` (h2 h3, nuevo)
- `home.faq.5.r` (parrafo, nuevo)
- `home.faq.jsonld` (nota, nuevo) [referencia, no es texto de página]
**contacto**
- `home.contacto.h2` (h2, cambia)
- `home.contacto.boton` (boton, cambia)
- `home.contacto.correo` (nota, queda)

### 2.2 Home: ids retirados (54)

- Chequeo en portada (8): `home.chequeo.rotulo`, `.intro`, `.label`, `.placeholder`, `.boton`, `.ayuda`, `.error-vacio`, `.resultado`.
- Cinta (3): `home.cinta.nombre`, `.pausa`, `.tramos`.
- Índice corto (5): `home.obra.h2`, `.entradas`, `.pie-verifica` (pasa a `home.pruebas.pie-verifica`), `.concepto`, `.todo` (pasa a `home.pruebas.todo`).
- Dato medido (11): `home.prueba.h2`, `.aviso`, `.combeau.pieza`, `.combeau.dato`, `.combeau.ficha`, `.praxi.pieza`, `.praxi.dato`, `.praxi.ficha`, `.vyc.pieza`, `.vyc.dato`, `.vyc.ficha`.
- Servicios de E12 (24): `home.servicios.h2`, `.guia`, `.tambien`, y `.dw`, `.via`, `.aud`, `.aco` con sus `.situacion`, `.nombre`, `.texto`, `.precio`, `.boton`; además `.via.escena`. Los reemplaza `home.soluciones.*`.
- Quién y contacto (3): `home.quien.publicado`, `home.contacto.que-es`, `home.contacto.de-cero`.

### 2.3 Otros archivos

- `comun.json`: retirado `comun.cursor.chequeo` (la entrada del chequeo ya no está en el índice). Nuevos: `comun.nav.blog`, `.contacto`, `.revision`, `comun.pie.marca`, `.copy`, `.privacidad`, `comun.entidad.descripcion`, `.cargo`, `.sabe`. Cambian de texto: `comun.nav.servicios` (ahora «Soluciones»), `comun.pie.correo` (destino con asunto), `comun.cursor.caso`. **Se queda, sin ser del menú:** `comun.nav.escribenos` (ver la tabla de la sección 4). **Se queda sin uso futuro:** `comun.cursor.concepto` (ver la tabla de la sección 4).
- `trabajo.json`: mismos 6 ids de la cabecera (cambian `trabajo.h1`, `.entradilla`, `.conteo`, `.filtro`); `entradas` pasa de 10 a 2: `combeau-fotografia` (ahora cubre los dos sitios) y `verifica-y-cumple`.
- `caso-combeau.json`: retirados `combeau.siguiente.rotulo` y `combeau.siguiente.caso`; cambian `combeau.resultado.p2`, `combeau.siguiente.contacto`, `.boton`, `.todo`.

## 3 · Qué espera Diego de la plantilla

1. **Home (`src/pages/v3/index.astro`).** Nueve `<section>` en el orden de 2.1, cada una `aria-labelledby` de su h2. La portada pierde `<Chequeo>` y gana, en este orden bajo el subtítulo: botón primario (`home.portada.boton`), microcopy (`.microcopy`, nota chica) y enlace secundario (`.chequeo`, enlace de texto y no botón). Se van los imports de `cinta`, `casoPraxi`, `medioDe` y el `<script>` de `cinta.mjs`.
2. **H2 de una sola tinta.** Todos los h2 de la home traen `tinta` sin `gris`, salvo `home.contacto.h2` (tinta y gris). `dos(id).gris` quedaría `undefined`: hay que leer `gris` solo si existe. No inventé continuaciones grises que el copy aprobado no trae; si Lucía las quiere, las pide a Clara.
3. **«Cómo partimos» (`home.como.1` a `.4`).** `rotulo` = «01 · Revisión gratis»: se parte por « · » como `dw.fase.N` (el número va con `aria-hidden`). Lo mismo para las tres reglas de `home.quien.regla.1` a `.3` (`rotulo` es el título, `texto` una frase).
4. **Guardianes de la sección Soluciones.** Los nombres de servicio exactos de `oferta-v3.json` viven en los botones (`Ver ${nombre}`); los tres rótulos de bloque («Búsqueda y visibilidad en IA», «Anuncios en Google y redes», «Sitio web a medida») son agrupaciones del copy, no nombres de servicio. Precios, todos iguales como texto al dato: Búsqueda = `servicios['visibilidad-en-ia'].secciones[1].planes[0].precio`; Anuncios = `contiene` de `paid-media` y `redes-sociales` planes[0] con «desde» en minúscula (como `tambien` en E12); Sitio = `oferta.momentos[0].planes[0].p`; Acompañamiento = `acompanamiento-mensual` planes[0]. Cada botón con su `destino` igual al `href` de la oferta.
5. **Pruebas.** `home.pruebas.propio.boton` es externo: flecha ↗ y `comun.externo` oculto. `home.pruebas.pie-verifica` solo se pinta si Lucía deja una imagen de Verifica y Cumple en la sección; si la pinta, el pie es obligatorio. El corchete se compara con `[ Todo el trabajo ] (${entradas.length})`.
6. **FAQ.** Cinco pares `home.faq.N.p` / `.r`. El `FAQPage` del JSON-LD se arma de esos mismos diez textos, sin copiarlos a mano (criterio 3). `home.faq.jsonld` es instrucción, no texto.
7. **Marco.** `Encabezado.astro`: siete elementos (seis enlaces y el botón `comun.nav.revision`, que lleva a `/v3/contacto/`), en el orden de `comun.nav`; los textos salen de `comun` y no del arreglo escrito a mano. `Pie.astro`: `comun.pie.marca`, `comun.pie.correo` (con su `destino`, que trae el asunto), `comun.pie.copy`, la hora; la política de privacidad es decisión abierta 8. `layout-a.ts`: `entidad.org.description`, `knowsAbout` y `autor.jobTitle` desde `comun.entidad.*`.
8. **`/trabajo/` (`trabajo/index.astro`).** Con dos entradas el filtro (1 y 1) no filtra nada: **recomiendo sacarlo** con `trabajo.filtro` y `trabajo.filtro.nombre`, y dejar el conteo del título. Si se queda, `Todo (2)`, `Cliente (1)` y `Propio (1)` pasan los guardianes. `PORTADAS` ya trae `combeau-fotografia` y `verifica-y-cumple`; sobran las otras ocho. El `nombreLista` que antepone «Bernardo » a los ids con prefijo `combeau-` sigue dando «Bernardo Combeau» porque el nombre ahora es «Combeau».
9. **Caso Combeau (`casos.mjs`).** Con un solo caso, `ORDEN` tiene una entrada y el cálculo de «Siguiente» (líneas ~503 a 520) apuntaría a sí mismo y lee `combeau.siguiente.caso`, que ya no existe: hay que quitar ese bloque de la plantilla de caso. `[ Todo el trabajo ] (2)` sigue comparándose con `trabajo.conteo`.

## 4 · Quién más lee estos ids (lo que cae hasta que se arregle)

Revisé con un script todos los `.astro`, `.mjs` y `.ts` de `src/` buscando ids literales de `home.*`, `comun.*`, `trabajo.*` y `combeau.*` que ya no existan. Fuera de la home solo aparecen estos, y son de otros roles:

| Quién lo lee | Qué lee | Qué pasa |
|---|---|---|
| `src/pages/v3/index.astro` | todos los `home.*` retirados | Cae, esperado: lo reconstruye Diego |
| `src/pages/v3/servicios/[slug].astro:135` | `entrada('chequeo')` de `trabajo.entradas` | Cae `visibilidad-en-ia`: la franja usa nombre y línea de esa entrada. Hay que escribirlos en la página o dejar la franja sin pie |
| `src/pages/v3/servicios/desarrollo-web.astro:69-71` | `entrada('praxi')` y `entrada('sesenta')` | Cae `desarrollo-web`: «Lo que construimos» pierde dos de sus tres piezas. `combeau-fotografia` sigue |
| `src/data/archivo/casos.mjs:503-520` | `combeau.siguiente.caso`, `.rotulo` | Cae el caso Combeau (ver 3.9) |
| `src/data/archivo/casos.mjs:525` | `comun.cursor.concepto` | Existe todavía; sin uso cuando salgan los conceptos de `ORDEN` |
| `servicios/[slug].astro:147` y `data/archivo/blog.mjs:36` | `comun.nav.escribenos` | Se dejó para que no caigan. Cuando esos roles lo cambien por «Pedir la revisión de una página», se retira |

El build de prueba (`construir.sh clara`) hoy cae primero en `/v3/contacto/` por un id de otro rol (`contacto.despues.3.t`), no por los míos.

## 5 · Tipos de elemento

Ninguno nuevo. Se reusan: el molde de `dw.fase.N` (`rol: parrafo` con `rotulo` y `texto`) en `home.como.*` y `home.quien.regla.*`; el par `.p` / `.r` de `dw.faq.N` en `home.faq.*`; `items` de `combeau.solucion.ingredientes` en `comun.entidad.sabe`. Solo cambia que un `h2` pueda traer `tinta` sin `gris`.

## 6 · Pruebas que corrí

- Los cuatro `.json` parsean y sus copias también; `extraer-texto.mjs --comprobar` da «igual» para home, comun, trabajo y caso-combeau (los demás «DISTINTO» son de otros roles en curso).
- Búsqueda de rayas largas y medias (U+2014 y U+2013) sobre los cuatro JSON y este archivo: 0 hallazgos.
- Barrido de términos de la guía §3 sobre los campos que ve el público (`texto`, `tinta`, `gris`, `rotulo`, `bajada`, `nombre`, `linea`, `pie`, `cursor`, `title`, `description`, `items`, `opciones`, `valor`): un solo hallazgo, «agentes de IA» en `home.quien.p1`, que es el lugar permitido. Cero «diagnóstico» fuera del nombre de la ruta, cero «24 horas», «motor», «partners», «monitoreo», «quincenal», «sin compromiso», «en Chile» de relleno, «¿Listo…?» ni Title Case en títulos y botones (lo único con mayúscula interior es `Paid Media (Google)`, nombre exacto de `oferta-v3.json`; un detector de Title Case puede marcarlo en el botón «Ver Paid Media (Google)»). Los términos viejos aparecen solo en `antes`, `por_que`, `borrado` y `nota`, que no se publican.
- Largos: `title` 43 y `description` 144 (home); 59 y 130 (trabajo). Lock §14 en los h1 y h2 de dos tintas: portada tinta 3 y gris 6; cierre tinta 4 y gris 12; trabajo tinta 1 y gris 10; cierre de Combeau tinta 8 y gris 13.
- Titular y portada contra el detector anti-slop (A1 a A10) y la voz: sin verbos de folleto, sin relleno de apertura, sin tricolon de adjetivos, sin «no solo X sino Y», sin pregunta retórica, sin raya, sin prueba social. **El h1 solo no pasa el test de intercambio de rubro** (serviría para una clínica y para una inmobiliaria) y es deliberado: el rótulo de arriba pone la categoría y el subtítulo nombra lo que se revisa; leído en voz alta como el conjunto de tres, suena a algo que una persona diría. Las dos lecturas en frío del borrador dijeron lo mismo: engancha, pero solo no dice qué venden.
- **No corrí** la lectura en frío del criterio 4 del brief ni `npm run verificar`: son sobre el sitio construido y la plantilla de la home todavía no existe.

## 7 · Decisiones abiertas de Ramón que tocan mis textos

1. **«Hoy lo opera él»** (Combeau: `home.pruebas.caso.texto` y `combeau.resultado.p2`). Descansa en una mantención acordada y en el login verificado el 23-sep, sin un registro de uso reciente. Si no lo confirma, `combeau.resultado.p2` queda en «No tenemos un número ni una fecha de uso que mostrar.» o sale, y la home dice «Construimos su sitio con un panel para que él mismo edite textos y series».
2. **«Tomo pocos proyectos a la vez» y «reviso yo lo que te entrego»** (`home.quien.p1`). Una lectora no creyó la primera; la segunda es declarada. Viven solo ahí.
3. **El CV** (`home.quien.cv`): «ocho marcas nacionales» y «cuatro países» están en el v2 publicado, pero su memoria dice que las cifras de agencias no van al copy de SpindleLab. Y el cargo «Consultor de marketing y crecimiento con IA» (`home.quien.pie`, `comun.entidad.cargo`) es R5: `blog.json` lleva «Fundador de SpindleLab» y conviene que digan lo mismo.
4. **«Salió mal» y «perdía mensajes sin avisar»** (`home.pruebas.propio.texto`): hechos del caso de Verifica y Cumple sin puntajes. Confirma que se pueden decir tal cual.
5. **La frase «y en si la IA puede leerlo»** (`home.portada.microcopy`). Es literal del v2 publicado y se repite en siete páginas (la home y seis artículos del blog); es torpe, pero la dejé igual para no abrir una diferencia entre páginas. Propuesta para todas a la vez: «Te devolvemos una página con lo más importante que encontramos en tu sitio, si la IA puede leerlo y por dónde partiríamos.» No la apliqué.
6. **Combeau como una sola tarjeta.** El brief pide dos entradas; Combeau tenía dos (fotografía y modelo) y las uní en una (`combeau-fotografia`, que conserva el id porque lo lee `desarrollo-web.astro`). Si Mauro quería dos tarjetas de Combeau más Verifica y Cumple, son tres entradas y el filtro vuelve a tener sentido. Salieron además «El chequeo de 21 señales» y spindlelab.cl como piezas del índice.
7. **«Sitio web a medida»** es rótulo del bloque (copy §2.5), no el claim de la marca, que dejó de serlo. El servicio sigue llamándose «Desarrollo web».
8. **Política de privacidad en el pie** (`comun.pie.privacidad`). El pie de E12 no la enlazaba y `/privacidad/` no tiene versión v3; el v2 sí la enlaza. Decide Mauro con Diego.
9. **La hipótesis de Combeau queda sin cerrar.** `combeau.hipotesis.p1` termina en «Íbamos a saber si funcionaba cuando publicara una serie nueva sin pedirnos nada» y ya nada dice que ocurrió. Es lo honesto; si Ramón confirma con evidencia que Bernardo publicó solo, se puede volver a escribir.
10. **Los tres ejemplos de rubro** (consultora, clínica, restaurante) en `home.paraquien.p1`: son ejemplos de cliente ideal, no clientes atendidos. Los confirma Ramón (copy §11).
11. **La quinta pregunta frecuente** («¿Hay contrato de permanencia?») salió de las lecturas en frío, no de un prospecto real.
12. **Permiso de Combeau**: verbal (inventario-casos.md:98; Ramón, 16-oct). Las fichas de la troncal dicen otra cosa. Está dicho en la condición de `home.pruebas.caso.texto`.
13. **Fuera de mi encargo, pendiente de su dueño:** `layout-a.ts` (texto en `comun.entidad.*`), `llms.txt`, `v3-chequeo.js` (sus textos de resultado dicen «Pedir el diagnóstico»), la imagen al compartir `og-e12-marca.jpg` (puede traer el claim viejo horneado) y `og-e12-trabajo.jpg` (alt «Tres piezas de SpindleLab: el sitio de un fotógrafo, la app Praxi y Sesenta, un concepto.», hoy escrito a mano en `trabajo/index.astro`).
