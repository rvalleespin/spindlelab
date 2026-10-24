# Brief de obra: SpindleLab, textos del posicionamiento nuevo sobre el diseño actual

**Obra:** `spindlelab-posicionamiento-v1` · **Rama:** `claude/sitio-posicionamiento-nuevo` (desde `origin/main`) · **Abierta:** 23-oct-2026
**Triaje:** pulido de contenido sobre un diseño existente. No hay compuerta 2 porque **no hay dirección visual nueva**: se conserva el diseño publicado. La compuerta 1 es la instrucción de Ramón del 23-oct («dale con el calendario… que salga en menos de un mes… trabaja para que sea antes»).
**Plazo:** el sitio debe quedar en rama, revisado y listo para que Ramón lo mire el 23-oct, y publicable apenas él lo apruebe. Ramón depende de esto para la estrategia de ventas.

## 1. Objetivo
Reemplazar el texto visible del sitio (y la capa de señales que lo acompaña) por el del documento `copy-secciones.md` (v1.2), que expresa el posicionamiento «marketing y crecimiento con IA para empresas que ya venden» y el modelo de trabajo de `modelo-de-negocio-v1-BORRADOR.md`.
**Una sola acción por ruta:** pedir la revisión de una página (formulario `/contacto/`) o, en la home, además chequear el sitio (`/diagnostico/`).

## 2. Fuente de verdad
- **Texto:** `copy-secciones.md`, sección por sección. Donde el documento dice «se borra», se borra. Donde dice «se mantiene», no se toca.
- **Precios, planes, plazos y «qué incluye» de las páginas de servicio:** se mantienen como están publicados. El documento solo cambia lo que dice.
- **Decisiones abiertas (sección 12 del documento):** se construye con el valor por defecto que el documento ya escribió. Cada decisión abierta se lista al final en `desvios.md` para que Ramón la cierre.

## 3. Mapa de rutas (qué archivo es cada ruta)
| Ruta | Archivos | Sección del documento |
|---|---|---|
| `/` | `spindlelab-astro/src/pages/index.astro` + `src/components/{Hero,Problema,Servicios,Metodo,Nosotros,Evidencia,Faq,Contacto,Nav,Footer}.astro`, `src/consts.ts`, `src/layouts/Layout.astro` | 2 y 3 |
| `/nosotros/` | `src/pages/nosotros.astro` | 7 |
| `/servicios/` | `public/servicios/index.html` | 4 |
| `/servicios/<seis>/` | `public/servicios/{auditoria-seo-tecnica,visibilidad-en-ia,paid-media,redes-sociales,desarrollo-web,acompanamiento-mensual}/index.html` | 5 |
| `/metodo/` | `public/metodo/index.html` | 6 |
| `/contacto/` | `public/contacto/index.html` | 8 |
| `/diagnostico/` | `public/diagnostico/index.html` (solo texto visible, no la lógica) | 9 |
| 404 | `public/404.html` | 10 |
| Señales | `public/llms.txt`, JSON-LD y metas de cada página | 3 y 5 |
| Blog y privacidad: solo el marco | `public/blog/index.html`, los 7 artículos de `public/blog/*/` y `public/privacidad/`: **solo menú, botón, pie, metas de marca y descripciones de organización/autor en JSON-LD**. Cuerpo de artículos y texto de la política: intactos | 3 |

## 4. Jerarquía
Se conserva la de cada página existente. Las secciones nuevas del documento (por ejemplo «Para quién» y los precios en la home) se construyen con los **patrones que ya existen** en el sitio (tarjetas, listas, bloques de texto), sin inventar un componente nuevo ni cambiar tipografía, color, espaciado ni animación.

## 5. Activos reales
Todas las imágenes, videos, fuentes y la foto de Ramón existentes. **No se agrega ningún activo.** Cero cifras, logos, testimonios o casos que el documento no autorice. El único caso público es el de Bernardo Combeau, con el alcance que el documento fija («es un caso de sitio web, no de crecimiento de ventas»).

## 6. Criterios de aceptación (verificables)
1. `npm run build` en `spindlelab-astro/` termina sin errores y sin advertencias nuevas.
2. **Fidelidad:** cada bloque de texto visible de las rutas del mapa coincide con `copy-secciones.md` (palabra por palabra salvo ajustes de maquetación que se anotan en `desvios.md`).
3. **Barrido de términos** de la sección 13 del documento: ninguno de los términos prohibidos queda en texto visible ni en atributos (`alt`, `title`, `aria-label`, metas, JSON-LD, `llms.txt`).
4. **Cero rayas largas ni medias** (— –) en el texto que ve el público; cero Title Case en títulos; cero «¿Listo para…?».
5. **Navegación y pie idénticos** en todas las rutas, incluidos blog y privacidad (mismo menú, mismo botón, mismo pie), según la sección 3 del documento.
6. **Todo CTA de pedir revisión va al formulario `/contacto/`**, nunca a `mailto:` (el evento `generate_lead` solo se dispara ahí). El `mailto` queda solo como salida secundaria donde ya existía.
7. **JSON-LD** de cada página se parsea (`JSON.parse`) y mantiene los `@id` existentes (`#website`, `#autor-ramon`, etc.); `FAQPage` coincide con el FAQ visible; el FAQ de la home es el del documento.
8. **Precios** publicados = los del sitio vivo (verificar contra el HTML actual de `origin/main`, no contra memoria). Siempre «desde» y «+ IVA».
9. **Render** a 390, 768 y 1440 px de ancho: sin desborde horizontal, sin texto cortado, sin solapes, foco visible, contraste AA en lo que se tocó. Capturas guardadas en `capturas/`.
10. **Enlaces internos** de todas las rutas del mapa resuelven (200) y las anclas existen.
11. **Detector anti-slop** (`.claude/skills/estudio-web/antislop-web.md` y `refero-design/references/anti-ai-slop.md`) corrido entero por Javiera en contexto limpio.
12. **Caché:** si se modifica algún CSS/JS/imagen existente, se sube el `?v=N` en toda referencia a ese archivo.

## 7. Lo que NO se hace (y nadie lo «arregla de paso»)
- **No hay rediseño.** Ni paleta, ni tipografía, ni layout, ni animación, ni imágenes nuevas.
- **No se toca la lógica**: `functions/api/chequeo.js`, el endpoint y los campos del formulario de `/contacto/` (solo textos de etiquetas, ayudas, errores y confirmación), el gestor de consentimiento (`js/consent-banner.js`), el `_headers`, el `_redirects`, los UTM ni los eventos de analítica.
- **No se edita el cuerpo de los artículos del blog** (`public/blog/*/`) ni el texto de la política de `privacidad/`. En esas páginas solo se actualiza el marco (menú, botón, pie, metas de marca, descripciones de organización y autor en JSON-LD) para que no contradigan el posicionamiento. Si un artículo afirma algo que el posicionamiento nuevo no sostiene, se anota en el informe (decisión 12 del documento) y no se edita.
- **No se toca** el sitio de Verifica y Cumple (`verifica.spindlelab.cl`), ni `spindlelab-site/` ni `spindlelab-site-v2/`.
- **No se publican capacidades sin entrega** (analítica/CRM, automatización, seguimiento de consultas como servicio): el documento no las promete y el sitio tampoco.
- **No se inventa** ningún dato, plazo, cifra, caso, reseña, certificación ni compromiso. Si el documento no lo dice y una sección queda coja, se anota en `desvios.md`; no se rellena.
- **No se publica ni se hace merge a `main`.** Se trabaja en la rama y se hace push de la rama. Publicar es decisión de Ramón, en turno explícito.
- **No se corre el pipeline de cuatro roles** (dirección de arte, tablero) porque no hay dirección nueva; sí corre la revisión crítica independiente.

## 8. Entregables
Código en la rama · `desvios.md` · `acta-qa.md` firmada en contexto limpio · capturas a 390/768/1440 de cada ruta · lista de decisiones abiertas con el valor por defecto usado.
