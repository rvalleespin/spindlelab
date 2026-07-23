# Pipeline de ventas — SpindleLab

> Separado deliberadamente de `marketing/`: marketing genera demanda (outbound, contenido, redes); esto trackea qué pasa con cada prospecto desde que hay contacto real hasta que se gana o se pierde. Un prospecto entra aquí en cuanto responde a un email, pide una cotización, o llega por cualquier otro canal (referido, orgánico, contacto directo).

## Etapas

1. **Contactado** — hubo primer contacto (email, mensaje, conversación), sin compromiso aún.
2. **Diagnóstico/propuesta enviada** — se envió el mini-diagnóstico gratis o una cotización.
3. **Llamada agendada** — hay conversación de 20 min agendada o realizada.
4. **Propuesta formal enviada** — cotización cerrada enviada (usar `marketing/plantillas/cotizaciones/`).
5. **Ganado ✅** — proyecto confirmado.
6. **Perdido ✗** — no avanzó; anotar motivo en Notas (precio, timing, silencio).

## Pipeline activo

| Nombre / Empresa | Rubro | Fuente | Etapa | Próximo paso | Último contacto | Notas |
|---|---|---|---|---|---|---|
| Bernardo Combeau | Fotógrafo | Contacto directo | **Ganado ✅ — Lanzamiento** | Conectar dominio y salir a producción — **meta: viernes 24 jul**. Detalle de fases en `proyectos-en-curso.md` | 20 jul 2026 (reunión de entrega + compra de dominio) | Cotización SPL-COT-2026-014 aprobada. **Plan Esencial** ($392.000). Sitio y panel de administración presentados a Bernardo el 20 jul, dio el OK y quedó probando la plataforma. Compró `bernardocombeau.cl` (NIC Chile) el mismo día. **Pagos (corregido con evidencia bancaria):** Fase 3 (40%, $156.800) pagada 14 jul; Fase 1 y Fase 5 siguen pendientes ($235.200 en total) — no se cobró Fase 1 a inicios de julio como decía una versión anterior de esta fila. **Permiso de caso público: aún no pedido** pese al acuerdo de pedirlo desde el día 1 — con el cliente ya aprobando el sitio, es buen momento para pedirlo ahora. |
| Revista Chef &amp; Hotel | Medio gastronomía/hotelería | Contacto directo (URL entregada por Ramón) | **Contactado** | Enviar mini-diagnóstico SPL-DIAG-2026-002 desde hola@spindlelab.cl (→ pasa a etapa 2 al enviar) | 21 jul 2026 | Diagnóstico listo en `marketing/diagnosticos/SPL-DIAG-2026-002-chefandhotel/`. Hallazgo eje: artículos sin schema Article ni meta description. **Sección 2 (IA) redactada en términos de riesgo** — se puede reforzar si Ramón corre la prueba ChatGPT. |

## Casos en pausa (no forman parte del pipeline activo)

| Nombre / Empresa | Motivo de la pausa | Retomar cuando |
|---|---|---|
| SimpleTrust | Solicitud de testimonio sin enviar, empujada por la prioridad de Bernardo | Cuando haya ancho de banda — plantilla lista en `marketing/plantillas/solicitud-testimonio-simpletrust.md` |

## Cómo se alimenta este pipeline

- **Desde marketing:** cuando alguien responde a un email de outbound (`marketing/outbound/`) o escribe por la web/redes, se agrega una fila aquí.
- **Desde ventas:** cada avance de etapa se actualiza a mano — este documento no se automatiza (todavía) porque el volumen no lo justifica.
- Al ganar un proyecto, agregar también una entrada en `proyectos-en-curso.md` con el detalle de fases/entrega — **21 jul: se encargó su creación a la sesión de `/persona-disenador-web`** (tiene la visibilidad real de fases que esta sesión no tiene), sin esperar a un segundo proyecto simultáneo.
