> **El manual manda.** La fuente de verdad de este kit es `marketing/brand/manual-de-marca.md` §10.
> Si este README y el manual dicen distinto, el que está mal es este README. Alineado el 7-oct por
> la sesión de redes al resolver los bloqueantes de la revisión independiente.

# Kit de Instagram v3

Plantillas HTML que se exportan a PNG o JPG para publicar en Instagram con el sistema del sitio v3. Ese sistema es el lenguaje de driftime.com, ya traducido a SpindleLab en `spindlelab-astro/src/styles/driftime.css`. Aquí se copia el sistema tal como quedó traducido. No se copia nada propio de driftime: ni su tipografía, ni su logo, ni sus textos.

Bruno, 7-oct-2026. **Ninguna pieza se publica sin la revisión de Ramón.**

La carpeta es autocontenida: trae sus fuentes (`*.woff2`, copiadas de `tableros/driftime-home/`), sus imágenes (`img/`, copiadas de `spindlelab-astro/public/assets/img/`) y sus scripts.

## Tipos de pieza

| Plantilla | Formato | Para qué | Wordmark | Display (800, mayúsculas) | Campo | Imagen |
|---|---|---|---|---|---|---|
| `post-titular` | 1080×1350 | Una idea fuerte, sin imagen | sí, arriba | sí, una vez | no (negro) | no |
| `post-campo-desarrollo` · `-visibilidad` · `-continuidad` · `-alcance` | 1080×1350 | Un pilar con su servicio y su precio | sí | la palabra del campo | brasa · navy · petróleo · ciruela | una del campo, como en el sitio |
| `post-obra` | 1080×1350 | Trabajo real en su mockup | sí | no | no | mockup con su rótulo de obra |
| `post-foto` | 1080×1350 | La foto como pieza (radio, en su proporción, sin nada escrito encima) y el titular en h2 sobre el lienzo | sí | no | no | nunca a sangre, nunca texto encima |
| `carrusel-1-portada` | 1080×1350 | Abre el carrusel | sí | sí, una vez en todo el carrusel | no | no |
| `carrusel-2-interior` · `carrusel-4-interior` | 1080×1350 | Filas con filete y pasos numerados | **no** | **no** | no | no |
| `carrusel-3-dato` | 1080×1350 | Una cifra real en Manrope 500, en papel | **no** | **no** | no | no |
| `carrusel-5-cierre` | 1080×1350 | Llamado y wordmark a todo el ancho, como el pie del sitio | sí | no | no | no |
| `story-portada` | 1080×1920 | Story que acompaña un post. También sirve de portada de reel | sí | sí, una vez | no | pieza con radio |
| `story-portada-guia` | 1080×1920 | Solo para revisar las zonas. **No se publica** | — | — | — | — |
| `post-campo-desarrollo-oro` | 1080×1350 | **Alternativa para decidir**, no es plantilla | sí, con el punto en oro sobre brasa | — | brasa | — |

El carrusel de ejemplo es real. Toma el artículo «Los 21 chequeos de visibilidad en IA, explicados uno por uno» (blog, 4-sep-2026). Las cifras salen del artículo y cuadran: bloques de 30 + 40 + 30 puntos, 5 + 8 + 8 = 21 chequeos, 6 + 8 + 5 + 6 = 25 y 6 + 5 = 11.

En el resto de las piezas, los textos vienen del sitio tal cual: el hero de la home, el h1 de Desarrollo web, los campos de `oferta-v3.json` y la línea de obra de `obra-v3.json`. `post-foto` usa la presentación de la home **entera, con su referente** («es la máquina que responde…»): recortarla antes del referente fue el bloqueante 4 de la revisión.

## Reglas que cumple el kit (y que conviene no romper al editar)

- **Tokens.** Los hex son los de `driftime.css`, copiados tal cual en `base.css`.
- **Lienzo.** Negro `#000` por defecto. Como máximo un campo de color por pieza, cada uno con su color de texto del sitio. Contraste del texto sobre cada campo: brasa 4,70:1, navy 12,56:1, petróleo 5,03:1 y ciruela 13,40:1.
- **Tipografía.**
  - Manrope para todo. Gabarito solo en el wordmark.
  - Display en Manrope 800 y mayúsculas: solo en la portada, una vez, con 6 palabras y 34 caracteres como máximo. Si el texto no cabe, se reescribe. Nunca se le baja el tamaño.
  - Todo lo demás va en caja normal, peso 500 o 400.
  - Sin rótulos en mayúsculas espaciadas.
- **Oro.** Como máximo uno por lámina, y siempre es el punto del wordmark. Las láminas interiores no llevan wordmark. Si una foto trae oro, ese oro cuenta.
- **Forma.**
  - Un solo radio, 6 px del sitio. La etiqueta de pieza usa 4 px.
  - Cero píldoras.
  - Nada imita un botón: el llamado es texto («Chequea tu sitio gratis. Enlace en la bio.»).
- **Imagen.**
  - Solo el pool del sitio y los mockups de obra.
  - La etiqueta va arriba a la izquierda, como en el sitio. En capturas planas va abajo.
  - Raigal solo puede aparecer con «Pieza de concepto · no es un cliente» primero. Y **Raigal va solo en láminas interiores**: nunca en una portada ni en una pieza única (manual §10.6 y §10.10).
- **Fotos de Unsplash (regla nueva).** Se aceptan objetos, materiales y lugares. Nunca personas presentadas como el equipo o como clientes. Nunca pantallas con datos inventados. El kit todavía no trae ninguna foto de Unsplash, porque las elige Ramón.
- **Voz.** Sin «acá», sin voseo y sin raya como muleta. Lo verifiqué con grep en todos los HTML. Cero cifras, logos o testimonios inventados. Verifica y Cumple tiene su propia línea editorial y no sigue este kit.
- **Precio.** Como máximo un «Desde ▏ $X + IVA» por pieza, con la cifra exacta de `oferta-v3.json`. Nunca la cartera completa. **Lo tiene que confirmar Ramón** (ver Decisiones abiertas).

### La conversión que hace que «6 px» siga siendo 6 px

En el teléfono, una lámina de 1080 se ve a unos 390 px de ancho. Por eso `base.css` multiplica por `--k: 2.769` (1080 / 390) todo lo que el sitio fija en píxeles:

| En el sitio | En la lámina |
|---|---|
| Radio de 6 px | 16,6 px |
| Radio de 4 px | 11 px |
| Filete de 1 px | 2,8 px |
| Separación entre piezas de 10 px | 28 px |
| Etiqueta de 12 px | 33 px |

Si se escribiera «6 px» literal en la lámina, se vería como una esquina recta de 2 px.

## Cómo se edita

1. **Copia la plantilla** que corresponda, con un nombre nuevo, en esta misma carpeta. Cambia solo el texto y la imagen. Las líneas para editar están marcadas `EDITAR`.
2. **Display.** Cada palabra ocupa de ancho su tamaño de letra por un factor (medido en Manrope 800). El renglón más largo tiene que caber en los **900 px** de ancho útil (margen 90, manual §10.3).

   | Palabra | Factor |
   |---|---|
   | «Ahí se corta» | 6,76 |
   | «el circuito» | 6,04 |
   | «Desarrollo» | 6,52 |
   | «Visibilidad» | 5,71 |
   | «Continuidad» | 6,92 |
   | «Alcance» | 4,66 |
   | «entenderte» | 6,37 |

   Ejemplo: «Continuidad» a 132 px mide 6,92 × 132 = 913 px y cabe. Las cuatro palabras de campo van a 132 px. El display lleva `white-space: nowrap`: si un renglón no cabe, se reescribe el texto.
3. **Campo.** Para cambiar de pilar, cambia la clase del `<body>`: `campo--brasa`, `campo--navy`, `campo--petroleo` o `campo--ciruela`. Sobre brasa y petróleo, el punto del wordmark lleva `class="sin-oro"`, porque el oro no llega a 3:1 (1,94 y 2,26).
4. **Imagen.**
   - Copia el archivo a `img/` y encuádralo con `object-position`.
   - Después de rendir, corre `medir.py`. Si la columna `oro_fuera_px` no da 0, cambia de foto o de encuadre.
   - Tres ejemplos de lo que pasó con este kit:
     - `domino-curva.jpg` tiene un 0,6 % de píxeles de oro, así que Continuidad usa `escritorio.jpg`, la otra foto que ese campo usa en el sitio. `domino-curva.jpg` quedó fuera de `img/`.
     - En el mockup del book de modelo, la franja amarilla del piso queda fuera con el encuadre `50% 36%`.
     - En `domino.jpg`, la luz cálida sobre los puntos del dominó caía en el rango del oro. **Ese filtro se retiró el 7-oct**: bajarle la saturación a una foto para que pase una medición es un tratamiento que el sitio no hace y el manual no registra. Por tono, `domino.jpg` da 0,006 %, bajo el umbral.
5. **Texto sobre una foto: no va.** El manual lo prohíbe salvo la etiqueta de pieza (§10.10), y `post-foto` se recompuso con la foto como pieza y el titular en el lienzo. El modo «sobre-foto» de `render.mjs` queda sin uso.

## Cómo se rinde

```
# En la nube:
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node render.mjs            # todas, o: node render.mjs post-titular …
python3 reducir.py      # salida/<pieza>.png (sin pérdida) + salida/<pieza>.jpg (q90, croma 4:4:4)
python3 medir.py        # salida/mediciones.csv + legibilidad/<pieza>-390.png
python3 grilla.py       # grilla.png y grilla-clara.png
rm -r salida/_2x        # opcional: son las capturas a 2x intermedias
```

En la Mac, se omite `CHROME=` y `render.mjs` usa el Chromium de Playwright de `spindlelab-astro/node_modules`. Los scripts de Python solo usan PIL, sin numpy.

**Para subir a Instagram, usa el `.jpg` de `salida/`.** Con el croma 4:2:0 que JPEG usa por defecto, el punto dorado salía `#8D834E` en la imagen OG. Con el croma 4:4:4 de `reducir.py` sale `#CCA325`, prácticamente `#C9A227` (medido en `post-titular.jpg`).

Lo que **no** está verificado es cómo recomprime Instagram. Después de la primera publicación hay que descargar la pieza y medir el punto.

`render.mjs` avisa si algún texto se sale de la lámina. El body tiene alto fijo y `overflow: hidden`, así que el texto que se pasa no se ve.

## Zonas (verificadas el 7-oct-2026)

| Formato | Zona | Fuente |
|---|---|---|
| Feed y carrusel 1080×1350 (4:5) | La grilla del perfil muestra el centro 3:4, de x = 34 a 1046. El margen del kit es de **90 px** (34 del recorte + 20 del sitio × 2,77), igual que el manual. Todas las láminas de un carrusel toman la proporción de la primera | Kapwing · Oktopost · Storrito |
| Story 1080×1920, orgánica | Sin texto en los 250 px de arriba ni en los 340 de abajo | Moonb, jul-2026 |
| Reel (y story pagada) | Meta pide dejar libre el 14 % de arriba, el 35 % de abajo y el 6 % de cada lado: 269, 672 y 65 px. Abajo a la derecha está la columna de íconos, de unos 230 × 770 px. **Esto cambia la cifra fijada de 340 abajo, que vale solo para stories orgánicas** | Meta Ads Guide (Reels, Stories) · Hopper HQ |
| Portada del reel en la grilla | Recorte central 3:4: de y = 240 a 1680 | Hopper HQ |

`story-portada` pone todo lo que se lee entre y = 282 e y = 1194 (medido) y entre x = 72 y x = 951. Así sirve tanto de story como de portada de reel. La franja de y = 1290 a 1560 queda libre para el sticker de enlace. Ver `salida/story-portada-guia.png`.

## Mediciones (`salida/mediciones.csv`, 7-oct-2026)

- **Oro.** Se cuentan los píxeles a ±40 de `#C9A227` en cada canal: los de toda la lámina, los que caen dentro de la caja del punto del wordmark y los que caen fuera. Como segunda lectura va el criterio del sitio: tono entre 38° y 54°, con saturación y brillo de al menos 0,5.
- **Letra mínima.** Se da en px de la lámina y en px vistos a 390 de ancho. El piso es 11 px.

| Lámina | Oro total | En el punto | Fuera (±40) | Fuera (tono) | Letra mín. | A 390 | Display | Recorte |
|---|---|---|---|---|---|---|---|---|
| post-titular | 145 | 145 | 0 | 0 | 36 | 13,0 | «AHÍ SE CORTA EL CIRCUITO» (24 car., 5 pal.) | dentro del 3:4 |
| post-campo-desarrollo | 0 | 0 | 0 | 0 | 33 | 11,9 | «DESARROLLO» | dentro del 3:4 |
| post-campo-visibilidad | 145 | 145 | 0 | 0 | 36 | 13,0 | «VISIBILIDAD» | dentro del 3:4 |
| post-campo-continuidad | 0 | 0 | 0 | 0 | 36 | 13,0 | «CONTINUIDAD» | dentro del 3:4 |
| post-campo-alcance | 146 | 146 | 0 | 1 | 36 | 13,0 | «ALCANCE» | dentro del 3:4 |
| post-obra | 183 | 145 | **38** | 0 | 33 | 11,9 | — | dentro del 3:4 |
| post-foto | 145 | 145 | 0 | 0 | 36 | 13,0 | — | dentro del 3:4 |
| carrusel-1-portada | 145 | 145 | 0 | 0 | 36 | 13,0 | «LEERTE, ENTENDERTE Y CITARTE» (28 car., 4 pal.) | dentro del 3:4 |
| carrusel-2-interior | 0 | 0 | 0 | 0 | 36 | 13,0 | — | dentro del 3:4 |
| carrusel-3-dato | 0 | 0 | 0 | 0 | 36 | 13,0 | — | dentro del 3:4 |
| carrusel-4-interior | 0 | 0 | 0 | 0 | 36 | 13,0 | — | dentro del 3:4 |
| carrusel-5-cierre | 1038 | 1038 | 0 | 0 | 36 | 13,0 | — | dentro del 3:4 |
| story-portada | 145 | 145 | 0 | 0 | 36 | 13,0 | «AHÍ SE CORTA EL CIRCUITO» | dentro de la banda del reel |
| post-campo-desarrollo-oro (alt.) | 150 | 150 | 0 | 0 | 33 | 11,9 | «DESARROLLO» | dentro del 3:4 |

- **post-obra.** Los 38 px que caen fuera son color piel y ocre, de tono 22°, en una miniatura del sitio del cliente. No son oro por tono. Se dejan así porque no se retoca la obra de un cliente.
- **post-campo-alcance.** El píxel que da el criterio de tono es el destello naranja del extremo de `hilo.jpg`. A ±40 del oro da 0.
- **Texto sobre foto** (`post-foto`): el peor caso es 17,04:1.
- **Desbordes:** ninguna lámina desborda.
- **Fuentes cargadas** en todas: Manrope 200–800, y Gabarito solo donde va el wordmark.

## La grilla

`grilla.png` (modo oscuro) y `grilla-clara.png` (modo claro) muestran las 9 piezas en 3 columnas, recortadas a 3:4 como las muestra el perfil. Los cuatro campos quedan en rombo con negro entre medio, y el perfil se lee como el sitio.

La novena miniatura es `story-portada` usada como portada de reel. Por eso repite el titular de `post-titular`: está ahí para comprobar su recorte, no como propuesta de calendario.

Una observación para Ramón: con la regla de wordmark en cada portada, el wordmark sale en las 9 miniaturas.

## Decisiones abiertas para Ramón

> Las dos primeras **ya no están abiertas**: el manual v3.0 las resolvió. El punto va en el color del texto del campo sobre brasa y petróleo (§10.5), y el precio es una línea por pieza con la cifra de `oferta-v3.json` (§10.8). La cita al manual v2.0 quedaba vieja.

1. **El formato 3:4 (1080×1440).** Instagram lo acepta desde may-2025 y no pierde nada en la grilla. El kit queda en 4:5 por la decisión fijada; pasar a 3:4 es cambiar el alto en `base.css` (`body.f45`).
4. **El enlace del bio.** El llamado «Chequea tu sitio gratis. Enlace en la bio.» solo funciona si el bio sigue apuntando a `spindlelab.cl/diagnostico/`, y no a `verifica.spindlelab.cl`.
5. **El radio convertido** (16,6 px en la lámina para que se vea de 6 px). Si se prefiere el literal de 6 px, se cambia `--k` a 1 en `base.css`.
