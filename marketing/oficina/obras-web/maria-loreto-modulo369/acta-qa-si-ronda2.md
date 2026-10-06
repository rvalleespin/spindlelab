# Acta de QA · María Loreto Hernández · Módulo 369, maqueta v2 (Studio Iron dominante) · ronda 2

> La escribe Javiera (`/web-qa-critico`) en **contexto limpio**: leí el brief (§3, §4, §6, §7 con TERMINACIÓN, §10), la spec 2.1 (§0, §2 entera, D22), `desvios.md` (incluidos 114 a 117), el acta de la ronda 1 y las secciones de copy que afectan lo visible (`copy-secciones.md` §10, §12; `copy-muestra.md` §13). No vi la conversación de construcción ni la de la ronda 1. Reutilicé los scripts de la ronda 1 copiados a `scratch/javiera-si-r2/` (rutas cambiadas), y **volví a correr todas las mediciones y a capturar Studio Iron en vivo hoy**. Lo de aquí sale solo de esas corridas.

**Fecha:** 6-oct-2026, tarde · **Repo:** `GALERIA-MARIA-LORETO` · **Rama/commit auditado:** `claude/maqueta-v2` @ `98591d8` («Maqueta v2: el generador sale de maqueta/ para que la carpeta se despliegue tal cual»), árbol limpio; `main` sigue en `6119665` (v1 recuperable) · **Rondas previas:** ronda 1 (`acta-qa-si-ronda1.md`, @ `617a5ae`, APROBADO CON REPAROS, 4 defectos).

## Veredicto
**APROBADO**

Se puede mostrar hoy a María en su iPhone. Cada tipo de página se reconoce como Studio Iron puesto al lado del sitio en vivo, traducido a hueso, grafito y cobalto; las 14 vistas y la 404 pasan las mediciones duras en 132 corridas (390 real por CDP, 768 y 1440; ES y EN). El reparo de la ronda 1 (el link servía la v1) está cerrado y lo verifiqué yo: lo publicado en `modulo369-maqueta.pages.dev` es byte a byte el `maqueta/` de este commit y el generador ya no está en la carpeta. Quedan tres defectos **menores**, los tres en la spec y no en la construcción; uno (la tapa plana de Ediciones) sigue vivo por segunda ronda y lo escalo a Ramón con diagnóstico (abajo).

## Cómo se verificó
- **Lo auditado:** `git archive 98591d8 maqueta` en `scratch/javiera-si-r2/site/` (`diff -rq` contra el árbol de trabajo: idéntico; 333 archivos). `git diff 617a5ae 98591d8 -- maqueta` solo borra `generar_relleno_v2.py`: ningún archivo publicado cambió, así que `styles.css?v=19` y `app.js?v=11` no tenían que subir. Servido con `python3 -m http.server 8771`.
- **En vivo:** `modulo369-maqueta.pages.dev` responde `x-robots-tag: noindex, nofollow`, `styles.css?v=19` y `app.js?v=11`; SHA-256 de `index.html`, `styles.css` y `app.js` idénticos al commit, y 33 de 33 imágenes de una muestra (1 de cada 10 de `img/`) idénticas. `/generar_relleno_v2.py` responde 200 `text/html` de 2.074 bytes: es el fallback de la SPA (el `index.html`), no el script. (`_headers` no se sirve: lo consume Cloudflare; su efecto se ve en el `x-robots-tag`.)
- **Navegador:** Chrome headless por CDP (`scratch/javiera-si-r2/cdp.mjs`). **390 real:** `Emulation.setDeviceMetricsOverride` 390 × 844, DPR 2, `mobile: true`, UA de iPhone, táctil. 768 × 1024 y 1440 × 900 sin emulación móvil. Pliegue de Safari probado a 390 × 664.
- **Mediciones** (`medir.mjs` → `medidas-es.json`, `medidas-en.json`; `ana.mjs`): 22 rutas (14 vistas, 404, Artista B y C, fichas a-06, b-04, a-05, a-03, c-05) × 3 anchos × 2 idiomas = **132**. En cada una se baja la página entera, se fuerzan las `lazy` y se deslizan los carriles antes de medir.
- **Interacción** (`interaccion.mjs`, `extra.mjs`, `edita-sobre.mjs`, `dims.mjs`, `hit.mjs`, `frio.mjs`, `enl.mjs`): estados de ficha, avisos de Comprar (ficha y Tienda), envío de Contacto vacío, filtros a 1440 y a 390 dentro de «FILTRAR» hasta el estado vacío, Tab (4 recorridos), pegado al bajar en pasos de 120 px (9 casos), «Lo editas tú» (ES y EN; posición de cada etiqueta), Retícula, menú de 390 con subnivel y Escape, panel Artistas, idioma al navegar, `prefers-reduced-motion`, carga en frío, medidas contra la spec y los 50 enlaces internos uno por uno.
- **Imágenes** (Pillow sobre las 326 de `img/`): % de píxeles con luminancia ≥ 245, píxeles a ≤ 12 del cobalto y desviación estándar por imagen.
- **Studio Iron en vivo, hoy** (`cap-si.mjs` → `scratch/javiera-si-r2/si/`): home, all-objects, art, record-separator, tubular-chair, andu-masebo, london-design-festival, events, saatchi-yates, black-metal, about y shipping-returns, a 1440 y a 390 (primer viewport y página entera), más el menú «Design» abierto con clic sobre all-objects (`si-menu.mjs`). Cookies ocultas con CSS, sin aceptarlas; no agregué nada al carrito, no envié formularios ni inicié sesión.
- **Capturas** en `capturas/qa-si-r2/`: `m369-{vista}-{390,768,1440}-{v0,full}.jpg` de las 15 rutas (90), `lado-{par}.jpg` (Studio Iron a la izquierda, Módulo 369 a la derecha; 31 pares, incluido `lado-artistas-menu-1440.jpg`) e `int-*.jpg` (capas, menú y subnivel, panel, avisos, filtros vacíos, Lista a 390, estados a-03 a b-04 a 390, «Lo editas tú» en EN). Hojas de contacto de trabajo en `scratch/javiera-si-r2/hojas/`.
- **No aplica por brief:** JSON-LD, canonical y sitemap (maqueta `noindex`). Sí verifiqué `<meta name="robots" content="noindex, nofollow">`, `X-Robots-Tag` en vivo, `og:title`/`og:description` sin imagen y `theme-color` hueso.

## Defectos (numerados, reproducibles, accionables)
| # | Severidad | Dónde | Qué está mal | Contra qué | Cómo se reproduce |
|---|---|---|---|---|---|
| 1 | **menor · escala a Ramón (2.ª ronda viva)** | Ediciones (bloques e-01, e-02, e-03) y Edición (imagen «01 · PORTADA»), en los tres anchos; peor a 390 y 768 | La tapa plana a sangre se lee como un campo de color, no como un objeto fotografiado. A 390, la tapa de la Edición 01 mide **390 × 546** en una ventana de 844: después de la barra y la cabecera, casi todo el primer viewport es negro liso con «EDICIÓN 01» y «369» en Plex chico. A 768, Ediciones apila dos tapas de 768 × 1.075 seguidas (negro y kraft). Medido: `ediciones/e-02.jpg` tiene la menor variación de las 326 imágenes (desviación estándar 6,3; la 600, 6,1). Puesta al lado de Black Metal y de tubular-chair (`lado-ediciones-*`, `lado-edicion-*`), es la única zona que no se lee como foto de objeto. **Cumple la spec** (2.6 filas 3, 4 y 6; 2.7; M03 «lisa»): el defecto está en la spec | Brief §10 regla 1 (terminación) y spec T2 en su intención. Es menor porque Ediciones y Edición no están en la lista de terminación de §7 ni en los pares exigidos, y la tapa no está vacía ni gris: es una tapa texturada, plausible | `capturas/qa-si-r2/m369-edicion-01-390-v0.jpg`, `lado-edicion-390.jpg`, `lado-ediciones-1440.jpg`; `dims.mjs`: `390 #/ediciones/01 → tapa [390,546], vh 844`. **Declarado** como discrepancia de la spec en el desvío 116 |
| 2 | menor (declarado, sin decidir) | Inicio a 1440 × 900 | M3 no pasa: la lámina empieza en y = 394 (barra 30 + cabecera 32 + marca 332) y la obra de la lámina 1 queda cortada bajo el pliegue. A 390 × 664 pasa: la lámina va de 107 a 595 y la línea de pie termina en 639 ≤ 664 | Spec 2.1.2 / M3; **declarado** en los desvíos 42 y 115 (la cuenta de la spec no incluyó la tilde de la Ó) | `frio.mjs`: `1440 900 → top 394, marcaH 332`; `390 664 → top 107, bottom 595, lineaBottom 639` |
| 3 | menor (spec) | Inicio, tira OBRAS, en los tres anchos | Las tres primeras tarjetas a la vista son **las tres no disponibles**: Campo 03 «COLECCIÓN PRIVADA», Recorte 01 «COLECCIÓN PRIVADA» y Línea 01 «VENDIDA». En el primer contacto con la tienda de una galería, lo primero que se ofrece no se puede comprar. Sale de la lista de la spec (2.1 fila 6: a-03, b-01, c-01…) cruzada con los estados de relleno; la construcción cumple | Brief §3 (Inicio: «asoman» las obras) y §1 (comprar o consultar); spec 2.1 fila 6 | `m369-inicio-390-full.jpg` (tira bajo el enunciado), `m369-inicio-1440-full.jpg`. Para Lucía: reordenar la tira o cambiar el estado de relleno de b-01 / c-01 (es una línea de datos, sin `?v` de CSS) |

No encontré defectos bloqueantes ni mayores. **No encontré desvíos no declarados.**

**Escalamiento (regla de las dos rondas):** el defecto 1 llega vivo a la segunda ronda y su causa está en la spec, no en Diego. Diagnóstico para Ramón y Lucía: la spec pide «tapa plana 5:7 llenando su mitad» y la receta M03 la hace lisa; a ese tamaño, sin luz, canto ni sombra, una tapa minimalista es un rectángulo. El desvío 116 deja tres salidas con su costo; la más barata y verificable antes de la reunión es la (a): usar `muro/e-0n` (ya generada, 4:5, la tapa con muro y luz) en los bloques de Ediciones y como primera imagen de la Edición, con `app.js?v=12` y redespliegue con OK de Ramón. Si no se hace hoy, que Ramón lo nombre en la reunión al pasar por Ediciones como «la tapa va fotografiada en el sitio».

## Mediciones (valores)
| Qué | Resultado |
|---|---|
| Overflow horizontal en la página (`scrollWidth − clientWidth`, `html` y `body`) | **0** en las 132 |
| `h1` | **exactamente 1** en las 132, incluida la 404 («Esta página no existe.») |
| Imágenes rotas, sin cargar, sin `alt` o transparentes después de bajar y deslizar | **0** en las 132 |
| Hero del Inicio en frío (caché apagada) | `lamina-1-v.jpg` a 390 y `lamina-1-h-1600.jpg` a 1440: `complete`, opacidad 1, `loading="eager"`, `fetchpriority="high"` en el `load`. Ninguna imagen en blanco |
| Contraste AA calculado (texto contra su fondo efectivo; 4,5:1 o 3:1 en grande) | **0 fallas** en las 132 |
| Campos | Todos 16 px, alto ≥ 44 y con label (Contacto, Activar, newsletter). Enviar Contacto vacío no navega y muestra «Escribe tu consulta.» |
| Áreas táctiles a 390 y 768 | Todo ≥ 44 × 44. El barrido centrado marca los títulos de tira «Obras» y «Artistas» (caja 46 × 24 y 66 × 24), pero el barrido real con `elementFromPoint` da **44 de alto × 59 y 79 de ancho** (el `::after` del desvío 112): pasa. «Ir al contenido» mide 1 × 1 fuera de foco, por diseño |
| Foco con Tab | Inicio 1440 (45 paradas), Inicio 390 (44), ficha a-04 390 (45), Encuentro 1440 (44): **0 paradas sin indicador**, 0 fuera de la ventana |
| Nada fijo o pegado sobre una foto al bajar (pasos de 120 px) | **0 cruces** en Inicio, ficha a-04, Artista A, Encuentro, Acerca y Ediciones a 1440 (pegados activos: `marca-enorme`, `ficha-cartela.pega`, `mitad-texto.pega`, siempre debajo o al costado) y en Inicio, ficha y Artista a 390, con **0 pegados activos**. `fixed` solo en `.reticula` (herramienta, apagada al cargar) |
| «Lo editas tú» | Las etiquetas son `::before` con `position: static` en las 18 combinaciones medidas (9 vistas × 390 y 1440): van en el flujo y empujan, nunca encima de una imagen. Texto en ES y EN (por ejemplo «Portada: eliges qué obras van y en qué orden.», «Price: show it or leave it "on request", work by work.»). 0 corchetes con la capa encendida |
| Retícula | Apagada al cargar; encendida, solo líneas numeradas (`int-reticula-inicio-390.jpg`) |
| Carrito | No hay. Las únicas menciones dicen que no hay carrito (Tienda y «Cómo se compra»). Comprar en ficha y en Tienda no navega y muestra «Maqueta · En el sitio, este botón abre el link de Mercado Pago de esta obra…» |
| 4 estados de ficha (brief §4) | a-04: botón-fila «Comprar · Mercado Pago →» + enlace «Consultar por esta obra», «CLP ··· muestra». a-06 y c-05: «Consultar por esta obra →» + «Precio a consultar». b-04: «Consultar por esta obra →» + «CLP ···» (2 con precio, sin link). a-05: «Vendida» + Consultar. a-03: «Colección privada» + Consultar. **Una sola fila de acción** en cada una |
| Filtros por su campo | 1440: 27 → Collage **5** (b-01, 03, 05, 07, 09) → Todas → Más de 100 cm **9** → + Vendida **1** (a-05). 390 dentro de «FILTRAR»: Artista A **9** → + Tinta **0** → «No hay obras con estos filtros.» + «Quitar filtros» → **27**. Hasta 50 cm **4** (c-01 42 × 34, c-04 38 × 48, c-06 42 × 34, c-09 48 × 38: el filtro lee las medidas, lado mayor) |
| Enlaces internos | Los **50** `#/…` distintos llevan a una vista real; **0** caen en la 404. Las 27 fichas y los 7 encuentros están enlazados. Ruta inventada → 404 |
| EN | 0 textos fijos en castellano a la vista ni en `alt`, `aria-label`, `title` o `placeholder`; solo quedan los nombres que no se traducen (Módulo 369, Encuentro, Libro). EN se mantiene al navegar (EN → a-04: `lang="en"`, «Field 04, 2025», «Buy · Mercado Pago →») |
| Cifras de precio, «$», corchetes, rayas | 0 en ES y EN |
| Cobalto | 1 elemento en Inicio (el punto) y 1 en Encuentro (la «/»), en los tres anchos; **0** en las otras 20 rutas. 0 píxeles cobalto en las 326 imágenes |
| Blanco en imágenes | Peor caso `artistas/a-taller-600.jpg` con **0,26 %** de píxeles ≥ 245 (tope de la spec 25 %) |
| Familias y tamaños | Archivo, IBM Plex Mono e Instrument Serif, ninguna otra. 12 · 13 · 14 · 15 · 16 · 20 · 26 · 36 · 46,8 · 48 · 69,12 · 72 · 80,64 · 100,8 · 140 · 200 · 311,04 px (escala 1.2 más los vw declarados) |
| Medidas contra la spec | 390: cabecera 44, barra 63 (≤ 64), marca chica 26, lámina 390 × 488, tira 129, enunciado 46,8, hero de Artista 390 × 312, nombre 48, tarjeta 194, primera tarjeta de Obras en y = 318 (≤ 340), contador 72 de x 59 a 331, destacado del Libro 390 × 260, menú de 36. 1440: cabecera 32, lámina 1440 × 810, tarjeta 464, hero 1440 × 617, nombre 80,64, contador 200 de x 342 a 1.098, destacado 1440 × 960. Todo coincide con §2 |
| Menú 390 | Siete ítems de 36 px, «ARTISTAS ›» abre el subnivel con «‹ VOLVER» y 4 miniaturas; Escape lo cierra y el foco vuelve a `btn-menu` |
| Movimiento reducido | Con `prefers-reduced-motion: reduce`, el contador de Encuentro se muestra quieto en 007/369 |
| Señales | `noindex, nofollow` en meta y en `X-Robots-Tag` (en vivo); `<title>` por vista; `og` sin imagen |

## Lado a lado con Studio Iron en vivo (exigencia central · T8 / M24)
Por par: ¿se reconoce como Studio Iron con la paleta de Módulo 369? ¿Se lee como esqueleto?

| Tipo de página | Par (`capturas/qa-si-r2/`) | 1440 | 390 |
|---|---|---|---|
| Portada ↔ Inicio | `lado-inicio-1440`, `lado-inicio-390` | **Sí.** Marca de borde a borde con la itálica, la lámina a sangre que la tapa al bajar, enunciado en serif mayúscula centrado, tira de tarjetas con pie «título \| AUTOR», banda de foto, segunda tira, banda final que toca el pie grafito y titular del pie con itálicas: la secuencia de la home | **Sí.** Rayas + marca + idioma, lámina 4:5 con línea de pie y controles, enunciado en el segundo viewport, tiras de borde a borde con costura de 1 px |
| Tienda (all-objects) ↔ Tienda y Obras (muro) | `lado-tienda-*`, `lado-obras-390` | **Sí.** H1 centrado, grilla 3 × 464 con celdas llenas y pie de una línea | **Sí.** 2 × 194 de borde a borde, pie centrado |
| /art ↔ Obras (Lista) | `lado-obras-lista-1440` | **Sí.** Una obra por fila con su cartela y botón contorno al costado. La franja de filtros es exigencia del brief (D21) | Muro por defecto (2.4.2) |
| Producto ↔ Ficha | `lado-ficha-1440`, `lado-ficha-390`, `lado-ficha-art-390` | **Sí.** Imágenes apiladas a la izquierda, cartela al costado, botón-fila claro como «Add To Bag» | **Sí.** Imagen a sangre, segmentos, cartela inmediatamente debajo, botón-fila con borde en los cuatro lados. Sin barra fija de compra (restricción de María) |
| Diseñador ↔ Artista | `lado-artista-1440`, `lado-artista-390` | **Sí.** Hero a sangre, nombre en itálica grande, grilla, una pausa de texto, Biografía partida, obra sola a sangre, cita en itálica junto a una obra, fila de detalles sobre el pie. Studio Iron hoy monta el nombre **sobre** el hero; Módulo 369 lo pone debajo, como manda 2.3.1 (Escat) | **Sí** |
| Menú Design ↔ panel Artistas | `lado-artistas-menu-1440` (capturado hoy con clic) | **Sí.** Fila de miniaturas con el nombre centrado debajo, desde el margen, bajo la cabecera de tres zonas, con «Artistas» subrayado como «Design». Diferencias de la spec: 4 celdas y panel en el flujo, sin velo | Subnivel del menú (`int-menu-artistas-390`) |
| Colección ↔ Artistas | `lado-artistas-*` | **Sí** | **Sí** |
| Edit (Black Metal) ↔ Ediciones | `lado-ediciones-*` | **Sí en estructura.** Débil en materia: las tapas planas (defecto 1) | Igual, más marcado a 390 y 768 |
| Producto ↔ Edición | `lado-edicion-*` | Sí en composición; la primera imagen es la tapa plana (defecto 1) | Primer viewport casi entero negro (defecto 1) |
| Edit (LDF) ↔ Encuentro | `lado-encuentro-*` | **Sí.** Número enorme en lugar del título sobre la foto, foto a sangre, intro centrada, franja de 4, mitades alternadas, preguntas y foto sobre el pie | **Sí** |
| /events ↔ Libro | `lado-libro-*` | **Sí.** H1 centrado, destacado a sangre 1440 × 960 y pares de 2 × 684, más el mapa de 369, propio | **Sí.** Uno por fila a sangre con pie centrado |
| Evento ↔ Encuentro activado | `lado-activado-*` | **Sí.** H1 serif mayúscula centrado, fila de datos, bajada y foto a sangre | **Sí** |
| About ↔ Acerca | `lado-acerca-*` | **Sí.** Mitades: imagen 2:3 pegada a la cabecera y texto a la derecha | **Sí** |
| Página de texto ↔ Contacto, Activar, 404 | `lado-contacto-*`, `lado-activar-*` | **Sí.** Columna de 704, H1 serif recto, H2 en mayúscula serif; botón lleno grafito = SEND ENQUIRY | **Sí** |
| Cromo y pie | Todos | **Sí.** Cabecera de tres zonas, sin borde y en el flujo; pie grafito con titular en serif de tres itálicas, enlace con línea y tres columnas | **Sí** |

**Ningún tipo de página exigido se lee como esqueleto.** No hay posiciones de imagen vacías o grises ni instrucciones en pantalla; el texto de muestra se lee terminado con su marca «muestra». La única zona débil, Ediciones/Edición, está en el defecto 1.

**Disrupciones de María (brief §7, D22), por vista, a 1440 y a 390:**
- **Inicio:** a 1440, palabra enorme (MÓDULO 369, 311 px), imagen desplazada (la obra corrida a la derecha del muro de la lámina 1), color que desentona (el punto final del enunciado en cobalto) y palabra casi escondida («Libro», 12 px gris, sola en su fila). A 390: imagen desplazada (la obra contra el borde derecho de la lámina 4:5), el punto cobalto en el enunciado de 46,8 px y «Libro».
- **Artista:** cambio de escala: nombre en itálica de 80,64 px (1440) y 48 px (390) contra pies de 12, con el detalle de su obra a sangre en el hero.
- **Ficha:** cambio de escala: el detalle al mismo ancho que la obra entera (781 a 1440; a sangre de 390 en la misma caja, a 390).
- **Encuentro:** cambio de escala y color: contador 007/369 de 200 px (1440) y 72 px (390) con la «/» en cobalto, y el enlace vertical «LIBRO →» a la derecha.

## Cumplimiento del brief (§7 y §10)
| Criterio | Estado |
|---|---|
| 14 vistas abren y ningún enlace interno termina en la 404 | **Cumple** (50 de 50) |
| Cada vista muestra su fila de §3 con el relleno marcado | **Cumple** (45 capturas full) |
| EN sin castellano fijo; el idioma se mantiene al navegar | **Cumple** |
| **Terminación** lado a lado (Inicio, Artistas, Artista, Obras, Ficha, Encuentro, Libro) a 390 y 1440 | **Cumple** (tabla anterior; `lado-*`) |
| Marcado (aviso global ES/EN, A/B/C, cero precios, `alt` de relleno, `.pendiente` + «muestra», contador del Libro «LOS 7 SON DE MUESTRA») | **Cumple** |
| Ficha: dos imágenes recorribles y una obra por estado con exactamente sus botones | **Cumple** |
| Obras: cuatro filtros por su campo, combinados, con conteo y estado vacío | **Cumple** |
| Artistas sin retrato; Acerca sin hablar de María como persona | **Cumple** (Biografía de A con el taller sin persona; B y C con una obra. «María» solo en tres avisos de maqueta) |
| Tienda dice cómo se compra cada cosa y que no hay carrito; newsletter marcado como no incluido | **Cumple** |
| Disrupciones en Inicio, Artista, Ficha y Encuentro, nombradas en el acta | **Cumple** (arriba) |
| Nada fijo o pegado sobre una imagen de obra al bajar | **Cumple** (0 cruces) |
| Sin scroll horizontal a 390, 768 y 1440; capturas en `capturas/maqueta-v2/` | **Cumple** (0 en 132; las capturas del constructor existen) |
| `styles.css` sin colores ni familias nuevos | **Cumple** (tres familias; cobalto solo en sus dos trazos) |
| Acta de Javiera en contexto limpio con veredicto distinto de Rechazado | **Cumple** (esta) |
| Commit en `claude/maqueta-v2`, v1 en `main`, `?v=N` | **Cumple** (`98591d8`; `main` en `6119665`; ningún CSS o JS tocado desde `617a5ae`) |
| §10 · publicada en el link para su iPhone, `noindex` | **Cumple** (verificado en vivo hoy; cierra el defecto 1 de la ronda 1) |

## Cumplimiento de la spec
- **Desvíos no declarados: ninguno.** Lo que no coincide literal con la 2.1 está en `desvios.md`: «Todos los artistas» (40), marca a 21,6vw (41), M3 (42, 115), generador fuera de `maqueta/` (114), tapa plana (116), área táctil de la tira (112), par del menú Design (113, 117). Las medidas de §2 que tomé (tabla de mediciones) coinciden.
- **Abiertos del lado de la spec o de la decisión:** defectos 1, 2 y 3 de esta acta; D18 (`--gris`) sin decidir; para Clara, #93, #98 y #99.

## Detector anti-slop
**`antislop-web.md` §E**
```
COPY       ☑ sin verbos de folleto   ☑ sin relleno de apertura («De cada artista, la serie entera.» entra en materia)
           ☑ sin tricolon automático (MIRAR / SELECCIONAR / DECIDIR es de su mapa, con aviso)
           ☑ sin «no solo X sino Y»   ☑ sin pregunta retórica (las 3 «¿…?» son preguntas frecuentes de la caja)
           ☑ sin Title Case   ☑ registro tú, consistente   ☑ cero rayas (medido: 0)
           ☑ cero prueba social   ☑ borrar 30 % no mejora: textos de muestra cortos y concretos
ESTRUCTURA ☐→justificado: tres tarjetas iguales en Artistas y tres ediciones: es la grilla uniforme de Studio Iron (D12),
             la diferencia la pone la obra
           ☑ sin «¿por qué elegirnos?»   ☑ FAQ con preguntas reales de la caja   ☑ sin métricas inventadas
           ☑ formularios mínimos   ☑ hero no es 100vh centrado vacío (marca + obra en muro)
           ☑ orden de secciones = el de Studio Iron
CÓDIGO     ☑ landmarks (header, nav, main, footer) + un h1 por vista   ☑ cero defaults sin rol
           ☑ sin degradé ni vidrio   ☑ cero emoji   ☑ alt reales («… de relleno …»)   ☑ foco, contraste AA, labels
           ☑ imágenes dimensionadas, hero eager + fetchpriority, display=swap
           ☐→n/a: JSON-LD, canonical, sitemap (maqueta noindex por brief)   ☑ ?v=N (nada publicado cambió)
VISUAL     ☑ detector de refero-design corrido (abajo)
PRUEBAS    ☑ logo tapado  ☑ rubro cambiado (con justificación)  ☑ leído en voz alta
```
**`refero-design/anti-ai-slop.md`**
- Acento índigo o violeta: el cobalto `#1F3BD6` es azul cercano. **Abierto con justificación:** token de la dirección 3·6·9 que no se reabre (brief §8-5), lista cerrada de 2 trazos, nunca estado de interfaz (medido).
- Tarjetas por defecto: no; imagen llena + pie, sin caja ni sombra. ☑ · Franja lateral: no. ☑ · Emoji: 0. ☑ · Modo claro. ☑
- Serif editorial, crema, palabra en itálica (#4): **abierto con justificación.** Galería de arte (contexto cultural que el detector exceptúa); serif e itálicas vienen de la referencia dominante impuesta por Ramón y tienen rol (marca, nombre, título de obra, statement, titular del pie); el hueso es restricción de la clienta contra el blanco (Perrotin).
- Paleta tierra: viene de la dirección 3·6·9 aprobada, no de un default. ☑
- Rasgos de la referencia preservados, no promediados: sí (13 tipos lado a lado). ☑ · Roles de token y media: ☑ (la media de Ediciones es la más débil: defecto 1)
- MAYÚSCULAS con tracking. ☑ · Prueba de la captura junto a productos reales: pasa, con la salvedad de Ediciones. ☑

## Pruebas de fuego
- **Logo tapado:** el primer viewport a 390 sin la marca (obra en un muro, «Línea 04 (2025) · ARTISTA C · 01 / 05») podría ser otra galería; lo propio aparece al bajar (punto cobalto, banda de la caja, «Libro»). Es el costo de copiar la portada de Studio Iron por regla de Ramón; anotado, no es defecto.
- **Rubro cambiado:** la composición calzaría en una tienda de diseño porque *es* la de Studio Iron por mandato. No se trasladan el contador 001/369, el mapa de 369 casillas, la ficha de cuatro estados ni «Lo editas tú». Pasa con justificación.
- **Leído en voz alta:** «De cada artista, la serie entera. Módulo 369 es una galería de arte en línea, en español y en inglés. Muestra obra hecha en taller, en series largas, de artistas que la galería sigue de cerca.» Suena a persona.

## Lo que está bien (y conviene no perder en la corrección)
1. **La traducción a Studio Iron es literal donde tenía que serlo y las medidas lo prueban:** 464 / 194 / 129, lámina 390 × 488, contador de 59 a 331, destacado 1440 × 960, botón-fila claro y pie con titular en itálicas. Si María pide cambios, que salgan de su opinión, no de «simplificar» estas piezas.
2. **Las restricciones de María están medidas:** 0 cruces de un pegado con una foto, 0 pegados activos en el iPhone, «Lo editas tú» en el flujo (nunca encima), 0,26 % de blanco como peor caso, sin carrito, sin retratos, cobalto solo en sus dos trazos.
3. **El despliegue quedó atado al commit:** `maqueta/` solo con lo publicable y lo vivo idéntico por SHA-256; la próxima corrección se sube tal cual con su `?v=` y se verifica igual.
