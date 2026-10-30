# Desvíos de Diego: la construcción del 30-oct (sitio propio, amarillo de acción, logo de la i con su disco)

**Diego (diseño y desarrollo web), 30-oct-2026.** Rama `claude/magical-franklin-ckfki2`, sobre `ed2a52c7` (Bruno).
Construí lo que Ramón decidió el 30-oct con el texto de Clara (`1bc62e5a`), la spec de Lucía (`790f63a0`,
`spec-home.md` §12 y `spec-visual.md` §1.1, §4.1, §5.4) y el logo de Bruno (`ed2a52c7`, `e13/logo/`). Ningún texto
se escribió a mano en un `.astro`: todo sale de `t()` / `dos()` sobre las copias de Clara. Nada está publicado.

## 1 · Qué cambié

| Archivo | Qué | De dónde sale |
|---|---|---|
| `src/pages/index.astro` | **Portada:** botón `#portada-cta` con `.boton--accion` (amarillo); el enlace del recuadro lee `home.portada.secundario` (a `/servicios/desarrollo-web/`) y deja de leer `home.portada.chequeo`. **Sección 2** nueva, en el lugar de «Dónde puede caerse una consulta»: el párrafo, `.int-par` con dos `h3.t-titulo` + `ul.int-lista` (filas de `home.problema.redes.*` y `.sitio.*`) y el cierre. **Soluciones:** el arreglo `bloques` en el orden sitio, búsqueda, anuncios, acompañamiento (precios y guardianes sin cambio). **Preguntas:** `['sitio', 1, 2, 3, 4, 5]`; el FAQPage sale de la misma lista. **Quién está detrás:** lee `home.quien.p1` a `p4` y deja de leer `home.quien.cv`. Imagen al compartir `og-e12-marca.jpg?v=3` | `spec-home.md` §12.1 y §12.2 (el marcado, tal cual); `home.soluciones.orden`, `home.faq.jsonld` y `desvios/texto-30oct.md` §2 (Clara) |
| `src/styles/archivo.css` | Tokens `--a-accion` `#ffe800`, `--a-accion-pasar` `#e9d400`, `--a-accion-apretado` `#d4c100` en `body.a-body`; `.boton--accion` y sus dos estados junto a `.boton--claro`; las reglas de `.int-par` junto a `.int-lista`; el comentario de `.cab__der` con la fecha y el cambio. El foco no se toca | `spec-home.md` §12.1 y §12.2, copiadas tal cual; `spec-visual.md` §1.1 y §4.1 |
| `src/components/a/Encabezado.astro` | `.cab__cta` pasa de `boton--claro` a `boton--accion` («Hablemos», de `comun.nav.revision`). Sigue sin dibujarse en `/contacto/` | `spec-home.md` §12.3 |
| `src/data/archivo/interiores.mjs`, `src/pages/nosotros.astro` | `nosotros()` arma `idea` (h2 + dos párrafos) y `oficio` (h2 + tres filas con título y frase); la página los pinta entre la trayectoria y «Lo que puedes esperar». `OG_V`: nosotros y contacto a `?v=3` | `nosotros.idea.*` y `nosotros.oficio.*` de Clara, con el componente que ella sugiere en cada sección |
| `src/components/a/Logo.astro` | El `d` del corte menú de Bruno (`e13/logo/logo-menu-linea.svg`), copiado tal cual: mismo `viewBox`, `fill="currentColor"`, `role="img"`, `aria-label` y `<title>` | `e13/logo/README.md`, «Qué archivo va dónde» |
| `public/v3/marca/*` | Los ocho archivos de Bruno sobre los de El huso, mismos nombres: `favicon.ico`, `favicon-16/32/48.png`, `favicon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` (md5 iguales a los de `e13/logo/`) | `e13/logo/` |
| `src/components/a/layout-a.ts` | Iconos a `?v=6`, sin el `<link>` de `favicon.svg`; el `logo` de `#org` a `icon-512.png?v=6`. El `jobTitle` y la descripción de `#org` ya salían de `comun.entidad.*` y dicen la línea nueva desde el texto de Clara: no tuve que tocarlos | README de Bruno («En el `<head>`»); `_headers` cachea fuerte |
| `public/assets/img/og-e12-{marca,nosotros,contacto}.jpg` | Regeneradas con el titular nuevo y el logo de la i con su disco (`e13/herramientas/og-30oct.mjs`, nueva): 29,9, 30,7 y 28,9 kB, 1200 × 630 | Plantilla de E13; texto de las copias de Clara |
| `e13/herramientas/` | `og-30oct.mjs` (las tres tarjetas), `og-logo-corte.mjs` (qué corte del logo va en las tarjetas), `capturas-30oct.mjs`, `foco-30oct.mjs`, `logo-encabezado-30oct.mjs` | Para repetir lo medido |
| `e13/capturas/construccion-30oct/`, `e13/medicion-30oct/construido/`, `e13/medicion-30oct/og-logo-corte.jpg` | Capturas de página completa (home, contacto y nosotros a 390 y 1440), el foco del botón amarillo, el logo a 2x; lo que dio `portada-30oct.mjs` **sin** `--inyectar` y `contraste-portada.py` sobre el build | Para Javiera |

## 2 · Desvíos (qué dice la spec, qué hice, por qué)

1. **El logo del encabezado no es el `d` de la maqueta.** `spec-visual.md` §5.4 (fila del 30-oct) dice que el `d`
   nuevo es «exactamente» `copy/maquetas-30oct/logo-i-disco.svg` (elipse rx 17, ry 6,5, centro en −91,5) y que el
   favicon, los iconos y el avatar quedan como El huso. **Usé el corte menú de Bruno y todas sus piezas**, como pide el
   encargo de la orquestadora y como dice el README de Bruno («Lucía corrige §5.4 antes de que Diego copie»). Por qué:
   la maqueta, a 24 px, se lee «Spīndle» (lectura fría de Bruno, ronda 1); el disco de Bruno (1,8 : 1) se lee «i».
   Consecuencia: `e13/herramientas/logo-i-disco.mjs` de Lucía ya no corre (comprueba que el `d` sea el de la maqueta y
   se cae con «no trae ni la i dibujada ni la opción 2»). Lo medí en el build con `logo-encabezado-30oct.mjs`, contando
   en el píxel la columna de la i: **a 24 px y 1x, disco en 4 filas (0,27 · 1 · 1 · 0,45) y 1 fila limpia hasta el asta;
   a 20 px y 1x, 3 filas (0,76 · 1 · 0,45) y 1 limpia; a 2x, 3 filas limpias en los dos.** Son los números de Bruno
   (`prueba-disco.json`). El logo sigue midiendo 116,9 × 24 y 97,4 × 20 px. **Pendiente para Lucía:** §5.4 y la
   herramienta.
2. **`favicon.svg` sale del `<head>`.** §5.4 lo pone primero en la lista del favicon. El README de Bruno pide no
   declararlo: Chrome y Firefox prefieren el SVG si está, y el de 16 que Bruno dibujó a mano se perdería. El archivo
   sigue en `/v3/marca/`, al día, y nada lo enlaza.
3. **El logo de las imágenes al compartir va a 50,4 px, no a 39.** §5.4 pide «el `d` de la opción 2 a 39 px de alto (el
   tope del corte menú)». Uso **el corte menú** de Bruno (su caja justa, `logo-menu-blanco.svg`), como pide la spec, pero
   a 50,4 px: así las letras miden lo mismo que en las otras 19 tarjetas del sitio (mayúscula de 38 px). A 39 px el logo
   quedaba un cuarto más chico que en todas las demás. Una tarjeta se ve a la mitad en un feed (unos 600 px de ancho), así
   que el logo queda a unos 25 px en pantalla, dentro del rango del corte menú (18 a 39). **El corte grande no sirve
   aquí:** probado a la mitad, se lee «Spīndle» (`e13/medicion-30oct/og-logo-corte.jpg`, `og-logo-corte.mjs`).
4. **Un guardián que la spec no pide.** `.int-par` cuenta 4 filas (`grid-template-rows: auto repeat(4, auto)` y las
   listas en `2 / 6`, spec §12.2: «si Clara cambia cuántas son, cambian el 4 y el 6»). `index.astro` cuenta las filas de
   las dos listas y **corta el build si la más larga deja de tener 4**, para que el cambio de texto no rompa el subgrid
   en silencio.
5. **Las dos secciones nuevas de `/nosotros/` no están en la spec.** Lucía especificó la home (§12) y no `/nosotros/`.
   Las armé con los componentes que ya existen y que sugiere Clara en el JSON, sin CSS nuevo: «De dónde sale SpindleLab»
   como «Para empresas que ya venden» (`int-sec__cab` + `int-sec__cuerpo` con dos `p.cuerpo.caja`) y «Cómo trabaja» como
   «Lo que puedes esperar» (`ul.int-sec__cuerpo.int-lista`, `h3.int-lista__t.tinta` + `p.cuerpo`). **Lucía lo confirma
   o lo corrige en la spec.**
6. **Ids que ya no leo y que no borré:** `home.portada.chequeo` y `home.quien.cv`. Clara los dejó marcados «sale» para
   que el build no se cayera mientras yo cambiaba el código. Son de su archivo: los borra ella.

## 3 · Lo que verifiqué y con qué

| Qué | Comando | Resultado |
|---|---|---|
| Build | `cd spindlelab-astro && npm run build` | 22 páginas, sin errores ni avisos; pasan los guardianes de precios, nombres, largos y el nuevo de §2.4 |
| Verificar a 390 | `npm run verificar -- --excluir /privacidad/` | 22 páginas, **sin hallazgos**, sale con 0 |
| Verificar a 1440 | `npm run verificar -- --excluir /privacidad/ --ancho 1440` | 22 páginas, **sin hallazgos** (6 nodos sobre imagen o degradado, revisados a ojo en las capturas), sale con 0 |
| Texto | `node e13/herramientas/extraer-texto.mjs --comprobar` | «igual» en las 16 copias, sale con 0 |
| Términos | `node e13/herramientas/barrer-terminos.mjs spindlelab-astro/dist --resumen` | En cero: rayas, «24 horas», partners, insignias, SGE, promesas, «sin compromiso», «¿Listo para…?». «agentes de IA», 3: solo en «Quién está detrás» y en «Cómo trabaja» de `/nosotros/`, donde la guía §3 lo permite. «posicionamiento anterior», 3: la description nueva de la home, la que eligió Ramón (la regla de la herramienta quedó vieja, lo dijo Clara). «mini-diagnóstico», 25: el artículo del blog y su dirección, de antes. «motor», solo «motores de IA» |
| Agencias y clientes | `grep -rE 'McCann\|Graphene\|LATAM\|Incrementa\|Maggiore' spindlelab-astro/dist` | **0.** También 0 para «ocho marcas», «cuatro países», «SpindleLab soy yo» y «pocos proyectos» |
| Precios contra `origin/main` (`840dc024`) | importes visibles y `price`/`minPrice` del JSON-LD, página por página, contra `git show origin/main:spindlelab-astro/public/servicios/…` | Las seis páginas de servicio: **idénticos** (0 solo en `main`, 0 solo en el nuevo; JSON-LD igual). Índice: los mismos más $550.000 y $790.000, que ya están en las páginas de servicio de `main` (como en el acta de E13). Home: {350.000, 390.000, 400.000, 490.000, 590.000}, el mismo conjunto que `Servicios.astro` + `Faq.astro` de `main` |
| FAQPage = lo visible | parseo del JSON-LD de `dist/index.html` contra los `.pregunta` | 6 y 6, **iguales**, en el mismo orden; la primera, «¿Por qué un sitio, si ya tengo Instagram?» |
| Señales | `dist/index.html` | title «SpindleLab · Sitios web a medida y marketing con IA»; description de Clara (157); `jobTitle` «Fundador de SpindleLab: sitios web a medida y marketing con IA»; descripción de `#org` con el sitio primero; `og:image` `og-e12-marca.jpg?v=3` y su alt. `/nosotros/` y `/contacto/`, sus `og:image` a `?v=3` |
| Primera pantalla, sección 2 y alto, **sin `--inyectar`** | `node e13/herramientas/portada-30oct.mjs http://127.0.0.1:8731 <salida>` | **Lo mismo que midió Lucía inyectando:** con el aviso abierto el botón queda a 181,1 px a 360 × 800 y a 227,2 a 390 × 844, 0 de 5 puntos tapados en los 12 tamaños de la obra (320 × 568, fuera de la obra, −7,4, como en la spec); el botón del encabezado 87,5 × 44 sin desborde en los 13; plegado, contorno de 2 px a 3 px, el mismo de §12.3. Sección 2: 904,1 · 828,5 · 627,1 px a 390 · 768 · 1440, desfase de filetes 0 · 0 · 0 desde 834, 0 desborde. Alto de la home: 7.486 · 7.470 · 9.463 · 9.057 (1440 · 1024 · 768 · 390), bajo los techos del criterio 5 (7.800 · 7.800 · 9.700 · 9.300). Copia en `e13/medicion-30oct/construido/` |
| Contraste sobre el video | `python3 e12/spec/herramientas/contraste-portada.py <salida> e12/medios/hilo/hilo-1920.webm …` | **0 líneas bajo 4,5:1** en los 13 tamaños; la peor, 5,35:1 (el rótulo a 1024 × 768), igual que la spec. El amarillo contra lo que lo rodea, 12,8 a 13,27:1 sobre el video; 16,2:1 sobre el lienzo |
| Dónde va el amarillo | `capturas-30oct.mjs` (color calculado de cada `a` y `button`) y `grep boton--accion` en el `dist` | Home: 2 (`.cab__cta` y `#portada-cta`). Las otras 20 rutas de A: 1 (el encabezado). `/contacto/`, `/404.html` y `/privacidad/`: 0. Ningún otro botón cambió |
| Foco del botón amarillo | `foco-30oct.mjs` (Tab desde el principio) | A 1440 y a 390 la parada 11 y 10 es `#portada-cta`, con `:focus-visible` y el contorno blanco de 2 px a 3 px; recortado y mirado (`capturas/construccion-30oct/foco-portada-390-zoom.jpg`): el hueco oscuro de 3 px separa el contorno del amarillo |
| Lo que no debía cambiar | `dist` de esta rama contra el `dist` de `ed2a52c7`, sin el `d` del logo, los `<link>` de icono, la clase del botón del encabezado, el `?v` del logo de `#org` y `dateModified` | **Iguales** las 21 páginas que no son home, `/nosotros/` ni `/contacto/`; en `/contacto/` solo cambia `og:image` (`?v=3`). El CSS de Tailwind, idéntico byte a byte; el de A suma solo los 3 tokens, `.boton--accion` y `.int-par` |
| Capturas | `capturas-30oct.mjs` | Home, `/contacto/` y `/nosotros/` a 390 y 1440, página completa, mirados: 0 desborde, un `h1` por página, 0 errores de consola. En `e13/capturas/construccion-30oct/` |
| Imágenes al compartir | `og-30oct.mjs` + Read de los tres JPEG | Dicen el rótulo y el titular de la home, el h1 de `/nosotros/` y el h1 de `/contacto/` en sus dos tintas; la i se lee i |

Lo que no medí: Safari, Firefox y un iPhone real (ni el favicon en su pantalla de inicio); Tab por toda la página (lo
hace Javiera); el chequeo de la casa (`functions/api/chequeo.js`) contra el build.

## 4 · Lo que queda abierto

> **Al día después de la QA del 30-oct:** todo lo de esta sección se cerró en la vuelta de §5 (las 19 imágenes al
> compartir, la spec y `logo-i-disco.mjs`, `/nosotros/`, el aire de «Quién está detrás», los ids de Clara, `/favicon.ico`,
> `/404.html` y `/privacidad/`), salvo el `manifest`, que sigue sin existir. Se deja como estaba para que se lea qué se
> declaró antes de la QA.

**Para Lucía**
- Corregir `spec-visual.md` §5.4 (el `d`, el favicon y los iconos de Bruno; el corte de las tarjetas, §2.3) y
  `logo-i-disco.mjs`, que hoy se cae con el `d` construido.
- Confirmar las dos secciones nuevas de `/nosotros/` (§2.5).
- **Una observación, sin tocar:** en «Quién está detrás» los párrafos van a 32 px entre sí (`gap` de 16 de
  `.quien__txt` más el 1em de `.cuerpo + .cuerpo`). Con dos párrafos no se notaba; con cuatro, la biografía se lee en
  bloques sueltos (`capturas/construccion-30oct/home-1440.jpg`). Bajar a 16 es una línea de CSS, pero no está en la spec.

**Para Clara**
- Borrar `home.portada.chequeo` y `home.quien.cv`, que ya no se leen.

**Para Ramón o para una pasada aparte**
- **Las otras 19 imágenes al compartir siguen con El huso** (la tortera cruzando la i): método, diagnóstico, blog y sus
  siete artículos, servicios y sus seis páginas, trabajo y Combeau. Este encargo pedía solo las tres que cambian de
  titular. Rehacerlas es correr `og-tanda-*.mjs` de E12 con el logo de `og-30oct.mjs` y subir su `?v=`.
- `/favicon.ico` en la raíz de `public/`, `/404.html` y `/privacidad/` siguen con el favicon del v2 (`/assets/img/`).
  No los toqué: `/privacidad/` está fuera de la obra y `/404.html` es estático. Al publicar en la raíz conviene que
  `/favicon.ico` sea el de Bruno.
- No hay `manifest`: `icon-192.png` está en `/v3/marca/` pero nada lo enlaza. No lo creé porque no estaba en el sitio.
- El avatar y los documentos de Bruno (`e13/logo/avatar/`, `documentos/`) no van al sitio: son para las redes y los
  documentos (troncal).

---

## 5 · Vuelta 1 de la QA del 30-oct: cómo se cerró cada defecto

**Diego (con lo de Clara, Lucía y Bruno que pide el acta), 30-oct-2026, tarde.** Sobre `08cc3e82` (acta de Javiera,
`e13/acta-qa-30oct.md`: Aprobado con reparos, 0 bloqueantes, 3 mayores, 12 menores). Nada está publicado. Los defectos que
piden una decisión de Ramón (3, 5, 6 y 7) **no se tocaron**: van como preguntas en §6, con las versiones de Clara.

| # | Defecto | Qué hice | Cómo lo medí | Resultado |
|---|---|---|---|---|
| 1 | [mayor] Peso de la home a 1440, primera carga, 1.402,1 kB sobre el tope de 1.400 | **Opción (a), autorizada por la orquestadora:** saqué del `<head>` de A las dos hojas que ninguna página de A usa, `/fonts/inter.css` y `/fonts/manrope.css` (3.150 bytes). Solo el ramal `letras` de `Layout.astro`, lejos de gtag, del consentimiento y del Pixel (`git diff 9039b521 -- src/layouts/Layout.astro`: 4 líneas, ninguna de ellos). El techo no se sube | `e13/herramientas/peso-30oct.mjs` (nueva): CDP, suma de `dataLength`, caché apagada, aviso contestado con clic en «Rechazar», 4 s tras `networkidle`. **Calibrada contra la de Javiera:** da **1.399,0** sobre el build de `9039b521` y **1.402,1** sobre el de `a84a1381`, sus dos números al décimo. Antes de sacar las hojas, `letras-sin-uso-30oct.mjs` (nueva): las 22 páginas × 390 y 1440, con el aviso abierto y contestado (que abre `#cookie-aviso`, pintado en Inter por `consent-banner.js`) y recorridas | **1.398,9 kB** primera carga a 1440 (≤ 1.400) · **1.561,7** recorrida (≤ 1.600) · **755,6** a 390 (≤ 950). **0 de 44 pasadas** de A bajan o dibujan Inter o Manrope (el aviso y `#cookie-aviso` ya se vestían con las letras de A en `archivo.css`); solo `/404.html` y `/privacidad/` bajan Inter, y traen su propio `<link>` (son las estáticas de `main`, no pasan por `Layout.astro`). **Margen: 1,1 kB.** Cualquier texto que Ramón sume a la home (§6) se vuelve a medir con `peso-30oct.mjs`; si cruza, lo siguiente que pesa sin aportar es el logo en línea dos veces (4.251 bytes cada uno: un `<symbol>` + dos `<use>`), anotado en `spec-home.md` criterio 10 |
| 2 | [mayor] 19 de las 22 imágenes al compartir con El huso | Las 19 rehechas con `e13/herramientas/og-logo-19.mjs` (nueva): la plantilla de cada tanda (`og-tanda-4` y `-5`, `og-trabajo`, `og-tanda-3`) con un solo cambio, el logo, que pasa al **corte menú de Bruno** (`logo-menu-blanco.svg`, el mismo de `og-30oct.mjs`) a **50,4 px** en las 17 de texto y **36,0 px** en las 2 de imagen (`/trabajo/` y Combeau): la misma mayúscula que tenían con El huso a 56 y 40. `?v=` subido en uno en cada referencia: método 2→3, diagnóstico 3→4, blog 1→2 y sus siete artículos 2→3 (también el `image` del `Article`), servicios 2→3, Desarrollo web 3→4, Auditoría 3→4, los otros cuatro servicios 2→3, trabajo 2→3, Combeau 1→2 (las dos referencias de `casos.mjs`) | Read de la hoja de contacto de las 19 y de `og-e12-trabajo.jpg` y `og-e12-desarrollo-web.jpg` a tamaño real; diferencia por píxel con las de antes **fuera de la franja del logo** (y > 130); `grep -rhoE 'og-e12-[a-z0-9-]+\.jpg\?v=[0-9]+' dist` | Las 19 llevan la i con su disco; el resto de la tarjeta, igual (diferencia media 0,00 en las 7 generadas en este Chromium el 19-oct; 0,6 a 1,7 en las que salieron del Chrome de la Mac el 26-oct: suavizado de letra, el texto es el mismo). 24 a 67 kB cada una (≤ 200). En el `dist`, las 22 tarjetas en su versión nueva y **ninguna referencia a una versión anterior** |
| 4 | [menor] La spec no decía lo construido; `logo-i-disco.mjs` se caía | **Como Lucía.** `spec-visual.md` §5.4 reescrita con lo construido (el `d` del corte menú de Bruno y sus números, el favicon y los iconos a `?v=6` sin `favicon.svg`, `/favicon.ico`, `/404.html` y `/privacidad/`, las 22 tarjetas a 50,4 y 36,0 px y por qué no a 39 ni con el corte grande); §2.1 fila 6 («Quién está detrás» con cuatro párrafos); §2.4, la fila de `/nosotros/` (**confirmo** las dos secciones nuevas con los componentes que eligió Diego: una idea en prosa y tres maneras de trabajar como filas no piden otra forma) y la de `/servicios/`; fila nueva en §7. `spec-home.md`: criterio 21 contra el `d` de Bruno, **criterio 22 nuevo** (el aire de la biografía), criterio 10 con las mediciones, historial y herramientas. **El aire:** decidí **16 px entre párrafos**, no 32: el `gap` de `.quien__txt` ya separa, y el 1em de `.cuerpo + .cuerpo` se sumaba encima (una regla en `archivo.css`: `.quien__txt > .cuerpo + .cuerpo { margin-top: 0 }`, el mismo patrón que ya usan `.int-cab`, `.fila-servicio` y `.planes__pie`). `logo-i-disco.mjs` rehecha: compara el `d` de `Logo.astro` con `e13/logo/logo-menu-linea.svg` y mide la columna de la i | `node e13/herramientas/logo-i-disco.mjs e13/medicion-30oct/logo-construido` (sale con 0); `node e13/herramientas/quien-aire-30oct.mjs <url> e13/medicion-30oct/quien-aire` (sale con 0) y Read de `quien-home-1440.jpg` | Logo: el `d` es el de Bruno tal cual; a 24 px y 1x, disco en 4 filas (0,25 · 1 · 1 · 0,44) y 1 limpia; a 20 px, 3 filas y 1 limpia; a 2x, 3 limpias. Aire: **16 · 16 · 16 px** a 390 y a 1440; la biografía se lee como un bloque. Alto de la home: 7.459 a 1440 y 9.012 a 390 (techos 7.800 y 9.300). `/nosotros/` tiene un solo párrafo de bio: la regla no le cambia nada |
| 8 | [menor] «Google y las IA pueden leerlo y citarlo» | **Como Clara:** «Google y las IA pueden **visitarlo y entenderlo**.» (`home.problema.sitio.3`, con `antes` y `por_que`). Es la palabra que la ronda 2 unificó en todo el sitio, y sale «citarlo», lo más cerca de una promesa que tenía la home. **Si Ramón prefiere otra, se cambia en ese id** | `extraer-texto.mjs`, build, `grep` en `dist/index.html` | «visitarlo y entenderlo» en la home; «leerlo y citarlo», 0. Sigue con 4 filas en «En tu sitio» (el guardián de `.int-par` no cayó) |
| 9 | [menor] `mailto` preescritos | **Como Clara:** el asunto pasa a **«Hablemos de mi sitio»** en `comun.pie.correo` (el pie de las 22) y `home.contacto.correo`. El de `/contacto/` pasa al JSON (`contacto.form.directo`, campo `destino`), con el mismo asunto y un cuerpo que sirve a los dos caminos: «Hola.» / «Mi sitio: » / «Lo que vendemos: ». **Como Diego:** `contacto()` de `interiores.mjs` lo lee de ahí (antes estaba escrito en el código) y el build cae si no va a `hola@spindlelab.cl` con su asunto | `grep -rhoE 'mailto:[^"]*' dist` | 23 con «Hablemos de mi sitio» (22 pies y el cierre de la home) y 1 con asunto y cuerpo (`/contacto/`). Quedan 2 con «Quiero mi revisión gratis»: los pies de `/404.html` y `/privacidad/`, las estáticas de `main` (fuera de la obra; ver §7) |
| 10 | [menor] Quien no tiene sitio puede mandar el formulario sin decir qué vende | **Como Clara:** la ayuda del campo del sitio queda «Si todavía no tienes sitio, escribe «no tengo» y cuéntanos abajo qué vendes.» (la frase de Ramón, entera, más lo que faltaba). Solo texto: ni `name`, ni `action`, ni el formulario | Build y captura de `/contacto/` a 390, mirada | Se lee en dos líneas bajo el campo, enlazada por `aria-describedby` como antes; «abajo» es el campo «Cuéntanos brevemente», que va justo después |
| 11 | [menor] `/servicios/` con el sitio tercero | **Como Diego y Lucía:** el sitio va primero, como en Soluciones de la home: `POR_BLOQUE` de `servicios.mjs` (Desarrollo web, Auditoría, Visibilidad, Paid Media, Redes, Acompañamiento) y el arreglo `BLOQUES` de `servicios/index.astro` (`servicios.m3` primero; los ids de Clara no cambian). La comprobación de los planes de Desarrollo web busca la fila por su `slug` y no por la posición. **Como Clara:** `dw.siguiente` pasa a «Auditoría SEO técnica →»; la nota `servicios.bloques.nota` lo registra | Build (el guardián «servicios, el orden» y los de «Siguiente» pasan); lectura del `dist`; captura de `/servicios/` a 1440, mirada | Rótulos «01 Sitio web a medida» · «02 Búsqueda y visibilidad en IA» · «03 Anuncios en Google y redes» · «04 Acompañamiento mensual»; el `ItemList` en ese orden; «Siguiente»: Desarrollo web → Auditoría → Visibilidad → Paid Media → Redes → Acompañamiento → Desarrollo web. La entradilla («Partimos por el sitio…») y el orden dicen lo mismo |
| 12 | [menor] «posicionamiento anterior» marcaba la description nueva | **Como Clara:** la regla de `barrer-terminos.mjs` deja de buscar «diseñamos y programamos sitios a medida» y pasa a buscar la línea del 23-oct («marketing y crecimiento con IA») y su titular («te llegan consultas»), además de las de E12. `guia-para-roles.md` §3 al día (y su regla de voz, que todavía decía que Nosotros y «Quién está detrás» van en singular). Con la regla nueva apareció un hallazgo real: el pie de `/privacidad/` decía «Marketing y crecimiento con IA para empresas que ya venden.»; pasa a «Sitios web a medida y marketing con IA.» (`comun.pie.marca`), en la rama y en el paso 3 de `armar-corte.mjs` | `node e13/herramientas/barrer-terminos.mjs spindlelab-astro/dist --resumen` | **«posicionamiento anterior»: 0** (antes 3 falsos positivos). Lo demás, como en el acta: «agentes de IA» 3 (home y `/nosotros/`, donde vive), «mini-diagnóstico» 25 (el artículo y su dirección), «motor» solo en «motores de IA», 0 rayas |
| 13 | [menor] `lista-publicacion.md` §3.11 pedía confirmar el «1 de diciembre» como fecha suelta | El paso ahora dice: el día de publicar, releer la ficha del boletín 18.623-07 (con la URL del servicio público del Senado) y compararla con la frase de `/diagnostico/`, citada; si la ficha avanzó, Clara corrige `diagnostico.json`, `extraer-texto`, build y `--comprobar`, y se barre `dist` por «21.719», «diciembre» y «vigencia» | Lectura del paso | Al día |
| 14 | [menor] `/favicon.ico`, `/404.html` y `/privacidad/` con el favicon del v2 | `public/favicon.ico` es ahora el de Bruno (md5 igual a `/v3/marca/favicon.ico` y a `e13/logo/favicon.ico`). **Decidí** que `/404.html` y `/privacidad/` apunten a los cinco iconos de A (`/v3/marca/`, `?v=6`, los de `layout-a.ts`) en lugar de sus tres del v2: un solo favicon en todo el sitio. En la rama y en el paso 3 de `armar-corte.mjs` (que devuelve esas dos páginas desde `main` y ahora les cambia los iconos, cae si no encuentra los `<link>` del v2 y comprueba que `/favicon.ico` sea el de Bruno). `node --check` de la herramienta: bien; **no la corrí** (arma el corte sobre un worktree de `origin/main`, y eso es del día de publicar) | Comprobación de enlaces del `dist` (todo `href`, `src`, `poster` y `content` interno, sin la consulta) | 957 referencias, **0 sin resolver** (los cinco iconos nuevos de las dos estáticas existen). Ojo: `/favicon.ico` no lleva versión, así que un navegador que ya lo tenía puede seguir mostrando el viejo un tiempo |
| 15 | [menor] `home.portada.chequeo` y `home.quien.cv` sin lector | **Como Clara:** borrados de `texto/home.json`, con su línea en el `borrado` de su sección | `extraer-texto.mjs home` y `--comprobar`; build | 16 de 16 «igual»; el build no los echa de menos (ningún `.astro` ni `.mjs` los lee) |

### Lo que verifiqué al final, sobre el build de esta vuelta

| Qué | Comando | Resultado |
|---|---|---|
| Texto con huella | `node e13/herramientas/extraer-texto.mjs --comprobar` | **16 de 16 «igual»**, sale con 0 |
| Build | `cd spindlelab-astro && npm run build` | 22 páginas, sin errores; pasan los guardianes de precios, nombres, largos, el orden de servicios, los «Siguiente» y el de las 4 filas de `.int-par` |
| `verificar` a 390 | `node scripts/verificar.mjs --excluir /privacidad/` | 22 páginas, **«Sin hallazgos»**, sale con 0 |
| `verificar` a 1440 | `… --ancho 1440` | 22 páginas, **«Sin hallazgos»** (6 nodos sobre imagen o degradado: la portada, sin cambios) |
| JSON-LD | `JSON.parse` de todos los bloques del `dist` | 45 bloques, 0 errores; `FAQPage` de la home, 6 preguntas, la de Instagram primera; `jobTitle` igual |
| Protegidos | `git diff --stat 9039b521 -- functions public/_headers public/_redirects public/js public/assets/js` | **vacío**; `Layout.astro`: solo las dos hojas, nada de gtag, consentimiento ni Pixel |
| Precios | sin cambios de datos (`oferta-v3.json` y `servicios-v3.json` no se tocaron); los guardianes de `comprobarPrecio` pasan con el orden nuevo | Iguales |

**Lo que no medí:** Safari, Firefox y un iPhone (tampoco el favicon nuevo en su pantalla de inicio); la primera pantalla y
el contraste de la portada (no cambió nada de ella: el texto nuevo está en la sección 2, en `/contacto/` y en `/servicios/`);
Tab por toda la página; la lectura en frío (pendiente de que Ramón elija, §6); `armar-corte.mjs` corrido de verdad.

---

## 6 · Preguntas para Ramón (defectos 3, 5, 6 y 7 del acta del 30-oct)

**Contestadas el 30-oct en la tarde.** Lo que eligió, construido y medido, está en §8.

Son decisiones suyas, no de oficio: el texto es de él o el hecho lo confirma él. **Nada de esto se cambió en el sitio.**
Las versiones son de Clara y conservan cada hecho. Cuando Ramón conteste por escrito: Clara lo pasa a `texto/*.json`,
`extraer-texto.mjs`, build, **`peso-30oct.mjs` (al peso le queda 1,1 kB)** y una lectura en frío de la home
(`lectura-fria-texto.mjs` + `lectura-fria.py`), como pide el acta.

### 6.1 · Defecto 3 (mayor): tres frases donde tropiezan los lectores

Los tres lectores entienden lo sustancial y ven a Ramón serio. Tropiezan en tres frases.

**(a) «Trabaja con agentes de IA dentro del equipo, y el código de cada entrega lo revisa y lo aprueba él.»** (`home.quien.p3`;
la misma idea en `/nosotros/`, «Cómo trabaja»). **Diagnóstico de Javiera, que lo escala:** es la tercera lectura en que
tropieza (3 de 3, 2 de 3 y ahora 3 de 3; para 2 de los 3 es uno de sus tres mayores frenos: «¿quién me hace el sitio, una
persona o un robot?», «todo pasa por una sola persona con IA haciendo parte del trabajo»). La frase dice la herramienta y no
lo que gana el cliente, y la mitad que habla de él («lo revisa y lo aprueba él») es justo la que tranquiliza. Las dos
versiones dejan los dos hechos (hay agentes de IA en el equipo; él aprueba cada entrega) y cambian el orden: primero quién
responde, después con qué trabaja.

- **A1 (recomendada por Clara):** «Responde él por cada entrega: el código lo revisa y lo aprueba antes de que llegue a tu
  sitio. Para escribirlo trabaja con agentes de IA dentro del equipo.» No suma ningún hecho.
- **A2:** «Con él hablas de principio a fin. Trabaja con agentes de IA dentro del equipo, y el código de cada entrega lo
  revisa y lo aprueba él antes de entregártelo.» **Suma un hecho** («con él hablas de principio a fin»): estaba en el sitio
  publicado (`home.quien.publicado`, «Tú hablas con él durante todo el proyecto») y salió el 26-oct junto con la frase de los
  otros profesionales. Solo va si Ramón lo confirma.
- En `/nosotros/` («Cómo trabaja», fila «Agentes de IA, con su revisión») va la misma versión que elija, en su forma de fila.

**(b) El rótulo «Sitios web a medida y marketing con IA».** 2 de 3: «no sé si usan IA para hacer mi marketing o si es
marketing para que me encuentre la IA». Las dos lecturas son ciertas (los agentes de IA en el equipo; Visibilidad en IA).
El rótulo es de Ramón y no se toca sin él. Además de la portada, la línea vive en el `title`, la tarjeta al compartir de la
home, el `jobTitle` de `#autor-ramon`, la descripción de `#org`, el pie y `llms.txt`.

- **B1 (recomendada por Clara):** dejarlo. Las dos lecturas son verdad, uno de los dos lectores lo resolvió leyendo más
  abajo, y la portada ya nombra a ChatGPT como destino en la entradilla. No cuesta nada.
- **B2, si quiere decir la herramienta:** «Sitios web a medida y marketing hecho con IA». `title` de 57 (cabe en 60).
- **B3, si quiere decir el destino:** «Sitios web a medida y marketing para Google y la IA». Ojo: con ese rótulo el `title`
  mide 64 y el build corta sobre 60, así que el `title` tendría que quedar distinto del rótulo.

**(c) «sin plantillas ni WordPress»** (`home.soluciones.sitio.texto` y `servicios.m3.nota`, también en `llms.txt`). 2 de 3 no
saben si es bueno o malo; en la ronda 2 de E13, sin la frase, 0 de 3 tropezaron. Lo respalda `dw.faq.1.r` («Cada sitio se
diseña y se programa desde cero para tu negocio. Así controlamos la velocidad y el SEO técnico desde la base»).

- **C1 (recomendada por Clara):** sacarlo. «Diseñado y programado para tu negocio, con un panel para que edites tú. Desde una
  página de campaña hasta un sitio de doce páginas.» Es como estaba en la ronda 2, y pesa menos.
- **C2:** el porqué, con el hecho de `dw.faq.1.r`: «Diseñado y programado desde cero para tu negocio, así controlamos la
  velocidad desde la base, con un panel para que edites tú. Desde una página de campaña hasta un sitio de doce páginas.»
- Las dos dependen de 6.2: si el panel no va en todos los planes, «con un panel para que edites tú» también cambia.

### 6.2 · Defecto 5: ¿todos los planes de Desarrollo web traen el panel?

La home (entradilla y Soluciones), la description, `#org`, `llms.txt`, el `h1` de `/servicios/desarrollo-web/` («con panel
para editar») y su tarjeta al compartir («Desde $390.000 + IVA» debajo) dicen el panel junto al precio de entrada. Pero en
`/servicios/desarrollo-web/` el único plan que lista «Blog o CMS que administras tú» es el Sitio Completo ($1.190.000), y el
glosario de esa página dice que el CMS es el panel. Lo que hay escrito en el repo apunta a que **no** todos lo traen: la
skill de cotizaciones lista el panel entre lo que «cambia el precio» (`.claude/skills/cotizaciones/SKILL.md`, método,
paso 1). El sitio de `main`, en cambio, decía que todo sitio trae panel («Un panel para editar textos e imágenes tú mismo»).

- **Si todos lo traen:** Ramón lo confirma y la lista de cada plan lo dice (los `puntos` de `oferta-v3.json`; es dato de la
  oferta, así que lo escribe quien la lleva, con su visto bueno). La home queda como está.
- **Si no:** el panel deja de ir pegado a los $390.000. Cambian `home.portada.entradilla`, `home.soluciones.sitio.texto`,
  `servicios.m3.nota`, la description de la home, `comun.entidad.descripcion`, `llms.txt`, `dw.h1` y su tarjeta al compartir
  (`og-e12-desarrollo-web.jpg`, que se regenera con `og-logo-19.mjs` y sube a `?v=5`). Clara propone la frase cuando Ramón
  diga desde qué plan va el panel.

### 6.3 · Defecto 6: el único «yo» de la home

«Probado primero en lo nuestro» (`home.pruebas.propio.texto`) dice «lo **corrí** sobre **mi** propio sitio… **encontré**…
lo **corregí**», en una página donde Ramón va en tercera persona y la marca en plural. 2 de 3 lectores lo notan.

- **Plural (recomendada por Clara: el sitio es del estudio):** «Antes de publicar Verifica y Cumple, el chequeo de la Ley
  21.719 de datos personales, lo corrimos sobre nuestro propio sitio. Salió mal. Al arreglarlo encontramos además un
  formulario que perdía mensajes sin avisar, y lo corregimos.»
- **Tercera persona:** «Antes de publicar Verifica y Cumple, el chequeo de la Ley 21.719 de datos personales, Ramón lo corrió
  sobre su propio sitio. Salió mal. Al arreglarlo encontró además un formulario que perdía mensajes sin avisar, y lo
  corrigió.»

### 6.4 · Defecto 7: la misma lista dos veces seguidas

La entradilla («El anuncio, el post, la búsqueda en Google y la respuesta de ChatGPT llevan a la misma dirección…») y el
párrafo de la sección 2 («El anuncio en Google, el post en Instagram, la respuesta de ChatGPT… Todos mandan a la persona al
mismo lugar…») dicen la misma lista a unos 150 px a 390. Las dos son de Ramón.

- **7A (recomendada por Clara):** la entradilla se queda como está (es la que le da sentido al titular) y el párrafo de la
  sección 2 da la lista por dicha, porque su `h2` ya dice que todo termina en el sitio: «Si tu sitio no explica bien lo que
  haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traer a esa persona se pierde ahí.»
- **7B:** el párrafo de la sección 2 se queda y la entradilla deja la lista para el final: «Diseñamos y programamos tu sitio
  a medida, con un panel para que lo edites tú, y le conectamos lo demás: el anuncio, el post, la búsqueda en Google y la
  respuesta de ChatGPT.»

### 6.5 · Para que Ramón lo sepa (cambiado de oficio, se puede devolver)

- **Defecto 8:** «Google y las IA pueden leerlo y citarlo» quedó «Google y las IA pueden visitarlo y entenderlo». Si prefiere
  la suya u otra, es un id (`home.problema.sitio.3`).
- **Defecto 10:** a su ayuda del campo del sitio («Si todavía no tienes sitio, escribe «no tengo».») se le sumó «y cuéntanos
  abajo qué vendes».
- **Defecto 9:** el asunto de los correos ya escritos es «Hablemos de mi sitio».

---

## 7 · Lo que queda abierto después de esta vuelta

- **Las cuatro preguntas de §6**: contestadas el 30-oct en la tarde. El texto, el build y el peso están en §8; falta la
  lectura en frío, y todo lo cambiado lo revisa Javiera en una QA exprés.
- **Las decisiones de Ramón que el acta ya listaba** y que esta vuelta no toca: la description de 157 («y les conectamos»), el
  `h1` de `/nosotros/` y el gris del de `/contacto/`, si «el código de cada entrega lo revisa y lo aprueba él» vale para las
  entregas a clientes, y «una aerolínea regional» en `/nosotros/`.
- **`/404.html` y `/privacidad/`** siguen siendo las páginas del v2 (su encabezado, su logo con el punto dorado, su pie con
  «Quiero mi revisión gratis»). Esta vuelta solo les cambió los iconos y, en `/privacidad/`, la línea de marca del pie. Si se
  rehacen en A, es una obra aparte.
- **El margen de peso es de 1,1 kB.** Ver defecto 1.
- **El `manifest`** sigue sin existir (`icon-192.png` está y nada lo enlaza).

---

## 8 · Respuestas de Ramón (30-oct, tarde)

**Diego, 30-oct-2026, tarde.** Ramón contestó por escrito las cuatro preguntas de §6, en la conversación con la
orquestadora. Clara pasó el texto en `0f5bf988` (el detalle id por id, en `desvios/texto-30oct.md` §6). Aquí va lo que
construí y medí sobre ese commit. **Todo construyó a la primera y no cambié nada del sitio:** ni un `.astro`, ni un JSON, ni
un techo. Nada está publicado y el corte no se armó.

### 8.1 · Lo que eligió y cómo quedó en el `dist`

| Decisión | Dónde | En el `dist` de `0f5bf988` (contra el de `1f02ece6`) |
|---|---|---|
| **A1** | `home.quien.p3` y `nosotros.oficio.1.d` | «Responde él por cada entrega: el código lo revisa y lo aprueba antes de que llegue a tu sitio. Para escribirlo trabaja con agentes de IA dentro del equipo.»: 1 vez en `/` (seguida de las dos herramientas abiertas, como estaban) y 1 en `/nosotros/` (la fila «Agentes de IA, con su revisión», con el mismo título) |
| **B1** | el rótulo y sus repeticiones | Sin cambio: «Sitios web a medida y marketing con IA», 2 veces en `index.html` antes y ahora |
| **C1** | `home.soluciones.sitio.texto`, `servicios.m3.nota`, `llms.txt` | «sin plantillas»: de 3 a **0**. «WordPress»: de 5 a **2**, los dos en `/servicios/desarrollo-web/` (la pregunta `dw.faq.1.p` a la vista y la misma en el `FAQPage`, con la respuesta «desde cero») |
| **Plural** | `home.pruebas.propio.texto` | «lo corrimos sobre nuestro propio sitio»: 1; «lo corrí sobre mi propio»: 0 |
| **7A** | `home.problema.p` | «Si tu sitio no explica bien lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traer a esa persona se pierde ahí.»: 1; la lista («El anuncio en Google, el post en Instagram…»): 0 en la sección 2. La entradilla, igual |
| **El panel en todos los planes** | `oferta-v3.json` (`momentos[0].planes[0]` y `[1]`) y `OFERTAS[0]` y `[1]` de `desarrollo-web.astro` | «Panel donde cambias textos y fotos» en la Página de Campaña (tercer punto) y en el Sitio Esencial (segundo); el Sitio Completo sigue con «Blog o CMS que administras tú» y la Plataforma con «Todo lo del Sitio Completo, y más». La `description` de las `Offer` de Campaña y Esencial dice el panel, igual que su tarjeta. La home, como estaba |
| **`Layout.astro`** y **los botones con texto propio** | `/metodo/`, `/diagnostico/`, cada servicio | Sin cambio: las cuatro líneas de las letras quedan, gtag, consentimiento y Pixel intactos (ver protegidos abajo) |

### 8.2 · Lo medido

Todo sobre una copia limpia (`git archive HEAD spindlelab-astro | tar -x` en el scratchpad, `node_modules` enlazado) y, para
comparar, otra de `1f02ece6` construida igual. Los dos `dist` servidos en local sin compresión (`python3 -m http.server`),
la misma base que las actas. La evidencia que pesa poco quedó en `e13/medicion-30oct/tarde/`.

| Qué | Comando | Resultado |
|---|---|---|
| Build | `npx astro build` en la copia | **22 páginas** en 4,18 s, sale con 0, sin errores ni avisos. Pasan los guardianes: precios y nombres contra `oferta-v3.json` y `servicios-v3.json`, largos de `title` y `description`, el orden de servicios, los «Siguiente», las 4 filas de `.int-par` y la lista de planes contra la de Clara. `1f02ece6`: 22 páginas, igual |
| Texto con huella | `node e13/herramientas/extraer-texto.mjs --comprobar` | **16 de 16 «igual»**, sale con 0 |
| `verificar` a 390 | `node scripts/verificar.mjs --excluir /privacidad/` | 22 páginas, **«Sin hallazgos»**, sale con 0 |
| `verificar` a 1440 | `… --ancho 1440` | 22 páginas, **«Sin hallazgos»**, sale con 0 (6 nodos sobre imagen o degradado: la portada, sin cambios) |
| **Peso, primera carga a 1440** | `node e13/herramientas/peso-30oct.mjs <url> --ancho 1440`, tres corridas | **1.398,8 kB** las tres (1.398.764 bytes) ≤ 1.400. El build de `1f02ece6`, medido igual: **1.398,9** las tres (1.398.863), el número de la vuelta 2: la herramienta sigue calibrada. Diferencia: **−99 bytes**, que son justo los del HTML de la home (39.663 → 39.564). **Margen: 1.236 bytes (1,2 kB)**. No hizo falta bajar nada: el logo en línea dos veces (criterio 10) queda como lo siguiente si algo vuelve a sumar |
| Peso, recorrida a 1440 | `… --recorrer` | **1.561,6 kB** ≤ 1.600 (antes 1.561,7) |
| Peso a 390 | `… --ancho 390` | **755,5 kB** ≤ 950 (antes 755,6) |
| **Primera pantalla** | `node e13/herramientas/portada-30oct.mjs <url> <salida>`, sin `--inyectar`, sobre los dos builds | Las 32 líneas de primera pantalla y del encabezado plegado, **idénticas al décimo** entre los dos builds (`diff` vacío). El botón amarillo entra entero y sin nada encima **con el aviso abierto** en los 11 tamaños de la obra; margen sobre el aviso 44,5 (360 × 640) · 181,1 (360 × 800) · 82,8 (375 × 667) · 227,2 (390 × 844) · 264,7 (414 × 896) · 231,5 (768 × 1024) · 51,6 (834 × 1112) · 52,6 (1024 × 768) · 72,1 (1194 × 834) · 54,6 (1440 × 900) · 35,7 (1920 × 1080), **0 de 5 puntos tapados** en todos. 320 × 568 sigue siendo la excepción de `spec-home.md` §12.1 (−7,4; 2 de 5), igual que antes; sin aviso entra con 145,2. Encabezado plegado dentro de la placa en los 8 anchos. Captura mirada: `tarde/portada-390x844-aviso.jpg` |
| **Sección 2** | la misma herramienta (`seccion-2.json`) | Dos columnas desde 834, con las filas **sin desfase** (`[0,0,0]`) a 834, 1024, 1194, 1440 y 1920; apilada a 360, 390 y 768. 0 elementos fuera, desborde 0. Sin la lista, la sección baja de 41,5 a 60,8 px según el ancho (1440: 648,7 → 605,5; 390: 904,1 → 843,4). Captura mirada: `tarde/home-s2-1440.jpg` |
| Alto de la home | la misma herramienta (`alto-home.json`) | **7.438** a 1440 (≤ 7.800) · **7.402** a 1024 (≤ 7.800) · **9.355** a 768 (≤ 9.700) · **8.951** a 390 (≤ 9.300). Antes 7.459 · 7.423 · 9.417 · 9.012. «Quién está detrás» crece 20 a 22 px (A1 es más larga: 958 → 980 a 1440, 1.454 → 1.474 a 390); Soluciones baja 20 y 21 px a 390 y 768 (C1) |
| Aire de «Quién está detrás» | `node e13/herramientas/quien-aire-30oct.mjs <url> <salida>` | **16 · 16 · 16 px** a 390 y a 1440 (criterio 22), sale con 0 |
| **Precios** | script del scratchpad sobre los dos `dist` (salida en `tarde/precios.txt`) | `/servicios/desarrollo-web/`: 7 importes visibles y 9 campos de precio del JSON-LD (3 `minPrice`, 3 `priceCurrency`, 3 `valueAddedTaxIncluded`), **iguales**. `/servicios/`: 13 importes visibles iguales; su grafo no lleva precio, ni antes ni ahora. En todo el `dist` (30 `.html`, `.txt` y `.xml`): 137 importes y campos de precio en 10 archivos, **`diff` vacío** |
| JSON-LD igual a lo visible | lectura de las `Offer` contra las tarjetas del `dist` | Campaña y Esencial dicen el panel, como sus tarjetas; Completo dice «blog/CMS»; Plataforma, «Todo lo del Sitio Completo y más». 45 bloques en el `dist`, **0 errores** de `JSON.parse` |
| El punto del panel a la vista | Playwright: líneas de cada `li` de los planes (`getClientRects`) y desborde, a 390 y 1440 (`tarde/lineas-y-desborde.json`) | «Panel donde cambias textos y fotos» en **1 línea** a 390 y a 1440, en las dos tarjetas. Desborde 0 en las 7 piezas cambiadas (sección 2, Quién está detrás, Soluciones, Lo que puedes revisar, la fila de `/nosotros/`, el bloque 01 de `/servicios/`, los planes). Capturas miradas: `tarde/dw-planes-1440.jpg`, `dw-planes-390.jpg`, `home-quien-1440.jpg`, `nosotros-oficio-390.jpg` |
| Qué cambió en el `dist` | comparación archivo por archivo, con el nombre de los `hoisted.*.js` normalizado | Los mismos archivos en los dos; contenido distinto **solo** en `/`, `/nosotros/`, `/servicios/`, `/servicios/desarrollo-web/` y `llms.txt`. Los `hoisted*.js` pesan 84.120 bytes en los dos |
| Barrido | `node e13/herramientas/barrer-terminos.mjs <dist> --resumen` | Rayas largas o medias: 0. Posicionamiento anterior, «¿Listo para…?», «sin compromiso»: 0. Total 130 hallazgos en 30 archivos, lo mismo que midió Clara |
| Protegidos | `git diff --stat 1f02ece6 HEAD --` `functions`, `public/_headers`, `public/_redirects`, `public/js`, `public/assets/js`, `src/layouts/Layout.astro`, `src/data/servicios-v3.json` | **Vacío.** Del sitio cambiaron 7 archivos desde `1f02ece6`, todos del commit de Clara; en `oferta-v3.json`, solo las dos líneas del panel |

### 8.3 · Lo que no hice, y por qué

- **No toqué el peso.** Con 1.398,8 kB no hace falta; sacar el logo en línea es un cambio de código que hoy no aporta. Queda
  anotado como lo siguiente (criterio 10).
- **Las cuatro `description` de las `Offer` siguen escritas en `desarrollo-web.astro`**, como las dejó Clara. Clara ofreció
  sacarlas de `puntos`; no lo hice: son resúmenes en prosa del grafo que Simón fijó en `senales-obra.md` §2.7, y derivarlas
  cambiaría las cuatro, no solo las dos que tocó la decisión de Ramón.
- **Una observación para Simón, anterior al 30-oct:** la `Offer` del Sitio Completo no dice los idiomas, y su tarjeta sí
  («Uno o dos idiomas»); la del Esencial dice «un idioma» y la de la Plataforma «multi-idioma». No la cambié porque no es
  parte de lo decidido y el grafo es de él. Si la suma, es la tercera cadena de `OFERTAS` («…puesta a punto AEO/GEO, uno o dos
  idiomas.»).

### 8.4 · Lo que queda abierto

- **La QA exprés de Javiera**, en contexto limpio, con la lectura en frío de la home (`lectura-fria-texto.mjs` +
  `lectura-fria.py`). No la corrí: no me apruebo a mí mismo.
- **Lo que dejó abierto Clara** (`desvios/texto-30oct.md` §6.5): «En todos los planes» de `/servicios/desarrollo-web/` no nombra
  el panel (pregunta para Ramón); el título de la fila de `/nosotros/` sigue nombrando primero la herramienta; `home.quien.p3`
  queda con dos veces dos puntos; la fila 8 de `lista-publicacion.md` (la lleva Mauro); y, para la troncal, la skill
  `cotizaciones` todavía lista el panel entre lo que cambia el precio.
- **El margen de peso es de 1,2 kB** (1.236 bytes). Cualquier texto que se sume a la home se vuelve a medir con
  `peso-30oct.mjs`.
- **Lo que no medí:** Safari, Firefox y un iPhone; Tab por toda la página (nada del foco cambió); `armar-corte.mjs` corrido de
  verdad (es del día de publicar).
