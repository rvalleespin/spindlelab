# Acta de QA · María Loreto Hernández · Módulo 369, maqueta v2 (Studio Iron dominante) · ronda 1

> La escribe Javiera (`/web-qa-critico`) en **contexto limpio**: leí el brief, la spec 2.1, `desvios.md`, el copy y el código; no vi la conversación donde se construyó. Todo lo que sigue lo medí yo hoy, en esta pasada. Un intento anterior de esta misma auditoría dejó capturas y scripts en `scratch/javiera-si-r1/` sin acta: reutilicé los scripts, pero **volví a correr todas las mediciones y volví a capturar Studio Iron en vivo**. Lo de aquí sale de esas corridas nuevas (`scratch/javiera-si-r1/r2/`).

**Fecha:** 6-oct-2026, tarde · **Repo:** `GALERIA-MARIA-LORETO` · **Rama/commit auditado:** `claude/maqueta-v2` @ `617a5ae` («Maqueta v2 de Módulo 369 con Studio Iron como referencia dominante (tramos A a E)»), árbol limpio, `main` sigue en `6119665` (v1 recuperable) · **Rondas previas:** ninguna con acta.

## Veredicto
**APROBADO CON REPAROS**

Cada tipo de página se reconoce como Studio Iron puesto lado a lado con el sitio en vivo, traducido a hueso, grafito y cobalto. Las 14 vistas y la 404 pasan las mediciones duras a 390 (CDP real), 768 y 1440, en ES y EN. **Un reparo, con plazo antes de la reunión de hoy:** el link que va a abrir María (`modulo369-maqueta.pages.dev`) **sirve todavía la v1** (`styles.css?v=7`, `app.js?v=3`; la v2 es `?v=19` / `?v=11`). Hay que desplegar `617a5ae` **sin** `generar_relleno_v2.py`, y verificar el `?v=` en vivo. Si eso no se hace, María ve la v1 en su iPhone, y entonces esta aprobación no aplica a lo que ella vea. Los demás defectos son menores.

## Cómo se verificó
- **Servido:** copia byte a byte del `maqueta/` del commit (`diff -rq` sin diferencias) en `scratch/javiera-si-r1/site/maqueta`, `python3 -m http.server 8769`.
- **Navegador:** Chrome 154 headless por CDP (`scratch/javiera-si-r1/cdp.mjs`). **390 real:** `Emulation.setDeviceMetricsOverride` 390 × 844, DPR 2, `mobile: true`, UA de iPhone y táctil. 768 × 1024 y 1440 × 900 sin emulación móvil. Pliegue de Safari a 390 × 664.
- **Mediciones** (`r2/medir.mjs` → `r2/medidas-es-390.json`, `r2/medidas-es-768-1440.json`, `r2/medidas-en.json`): 22 rutas (las 14 vistas, la 404, Artista B y C, fichas a-06, b-04, a-05, a-03 y c-05) × 3 anchos × 2 idiomas = **132 mediciones**. En cada una se baja la página entera, se fuerzan las `lazy` y se deslizan todos los carriles horizontales antes de medir.
- **Interacción** (`r2/interaccion.mjs` → `r2/interaccion.json`): cuatro estados de la ficha, aviso de Comprar, filtros, recorrido con Tab (45 paradas), pegado al bajar en pasos de 120 px, «Lo editas tú», Retícula, menú de 390, panel Artistas e idioma al navegar. **Área táctil real** (`r2/hit.mjs`): barrido con `elementFromPoint`. **Carga en frío** (`r2/frio.mjs`): perfil nuevo con la caché apagada. **Enlaces** (`r2/enl.mjs`): los 50 `href="#/…"` distintos, uno por uno.
- **Imágenes** (Pillow, 326 archivos de `img/`): porcentaje de píxeles con luminancia ≥ 245 y píxeles a ≤ 12 del cobalto.
- **Studio Iron en vivo, hoy 17:2x** (`r2/cap-si` → `scratch/javiera-si-r1/r2/si/`): home, all-objects, art, record-separator, tubular-chair, andu-masebo, london-design-festival, events, saatchi-yates, black-metal, about y shipping-returns, a 1440 y a 390 (DPR 2), con el primer viewport y la página entera. Las cookies se ocultaron con CSS sin aceptarlas; no agregué nada al carrito, no envié formularios ni inicié sesión.
- **Capturas:** `capturas/qa-si-r1/`: `m369-{vista}-{390,768,1440}-{v0,full}.jpg` de las 15 rutas (90 archivos), `lado-{par}.jpg` (Studio Iron a la izquierda y Módulo 369 a la derecha; 30 pares) e `int-*.jpg` (capas, menú, panel y aviso). Los tramos de 1.800 px de cada par están en `scratch/javiera-si-r1/r2/lado/`.
- **No aplica:** JSON-LD, canonical, sitemap (brief y spec §6: maqueta `noindex` sin señales; no es defecto). Sí verifiqué `<meta name="robots" content="noindex, nofollow">`, `X-Robots-Tag` en `_headers` y en vivo, `og:title` y `og:description` sin `og:image`, y `theme-color` hueso.

## Defectos (numerados, reproducibles, accionables)
| # | Severidad | Dónde | Qué está mal | Contra qué | Cómo se reproduce |
|---|---|---|---|---|---|
| 1 | **mayor (reparo, plazo: antes de la reunión)** | Despliegue `modulo369-maqueta.pages.dev` | El link publicado sirve la **v1**: `curl -s https://modulo369-maqueta.pages.dev/ \| grep -o 'styles.css?v=[0-9]*'` devuelve `v=7` (y `app.js?v=3`); el commit auditado trae `v=19` / `v=11`. Además, `maqueta/` contiene `generar_relleno_v2.py`: si la carpeta se despliega tal cual, el script queda público. | Brief §9-1 y §10 (link en su iPhone; 390 es el ancho principal); `desvios.md` «Para la pasada siguiente» (despliegue con Ramón, excluir `*.py`) | `curl` a la URL en vivo, hoy 17:0x. Hoy `/generar_relleno_v2.py` responde 200 con el `index.html` (es el fallback de la SPA, no el script); después de desplegar la v2 sin excluirlo, respondería el script |
| 2 | menor (declarado, sin decidir) | Inicio a 1440 × 900 | M3 no pasa: la lámina empieza en y = 394 y la obra de la lámina 1 va de ≈ 443 a ≈ 961, así que queda cortada ≈ 61 px bajo el pliegue. A 390 × 664 pasa (la línea de pie termina en 639). | Spec 2.1.2 / M3; **declarado** en el desvío 42, pendiente de Lucía y Ramón | `r2/frio.mjs`: `top: 394` de la lámina a 1440 × 900; captura `r2/frio-1440x900.jpg` |
| 3 | menor | Ediciones (e-01, e-02 y e-03) y Edición (primera imagen) a 390, 768 y 1440 | La tapa plana a sangre es casi un campo liso: un rectángulo negro (e-01) o kraft (e-02) de 720 × 1.008 a 1440 y de 390 × 546 a 390, con solo «EDICIÓN 01» y «369» en Plex chico. En la Edición 01 a 390, el primer viewport es casi entero un bloque negro. Puesta al lado de Black Metal y de la ficha de Studio Iron, que usan foto de objeto, es la única zona que se lee como «bloque de color» y no como objeto fotografiado. Cumple la spec (2.6 fila 3 y 2.7, «tapa 5:7 plana»); la debilidad está en la spec, no en la obra. | Brief §10 (terminación; Ediciones no está en la lista de §7, por eso es menor); spec T8 | `capturas/qa-si-r1/m369-edicion-01-390-v0.jpg`, `lado-ediciones-1440.jpg`. Para Lucía: considerar la tapa en su muro (`muro/e-0n`, ya generada para Tienda) o una foto de la tapa cerrada sobre lino como primera imagen |
| 4 | menor (registro) | Verificación de M24, par Artistas | El par contra el menú Design abierto no se hizo (declarado en el desvío 113). Lo comparé contra la cabecera de colección y la grilla de `all-objects` y se reconoce. No pide cambio en la maqueta. | Spec M24; desvío 113 | `lado-artistas-1440.jpg`, `lado-artistas-390.jpg` |

No encontré defectos bloqueantes.

## Mediciones (valores)
| Qué | Resultado |
|---|---|
| Overflow horizontal en la página (`scrollWidth − clientWidth`, `html` y `body`) | **0** en las 132 |
| `h1` | **exactamente 1** en las 132, incluida la 404 |
| Imágenes rotas, sin cargar o sin `alt`, después de bajar y deslizar | **0** en las 132. Hero del Inicio en frío: `complete`, opacidad 1, `loading="eager"`, `fetchpriority="high"`, en el `load` a 390 y a 1440 |
| Contraste AA calculado (texto contra su fondo efectivo; 4,5:1, o 3:1 en grande) | **0 fallas** en las 132 |
| Campos | Todos con 16 px, alto ≥ 44 y label (Contacto, Activar, newsletter) |
| Áreas táctiles a 390 y 768 | Todo ≥ 44 × 44. El script centrado marcó los títulos de tira «Obras» y «Artistas» (caja de 24 de alto), pero el barrido real da **44 de alto × 59 / 79 de ancho** (el `::after` del desvío 112): pasa. «Ir al contenido» mide 1 × 1 fuera de foco (por diseño) |
| Foco con Tab | Inicio 1440 (45 paradas), Inicio 390 (44), ficha a-04 390 (45), Encuentro 1440 (44): **0 paradas sin indicador**, 0 fuera de la ventana. `:focus { outline: none }` siempre con reemplazo en `:focus-visible` (2 px grafito) |
| Nada fijo o pegado sobre una foto al bajar (pasos de 120 px) | **0 cruces** en Inicio, ficha a-04, Artista A, Encuentro, Acerca y Ediciones a 1440 (se pegan solo la marca enorme, `.ficha-cartela.pega` y `.mitad-texto.pega`, al costado o debajo) y en Inicio, ficha y Artista a 390, donde hay **0 sticky activos** (la marca enorme es `display: none`). `fixed` solo en `.reticula` |
| Estático (M7) | Hex: solo los seis tokens. 0 `box-shadow`, `filter`, `backdrop-filter`, `mix-blend-mode`, `#fff`, `white` de color, `transition: all` y `border-radius` ≠ 0. `transform` solo en las rayas del menú |
| Familias y tamaños | Archivo, IBM Plex Mono e Instrument Serif, ninguna otra. Tamaños: 12 · 13 · 14 · 15 · 16 · 20 · 26 · 36 · 48 · 72 / 140 / 200 (contador) · 46,8 / 69,12 / 100,8 (enunciado, 12vw / 9vw / 7vw) · 80,64 (nombre, 5,6vw) · 311,04 (marca enorme, 21,6vw, declarado en el desvío 41) |
| Cobalto (M6) | 1 elemento en Inicio (el punto) y 1 en Encuentro (la «/»), en los tres anchos; **0** en las otras 20 rutas, incluido el encuentro activado. 0 píxeles cobalto en las 326 imágenes |
| Blanco en imágenes (M9c) | El peor caso es `artistas/a-taller.jpg`, con **0,19 %** de píxeles ≥ 245; las demás quedan en ≤ 0,02 % (tope de la spec: 25 %) |
| Corchetes / «Lo escribe» | 0 en ES y EN, con «Lo editas tú» apagada y encendida |
| Cifras de precio y «$» | 0 (el precio es «CLP ···» con su marca «muestra») |
| Rayas largas o medias en texto visible | 0 |
| Carrito | No hay. Las únicas menciones son las que dicen que no hay carrito (Tienda y «Cómo se compra»). Comprar = botón por obra con aviso de muestra |
| EN | 0 textos fijos en castellano, a la vista ni en `alt`, `aria-label`, `title` o `placeholder`. Quedan solo los nombres que no se traducen (Módulo 369, Encuentro, Libro), «María» y la etiqueta «Español». El idioma se mantiene al navegar (EN → ficha a-04: `lang="en"`, «Field 04, 2025», «Buy · Mercado Pago →») |
| Enlaces internos | Los **50** `#/…` distintos llevan a una vista real, 0 caen en la 404. Una ruta inventada termina en la 404 («Esta página no existe. · Módulo 369 · maqueta») |
| 4 estados de la ficha | a-04: «Comprar · Mercado Pago →», «CLP ··· muestra» y el enlace «Consultar por esta obra»; el aviso aparece al tocar Comprar. a-06 y c-05: «Consultar por esta obra →» + «Precio a consultar». b-04: «Consultar por esta obra →» + «CLP ···» (2 con precio y sin link). a-05: «Vendida». a-03: «Colección privada». **Una sola fila de acción** en cada una (brief §4) |
| Filtros | Código: cada grupo compara contra su propio campo (`app.js` 1032: `o.tecnica === fo.tecnica`, `tamCat(o)`, `o.estado`). Medido: 27 → Collage 5 (b-01, 03, 05, 07, 09) → Más de 100 cm 9 → + Vendida 1 (a-05). El conteo se actualiza; estado vacío y «Quitar filtros» existen (código y desvíos B) |
| Retícula | Apagada al cargar. Encendida: 9 columnas numeradas a 1440, solo líneas y sin relleno, sin teñir la obra (`int-reticula-*.jpg`) |
| «Lo editas tú» | Etiquetas en el flujo, sobre grafito (por ejemplo «Portada: eliges qué obras van y en qué orden.», «Precio: lo muestras o lo dejas…», «Texto fijo…»); ninguna sobre una obra (`int-edita-*.jpg`). Con la capa encendida, la ficha muestra «Estado X de 4» y «Ver estado 1 · 2 · 3 · 4 · 2 con precio» |
| Rótulo «Libro» | Vertical «LIBRO →» a la derecha del contador en Encuentro (1440 y 390); «Libro» casi escondida en el Inicio |
| Señales | `noindex, nofollow` en meta y en `X-Robots-Tag` (también en vivo); `<title>` por vista con el formato de copy §3.5; `og` sin imagen |

## Lado a lado con Studio Iron en vivo (exigencia central · T8 / M24)
Por par: ¿se reconoce como Studio Iron con la paleta de Módulo 369? ¿Se lee como esqueleto?

| Tipo de página | Par | 1440 | 390 |
|---|---|---|---|
| Portada ↔ Inicio | `lado-inicio-1440.jpg`, `lado-inicio-390.jpg` | **Sí.** La marca de borde a borde con la itálica en la primera palabra, la lámina a sangre debajo, el enunciado en serif mayúscula centrado con su párrafo, la tira de 3 tarjetas con pie «título \| AUTOR», la banda de foto, la segunda tira, la banda final que toca el pie grafito y el titular del pie con itálicas: es la secuencia de la home de Studio Iron | **Sí.** Cabecera de rayas + marca + EN, la lámina 4:5 con línea de pie y controles, el enunciado en el segundo viewport y tiras de borde a borde con costura de 1 px |
| Tienda ↔ Tienda / Obras (muro) | `lado-tienda-*`, `lado-obras-390.jpg` | **Sí.** H1 centrado y grilla de 3 × 464 con celdas llenas y pie de una línea (all-objects) | **Sí.** 2 × 194 de borde a borde, pie apilado y centrado |
| /art ↔ Obras (Lista) | `lado-obras-lista-1440.jpg` | **Sí.** Una obra por fila a la izquierda, con cartela «ARTISTA / *Título, año* / técnica / medidas / botón contorno» al costado: es /art. Los filtros en celdas y opciones agregan una franja que Studio Iron no tiene; es exigencia del brief §7 y está en el vocabulario de la referencia (D21) | Muro por defecto (2.4.2) |
| Producto ↔ Ficha | `lado-ficha-1440.jpg`, `lado-ficha-390.jpg`, `lado-ficha-art-390.jpg` | **Sí.** Imágenes apiladas a 781 con la cartela a ≈ 67 px; botón-fila claro «Comprar … Mercado Pago →» como «Add To Bag £…» | **Sí.** Imagen a sangre con dos segmentos, la cartela inmediatamente debajo y el botón-fila con borde en los 4 lados (tubular-chair). Sin barra fija de compra (bien: restricción de María) |
| Diseñador ↔ Artista | `lado-artista-1440.jpg`, `lado-artista-390.jpg` | **Sí.** Hero a sangre, nombre en itálica grande, grilla, una pausa de texto, mitades (Biografía con taller), obra sola a sangre, cita en itálica junto a una obra y fila de detalles sobre el pie (andu-masebo + kouros). El hero de A es sobre todo campo crema (lo dice el desvío 80): se lee como textura, no como vacío | **Sí** |
| Menú Design + colección ↔ Artistas | `lado-artistas-*` | **Sí** (contra la colección; desvío 113) | **Sí** |
| Edit ↔ Ediciones | `lado-ediciones-*` | **Sí en estructura** (franja de 4 a sangre, bloques partidos alternados, banda, última tapa sobre el pie). **Débil en materia:** las tapas planas se leen como bloques de color (defecto 3) | Igual |
| Producto / art ↔ Edición | `lado-edicion-*` | Sí en composición; misma debilidad de la tapa (defecto 3) | Primer viewport casi entero negro (defecto 3) |
| Evento / edit (LDF) ↔ Encuentro | `lado-encuentro-*` | **Sí.** Número enorme en lugar del título sobre la foto, foto a sangre, intro centrada, franja de 4 registros, mitades alternadas con texto alineado hacia la imagen, preguntas en columna y foto sobre el pie | **Sí** |
| /events ↔ Libro | `lado-libro-*` | **Sí.** H1 centrado, destacado a sangre y pares de 2 × 684 con pie en serif (Studio Iron exacto), más el mapa de 369, que es propio | **Sí.** Uno por fila a sangre con pie centrado |
| Página de evento ↔ Encuentro activado | `lado-activado-*` | **Sí.** H1 en serif mayúscula centrado, fila de datos, bajada y foto a sangre (saatchi-yates) | **Sí** |
| About ↔ Acerca | `lado-acerca-*` | **Sí.** Mitades: imagen 2:3 a la izquierda pegada a la cabecera y columna de texto justificado a la derecha | **Sí.** Imagen a sangre y texto debajo |
| Página de texto ↔ Contacto, Activar, 404 | `lado-contacto-*`, `lado-activar-*` | **Sí.** Columna de 704 con H1 en serif recta y H2 en mayúscula serif (shipping-returns); el botón lleno grafito es el SEND ENQUIRY | **Sí** |
| Cromo y pie | Todos | **Sí.** Cabecera de tres zonas, sin borde, en el flujo (no fija: bien por Escat); pie grafito con titular serif de tres itálicas, enlace con línea y tres columnas | **Sí** |

**Ningún tipo de página se lee como esqueleto.** No hay posiciones de imagen vacías o grises ni instrucciones en pantalla. El texto de muestra se lee terminado, con su marca «muestra» discreta.

**Disrupciones de María (brief §7, D22), por vista:**
- **Inicio:** a 1440, palabra enorme (MÓDULO 369 de borde a borde, 311 px), imagen desplazada (la obra corrida a la derecha del muro de la lámina 1), color que desentona (el punto final del enunciado en cobalto) y palabra casi escondida («Libro», 12 px gris, sola en su fila). A 390: imagen desplazada (la obra contra el borde derecho de la lámina 4:5), el punto cobalto en el enunciado de 46,8 px y «Libro».
- **Artista:** cambio de escala. El nombre en itálica de 80,64 px a 1440 y de 48 a 390, contra pies de 12, más el detalle de su obra a sangre en el hero.
- **Ficha:** cambio de escala. El detalle al mismo ancho que la obra entera (781 a 1440; a sangre de 390, en la misma caja, a 390).
- **Encuentro:** cambio de escala y color. Contador 007/369 de 200 px a 1440 y de 72 a 390, con la «/» en cobalto, y el enlace vertical «LIBRO →».

## Cumplimiento del brief (§7)
| Criterio | Estado |
|---|---|
| 14 vistas abren y ningún enlace interno termina en la 404 | **Cumple** (50 de 50) |
| Cada vista muestra su fila de §3 con el relleno marcado | **Cumple** (recorrido de las 15 capturas full a tres anchos) |
| EN sin castellano fijo; el idioma se mantiene al navegar | **Cumple** |
| **Terminación** lado a lado (Inicio, Artistas, Artista, Obras, Ficha, Encuentro, Libro) a 390 y 1440 | **Cumple**: ver la tabla anterior; capturas lado a lado en `capturas/qa-si-r1/lado-*` |
| Marcado (aviso global ES/EN, A/B/C, cero precios, `alt` de relleno, `.pendiente` + «muestra», contador del Libro «los 7 son de muestra») | **Cumple** (el aviso está en las 132 mediciones; el contador dice «ACTIVADOS: 7 DE 369 · LOS 7 SON DE MUESTRA») |
| Ficha: dos imágenes recorribles y una obra por estado con exactamente sus botones | **Cumple** |
| Obras: cuatro filtros por su campo, combinados, con conteo y estado vacío | **Cumple** |
| Artistas sin retrato; Acerca sin hablar de María como persona | **Cumple** (la Biografía de A usa la foto del taller, sin persona; las de B y C usan una obra. «María» solo aparece en avisos de maqueta) |
| Tienda dice cómo se compra cada cosa y que no hay carrito; newsletter marcado como no incluido | **Cumple** |
| Disrupciones en Inicio, Artista, Ficha y Encuentro, nombradas en el acta | **Cumple** (arriba) |
| Nada fijo o pegado sobre una imagen de obra al bajar | **Cumple** (0 cruces) |
| Sin scroll horizontal a 390, 768 y 1440; capturas en `capturas/maqueta-v2/` | **Cumple** (0 en 132; las capturas del constructor existen) |
| `styles.css` sin colores ni familias nuevos | **Cumple** |
| Acta de Javiera en contexto limpio con veredicto distinto de Rechazado | **Cumple** (esta) |
| Commit en `claude/maqueta-v2`, v1 en `main`, `?v=N` subido | **Cumple** (`617a5ae`; `main` en `6119665`; `styles.css?v=19`, `app.js?v=11`) |
| §10 · publicada en el link para su iPhone | **No cumple todavía**: el link sirve la v1 (defecto 1) |

## Cumplimiento de la spec
- **Desvíos no declarados: no encontré ninguno.** Lo que contrasté contra la 2.1 y no coincide literal está todo en `desvios.md`: marca a 21,6vw (41), tilde y pliegue (42), texto del enlace del pie (45), filtros de tamaño (57), Lista con «Ver la obra» (59), navegación de la ficha (66), área táctil de la tira (112), Artistas contra all-objects (113), presentación de preguntas omitida (93), etc. La escala tipográfica medida en pantalla coincide entera con 1.2.11 más los vw declarados.
- **Abiertos del lado de la spec o de la decisión:** desvío 42 (M3 a 1440 × 900) y D18 (`--gris` `#5E5A53`), los dos para Ramón y Lucía; la tapa plana (defecto 3); [para Clara] #93, #98 y #99.

## Detector anti-slop
**`antislop-web.md` §E**
```
COPY       ☑ sin verbos de folleto (búsqueda de impulsa/soluciones/descubre/potencia: 0)
           ☑ sin relleno de apertura   ☑ sin tricolon automático (MIRAR/SELECCIONAR/DECIDIR es de su mapa, con aviso)
           ☑ sin «no solo X sino Y»   ☑ sin pregunta retórica (las 3 «¿…?» son preguntas frecuentes reales de Encuentro)
           ☑ sin Title Case   ☑ registro tú, consistente   ☑ cero rayas (medido: 0)
           ☑ cero prueba social   ☑ borrar 30 % no mejora: los textos de muestra son cortos y concretos
ESTRUCTURA ☐→justificado: tres tarjetas iguales en Artistas y tres ediciones (es la grilla uniforme de Studio Iron, D12;
             la diferencia la pone la obra; spec §11)
           ☑ sin «¿por qué elegirnos?»   ☑ FAQ con preguntas reales de la caja   ☑ sin métricas inventadas
           ☑ formularios mínimos (3 campos)   ☑ hero no es 100vh centrado vacío (marca + obra en muro)
           ☑ orden de secciones = el de Studio Iron
CÓDIGO     ☑ landmarks (header, nav, main, footer) + un h1 por vista   ☑ cero defaults sin rol (tokens con «dónde no»)
           ☑ sin degradé ni vidrio   ☑ cero emoji   ☑ alt reales («… de relleno …»)   ☑ foco, contraste AA, labels
           ☑ imágenes dimensionadas, hero eager + fetchpriority, display=swap
           ☐→n/a: JSON-LD, canonical, sitemap (maqueta noindex por brief)   ☑ ?v=N subido
VISUAL     ☑ detector de refero-design corrido (abajo)
PRUEBAS    ☑ logo tapado  ☑ rubro cambiado (con justificación)  ☑ leído en voz alta (abajo)
```
**`refero-design/anti-ai-slop.md`**
- Acento índigo o violeta: el cobalto `#1F3BD6` es un azul cercano a la familia. **Abierto con justificación:** es token de la dirección 3·6·9 que no se reabre (brief §8-5), en una lista cerrada de 2 trazos, nunca estado de interfaz (medido: 1 elemento en dos vistas).
- Tarjetas por defecto: no; son imagen llena + pie, sin caja (pasa la prueba de la tarjeta). ☑
- Franja lateral, emoji: 0. ☑ · Modo claro. ☑
- Serif editorial en piloto automático, crema, palabra en itálica (#4): **abierto con justificación**. El producto es una galería de arte (contexto cultural que el detector exceptúa), la serif con itálica viene de la referencia dominante impuesta por Ramón y tiene rol (marca, nombre, título de obra, statement, titular del pie), y el hueso es restricción de la clienta contra el blanco (Perrotin). El punto cobalto es disrupción pedida por María.
- Rasgos de la referencia preservados, no promediados: sí; el lado a lado lo muestra en los 13 tipos. ☑
- Roles de token y de media: con media generada, sin CSS falso. ☑ · MAYÚSCULAS con tracking. ☑
- Prueba de la captura junto a productos reales: pasa (lado a lado). ☑

## Pruebas de fuego
- **Logo tapado:** el primer viewport a 390 sin la marca (obra en un muro, «Línea 04 (2025) · ARTISTA C · 01 / 05») podría ser otra galería. Lo propio de Módulo 369 aparece al bajar: el punto cobalto, la banda de la caja «007/369» y «Libro». Es el precio de copiar la portada de Studio Iron, que es regla de Ramón; lo dejo anotado, no es defecto.
- **Rubro cambiado:** la composición calzaría en una tienda de diseño, porque *es* la de Studio Iron por mandato. Lo que no se traslada son el contador 001/369, el mapa de 369 casillas del Libro, la ficha con cuatro estados y la capa «Lo editas tú». Pasa con justificación.
- **Leído en voz alta:** «De cada artista, la serie entera. Módulo 369 es una galería de arte en línea, en español y en inglés. Muestra obra hecha en taller, en series largas…». Suena a persona, sin folleto.

## Lo que está bien (y conviene no perder en la corrección)
1. **La traducción a Studio Iron es literal donde tenía que serlo:** la marca enorme que la lámina tapa al bajar, el botón-fila claro, la grilla de 464 / 194 con costura de 1 px, los pares de 684 del Libro y el pie con titular en itálicas. Si María pide cambios, que salgan de su opinión, no de «simplificar» estas piezas.
2. **Las restricciones de María están medidas, no prometidas:** 0 cruces de un elemento pegado con una foto al bajar en los tres anchos, 0 blanco intenso en 326 imágenes, sin carrito, sin retratos y cobalto solo en sus dos trazos.
3. **La terminación del relleno:** texto de muestra verosímil con marca «muestra» discreta, 0 corchetes, 4 estados de ficha con datos coherentes y una capa «Lo editas tú» que explica el panel sin dibujarlo.
