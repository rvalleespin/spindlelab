# Acta de QA · SpindleLab v3 · E16 caso Verifica y Cumple · ronda 1

> Javiera (`/web-qa-critico`), en contexto limpio: leí el pedido de Ramón, `notas.md`, el diff de `c8479704` y lo
> servido desde `dist/`. No vi la conversación donde se construyó.

**Fecha:** 3-nov-2026 · **Rama/commit auditado:** `claude/magical-franklin-ckfki2` @ `c8479704` · **Rondas previas:** ninguna

## Veredicto

**APROBADO CON REPAROS**

Hace lo que Ramón pidió («solo el video como tarjeta de vista previa», «de ahí pasa a la descripción completa con el
video en el hero») y lo medible pasa entero: video que reproduce, póster con movimiento reducido, un `h1`, JSON-LD que
parsea, sin desborde, `verificar.mjs` limpio en la página nueva. El reparo abierto es de texto (defecto 1): se resuelve en
el pase humano de Ramón sobre el texto, que ya está pendiente antes de publicar. Los defectos 2 y 3 son menores.

**Lo que no tenía:** esta obra no tiene `brief-de-obra.md` ni `spec-visual.md` propios; usa la plantilla y el sistema del
caso Combeau. Audité contra el pedido literal de Ramón, el encargo y `notas.md` (que hace de desvíos). El cumplimiento de
una spec visual específica de E16 no es verificable porque no existe.

## Cómo se verificó

- `npm run build`: 23 páginas, sin error.
- Preview `python3 -m http.server 8765 --directory dist` (PID 12979), matado por su PID al terminar (`curl` → 000).
- Playwright (Chromium de `node_modules`), a 390, 768 y 1440, con `reducedMotion` `no-preference` y `reduce`.
- Capturas propias en `capturas/qa/`: `caso-{390,768,1440}.png` (sin recorrer), `caso-{390,1440}-entera.png` (recorrida,
  con las entradas asentadas y el aviso de cookies rechazado), `caso-{390,768,1440}-reduce.png` (primer pantallazo con
  movimiento reducido).
- `node scripts/verificar.mjs --ancho 390` y `--ancho 1440` (24 rutas): único hallazgo `/privacidad/` (2 `h1` y 2 nodos
  a 3,82 y 4,46:1), conocido y anterior a esta obra. 0 enlaces rotos.
- `node e13/herramientas/extraer-texto.mjs --comprobar`: 17 de 17 «igual», `caso-verifica-y-cumple.json` incluido.
- `git diff HEAD~1 --name-only` contra `Layout|functions|_headers|_redirects|public/js|formulario|precio`: ningún archivo.

### Mediciones

| Qué | 390 | 768 | 1440 |
|---|---|---|---|
| Video del hero avanza en 1,5 s | 2,01 → 3,51 | 2,01 → 3,51 | 2,01 → 3,51 |
| `currentSrc` | `verifica-spot-390.webm` | `verifica-spot-390.webm` | `verifica-spot-1280.webm` |
| muted / loop / playsinline | sí / sí / sí | sí / sí / sí | sí / sí / sí |
| Con `reduce`: fuente cargada | ninguna, pausado, póster visible con botón ▶ | igual | igual |
| `scrollWidth` == `clientWidth` (html) | 390 = 390 | 768 = 768 | 1440 = 1440 |
| `h1` | 1 | 1 | 1 |
| Errores de consola / respuestas ≥ 400 | 0 / 0 | 0 / 0 | 0 / 0 |

- **Pie de IA del hero:** «Este video está generado con IA, a partir de la portada.» presente en las tres anchuras, en
  el `figcaption` del medio principal; la descripción del video va en `solo-lector`.
- **Hero:** póster con `loading="eager"` y `fetchpriority="high"`, `width`/`height` presentes. Peso: webm 464 kB (1280) y
  317 kB (390), pósters 42 y 26 kB.
- **Imagen de «La pieza»:** `verifica-y-cumple-12-169.webp`, 1600 × 900, `lazy`, alt que describe lo que se ve (miré la
  imagen: la sección de las 12 cosas en blanco sobre azul, dos columnas).
- **Encabezados:** `h1` + cinco `h2` (Problema, Hipótesis, Solución, La pieza, Sin métrica), sin saltos. Landmarks:
  `main` 1, `footer` 1, `header`/`nav` reales.
- **Teclado (1440):** 30 Tab seguidos; orden lógico (salto, menú, miga, índice del caso, pausa del video, enlace al sitio
  aparte, cierre, pie). Todos con `outline` sólido de 2 px.
- **Enlace al sitio aparte:** «Abrir Verifica y Cumple» → `https://verifica.spindlelab.cl/`, `rel="noopener"`, flecha ↗
  y aviso oculto «(sitio aparte: verifica.spindlelab.cl)».
- **Señales:** `<title>` 56 caracteres, description 143, canonical `https://spindlelab.cl/trabajo/verifica-y-cumple/`, OG
  completo con `og-e16-verifica.jpg?v=1` (medido: 1200 × 630) y su `og:image:alt`. JSON-LD **parseado**: dos bloques, el
  global (ProfessionalService + WebSite + Person) y el del caso (WebPage + CreativeWork + WebSite + BreadcrumbList); la
  miga del JSON-LD es igual a la visible.
- **Sitemap:** `/trabajo/verifica-y-cumple/` está en `public/sitemap.xml` y en `dist/sitemap.xml`.
- **Home y `/trabajo/` (390, 768, 1440):** la pieza Verifica y Cumple tiene **1 video y 0 portadas**; sus dos enlaces
  (la tarjeta y «Ver el caso») van a `/trabajo/verifica-y-cumple/`; ningún enlace a `verifica.spindlelab.cl` queda en esas
  dos páginas. Conteo «(2)» en «Todo el trabajo» y `ItemList` de `/trabajo/` con `numberOfItems: 2` y la url interna nueva.
  Sin desborde en el `html` de ninguna.
- **Falso positivo descartado:** la captura de página entera a 390 sale de 408 px de ancho. Medido en la página después
  de recorrerla: `html` y `body` 390 = 390, ningún elemento sobrepasa en el caso. En `/trabajo/` el `body` mide 408 por
  `.cab__placa` (hero de E15), recortado por `overflow-x: clip` en `html` y `body`: no se puede desplazar, no es de esta
  obra y no lo cuento.

## Defectos

| # | Severidad | Dónde | Qué está mal | Contra qué | Cómo se reproduce |
|---|---|---|---|---|---|
| 1 | menor (reparo) | Pie del spot en el hero del caso, en la home y en `/trabajo/` | «Este video está generado con IA, **a partir de la portada**.» La portada ya no está en ninguna de esas tres páginas: en la home y en `/trabajo/` salió en E16, y en el caso la imagen que se ve es la sección de las 12 cosas. Quien lee no sabe de qué portada se habla. La declaración de IA está bien; lo que no se entiende es «la portada» | antislop-web (copy que depende de un contexto que no está en la pantalla); pedido de Ramón (ahora el video es la única tarjeta) | Abrir `/`, `/trabajo/` o `/trabajo/verifica-y-cumple/` y leer el pie bajo el video. Corrige Clara, por ejemplo «a partir de la portada de verifica.spindlelab.cl», y se vuelve a copiar con `extraer-texto.mjs` |
| 2 | menor | `public/sitemap.xml` | `generar-sitemap.mjs … 2026-11-03` le pone `lastmod` 2026-11-03 a **todas** las páginas que no son del blog, también a las que esta obra no tocó. Es una señal falsa para los buscadores: dice que cambiaron 12 páginas que no cambiaron (`/blog/`, `/contacto/`, `/diagnostico/`, etc.) | Señales (sitemap exacto); `notas.md` §3 lo reconoce pero no lo corrige | `git diff HEAD~1 -- spindlelab-astro/public/sitemap.xml`: 16 `lastmod` pasan a 2026-11-03 y solo 4 páginas cambiaron. Arreglo: `lastmod` nuevo solo en `/`, `/trabajo/`, `/trabajo/verifica-y-cumple/` y `/servicios/desarrollo-web/` |
| 3 | menor (cosmético) | «La pieza», `verifica-y-cumple-12-169.webp` | El recorte 16:9 corta la lista en los puntos 07 y 08: se ven los títulos y se pierde el resto. A 390 el texto de la captura no se lee (es una captura de un sitio a 333 px de ancho). No engaña, pero se ve como un recorte accidental | Composición; el pie de Clara habla de «Las 12 cosas» y se ven 6 y media | `caso-1440-entera.png` y `caso-390-entera.png` en `capturas/qa/`. Opción: recortar sobre la fila 06 o aceptarlo escribiéndolo en las notas |

Sin bloqueantes ni mayores.

## Desvíos

Los seis de `notas.md` están declarados y coinciden con el diff. No encontré desvíos sin declarar: el diff toca
`casos.mjs`, `FilaCaso.astro` (desvío 2), `medios-casos.json` (desvío 1), los JSON de texto (copia exacta, comprobada),
`index.astro`, `trabajo/index.astro`, el sitemap y la imagen OG, y nada más.

**Pendiente de decisión, no defecto:** desvío 3. En `/servicios/desarrollo-web/` la tarjeta de Verifica sigue siendo
**la portada estática** y ahora lleva al caso («Ver el caso»). Medido: sus dos enlaces van a `/trabajo/verifica-y-cumple/`.
El pedido de Ramón no nombraba esa página. Que decida él si también pasa al spot.

## Texto: fuente de cada afirmación

Crucé el texto servido (`main.innerText`) con `ventas/casos-de-exito/verifica-y-cumple.md` de `origin/main` (CE) y
`e12/inventario-casos.md` (INV):

- Vigencia plena el 1-dic-2026, alcanza a cualquier organización sin importar tamaño, un formulario ya cuenta: CE, «Los
  hechos». ✔
- Qué revisa (política enlazada, HTTPS, idioma, gestor reconocido, terceros como Analytics y Pixel), lectura desde el
  servidor sin ejecutar ni entrar a nada privado: CE, «Los hechos» y «Cómo se construyó». ✔
- «Decirle cumples a quien no cumple lo deja expuesto a una multa»; dice lo que no puede verificar: CE. ✔
- Chequeo profundo con navegador real: INV §2.3 (respaldado por el repo) y CE, aviso del 16-oct (el profundo marca 100
  ese día, o sea que corre). ✔
- Contraste con Ley Chile antes de construir: CE («BCN/Ley Chile»). ✔
- Lista «Con qué está hecho» (a mano y sin generador, Pages Functions, Browser Rendering, KV como tope, datos
  estructurados, robots/llms/sitemap que antes devolvían la portada): INV §2.3, fila por fila. ✔
- 9-sep-2026, sin política ni gestor, GA4 y Pixel sin permiso, formulario sin casilla hacia un tercero; el «Enviando…»
  pegado y que no se sabe cuántos se perdieron; lo arreglado: CE, «El hallazgo incómodo». ✔
- Sin puntajes porque la forma de puntuar cambió el 23-sep: CE, aviso del 16-oct. ✔
- «¿Estás seguro?», blanco y lima sobre azul, art. 14 ter: alt de `medios.json` y la propia captura. ✔
- Fechas de la ficha (2026, en línea desde 23-sep-2026) y `datePublished` 2026-09-23: INV §2. ✔

**Sin cifras ni testimonios inventados.** Los puntajes (36 → 73, 100), los precios del kit y de la suscripción, las «6
correcciones» y las 72 horas quedan fuera, como dicen las notas. No aparece ningún cliente ni testimonio.

**No promete asesoría legal ni certificación.** La única mención es la negación, tal cual en el caso y en la tarjeta: «No
es asesoría legal ni certifica que cumples.» La description dice «señales técnicas que la Ley 21.719 le pide», no
«cumplimiento».

**Voz.** Plural de marca en lo que entregamos («construimos», «pasamos el chequeo», «lo arreglamos»), sin mezclar con el
singular de Ramón. Sin castellano de folleto. **Em-dash:** 0 en el HTML servido del caso.

## Detector anti-slop (alcance de esta obra: una página con plantilla ya auditada y dos tarjetas que se reducen)

- Copy: sin «impulsa», «soluciones», «¿listo para…?»; cada sección abre con un hecho, no con un adjetivo. El único ítem
  abierto es el defecto 1 (referente que no está en pantalla).
- Estructura: el caso no tiene métrica y lo dice en su título de sección («Sin métrica») en vez de rellenar con cifras.
  Es lo contrario del patrón de resultados inflados.
- Código: un `h1`, alt descriptivos, foco visible, sin `outline: none` sin reemplazo, sin comentarios HTML servidos
  (`verificar.mjs` no los marca).
- Visual: la composición es la de Combeau (auditada en E13); no la vuelvo a juzgar aquí.

## Pruebas de fuego

- **Logo tapado:** no podría ser otra empresa. El caso cuenta que la herramienta pilló al propio sitio y el error del
  formulario que perdía mensajes, y eso es de SpindleLab y de nadie más.
- **Rubro cambiado:** la plantilla de caso sirve para cualquier rubro (es su propósito); el contenido no.
- **Leído en voz alta:** suena a persona. «Lo primero que encontró fue nuestro» y «No hay forma de saber cuántos se
  perdieron antes de encontrarlo» se dicen así.

## Lo que está bien (no perderlo al corregir)

- El aviso oculto de sitio aparte en el enlace externo, resuelto desde `comun.externo` y no escrito a mano.
- Movimiento reducido sin cargar ni un byte de video, con el póster y el botón ▶ visibles.
- Lo que el texto **deja fuera** a propósito (puntajes, precios, 72 horas) y la decisión de decir por qué no hay puntaje.
- La home y `/trabajo/` quedan sin ningún enlace a `verifica.spindlelab.cl`: el único camino al sitio aparte pasa por el
  caso, que es lo que Ramón pidió.
