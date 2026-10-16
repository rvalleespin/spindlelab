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
