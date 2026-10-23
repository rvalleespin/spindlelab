# E12 · Capa de señales de la obra: title, description, canonical, Open Graph y JSON-LD por ruta

**Simón (SEO y visibilidad en IA), con Diego · 19-oct-2026, 10:25 a 10:45 (Chile)** · rama `claude/magical-franklin-ckfki2`
· para Diego, que la construye en la corrida 2 (aquí no se codifica nada y `spindlelab-astro/` no se tocó: solo se leyó
para saber qué emite hoy cada ruta). **Manda:** el brief, secciones «Compuerta 2» y «Compuerta 1»
(`e12/brief-de-obra.md`); lo común de `e12/senales-trabajo.md`, que esta nota no repite y a la que **supera donde
choquen** (§0); `e12/inventario-casos.md` (§2, §2.9) e `e12/inventario-praxi.md` (§8, §11). Precios y nombres, como
texto, de `spindlelab-astro/src/data/oferta-v3.json` y `servicios-v3.json`.

**La regla, en una línea (la de `senales-trabajo.md`, sin cambios):** el JSON-LD dice lo que la página dice en texto y
lo que tiene fila en el inventario; nada más. **Y la del brief §2, aplicada a lo que se lee fuera de la página** (el
resultado de Google, la tarjeta al compartir): cada término técnico va con lo que le hace al cliente, o no va.

---

## 0 · Lo que cambia respecto de `senales-trabajo.md` (18-oct)

| Allá | Aquí, desde la compuerta 2 | Por qué |
|---|---|---|
| Dos rutas de Combeau, `combeau-fotografia/` y `combeau-modelo/` | **Una:** `/trabajo/combeau/`, con sus dos partes (`#fotografia`, `#modelo`) | «5f ambos son casos reales», un caso con dos sitios (brief §3; inventario §2.9) |
| Una ruta para `verifica-y-cumple/`, `chequeo/` y `spindlelab-cl/` | **Sin página propia:** son entradas del índice. Su `ListItem` lleva la URL adonde lleve la entrada (§2.2) | Brief «Compuerta 2», fila 6: solo Praxi y Combeau tienen página de caso; Verifica y Cumple sigue como entrada, sin su puntaje |
| El 54 → 94 «mientras Ramón no decida» | **No va** en ningún nodo ni texto de esta capa | Pregunta 6 de la compuerta 2, por defecto |
| Praxi: `praxi.coach` «da 402» como motivo | La regla sigue (sin `offers`, sin `url`, sin `sameAs`) y **la página ya no dice el motivo** | Pregunta 5b: «no se cuenta» |
| Imagen al compartir: las de la v3 de E10 (`og-v3.jpg`, `og-v3-desarrollo-web.jpg`) | **Imágenes nuevas** (§1.6) | La de titular lleva el lema de E10/E11 («Estás pagando para que lleguen a tu sitio. Ahí se corta el circuito.») y la de obra, las maquetas viejas; ninguna es de la identidad nueva |

---

## 1 · Lo común a todas las rutas

### 1.1 · Entidades y `@id`

- **Las tres de siempre las emite `Layout.astro`** y ninguna página las repite: `https://spindlelab.cl/#org`
  (`ProfessionalService`), `#website` (`WebSite`) y `#autor-ramon` (`Person`). Cada página suma su grafo por el slot
  `head`, como hoy (`v3/trabajo.astro`, comentario «EL JSON-LD va por el slot head»).
- **Nodos de página, con la URL final (sin `/v3/`) como base** (así lo hacen ya las rutas v3): `<url>#webpage`
  (o `#collectionpage`, `#aboutpage`), `<url>#breadcrumb`, `<url>#caso` (la pieza), `<url>#itemlist`, `<url>#faq`.
  Un `@id` no se reutiliza para otra cosa en ninguna página.
- **`#org` al publicar** (no antes: `Layout.astro` es el mismo de producción, y el brief §6.7 lo protege). Cambian su
  `description` y su `logo`; el `@id`, el nombre, `makesOffer` (los seis servicios, mismos nombres) y `sameAs` quedan:

  > `description`: «Estudio de diseño y tecnología en Santiago: diseñamos y programamos sitios y herramientas a
  > medida, y hacemos SEO técnico y visibilidad en motores de IA (AEO/GEO) para que Google y ChatGPT puedan leerlos.»
  > `knowsAbout`: se suman «Diseño web» y «Desarrollo de aplicaciones web»; quedan los de hoy.
  > `logo`: el PNG del logo final de El huso (lo dibuja Bruno en esta corrida, `e12/logo/`), cuadrado, ≥ 512 px.

  Cómo, sin tocar producción antes de tiempo: una prop opcional del `Layout` para esos tres campos, cuyo valor por
  defecto es el de hoy, de modo que las páginas publicadas salgan byte a byte iguales; el v3 la pasa. No toca gtag,
  consentimiento ni Pixel (lo que el §6.7 nombra), pero es un cambio en `Layout.astro`: va a `desvios.md` con su porqué.
- **`#autor-ramon`, `jobTitle` (R5 del brief, «desalineado con el giro»):** propuesta «Fundador de SpindleLab: diseño y
  desarrollo web, SEO técnico y visibilidad en IA». **Es su cargo: lo confirma Ramón** antes de publicar. Mismo
  mecanismo que `#org`.

### 1.2 · `title`, `description` y `canonical`

- **`title` ≤ 60 caracteres contando « · SpindleLab»**, con la consulta que lo buscaría al principio. Donde el sufijo
  no cabe sin cortar lo que importa, va sin él (como `/servicios/` hoy). **`description` de 120 a 160.** Los largos de
  esta nota están contados con Python (`len`, sobre el texto tal cual).
- **Mientras viva bajo `/v3/`:** `noindex, nofollow` y la `canonical` que calcula el `Layout` (la propia URL `/v3/…`).
  **Al publicar:** `canonical` a la ruta final sin `/v3/` (la columna «canonical» de §2), y las rutas nuevas entran al
  `sitemap.xml` (las 20 de hoy no cambian; suman `/trabajo/`, `/trabajo/praxi/`, `/trabajo/combeau/` y las cuatro de
  concepto: 27).
- `inLanguage: "es-CL"` en cada nodo de página; `dateModified` lo escribe el build, nunca a mano.

### 1.3 · Open Graph

- El `Layout` emite `og:title` = `title` y `og:description` = `description`; **no se agrega una prop para separarlos**:
  el título de la tarjeta es el de la pestaña. `og:type`: `website`, salvo los artículos del blog (`article`).
- **`og:image` 1200 × 630, JPEG** (el `Layout` declara `og:image:type` fijo en `image/jpeg`), ≤ 200 kB, con
  `?v=1` en la ruta (la trampa del caché de `_headers`), y su `og:image:alt` dice qué se ve.
- **Tres reglas de contenido para las tarjetas, porque una tarjeta viaja sola, sin la página que la explica:**
  1. **Un concepto lleva «CONCEPTO» dentro de la imagen.** Las portadas 5:3 de las cuatro piezas ya lo traen.
  2. **Combeau, sin sus medidas:** sale de `casos/combeau/medios/`, nunca de una captura de `/modelo/` bajo el pliegue.
  3. **Praxi, sin personas generadas ni cifras de ejemplo** (si no, la tarjeta tendría que llevar el aviso adentro).
     Y el video del hilo de oro **no va en ninguna tarjeta**: su excepción es la portada de la home (brief «Compuerta
     2», fila 4: «no abre la puerta a otra imagen generada»).

### 1.4 · La regla de los términos, aplicada a lo que se lee fuera de la página

| Término | Con lo que le hace al cliente (la forma que usan los textos de §2) |
|---|---|
| SEO técnico | que Google pueda rastrear y entender tu sitio |
| Visibilidad en IA, AEO/GEO | que ChatGPT, Gemini o Perplexity puedan leerte y citarte |
| Chequeo de 21 señales | revisa al instante si ChatGPT, Claude y Perplexity pueden leer, entender y citar tu sitio |
| Datos estructurados | (no va en ningún `title` ni `description`; en el texto: «una máquina puede leer quién eres y a qué te dedicas») |
| Core Web Vitals, E-E-A-T, «alta intención», «claridad de entidad» | no van fuera de la página: no caben con su explicación en 160 caracteres |
| Agentes de IA | «programa con agentes de IA cuyo código él revisa» (Ramón; `nosotros.astro:85`) o «con agentes de IA» (Praxi, 5e) |

### 1.5 · Lo que no va en ninguna ruta

`Review`, `AggregateRating`, `review`, `award`; un `FAQPage` sin sus preguntas visibles; un número como calificación;
un `Offer` o precio que no esté, como texto, en los JSON de oferta; un prospecto; datos de contacto de Bernardo;
`VideoObject` del hilo de oro (es la imagen de la marca, no un contenido que ofrecer; declararlo lo pondría a competir
como video en Google); la marca inventada de un concepto como `Organization`, `LocalBusiness`, `MedicalClinic`,
`LegalService` o `AccountingService`.

### 1.6 · Las imágenes al compartir que hay que producir (corrida 2)

Desde HTML renderizado con Chromium, como el resto del sistema (letra y negro de A; nada generado). Las de las piezas
salen de material que ya está en el repo.

| Archivo (`public/assets/img/`) | Rutas | De dónde sale | `og:image:alt` |
|---|---|---|---|
| `og-e12-marca.jpg` | `/` | El logo final de El huso, el rótulo «Estudio de diseño y tecnología» y el `h1` del hero 3, sobre `#060606` | «SpindleLab, estudio de diseño y tecnología: diseñamos y programamos sitios a medida.» |
| `og-e12-<ruta>.jpg` (una plantilla, una imagen por ruta) | `/diagnostico/`, `/servicios/` y sus seis, `/metodo/`, `/blog/` y sus siete, `/contacto/` | La misma plantilla: el logo arriba y el `h1` real de la página, en la letra de A; el precio de entrada cuando la página lo dice (los servicios) | «SpindleLab: » + el `h1` de la página |
| `og-e12-trabajo.jpg` | `/trabajo/` | Tres piezas reales en fila: `casos/combeau/medios/combeau-fotografia-169.webp`, `proto/a/medios/praxi-reglas-169.webp` y la portada 5:3 de Sesenta, **con su «CONCEPTO» a la vista** | «Tres piezas de SpindleLab: el sitio de un fotógrafo, la app Praxi y Sesenta, un concepto.» |
| `og-e12-praxi.jpg` | `/trabajo/praxi/` | `proto/a/medios/praxi-reglas-169.webp` (de `praxi/capturas/landing-1440-sec09.jpg`): sin personas, sin datos de ejemplo | «Captura de la portada de Praxi: "Debajo del chat hay reglas, no una corazonada".» (Clara confirma la frase contra la captura) |
| `og-e12-combeau.jpg` | `/trabajo/combeau/` | `casos/combeau/medios/combeau-fotografia-169.webp` | «La portada del sitio de Bernardo Combeau, fotógrafo de retrato.» |
| `og-e12-tonela.jpg` · `-ocelo` · `-sesenta` · `-doceavo` | `/trabajo/<concepto>/` | La portada 5:3 de cada pieza (`marketing/portafolio/0N-*/identidad/portadas/`, 1050 × 630), centrada sobre `#060606`: el «CONCEPTO» queda entero | «Concepto de SpindleLab: [marca], una [rubro] que no existe.» |
| `og-e12-nosotros.jpg` | `/nosotros/` | Su retrato real (`proto/a/medios/ramon-vallejos-34.webp`, el de `nosotros.astro`) y su nombre | «Ramón Vallejos, fundador de SpindleLab.» |

---

## 2 · Por ruta

Las rutas del brief §3, con `/trabajo/<caso>/` abierto en sus seis páginas (Praxi, Combeau y los cuatro conceptos):
**27**, en el orden del mapa. Son las 20 del `sitemap.xml` de hoy, que no cambian de URL, más `/trabajo/` y los seis
casos. **«Queda»** quiere decir que el texto o el grafo de hoy se mantiene tal cual.

### 2.1 · `/` · home

| Campo | Valor | Largo |
|---|---|---|
| `title` | SpindleLab · Estudio de diseño y tecnología en Santiago (el de Clara) | 55 |
| `description` | Diseñamos y programamos sitios y herramientas a medida, listos para que Google y ChatGPT puedan leerlos. Precios publicados y un chequeo gratis de tu sitio. | 156 |
| `canonical` (al publicar) | `https://spindlelab.cl/` | |
| OG | El `title`, la `description` y `og-e12-marca.jpg` | |

**La `description` de Clara medía 170** («…y los dejamos listos para que Google y la IA puedan leerlos. Precios
publicados y un chequeo gratis para tu sitio.»): se corta a 160 en Google. La de arriba dice lo mismo en 156 y nombra
a ChatGPT, que es lo que dice el `h1` del hero 3. Clara puede devolverla a «la IA» si lo prefiere; el largo queda.

**JSON-LD** (el `WebPage` de hoy, sin cambios de `@id`):

```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "WebPage", "@id": "https://spindlelab.cl/#webpage", "url": "https://spindlelab.cl/",
    "name": "SpindleLab · Estudio de diseño y tecnología en Santiago", "description": "<la description>",
    "inLanguage": "es-CL", "isPartOf": { "@id": "https://spindlelab.cl/#website" },
    "about": { "@id": "https://spindlelab.cl/#org" } }
] }
```

**No declara:** el video de la portada (§1.5); el índice corto de trabajo como `ItemList` (ya lo es `/trabajo/`, y dos
listas del mismo índice se pisan); ningún puntaje (el 54 → 94, tampoco en el texto: defecto 20 cerrado por defecto).

### 2.2 · `/trabajo/` · índice

| Campo | Valor | Largo |
|---|---|---|
| `title` | Trabajo de diseño y desarrollo web · SpindleLab | 47 |
| `description` | Sitios, una app y herramientas que diseñamos y programamos, y cuatro marcas inventadas para rubros que atendemos. Cada entrada dice de quién es y qué se midió. (la de Clara) | 159 |
| `canonical` | `https://spindlelab.cl/trabajo/` | |
| OG | `og-e12-trabajo.jpg` | |

**El `title` de Clara era «Trabajo · SpindleLab» (20).** La QA final del 6-oct ya lo había cambiado por uno con la
consulta que lo buscaría (`v3/trabajo.astro`, «QA FINAL»); «diseño y desarrollo web» es esa consulta y es lo que hay.

**JSON-LD:** `CollectionPage` (`#collectionpage`, `mainEntity` → `#itemlist`) + `ItemList` + `BreadcrumbList`
(Inicio › Trabajo). El `ItemList`, con el orden y el conteo visibles (`numberOfItems: 10`; cada filtro cuenta lo suyo:
Cliente 2, Propio 4, Concepto 4):

| `position` | `name` | `url` |
|---|---|---|
| (el orden del muro) | Bernardo Combeau, fotografía | `https://spindlelab.cl/trabajo/combeau/#fotografia` |
| | Bernardo Combeau, modelo | `https://spindlelab.cl/trabajo/combeau/#modelo` |
| | Praxi | `https://spindlelab.cl/trabajo/praxi/` |
| | Verifica y Cumple | adonde lleve la entrada: `https://verifica.spindlelab.cl/` si enlaza al producto; sin `url` si no enlaza |
| | El chequeo de 21 señales | `https://spindlelab.cl/diagnostico/` |
| | spindlelab.cl | adonde lleve la entrada; sin `url` si no enlaza |
| | Tonela (concepto) | `https://spindlelab.cl/trabajo/tonela/` |
| | Ocelo (concepto) | `https://spindlelab.cl/trabajo/ocelo/` |
| | Sesenta (concepto) | `https://spindlelab.cl/trabajo/sesenta/` |
| | Doceavo (concepto) | `https://spindlelab.cl/trabajo/doceavo/` |

Un `ListItem` sin enlace lleva `item: { "@type": "CreativeWork", "name": … }` en vez de `url`. **Nunca una URL
`/trabajo/x/` que no exista:** los prototipos de A enlazaban `/v3/trabajo/verifica-y-cumple/`, `chequeo/`,
`combeau-fotografia/` y `combeau-modelo/`, que no se construyen.

**No declara:** un conteo de clientes; un `Organization` por entrada; los puntajes de Verifica y Cumple o de
spindlelab.cl (pregunta 6).

### 2.3 · `/trabajo/praxi/` · caso real, propio

| Campo | Valor | Largo |
|---|---|---|
| `title` | Praxi: app de entrenamiento con un coach de IA · SpindleLab | 59 |
| `description` | Diseñamos y programamos Praxi con agentes de IA: una app de entrenamiento por chat. La IA conversa; cuándo subir el peso lo calcula código con pruebas. | 151 |
| `canonical` | `https://spindlelab.cl/trabajo/praxi/` | |
| OG | `og-e12-praxi.jpg` | |

**Los de Clara medían 73 y 175**; los de arriba guardan sus dos ideas (la IA conversa, el código decide) y suman la
5e («con agentes de IA», `inventario-praxi.md` §2). Los nombres de los modelos (5d) van en el texto de la página, donde
caben con su papel: «Claude Sonnet 5 hace de coach; Claude Haiku 4.5 convierte cada mensaje en un registro y escribe la
conclusión del día» (`inventario-praxi.md` §4 y §10.4). En 160 caracteres no caben con lo que hacen, y sin eso no van.

**JSON-LD:**

```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "WebPage", "@id": "https://spindlelab.cl/trabajo/praxi/#webpage", "url": "https://spindlelab.cl/trabajo/praxi/",
    "name": "Praxi: app de entrenamiento con un coach de IA", "description": "<la description>", "inLanguage": "es-CL",
    "isPartOf": { "@id": "https://spindlelab.cl/#website" },
    "breadcrumb": { "@id": "https://spindlelab.cl/trabajo/praxi/#breadcrumb" },
    "mainEntity": { "@id": "https://spindlelab.cl/trabajo/praxi/#caso" } },
  { "@type": "CreativeWork", "@id": "https://spindlelab.cl/trabajo/praxi/#caso", "name": "Praxi",
    "description": "<la frase de entidad visible arriba de la página, tal cual>",
    "author": { "@id": "https://spindlelab.cl/#autor-ramon" }, "publisher": { "@id": "https://spindlelab.cl/#org" },
    "dateCreated": "2026-07-21", "temporalCoverage": "2026-07-21/2026-08-25", "inLanguage": "es-CL",
    "image": "https://spindlelab.cl/assets/img/og-e12-praxi.jpg?v=1",
    "about": { "@id": "https://spindlelab.cl/trabajo/praxi/#app" } },
  { "@type": "SoftwareApplication", "@id": "https://spindlelab.cl/trabajo/praxi/#app", "name": "Praxi",
    "applicationCategory": "HealthApplication", "operatingSystem": "Web", "inLanguage": "es-CL",
    "author": { "@id": "https://spindlelab.cl/#autor-ramon" },
    "description": "Coach de hipertrofia por chat: guarda lo que entrenas y calcula en código cuándo subir el peso." },
  { "@type": "BreadcrumbList", "@id": "https://spindlelab.cl/trabajo/praxi/#breadcrumb", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://spindlelab.cl/" },
    { "@type": "ListItem", "position": 2, "name": "Trabajo", "item": "https://spindlelab.cl/trabajo/" },
    { "@type": "ListItem", "position": 3, "name": "Praxi" } ] }
] }
```

- `dateCreated` y `temporalCoverage`: primer y último commit de `main` (`inventario-praxi.md` §2, medido con
  `git log` el 19-oct). `applicationCategory` y `operatingSystem`, los mismos que Praxi declara de sí misma
  (`praxis-coach/lib/seo/estructurados.ts:92-93`); «HealthApplication» es una categoría, no una promesa.
- El `@id` de la app vive en `spindlelab.cl` a propósito: el que Praxi publica está en un dominio que hoy no responde, y
  enlazar a él sería apuntar a algo que nadie puede leer.
- **No declara:** `offers`, precios, `url` o `sameAs` a `praxi.coach`, `isAccessibleForFree`; ningún estado («en
  pausa», `discontinued`, una fecha de baja); `Review`, `AggregateRating` ni un número de usuarios; `MedicalWebPage` ni
  `MedicalEntity`; los modelos como nodos o propiedades (van en el texto, que es lo que una IA lee y cita); la línea
  `Co-Authored-By` como `contributor` (la herramienta con que se programó no es autora del caso).
- **Para que una IA lo cite bien:** la frase de entidad arriba, en texto: qué es, para quién y qué decide el código. Las
  capturas con `alt` que diga «captura de la portada de Praxi» y, cuando lleve cifras, «con datos de ejemplo».

### 2.4 · `/trabajo/combeau/` · caso real, cliente

| Campo | Valor | Largo |
|---|---|---|
| `title` | Bernardo Combeau: fotografía y book de modelo · SpindleLab | 58 |
| `description` | Diseñamos y programamos los dos sitios de Bernardo Combeau, fotógrafo y modelo. Él carga sus series desde un panel, y el sitio entrega sus fotos livianas. | 154 |
| `canonical` | `https://spindlelab.cl/trabajo/combeau/` | |
| OG | `og-e12-combeau.jpg` | |

«Él carga sus series desde un panel» y «el sitio entrega sus fotos livianas» tienen fila (`inventario-casos.md` §2.1:
Decap CMS; Netlify Image CDN, 805 kB → 95 kB en una foto de la portada, que pide sus imágenes al CDN por 11 rutas
`/.netlify/images`). Su nombre va porque el permiso es de la compuerta 1, punto 2.

**JSON-LD:**

```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "WebPage", "@id": "https://spindlelab.cl/trabajo/combeau/#webpage", "url": "https://spindlelab.cl/trabajo/combeau/",
    "name": "Bernardo Combeau: fotografía y book de modelo", "description": "<la description>", "inLanguage": "es-CL",
    "isPartOf": { "@id": "https://spindlelab.cl/#website" },
    "breadcrumb": { "@id": "https://spindlelab.cl/trabajo/combeau/#breadcrumb" },
    "mainEntity": { "@id": "https://spindlelab.cl/trabajo/combeau/#caso" } },
  { "@type": "CreativeWork", "@id": "https://spindlelab.cl/trabajo/combeau/#caso",
    "name": "Bernardo Combeau: sitio de fotografía y book de modelo",
    "description": "<la bajada visible, tal cual>", "creator": { "@id": "https://spindlelab.cl/#org" },
    "datePublished": "2026-07-24", "inLanguage": "es-CL",
    "image": "https://spindlelab.cl/assets/img/og-e12-combeau.jpg?v=1",
    "about": { "@id": "https://spindlelab.cl/trabajo/combeau/#sitio" },
    "hasPart": [
      { "@type": "CreativeWork", "@id": "https://spindlelab.cl/trabajo/combeau/#fotografia", "name": "Sitio de fotografía", "url": "https://bernardocombeau.cl/" },
      { "@type": "CreativeWork", "@id": "https://spindlelab.cl/trabajo/combeau/#modelo", "name": "Book de modelo", "url": "https://bernardocombeau.cl/modelo/" } ] },
  { "@type": "WebSite", "@id": "https://spindlelab.cl/trabajo/combeau/#sitio", "name": "Bernardo Combeau",
    "url": "https://bernardocombeau.cl/", "publisher": { "@id": "https://bernardocombeau.cl/#persona" } },
  { "@type": "BreadcrumbList", "@id": "https://spindlelab.cl/trabajo/combeau/#breadcrumb", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://spindlelab.cl/" },
    { "@type": "ListItem", "position": 2, "name": "Trabajo", "item": "https://spindlelab.cl/trabajo/" },
    { "@type": "ListItem", "position": 3, "name": "Bernardo Combeau" } ] }
] }
```

- `publisher` apunta a `https://bernardocombeau.cl/#persona`, el `Person` que su sitio ya publica
  (`inventario/crudo/jsonld-ids-bernardocombeau.cl.json`, 18-oct): así un buscador une el caso con la persona que ya
  conoce, en vez de crear otra con el mismo nombre. Su sitio no publica un `WebSite`, y no se le inventa un `@id` en su
  dominio: el nodo vive en el nuestro.
- `datePublished`: el lanzamiento, 24-jul (`inventario-casos.md` §2.9, «Fechas con fila»).
- **No declara:** su teléfono, correo, WhatsApp o dirección (su grafo los trae; el caso no los repite); sus medidas ni
  su ficha de contratación; lo que pagó; un resultado de su negocio; el 76 de su portada; su sitio como ejemplo de SEO;
  `inLanguage` del book (el texto está en inglés y la página declara `lang="es"`: no se le corrige desde aquí, ni se lo
  llama «bilingüe»).
- `alt` e imágenes: los de `casos/combeau/medios.json`, ninguno con sus medidas (defecto 21, aplicado a A).

### 2.5 · `/trabajo/tonela/`, `/trabajo/ocelo/`, `/trabajo/sesenta/`, `/trabajo/doceavo/` · conceptos

| Ruta | `title` (largo) | `description` (largo) |
|---|---|---|
| `/trabajo/tonela/` | Concepto: Tonela, proveedor de izaje · SpindleLab (49) | Concepto: Tonela no existe. Una marca inventada de eslingas en Antofagasta, para mostrar cómo diseñaríamos y programaríamos un sitio industrial B2B. Sin cifras. (160) |
| `/trabajo/ocelo/` | Concepto: Ocelo, clínica de ojos · SpindleLab (45) | Concepto: Ocelo no existe. Una clínica de ojos inventada, para mostrar cómo haríamos un sitio de salud que explica el examen en vez de prometer resultados. (155) |
| `/trabajo/sesenta/` | Concepto: Sesenta, estudio laboral · SpindleLab (47) | Concepto: Sesenta no existe. Un estudio laboral inventado, del lado del trabajador, para mostrar cómo haríamos un sitio legal que cuenta los días que te quedan. (160) |
| `/trabajo/doceavo/` | Concepto: Doceavo, estudio contable · SpindleLab (48) | Concepto: Doceavo no existe. Un estudio contable inventado en Concepción, para mostrar un sitio que te dice qué vence este mes según el calendario del SII. (155) |

`canonical`: la ruta final de cada una. OG: `og-e12-<concepto>.jpg`. **«Concepto» va primero en el `title` y en la
`description`**: si Google corta, lo que queda es justo eso. Cada hecho tiene fila: rubro y ciudad
(`inventario-casos.md` §2), «explica el examen» (Ocelo, comparador y «La evaluación»), «cuenta los días» (Sesenta,
contador de días hábiles), «qué vence este mes según el calendario del SII» (Doceavo, calendario tributario 2026).

**JSON-LD** (Sesenta como ejemplo; las otras tres cambian `name`, `disambiguatingDescription`, `about` e `image`):

```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "WebPage", "@id": "https://spindlelab.cl/trabajo/sesenta/#webpage", "url": "https://spindlelab.cl/trabajo/sesenta/",
    "name": "Concepto: Sesenta, estudio laboral", "description": "<la description>", "inLanguage": "es-CL",
    "isPartOf": { "@id": "https://spindlelab.cl/#website" },
    "breadcrumb": { "@id": "https://spindlelab.cl/trabajo/sesenta/#breadcrumb" },
    "mainEntity": { "@id": "https://spindlelab.cl/trabajo/sesenta/#caso" } },
  { "@type": "CreativeWork", "@id": "https://spindlelab.cl/trabajo/sesenta/#caso", "name": "Sesenta", "genre": "Concepto",
    "creator": { "@id": "https://spindlelab.cl/#org" }, "dateCreated": "2026-10-16", "inLanguage": "es-CL",
    "description": "<la bajada visible, tal cual>",
    "disambiguatingDescription": "Pieza de concepto de SpindleLab: Sesenta no existe, no atiende a nadie y no llevó ninguna causa.",
    "about": { "@type": "Thing", "name": "Derecho laboral del lado del trabajador" },
    "image": "https://spindlelab.cl/assets/img/og-e12-sesenta.jpg?v=1" },
  { "@type": "BreadcrumbList", "@id": "https://spindlelab.cl/trabajo/sesenta/#breadcrumb", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://spindlelab.cl/" },
    { "@type": "ListItem", "position": 2, "name": "Trabajo", "item": "https://spindlelab.cl/trabajo/" },
    { "@type": "ListItem", "position": 3, "name": "Sesenta (concepto)" } ] }
] }
```

| Pieza | `disambiguatingDescription` (de lo que cada pieza ya dice de sí misma en su JSON-LD) | `about.name` |
|---|---|---|
| Tonela | Pieza de concepto de SpindleLab: Tonela no existe; no tiene clientes, faenas, dirección ni RUT. | Izaje: eslingas, cadenas y grilletes |
| Ocelo | Pieza de concepto de SpindleLab: esta clínica no existe y no atiende pacientes. | Cirugía refractiva y de cataratas |
| Sesenta | Pieza de concepto de SpindleLab: Sesenta no existe, no atiende a nadie y no llevó ninguna causa. | Derecho laboral del lado del trabajador |
| Doceavo | Pieza de concepto de SpindleLab: Doceavo no existe y no tiene clientes; las fechas son las del calendario del SII de 2026. | Contabilidad y tributación de pymes |

`dateCreated`: el primer commit de cada pieza, en hora de Chile, los cuatro el 16-oct (`git log --reverse`: Ocelo
21:37, Tonela 23:05, Sesenta 23:43, Doceavo 23:47). **No declaran:** la marca como `Organization`, `LocalBusiness`,
`MedicalClinic`, `LegalService` o `AccountingService`; sus profesionales ficticios como `Person`; `url` o `sameAs` a
`tonela.cl`, `ocelo.cl`, `sesenta.cl` o `doceavo.cl`; `client`, `sponsor`, `funder`; `Offer` o precio; una cifra de
resultado; un `FAQPage` con las preguntas de la pieza (son de la ficción, no de la página de caso).

### 2.6 · `/diagnostico/` · el chequeo

| Campo | Valor | Largo |
|---|---|---|
| `title` | Chequeo gratis: ¿ChatGPT puede leer tu sitio? · SpindleLab | 58 |
| `description` | Escribe tu dominio y en segundos ves si ChatGPT, Claude y Perplexity pueden leer, entender y citar tu sitio. Gratis, con las 21 señales y su peso publicados. | 157 |
| `canonical` | `https://spindlelab.cl/diagnostico/` | |
| OG | `og-e12-diagnostico.jpg` (la plantilla) | |

El de hoy mide 66 («Chequeo gratis de visibilidad en IA: ¿te lee ChatGPT? · SpindleLab») y lleva «visibilidad en IA»
sin decir qué es; la pregunta del título nuevo es lo que el chequeo responde. «En segundos»: 0,6 a 1,4 s medidos
(`inventario-casos.md` §2.4). Los motores nombrados son los de hoy (E8).

**JSON-LD:** quedan el `BreadcrumbList` y el `FAQPage` de hoy, y se suman un `WebPage` (`mainEntity` → `#chequeo`) y la
herramienta, que hasta ahora ninguna página declaraba:

```json
{ "@type": "WebApplication", "@id": "https://spindlelab.cl/diagnostico/#chequeo", "name": "Chequeo de 21 señales",
  "url": "https://spindlelab.cl/diagnostico/", "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
  "isAccessibleForFree": true, "creator": { "@id": "https://spindlelab.cl/#org" }, "inLanguage": "es-CL",
  "description": "Escribes tu dominio y revisa al instante si ChatGPT, Claude y Perplexity pueden leer, entender y citar tu sitio: 21 señales, con su peso." }
```

**No declara:** cuántos chequeos se han corrido (no se guardan dominios); un puntaje de ejemplo; `aggregateRating`.

### 2.7 · `/servicios/` y sus seis

Los nombres de servicio, los planes y los precios no se tocan (diff 0 contra los JSON); **lo que cambia son `title` y
`description` donde rompían la regla de §1.4**, y se aplica en `servicios-v3.json` (y en `desarrollo-web.astro`), con
Clara. El grafo de cada uno **queda** (`Service` + `BreadcrumbList` + `FAQPage`, mismos `@id`; el de Desarrollo web,
con su `OfferCatalog` de cuatro planes y `minPrice` en CLP sin IVA, igual al JSON); solo la `description` del `Service`
pasa a ser la de la tabla. OG: la plantilla, con el precio de entrada.

| Ruta | `title` (largo) | `description` (largo) | Hoy, y por qué cambia |
|---|---|---|---|
| `/servicios/` | Servicios: desarrollo web, SEO técnico y visibilidad en IA (58) | Desarrollo web a medida desde $390.000 + IVA, y SEO técnico y visibilidad en IA para que Google y ChatGPT puedan leer y citar tu sitio. Precios publicados. (155) | Desarrollo web pasa a ir primero, como en la página (brief §3). El `ItemList` de hoy queda, con el mismo orden que la página |
| `/servicios/desarrollo-web/` | Desarrollo web a medida, desde $390.000 + IVA · SpindleLab (58) | Diseñamos y programamos tu sitio a medida, listo para que Google y la IA puedan leerlo. Cuatro planes, desde $390.000 + IVA. (124, la de Clara) | Hoy: «Desarrollo web que los motores de IA pueden leer». El precio de entrada en el título es lo que el comprador de §2 del brief busca comparar |
| `/servicios/visibilidad-en-ia/` | Visibilidad en IA (AEO/GEO): que ChatGPT pueda citarte (54) | Revisamos cómo te describen ChatGPT, Gemini y Perplexity y qué le falta a tu sitio para que puedan citarte, y nos ocupamos de eso. Desde $400.000 + IVA. (152) | Hoy: «AEO/GEO» y «claridad de entidad» sin decir qué hacen. AEO/GEO queda en el título porque es como lo buscan quienes ya saben, y va con su efecto al lado |
| `/servicios/auditoria-seo-tecnica/` | Auditoría SEO técnica para empresas · SpindleLab (48) | Encontramos qué le impide a Google rastrear, entender y confiar en tu sitio, y te lo entregamos ordenado por impacto. Desde $490.000 + IVA. (139) | Hoy: «Core Web Vitals» y «señales E-E-A-T» sin efecto. El `title` queda con sus palabras, en mayúscula inicial: «técnica», como en el `h1`, la miga y `oferta-v3.json` (antislop A6; acta de obra, defecto 8) |
| `/servicios/acompanamiento-mensual/` | Acompañamiento mensual de SEO e IA · SpindleLab (47) | Cada mes arreglamos y medimos lo que hace que Google y la IA lean y citen tu sitio, con informes quincenales. Desde $590.000/mes + IVA, mínimo 3 meses. (151) | Hoy: «contenido optimizado», sin precio. El `title`, en mayúscula inicial: «mensual» (A6; defecto 8) |
| `/servicios/redes-sociales/` | Gestión de redes sociales para empresas · SpindleLab (52) | (queda) Gestión de redes sociales para empresas en LinkedIn y Meta: estrategia, pauta, comunidad y reportes. El contenido creativo lo pones tú. (135) | La `description` ya cumple. El `title`, en mayúscula inicial: «redes sociales», como en la `description` y la miga (A6; defecto 8) |
| `/servicios/paid-media/` | Paid Media (Google): anuncios de búsqueda · SpindleLab (54) | Armamos y manejamos tu Google Ads para que tu anuncio salga cuando alguien busca lo que vendes, con el presupuesto bajo tu control. Desde $350.000/mes + IVA. (157) | Hoy: «alta intención» sin explicar, y «optimizado con agentes de IA», que no tiene fila en ningún inventario |

Precios, contra `oferta-v3.json`: Desarrollo web «Desde $390.000 + IVA» (Página de Campaña); Visibilidad en IA
«$400.000»; Auditoría «$490.000»; Acompañamiento «Desde $590.000/mes + IVA»; Paid Media «$350.000/mes». **No
declaran:** un precio que no esté en los JSON; `Review`; resultados de clientes.

### 2.8 · `/metodo/`

| Campo | Valor | Largo |
|---|---|---|
| `title` | Método: SEO técnico y visibilidad en IA · SpindleLab | 52 |
| `description` | Cómo trabajamos, en cuatro pasos medibles: revisamos qué le impide a Google y a la IA leer tu sitio, priorizamos, lo arreglamos y medimos el cambio. | 148 |
| `canonical` | `https://spindlelab.cl/metodo/` | |

El texto de la página queda (brief §3); su `title` de hoy mide 64 y su `description` dice «estrategia AEO/GEO» sin
efecto. **JSON-LD: queda** (`WebPage` + `HowTo` `#metodo-spindlelab` + `BreadcrumbList`, mismos `@id` y pasos).
OG: la plantilla.

### 2.9 · `/blog/` y sus siete artículos

`/blog/`: **queda** («Blog: SEO técnico y visibilidad en IA · SpindleLab», 50; su `description`, 149) con su
`CollectionPage`. **Los siete artículos quedan tal cual** (brief §3): `title`, `description`, `canonical` y su grafo
(`Article` + `BreadcrumbList` + `FAQPage` con las preguntas visibles, autor `#autor-ramon`, que `blog/[slug].astro` ya
valida al construir). Lo único que cambia es la imagen: cada uno, su tarjeta de la plantilla con su `headline`, en vez de
`og-v3.jpg`; y su `Article.image` apunta a esa misma tarjeta.

| Artículo | `title` (largo) | `datePublished` · `dateModified` |
|---|---|---|
| `21-chequeos-visibilidad-ia` | 61 | 2026-09-04 · 2026-09-08 |
| `como-aparecer-en-chatgpt` | 57 | 2026-07-07 · 2026-08-25 |
| `como-elegir-verificar-agencia-aeo-geo-chile` | 70 | 2026-08-25 · 2026-08-25 |
| `cuanto-cuesta-seo-tecnico-chile` | 52 | 2026-07-14 · 2026-08-25 |
| `que-es-aeo-geo` | 67 | 2026-07-07 · 2026-08-25 |
| `que-es-un-mini-diagnostico-seo` | 45 | 2026-07-16 · 2026-08-25 |
| `seo-tecnico-fintechs-chile` | 47 | 2026-07-07 · 2026-08-25 |

Tres pasan de 60 y Google los corta; son títulos publicados con su historia, y cambiarlos es otro encargo, no esta obra.

### 2.10 · `/nosotros/`

| Campo | Valor | Largo |
|---|---|---|
| `title` | Ramón Vallejos, quién está detrás · SpindleLab | 46 |
| `description` | Detrás de SpindleLab está Ramón Vallejos: diseña, programa con agentes de IA cuyo código él revisa, y deja cada sitio listo para que Google y la IA lo lean. | 156 |
| `canonical` | `https://spindlelab.cl/nosotros/` | |
| OG | `og-e12-nosotros.jpg` | |

Hoy: «Ramón Vallejos, consultor de SEO técnico e IA», el cargo de antes del giro (R5). La bio queda (R4). **JSON-LD:
queda** (`AboutPage` + `BreadcrumbList`, `mainEntity` → `#autor-ramon`); el `jobTitle` cambia como dice §1.1, con su OK.

### 2.11 · `/contacto/`

| Campo | Valor | Largo |
|---|---|---|
| `title` | Contacto: pide un sitio o un diagnóstico gratis · SpindleLab | 60 |
| `description` | Escríbenos a hola@spindlelab.cl. Si quieres un sitio, te contamos cómo lo haríamos; si ya tienes uno, en 24 horas te mandamos un mini-diagnóstico gratis. | 153 |
| `canonical` | `https://spindlelab.cl/contacto/` | |
| OG | `og-e12-contacto.jpg` (la plantilla) | |

Hoy solo habla del diagnóstico; con el giro, la puerta es también Desarrollo web. **JSON-LD:** quedan el
`BreadcrumbList` y el `FAQPage`; se suma un `ContactPage` (`#webpage`, `about` → `#org`). **No se toca** el
formulario, sus nombres, `#f-utm-*` ni `generate_lead` (brief §6.7 y criterio 11).

---

## 3 · Lo que encontré al revisar, y para quién

1. **Clara:** la `description` de la home (170) y el `title` y la `description` de Praxi (73 y 175) se pasan de largo;
   van acortados en §2.1 y §2.3 con sus mismas ideas. El `title` de `/trabajo/` (20) vuelve a no tener la consulta que
   lo buscaría, que la QA del 6-oct ya había corregido (§2.2).
2. **Bruno:** el `<title>` de Doceavo (`07-doceavo/sitio/index.html`: «Doceavo · estudio contable en Concepción · lo que
   vence este mes») es el único de los cuatro sin «(concepto)»; Tonela, Ocelo y Sesenta lo llevan. Con `noindex` no
   sale en Google, pero sí en la pestaña y al compartir el enlace de la pieza.
3. **Lucía (spec) y Diego (construcción), del `Layout`, que es de producción:** `theme-color` sigue en `#0E141B` (la
   tinta vieja; A es `#060606`), el favicon es el de antes (`favicon.svg?v=4`; el de El huso sube con `?v=5`), el `#org`
   y el `jobTitle` dicen el posicionamiento de antes (§1.1), y `og:title` no se puede separar del `title` (§1.3). Todo
   eso cambia al publicar, por prop y con su desvío declarado.
4. **Construcción:** `OG_V3` y `OG_V3_OBRA` (`consts-v3`) llevan el lema de E10/E11 y las maquetas viejas: ninguna ruta
   de E12 los usa. Los prototipos de A enlazan seis rutas de caso que no se construyen (§2.2).
5. **Inventario** (ya corregido por Diego hoy, `inventario-casos.md` §2.8 y §2.9): las grabaciones de `/modelo/` y la
   cinta de A muestran las medidas de Bernardo; ninguna tarjeta ni medio de esta capa sale de ahí.

## 4 · Cómo se comprueba en la corrida 2

Sobre `dist/` (y servido en local), con un script, no a ojo:

- Cada página: un `<script type="application/ld+json">` que parsea; ningún `@id` repetido con otro `@type`; los tres
  del `Layout` presentes una sola vez; `BreadcrumbList` igual a la miga visible.
- `title` ≤ 60 y `description` de 120 a 160 en cada ruta de §2 (salvo los siete artículos, que quedan); `canonical` y
  `noindex` como dice §1.2.
- `/trabajo/`: `numberOfItems` igual al conteo visible; cada `url` de un `ListItem` responde 200 en el build (los
  fragmentos `#fotografia` y `#modelo` existen como `id` en la página de Combeau).
- `/trabajo/praxi/`: cero `href` a `praxi.coach`; el `SoftwareApplication` sin `offers` ni `url`; la cadena «fuera de
  línea» y «en pausa», cero veces en el HTML.
- `/trabajo/combeau/`: en el HTML y en cada `alt`, cero apariciones de su edad, su estatura, «Hair», «Eyes», `mailto:`,
  `tel:` o `wa.me`.
- Conceptos: «concepto» en el `title`, la `description`, el `disambiguatingDescription` y la tarjeta (a la vista);
  cero `Organization`, `LocalBusiness`, `MedicalClinic`, `LegalService` o `AccountingService` en su grafo.
- Toda la obra: cero `Review`, `AggregateRating`, `VideoObject`; cada `og:image` existe, mide 1200 × 630, es JPEG y
  pesa ≤ 200 kB; cada precio de un `title`, una `description` o un `Offer` aparece igual, como texto, en `oferta-v3.json`
  o `servicios-v3.json`.

## Correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 19-oct, 10:45 | Primera versión | Simón, con Diego; compuerta 2 |
| 23-oct, 09:05 | §2.7: el `title` de Auditoría SEO técnica, Acompañamiento mensual y Gestión de redes sociales, en mayúscula inicial (antes «SEO Técnica», «Mensual» y «Redes Sociales», los de producción, que esta nota dejaba «queda»). El nombre del servicio no cambia: se escribe como ya lo escriben el `h1`, la miga y `oferta-v3.json`. Lo que mira esta nota tampoco: Google no distingue mayúsculas en la consulta, los largos son los mismos (48, 47 y 52) y el grafo queda (el `name` del `Service` sale de `serviceName`, en `servicios-v3.json`, que esta obra no toca) | Clara, por el defecto 8 del acta de obra (Javiera; antislop A6); para que Simón lo revise |
