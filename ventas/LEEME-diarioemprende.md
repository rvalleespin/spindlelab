# Guía de Empresas y Negocios de DiarioEmprende — qué da y qué no

Fuente: `https://www.diarioemprende.cl/?guia` (paginada en `/guia/?page=2`, `?page=3`).
Revisada y cosechada completa el 30-sep-2026. Las filas están en
`contactos-diarioemprende-30sep.csv`.

## Lo bueno: la ficha trae el contacto publicado

Cada aviso (`/aviso/<id>`) publica **CIUDAD, FONO, CORREO y WEB** del negocio. Eso
salta el paso más caro del embudo de Google Maps, donde hay que entrar al sitio y
buscar el correo a mano (y cerca de un tercio no publica ninguno).

El correo va ofuscado con el `email-protection` de Cloudflare: está en el atributo
`data-cfemail` como hexadecimal, y se descifra con un XOR donde el primer byte es la
llave. El navegador lo descifra solo, así que leer la página renderizada también sirve.

## El techo: 53 avisos y no hay más

Las tres páginas son todo el directorio. `diariobinacional.cl/guia/` sirve exactamente
los mismos 53 ids (es una guía compartida del Grupo DiarioSur, no un directorio
aparte), y `diarioempresarial.cl` y `yopublico.cl` no tienen guía propia.

## El campo WEB no es confiable en NINGUNA de las dos direcciones

Esto es lo más importante que aprendimos y lo que hay que recordar si se vuelve:

- **Declara web y no hay nada.** De 16 sitios medidos, **6 estaban muertos**: tres
  dominios que ya no existen (`sercontal.cl`, `necesitosocio.cl`, `ingenieriar.com`),
  uno aparcado en GoDaddy (`verdepoly.com`), uno en construcción (`az400.cl`) y uno
  **reciclado**: `psicologiaact.cl` figura como consulta de psicología online y hoy
  sirve un sitio de casinos. Si se hubiera confiado en la ficha, el correo habría
  hablado de datos de pacientes a un dominio de apuestas.
- **No declara web y sí tiene sitio.** `contotal.cl` y `rioleon.cl` aparecen con el
  campo WEB vacío y los dos tienen sitio en pie, con formularios y, en el caso de
  Río León, pago en línea. Son dos de los mejores leads del lote y se habrían perdido
  filtrando por el campo.

**Entonces: el campo WEB sirve para ordenar la cola, no para decidir.** Para cada
correo del aviso hay que resolver el dominio (`dig A` y `dig MX`) y, si hay sitio,
medirlo.

El directorio **nunca poda**: hay avisos de noviembre de 2020 en la primera página.

## Dos trampas de medición que costaron caro

1. **"Pocas peticiones y cero cookies" no es sitio limpio.** Es la firma de la página
   de error de Chrome. Los cuatro dominios caídos daban exactamente ese conteo, y una
   corrida entera de `contotal.cl` salió así porque el entorno perdió la red a mitad
   (`ERR_INTERNET_DISCONNECTED`). Hay que leer el **título y el cuerpo** del JSON de la
   sonda, no el número de peticiones.
2. **Sin MX no hay correo que llegue.** `sercontal.cl`, `necesitosocio.cl` e
   `ingenieriar.com` no tienen registro A **ni MX**, así que los correos del aviso
   rebotan antes de salir. La marca "no contactable" vive en el CSV de este banco.
3. **Y tener MX tampoco garantiza que la casilla exista.** De los 10 enviados el 30-sep,
   **2 rebotaron con 550 No Such User**: `asesor@contotal.cl` e `info@detailingchile.cl`.
   Los dos dominios resuelven y tienen MX; la casilla publicada en la guía simplemente ya
   no está. Un 20% de rebote en una tanda es mucho para la reputación de
   `hola@spindlelab.cl`, así que **conviene validar la casilla antes de enviar**, no solo
   el dominio. Los dos quedaron en `lista-exclusion.csv` como `direccion-invalida`, que
   bloquea la dirección y no el dominio: Contotal tiene alternativa viva
   (`corporativo@contotal.cl`, publicada en su propio sitio) y se le reescribió ahí.

   Detailing Chile tiene una vuelta incómoda que vale registrar: `info@detailingchile.cl`
   es la única dirección que publican y es la que aparece **en su propia política de
   privacidad y en sus términos**. Quien quiera ejercer un derecho sobre sus datos escribe
   a una casilla que rechaza el correo, y no tenemos forma de avisarles.

## Rendimiento real

De 53 avisos: **10 correos enviados** el 30-sep, de los que **8 llegaron**: tgfclean,
ingeoreva, abogadosfya, estamoscontigo, focuscontable, casasdelranco, iccs, bycauditores
y rioleon. Contotal y Detailing Chile rebotaron (ver más arriba); Detailing Chile llevaba
la variante "el sitio está bien, el hueco es la IA", que es la que corresponde cuando no
hay hallazgo que mostrar.

**3 quedan pendientes** de escribir, con ángulo de Desarrollo Web porque el dominio
existe y no sirve sitio: `consultoresdac.com` (tiene MX de Google y ningún registro A),
`az400.cl` (en construcción) e `ingenieriar.com` (se le escribe a `nrozas@holding.wiki`,
que sí resuelve).

**1 medido sin correo publicado:** `dermocannabis.net`, e-commerce de CBD con 9 cookies
antes de tocar nada y cero enlaces legales. El aviso no publica correo y la portada
tampoco; hay que buscarlo en su página de contacto.

**27 avisos no declaran web y su correo es un gmail o hotmail.** Son leads de
Desarrollo Web, pero flojos para un correo frío con hallazgo medido. No se trabajaron.

Ninguno de los contactados había recibido correo antes (`in:sent` sin límite de fecha,
vacío) ni estaba en `lista-exclusion.csv`.

Comparado con Google Maps: la conversión por aviso es peor, pero cada lead sale más
barato porque el correo viene dado, y cubre Los Ríos, Los Lagos y Aysén, que Maps no
nos había dado.

## La línea de baja de este banco

Es una cuarta variante, y la más sólida de las cuatro, porque el prospecto publicó su
correo él mismo en una guía pública:

> Si no quieres que te escriba, respóndeme y no lo vuelvo a hacer. Saqué tu correo de
> la Guía de Empresas y Negocios de DiarioEmprende, donde ustedes lo publicaron; en
> verifica.spindlelab.cl/privacidad cuento qué datos trato y cómo pedir que deje de
> hacerlo.

## No volver a minarla

Está agotada. Tiene sentido volver en unos meses solo por los avisos nuevos, que son
los de id más alto: el id empieza con el timestamp en hexadecimal, así que ordenar por
id descendente pone los recientes primero.
