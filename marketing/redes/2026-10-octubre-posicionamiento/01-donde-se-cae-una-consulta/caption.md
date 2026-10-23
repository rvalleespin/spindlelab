# Caption · Carrusel «Dónde puede caerse una consulta»

**Cuenta:** `spindlelab.cl` en Instagram · voz de marca, plural · 5 láminas de 1080×1350 (4:5)
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. Nada está publicado.
**Depende del sitio nuevo:** habla de «la revisión de una página», que hoy el sitio vivo todavía llama «diagnóstico». No se sube antes del go-live. Detalle en `publicar.md`.
**Puerta dura de reconocimiento:** los tres hallazgos vienen de prospectos reales que recibieron un correo en julio (según la tabla del lote; el texto exacto que salió está en Gmail). No se programa nada hasta mirar Gmail y hasta que Ramón decida a conciencia si acepta que se puedan reconocer. Detalle y opciones en `publicar.md`.

---

## 1. Pie de foto (copiar y pegar)

La primera línea es el gancho: es lo único que se ve antes del «más».

```
Una consulta puede caerse antes y después de que alguien te escriba.

Alguien pregunta por lo que vendes, mira tu sitio y quizás le escribe también a otra empresa. Entre esa primera consulta y la venta hay varios puntos donde se puede caer. Dos se ven desde afuera.

El primero es cuando te buscan. En dos empresas de servicios financieros que revisamos el 23 de octubre, el título que aparece en la pestaña del navegador al abrir la portada era una sola palabra: el nombre de la empresa.

El segundo es cuando entran. El cuerpo de la portada de otro sitio de servicios financieros trae cero palabras si se lee sin ejecutar JavaScript, el código que arma la página en el navegador. Nuestro chequeo gratis (spindlelab.cl/diagnostico) la lee así y, en ese sitio, deja en pendiente la señal de contenido suficiente. En un navegador, ese sitio se ve completo.

Los otros dos no se ven desde afuera: si el mensaje llega a alguien y cuánto tarda en responder. Eso lo conversamos en 20 minutos por videollamada, si después de la revisión quieres seguir.

Partimos por una página. Nos pasas la dirección de tu sitio y te devolvemos por escrito lo más importante que vimos y por dónde partiríamos. Es gratis.

spindlelab.cl/contacto
```

**Qué no dice, a propósito:** ningún nombre de empresa, ninguna cifra de pérdida, ningún plazo, nada sobre lo que ve o hace ninguna IA con una portada o un título, ningún resultado. Tampoco dice que el chequeo juzgue lo que dice un título (solo mide el largo) ni cuántas palabras cuenta el chequeo en el sitio de la lámina 3 (ver `fuentes.md` §1, lámina 3). «Consulta» significa una sola cosa en toda la pieza: lo que alguien pregunta por lo que vendes. Lo que te escribe esa persona es el «mensaje». Los tres hallazgos van con su fecha de revisión (23 de octubre) para que envejezcan bien. Cada afirmación y su archivo de respaldo están en `fuentes.md`.

## 2. Hashtags (opcionales, tres a cinco)

`#SEOtecnico #SitioWeb #MarketingConIA #Chile`

Sin tilde: en Instagram `#SEOtécnico` y `#SEOtecnico` son dos etiquetas distintas y parten el conteo. Si Ramón no los quiere, el pie queda igual sin ellos.

## 3. Texto alternativo por lámina (campo «Alt»)

1. Portada sobre fondo oscuro. Título: «Una consulta puede caerse antes y después de que alguien te escriba». Debajo: «Cuatro lugares donde puede pasar. Dos se ven desde afuera». Abajo, un mapa de cuatro tramos numerados. Los dos primeros, «Cuando te buscan» y «Cuando entran», van con línea verde continua bajo el rótulo «Se ven desde afuera». Los dos últimos, «Cuando escriben» y «Cuando esperan», van con línea discontinua bajo el rótulo «Se conversan».
2. Lámina «Cuando te buscan, 1 de 4». Texto: «El título de la pestaña debería decir qué haces y dónde». Etiqueta: «Pestaña del navegador · revisado el 23 de octubre de 2026». En dorado y muy grande, el número 1 y al lado la palabra «palabra». Debajo: «Eso decía ese título en la portada de dos empresas de servicios financieros: solo el nombre de la empresa». Nota: «Nuestro chequeo gratis pide entre 15 y 65 caracteres en el título. Lo que dice, lo vemos a mano en la revisión».
3. Lámina «Cuando entran, 2 de 4». Texto: «Una portada puede verse completa y llegar vacía». Etiqueta: «Cuerpo de la portada · revisado el 23 de octubre de 2026». En dorado y muy grande, el número 0 y al lado la palabra «palabras». Debajo: «Eso traía el cuerpo de la portada de un sitio de servicios financieros cuando lo leímos sin ejecutar JavaScript». Nota: «JavaScript es el código que arma la página en el navegador. Nuestro chequeo gratis lee sin ejecutarlo: en ese sitio deja «contenido suficiente» en pendiente».
4. Lámina «Cuando escriben y cuando esperan, 3 y 4 de 4». Texto: «Los otros dos no se ven desde afuera». Dos recuadros de borde discontinuo: «Cuando escriben: si el mensaje llega a alguien» y «Cuando esperan: cuánto tarda esa persona en responder». Debajo: «La revisión mira lo que se ve desde afuera. Estos dos los conversamos en 20 minutos por videollamada, si después quieres seguir».
5. Cierre. Texto: «Partimos por una página. Nos pasas la dirección de tu sitio y te devolvemos por escrito lo más importante que vimos y por dónde partiríamos. Es gratis». Recuadro: «Para pedir la revisión: spindlelab.cl/contacto». Al pie, el logotipo SpindleLab con el punto en dorado.

## 4. Cierre con CTA y enlaces con UTM completo

El CTA de la pieza es **pedir la revisión de una página**, que es el formulario de `/contacto/`. Instagram no entrega referer, así que todo enlace clicable lleva UTM. El pie de foto y los comentarios **no son clicables**, y por eso ahí la dirección va escrita sin UTM.

| Dónde va | Texto visible | URL |
|---|---|---|
| **Sticker de enlace** de la historia (cuenta de la empresa y cuenta personal) | Pedir la revisión de una página | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=donde-se-cae-una-consulta` |
| Pie de foto | `spindlelab.cl/contacto` | sin UTM (no clicable) |
| Primer comentario | `spindlelab.cl/contacto` | sin UTM (no clicable) |
| Bio (se define en `PLAN.md` §2.2, no en esta pieza) | Pedir la revisión | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=bio` |

**Por qué directo a `/contacto/` y no a la home:** el script que guarda el UTM en los campos ocultos vive solo en `/contacto/` (`spindlelab-astro/public/contacto/index.html`, campos `UTM Source`, `UTM Medium`, `UTM Campaign`). Si el enlace aterriza en otra página y la persona navega, el UTM se pierde. Es el único dato duro de atribución que tiene esta cuenta.

**Lo que no se puede separar:** la historia de la cuenta de la empresa y la de la cuenta personal comparten el mismo UTM, porque el formulario solo guarda fuente, medio y campaña. Si Ramón quiere saberlo, que lo pregunte en la llamada de 20 minutos («¿cómo llegaste?»).

## 5. Primer comentario (dos líneas, un solo enlace)

```
Para la revisión alcanza con la dirección de tu sitio. Los accesos, si avanzamos, vienen después.
spindlelab.cl/contacto
```

No repite el post: destraba la duda que suele venir después de leerlo, qué hay que entregar para partir. Sin hashtags, voz plural.

## 6. Historias (una línea cada una, el mismo día)

La pieza vive en la grilla; la historia es lo que la mueve. Se comparte la publicación a historias con el sticker de enlace de la sección 4.

- **Cuenta de la empresa (plural):** `Cuatro lugares donde puede caerse una consulta. Dos se ven desde afuera.`
- **Cuenta personal de Ramón (singular):** `Estos son cuatro lugares donde puede caerse una consulta, antes y después de que alguien escriba. Los dos primeros los miré en sitios reales.`
