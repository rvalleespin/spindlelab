# E12 · Herramientas y datos de `spec-visual.md` (dirección A)

**19-oct-2026 · Lucía.** Todo lo que la spec afirma con un número sale de aquí. Chromium 141 de
`/opt/pw-browsers/chromium-1194` con el Playwright de `spindlelab-astro/node_modules`; Python 3 con numpy y Pillow;
`ffmpeg`. Nada de esto toca `spindlelab-astro/` (solo lee `node_modules`, `public/` y el `dist/` del 16-oct).

| Herramienta | Qué mide | Salida | Dónde lo usa la spec |
|---|---|---|---|
| `portada/index.html` | El estudio de la portada: la implementación de referencia, con la hoja y las letras del prototipo de A y cinco cuadros del bucle de Bruno (`?cuadro=000`, `065`, `072`, `079`, `120`; `?fondo=blanco` para leer el velo) | `img/portada-*.jpg` | §2.1, §3.1 |
| `herramientas/portada.mjs` | El velo pintado por el navegador (captura sobre blanco, sin texto) y cada línea de texto de la portada, en 11 tamaños | `datos/portada/` | §3.1 |
| `herramientas/contraste-portada.py` | Cada línea contra los 121 cuadros de `hilo-1920.webm`, con y sin velo; el borde del campo; dónde queda el botón | `datos/portada-contraste.json` | §3.1, §4.4 |
| `herramientas/medir-proto-a.mjs` | Letra, retícula y bloques del prototipo de A en 12 anchos (caracteres por línea del cuerpo del caso) | `datos/proto-a.json` | §0.4, §1.3, §1.4 |
| `herramientas/koto-entre-cortes.mjs` | Koto entre sus cortes (Lyft y `/work` de 834 a 1440): dónde aparece la barra lateral | `datos/koto-entre-cortes.json` | §1.4, §0.3 |
| `herramientas/lenis-prevent.mjs` | Lenis 1.3.26 con la configuración del `Layout`, con y sin `data-lenis-prevent`, y las dos formas de escribir un ancla | `datos/lenis-prevent.json` | §5.2 |
| `herramientas/campo-medios.py` | Qué medio es «campo», entero y recortado a 2,39:1 y 16:9; desde el 23-oct con la **regla 2** (la cubeta del lock §20.1 o una familia de color de 40° × 0,30). Con `--paginas`, el techo de cada página sobre las capturas de `campos.mjs` (Javiera) | `datos/campo-medios.json`, `datos/campos-paginas-regla2.json` | §3.4 |
| `herramientas/koto-campos-regla2.py` | Koto contado con las dos reglas (es `pixeles.py` del paso 2 más la regla 2), sobre los recorridos de `medicion/koto/paso2/herramientas/recorrido.mjs` | `datos/koto-campos-regla2.json` | §3.4 |
| `herramientas/campo-regla2-ventanas.py` | Once ventanas de la regla 2 probadas contra Koto y A: por qué 40° × 0,30 y los claros con la cubeta | `datos/campo-regla2-ventanas.json` | §3.4 |
| `herramientas/obra-v1-defectos.mjs` | Las decisiones de los defectos 2 y 4 del acta de la obra, inyectadas sobre el build: el aviso de cookies abierto y lo que tapa (home, diagnóstico, contacto, 8 tamaños y 375 × 667 y 414 × 896); el «Concepto» de los cuatro conceptos con y sin aviso | `datos/obra-v1-defectos.json`, `img/obra-v1-*.jpg` | §2.1, §2.3, §4.3, §4.4 |
| `herramientas/obra-v1-ocho-anchos.mjs` | Las mismas decisiones (y Auditoría sin franja) renderizadas en los ocho tamaños, con el aviso abierto: una hoja por página | `img/obra-v1-ocho-anchos-{home,tonela,doceavo,auditoria}.jpg` | §2.1, §2.3, §2.4 |
| `herramientas/tokens.py` | El contraste de cada par de tokens | `datos/tokens.json` | §1.1 |

```
cd marketing/oficina/obras-web/spindlelab-v3
python3 -m http.server 8793 --bind 127.0.0.1 &          # sirve esta carpeta (el estudio usa la hoja del prototipo)
cd e12/spec
node herramientas/portada.mjs http://127.0.0.1:8793/e12/spec/portada/ datos/portada
python3 -I herramientas/contraste-portada.py datos/portada ../medios/hilo/hilo-1920.webm datos/portada-contraste.json
node herramientas/medir-proto-a.mjs http://127.0.0.1:8793/tableros/e12-direcciones/proto/a/ datos/proto-a.json
node herramientas/koto-entre-cortes.mjs datos/koto-entre-cortes.json <carpeta-temporal>   # necesita red
node herramientas/lenis-prevent.mjs datos/lenis-prevent.json
python3 -I herramientas/campo-medios.py datos/campo-medios.json <imágenes…>
python3 -I herramientas/tokens.py datos/tokens.json
# 23-oct, defectos 2, 3 y 4 del acta de la obra (desde spindlelab-astro construido: npm run build)
node herramientas/obra-v1-defectos.mjs datos/obra-v1-defectos.json img
node herramientas/obra-v1-ocho-anchos.mjs img
node ../qa-obra/vuelta-1/herramientas/campos.mjs <carpeta-temporal>               # capturas a 1440 (Javiera)
python3 -I herramientas/campo-medios.py --paginas <carpeta-temporal> datos/campos-paginas-regla2.json
# Koto (necesita red): una vez por línea de ../medicion/koto/paso2/herramientas/paginas.txt, a 1440
node ../medicion/koto/paso2/herramientas/recorrido.mjs <id> <url> 1440 <crudo> <cuadros>
python3 -I herramientas/koto-campos-regla2.py <crudo> <cuadros> datos/koto-campos-regla2.json <recortes>
python3 -I herramientas/campo-regla2-ventanas.py <recortes> datos/koto-campos-regla2.json <carpeta-temporal> datos/campo-regla2-ventanas.json
```

**En la corrida 2**, `portada.mjs` y `contraste-portada.py` se corren contra la home construida: basta con que la
portada lleve las clases `.portada-v`, `.portada-v__medio` y `.portada-v__pie` (o cambiar los tres selectores de
`portada.mjs`). Si cambia el archivo del video, el velo o el texto, la tabla de §3.1 se rehace con lo que den.
