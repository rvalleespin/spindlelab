# Acta de QA: SpindleLab · E14, home al estilo Koto (construida) · ronda 1

**2-nov-2026 · Javiera (QA crítica) · contexto limpio (subagente), sin haber visto la construcción.**
Audité el commit `1ed755f1` de `claude/magical-franklin-ckfki2` (Diego, sobre Bruno `b94c2eb9` y Clara `d11b5e8e`). Lo
hice sobre una copia limpia (`git worktree` de HEAD en el scratchpad, `npx astro build`, `dist/` servido en local). Lo
comparé con el prototipo aprobado (`prototipo/`), con `medicion-koto-scroll.md`, con `texto-construccion.md` y con
`desvios-construccion.md`. No toqué código del sitio ni publiqué nada.

## Veredicto

**Con reparos.** Se puede mostrar a Ramón. Antes de publicar hay que corregir dos `alt` que describen mal la imagen
(defectos 1 y 2). El resto son ajustes menores y decisiones de texto que le tocan a Ramón. No hay bloqueantes.

## Cómo se verificó

- Build limpio: `npx astro build` genera 22 páginas, con los guardianes de precio, nombre y destino en verde.
  `extraer-texto.mjs --comprobar` sale con código 0 y todos los JSON «igual».
- `scripts/verificar.mjs --excluir /privacidad/` a 390, 768 y 1440: **Sin hallazgos** en las 22 páginas. Cubre
  contraste real, desborde, h1, JSON-LD, alt, enlaces internos y comentarios.
- Movimiento: bajé con la rueda en pasos de 40 px, a 1440 × 900 y a 390 × 844 (dpr 2, táctil), con y sin
  `prefers-reduced-motion`. Hay cuadros en las posiciones clave. Herramientas: `qa-javiera/acta-mov.mjs` y
  `qa-javiera/acta-detalle.mjs`. Datos: `qa-javiera/acta/serie-mov.json` y `detalle-1440.json`. Hojas de cuadros:
  `qa-javiera/acta/hoja-1440-mov.jpg`, `hoja-1440-red.jpg` y `hoja-390-mov.jpg`.
- Peso: `e13/herramientas/peso-30oct.mjs`, la misma herramienta y el mismo criterio que Diego.
- Lo protegido: `git diff origin/main HEAD` sobre `functions/`, `public/_headers`, `public/_redirects`, `public/js/` y
  `src/layouts/Layout.astro`. Los formularios los extraje de `dist/` en los dos builds (HEAD y origin/main) y los
  comparé byte a byte.
- Precios: los extraje de las páginas construidas de HEAD y de origin/main, página por página. Revisé que los datos de
  oferta no tengan diff.
- Imágenes: las miré una por una (`qa-javiera/acta/imagenes-bruno.jpg`) y pasé `imagenes/medir-dorado.py` por todo
  medio de la home fuera de la portada.
- Lectura en frío: `lectura-fria-texto.mjs` y `lectura-fria.py`, con los mismos tres lectores de E13, sobre la home
  construida. Las respuestas están en `qa-javiera/acta/lectura-fria/`.

## Defectos

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce / cierre |
|---|---|---|---|---|---|---|
| 1 | menor (reparo antes de publicar) | Clara | Home, fila de tres, `e14-banda-anuncios-*` | El alt dice «Hilos plateados que **entran desde varios bordes**…», pero en la imagen todos los hilos entran por la izquierda. Diego lo avisó y sigue en HEAD | Skill QA: alt que describe lo que se ve; detector C5 | Abrir `public/v3/medios/e14-banda-anuncios-169.webp`. **Cierre:** un alt que diga lo que se ve (hilos que entran por la izquierda y salen como uno solo por el ojo de la aguja), escrito en `home.json` y copiado con `extraer-texto.mjs` |
| 2 | menor (reparo antes de publicar) | Clara | Home, fila de tres, `e14-banda-como-partimos-*` | El alt dice «tres nudos que lo parten en **tres tramos iguales**». Tres nudos parten el hilo en cuatro tramos, y los tramos no son iguales: los de las puntas son más largos | Ídem | Mirar la imagen 16:9. **Cierre:** corregir el alt en `home.json` |
| 3 | menor | Clara | Home, contacto, rótulo de la primera fila | El rótulo «Proyectos» bajo «Contacto»: 2 de 3 lectores no supieron si era un campo o un título («no sé si es un campo o un título», «no entiendo qué es») | Lectura en frío (lectores 1 y 3) | Ver `acta/lectura-fria/`. **Cierre:** que Clara decida el rótulo o deje la decisión anotada |
| 4 | menor (decide Ramón) | Clara → Ramón | Home, h2 de la banda de Búsqueda | «Búsqueda y visibilidad en IA que Google y ChatGPT entiendan a qué te dedicas» hizo tropezar a **los 3 lectores** («la frase está rara», «pura jerga, y es lo que más empujan») y fue el segundo freno de dos de ellos. La tinta y el gris se leen como una sola frase sin verbo que las una | Lectura en frío (3/3) | Texto aprobado por Ramón: no lo cambio por regla. **Cierre:** Clara propone una alternativa o Ramón confirma el texto tal cual, y queda escrito |
| 5 | menor | Clara | `e13/texto/home.json` (no se ve en la página) | En `secciones[fila].medios` los nombres de archivo no son los reales (`06-anuncios-16x9.webp`…). La captura del chequeo sigue apuntando al prototipo. Varias notas `antes` y `estructura` citan `retiradas_e14`, que ya no existe. La página funciona porque busca las imágenes por columna | Auditabilidad del flujo de texto (fuente única) | `grep -n "retiradas_e14\|06-anuncios" e13/texto/home.json`. **Cierre:** que los nombres y las notas digan lo que hay |

Ninguno es bloqueante ni mayor. No encontré desvíos no declarados: cada diferencia que vi contra el prototipo está en
`desvios-construccion.md`, del 1 al 10.

## Movimiento al bajar: construido contra el prototipo y Koto

| Momento | Koto (medición) | Construido, 1440 | 390 | Movimiento reducido |
|---|---|---|---|---|
| Portada que se recoge | clip-path lineal entre 120 y una pantalla, final `inset(8px 8px 76.56% round 4px)` | Igual: `inset(0.41px … 3.926%)` en 160, `inset(4.92px … 47.114%)` en 600 y `inset(8px 8px 76.56% round 4px)` desde 900. El video sube 0,43 × | Sin recorte, igual que el prototipo (los dos lo hacen solo desde 834) | Sin recorte; el video en pausa |
| La línea, renglón a renglón | ~160 px por renglón, escalonados | 3 renglones: en 600 están en 18 %, 46 % y 73 %; en 1000, todos en 0 | 6 renglones, todos a la vista a 400 | Sin partir y a la vista |
| Panel de Trabajo | aparece entre 1340 y 1600; sticky | Opacidad 0 → 0,07 en 1360 → 1 en 1640; sticky en top 0 | Lista, `position: static` | Opacidad 1 desde el principio |
| Tarjeta activa 100 %, resto 20 % | umbral en la mitad de la pantalla | `[1, .2, .2]` → `[.2, 1, .2]` → `[.2, .2, 1]`; el nombre cambia a Verifica con su tarjeta (2412) | Sin apagar nada (todas al 100 %) | Todas al 100 % |
| Cambio de nombre | sale en 133 ms, entra en 333 ms; bajada con 333 ms de retardo | Medido con reloj: sale en ~140 ms, en reposo a los ~440 ms; la bajada empieza a los ~475 ms y está llena a los ~660 ms. Ninguna curva pasa de 1 | No aplica | Cambia sin desplazamiento |
| Pie de IA de Verifica | | Visible siempre, opacidad 1 aunque su tarjeta esté al 20 % (desvío 3, declarado) | Visible | Visible |
| Imágenes de las dos bandas | (no está en Koto; lo pidió Ramón) | `--e` 1 → 0 mientras el marco sube (3040 a 3440, y 3640 a 4240) | Igual | Sin recorte |
| Filas del contacto | 240 px cada una, escalonadas | De 0 a 1 en ~240 px, escalonadas; todas en 1 al final de la página | Igual; en 1 al final | A la vista |
| Foto de Ramón | escala de 0 a 1 desde abajo a la izquierda, ~0,3 s | `.vista` al verse; escala 300 ms desde `0 100%` | Igual | Sin escala, a la vista |

Sin errores de consola ni de página en las cuatro corridas. Desborde horizontal: `scrollWidth − clientWidth = 0` en
cada paso de las cuatro corridas.

## Mediciones

| Qué | Valor |
|---|---|
| Peso de la home, primera carga a 1440 × 900 | **1.396,1 kB** (tope 1.400). El margen es de 3,9 kB (abajo, «Lo que queda abierto») |
| Peso a 390 × 844 | 816,6 kB |
| Peso recorrida a 1440 | 2.042,9 kB (después de la primera carga; no tiene tope) |
| h1 de la home | 1. Jerarquía h1 → h2 → h3 sin saltos (h3 solo en los nombres de pieza bajo su h2 «Trabajo») |
| JSON-LD | Parsea sin error en las 22 páginas. La home tiene ProfessionalService y WebPage, **0 FAQPage**. En /servicios/ (5), Desarrollo web (4) y las demás con FAQPage, cada pregunta y el inicio de cada respuesta están en el texto visible |
| title, meta description, canonical, OG | Propios y sin cambios: «SpindleLab · Sitios web a medida y marketing con IA», canonical `https://spindlelab.cl/`, og:image `og-e12-marca.jpg?v=3` |
| Imágenes | Todas con `width`/`height`. La portada lleva `eager` + `fetchpriority="high"` y el resto `lazy` o diferidas con `<noscript>`. Los alt describen lo que se ve, salvo los defectos 1 y 2 |
| Foco con Tab (1440) | 34 paradas en orden lógico, todas con contorno sólido de 2 px blanco. La única excepción es el botón de cookies del pie, en gris #989898; es del pie común, no de esta obra. La tarjeta de Combeau (877 × 493) y la de Verifica reciben el foco; la segunda tarjeta de Combeau queda fuera (`tabindex="-1"`, desvío 2) |
| Contraste | Medido por `verificar.mjs` en las 22 páginas a los tres anchos: sin hallazgos (excluida /privacidad/, que ya tenía hallazgos conocidos) |
| Dorado fuera de la portada | 0,00 % en las seis versiones de Bruno, en el chequeo, en el panel de Combeau, en el book y en Ramón. Verifica: 0,06 % (-53) y 0,02 % (-45), que son el amarillo lima de su propia portada y no oro. El oro solo está en el hilo de la portada |
| Personas o letras falsas en las imágenes nuevas | Ninguna. Aguja, huso y nudos, sin manos, caras, texto ni pantallas |

## Lo decidido por Ramón, exacto en el HTML construido

| Texto | Veces | Estado |
|---|---|---|
| «Sitios web a medida y marketing con IA» (rótulo) | 2 (rótulo de la portada y `<title>`) | ✓ |
| h1 «En redes arriendas. Tu sitio es lo único que es tuyo.» | 1 h1 | ✓ |
| «Hablemos de tu sitio», amarillo (`#portada-cta`) | 2 (portada amarilla, contacto claro como el prototipo) | ✓ |
| «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva» | 1 | ✓ |
| «Fundador» | 1 («Ramón Vallejos · Fundador») | ✓ |
| «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» | 1, con punto | ✓ |
| «La persona a caballo de esta portada está generada con IA.» bajo Verifica | 1, opacidad 1 | ✓ |
| Cursor sin círculo (e401ddda) | `.circulo` fuera de `PaginaA.astro` y `base.mjs` | ✓ |
| Precios | Home: $350.000, $390.000, $400.000 y $590.000. /servicios/ y Desarrollo web, iguales a origin/main. Los datos de oferta (`oferta-v3.json`, `servicios-v3.json`, `paginas-v3.json`) no tienen diff. El $490.000 sale de la home, como dice `texto-home-propuesta.md` | ✓ |

## Lo protegido, contra origin/main

`functions/`, `public/_headers`, `public/_redirects`, `public/js/` y `src/layouts/Layout.astro`: **diff vacío**. Los
formularios de /contacto/ y /diagnostico/ son idénticos byte a byte entre los dos builds. No se tocó `main` ni
`claude/v3-publicacion`.

## Lectura en frío (los mismos tres lectores de E13, sobre la home construida)

- **Lo que entendieron los tres:** qué venden, los cuatro precios con su «desde», que el primer paso es gratis y
  responde en un día, y que hay una persona con nombre y cara. Los tres harían el chequeo o pedirían la revisión.
- **Frenos repetidos:** casos de otro rubro y sin resultados en plata (3/3: es el alcance del portafolio, no algo de
  esta obra). El h2 de Búsqueda (3/3, defecto 4). «94 de 100» sin saber qué mide (3/3). No saber qué trae «lo que
  encontramos» (3/3). «dirección» leída como la dirección del local (2/3, en la entradilla de la portada, que Ramón
  dejó igual). «Proyectos» (2/3, defecto 3). El pie de IA les pareció raro (2/3): es obligatorio por convención y se
  queda.
- **Artefacto, no defecto:** los «·» que vieron dentro de la línea («Si ahí no se · entiende…») los pone el extractor
  al partir los renglones en bloques. En la página no aparecen (cuadros `y0600` y `y0900`).

## Detector anti-slop (antislop-web.md §E)

```
COPY            ✓ sin verbos de folleto  ✓ sin relleno de apertura
                ✓ sin tricolon automático  ✓ sin "no solo X sino Y"
                ✓ sin pregunta retórica ni "¿Listo para…?"
                ✓ sin Title Case  ✓ tuteo es-CL consistente
                ✓ sin raya como remate  ✓ cero prueba social sin respaldo (94/100 es la medición real; dos casos reales)
                ✓ borrar 30 % no mejora la página: 586 palabras aprobadas, contra 1.421 de la home publicada
ESTRUCTURA      ✓ la fila de tres no son tarjetas idénticas: una grande y dos chicas, imagen propia, precio y enlace distintos
                ✓ sin "¿por qué elegirnos?"  ✓ sin FAQ en la home (las preguntas viven en su página, visibles y en JSON-LD)
                ✓ sin métricas inventadas  ✓ formulario intacto (no está en la home)
                ✓ portada no es 100vh centrada vacía (texto abajo a la izquierda, se recoge)  ✓ orden: el de Koto aprobado
CÓDIGO          ✓ landmarks, un h1, sin saltos  ✓ tokens del sistema A (archivo.css), sin valores sueltos nuevos a la vista
                ✓ sin degradé-mancha ni glass  ✓ cero emoji  ✗ alt reales: defectos 1 y 2
                ✓ foco visible, contraste AA  ✓ imágenes dimensionadas, portada eager
                ✓ JSON-LD + canonical + OG + title  ✓ sitemap: la home no cambió de ruta; no se sobrescribió ningún asset (todo nuevo)
VISUAL          ✓ refero anti-ai-slop: fondo oscuro decidido por la marca (no por defecto), sin índigo, sin franja de acento,
                  sin promediar (el mecanismo es el de Koto medido, no una mezcla), sin gráficos falsos (imágenes reales o generadas declaradas)
PRUEBAS         ver abajo
```

## Pruebas de fuego

- **Logo tapado:** pasa. El hilo, la aguja, el huso y los nudos son una sola metáfora, la del oficio de hilar, y solo
  calza con esta marca.
- **Rubro cambiado:** pasa a medias. La composición de Koto le serviría a cualquier estudio, pero el contenido
  (panel de Bernardo, chequeo con 94/100, Ley 21.719) no se cambia sin rehacer la página.
- **Leído en voz alta:** el h1 y la línea suenan a persona. El h2 de Búsqueda no suena a persona (defecto 4).

## Lo que queda abierto (sin defecto, con su porqué)

- **Margen de peso de 3,9 kB.** Hoy pasa, pero cualquier cosa nueva en la primera pantalla de la home lo rompe: un
  póster, una fuente, más JS. Toda corrección que toque la portada vuelve a correr `peso-30oct.mjs` antes del commit.
- **La rama no se fusiona limpia con origin/main.** `git merge-tree` da conflictos en `public/sitemap.xml` (main tiene
  `lastmod` del 2-nov) y en varios documentos de `marketing/`. No es de esta obra, pero hay que resolverlo antes de
  publicar, en una fusión con su propia revisión.
- **La captura del chequeo** lleva dentro un botón «Pedir la revisión a mano» que es parte de la imagen y no se puede
  apretar, sin marco que la separe de la página. Es igual en el prototipo aprobado. Lo anoto para Lucía, no como
  defecto.
- **El panel de Combeau** de septiembre, con su pie, queda hasta que Ramón decida si pide una captura nueva.

## Lo que está bien (que no se pierda en la ronda siguiente)

- El mecanismo copia lo medido en Koto, con sus números: el recorte de la portada, los renglones atados al scroll, el
  panel fijo con la activa al 100 % y el resto al 20 %, y la máscara de 133/333 ms con la bajada retrasada. Además
  atiende `prefers-reduced-motion`, que Koto ignora: con reducido no se esconde nada.
- Texto solo desde JSON: `--comprobar` en verde y sin texto a mano.
- Las tres imágenes de Bruno: sin oro, sin personas, sin letras, livianas (22 a 44 kB) y de una sola familia visual
  con el hilo de la portada.
- La home bajó a menos de la mitad del texto sin perder precios ni lo decidido por Ramón, y el FAQPage solo existe
  donde hay preguntas visibles.
- Nada de lo protegido cambió.

---

# Ronda 2 (segunda y última): reparos cerrados y regresión

**2-nov-2026 · Javiera (QA crítica) · contexto limpio (subagente).** Audité HEAD `9a182d9d` (Clara y Diego, reparos de la
ronda 1) en una copia limpia: `git worktree` de HEAD en el scratchpad, `npx astro build` y `dist/` servido en local. No
repetí lo que el commit no podía cambiar: `9a182d9d` toca solo `e13/texto/home.json`, su copia en `src/data/archivo/texto/`,
un comentario de `index.astro` y `desvios-construccion.md`. No hay imágenes, CSS, JS ni datos de oferta nuevos.

## Veredicto ronda 2

**Aprobado.** Los cuatro reparos de oficio (1, 2, 3 y 5) quedaron cerrados y medidos. El movimiento, el peso, los precios y
lo protegido no cambiaron. Quedan abiertas dos preguntas de texto que decide Ramón (defectos 4 y 6). Ninguna de las dos
bloquea mostrar la home ni publicarla.

## Defectos de la ronda 1, re-medidos

| # | Estado | Evidencia |
|---|---|---|
| 1 · alt de anuncios | **Cerrado** | En `dist/index.html` dice: «Cuatro hilos plateados que entran por la izquierda, pasan juntos por el ojo de una aguja y salen por la derecha como uno solo, sobre fondo casi negro.» Lo comparé con la -169 y la -45 (`qa-javiera/acta-r2/alt-anuncios-y-nudos.jpg`) y en las dos son cuatro hilos que entran por la izquierda. «varios bordes» aparece 0 veces |
| 2 · alt de cómo partimos | **Cerrado** | «Un hilo plateado tendido recto sobre papel oscuro, con tres nudos repartidos a lo largo.» Vale para las dos versiones. «tres tramos iguales» aparece 0 veces |
| 3 · rótulo «Proyectos» | **Cerrado** | Ahora dice «Si tienes un proyecto». Ocupa una línea a 390 (358 × 18 px), 768 y 1440, con opacidad 1 en su lugar (`acta-r2/rotulo-390.jpg`, `-768`, `-1440`). En la lectura en frío nueva, **0 de 3** lectores lo nombran. En la ronda 1 fueron 2 de 3. El cambio de texto sobre algo que Ramón vio en el prototipo está anotado como pregunta 2 en `desvios-construccion.md` |
| 4 · h2 de Búsqueda | **Abierto, decide Ramón** | Sigue frenando a **3 de 3** lectores, igual que en la ronda 1, y aparece en el top 3 de frenos de los lectores 1 y 3. La propuesta de Clara («…en IA **para** que Google…») está bien escalada en `desvios-construccion.md` («Preguntas para Ramón», 1) y en `home.busqueda.h2.pendiente`. Ya no es trabajo del equipo. No se cambia sin respuesta |
| 5 · nombres y notas de home.json | **Cerrado** | `grep retiradas_e14` en el HTML construido y en las notas `antes` da 0. La fila de tres apunta a `public/v3/medios/e14-banda-*-169.webp` con su `archivo_45`. El comentario «provisorio» de `index.astro` ya no está |

## Hallazgo nuevo

| # | Severidad | Dueño | Dónde | Qué | Contra qué | Cierre |
|---|---|---|---|---|---|---|
| 6 | menor (decide Ramón) | Clara → Ramón | Home, contacto, fila «Quién responde»: «Escribe el código con agentes de IA, y lo revisa y aprueba él antes de que llegue a tu sitio.» | Los 3 lectores la nombran como duda en **las dos** rondas, y en esta ronda queda en el top 3 de frenos de 2 de ellos («me deja dudando de quién hace realmente el trabajo», «una sola persona revisando todo, y no sé si eso es bueno o malo»). En la ronda 1 se me pasó: también estaba (3/3 la nombraban y 1/3 la ponía en su top 3) | Lectura en frío, ronda 1 y ronda 2 (`acta/lectura-fria/` y `acta/lectura-fria-r2/`) | Es texto aprobado y honesto, así que no lo cambio por regla. Clara lo suma a «Preguntas para Ramón» con una alternativa que diga lo que gana el cliente (que una persona responde por cada línea). Si no, Ramón confirma el texto tal cual y queda escrito |

No hay desvíos nuevos sin declarar: lo que cambió en `9a182d9d` está en `desvios-construccion.md`, «Ronda de reparos».

## Regresión

| Qué | Resultado |
|---|---|
| `extraer-texto.mjs --comprobar` | Sale con código 0. Todos los JSON «igual» |
| `npx astro build` | 22 páginas, con los guardianes en verde |
| `verificar.mjs --excluir /privacidad/` a 390, 768 y 1440 | **Sin hallazgos** en los tres anchos: contraste, desborde, h1, JSON-LD, alt, enlaces internos y comentarios |
| Movimiento al bajar (`qa-javiera/acta-mov.mjs`, 1440 y 390, con y sin movimiento reducido) | **Igual paso a paso a la ronda 1** en las cuatro corridas: recorte de la portada, renglones de la línea, panel, opacidad de cada tarjeta, nombre, `--e` de las bandas, filas del contacto y foto. El alto recorrible es el mismo (5849, 5517, 7002 y 7042 px). Cero errores de consola. `scrollWidth − clientWidth = 0` en cada paso. Hojas de cuadros: `acta-r2/hoja-1440-mov.jpg`, `hoja-1440-red.jpg` y `hoja-390-mov.jpg` |
| Texto visible de la home (`lectura-fria-texto.mjs`, ronda 1 contra ronda 2) | El diff tiene exactamente **3 líneas**: los dos alt y el rótulo. Nada más cambió |
| Lo decidido por Ramón | Exacto en el HTML: el rótulo, el h1 (uno solo, «En redes arriendas. Tu sitio es lo único que es tuyo.»), «Hablemos de tu sitio», la frase del anuncio, «Fundador», «Va en tu dominio, a tu nombre. Y te entregamos el código completo.» con punto, y el pie de IA de Verifica y Cumple (1 vez) |
| JSON-LD | Las 22 páginas parsean sin error. En la home hay **0 FAQPage** (ProfessionalService, WebPage, WebSite, Person, Service y Offer) |
| Peso de la home (`peso-30oct.mjs`) | **1.396,2 kB** a 1440 (tope 1.400) y 816,7 kB a 390. Sube 0,1 kB por el texto más largo. El margen sigue en 3,8 kB |
| Precios | Home: $350.000, $390.000, $400.000 y $590.000. Las otras 21 páginas tienen los mismos precios que el build de origin/main (`8b6d2375`). `oferta-v3.json`, `servicios-v3.json` y `paginas-v3.json` no tienen diff |
| Protegidos contra origin/main | `functions/`, `public/_headers`, `public/_redirects`, `public/js/` y `src/layouts/Layout.astro`: **diff vacío**. Las páginas de /contacto/ y /diagnostico/ también tienen diff vacío. Sus `<form>` construidos son idénticos al build de origin/main |
| Imágenes | No hay imágenes nuevas desde la ronda 1. Siguen valiendo el 0,00 % de dorado fuera de la portada, la ausencia de personas y de letras falsas, y las dimensiones y la carga diferida |

## Lectura en frío, ronda 2 (los mismos 3 lectores y las mismas herramientas)

Las respuestas están en `qa-javiera/acta/lectura-fria-r2/`. `lectura-fria-texto.mjs` trae escrita la ruta del Chrome del
Mac, así que la corrí con una copia en el scratchpad que solo cambia esa ruta por la de Chromium. Lo demás es idéntico.

- **Se arregló:** el rótulo del contacto (de 2/3 a 0/3).
- **Sigue igual que en la ronda 1, sin cambio de texto:** el h2 de Búsqueda (3/3, defecto 4). La frase de los agentes
  de IA (3/3, defecto 6). Un solo caso y de otro rubro (3/3, por el alcance del portafolio). «94 de 100» sin saber qué
  mide (3/3). «dirección» leída como domicilio (2/3, decisión de Ramón). El pie de IA les pareció raro (2/3: es
  obligatorio y se queda). No distinguir «chequeo», «revisión» y «auditoría» (2/3, encuadre de la oferta, no de esta
  obra). «Paid Media (Google)» en inglés (3/3, es el nombre del servicio en su página).
- **Lo que les da confianza, igual en los tres:** precios a la vista, lo que no se promete, «salió mal» en el sitio
  propio, revisión gratis en un día hábil, una persona con nombre y cara.

## Lo que queda abierto (sin defecto, con su porqué)

- **Preguntas para Ramón:** el h2 de Búsqueda (defecto 4), el rótulo «Si tienes un proyecto» (pregunta 2 de los desvíos)
  y la frase de los agentes de IA (defecto 6). Cualquier cambio de texto que salga de ahí vuelve a pasar por
  `extraer-texto.mjs`, `--comprobar` y una medición de una línea a 390. No hace falta otra ronda de QA completa.
- Siguen igual que en la ronda 1: el margen de peso de 3,8 kB, los conflictos de fusión con origin/main en
  `public/sitemap.xml` y en los documentos de `marketing/`, la captura del chequeo con el botón pintado dentro (para
  Lucía) y el panel de Combeau de septiembre mientras Ramón no decida una captura nueva.

## Lo que está bien (que no se pierda)

- Los arreglos fueron quirúrgicos: tres líneas de texto visible y nada más, sin tocar el movimiento, el peso, los precios
  ni lo protegido. Así se cierra una ronda de reparos.
- El texto aprobado por Ramón no se tocó a escondidas. Lo que hacía falta cambiar se escaló como pregunta, con propuesta.
- Los alt se escribieron mirando las dos versiones de cada imagen, y el `desvios` explica por qué no se nombran los tramos.
