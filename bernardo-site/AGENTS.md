## Proyecto: sitio de Bernardo Combeau (fotógrafo)

Cotización SPL-COT-2026-014, enviada 8 jul 2026. Estado (9 jul 2026): anticipo/OK confirmado,
material real (fotos, bio, dirección de arte definitiva) **aún no recibido** — se está
trabajando Fase 1-2 (Descubrimiento + Diseño) en paralelo mientras llega.

**Checkpoint (9 jul 2026, noche):** vista previa enviada a Bernardo vía
https://bernardo-vista-previa.vercel.app (home + galería, home ajustado a estilo NOOR real
tras revisar noorimages.com en vivo).

**Checkpoint 2 (9 jul 2026, más tarde):** llegó el primer feedback real de Bernardo — le
gustó el sitio, pidió contenido nuevo. Se agregó:
- Frase del hero (real, de Bernardo): "Un buen retrato no se toma. Se construye, dirigiendo
  a la persona hasta su mejor versión."
- Página **Sobre mí** nueva (bio real de Bernardo + foto suya, pendiente — la está
  gestionando junto con las de estudio).
- Página **Servicios** nueva (Personal Branding $200.000, Corporativo en estudio $200.000,
  Corporativo en oficina $300.000, Otros proyectos a cotizar) — decisión confirmada con
  Ramón: sí va como ítem propio del menú, no escondida en otra página.
- **Estudio** (4 fotos + texto) va dentro de **Encargos**, no de Sobre mí — confirmado
  explícitamente por Ramón, contradice mi suposición inicial.
- Página **Contacto** nueva con su copy real, pero con WhatsApp/email/Instagram como
  placeholders "pendiente" — Bernardo no dio los datos reales todavía, no inventar.
- El texto de Estudio que mandó Bernardo tiene un hueco literal ("Ubicado en  a pasos del
  Metro El Golf" — el nombre del barrio/dirección quedó en blanco). Se dejó marcado en la
  maqueta (`.gap`, fondo rojizo) en vez de adivinar "El Golf" — falta que Bernardo confirme
  la dirección exacta.
- Nav pasó de 4 a 5 ítems en todas las páginas: Series · Encargos · Servicios · Sobre mí ·
  Contacto.

Pendiente de Bernardo/Ramón antes de seguir: número de WhatsApp, email, @ de Instagram, y la
dirección/barrio exacto del estudio. Cuando lleguen: reemplazar los placeholders "pendiente"
en `bernardo-vista-previa/index.html` (y su fuente en el scratchpad), redesplegar con
`vercel deploy --yes` + `vercel alias set`.

**Checkpoint 3 (9 jul 2026, más tarde):** a Ramón le gustó el avance ("elegante y fino").
Pidió tres ajustes:
1. Frase del hero en 2 líneas fijas (8 palabras cada una, corte en la coma) — implementado
   con `<br>` manual en vez de dejarlo al ancho de pantalla, porque el wrap natural daba 3
   líneas dispares.
2. Jerarquía de tamaños — la frase del hero (lo más importante de la home) era más chica que
   "Lo último" (una simple etiqueta de sección). Se agrandó el hero (clamp 1.3rem→2.3rem) y
   se achicó "Lo último" (clamp 1.2rem→1.5rem) para que el hero domine.
3. Redacción y tono — confirmado con Ramón que el alcance incluye también el texto de
   Bernardo, no solo el mío. Se reescribieron las notas internas ("De dónde sale cada
   decisión", que son mías) más secas y directas. En el texto de Bernardo (bio + estudio) se
   hizo una edición liviana: se sacó el andamiaje "no se trata solo de X — se trata de Y" del
   segundo párrafo de la bio (reemplazado por "es tanto X como Y"), se destrabó una oración
   con doble "que" ("lo mucho que depende del director... que esa incomodidad"), y se bajó la
   densidad de guiones largos en un par de frases. El sentido de lo que dice Bernardo no
   cambió — es edición de forma, no de contenido.

**Checkpoint 4 (13 jul 2026):** Ramón dejó 12 capturas de pantalla del Instagram de Bernardo
en `bernardo-site/fotos/` (nombres originales tipo "Captura de pantalla... p.m..png") y pidió
renombrarlas "a como debería estar en la web". Se revisó el contenido de las 12 y se
renombraron in situ (misma carpeta) a slugs descriptivos en orden cronológico de subida:
`bernardo-portafolio-01-campo-flores.png` ... `bernardo-portafolio-12-torso-bn.png`. Contenido
de cada una (para no tener que re-abrirlas): 01 campo de flores (torso desnudo), 02 escalera de
metro urbano, 03 piscina con camisa/corbata (conceptual), 04 bicicleta compartida al atardecer,
05 capucha en micro/bus (b/n), 06 luz lateral dramática, camisa lila (retrato femenino), 07
tocado de orejas tipo conejo, estética urbana/drag, 08 pañuelo rojo, retrato femenino de edad
en atardecer, 09 chaqueta de mezclilla con estrellas, fondo de grafiti urbano, 10 auto tipo
jeep con binoculares, atardecer, 11 banco/taburete, luz de estudio azul, 12 primer plano de
torso masculino en b/n.

Dos cosas para tener en cuenta antes de usarlas como asset final:
- **Todavía no se decide a qué sección del sitio va cada una** (Home/feed, Series, Encargos,
  Estudio) — eso es curatorial y le corresponde a Bernardo/Ramón, no se asumió al renombrar.
  El prefijo "portafolio" es deliberadamente genérico por eso; 11 y 12 sí muestran fondo/luz de
  estudio real pero no son necesariamente las "4 fotos de Estudio" que Bernardo dijo que estaba
  gestionando aparte junto con su propia foto de Sobre mí — no confundir ambos lotes.
- **Resuelto (13 jul 2026, mismo día):** 7 de las 12 (01, 02, 04, 05, 08, 10, 11) traían un
  ícono circular de avatar genérico de Instagram pegado en la esquina inferior izquierda —
  eran screenshots del feed, no el archivo limpio. Se recortaron 100px del borde inferior
  (ancho completo) de esas 7 con Pillow (instalado vía `pip3 install --user Pillow`, no estaba
  disponible en el sistema) y se verificó visualmente que el ícono desapareció en las 7. Las 5
  restantes (03, 06, 07, 09, 12) no tenían el ícono y se dejaron intactas, sin recortar. Se
  guardó una copia de respaldo pre-recorte en el scratchpad de la sesión por si hace falta
  volver atrás. Único caso con costo real: en 11 (taburete azul) el pie descalzo del modelo
  llega casi hasta el borde inferior original, casi al mismo nivel que el ícono — el recorte le
  quita los dedos/la punta del pie, pero el encuadre resultante se ve natural (lee como un
  recorte ajustado a propósito, no como un error).
- Nota aparte, no relacionada al renombre: la diversidad que muestran estas 12 (varios hombres,
  pero también mujeres y una estética drag/urbana) calza con lo que el propio Bernardo dijo en
  su feedback ("tengo mucho más trabajo con hombres... pero trataré de poner más material
  diverso") — es consistente con lo pedido, no un exceso de la curatoría propia.

**Checkpoint 5 (13 jul 2026, mismo día):** a pedido de Ramón ("aplica en el sitio!") se
integraron las 12 fotos reales (ya recortadas) en la maqueta, reemplazando los 10 placeholders
de Unsplash y llenando 2 cupos de Encargos que estaban vacíos ("encargo — pendiente"). Mapeo
curatorial (decisión propia, no confirmada aún por Bernardo — es solo para que la vista previa
deje de verse con fotos de stock):
- Hero → 08 (pañuelo/atardecer). Feed "Lo último" → FEED1: 06 (luz lateral rosa), FEED2: 10
  (auto/binoculares, también reutilizada en Encargos card 1), PROCESS: 05 (bus/capucha), CARDA:
  01 (campo de flores), CARDB: 09 (grafiti urbano), CARDC: 07 (orejas de conejo).
- Galería (única serie de la maqueta) → SLIDE1: 02 (metro urbano), SLIDE2: 04 (bicicleta
  atardecer), SLIDE3: 12 (torso b/n).
- Encargos, los 2 cupos que decían "pendiente" → ENCARGO2: 03 (piscina/corbata), ENCARGO3: 11
  (taburete azul de estudio).
- Sin tocar (siguen como placeholder, correcto): la foto de Bernardo en Sobre mí y las 4 fotos
  de la sección Estudio dentro de Encargos — ambas Bernardo dijo que las está gestionando
  aparte, no son parte de este lote de Instagram.
Cambios técnicos: se agregaron dos tokens nuevos al template (`__IMG_ENCARGO2__`,
`__IMG_ENCARGO3__`) reemplazando los `<div class="photo placeholder">` de Encargos; se
convirtieron las 12 PNG a JPEG calidad 84 (Pillow) antes de convertir a base64, para no
inflar el HTML con PNG sin comprimir. Banner superior de la maqueta actualizado para reflejar
que ya no son fotos de Unsplash. Redesplegado con el flujo ya establecido (`vercel deploy
--yes` + `vercel alias set`) y verificado con JS in-page (chequeo de `naturalWidth`/
`naturalHeight` de cada `<img>` más screenshots de Home, Encargos, Galería y Sobre mí) — las
12 cargan bien, sin íconos de Instagram visibles, y las secciones aún pendientes siguen
marcadas como tal.

Documentos fuente en el repo padre (`../COTIZACIONES/`, `../ventas/`):
- `SPL-INT-2026-014_referentes_interno.html` — análisis de referentes (Magnum, SHOWstudio,
  NOOR, Agence VU', Nadav Kander, premiados Awwwards) y la arquitectura/reglas de abajo.
- `SPL-COT-2026-014_sitio_web_fotografo.pdf` (+ `_generador.py`) — alcance, 5 fases, 60
  fotos/galería tope, plan contratado (confirmar cuál de los 3: Esencial/Pro/Vanguardia).
- `../ventas/proceso-desarrollo-web-cliente.md` — proceso y errores ya pagados en
  spindlelab.cl, para no repetirlos aquí (ver "Lecciones técnicas" abajo).

### Referente principal y arquitectura

Modelo: **Nadav Kander** (studio feed — home como flujo cronológico de lo más reciente),
con uno o dos gestos de impacto tipo SHOWstudio en portada. Fondo neutro, la fotografía es
la interfaz — el diseño desaparece.

```
Home (feed curado: lo más reciente + mejores series)
├── Series      obra personal, cada una con título y texto (colección `series`)
├── Encargos    editorial y comercial, con publicaciones (colección `encargos`)
├── Film        si aplica
├── Biografía   ensayo, no CV
└── Contacto    email, teléfono, representante, IG
```

Reglas de diseño (no negociables salvo instrucción explícita):
- Fondo blanco o negro + gris. Sin color de marca.
- Una sola tipografía sans, un peso. El nombre de Bernardo como logotipo tipográfico.
- **Nunca texto sobre imagen.**
- Máximo 6 ítems en el nav.
- Un solo CTA por bloque de home.
- Crédito y contexto siempre: pie con lugar y año, © visible.
- Una sola interacción firma en todo el sitio (ej. transición al abrir una serie) — elegir
  una y ejecutarla perfecta, no acumular efectos. Prototipar al final, no al principio.
- Render server-side obligatorio — nunca un sitio que llegue vacío sin JS (contraejemplo:
  showstudio.com, vii.photo). Astro ya lo garantiza por defecto.

### Contenido como datos

`src/content.config.ts` define dos colecciones, `series` y `encargos` (ver README dentro de
cada carpeta en `src/content/` para el frontmatter exacto). Cada serie/encargo es un
markdown con su propia carpeta de imágenes. Tope: 60 imágenes por galería (límite de la
cotización — adicionales se cotizan aparte). **No inventar contenido de relleno**: sin fotos
reales de Bernardo, estas carpetas quedan vacías, no se rellenan con placeholders con datos
inventados (política SpindleLab: cero prueba social o dato inventado).

### Diseño (Fase 2) — estado del Figma

Se decidió archivo **nuevo desde cero** para Bernardo (no duplicar el de SpindleLab: ese
archivo está vestido con la marca de SpindleLab y el patrón "servicio + ficha técnica" no
calza con un portafolio de galería).

Archivo creado (9 jul 2026), vacío, en el único equipo de la cuenta ("El equipo de ramon
vallejos"), carpeta de borradores por defecto — moverlo a una carpeta de proyecto/cliente si
Ramón organiza así su Figma:
- fileKey: `vKfq5xVOKZHTXoRWaDSM0F`
- URL: https://www.figma.com/design/vKfq5xVOKZHTXoRWaDSM0F

Antes de que Ramón diseñe los frames, se armaron tres propuestas de entrada a partir de
`SPL-INT-2026-014_referentes_interno.html` (9 jul 2026), en orden creciente de fidelidad:
1. Wireframe anotado (estructura + trazabilidad decisión→referente).
2. Maqueta de alta fidelidad — tipografía real (Switzer, Fontshare, licencia libre para web),
   tratamiento fotográfico simulado (gradiente+grano), una micro-interacción viva (hover en
   tarjetas de serie). Fotos placeholders explícitos.
3. Maqueta con fotos reales de Unsplash (licencia libre, uso de referencia) en vez de
   placeholders — retratos b/n de mood editorial (Kander/Avedon), elegidas a mano y revisadas
   visualmente antes de publicar. **Con atribución pendiente si se usan como asset final**:
   Unsplash no exige crédito pero investigar si el fotógrafo de origen lo pide igual; en
   cualquier caso son solo referencia, deben reemplazarse por fotos reales de Bernardo antes
   de producción. La página de Galería se rediseñó como **slide/carrusel de una imagen a la
   vez** (radio-buttons + CSS, sin JS) — combina Agence VU' (sliders full-bleed) con la regla
   de Kander de respetar la proporción original de cada foto (object-fit:contain en vez de
   forzar un aspect-ratio común), reemplazando el diseño anterior de secuencia apilada con
   separador tipográfico.

Ambas son referencia de entrada para Figma. Ramón pidió empujar una primera versión directo
al archivo con `use_figma` (9 jul 2026) — primer uso de las herramientas generativas del
Figma MCP en este proyecto, hasta entonces solo se habían usado las de lectura.

Frames creados dentro de `vKfq5xVOKZHTXoRWaDSM0F`: **Home** (node 4:63, 1440×3729) y
**Galería — plantilla de serie** (node 4:102, 1440×950 tras la reestructura), reproduciendo
la estructura de la maqueta de alta fidelidad.

Actualización (9 jul 2026, misma tarde): se reemplazaron los placeholders sólidos por fotos
reales de Unsplash (las mismas 10 imágenes curadas para la maqueta v3, recomprimidas más
chicas — hasta ~30KB cada una — para caber en el límite de 50.000 caracteres del `code` de
`use_figma`; `scaleMode: FILL` para hero/feed/cards, `FIT` para los 3 stages de Galería para
respetar la proporción original). Además, la Galería se reestructuró: se quitó la secuencia
apilada con separador tipográfico y se reemplazó por una fila de 3 "stages" (nodes 13:2,
13:5, 13:8) que muestran las 3 fotos una junto a otra — el equivalente estático del slide de
la maqueta HTML, ya que Figma no tiene un mecanismo real de "un estado a la vez".

Detalles a tener en cuenta al abrir el archivo:
- **Tipografía: Inter, no Switzer.** Switzer no está instalada en la cuenta de Figma de Ramón
  (`listAvailableFontsAsync` no la encontró), así que el script cayó al fallback Inter —
  siempre disponible en Figma. Cambiar la fuente en Figma una vez que se decida la tipografía
  final; no hay compromiso real con Inter, es solo lo que el generador pudo cargar.
- Los "auto-layout" con altura ajustada a contenido (`primaryAxisSizingMode: AUTO`) no
  recalcularon en la primera pasada — quedaron todos en 10px de alto y las secciones se
  superponían. Se corrigió calculando cada altura explícitamente en el script a partir del
  tamaño real medido de los hijos, sin depender del auto-ajuste de Figma. Si se generan más
  frames por script en este proyecto, replicar ese patrón (medir, sumar, fijar) en vez de
  confiar en `AUTO`.
- Las fotos de Unsplash son de referencia — reemplazar por fotografías reales de Bernardo
  antes de producción (mismo aviso que en la maqueta HTML v3).

De aquí en más, la iteración pixel a pixel es de Ramón en la app de Figma — este primer
push es punto de partida, no versión final.

### Vista previa pública (Vercel)

El artifact de Claude no lo pudo ver Bernardo (requiere sesión en claude.ai), así que la
maqueta HTML (v3, con fotos reales + galería como slide) se subió a Vercel como sitio
estático independiente:

- Repo local: `bernardo-vista-previa/index.html` (copia standalone de
  `maqueta-visual-v3.html`, ~1MB con fuente e imágenes incrustadas en base64).
- Proyecto Vercel: `bernardo-vista-previa` bajo la cuenta `manuvalleespin-8100`.
- URL estable: **https://bernardo-vista-previa.vercel.app** — esta es la que se le manda a
  Bernardo. Al actualizar el HTML, cada `vercel deploy --yes` (sin `--prod`) crea un preview
  nuevo; para que la URL estable apunte a la versión nueva hay que correr
  `vercel alias set <preview-url> bernardo-vista-previa.vercel.app` (evita el flag `--prod`,
  que el clasificador de modo automático bloqueó una vez por combinarse con `--yes` sin paso
  de revisión).
- Ajuste de dirección (9 jul 2026, misma noche): a pedido de Ramón, el home se acercó al
  estilo de **NOOR** — declaración de identidad fuerte arriba de todo, los bloques del feed
  pasaron de tarjeta con margen a heroes a sangre completa apilados con titular más grande, y
  cada historia lleva firma visible ("— Bernardo Combeau"). El hero principal se dejó con su
  caption pequeña original (más Kander) a propósito, para que hero vs. feed tengan jerarquía
  distinta en vez de verse todo igual de fuerte. Regla "nunca texto sobre imagen" se mantuvo
  intacta — NOOR sí pone texto corto sobre la foto en su sitio real, pero eso no se adoptó
  sin pedirlo explícitamente.

Precedente de spindlelab.cl (mismo patrón a seguir aquí): la iteración de diseño ocurre en
el **agente nativo de Figma**, dentro de la app, por Ramón — no generando diseños con
herramientas propias de este agente. El rol de Claude Code es leer el frame ya aprobado vía
Figma MCP (`get_design_context`, `get_screenshot`, `get_metadata`, `get_variable_defs`) y
traducirlo a código a mano. No usar herramientas generativas de Figma MCP para inventar el
diseño.

### Lecciones técnicas de spindlelab.cl (no repetir)

- **Nunca `position:absolute` para encajar una foto en un contenedor de layout.** Usar
  in-flow + `object-fit:cover` con contenedor `overflow:hidden`. Bug real: un
  `position:absolute` sin ancestro posicionado con altura explícita colapsa a tamaño cero.
- **Versionar cualquier asset que se sobrescriba en el mismo path** (`?v=2`, `?v=3`...) desde
  el principio si el hosting sirve `Cache-Control: immutable` — si no, cache poisoning en
  CDN y navegador. `immutable` de larga duración solo para archivos content-addressed (ej.
  fuentes con hash en el nombre); imágenes/CSS que sí cambian van con `max-age` corto +
  `must-revalidate`.
- Después de un deploy, esperar ~20-30s antes de verificar una URL recién versionada — un
  nodo de CDN en transición puede "quemar" ese `?v=N` exacto con contenido viejo por horas.
- El favicon necesita variante clara y oscura, pero la regla es seguir la que el manual de
  marca de Bernardo defina como "principal" — no improvisar cuál se ve mejor. (Bernardo
  todavía no tiene manual de marca propio: aplica cuando exista, o preguntar si usa
  simplemente su nombre como wordmark sin sistema de marca separado.)
- Todo copy generado por IA (mío o del agente nativo de Figma) se revisa buscando
  específicamente números, clientes o afirmaciones inventadas antes de aprobar — no solo
  si "se ve bien". Pasó una vez en spindlelab.cl con una cifra de clientes inventada.
- Cualquier proveedor externo que reciba datos de clientes reales (formulario de contacto,
  de reserva de sesión) necesita confirmación explícita y nombrada por Ramón antes de
  implementarlo — no elegir uno por cuenta propia.

### Pendiente de Bernardo (Fase 1, bloqueando Fase 2 completa)

- Fotografías reales (series + encargos), hasta 60 por galería.
- Bio para la página de Biografía (ensayo, no CV).
- Confirmar plan contratado (Esencial/Pro/Vanguardia) — condiciona el nivel de
  interactividad y la promesa de rendimiento (90+ móvil solo aplica al plan Pro).
- Proveedor de formulario de contacto, si va a recolectar datos reales.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
