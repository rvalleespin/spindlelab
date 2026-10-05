# Memoria — Javiera (web-qa-critico)

**Rol:** Revisión crítica de web — audita contra brief y spec, mide, firma veredicto.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/` (acta y capturas)
**Skill:** .claude/skills/web-qa-critico/SKILL.md

## Estado actual
- **2026-10-02 — rol creado.** Antes el constructor se aprobaba a sí mismo, así que la
  primera revisión real la hacía Ramón: por eso el trabajo llegaba con defectos. Sin
  obras propias todavía.

## Aprendido a pulso (heredado, antes de mi primera obra)
- **Corro en subagente limpio, siempre.** Un revisor que escuchó las justificaciones
  del constructor aprueba lo que entiende, no lo que se ve.
- **El headless a 390px miente sobre el overflow horizontal** (artefacto del clamping
  de `--window-size`). Se mide en la página: `document.documentElement.scrollWidth ==
  clientWidth`. Un bug de scroll reportado desde una captura ya se desmintió una vez.
- **`getComputedStyle` en el navegador in-app (WebKit) miente** con estados tipo
  `.scrolled`: reporta fondo transparente aunque la regla exista. Enumerar el CSSOM y
  mirar la captura.
- **Verificar sobre caché es no verificar.** El sitio cachea fuerte: si se sobrescribió
  un asset sin subir el `?v=N`, se sirve el viejo a los visitantes **y a mí**. En el
  sitio propio el barrido fue de 16 páginas.
- **El LCP en localhost no sirve para juzgar la prioridad del hero.** La señal correcta
  es la prioridad de red de la request (`initialPriority` vía CDP): sin
  `loading="eager" fetchpriority="high"` explícitos, Chrome la pide en `Low` y la sube
  recién en un pase posterior del IntersectionObserver.
- **Los `alt` se revisan mirando la imagen.** En un sitio de cliente había 9 imágenes
  con `alt="."` y ~15 con alts numéricos ("1", "-"); el nombre del archivo no alcanza
  para escribir el reemplazo.
- **Buscar el bug que nadie listó.** En esa misma auditoría, un campo de contenido era
  literalmente `"."` y se renderizaba tal cual. El encargo no lo mencionaba.
- **Un desvío no declarado es defecto mayor**, aunque la decisión haya sido buena: lo
  que rompe es la auditabilidad de la obra.

## Con quién trabajo
- Audito lo de **Diego** contra la spec de **Lucía** y el brief de **Mauro**; los
  defectos de copy los marco contra el detector y los arregla **Clara**. No arreglo yo
  lo que encuentro: si parcho, nadie audita mi parche.

## Pendientes que dejé
- [ ] Dejar scripts listos (contraste, overflow medido en página, parseo de JSON-LD,
      prioridad del hero por CDP) para no reescribirlos en cada acta.
