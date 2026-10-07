# Relevamiento: el sistema real del sitio v3 (7-oct-2026)

Lo produjo un agente que leyó driftime.css, los componentes, la spec y el manual v2.0. Es el insumo del manual v3.0.

# Relevamiento del sistema visual del sitio v3, para el manual de Instagram (7-oct-2026)

**Abreviaturas de fuente:**
- `CSS` = `spindlelab-astro/src/styles/driftime.css`
- `SPEC` = `marketing/oficina/obras-web/spindlelab-v3/spec-visual.md`
- `LOCK` = `…/spindlelab-v3/referencia-driftime/lock-driftime.md`
- `MAN` = `marketing/brand/manual-de-marca.md` (v2.0)
- `NAV`, `PIE`, `PIEZA`, `MOV` = `spindlelab-astro/src/components/v3/{NavV3,FooterV3,Pieza,MovimientoV3}.astro`
- `HOME` = `spindlelab-astro/src/pages/v3/index.astro`
- `OG` = `marketing/brand/og-v3/`

**Cómo se midió:**
- **Render:** Playwright con Chromium 1194 sobre `http://127.0.0.1:8780`, en 14 rutas `/v3/`, a 1440×900 y 390×844, con movimiento reducido.
- **Contraste:** fórmula WCAG 2.x calculada sobre los hex.
- **Fuentes y archivos:** fontTools para las tipografías y PIL para las imágenes.

No se hizo nada en git y no se tocó `spindlelab-astro`. Los scripts quedaron en el scratchpad: `medir.mjs`, `prop.mjs`, `contraste.py` y `gab.mjs`.

---

## (0) Verificación de las cifras de formato de Instagram (decisión 1)

| Cifra fijada | Estado | Fuente |
|---|---|---|
| Feed y carrusel 1080×1350 (4:5) | **Vigente** | inro.social, socialk.it y moda.app (búsqueda del 7-oct) |
| Grilla del perfil en 3:4 (desde ene-2025, anuncio de Mosseri) | **Vigente** | [Inquirer](https://usa.inquirer.net/165044/bye-squares-why-instagram-switched-to-a-taller-grid), [Kapwing](https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/) |
| Recorte central de un 4:5 en la grilla: ancho 1012 | **Vigente**. Cálculo: 1350 × 3/4 = 1012,5 → **1012×1350** centrado (se pierden ~34 px por lado). Kapwing agrega que el usuario puede mover el recorte con «Adjust Preview». | aritmética + Kapwing |
| Portada de reel leída en su recorte 3:4: 1080×1440 | **Vigente**: se pierden 240 px arriba y 240 abajo de un 1080×1920 | [Hopper HQ](https://www.hopperhq.com/blog/instagram-reel-size/) |
| Stories y reels 1080×1920 | Vigente como lienzo 9:16. **Meta recomienda 1440×2560** en su guía de anuncios. | [Meta Ads Guide · Reels](https://www.facebook.com/business/ads-guide/update/video/instagram-reels) |
| **Zona segura: 250 px arriba y 340 px abajo** | **CAMBIÓ.** La guía actual de Meta, en las dos páginas, dice textual: «leaving roughly **14% of the top, 35% of the bottom, and 6% on each side** … free from text, logos, or other key creative elements». En 1080×1920 eso da **269 px arriba, 672 px abajo y 65 px por lado**, y deja libre un área centrada de **950×979**. Las cifras 250/340 aparecen solo en guías de terceros (growthscribe, warroominc, firstpier). | [Meta · Instagram Stories](https://www.facebook.com/business/ads-guide/update/image/instagram-story) · [Meta · Instagram Reels](https://www.facebook.com/business/ads-guide/update/video/instagram-reels) |
| Reels: botones de acción a la derecha | Hopper HQ (terceros, sin URL de Meta) indica ~230 px a la derecha por ~770 px desde abajo | Hopper HQ |

Las páginas de Meta citadas son de **anuncios**. Para piezas orgánicas, Meta no tiene una página que fije otra cifra; las guías de terceros que se encontraron aplican los mismos porcentajes a las stories orgánicas.

---

## (a) Tokens de color

| Token | Hex | Rol en el sitio | Dónde NO | Fuente |
|---|---|---|---|---|
| `--d-noche` | `#000000` | lienzo | — | CSS:18 · SPEC:26 |
| `--d-modulo` | `#161616` | píldoras, notas, botón secundario, fondo de `.d-pieza` | nunca fondo de sección | CSS:19 · SPEC:27 |
| `--d-filete` | `rgba(247,245,240,.12)` | separadores de fila, 1 px | nunca borde de tarjeta | CSS:20 · SPEC:28 |
| `--d-papel` | `#F7F5F0` | texto principal, botón primario | nunca blanco puro salvo en brasa | CSS:21 · SPEC:29 |
| `--d-gris` | `#9AA4B0` | texto secundario | nunca texto de acción | CSS:22 · SPEC:30 |
| `--d-gris-2` | `#6B7580` | solo líneas y bordes, nunca texto (viñetas y tablas del artículo) | texto (4,12:1 a 13 px sobre el pie) | CSS:23 · CSS:315 · `pages/v3/blog/[slug].astro`:435,450 |
| `--d-oro` | `#C9A227` | **solo** el punto del wordmark del módulo | todo lo demás | CSS:24 · SPEC:31 |
| fondo del pie | `#0e0e0e` | pie | — | CSS:307 |
| placa del módulo de navegación | `rgba(0,0,0,.75)` + desenfoque de 8 px + borde `rgba(255,255,255,.10)` | módulo fijo | — | NAV:71 (medido) |
| `humo` (Tailwind) | `#96948E` | solo el párrafo del menú abierto | — | NAV:161 · `tailwind.config.mjs`:79 |

**Campos de color: cada pareja de fondo y texto, y su pilar.** Mapeo según `src/data/oferta-v3.json`, CSS:27-30 y CSS:190-193.

| Campo | Fondo | Texto | Contraste | Palabra del campo | Momento | Servicios |
|---|---|---|---|---|---|---|
| brasa | `#DA3400` | `#FFFFFF` | **4,70:1** | Desarrollo | «Tu sitio te frena, o no existe» | Desarrollo web |
| navy | `#0E2A47` | `#E4F1EC` | **12,56:1** | Visibilidad | «Tu sitio existe y no lo vas a rehacer» | Visibilidad en IA · Auditoría SEO técnica |
| petróleo | `#0F766E` | `#FFF4E2` | **5,03:1** | Continuidad | «Ya giras y quieres sostenerlo» | Acompañamiento mensual |
| ciruela | `#341F34` | `#FFEFDD` | **13,40:1** | Alcance | «Ya tienes demanda y quieres más» | Gestión de redes sociales · Paid Media (Google) |

**Contraste del resto de las parejas**

| Pareja | Contraste |
|---|---|
| papel / negro | 19,27:1 |
| gris / negro | **8,31:1** |
| gris-2 / negro | 4,48:1 |
| humo / negro | 6,92:1 |
| papel / módulo | 16,61:1 |
| gris / módulo | 7,16:1 |
| gris / pie | 7,64:1 |
| gris-2 / pie | 4,12:1 |
| negro / papel | 19,27:1 |
| papel sobre brasa | 4,31:1 (reprueba: por eso brasa lleva blanco puro, CSS:26) |
| papel sobre navy | 13,38:1 |
| papel sobre petróleo | 5,02:1 |
| papel sobre ciruela | 13,85:1 |
| gris sobre brasa | 1,86:1 |
| gris sobre navy | 5,77:1 |
| gris sobre petróleo | 2,17:1 |
| gris sobre ciruela | 5,97:1 |
| texto del campo al 72 % de opacidad: brasa / petróleo / navy / ciruela | 3,05 / 3,39 / 7,20 / 7,62 (por esto el precio va sin opacidad, CSS:222 · SPEC:147) |

**El oro sobre cada fondo**

| Fondo | Contraste del oro `#C9A227` |
|---|---|
| negro | 8,68:1 |
| módulo `#161616` | 7,48:1 |
| navy | 6,02:1 |
| ciruela | 6,24:1 |
| **petróleo** | **2,26:1** |
| **papel** | **2,22:1** |
| **brasa** | **1,94:1** |

**Superficies traslúcidas** (color efectivo y contraste con el texto)

- **Filete de papel al 12 %:**
  - sobre negro: `#1E1D1D`, 1,25:1
  - sobre brasa / navy / petróleo / ciruela: 1,14 / 1,41 / 1,24 / 1,42
- **Filete de las bandas del índice de servicios** (color del texto al 32 %, SPEC:74-77, `servicios/index.astro`:304): brasa 1,57 · navy 2,57 · petróleo 1,77 · ciruela 2,66.
- **Caja de píldoras** `rgba(0,0,0,.22)` (CSS:59), contraste del texto: brasa 6,95 · navy 14,08 · petróleo 7,19 · ciruela 14,84.
- **Píldora activa** (blanco al 14 % sobre la caja, CSS:61), contraste del texto: brasa 5,38 · navy 9,19 · petróleo 5,10 · ciruela 9,66.
- **Separador del precio** (opacidad 0,35, CSS:224): brasa 1,65 · navy 2,81 · petróleo 1,86 · ciruela 2,91.
- **Etiqueta de pieza** (negro al 66 % + desenfoque de 6 px, CSS:73): en el peor caso, sobre imagen blanca, queda `#575757` con papel encima a **6,66:1**.

**Proporción de campo por página** (medido a 1440×900: área de campo dividida por el área total de la página)

- `/v3/`: **48,1 %**, con los 4 campos.
- `/v3/servicios/`: **45,0 %**, con las 4 bandas.
- Las otras 12 rutas medidas (6 servicios, trabajo, método, nosotros, blog, diagnóstico, contacto): **0 %**.

---

## (b) Tipografía

**Familias y archivos**

- **Manrope** es variable, `wght` 200–800 (medido en `manrope-latin.woff2`). Se declara 400 800 en `public/fonts/manrope.css`, y 200 800 en `OG/base.css`:1-2.
  - Pila en el sitio: `'Manrope', system-ui, sans-serif`, sin Inter (CSS:37).
  - Fuentes cargadas en las 14 rutas renderizadas: solo «Manrope 400 800» y «Gabarito 400 700».
- **Gabarito** es un archivo **estático, usWeightClass 600, sin eje wght** (medido). El del sitio y el de `OG` son el mismo archivo (md5 `f505b429…`).
  - Se declara 400 700 en `global.css`:12-17 y 400 900 en `OG/base.css`:3.
  - Medido: a 400 y a 800, con los tres tipos de declaración, la tinta es idéntica (15.494 px de tinta y 474,4 px de ancho a 100 px). El peso que se ve es el del archivo.
- Uso de Gabarito: solo el wordmark, en el módulo y en el pie (SPEC:50 · SPEC:142 · CSS:314 · NAV:75).

**Escala real**

| Rol | Regla CSS | 1440 | 390 | Peso | Interlínea | Tracking | Fuente |
|---|---|---|---|---|---|---|---|
| Display | `clamp(2.4rem,10vw,7.5rem)`. En el hero y en los campos ≥768 px: `clamp(2.4rem,min(10vw,14svh),7.5rem)` | **120 px** | **39 px** | 800 | 0,9 (108 / 35,1 px) | −0,005em (−0,6 px) | CSS:43, 115, 183 |
| Ojillo (sobre el display) | `clamp(1rem,1.4vw,1.25rem)` | 20 | 16 | 500 | 1,5 | 0 | CSS:109-110 |
| h1 interno | `clamp(2.25rem,4.17vw,3.75rem)`, balance | 60 | 36 | 500 | 1,1 | −0,02em (−1,2 px) | CSS:44 |
| h2 | `clamp(1.375rem,2.08vw,1.875rem)` | 29,95 | 22 | 500 | 1,4 | −0,02em | CSS:45 |
| h3 | `clamp(1.25rem,1.67vw,1.5rem)` | 24 | 20 | 500 | 1,4 | 0 | CSS:46 |
| Guía | igual al h3 | 24 | 20 | 400 | 1,5 | 0 | CSS:47 |
| Descripción del campo | `clamp(1.125rem,1.67vw,1.5rem)`; el momento en `<b>` 600 | 24 | 18 | 400 / 600 | 1,5 | 0 | CSS:187-188 · HOME:239 |
| Cuerpo (en gris) | `clamp(1.0625rem,1.25vw,1.125rem)` | 18 | 17 | 400 | 1,6 | 0 | CSS:48 |
| Línea bajo el h1 (en gris) | `clamp(1rem,1.25vw,1.125rem)`, máx. 560 px | 18 | 16 | 400 | 1,5 | 0 | CSS:257 |
| Precio | 1rem; cifras en `<b>` 600 | 16 | 16 | 400 / 600 | 1,6 | 0 | CSS:223, 226 |
| Nota (gris; `<b>` en papel 600) | 0,9375rem | 15 | 15 | 400 | 1,5 | 0 | CSS:106-107 |
| Chico | 0,875rem | 14 | 14 | 400 | 1,5 | 0 | CSS:49 |
| Botón | 14 px, 36 px de alto | 14 | 14 | 500 | 1 | 0 | CSS:54 |
| Rótulo, miga, línea legal (gris) | 0,8125rem | 13 | 13 | 500 / 400 / 400 | 1,5 | 0 | CSS:51, 255, 315 |
| Píldora | 0,8125rem, 30 px de alto | 13 | 13 | 500 | 1 | 0 | CSS:60 |
| Etiqueta de pieza | 0,75rem | 12 | 12 | 500 | 1,5 | 0 | CSS:73 |
| Wordmark del módulo | Gabarito, 18 px (<640) / 20 px (≥640) | 20 (97,5 px de tinta) | 18 (87,8 px de tinta) | pide 400; archivo 600 | — | −0,025em | NAV:75 (medido) |
| Wordmark gigante del pie (punto en papel) | Gabarito, `calc(100cqi/4.78)` | 284,5 px (1349,7 px de tinta) | 73,2 px | pide 800; archivo 600 | 0,78 | −0,035em | CSS:314 (medido: tinta = 4,744 × tamaño) |
| Wordmark de la imagen OG | 56 px en 1200×630 | — | — | pide 800 | 1 | −0,035em | OG/base.css:6-8 |

**Regla de mayúsculas**

- Manrope 800 en mayúsculas va en **cinco lugares**: el titular del hero y las cuatro palabras de campo. Las internas, cero (CSS:12-14 · SPEC:45-47, 124, 138 · MAN:132-135).
  - Medido: la home tiene 5 elementos en mayúsculas (los cinco `.d-display`); las otras 13 rutas, 0.
- Límite del display: ≤ 6 palabras y ≤ 34 caracteres. Si no cabe, se reescribe; nunca se le baja la caja (MAN:146-147).
- Rótulos en caja normal, nunca en mayúsculas espaciadas (CSS:51 · SPEC:124 · PIE:8).
- No hay tracking positivo en ningún elemento.
- Medida de línea: ≤ 68 caracteres (MAN:170). Se implementa con `max-width: 28.5em`, porque `ch` en Manrope da ~87 caracteres reales (SPEC:158, 181).
- Display de referencia, texto real: «Estás pagando para que lleguen a tu sitio.» (ojillo) / «Ahí se corta / el circuito» (HOME:198-199).

---

## (c) Forma

- **Radio:** `--d-r: 6px` es el único (CSS:31).
  - 4 px va en: controles (botón del chequeo y píldoras, CSS:60, 104), etiqueta de pieza (CSS:73), rasgo de plan (CSS:281) y píldora-rótulo (SPEC:253).
  - Radios medidos en el render: home 6 px ×33 y 4 px ×14; desarrollo-web 6 ×16 y 4 ×23; servicios 6 ×7. Ningún otro valor.
  - Cero `rounded-full` (LOCK:62 · `tailwind.config.mjs`:107-112).
- **Márgenes:** `--d-m` 40 px, y 20 px hasta 767 px de ancho (CSS:32, 35).
- **Gutter:** `--d-g` 16 px, y 10 px hasta 767 px (CSS:33, 35).
- **Filete:** 1 px de papel al 12 % entre filas (CSS:246-247, 273-274, 300). Sobre campos va en el color del texto al 32 % (SPEC:74-77).
- **Separador del precio:** 1 px × 0,875em, opacidad 0,35, márgenes `0 .75em` (CSS:224).
- **Vidrio** (`backdrop-filter`): dos usos y solo dos, el módulo de navegación (8 px) y la etiqueta de pieza (6 px) (SPEC:253 · NAV:71 · CSS:73).
- **Aire entre secciones:**

| Bloque | Valor | Fuente |
|---|---|---|
| hero | 112 / 40 / 28 | CSS:97 |
| presentación | 180 / 200 (en celular 110 / 130) | CSS:160, 163 |
| quién | 180 / 160 | CSS:238 |
| sección pegajosa | 180 arriba | CSS:267 |
| galería | 180 arriba | CSS:290 |
| siguiente | margen 200 arriba | CSS:300 |
| pie | relleno 72 / 40 / 28, margen 120 arriba | CSS:307 |
| campo | relleno 92 / 40 / 32 | CSS:168 |
| fila de lista | 22 px | CSS:247, 273 |

- **Sombras:** ninguna, salvo el anillo de foco del campo del chequeo (CSS:103).
- **Módulo de navegación:** fijo arriba a la izquierda, a 20 px del borde (16 en celular). Caja de 54 px de alto, radio 6, con wordmark · «Escríbenos» (15 px 500) · menú, separados por un borde de blanco al 10 % (NAV:70-87, medido).

---

## (d) Componentes con equivalente en una pieza gráfica

1. **Wordmark y su punto.**
   - Texto `SpindleLab` + `<span>` «.» en oro (NAV:75-77).
   - En el sitio va **con placa**: el módulo, `rgba(0,0,0,.75)` con desenfoque (NAV:71).
   - En el pie va gigante y con el **punto en papel** (CSS:311-314 · PIE:45; motivo: un oro por vista).
   - En la imagen OG va **puro, sin placa**, 56 px en 1200×630; el README dice «78 px de oro a 1200, 16 a 552» (OG/a-titular.html:7 · OG/README.md:16).
   - Medidas: tinta = 4,877 × tamaño con −0,025em, y 4,744 × tamaño con −0,035em. Caja del punto: 5×28 px a 20 px.
   - Manual: mínimo 120 px de ancho; área de respeto de media «S» por lado (MAN:50-51).
2. **Etiqueta de pieza.**
   - Arriba a la izquierda, a 10 px; varias etiquetas con 4 px de separación. En la fila del hero van en línea (CSS:72, 124).
   - Medido: 12 px 500, relleno 5/8, 28 px de alto, radio 4, fondo negro al 66 % + desenfoque de 6 px, texto papel.
   - Capturas planas: abajo a la izquierda, porque arriba está la cabecera del sitio retratado (CSS:75-79 · SPEC:254).
   - Rótulo único por obra (`obra-v3.json`:10, 28, 46, 64 · SPEC:233, 243): «Combeau, fotografía · Cliente», «Combeau, modelo · Cliente», «Verifica y Cumple · Producto propio», «Raigal · Implantología».
3. **Rótulo de concepto.** «Pieza de concepto · no es un cliente», en papel con texto `#000`, siempre primero (PIEZA:60 · CSS:74). Raigal no va en la imagen OG porque el rótulo no se lee a tamaño de miniatura (OG/README.md:14-15).
4. **Línea de precio.**
   - Medida en el render: `Desde` ▏ **`$390.000 · $690.000 · $1.190.000`** `+ IVA`.
   - Lleva **un** separador vertical, entre «Desde» y las cifras. «+ IVA» va pegado a la última cifra, sin separador (HOME:240-245 · CSS:220-232).
   - Las cifras van en 600 y los rótulos sin opacidad. Cada alternativa con su plan no se parte (SPEC:139, 147, 155, 206, 239).
   - Cifras exactas (`oferta-v3.json`):

| Servicio | Precio |
|---|---|
| Desarrollo web | $390.000 · $690.000 · $1.190.000 |
| Visibilidad en IA | $400.000 |
| Auditoría SEO técnica | $490.000 · $690.000 con Visibilidad IA |
| Acompañamiento mensual | $590.000/mes · $790.000/mes Pro |
| Gestión de redes sociales | $390.000/mes · $590.000/mes con pauta |
| Paid Media (Google) | $350.000/mes · $550.000/mes Pro |

5. **Filas con filete.**
   - `.d-filas`: filete arriba de cada fila y abajo de la última, relleno de 22 px (CSS:272-274).
   - Índice: grilla `120px | 1fr | 24px`, fecha 15 px en gris · h3 24 px 500 · «→» en gris (CSS:244-251).
   - Nunca tarjetas iguales en grilla (SPEC:68-69, 126).
6. **Campo.**
   - Una pantalla exacta, pegajosa, cada uno tapa al anterior (CSS:168, 190-193 · SPEC:182).
   - Orden: palabra en display · píldoras (caja de 38 px, relleno 4, radio 6; píldora de 30 px) · descripción de 24 px con el **momento en 600** · precio a 18 px de distancia · 2 botones · fila de 2 imágenes al fondo (HOME:221-256 · SPEC:63-64).
7. **Pieza y mockup.**
   - `.d-pieza`: radio 6, `overflow: hidden`, fondo `#161616`, imagen con `object-fit: cover` (CSS:67-69).
   - Proporciones en uso: fila de 4 → 0,91; fila de 3 → 4:3; fila de 2 → 16:9; quién → 3:4; imagen a sangre → 2,39 (4:3 en celular); galería → ancha 16:9 o su `--r`, alta 3:4 (4:5 en celular), media y mitad 4:3 (CSS:83-87, 239, 258-260, 294-298).
   - En la fila del hero, cada pieza en su proporción y todas con el mismo alto (SPEC:227).
8. **Nota** (`.d-nota-card`): fondo módulo, radio 6, relleno 14/16, 14 px en gris, `<b>` en papel (CSS:262-263).
9. **Miga:** separador «·» (SPEC:218).
10. **Siguiente:** filete arriba · rótulo · h1 de 60 px + «→» (CSS:300-304).

---

## (e) Imagen

**Pool en uso** (`public/assets/img/`, dimensiones medidas; alt según HOME:101-115 y SPEC:210)

| Archivo | Tamaño | Alt |
|---|---|---|
| `d/domino.jpg` | 1600×1600 | «Fichas de dominó cayendo en fila sobre fondo negro» |
| `d/domino-curva.jpg` | 1600×1600 | «…en fila curva sobre piedra oscura, con luz cálida» |
| `d/escritorio.jpg` | 1600×670 | «Escritorio de madera con un laptop, un cuaderno y una taza junto a la ventana» |
| `d/ventana.jpg` | 1600×670 | «Mesa de trabajo junto a una ventana con cortinas, con un cuaderno abierto y un laptop» |
| `d/hilo.jpg` | 1400×787 | «Un hilo luminoso cruza en diagonal un fondo verde oscuro» |
| `d/hilos.jpg` | 1600×960 | «Cantos de hojas apiladas en azul oscuro, en diagonal» |
| `ramon-vallejos.jpg` | 896×1200 | — (retrato) |
| `ramon-vallejos-avatar.jpg` | 132×132 | — |
| `obra/mock-<caso>-alto.jpg` | 1000×1100 (10:11) | — |
| `obra/mock-<caso>-ancho.jpg` | 1600×1200 (4:3) | — |
| capturas `obra/<caso>-alto.jpg` | 900×1200 | — |
| capturas `obra/<caso>-ancho.jpg` | 1440×810 | — |
| `obra/combeau-fotografia-ancho-2.jpg` | 1440×616 | — |

Las fotos `d/*` y los mockups tienen versión de 800 px (`*-800.jpg`).

- **Sobre `hilos.jpg`:** es un **recorte**, sin la línea de oro, y se le subió el contraste. Va siempre como `?v=2` (SPEC:118-120, 229, 251).
- **Mockups** (`…/spindlelab-v3/mockups/README.md`):
  - Obra real en un notebook y un teléfono dibujados en CSS, sobre fondo de estudio: salvia `#C5CFC0` (Combeau fotografía), piedra `#D6D0C8` (Combeau modelo), lavanda `#C3C8EE` (Verifica y Cumple), arcilla `#B7AC9A` (Raigal). Ninguno cerca del oro.
  - No se montan sobre las fotos del pool: los notebooks de esas fotos están cerrados (SPEC:143).
  - Se regeneran con `escena.html`, `cap-movil.mjs` y `mock-render.mjs`.
  - Un archivo que cambia de contenido cambia de nombre (`-2`) o lleva `?v=N` en todas sus referencias (SPEC:256).
- **Lista negra** (SPEC:114-117):
  - `hero-*.jpg`, `estrategia-mesa.jpg`, `equipo-creativo.jpg`, `servicios-oficina`, `evidencia-oficina`, `metodo`, `problema`, `foto-banner-original`: son de banco o muestran equipos que no existen.
  - `servicios-capas` y `evidencia-medicion`: llevan un punto dorado dibujado.
- **Video:** solo `hero-hilo-de-oro.mp4`, y solo sin `prefers-reduced-motion` (SPEC:121).
  - Medido: 1920×1080, 24 fps, 6,04 s.
  - Píxeles de tono oro por cuadro, a 1 por segundo: 0,13 a 0,72 % (criterio: tono 38–54°, saturación ≥0,5, brillo ≥0,5).
  - Ninguna página `/v3/` lo usa hoy: 0 `<video>`.
- **El mismo criterio de tono oro sobre el pool:** 0 % en todas las fotos `d/*`, en el retrato y en los mockups (máx. 0,05 %), salvo **`obra/combeau-modelo-alto.jpg`, con 0,86 %**: follaje de palmera amarillo en una foto del cliente.
- **Concepto** (`marketing/portafolio/README.md`:23-37): el rótulo va en la pieza, visible sin scroll y presente en cualquier captura de la primera pantalla. Cero cifras de resultado y cero testimonios.
- **Unsplash: lo que dicen hoy las fuentes.**
  - MAN:266-268: la foto del banner `redes/fuentes/foto-banner-original.jpg` es de Unsplash y lleva «velo de tinta ≥50 %».
  - SPEC:115 pone `foto-banner-original` en la lista negra.
  - SPEC:259 y `acta-qa-final.md`:51: fotos nuevas de Unsplash diferidas, las elige Ramón («hay 6 fotos para 21 rutas»).
  - La regla nueva de la decisión 6 (objetos y lugares sí; personas como equipo o clientes no; pantallas con datos inventados no) no está escrita en ninguna fuente.
- **Escala necesaria para llenar a sangre** (recorte máximo a la proporción del formato, y cuánto hay que ampliarlo):

| Imagen | 1080×1350 | 1080×1920 |
|---|---|---|
| dominó, dominó curva | ×0,84 | ×1,20 |
| hilos | ×1,41 | ×2,00 |
| hilo | ×1,72 | ×2,44 |
| escritorio, ventana | **×2,01** | **×2,87** |
| retrato | ×1,21 | ×1,60 |
| mockup alto | ×1,23 | ×1,75 |
| mockup ancho | ×1,12 | ×1,60 |
| captura ancha | ×1,67 | ×2,37 |
| combeau-fotografia-ancho-2 | ×2,19 | ×3,12 |

---

## (f) Movimiento (para reels)

- **Entrada:** opacidad 0 → 1 y desplazamiento de 28 px, en 0,8 s con `cubic-bezier(.5,0,.1,1)`.
  - Escalonado de 0,08 / 0,16 / 0,24 s, máximo 3 pasos.
  - El primer pantallazo no anima (umbral 0,9 del alto de la ventana). Red de seguridad a los 3 s.
  - Con movimiento reducido no se esconde nada.
  - Fuentes: `campos-v3.css`:219-233, 244-251 · MOV:27-47 · MAN:216.
  - Medido: **ninguna página `/v3/` marca `[data-entra]`**; el mecanismo existe y no se usa.
- **Menú:** filas que entran en 0,5 s con la misma curva, 14 px, escalonado de 0,04 s (NAV:205-217).
- **Scroll suave** (Lenis): duración 1,1, curva `min(1, 1.001 − 2^(−10t))`, nada en táctil, apagado con movimiento reducido (`Layout.astro`:208-224).
- **Paralaje:** ±22 px sobre `.paralaje` (MOV:118-128). Ninguna página lo usa.
- **Video:** se monta tarde (`src` a 400 px de la vista), uno por página (MOV:93-108 · MAN:218).
- **Composición pegajosa:**
  - Campos que se apilan, cada uno tapa al anterior (CSS:166-193).
  - Etiqueta de sección pegajosa con `top: 120px` (CSS:268).
  - En celular, filas en carrusel con la pieza siguiente asomándose (78 % / 86 %, CSS:88-94).
- **Lo que no hay:** cero animación letra por letra; los encabezados son texto plano (MAN:225-228 · `campos-v3.css`:203-204). En driftime hay una sola animación CSS declarada (LOCK:97-105).

---

## (g) Lo que el manual v2.0 dice distinto del sitio actual

| # | Tema | Manual v2.0 | Sitio y spec actuales |
|---|---|---|---|
| 1 | Qué rige las redes | «Piezas de redes → el sistema live v2 de `marketing/redes/README.md`» (MAN:20). Ese sistema usa fondo `#0e141b` con un cuadro del video del hero bajo un velo de .86–.96, Gabarito en títulos, kickers en petróleo `#2fa99b` y oro «en el punto o en UN dato» (`marketing/redes/README.md`:19-35) | Lienzo `#000`, Manrope en todo, oro solo en el punto (CSS:18, 37, 24) |
| 2 | Formato de los posts de Instagram | 1080×1080 (MAN:263) | Decisión 1: 1080×1350 |
| 3 | Rama del v3 | `claude/rebranding-webdev-exploracion` (MAN:11) | `claude/magical-franklin-ckfki2` (`acta-qa-final.md`:62) |
| 4 | El punto del wordmark | «SIEMPRE dorado», «no cambia nunca de color» (MAN:47, 49) · «Lo que NO cambió: … wordmark … punto dorado» (MAN:285) | En el pie gigante el punto va **en papel** (CSS:311-314 · PIE:45) |
| 5 | Tamaño mínimo del wordmark | 120 px de ancho (MAN:51) | Módulo de navegación: **97,5 px** a 1440 y **87,8 px** a 390 (medido) |
| 6 | Placa del wordmark | Sin contenedor (MAN:46, 52) | En el módulo va sobre una placa negra al 75 % con radio 6 (NAV:71); en la OG, puro |
| 7 | Monograma | Cuadrado de **esquinas rectas** (MAN:59) | Un solo radio de 6 px para todo (CSS:31). El monograma no aparece en `/v3/` |
| 8 | Superficie elevada | Tinta `#131A22` para «tarjetas y paneles» (MAN:76) | `--d-modulo` `#161616`, nunca fondo de sección; no hay tarjetas (CSS:19 · SPEC:27, 68) |
| 9 | Gris de metadatos | Humo `#96948E` (6,92:1) (MAN:80) | `--d-gris` `#9AA4B0` (8,31:1 calculado); humo queda solo en el párrafo del menú (NAV:161) |
| 10 | Usos del oro | El punto, separadores «·» o un dato clave (MAN:79, 176-181) | **Solo** el punto del wordmark del módulo, uno por vista; dos o más es defecto (CSS:24 · SPEC:31, 125, 153) |
| 11 | Blanco | Para «botones de campo» (MAN:78) · «Botón sobre campo: blanco lleno, texto `#14110E`» (MAN:210) | `.d-btn` papel `#F7F5F0` con texto `#000`, 36 px, 14 px 500, también sobre los campos (CSS:54; medido en el campo brasa) |
| 12 | Opacidad sobre los campos | «Los campos no llevan blanco con opacidad encima» (MAN:89) | Píldora activa blanco al 14 %, caja negra al 22 %, separador al 35 % y filete del texto al 32 %; todas superficies o líneas, no texto (CSS:59-61, 224 · SPEC:74) |
| 13 | Cobertura de campo | «Ninguna página del sistema queda sin campo»; home 32 %, internas 13–44 % (MAN:104-109) | Home 48,1 %, `/servicios/` 45,0 %, las otras 12 rutas 0 % (medido). Está abierto en SPEC:195 |
| 14 | Inter | «Queda de fallback» (MAN:123) | No está en la pila de v3 (CSS:37); no se carga en ninguna ruta (medido) |
| 15 | Radio | «UN radio para todo: 6 px. Cero píldoras» (MAN:207) | 6 px + 4 px declarado en controles, etiquetas, rasgo de plan y píldora-rótulo (SPEC:253; medido) |
| 16 | Aire de sección | 256 px arriba y abajo (MAN:208) | 180/200, 180/160, 180 (110/130 en celular); 200 antes de «Siguiente» (CSS:160, 238, 267, 290, 300) |
| 17 | «Medianil» | 40 px, plano (MAN:209) | Margen lateral 40 (20 en celular) y separación entre piezas de 16 (10 en celular), como dos tokens (CSS:32-35) |
| 18 | Entrada animada | «Se marca el titular de sección y el bloque de abajo» (MAN:216) | Ninguna página v3 marca `[data-entra]` (medido por grep) |
| 19 | Mecanismos de movimiento | Tres, sin paralaje (MAN:214-218) | `MOV` define además un paralaje de 22 px (sin uso). Lenis está en `Layout.astro` y no en el manual |
| 20 | Display | Escala `clamp(2,4rem,10vw,7,5rem)` (MAN:158) | En el hero y en los campos ≥768 px también limita por alto: `min(10vw,14svh)` (CSS:115, 183 · SPEC:226) |
| 21 | Fotografía de marca | `foto-banner-original.jpg` (Unsplash) con velo de tinta ≥50 % (MAN:266-268) | En la lista negra (SPEC:115); en el sitio no hay velos sobre las fotos |
| 22 | Estado de las decisiones | Radio de 6 px y campos brasa/ciruela «aplicados, sin aprobación explícita» (MAN:32-33) | La spec los da por regla (SPEC:36, 253); el lock dice que Ramón fijó driftime el 5-oct (LOCK:3) |
| 23 | Cuerpo sobre petróleo | 5,03:1 (MAN:96) | Banda del índice: «5,06:1» (SPEC:79); el cálculo da 5,03 |

**Inconsistencias dentro de las fuentes del propio sitio**

- **Contraste del gris:** CSS:22 y SPEC:30 dicen que `--d-gris` da «6,9:1 sobre negro». El cálculo WCAG da **8,31:1**; 6,92 es el valor de humo.
- **Fondo del módulo:** SPEC:27 asigna `--modulo` `#161616` al «módulo de nav». El render da `rgba(0,0,0,.75)` con desenfoque y borde de blanco al 10 % (NAV:71).
- **Menú en mayúsculas:** el comentario de NAV:116 dice «grande y en mayúsculas». El CSS del menú no tiene `uppercase` (NAV:179-180), y la medición en las rutas no encontró mayúsculas fuera de `.d-display`.
- **Voz:** la decisión 7 prohíbe «acá». La skill de voz cita «escríbeme por acá y lo miramos» como rasgo (`.claude/skills/voz-spindlelab/SKILL.md`:43), y tres textos publicados del corpus lo usan (`corpus.md`:54, 89, 130). SPEC:213 deja abiertos los «acá» del artículo verbatim de los 21 chequeos.

---

## Pipeline de render ya aprobado (OG), reutilizable

- **`OG/render.mjs`:** Playwright con `CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, `deviceScaleFactor: 2`, espera `document.fonts.ready` + 300 ms y registra las fuentes cargadas.
- **`OG/reducir.py`:** reduce con LANCZOS y guarda en JPEG calidad 90, `subsampling=0`, progresivo. Con el 4:2:0 por defecto, el punto de oro salía `#8D834E` en vez de `#C9A227` (OG/README.md:28-30).
- **Cada carpeta lleva sus propias fuentes:** `manrope-latin.woff2`, `manrope-latin-ext.woff2` y `Gabarito.woff2`, con `@font-face` relativo (OG/base.css:1-3).
- **Composición de referencia de `a-titular`:** wordmark de 56 px, ojillo de 30 px 500, display de 132 px y pie de 24 px con filete arriba (OG/a-titular.html:2-5).

**Fuentes web citadas:**
- [Meta Ads Guide · Instagram Stories](https://www.facebook.com/business/ads-guide/update/image/instagram-story)
- [Meta Ads Guide · Instagram Reels](https://www.facebook.com/business/ads-guide/update/video/instagram-reels)
- [Kapwing, grilla 3:4](https://www.kapwing.com/resources/instagrams-new-grid-layout-size-and-dimensions-2025/)
- [Inquirer, anuncio de la grilla](https://usa.inquirer.net/165044/bye-squares-why-instagram-switched-to-a-taller-grid)
- [Hopper HQ, tamaño de reels](https://www.hopperhq.com/blog/instagram-reel-size/)
- [inro.social (resultado de búsqueda; la página dio 404 al abrirla)](https://www.inro.social/blog/instagram-post-size)