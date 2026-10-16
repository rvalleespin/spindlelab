# Lock de referencia E12: Koto manda, Accept & Proceed acota (medido)

**16-oct-2026 · Lucía (dirección de arte) · obra E12, compuerta 1.** Reemplaza a `../e10/lock-the-ready.md` como
referencia del sitio v3 (E10 queda en pausa como historia, `e12/insumos-ramon-16oct.md` §6). **Manda**
`e12/insumos-ramon-16oct.md`: el brief que pegó Ramón, su segundo texto y sus cuatro respuestas. Respuesta 4:
**«Koto manda, el brief orienta»**: se mide koto.com y acceptandproceed.com, se mantiene la intención del brief y se
reemplaza lo que huela a plantilla, diciendo por qué. Encuadre: `e12/brief-de-obra.md` (Mauro). Datos reales:
`e12/inventario-casos.md` (Diego, con Simón): **una etiqueta o un número que no tenga fila ahí no existe.**

Nada se publica, `spindlelab-astro/` no se toca en este paso, ningún prospecto va con nombre y ninguna cifra va sin
fuente y fecha. Las capturas de Koto y de A&P son para estudio interno: ninguna de sus letras, imágenes, videos ni
código va al sitio.

> **Desde la compuerta 1 (16-oct, 19:20 a 19:45; `e12/brief-de-obra.md`, sección «Compuerta 1»).** La base es
> **negra**, como Koto. El color lo rige **§20 «Compuerta 1: negro con juegos de color»** y el caso, **§21 «El caso,
> como Koto»**, los dos medidos de nuevo el 16-oct (`medicion/koto/paso2/`). Lo que el paso 1 fijó para un lienzo
> claro (la paleta del brief en §5, el claro de §1, §3 y §4, el cobalto de §8, §13, §14 y §15) **pasa a historia**:
> la lista exacta está en §20.7. El resto del lock (letra, retícula, cursor, resortes, telemetría, sandboxes,
> techos, accesibilidad) sigue, con los valores de §20 donde nombra un color.

**De dónde sale cada valor.** Todo lo de Koto y de A&P está medido en el navegador por mí el 16-oct (Chromium 141,
Playwright 1.63, `getComputedStyle`, DOM, hojas, `getAnimations()`, capturas a 1440 y 390):
`e12/medicion/koto/` y `e12/medicion/accept-and-proceed/` (resumen, `medicion.json`, capturas, herramientas). Lo que
este lock agrega se midió hoy con herramientas que quedan en `../tableros/e12-laboratorio/herramientas/`:

| Herramienta | Qué mide | Salida |
|---|---|---|
| `letras.py` | 34 letras de display y 14 mono libres contra GT Kotoheim, letra por letra, con ancho y peso igualados | `datos/letras.json`, `img/letras-comparadas.jpg` |
| `contraste.py` | Contraste WCAG de cada par de uso de la paleta del brief, líneas compuestas, tono OKLCH del cobalto | `datos/contraste.json` |
| `resortes.mjs` | Los resortes propuestos, con el `spring()` de Motion 13.5.0, contra las curvas medidas en Koto y A&P | `datos/resortes.json` |
| `evidencia-next.sh` | Qué letra trae por defecto la plantilla de Next.js | `datos/create-next-app-layout.txt` |
| `atmosfera.mjs` | Degradados (cuántos, con qué color y tono), dibujos grandes en `canvas` o `svg` y vidrio en la home y el índice de Koto y de A&P a 1440 (segunda vuelta, 16-oct) | `datos/atmosfera.json` |

(`datos/` e `img/` cuelgan de `../tableros/e12-laboratorio/`.)

---

## 1 · La tesis

**Koto, en una línea:** *un lienzo casi negro donde la interfaz se retira (gris, chica, una sola letra de la casa en
tres cortes, sin una negrita) y el único color es el del trabajo; lo único que está vivo en la interfaz es dato
verdadero (la hora, los conteos, la ficha del caso).*

**Lo que aporta Accept & Proceed:** la prueba de que esa misma retirada funciona **en papel claro**, que es lo que
pide el brief. A&P es un archivo de trabajo sobre `#f9f7f3`: una sola letra, chica y negra o gris; retícula de 8
columnas que deja columnas vacías a propósito; la imagen a sangre como lo grande; un cursor de vidrio que dice adónde
lleva; una sola respiración de carga igual en todas las páginas.

**Asignación de trabajos** (`web-direccion-arte`, paso 2: una manda, las otras con trabajo acotado):

| Referente | Rol | Trabajo que se le asigna |
|---|---|---|
| **Koto** | **Dominante** | Sistema de letra (un corte condensado liviano para titulares, uno regular para el cuerpo, una mono para datos), las dos tintas en una frase, la retícula de 16 px de margen y 8 de separación, el índice de trabajo, el caso con barra lateral y secciones, la etiqueta del cursor, la telemetría verdadera, los tiempos en cuadros con curva propia |
| **Accept & Proceed** | Secundaria acotada a **dos** cosas | (1) Cómo se comporta un lienzo **claro** cuando la interfaz se retira: papel, negro, gris, una placa apenas más oscura, cero acento. (2) **La carga como diseño**: cada medio espera en un marco del color de la placa con su radio real. Nada más de A&P entra |
| **El brief de Ramón** | Intención | Claro, tinta casi negra, una señal escasa en cobalto, mono para datos, cursor con círculo y texto, resortes, casos con método. Se toma la intención; la forma la fija lo medido (§4) |

> **Compuerta 1 (16-oct).** Ramón eligió el negro. El trabajo (1) de A&P, «el lienzo claro», pasa a historia; lo que le
> queda está en §20.7. El párrafo que sigue es el razonamiento del paso 1.

**Lo que no se promedia.** Koto es negro y el brief es claro: no sale un gris medio. Se elige el claro (lo pide el
brief y el detector, tell #3), y de Koto se preserva lo que no depende del negro: la retirada de la interfaz, la letra
liviana sin negritas, el color solo en el trabajo y el dato vivo. El cobalto del brief no se apaga a un azul
grisáceo (tell #7): entra puro y escaso, como entra el amarillo del logo en Koto.

---

## 2 · Lo medido que importa

### 2.1 · Tipografía

**Koto: GT Kotoheim** (Grilli Type, Noel Leu, 2015; variable en ancho 75 a 100, peso 100 a 1000, inclinación; la
mono en ancho 75 a 125). Licencia exclusiva de Koto: no se usa. Tres archivos: Condensed Light (300), la variable del
cuerpo y la Mono Medium.

| Rol | 1440 | 390 | Corte |
|---|---|---|---|
| Portada | 48 / 1,0 / −0,01em | 36 / 1,0 / 0 | Condensed Light 300 |
| Declaración y titular de sección | 38 / 1,1 / −0,01em | 26 / 1,2 | Condensed Light 300 |
| Titular de página y de caso | 24 / 1,2 | 23 / 1,2 | Condensed Light 300 |
| Siguiente caso (pie del caso) | 32 / 1,15 | 23 / 1,2 | Condensed Light 300 |
| Cuerpo, gris | 16 / 1,25 · 56 a 66 caracteres por línea (caja de 493 px) | 15 / 1,25 · 43 a 51 | Regular 350 |
| Cuerpo chico | 14 / 1,25 | 13 / 1,25 | Regular 350 |
| Rótulo mono, MAYÚSCULAS, sin interletra | 11 / 1,0 | 11 / 1,0 | Mono |
| Micro mono | 9 / 1,0 / −0,02em | igual | Mono |
| Dato mono en caja normal (cargos, direcciones, fechas) | 12 / 1,2 | igual | Mono |

**Nada en negrita** (300 y 350 en todo el sitio) y nada en mayúsculas salvo la mono. La jerarquía la hacen **el
corte y la tinta**, no el peso. Captura: `medicion/koto/capturas/detalle-tipo-display-portada-1440.jpg`,
`detalle-tipo-declaracion-1440.jpg`, `detalle-tipo-seccion-de-caso-1440.jpg`.

**A&P: Messina Sans** (Luzi Type, comercial) en un solo peso, 400. Escala a 1440: 35 · 24 · 20 · 17 · 14 · 10 · 7,5
px; caja de oración en el 100 % de los nodos; **cero mono, cero serif, cero display**; el h1 de página mide 35 px y la
home no tiene h1. `medicion/accept-and-proceed/capturas/tipografia-escala-1440.jpg`.

**Lo que dicen los dos juntos:** ninguno es monumental, ninguno usa negrita para jerarquizar, ninguno usa una letra
geométrica ancha. Lo grande es el trabajo.

### 2.2 · Color

| Koto | Dónde y cuánto | Contraste sobre `#060606` |
|---|---|---|
| `#060606` lienzo | 85 a 96 % de los píxeles fuera de fotos y videos | |
| `#141414` placa | Encabezado plegado, menú, widgets, y el marco que espera cada imagen | 1,10 |
| `#989898` corrido | 60 a 77 % de los caracteres de la home; 86 a 89 % en el caso | 7,02 |
| `#FFFFFF` nombrado | Lo que se nombra y lo activo; el nav va al 70 % y pasa a 100 % al pasar el mouse (167 ms, lineal) | 20,26 |
| `#595959` apagado | Los 148 nombres del equipo y el pie legal (454 nodos) | **2,89: no aprueba AA** |
| `#2D2D2D`, blanco al 10 % | Los pocos filetes | 1,47 y 1,23 |
| `#FFE800` | **Solo el logo**: 0 textos, 0 fondos | |

Las cajas de imagen y video cubren del 33 al 72 % de cada página: **el color lo pone el trabajo.**

| A&P | Rol |
|---|---|
| `#F9F7F3` papel · `#000` negro (19,63:1) | Lienzo y lo que se nombra |
| `#8C8C8C` al 80 % | Bajadas y etiquetas: **2,41:1, no aprueba** |
| `#ECEBE7` | Pie, botones, pastilla activa, bloques de carga (1,11:1 contra el papel) |
| Acento | **Ninguno.** El color saturado (6 a 12 % de la página) está todo en las imágenes |

### 2.3 · Retícula

- **Koto:** márgenes de **16 px** a los dos anchos; **16 columnas** de 79,6 px con **8 px** entre ellas a 1440 (8
  columnas a 390); **sin ancho máximo**, de borde a borde. Cortes en 834 y 1194 px. El caso: **barra lateral pegajosa
  de 320 px** y una columna de 1057 px en 12 columnas, con rótulo mono a la izquierda y titular de 24 px y cuerpo de
  493 px a la derecha. Medios con **radio 6 px**; en el caso, proporciones 16:9 (12 veces), 4:5 (7), 1,62 (6), 1,48 (5), 1:1 (2).
  `medicion/koto/capturas/caso-1440-primera.jpg`.
- **A&P:** 8 columnas de 148, separación 24, margen 44 a 1440; 6 de 46, separación 16, margen 16 a 390. Títulos en el
  eje de la columna 5 con las columnas 1 a 4 vacías.

### 2.4 · Índice de trabajo

- **Koto (`/work`):** a la izquierda, la barra lateral (título y bajada gris, filtros, un destacado); a la derecha, un
  **muro de dos columnas de 524,5 px** con 8 px entre piezas y **tres alturas**: 15 piezas en 4:5, 9 en 4:3 y 11 en
  5:3. **Sin bordes ni cajas de datos.** A 390, una columna con título y bajada siempre a la vista. El filtro es una
  capa de vidrio con seis áreas y su conteo («Digital experiences 09»). `trabajo-1440-primera.jpg`,
  `detalle-indice-1440.jpg`, `detalle-filtro-1440.jpg`.
- **A&P (`/work`):** pares de tarjetas con columnas vacías entre ellas, patrón de tres filas que se repite
  (`[1-2 | 5-8]`, `[1-4 | 6-8]`, `[1-3 | 4-7]`), 149 px entre filas, imágenes 16:9 o 3:2 de radio 8, sin borde ni
  sombra. Los filetes de 1 px están **solo en las etiquetas** y en una tabla de episodios.
  `indice-patron-1440.jpg`, `lista-eva-filetes-1440.jpg`.

### 2.5 · Cursor

| | Koto | A&P |
|---|---|---|
| Dónde | Solo sobre el showreel («PLAY») y sobre los destacados de la home («↗ VIEW CASE»). En el índice, el puntero de siempre | Cursor del sistema oculto desde 992 px; círculo propio en toda la página |
| Forma | Etiqueta de vidrio: negro al 20 %, desenfoque de 40 px, radio 2 px, padding 6, Mono 11 MAYÚSCULAS blanca | Círculo de 16 px gris al 20 % con desenfoque de 5 px; sobre un proyecto, **pastilla de 139×40 «View Project»** (Messina 17 blanca) |
| Color | Ninguno | Ninguno |
| Seguimiento | **Sin retardo**: en el primer cuadro ya está en la posición nueva | Con un salto de 800 px: **50 % en 24 ms, 90 % en 75 ms, 99 % en 124 ms**, sin inercia (el resumen lo redondea a 80) |
| Sobre enlaces y botones | No aparece | Se apaga y manda el hover del elemento |

`medicion/koto/capturas/detalle-destacado-hover-1440.jpg`, `detalle-cursor-showreel-1440.jpg`;
`medicion/accept-and-proceed/capturas/tarjeta-hover-con-cursor-1440.jpg`, `cursor-sobre-proyecto-detalle-1440.jpg`.

### 2.6 · Hovers

- **Koto, pieza del índice:** la imagen se **acorta 24 px** (167 ms, lineal) y aparece debajo «Instagram · A new mark
  with old memories» (opacidad, 167 ms, tras 167). Sin zoom, sin color. **Destacado:** velo negro al 70 % y la
  etiqueta del cursor. **Navegación:** del 70 al 100 % de blanco, 167 ms lineal. `detalle-indice-pieza-reposo-1440.jpg`
  y `-hover-1440.jpg`.
- **A&P:** imagen a escala 1,03 en 0,3 s; botón con `invert(1)` en 0,2 s; pastilla `#ecebe7` en el nav.

### 2.7 · Movimiento

- **Koto:** GSAP 3.13 (ScrollTrigger, SplitText, CustomEase, Draggable) sobre Next.js y Tailwind v4. **Scroll nativo**
  (una vuelta de rueda de 100 px mueve la página de un salto). Lo que entra va **atado a la posición del scroll**, no
  al tiempo, y se deshace al volver. Duraciones en cuadros enteros a 60 Hz (83, 133, 167, 283, 333, 417, 650, 750 ms)
  con curvas propias y asimétricas: entrar `(0,0,0,1)` o `(.15,0,.15,1)`, salir `(.75,0,.85,1)`. Entrada de bloque:
  `feed-in-transform .5s cubic-bezier(0,0,0,1)` de 3,125rem a 0. **Ninguna curva pasa de 1: cero rebote.**
  **`prefers-reduced-motion`: ignorado** (0 reglas; con «reduce» todo se mueve igual).
- **A&P:** Webflow IX2 + Lenis 1.1.8 (lerp 0,1). Carga: cada bloque aparece como **rectángulo gris con su radio
  real** y a los 600 ms el contenido sube 2vmin con opacidad en **1,5 s `cubic-bezier(0,.56,.46,1)`**.
  **`prefers-reduced-motion`: ignorado.** `carga-secuencia-normal.jpg` y `-reducido.jpg`.

### 2.8 · Cómo escriben

- **Koto:** un rótulo de dos palabras y una continuación de 6 a 13 («We’re Koto / The Creative Company», «Our work /
  Ambitious ideas for ambitious businesses»). Tono llano y seguro, sin jerga técnica. **Dos tintas en la misma
  frase:** la primera parte en blanco, la continuación en gris, mismo tamaño y misma línea (10 de 17 titulares).
  Corchetes: **tres**, y los tres son un enlace en mono a un índice: «STUDIO NEWS … [ VIEW ALL ]» y «NEXT UP
  [ VIEW ALL PROJECTS ]» en las páginas, y «LATEST NEWS [ ALL ]» en el panel del reloj
  (`medicion/koto/capturas/detalle-widgets-1440.jpg`; el texto del panel en `medicion.json` no lo trae, la captura
  sí). Ninguno rodea un estado ni una etiqueta. Conteos entre paréntesis: «LOCATIONS (5)», «(148)».
- **A&P:** bajadas de 6 a 15 palabras, las 20 abren con gerundio, primera persona plural, abstractas, cero cifras en
  titulares, llamados de navegación («View Project», «Read More»).

### 2.9 · Cómo presentan casos

- **Koto:** ficha lateral (título, bajada gris, ficha mono «SOCIAL MEDIA · 2026», índice de secciones con un punto en
  la activa), imagen grande, secciones con rótulo mono y titular de 4 a 6 palabras, galerías, cita del cliente con
  nombre y cargo, créditos y el siguiente caso. De 35 casos, 26 siguen la misma ficha (Challenge / Strategy /
  Identity / Application / Outcome); el medido sigue **Challenge / The Impossible Brief / The Process / Solution**.
  **0 dan un porcentaje y 0 un multiplicador**; uno solo (MachineX) da un resultado medido después del lanzamiento.
  `caso-1440-primera.jpg`, `detalle-tipo-ficha-lateral-caso-1440.jpg`.
- **A&P:** el texto del caso (Context / Approach / Design / Impact, 315 palabras) va plegado tras «Read More».
  **«Metric» está vacío en los 20 casos.**

---

## 3 · Qué se toma, qué no y con qué se reemplaza

| De Koto | ¿Se toma? | Cómo, y por qué |
|---|---|---|
| Lienzo `#060606`, interfaz en gris | **No el negro; sí la retirada** | El brief pide claro y el detector lo respalda (tell #3). Se toma la relación: papel, una placa apenas más oscura (Koto 1,10:1; aquí 1,07:1), gris para lo corrido, tinta para lo nombrado (§5) |
| GT Kotoheim | **No: licencia exclusiva.** Se toma su carácter medido | Mona Sans en dos cortes (condensado liviano y regular) y DM Mono (§6) |
| Sin negritas: la jerarquía por corte y tinta | **Sí** | Pesos 340 y 390. Cero 700 en todo el sitio |
| Dos tintas en una frase | **Sí, con un trabajo propio** | Es la forma de explicar sin dar por sabido (lo que E11 encontró roto): la parte en tinta nombra, la continuación en gris dice qué le hace al cliente. Máximo una por sección |
| La escala (48 / 38 / 24) | **Sí en la dirección A; es el eje de diferencia en la B** (§16) | El brief pide monumental; Koto mide 48 de tope. Lo decide Ramón en la compuerta 2, viendo las dos |
| Márgenes 16, separación 8, sin ancho máximo, cortes 834 y 1194 | **Sí** | Medido a 1440 y 390; lo que pasa entre 834 y 1193 se mide en la spec de la dirección elegida |
| Índice: muro de dos columnas con tres proporciones, sin bordes | **Sí** (§7) | Reemplaza al bento del brief |
| Caso: barra lateral de 320, índice de secciones con punto en la activa, rótulo mono a la izquierda | **Sí** (§13) | El punto activo es uno de los tres lugares del cobalto |
| Etiqueta del cursor | **La idea sí; la forma es la del brief** (§8) | Círculo cobalto con texto mono; aparece solo sobre piezas de trabajo, como en Koto |
| Pieza del índice que se acorta 24 px y deja ver su bajada | **Sí, con resorte** (§9) | Es el hover más propio de Koto: sin zoom, sin color |
| Velo negro al 70 % sobre el destacado | **No** | En claro sería un velo blanco sobre el trabajo: le quita al trabajo el único color de la página |
| Encabezado que se pliega en una placa de 48 px | **Sí, en `--placa`** | Es una placa con un rol (encabezado plegado), no una tarjeta |
| Reloj con huso, conteos entre paréntesis, ficha del caso | **Sí: telemetría verdadera** (§11) | Los tres se recalculan o se cuentan. Nada de coordenadas de adorno |
| «[ VIEW ALL ]» | **Sí, solo así** (§14) | Corchetes únicamente alrededor de un enlace mono a un índice, uno por página. Nunca alrededor de un estado o una etiqueta |
| Tiempos en cuadros con curva propia, cero rebote | **El tiempo y el cero rebote sí; la curva pasa a resorte** (§9) | Resortes calibrados contra sus duraciones, con ζ ≥ 1 |
| Entradas atadas a la posición del scroll que se deshacen al volver | **No** | Texto que se mueve con la rueda se lee peor, y al volver el contenido se esconde de nuevo. Aquí, una entrada por tiempo, una vez |
| SplitText: líneas que suben escalonadas | **No** | Parte las palabras para el lector de pantalla si se hace mal, y el castellano tiene palabras largas. Cero animación por línea |
| `prefers-reduced-motion` ignorado | **No** | Defecto medido (§15) |
| `#595959` a 2,89:1 | **No** | No hay un tercer gris |
| Micro mono de 9 px | **No** | Piso de 11 px para todo texto |
| Velo de vidrio con desenfoque de 40 px | **No** | Sobre papel claro el vidrio no se lee; y es el fondo de la IA genérica si no tiene rol (antislop C3) |

| De Accept & Proceed | ¿Se toma? | Cómo |
|---|---|---|
| Papel claro, una placa apenas más oscura, cero acento en la interfaz | **Sí, como prueba** | Confirma que la retirada de Koto funciona en claro. Los valores son los del brief, no los de A&P |
| Carga: marco del color de la placa con el radio real | **Sí** | Cada medio espera en `--placa` con radio 6. Sin brillo que corre ni esqueleto animado |
| Cursor que dice adónde lleva («View Project») | **La idea sí** | Aquí lo dice el círculo cobalto («Ver el caso»; el texto final es de Clara) |
| 90 % del salto del cursor en 75 ms | **Sí, como techo** | Calibra el resorte del cursor (§9). Koto va a 0 ms |
| Entrada de 1,5 s `(0,.56,.46,1)` y Lenis | **No** | Koto manda: su entrada llega al 90 % en 261 ms y la de A&P en 850. Scroll nativo, como Koto |
| Pares con columnas vacías, títulos en la columna 5 | **Solo en la dirección B** (§16) | Es la asimetría de A&P; la dirección A usa el muro de Koto |
| Tabla con filetes de 1 px | **Solo en la dirección B** | Su único uso de líneas fuera de las etiquetas, y el modelo del índice como lista |
| Etiquetas con filete de 1 px y pictograma bajo cada pieza (sus tres pilares) | **La medida sí, la forma no** (§4, §7) | Una o dos por pieza, como A&P; en la línea mono, sin caja ni icono |
| Gris `#8C8C8C` al 80 % (2,41:1), blanco sobre foto clara (1,25:1), legal a 7,5 px, home sin h1, menú hamburguesa hasta 1439 px | **No** | Defectos medidos |

---

## 4 · El brief de Ramón, punto por punto, contra lo medido

| El brief pide | Lo medido | Decisión | Por qué |
|---|---|---|---|
| «Light Mode Editorial» | Koto: negro. A&P: papel `#F9F7F3` | **Claro** | Lo pide el brief, A&P prueba que funciona y el detector lo respalda (tell #3). El negro, a lo más en un momento, solo si la spec lo justifica |
| Filosofía «Form & Intelligence» (alta costura visual frontend + arquitectura de software e IA propietaria) | Ninguno de los dos rotula su filosofía. Koto la dice en una frase llana y en dos tintas («Our values. Built on optimism. Driven by collaboration. Defined by craft.», `medicion/koto/resumen.md`, Contenido); A&P, en un titular («We're a team of designers, strategists, system-thinkers.», `medicion/accept-and-proceed/resumen.md` §6). Cero lemas en mono, cero conceptos entre comillas | **Se ajusta: queda como la estructura del sistema, no como lema** | Las dos mitades ya tienen forma en este lock y se pueden señalar: **la forma** es el trabajo plano en su marco y la letra en dos cortes (§5, §6); **la inteligencia**, la capa mono con datos que se recalculan (§11) y los sandboxes verdaderos (§12). Se juntan en Craft y Logic: la pieza al lado de lo que la prueba (§7). Como rótulo no va: es inglés en un sitio es-CL y un concepto que pide explicación (§14, rótulos). «IA propietaria» no va: el único proyecto con IA programada (Praxi) vive en otro repo y queda fuera salvo que Ramón diga que entra (inventario §8; brief de obra §4 y §8.5). Si Ramón la quiere escrita, es insumo de Clara |
| Atmósfera: «microinteracciones táctiles» y «cero clichés de IA genérica (sin redes neuronales dibujadas ni gradientes púrpura)» | **Microinteracciones.** Koto: pocas, y cada una responde a algo que hizo el visitante (la pieza del índice se acorta 24 px y deja ver su bajada; el nav pasa del 70 al 100 % en 167 ms; la etiqueta del cursor solo sobre el trabajo); ninguna rebota (§2.6, §2.7). A&P: imagen a 1,03 en 0,3 s, botón `invert(1)` en 0,2 s, cursor de vidrio. **Clichés,** medido el 16-oct en la home y el índice a 1440 (`atmosfera.mjs` → `datos/atmosfera.json`): Koto trae 13 y 12 degradados, **todos neutros** (croma 0: el velo que va de transparente a negro al 70 u 80 % en la mitad de abajo de los destacados, y los del aviso de cookies), 0 con color y 0 púrpura; A&P, 0 degradados. **Ningún `canvas` ni `svg` de más de 200 × 200 px en las cuatro páginas:** nada dibujado. El único color de interfaz de Koto es el amarillo del logo; A&P no tiene ninguno (§2.2) | **Se toma** | Táctil, aquí, es lo que se puede medir: tres familias de movimiento (cursor, estado, entrada) que responden a lo que hizo el visitante, con resortes que conservan la velocidad si se los interrumpe y ζ ≥ 1 (§9), dentro de los techos de §14. En el teléfono el toque es literal y no hay hover: lo que el hover revela queda a la vista (§8). Sin púrpura: el cobalto está a 264,2° en OKLCH, a 13° del `indigo-500` (§5), y es el único color de interfaz. Sin degradados de color, sin `canvas` decorativo, sin redes, nodos ni partículas: el color y la imagen los pone el trabajo real (§5). El velo neutro de Koto no se toma (§3) |
| Fondo `#F6F6F4` | A&P `#F9F7F3`, más cálido | **Se toma** | Casi neutro (croma OKLCH 0,003): no es el crema del tell #4 |
| Superficies `#EFEFEA` y `#FFFFFF` | Koto: una placa `#141414` a 1,10:1 | **Se toman con rol** | `#EFEFEA` es la placa de Koto en claro (1,07:1); `#FFFFFF` solo donde el visitante escribe o lee lo que devolvió una máquina (§5). Ninguna de las dos es una tarjeta |
| Texto `#111111` y `#666663` | Koto: blanco a 20,26 y gris a 7,02 | **Se toman** | El gris queda a 58 % del camino entre papel y tinta; el de Koto, a 64 %. Aprueba AA en las tres superficies (§5) |
| Líneas `rgba(17,17,17,.08)` | Koto: blanco al 10 % (1,23:1) y `#2D2D2D` (1,47:1) | **Se toma y se suma una** | `.08` da 1,18:1, casi el separador de Koto (1,23). El borde de sección de Koto pide `.18` (1,47:1) |
| Cobalto `#0029FF` o `#0B25B7`, solo para estados activos, cursores y telemetría viva | Koto: un solo color, el del logo, puro y en un lugar. A&P: ninguno | **`#0029FF`**, con techo (§5, §14) | El puro es el que se parece al gesto de Koto; el oscuro es la versión segura (tell #7). Aprueba AA (7,03:1) |
| Display geométrica ancha, Bold/Extrabold, tracking ajustado; Space Grotesk o Plus Jakarta Sans | Koto: condensada **liviana** (300), **cero negrita**. A&P: un peso, 400 | **Mona Sans condensada a 340** (§6) | Lo medido es lo contrario en los tres ejes: estrecha, liviana, sin negrita. Space Grotesk y Plus Jakarta salen por medición (30.º y 29.º de 34) y por la respuesta 4 |
| Mono Geist Mono o JetBrains Mono | Koto: Mono Medium, 11 px MAYÚSCULAS | **DM Mono 500** (§6) | Geist Mono mide primera y sale por ser la mono por defecto de Next.js; JetBrains Mono mide 13.ª de 14 |
| Bento brutalista con bordes de 1 px, bloques gigantes y cajas de datos | Koto: muro sin bordes. A&P: pares con columnas vacías, cero cajas con borde | **No hay bento** (§7) | Ningún referente lo usa; las cajas de datos piden datos que no hay (inventario §0.6); cajas con borde por defecto son el tell #2 |
| Etiquetas de «ingredientes» técnicos al lado de cada proyecto: «[React]», «[Modelos RAG]», «[WebGL]», «[Estrategia C-Level]» (segundo texto, punto 2) | Koto: ninguna etiqueta con borde; el tipo y el año van en una ficha mono de una línea («SOCIAL MEDIA · 2026»), sin corchetes. A&P: bajo cada pieza, **etiquetas con filete de 1 px** `#8C8C8C` al 80 %, radio 3,4 px, 28 px de alto (24 a 390), con un pictograma de 20 × 20 y un separador de 1 px; nombran uno de sus **tres pilares** (New Ambition, New Expressions, New Connections), **una o dos por pieza** (12 y 8 de 20), y su texto gris queda a 2,41:1 (`medicion.json`: `interaccion.etiqueta`, `reticula.filetes1px`, `contenido.indice`; `capturas/trabajo-1440-pantalla1.jpg`, `etiquetas-detalle-1440.jpg`; en el tablero, `img/ap-etiquetas.jpg`) | **Con datos reales, en la línea mono (§7): hasta dos por pieza en el índice y todas en el caso. La etiqueta con filete, no** | De las cuatro del ejemplo, ninguna se usó en un proyecto (inventario §2): no van. Lo verificado son 30 ingredientes, de 2 a 9 por proyecto. De A&P se toma **la medida**: la etiqueta nombra una categoría y van una o dos por pieza; por eso el índice lleva hasta dos, los que más le hacen al cliente, y la lista completa va en el caso (Solución, §13). **La forma no**, por cuatro razones medidas: su gris no aprueba (2,41:1); el pictograma pide un icono por etiqueta, y con 30 ingredientes eso es una librería (la fila Iconos cierra en dos); con un vocabulario abierto, nueve cajas con borde bajo una pieza son la nube de etiquetas del portafolio de plantilla (tell #2); y Koto, que manda, no tiene ninguna. Sin corchetes (§14) |
| Hero monumental pegado a los márgenes | Koto: 48 px en una esquina sobre el showreel. A&P: 35 px; la home abre con 810 px de video sin una frase | **Eje de la compuerta 2** (§16) | A, la escala de Koto con el trabajo como lo grande; B, la declaración grande en el corte liviano |
| Párrafo mono como ficha de laboratorio «[ LAB_STATUS: ACTIVE ]», «[ DEPLOYMENT_CYCLE: 2026 ]» y, en el segundo texto, «[ LAB_01 ]» | Koto: ficha mono verdadera («SOCIAL MEDIA · 2026»), hora con huso | **La ficha sí, con datos verdaderos** (§11) | «LAB_STATUS» no tiene un estado detrás que pueda cambiar y «LAB_01» numera sin una serie detrás (inventario §5.2). La frase que sigue a «[ LAB_01 ]» la resuelve el brief de obra §4 (texto de Clara) |
| Craft vs Logic: frontend junto al pipeline técnico | Ningún referente | **Con datos reales** | La pieza (captura o grabación) al lado de lo que la prueba: su chequeo, su peso, sus datos estructurados, con fecha (inventario §4). Sin llamadas a API simuladas |
| Casos: Hipótesis → Solución → Métrica C-Level (+X %) → Showcase | Koto: 0 porcentajes en 35 casos. A&P: «Metric» vacío en 20 | **Problema, Hipótesis, Solución, Resultado medido o «sin métrica»** (§13) | Respuesta 3. Aquí la casilla del resultado nunca queda vacía: dice el número con instrumento y fecha, o dice qué no se midió |
| Framer Motion con resortes, sin `ease-in-out` | Koto: curvas propias, cero rebote. A&P: curva de 1,5 s | **Motion (sin React) con tres resortes calibrados** (§9) | Respuesta 2 |
| Iconos de 1,5 px (Lucide) | Koto: ↗ y play | **↗ como carácter de la mono y un SVG de pausa** | Para dos iconos no hace falta una librería; Lucide es la de la plantilla shadcn |
| Cursor círculo de color vibrante que dice «Ver Despliegue» o «Analizar Caso» | Koto: etiqueta sin color. A&P: pastilla gris | **Círculo cobalto que dice adónde lleva** (§8) | Ramón lo pide explícito; el color es la señal del brief en uno de sus tres usos |
| Sandboxes: «Ejecutar optimización», pasar a wireframe | Ningún referente | **Solo los verdaderos** (§12) | Inventario §6: el chequeo existe; el modo esqueleto es la versión verdadera del wireframe |
| Líneas de corte y registro cruzadas en las esquinas | Koto: «los filetes se cuentan con los dedos»; cero marcas de corte. A&P: cero marcas de registro (`reticula.filetes1px`) | **Se ajusta, con un desvío del brief de obra (§19):** una cruz en `--linea-seccion` solo donde el borde de una sección cruza el límite de la barra lateral; la retícula completa solo en el modo esqueleto (§10) | Las marcas en las esquinas de cada contenedor no van: no alinean nada. La cruz que queda marca un límite real de la retícula que no se dibuja. El brief de obra §4 condiciona las marcas a que Koto las traiga, y no las trae: queda la mínima porque es la intención de Ramón (rigor de plano) y la respuesta 4 pide mantener la intención; si en la compuerta 2 se lee como adorno, sale |
| «LAT. 33.44° S \| SYS. ACTIVO \| VOL. 04» | Koto: hora, estudios, conteos | **No** | «No significan nada crítico» es la definición de decoración; un número decorativo enseña a no creer en los demás (brief de obra §4) |
| Next.js | | **No** | Respuesta 2 |

---

## 5 · Paleta: tokens con rol, contraste y dónde va el cobalto

> **Historia (compuerta 1, 16-oct).** Esta paleta clara ya no rige: Ramón eligió la base negra de Koto. La reemplaza
> §20.2 (tokens sobre negro, con rol y contraste) y §20.4 (la señal). Queda como registro de lo aprobado en el paso 1.

Tema claro único. Contraste calculado con WCAG 2.1 desde el hex (`datos/contraste.json`); las transparencias,
compuestas sobre su fondo.

| Token | Valor | Rol, y solo ese | Dónde **no** |
|---|---|---|---|
| `--papel` | `#F6F6F4` | Lienzo de todas las páginas | |
| `--placa` | `#EFEFEA` | El encabezado plegado, el menú abierto, el panel de telemetría y **el marco donde espera cada medio** (A&P) | Nunca agrupa texto como tarjeta; nunca es una banda de sección |
| `--hoja` | `#FFFFFF` | Donde el visitante escribe (el campo del chequeo) y donde lee lo que devolvió una máquina (la salida de un sandbox) | Fondo de sección, tarjeta, botón |
| `--tinta` | `#111111` | Lo que se nombra y lo activo en texto: titulares, la primera parte de la frase, enlaces, el foco | |
| `--gris` | `#666663` | La continuación de la frase, el cuerpo corrido, los rótulos mono en reposo, el nav en reposo | Un enlace que no se distingue de otra forma |
| `--linea` | `rgba(17,17,17,.08)` | Separadores dentro de una sección | Bordes de tarjeta |
| `--linea-seccion` | `rgba(17,17,17,.18)` | El borde superior de cada sección del caso y del índice (Koto `#2D2D2D`) y la marca de registro | |
| `--senal` | `#0029FF` | **Lo que responde a ti:** el círculo del cursor, el estado activo de lo que elegiste (sección del caso, filtro, botón de pausa apretado) y el resultado calculado para tu visita (tu chequeo, lo que pesó tu visita) | Texto de más de 16 px, fondos, bandas, botones, bordes, enlaces del cuerpo, iconos, la hora, el logo |

| Par de uso | Contraste | Mínimo | |
|---|---|---|---|
| tinta sobre papel / placa / hoja | 17,45 / 16,37 / 18,88 | 4,5 | aprueba |
| gris sobre papel / placa / hoja | 5,32 / **4,99** / 5,76 | 4,5 | aprueba; sobre placa queda a 0,49 del mínimo: en la placa, nada más claro que el gris |
| cobalto `#0029FF` sobre papel / placa / hoja | 7,03 / 6,59 / 7,61 | 4,5 | aprueba |
| blanco sobre cobalto (texto del cursor) | 7,61 | 4,5 | aprueba |
| cobalto contra papel (el círculo, el punto activo: forma) | 7,03 | 3 | aprueba |
| foco: contorno de tinta contra papel | 17,45 | 3 | aprueba |
| **foco de tinta sobre el círculo cobalto** | **2,48** | 3 | **no aprueba:** por eso el círculo se esconde apenas se usa el teclado (§8, §15) |
| placa contra papel · hoja contra papel | 1,07 · 1,08 | no carga información | Koto: placa contra lienzo, 1,10 |
| línea `.08` · línea `.18` sobre papel | 1,18 · 1,47 | decorativa | Koto: 1,23 y 1,47 |
| `#0B25B7` (la otra opción del brief) sobre papel · blanco sobre él | 9,89 · 10,70 | 4,5 | aprueba; no se usa (tabla §4) |

**No es índigo.** En OKLCH el cobalto `#0029FF` tiene tono **264,2°** y croma **0,298**: el mismo tono que el azul de
Tailwind `blue-600` (262,9°) y que el azul Klein (263,2°), a **13° del `indigo-500`** (277,1°) y con casi 50 % más
croma. El tell #1 no aplica.

**Las dos tintas.** En Koto el gris corrido queda al 63,6 % del camino de claridad entre el lienzo y lo nombrado; con
el brief, al 58,4 %. El gris que repetiría exactamente la posición de Koto es `#5A5A59` (6,38:1). **Se queda
`#666663`**: la diferencia es de 5 puntos, aprueba en las tres superficies y es el valor de Ramón. Si en la compuerta 2
el gris se lee lavado, `#5A5A59` es el arreglo medido, no un gusto.

**Cero colores más.** El color lo pone el trabajo: las capturas de Verifica y Cumple (azul, lima, magenta) y de
Combeau (verde). Lo que esto exige: **el trabajo va plano en su marco, no en maqueta de dispositivo sobre un fondo
lila** como en el v3 de hoy. Koto y A&P muestran la pieza llenando su marco.

---

## 6 · Letras

### 6.1 · Cómo se midió

`herramientas/letras.py`: se bajan las tres letras de Koto a un temporal (se borran al terminar; no se guardan) y 48
candidatas libres de Google Fonts. Para cada una se busca la instancia que más se le parece en lo que se puede
ajustar: **el ancho** (eje `wdth`) hasta que «Un estudio de diseño y tecnología» mida lo mismo que en Koto a igual
altura de mayúscula, y **el peso** (eje `wght`) hasta que el asta de la H y de la n mida lo mismo. Lo que queda distinto
es **la forma**: IoU de cada letra a-z A-Z a 160 px de mayúscula, alineadas por la línea de base (1 = idéntica; la
mono, A-Z y 0-9). Las astas finas de un corte liviano bajan todos los números respecto de E10; se comparan entre sí,
no con los de E10.

### 6.2 · Display (contra GT Kotoheim Condensed Light 300) y cuerpo (contra GT Kotoheim 100 / 350)

| # | Letra | Licencia | Instancia display | Forma | Clave | Ancho | x/mayúsc. (Koto 0,650) | Cuerpo: forma |
|---|---|---|---|---|---|---|---|---|
| 1 | **Google Sans Flex** | OFL | wdth 76 · wght 301 | **0,676** | 0,519 | 1,00 | 0,709 | **0,706** (1.ª) |
| 2 | Instrument Sans | OFL | wdth 86 · wght 400 (su mínimo) | 0,661 | 0,517 | 1,01 | 0,708 | 0,647 |
| 3 | Roboto Flex | OFL | wdth 25 (su mínimo) · wght 243 | 0,627 | 0,505 | **1,03** | 0,722 | 0,637 |
| 4 | **Mona Sans** | OFL | **wdth 89 · wght 343** | **0,608** | 0,490 | 1,00 | 0,716 | 0,606 |
| 5 | Open Sans | OFL | wdth 84 · wght 355 | 0,604 | 0,409 | 1,00 | 0,749 | |
| 6 | Roboto Condensed | Apache 2.0 | wght 330 | 0,603 | 0,448 | 1,03 | 0,743 | |
| 8 | Saira | OFL | wdth 78 · wght 367 | 0,599 | 0,479 | 1,00 | 0,741 | 0,566 |
| 19 | Archivo | OFL | wdth 83 · wght 238 | 0,510 | 0,366 | 1,00 | 0,767 | 0,548 |
| 28 | Inter | OFL | wght 291 | 0,408 | 0,380 | **1,22** | 0,750 | 0,639 |
| 29 | **Plus Jakarta Sans** | OFL | wght 332 | **0,404** | 0,375 | **1,20** | 0,715 | 0,665 |
| 30 | **Space Grotesk** | OFL | wght 309 | **0,392** | 0,389 | **1,33** | 0,694 | 0,634 |
| 31 | Geist | OFL | wght 287 | 0,366 | 0,329 | 1,19 | 0,746 | 0,614 |

Las 34, con letra peor, asta y espacio, en `datos/letras.json`. Lámina a igual altura de mayúscula:
**`img/letras-comparadas.jpg`**.

**Las dos opciones** (las dos son la misma letra en dos cortes, como Koto: un archivo variable da el titular
condensado liviano y el cuerpo regular):

- **Mona Sans** (proyecto de GitHub, `github.com/github/mona-sans`; SIL OFL 1.1 con nombre reservado «Mona», que solo obliga si se modifica el archivo. Licencia: `https://github.com/google/fonts/blob/main/ofl/monasans/OFL.txt` y, en su repositorio, `https://github.com/github/mona-sans/blob/main/LICENSE`). Display a **wdth 89, wght 340**; cuerpo a **wdth 100, wght 390**. 4.ª en
  forma; la primera que iguala ancho y asta sin quedar en el borde de sus ejes, y la primera de las que no son la
  letra de interfaz de Google. Sus letras más distintas: J e y.
- **Google Sans Flex** (© 2015 Google LLC; SIL OFL 1.1. Licencia: `https://github.com/google/fonts/blob/main/ofl/googlesansflex/OFL.txt`). Display a **wdth 76, wght 300**; cuerpo a **wdth 100, wght 370**. **La que más
  se parece**, en display y en cuerpo (en cuerpo, por 0,10).

**Se usa Mona Sans, y por qué.** Google Sans Flex es la letra de los productos de Google: el dueño de una pyme la ve
todos los días en Gmail y en su teléfono. Un estudio que vende aparecer en Google y en los motores de IA, escrito con
la letra de Google, invita a leer «es de Google» o «partner de Google», y no lo es. Mona Sans no tiene esa lectura
para este público. **El costo, dicho:** Mona Sans se parece menos (0,608 contra 0,676 en display, 0,606 contra 0,706
en cuerpo). **Si Ramón prefiere la más cercana a Koto, es Google Sans Flex**, y lo decide en la compuerta 2 viéndolas
a tamaño real en el tablero.

**Por qué no las otras que miden alto.** Instrument Sans (2.ª) no baja de 400 (asta 1,14) y es la letra de E10
(criterio 2 del brief de obra). Roboto Flex (3.ª) se queda en el mínimo de su eje de ancho y aún es 3 % más ancha, y
Roboto es la letra del sistema de Android. Open Sans, Roboto Condensed y Noto Sans son las letras por defecto de medio
internet: la prueba del logo tapado las pierde. Saira mide bien pero sus curvas cuadradas (c y C, 0,27 y 0,30) son
otro carácter, el «tecnológico» de fábrica.

**Space Grotesk y Plus Jakarta Sans, contra lo medido y contra el detector.** No tienen eje de ancho: con el asta
igualada, la frase mide **33 % y 20 % más** que en Koto, y no hay forma de condensarlas. En forma quedan 30.ª y 29.ª
de 34. Como cuerpo no miden mal (0,634 y 0,665), pero el sistema de Koto es una letra en cortes, y ninguna de las dos
da el corte condensado. Además las nombra la respuesta 4 de Ramón como cliché de sitio hecho con IA. **Ninguna se usa.**

### 6.3 · Mono (contra GT Kotoheim Mono Medium)

| # | Letra | Instancia | Forma | Clave | Ancho | x/mayúsc. (Koto 0,714) | |
|---|---|---|---|---|---|---|---|
| 1 | **Geist Mono** | wght 556 | **0,755** | 0,710 | 0,94 | 0,751 | sale (abajo) |
| 2 | **DM Mono** | 500 (archivo estático) | **0,751** | **0,787** | 0,95 | **0,709** | **se usa** |
| 3 | Red Hat Mono | wght 550 | 0,735 | 0,743 | 0,95 | 0,713 | |
| 4 | Martian Mono | wght 490 | 0,733 | 0,753 | 0,97 | 0,755 | |
| 5 | Chivo Mono | wght 450 | 0,727 | 0,690 | 0,97 | 0,745 | |
| 10 | IBM Plex Mono | 500 | 0,706 | 0,707 | 0,95 | 0,739 | mono de E10 |
| 13 | **JetBrains Mono** | wght 585 | **0,651** | 0,670 | **0,91** | 0,753 | sale |

**DM Mono 500** (The DM Mono Project Authors, `github.com/googlefonts/dm-mono`; SIL OFL 1.1. Licencia: `https://github.com/google/fonts/blob/main/ofl/dmmono/OFL.txt`): la que más se parece en las letras clave (0,787, la mejor de las 14) y en la
proporción de la x (0,709 contra 0,714). Es 5 % más angosta: con **interletra +0,03em** su paso queda en 0,63em, el de
Koto. Se usa en MAYÚSCULAS a 11 px (rótulos) y en caja normal a 12 px (datos).

**Geist Mono mide primera y no se usa.** Geist y Geist Mono son la letra que trae la plantilla de Next.js: el
`layout.tsx` de las dos plantillas de `create-next-app@16.4.2` (la última en npm, leída hoy) importa
`{ Geist, Geist_Mono } from "next/font/google"` (`datos/create-next-app-layout.txt`). Es la firma del sitio armado por
IA sobre Next.js, justo lo que el brief quiere evitar. **JetBrains Mono** mide 13.ª de 14: más angosta (0,91), con la x
más alta (0,753) y dibujada para un editor de código; se lee «terminal», el disfraz del laboratorio.

### 6.4 · El sistema de letra

| Rol | Letra y corte | 1440 | 390 |
|---|---|---|---|
| Portada (dirección A) | Mona Sans wdth 89 · 340 | 48 / 1,0 / −0,01em | 36 / 1,0 |
| Declaración y titular de sección | Mona Sans wdth 89 · 340 | 38 / 1,1 / −0,01em | 26 / 1,2 |
| Titular de página y de caso | Mona Sans wdth 89 · 340 | 24 / 1,2 | 23 / 1,2 |
| Cuerpo | Mona Sans wdth 100 · 390 | 16 / **1,4** · caja de 493 px | 15 / 1,4 |
| Cuerpo chico | Mona Sans wdth 100 · 390 | 14 / 1,4 | 13 / 1,4 |
| Rótulo | DM Mono 500, MAYÚSCULAS, +0,03em | 11 / 1,0 | 11 / 1,0 |
| Dato | DM Mono 500, caja normal, +0,03em | 12 / 1,2 | 12 / 1,2 |

**Desvío escrito: interlínea 1,4 y no 1,25.** La x de Mona Sans es 10 % más alta que la de Koto (0,719 contra 0,654
en el corte de cuerpo); a igual interlínea las líneas se ven más apretadas, y el castellano lleva tildes en
mayúscula. 1,25 × 1,10 ≈ 1,4. **Sin 9 px:** piso de 11 px para todo texto. **Dos familias, un archivo variable cada
una** (Mona Sans y DM Mono 500): ninguna letra cargada sin uso (antislop C7). El wordmark sigue abierto hasta después
de la compuerta 2 (decisión del 16-oct).

---

## 7 · Retícula: el índice de Koto contra el bento del brief

**El bento del brief** («grillas modulares con bordes visibles de 1 px donde convivan bloques gigantes de
video/render con cajas compactas de datos») **no está en ningún referente**: Koto arma un muro sin bordes, A&P pares
con columnas vacías, y los dos ponen el dato en una línea mono bajo la pieza, no en una caja aparte. Hay tres razones
más para no hacerlo: con seis entradas reales (una sola de cliente) las «cajas de datos duros» se llenarían de datos
que no existen o de decoración; las cajas con borde por defecto son el tell #2; y un bento de 1 px es hoy el gesto
más reconocible de la plantilla de «laboratorio».

**La estructura:**

- **Retícula de Koto.** Margen 16 px, separación 8. Columnas: 8 bajo 834 px, 12 de 834 a 1193, 16 desde 1194 (los
  cortes medidos; la composición entre 834 y 1193 se mide en la spec). Sin ancho máximo.
- **Índice (dirección A):** barra lateral pegajosa de 320 px desde 1194 (título con su continuación en gris, conteo
  verdadero «(6)», el filtro por tipo: cliente, propio, concepto, herramienta) y **el muro de dos columnas** con las
  tres proporciones de Koto (4:5, 4:3, 5:3), 8 px entre piezas. Bajo cada pieza, en reposo y siempre a 390: nombre en
  tinta, bajada en gris y **una línea mono** con tipo · año · **hasta dos** ingredientes verificados (inventario §2).
- **Índice (dirección B):** una lista en forma de tabla, con `--linea` entre filas (la tabla de A&P), columnas tipo ·
  año · ingredientes · resultado medido o «sin métrica», y la pieza a la vista al pasar o al enfocar la fila.
- **Caso:** el de Koto (§13).
- **Craft y Logic:** dos columnas de la misma retícula: la pieza (captura o grabación) y, al lado, en mono, lo que la
  prueba con fecha. No es un módulo con borde: es una fila.

**Por qué una línea mono y no la etiqueta medida de A&P.** A&P es el único referente con etiquetas bajo la pieza:
filete de 1 px `#8C8C8C` al 80 %, radio 3,4 px, 28 px de alto, pictograma de 20 × 20 con separador, una o dos por
pieza (12 y 8 de 20), y cada una nombra uno de sus tres pilares (`medicion/accept-and-proceed/medicion.json`,
`interaccion.etiqueta`; `capturas/trabajo-1440-pantalla1.jpg`). Se toma su medida, no su forma (§4, fila de las
etiquetas): (1) su texto gris queda a 2,41:1 y en el gris de este lock la caja no agrega nada que la línea no diga;
(2) A&P tiene un vocabulario cerrado de tres palabras con tres pictogramas, y aquí son 30 ingredientes distintos: un
pictograma por ingrediente es una librería de iconos, que la fila Iconos de §4 cierra en dos; (3) con 2 a 9
ingredientes por proyecto, la etiqueta con borde se vuelve una nube de cajas bajo cada pieza, el gesto de portafolio
de plantilla (tell #2), y A&P nunca pasa de dos; (4) Koto, que manda, pone tipo y año en una línea mono sin caja. Lo
que queda de A&P: **una o dos categorías por pieza**. Por eso la línea mono del índice lleva el tipo, el año y hasta
dos ingredientes (los que más le hacen al cliente), y la lista completa va en el caso, en Solución (§13). Medida:
«Propio · 2026 · Cloudflare Pages · Cloudflare KV» son 48 caracteres a 11 px de DM Mono (paso 0,63em): unos 333 px,
una línea en la columna de 524,5 px del muro.

---

## 8 · Cursor con círculo y texto

| Qué | Decisión | De dónde |
|---|---|---|
| Dónde aparece | Solo sobre las piezas del índice y el medio principal de un caso | Koto (solo sobre trabajo) y el brief («cuando pasas el mouse sobre un proyecto») |
| Dónde no | Enlaces, botones, campos, texto, el resto de la página: ahí manda el puntero del sistema | A&P lo apaga sobre enlaces |
| Forma | **Círculo de 88 px en `--senal`** con el texto en DM Mono 500 11 px MAYÚSCULAS blanca, +0,03em, hasta dos líneas, centrado | Brief (círculo de color con texto); el tamaño, para que «VER EL CASO» entre en una línea con aire |
| Qué dice | Adónde lleva: «Ver el caso»; sobre el chequeo, lo que pasa al hacer clic. El texto final es de Clara | A&P («View Project»), Koto («View case»), brief de obra §4 |
| Seguimiento | Resorte **cursor** (§9): 90 % del salto en 75 ms, sin sobrepaso | El techo medido de A&P; Koto va a 0 ms |
| Entra y sale | Escala de 0 a 1 con el resorte **estado** al entrar a la pieza, y de vuelta a 0 al salir | |
| Magnetismo | **No**: el círculo va donde va el puntero | Ninguno de los dos referentes lo tiene; un círculo que se corre hacia el centro de la pieza deja de decir dónde está el puntero |
| Puntero del sistema | Oculto **solo** sobre la pieza donde aparece el círculo | Koto (oculto solo sobre el showreel y los destacados); A&P lo oculta en toda la página |
| Condición | `(hover: hover) and (pointer: fine)` y **sin** `prefers-reduced-motion: reduce` | Brief de obra, criterios 8 y 9 |
| Teclado | El círculo se esconde al primer Tab y no vuelve hasta que el mouse se mueve de verdad (también dentro de la pieza; la entrada que el navegador avisa cuando la página se desplaza bajo un mouse quieto no cuenta). La pieza enfocada muestra su foco (2 px de tinta a 3 px) y, dentro, el mismo texto quieto en un rótulo mono | Tinta sobre cobalto da 2,48:1: el foco nunca puede quedar encima del círculo |
| Pantalla táctil y movimiento reducido | Sin círculo. El nombre, la bajada y la línea mono quedan siempre a la vista, como Koto a 390 | |
| Accesibilidad | El círculo es `aria-hidden`, `pointer-events: none`; nada se entiende solo por él | |

## 9 · Movimiento con Motion

**Motion 13.5.0** (motion.dev, sin React: `animate`, `spring`, `inView` desde `dist/motion.js`). Publicada el
1-oct-2026 (registro de npm): 15 días antes de este lock. La 14.0.0 salió el 2-oct y es mayor: se evalúa en la
construcción, no aquí.

**Los tres resortes**, calibrados contra lo medido con el `spring()` de la misma versión (`datos/resortes.json`):

| Resorte | stiffness · damping · mass | ζ | 90 % | 99 % | Sobrepaso | Calibrado contra |
|---|---|---|---|---|---|---|
| **cursor** | 2700 · 104 · 1 | 1,001 | **75 ms** | 128 ms | 0 | A&P: 90 % en 75 ms y 99 % en 124 (Koto: 0 ms) |
| **estado** | 800 · 57 · 1 | 1,008 | **139 ms** | 239 ms | 0 | Koto: pieza y nav, 167 ms lineal (90 % a 151 ms) |
| **entrada** | 230 · 31 · 1 | 1,022 | **264 ms** | 459 ms | 0 | Koto: `feed-in` 0,5 s `(0,0,0,1)` (90 % a 261 ms, 99 % a 417) |

**Medidos corriendo en el tablero** (Chromium 141, `herramientas/verificar.mjs`, `verificacion/resultado.json`): el
bloque de la demo llega al 90 % en 76, 142 y 277 ms (cursor, estado, entrada; calculados 75, 139 y 264). El círculo,
ante un salto de 300 px del puntero, llega al 90 % 67 ms después de empezar a moverse, sin pasarse de largo (0 px).
La diferencia de 1 a 13 ms es el cuadro de 16,7 ms en que se lee la posición, no el resorte.

**Por qué resorte y no la curva de Koto.** Las duraciones son las de Koto; lo que cambia es que un resorte **conserva
la velocidad cuando lo interrumpen**: si el puntero cambia de dirección o sale de la pieza a mitad de camino, el
círculo y la pieza siguen desde donde iban, con su inercia, sin reiniciar la curva. Eso es la «inercia y masa» del
brief. Y **ζ ≥ 1 en los tres: cero rebote**, porque ninguna curva de Koto ni de A&P pasa de 1. La única diferencia
visible con la curva de Koto es el arranque: la `(0,0,0,1)` sale disparada (pendiente infinita) y el resorte arranca
desde el reposo; al 50 % van parejos.

**Qué dispara cada uno.**

- **cursor:** la posición del círculo (x, y).
- **estado:** la escala del círculo al entrar y salir; la pieza del índice que se acorta 24 px; el punto activo del
  índice de secciones del caso. **El color no lleva resorte** (no tiene masa): cambia en 167 ms lineal, el tiempo de
  Koto.
- **entrada:** un bloque que entra a la vista **una vez** (`inView`): el medio principal de una sección o su
  abridor, subiendo 3,125rem (50 px, el `feed-in` de Koto) con opacidad de 0 a 1. **Una por sección como máximo,
  nunca en texto de lectura ni línea por línea.**
- **El encabezado** se pliega en la placa con **entrada** (Koto: 750 ms de ancho).
- **Scroll nativo.** Lenis sale del v3: Koto no lo usa y una muesca de rueda llega al 90 % en 389 ms con el de A&P.
  Lo confirma la spec.

**`prefers-reduced-motion: reduce`:** ningún resorte corre. Los bloques están en su lugar desde el principio, la pieza
del índice no se acorta (la bajada ya está a la vista), el círculo del cursor no existe, el encabezado cambia de
estado sin animar y los cambios de color son instantáneos. Se mide emulando (brief de obra, criterio 8).

## 10 · Marcas de plano y líneas de registro

Koto no trae marcas de corte, y sus filetes son pocos: el borde superior de cada sección del caso (1 px, `#2D2D2D`)
y dos o tres separadores. Lo que se toma del brief es la intención (el rigor de plano), con una regla: **una línea
entra si separa o alinea algo real.**

- **Líneas:** 1 px. `--linea-seccion` (`.18`, 1,47:1) en el borde superior de cada sección del caso y del índice;
  `--linea` (`.08`, 1,18:1) entre filas de una lista o una tabla.
- **Marca de registro:** una cruz de 9 × 9 px en `--linea-seccion` **solo donde el borde de una sección (la línea al
  18 %, dibujada) cruza el límite de la barra lateral** (x = 336 a 1440: 16 de margen + 320 de barra). Ese límite es
  real (ahí termina la ficha y empieza el cuerpo) pero **no se dibuja**: la cruz es lo único que lo marca, y por eso
  alinea algo. Máximo dos por página; ninguna bajo 1194 px, donde no hay barra.
- **Por qué en `--linea-seccion` y no en tinta:** la cruz es parte de la línea que marca, no una señal. En tinta
  (17,45:1 contra el papel, contra 1,47:1 del borde que la lleva) se leería como una señal propia y se confundiría con
  el foco del teclado, que es de tinta (§15). En el mismo gris, lo que se ve es el trazo vertical de 9 px atravesando el borde.
- **Desvío del brief de obra, registrado (§19).** El brief de obra §4 («Planos y registro») admite marcas de corte
  solo si la medición de Koto las trae, y trae cero (A&P tampoco: `reticula.filetes1px`). La cruz queda porque es la
  forma mínima de la intención de Ramón («rigor de plano», «líneas de corte y registro») y la respuesta 4 pide
  mantener la intención y reemplazar la forma de plantilla: lo que se reemplaza son las marcas en las esquinas de cada
  contenedor. Es reversible en una línea: si en la compuerta 2 se lee como adorno, sale y no se reemplaza por nada.
- **La retícula completa se dibuja solo en el modo esqueleto** (§12): las columnas leídas de
  `getComputedStyle(...).gridTemplateColumns` y los elementos contorneados. Ahí el plano es verdad; dibujado aparte
  sería decoración (inventario §6.1).
- **No:** esquinas con marcas de corte en cada contenedor, cuadrícula de fondo, coordenadas.

## 11 · Telemetría: solo la verdadera

Del inventario §5.1, en DM Mono. Cada valor dice de dónde sale y cuándo cambia; si no se puede recalcular, no va.

| Qué | Origen | Cuándo cambia | Color |
|---|---|---|---|
| La hora de Santiago, con su huso («SANTIAGO 14:05 UTC-3») | `Intl.DateTimeFormat`, `America/Santiago` | En vivo | gris (no responde a ti) |
| El resultado de tu chequeo y su hora | `/api/chequeo` (`revisadoEn`) | Por visita | **cobalto** |
| Lo que pesó y tardó **esta visita** | Resource Timing, Navigation Timing, LCP, rotulado «esta visita» | Por visita | **cobalto** |
| El datacenter que te respondió y el protocolo | `/cdn-cgi/trace` (`colo`, `http`), **nunca `ip=`** | Por visita | **cobalto** |
| Commit y fecha del build | `CF_PAGES_COMMIT_SHA` o `git log -1`, rotulado «fecha del build» | Por despliegue | gris |
| Las 21 señales y sus pesos (30 + 40 + 30) | `chequeo.js`, en el build | Por build | gris |
| Conteos verdaderos entre paréntesis | El índice: «(6)» | Por build | gris |
| Fecha de publicación y de actualización de un artículo | Su JSON-LD | Por build | gris |
| El puntaje de spindlelab.cl, con fecha | `chequeo.js` en el build | Por build | gris; **pide el OK de Ramón** |

**No va** (inventario §5.2): «LAB_STATUS», «SYS. ACTIVO», «DEPLOYMENT_CYCLE», «VOL. 04», «LAB_01», «LAT. 33.44° S»,
latencias de modelos, contadores de proyectos o de chequeos, uptime, una fecha de despliegue escrita a mano.

## 12 · Sandboxes: solo los verdaderos

Del inventario §6.1. **Uno a la vista por página como máximo.**

| Sandbox | Estado | Lo que hace de verdad |
|---|---|---|
| **El chequeo en vivo** | Existe (`v3-chequeo.js` + `/api/chequeo`) | El único que corre sobre el sitio del visitante: qué robot entró y qué falta |
| **Esta página, como la lee un robot** | Por construir | El HTML que llega sin estilos, los encabezados, los datos estructurados y lo que el servidor le respondió a cada robot (`/api/chequeo?dominio=spindlelab.cl`). Se lee sobre `--hoja` |
| **Modo esqueleto** | Por construir | Contornea los elementos reales y dibuja la retícula leída del CSS (§10). Reversible, quieto con movimiento reducido, sin esconder nada al lector de pantalla. Es la versión verdadera del «wireframe» del brief |
| **Tu visita, medida** | Por construir | Peso, tiempo y datacenter de esta visita (§11) |
| **La foto que sube Bernardo y la que ve su visitante** (805 kB → 95 kB) | Por construir | **Pide su OK escrito** |

**No:** «Ejecutar optimización» que reescribe un texto, un chat con respuestas escritas de antemano, una terminal
que «despliega», pasar a wireframe cambiando colores (inventario §6.2).

## 13 · Casos con método

> **Compuerta 1 (16-oct).** La forma y el orden los fija ahora §21, medido en 13 casos: el resultado va **al final**,
> como el «Outcome» de Koto, y «La pieza» son las filas de medios que siguen a cada sección. El punto activo del
> índice va en blanco (§20.4), no en cobalto. La tabla «Con lo que hay hoy» sigue valiendo.

**La forma es la del caso de Koto:** barra lateral pegajosa de 320 px con el nombre en tinta, la bajada en gris, la
ficha mono verdadera (TIPO · AÑO · estado) y el índice de secciones con el punto activo en cobalto; a la derecha,
cada sección con su borde superior `--linea-seccion`, el rótulo mono a la izquierda, el titular de 24 px y el cuerpo
de 493 px. A 390, una columna, con la ficha arriba.

**Las secciones**, en este orden, con el rótulo mono que las nombra:

1. **Problema.** Lo que le pasaba al cliente o al sitio, en sus palabras.
2. **Hipótesis.** Qué creíamos que lo resolvía, y cómo íbamos a saber si funcionó.
3. **Solución.** Lo que se hizo, con los ingredientes verificados (inventario §2) y lo que cada uno le hace al cliente.
4. **Resultado medido** o **Sin métrica.** Nunca vacío (A&P lo deja vacío en 20 de 20). Si hay número: el valor, el
   instrumento, la fecha y el crudo (inventario §4). Si no: qué no se midió, dicho («No medimos visitas ni consultas de
   este sitio»). **Ningún resultado de negocio de un cliente existe medido** (inventario §0.6).
5. **La pieza.** Capturas y grabaciones del sitio, planas en su marco.

**Con lo que hay hoy** (inventario §2 y §4; el texto final es de Clara):

| Caso | Resultado medido | Puede ir |
|---|---|---|
| **Verifica y Cumple** | Chequeo de visibilidad **54 → 94**, el mismo instrumento dos veces (14-oct 22:29Z → 16-oct 17:51Z), tras publicar robots, llms.txt, sitemap y el schema completo el 15-oct (`9391a0b`, `7696d63`) | **Decide Ramón** |
| **Combeau, fotografía** | Sin métrica de negocio. Oficio medido: una foto que él sube con 805 kB llega al visitante en 95 kB (WebP, 828 px; 804.697 y 94.576 bytes) | El caso sí (permiso verbal, 30-sep); **la medición pide su OK escrito** |
| **Combeau, modelo** | Sin métrica. Video con carga diferida: 0 KB de video en la carga inicial | Igual que el anterior |
| **El chequeo de 21 señales** | Herramienta: 21 señales, 30 + 40 + 30 = 100 | Sí |
| **spindlelab.cl** | 85 en el chequeo (16-oct); 36 → 73 → 100 en Verifica y Cumple, solo en Trabajo y con el aviso del cambio de regla | **Decide Ramón** |
| **Raigal** | Ninguno, por regla: es concepto | Rotulado «pieza de concepto · no es un cliente» |

## 14 · Reglas para que el juego no se vuelva tic

El juego funciona en Koto porque cada recurso tiene un trabajo y aparece poco. Convertido en techo:

| Recurso | Máximo | Rol, y solo ese |
|---|---|---|
| **Cobalto** | **3 usos por pantalla y 6 por página**, contando cada valor vivo, cada estado activo y el círculo | Lo que responde a ti (§5). Nunca texto de más de 16 px, fondo, banda, borde, botón ni enlace del cuerpo. Una pantalla sin nada que responda al visitante tiene cero cobalto, y está bien: Koto tiene cero color de interfaz |
| **Rótulos mono en MAYÚSCULAS** | **Uno por bloque** y solo a 11 px | Nombra (tipo, año, lugar, sección, conteo). Nunca una frase, nunca un concepto que pida explicación, nunca entre corchetes |
| **Datos mono** | Solo valores con fila en el inventario | 12 px, caja normal |
| **Ingredientes en el índice** | **2 por pieza**; todos en el caso | En la línea mono, sin caja, sin icono, sin corchetes (§7). A&P: una o dos etiquetas por pieza |
| **Corchetes** | **1 por página** | Solo alrededor de un enlace mono a un índice («[ Todo el trabajo ]»), como Koto |
| **Dos tintas** | **1 por sección** | La continuación en gris dice qué le hace al cliente lo nombrado en tinta; la parte en tinta, hasta 8 palabras; la gris, de 6 a 13 (Koto) |
| **Marca de registro** | **2 por página**; 0 bajo 1194 px | En `--linea-seccion`, donde el borde de sección cruza el límite de la barra (§10). Desvío del brief de obra, reversible (§19) |
| **Líneas** | Una por borde de sección y una entre filas de una lista | Nunca alrededor de un bloque |
| **Cursor** | **Un tipo de círculo, un texto por tipo de pieza** | Solo sobre trabajo; nunca sobre enlaces, botones o texto |
| **Entradas con resorte** | **1 por sección** | Medio o abridor; nunca texto de lectura, nunca línea por línea |
| **Sandboxes** | **1 a la vista por página** | Solo los verdaderos (§12) |
| **Placa** | Encabezado plegado, menú, panel de telemetría y marco de carga | Nunca una tarjeta de contenido |
| **Telemetría** | **Una franja por página** (la del encabezado o la ficha del caso) más los valores del sandbox | Solo lo de §11 |
| **Negrita** | **0** | La jerarquía es de corte y de tinta |

## 15 · Accesibilidad

- **Foco visible siempre**, aunque haya cursor propio: 2 px de `--tinta` a 3 px de distancia (17,45:1 contra el
  papel). El círculo cobalto se esconde con el primer Tab porque el foco sobre él daría 2,48:1; el texto que decía
  el círculo aparece quieto dentro de la pieza enfocada. Nada se entiende solo con hover: la bajada y la línea mono
  están a la vista sin pasar el mouse en táctil, en teclado y con movimiento reducido.
- **Contraste AA** en todo texto, en las tres superficies (§5). El par más justo, gris sobre placa, 4,99:1: sobre la
  placa no va nada más claro que el gris. Se mide en el render con `npm run verificar` a 390, 768 y 1440.
- **Movimiento reducido**: §9. Ni resortes, ni círculo que sigue, ni entradas; el contenido en su lugar desde el
  principio. Koto y A&P lo ignoran: es el defecto medido que no se copia.
- **Lo que se mueve solo** (el reloj cambia el minuto; nada más) no necesita pausa. Si una dirección agrega algo que
  se mueva solo más de 5 segundos, lleva botón de pausa (WCAG 2.2.2), con el estado apretado en cobalto.
- **Teclado:** cada pieza del índice es un enlace con nombre; el filtro y los sandboxes, controles nativos; 44 px de
  área a 390.
- **Un `h1` por página**, landmarks reales, `alt` que describe la pieza mirándola (antislop C1 y C5).
- **Piso de 11 px** para todo texto.

## 16 · Lo que deciden las dos direcciones de la compuerta 2

Las dos comparten este lock: paleta y roles, letra, cursor, resortes, reglas y techos. **Tienen que diferir en tres
ejes nombrables**, no en el tono de gris:

| Eje | **A · Archivo** | **B · Banco** |
|---|---|---|
| Dominante | Koto, su índice y su caso | Koto, su capa de instrumentos (reloj, ficha, conteos, widgets), con la asimetría de A&P (columnas vacías) como secundaria |
| Lo que carga la pantalla | **El trabajo:** capturas y grabaciones planas, a sangre en su marco, del 33 al 72 % de la página como en Koto | **El dato vivo:** el chequeo y sus lecturas, la ficha de cada pieza, «esta página como la lee un robot» |
| Escala de la letra | La de Koto: 48 / 38 / 24 a 1440 | **La declaración grande** del brief en el corte condensado liviano, con la regla de palabra larga de E10 §13 medida en la spec |
| Índice | El muro de dos columnas con tres proporciones | La lista en tabla con filetes (A&P) y la pieza al pasar o enfocar |
| Primera pantalla de la home | La declaración a la escala de Koto en una esquina sobre la pieza grande; el chequeo justo debajo | La declaración grande y el chequeo como su prueba, en la misma pantalla (pregunta 2 del brief de obra) |
| Qué sacrifica | El hero monumental del brief, y depende de grabaciones que hay que producir (las de Combeau, con su OK) | El muro de imágenes de Koto; más texto y más dato por pantalla, con riesgo de leerse como panel; sin el OK de Ramón para mostrar los puntajes propios, sus lecturas son solo las del visitante |

**Lo que no puede pasar:** que A y B queden iguales salvo la escala (eso es una dirección con ruido); que alguna
repita los tokens de E10 (ciruela, resaltador, Instrument Sans, Plex) o los de driftime (negro con campos de color),
criterio 2 del brief de obra; o que una tercera dirección tibia aparezca «para que elija».

## 17 · Lo que esto reabre del manual

Con el logo en pausa desde el 16-oct, el manual v3.0 ya no obliga en el wordmark, el oro ni el punto. Lo que este
lock cambia de lo aprobado, para decidir en la compuerta 2 y no antes: Manrope (y Gabarito e Inter del contrato de
marca anterior) por Mona Sans y DM Mono; el radio único de 6 px pasa a 6 en medios, 4 en placas y 2 en rótulos
(Koto: medios 6, placas 4, etiquetas 2); el lienzo negro del manual §04 ya había pasado a claro en E10, y aquí la
tinta es `#111111` y la señal, cobalto. Los documentos compartidos los toca la troncal (brief de obra §6.10).

## 18 · Evidencia

- Koto: `medicion/koto/resumen.md`, `medicion.json` (cada valor con página, ancho y selector), `capturas/` (primera
  pantalla y página completa de home, trabajo, caso y estudio a 1440 y 390; detalles de cursor, índice, filtro,
  widgets, encabezado, menú, tipos), `herramientas/correr.sh`.
- A&P: `medicion/accept-and-proceed/resumen.md`, `medicion.json`, `capturas/`, `herramientas/`.
- Koto, de nuevo, para la compuerta 1 (§20 y §21): `medicion/koto/paso2/medicion-color-y-casos.json` (color de 22
  páginas en px y en DOM, menú, pie, hover, velo, la tinta de `/services`, la paleta sobre negro y la anatomía de 13
  casos), `capturas/` (tiras, momentos de color, Lyft completo a 1440 y 390, cierre, menú, pie) y
  `herramientas/correr.sh`.
- Este lock: `../tableros/e12-laboratorio/datos/letras.json`, `contraste.json`, `resortes.json`, `atmosfera.json`,
  `create-next-app-layout.txt`; `img/letras-comparadas.jpg`; `herramientas/letras.py`, `contraste.py`,
  `resortes.mjs`, `atmosfera.mjs`, `evidencia-next.sh`. Licencias de las tres letras, copiadas por Javiera:
  `e12/qa-paso-1/vuelta-1/crudo/licencia_*`. El tablero de la compuerta 1: `../tableros/e12-laboratorio/tablero.html`,
  armado por `herramientas/armar-tablero.py` (22 imágenes en `img/`, 1,63 MB en total, la mayor de 168 kB, con
  kB = 1.000 bytes como el inventario; lista en `img/manifiesto.json`), verificado por `herramientas/verificar.mjs`: a
  360, 390, 768 y 1440 sin desborde, un `h1`, jerarquía de encabezados sin saltos, ningún texto bajo 11 px, 23 de 23
  imágenes cargadas (Verifica va dos veces), las tres letras cargadas, Motion cargado y 685 nodos de texto sin
  ninguno bajo 4,5:1; las demos con mouse, con teclado y con movimiento reducido, y el teléfono sin círculo; y, desde
  la segunda vuelta, el contorno de las fichas claras, la cruz en `--linea-seccion`, los rótulos de la tabla de
  resortes a 390, la hora sin respaldo fijo y la nota de carga una sola vez (`verificacion/resultado.json`; capturas
  de las demos y de esos arreglos en `verificacion/`).

## 19 · Historial de correcciones

| Fecha | Corrección | Tipo | Origen |
|---|---|---|---|
| 16-oct | Primera versión | | Lucía, compuerta 1 de E12 |
| 16-oct | §2.8: los corchetes de Koto son **tres**, no dos: falta «LATEST NEWS [ ALL ]» del panel del reloj, que el texto medido no trae y la captura sí. La regla de §14 no cambia: los tres son un enlace a un índice | Preferencia (corrige un conteo) | Lucía, al mirar `detalle-widgets-1440.jpg` para el tablero |
| 16-oct | §9: los resortes, medidos corriendo en el tablero, coinciden con lo calculado (1 a 13 ms de diferencia) | Preferencia (confirma) | `herramientas/verificar.mjs` |
| 16-oct | §8: con teclado el círculo se esconde y **vuelve con el primer movimiento real del mouse**, también si el puntero sigue dentro de la pieza; el aviso de entrada que da el navegador cuando la página se desplaza bajo un mouse quieto (al tabular) no lo trae de vuelta | **Regla** (va a la spec: sin esto el círculo quedaba escondido hasta salir y volver a entrar) | Defecto encontrado en la verificación del tablero |
| 16-oct, 2.ª vuelta | §4: tres filas que faltaban, contrastadas con lo medido: «Form & Intelligence» (queda como estructura: forma = trabajo y letra, inteligencia = capa mono y sandboxes; no como lema), la atmósfera (medido hoy con `atmosfera.mjs`: degradados de Koto todos neutros, 0 con color, 0 púrpura; A&P, 0; ningún dibujo grande) y las etiquetas de ingredientes (la etiqueta con filete de A&P, medida, y por qué no se toma su forma). La fila de la ficha suma «[ LAB_01 ]» | Preferencia (completa el contraste con el brief) | Acta del paso 1, defecto 2 |
| 16-oct, 2.ª vuelta | §7 y §14: la línea mono del índice lleva **hasta dos ingredientes**; la lista completa, en el caso. Es la medida de A&P (una o dos etiquetas por pieza, 12 y 8 de 20) y la razón por la que la etiqueta con filete no entra | **Regla** (va a la spec) | Acta, defecto 2 |
| 16-oct, 2.ª vuelta | §10 y §14: **desvío del brief de obra.** El brief de obra §4 admite marcas de corte solo si Koto las trae, y Koto trae cero (A&P, cero). La cruz se mantiene como forma mínima de la intención de Ramón, en `--linea-seccion` (el tablero la dibujaba en tinta: corregido, porque en tinta se lee como señal y compite con el foco), y el texto dice lo que se dibuja: el borde de sección cruza el **límite** de la barra, que no es una línea dibujada. Reversible: si en la compuerta 2 se lee como adorno, sale | **Regla** (color y lugar) y desvío registrado | Acta, defecto 4; brief de obra §4 y §10 |
| 16-oct, 2.ª vuelta | §6.2 y §6.3: las URLs de la licencia de Mona Sans, Google Sans Flex y DM Mono (las tres SIL OFL 1.1) | Preferencia | Acta, defecto 11 |
| 16-oct, 2.ª vuelta | §12, §13 y §18: una sola unidad, kB = 1.000 bytes (la del inventario corregido): la foto de Combeau es 805 kB → 95 kB, no «786 KB → 92 KB» (eran KiB); el tablero suma 1,63 MB, no «1,5 MB». Space Grotesk mide 1,325 veces el ancho de Koto: 1,33 en el lock y en el tablero, con el mismo redondeo | Preferencia (corrige unidades y redondeo) | Acta, defectos 13 y 14; inventario, «Correcciones» |
| 16-oct, 2.ª vuelta | El tablero, sin cambiar el lock: las fichas claras con un solo atributo `style` (el contorno existía en el código y no en la página), los casos en `h3` (había un salto de `h2` a `h4`), el código dentro de los rótulos a 1em y sin mayúsculas (estaba en 8,8 px), la tabla de resortes con la fuente entera y un rótulo por celda bajo 834 px, el reloj sin hora fija de respaldo («--:--»), la muestra de la mono con el build verdadero de la vista previa (`f0d911c`, 14-oct) en vez de una fecha escrita a mano, y la nota de las mediciones de carga una sola vez | Preferencia (defectos del tablero) | Acta, defectos 3 y 5 a 10 |
| 16-oct, compuerta 1 | **Base negra, medida de nuevo.** Ramón eligió el negro de Koto «con juegos de blanco u otros colores» y que los casos se hagan como Koto. Medí 9 páginas de la casa y 13 casos a 1440 (5 también a 390; `medicion/koto/paso2/`): el lienzo es `#060606` en las 640 paradas y nunca cambia; el blanco y los colores entran **dentro de los marcos del trabajo**, como campos de la marca de cada cliente (del 2,9 al 35,4 % de la página de un caso, mediana 23), y en las interiores de la casa casi no aparecen. Nuevo **§20** (la regla, los tokens sobre negro con su contraste, la señal, los techos y la diferencia con driftime) y nuevo **§21** (la plantilla del caso: barra lateral, cuatro formas de fila, largos de texto, cierre, 390). Pasan a historia la paleta clara de §5 y lo que dependía de ella (lista en §20.7); en §13 el resultado va al final, como el «Outcome» de Koto. Desvío del encargo del paso 2 avisado (§20.6): Koto no cambia el lienzo de una página interior | **Regla** (va a la spec) | Compuerta 1, puntos 4 y 6; `e12/encargo-paso-2.md` §6 |

---

## 20 · Compuerta 1: negro con juegos de color

Ramón, 16-oct (punto 6): «tomar el negro, pero así como muestra el sitio, también hay juegos con sitios interno con
blanco u otros colores». Lo comprobé en el navegador el mismo día: **9 páginas de la casa** (home, `/work`, `/about`,
`/services`, `/latest`, una nota, `/careers`, `/contact`, `/privacy-policy`) y **13 casos** (Lyft, Amazon, Rakbank,
Instagram, Norton, Stack Overflow, MachineX, Call of Duty, Washington Post, WhatsApp, Deezer, De-extinction,
GoFundMe) a 1440, y home, `/work`, Lyft, Instagram y Stack Overflow también a 390; más el menú abierto, el pie, el
hover del índice y del destacado. Cada página, bajada de media en media pantalla: **640 paradas**. Datos:
`medicion/koto/paso2/medicion-color-y-casos.json`; capturas: `medicion/koto/paso2/capturas/` (una tira por página,
`color-<caso>-1440.jpg` con la pantalla de más campo claro o de color de cada caso, menú, pie, hover); herramientas y
cómo repetirlo: `medicion/koto/paso2/herramientas/correr.sh`.

### 20.1 · Lo medido

- **El lienzo no cambia nunca.** `html` es `#060606` en las 640 paradas de los 27 recorridos; `body` y `main`,
  transparentes. De 11.039 puntos de la malla que cayeron sobre un fondo de CSS, **ninguno** tiene un canal sobre 60:
  ninguna sección, página ni estado pinta un fondo claro o de color. Fuera de los medios, lienzo y placa son del 91,9
  al 98,8 % de los píxeles; lo blanco o claro de la interfaz es del 0,15 al 0,81 %, y son las letras.
- **El blanco y los colores están dentro de los marcos del trabajo.** En los 13 casos los medios cubren del **56,3 al
  65,7 %** de la página a 1440. Un medio cuyo color dominante cubre al menos el 30 % es un **campo**: claro (blanco,
  crema, tinte claro) en el **0 al 27,0 %** de la página (mediana 15,0), de color en el **0 al 25,8 %** (mediana 6,7);
  juntos, del **2,9 %** (Call of Duty, todo oscuro) al **35,4 %** (GoFundMe), **mediana 23,0**. Del 5 al 62 % de los
  medios de un caso son campo claro o de color (mediana 41 %). Así se ven las «secciones blancas» o «magenta» de un
  caso: un marco de 1057 × 595 lleno de blanco con letras negras de la pieza, a 8 px del negro.
- **El color es el del cliente, y cambia con cada caso.** De 116 campos claros, 31 son blanco (`#FDFDFD` a `#FFFFFF`)
  y los demás son el neutro de la marca: `#F1F0EB` en Lyft, `#F4F3EF` en Amazon, `#EAF1EA` en De-extinction (11 de
  11), `#EEE6D1` en Norton, `#FAF6EA` en WhatsApp. Los de color son su color de marca: magenta `#FF00C4` en Lyft,
  violeta `#A339FE` en Deezer, rojo `#FF2E02` en Rakbank, naranja `#FF5D00` en Stack Overflow, amarillo `#FFFF82` en
  Washington Post. Ninguno es un color de Koto.
- **Las interiores de la casa casi no juegan.** Servicios, estudio, carreras, contacto y privacidad: del 0 al 0,9 % de
  campo claro y 0 de color; los medios, del 0 al 37 % (una franja de imagen ancha arriba y fotos). El índice (`/work`)
  es el que más color tiene (70,8 % de medios, 20 % de campo de color): son las portadas de los casos. La home, 4,8 %.
- **Cómo entra: corte seco, con el scroll, como entra una imagen.** El campo tiene el borde del marco (radio 6 px) y 8
  px de negro alrededor; no hay transición ni fundido del lienzo. El MutationObserver no vio **ningún cambio de fondo**
  en los 27 recorridos. El único cambio de color atado al scroll está en `/services`: el texto de la sección a la
  vista pasa de `#989898` a blanco y la anterior vuelve a gris, `color .167s linear` (medido cuadro a cuadro: el cruce
  dura de 137 a 167 ms). Es tinta, no fondo.
- **Qué más lo dispara: el hover del índice.** Al pasar el mouse sobre una pieza, **las demás se cubren de negro al 70
  %** (`bg-black/70`, opacidad de 0 a 1 en **167 ms lineales**, y de vuelta igual; solo desde `md`): se oscurece el
  45,6 % de la ventana y el color queda solo en la pieza señalada. En el destacado de la home el hover no cambia ningún
  color (0 %: aparece la etiqueta del cursor). Un campo blanco bajo el velo queda en `#515151` (2,55:1 contra el lienzo).
- **El texto de la interfaz nunca va sobre un campo.** Todo el texto corrido, los titulares y los rótulos de sección
  van sobre `#060606`, `#141414` o `#202020` (tabla de §20.2). Sobre un medio solo caen rótulos de 9 a 12 px que flotan
  al borde de una imagen o en una placa: la hora (mono 11, blanco al 70 %), «Interactive» (9 px), «Menu» a 390, las
  etiquetas de una nota y la tarjeta «Say Hello»; ningún párrafo ni titular. Lo que se lee sobre un campo claro es
  texto **de la pieza**, horneado en la imagen: estimado en píxeles, su par oscuro sobre claro tiene mediana 13,9:1
  (p75 17,9); sobre los campos de color, mediana 4,6:1 (es estimación, no DOM).
- **Menú y pie, también negros.** Menú a 1440: tarjeta `#141414` de 320 px (radio 4) sobre la página desenfocada (negro
  al 80 %, 20 px de desenfoque); a 390, capa negra al 70 % con 40 px de desenfoque (`menu-abierto-1440.jpg`,
  `menu-abierto-390.jpg`). El pie es transparente sobre el lienzo y su texto legal va en `#595959` a 14 px (2,89:1: no
  aprueba). **El caso no tiene pie:** cierra con «Next up» (§21).

### 20.2 · La regla y los tokens sobre negro

1. **Lienzo `#060606` en todas las páginas, siempre.** No cambia por página, por sección, por scroll ni por hover.
2. **El blanco y los colores entran solo como campos dentro de un marco de medio:** la pieza (identidad, pantalla,
   afiche, sistema) compuesta sobre su propio fondo blanco, crema o de color, en un marco de radio 6 px con 8 px de
   negro alrededor, a ancho de columna (16:9) o a media columna (4:5, 1,62), con las formas de fila de §21.
3. **El color de un campo es del trabajo, nunca de la interfaz:** en un caso real, el de la marca del cliente; en una
   pieza de concepto, el de su identidad inventada. Ninguna ruta, servicio, sección ni estado de la interfaz tiene un
   color propio.
4. **Dónde:** en las páginas de caso (reales y de concepto) y en las portadas del índice; en la home, a lo más la pieza
   destacada. Las interiores de la casa (servicios, estudio, contacto, legales) son negras; si llevan color, es una
   franja de imagen del trabajo.
5. **Ningún texto de la interfaz sobre un campo.** El gris del cuerpo da 2,51 a 2,88:1 sobre los claros medidos. El
   texto dentro de un campo es de la pieza y se diseña con su par: 4,5:1 o más (3:1 si mide 24 px o más). Si una pieza
   se arma en HTML y no como imagen, ese texto entra en `npm run verificar` como cualquier otro.
6. **Sin transición del lienzo.** Lo que cambia con un estado: el velo del índice y la tinta de lo activo, los dos en
   167 ms lineales; con movimiento reducido, instantáneos.

| Token | Valor | Rol, y solo ese | Dónde **no** |
|---|---|---|---|
| `--lienzo` | `#060606` | El fondo de todas las páginas | Nunca cambia |
| `--placa` | `#141414` | Encabezado plegado, menú, panel de telemetría y **el marco donde espera cada medio** mientras carga | Tarjeta de contenido, banda de sección |
| `--placa-activa` | `#202020` | La sección activa en la barra de 390 (§21.3); el hover de una fila de lista | Fondo de nada que no sea un estado |
| `--blanco` | `#FFFFFF` | Lo nombrado y lo activo: titulares, la primera parte de la frase en dos tintas, la sección activa, el foco | |
| `--gris` | `#989898` | La continuación, el cuerpo, los rótulos y el nav en reposo | Sobre un campo claro; un enlace que no se distingue de otra forma |
| `--linea-seccion` | `#2D2D2D` | El borde superior de cada sección del caso y del índice, y la marca de registro de §10 (Koto, medido) | Alrededor de un bloque |
| `--linea` | blanco al 10 % | Separadores dentro de una sección o entre filas de una lista | Bordes de tarjeta |
| `--velo` | `#060606` al 70 % | Las piezas del índice que no tienen el mouse | Cualquier otra cosa; en táctil no existe |
| `--senal` | §20.4 | Lo que responde a ti | §20.4 |
| campos | del trabajo | Dentro de un marco de medio (punto 2) | La interfaz entera |

No hay tercer gris: el `#595959` de Koto da 2,89:1 sobre el lienzo, 2,63 sobre la placa y 2,33 sobre la placa activa.

| Par de uso (contraste WCAG 2.1, `herramientas/contraste-negro.py`) | Contraste | Mínimo | |
|---|---|---|---|
| blanco sobre lienzo · placa · placa activa | 20,26 · 18,42 · 16,29 | 4,5 | aprueba |
| gris `#989898` sobre lienzo · placa · placa activa | 7,02 · 6,39 · **5,65** | 4,5 | aprueba; sobre la placa activa nada más oscuro que el gris |
| blanco al 70 % (nav en reposo) sobre lienzo | 9,77 | 4,5 | aprueba |
| foco: contorno blanco de 2 px contra el lienzo | 20,26 | 3 | aprueba |
| `#060606` (texto de una pieza) sobre campo `#FFFFFF` · `#F1F0EB` · `#EAF1EA` | 20,26 · 17,76 · 17,63 | 4,5 | aprueba |
| gris `#989898` sobre esos campos | 2,88 · 2,53 · 2,51 | 4,5 | **no**: por eso la regla 5 |
| línea `#2D2D2D` · blanco al 10 % · placa, contra el lienzo | 1,47 · 1,23 · 1,10 | | decorativas: separan, no informan |
| velo sobre un campo blanco · crema · magenta | queda `#515151` · `#4D4C4B` · `#51043F` | | lo que se ve de las piezas sin mouse |

### 20.3 · Techos, para que el juego no se vuelva tic

| Recurso | Techo | De dónde |
|---|---|---|
| Campos claros y de color en una página de caso | **Del 10 al 35 %** del área a 1440, contados como §20.1 | Koto: de 2,9 a 35,4 %, mediana 23. Menos de 10 % se lee como un caso sin juego; sobre 35 %, el negro deja de ser la base |
| Medios en una página de caso | **Un tercio o más** del área a 1440 | Koto: del 56 al 66 %; el piso es el criterio 6 del encargo |
| Medios claros o de color seguidos | **Cuatro como máximo**; después, un medio oscuro, una foto o una sección de texto | Koto: mediana 4; los 7 de Amazon y WhatsApp son la excepción, no la regla |
| Colores de campo por caso | Los de la marca de ese caso; **ninguno vuelve como color de la interfaz** | Koto: cambian de un caso al siguiente y ninguno es suyo |
| Interiores de la casa | **0 campos**; el color, si hay, en una franja de imagen o en fotos | Koto: del 0 al 0,9 % de campo claro, 0 de color |
| Índice | El color solo en las portadas; ninguna caja de color sin imagen | Koto: 20 % de campo de color, todo en portadas |
| Velo | Solo en el índice, solo con puntero fino, 167 ms | Koto |
| Texto de la interfaz sobre un campo | **0** | Koto: 0 |

### 20.4 · La señal sobre negro

El cobalto del paso 1 no sirve sobre este lienzo: `#0029FF` da **2,66:1** contra `#060606` (2,42 contra la placa),
bajo el 3:1 de una forma y el 4,5:1 de un texto.

| Opción | Valores | Contraste |
|---|---|---|
| **(a) La de Koto, la que rige** | Lo activo en blanco, lo que reposa en gris; la sección activa del índice suma un punto blanco de 3 px a su izquierda (medido: x 17, 3 × 3 px); la barra de 390 marca la sección en `--placa-activa`. Cero color de interfaz | blanco 20,26 y gris 7,02 contra el lienzo; blanco contra gris 2,88 (el punto, no el color, marca la activa) |
| (b) El cobalto del brief, aclarado en el mismo tono (OKLCH 264,2°) | `#316BFF` (L 0,581 · C 0,228) | 4,51 contra el lienzo, 4,10 contra la placa, **4,49 contra un campo blanco**: pasa el 3:1 de una forma sobre el negro, la placa y un campo blanco. Texto encima: `#060606` a 4,51; blanco a 4,49 (no aprueba a 11 px) |

**Rige (a)**, porque la compuerta 1 pide regirse por la referencia en diseño (punto 7) y Koto no tiene color de
interfaz: el color de la página es del trabajo, y una señal azul fija sería el único color que no lo es. Lo que eso
cambia: el círculo del cursor (§8) pasa a **blanco con el texto en `#060606`** (20,26:1) y un anillo de 1 px `#060606`
para que se vea también sobre un campo blanco (blanco contra blanco es 1:1; el anillo, 20,26:1). El anillo es decisión
de este lock, no de Koto: allí la etiqueta del cursor es de vidrio y no tiene que verse sobre blanco. El punto activo del
caso (§13, §21) y el estado apretado (§15) van en blanco; la telemetría que responde a ti (§11) va en blanco y la que
no, en gris; el foco es un contorno blanco de 2 px a 3 px de distancia, y el círculo se sigue escondiendo con el
teclado (§8). **(b) queda medido** por si Ramón, en la compuerta 2, quiere el azul del brief: con `#316BFF`, sus usos y
techos son los de la fila del cobalto en §14, y el texto del círculo va en `#060606`.

### 20.5 · En qué se diferencia de driftime, en una frase que se comprueba mirando

**Tapa las imágenes: en Koto (y aquí) queda una página negra con texto blanco y gris, sin un solo bloque de color; en
driftime quedaban los cuatro campos de color de los servicios.** Aquí el color nunca es de la interfaz ni fijo por
servicio (lo que Ramón rechazó el 15-oct, `spec-visual.md` §7): viene dentro de cada pieza y cambia de un caso al
siguiente.

### 20.6 · Lo que esto le dice al encargo del paso 2

El encargo (`e12/encargo-paso-2.md` §2, vista 5, y criterio 4) pide una página interior donde **el lienzo** pase de
negro a blanco u otro color. **Lo medido no lo respalda:** en Koto el lienzo no cambia en ninguna de las 640 paradas,
ni en las interiores de la casa ni en los casos. El encargo prevé el caso (§9: «si la medición de Koto muestra el
juego de color en otro tipo de página, Lucía elige la equivalente y lo dice»): **la página que muestra el juego es la
de caso**, y la vista 5 equivalente es un caso (real o de concepto) con sus campos medidos como §20.1, o el índice con
sus portadas. Una interior de la casa con el lienzo claro sería un **desvío de Koto**, no su juego: si Ramón lo
quiere al verlo en la compuerta 2, se rotula como desvío y se decide ahí. Mauro ajusta el criterio 4 del encargo; este
lock no lo edita.

### 20.7 · Lo que pasa a historia y lo que queda

- **A historia:** la paleta clara de §5 entera; en §1, el trabajo (1) de A&P («el lienzo claro») y el párrafo «Se elige
  el claro»; en §3, la fila del lienzo de Koto («No el negro»), la del velo negro («No»: en negro se toma, como
  `--velo` del índice), la del vidrio («No»: sobre negro se lee, y queda en el menú como en Koto) y la primera de A&P;
  en §4, las filas «Light Mode Editorial», fondo, superficies, texto, líneas y cobalto; en §8, la forma del círculo en
  cobalto y la nota del foco de tinta sobre cobalto (2,48:1); en §10, los dos valores de línea (los mismos nombres,
  ahora `--linea-seccion` `#2D2D2D` y `--linea` blanco al 10 %); en §13 y §14, el cobalto (pasa a `--senal`, §20.4);
  en §15, el foco de tinta y el par gris sobre placa (pasan a la tabla de §20.2).
- **Lo que queda de A&P:** (2) la carga como diseño (cada medio espera en `--placa` con su radio real, sin brillo que
  corre); el techo del cursor (90 % del salto en 75 ms, §9); y, solo en la dirección B, las columnas vacías y la lista
  con filetes (§16).
- **Lo que sigue igual:** la letra (§6, con la letra por dirección del encargo), la retícula (§7), el cursor salvo su
  color (§8), los resortes (§9), las marcas (§10), la telemetría (§11), los sandboxes (§12), los techos (§14, con
  `--senal`), la accesibilidad (§15) y los ejes de §16, ahora los dos sobre negro.

## 21 · El caso, como Koto

Ramón, 16-oct (punto 4): «hacer los casos como los hace la referencia». Medí la anatomía de **13 casos a 1440** y de
3 a 390 (`caso.mjs` → `medicion-color-y-casos.json`, `casos.porCaso` y `casos.plantilla`). El de detalle es **Lyft**
(ficha estándar: 26 de los 35 casos usan Challenge / Strategy / Identity / Application / Outcome):
`capturas/caso-lyft-1440-primera.jpg`, `caso-lyft-1440-completa-01.jpg` y `-02.jpg` (a la mitad), `caso-lyft-390-*`,
`detalle-lateral-activa-1440.jpg`, `caso-lyft-1440-cierre-1..3.jpg`.

### 21.1 · La barra lateral (1440)

Pegajosa (`position: sticky; top: 0; height: 100svh`), **320 px**, a 16 px del borde. De arriba abajo:

- **Nombre y bajada en dos tintas**, Condensed 24: el nombre en blanco, la bajada en gris («Lyft / Your Lyft is
  arriving»; bajadas de 1 a 6 palabras, casi siempre 3 o 4).
- **Ficha mono** de 11 px en MAYÚSCULAS, gris: «TRAVEL · 2025» (el separador es un punto gris de 2 px).
- **Índice de secciones**, Regular 16, filas de 36 px: la activa en blanco con un **punto blanco de 3 px** a su
  izquierda; las demás en gris. Medido: arriba está activa «Challenge»; a media página, «Identity».
- **Abajo, créditos** (10 de 13 casos): «Thanks» en blanco 14 y un texto gris de 14 cortado con «Read more». En 4 de
  13, además, una **tarjeta** que enlaza a una nota («Deep dive»: miniatura de 76 px, título blanco 16, bajada gris,
  rótulo mono de 9 px).

### 21.2 · La columna, en orden (1440)

Columna de **1057 px** (12 columnas), a la derecha de la barra; **8 px** entre todos los bloques.

1. **Medio principal** a ancho de columna, **16:9** (1057 × 595), radio 6. 13 de 13.
2. **Introducción:** borde superior 1 px `--linea-seccion`, 24 px arriba y 12 abajo. A la izquierda, un **titular**
   Condensed 24 blanco de 1 a 7 palabras (9 de 13); a la derecha, el cuerpo: Regular 16 / 1,25 gris en una caja de
   **493 px**, de 1 a 5 párrafos.
3. **Secciones**, cada una con su **texto** (borde, **rótulo mono** de 11 px a la izquierda, a la derecha un titular
   opcional de 24 px, en 4 de 13 casos, y los párrafos) seguido de **sus filas de medios**. Mediana **5 secciones**
   por caso (de 1 en Washington Post a 14 en Amazon); **2 filas por sección** (p75 5, máximo 15). Las secciones del
   medio (Identity, Application) cargan la mayoría: en Lyft, 0 · 1 · 7 · 6 · 1.
4. **Cita** del cliente, solo en 2 de 13 (Instagram, Rakbank): Condensed 24 blanco, de 42 y 68 palabras, en una caja de
   590 px corrida 234 px a la derecha; firma en mono 11: el nombre en blanco, el cargo en gris.
5. **Cierre «Next up»** (§21.4).

**Las filas de medios tienen cuatro formas, ninguna más** (269 filas en 13 casos):

| Forma | Cajas a 1440 | Filas | |
|---|---|---|---|
| Uno a ancho de columna, **16:9** | 1057 × 595 | 159 (59 %) | Abre la sección en 50 de 73 secciones con medios |
| **Par 4:5 \| 4:5** | 525 × 656 cada uno | 62 (23 %) | |
| **4:5 \| dos 1,62 apilados** | 525 × 656 y 525 × 324 + 8 + 324 | 23 (9 %) | |
| **Dos 1,62 apilados \| 4:5** | lo mismo, al revés | 25 (9 %) | Las dos versiones se alternan |

**El ritmo:** una fila a ancho de columna y una partida se turnan (de 256 pares de filas seguidas, 170 cambian de
una a otra y 63 son dos 16:9); **dos filas partidas seguidas son raras: 23 (9 %)**.

Todas con radio 6 y 8 px entre ellas. **Ninguna va a sangre a 1440**: todas quedan dentro de la columna. Los videos
son medios iguales a las imágenes (se cargan en su marco `--placa`).

**Texto:** párrafos de **8 a 133 palabras, mediana 54** (p25 42, p75 66), de 1 a 15 líneas en la caja de 493 px;
titulares de sección de 1 a 16 palabras, mediana 4. El texto es poco al lado de las imágenes: Lyft tiene 230 palabras
en 5 bloques contra 23 medios en 16 filas. Las páginas miden de 9.078 px (WhatsApp) a 39.589 px (Amazon); Lyft, 11.912.

### 21.3 · Cómo se ve a 390

- **Arriba, el medio principal a sangre en 4:5** (390 × 488, sin radio), con un botón ← en una placa.
- Nombre y bajada en Condensed 23 (dos tintas), la ficha mono y **la introducción en el encabezado**, a 15 px.
- Cada sección: borde, rótulo mono, párrafo a 358 px; sus filas mantienen la forma: el 16:9 a 374 × 210, los pares a
  183 px cada uno (4:5 a 183 × 229; los 1,62 apilados pasan a 183 × 110), radio 6, 8 px.
- **El índice pasa a una barra flotante abajo:** una placa `#141414` con el nombre del caso en mono 11 gris y la
  sección activa en mono 11 blanca sobre `#202020`, con un + que abre el índice
  (`caso-lyft-390-primera.jpg`).
- «Next up» al final, en la página (no fijo), con el título a 23 px.

### 21.4 · El cierre (1440)

«Next up» está **fijo abajo, detrás del caso** (711 px de alto). Al llegar al final, el contenido se corre hacia la
izquierda y se oscurece (la última imagen pasa de x 352 a −706 en el último tramo de scroll) mientras aparece: el
video del siguiente crece de 208 × 117 a 416 × 234, y los textos pasan de opacidad 0 al 95 % del recorrido a 0,31 al
98 % y a 1 al 100 %. Contenido: «NEXT UP» en mono 11 gris; el nombre del siguiente caso (Condensed 32 blanco) y su
bajada (32 gris); un bloque de contacto («Want to discuss a project?» en blanco 14, una frase gris y «GET IN TOUCH»);
y «[ VIEW ALL PROJECTS ] (35)» en mono 11 gris, el corchete de §14 con el conteo verdadero. **El caso no tiene pie.**

### 21.5 · La plantilla de nuestros casos

La misma anatomía, con el método de §13 puesto en el orden de Koto y los datos del inventario:

| Bloque | 1440 | 390 | Contenido |
|---|---|---|---|
| Barra lateral | 320 px pegajosa | Encabezado + barra flotante abajo | Nombre y bajada en dos tintas; ficha mono verdadera (TIPO · AÑO, y «CONCEPTO» en las piezas de concepto, visible sin scroll); índice con punto blanco de 3 px; abajo, créditos de quién hizo qué (sin inventar nombres) |
| Medio principal | 16:9 a 1057 × 595, radio 6 | 4:5 a sangre, sin radio | La pieza entera, plana en su marco: pide **los dos encuadres** (16:9 y 4:5) |
| **Problema** (la introducción de Koto) | Titular 24 a la izquierda, 1 a 3 párrafos a la derecha | En el encabezado | Lo que le pasaba al cliente o al sitio |
| **Hipótesis** (Strategy) | Rótulo mono + 1 o 2 párrafos + 0 o 1 fila (Lyft: 1) | Igual, a 358 px | Qué creíamos y cómo íbamos a saber si funcionó |
| **Solución** (Identity) | Rótulo + párrafos + **el grueso de las filas** (Lyft: 7) | Igual | Lo que se hizo, con los ingredientes verificados (§7) |
| **La pieza** (Application) | Rótulo + 1 párrafo + **el otro grueso** (Lyft: 6) | Igual | La pieza aplicada: pantallas, piezas, sistema; aquí entran los campos claros y de color (§20) |
| **Resultado medido** o **Sin métrica** (Outcome) | Rótulo + 1 párrafo + 1 fila (Lyft: 1) | Igual | El número con instrumento y fecha, o qué no se midió. En un concepto: «Sin métrica: es un concepto, no tuvo usuarios» (el texto final es de Clara) |
| Cita | Solo si existe y con permiso escrito | | Nunca en un concepto; nunca inventada |
| Siguiente | «Siguiente»: nombre y bajada del próximo caso, su medio, contacto y «[ Todo el trabajo ] (n)» | En la página | n es el conteo verdadero del índice |

- **Filas:** solo las cuatro formas de §21.2. La sección abre con una 16:9 (Koto: 50 de 73); una fila partida (par o
  «4:5 + dos 1,62») va después de una 16:9 y no de otra partida (Koto: 9 %). **Ninguna a sangre a 1440.**
- **Largos:** párrafos de 42 a 66 palabras (p25 a p75 de Koto), uno a tres por sección; titulares de 2 a 7 palabras.
- **Cantidad:** el piso es el tercio del área en medios (criterio 6 del encargo); el caso más corto de Koto (WhatsApp)
  tiene 11 filas y 15 medios, con 56 % del área en medios. Un caso nuestro con menos material crece hasta donde llega
  lo real, sin relleno.
- **Color:** los campos de cada caso son los de su marca (§20.2, regla 3) y caben en los techos de §20.3.
- **Movimiento:** el cierre de Koto va atado al scroll (el caso se corre y se oscurece); aquí, como en §3 y §9, nada se
  ata a la posición del scroll: «Siguiente» entra una vez con el resorte **entrada**.
- **Lo que cambia de §13:** el resultado va al final, como el «Outcome» de Koto, y «La pieza» deja de ser una galería
  aparte: son las filas que siguen a cada sección, con el grueso en Solución y La pieza.
