# Desvíos de Diego: Trabajo y los casos (obra E13)

Archivos míos: `src/pages/v3/trabajo/index.astro` y `[caso].astro`, `src/data/archivo/casos.mjs`, `src/components/a/Caso.astro` y `FilaCaso.astro`, `src/scripts/archivo/muro.mjs`, `src/data/archivo/medios.json` y `medios-casos.json`, reglas exclusivas de `archivo.css`, la imagen al compartir de `/trabajo/` y `e13/herramientas/og-trabajo.mjs`. Sin commit. Decisión 3 del brief (valores por defecto): dos entradas, Combeau y Verifica y Cumple.

**Rutas.** Desde el corte a la raíz (`452f3bac`) las páginas son `/trabajo/` y `/trabajo/combeau/` y sus archivos viven en `src/pages/trabajo/`. Donde este archivo dice `/v3/trabajo/` o `src/pages/v3/…` (escrito antes del corte), léase sin `/v3/`; los medios siguen en `public/v3/…`. La ronda 2 está en la sección 6.

## 1 · Qué cambié, por qué, de dónde sale

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| `/v3/trabajo/{praxi,sesenta,ocelo,doceavo,tonela}/` salen del build (`dist` queda con `v3/trabajo/index.html` y `v3/trabajo/combeau/`) | No se publica lo que sale; el historial de git lo conserva | brief §1.3 y §3 |
| `casos.mjs` de 549 a 279 líneas: solo `CASOS.combeau`; fuera `concepto()`, las cinco copias de texto, `COPIAS`, `siguienteMedio`, `enlaces` (no lo leía nadie), `tipoBarra`, `puente`, el hueco y los ayudantes `pila45`, `pila162`, `hueco`. `ORDEN = ['combeau']` y `[caso].astro` sigue generando la ruta por `ORDEN` | Con un solo caso, ninguna rama de los otros cinco tiene quién la pida | encargo; `desvios/home.md` §3.9 |
| Caso: sin «Siguiente». El cierre es el texto de Clara (`combeau.siguiente.contacto`), el botón a `/v3/contacto/` y el corchete `[ Todo el trabajo ] (2)` en la columna de la derecha (clase `siguiente__caso`, que el blog también usa). `aria-labelledby` apunta al párrafo del cierre (`h-cierre`), no a un h2 del caso que sigue | Clara retiró `combeau.siguiente.rotulo` y `.caso`; con un caso apuntaría a sí mismo | `desvios/home.md` §3.9 |
| `FilaCaso.astro`: solo las filas `169` y `par`. Fuera las apiladas (`45-162`, `162-45`) y el hueco nombrado | Eran de Praxi y de los conceptos; Combeau usa solo `uno` y `par` | ningún caso las pide |
| `archivo.css` (con Edit de texto exacto, el otro Diego edita el archivo): fuera `.filtro*` y `body.a-sin-js .filtro`, `.pieza[hidden]`, `.pila`, `.fila--45-162`/`.fila--162-45` (queda `.fila--par`), `.hueco`, `--a-hueco`, `.barra__tipo`, `.siguiente__caso .medio-enlace`; dos comentarios sin «conceptos». Se queda todo `.siguiente*` y `.t-siguiente`, que usa el blog | Reglas exclusivas de lo retirado (`grep` sin otro lector) | encargo |
| `/trabajo/`: sin filtro (markup, conteos, `opciones`, esconder piezas en `muro.mjs`). Queda miga, h1, conteo `(2)`, entradilla y el muro de dos piezas. `EN_PRIMERA = 2`, `ALTO` y `PORTADAS` con dos entradas | `Todo (2)`, `Cliente (1)` y `Propio (1)` no filtraban nada; Clara lo recomendó | `desvios/home.md` §3.8 |
| JSON-LD de `/trabajo/`: `CollectionPage` + `ItemList` de dos elementos (`Bernardo Combeau` → `https://spindlelab.cl/trabajo/combeau/`; `Verifica y Cumple` → `https://verifica.spindlelab.cl/`) + `BreadcrumbList`. Fuera la rama «sin destino» y la marca «(concepto)» | Las dos entradas tienen destino | senales-obra §2.2 |
| Imagen al compartir `og-e12-trabajo.jpg` rehecha (75 kB, 1200 × 630) con `e13/herramientas/og-trabajo.mjs`: portada del sitio de Combeau + la sección «Las 12 cosas…» de Verifica y Cumple (`verifica-y-cumple-12-169`), Chrome de la Mac, mismo método que `og-tanda-2.mjs`. `?v=1` → `?v=2` (la única referencia es la de `index.astro`). `alt` nuevo: describe esas dos piezas | No va la portada de Verifica y Cumple porque trae la persona a caballo generada con IA y una tarjeta viaja sin el aviso (senales-obra §1.3, regla 3, por analogía con Praxi) | encargo |
| `og-e12-combeau.jpg` revisada, sin cambios: muestra la portada de su sitio (retrato en luz verde, su frase, «Retratos»), ninguna medida personal en la imagen ni en el `alt` («La portada del sitio de Bernardo Combeau, fotógrafo de retrato.») | Pedido del encargo | `caso-combeau.json` reglas |
| Notas de cabecera de `casos.mjs`, `Caso.astro`, `FilaCaso.astro`, `index.astro`, `muro.mjs` y `medios*.json` dicen qué salió | Que quien lea el archivo no busque lo que no está | |

## 2 · Qué se retiró y qué se conserva

**Retirado (archivos).**
- `public/v3/trabajo/{praxi,sesenta,ocelo,doceavo,tonela}/`: 15.976 kB (3.320 + 4.016 + 3.208 + 2.032 + 3.400).
- `public/v3/medios/`: `praxi-45`, `praxi-43`, `praxi-numeros-169`, `sesenta-45`, `sesenta-home-169`, `ocelo-43`, `doceavo-53`, `tonela-45`, `spindlelab-privacidad-53`, `verifica-y-cumple-239` (sin lector) y `combeau-galeria-169` (la usaba la home; el `grep` final de hoy no la encuentra en ningún archivo vivo). 392 kB.
- `public/assets/img/og-e12-{praxi,sesenta,ocelo,doceavo,tonela}.jpg`: 235 kB.
- `src/data/archivo/texto/caso-{praxi,sesenta,ocelo,doceavo,tonela}.json` (copias; sus fuentes ya no estaban en `e13/texto/`). `extraer-texto.mjs --comprobar`: todas «igual», sin «SIN FUENTE». No corrí `--todo`.
- `src/data/obra-v3.json` (el modelo de datos de driftime: `grep` de `obra-v3` no lo importa nadie; solo lo nombran dos notas «fuente» dentro de `caso-combeau.json`).
- Filas de `medios.json` (11) y `medios-casos.json` (los cinco casos: 1.012 líneas). El JSON conserva el formato byte a byte (`indent=1`); su cabecera «no se edita a mano» lo dice y avisa que se editó.
- La cinta (`public/v3/cinta/`, `cinta.json`, `cinta.mjs`) la retiró el otro Diego.

**Se conserva** (al cierre de la ronda 1; `chequeo-239/-43` ya no existen: Servicios los retiró en la ronda 2, defecto 1). `/v3/trabajo/combeau/` entera (sus 20 archivos en `public/v3/trabajo/combeau/`), `combeau-fotografia-169/-45`, `verifica-y-cumple-45` (desarrollo-web), `-53` (muro de `/trabajo/`), `-12-169` (home y og), `ramon-vallejos-34`, `portada/`, `marca/`, `og-e12-combeau.jpg`.

**`public/v3`: 26.860 kB (27.153.688 B, 156 archivos) → 8.540 kB (8.660.004 B, 42 archivos).** Lucía estimó 26,9 → ≈ 8,6 MB. De la diferencia, 1.952 kB son la cinta (otro Diego) y el resto es lo de arriba. Hoy (ronda 2): 8.448 kB, porque Servicios retiró `chequeo-239/-43`.

## 3 · Lo que ya no lee nadie (para la orquestadora; no los toqué, son de Clara)

- `trabajo.filtro` y `trabajo.filtro.nombre` (en `trabajo.json`): sin lector desde que salió el filtro. Se pueden retirar de la fuente.
- `trabajo.entradas[].tipo` ya no se lee (era la clave del filtro; la `linea` dice «Cliente · 2026» y «Propio · 2026»).
- `comun.cursor.concepto` y `comun.cursor.caso`: los leía solo el «Siguiente» de `casos.mjs`. En `src/` tampoco hay lector literal de `comun.cursor.sitio` ni de `.foco`: confirmar antes de retirar.
- `combeau.siguiente.*`: `contacto`, `boton` y `todo` los lee `casos.mjs`; los ids de Combeau se leen con prefijo (`${p}.…`), por eso un `grep` literal no los encuentra.

## 4 · Medido (build `construir.sh trabajo`, con la home nueva del otro Diego; también con la home en stub)

| Prueba | Resultado |
|---|---|
| Build | 28 páginas, sin errores |
| `verificar.mjs --prefijo /v3/trabajo/` a 390, 768, 1100 y 1440 | «Sin hallazgos» (2 páginas cada vez) |
| `barrer-terminos.mjs --solo '^v3/trabajo'` y `grep` del volcado de texto | cero «Praxi», «Concepto», «Sesenta», «Ocelo», «Doceavo», «Tonela», «24 horas», «mini-diagnóstico», «diagnóstico gratis», rayas. Único hallazgo del barrido: «motor» ×2, ver sección 5 |
| `enlaces.mjs dist` | 48 páginas, 1.303 referencias internas, 0 que no resuelven |
| JSON-LD de `/trabajo/` y de `/trabajo/combeau/` | parsea; `/trabajo/`: `CollectionPage`, `ItemList` (2), `BreadcrumbList`; el caso: `WebPage`, `CreativeWork`, `WebSite`, `BreadcrumbList` |
| `title` / `description` | `/trabajo/` 59 / 130; caso 58 / 154 (dentro de los largos) |
| `dist` | sin ningún archivo `*praxi*`, `*sesenta*`, `*ocelo*`, `*doceavo*`, `*tonela*` |
| Consola | sin errores en `/trabajo/` a 768, 900, 1194, 1920 y en el caso a 390 y 1440 |

Capturas (fuera del repositorio): `.../scratchpad/capt-trabajo-final/` (`v3__trabajo-1440-full.jpg`, `v3__trabajo-390-full.jpg`, `v3__trabajo__combeau-1440.jpg`, `v3__trabajo__combeau-390.jpg`, `t-768`, `t-900`, `t-1194`, `t-1920`, `c-390-fin`, `c-1440-fin`). El cuadro «Listo, quedaron rechazadas» que sale en algunas es el aviso de cookies que cerró el script de captura.

## 5 · Qué quedó abierto

1. **El muro de dos piezas: SÍ se aplicó la variante pareja (commit `1c65e6a6`).** En la ronda 1 lo dejé como propuesta porque la spec y Clara fijaban la portada de Combeau en `combeau-fotografia-45` (4:5, la captura del teléfono): a 1440 y 1920 la columna de la derecha terminaba ~320 px más arriba y quedaba un hueco. La orquestadora aplicó mi propuesta tal cual: `PORTADAS` de `trabajo/index.astro` usa `combeau-fotografia-169` en `p-53` (la captura de escritorio, que ya existía, recortada al marco 5:3) y `ALTO` quedó solo con `p-53`. Las dos tarjetas arrancan a la misma altura; la 16:9 pierde ~6 % del ancho (3 % por lado; el menú de Combeau queda cortado a la derecha). Desvío respecto de la spec §3.3 y de la nota de Clara en `trabajo.json` («Portada de la tarjeta: la de fotografía (`combeau-fotografia-45`)»), que sigue diciendo `-45`: se declara aquí. `combeau-fotografia-45` sigue en uso (`desarrollo-web`). Captura de la variante en la ronda 1: `.../scratchpad/capt-trabajo-var/v3__trabajo-1440-full.jpg`.
2. **`public/v3/medios/combeau-modelo-45.webp` (36 kB) y su fila en `medios.json` quedaron sin ningún lector**: Clara unió las dos entradas de Combeau en una (portada `-fotografia-45`). Los dejé porque el encargo dice que los de Combeau se quedan; si no se quieren, son un `rm` y una fila. El caso usa otro archivo del mismo nombre bajo `public/v3/trabajo/combeau/`.
3. **«motor» ×2 en `/v3/trabajo/` y `/v3/trabajo/combeau/`**: viene del `knowsAbout` de la persona en el JSON-LD que emite el Layout («Visibilidad en motores de IA»). No es de mi área (`comun.entidad.sabe`, `layout-a.ts`) y es el plural de «motor de IA», que la guía permite; lo dejo anotado por si el barrido final lo cuenta.
4. **Fuera de mi área, con comentarios viejos**: `Video.astro` y `video.mjs` aún dicen «(los conceptos bajo 834)». `Pieza.astro` (lo comparte `desarrollo-web.astro`) conserva la prop `tipo` / `data-tipo`, que ya nadie lee. Los dos son cambios de comentario o de una línea para su dueño.
5. **`medios-casos.json` dice que lo escribe `e12/construccion/herramientas/medios-casos.py`.** Si alguien lo vuelve a correr, regenerará los cinco casos que salieron y esa carpeta de medios ya no existe: no se debe correr en esta obra.
6. **Verifica y Cumple en `/trabajo/` sigue con su portada 5:3 y el aviso «La persona a caballo de esta portada está generada con IA.»** (texto de Clara, sin cambio). La tarjeta al compartir usa otra imagen por la razón de la sección 1.
7. **Permiso de Combeau** sigue siendo verbal (`desvios/home.md` §7.12). La página del caso no lo dice; no es mío.
8. Tras el corte a la raíz, el `canonical` es `https://spindlelab.cl/trabajo/combeau/` y la página sale sin `noindex` (lo quitó `convertir-a-raiz.mjs`); las URL del JSON-LD ya salían sin `/v3/`. Los comentarios de cabecera de `[caso].astro` e `index.astro` se actualizaron.

## 6 · Ronda 2: el caso lleva el pie (QA defecto 5) y este registro al día (defecto 6)

**Cambio respecto de la spec.** `spec-visual.md` §2 («Lo común», 2) dice «el caso no tiene pie» y cierra con «Siguiente»; `spec-home.md` §3.4 dice que el pie cambia en todas las rutas; la política de privacidad dice que el control de cookies y el enlace a ella están «al final de cualquier página». La spec del caso quedó contradicha y yo no lo declaré en la ronda 1 (`PaginaA pie={false}`). **Desde ahora `/trabajo/combeau/` lleva el pie común** (logo, correo con asunto, hora, Chequeo gratis, Política de privacidad con el botón «Cookies», LinkedIn, Instagram), igual que las demás rutas. Es un desvío declarado respecto de la spec §2.

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| `Caso.astro`: `<PaginaA>` sin `pie={false}`; la cabecera del archivo dice por qué | El caso no ofrecía control de cookies ni enlace a `/privacidad/` tras contestar el aviso | QA defecto 5; `ronda-2-correcciones.md` fila 5 |
| `archivo.css`: la regla que ya usaba el artículo del blog para convivir con la barra flotante y el pie pasa de `.articulo` a `.caso` (`.caso { padding-bottom: 0 }` y `.a-pagina:has(.caso) { padding-bottom: 96px }`, bajo 1194). El artículo es `class="caso articulo"`: el blog queda igual. Más el comentario del pie sin «los casos no llevan pie» | Bajo el pie la página deja el alto de la barra; con el aviso abierto, el pie ya reservaba el alto del aviso (`.pie-sitio` con `padding-bottom` por tramo) y `caso.mjs` sube la barra sobre el aviso con `--a-alto-aviso`. Ningún valor nuevo: se reutiliza lo medido para el blog | `archivo.css` (bloque «nada tapado por lo fijo» y el del blog) |
| Comentarios de `[caso].astro` e `index.astro` al día (raíz, sin `noindex`, portadas parejas); `ALTO` y `PORTADAS` sin la rama `p-45` | Estaban desactualizados tras `452f3bac` y `1c65e6a6` | defecto 6 |

**Medido** (`construir.sh trabajo`; script `scratchpad/herr/medir-cierre.mjs`: al final de la página comprueba que el botón del cierre, el corchete y todos los enlaces del pie, con «Cookies», estén enteros y que `elementFromPoint` en su centro y en las cuatro esquinas no devuelva el aviso, la barra ni el encabezado; después recorre la página entera con Tab y hace la misma prueba con cada elemento que recibe el foco, esperando 450 ms por si hay scroll animado; «abierto» = sin elección guardada, «cerrado» = `localStorage.spindlelab_consent = 'denied'`).

| Ancho | Antes (sin pie), aviso abierto | Después, aviso abierto | Después, aviso cerrado |
|---|---|---|---|
| 360 | `[ Todo el trabajo ]` tapado por el aviso; botón del cierre tapado por la barra; con Tab, «Pedir la revisión» y «Todo el trabajo» tapados (2) | 0 tapados; 26 elementos con Tab; fin de página a 5.287/5.287 px con el pie, «Política de privacidad · Cookies», LinkedIn e Instagram a la vista sobre la barra y el aviso | 0 tapados; 23 con Tab |
| 390 | ídem (2 tapados con Tab) | 0 tapados; 26 con Tab | 0 tapados; 23 con Tab |
| 768 | `[ Todo el trabajo ]` tapado por la barra y el aviso; 1 tapado con Tab | 0 tapados; 26 con Tab | 0 tapados; 23 con Tab |
| 1440 | 0 (sin barra, aviso de 69 px) pero sin pie | 0 tapados; 31 con Tab | 0 tapados; 28 con Tab |

- El «antes» se reconstruyó volviendo a poner `pie={false}` y `.articulo` en una copia de prueba: reproduce el defecto de la QA a 360, 390 y 768.
- Con el aviso cerrado, `#cookie-preferencias` existe a los cuatro anchos (antes: 0). Con el aviso abierto, el botón «Cookies» también está, porque el pie ya lo trae.
- `verificar.mjs --prefijo /trabajo/` a 360, 390, 768 y 1440: «Sin hallazgos» (2 páginas cada vez).
- `enlaces.mjs dist`: 24 páginas, 711 referencias, 0 rotas. `barrer-terminos.mjs --solo '^trabajo'`: cero salvo el «motor» ×2 de la sección 5, punto 3. JSON-LD de las dos páginas, parseado.
- No es un defecto nuevo, y no lo toqué: a 360 y 390 el área de toque del correo del pie roza 2 px a la hora (se repite en `/servicios/` y en el blog; el pie es de Diego-home).
- Capturas: `.../scratchpad/capt-cierre-despues/fin-{abierto,cerrado}-{360,390,768,1440}.jpg` (antes: `capt-cierre-antes/`).
- **Queda sin tocar, de otro dueño:** `PaginaA.astro` conserva la prop `pie` (con su comentario «Los casos no tienen pie») y `Pie.astro` dice en su cabecera «Los casos no llevan pie: PaginaA lo omite con pie={false}». Ninguna ruta pasa ya `pie={false}`: la prop y las dos frases quedaron viejas.
