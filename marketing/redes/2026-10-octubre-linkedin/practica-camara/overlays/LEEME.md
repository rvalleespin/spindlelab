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
