# Memoria — Tomás (agente-troncal-marketing)

**Rol:** El gerente. Único dueño del estado compartido; orquesta todos los frentes.
**Carpeta de trabajo:** `marketing/plan-operativo-90-dias.md`,
`marketing/encargos-otras-sesiones/`
**Skill:** .claude/skills/agente-troncal-marketing/SKILL.md

## Estado actual
- **2026-08-22 — Sitio v2 pulido (Diego + Renata).** Coherencia de menú interno↔home,
  transiciones de página, revisión completa de copy en voz de Renata (sin tells de IA),
  y **decisión de servicios**: separadas Redes y Paid para que no se pisen —
  **Redes = todo lo social** (LinkedIn + Meta, orgánico + pauta social);
  **Paid Media = SOLO Google** (búsqueda de alta intención). La pauta de IG/FB vive en
  Redes; Google Ads en Paid. Encoded en fichas/hub/home/schema para que copy y ads no
  vuelvan a mezclarlo. Memoria nueva: `diego-web.md`.
- **2026-08-04 — Sitio nuevo (v2 Astro) EN VIVO en `spindlelab.cl`.** Mapa completo en
  `marketing/estado-del-sitio-nuevo.md` (leer eso primero). Resumen: bajada del estudio
  de mercado → estrategia "Mostramos, no prometemos". Cambios shipeados: "Método Spindle",
  3 pilares con Acompañamiento líder + autoridad de entidad, Desarrollo Web a cross-sell,
  sección Evidencia, blog+servicios migrados preservando las 14 URLs (cero soft-404),
  404 real, Blog en el menú. Nuevos docs: estudio (`inteligencia-mercado/`), plan
  (`plan-reposicionamiento-2026-08.md`), encargos (`reposicionamiento-*`, `migracion-*`),
  skill nueva **Marco** (`agente-inteligencia-mercado`).
- **Deploy del sitio:** Cloudflare Pages, proyecto **`spindlelab-v2`** sirve `spindlelab.cl`
  (construye `spindlelab-astro/`). Mergear a `main` = publicar. El proyecto viejo
  `spindlelab` quedó sin dominios (rollback).
- 2026-07-23 — Oficina reorganizada como organigrama (ver `oficina/organigrama-oficina.md`).
  Motor de captación cerrado: se sumaron **Emilia** (outbound) y **Raquel** (CRM).
  Vacantes priorizadas siguientes: **Marta** (calendario editorial), **Monse** (finanzas).

## Aprendido a pulso (gotchas)
- **La desincronización de julio** (17-20 jul): dos sesiones editaron
  `plan-operativo` y los posts de LinkedIn en paralelo sin coordinarse → registro
  contradictorio (un post marcado en cuenta de empresa cuando salió en la personal).
  De ahí nace el protocolo: un solo dueño del estado, verificar antes de marcar,
  sincronizar con `main` antes de tocar.
- `git push` desde Bash: falla en algunas sesiones (Keychain) → GitHub Desktop; pero
  el **2026-08-04 SÍ funcionó** desde Bash en la sesión local — probar antes de asumir.
- **Sesiones paralelas sobre el MISMO encargo = lío.** El 2026-08-04 dos sesiones
  hicieron el mismo reposicionamiento del sitio en dos ramas distintas; hubo que
  comparar diffs y reconciliar. Regla: paralelo solo entre **frentes distintos**.
- **Cloudflare del sitio:** dos proyectos Pages (`spindlelab` viejo, `spindlelab-v2`
  nuevo). Mover un dominio entre proyectos exige quitarlo del viejo primero (Cloudflare
  no lo mueve solo) → hay un parpadeo de minutos; es reversible.
- GitHub Desktop auto-stashea todo al cambiar de rama; hay un stash viejo que **no
  se debe hacer `pop`** (re-agregaría `bernardo-site/`, `RRSS/` eliminados a propósito).
- **2026-08-22 — Workflow local + sueño del Mac = agentes colgados.** Un Workflow de
  fondo perdió 3/7 agentes por "computer went to sleep" mid-response. Antes de un
  workflow largo en la sesión local: `caffeinate -i -t <seg>` en background.
  Resume-from-runId recupera solo los agentes fallidos (los OK vuelven de caché) — barato.

## Pendientes que dejé
- [ ] Registrar en `plan-operativo-90-dias.md` la creación de Emilia y Raquel
- [ ] Fundamentar el frente de **Marta** (calendario editorial) antes de crear su skill

## Protocolo para abrir un empleado nuevo
1. Fundamentar el rol acá (Dirección): por qué, para qué frente, con qué criterio.
2. Escribir su skill en `.claude/skills/<skill>/SKILL.md` (no en blanco).
3. Crear su memoria en `oficina/memoria/`.
4. Registrarlo en el organigrama y en el plan operativo.

- 2026-08-31 (noche) — **Skill robustecida por decisión de Ramón** (optó por fortalecer al
  troncal en vez de crear un rol coordinador aparte): se sumaron al oficio la canonización
  de decisiones en el mismo turno (fecha + porqué + revisión), la verificación de DATOS y
  no solo reportes (`git log -- <ruta>`; dos rescates del mismo worktree lo respaldan), la
  vista única de decisión para los pases, y el matiz del insumo compartido que destraba a
  varios roles. Contexto de la jornada: `marketing/encargos-otras-sesiones/coordinacion-cierre-31ago.md`.
  Recuerda: una skill editada solo aparece en sesiones NUEVAS.

- 2026-09-01 (regla nueva, de un enojo justificado de Ramón) — **UN archivo por pieza, cero
  cadenas la mañana de publicar.** El jue 3 la pieza estaba lista pero el copy quedó repartido
  entre un publicar.md con advertencias, un copy viejo "de respaldo" y un encargo a otra sesión:
  Ramón llegó a publicar y no había texto que pegar. Reglas: (1) el `publicar.md` del día es LA
  única fuente y jamás guarda copys viejos adentro (git es el respaldo); (2) si a las 20:00 del
  día anterior falta el copy de una pieza aprobada, la coordinación LO ESCRIBE (deadline mata
  cadena de especialistas) y el especialista refina el molde después; (3) las advertencias de
  "documento a medio actualizar" se resuelven el mismo día, nunca se heredan a la mañana siguiente.
