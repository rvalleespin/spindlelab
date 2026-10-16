# Pauta de fotos con IA · E10 (spindlelab-v3)

Bruno, dirección creativa · 16-oct-2026 · **Estado: lista para generar en una sesión con clave.
Aquí no se generó ninguna foto** (no hay `GEMINI_API_KEY` ni `OPENAI_API_KEY` en este entorno).

| Archivo | Para qué |
|---|---|
| `pauta.json` | La fuente de verdad. El script lee de aquí y nada más |
| `pauta.md` | Esto: la misma pauta para leerla. Las fichas y los bloques en inglés están volcados desde `pauta.json`, no copiados a mano |
| `generar.mjs` | El script que genera (Node 22, sin dependencias). Uso en §4 |
| `salida/` | Se crea en la primera corrida: `<F>-<n>.png`, `registro.json` y `oro/` con las máscaras |

Insumos: `e10/lock-the-ready.md` (§7 fotos, §9 Gehl, §10 qué se toma, §12 amarillo y oro, §13
techos), `e10/referentes/marcas-15oct.json` y el manual de marca §06 y §07b.

---

## 0 · En una línea

Fotos documentales de trabajo real en empresas chicas y medianas de Santiago, tomadas desde el lado
de la empresa que vende y no desde el de la consultora. Luz de día neutra, 35 mm a la altura del
ojo, grano fino y color natural sobre neutros fríos con acentos chicos. La gente trabaja en lo suyo,
de espaldas o de perfil, y nunca posa ni se presenta como «el equipo». Se usan dos encuadres, uno por
dirección: **Taller**, cerca y lleno, y **Pizarra limpia**, abierto y quieto.

## 1 · El estilo fijo (lo que hace que todas parezcan del mismo fotógrafo)

| Rasgo | La regla | Por qué |
|---|---|---|
| **Luz** | Solo de día, media mañana, balance neutro (~5500 K), suave y pareja, con sombras leves. Lámparas y ampolletas **apagadas** | The Ready fotografía con lámparas encendidas, jardín al sol y hojas de otoño, y eso es oro: la primera pantalla de nosotros da 0,52 % (lock §7), y **la foto de su hero da 1,055 %** (medido hoy, §7 de esta pauta). Si una foto generada sale «como The Ready», sale con oro |
| **Grano** | Grano fino de película, negros levemente levantados, sin virado ni viñeta. Al final se iguala con un solo grano en todas (§6) | The Ready trae el grano en el archivo, no como capa encima: ruido 12,1 contra 8,1 de una foto sin tratar (lock §7, `lock/the-ready/foto-grano-hero-x2.png`) |
| **Lente y altura** | Cámara de cuadro completo con 35 mm, a la altura del ojo o un poco más arriba, perspectiva natural, sin gran angular | Lo documental de las dos referencias; el gran angular delata el render |
| **Encuadre Taller** | Cerca y lleno: capas delante y detrás, gente y objetos cortados por el borde, la acción a medio hacer. Dos o tres personas como máximo | The Ready a fondo: «más gente trabajando» |
| **Encuadre Pizarra limpia** | Abierto y quieto: al menos la mitad del cuadro es aire (muro, piso, mesa, ventana), una persona como máximo y chica en el cuadro | El aire de Gehl: una persona chica en un cuadro grande (lock §9) |
| **Paleta** | Base en neutros fríos: blanco roto (eco del papel `#FFFEFA`), hormigón, grafito, marino y ciruela profundo (eco de `#1B0925`). Acentos chicos: lima (eco de `#E6FA97`), lavanda (`#EDD1FF`), rosado de nota adhesiva y celeste | Alineada al lock §3: la foto conversa con la página sin repetir sus bandas |
| **Colores prohibidos en la foto** | Dorado, latón, ámbar, mostaza, ocre y **amarillo**. Madera color miel o anaranjada (pino, roble claro barnizado). Atardecer, tungsteno y dominante anaranjada | El amarillo `#F4F480` es del marcador y vive en la página: en la foto competiría con él y se acercaría al oro (lock §12). El naranja `#EC6227` es la mancha de Taller y también vive en la página |
| **Lugares (sí)** | Oficina vidriada de una bodega o distribuidora (Quilicura, Pudahuel), maestranza (San Bernardo), planta en altura con la cordillera (Providencia), sala de reuniones de un edificio antiguo del centro, mesón de ferretería, sala chica en Ñuñoa, calle de Providencia con plátanos en primavera | Oficinas y talleres reales de Chile, no stock gringo |
| **Lugares (no)** | Loft de ladrillo con ampolletas Edison (el interior de The Ready), casa de campo, jardín, otoño, interiores ingleses o de suburbio, cowork con neones y muro verde, carpintería (el pino es oro), soldadura (las chispas son oro) | De Hoare, Ramón dijo «parece pastoral gringa» |
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

12 fotos. **Taller** usa 8 (F1, F3, F4, F5, F6, F7, F8, F10) y **Pizarra limpia** 6 (F2, F8, F9, F10, F11, F12): Taller pide más gente trabajando y Pizarra limpia menos fotos, más aire y casi sin gente. Imprescindibles para el tablero (prioridad 1): Taller F1, F3, F4, F7 · Pizarra limpia F2, F9. Prioridad 2 completa las páginas; prioridad 3 son alternativas.

| F | Foto | Dirección | Prior. | Página · sección | Proporción en página | Gemini (aspectRatio → px) | OpenAI (size) | Personas |
|---|---|---|---|---|---|---|---|---|
| **F1** | Mesa de notas en la oficina de una bodega | Taller | 1 | Home (/v3/) · Hero: columna derecha a sangre, del filete del encabezado a la cinta (como el hero de The Ready) | 0,58 vertical | 9:16 → 768×1344 | 1024x1536 | 3 |
| **F2** | Una persona al fondo de una mesa larga, con la cordillera | Pizarra limpia | 1 | Home (/v3/) · Banda a sangre entre «Qué hacemos» y el primer campo (la foto a sangre de Gehl, como banda propia, sin nada escrito encima) | 21:9 a 1440 · 4:5 a 390 | 16:9 → 1344×768 | 1536x1024 | 1 |
| **F3** | Manos ordenando hojas en tres pilas | Taller | 1 | Home (/v3/) · y Acompañamiento · Collage de la home, pieza A (junto a «Qué hacemos») | 5:4 | 5:4 → 1152×896 | 1536x1024 | 2 |
| **F4** | Escritorio de pie en la oficina de una bodega | Taller | 1 | Home (/v3/) · Collage de la home, pieza B | 4:5 | 4:5 → 896×1152 | 1024x1536 | 1 |
| **F5** | Un mensaje en la maestranza | Taller | 2 | Home (/v3/) · Campo «Alcance», o pieza C del collage | 3:2 | 3:2 → 1248×832 | 1536x1024 | 2 |
| **F6** | Planilla de cuatro columnas en el entrepiso | Taller | 2 | Home (/v3/) · Campo «Continuidad» | 4:3 | 4:3 → 1184×864 | 1536x1024 | 2 |
| **F7** | Hojas en fila en la pared de una sala del centro | Taller | 1 | Acompañamiento (/v3/servicios/acompanamiento-mensual/) · Cabecera, bajo el h1 (donde hoy va d/ventana.jpg) | 3:2 | 3:2 → 1248×832 | 1536x1024 | 2 |
| **F8** | Bocetos de estructura en papel | Taller + Pizarra limpia | 2 | Trabajo (/v3/trabajo/) · «Antes de construir el tuyo», el cierre de la página | 4:3 | 4:3 → 1184×864 | 1536x1024 | 0 |
| **F9** | La mesa después de la reunión | Pizarra limpia | 1 | Acompañamiento (/v3/servicios/acompanamiento-mensual/) · Cabecera, bajo el h1 (donde hoy va d/ventana.jpg) | 3:2 | 3:2 → 1248×832 | 1536x1024 | 0 |
| **F10** | El mensaje que llega al mesón | Taller + Pizarra limpia | 2 | Home (/v3/) · Campo «Visibilidad» | 4:5 | 4:5 → 896×1152 | 1024x1536 | 1 |
| **F11** | Alguien entra al local | Pizarra limpia | 3 | Home (/v3/) · Campo «Alcance» | 16:9 | 16:9 → 1344×768 | 1536x1024 | 1 |
| **F12** | Pasillo de bodega en orden | Pizarra limpia | 3 | Home (/v3/) · Campo «Continuidad» | 4:3 | 4:3 → 1184×864 | 1536x1024 | 0 |

### Cómo se arma el prompt

Ninguno de los dos modelos tiene un campo de negativo, así que lo que no debe salir va dicho en
positivo dentro del texto y como línea final `Avoid: …`. Cada prompt se compone siempre igual:

1. la **escena** propia de la foto (en su ficha, abajo);
2. el **encuadre** de su dirección (Taller o Pizarra limpia);
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

**Negativos comunes** (van al final de todas, después de los propios de cada foto):

- gold, brass, amber, mustard, ochre or yellow objects and tones
- golden-hour or sunset light, warm tungsten or Edison bulbs, orange color cast
- honey-colored or orange wood, cardboard boxes in the foreground
- autumn leaves, gardens, countryside
- exposed red-brick loft, American suburban or English country interiors, chandeliers, period furniture
- readable text, letters, numbers, signs, logos, brand names, watermarks
- people looking at the camera, posed group portrait, stock-photo smiles, handshakes, thumbs up
- deformed or extra fingers, fused hands, distorted faces
- robots, glowing circuits, neon, holograms, futuristic interfaces, blue tech glow
- HDR look, plastic CGI skin, oversharpening, lens flare, bokeh balls

### Fichas

#### F1 · Mesa de notas en la oficina de una bodega

**Qué muestra:** Tres personas de pie alrededor de una mesa blanca larga con hojas impresas y notas de colores, en la oficina vidriada de una distribuidora; la bodega al fondo.

- **Dónde va:** Home (/v3/) · Hero: columna derecha a sangre, del filete del encabezado a la cinta (como el hero de The Ready). El titular y el chequeo quedan a la izquierda, fuera de la foto.
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Proporción y uso:** 0,58 vertical. 391×671 css a 1440 (782×1342 a 2x); a 390 baja bajo el titular a todo el ancho, en 4:5.
- **Salida:** Gemini `9:16` → 768×1344 · OpenAI `1024x1536`. **Recorte:** 1440: quitar 20 px de alto (768×1324). 390: 4:5 desde el centro, con la mujer inclinada dentro.
- **Personas:** 3
- **Negativo propio** (más los comunes): yellow sticky notes; wooden table; anyone facing the camera
- **Riesgo:** Es la foto más cercana a The Ready y la que más fácil se lee como «taller de consultores». Lo que la salva es la bodega detrás del vidrio: si sale borrada o parece una oficina de agencia, no sirve.
- **Alt propuesto:** «Tres personas de pie alrededor de una mesa blanca con hojas impresas y notas de colores, en la oficina vidriada de una bodega.»

Escena (la parte propia del prompt, en inglés):

```text
Vertical photograph. In the glass-walled office corner of a small industrial supplies distributor in Quilicura, Santiago, three people stand around a long white table covered with printed pages and rows of pink, lime-green and pale-blue sticky notes. A woman in her thirties in a deep plum knit sweater leans over the table to place a note, seen in profile. An older man in a navy fleece vest stands with his back to the camera, arms crossed, studying the table. A third person is cut off by the right edge of the frame: only a forearm in a denim sleeve and a pen. Through the glass wall behind them, out of focus, the warehouse: grey steel shelving with grey and blue plastic crates. The table runs diagonally from the lower left corner into the depth of the frame.
```

#### F2 · Una persona al fondo de una mesa larga, con la cordillera

**Qué muestra:** Planta libre en altura en Providencia: una mesa blanca larga junto al ventanal, una sola persona chica al fondo trabajando en un notebook, edificios y la cordillera con nieve detrás.

- **Dónde va:** Home (/v3/) · Banda a sangre entre «Qué hacemos» y el primer campo (la foto a sangre de Gehl, como banda propia, sin nada escrito encima).
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 1**
- **Proporción y uso:** 21:9 a 1440 · 4:5 a 390. 100 % del ancho a 1440 (1440×617 css). A 390, 4:5 a todo el ancho.
- **Salida:** Gemini `16:9` → 1344×768 · OpenAI `1536x1024`. **Recorte:** Se genera en 16:9 para sacar las dos: 21:9 desde el centro (1344×576) y 4:5 desde el centro (614×768). La persona y la cordillera tienen que quedar en la mitad central del ancho. A 1440 se ve casi 1:1 (sin 2x): es el límite de estos modelos; el grano del acabado lo disimula.
- **Personas:** 1
- **Negativo propio** (más los comunes): sunset or orange sky; other people at desks; glass towers reflecting golden light
- **Riesgo:** Que la cordillera salga de postal (cielo azul saturado, nieve de catálogo) o que el modelo llene la planta de gente. La neblina de Santiago es la que la vuelve creíble.
- **Alt propuesto:** «Una persona trabaja sola al fondo de una mesa larga, frente a un ventanal con edificios y la cordillera al fondo.»

Escena (la parte propia del prompt, en inglés):

```text
Wide horizontal photograph of an open-plan office on a high floor in Providencia, Santiago, late morning. A long white table runs parallel to a wall of floor-to-ceiling windows. Beyond the glass: the city's mid-rise buildings and, far behind them, the Andes with patches of snow, softened by a light haze. One person in a charcoal sweater works alone at the far end of the table on a laptop, seen from behind at a distance, small in the frame and close to the center. Most of the frame is quiet: pale floor, the empty length of the table, the window light. One potted plant by the window. Keep the person and the mountains inside the central half of the frame and leave calm space above and below, because the image will be cropped both to a wide 21:9 band and to a 4:5 vertical.
```

#### F3 · Manos ordenando hojas en tres pilas

**Qué muestra:** Dos pares de manos ordenan hojas impresas en tres pilas sobre una mesa blanca, con notas de colores, un plumón ciruela y una taza; sin caras.

- **Dónde va:** Home (/v3/) · y Acompañamiento · Collage de la home, pieza A (junto a «Qué hacemos»). En Acompañamiento puede ir en «Así se ve un mes tipo», Semana 1.
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Proporción y uso:** 5:4. Pieza de collage, 300 a 480 css de ancho a 1440 (The Ready: 0,64 a 1,53).
- **Salida:** Gemini `5:4` → 1152×896 · OpenAI `1536x1024`. **Recorte:** OpenAI: 5:4 desde el centro (1280×1024).
- **Personas:** 2
- **Negativo propio** (más los comunes): faces; more than two pairs of hands; yellow sticky notes; readable words on the pages or notes
- **Riesgo:** Manos en primer plano: es donde más fallan los modelos. Revisar dedos al 100 % en cada variante.
- **Alt propuesto:** «Manos que ordenan hojas impresas en tres pilas sobre una mesa blanca, con notas de colores y un plumón.»

Escena (la parte propia del prompt, en inglés):

```text
Close photograph taken from slightly above, at about 45 degrees, of a white table where two pairs of hands sort printed pages into three loose piles. The pages look like printouts of web pages but show only blurred grey blocks and lines. Pink, lime-green and pale-blue sticky notes are scattered around; a deep plum felt marker lies uncapped; a plain white mug sits at the edge of the frame. One hand slides a page from one pile to another; the other hand holds a sticky note. Only sleeves are visible: a navy fleece and a denim shirt. No faces in the frame.
```

#### F4 · Escritorio de pie en la oficina de una bodega

**Qué muestra:** Una mujer de unos cincuenta, chaleco polar salvia, escribe en un notebook en un escritorio de pie armado sobre una estantería; de perfil; la bodega fuera de foco detrás.

- **Dónde va:** Home (/v3/) · Collage de la home, pieza B.
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Proporción y uso:** 4:5. Pieza de collage, 250 a 380 css de ancho a 1440.
- **Salida:** Gemini `4:5` → 896×1152 · OpenAI `1024x1536`. **Recorte:** OpenAI: 4:5 desde el centro (1024×1280).
- **Personas:** 1
- **Negativo propio** (más los comunes): readable screen; high-visibility vests; cardboard boxes
- **Riesgo:** Que el notebook salga con una manzana o un logo en la tapa.
- **Alt propuesto:** «Una mujer escribe en un notebook en un escritorio de pie, en la oficina de una bodega con estanterías al fondo.»

Escena (la parte propia del prompt, en inglés):

```text
Vertical photograph in the small office of a warehouse in Santiago. A woman in her late forties with dark hair tied back, wearing a sage fleece vest over a lavender shirt, works at a standing desk built on a steel shelf, typing on a matte grey laptop with a blank lid. She is seen in profile, focused, and the screen faces away from the camera. Behind her, out of focus, rows of grey steel shelving with blue and grey plastic crates and a pallet jack. A sheet of paper taped to the shelf shows only blurred lines.
```

#### F5 · Un mensaje en la maestranza

**Qué muestra:** En una maestranza de San Bernardo, un hombre de unos cincuenta con chaqueta de trabajo marino lee un mensaje en el teléfono junto al banco de trabajo; otro trabajador al fondo.

- **Dónde va:** Home (/v3/) · Campo «Alcance», o pieza C del collage.
- **Dirección:** Taller · encuadre Taller · **prioridad 2**
- **Proporción y uso:** 3:2. Media fila del campo (como hoy las fotos del pool) o pieza de collage.
- **Salida:** Gemini `3:2` → 1248×832 · OpenAI `1536x1024`. **Recorte:** Ninguno.
- **Personas:** 2
- **Negativo propio** (más los comunes): welding sparks; brass or copper parts; safety signs; readable phone screen
- **Riesgo:** Que salga un taller de catálogo (todo limpio) o que aparezcan carteles de seguridad amarillos.
- **Alt propuesto:** «En una maestranza, un hombre lee un mensaje en su teléfono junto a un banco de trabajo con piezas de acero.»

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph inside a small metalworking shop (a maestranza) in San Bernardo, Santiago: concrete floor, a steel workbench with galvanized parts and a vise, a lathe in the background, daylight from translucent roof panels. A man in his fifties in a navy work jacket stands by the bench reading a message on his phone, seen in three-quarter back view; the screen faces away from the camera. Far in the background, out of focus, another worker carries a steel bar. No welding and no sparks.
```

#### F6 · Planilla de cuatro columnas en el entrepiso

**Qué muestra:** Dos personas de espaldas mueven notas de colores en una planilla de cuatro columnas hecha con cinta ciruela sobre una pizarra, en el entrepiso de una bodega en Pudahuel.

- **Dónde va:** Home (/v3/) · Campo «Continuidad».
- **Dirección:** Taller · encuadre Taller · **prioridad 2**
- **Proporción y uso:** 4:3. Media fila del campo.
- **Salida:** Gemini `4:3` → 1184×864 · OpenAI `1536x1024`. **Recorte:** OpenAI: 4:3 desde el centro (1365×1024).
- **Personas:** 2
- **Negativo propio** (más los comunes): yellow sticky notes; readable handwriting; anyone facing the camera
- **Riesgo:** Seudoletras nítidas en las notas. Si se leen como palabras inventadas, se descarta.
- **Alt propuesto:** «Dos personas de espaldas mueven notas de colores en una planilla de cuatro columnas pegada en la pared.»

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph in the mezzanine office of a distribution warehouse in Pudahuel, Santiago. Two people stand with their backs to the camera in front of a large wall planner: a grid of four columns made with dark plum tape on a whiteboard, filled with pink, lime-green and pale-blue sticky notes and a few hand-drawn check marks, with no readable writing. A young man in a denim shirt moves a note from one column to the next; a woman in a deep plum sweater holds a plain white cup and watches. Through an interior window on the right, the warehouse floor with shelving below.
```

#### F7 · Hojas en fila en la pared de una sala del centro

**Qué muestra:** En una sala de reuniones de cielo alto en el centro de Santiago, dos personas pegan hojas impresas en fila en la pared y las comparan; una de perfil, otra de espaldas.

- **Dónde va:** Acompañamiento (/v3/servicios/acompanamiento-mensual/) · Cabecera, bajo el h1 (donde hoy va d/ventana.jpg).
- **Dirección:** Taller · encuadre Taller · **prioridad 1**
- **Proporción y uso:** 3:2. Ancho de la columna de contenido a 1440; a 390, 4:5 desde el centro.
- **Salida:** Gemini `3:2` → 1248×832 · OpenAI `1536x1024`. **Recorte:** 390: 4:5 centrado en la mujer que pega la hoja.
- **Personas:** 2
- **Negativo propio** (más los comunes): beige masking tape; wooden paneling; readable pages; anyone facing the camera
- **Riesgo:** En la página de un servicio, dos personas frente a hojas se pueden leer como «el consultor con su cliente». Por eso ninguna explica nada a la otra: las dos miran la pared. Si en la variante una le habla a la otra, se descarta.
- **Alt propuesto:** «Dos personas pegan hojas impresas en fila en la pared de una sala de reuniones de techo alto.»

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph in the meeting room of a mid-sized company in an older building in downtown Santiago: high ceiling, white plastered walls, a tall aluminium-framed window, grey terrazzo floor. Two people tape printed pages in a long row on the wall with white paper tape, comparing them; the pages show only blurred blocks and lines. A woman in her thirties with curly dark hair, in a navy shirt, reaches up to press a page to the wall, seen in profile. A man in his forties in a charcoal sweater stands a step back, seen from behind, looking along the row. On the table in the foreground, out of focus: a closed laptop, sticky notes and a plain mug.
```

#### F8 · Bocetos de estructura en papel

**Qué muestra:** Hojas blancas con esquemas de páginas web dibujados a mano en plumón ciruela (cajas y líneas, sin letras), dos notas de colores y el plumón destapado; sin personas.

- **Dónde va:** Trabajo (/v3/trabajo/) · «Antes de construir el tuyo», el cierre de la página.
- **Dirección:** Taller + Pizarra limpia · encuadre Pizarra limpia · **prioridad 2**
- **Proporción y uso:** 4:3. Media columna a 1440; a 390, todo el ancho.
- **Salida:** Gemini `4:3` → 1184×864 · OpenAI `1536x1024`. **Recorte:** OpenAI: 4:3 desde el centro (1365×1024).
- **Personas:** 0
- **Negativo propio** (más los comunes): hands; letters or placeholder text in the sketches; yellow sticky notes; wooden table
- **Riesgo:** Que los bocetos traigan letras inventadas. Es la única foto de Trabajo y no lleva gente a propósito: junto a la obra, cualquier persona se lee como el cliente.
- **Alt propuesto:** «Bocetos a mano de la estructura de páginas web, en plumón ciruela sobre hojas blancas, con dos notas de colores.»

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph, from above at a slight angle, of a light grey table with several sheets of white paper showing hand-drawn page layouts: rectangles, boxes and lines drawn with a deep plum felt marker, like wireframes of web pages, with no letters, no words and no numbers. Two sheets overlap; one has a pink sticky note and another a lime-green one. An uncapped plum marker lies across the paper. Daylight from a window on the left, soft shadows.
```

#### F9 · La mesa después de la reunión

**Qué muestra:** Sala chica y quieta en Ñuñoa: mesa redonda blanca, una silla corrida, una hoja con una grilla de cuatro semanas y puntos de colores, notebook cerrado, dos tazas; sin personas.

- **Dónde va:** Acompañamiento (/v3/servicios/acompanamiento-mensual/) · Cabecera, bajo el h1 (donde hoy va d/ventana.jpg).
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 1**
- **Proporción y uso:** 3:2. Ancho de la columna de contenido a 1440; a 390, 4:5 desde el centro.
- **Salida:** Gemini `3:2` → 1248×832 · OpenAI `1536x1024`. **Recorte:** 390: 4:5 centrado en la hoja de la grilla.
- **Personas:** 0
- **Negativo propio** (más los comunes): people; food; readable writing on the sheet; wooden table
- **Riesgo:** Que se parezca demasiado a d/ventana.jpg del pool (mesa junto a la ventana). La diferencia tiene que ser la luz de día neutra y la grilla del mes.
- **Alt propuesto:** «Mesa redonda después de una reunión: una hoja con una grilla de cuatro semanas y puntos de colores, un notebook cerrado y dos tazas.»

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph of a small, quiet meeting room in an office in Ñuñoa, Santiago, just after a meeting. A white round table with two chairs, one pushed back. On the table: a single sheet of paper with a hand-drawn grid of four weeks and a few colored dots in pink, lime green and blue, a closed matte grey laptop, two plain white cups. Light from a large window on the left falls across the table. The rest of the frame is calm: a pale wall, the window, one plant.
```

#### F10 · El mensaje que llega al mesón

**Qué muestra:** Detrás del mesón de una ferretería y distribuidora, una vendedora de veintitantos responde el mensaje de un cliente en su teléfono, de perfil; estanterías ordenadas fuera de foco.

- **Dónde va:** Home (/v3/) · Campo «Visibilidad».
- **Dirección:** Taller + Pizarra limpia · encuadre Pizarra limpia · **prioridad 2**
- **Proporción y uso:** 4:5. Media fila del campo (vertical).
- **Salida:** Gemini `4:5` → 896×1152 · OpenAI `1024x1536`. **Recorte:** OpenAI: 4:5 desde el centro (1024×1280).
- **Personas:** 1
- **Negativo propio** (más los comunes): brand logos on products; price tags with numbers; readable phone screen; yellow safety signs
- **Riesgo:** Las ferreterías están llenas de empaques con marca y de amarillo (herramientas, cintas). Si el fondo trae marcas legibles o amarillo saturado, se descarta.
- **Alt propuesto:** «Una vendedora responde un mensaje en su teléfono detrás del mesón de una ferretería.»

Escena (la parte propia del prompt, en inglés):

```text
Vertical photograph at the sales counter of a hardware and industrial supplies store in Santiago. A saleswoman in her twenties, in a plain navy polo shirt, stands behind the counter answering a customer's message on her phone, seen in profile; the screen faces away from the camera. Behind her, out of focus, orderly shelves with grey bins, coils of hose and hand tools, with no labels readable. On the counter: a plain notebook and a pen. Calm, even daylight coming from the shop window.
```

#### F11 · Alguien entra al local

**Qué muestra:** Calle tranquila de Providencia en primavera: la puerta de vidrio de un local chico sin letreros, vereda limpia, plátanos con hoja verde; una persona de espaldas a punto de entrar.

- **Dónde va:** Home (/v3/) · Campo «Alcance».
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 3**
- **Proporción y uso:** 16:9. Media fila del campo; a 390, 4:5 desde el centro.
- **Salida:** Gemini `16:9` → 1344×768 · OpenAI `1536x1024`. **Recorte:** OpenAI: 16:9 desde el centro (1536×864). 390: 4:5 centrado en la puerta.
- **Personas:** 1
- **Negativo propio** (más los comunes): shop signs; street signs; cars as the main subject; autumn colors
- **Riesgo:** Una calle comercial sin un solo letrero es rara; si el modelo los pone, se descarta o se recorta fuera.
- **Alt propuesto:** «Una persona entra a un local pequeño en una calle de Providencia con árboles de hojas verdes.»

Escena (la parte propia del prompt, en inglés):

```text
Wide horizontal photograph of a quiet street in Providencia, Santiago, late morning in spring: the entrance of a small business in a low building, a glass door, a clean concrete sidewalk, plane trees with fresh green leaves. The facade has no signs and no lettering at all. A person in a navy jacket is about to walk in through the door, seen from behind, slightly blurred by motion. Plenty of empty sidewalk and wall in the frame.
```

#### F12 · Pasillo de bodega en orden

**Qué muestra:** Pasillo largo de una bodega ordenada: estanterías grises a los dos lados con cajas plásticas grises, azules y algunas lima, en fila; piso de hormigón con una línea blanca; sin personas.

- **Dónde va:** Home (/v3/) · Campo «Continuidad».
- **Dirección:** Pizarra limpia · encuadre Pizarra limpia · **prioridad 3**
- **Proporción y uso:** 4:3. Media fila del campo.
- **Salida:** Gemini `4:3` → 1184×864 · OpenAI `1536x1024`. **Recorte:** OpenAI: 4:3 desde el centro (1365×1024).
- **Personas:** 0
- **Negativo propio** (más los comunes): yellow floor markings; cardboard boxes; people; forklift painted yellow
- **Riesgo:** Las bodegas reales tienen líneas de piso amarillas y grúas horquilla amarillas: es el oro más probable de toda la pauta. Medir con cuidado.
- **Alt propuesto:** «Pasillo de una bodega ordenada, con estanterías grises y cajas plásticas en fila.»

Escena (la parte propia del prompt, en inglés):

```text
Horizontal photograph of a long aisle in a tidy distribution warehouse in Santiago: grey steel shelving on both sides holding rows of identical plastic crates in grey and blue, with a few lime-green ones, evenly spaced. Even daylight from translucent roof panels, polished concrete floor with a painted walkway line in white. Symmetrical, calm and orderly.
```

## 3 · Equivalencia con los espacios de Lucía

**Estado:** pendiente. Revisado el 16-oct a las 09:03 (Chile): tableros/e10-direcciones/ tiene proto/ (con la clase .foto-slot para el espacio marcado) pero todavía no espacios-foto.json ni páginas. Cuando exista, se llena `lucia` con su F<n> y se corrige `seccion` si su espacio es otro; generar.mjs avisa mientras la tabla siga vacía.

Archivo de Lucía: `tableros/e10-direcciones/espacios-foto.json`. Al llenarla, si un espacio suyo no tiene foto aquí, se agrega una ficha nueva; si una foto de aquí no tiene espacio, baja a prioridad 3.

| Bruno | Página · sección | Lucía (F<n>) | Nota |
|---|---|---|---|
| F1 | Home (/v3/) · Hero: columna derecha a sangre, del filete del encabezado a la cinta (como el hero de The Ready) | _por llenar_ |  |
| F2 | Home (/v3/) · Banda a sangre entre «Qué hacemos» y el primer campo (la foto a sangre de Gehl, como banda propia, sin nada escrito encima) | _por llenar_ |  |
| F3 | Home (/v3/) · y Acompañamiento · Collage de la home, pieza A (junto a «Qué hacemos») | _por llenar_ |  |
| F4 | Home (/v3/) · Collage de la home, pieza B | _por llenar_ |  |
| F5 | Home (/v3/) · Campo «Alcance», o pieza C del collage | _por llenar_ |  |
| F6 | Home (/v3/) · Campo «Continuidad» | _por llenar_ |  |
| F7 | Acompañamiento (/v3/servicios/acompanamiento-mensual/) · Cabecera, bajo el h1 (donde hoy va d/ventana.jpg) | _por llenar_ |  |
| F8 | Trabajo (/v3/trabajo/) · «Antes de construir el tuyo», el cierre de la página | _por llenar_ |  |
| F9 | Acompañamiento (/v3/servicios/acompanamiento-mensual/) · Cabecera, bajo el h1 (donde hoy va d/ventana.jpg) | _por llenar_ |  |
| F10 | Home (/v3/) · Campo «Visibilidad» | _por llenar_ |  |
| F11 | Home (/v3/) · Campo «Alcance» | _por llenar_ |  |
| F12 | Home (/v3/) · Campo «Continuidad» | _por llenar_ |  |

## 4 · Cómo se usa `generar.mjs`

**Requisitos:** Node 22 (probado con 22.22.0), sin `npm install`. Una de dos claves en el entorno:
`GEMINI_API_KEY` (Gemini, modelo `gemini-2.5-flash-image`) u `OPENAI_API_KEY` (OpenAI, modelo
`gpt-image-1`). Si están las dos, usa Gemini salvo que se pida `--proveedor=openai`.

**Dónde se pone la clave:** en una sesión en la nube, en el menú del entorno de la barra de título,
«Editar», como variable de entorno con ese nombre exacto. **La toma solo una sesión nueva** abierta
después del cambio. En una terminal local: `export GEMINI_API_KEY=…` y correr el script desde esa
terminal. Nunca en el chat ni en un archivo del repo.

**La regla del tope.** Sin `--tope` el script **no genera nada**: lista lo que pediría, cuántas
llamadas y cuánto costaría, y no toca la red. Con `--tope=N` genera como máximo N imágenes. Si el plan
pide más, corta en orden de prioridad: primero una variante de cada foto y después las segundas. El
tope se dice antes de correr.

**La corrida recomendada para el tablero** (las 6 imprescindibles, 2 variantes cada una):

```sh
cd marketing/oficina/obras-web/spindlelab-v3/e10/fotos
node generar.mjs --prioridad=1              # 1 · lista y costo, sin red
node generar.mjs --prioridad=1 --tope=12    # 2 · genera 12: ~USD 0,47 con Gemini · ~USD 3,00 con OpenAI (high)
```

Precios de lista conocidos: Gemini USD 0,039 por imagen; `gpt-image-1` en calidad alta USD 0,167
(1024×1024) o 0,25 (1536×1024 y 1024×1536), en media 0,042 o 0,063 y en baja 0,011 o 0,016. Se
verifican en la consola del proveedor antes de una corrida grande. La pauta completa (12 fotos × 2)
son 24 imágenes: ~USD 0,94 con Gemini y ~USD 6,00 con OpenAI (high).

| Opción | Qué hace |
|---|---|
| `--tope=N` | **Obligatorio para generar.** Máximo de imágenes de la corrida (1 a 200) |
| `--solo=F1,F3` | Solo esas fotos |
| `--prioridad=N` | Solo las de prioridad ≤ N (1 = imprescindible para el tablero) |
| `--direccion=taller` · `pizarra` | Solo las fotos de esa dirección |
| `--variantes=N` | Variantes por foto (por defecto 2, máximo 8) |
| `--proveedor=gemini` · `openai` | Fuerza el proveedor. Si su clave no está, termina con el mensaje de qué variable falta |
| `--modelo=…` | Otro modelo del mismo proveedor |
| `--calidad=low` · `medium` · `high` | Solo OpenAI (por defecto `high`) |
| `--tamano=1K` · `2K` · `4K` | Solo Gemini, para modelos que acepten `imageSize` (el 2.5 Flash no lo necesita) |
| `--ver` | Imprime el prompt completo de cada foto elegida (sin red) |
| `--medir=a.png,b.png` | Mide el oro de PNG ya guardados, por ejemplo después del acabado (sin red) |
| `--sincronizar` | Reescribe `prompt_completo_en` desde sus partes después de editar la pauta |
| `--salida=DIR` | Otra carpeta de salida (para pruebas) |
| `--ayuda` | La ayuda |

**Qué deja cada imagen:**

- `salida/<F>-<n>.png`. Nunca pisa: si ya existen `F1-1` y `F1-2`, la próxima corrida empieza en `F1-3`.
  Si el proveedor devolviera JPEG o WebP en vez de PNG, se guarda con su extensión real (`F1-3.jpg`):
  el script no convierte formatos, porque sin dependencias no hay cómo. Ese archivo no trae el oro
  medido; se mide sobre el PNG final con `--medir`.
- Su línea en `salida/registro.json`: archivo, foto, página y sección, proveedor, modelo,
  parámetros, **el prompt exacto**, **fecha UTC y de Chile**, **sha256**, bytes, ancho y alto, mime,
  el oro medido (porcentaje, píxeles y caja), la ruta de la máscara, los segundos, los datos de la
  respuesta y `estado: "por revisar"`. Los intentos fallidos también quedan, en `fallos`, con su
  motivo. **La clave nunca se escribe.**
- Si encuentra oro: `salida/oro/<F>-<n>-oro.png`, la foto en gris con el oro en magenta, para ver de
  un vistazo dónde cae.

**Qué valida antes de guardar:** que los bytes sean de verdad una imagen (firma PNG, JPEG o WebP, y
dimensiones legibles de al menos 256 px). Si el proveedor responde 200 pero sin imagen (un bloqueo de
seguridad, por ejemplo), o con algo que no es una imagen, no se guarda nada y queda en `fallos`.

**Errores y reintentos:** un 429 o un 5xx se reintenta dos veces (a los 4 y a los 12 s) y no cuenta
para el tope, porque el proveedor no procesó. Un error de red **no** se reintenta: la imagen pudo
haberse generado y cobrado. Un 400, 401, 403 o 404 corta la corrida, porque se repetiría en todas.
Cualquier mensaje que traiga algo con forma de clave (`AIza…`, `sk-…`) sale tapado como
`[clave oculta]`.

**Códigos de salida:** 0 todo bien · 1 alguna falló, o `--medir` encontró oro sobre el umbral ·
2 uso o clave (falta la clave, argumento malo, pauta desincronizada) · 3 no salió ninguna.

**La red:** desde este entorno, el `fetch` nativo de Node llega a los dos proveedores sin
configurar nada (probado el 16-oct sin clave: Google responde 403 «unregistered callers» y OpenAI
401 «Missing bearer», es decir, los dos contestan). Si en otro entorno falla por red, el script
sugiere `NODE_USE_ENV_PROXY=1 node generar.mjs …`, que hace que Node use el proxy de `HTTPS_PROXY`.

## 5 · Revisión de cada foto (antes de que vaya al tablero)

1. Oro: el registro trae oro.pct de cada imagen. Más de 0,05 % (el máximo del pool limpio) → abrir la máscara salida/oro/<F>-<n>-oro.png. Si la zona se ve a simple vista, se descarta o esa vista no lleva el punto dorado.
2. Manos y caras al 100 %: cinco dedos, sin fusiones, sin caras derretidas al fondo.
3. Texto: nada legible inventado. Seudoletras nítidas → se descarta, o se recorta si quedan fuera.
4. Marcas: ninguna en tapas de notebook, ropa, tazas, cajas, muros.
5. Equipo o cliente: ¿alguien podría leer a esta gente como el equipo de SpindleLab o como un cliente? (mira a cámara, posa, una le explica a otra, va junto a Ramón o en Trabajo) → no va.
6. Chile creíble: señales gringas (ladrillo rojo de loft, ampolletas Edison, enchufes americanos, letreros en inglés, otoño dorado, suburbio) → se descarta.
7. Familia: puesta junto a las otras elegidas, ¿parece del mismo fotógrafo? Si una está más cálida, más limpia o más «render», se rehace o se corrige en el acabado.
8. Ramón la ve antes de que vaya al tablero publicado.

## 6 · Acabado común (después de elegir, igual para todas)

Lo que hace que todas se vean de una misma marca no es solo el prompt: es un acabado común aplicado DESPUÉS de elegir, igual para todas. No lo hace generar.mjs (sin dependencias no hay procesamiento de imagen); va en la sesión que arma el tablero.

1. Recorte a la proporción final de la ficha (centro, salvo la nota de recorte de cada foto).
2. Balance: un gris de la escena tiene que leerse gris. Si el modelo calentó la imagen, se enfría hasta neutro; nunca se calienta.
3. Grano monocromo fino, el mismo en todas, calibrado contra lock/the-ready/foto-grano-hero-x2.png a 100 % (Lucía midió ruido de alta frecuencia 12,1 en su hero contra 8,1 en una foto sin tratar). Si el modelo ya trajo grano parejo, no se suma.
4. Sin viñeta, sin virado, sin subir saturación más de lo que trae (subir saturación empuja píxeles cerca del oro sobre el umbral de 0,5).
5. Medir oro otra vez sobre el archivo final: `node generar.mjs --medir=<archivo.png>`.
6. Exportar JPG (calidad ~82) y su versión de 800 px (`-800.jpg`), como el pool. Nombre nuevo, nunca sobrescribir una ruta publicada (caché larga; manual §07b y CLAUDE.md).

## 7 · Pruebas hechas el 16-oct (sin clave y sin gastar)

| Prueba | Resultado |
|---|---|
| Sin `--tope`, sin clave, toda la pauta, con un `fetch` y un `socket.connect` trampa que abortan si se intenta salir a la red | Lista las 12 fotos con su archivo de salida, 24 imágenes, USD 0,94 con Gemini y 6,00 con OpenAI. **No tocó la red**, no creó `salida/`. Código 0 |
| `--tope` sin ninguna clave · `--proveedor=openai` sin su clave · clave hecha solo de espacios | Termina con el nombre exacto de la variable que falta, dónde se configura y dónde se crea la clave. Código 2, sin crear carpetas ni tocar la red |
| `--solo=F99` · `--tope=abc` · `--tope=0` · argumento desconocido | Mensaje claro, código 2 |
| Una clave pasada por error como argumento (`--clave=sk-…`) | Sale `--clave=[clave oculta]` |
| Generación completa contra un `fetch` simulado (claves falsas, sin red): Gemini, OpenAI, un archivo que no es imagen, un bloqueo `IMAGE_SAFETY`, un 401 que repite la clave en su mensaje, un 503 y después bien, un JPEG, una imagen de 64 px | La clave va siempre en la cabecera (`x-goog-api-key` o `Authorization`), **nunca en la URL**. Los parámetros llegan bien (`responseModalities: ["IMAGE"]` con su `aspectRatio`; `size`, `quality`, `output_format: png`). Lo que no es imagen y la de 64 px no se guardan. El 401 sale con la clave tapada y corta la corrida. El 503 se reintenta y no consume tope. El JPEG se guarda como `.jpg`. Una segunda corrida sigue en `F1-3` |
| El registro de esa prueba | 7 imágenes y 4 fallos. El sha256 de cada archivo coincide con el registrado; el prompt registrado es idéntico a `prompt_completo_en`; las fechas salen en UTC y en Chile (GMT-3). `grep` de las claves falsas en `salida/` y en los logs: **0** |
| Medición de oro contra `medir.py` (PIL) en tres capturas del lock | **Idéntica píxel a píxel**: nosotros 6.740 px (0,520 %, el 0,52 % del lock), home 1.170 px (0,090 %), foto del hero 3.732 px (1,055 %). El amarillo `#F4F480` no se cuenta como oro; `#C9A227` sí |
| `--sincronizar` sobre la pauta al día · una escena editada sin sincronizar | Sincronizar deja el archivo byte a byte igual. Con la escena editada, generar se niega (código 2) y listar avisa |
| Con un `espacios-foto.json` de prueba al lado (copia en una carpeta temporal) | Avisa que la equivalencia con Lucía sigue sin llenar |

## 8 · Lo que esta pauta no hace

- **No genera ni elige fotos.** Eso va en la sesión con clave, y ninguna foto va al sitio sin que
  Ramón la vea.
- **No aplica el acabado** (balance, grano, recorte, JPG): sin dependencias no hay procesamiento de
  imagen. Va en la sesión que arma el tablero (§6).
- **No toca `spindlelab-astro/`**, ni el texto de E8, los precios, el chequeo o el formulario.
- **No escribe los `alt` definitivos de la página:** los de las fichas son la propuesta, y Clara los
  revisa al montar.
