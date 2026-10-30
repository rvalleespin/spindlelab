# Tarjetas para fondo blanco — las que van con el material grabado

**30-oct-2026.** Ramón grabó finalmente **en un cuarto de su casa, fondo blanco**. Estas son las
tarjetas de esa grabación. **Las de la carpeta de arriba (`../`) no sirven para este material**: son
texto blanco con sombra suave, pensadas para fondo oscuro, y sobre una pared blanca desaparecen. El
lima de la etiqueta sobre blanco tampoco se lee.

**Úsense estas. Las de arriba quedan como la variante para fondo oscuro**, por si alguna pieza futura
se graba en otra parte.

## Por qué bloque azul y no texto oscuro

Se renderizaron las dos opciones (dos, no tres: tres se promedian). Decide un argumento que no es de
gusto: **el bloque de texto no cae sobre la pared, cae sobre el torso de Ramón.** En un plano medio
corto el tercio inferior del cuadro es su ropa, así que el fondo real detrás del texto es la polera,
que no controlamos. Texto oscuro sobre una polera oscura desaparece; **el bloque azul se lee pase lo
que pase**.

Y el `--azul-600` es el fondo protagonista del sitio de Verifica, así que la pieza queda más de la
marca, no menos.

⚠️ **No confundir con la franja gris de ancho completo que se rechazó en octubre** por parecer
plantilla de lower third. Esto es un bloque con márgenes y aire, en un color de la marca, no un velo
gris de borde a borde.

## Lo que cambió respecto de la versión de fondo oscuro

| | Fondo oscuro (`../`) | Fondo blanco (acá) |
|---|---|---|
| Titular | blanco, 120 px, con sombra | blanco, **108 px**, sin sombra |
| Etiqueta | lima con sombra | lima, sin sombra |
| Cuerpo | blanco con sombra | blanco, sin sombra |
| Fondo del texto | ninguno | **bloque `--azul-600`**, márgenes 60, padding 56 |

**La sombra se sacó porque sobre un color plano se lee como defecto**, y no hace falta: blanco sobre
`--azul-600` da 5,1:1 de contraste y el lima sobre azul 4,5:1, de sobra para texto de ese tamaño.

**El titular bajó de 120 a 108 px** porque a 120 la palabra «FORMULARIO.» de `g3-4` tocaba el borde
del bloque (medido: la letra llegaba a x=1018 y el límite con padding es 962). A 108 entra con aire,
y de paso el bloque más alto baja, lo que da más despeje bajo el mentón.

## Verificado, no asumido

- **Las quince con color-type 6 (RGBA)** y 1080×1920.
- **El bloque azul mide lo mismo en las quince**: x de 60 a 1018. *La hoja de contacto hacía parecer
  que variaba de ancho; medido, no varía. La miniatura engaña y la medición no.*
- **Ninguna letra pegada al borde del bloque** (mínimo 40 px de aire a cada lado).
- **El bloque más alto (`g4-2`, la de los pasos) empieza en y = 1128**, así que con la cara de Ramón
  llegando a ~900 quedan **228 px de despeje bajo el mentón**.

## Lo que NO está verificado

⚠️ **Falta el fotograma real.** El fondo de la hoja de contacto es blanco 244, que es donde cae una
pared blanca bien expuesta, pero **no reemplaza el compuesto sobre el cuadro de Ramón**. Con un
fotograma se confirma en cinco minutos que ninguna tarjeta le toca la cara, y se sacan los valores de
ajuste de color, porque los de octubre se midieron sobre el living.

## Rehacer una suelta

```sh
CHROME=$(find /opt/pw-browsers -iname "chrome" -type f | head -1)
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --default-background-color=00000000 \
  --window-size=1080,1920 --screenshot="$PWD/blanco/g1-2.png" \
  "file://$PWD/overlay-blanco.html?i=1"
```

`?i=N` va de 0 a 14, en el orden de la lista `T`. **El fondo no se declara en el CSS**: lo deja
transparente el flag del render.
