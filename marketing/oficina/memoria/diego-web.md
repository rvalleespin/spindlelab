# Memoria — Diego (persona-disenador-web)

**Rol:** Diseño y desarrollo web: el sitio propio (`spindlelab-astro`) y sitios de clientes.
**Carpeta de trabajo:** `spindlelab-astro/`, repos de clientes (p. ej. PORTAFOLIO)
**Skill:** .claude/skills/persona-disenador-web/SKILL.md

## Estado actual
- **2026-09-03 — CORRECCIÓN sobre la entrada de más abajo: mi rama quedó
  superseded, no es la troncal.** Al terminar, Ramón detectó (y yo verifiqué con
  `git ls-remote`) que **otra sesión** — con su propio git identity, casi seguro su
  sesión local en el Mac — había trabajado la misma Parte 1 en paralelo, en la rama
  `claude/revision-parte-1-correcciones` de `rvalleespin/bernardo-combeau`, empujada
  ANTES que la mía. Comparé ambas rama-a-rama: en lo mecánico (años, rename de los 2
  slugs) convergimos en el mismo resultado exacto. Pero la de ellos es más completa:
  **encontraron el root-cause real del punto 5 (`inputtedWidth`)** que yo descarté
  ("no existe en el repo" — cierto para el string literal, pero es un artefacto que
  el adaptador `@astrojs/vercel` inyecta en runtime cuando el `width` de `<Image>` no
  está en su lista de anchos válidos; `width={800}`, que usé sin tocar, es la causa
  real, y ellos lo corrigieron en 8 componentes que yo no vi, incluyendo `/estudio`,
  `/modelo` y los índices de Retratos/Proyectos). También agregaron `llms.txt` y
  midieron LCP con throttling móvil real, más riguroso que mi medición en localhost.
  **Decisión (confirmada por Ramón):** `claude/revision-parte-1-correcciones` queda
  como la rama troncal del proyecto Bernardo para este trabajo. Mi rama
  `claude/parte-1-correcciones-sitio` queda sin usar — no se mezcla, no se sigue
  trabajando sobre ella. Lección para la próxima: antes de dar un encargo por
  cerrado en un repo de cliente, correr `git ls-remote --heads origin` para ver si
  otra sesión ya está (o ya estuvo) tocando el mismo repo — no asumo que soy la
  única sesión trabajando ahí solo porque a mí me llegó el encargo.

- **2026-09-03 — Bernardo Combeau (repo separado `rvalleespin/bernardo-combeau`),
  Parte 1 del encargo hecha (ver corrección arriba: esta rama quedó superseded).**
  Encargo en
  `marketing/encargos-otras-sesiones/revision-sitio-bernardo-combeau.md`, ejecutado en
  rama `claude/parte-1-correcciones-sitio` de ese repo (push hecho, sin PR — no se pidió
  explícitamente). Diff real, no solo la lista del encargo: varios ítems del encargo no
  calzaban 1:1 con el código fuente (el propio encargo lo advertía: se escribió leyendo
  el sitio en vivo, no el repo), así que verifiqué cada punto contra el contenido real
  antes de tocar nada.
  - **Alts vacíos/genéricos:** no eran 5 imágenes con `alt="."` sino 9 (`.` literal en
    4 portadas + las 5 fotos de "El músico"), más ~15 alts numéricos/dash ("1", "-") en
    "Juanjo", "Psycho" y "Autoretrato". Los reescribí todos viendo la foto real (Read
    de cada jpg) para que la descripción fuera precisa, no genérica de relleno.
  - **Los "2 placeholders publicados"** resultaron ser dos entradas con **contenido real**
    detrás de un slug de placeholder: `/proyectos/aquí-estoy-creando-algo-nuevo` era el
    proyecto real "La caída" (5 fotos, sesión con flash), y `/retratos/nombre-de-la-serie`
    era "Actores" (5 retratos reales). Las renombré a `/proyectos/la-caida` y
    `/retratos/actores` con redirect 301 desde ambas rutas viejas en `astro.config.mjs`
    (y actualicé el destino final de los redirects heredados de `/series` que ya
    apuntaban ahí) — no las despublicé, porque no eran huecos vacíos.
  - **El descalce de "La caída"** (alt "de cuando salgo un domingo") era justamente el
    cover de esa misma entrada renombrada — se corrigió con la nueva rama de alts reales.
  - **`inputtedWidth="800"`:** no existe en el repo actual — no había nada que corregir;
    lo dejé anotado en vez de inventar un fix.
  - **Hero con lazy:** no estaba en el código como atributo explícito — es el default de
    `<Image>` de Astro cuando no se especifica `loading`. Confirmé el efecto real con
    Chromium headless + CDP: sin el fix, Chrome asigna `initialPriority: "Low"` a la
    request de la imagen (se sube a "High" recién con un pase posterior del
    IntersectionObserver); con `loading="eager" fetchpriority="high"` explícitos, la
    prioridad es "High" desde la primera request. El LCP en ms crudo no mostró diferencia
    clara en localhost (sin latencia real de por medio) — la señal correcta acá es la
    prioridad de red, no el número de LCP en un entorno sin contención.
  - **JSON-LD:** cero en todo el sitio, confirmado. Agregué un grafo `Person` +
    `LocalBusiness` (con `@id` compartido) en `Layout.astro`, que sale en TODAS las
    páginas — datos reales de `contacto.json`/`estudio.json`/`sobremi.json`, nada
    inventado (dirección: solo lo que Bernardo escribió, "El Golf, Las Condes", sin
    inventar un número de calle). Además, `ImageObject` por cada foto real de cada
    galería en las páginas de detalle de retratos/proyectos.
  - **Encontré un bug adicional no listado en el encargo** (mismo patrón que el ítem 1):
    `sobremi.json.parrafo2` era literalmente `"."`, renderizado tal cual en la página
    Sobre-mí. Lo vacié y agregué un guard en `sobre-mi.astro` (mismo patrón que ya usa
    el código para `publication.name` con `hasRealPublication`).
  - Verificado con `astro dev --background` + Chromium headless (`/opt/pw-browsers`):
    render de home/Retratos/Proyectos/detalle en desktop y mobile, `document.documentElement
    .scrollWidth == clientWidth` en las 3 rutas a 390px (sin scroll horizontal real —
    ver nota de más abajo sobre el falso positivo de screenshot a ventana fija), JSON-LD
    parseado con Python, y `astro build` de producción sin errores.
  - No toqué Parte 2-3 (rediseño) ni nada de IA generada — fuera del alcance de esta
    entrega, según el propio encargo.

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
