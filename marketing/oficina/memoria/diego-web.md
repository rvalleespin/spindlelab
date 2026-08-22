# Memoria — Diego (persona-disenador-web)

**Rol:** Diseño y desarrollo web: el sitio propio (`spindlelab-astro`) y sitios de clientes.
**Carpeta de trabajo:** `spindlelab-astro/`, repos de clientes (p. ej. PORTAFOLIO)
**Skill:** .claude/skills/persona-disenador-web/SKILL.md

## Estado actual
- **2026-08-22 — Sitio v2 (Astro) pulido y en vivo.** Rondas de esta sesión:
  coherencia menú interno↔home, transiciones de página (cross-document view
  transitions), OG image al tema oscuro, carga de video en móvil, foto real de
  Ramón en Nosotros, revisión de copy (con Renata) y **separación de servicios
  Redes vs Paid**. Deploy = merge a `main` (Cloudflare `spindlelab-v2` construye
  `spindlelab-astro/`).

## Aprendido a pulso (gotchas)
- **Dos árboles conviven.** El home son componentes Astro (`src/components/*.astro`,
  Tailwind compilado con CSS hasheado); las páginas internas son HTML estático en
  `public/` que comparten UN `public/assets/css/style.css`. Un cambio de nav/estilo
  casi siempre hay que hacerlo en LOS DOS lados (y el footer está duplicado:
  `Footer.astro` + footer embebido en cada estática).
- **Igualar el nav interno al home: medir, no mirar.** Las diferencias eran sutiles
  y solo se ven midiendo valores computados: logo 21px vs home 20/24px; base del
  cuerpo 15px vs 16px; la **barra translúcida al scroll faltaba** en las internas
  (home tiene `#nav.scrolled`; hubo que agregar `.site-header.scrolled` + un JS que
  togglea la clase en `scrollY>24`); el breakpoint de la píldora difiere (home
  lg=1024px, estáticas 681px).
- **Cache-bust obligatorio.** Al editar `style.css`, subir `?v=N` en las 16 páginas
  (sweep con sed/python) o se sirve el CSS viejo.
- **Headless Chrome a 390px miente:** reporta overflow horizontal falso (artefacto
  de clamping de `--window-size`). Verificar móvil real con el navegador in-app
  (`document.documentElement.clientWidth==390`, scrollWidth==clientWidth) antes de
  reportar un bug de overflow.
- **getComputedStyle en el navegador in-app (WebKit)** reporta mal el fondo de
  `.scrolled` como transparente aunque la regla exista; confiar en enumeración
  CSSOM + un screenshot visual, no en ese valor.
- **Deploy sin `gh`.** El CLI `gh` NO está instalado en la sesión local. Merge a
  main = local `git merge --no-ff <rama>` + `git push origin <tmp>:main` (equivale
  al merge del PR, sin squash). `git push` desde Bash SÍ funcionó esta sesión.

## Con quién trabajo
- Copy me lo pasa **Renata** (marcado para revisión humana). SEO técnico me lo
  encarga **Simón** vía `marketing/encargos-otras-sesiones/`.

## Pendientes que dejé
- [ ] meta description de `/servicios/visibilidad-en-ia/` aún dice "Optimización
  AEO/GEO" (metadata SEO, no rótulo visible); alinear si se quiere.
- [ ] Slot de "caso real con datos" en la home, reservado hasta que un cliente dé permiso.
