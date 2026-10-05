# Entrega — Reestructura de servicios al "motor de adquisición" (Diego → Troncal)

**Fecha:** 2026-08-20 · **Rama:** `claude/servicios-motor-adquisicion` (basada en `main`) · **Estado:** listo en preview, **sin mergear** (espera aprobación de Ramón).

Ejecuté el encargo del troncal: reposicionar los servicios del sitio v2 (`spindlelab-astro/`) de "especialista SEO" a **motor de adquisición digital de punta a punta, orquestado por un especialista con agentes de IA**, liderado por el filo (SEO + visibilidad en IA), sin diluir.

## Qué se hizo
- **Home `#servicios`** (`src/components/Servicios.astro`): de "Cuatro formas de trabajar tu visibilidad" a **"Cuatro piezas conectadas. Un solo motor."** Pieza filo destacada (Visibilidad SEO+IA, con sus 3 sub-servicios enlazados) + 3 piezas (Redes, Paid, Desarrollo) + bloque "el contenido creativo va por separado, con partners".
- **`/servicios/`** reestructurado al motor: **01 · El filo** (Auditoría, Visibilidad IA, Acompañamiento) + **02 · El resto del motor** (Redes, Paid, Desarrollo) + bloque **"Dentro / Fuera de la cartera"** (dentro = las 4 piezas; fuera = creación de contenido, diseño gráfico, video → con partners) + compare de 4 piezas + FAQ actualizada (incluye "¿crean el contenido?" → no, con partners).
- **2 fichas nuevas** con la plantilla exacta (head/nav/footer/scripts idénticos, JSON-LD `Service`+`BreadcrumbList`+`FAQPage`, canonical, OG `?v=3`):
  - `/servicios/redes-sociales/` — Gestión de Redes Sociales (estrategia, pauta, comunidad, reportes; contenido con partners).
  - `/servicios/paid-media/` — Paid Media (Google y Meta), optimizado con IA, presupuesto controlado.
- **`sitemap.xml`**: 14 → **16 URLs**.
- **Footer** (las 16 páginas + `Footer.astro` del home): columna Servicios ahora con las 6 fichas (URLs reales).
- **Menú:** evaluado. Recomendación: **mantener "Servicios"** como único ítem del nav (el motor vive en la página; sumar 4 ítems recargaría la píldora y rompería la coherencia con el home). No se tocó el menú.
- Assets: 2 iconos nuevos (`users`, `target`) en `Icon.astro`; CSS del bloque cartera + fila de 3 (`.excl-list`, `.cards.three`, `.group-label`, `.cartera`); **bump `?v=22 → ?v=23`** en las 16 páginas.

## No se rompió
Las 14 URLs actuales se preservan (solo se suman 2). Sistema oscuro editorial intacto; dorado escaso (solo el punto del wordmark); **sin em-dash de muletilla** (verificado: 0 en fichas e índice); "Método Spindle" sin tocar. Cero prueba social inventada.

## Verificación (preview, `localhost`)
- Render desktop 1440 (headless): `/servicios/`, `/servicios/redes-sociales/`, `/servicios/paid-media/` → layout correcto, coherente con el resto.
- Render móvil 390 (navegador real): home `#servicios` y `/servicios/` (incl. bloque cartera) → sin scroll horizontal (`docW=390`).
- Build Astro limpio. JSON-LD, canonical, OG, meta presentes en las 2 fichas (FAQ visible = FAQPage).

## Pendiente antes de publicar
1. **Aprobación de Ramón** (copy de venta) → luego merge a `main` (Cloudflare reconstruye). Sugerencia: pase de Renata/Cata al copy de las 2 fichas nuevas y del índice antes de publicar.
2. Al mergear, el `?v=3` de la OG ya está; no requiere re-scrapeo adicional por esto.

No edité `plan-operativo-90-dias.md` (lo actualiza el troncal).
