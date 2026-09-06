# Revisión — Panel de administración de Bernardo Combeau (Decap CMS)

**Fecha:** 2026-09-03 · **De:** Bruno (`persona-director-creativo`) · **Para:** Ramón
**Cliente:** Bernardo Combeau (fotógrafo, Santiago) · **A pedido de Ramón:** "entra al sitio de
administrador de bernardo, revisa y entrégame mejoras. opciones de modificación. mejoras en
estructura y diseño."

**Contraparte de este documento:** `marketing/encargos-otras-sesiones/revision-sitio-bernardo-combeau.md`
(3-sep-2026, sesión troncal) revisó el **sitio público**. Ese documento no tocó el panel — esta
es su contraparte para `/admin`, una superficie que nadie había revisado todavía.

> **Actualización 3-sep-2026 — ejecutado.** Ramón pidió invocar a Diego (`persona-disenador-web`)
> ya mismo para lo que no dependía de ninguna decisión de dirección, del bug de Estudio de este
> documento y de la Parte 1 de `revision-sitio-bernardo-combeau.md`. Como esta sesión venía de
> Bruno (marketing), no de la sesión dueña del repo, Diego trabajó según su propio protocolo de
> sesión ajena: rama nueva, no push a `main`. Todo quedó en
> `rvalleespin/bernardo-combeau` rama **`claude/correcciones-panel-y-sitio`** (commit `72c4220`,
> confirmada en remoto), pendiente de que Ramón la revise y mergee — nada se desplegó.
>
> Hecho: los 23 alt text reales (6 entradas), limpieza de los 6 bloques `publication: "."`, los
> dos slugs renombrados con redirect (`nombre-de-la-serie`→`actores`,
> `aquí-estoy-creando-algo-nuevo`→`la-caida`), año normalizado a raya en Retratos, hero con
> `loading="eager"`, JSON-LD Person+ProfessionalService en `Layout.astro` (sourced 100% de
> `contacto.json`/`estudio.json`, nada inventado), el `inputtedWidth` inválido (breakpoints
> ajustados a 828/1920), y el bug de este documento (`fotos[i].src` → `fotos[i]` en
> `EstudioPreview`). Verificado con build limpio y render real en Chromium headless, incluida la
> vista previa de Estudio en el panel antes/después del fix.
>
> **No incluido, sigue pendiente de dirección:** la Parte 2-3 de `revision-sitio-bernardo-combeau.md`
> (rediseño del sitio público).

> **Actualización 2 (3-sep-2026) — Direcciones A-D + fix de mobile, ejecutadas.** Iniciativa de
> Ramón: entregar esta optimización **sin cobro**, para que el panel deje de sentirse "primera
> versión". Diego hizo las 4 direcciones de la Parte 3 (capturas `07`-`10`) más el bug de mobile
> de la Parte 1 #3 (no estaba en el plan original, se sumó porque es la mejora de usabilidad más
> grande del lote y calza directo con el pedido). Mismo commit en
> `claude/correcciones-panel-y-sitio` (ahora `c81e66b`), sigue sin mergear.
>
> - **A** — chrome vestido: fuera el logo rosa de Decap, wordmark "Bernardo Combeau" en el login,
>   acento cálido (`#98433e`, muestreado de piel real en `beto3.jpg`, no inventado) en botones,
>   sidebar activa y pestaña activa del header.
> - **B** — separador visual entre "páginas" y "galerías" en la sidebar. Confirmado por
>   investigación (no solo supuesto) que Decap no soporta agrupación nativa de colecciones — se
>   hizo lo que sí es real sin fingir una feature que no existe.
> - **C** — "Modelo" (8 formularios sin preview y sin contenido) sale de la sidebar, comentada
>   (no borrada) para reactivarla en un minuto cuando haya algo que mostrar.
> - **D** — checkerboard de Medios reemplazado por el tono papel/stage del sitio.
> - **Bonus, Parte 1 #3** — el editor de una entrada no se adaptaba a celular (Decap trae
>   `min-width:800px` fijo en el layout de dos columnas). Se apila en una columna bajo 800px,
>   la barra superior envuelve sus botones en vez de cortarlos fuera de pantalla, y los toggles
>   de vista dividida (sin sentido ya apilado) se ocultan.
>
> Verificado con el panel corriendo local, desktop y mobile (390px), antes/después de cada
> cambio — sin regresión en la vista previa de Estudio del fix anterior.

> **Actualización 3 (3-sep-2026) — encuadre de fotos, ejecutado.** Ramón notó el hueco que
> quedaba tras el rediseño: subir una foto no dejaba elegir dónde cae el recorte cuadrado de la
> home/grillas, así que una foto mal encuadrada podía cortar cabezas sin que Bernardo pudiera
> evitarlo. Pidió el encuadre visual (arrastrar/tocar un punto), no un selector de posiciones,
> para la Portada. Mismo commit en `claude/correcciones-panel-y-sitio` (ahora `f9aba9e`).
>
> - **Portada** de cada Retrato/Proyecto: widget custom nuevo (`focuspoint`) — toca la foto
>   completa para marcar el punto, recuadro punteado en vivo muestra el recorte exacto. Costó
>   investigación real: Decap no documenta bien el contrato de sus widgets custom; se probó
>   contra el panel corriendo local antes de construir (`entry`+`getAsset` sí están disponibles
>   en el mount y son confiables; `onOpenMediaLibrary`+`mediaPaths` NO se pudo hacer disparar de
>   forma reproducible en este panel — el shim de widgets no dispara `componentDidUpdate`).
> - **Fotos de la galería** (`images[]`): selector de 5 posiciones (mismo patrón ya en Modelo →
>   Polaroids) en vez del encuadre visual — un focuspoint interactivo ahí necesitaría saber en
>   qué posición de la lista está cada foto, y Decap no expone eso de forma confiable a un
>   widget custom (probado con 3 mecanismos distintos, ninguno funcionó). Mismo resultado para
>   Bernardo (elige el encuadre, se aplica solo), interacción más simple para esa lista.
> - Se guarda como `"X% Y%"` — el mismo formato de `object-position` CSS — sin valor = centrado
>   (cero impacto en los ~15 registros existentes). Confirmado en el sitio real con un valor de
>   prueba (revertido antes de commitear).

> **Actualización 4 (3-sep-2026) — por qué el panel en vivo no mostraba nada de esto, y
> reconciliación con lo que avanzó en paralelo.** Ramón mandó una captura de Retratos → Actores →
> Catherine Mazoyer preguntando por qué esa foto no tenía sección de "editar foto". Motivo
> confirmado, no supuesto: esa captura es del panel **en producción** (`main`), y las tres
> actualizaciones anteriores llevan desde el 3-sep en `claude/correcciones-panel-y-sitio` **sin
> mergear** — ni el encuadre ni el fix del damero (Dirección D) estaban en `main` todavía, así
> que la captura mostraba exactamente lo esperable, no un hueco nuevo.
>
> Mientras esta rama esperaba revisión, `main` avanzó bastante en paralelo (otra sesión, y/o
> Ramón trabajando directo con Bernardo probando el sitio en vivo):
> - Una rama distinta (`claude/revision-parte-1-correcciones`, fusión a su vez de dos sesiones en
>   paralelo) rehizo la misma Parte 1 de `revision-sitio-bernardo-combeau.md` y ya está en `main`.
> - Otra rama (`claude/modelo-publicar-y-ajustes`, luego `claude/zoom-y-espaciado`) agregó su
>   **propio** mecanismo de encuadre — un selector "Encuadre dentro del cuadrado" más un campo
>   "Zoom de la miniatura" — pero solo para la sección **Modelo** (Book/Selected Work/Polaroids),
>   una colección aparte (`src/data/modelo/*.json`) de Retratos/Proyectos. Ya está en `main`
>   también.
>
> Ninguno de los dos mecanismos de encuadre pisa al otro (colecciones distintas, bloques de
> config distintos), pero el contenido de la Parte 1 sí se hizo dos veces por separado. Se
> fusionó `main` dentro de `claude/correcciones-panel-y-sitio` y se reconcilió archivo por
> archivo (mismo criterio que ya usó la reconciliación de las dos sesiones paralelas en `main`):
> el contenido (alt text, `publication`, el rename a `la-caida`) se adoptó de `main` — ya había
> pasado por una ronda extra de reconciliación entre dos sesiones, y ninguna versión inventaba
> nada que la otra no tuviera —; el JSON-LD de `Layout.astro` también se adoptó de `main` (más
> completo: dirección parseada una sola vez en vez de hardcodeada, y un prop `jsonLd` reusable
> por página que esta rama no tenía); el fix de ancho de imagen (`width` 828/1920) coincidía en
> ambas ramas; y el `style={--focus}` de esta rama se reaplicó sobre esa base. `public/admin/index.html`
> fusionó sin conflicto: el CSS de Direcciones A-D y el widget `focuspoint` viven en el bloque de
> Retratos/Proyectos, el encuadre/zoom de `main` vive en el bloque de Modelo. Verificado con
> `astro build` limpio y con el panel corriendo local: la ficha de Catherine Mazoyer muestra el
> widget de encuadre completo, sin damero de fondo. Rama actualizada y empujada, ahora en
> `c1be4ff`, todavía sin mergear a `main` — falta la confirmación de Ramón para ese paso.
>
> **Queda abierto, no decidido:** Retratos/Proyectos usan encuadre visual (arrastrar un punto,
> elegido por Ramón en la Actualización 3) y Modelo usa un selector de posiciones + zoom aparte.
> Ambos resuelven el mismo problema con distinta interacción porque se construyeron por
> separado. No se unificó de oficio — es una decisión de Ramón, no algo para decidir en silencio.

> **Actualización 5 (3-sep-2026) — regresión real encontrada al probar la rama: "Modelo" había
> desaparecido de la sidebar.** Ramón probó el link de preview (`/admin` de
> `claude/correcciones-panel-y-sitio`) y no le aparecía Modelo. No era percepción — era un bug
> real, causado por esta misma rama. La Dirección C (Actualización 2) sacó "Modelo" de la sidebar
> el 3-sep porque en ese momento la sección estaba sin contenido real y sin publicar (`nav.json`
> traía `"modelo": ""`) — condición explícitamente reversible, documentada como tal. Esa condición
> cambió mientras la rama esperaba revisión: `main` publicó Modelo y se ha seguido desarrollando
> activamente ahí (encuadre, zoom, restauración de Motion, grilla de comerciales — ver
> Actualización 4). Mergear la rama tal como estaba habría **des**publicado Modelo del panel de
> Bernardo, escondiéndole una sección que él mismo (o quien la esté cargando) sigue usando.
>
> Corregido: la colección "modelo" vuelve a la sidebar, y el separador de la Dirección B (que
> dependía por CSS de la posición fija de las colecciones) se recalculó para el nuevo orden.
> Verificado con el panel corriendo local — captura de la sidebar con Modelo visible y el
> separador antes de Retratos. Rama en `ab22454`, sigue sin mergear.
>
> **Sigue sin resolver, aparte de esto:** "Modelo" sigue siendo la única colección sin vista
> previa en vivo (`CMS.registerPreviewTemplate`) — el gap ya señalado en el diagnóstico original
> (Parte 2). No se construyó de oficio; es trabajo aparte si Ramón lo pide.

> **Actualización 6 (3-sep-2026) — "Publicación externa" obligaba a completar dos campos que su
> propia etiqueta dice que son opcionales.** Ramón mandó una captura: "Nombre del medio" y "URL"
> en rojo con "es obligatorio", en una sección marcada "(OPCIONAL)" cuyo propio hint dice
> explícitamente que se dejen vacíos si no hay link todavía. Causa: en Decap, `required: false`
> en el campo objeto (`publication`) exime al objeto completo, pero no se propaga a sus campos
> hijos — "name" y "url" no tenían su propio `required: false`, así que Decap los seguía
> validando como obligatorios, contradiciendo la etiqueta y el hint. Mismo bug en Retratos y
> Proyectos (estructura idéntica). Corregido en los 2 campos × 2 colecciones. Verificado con el
> panel corriendo local: ambas etiquetas ahora muestran "(OPCIONAL)" (mismo patrón que el resto
> del panel) y no queda ningún error en pantalla con la sección vacía. Rama en `2cd6ec5`.

> **Actualización 7 (3-sep-2026) — encuadre convertido a botón "Editar foto", más Zoom.**
> Probando el link de preview, Ramón vio el encuadre funcionando pero pidió que el control fuera
> un botón junto a "Elige una imagen diferente" en vez de un panel siempre abierto, y agregar
> ajuste de tamaño. Se rediseñó: la Portada de Retratos/Proyectos ahora muestra un botón "Editar
> foto (encuadre y zoom)" con el mismo estilo que los botones nativos de Decap — al tocarlo se
> abre la herramienta de arrastrar el punto, con un botón para volver a cerrarla. Se agregó
> "Zoom de la miniatura" (portada y galería, ambas colecciones) reusando el mismo campo/mecanismo
> que ya vive en Modelo (`zoomField()`, compartido en el archivo) — esto además acerca el
> comportamiento de Retratos/Proyectos al de Modelo, reduciendo la diferencia notada en la
> Actualización 4. Verificado de punta a punta: build limpio, botón colapsa/expande contra el
> panel local, y el efecto de zoom confirmado renderizando `/retratos` con un valor de prueba
> (revertido antes de commitear). Rama en `3cf06cb`.
>
> **Actualización 8 (3-sep-2026) — "sentido de la foto" = volteo horizontal, confirmado y
> hecho.** Ramón respondió: quería un botón para voltear la miniatura en espejo (para cuando la
> persona queda mirando hacia afuera de la grilla). Agregado como toggle "Voltear en espejo
> (horizontal)" junto a Encuadre/Zoom (portada y galería, ambas colecciones) — mismo criterio:
> solo afecta la miniatura, no la foto original ni la del visor. CSS: `scaleX(-1)` sumado al
> mismo transform de Zoom. Verificado de punta a punta igual que Zoom (valor de prueba,
> renderizado real, revertido antes de commitear). Rama en `f005652`. Con esto, Retratos/
> Proyectos tienen Encuadre + Zoom + Volteo — más capacidad de ajuste que Modelo, que solo tiene
> Encuadre + Zoom.
>
> **Actualización 9 (3-sep-2026) — MERGEADO A MAIN, en producción.** Ramón confirmó
> explícitamente "mergea a main". Antes de mergear: última resincronización con `main`
> (`2aa508b` en la rama — respeta el borrado de "Actores" que Ramón hizo directo en producción,
> más el trabajo ajeno de Motion/Commercials que avanzó mientras tanto), build verificado.
> Mergeado con `git merge --no-ff` (commit `ba33b5c`) y empujado directo a `main` — este repo no
> usa PRs, todos los merges anteriores de otras sesiones se hicieron así. Deploy de producción
> disparado automáticamente por Vercel.
>
> **Nota de reconciliación:** al mergear se perdieron 3 bloques `publication: {name: ".", url:
> "https://bernardocombeau.cl"}` que habían reaparecido en `main` (Actores — ya borrada —,
> Corporativos, La séptima, Orejas de conejo) — el mismo patrón placeholder que la Parte 1
> original ya había limpiado. Muy probablemente Ramón los generó probando el bug de "Publicación
> externa" en producción (antes de que el fix llegara ahí) para poder guardar pese al error falso
> de "obligatorio". Contenido inerte de cualquier forma — el propio `hasRealPublication` del
> sitio ya los trataba como no-publicados —, así que se dejó que ganara la versión limpia de la
> rama en vez de reintroducirlos. Avisado a Ramón por transparencia, no por indecisión.
>
> **Aparte:** existe una rama `claude/merge-panel-correcciones` (de otra sesión o del propio
> Ramón) que había intentado el mismo merge minutos antes — nunca llegó a `main`, quedó
> reemplazada por este merge directo. No requiere limpieza urgente.

> **Actualización 10 (3-sep-2026) — Ramón pidió probar en el sitio real antes de avisarle a
> Bernardo; encontró la vista previa de Modelo → Motion/Commercials rota.** Probé
> `bernardocombeau.cl` directo por HTTP (no pude sacarle captura visual — el navegador headless
> de este entorno no llega a dominios externos, mismo límite documentado antes; sí pude leer el
> HTML real servido): home, Retratos, Proyectos, Modelo, Corporativos, Retratos masculinos, todo
> 200; `/retratos/actores` da 404 y ya no está en el sitemap (el borrado de Ramón se respetó);
> los 4 fixes del día (Modelo en la sidebar, Publicación externa, Editar foto, Voltear en
> espejo) están en el HTML servido. Antes de avisarle a Bernardo, Ramón mandó una captura:
> Modelo → "5. Motion / Commercials" mostraba la vista previa genérica de Decap (texto plano,
> fondo negro) — "se ve extraña".
>
> Causa confirmada, no nueva: Modelo entero nunca tuvo vista previa registrada
> (`CMS.registerPreviewTemplate`) — gap señalado desde el diagnóstico original (Parte 2) y
> repetido en cada actualización de este documento. Sin plantilla registrada, Decap cae a su
> propio dump de campos.
>
> Agregada una vista previa real solo para "Motion / Commercials" (el archivo que Ramón estaba
> mirando) — reconstruye la grilla de 3 columnas del sitio real (VideoGrid.astro): título en
> serif itálica, miniatura de YouTube por video (mismo mecanismo que `gridDeVideos()` en
> `src/lib/modelo.js`, reescrito porque el panel corre en el navegador sin acceso a ese módulo),
> nombre debajo. El resto de Modelo (Portada, Identity, Selected Work, Polaroids, Details,
> Booking) sigue sin vista previa — mismo gap, sin tocar, trabajo aparte si se pide. Verificado
> contra el DOM real del iframe de vista previa (no solo por pantalla): las 10 tarjetas de
> Motion arman el `<img>` correcto con el ID de YouTube extraído de cada URL real. Mergeado
> directo a `main` (commit `81196de`), en producción — confirmado en el HTML real servido desde
> `bernardocombeau.cl`.

> **Actualización 11 (4-sep-2026) — la vista previa de Motion/Commercials seguía rota para
> Ramón; causa real: mi propia forma de probarlo en la ronda anterior, no el fix.** Ramón avisó
> dos veces que seguía viéndose mal, la segunda ya después de un hard refresh — eso descartaba
> caché de navegador. Primero confirmé que no era caché de borde de Vercel ni deploy atrasado: el
> HTML servido en `bernardocombeau.cl` tenía byte a byte el fix de la Actualización 10. El
> problema estaba en cómo yo mismo había verificado ese fix la vez anterior: para navegar rápido
> entre entradas usé `location.hash = ...` por JavaScript directo en vez de clics reales o una
> carga de página nueva. Parchando temporalmente una copia local de `decap-cms.js` (solo para
> diagnóstico, nunca tocó el repo) para loguear qué props le llegan de verdad al componente de
> vista previa, quedó confirmado: saltar el hash así deja a Decap con la entrada vieja y la
> colección nueva mezcladas (props desincronizados) — un artefacto de mi método de prueba, no un
> bug del sitio. Repetí la prueba con navegación real (clic en la sidebar hasta Motion/Commercials,
> y por separado una carga de página nueva con el hash ya puesto en la URL, que es exactamente lo
> que hace un hard refresh) y ahí sí: la vista previa arma sus 20 tarjetas (10 Motion + 10
> Commercials) con los títulos reales. Las miniaturas de YouTube no se ven en mis capturas locales
> porque el Chromium headless de este entorno no llega a `img.youtube.com` (mismo límite de
> siempre) — en un navegador real sí cargan.
>
> De todos modos, mientras investigaba until esto, encontré una duda real (documentada en el
> propio código de Decap, no una sospecha mía): para colecciones de varios archivos como "Modelo",
> no hay ejemplo previo en este repo de si `registerPreviewTemplate` debe usar el nombre del
> archivo (`"modelo_motion"`) o el de la colección (`"modelo"`) — la documentación oficial y el
> código fuente de Decap dicen que es el del archivo, y así estaba desde la Actualización 10, pero
> para no apostar a una sola lectura, ahora el mismo componente (renombrado `MotionPreview` →
> `ModeloPreview`) queda registrado bajo los dos nombres. De regalo: el resto de Modelo sin vista
> previa propia (Portada, Identity, Selected Work, Polaroids, Details, Booking) ahora muestra un
> aviso claro ("todavía no tiene vista previa en vivo") en vez del dump genérico de Decap — mismo
> gap de siempre, pero ya no confunde.
>
> Mergeado directo a `main` (commit `b64f8d2`), confirmado en producción vía curl a
> `bernardocombeau.cl/admin`. Con todo, no tengo forma de reproducir exactamente el navegador/sesión
> de Ramón, así que aunque esta ronda de verificación es mucho más sólida que la anterior (navegación
> real, no el atajo con hash que resultó con fallas), le pedí que confirme de nuevo — reforzando
> pedirle esta vez un hard refresh de verdad (Ctrl+Shift+R / Cmd+Shift+R) o probar en una ventana
> privada, para descartar cualquier resto de caché de su lado.
>
> **Aparte, sin resolver todavía:** Ramón aclaró que "Motion son fotos y Commercials son los
> videos de YouTube" — contradice cómo está construida hoy la sección (ambas listas son de links
> de YouTube, ver `motion.json` y `gridDeVideos()` en `src/lib/modelo.js`), y ese código no es mío,
> lo construyó otra sesión en paralelo. No lo toqué todavía porque implica un cambio de estructura
> (Motion pasaría de lista de videos a galería de fotos) que vale la pena confirmar con Ramón antes
> de tocar trabajo reciente de otra sesión.

> **Actualización 12 (4-sep-2026) — Ramón confirmó el alcance: Motion como galería de fotos,
> Commercials queda igual.** Ejecutado. Sin pérdida de datos: los 10 "videos" que estaban bajo
> Motion ya vivían idénticos bajo Commercials (`comerciales`), así que borrar la lista vieja de
> Motion no pierde nada real — solo el duplicado mal etiquetado.
>
> - `motion.json`: `videos` (links de YouTube) → `fotos` (vacío, listo para que Bernardo suba
>   fotos reales — nada inventado).
> - `src/lib/modelo.js`: `motionFotos` reemplaza `motionVideos`; de paso, `conVisor()` y
>   `encuadreStyle()` (el visor de tamaño completo y el encuadre/zoom) se mudaron acá desde
>   `index.astro` para poder compartirlos con la nueva página de Motion.
> - Nuevo componente `components/modelo/Visor.astro`: el diálogo de tamaño completo, que antes
>   vivía solo en la portada, se extrajo a un componente compartido — ahora también lo usa
>   Motion. Riesgo real acá: tocar una página que ya estaba en producción y funcionando (Book,
>   Selected Work, Polaroids). Verificado explícitamente que no hubo regresión: las tres siguen
>   abriendo el visor igual que antes.
> - `motion.astro`: grilla de fotos de 3 columnas (mismo ritmo visual que Commercials, su página
>   hermana) en vez de la grilla de videos.
> - Panel: el campo "Motion" pasa de lista de links de YouTube a lista de fotos, mismo patrón
>   que Galería/Polaroids (imagen + alt + encuadre + zoom). La vista previa (`ModeloPreview`)
>   arma ambas ramas por separado — fotos para Motion, videos para Commercials, cada una con su
>   propio criterio de "vacío todavía".
>
> Verificado en `local_backend` con 3 fotos de prueba reales (nunca commiteadas): la grilla en
> `/modelo/motion`, el visor completo (abrir, cerrar, flecha siguiente), el nav y el botón de la
> franja de Motion apareciendo/desapareciendo solos según haya contenido, la vista previa del
> panel mostrando la grilla real, y un build de Astro limpio de punta a punta. Mergeado directo a
> `main` (commit `b4a8939` — sobre `b64f8d2`, reconciliado con dos commits que Bernardo mismo
> subió mientras tanto desde el panel real: subió una foto nueva a Portada y otra a Polaroids,
> señal independiente de que la Actualización 11 sí le resolvió el problema). En producción.

> **Actualización 13 (4-sep-2026) — Ramón mandó capturas: Galería, Identity y Selected Work
> mostraban la vista previa "desconfigurada"** (una foto gigante sin recortar; en Identity,
> texto crudo sobre fondo negro). Causa raíz encontrada leyendo el propio código fuente de Decap:
> para una colección de varios archivos, `registerPreviewTemplate()` usa el nombre del ARCHIVO
> individual como clave — nunca el de la colección completa. El registro a nivel de colección que
> dejé en la Actualización 11 "por si acaso" nunca se consultaba, para ninguna ficha. Solo
> `modelo_motion` tenía su propio registro; las otras 7 fichas (Portada, Galería, Identity,
> Selected Work, Polaroids, Details, Booking) caían directo en el dump genérico de Decap, aunque
> el componente ya sabía mostrarles un aviso — nunca llegaba a ejecutarse para ellas.
>
> De paso apareció un segundo bug real, que este arreglo habría introducido si no lo agarraba:
> la forma en que el componente decidía "¿esta ficha es Motion?" miraba si el entry tenía un
> campo llamado `fotos` — pero Galería *también* tiene un campo `fotos` (su lista de 12 fotos),
> así que las hubiera confundido. Ahora decide por el slug real de la entrada
> (`entry.get("slug") === "modelo_motion"`), confirmado distinto para cada una de las 8 fichas
> antes de confiar en él.
>
> Verificación con una complicación propia: probar las 8 fichas reutilizando la misma pestaña
> con recargas sucesivas rápidas daba **falsos negativos incluso en Motion** — un artefacto del
> entorno de prueba local (`decap-server`), no del código real. Se detectó porque un chequeo
> aislado del slug (proceso nuevo por ficha, con su propio login) sí daba el valor correcto en
> las 8; solo repitiendo ESE mismo patrón para ver la vista previa completa se pudo confirmar de
> verdad: Galería, Identity, Selected Work y Portada muestran el aviso sobre fondo blanco;
> Motion sigue mostrando su grilla real de fotos + los 10 videos de Commercials.
>
> Mergeado directo a `main` (commit `61027df`), confirmado en producción.

---

**Estado a 4-sep-2026:** las Partes 1-3 de este documento (bug de Estudio, Direcciones A-D, fix de
mobile), el encuadre de fotos con su rediseño a botón + Zoom + Volteo, la reconciliación con el
trabajo que avanzó en paralelo en `main`, la corrección de la sidebar (Modelo), el fix de
"Publicación externa", la vista previa real de Modelo → Motion/Commercials (Actualización 11), el
cambio de Motion a galería de fotos (Actualización 12) y el arreglo de la vista previa del resto
de Modelo — Galería, Identity, Selected Work, Portada, Polaroids, Details, Booking, cada una con
su propio registro en vez de uno a nivel de colección que nunca se usaba (Actualización 13) —
están **mergeadas a `main` y en producción** (último commit `61027df`). Bernardo ya está usando
el panel de verdad — dos commits propios (`bern.combeau@gmail.com`) subieron una foto nueva a
Portada y otra a Polaroids durante esta ronda, señal independiente de que el panel funciona para
él. Ninguna de las 7 fichas de Modelo sin vista previa propia cae ya en el dump genérico de
Decap — todas muestran un aviso claro sobre fondo blanco. Pendiente: la Parte 2-3 de
`revision-sitio-bernardo-combeau.md` (rediseño del sitio público) — todo lo demás de ambos
documentos ya se ejecutó y está en producción.

---

## Cómo se hizo esta revisión, y su límite

No hay credenciales de GitHub OAuth de Bernardo ni de Ramón disponibles en esta sesión, así que
no se probó el login real. En vez de quedarme en el código (como hizo la revisión del sitio
público), **entré al panel de verdad**: cloné `rvalleespin/bernardo-combeau` (commit `0c32d879`,
solo lectura), y lo corrí localmente con Decap en modo `local_backend` (proxy `decap-server`) —
el mecanismo que el propio Decap ofrece para desarrollar sin pasar por GitHub. El navegador
headless de esta sesión cloud tampoco llega a `unpkg.com` (mismo límite de proxy que ya documentó
la revisión del sitio público), así que serví una copia local de `decap-cms.js` solo para esta
prueba. **Nada de esto se subió al repo de Bernardo** (acceso de solo lectura; los dos archivos
que edité localmente para la prueba quedaron revertidos al terminar — `git status` limpio).

Con eso navegué **con datos reales** del repo: las 8 colecciones, formularios, vistas previas en
vivo, la biblioteca de medios (130+ fotos reales), y una pasada completa en viewport de celular
(390×844, clase iPhone). Until aquí, todo lo de abajo es lo que **vi en pantalla**, no una lectura
de código a ciegas — la regla de la casa ("no entregar sin mirar el render") se cumplió. Las
capturas están en `revision-panel-admin-bernardo-capturas/` junto a este documento.

**Un hallazgo que descarté explícitamente, para que quede registrado que se verificó:** en un
primer intento, la colección "Servicios" pareció mostrar "0 servicios". No lo es — es una carrera
de tiempos de mi entorno de prueba local (el proxy tardó 10-15s en responder esa entrada). Con más
espera cargó perfecto: 4 servicios, vista previa idéntica al sitio real (captura `04`). Lo dejo
anotado en vez de omitido.

---

## PARTE 1 — Corrección (esto no es gusto, está roto o falta)

Igual que en la revisión del sitio público, esto va primero porque no es una preferencia estética.

### 1. Bug confirmado: la vista previa de "Estudio" nunca muestra fotos, aunque existan

**Confirmado por código, dos veces cruzado — no depende de una captura ambigua.** El campo `fotos`
de Estudio está declarado en el config con `field:` (singular), que en Decap significa "lista de
valores simples": por eso `estudio.json` guarda `fotos` como un arreglo plano de strings
(`["/uploads/estudio1.jpg", ...]`) — y así lo consume correctamente el sitio real
(`estudio.astro:10`, `estudio.fotos.filter(Boolean)`, tratando cada ítem como string). Pero la
vista previa custom del panel (`EstudioPreview`, dentro de `public/admin/index.html`) hace
`fotos[i].src` — como si cada ítem fuera un objeto — así que `.src` siempre es `undefined` y las 4
casillas de foto muestran el placeholder "[ sin foto ]" pase lo que pase.

- **Efecto para Bernardo:** si mañana sube sus 4 fotos reales de estudio, la vista previa del
  panel le va a seguir mostrando casillas vacías — un falso negativo que puede hacerle pensar que
  la subida falló, cuando el sitio real sí las mostraría bien.
- **Archivo/línea para Diego:** `public/admin/index.html`, dentro de `EstudioPreview.render`, el
  `slots = [0,1,2,3].map(...)` — cambiar `fotos[i].src` por `fotos[i]`. Un fix de una línea.
- No lo toco yo (no escribo código de cliente) — queda anotado con la causa exacta para que Diego
  no tenga que re-diagnosticarlo.

### 2. Cero identidad de Bernardo en el chrome del panel

La pantalla de login — lo primero que ve cada vez que entra a administrar **su propio sitio** — es
el logo rosa/magenta genérico de Decap sobre gris, sin ningún gesto de su marca (captura `01`). Lo
mismo aplica al resto del "chrome" (botones, sidebar, biblioteca de medios): es Decap de fábrica.
La única parte que sí respira su identidad es el panel de **vista previa** (mitad derecha al
editar), que reutiliza el CSS real del sitio — y esa parte está muy bien hecha. El contraste hace
que el resto se sienta más genérico todavía, no menos.

### 3. El editor de una entrada no funciona en celular

En un viewport de teléfono estándar (390px, clase iPhone 12-14) la vista dividida
editor+vista-previa **no colapsa a una columna**: ambos paneles se quedan lado a lado, cada uno
cortado, obligando a scroll horizontal, y la barra superior ("Escribiendo en la colección
Retratos...") se parte en 3 líneas apretadas (captura `06`). Un fotógrafo es exactamente el perfil
que va a querer corregir un pie de foto o revisar contenido desde el celular entre sesiones —
hoy eso no es usable. (El dashboard y las listas de colecciones sí se adaptan bien a celular —
el problema es específico de la vista de edición con preview dividido.)

### 4. Fondo de transparencia en cada foto de la biblioteca de medios

Las ~130 fotos reales de Bernardo se muestran todas con un patrón de cuadros grises tipo
"transparencia" detrás (captura `05`) — es el estilo por defecto de Decap para las miniaturas,
sin relación con el contenido real (son JPG opacos, no PNG con alfa). Es la pantalla que Bernardo
más va a usar (su propio archivo fotográfico) y hoy parece herramienta técnica sin terminar en
vez de un gestor de fotos pulido.

**Criterio de término de la Parte 1** (mismo que el sitio público): confirmado contra el código o
la pantalla real, no asumido.

---

## PARTE 2 — Por qué se siente "de fábrica" (diagnóstico)

- **El chrome es 100% Decap sin vestir**, salvo el panel de vista previa. Paleta magenta de marca
  propia de Decap, tipografía default, sin ningún acento del papel/tinta de Bernardo en botones,
  inputs, ni pantalla de login.
- **La sidebar mezcla 3 tipos de cosas sin distinguirlas visualmente:** Home/Sobre mí/Estudio/
  Servicios/Contacto son "páginas únicas" (un formulario, un archivo); Retratos/Proyectos son
  "colecciones" (múltiples entradas, se pueden crear nuevas); Modelo es una sección **todavía sin
  publicar** (8 formularios). Las 8 aparecen en una sola lista plana (captura `02`) — Bernardo, que
  no es técnico, no tiene ninguna pista visual de cuál es cuál.
- **Modelo no tiene vista previa registrada** (a diferencia de las otras 7 colecciones) — sus 8
  formularios muestran panel de vista previa vacío, y además hoy están sin contenido real
  (`nav.json` trae `"modelo": ""` a propósito, para que la página siga oculta del sitio). El
  efecto compuesto: 8 formularios en blanco, sin preview, sin dato — cero pistas de qué se está
  construyendo si alguien entra ahí sin contexto.

---

## PARTE 3 — Movimientos propuestos, con opciones y mi recomendación

Como siempre: no es una sola opción tibia.

### Dirección A — Vestir el chrome (bajo esfuerzo, alto impacto de percepción)
Decap permite inyectar CSS custom sobre su propio chrome (ya se usa para el panel de vista previa).
- **A1:** reemplazar el acento magenta de Decap por el tono cálido que la revisión del sitio
  público propuso como "punto de tensión" de Bernardo (extraído de piel en sus propios retratos) —
  así panel y sitio hablan el mismo idioma visual.
- **A2:** agregar el wordmark de Bernardo ("Bernardo Combeau", la misma tipografía del sitio)
  arriba del botón "Iniciar sesión", y aplicar la paleta papel/tinta al fondo en vez del gris
  default.
- **Mi recomendación: hacer A1+A2.** Es la mejora más barata del documento (CSS, sin tocar lógica)
  y la que más cambia la primera impresión cada vez que Bernardo entra a *su* panel.

### Dirección B — Jerarquía visual en la sidebar
- **B1:** si la versión de Decap instalada soporta agrupación/anidado de colecciones, separar
  visualmente "Páginas" / "Galerías" / "En construcción" con un encabezado o separador.
- **B2 (sin depender de una feature nueva):** nada elegante, pero inmediato — no lo recomiendo
  salvo que B1 no sea viable, porque un hack visual feo no vale la pena para esto.
- **Mi recomendación:** que Diego confirme si B1 es viable en la versión actual (3.15) antes de
  decidir; si no lo es, esperar en vez de forzar B2.

### Dirección C — Decidir el destino de "Modelo" antes de pulirlo
- **C1:** si la sección sigue en pausa, ocultarla de la sidebar (Decap lo permite) hasta que haya
  contenido real — mejor una sidebar de 7 ítems que funcionan que 8 con uno en blanco.
- **C2:** si se va a activar pronto, darle su vista previa (mismo patrón que las otras 7, ya
  probado y funcionando) antes de pedirle a Bernardo que la llene sin ver resultado.
- **Mi recomendación: C1 ahora** (reversible, una línea de config) **y C2 en el momento en que se
  decida activarla** — no antes, para no invertir en preview de algo que puede cambiar de forma.

### Dirección D — Biblioteca de medios
- **D1:** cambiar el fondo "checkerboard" de las miniaturas por un color sólido del sistema del
  sitio (el tono `--stage`) — CSS, no rompe nada.
- **D2 (a mediano plazo, cuando el volumen lo justifique):** Decap no tiene carpetas nativas en
  medios; con 130+ fotos y creciendo, vale la pena una convención de nombres/prefijos más
  consistente (hoy ya hay un patrón parcial: `bernardo-portafolio-NN-...`,
  `modelo-galeria-elite-NN`) para que la búsqueda por texto compense la falta de carpetas.
- **Mi recomendación:** D1 ya (barato); D2 cuando el archivo crezca lo suficiente para que doler
  — hoy no es todavía el cuello de botella.

---

## PARTE 4 — Lo que NO se toca

- **La arquitectura de fondo** (Decap + GitHub OAuth + JSON/Markdown en el repo) — sólida, ya
  validada de punta a punta en julio. No hay razón para migrar de CMS.
- **El patrón de vista previa custom** (reutilizar el CSS real del sitio en vez del preview
  genérico de Decap) — es exactamente el criterio correcto, y funciona muy bien donde está
  implementado (Home, Sobre mí, Estudio*, Servicios, Contacto, Retratos, Proyectos). Solo hay que
  arreglar el bug puntual de Estudio (#1) y extender el mismo patrón a Modelo si se activa (C2) —
  no rehacerlo.
- **Los hints en español, tono cercano y no-técnico, límite de 10MB por archivo, traducción
  manual del locale completo de Decap** — trabajo fino ya hecho, pensado específicamente para que
  Bernardo (no-técnico) no se pierda. No reinventar.

---

## Alcance y siguiente paso

Este documento es dirección y diagnóstico, no implementación — no escribo código en el repo de
un cliente (ese es el rol de Diego, `persona-disenador-web`). Lo que sigue:

1. **Ramón elige** entre las opciones de la Parte 3 (o pide otra dirección).
2. **Diego ejecuta** — el bug de Estudio (#1) es la única corrección que no depende de ninguna
   decisión de dirección; puede salir ya.
3. Nada de esto toca el sitio público — `revision-sitio-bernardo-combeau.md` sigue vigente para
   esa superficie, y sus dos partes (corrección / rediseño) tienen su propia nota comercial ahí
   (Fases 1 y 5 por cobrar antes de abrir esa conversación). Esta revisión del panel es una
   superficie nueva, sin nota comercial propia todavía — si el panel entra en alcance de cobro
   adicional o queda dentro del Plan Esencial ya contratado, esa decisión es de Ramón, no mía.
