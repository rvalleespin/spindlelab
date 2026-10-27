# Encargo al troncal — agregar a Eduardo Bascur (Focus Contable) al pipeline

**De:** sesión de mini-diagnóstico (Valen) · **Para:** troncal (Tomás) · **Fecha:** 2-oct-2026

## Qué hay que hacer

Agregar una fila en `ventas/pipeline.md` para este prospecto. Es un lead **tibio y real**:
respondió un outbound pidiendo el diagnóstico. **Verifica contra la evidencia antes de registrar**
(regla de la casa); toda la evidencia está en Gmail de `hola@spindlelab.cl`.

## Estado real (con evidencia, no de oído)

- **Prospecto:** Eduardo Bascur Hernández — **Director de Operaciones**.
- **Empresas:** `focuscontable.cl` (marca de cursos + servicios tributarios, el sitio auditado) y
  `hbcontadores.cl` (su firma contable; de ahí es su correo y su dirección). Es **contador en
  Puerto Montt** (firma de correo: Valle Volcanes 5202, Puerto Montt).
- **Correo de contacto:** `eduardohb@hbcontadores.cl` · tel. publicado +56 9 6167 3894.
- **Fuente del lead:** outbound de SpindleLab del **30-sep-2026** (asunto *"focuscontable.cl vende
  cursos y no tiene política de privacidad"*). Sacado de la Guía de Empresas de DiarioEmprende.
- **Respuesta del prospecto (1-oct-2026):** pidió el diagnóstico gratis, textual *"Me interesa poder
  obtener un diagnóstico gratis… para evaluar la situación actual de nuestra empresa"*. → Esto ya es
  **evidencia de etapa "Contactado" con interés activo**, verificable en el hilo de Gmail.
- **Diagnóstico:** `SPL-DIAG-2026-007` LISTO (ver `marketing/diagnosticos/SPL-DIAG-2026-007-focuscontable/`).
  Borrador de respuesta **creado en Gmail**, en el hilo, con el PDF por adjuntar. **Lo manda Ramón.**

## Cómo registrarlo

1. **Ahora** (ya hay evidencia): fila en pipeline como **Contactado → respondió, pidió diagnóstico**.
   Fuente: outbound DiarioEmprende. Próximo paso: "Ramón envía SPL-DIAG-2026-007".
2. **Cuando Ramón confirme que mandó el correo** (verifícalo: el correo sale de "Borradores" y aparece
   en "Enviados" del hilo): mover a **"Diagnóstico/propuesta enviada"**, con fecha. No lo muevas antes
   solo porque el borrador existe; un borrador no es un envío.

## Avisos que deben viajar con este registro

- **Incidente a tener presente:** durante la auditoría, dos subagentes **enviaron los formularios
  reales de focuscontable.cl en producción** (prueba de anti-spam, marcado "Third-Party Attack").
  Ramón incluye una línea de disculpa en el correo. Si el prospecto lo menciona, ya está reconocido.
  Detalle en el README del diagnóstico.
- **Encargo aparte para Diego/diseñador** (no es tuyo, troncal, pero déjalo anotado si no existe):
  revisar por qué el workflow de auditoría terminó haciendo POST a formularios de un tercero, para
  que no se repita.

---

## Actualización 13-oct-2026 (seguimiento)

- **El diagnóstico SÍ se envió:** 2-oct-2026 22:26, con el PDF `SPL-DIAG-2026-007-focuscontable.pdf`
  adjunto (confirmado en el hilo de Gmail, etiqueta SENT). → El troncal puede mover la fila a
  **"Diagnóstico/propuesta enviada"** con fecha 2-oct. Ya hay evidencia.
- **11 días de silencio.** Eduardo no respondió a la pregunta de agendar. No rebotó ni se dio de baja.
- **Seguimiento 1 preparado** (borrador en Gmail, sin enviar, 13-oct): nudge corto, re-ancla el valor,
  pide un par de horarios, da salida fácil. Lo manda Ramón.
- **Cadencia sugerida** (es un lead tibio: pidió el diagnóstico, vale 2-3 toques, no abandonar al primero):
  - Si no responde en ~5-7 días → seguimiento 2 con otro ángulo (proponerle un horario concreto, o un
    segundo hallazgo del diagnóstico que no se destacó).
  - Si sigue sin responder tras ese → parquear como **"Perdido ✗ — silencio"**, revisar en ~1 mes.
  - **Canal alterno:** tiene WhatsApp publicado (+56 9 6167 3894). Un contador suele responder más
    rápido ahí que por correo; es decisión de Ramón si lo usa.

---

## Seguimiento 2 — LISTO (preparado 13-oct, para enviar ~5-7 días después del toque 1 si no responde)

**Hallazgo re-verificado el 13-oct:** la portada de focuscontable.cl NO cambió (189.351 bytes, igual que
la auditoría). El bloque «Preguntas Frecuentes» sigue con las preguntas en inglés
(«What is the process for conducting an audit?», «How do you help risk management?») y las respuestas en
texto de relleno en latín. Vigente. Por eso el toque 2 se ancla ahí (hallazgo nuevo, re-gana atención).

**Texto (tú, voz de Ramón, lista para pegar). Lo manda Ramón, no se auto-envía:**

> Hola Eduardo, te dejo una cosa concreta y no te quito más tiempo.
>
> Un detalle del diagnóstico que se ve a simple vista, hoy mismo, en tu portada: el bloque de «Preguntas
> Frecuentes» tiene las preguntas en inglés («What is the process for conducting an audit?») y las
> respuestas en texto de relleno en latín. Cualquiera que entre a tu sitio lo ve, incluidos tus propios
> alumnos.
>
> No es grave, pero es justo el tipo de cosa que te resta credibilidad sin que te enteres, y se arregla
> rápido. Hay varias así, chicas, que juntas deciden si un cliente confía o sigue de largo.
>
> ¿Lo vemos 20 minutos esta semana? Tú me dices el día. Y si prefieres dejarlo, me avisas y no te escribo más.
>
> Un abrazo,
> Ramón

**Este es el último toque de la secuencia** (lleva salida de cortesía). Si tampoco responde → parquear
como "Perdido ✗ — silencio", revisar en ~1 mes o probar WhatsApp (+56 9 6167 3894).

---

## Actualización 13-oct (toque 1 enviado)

- **Seguimiento 1 ENVIADO por Ramón el 13-oct 16:20** (confirmado en el hilo, etiqueta SENT).
- **Ventana del toque 2: ~20-oct** (una semana) si Eduardo no responde.
- **Recordatorio programado** (`send_later`, fire 20-oct 13:00 UTC, trigger `trig_01GNxs6rjLj1oWvdHTEn5PoL`):
  la sesión revisa el hilo; si no hubo respuesta, re-verifica el hallazgo y deja el toque 2 como borrador
  en Gmail para que Ramón lo mande. No se auto-envía.

---

## Actualización 23-oct (cotización enviada)

- **Reunión del 22-oct 14:00:** se realizó. Resultado: Eduardo pidió cotización concreta,
  confirmó cambio de enfoque (empresas de servicios y consultoras: arquitectura, tecnología,
  ingeniería, salud) y pidió dejar los cursos para una segunda etapa.
- **Decisiones de Ramón para la cotización** (en el detalle del archivo de insumos local
  `marketing/oficina/obras-web/focus-contable-sitio/brief-de-obra.md`, no commiteado):
  - Marca Focus se mantiene (logo, colores, tipografía). Diseño propio, sin look genérico de IA.
  - NO WordPress. Stack: **Astro + Decap CMS**.
  - Testimonios y logos solo con autorización escrita.
  - Alcance: redirecciones 301 desde URL actuales + medición del envío del formulario.
  - Línea de cursos actual (tienda y aula) se retira del sitio nuevo durante la obra.
  - Dominio y hosting hoy: por confirmar con el cliente.
  - **Pagos: 50% al iniciar + 50% contra entrega** (fraccionable en 2 cuotas de 25% a conveniencia).
- **Cotización SPL-COT-2026-017 generada hoy** (23-oct):
  - 5 páginas, wordmark tipográfico (sin PNG; el sitio no publica logo-imagen).
  - 3 planes publicados del sitio: Esencial $690.000 / **Completo ★ $1.190.000 (recomendado)** /
    Plataforma a Medida (se cotiza).
  - 5 referentes de dirección creativa reescritos en modo "qué tomamos y hacia dónde lo llevamos"
    (Say Briefly, Adcker, Earlydog, Composer, Daylit) — las frases ancla originales no se podían
    verificar con WebFetch (solo markdown, sin CSS), así que se defendieron reencuadrándolas.
  - PDF: `SPL-COT-2026-017_focus_contable.pdf`, 22 KB, generado en el scratchpad local
    (`COTIZACIONES/` sigue sin existir en esta sesión cloud; el PDF se le pasó a Ramón vía
    SendUserFile y lo descargó él para adjuntarlo).
- **Correo enviado por Ramón 23-oct 10:44 UTC:**
  - Asunto: "Cotización sitio web | SpindleLab"
  - Para: eduardohb@hbcontadores.cl · cc: Danaesp@hbcontadores.cl
  - threadId Gmail: `1a168f41cb965668` (hilo nuevo, no en el hilo del outbound original).
  - **PDF adjunto confirmado por captura de Ramón** (sizeEstimate 35 KB engañó al principio
    por lo chico del PDF; una captura de Gmail después mostró el adjunto en la vista enviada).
- **Pipeline:** fila agregada a `ventas/pipeline.md`, etapa **4. Propuesta formal enviada**,
  próximo paso: seguimiento ~mar 28-oct si no respondió.
- **Recordatorio programado** (nuevo): `send_later` para 28-oct 13:00 UTC — revisar el hilo
  y, si no hubo respuesta, dejar seguimiento 1 como borrador en Gmail para que Ramón lo mande.
- **Trigger del recordatorio del 28-oct:** `trig_01WKMZEL6NT5Qq4mrBTqP7vL`.

---

## Actualización 27-oct (nudge adelantado por decisión de Ramón)

- **Ramón adelantó el seguimiento un día** respecto del recordatorio programado (que estaba para el 28-oct):
  "mandé la cotización. debería mandar un correo para recordar la respuesta". Son 4 días de silencio
  desde el envío del 23-oct, aceptable para el toque 1 de una cotización.
- **Hilo verificado** (`get_thread 1a168f41cb965668`, metadata): sigue con 1 solo mensaje
  (el enviado por Ramón el 23-oct 10:44). Ni Eduardo ni Danae respondieron.
- **Borrador de seguimiento 1 creado en Gmail**, en el mismo hilo (`replyToMessageId: 1a16901e5c77966f`,
  draftId `r-4826920219958750155`, messageId `1a17dac4bee24666`). **No enviado.** Lo manda Ramón.
  Texto corto, re-pregunta por el dominio/hosting que quedó pendiente del correo original
  (gancho concreto para que respondan algo útil, no solo "sí/no"):

  > Hola Eduardo,
  >
  > ¿Cómo quedaron con la cotización por su lado?
  >
  > Y para ir avanzando en paralelo: ¿me cuentan quién tiene hoy a cargo el dominio y el hosting?
  > Con eso dejo preparada la migración sin cortes para cuando digan vamos.
  >
  > Un abrazo,
  > Ramón

- **Recordatorio programado del 28-oct CANCELADO** (`trig_01WKMZEL6NT5Qq4mrBTqP7vL` eliminado):
  ya no tiene sentido porque el nudge quedó preparado hoy.
- **Siguiente ventana** (manual, no hay recordatorio activo): si no responde en ~5-7 días después
  de que Ramón mande este borrador, toque 2 con otro ángulo (precio desglosado, un adicional del
  diagnóstico, o pasar a WhatsApp +56 9 6167 3894 — tiene publicado).
