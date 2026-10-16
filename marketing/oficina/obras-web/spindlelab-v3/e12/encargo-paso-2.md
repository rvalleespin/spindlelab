# E12 · Encargo del paso 2: lo que la compuerta 2 tiene que mostrar

**16-oct-2026, 19:50 (Chile) · Mauro** · rama `claude/magical-franklin-ckfki2` · **manda** la sección «Compuerta 1» de
`e12/brief-de-obra.md` (nueve puntos de Ramón, 16-oct, 19:20 a 19:45), después el resto del brief, `lock-koto.md` e
`inventario-casos.md`. Para **Lucía** (dirección de arte, las dos direcciones y el tablero), **Bruno** (las cuatro
piezas de concepto y los caminos de logo), **Clara** (el texto), **Diego con Simón** (el inventario que falta, el
material grande y la capa de señales) y **Javiera** (la QA, en subagente limpio). Aprueba **Ramón**, en la compuerta 2.

**Lo que no se mueve en este paso:** nada se publica; **`spindlelab-astro/` no se toca**, y los prototipos viven en
`marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/`; precios y oferta idénticos a
`spindlelab-astro/src/data/oferta-v3.json` y `servicios-v3.json`; casos reales solo con lo medido; cero prueba social
inventada; ningún prospecto nombrado; **ninguna generación pagada de imágenes o video sin el OK de Ramón** (Higgsfield,
Gemini u OpenAI: si hace falta, se cotiza proveedor, cantidad y costo, y se le pregunta en un solo mensaje antes de
gastar).

---

## 0 · En una línea

Ramón elige entre **dos direcciones sobre base negra, A · Archivo y B · Banco**, cada una con su letra, mirando cinco
vistas por dirección a 1440 y 390, con el texto nuevo, el portafolio con los casos reales y **cuatro piezas de
concepto**, y **dos o tres caminos de wordmark**. Dos direcciones, nunca tres.

## 1 · Las dos direcciones

Comparten el lock (cursor, resortes, reglas y techos de §14, accesibilidad de §15) y lo que este paso rehace (§6): la
paleta sobre negro con su juego de color y la mono. Difieren en los ejes del lock §16 **más la letra**:

| Eje | **A · Archivo** | **B · Banco** |
|---|---|---|
| Letra (compuerta 1, punto 8) | **Google Sans Flex** (display wdth 76 · wght 300; cuerpo wdth 100 · wght 370, lock §6.2) | **Mona Sans** (display wdth 89 · wght 340; cuerpo wdth 100 · wght 390, lock §6.2 y §6.4) |
| Mono | DM Mono 500 | DM Mono 500 |
| Lo que carga la pantalla | El trabajo: capturas y grabaciones a sangre en su marco | El dato vivo: el chequeo y sus lecturas, la ficha de cada pieza |
| Escala del titular | La de Koto: 48 / 38 / 24 a 1440 | La declaración grande en el corte condensado liviano |
| Índice | El muro de dos columnas con tres proporciones | La lista en tabla con filetes y la pieza al pasar o enfocar |

**El riesgo de A, dicho en el tablero junto a ella:** Google Sans Flex es la letra de los productos de Google, y un
estudio que vende aparecer en Google, escrito con ella, puede leerse como «de Google» (lock §6.2). Ramón la eligió
sabiéndolo; el tablero lo deja a la vista para que lo pese mirándola.

**Lo que no puede pasar** (lock §16): que A y B queden iguales salvo la letra o la escala; que alguna repita los
tokens de E10 (ciruela, resaltador, Instrument Sans, Plex) o el sistema de driftime (un campo de color por servicio);
o una tercera dirección «para que elija».

## 2 · Las cinco vistas de cada dirección, a 1440 y 390

Cada vista, en página completa y en su primer viewport (1440 × 900 y 390 × 844), con texto real.
**Total: 2 direcciones × 5 vistas × 2 anchos = 20 páginas completas, y sus 20 primeros viewports.**

| # | Vista | Lo que tiene que tener | Material |
|---|---|---|---|
| 1 | **La home** | El orden del brief §3: la declaración y el chequeo en la misma pantalla, como su prueba (compuerta 1, punto 1) → índice corto de obra → Craft y Logic lado a lado, con datos reales → servicios, Desarrollo web primero, y Redes y Paid Media en una sola línea → quién está detrás → contacto. El chequeo es el de verdad (`/api/chequeo` o su respuesta guardada, dicho en el tablero) | Inventario §2 a §6 |
| 2 | **`/trabajo/`, el índice** | Los casos reales del inventario y **las cuatro piezas de concepto**. Cada entrada: nombre, bajada, y una línea mono con su tipo (Cliente, Propio o Concepto) · año · hasta dos ingredientes (lock §7 y §14). El conteo visible es el número de entradas. El filtro por tipo, si va, filtra de verdad | Inventario actualizado (§5 de este encargo) y las portadas de los conceptos (§3) |
| 3 | **Una página de caso real, al estilo de Koto** | La estructura medida (compuerta 1, punto 4; lock §13): ficha lateral pegajosa con nombre, bajada, ficha mono verdadera e índice de secciones con la activa marcada; secciones Problema · Hipótesis · Solución · Resultado medido o «Sin métrica» · La pieza; imágenes y grabaciones grandes; el siguiente caso al final. **El mismo caso en A y en B** | Supuesto (§9): **Combeau**. Praxi, si su material alcanza |
| 4 | **Una página de caso de concepto** | La misma estructura, con «Concepto» visible sin scroll, el problema real del rubro, lo que se diseñó y programó, y en vez de resultado: «Sin métrica: es un concepto, no tuvo usuarios» (o lo que escriba Clara con ese sentido). Identidad, sitio y movimiento de la pieza a la vista. **La misma pieza en A y en B** | La pieza que Bruno lleve más lejos (§3) |
| 5 | **Una página interior que muestre el juego de color** | El lienzo cambia de negro a blanco o a otro color, en la página entera o por secciones, como lo hace Koto medido (§6.1). Si lleva precios, idénticos a los JSON | Supuesto (§9): `/servicios/desarrollo-web/`, la puerta del estudio |

**Movimiento en el tablero:** las vistas corren con Motion de verdad (no capturas de un estado), con las demos del
paso 1 (mouse, teclado, movimiento reducido y teléfono sin círculo), y los clips de los conceptos con su botón de pausa.

## 3 · Las cuatro piezas de concepto (Bruno, con Lucía)

Ramón: «no solo es poner cosas medidas si no que también mostrar el nivel de trabajo que puedo llegar a hacer». Una
por rubro que vendemos: **industrial B2B, clínica, estudio legal y servicios**. Las reglas de
`marketing/portafolio/README.md` no se mueven: rótulo «Concepto» visible sin scroll y en una captura de la primera
pantalla; marca inventada que suena inventada; cero cifras de resultado; cero testimonios; las restricciones reales
del rubro (clínica: ninguna promesa de resultado clínico y los profesionales dichos como ficticios; estudio legal:
ninguna promesa de resultado de un caso).

**Para la compuerta 2, cada pieza trae:**

1. **Identidad:** nombre con su comprobación (búsqueda del dominio `.cl` y una búsqueda web, con fecha, y por qué
   suena inventado), wordmark, colores con su rol y la letra con su licencia, en una lámina.
2. **Sitio:** el primer viewport de su home a 1440 y 390, en HTML de verdad renderizado. La pieza de la vista 4 trae
   su home completa.
3. **Movimiento:** un clip de 5 a 10 s grabado del navegador desde el HTML que lo produce (no generado), con el
   HTML guardado al lado.
4. **Ficha:** `marketing/portafolio/0N-<marca>/ficha.md`, como las tres que hay, con los ingredientes que de verdad
   usa la pieza (tienen fila en el inventario, §5).

**Las cuatro, opuestas entre sí** en lienzo, letra, temperatura y densidad (README, «Las piezas se construyen como
opuestas»). Su identidad es la del trabajo, no la de SpindleLab: **las mismas cuatro piezas van en A y en B**, y lo que
cambia es cómo las presenta cada dirección. Son el color del sitio, como en Koto, donde el color lo pone el trabajo.

**Supuesto de partida** (§9): Raigal (clínica), Aplomo (industrial B2B) y Deslinde (estudio legal) ya existen en
`marketing/portafolio/` y se rehacen al nivel que pide Ramón; la cuarta, servicios, es nueva. Si un nombre no pasa la
regla 2, Bruno lo cambia y lo dice. Bruno actualiza el README: la decisión de «una sola pieza de concepto» queda
superada por la compuerta 1 (punto 5).

**Imágenes:** lo propio del oficio dibujado (README, «Lo que se aprendió en la primera pieza»), capturas propias o
fotos de banco gratuitas que pasen el tell #9 del detector, con su licencia anotada. Nada generado con pago sin el OK
de Ramón.

## 4 · Los caminos de logo (Bruno)

Dos o tres caminos de wordmark para SpindleLab (compuerta 1, punto 9). **Cada camino difiere de los otros en algo
nombrable** (forma de la letra, construcción, un signo propio), no son tres variaciones de uno. Cada uno trae:

- el wordmark en el nav de A y en el de B, a 1440 y a 390, sobre negro y sobre el lienzo del juego de color;
- a 32 y a 16 px (favicon), legible;
- una línea con lo que toma de la referencia sin copiar el logo de Koto (ni su forma ni su amarillo `#FFE800`);
- la letra de partida con su licencia, si parte de una.

Ninguno usa el oro `#C9A227` ni Gabarito por obligación del manual antiguo (compuerta 1, punto 7). El dibujo final va
con la dirección elegida, después de la compuerta 2. Entrega en `e12/logo/` (`caminos.md` y las láminas).

## 5 · El inventario que falta (Diego, con Simón)

En `e12/inventario-casos.md` y su `.json`, con la misma regla: **una etiqueta o un número que no tenga fila no existe.**

- **Praxi** (compuerta 1, punto 3). Lo que se verifica en `/home/user/praxis-coach`, un clon de solo lectura (Next.js
  14, Supabase, la API de Anthropic; lee su `CLAUDE.md` y `docs/encargos/bitacora-diseno.md` antes de abrir nada):
  ingredientes con lo que le hacen al usuario, qué está medido y con qué instrumento, qué no. **En ese repo nunca se
  hace commit ni push, no se crea un `.env`, no se llama a su Supabase, a la API de Anthropic ni a Mercado Pago, y no
  se toca su producción.** Si hay que construir algo para capturarlo, en una copia fuera de los dos repos (el
  scratchpad de la sesión); a este repo solo entran capturas y grabaciones. Lo que necesite una cuenta o el backend
  para verse, sale del material que ya está en su repo (`brand/`, `public/`) o queda como hueco nombrado. Si alguna
  imagen de su campaña es generada, el caso lo dice. El estado de `praxi.coach` se mide el día del tablero (daba 402
  el 23-sep) y se guarda la respuesta.
- **Combeau** (punto 2): las grabaciones de `bernardocombeau.cl` y `bernardocombeau.cl/modelo/`, sin enviar
  formularios. Su panel necesita una sesión iniciada: si no la hay, queda como hueco nombrado y no se pide la clave
  por el chat. La columna de permiso pasa a «Ramón, 16-oct: no se necesita más permiso», dicho por él.
- **Las cuatro piezas de concepto:** una fila por pieza con sus ingredientes reales, sin métrica por regla.
- **Simón:** una nota de una página con la capa de señales de las rutas nuevas (`/trabajo/<caso>/` real y de
  concepto): qué JSON-LD lleva cada una y qué no puede declarar. Una pieza de concepto nunca se declara como cliente ni
  lleva `Review` o `AggregateRating`.

## 6 · Lo que el paso 1 deja superado y Lucía rehace

En `lock-koto.md`, con su fila en el §19:

1. **§6.1 · Medir cómo juega Koto con el color.** Las cuatro páginas medidas en el paso 1 son negras del 85 al 96 % de
   los píxeles fuera de los medios. Falta lo que Ramón vio: en qué páginas o secciones el lienzo pasa a blanco o a
   otro color, cuánto de la página, cómo cambia (corte o transición, con el scroll o por página) y el contraste del
   texto en cada lienzo, a 1440 y 390, con URL y capturas. Al escribir esto hay una carpeta en curso,
   `e12/medicion/koto/paso2/`, sin commit.
2. **§1 y §5 · La paleta sobre negro**, con un rol por token y su contraste. **El color de señal se decide de nuevo:**
   el cobalto `#0029FF` sobre `#060606` da 2,66:1 (calculado), bajo el 3:1 de una forma y el 4,5:1 de un texto. El rol
   de A&P (la prueba de que la retirada funciona en claro) cambia: dice qué le queda.
3. **El juego de color, contra driftime.** El 15-oct Ramón rechazó de driftime «los colores de campo» (un color por
   servicio sobre negro) y no marcó el negro (`spec-visual.md` §7, fila del 15-oct). El lock dice en qué se diferencia
   este juego de ese, en una frase que se compruebe mirando.
4. **§6.4 · Dos sistemas de letra**, uno por dirección (§1), con la interlínea medida para cada una.
5. **§16 · La primera pantalla de A** pasa a tener el chequeo dentro del primer viewport a 1440, como B (compuerta 1,
   punto 1). Y la letra suma un eje.
6. **§17** queda superado por la compuerta 1, punto 7: el manual antiguo no rige el diseño.

## 7 · Criterios de aceptación (Javiera, en subagente limpio)

Lee este encargo, el brief, el lock, el inventario y el tablero; no la conversación. Cada criterio se comprueba
mirando o midiendo el entregable.

1. **Dos direcciones, ni una más:** A · Archivo y B · Banco, cada una con las cinco vistas del §2 a 1440 y 390 (20
   páginas completas y 20 primeros viewports), en `tableros/e12-direcciones/`.
2. **Letra por dirección:** en A, titular y cuerpo computan Google Sans Flex; en B, Mona Sans; rótulos y datos, DM
   Mono 500 en las dos (`getComputedStyle` y `document.fonts`). Ninguna dirección carga una letra que no usa.
3. **A y B difieren** en lo que carga la pantalla, la escala del titular, la forma del índice y la letra (§1), cada
   eje visible en las capturas.
4. **Base negra, y juego de color que no es driftime:** en la home y en `/trabajo/` de las dos, el lienzo es negro
   (luminancia relativa ≤ 0,01; `#060606` da 0,0018) y cubre al menos el 80 % de los píxeles fuera de imágenes y
   video a 1440. La vista 5 cambia de lienzo (blanco u otro color) y el tablero cita la medición de Koto que lo
   respalda (URL, ancho, color medido). Ningún servicio tiene un color propio fijo, ni en la home ni en el menú.
5. **Contraste medido en el render:** cero nodos de texto bajo 4,5:1 (3:1 si mide 24 px o más, o 18,66 px en
   negrita) en las 20 vistas, sobre cada lienzo, con la composición de capas de `npm run verificar` o una herramienta
   que haga lo mismo. Un color de señal, si hay, da al menos 3:1 como forma contra cada lienzo donde aparece.
6. **Casos con la estructura de Koto:** a 1440 la ficha lateral sigue en el viewport al bajar a la mitad del caso; a
   390, una columna con la ficha arriba. Cinco secciones con su rótulo, en el orden del lock §13. Las imágenes y
   grabaciones cubren al menos un tercio del área de la página a 1440 (Koto, del 33 al 72 %).
7. **Cada número visible del caso real tiene fila en el inventario**, con instrumento y fecha; si no hay, la sección
   dice «Sin métrica» y qué no se midió. Ningún resultado de negocio de un cliente.
8. **Conceptos:** «Concepto» visible en el primer viewport de la pieza y de su página de caso, a 1440 y 390, y en su
   entrada del índice; cero cifras de resultado (porcentajes, multiplicadores, visitas, leads, clientes); cero
   testimonios; cada persona que aparece, dicha como ficticia; cada marca, con su comprobación de nombre en la ficha;
   las restricciones del rubro del §3 cumplidas.
9. **Índice:** las entradas reales del inventario y las cuatro piezas de concepto; el conteo visible es igual al número
   de entradas; cada entrada dice su tipo y lleva a lo más dos ingredientes, todos con fila en el inventario.
10. **Primera pantalla de la home:** a 1440 × 900, la declaración y el chequeo (campo y botón) están dentro del
    viewport, en A y en B. A 390 × 844, si no caben, el campo empieza justo debajo y el acta anota a cuántos px del
    borde inferior queda. Desarrollo web va primero en servicios; Redes y Paid Media ocupan una línea.
11. **Precios y nombres de servicio** iguales a `oferta-v3.json` y `servicios-v3.json` («desde … + IVA»), comparados
    como texto.
12. **Praxi:** sus ingredientes, solo los que tienen fila; ninguna cifra de usuarios, retención o ventas sin fila;
    ningún enlace a `praxi.coach` si el día del tablero no responde 200 (respuesta guardada); y al cerrar,
    `git -C /home/user/praxis-coach log -1` sigue en `a360d7a` y `git -C /home/user/praxis-coach status` está limpio.
13. **IA, solo lo que hay:** toda afirmación de IA visible remite a Praxi y dice lo que Praxi hace. «IA propietaria»,
    «modelos RAG», «despliegue de modelos», «40 %» y «+150 %»: cero apariciones.
14. **Texto:** el mismo en A y en B (diff del texto visible de cada par de vistas: cero, o cada diferencia listada en el
    tablero con su motivo); tuteo; ninguna raya usada como golpe; cada término técnico visible va con lo que le hace al
    cliente (brief §2); ningún prospecto nombrado.
15. **Logo:** dos o tres caminos, cada uno en el nav de A y de B a 1440 y 390, sobre negro y sobre el lienzo del juego
    de color, y a 32 y 16 px. Ninguno copia el logo ni el amarillo de Koto; si alguno usa el oro `#C9A227` o Gabarito,
    dice por qué, porque ya no son obligación.
16. **Movimiento y accesibilidad:** Motion con versión fija; con `prefers-reduced-motion: reduce` emulado, ni
    resortes, ni cursor que sigue, ni clips que corran solos; cursor propio solo con `(pointer: fine)`; foco visible en
    todo enlace y control; lo que se mueve solo más de 5 s tiene pausa con teclado (WCAG 2.2.2).
17. **Render limpio:** sin desborde horizontal a 360, 390, 768 y 1440; un `h1` por vista; ningún texto bajo 11 px;
    cero errores de consola.
18. **Nada fuera de lugar:** `git diff` del paso 2 sobre `spindlelab-astro/`, vacío; nada publicado; cero llamadas a
    generación pagada sin el OK de Ramón escrito en el acta.
19. **El tablero se puede rehacer:** sale de un script que, corrido de nuevo sobre el commit, da el mismo archivo, como
    en el paso 1; cumple el contrato del Artifact (la página, a lo más 16 MB).
20. **Los dos detectores completos** (`refero-design/references/anti-ai-slop.md` y `estudio-web/antislop-web.md`) y las
    tres pruebas de fuego, sobre las 20 vistas, con veredicto por escrito en `e12/acta-paso-2.md`.

## 8 · Lo que NO se hace en el paso 2

1. Una tercera dirección, ni una «mezcla» de A y B.
2. Tocar `spindlelab-astro/`, publicar, o sacar algo de `/v3/` y del noindex.
3. Los cuatro sitios de concepto completos: para la compuerta 2 van la identidad, el primer viewport de cada home, el
   clip y una home completa (la de la vista 4). El resto se construye después de elegir dirección.
4. El dibujo final del logo: van los caminos.
5. Commit, push o cualquier escritura en `praxis-coach`, o tocar su producción.
6. Generación pagada de imágenes o video sin el OK de Ramón.
7. Editar el manual de marca, `CLAUDE.md`, las fichas, el pipeline, el plan o las piezas de redes y de outbound: es de
   la troncal (`marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md` §5).

## 9 · Supuestos, reversibles en una línea

- **El caso real de la vista 3 es Combeau:** es el único caso de cliente, sus dos sitios están vivos, son de fotografía
  (imagen grande de sobra) y se graban sin costo. Si al inventariar Praxi su material cubre un tercio de la página sin
  relleno, puede ser Praxi; en las dos direcciones, el mismo.
- **La vista 5 es `/servicios/desarrollo-web/`:** es la puerta del estudio (brief §3). Si la medición de Koto muestra el
  juego de color en otro tipo de página, Lucía elige la equivalente y lo dice.
- **Raigal, Aplomo y Deslinde son el punto de partida** de clínica, industrial B2B y estudio legal; «servicios» es
  nueva, y Bruno elige el oficio (servicios profesionales B2B) y dice por qué.
- **Las preguntas 1 a 4 del brief van con la opción recomendada.** Si «no te contesté los 4 puntos» quiere decir que
  siguen abiertas, el tablero lo dice y Ramón las cierra ahí.
- **«En diseño» limita el punto 7 al aspecto:** la voz y las reglas de contenido siguen.

## 10 · Lo que decide Ramón en la compuerta 2, todo junto

1. **¿A o B?**, y si algún rasgo es intocable (regla o preferencia, protocolo de compuertas).
2. **¿Qué camino de wordmark?**
3. **¿Se muestran los puntajes propios** (Verifica y Cumple 54 → 94; spindlelab.cl 85)? Está abierto desde el inventario
   §9.1.
4. Las preguntas 1 a 4 del brief, **solo si siguen abiertas.**

Si la respuesta es «ninguna de las dos», se vuelve al lock y a la medición de Koto, no al tablero.

## 11 · Orden y dueños

| Paso | Quién | Entrega | Depende de |
|---|---|---|---|
| 1 | Lucía | Medición del juego de color de Koto; paleta sobre negro; dos sistemas de letra; lock al día (§6) | |
| 1 | Diego con Simón | Inventario de Praxi, de las grabaciones de Combeau y de los conceptos; nota de señales (§5) | |
| 1 | Bruno | Las cuatro piezas de concepto (§3) y los caminos de logo (§4) | Inventario, para las filas de los conceptos |
| 1 | Clara | El texto de las cinco vistas, igual para A y B, en `e12/texto-paso-2.md` | Inventario y nombres de los conceptos |
| 2 | Lucía con Diego | A y B en `tableros/e12-direcciones/` y el tablero, armado por script | Todo el paso 1 |
| 3 | Javiera, en subagente limpio | `e12/acta-paso-2.md` con veredicto y lista numerada | El tablero |
| 4 | Ramón | Compuerta 2 (§10) | El acta aprobada |

Los cuatro trabajos del paso 1 corren en paralelo. Cada rol hace commit de sus archivos y nada más.

## Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 16-oct, 19:50 | Primera versión, con la compuerta 1 aprobada | Mauro |
