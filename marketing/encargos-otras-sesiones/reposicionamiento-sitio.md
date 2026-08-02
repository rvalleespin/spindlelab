# Encargo → persona-disenador-web (Diego): reposicionar el sitio v2

**De:** Tomás (troncal) · **Fecha:** 2026-08-02 (rev. tras revisar el sitio v2)
**Plan maestro:** `marketing/plan-reposicionamiento-2026-08.md`
**Estudio de base:** `marketing/inteligencia-mercado/2026-08-estudio-agencias-ia.md`
**Sitio v2 en vivo:** https://spindlelab-v2.pages.dev/

## Eje
Todo el sitio sube a: **«Mostramos, no prometemos»** — el especialista AEO/GEO que demuestra en vez de prometer.
**Nombre del método (decidido por Ramón, 2026-08-02): «Método Spindle».**

## Antes de tocar nada
Sincroniza con `main` / la rama donde vive el v2 (migración a Astro). Trabaja sobre esa versión, no sobre `spindlelab-site/` viejo.

## El v2 ya acierta mucho — respétalo
Hero «No compites solo en Google. Compites en las respuestas de la IA», diagnóstico en 48 h como CTA protagonista, la sección «Cuando alguien pregunta ¿apareces tú?», y el método ya nombrado. **Eso queda.** Los cambios de abajo son de ajuste fino, no de rehacer.

## Cambios (en orden de importancia)
1. **Renombrar el método.** El v2 lo llama **«Método Señal»**; Ramón eligió **«Método Spindle»**. Cambiar todas las apariciones. *(Si crees que «Señal» es mejor, dilo al troncal — no lo decidas solo; por ahora manda «Spindle».)*
2. **Bajar Desarrollo Web a cross-sell.** Hoy es uno de los 4 servicios y está destacado con etiqueta **«NUEVO»** — es exactamente lo contrario de la decisión de Ramón. Debe salir de la grilla de pilares y pasar a una sección secundaria («si además necesitas el sitio, lo construimos»), sin la etiqueta NUEVO. Los **3 pilares** quedan: Auditoría SEO Técnica · Visibilidad en IA (AEO/GEO) · Acompañamiento Mensual.
3. **Liderar con el Acompañamiento (retainer).** Hoy la grilla abre con Auditoría. Reordenar para que el retainer sea el protagonista comercial (es hacia donde va el mercado y el mejor margen).
4. **Reconciliar la «Simulación ChatGPT» con la regla de marca.** La sección «Lo que ven tus clientes» muestra un ChatGPT simulado recomendando a SpindleLab. Está etiquetada como «Simulación referencial», pero roza la regla de **cero prueba social inventada**. Mantener el recurso (es buena demostración) pero: dejar la etiqueta «simulación/ilustrativo» aún más explícita y visible, y **priorizar reemplazarla por un caso real** apenas exista permiso. Coordinar con troncal antes de cambiarla.
5. **Bug de hero.** En la captura del troncal el titular del hero se **superpone** con el badge «Diagnóstico en 48 h» y el sub. Revisar el z-index / estados de animación; que no colisionen en primera carga.
6. **Dejar el espacio de evidencia.** Slot para un caso real con datos (cuando haya permiso) o el protocolo de medición público como prueba verificable — la pieza que hace legible el rigor.

## Guardas
- Reglas de marca intactas (Tinta editorial, Gabarito, punto dorado escaso, sin em-dash muletilla).
- Trap de caché: bumpea `?v=N` en cualquier CSS/imagen que sobrescribas.
- **Reporta al troncal con captura del sitio en vivo** antes de que se marque hecho en `plan-operativo-90-dias.md`. No edites el seguimiento compartido directo.
