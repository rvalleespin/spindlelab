# Lo que dijo quien construyó el kit

El kit de Instagram está en `/home/user/spindlelab/marketing/brand/instagram-v3/`, con 15 láminas rendidas y medidas. Abrí cada PNG antes de darlo por bueno.

En todas las láminas el oro queda solo en el punto del wordmark. La única excepción es `post-obra`: 38 píxeles en una miniatura del sitio de Combeau, que son color piel y no oro por tono. Toda la letra queda en 11,9 px o más vista a 390, y nada desborda.

No hice git ni toqué `spindlelab-astro`.

## Archivos

**Plantillas HTML (en la raíz de la carpeta)**
- `post-titular.html`
- `post-campo-desarrollo.html`, `post-campo-visibilidad.html`, `post-campo-continuidad.html` y `post-campo-alcance.html`
- `post-campo-desarrollo-oro.html`: alternativa para que Ramón compare, no es plantilla.
- `post-obra.html` y `post-foto.html`
- El carrusel real sobre «Los 21 chequeos de visibilidad en IA»: `carrusel-1-portada.html`, `carrusel-2-interior.html`, `carrusel-3-dato.html`, `carrusel-4-interior.html` y `carrusel-5-cierre.html`.
- `story-portada.html` y `story-portada-guia.html` (la guía marca las zonas y no se publica).

**Sistema y scripts**
- `base.css` trae los tokens exactos de `driftime.css`; `campo.css` y `carrusel.css` son las composiciones compartidas.
- `render.mjs` rinde a 2x y avisa si algo desborda. `reducir.py` deja cada pieza en PNG y en JPEG con croma completo, para que el punto dorado no se apague.
- `medir.py` cuenta el oro, mide la letra mínima, revisa los recortes y el contraste sobre foto. `grilla.py` arma la grilla del perfil.
- Fuentes: `Gabarito.woff2`, `manrope-latin.woff2` y `manrope-latin-ext.woff2`. Imágenes: 14 archivos en `img/`.
- `README.md` explica cómo editar y rendir, la tabla de tipos de pieza, las zonas con su fuente y lo que queda por decidir.

**Resultados**
- `salida/<pieza>.png` y `salida/<pieza>.jpg`: el JPEG es el que se sube.
- `salida/mediciones.csv` y `salida/medidas/*.json`.
- `grilla.png` (modo oscuro) y `grilla-clara.png` (modo claro).
- `legibilidad/<pieza>-390.png`: cada pieza a 390 px de ancho.

## Mediciones

Oro = píxeles a ±40 de `#C9A227`. «Por tono» es la segunda lectura, con el criterio del sitio (38–54°).

| Lámina | Oro total | En el punto | Fuera | Fuera por tono | Letra mín. (a 390) | Display |
|---|---|---|---|---|---|---|
| post-titular | 145 | 145 | 0 | 0 | 36 (13,0) | «AHÍ SE CORTA EL CIRCUITO», 24 car., 5 pal. |
| post-campo-desarrollo | 0 | 0 | 0 | 0 | 33 (11,9) | DESARROLLO |
| post-campo-visibilidad | 145 | 145 | 0 | 0 | 36 (13,0) | VISIBILIDAD |
| post-campo-continuidad | 0 | 0 | 0 | 0 | 36 (13,0) | CONTINUIDAD |
| post-campo-alcance | 146 | 146 | 0 | 1 | 36 (13,0) | ALCANCE |
| post-obra | 183 | 145 | **38** | 0 | 33 (11,9) | — |
| post-foto | 145 | 145 | 0 | 0 | 36 (13,0) | — |
| carrusel-1-portada | 145 | 145 | 0 | 0 | 36 (13,0) | «LEERTE, ENTENDERTE Y CITARTE», 28 car., 4 pal. |
| carrusel-2-interior, -3-dato, -4-interior | 0 | 0 | 0 | 0 | 36 (13,0) | — |
| carrusel-5-cierre | 1038 | 1038 | 0 | 0 | 36 (13,0) | — |
| story-portada | 145 | 145 | 0 | 0 | 36 (13,0) | «AHÍ SE CORTA EL CIRCUITO» |
| post-campo-desarrollo-oro (alternativa) | 150 | 150 | 0 | 0 | 33 (11,9) | DESARROLLO |

- **Recortes:** en las piezas 4:5 todo queda dentro del centro 3:4 de la grilla (x de 34 a 1046). En la story, el texto va de y = 282 a 1194 y de x = 72 a 951, así que también sirve como portada de reel.
- **Contraste sobre foto:** en `post-foto` el peor caso es 17,04:1.
- **Punto dorado en el JPEG:** sale `#CCA325`, frente a `#C9A227` del original.
- **Fuentes cargadas:** solo Manrope y Gabarito; no se carga Inter.

## Cosas que resolví distinto de lo literal

1. **El radio y el filete:** los convertí por 2,769 (1080 / 390), para que «6 px» se vea de 6 px en el teléfono. Escrito literal en la lámina se vería como una esquina recta de 2 px. Quedó en 16,6 px; la etiqueta, en 11 px; el filete, en 2,8 px. Si se prefiere el literal, basta con poner `--k: 1` en `base.css`.
2. **El punto del wordmark sobre brasa y petróleo:** ahí va en el color del texto del campo, porque el oro da 1,94:1 y 2,26:1. Es lo mismo que hace el pie del sitio, pero el manual v2.0 dice que el punto nunca cambia de color. La versión con el punto en oro está en `post-campo-desarrollo-oro.png` para que Ramón compare.
3. **El oro en las fotos:**
   - `domino-curva.jpg` tiene 0,6 % de píxeles de oro, así que Continuidad usa `escritorio.jpg` (la otra foto de ese campo en el sitio). La saqué de `img/`.
   - En el mockup del book de modelo, la franja amarilla del piso quedó fuera del encuadre.
   - En `domino.jpg` (`post-foto` y story) bajé la saturación al 65 %, porque la luz cálida sobre los puntos del dominó caía en el rango del oro.
4. **Zona segura de los reels:** la cifra fijada de 340 px abajo vale solo para stories orgánicas. Meta pide para reels 14 % arriba, 35 % abajo y 6 % por lado (269 / 672 / 65 px), más la columna de íconos de unos 230 × 770 px a la derecha. La story está compuesta para cumplir las dos.
5. **Sin píldoras:** los servicios de cada campo van como una línea de texto, porque en Instagram una píldora se lee como botón.

## Lo que tiene que decidir Ramón

- **Precio en las piezas:** el kit pone un solo «Desde $X + IVA» por pieza y nunca la cartera completa; la otra opción es no poner ninguno.
- **Formato 3:4 (1080×1440):** Instagram lo acepta desde mayo de 2025 y no pierde nada en la grilla. El kit quedó en 4:5 por la decisión fijada.
- **Enlace del bio:** «Enlace en la bio» solo funciona si el bio sigue apuntando a `/diagnostico/`, no a `verifica.spindlelab.cl`.
- **Recompresión de Instagram:** no está verificada. Después del primer post hay que descargar la pieza y medir el punto dorado.
- **Wordmark en la grilla:** con la regla de wordmark en cada portada, sale en las 9 miniaturas.