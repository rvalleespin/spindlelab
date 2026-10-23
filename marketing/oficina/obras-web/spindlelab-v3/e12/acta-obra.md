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
