# Acta de QA · SpindleLab v3 · E10 paso 2 (lock The Ready, dos direcciones, pauta de fotos)

> Escrita por Javiera (`/web-qa-critico`) en contexto limpio: subagente nuevo que leyó el plan,
> el lock, el tablero, los prototipos, la pauta y el código. No vio la conversación donde se
> construyó. Cada cifra de abajo sale de un script mío, guardado en `qa-paso-2/ronda-1/herramientas/`.

---

## Ronda 1 · 16-oct-2026

**Rama/commit auditado:** `claude/magical-franklin-ckfki2` @ `6fdd8a1` (igual a `origin`; árbol limpio;
ningún archivo revisado cambió durante la revisión). **Rondas previas:** ninguna.

### Veredicto: RECHAZADO

La pauta de fotos y el tablero no hablan de las mismas fotos (defecto 1, bloqueante): la sesión con
clave generaría fotos para espacios que no existen y dejaría vacíos tres de los cuatro espacios de
la home de Taller. Además, el tablero le pide a Ramón elegir sin mostrarle dos cosas que su «sí»
cambia: ocho reglas del manual que él aprobó (defecto 3) y el orden del hero con el instrumento
primero, que es decisión suya (defecto 4). El oficio técnico está bien hecho (abajo, «Lo que está
bien»): lo que falta es casi todo reconciliar y declarar, más dos decisiones de dirección.

### Fuentes y lo que faltaba

- **Brief:** no hay `brief-de-obra.md` de E10. Uso como criterio de aceptación la sección
  «Verificación» del plan aprobado (`/root/.claude/plans/dazzling-snacking-river.md`) y el encargo.
- **Spec:** la vigente es la de driftime (`spec-visual.md`), que E10 va a reemplazar. La uso solo
  para las decisiones de Ramón que siguen vigentes (§0.4: «dirección A, el instrumento primero en la
  home»; criterio de éxito = conversión).
- **Desvíos:** no hay `desvios.md` de E10. Los desvíos se buscaron contra el plan, el lock y la spec
  §0.

### Cómo se verificó

- Chromium 141 (`/opt/pw-browsers/chromium-1194`) con Playwright de `spindlelab-astro`. `npm run build`
  corrido hoy (27 páginas); `dist/` servido en 8781, `proto/` en 8780, el tablero en 8782.
- **Lock contra theready.com en vivo**, tres valores sorteados (semilla 20261016): ver tabla.
- **Texto:** comparación propia, distinta de `texto-igual.mjs`: con JavaScript encendido, `innerText`
  del cuerpo después de recorrer la página, sin rótulos de foto ni cinta, comparado palabra por
  palabra y por secuencia de bloques (`difflib`), en las 12 vistas.
- **Capturas** a 1440 y 390 de las seis páginas (y 768 y 360 para desborde); recortes en
  `qa-paso-2/ronda-1/capturas/`.
- **Oro** por ventana de una pantalla, en capturas con `--disable-lcd-text` (`oro-por-vista.py`).
- **Contraste** de cada nodo de texto visible (1.502 nodos), componiendo fondos translúcidos y las
  imágenes de fondo conocidas (marcador, marcador papel, mancha).
- **Cinta:** velocidad por `DOMMatrix` en 2 s, pausa con teclado, `reducedMotion: reduce`, fuera de
  pantalla.
- **generar.mjs** con un precargado que intercepta `fetch`, `net`, `tls`, `http`, `https` y `dns`, con
  claves falsas y con un 400 simulado que repite la clave.

### Mediciones

| Qué | Resultado |
|---|---|
| Lock, valor 1: rótulo mono a 1440 | En vivo: 11,816 px, interletra 0,35448 px (= 0,03em), MAYÚSCULAS, 500. Lock: 11,8 · +0,03em · 500 ✓ |
| Lock, valor 2: alto del encabezado a 1440 | En vivo: 90,03 px, `position: fixed`. Lock: 90 px ✓ |
| Lock, valor 3: grosor del marcador | En vivo (`/working-together`): `stroke-width` 137 px, `#F4F480`, remate cuadrado, sobre h1 de 137,96 px. Lock: 1em, 137 en un h1 de 138 ✓ |
| Letra sustituta | Instrument Sans: tabla `name` → OFL (también Plex Sans, Plex Mono, Gabarito). Ningún archivo Saans en el repo. Parecido real en `lock/tipos-comparados.png`; se ve más liviana que Saans Medium (defecto 10) |
| Amarillo contra oro | `#F4F480`: 60,0°, sat 0,475 → fuera del criterio (38–54°, ≥ 0,5). Cálculo del lock correcto |
| Texto visible vs `dist/v3` | Mismo multiconjunto de palabras en 12/12 vistas, salvo el control «· Cookies» del pie (lo inyecta `consent-banner.js`, que los prototipos no cargan) y el espacio de «SpindleLab .». Secuencia: cambia en las 12 (defecto 4) |
| Hero y chequeo | Texto igual; atributos del formulario (`chq-form`, `chq-dominio`, `chq-btn`, `chq-nota`, `chq-error`, `chq-out`, nombre, tipo, placeholder, aria) idénticos. Orden: invertido (defecto 4) |
| Desborde | 390: `scrollWidth == clientWidth` en 12/12. 768 y 360: igual, salvo Pizarra Acompañamiento a 360 (364 vs 360). `body { overflow-x: clip }` recorta los garabatos a sangre (1464, 1470 a 1440) |
| Cinta | 29,9–30,2 px/s · Enter en el botón la detiene (Δ 0,0 px) y `aria-pressed` pasa a `true` · 44×44 · con movimiento reducido 0 px/s y solo se mueve si se pide · `cinta--fuera` al salir de pantalla · `aria-hidden`, fuera de todo encabezado |
| Oro por vista | Un solo oro: el punto del pie sobre ciruela (47×47 a 1440). Fuera de él, peor vista 81 px a 1440 (umbral 648) y 29 px a 390 (umbral 164) |
| Contraste | 0 fallas en 1.502 nodos; mínimo 5,89:1 (casi negro sobre la mancha naranja) |
| Techos del lock §13 | Taller: marcador 4/2/3 por página, máx. 2 a la vista; 1 banda amarilla; 1 garabato; 1 mancha; cinta en 2 páginas. Pizarra: 1 marcador por página, 0 bandas, 0 garabatos, 0 manchas, cinta solo en la home ✓ |
| Fotos viejas `assets/img/d/` | 0 en `src`, `srcset` y fondos, en las 12 vistas |
| Red y 404 en prototipos | 0 pedidos fuera de 127.0.0.1, 0 respuestas ≥ 400 |
| Tablero como Artifact | Sin doctype/html/head/body ✓ · `<title>` de 3 palabras ✓ · `claude:viewport-fit-sides` + `max(16px, env(safe-area-inset-*))` ✓ · tokens en `:root` ✓ · `body` con fondo ✓ · solo Google Fonts (pide a googleapis y gstatic) ✓ · 38 imágenes, 0 rotas, máx. 481 KB, total 9,87 MB ✓ · 390/768/1440 sin desborde ✓. Solo tema claro, con el porqué escrito en el CSS |
| Tablero vs prototipos | Alto de cada captura idéntico al render actual; diferencia media por canal < 1,6 (JPEG y la cinta) |
| generar.mjs sin clave ni tope | Lista 12 fotos / 24 imágenes, código 0, 0 intentos de red |
| generar.mjs con tope y sin clave | Código 2, mensaje con la variable exacta y dónde se configura, sin carpeta ni red |
| generar.mjs con claves falsas | Sin tope: 0 red, la clave no aparece. Con tope: la clave va en `x-goog-api-key` (no en la URL); no aparece en stdout, stderr ni `registro.json`. 400 que repite la clave → «[clave oculta] [clave oculta]» y corta la corrida |

### Defectos

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cómo se reproduce / cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | **bloqueante** | Bruno | `e10/fotos/pauta.json` y `pauta.md` §3 contra `tableros/e10-direcciones/espacios-foto.json` | Los F<n> no coinciden. Solo F1 y F8 son la misma foto. Los rótulos del tablero F2–F7 corresponden a F10, F6, F5, F2, F7 y F9 de la pauta. F3 y F4 (prioridad 1) y F11 y F12 no tienen espacio en ningún prototipo. `equivalencia_lucia.tabla` está entera en `null`; su estado dice «revisado a las 09:03», antes de que existiera `espacios-foto.json` (12:28). `generar.mjs` solo avisa. El primer comando que documenta la pauta (`--prioridad=1 --tope=12`) genera F3 y F4 (sin espacio), F9 en una proporción que no es la del espacio (defecto 2) y nada para tres de los cuatro espacios de la home de Taller | Plan, paso 3 y verificación; encargo «los F<n> coinciden» | `node generar.mjs --prioridad=1` y comparar con `espacios-foto.json`. **Cierre:** una sola numeración, la del tablero (o la tabla de equivalencia llena y los archivos de salida con el número del tablero). Las fotos sin espacio bajan a prioridad 3 o salen, como dice la propia regla de §3. `generar.mjs` bloquea (no solo avisa) mientras exista `espacios-foto.json` y la tabla tenga vacíos. `--sincronizar` y `pauta.md` regenerado |
| 2 | mayor | Bruno | Ficha F9 (espacio F7 de Pizarra, Acompañamiento) y F10 (espacio F2 de Taller) | El espacio F7 es una banda a sangre de 1440×617 (21:9) y 4:5 a 390; la ficha F9 pide 3:2 (Gemini 1248×832) para «el ancho de la columna de contenido». Pasar de 3:2 a 21:9 corta el 37 % del alto y deja 1248 px para un espacio de 1440. F10 va en un espacio de Taller con `encuadre: pizarra` (abierto y quieto), contrario al encuadre de Taller | `espacios-foto.json` F7 y F2; pauta §1 (un encuadre por dirección) | **Cierre:** reescribir F9 para su espacio (21:9, 1536×672, o 16:9 con los dos recortes escritos como F2) y dar a cada ficha el encuadre de la dirección donde va |
| 3 | mayor | Lucía | `tablero.html` (bloque «decide») | El lock §15 lista ocho reglas del manual que cualquiera de las dos direcciones cambia (lienzo negro → papel, Manrope → Instrument/Plex, display en mayúsculas → oración, rótulos, radio 6 → óvalo y radio 0, campos por pilar, punto dorado solo sobre ciruela, movimiento) y dice «decide Ramón en la compuerta 2». El tablero no menciona ninguna (0 apariciones de «manual», «Manrope», «negro», «mayúscula»), ni la opción del oro en la primera pantalla (lock §12) | Lock §15 y §12; protocolo de compuertas | `grep -i manual tablero.html`. **Cierre:** un bloque en el tablero con lo que el «sí» cambia del manual, fila por fila con su fecha de aprobación, y la opción del punto dorado |
| 4 | mayor | Lucía | Hero de la home, las dos direcciones; y `texto-igual.json` | En `dist/v3` el instrumento va primero: formulario en y 142 y h1 en y 340 a 1440 (126 y 504 a 390), como fija la spec §0.4 y §4 («instrumento → display → fila de 4 obras»). En los dos prototipos el h1 va primero y el chequeo después (Pizarra lo baja a una fila propia bajo un filete). Taller además baja la fila de obras después de «Tu sitio está escrito para personas». `texto-igual.json` marca `mismo_orden_de_lectura: false` y el tablero dice «Solo se agregan los rótulos de foto y la cinta» | Spec §0.4 (decisión de Ramón, criterio = conversión); plan: «el hero con su chequeo, tal cual» | `capturas/dist-hero-1440.jpg` contra `hero-taller-1440.jpg` y `hero-pizarra-1440.jpg`; `herramientas/orden.mjs`. **Cierre:** devolver el instrumento arriba en las dos, o mostrarlo en el tablero como cambio que Ramón aprueba aparte |
| 5 | mayor | Lucía | Dirección «Pizarra limpia» | Clara, pero genérica del hero para abajo. Baja la escala que Ramón nombró («la tipografía»): h1 de 72 px en Acompañamiento y Trabajo (Taller: 138) y h2 de 46 como máximo (Taller: 91), cuando la tesis del lock §1 es «una sola voz tipográfica grande». Los cuatro servicios de la home son cuatro filas con la misma estructura (rótulo, píldora, entrada, precio, dos botones). Cero bandas, cero garabatos, un marcador por página. El propio tablero lo admite: «Es la más cercana al sitio típico que le criticaste a Gehl» | Ramón sobre Gehl: «me falta creatividad, es casi un sitio típico»; antislop B1; refero tell #7 (rasgo fuerte suavizado); prueba del rubro cambiado | `herramientas/tipos.mjs`; `capturas/pizarra-home-1440-1.jpg`, `pizarra-trabajo-1440-0.jpg`. **Cierre:** que Pizarra conserve algo filoso de The Ready en todas sus páginas, no solo en el hero de la home (la escala display es lo obvio, porque es lo que la separa de Gehl), y que los servicios dejen de pesar lo mismo. Prueba del logo tapado sobre la segunda y la tercera pantalla, escrita en el tablero |
| 6 | mayor | Lucía | Lock §10 y prototipos, sobre todo Taller | El marcador y la cinta son propios ✓. El resto se toma tal cual: los siete colores de The Ready que se usan van idénticos al hex (`tokens.css`); óvalo de 12,7 px mono +0,1em que al pasar se invierte y crece ×1,10 en 0,6 s `cubic-bezier(.19,1,.22,1)`; encabezado de 90 px con filete ciruela y rectángulo de radio 0; banda final ciruela + display papel + óvalo lavanda; collage sobre cuadrícula (el de su «Who we are»); garabatos puestos donde The Ready pone los suyos (el ovillo junto al h1 de la oferta, los rulos en la banda amarilla de la home); mancha naranja con rótulo mono. Junto, Taller con el logo tapado se lee como The Ready, no como SpindleLab. La marca ya tiene un ciruela propio (`#341F34`, manual §04). El lock dice «tal cual medido» del marcador, que no es lo que se construyó | Encargo: «ningún recurso copiado tal cual de The Ready, debe ser propio»; prueba del logo tapado | `diff` de `proto/e10/tokens.css` contra `lock/medicion-the-ready.json` `color.paleta`; `capturas/tr-ovillo.jpg` contra `garabatos.jpg` y `taller-acompanamiento-mensual-1440-0.jpg`. **Cierre:** el lock dice, recurso por recurso, qué se hace propio y cómo (valor, forma o composición). Si Ramón quiere los colores exactos, que lo decida en el tablero sabiendo que son los de ellos. Corregir §5 y §10 del lock: el marcador es propio |
| 7 | menor | Lucía | Taller, hero, chequeo | El óvalo «Ver cómo lo lee» se monta sobre el campo. A 390: campo en y 447–507, óvalo en 493–585, corta el borde inferior del campo. A 1440: campo en x 279–689 y óvalo desde 645; `elementFromPoint(679, 612)` = `chq-btn`. Un dominio largo se escribe debajo del botón. En The Ready el óvalo monta el borde de una foto, no el de un campo | Lock §6; C6 (control usable) | `herramientas/hero.mjs`; `capturas/hero-taller-390.jpg`. **Cierre:** el óvalo no tapa el campo, o el campo reserva ese ancho con su `padding` |
| 8 | menor | Lucía | Marcador en «se corta» (hero, las dos) y «cuál es cuál» (Trabajo, las dos) | El lock §13 dice «la consecuencia, al final». «se corta» queda a mitad del titular: está justificado en el tablero, pero no en el lock. «cuál es cuál» no está declarado, y en Taller va en papel sobre lima, donde se lee como una caja blanca y no como marcador | Lock §13; refero (palabra resaltada sin regla) | `capturas/taller-trabajo-1440-0.jpg`. **Cierre:** mover al final o escribir la excepción en §13 con su porqué |
| 9 | menor | Lucía | `tablero.html` | (a) Los garabatos son provisionales, generados con semilla (comentario del SVG: «el definitivo lo traza Bruno a mano»), pero el tablero los presenta como finales. (b) «Texto visible igual en 12 de 12» vale con JavaScript apagado: falta decir que se quitó el control «Cookies» del pie y que cambió el orden (defecto 4). (c) Decimales con punto («29.9-30.2», «12.1 a 21.5 %») en un tablero es-CL cuyo lock usa coma. (d) «Ambiente de la empresa del cliente» y «una empresa cliente» (F1) chocan con la regla «ni como clientes» que el mismo párrafo enuncia | Pruebas de fuego; antislop A7; regla de personas | Leer el anexo del tablero. **Cierre:** las cuatro cosas dichas como son |
| 10 | menor | Lucía | Lock §11 y prototipos | En `tipos-comparados.png`, Instrument Sans 500 se ve claramente más liviana que Saans Medium. El lock dice que el peso «se ajusta en el tablero si el 500 se ve más liviano»; los prototipos quedan en 500 y no dicen si se probó | Lock §11 | **Cierre:** probar 540–560 (la fuente es variable de 400 a 700) contra el comparativo y anotar el resultado |
| 11 | menor | Lucía | Código de los prototipos | Los tres `<img>` de garabato sin `width`/`height`. IBM Plex Sans 600 en `.d-desc b` (`taller.css:61`, `pizarra.css:61`), cuando el lock §11 dice 400 y 700. Pizarra Acompañamiento a 360: `scrollWidth` 364 contra 360 (lo esconde el `overflow-x: clip` del body; a 390 está bien) | Antislop C7; lock §11 | `herramientas/techos.mjs`, `tipos.mjs`. **Cierre:** dimensiones, declarar o quitar el 600, encontrar los 4 px |
| 12 | menor | Bruno | Ficha F11 | El alt dice «una calle de Providencia», y la regla de alt de la misma pauta lo prohíbe. Si F11 sale por el defecto 1, se cierra solo | Pauta, `reglas.alt` | **Cierre:** sacar el barrio del alt |

Fuera de esta lista, a propósito: el óvalo de la banda amarilla de Taller Trabajo y el del pie
quedan a 791 px uno del otro, así que a 1440×900 se asoman los dos en una franja de ~100 px de scroll
pero nunca se ven enteros a la vez. No lo cuento como dos a la vista.

### Cumplimiento del plan (sección «Verificación»)

| Criterio | Estado |
|---|---|
| Lock con medidas del navegador (JSON), capturas a 1440 y 390, letra gratuita con su licencia | Cumple. Tres valores verificados hoy en vivo |
| Amarillo medido contra el tono del oro | Cumple |
| Dos direcciones distintas, sin desborde a 390 | Cumple: difieren en densidad (texto 12–22 % contra 6–13 % de la página, cifras del tablero), estructura (collage asimétrico contra grilla de rótulo y columna) y portador (Taller: seis espacios de foto, cinco con gente; Pizarra: dos bandas a sangre y la foto de Trabajo). Pizarra no es «Taller con menos cosas», pero cae en lo genérico (defecto 5) |
| Texto visible igual al de `dist/v3` | Cumple en palabras. No cumple en orden ni en el hero (defecto 4); falta el control «Cookies» |
| Cinta con `prefers-reduced-motion` y pausa | Cumple |
| Pauta con texto, proporción y prohibiciones; `generar.mjs` sin imprimir la clave, con falla clara y sin gastar sin tope | Cumple, salvo los F<n> y las proporciones (defectos 1 y 2) |
| Javiera aprueba | No, ronda 1 |
| `git diff` sobre `spindlelab-astro/` vacío | Cumple (desde `7ac6534` hasta `HEAD`, vacío; solo corrí `npm run build`, que escribe en `dist/`, ignorado) |

### Detector anti-slop (antislop-web §E + refero)

```
COPY        ✓ sin verbos de folleto  ✓ sin relleno de apertura  ✓ sin tricolon  ✓ sin «no solo X sino Y»
            ✓ sin pregunta retórica  ✓ sin Title Case  ✓ tú en todo el tablero  ✓ 0 rayas
            ✓ cero prueba social      ✓ borrar 30 % no mejora (el tablero es corto)
            · el copy de las páginas es el de E8, no se reauditó; el del tablero, sí (defecto 9c y 9d)
ESTRUCTURA  ✗ servicios de Pizarra: cuatro filas iguales (defecto 5, B1)
            ✓ los tres planes de Acompañamiento en tres columnas: son tres planes reales
            ✓ sin «¿por qué elegirnos?»  ✓ FAQ de E8  ✓ «36 → 73 → 100» con su fuente (E8)
            ✓ formulario de un campo  ✓ hero no es 100vh centrado
            ✗ orden del hero contra la decisión de Ramón (defecto 4)
CÓDIGO      ✓ 1 main, 1 h1 por página, jerarquía sin saltos  ✓ valores del lock, no por defecto
            ✓ sin degradé ni glass (la mancha tiene rol y referencia)  ✓ 0 emoji (flechas de fuente)
            ✓ alt reales; garabatos alt=""  ✗ garabatos sin width/height (defecto 11)
            ✓ foco 2 px a 4 px en todo el recorrido de Tab; papel sobre ciruela en el pie
            ✓ contraste AA en 1.502 nodos  ✓ label del campo  ✓ hero eager/high
            · JSON-LD, canonical y OG heredados de dist; prototipos con noindex. Índice, sitemap y ?v=N: no aplican (no se publica)
VISUAL      ✓ acento no índigo: el ciruela es tinta casi negra y la lavanda (277°) vive solo en el óvalo del pie;
              la paleta la pidió Ramón y su rol está escrito (lock §10)
            ✓ sin tarjetas  ✓ sin franja lateral  ✓ modo claro  ✓ sin serif editorial ni tierra
            · palabra resaltada: es pedido de Ramón y tiene regla; dos usos fuera de la regla (defecto 8)
            ✗ rasgo fuerte suavizado en Pizarra (tell #7, defecto 5)
            ✓ roles de token: amarillo, lima, lavanda y naranja en su rol medido
            ✓ espacios de foto honestos: proporción exacta, rótulo y dirección de arte (tell #9)
            ✓ MAYÚSCULAS con interletra
```

Nota de método para la spec: con suavizado de texto subpíxel (LCD), el ciruela sobre la banda
amarilla deja bordes de color que el criterio del oro cuenta (hasta 6.668 px por pantalla en Taller
Acompañamiento). No es oro de diseño: se mide con `--disable-lcd-text`, como hizo Lucía. Hay que
escribirlo en la spec, o la próxima medición dará un falso «segundo oro».

### Pruebas de fuego

- **Logo tapado.** Taller: primera pantalla inconfundible, pero se la atribuiría a The Ready antes
  que a SpindleLab (defecto 6). Pizarra: el hero con el marcador sostiene; la segunda y la tercera
  pantalla podrían ser de cualquier consultora.
- **Rubro cambiado.** Pizarra, de los servicios para abajo, calza con cualquier empresa de servicios.
  Taller calza con cualquier agencia «con juego», pero el chequeo arriba y la obra real lo anclan.
- **Leído en voz alta.** «Estás pagando para que lleguen a tu sitio. Ahí se corta el circuito.»
  Suena a persona (texto de E8, intacto).

### Lo que está bien (no perderlo en la corrección)

1. **El lock está medido de verdad.** Los tres valores sorteados calzaron con el sitio en vivo; la
   cinta, el marcador, el oro y la letra sustituta tienen evidencia y licencia. Es la mejor base de
   referencia que ha tenido la obra.
2. **La cinta y el marcador son propios y pasan donde The Ready no pasa:** velocidad por tiempo,
   pausa con teclado, quieta con movimiento reducido, `aria-hidden` y fuera del h1. El marcador es una
   forma de plumón propia, no el trazo recto de ellos. Además, contraste, oro y desborde están limpios
   en las 12 vistas.
3. **Taller tiene la energía que pidió Ramón**, y con techos medidos y cumplidos (4 marcadores, 1
   banda, 1 garabato, 1 mancha por página).
4. **`generar.mjs` es un buen guardián:** sin tope no toca la red, sin clave falla con instrucciones,
   la clave no aparece en ninguna salida (probado con claves falsas y con un error que la repetía),
   valida la imagen y mide el oro con el mismo cálculo de PIL. La pauta trae reglas claras contra la
   «pastoral gringa», el oro y las personas como equipo o clientes.

### Evidencia

- `e10/qa-paso-2/ronda-1/capturas/`: heroes de `dist` y de las dos direcciones a 1440 y 390, el
  ovillo de The Ready junto a los garabatos propios, tramos de Taller y de Pizarra.
- `e10/qa-paso-2/ronda-1/herramientas/`: `vivo.mjs` y `vivo2.mjs` (lock en vivo), `texto.mjs` y
  `orden.mjs` (texto y orden), `cap.mjs` y `capg.mjs` (capturas, desborde, 404, fotos viejas),
  `oro-por-vista.py`, `contraste.mjs`, `cinta.mjs`, `techos.mjs`, `tipos.mjs`, `foco.mjs`, `hero.mjs`,
  `tablero.mjs`, y `sinred.mjs` y `api.mjs` (precargados para probar `generar.mjs` sin red). Esperan
  `proto/` en 127.0.0.1:8780, `dist/` en 8781 y el tablero en 8782, y escriben en la carpeta donde se
  corren.
