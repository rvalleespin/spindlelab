# Reporte pre-lanzamiento → troncal: revisar antes de apuntar spindlelab.cl al v2

**De:** persona-disenador-web · **Fecha:** 2026-08-02
**Contexto:** el reposicionamiento (PR #17 + PR #18) ya está mergeado y **desplegado en `spindlelab-v2.pages.dev`** (URL de prueba). Falta la decisión de apuntar el dominio real `spindlelab.cl` al v2. Antes de eso, revisión en vivo.

---

## 🚨 Bloqueante #1 — Se perdería TODO el sitio actual (blog + servicios)

El v2 es un sitio de **una sola página** (solo la home). El sitio que hoy vive en `spindlelab.cl` es el **anterior, multi-página**, con contenido real indexado:

| Hoy en `spindlelab.cl` (verificado en vivo) | En el v2 (`pages.dev`) |
|---|---|
| `/blog/` → «El Taller: SEO técnico y visibilidad en IA» | Sirve la **home** (no existe) |
| `/servicios/auditoria-seo-tecnica/` → página propia | Sirve la **home** (no existe) |
| `/servicios/visibilidad-en-ia/` y demás | Sirven la **home** |
| **sitemap.xml: 14 URLs** | **sitemap.xml: 1 URL** (solo la home) |

Además, el v2 **responde 200 a cualquier ruta inexistente** (probado con `/pagina-inexistente-xyz` → 200 con la home). No hay 404 real.

**Qué significa si apuntamos el dominio hoy:** las 14 URLs ya indexadas por Google (blog + 4 páginas de servicio + otras) dejarían de existir y servirían la home con `<title>` y canonical de la home = **soft-404 masivo**. Para una empresa cuyo negocio ES el SEO y la visibilidad en IA, esto es doblemente grave: se pierde ranking/indexación **y** se borra el blog, que es justo el motor de contenido AEO/GEO que nos hace citables.

**Hay que resolver esto ANTES de subir.** Tres caminos (decisión de Ramón + troncal):
1. **Migrar** blog + páginas de servicio al v2 (Astro) antes del go-live. *(Lo correcto; es trabajo de esta sesión, estimable.)*
2. **Redirects 301** de las URLs viejas a las secciones nuevas equivalentes. *(Mitiga la pérdida de ranking, pero igual se pierde el contenido del blog y su valor AEO.)*
3. **Postergar** el cambio de dominio y dejar el v2 solo en la URL de prueba hasta migrar. *(Sin riesgo, pero el público sigue viendo el sitio viejo.)*

> Recomendación: **camino 1** (o 1+2). No apuntar el dominio hasta tener el blog y los servicios en el v2. El resto del sitio v2 está listo; esto es lo único que falta.

---

## ✅ Lo que SÍ está en orden (verificado en el v2 en vivo)

**Contenido / reposicionamiento**
- «Método Spindle» en toda la página (0 rastros de «Señal»).
- 3 pilares liderados por Acompañamiento (pill «Plan recomendado» + copy de autoridad de entidad).
- Desarrollo Web como cross-sell fuera de los pilares, con ancla `#desarrollo-web` (enlace del footer apunta ahí).
- Sección Evidencia con protocolo de medición + slot «Caso real con datos, en camino».
- Simulación ChatGPT con etiqueta explícita («Ejemplo simulado») y pie que aclara que no es real.

**Técnico / SEO (de la home)**
- `<title>`, meta description, canonical (→ `https://spindlelab.cl/`), Open Graph (title + image) y JSON-LD: todos presentes, 1 de cada.
- `robots.txt` OK: permite todo + bots de IA explícitos (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended…). Coherente con la marca.
- GA4 (`G-J40VW9E0TW`) y Meta Pixel (`2885353628478565`) presentes y disparando.
- Recursos cargan 200: video del hero, `Gabarito.woff2`, favicon.
- Responsive sin scroll horizontal (medido); build de Astro sin errores.

---

## ⚠️ Otros puntos menores a revisar antes o justo al subir

1. **404 real:** configurar que las rutas inexistentes den 404, no 200 con la home.
2. **Sitemap:** al subir, el sitemap pasaría de 14 a 1 URL; debe reflejar las páginas que finalmente existan (home + lo que se migre).
3. **Analítica en la URL de prueba:** GA4 y el Pixel ya están corriendo en `pages.dev`, así que hay datos de preview mezclándose con los reales. Menor, pero conviene saberlo (o filtrar el hostname de prueba en GA).
4. **Cloudflare:** confirmar que el proyecto de Pages que sirve `spindlelab.cl` quede apuntado al build de `main` (Astro), y no quede un tercer estado conviviendo (hoy `spindlelab.cl` = sitio viejo, `-v2.pages.dev` = v2).
5. **Observación de marca (fuera de encargo):** el titular del hero usa *Neue Haas Grotesk* vía CDN externo, no Gabarito/Manrope del manual. Parece deliberado; queda a decisión del troncal.

---

## Resumen para decidir
El v2 en sí está bien y listo para ser la nueva cara del sitio. **El único bloqueante real para apuntar el dominio es la migración/redirección del blog y las páginas de servicio** (14 URLs). Definido eso, el go-live es seguro.
