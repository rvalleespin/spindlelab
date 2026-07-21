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
| Bernardo Combeau | Fotógrafo | Contacto directo | **Ganado ✅ — en ejecución** | Ver entrega en `proyectos-en-curso.md` (Fase 3 pagada, rumbo a Lanzamiento) | 14 jul 2026 (pago Fase 3) | Cotización SPL-COT-2026-014 aprobada. **Plan Esencial** ($392.000), no Portafolio Pro — corregido según el abono del 14 jul. **Pendiente: pedir permiso de caso público desde el día 1** (no repetir la espera de SimpleTrust). |

## Casos en pausa (no forman parte del pipeline activo)

| Nombre / Empresa | Motivo de la pausa | Retomar cuando |
|---|---|---|
| SimpleTrust | Solicitud de testimonio sin enviar, empujada por la prioridad de Bernardo | Cuando haya ancho de banda — plantilla lista en `marketing/plantillas/solicitud-testimonio-simpletrust.md` |

## Cómo se alimenta este pipeline

- **Desde marketing:** cuando alguien responde a un email de outbound (`marketing/outbound/`) o escribe por la web/redes, se agrega una fila aquí.
- **Desde ventas:** cada avance de etapa se actualiza a mano — este documento no se automatiza (todavía) porque el volumen no lo justifica.
- Al ganar un proyecto, agregar también una entrada en `proyectos-en-curso.md` (pendiente de crear cuando haya un segundo proyecto activo en simultáneo con Bernardo).
