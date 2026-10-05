# Memoria de la oficina

La tercera pata del modelo "empleado" (rol + **memoria** + carpeta de trabajo).
Cada agente tiene aquí un archivo `<empleado>.md` con lo que ha aprendido: estado
actual, gotchas, decisiones tomadas, cuentas/credenciales-referencia. Es memoria
**del repo** (versionada, la ve cualquier sesión) — distinta de la memoria de
Claude Code por proyecto.

## Reglas

- **Un archivo por empleado**, nombre `<nombre>-<skill>.md` (ej. `dereck-buscar-leads.md`).
- Cada empleado **actualiza su propia memoria al cerrar su trabajo**: qué cambió,
  qué aprendió, qué dejó pendiente. Frases cortas, con fecha.
- **No duplicar lo que ya está en la skill** (eso es el rol) ni en el manual de
  marca. Aquí va lo vivo y lo aprendido a pulso.
- **No fabricar estado.** Si algo no se sabe, se deja como `— (pendiente)`.

## Plantilla para un empleado nuevo

```markdown
# Memoria — <Nombre> (<skill>)

**Rol:** <una línea>
**Carpeta de trabajo:** <ruta(s)>
**Skill:** .claude/skills/<skill>/SKILL.md

## Estado actual
- <fecha> — <dónde está parado su trabajo>

## Aprendido a pulso (gotchas)
- <lección con fecha>

## Cuentas / referencias
- <credencial-referencia, sin secretos>

## Pendientes que dejé
- [ ] <algo para la próxima sesión>
```
