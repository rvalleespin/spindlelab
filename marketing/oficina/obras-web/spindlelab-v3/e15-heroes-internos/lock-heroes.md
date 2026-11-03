# E15 · Heroes de las páginas internas · lock de estilos y escenas

**3-nov-2026 · Lucía (dirección de arte) con Bruno (dirección creativa).** Para revisión de Ramón antes de generar.
**No se generó nada ni se gastó ningún crédito.** No se tocó `spindlelab-astro/` ni nada publicado.

Se apoya en: el texto de cada página (`spindlelab-astro/src/data/archivo/texto/<pagina>.json`, h1, entradilla y el
«trabajo» de cada sección), los leads de `spindlelab-astro/src/data/servicios-v3.json`, las cuatro referencias de
estilo que Ramón aprobó en Higgsfield y lo que dijo de ellas, y lo que ya se rechazó en E14
(`../e14-home-koto/imagenes-v2/LEEME.md`: hilo plateado «muy IA, no me dice nada», pizarra «ni pensarlo»,
ilustración que «le quita seriedad»).

---

## 0 · Lo que manda este lock

1. **Cada imagen dice lo que dice su página.** Ninguna escena es decoración ni «algo de marketing»: sale del h1 y de
   la entradilla de su JSON, y la columna «por qué» de la tabla (§2) tiene que poder defenderla sin adjetivos.
2. **Una idea por imagen, y que se entienda al mirarla.** Es ilustración editorial de revista: una metáfora con
   ingenio, que saca una sonrisa y después se lee. Ni literal (una lupa sobre un gráfico) ni críptica.
3. **Cuatro miradas de un mismo estudio, no cuatro proveedores.** La serie se sostiene por tres cosas que comparten
   las cuatro: (a) el **grano** (película, trama o riso; nada sale liso ni plástico), (b) una **paleta en eje
   verde-violeta**: oliva y lima en retro, afiche y foto, con el violeta del isométrico como contrapunto y el coral
   como única nota caliente, y (c) el **mismo tipo de chiste**: un objeto cotidiano que hace el trabajo de la página.
4. **A color.** La referencia isométrica (f55e938d) vale solo por su composición: era en blanco y negro y Ramón la
   quiere a color. Retro y afiche son de dos tintas a propósito (lima y negro u oliva), no en blanco y negro.
5. **Cero texto.** Ni letras, ni números, ni logos, ni interfaz legible. Las pantallas y las páginas solo muestran
   bloques abstractos; en el afiche, donde iría texto, van barras negras. Una etiqueta de precio va **en blanco**.
6. **Lo que ya se rechazó no vuelve:** caricatura, pizarra, ilustración infantil, foto genérica de banco, lo plano «de
   IA». Tampoco robots, cerebros, circuitos, neón ni azules «tech». Sin caras protagonistas: manos, antebrazos o
   figuras pequeñas y de espaldas.
7. **El amarillo de acción (`#FFE800`) es del botón, no de la imagen.** El lima de retro y afiche se pide **ácido y
   tirado a verde (chartreuse)**, nunca limón: si un generado sale amarillo puro, compite con el único acento de la
   página y se corrige o se descarta. Nada de dorado en ninguna imagen (el oro vive en el hilo de la home).

**Formato de trabajo:** se genera en 16:9 con la idea entera dentro del **50 % central del ancho**, para que el recorte
4:5 del celular la conserve. La proporción final del hero interno la fija la spec de la construcción; si cambia, se
regenera con la misma escena y otro `aspect_ratio`, no se recorta a ciegas.

---

## 1 · Las cuatro frases de lock (en inglés, para el generador)

Cada prompt de §3 es **lock del estilo + escena + cierre común**. El lock no se edita por página: si una escena pide
otra cosa, se cambia la escena.

### 1.1 · `isometrico` (ref. de composición f55e938d-5a96-47be-b703-71faa9c89ea9, llevada a color)

> Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines,
> flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft
> lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects
> in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from
> behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread.

### 1.2 · `retro` (ref. d4d88d56-f11f-4f80-8685-b3d32df6b2c9)

> Highly detailed retro-technical illustration in a single colour: acid chartreuse-lime linework and fills on a
> near-black olive ground, nothing else. Precise vector line like a 1960s engineering manual or patent drawing,
> halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care.
> Dense, mechanical, quietly funny.

### 1.3 · `afiche` (ref. 7122519e-df6b-4e6b-a346-bcc5ebfdaa9b)

> Underground magazine poster: acid chartreuse-lime paper background with heavy grain, black halftone photographic
> cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules,
> crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black
> bars. Two inks only, lime and black. Bold, witty, editorial.

### 1.4 · `foto` (ref. 33df342a-94c9-42c9-a837-141b11e17a7d)

> Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side
> casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical
> objects arranged with precise order and spacing. Tactile textures of wood, paper, metal and fabric; muted palette of
> olive, cream, raw wood and paper. Editorial still life, medium-format look.

### 1.5 · Cierre común (va al final de los trece)

> No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or
> abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.

---

## 2 · Página → estilo → qué quiere decir → la idea → por qué

Composición por estilo, para que dentro de cada uno ninguna se repita:

- **isometrico:** ciudad densa en anillo (Nosotros) · vista despiezada de módulos flotando (Servicios) · escalera en
  diagonal (Método).
- **retro:** objeto abierto en corte (Auditoría) · objeto al centro rodeado de instrumentos (Visibilidad) · línea de
  montaje de izquierda a derecha (Diagnóstico).
- **afiche:** un recorte gigante que domina (Paid Media) · retícula de muchas celdas (Redes) · díptico partido al medio
  (Trabajo) · objeto en sección con una mano que señala (Blog).
- **foto:** cenital sobre la mesa (Desarrollo web) · tres cuartos a la altura del objeto (Acompañamiento) · frontal y
  bajo, la mano viene hacia ti (Contacto).

| Página | Estilo | Qué quiere expresar (de su JSON) | La idea visual | Por qué esa idea dice eso |
|---|---|---|---|---|
| `/nosotros/` | isometrico | El sitio es el eje y todo lo demás (Google, IA, anuncios, redes) se le conecta. | **La ciudad que gira en torno a un sitio.** La estación central de una ciudad pequeña es una ventana de navegador puesta de pie, con bloques por ventanas; de ella salen y a ella vuelven un tranvía, una furgoneta, un teleférico, un avión de papel, un faro y una antena, todos por líneas punteadas. | Es la frase de Ramón tal cual: una ciudad coordinada de cosas que se mueven para que funcione, y todas pasan por el mismo punto. Lo ingenioso es que el centro de la ciudad, donde iría la plaza, es un sitio web. |
| `/servicios/` | isometrico | Seis soluciones que se contratan por separado, cada una con su precio a la vista, que se enchufan al sitio. | **El catálogo de piezas.** Una vista despiezada, como la caja de una maqueta de trenes: una base (el sitio) y, flotando sobre ella, cinco módulos sueltos (un faro, un cartel de carretera, una antena, una biblioteca chica, un taller), cada uno con una etiqueta de precio colgando, en blanco, y una línea punteada que marca dónde encaja. | «¿Tengo que contratar todo? No»: cada pieza se ve suelta y con su etiqueta, y todas encajan en la misma base. La etiqueta en blanco dice «precio a la vista» sin poner una cifra. |
| `/metodo/` | isometrico | Partimos por una revisión gratis y seguimos por fases; cada una se aprueba y se paga por escrito antes de empezar. | **Las esclusas.** Un canal que sube en cuatro esclusas por una ladera; un bote chico ya pasó la primera (abierta, sin compuerta) y espera en la segunda a que suba el agua; las compuertas siguientes están cerradas, cada una con su manivela y un guarda de espaldas. | Una esclusa no deja pasar al bote hasta que la etapa está lista: es el método por fases, con la primera gratis y el resto subiendo de a una. Se entiende sin saber nada de SEO. |
| `/servicios/auditoria-seo-tecnica/` | retro | Qué le impide a Google entender tu sitio, y qué arreglar primero. | **El sitio en el banco del mecánico.** Un sitio web dibujado como un motor de manual de taller, abierto en corte: engranajes, cañerías y cables por dentro; un inspector chico, de espaldas, con lámpara de lupa; de algunas piezas cuelgan etiquetas de inspección en blanco, de mayor a menor. | La auditoría abre el sitio como se abre un motor: no se queda en la carrocería. Las etiquetas de tamaños distintos son el plan ordenado por impacto: la más grande se arregla primero. |
| `/servicios/visibilidad-en-ia/` | retro | Qué dicen de tu empresa las IA, que leen tu sitio y también lo que se dice de ti afuera. | **Te están escuchando.** Una tienda pequeña sobre un pedestal, rodeada por tres aparatos de escucha de época, cada uno distinto (un micrófono parabólico, una trompetilla de bronce en trípode, un periscopio), apuntando a la tienda y al quiosco y los letreros en blanco de la vereda de al lado. | Tres aparatos distintos son tres motores distintos, y no son robots: son oídos. Que también apunten a la vereda es lo que dice el lead: la IA mira tu sitio y lo que se dice de ti fuera de él. |
| `/diagnostico/` | retro | Chequeo gratis y en segundos: si las IA pueden visitar tu sitio, entenderlo y citarlo. | **Control de calidad.** Una cinta transportadora de fábrica en tres cuartos; una página web (un panel con bloques) avanza por tres estaciones: un lente que la lee, un calibre que la mide y un brazo que le pone un sello en blanco. | Las tres estaciones son los tres bloques del chequeo (leer, entender, citar) y la cinta dice «automático, en segundos». Es el instrumento, no una promesa. |
| `/servicios/paid-media/` | afiche | Tu anuncio aparece cuando alguien busca en Google lo que vendes, que es cuando está más cerca de comprar. | **Justo en la lupa.** Un recorte enorme de una mano con lupa domina el afiche; dentro del lente, y solo ahí, aparece otra mano que ofrece un paquete. Afuera del lente, la retícula de barras negras sigue igual. | El anuncio de búsqueda existe en el momento exacto en que alguien busca: aparece dentro de la lupa, no en la calle. El chiste es que la oferta vive adentro de la búsqueda. |
| `/servicios/redes-sociales/` | afiche | Tus publicaciones y tu publicidad, con un calendario editorial que se corrige cada mes. | **El calendario se arma a mano.** Una retícula estricta de celdas cuadradas, como una hoja de contactos o un mes; en las celdas, recortes en trama que se repiten con ritmo (un megáfono, dos manos que aplauden, una taza, una cámara, una mano que saluda); una pinza sostiene un recorte justo antes de ponerlo en su celda vacía. | Las redes no son posts sueltos: son un calendario con ritmo. La pinza es la corrección de cada mes, una pieza que se mueve a su lugar. |
| `/trabajo/` | afiche | Lo hecho, y de quién es cada cosa: un sitio para un cliente y una herramienta propia. | **Para afuera y para la casa.** Un díptico partido por un filete negro grueso: a la izquierda, una cámara antigua en trama dentro de una caja de despacho amarrada con cordel y una etiqueta en blanco; a la derecha, un pie de metro y una lupa sobre un banco de trabajo, sin envolver. | «Cada entrada dice de quién es»: una cosa se embala y se entrega (encargo), la otra se queda en el banco (propia). La cámara apunta al cliente que hay sin nombrarlo. |
| `/blog/` | afiche | Darnos a conocer: cómo funciona esto por dentro, sobre nuestro trabajo y el marketing; la metodología publicada a propósito. | **Se explica el truco.** Un sombrero de copa de mago en recorte, partido en sección como lámina: se ve el doble fondo, el mecanismo y el conejo esperando adentro; una mano con guante blanco lo señala con una varita, como quien da una clase. Alrededor, columnas de barras negras como una página de revista. | El marketing suele venderse como magia; el blog hace lo contrario y enseña el doble fondo. Es divertido, se entiende al tiro y dice «escribimos sobre cómo funciona esto, a propósito». |
| `/servicios/desarrollo-web/` | foto | Un sitio a medida, hecho para tu negocio, con código propio y panel para editar; nada de plantillas. | **Hecho a la medida, como un traje.** Vista cenital: manos con manga de pana trazan con tiza de sastre y cortan con tijera grande un molde de papel cuya silueta es la de una página web (cabecera, columnas, bloques); al lado, una huincha de sastre, alfileres y un acerico, en orden. | «A medida» es literal en un taller de sastre: se mide, se traza y se corta para una persona, no se saca de una percha. Eso es lo contrario de una plantilla. |
| `/servicios/acompanamiento-mensual/` | foto | Cada mes hacemos lo que la auditoría dijo que había que hacer, y lo seguimos. | **El jardinero de cada mes.** Un bonsái sobre un plato giratorio de madera; una mano con manga de pana lo poda con tijeras finas mientras la otra gira el plato; al lado, herramientas ordenadas y una hoja doblada, en blanco, sujeta bajo una piedra lisa. | Un bonsái no se arregla una vez: se trabaja un poco cada mes, según un plan. La hoja bajo la piedra es la auditoría que manda lo que se poda. |
| `/contacto/` | foto | Hablemos de tu sitio: del que ya tienes o del que todavía no. | **Una llave y una llave en blanco.** Una mano con manga de pana empuja sobre la mesa, hacia quien mira, dos llaves: una cortada y gastada, y a su lado un bruto de llave sin dientes; al fondo, una taza de café. | «Del que ya tienes o del que todavía no» en dos objetos: la llave que abre algo que existe y la que todavía hay que cortar. La mano viene hacia ti porque la página te invita a escribir; la taza es la conversación. |

---

## 3 · Los trece prompts finales

Modelo sugerido: el mismo con el que se aprobaron las referencias en Higgsfield, con la imagen de referencia de su
estilo como `image_references` (para el isométrico, la f55e938d **solo** por composición; el color lo pone el lock).
16:9, 2K. Antes de generar: preflight de costo, decirle a Ramón cuántos créditos y generar recién con su visto bueno.
Dos variantes por prompt; se elige mirando.

### 3.1 · `/nosotros/` · isometrico

```
Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines, flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread. Scene: a compact little city arranged in a ring around its central station, and the central station is a large web browser window standing upright like a building, its windows made of abstract blank blocks. Every street, rail and cable leads in and out of it: a small tram, a delivery van, a cable car on a wire, a paper plane on a dotted flight path, a lighthouse sweeping its beam, a radio mast sending signal rings, a tiny market stall. All of them move along dotted lines that start and end at the browser-window station, so the whole city visibly runs around that one building. Keep the central station in the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.2 · `/servicios/` · isometrico

```
Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines, flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread. Scene: an exploded-view diagram like the contents of a model-railway kit. At the bottom, one flat base tile shaped like a website page with abstract blank blocks. Floating above it, separated with generous space, five independent modules on their own small tiles: a lighthouse, a roadside billboard with a blank face, a radio mast with signal rings, a small library, and a tiny workshop with a turning gear. Each module has a small blank price tag hanging from a string, and a dotted guide line drops from each module to the exact socket on the base where it would click in. A tiny figure seen from behind holds one module, deciding where to place it. Keep the base and modules within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.3 · `/metodo/` · isometrico

```
Isometric editorial illustration in full colour, strict 30-degree isometric projection, precise hairline outlines, flat colour fills with a fine film grain and a subtle risograph texture. Limited palette: deep violet and soft lilac, glowing coral and burnt orange, turquoise-green accents, set on a deep dark violet ground. Many small objects in motion, linked to one another by dotted paths, thin signal rings and arcs; tiny anonymous figures seen from behind, no bigger than a fingernail. Intricate, calm and witty, curated like a double-page magazine spread. Scene: a canal climbing a hillside in a diagonal staircase of four lock chambers, from lower left to upper right. The first lock has no gate at all and stands open; a small coral boat has already passed it and floats in the second chamber while the water visibly rises to lift it. The two locks above are closed, each with its own wooden gate, a crank wheel and a tiny lock keeper seen from behind waiting beside it. Dotted lines trace the boat's route up through each chamber; small ripple rings spread on the water. Keep the staircase of locks within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.4 · `/servicios/auditoria-seo-tecnica/` · retro

```
Highly detailed retro-technical illustration in a single colour: acid chartreuse-lime linework and fills on a near-black olive ground, nothing else. Precise vector line like a 1960s engineering manual or patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care. Dense, mechanical, quietly funny. Scene: a website drawn as if it were an engine on a mechanic's workbench, shown as a cutaway: its outer casing is shaped like a browser window with abstract blank blocks, and one side is sliced open to reveal gears, pipes, valves, belts and tangled cables inside. A small inspector seen from behind leans over it with an articulated magnifying lamp. Blank inspection tags hang on strings from several parts inside, clearly in three different sizes, the biggest tag on the most important part. Keep the engine within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.5 · `/servicios/visibilidad-en-ia/` · retro

```
Highly detailed retro-technical illustration in a single colour: acid chartreuse-lime linework and fills on a near-black olive ground, nothing else. Precise vector line like a 1960s engineering manual or patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care. Dense, mechanical, quietly funny. Scene: a small shopfront building standing on a round pedestal in the centre, and around it three different vintage listening machines, each of a different design: a large parabolic microphone dish on a stand, a long brass ear trumpet on a tripod, and a periscope rising from a manhole. Each machine is aimed at the shop, and their cables run back to reel-to-reel tape recorders. Next to the shop, on the same pavement, a newsstand with blank folded papers and two blank signboards, and the machines also tilt towards them, listening to the street as well as the shop. Keep the shop and the three machines within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.6 · `/diagnostico/` · retro

```
Highly detailed retro-technical illustration in a single colour: acid chartreuse-lime linework and fills on a near-black olive ground, nothing else. Precise vector line like a 1960s engineering manual or patent drawing, halftone dot shading, visible film grain, three-quarter view, every bolt, hinge and cable drawn with care. Dense, mechanical, quietly funny. Scene: a factory quality-control line seen in three-quarter view, a conveyor belt running from left to right. A single flat panel shaped like a web page with abstract blank blocks rides on the belt through three stations in a row: first a large reading lens on an articulated arm scanning it, then a precision caliper gauge closing gently around it, then a mechanical arm about to press a round blank stamp on it. Small motion lines show the belt moving fast. Keep the three stations within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.7 · `/servicios/paid-media/` · afiche

```
Underground magazine poster: acid chartreuse-lime paper background with heavy grain, black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, lime and black. Bold, witty, editorial. Scene: one huge halftone cut-out of a hand holding a magnifying glass dominates the poster, the lens placed in the centre. Inside the lens, and only inside it, a second small halftone hand appears offering a wrapped parcel straight to the viewer, as if the offer lives inside the act of searching. Outside the lens, the grid of black bars and rules continues untouched. Keep the lens within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.8 · `/servicios/redes-sociales/` · afiche

```
Underground magazine poster: acid chartreuse-lime paper background with heavy grain, black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, lime and black. Bold, witty, editorial. Scene: a strict grid of square cells like a contact sheet or a month on a wall planner. The cells hold small halftone cut-outs that repeat in a clear rhythm: a megaphone, two clapping hands, a coffee cup, a vintage camera, a waving hand, with some cells left as solid black blocks. One cell near the centre is empty, and a pair of tweezers holds a cut-out just above it, about to set it in place. Keep the empty cell and the tweezers within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.9 · `/trabajo/` · afiche

```
Underground magazine poster: acid chartreuse-lime paper background with heavy grain, black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, lime and black. Bold, witty, editorial. Scene: a diptych split down the middle by one thick black vertical rule. Left half: a halftone cut-out of a vintage camera packed inside an open shipping box, tied with string and a blank luggage tag, ready to be delivered. Right half: a halftone cut-out of a folding ruler and a magnifying glass resting on a workbench, unwrapped, staying home. Each half has its own small black bars beneath, like two captions. Keep both objects close to the central rule, within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.10 · `/blog/` · afiche

```
Underground magazine poster: acid chartreuse-lime paper background with heavy grain, black halftone photographic cut-outs with hard scissor edges, solid black rectangular blocks set on a strict modular grid, thin black rules, crop marks and printer's registration marks in the corners. Wherever text would go there are only solid black bars. Two inks only, lime and black. Bold, witty, editorial. Scene: a magician's top hat shown as a cutaway section, like a page in a science textbook: the false bottom, the hidden spring mechanism and a rabbit calmly waiting inside are all revealed. A white-gloved hand enters from the side and points at the hidden compartment with a magic wand, like a teacher explaining the trick. Around it, narrow columns of black bars run like the text columns of a magazine article. Keep the hat within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.11 · `/servicios/desarrollo-web/` · foto

```
Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical objects arranged with precise order and spacing. Tactile textures of wood, paper, metal and fabric; muted palette of olive, cream, raw wood and paper. Editorial still life, medium-format look. Scene: top-down view of a tailor's work surface. Two hands trace with white tailor's chalk and cut with large steel tailor's shears a cream paper pattern whose outline is the shape of a web page: a header strip, two columns and rectangular blocks, like a sewing pattern for a website. Beside it, neatly laid out: a coiled cloth measuring tape, a pin cushion with pins, a few loose pins in a row. Keep the paper pattern within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.12 · `/servicios/acompanamiento-mensual/` · foto

```
Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical objects arranged with precise order and spacing. Tactile textures of wood, paper, metal and fabric; muted palette of olive, cream, raw wood and paper. Editorial still life, medium-format look. Scene: three-quarter view at the height of the table. A small bonsai tree in a shallow ceramic pot sits on a round wooden turntable. One hand trims a single branch with fine bonsai scissors while the other hand turns the turntable slightly. To the side, bonsai tools are lined up in order on a linen cloth, and a folded blank sheet of paper is held down by a smooth grey stone. Keep the bonsai within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

### 3.13 · `/contacto/` · foto

```
Commercial studio photograph on a seamless flat olive-green background, soft natural window light from one side casting a crisp, defined shadow. Hands and forearms in an olive corduroy sleeve enter the frame; real physical objects arranged with precise order and spacing. Tactile textures of wood, paper, metal and fabric; muted palette of olive, cream, raw wood and paper. Editorial still life, medium-format look. Scene: low frontal view across a wooden table. One hand slides two keys towards the viewer, side by side: a worn steel key with fully cut teeth, and next to it an uncut key blank with a smooth edge and no teeth. Behind them, slightly out of focus, a single ceramic cup of coffee. The gesture is an invitation. Keep the two keys within the middle half of the frame. No text, no letters, no numbers, no logos, no legible interface: any screen, page or label shows only blank or abstract blocks. No robots, no brains, no circuit boards, no neon, no electric tech blue, no gold. No visible faces.
```

---

## 4 · Al recibir cada imagen (antes de mostrarla)

- **Mirarla entera y con zoom:** letras inventadas en etiquetas, papeles, letreros o pantallas = se descarta o se
  limpia. Una etiqueta «en blanco» que sale con garabatos no pasa.
- **Lima:** si en retro o afiche el fondo salió amarillo limón, se corre a verde en el revelado (tono hacia ~75-85°)
  o se descarta; el amarillo de la página es el del botón.
- **Dorado:** `../e14-home-koto/imagenes/medir-dorado.py` tiene que dar ~0 %. En contacto, la llave se pide de acero
  justamente para que no salga latón.
- **Caras:** en el isométrico las figuras van de espaldas y diminutas; en foto, solo manos y antebrazos.
- **Recorte 4:5:** abrir el recorte central y comprobar que la idea se sigue entendiendo.
- **La serie junta:** poner las trece en una hoja de contactos y mirar que se lean como cuatro miradas de un mismo
  estudio (grano, eje verde-violeta, un objeto cotidiano haciendo el trabajo de la página).

## 5 · Lo que queda abierto para Ramón

1. Aprobar o cambiar las trece ideas de §2 **antes** de gastar créditos.
2. Fondo del isométrico: este lock lo fija en violeta oscuro para que conviva con el `#060606` de la página; la
   referencia también admitía crema. Si quiere que Nosotros resalte como la pieza favorita, se puede pedir solo esa en
   crema.
3. Modelo y costo: preflight en Higgsfield y número de créditos antes de generar (13 prompts × 2 variantes).
