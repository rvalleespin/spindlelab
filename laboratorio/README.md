# Laboratorio

**Qué es esta rama:** el orquestador de las ideas de ingreso de Ramón. Las ideas **nacen,
se evalúan, se auditan y se lanzan** desde acá. Cada una se trabaja en su propia sesión y su
propia rama — pero esta rama es la que sabe en qué etapa está cada una, qué falta para que
pase a la siguiente, y cuál hay que matar.

Son ideas **fuera de la agencia y fuera de Praxi**, que usan el oficio de Ramón pero no son
SpindleLab. Nacieron el 3-sep-2026, cuando pidió explícitamente separar este frente.

**El propósito es monetizar**, no explorar. Una idea que está viva y no tiene nada que se
pueda comprar no está lanzada: está a medio camino (ver la etapa 4 del pipeline).

**Qué NO es:** no es marketing de la agencia (eso vive en `marketing/`), no es entrega a
clientes (eso vive en `ventas/`), y no es producto propio ya existente (Praxi vive en su
propio repo).

## El filtro para que una idea entre

1. **Necesidad forzada**, no aspiracional. Idealmente con fecha límite o con una obligación
   detrás. Si hay que crear la demanda, no entra.
2. **Usa el oficio que ya existe** (web, código, datos estructurados, agentes). Si hay que
   aprender un oficio nuevo, no entra.
3. **Costo de atención semanal declarado.** Montar es barato; sostener es lo que compite con
   la agencia. Si no se puede estimar, no entra.

**Regla del registro:** cada idea anota qué se probó, qué pasó y cuándo se decidió matarla.
Una idea sin fecha de revisión es una idea que va a seguir dando vueltas en la cabeza.

---

## El pipeline y sus compuertas

Una idea no avanza porque alguien trabajó en ella. Avanza cuando pasa la compuerta. Las
compuertas existen para que el laboratorio no acumule proyectos vivos que no cobran.

| # | Etapa | Qué significa | **Compuerta para pasar a la siguiente** |
|---|---|---|---|
| 1 | **Nace** | Está en el tablero con su carpeta y su brief abierto | Pasa los tres filtros de arriba — **incluido el costo de atención semanal, con número** — y tiene fecha de revisión |
| 2 | **Evalúa** | Se comprueba si es verdad y si se puede hacer | Los hechos contrastados contra **fuente primaria** (no blogs); la factibilidad medida contra la arquitectura real que existe; y **la ruta de ingreso escrita**: qué se cobra, a quién, cuánto. Sin ruta de ingreso no pasa |
| 3 | **Audita** | La troncal compara lo escrito contra lo que existe | Cada afirmación con su evidencia externa — una URL que responde, un diff leído, una captura. Ninguna sesión declara algo hecho sin eso |
| 4 | **Lanza** | Está en manos de alguien que no seas tú | Tres cosas a la vez: **está vivo y verificable**, hay **algo que se puede comprar**, y hay **un canal de distribución activo**. Con una sola de las tres, la idea está *a medias*, no lanzada |
| — | **Gradúa** | Dejó de ser exploración | Se fusiona a `main` si la operación necesita saberlo, y si tiene marca, dominio y clientes propios **se muda a su propio repositorio**, como Praxi. La rama es para incubar, no para alojar una empresa |
| — | **Muere** | Se decidió matarla | Fecha y motivo en el registro de su brief. Sin eso, no está muerta: sigue dando vueltas |

## El tablero

| # | Idea | Etapa | Ruta de ingreso | Fecha que manda | Costo de atención semanal | Rama |
|---|---|---|---|---|---|---|
| 01 | [Cumplimiento web Ley 21.719](01-cumplimiento-ley-21719/brief.md) | **4 — lanzada a medias** | Kit de implementación **$149.000 + IVA, una vez** (precio decidido 9-sep, **sin construir**) | **1-dic-2026** — 82 días | **sin declarar** (incumple el filtro 3) | `laboratorio/ley-21719` — *y es la rama de producción* |

**Cómo leer la fila 01:** el gancho gratuito está vivo y verificado
(`verificaycumple.pages.dev`), con enlace cruzado en las dos direcciones. Pero **no hay nada
que se pueda comprar** — el kit tiene precio decidido y cero construido — y **no hay canal
activo** — el post lleva una semana pegado. Dos de las tres condiciones de la etapa 4 están
abiertas, con 82 días de ventana. Eso, y no el diseño, es lo que decide si la idea monetiza.

El detalle verificado y lo que hay que hacer: [estado consolidado](estado-consolidado.md) ·
[encargos abiertos](encargos.md).

---

## Cómo se trabaja: partes en paralelo + una troncal

Decisión de Ramón (10-sep-2026), después de que el proyecto 01 creciera hasta tener sitio
desplegado, tres rediseños y un PR fusionado en otro repo: **el laboratorio se opera igual que
la oficina de marketing**, porque el problema es el mismo — varias sesiones tocando lo mismo
sin verse entre ellas.

**Las sesiones de parte** hacen **una** cosa puntual y acotada (una verificación, una landing,
un rediseño, un sondeo). Trabajan en la rama del proyecto (`laboratorio/<proyecto>`), no en
`laboratorio/ideas`. Al terminar **escriben una fila en el registro del brief** con lo que
hicieron, con qué lo verificaron y qué quedó pendiente — **y la commitean**. Una fila que se
queda en el árbol de trabajo no existe para nadie más (pasó el 9-sep). No dan nada por cerrado
sin evidencia.

**La sesión troncal** hace lo que ninguna sesión de parte puede hacer:
- **Mueve las compuertas.** Es la que dice en qué etapa está cada idea y qué falta. Ninguna
  parte puede promover su propio proyecto de etapa.
- **Revisa coherencia.** Que el sitio, el brief, los encargos y lo que está en vivo digan lo
  mismo. Las partes optimizan su pedazo; nadie mira el conjunto.
- **Persigue lo pegado.** Lo que aparece tres veces en el registro y nunca se cierra.
- **Es la única que fusiona a `laboratorio/ideas`** y la única que escribe el estado
  consolidado y mantiene [`encargos.md`](encargos.md).
- **Verifica antes de registrar.** Si una parte dice "ya está", se lee el diff o se pide
  evidencia externa (una URL que responda, una captura). Es la misma regla que existe en
  `marketing/` y que nació de un incidente real.

**Lo que la troncal NO hace:** el trabajo fino de cada parte. Si se pone a rediseñar, deja de
mirar el conjunto y el rol se pierde.

## La rama: `laboratorio/ideas`

**Todo el trabajo del laboratorio vive en la rama `laboratorio/ideas`**, no en `main`
(decisión de Ramón, 3-sep-2026). El motivo es que las ideas nuevas no se enreden con las
secciones de la agencia, que tienen su propio ritmo y sus propias sesiones.

1. **Sale de `main` y vuelve a traer de `main`.** Una rama larga que nunca sincroniza se
   desvía y después explota en conflictos. Al empezar cualquier sesión del laboratorio:
   `git fetch origin main && git merge origin/main`. Es barato y evita el problema entero.
2. **A `main` se fusiona solo cuando una idea gradúa** — cuando deja de ser exploración y pasa
   a ser algo que la operación necesita saber (un servicio que se vende, una herramienta
   publicada, una decisión que afecta a la agencia). La exploración se queda acá.
3. **Un proyecto grande puede abrir su propia rama** a partir de esta
   (`laboratorio/ley-21719`, etc.) y volver acá al cerrar. Por eso la rama tiene forma de
   namespace y no se llama solo `laboratorio`.

Y antes de dar cualquier cosa por cerrada: **`git ls-remote --heads origin`**, para ver si otra
sesión está tocando lo mismo. Ya pasó tres veces en este repo.

## Riesgos de coordinación conocidos (verificados el 10-sep-2026)

Estos tres no son teóricos: cada uno ya mordió una vez.

- **La rama de un proyecto puede ser la rama de producción.** Cloudflare Pages construye
  `verificaycumple` desde `laboratorio/ley-21719`. Cerrarla con el movimiento normal de la
  regla 3 —fusionar y borrar— **apaga el sitio**. Antes de retirar la rama de un proyecto,
  comprobar qué se despliega desde ella.
- **El clon que `CLAUDE.md` manda usar no existe en la máquina.** `CLAUDE.md:37` dice que el
  clon bueno es `~/Projects/spindlelab` y que la copia de iCloud está corrupta. Verificado el
  10-sep: **`~/Projects/spindlelab` no existe**, y la copia de iCloud pasa `git fsck` limpia
  (solo objetos colgantes normales). O sea: los encargos que dicen "hazlo desde el clon bueno"
  apuntan a un lugar que no está. Hay que resolverlo antes de mandar trabajo ahí (ver E8).
- **El trabajo sin commitear se pierde de vista.** El 9-sep, tres filas del registro y una
  ficha de venta completa quedaron solo en el árbol de trabajo. Nadie más las veía. Commitear
  es parte de terminar.

## Herramientas

| Herramienta | Para qué | Estado |
|---|---|---|
| [El radar](herramientas/radar-de-ideas.md) | Detectar ideas: dónde mirar, qué preguntar, cómo verificar y cuándo descartar | **v1 sin probar** — nunca se ha usado para hacer nacer una idea |
