# Manual de marca SpindleLab — v2.0 (29 sep 2026)

> Fuente de verdad del sistema de marca. **Esta versión se escribió sobre el sistema v3,
> no sobre la v1.3.** El sitio se está rehaciendo completo y el sistema visual anterior
> dejó de ser la base; lo que sigue vigente de la v1.3 está marcado como tal, y lo que
> quedó atrás vive en el historial del final.

## Leer esto antes de usar el manual

**El v3 todavía no está publicado.** Vive en `spindlelab-astro/src/pages/v3/`, en la rama
`claude/rebranding-webdev-exploracion`. El sitio que ve el público (`spindlelab-site/`)
sigue corriendo el sistema anterior hasta que el v3 se mergee y despliegue.

Eso importa para no romper nada mientras tanto:

| Si estás produciendo… | Rige |
|---|---|
| El sitio nuevo, o cualquier pieza para cuando salga | **Este manual** |
| Una corrección al sitio vivo, hoy | El sistema anterior (§ Historial) |
| Piezas de redes | El sistema live v2 de `marketing/redes/README.md` |
| Papelería, mini-diagnósticos, documentos | La proporción papel-dominante (§04b) |

**Estado de cada decisión.** No todo acá pesa lo mismo, y conviene saber qué se aprobó y
qué se aplicó sin que nadie lo aprobara por escrito:

| Decisión | Estado | Constancia |
|---|---|---|
| Lienzo negro puro `#000000` | **Aprobado por Ramón** | 27-sep-2026 |
| ~~Titulares en MAYÚSCULAS~~ (reemplazado el 5-oct, fila de abajo) | **Aprobado por Ramón** | 27-sep-2026, ratificado por escrito el 29-sep |
| **Mayúsculas solo en el display: cinco lugares** (titular del hero y las cuatro palabras de campo). Todo lo demás en caja normal | **Aprobado por Ramón** | 5-oct-2026, al fijar driftime.com como la vara del sitio entero |
| Manrope toma titulares y cuerpo | **Aprobado por Ramón** | confirmado el 29-sep-2026. Se había aplicado el 27-sep con una fecha de aprobación reclamada en un comentario de código que no se pudo corroborar; queda saldado. |
| Campos brasa y ciruela | Aplicado, sin aprobación explícita | 27-sep |
| Radio único de 6px | Aplicado, sin aprobación explícita | 27-sep |

---

## 01 · Esencia *(sin cambios desde v1.3)*

- **Posicionamiento:** SpindleLab hace que las empresas aparezcan cuando sus clientes preguntan — en Google y en los motores de IA.
- **Sensación objetivo ("solidez cercana"):** *confío en él, y además se entiende lo que dice*.
- **Personalidad:** cercano, preciso y con vida — un laboratorio de creatividad que optimiza la maquinaria de un negocio. Nunca: robots, cerebros, circuitos, degradados neón, jerga startup.
- **Idea rectora del sistema visual:** ser **el punto donde te encuentran** → el punto dorado como única firma gráfica.

## 02 · Wordmark

- **Forma:** `SpindleLab.` — tipográfico puro, sin símbolo ni contenedor.
- **Tipografía:** Gabarito. Punto final SIEMPRE dorado `#C9A227`.
- **Versiones:** una línea (principal) · apilada `Spindle / Lab.` (espacios angostos: firma de correo, laterales).
- **Sobre el lienzo negro:** el texto va en papel `#F7F5F0` (19,3:1) y el punto dorado da 8,7:1. El punto no cambia nunca de color.
- **Área de respeto:** media altura de la «S» por todos los lados.
- **Tamaño mínimo:** 120 px de ancho (una línea); bajo eso, usar monograma.
- **Prohibido:** punto de otro color o apagado · otra tipografía / mayúsculas / bold sans · contenedores tipo ícono de app · símbolos acompañando · dorado como color del texto.

**Lo que cambia en el v3:** Gabarito queda **reservada al wordmark**. Ver §05 — es lo que
convierte al wordmark en una firma y no en «el titular más grande de la página».

## 03 · Monograma *(sin cambios desde v1.3)*

- **Forma:** `S.` — S de Gabarito + punto dorado, sobre cuadrado de **esquinas rectas** (sello editorial, no ícono de app).
- **Versiones:** papel con tinta (principal) · tinta con papel (invertido).
- **Usos:** favicon, avatar LinkedIn, sello en documentos, espacios < 120 px.

---

## 04 · Color — «El lienzo negro y los campos»

El sistema anterior era papel-dominante con tinta `#131A22` como fondo profundo. **El v3
invierte eso:** el lienzo es negro puro y el recorrido pasa por campos de color enteros,
uno por sección, en vez de alternar dos neutros.

### El lienzo y sus superficies

| Token | Hex | Rol |
|---|---|---|
| **Noche** | `#000000` | **El lienzo.** Fondo de todo el sitio |
| Tinta | `#131A22` | Superficie: tarjetas y paneles elevados sobre el negro |
| Papel | `#F7F5F0` | Texto sobre negro (19,3:1) · fondo de las bandas claras |
| Blanco | `#FFFFFF` | Botones de campo · **cuerpo sobre brasa** (ver abajo) |
| Dorado | `#C9A227` | SOLO acentos: el punto, separadores ·, un dato clave. Sobre negro da 8,7:1 |
| Humo | `#96948E` | Metadatos y rótulos sobre el lienzo negro (6,92:1) |

**Por qué negro puro y no un negro cálido.** Es el valor medido de la referencia que se
tomó como norte, no una preferencia. Un negro cálido tira el dorado a mostaza; sobre
`#000000` el dorado lee como dorado.

### Los cuatro campos de color

Cada uno ocupa una pantalla completa y lleva su propia crema. **Los campos no llevan
blanco con opacidad encima:** eso da un gris sucio, y un gris distinto en cada sección.
El texto se tiñe hacia una familia distinta a la del panel y va a plena fuerza.

| Campo | Fondo | Crema del texto | Contraste | Qué sección abre |
|---|---|---|---|---|
| **Brasa** | `#DA3400` | `#FFFFFF` | 4,70:1 | Desarrollo Web |
| **Navy** | `#0E2A47` | `#E4F1EC` | 12,56:1 | Visibilidad en IA · el blog |
| **Petróleo** | `#0F766E` | `#FFF4E2` | 5,03:1 | Continuidad / acompañamiento |
| **Ciruela** | `#341F34` | `#FFEFDD` | 13,40:1 | Alcance / redes y pauta |

**Brasa es el caso especial y hay que saberlo:** la única opción que aprueba AA de cuerpo
sobre `#DA3400` es el **blanco puro**. La crema reprueba. Nada de texto atenuado sobre
brasa ni sobre petróleo: son fondos de luminancia media y cualquier opacidad los tira bajo
4,5:1. Ahí el rótulo se distingue por tamaño y caja, no por opacidad.

**El color del campo viaja.** Cada campo de la home enlaza a una página, y esa página
lleva el mismo color en una de sus secciones. Si el campo promete un color, la página que
abre no puede llegar en blanco y negro.

**Proporción medida:** la home lleva 32% de color repartido en los cuatro campos; las
internas, entre 13% y 44%. Ninguna página del sistema queda sin campo.

### 04b · Documentos y papelería *(sigue vigente de la v1.3)*

Para mini-diagnósticos, cotizaciones y papelería **no rige el lienzo negro**: papel/blanco
dominan (~70 %), tinta trabaja (~25 %), gris apoya, **el dorado aparece una vez** (~1-2 %).
Un documento que alguien imprime o reenvía no es un cartel.

---

## 05 · Tipografía

- **Manrope:** titulares Y cuerpo. *La voz y el trabajo, en una sola familia.*
- **Gabarito:** **solo el wordmark y el monograma.** Nada más.
- **Inter:** queda de fallback.

**El argumento del reparto.** Si Gabarito aparece en un solo lugar, el wordmark deja de
leerse como «el titular más grande» y pasa a leerse como firma. Manrope ya es de la marca
(es la tipografía del sistema live v2 de redes) y ya está auto-alojada, así que el cambio
no agrega ni una petición a terceros.

### La caja: mayúsculas solo donde grita el display *(cambia el 5-oct-2026)*

**Regla vigente, aprobada por Ramón el 5-oct-2026:** las mayúsculas en peso 800 se usan en
**cinco lugares del sitio y en ninguno más** — el titular del hero de la home y las cuatro
palabras de campo (Desarrollo, Visibilidad, Continuidad, Alcance). Todo otro titular, en la
home y en las internas, va en **caja normal**, Manrope 500.

**Por qué cambió.** El 5-oct Ramón fijó driftime.com como la vara del sitio entero, y por
primera vez se midió driftime en el navegador (el equipo anterior no había podido abrirlo).
El dato que decide: en su home, la tipografía display aparece en **5 elementos contra 517**
en la sans de lectura, y sus páginas internas no la usan ni en el h1. Lo que hace que
driftime se vea fuerte es el contraste entre esos cinco gritos y el silencio del resto. La
regla anterior («todos los titulares en mayúsculas 800») producía lo contrario: un sitio que
grita en cada sección, y por eso nada destaca. Detalle: `marketing/oficina/obras-web/
spindlelab-v3/referencia-driftime/lock-driftime.md`.

**El límite de largo sigue, pero solo para el display:** máximo 6 palabras y 34 caracteres.
Si no cabe, se reescribe; nunca se le baja la caja. Lo que dijo Ramón el 29-sep sigue
valiendo: *«que las frases sean más concisas, precisas y con mejores ganchos»*.

**Consecuencia que conviene anotar:** el pendiente de los siete h1 publicados del blog (que
medían entre 46 y 70 caracteres y no cabían en mayúsculas, y acortarlos costaba SEO)
**desaparece**. Con la regla nueva van en caja normal y su largo no es un problema.

### La escala (medida en driftime, traducida a Manrope)

| Rol | Tamaño (escritorio → celular) | Peso | Caja |
|---|---|---|---|
| **Display** (los cinco lugares) | `clamp(2,4rem, 10vw, 7,5rem)` → 120 px / ~39 px | 800 | MAYÚSCULAS, interlínea 0,9 |
| Título de página interna (h1) | `clamp(2,25rem, 4,17vw, 3,75rem)` → 60 px | 500 | normal, tracking −0,02em |
| Título de sección (h2) | `clamp(1,375rem, 2,08vw, 1,875rem)` → 30 px | 500 | normal, tracking −0,02em |
| Subtítulo (h3) | `clamp(1,25rem, 1,67vw, 1,5rem)` → 24 px | 500 | normal |
| Párrafo guía | `clamp(1,25rem, 1,67vw, 1,5rem)` → 24 / 20 px | 400 | normal, interlínea 1,5 |
| Cuerpo secundario | `clamp(1,0625rem, 1,25vw, 1,125rem)` → 18 px, en gris | 400 | normal |
| Botón | 14 px | 500 | normal |
| Rótulos y metadatos | 13 px | 500 | normal (ya no en mayúsculas espaciadas) |

- **Wordmark gigante del pie:** Gabarito 800, tamaño = ancho del contenedor / 4,78 (medido:
  el texto mide 4,744 veces su tamaño de letra). Su punto va en papel, no en oro: el oro de
  esa vista ya está en el módulo de navegación.
- **Texto corrido:** ≤ 68 caracteres por línea *(sigue vigente de la v1.3)*.

---

## 06 · El punto dorado *(sin cambios desde v1.3)*

Significa *el punto donde te encuentran*. Funciona por escasez — **un solo punto (o uso
dorado) por pieza**:

1. Remate del wordmark, o
2. Separador tipográfico `·` en firmas y pies, o
3. Destacado de UN dato clave.

Prohibido: viñetas doradas en listas, varios elementos dorados compitiendo, dorado de
fondo o en texto corrido.

## 06b · Territorio creativo de campaña — «el eje y el circuito» *(sin cambios, desde sep-2026)*

Cerrado por Ramón el 1-sep-2026 (reporte:
`marketing/encargos-otras-sesiones/direccion-creativa-campana-sep-REPORTE.md`).

> SpindleLab no es solo el eje del negocio: es **el circuito que lo enciende**. El
> argumento deja de ser "no apareces en la IA" y pasa a **por qué tu sitio no convierte**.
> **El circuito existe entero y se corta en el último tramo, justo donde se cobra.**

- **Ejecución visual: consecuencias físicas, no diagramas.** El dominó es el molde: algo que se SIENTE en 3 segundos. «Circuito» es metáfora NARRATIVA — jamás placas, chips ni circuitos dibujados.
- **Cómo conversa con la marca:** el hilo de oro del hero es la corriente que recorre el circuito, y el punto dorado el lugar donde esa energía llega — donde te encuentran.
- **Sostén del nombre:** *spindle* = eje/husillo, la pieza que gira y transmite el movimiento.

---

## 07 · Forma y movimiento *(nuevo en v2.0)*

Lo que la v1.3 no tenía, porque el sistema anterior no lo usaba.

### Forma

- **UN radio para todo: 6px.** Cero píldoras. `rounded-full` es la forma más genérica que hay en la web hoy y es lo primero que hace que una página lea a plantilla.
- **Aire de sección:** 256px arriba y abajo en escritorio.
- **Medianil:** 40px, plano.
- **Botón sobre campo:** blanco lleno, texto `#14110E`, radio 6px. No es una píldora.

### Movimiento

Tres mecanismos, los tres medidos en la referencia y ninguno decorativo:

1. **Entrada.** 0,8s con la curva `cubic-bezier(.5, 0, .1, 1)`, desplazamiento de 28px. Se marca el titular de sección y el bloque que va debajo, nada más: ocho entradas escalonadas seguidas es lo que hace que una página lea a plantilla. El primer pantallazo nunca anima.
2. **Titular pegajoso.** Solo donde la sección es más alta que la pantalla y el contenido es una lista vertical. Donde la sección cabe en pantalla no haría nada.
3. **Video montado tarde.** El `src` se pone cuando el bloque se acerca, no antes. Uno solo por página.

**Dos reglas que no se negocian:**

- **La clase que esconde la pone el JS, no el marcado.** Si el script no corre, nada queda en opacidad 0 y la página se lee completa. Escribir `opacity:0` en el HTML y confiar en que el JS lo revierta es como un sitio termina en blanco el día que algo falla.
- **Todo respeta `prefers-reduced-motion`.** Con `reduce` no se esconde nada, no hay paralaje y el video no se reproduce.

**Lo que NO hace el sistema, aunque parezca:** animación tipográfica letra por letra. Se
midió la referencia y sus encabezados son nodos de texto planos, cero spans. Lo que hace
que un sitio se sienta vivo no son efectos: es scroll suave, composición pegajosa y video
que se monta solo cuando se va a ver.

---

## 08 · Voz *(sin cambios desde v1.3)*

Afirmaciones verificables, ejemplos concretos, valentía de decir «esto no lo necesitas». La persona gramatical es híbrida, y la regla es precisa — no es una preferencia de estilo, cambia el significado:

- **Primera persona singular** para lo observacional/evidencial: probar algo, revisar, investigar. Ej.: *«Le pregunté a ChatGPT por tu negocio.»*
- **Primera persona plural** para todo lo que la empresa entrega, ofrece o hace como servicio. Ej.: *«Te lo entregamos gratis, en 24 horas.»*

| Sí | No |
|---|---|
| «Le pregunté a ChatGPT por tu negocio. No apareces. Te mostramos por qué.» | «Soluciones integrales de posicionamiento digital potenciadas por IA.» |
| «La auditoría toma dos semanas y entregamos un plan priorizado.» | «Nuestro equipo multidisciplinario optimizará sus KPIs.» |
| «Esto puede esperar; lo urgente es lo otro.» | «¡Aprovecha ahora esta oportunidad única!» |

**Nunca:** guion largo como golpe de efecto · relleno de transición · superlativos de venta
· urgencia fabricada · cifras, testimonios o clientes que no existen · el nombre de un
prospecto sin permiso.

Los textos publicados que fijan el sonido real están en la skill `voz-spindlelab`
(`corpus.md`). El tono se calibra leyendo dos párrafos reales, no diez viñetas de reglas.

---

## 09 · Aplicaciones y activos

| Aplicación | Regla | Archivo |
|---|---|---|
| Logo (todas las variantes) | Horizontal · apilada · monograma, positivo/invertido | `logo/` |
| Firma correo (conocidos) | Wordmark apilado + regla dorada + nombre/cargo | `firmas/firma-a-nombre.png` |
| Firma correo (outbound) | Wordmark + tagline 3 servicios | `firmas/firma-b-marca.png` |
| Perfil LinkedIn e Instagram | Monograma S. sobre papel | `redes/perfil-avatar.png` |
| Banner LinkedIn | Foto agencia (velo de tinta) + wordmark + promesa | `redes/banner-linkedin.png` |
| Posts Instagram (1080×1080) | Plantilla tipográfica y con foto — editar el HTML y re-renderizar | `redes/post-tipografico.*` · `redes/post-foto.*` |
| Favicon | Monograma S. (SVG con Gabarito embebida) | `spindlelab-site/assets/img/favicon.svg` |

**Fotografía de marca:** foto del banner en `redes/fuentes/foto-banner-original.jpg`
(Unsplash — licencia gratuita para uso comercial). Tratamiento SIEMPRE con velo de tinta
≥50 % para que la marca mande sobre la foto.

**Verificación antes de dar algo por bueno.** El sistema trae una herramienta que mide lo
que el ojo no ve: `cd spindlelab-astro && npm run build && npm run verificar`. Barre cada
página y reporta el contraste real sobre píxel renderizado, desborde horizontal a 390px,
`h1` duplicados o ausentes, JSON-LD, `alt` faltantes y enlaces internos rotos. Sale con
código distinto de cero si encuentra algo, así que puede frenar un deploy.

---

## Historial

- **v2.0 (29 sep 2026):** manual reescrito sobre el sistema v3. La v1.3 dejó de ser la base porque el sitio se está rehaciendo completo.
  - **§04 Color:** el lienzo pasa de tinta `#131A22` a **negro puro `#000000`**. Se suman los cuatro campos de color con sus cremas y contrastes medidos (navy y petróleo vuelven a subir de rango; brasa y ciruela son nuevos), y el gris `humo` para metadatos sobre negro. La proporción papel-dominante queda acotada a documentos y papelería (§04b).
  - **§05 Tipografía:** **Manrope** toma titulares y cuerpo; **Gabarito queda reservada al wordmark**; Inter pasa a fallback. La regla de caja se invierte: donde la v1.3 prohibía ALL CAPS en titulares, el v3 los pone en mayúsculas — **con un límite de largo de 6 palabras y 34 caracteres que es parte de la regla.**
  - **§07 Forma y movimiento:** sección nueva. Radio único de 6px, aire de sección de 256px, y los tres mecanismos de movimiento con sus dos reglas de degradación.
  - **§09:** se documenta `npm run verificar`.
  - **Lo que NO cambió:** esencia, wordmark, monograma, punto dorado, territorio de campaña y voz. El v3 los usa tal cual.
  - **Queda pendiente de Ramón:** decidir si los h1 de los siete artículos se acortan al límite, con su costo de SEO; y bajar este manual a las skills que todavía repiten las reglas de la v1.3.
- **v1.3 (8 jul 2026):** regla de voz refinada — plural para lo que la empresa ofrece, singular para lo observacional.
- **v1.2 (8 jul 2026):** sistema aplicado a `spindlelab-site` — tipografía, favicon, 4ª línea de servicio (Desarrollo Web). Corrección: el sitio nunca usó Fraunces, usaba Manrope.
- **v1.1 (8 jul 2026):** la tipografía de marca pasa de Fraunces Display a **Gabarito** (la serif era demasiado solemne). Kit de logo en `logo/`.
- **v1.0 (8 jul 2026):** sistema inicial.

### El sistema anterior, para el sitio vivo

Hasta que el v3 se publique, `spindlelab-site/` corre con: Gabarito en titulares, Manrope
en cuerpo, fondo tinta `#131A22`, titulares en sentence case y mayúsculas solo en etiquetas
pequeñas con tracking ≥1,4px. **Eso no es un error del sitio vivo: es la v1.3 funcionando.**
No lo «corrijas» contra este manual hasta que el v3 se despliegue.
