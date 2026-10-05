# Encargo → persona-disenador-web: migrar blog + servicios al v2 (gate de go-live)

**De:** Tomás (troncal) · **Fecha:** 2026-08-02
**Autoriza:** Ramón — "luz verde al camino 1"
**Contexto:** el v2 (Astro) es hoy una sola página. El sitio en vivo `spindlelab.cl` tiene 14 URLs indexadas (blog + servicios). Apuntar el dominio al v2 sin migrar = soft-404 masivo y se borra el blog (motor AEO). **Este encargo es el bloqueante que destraba el go-live.**

## Regla de oro
**Preservar las 14 URLs exactas** (mismos paths, misma barra final). Ninguna puede terminar sirviendo la home ni dando 404.

## Las 14 URLs a preservar (verificado en el sitemap en vivo)
```
/                                         (home — ya está en v2, no tocar salvo coherencia)
/blog/                                    (índice "El Taller")
/blog/como-aparecer-en-chatgpt/
/blog/cuanto-cuesta-seo-tecnico-chile/
/blog/que-es-aeo-geo/
/blog/que-es-un-mini-diagnostico-seo/
/blog/seo-tecnico-fintechs-chile/
/contacto/
/metodo/
/servicios/
/servicios/acompanamiento-mensual/
/servicios/auditoria-seo-tecnica/
/servicios/desarrollo-web/                (sigue existiendo como URL aunque sea cross-sell en la home)
/servicios/visibilidad-en-ia/
```

## Fuente de contenido
El contenido real ya existe en el repo: **`spindlelab-site/`** (el sitio estático anterior — `spindlelab-site/blog/`, `spindlelab-site/servicios/`, `spindlelab-site/metodo/`, `spindlelab-site/contacto/`). Portar desde ahí, no reescribir desde cero. Cotejar contra el vivo `spindlelab.cl` si hay dudas.

## Qué hacer
1. **Blog** (prioridad — es el motor AEO/GEO): portar el índice "El Taller" + los 5 posts a Astro, preservando path y contenido. Cada post conserva su **`@graph` JSON-LD (Article + BreadcrumbList + FAQPage, autor fijo `#autor-ramon`)** y sus meta-tags, igual que en el original.
2. **Servicios**: portar `/servicios/` + las 4 páginas de detalle. Alinear al reposicionamiento: nombre **"Método Spindle"**, y coherencia con 3 pilares + Desarrollo Web como cross-sell (la página `/servicios/desarrollo-web/` se mantiene, solo cambia su prominencia en la home).
3. **`/metodo/`**: portar como **"Método Spindle"** (no "Señal").
4. **`/contacto/`**: portar como ruta real.
5. **404 real**: crear `404.astro` para que las rutas inexistentes dejen de devolver 200.
6. **Sitemap**: regenerar para que liste las 14+ URLs (no 1). 
7. **Canonicals**: cada página con canonical a `https://spindlelab.cl/<ruta>`.
8. No romper lo ya hecho del reposicionamiento en la home.

## Guardas
- Reglas de marca intactas (Tinta editorial, Gabarito, dorado escaso, sin em-dash muletilla).
- Trap de caché: `?v=N` en assets sobrescritos.
- Se puede hacer incremental (blog primero, luego servicios), pero **las 14 URLs deben resolver a su contenido real antes del go-live**.

## Verificación antes de reportar (con evidencia, no de oído)
- Las 14 URLs resuelven a su contenido real en el preview del v2 (no la home).
- `sitemap.xml` del v2 lista 14+ URLs.
- Una ruta inventada devuelve **404** (ya no 200).
- Reportar al troncal con: conteo del sitemap + status/título de una muestra de URLs (ej. `/blog/que-es-aeo-geo/` y `/servicios/auditoria-seo-tecnica/`).

## Importante
- **NO apuntar el dominio.** El cambio de `spindlelab.cl` → build del v2 es un paso de go-live aparte, que se hace **después** de que el troncal verifique que las 14 URLs resuelven. Confirmar en Cloudflare de qué rama construye el preview.
- No editar `plan-operativo-90-dias.md` ni seguimiento compartido — eso es del troncal.
