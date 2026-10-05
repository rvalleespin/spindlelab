# Auditoría SEO/AEO del sitio + encargo → Diego (web)

**De:** Simón (agente-seo-aeo) · **Fecha:** 2026-08-22 · **Cliente:** SpindleLab (la casa)
**Método:** auditoría técnica + AEO/GEO sobre `spindlelab-astro/` y el sitio en vivo, 6 dimensiones. **Simón define el qué/porqué; Diego ejecuta en el código.** Ramón aprueba antes de publicar.

## Veredicto: aún NO ejemplar, pero cerca
Base técnica **sólida y varias cosas ejemplares** (no tocar): `robots.txt` habilita todos los bots de IA y declara el sitemap; canonical impecable y auto-referencial en las 17 páginas; un solo H1 por página; **FAQPage visible y honesta** en 7 internas + 4 posts (formato citable, sin sobre-promesa); **cero prueba social fabricada** (coherente con YMYL/E-E-A-T); los barridos recientes (`(Google y Meta)→(Google)`, `Workflow→proceso`) aterrizaron sin restos.

**Pero** justo la capa que SpindleLab monetiza —el **grafo de entidad legible por máquinas (para IA)**— es donde están los huecos más visibles, y eso contradice el pitch. Un auditor técnico (el perfil del prospecto) lo detecta rápido. Ninguno es de diseño ni caro; casi todo se cierra en una pasada.

> **Nota de reconciliación:** el ítem "quitar 'hábiles' de /contacto/" salió en la auditoría pero **ya está arreglado en `main`** (commit `48a5ebf`). No re-hacer.

---

## PRIORIDAD ALTA — la capa de entidad/IA (lo que vendes)
Todos verificados contra el código actual.

1. **[alta/bajo · Diego] Definir el nodo `#org` en cada página de `public/`.** Hoy **0 páginas** de `public/` definen `Organization/ProfessionalService`, pero **12 páginas que venden** (6 fichas + 5 posts + contacto) referencian `{@id:#org}` como `provider`/`publisher`/`about`. Los parsers resuelven `@id` **solo dentro del `@graph` de la misma página** → el emisor llega sin `name`, `logo`, `areaServed` ni E-E-A-T. *Fix:* incluir el nodo `#org` (versión mínima idéntica a la de `Layout.astro`) dentro del `@graph` de cada estática. Un solo snippet fuente, repetido.

2. **[alta/bajo · Diego] Unificar la entidad-autor `#autor-ramon`.** Mismo `@id` con datos distintos: "Ramón Vallejos / Consultor de SEO técnico y visibilidad en IA (AEO/GEO)" en `/nosotros/` vs "Ramón / SEO técnico y GEO" en los 5 posts; y `que-es-un-mini-diagnostico-seo` lo referencia **sin incluir el nodo Person**. *Fix:* un solo `name` ("Ramón Vallejos") y un solo `jobTitle` en TODAS las páginas; agregar el Person faltante; añadir `image` (la foto ya existe) y `founder` Person→`#org`.

3. **[alta/bajo · Diego] `og:url` y `og:description` dinámicos en `Layout.astro`.** Confirmado en vivo: `/nosotros/` publica `og:url=https://spindlelab.cl/` (≠ su canonical) y la `og:description` del home. Es un defecto de plantilla que escala a cada página Astro futura. *Fix:* `og:url` = el `canonical` ya calculado; `og:description` = la prop `description` (la del home solo como fallback).

4. **[alta/bajo · Diego] Cero `sameAs`.** Es la señal #1 de desambiguación de entidad para AEO/GEO: cómo una IA confirma que "SpindleLab" es una organización real y gana confianza para **nombrarla**. Un dominio nuevo sin corroboración externa es el caso que un LLM no cita. Además, una consultora que vende gestión de redes **sin un solo enlace social** es incoherente. *Fix:* `sameAs` en `#org` y Person con LinkedIn (empresa) + Instagram `@spindle.lab`, y esos enlaces **visibles en el footer**. → **necesita URLs de Ramón** (ver decisiones).

5. **[alta/bajo · Diego] Enlaces de sección del Nav/Footer anclados a raíz.** `NAV_LINKS` (consts) y la columna "Sitio" del Footer usan anclas de misma-página (`#servicios`…). En `/nosotros/` resuelven a `/nosotros/#servicios` → **5 de 6 ítems del header y 3 de 4 del footer no llevan a nada** y no reparten link-equity. *Fix:* pasar a `/#servicios`, `/#metodo`, `/#nosotros`, `/#evidencia`, `/#contacto` (igual que las estáticas). Siguen haciendo smooth-scroll en el home.

6. **[alta/bajo · Diego] `/nosotros/` huérfana.** Falta en el `sitemap.xml` (16 URLs) y ningún enlace fuerte entra (el rótulo "Nosotros" del nav/footer apunta a la **sección** `#nosotros` del home). Y ahí vive el schema **Person + AboutPage**, tu prueba de autoría. *Fix:* (a) sumarla al sitemap; (b) darle ≥1 enlace interno durable. → **depende de la decisión de arquitectura "Nosotros"** (ver decisiones).

7. **[alta/bajo · Diego + Renata] Home citable.** El home es la **primera URL que fetchea una IA** y hoy es la más débil: solo `ProfessionalService`+`WebSite`, **sin FAQPage** (cada subpágina sí la tiene), y el H1 es un eslogan, no una definición extraíble. *Fix:* (1) bloque FAQ corto de nivel-marca ("¿Qué es SpindleLab?", "¿AEO/GEO vs SEO?", "¿Cómo miden si la IA te recomienda?", "¿Atienden fuera de Chile?") visible + FAQPage; (2) una frase-definición sobria cerca del H1 (entidad + categoría + especialidad + geo). Renata redacta, Diego implementa.

---

## PRIORIDAD MEDIA — cabos sueltos de la reestructura
8. **[media/bajo · Diego] `makesOffer` del home** lista 4 de 6 servicios (faltan Paid Media (Google) y Redes) y usa `@ids` inventados. *Fix:* los 6 con nombres canónicos y el `@id` de cada `itemOffered` = el `@id` real de su ficha (`/servicios/<slug>/#service`).
9. **[media/bajo · Diego] Formulario de contacto:** el `<select>` tiene 4 de 6 servicios. Un lead de campaña de Paid o Redes no puede indicar su interés. *Fix:* sumar "Gestión de Redes Sociales" y "Paid Media (Google)" con el nombre canónico.
10. **[media/bajo · Renata→Diego] JSON-LD FAQ de `/servicios/paid-media/` (línea 67)** todavía dice "¿Google, Meta o ambos?" con Meta como parte del servicio — contradice Paid = solo Google (el resto de la ficha ya lo refleja). Se me pasó el **espejo en el schema** al reescribir la FAQ visible. *Fix:* reescribir esa Q&A del schema para Google puro y derivar Meta a Redes.
11. **[media/bajo · Diego] Jerarquía de headings en `/servicios/`:** los títulos de sección ("01 · El filo", "02 · El resto") son H3, al mismo nivel que las tarjetas → estructura aplanada (WCAG 1.3.1). *Fix:* promover esos a H2, tarjetas a H3; ajustar el selector CSS para no cambiar el tamaño visual.
12. **[media/medio · Diego] Article sin `image`** en los 5 posts (propiedad recomendada por Google). → **decisión de Ramón:** imagen destacada por post o una de marca por defecto.

---

## PRIORIDAD BAJA — pulido de consistencia
13. **[Diego]** meta description de `/servicios/visibilidad-en-ia/` abre con "Optimización AEO/GEO" (nombre viejo); title/og/H1 ya usan el canónico. → liderar con "Visibilidad en IA (AEO/GEO)".
14. **[Diego]** `lastmod` del sitemap obsoletos (varias páginas editadas siguen en 2026-07-09) → poner fechas reales.
15. **[Diego]** falta `twitter:card` en las 15 estáticas (las 2 Astro ya lo tienen; `og:image` existe en todas).
16. **[Renata]** 5 `<title>` >60 chars (se corta keyword+geo); separador mixto (contacto y desarrollo-web aún con em-dash). 2 meta descriptions >160.
17. **[Renata]** H1 de `/metodo/` es solo eslogan, sin keyword temático → cargar "método"/"auditoría SEO".
18. **[Diego]** breadcrumb de visibilidad usa "Visibilidad en IA" sin "(AEO/GEO)" (único servicio inconsistente).
19. **[Diego]** `/blog/` y `/metodo/` solo llevan BreadcrumbList suelto → sumar `Blog`/`CollectionPage` con ItemList de posts, y `WebPage` en método.
20. **[Diego]** la plantilla "Research" comentada en `/blog/` tiene un `href` a `slug-del-post` (404 latente si se descomenta sin editar).

---

## Decisiones que necesita Ramón (Diego no puede cerrar sin esto)
- **Arquitectura "Nosotros":** ¿el rótulo global "Nosotros" (nav+footer+31 enlaces) repunta a la **página `/nosotros/`**, o coexisten sección `#nosotros` (home) + página, enlazando la página desde el footer? (afecta #6 del plan alto).
- **`sameAs` / perfiles públicos:** confirmar las URLs canónicas de LinkedIn (empresa) e Instagram `@spindle.lab` para fijarlas en schema + footer.
- **Fuente única del sitemap** (con Tomás): migrar las 15 estáticas a rutas Astro + `@astrojs/sitemap` (durable, autogenera con lastmod real) vs. mantener el XML manual con un gate de publicación. *Ojo:* instalar `@astrojs/sitemap` sin migrar **borraría** las 15 estáticas del índice.
- **Imágenes de Article:** producir destacada por post o fijar una de marca por defecto.

## Handoff paralelo
- **Gonzalo (Ads):** además del plazo 24h (encargo aparte, ya en curso), revisar en la cuenta `597-527-6690` que los **textos de sitelinks/callouts** coincidan con los rótulos nuevos del H1/title (Paid Media (Google), Gestión de Redes Sociales, Visibilidad en IA (AEO/GEO)). Las URLs no cambian. No verificable desde el repo.
- **Nora (analítica):** al cerrar los fixes, definir cómo se medirá la mejora de visibilidad en IA (protocolo de consultas repetible) para probar que rindió.

## Cierre
Los ítems de PRIORIDAD ALTA que no dependen de decisión de Ramón (1, 2, 3, 5 al menos, y 8-11) son de **bajo esfuerzo** y cierran la contradicción central. Diego los ejecuta, verifica el render + valida el JSON-LD, y reporta con el sitio en vivo antes de dar por hecho. No editar `plan-operativo-90-dias.md`.
