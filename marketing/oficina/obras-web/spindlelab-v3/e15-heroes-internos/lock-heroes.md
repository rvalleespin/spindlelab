# E15 · Heroes de las páginas internas · lock de estilos y escenas

> **RONDA 2 · 3-nov-2026 · Lucía (dirección de arte) con Bruno (dirección creativa).**
> Ramón aprobó rehacer las 7 imágenes que Javiera rechazó en la ronda 1, como ella recomendó. Este archivo es el lock
> vigente: los cambios de la ronda 2 están marcados **R2** y lo que se reemplazó queda en el historial (§6).
>
> | Estado | Páginas |
> |---|---|
> | **Aprobadas en ronda 1, no se regeneran** | nosotros, servicios, auditoria-seo-tecnica, redes-sociales, desarrollo-web, acompanamiento-mensual |
> | **Se rehacen en ronda 2** | metodo, visibilidad-en-ia, diagnostico, paid-media, trabajo, blog, contacto |
> | **Solo trabajo en post (sin gastar créditos)** | auditoria-seo-tecnica (al verde nuevo, §1.7), redes-sociales (al lima nuevo, §1.7), desarrollo-web y acompanamiento-mensual (grano, §1.6) |
>
> Lo que manda la ronda 2, en palabras de Ramón: **cada imagen obedece al contexto de su página; conceptual pero no
> aburrida, divertida, creativa, con una idea visual ingeniosa; a color; fina y curada como Koto; nada que huela a IA,
> a caricatura o a foto de banco.**
>
> **En esta pasada no se generó nada ni se gastó ningún crédito.** No se tocó `spindlelab-astro/` ni nada publicado.

Se apoya en: el texto de cada página (`spindlelab-astro/src/data/archivo/texto/<pagina>.json`, h1, entradilla y el
«trabajo» de cada sección), los leads de `spindlelab-astro/src/data/servicios-v3.json`, los pasos de `/metodo/` en
`spindlelab-astro/src/data/paginas-v3.json`, los tres bloques del chequeo en `interiores.mjs` (leer 30, entender 40,
citar 30), las cuatro referencias de estilo que Ramón aprobó en Higgsfield, lo que ya se rechazó en E14
(`../e14-home-koto/imagenes-v2/LEEME.md`) y la revisión de Javiera sobre la hoja de la ronda 1 (`pruebas/hoja.jpg`,
job ids en `pruebas/registro.md`).

---

## 0 · Lo que manda este lock

1. **Cada imagen dice lo que dice su página.** Ninguna escena es decoración ni «algo de marketing»: sale del h1 y de
   la entradilla de su JSON, y la columna «por qué» (§2) tiene que poder defenderla sin adjetivos.
2. **Una idea por imagen, y que se entienda al mirarla.** Ilustración editorial de revista: una metáfora con ingenio,
   que saca una sonrisa y después se lee. Ni literal ni críptica. **R2: pocos elementos.** Si para entender la idea
   hay que mirar cinco objetos, sobran cuatro (lección de paid-media, ronda 1).
3. **Cuatro miradas de un mismo estudio, no cuatro proveedores.** La serie se sostiene por (a) el **grano** en las
   cuatro (película, trama o riso; nada liso ni plástico, **R2: tampoco la foto**, §1.6), (b) una **paleta en eje
   verde-violeta** con cada fila en su propio verde (**R2**, ver punto 7) y el violeta del isométrico como contrapunto,
   y (c) el **mismo tipo de chiste**: un objeto cotidiano que hace el trabajo de la página.
4. **A color.** El isométrico va a todo color (violeta, coral, turquesa). Retro y afiche son de dos o tres tintas a
   propósito, no en blanco y negro.
5. **Cero texto.** Ni letras, ni números, ni logos, ni interfaz legible. Las pantallas y las páginas solo muestran
   bloques abstractos; en el afiche, donde iría texto, van barras negras. Una etiqueta va **en blanco**. Los diales y
   las escalas llevan **solo marcas**, nunca cifras.
6. **Lo que ya se rechazó no vuelve:** caricatura, pizarra, ilustración infantil, foto genérica de banco, lo plano «de
   IA». Tampoco robots (**R2: ni brazos robóticos ni brazos mecánicos articulados**, que el generador dibuja como
   robots industriales), cerebros, circuitos, neón ni azules «tech». Sin caras protagonistas: manos, antebrazos o
   figuras pequeñas y de espaldas.
7. **R2 · Lock de color por fila. El amarillo de acción (`#FFE800`, tono 55°) es del botón y de nadie más.** En la
   ronda 1, retro y afiche sumaron siete imágenes del mismo lima (medido: tono 72-74°), a 18° del botón. Ahora cada
   fila tiene su verde y los dos se alejan del amarillo:

   | Fila | Fondo | Medio | Luces / tinta | Tono de la tinta dominante | Distancia al botón |
   |---|---|---|---|---|---|
   | **retro** | verde botella casi negro `#0F2A1C` (149°) | oliva-bosque `#2E5B3A` (136°) | verde claro apagado `#A9DDA0` (111°, S 0,47) | 111° | 56° |
   | **afiche** | papel lima tirado a verde `#9EEB4F` (90°) | (no hay) | negro | 85-95° | 30-40° |
   | foto | oliva de estudio (sin cambio) | crema, madera, papel | no aplica | no aplica | no aplica |
   | isometrico | violeta oscuro (sin cambio) | lila | coral, turquesa | no aplica | no aplica |

   El retro deja de ser «lima sobre oliva» y pasa a **verde botella con luces verde claro**: más profundo, menos
   saturado, no compite con el botón. El afiche sigue siendo lima, pero **más verde**: hoja nueva, no limón ni
   chartreuse. Si un generado se va al amarillo, se corrige en post (§1.7) o se descarta. Nada de dorado en ninguna
   imagen (el oro vive en el hilo de la home).
8. **R2 · Muletillas prohibidas en toda imagen nueva.** Son los objetos que el generador pone cuando no hay idea, y en
   la ronda 1 se repitieron hasta volverse firma de IA:

   | Muletilla | Veces en la ronda 1 | Por qué se prohíbe |
   |---|---|---|
   | **La lupa** (y su primo, la lámpara-lupa) | 5 | Es «buscar» o «revisar» dicho de la forma más perezosa posible. |
   | **El megáfono** | 3 | Es «comunicar» de manual de marketing; además dice hablar, nunca escuchar. |
   | **El wireframe de sitio con círculo y montañita** (el ícono de «aquí va una imagen») | varias, en pantallas y páginas | Es el placeholder de toda maqueta: delata que nadie pensó qué hay en la página. Una página, si aparece, es una franja arriba y barras horizontales en blanco, nada más. |
   | Brazo mecánico articulado | 1 (diagnóstico) | Se lee como robot industrial (punto 6). |
   | Trompetilla, periscopio | 1 (visibilidad) | Salieron megáfono y cañería; el aparato de época solo sirve si se reconoce sin explicación. |

   Las seis aprobadas se quedan como están aunque alguna tenga una (la lámpara de auditoría, los megáfonos chicos de
   redes, el molde de desarrollo-web): Ramón las aprobó y la regla rige desde aquí. **Ninguna de las siete nuevas lleva
   ninguna.** El cierre común (§1.5) las niega, pero la defensa real es que **ninguna escena las pida**: en la ronda 1
   se negaron los robots y salieron igual, porque la escena pedía «a mechanical arm».
9. **R2 · El cuadro contiene la idea entera.** Nada de la idea se sale del borde (en método el canal salía del
   cuadro). En el isométrico, la escena entera va sobre una sola base flotante con margen libre alrededor.

**Formato de trabajo:** se genera en 16:9 con la idea entera dentro del **50 % central del ancho**, para que el recorte
4:5 del celular la conserve. La proporción final del hero interno la fija la spec de la construcción; si cambia, se
regenera con la misma escena y otro `aspect_ratio`, no se recorta a ciegas.

---

## 1 · Las frases de lock (en inglés, para el generador)

Cada prompt de §3 es **lock del estilo + escena + cierre común**. El lock no se edita por página: si una escena pide
otra cosa, se cambia la escena.

### 1.1 · `isometrico` (ref. de composición f55e938d-5a96-47be-b703-71faa9c89ea9, llevada a color) · sin cambio

> Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines,
> flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft
> lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects
> in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from
> behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread.

### 1.2 · `retro` · **R2: verde botella** (ref. de trazo d4d88d56-f11f-4f80-8685-b3d32df6b2c9)

> Highly detailed retro-technical illustration in a deep bottle-green palette and nothing else: a near-black
> bottle-green ground, forms shaded in muted forest and olive green, linework and highlights in a soft pale light
> green. No yellow, no lime, no chartreuse, no other colour. Precise vector line like a 1960s engineering manual or
> patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with
> care. Dense, mechanical, quietly funny.

**Referencia de imagen en la ronda 2:** la d4d88d56 es lima y arrastra su color. Primero se recolorea auditoría (§1.7)
y **esa** va como `image_references` de visibilidad y diagnóstico: fija trazo y paleta nueva a la vez, y deja la fila
pareja. Si el generador copia la composición del motor, se vuelve a la d4d88d56 y el color lo sostiene el prompt.
Los hex (`#0F2A1C`, `#2E5B3A`, `#A9DDA0`) viven en §0.7 y en la revisión (§4), no en el prompt: un hex dentro del
prompt puede salir escrito en la imagen.

### 1.3 · `afiche` · **R2: lima más verde** (ref. 7122519e-df6b-4e6b-a346-bcc5ebfdaa9b)

> Underground magazine poster: fresh leaf-green lime paper background, a green-leaning lime clearly greener than lemon
> or chartreuse and never yellow, with heavy grain; black halftone photographic cut-outs with hard scissor edges,
> solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration
> marks in the corners. Wherever text would go there are only solid black bars. Two inks only, green lime and black.
> Bold, witty, editorial, with generous empty paper.

**Referencia de imagen en la ronda 2:** redes-sociales ya recoloreada al lima nuevo (§1.7), igual que en retro, por la
misma razón. Si copia la grilla de celdas, se vuelve a la 7122519e.

### 1.4 · `foto` · **R2: con grano** (ref. 33df342a-94c9-42c9-a837-141b11e17a7d)

> Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side
> casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical
> objects arranged with precise order and spacing. Tactile textures of wood, paper, metal, clay and fabric; muted
> palette of olive, cream, raw wood and paper. Editorial still life shot on medium-format colour film, with a fine,
> even film grain visible across the whole frame, never smooth, glossy or plastic.

El grano del prompt no basta (el generador lo «limpia»), así que **las tres fotos llevan además grano en post** (§1.6).

### 1.5 · Cierre común · **R2** (va al final de los trece)

> No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or
> abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no
> placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit
> boards, no neon, no electric tech blue, no gold. No visible faces.

### 1.6 · **R2 · Regla de grano para la fila foto (post, con PIL)**

Va en las tres fotos: **contacto** (nueva) y **desarrollo-web** y **acompanamiento-mensual** (aprobadas, **sin
regenerar**: solo post). Ruido **monocromo** (el mismo valor a R, G y B, para que no salga ruido de color de cámara
barata), fino y parejo:

1. Partir del PNG original si está en el scratchpad o en Higgsfield (job id en `pruebas/registro.md`); si no, del
   `.webp`. Reescalar primero a **1200 px de ancho** (LANCZOS), para que el tamaño del grano sea el mismo en las tres.
2. Generar ruido gaussiano de una sola capa, media 0 y **σ = 6** (en escala 0-255), con semilla fija (`seed=15`).
3. Suavizarlo con `GaussianBlur(radius=0.6)` y reescalarlo a σ ≈ 6 otra vez: así el grano mide ~1,5 px y se lee como
   película, no como ruido digital de píxel suelto.
4. Sumarlo a los tres canales, más fuerte en medios tonos que en sombras y luces (peso `4·L·(1−L)` sobre la
   luminancia L en 0-1), y recortar a 0-255.
5. Exportar `.webp` calidad 88. Mirar a 100 % y a tamaño de hero: el grano **se ve de cerca y no se nota de lejos**.
   Si a tamaño de hero se ve sucio, bajar a σ = 4; si a 100 % no se ve, subir a σ = 8. El mismo σ para las tres.

### 1.7 · **R2 · Recolor en post de las dos aprobadas que cambian de fila**

- **auditoria-seo-tecnica → verde botella.** Es de una tinta, así que se recolorea con un **mapa de degradado** sobre
  la luminancia: L 0 → `#0F2A1C`, L 0,45 → `#2E5B3A`, L 1 → `#A9DDA0`, interpolado en Lab o al menos en RGB lineal.
  Se conserva el grano y la trama originales, porque vienen en la luminancia. **Se compara con la regeneración** (su
  mismo prompt de §3B.3 con el lock 1.2 nuevo, 0,25 créditos) y se queda la que se vea mejor; empezar por el post, que
  es gratis, y regenerar solo si el mapa deja la imagen plana (sin la diferencia entre fondo, cuerpo y luces que tenía).
- **redes-sociales → lima nuevo.** Ramón la aprobó, pero la regla de color es de fila y una sola afiche en el lima
  viejo rompería la serie. Es de dos tintas: se rota el tono del papel de 72° a ~90° solo en píxeles claros y
  saturados (S > 0,5, L > 0,45), sin tocar el negro ni la trama. Si Ramón prefiere no tocarla, se deja y se anota.

Las dos van a `pruebas/` como `<slug>.webp` nuevo; el anterior queda en git.

---

## 2 · Página → estilo → qué quiere decir → la idea → por qué

Composición por estilo, para que dentro de cada uno ninguna se repita:

- **isometrico:** ciudad densa en anillo (Nosotros) · vista despiezada de módulos flotando (Servicios) · **R2:** fila
  de pabellones en diagonal sobre una base flotante (Método).
- **retro:** objeto abierto en corte (Auditoría) · **R2:** mueble de época visto de frente con manos que eligen
  (Visibilidad) · **R2:** maletín abierto con instrumentos (Diagnóstico).
- **afiche:** **R2:** bloque negro gigante cortado por un cono de papel (Paid Media) · retícula de muchas celdas
  (Redes) · **R2:** un objeto colgado al centro con mucho papel vacío (Trabajo) · objeto en sección con una mano que
  señala (Blog).
- **foto:** cenital sobre la mesa (Desarrollo web) · tres cuartos a la altura del objeto (Acompañamiento) · frontal y
  bajo, la mano viene hacia ti (Contacto).

| Página | Estilo | Estado | La idea |
|---|---|---|---|
| `/nosotros/` | isometrico | aprobada R1 | La ciudad que gira en torno a un sitio. |
| `/servicios/` | isometrico | aprobada R1 | El catálogo de piezas. |
| `/metodo/` | isometrico | **R2, idea nueva** | **Las luces que se encienden de a una.** |
| `/servicios/auditoria-seo-tecnica/` | retro | aprobada R1, recolor | El sitio en el banco del mecánico. |
| `/servicios/visibilidad-en-ia/` | retro | **R2, idea nueva** | **La operadora del conmutador.** |
| `/diagnostico/` | retro | **R2, idea nueva** | **El maletín de pruebas.** |
| `/servicios/paid-media/` | afiche | **R2, idea nueva** | **La linterna.** |
| `/servicios/redes-sociales/` | afiche | aprobada R1, recolor | El calendario se arma a mano. |
| `/trabajo/` | afiche | **R2, idea nueva** | **El cuadro y el nivel.** |
| `/blog/` | afiche | **R2, misma idea, ejecución corregida** | **Se explica el truco.** |
| `/servicios/desarrollo-web/` | foto | aprobada R1, grano | Hecho a la medida, como un traje. |
| `/servicios/acompanamiento-mensual/` | foto | aprobada R1, grano | El jardinero de cada mes. |
| `/contacto/` | foto | **R2, idea nueva** | **La taza que ya tienes y la que todavía no.** |

Las fichas de las seis aprobadas (qué expresa, idea y por qué) están en el historial (§6), tal como se aprobaron.

### 2.1 · Las siete de la ronda 2

#### `/metodo/` · isometrico · **Las luces que se encienden de a una**

- **Qué quiere expresar** (h1 y entradilla): «Partimos por una revisión gratis y seguimos por fases. Alcance y precio
  quedan escritos antes de empezar.» Los pasos de `paginas-v3.json`: revisión gratis → conversación y propuesta por
  escrito → implementación por fases («cada fase termina con algo que apruebas antes de seguir») → acompañamiento.
- **La metáfora:** cuatro pabellones chicos suben en diagonal por una loma, unidos por un sendero punteado, todo sobre
  una sola base flotante que cabe entera en el cuadro. El primero es un **quiosco de jardín sin paredes ni puerta**,
  iluminado en coral, con una figura ya sentada adentro: está abierto para cualquiera. El segundo es una casita cuya
  puerta **se está abriendo justo ahora**: una figura acaba de echar una carta doblada en el buzón de al lado, y las
  luces de adentro se encienden. El tercero y el cuarto están **apagados**, puerta cerrada, cada uno con su buzón
  vacío esperando.
- **Por qué dice eso:** «se abre de a una» se lee por **luz**, que es lo primero que el ojo separa: uno abierto, uno
  abriéndose, dos apagados. El primero no tiene puerta porque es gratis; el segundo se abre **después de la carta**,
  que es el «por escrito antes de empezar». No pide saber qué es una esclusa ni nada técnico.
- **Lo que resuelve de Javiera:** la primera fase abierta ahora es un quiosco sin puerta (no «una esclusa sin
  compuerta» que no se distinguía); nada sale del cuadro (base flotante con margen); cero vocabulario que haya que
  explicar en Chile.

#### `/servicios/visibilidad-en-ia/` · retro · **La operadora del conmutador**

- **Qué quiere expresar** (h1 y lead): «Qué dicen ChatGPT, Gemini y Perplexity de tu empresa. Las IA visitan tu sitio
  y también miran lo que se dice de tu empresa fuera de él.» El servicio mide cómo te describen, sin prometer que te
  citen.
- **La metáfora:** un **conmutador telefónico de época**, como los de las operadoras de antes. En vez de rótulos, cada
  clavija del panel tiene encima una tiendita dibujada, todas distintas (panadería, ferretería, consulta, librería,
  sastre, florería). Sobre el escritorio, una **guía abierta** cuyas páginas muestran esas mismas tienditas rodeadas
  de recortes de diario pegados, en blanco; una mano tiene el dedo sobre una entrada, como quien la acaba de leer. La
  otra mano sostiene un cable con la clavija **en el aire, entre dos tiendas**: está por conectar una y no la otra.
- **Por qué dice eso:** es la frase de Ramón en dos gestos: **primero te lee** (la guía, con tu sitio y lo que se dice
  de ti afuera, los recortes) **y después te recomienda o no** (la clavija que todavía no decide). En Chile «la
  operadora» y «la guía de teléfonos» se entienden sin explicación, y el chiste es que la IA hace hoy el trabajo de
  la operadora: le preguntan y te conecta con alguien. No es un robot, no espía, no habla: lee y elige.
- **Lo que resuelve de Javiera:** fuera la trompetilla (salía megáfono) y el periscopio (salía cañería); fuera la
  lectura de espionaje, porque ya nadie escucha a escondidas: alguien consulta una guía pública y decide.

#### `/diagnostico/` · retro · **El maletín de pruebas**

- **Qué quiere expresar** (h1 y entradilla): «Chequeo gratis. Mira si ChatGPT y otras IA pueden visitar tu sitio y
  entenderlo. En segundos.» Son 21 chequeos en tres bloques con peso: ¿te pueden leer? (30), ¿te entienden? (40),
  ¿te pueden citar? (30). «Automático, en segundos. Te dice si estás técnicamente listo.»
- **La metáfora:** un **equipo de pruebas portátil de los años 50**, de los que venían en maleta: abierto sobre un
  banco, con **tres diales analógicos** en la tapa (el del medio un poco más grande) y las agujas en pleno barrido. De
  la maleta salen dos cables con caimanes, enganchados a una tarjetita parada en un soporte de madera: una página
  hecha solo de una franja arriba y barras en blanco. Una mano aprieta el botón grande de baquelita. Al lado, un reloj
  de arena casi vacío.
- **Por qué dice eso:** un chequeo es enchufar el instrumento y mirar la aguja, no abrir el motor (eso es la
  auditoría, que está en la misma fila: la diferencia entre las dos páginas queda dibujada). Los tres diales son los
  tres bloques, y el del medio es más grande porque **entender pesa 40**. El reloj de arena dice «en segundos»; la
  maleta dice «viene a ti y es liviano». Es un instrumento de época manejado a mano: cero robots.
- **Lo que resuelve de Javiera:** no hay brazos de ningún tipo, ni cinta transportadora; la única mano es humana y
  aprieta un botón. La página no lleva círculo ni montañita.

#### `/servicios/paid-media/` · afiche · **La linterna**

- **Qué quiere expresar** (h1 y lead): «Tu anuncio aparece cuando alguien busca en Google lo que vendes, que es cuando
  está más cerca de comprar.»
- **La metáfora:** casi todo el afiche es **un bloque negro enorme**, como un cuarto a oscuras. Una mano en trama
  entra con una **linterna** vieja de metal, y el haz corta un cono de papel lima a través del negro. **Dentro del
  cono, y solo ahí,** otra mano tiende un paquete amarrado con cordel hacia quien mira. Nada más: ni otros objetos ni
  otras manos; un par de filetes y las marcas de corte en el margen.
- **Por qué dice eso:** buscar es alumbrar en lo oscuro, y el anuncio de búsqueda existe exactamente donde cae la luz:
  no antes, no al lado. La oferta vive solo dentro del haz, que es lo que Javiera pidió de la lupa, con un objeto que
  no es muletilla. Y el afiche usa su propio lenguaje para el chiste: el bloque negro que en las otras significa
  «texto» aquí es la oscuridad.
- **Lo que resuelve de Javiera:** una sola idea con tres elementos (linterna, haz, paquete); fuera los paquetes
  sueltos, la segunda lupa, el megáfono y la burbuja de chat; y fuera la lupa misma (§0.8).

#### `/trabajo/` · afiche · **El cuadro y el nivel**

- **Qué quiere expresar** (h1, entradilla y description): «Un sitio hecho para un cliente y una herramienta propia.
  Cada entrada dice de quién es.» El cliente es un fotógrafo; la herramienta propia es Verifica y Cumple, que revisa
  si un sitio cumple la ley de datos.
- **La metáfora:** un **cuadro colgado** al centro del afiche; adentro, una fotografía en trama de una cámara antigua
  sobre un trípode de madera, en un estudio (el trabajo para otro, y otro que es fotógrafo). De una esquina del marco
  cuelga una etiqueta en blanco. Sobre el canto de arriba, una mano apoya un **nivel de carpintero** de madera, con su
  burbuja **justo al centro**. Alrededor, papel vacío y pocas barras.
- **Por qué dice eso:** las dos entradas de la página en un solo gesto: lo que hicimos para un cliente (el cuadro con
  su foto y su etiqueta, que dice de quién es) y lo que hicimos para nosotros (la herramienta que verifica). El nivel
  es literalmente «verifica y cumple»: la burbuja al centro es el cuadro derecho. Se entiende de un vistazo y tiene el
  chiste de la página dentro.
- **Lo que resuelve de Javiera:** el díptico se explicaba con un pie de foto; esto se explica solo. Fuera la lupa y el
  metro de la mitad derecha.

#### `/blog/` · afiche · **Se explica el truco** (misma idea, ejecución corregida)

- **Qué quiere expresar** (h1 y entradilla): «Lo que escribimos sobre búsqueda e IA. Cómo funciona esto por dentro. La
  metodología está publicada a propósito.»
- **La metáfora (se conserva):** una galera de mago en corte, como lámina de texto de ciencias: el doble fondo, el
  resorte y el conejo esperando. Una mano con guante blanco lo señala como quien da una clase.
- **Por qué dice eso:** el marketing suele venderse como magia; el blog enseña el doble fondo. Javiera la marcó como la
  mejor idea de la serie.
- **La corrección (solo ejecución):** **una sola varita**, y su punta **toca el doble fondo** (en la ronda 1 salió una
  segunda varita y la que había apuntaba al conejo, que es justo lo que no se explica). Además, una sola galera, un
  solo conejo y una sola mano en todo el afiche: las celdas laterales con otra galera, otro conejo y el resorte suelto
  salen, y las columnas quedan solo de barras negras. Papel al lima nuevo.

#### `/contacto/` · foto · **La taza que ya tienes y la que todavía no**

- **Qué quiere expresar** (h1 y entradilla): «Hablemos de tu sitio. Del que ya tienes o del que todavía no. Si ya
  tienes uno, te lo revisamos gratis; si todavía no, te decimos cómo lo haríamos y cuánto cuesta.»
- **La metáfora:** una mano desliza hacia quien mira una **tabla de madera**; encima, lado a lado, una **taza de
  cerámica hecha a mano**, terminada y con café humeando, y al lado **una bola de greda fresca del mismo tamaño**,
  todavía sin forma, con una huella de dedo. Junto a ellas, una estique de madera de alfarero.
- **Por qué dice eso:** «del que ya tienes o del que todavía no» en dos objetos del mismo material: la taza que existe
  y la que todavía es barro. El chiste es que **la terminada trae el café**: la conversación ya está servida en la que
  tienes, y la otra se hace a mano y a la medida, como el sitio. La mano viene hacia ti porque la página te invita a
  escribir. Es oficio y es mesa de conversación, no inmobiliaria.
- **Lo que resuelve de Javiera:** fuera las llaves (inmobiliaria). La taza de café ya no es decorado de fondo: es la
  mitad de la idea.

---

## 3 · Los prompts

Modelo: `gpt_image_2_5` (el de la ronda 1, `pruebas/registro.md`), 16:9, calidad por defecto, una variante por página.
`image_references`: §1.1-1.4 dicen cuál en la ronda 2. Antes de generar: preflight de costo con `get_cost`.

### 3A · Las siete de la ronda 2

#### 3A.1 · `/metodo/` · isometrico

```
Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines, flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread. Scene: four small pavilions climb a gentle grassy hillside in a diagonal line from lower left to upper right, joined by one winding dotted footpath. The whole hillside sits on a single floating isometric tile that fits entirely inside the frame with a wide empty margin of dark violet on every side; nothing touches or crosses the edges. The first pavilion, at the bottom, is an open garden gazebo with no walls and no door at all, glowing warm coral, with a tiny figure seen from behind already sitting inside at a little table. The second pavilion is a small house whose front door is swinging open right now: a tiny figure seen from behind has just dropped a folded white letter into the mailbox beside the door, and the lights inside are switching on in coral, spilling a warm patch of light onto the path. The third and fourth pavilions are dark violet and unlit, doors shut, each with its own empty mailbox waiting beside the door. The progression must read at a glance: one open, one opening, two still dark. Keep the four pavilions within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3A.2 · `/servicios/visibilidad-en-ia/` · retro

```
Highly detailed retro-technical illustration in a deep bottle-green palette and nothing else: a near-black bottle-green ground, forms shaded in muted forest and olive green, linework and highlights in a soft pale light green. No yellow, no lime, no chartreuse, no other colour. Precise vector line like a 1960s engineering manual or patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care. Dense, mechanical, quietly funny. Scene: an old-fashioned manual telephone switchboard from the 1950s standing on a wooden operator's desk. Instead of labels, every jack on its tall panel is crowned by a tiny drawn shopfront, each one different: a bakery with a striped awning, a hardware store, a small clinic, a bookshop, a tailor, a florist. On the desk lies a thick directory book, open: its pages show the same tiny shopfronts surrounded by pasted newspaper clippings with blank columns. Two human hands enter from the bottom of the frame in rolled shirt sleeves, no person visible. One hand rests a fingertip on one entry of the open directory, as if it has just read it. The other hand holds a patch cord with its plug hovering in mid-air between two shopfront jacks, about to connect one of them and not the other. A few other cords are already plugged in, hanging in soft loops. Keep the hovering plug and the open directory within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3A.3 · `/diagnostico/` · retro

```
Highly detailed retro-technical illustration in a deep bottle-green palette and nothing else: a near-black bottle-green ground, forms shaded in muted forest and olive green, linework and highlights in a soft pale light green. No yellow, no lime, no chartreuse, no other colour. Precise vector line like a 1960s engineering manual or patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care. Dense, mechanical, quietly funny. Scene: a portable 1950s field test set that opens like a small suitcase, standing open on a wooden workbench. Its lid holds three round analog dials side by side, the middle one slightly larger than the other two, each with its needle caught mid-swing over a scale of plain tick marks with no numerals. Two coiled cables with crocodile clips run from the case to a single small upright card standing in a little wooden holder: the card is a tiny web page made only of a top strip and a few horizontal blank bars, with no pictures on it. One human hand enters from the side in a rolled shirt sleeve and presses a big round bakelite push button on the case. Beside the case stands a small hourglass with almost all of its sand already fallen. Simple hand-operated instruments only: no conveyor belt, no machinery arms. Keep the open case and the card within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3A.4 · `/servicios/paid-media/` · afiche

```
Underground magazine poster: fresh leaf-green lime paper background, a green-leaning lime clearly greener than lemon or chartreuse and never yellow, with heavy grain; black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, green lime and black. Bold, witty, editorial, with generous empty paper. Scene: almost the whole poster is one huge solid black block, like a dark room, leaving only a narrow lime margin around it. Just left of centre, a halftone cut-out of a hand holding an old metal flashlight points to the right, and its beam cuts one sharp cone of bare lime paper across the black. Inside the cone of light, and only there, a second halftone hand just right of centre holds out a single parcel tied with string towards the viewer, as if it had been waiting exactly where someone happened to look. Nothing else on the poster: no other objects, no other hands, only two thin black rules and the crop marks on the lime margin. Keep the flashlight, the beam and the parcel within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3A.5 · `/trabajo/` · afiche

```
Underground magazine poster: fresh leaf-green lime paper background, a green-leaning lime clearly greener than lemon or chartreuse and never yellow, with heavy grain; black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, green lime and black. Bold, witty, editorial, with generous empty paper. Scene: a single picture frame hangs at the centre of the poster from a thin wire. Inside the frame, a halftone photograph of a vintage camera on a wooden tripod in a quiet photo studio. A small blank luggage tag hangs on a string from the lower corner of the frame. A halftone hand rests a carpenter's spirit level on the top edge of the frame: a plain wooden level with one glass vial, its bubble sitting exactly in the middle; the level has no markings and no numbers. Around it, only a few short black bars and thin rules, and plenty of empty lime paper. Keep the frame and the spirit level within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3A.6 · `/blog/` · afiche

```
Underground magazine poster: fresh leaf-green lime paper background, a green-leaning lime clearly greener than lemon or chartreuse and never yellow, with heavy grain; black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, green lime and black. Bold, witty, editorial, with generous empty paper. Scene: one magician's top hat, alone, shown as a cutaway section like a plate in a science textbook: its false bottom, the hidden spring mechanism beneath it and a rabbit calmly waiting in the secret compartment are all revealed. A single white-gloved hand enters from the right and holds one single magic wand, and the tip of that wand touches exactly the false bottom, like a teacher pointing at a diagram. There is only one hat, one rabbit, one hand and one wand in the whole poster: no other hats, rabbits, springs or wands anywhere, and no picture cells at the sides. Around the hat, narrow columns of solid black bars run like the text columns of a magazine article. Keep the hat and the wand tip within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3A.7 · `/contacto/` · foto

```
Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical objects arranged with precise order and spacing. Tactile textures of wood, paper, metal, clay and fabric; muted palette of olive, cream, raw wood and paper. Editorial still life shot on medium-format colour film, with a fine, even film grain visible across the whole frame, never smooth, glossy or plastic. Scene: low frontal view across a wooden table. One hand slides a small rectangular wooden board towards the viewer. On the board, side by side: a finished handmade ceramic cup glazed in cream, full of black coffee with a thin wisp of steam, and next to it a fresh ball of wet grey clay of the same size, still unshaped, with one fingerprint pressed into it. A small wooden potter's rib lies beside them on the board. The gesture is an invitation to sit down and talk. Keep the cup and the ball of clay within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks, and any dial or scale shows only plain tick marks. No magnifying glass, no megaphone, no placeholder picture icon of a circle and a mountain. No robots, no robotic or mechanical arms, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3B · Las seis aprobadas (ronda 1, no se regeneran; quedan para una regeneración futura o un cambio de proporción)

Van con el lock y el cierre **de la ronda 1**, tal como se generaron. Si alguna se regenera, se cambia su lock por el
de §1 (R2) y su cierre por §1.5, sin tocar la escena.

#### 3B.1 · `/nosotros/` · isometrico

```
Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines, flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread. Scene: a compact little city arranged in a ring around its central station, and the central station is a large web browser window standing upright like a building, its windows made of abstract blank blocks. Every street, rail and cable leads in and out of it: a small tram, a delivery van, a cable car on a wire, a paper plane on a dotted flight path, a lighthouse sweeping its beam, a radio mast sending signal rings, a tiny market stall. All of them move along dotted lines that start and end at the browser-window station, so the whole city visibly runs around that one building. Keep the central station in the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3B.2 · `/servicios/` · isometrico

```
Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines, flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread. Scene: an exploded-view diagram like the contents of a model-railway kit. At the bottom, one flat base tile shaped like a website page with abstract blank blocks. Floating above it, separated with generous space, five independent modules on their own small tiles: a lighthouse, a roadside billboard with a blank face, a radio mast with signal rings, a small library, and a tiny workshop with a turning gear. Each module has a small blank price tag hanging from a string, and a dotted guide line drops from each module to the exact socket on the base where it would click in. A tiny figure seen from behind holds one module, deciding where to place it. Keep the base and modules within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3B.3 · `/servicios/auditoria-seo-tecnica/` · retro

Lo que se generó en la ronda 1 (lock lima). **Si se regenera al verde nuevo (§1.7)**, se reemplaza la primera frase,
hasta «Dense, mechanical, quietly funny.», por el lock 1.2 R2, y el cierre por §1.5; la escena no cambia.

```
Highly detailed retro-technical illustration in a single colour: acid chartreuse-lime linework and fills on a near-black olive ground, nothing else. Precise vector line like a 1960s engineering manual or patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care. Dense, mechanical, quietly funny. Scene: a website drawn as if it were an engine on a mechanic's workbench, shown as a cutaway: its outer casing is shaped like a browser window with abstract blank blocks, and one side is sliced open to reveal gears, pipes, valves, belts and tangled cables inside. A small inspector seen from behind leans over it with an articulated magnifying lamp. Blank inspection tags hang on strings from several parts inside, clearly in three different sizes, the biggest tag on the most important part. Keep the engine within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3B.4 · `/servicios/redes-sociales/` · afiche

```
Underground magazine poster: acid chartreuse-lime paper background with heavy grain, black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, lime and black. Bold, witty, editorial. Scene: a strict grid of square cells like a contact sheet or a month on a wall planner. The cells hold small halftone cut-outs that repeat in a clear rhythm: a megaphone, two clapping hands, a coffee cup, a vintage camera, a waving hand, with some cells left as solid black blocks. One cell near the centre is empty, and a pair of tweezers holds a cut-out just above it, about to set it in place. Keep the empty cell and the tweezers within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3B.5 · `/servicios/desarrollo-web/` · foto

```
Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical objects arranged with precise order and spacing. Tactile textures of wood, paper, metal and fabric; muted palette of olive, cream, raw wood and paper. Editorial still life, medium-format look. Scene: top-down view of a tailor's work surface. Two hands trace with white tailor's chalk and cut with large steel tailor's shears a cream paper pattern whose outline is the shape of a web page: a header strip, two columns and rectangular blocks, like a sewing pattern for a website. Beside it, neatly laid out: a coiled cloth measuring tape, a pin cushion with pins, a few loose pins in a row. Keep the paper pattern within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

#### 3B.6 · `/servicios/acompanamiento-mensual/` · foto

```
Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical objects arranged with precise order and spacing. Tactile textures of wood, paper, metal and fabric; muted palette of olive, cream, raw wood and paper. Editorial still life, medium-format look. Scene: three-quarter view at the height of the table. A small bonsai tree in a shallow ceramic pot sits on a round wooden turntable. One hand trims a single branch with fine bonsai scissors while the other hand turns the turntable slightly. To the side, bonsai tools are lined up in order on a linen cloth, and a folded blank sheet of paper is held down by a smooth grey stone. Keep the bonsai within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

---

## 4 · Al recibir cada imagen (antes de mostrarla)

- **Mirarla entera y con zoom:** letras inventadas en etiquetas, papeles, letreros, diales o pantallas = se descarta o
  se limpia. Una etiqueta «en blanco» que sale con garabatos no pasa. **R2:** en diagnóstico y trabajo, ampliar los
  diales y el nivel: solo marcas, ninguna cifra.
- **R2 · Muletillas (§0.8):** ninguna lupa, ningún megáfono, ningún ícono de círculo y montañita, ningún brazo
  mecánico. Si aparece una, se descarta aunque el resto esté bien: es lo primero que vio Javiera.
- **R2 · Color, medido y no a ojo** (tono del percentil 90 de luminancia, como se midió la ronda 1):
  afiche **85-95°**; retro, luces **100-130°** y fondo **140-155°** con L < 0,15. Si un afiche sale bajo 85° o un retro
  trae algo amarillo o lima, se corrige en post (§1.7) o se descarta.
- **R2 · Grano:** las tres fotos pasan por §1.6 antes de ir a la hoja; se miran a 100 % y a tamaño de hero.
- **Dorado:** `../e14-home-koto/imagenes/medir-dorado.py` tiene que dar ~0 %. En contacto, la taza es crema y la
  greda gris, justamente para que no aparezca latón ni ocre.
- **Caras:** en el isométrico las figuras van de espaldas y diminutas; en retro y foto, solo manos y antebrazos.
- **R2 · El cuadro contiene la idea:** nada de la idea toca el borde (método, sobre todo).
- **Recorte 4:5:** abrir el recorte central y comprobar que la idea se sigue entendiendo.
- **La serie junta:** hoja de contactos nueva con las trece (las seis aprobadas ya con su post) y mirar que se lean como
  cuatro miradas de un mismo estudio, con cada fila en su verde y ninguna compitiendo con el amarillo del botón.
- **La revisa Javiera en un subagente limpio**, contra este lock y sus críticas de la ronda 1, antes de que la vea
  Ramón.

## 5 · Lo que queda abierto para Ramón

1. Aprobar o cambiar las siete ideas de §2.1 **antes** de gastar créditos.
2. **Costo de la ronda 2:** 7 imágenes × 0,25 = **1,75 créditos** (más 0,25 si auditoría se regenera en vez de
   recolorearse en post). Tope duro: 3 créditos. Preflight con `get_cost` antes de lanzar.
3. **redes-sociales al lima nuevo** (§1.7): se hace en post, sin regenerar. Si prefiere dejarla en el lima de la ronda
   1, se deja y la fila afiche queda con una de otro tono.

---

## 6 · Historial de correcciones

Cada corrección marcada como **regla** (pasa a §0 y obliga desde aquí) o **preferencia** (se aplica a esa imagen y no
vuelve a discutirse).

### Ronda 2 · 3-nov-2026 · revisión de Javiera sobre la hoja de la ronda 1, aprobada por Ramón

| # | Corrección | Tipo | Dónde quedó |
|---|---|---|---|
| 1 | Retro y afiche sumaban 7 imágenes del mismo lima (72-74°), demasiado cerca del botón `#FFE800`. Retro pasa a verde botella con luces verde claro; afiche a lima más verde (85-95°). | **regla** | §0.7, §1.2, §1.3, §4 |
| 2 | Las fotos salían lisas, sin grano. Grano fino de película en el prompt y en post (PIL, monocromo), también en las dos aprobadas. | **regla** | §0.3, §1.4, §1.6 |
| 3 | Muletillas de IA: lupa (5), megáfono (3), wireframe con círculo y montañita. Fuera de toda imagen nueva. | **regla** | §0.8, §1.5, §4 |
| 4 | Brazos robóticos en diagnóstico. Ningún brazo mecánico articulado, aunque no sea humanoide. | **regla** | §0.6, §1.5 |
| 5 | Método: el canal se salía del cuadro. La idea entera va dentro del cuadro. | **regla** | §0.9 |
| 6 | Paid media: paquetes, lupa, megáfono y burbuja de más. Pocos elementos: si hay que mirar cinco objetos, sobran cuatro. | **regla** | §0.2 |
| 7 | Método: «esclusa» pide explicación en Chile y la primera fase abierta no se leía. Idea nueva: luces que se encienden de a una. | preferencia | §2.1, §3A.1 |
| 8 | Visibilidad: trompetilla salió megáfono, periscopio salió cañería, se leía espionaje. Idea nueva: el conmutador (te lee y después te conecta o no). | preferencia | §2.1, §3A.2 |
| 9 | Diagnóstico: idea nueva, el maletín de pruebas a mano. | preferencia | §2.1, §3A.3 |
| 10 | Paid media: idea nueva, la linterna (sin lupa, por la regla 3). | preferencia | §2.1, §3A.4 |
| 11 | Trabajo: no se entendía. Idea nueva: el cuadro y el nivel. | preferencia | §2.1, §3A.5 |
| 12 | Blog: se conserva la idea; una sola varita, apuntando al doble fondo, y una sola galera, un conejo y una mano. | preferencia | §2.1, §3A.6 |
| 13 | Contacto: las llaves parecían inmobiliaria. Idea nueva: la taza y la greda. | preferencia | §2.1, §3A.7 |
| 14 | Auditoría (aprobada) pasa al verde nuevo, en post o regenerada, la que se vea mejor; redes-sociales (aprobada) pasa al lima nuevo en post. | preferencia | §1.7 |

### Ronda 1 · 3-nov-2026 · las ideas que se reemplazaron (para no volver a ellas)

| Página | Idea de la ronda 1 | Por qué salió |
|---|---|---|
| `/metodo/` | **Las esclusas.** Un canal que sube en cuatro esclusas por una ladera; un bote ya pasó la primera (sin compuerta) y espera en la segunda; las siguientes, cerradas con su guarda. | La primera abierta no se distinguía, el canal salía del cuadro y «esclusa» pide explicación en Chile. |
| `/servicios/visibilidad-en-ia/` | **Te están escuchando.** Una tienda en un pedestal rodeada de un micrófono parabólico, una trompetilla y un periscopio que también apuntan a la vereda. | Trompetilla = megáfono (dice hablar), periscopio = cañería; se leía como espionaje. |
| `/diagnostico/` | **Control de calidad.** Cinta transportadora con tres estaciones: un lente que lee, un calibre que mide y un brazo que sella. | Salieron brazos robóticos. |
| `/servicios/paid-media/` | **Justo en la lupa.** Mano con lupa gigante; dentro del lente, otra mano ofrece un paquete. | Salieron paquetes, otra lupa, un megáfono y una burbuja de chat de más; y la lupa pasó a ser muletilla. |
| `/trabajo/` | **Para afuera y para la casa.** Díptico: cámara embalada en caja con etiqueta / pie de metro y lupa en el banco. | No se entendía sin pie de foto. |
| `/blog/` | **Se explica el truco.** (Se conserva.) | Solo ejecución: dos varitas, la punta no iba al doble fondo, galeras y conejos repetidos en las celdas. |
| `/contacto/` | **Una llave y una llave en blanco**, empujadas hacia quien mira, con una taza al fondo. | Las llaves se leían como inmobiliaria. |

### Ronda 1 · fichas de las seis aprobadas (vigentes)

| Página | Estilo | Qué quiere expresar (de su JSON) | La idea visual | Por qué esa idea dice eso |
|---|---|---|---|---|
| `/nosotros/` | isometrico | El sitio es el eje y todo lo demás (Google, IA, anuncios, redes) se le conecta. | **La ciudad que gira en torno a un sitio.** La estación central de una ciudad pequeña es una ventana de navegador puesta de pie, con bloques por ventanas; de ella salen y a ella vuelven un tranvía, una furgoneta, un teleférico, un avión de papel, un faro y una antena, todos por líneas punteadas. | Es la frase de Ramón tal cual: una ciudad coordinada de cosas que se mueven para que funcione, y todas pasan por el mismo punto. Lo ingenioso es que el centro de la ciudad, donde iría la plaza, es un sitio web. |
| `/servicios/` | isometrico | Seis soluciones que se contratan por separado, cada una con su precio a la vista, que se enchufan al sitio. | **El catálogo de piezas.** Una vista despiezada, como la caja de una maqueta de trenes: una base (el sitio) y, flotando sobre ella, cinco módulos sueltos, cada uno con una etiqueta de precio en blanco y una línea punteada que marca dónde encaja. | «¿Tengo que contratar todo? No»: cada pieza se ve suelta y con su etiqueta, y todas encajan en la misma base. La etiqueta en blanco dice «precio a la vista» sin poner una cifra. |
| `/servicios/auditoria-seo-tecnica/` | retro | Qué le impide a Google entender tu sitio, y qué arreglar primero. | **El sitio en el banco del mecánico.** Un sitio web dibujado como un motor de manual de taller, abierto en corte; un inspector de espaldas; etiquetas de inspección en blanco de tres tamaños. | La auditoría abre el sitio como se abre un motor: no se queda en la carrocería. Las etiquetas de tamaños distintos son el plan ordenado por impacto. |
| `/servicios/redes-sociales/` | afiche | Tus publicaciones y tu publicidad, con un calendario editorial que se corrige cada mes. | **El calendario se arma a mano.** Una retícula de celdas como una hoja de contactos o un mes; recortes que se repiten con ritmo; una pinza pone un recorte en su celda vacía. | Las redes no son posts sueltos: son un calendario con ritmo. La pinza es la corrección de cada mes. |
| `/servicios/desarrollo-web/` | foto | Un sitio a medida, hecho para tu negocio, con código propio y panel para editar; nada de plantillas. | **Hecho a la medida, como un traje.** Vista cenital: manos que trazan y cortan un molde de papel con silueta de página web; huincha, alfileres y acerico en orden. | «A medida» es literal en un taller de sastre: se mide, se traza y se corta para una persona. Eso es lo contrario de una plantilla. |
| `/servicios/acompanamiento-mensual/` | foto | Cada mes hacemos lo que la auditoría dijo que había que hacer, y lo seguimos. | **El jardinero de cada mes.** Un bonsái en un plato giratorio; una mano lo poda mientras la otra gira el plato; una hoja doblada en blanco bajo una piedra. | Un bonsái no se arregla una vez: se trabaja un poco cada mes, según un plan. La hoja bajo la piedra es la auditoría que manda lo que se poda. |
