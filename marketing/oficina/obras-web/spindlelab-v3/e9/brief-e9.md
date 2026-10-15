# Brief E9 · Interiores, imágenes y prueba visible (v3 de SpindleLab)

**14-oct-2026, 19:00 (Chile) · Mauro** · Base `72045f8` en `claude/magical-franklin-ckfki2` · Plan aprobado: `/root/.claude/plans/dazzling-snacking-river.md` · **Obra**, no pulido: toca 21 rutas, el sistema de imagen y la spec (§4, §7). · Aprueba Ramón · Nada se publica: solo la vista previa `/v3/` con `noindex`.

## 1 · El encargo
> «No siento que esté quedando tanto como me gustaría.» (Ramón)

Marcó tres cosas y nada más: **(1)** las interiores se ven como plantilla negra (miga, h1 de 60 px, una foto y filas de «etiqueta a la izquierda, lista a la derecha») y pierden el pulso de la home; **(2)** las 6 fotos de ambiente de `public/assets/img/d/` se generaron con Higgsfield para campañas de redes, se repiten y no muestran nada del negocio: **las reemplaza por material real**; **(3)** la prueba no se ve: todo está en texto gris de 14 a 18 px. La dirección general y la home no las marcó: se quedan.
**Objetivo de negocio:** quien llega a una interna con intención alta tiene que **ver** que el trabajo existe y se puede comprobar (obra y lecturas reales, con fecha) y ver en grande lo que vende, antes del botón. El criterio sigue siendo la conversión (`brief-de-obra.md` §1).
**El hallazgo que manda:** las interiores de driftime también son negras, pero cada caso lleva entre 18 y 24 imágenes (`lock-driftime.md` §6); las nuestras llevan de 0 a 6 (medido abajo). La regla «una interna tiene cero display» (spec §2, Ramón 5-oct) **no se toca**: el pulso viene de la imagen, no de la letra.

## 2 · Qué cambia y qué no
**Cambia:** las imágenes de las 13 interiores, de los 7 artículos (su destacada) y de 3 campos de la home; la cabecera y las galerías de los tipos Servicio, Editorial y Herramienta según la dirección elegida; el color del campo en las interiores (cierra spec §7:195); un **bloque de prueba** en tres lugares (36 → 73 → 100 en la ficha de Verifica en Trabajo, el compromiso de 3 meses en Visibilidad y Acompañamiento, la metodología 30/40/30 en Diagnóstico); etiquetas y alt de las piezas nuevas. **Con la dirección que elijas** (las dos la llevan): la tira de columnas en «Así se ve un mes tipo» (Acompañamiento) y «Cinco fases» (Desarrollo web), las dos secciones donde la dibuja el tablero, con el texto de E8 igual. «Lo que incluye», los planes, las preguntas y el cierre cambian de forma **solo con un sí en §8.4**; si no, siguen en filas.
**No cambia:** `section.d-hero`, `.d-pres` y la línea del campo Desarrollo · la estructura y el orden de la home · precios y notación «desde … + IVA» · los `name` del formulario y los ids `chq-*` · `Layout.astro`, `functions/`, `consent-banner.js`, `v3-contacto.js` · URLs y `@id` del JSON-LD · el copy aprobado en E8 (salvo etiquetas, alt y textos del bloque de prueba) · cuerpo y cabecera de los artículos y la bio de Nosotros (zonas cerradas de E8) · R2, R4 y R7, que siguen siendo de Ramón.

## 3 · Rutas (medido hoy en `dist/v3` sobre `72045f8`: **97 referencias a `assets/img/d/`**, todas en estas 21 rutas)
| Ruta | Hoy: `<img>` · fotos `d/` | Qué pasa en E9 |
|---|---|---|
| `/v3/` (home) | 13 · las 6 | **Solo los campos Visibilidad, Continuidad y Alcance**: salen sus 6 fotos, entran piezas reales de ese campo; la fila puede llegar de margen a margen si la spec lo pide (cierra §7:259). Hero, campo Desarrollo y retrato intactos. Sin 36 → 100 |
| `/v3/servicios/` | 0 · 0 | Bandas de campo y precios intactos. Solo lo que la spec del tipo Índice pida en la cabecera; si no pide nada, no cambia |
| 5 servicios `[slug]` | 2 a 3 · cabecera y galería | Cabecera y galerías con piezas reales del campo del servicio (mapa por `href` en `oferta-v3.json`); color del campo según la dirección. Visibilidad y Acompañamiento: el compromiso de 3 meses (texto de `servicios-v3.json`, sin reescribir) como bloque «Resultado · Plazo · Condición». §7:192 y §7:204 se cierran en la spec |
| `/v3/servicios/desarrollo-web/` | 6 · escritorio, ventana | Salen las dos fotos; la obra se queda (Combeau ×2, Verifica, Raigal con su rótulo de concepto primero) |
| `/v3/metodo/` | 3 · dominó curvo, hilo, ventana | Imagen y galería pasan a piezas reales de cada fase; §7:196 se acepta o no en la spec |
| `/v3/diagnostico/` | 2 · hilo | Sale el hilo a sangre (§7:163); entra la metodología 30/40/30 dibujada con las 21 señales. El instrumento `chq-*` no se toca |
| `/v3/contacto/` | 0 · 0 | Formulario intacto, nada entre el formulario y los pasos (§7:172). El retrato no se suma |
| `/v3/trabajo/` | 4 · 0 | El 36 → 73 → 100 como tres cifras fechadas en la ficha de Verifica, y la fila vuelve a cuadrar. **Único lugar del sitio con esas cifras** |
| `/v3/nosotros/` | 2 · ventana | Sale la ventana; el retrato y la bio quedan |
| `/v3/blog/` | 1 · dominó curvo | La destacada del último artículo pasa a una pieza real de su tema |
| 7 artículos | 2 · una cada uno (hilos ×3) | La destacada pasa a una pieza de lectura de su tema (p. ej. «21 chequeos» → la lista de las 21 señales). El `image` del JSON-LD sigue en `og-v3.jpg` |

## 4 · Activos
| Activo | Dónde | Estado |
|---|---|---|
| Obra: mockups de Combeau fotografía y modelo, Verifica y Cumple, Raigal | `public/assets/img/obra/` | Combeau como obra ✅ 30-sep · Verifica propio · Raigal concepto, rotulado primero |
| Pantallas de Verifica y Cumple | `verifica.spindlelab.cl`, en vivo | propio; se capturan con fecha. Verifica tiene línea editorial propia (25-sep): va como obra, no en el sistema de redes |
| Lecturas de máquina de `spindlelab.cl` y `verifica.spindlelab.cl`: `robots.txt`, cabeceras HTTP, JSON-LD, respuesta a GPTBot, ClaudeBot y PerplexityBot | se capturan hoy con Bruno | propio. La respuesta se pide **con el user-agent** del robot: la etiqueta dice eso, no «lo que ve GPTBot» (Cloudflare puede tratar distinto al robot verificado: caveat de `marketing/metricas/corridas-chequeo-2026-08-31.md`) |
| Las 21 señales y sus pesos 30/40/30 | `functions/api/chequeo.js` (se lee, no se toca) y el artículo de los 21 chequeos | propio |
| Piezas publicadas de SpindleLab | `marketing/redes/`, `marketing/brand/instagram-v3/` | **Solo** las que `QUE-HAY-PUBLICADO.md` da por publicadas y no traen foto `d/*` ni `fondo-hilo.jpg`, ni oro fuera del punto, ni prospecto. No pasan: la del dominó (1-sep) y la del 67 (9-sep: 67 en dorado sobre el hilo) |
| Retrato de Ramón | `ramon-vallejos.jpg` | uno, solo donde ya está |
| **Espera tu OK** (se dibujan en el tablero, no se construyen) | el 67 de 69 (`corridas-chequeo-2026-08-31.md`, agregados de 38 inmobiliarias + 31 contables, sin dominios) · captura del chequeo de IA (spindlelab.cl 85, verifica.spindlelab.cl 54, recapturada con fecha) · panel de Combeau | sin autorizar |

**Huecos declarados, sin rellenar:** Paid Media no tiene pieza propia en el repo (el anuncio de Búsqueda no está capturado); si Bruno no lo captura con fecha, la página lleva piezas publicadas de Alcance, nunca un anuncio dibujado. No hay caso de cliente con cifras.
**No se usa:** Unsplash ni stock (Ramón eligió material real), Higgsfield ni ninguna generación, las fotos `d/*`, la lista negra de spec §5, pantallas con datos inventados, dominios de las corridas, Aplomo y Deslinde, logos, audio.

## 5 · Las compuertas
1. **Ahora, Tanda A (sin tocar `src/` ni `public/`):** este brief; Bruno escribe el generador y el primer juego de 8 a 10 piezas en `e9/piezas/`, cada una con su captura cruda; Lucía arma `tableros/e9-interiores/tablero.html` con **dos** direcciones («Pantallas» y «Lectura de máquina») sobre Acompañamiento mensual y Desarrollo web, a 1440 y 390, con el tratamiento de la prueba y las tres pruebas marcadas «espera tu OK». **Compuerta: decides sobre el tablero renderizado.**
2. **Después, Tanda B (solo tras tu decisión):** Lucía reescribe spec §4 y §7 y el manual §07b (regla de «pieza de lectura»); Bruno, el juego completo (40 a 60 piezas) en `public/assets/img/e9/`; Clara, etiquetas, alt y bloque de prueba; Diego construye; Simón revisa alt, og:image, JSON-LD y peso; Javiera firma `e9/acta-qa-E9.md` en contexto limpio (hasta 2 rondas); cierro yo.

## 6 · Criterios de aceptación (cada uno con su comprobación)
**Tanda A**
- [ ] El tablero a 390 sin desborde: con Playwright, `document.documentElement.scrollWidth` = 390. Dos direcciones, no tres.
- [ ] Cada pieza tiene su captura cruda al lado, con la misma fecha, y el dato de la etiqueta aparece literal en la cruda (`grep -F "<dato>" <cruda>`). Pieza sin captura, no existe.
- [ ] Las tres pruebas nuevas llevan «espera tu OK» en la pieza misma (3 apariciones como mínimo en `tablero.html`).

**Tanda B** (en `spindlelab-astro/`, tras `npm run build`)
- [ ] `grep -r "assets/img/d/" dist/v3 | wc -l` = **0** (hoy 97) y `public/assets/img/d/` no existe.
- [ ] `npm run verificar -- --prefijo /v3/ --sin-pildoras --ancho 390`, `768` y `1440`: «Sin hallazgos.» en los tres.
- [ ] Zonas cerradas: `e8/herramientas/extraer.mjs` sobre `72045f8` y sobre el resultado (`--dist dist --esperadas 21`) y `comparar.mjs`: **0 hashes cambiados** en `hero`, `pres`, `campo-desarrollo-linea` (solo `/v3/`), `bio`, `r4-singular`, `articulo-cuerpo`, `articulo-cabeza` y `aviso-cookies`.
- [ ] La misma comparación: diferencias **solo** en atributos `alt`, etiquetas de pieza y textos del bloque de prueba; 0 en head y JSON-LD; precios, `name` y `chq-*` iguales. Cadencia (`quincen|cada mes|mes a mes|al mes`) contada sobre la salida de `extraer.mjs`, campo por campo y ruta por ruta: en `72045f8` da **51** = 37 en `ranuras` + 0 en `atributos` + 12 en `jsonld` + 2 en `head` (medido hoy sobre el build de `72045f8`). **La QA de la Tanda B compara ese 51 con su desglose.** El 49 de las actas de E8 es el mismo corte sin `head` (su script no leía el head; `v3-chequeo.js` tiene 0), y el 52, un grep directo sobre el HTML.
- [ ] Ninguna pieza en dos páginas seguidas: `comm -12` de los `src` de `assets/img/e9/` (sin `-800`) entre cada par de la cadena de servicios (Desarrollo web → Visibilidad → Auditoría → Acompañamiento → Redes → Paid Media → Desarrollo web) y de artículos (21 chequeos → Cómo elegir → Mini-diagnóstico → Cuánto cuesta → Fintechs → Qué es AEO/GEO → Cómo aparecer → 21 chequeos): salida vacía.
- [ ] Cada pieza de lectura publicada tiene su cruda archivada en `e9/piezas/`, con la fecha de su etiqueta; Javiera compara **todas**, no una muestra. **Toda lectura de `spindlelab.cl` se recaptura contra lo que va a quedar publicado** (la vista previa `/v3/` o el día de la publicación), lleva la fecha de esa recaptura y su cruda dice qué URL se leyó; sin recaptura no se publica. El caso de hoy es `l3`: muestra el `FAQPage` de la portada v2 y la home v3 no lo tiene (el 85 de K2 también se midió sobre la v2).
- [ ] `l2`: la cadena «ClaudeBot/1.0» tiene su fuente archivada en `e9/piezas/crudo/` (`grep -F "ClaudeBot/1.0"`), o la fila dice «ClaudeBot» sin versión y `l2` se vuelve a rendir (Bruno; acta del tablero, defecto 4).
- [ ] Un oro por vista: `grep -ril "c9a227" e9/piezas/` = 0, y **toda imagen que sirve cada ruta**, no solo las de `public/assets/img/e9/` (también `obra/`, el retrato y cada `-800`), da ≤ 0,05 % con el criterio de §07b (tono 38 a 54°, saturación y brillo ≥ 0,5; `mascara_tono` de `marketing/brand/instagram-v3/medir.py`). Sobre 0,05 % la imagen cuenta como oro, y como el punto del módulo está en toda vista (spec §6 y §7:153), no va en ninguna. Medido hoy: `obra/mock-combeau-modelo-alto-2.jpg` **0,0594 %** y su `-800` 0,0551 %, en Desarrollo web y Trabajo, exceden el umbral: no pasan, y Lucía fija el reemplazo en la spec (la versión ancha mide 0,0095 % y su `-800` 0,0046 %).
- [ ] `grep -rlE "36 de 100|sacó 36|9 de septiembre" dist/v3` devuelve **solo** `trabajo/index.html`, que no tiene `chq-*` ni la captura 85/54.
- [ ] Cero prospectos: los dominios de `marketing/metricas/corridas-chequeo-2026-08-31-*.jsonl` (`grep -ho '"dominio": "[^"]*"' … | cut -d'"' -f4`) contra `dist/v3` y `e9/piezas/` con `grep -rFf`: 0. Ninguna pieza dice `quincen|cada mes|mes a mes|al mes|menciones` (grep en piezas, etiquetas y alt).
- [ ] K2, si la autorizas (§8.2): la captura se recorta al puntaje y el dominio de cada sitio, con la fecha en su pie. No se muestran el veredicto literal del instrumento (el del 85 dice «te cuestan menciones») ni los dos «Pedir el diagnóstico» que trae la imagen (acta del tablero, defectos 5 y 6). Así el grep anterior sigue en 0, sin excepción.
- [ ] Toda pieza con Raigal lleva el rótulo de concepto primero, legible a 390 en la primera pantalla. Cada JPEG nuevo tiene su `-800`, y el peso por página cumple lo que fije la spec.
- [ ] Capturas a 390, 768 y 1440 de las 13 interiores y la home, antes y después, en `e9/e9-antes-despues.md`.
- [ ] `curl -sI https://claude-magical-franklin-ckfk.spindlelab-v2.pages.dev/v3/` da 200 con `x-robots-tag: noindex`. Acta de Javiera: **Aprobado**.

## 7 · Lo que no se construye
1. Nada en la home fuera de esos 3 campos: ni hero, ni orden, ni el campo Desarrollo.
2. Ninguna de las tres pruebas nuevas sin tu marca. Lo no marcado se queda en el tablero.
3. Display en una interna: cero, también en el bloque de prueba (las cifras grandes van en 500, no en 800 mayúsculas).
4. Fotos de Unsplash, de stock o generadas, aunque sea «por ahora».
5. Casos de 20.000 px como driftime (`lock` §8): cada interna crece hasta donde llega el material real, no más.
6. Piezas con monitoreo de menciones o con una cadencia (R2 sigue abierta). Una tercera dirección.
7. Publicar, reencender Google Ads o tocar `spindlelab-site/`.

## 8 · Lo que decides en la compuerta
1. **Dirección:** 1 «Pantallas» o 2 «Lectura de máquina». Con eso queda cerrado el color del campo en las interiores (§7:195).
2. **Pruebas nuevas, una por una:** el 67 de 69 en Diagnóstico · la captura del chequeo de IA con 85 y 54 · el panel de Combeau.
3. **Combeau:** su ficha (`clientes/bernardo-combeau.md`:15) dice «caso público NO autorizado» y `brief-de-obra.md`:81 dice permiso verbal el 30-sep. ¿Hay permiso **escrito**? Sin él, Combeau sigue como hoy (obra con su rótulo) y el panel no se construye; con él, se archiva en la ficha y la ficha se corrige.
4. **Alcance de las filas:** ¿«Lo que incluye» («Todo parte con esto» en Desarrollo web), los planes, las preguntas y el cierre también cambian de forma? Sí o no; si sí, Lucía lo dibuja y Ramón lo ve antes de que Diego construya, con el texto de E8 igual. Las dos direcciones los dejan en filas, y es lo primero que marcaste.
5. **Compromiso de los 3 meses:** el texto aprobado tal cual, partido en tres (hoy «Plazo» termina en coma y «Resultado» parte en minúscula), o redactado por Clara en tres partes que se leen solas y prometen lo mismo. Sin esta respuesta, va el literal.

*Supuestos (se revierten en una línea): material por campo, Visibilidad → lecturas de máquina, Continuidad → lecturas de máquina (el retrato no se suma a la home), Alcance → piezas publicadas, Desarrollo → obra; «páginas seguidas» son las dos cadenas de «Siguiente».*

*Revisión 14-oct, 21:30 (Mauro), tras el acta del tablero (ronda 2): cierra en el brief los menores 6, 7, 8, 15, 16 y 17; el 4 queda como criterio de la Tanda B.*
