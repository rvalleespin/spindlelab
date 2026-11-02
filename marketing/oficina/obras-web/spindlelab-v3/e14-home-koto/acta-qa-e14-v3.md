# E14 · Acta de QA, ronda 3 (Javiera, 2-nov-2026)

Revisora: Javiera (QA crítica), en subagente de contexto limpio. No escuché la construcción.
Repo `spindlelab`, rama `claude/magical-franklin-ckfki2`, de `d72933e4` (home aprobada, `acta-qa-e14.md` ronda 2) a
`ad52057b` (HEAD, igual a `origin`). Alcance **solo** lo que cambió entre esos dos commits:

1. El spot de Verifica y Cumple (video generado con IA) como primera tarjeta de esa pieza, en `/` y en `/trabajo/`
   (`public/v3/trabajo/verifica/`), con su pie y su descripción para el lector de pantalla.
2. La fila de tres de la home (anuncios, acompañamiento, cómo partimos) sin imagen: tres columnas iguales, cada una bajo
   su filete (`archivo.css`, `.k-tres--texto`).
3. Las fichas de trabajo sin año (`/` y `/trabajo/`; de rebote también `/servicios/desarrollo-web/`, que usa las mismas
   entradas).

## Veredicto

**Aprobado con reparos.** Los tres cambios funcionan y están medidos: cero hallazgos del verificador en 22 páginas a 390 y
1440, cero desborde, el video respeta el movimiento reducido (ni siquiera se descarga), el peso de la home pasa el tope y
el texto de la web es idéntico al de Clara. Los reparos son dos y se cierran antes de publicar: la descripción del video
para el lector describe la versión que se descartó (defecto 1) y los tres cambios no están declarados en
`desvios-construccion.md` (defecto 2).

## Defectos

| # | Severidad | Defecto | Fuente | Evidencia |
|---|---|---|---|---|
| 1 | **Mayor (reparo)** | La descripción para el lector dice «Un dibujo a lápiz de una persona a caballo, **en un cuaderno**, toma color fucsia y sale galopando por un cielo azul». En el video no hay cuaderno: es una hoja de papel de acuarela en blanco donde el trazo se forma solo, después entra el fucsia en mancha de acuarela y al final el fondo pasa a cielo azul con nubes. `imagenes-v2/LEEME.md` dice que la versión «cuaderno y lápiz a la vista» **se descartó** y que la que queda es la de papel en blanco: la descripción quedó de la v1. Es lo único que recibe del spot quien no lo ve | `e13/texto/home.json` (`medios` → `verifica-spot-1280.webm`, `descripcion`) y `e13/texto/trabajo.json` (`descripcion_video`). Lo corrige Clara en la fuente y se vuelve a extraer | Hojas de cuadros a 2 fps de `verifica-spot-1280.mp4` y `-390.mp4` (ffmpeg). Árbol de accesibilidad de la pieza en `/` y `/trabajo/`: el párrafo `solo-lector` trae ese texto |
| 2 | **Mayor (reparo)** | Desvíos no declarados. `desvios-construccion.md` no tiene entrada para ninguno de los tres cambios, y la fila de tres contradice lo que la spec de la obra decía («como las noticias de Koto: una grande y dos chicas», con imagen). La decisión es de Ramón y está trazada en los `por_que` de los JSON y en `imagenes-v2/LEEME.md`, así que no es un cambio a escondidas; pero la obra se audita por sus desvíos, y la próxima pasada que lea la spec va a «arreglar» la fila de vuelta a imágenes | Regla del rol: un desvío no declarado es defecto mayor aunque la decisión sea buena | `git diff d72933e4 HEAD --name-only`: `desvios-construccion.md` no aparece |
| 3 | Menor | Mancha marrón borrosa en la esquina inferior izquierda del spot desde ~4 s hasta el final (algo como polvo levantado, fuera de foco, que no se lee como nada). Queda **fija en el póster** (el último cuadro), que es lo único que ve quien tiene movimiento reducido o ahorro de datos, y lo primero que se ve antes de que el video arranque. Los cascos traseros también se emborronan en los últimos cuadros. No hay texto falso: la hoja que sostiene la jinete está en blanco en todos los cuadros | Detector anti-slop (defecto visible de imagen generada) | Cuadros en 4,5 s y 6,4 s a 1280 px; captura de la tarjeta con movimiento reducido en `/trabajo/` a 1440 |
| 4 | Menor | Orden de lectura en la pieza: el lector oye «Este video está generado con IA, a partir de la portada» **antes** de saber que hay un video (el video es `aria-hidden` y su descripción va al final, después de la bajada; en `/` además queda entre la bajada y «No es asesoría legal»). Se entiende, pero el pie habla de algo que todavía no se presentó | WCAG 1.3.2 (secuencia con sentido), leve | `ariaSnapshot()` de `article[data-nombre*="Verifica"]` en `/` y `/trabajo/` |

**Observaciones (no son defectos, quedan para dirección de arte):**
- A 390 la tarjeta 4:5 (358 × 473) corta la cola y la grupa del caballo y la espalda de la jinete durante todo el
  dibujo: se pierde el «sale galopando». Viene del encuadre del propio `-390.mp4` (624 × 780), no de la página.
- El bucle salta seco del cielo azul a la hoja en blanco cada 6,6 s.
- A 390 cada nota de la fila de tres ocupa ~300 px para ~200 de contenido: el aire entre el último enlace y el filete
  siguiente es grande. Es el ritmo heredado; no rompe nada.

## Mediciones

| Qué | Resultado |
|---|---|
| `npm run build` | 22 páginas, sin errores |
| `scripts/verificar.mjs --excluir /privacidad/ --ancho 390` | **Sin hallazgos** (22 páginas: contraste, desborde, h1, JSON-LD, alt, enlaces internos, comentarios) |
| `scripts/verificar.mjs --excluir /privacidad/ --ancho 1440` | **Sin hallazgos** |
| `e13/herramientas/extraer-texto.mjs --comprobar` | Los 16 archivos **igual**, `home.json` y `trabajo.json` incluidos |
| Peso de la home, primera carga a 1440 (`peso-30oct.mjs`, `astro preview` en 4331) | **1.397,4 kB** (tope 1.400). Sube 1,2 kB contra la ronda 2 (1.396,2). **El margen baja a 2,6 kB.** El spot no entra en la primera carga (póster y video se piden al llegar a la pieza) |
| Peso de `/trabajo/`, primera carga a 1440 | 807,6 kB (sin tope) |
| Desborde horizontal, recorriendo cada 300 px, `/` y `/trabajo/` a 390 (dpr 2, táctil) y 1440, con y sin movimiento reducido | `scrollWidth − clientWidth = 0` en las 8 corridas. Cero errores de consola |
| Spot, sin movimiento reducido | Corre al llegar a la vista: a 1440 carga `verifica-spot-1280.webm` sobre el póster de 960; a 390, `verifica-spot-390.webm` sobre el de 390. Video `aria-hidden`, `tabindex=-1`; póster con `alt=""`; botón «Pausar el video» |
| Spot, con `reducedMotion: 'reduce'` | `paused: true`, `currentTime: 0`, **sin fuente cargada** (solo se pide el póster), botón «Seguir el video». En `/` y `/trabajo/`, a 390 y 1440 |
| Pie del spot | «Este video está generado con IA, a partir de la portada.» visible bajo la tarjeta en los cuatro casos. La portada que sigue conserva su pie («La persona a caballo de esta portada está generada con IA.») |
| Foco en la pieza Verifica | La tarjeta del spot es el enlace con nombre «Verifica y Cumple (sitio aparte: verifica.spindlelab.cl)» y recibe el Tab; la de la portada queda con `tabindex=-1`, igual que la segunda de Combeau. Pausa en el orden |
| Video: archivos | `-1280` 1280 × 720 y `-390` 624 × 780, h264 y vp9, 24 fps, 6,58 s. Pesos: 532 / 442 kB (1280 mp4/webm) y 344 / 314 kB (390) |
| Video: cuadros | Revisados a 2 fps en los dos cortes. Sin letras ni texto falso (la hoja de la jinete en blanco en todos). Defecto 3 aparte |
| Fila de tres a 1440 | `grid-template-columns: 453.3px × 3` (iguales), cada nota con su filete `1px rgb(45,45,45)`, los tres títulos a 24 px, **0 imágenes**, opacidad 1 |
| Fila de tres a 390 | Una columna de 358 px, filete en cada nota, títulos a 23 px, 0 imágenes |
| Fichas sin año | En el HTML servido: `/` y `/trabajo/` dicen «Cliente · Sitio web» y «Propio · Herramienta»; `/servicios/desarrollo-web/` también (usa las mismas entradas). Ningún «2026» en fichas. `trabajo.json` aún trae `"anio": "2026"` pero ninguna página lo lee |

## Lo que no se tocó (verificado en el diff)

- Ningún precio: las notas de la fila siguen con `anunciosPrecio` y `precioAco`; solo se les quitó la clave `img`. Se
  ven «Desde $350.000/mes + IVA» y «Desde $590.000/mes + IVA».
- Ni formularios, ni `Layout` (gtag, consentimiento, Pixel), ni `functions/`, ni `_headers`, ni `_redirects`, ni
  `public/js`: ninguno aparece en `git diff d72933e4 HEAD --name-only`.
- Los `e14-banda-*.webp` borrados: **ninguna referencia viva**. 0 apariciones en `dist/` y en el código (`.astro`, `.ts`,
  `.mjs`, `.css`). Solo quedan nombrados dentro de `medios_retirados` en `home.json`, que es un registro y ninguna
  página lo lee.

## Lo que está bien (que la próxima ronda no lo borre)

- El video sigue el mecanismo ya aprobado de `video.mjs` sin tocarlo: fuentes por ancho, arranque a la vista, pausa
  WCAG 2.2.2, y con movimiento reducido no gasta ni un byte de video.
- El pie de IA del spot es distinto del de la portada y dice lo que es («a partir de la portada»): no se pisan.
- La fila sin imagen es limpia: tres columnas idénticas, cada una con su filete, mismos tamaños de título. Sacar la
  imagen no dejó huecos ni el `aria-labelledby` colgando (`h-anuncios` sigue en el primer título).
- El texto viene de la fuente de Clara con `antes` y `por_que` en cada cambio, y la copia de la web es idéntica.

## Pendientes y plazo

- **Antes de publicar:** defecto 1 (Clara corrige la descripción en `e13/texto/home.json` y `trabajo.json`, Diego
  vuelve a extraer y corre `--comprobar`) y defecto 2 (Diego declara los tres cambios en `desvios-construccion.md` y
  la corrección de la fila en la spec de la obra).
- Defectos 3 y 4: cuando se toque el spot de nuevo. El 3 se puede bajar eligiendo como póster un cuadro sin la mancha
  (no exige regenerar).
- **Margen de peso de 2,6 kB.** Cualquier cosa nueva en la primera pantalla de la home lo rompe; toda corrección que
  la toque vuelve a correr `peso-30oct.mjs` antes del commit.

## Evidencia

- Capturas de construcción ya en el repo: `construccion/v2-fila-tres-390.jpg`, `-1440.jpg`,
  `construccion/v2-spot-verifica-390.jpg`, `-1440.jpg`.
- Mis capturas y hojas de cuadros (no se commitean, por alcance de este encargo: solo el acta) quedaron en el
  scratchpad de la sesión: `fila-390.png`, `fila-1440.png`, `spot-home-390.png`, `spot-home-1440.png`,
  `spot-trabajo-1440-red.png`, `hoja-1280.jpg`, `hoja-390.jpg`, `f-par.jpg`. Se reproducen con los comandos de la tabla
  de mediciones y `ffmpeg -i verifica-spot-1280.mp4 -vf "fps=2,scale=480:-1,tile=3x5" -frames:v 1 hoja.jpg`.
