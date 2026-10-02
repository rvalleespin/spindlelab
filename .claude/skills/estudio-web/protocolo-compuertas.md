# Protocolo de compuertas — por qué se multiplican las pasadas

> Léelo antes de arrancar una obra. No es teoría: cada causa de abajo produjo una
> reconstrucción completa en este estudio, y cada una se corta con un artefacto
> concreto.

## Las cinco causas, y qué las corta

**1. El encargo llega en prosa y se interpreta.** "Quiero una landing que se vea
profesional" tiene mil lecturas, y el agente elige una. Cada corrección es, en
realidad, el descubrimiento de un requisito que nunca se escribió.
→ **Corte: `brief-de-obra.md`.** Criterios de aceptación verificables mirando el
entregable. "Se vea profesional" no es un criterio; "en el primer viewport el
visitante entiende qué se vende y a quién, sin hacer scroll" sí lo es.

**2. El estilo se aprueba mirando el sitio terminado.** Es la causa más cara y la
más común: la decisión barata (¿me gusta este lenguaje visual?) se toma sobre el
artefacto caro (el sitio completo). Un "no me convence" cuesta una reconstrucción.
→ **Corte: el tablero de estilo.** Una sola pantalla que muestra el lenguaje visual
con contenido real. Rechazarla cuesta minutos.

**3. No hay contrato escrito, así que cada pasada regresa.** Sin spec, la corrección
de la pasada 2 se pierde en la pasada 3, y vuelve el mismo defecto con otra cara.
→ **Corte: `spec-visual.md`.** Tokens con su rol, composición por sección, estados.
Es lo que Diego construye y lo que Javiera audita. Las correcciones se escriben ahí,
no en el chat.

**4. El constructor se califica a sí mismo.** El agente que acaba de escribir el CSS
tiene una explicación para cada decisión, y la explicación lo convence. Lo que llega
a Ramón es la primera revisión real, y por eso llega con defectos.
→ **Corte: Javiera en subagente limpio.** Lee spec + brief + código, no la
conversación. Veredicto por escrito, con lista numerada.

**5. El acuerdo se mueve a mitad de obra.** Una idea nueva en la fase 3 reabre la
fase 1. Legítimo como decisión, carísimo como accidente.
→ **Corte: la regla "lo aprobado no se reabre".** Un cambio de dirección después de
la compuerta 2 se nombra como lo que es: una obra nueva, con su propio encuadre.

## Las dos compuertas

### Compuerta 1 — el brief (una página, texto)
**Qué se aprueba:** objetivo de negocio, a quién le habla, mapa de rutas, jerarquía
de cada página, qué activos reales existen (fotos, datos, casos, permisos), criterios
de aceptación, y la lista explícita de **lo que no se hace**.
**Qué pasa si se salta:** se construye contra una interpretación, y la primera
revisión descubre el requisito faltante.
**Costo de un rechazo acá:** reescribir párrafos.

### Compuerta 2 — la dirección visual (dos tableros, PNG)
**Qué se aprueba:** cuál de **dos** direcciones diferenciadas se construye. Cada una
llega con su referencia dominante nombrada, qué rasgo toma de ella, y qué sacrifica.
**Qué pasa si se salta:** se construye el sitio completo y el juicio estético llega
sobre el artefacto caro. Es exactamente lo que pasó en sep-2026.
**Costo de un rechazo acá:** rehacer un tablero.

### Y nada más
No hay compuerta 3. Entre la fase 2 y la 5 el estudio trabaja solo, y solo sube algo
a Ramón si: (a) Javiera rechaza dos veces y el problema está en la spec o el brief,
(b) aparece una restricción real que invalida el brief (un activo que no existe, un
dato que no se puede publicar), o (c) hace falta gastar plata o enviar algo.

## Qué hace Ramón en cada compuerta (y qué no le toca)

| Compuerta | Decide | No le toca |
|---|---|---|
| 1 · Brief | qué se vende, a quién, qué secciones, qué queda fuera | cómo se implementa |
| 2 · Dirección | cuál de las dos, y si algún rasgo es intocable | tokens, espaciados, breakpoints |

Si en la compuerta 2 la respuesta es "ninguna de las dos", **eso es información
valiosa, no un fracaso**: significa que el lock de referencias apuntó al lugar
equivocado. Se vuelve a `referencias.md`, no al tablero. Rehacer un tablero con las
mismas referencias malas produce el mismo rechazo.

## Formato de un rechazo útil

Un "no me gusta" cuesta otra pasada. Un rechazo útil tiene tres partes, y cualquier
rol del estudio debe pedirlas si no vienen:

1. **Qué específicamente** (la sección, el elemento).
2. **Contra qué** — qué esperabas ver en su lugar, o un ejemplo real.
3. **Si es regla o preferencia** — "esto nunca va en el sitio" se escribe en la spec
   y no vuelve a aparecer; "en esta obra prefiero otra cosa" se resuelve y se olvida.

La parte 3 es la que evita el bucle: una preferencia tratada como regla se convierte
en una corrección que hay que recordar de memoria, y la memoria falla a la pasada
siguiente.
