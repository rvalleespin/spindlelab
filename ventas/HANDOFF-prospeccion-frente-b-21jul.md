# HANDOFF — Prospección clínicas (Frente B + oportunidad médica) · 21 jul 2026

> Para retomar en otra sesión (VS Code). Todo lo hecho aquí con el skill `buscar-leads`.

## 0. Cómo acceder a esto desde VS Code (LEER PRIMERO)

Este trabajo se hizo en un **git worktree**, no en `main`. Los CSV y notas están sin commitear en:

```
CARPETA A ABRIR EN VS CODE:
/Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/.claude/worktrees/chile-dental-clinic-leads-100b3b
Rama: claude/chile-dental-clinic-leads-100b3b
```

- **Si abres OTRA carpeta (ej. el repo en `main`), NO verás estos archivos.** Abre la carpeta de arriba, o pide commitear/mergear esta rama primero.
- **El skill `buscar-leads` y la memoria SÍ son globales** (`~/.claude/skills/buscar-leads/` y `~/.claude/projects/.../memory/`) → la sesión de VS Code ya los tiene, sin hacer nada. El skill quedó afinado esta sesión (Modo A + Modo B, filtro por industria+keyword).

## 1. Cuenta de Apollo (crítico)

- Prospectar SIEMPRE desde **`manuvalleespin@gmail.com`** (Plan Básico, ~**2.357 créditos** restantes). NO `hola@spindlelab.cl` (Gratis). Detalle en memoria `reference_apollo_account`.
- El navegador (Claude in Chrome) usa el Chrome real de Ramón. Si la sesión de Apollo pidió login, Ramón lo resuelve a mano.
- **Regla anti-desync:** NO correr Apollo en dos sesiones a la vez, y NO escribir el mismo CSV desde dos sesiones. Esta sesión ya tocó los archivos de abajo.

## 2. Archivos producidos (fuente de verdad, en `ventas/`)

| Archivo | Qué es | N |
|---|---|---|
| `ventas/contactos-clinicas-dentales-chile.csv` | Dental/estética con email verificado — **lista de envío** (header 6 col: nombre,cargo,empresa,email,ciudad,estado) | **51** |
| `ventas/contactos-clinicas-medicas-chile.csv` | Clínicas médicas de otras especialidades (oftalmología, imagenología, etc.) — **Frente C / oportunidad** | **53** |
| `ventas/frente-b-enriquecido.csv` | Las 35 del Frente B en una vista, cada una con su estado | **35** |
| `marketing/outbound/lote-frente-b-dental-21jul.md` | Borrador lote 1 outbound (email bespoke verificado de Clínica Dental Naran) | 1 |
| `marketing/listas/frente-b-dental-estetica.md` | Lista semilla + notas de cierre del enriquecimiento | — |

## 3. Estado del Frente B (35 clínicas)

- **9 con email** → listas para outbound. 5 decisores fuertes (Zaror, Naran, Terré, Beladent, Estétika Médica) + 4 junior (DentArt, Zenclinic = ortodoncistas posibles dueños; AC Odontología, Red Implantología = clínicos junior).
- **9 con decisor identificado pero SIN email en Apollo** → rastrear el correo a MANO (web/Instagram/formulario): Odontoestética, RD Estudio Dental, EOS, Clínica Volans (dueño Enrique Trucco), Clínica Elements, Blend, Denttored, Cara Bonita, Dermamed.
- **17 sin datos** (no indexadas en Apollo o sin contacto).
- **Aprendizaje:** Apollo cubre mal a las clínicas boutique chicas (~1 de 4 tiene email de decisor).

## 4. Próximos pasos (para la sesión de VS Code)

1. **Rastreo manual de los 9 emails faltantes** (decisor ya identificado, falta el correo). Buscar patrón `nombre@dominio` / `contacto@dominio` en la web/IG de cada clínica. **Verificar antes de dar por bueno; nunca inventar.**
2. **Outbound Frente B:** producir lotes BESPOKE (no mail-merge) con la plantilla F-B de `marketing/plantillas/emails-fase0.md`. Cada toque 1 necesita hallazgo técnico verificado por sitio + prueba de evidencia en ChatGPT (ver ejemplo Naran en el lote borrador). **Respetar rampa: tope 50 emails/semana**, envío a MANO desde `hola@spindlelab.cl` (Gmail web — ojo: el conector de Gmail en sesión apuntaba a la cuenta personal). El skill NUNCA envía.
3. **Frente C (53 clínicas médicas):** ya tienen email verificado. Plantilla F-C existe en `emails-fase0.md`. No mezclar tandas hasta que la anterior esté fuera (calentamiento de dominio).
4. **Marcar catch-all para 2ª ola** en cualquier envío (varias filas ya vienen marcadas en el `estado`).

## 5. Pendiente de decisión de Ramón
- ¿Commitear esta rama para que otra sesión la vea sin abrir el worktree? (push necesita GitHub Desktop, no Bash).
- ¿Crear `ventas/pipeline-prospeccion.md` (playbook de prospección que el skill referencia y aún no existe)?
