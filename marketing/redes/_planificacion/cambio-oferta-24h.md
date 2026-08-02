# Cambio de oferta — el mini-diagnóstico ahora es en MENOS DE 24 HORAS

**Decisión (Ramón, 28 jul 2026).** El plazo del mini-diagnóstico gratis pasó de "48 horas" a
**"menos de 24 horas"**.

**Por qué:** el diferencial de SpindleLab es automatizar procesos con IA. Prometer 48 horas se
contradice con ese mensaje — se ve lento. Menos de 24 horas es coherente con la propuesta y además
es un argumento de venta (rapidez).

**Regla para toda pieza y caption de aquí en adelante:** nunca "48 horas". Siempre **"menos de 24
horas"** (o "en menos de un día"). Si conviene, apoyar el ángulo de rapidez: "porque lo hacemos con
IA, no a mano".

---

## Colchón interno (definido el 29 jul 2026)

| | Antes | Ahora |
|---|---|---|
| Promesa pública | 48 h | **menos de 24 h** |
| Objetivo interno | 24 h | **12 h** |

La estrategia decía literalmente *«promete 48 h, entrega en 24»*. El cambio del sitio se comió ese
colchón, así que el objetivo interno baja a **12 h** para reconstruirlo.

⚠️ **Riesgo asumido:** el proceso de diagnóstico **sigue siendo manual**. Con la promesa apretada,
el margen de error es mucho menor y basta con que caigan dos prospectos el mismo día para romperla.
Esto sube la prioridad de `marketing/propuesta-automatizacion-mini-diagnostico.md`.

---

## Estado real de la propagación (auditado el 29 jul 2026)

> La versión anterior de este documento afirmaba *«ya se reemplazó en toda la campaña viva el
> 28 jul»*. **Eso era solo parcialmente cierto.** Se había cambiado el sitio y las piezas de redes;
> quedaron sin tocar las plantillas, las skills, la estrategia y el pitch de outbound.

**Ya alineado a «menos de 24 h»:**

- Sitio (`spindlelab-site/`), las 15 páginas.
- Campaña de redes jul-ago y sus captions.
- `CLAUDE.md` · `contexto-agente-spindlelab.md`
- `marketing/como-ejecutar.md` · `marketing/plan-operativo-90-dias.md` · `marketing/estrategia-marketing-spindlelab.md`
- `marketing/plantillas/emails-fase0.md` · `marketing/plantillas/linkedin-posts.md` · `marketing/plantillas/mini-diagnostico/guia-mini-diagnostico.md`
- `marketing/articulos/2026-07-articulo-01-que-es-un-mini-diagnostico-seo.md` (ahora idéntico al publicado)
- `ventas/pipeline-prospeccion.md` · `marketing/oficina/organigrama-oficina.md`
- Skills `mini-diagnostico`, `persona-director-creativo`, `persona-social-media`, `persona-disenador-web` — en el repo **y** sincronizadas a `~/.claude/skills/`.

**Deliberadamente NO cambiado (rewriting falsearía el registro):**

- `marketing/outbound/semana-02/` y `semana-03/` — emails **ya enviados** a prospectos con nombre
  y apellido. A esas personas se les prometió 48 h y esa promesa es la que corre para ellas.
- `marketing/encargos-otras-sesiones/publicar-articulo-*.md` — encargos ya ejecutados; el artículo
  vivo en el sitio ya dice «menos de 24».

**⚠️ Pendiente de producción — arte con la promesa horneada:**

`carrusel-01/lamina-6` y `carrusel-02/lamina-6` dicen «48 horas» **dentro de la imagen**. Ambos
carruseles ya están publicados en Instagram, así que el registro se conserva; pero
**`carrusel-02` figura como creativo en Meta Ads** (`marketing/redes/handoff-2026-07-21-redes.md`,
línea 30). Si esa campaña sigue activa, está pagando tráfico con una promesa que contradice al
sitio de destino.

Antes de reutilizar cualquiera de las dos piezas: editar `lamina-6.html` y re-renderizar
`lamina-6.png` a 1080×1080.
