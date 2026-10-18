# Acta de QA · SpindleLab v3 · E12, paso 2 (compuerta 2) · vuelta 1

**Javiera (QA crítico), en subagente limpio.** No vi la conversación de construcción: leí el encargo, el brief (sección
«Compuerta 1» primero), el lock, los inventarios, `direccion-a.md`, `direccion-b.md`, `caminos.md`, `plan-e12.md`, las
fichas y el tablero, y medí los entregables. La corrida empezó el 17-oct (06:00 a 06:15 UTC), se cortó por el límite de
uso y siguió el 18-oct (20:05 a 20:45 UTC) desde mi commit de avance `153d272`, sin rehacer lo ya medido.

- **Rama:** `claude/magical-franklin-ckfki2`. **Auditado:** `12ccecf` (último commit de construcción, el tablero). Entre
  `12ccecf` y el commit de esta acta solo entraron archivos de esta QA (`e12/qa-paso-2/vuelta-1/` y esta acta).
- **Fuentes de verdad:** `e12/encargo-paso-2.md` §7 (los 20 criterios) y la tarea de la corrida (los 7 puntos). **No hay
  `spec-visual.md` del paso 2** (se escribe después de la compuerta 2) ni un `desvios.md`: los desvíos declarados están
  en `direccion-a.md` §9 y `direccion-b.md` §4, §6 y §10, y en el tablero. Contra eso audité.
- **Herramientas, crudos y capturas:** `e12/qa-paso-2/vuelta-1/` (`herramientas/`, `crudo/`, `capturas/`). Chromium
  141.0.7390.37 (`/opt/pw-browsers/chromium-1194`) con el Playwright de `spindlelab-astro/node_modules`; servidor local
  `proto/b/herramientas/servir.mjs` (raíz del repo y `/api/chequeo` de verdad) en un puerto libre, apagado al terminar.
  No reutilicé las herramientas de medición de Lucía: las mías componen el fondo de cada nodo de texto con
  `elementsFromPoint`, multiplican la opacidad heredada y marcan aparte lo que cae sobre un medio.

## Veredicto: **Con reparos**

El tablero se puede mostrar a Ramón: las dos direcciones son distintas de verdad, el render está limpio en los cinco
anchos (0 desborde, 0 contraste bajo AA en 7.792 nodos, 0 errores de consola), los precios calzan con el JSON, los
conceptos están rotulados y el tablero se rehace byte a byte. **Los reparos:** dos defectos mayores en B (el `h1` de los
casos no existe para un lector de pantalla bajo 1024 px, y una fila de Praxi con cifras de ejemplo y personas
generadas sin su pie), el inventario de casos que no se actualizó (Diego) y el criterio 4 del encargo, que pide un
lienzo que cambia y que la medición de Koto no respalda (Mauro). **Plazos:** 1 y 2 antes de construir B, si Ramón la
elige, y antes de que cualquier captura de B salga de la compuerta; 3 y 7 antes de construir el índice; 4 se cierra
con la respuesta de Ramón en la compuerta; el resto, en la construcción de la dirección elegida.

## Lo medido, con evidencia

### Los 20 criterios del encargo (§7)

| # | Criterio | Resultado | Evidencia |
|---|---|---|---|
| 1 | Dos direcciones, cinco vistas, 20 páginas completas y 20 primeras pantallas | **Cumple.** A y B, cinco vistas cada una; en `tableros/e12-direcciones/img/` están las 20 primeras pantallas (1440 y 390) y las 20 páginas completas en tramos | `archivos.json` (127 rutas); `capturas/primera/` (50 primeras mías: 10 vistas × 5 anchos); `capturas/completas/` (20 mías, reducidas) |
| 2 | Letra por dirección; DM Mono 500; ninguna letra sin uso | **Cumple en A. B con un reparo menor (defecto 9).** A: `h1` en Google Sans Flex 300 al 76 %, cuerpo Google Sans Flex, rótulos DM Mono 500; cargan solo esas dos. B: `h1` en Mona Sans 340 al 89 %, cuerpo Mona Sans, datos DM Mono 500; cargan solo esas dos, pero dos `<code>` de Sesenta se pintan en la monoespaciada genérica del navegador | `crudo/medicion-vistas.json` (`fuentes`, `famH1`, `fams`); `herramientas/mono.js` |
| 3 | A y B difieren en lo que carga la pantalla, la escala, el índice y la letra | **Cumple.** A: la cinta de video en la primera pantalla, titular a 48 px, muro de dos columnas (53,0 % de medios en `/trabajo/`). B: titular a 88 px, primera pantalla sin una imagen, tabla con visor (2,9 % de medios). Se ve en las capturas sin leer el texto | `capturas/primera/a-home-1440-primera.jpg`, `b-home-1440-primera.jpg`, `a-trabajo-1440-primera.jpg`, `b-trabajo-1440-primera.jpg`; `crudo/cobertura.json` |
| 4 | Base negra ≥ 80 % fuera de medios en home y `/trabajo/`; la vista 5 cambia de lienzo; ningún servicio con color propio | **Base negra: cumple.** Píxeles fuera de medios con luminancia ≤ 0,01 a 1440: A home 95,3 %, A `/trabajo/` 96,0 %, B home 93,6 %, B `/trabajo/` 90,9 %. Ningún servicio, ruta ni menú con color propio. **Vista 5: no cumple a la letra** (defecto 4): en A el lienzo no cambia (el color entra en la franja de Doceavo y las portadas); en B entra una hoja blanca para los planes (17,0 % de claro fuera de medios), desvío de Koto rotulado. El tablero cita la medición de Koto (koto.com/projects/lyft, 1440, `#F1F0EB` y `#FF00C4`) | `herramientas/cobertura.py` → `crudo/cobertura.json`; capturas de página completa en `capturas/completas/` |
| 5 | Contraste en el render sobre cada lienzo; señal ≥ 3:1 | **Cumple.** 7.792 nodos de texto en las 10 vistas × 5 anchos, compuestos sobre su fondo real: **0 bajo el mínimo**, 0 sobre un medio. El par más justo, gris `#989898` sobre la placa `#141414`, 6,39:1. La hoja blanca de B entra en la cuenta (el gris de la hoja, 6,69:1). Sin color de señal por defecto (rige la opción a del lock §20.4) | `herramientas/medir.mjs` → `crudo/medicion-vistas.json` (`contraste`) |
| 6 | Casos con la estructura de Koto: ficha pegajosa a 1440, ficha arriba a 390, cinco secciones con rótulo en orden, medios ≥ ⅓ | **Cumple, con dos reparos.** A 1440, a media página: el `aside` pegajoso ocupa de 80 a 884 px; B, de 56 a 900. A 390: una columna, la ficha antes de las secciones; B 390, la cabeza móvil con la ficha arriba (pero ver defecto 1). Orden Problema · Hipótesis · Solución · La pieza · Sin métrica (lock §21.5) en las dos; **A no muestra el rótulo «Problema»** (defecto 13). Medios a 1440: A Praxi 49,8 %, A Sesenta 59,1 %, B Praxi 46,5 %, B Sesenta 57,4 % | `crudo/interacciones.json` (`caso`); `capturas/interaccion/caso-*-mitad.jpg`; `crudo/cobertura.json` |
| 7 | Cada número del caso real con fila en el inventario; «Sin métrica» si no hay | **Cumple.** Números de Praxi a la vista: 21-jul a 25-ago-2026, 384 pruebas, 8 reglas, el 22-ago y la cuenta de 16 años, 35 archivos, `exit 0`: todos con fila en `inventario-praxi.md` (§0, §4, §8.1). El párrafo 2 de Hipótesis salió en las dos (su señal no tiene fila). Ningún resultado de negocio | `herramientas/ev.mjs` con `num.js`; `inventario-praxi.md` líneas 28-31, 123, 130-132, 160, 244-251 |
| 8 | Conceptos rotulados a 1440 y 390, sin cifras de resultado ni testimonios, personas ficticias dichas, nombre comprobado, restricciones del rubro | **Cumple.** «Concepto» en la primera pantalla de las 8 páginas de las cuatro piezas a 360, 390, 768 y 1440 (Tonela: barra fija abajo; Ocelo y Sesenta: arriba; Doceavo: arriba a 390 y nota al margen a 1440, la más discreta de las cuatro). En el caso Sesenta, «Concepto» en la ficha a 1440 y 390 y en el sello de la imagen a 768. 0 porcentajes, 0 conteos de clientes o pacientes, 0 testimonios; cada persona dice «ficticia»; Ocelo no promete resultado clínico y Sesenta no promete resultado del caso. Comprobación de nombre (NIC Chile y búsqueda web, con fecha) en las cuatro fichas | `crudo/medicion-conceptos.json` (`primera.concepto`); `capturas/conceptos/*-primera.jpg`; búsqueda de patrones en el texto visible de las 8 páginas (anotada en este acta, §Honestidad) |
| 9 | Índice: entradas reales y los 4 conceptos; conteo = entradas; tipo y ≤ 2 ingredientes con fila | **Cumple en las dos.** «(10)» y 10 entradas (6 reales + 4 conceptos); el filtro «Concepto (4)» deja Sesenta, Tonela, Ocelo y Doceavo y marca `aria-pressed`; cada entrada dice su tipo; las reales llevan 2 ingredientes con fila, los conceptos ninguno (no tienen fila: ver defecto 3) | `herramientas/filtro.mjs` (salida en este acta); `capturas/primera/*-trabajo-*` |
| 10 | Home: declaración y chequeo en la primera pantalla; Desarrollo web primero; Redes y Paid Media en una línea | **Cumple.** A 1440 × 900: `h1` 664-760, campo 659-703, botón 711-755. B 1440 × 900: `h1` 125-383, campo y botón 585-629. A 390 × 844: campo y botón 764-808, **a 36 px del borde**. B 390 × 844: campo 648-692 y botón 700-744, a 100 px. Fuera del criterio, anoto: A a 360 × 800 deja el campo 4 px bajo el borde (804) y a 1024 × 768, 33 px (801). Servicios: Desarrollo web, Visibilidad en IA, Auditoría SEO técnica, Acompañamiento mensual; «También: Paid Media (Google)… y Gestión de redes…» en una línea | `crudo/medicion-vistas.json` (`primera`); `herramientas/ev.mjs` con `orden.js` |
| 11 | Precios y nombres iguales a `oferta-v3.json` y `servicios-v3.json`, como texto | **Cumple.** 0 cifras con «$» fuera de los dos JSON en las 20 lecturas (10 vistas × 1440 y 390); los cuatro planes de Desarrollo web con nombre, precio, línea y todos sus puntos, en A y en B | `herramientas/precios.mjs` → `crudo/precios.json` |
| 12 | Praxi: ingredientes con fila; sin cifras de uso; sin enlace a praxi.coach si no da 200; el repo intacto | **Cumple, con un reparo de honestidad en B (defecto 2).** Los 9 ingredientes del caso tienen fila en `inventario-praxi.md` §4. praxi.coach dio `402 DEPLOYMENT_DISABLED` el 17-oct 05:33 UTC (`datos/estado-praxi.txt`) y ninguna vista lo enlaza (solo lo nombra para decir que no lo enlaza). `git -C /home/user/praxis-coach log -1`: `a360d7a`; `status`: limpio (medido hoy, al cerrar) | `herramientas/pies-praxi.js`; `capturas/evidencia/b-praxi-1440-par-sin-pie.jpg` |
| 13 | IA solo lo que hay; frases prohibidas en cero | **Cumple.** «IA propietaria», «modelo(s) RAG», «despliegue de modelos», «40 %», «+150 %»: 0 en los 10 HTML, las 8 páginas de concepto y el tablero (el único «40%» es un `rootMargin` del JS de Sesenta). Las afirmaciones de IA del producto remiten a Praxi y dicen lo que hace | búsqueda en este acta, §Texto |
| 14 | Texto igual en A y B (diferencias listadas); tuteo; sin raya de golpe; términos explicados; ningún prospecto | **Cumple, con reparos menores (15 y 16).** Todo elemento de Clara está en las dos direcciones salvo los condicionados y declarados; las diferencias A/B que encontré son las 10 que lista el tablero. 0 voseo, 0 «usted» (los «su sitio» son de Verifica y Cumple, en tercera persona), 0 verbos de folleto, 0 rayas de golpe (las rayas de B son celdas vacías de la tabla). Cruce con 747 nombres de `ventas/` (CSV y pipeline): 0 prospectos; el único nombre propio es Bernardo Combeau, el cliente | `herramientas/texto.mjs` → `crudo/texto.json` |
| 15 | Logo: 2 o 3 caminos, en el nav de A y B a 1440 y 390, sobre negro y sobre el lienzo del juego, a 32 y 16 px; sin Koto | **Cumple.** Tres caminos con una idea nombrable cada uno (sin dibujo · signo en la «i» · dos letras en una palabra). Las tres láminas traen el wordmark en A y B, el nav a 1440 y 390 sobre negro y sobre blanco, y el favicon a 16 y 32. Monocromos: sin `#FFE800`, sin oro, sin Gabarito. Licencias OFL copiadas | `e12/logo/laminas/*.png`; `capturas/logos-dpr1.png` |
| 16 | Motion fijo; movimiento reducido quieto; cursor solo con puntero fino; foco visible; pausa en lo que corre > 5 s | **Cumple.** Motion 13.5.0 local en las dos (mismo sha256 `0d94331c…`). Con `reduce`: 0 animaciones corriendo, 0 videos corriendo, sin `autoplay`, 0 bloques escondidos, círculo en `display: none` (A) o inexistente (B), pantalla idéntica a los 2 s (B Desarrollo web cambió en la primera pasada; repetido el 18-oct, 0 píxeles distintos). Táctil: `(pointer: fine)` falso y sin círculo en las dos. Tab: 0 paradas sin contorno o con contorno bajo 3:1 a 1440 y 390. Los siete videos que corrieron solos más de 5 s (A: la cinta, los dos de Praxi y Sesenta; B: los dos de Praxi y Sesenta) tienen botón de pausa enfocable y Enter los pausa; el visor de B corre solo al pasar o enfocar una fila | `crudo/interacciones.json`; `herramientas/tactil.mjs`, `circulo.js`; `capturas/interaccion/foco-*` |
| 17 | Sin desborde a 360, 390, 768 y 1440; un `h1`; nada bajo 11 px; 0 errores de consola | **No cumple en B (defecto 1).** Desborde: 0 en las 50 combinaciones (10 vistas × 360, 390, 768, 1024 y 1440), tal cual y con `overflow` quitado de `html` y `body`; ningún elemento pasa el borde. Texto más chico: 11 px. Consola: 0 errores. `h1`: uno visible en las 50, **salvo B Praxi y B Sesenta a 360, 390 y 768**, donde el único `h1` está en un `aside` con `display: none` | `crudo/medicion-vistas.json` (`desborde`, `estructura`); `crudo/h1-casos-b.txt` |
| 18 | `spindlelab-astro/` sin tocar; nada publicado; 0 generación pagada | **Cumple.** `git diff 62ffcad~1 HEAD -- spindlelab-astro/`: vacío (tampoco cambian el manual, `CLAUDE.md`, `ventas/` ni el plan). Higgsfield, leído hoy: 0 créditos, plan gratuito, último gasto el 21-sep-2026 (ninguno desde el encargo). Gemini y OpenAI: no hay clave ni rastro en el repo; no lo puedo comprobar desde afuera | `mcp__higgsfield__balance` y `transactions` (18-oct) |
| 19 | El tablero se rehace con su script; contrato del Artifact; ≤ 16 MB la página | **Cumple, con un reparo menor (defecto 18).** Copié la obra a una carpeta temporal, borré `tablero.html`, `archivos.json` y los 39 derivados (`img/t-*`, `video/t-*`) y corrí `armar-tablero.py`: los 41 archivos salen **idénticos byte a byte** (md5), en 40 s. Página de 90.150 bytes, sin doctype ni `html`/`head`/`body`, `title` de 3 palabras, `viewport-fit-sides`, hojas solo de Google Fonts, 0 scripts externos | `crudo/reproduccion-tablero/` (log y md5) |
| 20 | Los dos detectores y las tres pruebas, con veredicto | **Hecho**, abajo | |

### Los siete puntos de la corrida

1. **Criterios:** la tabla de arriba.
2. **Dos direcciones distintas que siguen a Koto y la regla del negro:** distintas en composición (A: el trabajo a
   sangre y la frase en una esquina; B: la frase a cartel y el instrumento), escala (48 contra 88 px), índice (muro
   contra tabla con visor) y letra. Las dos: lienzo `#060606` en todas las páginas, ningún texto de interfaz sobre un
   medio (0 de 7.792), el color dentro de los marcos del trabajo. Desvíos de Koto, todos declarados: la hoja blanca de B
   (lock §20.2, regla 5), los campos de Praxi bajo el piso del 10 % (A 6,0 %, B 8,8 %, por la marca de un solo acento),
   el corte de A en 1024. Uno sin declarar del todo: los mockups de dispositivo de B (defecto 8).
3. **Render a 360, 390, 768, 1024 y 1440:** 0 desborde con y sin recorte; 1 `h1` visible salvo el defecto 1; AA en todo
   texto, también sobre la hoja blanca; foco visible con Tab; movimiento reducido quieto; imágenes: 0 rotas (la única
   «no cargada» es la portada 4:5 de Sesenta, oculta y diferida a 1024 y 1440); videos: los de A y los casos de B en
   `readyState` 4; el visor de B no tiene `src` hasta que pasas o enfocas una fila (diseño, no falla).
4. **Honestidad:** conceptos rotulados en la primera pantalla de cada captura, sin cifras ni testimonios, nombres que
   suenan inventados (Tonela, Ocelo, Sesenta, Doceavo; las fichas dicen por qué y que los de 01 a 03 ya eran de alguien).
   Casos reales solo con lo verificable. **Una falla:** la fila de B del defecto 2. Ningún prospecto. Ninguna generación
   pagada.
5. **Texto:** el JSON de Clara, tal cual, comparado por script (los «faltantes» de `crudo/texto.json` son notas para
   el armador, las columnas partidas de la tabla de B, la ficha de A en una línea mono y los condicionados; los
   revisé uno por uno y en todos el texto está). Términos técnicos: explicados en la home y en Desarrollo web (SEO
   técnico, schema, indexación, AEO/GEO, CMS en el glosario); **no** en la línea mono del índice (defecto 16). Sin raya
   de muletilla. Precios: idénticos.
6. **Logo:** los tres caminos, en blanco sobre `#060606` y en negro sobre blanco, a 24 y a 16 px de alto y a dpr 1, se
   leen como «SpindleLab» (`capturas/logos-dpr1.png`). Favicon a 16: «S» y «SL» se leen; el huso del camino 2 es un
   signo y no una letra, y a 16 px se lee como cerradura o alfiler, el riesgo que Bruno ya dejó escrito.
7. **El tablero:** contrato arriba (criterio 19). Render a 360, 390, 768 y 1440: 0 desborde con y sin recorte, 1 `h1`,
   0 saltos de encabezado, 572 a 578 nodos de texto con 0 bajo AA y 0 bajo 11 px, 103 imágenes que cargan (las
   diferidas, al forzarlas), 8 videos con metadata y ninguno corriendo solo, 0 errores, terceros solo
   `fonts.googleapis.com` y `fonts.gstatic.com`, foco visible (también en los videos:
   `capturas/evidencia/tablero-1440-foco-en-video.png`). Peso: 49.776.206 bytes en 128 archivos (la página y 127
   rutas); la imagen mayor 446.707 bytes, el video mayor 2.574.964. `archivos.json`: las 127 rutas existen y no falta
   ninguna de las que el HTML referencia (`src`, `poster`, `href`, `url()`). Cabe en una sola publicación (≤ 255
   archivos y ≤ 64 MB). `herramientas/tablero.mjs` → `crudo/tablero.json`, `capturas/tablero/`.

### Honestidad, la búsqueda

En el texto visible de las 8 páginas de concepto busqué porcentajes, conteos de clientes, pacientes, casos o años,
testimonios (cita con firma), títulos con nombre («Dr.», «abogado», «contadora» + nombre) y promesas (garantiza,
asegura, éxito). Resultado: ninguna cifra de resultado, ningún testimonio; los nombres propios (los dos oftalmólogos de
Ocelo, los abogados de Sesenta, la contadora de Doceavo) van con «Persona ficticia» o «no existe»; las promesas que
aparecen son negaciones («ninguna cirugía garantiza», «no te lo podemos asegurar»). El JSON-LD de las ocho declara la
ficción (`disambiguatingDescription`) y ninguno trae `Review` ni `AggregateRating`; el de B Sesenta, igual.

## Defectos

Severidad de la plantilla: **bloqueante** (no lo puede ver Ramón así), **mayor** (se ve, pero no cumple un criterio),
**menor** (se arregla si no cuesta o queda pendiente). No hay bloqueantes.

| # | Severidad | Dueño | Dónde | Qué está mal | Contra qué | Cómo se cierra |
|---|---|---|---|---|---|---|
| 1 | Mayor | Lucía B | `proto/b/trabajo/praxi/` y `proto/b/trabajo/sesenta/`, a 360, 390 y 768 | El único `h1` está dentro de `aside.caso__lateral`, que bajo 1024 px va en `display: none`; el título que se ve es un `<p class="caso__titulo" aria-hidden="true">`. Bajo 1024 la página no tiene `h1` y el lector de pantalla no oye el nombre del caso | Criterio 17; lock §15 («un `h1` por página») | El título visible de la cabeza móvil pasa a ser el `h1` (o el `aside` se oculta solo a la vista) y sale el `aria-hidden`. Se mide: un `h1` con `getClientRects()` en 360, 390, 768, 1024 y 1440 (`herramientas/h1-caso-b.js`) |
| 2 | Mayor | Lucía B | `proto/b/trabajo/praxi/`, Solución, la fila «`c-praxi-390-conversacion` · `c-praxi-390-portada`» | La fila no lleva pie: la conversación muestra cifras de ejemplo (3×10, 60 kg, RIR 2, «semana 3») y la portada muestra a las personas generadas con IA, sin «Los números… son de ejemplo» ni «Las personas… están generadas con IA». El pie que hay encima es de la imagen anterior | Punto 4 de la corrida («ninguna pantalla de Praxi con datos falsos presentados como reales»); regla de los pies de Clara en `texto-paso2.json` | Los dos pies bajo la fila. Se mide con `herramientas/pies-praxi.js`: cero medios con cifras o personas sin su pie. Captura: `capturas/evidencia/b-praxi-1440-par-sin-pie.jpg` |
| 3 | Mayor | Diego | `e12/inventario-casos.md` y `.json` | No se actualizaron con el encargo §5 (último commit `b3a1105`, paso 1): **sin filas de los cuatro conceptos** (sus fichas, §6, dejan los ingredientes «para la fila del inventario que lleva Diego»); la columna de permiso de Combeau sigue en «Verbal… sin respaldo escrito» y el párrafo «Lo que el permiso de Combeau no cubre» sigue prohibiendo publicar una medición fechada y grabar su sitio, mientras A y B muestran «805 kB → 95 kB (16-oct-2026)» y capturas de su sitio; **no están las grabaciones de Combeau** (B lo dice en su §10) ni **la nota de una página de Simón** con la capa de señales de `/trabajo/<caso>/`; Raigal sigue como entrada | Encargo §5 y §3.4; regla del inventario («una etiqueta o un número que no tenga fila no existe») | Filas de los cuatro conceptos con los ingredientes de sus fichas; permiso «Ramón, 16-oct: no se necesita más permiso»; grabaciones o hueco nombrado; Raigal a «fuera del índice»; la nota de Simón; commit propio |
| 4 | Mayor | Mauro | `e12/encargo-paso-2.md`, criterio 4 y §2 vista 5 | Piden que la vista 5 cambie el lienzo. El lock §20.6 midió que Koto no lo hace en ninguna de 640 paradas y pidió ajustar el criterio; el encargo sigue igual (su historial tiene una fila). Resultado: A lo incumple a la letra y B lo cumple con un desvío de Koto rotulado. El tablero se lo pregunta a Ramón («Una interior con el lienzo claro: no… si lo quieres igual, se construye como desvío») | Defecto del encargo: un criterio que la referencia que manda (compuerta 1, punto 7) no respalda | Con la respuesta de Ramón en la compuerta, Mauro reescribe el criterio 4 y la vista 5, con su fila en el historial |
| 5 | Menor | Lucía tablero | `tablero.html` | El encargo §2 pide las vistas con Motion de verdad y las demos del paso 1 (mouse, **teclado, movimiento reducido, teléfono sin círculo**). El tablero trae capturas, cuatro recorridos grabados con el mouse y dos estados (cursor y chequeo): ninguna demo de teclado, reducido ni teléfono, y ninguna vista viva (piden los servidores locales) | Encargo §2, «Movimiento en el tablero» | Sumar las tres demos (grabadas o como estados) o decir en el tablero por qué no van; si se quieren vivas, publicar `proto/` con el tablero |
| 6 | Menor | Lucía A | `e12/lock-koto.md` §6.4, §16, §17 y §19 | §6.4 sigue con un solo sistema en Mona Sans, con la fila «Portada (dirección A) · Mona Sans»; §16 no tiene la primera pantalla de A con el chequeo ni el eje de la letra; §17 sigue diciendo «tinta `#111111` y la señal, cobalto». Sin fila en §19 para estos tres | Encargo §6, puntos 4, 5 y 6 | Dos sistemas con su interlínea medida (A 1,35, B 1,4, ya calculadas en `direccion-a.md` §2 y el lock §6.4), §16 y §17 al día, fila en §19 |
| 7 | Menor | Bruno | `marketing/portafolio/README.md` | Sin actualizar (último commit `8c78b75`): la tabla lista solo 01 a 03, dice que Raigal está «en el sitio» y que «Ramón eligió una sola pieza de concepto»; no lista 04 a 07 ni dice que los nombres de 01 a 03 ya son de empresas reales (`plan-e12.md` §1) | Encargo §3 («Bruno actualiza el README») | README con las cuatro piezas, 01 a 03 como primera serie fuera del índice y el hallazgo de los nombres |
| 8 | Menor | Lucía B | `proto/b/`: visor del índice y de Desarrollo web (`v-combeau-fotografia`, `v-combeau-modelo`, `v-verifica-y-cumple`) y «Cada pieza, con su prueba» (`p-combeau`) | Usa los mockups de dispositivo (portátil y teléfono) de `spindlelab-astro/public/assets/img/obra/mock-*`. El lock pide capturas y grabaciones planas en su marco; B declara la falta de grabaciones solo para Combeau modelo y Verifica y Cumple, no para Combeau fotografía | Lock §13 punto 5 y §21.2; desvío sin declarar del todo | Capturas planas (A ya las tiene de los sitios vivos) o el desvío declarado en `direccion-b.md` |
| 9 | Menor | Lucía B | `proto/b/trabajo/sesenta/`, párrafo del sello | `<code>#22408A</code>` y `<code>#F3F1EA</code>` en la monoespaciada genérica del navegador (`monospace`, 16 px), una tercera letra | Criterio 2 | `code` con DM Mono B, o sin `code` |
| 10 | Menor | Lucía B | `proto/b/fuentes/mona-sans-var-b.woff2` | Es una versión modificada (instanciada a wdth 85-100 y wght 300-420) que conserva el nombre interno «Mona Sans»; la OFL de Mona Sans reserva el nombre «Mona» | `OFL-mona-sans.txt` (Reserved Font Name), OFL §3 | Para la construcción: el archivo completo, o la versión recortada con otro nombre interno |
| 11 | Menor | Lucía A | `proto/a/`, a 390 | Áreas de toque bajo los 44 px: el logo, 108 × 20 (encabezado y pie); «hola@spindlelab.cl», 125 × 14; «O directo a hola@spindlelab.cl», 176 × 17 | Lock §15 («44 px de área a 390») | 44 px de alto con relleno. Se mide con `herramientas/area-toque-390.js` (`crudo/area-toque-390.txt`) |
| 12 | Menor | Lucía B | `proto/b/`, a 390 | Filas del índice de 358 × 28 (home y `/trabajo/`); migas «Inicio» 42 × 11 y «Servicios» 62 × 11 en Desarrollo web; «Menú» 36 × 44 | Lock §15 | Igual que el 11 |
| 13 | Menor | Lucía A | `proto/a/trabajo/praxi/` y `sesenta/` | La sección Problema no lleva rótulo mono a la vista (solo `aria-label`): 4 rótulos visibles contra «cinco secciones con su rótulo». B sí lo lleva | Criterio 6 (el lock §21.5 trata Problema como la introducción de Koto, sin rótulo: el criterio y el lock no dicen lo mismo) | Rótulo «Problema», o el desvío declarado citando §21.5 |
| 14 | Menor | Lucía A | `proto/a/servicios/desarrollo-web/`, «Lo que construimos» | Bajo las portadas va la línea completa con herramientas y no `linea_corta` (tipo y año). Lo declaró el tablero y sigue abierto | `texto-paso2.json` (`linea_corta`), lectura fría, punto 9 | `linea_corta` |
| 15 | Menor | Clara | `e12/texto/texto-paso2.json`, entrada spindlelab.cl, campo `resultado` | «36 de 100 … 73» es un puntaje propio sin la condición que sí lleva el 54 → 94 de Verifica y Cumple (los dos esperan el sí de Ramón, encargo §10.3); B lo muestra por defecto en la columna Resultado | Encargo §10.3; lock §13 («Decide Ramón») | La misma condición que Verifica y Cumple |
| 16 | Menor | Clara | Línea mono del índice en A y B (`/trabajo/`) | Decap CMS, Netlify Image CDN, Cloudflare Pages Functions y API de Anthropic van sin lo que le hacen al cliente; la nota remite al caso, pero de las seis entradas reales solo Praxi tiene caso. La lectura fría lo marcó como jerga en los tres lectores | Criterio 14; brief §2 | Lo decide la dirección elegida (lock §14 los pone en la línea mono): o salen del índice, o la nota cambia. Queda escrito para la construcción |
| 17 | Menor | Bruno | `marketing/portafolio/04-tonela/sitio/` | La «t» de tonelada de las bandas va a 6,45 a 9,2 px (360 a 1440), texto HTML que lee un lector de pantalla | Piso de 11 px de la casa (lock §15), aplicado a una pieza que se muestra en el sitio | 11 px, o `aria-hidden` con la capacidad completa en la etiqueta |
| 18 | Menor | Lucía tablero | `tablero.html` | Un solo tema (`color-scheme: dark`), sin `@media (prefers-color-scheme)` ni `:root[data-theme]`: no responde al tema claro del visor. `verificar.mjs` revisa los tokens en `:root` y el fondo del `body`, no esto | Contrato del publicador (tokens redefinidos para los dos selectores) | Declarar los selectores aunque repitan el negro, o decir en el tablero por qué es de un solo tema |
| 19 | Menor | Lucía A | `direccion-a.md` §0 y §1 | Dice que el recorrido de `/trabajo/` dura 12,4 s; mide 12,72 s (`ffprobe`); el tablero dice bien 12,7 | Exactitud del documento | Corregir la cifra |

## Detector anti-slop

### `estudio-web/antislop-web.md` §E

```
COPY         [x] sin verbos de folleto (0 en las 20 lecturas)   [x] sin relleno de apertura
             [x] sin tricolon automático   [x] sin «no solo X sino Y» (0)
             [x] sin pregunta retórica ni «¿Listo para…?» (las de B son los títulos del chequeo de producción y las del FAQ son las de los lectores)
             [x] sin Title Case   [x] es-CL con tú (0 voseo, 0 usted)
             [x] sin raya como remate   [x] cero prueba social sin respaldo
             [ ] borrar 30 % no mejora la página: abierto en B /trabajo/ y Praxi, donde la tabla y la placa de datos suman texto; es el sacrificio que B declara (lock §16, direccion-b §9)
ESTRUCTURA   [x] sin tres tarjetas idénticas (las tres portadas de A en Desarrollo web son un extracto del índice, no tarjetas)
             [x] sin «¿por qué elegirnos?»   [x] FAQ con preguntas reales (las de la lectura fría)
             [x] sin fila de métricas inventadas   [x] formulario de un campo
             [x] hero que no es 100vh vacío   [x] orden del brief §3
CÓDIGO       [ ] landmarks + un h1: abierto por el defecto 1 (B, casos bajo 1024)
             [x] sin valores por defecto sin justificar   [x] sin degradé ni vidrio   [x] sin emoji
             [x] alt reales (revisé los de Praxi contra cada imagen)   [x] foco, AA y label del campo
             [x] imágenes con width y height; font-display: swap; letras precargadas
             [ ] JSON-LD + canonical + OG: abierto. B trae JSON-LD parseado en las 5 vistas (el concepto declarado como ficción); A no trae ninguno, declarado en direccion-a §9.6; ninguna trae canonical ni OG. Son prototipos noindex; la capa es de Simón y su nota falta (defecto 3)
             [x] índice, sitemap y ?v=N: no aplica, nada se publica
VISUAL       [x] detector de refero-design corrido (abajo)
PRUEBAS      [x] logo tapado   [x] rubro cambiado   [x] leído en voz alta (abajo)
```

### `refero-design/references/anti-ai-slop.md`

```
[x] acento sin índigo ni violeta (el violeta de Tonela es el de 1 t en la EN 1492, dentro de un concepto)
[x] tarjetas solo con interacción (el panel del chequeo de B; la hoja de B es un campo, desvío declarado)
[x] sin franja lateral   [x] sin emoji de icono
[x] oscuro porque lo pidió Ramón (compuerta 1, punto 6)
[x] sin serif editorial   [x] sin tierra   [x] sin palabra suelta destacada (las dos tintas son la frase entera, medida en Koto)
[x] rasgos fuertes de Koto preservados (negro, retirada, caso, color en el trabajo); B suma solo la tabla y el riel de A&P, declarados
[x] roles de token preservados, salvo la hoja de B (declarada)
[ ] rol del medio preservado: abierto en B. Su primera pantalla de home no tiene imagen y /trabajo/ tiene 2,9 % de medios; es el sacrificio de B en el lock §16, y lo que reemplaza la imagen es un instrumento verdadero (el chequeo), no un dibujo falso. Los mockups de dispositivo del defecto 8 son el punto débil
[x] mayúsculas con +0,03em   [x] letras con razón (elegidas por Ramón)   [x] colores medidos
[x] tensión: A la frase en la esquina contra la cinta; B la frase a cartel contra el riel vacío
[x] cada decisión con su porqué escrito (direccion-a §2, direccion-b §2)
```

### Pruebas de fuego

- **Logo tapado.** A: queda la cinta con el trabajo de verdad y el chequeo al lado; es de este estudio por lo que
  muestra, no por la forma (la forma es la de Koto). B: queda la frase a 88 px y la regla de 21 tramos del chequeo, que
  ningún otro estudio tiene. Pasan las dos; A pasa por el contenido y B por el instrumento.
- **Rubro cambiado.** Con el texto de una inmobiliaria, la regla de 21 señales de B no tiene sentido; la cinta de A
  calzaría en cualquier estudio de diseño, pero no en otro rubro. Pasan.
- **Leído en voz alta.** «Diseñamos y programamos sitios a medida. Y los dejamos listos para que Google y ChatGPT
  puedan leerlos.» Suena a alguien explicando qué hace. Pasa (y es la que eligieron los tres lectores fríos).

## Lo que está bien y no hay que perder

- **El negro de Koto se sostiene medido:** 90,9 a 97,4 % de negro fuera de medios y cero texto de interfaz sobre un
  medio en 7.792 nodos. El color lo pone el trabajo.
- **Accesibilidad hecha, no prometida:** reducido de verdad quieto, foco visible en cada parada, pausa con teclado en
  cada video que corre más de 5 s, cursor solo con puntero fino.
- **Honestidad en los conceptos:** rótulo en cada primera pantalla, personas ficticias dichas, la ficción también en el
  JSON-LD, y los nombres comprobados en dos pasos, que encontraron que 01 a 03 ya eran de alguien.
- **El tablero se rehace desde cero idéntico**, incluidos los H.264, y explica cada diferencia de texto entre A y B.
- **El chequeo corre de verdad** en las dos (30/100 sobre `example.com` en mi corrida), con los textos de producción.

## Lo que no medí

El cursor y el velo del índice con un mouse real (mi movimiento por script no disparó el hover; Lucía los midió y los
recorridos los muestran); Safari (los videos de los casos van solo en VP9, declarado en `direccion-a.md` §9.7); el
contraste del cobalto opcional de A (`?senal=cobalto`), que no va por defecto; si Gemini u OpenAI se usaron fuera del
repo.

## Historial

| Fecha | Qué | Origen |
|---|---|---|
| 18-oct-2026 | Vuelta 1: veredicto con reparos, 19 defectos (4 mayores, 15 menores) | Javiera, en subagente limpio, desde su avance `153d272` |
