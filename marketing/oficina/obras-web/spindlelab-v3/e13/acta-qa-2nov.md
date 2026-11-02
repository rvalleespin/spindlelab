# Acta de QA · SpindleLab, sitio publicado · tres correcciones del 2-nov · QA exprés

> La escribe Javiera (`/web-qa-critico`) en contexto limpio (subagente), a pedido de la orquestadora, el 2-nov-2026. Leyó el
> encargo de la troncal (`marketing/encargos-otras-sesiones/encargo-sitio-tres-correcciones-2nov.md`, leído de `origin/main`),
> `desvios/texto-2nov.md` (Clara, §1 a §5, y Diego, §6), la fila del 2-nov de `spec-home.md` §11, el criterio 4 del brief y la
> vuelta 3 de `acta-qa-30oct.md` para medir igual que entonces. El encargo de la orquestadora traía los resúmenes finales de
> Clara y de Diego (qué hicieron y qué midieron); no vi sus conversaciones, y todo lo de abajo lo medí de nuevo sobre mis
> propias copias. No arreglé nada: escribo esta acta, `capturas-qa-2nov/` y `lectura-fria/2nov/`, que son la evidencia.

**Fecha:** 2-nov-2026 · **Rama:** `claude/magical-franklin-ckfki2` · **Commit auditado:** `e6067c6b` (HEAD, igual a `origin`,
árbol limpio). **Comparado contra:** `origin/main` `cd16cf71` (lo publicado, con el PR #55 de la troncal). Las dos copias salen
de `git archive` a un directorio del scratchpad, con `node_modules` enlazado, y se construyen con `npx astro build`. Node
v22.23.4 (producción usa Node 20: sin ensayar). Chromium 1243 de Playwright: el 1194 que piden las herramientas de la obra no
está en este contenedor. Los dos `dist` se sirvieron en local con `python3 -m http.server` (127.0.0.1:8771 la rama y :8772
`main`), sin compresión, como en las vueltas del 30-oct.

## Veredicto

**APROBADO.**

Las tres correcciones que decidió Ramón están en el `dist` **palabra por palabra**, y no cambió nada más. Entre los dos `dist`
difieren **12 de 135 archivos**: los 10 HTML esperados (`/`, `/nosotros/`, `/servicios/desarrollo-web/` y los 7 artículos),
`llms.txt` y `sitemap.xml` (la rama trae el sitemap viejo; ver menor 1). En esos 10 HTML, el diff por palabras muestra **solo
las palabras decididas**. El CSS, el JS (en mis dos builds, hasta con los mismos nombres de `hoisted`), las imágenes y las
otras 12 páginas son **idénticos byte a byte**. Cero «fundador y director», cero «director de SpindleLab» y cero «casi nunca
en el anuncio» en el `dist` y en `llms.txt`.

**El peso de la home se sostiene:** **1.398,8 kB** (1.398.800 bytes) en primera carga a 1440, tres corridas iguales, bajo el
tope de 1.400. Margen: **1.200 bytes**. `origin/main` da 1.398.764 en las tres, el número de la vuelta 3 del 30-oct, así que
la herramienta sigue calibrada con este Chromium. Precios visibles, campos de precio del JSON-LD, enlaces, `canonical`,
description y JSON-LD completo: **iguales** a `origin/main` en las 22 páginas. Lo protegido y `Layout.astro`: 0 bytes de
diferencia.

**Lectura en frío:** «a tu nombre» no hace tropezar a nadie, y el cargo tampoco. **«Te entregamos el código completo» hace
preguntar a los tres «¿y qué hago yo con un código?»**, aunque dos de ellos lo citan como algo que les da confianza. La frase
nueva de «Quién está detrás» no la cita nadie, ni a favor ni en contra. Las palabras de la fila son una propuesta de la
troncal que Ramón puede ajustar, así que esto va a «Decisiones de Ramón», no a defectos.

Conteo: **0 bloqueantes · 0 mayores · 1 menor (documento) · 0 desvíos no declarados.**

## Cómo se verificó

| # | Qué | Comando o herramienta | Resultado |
|---|---|---|---|
| 1 | Texto con huella | `node marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/extraer-texto.mjs --comprobar` (en el repo) | **16 de 16 «igual»**, sale con 0 |
| 2 | Build | `npx astro build` en la copia de `e6067c6b` y en la de `cd16cf71` | **22 páginas** en cada una (3,64 s y 3,83 s), salen con 0, sin errores ni avisos en el log. No cae ningún guardián, incluido el de las 4 filas de la sección 2 de `index.astro` |
| 3 | Qué cambió en el árbol del sitio | `git diff --stat origin/main HEAD -- spindlelab-astro` | **7 archivos**: las 5 copias de `src/data/archivo/texto/` (`blog`, `comun`, `desarrollo-web`, `home`, `nosotros`), `public/llms.txt` y `public/sitemap.xml`. Ningún `.astro`, `.mjs`, `.css` ni `.js` |
| 4 | Qué cambió en el `dist` | `diff -rq` de los dos `dist` | **12 de 135 archivos**: 10 `index.html`, `llms.txt` y `sitemap.xml`. Todo `_astro/` (CSS y JS, con los mismos 7 `hoisted.*.js` y el mismo nombre en los dos builds), las imágenes, los videos y las otras 12 páginas, idénticos |
| 5 | Cargo y frase viejos | `grep -rIoi` sobre los dos `dist` (incluye `llms.txt`, `robots.txt`, `sitemap.xml`) | Rama: **0** «fundador y director», **0** «director de SpindleLab», **0** «casi nunca en el anuncio», **0** «casi siempre». `main`: 13 · 10 · 2 · 2. Las 9 apariciones de «director» que quedan en la rama son todas «directorios» (texto de los artículos, Visibilidad en IA y `/diagnostico/`) |
| 6 | Texto visible de las 22 páginas | mi `textos.mjs` (Playwright: `innerText`, `title`, metas `og:` y `twitter:`, `canonical`, `h1`, `textContent`, JSON-LD y `href` de cada ruta del sitemap, a 1440) sobre los dos builds, y `comparar.py` | **Difieren 10 rutas, las esperadas.** Las líneas distintas son solo las de la tabla «Las tres correcciones en el `dist`». En `textContent` (que incluye lo oculto) no aparece ninguna otra diferencia. Las otras 12 rutas, idénticas |
| 7 | Diff por palabras del HTML crudo | `git diff --no-index --word-diff` de cada uno de los 10 HTML y de `llms.txt` | `/`: «dominio.» → «dominio, a tu nombre. Y te entregamos el código completo.», «y director» fuera, «casi nunca» → «muchas veces no», «casi siempre» → «sino». `/nosotros/`: tres veces «y director» fuera (`title`, `og:title`, firma) y la misma cláusula. Desarrollo web: «a tu nombre,» y «Te entregamos el código completo.» añadidos. Cada artículo: «y director» fuera, una vez. `llms.txt`: «fundador y director,» → «fundador,» y «y director» fuera. **Nada más** |
| 8 | `verificar` a 390 | `node scripts/verificar.mjs --ancho 390 --excluir /privacidad/` (en la copia de la rama) | 22 páginas, **«Sin hallazgos»**, sale con 0 |
| 9 | `verificar` a 768 | `… --ancho 768 --excluir /privacidad/` | 22 páginas, **«Sin hallazgos»**, sale con 0 |
| 10 | `verificar` a 1440 | `… --ancho 1440 --excluir /privacidad/` | 22 páginas, **«Sin hallazgos»**, sale con 0 (6 nodos sobre imagen o degradado: la portada, igual que el 30-oct) |
| 11 | **Peso, primera carga a 1440** | `node e13/herramientas/peso-30oct.mjs http://127.0.0.1:8771/ --ancho 1440 --chrome /opt/pw-browsers/chromium-1243/chrome-linux64/chrome`, tres corridas por build | **Rama: 1.398.800 bytes las tres (1.398,8 kB)** ≤ 1.400 kB. `main`: 1.398.764 las tres, el número de la vuelta 3 del 30-oct: la herramienta sigue calibrada. Diferencia **+36 bytes**, lo mismo que crece el HTML de la home (39.564 → 39.600 bytes). **Margen: 1.200 bytes** (antes 1.236) |
| 12 | Peso, recorrida y a 390 | la misma, `--recorrer`, y `--ancho 390 --alto 844`, dos corridas cada una | Recorrida **1.561,6 kB** (1.561.648) ≤ 1.600; a 390 **755,5 kB** (755.517) ≤ 950. Iguales en las dos corridas |
| 13 | Sección 2 | `portada-30oct.mjs <url> <salida>` **sin** `--inyectar`, sobre los dos builds, desde una copia en el scratchpad con **solo la línea 107 cambiada** (la ruta del navegador; `diff` de una línea) | Tabla de abajo: filetes alineados (0 · 0 · 0) desde 834, **0 fuera y 0 desborde** en los 8 anchos |
| 14 | Primera pantalla y encabezado | la misma corrida, `diff` de las dos salidas | **Idénticos al décimo** entre los dos builds: el `diff` solo trae las líneas de la sección 2 y del alto. Con el aviso abierto, margen del botón 227,2 a 390 × 844 y 54,6 a 1440 × 900; 0 de 5 puntos tapados en los 11 tamaños; el encabezado plegado, dentro de la placa en los 8 anchos |
| 15 | Alto de la home (criterio 5 de `spec-home.md`) | la misma corrida | **7.459 · 7.423 · 9.355 · 8.972** (1440 · 1024 · 768 · 390), bajo los techos 7.800 · 7.800 · 9.700 · 9.300. Son 21 px más que `main` a 1440, 1024 y 390, y lo mismo a 768 |
| 16 | Barrido de términos | `node e13/herramientas/barrer-terminos.mjs <dist> --resumen` en los dos | Rama: **0 rayas largas o medias**, **0 «cargo con «director»»**, 130 hallazgos en 31 archivos. `main`: 143; la **única** diferencia es el término del cargo (13 en 10 archivos: `/` 1, `/nosotros/` 3, cada artículo 1, `llms.txt` 2). Los demás términos, línea por línea iguales |
| 17 | Importes | mi `importes_enlaces.py`: cada `$NNN.NNN` del texto visible (sin `<script>` ni `<style>`) y cada campo con «price» del JSON-LD parseado, archivo por archivo, en los `.html`, `.txt` y `.xml` de los dos `dist` | **82 importes visibles en 10 archivos y 30 campos de precio del JSON-LD en 6 archivos; 0 archivos con diferencia** contra `main`. (Diego cuenta 93 visibles con otro patrón; lo que importa es la diferencia, y es 0 con los dos) |
| 18 | Enlaces internos | el mismo script: `href`, `src`, `srcset`, `poster` e imagen de `og:`, y cada `#ancla` contra los `id` de su destino | 24 páginas, **935 referencias, 0 que no resuelven, 0 anclas sin destino** (el mismo número de la vuelta 3). Los `href` de las 22 rutas, **idénticos** a `main`, en el mismo orden |
| 19 | JSON-LD y señales | `comparar.py` sobre lo que sacó `textos.mjs`: cada bloque con `json.loads` y comparado ya parseado | **44 bloques, 0 que no parsean**, idénticos a `main` en las 22 rutas. `jobTitle` = «Fundador de SpindleLab: sitios web a medida y marketing con IA» en los 22 archivos que lo traen (`grep -rhoI '"jobTitle":"[^"]*"'`, un solo valor). `canonical` y description, iguales. Metas `og:`: cambia solo `og:title` de `/nosotros/` |
| 20 | Protegidos | `git diff origin/main HEAD -- spindlelab-astro/functions spindlelab-astro/public/_headers spindlelab-astro/public/_redirects spindlelab-astro/public/js` | **0 bytes**. `public/assets/js`: 0 bytes |
| 21 | `Layout.astro` | `git diff origin/main HEAD -- spindlelab-astro/src/layouts/Layout.astro` y `git rev-parse` de los dos blobs | **0 bytes**; el mismo blob `b91e1a94` en los dos: gtag, consentimiento y Pixel sin tocar |
| 22 | Desborde, medido en la página | mi `piezas.mjs`: `scrollWidth` contra `clientWidth`, con la página recorrida, en las 10 rutas que cambian × 360, 390, 768, 1024, 1440 y 1920 | **0 de 60** con desborde |
| 23 | Foco por la home | el mismo script: Tab desde arriba hasta repetir, a 1440 × 900 y 390 × 844, con el aviso abierto y contestado; indicador = `outline` con ancho o `box-shadow` | 28 paradas a 1440 y 27 a 390; **0 sin indicador** en las 4 pasadas. (No medí esta vez si alguna parada queda tapada: la vuelta 3 lo midió con el mismo CSS y el mismo HTML de enlaces) |
| 24 | Imágenes al compartir y retratos | hojas de contacto de las 22 `og-e12-*.jpg` del `dist` y de los 3 retratos (`ramon-vallejos-avatar.jpg`, `ramon-vallejos.jpg`, `v3/medios/ramon-vallejos-34.webp`), miradas una por una; `diff -rq` contra `main`; `grep -rhoE 'og-e12-…\.jpg\?v=…'` | **Ninguna lleva el cargo.** Las tarjetas llevan logo y titular; las 6 de servicio, su precio; la de la home, el rótulo mono; `/trabajo/` y Combeau, capturas de los casos. Los retratos son fotos sin texto. Idénticas byte a byte a las de `main`, 22 referencias en una sola versión cada una: no se rehacen ni se les sube el `?v=` |
| 25 | Lectura en frío | `lectura-fria-texto.mjs` (texto de `/` y `/contacto/` del build de la rama; copia con **solo** la ruta del navegador cambiada, línea 27) y `python3 -I lectura-fria.py` (`claude -p` en un directorio vacío, sin herramientas, skills, MCP ni ajustes; una conversación por lector), con **las mismas instrucciones** de las vueltas del 30-oct (`instrucciones.txt` copiado de `30oct-v3/`) | La entrada difiere de la de la vuelta 3 **solo en las tres líneas que cambiaron** y en la hora del encabezado (`diff`). Ver «Lectura en frío». Íntegro en `lectura-fria/2nov/` (17:03 UTC) |
| 26 | Capturas | mis `piezas.mjs` y `firma.mjs`, por pieza, después de que se va el aviso de «rechazadas» | `capturas-qa-2nov/01` a `08`, **miradas** una por una (lista al final) |

**Sección 2, medida sobre los dos builds** (`portada-30oct.mjs`, sin `--inyectar`):

| Ancho | Líneas por fila, columna «En tu sitio» (main → rama) | Alto de la sección (main → rama) | Filetes entre columnas | Fuera · desborde |
|---|---|---|---|---|
| 360 | 1/1/1/1 → **1/2/1/1** | 863,6 → 883,9 | apiladas | 0 · 0 |
| 390 | 1/1/1/1 → **1/2/1/1** | 843,4 → 863,6 | apiladas | 0 · 0 |
| 768 | 1/1/1/1 → 1/1/1/1 | 787 → 787 | apiladas | 0 · 0 |
| 834 | 1/1/1/1 → **1/2/1/1** | 640,3 → 661,1 | 0 · 0 · 0 | 0 · 0 |
| 1024 | 1/1/1/1 → **1/2/1/1** | 625 → 646,1 | 0 · 0 · 0 | 0 · 0 |
| 1194 | 1/1/2/1 → **1/2/2/1** | 601,6 → 622,9 | 0 · 0 · 0 | 0 · 0 |
| 1440 | 1/1/2/1 → **1/2/2/1** | 605,5 → 627,1 | 0 · 0 · 0 | 0 · 0 |
| 1920 | 1/1/1/1 → **1/2/1/1** | 562,3 → 583,9 | 0 · 0 · 0 | 0 · 0 |

Lo mismo que midieron Clara y Diego, al décimo. A 1440 la fila corta en «Va en tu dominio, a tu nombre. Y te / entregamos el
código completo.» y comparte alto con «La plataforma decide a quién le muestra lo / que publicas.» de la otra columna; a 390,
en «…Y te entregamos el / código completo.» (mis capturas de la sección, `portada-rama/s2-*.png`, quedaron en el scratchpad; las de Diego, iguales, están en
`medicion-2nov/`).

## Las tres correcciones en el `dist`

| # | Dónde | Lo que se ve en el build de la rama | Veces |
|---|---|---|---|
| 1a | `/`, «Quién está detrás», segundo párrafo | «Ahí vio dónde se pierde lo que una marca invierte para atraer clientes: muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva. SpindleLab parte de esa idea. Construimos el sitio como el eje del negocio y le conectamos la búsqueda, la pauta, las redes y la medición.» El resto del párrafo, igual a `main` | 1 |
| 1b | `/nosotros/`, «De dónde sale SpindleLab» | «En las agencias vio dónde se pierde lo que una marca invierte para atraer clientes: muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva. Un sitio que no explica bien lo que se vende, o un formulario que no avisa cuando alguien escribe, basta para perder lo que costó traer a esa persona.» | 1 |
| 2a | `/`, sección 2, «En tu sitio», fila 2 | «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» En una sola fila: la lista sigue de 4 | 1 |
| 2b | `/servicios/desarrollo-web/`, «En todos los planes», ítem 7 | «Lo publicamos en tu dominio, a tu nombre, con certificado de seguridad (el candado junto a la dirección) y medición de visitas. Te entregamos el código completo. Después tienes 30 días de garantía: si algo no funciona como se aprobó, lo corregimos.» Ni hosting, ni licencias, ni plazos: 0 en el `diff` | 1 |
| 3a | `/`, pie de «Quién está detrás» | «Ramón Vallejos · Fundador de SpindleLab» (en mono, se ve en mayúsculas por CSS) | 1 |
| 3b | `/nosotros/`, `<title>` y `og:title` | «Ramón Vallejos, fundador · SpindleLab» (37 caracteres). No hay `twitter:title` | 2 |
| 3c | `/nosotros/`, la firma | «Ramón Vallejos · Fundador de SpindleLab · Chile», con el nombre en su `span.tinta` antes del primer « · » (el formato que pide `interiores.mjs`) | 1 |
| 3d | Los 7 artículos, firma | `span.tinta` «Ramón Vallejos» + `span.autor__rol` «Fundador de SpindleLab», visible a 390 y a 1440 (13 y 14 px, `capturas-qa-2nov/07` y `08`) | 1 en cada uno |
| 3e | `llms.txt`, línea 5 | «SpindleLab lo dirige Ramón Vallejos, su fundador, que viene de años en agencias de medios y de marketing. …» (el resto de la línea, igual) | 1 |
| 3f | `llms.txt`, línea 33 | «- [Nosotros](https://spindlelab.cl/nosotros/): Ramón Vallejos, fundador de SpindleLab: de dónde viene, cómo trabaja y qué puedes esperar.» | 1 |
| JSON-LD | `#autor-ramon`, en las 22 rutas | `jobTitle` «Fundador de SpindleLab: sitios web a medida y marketing con IA», sin cambio (el `por_que` de `comun.entidad.cargo` se puso al día; su texto no) | 22 archivos |
| Verbo | `home.quien.p1`, description de `/nosotros/`, `llms.txt` L5 | «dirige» se queda, como dice el encargo §5 | |

`llms.txt` del `dist` es idéntico a `spindlelab-astro/public/llms.txt` de HEAD (`cmp`) y difiere de `main` en 4 líneas de
`diff` (las dos de arriba).

### Desvíos no declarados

Ninguno. Los 23 archivos que cambiaron desde `5dd37d8d` (`git diff --stat 5dd37d8d HEAD`) están todos en
`desvios/texto-2nov.md`: las 5 fuentes y sus 5 copias, `llms.txt`, `portada-30oct.mjs` (`PROY.pie`), `barrer-terminos.mjs` (un
término), `spec-visual.md` (fila 6), `spec-home.md` (§11), el propio archivo de desvíos y `medicion-2nov/` (Diego, §6). Cada
elemento que cambió en los JSON lleva `estado: "cambia"`, `antes`, `por_que` y `origen` con la decisión y su fecha. Lo que
queda escrito con «director» en la obra está solo en campos de registro (`antes`, `por_que`, `senales`) y en la historia
(`lectura-fria/30oct*`, `acta-qa-30oct.md`, `desvios/texto-30oct.md`, `copy/sitio-propio-direcciones.md`), que no se
publican: el barrido del `dist` da 0.

## Lectura en frío (criterio 4 del brief)

Los mismos tres perfiles (consultora, clínica, restaurante) y las mismas instrucciones de las vueltas del 30-oct, sobre el
texto de `/` y `/contacto/` del build de la rama. Son personas simuladas por un modelo: sirven para ver dónde se tropieza, no
para medir conversión, y con tres lectores una diferencia de uno es ruido. Íntegro en `lectura-fria/2nov/`.

**Lo sustancial sigue bien:** los tres dicen con sus palabras qué hace SpindleLab («hacen sitios web a medida y después les
conectan Google, anuncios y redes»), se reconocen en el «para quién» (los tres nombran su rubro en la lista), saben que el
primer paso es mandar la dirección, gratis y en un día hábil, y los tres pedirían la revisión.

| Lo que cambió | Vuelta 2 (30-oct) | Vuelta 3 (30-oct) | **2-nov** | |
|---|---|---|---|---|
| La frase de «Quién está detrás» (1a) | la vieja, citada por **2 de 3** como lo que les hizo sentido | la vieja, **1 de 3** («me hizo sentido…, aunque no lo prueba con ningún dato») | la nueva, **0 de 3**: nadie la cita, ni a favor ni en contra | Ver «Decisiones de Ramón», 2 |
| «a tu nombre» (2a) | | | **0 de 3** tropiezan; L3: «entendí que el sitio es mío» | Bien |
| «Te entregamos el código completo» (2a) | | | **3 de 3** preguntan qué harían con el código («bien, pero no sé qué haría yo con un código»; «yo qué hago con el código»; «¿qué hago yo con un código?»). **2 de 3** la citan como confianza (L1: «Que me entreguen el código también me tranquiliza»; L3: «el código es mío») | Ver «Decisiones de Ramón», 1 |
| El cargo (3a) | L2 lo repetía: «fundador y director» | | **0 de 3** tropiezan; L2: «Ramón Vallejos, fundador» | Bien |

**Lo que no cambió sigue igual:** «Para escribirlo trabaja con agentes de IA dentro del equipo» vuelve a frenar a los tres
(L1 y L3 la ponen segunda entre sus tres frenos; L2 la anota en desconfianza: «escribe el código con IA»), como en la vuelta 3.
El caso único «no de crecimiento de ventas», los precios «desde», «Visibilidad en IA», «Paid Media», Search Console, la ley,
«Si te vas, tus seguidores se quedan» (L3 lo lee al revés, 1 de 3, como antes) y «Cookies: rechazadas» (2 de 3, como antes):
el mismo texto de siempre, ya escalado en las actas anteriores.

## Defectos

Severidad como en las actas anteriores.

| # | Sev. | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce | Cómo se cierra |
|---|---|---|---|---|---|---|---|
| 1 | Menor | La orquestadora (quien arma el corte); si no, Mauro | `e13/lista-publicacion.md`, sección 2 («Receta del corte») y fila 3.13 | La lista de publicación no tiene todavía el corte del 2-nov, y su receta, leída sola, lleva a tres errores que el encargo de la troncal (§4.7) ya corrige: (a) el paso 2 vuelve a poner `claude/v3-publicacion` con `-B` y empuja con `--force-with-lease`, y esa rama hoy apunta a `0b405842`, que ya está en `main`; (b) el paso 3b copia a mano solo los dos documentos del 30-oct, y ahora hay que llevar `acta-qa-2nov.md` y `desvios/texto-2nov.md` (y, si se quiere, `medicion-2nov/`); (c) la rama trae `sitemap.xml` con las 22 fechas en `2026-10-26`, y `main` tiene 15 en `2026-10-30`: si el paso 4 no se corre con la fecha del día, el corte retrocede las fechas. Además, la fila 3.13 dice «Margen 1.236 bytes»: hoy es **1.200** | La lista de publicación tiene que describir lo que hay que hacer el día del corte (vuelta 3, menor 1, mismo patrón) | `grep -n '1.236\|v3-publicacion\|3b ·' e13/lista-publicacion.md`; `diff` de `spindlelab-astro/public/sitemap.xml` entre `origin/main` y HEAD | Al armar el corte: una entrada «2-nov» en la lista con los tres ajustes del encargo §4.7 (rama nueva desde `origin/main`, sitemap regenerado con la fecha de publicación, los documentos del 2-nov copiados) y el margen en 1.200 bytes. Solo documento: no toca el sitio |

### Observaciones (no son defectos; quedan anotadas)

- **Margen de peso: 1.200 bytes.** Cualquier frase que se sume a la home, incluida una versión nueva de la fila 2a si Ramón la
  ajusta, se mide con `peso-30oct.mjs` antes del corte.
- **La fila 2a es la única de su lista con dos oraciones y la única en que habla el estudio** («te entregamos»): las otras
  seis filas de la sección 2 describen la plataforma o el sitio («La plataforma decide…», «Tú decides…», «Google y las IA
  pueden visitarlo…»). Leída en voz alta se oye como un añadido al par «Tu cuenta depende de sus reglas» / «Va en tu
  dominio». No rompe nada medible; si Ramón ajusta las palabras (ver «Decisiones», 1), es lo que conviene mirar.
- **Corte de línea de la fila 2a:** a 834, 1024, 1194 y 1440 la primera línea termina en «Y te»; a 390, la segunda queda en
  «código completo.». Se lee bien y la columna no se rompe; si cambian las palabras, cambia el corte.
- **Detector, ítem «no solo X, sino Y» (`antislop-web.md` A4):** la cláusula nueva es «no en el anuncio, sino en el lugar al
  que el anuncio lleva». La doy por buena: el contraste es real y es la tesis del sitio (dos lugares concretos, no dos
  adjetivos), y la oración lo atribuye a lo que él vio. Queda anotado porque es la familia de construcciones que el detector
  vigila.
- **Las herramientas de la obra traen fija la ruta del navegador:** `portada-30oct.mjs` (1194, línea 107) y
  `lectura-fria-texto.mjs` (Chrome de Mac, línea 27). Para correrlas aquí hubo que copiarlas cambiando una línea; Diego hizo lo
  mismo. Que acepten `--chrome`, como `peso-30oct.mjs`, ahorra eso en la próxima vuelta. Es de Diego, cuando toque.
- **El nombre de los `hoisted.*.js`:** en mis dos builds salieron iguales; en los de Diego, distintos para una página. Es el
  orden en que Rollup arma el trozo, no texto: con un `diff -rq` crudo hay que mirar eso antes de concluir que cambió una página.

## Decisiones de Ramón (no son defectos)

1. **«Y te entregamos el código completo» (2a, y «Te entregamos el código completo.» en 2b).** El hecho lo confirmó Ramón el
   30-oct; las palabras son la propuesta de la troncal y él puede ajustarlas. **Diagnóstico:** la mitad «a tu nombre» funciona
   sin tropiezos y se lee como propiedad («el sitio es mío»). La mitad del código se entiende como algo bueno (2 de 3 la
   ponen entre lo que les da confianza), pero **los tres preguntan qué harían ellos con un código**: la frase nombra lo que se
   entrega y no lo que eso le significa a un dueño que no es técnico. **Dos caminos:** publicar como está, o pedirle a Clara
   otra versión **dentro del hecho confirmado** (sin hosting, licencias, plazos ni «para siempre»), y en ese caso QA exprés de
   nuevo con peso (margen 1.200 bytes) y lectura en frío. No frena el corte.
2. **La frase nueva de «Quién está detrás»** (1a y 1b) ya no la cita ningún lector: ni como lo que les hizo sentido (2 de 3 en
   la vuelta 2, 1 de 3 en la vuelta 3) ni como algo sin prueba (lo que dijo ese lector de la vuelta 3). Con tres lectores
   simulados la diferencia es ruido, y no es un tropiezo. Ramón la aprobó y puede afinarla después: no hay nada que hacer antes
   del corte.
3. **El verbo «dirige»** (`home.quien.p1`, description de `/nosotros/`, `llms.txt` L5) se quedó, como propone el encargo §5.
   Si Ramón prefiere otro, es una palabra en cada uno.
4. **«Para escribirlo trabaja con agentes de IA dentro del equipo»** sigue frenando a los tres, igual que en la vuelta 3. Ramón
   la confirmó por escrito el 30-oct; no cambió en esta vuelta. Solo se anota que sigue ahí.

## Detector anti-slop (`antislop-web.md` §E y `refero-design/references/anti-ai-slop.md`), sobre lo que cambió

Lo que cambió es texto en 10 páginas y `llms.txt`; el CSS, el JS, la estructura y las imágenes son idénticos byte a byte.

- **COPY.** Sin verbos de folleto, sin relleno de apertura, sin tricolon nuevo. «No solo X, sino Y»: ver la observación
  (contraste real, se da por bueno). Sin pregunta retórica ni «¿Listo para…?». Sin Title Case (el pie va en mono en mayúsculas
  por CSS, como antes; el `title` va en minúscula: «fundador»). Tuteo consistente, 0 voseo; «te entregamos» en plural, como
  pide el manual para lo que entrega el negocio. **0 rayas largas o medias** en el `dist` (barrido). Cero prueba social nueva:
  la fila 2a afirma un hecho que Ramón confirmó. Borrar el 30%: las frases nuevas no tienen relleno que sacar; la de 2b quedó
  en tres oraciones y se sostiene.
- **ESTRUCTURA.** Sin cambios: la sección 2 sigue con 3 y 4 filas (guardián y `.int-par` intactos), el FAQ y su `FAQPage`
  idénticos a `main`.
- **CÓDIGO.** Landmarks, un `h1` por página y jerarquía: `verificar` sin hallazgos en las 22 a tres anchos. Contraste AA:
  `verificar` mide el contraste real de cada nodo de texto, sin hallazgos. Foco visible: 0 paradas sin indicador en la home.
  JSON-LD, `canonical`, OG y `title` propios: medidos (filas 6, 19). Sitemap: la rama trae el viejo (menor 1). Ningún asset
  sobrescrito, así que ningún `?v=N` que subir.
- **VISUAL.** Detector de `refero-design`: no aplica a un cambio sin composición nueva; las capturas de las piezas que cambiaron
  muestran la misma composición de `main`.
- **PRUEBAS DE FUEGO.** Logo tapado y rubro cambiado: igual que en la vuelta 3, porque la composición no cambió. **En voz
  alta:** «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva» se dice de un tirón y suena más prudente que
  la anterior (el eco «anuncio… anuncio» ya estaba); el pie «Ramón Vallejos · Fundador de SpindleLab» suena a persona; la fila
  2a se oye en dos tiempos, el segundo («Y te entregamos…») como un añadido (observación).

## Lo que está bien (y no hay que perder)

- **Tres correcciones sin mover nada más:** 12 de 135 archivos distintos, y dentro de ellos solo las palabras decididas.
  Precios, enlaces, JSON-LD, metas y las otras 12 páginas, idénticos. Así se corrige un sitio en vivo.
- **La fila 2a en una sola fila:** el guardián de `index.astro` y `.int-par` no se tocaron, los filetes siguen alineados y la
  sección crece 21 px, bajo todos los techos.
- **El registro dice la verdad:** cada elemento con su `antes`, `por_que` y `origen`; el `origen` que atribuía «director» al
  30-oct, corregido; el `por_que` del `jobTitle`, al día; y un término nuevo en el barrido para que el cargo viejo no vuelva.
- **El peso medido igual por dos manos:** Diego y yo, con la misma herramienta sobre builds hechos por separado, 1.398.800
  bytes; y `main` da el número del 30-oct.
- **«a tu nombre»:** el argumento de propiedad que la columna necesitaba, sin un solo tropiezo.

## Lo que no pude medir

- Safari, Firefox y un iPhone real; la red real con `_headers` y la compresión de Cloudflare; Node 20 (producción).
- El corte: esta QA es sobre la rama de la obra. Si el corte difiere de ella en algo más que el sitemap regenerado y los
  documentos copiados, se vuelve a pasar por QA exprés (`lista-publicacion.md` §3).
- El criterio 22 (aire de «Quién está detrás», `quien-aire-30oct.mjs`): no lo corrí. El CSS es idéntico byte a byte y la
  biografía sigue con cuatro párrafos; la captura `01` a 1440 y la `02` a 390 se ven con el mismo aire que en la vuelta 3.
- Si alguna parada de Tab queda tapada por el encabezado o el aviso: medí solo que tenga indicador (ver fila 23).
- El envío real del formulario, GA4 y Meta: no cambió nada de eso (`Layout.astro`, `public/js` y `functions/`, 0 bytes).

## Evidencia en el repositorio

- `e13/capturas-qa-2nov/`, todas miradas:
  - `01-home-quien-1440.jpg` y `02-home-quien-390.jpg`: «Quién está detrás» con el pie y la frase nuevos;
  - `03-home-seccion2-768.png`: la sección 2 a 768, con la fila 2a en una línea;
  - `04-nosotros-1440.jpg`: `/nosotros/` hasta el cierre, con la firma y la frase nuevas;
  - `05-dw-incluye7-390.png` y `06-dw-incluye7-1440.png`: «En todos los planes», ítem 7;
  - `07-articulo-firma-390.png` y `08-articulo-firma-1440.png`: la firma de «Qué es AEO y GEO».
- `e13/lectura-fria/2nov/`: `entrada.txt`, `instrucciones.txt` (las del 30-oct), `lector-1..3.txt` y `lectores.json`
  (2-nov, 17:03 UTC).
- Mis herramientas (`textos.mjs`, `comparar.py`, `importes_enlaces.py`, `piezas.mjs`, `firma.mjs`, `hoja.py` y las copias de
  `portada-30oct.mjs` y `lectura-fria-texto.mjs` con la ruta del navegador cambiada), los dos `dist`, los registros de
  `verificar`, del barrido y de la sección 2 y las hojas de contacto de las imágenes quedaron en el scratchpad
  (`…/scratchpad/javiera-2nov/`), que se borra al reiniciar: lo que importa está en esta acta.
