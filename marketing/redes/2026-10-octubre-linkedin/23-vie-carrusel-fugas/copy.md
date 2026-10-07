# Carrusel — "Por dónde se te escapa la gente"

**Canal:** página de LinkedIn de SpindleLab · **voz plural** · formato **documento (PDF deslizable)**
**Comparte:** Ramón desde su perfil, con comentario propio en **singular** (decisión suya, 7-oct)
**Slot propuesto:** vie 23-oct · **Tipo C** (criterio de construcción)
**Identidad:** la **nueva**, del sitio en obra (decisión de Ramón, 7-oct: "las publicaciones serán
con lo nuevo"). **El diseño espera el manual nuevo.**
**Estado:** ⬜ copy escrito, **sin aprobar**. Sin diseñar: faltan los tokens del manual.

## De dónde sale

Del ángulo que Ramón validó el 7-oct para el post del Cyber: **por dónde se le escapa la gente al
sitio, antes que cómo se ve.** El post es de coyuntura y vence esta semana; el carrusel toma el
mismo punto de vista en un formato que dura.

El formato de "así no / así sí" es el validado de la casa (`carrusel-03-cinco-chequeos`): cada
punto no solo se explica, se **muestra**. Esa es la promesa de marca, enseñar el porqué.

## Las cinco fugas

Son de **conversión**, no de visibilidad en IA, y es a propósito: el canal ya habló de lo segundo
tres veces este mes. Ninguna repite una pieza viva.

| Lámina | Fondo | Contenido |
|---|---|---|
| 1 | oscuro | **Portada:** "Por dónde se te escapa la gente" + "Cinco fugas que no se ven mirando el sitio en tu computador." |
| 2 | claro | **01 · La espera.** Se ve impecable en tu pantalla y tarda en el teléfono de tu cliente, con señal mala y en la calle. Así no: la portada carga la foto grande primero. Así sí: carga el texto primero y la foto después. |
| 3 | claro | **02 · Los primeros segundos.** Quien llega no sabe a qué te dedicas hasta la tercera pantalla. Así no: un titular que podría ser de cualquier empresa. Así sí: qué haces, para quién, y dónde. |
| 4 | claro | **03 · El formulario que pide de más.** Cada campo extra es una razón más para cerrar la pestaña. Así no: nombre, apellido, rut, empresa, cargo, teléfono, rubro. Así sí: lo mínimo para poder responderte, y dicho para qué lo pides. |
| 5 | claro | **04 · El precio que no está.** La primera pregunta de quien compara no es qué haces, es cuánto cuesta. Si no está, se va a buscarlo a otra parte. Así no: "solicita tu cotización". Así sí: desde cuánto, y qué incluye. |
| 6 | claro | **05 · El botón que lleva a otra parte.** El aviso prometía una cosa y la página que abre habla de otra. Así no: todos los botones a la home. Así sí: cada botón a la página que resuelve lo que el botón prometió. |
| 7 | oscuro | **Cierre:** "Ninguna de las cinco se arregla rehaciendo el sitio." + CTA |

**Regla para las láminas 2 a 6:** la tarjeta de "así no / así sí" va **a la misma altura en las
cinco**, para que el ojo caiga siempre en el mismo lugar al deslizar. Es lo que hizo funcionar al
carrusel-03.

**Los ejemplos son genéricos e ilustrativos.** Ninguna empresa identificable, ninguna cifra,
ningún cliente. Misma regla que el carrusel-03.

## Post de la página (voz plural, copiar y pegar)

Un sitio puede verse impecable y dejar escapar a la mayoría de la gente que llega.

No se nota mirándolo en tu computador, con tu conexión y sabiendo de antemano a qué se dedica la empresa. Se nota cuando entra alguien que no sabe nada de ti, desde un teléfono, en la calle.

Estas son cinco fugas que vemos en casi todas las revisiones que hacemos, con lo que habría que cambiar en cada una.

Ninguna de las cinco se arregla rehaciendo el sitio.

El link va en el primer comentario.

## Primer comentario de la página

Así construimos: https://spindlelab.cl/servicios/desarrollo-web/

Están los packs con lo que incluye cada uno y su precio.

## El compartir de Ramón (voz singular, copiar y pegar)

> ⚠️ **Este texto importa más que de costumbre.** La página tiene 4 seguidores, así que el alcance
> real de esta pieza es tu red personal. **El compartir no es un extra, es el canal.**

La número 4 me costó aceptarla. Publicar los precios significa que te comparan por precio antes de hablar contigo.

Lo hice igual, y lo que pasó fue lo contrario de lo que me habían advertido: llegan menos consultas, y llegan sabiendo.

## ⚠️ Cómo compartir para que salga en tu voz (hallazgo del 25-sep, no se puede improvisar)

Compartir un post de la propia página **desde la vista de administrador fija la identidad en la
página**, sin selector para cambiar a la personal. A diferencia de comentar, que sí tiene selector.
Si se hace así, el compartir sale firmado por SpindleLab y no por ti, que es justo lo que no sirve.

**La vuelta que funcionó:** abrir la **URL pública** del post
(`linkedin.com/feed/update/urn:li:activity:<id>/`) y compartir desde ahí. En esa vista sí aparece
"Ramón Vallejos · Publicar para todo el mundo" por defecto. El detalle completo está en
`2026-09-septiembre/24-jue-tres-mitos-ley21719/publicar.md`.

**Antecedente, para que esta vez quede distinto:** el 25-sep se compartió un post de la página y lo
mandaste eliminar. Las dos razones que diste fueron no repetir "soy fundador de SpindleLab" y que
el link fuera visible. Este comentario de compartir no dice la frase, y el link vive en el primer
comentario de la página, que es donde la convención lo pone.

## Qué falta para producirlo (Bruno)

1. **El manual nuevo**, con los hex exactos, las tipografías **en `.woff2`** y la regla del acento.
   El pipeline es HTML → PNG con Chrome headless, con las fuentes copiadas al lado de la pieza para
   que el render no dependa de la red.
2. **Siete láminas 1080×1350** (vertical, que rinde más que el cuadrado en el feed) y el **PDF
   deslizable** para subir como documento de LinkedIn.
3. **Nada de la identidad vieja**: ni punto dorado, ni la firma "Chequea tu sitio gratis", ni la
   etiqueta de serie de septiembre. Esta pieza estrena sistema.

## Chequeo de duplicación

| Pieza viva | ¿Se pisa? |
|---|---|
| **8-oct · el Cyber como examen del sitio** | Mismo punto de vista, a propósito, y por eso van separados: el del 8 es coyuntura y dura días, este dura. Quince días de distancia |
| 2-oct · "El sitio es la tienda principal" | No. Ahí es dónde poner el esfuerzo; acá es qué se arregla |
| 1-sep · "Publiqué mis precios" (personal) | **La fuga 04 lo roza.** Por eso el compartir de Ramón lo toma de frente en vez de esquivarlo: es el único de los cinco donde él tiene algo propio que contar |
| ~8-sep · "Un motor de adquisición" (página, carrusel) | No. Aquel es cómo se conectan los servicios; este es qué falla dentro de una página |

## Lo que este carrusel NO hace

- **No habla de visibilidad en IA.** El canal ya lo hizo tres veces este mes (5, 7 y el reel del 13).
- **No cita ninguna cifra**, ni del Cyber ni de auditorías.
- **No nombra a ningún cliente ni prospecto**, y los ejemplos no permiten identificar a nadie.
- **No promete resultados.** Dice qué cambiar, no cuánto sube.
