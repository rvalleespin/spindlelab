# E12 · Portada de A · el video del hilo de oro, listo para servir

**19-oct-2026 · Bruno (dirección creativa)** · rama `claude/magical-franklin-ckfki2` · manda el brief, sección
«Compuerta 2», punto 4, y el criterio 14 (`e12/brief-de-obra.md`). **Desvío autorizado por Ramón:** es un video de
marca generado con IA (Higgsfield Cinema Studio 3.0, commit `41605cd` del 1-ago-2026, «Sitio SpindleLab v2: hero
creativo con video de marca»), y es la única imagen generada que entra a la obra. **Aquí no se generó nada ni se gastó
nada:** todo sale del archivo que ya existe, con `ffmpeg`.

**Origen:** `spindlelab-astro/public/hero-hilo-de-oro.mp4` (H.264, 1920 × 1080, 24 fps, 145 cuadros, 6,04 s,
5,09 MB, sin audio; sha256 `8e36b4f8…a0f99`, completo en `bucle.json`). **No se tocó**: solo se leyó. En esta corrida
nadie toca `spindlelab-astro/`; los archivos de aquí los copia Diego en la corrida 2.

## Qué archivo va dónde

| Archivo | Qué es | Peso | Dónde va |
|---|---|---|---|
| `hilo-1920.webm` | VP9, 1920 × 1080, 121 cuadros, 5,04 s, sin audio | **1,03 MB** | La portada de la home desde la tableta: el primer `<source>`, para todo navegador que lea VP9 (Chrome, Edge y Firefox, de seguro) |
| `hilo-1920.mp4` | H.264 High 4.0 (`avc1.640028`), 1920 × 1080, `faststart`, sin audio | **1,40 MB** | El segundo `<source>`, para el navegador que no lee VP9 |
| `hilo-movil.webm` | VP9, **500 × 1080 vertical** (9:19,5), sin audio | **0,34 MB** | La portada a 390 × 844 y en todo teléfono vertical |
| `hilo-movil.mp4` | H.264 High 4.0, 500 × 1080 vertical, `faststart`, sin audio | **0,50 MB** | Lo mismo, para el navegador que no lee VP9 |
| `hilo-1920-poster.webp` | El primer cuadro del bucle, 1920 × 1080, WebP calidad 82 | 34 kB | `poster` del video ancho, y la imagen quieta con movimiento reducido |
| `hilo-movil-poster.webp` | El mismo cuadro, recortado a 500 × 1080 | 12 kB | `poster` del video vertical, y la imagen quieta con movimiento reducido |
| `costura-del-bucle.webp` | Hoja de contactos: el corte del original y el del bucle nuevo, cuadro a cuadro | 76 kB | Solo para revisar; no va al sitio |
| `bucle.json` | Todas las medidas de abajo | | Solo para revisar |
| `herramientas/hacer-hilo.sh`, `herramientas/medir-bucle.py` | Cómo se hizo y cómo se mide | | Para rehacerlo |

Los cuatro videos y los dos pósteres pesan 3,3 MB juntos, y un visitante baja solo un video y un póster: en el
escritorio, 1,06 MB (VP9) o 1,44 MB (H.264), contra los 5,09 MB que baja hoy; en el teléfono, 0,35 MB o 0,51 MB.

## El bucle: el original salta, y se arregló con un fundido

**Medido** (`medir-bucle.py`: cada cuadro en gris a un cuarto de su ancho, diferencia absoluta media de 0 a 255 y
SSIM contra el que le sigue):

| | Dos cuadros seguidos (mediana / percentil 95) | El corte del bucle (último → primero) | ¿Salta? |
|---|---|---|---|
| **Original** | 5,92 / 14,84 | **51,20** (8,65 veces la mediana), SSIM **−0,03**, la luz media cae de 53 a 23 | **Sí**: el clip termina en una maraña de hilos y empieza con tres hilos sueltos |
| **`hilo-1920.webm`** | 6,51 / 12,52 | **3,16** (0,49 veces la mediana), SSIM **0,992**, luz 32,8 → 32,6 | No |
| **`hilo-1920.mp4`** | 6,48 / 12,48 | 3,22 (0,50), SSIM 0,992 | No |
| **`hilo-movil.webm`** | 7,40 / 14,83 | 3,70 (0,50), SSIM 0,988 | No |
| **`hilo-movil.mp4`** | 7,46 / 14,79 | 3,74 (0,50), SSIM 0,988 | No |

Un corte que no salta es uno que cambia menos que dos cuadros seguidos del propio clip; los cuatro cambian la mitad.

**El arreglo, sin generar nada:** el bucle empieza en el cuadro 24 del original, y sus últimos 24 cuadros (1 s) se
funden con los cuadros 0 a 23. El último cuadro del bucle es casi el cuadro 23 del original y el primero es el 24, así
que el corte cae entre dos cuadros que ya eran seguidos. El fundido se ve como una doble exposición de hilos: la
maraña se apaga mientras entran los tres hilos y el de oro (`costura-del-bucle.webp`, fila de abajo). El bucle pasa
de 6,04 s a **5,04 s**. Probé fundidos de 18, 24 y 36 cuadros: los tres cierran el corte (3,6, 3,2 y 3,1). Elegí el
de en medio: con 18 el fundido se nota más (el percentil 95 entre cuadros seguidos sube a 13,8, contra 12,5) y con 36
se come un segundo y medio de la maraña, que es el final del clip.

**Lo que sigue pidiendo WCAG 2.2.2:** el video se mueve solo, en bucle sin fin y dura más de 5 s, así que necesita su
botón de pausa (criterio 14). Que el bucle no salte no lo exime.

## Calidad

SSIM de `ffmpeg` contra el maestro sin pérdida (FFV1) del que sale cada uno: **VP9 0,993 y 0,992; H.264 0,976 y
0,970.** Mirado cuadro a cuadro en un recorte de 640 × 360 a tamaño real, las tres versiones (maestro, VP9, H.264) no se
distinguen: el clip es blando y oscuro, sin grano que la compresión pueda romper. El H.264 sale más bajo en SSIM
porque pierde el ruido fino del original (que ya venía de un H.264 de 6,7 Mbit/s), no por bloques ni bandas a la vista.
VP9 va en calidad constante (crf 31, dos pasadas); H.264, a 2.250 kbit/s en el ancho y 800 en el teléfono, dos
pasadas. Los cuatro empiezan en un cuadro clave y no traen pista de audio.

**Comprobado en el navegador** (Chromium 141 de Playwright, `muted autoplay loop playsinline`): `hilo-1920.webm` a
1440 × 900 y a 390 × 844, y `hilo-movil.webm` a 390 × 844 (dpr 2), arrancan solos, sin errores de consola, y dan la
vuelta (dos vueltas en 12,3 s). **El H.264 no se pudo ver correr aquí:** ese Chromium no trae H.264
(`canPlayType` vacío); se comprobó que los dos MP4 se decodifican enteros sin un error con `ffmpeg`. Se ve en Safari en
la corrida 2.

## El teléfono va vertical, y por qué este recorte

Koto pone su reel a pantalla completa también en el teléfono: el contenedor mide 1440 × 900 y **390 × 844**
(`e12/medicion/koto/medicion.json`, `showreel-video-container`). Con el video ancho y `object-fit: cover`, el teléfono
mostraría una franja de 499 px del centro y bajaría igual el archivo entero. Por eso hay un archivo vertical: 500 ×
1080, desde x 518 (el centro en el 40 % del ancho). **Por qué ahí:** el hilo de oro entra por abajo a la izquierda y
cruza hasta el centro; medí cuánto oro queda dentro del recorte según dónde se centra (`bucle.json` no lo guarda, lo
dice esta tabla):

| Centro del recorte | Oro dentro | Cuadros con oro a la vista |
|---|---|---|
| 30 % | 54 % | 90 % |
| **40 % (el elegido)** | **44 %** | **90 %** |
| 50 % (el centro) | 29 % | 84 % |
| 60 % | 16 % | 68 % |

Al 30 % el hilo se ve igual de seguido, pero se pierde la maraña del final, que se arma al centro; al 40 % están las
dos cosas. A 390 × 844 con dpr 2, el navegador estira 500 px a 780: el clip es blando y no se nota (captura en el
navegador). Si la spec pone el video del teléfono en una franja horizontal y no a pantalla completa, sirve el de 1920.

## La luz detrás de la frase (para la spec)

Para que Lucía mida el contraste de la frase sobre el video (criterio 14: «en su cuadro más claro»), `bucle.json`
trae la luminancia relativa WCAG de cada zona, **sin velo**, y el cuadro en que cada una está más clara. **El cuadro
más claro de todo el bucle es el 97 (4,04 s)**, la maraña justo antes de que empiece el fundido. Las zonas, en el
video ancho:

| Zona (retícula de 3 × 3) | Luz media en su cuadro más claro | Cuadro | Blanco puro contra esa media, sin velo |
|---|---|---|---|
| Abajo · izquierda (donde Koto pone su frase) | 0,162 | 79 | 4,94:1 |
| Medio · centro | 0,174 | 73 | 4,68:1 |
| Arriba · izquierda | 0,033 | 97 | 12,68:1 |

Y en el vertical: arriba 0,081 (cuadro 95), medio 0,167 (64) y **abajo 0,214 (96), la zona más clara de todas**.
Ese contraste contra la media es una cota y no la medida: un hilo claro detrás de una letra la deja peor que la media,
y el velo `#060606` la deja mejor. La medida de verdad es con el velo puesto y sobre los píxeles de cada letra, y la
hace la spec.

## Lo que no se hizo

- **El velo, la frase, el botón de pausa y el movimiento reducido** no son archivos: los fija la spec y los construye
  Diego. Lo que estos archivos dejan listo para eso: el póster es el primer cuadro del bucle (con movimiento reducido
  se queda quieto en él, y sin movimiento reducido no hay salto cuando el video arranca), y ningún archivo trae
  audio ni controles propios.
- **Ninguna generación, ningún gasto,** ni otra versión del clip. «Cuando tenga plata vamos con lo faltante» (Ramón,
  19-oct) vale para los conceptos, no para esto.
- **No se tocó `spindlelab-astro/`.** El sitio de hoy sigue sirviendo su MP4 de 5,09 MB con el corte que salta.

## Cómo rehacerlo

```
bash marketing/oficina/obras-web/spindlelab-v3/e12/medios/hilo/herramientas/hacer-hilo.sh
```

Necesita `ffmpeg` y `ffprobe` (con libvpx-vp9, libx264 y libwebp; aquí 6.1.1), Python 3 con numpy. Tarda unos dos
minutos. Vuelve a escribir los seis archivos y `bucle.json`; los maestros sin pérdida quedan en un temporal y se
borran. `costura-del-bucle.webp` se armó aparte, una vez, con los cuadros 142 a 2 del original y 117 a 1 del bucle.
