# Desvíos de Clara: tres correcciones al sitio publicado (2-nov)

**Clara (copy de interfaz), 2-nov-2026.** Rama `claude/magical-franklin-ckfki2`, sobre `5dd37d8d`.
**Qué se hizo:** se pasaron al texto las tres correcciones que Ramón decidió sobre el sitio ya publicado: una frase de «Quién
está detrás» y de /nosotros/, dominio y código, y el cargo. El mapa exacto (archivo, clave, texto actual y nuevo) es el del
encargo de la troncal, `marketing/encargos-otras-sesiones/encargo-sitio-tres-correcciones-2nov.md` (en `origin/main`), §2.
Se siguió tal cual.

**Archivos:**
- fuentes en `e13/texto/`: `home`, `nosotros`, `blog`, `desarrollo-web` y `comun` (solo un `por_que`);
- sus copias con huella en `spindlelab-astro/src/data/archivo/texto/`, regeneradas con `extraer-texto.mjs`;
- `spindlelab-astro/public/llms.txt`, líneas 5 y 33;
- fuera de lo publicado: `e13/herramientas/portada-30oct.mjs` (`PROY.pie`), `e13/herramientas/barrer-terminos.mjs` (un
  término nuevo) y `spec-visual.md` (fila 6 de la tabla de la home).

Cada elemento que cambió lleva en su JSON `estado: "cambia"`, `antes`, `por_que` y `origen` con la decisión y su fecha.

## 1 · Qué cambié, por qué, de dónde sale

| # | Qué cambié | Por qué | De dónde sale |
|---|---|---|---|
| 1a | `home.quien.p2`: «casi nunca en el anuncio, casi siempre en el lugar al que el anuncio lleva» pasa a «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva». El resto del párrafo, igual | Ramón no dejó escrita la razón. Lectura mía, no suya: «casi nunca» y «casi siempre» afirmaban una proporción sin dato, como la frase que ya salió de /diagnostico/ (`fuentes/desvios-v2.md`). Cambia el tono, no la idea | Decisión de Ramón, aprobada el 2-nov-2026 (puede afinarla después) |
| 1b | `nosotros.idea.1`: la misma cláusula, cambiada igual | Es la gemela de 1a | Ídem |
| 2a | `home.problema.sitio.2`: «Va en tu dominio.» pasa a «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» Corregidos su `nota`, `fuente` y `origen`, que decían que «a tu nombre» no estaba confirmado | Es el argumento de propiedad de la columna «En tu sitio». Las palabras son la propuesta de la troncal y Ramón puede ajustarlas | Ramón confirmó el 30-oct-2026; aplicado el 2-nov |
| 2b | `dw.incluye.7`: suma «a tu nombre» y la oración «Te entregamos el código completo.» Su `condicion` (si el plan incluye comprar el dominio) sigue abierta | Que la página del servicio no diga menos que la portada. Sin hosting, licencias ni plazos: no están confirmados | Ídem |
| 3a | `home.quien.pie`: «Ramón Vallejos · Fundador de SpindleLab» | El cargo es «Fundador», sin «director» | Decisión de Ramón, 2-nov-2026 |
| 3b | `nosotros.json`, `title` (y con él el `og:title`): «Ramón Vallejos, fundador · SpindleLab» (37 caracteres; antes 48). El cambio se anota al final de `senales` | Ídem. El guardián de largos (`interiores.mjs`, title ≤ 60) pasa | Ídem |
| 3c | `nosotros.rol`: «Ramón Vallejos · Fundador de SpindleLab · Chile» | Ídem | Ídem |
| 3d | `articulo.autor` (los 7 artículos, una sola clave): «Ramón Vallejos · Fundador de SpindleLab». Vuelve a la firma de antes del 30-oct | Ídem | Ídem |
| 3e | `llms.txt` línea 5: «lo dirige Ramón Vallejos, su fundador, que viene…» | Ídem | Ídem |
| 3f | `llms.txt` línea 33: «Ramón Vallejos, fundador de SpindleLab: de dónde viene…» | Ídem | Ídem |
| 3, registro | `comun.entidad.cargo`, solo su `por_que`: la firma corta ya no dice «director». El `texto` (jobTitle) no cambia: nunca lo dijo | Que el registro no mienta | Ídem |
| 3, registro | En 3a, 3c y 3d se reescribió el `origen`. Antes atribuía el cargo con «director» a «Decisión de Ramón, 30-oct» | Según la troncal, el 30-oct Ramón dijo «dejar en fundador» y el sitio salió con «Fundador y director». Si el registro no se corrige, la próxima pasada cree que «director» fue lo decidido | Encargo de la troncal, §2 |
| 3, fuera de lo publicado | `portada-30oct.mjs`, `PROY.pie`; `spec-visual.md`, fila 6 de la home; término nuevo en `barrer-terminos.mjs`: `['cargo con «director»', /fundador y director\|director de SpindleLab/gi]` | Que la herramienta mida con el cargo de hoy y que el barrido lo atrape si vuelve. El término no toca «directorios» | Ídem |

**Lo que se queda a propósito:**
- **El verbo «dirige»** (`home.quien.p1`, `nosotros.description`, `llms.txt` línea 5). La decisión es sobre el cargo. Si Ramón
  prefiere otro verbo, es una palabra en cada uno (encargo §5).
- **`PROY.quien` de `portada-30oct.mjs`** sigue con «casi nunca en el anuncio…». Es el texto base del 30-oct que esa
  herramienta inyecta para fijar el techo de alto, no el texto publicado (ya difería antes de hoy). El encargo pidió solo
  `PROY.pie`.
- **La historia no se reescribe:** `e13/lectura-fria/`, `desvios/texto-30oct.md`, `copy/sitio-propio-direcciones.md` y
  `acta-qa-30oct.md` quedan como están. Lo que corrigen está aquí.

## 2 · 2a en una fila, no en dos

El encargo ofrecía partir la fila nueva en dos (`home.problema.sitio.2` «Va en tu dominio, a tu nombre.» y una nueva
`home.problema.sitio.5` «Te entregamos el código completo.»), y decía que no hacía falta tocar código. **Sí hacía falta:**
`index.astro` tiene un guardián que cae si la lista más larga deja de tener 4 filas («home, sección 2: la lista más larga ya no
tiene 4 filas»), y la regla `.int-par` de `archivo.css` cuenta 4 filas desde 834 (`repeat(4, auto)` y `grid-area … / 6 / …`,
`spec-home.md` §12.2). Partirla obligaba a Diego a tocar las dos cosas y a volver a medir una sección de 5 filas contra 3.

Va en una fila. **Medido** sobre el build de esta rama contra uno de `origin/main`, en Chromium sin cabeza, sección 2 de `/`:

| Ancho | Líneas de la fila nueva | Alto de la sección (main → rama) | Filetes entre columnas | Desborde |
|---|---|---|---|---|
| 390 | 2 | 843 → 864 | apiladas | 0 |
| 768 | 1 | 787 → 787 | apiladas | 0 |
| 834 | 2 | 640 → 661 | alineados | 0 |
| 1024 | 2 | 625 → 646 | alineados | 0 |
| 1194 | 2 | 602 → 623 | alineados | 0 |
| 1440 | 2 | 606 → 627 | alineados | 0 |

A 1440 la fila corta en «Va en tu dominio, a tu nombre. Y te / entregamos el código completo.», con el mismo alto que «La
plataforma decide a quién le muestra lo / que publicas.» en la otra columna: la columna no se rompe. Son 21 px más de alto.
Las mediciones de Diego (`portada-30oct.mjs` sin `--inyectar`) y de Javiera (peso, lectura en frío) siguen siendo suyas.

## 3 · Lo que esto cierra (sin reescribir donde estaba abierto)

- **`copy/sitio-propio-direcciones.md`** (las líneas «Por confirmar con Ramón antes de escribirlo», la fila «Va en tu dominio
  *(«a tu nombre», si Ramón lo confirma)*» y la pregunta 3, «Dos hechos»): **cerrado.** Ramón confirmó el 30-oct que el
  dominio queda a nombre del cliente y que el código se entrega completo; lo dijo de nuevo en el bloque que pegó a esta
  sesión el 2-nov.
- **`desvios/texto-30oct.md` §5, punto 4** («Dos hechos sin confirmar»): **cerrado** por lo mismo. La home dice ahora «Va en
  tu dominio, a tu nombre. Y te entregamos el código completo.»
- **El cargo** (`texto/convenciones-e12.json`, `afirmaciones_por_verificar`, «El cargo de Ramón («Fundador de
  SpindleLab…»)»): lo confirmó Ramón el 2-nov. Ese archivo no se copia al sitio y no lo toqué.

## 4 · Verificación

| Qué | Comando | Resultado |
|---|---|---|
| Copias iguales a sus fuentes | `node e13/herramientas/extraer-texto.mjs home nosotros blog comun desarrollo-web` y luego `--comprobar` | 16 «igual», sale con 0 |
| Build con los guardianes | copia de `spindlelab-astro/` en el scratchpad, `node_modules` enlazado, `npx astro build` | 22 páginas, sin errores |
| Cero cargo viejo y cero frase vieja | `grep -ri "fundador y director"` y `grep -r "casi nunca en el anuncio"` sobre el `dist` (con `llms.txt`) | 0 y 0 |
| Textos nuevos, exactos | `grep -F` de cada uno en el `dist` | la cláusula nueva en `/` y `/nosotros/`; la fila en `/`; «Fundador de SpindleLab» como pie en `/`, firma en `/nosotros/` y `autor__rol` en los 7 artículos; title y og:title de `/nosotros/`; la línea nueva en `/servicios/desarrollo-web/` |
| Barrido de términos, con el nuevo | `barrer-terminos.mjs dist --resumen` | «cargo con «director»»: 0 (sobre el build de `origin/main`, el mismo término da 13 en 10 archivos: `/` 1, `/nosotros/` 3, cada artículo 1, `llms.txt` 2, lo que contó la troncal en vivo); rayas largas o medias: 0. Los otros términos, idénticos a `origin/main` (mini-diagnóstico solo en la URL y la imagen del artículo, «motor de IA», «agentes de IA» solo en Quién está detrás de `/` y `/nosotros/`) |
| Precios, enlaces y rutas contra `origin/main` | build de `git archive origin/main` y diff de `$…`, `minPrice`/`price`, todos los `href` y la lista de `.html` | iguales; 24 `.html` en los dos |
| Qué páginas cambian | `cmp` de cada `.html` contra `origin/main` | `/`, `/nosotros/`, los 7 artículos y `/servicios/desarrollo-web/`. `/trabajo/combeau/` difiere solo en el nombre de un `hoisted.*.js` (las dos versiones importan lo mismo en otro orden: no es texto). Fuera del HTML, `llms.txt` y el `sitemap.xml` (la rama trae el sitemap viejo; el corte lo regenera) |
| Imágenes para compartir | mirada a `og-e12-nosotros.jpg`, `og-e12-marca.jpg` y `og-e12-blog-que-es-aeo-geo.jpg`, y búsqueda de «director» en los generadores de `e13/herramientas/` | ninguna lleva cargo; ningún generador lo escribe (el único «director» estaba en `portada-30oct.mjs`, que mide, no genera imágenes) |

## 5 · Qué quedó abierto

- **Las palabras de 2a y 2b** son la propuesta de la troncal. Ramón puede ajustarlas; el hecho (dominio a nombre del cliente,
  código completo) es suyo.
- **La frase de 1a y 1b** la aprobó Ramón y puede afinarla después.
- **El verbo «dirige»**, si Ramón lo quiere cambiar (encargo §5).
- **QA de Javiera** en conversación aparte, el corte y el PR: los hace la orquestadora. Nada de esto se publicó.

## 6 · Construcción y medición (Diego, 2-nov)

**Diego (diseño y desarrollo web), 2-nov-2026.** Sobre `d97814c6` (el commit de Clara, igual en `origin`). No toqué texto
ni código del sitio: esta sección es solo lo medido. Ningún guardián cayó, así que no hubo nada que arreglar.

**Cómo.** Dos copias limpias en el scratchpad, cada una con `node_modules` enlazado: `git archive HEAD spindlelab-astro` (la
rama) y `git archive origin/main spindlelab-astro` (`cd16cf71`, que ya trae el PR #55 de la troncal). Entre las dos, el árbol
`spindlelab-astro/` difiere solo en los 5 JSON de texto de Clara, `llms.txt` y el sitemap (`git diff --stat`). Los dos `dist`
servidos con `python3 -m http.server` en 127.0.0.1 (puertos 8761 y 8762, PID guardado y cerrado con `kill` al terminar).
**Chromium 1243** (`/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`): el 1194 que traen fijo las herramientas no
existe en este contenedor. `peso-30oct.mjs` lo recibe con `--chrome`; `portada-30oct.mjs` no tiene esa opción y la corrí
desde una copia en el scratchpad con **solo esa línea cambiada** (`diff`: la línea 107). La herramienta de la obra no la toqué.
Lo que dejaron las herramientas está en `e13/medicion-2nov/`.

| # | Qué | Comando | Resultado |
|---|---|---|---|
| 1 | Build y guardianes | `npx astro build` en las dos copias | **22 páginas** en las dos, sale con 0. Los guardianes son `throw` que corren en el build (`index.astro`, `interiores.mjs`, `blog.mjs`, `servicios.mjs`, `texto.mjs`, las plantillas de servicios y trabajo): ninguno cae, incluido el de las 4 filas de la sección 2 |
| 1b | Copias iguales a sus fuentes | `extraer-texto.mjs --comprobar` en la rama | 16 «igual», sale con 0 |
| 2 | `verificar` | `node scripts/verificar.mjs --excluir /privacidad/` (390), `… --ancho 768`, `… --ancho 1440` | **«Sin hallazgos»** en los tres, 22 páginas, sale con 0. A 1440, 6 nodos sobre imagen o degradado (la portada), igual que el 30-oct |
| 3 | **Peso, primera carga a 1440** | `peso-30oct.mjs <url> --ancho 1440 --chrome <1243>`, tres corridas por build | **Rama: 1.398,8 kB (1.398.800 bytes) las tres.** `origin/main`: 1.398.764 las tres, el número exacto del acta del 30-oct: la herramienta sigue calibrada con el Chromium nuevo. **+36 bytes**, que son justo lo que crece el HTML de la home (39.564 → 39.600; la fila de 2a suma, la frase de 1a y el cargo de 3a restan). Tope 1.400 kB: **no cruza. Margen: 1.200 bytes** (antes 1.236). La fila va entera, como la dejó Clara: no hizo falta partirla |
| 3b | Peso, recorrida a 1440 | `… --ancho 1440 --recorrer`, dos corridas | Rama **1.561,6 kB** (1.561.648) ≤ 1.600; `origin/main` 1.561.612 |
| 3c | Peso a 390 × 844 | `… --ancho 390 --alto 844`, dos corridas | Rama **755,5 kB** (755.517) ≤ 950; `origin/main` 755.481 |
| 4 | Sección 2, con la fila nueva | `portada-30oct.mjs <url> <salida>` **sin** `--inyectar`, sobre los dos builds | Tabla de abajo: filetes alineados (desfase 0 · 0 · 0) desde 834 y 0 desborde en los 8 anchos. Capturas miradas a 390, 834 y 1440 (`e13/medicion-2nov/s2-*.png`) |
| 4b | Primera pantalla y encabezado | la misma corrida | **Idénticos al décimo** entre los dos builds (`diff` vacío fuera de la sección 2 y del alto): con el aviso abierto, margen del botón 181,1 · 227,2 · 54,6 a 360 × 800, 390 × 844 y 1440 × 900, 0 de 5 puntos tapados |
| 4c | Alto de la home | la misma corrida | **7.459 · 7.423 · 9.355 · 8.972** (1440 · 1024 · 768 · 390), bajo los techos del criterio 5 (7.800 · 7.800 · 9.700 · 9.300). Son 21 px más que `origin/main` en cada ancho salvo 768 (la fila cabe en una línea) |
| 5 | Imágenes para compartir y retratos | hojas de contacto de las 22 `og-e12-*.jpg` del `dist` y de los 3 retratos (`ramon-vallejos-avatar.jpg`, `ramon-vallejos.jpg`, `v3/medios/ramon-vallejos-34.webp`), miradas una por una; `cmp` contra `origin/main`; lectura de `og-30oct.mjs` | **Ninguna lleva el cargo.** Las tarjetas llevan logo y titular (las 6 de servicio suman su precio; `/trabajo/` y `/trabajo/combeau/`, capturas de los casos); el rótulo mono solo en la de la home. Los retratos son fotos sin texto. Idénticas byte a byte a las de `origin/main`: no se rehacen ni se les sube el `?v=`. `og-30oct.mjs` lee solo `home.portada.rotulo`, `home.portada.h1`, `nosotros.h1` y `contacto.h1` |
| 6 | **Precios contra `origin/main`** | script en el scratchpad sobre los dos `dist`, archivo por archivo: cada importe `$…` del texto (fuera de `<script>`) y cada clave con «price» de cada JSON-LD parseado | **Idénticos.** 93 importes visibles en 10 archivos y 30 valores de JSON-LD (`price`, `minPrice`, `priceCurrency`) en 6 archivos: 0 diferencias. Los `href` de los 24 HTML, también: 909, 0 diferencias |
| 6b | Qué páginas cambian | `diff -rq` de los dos `dist`, y luego cada HTML con los nombres `hoisted.*.js` igualados | Texto distinto solo en `/`, `/nosotros/`, los 7 artículos, `/servicios/desarrollo-web/` y `llms.txt` (más el `sitemap.xml`, que el corte regenera). Ver la nota de abajo sobre el JS |
| 6c | Textos y barrido | `grep` sobre el `dist`; `barrer-terminos.mjs <dist> --resumen` en los dos | 0 «fundador y director» (sin importar mayúsculas, con `llms.txt`), 0 «casi nunca en el anuncio». La cláusula nueva 1 vez en `/` y 1 en `/nosotros/`; la fila de 2a 1 vez en `/`; la línea de 2b 1 vez en `/servicios/desarrollo-web/`; el title nuevo en `/nosotros/`. El barrido solo difiere en «cargo con «director»»: 0 en la rama, 13 en 10 archivos en `origin/main`; rayas largas o medias, 0 |

**Sección 2, medida sobre el build** (`e13/medicion-2nov/seccion-2.txt` y `.json`):

| Ancho | Líneas de la fila nueva | Alto de la sección (main → rama) | Filetes entre columnas | Fuera · desborde |
|---|---|---|---|---|
| 360 | 2 | 863,6 → 883,9 | apiladas | 0 · 0 |
| 390 | 2 | 843,4 → 863,6 | apiladas | 0 · 0 |
| 768 | 1 | 787 → 787 | apiladas | 0 · 0 |
| 834 | 2 | 640,3 → 661,1 | 0 · 0 · 0 | 0 · 0 |
| 1024 | 2 | 625 → 646,1 | 0 · 0 · 0 | 0 · 0 |
| 1194 | 2 | 601,6 → 622,9 | 0 · 0 · 0 | 0 · 0 |
| 1440 | 2 | 605,5 → 627,1 | 0 · 0 · 0 | 0 · 0 |
| 1920 | 2 | 562,3 → 583,9 | 0 · 0 · 0 | 0 · 0 |

Lo mismo que midió Clara a 390, 768, 834, 1024, 1194 y 1440. A 1440 la fila corta en «Va en tu dominio, a tu nombre. Y te /
entregamos el código completo.» y comparte alto con «La plataforma decide a quién le muestra lo / que publicas.»; a 390, en
«…Y te entregamos el / código completo.».

**Notas para Javiera** (no son defectos que yo haya encontrado; son cosas que conviene saber al medir):

- **El JS compartido sale con otro nombre en cada build.** Los `hoisted.*.js` de los dos `dist` tienen nombres distintos y el
  trozo común (78.123 bytes en los dos) trae los mismos bytes en otro orden (mismo tamaño y mismos bytes ordenados). Ningún
  archivo de código cambió entre `origin/main` y la rama (`git diff --stat` solo muestra JSON, `llms.txt` y el sitemap), así
  que es el orden en que Rollup arma el trozo, no texto. Por eso un `diff -rq` crudo marca las 22 páginas: hay que comparar
  con los nombres igualados.
- **A 1920** (fuera del criterio 5, que mide 4 anchos) la home mide 7.799 en la corrida de la sección 2 de `portada-30oct.mjs`
  (`origin/main`, 7.777).
- **Chromium 1194 no está** en este contenedor: `portada-30oct.mjs` (y `og-30oct.mjs` sin argumento) lo piden por ruta fija.

**Qué quedó abierto (de construcción):**

- **El margen de peso de la home queda en 1.200 bytes.** Lo siguiente que pesa sin aportar sigue siendo el logo en línea dos
  veces (`spec-home.md`, criterio 10). Cualquier texto que se sume a la home se vuelve a medir con `peso-30oct.mjs`.
- La QA de Javiera en un subagente nuevo (con su lectura en frío, si la pide), el corte con el sitemap regenerado y el PR: los
  hace la orquestadora. Nada se publicó.
