# Tarjetas de la tanda de noviembre — sistema de Verifica y Cumple

**30-oct-2026.** Quince tarjetas transparentes para los cuatro reels cara a cámara.
Guion y montaje: `../00-tanda-cuatro-reels.md`.

**Sistema visual: Verifica y Cumple.** Archivo Black, acento lima. Cero Gabarito, cero Manrope,
cero dorado, cero `#0e141b`. Eso es SpindleLab, que es otra marca.

## Las quince

| Guion | Tarjetas | Cierre |
|---|---|---|
| 1 · cafés | `g1-1` a `g1-4` | `../../2026-10-octubre-verifica/05-overlays-video/recuadro-sitio-cuadro.png` |
| 2 · salud | `g2-1` a `g2-4` | el mismo |
| 3 · contabilidad | `g3-1` a `g3-4` | el mismo |
| 4 · tutorial | `g4-1` a `g4-3` | el mismo |

**La tarjeta de cierre no se rehízo**: ya existe, ya salió publicada y lleva el dominio en lima. Que
las cuatro piezas cierren igual es continuidad de campaña, no pereza.

`g1-3`/`g2-3` y `g1-4`/`g2-4` dicen lo mismo con una palabra distinta (cliente / paciente), salvo
`g1-4` y `g2-4` que son idénticas. Están duplicadas igual, una por guion, para que el montaje no
tenga que ir a buscar a otra carpeta.

## Verificado, no asumido

- **Las quince tienen color-type 6 (RGBA)**, leído de la cabecera del PNG, y miden 1080×1920.
- **Ningún glifo se sale de la caja segura.** Medido aislando la letra de la sombra (alfa > 200,
  porque la sombra del sistema sangra ~30 px y falsea la medición): todas caen dentro de
  x ∈ [81, 983] e y ≤ 1616.
- **La tarjeta más alta empieza en y = 1086** (`g4-2`, la de los pasos). Con la coronilla de Ramón a
  ~420 px y la cara hasta ~900, quedan unos 180 px de aire bajo el mentón en el peor caso.
- **Dos defectos se encontraron mirando el render, no la medición**, que es justamente por qué hay
  que mirarlo:
  1. `g4-2` partía «3 EL CANDADO» en dos renglones y quedaba roto. Los tres pasos quedaron parejos.
  2. `g2-2` decía «LA MITAD.» en un solo renglón y pesaba la mitad que la del café. Quedó en dos.
  Y de paso el cuerpo de `g4-2` decía «cookies», que es palabra que esta campaña no usa en copy
  propio.

## Lo que NO está verificado todavía

⚠️ **No están compuestas sobre el cuadro real de Ramón.** La hoja de contacto usa un fondo de
control a **luminancia 83**, que es la que el LEEME de octubre midió en la parte baja del cuadro del
reel que sí salió publicado. Es una condición medida, no inventada, pero **no reemplaza el
compuesto sobre el fotograma del patio**, que es la regla de la casa.

**Falta el fotograma del patio.** Con él se verifica en cinco minutos que ninguna tarjeta le toca la
cara, y se sacan los valores de ajuste de color, porque los de octubre se midieron sobre el living y
no sirven.

## Montaje

- **Una tarjeta a la vez, nunca dos.** Y tramos sin texto entre medio: el rótulo permanente es lo
  que hace que una pieza se vea hecha con plantilla.
- **Los subtítulos van abajo y no se superponen a la tarjeta.** Si chocan, se mueve el subtítulo, no
  la tarjeta. El overlay ya dice la idea; el subtítulo repitiéndola debajo es ruido.
- **Disciplina del acento, igual que el reel publicado:** lima en la etiqueta de la cifra (y en los
  tres números del tutorial) más el dominio de la tarjeta de cierre. **Azul 0, rosa 0.**

## Rehacer una suelta

```sh
CHROME=$(find /opt/pw-browsers -iname "chrome" -type f | head -1)
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --default-background-color=00000000 \
  --window-size=1080,1920 --screenshot="$PWD/g1-2.png" "file://$PWD/overlay.html?i=1"
```

El índice `?i=N` es el orden de la lista `T` en `overlay.html`, de 0 a 14. **El fondo no se declara
en el CSS**: lo deja transparente el flag del render. Si alguien le pone un `background`, el PNG
sale opaco y tapa el video.
