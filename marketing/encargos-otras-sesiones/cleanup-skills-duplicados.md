# Encargo: consolidar los skills duplicados

**Origen:** sesión `copy-activate-boxes-location` (rama `claude/performance-marketing-agent-file`), 20 jul 2026.
**Para:** sesión troncal / Ramón.
**Estado:** encaminado — falta ejecutar los pasos que tocan `main`, el `~/.claude/skills` global y decidir la versión canónica de `persona-social-media`.

## El problema

Los skills de SpindleLab existen en **4 ubicaciones** y no están sincronizados. Por eso el mismo skill aparece **duplicado** en el menú (`/persona-paid-media` salía dos veces con descripciones distintas).

| Ubicación | ¿Qué es? | ¿Versionado en git? |
|---|---|---|
| `~/.claude/skills/` | **Global** — carga en cualquier carpeta | ❌ No |
| `SPINDLELAB/.claude/skills/` (rama `main`) | Repo, fuente de verdad | ✅ Sí |
| `worktrees/copy-activate-…/` | Rama de esta sesión | ✅ Sí (su rama) |
| `worktrees/metaads-rube-…/` | Rama de otra sesión | ✅ Sí (su rama) |

Dos causas distintas mezcladas:
1. **Duplicación en el menú** = global **y** repo cargan a la vez → todo aparece dos veces.
2. **Deriva de contenido** = distintas ramas/copias tienen versiones distintas del mismo archivo.

## Inventario y versión canónica (verificado 20 jul)

| Skill | Dónde vive | Canónica | Nota |
|---|---|---|---|
| `persona-paid-media` | global + repo + 2 worktrees | **La con acceso a navegador** (global == esta rama, ya arreglada) | ⚠️ `main` todavía tiene la vieja "sin navegador" (difiere 39 líneas). Hay que llevarle la buena. |
| `persona-social-media` | global + repo + worktrees | **`main` working tree (64 líneas, sin commitear)** | ✅ DECIDIDA (20 jul). Es la superset: trae el update de anonimato del 16 jul + regla "tono directo" + la sección nueva "Cuenta personal de Ramón — formato propio (20 jul)". Global (51) y este worktree (51) son subconjuntos viejos. ⚠️ **La otra sesión debe commitearla primero.** |
| `agente-troncal-marketing` | solo `main` | la de `main` | Nueva, no está en ningún otro lado. Conservar. |
| `persona-meta-ads` | solo `main` | la de `main` | Nueva (persona Meta Ads). Conservar. Ojo: dice "sin navegador" — igual que le pasó a paid-media, revisar si aplica actualizarla. |
| `mini-diagnostico` | global + worktrees | idénticas | ⚠️ `main` la tiene **borrada en working tree sin commitear** — confirmar con la otra sesión por qué antes de asumir nada. |
| `persona-disenador-web` | global + worktrees | — | Igual que arriba: `main` la tiene borrada en working tree sin commitear. Verificar. |
| `performance-marketing-agent` | solo esta rama | esta rama | Copia del skill de Adspirer. Nueva, sin commitear. |
| `dream` | solo global | global | **NO es skill del repo** — es rutina personal (escribe a `~/.motor-agentico/`). **Se queda en global.** |

## Target acordado

- **`SPINDLELAB/.claude/skills/` (repo) = única fuente de verdad.** Versionado, viaja con el repo, respaldado en git.
- **`~/.claude/skills/` global = solo `dream`.** Se eliminan de global las copias de los skills del repo (persona-*, mini-diagnostico) una vez que el repo tenga la mejor versión de cada uno.
- Los worktrees convergen solos al rebasar desde `main`.

## Pasos pendientes (en orden)

0. **[otra sesión, primero]** Commitear en `main` la `persona-social-media` del working tree (64 líneas) — es la canónica y hoy está sin commitear. Nada más se puede consolidar hasta que esto ocurra.
1. **[main]** Llevar a `main` la `persona-paid-media` con acceso a navegador (existe en la rama `claude/performance-marketing-agent-file` y en global). Vía merge de esta rama, no copiando a mano.
2. ~~Elegir la `persona-social-media` canónica~~ ✅ HECHO: es la de `main` working tree (ver tabla).
3. **[coordinación]** Confirmar con la otra sesión por qué `main` borró `mini-diagnostico` y `persona-disenador-web` del working tree — **no perderlas**.
4. **[merge]** Mergear a `main` las ramas de features (esta trae `performance-marketing-agent` + la `persona-paid-media` buena).
5. **[APROBADO por Ramón, 20 jul → destructivo]** Con `main` ya conteniendo lo mejor de todo, **borrar de `~/.claude/skills/` las copias** `persona-paid-media`, `persona-social-media`, `persona-disenador-web`, `mini-diagnostico`. **Dejar `dream`.** Ramón ya autorizó este paso; ejecutarlo solo DESPUÉS de que `main` tenga todo (si no, se regresa a las sesiones que corren desde el dir de `main`).
6. Verificar que cada skill aparezca **una sola vez** en el menú.

## Lo ya hecho desde esta sesión

- `persona-paid-media` de esta rama actualizada a la versión con navegador (Punto A del pedido de Ramón).
- Este encargo escrito.
