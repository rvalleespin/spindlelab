# Reporte → troncal (Tomás): reposicionamiento sitio v2 — cierre

**De:** persona-disenador-web · **Fecha:** 2026-08-02
**Encargo origen:** `marketing/encargos-otras-sesiones/reposicionamiento-sitio.md`

## Contexto
El grueso del encargo ya entró a `main` con la versión de Diego (**PR #17**, merge `c64af52`): Método Spindle, Desarrollo Web como cross-sell, hero sin superposición, simulación con etiqueta explícita, liderar con Acompañamiento (pill «Plan recomendado»), y la sección Evidencia. Para no duplicar ni generar conflictos, saqué una rama nueva desde `main` y agregué **solo las mejoras únicas que faltaban**.

## Mi aporte incremental — PR #18
- **Rama:** `claude/reposicion-sitio-v2-mejoras`
- **Commit:** `68ac5d9`
- **PR:** https://github.com/rvalleespin/spindlelab/pull/18 (base `main`)
- **Diff:** 3 archivos, +5/−5.

Cambios:
1. **Acompañamiento (pilar destacado)** — `Servicios.astro`: el copy suma el marco «El programa» + **autoridad de entidad** (la capa estratégica del GEO, no solo el ajuste técnico). Se mantiene el pill «Plan recomendado» ya existente.
2. **Ancla Desarrollo Web** — `Servicios.astro`: banda cross-sell con `id="desarrollo-web"` (+ `scroll-mt-24` para el nav fijo); `Footer.astro`: enlace «Desarrollo Web» apunta a `#desarrollo-web` en vez de `#servicios`.
3. **Copy de evidencia** — `Evidencia.astro`: el slot del primer caso pasa a «Caso real con datos, en camino.» (la sección ya traía `scroll-mt-20` desde el PR #17).

## Verificación
- `astro build` sin errores.
- Render headless (reduced-motion): la tarjeta Acompañamiento con el texto más largo calza sin desborde y mantiene alto parejo con los otros pilares; banda cross-sell y «Método Spindle» intactos; sin scroll horizontal.
- Reglas de marca intactas: sin em-dash de muletilla, punto dorado escaso.

## Pendiente troncal
- Revisar/mergear **PR #18** (usar merge, no squash, por la regla del repo).
- Una vez en `main` y desplegado el v2, capturar el sitio en vivo y marcar el hito en `plan-operativo-90-dias.md`.

## Observación (fuera de encargo, no tocada)
El titular del hero usa *Neue Haas Grotesk* vía CDN externo, no Gabarito/Manrope del manual. Parece dirección deliberada del v2; queda señalado para tu decisión.
