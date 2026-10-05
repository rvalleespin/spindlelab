# Encargo → persona-disenador-web: reestructurar servicios al "motor de adquisición"

**De:** Tomás (troncal) · **Fecha:** 2026-08-20
**Aprobado por Ramón:** nuevo camino de marca ("Ampliar sin diluir").
**Rationale completo:** estudio "Ampliar sin diluir" (artifact 🧩; pedir enlace a Ramón si se necesita el detalle).

## Antes de tocar nada
Sincroniza con `main` (rediseño oscuro editorial, Astro en `spindlelab-astro/`). El sitio en vivo hoy: home de una página con secciones + `/nosotros/`, `/blog/`, `/servicios/` (con 4 fichas de detalle). **14 URLs, todas se preservan.**

## Nuevo posicionamiento
SpindleLab deja de ser solo especialista SEO y pasa a ser **"un motor de adquisición digital de punta a punta, orquestado por un especialista con agentes de IA"** (Ramón = el orquestador). **No** es "agencia que hace de todo": lidera con el filo de **visibilidad en IA/SEO** y suma el resto como piezas conectadas de un mismo motor.

## La cartera = 4 piezas conectadas (encontrar → elegir → contactar)
1. **Visibilidad — SEO técnico + IA (AEO/GEO)** — *el filo*. Aquí caben las fichas que YA existen: Auditoría SEO, Visibilidad en IA, Acompañamiento mensual.
2. **Gestión de redes sociales** *(NUEVO)* — estrategia, pauta, comunidad, reportes. **El contenido no se crea acá** (se coordina con un tercero).
3. **Paid media (Google / Meta)** *(NUEVO)* — estrategia + manejo de cuenta, optimizado con IA.
4. **Desarrollo web** — sube de cross-sell a pieza del motor ("la base donde todo aterriza", con panel admin como el de Bernardo).

## Fuera de la cartera (dilo explícito en el sitio)
Creación de contenido, **gráficas y video** → otro precio, se coordina aparte. Agrega un bloque/FAQ: *"Somos tu motor de adquisición digital; el contenido creativo lo sumamos con partners cuando lo necesitas."*

## Qué tocar
- **Home, sección `#servicios`:** reemplaza "Cuatro formas de trabajar tu visibilidad" por el motor de 4 piezas, liderado por el filo.
- **`/servicios/` (índice):** reestructura al motor + el bloque "dentro/fuera de la cartera".
- **2 fichas nuevas:** `/servicios/redes-sociales/` y `/servicios/paid-media/` — mismo formato, meta y **JSON-LD `@graph`** que las fichas existentes, con canonical a `spindlelab.cl`.
- **`sitemap.xml`:** súmalas (de 14 a 16 URLs).
- **Menú:** evalúa si "Servicios" basta o conviene reflejar el motor.

## No romper
- Las 14 URLs actuales se preservan.
- Mantén el sistema oscuro editorial y las reglas de marca (dorado escaso, sin em-dash muletilla).
- **"Método Spindle"** se queda.
- Bumpea `?v=N` en assets que sobrescribas.

## Cierre
Reporta al troncal con **captura del sitio en vivo (o preview)** antes de dar por hecho. No edites `plan-operativo-90-dias.md` ni el seguimiento compartido.
