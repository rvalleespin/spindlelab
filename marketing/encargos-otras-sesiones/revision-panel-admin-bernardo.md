# Revisión — Panel de administración de Bernardo Combeau (Decap CMS)

**Fecha:** 2026-09-03 · **De:** Bruno (`persona-director-creativo`) · **Para:** Ramón
**Cliente:** Bernardo Combeau (fotógrafo, Santiago) · **A pedido de Ramón:** "entra al sitio de
administrador de bernardo, revisa y entrégame mejoras. opciones de modificación. mejoras en
estructura y diseño."

**Contraparte de este documento:** `marketing/encargos-otras-sesiones/revision-sitio-bernardo-combeau.md`
(3-sep-2026, sesión troncal) revisó el **sitio público**. Ese documento no tocó el panel — esta
es su contraparte para `/admin`, una superficie que nadie había revisado todavía.

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
