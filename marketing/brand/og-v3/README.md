# Imagen OG v3 (la tarjeta al compartir un enlace)

Reemplaza a `spindlelab-astro/public/assets/img/og-marca.jpg`, que es de la marca anterior
(Gabarito en el titular, rótulo en mayúsculas espaciadas, píldora, verde azulado).

- `a-titular` — el titular de la home en display. Pensada como imagen por defecto del sitio.
- `b-obra` — el titular de Desarrollo web con tres obras reales en dispositivo (Raigal fuera:
  sin su rótulo de concepto sería mostrar una clínica inventada como trabajo). Para páginas
  de Desarrollo web y Trabajo.

Cómo se rinde: `node render.mjs a-titular b-obra` (Chromium a 2x) y se reduce a 1200×630 con
Lanczos. Las fuentes van al lado del HTML (Manrope variable, Gabarito para el wordmark).
Ningún texto es nuevo: todos existen en el sitio v3.

Para usarla en el sitio hay que tocar `Layout.astro` (hoy fija `og-marca.jpg?v=4` para todas
las páginas), y la spec v3 §6 lo protege: lo autoriza Ramón.
