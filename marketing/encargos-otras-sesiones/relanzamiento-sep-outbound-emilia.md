# Encargo → Emilia (agente-outbound): lote 1 de septiembre con el gancho del chequeo

**De:** Marta (calendario) · 28-ago-2026 · **Para la campaña de relanzamiento**
(calendario madre: `marketing/calendario-editorial.md`). Tu canon vigente está en tu memoria
(`marketing/oficina/memoria/emilia-outbound.md`) — este encargo no lo repite, lo aplica.

## Qué se pide

1. **Lote 1 — entrega dom 30-ago** (Ramón lo aprueba en el Pase 1+2, lun 31-ago; primer envío
   posible mar 1-sep): secuencia completa de emails fríos para los leads limpios que Dereck
   confirme el sáb 29 (muestras de inmobiliarias y contadores, post-dedup —
   `relanzamiento-sep-leads-dereck.md`).
2. **Lote 2 — entrega jue 3-sep** (Pase 3, vie 4-sep): con la ampliación de Dereck (~40+40).

## El gancho (canon 28-ago, ya en tu memoria)

- **El chequeo público, con corrida real por prospecto:**
  `GET https://spindlelab.cl/api/chequeo?dominio=X` → "Corrimos tu dominio por nuestro chequeo de
  visibilidad en IA: X/100; el detalle acá y puedes reproducirlo tú en spindlelab.cl/diagnostico".
  Cero fabricación: el número sale de la corrida, o no se usa.
- Si el CSV de Dereck trae `hallazgo` propio, ese hallazgo puede abrir y el chequeo cierra.
- **La oferta presenta el motor completo (regla de Ramón, 31-ago):** el gancho sigue siendo UN
  hallazgo real, pero el párrafo de oferta ya no puede quedarse en "SEO/IA". Plantilla canónica
  (2-3 líneas, adaptable): "En SpindleLab no trabajamos piezas sueltas: armamos el motor completo,
  tu sitio, tu SEO, tus redes y tu pauta funcionando juntos, con la visibilidad en Google y en la
  IA como eje. Los precios están publicados en el sitio." Mostrar solo lo de la IA deja la oferta
  débil.
- El gancho NO se diversifica (sigue siendo el hallazgo verificable); lo que se amplía es la
  oferta. Sigue vigente: NO abrir outbound frío CUYO GANCHO sea web/redes/paid en septiembre.
- CTA: mini-diagnóstico gratis en **24h**.
- **Guarda las corridas** (dominio, fecha, puntaje) en el lote: son insumo del post personal del
  mié 9-sep (Renata+Cata) y del Research de octubre.

## Límites duros del mes

- Canon: **máx 3 toques · 10/día · tope 50/semana**. 2ª ola catch-all (abogados) solo en lotes
  de 10-15/semana midiendo rebote; **si el rebote supera 5%, se corta**.
- **Semana del 15–21 sep (Fiestas Patrias): CERO lotes, cero envíos.** Planifica los toques 2-3
  para que ninguno caiga ahí.
- Antes de escribir a cualquiera: buscar su dominio en Gmail (el estado real vive ahí).
- **TÚ NUNCA ENVÍAS.** Preparas, trackeas y dejas el lote listo para el pase de Ramón.
- Nada sale sin pase de Ramón (tandas: lun 31-ago y vie 4-sep).

## A quién entregas

Lotes en `marketing/outbound/` (tu convención `semana-*/lote-*`). Si un prospecto responde →
Raquel (CRM); si pide diagnóstico → Valen. Registro de enviados: lo mantienes contra
`ventas/enviados/REGISTRO-enviados.csv` tras cada envío aprobado.

**Estado:** ⬜ pendiente · creado 28-ago-2026 por Marta — **ERES LA ÚNICA ENTREGA QUE FALTA para
el Pase de Ramón** (todo lo demás de la campaña está listo y mergeado).

## Insumos nuevos (31-ago, sesión coordinadora) — te ahorran la mitad del trabajo

1. **Los 70 leads limpios de Dereck YA ESTÁN en `main`**: `ventas/contactos-google-maps-inmobiliarias.csv`
   (38) y `ventas/contactos-google-maps-contadores.csv` (32), todos con hallazgo verificado y marca
   de dedup del 31-ago. No re-chequees dedup.
2. **Las corridas del chequeo YA ESTÁN HECHAS para los 70** (misma fecha):
   `marketing/metricas/corridas-chequeo-2026-08-31.md` trae el puntaje por dominio; los `.jsonl`
   de esa carpeta traen el detalle de los 21 chequeos por sitio. Úsalas para el gancho
   ("corrimos tu dominio por nuestro chequeo público: X/100…") sin re-correr la API. Si un lote
   sale más de ~10 días después de la corrida, re-corre solo esos dominios.
3. **Caveat**: si el gancho cita un chequeo de ACCESO (robots/bots de IA) y el sitio está tras
   Cloudflare, confírmalo contra el robots.txt directo antes de escribirlo (regla de Valen).
4. El bug de destinatario del Copiloto (28-ago) quedó parchado el 31-ago y los 3 follow-ups
   afectados ya salieron a sus destinatarios reales. El REGISTRO está al día.
