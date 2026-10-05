# El tablero de estilo — el artefacto de la compuerta 2

> Una sola pantalla que muestra el lenguaje visual de una dirección **con contenido
> real del proyecto**, para poder aprobarla o rechazarla en minutos en vez de
> construir el sitio y descubrirlo después. No es un moodboard (eso es
> `referencias.md`) ni una página terminada.

## Qué tiene que haber en el tablero

Siete bloques, en una sola página, renderizada a PNG:

1. **El wordmark o logo** en su tamaño y contexto real de header, sobre el fondo
   que va a tener.
2. **La escala tipográfica con texto real**: el H1 verdadero de la home (el que
   escribió Clara, no "Lorem ipsum" ni "Tu título acá"), un H2, un párrafo de cuerpo
   de 3 líneas reales, y el texto chico (metadata, nota al pie). Con las familias y
   los pesos de verdad, cargados localmente.
3. **La paleta con el rol de cada color escrito al lado**: fondo, superficie, texto,
   texto secundario, acento, y en qué se usa el acento. Un hex sin rol es una
   muestra, no un token.
4. **Los botones en sus cuatro estados** (reposo, hover, foco visible, deshabilitado)
   más el enlace de texto. Es donde se ve si hay sistema o improvisación.
5. **Un bloque de contenido compuesto**: una sección de verdad, con su jerarquía y su
   asimetría. Idealmente el hero. Acá se ve la composición, que es lo que separa una
   dirección de una paleta.
6. **El tratamiento de la media**: cómo entra una foto, un screenshot o un gráfico
   (recorte, borde, superposición, ratio). Si la dirección depende de imagen y el
   tablero no la muestra, el tablero miente.
7. **La nota de dirección** (3-5 líneas, en la misma imagen o al lado): referencia
   dominante, qué rasgo se toma de ella, **qué sacrifica** esta dirección, y para qué
   tipo de visitante funciona mejor.

Lo que **no** va: no va el sitio completo, no van las cinco páginas, no van
microinteracciones, no van variantes de la variante. Si el tablero empieza a parecer
el sitio, se está construyendo antes de la aprobación.

## Las dos direcciones tienen que ser distintas de verdad

Dos tableros que se diferencian en el tono de gris no son dos opciones: son la misma
dirección con ruido. Para que la compuerta 2 sirva, las dos direcciones difieren en al
menos **dos** de estos ejes, y se puede nombrar en qué:

- Densidad (aire editorial ↔ densidad de producto)
- Carrier visual (tipografía ↔ imagen ↔ dato/gráfico)
- Temperatura y modo (claro ↔ oscuro, neutro ↔ saturado)
- Estructura (grilla estricta ↔ composición asimétrica)
- Carácter tipográfico (geométrico ↔ humanista ↔ display con contraste)

Y cada una preserva los rasgos filosos de **su** referencia dominante. Si las dos
terminan pareciéndose, es que se promediaron las referencias — el tell #7 de
`anti-ai-slop.md` — y hay que volver a `referencias.md`.

## Cómo se renderiza (pipeline de la casa)

Mismo pipeline que usa la producción de piezas de marca: HTML en su carpeta, fuentes
copiadas al lado y referenciadas en relativo, captura con Chromium headless.

```bash
# 1 · carpeta de la dirección, con las fuentes al lado (relativas, no CDN)
mkdir -p tableros/direccion-a && cd tableros/direccion-a
# las fuentes de la marca del cliente; para la casa viven en
# spindlelab-astro/public/fonts/ (Gabarito.woff2, inter-latin.woff2)
cp <ruta>/Gabarito.woff2 <ruta>/inter-latin.woff2 .

# 2 · ubicar el Chromium real de la sesión
find /opt/pw-browsers -iname "chrome"                # sesión cloud
# local Mac: /Applications/Google Chrome.app/Contents/MacOS/Google Chrome

# 3 · capturar escritorio y celular
CHROME=$(find /opt/pw-browsers -iname "chrome" | head -1)
"$CHROME" --headless --no-sandbox --disable-gpu \
  --window-size=1440,2200 --screenshot=tablero-1440.png tablero.html
"$CHROME" --headless --no-sandbox --disable-gpu \
  --window-size=390,1800  --screenshot=tablero-390.png  tablero.html
```

Reglas del render que ya costaron tiempo acá:

- **Fuentes locales, nunca CDN.** El headless sin red (o con proxy) cae al fallback y
  la captura muestra una tipografía que no es la de la dirección. Si la captura se ve
  en Times, no es la dirección: es el fallback.
- **Headless a 390px miente sobre el overflow horizontal** (artefacto del clamping de
  `--window-size`). Para el tablero da igual, pero no reportes un bug de scroll
  horizontal desde esa captura: eso se verifica en la fase 4, con
  `document.documentElement.scrollWidth == clientWidth`.
- **Mira la captura antes de presentarla.** Un tablero con una fuente caída, un bloque
  cortado o un color que no es el de la paleta quema la compuerta: Ramón va a rechazar
  un defecto de render creyendo que rechaza la dirección.

## Cómo se presenta la compuerta 2

Las dos capturas, y para cada una, en tres líneas: **referencia dominante** (nombre o
URL real), **el rasgo** que se preserva, **lo que sacrifica**. Y una pregunta sola:
cuál se construye.

No se recomienda una "por si acaso" sin decir por qué. Si hay una favorita, se dice
cuál y con qué argumento — un estudio con criterio opina; un proveedor pregunta.
