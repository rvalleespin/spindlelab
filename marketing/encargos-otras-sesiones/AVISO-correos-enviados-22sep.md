# ⚠️ Aviso a la sesión que maneja correos (Dereck / Emilia / Raquel)

**22-sep-2026 · escrito por la sesión local que atacó el seguimiento.**

## Se enviaron dos correos hoy desde `hola@spindlelab.cl`. No los repitan.

| Prospecto | Hilo | Qué se mandó | Estado |
|---|---|---|---|
| **Legal Prisma** · sebastian@legalprisma.cl | "Re: Un detalle en legalprisma.cl" | Retoma de la llamada que él canceló el 11-sep | Esperando que diga día |
| **Chef & Hotel** · revista@chefandhotel.cl | "Re: Propuesta para trabajar juntos — SpindleLab" | Retoma tras 36 días de silencio | Esperando respuesta |

Los dos van **dentro del hilo existente**, no en uno nuevo, y con aprobación explícita de Ramón.
`REGISTRO-enviados.csv` ya está actualizado con el toque nuevo.

## Tres cosas que cambian el trabajo de ustedes

**1. Gmail sí es accesible desde una sesión local.** Hasta hoy el protocolo asumía que el estado
de un prospecto vivía en el correo y que ninguna sesión podía leerlo, así que se reconstruía
preguntándole a Ramón. **Ya no hace falta adivinar.** El pipeline del 22-sep se reconstruyó
leyendo los hilos reales: `ventas/pipeline-reconstruido-2026-09-22.md`.

**2. Un dato del CSV estaba mal y se corrigió.** BH Abogados figuraba como «RESPONDIO - activo»;
en realidad **rechazó el 25-ago** con motivo explícito (*"ya hemos estado trabajando en esto con
una empresa de marketing digital"*). Ahora está como CERRADO. Si alguna lista lo trae como vivo,
está desactualizada.

**3. El panel de ventas subestimaba el avance.** `metricas-ventas.md` dice 0 llamadas y 1
propuesta. La evidencia de Gmail muestra **al menos 1 llamada** (Chef & Hotel, 14-ago) y **3
propuestas** (Bernardo, Cortes Zamora 21-ago, Chef & Hotel 15-ago). Ese archivo sigue sin
corregirse y es trabajo de quien lleve el CRM.

## La regla que salió de esto, y aplica a toda secuencia

> **Ninguna conversación se cierra con "quedo atento".** Si el prospecto queda en avisar, el
> próximo paso se agenda igual de este lado. Los dos prospectos más avanzados del embudo (Legal
> Prisma y Chef & Hotel) llevaban 11 y 36 días muertos exactamente por eso: ninguno rechazó,
> ninguno objetó precio. Se quedaron esperando a que el otro volviera.

## Pendientes que no toqué

- **Cortes Zamora** pidió cotización el 20-ago (a los 24 minutos del primer correo), la recibió el
  21-ago, y lleva dos seguimientos genéricos sin respuesta. **El tercero solo sirve si trae algo
  nuevo**: su sitio tenía un error de WordPress y una vulnerabilidad. Hay que volver a mirarlo hoy
  y decirle si sigue roto. No escribirle sin verificar eso primero.
- **Grupo Altum** y **Dentimagen**: diagnóstico enviado, un seguimiento genérico, cero respuesta.
  Decidir entre último toque o cierre con motivo.
- Preguntas 7 a 10 de `pipeline-reconstruccion-preguntas-2026-09-21.md` siguen sin responder
  (Leguía, permiso de caso de Bernardo, SimpleTrust, Camila Rojas/LynMet).
