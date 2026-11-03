# E16 · Caso Verifica y Cumple (3-nov-2026, Diego con Clara)

**Pedido de Ramón (literal):** «para verifica solo dejaría el video como tarjeta de vista previa. de ahí pasa a la
descripción completa del proyecto con el video ahora en el hero».

## Qué se hizo

1. **Página nueva `/trabajo/verifica-y-cumple/`**, con la misma plantilla y el mismo sistema que Combeau:
   - `src/data/archivo/casos.mjs`: `ORDEN = ['combeau', 'verifica-y-cumple']` y su entrada en `CASOS` (medio principal,
     filas, JSON-LD, imagen al compartir). `[caso].astro` no cambió: genera la ruta y cuida los largos (title 56,
     description 143).
   - Texto de Clara: `e13/texto/caso-verifica-y-cumple.json` → copia con `extraer-texto.mjs` (`--comprobar`: todas iguales).
   - Medio principal: el spot de la home (`public/v3/trabajo/verifica/verifica-spot-*`), 1280 desde 834 y 390 (4:5) bajo
     834, con su póster, mediante `Video.astro` (el mismo que usa Combeau): muted, loop, playsinline, pausa accesible,
     arranca solo sin movimiento reducido. Pie: «Este video está generado con IA, a partir de la portada.».
   - Una fila de medios en «La pieza»: `verifica-y-cumple-12-169.webp` (alt de `medios.json`, tal cual), con el enlace
     «Abrir Verifica y Cumple» a https://verifica.spindlelab.cl/, flecha ↗ y, oculto a la vista, `comun.externo`
     «(sitio aparte: verifica.spindlelab.cl)».
   - JSON-LD: WebPage + CreativeWork (`datePublished` 2026-09-23, creador `#org`) + WebSite de verifica.spindlelab.cl
     (publisher `#org`) + BreadcrumbList igual a la miga. Nada que no conste.
   - Imagen al compartir nueva: `public/assets/img/og-e16-verifica.jpg` (1200 × 630), recorte del póster del spot.
2. **Home y `/trabajo/`**: Verifica y Cumple queda con **una tarjeta, el spot**; la portada estática salió. Enlace interno a
   `/trabajo/verifica-y-cumple/` con «Ver el caso» (el cursor de Combeau), por JSON: `home.trabajo.verifica.boton` y la
   entrada `verifica-y-cumple` de `trabajo.json` (`destino`, `cursor`, con `antes` y `por_que`). El conteo sigue en (2) y
   el ItemList de `/trabajo/` lista la url nueva.
3. **Sitemap** regenerado con `generar-sitemap.mjs dist 2026-11-03 --escribir public/sitemap.xml`: 23 URL, entra
   `/trabajo/verifica-y-cumple/`. (La herramienta pone 2026-11-03 de `lastmod` a todas las páginas que no son del blog.)

## Verificación

- `npm run build`: 23 páginas, sin error.
- `node scripts/verificar.mjs --excluir /privacidad/ --ancho 390` y `--ancho 1440`: **sin hallazgos** en las 23.
- Chromium (Playwright): en el caso, el video avanza (`currentTime` 3,01 → 4,51 en 1,5 s), `currentSrc` es el webm de
  1280 a 1440 y el de 390 a 390, muted/loop/playsinline, con botón de pausa; con `reducedMotion: 'reduce'` no carga
  fuente y queda el póster. Home y `/trabajo/`: la pieza tiene 1 tarjeta y su único destino es el caso.
- `ffprobe`: los dos webm son **VP9, Profile 0, yuv420p**.
- Capturas en `capturas/`: `caso-hero-{1440,390}.png`, `caso-entera-{1440,390}.png`, `home-tarjeta-verifica-{1440,390}.png`,
  `trabajo-tarjeta-verifica-{1440,390}.png`. El preview (`python3 -m http.server` sobre `dist/`) se arrancó y se mató por
  su PID.

## Fuente de cada afirmación del texto

Abreviaturas: **CE** = `ventas/casos-de-exito/verifica-y-cumple.md` (en `origin/main`); **INV** = `e12/inventario-casos.md`.

| Texto | Fuente |
|---|---|
| H1 «Un chequeo de la Ley 21.719 para sitios con formulario» | INV §2.3; bajada de `trabajo.json` |
| Ficha: Propio, 2026, en línea desde 23-sep-2026 | INV §2 (tabla) y §2.3 |
| Créditos: diseño, programación y textos de SpindleLab; persona a caballo generada con IA | INV §2 (producto propio); `convenciones-e12.json`, `home.trabajo.verifica.pie` |
| Vigencia plena el 1-dic-2026; alcanza a cualquier organización; un formulario ya cuenta | CE, «Los hechos» |
| Lo que se ve desde afuera (política, permiso antes de rastreadores, casilla) y gratis | INV §2.3 |
| «Decirle cumples a quien no cumple lo deja expuesto a una multa»; describe señales; dice lo que no puede ver | CE, «Los hechos» |
| «No es asesoría legal ni certifica que cumples.» | `home.trabajo.verifica.aviso`, tal cual |
| La primera prueba fue nuestro sitio | `home.trabajo.verifica.texto` (aprobado 2-nov); CE, «El hallazgo incómodo» |
| Lee la página pública desde el servidor, en segundos, sin ejecutar nada ni entrar a nada privado; qué revisa (política, HTTPS, idioma, gestor, terceros como Analytics y Pixel) | CE, «Los hechos» y «Cómo se construyó»; INV §2.3 (Pages Functions) |
| Chequeo profundo con un navegador de verdad; lo que no confirma lo dice | CE, «Los hechos»; INV §2.3 (Browser Rendering, respaldado por el repo, no corrido el 16-oct) |
| Contrastado con el texto oficial en Ley Chile | CE, «Los hechos» («BCN/Ley Chile») |
| Lista «Con qué está hecho» | INV §2.3, tabla de ingredientes (solo los que tienen efecto que contar) |
| «¿Estás seguro?», blanco y lima sobre azul, persona a caballo leyendo un papel; «Las 12 cosas…» del art. 14 ter | `medios.json` (alt de -53 y de -12-169); CE, aviso del 16-oct («los 12 puntos del Art. 14 ter»); la captura misma dice «Las enumera el artículo 14 ter de la ley» |
| 9-sep-2026: sin política, sin gestor, GA4 y Pixel sin permiso, formulario sin casilla hacia un tercero | CE, «El hallazgo incómodo»; «Acerca de» publicado (Analytics y Pixel sin permiso; ver desvío 4) |
| El botón «Enviando…» pegado, mensajes que no llegaban, no se sabe cuántos | CE, «El hallazgo incómodo»; `home.trabajo.verifica.texto` |
| Lo arreglado (política, formulario, permiso antes de tratar datos, Analytics y Pixel esperan) | CE, «El hallazgo incómodo»; INV §2.6 (GA4 y Pixel tras el aviso, servido) |
| Sin puntajes porque la forma de puntuar cambió el 23-sep; sin datos de uso ni de ventas | CE, aviso del 16-oct; INV §4.1, §4.4 y §7 |
| Cierre «te respondemos en un día hábil» y «Hablemos de tu sitio» | `combeau.siguiente.*` (decisión de Ramón, 30-oct) |

Fuera a propósito: los puntajes (36, 73, 100, 54 → 94), los precios del kit y de la suscripción, «6 correcciones» y el
mito de las 72 horas (documentados en CE, pero son afirmaciones legales que no hacen falta aquí), la fecha en que se
arregló (CE dice «el mismo día» y «12 días después» a la vez).

## Desvíos

1. **`medios-casos.json` no lo escribió `medios-casos.py`.** Los medios de Verifica ya están en `public/` (los usan la home
   y `/trabajo/`) y no hay nada que copiar; se sumó `casos["verifica-y-cumple"]` con un script de una vez (tamaño y
   sha256 reales, `como` lo dice) y la nota del archivo lo cuenta. Si alguien vuelve a correr el .py, hay que enseñarle
   este caso o se pierde.
2. **`FilaCaso.astro` gana el aviso oculto de sitio aparte** (`enlace.externo`, resuelto en `casos.mjs` desde
   `comun.externo` por su id) y `rel="noopener"`. El enlace de Combeau («Ver la original») no lo pide y queda igual.
3. **`dw.obra.entradas` (nota de referencia de `desarrollo-web.json`) cambió de destino**: el build compara ese texto con
   el destino de cada entrada de `trabajo.json`. Consecuencia: en `/servicios/desarrollo-web/` («Lo que construimos») la
   tarjeta de Verifica **sigue siendo la portada estática** (con su pie de IA) pero ahora lleva al caso con «Ver el caso».
   El pedido nombraba la tarjeta de vista previa en general; esa página no estaba en el encargo y queda **para que
   decida Ramón** si también pasa al spot.
4. **El «Acerca de» de `marketing/redes/marca-personal/perfil-linkedin.md` no trae el episodio** (Analytics y Pixel sin
   permiso, el formulario que perdía mensajes): ese archivo es el borrador del perfil y no lo menciona. El hecho está
   completo en el caso de éxito de `main` y en `home.trabajo.verifica.texto`, que son las fuentes usadas.
5. `home.trabajo.verifica.pie` y el medio `verifica-y-cumple-53` de `home.json` quedan sin lector en la home; se anotaron
   con `uso_e16` en vez de borrarse.
6. Ficha del caso con año («Propio · 2026»), como la de Combeau; la regla «sin año» de Ramón (2-nov) es de las fichas de
   las tarjetas, que siguen sin año.

## Para el corte

- El sitemap ya está regenerado en esta rama (`public/sitemap.xml`).
- Pendiente de QA en contexto limpio (Javiera) y del pase humano de Ramón sobre el texto antes de publicar.
