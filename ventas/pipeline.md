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

> ⚠️ **En reconstrucción (21-sep-2026).** Esta tabla estuvo congelada desde el 23-jul con una
> sola fila, mientras agosto y septiembre sumaban 6 conversaciones vivas que nunca entraron.
> **No la tomes como la realidad todavía.** Las preguntas para reconstruirla están en
> `ventas/pipeline-reconstruccion-preguntas-2026-09-21.md`; en cuanto Ramón las responda, la
> troncal escribe acá una fila por prospecto con etapa real y próximo paso con fecha.


| Nombre / Empresa | Rubro | Fuente | Etapa | Próximo paso | Último contacto | Notas |
|---|---|---|---|---|---|---|
| Bernardo Combeau | Fotógrafo | Contacto directo | **Ganado ✅ — Lanzamiento** | Conectar dominio y salir a producción — **meta: viernes 24 jul**. Ramón afinando detalles de entrega, 23 jul. Detalle de fases en `proyectos-en-curso.md` | 23 jul 2026 (revisiones de afinamiento previas a la entrega) | Cotización SPL-COT-2026-014 aprobada. **Plan Esencial** ($392.000). Sitio y panel de administración presentados a Bernardo el 20 jul, dio el OK y quedó probando la plataforma. Compró `bernardocombeau.cl` (NIC Chile) el mismo día. **Pagos (actualizado 21-sep-2026):** proyecto **pagado al 100 %**. Fase 3 ($156.800) el 14-jul; Fases 1 y 5 ($235.200) cobradas juntas y confirmadas por Ramón el 21-sep. **Ampliación adicional cobrada y entregada: $120.000.** **Ticket real: $512.000** — usar esta cifra como referencia de lo que rinde un cliente de Desarrollo Web, no los $392.000. **Permiso de caso público: aún no pedido** desde julio; ahora sin saldo pendiente la conversación está despejada, es el momento. |

## Casos en pausa (no forman parte del pipeline activo)

| Nombre / Empresa | Motivo de la pausa | Retomar cuando |
|---|---|---|
| SimpleTrust | Solicitud de testimonio sin enviar, empujada por la prioridad de Bernardo | Cuando haya ancho de banda — plantilla lista en `marketing/plantillas/solicitud-testimonio-simpletrust.md` |

## Cómo se alimenta este pipeline

- **Desde marketing:** cuando alguien responde a un email de outbound (`marketing/outbound/`) o escribe por la web/redes, se agrega una fila aquí.
- **Desde ventas:** cada avance de etapa se actualiza a mano — este documento no se automatiza (todavía) porque el volumen no lo justifica.
- Al ganar un proyecto, agregar también una entrada en `proyectos-en-curso.md` con el detalle de fases/entrega — **21 jul: se encargó su creación a la sesión de `/persona-disenador-web`** (tiene la visibilidad real de fases que esta sesión no tiene), sin esperar a un segundo proyecto simultáneo.
