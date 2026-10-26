# Spec de la home · obra E13 · solo lo que cambia

**26-oct-2026 · Lucía (dirección de arte).** Sin dirección nueva ni compuerta 2: el diseño A · Archivo que Ramón eligió el 19-oct se conserva entero (`spec-visual.md` §1 tokens, §1.3 escala, §1.5 espaciado, §4 estados y §6 prohibiciones siguen mandando). Esta spec dice **solo lo que cambia en la home** y en lo común que la home arrastra (encabezado y pie, que cambian en todas las rutas). Donde `spec-visual.md` §2.1, §3.2 y §3.4 digan otra cosa, manda esta (cada desvío está en la sección 9, con su porqué).

- **Qué se construye:** las nueve secciones del brief §4, con **clases y componentes que ya existen** (`src/styles/archivo.css`, `src/components/a/`). Clase nueva solo donde está dicho, con su motivo: `.portada-v__accion` (renombra a `.portada-v__chequeo`), `.cab__der`, `.cab__nav-contacto`, `.pie-sitio__enlaces`. Ningún token, letra, radio ni resorte nuevo.
- **Texto:** el de `e13/fuentes/v2-vigente/home.txt` (el publicado el 24-oct y aprobado). Al escribir esto `e13/texto/home.json` de Clara todavía traía el texto del v3 anterior; esta spec no depende de sus ids.
- **Cómo se midió:** sobre un prototipo armado con las clases reales (HTML del `dist/` de la rama con `<main>`, encabezado y pie reemplazados; nada en el repositorio), en Chrome de la Mac, con y sin el aviso de cookies (sin `spindlelab_consent` en `localStorage`). Cada número de abajo dice de qué medición sale; las herramientas y capturas están en la sección 8.

---

## 1 · Mapa de las nueve secciones

Columnas «c» de la retícula (`spec-visual.md` §1.4: 16 desde 1194, 12 de 834 a 1193, 8 bajo 834). Arriba de cada sección, el `.seccion` de siempre: **120 px desde 834 y 80 bajo 834**; antes del pie, 160. Alturas medidas en el prototipo (px, de la sección sin el pie).

| # | Sección | Patrón (clases reales) | ≥ 1194 | 834 a 1193 | < 834 | 1440 · 768 · 390 |
|---|---|---|---|---|---|---|
| 1 | **Portada** | `.portada-v` + `Video` (`sangre`, `pausaArriba`, `primeraPantalla`) + `.portada-v__pie` > `.portada-v__decl` (`p.rotulo`, `h1.t-portada` con `.tinta` y `.gris`, `p.cuerpo.entradilla`) + **`.portada-v__accion`**. Detalle en la sección 2 | frase c1–c12; acción c13–c16 | frase c1–c7; acción c8–c12 | franja 16:9 a sangre, luego rótulo, h1, **acción**, entradilla | 836 · 752 · 606 |
| 2 | **Dónde puede caerse una consulta** | `.seccion.reticula` > `.int-sec__cab` (`p.rotulo` + `h2.t-declaracion`) + `.int-sec__cuerpo` (`p.cuerpo.caja`) | h2 c1–c4 (pegajoso a 88), párrafo c5–c12 | h2 arriba, párrafo debajo | igual | 233 · 279 · 312 |
| 3 | **Para empresas que ya venden** | Igual que 2, sin rótulo, dos `p.cuerpo.caja` | ídem | ídem | ídem | 244 · 264 · 277 |
| 4 | **Cómo partimos y cómo seguimos** | `.int-sec__cab` (rótulo + h2) + `.int-sec__cuerpo.int-sec__cuerpo--ancho` > `ol` > 4 × `li.fase` (`h3.t-fase` con `<span aria-hidden="true">01 · </span>` + `.fase__der > p.cuerpo`) y, bajo la lista, `p.cuerpo.int-lista__pie > a` «Ver el método completo» + flecha. **Sin** `.datos-fase` | filas c5–c16 (título 2/7, cuerpo 5/7, tope 493) | filas a las 12 c | una columna | 559 · 748 · 776 |
| 5 | **Lo que podemos hacer por ti** | `.seccion.reticula.servicios` > `.servicios__cab` (rótulo, h2, `p.cuerpo.caja`) + 4 × `.servicio.borde`: `h3.servicio__sit.t-titulo` (nombre del bloque), `.servicio__cuerpo > p.cuerpo.caja`, `.servicio__precio` > `p.cuerpo.valor` (precio) + un `p.chico > a.subrayado` + flecha por servicio. **Sin** `.servicio--puerta`, **sin** `boton--placa` (la única acción con forma de botón de la página es la del encabezado, la portada y el cierre), **sin** `.servicios__tambien` | nombre c1–c4, texto c5–c11, precio y enlaces c13–c16 | c1–c4, c5–c9, c10–c12 | apilado | 837 · 1168 · 1252 |
| 6 | **Lo que puedes revisar antes de contratar** | Sección 4 de esta spec. `.int-sec__cab` + `.int-sec__cuerpo--ancho` > `ol` > 5 × `li.fase` con medio en dos de ellas | h2 c1–c4 pegajoso, filas c5–c16, medio de 747 px | filas a las 12 c | una columna, medio a todo el ancho | 1713 · 1920 · 1589 |
| 7 | **Quién está detrás** | `.seccion.reticula.quien` como hoy (`.quien__retrato` 3:4 con `data-entrada`, `.quien__txt`), más `p.rotulo` (nombre · cargo) y, entre los dos párrafos y el botón, `ul.int-lista.quien__lista` con 3 × `li` (`h3.int-lista__t.tinta` + `p.cuerpo`, los tres de «Empiezo por mirar») y `boton--placa` «Conocer más» | retrato c1–c5, texto c7–c14 | c1–c5, c6–c12 | retrato a lo ancho, texto debajo | 778 · 1721 · 1298 |
| 8 | **Preguntas frecuentes** | `.int-sec__cab` (rótulo + h2) + `.int-sec__cuerpo` > 5 × `.pregunta` (`h3` + `p.cuerpo`). **Todas abiertas, sin `details`**: lo que se ve es lo que dice el `FAQPage` | c5–c12, pregunta 2/5 y respuesta 3/5 | ídem | apilado | 757 · 913 · 979 |
| 9 | **Cierre** | `.seccion.reticula.contacto` > `.contacto__txt` (h2 `.tinta` + `.gris`, `boton--claro` a `/v3/contacto/`, `p.chico` con el correo si Clara lo conserva) | c1–c9 | c1–c9 | una columna | 298 · 241 · 259 |

**Por qué esta secuencia de patrones.** Cinco de las nueve (2, 3, 4, 6, 8) usan el esqueleto de las interiores (h2 a la izquierda en c1–c4, contenido desde c5): es la columna vertebral del sistema, y que el texto de toda la página arranque en c5 es lo que hace que lea como un solo documento. Lo rompen donde el contenido pide otra forma: la portada (video), los servicios (fila de tres: nombre, texto, precio), «Quién» (retrato) y el cierre (frase a todo lo ancho). Cuatro servicios de peso parecido van como **lista editorial de filas con línea**, no como tarjetas (`antislop-web.md` B1). El orden es el del recorrido del brief §4 (B7): qué problema, para quién, cómo se trabaja, qué se hace, qué se puede comprobar, quién, qué se pregunta, cómo se empieza.

**Rótulos mono sobre el h2** (`El problema`, `Método SpindleLab`, `Soluciones`, `Evidencia`, `Quiénes somos`, `Preguntas frecuentes`): están en el texto publicado; el hueco existe (`.rotulo` dentro de `.int-sec__cab`, `.servicios__cab` o `.quien__txt`). Si Clara los saca, el layout no cambia. Seis rótulos en nueve secciones es el máximo que tolero; no se suman más.

**Entrada con resorte** (una por sección, nunca texto): el primer medio de la sección 6 y el retrato de la 7. Las demás, sin `data-entrada`.

**Se retira de la home** (todo con `grep` previo: si otra ruta lo usa, se queda): `.cinta-s` y `.cinta-s__*`, `cinta.mjs`, `data/archivo/cinta.json`, `public/v3/cinta/` (1.952 kB); `.destacados*`, `.fila-par`, `.prueba*`, `.ficha-linea`, `.servicio--puerta`, `.servicios__tambien`; `.chequeo--apilado` y el `<Chequeo apilado>` de la portada; los imports `Pieza`, `casoPraxi`, `cinta` y las entradas de `trabajo.json` que solo usaba la home. **Se queda** `.pieza` y `.corchete` (los usa `/v3/trabajo/`).

---

## 2 · La portada (lo único que reabre algo aprobado)

El hero del 19-oct tenía el chequeo en la columna derecha como acción principal. Ahora esa columna lleva **la revisión** y el chequeo baja a un enlace. Lo demás (el hilo de oro, el velo, la pausa, la costura de 48 px, el alto mínimo `100svh − 64`, los tamaños de letra) no se toca.

**Contenido, en este orden en el DOM:** `p.rotulo` «Marketing y crecimiento con IA para empresas que ya venden» · `h1.t-portada` «*Te llegan consultas.* Veamos dónde se cae el resto.» (tinta, gris) · `p.cuerpo.entradilla` (el subtítulo) · `.portada-v__accion`: **`a.boton.boton--claro#portada-cta`** «Pedir la revisión de una página» + flecha, a `/v3/contacto/` · `p.chico` (el microcopy: qué recibe y «gratis, un día hábil») · `p.chico > a` (hereda el subrayado de `.chico a`) «Chequear mi sitio ahora, sin registro» a `/v3/diagnostico/`. El microcopy va **pegado bajo el botón** porque es su promesa; el enlace va después porque es otra acción (en el v2 publicado el enlace iba entre los dos: se cambia de orden y se anota en `desvios`).

### Variantes (solo del hero; Ramón mira las capturas)

| | **H-A · Columna (recomendada)** | H-B · Bajo el texto |
|---|---|---|
| Composición | La acción ocupa donde estaba el chequeo: c13–c16 desde 1194, c8–c12 de 834 a 1193, botón a todo el ancho de la columna, apoyada en la misma línea de abajo que la frase | La acción baja a la columna de la frase, bajo la entradilla: botón y enlace en una fila, microcopy debajo; la derecha queda vacía |
| Lo que preserva | La composición que Ramón aprobó (frase pesada a la izquierda contra un bloque angosto a la derecha, el video respirando arriba) | El camino de lectura en línea recta (h1, entradilla, botón) |
| Lo que sacrifica | El ojo salta de la frase a la derecha para llegar al botón | La asimetría del 19-oct; el video pierde alto |
| Video sin velo (px) a 1440×900 · 1194×834 · 1024×768 · 834×1112 | **430 · 361 · 268 · 621** (el hero de E12 tenía 288 a 1440) | 293 · 252 · 152 · 487 |
| Botón entero sobre el aviso abierto, margen (px) a 1440×900 · 1194×834 · 1024×768 · 834×1112 | 55 · 72 · 53 · 52 | 24 · **4 · 4** · 21 |
| Contraste del texto sobre el video, peor caso | 5,37:1 | 5,33:1 |

**Recomiendo H-A.** Los dos pasan el contraste y el botón se ve con el aviso abierto en todos los anchos de la obra, pero B lo hace con 4 px de holgura a 1194×834 y a 1024×768: una línea más de microcopy y queda bajo el aviso. A además le devuelve al video casi 140 px (el hilo de oro es el único activo de la portada) y no reabre la composición aprobada: cambia el contenido de una columna, no la columna. B gana en lectura; no alcanza para pagar la holgura ni la asimetría. Capturas de las dos con el aviso abierto: sección 8.

### Cómo se arma H-A (diff sobre `archivo.css`, sección «1 · La portada»)

```css
/* E13 · la acción principal ocupa el lugar del chequeo (renombra .portada-v__chequeo) */
.a-body .portada-v__accion { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.a-body .portada-v__accion .chico { max-width: var(--a-caja); }
@media (max-width: 833.98px) {
  .a-body .portada-v__accion { order: 1; }              /* antes: .portada-v__chequeo { order: 1 } */
  .a-body .portada-v__medio { max-height: 28svh; }       /* la franja no pasa del 28 % de la pantalla (ver abajo) */
}
@media (min-width: 834px)  { .a-body .portada-v__accion { grid-column: 8 / -1; } .a-body .portada-v__accion .boton { width: 100%; } }
@media (min-width: 1194px) { .a-body .portada-v__accion { grid-column: 13 / -1; } }
```
Se borran `.portada-v__chequeo` (las cuatro reglas) y `.portada-v__chequeo .chico`. **Bajo 834 el orden a la vista es** rótulo, h1, acción, entradilla (el DOM no cambia; el mismo mecanismo `display: contents` + `order` de hoy). Con la entradilla antes del botón, el botón queda bajo el aviso a 360×640 (541–585 contra aviso desde 487) y a 375×667 (549–593 contra 533): por eso va después. Lo mismo que fijó el 23-oct el defecto 4, con el botón en el lugar del campo.

**Una clase de las que miden las herramientas cambia, y se dice:** `.portada-v__medio` gana `max-height: 28svh` bajo 834. Medido: a 360×640 con el aviso abierto el botón queda a **7 px** sobre el aviso sin la regla y a **30 px** con ella; a 375×667, 45 contra 69; a 390×844 y más no cambia (28 svh es más que la franja de 16:9). Bajo 834 ninguna línea cae sobre el video (el texto va en el lienzo), así que el contraste no depende de esa caja, pero `portada.mjs` y `contraste-portada.py` se vuelven a correr igual.

**Las herramientas de E12 leen el campo del chequeo y ya no existe.** `e12/spec/herramientas/portada.mjs` lee `#chq-dominio`, `#chq-btn` y `#chq-ayuda`, y fallaría. Cambio mínimo (ya hecho en una copia, `portada-lucia.mjs`, sección 8): `#chq-dominio` y `#chq-btn` pasan a ser el mismo elemento, `#portada-cta`; se borra `#chq-ayuda`; el «borde del campo» (1.4.11) se mide contra el relleno blanco del botón (queda en 15,8 a 16,6:1 contra su contorno). `contraste-portada.py` se usa tal cual (con `python3` a secas: con `-I` no encuentra `numpy`).

### Contraste y primera pantalla de H-A (medido)

- **Contraste sobre el video** (121 cuadros, 12 tamaños de 360×640 a 1920×1080): **0 líneas bajo 4,5:1**; la peor, 5,37:1 (la entradilla a 1194×834); sin velo, 1,11 a 1,40:1; α del velo bajo el texto 0,876. Bajo 834, 7,02:1 (gris sobre lienzo).
- **El botón se ve sin bajar**, con el aviso abierto (margen = alto del aviso − fondo del botón): 360×640 **7** (30 con `28svh`) · 360×800 167 · 375×667 45 · 390×844 213 · 414×896 251 · 768×1024 231 · 834×1112 52 · 1024×768 53 · 1194×834 72 · 1440×900 55 · 1920×1080 55. Sin aviso, entra en todos. **A 320×568 con el aviso abierto queda bajo él** (414–458 contra 415; el aviso mide 153 de 568), como la home de E12 a 375×667: fuera de los anchos de la obra, queda dicho; sin aviso entra.
- **Hoy, para comparar** (v3 construido): a 360×640 el chequeo **no** entra con el aviso (campo y botón en 590–634, aviso desde 487); la acción nueva sí.
- El microcopy y el enlace quedan parcialmente bajo el aviso a 1440×900 hasta que la persona elige; no es lo importante (§4.3 de la spec vigente lo deja pasar).
- **Sin chequeo en la home:** no se carga `v3-chequeo.js` ni existen los `#chq-*`; el velo ya no crece con un resultado (queda de alto fijo).

---

## 3 · Navegación y pie (cambian en todas las rutas)

### 3.1 · Cómo está hoy (medido en el build)

Encabezado de 90 px, **`position: relative`**: a 390 px, con la página a 1200 px de scroll, el encabezado está en `top: −1200` (se fue). «Escríbenos» es un `a` de 11 px mono como los otros cuatro, sin forma de botón. Seis ítems no caben en la segunda fila a 360 px (se cortaba «CONTACTO» a 360; justo a 390). Desde 834 es pegajoso y se pliega en una placa de 48.

### 3.2 · Encabezado nuevo (`Encabezado.astro` y `.cab` en `archivo.css`)

```astro
const menu = [
  { href: '/v3/servicios/', texto: 'Soluciones' }, { href: '/v3/metodo/', texto: 'Método' },
  { href: '/v3/nosotros/', texto: 'Nosotros' },    { href: '/v3/trabajo/', texto: 'Trabajo' },
  { href: '/v3/blog/', texto: 'Blog' },            { href: '/v3/contacto/', texto: 'Contacto', soloEscritorio: true },
];
<!-- dentro de .cab__fila, después del nav: -->
<div class="cab__der"><Hora />{ruta !== '/v3/contacto/' && <a class="boton boton--claro cab__cta" href="/v3/contacto/">Pedir la revisión</a>}</div>
<!-- el li de Contacto lleva class="cab__nav-contacto" cuando soloEscritorio -->
```
`aria-current` como hoy (`page` en la página exacta, `true` en la sección: Soluciones dentro de `/v3/servicios/…`, Trabajo dentro de un caso, Blog dentro de un artículo). **El botón no lleva `aria-current`** (es una acción) y **no se dibuja en `/v3/contacto/`**: ahí está el formulario.

**El botón es el `boton--claro` de siempre** (mono 11, 44 de alto, radio 4; estados de `spec-visual.md` §4.1: gris al pasar, `#D0D0D0` apretado, contorno blanco de 2 px a 3 px al enfocar). Por qué claro y no de placa: sobre la placa del encabezado plegado (`#141414`) un botón de placa desaparece, y un solo estilo en todos los estados evita una segunda regla. Mide **150 × 44**; dentro de la placa de 48 deja 2 px arriba y abajo (se ve bien en la captura; no se achica: 44 es el área de toque).

```css
/* E13 · encabezado */
.a-body .cab__der { margin-left: auto; display: flex; align-items: center; gap: 40px; }
.a-body .cab__der .cab__hora { margin-left: 0; }
.a-body .cab__cta { flex: none; }
@media (min-width: 834px) and (max-width: 1193.98px) {
  .a-body .cab__hora { display: none; }                 /* la hora cede: es adorno y no cabe */
  .a-body .cab__nav ul { gap: 24px; }                   /* era 32 */
}
@media (max-width: 833.98px) {
  .a-body .cab__hora, .a-body .cab__nav-contacto { display: none; }   /* «Contacto»: el botón lleva al mismo destino */
  .a-body .cab { position: sticky; top: 0; }
  .a-body .cab__placa { display: block; position: absolute; inset: 8px var(--a-m) auto; height: 48px; border-radius: 4px;
                        background: var(--a-placa); opacity: 0; pointer-events: none; transition: opacity var(--a-color); }
  .a-body .cab--plegada .cab__placa { opacity: 1; }
  .a-body .cab--plegada .cab__fila { min-height: 64px; padding: 0 calc(var(--a-m) + 12px); flex-wrap: nowrap; align-items: center; }
  .a-body .cab--plegada .cab__nav { display: none; }
  .a-body .cab--plegada { margin-bottom: 26px; }        /* 90 − 64: plegarse no mueve la página */
}
```
Y en la regla de foco de §4.3: `html:has(body.a-body):has(:focus-visible) { scroll-padding-top: 80px }` **pierde su `@media (min-width: 834px)`** (el encabezado ahora es pegajoso en todos los anchos; los destinos ya llevan `scroll-margin-top: 88px`). `base.mjs` ya alterna `.cab--plegada` a 24 px de scroll en todos los anchos (comprobado a 390: `plegada: true` a 1000 px); el resorte de la placa sigue siendo solo desde 834.

### 3.3 · Qué se ve y qué se midió

| Ancho | Sin plegar | Plegado (al pasar 24 px de scroll) |
|---|---|---|
| ≥ 1194 | Logo, 6 ítems (nav de 498 px), hora, botón (150). A 1194: hora a 850–988, botón 1028–1178 | Placa de 48: nav 201–699, hora 838–976, botón 1016–1166 (límite 1166: **justo**; el hueco de 40 entre hora y botón es el que cede si algo crece) |
| 834 a 1193 | Logo, 6 ítems con 24 px entre ellos (418 px), botón; sin hora. A 834: nav 173–591, botón 668–818 | nav 185–603, botón 656–806, **hueco 53** |
| < 834 | **Fila 1:** logo + botón (150 × 44, a la derecha, en el lugar de la hora). **Fila 2:** 5 ítems (Soluciones, Método, Nosotros, Trabajo, Blog) con `space-between`. Alto 90, igual que hoy. Medido sin desborde a 320, 360, 390, 414, 600, 768 y 833 | **CTA persistente:** la fila 2 desaparece y queda la placa de 64 (placa de 48 a 8 del borde) con logo y botón, pegajosa. A 390 el botón queda en 212–362 × 10–54 en toda posición de scroll |

**Propuesta de CTA persistente en celular, y por qué esta.** La revisión midió dos cosas: el encabezado no queda fijo y el único enlace al formulario es un texto de 11 px. Lo que sigue arregla las dos con lo que el sistema ya tiene: el pliegue en placa (hoy solo ≥ 834) se extiende a todos los anchos, y el botón de la barra es el `boton--claro`. Descarté la barra inferior fija (la del caso) porque en la home compite con el aviso de cookies, que también vive abajo, y porque exigiría el script de `--a-alto-aviso` en todas las páginas; el cajón o el botón «Menú» porque la spec vigente (§2, lo común, 1) dijo que bajo 834 no hay botón Menú y no es lo que se pidió reabrir. Costo: 64 px de pantalla (7,6 % a 844) siempre ocupados al bajar; por eso la placa lleva solo logo y botón.

**Dos costuras que Javiera tiene que mirar:** (1) al plegarse bajo 834 desaparece la segunda fila, así que para llegar a «Método» desde mitad de página hay que volver arriba (hoy pasa lo mismo: el encabezado se va); (2) con el encabezado pegajoso, lo que reciba el foco bajo él se corrige con el `scroll-margin-top: 88px` de siempre y el `scroll-padding-top` de arriba (se mide con Tab hacia adelante y hacia atrás, también bajo 834).

### 3.4 · Pie (`Pie.astro`)

Sigue la fila de hoy (logo a 20, correo mono, hora). **Suma una segunda fila** `nav.pie-sitio__enlaces[aria-label="Pie"]` > `ul` con cuatro enlaces en `.rotulo` gris (blanco al pasar): **Chequeo gratis** (`/v3/diagnostico/`), **Política de privacidad** (`/privacidad/`), **LinkedIn ↗** (`https://www.linkedin.com/company/spindlelab/`) e **Instagram ↗** (`https://www.instagram.com/spindlelab.cl/`; flecha `Icono nombre="fuera"`, y `rel="noopener"`).

```css
.a-body .pie-sitio__enlaces { flex: 1 0 100%; }
.a-body .pie-sitio__enlaces ul { display: flex; flex-wrap: wrap; gap: 0 32px; }
.a-body .pie-sitio__enlaces a { display: inline-flex; align-items: center; gap: 4px; min-height: 32px; color: var(--a-gris); transition: color var(--a-color); }
.a-body .pie-sitio__enlaces a:hover { color: var(--a-blanco); }
@media (max-width: 833.98px), (pointer: coarse) { .a-body .pie-sitio__enlaces a { min-height: 44px; } }
```
**Por qué se suma (y no es relleno):** (a) el pie de hoy no enlaza la política de privacidad (solo el aviso de cookies la nombra) y el v2 que reemplaza sí; **el chequeo de Verifica y Cumple busca justo eso en un sitio, y un chequeo público se corre sobre nosotros** (memoria «un instrumento público se voltea»); (b) LinkedIn e Instagram son el `sameAs` del JSON-LD y estaban en el pie del v2; (c) el chequeo sale de la portada y sin un enlace fijo se vuelve difícil de encontrar. `consent-banner.js` cuelga el botón «Cookies» junto al enlace de privacidad (así quedó medido), como en el v2. Medido: el pie suma 42 px a 1440 y 112 a 390. **Abierto para Ramón:** `/privacidad/` no tiene versión v3 (brief §3): el enlace lleva a la página publicada con el diseño anterior.

---

## 4 · «Lo que puedes revisar antes de contratar» (sección 6)

Reemplaza la cinta, el índice corto y «Cada pieza, con un dato medido». **Una sola lista de cinco filas con la forma de las fases** (`.fase`: título a la izquierda, contenido a la derecha, línea de sección entre filas), dentro de `.int-sec__cuerpo--ancho` (c5–c16): los cinco puntos son pruebas del mismo orden y se leen como lista; dos de ellos traen su medio. Se descartó tomar `.prueba__fila` para los medios y `.int-lista` para el texto: las líneas de las dos miden ancho distinto (c5–c12 contra c1–c16) y la sección se veía partida en dos.

| Fila | Título (`h3.t-fase`) | Contenido (`.fase__der`) | Medio |
|---|---|---|---|
| 1 | Precios publicados | `p.cuerpo` + `p.chico > a.subrayado` «Ver los precios» → `/v3/servicios/` | ninguno |
| 2 | Método escrito | ídem, «Leer el método» → `/v3/metodo/` | ninguno |
| 3 | Chequeo abierto | ídem, «Hacer el chequeo» → `/v3/diagnostico/` | ninguno |
| 4 | Probado primero en lo nuestro | `p.cuerpo` + medio + enlace «Verifica y Cumple ↗» → `https://verifica.spindlelab.cl/` | **`verifica-y-cumple-12-169`** (`public/v3/medios/`, 1600×900, 60 kB; la sección «Las 12 cosas…» de verifica.spindlelab.cl) |
| 5 | Un caso real: Bernardo Combeau | `p.cuerpo` («Fotógrafo. Construimos su sitio…, no de crecimiento de ventas») + medio + «Ver el caso» → `/v3/trabajo/combeau/` | **`combeau-fotografia-169`** (1600×900, 46 kB; la portada de su sitio) |

Cierre de la lista: `p.chico.int-lista__pie > a.corchete` «[ Todo el trabajo ] (2)» → `/v3/trabajo/` (el único corchete de la página; el 2 es el conteo verdadero de `/trabajo/`).

- **Medios:** `Imagen` con `clase="p-169"` (radio 6, plano, ancho de la columna: 747 px a 1440), `loading="lazy"`, el `alt` de `medios.json` tal cual (ninguno nombra medidas de Combeau: spec §6.10). **No son enlaces** (el enlace es el de texto): sin círculo de cursor y sin velo. Entre el `p.cuerpo` y el enlace, 16 px (el `gap` de `.fase__der`). **Ningún medio nuevo.** Ninguno de los dos lleva persona generada a la vista, así que sin pie.
- **Campo:** `verifica-y-cumple-12-169` es campo de color (84 %, `e12/spec/datos/campo-medios.json`). Área a 1440: 747 × 420 sobre 1440 × 6584 = **3,3 %** de la página (techo de la home, 20 %); campos seguidos, **1** (techo, 3). Es el único campo de la home: el techo de §3.4 pasa a decir «solo en la sección 6».
- **Título largo:** «Un caso real: Bernardo Combeau» baja a dos líneas en la columna de título (301 px a 1440). Si Clara lo acorta («Un caso real»), el nombre pasa al primer renglón del contenido.
- **Se retira del build** (brief §5): `public/v3/cinta/` (1.952 kB), `public/v3/trabajo/{praxi,sesenta,ocelo,doceavo,tonela}/` (3.320 + 4.016 + 3.208 + 2.032 + 3.400 kB) y, en `public/v3/medios/` y `archivo/medios.json`, `praxi-45`, `praxi-43`, `praxi-numeros-169`, `sesenta-45`, `sesenta-home-169`, `ocelo-43`, `doceavo-53`, `tonela-45` (≈ 240 kB) y `combeau-galeria-169` (45 kB, solo la usaba la home). `public/v3` pasa de **26,9 MB a ≈ 8,6 MB** (`du`, antes y después). Siguen: los de Combeau, `verifica-y-cumple-*` (los usan `/trabajo/` y `desarrollo-web`), `chequeo-239/-43`, `ramon-vallejos-34` y `portada/`. `verifica-y-cumple-239` y `spindlelab-privacidad-53` solo aparecen en `medios.json` / el muro de `/trabajo/` que se recorta: Diego los borra si el `grep` no los encuentra en uso.

---

## 5 · Un solo dorado por pieza

La regla de marca (manual §06, «el dorado aparece una vez») está **en revisión desde el 16-oct** y A · Archivo no tiene token de oro: `spec-visual.md` §1.1, «Ningún color más. Ni el oro `#C9A227`», y §6.1. En la home nueva el dorado es **uno, y vive en la portada**: el hilo de oro del video (la luz ámbar que cruza el cuadro). Nada de la interfaz lo lleva: el wordmark es blanco (El huso), los botones son blanco y placa, las líneas son grises.

Medido (píxeles de tono 30–60°, S ≥ 0,45, V ≥ 0,45): el póster de la portada **3,6 %**; el video, de 0,13 a 3,85 % por cuadro (mediana 0,91 %); `combeau-fotografia-169` **0,0 %**; `verifica-y-cumple-12-169` **0,0 %**; `ramon-vallejos-34` **0,0 %**. `archivo.css` no contiene `#c9a227` ni otro tono de esa familia. Reglas que no cambian y que Javiera cuenta: el hilo **no** va en un marco de trabajo, en el índice, en un caso ni en la imagen al compartir (§6.8); ningún medio de la home puede traer dorado; **cada vez que se cambie un medio de la sección 6 se vuelve a medir**. Si Ramón decide un día un token de oro para la interfaz, esta sección se reescribe: no se improvisa un punto dorado en un enlace.

---

## 6 · Criterios medibles para que Javiera audite

Medir sobre el `dist/` construido (no sobre el texto), con y sin el aviso de cookies donde se dice. «Hoy» es el prototipo.

| # | Qué se mide | Cómo | Umbral | Hoy |
|---|---|---|---|---|
| 1 | **Botón principal en la primera pantalla** (`#portada-cta`, entero, sin nada encima: `elementsFromPoint` en su centro y esquinas) | 360×640, 360×800, 375×667, 390×844, 414×896, 768×1024, 834×1112, 1024×768, 1194×834, 1440×900, 1920×1080; **con** el aviso abierto (sin `spindlelab_consent`) **y** sin él | Fondo del botón ≤ borde de arriba del aviso (o ≤ alto de la ventana sin aviso). Excepción dicha: 320×568 con aviso | Margen con aviso: 7 (30 con `28svh`) a 360×640, 45 a 375×667, 52 a 834×1112, **53 a 1024×768**, 55 a 1440×900 |
| 2 | **Contraste del texto de la portada** sobre el video | `portada.mjs` (con `#portada-cta`) + `contraste-portada.py`, los 121 cuadros | 0 líneas bajo 4,5:1; contorno del botón ≥ 3:1 | Peor 5,37:1; contorno ≥ 15,8:1 |
| 3 | **Un `h1`** y jerarquía sin saltos | DOM: 1 `h1` (la portada), 8 `h2` (uno por sección 2 a 9), `h3` dentro de filas, sin h1 → h3 | 1 y 8; ningún salto | 1 y 8 |
| 4 | **`FAQPage`** | Parsear los `<script type="application/ld+json">` de `/v3/`; comparar con los `.pregunta` visibles | 5 preguntas; cada `name` y `text` igual al texto visible, carácter por carácter (con `faqHtml` si hay enlaces) | n/a (lo escribe Simón) |
| 5 | **Altura de la home** | `scrollHeight` tras recorrerla (lazy cargado) | ≤ 7.000 a 1440 · ≤ 7.300 a 1024 · ≤ 8.800 a 768 · ≤ 8.200 a 390 · y siempre menor que la home de hoy (8.365 a 1440, 8.540 a 390) | 6.584 · 6.794 · 8.374 · 7.803 |
| 6 | **Enlace al botón principal desde la barra** | En cada ruta salvo `/v3/contacto/`: `a.cab__cta[href="/v3/contacto/"]` visible, plegado y sin plegar, a 360, 390, 768, 834, 1024, 1194 y 1440. Bajo 834 plegado: caja del botón dentro de los 64 px de arriba a cualquier scroll (400, 2000, 5000 a 390×844) | Presente y entero; 44 de alto; sin desborde en la fila (borde derecho ≤ borde del contenido) | Medido: 10–54 de alto en todos |
| 7 | **Un solo destino de acción principal** | En la home, todo `a.boton--claro` (salvo el de «Saltar al contenido») | Todos a `/v3/contacto/` (barra, portada, cierre) | 3 de 3 |
| 8 | **Foco visible y no tapado** | Tab hacia adelante y hacia atrás por toda la home a 390×844 y 1440×900: cada foco con contorno blanco de 2 px (≥ 3:1 contra su fondo) y su caja fuera de la franja de 64 px del encabezado pegajoso y del aviso | 0 enfocados tapados | por medir al construir |
| 9 | **Sin desborde** | `scrollWidth == innerWidth` y ningún elemento con `right > innerWidth` (con `overflow-x: clip` quitado) a 320, 360, 390, 768, 834, 1024, 1194, 1440, 1920 | 0 | 0 en los 9 |
| 10 | **Peso** | Respuestas de red sumadas, con movimiento permitido, recorriendo la página, a 1440 | ≤ 1,6 MB recorrida y ≤ 1,4 MB solo la primera carga; ≤ 0,95 MB a 390 sin recorrer. **El brief pide < 1,5 MB: con el video completo de la portada (1.002 kB) la página entera da 1.543 kB; ver sección 10, punto 2** | 1.384 kB primera carga · 1.543 kB recorrida · 542 kB sin movimiento · 756 kB a 390. La home de hoy: 1.470 · 2.759 · 803 |
| 11 | **Campos de color** | `campo-medios.py` (`es_campo`) sobre los medios de la home; área sobre la página a 1440; seguidos | ≤ 20 % de la página; seguidos ≤ 3; fuera de la sección 6, 0 | 3,3 %; 1 |
| 12 | **Un solo dorado** | La medición de la sección 5 sobre cada medio y un `grep` de tonos 30–60° en `archivo.css` | Solo el hilo de la portada; 0 % en los demás | 3,6 % y 0 % |
| 13 | **Orden de la portada bajo 834** | Cajas a 390×844 y 360×640: rótulo < h1 < `#portada-cta` < microcopy < enlace < entradilla; y el DOM en orden rótulo, h1, entradilla, acción | Los dos órdenes | cumple |
| 14 | **Retirado** | `dist/` sin `v3/cinta/`, sin `cinta.mjs` en el empaquetado, sin `#chq-*` ni `v3-chequeo.js` en la home, sin los medios de la sección 4; `public/v3` antes y después | ≤ 9 MB | 26,9 → ≈ 8,6 MB |
| 15 | **Nueve secciones en orden** | Los `h1`/`h2` de `main > section` | Los de la sección 1 de esta spec, en ese orden | 9 de 9 |
| 16 | **Movimiento reducido** | `prefers-reduced-motion: reduce`: el video no arranca, la pausa dice «Seguir el video», la placa del encabezado cambia sin resorte | Cumple | por medir al construir |
| 17 | **Áreas de toque** | Bajo 834: botón del encabezado, ítems del nav, enlaces del pie y de las filas | ≥ 44 × 44 | por medir al construir |

---

## 7 · Lo que esta spec prohíbe (se suma a `spec-visual.md` §6)

1. Una segunda acción con forma de botón en la portada o en las secciones 2 a 8 (`boton--claro` o `boton--placa` a otro destino que no sea «Conocer más» en 7). El chequeo es un enlace, no un campo ni un botón.
2. Un campo de chequeo, o cualquier `#chq-*`, en la home.
3. Tarjetas, cajas o fondos de placa en las filas de las secciones 4, 5, 6 y 8 (líneas arriba, nunca alrededor).
4. Un medio en la sección 6 que sea un enlace con círculo de cursor, o una tercera imagen, o uno que no sea de Combeau o de Verifica y Cumple.
5. Más de un corchete en la página; más de seis rótulos mono de sección.
6. Un token, una letra, un radio o un resorte que no estén en `spec-visual.md` §1; un color en el botón de la barra.
7. Plegar el encabezado con otra animación que la del resorte «entrada» (desde 834) o la de 167 ms lineal (bajo 834).
8. Ocultar bajo 834 un ítem del menú que no sea «Contacto».
9. Resolver en el chat un caso que esta spec no cubre: se pregunta y se escribe en la sección 11.

---

## 8 · Lo medido y cómo repetirlo

Todo en el scratchpad de la sesión (`/private/tmp/claude-501/-Users-ramon-Library-Mobile-Documents-com-apple-CloudDocs-SPINDLELAB--claude-worktrees-gifted-spence-cf5936/4ac6c118-bcaa-47d9-8343-315e8e616ff3/scratchpad/lucia/`; se borra al reiniciar: lo que importa está en esta spec):

| Qué | Archivo |
|---|---|
| Prototipo (genera las páginas de prueba sobre el `dist/`) | `proto.mjs`, `gen.mjs` |
| Encabezado a 17 anchos, plegado y sin plegar | `cab.mjs`, `scroll.mjs` |
| Primera pantalla con y sin aviso | `cap.mjs`, `hoy.mjs`, `svh.mjs` |
| Contraste de la portada, copia adaptada de `e12/spec/herramientas/portada.mjs` | `portada-lucia.mjs` + `contraste-portada.py` sin cambios; salidas en `contraste-a/` y `contraste-b/` |
| Alturas y desborde, peso | `altos.mjs`, `full.mjs`, `peso.mjs` |
| Capturas de las dos variantes con el aviso abierto | `capt/ha/` (H-A, 12 tamaños), `capt/hero/` (H-B, 5 tamaños), `capt/h-scroll-390.jpg` y `capt/h-scroll-1440.jpg` (placa plegada), `capt/f1440-full.jpg`, `capt/f390-full.jpg`, `capt/m834.jpg` (la home entera) |

Lo que **no** medí: el contraste de H-B bajo el nuevo texto de Clara (se midió con el texto del v2 publicado), el `FAQPage` (lo escribe Simón), el foco con Tab (hay que construirlo), el chequeo propio de la home (criterio 9 del brief) y la lectura en frío.

---

## 9 · Desvíos respecto de `spec-visual.md` (cada uno con su porqué)

1. **§2.1 fila 1:** la acción de la portada es la revisión, no el chequeo (brief §2, compuerta 1, criterio 10 de E12). `.portada-v__chequeo` pasa a `.portada-v__accion`.
2. **§2.1 filas 2 a 7:** las siete secciones de E12 se reemplazan por las nueve del brief §4.
3. **§3.2 (la cinta):** no existe; **§3.3** pierde los slots de la cinta, el índice corto y las pruebas.
4. **§3.4, techo de la home:** los campos solo en la sección 6 (antes: cinta, índice corto y pruebas). El techo (20 %, seguidos 3) no cambia.
5. **§5.5:** el chequeo deja de ser el «sandbox a la vista» de la home; queda el de `/v3/diagnostico/`.
6. **§2, lo común, 1:** el menú pasa de cinco a seis ítems y suma el botón; la hora cede entre 834 y 1193; **bajo 834 el encabezado es pegajoso, se pliega en placa y el menú pierde «Contacto»**. Antes: bajo 834 90 px, no pegajoso, sin botón.
7. **§2, lo común, 2:** el pie suma la fila de enlaces.
8. **§4.3, foco:** el `scroll-padding-top` de 80 vale en todos los anchos.
9. **§3.1 / `.portada-v__medio`:** `max-height: 28svh` bajo 834 (sección 2).

---

## 10 · Abierto para Ramón

1. **Elegir la variante del hero** (H-A recomendada, H-B alternativa): capturas en `capt/ha/` y `capt/hero/`. Es lo único de la obra que reabre algo aprobado.
2. **El criterio 8 del brief («la home carga menos de 1,5 MB a 1440»):** medido con el video completo de la portada da 1.384 kB en la primera carga y **1.543 kB** al recorrerla entera (43 kB sobre el umbral; la home de hoy: 2.759 kB). Sin el video, 542 kB. Propongo leerlo como «≤ 1,6 MB recorrida» (criterio 10 de arriba) o «sin contar el video de la portada»; Mauro decide, no cambia el diseño.
3. **«Contacto» sale del menú bajo 834** (el botón lleva al mismo destino y seis ítems no caben a 360). Si Ramón prefiere conservarlo, el botón pasa a la fila 2 y se pierde la persistencia.
4. **Encabezado pegajoso en celular** (cambia en todas las rutas, también los casos): 64 px de pantalla ocupados al bajar.
5. **Pie con la política de privacidad, LinkedIn e Instagram** (sección 3.4), y que `/privacidad/` abre con el diseño anterior.
6. **El botón del cierre** dice «Enviar la dirección de mi sitio» en el texto publicado y el de la portada «Pedir la revisión de una página»: una sola acción con dos etiquetas. Es de Clara; lo dejo anotado.
7. **A 360×640 con el aviso abierto** la holgura del botón es de 7 px sin el `28svh` y 30 con él; **a 320×568 queda bajo el aviso** (fuera de los anchos de la obra).

## 11 · Historial de correcciones

| Fecha | Qué | Regla o preferencia | Quién |
|---|---|---|---|
| | | | |
