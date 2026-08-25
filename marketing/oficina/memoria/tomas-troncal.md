# Memoria — Tomás (agente-troncal-marketing)

> **25-ago-2026 — Cierre de sesión duplicada.** Esta rama de troncal
> (`claude/spindlelab-marketing-strategy-v98w8h`, sesión `session_01CUMYJajNAYeF3gUddWmigQ`)
> se cierra porque Ramón confirmó que hay **otra sesión con la skill `agente-troncal-marketing`
> activa** y prefiere dejar esa como la única. Motivo: el protocolo de este mismo documento
> ("un solo dueño del estado compartido") ya se rompió dos veces por tener dos troncales en
> paralelo — el commit huérfano del 5-ago (`79ed5d3`, nunca mergeado, reconciliado a mano el
> 10-ago) y, el 25-ago, dos sesiones trabajando el mismo encargo de Google Ads (`alinear-plazo-anuncio-google-ads.md`)
> al mismo tiempo. Todo lo de esta sesión está commiteado y pusheado a `main` vía PRs
> normales — no hay trabajo suelto que se pierda. Ver "Estado al cierre" más abajo para lo
> que queda abierto y debe recogerlo la sesión que continúa.

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

## Estado al cierre (25-ago-2026, para quien retome)
- **`plan-operativo-90-dias.md` en `main` está desactualizado** — esta sesión lo mantuvo al
  día en su propia rama (`claude/spindlelab-marketing-strategy-v98w8h`, sin mergear vía PR
  todavía). Antes de seguir editándolo, comparar esa rama contra `main` y traer lo que falte
  (reconciliación del 10-ago, corrección de Meta Ads, cobro de Bernardo).
- **Bernardo Combeau: cobro completo** ($392.000, Fase 3 el 14-jul + Fases 1+5 el 28-jul,
  confirmado por Ramón pero sin comprobante bancario adjunto). Único pendiente real: pedir
  permiso de caso público, sigue sin pedirse.
- **Outbound Frente B: 16 correos (7+9) llevan ~1 mes redactados sin registro de envío** en
  `outbound/semana-03/lote-frente-b-2026-07-25/envios.csv` (todo en `Listo`/`Redactado`). Ramón
  dijo en un momento que ya se habían enviado, pero nunca llegó el detalle (qué tandas, qué
  respuestas) para actualizar el tracker — quedó sin cerrar.
- **Frente C:** Ramón mencionó "se envía esta semana" (10-ago) pero el único lote de Frente C
  registrado (5 contactos) ya se había enviado completo el 14-jul — nunca se aclaró si se
  refería a follow-ups, una ampliación nueva, o confusión con Frente B.
- **Encargo de Ads sin cerrar de este lado:** `alinear-plazo-anuncio-google-ads.md` (24-ago,
  alinear el copy del anuncio de Google Ads de "48h" a "24 horas"). Otra sesión ya lo estaba
  trabajando en paralelo el 25-ago (rama `claude/jolly-fermi-f2799a`) — verificar si lo cerró
  antes de retomarlo.
- **Revisión semanal de Ads (Gonzalo):** quedó a medio camino dos viernes seguidos (10-ago y
  21-ago) esperando una captura de pantalla de la cuenta `597-527-6690` que nunca llegó.
- **Dos triggers automáticos** (`SpindleLab — checklist diario`, 9:00 hora UTC L-V; `SpindleLab
  — revisión semanal Google Ads`, viernes 9:30 UTC) estaban atados a esta sesión
  (`session_01CUMYJajNAYeF3gUddWmigQ`) — repuntarlos a la sesión que continúa (o dejarlos
  aquí si esta sesión no se archiva) para que no queden huérfanos.

## Protocolo para abrir un empleado nuevo
1. Fundamentar el rol acá (Dirección): por qué, para qué frente, con qué criterio.
2. Escribir su skill en `.claude/skills/<skill>/SKILL.md` (no en blanco).
3. Crear su memoria en `oficina/memoria/`.
4. Registrarlo en el organigrama y en el plan operativo.
