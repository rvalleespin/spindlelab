# Laboratorio

Ideas de ingreso **fuera de la agencia y fuera de Praxi**, que usan el oficio de Ramón pero
no son SpindleLab. Nacieron el 3-sep-2026, cuando pidió explícitamente separar este frente.

**Qué NO es:** no es marketing de la agencia (eso vive en `marketing/`), no es entrega a
clientes (eso vive en `ventas/`), y no es producto propio ya existente (Praxi vive en su
propio repo).

**El filtro para que una idea entre acá:**
1. **Necesidad forzada**, no aspiracional. Idealmente con fecha límite o con una obligación
   detrás. Si hay que crear la demanda, no entra.
2. **Usa el oficio que ya existe** (web, código, datos estructurados, agentes). Si hay que
   aprender un oficio nuevo, no entra.
3. **Costo de atención semanal declarado.** Montar es barato; sostener es lo que compite con
   la agencia. Si no se puede estimar, no entra.

**Regla del registro:** cada idea anota qué se probó, qué pasó y cuándo se decidió matarla.
Una idea sin fecha de revisión es una idea que va a seguir dando vueltas en la cabeza.

## Dónde se trabaja: la rama `laboratorio/ideas`

**Todo el trabajo del laboratorio vive en la rama `laboratorio/ideas`**, no en `main`
(decisión de Ramón, 3-sep-2026). El motivo es que las ideas nuevas no se enreden con las
secciones de la agencia, que tienen su propio ritmo y sus propias sesiones.

**Las tres reglas de esa rama:**

1. **Sale de `main` y vuelve a traer de `main`.** Una rama larga que nunca sincroniza se
   desvía y después explota en conflictos. Al empezar cualquier sesión del laboratorio:
   `git fetch origin main && git merge origin/main`. Es barato y evita el problema entero.
2. **A `main` se fusiona solo cuando una idea gradúa** — es decir, cuando deja de ser
   exploración y pasa a ser algo que la operación necesita saber (un servicio que se vende,
   una herramienta publicada, una decisión que afecta a la agencia). La exploración se queda
   acá.
3. **Un proyecto grande puede abrir su propia rama** a partir de esta
   (`laboratorio/ley-21719`, etc.) y volver acá al cerrar. Por eso la rama tiene forma de
   namespace y no se llama solo `laboratorio`.

Y antes de dar cualquier cosa por cerrada: **`git ls-remote --heads origin`**, para ver si
otra sesión está tocando lo mismo. Ya pasó dos veces en este repo.

> **Si una idea se convierte en negocio de verdad**, con su marca, su dominio y sus clientes,
> deja de tener sentido que viva acá: se muda a su propio repositorio, como Praxi. La rama es
> para incubar, no para alojar una empresa.

## Cómo se trabaja: partes en paralelo + una troncal

Decisión de Ramón (10-sep-2026), después de que el proyecto 01 creciera hasta tener sitio
desplegado, rediseños y un PR fusionado en otro repo: **el laboratorio se opera igual que la
oficina de marketing**, porque el problema es el mismo — varias sesiones tocando lo mismo sin
verse entre ellas.

**Las sesiones de parte** hacen **una** cosa puntual y acotada (una verificación, una landing,
un rediseño, un sondeo). Trabajan en la rama del proyecto (`laboratorio/<proyecto>`), no en
`laboratorio/ideas`. Al terminar **escriben una fila en el registro del brief** con lo que
hicieron, con qué lo verificaron y qué quedó pendiente. No dan nada por cerrado sin evidencia.

**La sesión troncal** hace lo que ninguna sesión de parte puede hacer:
- **Revisa coherencia.** Que el sitio, el brief, los encargos y lo que está en vivo digan lo
  mismo. Las partes optimizan su pedazo; nadie mira el conjunto.
- **Persigue lo pegado.** Lo que aparece tres veces en el registro y nunca se cierra (hoy:
  reconectar Cloudflare Pages por dashboard, el post de Cata, el Figma de referencia).
- **Es la única que fusiona a `laboratorio/ideas`** y la única que escribe el estado
  consolidado.
- **Verifica antes de registrar.** Si una parte dice "ya está", se lee el diff o se pide
  evidencia externa (una URL que responda, una captura). Es la misma regla que existe en
  `marketing/` y que nació de un incidente real.

**Antes de cerrar cualquier cosa: `git ls-remote --heads origin`.** Ya hubo dos episodios de
sesiones trabajando lo mismo en paralelo sin saberlo.

**Lo que la troncal NO hace:** el trabajo fino de cada parte. Si se pone a rediseñar, deja de
mirar el conjunto y el rol se pierde.

## Estado

El [estado consolidado](estado-consolidado.md) es lo que escribe la sesión troncal: qué está
verificado en vivo, dónde lo escrito no calza con lo desplegado, y los encargos abiertos para
las sesiones de parte. Última revisión: **9-sep-2026**.

## Herramientas

| Herramienta | Para qué | Estado |
|---|---|---|
| [El radar](herramientas/radar-de-ideas.md) | Detectar ideas: dónde mirar, qué preguntar, cómo verificar y cuándo descartar | **v1 sin probar** |

## Proyectos

| # | Proyecto | Estado | Umbral / fecha |
|---|---|---|---|
| 01 | [Cumplimiento web Ley 21.719](01-cumplimiento-ley-21719/brief.md) | vivo — `verificaycumple.pages.dev`, enlace cruzado en ambas direcciones | **1-dic-2026** (entrada en vigencia) |
