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
