# Estado del sitio nuevo (v2) — mapa para no perderse

> **Para qué es esto.** Ramón abre varias sesiones de Claude en paralelo y se pierde
> entre ellas. Este documento es el **mapa único** del sitio nuevo: qué pasó, quién
> lo hizo, qué está en vivo, cómo se publica y qué falta. Si vuelves confundido,
> **lee esto primero.** Última actualización: 2026-08-04.

## En una frase
El sitio nuevo (**Astro v2**) **ya está publicado y en vivo en `spindlelab.cl`**, como bajada del estudio de mercado → estrategia *"Mostramos, no prometemos"*.

## De dónde salió (el hilo)
1. **Estudio de mercado** de la ola de "agencias con IA" → conclusión: SpindleLab apunta bien; comunicar *"mostramos, no prometemos"*, bajar Desarrollo Web de pilar, ponerle nombre al método. (`marketing/inteligencia-mercado/2026-08-estudio-agencias-ia.md`)
2. **Plan de reposicionamiento** con ese eje. (`marketing/plan-reposicionamiento-2026-08.md`)
3. **Ejecución en el sitio** = lo que sigue.

## Quién hizo qué (importante para no confundirse)
- **Esta sesión (troncal / coordinador):** hizo el estudio, el plan, coordinó los encargos, **verificó** todo y guió el go-live. **No** programó el sitio (salvo un detalle: el enlace "Blog" del menú).
- **Sesiones de `persona-disenador-web` (que abrió Ramón):** escribieron el código del sitio, siguiendo los encargos de `marketing/encargos-otras-sesiones/`.
- **Ramón:** aprobó el plan, eligió "Método Spindle", dio las luces verdes, hizo los *merge* en GitHub y el cambio de dominio en Cloudflare.

## Qué cambió en el sitio (todo en vivo y verificado)
- **"Método Spindle"** (antes se llamaba "Método Señal").
- **3 pilares** liderados por **Acompañamiento Mensual** (con "autoridad de entidad" como capa estratégica); **Desarrollo Web** bajó a **cross-sell** (ya no es pilar ni tiene badge "Nuevo"), pero su página sigue existiendo.
- **Sección "Evidencia"** ("Mostramos, no prometemos") con protocolo de medición y un slot honesto para el primer caso real (sin prueba social inventada).
- **Simulación de ChatGPT** con etiqueta explícita de "ejemplo ilustrativo".
- **Blog + páginas de servicio migrados** al v2 preservando las **14 URLs** indexadas (cero soft-404, el blog "El Taller" intacto = motor AEO). **404 real** y **sitemap con 14 URLs**.
- **Enlace "Blog" en el menú** (escritorio y móvil).

## Cómo se publica ahora (deploy)
- Hay **dos proyectos en Cloudflare Pages**, ambos conectados al repo `rvalleespin/spindlelab`:
  - **`spindlelab-v2`** → es el que **sirve `spindlelab.cl` y `www`** (el sitio nuevo). Construye la carpeta `spindlelab-astro/`.
  - **`spindlelab`** (el viejo) → quedó **sin dominios** (los movimos). Se deja por ahora como respaldo/rollback; se puede borrar más adelante.
- **Publicar un cambio = mergear a `main`.** Cloudflare reconstruye `spindlelab-v2` solo y en ~1-2 min sale en vivo en `spindlelab.cl`.

## Reglas de coordinación (para no repetir líos)
- **Un solo troncal** escribe el estado compartido (`plan-operativo`, este mapa). Las sesiones especializadas **reportan**, no editan.
- **Verificar antes de marcar hecho:** leer el diff real / curl-ear el sitio en vivo. No aceptar "ya está" sin evidencia.
- **Sesiones en paralelo = frentes DISTINTOS** (sitio, redes, gráficas). **Nunca el mismo encargo en dos sesiones** — ya pasó (dos sesiones hicieron el mismo reposicionamiento y hubo que reconciliar dos ramas).

## Pendientes (no urgentes)
- [ ] **Coherencia visual** home (oscura) ↔ páginas internas migradas (claras "Papel"). Funciona y es SEO-safe; unificar es tarea de diseño aparte.
- [ ] Opcional: **borrar el proyecto viejo `spindlelab`** en Cloudflare cuando haya confianza (mantiene rollback mientras exista).
- [ ] Frentes de **redes** (Cata) y **gráficas** (Bruno) del reposicionamiento: encargos listos en `marketing/encargos-otras-sesiones/`, aún por ejecutar.

## Archivos clave
- Estudio: `marketing/inteligencia-mercado/2026-08-estudio-agencias-ia.md`
- Plan: `marketing/plan-reposicionamiento-2026-08.md`
- Encargos: `marketing/encargos-otras-sesiones/reposicionamiento-*.md` y `migracion-blog-servicios-v2.md`
- Código del sitio: `spindlelab-astro/`
