# Imagen OG v3 (la tarjeta al compartir un enlace)

Reemplaza a `spindlelab-astro/public/assets/img/og-marca.jpg`, que es de la marca anterior
(Gabarito en el titular, rótulo en mayúsculas espaciadas, píldora, verde azulado).

| Pieza | Uso | og:image:alt propuesto |
|---|---|---|
| `a-titular.jpg` | **por defecto en todo el sitio** | «SpindleLab. Estás pagando para que lleguen a tu sitio. Ahí se corta el circuito.» |
| `b-obra.jpg` | solo Desarrollo web y Trabajo | «Tres sitios hechos por SpindleLab: el de fotografía y el book de modelo de Bernardo Combeau (cliente) y Verifica y Cumple, producto propio» |

- **Textos:** el ojillo y el titular de A son los del hero de la home, tal cual; el de B es el
  h1 de Desarrollo web, tal cual. La línea de pie de A («SEO técnico y visibilidad en IA ·
  Chile») es un descriptor adaptado del title de la home, no una afirmación nueva.
- **Raigal no está en B:** sin su rótulo de concepto, una tarjeta que circula sola mostraría
  una clínica inventada como trabajo real (y el rótulo no se lee a tamaño de LinkedIn).
- **Un solo oro:** el punto del wordmark (78 px de oro a 1200, 16 a 552). El lima de la
  captura de Verifica y Cumple no es oro por tono (73° contra 46°).
- **Límite conocido:** en la miniatura cuadrada de WhatsApp/iMessage (recorte centrado de
  120 px) no entra la marca; el dominio lo muestra la plataforma. Meterla ahí sería otra
  composición, no un parche.

## Cómo se rinde

```
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node render.mjs a-titular b-obra
python3 reducir.py a-titular b-obra
```
(En la Mac, sin `CHROME=`: usa el Chromium de Playwright.) `reducir.py` exporta con croma
completo: con el 4:2:0 por defecto, el punto dorado salía apagado (#8D834E en vez de
#C9A227). Ese fue el bloqueante de la revisión independiente del 6-oct, ya corregido.

## Para usarla en el sitio

Hoy `Layout.astro` fija `og-marca.jpg?v=4` para todas las páginas, y la spec v3 §6 lo
protege: lo autoriza Ramón. El cambio mínimo es una prop opcional `ogImage`/`ogImageAlt`
(con el valor actual por defecto, para que el sitio publicado no cambie) y archivos con
nombre nuevo (`og-v3.jpg`, `og-v3-desarrollo-web.jpg`): `/assets/*` se cachea 7 días.
