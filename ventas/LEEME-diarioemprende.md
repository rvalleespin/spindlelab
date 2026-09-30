# Guía de Empresas y Negocios de DiarioEmprende — qué da y qué no

Fuente: `https://www.diarioemprende.cl/?guia` (paginada en `/guia/?page=2`, `?page=3`).
Revisada y cosechada completa el 30-sep-2026.

## Lo bueno: la ficha trae el contacto publicado

Cada aviso (`/aviso/<id>`) publica **CIUDAD, FONO, CORREO y WEB** del negocio. Eso
salta el paso más caro del embudo de Google Maps, donde hay que entrar al sitio y
buscar el correo a mano (y cerca de un tercio no publica ninguno).

El correo va ofuscado con el `email-protection` de Cloudflare: está en el atributo
`data-cfemail` como hexadecimal, y se descifra con un XOR donde el primer byte es la
llave. El navegador lo descifra solo, así que leer la página renderizada también sirve.

## Lo malo: es el techo completo, y un tercio está muerto

**Son 53 avisos en total.** No hay más: las tres páginas son todo el directorio, y
`diariobinacional.cl/guia/` sirve exactamente los mismos 53 ids (es una guía
compartida del Grupo DiarioSur, no un directorio aparte). `diarioempresarial.cl` y
`yopublico.cl` no tienen guía propia.

De los 53:

- **27 no declaran sitio web.** No son lead de Verifica y Cumple, pero sí de
  Desarrollo Web.
- **26 declaran web.** De esas medí 16 con la sonda.
- **De las 16 medidas, 6 estaban muertas** (37%): cuatro dominios que ya no existen
  (`sercontal.cl`, `necesitosocio.cl`, `ingenieriar.com` dan NXDOMAIN), uno aparcado
  en GoDaddy (`verdepoly.com`) y uno en construcción (`az400.cl`).

El directorio **nunca poda**. Hay avisos de noviembre de 2020 todavía en la primera
página. Por eso ninguna fila se da por buena sin medir el sitio.

### El caso que obliga a medir siempre

`psicologiaact.cl` figura como consulta de psicología online en Santiago. El dominio
fue reciclado: hoy sirve un sitio de casinos online. Si se hubiera escrito el correo
confiando en la ficha del directorio, el correo habría hablado de datos de pacientes
a un dominio de apuestas.

El "0 cookies, 6 peticiones" de la sonda tampoco significa sitio limpio: fue
exactamente la firma de los cuatro dominios caídos, porque lo que Chrome carga es su
propia página de error. Hay que leer el título y el cuerpo, no el conteo.

## Rendimiento real

**9 leads medidos con hallazgo**, de 53 avisos: tgfclean, ingeoreva, abogadosfya,
estamoscontigo, dermocannabis (sin correo publicado), bycauditores, focuscontable,
casasdelranco, iccs. Uno más (`detailingchile.cl`) tiene el sitio en orden y se
descartó por no tener hallazgo. Otro (`bschileconsultores.cl`) ya estaba en el banco
de Google Maps.

Ninguno había sido contactado antes (`in:sent` sin límite de fecha, vacío) ni estaba
en `lista-exclusion.csv`.

Comparado con Google Maps: la conversión por aviso es peor (9 de 53), pero cada lead
sale mucho más barato porque el correo viene dado. Y cubre regiones que Maps no nos
había dado: Los Ríos, Los Lagos y Aysén.

## No volver a minarla

Está agotada. Tiene sentido volver en unos meses solo para los avisos nuevos, que
son los que tienen id más alto (el id empieza con el timestamp en hexadecimal, así
que ordenar por id descendente pone los recientes primero).

Las filas van en `contactos-diarioemprende-30sep.csv`.
