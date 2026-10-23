# Acta de QA de obra · E12 · SpindleLab v3 sobre A · Archivo

Las escribe Javiera (`/web-qa-critico`) en contexto limpio: leyó el brief, `insumos-ramon-19oct.md`, la spec, los
inventarios, `senales-obra.md`, el texto de Clara, `desvios.md` y el código; no vio la conversación donde se construyó.
Herramientas, crudos y capturas: `e12/qa-obra/<vuelta>/`.

---

## Vuelta 1 (Javiera)

**Empezada el 19-oct-2026, 13:23 (Chile), y cortada por el límite semanal de uso antes del acta; retomada y terminada el
23-oct-2026, de 08:30 a 09:00 (Chile, reloj del contenedor).** Rama `claude/magical-franklin-ckfki2`; obra auditada en
`6739bab` (el último commit de la tanda 5, 19-oct 22:50 UTC), sin cambios de nadie después en `spindlelab-astro/`. Lo
que dejé sin commit el 19-oct (298 archivos, 32 MB) lo revisé y lo usé: las mediciones de esa tarde (auditoría por
ancho, contenido, foco, portada sobre el video, chequeo local, producción contra la base) son del build de `6739bab`, y
hoy volví a construir y a correr lo que podía haber cambiado. Navegador: Chromium 1194
(`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) con Playwright de `spindlelab-astro/node_modules`, sobre el
`dist/` servido en local por un servidor propio con rangos (`herramientas/comun.mjs`), apagado al terminar.

### Veredicto: **RECHAZADO**

Falla un criterio de aceptación (el 12: el chequeo sobre el build local saca 79 en la home, contra 83 del 16-oct) y una
regla que no se negocia (el «CONCEPTO» sin scroll, que en 768 × 1024 y 1024 × 768 no se ve), y dos reglas de la spec
quedan sin cumplir en lo que más se ve (la franja de Auditoría es un campo de color; el aviso de cookies tapa el
chequeo en el teléfono). Son cuatro defectos mayores y cuatro menores, todos chicos de arreglar: producción, el
`Layout`, el texto de Clara, las señales, la portada y el movimiento están bien y no hay que tocarlos. Vuelve a Diego,
Lucía y Clara con la lista de abajo; la vuelta 2 re-mide con las mismas herramientas.

### Lo medido

| # | Qué | Cómo | Resultado | Evidencia |
|---|---|---|---|---|
| 1 | Build | `npm run build` sobre `6739bab` (19-oct y de nuevo hoy) | 33 páginas, exit 0. El de hoy difiere del de la corrida cortada solo dentro de `v3/`: el nombre del paquete que cargan los seis casos (`hoisted.DiAbklbU.js` → `hoisted.JbKzCUgU.js`) y el `src` en esas seis páginas; fuera de `v3/`, nada | `crudos/build.log` |
| 2 | `npm run verificar -- --prefijo /v3/` | a 360, 390, 768, 834, 1024, 1194, 1440 (también con `--sin-pildoras`) y 1920 | **27 páginas, sin hallazgos en los ocho anchos.** Los 8 nodos «sobre imagen o degradado» (desde 834) son la portada: fila 13 | `crudos/verificar-*.log` |
| 3 | Producción igual byte a byte | `herramientas/comparar-dist.mjs` contra una base que reconstruí desde `03d1bb3` en un árbol aparte; y `construccion/comparar-produccion.mjs` (Diego) contra `construccion/base-dist/` | 22 HTML y 114 archivos fuera de `v3/`: **0 distintos**; los 3 de `_astro/` que cargan las publicadas, iguales; faltan 9 de `_astro/` que solo usaban las v3 de driftime; nuevos: 27 imágenes al compartir y las dos letras con su OFL. El de Diego: «Iguales byte a byte» | `crudos/comparar-dist.json` |
| 4 | Archivos protegidos | `git diff 03d1bb3 HEAD` | **Vacío** en `global.css`, `tailwind.config.mjs`, `functions/`, `public/assets/js/` (`v3-chequeo.js`, `v3-contacto.js`), `spindlelab-site/`, `public/privacidad/`, `oferta-v3.json`, `servicios-v3.json`, `paginas-v3.json`, `sitemap.xml`, `_headers`, `robots.txt`, `llms.txt`. Fuera de `v3/` cambian solo `Layout.astro`, `package.json` y su lock, `archivo.css`, las imágenes al compartir y las letras | este diff |
| 5 | `Layout.astro` | `git diff 03d1bb3 HEAD -- src/layouts/Layout.astro` | Las **cinco props** de la excepción (spec §7, 19-oct): `lenis` (por defecto `true`), `letras`, `themeColor` (`#0E141B`), `iconos`, `entidad`, cada una con el valor de antes por defecto. Ni una línea en gtag, Pixel, consentimiento ni sus scripts | este diff |
| 6 | Motion | `package.json`, lock y `node_modules` | `"motion": "13.5.0"` exacto, con la integridad de spec §5.1. `framer-motion` y `motion-dom` en 13.5.1 (declarado, tanda 1 §3) | |
| 7 | Lenis sin actuar | `herramientas/movimiento.mjs`: una muesca de 100 px y el `scrollY` cuadro a cuadro | **90 % en 18 a 20 ms** en la home, Praxi, Desarrollo web y «21 chequeos» (techo, 100 ms); `body[data-lenis-prevent]` en las 27; `html.lenis` sigue (inerte, declarado en tanda 1 §2) | `crudos/movimiento.json` |
| 8 | `a[href^="#"]` y `<!-- -->` servidos | el HTML de las 27 | **0 y 0** | `crudos/contenido.json` |
| 9 | Desborde, `h1`, landmarks | `herramientas/auditar.mjs`, 27 rutas × 8 anchos = 216 pares | Desborde **0 con y sin** `overflow-x: clip`; **un `h1`** y un `main` en los 216; `lang="es-CL"`; 0 saltos de nivel; encabezado de 90 bajo 834 y de 64 desde 834; 0 errores de consola, 0 pedidos fallidos, 0 404 | `crudos/auditar.json`, `.log` |
| 10 | Letras | lo mismo | Cargadas **solo** Google Sans Flex (100–1000) y DM Mono 500, y solo sus dos `woff2`; **0 nodos con peso ≥ 600**; 0 textos bajo 11 px; 0 mayúsculas fuera de la mono; `font-display: swap` en las dos | |
| 11 | Áreas de toque bajo 834 | `qa-paso-2/vuelta-1/herramientas/area-toque-390.js` en contexto táctil, 27 rutas a 360, 390 y 768 | 0 controles bajo 44 × 44; pero dos áreas que se pisan (**defecto 7**) | `crudos/solapes.json` |
| 12 | Foco | `herramientas/foco.mjs`, Tab adelante y atrás, 27 rutas a 1440 y 390 | La primera parada es «Saltar al contenido» con su ruta (`/v3/…/#contenido`) en las 54; contorno de 2 px en todas las paradas. Lo que marcó como «tapado», medido de cerca (`solapes.mjs`): el solape del pie a 390 y el enlace de la foto servida (**defecto 7**); el resto es la cruz de registro de 9 px rozando la esquina de una fila del índice del caso, o un elemento más alto que la ventana: no tapan el contorno | `crudos/foco.json` |
| 13 | Contraste de la portada sobre el video | `herramientas/portada-contraste.mjs` + `.py`: cada uno de los **121 cuadros** de `hilo-1920.webm` bajo el velo real, el píxel más claro bajo cada línea, en 6 tamaños de 834 × 1112 a 1920 × 1080 | **0 líneas bajo el mínimo** en 101 líneas; la peor, **5,31:1** («Chequeo gratis», gris, 1194 × 834, cuadro 73), igual que la spec §3.1. Botón del chequeo a 108 px del borde a 1440 × 900 | `crudos/portada-contraste.json`, `capturas/primera/home-1440.jpg` |
| 14 | Videos (los 11 de las 7 páginas que tienen: home, Praxi, Combeau y los cuatro conceptos) | `movimiento.mjs` a 1440 | `muted`, `loop`, `playsinline`, `preload="none"`, sin `controls` ni `autoplay`, `aria-hidden`; fuentes VP9 → H.264; corren a la vista; pausa de 44 × 44 que se alcanza con el teclado: Enter la para («Seguir el video», `aria-pressed="true"`), Enter la sigue; fuera de la vista se pausan solos | `crudos/movimiento.json` |
| 15 | Movimiento reducido | lo mismo, emulando `reduce` | Los 11 videos quietos en t = 0 con «Seguir el video»; 0 bloques a medio entrar; 0 transiciones; sin círculo | |
| 16 | Cursor | lo mismo: puntero fino a 1440, táctil a 390 | Círculo de 88 px, **blanco**, texto en lienzo, borde de 1 px en lienzo, `aria-hidden`, `pointer-events: none`, «Ver el caso» / «Ver el concepto»; sobre el menú se va (0 × 0); a 390 táctil, `display: none` | |
| 17 | Pesos de video (spec §3.1 y §3.5) | bytes en `public/v3/` | Portada 1.404.928 B H.264 (techo 1,4 MB, el de Bruno; brief: menos de 5,1 MB) y 1.025.719 VP9; 960 px: 499.009 y 382.436 (techos 0,6 y 0,4 MB); cinta 986.256 y 976.539 (1 MB); casos, el más pesado 2.122.353 H.264 (Sesenta, techo 2,2 MB) y 1.435.153 VP9 (Tonela, 1,5 MB). **Todos bajo su techo**; ninguno con pista de audio | `ffprobe` |
| 18 | Techos de campo (spec §3.4) | `herramientas/campos.mjs` + `campos.py`: página completa a 1440 y la regla de `campo-medios.py` copiada sin cambios | Home 10,3 % (≤ 20); `/trabajo/` 26,6 % (≤ 35); casos de 6,1 % (Praxi, el piso que la spec admite) a 30,2 % (≤ 35); Desarrollo web 3,5 % (≤ 5); las demás interiores 0 %. **Todos dentro de la regla**, igual que lo que midió Diego. Pero la regla no ve un degradé: **defecto 3** | `crudos/campos.json` |
| 19 | Texto de Clara, tal cual | `herramientas/texto.mjs`: cada elemento de `texto-obra.json` buscado en la página | **435 de 470 tal cual.** Los 35 restantes: 20 migas (el «·» va en un `span` sin espacios en el DOM; a la vista son iguales), 6 que viven en otra página y están ahí, 5 de un estado o condición (errores del chequeo y del formulario en sus scripts protegidos, el pie de la ley que Clara condicionó a una imagen que no va), 3 desvíos declarados (el alt de la franja de Visibilidad, tanda 4 §3; dos flechas que pasan a SVG) y una nota al constructor | `crudos/texto.json`, `.log` |
| 20 | Señales contra Simón | `herramientas/senales.py`, JSON-LD parseado del `dist/` | `title` y `description` de las 19 rutas de `senales-obra.md` §2, **iguales**; `#org` (description, knowsAbout, logo de El huso) y `jobTitle` como §1.1; `ItemList` de 10 en el orden del muro, Verifica y Cumple a su producto y spindlelab.cl sin `url`; Praxi sin `offers`, `url` ni `sameAs`; Combeau con `#fotografia`, `#modelo`, `datePublished` y su `publisher`; los cuatro conceptos con `genre`, `disambiguatingDescription`, `about` y `dateCreated` de Simón, sin `Organization` ni sus parientes; `#chequeo`; `ContactPage`. En las 27: el JSON-LD parsea, 0 `@id` repetidos, los tres del `Layout` una vez, 0 tipos vetados, `BreadcrumbList` igual a la miga, `canonical` a su URL `/v3/`, `noindex, nofollow`, `og:image` JPEG 1200 × 630 de 24 a 67 kB con `?v=1`, `theme-color` `#060606`, favicon de El huso `?v=5` (los archivos de Bruno, md5 igual). **Falla uno: la home sin `dateModified` (defecto 1)** | `crudos/senales.json`, `crudos/contenido.json` |
| 21 | Precios y nombres | cada «$…» a la vista y en las señales, comparado como texto con los JSON | **Todos están** en `oferta-v3.json` o `servicios-v3.json` (los artículos van verbatim y quedan fuera, tanda 5 §5) | `crudos/contenido.json` |
| 22 | Lo vetado | HTML y texto de las 27 | 0 «54 → 94», «36 → 73», `praxi.coach`, «en pausa», «fuera de línea», «IA propietaria», «modelos RAG», «despliegue de modelos», `LAB_*`, «+150 %». Un «40 %» en «21 chequeos»: es el peso del bloque de entidad (30 + 40 + 30), con fila; no es cifra inventada | |
| 23 | Números con fila | cada número visible de la home, `/trabajo/`, Praxi y Combeau, buscado en los dos inventarios y los JSON | 0 sin aparición | |
| 24 | Combeau | HTML, sus 12 `alt`, sus medios mirados, sus dos recorridos del book y el tramo «Combeau, modelo» de la cinta cuadro a cuadro | **0 medidas, contacto o ficha**; los medios son los de `casos/combeau/medios/` | `capturas/hojas/` |
| 25 | Praxi | el texto, el JSON-LD y sus 19 medios | Los dos modelos nombrados con su papel («Claude Haiku 4.5 … convierte esa frase en un registro», «Claude Sonnet 5, el modelo que conversa contigo como coach»); créditos «Ramón Vallejos, con agentes de IA»; pie de personas generadas en cada medio con personas; ningún medio es una foto de la landing suelta; 0 enlaces a `praxi.coach` | |
| 26 | «CONCEPTO» sin scroll | `herramientas/concepto-sin-scroll.mjs`: la ficha «Concepto · 2026», 4 conceptos × 8 tamaños; y los medios mirados | A la vista en 360, 390, 834, 1194, 1440 y 1920; **bajo el pliegue a 768 × 1024 y 1024 × 768** en los cuatro, donde depende del rótulo horneado del medio, que falla en Tonela a 768 y en Doceavo a 1024 (**defecto 2**) | `crudos/concepto-sin-scroll.json` |
| 27 | Chequeo y formulario | ids y scripts en el `dist/` | Los cinco `chq-*` en la home y en `/diagnostico/`, con `v3-chequeo.js?v=3`; el formulario de contacto **igual al de producción** (`action`, los 13 campos con sus `name` e `id`, los valores ocultos, `.contact-form`, `#f-utm-*`, `.form-status`, `.form-success`, `generate_lead`) con `v3-contacto.js?v=2` | |
| 28 | **Criterio 12** | `herramientas/chequeo-local.mjs`: `chequear()` de `functions/api/chequeo.js` sin cambios, con un `fetch` que responde desde el `dist/`, para el build de hoy y el del 16-oct (`947e6e1`) | **Home v3: 79 hoy contra 83 el 16-oct** (cambia un ítem: «fecha», 4 puntos). La raíz de producción: 85 y 85 | `crudos/chequeo-local.json` |
| 29 | El hilo de oro | referencias en las 27 y las imágenes al compartir, mirándolas | Solo en la portada de la home | `capturas/hojas/` |
| 30 | El aviso de cookies abierto | `herramientas/aviso.mjs`, primera visita | A 390 × 844 y 360 × 800 tapa el campo y el botón del chequeo de la home (**defecto 4**); a 768, 1024 y 1440 no | `crudos/aviso.json`, `capturas/aviso-home-390.png` |
| 31 | Cotas de la spec | `herramientas/medidas-spec.mjs` | `h1` de la portada a 48 en dos líneas (1054 px) y a 26 a 390; la cinta 1054 × 593 con radio 6 y a 390 a sangre sin radio; el caso con su barra pegajosa a 80 y el medio principal 1072 × 603 en x = 352; a 390 el medio 4:5 a sangre; la franja de Desarrollo web 1408 × 589 (2,39) con radio 6 | `crudos/medidas-spec.json` |
| 32 | Copy (detector §A) | patrones sobre el texto visible de las 20 páginas que no son artículos | 0 verbos de folleto, relleno, «no solo… sino», «¿Listo para…?», raya, voseo o castellano de España; la home sin una sola pregunta; «ustedes» solo como plural de tú (una pregunta de Paid Media) | `crudos/copy-detector.log` |

**No medido en esta vuelta** (lo midió Diego en sus `comprobar-tanda-*.mjs` y no encontré motivo para dudarlo, pero no
es evidencia mía): el muro al pasar el mouse (acortarse 24 px y el velo), el filtro del índice, la barra flotante del caso
abriendo y cerrando, las fuentes de 960 px bajo 834 y el CLS del muro. **Criterio 13** (lectores fríos): la lectura fría
se hizo sobre el texto de Clara (`texto/lectura-fria/obra-salida.txt`, 19-oct), no sobre el sitio construido; el sitio
lleva ese texto tal cual (fila 19).

### Defectos

Dueño: quien lo cierra. Cierre: qué tiene que pasar y con qué se comprueba en la vuelta 2.

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cierre |
|---|---|---|---|---|---|---|
| 1 | **Mayor** | Diego | `/v3/`, JSON-LD, `WebPage` `#webpage` | La home dejó de declarar `datePublished` y `dateModified` (el 16-oct: 2026-07-08 y 2026-10-06), y el chequeo de 21 señales corrido sobre el build local pierde «fecha»: **79 contra 83**. El ejemplo de Simón (§2.1) no trae fechas, pero su §1.2 dice que `dateModified` lo escribe el build | Brief §7, criterio 12; `senales-obra.md` §1.2 | El `WebPage` de la home con `datePublished` 2026-07-08 (el de producción) y un `dateModified` que escribe el build; `chequeo-local.mjs` da ≥ 83 y producción sigue igual byte a byte |
| 2 | **Mayor** | Lucía | Los cuatro conceptos, de 768 a 1193 px | La ficha «Concepto · 2026» queda bajo el pliegue a 768 × 1024 (a 1194 px) y a 1024 × 768 (a 766, la ventana termina en 768). Ahí el rótulo lo pone solo el medio, y falla en dos: **Tonela a 768** lo tiene al pie de su 4:5, bajo la barra flotante y fuera de la ventana (`capturas/primera/trabajo_tonela-768.jpg`, `capturas/hojas/conceptos-768.jpg`); **el recorrido de Doceavo** no lleva el rótulo fijo que llevan Tonela, Ocelo y Sesenta, solo una nota al margen de unos 6 px que sale del cuadro a los 6 s (`capturas/primera/trabajo_doceavo-1024.jpg`, `capturas/hojas/doceavo-recorrido-1-cuadro-por-segundo.jpg`). La spec lo fija solo a 1440 y 390 (§2.3) | Spec §6.12; brief «Compuerta 1», punto 5 (el rótulo se ve sin scroll y sale en la captura de la primera pantalla) | La spec dice dónde va «Concepto» de 768 a 1193 (por ejemplo, la ficha antes del medio principal, o «Concepto» en la barra flotante junto al nombre) y Diego lo construye; `concepto-sin-scroll.mjs` da un rótulo del DOM a la vista en los 4 × 8 tamaños. Si se prefiere arreglarlo en el medio, Bruno: el rótulo fijo en el recorrido de Doceavo y arriba en el 4:5 de Tonela |
| 3 | **Mayor** | Lucía | `/v3/servicios/auditoria-seo-tecnica/`, la franja | Es un campo de color en la primera pantalla a 1440 y a 390: en `verifica-y-cumple-239.webp` el azul y el amarillo ácido cubren el **67,5 %** del marco (el azul solo, 42 %). `campo-medios.py` lo da por no-campo porque el degradé reparte el azul en varias cubetas (la mayor es el blanco de las letras, 24,9 %; el azul, 16,9 + 8,5 %…). Además el centro a 2,39 corta por la mitad las dos píldoras de arriba (declarado, tanda 4 §8.3) (`capturas/primera/servicios_auditoria-seo-tecnica-1440.jpg`, `capturas/hojas/franja-auditoria-verifica-y-cumple-239.jpg`) | Spec §2.4 y §3.4 («la franja nunca es un campo»; Koto: interiores con 0 % de color); lo que Ramón rechazó de driftime, los campos de color por servicio (spec §7, 15-oct; brief «Compuerta 1», punto 6 b) | Otra franja que no sea campo, o ninguna (como Acompañamiento mensual); y la regla de `campo-medios.py` agrupa tonos vecinos para que un degradé cuente como lo que se ve. Se re-mide con `campos.mjs` + `campos.py` de esta vuelta |
| 4 | **Mayor** | Lucía | `/v3/` a 390 × 844 y 360 × 800, primera visita | El aviso de cookies empieza en 710 y en 647; el campo y el botón del chequeo van de 704 a 748 y de 708 a 752: **tapados** hasta que la persona elige (`capturas/aviso-home-390.png`, `aviso-home-360.png`). Es la primera pantalla que va a ver Ramón si abre `/v3/` en el teléfono. Diego lo declaró y lo dejó para la spec (tanda 2, §12.1); la spec no lo ha resuelto | Spec §4.3 («nada importante queda tapado por él en la primera pantalla: se mide con el aviso abierto»); brief «Compuerta 1», punto 1 (el chequeo en la primera pantalla) | Lucía decide (el aviso arriba en A, la portada del teléfono más baja, o aceptarlo y escribirlo en §4.3 con su porqué) y Diego lo construye; `aviso.mjs` sin controles tapados, o la excepción escrita en la spec |
| 5 | Menor | Diego | `/v3/` y `/v3/diagnostico/` | Texto corrido sobre el tope de 493 px: a 768 los tres párrafos de «Cada pieza, con un dato medido» miden **736 px** (unos 100 caracteres por línea; `capturas/d5-home-768-cuerpo-736.jpg`); la línea «También: Paid Media…» de 736 a 992 px entre 768 y 1193 (desde 1194 va en c5–c12, como dice §2.1); la nota de los conceptos de la home, de 661 a 693 px en todos los anchos; la ayuda del chequeo de `/diagnostico/`, de 659 a 940 px desde 768 (la de la home sí lleva el tope: tanda 2, §4) | Spec §1.3 («tope de 493 px en todos los anchos») y §0.4.4 | Tope de 493 px en esos párrafos; `auditar.mjs` sin «párrafos de main > 494», salvo la línea de servicios desde 1194 |
| 6 | Menor | Diego | `/v3/trabajo/` y los siete artículos | `loading="lazy"` en imágenes de la primera pantalla: la primera portada del muro de 360 a 768 y de dos a cuatro desde 834; el retrato del autor (44 px) en los siete artículos, en todos los anchos | Spec §3.3 («`loading="lazy"` salvo las de la primera pantalla»); antislop C7 | Esas imágenes sin `lazy`; `auditar.mjs` sin «lazy en la primera pantalla» |
| 7 | Menor | Diego | El pie a 390 (todas las páginas con pie) y `/v3/trabajo/combeau/` a 390 | Dos áreas de toque que se pisan: el logo del pie (97 × 44 en y = 730) y el correo (125 × 44 en y = 761) se cruzan **97 × 13**: el 27 % del área del logo abre el correo (`capturas/d7-pie-390-logo-correo.png`). En Combeau, el 9 % del área de 44 de «Ver la original (805 kB)» cae bajo la imagen de arriba | Spec §4.3 (44 × 44, «también el logo y los correos sueltos»); WCAG 2.5.8 | Áreas que no se pisan; `solapes.mjs` con el 100 % del área propia en los dos |
| 8 | Menor | Clara | `<title>` de tres servicios | Mayúsculas al estilo inglés en «Auditoría SEO **T**écnica para empresas», «Acompañamiento **M**ensual de SEO e IA» y «Gestión de **R**edes **S**ociales para empresas» (son los de producción; `senales-obra.md` §2.7 los deja «queda») | Antislop A6 | Clara, con Simón, los pasa a mayúscula inicial, o escribe en `senales-obra.md` por qué quedan; `senales.py` con el texto nuevo |

**Ninguno es bloqueante:** nada impide que Ramón vea `/v3/` hoy. Los mayores no cumplen un criterio o una regla de la
obra; los menores se arreglan en la misma vuelta.

### Cumplimiento del brief (§7, construcción)

| Criterio | Resultado |
|---|---|
| 8 · Motion fijo; con movimiento reducido ni resortes ni cursor | **Cumple** (filas 6, 15, 16) |
| 9 · Cursor solo con puntero fino; foco visible; nada solo con hover | **Cumple** (filas 12, 16); bajo 834 todo texto de las piezas está a la vista |
| 10 · `verificar` sin hallazgos a 390, 768 y 1440 | **Cumple**, en los ocho anchos (fila 2) |
| 11 · `generate_lead`, formulario, `chq-*`, `v3-chequeo.js`, `functions/api/chequeo.js` en diff 0; las 20 URL; `/v3/` con `noindex` | **Cumple** (filas 3, 4, 27, 20) |
| 12 · El chequeo sobre el build local saca lo mismo o más que el 16-oct | **No cumple: 79 contra 83** (defecto 1) |
| 13 · Lectores fríos | **No verificado sobre el build:** la lectura fría es del texto (ver «No medido») |
| 14 · La portada | **Cumple** (filas 13, 14, 15, 17): VP9 y H.264 de 1,40 MB, póster, pausa con el teclado que dice su estado, velo `#060606` (`rgba(6, 6, 6, .88)` y `#060606` en el borde), peor línea 5,31:1 en el cuadro más claro, quieta con movimiento reducido, chequeo en la primera pantalla a 1440 |
| 15 · Los casos | **Cumple** (filas 22, 24, 25, 20) |
| 1 a 7 (compuerta 2) | Cumplidos en `acta-paso-2.md`; no se re-auditan |

### Cumplimiento de la spec

**Desvíos deliberados que no estén en `desvios.md`: no encontré ninguno.** Lo que construyó distinto de la spec está
declarado, con su porqué, en las cinco tandas. Los defectos 5, 6 y 7 son omisiones (la regla está en la spec y no se
aplicó en esos puntos, y el propio Diego la aplicó en otros), no decisiones: van como menores por lo que pesan.

**Declarado y abierto, que espera a Lucía, Clara o Ramón** (no cuenta como defecto; queda para que no se pierda):
`jobTitle` y cargo de la firma, por confirmar con Ramón (tanda 1 §1, tanda 5 §2); el favicon SVG (tanda 1 §8.1); el pie de
A sin enlace a `/privacidad/` y los casos sin el botón de cookies (tanda 1 §8.2-8.3); Lenis inerte en vez de «no se crea»
(tanda 1 §2); la portada de spindlelab.cl en el muro y la captura de Praxi en las pruebas (tanda 2 §1-2); el error del
chequeo vacío, que vive en `v3-chequeo.js` (tanda 2 §12.3); en Praxi y Combeau a 390 la ficha bajo la barra flotante
(tanda 3 §9.1); Tonela dos veces la misma captura a 390, la foto servida en 4:5 y el video de Praxi blando a 390 (tanda
3 §9); el alt y el recorte de la franja de Visibilidad (tanda 4 §3); los botones del chequeo con dos textos (tanda 4 §5,
tanda 5 §8.1); «con agentes de IA» en Paid Media sin fila en el inventario (tanda 4 §8.5, para Ramón); `/nosotros/` sin
preguntas (tanda 5 §8.4); `driftime.css` y `components/v3/` en el repo hasta publicar (tanda 5 §8.5).

### Detector anti-slop

`estudio-web/antislop-web.md` §E, completo:

```
COPY            ■ sin verbos de folleto  ■ sin relleno de apertura
                ■ sin tricolon automático  ■ sin "no solo X sino Y"
                ■ sin pregunta retórica ni "¿Listo para…?"
                □ sin Title Case  ■ registro es-CL consistente (tú/usted)
                ■ sin raya como remate  ■ cero prueba social sin respaldo
                □ borrar 30% no mejora la página
ESTRUCTURA      ■ sin tres tarjetas idénticas injustificadas
                ■ sin "¿por qué elegirnos?" genérico  ■ FAQ con preguntas reales
                ■ sin fila de métricas inventadas  ■ formulario mínimo
                □ hero no es 100vh centrado vacío  ■ orden de secciones justificado
CÓDIGO          ■ landmarks + un h1 + jerarquía sin saltos
                ■ cero valores por defecto sin justificar (color, radio, sombra, fuente)
                ■ sin degradé-mancha ni glass injustificados  ■ cero emoji de icono
                ■ alt reales  ■ foco visible, contraste AA, labels
                □ imágenes dimensionadas, hero eager, font-display
                □ JSON-LD + canonical + OG + title propio
                ■ índice y sitemap al día  ■ ?v=N subido si se sobrescribió un asset
VISUAL          ■ detector de refero-design corrido entero
PRUEBAS         ■ logo tapado  ■ rubro cambiado  ■ leído en voz alta
```

Los abiertos, con su por qué:
- **Title Case:** tres `<title>` de servicios (defecto 8). En `h1`, botones y menú no hay (los botones van en la mono en
  mayúsculas, que es su rol).
- **Borrar 30 %:** no lo puedo afirmar sin lectores. Las interiores y los casos son largos, pero cada párrafo que revisé
  dice algo con fila; la lectura fría del texto (Clara) no pidió recortar. Queda abierto para el criterio 13.
- **Hero de 100vh:** la portada mide `100svh − 64` y la sección siguiente no asoma a 1440 × 900. No es centrada ni vacía
  (frase abajo a la izquierda, chequeo a la derecha, asimétrica), y la spec lo fija así en el lugar del showreel de Koto
  (§2.1, brief «Compuerta 2», punto 4). Justificado por la referencia; lo dejo dicho.
- **Hero eager:** el póster de la portada va `eager`, `fetchpriority="high"` y precargado; las imágenes llevan `width` y
  `height` y las letras `swap`. Abierto por las `lazy` de la primera pantalla de `/trabajo/` y los artículos (defecto 6).
- **JSON-LD:** completo y como Simón, salvo las fechas de la home (defecto 1).
- **Índice y sitemap:** nada se publica; `/v3/` con `noindex` y fuera del `sitemap.xml`, como debe. `?v=5` en el favicon
  nuevo, `?v=1` en las imágenes al compartir nuevas, `?v=3` y `?v=2` en los scripts que no cambiaron.

Detalle de los cerrados que no son obvios: los 16 colores de `archivo.css` son los de spec §1.1 más el subrayado
al 45 % de §4.1 y el transparente de los degradados, ninguno más; los radios, 0, 2, 4, 6 y el círculo; una sola sombra, la de relleno del autocompletado de Chrome
(declarada); los dos degradados son el velo y la costura de la portada (spec §3.1) y la cruz de registro. Las preguntas
de las páginas son FAQ que ya estaban publicadas, los títulos de los tres bloques del chequeo y el cierre «¿Quién
aparece en tu lugar?», que viene de producción («queda»). «Para empresas, clínicas y estudios profesionales» es una
serie de tres con tres públicos reales del brief §2.

`refero-design/references/anti-ai-slop.md`, completo:

```
■ Accent color is NOT indigo/violet          (no hay acento: blanco y grises; el color lo pone el trabajo)
■ Cards are justified by interaction         (0 tarjetas; la placa solo en controles, §1.5)
■ No decorative left/side accent stripes     (0 border-left en archivo.css)
■ No standard emoji used as icons            (0 en las 27; flecha, pausa y seguir en SVG)
■ Color mode is light unless brief asks dark (el brief pide negro: «Compuerta 1», punto 6)
■ Serif display / warm editorial justified   (no hay serif)
■ Earth-tone palette research-backed         (no hay)
■ No decorative one-word highlight           (las dos tintas son la frase de Koto medida, lock §14, una por sección)
■ Strong reference traits preserved          (lienzo #060606, interfaz chica y gris, el trabajo carga la pantalla)
■ Source token/component roles preserved     (placa, velo, línea, borde de campo, cada uno en su rol; ver defecto 3)
■ Image/media roles preserved                (capturas y grabaciones reales; el hueco de Praxi dirigido)
■ ALL CAPS text has letter-spacing           (DM Mono .03em)
■ Would pass the screenshot test             (capturas/hojas/primera-1440-27-rutas.jpg)
■ Font choices intentional                   (Google Sans Flex y DM Mono, de la compuerta 2)
■ Colors derived from research               (Koto medido)
■ Layout has visual interest and tension     (frase pesada contra chequeo angosto; muro de dos columnas)
■ No generic patterns you can't justify      (el hero a pantalla: arriba)
■ You can explain WHY each choice was made   (spec y desvios.md)
```

El rasgo de IA que la obra trae a conciencia es el video del hilo de oro (tell #9 de los dos detectores, «ambiente
generado»): es el desvío autorizado por Ramón (brief «Compuerta 2», punto 4; spec §0.3.1) y está solo en la portada.

### Pruebas de fuego

- **Logo tapado** (`capturas/primera/home-1440.jpg`): pasa por la frase y por el chequeo, que es el instrumento de la
  casa y no lo tiene nadie del rubro; el video solo no lo haría (es un haz de luz que podría ser de cualquiera).
- **Rubro cambiado:** el esqueleto (portada, cinta de trabajo, índice, casos con método) es el de un estudio, y ahí
  calza con cualquier estudio; lo que no calza en otro rubro es el chequeo sobre tu dominio y los precios publicados. Pasa.
- **Leído en voz alta:** «Diseñamos y programamos sitios a medida. Y los dejamos listos para que Google y ChatGPT puedan
  leerlos.» Suena a alguien explicando qué hace. Pasa.

### Lo que está bien (y no hay que tocar al corregir)

1. **Producción y el `Layout`:** las 22 páginas publicadas, iguales byte a byte contra dos bases distintas; el `Layout`
   con las cinco props y nada más; los archivos protegidos en diff 0. Las guardias de Diego (el build se cae si un
   precio, un texto de Clara o un largo de señal no cuadra; `guardia-tailwind.ts`) son las que lo sostienen.
2. **La portada:** contraste medido contra los 121 cuadros, pausa con teclado, quieta con movimiento reducido, el
   chequeo en la primera pantalla a 1440, pesos bajo techo. Y el movimiento entero: tres resortes con ζ ≥ 1, el cursor
   solo donde debe, la rueda nativa a 18–20 ms.
3. **El contenido:** el texto de Clara tal cual, las señales iguales a Simón, cero cifras sin fila, Praxi y Combeau
   dentro de cada regla de la compuerta 2.

### Qué dejé fuera del repo

De los 298 archivos sin commit del 19-oct entraron las herramientas, los crudos (JSON y logs, 940 kB) y las capturas
que esta acta cita, todas bajo 300 kB: 9 de primera pantalla (`capturas/primera/`), 2 de página entera reducidas
(`capturas/completa/home-1440.jpg` a 720 px de ancho, `home-390.jpg` a 330), y 6 hojas de contacto y cuadros
(`capturas/hojas/`), más 4 capturas nuevas de hoy (`aviso-home-360.png`, `aviso-home-390.png`,
`d5-home-768-cuerpo-736.jpg`, `d7-pie-390-logo-correo.png`). **Quedaron fuera** 207 capturas de primera pantalla (las 27
rutas × 8 anchos, menos las 9 citadas) y 52 de página entera (27 × 2, menos las 2), unos 30 MB: las moví al scratchpad
de la sesión y se rehacen en unos diez minutos con `node herramientas/auditar.mjs`. También fuera: las 27 capturas de
página entera de `campos.mjs` (se rehacen con el mismo comando) y los cuadros sueltos de los videos.

### Para la vuelta 2

Diego, Lucía y Clara cierran lo suyo (Lucía primero 2, 3 y 4, porque Diego construye lo que ella escriba). Yo re-mido con
las mismas herramientas, desde `spindlelab-astro/` construido: `chequeo-local.mjs` (1), `concepto-sin-scroll.mjs` (2),
`campos.mjs` + `campos.py` (3), `aviso.mjs` (4), `auditar.mjs` (5, 6), `solapes.mjs` (7), `senales.py` (8), más
`verificar` a 390 y 1440, `comparar-dist.mjs` y `movimiento.mjs` para que lo arreglado no rompa lo que estaba bien.
Es la vuelta 2 de 2: si un defecto sigue vivo ahí, va a Ramón con su diagnóstico.

---

## Vuelta 2 (Javiera)

**23-oct-2026, de 10:33 a 11:14 (Chile; reloj del contenedor en UTC, 13:33 a 14:14).** Contexto limpio otra vez: leí el
brief («Compuerta 2», «Compuerta 1» y §7), la spec con sus filas del 23-oct (§0.3 puntos 9 y 10, §0.4 puntos 13 a 15,
§2.1, §2.3, §2.4, §3.4, §4.3, §4.4 y tres filas de §7), `desvios.md` (la sección «QA de obra, vuelta 1» de Diego),
`senales-obra.md` (§1.2 y la fila del 23-oct), el diff del texto de Clara y el del código; no vi las conversaciones donde
se arregló. **Obra auditada: `f2fe7b4`** (el último commit de Diego, 23-oct 13:34 UTC); después de él solo hay commits
míos en `qa-obra/vuelta-2/`. Herramientas, crudos y capturas: `e12/qa-obra/vuelta-2/`. Son las de la vuelta 1 con el
mismo método, ampliadas donde la spec del 23-oct pide medir más (`concepto-sin-scroll.mjs` con «Concepto» y con el aviso
abierto y cerrado; `aviso.mjs` en los ocho tamaños y 375 × 667; `campos.py` importando el `es_campo` de la regla 2;
`senales.py` con las fechas y los tres `title`), más ocho nuevas: `orden-portada.mjs`, `barra-aviso.mjs`,
`barra-tipo.mjs`, `tambien.mjs`, `pie-cookies.mjs`, `foco-cookies.mjs`, `copy-detector.mjs` y `hoja.py`. Chromium 1194
con el Playwright de `spindlelab-astro/node_modules`, sobre el `dist/` servido en local por `comun.mjs` (puerto libre,
apagado al terminar). Una copia de mis herramientas que encontré en el scratchpad (`qa/`, de 13:13 a 13:27 UTC) es de
Diego, para su verificación: no la usé.

### Veredicto: **CON REPAROS**

**Los ocho defectos de la vuelta 1 están cerrados**, medidos con las mismas herramientas: el chequeo sobre el build local
saca 83, igual que el 16-oct; «Concepto» está a la vista sin scroll en los 64 casos (4 conceptos × 8 tamaños × aviso
abierto y cerrado); Auditoría no tiene franja y ninguna página pasa su techo de campo con la regla 2; el aviso abierto
no tapa el chequeo en ningún tamaño de la obra; cero párrafos sobre el tope fuera de la excepción, cero `lazy` en la
primera pantalla, el logo y el correo del pie y la original de Combeau con el 100 % de su área, y los tres `title` en
mayúscula inicial. Producción sigue igual byte a byte, `Layout.astro` sin cambios desde la vuelta 1, y lo que estaba bien
sigue bien.

**Quedan dos menores nuevos**, ninguno bloquea mostrar `/v3/` a Ramón: el arreglo del defecto 7 corrió el área de
«Cookies» del pie sobre la línea de la hora (defecto 9, Diego), y la línea «También: Paid Media…» desde 1194 corre más
ancha que el tope porque la spec se contradice (defecto 10, Lucía; en la vuelta 1 yo la dejé pasar sin contarle las
líneas). **Reparo, con plazo:** los dos se cierran antes de publicar la v3, en la tanda de publicación, y se comprueban
en exprés con `pie-cookies.mjs`, `foco.mjs` a 390 y `tambien.mjs`, sin otra vuelta completa.

### Los ocho defectos de la vuelta 1

| # | Qué era | Cómo lo medí hoy | Resultado | Estado |
|---|---|---|---|---|
| 1 | La home sin `datePublished` ni `dateModified`; el chequeo local, 79 contra 83 | `chequeo-local.mjs` (el `chequear()` de `functions/api/chequeo.js` sin cambios, sobre el build de hoy y el del 16-oct, `947e6e1`); `senales.py` | **Home v3: 83 hoy y 83 el 16-oct**, 0 ítems distintos; raíz de producción 85 y 85. `WebPage #webpage`: `datePublished` 2026-07-08 y `dateModified` 2026-10-23, el día del build en la hora de Chile (`crudos/chequeo-local.log`, `crudos/senales.log`) | **Cerrado** |
| 2 | «Concepto · 2026» bajo el pliegue de 768 a 1193; Tonela a 768 y Doceavo sin el rótulo | `concepto-sin-scroll.mjs`: cada nodo del DOM que dice «Concepto» o «Concepto · 2026», entero en la ventana y sin nada encima en su centro y sus extremos | **64 de 64.** De 360 a 1193, «TONELA · CONCEPTO» (y los otros tres) en la barra; desde 1194, la ficha a 261–275. Con el aviso abierto la barra queda **8 px sobre él** en los cinco tamaños bajo 1194; en una línea (`summary` de 44 px). Estilo: DM Mono 11, mayúsculas, `#989898` sobre la placa `#141414`, **6,39:1**; el «·» con `aria-hidden`; el lector lee «Tonela Concepto Problema Ver las secciones»; Praxi y Combeau sin tipo (`crudos/concepto-sin-scroll.log`, `crudos/barra-tipo.log`, `capturas/hoja-concepto-aviso-abierto.jpg`, `capturas/d2-barra-sobre-aviso-tonela768-doceavo1024.jpg`) | **Cerrado** |
| 3 | La franja de Auditoría, un campo de color que la regla de la cubeta no veía | `campos.mjs` + `campos.py`, con el `es_campo` de `spec/herramientas/campo-medios.py` **importado** (regla 2), página entera a 1440 | Auditoría: **0 medios, 0 %**; ni una referencia a `verifica-y-cumple` en su HTML (precargas, JSON-LD u OG). Con la regla 2: home 13,1 % (con la cinta contada entera, 18,3; techo 20), seguidos 3 (techo 3); `/trabajo/` 30,1 (≤ 35); casos de 6,1 (Praxi, el piso declarado) a 30,2 % (Doceavo), seguidos 4 como máximo; Desarrollo web 3,5 (≤ 5), su franja de Combeau no es campo (familia 0,27); Visibilidad en IA 0; las demás interiores 0. Lo mismo que escribe la spec §3.4 (`crudos/campos.log`) | **Cerrado** |
| 4 | El aviso de cookies tapaba el chequeo de la home a 390 × 844 y 360 × 800 | `aviso.mjs` en los ocho tamaños y 375 × 667, primera visita; `orden-portada.mjs` | Campo y botón **sobre el aviso en los ocho**: 590–634 con el aviso desde 647 (360 × 800), 607–651 / 710 (390 × 844), 767–811 / 909 (768), 963–1007 / 1043 (834 × 1112, aviso en una fila de 69 px desde 834), y desde 1024 igual que antes; en el centro de cada control, el control. Diagnóstico, 0 tapados. Contacto: el botón bajo el aviso solo a 1024 × 768 y 1194 × 834, y la home a 375 × 667, las tres que §4.3 y §4.4 dejan escritas. Bajo 834 la portada se lee rótulo, `h1`, chequeo, entradilla, con 16, 24 y 24 px; el DOM no cambia, la entradilla no tiene nada enfocable y `.portada-v__decl` (el que pasa a `display: contents`) es un `div` sin papel (`crudos/aviso.log`, `crudos/orden-portada.log`, `capturas/citadas/home-390x844.jpg`, `capturas/d4-home-834-aviso-una-fila.jpg`) | **Cerrado** |
| 5 | Texto sobre el tope de 493 en la home y en diagnóstico | `auditar.mjs`, 27 rutas × 8 anchos | Párrafos de `main` sobre 494: **solo «También: Paid Media…» desde 1194** (577, 700 y 940 px), la excepción que mi cierre dejaba. Los otros tres, dentro del tope. Pero ver el defecto 10 | **Cerrado** (lo de Diego) |
| 6 | `loading="lazy"` en imágenes de la primera pantalla | `auditar.mjs` | **Ninguna** en los 216 pares | **Cerrado** |
| 7 | El logo y el correo del pie se pisaban 97 × 13; la original de Combeau, 9 % bajo la imagen | `solapes.mjs` a 360, 390 y 768 | Logo y correo: **97 × 0**, el 100 % del área propia en los dos sentidos; la original: 100 % en los tres anchos. Pero el arreglo movió el cruce: ver el defecto 9 | **Cerrado** (lo pedido) |
| 8 | Title Case en tres `title` | `senales.py`; `copy-detector.mjs` | «Auditoría SEO técnica para empresas · SpindleLab», «Acompañamiento mensual de SEO e IA · SpindleLab», «Gestión de redes sociales para empresas · SpindleLab», iguales en `<title>` y `og:title`; las 19 rutas de `senales-obra.md` §2, iguales | **Cerrado** |

### Lo medido

| # | Qué | Cómo | Resultado | Evidencia |
|---|---|---|---|---|
| 1 | Build | `npm run build` sobre `f2fe7b4` | 33 páginas, exit 0, 6,3 s | `crudos/build.log` |
| 2 | `npm run verificar -- --prefijo /v3/` | a 390 y 1440, y también a 360, 768, 834, 1024, 1194, 1920 y 1440 con `--sin-pildoras` | **27 páginas, sin hallazgos en los ocho anchos**; los 8 nodos «sobre imagen o degradado» desde 834 son la portada (fila 13) | `crudos/verificar-*.log` |
| 3 | Producción igual byte a byte | `comparar-dist.mjs` contra el `dist/` de `03d1bb3`; `construccion/comparar-produccion.mjs` (Diego) contra `construccion/base-dist/` | 114 archivos fuera de `v3/`: **0 distintos**; los 3 de `_astro/` que cargan las publicadas, iguales; en `_astro/` solo cambian los paquetes que carga la v3 (los de los casos, por `caso.mjs` y `archivo.css`). Diego: «Iguales byte a byte» | `crudos/comparar-dist.json`, `crudos/comparar-produccion.log` |
| 4 | Protegidos | `git diff 03d1bb3 HEAD` | **Vacío** en `global.css`, `tailwind.config.mjs`, `functions/`, `public/assets/js/`, `spindlelab-site/`, `public/privacidad/`, los tres JSON de oferta, `sitemap.xml`, `_headers`, `robots.txt`, `llms.txt`, `pages/index.astro` y `nosotros.astro` | `crudos/protegidos.log` (vacío) |
| 5 | `Layout.astro` | `git diff 6739bab HEAD` y `03d1bb3 HEAD` | **0 líneas desde la vuelta 1**; contra la base, las cinco props aprobadas el 19-oct con su valor por defecto de antes, y nada más | `crudos/layout.diff` |
| 6 | Motion | `package.json`, lock, `node_modules` | `"motion": "13.5.0"` exacto, integridad igual a §5.1; sin cambios desde la vuelta 1 | |
| 7 | Lenis sin actuar | `movimiento.mjs`, una muesca de 100 px | **90 % en 18 a 21 ms** en cuatro páginas (techo 100) | `crudos/movimiento.log` |
| 8 | `a[href^="#"]` y `<!-- -->` servidos | `contenido.mjs`, las 27 | **0 y 0** | `crudos/contenido.json` |
| 9 | Desborde, `h1`, landmarks, letras | `auditar.mjs`, 216 pares | Desborde **0 con y sin** `overflow-x: clip`; un `h1` y un `main` en los 216; `es-CL`; 0 saltos de encabezado; **solo Google Sans Flex y DM Mono 500** cargadas (sus dos `woff2`); 0 nodos en negrita; 0 textos bajo 11 px; 0 mayúsculas fuera de la mono; encabezado de 90 bajo 834 y 64 desde 834; 0 errores de consola, 0 pedidos fallidos, 0 404 | `crudos/auditar.log` |
| 10 | Áreas de toque bajo 834 | `area-toque-390.js` del paso 2 en contexto táctil (en `auditar.mjs`); `solapes.mjs`; `pie-cookies.mjs` | 0 controles bajo 44 × 44; logo, correo y original al 100 %; **«Cookies» del pie, 91 % a 360, 94 % a 390 y 97 % a 414** (defecto 9) | `crudos/solapes.log`, `crudos/pie-cookies.log` |
| 11 | Foco | `foco.mjs`, Tab adelante y atrás, 27 rutas a 1440 y 390; y con el aviso abierto, 7 rutas a 390, 768 y 1024 | Primera parada «Saltar al contenido» con su ruta en las 54; contorno en todas. Lo marcado: «Cookies» con la hora encima en las 27 a 390 (59 paradas, defecto 9); el solape del pie de la vuelta 1, 0 (eran 42); el resto, lo mismo que la vuelta 1 (paradas al borde exacto de la ventana o la cruz de registro rozando una fila). Con el aviso abierto: ver la nota 1 | `crudos/foco.log`, `crudos/foco-aviso.log`, `capturas/d9-cookies-foco-hoja.jpg` |
| 12 | La barra sobre el aviso | `barra-aviso.mjs`: Praxi, Combeau, Tonela, Sesenta y dos artículos, a 360, 390, 768, 834 y 1024 | Con el aviso abierto, **8 px sobre él** en los 30; `--a-alto-aviso` igual al alto del aviso (153, 134, 115, 69); la lista abierta entera en la ventana y bajo el encabezado; al rechazar, a 16 px del borde y sin la variable; sin transición | `crudos/barra-aviso.log`, `capturas/citadas/tonela-360-lista-aviso.jpg` |
| 13 | Contraste de la portada sobre el video | `portada-contraste.mjs` + `.py`, los 121 cuadros de `hilo-1920.webm` en 6 tamaños | **0 líneas bajo el mínimo** en 101; la peor, **5,31:1** («Chequeo gratis», 1194 × 834, cuadro 73), lo mismo que la vuelta 1 y la spec §3.1 | `crudos/portada-contraste.log` |
| 14 | Videos, movimiento reducido, cursor | `movimiento.mjs` | Igual que la vuelta 1: los 11 videos con sus atributos, VP9 → H.264, pausa de 44 que Enter para y sigue y dice su estado, fuera de la vista se pausan; con `reduce`, quietos en t = 0 y sin bloques a medio entrar; círculo blanco de 88 px solo con puntero fino, `display: none` en táctil | `crudos/movimiento.log` |
| 15 | Pesos de video | `ffprobe` sobre `public/v3/` (sin cambios desde la vuelta 1) | Los mismos 26 archivos y bytes; todos bajo su techo de §3.1 y §3.5; ninguno con audio | `crudos/videos.tsv` |
| 16 | Texto de Clara tal cual | `texto.mjs` | **433 de 470** (435 en la vuelta 1): los dos que faltan de más son el alt y el pie de la franja de Auditoría, que §2.4 deja sin uso. `texto-obra.json` cambió solo en los tres `title` y sus notas | `crudos/texto.log` |
| 17 | Señales contra Simón | `senales.py` | Las 19 rutas de §2, iguales; `#org`, `jobTitle`, `ItemList` de 10, Praxi sin `offers`, `url` ni `sameAs`, Combeau, los cuatro conceptos, `#chequeo`, `ContactPage`: todos ✓, y las fechas de la home. En las 27: JSON-LD que parsea, 0 `@id` repetidos, los tres del `Layout` una vez, 0 tipos vetados, miga igual al `BreadcrumbList`, canonical a su URL `/v3/`, `noindex, nofollow`, `theme-color` `#060606`, favicon `?v=5`, `og:image` JPEG 1200 × 630 de 24 a 67 kB | `crudos/senales.log`, `crudos/contenido.json` |
| 18 | Precios, vetados, Praxi y Combeau | `contenido.mjs`; `grep` | Cada «$…» está en los JSON (los artículos, verbatim); 0 «54 → 94», «36 → 73», `praxi.coach`, «en pausa», «fuera de línea»; el «40 %» de «21 chequeos» es el peso del bloque, con fila (como en la vuelta 1); Combeau, 0 medidas en su HTML y sus `alt`; `public/` sin cambios desde la vuelta 1, así que los medios son los mismos que miré entonces | `crudos/contenido.json` |
| 19 | Chequeo y formulario | `grep` en el `dist/` | Los `chq-*` en la home y en diagnóstico con `v3-chequeo.js?v=3`; el formulario de `/v3/contacto/` con `class="contact-form"`, la misma `action` y los **12 campos con nombre iguales a los de producción**, `#f-utm-*`, `.form-status`, `.form-success`, `generate_lead`, `v3-contacto.js?v=2` | |
| 20 | El hilo de oro | `grep` de `hilo-` en las 27 | Solo en `/v3/` | |
| 21 | Copy (antislop §A) | `copy-detector.mjs`, texto a la vista de las 27 desde el navegador | 0 verbos de folleto, relleno, «no solo… sino», «¿Listo…?», raya, voseo, prueba social; la home sin preguntas. Mayúsculas dentro de un título: solo nombres propios (Providencia, Concepción, WordPress, GPTBot) y los nombres de plan de `oferta-v3.json`, que van tal cual. «Ustedes» como plural de tú en tres preguntas; «móvil» en dos artículos verbatim | `crudos/copy-detector.log` |
| 22 | Cotas de la spec | `medidas-spec.mjs` | Igual que la vuelta 1, salvo la portada a 390: 727 px de alto (719 antes), los 8 px de los dos espacios de 24 de §2.1 | `crudos/medidas-spec.log` |
| 23 | Render mirado | capturas de primera pantalla de las 27 rutas en los ocho anchos (`auditar.mjs`) y de página entera a 390 y 1440 | Nada roto: la home bajo 834 con el chequeo antes de la entradilla, Auditoría sin franja, el muro con sus portadas, «NOMBRE · CONCEPTO» en la barra | `capturas/hoja-primera-1440-27.jpg`, `capturas/hoja-primera-360-27.jpg`, `capturas/hoja-primera-cambios.jpg` |
| 24 | El CSS nuevo | `git diff 714eb60 HEAD -- archivo.css` | Sin colores, radios, sombras, transiciones ni letras nuevas: solo márgenes, rellenos, `order`, `display: contents`, topes con `var(--a-caja)` y la variable del aviso | este diff |

**No medido en esta vuelta:** lo mismo que en la vuelta 1 (el muro al pasar el mouse, el filtro del índice, las fuentes de
960 px y el CLS del muro; no cambiaron) y **el criterio 13**, los lectores fríos sobre el sitio construido.

### Defectos nuevos

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cierre |
|---|---|---|---|---|---|---|
| 9 | Menor | Diego | El pie bajo 834, en las 27 rutas: el botón «Cookies» (`#cookie-preferencias`) | El arreglo del defecto 7 hizo crecer su área 12 px arriba y **18 abajo** (antes 18 y 12), y ahora baja sobre la línea de la hora («Santiago 10:51 UTC-3», `p.cab__hora`, de 806 a 820, que va encima): **el 9 % del área no responde a 360, el 6 % a 390 y el 3 % a 414** (antes 1, 1 y 0 %), y **el contorno de foco cruza el texto de la hora** a 360 y 390 (`capturas/d9-cookies-foco-hoja.jpg`, antes y hoy). `foco.mjs` lo marca en las 27 rutas a 390 | Spec §4.3 (área de 44 × 44 propia; foco nunca tapado) | «Cookies» crece hacia arriba como antes (no tiene nada encima: el logo termina en x = 113 y él empieza en 151), o la hora baja lo que haga falta. `pie-cookies.mjs` con el 100 % propio a 360, 390 y 414, y `foco.mjs` a 390 sin «tapado p.cab__hora» |
| 10 | Menor | Lucía | `/v3/`, la línea «También: Paid Media…», desde 1194 | La spec se contradice: §2.1, fila 5, la pone «en una línea de cuerpo con sus precios, en c5–c12», y §1.3 pone el tope de 493 «en todos los anchos». Son 239 caracteres: desde 1194 corren **567, 676 y 911 px en 4, 3 y 2 líneas** (unos 120 caracteres por línea a 1920, lo que el tope existe para evitar). En la vuelta 1 dejé esta línea como excepción sin contarle las líneas: el error de lectura fue mío, y Diego cumplió lo que yo escribí (`crudos/tambien.log`) | Spec §1.3 contra §2.1, fila 5 | Lucía escribe cuál manda (el tope también desde 1194, dentro de c5–c12; o la excepción en §0.3 con su porqué) y Diego construye lo que cambie. `tambien.mjs` con el ancho que la spec diga |

### Cumplimiento del brief (§7, construcción)

| Criterio | Resultado |
|---|---|
| 8 · Motion fijo; con movimiento reducido ni resortes ni cursor | **Cumple** (filas 6, 14) |
| 9 · Cursor solo con puntero fino; foco visible; nada solo con hover | **Cumple** (filas 11, 14), con el reparo del defecto 9 en el foco de «Cookies» |
| 10 · `verificar` sin hallazgos a 390, 768 y 1440 | **Cumple**, en los ocho anchos (fila 2) |
| 11 · `generate_lead`, formulario, `chq-*`, `v3-chequeo.js`, `functions/api/chequeo.js` en diff 0; las 20 URL; `noindex` | **Cumple** (filas 3, 4, 17, 19) |
| 12 · El chequeo sobre el build local saca lo mismo o más que el 16-oct | **Cumple: 83 y 83** (defecto 1) |
| 13 · Lectores fríos | **No verificado sobre el build** (igual que en la vuelta 1: la lectura fría es del texto de Clara, que el sitio lleva tal cual) |
| 14 · La portada | **Cumple** (filas 13, 14, 15; defecto 4 para el chequeo con el aviso abierto) |
| 15 · Los casos | **Cumple** (filas 17, 18) |
| 1 a 7 (compuerta 2) | Cumplidos en `acta-paso-2.md`; no se re-auditan |

Reglas que no se negocian (spec §6, brief §6): todas cumplidas, medidas en las filas 3 a 8, 15 a 20 y en los defectos 2 y 3.

### Cumplimiento de la spec

**Desvíos no declarados: ninguno.** Todo lo que cambió en `src/` desde `714eb60` está en la sección «QA de obra, vuelta 1»
de `desvios.md`, con su porqué, incluidas las tres cosas que la spec no cubría: que `dateModified` sale del reloj del
build (y el HTML de `/v3/` cambia de un día a otro aunque la página no cambie; no toca producción), que va sin espera
toda imagen que cae en la primera pantalla en algún tamaño, y el paso del relleno de abajo con el aviso que pasó de 899
a 833. Lo de Lucía (§0.3 puntos 9 y 10, §0.4 puntos 13 a 15) está construido como dice la spec.

### Detector anti-slop

`estudio-web/antislop-web.md` §E:

```
COPY            ■ sin verbos de folleto  ■ sin relleno de apertura
                ■ sin tricolon automático  ■ sin "no solo X sino Y"
                ■ sin pregunta retórica ni "¿Listo para…?"
                ■ sin Title Case  ■ registro es-CL consistente (tú/usted)
                ■ sin raya como remate  ■ cero prueba social sin respaldo
                □ borrar 30% no mejora la página
ESTRUCTURA      ■ sin tres tarjetas idénticas injustificadas
                ■ sin "¿por qué elegirnos?" genérico  ■ FAQ con preguntas reales
                ■ sin fila de métricas inventadas  ■ formulario mínimo
                □ hero no es 100vh centrado vacío  ■ orden de secciones justificado
CÓDIGO          ■ landmarks + un h1 + jerarquía sin saltos
                ■ cero valores por defecto sin justificar (color, radio, sombra, fuente)
                ■ sin degradé-mancha ni glass injustificados  ■ cero emoji de icono
                ■ alt reales  □ foco visible, contraste AA, labels
                ■ imágenes dimensionadas, hero eager, font-display
                ■ JSON-LD + canonical + OG + title propio
                ■ índice y sitemap al día  ■ ?v=N subido si se sobrescribió un asset
VISUAL          ■ detector de refero-design corrido entero
PRUEBAS         ■ logo tapado  ■ rubro cambiado  ■ leído en voz alta
```

Lo que cambió desde la vuelta 1: **Title Case** se cierra (defecto 8; lo que queda con mayúscula son nombres propios y
los nombres de plan de `oferta-v3.json`, que no se tocan); **hero eager** se cierra (defecto 6); **JSON-LD** se cierra
(defecto 1). **Foco visible** queda abierto por el defecto 9 (el contorno de «Cookies» cruza la hora bajo 834; el
contraste AA y los `label`, cumplidos: filas 2 y 19). Siguen abiertos, con el mismo porqué de la vuelta 1: **borrar
30 %**, que no puedo afirmar sin lectores (criterio 13), y **el hero a pantalla**, que no es centrado ni vacío y lo fija la
spec en el lugar del showreel de Koto. Sin cambios en los demás cerrados: ningún color, radio, sombra ni letra nueva
(fila 24); la página no se publica, `/v3/` sigue con `noindex` y fuera del `sitemap.xml`.

`refero-design/references/anti-ai-slop.md`: los 18 ítems, igual que en la vuelta 1 (sin acento índigo, 0 tarjetas, 0
franjas laterales, 0 emoji, negro porque el brief lo pide, sin serif ni tierra, las dos tintas medidas en Koto, rasgos y
roles de Koto conservados, medios reales y el hueco de Praxi dirigido, mayúsculas solo en la mono con `.03em`, letras y
colores de la compuerta 2). Lo que movió esta vuelta lo refuerza: el rol de los medios ahora lo cuenta la regla 2 y la
franja de Auditoría, que hacía de campo de color, salió (antes «ver defecto 3»). El rasgo de IA a conciencia sigue
siendo uno, el hilo de oro de la portada (desvío autorizado), y solo en la home (fila 20).

### Pruebas de fuego

- **Logo tapado** (`capturas/hoja-primera-1440-27.jpg`, `capturas/citadas/home-390x844.jpg`): pasa; a 390 ahora el
  chequeo va pegado a la frase, y es la pieza que no tiene nadie del rubro.
- **Rubro cambiado:** pasa por lo mismo que en la vuelta 1: el chequeo sobre tu dominio y los precios publicados no
  calzan en otro negocio.
- **Leído en voz alta:** «Diseñamos y programamos sitios a medida. Y los dejamos listos para que Google y ChatGPT puedan
  leerlos.» Y debajo, «Escribe la dirección de tu sitio y en segundos ves si ChatGPT y otros asistentes de IA pueden
  leerlo». Suena a alguien explicando qué hace y ofreciendo probarlo. Pasa.

### Lo que está bien (y no hay que tocar al cerrar el 9 y el 10)

1. **Los arreglos de la vuelta 1, medidos uno por uno** (tabla de arriba), y lo que estaba bien: producción igual byte a
   byte, `Layout` sin cambios, protegidos en diff 0, Motion fijo, la rueda nativa, la portada sobre los 121 cuadros, los
   videos, el cursor, las señales y el texto de Clara.
2. **La barra de los casos sobre el aviso**: un solo mecanismo (`--a-alto-aviso`) que sirve a los seis casos y a los
   siete artículos, que vuelve a su lugar al elegir y cuya lista abierta entra entera en la ventana (fila 12).
3. **El orden de la portada bajo 834**: solo visual, el DOM y el Tab intactos, con los espacios que pide la spec al píxel
   (defecto 4).

### Notas (no son defectos)

1. **Con el aviso abierto, los últimos controles de algunas páginas quedan bajo el aviso y la barra hasta que la persona
   elige** (`crudos/foco-aviso.log`): el pie en los artículos y «[ Todo el trabajo ]» en los casos a 768 y 1024, porque la
   página ya no puede subir más. Antes del 23-oct quedaban bajo el aviso solo; es «el resto de la página» que §4.3 acepta
   hasta el primer toque. Si Lucía quiere cerrarlo del todo, el relleno de abajo de las páginas con barra puede crecer con
   `--a-alto-aviso` mientras el aviso está abierto.
2. **`senales-obra.md` §2.7 lo editó Clara** («para que Simón lo revise», su fila del 23-oct): el cambio es solo la
   mayúscula de tres `title` y los largos no cambian, pero falta el visto de Simón.
3. **El HTML de `/v3/` cambia cada día** por el `dateModified` del build (declarado por Diego). Para comparar dos builds
   de la v3 de días distintos hay que descontar esa línea.

### Qué dejé fuera del repo

Entraron las herramientas, los crudos (1,6 MB) y 20 capturas (1,9 MB): siete hojas y recortes que cita el acta y 13
capturas sueltas en `capturas/citadas/`. **Quedaron fuera**, en el scratchpad de la sesión
(`qa-v2-capturas-fuera/`), las 216 de primera pantalla, las 54 de página entera, las 64 de los conceptos, las 9 del aviso
y las 12 de la barra (unos 37 MB), y las 27 páginas enteras de `campos.mjs` (`qa-v2-campos/`); se rehacen con los mismos
comandos.

### Para el cierre

Es la vuelta 2 de 2 y no queda ningún defecto de la vuelta 1 vivo, así que no hay nada que escalar a Ramón. Los dos
menores nuevos (9, Diego; 10, Lucía) se cierran antes de publicar, con la comprobación exprés de arriba. El criterio 13
(lectores fríos sobre el sitio construido) queda para el cierre de Mauro.
