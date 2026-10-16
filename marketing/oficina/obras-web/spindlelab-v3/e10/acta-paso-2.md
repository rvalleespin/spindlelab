# Acta de QA · SpindleLab v3 · E10 paso 2 (lock The Ready, dos direcciones, pauta de fotos)

> Escrita por Javiera (`/web-qa-critico`) en contexto limpio: subagente nuevo que leyó el plan,
> el lock, el tablero, los prototipos, la pauta y el código. No vio la conversación donde se
> construyó. Cada cifra de abajo sale de un script mío, guardado en `qa-paso-2/ronda-<n>/herramientas/`.
> La ronda más nueva va arriba.

---

## Ronda 3 · 16-oct-2026 (la última interna)

**Rama/commit auditado:** `claude/magical-franklin-ckfki2`. Empecé sobre `3bf0d41` con los arreglos sin commit; a las
14:50 UTC, mientras empezaba, entró `990b91d` («arreglos de la ronda 2 cerrados») con esos mismos contenidos: la suma
sha1 de los 211 archivos revisados (lock, `lock/`, `fotos/`, tablero, prototipos, `img/`, `espacios-foto.json`) es igual
al empezar (14:50 UTC) y al terminar (15:09 UTC), y esas rutas quedan limpias contra `990b91d`. Lo auditado es `990b91d`. **Ronda previa:** la 2,
aprobado con reparos.

**Qué se pidió revisar:** Lucía dice haber cerrado los defectos 2 a 7 de la ronda 2 y lo que quedaba de la ronda 1
(8 a 11); Bruno, el 1. Y la decisión de Ramón del 16-oct («no te preocupes por el logo de la marca, es muy probable que
lo tenga que cambiar por la nueva imagen del sitio»): el wordmark y la regla de un oro por vista quedan abiertos, y lo
que el tablero decía del punto dorado se cambia por una nota corta. **El logo y el oro no son criterio en esta ronda:
no medí oro.**

### Veredicto: APROBADO

El tablero puede ir a Ramón para la compuerta 2, y la sesión con clave puede arrancar: `node generar.mjs --verificar`
termina en código 0. **Los once cierres declarados están cerrados**, cada uno medido abajo con un script mío, y los tres
que llevaban dos rondas abiertos (marcador, «empresa cliente» y marcas provisionales, peso de la letra) también. No
queda ningún defecto vivo de una ronda anterior, así que no hay nada que escalar a Ramón.

Queda **un defecto menor nuevo**, que no cambia lo que Ramón elige ni lo que se ve en las capturas del tablero (1440 y
390): la flecha del chequeo de Taller se corta por el borde de la pantalla entre 1024 y 1258 px, escondida por el
`overflow-x: clip` del `body`. Se cierra en `spec-visual.md` (o en `desvios.md`), no pide una ronda 4.

### Fuentes y lo que faltaba

Igual que en las rondas 1 y 2: no hay `brief-de-obra.md` ni `desvios.md` de E10. Criterios: la sección «Verificación»
del plan aprobado, los defectos de las rondas 1 y 2, el lock (§13 sobre todo) y los puntos del encargo de esta ronda.

### Cómo se verificó

- Chromium 141 con el Playwright de `spindlelab-astro`. `npm run build` corrido hoy (27 páginas; `git diff
  7ac6534 -- spindlelab-astro` vacío y `git status` limpio en esa carpeta). `proto/` en 127.0.0.1:8780, `dist/` en
  8781 y el tablero en 8792 envuelto como lo publica Artifact (`servir-tablero.py`).
- Reutilicé mis herramientas de la ronda 2 y escribí otras en `qa-paso-2/ronda-3/herramientas/`, distintas de las de
  Lucía: el desborde se mide **también con el clip del `body` apagado** (la ronda 2 encontró que el clip escondía
  titulares), en 14 anchos y no solo en los cinco pedidos; las marcas de revisión (`::after`) se miden contra la
  pantalla por los dos lados; los espacios de foto contra los **dos** archivos (`espacios-foto.json` y `pauta.json`).
- `generar.mjs` siempre con un precargado que registra y bloquea la red (`sinred.mjs`), y los casos con clave en una
  copia aislada en el scratchpad, con una API falsa que responde 400 repitiendo la clave o 200 con un PNG.

### Mediciones

| Qué | Resultado |
|---|---|
| Texto visible vs `dist/v3`, JavaScript encendido | 12/12 vistas (3 páginas × 2 direcciones × 1440 y 390): secuencia 0,9975 a 0,9987; la única diferencia es «· Cookies» del pie, que crea el aviso de cookies del build y el tablero declara ✓ (`datos/texto-comparacion.txt`) |
| Desborde con el clip puesto | 84 vistas (6 páginas × 14 anchos, de 360 a 1920, incluidos 360, 390, 768, 1024 y 1440): `scrollWidth == clientWidth` en las 84 ✓ |
| Texto fuera de su caja | 0 en las 84 vistas (rango de cada nodo de texto contra la caja de su elemento y contra la pantalla) ✓ |
| Desborde con el clip apagado | 82 de 84 iguales a la pantalla. Las 2 que no: home de Taller a 1024 (1163) y a 1180 (1259), y la causa es solo la flecha del chequeo (bisección: `.t-instr::after`). Defecto 1 |
| Escala display (defecto 2 y el 360 del 11) | h1 en px, de 360 a 1440: hero 56,5 / 62 / 86,9 / 138 (Taller) y 58,4 / 64 / 86,9 / 138 (Pizarra); «Acompañamiento mensual» 38 / 41,7 / 83,3 / 106,5 / 125,5 / 138; servicios de Taller a 1024: 72,7. Calza con la tabla del lock §13. A 768, Pizarra Acompañamiento: h1 de 59,6 px en una línea de 526 px dentro de 726 de caja; a 1024, «Desarrollo» llega a 412 con la caja en 416 y ya no queda bajo la foto ✓ (`capturas/pizarra-acomp-768-h1.png`, `taller-home-1024-desarrollo.png`, `taller-acomp-1024-h1.png`) |
| Chequeo a 360 y 390 (defecto 6) | En las dos direcciones, campo y botón apilados como en el build: 278 px útiles a 360 y 308 a 390 (build: 280 y 310). «constructoraandesur.cl» escrito de verdad: no se corre dentro del campo (`scrollWidth == clientWidth` del input). Foco: el formulario muestra 2 px con el campo enfocado; Tab al botón, 2 px ciruela. Desde 768, en fila (468 y 455 px útiles) ✓ (`capturas/chequeo-*-390.png`, `-360.png`) |
| Hero y formulario | Orden chequeo → titular → obras: build 142 / 340 / 580 a 1440 y 126 / 448 / 542 a 390; Taller 151 / 453 / 771 y 202 / 560 / 715; Pizarra 151 / 502 / 809 y 140 / 529 / 681. Son las cifras que da el tablero. Los 6 nodos del formulario, idénticos al build en las dos ✓ |
| Cinta | 30,0 a 30,3 px/s · Enter en el botón la detiene (0,0 px/s) y `aria-pressed` pasa a `true` · 44×44 · con `reducedMotion: reduce` parte quieta (0,0 px/s, `aria-pressed=true`) y solo se mueve si se pide · fuera de pantalla, pausada · `aria-hidden`, fuera de todo encabezado. Taller en home y Acompañamiento; Pizarra solo en la home ✓ |
| Contraste | 3.844 nodos de texto en 30 vistas (6 páginas × 360, 390, 768, 1024 y 1440), fondos compuestos y el marcador como fondo: 0 fallas, mínimo 6,24:1 (el punto del wordmark sobre ciruela). `npm run verificar --base` sobre los seis prototipos a 390: 0 hallazgos de contraste, desborde, `h1`, `alt` ni JSON-LD (marca el comentario de cabecera del prototipo y los enlaces a `/v3/`, que dan 404 porque el prototipo se sirve solo: esperados) ✓ |
| Espacios de foto, al píxel | Los 18 espacios (9 a 1440 con dpr 1, 9 a 390 con dpr 2) calzan con `espacios-foto.json` **y** con `pauta.json` (`css_1440`, `css_390`), y el rótulo es el mismo en el render, en `espacios-foto.json` y en la pauta. A 360, 768 y 1024, la proporción del render es la declarada y el espacio queda dentro de la pantalla ✓ (`datos/fotos.txt`) |
| Lugar de cada foto contra la pauta (defecto 1) | F1 junto a «Tu sitio está escrito para personas»; F2 en la banda del resaltador junto a «Visibilidad», su texto y «Desde $400.000 + IVA»; F8 de Taller en la banda, junto a «Correr el chequeo» y «Pedir el diagnóstico»; F6 junto a «Una auditoría te dice qué hacer…». Es lo que dice la «sección» de cada ficha ✓ (`datos/fotos-lugar.txt`) |
| Pauta sin el tablero viejo (defecto 1) | En `pauta.json`, fuera de historial y pruebas: ya no hay óvalo, garabato, mancha ni los hex de The Ready; lima y lavanda quedan solo como color de nota adhesiva, dicho como tal; el oro, «en pausa con el logo» en las reglas, el estilo y la revisión ✓ |
| `generar.mjs --verificar` | **Código 0.** 9 espacios, 9 fichas, «ningún vacío»; 5 avisos de cobertura de Gemini que no bloquean (F1 a 390: 1,97×; F5 y F7: 0,93× a 1440 y 1,57× a 390). 0 intentos de red ✓ |
| `generar.mjs` sin clave | Sin tope: código 0, lista la pauta, 0 red, no crea `salida/`. Con `--tope=2`: **código 2**, «No hay clave para generar. Falta la variable GEMINI_API_KEY… o OPENAI_API_KEY», dónde se configura en la nube y en local, «nunca la pegues en el chat»; con `--proveedor=openai` nombra solo `OPENAI_API_KEY`. 0 red y sin `salida/` en los dos ✓ |
| `generar.mjs` con clave falsa | `--ver`: 0 red, la clave no aparece. Contra un 400 que repite la clave: va en cabecera (la URL no la tiene), sale «[clave oculta]», la corrida se corta (código 3). Contra un 200 con PNG: guarda `F8-taller-1.png` y `F8-pizarra-1.png`, la clave no está en `registro.json` ni en la salida, y el oro sale como «(dato)» ✓ |
| Tablero como Artifact | Sin `doctype`, `html`, `head` ni `body` (0) · `<title>` «Tablero direcciones E10» (3 palabras) · `claude:viewport-fit-sides` con `max(16px, env(safe-area-inset-left/right, 0px))`, gutter medido 16 px · 10 tokens en `:root` · `body` con fondo papel · única URL en el código: fonts.googleapis.com (pide fonts.googleapis.com y fonts.gstatic.com); 0 `<script>`, 0 `<link>` ✓ |
| Imágenes del tablero | 49 (todas distintas), 0 que falten en disco, 0 rotas y 0 respuestas ≥ 400 en el render; la mayor 431 KB (`taller-acompanamiento-mensual-1440-t1.jpg`), total 10,45 MB; 0 sin `alt`, 0 sin `width`/`height` ✓ |
| Tablero en pantalla | 360, 390, 768, 1024 y 1440 con los pliegues abiertos: `scrollWidth == clientWidth`, 1 `h1`, 0 rayas en el texto ✓ |
| ¿Las capturas del tablero son el render de hoy? | Las 12 vistas re-renderizadas (como `renderizar.mjs`: página completa, movimiento reducido, 1440 a dpr 1 y 390 a dpr 2) contra sus tramos `img/*-t<n>.jpg` unidos: mismo alto y 0 filas con diferencia en las 12 ✓. Las de logo tapado y colores son de las 14:36, después del último cambio de CSS (14:34) |
| El punto dorado en el tablero | «Dónde va el punto dorado» salió. Queda la nota «El logo, después» («no es parte de lo que eliges… mientras tanto no rige la regla de un solo oro por vista»), la fila §06/§02 de la tabla del manual dice «Queda abierto» y la lista del paso 2 dice «El logo no se decide aquí» ✓ |
| Marcador (defecto 3) | 17 marcadores (Taller 4 / 2 / 3, Pizarra 4 / 2 / 2): 15 cierran su oración y los 2 restantes son la excepción escrita en §13 («se corta» del hero). «cuál es cuál en cada una.» cierra la frase. A la vista: máximo 1, salvo Taller Trabajo a 390 con 2 (techo de Taller: 2) ✓ |
| Personas y marcas (defecto 4) | 0 «empresa cliente» en tablero, `espacios-foto.json`, pauta, lock y prototipos (el «cliente» de F2 es el que le escribe a la ferretería). El tablero dice que las marcas «son provisionales… las definitivas las traza Bruno a mano» ✓ |
| Filete del borde (defecto 5) | Taller a 1440: 2 en la home (el hilo del hero y el de «Desarrollo»), 1 en Acompañamiento («Elige la cobertura»), 0 en Trabajo; Pizarra 0. Es el techo y el rol del lock §13, y el tablero lo dice como de The Ready ✓ |
| Peso (defectos 7 y 10) | El lock §11 trae la prueba (asta y tinta de 500 a 600, tabla y `lock/peso-instrument-saans.png`) y elige 540. En la página: `h1` computado a 540, y la variable lo dibuja de verdad («Acompañamiento» a 200 px mide 1673,2 / 1680,7 / 1692,0 a 500 / 540 / 600) ✓ |
| Techos del lock §13 | Taller: 1 banda del resaltador, 1 marca de revisión y hasta 1 sello por página; Pizarra: 0, 0 y 0 ✓ |
| Foco y semántica | Tab: el mismo orden que el build en las 6 páginas (salvo los 4 controles del aviso de cookies del build y la pausa de la cinta); todos con contorno visible, el campo por `:focus-within`. 1 `main`, 1 `h1`, sin saltos de encabezado, `noindex`, hero `eager`/`high`, 0 imágenes sin dimensiones, 0 fotos viejas de `assets/img/d/`, 0 pedidos fuera de 127.0.0.1 ✓ |
| ¿Siguen siendo distintas? | A 1440, columna dominante: Taller x = 75 (68 % de los bloques en home y Trabajo), Pizarra x = 525 (53 a 60 %). Piezas a sangre: Taller 5 / 2 / 3, Pizarra 1 / 1 / 0 ✓ |
| Lock en vivo | No lo repetí: §1 a §9 (lo medido de The Ready) no cambiaron desde la ronda 2, salvo una fila nueva en §5 (palabras por marcador), que calza con `medicion-the-ready.json` (titulares de 2 a 5 palabras; cuerpo, de 4 a 11). Seis valores en vivo ya calzaron en las rondas 1 y 2 |

### Defectos

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce / cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | menor | Lucía | Home de Taller, la flecha del chequeo (`.t-instr::after`, `taller.css:48`) | Desde 1024 rige la composición de escritorio, y la flecha va a `left: calc(100% + 18px)`, 196 px de ancho, a la derecha de un chequeo que ya llena el ancho útil. Entre 1024 y 1258 px cae fuera de la pantalla y el `overflow-x: clip` del `body` la corta: de 1024 a 1119 se ve el 29 % (x 967 → 1163 con la pantalla en 1024: queda la punta), a 1180 el 60 %, y entera desde 1259. Con el clip apagado el documento mide 1163 (a 1024) y 1259 (a 1180). `anchos.mjs` no lo ve porque mide con el clip puesto y no mira los `::after` | Lock §13 («nunca se esconde un desborde con `overflow`»; composición de escritorio desde 1024); «Lo comprobado» del tablero | `herramientas/marcas3.mjs` y `desborde3.mjs`; `capturas/flecha-taller-1024.png`, `flecha-taller-1180.png`, `hero-taller-1024.png`. **Cierre (en la spec, no en otra ronda):** la posición de la flecha para 1024 a 1258 (dentro del margen o como en una columna) y la medición de `anchos.mjs` también con el clip apagado |

Sin severidad, para arreglar de pasada:
- El lock §13 dice «9 marcadores por dirección, 8 cierran su oración»; Pizarra tiene 8 (4 / 2 / 2) y 7 los cierran. La
  regla se cumple; la cifra no.
- `tablero.html`, comentario CSS de las líneas 6 a 9: todavía dice «lo que también decides (manual, colores y punto
  dorado)». No se ve, pero quedó viejo.

### Lo de las rondas 1 y 2, uno por uno

| Defecto | Estado hoy |
|---|---|
| R2-1 · la pauta no calzaba con el tablero (Bruno) | **Cerrado.** `--verificar` en código 0; F2 en 443×554; F1, F2 y F8 dicen dónde van hoy y calzan con el render; paleta del estilo propia; sin óvalo, garabato ni mancha |
| R2-2 · escala display entre 390 y 1440 (y 360) | **Cerrado.** Regla para todo ancho y dos composiciones (lock §13); 84 vistas sin texto fuera de su caja ni documento más ancho, con clip y sin clip para los titulares. Dejó el defecto 1 de esta ronda, que es otro (la flecha, no la letra) |
| R2-3 / R1-8 · marcador fuera de la regla | **Cerrado.** Excepción escrita con su porqué; «cuál es cuál en cada una.» |
| R2-4 / R1-9 (a y d) · «empresa cliente» y marcas provisionales | **Cerrado** |
| R2-5 · filete del borde sin techo | **Cerrado.** Rol y techo en §13; medido 2 / 1 / 0 |
| R2-6 · chequeo en fila a 390 | **Cerrado.** Apilado hasta 767 px, como el build |
| R2-7 / R1-10 · peso de la letra | **Cerrado.** Prueba medida en §11; 540 aplicado |
| R1-11 · 360 px | **Cerrado** dentro del R2-2 |
| Observación de la ronda 2 · el punto dorado en el tablero | **Hecho.** Nota corta «El logo, después»; las opciones A y B salieron |

### Detector anti-slop (antislop-web §E + refero)

```
COPY        ✓ sin verbos de folleto  ✓ sin relleno de apertura  ✓ sin tricolon  ✓ sin «no solo X sino Y»
            ✓ sin pregunta retórica  ✓ sin Title Case  ✓ tú en todo el tablero  ✓ 0 rayas
            ✓ cero prueba social      ✓ «empresa cliente» corregido
            · el copy de las páginas es el de E8 (igual al build, medido); no se reauditó
ESTRUCTURA  ✓ servicios con peso distinto en las dos  ✓ tres planes reales  ✓ sin «¿por qué elegirnos?»
            ✓ FAQ de E8  ✓ formulario de un campo  ✓ hero no es 100vh centrado  ✓ orden de secciones = build
CÓDIGO      ✓ 1 main, 1 h1, sin saltos, landmarks  ✓ valores del lock, no por defecto (peso 540 medido)
            ✓ sin degradé ni glass  ✓ 0 emoji  ✓ alt reales; marcas y rótulos aparte
            ✓ foco visible y en el orden del build  ✓ contraste AA en 3.844 nodos  ✓ label del campo
            ✓ imágenes dimensionadas, hero eager/high, font-display swap
            · JSON-LD, canonical y OG heredados del build; prototipos con noindex. Índice, sitemap y ?v=N: no aplican
            ✗ la flecha del chequeo, cortada por el clip entre 1024 y 1258 (defecto 1)
VISUAL      ✓ acento no índigo  ✓ sin tarjetas de adorno  ✓ sin franja lateral  ✓ modo claro  ✓ sin serif editorial
            ✓ palabra resaltada con regla, techo y su única excepción escrita
            ✓ la referencia fuerte no se promedió: Taller conserva cinta, marcador, escala y bandas; Pizarra, la columna
              y la foto a sangre de Gehl sin diluir la letra
            ✓ roles de token  ✓ espacios de foto honestos (proporción exacta, rótulo, dirección)  ✓ MAYÚSCULAS con interletra
            ✓ filete del borde con rol y techo
```

### Pruebas de fuego

- **Logo tapado.** Igual que en la ronda 2: Taller es inconfundible en la primera pantalla y se lee de la familia de
  The Ready por lo que Ramón eligió (letra, resaltador y cinta), no como The Ready. Pizarra sostiene el hero; «Lo que
  incluye» sigue siendo su pantalla más débil, y el tablero lo dice.
- **Rubro cambiado.** Taller calzaría con otra agencia «con juego», pero el chequeo arriba, la flecha al campo y el visto
  junto a los robots son de este negocio. Pizarra, de los planes para abajo, calza con cualquier suscripción.
- **Leído en voz alta.** «Estás pagando para que lleguen a tu sitio. Ahí se corta el circuito.» Suena a persona. El
  tablero también: «El logo no se decide aquí: se rediseña después, como dijiste.»

### Lo que está bien (no perderlo en la spec)

1. **Los arreglos se hicieron en el sistema y se midieron:** la regla de escala es una cuenta (escalón contra caja ÷
   palabra) que se puede escribir en la spec tal cual, y da las mismas cifras en el lock, en el render y en mi barrido.
2. **El peso se decidió con una prueba, no a ojo:** asta y tinta contra Saans, con lámina. Es el estándar para la spec.
3. **La pauta y el tablero vuelven a ser un solo contrato:** 18 espacios al píxel en los tres lugares, el mismo rótulo,
   y `generar.mjs` lo exige antes de gastar.
4. **`generar.mjs` falla limpio:** sin clave no toca la red ni crea carpetas, nombra la variable exacta y dónde se pone;
   con una clave, no la deja salir por ningún lado.
5. **El tablero respeta la decisión de Ramón sin borrar la historia:** el logo queda como nota, y el lock §12 guarda lo
   medido del amarillo y el oro para cuando llegue el logo nuevo.

### Observación para la spec y la sesión con clave (sin severidad)

La pauta mide la cobertura a 1440 y a 390, que es lo que pidió el plan. En la composición de una columna, de 600 a
1023 px, F1, F5 y F7 van a todo el ancho (768×960 css a 768): un archivo de Gemini en 4:5 (768×960) cubre 1× a 768 y
no alcanza en pantallas de densidad 2. No afecta esta compuerta; la spec tiene que decir de qué tamaño se sirven las
fotos en tableta, y Bruno, si eso cambia el proveedor o el escalado.

### Evidencia

- `e10/qa-paso-2/ronda-3/capturas/`: heroes de las dos direcciones a 1024 y 1440 (Taller también a 1180 y 1280), la
  flecha de cerca a 1024, 1180 y 1280 (defecto 1), el chequeo a 360 y 390 con el dominio largo escrito, los casos de la
  ronda 2 a 768 y 1024 ya corregidos, y el comienzo del tablero a 390 y 1440. Las capturas completas de las páginas no
  se duplican: las del tablero (`tableros/e10-direcciones/img/`) son el render de hoy, medido.
- `e10/qa-paso-2/ronda-3/herramientas/`: nuevas `desborde3.mjs` (14 anchos, con y sin clip, texto fuera de caja),
  `bisecar3.mjs`, `sinclip.mjs`, `marcas3.mjs`, `hero3.mjs`, `chequeo3.mjs`, `fotos3.mjs`, `fotos-lugar.mjs`,
  `marcador3.mjs`, `filetes3b.mjs`, `peso3.mjs`, `foco3.mjs` y `frescas.mjs`; y las de la ronda 2 que reutilicé
  (`texto.mjs`, `texto-cmp.py`, `cinta.mjs`, `contraste.mjs` con anchos por variable, `techos.mjs`, `hero.mjs`,
  `chequeo.mjs`, `codigo.mjs`, `jerarquia.mjs`, `foco.mjs`, `distintas.mjs`, `tableta.mjs`, `tablero.mjs`, `cap.mjs`,
  `servir-tablero.py`, `sinred.mjs`, `api400.mjs` y `api200.mjs`). Esperan `proto/` en 127.0.0.1:8780, `dist/` en
  8781 y el tablero envuelto en 8792.
- `e10/qa-paso-2/ronda-3/datos/`: el texto con JavaScript encendido y su comparación, el desborde de las 84 vistas
  (`desborde.json`), contraste, cinta, chequeo, espacios de foto, marcador, filetes, foco, el contrato del tablero y
  las salidas de `generar.mjs` (verificar, sin clave, 400 y 200).

---

## Ronda 2 · 16-oct-2026

**Rama/commit auditado:** `claude/magical-franklin-ckfki2`. Leí el árbol en `fe965d2` con cambios sin commit
(lock y herramientas del oro); a las 13:45 entró el commit `d4b82c8` con esos mismos contenidos: la suma sha1 de
los 164 archivos revisados (lock, `lock/`, `fotos/`, tablero, prototipos, `img/`) es igual al empezar y al
terminar, así que lo auditado es `d4b82c8` (igual a `origin`). **Ronda previa:** la 1, rechazado.

**Decisión de Ramón que llegó durante la revisión** (la trajo el coordinador, 16-oct): «no te preocupes por el
logo de la marca, es muy probable que lo tenga que cambiar por la nueva imagen del sitio». Desde esta ronda, el
wordmark (Gabarito con el punto `#C9A227`) y la regla de un solo oro por vista **no son criterio de aprobación**:
no medí oro por vista y no cuento como defecto ni el amarillo contra el oro ni la falta o el exceso de oro. Queda
como observación al final.

### Veredicto: APROBADO CON REPAROS

El tablero puede ir a Ramón para la compuerta 2. Las dos direcciones son distintas de verdad (medido, abajo), el
texto es el de E8 en el mismo orden que el build, el hero vuelve a poner el chequeo primero y lo que en la ronda 1
era de The Ready tal cual ahora es propio o está declarado como tomado. De los doce defectos de la ronda 1, ocho
están cerrados, dos a medias (9 y 11) y dos siguen abiertos (8 y 10, menores). Dos reparos, con plazo:

1. **Antes de abrir la sesión con clave:** la pauta tiene que volver a calzar con el tablero (defecto 1). Hoy
   `node generar.mjs --verificar` termina con código 2. El script hace bien su trabajo (no deja gastar), pero el
   encargo, tal como está escrito, no corre.
2. **Antes de escribir `spec-visual.md`:** la regla de la escala display tiene que cubrir los anchos entre 390 y
   1440, y 360 (defecto 2). A 768 y 1024 el h1 de Acompañamiento se corta y en Taller «Desarrollo» queda debajo
   de la foto.

Los menores (3 a 7; tres vienen de la ronda 1) se cierran en la spec o se declaran en `desvios.md`; no piden
una ronda 3. Si alguno de los que ya van dos rondas abiertos (3, 4 y 7) llega vivo a la spec, el problema no es
de oficio: se lleva a Ramón como decisión.

### Fuentes y lo que faltaba

Igual que en la ronda 1: no hay `brief-de-obra.md` ni `desvios.md` de E10, y la spec vigente es la de driftime,
que uso solo para la decisión del hero (§0.4). Criterios: la sección «Verificación» del plan aprobado y los
cinco puntos del encargo de esta ronda.

### Cómo se verificó

- Chromium 141 con el Playwright de `spindlelab-astro`. `npm run build` corrido hoy (27 páginas, `dist/`
  ignorado; `git diff 7ac6534..HEAD -- spindlelab-astro` vacío). `proto/` en 127.0.0.1:8780, `dist/` en 8781, y
  el tablero en 8792 **envuelto como lo publica Artifact** (doctype y viewport agregados por fuera,
  `herramientas/servir-tablero.py`).
- Mis scripts, distintos de los de Lucía y Bruno, en `qa-paso-2/ronda-2/herramientas/`; los datos en
  `qa-paso-2/ronda-2/datos/` y las capturas en `qa-paso-2/ronda-2/capturas/`.
- **Texto:** con JavaScript **encendido** en el build y en el prototipo (Lucía lo compara apagado), `innerText`
  del cuerpo después de recorrer la página, sin mayúsculas (la caja es estilo), palabra por palabra y por
  secuencia (`difflib`), quitando solo los rótulos de foto y la cinta del prototipo.
- **Lock en vivo:** tres valores sorteados con semilla 202610162 entre diez candidatos, distintos de los de la
  ronda 1.
- **Desborde:** `scrollWidth` contra `clientWidth` evaluado en la página, a 360, 390, 768 y 1440, y un barrido de
  titulares que salen de su caja de 360 a 1920.
- **generar.mjs:** con un precargado que registra y bloquea `fetch`, `net`, `tls`, `http`, `https` y `dns`
  (`sinred.mjs`), con claves falsas, y en una copia aislada (pauta que calza) con una API falsa que responde 400
  repitiendo la clave (`api400.mjs`) o 200 con un PNG (`api200.mjs`).

### Mediciones

| Qué | Resultado |
|---|---|
| Lock, valor 1: fondo de la portada del caso | En vivo (`/case-studies/navy-federal`, 200): `rgb(230, 250, 151)` = `#E6FA97`. Lock §3: lima `#E6FA97` ✓ |
| Lock, valor 2: h2 de sección a 1440 | En vivo (home, 200): 91,304 px, Saans 500, interletra −1,826 px (−0,02em), interlínea 90,72 px (0,99). Lock §2: 91,3 · 500 · −0,02em · 0,99 ✓ |
| Lock, valor 3: alto de «Who we are» a 1440 | En vivo (200): 6852 px. Lock (`paginas.nosotros.alto1440`): 6852 ✓ |
| Letra sustituta | Tabla `name` (id 14) de los archivos servidos: Instrument Sans, IBM Plex Sans, IBM Plex Mono y Gabarito → OFL. En `lock/tipos-comparados.png` Instrument Sans calza con Saans en ritmo, x y espacio; se ve más liviana, y los prototipos siguen en 500 (defecto 7) |
| Amarillo contra oro | `#EEF26E`: tono 61,8°, saturación 0,545: fuera del rango 38–54°; el cálculo del lock §12 es correcto. Ya no es criterio de aprobación |
| Texto visible vs `dist/v3` | 12/12 vistas iguales; secuencia 0,9975 a 0,9987. La única diferencia es «· Cookies» del pie (lo crea el aviso de cookies del build), que ahora el tablero declara (`datos/texto-comparacion.txt`) |
| Hero y chequeo | Orden chequeo → titular → obras, en y: build 142 / 340 / 580 a 1440 y 126 / 448 / 542 a 390; Taller 151 / 453 / 771 y 202 / 502 / 653; Pizarra 151 / 502 / 809 y 140 / 473 / 618 ✓. Los 6 nodos del formulario (`chq-*`, atributos, placeholder, aria) idénticos al build en las dos ✓. El botón ya no monta el campo ✓ |
| Desborde | 390: `scrollWidth == clientWidth` en las 6 páginas ✓. 360: Acompañamiento 364 en las dos. 768 a 1180: ver defecto 2 |
| Cinta | 30,0 a 30,2 px/s · Enter en el botón la detiene (Δ 0,0 px en 1,5 s) y `aria-pressed` pasa a `true` · 44×44 · con `reducedMotion: reduce`, 0 px/s y solo se mueve si se pide · `cinta--fuera` fuera de pantalla · `aria-hidden`, fuera de todo encabezado, 1 `h1` por página ✓ |
| Techos del lock §13 | Marcador por página: Taller 4 / 2 / 3, Pizarra 4 / 2 / 2; a la vista, máximo 1 a 1440 en las dos y 2 en Taller Trabajo a 390 (techo 2) ✓. Banda del resaltador: 1 por página en Taller, 0 en Pizarra ✓. Sello en la home y Trabajo de Taller ✓. Cinta: Taller en home y Acompañamiento, Pizarra solo en la home ✓ |
| Espacios de foto | Los 18 espacios medidos en el render (9 a 1440, 9 a 390) calzan al px con `espacios-foto.json` ✓ |
| Contraste | 1.548 nodos de texto en las 12 vistas, fondos compuestos y el marcador como fondo: 0 fallas, mínimo 6,24:1 ✓ |
| Foco y semántica | Tab: 25 a 38 enfocables por página, todos con contorno visible (el campo lo muestra el formulario con `:focus-within`, 2 px); orden = DOM = build. 1 `main`, 1 `h1`, sin saltos de encabezado, `noindex`, imágenes con `width`/`height`, obras del hero `eager`/`high` como en el build ✓ |
| Fotos viejas `assets/img/d/` | 0 en las 12 vistas (el build tiene 6 en la home y 2 en Acompañamiento) ✓ |
| Red y 404 | Prototipos: 0 pedidos fuera de 127.0.0.1, 0 respuestas ≥ 400 ✓ |
| ¿Distintas? | A 1440, columna de texto dominante: Taller x = 75 (68 % de los bloques en la home y en Trabajo), Pizarra x = 525 (53 a 60 %, con rótulos en 75). Piezas a sangre: Taller 5 / 2 / 3, Pizarra 1 / 1 / 0. Taller tiene banda del resaltador, sello y marcas; Pizarra tiene la ficha rótulo y columna y las bandas de foto a todo el ancho ✓ |
| Tablero como Artifact | Sin doctype, `html`, `head` ni `body` · `<title>` de 3 palabras · `claude:viewport-fit-sides` + `max(16px, env(safe-area-inset-*))` (gutter medido 16 px) · tokens en `:root` · `body` con fondo · única URL externa: Google Fonts (pide a fonts.googleapis.com y fonts.gstatic.com) ✓. 57 imágenes, 0 rotas, máx. 436 KB, total 10,5 MB ✓. 390 / 768 / 1440 sin desborde con los pliegues abiertos ✓. Las capturas son el render de hoy: alto idéntico en las 12 vistas y diferencia de píxeles solo en las filas de la cinta ✓. Solo tema claro, con el porqué en el CSS (aceptado en la ronda 1) |
| generar.mjs sin clave y sin tope | 0 intentos de red, no crea `salida/`. Código 2, pero por el defecto 1, no por la clave |
| generar.mjs con tope y sin clave (copia que calza) | Código 2, mensaje con la variable exacta, dónde se pone y dónde se crea; sin red ni carpeta ✓. `--proveedor=openai` sin su clave: igual, nombra `OPENAI_API_KEY` ✓ |
| generar.mjs con claves falsas | Sin tope y con `--ver`: 0 red, la clave no aparece ✓. Con tope, contra un 400 que repite la clave: va en `x-goog-api-key`, no en la URL; sale «[clave oculta]» en stderr y en `registro.json`, y la corrida se corta ✓. Contra un 200 con PNG: guarda `F8-taller-1.png` y `F8-pizarra-1.png`, mide el oro y escribe la máscara ✓. Código leído: la clave solo se lee del entorno y nunca se escribe |

### Defectos

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce / cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | **mayor** | Bruno | `e10/fotos/pauta.json` y `pauta.md` contra `tableros/e10-direcciones/espacios-foto.json` | La pauta describe el tablero de antes de los arreglos de Lucía. **F2-taller:** la ficha dice 398×498 a 1440 y el espacio mide 443×554 (render y `espacios-foto.json`), así que `node generar.mjs --verificar`, `node generar.mjs` y el comando recomendado de §4 terminan con «NO SE PUEDE GENERAR» (código 2). `pauta.md` §3 («Conciliada… ningún vacío») y §7 («`--verificar` ✓ en todos») ya no son ciertos. Además: F1 dice «Hero: foto vertical a sangre… como el hero de The Ready» y hoy va junto a «Tu sitio está escrito para personas»; F2 dice «a su derecha, el garabato a sangre» y su riesgo habla de la banda `#F4F480`; F8 dice «al lado del óvalo “Correr el chequeo”»; el estilo pone como eco de la paleta `#FFFEFA`, `#1B0925`, `#E6FA97` y `#EDD1FF` y dice que «el naranja `#EC6227` es la mancha de Taller». Ya no hay garabatos, óvalo, mancha, lima ni lavanda, y el resaltador es `#EEF26E` | Encargo («los F<n> coinciden con espacios-foto.json»); plan, paso 3 | `node generar.mjs --verificar` (salida en `datos/generar-sin-clave-sin-tope.txt`). **Cierre:** copiar 443×554, revisar el recorte y la cobertura de F2, reescribir sección y riesgo de F1, F2 y F8 y la paleta del estilo con el tablero vigente, `--sincronizar`, y `--verificar` en código 0 |
| 2 | **mayor** | Lucía | Escala display de las dos direcciones, entre 390 y 1440 (y 360) | La regla del lock §13 fija el titular por su palabra más larga **solo a 390**. Entre 768 y 1180 los titulares van a 138 y 91 px y no caben: el h1 «Acompañamiento mensual» (138 px) mide 1191 px de texto en una caja de 693 a 768 y de 949 a 1024, y como el `body` lleva `overflow-x: clip` se ve cortado («Acompañar…», «Acompañamier…») en las dos direcciones. En la home de Taller, «Desarrollo» (91 px) llega a x 494 con la caja en 309 (768) y 416 (1024) y queda debajo de la foto de la obra; «Continuidad» igual. El documento queda con `scrollWidth` 907 a 1191 contra `clientWidth` 768 a 1180, escondido por el `clip` (`scrollTo` lo mueve 139 a 423 px). A 360, el h1 a 42 px mide 340 en una caja de 312 (`scrollWidth` 364): el resto del defecto 11 de la ronda 1, ahora en las dos | Lock §13 («Display a 390») y §10 («la escala en todas las páginas»); C6 y desborde | `herramientas/tableta.mjs`, `palabras.mjs`; `capturas/pizarra-acomp-768.png`, `pizarra-acomp-1024.png`, `taller-acomp-1024-h1.png`, `taller-home-768-desarrollo.png`, `taller-home-1024-desarrollo.png`. **Cierre:** la regla de §13 se escribe para todo ancho (el tamaño de cada titular según su palabra más larga y el ancho de su caja, con tope en 138 / 91), se aplica en los prototipos y se mide a 360, 768 y 1024 sin texto fuera de su caja |
| 3 | menor | Lucía | Marcador en «se corta» (hero, las dos) y en «cuál es cuál» (Trabajo, las dos) | **Segunda ronda.** «se corta» está explicado en el tablero («en castellano la consecuencia está en el verbo») pero el lock §13 sigue diciendo «la consecuencia, al final» sin excepción. «cuál es cuál» no está al final («…cuál es cuál en cada una.») y no está declarado en ningún lado | Lock §13; refero, palabra resaltada sin regla | `capturas/mk-cual.png`. **Cierre:** la excepción escrita en §13 con su porqué, o mover el marcador |
| 4 | menor | Lucía | `tablero.html` (líneas 304 y 308) y `espacios-foto.json` (F1) | **Segunda ronda** (9a y 9d de la ronda 1). «Las personas son ambiente de la empresa del cliente» y «en la oficina vidriada de una empresa cliente» chocan con la regla «nunca como clientes» que el mismo párrafo enuncia (la pauta de Bruno lo dice bien: «en su propia empresa»). Y el tablero presenta la flecha, el visto y el anillo como «marcas de revisión a mano», sin decir que son provisionales con semilla y que las definitivas las traza Bruno (lo dicen el lock §10b y el comentario del SVG) | Regla de personas generadas; prueba de fuego (lo que se le muestra a Ramón es lo que hay) | `grep -n "cliente" tablero.html`. **Cierre:** «en su propia empresa» o equivalente en los tres lugares; una línea en el tablero que diga que las marcas son provisionales |
| 5 | menor | Lucía | Filete de 1 px que nace del borde, en Taller | `taller.css:25` lo pone «sobre cada titular de sección»: 5 en la home, 5 en Acompañamiento y 1 en Trabajo, el mismo trabajo que hace en The Ready (sobre o bajo el titular). El lock §10b dice que se toma y que «lo propio es dónde se corta: en el hero»; eso cubre 1 de los 5. El §13 no le pone techo ni rol | Encargo («ningún recurso copiado tal cual»); lock §10b y §13 | `herramientas/filetes.mjs`. **Cierre:** rol y techo en §13, o decirlo en el tablero como se dijo de los colores («es de ellos») |
| 6 | menor | Lucía | Chequeo a 390, las dos | El build apila campo y botón (campo de 338 px, 310 útiles). Los prototipos los ponen en una fila: el campo queda con 135 px útiles en Taller y 142 en Pizarra. «ferreteriaroma.cl» (136 px) ya no cabe en Taller, y «constructoraandesur.cl» (186 px) no cabe en ninguna: el dominio se escribe corriéndose dentro del campo. No está declarado en el lock §17 | Plan («el chequeo… tal cual»); C6 (control usable) | `herramientas/codigo.mjs`; `capturas/hero-taller-home-390.jpg`. **Cierre:** apilar a 390 como el build, o declararlo y probarlo con un dominio largo |
| 7 | menor | Lucía | Lock §11 y prototipos | **Segunda ronda** (defecto 10). Instrument Sans 500 se ve más liviana que Saans Medium en el comparativo; el lock sigue diciendo «se ajusta en el tablero si el 500 se ve más liviano» y no hay prueba anotada | Lock §11 | **Cierre:** probar 530 a 560 contra el comparativo y anotar el resultado (aunque sea «se queda en 500, porque…») |

### Lo de la ronda 1, uno por uno

| Ronda 1 | Estado hoy |
|---|---|
| 1 · los F<n> no coincidían | **Cerrado** en la numeración (una sola, la del tablero; tabla de equivalencia llena; `generar.mjs` bloquea). La medida de F2 se desfasó después: es el defecto 1 de esta ronda, distinto |
| 2 · F9 y F10 con proporción y encuadre ajenos | **Cerrado.** F7 (ex F9) en 16:9 con sus dos recortes; F2 (ex F10) con encuadre Taller y escena reescrita |
| 3 · el tablero no mostraba lo que cambia del manual | **Cerrado.** Tabla de ocho reglas con su fecha, la decisión de colores y la del punto |
| 4 · orden del hero | **Cerrado.** Medido arriba; el texto sigue el orden del build en 12/12 |
| 5 · Pizarra genérica | **Cerrado.** Escala display en todas las páginas, servicios con peso distinto (dos puertas y un par), hasta 4 marcadores; el tablero nombra sus dos pantallas débiles |
| 6 · recursos de The Ready tal cual | **Cerrado**, salvo el filete (defecto 5): paleta propia (la exacta queda como opción dicha como de ellos), sin óvalo, encabezado, collage, garabatos ni mancha; marcas de revisión y sello propios |
| 7 · el óvalo tapaba el campo | **Cerrado.** No hay óvalo; el botón no toca el campo |
| 8 · marcador fuera de la regla | **Abierto** (defecto 3) |
| 9 · tablero | (b) JavaScript y «Cookies»: **cerrado**. (c) decimales: **cerrado**. (a) provisionales y (d) «cliente»: **abiertos** (defecto 4) |
| 10 · peso de la letra | **Abierto** (defecto 7) |
| 11 · código | Dimensiones: **cerrado** (0 imágenes sin `width`/`height`). Plex Sans 600: **cerrado** (700). 360 px: **abierto**, dentro del defecto 2 |
| 12 · alt de F11 con barrio | **Cerrado.** R3 dice «una calle con árboles de hojas verdes» |

### Las preguntas del encargo

- **¿Distintas, o una es la otra con menos cosas?** Distintas, aunque más cerca que en la ronda 1: comparten
  paleta, letra, escala, módulo, botones, marcador y pie. Lo que las separa ya no es la cantidad sino la
  composición: Taller arma desde la izquierda con piezas a sangre y asimetría, y Pizarra lee en una columna
  corrida a la derecha con los rótulos a la izquierda (cifras arriba). Pizarra no es Taller sin cosas: tiene una
  grilla que Taller no tiene.
- **¿Taller tiene la energía que pidió Ramón?** Sí, y menos ruidosa que en la ronda 1: la cinta en dos páginas,
  el resaltador de plumón en el titular de 138, una banda del resaltador por página, la flecha y el sello girado
  junto al chequeo, el anillo en el botón y las fotos con gente a sangre. No es un sitio típico. Lo que perdió al
  dejar de copiar (el óvalo, la mancha, los garabatos) lo reemplazó con piezas que hacen trabajo.
- **¿Pizarra limpia es clara sin volverse genérica?** Sí, del hero a los servicios. La letra grande y el
  resaltador la sacan de lo típico. Sus pantallas más débiles son «Lo que incluye» y el mes tipo en filas, y el
  tablero lo dice con todas sus letras: Ramón elige sabiendo eso.

### Detector anti-slop (antislop-web §E + refero)

```
COPY        ✓ sin verbos de folleto  ✓ sin relleno de apertura  ✓ sin tricolon  ✓ sin «no solo X sino Y»
            ✓ sin pregunta retórica  ✓ sin Title Case  ✓ tú en todo el tablero  ✓ 0 rayas
            ✓ cero prueba social      ✓ decimales con coma
            ✗ «empresa cliente» contra la regla de personas (defecto 4)
            · el copy de las páginas es el de E8 (igual al build, medido); no se reauditó
ESTRUCTURA  ✓ servicios con peso distinto en las dos  ✓ tres planes reales en tres columnas (Taller)
            ✓ sin «¿por qué elegirnos?»  ✓ FAQ de E8  ✓ «36 → 73 → 100» con su fuente (E8)
            ✓ formulario de un campo  ✓ hero no es 100vh centrado  ✓ orden de secciones = build
CÓDIGO      ✓ 1 main, 1 h1, sin saltos, landmarks  ✓ valores del lock, no por defecto
            ✓ sin degradé ni glass  ✓ 0 emoji (flechas de fuente)  ✓ alt reales; marcas y rótulos aparte
            ✓ foco visible en todo el recorrido  ✓ contraste AA en 1.548 nodos  ✓ label del campo
            ✓ imágenes dimensionadas, hero eager/high, font-display swap
            · JSON-LD, canonical y OG heredados del build; prototipos con noindex. Índice, sitemap y ?v=N: no aplican
            ✗ titulares fuera de su caja entre 768 y 1180 y a 360 (defecto 2)
VISUAL      ✓ acento no índigo (ciruela del manual y resaltador propio)  ✓ sin tarjetas de adorno (las dos piezas
              enmarcadas son piezas de lectura de E9)  ✓ sin franja lateral  ✓ modo claro  ✓ sin serif editorial
            · palabra resaltada: pedido de Ramón, con regla y techo medido; dos usos sin declarar (defecto 3)
            ✓ la referencia fuerte no se promedió: Taller conserva cinta, marcador, escala y bandas; Pizarra toma de
              Gehl la columna y la foto a sangre sin diluir la letra
            ✓ roles de token: resaltador solo en marcador, banda «lo que ganas» y barrido del botón
            ✓ espacios de foto honestos (proporción exacta, rótulo, dirección de arte)
            ✓ MAYÚSCULAS solo en mono con interletra
            · filete del borde tomado sin techo (defecto 5)
```

### Pruebas de fuego

- **Logo tapado.** Taller: inconfundible en la primera pantalla y ya no se la atribuiría a The Ready; se lee como
  de su familia, por la letra, el resaltador y la cinta, que es lo que Ramón eligió. Pizarra: el hero sostiene;
  «Lo que incluye» podría ser de otra consultora ordenada (el tablero lo dice).
- **Rubro cambiado.** Taller calza con cualquier agencia «con juego», pero el chequeo arriba, la flecha que
  apunta al campo y el visto junto a los robots que responden 200 son de este negocio. Pizarra, de los planes
  para abajo, calza con cualquier servicio por suscripción.
- **Leído en voz alta.** «Estás pagando para que lleguen a tu sitio. Ahí se corta el circuito.» Suena a persona
  (texto de E8, intacto). El tablero también: «Elige una dirección: Taller o Pizarra limpia.»

### Lo que está bien (no perderlo en la corrección)

1. **El lock sigue siendo verificable:** seis valores sorteados en dos rondas, seis calzan con el sitio en vivo.
   Y ahora dice, recurso por recurso (§10b), qué se tomó y qué se hizo propio: es la mejor defensa contra la
   copia que tiene la obra.
2. **Las correcciones se hicieron en el sistema, no en la captura:** la paleta, el botón, el módulo y la fila de
   obras salen de SpindleLab; el orden del hero sale del build; el texto sigue igual en 12/12 con dos métodos
   distintos (el de Lucía y el mío).
3. **La cinta y el marcador siguen pasando donde The Ready no pasa** (pausa, movimiento reducido, velocidad por
   tiempo, fuera de los encabezados), y el contraste está limpio en todas las vistas.
4. **`generar.mjs` es más guardián que en la ronda 1:** bloqueó solo el desfase de F2 que encontré, sin gastar;
   la clave no sale por ningún lado.
5. **El tablero no esconde lo débil:** las pantallas flojas de Pizarra, la familia de The Ready en Taller y las
   reglas del manual que cambian están escritas para Ramón.

### Observación sin severidad: el logo y la regla del oro quedan abiertos

Por la decisión de Ramón del 16-oct, el wordmark y la regla de un solo oro por vista quedan abiertos para el
sistema nuevo. Dependen de eso y quedan en pausa, sin ser defecto: la sección 3 del tablero («Dónde va el punto
dorado»), la fila §06/§02 de la tabla del manual, el lock §12 (la guarda del resaltador contra el oro), la línea
«un solo oro por página» de «Lo comprobado» y la medición de oro dentro de las fotos (manual §07b), que la pauta
y `generar.mjs` siguen haciendo. Lucía decide si la sección 3 se queda en el tablero como «en pausa» o sale, para
que Ramón no decida algo que ya dijo que va a cambiar. En esta ronda no medí oro.

### Evidencia

- `e10/qa-paso-2/ronda-2/capturas/`: heroes de build y de las dos direcciones a 1440 y 390; los cortes a 768 y
  1024 (defecto 2); el marcador de cerca (en línea, en papel sobre la banda y en «cuál es cuál»); el anillo; el
  foco del campo; la portada del caso de The Ready en vivo.
- `e10/qa-paso-2/ronda-2/herramientas/`: `vivo.mjs` (lock en vivo), `texto.mjs` y `texto-cmp.py` (texto),
  `hero.mjs` (orden y formulario), `cap.mjs`, `desborde.mjs`, `bisecar.mjs`, `palabras.mjs` y `tableta.mjs`
  (desborde), `cinta.mjs`, `techos.mjs` (marcador, bandas y espacios de foto), `contraste.mjs`, `foco.mjs` y
  `foco2.mjs`, `codigo.mjs` y `jerarquia.mjs`, `distintas.mjs`, `filetes.mjs`, `zoom.mjs`, `tablero.mjs` y
  `servir-tablero.py`, y `sinred.mjs`, `api400.mjs` y `api200.mjs` (precargados para `generar.mjs`). Esperan
  `proto/` en 127.0.0.1:8780, `dist/` en 8781 y el tablero envuelto en 8792; reciben la carpeta de salida como
  argumento.
- `e10/qa-paso-2/ronda-2/datos/`: el texto con JavaScript encendido y su comparación, el desborde por página y
  ancho, y las salidas de `generar.mjs`.

---

## Ronda 1 · 16-oct-2026

**Rama/commit auditado:** `claude/magical-franklin-ckfki2` @ `6fdd8a1` (igual a `origin`; árbol limpio;
ningún archivo revisado cambió durante la revisión). **Rondas previas:** ninguna.

### Veredicto: RECHAZADO

La pauta de fotos y el tablero no hablan de las mismas fotos (defecto 1, bloqueante): la sesión con
clave generaría fotos para espacios que no existen y dejaría vacíos tres de los cuatro espacios de
la home de Taller. Además, el tablero le pide a Ramón elegir sin mostrarle dos cosas que su «sí»
cambia: ocho reglas del manual que él aprobó (defecto 3) y el orden del hero con el instrumento
primero, que es decisión suya (defecto 4). El oficio técnico está bien hecho (abajo, «Lo que está
bien»): lo que falta es casi todo reconciliar y declarar, más dos decisiones de dirección.

### Fuentes y lo que faltaba

- **Brief:** no hay `brief-de-obra.md` de E10. Uso como criterio de aceptación la sección
  «Verificación» del plan aprobado (`/root/.claude/plans/dazzling-snacking-river.md`) y el encargo.
- **Spec:** la vigente es la de driftime (`spec-visual.md`), que E10 va a reemplazar. La uso solo
  para las decisiones de Ramón que siguen vigentes (§0.4: «dirección A, el instrumento primero en la
  home»; criterio de éxito = conversión).
- **Desvíos:** no hay `desvios.md` de E10. Los desvíos se buscaron contra el plan, el lock y la spec
  §0.

### Cómo se verificó

- Chromium 141 (`/opt/pw-browsers/chromium-1194`) con Playwright de `spindlelab-astro`. `npm run build`
  corrido hoy (27 páginas); `dist/` servido en 8781, `proto/` en 8780, el tablero en 8782.
- **Lock contra theready.com en vivo**, tres valores sorteados (semilla 20261016): ver tabla.
- **Texto:** comparación propia, distinta de `texto-igual.mjs`: con JavaScript encendido, `innerText`
  del cuerpo después de recorrer la página, sin rótulos de foto ni cinta, comparado palabra por
  palabra y por secuencia de bloques (`difflib`), en las 12 vistas.
- **Capturas** a 1440 y 390 de las seis páginas (y 768 y 360 para desborde); recortes en
  `qa-paso-2/ronda-1/capturas/`.
- **Oro** por ventana de una pantalla, en capturas con `--disable-lcd-text` (`oro-por-vista.py`).
- **Contraste** de cada nodo de texto visible (1.502 nodos), componiendo fondos translúcidos y las
  imágenes de fondo conocidas (marcador, marcador papel, mancha).
- **Cinta:** velocidad por `DOMMatrix` en 2 s, pausa con teclado, `reducedMotion: reduce`, fuera de
  pantalla.
- **generar.mjs** con un precargado que intercepta `fetch`, `net`, `tls`, `http`, `https` y `dns`, con
  claves falsas y con un 400 simulado que repite la clave.

### Mediciones

| Qué | Resultado |
|---|---|
| Lock, valor 1: rótulo mono a 1440 | En vivo: 11,816 px, interletra 0,35448 px (= 0,03em), MAYÚSCULAS, 500. Lock: 11,8 · +0,03em · 500 ✓ |
| Lock, valor 2: alto del encabezado a 1440 | En vivo: 90,03 px, `position: fixed`. Lock: 90 px ✓ |
| Lock, valor 3: grosor del marcador | En vivo (`/working-together`): `stroke-width` 137 px, `#F4F480`, remate cuadrado, sobre h1 de 137,96 px. Lock: 1em, 137 en un h1 de 138 ✓ |
| Letra sustituta | Instrument Sans: tabla `name` → OFL (también Plex Sans, Plex Mono, Gabarito). Ningún archivo Saans en el repo. Parecido real en `lock/tipos-comparados.png`; se ve más liviana que Saans Medium (defecto 10) |
| Amarillo contra oro | `#F4F480`: 60,0°, sat 0,475 → fuera del criterio (38–54°, ≥ 0,5). Cálculo del lock correcto |
| Texto visible vs `dist/v3` | Mismo multiconjunto de palabras en 12/12 vistas, salvo el control «· Cookies» del pie (lo inyecta `consent-banner.js`, que los prototipos no cargan) y el espacio de «SpindleLab .». Secuencia: cambia en las 12 (defecto 4) |
| Hero y chequeo | Texto igual; atributos del formulario (`chq-form`, `chq-dominio`, `chq-btn`, `chq-nota`, `chq-error`, `chq-out`, nombre, tipo, placeholder, aria) idénticos. Orden: invertido (defecto 4) |
| Desborde | 390: `scrollWidth == clientWidth` en 12/12. 768 y 360: igual, salvo Pizarra Acompañamiento a 360 (364 vs 360). `body { overflow-x: clip }` recorta los garabatos a sangre (1464, 1470 a 1440) |
| Cinta | 29,9–30,2 px/s · Enter en el botón la detiene (Δ 0,0 px) y `aria-pressed` pasa a `true` · 44×44 · con movimiento reducido 0 px/s y solo se mueve si se pide · `cinta--fuera` al salir de pantalla · `aria-hidden`, fuera de todo encabezado |
| Oro por vista | Un solo oro: el punto del pie sobre ciruela (47×47 a 1440). Fuera de él, peor vista 81 px a 1440 (umbral 648) y 29 px a 390 (umbral 164) |
| Contraste | 0 fallas en 1.502 nodos; mínimo 5,89:1 (casi negro sobre la mancha naranja) |
| Techos del lock §13 | Taller: marcador 4/2/3 por página, máx. 2 a la vista; 1 banda amarilla; 1 garabato; 1 mancha; cinta en 2 páginas. Pizarra: 1 marcador por página, 0 bandas, 0 garabatos, 0 manchas, cinta solo en la home ✓ |
| Fotos viejas `assets/img/d/` | 0 en `src`, `srcset` y fondos, en las 12 vistas |
| Red y 404 en prototipos | 0 pedidos fuera de 127.0.0.1, 0 respuestas ≥ 400 |
| Tablero como Artifact | Sin doctype/html/head/body ✓ · `<title>` de 3 palabras ✓ · `claude:viewport-fit-sides` + `max(16px, env(safe-area-inset-*))` ✓ · tokens en `:root` ✓ · `body` con fondo ✓ · solo Google Fonts (pide a googleapis y gstatic) ✓ · 38 imágenes, 0 rotas, máx. 481 KB, total 9,87 MB ✓ · 390/768/1440 sin desborde ✓. Solo tema claro, con el porqué escrito en el CSS |
| Tablero vs prototipos | Alto de cada captura idéntico al render actual; diferencia media por canal < 1,6 (JPEG y la cinta) |
| generar.mjs sin clave ni tope | Lista 12 fotos / 24 imágenes, código 0, 0 intentos de red |
| generar.mjs con tope y sin clave | Código 2, mensaje con la variable exacta y dónde se configura, sin carpeta ni red |
| generar.mjs con claves falsas | Sin tope: 0 red, la clave no aparece. Con tope: la clave va en `x-goog-api-key` (no en la URL); no aparece en stdout, stderr ni `registro.json`. 400 que repite la clave → «[clave oculta] [clave oculta]» y corta la corrida |

### Defectos

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce / cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | **bloqueante** | Bruno | `e10/fotos/pauta.json` y `pauta.md` §3 contra `tableros/e10-direcciones/espacios-foto.json` | Los F<n> no coinciden. Solo F1 y F8 son la misma foto. Los rótulos del tablero F2–F7 corresponden a F10, F6, F5, F2, F7 y F9 de la pauta. F3 y F4 (prioridad 1) y F11 y F12 no tienen espacio en ningún prototipo. `equivalencia_lucia.tabla` está entera en `null`; su estado dice «revisado a las 09:03», antes de que existiera `espacios-foto.json` (12:28). `generar.mjs` solo avisa. El primer comando que documenta la pauta (`--prioridad=1 --tope=12`) genera F3 y F4 (sin espacio), F9 en una proporción que no es la del espacio (defecto 2) y nada para tres de los cuatro espacios de la home de Taller | Plan, paso 3 y verificación; encargo «los F<n> coinciden» | `node generar.mjs --prioridad=1` y comparar con `espacios-foto.json`. **Cierre:** una sola numeración, la del tablero (o la tabla de equivalencia llena y los archivos de salida con el número del tablero). Las fotos sin espacio bajan a prioridad 3 o salen, como dice la propia regla de §3. `generar.mjs` bloquea (no solo avisa) mientras exista `espacios-foto.json` y la tabla tenga vacíos. `--sincronizar` y `pauta.md` regenerado |
| 2 | mayor | Bruno | Ficha F9 (espacio F7 de Pizarra, Acompañamiento) y F10 (espacio F2 de Taller) | El espacio F7 es una banda a sangre de 1440×617 (21:9) y 4:5 a 390; la ficha F9 pide 3:2 (Gemini 1248×832) para «el ancho de la columna de contenido». Pasar de 3:2 a 21:9 corta el 37 % del alto y deja 1248 px para un espacio de 1440. F10 va en un espacio de Taller con `encuadre: pizarra` (abierto y quieto), contrario al encuadre de Taller | `espacios-foto.json` F7 y F2; pauta §1 (un encuadre por dirección) | **Cierre:** reescribir F9 para su espacio (21:9, 1536×672, o 16:9 con los dos recortes escritos como F2) y dar a cada ficha el encuadre de la dirección donde va |
| 3 | mayor | Lucía | `tablero.html` (bloque «decide») | El lock §15 lista ocho reglas del manual que cualquiera de las dos direcciones cambia (lienzo negro → papel, Manrope → Instrument/Plex, display en mayúsculas → oración, rótulos, radio 6 → óvalo y radio 0, campos por pilar, punto dorado solo sobre ciruela, movimiento) y dice «decide Ramón en la compuerta 2». El tablero no menciona ninguna (0 apariciones de «manual», «Manrope», «negro», «mayúscula»), ni la opción del oro en la primera pantalla (lock §12) | Lock §15 y §12; protocolo de compuertas | `grep -i manual tablero.html`. **Cierre:** un bloque en el tablero con lo que el «sí» cambia del manual, fila por fila con su fecha de aprobación, y la opción del punto dorado |
| 4 | mayor | Lucía | Hero de la home, las dos direcciones; y `texto-igual.json` | En `dist/v3` el instrumento va primero: formulario en y 142 y h1 en y 340 a 1440 (126 y 504 a 390), como fija la spec §0.4 y §4 («instrumento → display → fila de 4 obras»). En los dos prototipos el h1 va primero y el chequeo después (Pizarra lo baja a una fila propia bajo un filete). Taller además baja la fila de obras después de «Tu sitio está escrito para personas». `texto-igual.json` marca `mismo_orden_de_lectura: false` y el tablero dice «Solo se agregan los rótulos de foto y la cinta» | Spec §0.4 (decisión de Ramón, criterio = conversión); plan: «el hero con su chequeo, tal cual» | `capturas/dist-hero-1440.jpg` contra `hero-taller-1440.jpg` y `hero-pizarra-1440.jpg`; `herramientas/orden.mjs`. **Cierre:** devolver el instrumento arriba en las dos, o mostrarlo en el tablero como cambio que Ramón aprueba aparte |
| 5 | mayor | Lucía | Dirección «Pizarra limpia» | Clara, pero genérica del hero para abajo. Baja la escala que Ramón nombró («la tipografía»): h1 de 72 px en Acompañamiento y Trabajo (Taller: 138) y h2 de 46 como máximo (Taller: 91), cuando la tesis del lock §1 es «una sola voz tipográfica grande». Los cuatro servicios de la home son cuatro filas con la misma estructura (rótulo, píldora, entrada, precio, dos botones). Cero bandas, cero garabatos, un marcador por página. El propio tablero lo admite: «Es la más cercana al sitio típico que le criticaste a Gehl» | Ramón sobre Gehl: «me falta creatividad, es casi un sitio típico»; antislop B1; refero tell #7 (rasgo fuerte suavizado); prueba del rubro cambiado | `herramientas/tipos.mjs`; `capturas/pizarra-home-1440-1.jpg`, `pizarra-trabajo-1440-0.jpg`. **Cierre:** que Pizarra conserve algo filoso de The Ready en todas sus páginas, no solo en el hero de la home (la escala display es lo obvio, porque es lo que la separa de Gehl), y que los servicios dejen de pesar lo mismo. Prueba del logo tapado sobre la segunda y la tercera pantalla, escrita en el tablero |
| 6 | mayor | Lucía | Lock §10 y prototipos, sobre todo Taller | El marcador y la cinta son propios ✓. El resto se toma tal cual: los siete colores de The Ready que se usan van idénticos al hex (`tokens.css`); óvalo de 12,7 px mono +0,1em que al pasar se invierte y crece ×1,10 en 0,6 s `cubic-bezier(.19,1,.22,1)`; encabezado de 90 px con filete ciruela y rectángulo de radio 0; banda final ciruela + display papel + óvalo lavanda; collage sobre cuadrícula (el de su «Who we are»); garabatos puestos donde The Ready pone los suyos (el ovillo junto al h1 de la oferta, los rulos en la banda amarilla de la home); mancha naranja con rótulo mono. Junto, Taller con el logo tapado se lee como The Ready, no como SpindleLab. La marca ya tiene un ciruela propio (`#341F34`, manual §04). El lock dice «tal cual medido» del marcador, que no es lo que se construyó | Encargo: «ningún recurso copiado tal cual de The Ready, debe ser propio»; prueba del logo tapado | `diff` de `proto/e10/tokens.css` contra `lock/medicion-the-ready.json` `color.paleta`; `capturas/tr-ovillo.jpg` contra `garabatos.jpg` y `taller-acompanamiento-mensual-1440-0.jpg`. **Cierre:** el lock dice, recurso por recurso, qué se hace propio y cómo (valor, forma o composición). Si Ramón quiere los colores exactos, que lo decida en el tablero sabiendo que son los de ellos. Corregir §5 y §10 del lock: el marcador es propio |
| 7 | menor | Lucía | Taller, hero, chequeo | El óvalo «Ver cómo lo lee» se monta sobre el campo. A 390: campo en y 447–507, óvalo en 493–585, corta el borde inferior del campo. A 1440: campo en x 279–689 y óvalo desde 645; `elementFromPoint(679, 612)` = `chq-btn`. Un dominio largo se escribe debajo del botón. En The Ready el óvalo monta el borde de una foto, no el de un campo | Lock §6; C6 (control usable) | `herramientas/hero.mjs`; `capturas/hero-taller-390.jpg`. **Cierre:** el óvalo no tapa el campo, o el campo reserva ese ancho con su `padding` |
| 8 | menor | Lucía | Marcador en «se corta» (hero, las dos) y «cuál es cuál» (Trabajo, las dos) | El lock §13 dice «la consecuencia, al final». «se corta» queda a mitad del titular: está justificado en el tablero, pero no en el lock. «cuál es cuál» no está declarado, y en Taller va en papel sobre lima, donde se lee como una caja blanca y no como marcador | Lock §13; refero (palabra resaltada sin regla) | `capturas/taller-trabajo-1440-0.jpg`. **Cierre:** mover al final o escribir la excepción en §13 con su porqué |
| 9 | menor | Lucía | `tablero.html` | (a) Los garabatos son provisionales, generados con semilla (comentario del SVG: «el definitivo lo traza Bruno a mano»), pero el tablero los presenta como finales. (b) «Texto visible igual en 12 de 12» vale con JavaScript apagado: falta decir que se quitó el control «Cookies» del pie y que cambió el orden (defecto 4). (c) Decimales con punto («29.9-30.2», «12.1 a 21.5 %») en un tablero es-CL cuyo lock usa coma. (d) «Ambiente de la empresa del cliente» y «una empresa cliente» (F1) chocan con la regla «ni como clientes» que el mismo párrafo enuncia | Pruebas de fuego; antislop A7; regla de personas | Leer el anexo del tablero. **Cierre:** las cuatro cosas dichas como son |
| 10 | menor | Lucía | Lock §11 y prototipos | En `tipos-comparados.png`, Instrument Sans 500 se ve claramente más liviana que Saans Medium. El lock dice que el peso «se ajusta en el tablero si el 500 se ve más liviano»; los prototipos quedan en 500 y no dicen si se probó | Lock §11 | **Cierre:** probar 540–560 (la fuente es variable de 400 a 700) contra el comparativo y anotar el resultado |
| 11 | menor | Lucía | Código de los prototipos | Los tres `<img>` de garabato sin `width`/`height`. IBM Plex Sans 600 en `.d-desc b` (`taller.css:61`, `pizarra.css:61`), cuando el lock §11 dice 400 y 700. Pizarra Acompañamiento a 360: `scrollWidth` 364 contra 360 (lo esconde el `overflow-x: clip` del body; a 390 está bien) | Antislop C7; lock §11 | `herramientas/techos.mjs`, `tipos.mjs`. **Cierre:** dimensiones, declarar o quitar el 600, encontrar los 4 px |
| 12 | menor | Bruno | Ficha F11 | El alt dice «una calle de Providencia», y la regla de alt de la misma pauta lo prohíbe. Si F11 sale por el defecto 1, se cierra solo | Pauta, `reglas.alt` | **Cierre:** sacar el barrio del alt |

Fuera de esta lista, a propósito: el óvalo de la banda amarilla de Taller Trabajo y el del pie
quedan a 791 px uno del otro, así que a 1440×900 se asoman los dos en una franja de ~100 px de scroll
pero nunca se ven enteros a la vez. No lo cuento como dos a la vista.

### Cumplimiento del plan (sección «Verificación»)

| Criterio | Estado |
|---|---|
| Lock con medidas del navegador (JSON), capturas a 1440 y 390, letra gratuita con su licencia | Cumple. Tres valores verificados hoy en vivo |
| Amarillo medido contra el tono del oro | Cumple |
| Dos direcciones distintas, sin desborde a 390 | Cumple: difieren en densidad (texto 12–22 % contra 6–13 % de la página, cifras del tablero), estructura (collage asimétrico contra grilla de rótulo y columna) y portador (Taller: seis espacios de foto, cinco con gente; Pizarra: dos bandas a sangre y la foto de Trabajo). Pizarra no es «Taller con menos cosas», pero cae en lo genérico (defecto 5) |
| Texto visible igual al de `dist/v3` | Cumple en palabras. No cumple en orden ni en el hero (defecto 4); falta el control «Cookies» |
| Cinta con `prefers-reduced-motion` y pausa | Cumple |
| Pauta con texto, proporción y prohibiciones; `generar.mjs` sin imprimir la clave, con falla clara y sin gastar sin tope | Cumple, salvo los F<n> y las proporciones (defectos 1 y 2) |
| Javiera aprueba | No, ronda 1 |
| `git diff` sobre `spindlelab-astro/` vacío | Cumple (desde `7ac6534` hasta `HEAD`, vacío; solo corrí `npm run build`, que escribe en `dist/`, ignorado) |

### Detector anti-slop (antislop-web §E + refero)

```
COPY        ✓ sin verbos de folleto  ✓ sin relleno de apertura  ✓ sin tricolon  ✓ sin «no solo X sino Y»
            ✓ sin pregunta retórica  ✓ sin Title Case  ✓ tú en todo el tablero  ✓ 0 rayas
            ✓ cero prueba social      ✓ borrar 30 % no mejora (el tablero es corto)
            · el copy de las páginas es el de E8, no se reauditó; el del tablero, sí (defecto 9c y 9d)
ESTRUCTURA  ✗ servicios de Pizarra: cuatro filas iguales (defecto 5, B1)
            ✓ los tres planes de Acompañamiento en tres columnas: son tres planes reales
            ✓ sin «¿por qué elegirnos?»  ✓ FAQ de E8  ✓ «36 → 73 → 100» con su fuente (E8)
            ✓ formulario de un campo  ✓ hero no es 100vh centrado
            ✗ orden del hero contra la decisión de Ramón (defecto 4)
CÓDIGO      ✓ 1 main, 1 h1 por página, jerarquía sin saltos  ✓ valores del lock, no por defecto
            ✓ sin degradé ni glass (la mancha tiene rol y referencia)  ✓ 0 emoji (flechas de fuente)
            ✓ alt reales; garabatos alt=""  ✗ garabatos sin width/height (defecto 11)
            ✓ foco 2 px a 4 px en todo el recorrido de Tab; papel sobre ciruela en el pie
            ✓ contraste AA en 1.502 nodos  ✓ label del campo  ✓ hero eager/high
            · JSON-LD, canonical y OG heredados de dist; prototipos con noindex. Índice, sitemap y ?v=N: no aplican (no se publica)
VISUAL      ✓ acento no índigo: el ciruela es tinta casi negra y la lavanda (277°) vive solo en el óvalo del pie;
              la paleta la pidió Ramón y su rol está escrito (lock §10)
            ✓ sin tarjetas  ✓ sin franja lateral  ✓ modo claro  ✓ sin serif editorial ni tierra
            · palabra resaltada: es pedido de Ramón y tiene regla; dos usos fuera de la regla (defecto 8)
            ✗ rasgo fuerte suavizado en Pizarra (tell #7, defecto 5)
            ✓ roles de token: amarillo, lima, lavanda y naranja en su rol medido
            ✓ espacios de foto honestos: proporción exacta, rótulo y dirección de arte (tell #9)
            ✓ MAYÚSCULAS con interletra
```

Nota de método para la spec: con suavizado de texto subpíxel (LCD), el ciruela sobre la banda
amarilla deja bordes de color que el criterio del oro cuenta (hasta 6.668 px por pantalla en Taller
Acompañamiento). No es oro de diseño: se mide con `--disable-lcd-text`, como hizo Lucía. Hay que
escribirlo en la spec, o la próxima medición dará un falso «segundo oro».

### Pruebas de fuego

- **Logo tapado.** Taller: primera pantalla inconfundible, pero se la atribuiría a The Ready antes
  que a SpindleLab (defecto 6). Pizarra: el hero con el marcador sostiene; la segunda y la tercera
  pantalla podrían ser de cualquier consultora.
- **Rubro cambiado.** Pizarra, de los servicios para abajo, calza con cualquier empresa de servicios.
  Taller calza con cualquier agencia «con juego», pero el chequeo arriba y la obra real lo anclan.
- **Leído en voz alta.** «Estás pagando para que lleguen a tu sitio. Ahí se corta el circuito.»
  Suena a persona (texto de E8, intacto).

### Lo que está bien (no perderlo en la corrección)

1. **El lock está medido de verdad.** Los tres valores sorteados calzaron con el sitio en vivo; la
   cinta, el marcador, el oro y la letra sustituta tienen evidencia y licencia. Es la mejor base de
   referencia que ha tenido la obra.
2. **La cinta y el marcador son propios y pasan donde The Ready no pasa:** velocidad por tiempo,
   pausa con teclado, quieta con movimiento reducido, `aria-hidden` y fuera del h1. El marcador es una
   forma de plumón propia, no el trazo recto de ellos. Además, contraste, oro y desborde están limpios
   en las 12 vistas.
3. **Taller tiene la energía que pidió Ramón**, y con techos medidos y cumplidos (4 marcadores, 1
   banda, 1 garabato, 1 mancha por página).
4. **`generar.mjs` es un buen guardián:** sin tope no toca la red, sin clave falla con instrucciones,
   la clave no aparece en ninguna salida (probado con claves falsas y con un error que la repetía),
   valida la imagen y mide el oro con el mismo cálculo de PIL. La pauta trae reglas claras contra la
   «pastoral gringa», el oro y las personas como equipo o clientes.

### Evidencia

- `e10/qa-paso-2/ronda-1/capturas/`: heroes de `dist` y de las dos direcciones a 1440 y 390, el
  ovillo de The Ready junto a los garabatos propios, tramos de Taller y de Pizarra.
- `e10/qa-paso-2/ronda-1/herramientas/`: `vivo.mjs` y `vivo2.mjs` (lock en vivo), `texto.mjs` y
  `orden.mjs` (texto y orden), `cap.mjs` y `capg.mjs` (capturas, desborde, 404, fotos viejas),
  `oro-por-vista.py`, `contraste.mjs`, `cinta.mjs`, `techos.mjs`, `tipos.mjs`, `foco.mjs`, `hero.mjs`,
  `tablero.mjs`, y `sinred.mjs` y `api.mjs` (precargados para probar `generar.mjs` sin red). Esperan
  `proto/` en 127.0.0.1:8780, `dist/` en 8781 y el tablero en 8782, y escriben en la carpeta donde se
  corren.
