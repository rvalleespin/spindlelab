# Métricas de conversión — ventas

> Complementa el panel semanal de `marketing/estrategia-marketing-spindlelab.md` §8, que mide la primera mitad del funnel (emails, respuestas, diagnósticos). Este documento mide la segunda mitad — desde que hay una llamada agendada hasta el cierre — que es la parte 100 % humana del proceso (§6.5: "Llamadas, propuestas, negociación — 100 % tuyo").

## Tasas de referencia (del dimensionamiento original, `estrategia-marketing-spindlelab.md` §5)

Proyección para 8 semanas, tasas conservadoras de cold email B2B nicho — sirve de vara de medir, no de meta rígida:

| Etapa | Tasa proyectada | Volumen proyectado (8 semanas) |
|---|---|---|
| Llamadas de 20 min | ~60 % de diagnósticos entregados | ~8 |
| Propuestas enviadas | ~65 % de llamadas | ~5 |
| Clientes cerrados | ~40 % de propuestas | 1–2 |

Umbral de alarma (`estrategia-marketing-spindlelab.md` §8): si hay llamadas pero no cierres, el problema es de propuesta o precio — revisar en la llamada antes que en la oferta.

## Registro real (acumulado)

Actualizar cada vez que una fila del `pipeline.md` cambia de etapa 3 en adelante. Los números deben poder reconstruirse leyendo `pipeline.md` + `objeciones-y-perdidas.md` — esta tabla es el resumen, no la fuente.

| Corte | Llamadas realizadas | Propuestas enviadas | Cerrados ✅ | Perdidos ✗ | Tasa llamada→propuesta | Tasa propuesta→cierre |
|---|---|---|---|---|---|---|
| 10 jul 2026 | 0 (Bernardo cerró por contacto directo, sin pasar por llamada de diagnóstico) | 1 (SPL-COT-2026-014) | 1 (Bernardo) | 0 | — | 100 % (n=1, muestra insuficiente) |
| **27 sep 2026** | **2** — Chef & Hotel (14-ago, evidencia Gmail) y Módulo 369 (26-sep, confirmada por Ramón). *No cuenta la de Legal Prisma: el prospecto la canceló el 11-sep antes de realizarse* | **3** — SPL-COT-2026-014, SPL-COT-2026-015 y la propuesta a Chef & Hotel del 15-ago | **2** (Bernardo Combeau $512.000 real con ampliación · Módulo 369 $1.190.000 + IVA) | **0 formalmente** ⚠️ Chef & Hotel lleva 42 días en silencio y no está cerrado como perdido | n/a — ver nota | **67 %** (2 de 3, n=3) |

> **Por qué la tasa llamada→propuesta no se calcula (27-sep):** de los dos cierres, **uno no pasó
> por llamada de diagnóstico** (contacto directo) y el otro llegó por referido, no por el embudo.
> Dividir 3 propuestas entre 2 llamadas daría 150 %, un número sin significado. **La lectura real
> es la contraria y es la que importa: de los 142 correos fríos enviados, cero se convirtieron en
> cliente.** Los dos clientes que existen entraron por fuera del sistema construido.

### Lectura del corte 27-sep (día 83 de 90)
- **El embudo diseñado no ha cerrado un solo cliente.** Ambos cierres son de Desarrollo Web y
  ninguno vino del outbound de SEO/AEO, que es lo que mide el plan.
- **El referido funciona mejor que todo lo demás:** el segundo cliente lo trajo el primero, sin
  costo de adquisición. Es la única fuente con 100 % de efectividad hasta ahora, y no está
  sistematizada (el permiso de caso público del primer cliente sigue sin pedirse desde julio).
- **La única pérdida potencial no está registrada como tal:** Chef & Hotel tuvo llamada y
  propuesta, y murió en silencio tras un «quedo atento». Mientras no se cierre como perdido con su
  motivo, el patrón que lo mató no entra en `objeciones-y-perdidas.md` y se va a repetir.

## Motivos de pérdida (resumen del detalle en `objeciones-y-perdidas.md`)

*(vacío hasta que haya pérdidas registradas)*

| Motivo | Ocurrencias |
|---|---|

## Cómo leer este panel

- **Con 0-2 cierres, cualquier tasa es ruido estadístico** — no ajustar guion ni precio en base a 1-2 casos. Recién con ~5 propuestas enviadas las tasas empiezan a decir algo.
- Si la tasa llamada→propuesta cae muy por debajo de ~65 %, revisar la calificación en la llamada (¿se están agendando llamadas con prospectos sin fit real?) antes que el pitch.
- Si la tasa propuesta→cierre cae muy por debajo de ~40 %, revisar precio/alcance de la cotización con `marketing/plantillas/cotizaciones/guia-cotizaciones.md`, y cruzar contra los motivos en `objeciones-y-perdidas.md`.
