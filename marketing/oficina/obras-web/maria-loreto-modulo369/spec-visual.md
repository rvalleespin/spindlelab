# Spec visual · María Loreto Hernández · Módulo 369 · maqueta v2 · dirección: retícula 3·6·9

> El contrato visual de la v2. Lo escribe Lucía (`/web-direccion-arte`, paso 5) el 5-oct-2026, con la dirección ya elegida por Ramón el 26-sep (encabezado de `brief-de-obra.md`). Diego construye contra esto; Javiera audita contra esto, ítem por ítem (cada regla tiene número). Una corrección que no termine escrita acá vuelve en la pasada siguiente.
> **Jerarquía de documentos:** `brief-de-obra.md` (contrato de alcance) > esta spec (contrato visual) > `copy-secciones.md` (texto) > `referencias.md` (lock) > `diagnostico-maqueta-v1.md` (insumo). Si algo de acá choca con el brief, gana el brief. El texto visible sale de `copy-secciones.md`; donde esta spec necesita un texto que Clara no escribió, lo dice en §12.

**Referencia dominante:** PRODn, página de portafolio (https://prodn.com/portfolio/).
**Rasgos que se preservan:** (a) cada fila de obras suma el módulo (9, 6 o 3 columnas) y lo reparte distinto fila a fila; (b) la obra va plana, a su proporción, alineada arriba, sin caja, marco, sombra ni recorte; (c) el pie va debajo de la imagen y nada va encima; (d) la separación entre filas es al menos 4 veces la calle; (e) hay vacío antes del primer bloque.
**Qué sacrifica esta dirección:** la foto de sala a sangre de Escat (no hay activo y fingirla sería peor); el lienzo negro de Schipper y Quatrième (el hueso es token fijo); la serif como voz (sale del sitio); la vista de catálogo uniforme que muestra todo el inventario de un golpe (el muro se recorre por filas, no se escanea); la escala real de las obras en el muro (se descarta en D5).
**Medido para esta spec (5-oct):** anchos de palabra y contador con Archivo y Plex Mono reales en Chrome headless (`scratchpad/lucia-spec/medir*.html`); contraste de tokens; color del borde de las 27 obras de relleno contra el hueso (`scratchpad/lucia-spec/contacto-obras.png`).

---

## 0 · Decisiones de criterio (resueltas, con su porqué y su referencia)

Las preguntas de «Decisiones de criterio» del diagnóstico que son de dirección de arte. Las de negocio (staging, cifra de la tienda, formularios) no son de esta spec.

**D1 · Portada: una obra nítida por lámina, desplazada a un borde de la retícula, en un carrusel que se desliza con el dedo. Sin foto de sala, sin desenfoque, sin sombra, sin caja.**
- La lámina ocupa el ancho del contenido (columnas 1 a 9) y entre 78% y 85% del alto de la ventana a 1440; la obra se pinta entera, a su proporción, pegada al borde izquierdo o derecho de la lámina según la lámina (§2.1). El hueso que queda al costado es vacío, no marco.
- **Respaldo:** Escat («la foto grande» que María nombró: ancho del contenido, 78-100% del alto, leyenda debajo, nada encima; `referencias/07-escat-home-1440-v0.jpg`); PRODn (obra plana); Schipper (indicador de números chicos con una raya junto al activo).
- **Por qué no foto de sala:** no hay activo; descargar fotos con licencia requiere OK de Ramón; generar una sala con Pillow «a la carrera se vería falso» (diagnóstico, descartado). Queda para después (C41).
- **Por qué no las columnas 3 a 9 (C04):** con la leyenda en las columnas 1-2 al costado, la obra se lee como producto con ficha lateral; Escat pone la leyenda debajo, partida en la retícula, y eso se toma.

**D2 · Palabra enorme: «ARTISTAS» / «ARTISTS» (título de la sección de artistas del inicio), cortada por el borde derecho de la ventana en la última S, con la I en cobalto.**
- **Por qué esa palabra:** es la opción A de Clara (copy §2.3): rotula algo, se traduce sin dejar español colado y no nombra el concepto. «Hallazgo» nombra el concepto en vez de hacerlo pasar y sale de un correo privado (brief §5).
- **Por qué la I:** es la cuarta letra en los dos idiomas (A-R-T-I…), así que el color cae en el mismo lugar en ES y EN, y es el glifo más angosto: la menor cantidad de cobalto posible dentro del elemento más grande de la vista. Es una sola raya de color en una masa negra.
- **Respaldo:** María («una palabra enorme», «un color inesperado o desentonando»); Taradash (dos tamaños de texto más uno enorme, una sola vez por página).

**D3 · Palabra casi escondida: «Libro», un enlace en mono de 12 px, gris, sin flecha, solo en una casilla vacía del inicio, que lleva a `#/encuentro/libro`.** Se esconde por tamaño y lugar, no por contraste (pasa AA: 5,71:1). Es palabra de María (su boceto) y quien la encuentra, encuentra algo (opción A de Clara, copy §2.4).

**D4 · Índice de Artistas: grilla de 3 por fila, cada artista representada por una obra suya parada sobre una línea de 1 px, con el nombre debajo. Se descarta el zigzag de la v1. Sin selector 3·6·9.**
- **Respaldo:** Esther Schipper (estructura: 3 por fila, línea, nombre debajo; 3 artistas = 1 fila, 6 = 2, 9 = 3, que es la 3·6·9 literal); Kurimanzutto (obra, no cara).
- **Por qué los tres del mismo ancho:** las tres artistas tienen el mismo peso curatorial y María es una de ellas; darle más columnas a una diría una jerarquía que nadie decidió. La variación la ponen las proporciones distintas paradas sobre la línea, no cajas (no hay cajas).
- **Selector 3·6·9 (C22):** fuera. Inventaría seis artistas más de relleno, y la grilla ya muestra cómo crece (cada tres, una fila).

**D5 · Muro de Obras: ni grilla uniforme ni escala real. Filas que suman 9 (6, 3) con un ciclo fijo de repartos (§1.4).**
- **Respaldo:** PRODn (2+3, 3+2, cinco de 1, 3+2: la suma siempre cierra y el reparto cambia).
- **Por qué no uniforme:** 27 obras en `s3` son nueve filas iguales y la retícula de 9 no se percibe (diagnóstico, lente de dirección de arte).
- **Por qué no escala real (C21):** deja filas sin cerrar, y una fila con hueco se lee como una obra que falta (el diagnóstico lo vio en las tapas del inicio, C31); además las medidas del relleno son inventadas, así que la disrupción tendría un significado falso.

**D6 · Cobalto: tres apariciones en todo el sitio, en una lista cerrada, siempre como un trazo dentro de un elemento enorme. Nunca estado de interfaz.**
- Inicio: la I de ARTISTAS / ARTISTS. Encuentro: la barra «/» del contador. Encuentro activado: la barra «/» del contador. Las otras once vistas: cero cobalto.
- **Respaldo:** Kurimanzutto (un solo color saturado, un solo rol, y el ítem actual del menú se apaga a gris en vez de colorearse).
- **Por qué no «uno por vista con significado» (C27):** disponible, próximo encuentro y número de artista son estados de datos; pintarlos de cobalto lo vuelve código de color, y lo esperado deja de desentonar. **Por qué no una sola vez en todo el sitio:** en el iPhone de María podría no verlo nunca. Tres trazos en los dos lugares donde vive lo enorme alcanzan.
- **Riesgo anotado** (referencias §6): `#1F3BD6` tiene tono de unos 231°, cerca del índigo por defecto de los modelos; lo separan su oscuridad y esta escasez. Por eso la lista es cerrada.

**D7 · Tipografía: se quita Instrument Serif. Archivo + IBM Plex Mono, tres niveles de texto más dos tamaños de disrupción.**
- **Respaldo:** Studio Iron (la serif itálica solo para una cita textual en primera persona); Taradash (dos tamaños de texto y nada en medio).
- **Por qué sale:** en la v2 no hay ninguna cita publicable (la frase de María es de un correo privado, brief §5; Clara eligió el inicio sin frase y los statements son corchetes), así que la familia no tiene trabajo. Sus 13 usos de la v1 eran la palabra en serif itálica de adorno (tell #4 de `anti-ai-slop.md`). Es una petición de fuentes menos. María no vio la v1: no hay nada que «desver».

**D8 · Menú en celular: plegable, que se abre en el flujo de la página (empuja el contenido hacia abajo). Sin capa fija.**
- **Por qué no la capa a pantalla completa de C26:** sería el único `position: fixed` del sitio, y el brief §7 pide que nada fijo o pegado quede encima de una obra; con el menú en el flujo la regla queda sin excepciones (P1) y además se construye y se audita más fácil. La cabecera sigue sin ser fija.
- **Presupuesto a 390:** barra de aviso ≤ 72 px + cabecera ≤ 64 px; así la lámina, la leyenda y los controles del carrusel caben en los 664 px visibles de Safari (§2.1, §10-M3).

**D9 · Ficha: botones exactamente como la tabla del brief §4, y lo que va en negrita en esa tabla es el botón lleno. Dos imágenes (vista general y detalle) en una pista que se desliza, con miniaturas chicas como controles.**
- Estado 1: Comprar con Mercado Pago (lleno) + Consultar (contorno). Estado 2: Consultar (lleno). Estados 3 y 4: Consultar (contorno).
- **Por qué botones y no enlaces de texto (C37):** el brief marca Comprar como principal y María teme lo técnico; la jerarquía tiene que verse. Un solo botón lleno por vista de ficha.
- **Respaldo:** Quatrième Étage (miniaturas a escala muy chica junto a la imagen grande, numeración en mono fuera de la imagen); PRODn (imagen plana a su alto). Es la disrupción de escala de la Ficha.

**D10 · Avisos de maqueta: siempre visibles donde el brief los pide, sin botón «Notas».** Mono de 12 px, gris, el prefijo «Maqueta ·» va en el texto (copy §7). **Sin franja lateral** (el `border-left` de C12 es el tell #6 de `anti-ai-slop.md`: el prefijo ya dice qué es).

**D11 · Aviso global:** texto completo de Clara en todos los anchos (2 líneas a 390), barra que no es fija y se va al bajar. Herramientas (Lo editas tú, Retícula, ES, EN) visibles también a 390.

**D12 · Obras planas, y el relleno se regenera para que se vean.** Sin paspartú, sombra ni caja (C06). **Medido:** el borde de 15 de las 27 obras de relleno tiene contraste 1,00 a 1,04:1 contra el hueso (las 9 de B y 6 de C tienen el papel casi del mismo color que el lienzo, porque el generador usó el tono del sitio como papel). Sin paspartú, esas obras desaparecen y la regla de la dominante (proporción visible, alineadas arriba) no se ve. El arreglo va en la media, no en la interfaz: papeles distintos del hueso (§3, M01). Ni contorno ni sombra.

**D13 · Gris:** `#6B675F` pasa a `#5E5A53` (lo permite el brief §7). **Medido:** el gris actual sobre hueso-2 da 4,24:1 y falla AA en los marcadores de imagen; el nuevo da 5,71:1 sobre hueso y 5,16:1 sobre hueso-2. Mismo tono, más oscuro (C39).

**D14 · Retícula:** líneas finas grafito y hueso, columnas numeradas, sin relleno de color y sin cobalto (§8.2).

**D15 · «Lo editas tú»:** contorno discontinuo grafito y etiqueta grafito con texto hueso, insertada en el flujo antes de la pieza, nunca encima de una obra; no usa cobalto (§8.1).

**D16 · Portadas e interiores de ediciones:** marcador dirigido (caja hueso-2 con ratio y texto), no una tapa compuesta en CSS con una obra encima como en la v1. Una portada armada con CSS es justo el fake que prohíbe el oficio (tell #9) y la v1 la hacía con obras de artistas que no son ediciones.

---

## 1 · Tokens (cada uno con su rol; un valor sin rol no es un token)

### 1.1 · Color (los seis de la v1; ninguno nuevo)

| # | Token | Valor | Rol exacto | Dónde NO se usa |
|---|---|---|---|---|
| 1.1.1 | `--hueso` | `#EEEAE2` | El único lienzo: `html`, `body`, barra de aviso, cabecera, menú abierto, fondo del botón contorno, chip de los números de la retícula | Nunca alrededor de una obra como caja. No hay segunda superficie de sección |
| 1.1.2 | `--hueso-2` | `#E4DFD4` | Solo dos cosas: fondo de un `<img>` mientras carga (únicamente en `img` cuya caja coincide con la imagen pintada) y fondo de `.marcador-img` | Paspartú, fondo de tarjeta, de sección, de campo, de botón, de hover, de lámina del carrusel, de celda del Libro |
| 1.1.3 | `--grafito` | `#1B1B19` | Texto principal; líneas de estructura de 1 px (inicio de la fila de filtros, borde superior del Índice, borde superior del pie, línea de artista); fondo del botón lleno; foco (contorno de 2 px); casilla activa del Libro; contorno y etiqueta de «Lo editas tú»; líneas de la retícula | Fondo de sección o de bloque grande (las únicas superficies grafito son botón lleno, casilla activa y etiqueta de «Lo editas tú») |
| 1.1.4 | `--gris` | `#5E5A53` (antes `#6B675F`, D13) | Texto secundario: corchetes `.pendiente`, avisos de maqueta, estados Vendida y Colección privada, ítem del menú de la página actual (apagado), herramientas no presionadas, «369» de los contadores y «/» del contador del inicio, «Libro» escondida, números de casillas vacías del Libro | Texto de cuerpo principal; bordes de campo; nunca sobre fondo grafito |
| 1.1.5 | `--linea` | `#D3CCBE` | Separadores de 1 px dentro de listas: filas del Índice, filas del menú abierto, borde de las casillas vacías del Libro, borde inferior de la barra de aviso | Texto (1,33:1); borde de campo de formulario; contorno de botón |
| 1.1.6 | `--cobalto` | `#1F3BD6` | Lista cerrada (D6): (1) la I de ARTISTAS / ARTISTS en Inicio; (2) la «/» del contador en Encuentro; (3) la «/» del contador en cada encuentro activado | Todo lo demás: foco, hover, página actual, enlaces, botones, bordes, fondos, estados, retícula, «Lo editas tú», obras de relleno (ver M01) |

1.1.7 · Contrastes medidos (WCAG): grafito/hueso 14,38:1 · gris/hueso 5,71:1 · gris/hueso-2 5,16:1 · grafito/hueso-2 12,98:1 · hueso/grafito 14,38:1 · cobalto/hueso 6,59:1. Ningún texto usa `--linea`.
1.1.8 · No existe blanco en el sitio: ningún `#fff`, `white` ni `rgb(255,255,255)` en CSS ni en estilos en línea (el `#fff` de C15 queda fuera).

### 1.2 · Tipografía

Familias: **Archivo** (variable, ejes `wdth` 100 a 125 y `wght` 400 a 800) e **IBM Plex Mono** (400 y 500), desde Google Fonts con `display=swap`. Enlace único: `family=Archivo:wdth,wght@100..125,400..800&family=IBM+Plex+Mono:wght@400;500&display=swap`. **Instrument Serif sale** (D7). Pila de respaldo: `"Archivo", "Helvetica Neue", Arial, sans-serif` y `"IBM Plex Mono", ui-monospace, Menlo, monospace`.

| # | Token | Familia / peso / ancho / tamaño a 1440 · a 390 / interlineado / tracking | Se usa en | No se usa en |
|---|---|---|---|---|
| 1.2.1 | `--t-enorme` | Archivo 800, `font-stretch: 125%`, **17vw en ES, 19,5vw en EN** (≈245 px y ≈281 px a 1440; ≈66 y ≈76 px a 390), interlineado 0,78, tracking −0,045em, mayúsculas | Solo la palabra enorme del inicio (D2) | Cualquier otro texto |
| 1.2.2 | `--t-contador` | Plex Mono 400, **200 px (≥1001) · 140 px (621-1000) · 72 px (≤620)**, interlineado 0,85, tracking −0,06em, `tabular-nums` | Solo los contadores de Encuentro: bloque del inicio, Encuentro, encuentro activado | Conteos de filtros, números de fila, Libro |
| 1.2.3 | `--t-titulo` | Archivo 500, ancho 100%, **30 px (≥621) · 24 px (≤620)**, interlineado 1,1, tracking −0,015em | Todos los H1 y H2; filas del Índice de obras; ítems del menú abierto a 390; las tres palabras de Acerca | Botones, etiquetas, cuerpo |
| 1.2.4 | `--t-texto` | Archivo 400 (500 en botones, nombre de artista del pie de obra, H3 y la palabra «Módulo» de la marca en 600), ancho 100%, **16 px en todos los anchos**, interlineado 1,5 (1,3 en pies de obra) | Cuerpo, corchetes `.pendiente`, pies de obra, campos de formulario, `select`, botones, menú a 1440 y 768, marca | Etiquetas y datos en mono |
| 1.2.5 | `--t-chico` | Plex Mono 500, **12 px en todos los anchos**, interlineado 1,4, tracking 0,04em; en `.etiqueta` además mayúsculas y tracking 0,08em | Etiquetas (rótulos de sección del inicio, `dt`, labels de formulario y de filtros, rótulos de Activar, «MAQUETA»), estados de obra, avisos de maqueta, herramientas, «Ver todo →» y enlaces de navegación secundaria, conteos, años y medidas en `dd`, números de casillas, «Libro» escondida | Párrafos de más de una frase (salvo avisos) |

1.2.6 · **Por qué estos valores.** Texto de 16 px en todos los anchos: es el mínimo que evita el zoom de Safari al tocar un campo (C02) y así cuerpo y campos son el mismo tamaño (dos tamaños de texto, Taradash). Título de 30 px: entre el nombre de 22 px de Kurimanzutto y los 39 a 43 px de Taradash; el H1 rotula, no anuncia. Chico de 12 px y no 10 u 11 (Quatrième usa 10): a 390 la v1 tenía 125 textos de 11 px (C39).
1.2.7 · **Escala completa, sin intermedios:** 12 · 16 · 30 (24) · contador · enorme. Cualquier otro `font-size` en `styles.css` o en `app.js` es un defecto. Sin `clamp()` en tipografía: los valores cambian solo en los cortes de §5 (excepción: `--t-enorme`, que es proporcional al ancho por diseño, ver 1.2.9).
1.2.8 · Mayúsculas solo en `.etiqueta` y en la palabra enorme, siempre con tracking. Ni botones, ni menú, ni avisos, ni pies en mayúsculas. Sin `font-style: italic` en ningún lado (Archivo itálica no se carga: sería itálica sintética).
1.2.9 · **Palabra enorme, medida:** con esos valores la palabra se corta entre el 40% y el 56% de la última S a 375, 390, 768 y 1440 (ES: anchos de 609,5 px por cada 100 px de cuerpo, «ARTISTA» 527,2; EN: 534,5 y «ARTIST» 452,2). La tinta de la primera A empieza 0,015em a la derecha del origen: `margin-left: -0.015em` la deja sobre el borde izquierdo de la columna 1. **Criterio:** con la Retícula encendida, la tinta de la A empieza a ≤ 4 px del borde izquierdo de la columna 1 y el borde derecho de la ventana corta la última S (ni la palabra entera visible ni cortada antes de la última letra).
1.2.10 · Contador, medido: «007/369» mide 3,78em → 756 px a 1440 (columnas 1 a 5), 529 px a 768, 272 px a 390.

### 1.3 · Espaciado (un módulo de 6, el de 3·6·9)

| # | Token | Valor | Rol | Dónde |
|---|---|---|---|---|
| 1.3.1 | `--e-1` | 6 px | Entre etiqueta y valor; entre líneas de ayuda y campo | `dt`/`dd`, label/campo |
| 1.3.2 | `--e-2` | 12 px | De la imagen a su pie (PRODn: 10 px); calle a ≤1000; entre botones | Pies de obra, controles |
| 1.3.3 | `--e-3` | 18 px | Calle a ≥1001; entre campos de un formulario | Retícula, formularios |
| 1.3.4 | `--e-4` | 24 px | Del título a su contenido dentro de un bloque | H2 → texto |
| 1.3.5 | `--e-6` | 36 px | Entre bloques de una misma sección; vacío arriba a ≤620 | Filas de texto, vacío |
| 1.3.6 | `--e-9` | 54 px | Entre filas de obra a ≤1000; vacío arriba a 621-1000 | Muro, Artista, Tienda |
| 1.3.7 | `--e-16` | 96 px | Entre filas de obra a ≥1001 (PRODn: ~92 px = 4,6 calles); entre secciones a ≤1000; vacío arriba a ≥1001 | Muro, `main` |
| 1.3.8 | `--e-24` | 144 px | Entre secciones a ≥1001 | `main` |

1.3.9 · **Retícula:** `--margen` 42 px (≥1001) · 30 px (621-1000) · 18 px (≤620); `--calle` 18 · 12 · 12 px; columnas 9 · 6 · 3. Anchos de columna resultantes: 134,7 px a 1440, 85,9 px a 1001, 108 px a 768, 110 px a 390, 105 px a 375. (PRODn: margen 40, calle 20; se redondea al módulo de 6.)
1.3.10 · **Vacío arriba** (de la cabecera al primer bloque, en todas las vistas salvo Inicio): `--e-16` · `--e-9` · `--e-6`. En Inicio la lámina empieza a `--e-2` de la cabecera.
1.3.11 · Todo espaciado en `styles.css` y en `style=""` de `app.js` sale de estos tokens o de `--margen`/`--calle`. Los `row-gap` en línea de la v1 (11 valores distintos) se reemplazan por clases o por `var(--e-*)`.

### 1.4 · La regla de filas (el rasgo de la dominante)

1.4.1 · Toda lista de obras (Muro, Artista, Tienda) se pinta en filas cuya suma de columnas es exactamente el número de columnas del ancho, tomando los repartos de este ciclo en orden y volviendo a empezar:

| Ancho | Ciclo (9 obras por vuelta) | Última fila con k obras sueltas |
|---|---|---|
| 9 col (≥1001) | `[4,5]` → `[2,4,3]` → `[2,2,2,3]` | k=1: `[5]` y el resto vacío (única fila abierta permitida, al final) · k=2: `[4,5]` · k=3: `[2,4,3]` |
| 6 col (621-1000) | `[3,3]` → `[2,4]` → `[2,2,2]` → `[4,2]` | k=1: `[3]` · k=2: `[3,3]` · k=3: `[2,2,2]` |
| 3 col (≤620) | `[3]` → `[1,2]` → `[3]` → `[2,1]` → `[1,1,1]` | k=1: `[3]` · k=2: `[1,2]` · k=3: `[1,1,1]` |

1.4.2 · **Cómo se arma cada fila** (determinista, para que Javiera lo pueda recalcular). Sea k el número de obras que quedan y p el próximo reparto del ciclo. (A) Si k ≤ 3, la fila es la de cierre de k y la lista termina. (B) Si no, y tomar p dejaría exactamente 1 obra suelta, se salta p y se prueba con el reparto siguiente del ciclo. (C) Si no, la fila es p. Referencia (verificada hoy con listas de 1 a 27 obras: toda fila suma las columnas salvo la de una sola obra):

```js
var CICLO = { 9: [[4,5],[2,4,3],[2,2,2,3]], 6: [[3,3],[2,4],[2,2,2],[4,2]], 3: [[3],[1,2],[3],[2,1],[1,1,1]] };
var CIERRE = { 9: {1:[5],2:[4,5],3:[2,4,3]}, 6: {1:[3],2:[3,3],3:[2,2,2]}, 3: {1:[3],2:[1,2],3:[1,1,1]} };
function filas(n, cols) {           // n obras -> lista de repartos
  var c = CICLO[cols], i = 0, k = n, out = [];
  while (k > 0) {
    if (k <= 3) { out.push(CIERRE[cols][k]); break; }
    var p; for (var t = 0; t < c.length; t++) { p = c[i++ % c.length]; if (k - p.length !== 1) break; }
    out.push(p); k -= p.length;
  }
  return out;
}
```
1.4.3 · **Resultado esperado** (sirve de prueba): 27 obras a 1440 = 9 filas, `[4,5]` `[2,4,3]` `[2,2,2,3]` tres veces. Las 8 obras de Artista: `[4,5]` `[2,4,3]` `[2,4,3]` (9 col) · `[3,3]` `[2,4]` `[4,2]` `[3,3]` (6 col) · `[3]` `[1,2]` `[3]` `[2,1]` `[1,2]` (3 col). Las 3 de Tienda: `[2,4,3]` · `[2,2,2]` · `[1,1,1]`. Con filtros, el ciclo arranca de nuevo con la lista filtrada; una sola obra filtrada va en `[5]` (9 col) y deja la fila abierta, única fila abierta permitida.
1.4.4 · Dentro de la fila, cada obra ocupa el ancho de sus columnas a su proporción natural, **alineada arriba** (`align-items: start`), con `max-height: 80svh` (si una obra vertical topa ese alto, queda más angosta que su celda y alineada a la izquierda: el resto de la celda es vacío). Nunca `object-fit: cover`.
1.4.5 · La «obra corrida» de la v1 (`translateY`) desaparece: el desplazamiento sale del reparto y de las alturas distintas, y nada se monta sobre nada (C01).
1.4.6 · Separación entre filas: `--e-16` a ≥1001, `--e-9` a ≤1000.

### 1.5 · Radios

1.5.1 · `border-radius: 0` en todo, sin excepción: obras, botones, campos (`-webkit-appearance: none` para que iOS no los redondee), marcadores, casillas. Los puntos de estado de la v1 (círculos) se eliminan: el estado es texto. **Respaldo:** PRODn y Kurimanzutto, esquinas rectas en todo.

### 1.6 · Profundidad

1.6.1 · Cero sombras (`box-shadow`, `drop-shadow`), cero `filter`, `backdrop-filter`, `mix-blend-mode` y la propiedad `transform`. La jerarquía la dan solo la escala, la posición en la retícula y las líneas de 1 px.
1.6.2 · Líneas: grafito 1 px = empieza una estructura (fila de filtros, Índice, pie del sitio, línea de artista). `--linea` 1 px = separa ítems dentro de una lista. No hay otros bordes, salvo el de los botones (1 px grafito) y el de los campos (1 px grafito abajo).
1.6.3 · Capas: solo `.reticula` tiene `z-index` (50). La imagen del hallazgo del Índice usa `position: absolute` dentro de su lista (no fija). Nada más se superpone a nada.

### 1.7 · Movimiento (qué lo dispara)

| # | Qué se mueve | Disparador | Duración / curva | Con `prefers-reduced-motion: reduce` |
|---|---|---|---|---|
| 1.7.1 | Pista del carrusel y pista general/detalle de la ficha | El dedo (scroll nativo con `scroll-snap`), los botones, las flechas del teclado | Nativo; `scrollTo` con `behavior: 'smooth'` | `behavior: 'auto'` (salto) |
| 1.7.2 | Imagen del hallazgo del Índice | Cursor sobre la fila o foco (con `hover:hover`); la fila cruza la línea media de la pantalla (sin `hover`) | `opacity` 0 → 1, 200 ms, `cubic-bezier(.2,0,0,1)` | Sin transición |
| 1.7.3 | Capa Retícula | Botón | `opacity`, 150 ms lineal | Sin transición |

1.7.4 · Nada más se anima: sin avance automático del carrusel, sin aparición al bajar, sin `scale` en hover, sin animación del menú. Sin `transition: all`; cada transición nombra su propiedad.

---

## 2 · Composición por vista

Notación: `c4-6` = de la columna 4 a la 6. Las tres columnas de cada fila son 9 col (1440) · 6 col (768) · 3 col (390). **390 es el ancho principal.** Las piezas globales (aviso, cabecera, pie) están en §2.0. «Disrupción» nombra cuál de las de María sostiene la vista (brief §7: Inicio, Artista, Ficha y Encuentro tienen al menos una).

### 2.0 · Global

**2.0.1 Barra de aviso** (no fija; se va al bajar). 1440: una línea; «MAQUETA» (etiqueta grafito) + texto de Clara en chico gris a la izquierda; a la derecha las herramientas: Lo editas tú · Retícula · ES · EN. 390: línea 1 «MAQUETA» a la izquierda y las cuatro herramientas a la derecha; líneas 2 y 3, el texto completo (medido: 476 px de texto en 354 px = 2 líneas). Alto total ≤ 72 px a 390. Borde inferior 1 px `--linea`. Padding vertical `--e-1`.
**2.0.2 Cabecera anclada a la retícula** (Quatrième; no fija). 1440: marca en `c1-2`; los siete enlaces del menú, **uno por columna, de la 3 a la 9** (cada uno empieza en el borde izquierdo de su columna; medido: «Encuentro» 75 px cabe en la columna de 85,9 px a 1001). 768: marca `c1-2`, menú en `c3-6`, cuatro enlaces en la primera fila y tres en la segunda, cada uno anclado a una columna. 390: marca `c1-2`, botón «Menú» alineado a la derecha de `c3` (área de 44 × 44 px); alto ≤ 64 px. Menú abierto (390): en el flujo, bajo la cabecera, siete filas de `--t-titulo` (24 px), alto mínimo 48 px cada una, separadas por 1 px `--linea`; el botón pasa a «Cerrar».
**2.0.3 Marca:** «Módulo» en Archivo 600 de 16 px + «369» en Plex Mono 500 de 16 px, separados por `--e-1`. Mismo tamaño; el contraste es de familia, no de escala.
**2.0.4 Menú:** texto grafito; el ítem de la página actual va en **gris** (se apaga, Kurimanzutto) con `aria-current="page"`; hover subraya 1 px (solo con `hover:hover`).
**2.0.5 Pie del sitio:** borde superior 1 px grafito, padding `--e-6` arriba y `--e-9` abajo. 1440: `c1-3` «Módulo 369» + «Galería de arte en línea» (gris); `c4-6` Artistas, Obras, Ediciones, Encuentro; `c7-9` Acerca de, Tienda, Contacto y «modulo369.com» (chico gris). 390: nombre en `c1-3`; enlaces en `c1` y `c2` (cuatro y tres); dominio abajo. Cada enlace del pie con 44 px de alto táctil.

### 2.1 · Inicio `/`

**Ojo primero:** la obra de la lámina 1, pegada al borde derecho, contra el vacío hueso de su izquierda. **Disrupción:** imagen desplazada (la obra corrida a un borde de la lámina) · palabra enorme (ARTISTAS cortada) · color que desentona (la I en cobalto) · palabra casi escondida («Libro»). Son dos gestos visibles y uno que se encuentra; el resto de las vistas lleva uno cada una (el diagnóstico criticó la v1 por juntarlas todas en el inicio como lista de tareas).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Módulo 369» | solo para lectores de pantalla (copy §2.2, opción A; la marca ya lo dice arriba) | igual | igual |
| Lámina del carrusel | `c1-9`, alto `clamp(480px, calc(100svh - 180px), 900px)` | `c1-6`, alto `min(75% del ancho, calc(100svh - 200px))` | `c1-3`, alto `min(125% del ancho, calc(100svh - 230px))` |
| Leyenda (enlace a la ficha: única acción) | `c1-5`, bajo la lámina a `--e-2` | `c1-4` | `c1-3`, línea 1 |
| Controles: «← Anterior» · indicador 01 02 03 04 05 · «Siguiente →» | `c6-9`, alineados a la derecha | `c4-6` | `c1-3`, línea 2, repartidos a lo ancho |
| ARTISTAS (H2 con estilo `--t-enorme`) | desde el borde izquierdo de `c1` hasta el borde derecho de la **ventana** (sangra el margen derecho y se corta) | igual | igual |
| «Ver todo →» | bajo la palabra, a la derecha de `c9` | `c6` | `c3` |
| Tres obras, una por artista, paradas sobre una línea grafito de 1 px, nombre debajo | `[3,3,3]` alineadas **abajo** | `[2,2,2]` | `[1,1,1]` |
| «Libro» (casi escondida) | sola, en `c8`, en el vacío entre artistas y Encuentro | `c5` | `c3`, alineada a la derecha |
| Bloque Encuentro: «ENCUENTRO» (etiqueta), contador 007/369, «activados · de muestra», enlace «Qué es Encuentro →» (botón contorno) | contador `c1-5`; enlace en `c7-9`, alineado a la línea base del contador | contador `c1-5`; enlace debajo en `c1-3` | contador `c1-3`; enlace debajo |
| Ediciones: tres portadas (marcador) y, en la misma fila, «EDICIONES» + «Ver todo →» | portadas `c1-2`, `c3-4`, `c5-6`; rótulo y enlace en `c7-9` alineados abajo (la fila suma 9 con la columna de texto) | portadas `[2,2,2]`; rótulo arriba | rótulo arriba; portadas `[1,1,1]` |

2.1.1 · **Láminas del carrusel** (5, en este orden y con esta posición; la obra se pinta entera, a su proporción, alto completo de la lámina, pegada al borde que dice la tabla; la caja del `img` es la imagen pintada, sin franjas):

| Lámina | Obra | Proporción | Posición en la lámina |
|---|---|---|---|
| 1 | c-04 | 5:4 | derecha |
| 2 | a-07 | 2:3 | izquierda |
| 3 | b-05 | 5:4 | derecha |
| 4 | a-02 | 4:5 | izquierda |
| 5 | c-02 | 1:1 | centro |

A 390 casi todas llenan el ancho; la posición se nota a 768 y 1440. Variedad de artista y de proporción a propósito.
2.1.2 · **Indicador (Schipper):** cinco números en mono chico, cada uno un botón (`aria-label` «1 de 5»…); el activo en grafito con una raya horizontal de 24 px × 1 px grafito a su izquierda; los demás en gris. Es la forma visual del «01 / 05» de Clara (ver §12-1). «← Anterior» y «Siguiente →» se quedan como texto visible, con los `aria-label` de copy §5-1. Medido a 390: cabe en una línea (≈ 300 px de 354).
2.1.3 · **Criterio de pliegue:** a 390 × 664 (Safari con barras) el borde inferior de los controles queda ≤ 664 px; a 1440 × 900, leyenda y controles visibles enteros sin bajar.
2.1.4 · Obras de los artistas en el inicio: a-05, b-05, c-05 (alturas distintas sobre la línea). Nombre debajo de la línea, texto 500.
2.1.5 · Contador del inicio: «007» grafito, «/369» gris (sin cobalto: el cobalto del inicio es la I, D6).
2.1.6 · Entre secciones: `--e-24` a ≥1001, `--e-16` a ≤1000.

### 2.2 · Artistas `/artistas/`

**Ojo primero:** las tres obras paradas sobre la línea, de alturas distintas. **Disrupción:** no exigida por §7; la vista es orden (Schipper).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Artistas» | `c1-3` | `c1-3` | `c1-3` |
| Visión curatorial (corchete) | `c5-8`, en la misma fila que el H1 | `c4-6` | `c1-3`, bajo el H1 |
| Tres artistas: obra sobre línea grafito de 1 px a `--e-2`, debajo nombre (enlace, texto 500) y «01 / 03» (chico gris) a la derecha de la misma celda | `[3,3,3]`, obras alineadas **abajo** | `[2,2,2]` | una artista por fila: obra en `c1-2` y nombre + número en `c3` alineados abajo; la fila siguiente invertida (obra `c2-3`, nombre `c1`); la línea cruza las 3 columnas |

2.2.1 · Obras que representan a cada artista: a-07 (2:3), b-07 (4:5), c-07 (1:1). Ninguna con recorte; nunca retrato.
2.2.2 · Entre filas de artistas (a 390): `--e-9`.

### 2.3 · Artista `/artistas/<a>/`

**Ojo primero:** la obra a todo el ancho; recién después, por contraste, el nombre chico. **Disrupción:** cambio de escala: nombre de 30 px (24 a 390) contra una obra de 1.356 px de ancho; a 390, la obra sale de la retícula a sangre (la única imagen del sitio que deja el margen). **Respaldo:** Kurimanzutto (nombre de 22 px y obra al ancho completo); Studio Iron (secuencia grilla de obras, texto angosto, obra sola).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Artistas» (chico) | `c1` | `c1` | `c1` |
| H1 nombre | `c1-3` | `c1-3` | `c1-3` |
| Statement (corchete, sin rótulo) | `c5-8`, misma fila que el H1 | `c4-6` | `c1-3`, bajo el H1 |
| Obra a todo el ancho (la 3:2 de cada artista: a-01, b-09, c-08) | `c1-9` (1.356 × 904 px a 1440), a `--e-6` del H1; sin tope de alto | `c1-6` | **a sangre**: 100% de la ventana, margen negativo a cada lado |
| H2 «Obras» | `c1-3` | `c1-3` | `c1-3` |
| Las otras 8 obras, con la regla de filas (1.4) y pie sin nombre de artista | `[4,5]` `[2,4,3]` `[2,4,3]` (1.4.3) | `[3,3]` `[2,4]` `[4,2]` `[3,3]` | `[3]` `[1,2]` `[3]` `[2,1]` `[1,2]` |
| H2 «Biografía» + corchete | H2 `c1-3`, texto `c4-6` | H2 `c1-3`, texto `c4-6` | apilado |
| H2 «Historia y proceso» + corchete | igual, fila siguiente | igual | apilado |
| Foto opcional (marcador 4:5) + aviso «Maqueta · Si no hay foto…» | `c7-9`, ocupando las dos filas anteriores | `c1-3`, debajo | `c1-2`, debajo |
| «Artista B →» | a la derecha de `c9` | `c6` | `c3` |

### 2.4 · Obras `/obras/`

**Ojo primero:** la primera fila `[4,5]`. **Disrupción:** no exigida; el reparto cambiante de las filas (`[2,2,2,3]` después de `[2,4,3]`) es el cambio de escala de la vista.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Obras» | `c1-3` | `c1-3` | `c1-2` |
| Conteo «27 obras» (`aria-live`) + «Quitar filtros» (solo con alguno activo) | `c7-9`, a la derecha | `c4-6` | `c3`, a la derecha |
| Fila de filtros, con borde superior 1 px grafito y `--e-2` arriba | Artista `c1-2` · Técnica `c3-4` · Tamaño `c5-6` · Disponibilidad `c7-8` · Vista (Muro · Índice) `c9` | dos filas: `c1-3`, `c4-6` | `<details>` «Filtrar» en `c1-2` (resumen de 44 px) + Vista en `c3`; abierto: los cuatro `select` apilados en `c1-3` |
| Muro | regla de filas 1.4 | 1.4 | 1.4 |
| Estado vacío | «No hay obras con estos filtros.» (texto) + botón contorno «Quitar filtros», `c1-4` | `c1-4` | `c1-3` |

**2.4.1 · Vista Índice (el hallazgo, Escat).**
- 1440: lista en `c1-5`, borde superior 1 px grafito, filas separadas por 1 px `--linea`, alto mínimo 48 px. Cada fila: título de la obra (`--t-titulo`) en `c1-3`, artista (texto) en `c4`, año (chico) en `c5`. Las columnas `c6-9` quedan vacías. La fila activa muestra su obra en `c6-9`, con alto máximo 60svh, con su borde superior a la altura del borde superior de la fila (sin pasarse del final de la lista), en `position: absolute` dentro de la lista. Nunca tapa texto: en `c6-9` no hay texto.
- ≤1000: cada fila reserva su última columna (`c6` / `c3`) para una caja 4:5 vacía; la obra de la fila activa aparece dentro, contenida, arriba a la izquierda. Título en `c1-2` (`--t-titulo` 24 px) y debajo «Artista A · 2025» en chico. No hay saltos de diseño: la caja existe siempre, vacía.
- Qué activa: con `hover:hover`, el cursor o el foco; sin `hover`, la fila que cruza la línea media de la pantalla al bajar (`IntersectionObserver` con `rootMargin: "-50% 0px -50% 0px"`). Una sola activa a la vez. La imagen es `alt=""` + `aria-hidden` (la fila ya nombra la obra).

### 2.5 · Ficha de obra `/obras/<o>/`

**Ojo primero:** la obra. **Disrupción:** cambio de escala: miniaturas de 56 px de alto (48 a 390) bajo una obra de hasta 78svh. **Respaldo:** Quatrième (miniaturas a escala muy chica junto a la grande), PRODn (plana, alineada arriba).

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| Pista general / detalle (scroll-snap, se desliza con el dedo) | `c1-6`; la obra entera a su proporción, alto máximo 78svh, **arriba a la izquierda** | `c1-6` | `c1-3`, alto = ancho ÷ proporción (sin franjas) |
| Miniaturas (dos botones) + «Vista general» / «Detalle» (chico) + «1 / 2» | bajo la pista, desde `c1`, a `--e-2` | igual | igual |
| Artista (enlace, chico) + H1 título | `c7-9`, arriba | bajo la pista, `c1-4` | bajo las miniaturas |
| Datos (`dl`): Año · Técnica · Medidas (alto × ancho) · Precio (solo estados 1 y 2) · Disponibilidad | `c7-9` | `c1-4` | `c1-3` |
| Descripción (corchete) | `c7-9` | `c1-4` | `c1-3` |
| Acciones según el estado (D9) | `c7-9`; botones uno bajo el otro si no caben | en línea | apilados, cada uno a lo ancho de `c1-3` |
| Aviso al tocar Comprar (`role="status"`) | bajo las acciones | igual | igual |
| Línea de estados de muestra (solo con «Lo editas tú» encendida) | bajo el aviso | igual | igual |
| «← Anterior · Todas las obras · Siguiente →» (chico), borde superior 1 px `--linea` | `c7-9` | `c1-6` | `c1-3` |

2.5.1 · **Obras de muestra de cada estado** (las cuatro de Artista A, así María las ve juntas en `#/artistas/a`): estado 1 **a-04** · estado 2 **a-06** (sin precio: «Precio a consultar») · estado 3 **a-05** (vendida) · estado 4 **a-03** (colección privada). Además son estado 2 **b-04** y **c-05**; el resto de las disponibles es estado 1 con «[precio]» y link de muestra.
2.5.2 · El detalle tiene la misma proporción que la vista general (M02), así que cambiar de imagen no mueve nada debajo.
2.5.3 · La miniatura activa lleva una línea de 1 px grafito bajo su rótulo; las otras, nada. Estado de interfaz en grafito, nunca cobalto.

### 2.6 · Ediciones `/ediciones/`

**Ojo primero:** las tres portadas. **Disrupción:** no exigida.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Ediciones» | `c1-3` | `c1-3` | `c1-3` |
| Presentación (corchete) y tres portadas en la misma fila | texto `c1-3`; portadas 3:4 en `c4-5`, `c6-7`, `c8-9` (la fila suma 9 con la columna de texto) | texto `c1-6` arriba; portadas `[2,2,2]` | texto arriba; portadas `[1,1,1]` |
| Pie de cada portada: «Cuaderno · Edición 01» | bajo la portada a `--e-2` | igual | igual |

### 2.7 · Edición `/ediciones/<e>/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Ediciones» | `c1` | `c1` | `c1` |
| Portada (marcador 3:4) | `c1-3` | `c1-3` | `c1-2` |
| Tipo (etiqueta), H1, descripción (corchete), «DETALLES» + `dl`, botón lleno «Comprar en Amazon» + enlace «Edición en inglés →» | `c5-8` | `c4-6` | `c1-3`, debajo |
| H2 «Páginas interiores» + dos marcadores 3:2 | H2 `c1-3`; marcadores `c4-6` y `c7-9` | H2 arriba; `[3,3]` | H2; `[3]`, `[3]` |

### 2.8 · Encuentro `/encuentro/`

**Ojo primero:** el contador 007/369. **Disrupción:** cambio de escala (contador de 200 px) · color que desentona (la «/» en cobalto) · el enlace vertical «Libro» de su boceto.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 = etiqueta «ENCUENTRO» + contador (un solo `h1` con `aria-label` «Encuentro, 7 de 369 activados») | etiqueta `c1`; contador `c1-5` | `c1-5` | `c1-3` (272 px) |
| «activados · de muestra» (chico) | bajo el contador | igual | igual |
| Enlace vertical «Libro →» (`writing-mode: vertical-rl`, chico mayúscula, línea 1 px grafito a su izquierda, área táctil 44 px de ancho) | borde derecho de `c9`, arriba alineado con el contador | borde derecho de `c6` | borde derecho de `c3`. **Medido:** a 72 px el contador termina en x ≈ 290 y el enlace empieza en x ≈ 328 |
| H2 «Qué es» + corchete + marcador «[Foto de la caja]» 4:3 | H2 `c1-3`, texto `c4-6`, marcador `c7-9` | H2 `c1-3`, texto `c4-6`, marcador `c1-3` debajo | apilado |
| H2 «Cómo funciona» + corchete + aviso «Maqueta · Por decidir…» | H2 `c1-3`, texto `c4-6`, aviso `c7-9` | texto `c4-6`, aviso debajo | apilado |
| H2 «Formas de activación» + corchete | H2 `c1-3`, texto `c4-6` | igual | apilado |
| H2 «Preguntas frecuentes» + corchete + 3 `<details>` | H2 `c1-3`, texto y preguntas `c4-6` | igual | apilado |
| Botón lleno «Activar un encuentro →» | desde `c4` | desde `c4` | `c1-3` |

2.8.1 · Contador: «007» grafito, «/» **cobalto**, «369» gris. **Criterio:** el borde derecho de la tinta del contador queda a la izquierda del enlace vertical a 390, 768 y 1440 (`getBoundingClientRect`).

### 2.9 · Activar un encuentro `/encuentro/activar/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Encuentro» + H1 | `c1-4` | `c1-4` | `c1-3` |
| Proceso · Qué recibes · Tiempos · Registro fotográfico (etiqueta + corchete cada uno, una idea por columna, Taradash) | `c1-2`, `c3-4`, `c5-6`, `c7-8` | `c1-3`, `c4-6` (dos filas) | apilados |
| Aviso «Maqueta · Por decidir: si la caja se pide…» | `c1-4` | `c1-4` | `c1-3` |
| Opción 1: H3 «Pedir la caja» + formulario (Nombre, Correo + ayuda, pregunta de María, botón lleno «Enviar solicitud») | `c1-4` | `c1-4` | `c1-3` |
| Opción 2: H3 «Comprar la caja», «[precio de la caja]», botón lleno «Comprar con Mercado Pago» | `c6-8` | `c1-4`, debajo | apilado |

Cada opción tiene un solo botón lleno; la página tiene dos porque la decisión §9-4 está abierta y la maqueta muestra las dos.

### 2.10 · Libro `/encuentro/libro/`

**Ojo primero:** la grilla de 369 con siete casillas oscuras. **Disrupción:** no exigida; la grilla de 9 × 41 es el orden más estricto del sitio.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| «← Encuentro» + H1 «Libro» | `c1-3` | `c1-3` | `c1-3` |
| Bajada (texto) + contador «Activados: 7 de 369 · los 7 son de muestra» (chico) | `c4-6` | `c4-6` | `c1-3` |
| Grilla de 369 (su propio módulo: 369 = 9 × 41) | `c1-9`, **41 casillas por fila, 9 filas** (≈30 px cada una a 1440), calle de 3 px | 9 por fila | 9 por fila (≈37 px) |
| Aviso «Maqueta · En el sitio, mientras no haya…» | bajo la grilla, `c1-4` | `c1-4` | `c1-3` |

2.10.1 · Casilla vacía: borde 1 px `--linea`, número en chico gris (los 369 números visibles: la numeración es el contenido). Casilla activa (001 a 007): fondo grafito, número en hueso, es enlace. Sin imágenes en las casillas (un encuentro no es una obra de artista, C10). Sin cobalto (D6) y sin marca de «próximo».
2.10.2 · Área táctil de las casillas activas a 390: la casilla mide ≈37 px; un `::after` con `inset: -4px` la lleva a ≥ 44 px. Las vacías no son interactivas (`aria-hidden`).

### 2.11 · Encuentro activado `/encuentro/libro/<nnn>/`

**Ojo primero:** el contador 001/369.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| Contador «001/369» (`h1` con `aria-label` «Encuentro 001 de 369»; «/» en **cobalto**) | `c1-5` | `c1-5` | `c1-3` |
| «De muestra» (chico) + `dl` Fecha / Lugar (corchetes) + descripción (corchete) + «← Libro» | `c7-9`, alineado abajo con el contador | debajo, `c1-4` | debajo |
| Marcador «[Registro fotográfico · encuentro 001]» 4:3 | `c1-6`, debajo | `c1-6` | `c1-3` |

2.11.1 · **Criterio (C10):** a 1440 y a 1280, el borde derecho de la tinta del contador queda a la izquierda del borde izquierdo de la ficha (medido en la spec: 756 px de contador terminan en x ≈ 798; `c7` empieza en x ≈ 958).

### 2.12 · Acerca `/acerca/`

**Ojo primero:** las tres palabras escalonadas.

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 + enunciado (corchete) | H1 `c1-3`, enunciado `c4-6` | igual | apilado |
| «mirar · seleccionar · decidir» (`--t-titulo`, sin rótulo) | una fila: «mirar» en `c1`, «seleccionar» en `c4`, «decidir» en `c7` | `c1`, `c3`, `c5` | escalera: tres filas, la primera palabra en `c1`, la segunda en `c2`, la tercera en `c3` |
| Desarrollo (corchete) + aviso «Maqueta · Las tres palabras…» | texto `c4-6`, aviso `c7-9` | texto `c4-6` | apilado |
| H2 «Criterio curatorial» + corchete; H2 «Visión» + corchete | H2 `c1-3`, texto `c4-6` | igual | apilado |
| «Ver los artistas →» | desde `c4` | desde `c4` | `c1` |

Sin obra y sin persona (brief §7: «no es una bio personal»). La prohibición Perrotin de «vista sin obra» se refiere a blanco intenso con texto negro: sobre hueso, Acerca, Activar, Libro y Contacto pueden ser de texto.

### 2.13 · Tienda `/tienda/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Tienda» | `c1-3` | `c1-3` | `c1-3` |
| H2 «Obras disponibles» + «Ver todas en Obras →» | H2 `c1-3`, enlace a la derecha de `c9` | igual en `c6` | apilado |
| Tres obras, la primera de estado 1 de cada artista (a-01, b-02, c-02), regla de filas | `[2,4,3]` (cierre k=3) | `[2,2,2]` | `[1,1,1]` |
| H2 «Encuentro» + corchete + botón contorno «Comprar la caja» + «Activar un encuentro →» | H2 `c1-3`, texto `c4-6`, acciones `c7-9` | texto `c4-6`, acciones debajo | apilado |
| H2 «Ediciones» + tres portadas | H2 `c1-3`; portadas `c4-5`, `c6-7`, `c8-9` | H2 arriba; `[2,2,2]` | H2; `[1,1,1]` |
| H2 «Cómo se compra» + cuatro párrafos (Obras, Consultas, Encuentro, Ediciones), una idea por columna | H2 `c1-3`; párrafos en `c4-6` y `c7-9`, dos filas | `c1-3` y `c4-6` | apilados |
| Aviso del carrito | `c4-7` | `c1-4` | `c1-3` |

### 2.14 · Contacto `/contacto/`

| Bloque | 9 col | 6 col | 3 col |
|---|---|---|---|
| H1 «Contacto» | `c1-3` | `c1-3` | `c1-3` |
| Formulario (Nombre, Correo + ayuda, Consulta, chip de obra cargada si viene de una ficha, botón lleno «Enviar consulta») | `c1-4` | `c1-4` | `c1-3` |
| Correo + aviso · Instagram (corchete) · Newsletter (campo + botón contorno «Suscribirme») + aviso | `c6-8` | debajo, `c1-4` | debajo |

### 2.15 · 404

H1 «Esta página no existe.» en `c1-6`; botón contorno «Ver las obras →» y enlace «Ir al inicio» debajo. Mismo vacío arriba que las demás.

---

## 3 · Plan de media

### 3.1 · Slots

| # | Slot | Qué va | Origen | Ratio | Tratamiento |
|---|---|---|---|---|---|
| 3.1.1 | Láminas del carrusel (5) | c-04, a-07, b-05, a-02, c-02 | Generado (relleno, M01) | El de cada obra | Plana, entera, pegada al borde de 2.1.1; la 1 con `loading="eager" fetchpriority="high"`, las otras `lazy` |
| 3.1.2 | Obras del inicio (3) | a-05, b-05, c-05 | Generado | Natural | Paradas sobre la línea, alineadas abajo |
| 3.1.3 | Índice de Artistas (3) | a-07, b-07, c-07 | Generado | Natural | Igual |
| 3.1.4 | Obra a todo el ancho de Artista (1 por artista) | a-01, b-09, c-08 (3:2) | Generado | 3:2 | `c1-9` o a sangre a 390; `eager` |
| 3.1.5 | Muro, Artista, Tienda | las 27 | Generado | Natural | Regla de filas 1.4, alineadas arriba, `max-height: 80svh` |
| 3.1.6 | Hallazgo del Índice | la obra de la fila activa | Generado | Natural, contenida | 2.4.1; `alt=""` + `aria-hidden` |
| 3.1.7 | Ficha · vista general | la obra | Generado | Natural | 2.5; `eager` |
| 3.1.8 | Ficha · detalle | recorte de la misma obra (M02) | Generado | **El mismo de la obra** | Igual que la general |
| 3.1.9 | Miniaturas de la ficha (2) | general y detalle | Variantes de 600 px | Natural | 56 px de alto (48 a 390), dentro de un botón de 44 × 48 px mínimo |
| 3.1.10 | Portadas de ediciones (3) | **falta el activo** | Marcador dirigido | 3:4 | `.marcador-img`, texto «[portada]» / «[cover]» (§12-2); `role="img"` + `aria-label` con el `alt` de Clara («Portada de relleno: Edición 01») |
| 3.1.11 | Páginas interiores (2 por edición) | **falta** | Marcador dirigido | 3:2 (doble página abierta) | «[página interior]» / «[inside page]» |
| 3.1.12 | Foto de la caja Encuentro | **falta** | Marcador dirigido | 4:3 | «[Foto de la caja]» / «[Photo of the box]» |
| 3.1.13 | Registro de cada encuentro activado | **falta** | Marcador dirigido | 4:3 | «[Registro fotográfico · encuentro 001]» |
| 3.1.14 | Foto opcional de la artista | **falta** | Marcador dirigido | 4:5 | «[Foto opcional, por ejemplo del taller]»; nunca un retrato como representación |
| 3.1.15 | Casillas del Libro | sin imagen | n/a | 1:1 | 2.10.1 |

**3.1.16 · Marcador dirigido (`.marcador-img`):** fondo `--hueso-2`, ratio fijo con `aspect-ratio`, texto en chico **grafito** (12,98:1; el gris daba 4,24 con el valor viejo), centrado, padding `--e-2`, sin borde, sin icono, sin degradé. Reserva el espacio real del activo que falta.
**3.1.17 · `alt`:** los de copy §4.1 y §4.3 («Obra de relleno: Campo 04, de Artista A», más «. Vista general» / «. Detalle» en la ficha).

### 3.2 · M01 · Regenerar el relleno (precondición de C06; incluye C33)

Sin esto, las obras planas no se ven (D12). Cambios en `maqueta/generar_obras_relleno.py`:
- **Papel de B:** `(236, 231, 220)` → `(210, 202, 186)` (cartón claro, cálido).
- **Papel claro de C:** `(240, 236, 228)` → `(214, 215, 210)` (gris frío). Los tres C de papel negro no cambian.
- **a-08:** su paleta `[(232,226,214), (40,60,120), (210,204,190)]` pasa a `[(178,170,150), (150,96,60), (210,204,190)]`: fondo distinto del hueso y sin el azul que compite con el cobalto.
- **Desenfoque de A:** `GaussianBlur(min(w, h) * 0.018)` → `* 0.004` (menos Rothko borroso, C33).
- **Quitar el punto `(31, 59, 214)` de C** (c-03 y c-08): es exactamente el cobalto del sitio dentro de una obra, y haría inauditable la regla D6.
- **Criterio, con el mismo script de medición (franja de 12 px del borde):** las 27 obras quedan a distancia RGB ≥ 20 del hueso (calculado para los papeles nuevos: B ≈ 58, C ≈ 34, a-08 ≈ 116). Ningún píxel `#1F3BD6` en ninguna obra.
- **Herramienta:** el generador necesita numpy y el venv de scratchpad **no la tiene** (verificado hoy): `scratchpad/venv/bin/python -m pip install numpy` antes de correrlo. Si no se puede instalar, Diego lo escribe en `desvios.md` y lo sube: sin M01, C06 no se cumple.

### 3.3 · M02 · Variantes y detalle (C19)

- `maqueta/variantes.py` (no se publica) genera por cada obra `NN-600.jpg` y `NN-1200.jpg` (ancho, LANCZOS, `quality=78, optimize=True, progressive=True`) y `NN-detalle.jpg`: **recorte centrado del 50% del ancho y del alto del original, con la misma proporción, guardado a su tamaño nativo (800 px de lado largo), sin agrandar.**
- `srcset="…-600.jpg 600w, …-1200.jpg 1200w, ….jpg 1600w"`, `src` = la de 1200. `sizes` por slot, calculado con los anchos de 1.3.9: lámina `(max-width:620px) 92vw, (max-width:1000px) 92vw, 64vw`; Artista ancho completo `(max-width:620px) 100vw, 94vw`; obras en filas `span ÷ columnas × 94vw` en cada corte; ficha `(max-width:1000px) 92vw, 62vw`; Índice `(max-width:1000px) 30vw, 41vw`; miniaturas: solo la de 600.
- `width` y `height` (los de la variante de 1200) en todo `<img>`.
- **Criterios:** a 390 con DPR 3, `#/obras` no pide ningún JPG de 1.600 px; ninguna variante de 600 o 1200 pesa más de 250 KB.

---

## 4 · Estados e interacción

| # | Pieza | Reposo | Hover (solo `@media (hover:hover)`) | Foco visible | Activo | Deshabilitado |
|---|---|---|---|---|---|---|
| 4.1 | Botón lleno | fondo grafito, texto hueso 500, borde 1 px grafito, padding `--e-2` × `--e-3`, alto mínimo 44 px | fondo hueso, texto grafito (se invierte) | contorno 2 px grafito, separación 3 px | como hover | texto gris, borde `--linea`, fondo hueso, sin hover |
| 4.2 | Botón contorno | fondo hueso, texto grafito, borde 1 px grafito | fondo grafito, texto hueso | igual | como hover | igual |
| 4.3 | Enlace de navegación («Ver todo →», «← Artistas», pie) | chico o texto, grafito, sin subrayado; área táctil 44 px de alto | subrayado 1 px, separación 4 px | igual | n/a | n/a |
| 4.4 | Ítem del menú | grafito | subrayado 1 px | igual | página actual: **gris**, sin subrayado, `aria-current` | n/a |
| 4.5 | Tarjeta de obra (enlace) | imagen + pie | subrayado 1 px en la línea del título; la imagen no cambia | contorno 2 px alrededor de la tarjeta | n/a | n/a |
| 4.6 | Herramientas (Lo editas tú, Retícula, ES, EN; Muro/Índice) | chico gris, `aria-pressed="false"` | grafito | igual | `aria-pressed="true"`: grafito + subrayado 1 px | n/a |
| 4.7 | Campo de texto y `select` | texto 16 px grafito, fondo hueso, borde inferior 1 px grafito, padding `--e-2` 0, alto mínimo 44 px, radio 0 | n/a | contorno 2 px grafito (además del borde) | n/a | n/a |
| 4.8 | Label de campo | etiqueta (chico mayúscula gris) sobre el campo, a `--e-1` | | | | |

4.9 · **Foco:** nunca `outline: none` sin reemplazo; el contorno es grafito en todo el sitio (el cobalto de la v1 en `:focus-visible` sale, D6). Sobre un botón lleno o una casilla activa el contorno queda afuera, sobre hueso, y se ve.
4.10 · **Validación propia** (`novalidate`), para que los mensajes salgan en el idioma de la página (copy §4.5): al enviar, cada campo con error recibe `aria-invalid="true"`, borde inferior de 2 px grafito y su mensaje de Clara debajo en chico grafito, enlazado con `aria-describedby`. Sin color de error: no hay token rojo y el mensaje no depende del color. Si todo está bien: aparece el aviso «Maqueta · No se envió nada…» con `role="status"`.
4.11 · **Avisos al tocar** (Comprar, Comprar la caja, Amazon, enlace del otro idioma, Suscribirme): el enlace o botón hace `preventDefault` y muestra su aviso debajo (`role="status"`, chico gris). Nunca un `alert()`.
4.12 · **Estado vacío:** Obras (2.4). Tienda sin disponibles: texto de Clara + «Ver todas las obras →» (no se alcanza con el relleno, pero se construye).
4.13 · **Carga:** los `<img>` reservan su espacio con `width`/`height`; mientras cargan muestran `--hueso-2`. En las láminas y en la ficha, la caja del `img` es la imagen pintada, así que ese fondo nunca queda como franja.
4.14 · **Error:** la 404 (2.15). Toda ruta desconocida termina ahí.
4.15 · **Nav al bajar:** nada. La cabecera y el aviso se van con la página. No hay barra que aparezca al subir.
4.16 · **Menú a 390** (D8): botón con `aria-expanded` y `aria-controls`; abre en el flujo; se cierra con el mismo botón, con Escape y al navegar. El foco queda en el botón.
4.17 · **Carrusel:** pista con `overflow-x: auto`, `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, sin barra visible; cada lámina `scroll-snap-align: start`; `tabindex="0"` y flechas izquierda/derecha; el indicador y la leyenda se actualizan con el scroll (listener pasivo). Sin avance automático. `aria-roledescription="carrusel"` y etiquetas de copy §5-1.
4.18 · **Ficha, general/detalle:** misma mecánica que el carrusel; las miniaturas son botones con `aria-pressed`.
4.19 · **Filtros:** cada `select` filtra por su propio campo (técnica por la técnica de la obra, no por la artista: el error de la v1 en `app.js` L190), se combinan, el conteo se actualiza con `aria-live="polite"` y aparece «Quitar filtros» con alguno activo.
4.20 · **Idioma:** ES/EN con `aria-pressed`, `aria-label` «Español» / «English»; cambia `document.documentElement.lang` a `es-CL` o `en`; se guarda y se mantiene al navegar (brief §7). La palabra enorme cambia de tamaño con el idioma (1.2.1).
4.21 · **Áreas táctiles:** todo lo interactivo mide ≥ 44 × 44 px en su caja (con padding y, en la barra de aviso, margen negativo para no agrandar la línea). Sin excepciones: las casillas del Libro llegan a 44 px con 2.10.2.
4.22 · **iOS:** `-webkit-text-size-adjust: 100%`; viewport sin `viewport-fit=cover` y sin `maximum-scale` (C39, C02).

---

## 5 · Breakpoints

| # | Corte | Columnas | Por qué ahí | Qué se reordena |
|---|---|---|---|---|
| 5.1 | ≥ 1001 px | 9 | iPad horizontal (1024, 1180) y escritorio; medido: a 1001 la columna mide 85,9 px y el ítem más largo del menú, 75 px | Cabecera de un ítem por columna; ficha en dos columnas; Índice con imagen en `c6-9` |
| 5.2 | 621 a 1000 px | 6 | iPad vertical (768, 820, 834) y celular horizontal (844 × 390) | Menú en dos filas; ficha apilada; Índice con caja reservada; contador de 140 px |
| 5.3 | ≤ 620 px | 3 | Todos los celulares en vertical (375 a 430) | Menú plegable en el flujo; filtros plegados; Artista a sangre; artistas de a uno por fila; contador de 72 px; barra de aviso en tres líneas |

5.4 · Son los cortes de la v1 (1000 y 620): se conservan para no reescribir lo que ya funciona. No hay ancho máximo de contenido: sobre 1440 la retícula sigue estirándose, como en las referencias.
5.5 · Además: `@media (hover:hover)` para todo hover (C02) y `@media (prefers-reduced-motion: reduce)` (1.7).

---

## 6 · Capa de señales (de Simón, `senales.md` §12)

6.1 · `<meta name="robots" content="noindex, nofollow">` en `index.html` y `_headers` con `/*` → `X-Robots-Tag: noindex, nofollow`. Nada de `robots.txt` con `Disallow`.
6.2 · Sin JSON-LD, canonical, hreflang, sitemap ni enlaces a modulo369.com.
6.3 · `<title>` por vista con el formato de Clara (copy §3.5): `{vista} · Módulo 369 · maqueta` / `{view} · Módulo 369 · mock-up`; inicio `Módulo 369 · maqueta`.
6.4 · `lang` del documento cambia con ES/EN (4.20).
6.5 · `og:title` «Módulo 369 · maqueta v2» y `og:description` «Maqueta para la reunión del 6 de octubre. Obras y artistas de relleno.», **sin `og:image`** (la miniatura mostraría una obra de relleno como real).

---

## 7 · Lo que esta spec prohíbe explícitamente

Cada ítem es **regla**: no vuelve en ninguna pasada. Entre paréntesis, de dónde sale.

- **P1 · Nada fijo ni pegado:** cero `position: fixed` y cero `position: sticky` en el sitio. Única excepción: `.reticula` (herramienta de maqueta, `aria-hidden`, `pointer-events: none`, apagada por defecto). (María contra Escat; brief §7; D8)
- **P2 · Nada encima de una obra:** ni texto, ni leyenda, ni número, ni etiqueta de «Lo editas tú», ni controles. El pie va debajo. (PRODn; María)
- **P3 · Obra sin envoltorio:** sin paspartú, marco, caja, fondo visible alrededor, borde, contorno ni sombra; sin `object-fit: cover` (no se recorta obra de nadie). (PRODn; C06)
- **P4 · Cero profundidad:** sin `box-shadow`, `drop-shadow`, `filter` (incluido `blur`), `backdrop-filter`, `mix-blend-mode` ni la propiedad `transform` (`text-transform` es otra cosa y se usa en 1.2.8). (1.6; Perrotin)
- **P5 · Cero blanco:** ningún `#fff`, `white` ni `rgb(255,255,255)`; ningún color fuera de los seis tokens. (María contra Perrotin; brief §7)
- **P6 · Cobalto solo en su lista de tres** (D6). Nunca en foco, hover, página actual, enlace, botón, borde, fondo, estado, retícula, «Lo editas tú» ni dentro de una obra de relleno.
- **P7 · Dos familias:** sin Instrument Serif ni ninguna otra; sin itálica. (D7)
- **P8 · Sin tamaños de letra fuera de la escala** (1.2.7) **ni espaciados fuera de la escala** (1.3.11).
- **P9 · Radio 0 en todo**; sin círculos de estado. (1.5)
- **P10 · Sin desplazamientos que pisen:** ningún elemento se superpone a otro (salvo la retícula y la imagen del hallazgo sobre columnas vacías). Se mide con `getBoundingClientRect` en Inicio, Artista, Obras y Ediciones. (C01)
- **P11 · Sin carrusel enmarcado:** la lámina no tiene fondo, borde ni sombra; sin copia desenfocada detrás; sin avance automático. (C04; diagnóstico, descartado)
- **P12 · Sin animación de aparición al bajar y sin `scale` en hover.** (1.7.4; Schipper excluido)
- **P13 · Artistas:** ninguna representada por un retrato; nunca una lista de nombres sin obra. (Kurimanzutto; Perrotin; brief §7)
- **P14 · Cero cifras de precio** y cero signo «$» en la maqueta. (brief §6)
- **P15 · Sin rayas largas ni medias** en textos visibles ni en `content:` de CSS. (manual de marca; copy §0)
- **P16 · Sin fakes de CSS para imágenes que faltan:** ni tapas compuestas, ni lomos con degradé, ni salas dibujadas. Marcador dirigido (3.1.16). (tell #9; D16)
- **P17 · Sin información que solo aparezca con cursor:** todo lo que el hover muestra también aparece en el iPhone (el hallazgo del Índice se activa al bajar). (2.4.1)
- **P18 · Sin franja lateral decorativa** (`border-left` de color en avisos o tarjetas). (tell #6; D10)
- **P19 · Sin `transition: all`** y sin `outline: none` sin reemplazo. (antislop C2, C6)
- **P20 · Sin emoji** ni iconos de relleno; las flechas son el carácter «→» / «←».
- **P21 · Sin `maximum-scale` ni `user-scalable=no`.** (C02)
- **P22 · Nada de la maqueta llega a producción:** la retícula, «Lo editas tú», los avisos, los corchetes y `img/`. (brief §6, §8-4)
- **P23 · Sin panel dibujado ni páginas de reunión** (`#/panel`, `#/idea`, `#/incluido`, `#/decisiones`), ni enlace «Reunión →». (brief §3, §8-3)

---

## 8 · Capas de la maqueta

### 8.1 · «Lo editas tú» (aprobada por Ramón, brief §10)

- **8.1.1 · Cómo se activa:** botón «Lo editas tú» / «What you edit» en la barra de aviso, visible en los tres anchos, con `aria-pressed`. Alterna `body.ver-edita`. Se mantiene al navegar dentro de la sesión (la clase vive en `body`).
- **8.1.2 · Cómo se ve:** cada pieza marcada recibe un contorno de 1 px **discontinuo grafito** con separación de 4 px; las piezas de texto fijo, contorno de 1 px **punteado gris**. La etiqueta es un bloque insertado **antes** de la pieza, dentro del flujo (`::before`, `display: block`, `grid-column: 1 / -1` cuando el contenedor es grilla): chico en minúscula normal (sin mayúsculas), texto hueso sobre fondo grafito, padding `--e-1` × `--e-2`, a `--e-1` de la pieza. Al encender la capa el contenido baja: es esperado.
- **8.1.3 · Lo que no hace:** no tapa ni tiñe obras (la etiqueta va antes de la pieza, nunca sobre la imagen; el atributo nunca va en un `<img>`); no usa cobalto (gastaría la disrupción) ni blanco.
- **8.1.4 · Una etiqueta por tipo de pieza por vista:** la primera pieza de cada tipo lleva etiqueta y contorno; las demás del mismo tipo, solo contorno. (27 etiquetas iguales en el muro serían ruido.)
- **8.1.5 · Qué piezas marca** (textos de copy §8, ES y EN):

| Pieza | Dónde va el atributo |
|---|---|
| Carrusel de portada | la sección `.carrusel` (no la pista: un `::before` en la pista sería una lámina más) |
| Tarjeta de obra | la tarjeta (primera del muro, de Artista y de Tienda) |
| Datos de la ficha: fila Disponibilidad y fila Precio | el `dd` de cada una |
| Índice de Artistas | la sección de la grilla de artistas |
| Cabecera de la página de artista | el bloque H1 + statement |
| Tapa de edición | la primera portada |
| Casilla activa del Libro y ficha del encuentro | la grilla del Libro; el bloque de datos del encuentro |
| Contador del Libro y de Encuentro | el bloque del contador |
| Todo texto entre corchetes | el primer `.pendiente` de la vista |
| Correo e Instagram de Contacto | su bloque |
| Texto fijo (menú, pie, el botón principal de cada vista, «Cómo se compra») | contorno punteado gris y la etiqueta de texto fijo |

- **8.1.6 · Ficha:** con la capa encendida aparecen además la línea «Estado X de 4 · …» y «Ver estado 1 · 2 · 3 · 4» (copy §5-5), en chico grafito, que enlazan a a-04, a-06, a-05 y a-03.
- **8.1.7 · Las etiquetas marcadas (v) en copy §8** se construyen o se borran antes de la reunión (copy §10-12): no es decisión visual.

### 8.2 · Retícula (herramienta de maqueta, no va a producción)

- **8.2.1 · Activación:** botón «Retícula» / «Grid» con `aria-pressed`; `body.ver-reticula`. Apagada al cargar.
- **8.2.2 · Cómo se ve:** capa `position: fixed`, `inset: 0`, `pointer-events: none`, `z-index: 50`, `aria-hidden`, con el mismo margen y calle que la retícula del ancho (9 · 6 · 3 columnas). Cada columna **sin relleno**: solo sus dos bordes como línea doble de 1 px grafito más 1 px hueso al lado (se ve sobre lienzo hueso y sobre obras oscuras sin teñirlas). Arriba de cada columna, su número (1 a 9) en chico grafito sobre un chip hueso.
- **8.2.3 · Por qué así y no en cobalto (C03):** el cobalto es la disrupción del diseño; si la herramienta que explica la retícula lo usa en cada columna, María lo va a leer como parte del sitio. Y el relleno de color de la v1 teñía las obras de lavanda (brief §8-4).
- **8.2.4 · Criterio:** con la capa encendida a 1440, 768 y 390 se ven 9, 6 y 3 columnas numeradas, y ninguna obra cambia de color (muestreo de píxeles dentro de una obra, lejos de las líneas, igual con y sin capa).

### 8.3 · Aviso global y avisos de maqueta

- 8.3.1 · Aviso global: 2.0.1 (texto de copy §3.1, versión completa en todos los anchos).
- 8.3.2 · Avisos de maqueta (`.nota-maqueta`): chico gris, minúscula normal, empiezan con «Maqueta ·» / «Mock-up ·» en el texto, ancho máximo 4 columnas a 1440; sin franja lateral, sin fondo, sin icono. Los «en línea» de copy §7 están siempre visibles; los «al tocar», ocultos hasta el toque.
- 8.3.3 · Sin botón «Notas» (D10).
- 8.3.4 · Corchetes (`.pendiente`): texto 16 px gris, sin itálica; el corchete es la marca.

---

## 9 · Cambios C01 a C41 del diagnóstico: qué entra en la v2

**Nivel 1** = imprescindible para mañana. **Nivel 2** = si alcanza, en este orden. **No** = no entra, con su porqué.

| C | Nivel | En la v2 | Por qué |
|---|---|---|---|
| C01 | 1 | Sí, reformulado: sin `.corrida` ni `translateY`; el desplazamiento sale de la regla de filas (1.4); enlace vertical en la última columna en los tres anchos (2.8) | La superposición medida (30 y 39 px) se lee como error |
| C02 | 1 | Sí, por la escala: campos de 16 px, 44 px táctiles, `text-size-adjust` | María prueba en su iPhone |
| C03 | 1 | Parcial: texto de Clara, botones Lo editas tú / Retícula / ES / EN; retícula en grafito numerada sin relleno. **Sin** «Reunión →» ni «Notas» | Páginas de reunión fuera del brief; D10 |
| C04 | 1 | Sí, con D1: lámina en `c1-9`, leyenda debajo, indicador de Schipper, cinco obras de 2.1.1 | Primera pantalla |
| C05 | 1 | Parcial: fuera las explicaciones del concepto; palabra enorme cortada, pero «ARTISTAS» (D2); escondida «Libro» (D3); H1 solo para lectores | Copy §2 |
| C06 | 1 | Sí, junto con M01 | D12: sin M01, 15 obras desaparecen |
| C07 | 1 (último del nivel) | Sí, reformulado: imagen en su columna, `absolute` y no `sticky`; también al bajar en el iPhone (2.4.1) | El único hallazgo del recorrido; C07 lo apagaba en pantallas táctiles |
| C08 | 1 | Sí: «Libro» en enlace, rutas `#/encuentro/libro` (alias `archivo`), ediciones «Edición 01…» | Su palabra |
| C09 | 1 | En la versión de Clara: corchetes y un aviso de decisión, **sin** los procesos A y B; marcador de la caja | Copy §5-8: no se le escribe el proceso a María |
| C10 | 1 | Sí: 9 × 41, sin imágenes en casillas, contador que no pisa la ficha; **sin** cobalto en el próximo | D6 |
| C11 | 1 | Sí, vía copy | Autoría visible |
| C12 | 1 | Parcial: estilo de aviso (8.3.2) sin franja y sin interruptor | D10 |
| C13 | 1 | Sí, vía copy (2.13) | Criterio §7 de Tienda |
| C14 | 1 | Sí (4.11) | Un botón mudo parece roto |
| C15 | 1 | Sí, rediseñada (8.1): grafito, en el flujo, sin cobalto ni blanco | Aprobada por Ramón |
| C16 | No | | Brief §8-3 y §10: sin panel simulado |
| C17 | No | | Fuera del mapa (§3) |
| C18 | No | | Fuera del mapa (§3) |
| C19 | 1 | Sí, más el detalle de la ficha (M02) | Peso en datos móviles; criterio §7 de la ficha |
| C20 | 1 (lo hace Diego con Ramón) | Sí: `_headers` noindex, deploy a `modulo369-maqueta.pages.dev` | OK de Ramón en brief §10 |
| C21 | No | Reemplazado por la regla de filas | D5 |
| C22 | 1 parcial | Grilla de 3 (D4); **sin** selector 3·6·9 | D4 |
| C23 | 1 | Sí (4.19) | Es criterio del brief §7, no opcional |
| C24 | 2 (primero) | Volver de la ficha conserva scroll y filtros | Útil en el iPhone; no lo pide el brief |
| C25 | 1 parcial | Filtros plegados en `<details>` a 390; **sin** el zigzag (manda 1.4) | Primera obra más arriba |
| C26 | 1 | Sí, en el flujo y no como capa fija | D8 |
| C27 | No | Reemplazado por D6 | Estados de datos en cobalto lo vuelven código |
| C28 | 1 | Vía copy | |
| C29 | No | | Fuera del mapa |
| C30 | No | | Sin panel simulado |
| C31 | No | Reemplazado por 2.6 y marcadores | El lomo con degradé es un fake de CSS (P16) |
| C32 | No | | Pregunta §9-3 abierta; fuera del mapa y del copy |
| C33 | 1 | Dentro de M01 | Azul que compite y Rothko borroso |
| C34 | 2 | Favicon «369» en mono grafito sobre hueso y apple-touch-icon | Pestaña del iPhone |
| C35 | 1 | Sí, decidido ahora (D7, 1.2) | La serif no tiene trabajo; María no vio la v1 |
| C36 | 1 | Sí, con la escala de 6 (1.3); **sin** `.vacio{36vh}` | El vacío es el de arriba y el de entre filas, medido |
| C37 | 1 parcial | Dos imágenes y miniaturas (2.5); botones, no enlaces (D9); **sin** vista de sala ni reverso | Brief §4 y §7 |
| C38 | 1 parcial + 2 | Nivel 1: title por vista, `lang`, `aria-live` del conteo, `h1` de Encuentro. Nivel 2: foco al `h1` al navegar y «Ir al contenido» | VoiceOver en el iPhone |
| C39 | 1 | Gris `#5E5A53`, sin `viewport-fit=cover`, nada bajo 12 px | D13 |
| C40 | 1 | Vía copy: foto opcional y «Proceso» en Activar | Viñetas de su mapa |
| C41 | No | | Necesita fotos con licencia y OK; el inicio negro reabre la dirección (brief §8-5) |

---

## 10 · Orden de construcción y cómo se verifica

### 10.1 · Orden (todo sobre `styles.css`, `app.js`, `index.html` en `claude/maqueta-v2`; `?v=N` sube en cada archivo tocado)

1. **Base:** tokens (§1), fuentes sin la serif, escala, retícula con margen y calle nuevos, regla de filas como función (`filas(lista, columnas)`), `@media (hover:hover)`, reduced-motion. Sacar estilos en línea con valores sueltos.
2. **M01 + M02:** instalar numpy, regenerar, medir bordes, generar variantes y detalles.
3. **Global:** barra de aviso, cabecera anclada, menú plegable en el flujo, pie, ES/EN con `lang`, titles.
4. **Inicio** (2.1) y **Ficha** (2.5, estados y avisos): son lo primero que María va a tocar.
5. **Obras** (muro, filtros, Índice sin hallazgo todavía) y **Artista**, **Artistas**, **Tienda**.
6. **Encuentro, Libro, encuentro activado, Activar.**
7. **Acerca, Ediciones, Edición, Contacto, 404**, formularios con validación propia.
8. **«Lo editas tú»** y **Retícula** (§8).
9. **Hallazgo del Índice** (C07).
10. Nivel 2 en el orden de §9. Después, Javiera.

### 10.2 · Mediciones para el acta (Javiera)

Las capturas se toman a 1440 y a 500 (el mínimo que dibuja el headless); **390 se mide en la página** emulando 390 × 664 por CDP (`Emulation.setDeviceMetricsOverride`), nunca desde la captura.

| # | Qué | Pasa si |
|---|---|---|
| M1 | Scroll horizontal en las 14 vistas a 390, 768 y 1440 | `scrollWidth === clientWidth` |
| M2 | Superposiciones (P10) en Inicio, Artista, Obras, Ediciones, Encuentro y encuentro activado | Ningún par de rectángulos de obra, pie o texto se cruza |
| M3 | Pliegue del inicio (2.1.3) | Controles ≤ 664 px a 390 × 664; leyenda y controles visibles a 1440 × 900 |
| M4 | Palabra enorme (1.2.9) en ES y EN | Tinta de la A a ≤ 4 px de `c1`; la ventana corta la última S |
| M5 | Contador vs. enlace vertical y vs. ficha (2.8.1, 2.11.1) | El contador termina antes |
| M6 | Cobalto (D6, P6): conteo de elementos con `color` o `background` o `border` cobalto computado, por vista | 1 en Inicio, Encuentro y encuentro activado; 0 en las demás; 0 píxeles `#1F3BD6` en obras |
| M7 | Búsqueda en `styles.css` y en los `style=""` de `app.js` e `index.html` (propiedades CSS, no métodos de JS como `.filter(`) | 0 `position: fixed` fuera de `.reticula`; 0 `position: sticky`; 0 propiedades `box-shadow`, `filter`, `backdrop-filter`, `transform` (`text-transform` no cuenta) y `mix-blend-mode`; 0 `#fff`, `#ffffff`, `white` o `rgb(255,255,255)`; 0 hex fuera de los seis tokens; 0 `Instrument`; 0 `italic`; 0 `border-radius` distinto de 0; 0 `transition: all`; tamaños de letra solo de la escala. En textos visibles: 0 rayas largas o medias |
| M8 | Filas (1.4): sumar las columnas de cada fila del muro sin filtros | 9 filas que suman 9 a 1440; ciclo de 1.4.1 a 768 y 390 |
| M9 | Bordes de las obras (M01) | Distancia RGB ≥ 20 al hueso en las 27 |
| M10 | Caja del `img` en láminas y ficha (4.13) | Su proporción coincide con la natural (±1%) |
| M11 | Campos y `select` a 390 | `font-size` computado = 16 px; alto ≥ 44 px |
| M12 | Áreas táctiles (4.21) | Todo lo interactivo ≥ 44 × 44 px a 390 |
| M13 | Retícula (8.2.4) | 9/6/3 columnas numeradas; obras sin cambio de color |
| M14 | Peso (M02) | Sin JPG de 1.600 px en `#/obras` a 390 DPR 3; variantes ≤ 250 KB |
| M15 | Fuentes cargadas | Solo Archivo y IBM Plex Mono en `document.fonts` con estado `loaded` |

---

## 11 · Detector anti-slop corrido sobre esta spec (5-oct)

**`anti-ai-slop.md`, checklist completo:**
- Acento no índigo: el cobalto está cerca en tono (231° contra 239°); se separa por oscuridad y escasez, y por eso su lista es cerrada (D6). **Abierto con justificación.**
- Tarjetas: no hay tarjetas; las obras son imágenes planas con pie y la única «caja» es el marcador de un activo que falta. ✓
- Franja lateral: se sacó la del aviso de C12 (P18). ✓
- Emoji: ninguno (P20). ✓
- Modo claro: sí, por el brief. ✓
- Serif editorial en automático (tell #4): **el lienzo es crema y eso es el patrón #4.** Justificación: el hueso es restricción de la clienta (rechazo explícito al blanco intenso de Perrotin, `BRIEF.md`) y el producto es una galería, el caso cultural que el propio detector exceptúa. Lo que sí delataba el #4 se quitó: la serif itálica de adorno (D7) y los acentos tierra en la interfaz (el único acento es un azul saturado). Los tonos tierra viven solo dentro de las obras de relleno. **Abierto con justificación.**
- Paleta tierra: no hay en la interfaz. ✓
- Palabra destacada con otro color: la I en cobalto **es** un tratamiento de una letra en color. Justificación: es una disrupción que la clienta pidió por escrito («un color inesperado o desentonando»), tiene rol escrito, aparece una vez por vista y nunca en un titular para «dar gusto». **Abierto con justificación.**
- Rasgos filosos preservados (tell #7): las cinco del lock de PRODn están en 1.4 y P3; el blanco de PRODn pasa a hueso por la clienta, no por promedio (referencias, «un dato que condiciona todo»). ✓
- Roles de token (tell #8): cada token con «dónde no» (§1.1); el cobalto ya no hace de foco ni de hover. ✓
- Media (tell #9): obras de relleno reales en archivo; lo que falta va como marcador dirigido; la tapa en CSS se sacó (D16). ✓
- Mayúsculas con tracking (1.2.8). ✓
- Prueba de captura, fuentes, colores derivados, tensión, «puedo explicar cada decisión»: §0 y §2 dicen el porqué de cada uno. ✓

**`antislop-web.md`:**
- A · Copy: esta spec no escribe copy; los dos textos que necesitó van a §12 para Clara. Se revisó la prosa de la spec: sin verbos de folleto, sin rayas, sin Title Case. ✓
- B1 · Tres tarjetas iguales: las tres artistas van del mismo ancho **a propósito** (D4: peso curatorial igual) y sin caja; se diferencian por proporción. Las tres portadas de Ediciones son marcadores iguales porque falta el mismo activo. **Abierto con justificación.**
- B6 · Hero de una pantalla: el primer viewport de Inicio es casi todo obra, como pidió María («que lo primero que se vea sea obra a gran tamaño», brief §3), y la siguiente sección no asoma. La continuación la invitan el indicador del carrusel y la lámina que no llega al alto completo. **Abierto con justificación.**
- B7 · Orden de secciones: el del mapa de María. ✓
- C2 · Valores por defecto: radio 0, sin sombra, sin `transition: all`, espaciado con módulo propio; cada valor con su fuente. ✓
- C3 · Degradé-mancha y vidrio: prohibidos (P4). ✓
- C6 · Foco, contraste, labels: 4.9, 1.1.7, 4.8. ✓
- C7 · Peso: dos familias, variantes, `width`/`height`, primera lámina `eager`. ✓
- D · Logo tapado: tapando la marca, el primer viewport es una obra corrida al borde de una retícula visible por la cabecera anclada; no es la plantilla de una tienda. Rubro cambiado: la regla de filas y el contador 001/369 no calzan con una inmobiliaria. ✓

---

## 12 · Textos que esta spec necesita y que Clara no tiene (o cambia)

1. **Controles del carrusel:** el «01 / 05» de copy §5-1 se dibuja como indicador de cinco números con raya (Schipper, 2.1.2). «← Anterior», «Siguiente →» y sus `aria-label` se quedan tal cual. Cada número necesita `aria-label` («1 de 5» / «1 of 5», formato de la lámina en copy §5-1). Clara confirma.
2. **Texto del marcador de portada:** propuesta «[portada]» / «[cover]», siguiendo el formato de «[página interior]». Clara confirma.
3. Nada más: el resto de los textos visibles de esta spec son los de `copy-secciones.md`.

---

## 13 · Límites de esta spec

- **Sin los bocetos de María** (brief §10, §9-2): Inicio, Artistas, Encuentro y Libro se compusieron contra la descripción de `BRIEF.md` y los referentes; se comparan con sus originales en la reunión.
- **390 no se pudo dibujar** en el headless; las medidas a 390 de esta spec son cálculos con los anchos reales de fuente (1.2.9, 1.2.10) y la retícula de 1.3.9. Javiera las mide en la página (10.2).
- **El hallazgo de Escat** está verificado en su código, no en una captura (referencias §8).

---

## 14 · Historial de correcciones

| Fecha | Qué se corrigió | Regla o preferencia | Quién lo pidió |
|---|---|---|---|
| 26-sep-2026 | Dirección retícula 3·6·9 con los tokens de la v1 | Regla (no se reabre por iniciativa interna, brief §8-5) | Ramón |
| 26-sep-2026 | Nada fijo que ensucie las fotos al bajar (P1, P2) | Regla | María (sobre Escat) |
| 26-sep-2026 | Sin tanto blanco intenso (P5) | Regla | María (sobre Perrotin) |
| 26-sep-2026 | Artistas con obra, no con foto (P13) | Regla | María (sobre Kurimanzutto) |
| 5-oct-2026 | La retícula es herramienta de maqueta y no tiñe ni va a producción (8.2, P22) | Regla | Brief §8-4 (Ramón) |
| 5-oct-2026 | Capa «Lo editas tú» sí; panel simulado y páginas de reunión no (8.1, P23) | Regla | Ramón, brief §10 |
| 5-oct-2026 | Spec v1: decisiones D1 a D16 | Las de §7 son regla; el resto, preferencia de esta obra hasta que María opine | Lucía |
