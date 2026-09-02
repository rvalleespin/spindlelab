# Skills en reserva

Skills que **existen y están completas**, pero que hoy no pasan el filtro de las 3R
(repetible / requisito / repartible) porque **todavía no tienen un caso real que ejecutar**.
Salieron de `.claude/skills/` el **1-sep-2026** tras el análisis en
`marketing/oficina/analisis-borrar-skills-2026-09-01.md`.

**No están borradas ni obsoletas: están esperando su primer encargo real.**

## Por qué se archivaron

El costo de dejarlas cargadas no es el contexto (~200 palabras de descripción entre las
tres). Es el **sesgo**: una skill que aparece en el índice se invoca, y arrastra
criterios escritos antes de tener un solo caso real con el que calibrarlos. Es preferible
reactivarlas contra un caso concreto y corregirlas con lo aprendido en él.

| Skill | Rol | Se reactiva cuando |
|---|---|---|
| `agente-analitica` | Nora — medición y atribución | Haya una propiedad con datos suficientes que reportar (su memoria dice "sin reportes propios aún"). Hoy la conversión ancla existe pero no hay volumen. |
| `agente-growth-producto` | Pía — growth de producto propio | Se trabaje de verdad el onboarding/activación de **Praxi** — que vive en su propio repo, con su `CLAUDE.md` y su marca. |
| `frontend-design` | (importada) | Nunca, salvo que se quiera adaptar a la marca. Es la única que no se escribió acá (viene con `LICENSE.txt`, está en inglés) **y ya viene como skill nativa de la sesión**: estaba duplicada. |

## Cómo reactivar una

1. `git mv marketing/oficina/skills-en-reserva/<skill> .claude/skills/<skill>`
2. Releerla contra el caso real que la despertó y corregir lo que no calce (fue escrita
   sin ningún caso).
3. **Abrir una sesión nueva**: las skills se escanean al arrancar, `/clear` no las
   re-escanea.
4. En el Mac, borrar además la copia en `~/.claude/skills/<skill>` al archivar, y
   re-copiar al reactivar. La copia global no se entera de este `git mv`; el repo es la
   fuente de verdad.

## Sincronizar el Mac con esta poda (1-sep-2026)

Una sesión cloud **no puede tocar** `~/.claude/skills/` del Mac: hay que correrlo a mano
allá, con el repo ya actualizado (`git pull` primero, o se copian las versiones viejas).

```bash
cd ~/.claude/skills

# 1. borrar las tres que pasaron a reserva
rm -rf agente-analitica agente-growth-producto frontend-design

# 2. copiar la nueva de voz + las que cambiaron en la pasada anti-hobbling
REPO=~/Library/Mobile\ Documents/com~apple~CloudDocs/SPINDLELAB   # ajustar si la ruta cambió
for s in voz-spindlelab persona-social-media persona-director-creativo \
         persona-disenador-web agente-troncal-marketing agente-copywriter; do
  rm -rf "$s" && cp -R "$REPO/.claude/skills/$s" .
done
```

Después, **sesión nueva**: las skills se escanean al arrancar y `/clear` no las re-escanea.

## Lo que NO se archivó, y por qué

`agente-seo-aeo` (Simón) entró a esta carpeta y **volvió a `.claude/skills/` el mismo día**.
Su memoria dice "sin entregas propias aún", pero eso está desactualizado: el 22-ago produjo
la **auditoría SEO/AEO completa del sitio de la casa**
(`marketing/encargos-otras-sesiones/auditoria-seo-sitio-2026-08.md`). Además guarda el
diferencial que vende el negocio (visibilidad en IA, el límite "no soy Valen", `searchfit`)
y se reparte a Diego por encargo: pasa **requisito** y **repartible**. Solo falla
*repetible*, y el filtro archiva lo que no pasa **ninguna** de las tres.

**Pendiente derivado:** corregir la línea "sin entregas propias aún" en
`marketing/oficina/memoria/simon-seo-aeo.md`.

## Memorias

Las memorias de estos roles **se quedan donde están** (`marketing/oficina/memoria/`) y el
organigrama los sigue listando: el rol existe en la oficina, lo que está en pausa es su
manual.
