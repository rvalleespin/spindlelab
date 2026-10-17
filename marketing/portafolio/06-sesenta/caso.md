# 06 · Sesenta · el caso

**Pieza de concepto del portafolio E12, la de la vista 4.** Estructura de caso de Koto (lock `e12/lock-koto.md` §21):
ficha lateral, medio principal, secciones con sus filas de medios en las cuatro formas de Koto y el cierre sin
métrica. Escrito por Bruno el 17-oct-2026 con los hechos de `ficha.md` §4; **Clara le pasa el registro antes de que
entre a `/trabajo/`** y Ramón lo revisa. Nada de esto se publica en este paso.

---

## Ficha lateral

| | |
|---|---|
| Nombre y bajada | **Sesenta** / El plazo antes que el juicio |
| Ficha mono | CONCEPTO · 2026 |
| Rubro | Estudio legal · derecho laboral, del lado del trabajador (Santiago centro, ficticio) |
| Lo hecho | Identidad (palabra, sello, símbolo, color, letra, recurso propio), sitio (home e interior), movimiento |
| Ingredientes | HTML, CSS y JS a mano · Schibsted Grotesk y Courier Prime (OFL, locales) · logo en trazados con fontTools · contador de días hábiles con los feriados de 2026 y 2027 · JSON-LD `LegalService`, `Person`, `FAQPage`, `WebPage`, `BreadcrumbList` · Playwright y ffmpeg |
| Índice | Desafío · Estrategia · Identidad · Aplicación · Qué muestra |

**Medio principal:** `movimiento/recorrido.mp4` (16:9, 10 s, H.264; también `recorrido.webm`; póster
`movimiento/poster.jpg`) a 1440; a 390, `identidad/portadas/sesenta-4x5.png` (4:5, el 60 cortado por el marco con
la suma encima).

---

## Desafío

**El rubro le grita a alguien asustado.**

Los estudios laborales se anuncian con «¿te despidieron? llama ya» y con juicios ganados de antemano. La persona que
llega, desde el celular y a pocos días de que la despidieran, tiene en la mano dos cosas: una fecha y una carta. Lo que
le pregunta a una IA depende de las dos: cuánto plazo le queda y qué significa el artículo que cita su carta. Y un
estudio no puede contestar con una promesa: no hay tasa de éxito ni monto que se pueda decir antes de leer el caso.

*(Sin filas: el desafío va en texto, como la introducción de Koto.)*

## Estrategia

**Ordenar todo alrededor de la fecha y de la carta.**

La fecha se vuelve el número: el Código del Trabajo da 60 días hábiles desde la separación para ir al juzgado (art.
168), y el estudio se llama así. La carta se vuelve la manera de escribir el sitio: cada sección lleva el rótulo de un
escrito judicial, «En lo principal», «Primer otrosí», y debajo, el título en las palabras de la persona. Así la página
se lee como un escrito sin que nadie tenga que saber qué es un otrosí.

| Fila | Forma | Medio |
|---|---|---|
| 1 | 16:9 | `identidad/placas/16x9-suma-tinta.png`: la suma del escrito y la pantalla que sale de ella |

## Identidad

**Un timbre sobre un documento, en el azul de la ropa de trabajo.**

SESENTA va en Schibsted Grotesk 900, y el 60 es un timbre de doble filete, como el de cargo que deja la oficina de
partes: sobre el azul va en blanco; sobre el papel, en tinta azul y torcido, como cae un timbre de goma. A 32 y 16 px
queda el 60 solo. El lienzo es el azul `#22408A` del overol, no el marino de los estudios, con una sarga hecha en CSS
que le da la trama de la tela. El papel `#F3F1EA` y Courier Prime aparecen solo cuando hay un documento en pantalla (la
carta, el finiquito, la hoja, la suma), y el azul vuelve sobre el papel una sola vez: como tinta del timbre. Hasta el
rótulo de concepto de las placas es una etiqueta de papel escrita a máquina.

| Fila | Forma | Medios |
|---|---|---|
| 2 | 16:9 | `identidad/placas/16x9-logo-tinta.png`: la palabra y el sello |
| 3 | Par 4:5 \| 4:5 | `identidad/placas/4x5-sello-tinta.png` (el sello y el 60 a 32 y 16 px) \| `identidad/placas/4x5-paleta-tinta.png` (cinco colores con su rol y su contraste) |
| 4 | 16:9 | `identidad/placas/16x9-contador-tinta.png`: el 60 que baja hasta los días que quedan |
| 5 | 4:5 \| dos 1,62 | `identidad/placas/4x5-letra-tinta.png` \| `identidad/placas/1-62-courier-tinta.png` sobre `identidad/placas/1-62-otrosi-tinta.png` |

El pliego completo, con el porqué de cada parte, está en `identidad/pliego.png` (1920 × 1080).

## Aplicación

**Un sitio que contesta la pregunta del primer día sin prometer el juicio.**

La home abre con un 60 enorme cortado por el marco, la frase con el plazo y tres cosas que hacer hoy, y la suma del
escrito en papel como índice de la página. El contador pide el día en que dejaste de trabajar y el 60 baja, cifra por
cifra, hasta los días hábiles que te quedan, contados de lunes a sábado y sin feriados, con el día 60 y el tope de 90
en una línea de tiempo; dice en la misma pantalla que es referencial. El lector de la carta cambia la línea de una
carta de ejemplo según el artículo que eliges (159, 160, 161 o ninguno), le dibuja un óvalo de tinta y explica qué
suele significar y de qué depende. Después: el finiquito con cinco notas al margen, la hoja de la primera reunión para
imprimir, el cobro explicado sin una sola cifra, seis preguntas en texto plano y un formulario que dice que no envía
nada. La interior, «¿Qué artículo dice tu carta?», cuenta el 159, el 160, el 161 y la nulidad del despido, cada uno
con la línea de la carta donde aparece.

| Fila | Forma | Medios |
|---|---|---|
| 6 | 16:9 | `medios/home-1440.png`: la primera pantalla |
| 7 | Par 4:5 \| 4:5 | `medios/home-390.png` \| `medios/interior-390.png` |
| 8 | 16:9 | `identidad/placas/16x9-finiquito-tinta.png`: antes de firmar el finiquito, sobre tinta |
| 9 | Dos 1,62 \| 4:5 | `identidad/placas/1-62-hoja-tinta.png` sobre `identidad/placas/1-62-tarjeta-tinta.png` \| `medios/lector-390.png` |
| 10 | 16:9 | `medios/lector-1440.png`: el lector en el 161, con el óvalo de tinta |
| 11 | 16:9 | `medios/interior-1440.png`: la interior, en el 161 |

## Qué muestra

**Sin métrica: es un concepto. Sesenta no existe y no llevó ninguna causa.**

Lo que muestra es que un estudio puede contestar la pregunta del primer día sin prometer el juicio: el plazo exacto,
con su artículo, y qué significa la carta, con lo que no se puede saber sin leerla. Y la capa que no se ve: datos
estructurados del tipo de negocio correcto, con la ficción declarada dentro de cada entidad, y las preguntas largas en
texto plano, con encabezado y sin acordeón, que es como una IA las puede citar.

| Fila | Forma | Medio |
|---|---|---|
| 12 | 16:9 | `identidad/placas/16x9-pregunta-tinta.png`: «¿Cuánto plazo tengo para demandar…?» y la respuesta tal como está en el sitio, con el JSON-LD que dice que es concepto |

**Cierre:** «Siguiente», con el próximo caso del índice (lo arma la vista 2; no es parte de esta pieza).

---

## Lo que subiría de nivel con fotografía (no se generó nada)

Donde haría falta foto, la pieza la resuelve con lo que da el oficio: el 60 tipográfico, los documentos compuestos en
HTML (la carta, el finiquito, la hoja, la tarjeta) con sus datos tachados, el timbre y la sarga del lienzo. Ninguna
ranura queda vacía.

Lo que la subiría, si Ramón lo aprueba (plan §9 y §11):

1. **Una mesa vista desde arriba** con un sobre, un finiquito sin firmar y un lápiz pasta azul, sin personas, 16:9.
   Nuestros documentos se componen encima en HTML; si en el render no se ven verdaderos, van en su placa y la foto
   queda sola. Entraría en Aplicación, como fila 9 en lugar de la hoja y la tarjeta.
2. **Una chaqueta de trabajo azul** colgada en el respaldo de una silla, 4:5. Le daría a la identidad el objeto del
   que sale el color; entraría en Identidad, en el par de la fila 3.

**Costo estimado del plan:** unos 10 créditos de Higgsfield (2 fotos, 2 variantes cada una, con margen). La cuenta
está en 0 créditos y sin recargas sueltas, así que el costo real es un mes del plan PLUS, **USD 49**, que alcanza para
las cuatro piezas (unos 75 créditos en total). Cada foto generada se diría generada en el caso. Decide Ramón en la
compuerta 2.

---

## Cuenta de filas y de color (para Javiera)

- **12 filas con el medio principal, 19 medios.** Koto, caso más corto: 11 filas y 15 medios. Ninguna fila partida
  sigue a otra partida (orden: 16:9, 16:9, par, 16:9, partida, 16:9, par, 16:9, partida, 16:9, 16:9, 16:9).
- **Campos claros y de color** (un medio cuyo color dominante cubre el 30 % o más, lock §20.1): el recorrido, la paleta,
  la Courier, la home a 1440, el par a 390, la hoja, el lector a 390, el lector a 1440 y la interior a 1440. Son cerca
  del **50 % del área de medios** y, con los medios en torno al 60 % de la página como en Koto, cerca del **30 % de la
  página**, dentro del 10 a 35 % del lock §20.3. Es una estimación con las áreas de cada forma; la medición final la
  hace la vista 2 con la página armada. Si pasa de 35, el primer cambio es sacar `medios/interior-1440.png` y dejar la
  interior solo a 390.
- **Seguidos:** el tramo más largo de campos es de tres (home a 1440, el par a 390), cortado por el finiquito sobre
  tinta; el segundo, también de tres (lector a 390, lector a 1440, interior a 1440), lo corta la sección de texto de
  «Qué muestra». Techo del lock: cuatro.
- **«Concepto» en cada medio:** el sello fijo de la cabecera del sitio sale en todas las capturas y en cada cuadro del
  recorrido; las placas y las portadas llevan la etiqueta de papel en la esquina; el pliego, arriba a la derecha.

## Cómo se rehace

```
cd marketing/portafolio/06-sesenta
python3 -I _herramientas/logo.py                     # logo en trazados
python3 -m http.server 8746 --bind 127.0.0.1 --directory sitio &
node _herramientas/identidad.mjs                     # pliego, placas, portadas
node _herramientas/capturar.mjs http://127.0.0.1:8746    # capturas + contraste, desborde, JSON-LD
node _herramientas/comprobar.mjs http://127.0.0.1:8746   # 360/390/768/1440, foco, movimiento reducido, letras
node _herramientas/medios.mjs http://127.0.0.1:8746      # medios del caso
node movimiento/recorrido.mjs http://127.0.0.1:8746 /tmp/cuadros
ffmpeg -framerate 30 -i /tmp/cuadros/c%04d.png -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart movimiento/recorrido.mp4
ffmpeg -framerate 30 -i /tmp/cuadros/c%04d.png -c:v libvpx-vp9 -b:v 0 -crf 30 -row-mt 1 -pix_fmt yuv420p movimiento/recorrido.webm
ffmpeg -i /tmp/cuadros/c0225.png -q:v 3 movimiento/poster.jpg
```

El recorrido se graba cuadro a cuadro y no con `recordVideo` de Playwright (que pedía el encargo): `recordVideo`
graba VP8 a unos 0,9 Mbit/s y queda blando para un medio de 1057 px (plan §5.5). Cuadro a cuadro, con el reloj de la
página detenido en cada cuadro, sale nítido e idéntico cada vez. Tiene scroll, un hover (la suma, en «Primer otrosí»),
la fecha escrita en el campo, el 60 que baja hasta 35 y el clic en el 161.
