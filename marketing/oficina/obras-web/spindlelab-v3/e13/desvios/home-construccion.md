# Desvíos de Diego: la home y el marco (obra E13)

26-oct-2026 · Diego. Construí la home en la variante **H-A** de `spec-home.md` y el marco común (encabezado, pie, entidad del JSON-LD). Sin commit mío (el árbol quedó incluido en `21c5a2d1`, que hizo la orquestadora). Todo lo medido sale del `dist/` de `construir.sh diego` (`scratchpad/b-diego/dist`, 28 páginas, sin errores ni avisos de Astro); las herramientas y los números crudos están en `scratchpad/diego-home/` (`criterios.mjs`, `cab-rutas.mjs`, `foco.mjs`, `toque.mjs`, `movimiento.mjs`, `chequeo-propio.mjs`, `og-home.mjs`, `final-log.txt`, `contraste/`).

## 1 · Qué construí

| Archivo | Qué |
|---|---|
| `src/pages/v3/index.astro` | Las nueve secciones en el orden del brief §4, con las clases de la spec. Texto por id de Clara; precios y nombres de servicio comparados con `oferta-v3.json` y `servicios-v3.json` (también todo monto que diga el FAQ); `title` y `description` de `home.json`; JSON-LD con `WebPage` y `FAQPage` armado de los mismos cinco pares visibles; imagen al compartir `og-e12-marca.jpg?v=2` con `home.portada.og-alt`. Salen la cinta, el índice corto, las pruebas con cifras y el `<Chequeo apilado>`. |
| `src/styles/archivo.css` | Solo con `Edit` de texto exacto (el otro Diego editaba el mismo archivo): `.portada-v__accion` (renombra `.portada-v__chequeo`), `.cab__der/.cab__cta/.cab__nav-contacto`, encabezado pegajoso y plegado bajo 834, `.pie-sitio__enlaces`, foco, y retiradas con `grep` previo: `.cinta-s*`, `.destacados*`, `.fila-par`, `.prueba*`, `.ficha-linea`, `.servicio--puerta`, `.servicios__tambien`, `.chequeo--apilado`, `.portada-v__chequeo`. `.pieza` y `.corchete` se quedan (los usa `/v3/trabajo/`). |
| `src/components/a/Encabezado.astro` | Seis ítems y el botón desde `comun.nav.*` (Soluciones, Método, Nosotros, Trabajo, Blog, Contacto + «Pedir la revisión»). Sin botón en `/v3/contacto/`. |
| `src/components/a/Pie.astro` | Fila de hoy + `nav.pie-sitio__enlaces` (Chequeo gratis, Política de privacidad, LinkedIn ↗, Instagram ↗). Correo y política desde `comun.pie.*`. |
| `src/components/a/layout-a.ts` | `description`, `knowsAbout` y `jobTitle` salen de `comun.entidad.*`. |
| `src/data/archivo/interiores.mjs` | Método, nosotros, contacto y diagnóstico vuelven a `/assets/img/og-e12-<ruta>.jpg?v=2`, con `alt` «SpindleLab: &lt;h1&gt;». |
| `public/assets/img/og-e12-{marca,metodo,nosotros,contacto,diagnostico}.jpg` | Regeneradas con el h1 nuevo (plantilla de A, Chrome de la Mac, PIL): 33, 34, 19, 33 y 35 kB. Las miré. No toqué `og-e12-trabajo.jpg` ni las de casos. |
| Borrados (`rm`, tras `grep`) | `src/scripts/archivo/cinta.mjs`, `src/data/archivo/cinta.json`, `public/v3/cinta/` (1.952 kB). |

`layout-a.ts`: la lista `knowsAbout` de Clara (7 ítems, la del v2 aprobado) reemplaza a la de 9 (que sumaba «Diseño web» y «Desarrollo de aplicaciones web»). El `logo` y los favicon quedan.

## 2 · Desvíos de la spec, con su porqué

| # | Qué hice distinto | Por qué |
|---|---|---|
| 1 | **Los seis rótulos mono de sección** (`El problema`, `Método SpindleLab`, `Soluciones`, `Evidencia`, `Quiénes somos`, `Preguntas frecuentes`) **no se pintan.** La plantilla los lee de `home.problema.rotulo`, `home.como.rotulo`, `home.soluciones.rotulo`, `home.pruebas.rotulo`, `home.quien.rotulo` y `home.faq.rotulo` si existen. | El texto de Clara de E13 no les dio id (sí están en `v2-vigente/home.txt`). La spec dice que sin ellos el layout no cambia. **Pedido a Clara:** esos seis ids; si los suma, salen solos, sin tocar la plantilla. |
| 2 | **`.cab__hora` se oculta solo en el encabezado** (`.cab__der .cab__hora`), no en todo el sitio. | El CSS de la spec (`.a-body .cab__hora { display: none }`) también escondía la hora del pie bajo 1194; la spec §3.4 dice que el pie conserva su hora. |
| 3 | **`.portada-v__medio { max-height: 28svh }` solo en pantallas bajas** (`max-width: 833.98px` y `max-height: 740px`) y con `width: 100%`. | Como estaba en la spec, a 768×1024 (28svh = 287, franja 16:9 = 432) el `aspect-ratio` encogía el **ancho** y la franja quedaba a 510 px con negro al lado. Medido y visto. Con la condición de alto, 360×640, 375×667 y 320×568 quedan como mide la spec (30 y 69 px de margen), y 768×1024 da 231, el número de la spec. |
| 4 | **Áreas de toque de los enlaces de texto de las filas** (bajo 834 o puntero grueso): los de la portada, de «Cómo partimos», de los bloques de servicios, de las pruebas y «Ver el método completo» pasan a 44 de alto. Un enlace por párrafo: margen negativo de 13 px en el párrafo (lo que se ve no se mueve). Los bloques de servicios con dos enlaces apilados: 44 cada uno sin margen negativo (sus áreas no se pisan; suma unos 170 px a 390). | El criterio 17 pide ≥ 44 × 44 en «enlaces de las filas» y en el prototipo medían 17 de alto (13 enlaces, medido). |
| 5 | **Pie con el aviso abierto:** `.pie-sitio` gana el mismo relleno de abajo que ya usa `scroll-padding-bottom` (96/136/160/176). | Con el aviso abierto y la página al final, la fila nueva del pie (con la política) quedaba **debajo** del aviso y no se podía alcanzar con scroll ni con Tab (24 enfoques tapados en la primera medición). El relleno desaparece con el aviso. |
| 6 | **Pie bajo 834:** 4 px de aire sobre la fila de enlaces y `#cookie-preferencias` sin los márgenes negativos del correo dentro de esa fila. | Las áreas del correo y del botón «Cookies» pisaban 3 px las de la fila de abajo (medido a 360, 390, 768). Ahora 0 solapes. |
| 7 | **Flecha de los enlaces de texto con 4 px a la izquierda** (`.servicio__precio`, `.fase__der`, `.int-lista__pie`). | Sin margen quedaba pegada al texto («técnica→»); es el valor de `.datos-fase` y `.pieza__nombre`. |
| 8 | **Texto de los enlaces: el de Clara** («Ver Auditoría SEO técnica», «Ver Verifica y Cumple», «Conocer a Ramón»), no los nombres sueltos del prototipo de la spec. | Regla de la obra: el texto sale de sus ids. Los guardianes comparan «Ver &lt;nombre de oferta&gt;» con el JSON. |
| 9 | **Fila 4 de las pruebas lleva el aviso** `home.pruebas.propio.aviso` («No es asesoría legal ni certifica que cumples.») como `p.chico` bajo el enlace. | La spec no lo ubica; Clara dice «va junto al enlace a Verifica y Cumple». Suma una línea y 16 px (la fila mide 1.769 contra 1.713 de la spec). `home.pruebas.pie-verifica` no se usa: ninguno de los dos medios lleva persona generada. |
| 10 | **Título de la fila 5:** «Un caso real: Bernardo Combeau, fotógrafo» (Clara), no «Un caso real: Bernardo Combeau» + «Fotógrafo.» en el cuerpo. | Es el texto vigente. Baja a dos líneas en la columna de título. |
| 11 | **Pie sin `comun.pie.marca` ni `comun.pie.copy`.** | `desvios/home.md` de Clara dice que el pie las trae; la spec §3.4 no las dibuja ni las midió (el pie ya suma 42 px a 1440 y 112 a 390). Conservador: no agregué lo no medido. Si Mauro quiere la línea de marca o el © en el pie, se suma una `p.chico` y se vuelve a medir el pie. |
| 12 | **Rótulos del pie «Chequeo gratis», «LinkedIn», «Instagram» escritos en `Pie.astro`.** | Están en la spec §3.4 y no tienen id en `comun.json`. Pedido a Clara si quiere que vivan allá. |
| 13 | **Los h2 llevan `<span class="tinta">`** (una sola tinta; solo el cierre trae tinta y gris). | `home.json` entregó h2 sin `gris`, como avisó Clara. |

## 3 · Criterios de `spec-home.md` §6 (medido sobre el `dist/`)

| # | Resultado |
|---|---|
| 1 | Botón en la primera pantalla, entero y sin nada encima (5 puntos con `elementsFromPoint`), con y sin aviso. **Margen con aviso:** 360×640 **30** · 360×800 167 · 375×667 69 · 390×844 213 · 414×896 251 · 768×1024 231 · 834×1112 52 · 1024×768 53 · 1194×834 72 · 1440×900 55 · 1920×1080 55. Sin aviso entra en los 11. **320×568 con aviso: falla** (-22 px, 3 de 5 puntos tapados), la excepción que dice la spec; sin aviso entra (131). |
| 2 | `portada-lucia.mjs` + `contraste-portada.py` (121 cuadros, 12 tamaños): **0 líneas bajo 4,5:1**; peor 5,37:1 (entradilla a 1194×834); bajo 834, 7,02:1; sin velo 1,11 a 1,40:1; α del velo 0,876; contorno del botón 16,0 a 20,3:1. |
| 3 | 1 `h1`, 8 `h2`, sin saltos de nivel. |
| 4 | `FAQPage` con 5 preguntas, cada `name` y `text` igual al visible carácter por carácter. |
| 5 | Altura (scrollHeight tras recorrer): 1440 **6.597** (tope 7.000, hoy 8.365) · 1024 **6.692** (7.300) · 768 **8.391** (8.800) · 390 **7.879** (8.200, hoy 8.540). Otros: 320 8.287, 360 8.039, 834 6.899, 1194 6.465, 1920 7.153. |
| 6 | `a.cab__cta[href="/v3/contacto/"]` presente, visible, de 44 de alto, sin desborde de la fila, sin `aria-current`, plegado y sin plegar, en las **22 rutas** salvo `/v3/contacto/` (donde no existe), a 360, 390, 768, 834, 1024, 1194 y 1440; bajo 834 plegado a scroll 400, 2000 y 5000: caja dentro de los 64 de arriba. **440 comprobaciones, 0 fallas.** Medidas del encabezado iguales a las de la spec (p. ej. 834: nav 173 a 591, botón 668 a 818; plegado 185 a 603 y 656 a 806, hueco 53; 1194 plegado: hora 838 a 976, botón 1016 a 1166). |
| 7 | Los tres `a.boton--claro` (barra, portada, cierre) van a `/v3/contacto/`. |
| 8 | Tab hacia adelante y hacia atrás, 390×844 y 1440×900, con y sin aviso: **288 enfoques, 0 tapados** por el encabezado ni por el aviso, todos con contorno de 2 px. Son 8 los que no son blancos: el botón «Cookies» del pie, con contorno gris `#989898` (7,0:1 sobre `#060606`, pasa 3:1); lo pone `consent-banner.js` con `currentColor` y no se toca. |
| 9 | `scrollWidth == innerWidth` y 0 elementos pasados del ancho a 320, 360, 390, 768, 834, 1024, 1194, 1440 y 1920. |
| 10 | Peso a 1440 con movimiento, recorriendo: **1.541 kB** (tope de la spec 1.600) · primera carga **1.382 kB** (1.400) · sin movimiento 540 kB · a 390 sin recorrer **754 kB** (950). **Contra el brief literal (< 1,5 MB) la recorrida pasa por 5 kB** (1.541 contra 1.536); la spec §10.2 propone leerlo como ≤ 1,6 MB. No maquillé nada: es el video completo de la portada (1.002 kB). |
| 11 | Un campo de color: `verifica-y-cumple-12-169` (familia 0,96). 747×420 sobre 1440×6.597 = **3,3 %**; seguidos 1; fuera de la sección 6, 0 (`combeau-fotografia-169` y `ramon-vallejos-34` no son campo). |
| 12 | Dorado (tono 30 a 60°, S ≥ 0,45, V ≥ 0,45): póster de la portada 3,61 %; los tres medios 0,00 %; `archivo.css` sin tono de esa familia (solo un comentario dice «hilo de oro»). |
| 13 | A 390×844, 360×640 y 768×1024: rótulo, h1, botón, microcopy, enlace y entradilla en ese orden a la vista; el DOM va rótulo, h1, entradilla, acción. |
| 14 | `dist/` sin `v3/cinta/`, sin `cinta` en `_astro/` ni en el HTML de la home, sin `#chq-*` ni `v3-chequeo.js` en la home. `public/v3` (`du`): **26.517 kB en `HEAD~1` a 8.540 kB** (8,3 MiB, tope 9 MB). De eso, 1.952 kB son de mi parte (la cinta); el resto del recorte (trabajo de Praxi y de los conceptos, medios sin uso) lo hizo el otro Diego. |
| 15 | Nueve secciones, en el orden de la spec (h1 de la portada y 8 h2). |
| 16 | `prefers-reduced-motion: reduce`: el video no arranca (0 fuentes cargadas), la pausa dice «Seguir el video» con `aria-pressed="true"`, la placa pasa a opacidad 1 en menos de 20 ms y sin transición ni resorte. Control sin reducción: el video corre, la placa tarda (resorte desde 834, 167 ms lineal bajo 834). |
| 17 | Home, a 360, 390 y 768: **0 controles menores de 44 × 44** (33 controles) y 0 solapes de áreas. Fuera de mi área, en las otras rutas: 3 enlaces de `datos-fase` en `/v3/metodo/` miden 17 de alto, y en `/v3/contacto/` la política y el envío se pisan 1 px; los enlaces de fila de `/v3/servicios/` y `/v3/blog/` miden 29 a 30 por su texto y se estiran con `::after` (no medí esa área). |

Del brief §7: criterio 2 (`verificar.mjs` sin hallazgos a 390, 768 y 1440, 22 rutas de `/v3/`), 3, 5 (barrido de la home: 0 hallazgos en 55 archivos, incluida la búsqueda de rayas largas y medias; «agentes de IA» solo en «Quién está detrás»), 7 (UTM: los 4 recorridos llegan con los tres campos llenos), 9 (chequeo propio sobre el build local: **94**, contra el 83 del 16-oct; solo falla `sameAs`: el nodo `#org` de `Layout.astro` declara 2 perfiles y el chequeo pide 3; no es de la home) y 11.

## 4 · Qué quedó abierto

1. **Seis ids de rótulos de sección a Clara** (desvío 1). Es lo único del texto que falta.
2. **Peso:** si Mauro quiere el «< 1,5 MB» literal, faltan 5 kB sobre el video entero. Lo declaré; no toqué el video ni las fuentes.
3. **320×568 con aviso abierto:** el botón queda bajo el aviso (excepción de la spec; fuera de los anchos de la obra).
4. **`Chequeo.astro`** conserva la prop `apilado` y ya nada la usa (es de otro rol); `v3-chequeo.js` solo se carga en `/v3/diagnostico/`. `.marca-medio` (la placa de la cinta) quedó sin uso en `archivo.css`; no estaba en la lista de retiro de la spec y la dejé.
5. **Pie:** ¿línea de marca y © (`comun.pie.marca`, `.copy`)? y `/privacidad/` abre con el diseño anterior (no hay versión v3), como ya anotó la spec.
6. **`servicios/[slug].astro:147` y `blog.mjs:36`** siguen usando `comun.nav.escribenos` (lo dijo Clara); por eso el id sigue en `comun.json`.
7. **Judgments de Ramón que ya estaban abiertos en `desvios/home.md` de Clara** (los 13 puntos) siguen valiendo; esta fase no cambia ninguno.
8. **Lo que no medí:** la lectura en frío (criterio 4 del brief), el anti-slop completo y la QA de Javiera (van en subagente limpio), y el área de toque real de los enlaces de fila que se estiran con `::after` en servicios y blog.
