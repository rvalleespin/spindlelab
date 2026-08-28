# Memoria — Dereck (buscar-leads)

**Rol:** Prospección B2B (Google Maps + curl; Apollo cancelado) → CSV de contactos por frente.
**Carpeta de trabajo:** `marketing/listas/frente-*.md`, `ventas/contactos-*.csv`
**Skill:** .claude/skills/buscar-leads/SKILL.md

## Estado actual
- 2026-07-23 — Frentes definidos: A (wealth/asesoras), B (dental/estética, 35
  clínicas verificadas), C (salud visual/óptica, experimental). Lote 1 de A:
  Addwise, Noosa, Paragon, MFO S.A., Vicapital, Grey Capital, Lakpa, Abaqus.

## Estado 28-ago-2026 (relanzamiento del motor)
- **Apollo CANCELADO** (26-ago, decisión de Ramón). Las 3 búsquedas guardadas quedaron inaccesibles. El pozo de abogados (4.522) ya rindió su extracción (157).
- Fuente vigente: **Google Maps + directorios + curl** — receta validada el 26-ago (~6-10 leads/búsqueda comuna×rubro, buzones reales, sirve regiones). Semi-manual: necesita navegador.
- **Regla dura: dedup contra `ventas/enviados/REGISTRO-enviados.csv` (141 contactados) antes de entregar cualquier CSV a Emilia.** También contra `ventas/contactos-abogados-santiago.csv` (157).
- Encargo de septiembre: ampliar **inmobiliarias** y **contadores** a ~40 c/u vía GMaps (hay 10+7 de muestra en `ventas/contactos-google-maps-*.csv`). Dental NO se re-prospecta.

## Aprendido a pulso (gotchas)
- **Cuenta Apollo correcta = `manuvalleespin@gmail.com`** (Plan Básico,
  ~2.500 créditos/mes). La cuenta `hola@spindlelab.cl` es Gratis y NO sirve.
  Verificar el workspace activo en el menú de avatar antes de prospectar.
- Revelar email/móvil cuesta **1 crédito**. Tanda de 300 empresas ≈ 40-110 revelaciones.
- **Modo B (descubrimiento):** filtrar solo por keyword trae 55-65% de basura
  (proveedores, isapres, labs, veterinarias). Combo ganador: industria
  "Medical Practice" (elimina proveedores) + 1-2 keywords suaves del vertical.
- Cobertura de email real en clínicas: solo **~35-45%** de decisores tienen email.
- Cloudflare anti-bot es recurrente: parar y pedir a Ramón que lo resuelva, no
  reintentar en loop.

## Cuentas / referencias
- Apollo: `manuvalleespin@gmail.com` (Básico). Detalle en memoria `reference_apollo_account`.

## Pendientes que dejé
- [ ] — (pendiente: al correr, anotar créditos gastados y frente trabajado)

## A quién le entrego
- El CSV pasa a **Emilia** (agente-outbound) para armar la secuencia.
