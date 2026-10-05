# Lote Frente B — 25 jul 2026

**Nada se envió.** Todo queda en `Redactado` / `Listo` para la pasada de edición de Ramón.

> **Tanda 2 regenerada el 25 jul a las 20:48**, a pedido de Ramón. Los 9 borradores se
> reescribieron de cero (no se reciclaron): se re-verificó cada sitio con `curl` el mismo día y
> todos los hallazgos se confirmaron sin cambios, incluidos los dos que estaban marcados como
> volátiles (Bollëk sigue suspendido, NúcleoSalud sigue devolviendo 403). La segunda pasada
> incorporó una señal nueva —presencia de sitemap y conteo de etiquetas OG— y sacó el em-dash de
> todos los cuerpos de correo, que ahora solo aparece en la firma.
> Los borradores de la primera versión están respaldados fuera del repo, en el scratchpad de la
> sesión, por si se quiere comparar.

## Qué hay acá

| Archivo | Qué es |
|---|---|
| `secuencia.md` | La plantilla de los 3 toques (día 0/3/7). **Los follow-ups no existían en ningún lado** — Frente B tenía solo Email 1. |
| `envios.csv` | Tracker de los 41 contactos reales, con estado, tanda y notas. |
| `borradores/` | 9 borradores nuevos de Email 1 personalizados (Tanda 2) + 1 ficha de "no enviar". |

**No reemplaza a `../lote-1-frente-b.md`.** Ese sigue siendo la fuente de los 7 borradores de
Tanda 1 y del historial del lote. Este directorio lo complementa.

## Estado de los 41 contactos

| Estado | N° | Qué significa |
|---|---|---|
| `Listo` | 7 | Tanda 1, redactada el 23 jul. Espera confirmación de envío de Ramón. |
| `Redactado` | 9 | Tanda 2, redactada hoy con hallazgo verificado. **A revisar.** |
| `No enviar` | 1 | Dentistas por Chile: no hay defecto real que señalar. Ver su ficha. |
| `No enviar (1ª ola)` | 8 | Dominios catch-all. Solo tras tandas 1-3, monitoreando rebotes. |
| `Pendiente` | 16 | Falta verificar el sitio antes de escribir. |

## Los dos hallazgos que piden decisión hoy

**1. Bollëk Dental Studio está caído.** `bollek.cl` devuelve «Account Suspended» del hosting.
El borrador está escrito como aviso, no como venta: mandarle un pitch de SEO a alguien con el
sitio suspendido quema el contacto. Confirmar que sigue caído el día del envío.

**2. Dentistas por Chile no tiene ningún problema que señalar.** Es el único del lote con schema
`MedicalClinic`, `FAQPage`, y un `robots.txt` que **permite explícitamente** a GPTBot, ClaudeBot y
PerplexityBot. Ya hicieron lo que le vamos a proponer al resto. Por regla del proceso no se le
inventa un defecto: queda fuera de la secuencia. Sirve mejor como caso de referencia del mercado
chileno.

## Verificación de los hallazgos

Todos los de Tanda 2 se verificaron el 25 jul con `curl` sobre el sitio real: título, meta
description, canónica, tipos de JSON-LD, H1, código HTTP y `robots.txt`. Ninguno es genérico ni
inferido. Dos borradores llevan una nota de "revisar antes de enviar" porque su hallazgo puede
cambiar solo (Bollëk caído, NúcleoSalud 403).

## Inconsistencia heredada, sin resolver

`lote-1-frente-b.md` se contradice consigo mismo: su tabla marca a Pedro Rodríguez (Secretos SPA)
y Pilar Estay (Estetika Médica) como **tanda 2**, pero su prosa define tanda 2 como los contactos
9-18 y tanda 3 como 19-34. Los dejé en `Pendiente` sin borrador. Decidir a qué tanda pertenecen.

## Siguiente paso

1. Ramón revisa y edita los 9 borradores de Tanda 2.
2. Envía manualmente desde `hola@spindlelab.cl` (Gmail web), por tandas, y marca `Enviado` con
   fecha en `envios.csv`.
3. Si alguien responde → **Raquel** (`agente-crm`), fila nueva en `ventas/pipeline.md`, etapa
   "Contactado". Si pide el diagnóstico → **Valen** (`mini-diagnostico`), 48h.
