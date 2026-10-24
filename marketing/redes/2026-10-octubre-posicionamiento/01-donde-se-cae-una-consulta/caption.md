# Caption · Carrusel «Dónde se cae una consulta»

**Cuenta:** `spindlelab.cl` en Instagram · voz de marca, plural · 5 láminas de 1080x1350 (4:5)
**Versión:** v2, rehecha el 23-oct-2026 (noche) con `PLAN.md` v2 §5 y las opciones seguras de las decisiones A, C y D. Reemplaza a la v1 completa: gancho nuevo, láminas 2 y 3 sin ningún caso de un prospecto, todas las láminas re-renderizadas desde el HTML.
**Corregida el 23-oct-2026 (noche) tras la revisión independiente:** las láminas 2 y 3 ya no implican una pérdida que no muestran. La 2 quita la cifra dorada de 210 px y dice qué revisa el chequeo (el largo del título); la 3 nombra a quien recibe la portada vacía (quien no ejecuta JavaScript, como nuestro chequeo). El marco de la portada («puede caerse») no cambia. Detalle en `fuentes.md` §6.
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. Nada está publicado.
**Depende del sitio nuevo:** habla de «la revisión de una página», que hoy el sitio vivo todavía llama «diagnóstico». No se sube antes del go-live. Detalle en `publicar.md`.

---

## 1. Pie de foto (copiar y pegar)

La primera línea es el gancho: es lo único que se ve antes del «más».

```
Entre que alguien te busca y te compra, una consulta puede caerse en cuatro lugares.

Alguien pregunta por lo que vendes, mira tu sitio y quizás le escribe también a otra empresa.

El primero es cuando te buscan. El título que aparece en la pestaña del navegador debería decir qué haces y dónde. Nuestro chequeo gratis (spindlelab.cl/diagnostico) revisa que tenga entre 15 y 65 caracteres.

El segundo es cuando entran. Hay portadas que llegan vacías a quien no ejecuta JavaScript, porque su texto lo arma el navegador. Nuestro chequeo las lee así, y sin texto en el código no se cumple «Tu portada tiene contenido suficiente».

Los otros dos son cuando escriben y cuando esperan: que el mensaje llegue a alguien y cuánto tarda esa persona en responder. Los conversamos en 20 minutos por videollamada, si después de la revisión quieres seguir.

Si quieres que miremos una página de tu sitio, nos pasas la dirección y te devolvemos por escrito lo más importante que vimos y por dónde partiríamos. Es gratis.

spindlelab.cl/contacto
```

**Qué no dice, a propósito:** ningún nombre de empresa y ningún caso de un sitio real (decisión D, opción segura: la pieza describe la señal, no el caso), ninguna cifra de un sitio ni de pérdida, ningún plazo de entrega, nada sobre lo que ve o hace ninguna IA con un título o con una portada vacía, ningún resultado, ningún precio. El único dato numérico es un criterio de nuestro propio chequeo (15 a 65 caracteres), que cualquiera puede comprobar corriéndolo; los 20 minutos son el largo de una conversación, no un plazo. «Consulta» significa una sola cosa en toda la pieza: lo que alguien pregunta por lo que vendes, desde que busca hasta que compra. Lo que esa persona te escribe es el «mensaje». Cada afirmación y su archivo de respaldo están en `fuentes.md`.

## 2. Hashtags (opcionales, tres a cinco)

`#SEOtecnico #SitioWeb #MarketingConIA #Chile`

Sin tilde: en Instagram `#SEOtécnico` y `#SEOtecnico` son dos etiquetas distintas y parten el conteo. Si Ramón no los quiere, el pie queda igual sin ellos.

## 3. Texto alternativo por lámina (campo «Alt», máximo 120 caracteres)

1. (119) `Portada: entre que te buscan y te compran, una consulta puede caerse en cuatro lugares. Abajo, un mapa de cuatro pasos.`
2. (119) `Esquema de una pestaña con el texto «Qué haces y dónde». Nuestro chequeo revisa que el título tenga 15 a 65 caracteres.`
3. (114) `Esquema de dos recuadros: una página con texto en un navegador y el cuerpo vacío para quien no ejecuta JavaScript.`
4. (117) `Dos recuadros punteados: cuando escriben, que el mensaje llegue a alguien; cuando esperan, cuánto tarda la respuesta.`
5. (92) `Pide la revisión de una página de tu sitio. Es gratis. Para pedirla: spindlelab.cl/contacto.`

## 4. Cierre con CTA y enlaces con UTM completo

El CTA de la pieza es **pedir la revisión de una página**, que es el formulario de `/contacto/`. Instagram no entrega referer, así que **todo enlace clicable lleva UTM**. El pie de foto y los comentarios **no son clicables** (Instagram no vuelve enlace una dirección escrita ahí), y por eso en esos dos lugares la dirección va escrita corta, sin UTM, y no cuenta como enlace.

| Dónde va | Texto visible | ¿Clicable? | URL |
|---|---|---|---|
| **Sticker de enlace** de la historia (cuenta de la empresa y cuenta personal) | Pedir la revisión de una página | Sí | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=donde-se-cae-una-consulta` |
| Bio (se define en `PLAN.md` §2.2, no en esta pieza) | Pedir la revisión | Sí | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |
| Si Ramón responde por mensaje directo y manda el enlace | (el enlace) | Sí | el mismo del sticker, con `utm_campaign=donde-se-cae-una-consulta` |
| Pie de foto | `spindlelab.cl/contacto` y `spindlelab.cl/diagnostico` | No | direcciones escritas, sin UTM |
| Primer comentario | `spindlelab.cl/contacto` | No | dirección escrita, sin UTM |

**Por qué directo a `/contacto/` y no a la home:** el script que guarda el UTM en los campos ocultos vive solo en `/contacto/` (`spindlelab-astro/public/contacto/index.html`, campos `UTM Source`, `UTM Medium`, `UTM Campaign`). Si el enlace aterriza en otra página y la persona navega, el UTM se pierde. Es el único dato duro de atribución que tiene esta cuenta.

**Lo que no se puede separar:** la historia de la cuenta de la empresa y la de la cuenta personal comparten el mismo UTM, porque el formulario solo guarda fuente, medio y campaña. Quien tipea la dirección escrita del pie entra como «directo». Los dos casos se cubren preguntando «¿cómo llegaste?» en la llamada de 20 minutos.

**Mecanismo opcional por mensaje directo (apagado por defecto):** si Ramón lo quiere, el pie puede cerrar con «comenta REVISIÓN y te mandamos el enlace», y el mensaje lleva el UTM de esta pieza. Cuesta responder a mano; con 19 seguidores son pocos mensajes (`PLAN.md` §1).

## 5. Primer comentario (dos líneas, un solo enlace)

```
Para la revisión alcanza con la dirección de tu sitio. Los accesos, si avanzamos, vienen después.
spindlelab.cl/contacto
```

No repite el post: destraba la duda que suele venir después de leerlo, qué hay que entregar para partir. Sin hashtags, voz plural.

## 6. Historias (una línea cada una, el mismo día)

La pieza vive en la grilla; la historia es lo que la mueve. Se comparte la publicación a historias con el sticker de enlace de la sección 4.

- **Cuenta de la empresa (plural):** `Cuatro lugares donde puede caerse una consulta, entre que alguien te busca y te compra.`
- **Cuenta personal de Ramón (singular):** `Cuatro lugares donde puede caerse una consulta, entre que alguien te busca y te compra. Si quieres que mire una página de tu sitio, el enlace va acá.`

La v1 decía en la historia personal «los dos primeros los miré en sitios reales». Se sacó: la pieza ya no tiene ningún caso real, y esa frase afirmaba uno.
