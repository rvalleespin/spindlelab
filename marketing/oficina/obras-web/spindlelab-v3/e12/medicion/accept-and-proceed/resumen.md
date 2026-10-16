# Accept & Proceed, medido

**16-oct-2026 · Lucía (dirección de arte) · obra E12.** Medido en Chromium 141 headless (Playwright 1.63) a
1440 (dpr 1) y 390 (dpr 2), con `getComputedStyle`, el DOM, la hoja de Webflow, `getAnimations()` y capturas.
Páginas: [home](https://acceptandproceed.com/), [Work](https://acceptandproceed.com/work),
[un caso: IBM watsonx Orchestrate](https://acceptandproceed.com/work/ibm-watsonx-orchestrate) (el caso B2B de IA;
los 20 casos usan la misma plantilla) y [About](https://acceptandproceed.com/about). Todo valor, con su página,
ancho y selector, está en `medicion.json`; los scripts, en `herramientas/`.
**Límite:** los videos (Vimeo, H.264) no corren en este Chromium; las capturas muestran el póster que pone el
sitio. El del hero de la home es blanco: `capturas/home-hero-fotograma-vimeo.jpg` es la miniatura oficial.

## La tesis, en una línea

**Un archivo de trabajo, no un manifiesto: la imagen a sangre es lo grande, la letra es una sola, chica y negra
o gris, la retícula de 8 columnas deja columnas vacías a propósito, y el movimiento es una sola respiración
(esqueleto gris, después el contenido sube 2vmin en 1,5 s) igual en todas las páginas.**

## Lo medido que importa

**1 · Tipografía.** Messina Sans (Luzi Type, comercial, licencia por dominio) en **un solo peso, 400**; el 700
sale 4 veces, escondido en el texto plegado del caso. Escala a 1440: **35 · 24 · 20 · 17 · 14 · 10 · 7,5 px**.
Tracking −0,01 em, caja de oración en el 100 % de los nodos, **cero mono, cero serif, cero display**: el h1 de
página mide 35 px (35/48) y la home no tiene h1. La jerarquía la hacen el **color dentro de la misma línea**
(«Work» negro + «We expand what is possible…» gris, 35/42) y la **columna 5** donde arranca todo título.
A 390 casi no cambia: h1 35, bajada 24/32, tarjeta 17/24, etiqueta 10. La única letra grande es el reloj:
Letterform Variations (Nigel Cottier, variable, wdth 130) a 33,67 px en el pie y 180 px en el salvapantallas.

**2 · Color.** Papel `#f9f7f3`, negro `#000`, gris `#8c8c8c` al 80 % (bajadas, etiquetas), `#ecebe7` (pie,
botones, pastilla activa, bloques de carga), blanco solo en la banda del podcast. About va en oscuro
(`#151515` 66 %, `#262626` 19 %). **Ningún acento**: cero elementos de interfaz con color saturado; el color
saturado (6 a 12 % de la página) está todo en las imágenes. Contraste: negro sobre papel 19,6:1; **el gris da
2,40:1** (falla AA aun a 35 px) y el blanco sobre el póster claro de la tarjeta grande, 1,25:1.

**3 · Retícula.** 1440: **8 columnas de 148, gutter 24, margen 44** (1352 útiles); 390: 6 de 46, gutter 16,
margen 16; desde 1920, 12 columnas. Títulos y navegación en el eje de la columna 5; las columnas 1-4 de arriba,
vacías. El **índice no es bento ni lista**: pares de tarjetas con columnas vacías entre ellas, patrón de tres
filas que se repite (`[1-2 | 5-8]`, `[1-4 | 6-8]`, `[1-3 | 4-7]`), **149 px entre filas**, imágenes 16:9 o 3:2,
radio 8, sin borde ni sombra, pie con título negro + bajada gris del mismo tamaño. El caso: hero a sangre 3:2
(otra imagen, vertical, a 390), intro en la columna 5, 13 bloques en 12 filas de anchos 8, 6, 5, 4+2 o a sangre,
128 px entre filas, sin pies de foto, más una vista en grilla de 3. **Filetes de 1 px: solo en las etiquetas y en
una tabla de episodios.** Ninguna caja con borde.

**4 · Interacción.** Cursor del sistema oculto (≥ 992 px). **Cursor propio**: círculo de 16 px gris al 20 % con
blur de 5 px; sobre un proyecto se vuelve **pastilla de 139×40 con «View Project»** (Messina 17 blanco); sobre
enlaces y botones se apaga y manda el hover del elemento. Sigue al mouse por IX2 (90 % del salto en 80 ms, sin
inercia). Hover de tarjeta: la imagen escala 1,03 en .3 s; botón: `invert(1)` en .2 s; nav ≥ 1440: pastilla
`#ecebe7` de radio 100. Menú hamburguesa **en todo ancho bajo 1440**. A los 60 s sin actividad, un salvapantallas
con la hora a 180 px sobre la página desenfocada.

**5 · Movimiento.** Webflow IX2 + **Lenis 1.1.8** (lerp 0,1: una muesca de rueda llega al 90 % en 389 ms). GSAP
3.10.4 está cargado solo en la home para un carrusel que ya no existe (lanza TypeError). Sin Framer, Barba ni
Three. Carga: cada bloque aparece primero como **rectángulo gris con su radio real** y a los 600 ms el contenido
entra con opacidad y 2vmin de subida en **1,5 s `cubic-bezier(0, .56, .46, 1)`** (1,35 s y 1,2 s con 150 y
300 ms de retardo en dos variantes); al hacer clic se apaga hacia arriba en .5 s y navega a los 400 ms.
**`prefers-reduced-motion`: cero reglas; medido igual con `reduce`.**

**6 · Contenido.** Titulares textuales: «We expand what is possible for brands and turn their ambition into
action.» · «We're a team of designers, strategists, system-thinkers.» · «Our work shapes what brands do, not just
what they say.» · «We work with brave brands.» · «Building rules for the brand that broke them». Bajadas de
proyecto de 6 a 15 palabras, las 20 abren con gerundio; primera persona plural, abstracto, cero cifras en
titulares, llamados de navegación («View Project», «Read More»). El caso pliega todo el texto (Context /
Approach / Design / Impact, 315 palabras) detrás de «Read More». **«Metric» está vacío en los 20 casos**;
«Outcome» trae palabras sueltas en 11 y «Press» en 5. Las únicas cifras del caso medido son de alcance, en
prosa («thousands of visitors», «7 touring versions», «10+ global conferences»). Telemetría: solo el reloj.

## Lo que lo hace verse así y no como plantilla

1. **El trabajo es lo grande y la letra es chica.** Un peso, 35 px de tope, sin mayúsculas: la imagen ocupa el
   25 % del índice y el 52 % del caso, y la home abre con 810 px de video sin una sola frase.
2. **Asimetría con aire medido, no cajas.** Pares que dejan columnas vacías, 149 px entre filas, todo título en
   la columna 5: el orden lo da la retícula, no las líneas.
3. **La carga es diseño.** El esqueleto gris con los radios reales y la subida de 2vmin en 1,5 s con curva propia,
   igual en cada página, hacen que el sitio respire como una sola pieza.
4. **Detalles de taller sin color.** Cursor de vidrio que se vuelve «View Project», un reloj en una letra hecha
   para ellos que se vuelve salvapantallas, y cero acento en la interfaz.

## Contra el brief de Ramón (lo medido, no lo opinado)

| El brief pide | Accept & Proceed hace |
|---|---|
| Titular monumental pegado a los márgenes | Máximo 35 px; la home sin h1; lo monumental es la imagen |
| Bento con bordes de 1 px | Cero cajas con borde; 1 px solo en etiquetas y en una tabla |
| Mono para telemetría, «[ LAB_STATUS ]» | Cero mono; la única telemetría es un reloj con letra propia |
| Cursor magnético de acento azul con texto | Cursor gris translúcido, sin color; sí dice «View Project» |
| Resortes de Framer Motion | Curvas CSS propias + Lenis; GSAP cargado y muerto |
| Casos con métrica C-Level | «Metric» vacío en 20 de 20; cifras de alcance en prosa plegada |

**Lo que no se copia (defectos medidos):** el gris a 2,40:1, el blanco sobre foto clara, `prefers-reduced-motion`
ignorado, la home sin h1, el legal a 7,5 px, los errores de consola en cada página, la hamburguesa hasta 1439 px
y las erratas («Discussin», la bajada de AWO cortada, una sección repetida en About, enlaces a `#`).

## Archivos

`medicion.json` (resumen por tema y, en `crudo`, cada nodo medido por página y ancho) · `capturas/`: páginas
completas en tramos de ≤ 4000 px y primera pantalla de las cuatro páginas a 1440 y 390; cursor, tarjeta con
hover, cabecera y botón en reposo y hover, etiquetas, índice (`indice-patron-1440.jpg`), escala tipográfica
recortada de la página real (`tipografia-escala-1440.jpg`), títulos, tabla con filetes, pie claro y oscuro,
reloj, salvapantallas, menú a 390, secuencia de carga y aparición (normal y con movimiento reducido), texto del
caso abierto y vista en grilla · `herramientas/`: `medir.mjs`, `interaccion.mjs`, `movimiento.mjs`,
`contenido.mjs`, `librerias.mjs`, `explorar.mjs`, `reconocer.mjs`, `volcar-fuentes.mjs`, `partir.py`,
`agrupar.py`, `area-color.py`, `contraste.py`, `leer-fuente.py`, `transiciones-hoja.py`, `recortes.py`,
`tira.py`, `oembed.sh` y `armar-medicion.py`. Las capturas son para estudio interno: nada de sus letras,
imágenes, video ni código va al sitio.
