# Caption · Carrusel "Probado primero en lo nuestro"

**Canal:** Instagram `spindlelab.cl` · carrusel de 5 láminas, 1080x1350 (4:5, como las piezas 01 y 02) · voz plural (la marca)
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. No publicado. Nada sale de un borrador generado.
**NO PROGRAMAR hasta que Ramón responda la decisión A** (ver `publicar.md`): la lámina 2 y el párrafo 2 de este pie de foto son contenido de la Ley 21.719, que el plan marca como línea de Verifica y Cumple.
**Slug del UTM:** `probado-primero-en-lo-nuestro`

La primera línea mide 85 caracteres: se ve completa antes del "más".

---

## Pie de foto (copiar y pegar)

Antes de publicar nuestro chequeo, lo corrimos sobre nuestro propio sitio. Salió mal.

Era el chequeo de la Ley 21.719 de datos personales. Marcó que no había política de privacidad ni gestor de consentimiento. Que Analytics y el Pixel de Meta corrían antes de que alguien diera permiso lo vimos nosotros: el chequeo solo ve si están en el código.

Al arreglar eso apareció algo peor, que el chequeo no había marcado. Un error en el formulario de contacto dejaba el botón «Enviando…» pegado para siempre, y el mensaje no llegaba a ninguna parte.

No tenemos cómo saber cuántos mensajes se perdieron así antes de que lo encontráramos. Hoy, si el envío falla, el botón se reactiva y avisa.

Si quieres que miremos una página de tu sitio, pídenos la revisión en spindlelab.cl/contacto. Es gratis y te respondemos por escrito.

*(Sin hashtags, como el post de la página del 21-sep sobre esta misma historia. Si Ramón los quiere: `#SEO #Chile`. No lleva `#Ley21719`: el sujeto de la pieza es el formulario, no la ley.)*

*(Remates, contados como pide `voz-spindlelab/corpus.md` §3: uno solo, "Salió mal." El resto es explicación plana. "El mensaje no llegaba a ninguna parte" va ahora dentro de la misma frase que el error, y "Lo arreglamos." se cambió por un hecho comprobable.)*

### Variante B del último párrafo (opcional, cuesta responder a mano)

Si quieres que miremos una página de tu sitio, pídenos la revisión. Es gratis y te respondemos por escrito. Comenta REVISIÓN y te mandamos el enlace.

Con esta variante el mensaje directo que se manda lleva el enlace con UTM completo (abajo), que es la única forma de que el enlace sea tocable desde el pie de foto. Con 19 seguidores son pocos mensajes. Si se usa, el primer comentario cambia (ver `publicar.md`).

---

## CTA y UTM completo

Un pie de foto de Instagram no tiene enlaces tocables, así que la dirección va escrita **sin** parámetros (`spindlelab.cl/contacto`) y el enlace con UTM va donde sí se toca:

| Dónde | Enlace |
|---|---|
| Sticker de enlace en la historia que comparte el carrusel | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=probado-primero-en-lo-nuestro` |
| Respuesta por mensaje directo (solo variante B) | el mismo enlace |
| Enlace del perfil mientras esta pieza sea la activa (opcional) | el mismo enlace, con título "Pedir la revisión" |

Va directo a `/contacto/` y no a la home: el script que guarda los UTM vive solo en esa página (`spindlelab-astro/public/contacto/index.html`, campos ocultos `UTM Source`, `UTM Medium`, `UTM Campaign`). Si el enlace aterriza en la home y la persona navega, el UTM se pierde. Instagram no entrega referer (comprobado en producción), así que sin el UTM la visita se cuenta como "directa".

Quien lea la dirección en el pie de foto y la escriba a mano entra como "directo". Eso se cubre con la pregunta "¿cómo llegaste?" en la llamada de 20 minutos.

---

## Texto alternativo por lámina (accesibilidad)

1. Portada: "Antes de publicar nuestro chequeo, lo corrimos sobre nuestro propio sitio. Salió mal."
2. Lista de tres casillas tachadas: "Lo que tenía nuestro sitio. El chequeo marcó que no había política de privacidad ni gestor de consentimiento. Nosotros vimos Analytics y el Pixel de Meta corriendo antes del permiso."
3. Dibujo de un formulario con el botón «Enviando…» detenido: "Un error lo dejaba pegado para siempre y el mensaje no llegaba."
4. Dibujo del mismo formulario con el aviso «Algo falló al enviar» y el botón activo: "No sabemos cuántos mensajes se perdieron así. Hoy, si el envío falla, el botón se reactiva y avisa."
5. Cierre: "Pídenos la revisión de una página de tu sitio. Es gratis y te respondemos por escrito en spindlelab.cl/contacto."

Cada alt tiene la idea completa en las primeras palabras, por si el campo de Instagram corta.
