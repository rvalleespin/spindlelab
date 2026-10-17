# 04 · Tonela · el caso

**Pieza de concepto del portafolio E12.** Estructura de caso de Koto (lock `e12/lock-koto.md` §21): ficha lateral,
medio principal, las secciones con sus filas de medios en las formas de Koto (16:9, 4:5 y 1,62) y el cierre sin
métrica. Escrito por Bruno el 17-oct-2026 con los hechos de `ficha.md` (verificados por Simón) y el texto de
`texto.md` (Clara). **Clara le pasa el registro antes de que entre a `/trabajo/`** y Ramón lo revisa. Nada de esto se
publica en este paso.

---

## Ficha lateral

| | |
|---|---|
| Nombre y bajada | **Tonela** / El color de la eslinga es su capacidad |
| Ficha mono | CONCEPTO · 2026 |
| Rubro | Industrial B2B · izaje: eslingas, estrobos, cadenas y grilletes, con taller de inspección (Antofagasta, ficticia) |
| Lo hecho | Identidad (etiqueta cosida, color de la norma, letra, recurso propio), placas, portadas, sitio (home e interior), movimiento |
| Ingredientes | HTML, CSS y JS a mano · SVG propio · Big Shoulders, Big Shoulders Stencil y Barlow Semi Condensed (OFL, locales) · JSON-LD `Organization`, `Service`, `FAQPage`, `WebPage`, `BreadcrumbList` · Playwright y ffmpeg |
| Índice | Desafío · Estrategia · Identidad · Aplicación · Qué muestra |

**Medio principal:** `movimiento/recorrido.mp4` (16:9, 10 s, H.264, póster `movimiento/poster.jpg`) a 1440; a 390,
`capturas/medio-4x5-390.png` (4:5, las bandas, el titular y el rótulo). Portada del muro:
`identidad/portadas/portada-4x5.png`, `-4x3.png` y `-5x3.png`.

---

## Desafío

**En izaje, el sitio es un catálogo copiado del fabricante.**

Foto de producto, «solicite cotización» y ninguna tabla de carga en castellano. El que compra (un jefe de mantención,
un prevencionista, el encargado de bodega de una faena) cruza tres PDF en inglés para saber qué eslinga sirve para su
maniobra, y el sitio no le dice qué revisar antes de usarla ni cuándo botar la que ya tiene. Es una compra de
seguridad: si la eslinga no alcanza, se cae una carga.

*(Sin filas: el desafío va en texto, como la introducción de Koto.)*

## Estrategia

**Que la norma sea la marca.**

Las eslingas de poliéster ya vienen pintadas por capacidad: la EN 1492 las codifica en ocho colores, de violeta 1 t a
naranja 10 t. Tonela no inventa un color: toma ese código como paleta y como manera de recorrer el sitio, y cada color
significa su tonelaje y nada más (ni un botón, ni un fondo, ni un ícono). Y publica lo que un proveedor guarda: la
tabla de carga por modo de amarre y los criterios para dar de baja una eslinga, con la fuente al lado.

| Fila | Forma | Medio |
|---|---|---|
| 1 | 16:9 | `identidad/placas/16x9-codigo-tinta.png`: el código de la norma, las ocho eslingas colgadas por capacidad |

## Identidad

**La etiqueta como documento.**

Cada eslinga lleva cosida una etiqueta que dice qué levanta, de qué es y bajo qué norma. La marca se cose igual:
TONELA en Big Shoulders 800 dentro de una etiqueta con su costura punteada y el zigzag del remate de una cinta de
izaje. A 32 y 16 px queda la T sola. Es tinta `#121314` sobre blanco frío `#F1F2EF` (16,55:1), y no tiene color propio:
los colores son de la carga. Cada uno lleva su texto en el par que pasa 4,5:1; el verde de partida daba 4,31:1 con
blanco y con tinta, y se oscureció a `#237A33` (5,38:1).

Big Shoulders Stencil queda para lo que en una bodega se pinta con plantilla: el tonelaje sobre cada banda, el lote,
el rótulo del estante. Barlow Semi Condensed lleva el cuerpo y las tablas, con cifras de ancho fijo para que una
columna de capacidades se lea de un vistazo.

| Fila | Forma | Medio |
|---|---|---|
| 2 | 16:9 | `identidad/placas/16x9-logo-tinta.png`: la etiqueta sobre tinta |
| 3 | 4:5 \| 4:5 | `identidad/placas/4x5-eslinga-2-lienzo.png` \| `4x5-eslinga-5-tinta.png`: la eslinga con la marca cosida y su etiqueta colgante (capacidades por modo, norma, «lote: ficticio») |
| 4 | 4:5 \| dos 1,62 | `identidad/placas/4x5-letra-tinta.png` \| `1-62-stencil-lienzo.png` sobre `1-62-barlow-lienzo.png` |
| 5 | 16:9 | `identidad/placas/16x9-tabla-lienzo.png`: la tabla de carga por color, con «Canasto 7° a 45°» elegido |
| 6 | 16:9 | `identidad/pliego.png`: el pliego completo (logo, color con su contraste, letra y recurso propio) |

## Aplicación

**Un sitio que contesta la pregunta técnica.**

La home abre con las ocho eslingas colgadas de una barra, el ancho crece con la capacidad, y el titular «Cada color
levanta un peso. El amarre decide cuánto.». Debajo, la tabla de carga funciona: eliges el amarre y cada fila muestra
su capacidad, y un dibujo del canasto deja abrir los ramales para ver cómo baja la carga hasta que, pasados los 60°,
dice «No se iza». El catálogo va ordenado por lo que levanta y sin precios; estrobos, cadenas y grilletes van aparte y
sin color, porque el código no es de ellos. Después, la inspección, cinco cosas que la empresa no hace (entre ellas,
firmar tu plan de izaje), cinco preguntas largas en texto y un contacto de tres campos: qué levantas, cuánto pesa, en
qué faena.

La interior, «Inspección y certificación», abre con una cinta sin color cruzando la página, con la costura en caja
y cruz, la marca cosida y la ficha del examen anual sin llenar. Cuenta las tres revisiones (antes de cada uso, durante el trabajo y la
anual, que es la del taller), dibuja los seis lugares donde una eslinga avisa y los ocho criterios para darla de baja
sobre una cinta sin color, porque valen igual para todas las capacidades. El registro de inspección es el documento de
la marca: apta o dada de baja, sin un tercer resultado.

| Fila | Forma | Medio |
|---|---|---|
| 7 | 16:9 | `capturas/home-1440-primera.png`: la home a 1440 |
| 8 | 4:5 \| 4:5 | `capturas/medio-4x5-390.png` \| `capturas/inspeccion-4x5-390.png`: home e interior a 390, en 4:5 con el rótulo dentro |
| 9 | dos 1,62 \| 4:5 | `identidad/placas/1-62-registro-tinta.png` sobre `1-62-rotulo-tinta.png` \| `4x5-eslinga-2-tinta.png` (o la foto de la bodega, si se genera) |
| 10 | 16:9 | `capturas/inspeccion-1440-primera.png`: la interior a 1440 |

## Qué muestra

**Sin métrica: es un concepto.** Tonela no existe, no tuvo clientes ni faenas, y nada de lo que muestra su sitio
ocurrió. Lo que enseña es oficio: una identidad que sale de la norma del rubro en vez de decorarla, y un sitio que
contesta en castellano la pregunta que el comprador le hace hoy a una IA («¿qué eslinga uso para levantar 3 toneladas
en canasto?»), con la respuesta en texto plano, la misma respuesta en `FAQPage` y la ficción dicha en
`disambiguatingDescription`, para que un motor que la lea sepa que es un ejercicio.

| Fila | Forma | Medio |
|---|---|---|
| 11 | 16:9 | «Lo que lee un motor»: la pregunta larga, su respuesta en el sitio y el JSON-LD que dice que es concepto. **Pendiente de componer** como placa cuando la página de caso se arme (el material está en `sitio/index.html`, sección `#preguntas`, y en su `<script type="application/ld+json">`) |

**Las cifras de la pieza** son solo de norma, con fuente y fecha en `ficha.md`: el código de color, los factores de
modo (1; 0,8; 2; 1,4; 1), el rango de temperatura del poliéster y el ángulo de 60°. Las 40 capacidades de la tabla son
su producto. Ni precios, ni plazos, ni clientes, ni certificadores. La tabla dice que es referencial: manda la
etiqueta de cada eslinga y el plan de izaje lo firma una persona calificada.

---

## Lo que subiría de nivel con fotografía generada (no se hizo: decide Ramón)

Donde haría falta foto, la pieza se resolvió con lo que da el oficio: las eslingas, la etiqueta colgante, el registro y
el rótulo de bodega están dibujados en HTML, CSS y SVG, y el tejido de la cinta es un patrón de CSS. Lo que la foto
agregaría es el mundo real de la carga, que hoy no aparece en ninguna placa.

| Foto o clip | Forma | Para qué fila | Qué suma |
|---|---|---|---|
| El estante de la bodega con las eslingas colgadas por color, sin personas | 16:9 | 1 o 9 | La escena que hoy dibuja la portada, con luz y textura de verdad |
| Un gancho con una eslinga verde en canasto contra el cielo del desierto | 4:5 | 9 | El norte, que hoy solo está dicho en el texto |
| Eslingas enrolladas por color, vistas desde arriba | 1,62 | 4 o 9 | Una lámina de material, como las de Koto |
| Clip de 5 s: empuje lento sobre la foto del gancho | 16:9 | medio secundario | Movimiento que no sea de pantalla |

**Costo estimado (plan `plan-e12.md` §11):** unos **30 créditos** de Higgsfield para Tonela (3 fotos con 2 variantes
cada una con Nano Banana Pro, ~1,7 créditos por imagen; 1 clip de 5 s con Kling 3.0, ~5 créditos por intento, 2
intentos; 50 % de margen). La cuenta está en el plan gratuito con 0 créditos y no admite recargas sueltas, así que el
costo real es **un mes de PLUS, USD 49**, que alcanza para las cuatro piezas de la serie (~75 créditos en total). El
número exacto lo da el preflight de costo de cada generación, antes de gastar. Ninguna foto llevaría personas ni texto
de la marca: la etiqueta y el rótulo se componen encima en HTML, y cada foto se diría generada en el caso.

**Generación pagada en esta pieza: ninguna (0 créditos).**

## Comprobación (17-oct-2026)

- **Desborde horizontal:** 0 px a 360, 390, 768 y 1440, en la home y en la interior.
- **Contraste:** 0 fallas AA sobre 293 nodos de texto (home a 1440), 221 (home a 390), 124 y 119 (interior a 1440 y a 390), medido
  contra el fondo compuesto real (`capturas/comprobacion.json`).
- **Rótulo «Concepto»:** visible sin scroll en las cuatro primeras pantallas; 14 px a 1440 y 13 px a 390, 18,6:1. A
  1440 va en la cabecera fija; a 390, abajo y fijo, así que sale en cualquier captura del teléfono.
- **Técnica:** un `h1` por página, `noindex, nofollow`, JSON-LD válido, cero imágenes sin `alt`, cero errores de
  consola, cero peticiones a terceros (fuentes locales con su licencia en `sitio/fuentes/LICENCIAS.md`).
- **Movimiento:** `recorrido.webm` sale de `recordVideo` de Playwright (VP8 a ~1 Mbit/s, recortado y pasado a VP9);
  `recorrido.mp4` es el mismo guion grabado cuadro a cuadro desde el screencast de Chrome (JPEG al 92 %, unos 40
  cuadros por segundo) y armado a 30 cps en H.264, porque a 1 Mbit/s el texto de la tabla queda blando. El cursor de
  la grabación es dibujado: el navegador sin pantalla no pinta el del sistema.
- **No firmé el veredicto:** lo firma Javiera, en contexto limpio, antes de la compuerta 2.
