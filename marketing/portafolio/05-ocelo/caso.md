# 05 · Ocelo · el caso

**Pieza de concepto del portafolio E12.** Estructura de caso de Koto (lock `e12/lock-koto.md` §21): ficha lateral,
medio principal, cuatro secciones con sus filas de medios en las cuatro formas de Koto y el cierre sin métrica.
Escrito por Bruno el 17-oct-2026 con los hechos de `ficha.md` §4; **Clara le pasa el registro antes de que entre a
`/trabajo/`** y Ramón lo revisa. Nada de esto se publica en este paso.

---

## Ficha lateral

| | |
|---|---|
| Nombre y bajada | **Ocelo** / La carta antes que la promesa |
| Ficha mono | CONCEPTO · 2026 |
| Rubro | Clínica · oftalmología: cirugía refractiva y de cataratas (Providencia, ficticia) |
| Lo hecho | Identidad (logotipo, símbolo, color, letra, recurso propio), sitio (home e interior), movimiento |
| Ingredientes | HTML y CSS a mano · SVG propio · Atkinson Hyperlegible Next y Mono (OFL, locales) · JSON-LD `MedicalClinic`, `Physician`, `MedicalProcedure`, `FAQPage`, `MedicalWebPage`, `MedicalTest` · Playwright y ffmpeg |
| Índice | Desafío · Estrategia · Identidad · Aplicación · Qué muestra |

**Medio principal:** `movimiento/recorrido.mp4` (16:9, 10 s, póster `movimiento/poster.jpg`) a 1440; a 390,
`identidad/portadas/ocelo-45.png` (4:5, la carta con la luz encendida).

---

## Desafío

**El rubro vende un resultado; el paciente trae una pregunta.**

Las clínicas de cirugía refractiva se anuncian con la promesa de dejar los lentes y con fotos de antes y después. La
persona que llega pregunta otra cosa: si puede operarse. Esa pregunta no la contesta un banner, la contesta un
examen: el grosor y la forma de la córnea, si la graduación dejó de cambiar, la edad, la lágrima. Y en salud la
página tiene un límite que no se negocia: no puede prometer un resultado clínico.

*(Sin filas: el desafío va en texto, como la introducción de Koto.)*

## Estrategia

**Cambiar la promesa por el examen.**

El sitio se ordena como la evaluación, y la carta de optotipos, lo primero que ve cualquier paciente, pasa a ser la
interfaz. La escala de letra sigue los pasos de la carta logMAR: cada fila es 0,1 log más chica, un factor de 1,2589,
así que la jerarquía del sitio es la de un examen de la vista. Cada fila de la carta es una palabra de cinco letras y
lleva a una sección. La más chica es la que dice que esto es un concepto.

| Fila | Forma | Medio |
|---|---|---|
| 1 | 16:9 | `identidad/placas/carta-tinta.png`: la carta con sus valores logMAR y a dónde lleva cada fila |

## Identidad

**Los instrumentos del examen como sistema.**

OCELO va dibujado en la retícula de 5 × 5 de los optotipos, con trazo de un módulo, como las letras de la carta: la O,
la C y la E son letras del examen y la L se dibuja con las mismas reglas. El símbolo es la C de Landolt (ISO 8596), un
anillo con una abertura del ancho de su trazo: se lee por dónde se abre, que es justo lo que mide el examen, y por eso
sigue legible a 16 px. En el sitio apunta hacia donde sigue la lectura.

El color tiene dos estados y un par. La sala `#16181A` es el lienzo a oscuras, porque después de una cirugía
refractiva la luz molesta unos días; la luz `#F5F5F2` se enciende con un interruptor. El rojo `#E0352B` y el verde
`#23A04A` son los del test duocromo y tienen un solo rol: comparar dos opciones, siempre con letras de 24 px o más.
Para leer, Atkinson Hyperlegible Next y su Mono, del Braille Institute, hechas para lectores con baja visión: parte de
quien entra a este sitio.

| Fila | Forma | Medios |
|---|---|---|
| 2 | 16:9 | `identidad/placas/logotipo-tinta.png`: OCELO en su retícula, con las cotas |
| 3 | Par 4:5 \| 4:5 | `identidad/placas/landolt-tinta.png` (la C con sus cotas y a 64, 48, 32, 24 y 16 px) \| `identidad/placas/letra-tinta.png` |
| 4 | 16:9 | `identidad/placas/duocromo-tinta.png`: el rojo y el verde, solo para comparar |
| 5 | 4:5 \| dos 1,62 | `identidad/placas/interruptor-tinta.png` (la sala y la luz, la carta cortada al medio) \| `identidad/placas/mono-tinta.png` sobre `identidad/placas/puerta-tinta.png` |

El pliego completo, con el porqué de cada parte, está en `identidad/pliego.png` (1920 × 1080).

## Aplicación

**Un sitio que no encandila y que dice lo que no sabe.**

La home abre con la carta: OCELO arriba y siete palabras que se achican fila a fila. Al lado, ¿soy candidato?, que
explica las cinco mediciones que deciden; el comparador rojo y verde para LASIK o PRK y para lente monofocal o
multifocal, que dice qué pesa en cada caso; una sección con lo que no se puede prometer, tachado; dos oftalmólogos
ficticios sin foto ni número de registro, con sus iniciales dibujadas en la retícula; las preguntas largas contestadas
en texto, sin acordeón, y el pedido de evaluación sin precios, con lo que mueve el precio. La interior, «La
evaluación», cuenta los ocho pasos en orden, con el número de cada paso dibujado en la retícula y achicándose como las
filas de la carta, y termina con la plantilla del informe que se lleva el paciente, sin datos de nadie.

| Fila | Forma | Medios |
|---|---|---|
| 6 | 16:9 | `medios/home-1440-luz.png`: la carta con la luz encendida |
| 7 | Par 4:5 \| 4:5 | `medios/home-390-sala.png` \| `medios/home-390-luz.png` |
| 8 | 16:9 | `medios/evaluacion-1440-pasos.png`: los pasos con su número y el índice que marca el que se lee |
| 9 | Dos 1,62 \| 4:5 | `identidad/placas/informe-tinta.png` sobre `identidad/placas/informe-lienzo.png` \| `medios/evaluacion-390-duocromo.png` |

## Qué muestra

**Sin métrica: es un concepto. Ocelo no existe y no atendió a nadie.**

Lo que muestra es que en salud la honestidad también es diseño: una identidad hecha con los instrumentos del examen,
una página que parte a oscuras por una razón clínica, y una sección entera para lo que ninguna cirugía garantiza. Y la
capa que no se ve: datos estructurados del tipo de negocio correcto, con la ficción declarada dentro de cada entidad,
y preguntas largas en texto plano, que es como una IA las puede citar.

| Fila | Forma | Medio |
|---|---|---|
| 10 | 16:9 | `medios/prometer-1440.png`: «Lo que no te vamos a prometer», la sección tal cual |

**Cierre:** «Siguiente», con el próximo caso del índice (lo arma la vista 2; no es parte de esta pieza).

---

## Cuenta de filas y de color (para Javiera)

- **11 filas con el medio principal, 18 medios.** Koto, caso más corto: 11 filas y 15 medios. Ninguna fila partida
  sigue a otra partida (orden: 16:9, 16:9, par, 16:9, partida, 16:9, par, 16:9, partida, 16:9).
- **Campos claros y de color:** el duocromo, la home con luz, uno de los 4:5 del par, la mitad del interruptor, la
  hoja del informe y la mitad del recorrido suman cerca de un 29 % del área de medios, dentro del 10 a 35 % del lock
  §20.3. Por eso las placas del caso van en su versión sobre tinta; las versiones sobre lienzo quedan para la
  dirección que las pida.
- **«Concepto» en cada medio:** la cabecera fija del sitio lo lleva en todas las capturas y en cada cuadro del
  recorrido; las placas y las portadas, en la esquina; el pliego, arriba a la derecha.

## Lo que subiría el nivel con fotografía (no se generó nada)

Donde haría falta foto se resolvió con el oficio: la carta, la C, el duocromo, la hoja del informe y la placa de la
puerta dibujados en HTML, CSS y SVG. Lo que sumaría una foto es **el mundo físico del examen**, que hoy no aparece:

| Medio | Qué | Forma | Dónde entra |
|---|---|---|---|
| Foto 1 | La caja de lentes de prueba abierta, en macro, sin personas | 16:9 | Abriría Identidad, antes del logotipo |
| Foto 2 | La sala a oscuras con el foróptero en primer plano y nuestra carta compuesta en la proyección (generada sin texto; la carta se pone encima en HTML) | 4:5 | Reemplazaría al interruptor en la fila 5 |
| Clip | 5 s: el foco corre sobre los lentes de prueba | 16:9 | Segundo medio de Aplicación |

- **Costo estimado del plan** (`../plan-e12.md` §11): **unos 25 créditos** para Ocelo (cada foto con 2 variantes,
  el clip con 2 intentos, con 50 % de margen). La cuenta de Higgsfield está en el plan gratuito y con saldo 0, así que
  el costo real lo pone el plan, no las imágenes: **USD 49 por un mes de PLUS**, que cubre las tandas de las cuatro
  piezas (unos 75 créditos en total).
- **Solo con el OK de Ramón**, con preflight de costo antes de cada tanda. Ninguna foto lleva personas ni caras, y
  cada foto o clip generado se dice generado en el caso.

## Cómo se hizo (y qué se comprobó)

- **Sitio:** `sitio/index.html` y `sitio/la-evaluacion/index.html`, una hoja de estilo (`sitio/estilo.css`) y un JS
  sin dependencias (`sitio/ocelo.js`: el interruptor, las pestañas del comparador, el formulario que no envía nada y
  el índice de la interior). Fuentes en `sitio/fuentes/`, cero peticiones a terceros. `noindex, nofollow`.
- **Comprobado el 17-oct-2026** con `_herramientas/capturar.mjs` y `_herramientas/comprobar.mjs` contra un servidor
  local: desborde 0 a 360, 390, 768 y 1440, a oscuras y con luz, en las dos páginas; un `h1` por página; JSON-LD que
  parsea; **cero nodos de texto bajo 4,5:1** (3:1 desde 24 px) a 1440 y 390; rótulo «Concepto» dentro del primer
  viewport a 12,71 px y 16,30:1 (17,55:1 con luz); foco visible en los primeros 14 elementos del tabulador; con
  `prefers-reduced-motion: reduce`, cero animaciones corriendo; consola sin errores; solo las dos Atkinson en uso. El
  detalle está en `capturas/comprobacion.json`.
- **Entre el teléfono y el escritorio (18-oct-2026).** Cerrando el defecto 17 del acta del paso 2 (el piso de 11 px,
  en Tonela) barrí las cuatro piezas en doce tamaños, de 360 × 740 a 1920 × 1080, y Ocelo tenía dos fallas que las
  comprobaciones a 360, 390, 768 y 1440 no veían. De 821 a 1179 px la carta iba al lado del texto, tan angosta que sus
  filas de abajo bajaban de 11 px (3,6 px a 821, y la fila 0,2 es el rótulo); ahora en ese tramo va arriba y a todo
  el ancho, como en el teléfono, y su tamaño tiene un piso que deja la fila 0,2 sobre 11 px. Y de 821 a unos 960 px
  los nombres de «Quiénes operarían» empujaban la página 144 px de ancho; ahora las iniciales van sobre el nombre
  desde 1100 px hacia abajo. Barrido de nuevo: 0 desborde y 0 textos bajo 11 px en los doce tamaños. A 360, 390, 768 y
  1440 la página sale idéntica, píxel por píxel, a la de antes, así que las capturas, los medios y el recorrido no
  cambian.
- **Identidad:** `identidad/pliego.html` y `identidad/placas.html` (cada placa se elige con `?p=` y `&f=tinta|lienzo`),
  rasterizadas con `_herramientas/identidad.mjs`. Logotipo y símbolo también como SVG sueltos en `identidad/logo/`.
- **Movimiento:** `movimiento/recorrido.mjs` graba el recorrido cuadro a cuadro (30 por segundo) con un reloj virtual:
  pausa cada animación y transición de la página y la pone en su instante, y corre los `setTimeout` de la página en
  ese mismo reloj. `recordVideo` de Playwright sale en este contenedor a VP8 de unos 0,9 Mbit/s y queda blando para
  un medio de 1057 px (plan §5.5); cuadro a cuadro sale nítido e idéntico cada vez. Se entrega en H.264
  (`recorrido.mp4`, 1,6 MB) y VP9 (`recorrido.webm`, 1,1 MB), 1440 × 810, 10 s.
- **Generación pagada:** 0 llamadas, 0 créditos.

## Decisiones que no estaban escritas (para que no se cuelen como defecto)

1. **La hoja del informe va por ojo** (columnas «Ojo derecho» y «Ojo izquierdo»). El texto de Clara lista los campos
   sin columnas; un informe de evaluación se llena por ojo, y así se lee como el documento real. Clara lo revisa.
2. **El cierre de la interior es solo el botón y el enlace.** Probé una frase de cierre y la saqué: era copy mío, y
   copy no escribo.
3. **El número de cada paso de la interior se achica como la carta** (del 1 al 8, factor 1,2589 por paso). No estaba
   en el texto ni en el plan; es la misma regla de la home llevada a la interior.
4. **El pliego va a 1920 × 1080**, como pide el encargo de esta corrida; el plan decía 2114 × 1190. Las placas sí van
   al doble de las cajas de Koto (2114 × 1190, 1050 × 1312 y 1050 × 648).
5. **Sin `canonical`**: el sitio no tiene una URL propia (`ocelo.cl` está libre y no es nuestro); un canonical a un
   dominio ajeno sería peor que ninguno. Se agrega el día que la pieza tenga dónde vivir.
6. **El logotipo de la fila 1,0 se centró con las palabras** de la carta. Heredaba el espacio de cola de las letras y
   quedaba corrido unos 40 px a la derecha a 1440.

## Lo que queda abierto

- **A oscuras o con la luz encendida por defecto** lo decide Ramón en la compuerta 2 (plan §14, punto 2). El plan B
  ya está construido: `?luz=1` abre la página encendida.
- **QA de Javiera** en un subagente limpio, con el §13 del plan.
- **Los nombres de los médicos** se vuelven a buscar en el Registro Nacional de Prestadores Individuales el día que la
  pieza entre a `/trabajo/` (`ficha.md` §3).
- **`../README.md`** sigue con la tabla de la primera serie. No lo toqué en esta corrida porque lo comparten las
  cuatro piezas y otra sesión trabaja en paralelo en la misma rama; lo actualiza quien cierre la serie.
