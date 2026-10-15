# Acta de QA · SpindleLab v3 · E10, selección de referentes · ronda 3 (la última interna)

> La escribe Javiera (`/web-qa-critico`) en contexto limpio: subagente nuevo, no escuchó a
> Lucía ni al orquestador. Leyó el plan `dazzling-snacking-river.md`, las rondas 1 y 2 (abajo),
> `referentes.json`, `referentes.md`, `referentes.html`, `files.json`, las capturas nuevas de
> Priya Parker, el manual de marca (§02 y §04) y el contrato de Artifact (`artifact-design` y
> `artifact-capabilities`, `db.d.ts`, `user.d.ts`, `claude.d.ts`, contrato 0.2.80).

**Fecha:** 15-oct-2026 · **Rama:** `claude/magical-franklin-ckfki2`, HEAD `c6be9ff` (la carpeta `e10/` entró en ese commit mientras se auditaba; lo auditado es idéntico a él: `git diff HEAD` sobre `e10/` solo muestra esta acta) · **Ronda previa:** ronda 2, con reparos (2 mayores, 9 menores)

**Qué se audita:** los 11 cierres que declara el orquestador, la coincidencia entre JSON, md y página, que el md no haya perdido secciones, y por primera vez `referentes.html`: contrato de Artifact, desborde, imágenes, contraste, foco y el script de `db`. **No entra:** los registros del paso 1 (`spec-visual.md` §7, `lock-driftime.md`, `pendientes-traspaso-revisados.md`).

## Veredicto

**APROBADO CON REPAROS.**

La selección quedó bien cerrada **en el md**: el defecto 2 de la ronda 2 se resolvió por la vía (b) con una lectura honesta que ahora tiene Ramón delante, y de los 9 menores, 7 están cerrados con evidencia y 2 a medias (5 y 7). La página cumple el contrato de Artifact entero, no desborda en ninguna de las 15 combinaciones medidas, carga sus 36 imágenes y su script de `db` pasa todas las pruebas del contrato con un `db` simulado.

Quedan **2 mayores**, los dos baratos:

1. **La página que va a ver Ramón no lleva todas las correcciones del md.** La definición vieja de «un sí a 11» («la home contada frase a frase») sigue en el JSON y en la página, y el riesgo de la 11 sigue diciendo «lo que se toma es el relato». Es el defecto 1 de la ronda 2, vivo en la ronda 3.
2. **En el teléfono las capturas no se pueden leer**: la de escritorio sale al 14,9 % de su tamaño y la del teléfono al 22,8 %, y no hay cómo ampliarlas. Los rasgos de la línea C y la letra de la B no se ven.

**Diagnóstico del defecto que sigue vivo (regla de la tercera ronda).** No es un problema del brief ni de la selección. La selección vive en tres copias hechas a mano (md, JSON y página), sin un generador, y cada corrección quedó en una sola copia. Por eso no hace falta una ronda 4: los dos mayores se cierran **antes de publicar** y el cierre se comprueba con los comandos del final de esta ronda. Si esos comandos no salen limpios, la página no se publica y esto sube a Ramón con este diagnóstico.

## Los cierres de la ronda 2, uno por uno

| # R2 | Qué era | Estado | Evidencia |
|---|---|---|---|
| 1 · mayor | 4, 5, 6 y 11 ofrecían una forma de escribir | **Cerrado en 4, 5 y 6. A medias en 11.** El «qué se toma» de las cuatro ya toma solo lo que se ve, y cada una dice «el texto de tu sitio se queda». En el md la definición de «un sí a 11» está corregida (líneas 30-36). Pero en la misma tarjeta 11 el riesgo dice «lo que se toma es el relato, no la imagen» y «lo propio de 11 es el ritmo, una frase grande por pantalla y en plural»; su «por qué cálido» se apoya en las frases («Habla en plural… "We believe…"»). Y la nota de la línea D en el JSON y en la página sigue con la definición vieja: «un sí a 11 es la home contada frase a frase sobre oscuro» | `grep -c "home contada frase a frase\|lo que se toma es el relato"`: JSON 2, md 1, página 2 |
| 2 · mayor | La línea D no mostraba un oscuro cálido | **Cerrado, vía (b).** La tesis dice «en estas capturas el oscuro se ve más tibio que cálido», nombra los tres oscuros con su lectura (pardo que apenas asoma, carbón que tira a frío, verde cerca del petróleo) y que el tablero tiene que probar un oscuro cálido. El «por qué cálido» de 10 ya no se apoya en el oscuro. Igual en JSON, md y página. Con esto el diagnóstico que la ronda 2 pedía subir a Ramón ya está delante de él | `referentes.md` línea 125; JSON `lineas[3].tesis`; página línea 337 |
| 3 | Selendy: retrato a color y coral | **Cerrado.** «La imaginería principal» (ya no «la única»), el retrato a color y el coral `rgb(239,72,82)` declarados como no tomados, en los tres archivos | JSON 10 |
| 4 | Olson: «con gente» | **Cerrado.** «en Olson, una bahía con un ferry» | md línea 32 |
| 5 | Dato del punto dorado | **Cerrado en el md, ausente en la página.** Las cifras calzan con la ronda 2. Falta la mitad que importa a D: el manual dice que un negro cálido tira el dorado a mostaza (§04, línea 123). Y en `referentes.html` no aparece (`grep C9A227` → 0) | md línea 11 (ver defecto 1) |
| 6 | Hoare, excepción sin explicar | **Cerrado.** «es la excepción… porque es el único ejemplo vivo de un verde casi negro con luz de lámpara» | JSON 12, riesgo |
| 7 | Partición izquierda y derecha | **A medias.** La frase «no es lo que se toma» está en 2, 3 y 12, pero el «qué se toma» de 12 sigue siendo «el primer pantallazo partido: mitad verde… y mitad foto» (defecto 3) | JSON 12 |
| 8 | Línea B de oficios creativos | **Cerrado.** «Los cuatro son de oficios creativos… mira el rasgo, no el rubro», en los tres archivos | tesis B |
| 9 | URL de Ink & Switch | **Cerrado.** `https://www.inkandswitch.com/essay/local-first/` en JSON, md y página; da 200, 111.169 bytes, `<title>` «Local-first software…» | curl, abajo |
| 10 | Asbury, letra de la captura | **Cerrado.** «en las capturas la serif que se ve no es Georgia» (va en el riesgo, no en la nota; vale igual) | JSON 6 |
| 11 | Barra naranja de Priya Parker | **Cerrado.** 1440 y 390 rehechas (archivos de las 18:50 UTC, que son las 15:50 de Chile que dice la nota); ninguna muestra la barra. La de 1440 es idéntica a la de comprobación de la ronda 2. La completa la sigue mostrando, y la nota lo dice | Read de `a/a5-priyaparker-1440.jpg` y `-390.jpg` contra `../qa-referentes/ronda-2/priya-sin-barra-1440.jpg` |

**JSON contra md:** los 12 `que_se_toma`, `por_que_calido`, `riesgo` y `url` y las 4 tesis son idénticos (comprobado con Python). Difieren la nota de D (vieja en el JSON, corregida en el md) y la de C (el md agrega la frase de Trail of Bits, que no cambia el sentido). **El md no perdió nada:** 12 tarjetas, 4 tesis, «Cómo se diferencian», «Qué significa un sí a 1 y un sí a 11», «Cómo se armó», «Cambios de la ronda 2» y los descartes completos al final.

## Cómo se verificó

- **URL:** `curl -sL` a las 12, 15-oct 18:55 UTC: las 12 dan **200** con su `<title>`. Ojo para quien repita: con `-A "Mozilla/5.0"` Olson Kundig devuelve 403 «Attention Required! | Cloudflare» (Cloudflare rechaza un agente que dice ser navegador y no lo es); con el agente de curl por defecto da 200 y 653.821 bytes, como en la ronda 2. No es un bloqueo nuevo.
- **Página:** servida con `python3 -m http.server` y medida con Playwright y Chromium 1194 en dos modos: el archivo crudo (como se pidió) y envuelto en el esqueleto que pone el Artifact al publicar (doctype, charset y viewport con `viewport-fit=cover`), que además quita el mojibake. Script `../qa-referentes/ronda-3/pagina-r3.mjs`, resultado en `medicion-r3.json`.
- **Tamaño real de las capturas en el teléfono:** `tamano-capturas.mjs` (390 × 844, DPR 3, modo móvil). Recorte: `tarjeta12-390-dpr3.png`.
- **Capturas de la página:** `pagina-{390,768,1440}-{light,dark}.png` y `pagina-390-con-marcas.png` (con el `db` simulado), en `../qa-referentes/ronda-3/`.
- **Coincidencia de archivos:** Python sobre JSON, md, página y `files.json`.
- **`git diff` sobre `spindlelab-astro/`:** vacío.

## La página contra el contrato de Artifact

| Regla | Resultado |
|---|---|
| Sin `<!doctype>`, `<html>`, `<head>` ni `<body>` | **Cumple.** Ninguna de las cuatro etiquetas; abre con `<title>` |
| `<title>` de 2 a 4 palabras, un nombre | **Cumple.** «Referentes del sitio», el nombre que fija el plan |
| `claude:viewport-fit-sides` junto con el gutter | **Cumple.** La meta va al lado del título y `.envoltorio` lleva `padding-left/right: max(16px, env(safe-area-inset-left/right, 0px))` con `padding-block` aparte |
| Colores como tokens en `:root`, oscuro bajo `@media (prefers-color-scheme: dark)` con `:root:not([data-theme="light"])` y bajo `:root[data-theme="dark"]` | **Cumple.** 10 tokens de color definidos primero en `:root`, redefinidos iguales en los dos bloques oscuros con `color-scheme: dark`. Ningún color literal fuera de `:root` |
| `body` con fondo | **Cumple.** `background: var(--fondo)` |
| Hojas externas solo de Google Fonts; ningún otro host | **Cumple.** Una hoja de `fonts.googleapis.com` (Newsreader, IBM Plex Sans y Mono, cada una con su respaldo), cero `<script src>`. Los otros hosts que aparecen son los 12 enlaces `<a href>` a los sitios, que abren afuera |
| `files.json` | **Cumple.** 36 rutas relativas, las mismas 36 que pide la página, todas en disco; 5,10 MB en total. Página 44 KB |
| Movimiento reducido, foco visible, `id` estable en cada campo | **Cumple.** `prefers-reduced-motion`, `:focus-visible` de 2 px y `id` en las 12 áreas de texto |

## Mediciones de la página

| Qué | Resultado |
|---|---|
| Desborde horizontal | `scrollWidth == clientWidth` en las **15** combinaciones: crudo a 390, 768 y 1440; con esqueleto a 390, 768 y 1440 en claro y en oscuro. Igual con los 24 `<details>` cerrados y abiertos. Ningún elemento sale del ancho |
| Imágenes | **36 de 36** cargadas en todas las combinaciones; `width` y `height` en las 24 de primera pantalla, que coinciden con el archivo (1440 × 900 y 780 × 1688) |
| Contraste | Texto mínimo **6,06:1** en claro (`--gris` sobre `--fondo`) y **6,50:1** en oscuro. Excepción: el placeholder de los comentarios usa el gris por defecto del navegador `#757575`: **4,08:1** en claro y **3,92:1** en oscuro (defecto 5) |
| Encabezados | Un `h1`, un `h2` por línea, un `h3` por tarjeta; `main` y `nav` reales |
| Tab | En modo sin guardar (botones y áreas deshabilitadas, que no reciben foco), 14 pasos en orden: el índice de líneas y luego, por tarjeta, enlace, «Ver la página completa» y «Lo que no se toma y los riesgos». Los 14 con contorno sólido de 2 px |
| Tamaño de las capturas a 390 | Escritorio **215 px** de ancho (14,9 %), teléfono **89 px** (22,8 %), cero enlaces para ampliarlas (defecto 2) |

### El script de `db`, contra el contrato

Probado con un `db` simulado que se comporta como dice `db.d.ts` (instantánea al suscribirse, escritura propia visible al tiro, confirmación a los 300 ms):

| Regla del contrato | Resultado |
|---|---|
| `await window.claude.use('db')`; `null` → modo sin guardar | **Cumple.** Sin `window.claude`: aviso visible, los 24 botones y las 12 áreas de texto deshabilitados, cero errores de consola |
| `can('data.write')`: `false` deja sin guardar, `null` mantiene los controles | **Cumple.** Con `false`: cero suscripciones, cero escrituras, aviso visible. Con `null`: controles activos |
| Suscripción una sola vez | **Cumple.** 1 `onSnapshot` sobre `marcas`, fuera del pintado. Una marca ya guardada (11, sí, con comentario) se pinta al cargar y la cuenta queda en 1 |
| Nada de escritura al cargar | **Cumple.** 0 escrituras en 2 s |
| Una escritura a la vez por documento | **Cumple.** Doble clic rápido en el 2: dos `set` en fila, el segundo después de confirmar el primero; máximo en vuelo por documento, 1. Comentario en el 4 y clic inmediato en «No»: dos `set` en fila y el segundo conserva el comentario |
| Solo cuando cambia, agrupando ráfagas | **Cumple.** Un comentario escrito da 1 `set` tras la pausa de 1,2 s; salir del campo sin cambiarlo da 0 |
| `invalid_argument` → solo lectura | **Cumple.** Pasa a modo sin guardar con «Esta vista no puede guardar. Respóndeme por el chat.» |
| Error de la suscripción | **No se maneja** (defecto 6) |

Para el publicador: la página necesita `capabilities: {db: {}}` (`can()` no pide declarar `user`). Los documentos se llaman como el `id` de la tarjeta (`a1-gehl`), no por su número; el JSON tiene los dos para cruzarlos al leer las marcas.

## Defectos

Ninguno bloqueante.

| # | Sev. | Dónde | Qué está mal | Contra qué | Cómo se reproduce | Cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | **mayor** | `referentes.html` y `referentes.json` (y la tarjeta 11 también en el md) | La página que va a ver Ramón no lleva las correcciones del md. **(a)** La nota de la línea D define «un sí a 11» como «la home contada frase a frase sobre oscuro»: la definición que la ronda 2 pidió corregir. **(b)** El riesgo de 11 dice «lo que se toma es el relato, no la imagen», «lo propio de 11 es el ritmo, una frase grande por pantalla y en plural» y «Comparte con 4 · Nick Parker la prosa que hace de menú», y su «por qué cálido» se apoya en las frases del sitio: la tarjeta se contradice con su propio «qué se toma». **(c)** La página no tiene la introducción del md: «un sí es un sí al rasgo, no al color ni al rubro», «el texto de tu sitio se queda» (en la página solo está dentro de cuatro desplegables cerrados) ni el dato del punto dorado. Con (a) y (b), un sí a 11 en la página sigue siendo un sí a reescribir la home | Ronda 2, defecto 1 y menor 5; plan: «El texto se queda… Solo cambia cómo se ve» | `grep -c "home contada frase a frase\|lo que se toma es el relato" referentes.*` → JSON 2, md 1, html 2 · `grep -c C9A227 referentes.html` → 0 | Reemplazar la nota D en el JSON y en la página por la definición del md (líneas 34-36). En la tarjeta 11, en los tres archivos: «lo que se toma es la frase grande sobre el pardo, no la imagen ni el relato»; quitar «y en plural» y la frase de la prosa que hace de menú; el «por qué cálido», con el pardo y el aire, sin citar las frases. Llevar a la cabecera de la página las tres líneas del md (rasgo, texto, punto dorado) y sumar al dato del punto la mitad que falta: sobre un negro cálido el manual advierte que el dorado tira a mostaza (§04, línea 123). Mejor aún: generar la página desde el JSON con un script, para que la próxima corrección caiga en un solo lugar |
| 2 | **mayor** | `referentes.html`, `.ref__vistas` a 390 | En el teléfono, el aparato que nombra el plan, la captura de escritorio se ve a **215 px** (14,9 %) y la del teléfono a **89 px** (22,8 %), sin forma de ampliarlas. A esa escala TimesNow de 28 px queda en 4 px y Trirong de 51,8 px en 8 px. Lo que piden mirar la línea C (ficha de autoría, notas al margen) y la letra de la B (Lector, versalitas, Roslindale) no se ve; la foto y el color de A y D sí. La página empuja a reaccionar a la foto | Plan, paso 1.3: «una página privada… que se lee en el teléfono»; encargo, punto 4 (cada «qué se toma» es concreto: tiene que poder verse) | `tamano-capturas.mjs` → `{"escritorio":215,"telefono":89,"enlaces":0}`; `tarjeta12-390-dpr3.png` | Bajo 640 px, apilar las dos capturas a todo el ancho de la tarjeta (la del teléfono queda en unos 320 px, el 82 %), y dar una forma de abrir cada captura en grande: un enlace a su archivo (comprobarlo en la página publicada) o un toque que la despliegue a todo el ancho dentro de la página. Volver a correr `tamano-capturas.mjs` |
| 3 | menor | 12 · Hoare, «qué se toma» | Sigue a medias el menor 7 de la ronda 2: el rasgo es «el primer pantallazo partido: mitad verde… y mitad foto» y el riesgo de la misma tarjeta dice que la partición no es lo que se toma | `anti-ai-slop.md`, «Hero with left text + right image» | JSON 12 | Reescribir el rasgo sin «partido» ni «mitad»: el campo verde casi negro con el titular en Trirong 300 en mayúsculas, y la foto de luz de lámpara |
| 4 | menor | Cabecera y fichas de la página | La cabecera dice «Ninguno tiene bandas de color», y Ramón va a ver bandas en las completas de The Ready (amarilla y berenjena), Priya Parker (negro y lila) y Gehl (celeste); el md dice, bien, «como recurso principal». Y las fichas muestran el tipo crudo del JSON («servicios-b2b», «otro»), cuando el md lo dice en castellano («banca privada», «estudio de litigios comerciales») | Exactitud; marca 1 de Ramón | página líneas 79, 98, 396 | «Ninguno usa bandas de color como recurso principal» y el tipo como lo dice el md |
| 5 | menor | Área de comentario | El placeholder usa el gris por defecto del navegador `#757575`: 4,08:1 en claro y 3,92:1 en oscuro, bajo 4,5:1. Es el único color de la página que no sale de un token | WCAG 1.4.3; contrato de tokens | `medicion-r3.json` → `contraste-*` | `.ref__com textarea::placeholder { color: var(--gris); }` (6,06:1 y 7,06:1) |
| 6 | menor | Script de `db` | `onSnapshot(…, () => {})` traga el error terminal (`revoked`, o `unavailable` cuando el puente muere): la página sigue con los controles activos y, al fallar el guardado, dice «Prueba de nuevo», que no va a funcionar. Además los botones están activos y no hacen nada hasta que `use('db')` responde (hasta 10 s) | `db.d.ts`: «handle the lifecycle rejection codes on calls and the onSnapshot error callback» | lectura de la página, líneas 448-451 y 441 | En el callback de error, llamar a `sinGuardar()`; empezar con los controles deshabilitados y habilitarlos cuando llega el `db` |
| 7 | menor | `referentes.md` | La tarjeta 12 repite casi palabra por palabra el bloque «Lo que no se toma: el dorado» dentro de su riesgo, y el md no anota los cambios de esta ronda como sí anotó los de la ronda 2 | Coherencia y trazabilidad | md líneas 145-146 y 161-166 | Dejar el dorado una vez y sumar «Cambios de la ronda 3» |

## Detector anti-slop (ronda 3)

Sobre la selección: sin cambios contra la ronda 2, salvo lo cerrado (✔ acento coral declarado; ! partición, a medias en 12, defecto 3). Sobre la página, que es una herramienta interna y no el sitio:

```
COPY       es-CL, tú consistente, cero rayas de remate (grep «—» → 0). Una afirmación de
           más: «Ninguno tiene bandas de color» (defecto 4). Botones que dicen lo que hacen
           («Sí», «No», «Guardado», «Marca quitada»). ✔
ESTRUCTURA Numeración 1 a 12 con sentido (es la referencia para responder por número). ✔
CÓDIGO     Contrato de Artifact completo, foco visible, movimiento reducido. Placeholder
           fuera de los tokens (defecto 5). ✔ con un reparo
VISUAL  !  Papel cálido con serif de titular (Newsreader sobre #f3f1ec): el racimo «crema con
           serif» del propio detector. Abierto con porqué: es una mesa de revisión interna y
           no compite con las capturas, pero viste la página con el aire de las líneas A y B.
           No es defecto; se anota para que nadie lo lea como una dirección
PRUEBAS    n/a  La página no es el sitio.
```

## Lo que está bien (y conviene no perder)

- **La vía (b) quedó escrita como se pidió:** la tesis de D le dice a Ramón, en su idioma, que lo que ve es tibio y que el tablero tiene que probar el cálido. Eso convierte el riesgo en una pregunta suya y no en una sorpresa en la compuerta 2.
- **El script de `db` está bien hecho:** pasó las ocho pruebas del contrato que se le pudieron hacer, incluido el caso difícil (comentario y clic al mismo tiempo, en fila y sin perder el comentario).
- **La página es sólida:** cero desborde en 15 combinaciones, 36 imágenes, contraste del texto sobre 6:1 en los dos temas, contrato de Artifact sin una falta.
- **7 de 9 menores cerrados del todo en una pasada**, con cifras que siguen calzando con la medición.

## Cómo se cierra sin ronda 4

Antes de publicar, quien cierre deja en el chat la salida de estos comandos, corridos en `referentes/`:

1. `grep -c "home contada frase a frase\|lo que se toma es el relato\|y en plural" referentes.json referentes.md referentes.html` → **0** en los tres.
2. `grep -c "C9A227" referentes.html` → **1 o más**, y `grep -c "rasgo" referentes.html` → **3 o más** (hoy 2; falta la línea «un sí es un sí al rasgo» en la cabecera).
3. `NO_PROXY=127.0.0.1 node ../qa-referentes/ronda-3/tamano-capturas.mjs ../qa-referentes/ronda-3` (con `python3 -m http.server 8765` sirviendo `referentes/`) → `telefono` de **300 o más**, o `enlaces` de **24**.
4. `node ../qa-referentes/ronda-3/pagina-r3.mjs ../qa-referentes/ronda-3` → sigue sin desborde y con 36 de 36.

Los menores 3 a 7 se cierran en la misma pasada si se puede; si no, se publica igual y quedan anotados. Si los comandos 1 a 3 no salen como se indica, la página no se publica y el defecto 1 sube a Ramón con el diagnóstico de arriba.

---

# Acta de QA · SpindleLab v3 · E10, selección de referentes · ronda 2

> La escribe Javiera (`/web-qa-critico`) en contexto limpio: subagente nuevo, no escuchó a
> Lucía. Leyó el plan `dazzling-snacking-river.md`, el acta de la ronda 1 (abajo),
> `referentes.json`, `referentes.md`, las 36 capturas, el manual de marca, el texto de E8 de
> la home v3 (`spindlelab-astro/src/pages/v3/index.astro`, solo lectura) y los dos detectores.

**Fecha:** 15-oct-2026 · **Rama:** `claude/magical-franklin-ckfki2` (carpeta `e10/` sin commit; HEAD `7a77bed`) · **Ronda previa:** ronda 1, con reparos (4 mayores, 7 menores)

**Qué se audita:** la selección corregida, con los 5 puntos del encargo comprobados de nuevo con evidencia propia, y lo que cambió desde la ronda 1. **No entra:** `referentes.html` (todavía no existe) ni los registros del paso 1. Comprobado que siguen pendientes: `spec-visual.md` no tiene fila del 15-oct, `lock-driftime.md` no tiene el encabezado «reemplazado» y `pendientes-traspaso-revisados.md` no menciona E10.

## Veredicto

**APROBADO CON REPAROS.**

Los 4 mayores de la ronda 1 están cerrados y se comprobaron uno por uno: Trail of Bits salió, la completa de Selendy Gay ahora muestra el sitio, el oro de Hoare se presenta como lo que no se toma y Gehl y Olson Kundig ya ofrecen cosas distintas. Los 12 sitios dan 200, ninguno con desafío, y las cifras nuevas de las tarjetas calzan con la medición.

Quedan **2 mayores nuevos**, los dos de fondo y los dos baratos de cerrar con texto:

1. Dos tarjetas, 11 y 4, ofrecen como rasgo una forma de **escribir** la home, y el plan dice que el texto de E8 se queda.
2. La línea D, la única que propone lo oscuro, **no muestra un oscuro cálido**: su propia tesis dice que la calidez la pone la temperatura del oscuro, y dos de sus tres tarjetas dicen que su oscuro es frío o cercano al petróleo que Ramón marcó.

Además, de los 7 menores de la ronda 1, **5 siguen abiertos sin una línea de porqué** (7, 8, 9, 10 y 11), y uno sube a mayor (el 6, que es parte del defecto 2 de esta ronda). Varios cuestan un minuto: cambiar una URL, agregar una nota, cerrar una barra con su ×.

**Plazo del reparo:** los 2 mayores se cierran antes de publicar la página `Referentes del sitio` a Ramón. La ronda 3 es la última interna: si el defecto 2 sigue vivo ahí, deja de ser un problema de la selección y sube a Ramón con diagnóstico (la línea D quizá no tiene buenos ejemplos vivos y hay que decírselo así).

## Los 4 mayores de la ronda 1

| # R1 | Qué era | Estado | Evidencia |
|---|---|---|---|
| 1 | Trail of Bits mostraba el aspecto de agencia tech que Ramón rechazó | **Cerrado.** Retirado del JSON, del md y del disco (`c/` no tiene sus capturas). La línea C dice que no tiene home de firma de modelo, y la búsqueda de reemplazo quedó escrita con sus motivos | `referentes.md` líneas 103 y 219-225 |
| 2 | Gehl (A) y Olson Kundig (D) ofrecían el mismo rasgo | **Cerrado en el texto.** La tesis de D ya no se apoya en la foto, Olson ofrece el relato frase a frase, y el md explica qué significa un sí a 1 y un sí a 11. El rasgo nuevo de 11 abre el defecto 1 de esta ronda | `referentes.md` líneas 28-34 |
| 3 | La completa de Selendy Gay no mostraba el sitio | **Cerrado.** Las cuatro secciones salen con texto (Find Your Lawyer con su buscador, las 10 prácticas y «All Practices», Our instilled values, Work with us, Write / Call / Visit Us), sin costuras repetidas | `../qa-referentes/ronda-2/selendy-arriba-zoom.jpg`, `selendy-people-zoom.jpg`, `selendy-abajo-zoom.jpg` |
| 4 | El oro de Hoare se presentaba como la regla de SpindleLab | **Cerrado.** El dorado va en «Lo que no se toma», con las citas correctas del manual (§02 línea 76 y §06 líneas 242-243). Titular corregido: medido `Trirong` 51,84 px, peso 300, `text-transform: uppercase` | `hoare-titular.mjs` |

**Menores de la ronda 1:** el 5 está a medias (abajo, defecto 6). El 6 sube a mayor y queda dentro del defecto 2. Los 7, 8, 9, 10 y 11 siguen igual que en la ronda 1, sin cambio ni nota en la tarjeta (abajo, defectos 7 a 11).

## Cómo se verificó

- **Respuesta HTTP:** `curl -sL` a las 12 URL del JSON, 15-oct, 18:33 UTC. Las 12 dan **200**, cada una con el `<title>` de su sitio. Registro: `../qa-referentes/ronda-2/curl-200.txt`.
- **Anti-robots:** las palabras clave que aparecen en 2, 3 y 6 son `captchaSettings` de Squarespace (formulario de donaciones) y en 11 el script pasivo `/cdn-cgi/challenge-platform/scripts/jsd/` de Cloudflare. Las cuatro páginas traen su contenido real. En Playwright las 12 cargaron sin desafío.
- **Capturas:** las 36 miradas con Read, más recortes ampliados de la completa de Selendy. Ninguna en blanco y ninguna con un modal encima. Lo que tapa algo es del propio sitio y está declarado: la barra naranja del libro de Priya Parker, la franja amarilla de «edición anterior» del Web Almanac y la franja negra «Tenfold» de Ink & Switch. Cada una corresponde a su sitio (`<title>` y texto visible).
- **Mediciones en el navegador:** `../qa-referentes/ronda-2/medir-r2.mjs` y `hoare-titular.mjs` (Playwright, Chromium 1194, 1440×900, recorriendo la página antes de medir; Olson en `reducedMotion: reduce`, como se capturó). Resultado en `medicion-r2.json`. Ojo: ahí el «titular» de Hoare es un `h1` oculto en Lato; el visible es el `<a>` en Trirong que mide `hoare-titular.mjs`.
- **Contraste del punto dorado** `#C9A227` sobre cada lienzo de la selección, calculado con la fórmula WCAG (defecto 5).
- **Peso y rutas:** con Python sobre `referentes.json` y el disco.
- **Texto de E8:** leído en `src/pages/v3/index.astro` para contrastar los rasgos que dependen del texto (defecto 1).
- **`git diff` sobre `spindlelab-astro/`:** vacío.

### Los 5 puntos del encargo

| # | Criterio | Resultado | Evidencia |
|---|---|---|---|
| 1 | 12 a 16 referentes en 4 líneas, numeración corrida | **Cumple.** 12: A 3, B 4, C 2 y D 3. Del 1 al 12 en el JSON y en el md, sin saltos, y la renumeración de D está explicada | Python sobre el JSON |
| 1 | Cada URL da 200 hoy, ninguna tras un desafío | **Cumple, con el mismo menor de la ronda 1.** 12 de 12. La de Ink & Switch sigue siendo un esqueleto de 152 bytes que redirige (defecto 9) | `curl-200.txt`, filas 8 y 8b |
| 2 | Capturas no en blanco, sin modal, del sitio correcto | **Cumple en las 36.** La completa de Selendy ya muestra el sitio. La barra naranja de Priya Parker se cierra limpio con su × (comprobado), y sigue en la captura (defecto 11) | Read de las 36 · `priya-sin-barra-1440.jpg` |
| 3 | 4 líneas de verdad distintas | **Cumple con un reparo.** A, B y C se separan claro. D se separa de A por el modo (oscuro contra claro) y el md lo explica bien, pero lo que hace a D «cálida» no se ve en sus capturas (defecto 2) | capturas de `d/` |
| 3 | Al menos la mitad son servicios B2B o independientes | **Cumple.** 8 de 12: 4 de servicios B2B (Gehl, The Ready, Nick Parker, Selendy Gay) y 4 independientes (Priya Parker, Stefaner, Asbury, Santa Maria). Los 4 de la línea B siguen siendo de oficios creativos (defecto 8) | `referentes.json`, campo `tipo` |
| 3 | Ninguno con bandas de color saturado como recurso principal; ninguno parecido a driftime | **Cumple.** Ninguno junta negro, display gigante en mayúsculas y campos. Lo saturado que hay está declarado (bandas bajo el pliegue de The Ready, Priya Parker y Gehl). Sin declarar: el acento coral de Selendy (defecto 3) | capturas `completa` |
| 3 | Ninguno cae en un look de IA | **Cumple como rasgo tomado**, con dos advertencias abiertas: la composición texto a la izquierda y foto a la derecha, que ahora toman tres tarjetas (defecto 7), y el rasgo de Olson, que deja sin foto a una referencia que vive de la foto (tell #9, ver detector) | detectores, abajo |
| 4 | Cada «qué se toma» es concreto | **Cumple.** Los 12 nombran un recurso. Pero 11 y 4 nombran un recurso de **texto**, que el plan deja fuera (defecto 1) | JSON, `que_se_toma` |
| 4 | Cada «por qué cálido» responde a la marca de Ramón | **No cumple en la línea D.** 10 (Selendy) apoya su calidez en la serif y el marfil, y su riesgo dice que su oscuro es «neutro tirando a frío». 12 (Hoare) la apoya en parte en la foto, que la tesis de D dice que no es la fuente (defecto 2) | JSON, `por_que_calido` y `riesgo` de 10 y 12 |
| 5 | Cada imagen < 1 MB, total < 25 MB, rutas existen | **Cumple.** 36 imágenes, total **5,10 MB**, la mayor **278 KB** (`c4-inkandswitch-completa.jpg`). Las 36 rutas existen y no hay huérfanas | Python |
| | `git diff` sobre `spindlelab-astro/` | **Vacío** | `git diff --stat HEAD -- spindlelab-astro/` |

### Lo que cambió en las tarjetas, medido

| # | Afirmación | Medido |
|---|---|---|
| 11 | Siete pantallas con una frase cada una, Inter 500 de 48 px; desde la segunda, cada frase termina en el enlace a su sección | 7 frases en `InterVariable` 48 px peso 500; las 6 últimas terminan en su enlace («Learn about our practice.», «View our projects.», «Meet our team.», «Learn about our culture.», «See how we work.», «Play.») ✔ |
| 11 | El negro es un pardo #181213 | Fondo del documento `rgb(24,18,19)`, en los 6.491 px de alto ✔. En las 3 capturas lo tapan las fotos: solo se ve plano en el pie, como dice la tarjeta |
| 12 | Trirong 51,8 px, peso 300, en mayúsculas | `Trirong` 51,84 px, 300, `uppercase` ✔ |
| 12 | Oros: antetítulo rgb(163,135,71); «Who we are» y «Services» rgb(137,111,17) | Los tres ✔ |
| 10 | Completa con las cuatro secciones con texto; 10 prácticas | ✔ (ver mayores de la ronda 1) |
| 10 | «La única imaginería son fotos en blanco y negro de las obras de arte» | ✘ La sección People muestra un **retrato a color** de un socio (rota; en la captura, Kelley Cornish). El propio md lo dice en la nota de captura (defecto 3) |
| 10 | Sin acento declarado | ✘ Acento coral `rgb(239,72,82)` en 8 elementos: «Keep reading», flechas, botón de búsqueda, teléfono (defecto 3) |
| md | Renumeración 11→10, 12→11, 13→12 con los archivos sin renombrar | ✔ JSON, md y rutas coinciden |

## Defectos

Ninguno bloqueante.

| # | Sev. | Dónde | Qué está mal | Contra qué | Cómo se reproduce | Cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | **mayor** | 11 · Olson Kundig y 4 · Nick Parker (también 5 y 6) | El rasgo ofrecido es una forma de escribir la home, no de verla. 11: «la home contada como un relato […] cada frase termina en el enlace a su sección, dentro de la misma oración», y el md define «un sí a 11» como «un sí al relato». 4: «el párrafo de presentación en primera persona que hace de menú». La home de E8 no tiene ninguna de las dos cosas: es ojillo y titular («Estás pagando para que lleguen a tu sitio. / Ahí se corta el circuito»), el chequeo, el párrafo guía, los campos con su precio, «No te prometo. Te muestro.» y el índice del blog. Ninguna frase termina en un enlace y no hay un párrafo con las ofertas enlazadas. Un sí a 11 o a 4 solo se cumple reescribiendo texto. Lo mismo, en menor grado: 5 toma una apertura «Hi. My name is…» que E8 no tiene, y 6 un hero con «una sola frase […] y nada más», cuando el hero de E8 lleva el chequeo. La ronda 1 no lo vio en 4; en 11 aparece con el rasgo nuevo | Plan, contexto: «El texto se queda: el copy de E8 […] Solo cambia cómo se ve». El md lo repite en la línea 11 («El texto del sitio no cambia») | JSON, `que_se_toma` de 4, 5, 6 y 11; `referentes.md` líneas 33 y 134; `spindlelab-astro/src/pages/v3/index.astro` líneas 191-290 | En cada tarjeta, separar lo que se ve de lo que se escribe. Lo que se ve se toma: una idea por pantalla, abajo a la izquierda, en sans 500 de 48 px sobre el pardo (11); los enlaces en versalitas negritas dentro de la prosa y el papel (4); el avatar, la grotesca 300 y el único llamado en serif cursiva (5); el titular solo con su muro de pruebas debajo (6). Lo que se escribe queda dicho como **fuera de alcance**: si Ramón lo quiere, es un encargo aparte para Clara que él aprueba. Corregir igual la definición de «un sí a 11» en el md |
| 2 | **mayor** | Línea D completa (10, 11 y 12) | La línea no muestra lo que promete. Su tesis, reescrita en esta ronda, dice que «la calidez la ponen la temperatura del oscuro y el tono de lo que se dice, no la foto». Medido y según sus propias tarjetas: **10 · Selendy**: carbón `rgb(32,38,37)`, con el verde y el azul por sobre el rojo, y su riesgo dice «temperatura neutra tirando a fría»; su «por qué cálido» se apoya en la serif y el **marfil**, o sea en la parte clara. Es el menor 6 de la ronda 1, que no se tocó y ahora choca con la tesis. **12 · Hoare**: verde `rgb(0,51,46)`, que su riesgo pone «cerca del petróleo de driftime que marcaste», y parte de su calidez la pone la foto («luz de lámpara sobre madera y tela»). **11 · Olson**: el pardo cálido existe, pero en las 3 capturas lo tapan las fotos, y la tarjeta pide no tomar la foto. Resultado: en la única línea que propone lo oscuro como modo, ninguna captura muestra un oscuro cálido cargando la página. Un sí o un no a D va a ser una reacción a un carbón frío, a un verde petróleo o a fotos. Si Ramón dice sí a 10 y 12, el lock hereda los dos oscuros que la selección misma llama fríos | Plan, paso 1 («cálida y de confianza sin bandas de color»; punto de partida de D: «tonos de tierra, sin colores saturados»); marca 2 de Ramón (frío); encargo, punto 4 | JSON, `tesis` de D y `riesgo` y `por_que_calido` de 10 y 12; capturas `d/*`; `medicion-r2.json` | Una de dos. **(a)** Cambiar a Selendy por un sitio cuyo oscuro sea cálido a la vista y cargue más que el primer pantallazo, que pase los mismos 5 puntos. **(b)** Dejar los tres y decirlo como es: en la entrada de D, los tres oscuros medidos lado a lado con su lectura honesta (carbón frío, verde cerca del petróleo, pardo), para que Ramón marque la temperatura y no solo el sitio; reescribir el «por qué cálido» de 10 sin apoyarlo en el oscuro (su aporte propio es la alternancia de carbón y marfil y el dato grande con su sujeto); y escribir que el pardo cálido de la tesis solo se ve en el pie de Olson, así que el tablero de la compuerta 2 tiene que probarlo |
| 3 | menor | 10 · Selendy Gay, «qué se toma» | Dice «la única imaginería son fotos en blanco y negro de las obras de arte de su propia oficina». La sección People lleva un retrato **a color** de un socio, que rota, y la nota de captura del mismo md lo menciona. Y el sitio usa un acento coral `rgb(239,72,82)` en 8 elementos («Keep reading», las flechas, el botón de búsqueda, el teléfono, «All Practices») que la tarjeta no declara | Coherencia interna; plan, punto de partida de D («sin colores saturados») | `../qa-referentes/ronda-2/selendy-people-zoom.jpg`; `medicion-r2.json` → `selendy.acentos` | Corregir la frase (las obras en blanco y negro más los retratos de socios a color) y agregar al riesgo el acento coral como algo que no se toma |
| 4 | menor | `referentes.md`, «Qué significa un sí a 1 y un sí a 11» | Dice que Gehl y Olson «tienen la misma primera pantalla: foto a sangre **con gente**». La primera pantalla de Olson es la vista de una bahía con un ferry a través de un ventanal, sin personas; la gente aparece desde la cuarta pantalla | Exactitud de la tarjeta | `d/d1-olsonkundig-1440.jpg` y `-390.jpg` | Cambiar a «foto a sangre y una frase en sans blanca abajo a la izquierda» |
| 5 | menor | Selección completa (falta una línea en el md) | No le dice a Ramón lo que su elección le cuesta al único signo gráfico de la marca. Calculado: el punto dorado `#C9A227` da **2,16 a 2,40:1** sobre los lienzos claros de A, B y C (blanco roto de The Ready 2,40; papel de Nick Parker 2,16; hoja de Santa Maria 2,16; blanco de Ink & Switch 2,36; marfil de Selendy 2,24), y **5,74 a 7,65:1** sobre los oscuros de D (verde de Hoare 5,74; carbón de Selendy 6,36; pardo de Olson 7,65). El manual dice que bajo 3:1 el punto va en el color del texto y esa vista queda sin oro (§02, líneas 88-91), y que un negro cálido tira el dorado a mostaza (§04, línea 123) | `manual-de-marca.md` §01 (el punto dorado como única firma gráfica), §02 y §04 | Cálculo WCAG de luminancia relativa con los hex medidos | Agregar en la introducción del md una línea neutra: «si eliges un lienzo claro, el punto dorado no llega a 3:1 y el manual lo saca de esa vista; si eliges un oscuro cálido, el manual advierte que el dorado tira a mostaza. Las dos cosas se resuelven en el lock». No decide nada por Ramón: le da el dato |
| 6 | menor | `referentes.md`, descartes de D (línea 231) y tarjeta 12 | El menor 5 de la ronda 1 quedó a medias. La intro y la tabla se corrigieron, pero el descarte de Lake Flato, LPAS, Macfarlanes y otros por «solo el hero es oscuro y el resto claro» sigue sin explicar por qué Hoare, que es justo ese caso (su riesgo lo dice), sí entra | Coherencia interna de la curaduría | `referentes.md` líneas 144 y 231 | Una línea en la tarjeta 12: por qué Hoare es la excepción a ese criterio (por ejemplo, que se toma solo su primer pantallazo y no un modo de sitio) |
| 7 | menor | 2 · The Ready, 3 · Priya Parker y ahora 12 · Hoare | Sigue abierto el menor 7 de la ronda 1, y suma una tarjeta: las tres toman como rasgo la composición «titular a la izquierda, foto a la derecha», que `refero-design` nombra como síntoma genérico. Hoare la toma entera («el primer pantallazo partido […] mitad foto»). Ninguna de las tres lo advierte | `anti-ai-slop.md`, «Layout symptoms: Hero with left text + right image» | JSON, `que_se_toma` de 2, 3 y 12 | Aislar lo propio de cada una (la foto de taller con grano; el retrato con la entradilla en serif sobre arena; el campo verde con el titular en serif ligera) y marcar la partición izquierda y derecha como lo que no se toma, o como el riesgo |
| 8 | menor | Línea B completa | Sigue abierto el menor 8 de la ronda 1: los cuatro son de oficios creativos (dos redactores, un diseñador, un visualizador de datos) y la línea no lo advierte, cuando la marca 2 de Ramón es justamente «se siente como estudio de diseño» | Marca 2 de Ramón | `referentes.md` líneas 65-95 | Una línea en la entrada de B: los cuatro vienen de oficios creativos, y lo que hay que mirar es el rasgo (retrato, firma, columna de rótulos), no el rubro |
| 9 | menor | 8 · Ink & Switch, `url` | Sigue abierto el menor 9 de la ronda 1. `https://www.inkandswitch.com/local-first/` da 200 con 152 bytes: un esqueleto `noindex` con `meta refresh` a `/essay/local-first`. La página capturada es otra | Encargo, punto 1 | `curl-200.txt`, filas 8 y 8b | Cambiar la URL a `https://www.inkandswitch.com/essay/local-first/` (200, 111 KB, `<title>` «Local-first software: You own your data, in spite of the cloud») en el JSON y en el md |
| 10 | menor | 6 · Asbury, nota de captura | Sigue abierto el menor 10 de la ronda 1. El sitio pide Georgia, que este contenedor no tiene (`fc-match Georgia` → DejaVu Serif), y la captura muestra la serif de reemplazo del navegador. Ramón vería otra letra en su Mac | Encargo, punto 2 | `fc-match Georgia`; `b/b4-asbury-1440.jpg` | Agregar a la nota: «la letra de la captura no es Georgia; en un Mac o un iPhone se ve Georgia» |
| 11 | menor | 3 · Priya Parker, 1440 y 390 | Sigue abierto el menor 11 de la ronda 1. La barra naranja `rgb(244,106,60)` del libro sale arriba en las dos primeras pantallas, en una selección que existe porque Ramón rechazó los colores de campo. La nota nueva dice que «quedó tal cual», sin decir por qué. **Comprobado en esta ronda:** su botón «Close Announcement» la cierra limpio | Marca 1 de Ramón; regla del encargo para avisos con botón visible | `a/a5-priyaparker-1440.jpg` contra `../qa-referentes/ronda-2/priya-sin-barra-1440.jpg` | Volver a capturar 1440 y 390 después de cerrarla con su ×, y anotarlo. O escribir en la nota por qué se deja |

## Detector anti-slop (ronda 2)

Como en la ronda 1, se corre sobre **el rasgo que cada tarjeta propone tomar**. Lo que es del sitio que se va a construir queda abierto con su porqué.

```
COPY       n/a  Textos ajenos; el copy de E8 no cambia. Pero dos rasgos SON copy (defecto 1).
               El md, en su propio registro: sin raya de remate, sin Title Case, tú
               consistente, es-CL. ✔
ESTRUCTURA n/a  Es del sitio. Ningún rasgo tomado es una fila de métricas sin fuente ni
               tarjetas iguales. ✔
CÓDIGO     n/a  Se audita en la QA de construcción (paso 3).
VISUAL     refero-design, rasgo por rasgo:
  □→✔ acento no índigo: ninguno lo toma
  □→✔ tarjetas: ninguna grilla de tarjetas se toma (Trail of Bits salió; la de Web Almanac
       se excluye)
  □→✔ sin franja lateral de acento · sin emoji (los minilogos de Nick Parker, advertidos)
  □→!  modo oscuro (tell #3): D lo propone como opción y Ramón no prohibió el negro. Queda
       abierto para la compuerta 2, no por defecto
  □→!  serif editorial (tell #4): 7 de 12 se apoyan en una serif sobre claro (Gehl, Priya
       Parker, Nick Parker, Asbury, Santa Maria, Ink & Switch y el marfil de Selendy).
       Advertencia vigente para el lock: si Ramón marca varias, Lucía elige una dominante
  □→✘ acento declarado: el coral de Selendy no se declara (defecto 3)
  □→✘ composición izquierda y derecha: la toman 2, 3 y 12 sin advertirlo (defecto 7)
  □→✔ rasgos fuertes no promediados: 1 y 11 ya ofrecen cosas distintas y el md dice que
       no se promedian. Vigilar D: si Ramón marca dos oscuros de temperatura opuesta, el
       lock elige uno (defecto 2)
  □→✔ rol del token: el oro de Hoare queda fuera con su regla citada
  □→!  rol de la imagen (tell #9): el rasgo de 11 saca la foto de una referencia que vive
       de la foto. La tarjeta lo dice y deja la prueba al tablero («que siete frases sin
       foto no se lean vacías»). Abierto con porqué; se mide en la compuerta 2
  □→✔ mayúsculas con tracking: n/a en la selección
PRUEBAS    n/a  Se aplican al tablero y al sitio. La versión que aplica: ¿cada tarjeta se
               entiende sin el nombre del sitio? Sí, salvo en D, donde sin la palabra
               «cálida» las capturas no dicen cálido (defecto 2).
```

## Lo que está bien (y conviene no perder)

- **Los 4 mayores se cerraron como se pidió**, no a medias: Trail of Bits salió con su motivo escrito, la búsqueda de reemplazo de la línea C quedó registrada con 32 sitios y su razón, y la línea C dice de frente que no tiene una home de modelo.
- **La completa de Selendy se rehízo con un método honesto y escrito**: pantalla por pantalla, con el script guardado, y declarando qué se ocultó para que no se repita en la costura.
- **«Qué significa un sí a 1 y un sí a 11»** es el mejor recurso nuevo de la página: le dice a Ramón qué está marcando y prohíbe el promedio por escrito. Conviene repetirlo donde haya otro par parecido (4 y 7, que la tarjeta 7 ya advierte).
- **Las cifras siguen siendo reales:** las afirmaciones nuevas de 11 y 12 calzan exactas con la medición (7 frases, 48 px, 500; 51,84 px, 300, mayúsculas; los tres oros).
- **La regla anti-robots se respetó también en la búsqueda nueva:** Public First («Just a moment»), Expedition Engineering (405) y otros se descartaron sin forzar nada.
- **Peso y orden:** 5,10 MB en 36 imágenes, cero huérfanas, renumeración explicada sin renombrar archivos.

## Para la ronda 3 (la última interna)

Se revisa solo lo que cambió: el defecto 1 (cuatro tarjetas que separan lo que se ve de lo que se escribe, y la definición de «un sí a 11»), el defecto 2 (opción a o b) y los menores que se cierren. Los menores que queden abiertos necesitan una línea de porqué en la tarjeta; abiertos y mudos, vuelven a salir. Si se cambia a Selendy, la nueva pasa los 5 puntos. Si el defecto 2 sigue vivo en la ronda 3, sube a Ramón con este diagnóstico: la línea D, tal como está, no tiene en vivo un ejemplo de oscuro cálido que cargue la página.

---

# Acta de QA · SpindleLab v3 · E10, selección de referentes · ronda 1

> La escribe Javiera (`/web-qa-critico`) en contexto limpio: subagente nuevo, no escuchó a
> Lucía. Leyó el plan `dazzling-snacking-river.md`, `referentes.json`, `referentes.md`, las
> 39 capturas, el lock viejo de driftime, el manual de marca y los dos detectores
> (`estudio-web/antislop-web.md` y `refero-design/references/anti-ai-slop.md`).

**Fecha:** 15-oct-2026 · **Rama:** `claude/magical-franklin-ckfki2` (carpeta `e10/` sin commit; HEAD `7a77bed`) · **Rondas previas:** ninguna

**Qué se audita:** la selección que Ramón va a marcar, no el sitio. `referentes.html` todavía no existe y no entra en esta ronda; tampoco los registros del paso 1 (`spec-visual.md` §7, `pendientes-traspaso-revisados.md`, encabezado del lock), que siguen pendientes.

## Veredicto

**APROBADO CON REPAROS.**

La selección se sostiene: 13 sitios vivos en 4 líneas, ninguno forzado contra un control anti-robots, cada tarjeta con un rasgo concreto y un riesgo honesto, y las cifras que declaran (fuentes, colores, tamaños) se confirman midiendo. Hay **4 defectos mayores** que confunden lo que Ramón va a marcar: una tarjeta que es justo lo que rechazó (10), dos tarjetas de líneas distintas que ofrecen el mismo rasgo (1 y 12), una página completa que no muestra el sitio real (11) y una afirmación sobre el oro que contradice la regla de marca (13).

**Plazo del reparo:** los 4 mayores se cierran antes de publicar la página `Referentes del sitio` a Ramón. Los menores se cierran en la misma pasada si no cuestan, o quedan anotados en la tarjeta. La ronda 2 revisa solo lo que cambió.

## Cómo se verificó

- **Respuesta HTTP:** `curl -sL` a las 13 URL del JSON el 15-oct, ~17:55 y ~18:08 UTC. Las 13 dan **200**. Registro en `../qa-referentes/ronda-1/curl-200.txt`.
- **Anti-robots:** el HTML descargado de cada una trae contenido real y su `<title>`. Las coincidencias de palabras clave en 4 sitios son falsas alarmas: `captchaSettings` de Squarespace (The Ready, Priya Parker, Asbury) y el script pasivo `/cdn-cgi/challenge-platform/scripts/jsd/` de Cloudflare (Olson Kundig), que no muestra desafío. En Playwright las 13 cargaron sin desafío.
- **Mediciones en el navegador:** `../qa-referentes/ronda-1/medir.mjs` con Playwright y Chromium 1194, a 1440×900 y 390×844, recorriendo la página antes de medir. Mide fuentes cargadas, familia, tamaño, peso y color de los textos mayores de la primera pantalla, fondos, alto de página y `scrollWidth` contra `clientWidth` a 390. Resumen en `../qa-referentes/ronda-1/medicion-resumen.json`.
- **Capturas:** las 39 miradas una por una con Read. Evidencia propia de Selendy Gay, capturada pantalla por pantalla y unida: `../qa-referentes/ronda-1/selendy-por-pantallas.jpg` (script `selendy-por-pantallas.mjs`).
- **Peso y rutas:** con Python sobre `referentes.json` y el disco.

### Los 5 puntos del encargo

| # | Criterio | Resultado | Evidencia |
|---|---|---|---|
| 1 | 12 a 16 referentes en 4 líneas, numeración corrida | **Cumple.** 13: A 3, B 4, C 3 y D 3. Numerados del 1 al 13 en el JSON y en el md, sin saltos | `referentes.json` |
| 1 | Cada URL da 200 hoy, ninguna tras un desafío | **Cumple, con un menor.** 13 de 13 dan 200. La de Ink & Switch es un esqueleto que redirige (defecto 9) | `curl-200.txt` |
| 2 | Capturas sin pantallas en blanco ni modales, y que corresponden al sitio | **Cumple en 38 de 39.** La completa de Selendy Gay no muestra lo que el sitio muestra (defecto 3). Los `<title>` medidos calzan con cada sitio | Read de las 39 · `medicion-resumen.json` |
| 3 | 4 líneas distintas | **Cumple con un reparo.** B y C son claramente distintas. A y D se separan por el modo, pero las dos se cargan con fotografía, y 1 y 12 ofrecen el mismo rasgo (defecto 2) | `a1-gehl-1440.jpg` · `d1-olsonkundig-1440.jpg` |
| 3 | Al menos la mitad son servicios B2B o independientes | **Cumple.** 9 de 13: 5 de servicios B2B (Gehl, The Ready, Nick Parker, Trail of Bits, Selendy Gay) y 4 independientes (Priya Parker, Stefaner, Asbury, Santa Maria). Sin Trail of Bits quedan 8 de 12 | `referentes.json` |
| 3 | Ninguno con bandas de color saturado como recurso principal; ninguno parecido a driftime | **Cumple.** Ninguno combina negro, display gigante en mayúsculas y sistema de campos. Lo más cerca: el campo verde casi negro `rgb(0,51,46)` de Hoare con titular en versalitas, y las bandas amarilla y berenjena bajo el primer pantallazo de The Ready. Las dos están declaradas en el riesgo | capturas `completa` |
| 3 | Ninguno cae en un look de IA | **Cumple como rasgo tomado.** Donde hay un tic (palabra decorada en The Ready y Priya Parker, tarjetas en Trail of Bits, Poppins con tarjeta redondeada en Web Almanac, oscuro con un acento en Stefaner), la tarjeta lo nombra y lo excluye. El defecto 7 apunta a una composición genérica que no se nombró | detectores, abajo |
| 4 | Cada «qué se toma» es concreto | **Cumple.** Las 13 nombran un recurso medible (cara, tamaño, color, composición o tratamiento de imagen). El de Hoare es concreto pero equivocado (defecto 4) | ver tabla de verificación |
| 4 | Cada «por qué cálido» responde a la marca de Ramón | **No cumple en 2.** Trail of Bits (10) argumenta confianza y no calidez, y su propio riesgo dice que es frío. Selendy Gay (11) apoya su calidez en la serif y el marfil, que su riesgo llama cliché | defectos 1 y 6 |
| 5 | Cada imagen < 1 MB, total < 25 MB, rutas existen | **Cumple.** 39 imágenes, total **5,11 MB**, la mayor **278 KB** (`c4-inkandswitch-completa.jpg`). Las 39 rutas del JSON existen y no hay imágenes huérfanas | Python sobre la carpeta |
| | `git diff` sobre `spindlelab-astro/` | **Vacío** | `git diff --stat HEAD -- spindlelab-astro/` |

### Verificación de lo que dicen las tarjetas (medido, no leído)

| # | Afirmación | Medido |
|---|---|---|
| 1 | Títulos de caso en TimesNow 28 px | 20 nodos en `TimesNow` 28 px (proyectos y artículos) ✔ |
| 2 | Blanco roto rgb(255,254,250) | Fondo del encabezado y la navegación `rgb(255,254,250)` ✔. Titular en `saans` 138 px peso 500 |
| 3 | Reckless Light 53 px; entradilla ~36 px; licencia de prueba | `RecklessTRIAL-Light` 52,98 px; entradilla 36,04 px ✔ |
| 4 | Lector 700, #F5F1F1, #282626 | `Lector` 400/700; fondo `rgb(245,241,241)`, texto `rgb(40,38,38)` ✔ |
| 5 | Atlas Grotesk 300 24 px, #2B2B2B, IBM Plex Serif cursiva | Los tres ✔ |
| 6 | Georgia 53 px del sistema | `Georgia, serif` 53,02 px, sin fuentes web ✔ (ver defecto 10: la captura no muestra Georgia) |
| 7 | Roslindale 50 px, HEX Franklin, #F2F2EF | Roslindale 50,4 px; HEX Franklin; fondo `rgb(242,242,239)` ✔ |
| 8 | Merriweather y Merriweather Sans, #FCFCFC | ✔ |
| 9 | Poppins con Lato | ✔ |
| 10 | Geist Mono, FH Lecturis 80 px peso 400, #FAFAFA | ✔ |
| 11 | Freight Display 52 px, #202625, #F7F7ED; texto pegado al borde a 390 | `freight-display-pro` 52 px 400; `rgb(32,38,37)` y `rgb(247,247,237)`; borde izquierdo mínimo **0 px** a 390 ✔ |
| 12 | Negro pardo #181213, Inter 500 | Fondo `rgb(24,18,19)`; `InterVariable` 48 px 500 ✔ |
| 13 | Trirong «unos 60 px»; oro solo en antetítulo y flecha | Trirong **51,84 px peso 300** ✘; el antetítulo dorado **es texto** ✘ (defecto 4) |

Overflow horizontal a 390 en los 13: `scrollWidth == clientWidth == 390`.

## Defectos

Ninguno bloqueante.

| # | Sev. | Dónde | Qué está mal | Contra qué | Cómo se reproduce | Cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | **mayor** | 10 · Trail of Bits | La tarjeta muestra el aspecto que Ramón rechazó. Su riesgo dice «es el más frío de los 13 […] justo el "agencia tech" que marcaste», y su «por qué cálido» argumenta verificabilidad (confianza), no calidez. En la captura: riel negro de navegación, una grilla de 6 tarjetas iguales con íconos pixelados (tell #2), rótulos mono en mayúsculas y acentos rojos | Plan, paso 1: «Cada línea tiene que responder a tus dos marcas, es decir, ser cálida y de confianza» | `c/c1-trailofbits-1440.jpg`; `curl -sL https://www.trailofbits.com/` | Reemplazarlo por la home de una firma de servicios cálida armada en torno a su archivo o a su evidencia. O retirarlo (C queda con 2 y el total en 12, dentro del rango) y decir en la línea C que no hay home de firma de modelo. Si se queda, el «por qué cálido» no puede contradecir su propio riesgo |
| 2 | **mayor** | 1 · Gehl (A) y 12 · Olson Kundig (D) | Las dos tarjetas ofrecen el mismo rasgo: fotografía a sangre de gente real en su oficio, con una frase en sans blanca abajo a la izquierda. Las dos primeras pantallas son la misma composición (Studio6 40 px contra InterVariable 48 px, ambas sobre foto). La tesis de D pone la calidez en «fotografía con luz real», o sea, el mismo portador que A. El negro pardo de Olson casi no se ve: la página completa es foto de borde a borde. Si Ramón dice sí a 1 y a 12, no se puede saber si eligió A o D, y el lock termina promediando | Encargo, punto 3 («si dos se confunden, es defecto mayor»); `anti-ai-slop.md` tell #7 (promedio de referencias) | Comparar `a/a1-gehl-1440.jpg` con `d/d1-olsonkundig-1440.jpg`; «qué se toma» de los dos en el JSON | Darle a 12 un rasgo que solo tenga D: el lienzo pardo entre fotos, o la secuencia de frases como relato de la práctica, sin el «foto a sangre con gente». O reformular la tesis de D para que no la cargue la fotografía. Y agregar en el md una línea que diga qué significa un sí a 1 y qué significa un sí a 12 |
| 3 | **mayor** | 11 · Selendy Gay, `d/d3-selendygay-completa.jpg` | La página completa no muestra el sitio. Las secciones People, Practices, Values + Careers y Contact salen vacías, solo con su rótulo, porque el contenido aparece al hacer scroll y la captura se tomó antes de que apareciera. El sitio real tiene «Find Your Lawyer» con buscador, «Practice made perfect.» con 11 prácticas, «Our instilled values.», «Work with us.» y «Write Us. / Call Us. / Visit Us.». Medido: los siete titulares existen con opacidad 1. Ramón vería una página mucho más vacía y aireada de lo que es. La nota de captura no lo dice | Encargo, punto 2 («corresponde al sitio de la URL») | `../qa-referentes/ronda-1/selendy-por-pantallas.jpg` contra la completa entregada; `selendy-por-pantallas.mjs`. Una captura `fullPage` después de recorrer la página tampoco basta: la animación vuelve a empezar | Volver a capturar la completa pantalla por pantalla (scroll a cada altura, esperar unos 1,8 s y unir), mirar que las cuatro secciones tengan texto, y corregir la nota de captura |
| 4 | **mayor** | 13 · C. Hoare & Co., «qué se toma» | La tarjeta dice que el dorado va «solo en el antetítulo […] y en la flecha ↘, nunca en texto ni en fondos: la misma regla de escasez del oro de SpindleLab, ya resuelta en una web». Medido: el antetítulo «Private Banking» **es texto en oro** `rgb(163,135,71)`, y la primera pantalla lleva **dos** usos del oro (antetítulo y flecha). Más abajo hay rótulos dorados («Who we are» y «Services», `rgb(137,111,17)`) y flechas. La regla de SpindleLab es un oro por vista, solo el punto del wordmark, y prohíbe el dorado como color de texto. Un sí a 13 con este argumento metería en el lock el oro como rótulo | `manual-de-marca.md` §06 y línea 76 («dorado como color del texto», prohibido); `anti-ai-slop.md` tell #8 (deriva del rol del token) | `medicion-resumen.json` → `d6-hoare`; `d/d6-hoare-1440.jpg` | Reescribir el rasgo: Hoare usa el oro como acento de rótulos y flechas, que es otra regla y no la de SpindleLab. O quitar el argumento del oro y dejar solo la primera pantalla partida con la foto de luz de lámpara. Corregir también «unos 60 px» por 51,8 px peso 300 |
| 5 | menor | `referentes.md`, intro y tabla «Cómo se diferencian», y descartes de D | El md dice «D es la única que vive en lo oscuro», pero Stefaner (5, línea B) es oscuro en toda la página (fondo `#2B2B2B`, 3.258 px de alto), mientras que Hoare (13, línea D) es oscuro solo en el primer pantallazo (su riesgo lo dice). Además, en D se descartó a Lake Flato, LPAS, Macfarlanes y otros por «solo el hero es oscuro y el resto claro», que es justo el caso de Hoare | Coherencia interna de la curaduría | `referentes.md`, líneas 22-26 y 212 | Corregir la frase y la columna «Modo». Explicar por qué Hoare es la excepción a ese criterio de descarte, o aplicarle el mismo criterio |
| 6 | menor | 11 · Selendy Gay, «por qué cálido» | No cumple la tesis de su línea («la calidez puesta por fotografía con luz real»). Sus imágenes son fotos en blanco y negro de obras escultóricas, sin gente ni luz cálida, y el carbón tiene un dejo verde. El propio riesgo dice «temperatura neutra tirando a fría» y que la calidez la ponen solo la serif y el marfil, que es el cliché crema con serif (tell #4) | Plan, paso 1 (cálida); tesis de la línea D | `d/d3-selendygay-1440.jpg` | Decir qué rasgo trae solo ella (el dato único grande con su sujeto, la alternancia de carbón y marfil) y aceptar en el texto que su calidez no viene de la foto. O cambiarla por un oscuro cálido cuya calidez venga de la luz |
| 7 | menor | 2 · The Ready y 3 · Priya Parker, «qué se toma» | Las dos toman como rasgo la composición «titular a la izquierda y foto a la derecha» («foto […] en la columna derecha, junto a un titular»; «retrato […] a media pantalla, junto al titular»). `refero-design` la nombra como síntoma genérico. Ninguna de las dos tarjetas lo advierte | `anti-ai-slop.md`, «Layout symptoms: Hero with left text + right image» | JSON, campos `que_se_toma` de 2 y 3 | Aislar lo propio de cada una (la foto de taller sin pose y con grano; el retrato con luz natural y la entradilla en serif sobre arena) y marcar la composición izquierda y derecha como la parte que no se toma |
| 8 | menor | Línea B completa | Los cuatro sitios son de oficios creativos: dos diseñadores (Santa Maria, Stefaner) y dos redactores (Nick Parker, Asbury). La segunda marca de Ramón es justamente «se siente como estudio de diseño», y la línea puede recibir un no por el rubro y no por el rasgo. El md dice que «un sí es un sí al rasgo», pero la línea no lo advierte. La búsqueda de consultores B2B o hispanos falló, y eso sí está registrado | Marca 2 de Ramón | `referentes.md`, línea B | Sumar un sitio de autor de una profesión de confianza (asesor, abogado, contador o consultor independiente), o decir en la entrada de B que los cuatro vienen de oficios creativos y qué hay que mirar en ellos |
| 9 | menor | 8 · Ink & Switch, campo `url` | `https://www.inkandswitch.com/local-first/` responde 200 con 152 bytes: un esqueleto con `<meta name="robots" content="noindex">` y un `meta refresh` a `/essay/local-first`. `curl -sL` no sigue el `meta refresh`, así que el 200 corresponde a la redirección y no a la página capturada | Encargo, punto 1 | `curl-200.txt`, filas 8 y 8b | Cambiar la URL por `https://www.inkandswitch.com/essay/local-first/` (200, 111 KB, `<title>` «Local-first software: You own your data, in spite of the cloud») en el JSON y en el md |
| 10 | menor | 6 · Asbury, capturas | El sitio declara `Georgia, serif` a 53 px sin fuentes web. Este contenedor no tiene Georgia (`fc-match Georgia` → DejaVu Serif), así que las capturas muestran una serif de reemplazo, no la Georgia que Ramón vería en su Mac o su iPhone. El impacto es bajo porque la tarjeta ya descarta la tipografía | Encargo, punto 2 | `fc-match Georgia`; `b/b4-asbury-1440.jpg` | Agregar a la nota de captura que la letra que se ve no es Georgia |
| 11 | menor | 3 · Priya Parker, 1440 y 390 | La barra naranja del libro `rgb(244,106,60)` sale arriba en las dos primeras pantallas. No es un modal y la tarjeta la declara, pero tiene una × visible para cerrarla, y pone una banda saturada en lo primero que mira Ramón, en una selección que existe porque rechazó los colores de campo | Marca 1 de Ramón; la regla del encargo para avisos con botón visible | `a/a5-priyaparker-1440.jpg` | Volver a capturar las dos primeras pantallas después de cerrarla con su ×, y anotarlo en la nota de captura |

## Detector anti-slop

Esta ronda audita una selección de sitios ajenos, no una página nuestra. El checklist de `antislop-web.md` §E se corre sobre **el rasgo que cada tarjeta propone tomar**. Lo que es del sitio que se va a construir se deja abierto con su porqué.

```
COPY       n/a  Los textos son de sitios ajenos y el copy de E8 no cambia.
               El md se revisó en su propio registro: sin raya de remate, sin Title Case,
               tú consistente y es-CL. ✔
ESTRUCTURA n/a  Es del sitio, no de la selección. Ningún rasgo tomado es una fila de
               métricas sin fuente ni tarjetas iguales: los dos casos (Trail of Bits y
               Gehl) se excluyen en su riesgo. ✔
CÓDIGO     n/a  Se audita en la QA de construcción (paso 3).
VISUAL     refero-design, rasgo por rasgo:
  □→✔ acento no índigo: ninguno toma índigo ni violeta
  □→✔ tarjetas: las únicas grillas de tarjetas (Trail of Bits, Web Almanac) no se toman
  □→✔ sin franja lateral de acento
  □→✔ sin emoji: los minilogos de Nick Parker se advierten en el riesgo
  □→!  modo oscuro: D y Stefaner lo proponen como opción, no por defecto. Lo decide Ramón
  □→!  serif editorial y tierra (tell #4): 8 de 13 se apoyan en una serif sobre claro.
       Cada tarjeta lo advierte una por una, pero falta decirlo para el conjunto. Queda como
       advertencia para el lock: si Ramón marca varias serif claras de líneas distintas,
       Lucía tiene que elegir una dominante y no promediar (tell #7). Ver defecto 6
  □→✘ palabra decorada: está en los titulares de 2 y 3; se excluye en el riesgo ✔. Pero
       la composición izquierda y derecha de 2 y 3 no se advirtió (defecto 7)
  □→✘ rasgos fuertes conservados, no promediados: 1 y 12 ofrecen el mismo rasgo (defecto 2)
  □→✘ rol del token conservado: el oro de Hoare se presenta con el rol equivocado (defecto 4)
  □→✔ rol de la imagen: las tarjetas que dependen de fotos (1, 2, 12, 13) advierten que
       SpindleLab no tiene hoy esas fotos y que habría que producirlas
  □→✔ mayúsculas con tracking: n/a en la selección
PRUEBAS    n/a  Logo tapado, rubro cambiado y leído en voz alta se aplican al tablero de
               la compuerta 2 y al sitio, no a sitios ajenos. Versión que sí aplica:
               ¿cada tarjeta se entiende sin el nombre del sitio? Sí, porque el «qué se toma»
               nombra el recurso y no la marca.
```

## Lo que está bien (y conviene no perder en la corrección)

- **El oficio de la curaduría.** Cada tarjeta trae un riesgo escrito contra sí misma: advierte la palabra decorada, la licencia de prueba de Reckless, el texto pegado al borde de Selendy a 390 (medido: 0 px) y la falta de fotos propias. Así es como se reacciona a un rasgo y no a un sitio.
- **Los números de las tarjetas son reales.** De 13 afirmaciones de fuente, color o tamaño, 12 calzan exactas con la medición. Esto se tiene que mantener en la ronda 2.
- **La regla anti-robots se cumplió y quedó escrita.** Los sitios con desafío o 403 se descartaron sin intentar nada y con nombre.
- **El peso está muy por debajo del límite:** 5,1 MB en 39 imágenes. Las capturas de los retirados se borraron y su motivo quedó registrado.
- **La lista de descartes**, cada sitio con su motivo e incluidos los hispanos y chilenos que no pasaron, le ahorra a la ronda siguiente volver a buscar donde ya se buscó.

## Para la ronda 2

Se revisa solo lo que cambió. Los 4 mayores: la tarjeta 10 reemplazada o retirada, el rasgo de 12 separado del de 1, la completa de 11 vuelta a capturar y el texto del oro de 13 corregido. Más los menores que se hayan cerrado. Si una tarjeta se reemplaza, la nueva pasa por los mismos 5 puntos.
