# Acta QA · encabezado plegado «como Koto» (commit 96148551)

**3-nov-2026 · Javiera (QA crítica), en contexto limpio (subagente).** Rama `claude/magical-franklin-ckfki2`.
Alcance: solo `src/components/a/Encabezado.astro` y `src/styles/archivo.css` de ese commit. Es un encargo, no una obra:
el criterio es el pedido de Ramón (placa chica a la izquierda con logo y «Soluciones», a la derecha solo «Hablemos»;
desde 834, mouse o foco sobre la placa abren el menú entero) y la referencia `medicion/koto-1440/koto-1440-y0450.jpg`.
Medido con Playwright contra `astro preview` (build del commit), a 390, 834, 1024 y 1440, arriba y con 1400 px de scroll,
en `/`, `/servicios/`, `/trabajo/`, `/contacto/` y `/blog/`. Las capturas quedaron fuera del repo, en el scratchpad de
la sesión (el encargo era subir solo esta acta).

## Veredicto: **Aprobado con reparos**

Lo visual cumple el pedido. Hay dos reparos mayores que corregir antes de publicar a `main`: el 1 es de teclado y venía
de antes, pero le quita valor justo a lo nuevo; el 2 es de documentación.

## Lo que está bien (que no se pierda en la ronda siguiente)

- **Placa y texto.** Plegado desde 834, la placa mide 16–254 × 8–56. El logo queda en x 28 y «Soluciones» en x 169. Al
  pasar el mouse o con el foco, la placa se abre hasta x 603 con los 6 ítems, y el botón (x 719 a 834) no se toca. Con
  `elementFromPoint` en el centro, el logo y «Soluciones» quedan encima de la placa en los 20 casos. «Soluciones» sobre
  la placa da 9,34:1 (blanco al 70 % sobre `#141414`). A 1440 la hora se va al plegar.
- **A 390.** Plegado entran el logo (28–125), «Soluciones» (141–211) y «Hablemos» (275–362) en 64 de alto, sin
  desborde. Arriba, la segunda fila sigue visible con 5 ítems (Contacto sale porque el botón lleva al mismo destino) y
  todos se alcanzan con Tab.
- **Desborde horizontal.** `scrollWidth == clientWidth` en las 40 combinaciones (4 anchos × 5 rutas × arriba/abajo) y
  también con el menú abierto. La placa transparente a 390, que se sale 16 px (`right: -16px`), no genera scroll.
- **La página no salta al plegarse.** La posición de `main` en el documento queda igual al cruzar los 24 px: 90 → 90 a
  390 (64 + 26 de margen) y 64 → 64 desde 834.
- **`aria-current`.** Queda en el ítem correcto en las 5 rutas («page» en Soluciones, Trabajo, Blog y Contacto; ninguno
  en `/`). En `/contacto/` no se dibuja el botón, como corresponde.
- **El foco abre el menú.** Desde el logo enfocado con el encabezado plegado, Tab recorre Soluciones, Método, Nosotros,
  Trabajo, Blog, Contacto y Hablemos. Los 6 ítems se ven (`:focus-within`), el contorno blanco de 2 px se ve sobre la
  placa y nada lo tapa. Bajo 834, plegado, el Tab va del logo a «Soluciones» y de ahí a «Hablemos», como estaba previsto.
- **`verificar`.** `--excluir /privacidad/ --ancho 390` y `--ancho 1440` dan 22 páginas sin hallazgos (exit 0).
- **Alcance.** El diff contra `8b856a04` toca solo esos dos archivos. No cambiaron Layout, functions, `_headers` ni
  precios.

## Defectos

1. **Mayor (de antes; ahora pega en lo nuevo). Con el encabezado plegado, cada Tab dentro del menú hace subir la
   página unos 410–460 px.** A 1440, desde y=1400 con el foco en el logo: Soluciones@990 → Método@580 → Nosotros@170. Al
   cuarto Tab la página está en y=0 y el encabezado se despliega. Pasa igual a 390, 834 y 1024. La causa es
   `html:has(body.a-body):has(:focus-visible) { scroll-padding-top: 80px }` (archivo.css, «nada tapado por lo fijo»):
   los ítems del encabezado pegajoso están en y 10–54, dentro de esa franja de 80, y Chrome «los descubre» haciendo
   scroll. Si se inyecta `scroll-padding-top: 0`, y se queda en 1400 en los tres Tabs. El padre `8b856a04` hace lo mismo,
   pero ahí el menú estaba entero a la vista. Ahora la promesa es «el menú se abre con el foco»: se abre, y quien navega
   con teclado pierde el punto de la página donde iba. El arreglo tiene que excluir de ese scroll a lo que vive dentro
   de `.cab`, sin quitarle la protección al contenido que pasa por debajo. Se vuelve a medir con Tab hacia adelante y
   hacia atrás.
2. **Mayor (auditabilidad). La spec sigue describiendo el plegado viejo.** `e13/spec-home.md` §3.2 (l. 120–145) dice
   «placa a todo el ancho» y `.cab--plegada .cab__nav { display: none }` bajo 834. No hay entrada en el historial de
   correcciones ni en `desvios-construccion.md`. También quedaron viejos los comentarios de cabecera de
   `Encabezado.astro` (l. 2–3: «bajo 834 queda solo el logo y el botón»), el de archivo.css l. 203–205 («placa de 48 […]
   a 8 del borde») y el de `base.mjs` («desde 834»). Un cambio que se queda en el chat vuelve como defecto en la próxima
   pasada: alguien que siga §3.2 va a «restaurar» la placa ancha.
3. **Menor. Bajo 834, al desplegarse, la placa salta un instante a todo el ancho y queda encima del botón amarillo.**
   Al quitarse `.cab--plegada`, `.cab__izq` vuelve a `display: contents` y la placa se posiciona contra `.cab__fila`
   (−12…406 × 21–69) mientras se desvanece (167 ms). A los 60 ms tiene opacidad 0,80 y pinta encima de «Hablemos»,
   porque `.cab__der` no está posicionado. Se ve como un parpadeo oscuro sobre el botón y sobre la fila del menú.
4. **Menor / para decidir Ramón. Plegado, la ubicación actual desaparece salvo en `/servicios/`.** En `/trabajo/`,
   `/blog/` y `/contacto/`, el ítem con `aria-current` queda en un `li` con `display: none`. Tampoco aparece en el árbol
   de accesibilidad: el nav «Principal» expone 1 solo enlace hasta que el foco entra. En la captura de Koto la placa
   muestra la página actual («HOME») con una señal ◂ de que se abre. Aquí dice siempre «Soluciones», tal como se pidió.
   Si se quiere seguir a Koto de verdad, el texto de la placa sería el de la página actual. Sin la ◂, nada indica que la
   placa se abre.

**No medido (riesgo):** el táctil desde 834 (iPad en horizontal), donde no hay mouse. En iOS el primer toque a
«Soluciones» puede solo abrir el menú. En Android el toque navega, y Método, Nosotros, Trabajo y Blog quedan fuera de
alcance mientras se esté abajo, igual que en celular. Chromium headless no reproduce ninguno de los dos casos.

## Reparos y plazo

Los defectos 1 y 2 se corrigen antes de publicar a `main`. El 3 puede ir en la misma pasada. El 4 lo decide Ramón y
no bloquea.
