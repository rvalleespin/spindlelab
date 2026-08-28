# Organigrama — La Oficina de Agentes de SpindleLab

> **Qué es esto.** La "planilla de empleados" de SpindleLab. Cada agente de IA es
> un empleado con **nombre, rol, memoria y carpeta de trabajo** — igual que una
> oficina real, pero cada empleado es una sesión de Claude Code activada por una
> *skill*. Este documento es el único lugar donde se ve la oficina completa de un
> vistazo. Última actualización: 2026-08-28.
>
> **Nomenclatura híbrida.** Cada agente tiene un nombre humano (para hablar de él
> como "empleado") y, entre paréntesis, la skill técnica real que lo activa. El
> nombre es para la conversación; la skill es la fuente de verdad.
>
> **Coordinación por archivos, no por chat.** Varias sesiones corren en paralelo
> sobre el mismo repo. No se hablan entre sí: se dejan encargos y estado en
> archivos. Las reglas duras de esa coordinación están en `Reglas de la oficina`
> al final. Léelas antes de que dos agentes toquen el mismo documento.

---

## Organigrama

```
DIRECCIÓN
  └─ Tomás (agente-troncal-marketing) — PM / cabeza operadora: de un objetivo → plan → reparte → done · además dueño del estado compartido

CAPTACIÓN           Dereck (buscar-leads) · Valen (mini-diagnostico) · Emilia (agente-outbound) ★
VENTAS              Raquel (agente-crm) ★
MARCA & CONTENIDO   Cata (persona-social-media) · Bruno (persona-director-creativo) · Renata (agente-copywriter) ★ · Marta (agente-calendario-editorial) ★
PAID MEDIA          Gonzalo (persona-paid-media) · Fran (persona-meta-ads)
ENTREGA             Diego (persona-disenador-web) · Simón (agente-seo-aeo) ★  ← el servicio core que se cobra
PRODUCTO & DISEÑO   Nadia (producto-ui-ux) ★ · Pía (agente-growth-producto) ★   (cross-proyecto: Praxi + web)
INTELIGENCIA & DATOS  Marco (agente-inteligencia-mercado) ★ ← mira el mercado ANTES de decidir · Nora (agente-analitica) ★ ← mide qué produjo cada frente DESPUÉS
ADMIN & FINANZAS    Monse (agente-finanzas) ○

SUPERVISIÓN         El Sueño (dream / motor-agentico) — audita 24h y prescribe las 4 mejoras de mayor impacto/día

★ = nuevo (creado en esta ronda)     ○ = vacante priorizada
```

---

## Planilla — todos los empleados

Estado: **✅ trabajando** · **★ nuevo (esta pasada)** · **○ vacante** · **⏸ en pausa**

| Empleado | Depto | Skill (rol) | Carpeta de trabajo | Memoria | Entradas → Salidas | Estado |
|---|---|---|---|---|---|---|
| **Tomás** | Dirección | `agente-troncal-marketing` | `marketing/plan-operativo-90-dias.md`, `marketing/encargos-otras-sesiones/` | `oficina/memoria/tomas-troncal.md` | **PM/cabeza operadora:** objetivo de Ramón → plan + reparte tareas (encargos) + trackea hasta done; además dueño del estado compartido | ✅ |
| **Dereck** | Captación | `buscar-leads` | `marketing/listas/frente-*.md`, `ventas/leads-*.csv` | `oficina/memoria/dereck-buscar-leads.md` | Frente/ICP → CSV de leads (`nombre,cargo,empresa,email,estado`) | ✅ |
| **Valen** | Captación | `mini-diagnostico` | `marketing/diagnosticos/SPL-DIAG-*/` | `oficina/memoria/valen-mini-diagnostico.md` | Prospecto interesado + URL → diagnóstico 1 pág (&lt;24h) | ✅ |
| **Emilia** ★ | Captación | `agente-outbound` | `marketing/outbound/semana-*/` | `oficina/memoria/emilia-outbound.md` | CSV de Dereck → secuencia de emails redactada + tracker (NO envía) | ★ nuevo |
| **Raquel** ★ | Ventas | `agente-crm` | `ventas/pipeline.md`, `ventas/proyectos-en-curso.md` | `oficina/memoria/raquel-crm.md` | Respuestas/avances → CRM al día + follow-ups pendientes | ★ nuevo |
| **Cata** | Marca & Contenido | `persona-social-media` | `marketing/outbound/semana-*/posts-*.md`, RRSS | `oficina/memoria/cata-social.md` | Tema/hallazgo real → post LinkedIn/IG con pase de tono | ✅ |
| **Bruno** | Marca & Contenido | `persona-director-creativo` | assets HTML→PNG por carpeta, Higgsfield | `oficina/memoria/bruno-creativo.md` | Concepto → carrusel/Reel/key visual (1080×1080 / 1080×1920) | ✅ |
| **Renata** ★ | Marca & Contenido | `agente-copywriter` | `marketing/redes/`, `marketing/blog-borradores/` (a crear) | `oficina/memoria/renata-copy.md` (a crear) | Tema → artículo long-form / ad copy / guion de Reel / copy de email (entrega texto, no publica) | ★ nuevo |
| **Marta** ★ | Marca & Contenido | `agente-calendario-editorial` | `marketing/calendario-editorial.md` | `oficina/memoria/marta-calendario.md` | Estrategia mensual → calendario de contenido de ambas cuentas + tandas de revisión humana | ★ nuevo |
| **Gonzalo** | Paid Media | `persona-paid-media` | Google Ads (navegador) + cron semanal | `oficina/memoria/gonzalo-google-ads.md` | Presupuesto/objetivo → campañas Google (nunca escribe sin OK) | ✅ |
| **Fran** | Paid Media | `persona-meta-ads` | Meta Ads Manager (navegador) | `oficina/memoria/fran-meta-ads.md` | Presupuesto/objetivo → campañas Meta (nunca escribe sin OK) | ✅ |
| **Diego** | Entrega | `persona-disenador-web` | `spindlelab-site/`, sitios de clientes | `oficina/memoria/diego-web.md` | Encargo → sitio/blog publicado (JSON-LD, versionado de assets) | ✅ |
| **Simón** ★ | Entrega | `agente-seo-aeo` | `ventas/entregas/<cliente>/`, plugins searchfit | `oficina/memoria/simon-seo-aeo.md` (a crear) | Cliente ganado → auditoría técnica + visibilidad en IA + plan implementado (el servicio core) | ★ nuevo |
| **Marco** ★ | Inteligencia & Datos | `agente-inteligencia-mercado` | `marketing/oficina/inteligencia-mercado/` (clientes); `docs/` del producto (Praxi) | `oficina/memoria/marco-inteligencia-mercado.md` | Decisión cara (precio, posicionamiento, nuevo mercado, competidor) → informe de mercado/competencia (cross-proyecto) | ★ nuevo |
| **Nora** ★ | Inteligencia & Datos | `agente-analitica` | `marketing/reportes/`, GA4 / Search Console | `oficina/memoria/nora-analitica.md` | Actividad de todos los frentes → atribución + reporte mensual (agencia y producto) | ★ nuevo |
| **Nadia** ★ | Producto & Diseño | `producto-ui-ux` | cross-proyecto (Praxi + web SpindleLab); vive **solo en global** | `oficina/memoria/nadia-producto.md` (a crear) | Pantalla/flujo/feature → diseño UI/UX + arquitectura frontend; sistema anti-slop (brand.json + voice.json, gate en CI) | ★ nuevo |
| **Pía** ★ | Producto & Diseño | `agente-growth-producto` | repo del producto (Praxi); `oficina/growth-producto/` | `oficina/memoria/pia-growth.md` (a crear) | Producto → onboarding, activación, lifecycle, retención (cross-proyecto) | ★ nuevo |
| **Monse** ○ | Admin & Finanzas | `agente-finanzas` | `ventas/cobros.md` (a crear), COTIZACIONES/ | — | Proyecto ganado → seguimiento de cobros/fases/facturación | ○ vacante |
| **El Sueño** | Supervisión | `dream` | `~/.motor-agentico/dreams/` | `state.json` (propio) | 24h de actividad → 4 prescripciones/día | ✅ |

> **Nota sobre Nadia (`producto-ui-ux`).** No es un rol de agencia-para-cliente:
> es **oficio de diseño de producto**, y es **cross-proyecto** (la usas en Praxi y
> en el trabajo web de SpindleLab). Por eso vive en `~/.claude/skills/` (global) y
> no en el repo — así la ves desde cualquier proyecto. Las herramientas instaladas
> **`refero-design`** y **`frontend-design`** (metodologías de diseño visual) son
> parte de su caja de herramientas, no empleados.

> **Nota sobre Marco (`agente-inteligencia-mercado`) y Nora.** Forman el par de
> inteligencia: **Marco mira AFUERA** (mercado, competencia, precios, tamaño de la
> torta) *antes* de una decisión cara; **Nora mide ADENTRO** (qué produjo cada
> frente) *después*. Marco es cross-proyecto (sirve a Praxi y a clientes). No
> inventa cifras: cita fuentes; sus hallazgos se contrastan con los datos internos
> de Nora.

> **Nota sobre Raquel y Emilia (protocolo, importante).** Captación y Ventas son
> dominios que el troncal (Tomás) ya gobierna "directo en su sesión". Por eso
> Raquel (CRM) y Emilia (outbound) **no son escritores paralelos sueltos**: son
> sub-roles que, cuando escriben en `ventas/pipeline.md` o en los trackers de
> `marketing/outbound/`, **siguen el protocolo del troncal** (sincronizar con
> `main` antes de tocar, verificar antes de marcar hecho, PRs chicos). Esto es
> deliberado: evita re-crear la desincronización de julio que motivó todo el
> protocolo. Ver `Reglas de la oficina`.

---

## Cobertura del proceso — qué está cubierto y qué falta

Mirando SpindleLab como **agencia de medios/marketing/creativa** *y* como estudio
que **lanza sus propios productos** (Praxi, etc.). ✅ cubierto · ◐ parcial · ○ hueco.

### Cadena de agencia (para clientes)

| Etapa del proceso | Quién lo cubre | Estado |
|---|---|---|
| **Inteligencia de mercado / competencia** | Marco | ✅ ★ |
| Estrategia & media planning | Tomás (orquesta, no planifica medios) | ◐ |
| Prospección | Dereck | ✅ |
| Outbound | Emilia | ✅ |
| Producto de entrada (diagnóstico) | Valen | ✅ |
| Ventas / CRM | Raquel | ✅ |
| Contenido social | Cata | ✅ |
| Calendario editorial | Marta | ✅ ★ |
| Copy long-form / guion / ad copy | Renata | ✅ ★ |
| Creatividad visual | Bruno | ✅ |
| Paid — Google / Meta | Gonzalo / Fran | ✅ |
| **Entrega SEO/AEO (el servicio core)** | Simón | ✅ ★ |
| Entrega web | Diego | ✅ |
| **Medición & analítica / reporte a cliente** | Nora | ✅ ★ |
| Admin / finanzas | Monse | ○ vacante |

### Cadena de producto (lo tuyo — Praxi y lo que saques)

| Etapa del proceso | Quién lo cubre | Estado |
|---|---|---|
| **Inteligencia de mercado / pricing / competencia** | Marco | ✅ ★ |
| Diseño de producto / UX / frontend | Nadia | ✅ |
| Growth / activación / retención / lifecycle | Pía | ✅ ★ |
| Analítica de producto (funnels, cohortes) | Nora | ✅ ★ |
| Marca / voz del producto | Cata + Bruno adaptados | ◐ |

---

## Los puestos que cerraron el proceso (ronda 2026-07-29)

Se construyeron los cuatro puestos de mayor impacto. Cada uno siguió el protocolo
de "abrir un frente nuevo" del troncal: se fundamentó, se escribió la skill, quedó
disponible (repo + global).

| # | Puesto | Skill | Qué cerró | Estado |
|---|---|---|---|---|
| 1 | **Nora — Medición & Analítica** | `agente-analitica` | GA4, atribución, reporte mensual. Cierra el loop: mide qué produjo cada frente. Sirve a agencia **y** a los productos. | ★ construido |
| 2 | **Simón — Entrega SEO/AEO** | `agente-seo-aeo` | La entrega del servicio core al cliente ganado (no solo el diagnóstico de Valen). Apalanca `searchfit`. Es lo que se cobra. | ★ construido |
| 3 | **Renata — Copy & Guion** | `agente-copywriter` | Long-form, ad copy, guiones, email. Descarga a Tomás, que redactaba a mano. | ★ construido |
| 4 | **Pía — Growth de producto** | `agente-growth-producto` | Onboarding, activación, lifecycle, retención de los productos propios (Praxi). | ★ construido |

**Quedan en cola (vacantes ya identificadas):**
- **Monse** (`agente-finanzas`) — cobros por fase separados del CRM (hubo el error "Fase 1 cobrada").

**Contratada el 28-ago-2026:** **Marta** (`agente-calendario-editorial`) — ordena a
Cata/Bruno/Renata por mes y tema; nació con el relanzamiento del motor (su
fundamentación vive en el encargo `relanzamiento-motor-y-cierre-plan-operativo.md`).

**Extras de escala (más adelante):** `agente-enrichment` (limpiar emails antes de
Emilia), `agente-referidos` (activar la red de clientes ganados), `agente-community`
(engagement/DMs), paid en LinkedIn/TikTok.

---

## Reglas de la oficina (léelas antes de tocar algo compartido)

1. **Un solo dueño del estado compartido: Tomás (el troncal).** `plan-operativo-90-dias.md`,
   `ventas/pipeline.md` y los trackers de `marketing/outbound/` los escribe el
   troncal (o un sub-rol que siga su protocolo: Raquel, Emilia). Las personas
   especializadas (Cata, Bruno, Gonzalo, Fran, Diego) **reportan**, no editan esos
   docs directo. Detalle en `.claude/skills/agente-troncal-marketing/SKILL.md`.

2. **Nunca "ya está hecho" sin verificar.** Antes de marcar algo resuelto: leer el
   diff real del commit, o pedir captura/dato del estado externo (LinkedIn, Ads,
   sitio en vivo). Si no calza con lo previo, decirlo y preguntar, no sobrescribir
   en silencio.

3. **Sincronizar con `main` antes de editar un doc compartido:**
   `git fetch origin main` → revisar diff → `git merge` y resolver conflictos
   leyendo ambas versiones. No asumir que la versión propia gana.

4. **Encargos entre empleados van por archivo,** en `marketing/encargos-otras-sesiones/`,
   no "de palabra" entre sesiones.

5. **Regla sagrada de captación: ningún agente envía emails solo.** Dereck produce
   el CSV, Emilia redacta la secuencia y el tracker — **el envío lo aprueba Ramón,
   mensaje por mensaje.**

6. **Memoria de cada empleado** vive en `oficina/memoria/<empleado>.md` (versionada,
   compartida entre sesiones). Es distinta de la memoria de Claude Code por
   proyecto: esta es del repo, la ve cualquier sesión. Cada empleado la actualiza
   con lo que aprendió (gotchas, estado actual, decisiones) al cerrar su trabajo.

7. **Reglas de marca son innegociables** (`marketing/brand/manual-de-marca.md`):
   voz singular/plural, oro escaso (#C9A227, un uso por pieza), cero prueba social
   inventada, prospectos nunca nombrados sin permiso, pase humano antes de publicar.
