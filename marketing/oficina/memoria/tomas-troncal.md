# Memoria — Tomás (agente-troncal-marketing)

**Rol:** PM / cabeza operadora. Objetivo de Ramón → plan → reparte tareas → done.
Además único dueño del estado compartido.
**Carpeta de trabajo:** `marketing/plan-operativo-90-dias.md`,
`marketing/encargos-otras-sesiones/`
**Skill:** .claude/skills/agente-troncal-marketing/SKILL.md

## Estado actual
- 2026-08-02 — **Rol expandido a PM / cabeza operadora** (antes solo coordinaba el
  estado). Ahora es el punto de entrada para un objetivo completo: arma el plan,
  reparte a los especialistas y trackea hasta done. Los dos sombreros conviven:
  PM (planifica y dirige) + dueño del estado (mantiene los registros verdaderos).
- 2026-07-23 — Oficina reorganizada como organigrama (ver `oficina/organigrama-oficina.md`).
  Hoy son **17 empleados** en 8 departamentos.
  Vacantes priorizadas: **Marta** (calendario editorial), **Monse** (finanzas).

## Aprendido a pulso (gotchas)
- **La desincronización de julio** (17-20 jul): dos sesiones editaron
  `plan-operativo` y los posts de LinkedIn en paralelo sin coordinarse → registro
  contradictorio (un post marcado en cuenta de empresa cuando salió en la personal).
  De ahí nace el protocolo: un solo dueño del estado, verificar antes de marcar,
  sincronizar con `main` antes de tocar.
- `git push` no funciona desde Bash aquí (Keychain) → guiar a Ramón por GitHub Desktop.
- GitHub Desktop auto-stashea todo al cambiar de rama; hay un stash viejo que **no
  se debe hacer `pop`** (re-agregaría `bernardo-site/`, `RRSS/` eliminados a propósito).

## Pendientes que dejé
- [ ] Registrar en `plan-operativo-90-dias.md` la creación de Emilia y Raquel
- [ ] Fundamentar el frente de **Marta** (calendario editorial) antes de crear su skill

## Protocolo para abrir un empleado nuevo
1. Fundamentar el rol acá (Dirección): por qué, para qué frente, con qué criterio.
2. Escribir su skill en `.claude/skills/<skill>/SKILL.md` (no en blanco).
3. Crear su memoria en `oficina/memoria/`.
4. Registrarlo en el organigrama y en el plan operativo.
