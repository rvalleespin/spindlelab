# ¿Aplicamos el "borra tus skills"? — análisis 1-sep-2026

**Fuente:** video de Benjamín Cordero, *"Por qué borré todas mis skills de Claude Code"*
(https://www.youtube.com/watch?v=4dM3N43_xAI, canal @bencord, ~30 min), que comenta la
entrevista de **Boris Cherny** (creador de Claude Code) en Y Combinator.

**Veredicto corto: NO aplicar el titular. SÍ aplicar tres de sus partes.**

---

## 1. Qué plantea el video

1. Al salir Opus 5, Anthropic borró **el 80% del system prompt** de Claude Code. Método:
   **ablación** (borrar todo y devolver línea por línea midiendo qué aporta cada una).
2. Boris, textual: *"cada 6 meses borra tu CLAUDE.md, borra tus skills, borra tus hooks,
   mira qué hace el modelo"*, y para Opus 5 lo recomienda directamente.
3. **Hobbling** (trabar al caballo): cuando le decimos al modelo *cómo* razonar, lo
   desviamos de caminos mejores. El error más común de los usuarios son instrucciones
   demasiado específicas: paso 1, paso 2, paso 3.
4. **El prompting nuevo son tres piezas:** tarea + guardrails + criterio de término.
   Un guardrail no es un paso ("abre el archivo y edita la línea 12" es un paso;
   "no toques la base de datos" es un guardrail). El criterio de término es la pieza
   que casi nadie escribe.
5. **Filtro de las 3R** para decidir qué skill sobrevive:
   - **Repetible** — ¿haces esa tarea *igual* más de 3 veces al mes?
   - **Requisito** — ¿tiene adentro un dato que el modelo no puede adivinar (tu tono,
     tu marca, una ruta de carpetas)?
   - **Repartible** — ¿se la pasarías a otra persona/sesión para que corra el mismo proceso?
6. De sus 26 skills, **17 eran descargadas de internet y murieron todas**; sobrevivieron
   las 9 propias. El único que no dudó en conservar es **el de su tono de voz, hecho con
   cientos de ejemplos reales suyos** — el que menos parece un skill porque no tiene pasos,
   es puro contexto.
7. Cierre: no sobreingenierizar. La habilidad ya no es prompt engineering sino
   **darle una tarea difícil y una forma de verificarse solo**.

## 2. Nuestro contexto real (verificado en el repo, no de memoria)

| Dato | Él | Nosotros |
|---|---|---|
| Nº de skills | 41 (26 + 15 de plugins) | **17** |
| Origen | 17 de 26 descargadas | **16 de 17 escritas acá**; solo `frontend-design` viene de fuera (trae `LICENSE.txt`, está en inglés) |
| Antigüedad | acumuladas desde febrero, para modelos viejos | **creadas el 25-ago-2026**, hace una semana (`git log --diff-filter=A`) |
| Contexto siempre cargado | 2.095 palabras | **1.107 palabras** de frontmatter (los cuerpos, 19.368 palabras, solo se cargan al invocar) |

El disparador del consejo es "llevas 6 meses acumulando para un modelo que ya no existe".
**Ese reloj acá ni siquiera partió.** Borrar ahora sería tirar trabajo de una semana
escrito ya para el modelo actual.

Además, acá los skills no son solo ayudas de prompting: son **el protocolo de coordinación
entre sesiones que corren en entornos distintos** (nube y Mac local). Ese protocolo existe
por el incidente del 17-20 jul, cuando dos sesiones editaron el plan y un tracker en
paralelo y dejaron un registro contradictorio. Eso es exactamente lo que Boris llamaría un
guardrail, no un paso.

## 3. Qué sí pasa el filtro de las 3R y qué no

**Pasan holgado (requisito + repartible):** las reglas de marca (guion largo prohibido,
dorado escaso, singular vs. plural por cuenta), las rutas y fichas de cliente, las
decisiones ya tomadas (Metricool manual, el 0/15 no se publica, semana 11 intocable),
los límites de rol. Nada de eso lo puede adivinar el modelo.

**No pasan hoy (fallan la R de repetible: no se han usado ni una vez):**
- `agente-analitica` — su memoria dice "sin reportes propios aún"; no hay cliente con GA4 medible.
- `agente-growth-producto` — "sin primer flujo de onboarding"; Praxi vive en otro repo con su propio `CLAUDE.md`.
- `agente-seo-aeo` — "sin entregas propias aún"; **no hay ningún cliente ganado de SEO/AEO** (el único ganado es Bernardo Combeau, Desarrollo Web).
- `frontend-design` — la única importada, en inglés, y **ya viene como skill nativa de la sesión**: está duplicada.

**Riesgo real de dejarlas:** no es el gasto de contexto (son ~250 palabras entre las cuatro),
es el sesgo. Una skill que existe se invoca, y arrastra criterios escritos antes de tener
un solo caso real.

## 4. Decisión

1. **No** borrar CLAUDE.md ni el grueso de los skills. Reevaluar por **evento**
   (próximo modelo mayor), no por calendario.
2. **Sí** archivar las cuatro sin tracción a una carpeta de reserva, con nota de por qué,
   para reactivarlas cuando exista el caso real (primer cliente SEO ganado, primer reporte,
   primer flujo de Praxi).
3. **Sí** hacer la pasada anti-hobbling en las skills que sí se usan a diario
   (`persona-social-media`, `persona-director-creativo`, `persona-disenador-web`,
   `agente-troncal-marketing`): convertir los bloques "Método 1..5" en **guardrails +
   criterio de término**, y conservar las líneas de "carga la ficha X" (eso es ruteo de
   contexto, no micromanagement: evita errores concretos que ya nos costaron caro).
4. **Sí, y es lo de mayor palanca:** construir la skill de **voz con ejemplos reales**
   —lo único que él no dudó en conservar—. Hoy el tono está escrito como reglas; ya
   tenemos piezas publicadas de verdad (`marketing/redes/posts-agosto/`,
   `marketing/redes/2026-09-septiembre/`) para hacerla con ejemplos.
5. **Sí** adoptar en el uso diario el prompt de tres piezas (tarea + guardrail + criterio
   de término) en vez de dictar pasos. Cuesta cero y es donde está la mayor parte del valor
   del video.

## 5. Lo que el video no ve y acá pesa

- Sus skills eran **muletas de prompting**; varias de las nuestras son **memoria operativa
  compartida** entre sesiones que no se ven entre sí. Borrarlas no libera al modelo:
  rompe la coordinación.
- Reglas como "cero prueba social inventada" o "no nombrar un prospecto sin permiso" no
  son hobbling. Son exactamente los guardrails que el propio Boris dice que hay que dejar.
