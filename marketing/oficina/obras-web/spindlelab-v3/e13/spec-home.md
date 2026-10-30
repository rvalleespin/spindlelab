# Spec de la home · obra E13 · solo lo que cambia

**30-oct-2026 · Lucía: lo que Ramón eligió el 30-oct** (el titular «En redes arriendas.», el recuadro «Hablemos de tu sitio», el botón principal y el del encabezado en **amarillo lleno `#FFE800`**, la sección 2 nueva en dos columnas y el logo opción 2) **está en la sección 12**, medido. Donde las secciones 1 a 11 digan otra cosa, manda la 12; lo que cambió en ellas va marcado «(30-oct)». El token y sus estados viven en `spec-visual.md` §1.1 y §4.1.

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
| 2 | ~~Dónde puede caerse una consulta~~ **(30-oct) Todo lo que haces para vender termina en tu sitio**: §12.2 | `.seccion.reticula` > `.int-sec__cab` (`h2.t-declaracion`) + `.int-sec__cuerpo` (`p.cuerpo.caja`, **`.int-par`** con dos `h3.t-titulo` + dos `ul.int-lista`, `p.cuerpo.caja`) | h2 c1–c4 (pegajoso a 88); párrafo, las dos listas lado a lado (c5–c8 \| c9–c12) y el cierre | h2 arriba; las dos listas lado a lado (6 c \| 6 c) | todo apilado, primero «En redes» | **627 · 828 · 904** (26-oct: 233 · 279 · 312) |
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

**(30-oct) El contenido y la clase del botón cambian (§12.1):** `p.rotulo` «Sitios web a medida y marketing con IA» · `h1` «*En redes arriendas.* Tu sitio es lo único que es tuyo.» · `p.cuerpo.entradilla` · `.portada-v__accion`: **`a.boton.boton--accion#portada-cta`** «Hablemos de tu sitio» + flecha, a `/contacto/` · `p.chico` (microcopy) · `p.chico > a` «Ver cómo hacemos un sitio y cuánto cuesta», a `/servicios/desarrollo-web/` (sale el enlace al chequeo de la portada). La composición H-A no cambia. Lo que sigue en este párrafo es el contenido del 26-oct.

**Contenido, en este orden en el DOM (26-oct):** `p.rotulo` «Marketing y crecimiento con IA para empresas que ya venden» · `h1.t-portada` «*Te llegan consultas.* Veamos dónde se cae el resto.» (tinta, gris) · `p.cuerpo.entradilla` (el subtítulo) · `.portada-v__accion`: **`a.boton.boton--claro#portada-cta`** «Pedir la revisión de una página» + flecha, a `/v3/contacto/` · `p.chico` (el microcopy: qué recibe y «gratis, un día hábil») · `p.chico > a` (hereda el subrayado de `.chico a`) «Chequear mi sitio ahora, sin registro» a `/v3/diagnostico/`. El microcopy va **pegado bajo el botón** porque es su promesa; el enlace va después porque es otra acción (en el v2 publicado el enlace iba entre los dos: se cambia de orden y se anota en `desvios`).

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

**(30-oct) El botón es el de acción, `boton--accion`, y dice «Hablemos»** (`comun.nav.revision`, Clara): `#FFE800` lleno con el texto en `#060606`, `#E9D400` al pasar, `#D4C100` apretado, contorno blanco de 2 px a 3 px al enfocar (`spec-visual.md` §1.1 y §4.1). Contra la placa del encabezado plegado da 14,73:1 (al pasar 12,18, apretado 10,02); contra el lienzo, 16,20. Mide **87,5 × 44** (antes, 150 × 44): la fila gana 62 px y nada se mueve de lugar, porque el botón va alineado a la derecha (§12.3). En el `<a>` de arriba, `boton--claro` pasa a `boton--accion`.

**(26-oct) El botón era el `boton--claro` de siempre** (mono 11, 44 de alto, radio 4; estados de `spec-visual.md` §4.1: gris al pasar, `#D0D0D0` apretado, contorno blanco de 2 px a 3 px al enfocar). Por qué claro y no de placa: sobre la placa del encabezado plegado (`#141414`) un botón de placa desaparece, y un solo estilo en todos los estados evita una segunda regla. Mide **150 × 44**; dentro de la placa de 48 deja 2 px arriba y abajo (se ve bien en la captura; no se achica: 44 es el área de toque).

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

La regla de marca (manual §06, «el dorado aparece una vez») está **en revisión desde el 16-oct** y A · Archivo no tiene token de oro: `spec-visual.md` §1.1, «Ningún color más. Ni el oro `#C9A227`», y §6.1. En la home nueva el dorado es **uno, y vive en la portada**: el hilo de oro del video (la luz ámbar que cruza el cuadro). Nada de la interfaz lo lleva: el wordmark es blanco (El huso), los botones son blanco y placa (30-oct: y los dos de acción, amarillos, que no son oro: abajo), las líneas son grises.

**(30-oct) El amarillo de acción no es un dorado, y la medición los separa.** `#FFE800` cae dentro de la ventana de abajo (tono HSV 54,6°), así que la regla se precisa sin moverla: el «un solo dorado» se cuenta en los **medios** como siempre, y en `archivo.css` se buscan tonos de 30 a 60° **fuera de los tres valores de `--a-accion`** (`#ffe800`, `#e9d400`, `#d4c100`), que tienen rol propio (`spec-visual.md` §1.1). Medido con `e13/herramientas/accion-amarillo.py` sobre los 74.640 píxeles dorados del póster (3,6 %): el oro del hilo va de 32,9 a 41,5° (percentiles 5 y 95; mediana 37,4°, máximo 52,0°, **ninguno sobre 52°**), su color mediano es `#B7883F` y está a ΔE 0,284 (OKLab) del amarillo; en OKLCH, 77,7° contra 102,2°. Son dos colores que no se confunden, y conviven en la primera pantalla de la home: el hilo en el video, el amarillo en los dos botones.

Medido (píxeles de tono 30–60°, S ≥ 0,45, V ≥ 0,45): el póster de la portada **3,6 %**; el video, de 0,13 a 3,85 % por cuadro (mediana 0,91 %); `combeau-fotografia-169` **0,0 %**; `verifica-y-cumple-12-169` **0,0 %**; `ramon-vallejos-34` **0,0 %**. `archivo.css` no contiene `#c9a227` ni otro tono de esa familia. Reglas que no cambian y que Javiera cuenta: el hilo **no** va en un marco de trabajo, en el índice, en un caso ni en la imagen al compartir (§6.8); ningún medio de la home puede traer dorado; **cada vez que se cambie un medio de la sección 6 se vuelve a medir**. Si Ramón decide un día un token de oro para la interfaz, esta sección se reescribe: no se improvisa un punto dorado en un enlace.

---

## 6 · Criterios medibles para que Javiera audite

Medir sobre el `dist/` construido (no sobre el texto), con y sin el aviso de cookies donde se dice. «Hoy» es el prototipo.

| # | Qué se mide | Cómo | Umbral | Hoy |
|---|---|---|---|---|
| 1 | **Botón principal en la primera pantalla** (`#portada-cta`, entero, sin nada encima: `elementsFromPoint` en su centro y esquinas) | 360×640, 360×800, 375×667, 390×844, 414×896, 768×1024, 834×1112, 1024×768, 1194×834, 1440×900, 1920×1080; **con** el aviso abierto (sin `spindlelab_consent`) **y** sin él | Fondo del botón ≤ borde de arriba del aviso (o ≤ alto de la ventana sin aviso). Excepción dicha: 320×568 con aviso | 26-oct, margen con aviso: 7 (30 con `28svh`) a 360×640, 45 a 375×667, 52 a 834×1112, **53 a 1024×768**, 55 a 1440×900. **30-oct** (texto y botón nuevos, `portada-30oct.mjs`): 44,5 · **181,1 a 360×800** · 82,8 · **227,2 a 390×844** · 264,7 · 231,5 · 51,6 · 52,6 · 72,1 · 54,6 · 35,7 (en el orden de la columna «Cómo»); 0 de 5 puntos tapados; 320×568, −7,4 (§12.1) |
| 2 | **Contraste del texto de la portada** sobre el video | `portada.mjs` (con `#portada-cta`) + `contraste-portada.py`, los 121 cuadros. **30-oct:** `e13/herramientas/portada-30oct.mjs` + el mismo `contraste-portada.py` | 0 líneas bajo 4,5:1; contorno del botón ≥ 3:1 (30-oct: **el relleno amarillo contra el anillo de 3 px que lo rodea**, cuadro por cuadro) | 26-oct: peor 5,37:1; contorno ≥ 15,8:1. **30-oct: peor 5,35:1** (el rótulo a 1024×768); el amarillo contra su contorno, **12,80 a 13,27:1** desde 834 y 16,20 bajo 834 |
| 3 | **Un `h1`** y jerarquía sin saltos | DOM: 1 `h1` (la portada), 8 `h2` (uno por sección 2 a 9), `h3` dentro de filas, sin h1 → h3 | 1 y 8; ningún salto | 1 y 8 |
| 4 | **`FAQPage`** | Parsear los `<script type="application/ld+json">` de `/v3/`; comparar con los `.pregunta` visibles | 5 preguntas (**30-oct: 6**, con «¿Por qué un sitio, si ya tengo Instagram?» primera); cada `name` y `text` igual al texto visible, carácter por carácter (con `faqHtml` si hay enlaces) | n/a (lo escribe Simón) |
| 5 | **Altura de la home** | `scrollHeight` tras recorrerla (lazy cargado) | ~~≤ 7.000 a 1440 · ≤ 7.300 a 1024 · ≤ 8.800 a 768 · ≤ 8.200 a 390 · y siempre menor que la home de hoy (8.365 a 1440, 8.540 a 390)~~ **30-oct: ≤ 7.800 a 1440 · ≤ 7.800 a 1024 · ≤ 9.700 a 768 · ≤ 9.300 a 390** (la proyección de abajo más 300 px, redondeado a la centena; la cláusula «menor que la home de E12» se cae: la sección 2 sola suma 608 px a 390) | 26-oct: 6.584 · 6.794 · 8.374 · 7.803. **30-oct** (`alto-home*.json`): hoy 6.624 · 6.713 · 8.412 · 7.940; con la portada y la sección 2 nuevas, 7.023 · 7.086 · 9.012 · 8.548; **proyección** (además la pregunta nueva, el párrafo de quien parte y los cuatro párrafos base de «Quién está detrás»), 7.409 · 7.422 · 9.380 · 8.956 |
| 6 | **Enlace al botón principal desde la barra** | En cada ruta salvo `/v3/contacto/`: `a.cab__cta[href="/v3/contacto/"]` visible, plegado y sin plegar, a 360, 390, 768, 834, 1024, 1194 y 1440. Bajo 834 plegado: caja del botón dentro de los 64 px de arriba a cualquier scroll (400, 2000, 5000 a 390×844) | Presente y entero; 44 de alto; sin desborde en la fila (borde derecho ≤ borde del contenido) | Medido: 10–54 de alto en todos |
| 7 | **Un solo destino de acción principal** | En la home, todo `a.boton--claro` (salvo el de «Saltar al contenido») **y todo `a.boton--accion`** (30-oct) | Todos a `/contacto/` (barra, portada, cierre): **2 de acción** (barra y portada) y 1 claro (el cierre) | 3 de 3 |
| 8 | **Foco visible y no tapado** | Tab hacia adelante y hacia atrás por toda la home a 390×844 y 1440×900: cada foco con contorno blanco de 2 px (≥ 3:1 contra su fondo) y su caja fuera de la franja de 64 px del encabezado pegajoso y del aviso | 0 enfocados tapados | por medir al construir |
| 9 | **Sin desborde** | `scrollWidth == innerWidth` y ningún elemento con `right > innerWidth` (con `overflow-x: clip` quitado) a 320, 360, 390, 768, 834, 1024, 1194, 1440, 1920 | 0 | 0 en los 9 |
| 10 | **Peso** | Respuestas de red sumadas, con movimiento permitido, recorriendo la página, a 1440 | ≤ 1,6 MB recorrida y ≤ 1,4 MB solo la primera carga; ≤ 0,95 MB a 390 sin recorrer. **El brief pide < 1,5 MB: con el video completo de la portada (1.002 kB) la página entera da 1.543 kB; ver sección 10, punto 2** | 1.384 kB primera carga · 1.543 kB recorrida · 542 kB sin movimiento · 756 kB a 390. La home de hoy: 1.470 · 2.759 · 803. **30-oct** (`e13/herramientas/peso-30oct.mjs`, calibrada contra la de Javiera: da 1.399,0 sobre `9039b521` y 1.402,1 sobre `a84a1381`, sus mismos números): con el texto y el amarillo del 30-oct, 1.402,1, **sobre el tope** (acta de QA del 30-oct, mayor 1); **sin las hojas `inter.css` y `manrope.css`** del `<head>` de A, que ninguna página de A usa (`letras-sin-uso-30oct.mjs`: 0 de 44 pasadas bajan o dibujan Inter o Manrope), **1.398,9 primera carga · 1.561,7 recorrida · 755,6 a 390**. El techo no se sube. **Queda 1,1 kB de margen:** cualquier texto nuevo en la home lo puede cruzar otra vez. Si hace falta más, lo siguiente que pesa sin aportar es el logo, que va dos veces en línea (encabezado y pie, 4.251 bytes cada uno): un `<symbol>` y dos `<use>` ahorrarían unos 4 kB |
| 11 | **Campos de color** | `campo-medios.py` (`es_campo`) sobre los medios de la home; área sobre la página a 1440; seguidos | ≤ 20 % de la página; seguidos ≤ 3; fuera de la sección 6, 0 | 3,3 %; 1 |
| 12 | **Un solo dorado** | La medición de la sección 5 sobre cada medio y un `grep` de tonos 30–60° en `archivo.css` (**30-oct: fuera de `#ffe800`, `#e9d400` y `#d4c100`**, los tres de `--a-accion`, sección 5) | Solo el hilo de la portada; 0 % en los demás; en `archivo.css`, ningún tono 30–60° que no sea uno de esos tres | 3,6 % y 0 % |
| 13 | **Orden de la portada bajo 834** | Cajas a 390×844 y 360×640: rótulo < h1 < `#portada-cta` < microcopy < enlace < entradilla; y el DOM en orden rótulo, h1, entradilla, acción | Los dos órdenes | cumple |
| 14 | **Retirado** | `dist/` sin `v3/cinta/`, sin `cinta.mjs` en el empaquetado, sin `#chq-*` ni `v3-chequeo.js` en la home, sin los medios de la sección 4; `public/v3` antes y después | ≤ 9 MB | 26,9 → ≈ 8,6 MB |
| 15 | **Nueve secciones en orden** | Los `h1`/`h2` de `main > section` | Los de la sección 1 de esta spec, en ese orden | 9 de 9 |
| 16 | **Movimiento reducido** | `prefers-reduced-motion: reduce`: el video no arranca, la pausa dice «Seguir el video», la placa del encabezado cambia sin resorte | Cumple | por medir al construir |
| 17 | **Áreas de toque** | Bajo 834: botón del encabezado, ítems del nav, enlaces del pie y de las filas | ≥ 44 × 44 | por medir al construir |
| 18 | **(30-oct) Dónde está el amarillo** | En las 22 rutas, a 390 y 1440: todo elemento cuyo `background-color`, `color`, `border-*-color`, `outline-color`, `fill` o `stroke` calculado sea `#FFE800`, `#E9D400` o `#D4C100` (o esté a ΔE OKLab < 0,05 de ellos). Y con `:hover` y `:active` forzados en los dos botones (`page.hover`, `mouse.down`), su fondo | Home: **2** (`#portada-cta`, `.cab__cta`), y nada más; las demás rutas: **1** (`.cab__cta`); `/contacto/`: **0**. Su texto y su flecha, `#060606`. Al pasar, `#E9D400`; apretado, `#D4C100` | 30-oct, inyectado: los dos botones dan `rgb(255, 232, 0)` con texto `rgb(6, 6, 6)` en los 13 tamaños; el barrido de toda la página y de las 22 rutas se corre sobre el build |
| 19 | **(30-oct) La sección 2** | `portada-30oct.mjs`, parte 3 (`seccion-2.json`), sobre el build | Desde 834: dos columnas; las filas que comparten número empiezan en la misma `y` (± 0,5 px); entre el texto de la izquierda y la columna de la derecha, ≥ 32 px. Bajo 834: apiladas, «En redes» primero. 0 desborde de 320 a 1920. Ninguna caja, fondo ni borde alrededor | 30-oct, inyectado: 0 px de desfase en las tres filas compartidas de 834 a 1920; entre textos 42,4 (1194) a 112,6 (834); 0 desborde |
| 20 | **(30-oct) El foco del botón de acción** | En los dos botones, enfocados con Tab: `outline` calculado | 2 px blanco a 3 px (`outline-offset` **nunca menos de 3** en este botón: el blanco contra el amarillo es 1,25:1). Contra lo que rodea al botón ≥ 3:1 | 30-oct: 2 px blanco a 3 px; 16,01 a 20,26:1. En el encabezado plegado, los lados del contorno caen en la placa y el borde de arriba y el de abajo 3 px fuera de ella (§12.3) |
| 21 | **(30-oct) El logo, opción 2** | **(Corregido el 30-oct tras la QA, menor 4.)** El `d` y el `viewBox` de `Logo.astro` contra `e13/logo/logo-menu-linea.svg`, el corte menú de Bruno (ya no contra la elipse de la maqueta); `logo-i-disco.mjs <carpeta>`, que compara los dos y mide la columna de la i en el render (`spec-visual.md` §5.4) | Iguales carácter por carácter; a 20 y 24 px, a 1x y 2x, el disco con al menos una fila de cobertura ≥ 0,5 y al menos una fila limpia entre el disco y el asta. La herramienta sale con 1 si no | 30-oct, sobre lo construido (`medicion-30oct/logo-construido/`): **24 px a 1x, disco en 4 filas (0,25 · 1 · 1 · 0,44) y 1 limpia; 20 px a 1x, 3 filas (0,75 · 1 · 0,43) y 1 limpia**; a 2x, 6 y 5 filas, 3 limpias. Javiera, con su `logo.mjs` en otra caja, midió a 24 px y 1x 0,27 · 1 · 1 · 0,45 y 1 limpia |
| 22 | **(30-oct) El aire de «Quién está detrás»** | `quien-aire-30oct.mjs <url> <carpeta>`: entre cada `p.cuerpo` hijo de `.quien__txt`, el borde de abajo de uno contra el de arriba del siguiente, a 390 y 1440, en `/` y `/nosotros/` | **16 px** entre los párrafos de la biografía (el `gap` de la columna; `.quien__txt > .cuerpo + .cuerpo` sin margen), ± 0,5. Antes medía 32 (el `gap` más el 1em de `.cuerpo + .cuerpo`) y con cuatro párrafos se leía en bloques sueltos (acta de QA del 30-oct, menor 4) | 30-oct: **16 · 16 · 16 a 390 y a 1440** en la home; `/nosotros/` tiene un solo párrafo de bio. Alto de la home tras el cambio: 7.459 a 1440 y 9.012 a 390 (criterio 5) |

---

## 7 · Lo que esta spec prohíbe (se suma a `spec-visual.md` §6)

1. Una segunda acción con forma de botón en la portada o en las secciones 2 a 8 (`boton--claro` o `boton--placa` a otro destino que no sea «Conocer más» en 7). El chequeo es un enlace, no un campo ni un botón.
2. Un campo de chequeo, o cualquier `#chq-*`, en la home.
3. Tarjetas, cajas o fondos de placa en las filas de las secciones 4, 5, 6 y 8 (líneas arriba, nunca alrededor).
4. Un medio en la sección 6 que sea un enlace con círculo de cursor, o una tercera imagen, o uno que no sea de Combeau o de Verifica y Cumple.
5. Más de un corchete en la página; más de seis rótulos mono de sección.
6. Un token, una letra, un radio o un resorte que no estén en `spec-visual.md` §1; ~~un color en el botón de la barra~~ (30-oct: el botón de la barra es amarillo, `--a-accion`) **el amarillo en cualquier lugar que no sea `#portada-cta` o `.cab__cta`** (`spec-visual.md` §1.1, «Dónde no»).
7. Plegar el encabezado con otra animación que la del resorte «entrada» (desde 834) o la de 167 ms lineal (bajo 834).
8. Ocultar bajo 834 un ítem del menú que no sea «Contacto».
9. Resolver en el chat un caso que esta spec no cubre: se pregunta y se escribe en la sección 11.
10. (30-oct) El botón amarillo con contorno (borde y texto amarillos sobre el negro), un tercer botón amarillo (el del cierre se queda claro), el amarillo en un texto, un enlace, un fondo, un filete o el foco, y el texto blanco sobre el amarillo.
11. (30-oct) En la sección 2: filetes de una columna desfasados de los de la otra; una tabla, tarjetas, un fondo de placa o un borde alrededor de las listas; un rótulo mono sobre ellas; iconos de «sí» y «no» o colores para cada lado. Lo que separa los dos lados es el título y la columna, nada más.

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
10. **(30-oct) §1.1 y §6.1:** el amarillo de acción (`spec-visual.md` §0.3, punto 11, autorizado por Ramón). Arrastra los criterios 2, 7 y 12 y las prohibiciones 6 y 10 de esta spec.
11. **(30-oct) §1, fila 2:** la sección 2 es otra (§12.2) y suma **una clase de composición, `.int-par`** (con `.int-par__t` y `.int-par__lista`), sin token, letra, radio, resorte ni componente nuevo. Motivo: ninguna clase de A pone dos listas lado a lado con sus filas alineadas (`.glosario__lista` reparte una sola lista en dos columnas; `.datos-fase` tiene el tope de 493 px de la caja; `.fase` y `.pregunta` son 2:5 y 2:3, no mitades). Reusa `.int-lista`, `--a-linea`, `--a-g` y el `subgrid` que ya usa `.servicio`.
12. **(30-oct) §3.2:** el botón del encabezado pasa de claro a acción y dice «Hablemos».
13. **(30-oct) §6, criterio 5:** los techos de alto de la home suben (la sección 2 y el texto nuevo de Ramón) y se cae «menor que la home de E12».

---

## 10 · Abierto para Ramón

1. **Elegir la variante del hero** (H-A recomendada, H-B alternativa): capturas en `capt/ha/` y `capt/hero/`. Es lo único de la obra que reabre algo aprobado.
2. **El criterio 8 del brief («la home carga menos de 1,5 MB a 1440»):** medido con el video completo de la portada da 1.384 kB en la primera carga y **1.543 kB** al recorrerla entera (43 kB sobre el umbral; la home de hoy: 2.759 kB). Sin el video, 542 kB. Propongo leerlo como «≤ 1,6 MB recorrida» (criterio 10 de arriba) o «sin contar el video de la portada»; Mauro decide, no cambia el diseño.
3. **«Contacto» sale del menú bajo 834** (el botón lleva al mismo destino y seis ítems no caben a 360). Si Ramón prefiere conservarlo, el botón pasa a la fila 2 y se pierde la persistencia.
4. **Encabezado pegajoso en celular** (cambia en todas las rutas, también los casos): 64 px de pantalla ocupados al bajar.
5. **Pie con la política de privacidad, LinkedIn e Instagram** (sección 3.4), y que `/privacidad/` abre con el diseño anterior.
6. **El botón del cierre** dice «Enviar la dirección de mi sitio» en el texto publicado y el de la portada «Pedir la revisión de una página»: una sola acción con dos etiquetas. Es de Clara; lo dejo anotado.
7. **A 360×640 con el aviso abierto** la holgura del botón es de 7 px sin el `28svh` y 30 con él; **a 320×568 queda bajo el aviso** (fuera de los anchos de la obra).
8. **(30-oct) El favicon, el signo, los iconos, el avatar y los cortes grande y pequeño del logo** siguen siendo el huso con su tortera, el dibujo que la opción 2 le saca a la i (`spec-visual.md` §5.4). ¿Se redibujan con la i del disco (Bruno) o el huso se queda como signo suelto? Hasta que conteste, quedan como están.
9. **(30-oct) Los techos de alto de la home** (criterio 5) suben de 500 a 1.100 px según el ancho, sobre todo por la sección 2 (Ramón la eligió con sus dos listas y su cierre). Si Ramón quiere la home más corta, lo que más pesa es esa sección a 390 (904 px; la del 26-oct, 282).
10. **(30-oct) A 320×568 con el aviso abierto el botón amarillo queda 7,4 px bajo el aviso** (2 de 5 puntos tapados), como el 26-oct (21 px): fuera de los anchos de la obra; sin el aviso entra con 145 px.

## 11 · Historial de correcciones

| Fecha | Qué | Regla o preferencia | Quién |
|---|---|---|---|
| 30-oct | El botón principal de la portada y el del encabezado pasan a **amarillo lleno `#FFE800` con texto `#060606`** (`--a-accion`, `.boton--accion`); los demás botones quedan como están (sección 12; `spec-visual.md` §0.3 punto 11, §1.1, §4.1) | **regla** | Ramón, sobre las maquetas del 30-oct |
| 30-oct | Portada: rótulo «Sitios web a medida y marketing con IA», `h1` «*En redes arriendas.* Tu sitio es lo único que es tuyo.», el recuadro «Hablemos de tu sitio» con su microcopy y el enlace a Desarrollo web (sale el del chequeo); la composición H-A no cambia (§12.1) | **regla** (el texto es de Clara) | Ramón |
| 30-oct | La sección 2 pasa a «Todo lo que haces para vender termina en tu sitio» con las dos listas «En redes» y «En tu sitio» lado a lado desde 834, **filetes alineados fila a fila**, títulos a Título (§12.2) | **regla** (lado a lado y alineadas) · **preferencia** (el tamaño de los títulos) | Ramón eligió el contenido; la composición, Lucía |
| 30-oct | El logo pasa a la opción 2, «la i con su disco» (`spec-visual.md` §5.4) | **regla** | Ramón («logo 2 por ahora») |
| 30-oct | Techos de alto de la home (criterio 5), nuevos | **regla** | Lucía, por la sección 2 y el texto nuevo |
| 30-oct | **Después de la QA del 30-oct** (`acta-qa-30oct.md`): el criterio 21 mide el `d` construido, el corte menú de Bruno, no la elipse de la maqueta, y `logo-i-disco.mjs` se rehízo para eso (menor 4); criterio 22 nuevo: la biografía de «Quién está detrás» a 16 px entre párrafos, no a 32 (menor 4); el peso (criterio 10) vuelve bajo el tope sacando del `<head>` de A las hojas de Inter y Manrope, sin subir el techo (mayor 1) | **regla** (lo construido es el contrato; el peso) · **preferencia** (16 px) | Lucía, sobre lo que construyó Diego y midió Javiera |

---

## 12 · 30-oct · Lo que eligió Ramón, compuesto y medido

**Qué decidió** (con las maquetas de `copy/maquetas-30oct/` y el borrador `copy/sitio-propio-direcciones.md`): el titular
«*En redes arriendas.* Tu sitio es lo único que es tuyo.» con el rótulo «Sitios web a medida y marketing con IA»; el
recuadro «Hablemos de tu sitio»; **el botón principal y el del encabezado en amarillo lleno `#FFE800` con texto
`#060606`** (el único color de Koto, el de su logo); la sección 2 «Todo lo que haces para vender termina en tu sitio» con
dos columnas; el logo opción 2. El texto es de Clara (`texto/home.json`, `texto/comun.json`); el token y sus estados,
`spec-visual.md` §1.1 y §4.1; el logo, `spec-visual.md` §5.4. **Esta sección dice cómo se compone y qué se midió.**

**Cómo se midió.** Sobre el `dist/` de la rama tal como estaba el 30-oct a las 14:08 (la obra E13 sin nada del 30-oct),
servido en local, en Chromium 141 sin cabeza, con el aviso de cookies abierto (sin `spindlelab_consent`) y cerrado. El
texto elegido y las reglas de esta sección se **inyectan** en el DOM (`e13/herramientas/portada-30oct.mjs --inyectar`),
así que lo medido es lo que Diego tiene que construir. **Con el build hecho, la misma herramienta sin `--inyectar` tiene
que dar lo mismo** (± 1 px donde Clara haya ajustado el texto). Los números están en `medicion-30oct/`.

### 12.1 · La portada

**En el DOM, en este orden** (dentro de lo que ya existe; la composición H-A de la sección 2 no cambia: la acción en
c13–c16 desde 1194 y en c8–c12 de 834 a 1193; bajo 834, rótulo, `h1`, acción y entradilla, solo a la vista):

```astro
<p class="rotulo">{t('home.portada.rotulo').texto}</p>                         {/* Sitios web a medida y marketing con IA */}
<h1 class="t-portada" id="portada-titulo"><span class="tinta">…</span> <span class="gris">…</span></h1>
<p class="cuerpo entradilla">{t('home.portada.entradilla').texto}</p>
<div class="portada-v__accion">
  <a class="boton boton--accion" id="portada-cta" href={boton.destino}>{boton.texto}<Icono nombre="flecha" /></a>
  <p class="chico">{t('home.portada.microcopy').texto}</p>
  <p class="chico"><a href={secundario.destino}>{secundario.texto}</a></p>      {/* home.portada.secundario, a /servicios/desarrollo-web/ */}
</div>
```

El enlace secundario es el de siempre (`.chico a`: blanco, subrayado al 45 %; su área de 44 bajo 834 ya la da la regla
`.portada-v__accion > .chico:last-child a`). **No es un botón y no es amarillo.** Sale de la portada el enlace al chequeo
(`home.portada.chequeo`): el chequeo sigue en el pie y en la sección 6.

**El amarillo, en `archivo.css`** (los tokens van con los demás, en `body.a-body`; la regla, junto a `.boton--claro`):

```css
body.a-body { /* … */ --a-accion: #ffe800; --a-accion-pasar: #e9d400; --a-accion-apretado: #d4c100; }
/* 30-oct · la acción principal (spec-visual §1.1 y §4.1): SOLO #portada-cta y .cab__cta. Texto y flecha en el lienzo. */
.a-body .boton--accion { background: var(--a-accion); color: var(--a-lienzo); }
.a-body .boton--accion:hover { background: var(--a-accion-pasar); }
.a-body .boton--accion:active { background: var(--a-accion-apretado); }
```

El foco no se toca (`.a-body :focus-visible`: 2 px blanco a 3 px) y la transición es la de `.boton` (167 ms lineal). En el
comentario de `.cab__der` y de `.cab__cta` («el botón es el boton--claro de siempre») va la fecha y el cambio.

**Cómo corta el `h1`** (medido, `text-wrap: balance` del sistema): «En redes arriendas. Tu sitio / es lo único que es
tuyo.» en dos líneas de 320 a 414 y a 834 y 1024; en una a 768 (a 26 px) y desde 1194. El rótulo, en una línea desde 320.
**No se fuerza el corte** después de «arriendas.»: la maqueta que Ramón aprobó lo tiene en una línea a 1440, y a 360 la
segunda tinta en su propia línea pasaría a tres (26 px más de alto, justo donde falta).

**La primera pantalla, con el aviso de cookies abierto** (`medicion-30oct/primera-pantalla.json`; «hoy» es el build del
26-oct, `primera-pantalla-hoy.json`). Margen = borde de arriba del aviso menos el fondo del botón; «tapado» son los puntos
del botón (centro y cuatro esquinas) donde `elementFromPoint` no da el botón:

| Tamaño | Aviso desde | `h1` (líneas, y) | Botón | **Margen** | Tapado | Microcopy · enlace | Hoy |
|---|---|---|---|---|---|---|---|
| 320 × 568 (fuera de la obra) | 415 | 2 (303–355) | 379–423 | **−7,4** | 2 de 5 | bajo el aviso | −21,1 (3 de 5) |
| 360 × 640 | 487 | 2 (323–375) | 399–443 | **44,5** | 0 | bajo el aviso | 30,7 |
| **360 × 800** | 647 | 2 (346–398) | 422–466 | **181,1** | 0 | los dos sobre el aviso | 167,4 |
| 375 × 667 | 533 | 2 (330–382) | 406–450 | **82,8** | 0 | microcopy sobre; enlace bajo | 69,0 |
| **390 × 844** | 710 | 2 (363–415) | 439–483 | **227,2** | 0 | los dos sobre el aviso | 213,4 |
| 414 × 896 | 762 | 2 (377–430) | 454–498 | 264,7 | 0 | sobre | 250,9 |
| 768 × 1024 | 909 | 1 (576–610) | 634–678 | 231,5 | 0 | sobre | 231,5 |
| 834 × 1112 | 1043 | 2 (918–989) | 947–991 | 51,6 | 0 | bajo el aviso | 51,6 |
| 1024 × 768 | 699 | 2 (565–644) | 602–646 | 52,6 | 0 | bajo | 52,6 |
| 1194 × 834 | 765 | 1 (666–709) | 649–693 | 72,1 | 0 | bajo | 72,1 |
| 1280 × 800 | 731 | 1 (630–674) | 633–677 | 53,9 | 0 | bajo | 72,6 |
| 1440 × 900 | 831 | 1 (726–774) | 732–776 | 54,6 | 0 | bajo | 54,6 |
| 1920 × 1080 | 1011 | 1 (906–954) | 931–975 | 35,7 | 0 | bajo | 35,7 |

**Sin el aviso**, el botón entra en los trece tamaños (de 104,7 px sobre el borde a 1920 × 1080 hasta 398,4 a 414 × 896;
145,2 a 320 × 568). **El `h1` y el recuadro caben en la primera pantalla a 360 × 800 y a 390 × 844 con el aviso abierto,
con el microcopy y el enlace también a la vista:** la regla de E13 se cumple con margen (181 y 227 px). Bajo 834 el botón
sube 14 px respecto del 26-oct (el rótulo nuevo cabe en una línea de 11 px desde 320; el del 26-oct iba en dos; el `h1`
sigue en dos); desde 834 queda donde estaba, porque el bloque de la acción se apoya abajo. Lo que queda bajo el aviso hasta que la persona elige es el microcopy y el
enlace desde 834 y a 360 × 640, como el 26-oct (sección 2, «Contraste y primera pantalla»).

**Si un cambio de texto lo rompe** (el criterio 1 falla en un tamaño de la obra), en este orden y nada más:
1. **El texto primero.** El `h1` tiene que quedar en dos líneas a 360: si Clara lo cambia, se mide con
   `portada-30oct.mjs` antes de construir. El microcopy y el enlace van después del botón: bajo 834 no lo mueven; desde
   834 un microcopy más largo sube el botón (la columna se apoya abajo), que es a favor.
2. **Si a 360 × 640 o 375 × 667 sigue sin entrar**, la franja del video baja de `28svh` a `24svh` en la misma regla
   (`@media (max-width: 833.98px) and (max-height: 740px)`): a 360 × 640, de 179 a 154 px, 25 px más para el botón.
3. **Lo que nunca:** poner el botón después del microcopy o la entradilla antes del botón, esconder el rótulo, achicar el
   botón bajo 44 px de alto o mover el aviso (`spec-visual.md` §4.3).

**El contraste sobre el video** (`portada-30oct.mjs` + `e12/spec/herramientas/contraste-portada.py` sin cambios, los 121
cuadros, 13 tamaños; `medicion-30oct/contraste-portada.json`): **0 líneas bajo 4,5:1.** La peor, **5,35:1** (el rótulo a
1024 × 768); a 1440 × 900, 5,38 (la entradilla). Sin el velo, las mismas líneas darían de 1,09 a 1,41:1. α del velo bajo el
texto, 0,876. Video sin velo a 1440 × 900: **408 px** (26-oct: 430; E12: 288). **El botón amarillo contra lo que lo rodea**
(el «borde del campo» de la herramienta: el relleno contra el anillo de 3 px por fuera, en el cuadro más claro): **12,80 a
13,27:1** desde 834; 16,20 bajo 834, sobre el lienzo. De ahí: al pasar, 10,58 a 10,97; apretado, 8,71 a 9,03; el contorno
blanco del foco, que cae a 3–5 px del botón sobre el mismo velo de 0,88 a 1, **16,01 a 16,59**. La herramienta deja fuera
de las líneas sobre el video el texto de `.boton` (va sobre su propio relleno: es un par de tokens, `spec-visual.md` §1.1).

**Dos amarillos en la primera pantalla de la home** (el del encabezado y el de la portada, `medicion-30oct/portada-1440x900-aviso.jpg`,
`portada-360x640-360x800-390x844-aviso.jpg`): es lo que Ramón eligió, y los dos llevan al mismo lugar. En las demás rutas,
uno; en `/contacto/`, ninguno. El «Aceptar» del aviso de cookies sigue blanco.

### 12.2 · La sección 2: «Todo lo que haces para vender termina en tu sitio»

**Dónde:** en el lugar de «Dónde puede caerse una consulta», con su `aria-labelledby="h-problema"` y su `h2#h-problema`.
**Texto** (Clara): `home.problema.h2`, `.p`, `.redes.t`, `.redes.1` a `.3`, `.sitio.t`, `.sitio.1` a `.4` y `.cierre`. Sin
rótulo mono (como el 26-oct).

```astro
<section class="seccion reticula" aria-labelledby="h-problema">
  <div class="int-sec__cab">
    <h2 class="t-declaracion" id="h-problema"><span class="tinta">{h2}</span></h2>
  </div>
  <div class="int-sec__cuerpo">
    <p class="cuerpo caja">{p}</p>
    <div class="int-par">
      <h3 class="t-titulo int-par__t">{redes.t}</h3>
      <ul class="int-lista int-par__lista">{redes.map((x) => <li><p class="cuerpo">{x}</p></li>)}</ul>
      <h3 class="t-titulo int-par__t">{sitio.t}</h3>
      <ul class="int-lista int-par__lista">{sitio.map((x) => <li><p class="cuerpo">{x}</p></li>)}</ul>
    </div>
    <p class="cuerpo caja">{cierre}</p>
  </div>
</section>
```

```css
/* 30-oct · la sección 2 de la home (spec-home §12.2): «En redes» | «En tu sitio». Dos .int-lista lado a lado desde 834,
   con las filas alineadas entre columnas (subgrid, como .servicio); apiladas bajo 834, «En redes» primero. Sin caja,
   sin fondo y sin borde alrededor: los filetes son los de .int-lista. */
.a-body .int-par { display: grid; grid-template-columns: minmax(0, 1fr); margin-block: 32px; }
.a-body .int-par__t { margin-bottom: 12px; }
.a-body .int-par__lista + .int-par__t { margin-top: 32px; }
@media (min-width: 834px) {
  /* 1 fila para los títulos + tantas como la lista más larga (hoy, 4). Si Clara cambia cuántas son, cambian el 4 y el 6 */
  .a-body .int-par { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: auto repeat(4, auto); column-gap: var(--a-g); }
  .a-body .int-par__lista + .int-par__t { margin-top: 0; }
  .a-body .int-par > .int-par__t:nth-of-type(1) { grid-area: 1 / 1; }
  .a-body .int-par > .int-par__t:nth-of-type(2) { grid-area: 1 / 2; }
  .a-body .int-par > .int-par__lista:nth-of-type(1) { grid-area: 2 / 1 / 6 / 2; }
  .a-body .int-par > .int-par__lista:nth-of-type(2) { grid-area: 2 / 2 / 6 / 3; }
  .a-body .int-par__lista { display: grid; grid-template-rows: subgrid; }
  .a-body .int-par__lista > li { padding-right: 24px; }
}
```

**Las decisiones, cada una con su porqué:**
- **Dentro de `.int-sec__cuerpo` (c5–c12 desde 1194), no del `--ancho`.** Las dos columnas caen justo en c5–c8 y c9–c12
  (346 px cada una a 1440): son columnas de la retícula, no un reparto a ojo. En c5–c16 cada lista mediría 523 px, más
  ancha que la caja del párrafo de arriba (493).
- **Lado a lado desde 834, apiladas bajo 834**, como todos los patrones de dos columnas de A (glosario, datos de fase,
  preguntas, fases, planes). A 768 cabrían (364 px cada una), pero haría falta un corte entre 390 y 768 que `spec-visual.md`
  §4.4 no tiene; apiladas, a 768 se leen bien (`s2-768.jpg`).
- **Los filetes alineados fila a fila.** En la maqueta del 30-oct cada lista iba por su cuenta y, como «La plataforma decide
  a quién le muestra lo que publicas.» corta en dos líneas, los filetes de las dos columnas caían a alturas distintas (a
  1440: 527, 552 y 583 contra 527, 552, 575 y 598): dos listas con línea, una al lado de la otra y desfasadas, se leen como
  un error. Con `subgrid` cada fila mide lo que la más alta del par. **No son pares** (tres contra cuatro; Clara: no es una
  tabla): se alinean las líneas, no los sentidos. La cuarta fila de «En tu sitio» queda sola, y está bien.
- **Los dos títulos a Título** (`h3.t-titulo`, 24 / 23 px, el corte display), no a cuerpo en blanco (`int-lista__t`, como
  sugería Clara en `home.problema.columnas`). Las dos palabras son el argumento de la sección; a cuerpo, en blanco sobre
  una lista gris, se leen como una fila más (la maqueta lo muestra). Título es el paso que ya usan los títulos de fila de
  las secciones 4 y 6 (`t-fase`) y las preguntas: ningún tamaño nuevo.
- **24 px de aire a la derecha de cada fila desde 834.** Las columnas van a 8 px (la separación de la retícula); sin ese
  aire el texto de la izquierda podía quedar a 8 px de la columna de la derecha, el defecto de `.fila-servicio` (desvíos,
  tanda 4). Medido: entre textos, 42 px a 1194 y 51 a 1440.
- **Espacios de la escala** (`spec-visual.md` §1.5): 32 entre el párrafo, el par y el cierre; 12 entre cada título y su
  primer filete; 32 entre las dos listas apiladas. Los filetes son `--a-linea` (los de `.int-lista`), el texto es gris y
  los títulos blancos.
- **Nada más:** ni iconos de sí y no, ni un color por lado, ni la tinta blanca para «En tu sitio». El contraste lo pone el
  texto.

**Medido** (`medicion-30oct/seccion-2.json`; capturas `s2-390.jpg`, `s2-768.jpg`, `s2-1440.jpg`):

| Ancho | Cómo va | Alto de la sección | Columnas (x) | Líneas por fila (redes · sitio) | Desfase de filetes | Entre textos | Desborde |
|---|---|---|---|---|---|---|---|
| 360 | apiladas | 924 | 16–344 | 2/1/1 · 1/1/1/1 | | | 0 |
| **390** | apiladas | **904** | 16–374 | 2/1/1 · 1/1/1/1 | | | 0 |
| **768** | apiladas | **828** | 16–752 (texto hasta la caja de 493) | 1/1/1 · 1/1/1/1 | | | 0 |
| 834 | dos | 682 | 16–413 · 421–818 | 2/1/1 · 1/1/1/1 | 0 · 0 · 0 | 112,6 | 0 |
| 1024 | dos | 667 | 16–508 · 516–1008 | 1/1/1 · 1/1/1/1 | 0 · 0 · 0 | 108,2 | 0 |
| 1194 | dos | 644 | 308,5–593 · 601–885,5 | 2/1/1 · 1/1/2/1 | 0 · 0 · 0 | 42,4 | 0 |
| **1440** | dos | **627** | 370–716 · 724–1070 | 2/1/1 · 1/1/1/1 | 0 · 0 · 0 | 50,7 | 0 |
| 1920 | dos | 606 | 490–956 · 964–1430 | 1/1/1 · 1/1/1/1 | 0 · 0 · 0 | 72,4 | 0 |

La sección del 26-oct medía 228 (1440), 294 (1024), 249 (768) y 282 (390): suma de 373 a 622 px. Con eso y el resto del
texto nuevo, el alto de la home (criterio 5, `alto-home*.json`): hoy 6.624 · 6.713 · 8.412 · 7.940 (1440 · 1024 · 768 ·
390); con la portada y la sección 2, 7.023 · 7.086 · 9.012 · 8.548; con además la pregunta nueva y los párrafos base de
«Quién está detrás», 7.409 · 7.422 · 9.380 · 8.956. Los techos nuevos del criterio 5 son esa proyección más 300 px.

### 12.3 · El botón del encabezado

«Hablemos» (`comun.nav.revision`), `.boton.boton--accion.cab__cta`, a `/contacto/`; no se dibuja en `/contacto/`, sin
`aria-current` (§3.2). Mide **87,5 × 44** en los trece tamaños (antes 149,8 × 44), sin desborde de la fila (`scrollWidth`
igual al ancho en los trece). **Plegado** (scroll de 1.200 px, ocho tamaños de 320 a 1440): el botón en `y` 10–54 dentro
de la placa de 48 (8–56), con su borde derecho a 12 px del de la placa en todos. **El foco plegado:** el contorno de 2 px a
3 px va de `y` 5 a 59, así que sus lados caen sobre la placa (18,42:1) y el borde de arriba y el de abajo, 3 px fuera de
ella, sobre la franja transparente por donde pasa la página. Es la misma geometría del botón blanco del 26-oct (Javiera
midió 0 focos sin indicador, acta de E13, criterio 8) y no se cambia: que el contorno entre en la placa pide una placa de
56 o un botón de menos de 44. Captura: `encabezado-390-plegado-foco.jpg`.

### 12.4 · Lo medido y cómo repetirlo

| Qué | Herramienta (`e13/herramientas/`) | Sale en `e13/medicion-30oct/` |
|---|---|---|
| El amarillo y sus estados, los pares de contraste, el oro del hilo | `python3 accion-amarillo.py ../e12/medios/hilo/hilo-1920-poster.webp medicion-30oct/accion-amarillo.json` | `accion-amarillo.json` |
| La lámina de los estados, para mirar | `node accion-amarillo-lamina.mjs medicion-30oct/accion-amarillo.json ../e12/medios/hilo/hilo-1920-poster.webp <png>` | `lamina-amarillo.jpg` |
| Primera pantalla con y sin aviso, el encabezado plegado, la sección 2, el alto de la home; lo que lee el contraste | `node portada-30oct.mjs <url del build servido> <carpeta> [--inyectar]` | `primera-pantalla.json` (y `-hoy`), `seccion-2.json`, `alto-home.json` (y `-hoy`), las capturas |
| El contraste sobre los 121 cuadros | `python3 ../e12/spec/herramientas/contraste-portada.py <carpeta de portada-30oct> ../e12/medios/hilo/hilo-1920.webm <salida>` (sin cambios; `python3` a secas, con `-I` no encuentra `numpy`) | `contraste-portada.json` |
| El logo opción 2 a 20 y 24 px | `node logo-i-disco.mjs <carpeta>`. **Desde el 30-oct después de la QA** compara el `d` de `Logo.astro` con `e13/logo/logo-menu-linea.svg` y mide la columna de la i; sale con 1 si no son iguales o si el disco se funde o se apaga. (La primera versión armaba la elipse de la maqueta y se caía con el `d` construido) | `logo-construido/` (`logo-i-disco.json` y las láminas a 1x y 2x). `logo-i-disco.json` y `.jpg` sueltos son los de la maqueta, la historia |
| El peso de la home (criterio 10) | `node peso-30oct.mjs <url> [--ancho 390] [--recorrer] [--detalle]` | En el acta y en el criterio 10 |
| Que ninguna página de A use Inter ni Manrope | `node letras-sin-uso-30oct.mjs <url> <dist>` | En la salida |
| El aire de «Quién está detrás» (criterio 22) | `node quien-aire-30oct.mjs <url> <carpeta>` | `quien-aire/` |

**Lo que no medí:** el build con el código de Diego (no existe todavía: por eso `--inyectar`); el texto final de Clara en
«Quién está detrás» y en la pregunta nueva (la proyección del alto usa el texto base del encargo); Tab por toda la página
(criterio 8, Javiera); Safari y Firefox; las imágenes al compartir regeneradas.
