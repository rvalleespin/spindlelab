# Copiloto de outbound — diseño

> **Puesta al día del 2-nov-2026.** Este documento nació como diseño (29-jul) y la rutina cambió
> después. Contrastado el 2-nov con la rutina viva (`RemoteTrigger get`, solo lectura), hoy el
> copiloto **solo hace respuestas y seguimientos** (toque 2 y toque 3) de la campaña Verifica y
> Cumple. **No escribe primeros contactos** (no tiene navegador y el hallazgo se produce en sesión),
> **no arma la revisión gratis ni una lista de envío**, y **no escribe en el repo ni en las tablas**:
> el estado vive en Gmail. La fuente de verdad es la rutina, no este archivo; si difieren, manda la
> rutina. Los pasos de abajo están corregidos a eso.

**Qué es:** una rutina que corre sola cada mañana y hace el trabajo de constancia del outbound
frío, dejando el envío en manos de Ramón. Nace de la lección del 29 jul 2026: el piloto no
falló por el copy (entrega 9.1/10, cae en Principal), falló por **disciplina de proceso** —
follow-ups nunca enviados y bandeja sin mirar por dos semanas. El copiloto existe para que eso
no vuelva a pasar.

## Regla que nunca se rompe

**El copiloto NO envía correos.** Solo lee, redacta borradores de respuesta y seguimiento y avisa. El humano
aprieta "enviar". Esto es la regla sagrada del pipeline, no una opción de config.

## Prerrequisitos

1. **Gmail conectado a `hola@spindlelab.cl`** (no a la cuenta personal). Sin esto, los pasos de
   bandeja y borradores no funcionan.
2. Acceso de **lectura** al repo SpindleLab: en cada corrida lee `ventas/lista-exclusion.csv`
   (paso 0). No escribe en el repo.
3. *Caveat de la primera corrida, resuelto:* se temía que el conector de Gmail no estuviera
   disponible en una corrida programada. Sí lo está: la rutina barre la bandeja de
   `hola@spindlelab.cl` y crea borradores todos los días hábiles (ver `marketing/rutinas-estado.md`).
   Lo que sí falló fue otra cosa: el briefing se quedó 19 días en borradores.

## Qué hace cada mañana (en orden)

### 0. Lista de exclusión (antes que todo)
Lee `ventas/lista-exclusion.csv`. Bloquea por email y por dominio. **Falla cerrado:** si no puede
leerla, no genera ningún borrador a prospectos y lo dice en la primera línea del briefing.

### 1. Barrido de bandeja (lo más importante)
Busca en `hola@spindlelab.cl` (`in:inbox newer_than:3d`) respuestas a los correos de outbound.
Clasifica cada una:
- **Quiere avanzar** → prioridad máxima: va al briefing como acción para Ramón.
- **Pregunta / objeción** → borrador de respuesta dentro del hilo, con lo que dice el prompt de la
  rutina (campaña Verifica y Cumple: chequeo gratis, kit desde $149.000 + IVA, trimestral solo
  después del kit). **La oferta de la casa del 30-oct no está en el prompt de la rutina:**
  «Hablemos de tu sitio»; con sitio, revisión gratis de una página en un día hábil; sin sitio,
  cómo lo haríamos y cuánto cuesta. Si una conversación sale de Verifica y Cumple, la decide
  Ramón con `marketing/oficina/clientes/spindlelab.md` y `ventas/objeciones-y-perdidas.md`. Las
  «Respuestas tipo» de `plantillas/emails-fase0.md` están retiradas (2-nov-2026).
- **Negativa / baja** → borrador amable (agradecer primero) y al briefing para la lista de exclusión.
- **Rebote** → al briefing con el código del servidor; un código 4.x.x es una demora temporal y no
  va a la lista de exclusión. Las respuestas automáticas de ausencia («fuera de oficina») no están
  cubiertas por el prompt de la rutina.

### 2. Para cada respuesta que quiere avanzar
- **Lo avisa en el briefing de esa mañana.** La rutina corre una vez al día: no hay aviso inmediato.
- **No pre-arma la revisión gratis de una página.** No tiene navegador y no puede producir un
  hallazgo; esa revisión la arma una sesión con navegador (skill `mini-diagnostico`) para salir
  dentro del día hábil prometido. Si el prospecto no tiene sitio, no hay revisión: el borrador es
  cómo lo haríamos y cuánto cuesta, y lo escribe quien tome la conversación.
- **No mueve etapas ni toca `ventas/pipeline.md`:** no escribe en el repo. La etapa la lleva la troncal.

### 3. Seguimientos que vencen hoy
La cola sale de **dos búsquedas en Gmail con etiqueta**, no de las tablas de seguimiento ni de un
barrido por fechas: los pendientes de toque 2 (`copiloto/toque-2-listo`) y los de toque 3
(`copiloto/toque-3-listo`). Los plazos son los de las dos búsquedas: el toque 2 sale de mensajes
enviados hace más de 3 días (`in:sent before:HACE3`), sin la etiqueta `copiloto/toque-2-listo`; el
toque 3, de enviados hace más de 4 días (`before:HACE4`), con la etiqueta `copiloto/toque-2-listo`
y sin `copiloto/toque-3-listo`. **Tope de 3 toques por
dirección**, contando los mensajes nuestros enviados más los borradores pendientes (ver *Decisiones
de arquitectura*). El toque 2 lleva algo nuevo (máx. 90 palabras); el toque 3 es un **cierre
neutro** (máx. 70 palabras) que no afirma ningún hecho técnico, porque la rutina no puede remedir.
Los deja **como borradores en Gmail**, dentro del hilo del prospecto.
- **Paso 3B:** entregables enviados con adjunto y sin respuesta. No redacta nada: los lista en el
  briefing, arriba, porque son los leads más calientes.

### 4. Tope diario
Máximo **15 borradores nuevos por corrida**; el resto va al briefing como «para mañana», con la
lista de direcciones. **No arma una «lista de envío del día» ni calcula la rampa:** la rampa del
correo frío la controla Ramón a mano.

### 5. Briefing, sin escribir en el repo
No escribe en tablas ni en el repo. Las bajas, negativas, rebotes y topes que detecta van al
briefing y Ramón los pasa a `ventas/lista-exclusion.csv`; el estado vive en Gmail (etiquetas).

## Salida (el "briefing" de la mañana)
Un mensaje a `manuvalleespin@gmail.com` (asunto «Copiloto Verifica y Cumple - resumen del dia»):
- Cuántas filas tenía la lista de exclusión y cuántos candidatos devolvió cada búsqueda.
- 🔴 Respuestas que necesitan acción hoy y entregables sin respuesta (los más calientes, arriba).
- 📤 Qué hay en borradores (tope de 15 por corrida) y la cola que queda para mañana.
- ⏰ Seguimientos redactados hoy, con los toques contados uno por uno; las direcciones saltadas
  por tener ya un borrador; los topes inferidos por patrón, rotulados «sin confirmar».
- 📊 Bajas, negativas, rebotes y topes para pasar a la lista de exclusión, y cualquier búsqueda que
  falló o volvió truncada. Si no hubo nada: «Sin novedades hoy».

## Guardrails
- No envía. Solo borradores.
- No escribe primeros contactos. Si no se midió en un navegador, no existe.
- No inventa hallazgos ni evidencia. Si no puede verificar un sitio, lo dice.
- Si Gmail no está disponible en la corrida, lo reporta y salta los pasos de bandeja — **no
  falla en silencio ni finge que revisó**.
- Respeta el tope de 15 borradores por corrida. La rampa semanal la controla Ramón.

## Cadencia de la rutina
- 1×/día en la mañana (hora de Chile). No más seguido: quema tokens sin ganancia.
- Excepción a evaluar: un segundo barrido de bandeja al mediodía si el volumen de respuestas lo
  amerita (para no dejar a nadie esperando >24 h).

## Decisiones de arquitectura (29 jul 2026)
- **Estado en Gmail, no en archivos.** La rutina corre en la nube (no ve iCloud) y escribir en
  el repo desde la nube desincronizaría con la copia local. Por eso el estado vive en Gmail:
  Enviados (qué/cuándo), bandeja (respuestas) y **etiquetas** (`copiloto/respondio`,
  `copiloto/toque-2-listo`, `copiloto/toque-3-listo`) para no duplicar follow-ups.
- **Prompt autocontenido.** La rutina no depende de skills locales (`mini-diagnostico`); todo el
  criterio va en el prompt. Una excepción desde el 25-sep: lee `ventas/lista-exclusion.csv` del
  repo en cada corrida, y como clona `origin/main`, lo que solo vive en una rama no existe para ella.
- **Solo borradores.** El aviso diario y las respuestas/follow-ups quedan como borradores en
  Gmail (este conector no expone "enviar"). Ramón revisa y envía.
- **Ventana de follow-up: superada.** Al principio era una ventana de 14 días con toques a +4 y
  +10 días. Desde el 13-oct la cola son dos búsquedas con etiqueta (toque 2 y toque 3), porque el
  barrido de 14 días devolvió 69 y 201 candidatos de los que casi todos ya estaban cerrados.

## Rutina en producción
- **Nombre:** `Copiloto outbound SpindleLab`
- **ID:** `trig_012i6WEJU12aAVfSCsNMVAVX`
- **Horario:** `0 11 * * 1-5` (11:00 UTC = 08:00 Chile con UTC-3, lunes a viernes). El `30 12` que
  figuraba aquí era el de julio. **El cron va en UTC:** cuando termine el horario de verano en
  Chile (abril de 2027) esa misma expresión disparará a las 07:00 y habrá que subirla a `0 12`.
- **Modelo:** claude-sonnet-5 · **Conector:** Gmail (`hola@spindlelab.cl`).
- **Herramientas (`allowed_tools`):** `Read`, `Grep`, `Glob` y Gmail (buscar, leer, etiquetar,
  `create_draft`, `list_drafts`, `get_draft`). **No incluye `send_message`**: con estas herramientas
  el briefing solo puede quedar como borrador. Es el mismo hueco que costó 19 días de silencio en
  septiembre (ver `marketing/rutinas-estado.md`); conviene comprobar dónde está llegando el briefing.
- **Panel:** https://claude.ai/code/routines/trig_012i6WEJU12aAVfSCsNMVAVX
- **Verificado el 2-nov-2026** (`RemoteTrigger get`): activa, última corrida 2-nov 11:07 UTC con
  estado `SUCCEEDED` (que no prueba que hizo lo esperado), prompt de 25.502 chars, actualizado por
  última vez el 14-oct. Su firma dice «FUNDADOR».
- **Cambiar cualquier texto de la rutina exige reenviar el prompt completo** (la API no acepta
  actualizaciones parciales) y es acción de Ramón.

## Estado de implementación
Histórico del 29-jul; la rutina corre a diario desde entonces y su estado vive en
`marketing/rutinas-estado.md`.
- [x] Diseño aprobado (29 jul 2026).
- [x] Gmail reconectado a `hola@spindlelab.cl` (verificado: veo Enviados + bandeja).
- [x] Rutina creada y agendada.
- [x] Corrida 1 de prueba (29 jul 21:37 UTC) y calibración: superadas por las correcciones de
  septiembre y octubre (ver arriba).
