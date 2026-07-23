# Organigrama — La Oficina de Agentes de SpindleLab

> **Qué es esto.** La "planilla de empleados" de SpindleLab. Cada agente de IA es
> un empleado con **nombre, rol, memoria y carpeta de trabajo** — igual que una
> oficina real, pero cada empleado es una sesión de Claude Code activada por una
> *skill*. Este documento es el único lugar donde se ve la oficina completa de un
> vistazo. Última actualización: 2026-07-23.
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
                        ┌─────────────────────────────┐
                        │  DIRECCIÓN                   │
                        │  Tomás (agente-troncal-       │
                        │  marketing) — el gerente     │
                        │  · dueño del estado compartido│
                        │  · orquesta todos los frentes │
                        └──────────────┬───────────────┘
                                       │
   ┌───────────────┬───────────────┬───┴───────────┬───────────────┬──────────────┐
   │               │               │               │               │              │
┌──┴────────┐ ┌────┴──────┐ ┌──────┴─────┐ ┌───────┴────┐ ┌────────┴───┐ ┌────────┴────┐
│ CAPTACIÓN │ │  VENTAS   │ │  MARCA &   │ │ PAID MEDIA │ │  ENTREGA   │ │ ADMIN &     │
│           │ │           │ │ CONTENIDO  │ │            │ │            │ │ FINANZAS    │
├───────────┤ ├───────────┤ ├────────────┤ ├────────────┤ ├────────────┤ ├─────────────┤
│ Dereck    │ │ Raquel ★  │ │ Cata       │ │ Gonzalo    │ │ Diego      │ │ Monse ○     │
│ (buscar-  │ │ (agente-  │ │ (persona-  │ │ (persona-  │ │ (persona-  │ │ (agente-    │
│  leads)   │ │  crm) NEW │ │  social-   │ │  paid-     │ │  disenador-│ │  finanzas)  │
│           │ │           │ │  media)    │ │  media)    │ │  web)      │ │  VACANTE    │
│ Valen     │ │           │ │            │ │            │ │            │ │             │
│ (mini-    │ │           │ │ Bruno      │ │ Fran       │ │            │ │             │
│  diag-    │ │           │ │ (persona-  │ │ (persona-  │ │            │ │             │
│  nostico) │ │           │ │  director- │ │  meta-ads) │ │            │ │             │
│           │ │           │ │  creativo) │ │            │ │            │ │             │
│ Emilia ★  │ │           │ │            │ │            │ │            │ │             │
│ (agente-  │ │           │ │ Marta ○    │ │            │ │            │ │             │
│  outbound)│ │           │ │ (calendario│ │            │ │            │ │             │
│  NEW      │ │           │ │  editorial)│ │            │ │            │ │             │
│           │ │           │ │  VACANTE   │ │            │ │            │ │             │
└───────────┘ └───────────┘ └────────────┘ └────────────┘ └────────────┘ └─────────────┘

        ┌──────────────────────────────────────────────────────────────┐
        │  SUPERVISIÓN (capa meta, transversal a todo el stack)          │
        │  El Sueño (dream / ~/.motor-agentico) — audita 24h de          │
        │  actividad y prescribe las 4 mejoras de mayor impacto/día.     │
        └──────────────────────────────────────────────────────────────┘

★ = construido en esta pasada (motor de captación)     ○ = vacante priorizada
```

---

## Planilla — todos los empleados

Estado: **✅ trabajando** · **★ nuevo (esta pasada)** · **○ vacante** · **⏸ en pausa**

| Empleado | Depto | Skill (rol) | Carpeta de trabajo | Memoria | Entradas → Salidas | Estado |
|---|---|---|---|---|---|---|
| **Tomás** | Dirección | `agente-troncal-marketing` | `marketing/plan-operativo-90-dias.md`, `marketing/encargos-otras-sesiones/` | `oficina/memoria/tomas-troncal.md` | Reportes de todos los frentes → estado compartido verificado, encargos | ✅ |
| **Dereck** | Captación | `buscar-leads` | `marketing/listas/frente-*.md`, `ventas/leads-*.csv` | `oficina/memoria/dereck-buscar-leads.md` | Frente/ICP → CSV de leads (`nombre,cargo,empresa,email,estado`) | ✅ |
| **Valen** | Captación | `mini-diagnostico` | `marketing/diagnosticos/SPL-DIAG-*/` | `oficina/memoria/valen-mini-diagnostico.md` | Prospecto interesado + URL → diagnóstico 1 pág (48h) | ✅ |
| **Emilia** ★ | Captación | `agente-outbound` | `marketing/outbound/semana-*/` | `oficina/memoria/emilia-outbound.md` | CSV de Dereck → secuencia de emails redactada + tracker (NO envía) | ★ nuevo |
| **Raquel** ★ | Ventas | `agente-crm` | `ventas/pipeline.md`, `ventas/proyectos-en-curso.md` | `oficina/memoria/raquel-crm.md` | Respuestas/avances → CRM al día + follow-ups pendientes | ★ nuevo |
| **Cata** | Marca & Contenido | `persona-social-media` | `marketing/outbound/semana-*/posts-*.md`, RRSS | `oficina/memoria/cata-social.md` | Tema/hallazgo real → post LinkedIn/IG con pase de tono | ✅ |
| **Bruno** | Marca & Contenido | `persona-director-creativo` | assets HTML→PNG por carpeta, Higgsfield | `oficina/memoria/bruno-creativo.md` | Concepto → carrusel/Reel/key visual (1080×1080 / 1080×1920) | ✅ |
| **Marta** ○ | Marca & Contenido | `agente-calendario-editorial` | `marketing/calendario-editorial.md` (a crear) | — | Estrategia mensual → calendario de contenido de ambas cuentas | ○ vacante |
| **Gonzalo** | Paid Media | `persona-paid-media` | Google Ads (navegador) + cron semanal | `oficina/memoria/gonzalo-google-ads.md` | Presupuesto/objetivo → campañas Google (nunca escribe sin OK) | ✅ |
| **Fran** | Paid Media | `persona-meta-ads` | Meta Ads Manager (navegador) | `oficina/memoria/fran-meta-ads.md` | Presupuesto/objetivo → campañas Meta (nunca escribe sin OK) | ✅ |
| **Diego** | Entrega | `persona-disenador-web` | `spindlelab-site/`, sitios de clientes | `oficina/memoria/diego-web.md` | Encargo → sitio/blog publicado (JSON-LD, versionado de assets) | ✅ |
| **Monse** ○ | Admin & Finanzas | `agente-finanzas` | `ventas/cobros.md` (a crear), COTIZACIONES/ | — | Proyecto ganado → seguimiento de cobros/fases/facturación | ○ vacante |
| **El Sueño** | Supervisión | `dream` | `~/.motor-agentico/dreams/` | `state.json` (propio) | 24h de actividad → 4 prescripciones/día | ✅ |

> **Nota sobre Raquel y Emilia (protocolo, importante).** Captación y Ventas son
> dominios que el troncal (Tomás) ya gobierna "directo en su sesión". Por eso
> Raquel (CRM) y Emilia (outbound) **no son escritores paralelos sueltos**: son
> sub-roles que, cuando escriben en `ventas/pipeline.md` o en los trackers de
> `marketing/outbound/`, **siguen el protocolo del troncal** (sincronizar con
> `main` antes de tocar, verificar antes de marcar hecho, PRs chicos). Esto es
> deliberado: evita re-crear la desincronización de julio que motivó todo el
> protocolo. Ver `Reglas de la oficina`.

---

## Los huecos (vacantes priorizadas)

El objetivo declarado es **hacer más sólida la búsqueda de nuevos clientes**. Por
eso el orden de contratación prioriza el embudo de captación → ventas antes que
el resto.

| Prioridad | Vacante | Depto | Por qué duele hoy | Qué destraba |
|---|---|---|---|---|
| **1** | **Emilia** (outbound) ★ | Captación | Dereck genera el CSV de leads pero nadie arma la campaña: los leads se enfrían en un CSV | Convierte leads en secuencia de emails lista para que Ramón apruebe y envíe. **Cubierto en esta pasada.** |
| **2** | **Raquel** (CRM) ★ | Ventas | El pipeline se actualiza a mano y se queda atrás; follow-ups se pierden (ej. permiso de caso de Bernardo sin pedir) | Mantiene el CRM vivo y lista los follow-ups pendientes cada vez. **Cubierto en esta pasada.** |
| 3 | **Marta** (calendario editorial) | Marca & Contenido | Cata y Bruno ejecutan piezas sueltas; falta el calendario que las ordene por mes/tema | Un plan editorial mensual de ambas cuentas del que Cata/Bruno tomen encargos |
| 4 | **Monse** (finanzas) | Admin & Finanzas | Cobros por fase se rastrean a mano en notas del pipeline; ya hubo un error de "Fase 1 cobrada" que no era | Seguimiento de cobros/fases/facturación separado del CRM comercial |

---

## Ruta a ~20 agentes (por fases, no de golpe)

La contadora del post apunta a 20. SpindleLab **no necesita 20 para vender más** —
necesita el embudo completo y sin fugas. La ruta:

**Fase 1 — Cerrar el embudo de captación (AHORA).**
`Dereck → Emilia → Valen → Raquel`. Con esto, un lead entra, recibe secuencia,
pide diagnóstico, y queda trackeado hasta ganar/perder sin que nada se caiga.
*Emilia y Raquel se construyen en esta pasada; el embudo queda cerrado.*

**Fase 2 — Ordenar la fábrica de contenido.**
Contratar a **Marta** (calendario editorial) para que Cata y Bruno dejen de
producir suelto. Agregar variantes: **agente-guionista-reels**, **agente-blog**
(long-form SEO propio) — hoy los artículos los redacta el troncal a mano.

**Fase 3 — Escalar captación.**
**agente-enrichment** (validar/limpiar emails antes de que Emilia secuencie),
**agente-referidos** (activar la red de clientes ganados), un segundo canal de
prospección además de Apollo (LinkedIn Sales Nav / directorios gremiales).

**Fase 4 — Delivery y admin.**
**Monse** (finanzas/cobros), **agente-onboarding-cliente** (kickoff de proyecto
ganado), **agente-reporte-cliente** (informe mensual de resultados a clientes),
**agente-auditoria-tecnica** (el core SEO técnico, hoy dentro de Valen/Diego).

Cada agente nuevo se crea con el protocolo de "abrir un frente nuevo" del troncal:
se fundamenta primero en Dirección, luego se escribe su skill, luego arranca. No
se improvisa una persona en blanco.

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
