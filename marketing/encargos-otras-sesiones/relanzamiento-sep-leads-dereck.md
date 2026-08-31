# Encargo → Dereck (buscar-leads): ampliar inmobiliarias y contadores a ~40 c/u

**De:** Marta (calendario) · 28-ago-2026 · **Para la campaña de relanzamiento de septiembre**
(calendario madre: `marketing/calendario-editorial.md`).

## Qué se pide

1. **Entrega inmediata — sáb 29-ago:** pasar el **dedup** a las dos muestras existentes
   (`ventas/contactos-google-maps-inmobiliarias.csv`, 10 filas · `ventas/contactos-google-maps-contadores.csv`,
   7 filas) y marcar el resultado, para que Emilia pueda armar el lote 1 con lo limpio.
2. **Entrega principal — mié 3-sep:** ampliar **inmobiliarias** y **contadores** a **~40 leads
   c/u** vía **Google Maps + curl** (tu receta validada del 26-ago: JS extrae nombre+dominio →
   curl a home y /contacto por email público + gancho técnico). Apollo está CANCELADO: no
   reactivar sin OK de Ramón.

## Reglas duras

- **Dedup obligatorio contra `ventas/enviados/REGISTRO-enviados.csv` (141 contactados) y contra
  `ventas/contactos-abogados-santiago.csv` (157) antes de entregar cualquier fila a Emilia.**
  Sin excepciones.
- Mismo formato de columnas de las muestras: `empresa,dominio,email,ciudad,rubro,hallazgo,estado`.
  El `hallazgo` es real y verificable (es el gancho de Emilia); si no hay hallazgo, la fila va
  igual pero marcada — Emilia puede correr el chequeo público sobre el dominio.
- Dental **NO** se re-prospecta.
- Tu fuente es semi-manual (necesita navegador): si Cloudflare anti-bot te frena, para y déjalo
  anotado para Ramón — no reintentes en loop.
- Salida en `ventas/contactos-google-maps-inmobiliarias.csv` y
  `ventas/contactos-google-maps-contadores.csv` (amplía los existentes, no crees archivos nuevos).

## Contexto de volumen (para que la lista alcance)

El canon de envíos de septiembre es 10/día · tope 50/semana · 3 toques máx., y la **semana del
15–21 sep está vetada** (cero lotes). Con ~80 leads limpios cubrimos los lotes de las semanas
1, 2 y de la reanudación (22-sep en adelante).

## A quién entregas

CSV limpio → **Emilia** (`relanzamiento-sep-outbound-emilia.md`). Anota en tu memoria
(`marketing/oficina/memoria/dereck-buscar-leads.md`) cuántos leads usables salieron por búsqueda.

**Estado:** 🟨 en curso · creado 28-ago-2026 por Marta
- ✅ **Entrega 1 (dedup) — HECHA 31-ago:** 17/17 filas limpias (10 inmobiliarias + 7 contadores), 0 colisiones con los 141 enviados ni los 157 abogados. Marcadas en `estado`. Listas para Emilia.
- ✅ **Entrega 2 (ampliar a ~40 c/u) — HECHA 31-ago** (adelantada). Inmobiliarias **10→38**, contadores **7→32** vía Google Maps + curl. Total **70 leads limpios y dedupeados**, listos para Emilia. Contadores quedó en 32 (meta 40): toppear ~8 más si Emilia los necesita para los lotes. Detalle en `marketing/oficina/memoria/dereck-buscar-leads.md`.
