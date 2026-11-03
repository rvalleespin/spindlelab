# E15 · Heroes internos · registro de las finales

Fecha: 3-nov-2026 · Rol: Bruno (dirección creativa). Ramón aprobó la serie de 13 de la ronda 3 (`../pruebas-r3/`).
Esta pasada genera las finales en dos formatos, 16:9 y 4:5, y las deja en
`spindlelab-astro/public/v3/heroes/`. Ninguna página las usa todavía: conectarlas al hero es trabajo de Diego. No se
tocó Layout, `functions/`, `_headers`, `_redirects`, `public/js/`, el formulario ni los precios. No se publicó nada.

## Gasto

- Modelo `gpt_image_2_5`, `quality: medium`, `resolution: 2k`. Sale a 2688 × 1520 en 16:9 y a 1792 × 2240 en 4:5.
- Preflight con `get_cost`: **1 crédito por imagen**, igual en los dos formatos (con la referencia o sin ella).
- Saldo inicial: **190,75** créditos.
- Saldo final: **164,75** créditos.
- Gasté **26 créditos**: 13 páginas × 2 formatos. El tope duro era 30. No hubo que repetir ninguna por texto, caras,
  manos o por salirse de la prueba aprobada, así que las 3 repeticiones permitidas quedaron sin usar.
- **El 429 y el filtro no se cobraron.** En el primer lote, 4 de 12 pedidos volvieron con `429 rate_limit_reached` sin
  crear job (nosotros 16:9, metodo 4:5, auditoria 16:9 y visibilidad 16:9). Los reintenté solos y después mandé los
  lotes de a 4-6. El 4:5 de diagnóstico lo bloqueó el filtro una vez (`nsfw`, job 3e1f338c-fc93-4835-bc48-15c145eb3ee9).
  Como dice el lock (R3.5), hice un solo reintento **sin** `image_references` y salió. Las cuentas cuadran: 26 imágenes,
  26 créditos.

## Cómo se pidió

- Cada página lleva **su prompt aprobado**, tal como está en `lock-heroes.md`, de la ronda en que se aprobó:
  - R1 (§3B): nosotros, servicios, auditoria-seo-tecnica, redes-sociales, desarrollo-web, acompanamiento-mensual.
  - R2 (§3A): visibilidad-en-ia, paid-media, blog.
  - R3 (§R3.5): metodo, diagnostico, trabajo, contacto.
- Las seis de R1 van con su prompt **literal**, sin cambiar el lock por el de R2 ni el cierre por el de §1.5, aunque
  §3B lo pide «si alguna se regenera». Lo hice así porque el cierre de §1.5 niega la lupa y el megáfono, y las aprobadas
  de auditoría (la lámpara-lupa) y redes (los megáfonos chicos) los llevan con el visto bueno de Ramón (§0.8). Con ese
  cierre, el generador las habría sacado y la final habría quedado distinta de la prueba aprobada. El color de la fila
  sale del post, igual que en las pruebas.
- Como `image_references` va **el job id de la prueba aprobada de cada página**, para que conserve la composición.
- **En el 4:5** agregué al final del prompt: «Composition: a vertical 4:5 portrait frame. Recompose the same scene
  vertically so that everything essential stays whole inside the frame, with a margin around it and nothing important
  cut off at the edges.»

## Job ids

| Estilo | Página | Prueba aprobada (referencia) | Final 16:9 | Final 4:5 |
|---|---|---|---|---|
| isometrico | nosotros | 9f243205-fc6b-4364-a657-107e4c8a47aa | 5b35e1b2-5661-4022-b5e5-e13f75ac8896 | 12ff5ab3-e7c9-4cc4-8bda-921f4d971602 |
| isometrico | servicios | b83914f9-5642-4333-a453-16cc0f2b9e4a | f8bcc1bb-55e5-4014-8013-3f39153e61ed | a19868ef-15cd-4e05-a214-d3f9a82b2adf |
| isometrico | metodo | 894fe3a1-a380-4bfb-86f8-91e4e011ae5c | 964442bc-8c0a-41ff-8bcc-c505d97e17b8 | 103a3636-0151-41fd-b44e-bf83ff17aceb |
| retro | auditoria-seo-tecnica | 962bb7d1-6109-457e-ab92-efa8929270a7 | 476db9d2-f4db-426b-944c-b2d8fe130014 | 6d36e6a5-4ade-4896-91c8-19c751a6e766 |
| retro | visibilidad-en-ia | 40130962-9418-4297-a87c-6c21b4ac608f | 533a09e8-1183-4e01-934f-f8ea6c2a4d96 | 150c530e-f895-4eeb-b992-24b6a41f6ea4 |
| retro | diagnostico | be0ba391-3df9-4ae7-a9bb-096801dedccd | e5a21953-cd67-4549-8056-f7898c103580 | 4368caf4-b005-4d43-ba5c-6677af655e70 (sin referencia, ver arriba) |
| afiche | paid-media | a88af0f3-ea73-4c14-99d6-99d4cc0a166b | 84700128-386f-4826-b076-51e4feda1ccd | c3a7f68a-8e67-439d-b6b2-7c4a8b557540 |
| afiche | redes-sociales | 7f096bc9-712f-43aa-b93a-09a7ee079e76 | b429186d-34cb-4aea-a468-e756ffb049aa | 2dfe59b3-f8da-4bcb-b95b-6ecffd3e6f4c |
| afiche | trabajo | 2915cc78-e54a-4dfb-8098-a24294606df2 | 3ce8f910-c652-4832-aefd-8befb5098bb6 | e16b2b03-31dc-4bf3-90c6-f670ed8eac60 |
| afiche | blog | 3589a3d7-7ae9-4a23-8f1f-4568a9d1a568 | d7517832-4595-46e6-9db3-6d18c2d0e2bf | c2afc6e2-dc09-45c6-b6ec-c5a42137c251 |
| foto | desarrollo-web | b7e3ca7f-52dd-4a57-98c6-fcca545528b1 | b4159835-7f47-418c-b102-f9998caf20d4 | 58622133-b73d-48f6-8f9c-f8b0b7ce7263 |
| foto | acompanamiento-mensual | 05a7590b-92b7-4a63-b4dc-f733455cbcd7 | ae4454e6-c1d9-4808-bf5a-597d67052425 | 50cc6431-ca60-4208-9943-c971bd4797d5 |
| foto | contacto | cf8709d9-2c17-47c3-81cc-f3e3358194ef | f6c41b25-fd71-472e-b41d-212f63e7cdc7 | 0feec688-4858-4b67-ad21-bcdf6c705c21 |

## Post (PIL; `../pruebas-r2/post/build_finales.py`, que usa `post.py` sin cambios)

Uso: `python3 build_finales.py <dir post> <dir PNG> <dir webp> <dir PNG post>`. Los PNG quedan en el scratchpad de la
sesión y en Higgsfield, por job id. En el repo no hay PNG.

1. **Retoques sobre el PNG original**, antes de reescalar:
   - **metodo (los dos formatos):** hundí en sombra el panel que asomaba bajo el cajón que se abre, porque Javiera lo leía
     como un cajón de más. Dentro de un polígono que cubre solo ese panel (las coordenadas están en el script), puse el
     mismo panel suavizado (blur 7, con eso desaparecen la manija y el filo) y lo multipliqué por 0,55 justo bajo el
     cajón, aclarando hasta 0,85 hacia abajo. Usé un borde difuso de 4 px y ruido σ 4 para que no quede liso. Lo miré
     ampliado: ahora se lee como la sombra del cajón abierto y la progresión queda en abierto, abriéndose, cerrado y
     cerrado. Tiene el mismo violeta y no deja un hoyo negro.
   - **trabajo 16:9:** la etiqueta de la copia volvió a salir con una segunda barra borrosa bajo la buena. La tapé con el
     papel de la propia etiqueta (muestra tomada en x 1185-1200, y 655-665), ruido σ 5 y un polígono que queda dentro de
     la etiqueta. Ahora cada etiqueta tiene una sola barra. En el 4:5 las dos etiquetas salieron con una barra cada una,
     así que no las toqué.
2. **Formato:** el 16:9 se recorta al centro a 16:9 exacto (2688 × 1512) y se lleva a **1600 × 900**. El 4:5 se lleva a
   **900 × 1125**. En los dos casos uso LANCZOS.
3. **Por fila**, ya a tamaño final:
   - **retro → verde botella** con `gradmap_retro` (§1.7) en las tres. Medí sobre el PNG con post: luces a 112° y fondo a
     144-145° con L 0,13-0,14, dentro de la banda del lock.
   - **afiches → papel impreso:** primero `paper_shift` al tono 90° y después `paper_print` con S 0,6 y V 0,85, sin tocar el
     tono. El negro y la trama no cambian.
   - **fotos → grano §1.6** con σ 6 y `seed=15`.
   - **isométricos:** solo se reescalan.
4. **webp de 150 kB como máximo:** el script baja la calidad de a 2 puntos desde 88 hasta que el archivo entra.

## Pesos (`spindlelab-astro/public/v3/heroes/`)

| Página | 16:9 (1600 × 900) | 4:5 (900 × 1125) |
|---|---|---|
| nosotros | 149,3 kB · q74 | 147,2 kB · q82 |
| servicios | 124,8 kB · q88 | 94,7 kB · q88 |
| metodo | 53,4 kB · q88 | 48,3 kB · q88 |
| auditoria-seo-tecnica | **146,2 kB · q18** | 147,2 kB · q48 |
| visibilidad-en-ia | **147,2 kB · q30** | 146,0 kB · q42 |
| diagnostico | **148,8 kB · q32** | 144,5 kB · q84 |
| paid-media | 136,4 kB · q86 | 97,8 kB · q88 |
| redes-sociales | 149,9 kB · q66 | 149,1 kB · q78 |
| trabajo | 149,3 kB · q82 | 133,6 kB · q84 |
| blog | 141,1 kB · q84 | 135,9 kB · q88 |
| desarrollo-web | 136,0 kB · q74 | 142,9 kB · q80 |
| acompanamiento-mensual | 149,4 kB · q64 | 146,6 kB · q78 |
| contacto | 148,2 kB · q78 | 148,1 kB · q82 |

Las 26 entran bajo 150 kB (150.000 bytes). **Lo que hay que saber:** el retro en 16:9 es un grabado fino lleno de trama y
grano, y es lo que más pesa. Auditoría no bajaba de 150 kB ni con q42 (pesaba 224 kB), así que bajé el piso del
script. Quedó en **q18**, y visibilidad y diagnóstico en q30-32. Comparé ampliado al 200 % q18 contra blur 0,7 + q60:
q18 conserva mejor el trazo, y el blur lo empasta. A tamaño de hero no se notan artefactos, porque el retro es
monocromo y de línea, y esconde bien la compresión. Si Javiera ve bloques, la otra salida es subir el tope de esas
tres a ~220 kB y no forzar la calidad.

**Efecto de la compresión en el color:** con q18-48, el submuestreo de croma corre el fondo retro medido de 145° (PNG) a
134-136° (webp). Las luces quedan a 116-121°. El fondo está bajo la banda del lock (140-155°) por unos 5°, con L 0,12-0,13.
No es algo del post: el PNG está dentro de la banda. A simple vista, la fila se ve pareja en la hoja.

## Medidas sobre los webp finales

- **Papel de los afiches (H, S, V):** paid-media 90,0 · 0,601 · 0,843 / 0,606 · 0,839; redes 90,0 · 0,601 · 0,843 /
  0,609 · 0,843; trabajo 90,0 · 0,618 · 0,847 / 0,618 · 0,831; blog 90,0 · 0,601 · 0,843 / 0,598 · 0,847 (16:9 / 4:5).
  Quedan parejos.
- **Fondo de las fotos (tono):** desarrollo-web 51°/52°, acompañamiento 41°/44°, contacto 56°/46°. Están en el mismo
  rango que en la ronda 3 (52,7°, 40,8° y 53,9°).
- **Dorado** (`medir-dorado.py`): 0,00-0,01 % en isométrico, retro y afiche. En las fotos da entre 0,59 % y 1,35 %.
  Contacto 16:9 llega a 1,35 % (en la ronda 3 daba 0,65 %), y son los tonos de piel de las palmas, porque no hay latón
  ni madera. Desarrollo-web y acompañamiento dan 0,6-0,8 %, como antes.

## Revisión antes de entregar (lock §4)

- **Fiel a la prueba aprobada:** comparé las trece en 16:9 contra `../pruebas-r3/` y conservan la composición, los
  objetos y el gesto. La de diagnóstico 4:5 salió sin referencia, pero repite la escena: un cojín, la página enrollada,
  el manguito con una sola esfera, el tubo y la pera, y la mano que aprieta. En vertical salen enteras la mano y la pera,
  que justamente era el reparo de la ronda 3 sobre el recorte. Queda algo más «pintada» que la 16:9, con menos línea de
  grabado, y le sobra mesa abajo.
- **Texto:** amplié las dos esferas de diagnóstico y tienen solo marcas, sin cifras. Las tiendas del conmutador tienen
  la cruz de farmacia y ornamentos, sin letras. Las etiquetas de trabajo tienen una barra cada una (la 16:9 después del
  retoque). Las etiquetas de servicios están en blanco. La lámina plana de contacto tiene solo contornos y líneas de
  doblez.
- **Muletillas:** en las cuatro de R3 no aparecen. Auditoría conserva su lámpara-lupa y su ícono de círculo con montañita
  en la pantalla, y redes conserva sus megáfonos: los dos estaban en las pruebas que aprobó Ramón (§0.8). Desarrollo-web
  conserva el sol y las colinas del molde, como en la aprobada.
- **Caras:** en los isométricos las figuras son diminutas y van de espaldas; en auditoría el inspector también va de
  espaldas. En el resto solo hay manos y antebrazos. No vi manos deformes.
- **4:5:** en todas lo esencial queda entero. Los cajones de método se ven completos, con aire a los dos lados; en
  paid-media están la linterna, el haz y el paquete; en redes se ve la celda vacía con la pinza encima; en trabajo, la
  copia, la plomada y la mano; en blog, la galera completa con la varita en el doble fondo. En contacto entran las dos
  manos con su tienda. En paid-media 4:5 la mano de la linterna entra desde el borde izquierdo: es una entrada, no un
  corte.

## Reparos para Javiera

1. **auditoria-seo-tecnica 16:9 en q18** (ver «Pesos»): conviene mirarla a 100 % en pantalla grande.
2. **diagnostico 4:5** salió sin referencia (por el filtro). Es fiel a la idea, pero el trazo es más suave que el de su
   16:9.
3. **Fondo retro a 134-136° en el webp** por la compresión (en el PNG está a 145°).

## Archivos

- `spindlelab-astro/public/v3/heroes/<slug>-169.webp` (1600 × 900) y `<slug>-45.webp` (900 × 1125), 26 en total.
- `hoja.jpg`: las trece en 16:9, a 640 × 360 cada una, en 4 filas por estilo, sobre #060606 y con «estilo · slug».
- `hoja-45.jpg`: las trece **4:5 finales tal como salieron**, no un recorte, a 288 × 360 cada una.
- `../pruebas-r2/post/build_finales.py` y `../pruebas-r2/post/hoja_finales.py`.
