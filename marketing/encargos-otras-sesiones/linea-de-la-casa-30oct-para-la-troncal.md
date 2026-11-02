# Para la troncal: la línea de la casa cambió el 30-oct (hecho y pendiente)

**De:** la sesión del sitio nuevo (obra E13, rama `claude/magical-franklin-ckfki2`) · **Fecha:** 2-nov-2026 ·
**Pedido por Ramón:** «sí, déjalo listo».

## La línea vigente, desde el 30-oct-2026 (está publicada en spindlelab.cl, PR rvalleespin/spindlelab#51)

- **Rótulo:** «Sitios web a medida y marketing con IA».
- **Titular:** «En redes arriendas. Tu sitio es lo único que es tuyo.»
- **El negocio principal es Desarrollo web.** El sitio es el eje y lo demás se le conecta: búsqueda y visibilidad en IA,
  anuncios en Google y redes, acompañamiento mensual.
- **Acción principal: «Hablemos de tu sitio»** (`/contacto/`).
  - Con sitio: revisión gratis de una página, respuesta en un día hábil.
  - Sin sitio: le contamos cómo lo haríamos y cuánto cuesta.
  - El chequeo de `/diagnostico/` es secundario.
- **El panel para editar** viene en todos los planes de Desarrollo web.
- **Ramón firma como «Fundador y director».** No se nombran agencias ni clientes del pasado.
- **Fuente de verdad:** `marketing/oficina/clientes/spindlelab.md`, puesta al día en este mismo cambio.

## Lo que ya quedó hecho (este PR, sin tocar nada de lo que edita solo la troncal)

- **Ficha de la casa:** `marketing/oficina/clientes/spindlelab.md`. Línea, oferta, cierre de la revisión y un solo molde.
- **Manual de marca, perfil de Instagram y corpus de voz:** `marketing/brand/manual-de-marca.md`,
  `marketing/brand/redes/perfil-instagram.md` (marcado como superado) y `.claude/skills/voz-spindlelab/corpus.md`.
- **Skills:**
  - `agente-outbound`: la oferta de SpindleLab es «Hablemos de tu sitio»;
  - `cotizaciones`: el panel no se cobra aparte y la firma cambió;
  - `mini-diagnostico`: ahora es «revisión gratis de una página», en un día hábil;
  - `agente-seo-aeo` y `agente-troncal-marketing`: cambios de línea.
- **Plantillas:**
  - la de cotización (HTML y generador), la guía de cotizaciones y la revisión gratis (con la tabla de ruta y el cierre
    con la oferta entera);
  - la presentación de la llamada, nueva: `marketing/plantillas/presentacion-llamada/`;
  - `emails-fase0.md` y `solicitud-testimonio-simpletrust.md`, marcadas como retiradas;
  - `linkedin-posts.md`.
- **Ventas:** `ventas/guion-llamada-20min.md`, `ventas/objeciones-y-perdidas.md` y el README de la presentación de Legal
  Prisma (deja de ser molde).
- **Outbound:** `marketing/outbound/copiloto-outbound.md` (la guía, no los lotes ni los trackers).
- **Redes:**
  - kit de perfiles nuevo en `marketing/redes/marca-personal/perfil-linkedin.md`: LinkedIn de Ramón, página de
    SpindleLab e Instagram, listos para que Ramón los pegue;
  - notas «Antes de publicar» en las piezas de `2026-10-octubre-posicionamiento/`, que no han salido;
  - en `banco-posts.md`, los cierres de P3, P4 y P7.
- **Organigrama:** `marketing/oficina/organigrama-oficina.md`.

## Lo que te toca a ti (son documentos tuyos o de Ramón; no los toqué)

1. **`CLAUDE.md` y `contexto-agente-spindlelab.md`.**
   - CLAUDE.md L7 todavía dice «solo consultancy (SEO técnico + visibilidad en IA)», y L25 dice que mini-diagnostico «is
     promised within 48h».
   - El brief es del 5-jul: agrégale una cabecera de registro que apunte a la ficha.
2. **`marketing/plan-reposicionamiento-2026-08.md` y el brief de rebranding de agosto:** cabecera «Superado el 30-oct-2026».
3. **Estrategia.** `marketing/estrategia-marketing-spindlelab.md` y `como-ejecutar.md` hablan del «mini-diagnóstico en
   48 h». En `ventas/pipeline.md`, L8 define la etapa 2 como «se envió el mini-diagnóstico gratis»; pasa a «se envió la
   revisión gratis o una cotización».
4. **`marketing/rutinas-estado.md` L47** apunta a una copia vieja del prompt del copiloto, del 22-sep, que dice «motor de
   adquisición» y «diagnóstico gratis».
   - La fuente es la rutina.
   - **La firma de la tarea programada todavía dice «FUNDADOR»**, y el sitio dice «Fundador y director».
   - Para cambiarla hay que reenviar el prompt entero.
5. **`copiloto-outbound.md`** describe un flujo que la rutina ya no corre, y anota el horario `30 12`, que no es el real
   (`0 11 * * 1-5`). Ponlo al día con la rutina.
6. **Memorias de los roles** (`marketing/oficina/memoria/`):
   - emilia, cata, renata y simón dicen «mini-diagnóstico 24 h» o «48 h» y «servicio core»;
   - en renata hay que sacar la lista de agencias del CV, porque desde el 30-oct no se nombran;
   - en simón, L3 dice «servicio core».
7. **`encargo-v3-adaptar-al-modelo-nuevo.md`:** ciérralo con una línea. El sitio salió con otra línea, `f0e1b019` (#51).
8. **`marketing/redes/README.md`:**
   - septiembre pasa a archivo con la línea anterior;
   - la carpeta activa es `2026-10-octubre-posicionamiento/`, por realinear: ver las notas de cada pieza;
   - la reserva `anuncio-motor-v2` no se reprograma.
9. **Sesión del motor de revisión previa:** en la rama `claude/motor-revision-previa-build`, el revisor describe a
   SpindleLab como «consultora de SEO técnico, visibilidad en IA y cumplimiento web» y firma «FUNDADOR». Avísale.
10. **Piezas gráficas por rehacer:** la firma PNG de outbound y el banner de LinkedIn (Bruno).
11. **Las skills cambiaron en `main`.** Recrea las sesiones largas (tú incluida) para que las carguen.

## Corrección de la troncal (2-nov-2026)

Ramón decidió el cargo: **«Fundador», sin «director»**. Las dos menciones de «Fundador y director» de esta nota (L17 y L59) quedan sustituidas por «Fundador». La firma de la tarea programada («FUNDADOR») ya era la correcta y no hay que cambiarla.
