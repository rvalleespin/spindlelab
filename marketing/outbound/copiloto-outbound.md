# Copiloto de outbound — diseño

**Qué es:** una rutina que corre sola cada mañana y hace el trabajo de constancia del outbound
frío, dejando el envío en manos de Ramón. Nace de la lección del 29 jul 2026: el piloto no
falló por el copy (entrega 9.1/10, cae en Principal), falló por **disciplina de proceso** —
follow-ups nunca enviados y bandeja sin mirar por dos semanas. El copiloto existe para que eso
no vuelva a pasar.

## Regla que nunca se rompe

**El copiloto NO envía correos.** Solo lee, redacta borradores, agenda y avisa. El humano
aprieta "enviar". Esto es la regla sagrada del pipeline, no una opción de config.

## Prerrequisitos

1. **Gmail conectado a `hola@spindlelab.cl`** (no a la cuenta personal). Sin esto, los pasos de
   bandeja y borradores no funcionan.
2. Acceso de lectura/escritura al repo SpindleLab (tablas de seguimiento).
3. *Caveat técnico a verificar en la primera corrida:* el conector de Gmail es de claude.ai
   (autenticación interactiva) y **puede no estar disponible en una corrida headless/cron**. Si
   en la primera ejecución el copiloto no ve la bandeja, el plan B es correrlo en la sesión
   autenticada de Ramón (local/desktop) en vez de puro cron. Se decide con la evidencia de la
   corrida 1, no antes.

## Qué hace cada mañana (en orden)

### 1. Barrido de bandeja (lo más importante)
Busca en `hola@spindlelab.cl` respuestas nuevas desde la última corrida a los correos de
outbound. Clasifica cada una:
- **Interesado / pide diagnóstico** → prioridad máxima.
- **Pregunta / objeción** → responder con las "Respuestas tipo" de `plantillas/emails-fase0.md`.
- **Negativa** → registrar y cerrar limpio.
- **Rebote / fuera de oficina** → marcar y reprogramar o descartar.

### 2. Para cada respuesta interesada
- **Avisa a Ramón de inmediato** (no espera a la mañana siguiente si se puede).
- **Pre-arma el mini-diagnóstico** de ese sitio (skill `mini-diagnostico`) para que salga dentro
  de las 24 h prometidas — deja el 1-pager listo, Ramón lo revisa y envía.
- Mueve el prospecto a la etapa correcta en `ventas/pipeline.md` (Contactado → Interesado).

### 3. Follow-ups que vencen hoy
Lee las tablas de seguimiento (`re-toque-relanzamiento.md`, lotes) y calcula quién está en día
+4 o +10 sin respuesta según la cadencia de `emails-fase0.md`. Redacta esos follow-ups (toque 2
/ toque 3, con la voz humana ya afinada) y los deja **como borradores en Gmail**.

### 4. Lista de envío del día
Con la rampa (≤5–10/día, dominio nuevo), arma "envía hoy estos N", con el link a cada borrador
ya listo. Nunca propone pasarse de la rampa.

### 5. Actualiza el estado
Escribe de vuelta en las tablas (enviado / respondido / etapa / próxima acción) y deja una línea
en un log diario. Una sola fuente de verdad, sin bookkeeping a mano.

## Salida (el "briefing" de la mañana)
Un mensaje corto a Ramón:
- 🔴 Respuestas que necesitan acción hoy (con el diagnóstico ya pre-armado).
- 📤 Qué enviar hoy (borradores listos, respetando rampa).
- ⏰ Follow-ups redactados y en borradores.
- 📊 Estado: cuántos enviados, cuántos en vuelo, cuántos cerrados.

## Guardrails
- No envía. Solo borradores.
- No inventa hallazgos ni evidencia. Si no puede verificar un sitio, lo dice.
- Si Gmail no está disponible en la corrida, lo reporta y salta los pasos de bandeja — **no
  falla en silencio ni finge que revisó**.
- Respeta la rampa siempre.

## Cadencia de la rutina
- 1×/día en la mañana (hora de Chile). No más seguido: quema tokens sin ganancia.
- Excepción a evaluar: un segundo barrido de bandeja al mediodía si el volumen de respuestas lo
  amerita (para no dejar a nadie esperando >24 h).

## Decisiones de arquitectura (29 jul 2026)
- **Estado en Gmail, no en archivos.** La rutina corre en la nube (no ve iCloud) y escribir en
  el repo desde la nube desincronizaría con la copia local. Por eso el estado vive en Gmail:
  Enviados (qué/cuándo), bandeja (respuestas) y **etiquetas** (`copiloto/respondio`,
  `copiloto/toque-2-listo`, `copiloto/toque-3-listo`) para no duplicar follow-ups.
- **Prompt autocontenido.** La rutina no depende de leer el repo ni de skills locales
  (`mini-diagnostico`); todo el criterio va en el prompt.
- **Solo borradores.** El aviso diario y las respuestas/follow-ups quedan como borradores en
  Gmail (este conector no expone "enviar"). Ramón revisa y envía.
- **Ventana de follow-up = 14 días.** No resucita el lote de julio (ya cerrado); solo agenda
  toques 2/+4d y 3/+10d de envíos recientes.

## Rutina en producción
- **Nombre:** `Copiloto outbound SpindleLab`
- **ID:** `trig_012i6WEJU12aAVfSCsNMVAVX`
- **Horario:** `30 12 * * 1-5` (08:30 Chile, lunes a viernes).
- **Modelo:** claude-sonnet-5 · **Conector:** Gmail (`hola@spindlelab.cl`).
- **Panel:** https://claude.ai/code/routines/trig_012i6WEJU12aAVfSCsNMVAVX

## Estado de implementación
- [x] Diseño aprobado (29 jul 2026).
- [x] Gmail reconectado a `hola@spindlelab.cl` (verificado: veo Enviados + bandeja).
- [x] Rutina creada y agendada (08:30 hábiles).
- [~] Corrida 1 de prueba disparada 29 jul 21:37 UTC — verificar que Gmail funciona en la nube.
- [ ] Confirmar resultado corrida 1 (briefing "sin novedades" en borradores) y calibrar.
