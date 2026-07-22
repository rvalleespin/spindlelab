# Proyectos en curso — SpindleLab

> Distinto de `pipeline.md`: pipeline trackea prospectos hasta que se ganan o se pierden; esto trackea la **entrega** de los proyectos ya ganados. Un proyecto entra aquí cuando pasa a "Ganado ✅" en el pipeline y sale cuando se cierra/entrega o se da de baja.

## Cómo se usa

- Cada proyecto activo es una fila en la tabla de abajo, con la fase actual según el proceso de entrega correspondiente (ver la columna "Proceso de referencia").
- Actualizar la fase apenas cambie — este documento no se automatiza, igual que `pipeline.md`.
- Al entregar/cerrar un proyecto, mover la fila a "Proyectos entregados" con fecha de cierre y, si corresponde, iniciar la gestión de caso público (`marketing/plantillas/solicitud-testimonio-simpletrust.md` es la plantilla de referencia para pedir permiso).

## Proyectos activos

| Cliente | Línea de servicio | Proceso de referencia | Fase actual | Próximo hito | Último contacto | Notas |
|---|---|---|---|---|---|---|
| Bernardo Combeau | Desarrollo Web (**Plan Esencial**, oferta $392.000) | `ventas/proceso-desarrollo-web-cliente.md` | 5. Lanzamiento — cliente aprobó el sitio en reunión (20 jul); armando checklist técnico de salida | Conectar dominio `bernardocombeau.cl` (comprado 20 jul en NIC Chile) — DNS y OAuth callback en curso. Meta tope: **viernes 24 jul**. Cobros pendientes: Fase 1 ($117.600) + Fase 5 ($117.600) = $235.200, en **un solo cobro contra entrega** (decisión 22 jul) | 20 jul 2026 (reunión: cliente dio OK, quedó probando el panel) | Cotización SPL-COT-2026-014 aprobada. Plan Esencial (no Portafolio Pro) — el abono de $156.800 = 40% de $392.000 lo confirma. **Cambió el orden de cobro**: se pagó primero la Fase 3; Fases 1 y 5 quedan pendientes. Proyecto en `bernardo-combeau` (Vercel) — los fallos de deploy del 14-16 jul ya se resolvieron (bug de configuración, no de código). Bernardo ya es colaborador en GitHub y está usando el panel de administración directamente (creó series de prueba él mismo). **Sigue pendiente pedir permiso de caso público — no se ha pedido todavía**, pese al acuerdo de pedirlo desde el día 1; dado que el cliente ya aprobó y está en fase de lanzamiento, es buen momento para pedirlo ahora. Checklist técnico restante: registros DNS en NIC Chile, actualizar callback de la OAuth App de GitHub, apuntar `site` del proyecto al dominio real — nada de esto bloquea el pago, son tareas en paralelo. Ver "Estado de pagos" abajo. |

## Estado de pagos — Bernardo Combeau

Plan **Esencial**, oferta de lanzamiento **$392.000** (IVA incl.). Esquema original según cotización SPL-COT-2026-014: 30% Fase 1 (al iniciar) / 40% Fase 3 (al aprobar staging) / 30% Fase 5 (contra entrega).

> **Hubo un cambio en el orden de cobro:** se pagó primero la Fase 3 (40%); las Fases 1 y 5 quedaron pendientes. El esquema de montos por fase se mantiene; cambió la secuencia en que se cobra.
>
> **Decisión 22 jul 2026 — Fases 1 y 5 se cobran juntas en un solo pago contra entrega.** En vez de emitir la Fase 1 ahora por separado, Ramón juntará ambas pendientes ($117.600 + $117.600 = **$235.200**) en un único cobro al momento de la entrega. No enviar la Fase 1 aparte.

| Fase | Concepto | Monto (30/40/30) | Estado | Evidencia |
|---|---|---|---|---|
| 1. Descubrimiento | 30% | $117.600 | ⏳ **Pendiente — se cobra contra entrega** (junto con Fase 5) | Cobro aún no realizado. |
| 3. Desarrollo IA | 40% (aprobar staging) | $156.800 | ✅ **Pagado 14 jul 2026** | Transferencia BICE de "Bernardo Combeau Oyarzún" → BancoChile, 14 jul 12:35. Monto exacto = 40% de $392.000. |
| 5. Lanzamiento | 30% (contra entrega) | $117.600 | ⏳ **Pendiente — se cobra contra entrega** (junto con Fase 1) | Cobro aún no realizado. |

Notas:
- **21 jun 2026 — transferencia de $10.000** del mismo remitente, sin clasificar (probable transferencia de prueba). No corresponde a ninguna cuota del esquema; verificar con Bernardo.
- Total verificado recibido vía BICE: **$166.800** ($10.000 + $156.800).
- **Pendiente por cobrar: $235.200** — Fase 1 ($117.600) + Fase 5 ($117.600), en **un solo cobro contra entrega** (decisión 22 jul 2026).

## Proyectos entregados

*(vacío — se completa cuando se cierre el primer proyecto)*

| Cliente | Línea de servicio | Fecha de cierre | ¿Caso público? | Notas |
|---|---|---|---|---|
