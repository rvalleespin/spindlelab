# Señales (SEO/AEO) · Módulo 369 · sitio en producción (y lo mínimo de la maqueta)

> Simón (`/agente-seo-aeo`), fase 1 del estudio, 5-oct-2026. Diseña la capa de señales del **sitio real** (`borrador-brief-sitio.md`) para que Diego la construya desde la primera plantilla y Javiera la verifique: el borrador §7 ya dice «cada página tiene title propio, description, canonical, OG y JSON-LD que parsea, según `senales.md`». La maqueta v2 no lleva casi nada de esto (§12).
>
> **Cómo se hizo.** Todo es diseño, salvo §0, que se midió hoy con `curl`, `dig`, `whois` y una búsqueda web (resultados de EE.UU.). No se usó ningún conector SEO y no hay sitio de María que auditar todavía: no hay posiciones, tráfico ni visibilidad en IA medidos. La línea base se toma al lanzar (§14).
>
> **Marcas de dependencia.** `[9-3]` `[9-4]` `[9-5]` son las preguntas a María de `brief-de-obra.md` §9; `[9-a]` `[9-b]` `[9-c]` son las de Ramón en el borrador §9; `[mat]` es material que entrega María (borrador §5); `[sup]` es un supuesto escrito, reversible en una línea. Si el brief del sitio cambia el mapa, manda el brief.

---

## 0 · Lo que hay hoy (medido el 5-oct)

1. **modulo369.com ya publica algo.** Responde con una página «Próximo lanzamiento» de GoDaddy (constructor de sitios, servidor `DPS`), con `lang="en-US"`, `og:locale en_US` y una description autogenerada: «Descubre el próximo lanzamiento de productos en modulo369, el sitio web que te mantiene al día con las últimas innovaciones en tecnología». Su sitemap declara `/` y `/ols/products` (el módulo de tienda de GoDaddy). DNS en GoDaddy (`domaincontrol.com`); dominio creado el 30-may-2026, un día después del .cl.
   - Hoy el dominio se describe ante buscadores como un sitio de **tecnología**, en **inglés**. Se corrige solo al lanzar; no hace falta tocarlo antes.
   - Al lanzar: `/ols/products` → 301 a `/tienda/` (está en un sitemap; mejor redirigir que dejar un 404).
   - Hay un plan de GoDaddy activo para ese sitio. Si es pagado, María puede darlo de baja al migrar. Dato para `[9-5]`, no de SEO.
2. **modulo369.cl no tiene servidores de nombre** (no resuelve). Está a nombre de María en NIC Chile (WHOIS público). El 301 del .cl al .com (compromiso 6) parte por delegar su DNS.
3. **El nombre choca con otras cosas.** Buscar «Módulo 369» o «Modulo 369» devuelve el Modelo 369 del IVA español (AEAT) y su módulo de Odoo, aritmética modular («369 mod») y el «método 369» de manifestación. Ninguna galería. **Para un motor de IA, «Módulo 369» a secas no es una entidad: es ruido.** Por eso el nombre va **siempre** con su descriptor (title de la home, `WebSite`, `Organization.description`, bio de Instagram) y la consulta de marca que vamos a medir es «módulo 369 galería», no «módulo 369».
4. **Los referentes no publican JSON-LD.** Kurimanzutto (`/es/artistas`), Esther Schipper (home) y Escat (home): 0 bloques. Kurimanzutto traduce los slugs de sección (`/es/artistas` ↔ `/en/artists`). Escat usa hreflang de idioma solo (`es`, `en`, `ca`), sin `x-default`. Ninguno le da a una IA una entidad legible: ese hueco se ocupa con poco esfuerzo.

---

## 1 · Prioridad (impacto × esfuerzo)

| # | Qué | Por qué en este orden | Quién |
|---|---|---|---|
| **P0** | Host canónico, barra final, slugs ES/EN, patrón de slug por colección, **una sola tabla de rutas ES↔EN**, sin redirección automática por idioma, `pages.dev` en noindex | Cambiarlos después de lanzar es una migración: redirecciones, señales perdidas, hreflang roto. Hoy cuestan una línea de config | Diego, antes de la primera página |
| **P0** | Campos del panel que alimentan el schema y los filtros a la vez: técnica como lista, medidas numéricas, estado + precio + link MP (§11) | Son los mismos datos que piden los filtros (brief §7). Si nacen como texto libre, ni el filtro ni el schema funcionan, y reescribir 90 fichas es caro | Diego, con el modelo de contenido |
| **P1** | Un componente de `<head>` (title, description, canonical, hreflang, OG) y el grafo global (`Organization` + `WebSite`), más JSON-LD de **obra** y **artista** | Son las páginas que buscan coleccionistas y las que una IA cita («obras de X») | Diego, con las primeras plantillas |
| **P1** | Sitemap con alternates y `robots.txt` | Sin esto, el EN tarda en descubrirse y el hreflang queda a medias | Diego |
| **P2** | Ediciones, Encuentro, Libro y Exposiciones; imágenes OG sin recorte; sitemap de imágenes; migas | Dependen de respuestas de María `[9-3]` `[9-4]`; se hacen con su sección | Diego |
| **P3** | Al lanzar: 301 (.cl, www, http, `/ols/products`), Search Console y Bing a nombre de María, envío del sitemap, línea base de IA | Fase 5 | Diego + Ramón + Nora |
| **P4** | `llms.txt` generado, IndexNow por Cloudflare | Efecto no probado; solo si sale gratis del build | Diego, opcional |

---

## 2 · Decisiones de base

### 2.1 Dominio y host
- **Canónico: `https://modulo369.com` (sin www)** `[9-5]`. Un dominio raíz en Cloudflare Pages exige que la zona esté en Cloudflare (servidores de nombre de Cloudflare, en la cuenta de María). Si María no puede o no quiere mover los NS desde GoDaddy, el canónico pasa a `https://www.modulo369.com` (subdominio por CNAME) con reenvío 301 de la raíz a www en GoDaddy. **Se decide una vez, antes del primer deploy al dominio**: cambiar de host canónico después cuesta una migración.
- 301 de una sola vuelta, conservando la ruta: `www` → raíz · `http` → `https` · `modulo369.cl` y `www.modulo369.cl` → `https://modulo369.com/<misma ruta>` · `/ols/products` → `/tienda/`.
- **`modulo369.pages.dev` (el alias del proyecto de producción) en noindex por host**, en `_headers`:
  ```
  https://:project.pages.dev/*
    X-Robots-Tag: noindex

  https://:version.:project.pages.dev/*
    X-Robots-Tag: noindex
  ```
  Es el staging donde María prueba en su iPhone (compromiso 7) y además una copia exacta del sitio en otro host. **Nunca** un `/*  X-Robots-Tag: noindex` global como el de la maqueta: ese archivo no viaja a producción.

### 2.2 URLs
- **Barra final siempre** (`trailingSlash: 'always'`, `build.format: 'directory'`). Enlaces internos, canonical, hreflang y sitemap con barra. Si se mezclan, cada enlace cuesta una redirección y Search Console marca hreflang hacia URLs no canónicas.
- **Filtros de Obras en el cliente**, sin URLs indexables. Si se usan parámetros (`?artista=`), el canonical sigue siendo `/obras/`.
- **El slug no cambia nunca después de publicar.** Decap lo fija al crear la entrada; corregir el título no mueve la URL. Si alguna vez hay que renombrar o borrar, va un 301 a la colección (lección de Bernardo: el 404 encadenado).
- **No se borran obras vendidas: se marcan vendidas.** La URL sigue viva, conserva lo que ganó y hace de historial (es la alternativa de `[9-3]` si no hay Exposiciones). Va en la capacitación.

### 2.3 Idiomas
- ES en la raíz y EN bajo `/en/`. `<html lang="es-CL">` en ES y `<html lang="en">` en EN.
- **hreflang: `es`, `en` y `x-default`.** El encargo decía `es-CL`; propongo `es`. Con `hreflang="es-CL"` la página solo le corresponde a un usuario en Chile, y un coleccionista hispanohablante en México o España caería al `x-default`. `es` cubre a todos los hispanohablantes, Chile incluido. El castellano de Chile lo declara el `lang="es-CL"` del documento.
- **`x-default` → la versión EN** `[sup]`. Le sirve a quien no lee ni español ni inglés (un coleccionista en Francia o Alemania): es más probable que lea inglés. Se invierte en una línea si Ramón o María prefieren el ES.
- **Sin redirección automática por idioma ni por IP.** Google rastrea desde EE.UU. y sin `Accept-Language`: con redirección automática nunca vería el ES. El selector es manual y lleva a la **misma página** en el otro idioma.
- hreflang solo entre pares que existen los dos, y recíproco (si `/privacidad/` no tiene texto EN, no hay par).
- Si un bloque de prosa no tiene versión EN, en la página EN **no se muestra** (misma regla del borrador §5). Nunca texto en español dentro de una página EN sin `lang="es"` en su contenedor.

### 2.4 Tabla de rutas (fija los slugs EN que pide el borrador §3)

**Esta tabla es la única fuente para tres cosas: el selector de idioma, las etiquetas hreflang y los alternates del sitemap.** Si cada una tiene su propia lista, se desincronizan.

| ES | EN | Tipo de página (schema) | Indexa | Sitemap | Depende |
|---|---|---|---|---|---|
| `/` | `/en/` | `WebPage` (home del `WebSite`) | sí | sí | |
| `/artistas/` | `/en/artists/` | `CollectionPage` | sí | sí | |
| `/artistas/{slug}/` | `/en/artists/{slug}/` | `ProfilePage` + `Person` | sí | sí | |
| `/obras/` | `/en/works/` | `CollectionPage` | sí | sí | |
| `/obras/{slug}/` | `/en/works/{slug}/` | `ItemPage` + `VisualArtwork` | sí | sí | |
| `/ediciones/` | `/en/editions/` | `CollectionPage` | sí | sí | |
| `/ediciones/{slug}/` | `/en/editions/{slug}/` | `ItemPage` + `Book` | sí | sí | |
| `/encuentro/` | `/en/encuentro/` | `FAQPage` o `WebPage` + `CreativeWork` | sí | sí | `[9-4]` |
| `/encuentro/activar/` | `/en/encuentro/activate/` | `WebPage` | sí | sí | `[9-4]` |
| `/encuentro/libro/` | `/en/encuentro/libro/` | `CollectionPage` + `Collection` | con 1 o más activados | idem | `[9-4]` |
| `/encuentro/libro/{nnn}/` | `/en/encuentro/libro/{nnn}/` | `ItemPage` + `CreativeWork` | sí | sí | `[9-4]` |
| `/acerca/` | `/en/about/` | `AboutPage` | sí | sí | |
| `/tienda/` | `/en/shop/` | `CollectionPage` | sí | sí | |
| `/contacto/` | `/en/contact/` | `ContactPage` | sí | sí | `[9-5]` |
| `/privacidad/` | `/en/privacy/` | `WebPage` | sí, cuando exista su texto | idem | `[9-a]` |
| `/exposiciones/` | `/en/exhibitions/` | `CollectionPage` | sí | sí | `[9-3]` |
| `/exposiciones/{slug}/` | `/en/exhibitions/{slug}/` | `ItemPage` + `ExhibitionEvent` | sí | sí | `[9-3]` |
| `404` | `/en/404` | n/a | no (estado 404) | no | |
| `/admin/` | n/a | n/a | no | no | |

«Encuentro» y «Libro» quedan como nombres propios en EN (decisión del diagnóstico, C08). El 404 EN existe aparte: Cloudflare Pages sirve el `404.html` del directorio padre más cercano, así que `/en/404.html` atiende las rutas `/en/*` (Diego lo verifica en el primer deploy).

### 2.5 Slugs de contenido (uno por entrada, el mismo en ES y EN)
En Decap el slug es del archivo y vale para todos los idiomas. Normalización: `slug: { encoding: "ascii", clean_accents: true, sanitize_replacement: "-" }`.

| Colección | Patrón | Ejemplo con relleno de la maqueta |
|---|---|---|
| Artistas | `{nombre}` | `/artistas/artista-a/` |
| Obras | `{titulo}-{artista}-{año}` | `/obras/campo-01-artista-a-2025/` |
| Ediciones | `{titulo}` | `/ediciones/edicion-01/` |
| Encuentros | `{numero}` con 3 cifras | `/encuentro/libro/007/` |
| Exposiciones `[9-3]` | `{titulo}-{año}` | |

En Obras van título, artista y año porque «Sin título» es un título frecuente en arte. **Prueba obligatoria de QA:** dos obras «Sin título» de la misma artista y el mismo año dan dos URLs distintas y ninguna pisa a la otra. Diego define cómo lo garantiza Decap; si no puede, se suma un sufijo.

Los slugs de contenido **no se traducen**: los títulos de obra suelen ser nombres propios, y un solo slug simplifica el panel y el selector. Lo que sí se traduce es la sección (`/obras/` ↔ `/en/works/`), como Kurimanzutto.

---

## 3 · `<head>` de cada página (un solo componente)

```html
<html lang="es-CL">                                   <!-- "en" en /en/ -->
<title>{title}</title>                                <!-- §5 -->
<meta name="description" content="{description}">     <!-- §5 -->
<meta name="robots" content="max-image-preview:large"> <!-- deja a Google mostrar la obra en grande -->
<link rel="canonical" href="https://modulo369.com{ruta}">
<link rel="alternate" hreflang="es" href="https://modulo369.com{ruta_es}">
<link rel="alternate" hreflang="en" href="https://modulo369.com{ruta_en}">
<link rel="alternate" hreflang="x-default" href="https://modulo369.com{ruta_en}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Módulo 369">
<meta property="og:locale" content="es_CL">            <!-- en_US en /en/ -->
<meta property="og:locale:alternate" content="en_US">  <!-- es_CL en /en/ -->
<meta property="og:title" content="{title sin « · Módulo 369»}">
<meta property="og:description" content="{description}">
<meta property="og:url" content="https://modulo369.com{ruta}">
<meta property="og:image" content="https://modulo369.com/og/{clave}.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{alt}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{grafo §4}</script>
```

- **Canonical** absoluto y a sí misma, siempre. Nunca a la versión del otro idioma.
- Página en noindex (solo el Libro con 0 activados): `<meta name="robots" content="noindex, follow">` y fuera del sitemap.
- **Imagen OG sin recortar la obra.** Recortar a 1,91:1 mutila una pintura vertical en cada mensaje de WhatsApp. Se genera en el build: la obra **contenida** (`fit: contain`) en 1200×630 sobre hueso `#EEEAE2` (token de la dirección; sharp ya viene con Astro). Qué imagen va en cada página:

| Página | og:image |
|---|---|
| Obra | La imagen general de la obra |
| Artista | Su primera obra de la selección (nunca un retrato, salvo la foto opcional que ella suba) |
| Home | La primera obra del carrusel |
| Edición | La portada |
| Encuentro, Activar, Libro | Foto de la caja `[mat]`; en un encuentro, su foto |
| Resto | Tarjeta con el nombre compuesto «Módulo 369» en la tipografía del sitio, sobre hueso |

---

## 4 · JSON-LD

### 4.1 Reglas
1. **Un `@graph` por página**, emitido por el mismo componente que arma el `<head>`.
2. **Solo lo que se ve en la página**, armado desde los mismos campos que la pintan. Si un campo está vacío, la propiedad no se escribe: nada de `""`, `null` ni valores por defecto inventados.
3. **`@id` estables e independientes del idioma.** La entidad es la misma en ES y EN, así que su `@id` usa siempre la URL ES; el `url` de la página sí cambia con el idioma.

| Entidad | `@id` |
|---|---|
| Galería | `https://modulo369.com/#galeria` |
| Sitio | `https://modulo369.com/#sitio` |
| Artista | `https://modulo369.com/artistas/{slug}/#persona` |
| Obra | `https://modulo369.com/obras/{slug}/#obra` |
| Edición | `https://modulo369.com/ediciones/{slug}/#edicion` |
| Proyecto Encuentro | `https://modulo369.com/encuentro/#proyecto` |
| Libro | `https://modulo369.com/encuentro/libro/#libro` |
| Encuentro activado | `https://modulo369.com/encuentro/libro/{nnn}/#encuentro` |
| Exposición `[9-3]` | `https://modulo369.com/exposiciones/{slug}/#exposicion` |
| Página y migas | `{url de la página}#pagina` · `{url de la página}#migas` |

4. Textos del grafo en el idioma de la página (`inLanguage` `es-CL` o `en`).
5. Las plantillas de abajo usan `{campo}` y no son JSON literal. Lo que se valida es la salida del build.

### 4.2 Grafo global (todas las páginas indexables)

```json
{
  "@type": "OnlineBusiness",
  "@id": "https://modulo369.com/#galeria",
  "additionalType": "https://schema.org/ArtGallery",
  "name": "Módulo 369",
  "alternateName": ["Modulo 369", "modulo369"],
  "description": "{enunciado corto de la galería, en el idioma de la página}",
  "url": "https://modulo369.com/",
  "logo": "https://modulo369.com/marca-512.png",
  "email": "{correo de la galería}",
  "sameAs": ["{Instagram de la galería}", "{otros perfiles}"],
  "address": { "@type": "PostalAddress", "addressLocality": "{ciudad}", "addressCountry": "CL" },
  "founder": { "@id": "https://modulo369.com/artistas/{slug de María}/#persona" },
  "foundingDate": "{año}",
  "contactPoint": { "@type": "ContactPoint", "contactType": "{consultas y ventas}", "email": "{correo}", "availableLanguage": ["es", "en"] }
},
{
  "@type": "WebSite",
  "@id": "https://modulo369.com/#sitio",
  "url": "https://modulo369.com/",
  "name": "Módulo 369",
  "alternateName": ["Modulo 369"],
  "inLanguage": ["es-CL", "en"],
  "publisher": { "@id": "https://modulo369.com/#galeria" }
}
```

| Propiedad | Regla | Depende |
|---|---|---|
| `@type` | **`OnlineBusiness`** (subtipo de `Organization`) con `additionalType` ArtGallery. `ArtGallery` como tipo principal es un `LocalBusiness`, y sin dirección pública la Prueba de resultados enriquecidos marca error. Si María tiene sala con dirección pública, se cambia a `"@type": "ArtGallery"` con `address` completa | `[sup]`: sin sala |
| `description` | El enunciado de María. Mientras no exista, el texto fijo «Galería de arte en línea.» / «Online art gallery.»: el descriptor que desambigua (§0-3) | `[mat]` |
| `alternateName` | Cómo lo escribe la gente: sin tilde y junto | |
| `logo` | PNG de 512 px del **mismo** nombre compuesto que muestra la cabecera. No es logo nuevo (§8-4); se reemplaza si María trae uno | `[sup]` |
| `email`, `contactPoint` | hola@ o ventas@, el que se elija | `[9-5]` |
| `sameAs` | Solo perfiles reales de la galería. Sin Instagram, la propiedad no va | `[mat]` |
| `address` | Solo ciudad y país, nunca calle (no hay sala) | `[mat]` |
| `founder`, `foundingDate` | Solo con OK de María. Su mapa dice que Acerca «no es una bio personal»; declarar que la galería la fundó una de sus artistas es su decisión | OK de María |
| `availableLanguage` | Solo si María responde consultas en inglés (el sitio EN lo da a entender) | `[mat]` |

**No va:** `SearchAction` (no hay buscador), `aggregateRating`, `review` (no existen y no se inventan).

### 4.3 Home
```json
{ "@type": "WebPage", "@id": "{url}#pagina", "url": "{url}", "name": "{title}", "description": "{description}",
  "inLanguage": "es-CL", "isPartOf": { "@id": "https://modulo369.com/#sitio" },
  "about": { "@id": "https://modulo369.com/#galeria" },
  "primaryImageOfPage": { "@id": "https://modulo369.com/obras/{primera del carrusel}/#obra" } }
```

### 4.4 Artistas (índice) · Obras (índice) · Ediciones (índice) · Tienda
`CollectionPage` con `mainEntity` → `ItemList` (`numberOfItems` y `itemListElement` de `ListItem` con `position` y `url` hacia cada ficha). En Tienda, la lista va en el orden de la página: obras disponibles, la caja si se vende `[9-4]` y ediciones.

### 4.5 Artista
```json
{ "@type": "ProfilePage", "@id": "{url}#pagina", "url": "{url}", "inLanguage": "es-CL",
  "isPartOf": { "@id": "https://modulo369.com/#sitio" }, "breadcrumb": { "@id": "{url}#migas" },
  "mainEntity": {
    "@type": "Person",
    "@id": "https://modulo369.com/artistas/{slug}/#persona",
    "name": "{nombre}",
    "url": "{url}",
    "jobTitle": "artista",
    "description": "{primer párrafo completo de la bio, en el idioma de la página}",
    "image": "{foto opcional de la artista}",
    "sameAs": ["{sitio propio}", "{Instagram propio}"],
    "affiliation": { "@id": "https://modulo369.com/#galeria" }
  } }
```
- `description`: el párrafo entero o nada. Nunca cortado a media frase.
- `image`: **solo** la foto opcional que ella suba (el mapa la pide como opcional). Nunca una obra: el brief §7 prohíbe representar a las artistas por retrato en el sitio, y `Person.image` tiene que mostrar a la persona.
- `sameAs`: con el permiso de cada artista para publicar sus datos (borrador §5) `[mat]`.
- Las obras no se listan acá: cada `VisualArtwork` apunta a su artista con `creator`, y eso basta para el grafo.

### 4.6 Obra (la página que más importa)
Estados 2, 3 y 4 de la ficha (brief §4): sin precio público, sin `offers`.
```json
{ "@type": "ItemPage", "@id": "{url}#pagina", "url": "{url}", "inLanguage": "es-CL",
  "isPartOf": { "@id": "https://modulo369.com/#sitio" }, "breadcrumb": { "@id": "{url}#migas" },
  "primaryImageOfPage": { "@id": "{url}#imagen-general" },
  "mainEntity": {
    "@type": "VisualArtwork",
    "@id": "https://modulo369.com/obras/{slug}/#obra",
    "name": "{título en el idioma de la página; si no hay EN, el ES}",
    "url": "{url}",
    "creator": { "@type": "Person", "@id": "https://modulo369.com/artistas/{artista}/#persona", "name": "{nombre}" },
    "dateCreated": "{año}",
    "artMedium": "{técnica, en el idioma de la página}",
    "artform": "{disciplina de esa técnica}",
    "height": { "@type": "QuantitativeValue", "value": "{alto}", "unitCode": "CMT" },
    "width":  { "@type": "QuantitativeValue", "value": "{ancho}", "unitCode": "CMT" },
    "depth":  { "@type": "QuantitativeValue", "value": "{profundidad}", "unitCode": "CMT" },
    "description": "{descripción de la obra}",
    "copyrightHolder": { "@id": "https://modulo369.com/artistas/{artista}/#persona" },
    "image": [
      { "@type": "ImageObject", "@id": "{url}#imagen-general", "contentUrl": "{variante grande}", "width": "{px}", "height": "{px}",
        "caption": "{título}, {artista}, {año}", "creditText": "{crédito fotográfico}", "copyrightNotice": "© {artista}" },
      { "@type": "ImageObject", "contentUrl": "{detalle}", "caption": "Detalle de {título}" }
    ]
  } }
```
**Estado 1 (disponible, con precio y link de MP):** el mismo nodo pasa a doble tipo y suma `offers`.
```json
"@type": ["VisualArtwork", "Product"],
"offers": { "@type": "Offer", "price": "{precio}", "priceCurrency": "CLP",
            "availability": "https://schema.org/InStock",
            "url": "{url de la ficha, no el link de MP}",
            "seller": { "@id": "https://modulo369.com/#galeria" } }
```
- **La regla del brief §4 se repite en el schema:** `offers` existe solo si hay precio **y** link a la vez, y el precio del JSON-LD es el mismo número que se ve en la página (política de Google). Al marcar la obra vendida desaparecen el botón y el `offers` en el mismo build.
- `price` entero, sin puntos. `priceCurrency` CLP: una sola moneda, la del link de MP (borrador §8-13).
- `depth` solo si la obra tiene profundidad. `description`, `creditText` y `artform` solo si existen.
- `copyrightNotice` «© {artista}» es un hecho (la obra es suya). **No va `license` ni `acquireLicensePage`**: activarían la insignia «Licenciable» de Google Imágenes, y ofrecer licencias de reproducción no está en ningún acuerdo.
- **Advertencias aceptadas** en la Prueba de resultados enriquecidos de Google: `shippingDetails`, `hasMerchantReturnPolicy`, `priceValidUntil`, `brand`, `gtin`, `review`, `aggregateRating`. No hay datos reales para ninguna y los términos de venta están fuera de la obra (§8-8). Javiera no las cuenta como defecto; **un error sí lo es**.

### 4.7 Edición
```json
{ "@type": "Book",
  "@id": "https://modulo369.com/ediciones/{slug}/#edicion",
  "name": "{título}", "url": "{url}", "image": "{portada}", "description": "{descripción}",
  "author": [{ "@id": "https://modulo369.com/artistas/{artista}/#persona" }],
  "publisher": { "@id": "https://modulo369.com/#galeria" },
  "numberOfPages": "{páginas}",
  "workExample": [
    { "@type": "Book", "inLanguage": "es", "bookFormat": "https://schema.org/Paperback", "isbn": "{ISBN ES}",
      "offers": { "@type": "Offer", "url": "{link Amazon ES}", "availability": "https://schema.org/InStock",
                  "seller": { "@type": "Organization", "name": "Amazon" } } },
    { "@type": "Book", "inLanguage": "en", "bookFormat": "https://schema.org/Paperback", "isbn": "{ISBN EN}",
      "offers": { "@type": "Offer", "url": "{link Amazon EN}", "availability": "https://schema.org/InStock",
                  "seller": { "@type": "Organization", "name": "Amazon" } } }
  ] }
```
- Una `workExample` por cada link de Amazon que exista (el brief pide ir «a la edición del idioma de la página»). `bookFormat`: `Paperback` o `Hardcover`, según el formato de KDP `[mat]`.
- **Sin `price`:** lo fija y lo cambia Amazon, y un precio viejo en el marcado contradice la página. Google no da resultado enriquecido de libros sin un acuerdo de feed; este nodo existe para que una IA sepa qué es la edición, quién la edita y dónde se compra.
- `author` solo si la edición declara autoría `[mat]`. `isbn` solo si KDP lo asignó; sin ISBN se omite.
- Si un «cuaderno» no tiene texto (un cuaderno de páginas en blanco de KDP), se omite `inLanguage` y queda una sola `workExample`.

### 4.8 Encuentro, Activar, Libro y cada encuentro `[9-4]`
**Encuentro** (`/encuentro/`):
```json
{ "@type": "CreativeWork", "@id": "https://modulo369.com/encuentro/#proyecto",
  "name": "Encuentro", "description": "{qué es, texto de María}", "image": "{foto de la caja}",
  "producer": { "@id": "https://modulo369.com/#galeria" },
  "hasPart": { "@id": "https://modulo369.com/encuentro/libro/#libro" } }
```
- Si la caja **se vende** `[9-4]`: `"@type": ["CreativeWork", "Product"]` con `offers` (precio CLP + `InStock`), **en la página donde se ven el precio y el botón Comprar** (según el brief §3, Activar). Si **se reparte**: sin `offers`; Activar es un formulario.
- Si en su texto Encuentro es obra de María y no un proyecto de la galería: `creator` → su `#persona`. Se decide con su texto `[mat]`.
- **Preguntas frecuentes:** la página es `FAQPage` (`mainEntity` = `Question`/`Answer`, `about` → `#proyecto`) **solo con las preguntas reales que escriba María**, desde el mismo campo que las pinta. Desde ago-2023 Google ya no da resultado enriquecido de FAQ a sitios como este; se marca igual porque sale gratis del campo y las IA leen pares pregunta/respuesta. Preguntas inventadas, nunca (antislop B3).

**Libro** (`/encuentro/libro/`): `CollectionPage` con `mainEntity`:
```json
{ "@type": "Collection", "@id": "https://modulo369.com/encuentro/libro/#libro",
  "name": "Libro", "description": "{texto fijo: registro numerado de los encuentros activados, del 001 al 369}",
  "collectionSize": "{activados}", "isPartOf": { "@id": "https://modulo369.com/encuentro/#proyecto" },
  "hasPart": [{ "@id": "https://modulo369.com/encuentro/libro/001/#encuentro" }] }
```
- **Con 0 activados:** la página existe (369 posiciones vacías, borrador §7), pero en `noindex, follow` y fuera del sitemap: es contenido delgado. Pasa sola a indexable con el primer activado, por una condición del build (mismo patrón que Bernardo, `enObra`).
- **Solo los activados tienen URL.** Las 369 casillas no generan 369 páginas vacías, y una casilla sin activar no es enlace.

**Encuentro activado** (`/encuentro/libro/{nnn}/`): `ItemPage` con `mainEntity`:
```json
{ "@type": "CreativeWork", "@id": "https://modulo369.com/encuentro/libro/{nnn}/#encuentro",
  "name": "Encuentro {nnn} de 369", "position": "{n}", "dateCreated": "{fecha}",
  "contentLocation": { "@type": "Place", "name": "{lugar aproximado}" },
  "description": "{descripción}", "image": { "@type": "ImageObject", "contentUrl": "{foto}" },
  "isPartOf": { "@id": "https://modulo369.com/encuentro/libro/#libro" },
  "publisher": { "@id": "https://modulo369.com/#galeria" } }
```
- **No es `Event`:** una activación privada ya ocurrida no es un evento al que se pueda asistir, y marcarla así infringe las pautas de eventos de Google. Solo si `[9-4]` revela activaciones públicas con fecha y lugar (una sesión abierta), esa sesión se marca `Event`.
- **Sin `creator` persona:** quien activó la caja no se nombra en el marcado salvo permiso explícito (datos personales). `contentLocation` lleva solo el lugar aproximado que María escribe, nunca una dirección.

### 4.9 Exposiciones `[9-3]`
Solo si María confirma exposiciones. Cada una:
```json
{ "@type": "ExhibitionEvent", "@id": "https://modulo369.com/exposiciones/{slug}/#exposicion",
  "name": "{título}", "startDate": "{inicio}", "endDate": "{fin}",
  "eventAttendanceMode": "https://schema.org/{Offline|Online|Mixed}EventAttendanceMode",
  "location": { "@type": "Place", "name": "{sala}", "address": "{dirección}" },
  "organizer": { "@id": "https://modulo369.com/#galeria" },
  "workFeatured": [{ "@id": "https://modulo369.com/obras/{slug}/#obra" }],
  "image": "{imagen}", "description": "{texto}" }
```
En línea: `location` → `{ "@type": "VirtualLocation", "url": "{url}" }`. Es el único tipo del sitio con opción real a resultado enriquecido de eventos, siempre que tenga fechas.

### 4.10 Acerca · Contacto · Privacidad
- Acerca: `AboutPage` con `mainEntity` → `#galeria`.
- Contacto: `ContactPage` con `mainEntity` → `#galeria` (el `contactPoint` ya va en el grafo global) `[9-5]`.
- Privacidad: `WebPage` sin nada más `[9-a]`.
- 404: sin JSON-LD.

### 4.11 Migas (todas menos la home)
`BreadcrumbList` (`@id` `{url}#migas`) con los nombres en el idioma de la página, siguiendo la URL: `Módulo 369 › Obras › {título}`, `Módulo 369 › Encuentro › Libro › Encuentro 007`. Google las muestra en el resultado en vez de la URL.

---

## 5 · Titles y meta descriptions por ruta

**Reglas.** Title de 60 caracteres como máximo; si se pasa, se quita « · Módulo 369» (se conserva en la home). Description de 70 a 155 caracteres, armada **solo** con datos de la página. Una cláusula cuyo dato falta se omite entera; la frase nunca se corta a la mitad. Ninguna lleva precio (cambia, y vive en la página y en `offers`). Sin Title Case y sin raya.

**Quién escribe qué.** Simón fija la estructura: qué dato, en qué orden, con qué largo. **Los fragmentos fijos de abajo son textos fijos del sitio (brief §6): Clara los revisa en registro y tuteo antes de construir, y SpindleLab los traduce.** Donde dice `[mat]`, la description sale del texto de María.

| Ruta | Title ES / EN | Description ES | Description EN |
|---|---|---|---|
| `/` | Módulo 369 · galería de arte en línea / Módulo 369 · online art gallery | Enunciado de María si cabe `[mat]`; si no: «Galería de arte en línea con obras de {A}, {B} y {C}. Compra o consulta por cada obra.» (más de 3 artistas: «con obras de {n} artistas») | «Online art gallery with work by {A}, {B} and {C}. Buy or enquire about each work.» |
| `/artistas/` | Artistas · Módulo 369 / Artists · Módulo 369 | «Obra y statement de {A}, {B} y {C}, artistas de Módulo 369.» | «Work and statements by {A}, {B} and {C}, artists at Módulo 369.» |
| `/artistas/{a}/` | {Nombre}, artista · Módulo 369 / {Name}, artist · Módulo 369 | «Obra de {Nombre} en Módulo 369: {n} piezas en {técnica 1} y {técnica 2}{, {k} disponibles}.» | «Work by {Name} at Módulo 369: {n} pieces in {medium 1} and {medium 2}{, {k} available}.» |
| `/obras/` | Obras · Módulo 369 / Works · Módulo 369 | «{n} obras de {A}, {B} y {C}. Filtra por artista, técnica, tamaño y disponibilidad.» | «{n} works by {A}, {B} and {C}. Filter by artist, medium, size and availability.» |
| `/obras/{o}/` | {Título}, {año} · {Artista} · Módulo 369 | «{Título} ({año}), de {Artista}. {Técnica}, {alto} × {ancho}{ × {prof}} cm. {Estado}» · Estado: 1 «Disponible para comprar en línea.» · 2 «Disponible: consulta por ella.» · 3 «Vendida.» · 4 «En colección privada.» | «{Title} ({year}) by {Artist}. {Medium}, {h} × {w}{ × {d}} cm. {Status}» · 1 «Available to buy online.» · 2 «Available: enquire about it.» · 3 «Sold.» · 4 «In a private collection.» |
| `/ediciones/` | Ediciones · Módulo 369 / Editions · Módulo 369 | «Cuadernos y libros editados por Módulo 369, en Amazon en español e inglés.» | «Notebooks and books published by Módulo 369, on Amazon in Spanish and English.» |
| `/ediciones/{e}/` | {Título} · Ediciones · Módulo 369 / {Title} · Editions · Módulo 369 | «{Tipo} de {n} páginas{, de {autoría}}, editado por Módulo 369. En Amazon, en español e inglés.» | «{n}-page {type}{ by {author}}, published by Módulo 369. On Amazon in Spanish and English.» |
| `/encuentro/` | Encuentro · Módulo 369 | Primera frase de «qué es» `[mat]` | Idem, de su texto EN |
| `/encuentro/activar/` | Activar un encuentro · Módulo 369 / Activate an Encuentro · Módulo 369 | `[9-4]` venta: «Compra la caja de Encuentro: qué recibes, tiempos y cómo queda en el Libro.» · reparto: «Pide una caja de Encuentro: qué recibes, tiempos y cómo queda en el Libro.» | «Buy / Request an Encuentro box: what you receive, timing and how it is recorded in the Libro.» |
| `/encuentro/libro/` | Libro de Encuentro · {k} de 369 · Módulo 369 / Encuentro Libro · {k} of 369 · Módulo 369 | «Registro numerado de los encuentros activados: van {k} de 369, cada uno con su foto, fecha y lugar.» | «Numbered record of activated Encuentros: {k} of 369 so far, each with its photo, date and place.» |
| `/encuentro/libro/{nnn}/` | Encuentro {nnn} de 369 · {lugar} · Módulo 369 / Encuentro {nnn} of 369 · {place} · Módulo 369 | «Encuentro {nnn} de 369, activado en {lugar} el {5 de octubre de 2026}.{ Primera frase de la descripción, si cabe}» | «Encuentro {nnn} of 369, activated in {place} on {5 October 2026}.{ …}» |
| `/acerca/` | Acerca de Módulo 369 / About Módulo 369 | Enunciado de María `[mat]` | Idem, EN |
| `/tienda/` | Tienda · Módulo 369 / Shop · Módulo 369 | «Cómo se compra en Módulo 369: obras con Mercado Pago{, la caja de Encuentro} y ediciones en Amazon. Sin carrito: cada cosa tiene su vía.» `[9-4]` | «How to buy at Módulo 369: works through Mercado Pago{, the Encuentro box} and editions on Amazon. No cart: each item has its own route.» |
| `/contacto/` | Contacto · Módulo 369 / Contact · Módulo 369 | «Consultas por obras, ediciones o Encuentro: formulario, correo e Instagram.» (cada canal, si existe) `[9-5]` | «Enquiries about works, editions or Encuentro: form, email and Instagram.» |
| `/privacidad/` | Privacidad · Módulo 369 / Privacy · Módulo 369 | «Qué datos recoge Módulo 369 en sus formularios{ y su analítica} y qué hace con ellos.» `[9-a]` `[9-c]` | «What data Módulo 369 collects through its forms{ and analytics} and what it does with it.» |
| `/exposiciones/` | Exposiciones · Módulo 369 / Exhibitions · Módulo 369 | «Exposiciones de Módulo 369: actuales y pasadas, con sus obras.» `[9-3]` | «Módulo 369 exhibitions, current and past, with their works.» |
| `/exposiciones/{x}/` | {Título} · {fechas} · Módulo 369 | «{Título}, {fechas}{, en {sala o «en línea»}}. Obras de {artistas}.» | Idem, EN |
| 404 | Página no encontrada · Módulo 369 / Page not found · Módulo 369 | n/a | n/a |

- Medidas: **alto × ancho × profundidad**, la convención del arte. Es el mismo orden en la ficha, el filtro, la description y el schema.
- Fechas largas en ES («5 de octubre de 2026») y en EN («5 October 2026»), sin abreviar el mes.
- **Descriptor «galería de arte en línea»:** lo usa la ficha y lo propuso el diagnóstico (C11). Si María se nombra de otra forma («galería de arte contemporáneo»), se cambia en la home, el `logo`/`description` y la bio de Instagram **a la vez** `[mat]`.

---

## 6 · Sitemap

- **Se genera en el build desde las colecciones y desde la tabla de rutas de §2.4.** `@astrojs/sitemap` empareja idiomas solo cuando la ruta es idéntica después del prefijo, y no emite `x-default`. Con secciones traducidas (`/obras/` ↔ `/en/works/`) no las emparejaría, así que los alternates se escriben con su hook `serialize` (campo `links`) o con un endpoint propio. Lo decide Diego; la condición es una sola tabla.
- Cada URL, en sus dos idiomas, con los tres alternates; obras y ediciones, con su imagen:
  ```xml
  <url>
    <loc>https://modulo369.com/obras/{slug}/</loc>
    <xhtml:link rel="alternate" hreflang="es" href="https://modulo369.com/obras/{slug}/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://modulo369.com/en/works/{slug}/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://modulo369.com/en/works/{slug}/"/>
    <image:image><image:loc>https://modulo369.com/{variante grande de la obra}</image:loc></image:image>
  </url>
  ```
  En una galería, Google Imágenes es un canal real: alguien busca una obra o una artista y llega por la imagen.
- **Fuera del sitemap:** `/admin/`, 404, el Libro con 0 activados, páginas sin texto todavía (Privacidad sin aviso), cualquier página de «gracias» de formulario `[9-b]` (mejor una confirmación en la misma página, sin URL propia).
- **Sin `lastmod`**, salvo que salga de una fecha real de cambio del contenido. Poner la fecha del build marca todo como cambiado en cada deploy, y Google aprende a ignorar el dato.
- Se declara en `robots.txt` y se envía en Search Console y Bing (§14).

---

## 7 · `robots.txt` e IA

```
User-agent: *
Allow: /
Disallow: /admin/

# Entrenamiento de modelos de IA: lo decide María con cada artista (ver abajo).
# Propuesta por defecto mientras no respondan: no.
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
User-agent: meta-externalagent
User-agent: Bytespider
Disallow: /

Sitemap: https://modulo369.com/sitemap-index.xml
```

- **Se separan dos cosas que suelen mezclarse.** Los rastreadores de **búsqueda y respuesta** quedan abiertos (Googlebot, Bingbot, `OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot` y los que actúan a pedido de un usuario): sin ellos, Módulo 369 no aparece en ChatGPT, Claude ni Perplexity cuando alguien pregunta, y la visibilidad en IA es justamente lo que se busca. Los de **entrenamiento** van cerrados por defecto: lo que está en juego son las fotos de las obras, y las dueñas son las artistas.
- **Por qué cerrado por defecto:** abrirlo después es una línea; una obra que ya entró a un set de entrenamiento no se saca.
- **El costo, dicho claro:** `Google-Extended` también controla que Gemini (la app y Vertex AI) use el sitio para responder. Cerrarlo resta algo de visibilidad en Gemini; **no** afecta Google Search ni las respuestas de IA dentro de Google, que usan Googlebot. Si María y las artistas aceptan el entrenamiento, se borra el bloque entero.
- **Pregunta nueva (no está en §9), para que Ramón decida si se la hace a María:** «¿Aceptas, tú y cada artista, que las fotos de las obras se usen para entrenar modelos de IA?». No bloquea nada: mientras tanto, el valor por defecto.
- Si la zona queda en Cloudflare `[9-5]`, revisar en el panel que «AI Crawl Control» (o el bloqueo de bots de IA) coincida con este archivo y **no** bloquee los de búsqueda. Tampoco se activa Bot Fight Mode: desafía a los rastreadores.
- `robots.txt` es una convención voluntaria y no impide copiar una imagen. No se promete más que eso.
- Nunca un `Disallow` para esconder una página: si Google no puede leerla, no ve su `noindex` y puede listar la URL igual.

---

## 8 · Enlazado interno

```
            ┌──────────── Inicio ────────────┐
            ▼               ▼                ▼
        Artistas ──► Artista ◄──────► Obra ◄── Obras (índice, todas)
                      │  ▲   (creator)  │  ▲
                      ▼  │              │  └── Tienda (disponibles)
                    Edición ◄─ Ediciones │
                                        └──► «más de {artista}»
        Encuentro ──► Activar      Encuentro ──► Libro ──► Encuentro nnn ◄──► anterior / siguiente
```

| Desde | Enlaza a | Regla |
|---|---|---|
| Todas | Menú (7 secciones), selector ES/EN a la **misma** página, pie con Privacidad e Instagram | El selector usa la tabla de §2.4 |
| Inicio | Obras del carrusel → su ficha · artistas que asoman → su página · Encuentro · ediciones | El carrusel está en el HTML, no armado solo con JS |
| Artistas | Cada artista | |
| Artista | Sus ~9 obras de la selección → ficha · sus ediciones (relación) → edición · «Ver todas sus obras ({n})» → `/obras/` con el filtro aplicado | El filtro no es una URL indexable: las obras fuera de la selección se alcanzan desde `/obras/` |
| Obras | **Todas las obras**, como `<a href>` en HTML estático | Sin scroll infinito ni paginación solo con JS. Con 90 obras es una página; se revisa sobre ~150 |
| Obra | Su artista (en la ficha y en las migas) · «Más de {artista}» (3 obras) · Consultar → `/contacto/?obra={slug}` (canonical: Contacto) · Comprar → link de MP | Links externos (MP, Amazon) normales; `rel="sponsored"` solo si algún día hay afiliación |
| Edición | Sus artistas (si hay autoría) · Ediciones · Amazon ES y EN | |
| Encuentro | Activar · Libro (el enlace vertical) · los últimos activados | |
| Libro | Cada encuentro activado | Casillas sin activar: sin enlace |
| Encuentro nnn | Libro · el activado anterior y el siguiente · Encuentro | |
| Tienda | Obras disponibles (estados 1 y 2) · Activar (si la caja se vende `[9-4]`) · Ediciones | |
| Acerca | Artistas (su única acción) | |
| Exposición `[9-3]` | Sus obras y sus artistas; desde la artista, sus exposiciones | |

- **Ninguna página huérfana:** cada URL del sitemap recibe al menos un enlace desde otra página indexable.
- **Texto en HTML, no solo en la imagen.** Título, artista, año, técnica y medidas van como texto junto a cada obra: es lo que leen Google Imágenes y los motores de IA.
- `alt` de la obra: el campo «texto alternativo» si María lo llena; si no, la plantilla «{Título}, {artista}, {año}. {Técnica}.». El detalle: «Detalle de {título}».

---

## 9 · Qué haría que una IA cite a Módulo 369 (AEO)

1. **Que la entidad sea una sola y no se confunda** (§0-3): nombre + descriptor en todas partes, `@id` estables, `alternateName` sin tilde. Es la condición para que una respuesta sobre «módulo 369 galería» no termine en el IVA español.
2. **Hechos respondibles en texto:** quiénes son las artistas (bio), qué obras hay y en qué estado (ficha), cómo se compra cada cosa (Tienda), qué es Encuentro (su texto y sus preguntas reales). Son las respuestas a «¿dónde compro obra de X?» o «¿qué es Encuentro de Módulo 369?».
3. **El grafo que conecta todo:** obra → `creator` → artista → `affiliation` → galería; edición → `publisher` → galería; encuentro → `isPartOf` → Libro → proyecto.
4. **Fuentes fuera del sitio que confirmen lo mismo** `[mat]`. Es lo que más pesa y lo que menos cuesta pedir:
   - la bio del Instagram de la galería, con el descriptor y la URL;
   - el sitio o Instagram de cada artista, enlazando a **su** página en Módulo 369 (que corresponde con su `sameAs`);
   - la descripción de cada edición en Amazon, mencionando Módulo 369 y su URL.
   Todo eso se le pide a María en la capacitación, no se construye.
5. **Rastreadores de búsqueda abiertos** (§7) y contenido en HTML estático (Astro), nunca detrás de JS.

---

## 10 · Panel (Decap): qué campo alimenta cada señal

**Principio: la capa SEO no le agrega a María ningún campo obligatorio.** Casi todo sale de campos que el mapa ya exige; los únicos campos nuevos son opcionales, y el resto lo hace el build.

| Colección | Campo | Tipo e i18n | Alimenta | Clase |
|---|---|---|---|---|
| **Configuración** (archivo) | Enunciado corto ES/EN | texto, `i18n: true` | `Organization.description`, description de la home | mapa (Acerca) `[mat]` |
| | Instagram de la galería | URL, patrón `^https://(www\.)?instagram\.com/` | `sameAs`, pie, Contacto | mapa `[mat]` |
| | Otros perfiles | lista de URL | `sameAs` | **opcional SEO** |
| | Correo de contacto | correo | `email`, `contactPoint` | `[9-5]` |
| | Ciudad | texto | `address.addressLocality` | **opcional** `[mat]` |
| | Fundadora | relación a Artistas, vacía por defecto | `founder` | **opcional**, con OK |
| | Crédito fotográfico por defecto | texto | `creditText` | **opcional** (licencia del fotógrafo, borrador §5) |
| | Portada | lista ordenable de obras | carrusel, `primaryImageOfPage`, og:image de la home | mapa |
| **Artistas** | Nombre | texto | `name`, slug, title | mapa |
| | Bio, statement, historia/proceso ES/EN | texto largo, `i18n: true` | `description` (1.er párrafo de la bio), página | mapa |
| | Foto opcional + texto alternativo | imagen, `i18n: duplicate` | `Person.image` | mapa (opcional) |
| | Enlaces propios (sitio, Instagram) | lista de URL | `sameAs` | **opcional SEO**, con permiso |
| **Obras** | Título ES · título EN (vacío = el ES) | texto | `name`, slug, title, alt | mapa |
| | Artista | relación, `duplicate` | `creator`, slug, filtro | mapa |
| | Año | número, `duplicate` | `dateCreated` | mapa |
| | Técnica | **relación a Técnicas**, no texto libre | `artMedium`, `artform`, filtro | mapa |
| | Alto, ancho, profundidad (cm) | **números**, profundidad opcional | `height`/`width`/`depth`, filtro de tamaño, ficha | mapa |
| | Imagen general + detalle | imagen, `duplicate`, tope 10 MB | `image`, og:image, sitemap de imágenes | mapa |
| | Texto alternativo ES/EN | texto | `alt`, `caption` | **opcional** (si falta, plantilla §8) |
| | Descripción ES/EN | texto largo | `description` | mapa |
| | Estado | select de 4 | ficha, `offers`, description | mapa |
| | Precio (CLP, entero) | número, opcional | `offers.price` | mapa |
| | Link de Mercado Pago | URL, opcional, patrón de MP | botón Comprar; habilita `offers` | mapa |
| | Crédito fotográfico | texto, opcional (si falta, el por defecto) | `creditText` | **opcional** |
| **Técnicas** (archivo, lista) | Nombre ES, nombre EN, disciplina (pintura, dibujo, collage, grabado, fotografía, escultura, textil, otra) | lista | filtro consistente, `artMedium` traducido una vez, `artform` | **nuevo**, pequeño |
| **Ediciones** | Título ES/EN, tipo (cuaderno/libro), descripción ES/EN, portada, interiores | | `name`, `image`, description, og:image | mapa |
| | Autoría | relación múltiple a Artistas, opcional | `author`, enlaces artista ↔ edición | **opcional** |
| | Páginas, medidas y encuadernación, formato (tapa blanda/dura) | número, texto, select | `numberOfPages`, `bookFormat` | mapa («detalles») |
| | Link Amazon ES, link Amazon EN | URL, patrón `^https://(www\.)?amazon\.` | `workExample.offers.url`, botones | mapa |
| | ISBN ES, ISBN EN | texto, opcional | `isbn` | **opcional SEO** |
| **Encuentros** | Número | texto con patrón `^(00[1-9]\|0[1-9][0-9]\|[12][0-9][0-9]\|3[0-5][0-9]\|36[0-9])$` («tres cifras, de 001 a 369») | slug, `position`, title | mapa |
| | Fecha | fecha | `dateCreated`, title, description | mapa |
| | Lugar aproximado | texto, aviso «comuna o ciudad, nunca una dirección» | `contentLocation`, title | mapa |
| | Foto + texto alternativo, descripción ES/EN | | `image`, `description` | mapa |
| | Tengo permiso de quien aparece | casilla; **el build no publica el encuentro sin ella** | protege datos personales | **nuevo**, una casilla |
| **Páginas** (archivos) | Encuentro: qué es, cómo funciona, formas de activación, foto de la caja; preguntas frecuentes (lista pregunta/respuesta ES/EN); precio y link de MP de la caja `[9-4]` | | `CreativeWork`, `FAQPage`, `offers` | mapa |
| | Acerca: enunciado, criterio, la acción, visión ES/EN | | `AboutPage`, description | mapa |
| | Privacidad `[9-a]` | | página | agregada |
| **Exposiciones** `[9-3]` | Título ES/EN, inicio, fin, modalidad (sala/en línea), lugar o URL, artistas, obras, texto, imagen | | `ExhibitionEvent` | solo si `[9-3]` |

**Automático (sin campo):** slugs, `@id`, title, description, canonical, hreflang, OG e imagen OG, migas, sitemap, conteos («{k} de 369», «{n} obras»), el estado 1 (disponible + precio + link) y todo el JSON-LD.

- La estructura i18n de Decap (`multiple_folders`, `multiple_files` o `single_file`) la elige Diego. La condición SEO: un solo slug por entrada, y `i18n: duplicate` (o sin traducción) en números, imágenes, relaciones, precio, estado y links.
- Los patrones de URL (MP, Amazon, Instagram) evitan que un link mal pegado rompa el botón y el schema. Diego confirma el dominio real de los links de MP que genere María antes de fijar ese patrón.

---

## 11 · Qué depende de qué

| Señal | Depende de | Mientras tanto |
|---|---|---|
| Host canónico (raíz o www) | `[9-5]`: acceso a GoDaddy y NS a Cloudflare | Raíz; si no hay NS, www |
| `email`, `contactPoint`, description de Contacto | `[9-5]` | Sin correo en el grafo |
| `/exposiciones/`, `ExhibitionEvent`, sus titles, sitemap y enlaces | `[9-3]` | No existe; el historial vive en Obras (vendidas, colección privada) |
| Encuentro como `Product` con `offers` o `CreativeWork`; description de Activar y de Tienda | `[9-4]`: ¿se vende o se reparte? | `CreativeWork` sin `offers`; Tienda sin la caja |
| Páginas del Libro y de cada encuentro | `[9-4]`: ¿quién sube los registros? | Si María: como aquí. Si el público: fuera de alcance (borrador §8-3) |
| `Event` para activaciones | `[9-4]`: ¿hay sesiones públicas con fecha y lugar? | `CreativeWork` |
| `/privacidad/`, su par EN y su description | `[9-a]` | No se publica sin texto |
| Confirmación de formularios sin URL propia (o `noindex`) | `[9-b]` | Confirmación en la misma página |
| Eventos de conversión y consentimiento (no afecta Search Console) | `[9-c]` | Search Console y Bing, que no usan cookies |
| `sameAs` de la galería y de cada artista | `[mat]` Instagram, permisos | Sin `sameAs` |
| `founder`, `foundingDate` | OK de María | No se declaran |
| `OnlineBusiness` o `ArtGallery` con dirección | `[sup]`: ¿hay sala con dirección pública? | `OnlineBusiness` |
| Bloque de entrenamiento de IA en `robots.txt` | Pregunta nueva a María y a las artistas (§7) | Cerrado |
| Descriptor «galería de arte en línea» | Cómo se nombra María `[mat]` | Ese |
| `author`, `isbn`, `bookFormat` de cada edición | `[mat]` datos de KDP | Se omiten |

---

## 12 · La maqueta v2 (solo esto)

La maqueta es `noindex` y **no** lleva capa de señales: no hay brief §7 que la pida, y nada de la v2 llega a producción (brief §6).

**Debe tener:**
- `<meta name="robots" content="noindex, nofollow">` en `index.html` (la v1 ya trae `noindex`).
- `_headers` con `/*` → `X-Robots-Tag: noindex, nofollow` en `modulo369-maqueta.pages.dev` (C20). Cubre también las imágenes de relleno: sin el header, las JPG de `img/obras/` podrían entrar a Google Imágenes asociadas a «Módulo 369».
- **Nada de `robots.txt` con `Disallow`:** Google no vería el `noindex`.
- `<title>Módulo 369 · maqueta v2</title>`. Un title por vista **solo si la spec toma C38** (no lo pide el brief §7). Si se hace: `{vista} · Módulo 369 · maqueta`, para que la pestaña nunca parezca el sitio real.
- Que `document.documentElement.lang` cambie con el botón ES/EN (`es-CL` / `en`). Cuesta una línea, ayuda a VoiceOver en el iPhone de María y acompaña el criterio de EN del brief §7.

**Opcional:** si Ramón le manda el link por WhatsApp, `og:title` «Módulo 369 · maqueta v2» y `og:description` «Maqueta para la reunión del 6 de octubre. Obras y artistas de relleno.», para que la vista previa no salga vacía. **Sin `og:image`:** la miniatura mostraría una obra de relleno como si fuera real.

**No debe tener:** JSON-LD, canonical, hreflang, sitemap ni enlaces hacia modulo369.com. Tampoco se enlaza desde ningún lugar público, y se baja después de la reunión (brief §10).

---

## 13 · Cómo se verifica en producción (para el acta de Javiera)

| # | Prueba | Pasa si |
|---|---|---|
| 1 | Recorrer cada ruta del sitemap, ES y EN | Un `<title>` único y una description de 70 a 155 caracteres por URL; `lang` correcto; canonical absoluto a sí misma |
| 2 | hreflang | Cada par ES/EN se apunta mutuamente, más `x-default`; todos con barra final y código 200 |
| 3 | JSON-LD de todas las páginas | `JSON.parse` sin error; validator.schema.org sin errores; en la Prueba de resultados enriquecidos, la obra en estado 1 da «Fragmentos de productos» válido (solo las advertencias aceptadas de §4.6) y las migas son válidas |
| 4 | Precio | El `offers.price` de cada obra en estado 1 es el mismo número que se ve; una obra vendida no tiene `offers` |
| 5 | Sitemap | Contiene todas las URLs indexables con sus tres alternates; no contiene `/admin/`, 404, el Libro con 0 activados ni páginas sin texto |
| 6 | `curl -sI https://modulo369.com/` | Sin `X-Robots-Tag` |
| 7 | `curl -sI https://modulo369.pages.dev/` | `X-Robots-Tag: noindex` |
| 8 | `curl -sI http://modulo369.cl/obras/{slug}/`, `https://www.modulo369.com/…`, `…/obras/{slug}` sin barra, `/ols/products` | Un solo 301 al destino canónico, conservando la ruta |
| 9 | `/no-existe/` y `/en/no-existe/` | Código 404, cada una en su idioma, con salida a Obras |
| 10 | Dos obras «Sin título» de la misma artista y el mismo año | Dos URLs distintas |
| 11 | El selector de idioma en cada página | Lleva a la URL que declara su `hreflang` |
| 12 | `robots.txt` | Coincide con la decisión de §7 y declara el sitemap |
| 13 | og:image de una obra vertical | 1200×630, obra entera sobre hueso, sin recorte |
| 14 | Buscar en el build `pendiente`, `relleno`, `img/obras/`, `maqueta` | Cero resultados (borrador §7) |

---

## 14 · Lanzamiento y monitoreo (con Nora)

- **Search Console y Bing Webmaster Tools a nombre de María** (compromiso 2), con SpindleLab como usuario. Search Console como propiedad de dominio por DNS `[9-5]`; si el acceso al DNS se demora, propiedad por prefijo de URL con archivo HTML. Bing se importa desde Search Console; Bing alimenta a Copilot y es una de las fuentes de búsqueda de ChatGPT.
- El día del lanzamiento: enviar el sitemap a los dos y pedir la indexación de la home ES y EN.
- **Qué se mide:**
  - impresiones y clics por consulta de marca («módulo 369 galería», «modulo369») y por nombre de cada artista;
  - Google Imágenes por separado (tipo de búsqueda: imagen);
  - cobertura de indexación ES y EN;
  - con la analítica `[9-c]`: clics en Comprar (salida a MP), en Amazon ES/EN y envíos de Consultar y Activar. Es lo que une el SEO con el negocio de María.
- **Línea base de IA, al lanzar y después una vez al mes** (no se corrió hoy: no hay sitio que encontrar). En ChatGPT, Perplexity, Gemini y Claude se pregunta, y se registra si Módulo 369 aparece y si lo citan con enlace:
  1. «¿Qué es Módulo 369?»
  2. «¿Qué es Módulo 369, la galería de arte?»
  3. «Galería de arte en línea en Chile»
  4. «¿Dónde compro obra de {artista}?»
  5. «¿Qué es Encuentro de Módulo 369?»

  Hoy, por §0-3, la primera pregunta probablemente lleva al IVA español. Que deje de pasar es una señal de que la entidad se instaló.
- **P4, opcional:** `llms.txt` generado en el build desde las colecciones (el sitio de Bernardo tiene uno). Su efecto no está probado, así que solo va si no requiere mantenimiento. IndexNow, por Crawler Hints de Cloudflare, solo si la zona queda en Cloudflare.

---

## 15 · Descartado (y por qué)

- **`ArtGallery` como tipo principal sin dirección:** error de `LocalBusiness` en la prueba de Google. Va como `additionalType`.
- **`Event` para cada activación:** no son eventos a los que se pueda asistir.
- **Slugs de obra traducidos:** duplican el trabajo del panel y del selector por una ganancia marginal; los títulos de obra son nombres propios.
- **Precio en `Book`:** lo controla Amazon y queda viejo.
- **`license` y `acquireLicensePage` en las imágenes:** prometerían licencias de reproducción que nadie ofreció.
- **`Review` y `AggregateRating`:** no existen.
- **FAQ para el resultado enriquecido:** Google ya no lo muestra a sitios como este. Se marca solo con las preguntas reales de María, por las IA.
- **`SearchAction`:** el sitio no tiene buscador.
- **Renombrar los archivos de imagen con el título de la obra:** señal muy débil, y obligaría a María a renombrar antes de subir.
- **Redirección automática por idioma:** Google nunca vería el ES.
