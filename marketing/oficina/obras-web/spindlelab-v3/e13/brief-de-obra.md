# Brief de obra E13 · SpindleLab v3 adaptado al modelo nuevo

**26-oct-2026 · Mauro (encuadre)** · rama `claude/v3-modelo-nuevo`, desde `origin/claude/magical-franklin-ckfki2` (`2db3d18e`, la QA vigente de E12: «Con reparos») · lo aprueba Ramón · **nada se publica ni va a `main`**.
**Tipo: obra, sin compuerta 2.** Cambian el mensaje, el orden de la home y la acción principal, y eso se encuadra como obra. No hay dirección visual nueva: Ramón ya eligió A · Archivo el 19-oct (compuerta 2 de E12) y esta obra lo conserva. La compuerta 1 son las cuatro decisiones de la sección 1.
**Manda:** `marketing/encargos-otras-sesiones/encargo-v3-adaptar-al-modelo-nuevo.md` (en `origin/main`), `revision-v3-contra-modelo-nuevo-23oct.md` y, para el texto, `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` v1.2, tal como quedó publicado sobre el diseño vigente (v2) el 24-oct. Donde el v2 publicado y el borrador difieran, manda lo publicado, porque Ramón ya lo vio y lo aprobó.

## 0 · Qué tiene que lograr

Que quien entre a `spindlelab.cl` con el v3 lea en cinco segundos «marketing y crecimiento con IA para empresas que ya venden», entienda el camino de cuatro pasos y tenga un solo botón que lo lleve a pedir la revisión de una página, sin mover el diseño, el hilo de oro ni las herramientas que ya están medidas.
**Lo que se reinicia es el mensaje, no el diseño.** Se conservan el sistema A · Archivo (`archivo.css`, `components/a`), las doce plantillas, el flujo de texto de Clara hacia JSON con huella, `verificar.mjs` y `mide.mjs`, los medios elegidos y las 20 URL vivas.

## 1 · Las cuatro decisiones de Ramón (compuerta 1)

Se las pregunté en un solo mensaje el 26-oct. **Al escribir este brief no hay respuesta.** Se construye con el valor por defecto; si Ramón cambia uno, se rehace solo lo que ese punto toca (la columna «Si dice otra cosa»).

| # | Decisión | Valor usado | Si dice otra cosa |
|---|---|---|---|
| 1 | ¿El look del v3 sirve para «marketing y crecimiento con IA»? | **Sí.** Se conserva el sistema y se recompone la home. | Es un rediseño: se detiene la construcción y se abre otra obra con compuerta 2. |
| 2 | ¿Raíz o prefijo `/v3/`, y cuándo? | **Raíz**, en una publicación liviana que lleva solo `spindlelab-astro/` y lo mínimo de documentos, cuando Ramón diga. La obra se construye y mide bajo `/v3/` y la conversión a raíz es un paso escrito y ensayado (lista de publicación). | Con prefijo: se publica bajo `/v3/` con noindex y no reemplaza al v2. Se pierde el efecto de ventas. |
| 3 | ¿Qué casos quedan? | **Bernardo Combeau** (único caso público con permiso, de sitio web) y **Verifica y Cumple** como pieza propia con enlace a `verifica.spindlelab.cl`. **Salen** Praxi y los cuatro conceptos (Sesenta, Ocelo, Doceavo, Tonela). Esto cierra R9. | Si quiere dejar Praxi o los conceptos, vuelven a `/trabajo/` con su rótulo; no a la home. |
| 4 | Cadencia y monitoreo | Informe **mensual**. **Sin** monitoreo de menciones en IA ni compromiso de puntaje a 3 meses, hasta que existan. Esto cierra R2.1 y R2.2. | Hay que escribir la capacidad real en `capacidad-servicios.md` antes de prometerla. |

Tres supuestos míos que cambian texto y que Ramón puede ver en `desvios.md`: «revisión» y no «diagnóstico» para lo gratis; «un día hábil» y no «24 horas»; botón de la navegación «Pedir la revisión».

## 2 · A quién le habla y qué dice

**Lector:** dueño o gerente de una empresa de cualquier rubro, con dos o tres personas o más, que ya responde consultas y cerró ventas este año. Quien parte de cero también entra, por el sitio.
**El problema, en sus palabras:** «Me llegan consultas, pero no sé cuántas terminan en venta ni dónde se cae el resto.»
**Línea sobre el titular:** Marketing y crecimiento con IA para empresas que ya venden. **H1 (dos tintas):** *Te llegan consultas.* Veamos dónde se cae el resto.
**Ruta de cuatro pasos:** revisión gratis de una página → conversación de 20 minutos → propuesta por escrito, por fases → implementación y acompañamiento mensual.
**Se promete:** método, entregables y plazos. **No se promete nunca:** una cantidad de consultas, ventas, citas o menciones en IA. El límite se dice una vez, en el FAQ.
**Una sola acción principal por ruta:** «Pedir la revisión de una página» hacia `/contacto/` (donde se dispara `generate_lead`). El chequeo de `/diagnostico/` baja a enlace secundario en la portada.

## 3 · Mapa de rutas (`spindlelab-astro/src/pages/v3/`)

| Ruta | Acción | Qué cambia |
|---|---|---|
| `/v3/` (home) | **Recomponer** | Las nueve secciones de la sección 4. Se sacan la cinta, el índice corto de cuatro piezas y «Cada pieza, con un dato medido». El hero cambia de acción. |
| Transversal: navegación, pie, `title`, `description`, JSON-LD, imagen al compartir, `llms.txt`, `sitemap.xml`, `layout-a.ts`, `v3-chequeo.js` | **Reescribir** | Navegación: Soluciones, Método, Nosotros, Trabajo, Blog, Contacto y botón «Pedir la revisión». Entidad y cargo de Ramón en los términos nuevos. |
| `/v3/servicios/` | Ajustar texto y orden | Cambia el claim («diseñamos y programamos sitios») por los cuatro bloques con precio del documento de textos. Precios idénticos a `origin/main`. |
| `/v3/servicios/<seis>/` | Ajustar texto | Barrido de términos y promesas (sección 6). Los planes, precios y plazos no cambian. |
| `/v3/metodo/` | **Reescribir** | Los cuatro pasos nuevos, con la plantilla de fases que ya existe. |
| `/v3/nosotros/`, `/v3/contacto/`, `/v3/diagnostico/` | Ajustar texto | Según el documento de textos, secciones 7, 8 y 9. |
| `/v3/trabajo/` | **Recortar** | Dos entradas: Combeau y Verifica y Cumple. |
| `/v3/trabajo/combeau/` | Conservar | Se revisa el cierre (sin «24 horas») y la frase de resultado que su fuente no sostiene. |
| `/v3/trabajo/{praxi,sesenta,ocelo,doceavo,tonela}/` | **Retirar del build** | Quedan en el historial de git. Sus medios sin uso salen de `public/v3/`. |
| `/v3/blog/` y 7 artículos | Marco y correcciones de veracidad | Marco nuevo; cuerpos solo donde afirman algo que no se sostiene (sección 6). |
| `/privacidad/`, 404 | Fuera de esta obra | No tienen versión v3. Se anota para el corte. |

## 4 · Orden de la home (nueve secciones)

1. **Portada** (se conserva el video y la sección): línea sobre el titular, H1 de dos tintas, subtítulo, botón «Pedir la revisión de una página», microcopy, enlace secundario «Chequear mi sitio ahora, sin registro».
2. **Dónde puede caerse una consulta** (nueva: H2 y un párrafo).
3. **Para empresas que ya venden** (nueva: dos párrafos).
4. **Cómo partimos y cómo seguimos** (nueva: cuatro filas con el molde de fases de `/metodo/`).
5. **Lo que podemos hacer por ti** (la sección de servicios, subida y reagrupada en los cuatro bloques con precio).
6. **Lo que puedes revisar antes de contratar** (reemplaza cinta, índice corto y pruebas: precios y método publicados, chequeo abierto, probado primero en lo nuestro, el caso de Combeau, Verifica y Cumple, y el enlace a `/trabajo/`).
7. **Quién está detrás** (la sección actual, con el texto del documento).
8. **Preguntas frecuentes** (nueva: cinco preguntas, con `FAQPage` en el JSON-LD).
9. **Cierre** (la sección de contacto actual, con botón a `/contacto/`).

## 5 · Activos reales

Se conservan: el hilo de oro de la portada, el logo El huso, el retrato de Ramón, los medios de Combeau y de Verifica y Cumple, las fuentes y los 21 chequeos. **No se agrega ningún activo generado ni de pago.** Se retiran del build los medios de Praxi y los cuatro conceptos, y la cinta (`public/v3/cinta/`), para no dejar peso sin uso. Cero cifras, logos, testimonios o casos que el documento de textos no autorice.

## 6 · Lo que NO se hace

1. **Rediseñar.** Ni paleta, ni tipografía, ni retícula, ni cursor, ni movimiento nuevos. Si la home pide un patrón que no existe, se arma con las filas existentes y se anota en la spec; un componente nuevo solo con motivo escrito.
2. **Tocar** `functions/`, `_headers`, `_redirects`, `consent-banner.js`, los nombres de los campos y los UTM del formulario, ni la lógica del chequeo. **Excepción pedida por el encargo:** la captura de UTM, que hoy vive en un componente que ninguna ruta usa (`NavV3.astro`) y se pasa a `Encabezado.astro` o a la plantilla.
3. **Cambiar precios, planes, plazos o nombres de servicio.** Diff 0 contra `origin/main`.
4. **Prometer lo que no existe:** monitoreo de menciones o de posiciones, share-of-voice, AI Overviews, compromiso de puntaje, «aumentar tu probabilidad de cita», «tu nombre ya esté ahí», integraciones CRM, automatizaciones, partners, NDA firmados, «más de cinco años en agencias», «es el mismo chequeo que le pasamos a cada sitio que construimos».
5. **Inventar prueba social** o nombrar a un prospecto. El único caso público es Combeau, dicho como caso de sitio web y no de crecimiento de ventas.
6. **Plazos de 24 horas.** El único plazo documentado fue de 31 horas: se dice «un día hábil».
7. **«En Chile» como relleno** de títulos o descripciones (Ramón lo descartó: suena a IA). Rayas largas o medias, Title Case, «¿Listo para…?», «sin compromiso» repetido.
8. **Agregar archivos pesados** al repositorio. Las capturas de revisión van al scratchpad; a `capturas/` solo un puñado de JPEG.
9. **Publicar, mergear, tocar `main`** ni la rama `claude/sitio-posicionamiento-nuevo`. Esta obra empuja su rama y avisa.
10. **Editar documentos compartidos** (plan, pipeline, estrategia, fichas): los escribe la troncal.

## 7 · Criterios de aceptación (verificables)

1. `npm run build` sin errores. Los guardianes del texto (`igualQue`, `contiene`) siguen activos y pasan.
2. `npm run verificar` sin hallazgos a 390, 768 y 1440 en las rutas tocadas.
3. **Home:** nueve secciones en el orden de la sección 4; el botón «Pedir la revisión de una página» se ve en la primera pantalla a 390 y a 1440 (también con el aviso de cookies abierto) y lleva a `/contacto/`; el chequeo es un enlace secundario; `FAQPage` en el JSON-LD y coincide con el FAQ visible.
4. **Lectura en frío:** tres lectores sin contexto leen la home construida y escriben qué hace SpindleLab, para quién y cuál es el primer paso, sin tropezar con un término sin explicar. Se mide en el sitio construido, no en el texto.
5. **Barrido de términos** sobre todo lo que se publica (texto visible, atributos, JSON-LD, `llms.txt`, `paginas-v3.json`, `interiores.mjs`, `layout-a.ts`, `v3-chequeo.js`, imagen al compartir): cero «mini-diagnóstico», «diagnóstico gratis», «24 horas», «partners», «motor», «más elegido», «agentes de IA» fuera de «Quién está detrás», «compromiso» de puntaje, «quincenal» de monitoreo y los demás de la sección 6.
6. **Precios** de las seis páginas de servicio y de la home idénticos a `origin/main`, con «desde» y «+ IVA».
7. **UTM:** una visita con `?utm_source=…&utm_medium=…&utm_campaign=…` a la home o a un servicio, que llega a `/contacto/` por clic o por el chequeo, deja los tres campos ocultos llenos (hoy llega vacío).
8. **Peso:** la home carga menos de 1,5 MB a 1440 en la primera carga y recorrida entera no pasa de 1,6 MB (con el video completo de la portada, 1.002 kB), y el árbol que se corta a `main` no suma archivos sin uso (`public/v3/` medido antes y después). [Aclarado el 26-oct al ver la medición de Lucía y de Diego: 1.382 kB la primera carga y 1.541 kB recorrida; el criterio original no decía si «carga» era la primera carga o la página entera, y se declara en el acta con las dos cifras.]
9. **Chequeo propio** (`chequear()` de `functions/api/chequeo.js` sobre el build local): la home saca lo mismo o más que el 83 del v3 del 16-oct.
10. **Detector anti-slop** (`estudio-web/antislop-web.md` y `refero-design/references/anti-ai-slop.md`) corrido entero por Javiera, en subagente limpio, máximo dos rondas.
11. **Cero** rayas largas o medias, Title Case, «¿Listo para…?» y «en Chile» de relleno en lo que ve el público.
12. Las 20 URL vivas del `sitemap.xml` tienen equivalente en el v3 (hoy: 20 de 20) y el sitemap nuevo suma `/trabajo/`.

## 8 · Entregables

Código en la rama con commit y push por fase · `texto/texto-obra.json` (Clara) y sus copias con huella · `spec-home.md` (Lucía: solo lo que cambia) · `desvios.md` · `acta-qa.md` firmada en contexto limpio · `lista-publicacion.md` reescrita y ensayada · capturas por sección fuera del repositorio · lista de decisiones abiertas con el valor usado · un calendario con fechas reales.

## 9 · Compuertas

- **Compuerta 1 (26-oct):** las cuatro decisiones de la sección 1. Sin respuesta; se avanza con los valores por defecto y se deja dicho.
- **Compuerta 2:** no corresponde. La dirección visual ya la eligió Ramón el 19-oct. Lo único que reabre algo aprobado es el hero (la acción principal deja de ser el chequeo, criterio 10 de E12): se lo muestro a Ramón con captura, antes de la QA.

## 10 · Historial de correcciones

| Fecha | Qué cambió | Por qué |
|---|---|---|
| 26-oct | Se construye y se mide bajo `/v3/`; **antes de la QA se convierte a raíz** (`herramientas/convertir-a-raiz.mjs`) y la QA audita el sitio ya en la raíz. | Lo que Javiera mide tiene que ser lo que se publica. El script queda ensayado y documentado en la lista de publicación. |
| 26-oct | Criterio 8 (peso) aclarado: primera carga y recorrida. | Ver el criterio. |
| 26-oct | Los seis rótulos mono de sección de la home (El problema, Método SpindleLab…) **no se pintan**. | El texto de Clara no les dio id y la spec dice que sin ellos el layout no cambia. Es una decisión de oficio de la orquestadora, no una regla del detector (que no los menciona): con ellos, la home tendría seis etiquetas mono más sobre los títulos. Si Ramón los quiere, es agregar seis ids y no se toca la plantilla. |
| 26-oct | Sale de la rama lo que ningún archivo vivo usa: `public/assets/img/d/`, `public/assets/img/obra/` y los medios del v2 (12 MB). | Peso del repositorio y de lo que se publica. Queda en el historial de git. |
