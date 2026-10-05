# Spec visual — SpindleLab · sitio entero en el lenguaje de driftime

**Vigente desde el 5-oct-2026.** El contrato que construye Diego y audita Javiera. Una
corrección que no termina escrita acá vuelve a aparecer en la pasada siguiente.

- **Referencia dominante:** driftime.com, **medida** (`referencia-driftime/lock-driftime.md`).
- **Rasgo que se preserva:** un sistema de imágenes con una tipografía display escasa.
- **Qué sacrifica:** densidad de imagen (hay ~13 honestas contra ~25 de driftime) y el muro
  de logos (no existe: cero prueba social inventada).
- **Implementación de referencia:** `tableros/driftime-home/` y `tableros/driftime-desarrollo/`.
  Ante la duda, se mira el tablero, no se improvisa.

## 0 · Decisiones de Ramón que este documento ejecuta (5-oct-2026)
1. Se extiende a **todo el sitio**, no solo el hero.
2. **Mayúsculas 800 solo en cinco lugares** (titular del hero y las cuatro palabras de campo).
   El manual de marca quedó actualizado (§05).
3. **Mockups compuestos con lo que hay, sin costo**: la obra real montada en dispositivos
   sobre fotografía propia. Nada de generación pagada.
4. Sigue vigente de antes: **dirección A** (el instrumento primero en la home), **criterio de
   éxito = conversión**, **no se publica** (todo bajo `/v3/` con `noindex`).

## 1 · Tokens (`src/styles/driftime.css`)

| Token | Valor | Rol | Dónde NO |
|---|---|---|---|
| `--noche` | `#000` | lienzo | — |
| `--modulo` | `#161616` | módulo de nav, píldoras, notas, botón secundario | nunca como fondo de sección |
| `--filete` | papel al 12 % | separadores de fila | nunca como borde de tarjeta |
| `--papel` | `#F7F5F0` | texto principal, botón primario, el campo del chequeo | nunca blanco puro salvo en brasa |
| `--gris` | `#9AA4B0` | texto secundario (6,9:1 sobre negro) | nunca para texto de acción |
| `--oro` | `#C9A227` | **solo** el punto del wordmark del módulo | nada más, nunca |
| `--brasa` / texto `#FFFFFF` | `#DA3400` | campo Desarrollo | — |
| `--navy` / `#E4F1EC` | `#0E2A47` | campo Visibilidad | — |
| `--petroleo` / `#FFF4E2` | `#0F766E` | campo Continuidad | — |
| `--ciruela` / `#FFEFDD` | `#341F34` | campo Alcance | — |
| `--r` | `6px` | **el único radio** | 4 px solo dentro de un control (botón dentro del campo, píldora activa) |
| `--m` | 40 px / 20 px celular | margen lateral | — |
| `--g` | 16 px / 10 px celular | gutter entre piezas | — |

Los cuatro pares campo/texto tienen el contraste medido (AA de cuerpo) desde la v3. Brasa
lleva blanco puro: driftime falla ahí (3,70:1) y no se copia.

## 2 · Tipografía
Ver manual §05. Resumen operativo:
- **`.display`** — Manrope 800 MAYÚSCULAS, `clamp(2.4rem,10vw,7.5rem)`, interlínea 0,9. **Cinco
  usos en todo el sitio. Una página interna tiene cero.** Si una interna necesita gritar,
  está mal diseñada.
- **`.h-caso`** (h1 interno) 60 px 500 · **`.h-sec`** (h2) 30 px 500 · **`.h-sub`** (h3) 24 px 500.
- **`.guia`** 24 px 400 · **`.cuerpo`** 18 px 400 gris · **`.btn`** 14 px 500.
- Gabarito: **solo** el wordmark (módulo y pie gigante).

## 3 · Componentes
- **Nav** (módulo fijo arriba a la izquierda): wordmark con punto de oro · `Escríbenos` ·
  menú. El menú abre el overlay con todas las páginas (lógica de `NavV3`).
- **`.btn`** papel/negro, 36 px de alto, 14 px. **`.btn.alt`** módulo/papel. Nunca un botón
  grande, salvo el del chequeo.
- **`.pills`**: píldoras dentro de un módulo; la activa en papel al 14 %. En los campos con
  dos servicios funcionan como pestañas.
- **`.pieza`**: figura con radio 6 y etiquetas **arriba a la izquierda** (abajo las tapa el
  aviso de cookies). La pieza de concepto lleva su rótulo en papel, visible sin scroll.
- **`.fila`**: grilla de piezas en escritorio; **carrusel con la siguiente asomándose** en
  celular (`scroll-snap`).
- **`.campo`**: pantalla completa, `position: sticky`, se apilan. Título display · píldoras ·
  descripción 24 px · línea de precio · botones · fila de imágenes al fondo.
- **`.precio`**: `Desde | $X … | + IVA`, **exactamente** con las cifras de los JSON de datos.
- **Sección pegajosa** (`.sec` + `.eti`): etiqueta h2 pegajosa a la izquierda (5/12), texto a
  la derecha (7/12). En celular se apila y la etiqueta deja de pegarse.
- **`.filas`**: lista editorial separada por filetes. **Nunca tarjetas iguales en grilla**
  (tell B1 del detector).
- **Banda del índice** (`.d-banda-sidx`, solo en `/servicios/`): la versión de índice del
  `.campo`. Un momento por banda, en el color de su campo; a la izquierda (5/12) rótulo en caja
  normal + h2 + nota, a la derecha (7/12) sus servicios como filas enlazadas (nombre, flecha,
  línea, precio). **Alto variable**, no pantalla completa: mide de 370 a 590 px entre 768 y
  1920 de ancho. **Filete en el color del texto al 32 %** (`color-mix` de `currentColor`), no
  `--filete`: medido contra el fondo, el papel al 12 % da 1,14:1 sobre brasa y 1,24:1 sobre
  petróleo (casi no se ve); el texto al 32 % da 1,57 y 1,77. Es separador, no texto, así que
  no afecta el contraste de lectura. **Pegajosa solo con ancho ≥ 768 px y alto ≥ 680 px**; por debajo se
  apilan sin pegarse, para que ninguna esconda su final bajo la siguiente. Todo el texto de la
  banda al 100 % (brasa 4,70:1 y petróleo 5,06:1 no tienen margen para opacidad).
  Línea de precio: cada alternativa con su plan no se parte, y hay espacios reales entre las piezas.
- **Pie**: llamado + enlaces en dos columnas + **wordmark gigante** (`100cqi / 4.78`) con el
  punto en papel.

## 4 · Plantillas por tipo de página

| Plantilla | Páginas | Estructura |
|---|---|---|
| **Home** | `/` | instrumento → display → fila de 4 obras → presentación → 4 campos pegajosos → quién está detrás → El Taller → pie |
| **Servicio** (el caso de driftime) | las 6 de `/servicios/*` | miga · h1 60 px · línea · 2 botones → imagen a sangre → nota + entrada → secciones pegajosas (incluye, planes, fases, preguntas) con una galería entre medio → siguiente servicio → pie |
| **Índice** | `/servicios/`, `/trabajo/`, `/blog/` | h1 60 px + entrada → filas editoriales (servicios: con su campo de color y precio; trabajo: piezas grandes con rótulo; blog: fecha · título · flecha) |
| **Editorial** | `/metodo/`, `/nosotros/` | h1 60 px → imagen → secciones pegajosas |
| **Artículo** | los 7 posts | miga (`Inicio · Blog · <nombre corto>`) · h1 60 px · tema · fecha · lectura · autor (avatar 44 + nombre + rol) → imagen editorial → etiqueta pegajosa con el índice del artículo + cuerpo verbatim a la derecha (medida ≤ 68 caracteres) → **cierre**: `.d-sec--quieta` «Leer ayuda; medir, más.» + guía + `Correr el chequeo` (→ `/v3/diagnostico/`) y `Escríbenos` → siguiente artículo |
| **Herramienta** | `/diagnostico/`, `/contacto/` | h1 60 px + una línea → el instrumento o el formulario como protagonista → secciones pegajosas de apoyo |

## 5 · Imagen
**Se usa** (pool honesto): obra (Combeau ×2 con permiso, Verifica y Cumple propio, Raigal
concepto rotulado), mockups compuestos de esa obra (`obra/mock-<caso>-ancho.jpg` 4:3 y
`-alto.jpg` 10:11; cómo se hicieron en `mockups/README.md`), hilo de oro, dominó ×2, hilos, escritorio,
ventana, retrato de Ramón.
**No se usa nunca:** `hero-*.jpg`, `estrategia-mesa.jpg`, `equipo-creativo.jpg`,
`servicios-oficina`, `evidencia-oficina`, `metodo`, `problema`, `foto-banner-original` — son de
banco o muestran equipos que no existen. `servicios-capas` y `evidencia-medicion` llevan un
punto dorado dibujado: serían un segundo oro en la vista, así que tampoco.
`hilos.jpg` **es un recorte** (5-oct): la foto original traía una línea de oro de lado a lado,
y junto al punto del módulo eran dos oros en la misma vista. Se recortó bajo la línea; no se
vuelve a la versión completa.
**Video:** solo `hero-hilo-de-oro.mp4`, y solo si no hay `prefers-reduced-motion`.

## 6 · Lo que esta spec prohíbe explícitamente
- Mayúsculas 800 fuera de los cinco lugares. Rótulos en mayúsculas espaciadas tampoco.
- Más de un oro por vista. El oro es el punto del módulo; nada más.
- Tarjetas con borde parejo en grilla. Se usan filas con filete.
- Cualquier imagen de la lista negra de §5.
- Cifras, logos o testimonios sin respaldo. Precios distintos a los de los JSON de datos.
- Tocar `Layout.astro`: ahí viven gtag, el consentimiento, el Pixel y el aviso de cookies.
- Cambiar los nombres del formulario (`.contact-form`, `#f-utm-*`, `.form-status`,
  `.form-success`) o los ids del chequeo (`chq-form`, `chq-dominio`, `chq-btn`, `chq-out`,
  `chq-error`).
- Cambiar una URL publicada.

## 7 · Historial de correcciones
| Fecha | Qué | Regla o preferencia | Quién |
|---|---|---|---|
| 5-oct | Mayúsculas solo en el display | **regla** (manual §05) | Ramón |
| 5-oct | Precios siempre «desde … + IVA» | **regla** | encuadre (se publicaban sin IVA en el tablero) |
| 5-oct | Etiquetas de pieza arriba, no abajo | **regla** | QA del tablero (el aviso de cookies las tapaba) |
| 5-oct | Wordmark del pie con `cqi`, no `vw` | **regla** | QA del tablero (se cortaba) |
| 5-oct | Sin Gabarito/Inter: la escasez se logra en Manrope | **regla** | corrección propia (revertía la aprobación del 29-sep) |
| 5-oct | Mockups sobre fondo de color de estudio, no sobre las fotos del pool | **preferencia** (la foto no lo permite: notebooks cerrados) | Diego, al componerlos |
| 5-oct | `hilos.jpg` sin la línea de oro (recorte) | **regla** (un oro por vista) | Diego, al construir Visibilidad en IA |
| 5-oct | El JSON-LD de una página va en `slot="head"`; el Layout **no tiene** prop `jsonLd` (Astro la ignora sin error y el grafo se pierde) | **regla** | Diego, en Trabajo |
| 5-oct | Una pieza cuya captura trae el aviso de concepto horneado se muestra en su mockup, no en la captura plana (el rótulo de `Pieza` tapaba el aviso) | preferencia | Diego, en Trabajo |
| 5-oct | Línea de precio en flujo de texto, no flex: «+ IVA» pegado a la última cifra, nunca huérfano; rótulos sin opacidad (a 0,72 medían 3,05:1 sobre brasa) | **regla** | verificar.mjs, índice de servicios |
| 5-oct | Wordmark gigante con margen inferior `0,16 em + 16 px`: la «p» baja 0,15 em bajo su caja y pisaba la línea legal | **regla** (medido) | cinco constructores por separado |
| 5-oct | Línea legal del pie en `--gris`, no `--gris-2` (4,12:1 a 13 px) | **regla** | verificar.mjs |
| 5-oct | `.d-sec--quieta` para secciones cortas: la etiqueta no se pega | componente | Diego, en el blog |
| 5-oct | `.d-fase` en una columna en celular (la de 56 px dejaba el texto en ~270 px) | **regla** | Diego, en Método |
| 5-oct | El resultado del chequeo se adapta al sistema en `chequeo-v3.css` (antes salía con el botón principal invisible) | **regla** | Diego, en Diagnóstico, con respuesta simulada |
| 5-oct | `oro1 = 1` es lo esperado en toda página (el punto del módulo); 2 o más es defecto | aclaración de medición | tres constructores |
| 5-oct | Componente «banda del índice» (§3): alto variable, filete `currentColor` al 32 %, pegajosa solo ≥ 768 × 680 | componente | QA del índice de servicios (estaba construido y sin declarar) |
| 5-oct | Línea de precio: cada alternativa con su plan va en `white-space: nowrap` (a 390 cortaba «… con Visibilidad» / «IA + IVA»), y las piezas llevan espacios reales con el separador `aria-hidden` (sin CSS se leía «Desde$390.000…+ IVA») | **regla** | QA del índice de servicios |
| 5-oct | Un botón «chequeo» lleva a `/v3/diagnostico/` y su texto describe el chequeo automático (tu sitio, en segundos); la competencia es del diagnóstico completo, no del chequeo | **regla** | QA del índice de servicios (bloqueante) |
| 5-oct | Índice del blog (desvío de §4): la fila del artículo más reciente se abre con una imagen del pool + bajada + botón 36 px (la fila de Novedades de driftime, lock §5); las demás, fecha · título · flecha. En celular la imagen va **después** del texto: delante sacaba el primer título del primer pantallazo | preferencia | Diego, en el blog (QA: estaba construido y sin declarar) |
| 5-oct | Medida del cuerpo del artículo con tope en **em, no en ch**: `ch` es el ancho del cero y en Manrope `68ch` daban ~87 caracteres reales (el tope nunca actuaba). Medido con Range carácter por carácter: `28.5em` en p, li y blockquote (máx. 66–67 en las 5 rutas, a 1280 y 1440) y `31em` en la nota de 16 px | **regla** (manual §05, medido) | QA del artículo (bloqueante) |
| 5-oct | El artículo cierra con un paso de conversión antes de «Siguiente artículo»: el cierre del índice del blog, mismas palabras y mismo componente. Faltaba en §4: era un defecto de la spec, no del constructor | **regla** | QA del artículo |
| 5-oct | Miga del artículo: `Inicio · Blog · <nombre corto>`. La publicada decía «Inicio › Chequeo gratis › El Taller › …»: se saca «Chequeo gratis» (no es un padre del post) y «El Taller» pasa a «Blog», como el menú, el índice y su BreadcrumbList. El BreadcrumbList del post dice lo mismo que la miga visible | **regla** (antislop C8) | QA del artículo (estaba construido y sin declarar) |
| 5-oct | Cabecera del artículo con autor (avatar 44 + nombre + rol, del post publicado), entre la línea de fecha y la imagen | preferencia | QA del artículo (estaba construido y sin declarar) |
| 5-oct | Una página no repite en su JSON-LD los nodos que ya emite el Layout (`#org`, `#autor-ramon`): se filtran al serializar, sin tocar Layout. Las referencias por @id siguen apuntando a los nodos completos | **regla** | QA del artículo (la referencia, desarrollo-web, ya lo hacía) |
| 5-oct | Diagnóstico (desvío de §4, Herramienta): entre el instrumento y las secciones va la imagen a sangre (`d/hilo.jpg`) + `.d-entrada` de la plantilla Servicio (nota «21 chequeos, 100 puntos» + guía + `Pedir el diagnóstico` 36 px `--alt`). Por qué: la entrada lleva el primer «Pedirlo» de la página (brief §3), que antes aparecía recién a 4,3 pantallas en 1440 y a 5,4 en 390; ahora está a 1,5 y 1,1 (medido). Si se acepta, la fila Herramienta de §4 se actualiza (decide la dueña de la spec, no el constructor) | preferencia, **pendiente de aceptar** | Diego, en Diagnóstico (QA: estaba construido y sin declarar) |
| 5-oct | Diagnóstico: h2 «Lo que este chequeo no mide.» con sus dos h3 («Y cómo medimos si la IA te nombra.», «Lo que muestran las corridas.»). No está en paginas-v3.json: viene tal cual de la página publicada (`public/diagnostico/index.html`). Va sin su guía, porque la FAQ «¿Qué mide exactamente el puntaje?» dice lo mismo. La sección «Tu dominio y tus datos.» se quitó: repetía la nota del instrumento, y sus dos preguntas volvieron a la FAQ | preferencia | QA de Diagnóstico (antislop A10, regla del 30 %) |
| 5-oct | Diagnóstico: `.d-siguiente` se usa como cierre de conversión (rótulo «Una página, gratis, en 24 horas.» + «Pedir el diagnóstico →» a contacto), no como «siguiente página»: una herramienta no tiene siguiente natural, y el artículo cierra con un paso de conversión por regla | preferencia | Diego, en Diagnóstico (QA: estaba construido y sin declarar) |
| 5-oct | Diagnóstico, celular: `.d-cab-diag` con `padding-top: 124px` en vez del `min(34vh, 300px)` de `.d-cab`. Medido a 375 × 667 con el aviso de cookies abierto: con el valor de `.d-cab` el botón del chequeo termina en y=528 y el aviso empieza en 537 (9 px, y la nota bajo el campo queda tapada); con 124 px termina en 425 | preferencia (medido) | Diego, en Diagnóstico (QA: estaba construido y sin declarar) |
| 5-oct | Una página que carga el chequeo no redefine las reglas del resultado (variables, `.chq-ramas a`, `.chq-r1`, `.chq-r2`, `.chq-error-codigo`): su único dueño es el bloque «EN EL SISTEMA DRIFTIME» de `chequeo-v3.css`. La página solo ubica el resultado (márgenes) | aclaración (antislop C2) | QA de Diagnóstico (había dos fuentes de verdad) |
| 5-oct | Diagnóstico: cuatro textos van escritos en la página y no leídos del JSON, hasta que Clara/Simón corrijan `paginas-v3.json`: la línea bajo el h1 (nombraba a Gemini, que `functions/api/chequeo.js` no prueba en vivo, y omitía a Claude), la guía de la entrada (sin «Cada vez más…», A2), el rótulo de «Los 21 chequeos» (sin «ninguna herramienta del rubro…», más amplio que su respaldo) y el rótulo del cierre (sin pregunta ni «sin compromiso»). Los botones dicen «Pedir el diagnóstico», sin «completo», porque contacto lo ofrece como «mini-diagnóstico» | preferencia, **transitoria** | QA de Diagnóstico |
| 5-oct | Contacto: `.d-cab--ct` con `padding-top: 140px` (112 en celular) en vez del `min(34vh, 300px)` de `.d-cab`, para que el formulario entero quede sobre el pliegue. Medido a 1440 × 900 con el aviso de cookies abierto: botón en y 748–784, aviso en 823 (con `.d-cab` el botón bajaría a ~908, bajo el aviso y bajo el pliegue). A 390 × 844: «Sitio web» en y 614–662, aviso en 714. Por eso contacto y diagnóstico arrancan a alturas distintas en escritorio: el instrumento del chequeo cabe con la `.d-cab` normal y el formulario no | preferencia (medido) | QA de Contacto (estaba construido y sin declarar) |
| 5-oct | Componente **campo de formulario** (§3), hoy solo en contacto: relleno `--modulo`, borde papel al **32 %** (3,24:1 contra el lienzo, WCAG 1.4.11; al 30 % medía 2,99:1 y el filete al 12 % ~1,3:1), radio 6, 48 px de alto, texto 16 px (iOS no hace zoom al enfocar), etiqueta visible arriba en papel 15 px 500; hover al 50 %, foco con borde papel más el contorno de 2 px del sistema. Es el único uso de `--modulo` con borde | componente | QA de Contacto (estaba construido y sin declarar) |
| 5-oct | La caja de éxito del formulario (`.d-ct-listo`, reemplaza al formulario cuando el envío sale bien) va sobre `--modulo` con radio 6: entra en el rol «notas» de §1, nunca como fondo de sección | componente | QA de Contacto (estaba construido y sin declarar) |
| 5-oct | Contacto sin imagen a sangre, como dice la plantilla Herramienta (§4). La `ventana.jpg` que iba entre el formulario y los pasos se sacó: ya está en cuatro páginas y separaba el formulario de su respaldo con casi una pantalla de atmósfera. Los pasos van pegados al formulario. Si dirección de arte quiere imagen aquí, la candidata es el retrato de Ramón (la cara de quien responde), sin afirmaciones nuevas | preferencia | QA de Contacto |
| 5-oct | Dentro de contacto, todo llamado a contacto (módulo, menú, pie) lleva a `#contacto-form` y no recarga la página (recargar volvía arriba y podía borrar lo escrito). Hoy lo hace un script de la página; está propuesto que lo hagan `NavV3` y `FooterV3` comparando `Astro.url.pathname` | **regla** | QA de Contacto |
| 5-oct | Contacto: cinco textos van escritos en la página y no leídos de `paginas-v3.json` hasta que Clara lo corrija: h2 «Pide tu mini-diagnóstico» (era «Cuéntanos de tu proyecto»: no se pide un proyecto), h2 «Qué pasa después» (era «Tres pasos, cero fricción», jerga startup, manual §01), «O escríbenos directo a» (era «¿Prefieres ir directo?», A5), botón «Pedir mi mini-diagnóstico →» (era «Enviar →», A5) y la respuesta del NDA. Esta última es **regla**: el JSON decía «estamos acostumbrados a trabajar bajo NDA», experiencia que nada en el repo respalda; va la versión visible de la página publicada («trabajamos bajo NDA cuando el cliente lo requiere»), en pantalla y en el FAQPage | preferencia, **transitoria** (NDA: regla, cero prueba social inventada) | QA de Contacto (bloqueante el NDA) |
| 5-oct | Contacto, atribución (brief §6): si ni la URL de contacto ni la sesión traen UTM, la página los toma de la página anterior del mismo sitio (`document.referrer`) antes de que corra `v3-contacto.js`, que los vuelca en `#f-utm-*`. Medido: `/v3/?utm_source=test&utm_medium=cpc&utm_campaign=c1` → «Escríbenos» → llegan test/cpc/c1 (antes, vacíos). **No cubre dos saltos** (anuncio → servicios → desarrollo-web → contacto sigue vacío): eso lo arregla mover la captura a `NavV3` (propuesto); cuando entre, este puente sobra | preferencia, **transitoria** | QA de Contacto |
| 5-oct | Índice de servicios: dos notas de banda van escritas en la página (`notaPagina` en `servicios/index.astro`) y no leídas de `oferta-v3.json` hasta que se corrija el JSON (compartido con la home): Desarrollo «La legibilidad para Google y para la IA viene incluida desde el primer día de construcción; no se cobra después.» (la del JSON traía dos antítesis seguidas, «primer commit» y «AEO»; fuente: la línea «Legible para motores de IA desde el primer commit…» de desarrollo-web) y Visibilidad solo «No hace falta reconstruir para que una IA pueda citarte.» (la primera frase repetía el «no lo vas a rehacer» del h2). El bloque «Lo hacemos nosotros» (`oferta.dentro`) se sacó: repetía las bandas en orden inverso; queda «Lo que no hacemos» en `.d-sec--quieta`. El texto del chequeo nombra ChatGPT, Claude y Perplexity, como la línea de `/v3/diagnostico/` (Gemini no se prueba en vivo) | preferencia, **transitoria** (las notas) | QA del índice de servicios |
| 5-oct | Nosotros: la bio va verbatim («Lo primero es un diagnóstico», meta «Diagnóstico gratis en 24 horas»); «chequeo» en la página nombra solo el automático. Cierre: «Pedir el diagnóstico» → contacto + «Correr el chequeo» → `/v3/diagnostico/`. Los cambios de envase que sí se mantienen están declarados en la cabecera de `v3/nosotros.astro` | **regla** (manual §08) | QA de Nosotros (bloqueante: se había cambiado a «chequeo» sin declararlo) |
| 5-oct | Nosotros, **dos decisiones abiertas de copy** (frases de la bio publicada; el constructor no las toca): (a) A4, «El objetivo no es solo que vendas. Es que…» → propuesta «El objetivo es que cuando alguien pregunte por tu rubro, tu nombre ya esté ahí.»; decide Ramón. (b) A10, la fila «Diagnóstico antes que contrato» y el párrafo del cierre repiten «Gratis, en 24 horas»: se quita una de las dos; decide Clara o Ramón. Mientras no decidan, van tal cual y sin destacar: no es defecto nuevo en la próxima pasada | **pendiente de decidir** | QA de Nosotros (menores) |
| 5-oct | Medida del texto corrido en las internas (manual §05, ≤ 68 caracteres): hoy `.d-filas .d-cuerpo` llega a 96–100 a 1440 y a 131–135 a 1920, y `.d-sec .d-guia` a 72–74 a 1440 y a 92–97 a 1920. Es del sistema, no de una página: se arregla en `driftime.css` y **ninguna página lo parcha localmente**. Valores medidos con Range carácter por carácter en diagnóstico y desarrollo-web, a 1280, 1440 y 1920: `68ch` y `34em` no actúan en Manrope (93 y 72–77, igual que la fila del artículo), `max-width: 28.5em` en `.d-filas .d-cuerpo` da máx. 67 y `29em` en `.d-sec .d-guia` máx. 66 | **regla** (medida), **pendiente** de que el dueño de `driftime.css` la aplique | QA de Diagnóstico |
| 5-oct | Campo de color = **una pantalla exacta**. En escritorio la fila de imágenes llena lo que deja la cabecera y **ninguna imagen se recorta** (cada pieza con su proporción natural, `proporcion` en `Pieza`); en celular las dos piezas van lado a lado dentro de la pantalla (no carrusel), Desarrollo con la obra en teléfono (`srcCel`). Bajo 680 px de alto (escritorio) o 600 px (celular) el campo deja de pegarse. Medido en 8 pantallas reales: antes se recortaba de 25 a 73 % y la segunda pieza quedaba 244 px fuera del borde | **regla** | Ramón («las imágenes quedan fuera del navegador») |
