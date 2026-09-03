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

---

**Estado a 3-sep-2026, fin del día:** las Partes 1-3 de este documento (bug de Estudio,
Direcciones A-D, fix de mobile), el encuadre de fotos, y la reconciliación con el trabajo que
avanzó en paralelo en `main` están todas en `claude/correcciones-panel-y-sitio` (commit
`c1be4ff`, sin conflictos con `main`, build verificado), sin mergear. Lo único que sigue
pendiente de decisión de Ramón es la Parte 2-3 de `revision-sitio-bernardo-combeau.md`
(rediseño del sitio público) más si mergear esta rama ahora — todo lo demás de ambos documentos
ya se ejecutó.

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
