# Overlays del reel — "Tu sitio lleva años sin que nadie lo revise"

**Producidos el 16-oct-2026** con el pipeline de la casa: HTML → Chrome headless a 2x →
LANCZOS a 1080×1920 → PNG con canal alfa verificado (alfa de esquina = 0, rango 0–255 en las diez).
Fuente editable en `_fuente/`.

## Dos juegos, eliges uno

| Carpeta | Cuándo |
|---|---|
| **`con-velo/`** | Fondo claro o con detalle (pared clara, exterior nublado, vegetación). El velo superior da legibilidad |
| **`sin-velo/`** | Fondo ya oscuro o parejo. Solo texto con sombra, no toca la imagen |

**Cómo decidir en diez segundos:** pon el `01-gancho.png` de `con-velo` sobre tu primer fotograma.
Si te oscurece la cara, cambia a `sin-velo`. Si el texto cuesta leerlo, quédate con el velo y, si
hace falta, baja la opacidad del overlay a 60–70% en CapCut. Es un solo deslizador.

## Dónde entra cada uno

Los segundos son del guion. **Lo que manda es la palabra**, porque tu toma no va a calzar exacta.

| # | Archivo | Entra cuando dices | Aprox. | Dura |
|---|---|---|---|---|
| 1 | `01-gancho.png` | **desde el primer fotograma** | 0:00 | 3,5 s |
| 2 | `02-ley.png` | "Ahora hay una **ley**…" | 0:09 | 3,5 s |
| 3 | `03-pregunta.png` | "…no sabes a quién **preguntarle**" | 0:21 | 3,5 s |
| 4 | `04-venta.png` | "Y casi nunca es **así**" | 0:34 | 4 s |
| 5 | `05-cierre.png` | "Hice un chequeo **gratis**…" | 0:44 | hasta el final |

**El 1 es el que más rinde.** En LinkedIn el video arranca mudo en el feed, así que esa pregunta en
el primer fotograma es lo único que frena el scroll antes de que alguien decida darle sonido. Si
solo vas a poner un overlay, pon ese.

## Cómo montarlos en CapCut

1. Importa el PNG como **overlay**, no como imagen de la línea principal.
2. Ya vienen a 1080×1920, así que **no los escales**: quedan calzados al cuadro.
3. **Fundido de entrada y salida de 0,2 s.** Nada más.
4. **Sin animación de texto.** Nada de máquina de escribir, rebote ni zoom. Eso es lo que hace que
   un video se lea como infoproducto, y es justo lo que esta pieza evita.
5. Los subtítulos van **abajo** y los overlays **arriba**: no se pisan. Revísalo igual en el
   preview, porque CapCut a veces sube los subtítulos solo.

## Decisiones de marca que están adentro

- **Tipografía Gabarito semibold**, que es la de marca. No depende del sitio nuevo, así que no entra
  en el congelamiento del sistema visual.
- **Un solo uso del dorado `#C9A227` en toda la pieza**: el punto de `SpindleLab.` en el overlay 5.
  Los otros cuatro son blanco y nada más. Si agregas dorado en otro lado, se rompe la regla.
- **Sin logo, sin etiqueta, sin firma.** El sistema visual está congelado mientras cambia el sitio,
  y esta pieza fue elegida justamente porque no lo necesita.
- **Interlineado 1,08**, no 0,9. A 0,9 las tildes de la segunda línea chocan con la línea de arriba
  (defecto documentado en §10.4 del manual, encontrado en la pieza "AHORA ABRE TU TELÉFONO").
- **El texto del overlay no repite el subtítulo.** El subtítulo lleva tus palabras; el overlay lleva
  la idea. Si dicen lo mismo, el overlay es ruido.

---

# Tercer juego: `recuadro/` — la pieza del sitio

**Agregado el 16-oct a pedido de Ramón**, que quería el mismo recuadro que usan las gráficas de
Instagram. No es una variante de las otras dos: **es otro sistema**, y por eso no se mezcla con
ellas en el mismo video.

## De dónde sale

Tokens copiados literal de `marketing/brand/instagram-v3/base.css` (rama
`claude/cata-evalua-manual-v3`), que a su vez los copió de `driftime.css`, el sitio nuevo:

| Token | Valor | Qué es |
|---|---|---|
| `--d-modulo` | `#161616` | el fondo de la pieza |
| `--d-r` | `17px` | **el único radio del sistema** (6 px del sitio × 2,77) |
| `--d-r4` | `11px` | solo la etiqueta |
| `--d-m` | `90px` | margen a los cuatro lados |
| `--d-fila` | `61px` | relleno interno |
| `--d-filete` | `rgba(247,245,240,.12)` · 3px | el separador |
| `--d-gris` | `#9aa4b0` | texto secundario |
| `--d-oro` | `#c9a227` | **solo el punto del wordmark** |

**Una sola desviación, deliberada:** la pieza va al **92 % de opacidad** en vez de opaca. Sobre
video, un módulo 100 % negro se lee como parche pegado; al 92 % se lee como módulo del sitio y deja
respirar el material de atrás. Si lo prefieres opaco, se sube el deslizador en CapCut.

## Las cinco

Mismos tiempos y mismas entradas que la tabla de arriba.

| # | Archivo | Qué lleva |
|---|---|---|
| 1 | `01-gancho.png` | h1 a tres líneas, sin etiqueta |
| 2 | `02-ley.png` | etiqueta de vidrio **«Ley 21.719»** + h1 + filete + cuerpo |
| 3 | `03-pregunta.png` | h1 a dos líneas |
| 4 | `04-venta.png` | h1 + filete + cuerpo |
| 5 | `05-cierre.png` | rótulo + `verifica.spindlelab.cl` + wordmark con el punto dorado |

**La etiqueta solo va donde dice algo verdadero.** La primera versión llevaba «spindlelab.cl» en la
pieza del gancho, y se sacó: en el kit la etiqueta rotula lo que la pieza *muestra*, y esa pieza no
muestra ningún sitio. «Ley 21.719» sí rotula la fuente de lo que se afirma.

## ⚠️ Dos cosas antes de usarlo

1. **No mezclar juegos.** `con-velo`/`sin-velo` son tipográficos en Gabarito; `recuadro` es el
   sistema del sitio en Manrope. Mezclarlos en el mismo video se ve como dos marcas.
2. **Hay una inconsistencia en el repo que no inventé yo.** El manual (§tipografía) dice Gabarito
   para titulares e **Inter** para cuerpo. El kit de Instagram v3 usa **Manrope**, porque el sitio
   nuevo volvió a Manrope. **Las dos cosas no pueden ser ciertas a la vez.** No la resolví acá
   porque no es decisión de esta pieza, pero alguien tiene que resolverla antes de que haya más
   material en las dos tipografías.

---

# Medición del material grabado (16-oct) y capa de ajustes

Ramón mandó un fotograma del montaje en CapCut. **Todo lo de abajo está medido sobre él**, no
estimado a ojo.

## Lo que midió el fotograma

| Qué | Medición | Qué significa |
|---|---|---|
| Media global | RGB 134 / 122 / 113 | **Ya viene cálido** (R > G > B por 21 puntos). No hay que agregar temperatura |
| Cara, lado izq vs der | 110 vs 164 | Luz de cámara-derecha, con modelado real. **No está plana: no hay que "arreglarla"** |
| Tercios verticales | 162 arriba · 129 medio · **83 abajo** | Caída natural hacia abajo. Juega a favor: los subtítulos blancos de abajo se leen solos |
| Negro / blanco reales | 2 y 242 | El rango ya está casi completo. **Subir contraste fuerte aplastaría** |
| Recorte | 1,67 % ≤ 5 · 0,31 % ≥ 250 | Alguito de sombra tapada y de alta quemada. El canal rojo llega a 255 en la frente y el cojín |
| Polera | tono 279° (violeta) · 23,5 % lum | Dominante magenta en las sombras, típico de sensor de teléfono |
| Pared arriba izq vs der | 68° al 6 % vs 31° al 15 % | **Balance de blancos mixto** a lo ancho del cuadro: izquierda neutra, derecha cálida |
| **Tope de la cabeza** | **y = 16,4 % del cuadro = 314 px en 1920** | Ver abajo: obligó a rehacer los recuadros |

## Capa de ajustes para CapCut

Panel **Ajustar**. Valores pensados para este material, no genéricos.

| Control | Valor | Por qué |
|---|---|---|
| Luminosidad / Brillo | **0** | La exposición está bien. Media 134 sobre 255 |
| Contraste | **+5** | El rango ya va de 2 a 242; más que esto aplasta |
| Saturación | **+3** | Levantar lo justo, la imagen está algo plana |
| **Luces** | **−15** | Recupera el rojo quemado de la frente y el cojín |
| Sombras | **+8** | Abre la polera sin matar la caída de abajo |
| Temperatura | **−5** | **Contraintuitivo pero medido:** ya está cálida. Enfría lo justo y la piel deja de verse rojiza |
| Tono (tinte) | **−4** hacia verde | Compensa el violeta de las sombras (polera en 279°) |
| Nitidez | **+12** | Material de teléfono. **Sobre +18 la piel se vuelve crujiente** |
| Viñeta | **+10** | Sujeta el ojo y de paso oscurece las esquinas de arriba, donde va la tarjeta |

**No toques HSL.** La tentación es bajar el naranja para calmar la lámpara, pero tu piel vive en el
mismo naranja: bajas una y bajas la otra.

## Sobre la lámpara, medido antes de opinar

Se ve fuerte y la primera reacción es quererla apagar. **Medida, no compite con el dorado de la
marca:** la pantalla da entre **24° y 32°** de tono, y el dorado `#C9A227` está en **45,6°**. Son
familias distintas, así que no rompe la regla del acento único.

Y lo más saturado del cuadro **no es la lámpara**: son las altas quemadas del cojín y un brillo en
la frente, que el ajuste de Luces arregla. **La dejaría como está.** Es una lámpara de tu casa, y
que el fondo sea real es parte de por qué la pieza funciona.

## ⚠️ El hallazgo que obligó a rehacer los recuadros

**Tu cabeza empieza a los 314 px** del cuadro de 1920. Los recuadros de `recuadro/` arrancan a los
300 px y miden unos 450 px de alto: **te tapaban la cara**.

**Usa `recuadro-compacto/`.** Misma pieza y mismos tokens, pero relleno 44 en vez de 61, texto en
`--t-h2` (61 px) en vez de `--t-h1`, y arranque a 40 px. Alturas reales medidas sobre el PNG:

| Archivo | Alto | Termina en | Cabeza empieza en |
|---|---|---|---|
| `01-gancho` | 238 px | 275 | 314 ✅ |
| `02-ley` | 228 px | 265 | 314 ✅ |
| `03-pregunta` | 166 px | 203 | 314 ✅ |
| `04-venta` | 166 px | 203 | 314 ✅ |
| `05-cierre` | 264 px | 301 | 314 ✅ |

Verificado componiendo los cinco **sobre tu fotograma real**, no sobre un fondo de control:
`_fuente-recuadro/PRUEBA-sobre-tu-fotograma.jpg`.

**Y queda descartado el juego `sin-velo` para este material.** La zona de arriba mide 148 de
luminancia media con máximos de 252: texto blanco sin fondo ahí no se lee. Las opciones reales son
`recuadro-compacto` (recomendado) o `con-velo`.
