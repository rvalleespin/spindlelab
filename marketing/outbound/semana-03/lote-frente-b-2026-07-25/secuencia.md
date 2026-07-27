# Secuencia Frente B — clínicas dentales y estética

**Preparado:** 25 jul 2026 · Cuenta de envío: `hola@spindlelab.cl` (envío manual, Gmail web)
**Cubre:** los 41 contactos del CSV de Apollo del 21 jul. Tanda 1 ya está redactada en
`../lote-1-frente-b.md`; este lote agrega la **plantilla de secuencia completa** (que no existía)
y los **borradores de Tanda 2**.

> **Nada de esto se envía desde aquí.** Los estados quedan en `Redactado` / `Listo`.
> El paso a `Enviado` lo marca Ramón cuando confirme el envío, en `envios.csv`.

---

## Por qué esta plantilla existe

Hasta ahora Frente B tenía **un solo toque**: el Email 1 personalizado por prospecto, y nada
después. Un prospecto que no contesta el primer correo simplemente se perdía. La secuencia de
abajo agrega los dos seguimientos que faltaban, con la cadencia estándar del proceso.

**Cadencia: día 0 → día 3 → día 7. Máximo 3 toques. Después se cierra el loop y no se insiste.**

---

## Email 1 — apertura con hallazgo (día 0)

Es el único toque que se personaliza entero. La estructura fija:

```
Asunto: [el hallazgo concreto, en lenguaje de la clínica, sin jerga técnica]

Hola {nombre}:

[1 párrafo: qué revisé y qué encontré. Concreto, verificable, del sitio de ELLOS.]

[1 párrafo: por qué importa para su negocio, no por qué es técnicamente interesante.]

Me dedico a SEO técnico y visibilidad en motores de IA para clínicas de salud y estética.
¿Te preparo un mini-diagnóstico de 1 página en 48 horas? Gratis, sin compromiso.

SpindleLab — SEO técnico y visibilidad en IA · spindlelab.cl
```

**Reglas del hallazgo (innegociables):**
- Sale de una verificación real del sitio, hecha antes de escribir. Nunca genérico, nunca inventado.
- Si al revisar el sitio **no aparece ningún defecto real**, el prospecto se marca `No enviar` con
  la razón. No se fabrica un problema para tener a quién escribirle. Ya pasó una vez en este lote
  (Dentistas por Chile, ver `envios.csv`).
- Se explica en lenguaje que entiende una dueña de clínica, no en jerga de SEO.

---

## Email 2 — recordatorio corto (día 3)

Mismo hilo, responder sobre el Email 1 (no correo nuevo). Sin reproche, sin "solo quería
asegurarme de que llegara". Tres líneas.

```
Asunto: (responder en el mismo hilo, sin cambiar el asunto)

Hola {nombre}:

Te escribo corto por si el correo anterior quedó enterrado. Lo de {hallazgo en 4-5 palabras}
sigue igual, lo volví a mirar hoy.

Si te sirve, te dejo el mini-diagnóstico de 1 página listo en 48 horas. Un "dale" me basta.

Ramón · SpindleLab
```

**Regla:** la frase "lo volví a mirar hoy" solo se usa si de verdad se volvió a verificar. Si no,
se borra esa parte. Es exactamente el tipo de detalle que destruye credibilidad si el prospecto
responde "no, ya lo arreglamos".

---

## Email 3 — cierre del loop (día 7)

Último toque. El objetivo no es presionar, es cerrar limpio y dejar la puerta abierta. Este correo
tiene una tasa de respuesta sorprendentemente alta justamente porque no pide nada.

```
Asunto: (mismo hilo)

Hola {nombre}:

Cierro el loop para no seguir ocupándote la bandeja. Te dejo el hallazgo por si le sirve a quien
vea el sitio: {hallazgo en una línea, concreto y accionable}.

Es corregible sin mí. Si en algún momento quieren una revisión completa, quedo por acá.

Ramón · SpindleLab
```

**Regla:** entregar el hallazgo gratis y sin condición. Si lo arreglan solos, igual queda asociada
la marca al criterio. Si necesitan más, vuelven.

---

## Después del Email 3

- Sin respuesta → estado `Cerrado sin respuesta` en `envios.csv`. **No se reactiva** salvo que
  haya un motivo nuevo y real (cambio de sitio, nota de prensa, contacto entrante).
- Respondió → deja de ser outbound. Pasa a **Raquel** (`agente-crm`): fila nueva en
  `ventas/pipeline.md`, etapa "Contactado".
- Pidió el diagnóstico → se activa **Valen** (`mini-diagnostico`), entrega en 48h.
- Rebotó → estado `Rebotó`. Si es un dominio catch-all, anotar: es la señal que decide si el
  resto de la 2ª ola se envía o se descarta.

---

## Control de ritmo

El dominio `hola@spindlelab.cl` viene con historial acumulado (20 correos de Frentes A y C desde el
10 jul, más los de Frente B). Las tandas siguen siendo tandas: **no soltar los 41 de una vez**, y
no mezclar la 2ª ola de catch-all con envíos normales. Un rebote alto en un warm-up joven cuesta
más de lo que rinde cualquier tanda.
