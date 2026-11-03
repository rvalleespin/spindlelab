# E15 · Heroes internos · acta de QA (Javiera)

Fecha: 3-nov-2026 · Rol: Javiera (QA crítica), en contexto limpio (subagente) · Repo `spindlelab`, rama
`claude/magical-franklin-ckfki2`, commit auditado `0affa29b` (Diego), sobre `2f653644` (las finales de Bruno).

## Veredicto: **APROBADO CON REPAROS**

Doce de las trece páginas tienen su hero bien puesto, sin desborde, con su alt y con el pie de IA donde corresponde.
Se puede entregar, pero hay dos reparos nombrados que decide Ramón antes de publicar: /trabajo/ quedó sin hero (D1) y
en /servicios/desarrollo-web/ quedaron dos imágenes grandes seguidas (D2).

## Fuentes y lo que faltó

- No hay `brief-de-obra.md` ni `spec-visual.md` propios de E15. Los criterios salen del encargo («imagen bajo la
  cabecera, sin desborde, lo esencial visible en el 4:5, alt fiel, pie de IA solo en las 3 fotos, verificar sin
  hallazgos, diff sin tocar Layout/functions/_headers/_redirects/public/js/formulario/precios»), de
  `lock-heroes.md`, de `finales/registro.md` y de `desvios-construccion.md`. La serie aprobada es `finales/hoja.jpg`.
- No medí a 768 ni recorrí el foco con Tab: el hero no tiene nada enfocable y el encargo pedía 390 y 1440.

## Mediciones (build + `astro preview`, Playwright, viewport 390×844 y 1440×900)

| Criterio | Resultado |
|---|---|
| Hero presente | 12/13. **Falta /trabajo/** (D1). |
| Bajo la cabecera | En las 12, el `top` de la figura queda bajo el final del h1 (por ejemplo, 390: h1 255 → hero 419 en /servicios/; 1440: 256 → 595 en auditoría). En /blog/ a 1440 va en la columna derecha, junto a la barra lateral (desvío 4, declarado). |
| Desborde horizontal | `scrollWidth == clientWidth` en las 13, a 390 (390/390) y a 1440 (1440/1440). |
| Fuente servida | 390: `-45.webp` (900×1125), caja 358×448, razón 0,800. 1440: `-169.webp` (1600×900), caja 1408×792, razón 1,778 (blog: 1072×603). La razón de la caja calza con la del archivo, así que `object-fit: cover` no recorta nada. **Lo esencial del 4:5 queda entero** en las 12. |
| Carga | `loading="eager"`, `fetchpriority="high"` y `opacity 1` en las 12. Hay un solo `fetchpriority=high` por página: el retrato de /nosotros/ y la franja de dw pasaron a `lazy` (desvío 3). |
| `width`/`height` | Están en `<img>` (1600×900) y en `<source>` (900×1125). |
| Pie «Imagen generada con IA.» | Solo en desarrollo-web, acompañamiento-mensual y contacto (las tres fotos), en las dos anchuras. En las otras 9 no aparece `figcaption`. |
| `verificar.mjs` 390 / 1440 | 23 páginas. Lo único que sale son los hallazgos de **/privacidad/** (2 h1 y dos contrastes, de 3,82 y 4,46), que ya estaban antes y figuran en CLAUDE.md. **E15 no trae hallazgos nuevos.** El commit dice «sin hallazgos», y eso no es literal (D6). |
| `extraer-texto.mjs --comprobar` | Sale «igual» en los 16 JSON. |
| Rutas vedadas | `git diff HEAD~5..HEAD` no toca `src/layouts`, `functions/`, `_headers`, `_redirects`, `public/js`, `src/scripts`, `oferta-v3.json`, `servicios-v3.json`, `servicios.mjs` ni el formulario. En contacto.astro solo se agregó el hero. Limpio. |

Capturas: `qa/hoja-390.jpg` y `qa/hoja-1440.jpg` (las 13, primera pantalla); `qa/dw-390.jpg` y `qa/dw-1440.jpg`
(hero + franja de desarrollo web).

## Alt contra imagen (los miré en el webp, no en el JSON)

Diez son fieles. Dos se apartan de lo que se ve (D3 y D4).

## Defectos

1. **[Mayor · reparo] /trabajo/ sin hero (12 de 13).** El encargo dice 13. El desvío 1 lo declara y lo argumenta
   (la cabecera vive en el panel sticky de `TrabajoFijo`). El argumento es razonable, pero no apruebo por
   explicación: la obra queda incompleta hasta que Ramón o Lucía decidan. Hay dos salidas: aceptar /trabajo/ sin hero
   y dejarlo escrito, o abrir el cambio de layout §2.2 como obra aparte. `trabajo-169/45.webp` y `trabajo.hero.alt`
   quedan sin uso mientras tanto.
2. **[Mayor · reparo] /servicios/desarrollo-web/: dos imágenes grandes seguidas.** A 1440 el hero (1408×792) y la
   franja de Combeau (616 de alto) quedan separados por 106 px, unos 1.500 px de imagen sin texto. A 390 son 448 + 227
   con 56 px entre ellas (`qa/dw-*.jpg`). Además, la prueba real (Combeau) baja de la primera pantalla y queda detrás
   de una imagen ilustrativa. Diego lo declaró (desvío 2) y lo dejó para QA. Mi juicio es que la composición no se
   sostiene así. La decisión es de contenido (Ramón/Lucía): sacar la franja de ahí, moverla más abajo o dejar esta
   página sin hero.
3. **[Menor] Alt de /metodo/ inexacto.** Dice «un archivador con los cajones abiertos y encendidos por dentro», y en
   la imagen los dos cajones de arriba están cerrados: solo están abiertos y encendidos el que se abre y el de abajo
   (el propio registro dice «abierto, abriéndose, cerrado y cerrado»). Lo corrige Clara en `e13/texto/metodo.json`.
4. **[Menor] Alt de /servicios/redes-sociales/ omite los megáfonos de la grilla.** Dice que la pinza deja «la foto de
   un megáfono» en una grilla que repite «tazas de café, cámaras, manos y cuadros vacíos». En la imagen, los megáfonos
   también se repiten en la grilla (4 o más en 16:9). Así, el alt presenta como pieza distinta algo que ya está
   repetido, y a quien lo escucha le cuenta otra idea. Lo corrige Clara.
5. **[Menor] Densidad a 1440 en pantallas 2x.** La caja mide 1408 px CSS y la fuente 1600 px, o sea 1,14 px de imagen
   por px CSS. En una pantalla retina se reescala ×1,75 y el grabado retro (auditoría está en q18) pierde filo. A 100 %,
   en auditoría se ve el borroneo de compresión en las líneas de la pantalla dibujada. Las rayas de bloque no se notan.
   No bloquea. Si se quiere arreglar: un `srcset` con una 16:9 de ~2400 px, o el tope de 220 kB para las retro que
   propuso Bruno. Es decisión de Bruno/Diego. Esto no lo medí en un dispositivo 2x: es aritmética.
6. **[Menor · registro] El mensaje del commit `0affa29b` dice «verificar a 390 y 1440 sin hallazgos».** Lo exacto es
   «sin hallazgos nuevos; /privacidad/ sigue con los suyos, que ya estaban». Va anotado para que nadie lo lea como si
   /privacidad/ estuviera arreglada.

## Lo que está bien (que no se pierda en la ronda siguiente)

- El `<picture>` cambia en 834, en el mismo punto que el `aspect-ratio` del CSS. La caja calza exacto con cada archivo,
  y por eso ningún recorte se come lo esencial.
- Hay un solo candidato a LCP por página. Bajar el retrato y la franja a `lazy` fue correcto y está declarado.
- `heroDe()` hace caer el build si falta el alt: ninguna página puede salir con un hero sin alt.
- El pie de IA está solo donde la imagen se lee como fotografía, como pide el encargo.
- El diff es acotado. No toca rutas vedadas ni precios.
