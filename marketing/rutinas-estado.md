# Rutinas cloud — estado real (22-sep-2026)

Verificado por API el 22-sep, no de memoria. Se gestionan en https://claude.ai/code/routines
(borrarlas solo se puede desde ahí).

| Rutina | ID | Cron (UTC) | Estado |
|---|---|---|---|
| **Copiloto outbound SpindleLab** | `trig_012i6WEJU12aAVfSCsNMVAVX` | `0 12 * * 1-5` (09:00 Chile) | ✅ activa |
| **Pulso de métricas (viernes)** | `trig_01QfpNPaVfgi1cE5Tn2AsvLf` | `0 12 * * 5` | ✅ activa, commitea al repo |
| Generador primer contacto abogados | — | — | ⏸️ apagada 31-ago, fusionada en el Copiloto. **No reactivar** |
| CRM seguimiento (lun y jue) | — | — | ⏸️ apagada 31-ago. Su función vuelve como paso 4b del Copiloto |

---

## El bug que costó 19 días de silencio

**Síntoma:** el Copiloto mandó su briefing diario el 3-sep y nunca más, hasta el 22-sep.

**Diagnóstico (22-sep):** la rutina **no estaba caída**. Corría todos los días hábiles y terminaba
en `SUCCEEDED`. El problema eran dos capas, las dos en su propia configuración:

1. **El prompt decía `5) BRIEFING. Crea UN BORRADOR de resumen`**, y en guardarraíles
   `- Solo borradores. Nunca envias.` La rutina hacía exactamente lo que se le pidió: dejaba el
   briefing en borradores.
2. **`allowed_tools` no incluía `mcp__Gmail__send_message`.** Aunque el prompt hubiera dicho
   "envía", la rutina no tenía con qué.

**Consecuencia real:** el 31-ago se apagó la rutina de CRM por "redundante con el Copiloto", y el
Copiloto dejó de avisar. Sin red, los dos prospectos más avanzados quedaron 11 y 36 días sin que
nadie los retomara (ver `ventas/pipeline-reconstruido-2026-09-22.md`).

## Los cambios aplicados el 22-sep

- `allowed_tools` += `mcp__Gmail__send_message`.
- **Paso 4b nuevo — SEGUIMIENTOS CALIENTES VENCIDOS:** hilos donde el prospecto ya respondió y
  llevan +5 días sin movimiento. No redacta nada, solo los lista arriba del briefing. Los que
  quedaron con la pelota en su cancha ("yo te aviso") van con PRIORIDAD ALTA. No cuentan contra
  el tope de 8 follow-ups.
- **Paso 4c nuevo — POST EN COLA:** busca en `marketing/redes/` un `publicar.md` agendado para hoy
  y pega su cuerpo y primer comentario en el briefing, listos para publicar.
- **Paso 5:** el briefing se **envía** con `send_message`, ya no se deja en borradores.
- **Guardarraíl mecánico:** `send_message` se usa exactamente una vez por corrida y el único
  destinatario posible es `manuvalleespin@gmail.com`. Cualquier otro destinatario es un error.
- Limpieza: la línea 160 tenía las comillas doble-escapadas (`\"Inicio\"`), un artefacto del
  original. Ahora son comillas normales.

**Copia del prompt del 22-sep: SUPERADA (2-nov-2026).** `marketing/rutinas-prompt-copiloto-2026-09-22.txt`
(27.068 chars, cotejado por hash contra lo que había en producción *ese día*) ya no es el prompt
vigente: vende un «MOTOR DE ADQUISICION» y ofrece un «diagnóstico gratis», y la rutina se reescribió
el 24-sep (campaña Verifica y Cumple) y se corrigió varias veces en octubre. **La fuente es la
rutina programada, no este archivo ni esa copia** (`RemoteTrigger get` sobre
`trig_012i6WEJU12aAVfSCsNMVAVX`). La línea de la casa vigente está en
`marketing/oficina/clientes/spindlelab.md`, y lo que hoy hace el copiloto en
`marketing/outbound/copiloto-outbound.md`. Leído en vivo el 2-nov: cron `0 11 * * 1-5` (08:00 Chile
con UTC-3), activa, prompt de 25.502 chars; la tabla de arriba, con `0 12`, es la foto del 22-sep.

**Firma:** la del copiloto dice «FUNDADOR», que coincide con la decisión de Ramón del 2-nov
(«Fundador», sin «director»). Cambiar cualquier texto de la rutina exige reenviar el prompt completo
(ver más abajo) y es acción de Ramón.

## Cómo se diagnostica una rutina desde una sesión

Con la skill `/schedule` y la herramienta `RemoteTrigger`:
`get` para ver estado y prompt · `list_runs` para las corridas · `get_run_log` para el detalle de
una. **`last_run.status: SUCCEEDED` no significa que hizo lo que esperabas**: acá decía SUCCEEDED
todos los días mientras el briefing se quedaba en un cajón. Hay que leer el log.

⚠️ **La API no acepta actualizaciones parciales del `job_config`:** para cambiar una línea del
prompt hay que reenviarlo entero. Guardar una copia local antes de tocar nada, y cotejar por hash
después.
