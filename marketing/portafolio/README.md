# Portafolio · piezas de concepto

Sitios completos, con su identidad, para **clientes que no existen**. Están para mostrar hasta dónde llega el trabajo
en los rubros que vendemos. Lo medido va en los casos reales; aquí va el nivel de oficio, dicho como ejercicio.

## Cómo llegó a ser lo que es

- **27 a 29-sep-2026 · primera serie.** Nació de una necesidad concreta: el único sitio entregado (Bernardo Combeau)
  no tenía permiso de caso público y no había nada que mostrarle a un prospecto. Se hicieron tres homes: Raigal,
  Aplomo y Deslinde.
- **30-sep · Bernardo dio el permiso.** Sus dos sitios entraron al índice de trabajo como casos de cliente, y de la
  serie entró una sola pieza, Raigal.
- **16-oct · compuerta 1 de la obra E12 (punto 5).** Ramón: «para casos vamos a tener que abrirnos a crear algunas
  piezas para hacer un buen portafolio. no solo es poner cosas medidas si no que también mostrar el nivel de trabajo
  que puedo llegar a hacer». Eligió **cuatro piezas, una por rubro que vendemos** (industrial B2B, clínica, estudio
  legal y servicios), cada una con identidad, sitio y movimiento. **La decisión de «una sola pieza de concepto» queda
  superada.** Ese mismo día, sobre Combeau: «no se necesita más permiso».
- **16 y 17-oct · segunda serie (04 a 07).** Se hizo de cero, no rehaciendo la primera. La razón que más pesó: los
  tres nombres de la primera serie ya son de empresas reales (abajo, «Primera serie»). El plan completo, con las
  razones, está en `plan-e12.md` y la evidencia de nombres y precios en `plan-e12-evidencia.json`.

## La regla que hace que esto sume en vez de restar

**Cero prueba social inventada.** Es regla de la casa y sigue en pie, aunque el manual visual antiguo ya no rija el
sitio nuevo (compuerta 1 de E12, punto 7). Un caso ficticio sin rotular la rompe de frente, y en una marca que vende
criterio eso cuesta más de lo que cualquier pieza bonita puede devolver.

Rotulado como ejercicio, no la rompe: deja de ser un cliente y pasa a ser trabajo conceptual, que es como se arma un
portafolio cuando todavía no hay casos liberados en un rubro.

**Entonces, en cada pieza:**

1. **El rótulo va en la pieza misma, visible sin scroll**, no en el pie ni en la bajada de un post. Si alguien toma
   una captura de la primera pantalla, el rótulo sale en la captura. Desde la segunda serie va en tres lugares:
   - **en el sitio**, dentro del primer viewport a 1440 × 900 y a 390 × 844, fijo, sin botón para cerrarlo, de 12 px
     o más, con 4,5:1 o más y con la frase entera (que la marca no existe y que nada de eso ocurrió);
   - **en cada placa exportada**, un «CONCEPTO» de esquina, para que una placa suelta siga diciendo lo que es;
   - **en la página de caso**, «CONCEPTO · 2026» en la ficha lateral y en la entrada del índice.
2. **La marca es inventada, suena inventada y se comprueba en dos pasos, con fecha:** el dominio `.cl` en NIC Chile
   y una búsqueda web con el nombre entre comillas y el rubro. **Si el dominio está tomado, el nombre se descarta**,
   aunque el dueño sea de otro rubro. Nada de un apellido chileno plausible. La comprobación se repite el día que la
   pieza entra al índice. (Hasta el 16-oct era un solo paso, la búsqueda web, y por eso la primera serie lo pasó.)
3. **Cero cifras de resultado.** Ni tráfico, ni conversión, ni «+X % en Y meses»: una pieza de concepto no tuvo
   usuarios. Los únicos números son los de la norma del rubro, con su fuente y su fecha en la ficha. Tampoco precios,
   honorarios, años de trayectoria ni clientes atendidos.
4. **Nada de testimonios ni de caras.** Ni con nombre inventado, ni rostros generados o de banco: en el sitio de una
   clínica o de un estudio, una cara se lee como su profesional o su cliente. Las personas aparecen solo con su
   nombre, dichas como ficticias, y el nombre se busca antes en el registro público que corresponda.
5. **El rubro es real y sus restricciones también.** Salud: ninguna promesa de resultado clínico, y los profesionales
   se dicen ficticios. Estudio legal: ninguna promesa de resultado de un caso. Y ningún dato que parezca real (RUT,
   registro de prestador, rol de causa, teléfono, dirección con número): donde iría, dice «ficticio».

## Qué demuestra cada pieza

No es solo diseño. Cada una enseña **la capa técnica**, que es el diferencial que se vende: datos estructurados
correctos para el tipo de negocio, contenido en formato citable por un motor de IA, y las preguntas largas que la gente
de verdad le hace a una IA antes de comprar, en texto plano con encabezados. Un sitio bonito sin esa capa no demuestra
nada que la competencia no pueda copiar.

La ficción también va dentro de los datos: el JSON-LD de cada pieza lo dice en `disambiguatingDescription` (en la
organización y en cada persona), nunca lleva `Review` ni `AggregateRating`, y las páginas van con `noindex, nofollow`.
Un motor que lee los datos y no el texto también sabe que la empresa no existe.

## Piezas

### Segunda serie (16 y 17-oct-2026, obra E12): las que se muestran

| # | Pieza | Rubro | Lo que trae | Estado |
|---|---|---|---|---|
| 04 | [Tonela](04-tonela/ficha.md) | Industrial B2B: izaje (eslingas, estrobos, cadenas y grilletes, con taller de inspección; Antofagasta, ficticia) | Identidad (etiqueta cosida y los ocho colores de la EN 1492), pliego, placas y portadas; home e interior «Inspección»; recorrido de 10 s; [caso](04-tonela/caso.md) | En el índice de `/trabajo/` de las dos direcciones de la compuerta 2 |
| 05 | [Ocelo](05-ocelo/ficha.md) | Clínica: oftalmología (cirugía refractiva y cataratas; Providencia) | Identidad (logo en retícula 5 × 5 y la C de Landolt), pliego, placas y portadas; home e interior «La evaluación»; recorrido; [caso](05-ocelo/caso.md) | Igual |
| 06 | [Sesenta](06-sesenta/ficha.md) | Estudio legal: laboral, del lado del trabajador (Santiago centro) | Identidad (la palabra y el 60 como sello), pliego, placas y portadas; home e interior «Qué dice tu carta»; recorrido; [caso](06-sesenta/caso.md) | Igual, y es **la que va más lejos**: su página de caso es la vista 4 de A y de B |
| 07 | [Doceavo](07-doceavo/ficha.md) | Servicios profesionales: contable y tributario (Concepción) | Identidad (retícula de 12 casillas con la del mes en curso llena), pliego, placas y portadas; home e interior «Calendario»; recorrido; [caso](07-doceavo/caso.md) | Igual |

Ninguna está publicada: se muestran en los prototipos de la compuerta 2
(`marketing/oficina/obras-web/spindlelab-v3/tableros/e12-direcciones/`). Las cuatro se terminaron **sin generación
pagada** (0 créditos). En la compuerta 2 decide Ramón los cuatro nombres, Sesenta como la pieza de la vista 4, Ocelo a
oscuras o con la luz encendida por defecto, y si se paga generación (`plan-e12.md` §14).

### Primera serie (27 a 29-sep-2026): archivo, fuera del índice

| # | Pieza | Rubro | Por qué no se muestra |
|---|---|---|---|
| 01 | [Raigal](01-raigal/ficha.md) | Implantología y rehabilitación oral | `raigal.cl` (registrado el 07-03-2025) es el sitio vivo de una empresa de arquitectura y construcción llamada Raigal |
| 02 | [Aplomo](02-aplomo/ficha.md) | Constructora industrial B2B | `aplomo.cl` está registrado desde el 01-07-2008 y redirige a `aplomochile.com` (404 el 16-oct): la marca está tomada aunque el sitio no responda |
| 03 | [Deslinde](03-deslinde/ficha.md) | Derecho laboral y cumplimiento B2B | `deslinde.cl` (registrado el 03-11-2018) es el sitio vivo de Deslinde, gestión inmobiliaria y arquitectura urbana |

**El hallazgo (16-oct, NIC Chile y el sitio que sirve cada dominio):** los tres nombres ya son de alguien. La
comprobación de Deslinde del 29-sep buscó estudios de abogados con ese nombre y no encontró ninguno, pero no miró el
dominio. De ahí sale el segundo paso de la regla 2.

Las tres quedan en sus carpetas como archivo: no se muestran a un prospecto ni entran al índice nuevo. Además de los
nombres, de Deslinde Ramón ya había dicho que era «algo bastante genérico» (29-sep, en su ficha), y las tres comparten
la causa: son una home sin identidad cada una (el «logo» es el nombre escrito en la letra del sitio) y cargan la letra
desde Google Fonts.

**Ojo con Raigal:** sigue hoy en la vista previa del v3 (`spindlelab-astro/`: la tira de la home, `/v3/trabajo/` y
`/v3/servicios/desarrollo-web/`; noindex y sin publicar), porque en este paso de E12 `spindlelab-astro/` no se toca.
**No puede llegar a producción con ese nombre.** Sale cuando se construya `/trabajo/` con la dirección elegida y las
cuatro piezas nuevas toman su lugar; Ramón lo confirma en la compuerta 2 (`plan-e12.md` §14, punto 5).

## Las piezas se construyen como opuestas, a propósito

Un portafolio de sitios parecidos no prueba nada: prueba que hay un estilo, que es lo contrario de lo que se quiere
demostrar. Cada pieza se compone **contra** las otras en lienzo, letra, forma del logo, densidad y temperatura. En la
primera serie, Raigal era cálida, aireada y de serif, y Aplomo fría, tabular y de monoespaciada (la comparación está en
la ficha de Aplomo). En la segunda, las cuatro se hicieron contra las otras tres:

| | 04 · Tonela | 05 · Ocelo | 06 · Sesenta | 07 · Doceavo |
|---|---|---|---|---|
| **Lienzo** | Blanco frío | La sala a oscuras, con la luz que se enciende | Azul de ropa de trabajo | Verde pálido de libro contable |
| **Letra** | Big Shoulders (y su Stencil) + Barlow Semi Condensed | Logo dibujado + Atkinson Hyperlegible Next y Mono | Schibsted Grotesk; Courier Prime solo en documentos | Recursive, sans y mono |
| **Recurso propio** | La tabla de carga por color | La carta logMAR | El 60 que baja y la suma del escrito | El año en doce |
| **Densidad y temperatura** | Densa, caliente | Rala, neutra | Media, fría | En columnas, templada |

**La prueba, mirando:** se tapan los nombres y los textos de las cuatro portadas; si dos se pueden confundir por
lienzo, letra o forma, una se rehace. Ninguna usa las letras del sitio de SpindleLab (las de las direcciones A y B),
las del manual antiguo ni las de la primera serie, y ninguna tiene índigo o violeta como color de marca (el violeta de
Tonela es el de 1 t en la norma y solo significa eso). Detalle en `plan-e12.md` §3.

## Lo que se aprendió

**Una ranura de foto vacía arruina la pieza, aunque sea lo honesto** (primera serie). La primera versión de Raigal
dejaba marcos tramados con el rótulo «Ranura 01 · 16:9» y la dirección de arte escrita encima, porque no había
fotografía. Se lee como wireframe, y un wireframe es justo lo que delata una maqueta hecha con IA. En una pieza cuyo
trabajo es *verse terminada*, ese costo es mayor que el de dejar el hueco marcado.

**La salida no es fingir una foto: es dibujar lo que sí corresponde dibujar.** En Raigal el hueco se llenó con un corte
técnico del implante en el hueso y una barra de tiempo a escala: contenido del rubro, no relleno. En la segunda serie
ese activo del oficio dejó de ser el reemplazo de una foto y pasó a ser **el recurso de la identidad**: la tabla de
carga de Tonela, la carta de Ocelo, el plazo de Sesenta y el año de Doceavo. Si falta un activo, se busca el que el
oficio produce, no un marcador de posición.

**Una pieza que tiene que verse terminada no puede depender de un tercero.** Las de la primera serie cargan la letra
desde Google Fonts, y en un render del 16-oct, con un navegador sin salida a internet, dos salieron con la letra de
reemplazo. Desde la segunda serie, las fuentes van copiadas en la carpeta de cada pieza con su licencia, y la pieza
no hace ninguna petición afuera.

**Lo que no se mide en un tamaño no se ve en ese tamaño.** En Tonela, la «t» de tonelada de las bandas bajaba a
6,45 px en el teléfono (defecto 17 del acta del paso 2 de E12): las capturas se veían bien y nadie la había medido.
Al barrer las cuatro en doce tamaños, y no solo en 360, 390, 768 y 1440, salieron cuatro fallas más entre el
teléfono y el escritorio: en Ocelo, la carta con filas de 3,6 px a 821 y un desborde de 144 px; en Sesenta, dos
desbordes, de hasta 257 px a 900. Quedaron corregidas el 18-oct (el `caso.md` de cada una lo cuenta). **Desde ahí,
cada pieza se barre de 360 a 1920 antes de darla por hecha**, con el piso de 11 px medido, y no solo en los anchos de
las capturas.

## Fotografía y video: cotizado, decide Ramón

La generación por Higgsfield **exige tomar un plan**: el 16-oct la cuenta tenía 0 créditos, plan gratuito, y este
espacio de trabajo no admite recargas sueltas. Para las cuatro piezas de la segunda serie se cotizaron unas 9 fotos y
2 clips de 5 s, unos 75 créditos, que caben en un mes del plan PLUS: **USD 49**. Ninguna foto llevaría personas, y
cada imagen generada se diría generada en el caso. La recomendación fue terminar las cuatro sin generar y decidir la
foto mirándolas en la compuerta 2, pieza por pieza (`plan-e12.md` §11). Las otras salidas siguen siendo stock dirigido
o una sesión real.
