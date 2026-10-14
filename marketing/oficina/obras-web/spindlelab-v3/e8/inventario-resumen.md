# Inventario anotado del copy del v3 (E8, paso 2)

14-oct-2026 · orquestador técnico, sin rol de marca · base `cae40df` (el código del sitio es el de `28c5d85`, la migración de Diego) · contrato: el plan E8 aprobado por Ramón, paso 2.

**Qué es.** La lista de todas las ranuras de copy de las 21 rutas públicas del v3 (sin las maquetas `a`, `b`, `c` y `maqueta-inicial`), cada una con la fuente que la pinta, las rutas donde aparece, si va también al JSON-LD, su estado y su dueña. Es el insumo de las tres Claras del paso 3: cada ranura no cerrada lleva su fila en el registro, aunque sea «se mantiene». Este archivo es el resumen; el inventario completo es un JSON que no se commitea (abajo).

**Dónde está el inventario.** `/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/e8/inventario.json` (1,46 MB). Las herramientas de este paso (`marcar.mjs`, `inventariar.mjs`, `resumir.mjs`) y las dos extracciones quedan en `…/scratchpad/e8/inventario/`, también sin commitear.

## Cómo se hizo

1. **Build de centinelas** en una copia aparte (worktree de `cae40df`, ya borrado). `marcar.mjs` dejó un marcador invisible (caracteres de ancho cero con un número) al principio y al final de cada hoja de texto de `servicios-v3.json`, `paginas-v3.json`, `oferta-v3.json` y `obra-v3.json`, y de los `label` y `alt` de `consts-v3.ts`: 648 hojas. No se marcan las claves que no son copy (`@type`, `@id`, `slug`, `url`, `href`, `canonical`, `item`, imágenes, `campo`, `tipo`, unidades), porque la plantilla las compara o las usa como ruta, ni `palabra`, que la home usa para armar los id de los paneles (marcarla cambiaba las claves de la extracción). Los datos del blog no se marcan: `blog/[slug].astro` exige que el FAQPage calce con la FAQ visible y el build se cae.
2. **Dos extracciones con `extraer.mjs`** a 1440: la del build normal (idéntica a `migrado.json` de Diego, «Sin diferencias» con `comparar.mjs`) y la del build de centinelas. Las 21 rutas dan las mismas claves en las dos, ranura por ranura, atributo por atributo y en el JSON-LD. El marcador dice qué hoja pinta cada ranura, entera o en parte (cuando la plantilla parte una hoja en h3 y párrafo, cada mitad trae su marcador).
3. **Lo que no trae marcador se busca por texto**, frase por frase, en la plantilla de la ruta, el cuerpo del artículo, los datos sin marcar, los componentes (`NavV3`, `FooterV3`, `Miga`, `Pieza`…), `consts-v3.ts`, `consts.ts`, `Layout.astro`, `consent-banner.js`, `v3-contacto.js` y `v3-chequeo.js`. Los comentarios no cuentan. Entre dos literales iguales del mismo archivo gana el que corresponde al uso (la miga visible y el `name` del BreadcrumbList son literales distintos y quedan como ranuras distintas). El ancla es un tramo del archivo que **aparece una sola vez**: si el texto se repite, el ancla se alarga por líneas hasta ser única. Sirve para el reemplazo exacto del paso 7; la línea va solo de referencia.
4. **Se agrupa por fuente.** Una hoja o un literal que pinta en varias rutas (menú, pie, cierres del blog, servicios) es una sola ranura con todas sus rutas y todas sus claves. Si la misma hoja va además al JSON-LD, la ranura lo dice (`toca_jsonld`, y en `jsonld` el tipo de nodo, como `Question.name` u `Offer.description`).
5. **El texto de `v3-chequeo.js`** (resultado, veredictos, errores) y el que pone el script de `NavV3` («Cerrar menú») no los ve la extracción: van como ranuras propias, con ancla en el archivo.

## Cobertura

- **1481 ranuras** (3421 apariciones: 2204 visible, 213 atributo, 126 head, 855 jsonld, 23 script); 140 se repiten en más de una ruta.
- **Con fuente: 1481 de 1481 (100 %).** Las 1461 que tienen texto propio tienen todas fuente literal (hoja, dato o ancla) y cubren el 100 % de sus letras. Anclas que no son únicas en su archivo: 0.
- **13 sin literal**: no tienen letras propias; la plantilla las arma (numeración 01-04 y fechas desde `datePublished`). Van `cerrado` y se listan al final.
- Métodos: centinela 565 · zona-del-articulo 351 · texto-plantilla 333 · texto-dato 83 · texto-cuerpo-articulo 59 · centinela + texto-plantilla 28 · ancla-en-script 23 · sin-letras-generado 13 · texto-cuerpo-articulo + zona-del-articulo 8 · texto-plantilla + texto-dato 7 · sin-letras 7 · centinela + texto-dato + texto-plantilla 3 · texto-plantilla + texto-cuerpo-articulo 1.

## Por estado

Una ranura puede tener más de un estado (`estados`); manda el primero de este orden: `cerrado` > `R2` > `Simón` > `decidido-§7` > `libre`. Con más de uno valen todos los límites (hoja de voz §0).

| Estado | Ranuras (estado principal) | Lo tienen en `estados` | Qué entra |
|---|---:|---:|---|
| cerrado | 630 | 630 | zonas cerradas (hero, `.d-pres`, línea del campo Desarrollo, bio, «Te lo muestro…», cuerpo y cabeza de los artículos, aviso de cookies), toda hoja que también pinta dentro de una de ellas, precios, datos del blog, `Layout.astro`, `consent-banner.js`, `consts.ts`, R3, R4 (bio con `puntos`, «No te prometo. Te muestro.», Paid Media P46), R7, el `og:image:alt` del hero y lo que no tiene texto propio |
| R2 | 49 | 62 | el patrón del encargo (quincen, cada mes, mes a mes, al mes, monitoreo, menciones), los lugares de la compuerta G2 (`lista-publicacion.md:74`: sus 20 líneas de JSON, de `63f1e55`, llevadas a puntero; las 4 de plantilla ya caen en el patrón) y las Offer con «Retainer mensual» (hoja §7) |
| Simón | 163 | 263 | title, meta y og; h1; preguntas de FAQ; h2 con término de búsqueda; JSON-LD que no se ve; texto que va al grafo como Offer, HowTo, HowToStep, Service, WebPage, CollectionPage, AboutPage, WebSite o ItemList (hoja §6) |
| decidido-§7 | 166 | 250 | texto citado en el §7 de `spec-visual.md` o en la hoja de voz §4 (la ranura trae `decidido_ref` con la línea o el número de fila), y todo `alt` (§4 #39) |
| libre | 473 | 473 | el resto |

## Por dueña

La dueña sale de la fuente principal (la que pinta más texto), no de la página. Clara S: `servicios-v3.json` y `servicios/[slug].astro`. Clara P: `paginas-v3.json` (Método, Diagnóstico, Contacto), `obra-v3.json` y las plantillas de Método, Diagnóstico, Contacto, Nosotros y Trabajo. Clara H: la home, el índice de servicios, `desarrollo-web.astro`, `oferta-v3.json`, `consts-v3.ts`, `paginas-v3.json#/servicios` y `#/blog`, los componentes, el blog fuera de sus datos y `v3-chequeo.js`. Lo que sale de una fuente intocable (`Layout.astro`, datos del blog, `consent-banner.js`, `consts.ts`) no tiene dueña y está cerrado; si una ranura mezcla una parte intocable con una editable («Siguiente artículo» + el titular del artículo), la dueña es la de la parte editable y `parte_cerrada` dice qué no se toca.

| Dueña | Abiertas (llevan fila) | R2 | Simón | decidido-§7 | libre | Cerradas | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| Clara S | 383 | 36 | 84 | 35 | 228 | 22 | 405 |
| Clara P | 206 | 10 | 40 | 52 | 104 | 39 | 245 |
| Clara H | 262 | 3 | 39 | 79 | 141 | 43 | 305 |
| sin dueña | 0 | 0 | 0 | 0 | 0 | 526 | 526 |

## Por ruta

Una ranura compartida cuenta en cada ruta donde aparece (el menú y el pie suman en las 21).

| Ruta | Ranuras | cerrado | R2 | Simón | decidido-§7 | libre | Abiertas de S | de P | de H |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/v3/` | 157 | 62 | 2 | 4 | 38 | 51 | 0 | 2 | 93 |
| `/v3/blog/` | 96 | 43 | 0 | 4 | 22 | 27 | 0 | 0 | 53 |
| `/v3/blog/21-chequeos-visibilidad-ia/` | 263 | 216 | 0 | 0 | 20 | 27 | 0 | 0 | 47 |
| `/v3/blog/como-aparecer-en-chatgpt/` | 139 | 92 | 0 | 0 | 20 | 27 | 0 | 0 | 47 |
| `/v3/blog/como-elegir-verificar-agencia-aeo-geo-chile/` | 148 | 101 | 0 | 0 | 20 | 27 | 0 | 0 | 47 |
| `/v3/blog/cuanto-cuesta-seo-tecnico-chile/` | 121 | 74 | 0 | 0 | 21 | 26 | 0 | 0 | 47 |
| `/v3/blog/que-es-aeo-geo/` | 135 | 88 | 0 | 0 | 20 | 27 | 0 | 0 | 47 |
| `/v3/blog/que-es-un-mini-diagnostico-seo/` | 123 | 76 | 0 | 0 | 20 | 27 | 0 | 0 | 47 |
| `/v3/blog/seo-tecnico-fintechs-chile/` | 119 | 72 | 0 | 0 | 20 | 27 | 0 | 0 | 47 |
| `/v3/contacto/` | 107 | 34 | 0 | 7 | 24 | 42 | 0 | 37 | 36 |
| `/v3/diagnostico/` | 143 | 35 | 3 | 10 | 35 | 60 | 0 | 52 | 56 |
| `/v3/metodo/` | 138 | 37 | 8 | 9 | 23 | 61 | 0 | 65 | 36 |
| `/v3/nosotros/` | 105 | 51 | 0 | 3 | 22 | 29 | 0 | 18 | 36 |
| `/v3/servicios/` | 121 | 38 | 1 | 12 | 32 | 38 | 0 | 0 | 83 |
| `/v3/servicios/acompanamiento-mensual/` | 157 | 35 | 18 | 15 | 26 | 63 | 85 | 0 | 37 |
| `/v3/servicios/auditoria-seo-tecnica/` | 155 | 33 | 0 | 20 | 27 | 75 | 85 | 0 | 37 |
| `/v3/servicios/desarrollo-web/` | 172 | 43 | 0 | 20 | 28 | 81 | 0 | 3 | 126 |
| `/v3/servicios/paid-media/` | 154 | 38 | 0 | 18 | 24 | 74 | 79 | 0 | 37 |
| `/v3/servicios/redes-sociales/` | 154 | 37 | 8 | 17 | 24 | 68 | 80 | 0 | 37 |
| `/v3/servicios/visibilidad-en-ia/` | 157 | 34 | 10 | 18 | 25 | 70 | 86 | 0 | 37 |
| `/v3/trabajo/` | 106 | 36 | 0 | 12 | 23 | 35 | 0 | 33 | 37 |

## Por fuente principal

| Archivo | Ranuras | Abiertas |
|---|---:|---:|
| `src/data/blog-v3/<artículo>.html` | 419 | 0 |
| `src/data/servicios-v3.json` | 390 | 368 |
| `src/data/paginas-v3.json` | 107 | 104 |
| `src/pages/v3/servicios/desarrollo-web.astro` | 97 | 89 |
| `src/data/blog-v3/<artículo>.json` | 57 | 0 |
| `src/data/oferta-v3.json` | 50 | 37 |
| `src/pages/v3/nosotros.astro` | 38 | 18 |
| `src/pages/v3/metodo.astro` | 36 | 32 |
| `src/data/blog-v3/_indice.json` | 29 | 7 |
| `src/data/obra-v3.json` | 29 | 22 |
| `src/pages/v3/index.astro` | 28 | 16 |
| `src/layouts/Layout.astro` | 25 | 0 |
| `src/pages/v3/diagnostico.astro` | 21 | 19 |
| `public/assets/js/v3-chequeo.js` | 21 | 20 |
| `src/consts-v3.ts` | 20 | 19 |
| `src/pages/v3/contacto.astro` | 16 | 13 |
| `src/components/v3/NavV3.astro` | 16 | 16 |
| `src/pages/v3/servicios/[slug].astro` | 15 | 15 |
| `src/pages/v3/blog/index.astro` | 14 | 10 |
| `src/pages/v3/servicios/index.astro` | 14 | 13 |
| `src/pages/v3/trabajo.astro` | 14 | 14 |
| `src/pages/v3/blog/[slug].astro` | 12 | 12 |
| `src/components/v3/FooterV3.astro` | 7 | 6 |
| `public/js/consent-banner.js` | 3 | 0 |
| `src/components/v3/Pieza.astro` | 1 | 0 |
| `src/consts.ts` | 1 | 0 |
| `src/components/v3/Miga.astro` | 1 | 1 |

## Lo que conviene saber antes del paso 3

- **Hojas que pintan dentro de una zona cerrada.** Editarlas cambiaría el hash de esa zona, así que todas sus ranuras quedan `cerrado` (6): «Tu sitio te frena, o no existe» (/v3/servicios/); «Combeau, fotografía · Cliente» (/v3/, /v3/servicios/desarrollo-web/, /v3/trabajo/); «Combeau, modelo · Cliente» (/v3/, /v3/servicios/desarrollo-web/, /v3/trabajo/); «Verifica y Cumple · Producto propio» (/v3/, /v3/servicios/desarrollo-web/, /v3/trabajo/); «Pieza de concepto · no es un cliente Raigal · Implantología» (/v3/, /v3/servicios/desarrollo-web/, /v3/trabajo/); «La pieza de concepto Raigal abierta en un notebook y en un …» (/v3/, /v3/servicios/desarrollo-web/, /v3/trabajo/). Los rótulos y los `alt` de obra de `obra-v3.json` pintan dentro del hero de la home, y `oferta-v3.json#/momentos/0/momento` («Tu sitio te frena, o no existe») va dentro de la línea cerrada del campo Desarrollo, aunque en el índice de servicios sea un h2.
- **R4 incluye `puntos` de Nosotros** («Cómo trabajo»: «Diagnóstico antes que contrato», «Mido si te recomiendan»…), como dice la hoja de voz (§1.2 y §7), aunque la zona `bio` del extractor no los cubra. El rótulo «Cómo trabajo» y «Por qué un solo sistema» quedan abiertos.
- **R3 y R7 cerrados por puntero** (5): «El chequeo es automático y revisa tu sitio. El mi…», «Cada proyecto sigue el Método SpindleLab, nuestro…», «Nuestro método de auditoría SEO + visibilidad en …», «Integra desarrollo web y mantención», «Multi-servicio: todo lo del Pro más volumen de co…».
- **JSON-LD con texto visible desde otra fuente** (105, `espejo_visible`): sobre todo las posiciones del BreadcrumbList, que la plantilla escribe aparte de la miga visible. No cuentan como «JSON-LD que no se ve», pero tienen que cambiar junto con su gemela visible (miga = BreadcrumbList).
- **«Siguiente artículo» + titular** (7 ranuras, una por artículo): el titular es dato cerrado de `_indice.json`; lo único editable es el rótulo de `blog/[slug].astro`, y es el mismo literal en las 7.
- **Pares que cambian juntos:** «Abrir menú» está en el atributo de `NavV3.astro:90` y en el script de `:301`; el cierre del blog es una sola hoja (`paginas-v3.json#/blog/cierre`) que leen `blog/index.astro` y `blog/[slug].astro`; los nombres de servicio viven en `consts-v3.ts`, en `oferta-v3.json` (`n`) y en el h1 y la miga de cada servicio.
- **R2 por patrón que no promete medir:** el veredicto de 70 a 89 de `v3-chequeo.js` («…huecos que te cuestan menciones») y «Autoridad de entidad y menciones externas» (Visibilidad) entran por la palabra «menciones». El encargo define R2 por patrón y así quedaron; la hoja de voz §7 permite arreglar en ellas una regla dura sin tocar la promesa.
- **Lo que no entra al inventario** porque no es de E8 o no se puede tocar: los textos que devuelve `functions/api/chequeo.js` (títulos y detalles de los 21 ítems, avisos y errores), «Enviando…» y el error de `v3-contacto.js`, y el aviso de cookies después de elegir.

## Hojas sin lector

92 hojas marcadas no aparecen en ninguna de las 21 rutas (ni en la extracción ni en el HTML servido). Coinciden con la lista de Diego en lo que es copy (el `slug` y el `canonical` de `paginas-v3.json#/servicios` no se marcaron: no son texto); no se borran porque `[slug].astro` busca las secciones por forma. Ninguna es ranura.

| Hojas | Cuántas |
|---|---:|
| `servicios-v3.json#/visibilidad-en-ia/secciones/*/parrafos/*` | 2 |
| `servicios-v3.json#/auditoria-seo-tecnica/secciones/*/parrafos/*` | 2 |
| `servicios-v3.json#/acompanamiento-mensual/secciones/*/parrafos/*` | 2 |
| `servicios-v3.json#/redes-sociales/secciones/*/parrafos/*` | 2 |
| `servicios-v3.json#/paid-media/secciones/*/parrafos/*` | 2 |
| `paginas-v3.json#/metodo/secciones/*/parrafos/*` | 6 |
| `paginas-v3.json#/diagnostico/lead` | 1 |
| `paginas-v3.json#/diagnostico/secciones/*/bloques/*/…` | 2 |
| `paginas-v3.json#/diagnostico/secciones/*/parrafos/*` | 7 |
| `paginas-v3.json#/diagnostico/secciones/*/h2` | 1 |
| `paginas-v3.json#/contacto/lead` | 1 |
| `paginas-v3.json#/contacto/secciones/*/parrafos/*` | 9 |
| `oferta-v3.json#/momentos/*/planes/*/…` | 29 |
| `oferta-v3.json#/momentos/*/planes/*/puntos/*` | 18 |
| `oferta-v3.json#/tambienPanel/planes/*/…` | 8 |

## Ranuras sin fuente

**Ninguna con texto.** Las que no tienen literal son las que arma la plantilla sin letras propias; van `cerrado` («sin texto propio») y no llevan fila:

- `/v3/blog/#section.d-indice>li:1`: «25 ago 2026 →», generado.
- `/v3/blog/#section.d-indice>li:2`: «16 jul 2026 →», generado.
- `/v3/blog/#section.d-indice>li:3`: «14 jul 2026 →», generado.
- `/v3/blog/#section.d-indice>li:4` (y 2 más): «7 jul 2026 →», generado.
- `/v3/contacto/#§s-pasos>span:0`: «01», generado.
- `/v3/contacto/#§s-pasos>span:1`: «02», generado.
- `/v3/contacto/#§s-pasos>span:2`: «03», generado.
- `/v3/diagnostico/#§s-cam>span:0`: «01», generado.
- `/v3/diagnostico/#§s-cam>span:1`: «02», generado.
- `/v3/metodo/#fases>li:0`: «01», generado.
- `/v3/metodo/#fases>li:1`: «02», generado.
- `/v3/metodo/#fases>li:2`: «03», generado.
- `/v3/metodo/#fases>li:3`: «04», generado.

## Campos de cada ranura en `inventario.json`

`n`, `clave` (la primera; `claves` si hay más), `rutas`, `tipo` (visible, oculto, atributo, head, jsonld, script), `tag` o `attr` o `head`, `aparece_en`, `actual` (el texto como se ve; el espacio duro va como `\u00a0`), `fuente` (`archivo` + `puntero` JSON Pointer, o `ancla` única + `linea`; `parte` si pinta solo un trozo de la hoja), `fuentes` cuando hay más de una, `valor_fuente` cuando la hoja dice otra cosa que lo visible (una tipografía o la plantilla que agrega «Desde», «Ver», «+ IVA»), `toca_jsonld`, `jsonld`, `actual_jsonld`, `zonas`, `estado`, `estados`, `motivo`, `decidido_ref`, `duena`, `parte_cerrada`, `espejo_visible`, `lleva_precio`, `cobertura` y `metodo`. Al final, `hojas_sin_lector` y `resumen`.

## Cómo se rehace

```
git worktree add <scratch>/e8/inventario/wt <commit> --detach
ln -s /home/user/spindlelab/spindlelab-astro/node_modules <wt>/spindlelab-astro/node_modules
cd <wt>/spindlelab-astro && npm run build && cp -r dist <scratch>/e8/inventario/dist-normal
node marcar.mjs <wt>/spindlelab-astro hojas.json && npm run build && cp -r dist <scratch>/e8/inventario/dist-sentinela
python3 -m http.server 8801 --directory dist-normal   # y 8802 con dist-sentinela
node e8/herramientas/extraer.mjs http://127.0.0.1:8801 normal.json --dist dist-normal --esperadas 21
node e8/herramientas/extraer.mjs http://127.0.0.1:8802 sentinela.json --dist dist-sentinela --esperadas 21
node inventariar.mjs <scratch>/e8/inventario /home/user/spindlelab inventario.json
node resumir.mjs inventario.json <scratch>/e8/inventario.json e8/inventario-resumen.md
```
