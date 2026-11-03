# Acta QA · encabezado, segunda vuelta (commit 9629b6fd)

**3-nov-2026 · Javiera (QA crítica), en contexto limpio (subagente).** Rama `claude/magical-franklin-ckfki2`.
Alcance: solo `git show 9629b6fd -- spindlelab-astro` (`base.mjs` y `archivo.css`). Es un encargo, no una obra. El
comportamiento ya lo aprobó Ramón en video, así que aquí se juzga si se rompe, no si gusta. Medido con Playwright
contra `astro preview` (build del commit) a 390×844, 834×1112, 1024×768 y 1440×900, en `/`, `/contacto/` y `/blog/`,
con y sin `reducedMotion: 'reduce'`. Las capturas y los cuadros de la animación quedaron en el scratchpad de la sesión,
fuera del repo, porque el encargo era subir solo esta acta.

## Veredicto: **Aprobado con reparos**

No encontré ningún estado roto. El reparo es de documentación: la spec quedó describiendo la primera vuelta. Hay que
corregirla antes de publicar a `main`.

## Lo que está bien (que no se pierda en la ronda siguiente)

- **Umbral con histéresis, como se pidió.** En los 4 anchos y las 3 rutas: con 34 % de alto de pantalla no se pliega,
  con 38 % se pliega, al volver a 32 % sigue plegado y con 28 % se despliega.
- **Interrupción.** Probé 5 ritmos de bajar y subir (30 a 500 ms entre cambios), terminando arriba y terminando abajo,
  en 12 combinaciones de ancho y ruta: son 120 casos. Medido 1,5 s después en todos: ninguna animación viva
  (`getAnimations` = 0), todos los ítems visibles a opacidad 1 y sin `transform`, la placa `visible` y entera
  (`clip-path: none`) cuando está plegado y `hidden` cuando no lo está. Nunca quedó plegado arriba ni desplegado abajo.
- **Movimiento reducido.** El cambio se ve a los 60 ms, con el mismo umbral y el mismo estado final. El foco no anima
  nada.
- **Márgenes.** El logo queda a 32 px del borde y el botón a 32 del borde derecho desde 834; bajo 834, a 24. Plegado
  desde 834, la placa va de x 18 a 260 (14 px por delante del logo), en y 8 a 56. A 390, plegada, va de x 8 a 382 y
  tapa el ancho completo, como en Koto.
- **Sin salto de página.** La posición de `main` en el documento no cambia, ni en el estado final ni en los 12 cuadros
  medidos cada 60 ms durante el plegado: 90 a 390 (64 + 26 de margen) y 64 desde 834.
- **Legible.** Con `elementFromPoint` en el centro, el logo, «Soluciones» y «Hablemos» quedan encima de la placa en
  todos los casos. «Soluciones» es blanco al 70 % sobre `#141414`, igual que en la vuelta anterior (9,34:1).
- **Desborde.** `scrollWidth − clientWidth = 0` arriba, plegado y después de las interrupciones, en todos los casos.
  También al cambiar el ancho estando plegado (390 → 1440 y 1440 → 390).
- **Tab por el menú plegado.** Desde 834 en las 3 rutas, el recorrido es logo → Soluciones → Método → Nosotros →
  Trabajo → Blog → Contacto → Hablemos. `scrollY` no se mueve, el menú se abre con el foco y cada ítem queda a
  opacidad 1. A 390, el recorrido logo → Soluciones → Hablemos tampoco mueve la página. El defecto 1 del acta anterior
  sigue arreglado.
- **`/contacto/`.** No lleva botón y todo lo anterior se cumple igual.
- **`verificar`.** Con `--excluir /privacidad/ --ancho 390` y con `--ancho 1440`: 22 páginas, sin hallazgos (exit 0).

## Defectos

1. **Mayor (auditabilidad). La spec y los comentarios siguen describiendo la primera vuelta.** `e13/spec-home.md` §3.2
   dice «a 16 del borde» en todos los anchos, y el bloque de código de esa sección plegaba a los 24 px de scroll.
   Además, la línea 142 dice que `base.mjs` alterna a 24 px y la fila 16 de criterios dice «sin resorte». Nada de eso
   menciona lo nuevo: el umbral de 36 %/30 % de alto de pantalla, el `clip-path`, los ítems escalonados, los márgenes
   de 32/24 ni la placa a todo el ancho (8 px) bajo 834. Tampoco hay entrada en `desvios-construccion.md`. En
   `archivo.css`, el comentario de las l. 203–205 sigue diciendo «Logo a 24 px en el margen (20 bajo 834) … placa de 48
   (… a 8 del borde) con el resorte «entrada»». Es el mismo defecto 2 del acta anterior, que vuelve: quien siga §3.2 va
   a «restaurar» la versión vieja.
2. **Menor. Un cambio de dirección antes de que se ponga la clase hace parpadear el menú.** Si se baja y se vuelve a
   subir dentro de unos 150–250 ms, mientras los ítems todavía se apagan, `cortar()` los devuelve de golpe a opacidad 1.
   Después `desplegar()` igual apaga «Soluciones» (160 ms) y hace entrar a todos los ítems desde 0, aunque el
   encabezado nunca se plegó. El estado final queda bien. Captura: el cuadro «interr-a» a 390 y a 1440, con
   «Soluciones» apagada y los demás encendidos. El arreglo posible es que `desplegar` salte la salida y la entrada si
   `.cab--plegada` todavía no estaba puesta.
3. **Menor. Bajo 834, durante la salida (~150–260 ms), el encabezado queda sin placa sobre el contenido.** Los ítems ya
   se apagaron y la placa todavía no crece, así que el texto de la página se ve pasar detrás del logo. En la captura
   aparece el rótulo «Retratos» en y≈15 a 390. Es justo lo que la placa a todo el ancho busca evitar (comentario de
   `archivo.css`). Es breve. Se deja a criterio de Ramón, que ya lo vio en video.
4. **Menor (heredado de la vuelta anterior, no de este commit). Con Tab hacia atrás no se llega a Método–Contacto.**
   Desde «Hablemos», Shift+Tab va directo a «Soluciones», porque los otros 5 están en `display: none` mientras el foco
   no esté en `.cab__izq`. Hacia adelante se recorren todos, así que no bloquea.
5. **Trivial.** En `base.mjs` (l. 14), `const ancho` quedó sin uso.

Lo siguiente: el constructor corrige el 1. El 2 es opcional pero barato. El 3 y el 4 se anotan para decidir. No hace
falta otra ronda de QA para el 1: basta con el diff de la spec.
