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

## Estado 31-ago-2026 — Entrega 1 del encargo HECHA
- **Dedup de las 2 muestras** (`ventas/contactos-google-maps-inmobiliarias.csv` 10 + `contadores.csv` 7) contra 141 enviados + 157 abogados (230 emails/dominios de referencia): **17/17 limpias, 0 colisiones** (verticales nuevos, sin solape). Cada fila marcada en `estado` con "dedup 31-ago OK". **Listas para Emilia (lote 1).**
- **Entrega 2 HECHA 31-ago (adelantada):** ampliadas por Google Maps + curl. **Inmobiliarias: 10 → 38. Contadores: 7 → 32. Total 70 limpios (+53 net-new).**
  - Búsquedas por rubro×comuna (usables/candidatos): CONTADORES — Las Condes 5, Ñuñoa 6, Sto Centro 6, Vitacura 7 → curl 24 → 20 usables; Maipú 3; La Florida 2. INMOBILIARIAS — Ñuñoa 6, Providencia 6, Las Condes-corredoras 7, Vitacura 9.
  - Ratio usable ~55-70% (attrition: sitios que bloquean curl 403/Cloudflare, formulario sin email, dominios parkeados "en venta", 500/caídos). Los grandes (SOCOVESA, Big-4, Remax/Coldwell franquicia, Auxadi) descartados por off-ICP.
  - Gancho hallado: la mayoría "sitio en orden → ángulo IA" o "sin datos estructurados / sin meta / portada sin título". Marcas de dominio en `estado` = dedup 31-ago OK.
  - **Bonus:** `gpremium.cl` expone `comunicaciones@` (contacto de marketing directo, como pidió Ramón).
  - Pendiente menor: contadores quedó en 32 (meta ~40); toppear ~8 más antes de lotes si Emilia los necesita. Todo dedupeado, listo para Emilia.

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
