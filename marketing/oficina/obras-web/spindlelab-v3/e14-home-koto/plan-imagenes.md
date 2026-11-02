# Home nueva, composición Koto · plan de imágenes

**2-nov-2026 · Bruno (dirección creativa) · obra E14, prototipo.** Para revisión de Ramón. **No se generó nada y no
se gastó ningún crédito.** En Higgsfield solo se usaron `balance`, `show_plans_and_credits` y `models_explore`
(lectura). Ninguna herramienta `generate_*` ni `execute_preset`. Nada de `spindlelab-astro/` ni de lo publicado se tocó.

Se apoya en: el texto de Clara (`texto-home-propuesta.md`, en esta carpeta, nueve bloques), el lock de Koto
(`../e12/lock-koto.md`, que no se volvió a medir), la regla del dorado (`../e13/spec-home.md` §5) y el video que mandó
Ramón (`hoja.jpg` del scratchpad: showreel, la línea, «Our work» con tarjetas grandes que se apilan, noticias con foto,
contacto con la foto del estudio).

---

## 0 · Lo que manda este plan (tres reglas, en este orden)

1. **Lo real va primero.** Donde hay material verdadero (Combeau, Verifica y Cumple, el chequeo, el panel, la foto de
   Ramón) se usa ese. La IA entra solo en las tres bandas que no tienen nada que mostrar: anuncios, acompañamiento y
   cómo partimos.
2. **Un solo dorado, y es el de la portada.** `spec-home.md` §5 lo deja escrito: el oro del hilo vive en el video de
   arriba y **ningún otro medio de la home puede traer dorado**. Las imágenes generadas se parecen al hilo por la luz
   (fondo casi negro, luz fría verde azulada, foco corto, macro), **no por el color**: el hilo de las bandas es plateado.
   Así la serie se lee como nuestra y el oro sigue siendo uno.
3. **Nada que la IA haga mal y se note.** Ni pantallas, ni papeles con texto, ni gráficos, ni personas. La IA inventa
   letras ilegibles y gráficos que parecen datos: las dos cosas se leen como stock falso, y un gráfico inventado es un
   resultado inventado. Objetos sin texto, en cambio, los hace creíbles. Por eso las tres generadas son **objetos de
   hilo**, no maquetas de interfaz.

**El hilo como serie.** Arriba, el hilo de oro (lo que haces para vender). En las tres bandas de servicio, el mismo
hilo sin oro, haciendo tres cosas distintas: pasar por un solo ojo (anuncios que llevan a un sitio), enrollarse capa
sobre capa en un huso (meses de acompañamiento) y medirse con tres nudos antes de cortar (fases con precio antes de
cobrar). El huso es el objeto que le da nombre a SpindleLab y su disco es el del logo (la i con su disco, `spec-visual.md`
§5.4): la serie no podría ilustrar a otra marca del rubro.

**Para que no se vuelva tic** (lock §14): las tres cambian de plano y de cámara. La 6 es macro de perfil, la 7 es
bodegón en tres cuartos, la 8 es cenital sobre papel. Y entre ellas no van seguidas: las separan las pantallas reales de
las bandas 4 y 5 y el trabajo de la 3.

---

## 1 · La tabla

Formato: **16:9 en escritorio** (las tarjetas de Koto en la home son anchas; el lock mide 16:9 como la proporción más
usada, §2.3) y **4:5 en el teléfono**, recortado del mismo archivo. Por eso todas las generadas llevan el motivo en el
45 % central del ancho: un 4:5 sacado de un 16:9 de 2048 × 1152 mide 922 × 1152, y alcanza para 390 px a 2x.

«Dorado» = píxeles de tono 30 a 60°, S ≥ 0,45, V ≥ 0,45, medido hoy con `imagenes/medir-dorado.py` (la misma ventana de
`spec-home.md` §5). Pesos: `ls` de lo que ya está en `spindlelab-astro/public/v3/`; los de lo que no existe, estimados.

| # | Sección | Fuente | Qué imagen | Ruta o URL | Formato | Imagen o video | Dorado (medido) | Peso |
|---|---|---|---|---|---|---|---|---|
| 1 | Portada | **Real** (generada en ago-2026, ya aprobada) | El hilo de oro, como hoy | `public/v3/portada/hilo-1920.*`, `hilo-960.*`, póster | 16:9 a sangre | Video en bucle, con pausa | 3,6 % (el único permitido) | sin cambio |
| 2 | La línea | **Ninguna, a propósito** | Es la pausa entre el video y el trabajo, como «We make ambitious ideas…» en Koto. Una imagen aquí le quita fuerza al trabajo que viene | | | | | 0 |
| 3a | Trabajo · Bernardo Combeau | **Real** | Dos tarjetas que se apilan: arriba el recorrido del sitio de fotografía; debajo, el book | `public/v3/trabajo/combeau/combeau-fotografia-recorrido-1440.webm` / `.mp4` (+ `-390` y póster) y `combeau-modelo-169.webp` | 16:9 | Video corto (10 s, ya existe) + imagen | Recorrido: mediana 0,03 %, máx. 0,24 % en 20 cuadros · book: 0,00 % | 351 kB + 40 kB póster + 44 kB |
| 3b | Trabajo · Verifica y Cumple | **Real** | La portada de la herramienta | `public/v3/medios/verifica-y-cumple-53.webp` (recomendada) o `-45` | 5:3 (`-53`) o 4:5 (`-45`) | Imagen | `-53`: 0,05 % · `-45`: 0,02 % | 37 kB o 50 kB |
| 3c | Trabajo · spindlelab.cl (opcional, Clara §4.2) | **Real, por capturar** | Una página interna del sitio, nunca la portada (el hilo no va en un marco de trabajo) | `https://spindlelab.cl/metodo/` u otra interior, Playwright a 1440 × 810 | 16:9 | Imagen | Medir: el amarillo `#FFE800` (54,6°) cae en la ventana; encuadrar sin el botón | ~50 kB |
| 4 | Sitio web a medida | **Real, pendiente** | El panel donde Bernardo edita su sitio. **Espacio marcado** en el prototipo hasta que lleguen las capturas que Ramón autorizó | Hueco 16:9 con rótulo mono «Captura del panel de Combeau · pendiente» | 16:9 | Imagen | | ~50 kB |
| 5 | Búsqueda y visibilidad en IA | **Real, por capturar** | El chequeo con el resultado de **spindlelab.cl** (nunca de un prospecto) | `https://spindlelab.cl/diagnostico/`, Playwright a 1440 × 810, la zona del resultado | 16:9 | Imagen | Medir: si entra el botón amarillo, cuenta como dorado; recortar o tapar | ~60 kB |
| 6 | Anuncios en Google y redes | **IA** | **Muchos hilos, un solo ojo.** Hilos plateados que entran desde varios bordes y pasan todos por el ojo de una aguja | `imagenes/06-anuncios-16x9.webp` (por generar) | 16:9, recorte 4:5 | Imagen + **opción de bucle de 5 s** | Debe dar 0 % | ~55 kB (+ ~300 kB el bucle) |
| 7 | Acompañamiento mensual | **IA** | **Capa sobre capa.** Un huso con su disco, el hilo enrollado en vueltas parejas: cada vuelta es un mes encima del anterior | `imagenes/07-acompanamiento-16x9.webp` (por generar) | 16:9, recorte 4:5 | Imagen | Debe dar 0 % | ~55 kB |
| 8 | Cómo partimos | **IA** | **Se mide antes de cortar.** Un hilo tendido recto sobre papel oscuro, con tres nudos que lo parten en tres tramos iguales: tres fases, cada una con su precio, antes de cobrar nada | `imagenes/08-como-partimos-16x9.webp` (por generar) | 16:9, recorte 4:5 | Imagen | Debe dar 0 % | ~50 kB |
| 9 | Contacto | **Real** | La foto de Ramón, donde Koto pone la del estudio | `public/v3/medios/ramon-vallejos-34.webp` | 3:4 | Imagen | 0,00 % | 56 kB |

**Resultado:** 9 bloques; 8 con imagen (la línea queda sin, a propósito). **5 reales** (una por capturar en 3c y 5,
una pendiente en 4), **3 generadas**. Una sola persona en toda la home, y es Ramón, que es real.

### Lo que no entra, medido

- **`combeau-modelo-recorrido-1440` no va en la home:** su póster tiene **5,33 % de dorado** (la luz cálida del
  book). En la tarjeta 3a va la imagen fija `combeau-modelo-169` (0,00 %).
- **`combeau-panel-encuadre-169` tampoco:** 0,47 % (la luz naranja de un retrato).
- **`chequeo-43` de los tableros de E12 no sirve:** es el sitio v2, con el punto dorado en el wordmark y la navegación
  vieja. La captura del chequeo se hace de nuevo.

### El panel de Combeau (banda 4), mientras tanto

En el caso publicado ya hay tres capturas del panel, sacadas de **una copia de prueba** el 3-sep y el 18-oct
(`public/v3/trabajo/combeau/combeau-panel-{entrada,colecciones,encuadre}-169.webp`). Si las capturas nuevas no llegan
antes de publicar, **`combeau-panel-colecciones-169` es el reemplazo real** (0,00 % de dorado, 14 kB, ya publicada
en `/trabajo/combeau/`): muestra justo lo que dice la banda, «un panel para que edites tú». Es mejor reemplazo que
`combeau-fotografia-169`, que repetiría la pieza 3a (Clara §4.3). El prototipo igual deja el hueco marcado, como pide
el encargo.

---

## 2 · Las tres generadas: concepto, prompt exacto y alternativa

**Para las tres:**

- **Modelo:** `nano_banana_pro` a **2K**, proporción **16:9** (acepta referencia de imagen). Si se compra PLUS a tiempo
  para la promoción (§3), `nano_banana_2` a 2K, que entonces no gasta créditos.
- **Referencia de luz:** `imagenes/ref-luz-hilo-sin-oro.webp`, la mitad derecha del póster de la portada (960 × 1080,
  **0,00 % de dorado**, ya hecha y medida hoy). Con el póster entero el modelo copia el oro; con esta mitad copia solo
  el verde azulado y la oscuridad. Se sube con `media_upload` y va como `image_references`.
- **Dos variantes por prompt.** Se elige mirando, no por la primera.
- **Al recibirlas:** `python3 imagenes/medir-dorado.py <archivo>` tiene que dar 0 %; si el modelo metió un brillo cálido,
  se corrige en el revelado (saturación de 30 a 60° a cero) o se descarta. Pasar a WebP 1600 × 900, calidad 78, y el
  recorte 4:5 centrado a 720 × 900.
- **Sin aviso de imagen generada** porque ninguna muestra personas (Clara §4.4). Si alguna sale con una mano, se
  descarta: no se publica con mano.

Frase común que va al final de los tres prompts (se escribe completa en cada uno abajo):
*Use the reference image only for its light and colour; do not copy its shapes.*

### 6 · Anuncios en Google y redes · «Muchos hilos, un solo ojo»

**Por qué:** la banda dice «que llevan a tu sitio». El anuncio de Google, el de Instagram y el post son hilos que
vienen de lados distintos; el sitio es el ojo por el que tienen que pasar todos. Es la frase de la portada («llevan a la
misma dirección») dicha con un objeto. **No** es un celular con un resultado de búsqueda (la idea de Clara): una
pantalla generada trae letras inventadas y una interfaz que no existe, que es lo primero que delata a la IA.

**Prompt (16:9):**

```
Extreme macro photograph of the eye of a single plain steel sewing needle, standing upright in the exact horizontal
centre of the frame, against a near-black background (#060606). Five very fine pale silver-white threads enter the
frame from different edges (top left, left, bottom left, bottom, top), each softly out of focus, and all of them
converge to pass through the same needle eye, emerging on the other side as one single tight strand. Cold low-key
lighting: a deep teal-green rim light from behind, like light caught inside glass fibres; shallow depth of field, only
the needle eye in sharp focus, soft bokeh. Quiet, editorial, cinematic still life; about 85 percent of the frame is
near-black. Palette strictly black, graphite, teal and silver-white. No gold, no amber, no yellow, no orange, no warm
tones, no text, no logos, no screens, no people, no hands. Use the reference image only for its light and colour; do
not copy its shapes.
```

**Bucle opcional de 5 s** (es la única de las tres que gana con movimiento: los hilos tensándose hacia el ojo). Modelo
`kling3_0_turbo`, 720p, 5 s, la imagen elegida como `start_image`, **cámara fija**:

```
Locked-off camera, no camera movement. The five fine threads drift very slowly and tighten gently, as if being pulled
through the needle eye; the bokeh drifts slightly. No new objects, no change of colour or light, no text. Calm and
subtle, five seconds.
```

El bucle se cierra con `ffmpeg` igual que el hilo de la portada (fundido de 1 s entre el final y el principio,
`../e12/medios/hilo/herramientas/hacer-hilo.sh`), sin generar un segundo clip. Se sirve en VP9 + H.264 con póster,
solo se reproduce cuando la tarjeta está a la vista y con `prefers-reduced-motion` queda el póster. Tope de 2 intentos
(regla vigente de mi memoria): si ninguno sirve, la banda va con la imagen fija y no pasa nada.

**Alternativa:** la de Clara (un celular con un resultado de búsqueda que abre un sitio), pero hecha **real**: una
captura de un resultado de Google de spindlelab.cl, montada en HTML. Cero créditos, y es verdad. No la recomiendo para
esta banda porque repite el lenguaje de pantalla de las bandas 4 y 5, que vienen justo antes.

### 7 · Acompañamiento mensual · «Capa sobre capa»

**Por qué:** la banda dice «para sostener lo que ya hiciste» y «cada mes». Un huso con hilo enrollado es eso: cada
vuelta queda encima de la anterior y nada se suelta mientras alguien lo sostiene. Y el huso es el objeto del nombre
(spindle) y su disco es el del logo. No es una mesa con un informe (la idea de Clara): un informe generado trae
números o gráficos ilegibles, y un gráfico inventado es un resultado inventado.

**Prompt (16:9):**

```
Still life photograph of a hand spindle lying on its side on a matte black surface, centred in the frame: a slim
ebonized black wooden shaft with a flat round whorl disc near one end, and pale silver-grey thread wound around the
shaft in many neat, even layers, like rings added one at a time. A single loose end of thread runs out of the frame to
the left, held taut. Three-quarter view from slightly above. Low-key cold light from the upper right, soft teal-green
reflections on the edge of the whorl disc; everything else falls into near-black (#060606). Shallow depth of field,
focus on the wound layers. Restrained, editorial, museum-object feel. Palette strictly black, charcoal, teal and
silver-grey. No gold, no amber, no brass, no warm wood tones, no text, no logos, no people, no hands. Use the reference
image only for its light and colour; do not copy its shapes.
```

**Ojo con la madera:** una madera clara cae en 30 a 40° de tono y daría dorado; por eso el prompt pide madera
ennegrecida. Es lo primero que se mide al recibirla.

**Alternativa:** la mesa de trabajo de Clara con un informe impreso **boca abajo** (así no hay números que inventar),
una taza y un cuaderno cerrado, en la misma luz. Más literal y más «agencia»; la recomiendo menos.

### 8 · Cómo partimos · «Se mide antes de cortar»

**Por qué:** la banda dice «antes de cobrarte nada» y «en qué fases y cuánto cuesta cada una». Es el gesto del
sastre: el hilo se mide y se marca antes de cortar. Tres nudos, tres tramos: las fases, cada una con su precio. Es la
única de las tres en plano cenital y sobre papel, para que no se parezca a las otras dos.

**Prompt (16:9):**

```
Overhead flat-lay photograph of a sheet of matte charcoal paper that fills the frame. A single pale silver-white
thread is laid in one straight horizontal line across the centre of the sheet, with three small, evenly spaced knots
that divide it into three equal segments; its two ends are slightly frayed. Raking low-key light from the left, so
the paper fibre and the knots cast tiny soft shadows; the edges of the frame fall to near-black (#060606), with a faint
cool teal tint in the shadows. Minimal, precise, editorial, a lot of empty space. No writing, no numbers, no printed
text, no rulers, no gold, no amber, no yellow, no warm tones, no logos, no people, no hands. Use the reference image
only for its light and colour; do not copy its shapes.
```

**Ojo con el recorte 4:5:** el hilo horizontal cruza todo el ancho; en el teléfono se ven el nudo del medio y parte de
los dos tramos. Si en el recorte se pierden los tres nudos, se pide una variante con el hilo en diagonal.

**Alternativa sin IA:** una página real de nuestra propuesta por fases (la que arma la skill `cotizaciones`), con
cliente «SpindleLab» y nada inventado, fotografiada o renderizada en ángulo. Es real y no cuesta créditos; pero el
documento de verdad tiene precios y texto chico, y en una tarjeta de la home se vuelve otra sábana de texto, que es
justo lo que Ramón pidió sacar.

---

## 3 · Cotización

**Estado de la cuenta, consultado hoy:** saldo **0 créditos, plan gratuito**; la prueba gratis ya se usó (convertida
en julio). El cuadro de precios dice que este espacio de trabajo **no admite recargas sueltas** (lista de recargas
vacía) **ni recarga automática** (no elegible). Para generar hay que tomar un plan:

| Plan | Precio | Créditos |
|---|---|---|
| PLUS mensual | **USD 49** | 1.000 al mes |
| PLUS anual | USD 39 al mes (USD 468 el año) | 1.000 al mes |
| ULTRA | USD 129 al mes o 99 pagando el año | 3.000 al mes |

**Cuánto gasta este plan** (estimado; ver la nota de abajo):

| Pieza | Modelo | Intentos | Créditos por intento | Créditos |
|---|---|---|---|---|
| 6 · imagen | `nano_banana_pro` 2K | 4 (2 del prompt, 2 de un ajuste) | ~1,67 | ~6,7 |
| 7 · imagen | `nano_banana_pro` 2K | 4 | ~1,67 | ~6,7 |
| 8 · imagen | `nano_banana_pro` 2K | 4 | ~1,67 | ~6,7 |
| 6 · bucle de 5 s (opcional) | `kling3_0_turbo` 720p | 2 (tope) | ~7,5 | ~15 |
| **Subtotal** | | | | **~35** |
| **Con 50 % de margen** | | | | **~53 créditos** |

Sin el bucle: ~20 créditos, ~30 con margen.

**De dónde salen los números.** El precio exacto lo da el preflight de costo (`get_cost: true`), que es un parámetro de
las herramientas de generar; el encargo prohíbe llamarlas, así que **no se corrió**. Lo que hay: el cuadro de precios de
hoy («1.000 créditos = 600 generaciones de Nano Banana Pro», o sea ~1,67 cada una; «~200 videos de Kling 3.0», ~5 cada
uno) y lo medido en este repositorio (`kling3_0_turbo`, 7,5 créditos por 5 s, 2-sep; `marketing/portafolio/plan-e12.md`
§11). Para el video tomé el número medido, que es el más alto. **El primer paso después de la aprobación es el
preflight**, y si alguna pieza sale más cara que esta tabla, se avisa antes de generar.

**En plata: USD 49, un mes de PLUS.** Los ~53 créditos son el 5 % del mes; el costo lo pone el plan, no las imágenes.
Al valor del plan (USD 0,049 por crédito) el trabajo vale unos USD 2,6, pero no hay forma de comprar menos que un mes.
**El plan se renueva solo**: si no se va a usar el mes siguiente, se cancela apenas termine la tanda. Los ~947 créditos
que sobran sirven para la pauta de los casos que quedó cotizada en E12 (~75 créditos, `plan-e12.md` §11) y para
Desarrollo web y Trabajo, que vienen después en esta misma obra.

**La promoción del cuadro, dicha como dato y no como apuro.** El cuadro de hoy dice que quien compre PLUS **hasta el
3-nov** tiene 365 días sin límite en Nano Banana, Seedream 4.5, GPT Image y Kling O1 Image, y 7 días sin límite en
Nano Banana 2 a 2K. Si Ramón decide comprar antes de esa fecha, las imágenes se hacen con `nano_banana_2` y no gastan
créditos; solo el bucle gasta (~15, ~23 con margen). Es el texto del cuadro; no lo verifiqué más allá. **No cambia la
regla:** nada se genera hasta que Ramón apruebe el prototipo y esta cotización, compre o no antes del 3.

---

## 4 · Peso (lo que esto le hace al techo de la home)

La home de hoy está a **1,1 kB** de su techo de primera carga (`spec-home.md` §6, criterio 10). Este plan agrega medios
que antes no estaban, todos **bajo el primer pliegue** y con carga diferida, así que la primera carga casi no se mueve;
la página **recorrida** sí:

| | kB |
|---|---|
| Combeau: recorrido (VP9) + póster + book | 351 + 40 + 44 |
| Verifica y Cumple `-53` | 37 |
| Panel, chequeo y (opcional) spindlelab.cl, estimados | 50 + 60 + 50 |
| Tres generadas, estimadas (imágenes oscuras comprimen bien: el póster del hilo, a 1920, pesa 34 kB) | ~160 |
| Bucle de la 6 (opcional), estimado | ~300 |
| Ramón (ya estaba en la home de hoy) | 0 |
| **Agregado al recorrer** | **~740 sin el bucle · ~1.040 con él** |

Contra el techo de «≤ 1,6 MB recorrida» no entra. Lo que se ahorra al sacar ~800 palabras, las preguntas y el bloque
de quién no alcanza a compensar medios. **Es decisión de Mauro y de Ramón** si el techo se lee sin los medios diferidos,
como ya se propuso para el video de la portada (`spec-home.md` §10.2). Si hay que recortar, el orden es: primero el
bucle de la 6, después el video de Combeau pasa a póster con «reproducir» al pasar, después 3c.

---

## 5 · Lo que queda para Ramón

1. **Aprobar o cambiar los tres conceptos** (aguja, huso, nudos), o elegir la alternativa de cada banda.
2. **¿Bucle en la banda 6, sí o no?** Recomiendo **sí, pero después**: primero las tres fijas, y el bucle solo si al
   verlas en el prototipo la home pide un segundo movimiento además del video de Combeau.
3. **Comprar un mes de PLUS (USD 49) cuando el prototipo esté aprobado**, no antes. Si quiere aprovechar la promoción del
   3-nov, la compra puede ir antes, pero la generación igual espera la aprobación.
4. **Las capturas del panel de Combeau.** Si no llegan, `combeau-panel-colecciones-169` (§1).
5. **3c, spindlelab.cl:** Clara recomienda que no entre todavía y estoy de acuerdo; si entra, se captura una página
   interna sin el botón amarillo en cuadro.

## 6 · Archivos de esta entrega

- `plan-imagenes.md` (este).
- `imagenes/ref-luz-hilo-sin-oro.webp`: la referencia de luz para las tres generadas (mitad derecha del póster de la
  portada, 960 × 1080, 0,00 % de dorado).
- `imagenes/medir-dorado.py`: la medición del dorado para imágenes y videos, para que Javiera la repita sobre cada medio
  nuevo (`spec-home.md` §5 lo exige cada vez que cambia un medio).
