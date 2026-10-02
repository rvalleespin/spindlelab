---
name: estudio-web
description: El Estudio Web — equipo de 5 roles que construye un sitio, una landing o un rediseño de una sola pasada, con dos compuertas de aprobación y una revisión crítica independiente antes de que el cliente lo vea. Úsalo cuando haya que crear, rediseñar o rematar un sitio o una landing (propia o de cliente), o cuando una página "quedó genérica" y hay que arreglarla con criterio. Orquesta el encuadre, la dirección de arte, el copy de interfaz, la construcción, el SEO y el QA anti-slop.
---

# El Estudio Web

Un equipo, no un ejecutor. La diferencia no es cuántos agentes hay: es **dónde se
gasta el criterio de quien aprueba**. Un sitio construido por un solo agente a partir
de un párrafo de instrucciones se corrige mirando el sitio terminado, y cada
corrección cuesta una reconstrucción completa. Este estudio mueve esas decisiones
hacia adelante, cuando todavía son baratas.

**La promesa concreta: dos compuertas para ti, el resto es interno.** Apruebas una
página de brief y eliges una dirección visual mirando un tablero. Después de eso
nadie te pregunta nada hasta que el trabajo pasó una revisión que intenta rechazarlo.

Si no conoces el protocolo, lee `protocolo-compuertas.md` en esta carpeta **antes de
arrancar**: explica por qué se multiplican las pasadas y qué artefacto corta cada
causa. `antislop-web.md` es el detector que corre el QA — y que conviene leer antes
de escribir, no después.

## Quién es quién

| Rol | Empleado | Skill | Qué produce |
|---|---|---|---|
| Encuadre y cierre | **Mauro** | `/web-encuadre` | `brief-de-obra.md`: objetivo, mapa de rutas, jerarquía por página, activos reales, criterios de aceptación y **lo que no se hace** |
| Dirección de arte | **Lucía** | `/web-direccion-arte` | `referencias.md` (lock de referencias reales) + 2 direcciones diferenciadas como **tablero de estilo** renderizado + `spec-visual.md` |
| Copy de interfaz | **Clara** | `/web-copy-interfaz` | Headline, subhead, CTA, labels, estados vacíos, 404, formularios — en la voz del sitio |
| Construcción | **Diego** | `/persona-disenador-web` | El código contra la spec, con `desvios.md` de lo que se apartó y por qué |
| Revisión crítica | **Javiera** | `/web-qa-critico` | `acta-qa.md`: veredicto Aprobado / Con reparos / **Rechazado** + lista numerada de defectos |
| Señales (SEO/AEO) | **Simón** | `/agente-seo-aeo` | La capa de JSON-LD, metas y enlazado que debe existir — **diseñada en la fase 1**, no parchada al final |

Metodología de diseño: `refero-design` es la caja de herramientas de Lucía (research
obligatorio antes de diseñar), no un empleado. La voz la da `voz-spindlelab` cuando la
obra es de la casa; si es de un cliente, manda el contrato de marca de su ficha.

## Triaje: no toda tarea es una obra

Correr el pipeline completo para cambiar un título es burocracia, y la burocracia se
abandona. Clasifica primero:

- **Obra** — sitio nuevo, rediseño, landing nueva, o cualquier página con composición
  propia → **pipeline completo, 2 compuertas.**
- **Pulido** — una sección existente que no convence ("el hero quedó plano") →
  Lucía hace spec de **esa** sección (con referencias, igual) → Diego → Javiera.
  Una compuerta: el tablero de esa sección.
- **Encargo** — copy, un post nuevo, un bug, un valor, un alt → **Diego directo**, y
  cierra con el pase express de Javiera (anti-slop + render + enlaces). Sin compuertas.

Si dudas entre obra y pulido, es obra. El costo de encuadrar de más son 20 minutos;
el de encuadrar de menos son tres reconstrucciones.

## El pipeline

```
FASE 0 · ENCUADRE           Mauro      → brief-de-obra.md
                                          ⇩ COMPUERTA 1 — Ramón aprueba el brief
FASE 1 · DIRECCIÓN          Lucía      → referencias.md + 2 tableros (PNG 1440 y 390)
         (en paralelo)      Clara      → copy real de las secciones del tablero
                            Simón      → senales.md (JSON-LD, metas, enlazado)
                                          ⇩ COMPUERTA 2 — Ramón elige UNA dirección
FASE 2 · ESPECIFICACIÓN     Lucía      → spec-visual.md (tokens con rol + composición)
FASE 3 · CONSTRUCCIÓN       Diego      → código + desvios.md
FASE 4 · REVISIÓN           Javiera    → acta-qa.md   (interno · máx. 2 rondas)
FASE 5 · ENTREGA            Mauro      → capturas, pendientes, memorias al día
```

### Cómo se corre de verdad

1. **Fase 0** — invoca `/web-encuadre`. Mauro hace **todas** sus preguntas de una vez
   (máximo 5, bloqueantes nada más) y deja el brief escrito. No se avanza sin el OK.
2. **Fase 1 en paralelo, en subagentes.** Tres `Agent` en un mismo mensaje: uno que
   invoque `/web-direccion-arte`, uno `/web-copy-interfaz`, uno `/agente-seo-aeo`.
   Lucía necesita el copy real de Clara para que el tablero no mienta, así que si van
   en paralelo, Clara entrega primero el bloque del hero y Lucía lo usa; si eso
   complica, corre Clara → Lucía en serie y Simón en paralelo.
3. **Compuerta 2** — se presentan las dos direcciones con su PNG, su referencia
   dominante y qué sacrifica cada una. **No tres.** Dos direcciones distintas obligan
   a elegir; tres se promedian y el promedio es exactamente el slop.
4. **Fase 3** — Diego construye contra la spec. Lo que no está en la spec no se
   inventa: se anota en `desvios.md` y se resuelve.
5. **Fase 4 — la regla mecánica que sostiene todo esto: Javiera corre en un subagente
   limpio.** Un `Agent` nuevo, que lee la spec, el brief y el código, y **no** vio la
   conversación donde se construyó. Un revisor que escuchó las justificaciones del
   constructor ya está contaminado: aprueba lo que entiende en vez de lo que se ve.
   Rechazado → vuelve a Diego con la lista numerada. Dos rondas internas como máximo;
   a la tercera el problema es la spec o el brief, y eso sube a Ramón con diagnóstico.
6. **Fase 5** — Mauro cierra: capturas, qué quedó pendiente, memorias actualizadas.

## Reglas de la obra (no se negocian)

1. **Lo aprobado no se reabre.** Una dirección elegida en la compuerta 2 no se cambia
   a mitad de construcción porque "se me ocurrió otra cosa": eso es empezar una obra
   nueva, y se dice así. Las pasadas se multiplican cuando el acuerdo se mueve.
2. **Nada se construye sin spec, y nada se spec-ea sin referencia real.** Una
   descripción de estilo ("moderno, limpio, profesional") no es una referencia: sale
   plana aunque la paleta esté bien pensada. Está documentado a golpes acá mismo.
3. **El constructor no se aprueba a sí mismo.** El veredicto lo da Javiera en contexto
   limpio, y lo da por escrito.
4. **Cero relleno en cualquier etapa.** Ni `lorem ipsum`, ni cifras inventadas, ni
   logos de clientes que no son clientes, ni testimonios, ni "equipo de expertos"
   cuando el equipo es una persona. Un dato sin respaldo es un pasivo legal y de
   credibilidad, no un detalle de diseño.
5. **Render o no existe.** Ninguna fase afirma que algo "se ve bien" sin haberlo
   mirado renderizado en Chromium headless, a 390 y a 1440 como mínimo.
6. **Una obra, una rama.** `claude/<obra>`, commits con mensaje real, push al terminar
   cada fase. Deploy a `main` solo con OK explícito de Ramón en ese mismo turno.
7. **Si el sitio es de otra sesión, no se toca su repo:** la obra se entrega como
   encargo en `marketing/encargos-otras-sesiones/` (protocolo de la oficina).

## Dónde viven los artefactos

Una carpeta por obra, en `marketing/oficina/obras-web/<cliente>-<obra>/`:

```
brief-de-obra.md     referencias.md       senales.md
copy-secciones.md    spec-visual.md       desvios.md
acta-qa.md           tableros/            capturas/
```

Las plantillas de los tres documentos de control están en `plantillas/` de esta
carpeta. El código vive en el repo del sitio, nunca acá.

## Criterio de término de la obra

- [ ] Brief aprobado (compuerta 1) y dirección elegida (compuerta 2), ambas por escrito.
- [ ] `spec-visual.md` existe y el código se puede auditar contra ella punto por punto.
- [ ] `acta-qa.md` con veredicto Aprobado, firmado en contexto limpio.
- [ ] Detector anti-slop corrido entero, sin ítems abiertos sin justificación escrita.
- [ ] Capa de señales presente en cada página nueva (JSON-LD, metas, canonical, OG).
- [ ] Render verificado a 390 / 768 / 1440 con capturas guardadas.
- [ ] Contenido real, cero relleno, cero prueba social inventada.
- [ ] Memorias de los roles que participaron, actualizadas con lo aprendido.

## Aprendido a golpes (principio + respaldo)

> ✅ **Principio:** *el criterio de quien aprueba es el recurso escaso de una obra web;
> gastarlo en el sitio terminado es lo que produce "varias pasadas". Se gasta en un
> brief de una página y en un tablero de estilo, donde una corrección cuesta minutos.*
> **Respaldo:** SpindleLab, sep-2026 — tres direcciones para verificaycumple.pages.dev
> rechazadas recién al verlas construidas ("muy básico", "super cloud").

> ✅ **Principio:** *dos direcciones diferenciadas obligan a elegir; tres se promedian,
> y el promedio de referencias fuertes es justamente el diseño que huele a IA.*
> **Respaldo:** `refero-design/references/anti-ai-slop.md`, tell #7 (reference
> averaging), confirmado en la misma obra de sep-2026.

> ✅ **Principio:** *el revisor que escuchó al constructor aprueba lo que entiende, no
> lo que se ve. La independencia del QA no es una actitud, es un contexto separado.*
> **Respaldo:** SpindleLab, oct-2026 — decisión de diseño de este estudio: hasta
> entonces el constructor se aprobaba a sí mismo y la primera revisión real la hacía
> Ramón, que es por qué el trabajo le llegaba con defectos.
