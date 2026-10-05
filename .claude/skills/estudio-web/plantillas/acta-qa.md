# Acta de QA — <cliente> · <obra> · ronda <n>

> La escribe Javiera (`/web-qa-critico`) en **contexto limpio**: leyó el brief, la
> spec y el código; no vio la conversación donde se construyó. Veredicto por escrito.

**Fecha:** · **Rama/commit auditado:** · **Rondas previas:**

## Veredicto
**APROBADO** / **APROBADO CON REPAROS** / **RECHAZADO**

Una línea de por qué. Si es "con reparos", qué reparo queda abierto y con qué plazo.

## Cómo se verificó
Capturas a 390 / 768 / 1440 (rutas), navegador y binario usado, mediciones hechas
(contraste, `scrollWidth`, peso, prioridad de red del hero), JSON-LD parseado.

## Defectos (numerados, reproducibles, accionables)
| # | Severidad | Dónde | Qué está mal | Contra qué (brief/spec/detector) | Cómo se reproduce |
|---|---|---|---|---|---|
| 1 | bloqueante / mayor / menor | | | | |

- **Bloqueante:** no puede verse el cliente ni Ramón así.
- **Mayor:** se ve, pero el entregable no cumple el criterio de aceptación.
- **Menor:** se arregla en esta ronda si no cuesta, o se anota como pendiente.

## Cumplimiento del brief
Criterio de aceptación por criterio de aceptación: cumple / no cumple / no verificable
(y por qué no es verificable, que suele ser defecto del criterio, no del trabajo).

## Cumplimiento de la spec
Desvíos encontrados que **no** están en `desvios.md`. Un desvío no declarado es un
defecto mayor: rompe la auditabilidad de la obra.

## Detector anti-slop
El checklist de cierre de `antislop-web.md` §E, completo, más el de
`refero-design/references/anti-ai-slop.md`. Ítem abierto sin justificación escrita =
defecto.

## Pruebas de fuego
Logo tapado · rubro cambiado · leído en voz alta. Qué pasó en cada una.

## Lo que está bien (y conviene no perder en la corrección)
Dos o tres cosas. No es cortesía: evita que la ronda siguiente borre lo que
funcionaba.
