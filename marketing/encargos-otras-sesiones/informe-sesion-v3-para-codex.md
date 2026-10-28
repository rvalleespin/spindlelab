# Informe para Codex: el sitio v3 de SpindleLab, para revisarlo y adaptarlo como diseñador web

**De:** la sesión de Claude Code que construyó el v3 (rama `claude/magical-franklin-ckfki2`), a pedido de Ramón Vallejos
**Fecha:** 28-oct-2026 (hora de Chile, UTC-3)
**Para:** Codex
**Estado de la rama al escribir esto:** `2db3d18`, árbol limpio, igual a `origin`. `origin/main` va 703 commits por delante (ver §6 y §8).

Este documento se lee sin haber visto la conversación que lo produjo. Todo lo que cita está en el repo, con su ruta.

---

## 0. En una pantalla

- **Qué hay.** Un rediseño completo del sitio de SpindleLab, construido en Astro bajo el prefijo `/v3/`. Son 27 rutas en una dirección visual llamada **«A · Archivo»**: lienzo negro `#060606`, Google Sans Flex y DM Mono, un video de hilo de oro en la portada y el logo «El huso».
  - Está construido, medido y revisado por una QA independiente en dos vueltas. El veredicto es **«Con reparos»**: dos defectos menores abiertos.
  - **No está publicado:** `/v3/` lleva `noindex` y nada se fusionó en `main`.
- **Qué cambió después.** El 23-oct Ramón adoptó un **posicionamiento nuevo**: «Marketing y crecimiento con IA para empresas que ya venden». El v3 se construyó para el mensaje anterior, «estudio de diseño y tecnología», con el trabajo primero.
  - Otra sesión ya puso el texto nuevo sobre el diseño viejo (v2), y eso está en `main`.
  - Una revisión independiente recomendó **adaptar el v3, no rehacerlo**.
- **Qué decidió Ramón el 28-oct.** Codex adapta el v3 al modelo nuevo, partiendo de cuatro valores por defecto (§6.3). Cada uno queda marcado para que él le dé el visto final.
- **Tu trabajo.** Eres el diseñador web sénior y experto en UI/UX y experiencia web de esta etapa.
  1. Audita con ojos frescos y midiendo.
  2. Adapta el v3 al modelo nuevo.
  3. Corrige, mejora y diseña lo que más pese para que el sitio convierta y se entienda.

  Las prioridades están en §7 y los límites en §9.

---

## 1. Tu rol y tus facultades

Eres **diseñador web sénior, experto en UI/UX y en experiencia web**: jerarquía, composición, tipografía, interacción, accesibilidad, rendimiento percibido, texto de interfaz y conversión.

**Estás facultado para:**
- **Corregir** cualquier defecto que encuentres: los dos que dejó la QA y los que veas tú.
- **Mejorar** composición, jerarquía, ritmo, estados, foco, movimiento, legibilidad en celular, peso de medios y texto de interfaz.
- **Diseñar** lo que el modelo nuevo pide y el v3 no tiene. Lo principal es la home recompuesta. También pueden hacer falta secciones nuevas (problema, para quién, pasos, FAQ y precios arriba), la navegación nueva y un componente si de verdad hace falta.
- **Elegir qué hacer primero**, con criterio de impacto: lo que más mueve la comprensión y la conversión antes que el pulido.
- **Discrepar** de una decisión previa de diseño si tienes evidencia (una medición, una captura, una referencia). Si la cambias, deja escrito el porqué en tu informe (§10).

**No te corresponde decidir** lo que es de negocio y no está cubierto por los valores por defecto de §6.3: precios, promesas de servicio nuevas, publicar o fusionar en `main`, y casos o cifras sin respaldo. Eso se deja escrito como pregunta para Ramón, con tu recomendación.

**Cómo trabajar bien aquí, en una línea:** mide antes de opinar. Renderiza a 360, 390, 768, 1024, 1440 y 1920 px y mira las capturas. Se aprueba por evidencia, no por explicación.

---

## 2. Qué leer primero, en este orden

1. **`CLAUDE.md`, en la raíz:** las reglas de la casa (voz, marca, git, comandos). Valen también para ti.
2. **El encargo de la troncal para esta rama, del 23-oct.** Está en `main`, no en la rama:
   `git show origin/main:marketing/encargos-otras-sesiones/encargo-v3-adaptar-al-modelo-nuevo.md`
3. **La revisión independiente del v3 contra el modelo nuevo** (cuatro lentes, con archivo y línea):
   `git show origin/main:marketing/encargos-otras-sesiones/revision-v3-contra-modelo-nuevo-23oct.md`
4. **El texto nuevo del sitio (v1.2), la fuente de verdad del mensaje.** Sobre todo §1 (base del mensaje), §2 (home, nueve secciones), §3 (navegación y pie), §11 (afirmaciones por verificar), §12 (decisiones de Ramón) y §13 (lo borrado y el barrido de términos):
   `git show origin/main:marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md`
5. **El modelo de negocio:**
   `git show origin/main:marketing/oficina/obras-web/spindlelab-posicionamiento-v1/modelo-de-negocio-v1-BORRADOR.md`
6. **El sistema visual que vas a adaptar, en la rama:**
   - `marketing/oficina/obras-web/spindlelab-v3/spec-visual.md`: tokens con su rol, composición por sección y techos. La §7 es el historial de decisiones;
   - `spindlelab-astro/src/styles/archivo.css`.
   - Ojo: `marketing/brand/manual-de-marca.md` de la rama **no describe lo construido**. Es una v3.0 del 7-oct, escrita sobre una dirección anterior. La fuente real del sistema A es la spec más `archivo.css`.
7. **El estado al cierre:**
   - `marketing/oficina/obras-web/spindlelab-v3/pendientes-traspaso-revisados.md` §0;
   - `marketing/oficina/obras-web/spindlelab-v3/e12/acta-obra.md`: el acta de QA, vueltas 1 y 2;
   - `marketing/oficina/obras-web/spindlelab-v3/desvios.md`: 50 decisiones de construcción con su porqué.

---

## 3. Qué es SpindleLab y qué es este repo

**SpindleLab** es la consultora unipersonal de Ramón Vallejos Espíndola en Chile. Su sitio vivo es spindlelab.cl, en Cloudflare Pages: **un push a `main` publica**.

Este repo no es solo código. Tiene tres partes:
- `spindlelab-astro/`: el sitio, en Astro 4.16 con Tailwind 3.4;
- `marketing/`: marca, estrategia, contenido y las obras web con sus documentos;
- `ventas/`: el pipeline.

Varias sesiones de IA trabajan en paralelo, cada una con un rol, y se coordinan por archivos commiteados (`marketing/encargos-otras-sesiones/`). **Nunca des por hecho lo que otra sesión dice que hizo sin mirar el diff.**

El trabajo web sigue un estudio de cinco roles con dos compuertas de aprobación de Ramón y una QA en contexto limpio (`.claude/skills/estudio-web/SKILL.md`):
- **Mauro:** encuadre y cierre;
- **Lucía:** dirección de arte;
- **Clara:** texto de interfaz;
- **Diego:** construcción;
- **Simón:** SEO y señales;
- **Javiera:** QA.

Esos nombres aparecen en todos los documentos. Sus memorias están en `marketing/oficina/memoria/`.

---

## 4. Lo que hizo esta sesión (27-sep a 23-oct-2026, 314 commits sobre `main`)

### 4.1 Antes de E12, en breve
- **27-sep a 6-oct:**
  - tres direcciones visuales;
  - una dirección «driftime» elegida y construida como v3 en Astro (sistema compartido, home, servicios e interiores);
  - QA y actas.

  Hoy es historia: su spec está en `spec-visual-driftime.md`.
- **E7 (13-oct):** la lista de publicación del v3 de driftime, ensayada (`lista-publicacion.md`). **Ya no sirve tal cual** (§5.5).
- **E8 (14-oct):** el pase de voz de Clara sobre 886 filas de texto. Sacó rayas largas, verbos de folleto y Title Case.
- **E9 y E10 (15-16 oct):** tableros de interiores y una referencia nueva (The Ready). Se descartó.
- **E11:** detenido a propósito.

### 4.2 E12: el laboratorio digital (16 a 23-oct)
- **Compuerta 1 (16-oct).**
  - **El giro:** Ramón pidió el sitio como «estudio de diseño y tecnología / laboratorio digital», con Koto (koto.studio) como referencia.
  - **Lo que se hizo:** se midió Koto y se escribió un lock de referencia (`e12/lock-koto.md`). Mauro escribió el brief (`e12/brief-de-obra.md`) y Diego, el inventario de casos reales (`e12/inventario-casos.md`).
- **Compuerta 2 (19-oct).**
  - **Lo que se preparó:** dos direcciones (A «Archivo» y B «Banco»), tres caminos de logo y cuatro piezas de concepto rotuladas como conceptos (Tonela, Ocelo, Sesenta y Doceavo, marcas inventadas).
  - **Lo que Ramón eligió:** la dirección A, el logo «El huso» y el hero 3. Pidió reutilizar el video del hilo de oro del sitio actual como portada. Es un video de marca generado con IA, registrado como desvío autorizado.
  - **Los casos:** Praxi y Combeau como casos reales.
  - **Sus respuestas tal cual:** `e12/insumos-ramon-19oct.md`.
- **Spec, logo y texto (19-oct):**
  - **Lucía:** la spec de E12 (`spec-visual.md` §0 a §6);
  - **Bruno:** el logo final (`e12/logo/final/`);
  - **Clara:** el texto de toda la obra (`e12/texto/texto-obra.json`).
- **Construcción, en cinco tandas (19-oct)**, con un commit por tanda:
  1. la base (`455a35c`);
  2. la home y `/trabajo/` (`3ddcb31`);
  3. la plantilla de caso y seis casos (`ddee014`);
  4. los servicios (`dd4b950`);
  5. diagnóstico, método, nosotros, contacto, blog y siete artículos, con un barrido final (`6739bab`).
- **QA de Javiera en contexto limpio:**
  - **vuelta 1, «Rechazado»:** 4 mayores y 4 menores;
  - **arreglos:** `f2fe7b4`, el código que hoy se audita;
  - **vuelta 2, el 23-oct, «Con reparos»** (`f3044fc`): los ocho cerrados y medidos, y dos menores nuevos.
- **Cierre de Mauro (23-oct):**
  - capturas de las 27 rutas a 390, 768 y 1440 (`capturas/e12/`);
  - pendientes §0;
  - la fila de cierre en spec §7;
  - las memorias;
  - un encargo a la troncal para el manual de marca nuevo (`marketing/encargos-otras-sesiones/encargo-manual-marca-e12.md`);
  - el **criterio 13**: tres lectores fríos sobre el sitio construido (§5.3).
- **Tablero del resultado** (`tableros/e12-obra/tablero.html`, con sus capturas y grabaciones). Se publicó como página privada para Ramón; Codex no la puede abrir, pero todo su contenido está en esa carpeta.

---

## 5. Estado actual, medido (rama en `2db3d18`; el código de `spindlelab-astro/` no cambia desde `f2fe7b4`)

### 5.1 Las 27 rutas de `/v3/`

| Grupo | Rutas | Plantilla |
|---|---|---|
| Home e índice de trabajo | `/v3/`, `/v3/trabajo/` | `src/pages/v3/index.astro`, `trabajo/index.astro` |
| Casos (6) | `/v3/trabajo/{praxi,combeau,sesenta,ocelo,doceavo,tonela}/` | `trabajo/[caso].astro` |
| Chequeo y servicios (8) | `/v3/diagnostico/`, `/v3/servicios/`, `/v3/servicios/desarrollo-web/` y cinco en `servicios/[slug].astro` (visibilidad-en-ia, auditoria-seo-tecnica, acompanamiento-mensual, redes-sociales, paid-media) | `diagnostico.astro`, `servicios/*.astro` |
| Método, nosotros y contacto | `/v3/metodo/`, `/v3/nosotros/`, `/v3/contacto/` | sus `.astro` |
| Blog (8) | `/v3/blog/` y siete artículos | `blog/index.astro`, `blog/[slug].astro` |

Además hay cuatro maquetas archivadas con `noindex` (`v3/a`, `b`, `c` y `maqueta-inicial`) y dos páginas v2 que construye Astro (`/` y `/nosotros/`). El build da 33 páginas.

### 5.2 Lo verificado al 23-oct
- `npm run build`: 33 páginas, sin error.
- `npm run verificar -- --prefijo /v3/` a 390 y a 1440: 27 páginas, **sin hallazgos**. Revisa contraste real renderizado, desborde, un solo `h1`, JSON-LD, `alt`, enlaces internos y comentarios HTML servidos.
- **Producción igual byte a byte:** las 22 páginas fuera de `/v3/` y sus archivos, contra la línea base de la tanda 1 (`e12/construccion/comparar-produccion.mjs`).
- **Precios:** los mismos que en `main`, cruzados por el build contra `src/data/oferta-v3.json` y `servicios-v3.json`.

### 5.3 Lo abierto de la QA y del cierre
- **Defecto 9 (menor).** Bajo 834 px, el área de toque del botón «Cookies» del pie (`#cookie-preferencias`) baja sobre la línea de la hora (`p.cab__hora`).
  - **Lo medido:** el 9 % del área no responde a 360, el 6 % a 390 y el 3 % a 414. Además, el contorno de foco cruza el texto de la hora.
  - **Cómo se cierra:** que el área crezca hacia arriba, porque arriba no hay nada, o que la hora baje.
  - **Cómo se comprueba:** con `e12/qa-obra/vuelta-2/herramientas/pie-cookies.mjs` (100 % propio a 360, 390 y 414) y `foco.mjs`.
- **Defecto 10 (menor, de spec).** La línea «También: Paid Media…» de la home (239 caracteres) corre a 567, 676 y 911 px desde 1194, contra el tope de medida de 493 px.
  - **La causa:** la spec se contradice (§1.3 contra §2.1, fila 5).
  - **Cómo se comprueba:** con `tambien.mjs`.
  - **Ojo:** con la home recompuesta, esa línea probablemente desaparece. Resuélvelo como parte de P1 si es así, y anótalo.
- **Criterio 13**, lectores fríos sobre el sitio construido (`e12/cierre/criterio-13/lectura.md`).
  - **Lo que funcionó:** los tres dicen qué hacemos y probarían el chequeo.
  - **Dónde tropiezan los tres:** en términos sin explicar en la primera pantalla, como «SEO técnico», «visibilidad en IA», qué es que Google o ChatGPT «lean» un sitio, «ESTUDIO DE DISEÑO Y TECNOLOGÍA» y «Mira 21 cosas».
  - **Además:** 2 de 3 no ven su rubro en la home, y los 3 echan de menos cifras de clientes. Esas cifras no existen y no se inventan.
- **Lo que la QA no midió:** el muro del índice al pasar el mouse, el filtro del índice, las fuentes servidas a 960 px y el CLS del muro.
- **Notas de Javiera, declaradas:**
  - con el aviso de cookies abierto, los últimos controles de algunas páginas quedan bajo el aviso y la barra flotante hasta que la persona elige;
  - los casos no tienen pie, así que tampoco el botón para cambiar las cookies;
  - el pie de A no enlaza a `/privacidad/`;
  - el video del inicio de Praxi mide 568 × 320 y se ve blando a 390.

### 5.4 Lo que la revisión del 23-oct midió y conviene saber
- **Sobre la home a 1440 px:**
  - el portafolio ocupa el **57,5 %** de la altura;
  - los precios empiezan al **68 %**;
  - la acción principal es el chequeo, dentro de la portada;
  - el único botón a `/contacto/` está al final.
- **La atribución UTM no funciona en `/v3/`.** La captura de los UTM en la primera página vive en `src/components/v3/NavV3.astro`, entre las líneas 51 y 67, y ninguna página de A usa ese componente (es de la dirección anterior). Hoy solo `spindlelab-astro/public/assets/js/v3-contacto.js`, en la línea 23, los toma, y solo si llegan directo a contacto. El camino anuncio → home → contacto llega con los tres UTM vacíos. **Verificado el 28-oct.**
- **Promesas sin respaldo** que el texto nuevo saca o pide decidir (lista completa en el encargo, §5, y en `copy-secciones.md` §11 y §13):
  - el monitoreo de menciones en IA, el *share of voice* y los AI Overviews;
  - el compromiso de puntaje a 3 meses;
  - «quincenal» y «mensual» para el mismo plan;
  - «24 horas» en decenas de lugares, cuando el único plazo real medido fue 31 h (usa «un día hábil»);
  - «más de cinco años en agencias»;
  - la frase de resultado del caso Combeau;
  - dos artículos del blog que dan consejos opuestos sobre los robots de IA.

### 5.5 Lo que falta para publicar, sea cual sea el diseño
- **R1, la ruta de publicación** (raíz o `/v3/`) y la fecha.
- **La lista de publicación (`lista-publicacion.md`) hay que reescribirla** sobre lo construido: hoy son 12 plantillas y 27 rutas, y `driftime.css` y `components/v3/` se van al publicar. El sitemap no tiene `/trabajo/`, `llms.txt` está desactualizado y el `dateModified` de la home sale del reloj del build.
- **Peso.** Fusionar la rama tal cual suma unos 486 MB comprimidos a un `main` de 250 MB. El corte debe llevar solo `spindlelab-astro/` y lo mínimo.
- **`/privacidad/` (R8):** en producción tiene dos `h1` y dos textos bajo el contraste AA. Arreglar su marcado necesita el OK de Ramón.

---

## 6. Lo que cambió el 23-oct, y lo que Ramón decidió el 28-oct

### 6.1 El modelo nuevo
- **Posicionamiento:** «Marketing y crecimiento con IA para empresas que ya venden».
- **Titular propuesto:** «Te llegan consultas. Veamos dónde se cae el resto.»
- **Ruta del cliente:**
  1. revisión gratis de una página;
  2. conversación de 20 minutos;
  3. propuesta por escrito, por fases;
  4. implementación;
  5. acompañamiento mensual.
- **Se promete** método, entregables y plazos. **Nunca resultados.**
- **La etapa gratis se llama «revisión».** «Diagnóstico» queda para una etapa pagada que aún no existe, y el chequeo automático sigue siendo «chequeo».
- **La home nueva tiene nueve secciones** (`copy-secciones.md` §2):
  1. hero;
  2. dónde puede caerse una consulta;
  3. para quién;
  4. cómo partimos y cómo seguimos;
  5. soluciones con precio;
  6. pruebas;
  7. quién está detrás;
  8. preguntas frecuentes (con `FAQPage` en el JSON-LD);
  9. cierre.

### 6.2 Lo que ya pasó en `main`
Otra sesión aplicó ese texto **sobre el diseño vigente (v2)** en la obra `spindlelab-posicionamiento-v1`, con tres rondas de QA, y se fusionó en `main` el 24-oct (PR #50).
- **Su carpeta:** `marketing/oficina/obras-web/spindlelab-posicionamiento-v1/`, con `brief-de-obra.md`, `desvios.md`, `acta-qa.md` y `acta-qa-ronda3.md`.
- **Para qué te sirve:** su texto y sus decisiones son tu punto de partida para el mensaje. No toques esa rama (`claude/sitio-posicionamiento-nuevo`) ni el v2.

### 6.3 Las decisiones de Ramón del 28-oct
1. **Codex adapta el v3 al modelo nuevo.** No se rehace desde cero. El sistema visual A se conserva y la home se recompone.
2. **Partes de estos cuatro valores por defecto.** Márcalos en tu informe como «por defecto, pendiente del visto de Ramón»:
   1. **El look A sirve para el mensaje nuevo:** lienzo negro, hilo de oro y El huso. Se conserva el sistema y se recompone la home.
   2. **R1:** el v3 se publica en la raíz, después del texto nuevo que ya está en `main`, con un corte que lleve solo `spindlelab-astro/` y lo mínimo. **Tú no publicas ni fusionas**; mientras tanto, todo sigue bajo `/v3/`.
   3. **Casos:**
      - **Bernardo Combeau** es el único caso público de cliente, y es un caso de sitio web, no de crecimiento de ventas.
      - **Verifica y Cumple** queda como pieza propia. Es el chequeo de la Ley 21.719 que SpindleLab corrió primero sobre su propio sitio; ver `git show origin/main:ventas/casos-de-exito/verifica-y-cumple.md`, sin citar puntajes.
      - **Salen Praxi y los cuatro conceptos.** No borres sus archivos de `marketing/portafolio/`: solo dejan de publicarse en el sitio.
   4. **R2:** el informe del acompañamiento es **mensual**. Salen de las promesas el monitoreo de menciones en IA y el compromiso de puntaje a 3 meses, hasta que existan.

Las demás decisiones abiertas de `copy-secciones.md` §12 siguen en el valor por defecto que ese documento ya escribió. Por ejemplo:
- «un día hábil»;
- el botón de la navegación «Pedir la revisión»;
- los agentes de IA nombrados en una sola frase, en «Quién está detrás»;
- sin la palabra «socio».

Lístalas igual en tu informe.

---

## 7. Tu misión, por prioridad

### 7.0 Primero, tu propia auditoría (antes de tocar nada)
1. Construye el sitio y recórrelo como lo haría una persona del perfil: dueña de una pyme que ya vende, desde el celular, llegando desde un anuncio.
2. Captura a 360, 390, 768, 1024, 1440 y 1920 px.
3. Haz una lista corta de los 10 problemas de UX que más pesan para que esa persona entienda la oferta y pida la revisión, con evidencia (captura o medida) en cada uno.

Esa lista ordena tu trabajo junto con lo de abajo. Si contradice algo de este informe, gana tu evidencia; anótalo.

### 7.1 P0: lo que está roto o promete lo que no hay
1. **Defecto 9** (área de toque de «Cookies» contra la hora, bajo 834). Ciérralo y compruébalo con `pie-cookies.mjs` y `foco.mjs`.
2. **Defecto 10** (la línea «También: Paid Media…» sobre el tope de 493 px). Resuélvelo, o haz que desaparezca con la home nueva, y deja escrito en la spec cuál de las dos reglas manda.
3. **Atribución UTM en todas las rutas de `/v3/`.** Captura `utm_source`, `utm_medium` y `utm_campaign` en `sessionStorage` en la primera página que pise el visitante.
   - **Dónde:** en un componente que usen todas las páginas de A, por ejemplo `src/components/a/Encabezado.astro` o `PaginaA.astro`.
   - **Las claves:** las mismas que lee `v3-contacto.js`.
   - **Cómo se comprueba:** el camino anuncio con UTM → home → servicio → contacto llega con los tres campos `#f-utm-*` llenos.
4. **Sacar las promesas sin respaldo** de §5.4: en el texto visible, en el JSON-LD y en los datos (`servicios-v3.json`, `oferta-v3.json`, `paginas-v3.json`).

### 7.2 P1: adaptar el v3 al modelo nuevo
1. **Recomponer la home** (`src/pages/v3/index.astro`) en las nueve secciones de `copy-secciones.md` §2, con el sistema A.
   - **Acción principal:** «Pedir la revisión de una página», hacia `/v3/contacto/`, visible en la primera pantalla a 360 × 800.
   - **Acción secundaria:** el chequeo, como enlace.
   - **Precios y ruta de cuatro pasos:** arriba, no al 68 % de la página.
   - **El portafolio deja de dominar:** Combeau como prueba y Verifica y Cumple como pieza propia.
   - **El hilo de oro puede seguir de portada**, si a tu juicio no compite con el mensaje. Si crees que sí, propón otra cosa con evidencia.
2. **Navegación nueva:** Soluciones, Método, Nosotros, Trabajo, Blog y Contacto, más el botón «Pedir la revisión». En el pie, enlace a `/privacidad/`.
3. **Casos:**
   - `/v3/trabajo/` y su índice quedan con Combeau y Verifica y Cumple.
   - Las rutas de Praxi y de los cuatro conceptos se retiran del build.
   - Revisa enlaces, «Siguiente», la cinta (`src/data/archivo/cinta.json`), el muro y el sitemap.
4. **Texto nuevo en todas las rutas** (servicios, método, nosotros, contacto, diagnóstico y 404), desde `copy-secciones.md` §3 a §10, por el flujo de texto de §8.3. **No escribas texto en los `.astro`.**
5. **Barrido de términos** de `copy-secciones.md` §13 sobre todo lo que se publica: texto visible, `alt`, `title`, `aria-label`, metas, JSON-LD, `llms.txt`, `paginas-v3.json` e `interiores.mjs`. También `spindlelab-astro/public/assets/js/v3-chequeo.js`, que tiene textos en las líneas 75, 106 y 110 («Pedir el diagnóstico»; aquí solo cambias texto, no lógica).
6. **Señales** (pídelas a la altura de Simón, `e12/senales-obra.md`):
   - `title` y `description` por ruta;
   - el `jobTitle` y la descripción de `#org` y `#autor-ramon` en `src/components/a/layout-a.ts`;
   - `FAQPage` solo con preguntas visibles;
   - las imágenes al compartir, que tienen texto horneado: regenera las que cambien con `e12/construccion/herramientas/og-tanda-*.mjs`.

### 7.3 P2: UI/UX con criterio propio
Lo que tu auditoría marque como más relevante. Candidatos con evidencia previa:
- **La primera pantalla de la home:** que se entienda sin jerga, según los tropiezos del criterio 13.
- **El celular:** la ficha bajo la barra flotante en los casos a 390, el aviso de cookies tapando controles y el orden de lectura.
- **Accesibilidad:** foco visible y nunca tapado, áreas de toque de 44 × 44, movimiento reducido y contraste. `npm run verificar` mide el contraste real.
- **Rendimiento percibido:** el video de portada pesa 4 MB, y quedan el LCP, el CLS del muro y las fuentes.
- **Lo que la QA no midió:** el muro al pasar el mouse, el filtro y las fuentes a 960 px.
- **El formulario de contacto:** claridad, errores y confirmación. Sin tocar su `action` ni sus `name`.

---

## 8. Cómo está construido y cómo trabajar

### 8.1 Rama y sincronización
- **Trabaja en una rama tuya** creada desde `claude/magical-franklin-ckfki2`, por ejemplo `codex/v3-modelo-nuevo`. Abre el PR **hacia `claude/magical-franklin-ckfki2`, nunca hacia `main`.**
- **No fusiones `origin/main` en tu rama.** Lee sus documentos con `git show origin/main:<ruta>`.
  - **Por qué:** `main` cambió las páginas de producción (el v2 con el texto nuevo). Fusionarlo rompe la línea base de `comparar-produccion.mjs` y mezcla dos obras.
  - **Cuándo se reconcilia:** en el corte de publicación, que es otro paso.

### 8.2 Comandos
```bash
cd spindlelab-astro
npm ci
npm run build                                  # 33 páginas hoy
npm run verificar -- --prefijo /v3/            # a 390 px (por defecto); sale con 1 si hay hallazgos
npm run verificar -- --prefijo /v3/ --ancho 1440
node ../marketing/oficina/obras-web/spindlelab-v3/e12/construccion/comparar-produccion.mjs   # producción igual byte a byte
python3 -m http.server --directory dist 8000   # para mirar /v3/ en el navegador
```
- **Capturas:** con Chromium sin ventana (Playwright).
- **Herramientas de la QA:** las de Javiera están en `e12/qa-obra/vuelta-2/herramientas/` (`auditar.mjs`, `foco.mjs`, `pie-cookies.mjs`, `tambien.mjs`, `campos.mjs`, `aviso.mjs`, `solapes.mjs`, `copy-detector.mjs` y más).
- **Ruta de Chromium fija:** muchos scripts de la obra apuntan a `/opt/pw-browsers/...`, que solo existe en la nube de Claude Code. Ajusta esa ruta a tu entorno.

### 8.3 El flujo de texto (importante)
1. **La fuente del texto** es `marketing/oficina/obras-web/spindlelab-v3/e12/texto/texto-obra.json`: por página y por id.
2. **Se copia al sitio con:** `node marketing/oficina/obras-web/spindlelab-v3/e12/construccion/herramientas/extraer-texto.mjs <páginas>`.
   - Escribe `spindlelab-astro/src/data/archivo/texto/<id>.json`, con el sha256 del origen. Esas copias **no se editan a mano**.
   - `--comprobar` verifica que coincidan.
3. **Las páginas leen el texto con `src/data/archivo/texto.mjs`.** El build falla si falta un id, o si un precio o un nombre no coincide con `src/data/oferta-v3.json` o `servicios-v3.json`.
4. **`texto-obra.md`** es la vista legible: se regenera con `e12/texto/herramientas/md-obra.py`.

### 8.4 El sistema A
- **CSS:** `src/styles/archivo.css`. Los tokens están en `body.a-body` y todas las reglas van bajo `.a-body`.
- **Componentes:** en `src/components/a/`:
  - `PaginaA`, `Encabezado` y `Pie`;
  - `Logo`, `Hora`, `Miga` y `Pausa`;
  - `Video`, `Imagen`, `Chequeo` e `Icono`;
  - `Caso`, `FilaCaso`, `MedioCaso` y `Pieza`;
  - `layout-a.ts`.
- **Scripts:** en `src/scripts/archivo/*.mjs`:
  - `base`, `resortes` y `video`;
  - `cinta`, `muro` y `caso`;
  - `contacto` y `fases`.
- **Datos:** en `src/data/archivo/`: `casos.mjs`, `servicios.mjs`, `interiores.mjs`, `blog.mjs`, `cinta.json` y `medios*.json`.
- **Medios:** en `public/v3/`: la portada, la cinta, los medios y la marca.
- **Motion** está fijo en 13.5.0. **Lenis** queda cargado pero inerte en `/v3/` (`data-lenis-prevent`), porque quitarlo cambiaría el paquete JS que comparten las páginas de producción.

### 8.5 Trampas que ya costaron (todas en `desvios.md`)
- **Ningún componente importa `Layout.astro`:** cada página de A lo importa ella misma con `{...LAYOUT_A}`. Si un componente lo importa, el CSS publicado cambia de nombre y producción deja de salir igual.
- **La lógica de A va en `.mjs`, no en `.astro`:** Tailwind lee los `.astro` y una palabra nueva puede sumar una clase al CSS publicado.
- **Al reemplazar páginas, el CSS publicado puede perder clases.** `src/data/archivo/guardia-tailwind.ts` las conserva.
- **Comentarios:** en Astro se comenta con `{/* */}`, no con `<!-- -->`. `verificar` lo marca.
- **Caché:** `spindlelab-astro/public/_headers` cachea fuerte las imágenes, los videos y las fuentes. Si cambias un medio en la misma ruta, súbele la versión (`?v=N`) o cámbiale el nombre.
- **El `dateModified` de la home lo escribe el build:** el HTML de `/v3/` cambia cada día aunque la página no cambie.

---

## 9. Límites: lo que no se toca

- **No fusiones en `main` ni publiques.** No hagas push a `main`, y nada de lo que hagas debe cambiar spindlelab.cl.
- **`spindlelab-astro/src/layouts/Layout.astro`:** gtag, el consentimiento de cookies y el Pixel quedan intactos. Ramón aprobó cinco props opcionales que usa solo `/v3/` (`lenis`, `letras`, `themeColor`, `iconos`, `entidad`). No agregues otras sin dejarlo escrito como pregunta.
- **Las páginas de producción** (todo lo que el build deja fuera de `dist/v3/`) salen **iguales byte a byte**. Lo comprueba `comparar-produccion.mjs`.
- **El formulario de contacto:** su `action`, sus `name`, los `#f-utm-*`, `generate_lead` y `v3-contacto.js` no cambian. Agregar captura de UTM en otras páginas sí está permitido (P0.3).
- **El chequeo:** su lógica (`spindlelab-astro/functions/api/chequeo.js` y la de `v3-chequeo.js`) no se toca. Solo su texto.
- **Los precios:** las cifras no cambian.
- **El `noindex` de `/v3/` se queda** hasta el corte.
- **La rama `claude/sitio-posicionamiento-nuevo` y el v2** no se tocan.
- **Cero prueba social inventada:** ni cifras, logos, testimonios ni casos sin respaldo. Los clientes potenciales no se nombran. Combeau tiene permiso.
- **Nada pagado:** no se generan imágenes ni video con servicios de pago sin el OK de Ramón.
- **La voz** (el manual de marca y `CLAUDE.md`):
  - tuteo chileno, nunca voseo;
  - primera persona singular para lo que Ramón observó y plural para lo que el negocio entrega;
  - **sin raya larga ni media** como muleta, sin Title Case en títulos, sin «¿Listo para…?» y sin castellano de folleto («impulsa tu negocio», «soluciones a tu medida»).
- **El dorado `#C9A227`** es escaso en la marca: un solo uso por pieza. El sistema A no tiene acento de color en su interfaz (spec §1.1).

---

## 10. Qué entregas

1. **Commits en tu rama**, pequeños y con mensaje claro, en español.
2. **`marketing/oficina/obras-web/spindlelab-v3/e12/codex/informe-codex.md`**, con:
   - tu auditoría (§7.0): los 10 problemas, con evidencia;
   - qué cambiaste y por qué, enlazando cada cambio a su problema;
   - capturas **antes y después** a 390 y 1440 de cada ruta que cambió, en `e12/codex/capturas/`;
   - las decisiones de §6.3 y de `copy-secciones.md` §12, cada una marcada «por defecto, pendiente del visto de Ramón»;
   - las preguntas para Ramón, con tu recomendación;
   - lo que no hiciste y por qué.
3. **Una fila en `spec-visual.md` §7** con lo que cambia del sistema o de la composición, y la spec al día donde la contradigas.
4. **La verificación en limpio**, pegada en tu informe:
   - `npm run build` sin error;
   - `npm run verificar -- --prefijo /v3/` a 390 y 1440 sin hallazgos;
   - `comparar-produccion.mjs` sin diferencias;
   - `extraer-texto.mjs --comprobar` en 0.
5. **Un PR hacia `claude/magical-franklin-ckfki2`.** Después, la QA independiente (Javiera, en contexto limpio) revisa tu trabajo antes de que Ramón lo lea.

---

## 11. Archivos clave

Las rutas son relativas a la raíz del repo; `O` = `marketing/oficina/obras-web/spindlelab-v3`.

| Qué | Dónde |
|---|---|
| Reglas de la casa | `CLAUDE.md` |
| Encargo de adaptar el v3 (23-oct) | `origin/main:marketing/encargos-otras-sesiones/encargo-v3-adaptar-al-modelo-nuevo.md` |
| Revisión del v3 contra el modelo nuevo | `origin/main:marketing/encargos-otras-sesiones/revision-v3-contra-modelo-nuevo-23oct.md` |
| Texto nuevo v1.2 | `origin/main:marketing/oficina/obras-web/spindlelab-posicionamiento-v1/copy-secciones.md` |
| Modelo de negocio | `origin/main:marketing/oficina/obras-web/spindlelab-posicionamiento-v1/modelo-de-negocio-v1-BORRADOR.md` |
| Obra del texto nuevo sobre v2 (brief, desvíos, QA) | `origin/main:marketing/oficina/obras-web/spindlelab-posicionamiento-v1/` |
| Caso Verifica y Cumple (hechos) | `origin/main:ventas/casos-de-exito/verifica-y-cumple.md` |
| Brief de E12 | `O/e12/brief-de-obra.md` |
| Lock de referencia (Koto) | `O/e12/lock-koto.md` |
| Spec visual vigente (A) | `O/spec-visual.md` |
| Desvíos de construcción | `O/desvios.md` |
| Acta de QA de la obra | `O/e12/acta-obra.md` |
| Pendientes al cierre | `O/pendientes-traspaso-revisados.md` §0 |
| Criterio 13 (lectores fríos) | `O/e12/cierre/criterio-13/lectura.md` |
| Señales por ruta (SEO, JSON-LD) | `O/e12/senales-obra.md` |
| Texto de la obra (fuente) | `O/e12/texto/texto-obra.json` |
| Inventario de casos (cada número con su fuente) | `O/e12/inventario-casos.md` y `.json` |
| Logo El huso (SVG, favicons, README) | `O/e12/logo/final/` |
| Capturas de cierre (27 rutas × 3 anchos) | `O/capturas/e12/` |
| Tablero del resultado (HTML, capturas y videos) | `O/tableros/e12-obra/` |
| Herramientas de QA | `O/e12/qa-obra/vuelta-2/herramientas/` |
| Herramientas de construcción | `O/e12/construccion/` (`comparar-produccion.mjs`, `herramientas/extraer-texto.mjs`, `og-tanda-*.mjs`) |
| Páginas del v3 | `spindlelab-astro/src/pages/v3/` |
| Sistema A | `spindlelab-astro/src/styles/archivo.css`, `src/components/a/`, `src/scripts/archivo/`, `src/data/archivo/` |
| Datos de oferta (precios) | `spindlelab-astro/src/data/oferta-v3.json`, `servicios-v3.json`, `paginas-v3.json` |
| Layout compartido (protegido) | `spindlelab-astro/src/layouts/Layout.astro` |
| Verificador del sitio | `spindlelab-astro/scripts/verificar.mjs` |
| Formulario y chequeo (protegidos) | `spindlelab-astro/public/assets/js/v3-contacto.js`, `v3-chequeo.js`, `spindlelab-astro/functions/api/chequeo.js` |
| Memorias de los roles | `marketing/oficina/memoria/` |
