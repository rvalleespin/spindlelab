# Koto, medido

**16-oct-2026 · Lucía (dirección de arte) · obra E12.** koto.com en cuatro páginas: la home, el índice de
trabajo (`/work`), un caso completo (`/projects/instagram`) y el estudio (`/about`), a 1440 (dpr 1) y a 390
(dpr 2, como teléfono). Nada de memoria: `getComputedStyle`, DOM, hojas, `getAnimations()` y capturas.
Datos en `medicion.json` (cada valor con página, ancho y selector), pantallas en `capturas/`, scripts en
`herramientas/` (`correr.sh` repite todo). Accept & Proceed se mide aparte.

> **La tesis:** un lienzo casi negro donde la interfaz se retira (gris, chica, una sola letra de la casa en
> tres cortes) y el único color es el del trabajo.

## Lo que choca con el brief (va al lock; acá solo se mide)

1. **Koto no es light mode.** `html` es `#060606` en las cuatro páginas; fuera de fotos y videos, ese negro es
   el 85 a 96 % de los píxeles. El papel `#F6F6F4` del brief no está en Koto.
2. **Su acento no es una señal: es el logo.** El amarillo `#FFE800` está solo en el wordmark (`fill-yellow`):
   0 textos, 0 fondos. Lo que da color son las imágenes del trabajo: sus cajas cubren del 33 al 72 % de cada página.
3. **El cursor no es un círculo de color.** Es una etiqueta de vidrio chica (negro al 20 %, desenfoque de 40 px,
   radio 2 px, Mono 11 px en mayúsculas): «PLAY» sobre el showreel, «VIEW CASE» sobre los destacados. Sigue
   al mouse sin retardo (en el primer cuadro ya está en la posición nueva). En el índice no hay etiqueta.
4. **No hay bento ni retícula de filetes.** El índice es un muro de dos columnas de 524,5 px con 8 px entre
   piezas y tres alturas: 15 piezas 4:5, 9 en 4:3 y 11 en 5:3. Los filetes de 1 px se cuentan con los dedos:
   el borde superior de cada sección del caso (`#2d2d2d`) y dos o tres separadores en blanco al 10 %.
5. **Su telemetría es de verdad.** La hora del visitante con su huso («15:07 UTC-3»), la de cada estudio (LA,
   NY, LDN, BER, SYD), conteos entre paréntesis («(148)», «(35)») y la ficha del caso («SOCIAL MEDIA · 2026»).
   Ninguna coordenada de adorno.
6. **Sus casos no traen cifras de resultado.** De 35 casos, 0 dan un porcentaje y 0 un multiplicador; 26
   siguen la misma ficha (Challenge / Strategy / Identity / Application / Outcome); uno solo (MachineX) da un
   resultado medido después del lanzamiento. Las demás cifras son contexto: años, mercados, idiomas.

## Tipografía

**GT Kotoheim**, de Grilli Type, hecha para Koto (tabla `name`: diseñador Noel Leu, © 2015 Grilli Type).
Variable en ancho (75 a 100), peso (100 a 1000) e inclinación; la base sería GT America (misma fundición,
diseñador y ejes: inferido, no confirmado). Licencia exclusiva de Koto: no se usa.

| Rol | 1440 | 390 |
|---|---|---|
| Portada (Condensed Light 300) | 48 / 1,0 / −0,01em | 36 / 1,0 / 0 |
| Declaración y titular de sección | 38 / 1,1 / −0,01em | 26 / 1,2 |
| Titular de página y de caso | 24 / 1,2 | 23 / 1,2 |
| Cuerpo (regular a 350), gris | 16 / 1,25 · 56 a 66 caracteres por línea | 15 / 1,25 · 43 a 51 |
| Cuerpo chico | 14 / 1,25 | 13 / 1,25 |
| Rótulo Mono, MAYÚSCULAS, sin interletra | 11 / 1,0 | 11 / 1,0 |
| Micro Mono, MAYÚSCULAS | 9 / 1,0 / −0,02em | igual |
| Dato Mono en caja normal (cargos, direcciones, fechas) | 12 / 1,2 | igual |

Nada en negrita (300 y 350 en todo el sitio) y nada en mayúsculas salvo el mono. La jerarquía la hacen el
corte y la tinta. **Dos tintas en la misma frase:** la primera parte en blanco, la continuación en gris
`#989898`, mismo tamaño y misma línea («We make ambitious ideas for ambitious brands. Five offices, one studio,
united by optimism, collaboration, and craft. *Find us in Los Angeles, New York, London, Berlin and Sydney.*»).
Así van 10 de los 17 titulares medidos; los de sección del caso y la cita van solo en blanco.

## Color

| Token | Dónde y cuánto |
|---|---|
| `#060606` | El lienzo: 85 a 96 % de los píxeles fuera de los medios |
| `#141414` | Placas (encabezado plegado, menú, widgets) y el marco que espera cada imagen |
| `#989898` | El texto corrido: 60 a 77 % de los caracteres en la home y 86 a 89 % en el caso. Contraste 7,0:1 |
| `#ffffff` | Lo que se nombra y lo activo. 20,3:1; el nav va al 70 % (9,8:1) y pasa a 100 % al pasar el mouse (167 ms, lineal) |
| `#595959` | Lo apagado: los 148 nombres del equipo y el pie legal. **2,9:1, no aprueba AA** (454 nodos, 11 a 18 px) |
| `#2d2d2d`, blanco al 10 % | Los pocos filetes de 1 px |
| `#ffe800` | Solo el logo |

## Retícula

Márgenes de 16 px a los dos anchos; 16 columnas de 79,6 px con 8 px entre ellas a 1440 (8 a 390). Sin ancho
máximo: va de borde a borde. Dos cortes: 834 y 1194 px (`52.125rem` y `74.625rem`). **El caso:** barra lateral pegajosa de
320 px (título, bajada gris, ficha mono, índice de secciones con un punto en la activa) y una columna de 1057 px
en 12 columnas: rótulo mono a la izquierda, titular de 24 px y cuerpo de 493 px a la derecha. Medios con radio
6 px (los recorta el contenedor), sobre todo 16:9, 4:5 y 1:1. A 390, el índice es una columna con título y
bajada siempre a la vista.

## Interacción

- **Encabezado:** arriba, la navegación suelta en Mono 11; al bajar se pliega en una placa `#141414` de 48 px
  de alto con el logo y el nombre de la página (ancho en 750 ms). Al hacer clic se abre hacia abajo como
  tarjeta de 320 px, con el fondo de la página desenfocado.
- **Pieza del índice:** la imagen se acorta 24 px (167 ms, lineal) y aparece debajo «Instagram · A new mark
  with old memories» (167 ms, tras 167). Sin zoom ni color. **Filtro:** capa de vidrio con seis áreas y su
  conteo («Digital experiences 09»). **Reloj:** abre un panel de widgets (estudios, hora en esfera, noticias).
- **Menú a 390:** capa negra al 80 % con desenfoque de 20 px y enlaces en Condensed de 26 px.
- **Cookies:** una píldora de vidrio con el texto corriendo como cinta (30 s, lineal, sin fin).

## Movimiento

GSAP 3.13 (ScrollTrigger, SplitText, CustomEase, Draggable) sobre Next.js y Tailwind v4. Sin Lenis, sin Framer
Motion, sin Barba: el scroll es nativo (una vuelta de rueda de 100 px mueve la página de un salto, sin pasos intermedios). Lo que entra con el
scroll va **atado a la posición, no al tiempo**: el párrafo de presentación sube de 675 px a 0 y sus líneas, de
42 px a 0, escalonadas; los bloques del pie pasan de opacidad 0 a 1, también escalonados; al volver arriba, se
deshace. Las transiciones duran cuadros enteros a 60 Hz (83, 133, 167, 283, 333, 417, 650 y 750 ms) con curvas
propias y asimétricas: entrar `(0,0,0,1)` o `(.15,0,.15,1)`, salir `(.75,0,.85,1)`. Cambio de página sin
cortina ni fundido. **`prefers-reduced-motion`: ignorado** (0 reglas en las hojas y en el JS; con «reduce»,
todo se mueve igual).

## Contenido

Cinco titulares tal cual: «We’re Koto / The Creative Company» · «Our work / Ambitious ideas for ambitious
businesses» · «About us / Five studios. Three continents. One goal. Make the best work humanly possible.» ·
«Our values. Built on optimism. Driven by collaboration. Defined by craft.» · «A team that brings local
expertise and global perspective together under one roof.» Un rótulo de dos palabras y una continuación de 6
a 13; tono llano y seguro, sin jerga técnica. **El caso:** ficha lateral, imagen grande, cuatro secciones
(rótulo mono, titular de 4 a 6 palabras, 3 a 5 párrafos), galerías, cita del cliente con nombre y cargo,
créditos («Thanks») y el siguiente caso.

## Por qué no parece plantilla

1. **Una letra a medida, usada liviana.** Sin negritas: la jerarquía es de corte (condensada, regular, mono)
   y de tinta (blanco, gris), no de peso.
2. **Dos tintas en una frase** en vez de titular y bajada.
3. **La interfaz se retira.** Gris sobre casi negro, placas `#141414`, ningún color propio: el color lo
   pone el trabajo.
4. **Datos vivos en mono** (hora, estudios, conteos, ficha) en vez de decoración, y **tiempos en cuadros
   con curvas propias** en vez de los valores por defecto.

## Límites de la medición

Ningún video corre (este Chromium no trae H.264): se ven los pósteres y el showreel queda negro. El iframe de
Vimeo se bloqueó, porque al fallar movía el scroll. El proxy cortaba archivos: cada página se recargó hasta
tener JS, CSS, GSAP y las tres letras completos. Las capturas cosidas repiten el encabezado fijo en cada pantalla.
