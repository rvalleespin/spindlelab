# E14 · Comparación del prototipo de home con Koto

**2-nov-2026 · Javiera (QA crítica), en contexto limpio.** Revisé `prototipo/index.html` (commit `fbdbc4e2`, rama
`claude/magical-franklin-ckfki2`) servido en local desde la raíz del repo, con Chromium 1243 y Playwright, a
1440 × 900 y 390 × 844 (táctil). Bajé la página entera con la rueda y después pantalla por pantalla, y midiendo la
sección Trabajo en 9 posiciones. Contra: los cuadros del video de Ramón (`video-ref/hoja.jpg`) y
`medicion-koto-scroll.md`. No volví a medir Koto: sus cifras salen de ese documento.

Evidencia en `qa-javiera/`: `hoja-pantallas-1440.jpg` y `hoja-pantallas-390.jpg` (una captura por pantalla, de la
portada al pie), `hoja-trabajo-1440.jpg` y `hoja-trabajo-390.jpg` (Trabajo en 9 posiciones de scroll), `datos.json`
(números crudos) y los dos scripts que los producen.

**Veredicto para esta pasada: el prototipo resuelve lo que Ramón pidió en lo medible (texto a menos de la mitad,
un medio por sección, movimiento al bajar), pero no se puede mostrar como “la home nueva” sin decir que 4 de los 9
medios son huecos y sin corregir el punto 5.1.** No es un acta de entrega: es un prototipo y no audité señales,
JSON-LD ni contraste.

---

## 1 · ¿Se resolvió la «sábana de texto»?

**En su mayor parte sí.** Palabras del texto de la página (`contar-palabras.py`, sin los rótulos de los huecos):
**586, contra 1421 de la home publicada (−59 %)**. Sin la pieza 3c, que no está en el prototipo: 567.

| | spindlelab.cl hoy | Prototipo E14 | Koto |
|---|---|---|---|
| Palabras | 1421 | **586** | ~260 a 300 leídas en el recorrido |
| Alto a 1440 | 7531 px (8,4 pantallas) | **6637 px (7,4)** | 6136 px (6,8) |
| Alto a 390 | 9064 px (10,7) | **7209 px (8,5)** | 4983 px (5,9) |
| Palabras por pantalla a 1440 | ~170 | **~79** | ~40 |
| Secciones sin ningún medio | 6 de 9 | **0 de 6** | 0 de 4 |

Por sección, a 1440 (alto · palabras del texto · área ocupada por medios):

| Sección | Alto | Palabras | Medios |
|---|---|---|---|
| Portada + la línea | 1736 | 138 (101 + 37) | video del hilo, a pantalla completa |
| Trabajo | 1834 | 95 (35 + 60) | 3 tarjetas 877 × 493: video de Combeau, book de Combeau, Verifica y Cumple (66 % del área) |
| Sitio web a medida | 510 | 48 | hueco «material real · pendiente» |
| Búsqueda y visibilidad en IA | 537 | 65 | captura real del chequeo (57 %) |
| Fila de tres (anuncios, mensual, cómo partimos) | 559 | **125** (227 con los rótulos de los huecos) | 3 huecos «imagen con IA · por generar» |
| Contacto | 772 | 90 | foto de Ramón (16 %) |

**Lo que queda de sábana:** la fila de tres es el bloque más denso de la página (125 palabras en 559 px a 1440; a
390 se estira a **2053 px**, dos pantallas y media seguidas de texto bajo tres huecos). Y la página sigue con el
doble de palabras por pantalla que Koto.

## 2 · ¿Cada sección tiene imagen?

**Cada sección tiene su lugar de imagen; hoy solo 4 de 6 muestran una real.** De 9 medios, 5 son reales (video del
hilo, video y book de Combeau, Verifica y Cumple, chequeo de spindlelab.cl, foto de Ramón: son 6 archivos, porque
Combeau tiene dos tarjetas) y **4 son huecos marcados**: el panel de Combeau (autorizado, sin capturas) y las tres
imágenes con IA de la fila de tres. Los huecos están bien marcados (rótulo, concepto, nota) y ninguno finge ser una
imagen. Pero «Sitio web a medida» y la fila de tres **hoy no tienen ninguna imagen real**: Ramón va a ver
rectángulos rayados donde pidió imágenes (`hoja-pantallas-1440.jpg`, cuadros 5 y 7).

Ojo con la captura del chequeo: es real y útil, pero es una pantalla de interfaz con una lista. Funciona como
evidencia, no como la imagen que «acompaña» la sección.

## 3 · ¿El trabajo se apila al bajar como en Koto?

**Hace lo que Koto hace de verdad, que no es apilarse.** La medición de Lucía (§0) y los cuadros del video de Ramón
coinciden: en Koto ninguna tarjeta crece ni se apila; el panel izquierdo queda fijo, la tarjeta activa al 100 % y el
resto al 20 %, y el contenido del video cambia dentro de cada marco. En el prototipo, a 1440 (`hoja-trabajo-1440.jpg`,
`datos.json → 1440.trabajo`):

- Las tres tarjetas miden **877 × 493 en todas las posiciones**, `transform: none` (Koto 868 × 488: la diferencia es
  la barra de scroll de la medición de Koto). No escalan ni se apilan, igual que Koto.
- El panel queda **pegado arriba** (`top` 0) entre los scroll ~1764 y ~2771 y aparece con opacidad 0 → 0,66 → 1
  mientras sube la primera tarjeta, como Koto §3.2.
- Opacidades medidas pantalla por pantalla: `1 · 0,2 · 0,2` mientras manda Combeau y `0,2 · 0,2 · 1` desde que la
  tarjeta de Verifica cruza la mitad de la pantalla. El nombre cambia de «Bernardo Combeau» a «Verifica y Cumple»
  entre los scroll 2267 y 2519.
- A 390 es una lista sin apagar nada (todas al 100 %), como Koto §3.4.
- Con `prefers-reduced-motion: reduce`: no se pone `html.mov`, todo al 100 %, sin desplazamientos, y los dos videos
  quedan en pausa. Koto no tiene esto.

**Lo que no se parece:** en Koto pasan **cinco** casos y el nombre cambia cuatro veces, y en cada tarjeta corre un
video con cortes. Aquí son **dos** casos en tres tarjetas, el nombre cambia **una** vez, y solo la primera tarjeta es
video. El mecanismo está, pero se ve poco: 1834 px contra los 2658 de Koto. Si Ramón esperaba que «se apilen y
crezcan», hay que mostrarle el cuadro de su propio video donde no pasa, o no va a reconocer lo que pidió.

## 4 · Lo que sigue lejos de Koto (5 puntos)

1. **La portada habla mucho.** Koto: un título que se apaga y una frase. Aquí: rótulo, h1, una entradilla de 35
   palabras, el botón, una nota de 28 palabras bajo el botón y la línea de 37 palabras. Son **138 palabras antes
   del primer trabajo**, casi la mitad de lo que Koto dice en toda la página.
2. **Trabajo es corto y quieto** (punto 3): dos casos y un solo video. La sensación de desfile de Koto viene del
   número de casos y del video dentro de cada marco, y eso no está.
3. **La fila de tres no es como las noticias de Koto.** Las noticias de Koto son foto + título + etiqueta + fecha
   (unas 15 palabras cada una). Aquí cada columna lleva título en dos tintas, párrafo, precio y uno o dos enlaces
   (~40 palabras). Es una grilla de servicios con huecos encima, y a 390 son dos pantallas y media de texto.
4. **La mitad de las imágenes nuevas todavía no existe.** La impresión de «una imagen manda en cada pantalla»
   depende de las tres imágenes con IA y del panel de Combeau. Hoy, a 1440, de 9 pantallas, 2 son mayormente hueco
   rayado (`hoja-pantallas-1440.jpg`, cuadros 5 y 7).
5. **Densidad general:** ~79 palabras por pantalla contra ~40 de Koto, y a 390 la página mide 8,5 pantallas contra
   5,9. El salto contra la home actual es grande, pero «depurado como Koto» exige otro recorte, sobre todo en la
   portada y en la fila de tres.

## 5 · Lo decidido por Ramón: qué se perdió o cambió

Verifiqué en el HTML y en las capturas: el rótulo «Sitios web a medida y marketing con IA», el h1 «En redes
arriendas. Tu sitio es lo único que es tuyo.», «Hablemos de tu sitio» en amarillo en la portada (`#portada-cta`) y
«Hablemos» en el encabezado, la frase «muchas veces no en el anuncio, sino en el lugar al que el anuncio lleva»,
«Ramón Vallejos · Fundador», «Va en tu dominio, a tu nombre, y te entregamos el código completo.», los precios
($390.000, $400.000 una vez, $350.000/mes, $590.000/mes, todos + IVA, iguales a los de `e13/texto/`), el logo, la
paleta. Ninguna prueba social inventada; el 94/100 es la medición real de spindlelab.cl. Tuteo, sin rayas y sin Title
Case en lo que leí.

1. **Se perdió el aviso de la imagen con IA de Verifica y Cumple.** La convención E12
   (`e13/texto/convenciones-e12.json`) dice que **todo medio de Verifica y Cumple donde se vea la persona a caballo
   lleva el pie** «La persona a caballo de esta portada está generada con IA.». El texto de Clara
   (`texto-home-propuesta.md`, fila 3b) dice que con `verifica-y-cumple-53` el pie se borra, y el prototipo usa la
   `-53`. **Pero en la `-53` la jinete y el caballo se ven enteros** (abrí la imagen). Hay que devolver el pie o usar
   un recorte donde no se vea. Es el único cambio contra una regla decidida.
2. **El botón «Hablemos de tu sitio» del contacto va blanco, no amarillo.** No es una pérdida: `spec-visual.md` deja
   el amarillo solo en `#portada-cta` y `.cab__cta`, y el cierre usa el botón claro. Lucía lo declara (nota 3 del
   HTML). Lo anoto porque Ramón puede leerlo como «se perdió el amarillo»: si lo quiere amarillo, se cambia la spec
   primero.

Cambios declarados que Ramón debería ver, sin ser pérdidas: el h1 entra por renglones al cargar (Koto no lo hace), y
las imágenes de las dos bandas grandes se abren al entrar (Koto tampoco; lo pidió Ramón). La pieza spindlelab.cl (3c)
no está, como recomendó Clara.

## Lo que está bien (que no se pierda en la ronda siguiente)

- El mecanismo de Trabajo copia lo **medido**, no lo imaginado, y se apaga bien con movimiento reducido.
- La portada se recoge con `clip-path` atado al scroll y la línea sube renglón a renglón (`hoja-pantallas-1440.jpg`,
  cuadros 1 y 2).
- Los huecos se ven como huecos: nadie va a confundirlos con imágenes terminadas.
- Sin overflow horizontal a los dos anchos (`scrollWidth` = `clientWidth`: 1440/1440 y 390/390), un solo `h1`, y el
  foco con Tab es visible (contorno blanco de 2 px) en los primeros 8 elementos.
