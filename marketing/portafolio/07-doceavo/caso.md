# 07 · Doceavo · el caso

**Pieza de concepto del portafolio E12.** Estructura de caso de Koto (lock `e12/lock-koto.md` §21): ficha lateral,
medio principal, cuatro secciones con sus filas de medios en las formas de Koto y el cierre sin métrica. Escrito por
Bruno el 17-oct-2026 con los hechos de `ficha.md` §4; **Clara le pasa el registro antes de que entre a `/trabajo/`** y
Ramón lo revisa. Nada de esto se publica en este paso.

---

## Ficha lateral

| | |
|---|---|
| Nombre y bajada | **Doceavo** / El año en doce |
| Ficha mono | CONCEPTO · 2026 |
| Rubro | Servicios profesionales · estudio contable y tributario para pymes e independientes (Concepción, ficticio) |
| Lo hecho | Identidad (logo que cambia cada mes, color, letra, recurso propio), sitio (home e interior «Calendario»), movimiento |
| Ingredientes | HTML, CSS y JS a mano · SVG propio · Recursive (OFL, local) · fechas del calendario del SII de 2026 · JSON-LD `AccountingService`, `Person`, `FAQPage`, `WebPage`, `BreadcrumbList` · Playwright y ffmpeg |
| Índice | Desafío · Estrategia · Identidad · Aplicación · Qué muestra |

**Medio principal:** `movimiento/recorrido.mp4` (16:9, 10 s, póster `movimiento/poster.jpg`) a 1440; a 390,
`identidad/portadas/portada-45.png` (4:5, el año en doce y el 1/12).

---

## Desafío

**El dueño de una pyme no compra asesoría: compra no enterarse tarde.**

Los sitios de los estudios contables dicen «asesoría integral» y «soluciones a tu medida» y terminan en un botón de
WhatsApp. Ninguno dice lo único que el dueño de una pyme necesita saber al entrar: qué vence este mes y qué le toca a
él. Se entera por un aviso del SII, cuando ya es tarde. Y en este rubro hay dos límites que no se cruzan: nadie puede
prometer que vas a pagar menos impuestos, ni que nunca vas a tener una multa.

*(Sin filas: el desafío va en texto, como la introducción de Koto.)*

## Estrategia

**Publicar el calendario.**

Cada mes es un doceavo del año y trae sus fechas: el F29 el 12 o el 20, las cotizaciones el 13, el F29 sin movimiento
el 28, y una vez al año las declaraciones juradas y la Operación Renta. Son públicas (están en el calendario del SII),
pero nadie las pone en su portada. Doceavo sí, y el sitio sabe en qué mes estás: el titular de la home es la fecha del
próximo F29 y cambia solo. Lo que se vende es una fecha, y la marca entera está hecha de esas fechas.

| Fila | Forma | Medio |
|---|---|---|
| 1 | 16:9 | `identidad/placas/16x9-anio-tinta.png`: el año en doce, con el rojo de cada vencimiento y el mes en curso lleno |

## Identidad

**El almanaque al revés.**

«doceavo» va en Recursive, en minúsculas, y su símbolo es una retícula de 3 × 4 casillas: el año, de enero arriba a la
izquierda a diciembre abajo a la derecha. La casilla del mes en curso va llena, así que **el logo cambia solo cada
mes** (el sitio lo dibuja con la fecha del día, y el ícono de la pestaña también). Recursive tiene un eje que la vuelve
monoespaciada sin cambiar de familia: el texto se lee en sans y las cifras se encolumnan en mono, con las mismas letras.

El color es el de un libro contable: lienzo verde pálido `#DCE6D3` con su renglón y su columna, tinta `#141414`, y un
solo color, el rojo `#B3261A`, que marca únicamente lo que vence. En un almanaque el rojo es feriado; aquí es plazo. El
sistema tiene dos marcas y nada más: **lleno es en curso, rojo es vence.**

| Fila | Forma | Medios |
|---|---|---|
| 2 | Par 4:5 \| 4:5 | `identidad/placas/4x5-logo-tinta.png` (el logo de octubre) \| `identidad/placas/4x5-meses-tinta.png` (un logo por mes) |
| 3 | 4:5 \| dos 1,62 | `identidad/placas/4x5-letra-tinta.png` \| `identidad/placas/1-62-eje-tinta.png` sobre `identidad/placas/1-62-cifras-tinta.png` |
| 4 | 16:9 | `identidad/placas/16x9-papel-tinta.png`: el papel columnar y el rojo, con octubre día por día |

El pliego completo, con el porqué de cada parte, está en `identidad/pliego.png` (1920 × 1080).

## Aplicación

**Un sitio que dice la fecha antes que la promesa.**

La home abre con el titular que cambia cada mes («El IVA de septiembre se declara hasta el martes 20 de octubre»), el
año en doce con el mes en curso lleno y, debajo, un almanaque de taco con lo que vence ese mes: al tocar otro mes del
año, la hoja se arranca. Después, octubre día por día en papel columnar (lo que vence, lo que hace el estudio y lo que
te toca a ti, con la fila de hoy llena); lo que se repite cada mes con sus cifras grandes en rojo; lo que no hacemos,
como un libro donde la raya en la columna del monto quiere decir nada; los servicios en tabla, sin precios; las
preguntas largas en texto, cada una con su fuente, y un formulario de tres preguntas que no envía nada. La interior,
«Calendario», es el año completo: la hoja grande del mes, un selector que es el mismo símbolo de 3 × 4, y la tabla de
todas las fechas de 2026, con las que el SII corrió al día hábil siguiente subrayadas.

| Fila | Forma | Medios |
|---|---|---|
| 5 | 16:9 | `medios/home-1440.png`: la primera pantalla |
| 6 | Par 4:5 \| 4:5 | `medios/home-390.png` \| `medios/calendario-390.png` |
| 7 | Dos 1,62 \| 4:5 | `identidad/placas/1-62-lomo-lienzo.png` (los lomos del archivador, uno por mes) sobre `identidad/placas/1-62-hoja-tinta.png` (la hoja del taco) \| `identidad/placas/4x5-informe-tinta.png` (el informe mensual, plantilla sin datos) |
| 8 | 16:9 | `medios/calendario-1440.png`: la hoja grande de octubre y el selector |

## Qué muestra

**Sin métrica: es un concepto. Doceavo no existe y no llevó la contabilidad de nadie.**

Lo que muestra es un servicio profesional sin una sola promesa vaga: lo que se ofrece es una fecha verificable, y la
identidad está hecha de esas fechas, hasta el logo. Y la capa que no se ve: cada fecha sale del calendario del SII con
su fuente y su día de consulta, el HTML se lee completo sin JavaScript, los datos estructurados son del tipo de negocio
correcto con la ficción declarada dentro, y las preguntas largas («¿cuándo vence el F29?», «¿tengo que declarar si no
vendí nada?») están en texto plano, que es como una IA las puede citar.

| Fila | Forma | Medio |
|---|---|---|
| 9 | 16:9 | `identidad/placas/16x9-f29-tinta.png`: «¿Cuándo vence el F29?» y la respuesta del sitio, con su fuente |

**Cierre:** «Siguiente», con el próximo caso del índice (lo arma la vista 2; no es parte de esta pieza).

---

## Cuenta de filas y de color (para Javiera)

- **10 filas con el medio principal, 15 medios.** Koto, caso más corto: 11 filas y 15 medios. Hay medios de sobra si
  la vista pide una fila más: `medios/este-mes-1440.png` (la fila de hoy, 16:9), `medios/no-hacemos-1440.png` (16:9),
  `medios/anio-390.png` (el año en puntos, 4:5) y las dos portadas apaisadas.
- **Campos claros:** Doceavo es una marca de lienzo claro, así que todo medio del sitio es campo. Por eso las placas
  del caso van en su versión sobre tinta y la fila 7 usa los lomos sobre lienzo (domina la tinta de los lomos). Cuento
  como campo todo medio cuyo claro cubre el 30 % o más (lock §20.1): el recorrido, el papel, las filas 5, 6 y 8, la
  hoja del taco y el informe. Suman cerca del 57 % del área de medios; con los medios en un 60 % de la página, unos
  **34 % de campo**, dentro del techo de 10 a 35 % del lock §20.3. Si la vista lo deja justo, la fila 6 sale primero.
- **Campos seguidos:** papel, home a 1440 y el par a 390 son cuatro seguidos; después, los lomos (oscuros). Nunca más
  de cuatro.
- **«Concepto» en cada medio:** la nota al margen del sitio está fija en cada captura y en cada cuadro del recorrido
  (en el margen a 1440, en la franja de arriba a 390); las placas y las portadas, en la esquina; el pliego, arriba a
  la derecha.

## Lo que subiría el nivel con fotografía (no se generó nada)

Donde haría falta foto se resolvió con el oficio: el año en doce, el papel columnar, el taco que se arranca, los lomos
del archivador y el informe del mes, dibujados en HTML, CSS y SVG. Lo que sumaría una foto es **el mundo físico del
estudio**, que hoy no aparece:

| Medio | Qué | Forma | Dónde entra |
|---|---|---|---|
| Foto 1 | Archivadores en una repisa, con los lomos en blanco y sin personas, para componer encima nuestros lomos (uno por mes, el de octubre afuera) | 16:9 | Abriría Aplicación, antes de la home |
| Foto 2 | Un escritorio con un almanaque de taco con la hoja en blanco, para componer encima nuestra hoja de octubre (generada sin texto; la hoja se pone encima en HTML) | 4:5 | Reemplazaría a `medios/calendario-390.png` en la fila 6 |

- **Costo estimado del plan** (`../plan-e12.md` §11): **unos 10 créditos** para Doceavo (2 fotos con 2 variantes cada
  una y 50 % de margen). La cuenta de Higgsfield está en el plan gratuito y con saldo 0, así que el costo real lo pone
  el plan, no las imágenes: **USD 49 por un mes de PLUS**, que cubre las tandas de las cuatro piezas (unos 75 créditos
  en total).
- **Solo con el OK de Ramón**, con preflight de costo antes de cada tanda. Ninguna foto lleva personas ni caras, y
  cada foto generada se dice generada en el caso.

## Cómo se hizo (y qué se comprobó)

- **Sitio:** `sitio/index.html` y `sitio/calendario/index.html`, una hoja de estilo (`sitio/estilo.css`) y dos
  módulos sin dependencias: `sitio/datos.js` (las fechas de 2026 y las funciones que pintan lo que depende del día) y
  `sitio/doceavo.js` (vuelve a pintar si hoy no es el día con que se construyó el HTML, arranca la hoja del taco,
  marca la fila de hoy y maneja el formulario, que no envía nada). `_herramientas/construir.mjs` deja el HTML estático
  con las mismas funciones, así la página se lee completa sin JavaScript. `?hoy=AAAA-MM-DD` fija el día; sin eso,
  manda la fecha de Santiago si cae en 2026 y, fuera de 2026, el 16 de octubre. Fuentes en `sitio/fuentes/`, cero
  peticiones a terceros. `noindex, nofollow`.
- **Comprobado el 17-oct-2026** con `_herramientas/capturar.mjs` y `_herramientas/comprobar.mjs` contra un servidor
  local, con `?hoy=2026-10-16`: desborde 0 a 360, 390, 768 y 1440 en las dos páginas; un `h1` por página; JSON-LD que
  parsea; **cero nodos de texto bajo 4,5:1** (3:1 desde 24 px) a 1440 y 390 (1.286 nodos medidos); nota al margen
  dentro del primer viewport a 12,5 px y 14,30:1; foco visible en los primeros 16 elementos del tabulador; con
  `prefers-reduced-motion: reduce`, cero animaciones corriendo; consola sin errores; solo Recursive en uso; el taco
  cambia de hoja y deja un solo botón apretado. El detalle está en `capturas/comprobacion.json`. Con movimiento, la
  hoja arrancada se borra del DOM al terminar (probado en las dos páginas).
- **Identidad:** `identidad/pliego.html` y `identidad/placas.html` (cada placa se elige con `?p=` y `&f=lienzo|tinta`),
  rasterizadas con `_herramientas/identidad.mjs`. El logo en SVG con la palabra en contornos (`_herramientas/logo.py`
  instancia Recursive en peso 720): la palabra, el logo sobre lienzo y sobre tinta, un símbolo por mes y el símbolo a
  32 y 16 px en píxeles enteros (`identidad/logo/`).
- **Movimiento:** `movimiento/recorrido.mjs` graba cuadro a cuadro (30 por segundo) con un reloj virtual: pausa cada
  animación de la página y la pone en su instante. El encargo decía `recordVideo`; en este contenedor sale a VP8 de
  unos 0,9 Mbit/s y queda blando para un medio de 1057 px (plan §5.5), así que se grabó como Ocelo. Guion: de 0 a 3 s
  el año se llena mes a mes; el cursor pasa por encima de octubre (hover) y hace clic, y la hoja de septiembre se
  arranca del taco; de 5,6 a 7,4 s la página baja a octubre día por día y la fila de hoy se marca. Se entrega en H.264
  (`recorrido.mp4`, 0,75 MB) y VP9 (`recorrido.webm`, 0,58 MB), 1440 × 810, 10 s, con `poster.jpg`.
- **Generación pagada:** 0 llamadas, 0 créditos.

## Decisiones que no estaban escritas (para que no se cuelen como defecto)

1. **El titular es una fecha y cambia solo.** El plan decía «el año en doce con el mes en curso y lo que vence en él»;
   el titular de Clara pone la fecha del próximo F29 de facturadores electrónicos (el caso de casi toda pyme) y la del
   F29 general va en la bajada. Pasado el 21 de diciembre, el sitio dice que el calendario de 2027 todavía no existe.
2. **A 390, el año en doce se lee en puntos.** Con números, siete días en 112 px se pegaban. Cada día es un cuadro, el
   rojo es un punto y el mes en curso va lleno: la misma retícula del logo, multiplicada. Los números siguen en el
   `aria-label` de cada mes y en la hoja del taco.
3. **Lo pasado va en verde, no en rojo.** Un vencimiento que ya pasó deja de vencer: en la home, en la tabla del mes y
   en la hoja del taco se marca con un anillo verde y «venció». El rojo queda para lo que todavía viene. En las placas
   y portadas, que no tienen fecha, todo va en rojo.
4. **La rutina del estudio es ficción declarada y se calcula.** Cierre el primer día hábil, borrador tres días hábiles
   antes del F29 general, comprobante el día hábil siguiente al F29 de facturadores, liquidaciones el último día
   hábil. La nota bajo la tabla y el pie lo dicen.
5. **El error del formulario no es rojo.** Va en tinta, en negrita y con una raya al costado: el rojo solo marca lo que
   vence.
6. **La banda de «Lo que no hacemos» llega hasta la doble raya del margen**, no hasta el borde: el margen del libro
   sigue siendo papel, con su etiqueta y su nota.
7. **El pliego va a 1920 × 1080**, como pide el encargo; las placas, al doble de las cajas de Koto.
8. **Sin `canonical`:** el sitio no tiene una URL propia (`doceavo.cl` está libre y no es nuestro).
9. **La raya de la columna del monto se dibuja**, no se escribe: no es la raya de texto que prohíbe el manual.

## Lo que queda abierto

- **QA de Javiera** en un subagente limpio, con el §13 del plan.
- **El nombre de la contadora y `doceavo.cl`** se vuelven a buscar el día que la pieza entre a `/trabajo/`.
- **Simón revisa las fechas** contra `_herramientas/sii-calendario-2026.json` antes de que el caso se muestre; las de
  marzo y junio vienen de la Res. Ex. SII N° 123 porque esa vista del calendario devuelve una página vacía.
- **`../README.md`** sigue con la tabla de la primera serie. No lo toqué: lo comparten las cuatro piezas y otra sesión
  trabaja en paralelo en la misma rama; lo actualiza quien cierre la serie.
