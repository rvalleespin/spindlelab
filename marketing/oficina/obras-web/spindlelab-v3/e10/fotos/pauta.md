# Pauta de fotos con IA · E10 (spindlelab-v3)

Bruno (dirección creativa) · v3, 2026-10-16 · **Estado: lista para generar en una sesión con
clave. Aquí no se generó ninguna foto** (no hay `GEMINI_API_KEY` ni `OPENAI_API_KEY` en este entorno).

> Este archivo se escribe solo: sale de `pauta.json` con `node generar.mjs --sincronizar`. No se
> edita a mano. Si no es el que sale de `pauta.json`, `generar.mjs` no genera.

| Archivo | Para qué |
|---|---|
| `pauta.json` | La fuente de verdad. Una ficha por espacio de foto del tablero. El script lee de aquí y nada más |
| `pauta.md` | Esto: la misma pauta para leerla. Lo escribe `pauta-md.mjs` desde `pauta.json` |
| `generar.mjs` | El script que comprueba la pauta contra el tablero y genera (Node 22, sin dependencias). Uso en §4 |
| `pauta-md.mjs` | Arma este archivo; lo llama `generar.mjs --sincronizar` |
| `salida/` | Se crea en la primera corrida: `<F>-<dirección>-<n>.png`, `registro.json` y `oro/` con las máscaras |

Insumos: `e10/lock-the-ready.md` (§7 fotos, §9 Gehl, §10 y §10b qué se toma, §13 techos; el §12,
amarillo y oro, en pausa con el logo), `e10/referentes/marcas-15oct.json`, el manual de marca §07b
(personas), los espacios de foto del tablero (`tableros/e10-direcciones/espacios-foto.json`), la paleta propia de
`tableros/e10-direcciones/proto/e10/tokens.css` y el acta de Javiera (`e10/acta-paso-2.md`).

> **El logo y el oro, en pausa.** Ramón, 16-oct: el logo se rediseña después de elegir dirección. El
> punto dorado y la regla de un oro por vista no restringen estas fotos: la pauta ya no prohíbe dorado,
> amarillo ni madera, y ninguna foto se descarta por oro. `generar.mjs` lo sigue midiendo, solo como dato.

---

## 0 · En una línea

Fotos documentales de trabajo real en empresas chicas y medianas de Santiago, tomadas desde el lado
de la empresa que vende y no desde el de la consultora. Luz de día neutra, 35 mm a la altura del
ojo, grano fino y color natural sobre neutros fríos con acentos chicos. La gente trabaja en lo suyo,
de espaldas o de perfil, y nunca posa ni se presenta como «el equipo». Se usan dos encuadres, uno por
dirección: **Taller**, cerca y lleno, y **Pizarra limpia**, abierto y quieto. Cada ficha lleva el de
la dirección donde va.

## 1 · El estilo fijo (lo que hace que todas parezcan del mismo fotógrafo)

| Rasgo | La regla | Por qué |
|---|---|---|
| **Luz** | Solo de día, media mañana, balance neutro (~5500 K), suave y pareja, con sombras leves. Lámparas y ampolletas **apagadas** | The Ready fotografía con lámparas encendidas, jardín al sol y hojas de otoño (lock §7): junto con la casa de campo de Hoare, es lo que Ramón llamó «pastoral gringa». La luz de día neutra es lo que hace que estas fotos sean de Santiago y no de un catálogo gringo |
| **Grano** | Grano fino de película, negros levemente levantados, sin virado ni viñeta. Al final se iguala con un solo grano en todas (§6) | The Ready trae el grano en el archivo, no como capa encima: ruido 12,1 contra 8,1 de una foto sin tratar (lock §7, `lock/the-ready/foto-grano-hero-x2.png`) |
| **Lente y altura** | Cámara de cuadro completo con 35 mm, a la altura del ojo o un poco más arriba, perspectiva natural, sin gran angular | Lo documental de las dos referencias; el gran angular delata el render |
| **Encuadre Taller** | Cerca y lleno: capas delante y detrás, gente y objetos cortados por el borde, la acción a medio hacer. Dos o tres personas como máximo. | The Ready a fondo: «más gente trabajando» |
| **Encuadre Pizarra limpia** | Abierto y quieto: al menos la mitad del cuadro es aire (muro, piso, mesa o ventana), una persona como máximo y chica en el cuadro, líneas limpias. | El aire de Gehl: una persona chica en un cuadro grande (lock §9) |
| **Paleta** | Base en neutros fríos: blanco roto (eco del papel `#F7F5F0`), hormigón, grafito, marino y ciruela profundo (eco de la tinta `#341F34`). Acentos chicos de nota adhesiva: rosado, lima, lavanda y celeste | La foto conversa con la paleta propia de `tokens.css` (papel y una sola tinta ciruela) sin repetir sus bandas. Los acentos son de la escena, no de la página: la paleta propia no tiene lima ni lavanda, y si Ramón elige en el tablero los colores exactos de The Ready, donde sí están, también calzan |
| **El oro y el punto dorado** | En pausa. Ninguna foto se descarta por oro, y la pauta ya no prohíbe dorado, amarillo ni madera | Ramón, 16-oct: el logo se rediseña después de elegir dirección. `generar.mjs` sigue midiendo el oro y lo anota como dato para la marca nueva |
| **Lugares (sí)** | Oficina vidriada de una bodega o distribuidora (Quilicura, Pudahuel), maestranza o taller metalmecánico (San Bernardo), oficina en altura con la cordillera de fondo (Providencia), sala de reuniones en edificio antiguo del centro (cielo alto, terrazo, ventana de aluminio), mesón de una ferretería o distribuidora, sala chica de oficina en Ñuñoa y calle de Providencia con plátanos orientales en primavera (hoja verde) | Oficinas y talleres reales de Chile, no stock gringo |
| **Lugares (no)** | Loft de ladrillo rojo con ampolletas Edison (el interior de The Ready), casa de campo, jardín, otoño, interiores ingleses o de suburbio (lo que Ramón llamó «pastoral gringa») y cowork de diseño con neones o muros de plantas | De Hoare, Ramón dijo «parece pastoral gringa» |
| **Personas** | Adultos chilenos y latinoamericanos de 25 a 60 años, de cuerpos, tonos de piel y pelo variados, con ropa de trabajo común en grafito, marino, ciruela, mezclilla, blanco roto o salvia. Absortos en la tarea, de espaldas, de perfil o de tres cuartos de espalda. **Nadie mira a cámara, nadie posa ni sonríe para la foto.** Manos relajadas y anatómicamente correctas, muchas veces tapadas en parte por objetos | Gente trabajando de verdad (The Ready), sin la grilla de retratos del equipo, que no se toma (lock §10) |
| **Texto y marcas** | Los papeles muestran solo líneas y bloques grises borrosos. Las pantallas van de espaldas o fuera de foco. Ningún logo en tapas de notebook, ropa, tazas, cajas ni muros | Texto inventado nítido es la señal más rápida de imagen generada |
| **Forma en la página** | Radio 0, sin velo, nada escrito encima salvo una etiqueta de pieza | Lock §7 y §10; manual §07b |

### Personas: son ambiente, nunca equipo ni clientes

La regla nueva (plan del 15-oct) permite personas generadas como ambiente con una condición: **nada
puede presentarlas como el equipo de SpindleLab ni como clientes.** En la práctica:

- Las personas generadas son ambiente: gente anónima trabajando en su propia empresa. Nada las presenta como equipo de SpindleLab ni como clientes: sin pie de foto, sin nombre, sin etiqueta de lugar o empresa, sin escena de asesoría (alguien que le explica algo a otro con un informe o una pantalla), sin pose y sin mirar a cámara.
- Ninguna foto generada con personas en la sección «Quién» de la home, en Nosotros ni en la misma banda que el retrato real de Ramón: al lado de él se leerían como su equipo.
- Ninguna foto generada con personas en Trabajo ni junto a una obra: ahí se leerían como el cliente.
- Nunca junto a una cifra, un testimonio o un caso.
- **Alt:** Describe lo que se ve, una imagen y un alt (spec §7). Nunca «equipo», «cliente», «nuestro», «taller con»; nunca el nombre de un barrio o una empresa como si fuera un lugar real fotografiado.
- **Aprobación:** Ninguna foto va al sitio sin que Ramón la vea. Se generan con su clave en una sesión nueva; aquí no se generó ninguna.

### Por qué la gente está en SU empresa

SpindleLab es una persona, y la home lo dice. Una foto de cinco consultores en un taller la
contradice. Por eso nadie de estas fotos está «en una sesión con un asesor»: están en su bodega, su
maestranza, su mesón o su sala de reuniones, haciendo su trabajo. Es el mundo del lector, no el
nuestro.

## 2 · Las fotos

**Una sola numeración, la del tablero.** Cada ficha es un espacio de foto de
`tableros/e10-direcciones/espacios-foto.json`: el F<n> es el número que se ve en el rótulo del tablero, y la
dirección va en cada ficha. Son 9 fichas para 8 números: F8 tiene una por dirección, porque cada
ficha lleva el encuadre de la dirección donde va (y las dos direcciones nunca se publican juntas).
**Taller** usa F1, F2, F3, F4, F6 y F8 y **Pizarra limpia** F5, F7 y F8. Todas tienen espacio en el tablero, así que todas son
prioridad 1. Las fotos de la v1 que no tienen espacio están en «Reservas», al final de esta sección,
y no se generan. La equivalencia con la numeración vieja está en §3.

| F | Dirección | Foto | Página · sección | Espacio a 1440 | Espacio a 390 | Personas |
|---|---|---|---|---|---|---|
| **F1** | Taller | Mesa de notas en la oficina de una bodega | Home · A sangre derecha en «Qué hacemos», al lado de «Tu sitio está escrito para personas…» | 420×724 | 390×488 | 3 |
| **F2** | Taller | El mensaje que llega al mesón | Home · Campo «Visibilidad», en la banda del resaltador («lo que ganas»), a la derecha del texto, el precio y los botones | 443×554 | 280×351 | 2 |
| **F3** | Taller | Planilla de cuatro columnas en el entrepiso | Home · Encabeza «Continuidad» (Acompañamiento mensual), columna izquierda del par Continuidad y Alcance | 617×463 | 390×293 | 2 |
| **F4** | Taller | Un mensaje en la maestranza | Home · Encabeza «Alcance» (redes y Google Ads), columna derecha del par, bajada 120 px (la asimetría de The Ready) | 617×411 | 390×260 | 2 |
| **F5** | Pizarra limpia | Una persona al fondo de una mesa larga, con la cordillera | Home · Banda a sangre entre «Qué hacemos» y los servicios | 1440×617 | 390×488 | 1 |
| **F6** | Taller | Hojas en fila en la pared de una sala del centro | Acompañamiento mensual · A sangre derecha, al lado de «Una auditoría te dice qué hacer; este servicio lo hace y lo sostiene» | 655×436 | 390×260 | 2 |
| **F7** | Pizarra limpia | La mesa después de la reunión | Acompañamiento mensual · Banda a sangre bajo la cabecera, donde el build tenía d/ventana.jpg (que sale) | 1440×617 | 390×488 | 0 |
| **F8** | Taller | Bocetos de estructura en papel, de cerca | Trabajo · «Antes de construir el tuyo», el cierre de Trabajo | 508×381 | 342×257 | 0 |
| **F8** | Pizarra limpia | Bocetos de estructura en papel, sobre una mesa con aire | Trabajo · «Antes de construir el tuyo», el cierre de Trabajo | 844×633 | 342×257 | 0 |

### Formato y recorte

Lo que entrega cada proveedor y el recorte desde el centro para cada ancho, calculados por
`generar.mjs` con las medidas del tablero. Al lado, la **cobertura**: cuántos px del archivo caen en
cada px CSS del espacio. El tablero pide 1× a 1440 y 2× a 390 (nota de `espacios-foto.json`); ⚠ es que no llega.

| F | Dirección | Gemini | Recorte a 1440 | Recorte a 390 | OpenAI | Recorte a 1440 | Recorte a 390 |
|---|---|---|---|---|---|---|---|
| **F1** | Taller | `9:16` → 768×1344 | 768×1324 · 1,83× | 768×960 · 1,97× ⚠ | `1024x1536` | 891×1536 · 2,12× | 1024×1280 · 2,63× |
| **F2** | Taller | `4:5` → 896×1152 | 896×1120 · 2,02× | 896×1120 · 3,20× | `1024x1536` | 1024×1280 · 2,31× | 1024×1280 · 3,66× |
| **F3** | Taller | `4:3` → 1184×864 | 1152×864 · 1,87× | 1152×864 · 2,95× | `1536x1024` | 1365×1024 · 2,21× | 1365×1024 · 3,50× |
| **F4** | Taller | `3:2` → 1248×832 | 1248×832 · 2,02× | 1248×832 · 3,20× | `1536x1024` | 1536×1024 · 2,49× | 1536×1024 · 3,94× |
| **F5** | Pizarra limpia | `16:9` → 1344×768 | 1344×576 · 0,93× ⚠ | 614×768 · 1,57× ⚠ | `1536x1024` | 1536×658 · 1,07× | 819×1024 · 2,10× |
| **F6** | Taller | `3:2` → 1248×832 | 1248×832 · 1,91× | 1248×832 · 3,20× | `1536x1024` | 1536×1024 · 2,35× | 1536×1024 · 3,94× |
| **F7** | Pizarra limpia | `16:9` → 1344×768 | 1344×576 · 0,93× ⚠ | 614×768 · 1,57× ⚠ | `1536x1024` | 1536×658 · 1,07× | 819×1024 · 2,10× |
| **F8** | Taller | `4:3` → 1184×864 | 1152×864 · 2,27× | 1152×864 · 3,37× | `1536x1024` | 1365×1024 · 2,69× | 1365×1024 · 3,99× |
| **F8** | Pizarra limpia | `4:3` → 1184×864 | 1152×864 · 1,36× | 1152×864 · 3,37× | `1536x1024` | 1365×1024 · 1,62× | 1365×1024 · 3,99× |

**Lo que no llega (5):** F1-taller con Gemini a 390: 768×960 para 390×488 css (1,97×) · F5-pizarra con Gemini a 1440: 1344×576 para 1440×617 css (0,93×) · F5-pizarra con Gemini a 390: 614×768 para 390×488 css (1,57×) · F7-pizarra con Gemini a 1440: 1344×576 para 1440×617 css (0,93×) · F7-pizarra con Gemini a 390: 614×768 para 390×488 css (1,57×).

Todo lo que falta es de Gemini: `gemini-2.5-flash-image` entrega alrededor de un megapíxel, así que una banda a sangre de
1440 y su recorte a 4:5 no alcanzan. OpenAI llega en todas. Si a la vista se notan blandas, esas fichas
se generan con `--proveedor=openai` o con un modelo de Gemini que acepte `--tamano=2K`.
No bloquea: se mira en la revisión (§5).

### Cómo se arma el prompt

Ninguno de los dos modelos tiene un campo de negativo, así que lo que no debe salir va dicho en
positivo dentro del texto y como línea final `Avoid: …`. Cada prompt se compone siempre igual:

1. la **escena** propia de la foto (en su ficha, abajo);
2. el **encuadre de su dirección** (Taller o Pizarra limpia). No es un campo de la ficha: sale de la
   dirección, así que una ficha de Taller no puede llevar el encuadre de Pizarra limpia;
3. el **bloque común** de estilo;
4. el **bloque de texto y marcas**;
5. el **bloque de personas**, o el de **sin personas** si la foto no lleva gente;
6. `Avoid:` con los **negativos propios** de la foto y después los **negativos comunes**.

El resultado literal está en `pauta.json` → `fotos[].prompt_completo_en`, y
`node generar.mjs --ver --solo=F1` lo imprime. Si alguien edita una parte y no corre
`--sincronizar`, el script se niega a generar: lo que se manda es lo que se revisó.

**Encuadre Taller**

```text
Framing: close and busy, with layered foreground and background; people and objects are cropped by the edges of the frame; the action is in progress and the frame feels full.
```

**Encuadre Pizarra limpia**

```text
Framing: wide and calm, with generous empty space (at least half of the frame is quiet wall, floor, table or window); at most one person, small in the frame; clean lines, orderly.
```

**Bloque común de estilo**

```text
Documentary editorial photograph of real, everyday work in Santiago, Chile, shot as candid reportage. Places are ordinary working spaces of small and mid-sized Chilean companies: painted concrete or plastered walls, aluminium-framed windows, white or pale grey laminate tables, grey steel shelving, grey and blue plastic crates, a few office plants. Light: natural daylight only, late morning, neutral white balance (about 5500 K), soft and even with gentle shadows; ceiling lights and lamps are switched off. Camera: full-frame camera with a 35 mm lens, eye level or slightly above, natural perspective, no wide-angle distortion. Color: natural and fairly saturated, true to life, built on cool neutrals (off-white, concrete grey, charcoal, navy, deep plum) with small accents of lime green, lavender, pink and sky blue. Finish: subtle fine film grain, slightly lifted blacks, no heavy color grading, no vignette. Everything looks used and real, a little untidy, never a staged showroom.
```

**Texto y marcas**

```text
All paper shows only soft, blurred grey lines, boxes and simple bar shapes, with no readable letters or numbers. Screens are turned away from the camera or show only out-of-focus blocks of color. Every object is unbranded: plain mugs, matte grey laptops with a blank lid, clothing without logos or printing, walls without signs.
```

**Personas (fotos con gente)**

```text
People: Chilean and Latin American adults of varied ages (25 to 60), body types and skin tones, with ordinary faces and natural hair, in everyday work clothes in charcoal, navy, deep plum, denim, off-white or sage (knit sweaters, fleece vests, denim shirts, plain work jackets). They are absorbed in the task: seen from behind, in profile or three-quarter back view, faces partly turned away. Nobody looks at the camera, nobody poses or smiles for the photo. Hands are relaxed and anatomically correct, often partly hidden by objects. They are anonymous people at work in their own company, not a team portrait.
```

**Sin personas (fotos sin gente)**

```text
No people in the frame. The place looks recently used: a chair pushed back, a cup left on the table.
```

**Negativos comunes** (van al final de todas, después de los propios de cada foto). Cubren la luz y
los lugares de la «pastoral gringa», el texto inventado, los logos y las marcas, la gente que posa o
mira a cámara, las manos y caras deformes, la estética genérica de IA y el acabado de render. Desde la
v3 no hay ninguno por el oro: dorado, latón, amarillo, madera clara, cartón y chispas salieron, también
de los negativos propios de cada ficha.

- golden-hour or sunset light, warm tungsten or Edison bulbs, orange color cast
- autumn leaves, gardens, countryside
- exposed red-brick loft, American suburban or English country interiors, chandeliers, period furniture
- readable text, letters, numbers, signs, logos, brand names, watermarks
- people looking at the camera, posed group portrait, stock-photo smiles, handshakes, thumbs up
- deformed or extra fingers, fused hands, distorted faces
- robots, glowing circuits, neon, holograms, futuristic interfaces, blue tech glow
- HDR look, plastic CGI skin, oversharpening, lens flare, bokeh balls

### Fichas

#### F1 · Taller · Mesa de notas en la oficina de una bodega

**Qué muestra:** Tres personas de pie alrededor de una mesa blanca larga con hojas impresas y notas de colores, en la oficina vidriada de una distribuidora; la bodega al fondo.

- **Dónde va:** Home (/v3/) · A sangre derecha en «Qué hacemos», al lado de «Tu sitio está escrito para personas…»: foto vertical a lo alto de la sección, con el texto y «Ver el método» a la izquierda. Gente trabajando es la energía de Taller. Desde la ronda 1 de QA no va en el hero, que volvió al orden del sitio (chequeo, titular, fila de obras).
- **Rótulo en el tablero:** «Foto por generar · F1 · gente de pie en una mesa con hojas y notas»
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Espacio:** 420×724 css a 1440 · 390×488 css a 390
- **Salida:** Gemini `9:16` → 768×1344 · OpenAI `1024x1536`
- **Recorte a 1440:** 0,58 · Gemini 768×1324 (1,83×), OpenAI 891×1536 (2,12×). A 0,58 desde el centro (con Gemini se va una franja chica arriba y abajo; con OpenAI, los costados). La mesa sigue entrando desde abajo a la izquierda y nadie queda cortado por la cara.
- **Recorte a 390:** 4:5 · Gemini 768×960 (1,97×), OpenAI 1024×1280 (2,63×). A 4:5 desde el centro, con la mujer inclinada sobre la mesa dentro del cuadro.
- **Personas:** 3
- **Negativo propio** (más los comunes): anyone facing the camera
- **Riesgo:** Es la foto más cercana a The Ready y la que más fácil se lee como «taller de consultores». Lo que la salva es la bodega detrás del vidrio: si sale borrada o parece una oficina de agencia, no sirve.
- **Alt propuesto:** «Tres personas de pie alrededor de una mesa blanca con hojas impresas y notas de colores, en la oficina vidriada de una bodega.»
- **Salidas:** `salida/F1-taller-<n>.png` · en la v1 era F1. Desde la ronda 1 de QA no va en el hero: va a sangre derecha en «Qué hacemos» (sección reescrita en la v3).

Escena (la parte propia del prompt, en inglés):

```text
Vertical photograph. In the glass-walled office corner of a small industrial supplies distributor in Quilicura, Santiago, three people stand around a long white table covered with printed pages and rows of pink, lime-green and pale-blue sticky notes. A woman in her thirties in a deep plum knit sweater leans over the table to place a note, seen in profile. An older man in a navy fleece vest stands with his back to the camera, arms crossed, studying the table. A third person is cut off by the right edge of the frame: only a forearm in a denim sleeve and a pen. Through the glass wall behind them, out of focus, the warehouse: grey steel shelving with grey and blue plastic crates. The table runs diagonally from the lower left corner into the depth of the frame.
```

#### F2 · Taller · El mensaje que llega al mesón

**Qué muestra:** De cerca y en capas, desde el otro lado del mesón de una ferretería y distribuidora: una vendedora de veintitantos responde un mensaje en su teléfono, de perfil; un compañero cortado por el borde saca una caja de la estantería; en primer plano, fuera de foco, el borde del mesón con un rollo de manguera y una caja de tornillos.

- **Dónde va:** Home (/v3/) · Campo «Visibilidad», en la banda del resaltador («lo que ganas»), a la derecha del texto, el precio y los botones: que te encuentren cuando preguntan por tu rubro es la consulta que llega al mesón.
- **Rótulo en el tablero:** «Foto por generar · F2 · alguien responde a un cliente en el mesón»
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Espacio:** 443×554 css a 1440 · 280×351 css a 390
- **Salida:** Gemini `4:5` → 896×1152 · OpenAI `1024x1536`
- **Recorte a 1440:** 4:5 · Gemini 896×1120 (2,02×), OpenAI 1024×1280 (2,31×). A 4:5 desde el centro (Gemini entrega un poco más alta que 4:5). La vendedora y su teléfono quedan en el centro; el compañero puede salir del cuadro, no la vendedora.
- **Recorte a 390:** 4:5 · Gemini 896×1120 (3,20×), OpenAI 1024×1280 (3,66×). El mismo archivo y el mismo recorte que a 1440: el espacio es 4:5 en las dos.
- **Personas:** 2
- **Negativo propio** (más los comunes): brand logos on products; price tags with numbers; readable phone screen; a customer standing across the counter
- **Riesgo:** Las ferreterías están llenas de empaques con marca y de letreros: si el fondo trae marcas o letras legibles, se descarta. Va sobre la banda del resaltador #EEF26E: si la foto trae una superficie amarilla grande contra su borde, se funde con la banda y la foto pierde el canto; eso se mira al ponerla, no es un negativo del prompt. Y si el compañero queda de frente o mirando a la vendedora, la escena se lee como alguien que la supervisa: se descarta.
- **Alt propuesto:** «Detrás del mesón de una ferretería, una vendedora responde un mensaje en su teléfono mientras un compañero saca una caja de la estantería.»
- **Salidas:** `salida/F2-taller-<n>.png` · en la v1 era F10. Encuadre cambiado de Pizarra limpia a Taller y escena reescrita (acta, defecto 2). Ya no va en Pizarra limpia: no tiene espacio ahí. El 16-oct a las 10:22 el espacio pasó de 398×498 a 443×554 a 1440 (a 390 sigue en 280×351). La proporción no cambió (4:5): el recorte es el mismo y la cobertura a 1440 baja a 2,02× con Gemini y 2,31× con OpenAI, sobre el 1× que pide el tablero (v3).

Escena (la parte propia del prompt, en inglés):

```text
Vertical photograph taken from the customer side of the sales counter of a hardware and industrial supplies store in Santiago, close and layered. In the foreground, out of focus and cut off by the bottom and left edges of the frame: the grey laminate counter with a coil of blue hose and a small grey bin of steel screws. In the middle ground, a saleswoman in her twenties with dark hair tied back, in a plain navy polo shirt, stands behind the counter typing a reply on her phone with both thumbs, seen in profile and absorbed in it; the screen faces away from the camera. Just behind her, a coworker in a charcoal fleece is cut off by the right edge of the frame, reaching up to a shelf for a grey plastic bin. The back wall is packed with grey steel shelving holding grey and blue bins, coils of hose and hand tools, with no labels readable. Even daylight from the shop window on the left.
```

#### F3 · Taller · Planilla de cuatro columnas en el entrepiso

**Qué muestra:** Dos personas de espaldas mueven notas de colores en una planilla de cuatro columnas hecha con cinta ciruela sobre una pizarra, en el entrepiso de una bodega en Pudahuel.

- **Dónde va:** Home (/v3/) · Encabeza «Continuidad» (Acompañamiento mensual), columna izquierda del par Continuidad y Alcance: las cuatro columnas de la planilla son las cuatro semanas del mes tipo.
- **Rótulo en el tablero:** «Foto por generar · F3 · notas en una planilla de cuatro columnas»
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Espacio:** 617×463 css a 1440 · 390×293 css a 390
- **Salida:** Gemini `4:3` → 1184×864 · OpenAI `1536x1024`
- **Recorte a 1440:** 4:3 · Gemini 1152×864 (1,87×), OpenAI 1365×1024 (2,21×). A 4:3 desde el centro (Gemini entrega un poco más ancha). Las cuatro columnas de la planilla enteras.
- **Recorte a 390:** 4:3 · Gemini 1152×864 (2,95×), OpenAI 1365×1024 (3,50×). El mismo archivo y el mismo recorte: el espacio es 4:3 en las dos.
- **Personas:** 2
- **Negativo propio** (más los comunes): readable handwriting; anyone facing the camera
- **Riesgo:** Seudoletras nítidas en las notas. Si se leen como palabras inventadas, se descarta.
- **Alt propuesto:** «Dos personas de espaldas mueven notas de colores en una planilla de cuatro columnas pegada en la pared.»
- **Salidas:** `salida/F3-taller-<n>.png` · en la v1 era F6

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph in the mezzanine office of a distribution warehouse in Pudahuel, Santiago. Two people stand with their backs to the camera in front of a large wall planner: a grid of four columns made with dark plum tape on a whiteboard, filled with pink, lime-green and pale-blue sticky notes and a few hand-drawn check marks, with no readable writing. A young man in a denim shirt moves a note from one column to the next; a woman in a deep plum sweater holds a plain white cup and watches. Through an interior window on the right, the warehouse floor with shelving below.
```

#### F4 · Taller · Un mensaje en la maestranza

**Qué muestra:** En una maestranza de San Bernardo, un hombre de unos cincuenta con chaqueta de trabajo marino lee un mensaje en el teléfono junto al banco de trabajo; otro trabajador al fondo.

- **Dónde va:** Home (/v3/) · Encabeza «Alcance» (redes y Google Ads), columna derecha del par, bajada 120 px (la asimetría de The Ready): llegar a quien ya está buscando es el mensaje que entra al negocio.
- **Rótulo en el tablero:** «Foto por generar · F4 · un mensaje que llega al taller»
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Espacio:** 617×411 css a 1440 · 390×260 css a 390
- **Salida:** Gemini `3:2` → 1248×832 · OpenAI `1536x1024`
- **Recorte a 1440:** 3:2 · Gemini 1248×832 (2,02×), OpenAI 1536×1024 (2,49×). Ninguno: Gemini y OpenAI entregan 3:2 exacta. Se elige la variante en que el hombre del teléfono no queda cortado por el borde.
- **Recorte a 390:** 3:2 · Gemini 1248×832 (3,20×), OpenAI 1536×1024 (3,94×). El mismo archivo: el espacio es 3:2 en las dos.
- **Personas:** 2
- **Negativo propio** (más los comunes): safety signs; readable phone screen
- **Riesgo:** Que salga un taller de catálogo (todo limpio) o que aparezcan carteles de seguridad con letras.
- **Alt propuesto:** «En una maestranza, un hombre lee un mensaje en su teléfono junto a un banco de trabajo con piezas de acero.»
- **Salidas:** `salida/F4-taller-<n>.png` · en la v1 era F5

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph inside a small metalworking shop (a maestranza) in San Bernardo, Santiago: concrete floor, a steel workbench with galvanized parts and a vise, a lathe in the background, daylight from translucent roof panels. A man in his fifties in a navy work jacket stands by the bench reading a message on his phone, seen in three-quarter back view; the screen faces away from the camera. Far in the background, out of focus, another worker carries a steel bar.
```

#### F5 · Pizarra limpia · Una persona al fondo de una mesa larga, con la cordillera

**Qué muestra:** Planta libre en altura en Providencia: una mesa blanca larga junto al ventanal, una sola persona chica al fondo trabajando en un notebook, edificios y la cordillera con nieve detrás.

- **Dónde va:** Home (/v3/) · Banda a sangre entre «Qué hacemos» y los servicios: la foto a sangre de Gehl como banda propia, sin nada escrito encima (manual §07b). Es la única foto grande de la home en Pizarra limpia.
- **Rótulo en el tablero:** «Foto por generar · F5 · una mesa larga junto a la ventana, con la cordillera»
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 1**
- **Espacio:** 1440×617 css a 1440 · 390×488 css a 390
- **Salida:** Gemini `16:9` → 1344×768 · OpenAI `1536x1024`
- **Recorte a 1440:** 21:9 · Gemini 1344×576 (0,93×), OpenAI 1536×658 (1,07×). Se genera en 16:9 para sacar las dos. A 21:9 desde el centro: se va un 25 % del alto, mitad arriba y mitad abajo, así que arriba y abajo de la persona y la cordillera tiene que haber aire.
- **Recorte a 390:** 4:5 · Gemini 614×768 (1,57×), OpenAI 819×1024 (2,10×). A 4:5 desde el centro: la persona y la cordillera tienen que quedar en la mitad central del ancho.
- **Personas:** 1
- **Negativo propio** (más los comunes): sunset or orange sky; other people at desks
- **Riesgo:** Que la cordillera salga de postal (cielo azul saturado, nieve de catálogo) o que el modelo llene la planta de gente. La neblina de Santiago es la que la vuelve creíble.
- **Alt propuesto:** «Una persona trabaja sola al fondo de una mesa larga, frente a un ventanal con edificios y la cordillera al fondo.»
- **Salidas:** `salida/F5-pizarra-<n>.png` · en la v1 era F2

Escena (la parte propia del prompt, en inglés):

```text
Wide horizontal photograph of an open-plan office on a high floor in Providencia, Santiago, late morning. A long white table runs parallel to a wall of floor-to-ceiling windows. Beyond the glass: the city's mid-rise buildings and, far behind them, the Andes with patches of snow, softened by a light haze. One person in a charcoal sweater works alone at the far end of the table on a laptop, seen from behind at a distance, small in the frame and close to the center. Most of the frame is quiet: pale floor, the empty length of the table, the window light. One potted plant by the window. Keep the person and the mountains inside the central half of the frame and leave calm space above and below, because the image will be cropped both to a wide 21:9 band and to a 4:5 vertical.
```

#### F6 · Taller · Hojas en fila en la pared de una sala del centro

**Qué muestra:** En una sala de reuniones de cielo alto en el centro de Santiago, dos personas pegan hojas impresas en fila en la pared y las comparan; una de perfil, otra de espaldas.

- **Dónde va:** Acompañamiento mensual (/v3/servicios/acompanamiento-mensual/) · A sangre derecha, al lado de «Una auditoría te dice qué hacer; este servicio lo hace y lo sostiene»: el trabajo en marcha.
- **Rótulo en el tablero:** «Foto por generar · F6 · dos personas comparan hojas pegadas en la pared»
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Espacio:** 655×436 css a 1440 · 390×260 css a 390
- **Salida:** Gemini `3:2` → 1248×832 · OpenAI `1536x1024`
- **Recorte a 1440:** 3:2 · Gemini 1248×832 (1,91×), OpenAI 1536×1024 (2,35×). Ninguno: Gemini y OpenAI entregan 3:2 exacta. Va a sangre por la derecha, así que el borde derecho de la foto es el de la pantalla: nada importante pegado a ese borde.
- **Recorte a 390:** 3:2 · Gemini 1248×832 (3,20×), OpenAI 1536×1024 (3,94×). El mismo archivo: el espacio es 3:2 también a 390 (no pasa a 4:5).
- **Personas:** 2
- **Negativo propio** (más los comunes): beige masking tape; readable pages; anyone facing the camera
- **Riesgo:** En la página de un servicio, dos personas frente a hojas se pueden leer como «el consultor con su cliente». Por eso ninguna explica nada a la otra: las dos miran la pared. Si en la variante una le habla a la otra, se descarta.
- **Alt propuesto:** «Dos personas pegan hojas impresas en fila en la pared de una sala de reuniones de techo alto.»
- **Salidas:** `salida/F6-taller-<n>.png` · en la v1 era F7. Sección corregida: va a sangre derecha junto a la entrada, y es 3:2 también a 390.

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph in the meeting room of a mid-sized company in an older building in downtown Santiago: high ceiling, white plastered walls, a tall aluminium-framed window, grey terrazzo floor. Two people tape printed pages in a long row on the wall with white paper tape, comparing them; the pages show only blurred blocks and lines. A woman in her thirties with curly dark hair, in a navy shirt, reaches up to press a page to the wall, seen in profile. A man in his forties in a charcoal sweater stands a step back, seen from behind, looking along the row. On the table in the foreground, out of focus: a closed laptop, sticky notes and a plain mug.
```

#### F7 · Pizarra limpia · La mesa después de la reunión

**Qué muestra:** Una sala de reuniones chica y quieta, vista desde unos pasos atrás: al centro, una mesa redonda blanca con una silla corrida, una hoja con una grilla de cuatro semanas y puntos de colores, el notebook cerrado y dos tazas; a la izquierda la ventana, a la derecha un muro claro con una planta. Aire arriba y abajo. Sin personas.

- **Dónde va:** Acompañamiento mensual (/v3/servicios/acompanamiento-mensual/) · Banda a sangre bajo la cabecera, donde el build tenía d/ventana.jpg (que sale). Sin personas: Pizarra limpia deja la gente para Taller y cuenta el servicio con objetos.
- **Rótulo en el tablero:** «Foto por generar · F7 · la mesa de una sala chica, después de la reunión»
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 1**
- **Espacio:** 1440×617 css a 1440 · 390×488 css a 390
- **Salida:** Gemini `16:9` → 1344×768 · OpenAI `1536x1024`
- **Recorte a 1440:** 21:9 · Gemini 1344×576 (0,93×), OpenAI 1536×658 (1,07×). Se genera en 16:9 para sacar las dos, igual que F5 (las dos bandas de Pizarra limpia se hacen igual). A 21:9 desde el centro: se va un 25 % del alto, mitad arriba y mitad abajo; la mesa y lo que tiene encima no se cortan.
- **Recorte a 390:** 4:5 · Gemini 614×768 (1,57×), OpenAI 819×1024 (2,10×). A 4:5 desde el centro: la mesa con la hoja y las tazas entera dentro de la mitad central del ancho. Si quedó corrida, el recorte se mueve hacia ella; nunca se achica la mesa.
- **Personas:** 0
- **Negativo propio** (más los comunes): people; food; readable writing on the sheet; more tables or chairs filling the sides of the room
- **Riesgo:** Que se parezca demasiado a d/ventana.jpg del pool (mesa junto a la ventana): la diferencia tiene que ser la luz de día neutra y la grilla del mes. Que el modelo, al ver una foto ancha, llene la sala de sillas y mesas: los costados van casi vacíos. Y que la mesa quede pegada arriba o abajo: el recorte a 21:9 la cortaría.
- **Alt propuesto:** «Mesa redonda después de una reunión: una hoja con una grilla de cuatro semanas y puntos de colores, un notebook cerrado y dos tazas.»
- **Salidas:** `salida/F7-pizarra-<n>.png` · en la v1 era F9. Reescrita para su espacio, una banda a sangre de 21:9 que pasa a 4:5 a 390 (acta, defecto 2).

Escena (la parte propia del prompt, en inglés):

```text
Wide horizontal photograph of a small, quiet meeting room in an office in Ñuñoa, Santiago, just after a meeting, taken from a few steps back at table height. A white round table with two chairs, one of them pushed back, stands in the middle of the frame. On the table: a single sheet of paper with a hand-drawn grid of four weeks and a few colored dots in pink, lime green and blue, a closed matte grey laptop and two plain white cups. Soft daylight from a large window on the left falls across the table; on the right, a pale wall with one plant. Keep the table and everything on it inside the central half of the frame, and leave calm, empty space above and below it (quiet wall above, floor below), because the image will be cropped both to a wide 21:9 band and to a 4:5 vertical.
```

#### F8 · Taller · Bocetos de estructura en papel, de cerca

**Qué muestra:** De cerca y lleno: hojas blancas superpuestas con esquemas de páginas web dibujados a mano en plumón ciruela (cajas y líneas, sin letras), cortadas por los cuatro bordes; una nota rosada y una lima, el plumón destapado y su tapa al lado. Sin personas.

- **Dónde va:** Trabajo (/v3/trabajo/) · «Antes de construir el tuyo», el cierre de Trabajo: el boceto es lo que viene antes de construir. En Taller va en la banda del resaltador, a la derecha del texto de cierre y de los botones «Correr el chequeo» y «Pedir el diagnóstico».
- **Rótulo en el tablero:** «Foto por generar · F8 · bocetos de páginas hechos a mano en papel»
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Espacio:** 508×381 css a 1440 · 342×257 css a 390
- **Salida:** Gemini `4:3` → 1184×864 · OpenAI `1536x1024`
- **Recorte a 1440:** 4:3 · Gemini 1152×864 (2,27×), OpenAI 1365×1024 (2,69×). A 4:3 desde el centro (Gemini entrega un poco más ancha). Las hojas pueden salir cortadas por los bordes: es el encuadre de Taller.
- **Recorte a 390:** 4:3 · Gemini 1152×864 (3,37×), OpenAI 1365×1024 (3,99×). El mismo archivo y el mismo recorte: el espacio es 4:3 en las dos.
- **Personas:** 0
- **Negativo propio** (más los comunes): hands; letters or placeholder text in the sketches
- **Riesgo:** Que los bocetos traigan letras inventadas. Va sobre la banda del resaltador #EEF26E: una superficie amarilla grande contra el borde de la foto se fundiría con la banda (se mira al ponerla). Es Trabajo y no lleva gente a propósito: junto a la obra, cualquier persona se lee como el cliente.
- **Alt propuesto:** «Bocetos a mano de la estructura de páginas web, en plumón ciruela sobre hojas blancas superpuestas, con dos notas de colores.»
- **Salidas:** `salida/F8-taller-<n>.png` · en la v1 era F8. La v1 tenía una sola ficha para las dos direcciones, con encuadre de Pizarra limpia. Ahora hay una por dirección, cada una con su encuadre. En la v3, la sección dice dónde va hoy: en la banda del resaltador, junto a los botones del cierre, sin óvalo.

Escena (la parte propia del prompt, en inglés):

```text
Close horizontal photograph from above at a slight angle, filled edge to edge with overlapping sheets of white paper showing hand-drawn page layouts: rectangles, boxes and lines drawn with a deep plum felt marker, like wireframes of web pages, with no letters, no words and no numbers. The sheets are cropped by all four edges of the frame; one sheet lies at an angle on top of the others and half covers a layout. A pink sticky note and a lime-green one are stuck on the sheets. The uncapped plum marker lies across a sketch with its cap a few centimeters away, as if someone has just put it down. Daylight from a window on the left, soft shadows under the paper edges.
```

#### F8 · Pizarra limpia · Bocetos de estructura en papel, sobre una mesa con aire

**Qué muestra:** Abierto y quieto: tres hojas con esquemas de páginas web dibujados a mano en plumón ciruela (cajas y líneas, sin letras), en fila sobre una mesa gris claro, con más de la mitad del cuadro de mesa vacía; una nota rosada y el plumón tapado al lado. Sin personas.

- **Dónde va:** Trabajo (/v3/trabajo/) · «Antes de construir el tuyo», el cierre de Trabajo: en la columna de lectura, bajo el texto, como las fotos intermedias de Gehl.
- **Rótulo en el tablero:** «Foto por generar · F8 · bocetos de páginas hechos a mano en papel»
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 1**
- **Espacio:** 844×633 css a 1440 · 342×257 css a 390
- **Salida:** Gemini `4:3` → 1184×864 · OpenAI `1536x1024`
- **Recorte a 1440:** 4:3 · Gemini 1152×864 (1,36×), OpenAI 1365×1024 (1,62×). A 4:3 desde el centro (Gemini entrega un poco más ancha). Las tres hojas enteras; la mesa vacía alrededor no se recorta para acercarlas.
- **Recorte a 390:** 4:3 · Gemini 1152×864 (3,37×), OpenAI 1365×1024 (3,99×). El mismo archivo y el mismo recorte: el espacio es 4:3 en las dos.
- **Personas:** 0
- **Negativo propio** (más los comunes): hands; letters or placeholder text in the sketches; clutter or extra objects
- **Riesgo:** Que los bocetos traigan letras inventadas. Que el modelo llene la mesa de objetos: el aire es lo que la hace de Pizarra limpia. Es Trabajo y no lleva gente a propósito: junto a la obra, cualquier persona se lee como el cliente.
- **Alt propuesto:** «Bocetos a mano de la estructura de páginas web, en plumón ciruela sobre tres hojas blancas en una mesa.»
- **Salidas:** `salida/F8-pizarra-<n>.png` · en la v1 era F8. La versión de Pizarra limpia: tres hojas sobre una mesa con aire, con el encuadre de esa dirección.

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph from above at a slight angle of a large, light grey table. Three sheets of white paper with hand-drawn page layouts (rectangles, boxes and lines drawn with a deep plum felt marker, like wireframes of web pages, with no letters, no words and no numbers) lie in a loose row a little below the center of the frame, with one pink sticky note on the middle sheet. The capped plum marker lies parallel to the sheets. More than half of the frame is empty table surface. Daylight from a window on the left, soft shadows.
```

### Reservas (sin espacio en el tablero: no se generan)

Son fotos de la v1 que ningún prototipo usa. No están en `fotos`, así que `generar.mjs` no las ve.
Si Lucía abre un espacio que les calce, se escriben como ficha nueva con el número del tablero y el
encuadre de esa dirección.

| Reserva | En la v1 | Foto | Dirección | Por qué salió |
|---|---|---|---|---|
| **R1** | F3 | Manos ordenando hojas en tres pilas | Taller | Era la pieza A del collage de la home de Taller; el tablero no tiene collage de fotos en la home. |
| **R2** | F4 | Escritorio de pie en la oficina de una bodega | Taller | Era la pieza B del collage de la home de Taller; el tablero no tiene collage de fotos en la home. |
| **R3** | F11 | Alguien entra al local | Pizarra limpia | Era una alternativa para el campo «Alcance» de Pizarra limpia; el tablero no pone fotos en los campos de esa dirección. |
| **R4** | F12 | Pasillo de bodega en orden | Pizarra limpia | Era una alternativa para el campo «Continuidad» de Pizarra limpia; el tablero no pone fotos en los campos de esa dirección. |

**R1 · Manos ordenando hojas en tres pilas.** Dos pares de manos ordenan hojas impresas en tres pilas sobre una mesa blanca, con notas de colores, un plumón ciruela y una taza; sin caras. Alt: «Manos que ordenan hojas impresas en tres pilas sobre una mesa blanca, con notas de colores y un plumón.»

```text
Close photograph taken from slightly above, at about 45 degrees, of a white table where two pairs of hands sort printed pages into three loose piles. The pages look like printouts of web pages but show only blurred grey blocks and lines. Pink, lime-green and pale-blue sticky notes are scattered around; a deep plum felt marker lies uncapped; a plain white mug sits at the edge of the frame. One hand slides a page from one pile to another; the other hand holds a sticky note. Only sleeves are visible: a navy fleece and a denim shirt. No faces in the frame.
```

**R2 · Escritorio de pie en la oficina de una bodega.** Una mujer de unos cincuenta, chaleco polar salvia, escribe en un notebook en un escritorio de pie armado sobre una estantería; de perfil; la bodega fuera de foco detrás. Alt: «Una mujer escribe en un notebook en un escritorio de pie, en la oficina de una bodega con estanterías al fondo.»

```text
Vertical photograph in the small office of a warehouse in Santiago. A woman in her late forties with dark hair tied back, wearing a sage fleece vest over a lavender shirt, works at a standing desk built on a steel shelf, typing on a matte grey laptop with a blank lid. She is seen in profile, focused, and the screen faces away from the camera. Behind her, out of focus, rows of grey steel shelving with blue and grey plastic crates and a pallet jack. A sheet of paper taped to the shelf shows only blurred lines.
```

**R3 · Alguien entra al local.** Calle tranquila de Providencia en primavera: la puerta de vidrio de un local chico sin letreros, vereda limpia, plátanos con hoja verde; una persona de espaldas a punto de entrar. Alt: «Una persona entra a un local pequeño en una calle con árboles de hojas verdes.»

```text
Wide horizontal photograph of a quiet street in Providencia, Santiago, late morning in spring: the entrance of a small business in a low building, a glass door, a clean concrete sidewalk, plane trees with fresh green leaves. The facade has no signs and no lettering at all. A person in a navy jacket is about to walk in through the door, seen from behind, slightly blurred by motion. Plenty of empty sidewalk and wall in the frame.
```

**R4 · Pasillo de bodega en orden.** Pasillo largo de una bodega ordenada: estanterías grises a los dos lados con cajas plásticas grises, azules y algunas lima, en fila; piso de hormigón con una línea blanca; sin personas. Alt: «Pasillo de una bodega ordenada, con estanterías grises y cajas plásticas en fila.»

```text
Horizontal photograph of a long aisle in a tidy distribution warehouse in Santiago: grey steel shelving on both sides holding rows of identical plastic crates in grey and blue, with a few lime-green ones, evenly spaced. Even daylight from translucent roof panels, polished concrete floor with a painted walkway line in white. Symmetrical, calm and orderly.
```

## 3 · Equivalencia con los espacios de Lucía

**Numeración:** Una sola, la del tablero. Desde la v2 cada ficha lleva el F<n> del espacio de Lucía y su dirección, y las salidas se nombran <F>-<dirección>-<n>.png (por ejemplo F8-taller-1.png). La tabla de abajo es el registro de la renumeración: qué número tenía cada foto en la v1 de esta pauta, que es el que espacios-foto.json anota como «pauta_bruno_16oct».

**Estado:** Conciliada el 16-oct a las 11:11 (Chile) contra espacios-foto.json escrito a las 10:22: 9 espacios, 8 números, 9 fichas, ningún vacío. La conciliación anterior (10:15) quedó vieja cuando, a las 10:22, el tablero cambió F2 de 398×498 a 443×554 a 1440; generar.mjs lo bloqueó (acta, ronda 2, defecto 1). Las cuatro fotos de la v1 sin espacio (F3, F4, F11 y F12) siguen en «reservas» y no se generan.

**Qué bloquea:** generar.mjs compara esta pauta con espacios-foto.json en cada corrida y se niega a generar (código 2) si falta el archivo, si un espacio no tiene ficha, si una ficha no tiene espacio, si la página o la medida de un espacio cambiaron, si la tabla tiene una celda vacía o si una ficha no escribió sus dos recortes. `node generar.mjs --verificar` muestra la comprobación sin generar. Si una foto queda sin espacio, sale a «reservas»; si aparece un espacio nuevo, se le escribe su ficha con el número del tablero.

| Tablero | Dirección | Página | Espacio a 1440 · a 390 | En la v1 de esta pauta | Nota |
|---|---|---|---|---|---|
| **F1** | Taller | Home | 420×724 · 390×488 | F1 | Desde la ronda 1 de QA no va en el hero: va a sangre derecha en «Qué hacemos» (sección reescrita en la v3). |
| **F2** | Taller | Home | 443×554 · 280×351 | F10 | Encuadre cambiado de Pizarra limpia a Taller y escena reescrita (acta, defecto 2). Ya no va en Pizarra limpia: no tiene espacio ahí. El 16-oct a las 10:22 el espacio pasó de 398×498 a 443×554 a 1440 (a 390 sigue en 280×351). La proporción no cambió (4:5): el recorte es el mismo y la cobertura a 1440 baja a 2,02× con Gemini y 2,31× con OpenAI, sobre el 1× que pide el tablero (v3). |
| **F3** | Taller | Home | 617×463 · 390×293 | F6 |  |
| **F4** | Taller | Home | 617×411 · 390×260 | F5 |  |
| **F5** | Pizarra limpia | Home | 1440×617 · 390×488 | F2 |  |
| **F6** | Taller | Acompañamiento mensual | 655×436 · 390×260 | F7 | Sección corregida: va a sangre derecha junto a la entrada, y es 3:2 también a 390. |
| **F7** | Pizarra limpia | Acompañamiento mensual | 1440×617 · 390×488 | F9 | Reescrita para su espacio, una banda a sangre de 21:9 que pasa a 4:5 a 390 (acta, defecto 2). |
| **F8** | Taller | Trabajo | 508×381 · 342×257 | F8 | La v1 tenía una sola ficha para las dos direcciones, con encuadre de Pizarra limpia. Ahora hay una por dirección, cada una con su encuadre. En la v3, la sección dice dónde va hoy: en la banda del resaltador, junto a los botones del cierre, sin óvalo. |
| **F8** | Pizarra limpia | Trabajo | 844×633 · 342×257 | F8 | La versión de Pizarra limpia: tres hojas sobre una mesa con aire, con el encuadre de esa dirección. |

Fotos de la v1 que salieron: F3 → R1, F4 → R2, F11 → R3, F12 → R4 (§2, «Reservas»).

## 4 · Cómo se usa `generar.mjs`

**Requisitos:** Node 22 (probado con 22.22.0), sin `npm install`. Una de dos claves en el entorno:
`GEMINI_API_KEY` (Gemini, modelo `gemini-2.5-flash-image`) u `OPENAI_API_KEY` (OpenAI, modelo
`gpt-image-1`). Si están las dos, usa Gemini salvo que se pida `--proveedor=openai`.

**Dónde se pone la clave:** en una sesión en la nube, en el menú del entorno de la barra de título,
«Editar», como variable de entorno con ese nombre exacto. **La toma solo una sesión nueva** abierta
después del cambio. En una terminal local: `export GEMINI_API_KEY=…` y correr el script desde esa
terminal. Nunca en el chat ni en un archivo del repo.

**Antes de gastar, la pauta contra el tablero.** En cada corrida el script compara `pauta.json` con
`tableros/e10-direcciones/espacios-foto.json` y **no genera** (código 2, con la lista de lo que no calza) si:

- falta `espacios-foto.json`;
- un espacio del tablero no tiene ficha, o una ficha no tiene espacio;
- la página o la medida de un espacio cambió desde que se escribió la ficha;
- la tabla de equivalencia (§3) tiene una celda vacía, una fila de más o una de menos;
- una ficha no escribió su recorte a 1440 o a 390, o pide un formato que el proveedor no tiene;
- `prompt_completo_en` o este `pauta.md` no son los que salen de `pauta.json` (falta `--sincronizar`).

Que un recorte no llegue a la cobertura del tablero, o que cambie el rótulo de un espacio, se avisa
pero no bloquea. `node generar.mjs --verificar` hace solo esta comprobación.

**La regla del tope.** Sin `--tope` el script **no genera nada**: lista lo que pediría, con el recorte
de cada ficha, cuántas llamadas y cuánto costaría, y no toca la red. Con `--tope=N` genera como máximo
N imágenes. Si el plan pide más, corta así: primero una variante de cada ficha y después las segundas.
El tope se dice antes de correr.

**La corrida recomendada para el tablero** (las 9 fichas, 2 variantes cada una):

```sh
cd marketing/oficina/obras-web/spindlelab-v3/e10/fotos
node generar.mjs --verificar      # 0 · la pauta contra el tablero, sin red
node generar.mjs                  # 1 · lista, recortes y costo, sin red
node generar.mjs --tope=18        # 2 · genera 18: ~USD 0,70 con Gemini · ~USD 4,50 con OpenAI (high)
```

Con `--tope=9` sale una variante de cada ficha: alcanza para llenar los 9 espacios del tablero. Precios
de lista conocidos: Gemini USD 0,039 por imagen; `gpt-image-1` en calidad alta USD 0,167
(1024×1024) o 0,25 (1536×1024 y 1024×1536), en media 0,042 o 0,063 y en baja 0,011 o 0,016. Se
verifican en la consola del proveedor antes de una corrida grande.

| Opción | Qué hace |
|---|---|
| `--tope=N` | **Obligatorio para generar.** Máximo de imágenes de la corrida (1 a 200) |
| `--verificar` | Solo compara la pauta con el tablero (y que esté sincronizada). Código 0 si calza, 2 si no |
| `--solo=F1,F8` | Solo esos números del tablero. `F8` trae sus dos fichas; `F8-taller` trae una |
| `--direccion=taller` · `pizarra` | Solo las fichas de esa dirección |
| `--prioridad=N` | Solo las de prioridad ≤ N (hoy todas son 1) |
| `--variantes=N` | Variantes por ficha (por defecto 2, máximo 8) |
| `--proveedor=gemini` · `openai` | Fuerza el proveedor. Si su clave no está, termina con el mensaje de qué variable falta |
| `--modelo=…` | Otro modelo del mismo proveedor |
| `--calidad=low` · `medium` · `high` | Solo OpenAI (por defecto `high`) |
| `--tamano=1K` · `2K` · `4K` | Solo Gemini, para modelos que acepten `imageSize` (el 2.5 Flash no lo necesita) |
| `--ver` | Imprime el prompt completo de cada ficha elegida (sin red) |
| `--medir=a.png,b.png` | Mide el oro de PNG ya guardados, por ejemplo después del acabado (sin red). Es un dato: el oro está en pausa con el logo |
| `--sincronizar` | Reescribe `prompt_completo_en` y este `pauta.md` desde `pauta.json`, y muestra la comprobación |
| `--salida=DIR` | Otra carpeta de salida (para pruebas) |
| `--ayuda` | La ayuda |

**Qué deja cada imagen:**

- `salida/<F>-<dirección>-<n>.png`, con el número del tablero: `F1-taller-1.png`, `F8-pizarra-2.png`.
  Nunca pisa: si ya existen `F1-taller-1` y `F1-taller-2`, la próxima corrida empieza en
  `F1-taller-3`. Si el proveedor devolviera JPEG o WebP en vez de PNG, se guarda con su extensión real:
  el script no convierte formatos, porque sin dependencias no hay cómo. Ese archivo no trae el oro
  medido; se mide sobre el PNG final con `--medir`.
- Su línea en `salida/registro.json`: archivo, número del tablero, dirección, página, sección y medida
  del espacio, proveedor, modelo, parámetros, **el prompt exacto**, **fecha UTC y de Chile**,
  **sha256**, bytes, ancho y alto, mime, el oro medido (porcentaje, píxeles y caja), la ruta de la
  máscara, los segundos, los datos de la respuesta y `estado: "por revisar"`. Los intentos fallidos
  también quedan, en `fallos`, con su motivo. **La clave nunca se escribe.**
- Si encuentra oro: `salida/oro/<F>-<dirección>-<n>-oro.png`, la foto en gris con el oro en magenta,
  para ver de un vistazo dónde cae. Es un dato para cuando exista la marca nueva, no un motivo de
  descarte (§1, «El oro y el punto dorado»).

**Qué valida antes de guardar:** que los bytes sean de verdad una imagen (firma PNG, JPEG o WebP, y
dimensiones legibles de al menos 256 px). Si el proveedor responde 200 pero sin imagen (un bloqueo de
seguridad, por ejemplo), o con algo que no es una imagen, no se guarda nada y queda en `fallos`.

**Errores y reintentos:** un 429 o un 5xx se reintenta dos veces (a los 4 y a los 12 s) y no cuenta
para el tope, porque el proveedor no procesó. Un error de red **no** se reintenta: la imagen pudo
haberse generado y cobrado. Un 400, 401, 403 o 404 corta la corrida, porque se repetiría en todas.
Cualquier mensaje que traiga algo con forma de clave (`AIza…`, `sk-…`) sale tapado como
`[clave oculta]`.

**Códigos de salida:** 0 todo bien (también cuando `--medir` encuentra oro: es un dato) · 1 alguna
falló · 2 la pauta no calza con el tablero o no está sincronizada, uso o clave (falta la clave, argumento
malo) · 3 no salió ninguna.

**La red:** desde este entorno, el `fetch` nativo de Node llega a los dos proveedores sin
configurar nada (probado el 16-oct sin clave: Google responde 403 «unregistered callers» y OpenAI
401 «Missing bearer», es decir, los dos contestan). Si en otro entorno falla por red, el script
sugiere `NODE_USE_ENV_PROXY=1 node generar.mjs …`, que hace que Node use el proxy de `HTTPS_PROXY`.

## 5 · Revisión de cada foto (antes de que vaya al tablero)

1. Oro: en pausa con el logo (reglas.oro). El registro trae oro.pct y, si hay, la máscara en salida/oro/; es un dato para la marca nueva, no un motivo de descarte.
2. Manos y caras al 100 %: cinco dedos, sin fusiones, sin caras derretidas al fondo.
3. Texto: nada legible inventado. Seudoletras nítidas → se descarta, o se recorta si quedan fuera.
4. Marcas: ninguna en tapas de notebook, ropa, tazas, cajas, muros.
5. Equipo o cliente: ¿alguien podría leer a esta gente como el equipo de SpindleLab o como un cliente? (mira a cámara, posa, una le explica a otra, va junto a Ramón o en Trabajo) → no va.
6. Chile creíble, sin «pastoral gringa»: ladrillo rojo de loft, ampolletas Edison, enchufes americanos, letreros en inglés, otoño, suburbio → se descarta.
7. Familia: puesta junto a las otras elegidas, ¿parece del mismo fotógrafo? Si una está más cálida, más limpia o más «render», se rehace o se corrige en el acabado.
8. Ramón la ve antes de que vaya al tablero publicado.

## 6 · Acabado común (después de elegir, igual para todas)

Lo que hace que todas se vean de una misma marca no es solo el prompt: es un acabado común aplicado DESPUÉS de elegir, igual para todas. No lo hace generar.mjs (sin dependencias no hay procesamiento de imagen); va en la sesión que arma el tablero.

1. Recorte a la proporción del espacio, a 1440 y a 390 cuando son distintas (los px están en pauta.md §2, «Formato y recorte»), desde el centro salvo lo que diga el recorte de la ficha.
2. Balance: un gris de la escena tiene que leerse gris. Si el modelo calentó la imagen, se enfría hasta neutro; nunca se calienta.
3. Grano monocromo fino, el mismo en todas, calibrado contra lock/the-ready/foto-grano-hero-x2.png a 100 % (Lucía midió ruido de alta frecuencia 12,1 en su hero contra 8,1 en una foto sin tratar). Si el modelo ya trajo grano parejo, no se suma.
4. Sin viñeta, sin virado, sin subir saturación más de lo que trae: la familia se rompe primero por ahí.
5. Oro: en pausa con el logo (reglas.oro). Si se quiere el dato del archivo final, `node generar.mjs --medir=<archivo.png>`; no decide nada.
6. Exportar JPG (calidad ~82) y su versión de 800 px (`-800.jpg`), como el pool. Nombre nuevo, nunca sobrescribir una ruta publicada (caché larga; manual §07b y CLAUDE.md).

## 7 · Pruebas hechas el 16-oct (sin clave y sin gastar)

Cada prueba dice con qué versión se hizo. Las de la v3 son contra el `espacios-foto.json` vigente; las
anteriores quedan como registro de lo que se probó entonces, contra el tablero de ese momento.

| Prueba | Resultado |
|---|---|
| v3 · `--verificar` contra el `espacios-foto.json` vigente (escrito a las 10:22) | 9 espacios, 9 fichas, ✓ en todos, F2 con 443×554. 5 avisos de cobertura, todos de Gemini y los mismos de la v2 (F1 a 390: 1,97×; F5 y F7: 0,93× a 1440 y 1,57× a 390). Código 0 |
| v3 · La pauta v2 (la de antes de este arreglo) contra ese mismo `espacios-foto.json`, en una copia aislada | Código 2: «F2-taller: el espacio cambió en el tablero (a 1440 398×498 → 443×554)». Es el defecto 1 de la ronda 2, y el script lo bloqueaba sin gastar: 0 intentos de red |
| v3 · Sin `--tope` y sin clave, con un precargado que registra y bloquea fetch, net, tls, http, https y dns | Lista las 9 fichas con su recorte y cobertura: 18 imágenes, USD 0,70 con Gemini y 4,50 con OpenAI (high), y la comprobación «calza». **0 intentos de red**, no crea `salida/`. Código 0 |
| v3 · `--tope=9` sin ninguna clave, mismo precargado | Termina con el nombre exacto de la variable que falta y dónde se configura. Código 2, 0 intentos de red, sin carpeta |
| v3 · Copia aislada contra una API falsa de Gemini (200 con un PNG gris del tamaño de cada proporción, con un parche de 40×40 en #C9A227 y otro en #EEF26E), clave falsa, red real bloqueada, `--tope=9` | 9 imágenes, una por espacio del tablero, 0 fallos. En las 9 el prompt enviado es idéntico a `prompt_completo_en` y lleva el encuadre de su dirección. **Ninguno trae negativos por oro** (sin gold, brass, amber, mustard, ochre, yellow, wood, honey, cardboard, sparks, welding ni copper); «golden-hour» sigue, como luz de la «pastoral gringa». El oro se mide como dato: 1.600 px (0,154 a 0,156 %), solo el parche #C9A227; el #EEF26E no cuenta. La clave va en `x-goog-api-key`, nunca en la URL, y no aparece en `salida/`, stdout ni stderr. Código 0 |
| v3 · `--medir` sobre una de esas imágenes, con 0,155 % de oro | Informa los píxeles, la caja y que «queda anotado; el oro está en pausa con el logo y no descarta la foto». **Código 0** (en la v2 era 1) |
| v3 · Contra una API falsa que responde 400 repitiendo la clave | Sale «[clave oculta]», se corta la corrida después de 1 llamada y la clave no aparece en stdout, stderr ni `registro.json`. Código 3 |
| v3 · `--sincronizar` dos veces seguidas | La segunda deja `pauta.json` y `pauta.md` iguales byte a byte |
| v2 · Sin `--tope`, sin clave, las 9 fichas, con un preload que registra y bloquea cualquier intento de red (contra el `espacios-foto.json` de la mañana) | Lista las 9 fichas (8 números del tablero) con su recorte y cobertura: 18 imágenes, USD 0,70 con Gemini y 4,50 con OpenAI (high), y la comprobación «calza». **0 intentos de red**, no crea `salida/`. Código 0 |
| v2 · `--verificar` contra el `espacios-foto.json` de la mañana (ya no es el vigente) | 9 espacios, 9 fichas, ✓ en todos. 5 avisos de cobertura, todos de Gemini (F1 a 390: 1,97×; F5 y F7: 0,93× a 1440 y 1,57× a 390). Código 0. Dejó de calzar a las 10:22, cuando el tablero cambió F2 a 443×554: la v2 terminaba con código 2 (acta, ronda 2, defecto 1). La v3 lo arregla (arriba) |
| v2 · Doce copias aisladas, cada una con una cosa que no calza, con clave falsa y `--tope=18`: sin `espacios-foto.json` · un espacio cambia de medida · aparece un espacio nuevo · sale un espacio · una celda vacía en la tabla · una fila menos en la tabla · una escena editada sin sincronizar · falta un recorte · una ficha con encuadre ajeno · una ficha F10 sin espacio · un tamaño de OpenAI que no existe · una ficha repetida | Las doce terminan con código 2 y la causa nombrada (qué espacio, qué medida antes y después). **0 llamadas a la API** y sin crear `salida/` en las doce |
| v2 · La pauta v1 con el script v2 y el primer comando que documentaba la v1 (`--prioridad=1 --tope=12`) | Código 2, 80 cosas que no calzan, 0 llamadas. Es el caso del acta (defecto 1): ya no genera fotos sin espacio ni deja espacios vacíos |
| v2 · `pauta.md` editado a mano · el rótulo de un espacio cambiado en el tablero | El primero bloquea (código 2, 0 llamadas). El segundo genera y avisa el cambio de rótulo, porque no cambian ni la página ni la medida |
| v2 · Generación contra una API falsa (PNG reales del tamaño de cada proveedor, clave falsa, red real bloqueada): `--tope=9`, después `--tope=18`, después `--solo=F7,F5 --proveedor=openai --variantes=1` | 29 imágenes, 0 fallos. **`--tope=9` deja exactamente una por ficha: los 9 espacios del tablero con foto.** Nombres con número del tablero y dirección (`F8-taller-1`, `F8-pizarra-1`); la segunda corrida sigue en -2 y -3, la de OpenAI en -4. En las 29, el prompt registrado es idéntico a `prompt_completo_en` y lleva el encuadre de su dirección y no el otro (F2 sale con el de Taller). F5 y F7 se piden en 16:9. La clave nunca va en la URL y no aparece en `salida/`, stdout ni stderr |
| v2 · Fallos de la API en una corrida: 503 y después bien, respuesta sin imagen (`IMAGE_SAFETY`), algo que no es imagen, 401 que repite la clave | El 503 se reintenta y no consume tope; la imagen siguiente se guarda. Sin imagen y no-imagen no se guardan y quedan en `fallos`. El 401 sale con `[clave oculta]` y corta la corrida. Código 1. La clave falsa: 0 apariciones en archivos y salidas |
| v2 · `--solo=F8` · `--solo=f8-pizarra` · `--solo=R1` · `--solo=F9` · `--direccion=pizarra` | F8 trae sus dos fichas; f8-pizarra, una; R1 dice que es una reserva y no se genera; F9 no existe (código 2 en los dos); pizarra trae F5, F7 y F8 |
| v2 · `--sincronizar` dos veces seguidas | La segunda deja `pauta.json` y `pauta.md` iguales byte a byte |
| v1, repetida en la v2 · `--tope` sin ninguna clave · `--proveedor=openai` sin su clave · clave hecha solo de espacios | Termina con el nombre exacto de la variable que falta, dónde se configura y dónde se crea la clave. Código 2, sin crear carpetas ni tocar la red |
| v1, repetida en la v2 · `--tope=abc` · `--tope=0` · argumento desconocido · `--verificar=si` · una clave pasada por error como argumento (`--clave=sk-…`) | Mensaje claro, código 2. La clave sale como `--clave=[clave oculta]` |
| v1, sigue valiendo como medida · Medición de oro contra `medir.py` (PIL) en tres capturas del lock. Desde la v3 el oro es un dato, no un criterio | **Idéntica píxel a píxel**: nosotros 6.740 px (0,520 %, el 0,52 % del lock), home 1.170 px (0,090 %), foto del hero 3.732 px (1,055 %); la del hero, repetida con el script v2, da lo mismo. El amarillo `#F4F480` no se cuenta como oro; `#C9A227` sí |

## 8 · Lo que esta pauta no hace

- **No genera ni elige fotos.** Eso va en la sesión con clave, y ninguna foto va al sitio sin que
  Ramón la vea.
- **No aplica el acabado** (balance, grano, recorte, JPG): sin dependencias no hay procesamiento de
  imagen. Va en la sesión que arma el tablero (§6).
- **No decide los espacios.** Los pone Lucía en el tablero; esta pauta los sigue y el script
  comprueba que calcen.
- **No toca `spindlelab-astro/`**, ni el texto de E8, los precios, el chequeo o el formulario.
- **No escribe los `alt` definitivos de la página:** los de las fichas son la propuesta, y Clara los
  revisa al montar.

## 9 · Historial

- v1 · 16-oct, 09:03 · 12 fotos con numeración propia (F1 a F12). Revisada antes de que existiera espacios-foto.json.
- v2 · 16-oct, 10:15 · Acta de Javiera, ronda 1. Defecto 1: una sola numeración, la del tablero (9 fichas para 9 espacios, F8 una por dirección); F3, F4, F11 y F12 de la v1 salen a reservas; tabla de equivalencia llena; generar.mjs bloquea si la pauta y los espacios no calzan. Defecto 2: la foto de la banda de Acompañamiento en Pizarra limpia (v1 F9, ahora F7) se reescribe en 16:9 con sus dos recortes, como la banda de la home; el encuadre ya no es un campo de la ficha, sale de su dirección, así que el mesón (v1 F10, ahora F2) pasa a encuadre Taller con la escena reescrita. Defecto 12: el alt de la reserva R3 (v1 F11) ya no nombra un barrio.
- v3 · 16-oct, 11:11 · Acta de Javiera, ronda 2, defecto 1: la pauta vuelve a calzar con espacios-foto.json de las 10:22 (F2 pasa de 398×498 a 443×554 a 1440; sigue en 4:5, así que el recorte es el mismo y la cobertura sigue sobre el 1×: 2,02× con Gemini y 2,31× con OpenAI). F1, F2 y F8 de Taller dicen dónde van hoy: F1 en «Qué hacemos» y no en el hero; F2 sin garabato al lado; F8 junto a los botones del cierre, sin óvalo; las dos en la banda del resaltador #EEF26E. La paleta del estilo es la propia de tokens.css (papel #F7F5F0, tinta ciruela #341F34): salen la paleta de The Ready (#FFFEFA, #1B0925, #E6FA97, #EDD1FF) y la mancha naranja. Decisión de Ramón del 16-oct (el logo se rediseña después de elegir dirección): el oro sale de los negativos, comunes y propios (dorado, latón, ámbar, mostaza, ocre, amarillo, madera, cartón, chispas, cobre), de los lugares prohibidos y de los motivos de descarte; quedan los de texto, logos y marcas, manos y caras deformes, personas como ambiente, «pastoral gringa», estética genérica de IA y acabado de render. generar.mjs sigue midiendo el oro, solo como dato: `--medir` ya no termina en 1 por oro. §3 y §7 reescritos con lo que es cierto hoy.
