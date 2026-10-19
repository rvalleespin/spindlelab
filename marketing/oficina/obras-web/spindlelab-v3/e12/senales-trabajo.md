# E12 · Capa de señales de `/trabajo/` y de cada `/trabajo/<caso>/`

**Simón (SEO y visibilidad en IA), con Diego · 18-oct-2026** · rama `claude/magical-franklin-ckfki2` · encargo del paso 2
§5 · defecto 3 de `e12/acta-paso-2.md`. Para quien construya las rutas después de la compuerta 2. Las entradas y los
ingredientes que cito tienen fila en `inventario-casos.md` (§2; en su `.json`, clave `senales`) y, los de Praxi, en
`inventario-praxi.md` §11, que esta nota no repite. Lo leído hoy está en `e12/inventario/crudo/`.

**19-oct, compuerta 2: donde esta nota choque con `e12/senales-obra.md`, manda esa.** Allá Combeau es una sola ruta
(`/trabajo/combeau/`), Verifica y Cumple, el chequeo y spindlelab.cl no tienen página de caso, el 54 → 94 no va, y
están el resto de las rutas de la obra, las imágenes al compartir y los `title` y `description` de cada una.

**La regla, en una línea:** el JSON-LD dice lo que la página dice en texto y lo que tiene fila en el inventario; nada más.
Ningún número va en los datos estructurados como calificación, y ninguna pieza de concepto se declara como empresa,
cliente o servicio que exista.

## Lo común a todas las rutas

- **Las dos entidades de siempre, con su `@id` de siempre:** `https://spindlelab.cl/#org` (`ProfessionalService`) y
  `https://spindlelab.cl/#autor-ramon` (`Person`). `#org` aparece 33 veces en 14 archivos de `spindlelab-astro/src`
  (grep sobre `01ea00f`), y así lo sirven spindlelab.cl y verifica.spindlelab.cl (crudos del 16-oct). Un `@id`
  distinto, o un `Organization` donde el grafo dice `ProfessionalService`, le presenta a un buscador dos estudios con el
  mismo nombre.
- `BreadcrumbList` Inicio › Trabajo › caso; `inLanguage: "es-CL"`; `dateModified` lo escribe el build; `image` es la
  portada de la entrada, con un `alt` que diga qué se ve (y «Concepto» cuando lo es).
- Mientras viva bajo `/v3/`: `noindex`. Al publicar, `canonical` a la ruta final, sin `/v3/`.
- **Lo que hace que una IA cite bien un caso:** una frase de entidad arriba, en texto y no en imagen («qué es, para
  quién, qué hicimos»); el resultado con fecha e instrumento, o la sección «Sin métrica» escrita como tal (una IA que
  lee «sin métrica» no rellena con un número); y el `about` enlazado al `@id` que la entidad real ya publica, en vez de
  una entidad nueva con el mismo nombre.
- **No va en ninguna:** `Review`, `AggregateRating`, `review` con testimonio, `award`, ni un `FAQPage` sin sus
  preguntas visibles en la página (la estructura de Koto no las tiene).

## Por ruta

| Ruta | Tipo | Lleva | No puede declarar |
|---|---|---|---|
| `/trabajo/` | Índice | `CollectionPage` + `ItemList` (un `ListItem` por entrada, con `url` y `name`; `numberOfItems` igual al conteo visible, hoy 10) + `BreadcrumbList`. El `name` de cada concepto lleva «(concepto)» | Un conteo de clientes; `Organization` por entrada |
| `combeau-fotografia/` · `combeau-modelo/` | Cliente | `WebPage` con `mainEntity` `CreativeWork` (`creator` `#org`, `description` igual a la bajada visible, `datePublished` 2026-07-24, el lanzamiento) y `about` un `WebSite` con su `url` y `publisher` `{"@id": "https://bernardocombeau.cl/#persona"}`, el `Person` que su sitio ya publica (también publica `#negocio`, un `LocalBusiness`) | Su teléfono, correo o dirección (su grafo los trae; el caso no los repite); lo que pagó; cualquier resultado de su negocio; que su sitio es un ejemplo de SEO (7 de 11 rutas sin `h1`, inventario §0.4); «bilingüe» para el book |
| `verifica-y-cumple/` | Propio | `CreativeWork` (`creator` `#org`) con `about` `{"@id": "https://verifica.spindlelab.cl/#app"}`, el `WebApplication` que Verifica ya publica | Que certifica cumplimiento; `Offer` de kits (no se ha vendido ninguno); el 54 → 94 mientras Ramón no decida mostrarlo, y nunca como calificación |
| `chequeo/` | Propio, herramienta | `CreativeWork` con `about` un `WebApplication` (`url` `https://spindlelab.cl/diagnostico/`, `isAccessibleForFree: true`, `creator` `#org`) | Cuántos chequeos se han corrido (no se guardan dominios) |
| `spindlelab-cl/` | Propio | `CreativeWork` con `about` `{"@id": "https://spindlelab.cl/#website"}`, que el sitio ya sirve | El 85 como calificación; el 36 → 73 → 100 fuera de lo que dice §7 del inventario |
| `praxi/` | Propio | `inventario-praxi.md` §11: `CreativeWork` (`#autor-ramon`, `dateCreated` 2026-07-21) con `about` un `SoftwareApplication` | `offers`, precios, `url` o `sameAs` a `praxi.coach` (da 402), términos de salud con promesa |
| `tonela/` · `ocelo/` · `sesenta/` · `doceavo/` | Concepto | `CreativeWork` con `genre: "Concepto"`, `creator` `#org`, `dateCreated` 2026-10-16 (el primer commit de cada pieza, hora de Chile), `disambiguatingDescription` («Pieza de concepto de SpindleLab: X no existe…») y `about` un `Thing` con el oficio (izaje, cirugía refractiva y de cataratas, derecho laboral del trabajador, contabilidad de pymes) | La marca inventada como `Organization`, `LocalBusiness`, `MedicalClinic`, `LegalService` o `AccountingService`; sus profesionales ficticios como `Person`; `url` o `sameAs` a `tonela.cl`, `ocelo.cl`, `sesenta.cl` o `doceavo.cl` (libres, nadie los sirve); `client`, `sponsor` o `funder`; `Offer` o precio; cualquier cifra de resultado |

**Por qué la marca inventada no va en el grafo de spindlelab.cl.** En su propio sitio (`marketing/portafolio/0N-*/sitio/`)
cada concepto se declara `Organization`, `MedicalClinic`, `LegalService` o `AccountingService` con la ficción dentro y
`noindex`, y eso está bien: es la pieza. Pero en una página de caso de spindlelab.cl, que sí se indexa, esa misma
entidad le enseñaría a un buscador o a un modelo que existe una clínica Ocelo en Providencia. El caso habla **de** la
pieza (`CreativeWork`), no **como** la pieza.

## Lo que encontré al revisar, para la construcción y para Bruno

1. **Prototipos de B:** sus cinco vistas usan `#organizacion` con `@type` `Organization`, y no `#org`
   `ProfessionalService`; su `/trabajo/` trae `CollectionPage` y `BreadcrumbList`, sin `ItemList`. Son prototipos con
   `noindex` y la capa se pone en la construcción; lo dejo escrito para que no se copie. A no trae JSON-LD (declarado en
   `direccion-a.md` §9.6).
2. **Doceavo** (`07-doceavo/sitio/index.html`, medido sobre `01ea00f`): su `disambiguatingDescription` dice «no tiene
   clientes ni dirección», y el mismo nodo declara un `PostalAddress` (comuna, región y país, sin calle). Una de las dos
   cosas sobra; lo decide Bruno. Ocelo y Sesenta traen el mismo `PostalAddress` sin calle, y su ficción no dice lo
   contrario.
3. **Las cuatro piezas no piden nada a terceros** al abrirse (0 URL externas pedidas por sus ocho páginas ni por sus
   hojas de estilo, `inventario/crudo/conceptos-repo.json`). Tonela **enlaza** seis fuentes de norma (cuatro en cada
   página, dos repetidas), que no se descargan sin un clic: es una cita, no un tercero.
