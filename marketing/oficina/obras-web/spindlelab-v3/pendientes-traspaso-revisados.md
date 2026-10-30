# Pendientes del traspaso viejo, revisados contra la rama vigente

**Fecha:** 10 y 11-oct-2026 · **Rama revisada:** `claude/magical-franklin-ckfki2` (70f1343)
**Pedido de Ramón:** *«queda el actual, trae los documentos y revisa los pendientes»*, y después
*«te paso lo de la sesión antigua por si hay algo del trabajo que se pueda rescatar»*.
**Detalle ítem por ítem, con evidencia:** `pendientes-traspaso-detalle.md` (misma carpeta).
**Al día al 30-oct-2026:** el estado de la obra E13 con lo que Ramón eligió el 30-oct está en la sección «30-oct», justo
abajo; donde choque con §0, manda esa. **§0** es el estado al cierre de E12 (23-oct). Lo de §1 a §4 es la revisión del 10
y 11-oct, con sus «Estado al…» de cada fecha; donde choque con §0, manda §0.

## 30-oct-2026 · Estado de E13 con los cambios del 30-oct (Mauro, cierre del día)

> **Al cierre del 30-oct (tarde):** Ramón contestó las cuatro preguntas y dio su visto a `Layout.astro`, por escrito en la
> conversación con la orquestadora (A1, B1, C1, el panel en todos los planes de Desarrollo web sin tocar un importe, el
> plural, 7A; los botones con texto propio y lo que no frenaba, como estaban); Clara `0f5bf988`, Diego `284757fb`,
> **Javiera vuelta 3 «Aprobado»** `12d327c2` (0 bloqueantes, 0 mayores; home 1.398,8 kB); capturas de cierre y lista de
> publicación al día (Mauro, este commit); **nada publicado y el corte sin armar**; antes de armarlo, solo falta que Ramón
> confirme o cambie la segunda oración de A1 («Para escribirlo trabaja con agentes de IA dentro del equipo», 3 de 3
> lectores tropiezan), y el día del corte el sitemap con esa fecha y la ficha del boletín 18.623-07 releída
> (`e13/lista-publicacion.md`, «30-oct, tarde»). Lo de abajo es el estado de la mañana.

**Dónde está.** El sitio nuevo vive en la raíz de `spindlelab-astro/` en la rama `claude/magical-franklin-ckfki2`: la
obra E13 (aprobada por Javiera el 26-oct) más lo que Ramón eligió el 30-oct sobre `e13/copy/maquetas-30oct/`. Último
cambio del sitio en `4d794419`; acta de QA en `0d9bce8a`. **Nada está publicado**: `main` sigue en `840dc024` sin nada
de esto, y la rama del corte del 26-oct (`claude/v3-publicacion`, `2895a0ce`) lleva la E13 del 26-oct sin lo del 30-oct.

**Qué se hizo el 30-oct** (cada rol en su commit): Clara pasó al texto lo decidido (`1bc62e5a`); Lucía especificó y midió
el amarillo de acción, la sección 2 y la portada nueva (`790f63a0`); Bruno terminó el logo de la i con su disco con
favicon, iconos, avatar y documentos (`ed2a52c7`); Diego lo construyó (`a84a1381`) y cerró la vuelta 1 de la QA con lo de
los tres (`4d794419`). Resumen para Ramón, en lenguaje simple: `e13/resumen-30oct.md`.

**Veredicto de Javiera** (`e13/acta-qa-30oct.md`, dos vueltas en contexto aparte): **Aprobado con reparos.** Vuelta 1: 0
bloqueantes, 3 mayores, 12 menores. Vuelta 2: cerrados los mayores 1 (peso de la home, 1.398,9 kB contra el tope de
1.400) y 2 (las 22 imágenes al compartir con el logo nuevo) y los menores 4 y 8 a 15; **abiertos el mayor 3 y los
menores 5, 6 y 7, que dependen de Ramón**; ninguna regresión y ningún defecto nuevo.

**Cierre del día (Mauro):** build de `0d9bce8a` en una copia (22 páginas, sin errores ni avisos), `extraer-texto.mjs
--comprobar` 16 de 16 «igual», `verificar` sin hallazgos a 390 y a 1440, y las capturas finales en
`e13/capturas-30oct/` (las 22 rutas a 1440 × 900 y 390 × 844, la home y `/contacto/` enteras y dos hojas; 48 de 48 sin
errores de consola, pedidos fallidos ni desborde, un `h1` cada una; miradas). `e13/lista-publicacion.md` puesta al día
(sección «30-oct»), sin ejecutar el corte.

### Antes de publicar (cada uno con su dueño)

| # | Qué | Dueño | Cómo se da por cerrado |
|---|---|---|---|
| 1 | **Las cuatro preguntas** de `e13/desvios/construccion-30oct.md` §6: las tres frases donde tropiezan los lectores («agentes de IA», el rótulo, «sin plantillas ni WordPress»: mayor 3), si todo plan de Desarrollo web trae panel (menor 5), el «yo» de «Probado primero en lo nuestro» (menor 6) y la lista dicha dos veces (menor 7) | **Ramón** contesta; **Clara** lo pasa al texto | Su respuesta escrita, o su «publicar como está» por escrito. **Cerrado en la tarde** (ver arriba) |
| 2 | **QA exprés** de lo que cambie con esas respuestas: `extraer-texto.mjs`, build, `verificar` a 390 y 1440, **peso de la home** (`peso-30oct.mjs`; queda 1,1 kB de margen) y una lectura en frío de la home | **Javiera** | Su visto en `e13/acta-qa-30oct.md`. **Cerrado: vuelta 3, «Aprobado»** |
| 3 | **El permiso por escrito de haber tocado `Layout.astro`** (solo las dos hojas de letras sin uso; gtag, consentimiento y Pixel idénticos, medido por Javiera) | **Ramón** | Su visto. **Cerrado: por escrito el 30-oct en la tarde** |
| 4 | **Rearmar el corte** desde la rama de la obra, con el sitemap fechado el día de publicar y los dos documentos del 30-oct (`e13/lista-publicacion.md`, sección «30-oct» y receta) | Quien publique, con la lista | La sección 3 de la lista, con 3.13 a 3.15 nuevos |
| 5 | **La Ley 21.719 el día de publicar:** releer la ficha del boletín 18.623-07 y la frase de `/diagnostico/` (exacta al 30-oct) | **Clara** y quien publique | Paso 3.11 de la lista |
| 6 | **El `dateModified` de los siete artículos** (hoy 26-oct; el 30-oct les cambió el botón del cierre, la firma y la imagen al compartir, no el cuerpo) | **Simón** | Que suba o que quede, escrito; el sitemap lo hereda |

### Lo que Ramón puede confirmar o devolver (no frena)

«visitarlo y entenderlo», la ayuda del campo del sitio, el asunto «Hablemos de mi sitio», la description de 157
caracteres, el `h1` de `/nosotros/` y el gris del de `/contacto/`, que «el código de cada entrega lo revisa y lo aprueba
él» valga para clientes, «una aerolínea regional», los dos hechos de Clara (dominio a nombre del cliente y entrega del
código), los botones con texto propio de `/metodo/`, `/diagnostico/` y los servicios (Clara), el largo de la home (Lucía)
y el avatar redondo para redes (Bruno). Todo con su detalle en `e13/resumen-30oct.md`.

### Lo que se movió de §0.2 (23-oct), con su evidencia de hoy

| §0.2 | Estado al 30-oct | Evidencia |
|---|---|---|
| 2 · La línea «También: Paid Media…» | Sin objeto: la home se rehízo en E13 | 0 apariciones en el `dist` de `0d9bce8a` |
| 3 · R1, la ruta | Raíz, valor usado en E13; lo confirma Ramón con su OK al PR | `e13/lista-publicacion.md` §1, fila 2 |
| 4 · La lista de publicación | Rehecha sobre E13 (26-oct, ensayada) y puesta al día hoy | `e13/lista-publicacion.md` |
| 5 · El cargo de Ramón | **Cerrado:** «Fundador de SpindleLab: sitios web a medida y marketing con IA», lo eligió Ramón el 30-oct | Javiera, vuelta 2: uno solo en las 22 rutas |
| 6 · Primera persona en `/nosotros/` | **Cerrado:** tercera persona, por decisión de Ramón el 30-oct | `e13/texto/nosotros.json`; acta del 30-oct |
| 7 · «Con agentes de IA» en Paid Media | Sin objeto en Paid Media; la frase vive en la home y `/nosotros/`, y es el mayor 3a | `agentes de IA` solo en `/` y `/nosotros/` del `dist` |
| 8 · R2, la cadencia | Informe mensual, valor usado en E13 | 0 «quincenal» en el `dist` |
| 9 · R9, los cuatro conceptos | Sin objeto: salieron del sitio en E13 | 0 «Tonela» y 0 «Praxi» en el `dist` |
| 10 · Criterio 13 (lectura en frío) | Reemplazado por las lecturas de E13 y del 30-oct: hoy es el mayor 3 | `e13/lectura-fria/30oct-v2/` |
| 14 · El favicon en Safari y en un iPhone | **Sigue abierto**, ahora con el logo nuevo | Nadie lo vio (acta del 30-oct, «Lo que no pude medir») |
| 15 · La fecha de la Ley 21.719 | Calificada en `/diagnostico/`; se relee el día de publicar | Paso 3.11 de la lista |
| 16 · R8, `/privacidad/` | **Sigue abierto:** dos `h1` y diseño del v2; el corte solo le cambia iconos, enlaces y la línea de marca | Acta del 30-oct, vuelta 2 |
| 1, 11, 12 y 13 | **No los re-verifiqué hoy** (el área de toque de «Cookies», el visto de Simón a §2.7, las confirmaciones de E8 y R7, lo que la QA de E12 no midió) | |

### Para la troncal (no lo edito yo)

- La línea de la casa cambió a «Sitios web a medida y marketing con IA»: el outbound y las bios de LinkedIn siguen con
  «Marketing y crecimiento con IA para empresas que ya venden» (Clara, `e13/desvios/texto-30oct.md` §5).
- El avatar y los documentos con el logo nuevo están en `e13/logo/avatar/` y `e13/logo/documentos/`; subirlos a redes es
  de la troncal, después de que Ramón vea lo del avatar.
- El sitio dice «revisión» y «un día hábil»; los correos de outbound, «diagnóstico gratis» y «24 horas» (ya anotado el
  26-oct en la lista, §5).
- **(30-oct, tarde)** La skill `cotizaciones` pone el panel entre lo que «cambia el precio»; Ramón dijo que todos los planes
  de Desarrollo web lo traen. Va como encargo, con lo de arriba, en
  `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` §7. La skill no la edito yo.

## 0 · Al cierre de E12 (23-oct-2026, 17:00 Chile · Mauro): el estado y lo que queda

**La obra E12 está cerrada con reparos.** El sitio v3 sobre **A · Archivo** está construido en `spindlelab-astro/`
(27 rutas bajo `/v3/`, con `noindex`, rama `claude/magical-franklin-ckfki2`, último cambio de código en `f2fe7b4`).
La QA de obra la hizo Javiera en contexto limpio (`e12/acta-obra.md`): **vuelta 1 Rechazado** (cuatro mayores y cuatro
menores) y **vuelta 2 Con reparos** (`f3044fc`): los ocho cerrados y medidos con las mismas herramientas, y dos menores
nuevos, el 9 y el 10, que se cierran antes de publicar. Las dos compuertas quedaron por escrito (16 y 19-oct) y **nada
aprobado se reabrió**. Las capturas de cierre, 27 rutas a 390, 768 y 1440 desde el build, están en `capturas/e12/`
(`3ae1b8b`; revisadas de nuevo hoy: las tres hojas, la home entera a 1440 y Praxi entero a 1440, sin nada roto). Nada se
publicó y nada fue a `main`. Registro: la fila del 23-oct (cierre) en el §7 de `spec-visual.md`.

### 0.1 · Lo que E12 cerró (no se vuelve a abrir)

| Qué | Cómo quedó | Dónde está |
|---|---|---|
| **La pregunta del `Layout`** (spec §0.5) | **Cerrada el 19-oct, 11:44:** Ramón contestó «Sí, agrégalas». Cinco props opcionales (Lenis, letras precargadas, `theme-color`, favicon, `#org`/`jobTitle`), con el valor por defecto de antes y solo para `/v3/`. Las páginas publicadas salieron iguales byte a byte en cada tanda y en las dos vueltas de la QA; gtag, consentimiento y Pixel, sin cambios. El texto de §0.5 es anterior a la respuesta: manda la fila del 19-oct del §7 | `0cb13d5`; `e12/insumos-ramon-19oct.md` §5; `desvios.md`, tanda 1 §1; acta, vuelta 2, fila 5 |
| **R5, en lo que tocaba el `Layout`** | En `/v3/` se precargan solo Google Sans Flex y DM Mono (Inter, Gabarito y Manrope ya no); `theme-color` `#060606`; favicon El huso con `?v=5`; `#org` con lo de Simón. Queda el cargo de Ramón (0.2, punto 5) | `src/components/a/layout-a.ts` |
| **R6, el paquete del hero de driftime** | **Sin objeto:** la home es otra (hero 3, la portada del hilo de oro, la cinta y el muro, con cada entrada enlazada a su caso) | brief, «Compuerta 2», punto 3 |
| **R9, Raigal** | Salió del índice y pasó a archivo con Aplomo y Deslinde. Lo que queda de R9 son los cuatro conceptos (0.2, punto 9) | `insumos-ramon-19oct.md` §3 |
| **Los ocho defectos de la vuelta 1** | Cerrados y medidos en la vuelta 2: el chequeo local da 83 como el 16-oct, «Concepto» a la vista sin scroll en 64 de 64, Auditoría sin franja, el aviso de cookies sin tapar el chequeo en ningún tamaño, el tope de 493, cero `lazy` en la primera pantalla, las áreas de toque del pie y los tres `title` | acta, vuelta 2 |
| **Lo declarado por Diego que se resolvió después** | El aviso que tapaba el chequeo en el teléfono (tandas 2 y 3) es el defecto 4; la franja de Auditoría (tanda 4 §8.2), el defecto 3; los enlaces a casos que daban 404 (tanda 2 §12.2), construidos en la tanda 3 | `desvios.md`; filas del 23-oct del §7 |

### 0.2 · Antes de publicar (cada uno con su dueño; sin esto no hay corte)

| # | Qué | Dueño | Cómo se da por cerrado |
|---|---|---|---|
| 1 | **Defecto 9 (menor):** bajo 834, el área de toque de «Cookies» del pie (`#cookie-preferencias`) baja sobre la línea de la hora: el 9 % del área no responde a 360, el 6 % a 390 y el 3 % a 414, y el contorno de foco cruza el texto de la hora | **Diego** | «Cookies» crece hacia arriba como antes, o la hora baja. `pie-cookies.mjs` con el 100 % propio a 360, 390 y 414, y `foco.mjs` a 390 sin «tapado p.cab__hora» |
| 2 | **Defecto 10 (menor):** la línea «También: Paid Media…» de la home corre desde 1194 más ancha que el tope (567, 676 y 911 px; unos 120 caracteres por línea a 1920) porque **la spec se contradice**: §1.3 pone el tope de 493 «en todos los anchos» y §2.1, fila 5, la pone «en una línea de cuerpo con sus precios, en c5–c12» | **Lucía** escribe cuál manda (el tope también desde 1194, o la excepción en §0.3 con su porqué) y su fila en §7; **Diego** construye lo que cambie | `tambien.mjs` con el ancho que diga la spec |
| | *Los dos se comprueban en exprés* | **Javiera** | Con sus herramientas de `e12/qa-obra/vuelta-2/herramientas/`, sin otra vuelta completa (acta, vuelta 2, veredicto) |
| 3 | **R1, la ruta de publicación** (raíz o prefijo, qué pasa con las rutas v2 y cuándo) | **Ramón** | Su respuesta escrita. Frena publicar, no frenó construir |
| 4 | **La lista de publicación, rehecha sobre E12.** `lista-publicacion.md` (13-oct) describe el v3 de driftime (11 plantillas, 21 rutas, ensayada sobre `1b064bf`) y **no se ejecuta tal cual**. Lo que cambió, medido hoy en el build: 12 plantillas (se suma `trabajo/[caso].astro`); 27 rutas (se suman `/trabajo/` y sus seis casos); las cuatro maquetas (`a`, `b`, `c`, `maqueta-inicial`) siguen en el build, con `noindex` (33 páginas = 27 + 4 + las 2 v2); `public/v3/` pesa 27 MB en 156 archivos (los videos del hilo y de los casos, y `/v3/marca/` con El huso); las cinco props del `Layout`; `driftime.css`, `components/v3/` y `consts-v3.ts`, que se van al publicar y cambian el CSS de las páginas publicadas, así que la línea base `e12/construccion/base-dist/` se rehace; el `sitemap.xml` (20 URL hoy, ninguna de `/trabajo/`); `llms.txt`, que todavía presenta la casa como «agencia de marketing con IA»; y el `dateModified` de la home, que sale del reloj del build | **Diego** la reescribe y la vuelve a ensayar en un worktree desechable, como el 13-oct; **Simón**, las señales del corte (sitemap, `llms.txt`, canonical); **Mauro** la encuadra | El ensayo de punta a punta, con lo que no se pudo ensayar marcado, y `npm run verificar` sin hallazgos sobre el resultado |
| 5 | **El cargo de Ramón.** En `/v3/`, el `jobTitle` de `#autor-ramon` es la propuesta de Simón, «Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad en IA», y la firma de los artículos espera lo mismo (`desvios.md`, tanda 1 §1 y tanda 5 §8.3). Si cambia, cambia en la home, en Nosotros y en la firma de los siete artículos | **Ramón** confirma | Su respuesta; Diego la aplica en `layout-a.ts` y en la firma |
| 6 | **Los textos en primera persona de `/nosotros/`** y la bio (lo que era R4) | **Ramón** | Su lectura; Clara aplica |
| 7 | **«Con agentes de IA» en Paid Media**, cuatro veces, sin fila en el inventario (`desvios.md`, tanda 4 §8.5) | **Ramón** (si es verdad, Diego le abre la fila; si no, Clara lo saca) | Fila en el inventario o el texto fuera |
| 8 | **R2, el monitoreo y su cadencia**, sigue a la vista en `/v3/`: «Informes quincenales» en `/v3/metodo/`, «quincenal» en el JSON-LD de Redes sociales y en la página de Acompañamiento mensual, desde `servicios-v3.json` y `oferta-v3.json` (medido hoy en el `dist/`) | **Ramón** | Su respuesta; el anexo A de `e8/copy-secciones.md` trae el texto de cada lugar para cada respuesta |
| 9 | **R9, ahora los cuatro conceptos** (Tonela, Ocelo, Sesenta y Doceavo) | **Ramón** los revisa antes de que `/v3/` le llegue a un prospecto | Su visto, escrito |
| 10 | **El criterio 13 del brief, corrido en este cierre sobre el sitio construido** (`e12/cierre/criterio-13/lectura.md`): tres lectores fríos de E11, cada uno en su conversación aparte, leyeron la home y el caso de Praxi sacados del `dist/`. **No se cumple entero:** los tres dicen qué hacemos y para quién, entienden que también hacemos SEO técnico y visibilidad en IA (pero recién en Servicios, no en la primera pantalla) y los tres probarían el chequeo; **los tres tropiezan** con términos sin explicar, sobre todo arriba: «SEO técnico» y «visibilidad en IA» en la entradilla, qué es que Google o ChatGPT «lean» un sitio, «ESTUDIO DE DISEÑO Y TECNOLOGÍA» y «Mira 21 cosas». No es defecto de construcción: el sitio lleva el texto de Clara tal cual | **Clara** propone (los puntos 1 a 13 de la lectura, la primera pantalla primero); **Ramón** decide en su lectura de aprobación; **Lucía y Clara**, qué entradas lleva el índice corto de la home (dos de tres no vieron su rubro) | El texto corregido en el JSON, Diego lo vuelve a sacar, Javiera lo comprueba en exprés y, si cambió la primera pantalla, se vuelve a correr la lectura con `criterio13-texto.mjs` y `criterio13-lector.py` |
| 11 | **El visto de Simón a `senales-obra.md` §2.7**, que Clara editó el 23-oct (solo la mayúscula de tres `title`; los largos no cambian) | **Simón** | Su visto en la fila del 23-oct de `senales-obra.md` |
| 12 | **Las confirmaciones de E8 y R7, re-ubicadas.** Las diez de `e8/e8-antes-despues.md` y los puntos de R7 se escribieron sobre el texto de driftime; el de E12 es otro (`e12/texto/texto-obra.json`). No las re-verifiqué una por una | **Clara** dice cuáles siguen teniendo objeto antes de la lectura de aprobación de Ramón | Una lista corta, con cada punto en su lugar nuevo o marcado sin objeto |
| 13 | **Lo que la QA no midió:** el muro al pasar el mouse, el filtro del índice, las fuentes de 960 px y el CLS del muro (acta, vueltas 1 y 2) | **Javiera** o **Diego**, en la verificación antes del merge | Medido y anotado |
| 14 | **El favicon en Safari y en la pantalla de inicio de un iPhone real**, que no se vio (`e12/logo/final/README.md`) | **Ramón** con su teléfono, o una sesión local del Mac | Una captura |
| 15 | **La fecha de la Ley 21.719 el día del corte.** La portada de Verifica y Cumple que muestra el muro dice que se aplica desde el 1-dic-2026: si se publica después, la entrada queda en pasado | **Clara** y **Diego** | Mirado el día del corte |
| 16 | **R8, `/privacidad/`** (dos `h1` y dos textos bajo AA, en producción). `/v3/` la enlaza desde el aviso de cookies y no tiene versión propia; en esta obra no se tocó porque estaba protegida | **Ramón** autoriza el arreglo de marcado (sin tocar el texto legal) | `npm run verificar` limpio en `/privacidad/` |

### 0.3 · Declarado y abierto, que espera a Lucía o a Clara (no bloquea publicar)

Lo dejó escrito Diego en `desvios.md` y Javiera lo listó en el acta (vuelta 1, «Cumplimiento de la spec») para que no se
perdiera. No son defectos: son casos que la spec no cubría y que Diego resolvió con la solución mínima.

- **Lucía:** el `favicon.svg` declarado (spec §5.4) contra el README de Bruno, que recomienda no declararlo (a 16 px pinta
  26 píxeles grises contra 10 del dibujado a mano); los casos sin pie y por eso sin el botón de cookies, y el pie de A sin
  enlace a `/privacidad/`; la portada de spindlelab.cl en el muro (va `/privacidad/`, porque la de la home es el hilo de
  oro) y la captura de Praxi en «Cada pieza» (van sus números, como dice la spec); en Praxi y Combeau a 390, la ficha
  bajo la barra flotante; Tonela con la misma captura dos veces a 390 y la foto en 4:5; el alt y el recorte de la franja
  de Visibilidad en IA; y la nota 1 de Javiera: con el aviso abierto, los últimos controles de algunas páginas quedan
  bajo el aviso y la barra hasta que la persona elige (se cierra, si lo quiere, con `--a-alto-aviso` en el relleno de
  abajo).
- **Clara:** los botones del chequeo con dos textos («Revisar mi sitio gratis» y «Correr el chequeo»); `/nosotros/` sin
  preguntas (no hay dato); y el error del chequeo vacío, que dice «Escribe tu dominio para empezar.» porque vive en
  `v3-chequeo.js`, protegido en esta obra (el cambio necesita su fila en la spec y el permiso de tocar ese archivo).
- **Al publicar:** Lenis queda inerte en `/v3/` y no «sin crearse», porque con las publicadas byte a byte no se podía
  (`desvios.md`, tanda 1 §2); cuando el `Layout` deje de servir a las páginas v2, se resuelve. El video del inicio de
  Praxi mide 568 × 320 y a 390 se ve blando: no hay otro.
- **Para quien compare builds** (nota 3 de Javiera): el HTML de `/v3/` cambia cada día por el `dateModified` del build.

### 0.4 · Cuando haya plata o material (no frenan nada)

- **La generación para los conceptos:** 9 fotos y 2 clips (`marketing/portafolio/plan-e12.md` §11), unos 75 créditos;
  el costo lo pone el plan, **USD 49 por un mes de Higgsfield PLUS**. Ramón: «cuando tenga plata vamos con lo faltante».
  Nada se genera sin su OK. Lo hace Bruno con su pauta.
- **Las pantallas internas de Praxi:** el caso las muestra como hueco nombrado, punteado, porque en los repos no hay
  capturas de la app con sesión iniciada. Entran si Ramón sube las de su carpeta «PRAXI siembra» de iCloud; Diego las
  recorta con las reglas del caso (sin datos de una persona) y Clara les escribe el pie.
- **Lo propuesto que no entró:** el giro de la tortera (Bruno, `e12/logo/final/movimiento/`) y la variante v8 del huso,
  por si Ramón prefiere que nunca se lea seta aunque se lea daga.

### 0.5 · Para la troncal

- **El manual de marca nuevo:** `marketing/encargos-otras-sesiones/encargo-manual-marca-e12.md` (la letra, los colores
  con su rol y contraste, El huso con sus archivos y cortes, lo que dejó de regir y lo que decide con Ramón).
- **El giro sigue abierto en sus documentos** (estrategia, fichas, bios, outbound, la ficha de Bernardo y la de Praxi):
  `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md`.
- **D43, B26 y B27** (§3): sin cambios desde el 11-oct; no los re-verifiqué.

### 0.6 · Lo que esto le hace al resto de este documento

- **§1:** R1 sigue abierta y frena publicar. R5 quedó cerrada en lo que tocaba el `Layout` y abierta en el cargo. R6 sin
  objeto. R9 pasó a los cuatro conceptos. R2 sigue a la vista (medido hoy). R3, R4, R7 y R8 no cambiaron de fondo y **no
  las re-verifiqué ítem por ítem** en este cierre: antes de tomar cualquiera, se comprueba contra el build de ese día (la
  lección del 10-oct: tres «pendientes» estaban hechos hacía rato).
- **§2:** E1 a E8 se cerraron sobre el build de driftime, que E12 reemplazó en todas las rutas de `/v3/`. Lo que sigue
  vivo de ellos está en 0.2 y 0.3; E7, la lista de publicación, se rehace (0.2, punto 4).

## Qué se revisó y cómo

La sesión antigua dejó `marketing/encargos-otras-sesiones/traspaso-rediseno-v3-10oct.md` con
44 pendientes comprobados (§6) y 50 pistas sin comprobar (§7). Los escribió sobre su rama,
que quedó en el estado del 30-sep, así que sus rutas y cifras describen un sitio anterior a la
reconstrucción. Se sumó un ítem, X01: la URL de Verifica y Cumple, porque el traspaso y esta
rama decían cosas distintas.

- **Cada uno de los 95** pasó por un verificador que lo comprobó en la rama vigente (código, el
  sitio compilado servido en local, mediciones con Chromium) y después por un escéptico que
  intentó tumbar el veredicto con su propia evidencia. El escéptico corrigió 11 de 95.
- **Rescate:** el v3 de la sesión antigua se compiló y se comparó con el vigente en las 21 rutas
  y en las fuentes y los documentos. Salieron 85 diferencias. Un escéptico filtró las que se
  quitaron a propósito.
- **Cobertura:** un crítico final revisó el conjunto. Encontró 9 huecos y 14 contradicciones
  entre ítems, y volvió a medir por su cuenta los «resueltos» de peso alto. Tumbó uno (P92) y
  agregó dos pendientes nuevos.

## El resultado en una tabla

| Estado | Cuántos | Qué significa |
|---|---|---|
| Resuelto | 28 | Ya está arreglado en esta rama, comprobado en el sitio servido |
| Obsoleto | 19 | Se lo llevó la reconstrucción o una decisión posterior de Ramón (sobre todo el hero del 10-oct y las mayúsculas del 5-oct) |
| Sigue vivo | 44 | 11 tal como estaban escritos y 33 con otra descripción (otras rutas, cifras o alcance) |
| Solo en producción | 2 | El defecto ya no está en el v3, pero sigue en spindlelab.cl |
| De otro repo | 2 | Los h1 del sitio de Bernardo (el encargo ya existe) |
| Falso | 0 | |

De los 44 vivos, **12 son decisiones de Ramón, 29 son trabajo del estudio web y 3 son de la
troncal**. Muchos son el mismo asunto visto desde dos lados. Agrupados, quedan **9 decisiones
para Ramón** y **8 frentes de trabajo**.

Lo que más cambió respecto del traspaso: casi todo lo de peso alto ya estaba resuelto (el
resultado del chequeo, noindex en Trabajo, el rótulo de concepto de Raigal, un solo oro por
vista) o se volvió obsoleto con la decisión del hero. De peso alto siguen vivos solo tres: la ruta
de publicación, la lista para ejecutarla y la promesa de monitoreo de menciones.

---

## 1 · Decisiones para Ramón

Ordenadas por lo que destraban. Ninguna se ejecuta sin su respuesta.

### R1 · La ruta de publicación · alto · B19, P70

El v3 está terminado y no tiene ruta de salida. Decide: **¿va a la raíz o se queda con prefijo?**,
**¿qué pasa con las rutas v2** (redirecciones, y `/privacidad/`, que no tiene versión v3)? y
**cuándo**. El costo real es menor que lo que decía el traspaso: canonical y og:url salen de la
ruta y se corrigen solos, y el JSON-LD ya trae URLs de producción. Lo que sí hay que mover es el
prefijo `/v3/` en 14 archivos y 767 enlaces, retirar los 20 HTML estáticos y las 2 páginas Astro
v2 que ocupan las mismas rutas, sacar las cuatro maquetas internas del build (P76) y reescribir
`llms.txt`. La lista completa la escribe el estudio web en el frente E7, sin esperar la decisión.

### R2 · El monitoreo de menciones en IA, y su cadencia · alto · A01, más dos huecos del crítico

El v3 promete medir menciones en IA dentro del Acompañamiento, en texto visible y en el JSON-LD.
`capacidad-servicios.md:55` lo marca ❌ y choca con la regla del 27-sep de no prometer monitoreo
continuo, que siguió en pie después del giro. La cadencia además se contradice: Método y
Acompañamiento dicen «quincenal», el plan Esencial y Visibilidad en IA dicen «mensual», y
Diagnóstico dice «cada mes». Son dos preguntas:

1. ¿La regla del 27-sep cubre también el monitoreo acotado de un plan pagado?
2. ¿Mensual o quincenal? Ya estaba reservada en la spec.

La respuesta toca `servicios-v3.json` (Acompañamiento y **Visibilidad en IA**), `paginas-v3.json`,
`oferta-v3.json`, cuatro líneas escritas directo en las páginas (una de ellas dentro del JSON-LD de
Método) y `public/llms.txt:13` y `:18`. Producción promete lo mismo.

### R3 · El Acompañamiento y la mantención de $50.000 · medio · A02

**El precio no está en duda**: Ramón ratificó la lista el 27-sep. Lo que sigue abierto es de
producto: ¿el Acompañamiento (desde $590.000/mes) y la mantención web de $50.000/mes que
registra ventas son dos productos distintos? El sitio los roza en una línea: el plan «A medida»
del Acompañamiento dice «Integra desarrollo web y mantención». Si son distintos, el sitio o la
cotización lo dicen.

### R4 · El paquete de la bio de Nosotros · medio · P46, P52, P87, A04

Todo en una conversación, porque la bio va tal cual y es de Ramón:

- La bio usa «eje» dos veces en el mismo párrafo, con dos referentes, y **«con el orgánico como
  eje» contradice su giro del 29-sep** (el sitio al centro).
- «Orquestando el motor» y «poner el motor a funcionar entero» son la jerga interna que ya se
  sacó de los servicios.
- La frase reservada desde el 6-oct («El objetivo no es solo…»).
- **«Te lo muestro antes de que pagues nada.»** Una nota de código equivocada pasó al singular
  lo que producción dice en plural («Te lo mostramos»). Mostrar el diagnóstico antes de cobrar
  es algo que entrega la empresa, y el manual §08 lo pone en plural. Él elige.
- Si la bio cambia de «eje», la frase de Paid Media «El sitio es el eje; la pauta lo acelera.»
  se revisa con ella. La regla del 10-oct no la alcanza: habla solo del titular del hero.

Si cambia la bio, cambia también en producción y en su LinkedIn.

### R5 · El paquete de Layout · bajo · P79, P89, P90

Tocan `Layout.astro`, que solo se toca con su permiso:

- **Su cargo.** El jobTitle dice «Consultor de SEO técnico y visibilidad en IA (AEO/GEO)» y no
  nombra el desarrollo web, que hoy es la línea que abre la oferta. Si cambia, cambia también en
  la home, en Nosotros y en la línea de autor de los 7 artículos.
- **El orden de los servicios en el grafo.** Pone Desarrollo web sexto mientras la home lo
  pone primero. Si se reordena, va junto con la publicación.
- **La precarga de Inter.** Cada página v3 descarga 48 KB de Inter. Inter no pinta nada al
  cargar, pero sí el aviso que aparece después de aceptar o rechazar las cookies (el crítico
  midió 81 caracteres). Si el estudio web repinta ese aviso en Manrope (frente E1), Inter
  deja de usarse del todo y la decisión queda limpia.
- Y lo que ya estaba reservado: el tercer `sameAs`.

### R6 · El paquete del hero · bajo · P85 y dos rescates

El 10-oct dejó el hero «como está». Hay tres mejoras que caen dentro de esa sección y que, por
eso, no se hacen sin él:

- **Que las cuatro piezas de la fila lleven a su ficha en Trabajo** (`/v3/trabajo/#o-raigal`,
  etc.). La home vieja las enlazaba, y hoy la home no tiene ningún enlace a Trabajo en el cuerpo.
- **Que «la metodología publicada» enlace a `/v3/diagnostico/`**, sin cambiar una palabra.
- Que la nota del chequeo anuncie las tres preguntas del resultado (leer, entender, citar).
  Es la menor de las tres, porque cada pregunta del resultado ya trae su explicación.

### R7 · Lo que se puede rescatar que es copy o dato suyo · bajo

- **El dato «67 de 69».** Era el único dato propio de la home y salió con el tablero del 5-oct
  sin que nadie lo decidiera. Tiene fuente (`marketing/metricas/corridas-chequeo-2026-08-31.md`),
  pero el texto viejo decía más de lo que se midió. Lo medido es: **67 de 69 sitios sin preguntas
  frecuentes marcadas (FAQPage)**, en corredoras y oficinas contables de Santiago, agosto de 2026.
  El mejor lugar es Diagnóstico, junto a «¿Te pueden citar?». Redacta Clara.
- **Verifica y Cumple en la home.** Hoy solo aparece como pieza de obra. La Ley 21.719 entra en
  plena vigencia el 1-dic, en 51 días. ¿Lo nombra la home? Si se aprueba R6, la pieza ya lleva a su
  ficha y desde ahí al producto.
- **La FAQ de Diagnóstico.** La QA cambió «qué mueve la aguja» por «qué arreglar primero», y la
  spec dice que esa FAQ había quedado fuera. Él elige una de las dos.
- **Método dice «cada proyecto sigue… nuestro proceso de auditoría»**, y Desarrollo web tiene sus
  propias cinco fases. ¿Se acota Método a los proyectos de SEO y visibilidad (una palabra) o suma
  la construcción?
- **La FAQ de la home**, que ya estaba reservada: el crítico confirmó la cuenta. El chequeo propio
  da 83 sin ella y ~94 con preguntas visibles y su FAQPage.

### R8 · Producción, mientras el v3 no sale · medio · C36, P71, P45, P53, nuevo del crítico

Defectos que el v3 ya no tiene pero que siguen vivos en spindlelab.cl:

- `/privacidad/` tiene dos h1 y dos textos bajo contraste AA. Esta no se va sola al publicar: el
  v3 la enlaza 43 veces y no tiene versión propia. Es un arreglo de marcado (el segundo h1 pasa a
  h2 y el gris sube), sin tocar el texto legal.
- Frases que no se sostienen: «Equipo dedicado» en el Acompañamiento (también en su JSON-LD),
  «acostumbrados a trabajar bajo NDA» en contacto, «Ninguna herramienta del rubro publica su
  metodología» en diagnóstico (Nitten la publica), «cinco preguntas fijas por tres motores», el
  «Sí.» bajo «¿Cuánto cuesta?» en Desarrollo web y los «eje» del v2 en `/servicios/`.

Decide si se arreglan ya en producción o se dejan morir con la publicación (R1). Si la fecha
de publicación está cerca, lo segundo. `/privacidad/` hay que arreglarla igual.

### R9 · Raigal antes de mostrarlo · medio · A09, P64

Raigal aparece en tres páginas con su rótulo de concepto y nadie ha marcado su revisión fina.
**Antes de mandarle la vista previa a un prospecto, Ramón la revisa.** Aparte, ¿se completa el
portafolio de concepto (páginas internas, fotos) o se cierra por decisión? La generación pagada
quedó fuera el 5-oct.

---

## 2 · Trabajo del estudio web

> **Estado al 13-oct:** E1 a E6 hechos, con QA de Javiera en contexto limpio (Aprobado en la
> ronda completa y en la exprés de cierre) y los desvíos decididos por Lucía. Commits de
> 511bb86 a 7b60c6c; el registro está en el §7 de `spec-visual.md` (filas del 13-oct). Quedan
> E7 (la lista de publicación) y E8 (el pase de voz de Clara).
>
> **Estado al 14-oct:** E7 hecho el 13-oct (`lista-publicacion.md`, ensayada; `63f1e55`) y E8
> hecho el 14-oct, aprobado por Javiera en la ronda 2 (detalle abajo, en E8). Los ocho frentes
> del estudio están cerrados. Lo que sigue espera respuestas de Ramón, salvo una propuesta de
> Clara (la frase de la prueba de Trabajo) antes de su lectura de aprobación.
>
> **Estado al 15-oct:** E9 (interiores, imágenes y prueba visible) llegó a su tablero, y Ramón no
> eligió ninguna dirección: quiere cambiar la referencia del sitio (fila del 15-oct en el §7 de
> `spec-visual.md`). E9 queda descartado y su Tanda B no se construye; sus piezas reales se conservan.
> Empezó **E10, referencia nueva**: 12 referentes en `e10/referentes/` para que Ramón marque. Las
> decisiones R1 a R9 y las confirmaciones de E8 siguen abiertas y no dependen del aspecto.
>
> **Estado al 16-oct:** Ramón eligió The Ready como referencia principal y Gehl como segunda (15-oct),
> y E10 paso 2 quedó hecho y aprobado por Javiera en la ronda 3 (`990b91d`, `e10/acta-paso-2.md`): el
> lock de The Ready, dos direcciones (Taller y Pizarra limpia) en `tableros/e10-direcciones/` y la pauta
> de 9 fotos con IA. Ramón dejó abiertos el logo y la regla del oro: el logo se rediseña después de
> elegir dirección. Siguen las fotos, en una sesión nueva con su clave
> (`marketing/encargos-otras-sesiones/encargo-e10-fotos-ia.md`), y después la compuerta 2, donde Ramón
> elige dirección. R1 a R9 y las confirmaciones de E8 siguen abiertas. Registro: filas del 15 y 16-oct
> en el §7 de `spec-visual.md`.
>
> **Estado al 16-oct, 14:05 (E12):** Ramón cambió de dirección: SpindleLab pasa a presentarse como estudio de
> diseño y tecnología («laboratorio digital») que también hace SEO técnico y visibilidad en IA, con Koto como
> referente y Accept & Proceed como segundo; stack Astro + Tailwind + Motion; casos solo con lo medido; precios y
> oferta iguales (`e12/insumos-ramon-16oct.md`). **E10 queda en pausa como historia**, sin compuerta 2 (el
> encargo de fotos con IA, también en pausa), y **E11 en pausa** antes de escribir direcciones. Accept & Proceed
> está medido (`e12/medicion/accept-and-proceed/`); Koto, en medición. El brief de E12 espera la compuerta 1
> (`e12/brief-de-obra.md`, cinco preguntas con su opción recomendada). La medición de los referentes sigue; las
> dos direcciones se dibujan sobre las respuestas, o sobre la opción recomendada de cada pregunta, dicho en el
> tablero, si Ramón no alcanza a responder antes. El giro toca documentos compartidos
> (estrategia, manual, fichas, bios, outbound): va a la troncal en
> `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md`, y desde esta rama no se edita
> ninguno. **Lo que el giro le cambia a lo abierto:** R5 (el cargo de Ramón en el JSON-LD dice «Consultor de SEO
> técnico y visibilidad en IA») queda desalineado con la identidad nueva y entra a la construcción de E12; R9
> (Raigal) sigue antes de mostrar el índice; R1 a R4 y R6 a R8 siguen como estaban, y ninguna frena el tablero.
> Registro: fila del 16-oct (E12) en el §7 de `spec-visual.md`.
>
> **Estado al 16-oct, 19:50 (E12, compuerta 1 aprobada):** el paso 1 quedó hecho y aprobado por Javiera en el cierre
> exprés de la vuelta 2 (`e12/acta-paso-1.md`, `f248882`): medición de Koto y A&P, brief, inventario de casos, lock y
> tablero (`tableros/e12-laboratorio/`). Ramón aprobó la compuerta 1 entre las 19:20 y las 19:45 con nueve puntos
> (`e12/brief-de-obra.md`, sección «Compuerta 1»): las preguntas 1 a 4 con la opción recomendada; Combeau sin pedir
> más permiso (dicho por él); **Praxi entra como caso**; los casos con la estructura de Koto; **cuatro piezas de
> concepto** (industrial B2B, clínica, estudio legal y servicios) con identidad, sitio y movimiento; **base negra con
> juegos de blanco u otros colores**, en vez del claro; **el manual de marca antiguo deja de regir el diseño**; una
> letra por dirección (A Google Sans Flex, B Mona Sans, DM Mono en las dos); y dos o tres caminos de wordmark de Bruno
> en la compuerta 2. **Sigue el paso 2** (`e12/encargo-paso-2.md`): Lucía rehace paleta y letra sobre negro y mide
> el juego de color de Koto; Diego, con Simón, suma Praxi, las grabaciones de Combeau y los conceptos al inventario;
> Bruno hace los cuatro conceptos y los caminos de logo; Clara, el texto; después, las dos direcciones (A Archivo y B
> Banco) en `tableros/e12-direcciones/` y la QA de Javiera en contexto limpio, antes de la compuerta 2. Nada se
> publica y `spindlelab-astro/` no se toca. **Lo que esto le cambia a lo abierto:** R9 (Raigal) se amplía a las
> cuatro piezas de concepto, que Ramón revisa antes de que salgan; R5 sigue para la construcción; R1 a R4 y R6 a R8,
> igual. **Para la troncal:** el manual de marca antiguo quedó sin efecto en diseño y la identidad nueva sale después
> de la compuerta 2; qué hacen mientras tanto las piezas de redes y el outbound que usan el manual viejo lo decide
> ella (`marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` §5). Registro: fila del 16-oct
> (compuerta 1 de E12) en el §7 de `spec-visual.md`.
>
> **Estado al 19-oct, 09:55 (E12, compuerta 2 cerrada):** el paso 2 quedó hecho y aprobado por Javiera en la vuelta 2
> (`e12/acta-paso-2.md`, `70d7c23`: los 19 defectos de la vuelta 1 cerrados y cuatro menores nuevos, 20 a 23): cuatro
> piezas de concepto (Tonela, Ocelo, Sesenta y Doceavo), tres caminos de logo, el texto de Clara con su lectura fría, el
> inventario de Praxi y dos direcciones sobre negro con su tablero (`tableros/e12-direcciones/`). Ramón cerró la
> compuerta 2 el 19-oct, a eso de las 09:50 (`e12/brief-de-obra.md`, sección «Compuerta 2»; textual en
> `e12/insumos-ramon-19oct.md`): **A · Archivo** (Google Sans Flex con DM Mono, lienzo `#060606`); **logo El huso**,
> monocromo; **hero 3**; **la portada de la home es el video del hilo de oro del sitio actual**, como desvío autorizado
> de la regla de solo trabajo real; **ninguna generación pagada** («cuando tenga plata vamos con lo faltante»); y **Praxi
> y Combeau, los dos casos reales**: el de Praxi nombra sus modelos, dice que se construyó con agentes de IA y no cuenta
> que está en pausa. Las preguntas 6 a 10 no las contestó y quedan por defecto: los puntajes propios no se muestran,
> Combeau va sin sus medidas personales, ninguna interior lleva el lienzo claro, el cursor es blanco y el logo,
> monocromo. B queda como historia. **Sigue:** en esta corrida, la spec de E12 sobre A (Lucía reescribe
> `spec-visual.md`), el logo final, el texto de la obra, y el inventario y las señales al día, sin tocar
> `spindlelab-astro/`; en la siguiente, la construcción de A en `spindlelab-astro/`, la QA de Javiera en contexto limpio
> y el cierre. Nada se publica. **Lo que esto le cambia a lo abierto:** R9 queda en las cuatro piezas de concepto del
> índice, que Ramón revisa antes de que salgan (Raigal sale del índice y pasa a archivo, con Aplomo y Deslinde, como
> decía el tablero); R5 sigue para la construcción; R1 sigue abierta y frena publicar, no construir; R2 a R4 y R6 a R8,
> igual. **Para la troncal:** la dirección elegida está en
> `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` §6; el encargo del manual nuevo llega al cierre
> de la obra. Registro: fila del 19-oct (compuerta 2 de E12) en el §7 de `spec-visual.md`.
>
> **Estado al 23-oct, 17:00 (E12 cerrada con reparos):** construida A en `spindlelab-astro/` (27 rutas bajo `/v3/`), QA de
> obra de Javiera con reparos en la vuelta 2 (`e12/acta-obra.md`, `f3044fc`) y capturas de cierre en `capturas/e12/`. El
> estado y lo que queda, con su dueño, está en **§0** al principio de este documento. Registro: fila del 23-oct (cierre)
> en el §7 de `spec-visual.md`.

No necesita decisión. Se hace en esta rama, se mide y queda anotado en el §7 de la spec.

**E1 · El aviso de cookies** (C34, P66, P92, P63). En la home y en vertical ya no tapa el
chequeo, pero sí lo tapa en la página propia del chequeo, `/v3/diagnostico/`: a 320×568 cubre el
botón entero, y con el teléfono apaisado (667×375, 844×390) cubre el campo y el botón. En la
home queda un caso apaisado (568×320). Además, el aviso que aparece después de decidir sale con
radio de 16 px, sombra, un fondo fuera de la paleta y letra Inter. **Arreglo:** repintarlo desde
`driftime.css` con el método del 6-oct (sin tocar `Layout.astro` ni el script compartido con
producción) y compactarlo en pantallas bajas. Se mide por alto y en horizontal, no solo por
ancho.

**E2 · El menú** (C38). Tiene 8 filas y la escalera de entrada anima 6. La última, «Contacto»,
queda fuera de la pantalla en notebooks de 768 y 720 de alto. Hay que darle retardo al paso 7,
corregir el conteo en los comentarios y achicar el tope para que entre en ~650 px.

**E3 · Semántica y accesibilidad que tenía el v3 viejo** (rescate):
- Los enlaces del pie salen pegados en el texto plano («Desarrollo webVisibilidad en IA…»)
  porque dejaron de ir en listas. Vuelven a `ul/li`, que se ven igual.
- Las fases de Desarrollo web y de cada servicio vuelven a ser listas ordenadas, como ya lo son
  en Método.
- El `<article>` del artículo vuelve a envolver el h1, la fecha y el autor.
- El índice lateral del artículo numera dos veces en fintechs («01 1. La aplicación…»): se omite
  el contador cuando el título ya trae número.
- El alt de las piezas de obra suma el titular que se ve en la portada, como ya lo hace Verifica
  y Cumple. Es un atributo, así que lo que se ve en el hero no cambia.
- El cierre del índice del blog recupera el botón a contacto, como el cierre de cada artículo.

**E4 · Código y datos muertos** (B22, C39, P61, A13, C42, P77, C41, C40, P78, C37, A04):
`caja.ts` (su cabecera contradice el 5-oct), `prosa-v3.css` (305 líneas) y `campos-v3.css`, que
nada importa y que guardan el negro cálido #14110E, los campos sin uso en `oferta-v3.json` y
`obra-v3.json`, y 11 imágenes de obra que el build no pide: nueve que solo nombran esos campos, más
`aplomo.jpg` y `raigal.jpg`, que no nombra nadie. `aplomo.jpg` va primero, porque es una pieza que
Ramón decidió no publicar y hoy quedaría servida en una URL. Las imágenes se borran junto con sus
campos, para que el dato no apunte a archivos que no existen. Los nombres de planes en `oferta-v3.json` esperan a R7, porque pueden
volver. A eso se suman comentarios que dicen lo contrario del código: «catorce páginas», «el sitio
tiene veinte», la tipografía de `tailwind.config.mjs`, la `_nota` de `paginas-v3.json` (si alguien
le cree, rompe el JSON-LD) y el aviso de voz de `nosotros.astro`, que cita el §07 del manual en vez
del §08.

**E5 · Documentos superados** (A11, B20, B28, B29, B30, B31, P59): la auditoría de referencia (§8
completo), `recomendacion.md`, `tres-direcciones.md`, `comparacion-mensaje-giro-29sep.md` y
`nota-titulares-v3.md` siguen diciendo cosas que las decisiones del 2, 5 y 10-oct cambiaron. Cada
uno lleva arriba una nota de «superado» que remite a la spec. No se reescriben.

**E6 · Lo que la sesión antigua sabía y no quedó escrito:**
- En una plantilla Astro, un comentario `<!-- -->` se sirve al navegador, así que se comenta con
  `{/* */}`. Va como regla al §7 y a la memoria de Diego. Las páginas v3 ya cumplen, pero la home
  v2 del mismo build sirve 12 notas internas.
- Su corrección sobre el PR #41: la rama del v2 sí comparte ancestro con `main`, y el clon
  superficial engaña a quien lo compruebe en local. Se aplica al traspaso.
  **Hecho por el merge 2a62f1f** (trae c9d6f6a): §0 y §10 del traspaso ya lo dicen (13-oct).
- La memoria de Clara no registra la obra v3.

**E7 · La lista de publicación** (P70, P76, P77, nuevo del crítico). Se escribe ahora en la
carpeta de la obra, para que el día que Ramón decida R1 sea ejecutarla: el robots de 11
plantillas, el prefijo en 14 archivos, los 20 HTML y 2 páginas v2 que hay que retirar, las
maquetas fuera del build, `/trabajo/` en el sitemap, `llms.txt` reescrito (hoy presenta la casa
como «agencia de marketing con IA», con la tesis anterior al giro), los huérfanos recalculados y
la verificación final con `npm run verificar`.

**E8 · El pase de voz** (B21, P86). Nadie pasó `voz-spindlelab` sobre todo el copy nuevo del v3.
Clara corrigió textos puntuales en la QA final, pero eso no es un pase completo. Se hace antes
de publicar, sin tocar lo cerrado por Ramón (hero, bio, «acá») ni los cuerpos de los artículos,
que van tal cual. En la misma pasada: la guía de entrada de Desarrollo web repite casi palabra
por palabra la línea del campo de la home y la del menú.

**E8 hecho el 14-oct** (P0.3 de `lista-publicacion.md`), en la rama y sin publicar. Clara pasó
`voz-spindlelab` sobre todo el copy nuevo: 886 filas, que son las 851 ranuras abiertas del
inventario (el 100 %) y 35 del encargo de la oferta de Marco. Cambian 141, se mantienen 690 con su
motivo, 54 esperan R2 y 1 es un dato a verificar. La guía de Desarrollo web (P86) entró en el pase
(fila 983). Las seis filas transitorias de la spec y el punto 4 de la revisión cruzada («Visibilidad
en IA») quedaron cerrados. Documentos en `e8/`: `copy-secciones.md` (el entregable de Clara),
`hoja-de-voz.md`, `e8-antes-despues.md` (lo que lee Ramón con la vista previa) y `acta-qa-E8.md`.
- **Commits:** `28c5d85` (la migración al JSON, sin cambio visible), `3877e51`, `2dbaa09` y
  `eaa0c33` (la aplicación), `9b9d590` (el antes y después), `f0d911c` y `f57f227` (los arreglos de
  la QA). El último que toca el sitio es `f0d911c`.
- **QA:** Javiera, en contexto limpio. Ronda 1 (`8417701`): aprobado con reparos, 6 menores. Ronda
  2 (`ad7fea5`): **aprobado**. 245 de 245 diferencias explicadas por una fila, 141 de 141 filas en el
  sitio, lo cerrado intacto y `verificar` sin hallazgos a 390, 768 y 1440.
- **Registro:** tres filas del 14-oct en el §7 de `spec-visual.md`.

**Lo que queda abierto de E8:**
- **De Ramón:** R2 (el texto de cada lugar para cada respuesta está en el anexo A de
  `copy-secciones.md`, y lo aplica Diego en P0.2), R4 y R7 (anexo C), el plazo de la Auditoría +
  Visibilidad en IA y desde cuándo corren las ~2 semanas de la Auditoría de Visibilidad, y las diez
  confirmaciones sobre texto ya aplicado que abren `e8-antes-despues.md`. La 10 es el descuadre de la
  fila de dos de Trabajo (202 px a 768, 185 a 1440), que iba a decidir Lucía y pasó a Ramón.
- **De Clara, antes de la lectura de aprobación (P0.4):** proponerle a Ramón la frase de la prueba
  de Trabajo que tropieza en voz alta («como si el aviso de cookies frena…», confirmación 9).
- **Antes de publicar:** volver a correr el chequeo de la Ley 21.719 sobre la vista previa para la
  frase del 100, y la fecha de la ley (1-dic-2026) el día del corte.
- **Fuera de E8, para la troncal y la sesión de Marco:**
  `marketing/encargos-otras-sesiones/encargo-chequeo-google-extended-y-estudio-marco.md`
  (Google-Extended en el chequeo, en dos artículos y en la regla del 8-sep, y la corrección del
  estudio de Marco). Decide Ramón. Al final de ese encargo va también una nota para la troncal:
  que la skill `mini-diagnostico` obligue a hacerles de verdad las preguntas a ChatGPT, Gemini y
  Perplexity, porque el sitio ahora lo afirma (`copy-secciones.md`, anexo D, punto 4).

---

## 3 · De la troncal

Tocan `main` y los documentos compartidos, así que no los hace esta sesión. Cada merge a `main`
lo confirma Ramón.

- **D43 · El permiso de Bernardo.** En esta rama dice «CONCEDIDO» (confirmación verbal del
  30-sep). En `main` sigue diciendo «no se ha pedido todavía», así que la troncal y el outbound
  no usarían el caso. Basta llevar esa línea a `main` (commit 75bfffc).
- **B26 · El giro del 28 y 29-sep.** Ya está escrito, pero solo en la rama
  `claude/outbound-pozo-seco-28sep`, que nunca entró a `main`: la sección 0 del brief, la
  decisión en la ficha de cliente y dos estudios de competencia. Hay que traer esos commits, no
  reescribirlos. Si no, la ficha queda con la decisión dos veces. Al traerlos se anota «aplicado
  en el v3, sin publicar».
- **B27 · La retrospectiva de los 90 días.** El ciclo venció el 5-oct sin cierre, y el test de
  menciones no se corre desde el 25-ago. El test necesita navegador limpio, así que lo corre una
  sesión local o Ramón.

---

## 4 · Lo que no hay que perseguir

- **Obsoletos (19):** todo lo que dependía de «El eje de tu negocio», su bajada, los titulares
  en mayúsculas fuera de los cinco lugares y los bloques de la home vieja («No es un mal sitio»,
  «Leer, entender, citar», «Tres herramientas, gratis», «El mismo número, después»). También la
  prueba de los 20 abogados, que el giro del 29-sep dejó sin objeto.
- **Rescate descartado (64 de 85):** las pestañas de planes, el bloque de herramientas, los
  titulares en mayúsculas y la grilla de fotos del blog, entre otros, salieron por decisión
  registrada (tablero aprobado el 5-oct, spec §3, §4 y §7). Cuatro diferencias más no se
  sostuvieron al comprobarlas. El detalle está en el anexo.
- **X01 · Verifica y Cumple:** la URL del v3, `https://verifica.spindlelab.cl/`, responde y es la
  definitiva. `verificaycumple.pages.dev` redirige a ella. `verificaycumple.cl` no existe en el
  DNS, y por eso el traspaso vio un 502.
- **Los h1 del sitio de Bernardo** (B16, B18) siguen igual en su sitio vivo. El encargo está en
  `marketing/encargos-otras-sesiones/encargo-h1-sitio-bernardo-10oct.md` y es para la sesión del
  repo `rvalleespin/bernardo-combeau`.
