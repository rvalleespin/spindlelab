# Tarjetas con bloque azul — para ropa de color

**Úsense estas cuando la polera NO sea oscura y neutra.** Ramón graba el 2-nov con **polera verde**,
y este es el set que corresponde.

## Por qué existe este set y no basta con el de `../`

El bloque de texto **no cae sobre el fondo, cae sobre el torso**. Eso está medido sobre un fotograma
real: la zona de la tarjeta daba **luminancia 70** con una polera gris oscuro, y por eso ahí servía
el texto blanco suelto con sombra (`../`). **Con una polera de color eso deja de ser cierto.**

Y hay un problema específico con el verde: **el lima `#d6ff3d` es amarillo verdoso**. Sobre una
polera verde pierde contraste y se ve sucio, y es el acento de la marca. El bloque lo resuelve
poniendo el lima sobre campo oscuro en vez de sobre la ropa.

## Por qué azul y no tinta

Se probaron las dos, sobre tres verdes (oscuro, medio y claro):

- **`--azul-600 #2e5bff`** ✅ se separa del verde en los tres valores, y es el color protagonista del
  sitio de Verifica, así que la pieza se lee como la marca.
- `--tinta-900 #17163a` también sirve y es más silencioso, pero **sobre verde oscuro pierde
  definición de borde**, porque los dos son oscuros.

⚠️ **No confundir con la franja gris de ancho completo rechazada en octubre** por parecer plantilla
de lower third. Esto es un bloque con márgenes (60 px) y aire (56 px de padding), en un color de la
marca.

## Qué elegir, en una línea

| Lo que lleva puesto Ramón | Set |
|---|---|
| Polera oscura y neutra (gris, negro, azul oscuro) | **`../`** — texto blanco suelto con sombra, igual que los reels publicados |
| Polera de color, clara, o estampada | **este** — bloque azul |

## Diferencias con el set de `../`

| | Texto suelto (`../`) | Bloque (acá) |
|---|---|---|
| Titular | blanco, 120 px, con sombra | blanco, **108 px**, sin sombra |
| Fondo del texto | ninguno | **bloque `--azul-600`**, márgenes 60, padding 56 |

La sombra se saca porque sobre un color plano se lee como defecto, y no hace falta: blanco sobre
`--azul-600` da 5,1:1 de contraste y el lima sobre azul 4,5:1.

## Verificado

- Las quince con **color-type 6 (RGBA)** y 1080×1920, leído de la cabecera.
- **El bloque mide lo mismo en las quince**: x de 60 a 1018.
- **Ninguna letra a menos de 40 px del borde del bloque.** `g2-1` falló esta prueba en el primer
  render (*"SIN PREGUNTARLE AL PACIENTE"* llegaba a 34 px) y quedó *"SIN PREGUNTAR AL PACIENTE"*.
- Compuestas sobre **verde medio (74,112,80)** en `CONTACTO-sobre-polera-verde.png`.

⚠️ **Falta el fotograma con la polera verde puesta.** Con él se confirma el despeje y se sacan los
valores de color, porque los de `../GRADO-cuarto-blanco.md` se midieron con la otra polera.
