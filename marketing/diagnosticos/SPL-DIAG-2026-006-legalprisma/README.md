# SPL-DIAG-2026-006 — Legal Prisma (legalprisma.cl)

**Fecha:** 31-ago-2026 · **Estado:** ⏳ **LISTO, NO ENVIADO** (falta el pase de Ramón).

## Situación del prospecto (ojo antes de mandarlo)

Legal Prisma **no ha sido contactado todavía**. Está en `ventas/contactos-abogados-santiago.csv`
y en `marketing/outbound/envios-abogados-19ago.csv` como **Sebastián Escudero Parada**
(`sebastian@legalprisma.cl`), marcado **"2ª ola (catch-all) · Pendiente"**. O sea:

- No hay reloj de 48 h corriendo: este diagnóstico se hizo **antes** del outbound, no como
  respuesta a un "ok, mándamelo".
- El correo es **catch-all**, con el riesgo de rebote que eso trae. El canon del 28-ago dice
  oleadas chicas de 10-15 midiendo rebote, y cortar si supera el 5%.
- El pipeline **no** se movió a "Diagnóstico enviado", porque sería falso. Cuando salga, esa
  fila la escribe la sesión troncal (`ventas/pipeline.md`).

## Lo que quedó pendiente de verificar

- **La prueba en vivo en ChatGPT / Perplexity no se corrió.** La sección 2 lo dice
  explícitamente y no inventa ningún resultado. Si Ramón la corre, la pregunta de categoría
  natural es *"¿qué estudio de abogados en Santiago me recomiendas para un tema laboral de
  empresa?"* y el documento se puede reforzar con lo que devuelva.

## Hallazgos, y cómo se verificaron (31-ago-2026)

Todo con `curl` directo contra legalprisma.cl, más parseo del JSON-LD.

| Hallazgo | Cómo se comprobó |
|---|---|
| HTTP 200 en 0,59 s; `http://` y sin-`www` redirigen a `https://www.`; 404 real en URL inventada | `curl -D -` y `-w "%{http_code} %{url_effective}"` |
| 12 páginas internas con `<title>`, meta description y canonical propios, sin duplicados | descarga de las 12 y grep de cada etiqueta |
| Sitemap Yoast; `post-sitemap.xml` declara **246** entradas | `/sitemap_index.xml`, `/post-sitemap.xml` |
| Portada: 237.242 bytes de HTML, 64 `<img>` (6 sin `alt`), 32 CSS, 54 scripts | conteo sobre el HTML descargado |
| `og:locale` = `es_ES` (España) | grep de `og:` en la portada |
| Correo ofuscado por Cloudflare: 1 `__cf_email__`, **cero** `mailto:` en el código | grep sobre el HTML |
| **robots.txt bloquea por nombre a GPTBot, ClaudeBot, Google-Extended, meta-externalagent, Applebot-Extended, CCBot, Bytespider y Amazonbot**, más `Content-Signal: ai-train=no`, dentro del bloque "Cloudflare Managed content" | `/robots.txt` completo, mapeado grupo por grupo con `awk` |
| Googlebot, Bingbot, PerplexityBot, OAI-SearchBot y ChatGPT-User **no** están bloqueados | los tres últimos no figuran en el archivo, así que caen bajo `User-agent: * / Allow: /` |
| Portada sin `Organization` ni `LegalService`: solo `WebPage`, `ImageObject`, `BreadcrumbList`, `WebSite` | parseo del `@graph` |
| De las **9** áreas de práctica, solo `/asesoria-contable-y-tributaria/` declara `LegalService` | parseo del JSON-LD de las 12 páginas |
| En esa página el marcado está **triplicado**: 5 bloques, `LegalService` y `FAQPage` ×3, con la dirección escrita de dos formas | parseo de los 5 bloques |
| 4 abogados con nombre, cargo y currículum en la portada, y **ninguno** con `Person` | texto de la sección `#nuestrosabogados` + `@graph` |
| El único `Person` es el autor del blog: nombre, Gravatar por defecto, sin `jobTitle` ni `sameAs` | `@graph` de un post |
| LinkedIn, Instagram y YouTube existen y **no** están declarados como `sameAs` | grep de enlaces externos + ausencia de `Organization` |

## Numeración

El correlativo se tomó del **historial de git**, no de la carpeta: en el working tree solo están
la 001 y la 002, pero `git log --all` muestra que 003 (dentimagen), 004 (corteszamora) y 005
(grupoaltum) ya se usaron. De ahí que esta sea la **006**. ⚠️ Esas tres carpetas no están en
`main`; conviene recuperarlas o dejar registrado dónde quedaron.
