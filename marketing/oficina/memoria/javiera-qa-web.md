# Memoria — Javiera (web-qa-critico)

**Rol:** Revisión crítica de web — audita contra brief y spec, mide, firma veredicto.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/` (acta y capturas)
**Skill:** .claude/skills/web-qa-critico/SKILL.md

## Estado actual
- **2026-10-14 · v3, QA del pase de voz (E8): aprobado en la ronda 2.** Acta en
  `obras-web/spindlelab-v3/e8/acta-qa-E8.md`. Quedan dos menores que no son del constructor:
  la frase de la prueba de Trabajo (Clara) y el descuadre de la fila de dos de Trabajo, que
  pasó a Ramón como confirmación 10.
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

## Aprendido en la primera obra (spindlelab-v3, 5–6 oct 2026)
- **Una revisión por página no ve el sitio.** Nueve páginas aprobadas una por una y la
  revisión cruzada las rechazó igual: el mismo plan prometía dos cadencias en dos páginas
  seguidas, un servicio tenía dos nombres, la misma foto abría páginas consecutivas. La
  cruzada va siempre, después de las de página.
- **Tres lentes encuentran lo que una sola no.** Sobre el build de producción: mirada del
  cliente (tableta vertical desarmada), conversión (los UTM se perdían al segundo salto,
  justo en el camino de Ads) y técnica (111 paradas de foco bajo el aviso de cookies).
  Ninguna lente vio lo de las otras dos.
- **Re-verificar es defecto por defecto, con el mismo script que lo encontró**, y buscando
  regresiones: el arreglo de tableta se coló al celular y achicó la obra 16 %.
- **Lo que mide `npm run verificar` no se repite a mano**; se le busca lo que se le escapa.

## Aprendido en la revisión del traspaso (spindlelab-v3, 10–13 oct 2026)
- **Lo fijo en la pantalla se mide en todas sus formas, no en la cómoda.** El aviso de
  cookies se midió por ancho (390, 768, 1440, siempre en vertical) y la línea base decía «no
  ocurre desde 360px». Midiendo por alto y apaisado apareció tapado en la página propia
  del chequeo: `/v3/diagnostico/` a 320×568 (el botón entero) y a 844×390 (campo y botón), y
  la home a 568×320 (C34, P66; el crítico tumbó el «resuelto» de P92 con la misma medida).
  Y el aviso que sale **después** del clic en Aceptar o Rechazar (`#cookie-aviso`, 5 s, radio
  16 px, sombra e Inter) no existe en el DOM hasta ese clic: el render inicial no lo ve y la
  QA final repintó solo `#cookie-banner` (P63). Se mide con `elementFromPoint` en el centro
  del control, en alturas bajas y en horizontal, y se aprieta cada control que pinta algo
  nuevo antes de dar la vista por medida.

## Aprendido en el pase de voz (spindlelab-v3, E8, 14 oct 2026)
- **Un pase de copy se audita reconstruyendo, no contando.** Que las diferencias sumen lo mismo
  que las filas no prueba nada. Rearmé cada texto «después» desde el «antes» con las filas
  «cambia» de su ruta y comparé letra por letra con el HTML servido: 245 de 245 calzaron, y
  así una diferencia sin fila habría saltado sola. Antes de eso comprobé la base: extraída y
  comparada con una extracción conocida (`migrado.json`), tenía que dar solo las 2 diferencias
  ya explicadas, y las dio. Una base equivocada aprueba cualquier cosa.

## Con quién trabajo
- Audito lo de **Diego** contra la spec de **Lucía** y el brief de **Mauro**; los
  defectos de copy los marco contra el detector y los arregla **Clara**. No arreglo yo
  lo que encuentro: si parcho, nadie audita mi parche.

## Pendientes que dejé
- [ ] Dejar scripts listos (contraste, overflow medido en página, parseo de JSON-LD,
      prioridad del hero por CDP) para no reescribirlos en cada acta.
