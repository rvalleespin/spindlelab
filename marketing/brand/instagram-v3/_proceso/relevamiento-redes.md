# Relevamiento: redes y formatos de Instagram (7-oct-2026)

Lo produjo un agente que leyó lo publicado, el sistema de redes v2, las skills de redes y verificó formatos en la web (con fuentes).

# Relevamiento: redes de SpindleLab y formatos de Instagram (7-oct-2026)

Hoy no se miró el canal. Esta sesión corre en la nube y no tiene navegador. Todo lo que dice "publicado" sale del repo, y la captura más reciente de Instagram en el repo es del **25-sep** (`marketing/redes/QUE-HAY-PUBLICADO.md`). Antes de publicar la primera pieza del manual nuevo hay que volver a capturar la cuenta.

---

## (a) Qué hay publicado en `spindlelab.cl` y en qué sistema

**La cuenta (dato del 25-sep):** 19 seguidores y 7 publicaciones. La última es del 3-sep. Es cuenta profesional (IG `17841414909841532`, ficha `marketing/oficina/clientes/spindlelab.md`). El bio se actualizó el 25-sep ("SEO técnico y visibilidad en IA para empresas chilenas. / Le preguntamos a ChatGPT por tu negocio. / Chequea tu sitio gratis ↓"). El enlace del bio sigue en `spindlelab.cl/diagnostico/`. Ramón tiene que cambiarlo desde el teléfono, y Verifica quería que apuntara a `verifica.spindlelab.cl`. La etiqueta "Perfil generado con IA" está encendida.

| Fecha | Pieza | Formato | Sistema | Dónde está |
|---|---|---|---|---|
| 8-jul | Carrusel "No apareciste" | 6 láminas 1080×1080 | v1.x: tinta `#131A22`, titulares Gabarito, cuerpo Inter, el caption con raya larga | `marketing/brand/redes/carrusel-01/` |
| 16-jul | Carrusel "3 mitos sobre las respuestas de ChatGPT" | 6 láminas 1080×1080 | v1.x: tinta, Gabarito + Inter, rótulo gris en mayúsculas espaciadas, punto dorado al final del subtítulo | `marketing/brand/redes/carrusel-02/` |
| 1-sep | "Pagas para que lleguen. El circuito se corta antes." (dominó) | estática 1080×1080 | v2: foto a sangre, rótulo petróleo en mayúsculas, Gabarito, **"desde $400.000" sin "+ IVA" quemado en la pieza**, gancho "comenta CIRCUITO" | `marketing/redes/2026-09-septiembre/01-mar-circuito-domino/` |
| 2-sep | "Un motor de adquisición. No cuatro servicios sueltos." | estática 1080×1080 | v2, foto dominó a sangre | `…/02-mie-motor-circuito/` |
| 3-sep | "Lo que estás haciendo para perder clientes" | carrusel 7 láminas 1080×1080 | v2, dominó bajo velo. La portada lleva el **punto dorado como punto final del titular** y las láminas internas un número dorado ("02") | `…/03-jue-carrusel-perder-clientes/` |
| ? | 2 publicaciones que el repo no identifica | — | Probablemente los posts del 24 y 31-jul (`marketing/brand/redes/post-2026-07-24/`, `-31/`): papel claro `#F7F5F0`, **dos oros** (punto del titular y punto del wordmark). No está confirmado | hay que mirar el canal |
| ⛔ 25-sep | "100 de 100, contando solo lo que alcanzamos a ver" | 1080×1080 | v2 con tema de Verifica. **Publicado y eliminado el mismo día** por Ramón | `marketing/redes/2026-10-octubre/03-lo-que-no-se-ve/` |

- **Stories:** hay 4 producidas (`marketing/redes/stories-01/` y `_banco-post-fiestas/11-vie-ig-stories/`). No hay registro de que alguna se haya publicado.
- **Reels:** ninguno publicado. El de julio quedó en `_archivo` y el "Llegó la sheriff" pertenece a la línea de Verifica.
- **Producido y sin publicar para esta cuenta:** `2026-10-octubre/01-carrusel-tres-mitos/` y `02-cifra-articulo-50/`. Están en v2, a 1080×1080, y su tema es Verifica (Ley 21.719). Según la decisión 7 quedan fuera de este manual y fuera de la línea propia de Verifica, así que no se publican como están.
- **Cómo rindió:** de Instagram no hay métricas en el repo. En LinkedIn rindieron mejor las piezas de oficio con una fuente que se puede revisar: los tres mitos en la página (398 impresiones) y el post de GEO en el perfil personal (84).

---

## (b) El sistema de redes vigente (v2, 31-ago) y cada cosa que choca con el sitio v3

**Qué es la v2.** La plantilla es `marketing/redes/2026-09-septiembre/_sistema/base.css`, idéntica a `2026-10-octubre/_sistema/base.css`. Fondo `#0e141b` con `fondo-hilo.jpg` bajo un velo de .86 a .96. Titulares en Gabarito 600 y cuerpo en Manrope, con Inter de respaldo. Rótulos en verde petróleo `#2fa99b`, en mayúsculas espaciadas. El oro va en el punto del wordmark **o** en un dato. Formato 1080×1080. Los tokens se leían del CSS de producción del sitio viejo.

| # | v2 de redes | Sitio v3 (`driftime.css` + spec) | Choque |
|---|---|---|---|
| 1 | Lienzo `#0e141b` con la foto del hilo a sangre bajo velo | Lienzo `#000` liso. Las imágenes van como **piezas** discretas | Cambian el fondo y el uso de la foto: la foto deja de ser textura y pasa a ser contenido |
| 2 | Texto `#f2efe8` | Papel `#F7F5F0` | Cambia el tono |
| 3 | Rótulos y cejillas en `#2fa99b`, mayúsculas, 17 a 21 px, tracking de 2,4 a 3 px | Rótulo en caja normal, 13 px, 500, gris `#9AA4B0`. "Nunca mayúsculas espaciadas" | El color de rótulo desaparece. El petróleo del sitio es `#0F766E` y **solo existe como campo** (fondo entero de Continuidad, texto `#FFF4E2`) |
| 4 | Titulares en Gabarito 600 | Manrope 500 en caja normal. Display Manrope 800 en mayúsculas solo en la portada. Gabarito **solo** en el wordmark | Todos los titulares v2 incumplen |
| 5 | Oro en el punto del wordmark **o** en UN dato ("50", "100 de 100", "02", "Art. 14 sexies"). En esas láminas el punto del wordmark se pinta blanco. En el carrusel del 3-sep, oro como punto final del titular | Oro **solo** en el punto del wordmark | Se acaba el "dato dorado" y el wordmark con punto blanco |
| 6 | Wordmark en todas las láminas (Gabarito 600, 42 px) | Wordmark puro solo en portada y cierre. Gabarito 800, tracking −0,035em. Láminas interiores sin wordmark | Cambia la firma y dónde aparece |
| 7 | Radio de 10 px (código, motor) y de 16 px (caja de mitos, y la directriz de "radio 16px") | Radio único de 6 px, 4 px solo en etiquetas de pieza | Todos los radios v2 incumplen |
| 8 | Tarjetas de vidrio `rgba(255,255,255,.02)` con borde blanco al 10 %, cajas con borde parejo (motor, mitos) | Prohibidas las tarjetas con borde parejo: se usan filas con filete. El vidrio tiene dos usos y solo dos (módulo de navegación y etiqueta de pieza). `--modulo #161616` solo para notas | Los dispositivos "motor" y "caja" de la v2 no existen en v3 |
| 9 | Gris terciario `#6b7580` en texto (mito tachado a 3,76:1, cita a 23 px) | `--d-gris-2` existe, pero la spec lo sacó del texto chico (4,12:1 a 13 px) | Contraste |
| 10 | 1080×1080 | 1080×1350 (decisión 1) | Formato |
| 11 | Pie de cada pieza: "Chequea tu sitio gratis · spindlelab.cl/diagnostico" o la URL de verifica, junto al wordmark | El llamado es texto ("Chequea tu sitio gratis. Enlace en la bio"), sin imitar botón | Cambian el lugar y el texto. Además "Desliza →" en negrita junto al paginador se acerca a parecer control |
| 12 | Precio quemado en la pieza ("desde $400.000", sin IVA) | Precio siempre "Desde \| $X \| + IVA", con las cifras exactas de los JSON (regla del 5-oct) | Formato del precio. Además choca con una regla de Ramón (ver abajo) |
| 13 | Etiqueta de serie con fecha ("CHEQUEA TU SITIO · SEPTIEMBRE") | Sin rótulos en mayúsculas. El campo dice el pilar (Desarrollo, Visibilidad, Continuidad, Alcance) | El sistema de series se reemplaza por pilares |
| 14 | `inter.woff2` en cada carpeta | Sin Inter (spec 5-oct) | Sobra un activo |
| 15 | `fondo-hilo.jpg` en todas las piezas | "El oro dentro de una foto cuenta como oro" | El extremo cálido abajo a la izquierda de `fondo-hilo.jpg` hay que medirlo si la foto vuelve como pieza. El sitio recortó `hilos.jpg` por lo mismo |
| 16 | Render con `_tools/render.sh` a 1x, en PNG | La OG v3 se rinde a 2x con `render.mjs` y se baja con `reducir.py` a JPEG 4:4:4 | Con croma 4:2:0, el punto dorado salía `#8D834E` |
| 17 | "Los tokens salen del CSS en **producción**, NUNCA del repo" (directrices, §3) | La v3 **no está en producción** (está bajo `/v3/` con `noindex`). La fuente pasa a ser `driftime.css` en el repo | La regla queda invertida y hay que reescribirla |
| 18 | Copy: "Acá va cada una…" (`01-carrusel-tres-mitos/lamina-1.html`) | Sin «acá» | La plantilla de DM del corpus también usa "escríbeme por acá" |

**Choques internos del manual v2.0 contra el sitio construido** (afectan al manual nuevo):
- Humo `#96948E` en el manual, `#9AA4B0` en el CSS.
- Tinta `#131A22` como superficie en el manual, `--modulo #161616` en el CSS.
- §04 y §06 permiten tres usos del oro; el sitio y la decisión 4 permiten uno.
- §07 da botón con texto `#14110E` y 256 px de aire de sección. El CSS usa `#000` y 180 a 200 px.
- §09 manda posts de Instagram a 1080×1080 con `post-tipografico`/`post-foto`, que son v1.x en papel claro con Gabarito e Inter. También da como foto de marca `foto-banner-original` "con velo ≥50 %", y esa foto **está en la lista negra** de la spec §5.
- La tabla de cabecera dice "Piezas de redes → sistema live v2".

**Choque de regla que el manual tiene que resolver: precios.** El 31-ago se fijó "precios propios nunca quemados en piezas de redes". El 1-sep Ramón la reencuadró: lo prohibido es la **cartera**, y un "desde" sí cabe (`encargos-otras-sesiones/jue3-copy-circuito-renata.md`). La ficha (`clientes/spindlelab.md`, línea ~178) todavía dice la versión vieja. Como el sitio muestra el precio de cada servicio, el manual tiene que escribir la regla: como máximo un "Desde $X + IVA" por pieza y nunca la cartera, o ningún precio.

---

## (c) Formatos verificados con fuente

| Ítem | Decisión fijada | Lo que dicen las fuentes | Veredicto |
|---|---|---|---|
| Feed y carrusel | 1080×1350 (4:5) | 4:5 está soportado. Meta Ads recomienda 4:5 a 1440×1800 para el feed ([Meta Ads Guide, feed](https://www.facebook.com/business/ads-guide/update/image/instagram-feed)). **Desde el 29-may-2025 Instagram acepta además 3:4 (1080×1440)**, en foto única y en carrusel, y lo muestra sin recorte ([9to5Mac](https://9to5mac.com/2025/05/29/instagram-changes-standard-photo-aspect-ratio/), [PetaPixel](https://petapixel.com/2025/05/29/instagram-finally-adds-support-for-34-aspect-ratio-photos)). Sked (dic-2025) ya recomienda 3:4 ([Sked Social](https://skedsocial.com/blog/best-instagram-image-and-video-size-recommendations.md)) | ✅ 4:5 sigue siendo válido, y es el mismo formato que el anuncio si Fran promociona una pieza. Hay una opción nueva: 3:4 no pierde nada en la grilla y gana 90 px de alto. **Lo decide Ramón; no cambia el kit salvo que él quiera** |
| Recorte de la grilla | Lo esencial dentro del centro 3:4, 1012 de ancho | La grilla es 3:4 desde ene-2025 ([Business Today, anuncio de Mosseri](https://www.businesstoday.in/technology/news/story/instagram-head-announces-big-changes-3-minute-reels-and-new-look-for-profile-grid-461527-2025-01-21)). Un 4:5 pierde ~34 px por lado y la zona segura es "roughly 1012 x 1350" ([Oktopost](https://www.oktopost.com/blog/instagram-grid-size-guide/)). La vista previa de la grilla ahora se puede ajustar a mano ([Planoly](https://planoly.com/blog/guide-to-instagrams-new-vertical-grid)) | ✅ Coincide: x de 34 a 1046. Una fuente (ayuda de Hopper) dice "4:5" para la grilla y contradice a las demás |
| Carrusel: proporción y largo | — | Hasta 20 láminas, y **todas toman la proporción de la primera** ([Storrito](https://storrito.com/resources/how-instagrams-20-slide-carousels-work-and-what-the-new-limits-are/)) | Hay que agregarlo al manual |
| Stories, zona segura | 250 px arriba y 340 abajo | Orgánico: contenido entre y=250 e y=1580, es decir 250 arriba y 340 abajo, con banda útil de 1080×1420 ([Moonb, jul-2026](https://www.moonb.io/blog/instagram-story-specs)). **En anuncios** Meta pide 14 % arriba, 35 % abajo y 6 % por lado (≈270, 672 y 65 px) ([Meta Ads Guide, Stories](https://www.facebook.com/business/ads-guide/update/image/instagram-story)) | ✅ Sirve para stories orgánicas. Si una story se promociona, el margen de abajo sube a ~672 px |
| **Reels, zona segura** | 250 px arriba y 340 abajo | Meta pide **14 % arriba, 35 % abajo y 6 % por lado** ([Meta Ads Guide, Reels](https://www.facebook.com/business/ads-guide/update/video/instagram-reels)). Hopper (18-sep-2026): ~270 arriba, **~670 abajo, ~770 abajo a la derecha** (la columna de íconos) y ~65 por lado ([Hopper](https://www.hopperhq.com/blog/instagram-reel-size/)) | ⚠️ **Cambió.** 340 abajo alcanza para stories, no para reels: el pie de foto, el usuario y los íconos tapan hasta ~670 px. En un reel, el texto clave va entre y≈270 e y≈1250, a ≥65 px de los lados y fuera de la columna derecha |
| Portada del reel | Se lee en el recorte central 3:4 (1080×1440) | Grilla 3:4 de 1080×1440: se pierden 240 px arriba y 240 abajo ([Hopper](https://www.hopperhq.com/blog/instagram-reel-size/), [ayuda de Hopper](https://help.hopperhq.com/en/articles/10907941-instagram-s-vertical-grid)) | ✅ Coincide: y de 240 a 1680 |
| Resolución y peso | — | Instagram guarda hasta 1080 px de ancho. Por debajo de 320 amplía, por encima reduce ([Ayuda de Instagram, vía buscador](https://help.Instagram.com/1631821640426723); la página no cargó al pedirla directo y su texto todavía dice "1.91:1 a 4:5"). Imagen en JPG o PNG, hasta 30 MB. Video en MP4 o MOV, hasta 4 GB ([Meta Ads Guide](https://www.facebook.com/business/ads-guide/update/image/instagram-story), [Moonb](https://www.moonb.io/blog/instagram-story-specs)). JPG para fotos, PNG para gráficas, calidad 80 a 90 ([Sked](https://skedsocial.com/blog/best-instagram-image-and-video-size-recommendations.md)). Reel en MP4, ≥30 fps, AAC ≥128 kbps ([Hopper](https://www.hopperhq.com/blog/instagram-reel-size/)). Reels de hasta 3 min desde ene-2025 ([Business Today](https://www.businesstoday.in/technology/news/story/instagram-head-announces-big-changes-3-minute-reels-and-new-look-for-profile-grid-461527-2025-01-21)) | Exportar a 1080 de ancho exacto, en JPEG q90 con **4:4:4** (el patrón de `reducir.py`) o en PNG |
| Recompresión de Instagram | — | **No verificado.** No encontré una fuente seria sobre el submuestreo de croma que aplica Instagram al recomprimir. El 4:4:4 protege nuestro archivo, no el que sirve Instagram | Después de la primera publicación: descargar la pieza y medir el color del punto (`#C9A227` contra `#8D834E`) |

---

## (d) Qué tipos de pieza usa la cuenta y cuáles convienen al plan

**Lo que usó:**
- Carrusel tipográfico: 2 en julio, más los mitos de octubre sin publicar.
- Estática de foto con titular a sangre: el dominó del 1-sep y del 2-sep.
- Carrusel de foto con texto: el del 3-sep.
- Cifra dominante: el "50" sin publicar y el "100 de 100" borrado.
- Stories: 4 producidas, sin registro de publicación.
- Reels: ninguno publicado.
- El gancho "comenta CIRCUITO" con ManyChat se usó en septiembre. No está claro si ManyChat quedó conectado.

**Lo que conviene al plan.** Ramón tiene media jornada a la semana, la cuenta tiene 19 seguidores, el alcance real es su red y el éxito se mide en chequeos.

1. **Carrusel 4:5 de oficio con fuente.** Portada con display, láminas interiores en caja normal y cierre con wordmark y llamado. Es el formato de las piezas que mejor rindieron en LinkedIn, y Cata ya puede reciclar textos.
2. **Pieza única de pilar.** Una imagen del pool como pieza de radio 6 con su etiqueta, un campo de color por pieza y un titular en caja normal. Pone en la grilla los cuatro campos del sitio y hace que el perfil se lea como el sitio.
3. **Story que acompaña cada post**, con el sticker de enlace dentro de la banda de y=250 a y=1580. Es el único enlace clicable aparte del bio, y sale casi gratis.
4. **Reel solo derivado de un carrusel**, cuando valga la pena. ffmpeg está instalado desde el 25-sep. La portada sigue la regla 3:4 y el texto la banda de 270 a 1250. No se recomienda como columna fija.
5. **Cifra dominante:** se puede mantener, pero sin oro en la cifra (va en papel) y solo como portada.

Un cuidado más: si una pieza usa Raigal, su rótulo de concepto tiene que leerse a tamaño de grilla. Si no se lee, Raigal va en una lámina interior, como se resolvió en la OG (`marketing/brand/og-v3/README.md`).

**Lo que Ramón tiene que decidir antes de fijar el llamado.** El llamado "Chequea tu sitio gratis. Enlace en la bio" solo funciona si el enlace del bio sigue en `spindlelab.cl/diagnostico/`. Si lo cambia a `verifica.spindlelab.cl`, como pidió la campaña de Verifica, el llamado manda al chequeo equivocado.

---

## (e) Qué archivos y skills quedan desactualizados con el manual nuevo

- `/home/user/spindlelab/marketing/brand/manual-de-marca.md`: tabla de cabecera ("Piezas de redes → v2"), §04 (Humo, Tinta, oro con tres usos), §06, §07 (botón `#14110E`, 256 px), §09 (posts de Instagram a 1080×1080, `post-tipografico`/`post-foto`, `foto-banner-original` con velo, que está en la lista negra), y la nota "v3 no publicado / rama".
- `/home/user/spindlelab/marketing/redes/README.md`: la sección "El estilo visual vigente (v2, 31-ago)" y la regla 1 ("partiendo de `2026-09-septiembre/base.css`").
- `/home/user/spindlelab/marketing/redes/2026-09-septiembre/_sistema/base.css` y `/home/user/spindlelab/marketing/redes/2026-10-octubre/_sistema/base.css`: plantilla v2. Quedan como archivo, no como base.
- `/home/user/spindlelab/marketing/redes/_tools/render.sh`: por defecto rinde 1080×1080, a 1x y en PNG. Hay que pasarlo a 1080×1350 o al patrón de `/home/user/spindlelab/marketing/brand/og-v3/render.mjs` con `reducir.py`.
- `/home/user/spindlelab/marketing/encargos-otras-sesiones/instagram-spindlelab-directrices.md`: §3 (tokens v2, "producción nunca repo", radio 16, cifra en Gabarito a 210 px, petróleo en etiquetas) y §4 (1080×1080, "no hay ffmpeg", que ya era falso desde el 25-sep).
- `/home/user/spindlelab/marketing/brand/redes/perfil-instagram.md`: falta alinear el llamado con el enlace del bio y quitar la recomendación "pasar a cuenta profesional", que ya está hecho.
- `/home/user/spindlelab/marketing/brand/redes/post-tipografico.html`, `post-tipografico.png`, `post-foto.html` y `post-foto.png`: plantillas v1.x que el manual §09 todavía cita.
- `/home/user/spindlelab/.claude/skills/persona-director-creativo/SKILL.md`: la línea 59 dice "Tamaños: 1080×1080 (feed/carrusel)". Además no menciona el recorte de grilla, las zonas seguras ni la exportación a 2x con JPEG 4:4:4.
- `/home/user/spindlelab/.claude/skills/voz-spindlelab/SKILL.md`: pone "escríbeme por acá y lo miramos" como modelo, y eso choca con "sin acá". `/home/user/spindlelab/.claude/skills/voz-spindlelab/corpus.md` tiene 7 «acá» (la §2, plantilla de DM de Instagram, y el handle viejo `@spindle.lab`). Como es texto publicado, se anota, no se reescribe.
- `/home/user/spindlelab/.claude/skills/persona-social-media/SKILL.md`: no trae tokens viejos, pero no recoge "sin acá / sin voseo" ni la mecánica de enlaces de Instagram. Se resuelve en la ficha.
- `/home/user/spindlelab/marketing/oficina/clientes/spindlelab.md`: en "Redes (Cata)", la regla "links en el primer comentario" no aplica en Instagram. La regla de precios (línea ~178) está en su versión vieja. No tiene sección de formatos de Instagram.
- `/home/user/spindlelab/marketing/oficina/memoria/bruno-direccion-creativa.md` (líneas ~180 a 185, "Estilo v2 obligatorio") y `/home/user/spindlelab/marketing/oficina/memoria/cata-social.md` (línea ~39): conviene agregar una entrada nueva, no reescribir la memoria.
- `/home/user/spindlelab/marketing/oficina/organigrama-oficina.md`: la línea 58 dice "(1080×1080 / 1080×1920)".
- `/home/user/spindlelab/CLAUDE.md`: la línea 105 (copiar `Gabarito.woff2` e `inter.woff2`, feed a 1080×1080) y la línea 121 ("Gabarito (headlines/wordmark), Inter (body)"), además de "usually the wordmark's final dot", que pasa a ser "siempre".
- `/home/user/spindlelab/marketing/redes/2026-10-octubre/01-carrusel-tres-mitos/` y `/home/user/spindlelab/marketing/redes/2026-10-octubre/02-cifra-articulo-50/`: v2, 1080, tema Verifica. No se publican como SpindleLab con el manual nuevo.
- `/home/user/spindlelab/marketing/redes/QUE-HAY-PUBLICADO.md`: la sección de Instagram se capturó el 25-sep y no identifica 2 de las 7 publicaciones. Hay que recapturar desde el canal.

Quedan sin cambios: `estudio-web/`, `persona-meta-ads`, `pulso-redes` (solo cubre LinkedIn, que es una brecha y no algo viejo) y `agente-calendario-editorial`. Ninguna fija formatos ni tokens de Instagram.