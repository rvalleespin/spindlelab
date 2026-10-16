# Material para los overlays de video — campaña de Verifica

**Para:** la sesión que está armando los overlays del video.
**De:** la sesión que produjo las piezas publicadas en Instagram.
**Fecha:** 16-oct-2026. Todo esto está sacado del código de las piezas que ya salieron,
no de memoria.

Las piezas vivas están en `marketing/redes/2026-10-octubre-verifica/`. Lo de acá es lo que
hay que respetar para que el overlay y lo publicado sean la misma familia visual.

---

## 0. Antes que nada: son DOS sistemas visuales y no se mezclan

Esta campaña es de **Verifica y Cumple**, que tiene paleta y tipografía propias. **No** usa
el sistema de SpindleLab. Las tres piezas publicadas lo dicen en su propio código:

> *"NADA de SpindleLab acá: ni #0e141b, ni hilo de oro, ni Gabarito, ni Manrope."*
> — `02-story-compartir/story.html`, línea 11

Si el video es de Verifica, nada de Gabarito, Manrope, negro `#0e141b`, verde petróleo
`#2fa99b` ni dorado `#C9A227`. Si el video fuera de SpindleLab, entonces es al revés y este
documento no aplica.

---

## 1. Los tokens, exactos

Idénticos en las tres piezas publicadas (carrusel, reel y story):

```css
--azul-600:  #2e5bff;
--lima-400:  #d6ff3d;
--rosa-500:  #ff3ea0;
--tinta-900: #17163a;
--tinta-500: #56547a;
--crema-100: #fffaf0;
--arena-300: #e2d6bf;
--blanco:    #ffffff;

--display: "Archivo Black", Impact, sans-serif;
--cuerpo:  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

**La disciplina del acento, medida en el reel publicado:** `--lima-400` 3 usos,
`--azul-600` 2, `--rosa-500` **0**. El lima es el acento; el rosa quedó solo en el relleno de
la estrella del cierre. No repartir tres acentos en una pieza.

### La tipografía

**Archivo Black** para titulares, y va como archivo local, no desde Google Fonts. Los dos
`.woff2` se copian **dentro de la carpeta de la pieza** y se referencian relativos — si no,
el render headless no los carga y sale una tipografía de respaldo sin que se note hasta
mirar el PNG.

```
archivo-black-latin.woff2       (9.792 bytes)
archivo-black-latin-ext.woff2   (6.400 bytes)
```

Los dos `@font-face` con su `unicode-range` están copiados en
`05-overlays-video/recuadro-sitio.html`; cópialos de ahí tal cual. El `-ext` no es opcional:
las tildes y la eñe salen de ese rango.

**La escala que se usó de verdad en el reel:**

| | tamaño | line-height | letter-spacing |
|---|---|---|---|
| titular grande | 168px | .90 | -.04em |
| titular normal | 120px | .93 | -.022em |
| dominio en la tarjeta | 70px | 1 | -.028em |
| cuerpo | 39px | 1.28 | — |
| etiqueta / rótulo | 31–34px | — | .12–.15em, mayúsculas |

---

## 2. El recuadro del sitio — ya está hecho

En `marketing/redes/2026-10-octubre-verifica/05-overlays-video/`:

| archivo | qué es |
|---|---|
| `recuadro-sitio.html` | la fuente, con el CSS copiado del cierre del reel |
| `recuadro-sitio-justo.png` | 1080×355, recortado al borde real. Para posicionar libre en CapCut |
| `recuadro-sitio-cuadro.png` | 1080×1920, la tarjeta en la posición publicada (top 1252px) |
| `render.sh` | rehace los dos y **verifica el canal alfa** |
| `overlay.html` | plantilla en blanco para overlays nuevos, con los tokens ya puestos |

Los dos PNG están verificados con canal alfa (color-type 6). El recorte justo llega hasta el
último píxel con opacidad, así que la sombra entra entera y no sobra franja transparente.

**El texto del recuadro es el publicado y no se cambia a la ligera:**

> REVISA EL TUYO EN
> **verifica.spindlelab.cl**
> Sin registro. No pedimos tu correo.

El dominio va **escrito completo, nunca "link en la bio"**: en Instagram el enlace del pie no
se puede tocar. Esa decisión está comentada en el reel publicado.

---

## 3. Cómo se renderiza un overlay transparente

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --default-background-color=00000000 \
  --window-size=1080,1920 \
  --screenshot=salida.png "file:///ruta/absoluta/overlay.html"
```

Las dos banderas que no se pueden tocar:

- **`--default-background-color=00000000`** es lo que deja el fondo transparente. Sin eso el
  PNG sale opaco y el overlay tapa el video. **El HTML tampoco puede declarar un `background`
  en `html` o `body`** — si lo hace, gana el HTML y la bandera no sirve de nada.
- **`--force-device-scale-factor=1`** o sale al doble de tamaño.

**Verificar el alfa siempre, no asumirlo.** Un PNG sin canal alfa se ve perfecto al abrirlo y
recién falla al montarlo. `render.sh` lo comprueba solo y falla si falta:

```python
import struct; d=open(ruta,'rb').read()
w,h,bd,ct = struct.unpack('>IIBB', d[16:26])   # ct == 6 es RGBA
```

---

## 4. Las trampas del pipeline, ya pagadas

Están documentadas en `04-reel-estas-seguro/render.sh`. Resumidas, porque cada una costó una
corrida:

- **Chrome headless se cuelga, y no solo en paralelo.** Primero se descubrió paralelizando;
  el 28-sep se colgó **también en serie**, en el cuadro 214: el proceso vivo, sin escribir el
  PNG, y el bucle esperándolo para siempre. La solución es lanzar Chrome al fondo con un
  vigilante que lo mate a los 25s, perder ese cuadro y rehacerlo en una segunda pasada.
- **`timeout` no existe en macOS** (es de coreutils). Un script que lo use revienta en
  silencio.
- **`(( i++ ))` con `set -e` mata el script.** El post-incremento devuelve el valor
  **anterior**, que en la primera vuelta es 0, y un 0 aritmético se lee como fallo. Se
  escribe `i=$(( i + 1 ))`. Se cayó así una vez sin decir nada.
- **`ffmpeg` está en `~/bin/ffmpeg`** (versión 6.0), también en el PATH. No está en
  `/usr/local/bin`.
- **`-pix_fmt yuv420p` no es opcional** al montar: sin eso Instagram y QuickTime pueden no
  reproducir el MP4.
- **Instagram se cuelga en silencio al subir un video sin pista de audio.** El reel publicado
  necesitó una pista de silencio para poder subirse: por eso existe
  `reel-con-pista-de-silencio.mp4` al lado de `reel.mp4` — mismo video, 16s, y la única
  diferencia es un `Stream #0:1 Audio: aac`. Se agrega con `anullsrc`.
- **El crop "Original" de Instagram sí recorta un video vertical.** Hay que elegir 9:16 a mano.
- **Los cuadros no van a la carpeta del repo.** Son cientos de PNG de ~1,2 MB y esta carpeta
  vive en iCloud Drive. Van a disco local (`$TMPDIR`) y de ahí sale el MP4.

---

## 5. Qué dice el reel publicado (para no repetirlo ni contradecirlo)

Texto completo de `04-reel-estas-seguro`, 16s:

> ¿ESTÁS SEGURO? · Tu sitio pide datos. Nombre, correo, teléfono. · TE LOS DAN CONFIANDO · En
> que no terminen en otra parte. · PERO ESO NO SE VE. · Pasa por dentro de tu sitio, apenas
> alguien entra. No en la página que tú miras. · PARA ESO LLEGÓ LA LEY. · Las mismas reglas
> para todos, y las personas sabiendo a qué atenerse. · Y PARA ESO NOSOTROS. · Te mostramos
> qué hace tu sitio cuando alguien entra, y qué te falta publicar. · Toma un minuto · MÍRALO
> GRATIS. · [recuadro del sitio]

Publicado como Reel en `instagram.com/reel/Dd6dAemM6E2/` y el carrusel "Las 12 cosas" en
`instagram.com/p/Dd3uPldESqj/`, los dos en `@spindlelab.cl`.

---

## 6. Las reglas de contenido

Están completas en `MATERIAL-guiones-verifica-oct.md`, en esta misma carpeta. Las que más
fácil se rompen en un overlay, porque caben en una línea de impacto:

- **La multa nunca es gancho.** Ni 20.000 UTM, ni el 4%, ni en un overlay de medio segundo.
- **Nunca "cumples" ni "no cumples".** El chequeo describe señales, no certifica.
- **No se nombra a ningún prospecto, cliente ni competidor.** Los hallazgos se generalizan.
- **Cero rayas largas (—) como golpe de efecto.** Es el tell de IA más marcado y está
  prohibido en las reglas de tono de la casa.
- **Nada de "72 horas"** para notificar brechas: eso es RGPD europeo, no está en la ley chilena.
