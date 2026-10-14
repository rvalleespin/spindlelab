# Lista de publicación del v3 (frente E7)

**Qué es.** Los pasos para publicar el v3 de spindlelab.cl el día que Ramón decida R1. Se
siguen en orden. Cada paso dice qué archivos toca, qué comando se corre, cómo se comprueba
y quién lo hace. Si un paso no calza con lo que se ve ese día, se para y se vuelve a medir:
no se improvisa encima.

**Estado.** Ensayada el 13-oct sobre `1b064bf`. Diego la corrió de punta a punta en un
worktree desechable, con `origin/main` (`34c063e`) traído por merge. Lo que falló o salió
distinto ya está corregido en esta versión (sección 9, «Qué cambió en la lista»). Lo que no se
pudo ensayar sigue marcado **[sin ensayar]**, con su razón: paneles de Cloudflare, decisiones
de Ramón, copy de Clara, el PR, el merge y todo lo que corre contra producción después del
deploy.

**Al 14-oct: P0.3 hecho** (el pase de voz, E8; el último commit de la aplicación que toca el sitio
es `f0d911c`). Desde el ensayo, la rama cambió `spindlelab-astro/` solo con E8: `28c5d85`,
`a70e945` (la meta de la home, que el pase reemplazó con su fila 50), `3877e51`, `2dbaa09`,
`eaa0c33` y `f0d911c`. Eso es P0.3, así que por G7 no se vuelve a ensayar. **Ojo con los números
de línea:** las citas archivo:línea de esta lista se midieron el 13-oct sobre `1b064bf`, y E8
cambió los 4 JSON de datos, 13 plantillas y componentes y `v3-chequeo.js`. Varias ya no calzan:
por ejemplo, R2.2 cita `servicios-v3.json:42` y `:382`, que hoy son `:47` y `:416`, y R4 cita
`nosotros.astro:196`, que hoy es `:197`. También se corrieron las líneas citadas de
`pendientes-traspaso-revisados.md`. El día del corte cada cita se vuelve a medir buscando su
texto (`grep -n`), y no se confía en el número.

**Base medida.** Rama `claude/magical-franklin-ckfki2` en `1b064bf` al empezar el ensayo
(`git ls-remote` daba `1b064bfa…`). `origin/main` en `34c063e`. Base común `b5f4b2f`. main va
31 commits adelante y ninguno toca `spindlelab-astro/` (`git log HEAD..origin/main --
spindlelab-astro` sale vacío; el ensayo lo confirmó). `git merge-tree --write-tree origin/main
HEAD` sale limpio (árbol `6a41b83`, el mismo que dio el merge real del ensayo). Después la rama
siguió avanzando solo con documentos: `39b9a31` (el borrador de esta lista; `git show --stat`:
1 archivo) y el commit de esta corrección. `git diff --stat 1b064bf HEAD -- spindlelab-astro`
sale vacío. **El día del corte no se compara contra un hash fijo:** vale el HEAD que tenga la
rama de la obra ese día, siempre que su diff contra `1b064bf` en `spindlelab-astro/` traiga solo
lo de P0.2 y P0.3 (P1).

**De dónde sale.** Seis relevamientos del 13-oct: rutas, prefijo, archivos, main,
integraciones y compuertas (anexo C), más el ensayo del mismo día (sección 9). Cada afirmación
lleva su archivo:línea o el relevamiento que la midió.

**Marcas.**
- **[ensayado]**: se corrió en el ensayo del 13-oct y salió como dice el paso (el paso ya trae
  las correcciones que pidió el ensayo).
- **[sin ensayar]**: no se pudo correr en el ensayo. Dice por qué.
- **raíz** y **prefijo**: las dos respuestas posibles de R1.

**Documentos de la obra, en local** (carpeta `marketing/oficina/obras-web/spindlelab-v3/`):
`brief-de-obra.md` (§6 a §9 en :94-159), `spec-visual.md` (§5 imagen en :109-121, §6
prohibiciones en :123-133, §7 historial desde :135), `acta-qa-final.md`,
`pendientes-traspaso-revisados.md` (R1 a R9 en :52-166, E7 en :230-235, E8 en :237-241),
`pendientes-traspaso-detalle.md` (B19 :154, C36 :292, P70 :559, P71 :567, P76 :603, P77
:611, huecos del crítico :759-771, con NUEVO-produccion-veracidad en :761 y NUEVO-llms-txt en
:767) y este archivo.

---

## 0 · Sin estas respuestas de Ramón no se publica

| Id | Pregunta | Por qué bloquea |
|---|---|---|
| **R1** | ¿El v3 va a la **raíz** (reemplaza al v2 en las mismas URL) o queda con **prefijo** `/v3/` y noindex? ¿En qué **fecha**? | Define qué secciones de esta lista corren. El brief ya supone la raíz (`brief-de-obra.md:155`). La fecha fija el `dateModified` de la home y el `lastmod` del sitemap. |
| **R2.1** | ¿La regla del 27-sep («la vigilancia de menciones en IA no entra en la promesa», `marketing/encargos-otras-sesiones/encargo-exploracion-rebranding-webdev.md:50-54`) cubre también el monitoreo acotado de los planes pagados? | El v3 lo promete en texto visible y en JSON-LD. `marketing/capacidad-servicios.md:55` lo marca ❌. Publicar así es publicar algo que una regla vigente dice que no se entrega. Matiz: `capacidad-servicios.md:44-45` y `:69` dicen que a mano funciona con 1 o 2 clientes. |
| **R2.2** | El informe del Acompañamiento Esencial, ¿**mensual o quincenal**? | El sitio dice las dos cosas para el mismo plan y precio: `servicios-v3.json:42` («Informe mensual») contra `:382` («Informe quincenal + reunión mensual»). Una de las dos es falsa. |
| **R9 (1.ª mitad)** | Revisar Raigal y marcar la casilla de `marketing/portafolio/01-raigal/ficha.md:90` («Revisión humana antes de usar esto con un prospecto»). | Publicar es mostrársela a todos los prospectos. El rótulo de concepto ya está en las tres páginas. |
| **Lectura de aprobación** | Después del pase de voz de Clara (E8), Ramón lee la vista previa. En esa lectura elige «Te lo muestro» o «Te lo mostramos» en Nosotros (R4, una palabra: `src/pages/v3/nosotros.astro:196`) y, si es raíz, aprueba el `llms.txt` nuevo. | CLAUDE.md, «Brand & content rules»: todo lo público pasa por revisión humana. Lo aprobado hasta hoy es el tablero de la home (5-oct), el hero (10-oct, `spec-visual.md:261`) y la OG (`:260`). No hay registro de aprobación del copy de las páginas internas. |
| **Merge** | El OK explícito al merge a main, en el mismo turno. | CLAUDE.md, «Git workflow». main es lo que despliega. |

**Recomendado, no bloquea:** el OK para llevar ya a main `claude/arreglos-accesibilidad-sitio-vivo`
(`ab741bc`, 27-sep), que arregla `/privacidad/`. Ver P2 y 5.1.

Lo demás de R3 a R9 puede esperar (sección 1.4).

**Una sola conversación.** R1, R2.1 y R2.2 van juntas, en un solo mensaje. La lectura de
aprobación va después, cuando E8 y R2 ya estén aplicados en la rama de la obra.

---

## 1 · Compuertas

### 1.1 Bloquean en los dos caminos

| | Qué | Razón | Dónde se cierra |
|---|---|---|---|
| G1 | R1, fecha y OK al merge | Sin ruta no hay publicación. `spindlelab.cl/v3/` hoy da 404 (relevamiento compuertas, curl; el ensayo lo volvió a medir). Publicar es mergear a main. | Sección 0 |
| G2 | R2.1 aplicado | El sitio contradice una regla vigente sobre lo que se puede entregar. Lugares: `servicios-v3.json:15, 35, 39, 42, 51, 137, 149, 357, 359, 366, 367, 382, 391, 408, 419, 453, 476, 488`; `oferta-v3.json:108`; `paginas-v3.json:26`; `src/pages/v3/metodo.astro:113` y `:166` (paso 4 del HowTo); `servicios/[slug].astro:313`; `diagnostico.astro:179` (grep sobre src, compuertas). | P0.2 |
| G3 | R2.2 aplicado | Mismo plan, dos cadencias. Producción ya tiene la contradicción (`acta-qa-final.md:42-43`): publicar no la empeora, pero la vuelve a publicar sabiendo que está. | P0.2 |
| G4 | Pase de voz (E8) y lectura de aprobación | Regla de revisión humana. E8 sigue abierto (`pendientes-traspaso-revisados.md:237-241`). P86 (`desarrollo-web.astro:232`) va dentro del pase. **14-oct:** E8 hecho y aprobado (P0.3, `f0d911c`), con P86 dentro; queda la lectura de aprobación. | P0.3 (hecho) y P0.4 |
| G5 | Raigal revisado | `ficha.md:90` sin marcar. | P0.4 |
| G6 | Maquetas y `mockup-interno/` fuera del build | En la vista previa de esta rama, `/v3/a/`, `/v3/maqueta-inicial/` y `/mockup-interno/proyecto-bernardo.png` responden 200 (compuertas, curl; el ensayo volvió a medir `/v3/a/`: 200). Si se mergea así, quedan servidas en spindlelab.cl. El brief lo prohíbe (`:113-114`, criterio `:132`). | P4 |
| G7 | Esta lista, ensayada | Hecho el 13-oct (sección 9). Se vuelve a ensayar de P3 a la sección 4 si, antes del corte, entra a main algo bajo `spindlelab-astro/` o la rama de la obra cambia el sitio más allá de P0.2 y P0.3. | Sección 9 |

### 1.2 Bloquean solo en raíz

| | Qué | Razón | Dónde se cierra |
|---|---|---|---|
| G8 | `llms.txt` reescrito | Con el v3 en la raíz, `public/llms.txt:13` manda a `/diagnostico/` a buscar «cinco preguntas fijas por tres motores», que el v3 ya no publica. `:18` promete «share of voice mes a mes» (depende de G2). `:5` presenta la casa como «agencia de marketing con IA», la tesis anterior al giro. Mínimo para no publicar algo falso: `:13` y `:18`. | P11 |
| G9 | El corte mismo | Quitar noindex de 11 plantillas, quitar el prefijo, retirar 2 páginas Astro y 18 HTML v2. Si se olvida un HTML v2, esa ruta puede seguir sirviendo el v2 en `astro dev` (probado con `/metodo/`, relevamiento rutas). | P5 a P7 |

### 1.3 No bloquea publicar, pero se hace antes del merge

| | Qué | Razón |
|---|---|---|
| M1 | Línea base del v2 y plan de medición escritos | El criterio de éxito de la obra es «conversión medida» (`brief-de-obra.md:169`), y el brief prometía la spec «con su plan de medición escrito» (`:175-177`). No existe: `acta-qa-A2.md:58` («El plan de medición no se pudo verificar») y `grep -rni "plan de medici" marketing .claude` solo devuelve esas dos menciones (integraciones). No bloquea publicar; bloquea leer el resultado. GA4 guarda la historia, así que olvidarlo no es irreparable, pero la ventana se cierra antes para que nadie la mezcle con el v3. Paso P17. |

### 1.4 Pueden esperar (con su razón)

- **R3** (Acompañamiento contra mantención de $50.000): pregunta de producto. «Integra desarrollo web y mantención» (`servicios-v3.json:403`) se puede cumplir. No miente.
- **R4, resto** (los dos «eje», «motor», la frase reservada): es texto de Ramón que ya está publicado en producción. Solo la palabra singular o plural entra en la lectura de aprobación.
- **R5** (cargo, orden de `makesOffer`, precarga de Inter, tercer `sameAs`, OG por defecto, favicon): grafo y rendimiento. Nada falso. Inter son 48 KB que hoy no pintan (`spec-visual.md:258`). Ver P16.
- **R6** (paquete del hero) y `spec-visual.md:265` (el aviso tapa parte del titular en pantallas bajas): mejoras. El aviso se cierra con un toque.
- **R7** («67 de 69», Verifica y Cumple en la home, FAQ de Diagnóstico, alcance de Método, FAQ de la home): copy nuevo o dato opcional. Ojo: sin la FAQ de la home, el chequeo propio sobre spindlelab.cl baja de 85 a 83 el día que el v3 va a la raíz (integraciones, `chequear()` de producción contra los dos builds; `acta-qa-final.md:37-38`). El ensayo lo confirmó sobre el build en raíz: 83, con `sameas`, `faq` y `preguntas` en falla.
- **R8 en raíz**: las frases de producción que no se sostienen viven solo en los HTML v2 y se van al retirarlos (P5). Son «Equipo dedicado», «estamos acostumbrados a trabajar bajo NDA» (en el JSON-LD de `public/contacto/index.html:122`), «Ninguna herramienta del rubro…» y «Sí. Cada pack». `grep` de cada una en el build del ensayo: 0. **Ojo con buscar solo «bajo NDA»:** sale 2 veces en el `/contacto/` del v3 (FAQ visible y FAQPage), con la redacción honesta «trabajamos bajo NDA cuando el cliente lo requiere» (`contacto.astro:69`), que es la misma que ya muestra la FAQ visible de producción (`public/contacto/index.html:262`). Esa se queda. **En prefijo no se van solas** (sección 3).
- **/privacidad/** (C36, P71): dos h1 y dos textos de 13 px a 3,82:1 y 4,46:1. No es falso ni está roto, y ya está así en producción. El arreglo ya existe en `ab741bc` (P2). Además trae píldoras de `style.css` v2 que `ab741bc` no toca (sección 8).
- **R9, 2.ª mitad**: completar el portafolio de concepto o cerrarlo.
- **Acta, puntos 4 y 5**: los «acá» y «Sitio web» obligatorio. Textos ya publicados; el campo no está roto (`contacto.astro:158-159`).
- **Diferido de fotos** (`spec-visual.md:259`): solo afecta que la fila llegue de margen a margen.
- **D43** (permiso de Bernardo): el merge de la rama completa lo corrige solo (`ventas/proyectos-en-curso.md:16` dice «CONCEDIDO» en la rama; main dice «no se ha pedido todavía»).
- **B26, B27**: documentos de la troncal. El sitio no depende de ellos.
- **Lenis**: el brief lo deja salvo que la QA mida un costo (`:159`).
- **Google Ads**: se reenciende después de publicar y medir, y lo decide Ramón (`brief-de-obra.md:146-148`).

---

## 2 · Camino principal: el v3 a la raíz

Resultado esperado: las 20 URL vivas responden 200 con el v3, sin una sola redirección nueva
(`brief-de-obra.md:96` y `:123-124`). `/trabajo/` es la única URL nueva. `/privacidad/` y
`404.html` siguen siendo los HTML estáticos. `/v3/*` redirige a la raíz. Tabla completa en
el anexo A.

**Dónde se corre.** En una sesión en la nube, por dos razones: el script usa `sed -i` de GNU
(en el Mac, `sed -i` es BSD y se comporta distinto) y el PR se abre con `gh`, que no está en
el Mac (CLAUDE.md, «Git workflow»). Lo construye Diego. Lo revisa Javiera en un subagente
limpio. Cada commit se describe en el §7 de `spec-visual.md` al final (P15).

**Con qué Node.** Producción compila con Node 20 (`.nvmrc`, P0.1). En la nube hay uno en
`/opt/node20`: `PATH=/opt/node20/bin:$PATH npm run build`. Con nvm: `nvm use`. El ensayo corrió
en Node 22.22.0; después se compiló el árbol final con Node 20.20.0 y con Node 22.22.0, y los
dos `dist` salieron idénticos byte a byte (`diff -rq`, sección 9).

**`npm ci` solo en un clon limpio.** En un clon nuevo, `npm ci` es lo correcto (P3, 4.1). En
una copia de ensayo con `node_modules` enlazado (el protocolo de worktrees enlaza el
`node_modules` del repo principal), `npm ci` borra el `node_modules` compartido. Ahí se salta.

**Orden de los commits.** Seis commits en una rama propia, empujados juntos:

| Commit | Qué | Pasos | Build esperado (ensayado) |
|---|---|---|---|
| 0 | Merge de `origin/main` | P3 | 27 páginas |
| 1 | Maquetas fuera del build | P4 | 23 |
| 2 | Retira el v2 | P5 | 21, todas bajo `/v3/`, sin `dist/index.html` |
| 3 | El v3 sube a la raíz | P6 | 21 en la raíz |
| 4 | Señales: redirecciones, sitemap, llms.txt, fecha | P9 a P12 | 21 |
| 5 | Limpieza que no cambia el HTML servido | P13 y P14 | 21 |

Los commits 2 y 3 van separados por una razón: si van juntos, git registra
`src/pages/index.astro` y `nosotros.astro` como modificados (v2 → v3) y no como renombres, y
el historial del v3 se pierde para `git log --follow` (relevamiento prefijo; el ensayo lo
confirmó: juntos salen como `M`). El commit 2 solo deja la raíz sin páginas, así que **nunca
llega a main sin el 3**.

**Cómo se cierra cada commit del 1 al 5** [ensayado]. `git mv` y `git rm` dejan su cambio en el
index, pero las ediciones con `sed`, en `tailwind.config.mjs`, `verificar.mjs`, el sitemap,
`llms.txt` y la fecha no. Un `git commit` a secas se las salta. Error que eso produce: el commit 3
quedaría con los renombres y los imports `../../` viejos, y el build se rompe justo en ese
commit. Por eso cada commit se cierra así, desde la raíz del repo:
```bash
git add -A -- spindlelab-astro ':(exclude)spindlelab-astro/node_modules'
git add -A -- marketing/oficina/obras-web/spindlelab-v3/maquetas     # solo en el commit 1
git status --short     # vacío. En una copia con node_modules enlazado queda solo «?? spindlelab-astro/node_modules»
(cd spindlelab-astro && npm run build)    # da lo de la tabla de arriba
git commit -m "…"
```
- **Por qué la exclusión:** `spindlelab-astro/.gitignore:6` dice `node_modules/`, con barra, y
  eso no calza con un enlace simbólico. Sin la exclusión, `git add -A` subiría el enlace
  (ensayo: salía `?? spindlelab-astro/node_modules`; con la exclusión, 0 archivos de
  `node_modules` en el index). `.wrangler/` ya está ignorado (`.gitignore:14`, en la raíz).

### 2.0 Antes de tocar código

**P0.1 · Confirmar cómo construye producción** · Ramón, en el panel · [sin ensayar: es el panel de Cloudflare]
- La configuración de build no está en el repo: `git ls-tree -r --name-only origin/main | grep -iE 'wrangler|_routes'` no trae nada (rutas).
- Lo que calza con el HTML servido (22 de 22 páginas iguales al build Astro de main, rutas): proyecto Pages **«spindlelab-v2»**, rama de producción `main`, directorio raíz `spindlelab-astro`, comando `npm run build` (`package.json:8`, que es `astro build`), salida `dist` (`astro.config.mjs` no cambia `outDir`), Node 20 (`.nvmrc`).
- Hay un tercer build que nadie documentó: «Workers Builds: spindlelab». Pasa en main y falla en toda rama que no es main (rutas: 1b064bf, 7b60c6c, 215d2de, 0429797, ce4b127, 4bdd093, 4bd86cb). No lo causa el v3. La evidencia dice que no sirve spindlelab.cl.
- **Verifica:** captura de Settings > Builds de spindlelab-v2 con esos cinco valores, y captura de Domains & Routes del Worker «spindlelab» sin spindlelab.cl. Si algo no calza, se para.

**P0.2 · Aplicar R2 en todos los lugares a la vez** · Diego, en la rama de la obra · solo tras la respuesta de Ramón · [sin ensayar: depende de R2]
- Archivos: los de G2, más `public/llms.txt:13` y `:18` (eso va en P11). Si R2.1 es «no», se anota la excepción en `capacidad-servicios.md:55` (lo hace la troncal).
- **Verifica:** después del build, `grep -rhoi -E 'quincen|cada mes|mes a mes|al mes' dist/v3` muestra una sola cadencia para el Acompañamiento. Parsear el JSON-LD de `/v3/metodo/` (HowToStep 4) y las Offer de `acompanamiento-mensual` y `visibilidad-en-ia`.

**P0.3 · Pase de voz de Clara (E8)** · Clara, después QA exprés de Javiera en contexto limpio · [sin ensayar: es copy]
- Con `voz-spindlelab` sobre el copy nuevo del v3, más P86. No toca el hero del 10-oct, la bio, los «acá» ni los cuerpos de artículo (`pendientes-traspaso-revisados.md:237-241`).
- **Verifica:** fila en el §7 de la spec con el pase y el veredicto firmado de Javiera. El barrido de la raya en el texto visible sigue en 0.
- **Hecho el 14-oct, en `f0d911c`** (el último commit de la aplicación; la aplicación son `3877e51`, `2dbaa09` y `eaa0c33`, sobre la migración `28c5d85`). Javiera lo aprobó en la ronda 2 (`e8/acta-qa-E8.md`, `ad7fea5`). En el §7 de la spec quedaron tres filas del 14-oct: el cierre de las transitorias, el pase y el veredicto. La raya sigue en 0 en el texto visible y en el JSON-LD. P86 entró en el pase (fila 983). Lo que dejó para Ramón está arriba en `e8/e8-antes-despues.md` y va en P0.4.

**P0.4 · Lectura de aprobación de Ramón** · Ramón, sobre la vista previa de la rama de la obra · [sin ensayar: es la lectura de Ramón]
- URL: https://claude-magical-franklin-ckfk.spindlelab-v2.pages.dev/v3/ (el ensayo la midió con curl: 200, con `x-robots-tag: noindex`; `/v3/a/` también da 200 ahí, y eso lo saca P4).
- Incluye Raigal (`ficha.md:90`), singular o plural en la bio y, en raíz, el `llms.txt` que redacte Clara (P11).
- Incluye también lo que dejó E8: las diez confirmaciones sobre texto ya aplicado que abren `e8/e8-antes-despues.md` (la 9 con la propuesta de Clara para la frase de la prueba de Trabajo, la 10 con el descuadre de su fila de dos) y, antes de publicar, el chequeo de la Ley 21.719 corrido otra vez sobre la vista previa para la frase del 100. Medido el 14-oct: la vista previa da 200 con `x-robots-tag: noindex` en `/v3/` y ya sirve `f0d911c`.
- **Verifica:** casilla de `ficha.md:90` marcada y fila «aprobado por Ramón, fecha» en el §7 de la spec.

### 2.1 Preparación

**P1 · Sincronizar y abrir la rama del corte** · Diego · [ensayado]
```bash
git fetch origin main claude/magical-franklin-ckfki2
git ls-remote origin refs/heads/claude/magical-franklin-ckfki2   # tiene que dar el mismo hash que:
git rev-parse origin/claude/magical-franklin-ckfki2
git diff --stat 1b064bf origin/claude/magical-franklin-ckfki2 -- spindlelab-astro   # qué cambió en el sitio desde el ensayo
git switch -c claude/v3-publicacion origin/claude/magical-franklin-ckfki2
```
- **Por qué una rama aparte:** la vista previa de la rama de la obra es la que Ramón lee para aprobar. El corte mueve todo a la raíz y esa vista previa cambiaría. La rama nueva tiene su propia vista previa en el proyecto spindlelab-v2 [sin ensayar: necesita push. El nombre exacto del alias sale en el check «Cloudflare Pages: spindlelab-v2» del commit, `gh api repos/rvalleespin/spindlelab/commits/<sha>/check-runs`].
- En el ensayo: `ls-remote` y `rev-parse` dieron el mismo hash, main `34c063e`, `merge-base` `b5f4b2f`, 31 commits adelante y 0 en `spindlelab-astro`. Se trabajó en detached en vez de abrir la rama, a propósito, para no crear ramas en un ensayo.
- **Verifica:** `git log -1 --format=%h` da el HEAD de la rama de la obra ese día (el mismo de `ls-remote`), no un hash escrito acá. El diff contra `1b064bf` en `spindlelab-astro/` trae solo lo de P0.2 y P0.3. Si trae otra cosa, se para y se vuelve a ensayar (G7).

**P2 · /privacidad/** · decisión de Ramón, sin esperar a R1 · [ensayado: la mezcla, no el build con `ab741bc` dentro]
- El arreglo ya existe en `origin/claude/arreglos-accesibilidad-sitio-vivo` (`ab741bc`): el segundo h1 pasa a h2 y los dos grises suben a alfa .66 (5,46:1). También aclara el token `fg-faint` (de `#6B7580` a `#828C9B`), que solo usa el Hero v2. Toca `public/privacidad/index.html` y `tailwind.config.mjs`. Sale limpio contra main (`git merge-tree` → `252e286`) y contra la rama del v3 (→ `84ecbc1`).
- En el ensayo: `ab741bc` no está en main (`git merge-base --is-ancestor` falla). `git merge-file` de sus dos archivos contra el estado final del corte, con base `ffdb57c`: 0 conflictos. **Puede entrar antes o después del corte.**
- **Camino recomendado:** que entre a main antes, por su propio PR (5.1). P3 lo trae.
- **Si no entró:** `/privacidad/` sale igual que hoy, y `npm run verificar` la reporta. En la sección 4 se excluye con su nombre y una nota.
- `ab741bc` no arregla las píldoras de `/privacidad/` (salen de `style.css` v2). Con `--sin-pildoras` hay que excluirla igual (4.2).
- Los documentos de la obra todavía la dan por pendiente (`pendientes-traspaso-detalle.md:295-296` y `:570-571`, R8 en `pendientes-traspaso-revisados.md:150-151`). Nadie la rehace.

**P3 · Commit 0 · Traer main** · Diego · [ensayado sobre 34c063e]
```bash
git merge --no-ff origin/main -m "Trae main antes de publicar el v3"
git diff --name-only --diff-filter=U        # tiene que salir vacío
git diff --name-only HEAD^1 HEAD -- spindlelab-astro   # tiene que salir vacío: main no trae nada del sitio
cd spindlelab-astro
npm ci                                       # solo en un clon limpio (ver «npm ci solo en un clon limpio»)
PATH=/opt/node20/bin:$PATH npm run build     # Node 20, como producción
npm run verificar -- --prefijo /v3/ --ancho 390 --sin-pildoras
```
- Merge, nunca rebase ni squash (CLAUDE.md, «Git workflow»).
- Ensayado: «Automatic merge went well», `diff-filter=U` vacío, 25 archivos de main (marketing/ y ventas/) y 0 bajo `spindlelab-astro`, `git write-tree` → `6a41b83`, «27 page(s) built», «21 página(s) revisadas a 390px de ancho. Sin hallazgos.».
- **Si hay conflicto:**
  - En `spindlelab-astro/`: se para. Alguien tocó el sitio en main y hay que volver a medir.
  - En `marketing/portafolio/README.md` o `02-aplomo/sitio/index.html`: entró a main una de las ramas de portafolio, que el v3 ya superó. Gana la versión del v3 (la de `4b2352d`, con «A plomo » y el espacio antes del `<br>`).
  - En `ventas/proyectos-en-curso.md:16`: gana la línea «CONCEDIDO» de `75bfffc`, byte a byte.
- **Ojo:** el clon es superficial. Si `git merge-base` sale vacío o distinto de `b5f4b2f`, no se concluye nada: `git fetch --deepen=200 origin` o la API (`gh api repos/rvalleespin/spindlelab/compare/main...claude/v3-publicacion`).

### 2.2 Maquetas fuera (vale también con prefijo)

**P4 · Commit 1 · Maquetas, su imagen y lo que solo ellas usan** · Diego · [ensayado]
```bash
cd spindlelab-astro
M=../marketing/oficina/obras-web/spindlelab-v3/maquetas
mkdir -p "$M"
git mv src/pages/v3/a.astro src/pages/v3/b.astro src/pages/v3/c.astro src/pages/v3/maqueta-inicial.astro "$M"/
git mv src/components/HeroV2.astro "$M"/
git mv public/mockup-interno/proyecto-bernardo.png "$M"/
rmdir public/mockup-interno      # git no guarda carpetas vacías, pero Astro copiaría la vacía a dist
```
- Un README de tres líneas en `maquetas/`: qué son, que construían hasta el commit `1b064bf` y que sus renders están en `marketing/exploracion-rebranding-webdev/renders/02-05` y `10-15`. Es archivo nuevo: entra con el `git add` del cierre del commit. En el ensayo se escribió con el marcador `[ENSAYO]`; el día real va sin marcador.
- **No sirve renombrarlas con guion bajo** (`_c.astro`): Astro no las publica, pero Tailwind sigue leyendo `src/**` (`tailwind.config.mjs:3`) y las 6 reglas `tinta-galeria` vuelven al CSS de las 21 páginas (probado, archivos).
- En el mismo commit (números de línea de hoy, antes de tocar nada):
  - `tailwind.config.mjs`: quitar `tinta` (:24), `pluma` (:26), `tinta-galeria` con su comentario (:28-34), la fuente `texto` (:94) y su mención en el comentario de :87-88, y `fluid-xl` y `fluid-2xl` (:101-102). Solo los usaban las maquetas y HeroV2 (archivos).
  - `tailwind.config.mjs`, comentarios que esas bajas dejan falsos (el ensayo los encontró; la versión anterior de la lista no los nombraba): `:52-58` (el bloque V3 explica `noche` contra `'tinta-galeria'`, que ya no existe), `:60-61` («Tinta (#131A22…) baja a SUPERFICIE», sin token debajo) y el bloque `fontSize` completo (:97-103), que queda vacío con su comentario de «Escala fluida» (:98-100). Se reescribe el de `:52-58` sin nombrar el token borrado, y se borran `:60-61` y el bloque `fontSize`.
  - `scripts/verificar.mjs:56-60`: `EXCLUIR` por defecto vacío, con el comentario corregido. Y `:32` («`--excluir ''` incluye también las maquetas archivadas»): las maquetas ya no están en `dist`.
- **Verifica** [ensayado]:
  - `npm run build` da 23 páginas (21 v3 más `/` y `/nosotros/` del v2).
  - `ls dist/v3/a dist/mockup-interno` falla.
  - `grep -c tinta-galeria dist/_astro/*.css` da 0 en todos (ensayo: 0 en los 6 CSS).
  - `cmp` de cada archivo de `dist/_astro` antes y después de tocar `tailwind.config.mjs`: idénticos (ensayo: 13 de 13).
  - `npm run verificar -- --prefijo /v3/` a 390 y a 1440: «Sin hallazgos».
  - `grep -n "tinta-galeria\|SUPERFICIE\|Escala fluida\|maquetas archivadas" tailwind.config.mjs scripts/verificar.mjs` da 0 líneas [sin ensayar: el ensayo encontró esos comentarios y los dejó; en su árbol final siguen en `tailwind.config.mjs:45`, `:51`, `:87` y `verificar.mjs:32`].
- Registro [sin ensayar: es registro, no se ensaya]: fila nueva en el §7 de la spec, que supera la de `spec-visual.md:284` («quedan como su registro interno, con noindex»), y una nota fechada en `marketing/exploracion-rebranding-webdev/tres-direcciones.md`, bajo `:25-26`, sin reescribirla.

### 2.3 El corte

**P5 · Commit 2 · Retirar el v2 que ocupa las rutas del v3** · Diego · [ensayado]
```bash
cd spindlelab-astro
git rm src/pages/index.astro src/pages/nosotros.astro
git rm -r public/blog public/servicios public/contacto public/diagnostico public/metodo
```
- Son **2 páginas Astro y 18 HTML estáticos** (8 de blog, 7 de servicios, contacto, diagnostico y metodo). No 20: los 20 de `public/` incluyen `privacidad/` y `404.html`, que se quedan (corrige la cifra de R1 en `pendientes-traspaso-revisados.md:58-59`).
- **No basta con que el build los pise.** Si un HTML de `public/` comparte ruta con una página Astro, `astro build` lo pisa sin avisar, pero `astro dev` sirve el estático v2. Cualquier revisión local quedaría engañada (probado con `/metodo/`, rutas).
- **Se quedan, sí o sí:** `public/404.html` (sin él, Pages trata el sitio como SPA y responde 200 con la home a cualquier URL; probado con `wrangler pages dev`, rutas), `public/privacidad/`, `public/js/consent-banner.js` (sin él el aviso se ve y no hace nada, y GA4 y el Pixel nunca cargan; integraciones), `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `llms.txt`, `functions/`, `/assets/css/style.css`, `/assets/fonts/Gabarito.woff2` y `/assets/js/site-header.js` (los piden privacidad y 404), `/fonts/inter*` y `/fonts/OFL-Inter.txt`, los favicons, `og-marca.jpg` (valor por defecto de `Layout.astro:22`), `ramon-vallejos.jpg` y `favicon-512.png` (JSON-LD).
- **Mismo commit, huérfanos grupo A** (lo que solo pedía el v2 y la spec prohíbe en el v3, `spec-visual.md:114-117`). Salen por defecto. Si Ramón dijo «no se borra nada», este bloque se salta y no rompe nada:
```bash
git rm public/video/{metodo,problema,evidencia-oficina,servicios-oficina,evidencia-medicion,servicios-capas}.{mp4,jpg}
git rm public/assets/js/hero-bg-video.js
git rm public/assets/img/{hero-acompanamiento,hero-auditoria-seo,hero-blog,hero-contacto,hero-desarrollo-web,hero-edificios,hero-metodo,hero-servicios,hero-visibilidad-ia,equipo-creativo,estrategia-mesa}.jpg
```
  En el repo no hay ninguna referencia absoluta a estos archivos fuera del sitio (rutas, archivos). El ensayo lo volvió a medir: 0 referencias fuera de los componentes v2 (grep sobre `dist/v3`, 404, privacidad, `src`, `js` y `css`). Se borran en este commit y no antes: hoy los pide el v2 vivo.
- **Grupo B, espera a Ramón** (no se toca acá): `hero-hilo-de-oro.mp4` y `/video/hero-hilo-de-oro.jpg` (el único video que permite `spec-visual.md:121`, y el manual lo nombra en `manual-de-marca.md:402`), `og.jpg` y `logo-spindlelab.png`. Ver sección 8.
- **Verifica** [ensayado]: `find public -name '*.html'` da exactamente `public/404.html` y `public/privacidad/index.html`. `git show --stat HEAD` muestra 44 archivos borrados: 20 de página y 24 del grupo A (12 de video, 1 js y 11 jpg). El build da 21 páginas, todas bajo `/v3/`, y no existe `dist/index.html`.

**P6 · Commit 3 · El v3 sube a la raíz** · Diego · [ensayado]

Antes de correrlo, guardar el build con prefijo para comparar (P7):
```bash
cd spindlelab-astro && npm run build && rm -rf /tmp/dist-antes && cp -r dist /tmp/dist-antes
```
El corte (bash, GNU sed):
```bash
#!/usr/bin/env bash
# Corre en spindlelab-astro/ de la rama claude/v3-publicacion, después del commit 2.
set -euo pipefail
# 1. Las 11 plantillas suben un nivel (git mv, para que queden como renombres)
for x in src/pages/v3/*; do git mv "$x" src/pages/; done
rmdir src/pages/v3
# 2. Imports relativos un nivel menos: 52 líneas en las 6 de primer nivel...
for f in src/pages/*.astro; do sed -i "s#'\.\./\.\./#'../#g" "$f"; done
# ...y 42 en blog/ y servicios/, incluidos los 3 import.meta.glob de blog/[slug].astro
for f in src/pages/blog/*.astro src/pages/servicios/*.astro; do sed -i "s#'\.\./\.\./\.\./#'../../#g" "$f"; done
# 3. Prefijo: solo /v3/ pegado a comilla simple, doble o backtick.
#    No toca los imports de components/v3/ (ahí /v3/ va después de una letra) ni la prosa.
grep -rlE "['\"\`]/v3/" src | xargs sed -i -E "s#(['\"\`])/v3/#\1/#g"
# 4. noindex fuera de las 11 plantillas
for f in src/pages/*.astro src/pages/blog/*.astro src/pages/servicios/*.astro; do
  sed -i '/name="robots" content="noindex, nofollow"/d' "$f"
done
```
Después: el cierre del commit (sección 2, «Cómo se cierra cada commit»). Sin el `git add -A`,
los pasos 2 a 4 no entran al commit 3.
- **Por qué el reemplazo va anclado a la comilla:** un reemplazo ciego de `/v3/` también reescribe `components/v3/` y rompe el build. Error real del relevamiento: `Could not resolve "../components/NavV3.astro" from "src/pages/trabajo.astro"` (rutas).
- **Qué toca el paso 3:** 81 líneas en 15 archivos (`grep -rnE "['\"\`]/v3/" src | wc -l` da 81 hoy). 80 son funcionales en 14 archivos (`consts-v3.ts`, `NavV3.astro`, `oferta-v3.json` y las 11 plantillas) y 1 es el comentario de `Miga.astro:15`, que queda bien con el cambio.
- **Canonical, og:url y JSON-LD no se tocan:** canonical y og:url salen de `Astro.url` (`Layout.astro:28`, `:169`, `:176`). El JSON-LD de las 21 ya trae URL de producción (0 «/v3/» dentro de ld+json, P70).
- **Verifica** [ensayado: el script corrió tal cual, exit 0; imports 52 + 42; noindex fuera de 11]:
  - `npm run build` termina con «21 page(s) built»: `/`, `/trabajo/`, `/metodo/`, `/nosotros/`, `/diagnostico/`, `/contacto/`, `/blog/` y 7 posts, `/servicios/` y 6 servicios. Ninguna con `/v3/`.
  - `grep -rnE "['\"\`]/v3/" src | wc -l` da 0 (ensayo: 81 → 0).
  - `grep -ro '/v3/' dist --include=*.html | wc -l` da 0 (ensayo: 811 → 0; los 811 eran 767 href, 42 canonical y og:url, y 2 `data-contacto`).
  - `grep -rl 'name="robots"' dist` da solo `dist/404.html`.
  - `git show --stat -M HEAD` muestra `src/pages/{v3 => }/…` como renombres (ensayo: `git diff-tree -M` entre los árboles del commit 2 y del 3 da 11 renombres, de R093 a R097).

**P7 · Comprobar que el corte no cambió nada más que la ruta** · Diego · [ensayado]

Cinco comparaciones del código fallan **en silencio** si el prefijo se quita a medias, y ninguna rompe el build (prefijo):

| Dónde | Si queda mal |
|---|---|
| `NavV3.astro:46` (SECCIONES) | Servicios y Blog pierden `aria-current="true"` |
| `servicios/[slug].astro:412` | El «Siguiente» de los 5 servicios apunta siempre a Desarrollo web |
| `servicios/[slug].astro:179` | Una página de servicio se enlaza a sí misma |
| `trabajo.astro:96` | Desaparece «Desde $390.000» del cierre de Trabajo |
| `contacto.astro:246` | «Escríbenos» del módulo, el menú y el pie recarga contacto y puede borrar lo escrito |

Por eso la puerta no es el build: es comparar el HTML de antes y de después, página por página,
con `comparar.py` (anexo B):
```bash
python3 comparar.py /tmp/dist-antes dist     # 21 líneas, todas con html_igual=True y css_identico=True
```
- Si alguna sale `False`, se abre el diff de esa página y se corrige antes de seguir.
- **`css_identico` necesita normalizar el `data-astro-cid` también en el CSS.** Astro calcula ese id con la ruta del archivo, y la ruta cambia con el corte. Con la versión anterior del script, el ensayo dio `css_identico=False` en 10 de 21 (trabajo, los 7 posts y contacto) aunque el CSS era el mismo. Con la normalización (anexo B, ya incluida): 21 de 21.
- A mano, como respaldo (en el ensayo dio así): en un servicio, el «Siguiente» va al servicio que sigue y el menú marca Servicios (`aria-current` en `/servicios/`); «$390.000» está en `/trabajo/`. En `/contacto/`, el cambio de los 4 enlaces a `#contacto-form` lo hace el JS en el navegador (`contacto.astro:246`): **en el HTML no se ve**. Se comprueba en el DOM, con `ensayo-dia1.mjs` (4.5; el ensayo midió `aAncla=4`).

**P8 · Canonical, og:url y JSON-LD después del corte** · Diego · [ensayado]
```bash
cd dist && for f in $(find . -name index.html); do
  r=${f#.}; r=${r%index.html}; u="https://spindlelab.cl$r"
  c=$(grep -o '<link rel="canonical" href="[^"]*"' "$f" | sed 's/.*href="//;s/"$//')
  o=$(grep -o '<meta property="og:url" content="[^"]*"' "$f" | sed 's/.*content="//;s/"$//')
  [ "$c" = "$u" ] && [ "$o" = "$u" ] || echo "MAL $r canonical=$c og=$o"
done; cd ..
python3 - <<'PY'
import re,json,glob
bad=0; n=0
for f in glob.glob('dist/**/index.html',recursive=True):
    for b in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>',open(f,encoding='utf-8').read(),re.S):
        n+=1
        try:
            json.loads(b)
            if '/v3/' in b: print('V3',f); bad+=1
        except Exception as e: print('ROTO',f,e); bad+=1
print('bloques',n,'problemas',bad)
PY
```
- **Verifica:** el bucle no imprime ningún «MAL» (`/privacidad/` trae su canonical propio; `404.html` no tiene y no entra al bucle). El script de Python termina en «problemas 0». Ensayo: 22 páginas sin «MAL», privacidad incluida; «bloques 43 problemas 0».

### 2.4 Señales

**P9 · Commit 4 · `_redirects`** · Diego · [ensayado]

`spindlelab-astro/public/_redirects` queda así:
```
/indice/  /diagnostico/  301
/indice   /diagnostico/  301
/v3       /              301
/v3/*     /:splat        301
```
- Las dos de `/indice` se quedan (`public/_redirects:1-2`).
- `/v3/*` nunca existió en spindlelab.cl (hoy da 404). La regla sirve para los enlaces de vista previa que se hayan compartido: el alias de rama redirige a la raíz con el próximo push. Las maquetas terminan en 404 (`/v3/a/` → `/a/` → 404).
- **Las 20 URL vivas no reciben ninguna redirección** (`brief-de-obra.md:123-124`).
- **301 y no 302:** el v2 tampoco tiene nada en `/v3/`, así que si hay vuelta atrás (sección 7), un 301 guardado en un navegador cae igual en la página v2 de la misma ruta.
- `www.spindlelab.cl` no redirige al apex y desde `_redirects` no se puede: Pages redirige por ruta, no por host. Se hace con Bulk Redirects en el panel (sección 8). El corte no lo arregla ni lo empeora.
- **Verifica:** wrangler dice «Parsed 4 valid redirect rules» (ensayo). Anexo A con wrangler (sección 4.4).

**P10 · Commit 4 · `sitemap.xml`** · Diego, revisa Simón · [ensayado con la fecha marcador 2026-10-20]
- 21 URL: las 20 de hoy más `/trabajo/`. `lastmod` de todas en la fecha del corte, porque las 20 cambian de contenido. Sin `/v3/`. `/privacidad/` sigue fuera, como hoy, salvo que Ramón diga otra cosa. Es estático: no hay `@astrojs/sitemap` (`astro.config.mjs:25`).
- **Antes del commit 4, Simón decide el `lastmod` de los 7 posts** [sin ensayar: es decisión]. El sitemap de abajo les pone la fecha del corte, pero el `dateModified` de su JSON-LD sigue en `2026-08-25` en 6 posts y en `2026-09-08` en `21-chequeos-visibilidad-ia` (`src/data/blog-v3/*.json:8`). Son dos señales distintas para la misma URL. Opciones: `lastmod` igual al `dateModified` real de cada artículo (cambió el diseño, no el texto), o subir los `dateModified` a la fecha del corte. Lo que no puede quedar es la diferencia.
- Contenido (cambiar `AAAA-MM-DD` por la fecha de R1):
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://spindlelab.cl/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/trabajo/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/nosotros/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/desarrollo-web/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/visibilidad-en-ia/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/auditoria-seo-tecnica/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/acompanamiento-mensual/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/redes-sociales/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/servicios/paid-media/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/metodo/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/diagnostico/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/21-chequeos-visibilidad-ia/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/como-elegir-verificar-agencia-aeo-geo-chile/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/como-aparecer-en-chatgpt/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/seo-tecnico-fintechs-chile/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/que-es-aeo-geo/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/cuanto-cuesta-seo-tecnico-chile/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/blog/que-es-un-mini-diagnostico-seo/</loc><lastmod>AAAA-MM-DD</lastmod></url>
  <url><loc>https://spindlelab.cl/contacto/</loc><lastmod>AAAA-MM-DD</lastmod></url>
</urlset>
```
- **Verifica:** `grep -c '<loc>' public/sitemap.xml` da 21; `python3 -c 'import xml.dom.minidom,sys; xml.dom.minidom.parse(sys.argv[1])' dist/sitemap.xml` no da error; cada `<loc>` tiene su `dist/<ruta>/index.html` con `class="d-body` (sin cerrar la comilla: la home lleva `class="d-body d-home"`, `index.astro:178`). Ensayo: 21 de 21 con `class="d-body`; con `class="d-body"` literal da 20 de 21 y parece una falla que no es. `grep AAAA public/sitemap.xml` da 0.

**P11 · Commit 4 · `llms.txt`** · redacta Clara, revisa Simón, aprueba Ramón (en la lectura de P0.4) · [sin ensayar: el copy. La mecánica sí, con marcadores]
- En el mismo commit del corte, nunca después: si no, `llms.txt` sigue afirmando lo que el sitio ya no dice. En el corte ensayado, «agencia de marketing con IA» y «cinco preguntas fijas» quedan solo en `llms.txt`; ninguna página las dice (rutas).
- Qué cambia:
  - `:5`: el posicionamiento posterior al giro del 29-sep (sin «agencia de marketing con IA»).
  - `:13`: sale el protocolo de cinco preguntas. El chequeo se describe como lo publica el `/diagnostico/` del v3. La cadencia, la que salga de R2.
  - `:16-21`: los servicios con el orden y los nombres de `SERVICIOS_V3` (`src/consts-v3.ts:17-24`): Desarrollo web primero. `:18` sin «share of voice mes a mes» si R2.1 lo saca.
  - «Sobre» (`:32-35`): se suma `/trabajo/`.
  - Los 7 posts de `:23-30` quedan igual (mismas URL). La sección se llama «Blog», como en el v3, si Ramón lo aprueba.
- En el ensayo se pusieron marcadores `[ENSAYO]` en `:5`, `:13` y `:18`, el orden de `SERVICIOS_V3`, «## Blog» y `/trabajo/` en Sobre. Los tres greps de abajo dieron 0, 0 y 2, y las 18 URL que nombra dieron 200 en wrangler. El día real, `grep -c '\[ENSAYO\]' public/llms.txt` tiene que dar 0.
- **Verifica:** `grep -ci 'agencia de marketing con IA' public/llms.txt` y `grep -ci 'cinco preguntas fijas' public/llms.txt` dan 0. `grep -c 'trabajo' public/llms.txt` da 1 o más. Cada URL que nombra responde 200 en `wrangler pages dev` (sección 4.4).

**P12 · Commit 4 · Fecha de la home y `robots.txt`** · Diego · [ensayado con la fecha marcador 2026-10-20]
- `src/pages/index.astro:169` (hoy `dateModified: '2026-10-06'`, antes `src/pages/v3/index.astro:169`) pasa a la fecha del corte, como pide su comentario de `:154-155`.
- `robots.txt`: **sin cambios obligatorios**. No se agrega `Disallow: /v3/`: impediría a los buscadores leer el 301. Opcional, por coherencia con el `/diagnostico/` del v3: grupos para Claude-SearchBot, Claude-User, Perplexity-User y CCBot (el grupo `*` ya los deja pasar). El ensayo lo dejó sin cambios.
- **Verifica:** el JSON-LD de `dist/index.html` trae `dateModified` con la fecha del corte (ensayo: lo trae). `/api/chequeo?dominio=spindlelab.cl` deja en ok los 4 ítems de acceso después del deploy (hoy lo están). Adelantado en local: `chequear()` de producción contra el build servido da 83, con los ítems de acceso en ok y `sameas`, `faq` y `preguntas` en falla (R7).

### 2.5 Limpieza (no cambia lo que se sirve)

**P13 · Commit 5 · Código que quedó idéntico o muerto** · Diego · [ensayado]
- Antes, guardar el build del commit 4: `npm run build && rm -rf /tmp/dist-commit4 && cp -r dist /tmp/dist-commit4`.
- `src/pages/blog/[slug].astro:131-137` (comentario en `:131-133`, código en `:134-137`): el bloque `RUTAS` y la cadena `.replace` pasan a ser la identidad después del corte. Queda `const cuerpo = prosa;` y se corrige su mención en `:21`.
- `src/pages/servicios/index.astro:67`: `it.href.replace('/', '/')` es un no-op; queda `.map((it: any) => it.href)`.
- Borrar los 11 componentes v2 que quedan sin importador: `git rm src/components/{Contacto,Evidencia,Faq,Footer,Hero,Icon,Metodo,Nav,Nosotros,Problema,Servicios}.astro` (HeroV2 ya salió en P4).
- `src/consts.ts`: quitar `CONTACTO`, `MAILTO` y `NAV_LINKS`. **`EMAIL` se queda** (la usan `FooterV3.astro:14` y `contacto.astro:38`).
- **Verifica:** `ls src/components` da solo `v3/`. Build sin errores. `comparar.py` contra el build del commit 4 (forma del anexo B): 22 de 22 con `html_igual=True` (ensayo: 22 de 22). El CSS externo por página baja (ensayo: home de 49.370 a 38.183 B; un post de 53.070 a 41.883 B).

**P14 · Commit 5 · Comentarios que quedan falsos** · Diego · [ensayado]
- Los comentarios con `/v3/` en prosa: 40 en 11 archivos dentro de las plantillas, más `driftime.css:337` y `:375` y `public/assets/js/v3-chequeo.js:16-17` (relevamiento prefijo, sección 1.B).
- Las rutas de archivo con `src/pages/v3/` en comentarios, que la versión anterior de la lista no contaba: `index.astro:8` (la receta de `git log --follow` pasa a la ruta nueva), `metodo.astro:5`, `servicios/index.astro:6-7` y `trabajo.astro:6-7`. Y la `_nota` de `data/paginas-v3.json:268`, que nombra `src/pages/v3/servicios/index.astro` y además `public/servicios/index.html`, que P5 borra.
- `src/pages/index.astro:24-25` («noindex se mantiene») y `servicios/[slug].astro:12` (dice que conserva el noindex).
- `src/consts-v3.ts:1-9`: la cabecera dice «Rutas de la MAQUETA v3» y explica por qué existe aparte de `consts.ts`. Pasa a decir que son las rutas del sitio.
- `astro.config.mjs:4-19`: el middleware solo-dev reescribe `/(blog|servicios|metodo|contacto|diagnostico|privacidad)/` a `index.html` de `public/`. Queda solo `privacidad`. No afecta el build ni producción, y no estorba (ensayo: `astro dev` sirvió 8 rutas con 200; las v3 con `d-body` y privacidad estática), pero su comentario queda falso.
- `scripts/verificar.mjs:28`: el ejemplo de `--prefijo /v3/`. (Las menciones de `tailwind.config.mjs:30` y `:88` ya no existen: salen en P4.)
- **No se tocan** `public/js/consent-banner.js` (`:13`, `:121`, `:128`) ni `public/fonts/inter.css` (`:2`, `:11`), aunque su conteo de «21 referencias» quede viejo: son archivos de producción con caché larga (`/fonts/*` inmutable un año) y el cambio solo sería de comentario. Se anota en la sección 8.
- **Verifica:**
  - `grep -rnE '(^|[^A-Za-z])/v3/|pages/v3/' src public/assets/js scripts tailwind.config.mjs astro.config.mjs` da 0 líneas. El patrón deja fuera, sin lista de excepciones, los imports de `components/v3/` (ahí `/v3/` va después de una letra) y los nombres `v3-chequeo.js` y `v3-contacto.js`. Hoy da 130 líneas; sobre el árbol final del ensayo, 0 (`git grep` sobre `666bfae`). Sobre todo `spindlelab-astro/`, la única línea que queda es `public/_redirects:4`, que es la regla de P9.
  - La Verifica anterior (`grep -rn '/v3' …`) no sirve: devuelve las 22 líneas de import de `components/v3/` y las del script `v3-chequeo.js`, no «solo nombres de archivo».
  - `comparar.py` contra el build del commit 4: 22 de 22 iguales (ensayo, después de P13 y P14).

### 2.6 Caché

**P15 · Control de caché justo antes del PR** · Diego · [ensayado sobre 34c063e]
```bash
git fetch origin main
git diff --name-status origin/main HEAD -- spindlelab-astro/public | grep -v '^[AD]'
```
- Sin el corte (rama de la obra contra main): 39 «A», 0 «M», 0 «D». Ningún archivo compartido con producción cambió de contenido. Los 39 nuevos nunca se sirvieron en spindlelab.cl (404 con `no-store`, probados uno por uno).
- Con el corte, la salida trae solo `M` de archivos sin caché larga: `sitemap.xml`, `llms.txt`, `_redirects`, y `robots.txt` o `_headers` si se tocaron. Ensayo: 38 A (los 39 menos el mockup), 42 D (18 HTML v2 y 24 del grupo A) y 3 M (`_redirects`, `llms.txt` y `sitemap.xml`).
- Si aparece una `M` bajo `/assets/`, `/fonts/`, `/js/` o un `.mp4`: nombre nuevo, o subir el `?v=` **en todas** sus referencias (regla de `spec-visual.md:256`). Un `.woff2` siempre lleva nombre nuevo: `inter.css`, `manrope.css` y las precargas de `Layout.astro` lo piden sin `?v`.
- Referencias con versión hoy (archivos): `favicon.svg?v=4` (`Layout.astro:185`), `inter.css?v=1` (`:196`), `manrope.css?v=1` (`:203`), `consent-banner.js?v=3` (`:326`, `privacidad/index.html:354`, `404.html:133`), `v3-chequeo.js?v=2` (`index.astro:292`, `diagnostico.astro:227`), `v3-contacto.js?v=2` (`contacto.astro:220`), `hilos.jpg?v=2`.
- Lo que manda hoy spindlelab.cl (curl, archivos): `/_astro/*` y `/fonts/*` un año inmutable; `/assets/*` 7 días; `/*.mp4` 30 días; `/js/*` 4 horas con revalidación (el Browser Cache TTL de la zona pisa el 300 de `_headers:31`); HTML, sitemap y llms.txt `max-age=0, must-revalidate`. En wrangler, las cabeceras del build ensayado calzan con `_headers`.

### 2.7 Layout.astro

**P16 · Layout.astro: solo lo que Ramón autorice en R5** · Diego · [sin ensayar: depende de R5; el ensayo no tocó Layout]
- **Por defecto, en raíz, Layout no se toca.** El de la rama ya trae lo que el v3 necesita (props de OG del 6-oct, Manrope, Lenis). Lo que cambia respecto de main solo afectaba a la home y Nosotros v2, que salen en P5.
- Si R5 autoriza algo, va en un commit aparte, con su verificación:

| Ítem R5 | Archivo:línea | Verifica |
|---|---|---|
| Quitar la precarga de Inter (48 KB por página) | `Layout.astro:195` | `peso.mjs` o DevTools: −48 KB en la primera visita. El aviso posterior a las cookies ya no usa Inter desde el 13-oct (`spec-visual.md:263`) |
| Favicon a trazos (hoy 27 KB por la fuente embebida) | `public/assets/img/favicon.svg`; `?v=5` en `Layout.astro:185`, `privacidad/index.html` y `404.html` | Captura del favicon en la pestaña; P15 no muestra `M` sin `?v` nuevo |
| OG por defecto de `og-marca.jpg` a `og-v3.jpg` | `Layout.astro:22` | Ninguna página v3 usa el valor por defecto (todas pasan `OG_V3`): es cosmético. `og-marca.jpg` igual se queda en `public/` |
| Cargo (`jobTitle`), orden de `makesOffer`, tercer `sameAs` | JSON-LD de `Layout.astro` (`:35` y `:77` son los `@id`, que no cambian) | `python3` del P8: 0 problemas; el `@id` `https://spindlelab.cl/#org` sigue igual (lo cita Verifica y Cumple en vivo) |

### 2.8 Medición antes del merge

**P17 · Línea base, plan de medición y tráfico interno** · Ramón saca los datos; Mauro escribe el plan; la troncal guarda la línea base · [sin ensayar: son datos de GA4, Cloudflare y Gmail]
- **Línea base del v2**, con las mismas rutas: GA4 (`G-J40VW9E0TW`): sesiones, vistas de `/contacto/`, `generate_lead` y `chequeo_completado` de las últimas 4 a 8 semanas. Cloudflare Web Analytics: visitas por ruta (no depende del consentimiento). Gmail: correos «Nuevo contacto desde spindlelab.cl» (cuántos, cuántos con UTM) y correos directos a hola@. Archivo nuevo: `marketing/metricas/linea-base-publicacion-v3.md` (lo escribe la troncal).
- **Plan de medición** (lo que prometía `brief-de-obra.md:175-177`), en la carpeta de la obra:
  - Eventos que existen: `generate_lead {form_id:'contacto'}` y `Lead {content_name:'contacto'}` al enviar el formulario con cookies (`v3-contacto.js:66-67`, igual a producción); `chequeo_completado {puntaje}` (`v3-chequeo.js:117`); `page_view` y `PageView`. No hay evento de clic a contacto ni a mailto, ni en el v2 ni en el v3.
  - Métrica principal propuesta: envíos de Web3Forms por cada 100 visitas de Cloudflare Web Analytics. Ninguna de las dos depende de las cookies.
  - Sesgos que mueven los números sin que cambie la conversión (integraciones): el chequeo sube al hero de la home (`chequeo_completado` va a subir por estructura; se segmenta por `page_location`); los UTM se capturan en todas las rutas (`NavV3.astro:58-68`; antes solo en `/contacto/`); el aviso de cookies se repintó y la tasa de aceptación no se mide; «Escríbenos» fijo en la barra; `?sitio=` en la URL de contacto.
  - La ventana de observación y el criterio de éxito los fija Ramón.
- **Tráfico interno en GA4:** definir la IP de quien prueba y activar el filtro, o dejar escrita la regla de descuento por hora.
- **Verifica:** el archivo de línea base existe con cifras, fuente y ventana, fechado antes del deploy. El plan nombra `generate_lead` y `chequeo_completado`, la métrica principal con numerador y denominador, y una línea por sesgo. El filtro aparece Activo en GA4 o la regla está escrita.

---

## 3 · Si Ramón elige prefijo

**Qué significa.** El v3 se publica en `spindlelab.cl/v3/`, con noindex, al lado del v2 que
sigue en la raíz e indexado. Es la única variante coherente (relevamiento prefijo). Aporta
poco sobre la vista previa que ya existe: solo cambia el dominio.

**Pasos que se corren igual:** P0.1 a P0.4, P1 a P4, P15, P17 (si se va a medir) y las
secciones 4 a 7. Los commits 0 y 1 se cierran igual (sección 2, «Cómo se cierra cada commit»).

**Pasos que no se corren:** P5 a P14 (el v2 se queda, el prefijo se queda, el noindex se
queda). `sitemap.xml`, `robots.txt`, `llms.txt` y `_redirects` no cambian.

**Lo que cambia o se suma** (el ensayo probó 1 y 4, y la verificación del final, sobre el build
después de P4 servido con wrangler):

1. **Noindex también por cabecera.** En `public/_headers`:
   ```
   /v3/*
     X-Robots-Tag: noindex, nofollow
   ```
   [ensayado con `wrangler pages dev`: `/v3/` y `/v3/servicios/paid-media/` la llevan; `/` y `/servicios/` no]. No choca con `/assets/*`: es otra cabecera y otra ruta.
2. **Nada de `Disallow: /v3/`** en `robots.txt`: Google no vería el noindex.
3. **Canonical autorreferente**, como sale hoy de `Astro.url`. No se apunta al v2: canonical hacia otra URL más noindex son señales contrarias.
4. **El merge cambia la home y Nosotros del v2 en vivo**, aunque el v3 siga oculto. `Layout.astro` y `global.css` son compartidos y cambiaron en la rama (97 y 29 líneas contra main). Medido sobre el build de la fusión (main): `/` y `/nosotros/` pasan a cargar Lenis (`hoisted.Bkkmjuy0.js`, 20 KB; `html.class` = «lenis»), las precargas de Gabarito y Manrope más `manrope.css`, el CSS de 20,9 KB a 30,2 KB, y el aviso de cookies con radio de 6 px y compacto en móvil. La única diferencia de píxeles está en la franja del aviso. Los 18 HTML estáticos salen idénticos byte a byte. Eso choca con el brief §8.5 («el sitio en vivo queda intacto»). **Decisión de Ramón:** aceptarlo por escrito, o autorizar (R5) una prop en `Layout.astro` que active eso solo en páginas v3.
   - **Verifica:** `grep -c 'manrope-latin.woff2' dist/index.html dist/nosotros/index.html` (ensayo: 1 en las dos; 0 si se aplica la prop).
5. **R8 no se resuelve solo.** Las frases v2 que no se sostienen siguen vivas sin plazo, y `llms.txt:13` y `:18` ya están en producción. Pasan a ser un arreglo de producción aparte, con visto bueno de Ramón (`pendientes-traspaso-detalle.md`, NUEVO-produccion-veracidad, :761). La respuesta a R2 también toca esas dos líneas de `llms.txt`.
6. **El JSON-LD de `/v3/trabajo/` apunta a `https://spindlelab.cl/trabajo/`**, que con prefijo da 404 (rutas). Con noindex no se indexa; se acepta y se anota.
7. **Huérfanos:** con el v2 vivo, los videos y las fotos v2 se quedan. Opcional, con OK de Ramón (cambia producción): retirar lo que ya es huérfano hoy en producción (las 11 fotos v2, y `evidencia-medicion` y `servicios-capas` con sus portadas; archivos).
8. **Medición:** `/v3/` no recibe tráfico orgánico ni de los enlaces de afuera (bio, posts, Ads siguen cayendo en el v2, donde los UTM solo se capturan en `/contacto/`). Para medir el v3 hay que mandarle tráfico a propósito: URL finales de Ads a `/v3/…`. Se compara en paralelo por `page_location`, no antes y después.
9. **Si después pasa a la raíz:** se corre la sección 2 completa, y la regla `/v3/* /:splat 301` deja de ser opcional.
10. **Centralizar el prefijo** paga solo si el prefijo dura semanas (prefijo): `BASE_V3` y `enV3()` en `consts-v3.ts`, los href de `oferta-v3.json` sin prefijo, el selector de `contacto.astro:246` por `define:vars`, un alias `@/*` en `tsconfig.json`. Puerta: el dist sale idéntico antes y después (`comparar.py`). Para la raíz no hace falta: el sed anclado del P6 hace lo mismo en un paso.

**Variante que no se recomienda:** el v3 para siempre en `/v3/`, con las URL v2 redirigidas
ahí. Choca con `brief-de-obra.md:96` («Las 20 URLs vivas no cambian. Ni un slug») y con
`spec-visual.md:133`, y obliga a 20 redirecciones, sitemap y `llms.txt` con `/v3/`, canonical
indexables en `/v3/` y cambiar los sitelinks de Ads. Si igual se elige: **302, no 301**. Un 301
queda guardado en el navegador sin vencimiento, y si después se vuelve a la raíz con el 301
inverso, quien ya visitó entra en un bucle (archivos).

**Verificación propia del prefijo (después del deploy)** [ensayado en local, con wrangler; en
producción, sin ensayar]: `spindlelab.cl/v3/` responde 200 con meta noindex y `x-robots-tag`;
`/v3/a/` da 404; `/` conserva el título de hoy («Agencia de marketing con IA en Chile»); los 18
HTML estáticos siguen idénticos.

---

## 4 · Verificación antes del merge

Todo sobre el árbol final de la rama del corte, después de P15. Lo corre Diego y lo firma
Javiera en un subagente limpio (la QA exprés de cierre).

**4.1 Build** [ensayado, también con Node 20]
```bash
cd spindlelab-astro
npm ci                                      # solo en un clon limpio; nunca con node_modules enlazado
PATH=/opt/node20/bin:$PATH npm run build    # Node 20, como producción (con nvm: nvm use)
```
- Raíz: «21 page(s) built». Prefijo: «23 page(s) built» (21 v3 más `/` y `/nosotros/`).
- `ls dist/404.html dist/privacidad/index.html dist/_redirects dist/js/consent-banner.js` existen (ensayo: existen).
- Ensayo: el árbol final compiló con Node 20.20.0 («21 page(s) built») y con Node 22.22.0, y `diff -rq` de los dos `dist` no dio diferencias.

**4.2 `npm run verificar` sobre todas las páginas, sin prefijo, a tres anchos** [ensayado]
```bash
for a in 390 768 1440; do npm run verificar -- --ancho $a; done
for a in 390 768 1440; do npm run verificar -- --ancho $a --excluir /privacidad/ --sin-pildoras; done
```
- Mide contraste real, overflow, un h1, JSON-LD, alt y **enlaces internos que dan 404**.
- Raíz, primer bucle: 22 páginas (21 más `/privacidad/`) a cada ancho. Si `ab741bc` no entró (P2), sale con código 1 y **solo** `/privacidad/` reprueba: «2 elementos h1», 3,82:1 y 4,46:1 (ensayo: así, a los tres anchos). Se deja escrito en el acta por qué.
- Raíz, segundo bucle: «21 página(s)… Sin hallazgos.» a los tres anchos y 0 enlaces rotos (ensayo). `/privacidad/` se excluye también aunque `ab741bc` haya entrado: con `--sin-pildoras` suma 2 píldoras a 390 y 10 a 768 y 1440, que salen de `style.css` v2 y que `ab741bc` no toca. Si `ab741bc` entró, el primer bucle tiene que dar 22 sin hallazgos [sin ensayar: nadie compiló con `ab741bc` dentro].
- Prefijo: además `--prefijo /v3/` a los tres anchos («Sin hallazgos» en el ensayo). El barrido sin prefijo marca `/` y `/nosotros/` del v2 (12 y 2 comentarios servidos, y el 3,95:1 que ya documenta `CLAUDE.md:100`) y `/privacidad/`. Se aceptan con nombre.

**4.3 Corte y SEO** (solo raíz) [ensayado]: `comparar.py` 21 de 21 con `html_igual` y `css_identico` (P7) y el P8 sin «MAL» y con «problemas 0».

**4.4 Cada URL contra la tabla, con `wrangler pages dev`** (respeta `_redirects`, `_headers`, `404.html` y `functions/`). Wrangler ya está en `devDependencies` (`package.json`, también en main). [ensayado en esta forma]
```bash
cd spindlelab-astro
P=18740      # puerto propio; 8780, 8791 y 8792 ya los usaron otros
setsid npx wrangler pages dev dist --port "$P" > "${TMPDIR:-/tmp}/wrangler-44.log" 2>&1 &
W=$!         # con setsid, $! es el jefe de un grupo de procesos propio
for i in $(seq 1 40); do [ "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$P/")" = 200 ] && break; sleep 1; done
chk() { printf '%-48s ' "$1"; curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' "http://localhost:$P$1"; }
for u in $(grep -o '<loc>[^<]*' public/sitemap.xml | sed 's#<loc>https://spindlelab.cl##'); do chk "$u"; done
for u in /privacidad/ /no-existe/ /indice /indice/ /v3 /v3/ /v3/blog/que-es-aeo-geo/ \
         /v3/servicios/paid-media/ /v3/a/ /a/ /servicios /index.html "/api/chequeo?dominio=localhost"; do chk "$u"; done
kill -- -"$W"; sleep 2      # mata el grupo entero: npx, wrangler, esbuild y workerd
curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:$P/"    # tiene que dar 000
```
- **Por qué `setsid` y `kill -- -$W`:** con `npx … &` y `kill $W`, `$!` es el PID de npx. wrangler y workerd quedan vivos sirviendo el puerto (ensayo, en 18769: 200 después del `kill`). Con el grupo propio, el `kill` al grupo los apaga a todos.
- Esperado (anexo A): las 21 del sitemap y `/privacidad/` 200 sin `redirect_url`; `/no-existe/` 404 (y el cuerpo es `404.html`, no la home); `/indice` y `/indice/` 301 a `/diagnostico/`; `/v3` y `/v3/` 301 a `/`; `/v3/<ruta>/` 301 a `/<ruta>/`; `/v3/a/` 301 a `/a/` y `/a/` 404; `/servicios` y `/index.html` 308 (automáticos de Pages); `/api/chequeo?dominio=localhost` 400; el último `curl` da 000.
- Ensayado así el 13-oct sobre el árbol final del ensayo, en el puerto 18782: las 34 respuestas salieron como dice la línea de arriba, y el apagado dio 000 sin procesos de wrangler ni workerd vivos.
- Lo que midió el ensayo de Diego, además: el query se conserva en las 301 (`/v3/contacto/?sitio=…`, utm); `/v3/b/`, `/v3/c/` y `/v3/maqueta-inicial/` van a su ruta sin prefijo y dan 404; el grupo A y el mockup dan 404, el grupo B 200; un rastreo de 23 páginas encontró 81 URL internas únicas, 0 sin 200, 0 meta robots y 0 `x-robots-tag` en las 22 públicas, y 2 anclas sin destino (`/#evidencia` y `/#nosotros`, ya en la sección 8); las cabeceras de caché calzan con `_headers`.

**4.5 Chequeo y formulario en la vista previa de Cloudflare de la rama del corte.** La vista
previa corre las functions y manda `x-robots-tag: noindex` (integraciones). [ensayado contra
wrangler local; sin ensayar contra la vista previa, porque necesita push]
- `curl -sS -D - '<vista-previa>/api/chequeo?dominio=localhost'` → 400, `content-type: application/json`, `cache-control: no-store`.
- `curl -sS '<vista-previa>/api/chequeo?dominio=spindlelab.cl'` → `"ok":true`.
- Recorrido del formulario con Web3Forms interceptado: `ensayo-dia1.mjs <vista-previa> /` (integraciones). Tres recorridos: entrar con `?utm_source=test…` a un servicio, aceptar cookies, ir a contacto por «Escríbenos» y enviar (tienen que salir los 11 campos, `generate_lead` y `Lead`, 0 errores de JS); chequeo en la home que lleva a `contacto/?sitio=…` con «Sitio web» relleno; rechazar cookies y enviar (1 POST, 0 eventos, 0 peticiones a Google o Meta).
- Ensayo contra wrangler local, build en raíz: recorrido 1 con 11 campos y UTM `test`/`ensayo`/`e7-dia1`, `generate_lead` y `Lead`, 0 errores de JS; recorrido 2 lleva a `/contacto/?sitio=spindlelab.cl` con «Sitio web» relleno; recorrido 3 con 1 POST, 0 eventos y 0 peticiones externas. Los id `chq-*` y los `name` del formulario son idénticos a main y al build con prefijo. `access_key`, `subject` y `from_name` iguales a main. `data-contacto` pasa de `/v3/contacto/` a `/contacto/`.
- **Qué mide cada script.** `ensayo-dia1.mjs` responde la API con una respuesta guardada de producción (puntaje 85): el recorrido muestra 85 también en raíz, y eso no es el puntaje real. El puntaje real del build en raíz (83) sale de `chequeo-local.mjs`, que corre `chequear()` de producción contra el build servido. Los dos viven en el scratchpad temporal (anexo C).

**4.6 Ley 21.719** [sin ensayar: se confirma el día del merge]. El v3 afirma «entra en plena
vigencia el 1 de diciembre de 2026» (`src/data/paginas-v3.json:129`, servido en `/diagnostico/`;
el ensayo confirmó que sigue así). La casa misma escribe en main que hay un proyecto de
postergación en el Senado (boletín 18.623-07;
`origin/main:marketing/redes/2026-10-octubre-linkedin/14-mie-la-postergacion-de-la-ley-21719/publicar.md:45`
y `:58`). El día del merge se confirma que la fecha sigue vigente. Si la postergación se aprobó,
se corrige antes de publicar (también en producción).

**4.7 Capturas finales** a 390, 768 y 1440 de las 21 rutas, guardadas en `capturas/` de la obra
para el cierre. [ensayado a 1440 y 390: 42 de 42 capturas del build final idénticas píxel a
píxel a las del build con prefijo anterior al corte (PIL, `ImageChops` sin `bbox`). Sin ensayar
a 768, y no se guardaron en `capturas/`: el ensayo no podía editar el repo. El día real van los
tres anchos.]

---

## 5 · Llegar a main

[sin ensayar: necesita push, `gh` y el OK de Ramón]

**5.1 Orden de entrada a main** (relevamiento main, 67 ramas revisadas con la API):
1. `claude/arreglos-accesibilidad-sitio-vivo` (`ab741bc`), ya, sin esperar R1, con OK de Ramón. Arregla `/privacidad/`, que sobrevive en las dos rutas. Después, quien mergee segundo (esta o el v3) corrige la nota de `CLAUDE.md:100`, que dice «neither is fixed» (lo pide el mensaje de `ab741bc`).
2. D43 y B26, cuando la troncal quiera: no cruzan el sitio. D43 solo, copiando la línea 16 exacta de `75bfffc` (con otros bytes, choca con el merge del v3). B26 por merge de `claude/outbound-pozo-seco-28sep`, no cherry-pick.
3. **El v3**, cuando R1 esté decidida y esta lista ejecutada.
4. `claude/cata-evalua-manual-v3`, **siempre después del v3**. Arrastra 111 commits del v3 al 7-oct; si entra antes, publica el v3 de esa fecha junto con los cambios a la home v2.
5. `claude/relanzamiento-sep-social-wygda1`, después de resolver en su rama el choque con main (`marketing/redes/QUE-HAY-PUBLICADO.md`) y sacar los 14 PNG `_2x` (~7 MB) que cata retiró a propósito.
- No se mergean `claude/portafolio-clinica-implantologia` ni `claude/portafolio-constructora`: el v3 ya las superó.

**5.2 El PR** · lo abre la sesión en la nube que corrió el corte (Diego)
- Antes, repetir P3 y P15 contra el main de ese momento. main recibe push directo todos los días (13 commits el 13-oct, ninguno merge). Si entró algo en `spindlelab-astro/`, se repite la sección 4.
- No hay plantilla de PR (`.github/` no existe). Cuerpo: qué cambia en producción según R1 (URL que cambian de contenido, `/trabajo/` nueva, las cuatro redirecciones de `/v3`, lo que se borró de `public/`), las decisiones de Ramón aplicadas con su fecha, el resultado de la sección 4, y cierra con las líneas de atribución de la sesión.
```bash
gh pr create --base main --head claude/v3-publicacion --title "Publica el v3 de spindlelab.cl" --body-file <cuerpo.md>
```
- En el PR va a fallar el check «Workers Builds: spindlelab», como en toda rama que no es main. No lo causa el v3 (P0.1).

**5.3 El merge** · Ramón confirma en el mismo turno; lo ejecuta la sesión o Ramón en GitHub
- **Método `merge`, nunca squash** (CLAUDE.md, «Git workflow»). Aquí pesa más que de costumbre: un squash rompería la ascendencia que `cata-evalua-manual-v3` comparte con el v3 (111 commits) y le llenaría el merge de conflictos falsos.
```bash
gh pr merge <n> --merge      # solo después del «sí» de Ramón en ese mismo turno
```
- **Llegar a main ya es publicar** (CLAUDE.md, «Deploy»). No hay un paso aparte.
- **Verifica:** `git fetch origin main && git log -1 --format=%p origin/main` da dos hashes (fue un merge commit). El check «Cloudflare Pages: spindlelab-v2» sale en verde sobre ese commit (`gh api repos/rvalleespin/spindlelab/commits/<sha>/check-runs`). Anotar el hash del merge, el ID del deploy, fecha y hora.

---

## 6 · Después del deploy

[sin ensayar: corre contra producción. Lo único adelantado es el 83 de 6.2, confirmado en local
con `chequear()`]

Primera hora. Lo corre la sesión que mergeó; lo que necesita navegador o paneles lo hace
Ramón. Todo se anota en el acta de publicación (sección 9).

**6.1 Rutas e indexabilidad** (curl):
```bash
for u in $(curl -s https://spindlelab.cl/sitemap.xml | grep -o '<loc>[^<]*' | sed 's#<loc>##'); do
  printf '%-70s %s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' "$u")" "$(curl -s "$u" | grep -c 'name="robots"')"
done
```
- Raíz: cada URL del sitemap da `200 0` (200 y sin meta robots), `/trabajo/` incluida. `/privacidad/` 200. `/no-existe/` 404. `/v3/` y `/v3/blog/` 301. `/indice` 301 a `/diagnostico/`. Canonical sin `/v3/`.
- `cd spindlelab-astro && npm run verificar -- --base https://spindlelab.cl --rutas /,/trabajo/,/contacto/,/diagnostico/,/servicios/desarrollo-web/,/privacidad/` sin hallazgos nuevos.
- Encabezados: `curl -sI` de `/fonts/manrope.css?v=1` (inmutable), `/assets/img/og-v3.jpg` (`max-age=604800`), `/assets/js/v3-chequeo.js?v=2` (7 días) y de una página (`max-age=0, must-revalidate`).
- El HTML en vivo nunca calza byte a byte con `dist`: Cloudflare reescribe los `mailto:` a `/cdn-cgi/l/email-protection` (rutas, archivos). Para comparar bytes, solo archivos que no son HTML.
- Prefijo: `/v3/` 200 con noindex y `x-robots-tag`; `/v3/a/` 404; `/` con el título de hoy.

**6.2 API del chequeo:**
- `curl -sS -D - 'https://spindlelab.cl/api/chequeo?dominio=localhost'` → 400, JSON, `no-store`.
- `curl -sS 'https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl'` → `ok:true`, **puntaje 83 en raíz** (pierde el FAQPage de la home; R7) y 85 con prefijo. Que baje a 83 es lo esperado, no una falla.
- En el navegador, el chequeo del hero de `/` y el de `/diagnostico/` pintan el resultado.

**6.3 Envío real del formulario, uno solo, rotulado** · Ramón (necesita navegador y la casilla hola@)
- Entrar por `https://spindlelab.cl/servicios/desarrollo-web/?utm_source=test&utm_medium=publicacion&utm_campaign=v3-dia1`, aceptar cookies, ir a contacto por «Escríbenos». Con prefijo, las mismas rutas bajo `/v3/`.
- Nombre «PRUEBA PUBLICACION v3 · no es lead», correo propio, sitio spindlelab.cl, mensaje «Prueba del día de publicación, no registrar».
- **Verifica:** llega el correo «Nuevo contacto desde spindlelab.cl» con UTM Source `test`, Medium `publicacion` y Campaign `v3-dia1`; `generate_lead` en GA4 Tiempo real; `Lead` en Meta (Pixel Helper o Eventos de prueba). Es el criterio del brief que sigue sin marcar (`brief-de-obra.md:120-122`).
- Se anota la hora exacta, se archiva el correo y se avisa a la troncal y a Raquel que no entra a `ventas/pipeline.md`.
- No se probó si Web3Forms restringe dominios. Por eso la prueba que vale es en spindlelab.cl.

**6.4 Consentimiento y medición:**
- Rechazar cookies en una ventana nueva: 0 peticiones a Google o Meta (DevTools, red).
- `curl -s -H 'Accept: text/html' https://spindlelab.cl/ | grep -c cloudflareinsights` da 1: Cloudflare Web Analytics sigue midiendo sin cookies (sin el `Accept` no aparece).
- Chequeo con cookies aceptadas: `chequeo_completado` en GA4 Tiempo real; «Pedir el diagnóstico» lleva a `/contacto/?sitio=<dominio>` con «Sitio web» relleno.

**6.5 Search Console y Bing** · Ramón (solo raíz)
- Search Console (propiedad de Dominio, verificada por TXT de DNS; el deploy no la toca): reenviar el sitemap; Inspección de URL y «Solicitar indexación» de `/`, `/trabajo/`, `/contacto/`, `/diagnostico/` y `/servicios/desarrollo-web/`.
- Bing Webmaster Tools (importado de Search Console): reenviar el sitemap y enviar las mismas URL.
- **Verifica:** Sitemaps en «Correcto» con 21 URL. A los 3 a 7 días: el informe Páginas sin «Excluida por la etiqueta noindex» en esas rutas, y los informes de datos estructurados sin errores nuevos.
- Cambian los títulos de `/` («Agencia de marketing con IA en Chile» → «SEO técnico y visibilidad en IA en Chile»), `/servicios/` y `/blog/` («El Taller» → «Blog»). Las URL no cambian. Search Console va a recalcular.

**6.6 Google Ads** · no se toca
- Está detenida desde ~24-ago (`marketing/encargos-otras-sesiones/encargo-gonzalo-apagar-ads.md:14-30`). Se reenciende después de publicar y medir, y lo decide Ramón (`brief-de-obra.md:146-148`).
- Los 7 sitelinks (`marketing/oficina/memoria/gonzalo-google-ads.md:19-21`) van a rutas que no cambian. En el ensayo raíz, las 21 responden 200 con `?utm_source=google&utm_medium=cpc&utm_campaign=auditoria-seo` y capturan el UTM.
- Pendiente de dos minutos: leer en la cuenta (597-527-6690) la URL final real del anuncio. El único documento dice `/contacto/` (`marketing/encargos-otras-sesiones/afinar-cta-formulario-contacto.md:12`, 27-jul); no está verificada.
- `generate_lead` sigue importada y con el mismo nombre: la conversión no se toca.

**6.7 Vistas previas al compartir:** LinkedIn Post Inspector y Facebook Sharing Debugger sobre
`/`, `/servicios/desarrollo-web/` (usa `og-v3-desarrollo-web.jpg`), `/trabajo/` y
`/diagnostico/`. El `og:image` pasa de `og-marca.jpg` a `og-v3*.jpg`.

**6.8 Enlaces de afuera:** `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://spindlelab.cl/diagnostico`
da 308 a `/diagnostico/`, y `/diagnostico/` da 200 con el v3. Es la URL de la bio de
Instagram, del DM de ManyChat, de los destacados de LinkedIn y de 64 menciones en posts y
outbound (integraciones). Los enlaces de Verifica y Cumple a `https://spindlelab.cl`
responden 200, y `curl -s https://spindlelab.cl/ | grep -c 'spindlelab.cl/#org'` da 1 o más.
La firma de Gmail y el sitio web de la página de empresa en LinkedIn no están en el repo: los
confirma Ramón.

**6.9 Arranca la medición:** en el plan de medición (P17) se anotan la fecha y hora del deploy,
el hash del merge, el ID del deploy y la fecha del primer corte del antes y después.

---

## 7 · Vuelta atrás

**Cuándo.** Cualquiera de estas: quedó noindex en una página del sitemap; una ruta del
sitemap sirve el v2, la raíz vacía o un 404; el formulario no envía; el aviso de cookies no
hace nada (GA4 y el Pixel no cargan); `/api/chequeo` da 5xx. Lo decide Ramón. Si no se le
ubica, el criterio es este: si el defecto deja a un visitante sin poder contactar o saca al
sitio del índice, se vuelve atrás primero y se pregunta después.

**7.1 En minutos: rollback en el panel** · Ramón · [sin ensayar: nadie lo ha hecho en este proyecto]
- Cloudflare > Workers & Pages > spindlelab-v2 > Deployments > el último deploy de producción **anterior** al merge > Rollback.
- **Ojo, es temporal.** main sigue teniendo el v3, y el próximo push a main lo vuelve a publicar. Otras sesiones empujan a main todos los días (13 commits el 13-oct). El rollback del panel se sigue el mismo día con el 7.2.

**7.2 Definitivo: devolver solo el sitio** · sesión en la nube, Ramón confirma el merge · [ensayado en simulación: corregido]
```bash
git fetch origin main
git log --oneline <sha-merge>..origin/main -- spindlelab-astro   # tiene que salir vacío; si no, se mira antes
git switch -c claude/vuelve-sitio-v2 origin/main
git checkout --no-overlay <sha-merge>^1 -- spindlelab-astro      # sin --no-overlay NO se borra lo que agregó el v3
git diff --stat <sha-merge>^1 -- spindlelab-astro                # tiene que salir vacío
git commit -m "Vuelve spindlelab-astro al estado anterior a la publicación del v3"
```
Equivale a `git restore --source=<sha-merge>^1 --staged --worktree -- spindlelab-astro`
(`git restore` no usa el modo overlay por defecto). PR y merge con método merge, con el OK de
Ramón en el mismo turno.
- **Por qué `--no-overlay`, y por qué la versión anterior de esta lista estaba mal:** `git checkout <commit> -- <ruta>` trabaja por defecto en modo overlay (`git checkout -h`: «`--[no-]overlay` use overlay mode (default)»). Trae lo que existe en ese commit, pero **no borra** lo que no existe ahí. Simulación del ensayo, en un worktree desechable: `origin/main` más el árbol final del corte (`666bfae`), y después `git checkout origin/main -- spindlelab-astro`. Quedaron 76 archivos agregados por el v3. El build dio «21 page(s)»: `/metodo/`, `/contacto/`, `/diagnostico/`, `/blog/*`, `/servicios/*` y `/trabajo/` (19 rutas) salían de las plantillas v3 con el Layout de main y **sin noindex**; solo `/` y `/nosotros/` volvían al v2. Se habría publicado un híbrido. Con `--no-overlay`, el diff contra main sale vacío. Repetido después sobre el mismo árbol: 76 «A» con overlay, 0 diferencias con `--no-overlay`.
- **Por qué no `git revert -m 1 <sha-merge>`:** deshace todo lo que trajo la rama, no solo el sitio: los documentos de la obra, el manual, `CLAUDE.md` y la línea de D43 en `ventas/proyectos-en-curso.md:16`. Y para volver a publicar habría que revertir el revert (git cree que esos commits ya están en main).
- **Para volver a publicar** después de arreglar, en una rama nueva desde `origin/main`:
```bash
git log --oneline <sha-vuelta>..origin/main -- spindlelab-astro   # vacío; si no, se mira antes
git checkout --no-overlay <sha-merge> -- spindlelab-astro          # sin --no-overlay quedan los 18 HTML v2 y el grupo A
```
  Más el arreglo, y se repiten las secciones 4 a 6. Con el modo por defecto, los archivos que el
  v2 tiene y el v3 no (los 18 HTML v2, el grupo A, los 11 componentes v2) quedarían en el árbol,
  y `astro dev` volvería a servir el v2 en esas rutas (P5).

**7.3 Qué pasa con la caché y las redirecciones al volver atrás:**
- HTML (`max-age=0, must-revalidate`): el v2 se ve al instante.
- `/_astro/*`: los nombres llevan hash; cada deploy trae los suyos y no se pisan.
- `/assets/*`, `/fonts/*`, `/js/*`: el corte no modifica ningún archivo compartido con producción (P15: 0 «M» fuera de `_redirects`, `llms.txt` y `sitemap.xml`). Lo nuevo del v3 tiene nombre propio. Al volver no queda nada mezclado. Los archivos borrados en P5 vuelven con el deploy anterior.
- `301 /v3/* → /:splat`: los navegadores lo guardan sin vencimiento. Después de volver, quien lo tenga guardado cae en la misma ruta, que sirve el v2. No rompe nada.
- `/indice`: no cambia.
- El consentimiento vive en `localStorage` (`spindlelab_consent`) con la misma clave en v2 y v3: nadie vuelve a ver el aviso por el ir y venir.
- Buscadores: las URL son las mismas y no hay redirecciones que deshacer. Si el problema fue un noindex olvidado, lo que corresponde es quitarlo y pedir indexación en Search Console, no volver atrás.
- GA4: la ventana del ir y venir se anota en el plan de medición y se excluye del antes y después.

---

## 8 · Lo que queda para después de publicar

| Qué | Quién | Nota |
|---|---|---|
| Cierre de obra: capturas finales, qué se construyó, pendientes, memorias de Diego, Clara, Lucía, Javiera y Mauro, reporte a la troncal | Mauro | La troncal refleja el estado en el plan operativo |
| Grupo B de huérfanos: `hero-hilo-de-oro.mp4` (4,86 MiB) y su portada, `og.jpg` (84 KB, huérfano en producción desde el 20-ago), `logo-spindlelab.png` (18 KB; ¿lo usa la firma de correo por URL?) | Ramón decide | Si el video sale, se actualizan `manual-de-marca.md:402` y `spec-visual.md:121`. `og-marca.jpg` y `fonts/OFL-Inter.txt` se quedan sin preguntar. En el ensayo, el grupo B sigue dando 200 |
| Menús de `404.html` y `privacidad/index.html` con anclas que la home v3 no tiene: `404.html:76` apunta a `/#nosotros` y `:77` a `/#evidencia`; `privacidad/index.html:132` solo a `/#evidencia`. El enlace carga arriba, sin 404, y `verificar` no lo detecta (el rastreo del ensayo sí: 2 anclas sin destino). ¿Se suma Trabajo? | Ramón da el visto bueno (páginas en vivo) | También se pierde `/diagnostico/#medicion-mensual` (3 enlaces en el repo) |
| Píldoras de `/privacidad/`: 2 a 390 y 10 a 768 y 1440 con `--sin-pildoras`. Salen de `style.css` v2 y `ab741bc` no las toca | Ramón decide (página en vivo), Diego | Mientras tanto, 4.2 la excluye con nombre |
| 404 con estética v2 (`style.css`, Gabarito, Inter) dentro de un sitio v3 | Ramón | Una 404 v3 es página nueva, fuera del brief §8.2 |
| R3 a R7 y la 2.ª mitad de R9 | Ramón | Sección 1.4 |
| Paquete R5 que no haya entrado (Inter, favicon, OG por defecto, cargo, `makesOffer`, `sameAs`) | Ramón autoriza, Diego | P16 |
| Peso: retrato `ramon-vallejos.jpg` (198 KB, 896×1200, pintado a 560 px) recodificado con nombre nuevo para los `<img>` de la home, Nosotros y Acompañamiento (~76 KB). El JSON-LD sigue con el archivo actual | Ramón (es la foto que se ve), Diego | Con esto, Inter y el favicon, la home baja de ~0,87 a ~0,68 MiB comprimida (archivos) |
| Licencias OFL de Manrope y Gabarito junto a `fonts/OFL-Inter.txt` (el brief §5 dice que están y no están) | Diego | `git ls-tree -r --name-only HEAD \| grep -i ofl` tiene que listar tres |
| Comentarios de `consent-banner.js` y `inter.css` que cuentan «21» referencias (quedan 3: Layout, privacidad y 404) | Diego, con la próxima edición real de esos archivos | No se tocan solo por un comentario: caché larga |
| `spindlelab-astro/.gitignore:6` dice `node_modules/` con barra, que no ignora un `node_modules` enlazado. Cambiarlo a `node_modules` quita la exclusión del cierre de cada commit | Diego | No afecta al sitio. Hasta entonces, la exclusión de la sección 2 lo cubre |
| `CLAUDE.md` (`:9`, `:22`, `:95`, `:101`, `:109`) y `manual-de-marca.md` (`:35`, `:689`) dicen que el público ve `spindlelab-site/`. Producción es `spindlelab-astro/` en el proyecto spindlelab-v2; `spindlelab-site/` es el proyecto viejo «spindlelab», sin dominio | La troncal | El origen del error es `contexto-agente-spindlelab.md:15` |
| Panel de Cloudflare: ¿se borra el proyecto viejo «spindlelab» (sirve el v1 sin noindex en spindlelab.pages.dev)? ¿`www` redirige al apex con Bulk Redirects? ¿Qué hace el Worker «spindlelab»? | Ramón | Problemas que ya existen; el corte no los cambia |
| `chequeo_completado` como evento clave en GA4; evento para clic a contacto o mailto | Ramón decide | Hoy no existe ninguno |
| Reencender Google Ads | Ramón | Sin tráfico de alta intención el antes y después puede no tener volumen |
| Ley 21.719: si la postergación se aprueba, corregir `paginas-v3.json:129` | Clara, Diego | 4.6 |
| Diferido de fotos (`spec-visual.md:259`) | Ramón elige | |
| Llevar `cata-evalua-manual-v3` y después `relanzamiento-sep-social-wygda1` a main | Troncal | 5.1 |

---

## 9 · Ensayo

**Cuándo, quién y sobre qué.** 13-oct-2026. Diego corrió la lista de punta a punta en un
worktree desechable (`git worktree add … HEAD --detach`, con `node_modules` enlazado desde el
repo principal). Base: rama `claude/magical-franklin-ckfki2` en `1b064bf` (igual a `ls-remote`
en ese momento), `origin/main` en `34c063e`, base común `b5f4b2f`. Durante el ensayo entró a la
rama `39b9a31`, que solo agrega el borrador de esta lista: el sitio de `39b9a31` es idéntico al
de `1b064bf`. Mauro corrigió la lista con el resultado y cerró tres huecos con pruebas propias en
otro worktree desechable, sobre el árbol final del ensayo (`666bfae`): el build con Node 20, la
forma nueva de 4.4 y la vuelta atrás con `--no-overlay`. Los dos worktrees se borraron; el repo
principal quedó limpio y el `node_modules` compartido intacto (334 entradas).

**Qué se comprobó y qué no.**

| Paso | Resultado | Qué cambió en la lista |
|---|---|---|
| Worktree desechable | Funciona, con cambios | El enlace de `node_modules` no lo ignora `node_modules/`: exclusión en el cierre de cada commit. `npm ci` no se corre sobre el enlace |
| P0.1 a P0.4 | Sin ensayar (panel, R2, copy, lectura) | P0.4 lleva el curl: vista previa `/v3/` 200 con noindex, `/v3/a/` 200; `spindlelab.cl/v3/` 404 |
| P1 | Funciona, con cambios | La Verifica ya no fija un hash: vale el HEAD del día y su diff contra `1b064bf` |
| P2 | Funciona | Se suma: 0 conflictos con `merge-file`; puede entrar antes o después del corte; no arregla las píldoras |
| P3 | Funciona, con cambios | Advertencia de `npm ci`; build con Node 20 |
| P4 | Funciona, con cambios | Comentarios falsos de `tailwind.config.mjs` y `verificar.mjs:32` entran al mismo commit; nueva línea de Verifica |
| P5 | Funciona | Cifra del `--stat` (44) y build intermedio |
| P6 | Funciona | Cifras del ensayo; cierre del commit con `git add -A` |
| P7 | Funciona, con cambios | `comparar.py` normaliza el cid también en el CSS; `/contacto/` se comprueba en el DOM |
| P8 | Funciona | Cifras (22 páginas, 43 bloques, 0 problemas) |
| P9 | Funciona | «Parsed 4 valid redirect rules» |
| P10 | Funciona, con cambios | Verifica con `class="d-body` sin cerrar comilla; decisión de Simón sobre `lastmod` y `dateModified` |
| P11 | Sin ensayar el copy; mecánica con marcadores | Grep de `[ENSAYO]` en 0 el día real |
| P12 | Funciona, con fecha marcador | `chequear()` local: 83 |
| P13 | Funciona | Línea corregida (`:131-137`); peso del CSS medido |
| P14 | Funciona, con cambios | Rutas de archivo que faltaban; Verifica nueva que da 0 |
| P15 | Funciona | Cifras con el corte: 38 A, 42 D, 3 M |
| P16, P17 | Sin ensayar (R5; datos de GA4, Cloudflare y Gmail) | Sin cambios |
| 4.1 | Funciona | Build con Node 20: mismo `dist` que Node 22 |
| 4.2 | Funciona, con cambios | `--sin-pildoras` y exclusión de `/privacidad/` |
| 4.3 | Funciona | Sin cambios |
| 4.4 | Funciona, con cambios | `kill $W` no apagaba wrangler: `setsid` y `kill -- -$W`, ensayado |
| 4.5 | Funciona contra wrangler local; sin ensayar contra la vista previa | Qué mide cada script (85 guardado contra 83 real) |
| 4.6 | Sin ensayar (se confirma el día del merge) | Líneas corregidas (`:45` y `:58`) |
| 4.7 | Funciona a 1440 y 390; sin 768 | El día real van los tres anchos |
| Sección 3 (parcial) | Funciona | Marcas de ensayado en 1, 4 y la verificación |
| 5.x, 6.x | Sin ensayar (push, `gh`, OK de Ramón, producción) | Marcas |
| 7.2 | **Falla** | `--no-overlay` en la vuelta y al volver a publicar, con su Verifica |
| 7.1 | Sin ensayar (panel) | Sin cambios |

**Cifras.**
- **Builds:** 27 páginas (P3) → 23 (P4) → 21, todas bajo `/v3/` (P5) → 21 en la raíz (P6 a P14). Node 20.20.0 y Node 22.22.0 dan el mismo `dist` (`diff -rq` sin salida).
- **Páginas barridas con `verificar`:** 22 a 390, 768 y 1440 (66 barridos). Solo `/privacidad/` reprueba (2 h1, 3,82:1 y 4,46:1; con `--sin-pildoras`, 2, 10 y 10 píldoras). Con `--excluir /privacidad/ --sin-pildoras`: 21 sin hallazgos a los tres anchos y 0 enlaces rotos. Con prefijo, antes del corte: 21 sin hallazgos.
- **El corte no cambió nada más que la ruta:** `comparar.py` 21 de 21 con `html_igual` en el corte y 22 de 22 tras P13 y P14; `css_identico` 21 de 21 normalizando el cid. Capturas: 42 de 42 idénticas píxel a píxel (1440 y 390).
- **Prefijo:** `/v3/` en el HTML, 811 → 0. Prefijo funcional en `src`, 81 líneas en 15 archivos → 0. Prosa con `/v3/` o `pages/v3/` en `src`, `public/assets/js`, `scripts` y configuración, 130 líneas → 0.
- **SEO:** canonical y og:url correctos en 22 de 22; 43 bloques JSON-LD, 0 problemas; 0 meta robots y 0 `x-robots-tag` en las 22 públicas; `name="robots"` solo en `dist/404.html`.
- **URL comprobadas en wrangler local** (log del ensayo): las 21 del sitemap y `/privacidad/`, 200. **13 redirecciones 301** (`/indice`, `/indice/` y 11 bajo `/v3`: `/v3`, `/v3/`, `/v3/a/`, `/v3/b/`, `/v3/c/`, `/v3/maqueta-inicial/`, `/v3/blog/que-es-aeo-geo/`, `/v3/contacto/`, `/v3/servicios/desarrollo-web/`, `/v3/servicios/paid-media/` y `/v3/trabajo`). **5 308 automáticas** (`/servicios`, `/index.html`, `/404.html`, `/blog/index.html`, `/trabajo`). **8 respuestas 404**: `/no-existe/` (con el cuerpo de `404.html`), `/a/`, el mockup, 4 archivos del grupo A probados (`/video/metodo.mp4`, `/video/problema.jpg`, `/assets/img/hero-blog.jpg`, `/assets/js/hero-bg-video.js`) y `/OFL-Inter.txt`, que fue una ruta mal escrita en la prueba (el archivo vive en `/fonts/OFL-Inter.txt` y ahí da 200). `/api/chequeo` sin dominio válido: 400. Rastreo de 23 páginas: 81 URL internas únicas, 0 sin 200, 2 anclas sin destino ya conocidas.
- **URL de producción comprobadas en vivo:** 3, con curl. `spindlelab.cl/v3/` 404; en la vista previa de la rama, `/v3/` 200 con `x-robots-tag: noindex` y `/v3/a/` 200. Lo demás de producción corre después del deploy (sección 6).
- **Formulario y chequeo:** 3 de 3 recorridos, 0 errores de JS. Puntaje del chequeo propio sobre el build en raíz: 83.
- **Caché (P15):** 38 A, 42 D y 3 M en `public/`.
- **Peso tras P13:** CSS de la home de 49.370 a 38.183 B; de un post, de 53.070 a 41.883 B.
- **Vuelta atrás 7.2 como estaba:** 76 archivos del v3 sobreviven y 19 rutas salen híbridas. Con `--no-overlay`: 0 diferencias contra main.

**Dónde está el patch del ensayo.** En el scratchpad de la sesión del estudio, que es
**temporal** (se borra con la sesión):
`/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/e7/ensayo/`.
- `ensayo.patch` y `ensayo.stat`: contra `1b064bf`, incluye el merge de main. 112 archivos, 2812 inserciones y 9126 borrados.
- `ensayo-sin-merge.patch` y `ensayo-sin-merge.stat`: solo el ensayo, contra el árbol del merge (`6a41b83`). 87 archivos, 723 inserciones y 9125 borrados: 15 renombres (11 plantillas a la raíz; las 4 maquetas, HeroV2 y el png a `maquetas/`) y 23 binarios.
- Se guardaron con `git diff --cached -M` y **sin `--binary`**, así que no sirven para aplicar los binarios. Los árboles intermedios (`6a41b83`, `32626b5`, `47a5a05`, `83d34ba`, `666bfae`) viven solo en el almacén de objetos de este clon y se pierden con un `gc`. **El día de la publicación no se aplica este patch: se rehace corriendo la lista**, y el diff de ese día es el que va al PR.
- Al lado quedan los logs y herramientas del ensayo: `build-*.log`, `verificar-{390,768,1440}.log`, `comparar-p7.txt`, `rastreo.txt`, `wrangler.log`, `dia1-raiz.json`, `cap/` (84 PNG) y `herr/` (`corte.sh`, `comparar.py`, `comparar-cid.py`, `rastreo.py`, `cap.mjs`, `form.py`). Las pruebas de Mauro, en `…/e7/mauro-lista/` (`build-node20.log`, `build-node22.log`, `chk44.sh`, `chk44.txt`, `prueba-kill.sh`).

**Acta de publicación** (el día real): hash del merge, ID del deploy, fecha y hora, resultado
de 6.1 a 6.8, hora del envío de prueba.

---

## Anexo A · Tabla de URL con el v3 en la raíz

Todas las filas, salvo las de «en vivo», se midieron en el ensayo con `wrangler pages dev`.

| URL de hoy | Después del corte | Fuente |
|---|---|---|
| `/` | 200, `src/pages/index.astro` (v3). Cambia el title | rutas, ensayo |
| `/nosotros/`, `/metodo/`, `/diagnostico/`, `/contacto/` | 200, su `.astro` v3 | rutas, ensayo |
| `/servicios/` | 200, `servicios/index.astro` | rutas, ensayo |
| `/servicios/desarrollo-web/` | 200, `servicios/desarrollo-web.astro` | rutas, ensayo |
| `/servicios/{visibilidad-en-ia,auditoria-seo-tecnica,acompanamiento-mensual,redes-sociales,paid-media}/` | 200, `servicios/[slug].astro` | rutas, ensayo |
| `/blog/` y los 7 posts | 200, `blog/index.astro` y `blog/[slug].astro`; los 7 slugs calzan uno a uno | rutas, ensayo |
| `/trabajo/` (hoy 404) | 200, nueva; entra al sitemap y a `llms.txt` | rutas, ensayo |
| `/privacidad/` | 200, el HTML estático (con `ab741bc` si entró) | brief §9:158, ensayo |
| `/no-existe/` | 404 con `404.html` | rutas, ensayo |
| `/404.html` | 308 a `/404` (automático de Pages) | rutas, en vivo y ensayo |
| `/indice`, `/indice/` | 301 a `/diagnostico/` (sin cambios) | `_redirects:1-2`, ensayo |
| `/v3`, `/v3/` | 301 a `/` | P9, ensayo |
| `/v3/<ruta>/` | 301 a `/<ruta>/`, con el query intacto | P9, ensayo |
| `/v3/a/`, `/v3/b/`, `/v3/c/`, `/v3/maqueta-inicial/` | 301 a `/a/`… y 404 | P9, ensayo |
| `/index.html`; URL sin barra final (`/servicios`, `/trabajo`); `/blog/index.html` | 308 a `/`, a la misma con barra y a `/blog/` (automático) | rutas, en vivo y ensayo |
| `/api/chequeo` | la misma función (`functions/api/chequeo.js`); la llama `v3-chequeo.js:132` con ruta relativa. Sin dominio válido, 400 | rutas, integraciones, ensayo |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | misma URL, contenido según P10 a P12 | rutas |
| `/#evidencia`, `/#nosotros`, `/diagnostico/#medicion-mensual` | la página carga arriba (el ancla no existe en el v3) | rutas, rastreo del ensayo |
| `/mockup-interno/proyecto-bernardo.png` (hoy solo en la vista previa) | 404 | P4, ensayo |
| Grupo A de `public/` (6 videos de `/video/` con sus portadas, 11 fotos v2, `hero-bg-video.js`) | 404 | P5, ensayo |
| Grupo B (`hero-hilo-de-oro.mp4` y su portada, `og.jpg`, `logo-spindlelab.png`) | 200, sin cambios | ensayo |

## Anexo B · `comparar.py`

Compara el build con prefijo (antes del commit 3) con el build en la raíz, normalizando solo el
prefijo, la línea de robots, los nombres con hash de `/_astro/` y los `data-astro-cid`, **en el
HTML y en el CSS**. Es `herr/comparar-cid.py` del ensayo.
```python
import os, re, sys
base, raiz = sys.argv[1], sys.argv[2]
def norm_base(t):
    t = re.sub(r'<meta name="robots" content="noindex, nofollow"\s*/?>', '', t)
    t = t.replace('https://spindlelab.cl/v3/', 'https://spindlelab.cl/')
    t = re.sub(r'(["\'`])/v3/', r'\1/', t)
    return t
def css_de(t, d):
    hrefs = re.findall(r'<link rel="stylesheet" href="(/_astro/[^"]+)"', t)
    css = ''.join(open(os.path.join(d, h.lstrip('/')), encoding='utf-8').read() for h in hrefs)
    # El cid de Astro depende de la ruta del archivo, y el corte cambia la ruta.
    return hrefs, re.sub(r'data-astro-cid-[a-z0-9]+', 'cid', css)
def limpio(t):
    t = re.sub(r'<link rel="stylesheet" href="/_astro/[^"]+">', '', t)
    t = re.sub(r'/_astro/[^"\')\s]+', '/_astro/X', t)
    t = re.sub(r'data-astro-cid-[a-z0-9]+', 'cid', t)
    return re.sub(r'\s+', ' ', t)
for root, ds, fs in os.walk(os.path.join(base, 'v3')):
    for f in fs:
        if f != 'index.html': continue
        rel = os.path.relpath(os.path.join(root, f), os.path.join(base, 'v3'))
        if re.match(r'^(a|b|c|maqueta-inicial)/', rel): continue
        A0 = norm_base(open(os.path.join(root, f), encoding='utf-8').read())
        B0 = open(os.path.join(raiz, rel), encoding='utf-8').read()
        ha, ca = css_de(A0, base); hb, cb = css_de(B0, raiz)
        print(f"{rel:55s} html_igual={limpio(A0)==limpio(B0)} css_identico={ca==cb}")
```
En el ensayo: 21 de 21 con `html_igual=True` y, con la normalización del CSS, 21 de 21 con
`css_identico=True`. Sin ella, `css_identico` daba `False` en 10 de 21 (trabajo, los 7 posts y
contacto) con el CSS igual.

Para P13 (limpieza), que compara raíz contra raíz, el script espera el «antes» dentro de una
subcarpeta `v3` y su CSS en `_astro`. Ensayado sobre el commit 5 del ensayo: 22 de 22 con
`html_igual=True`, `/privacidad/` incluida.
```bash
rm -rf /tmp/a && mkdir /tmp/a
ln -s /tmp/dist-commit4 /tmp/a/v3 && ln -s /tmp/dist-commit4/_astro /tmp/a/_astro
python3 comparar.py /tmp/a dist
```

## Anexo C · De dónde sale cada cosa

Los seis relevamientos y el ensayo del 13-oct dejaron su evidencia en el scratchpad de la sesión
del estudio, que es **temporal** (`/tmp/claude-0/-home-user-spindlelab/756adde7-3da1-5186-9935-cf74aeaa7043/scratchpad/e7/`):

| Relevamiento | Qué midió | Carpeta |
|---|---|---|
| rutas | Cómo se construye producción (22 de 22 páginas iguales), inventario de URL, tabla v2 → v3, `_redirects`, `_headers`, sitemap, robots, llms, corte ensayado con wrangler | `rutas/propuestas/` |
| prefijo | Las 81 líneas con `/v3/`, noindex, canonical y JSON-LD, corte completo con capturas (42 de 42), qué cambia con prefijo | `prefijo/` (`herr/a-raiz.sh`, `herr/comparar2.py`, `cap2/`) |
| archivos | Maquetas fuera, huérfanos (31 archivos, 32,6 MiB), caché por blob, peso por página | `build-archivos/` |
| main | Ensayo del merge sobre 34c063e, efecto en la home v2, 67 ramas y su orden | `main/` |
| integraciones | API, formulario, UTM, eventos y consentimiento en dos builds; GA4, Pixel, Ads, Search Console, enlaces de afuera | `dia1/` (`ensayo-dia1.mjs`, `chequeo-local.mjs`) |
| compuertas | Qué bloquea y qué puede esperar, Ley 21.719, barridos de raya y prueba social | (sin archivos) |
| ensayo | La lista de punta a punta (sección 9) | `ensayo/` (logs, `herr/`, `cap/`, los dos patch) |
| corrección | Build con Node 20, la forma nueva de 4.4, la vuelta atrás con y sin `--no-overlay` | `mauro-lista/` |

**Scripts que conviene conservar.** `ensayo-dia1.mjs` (recorridos del formulario y el chequeo;
responde la API con una respuesta guardada de producción, puntaje 85) y `chequeo-local.mjs`
(corre `chequear()` de producción contra un build servido; da el puntaje real, 83 en raíz) miden
cosas distintas y hacen falta los dos (4.5). También `herr/comparar-cid.py` (anexo B) y
`herr/rastreo.py`. Si se quieren conservar, se copian a la carpeta de la obra en un commit aparte,
antes de que se cierre la sesión del estudio. Si no, el día de la publicación hay que
reescribirlos.

**Cifras corregidas respecto de documentos anteriores:**
- HTML v2 a retirar: **18**, no 20 (los 20 incluyen privacidad y 404). R1 en `pendientes-traspaso-revisados.md:58-59` y el E7 en `:230-235` dicen 20.
- Prefijo funcional: **80 líneas en 14 archivos**. Los 767 href son 766 anclas más 1 selector de JS (`contacto.astro:246`).
- Huérfanos con el v3 en la raíz: **31 archivos y 32,6 MiB** (30 y 31,86 MiB si las maquetas ya salieron). P77 decía 43 y 33,6 MiB antes de que E4 (`1f66476`) borrara 11 recortes.
- Componentes v2 que quedan muertos: **11** más HeroV2.
- Tras el corte, el chequeo propio da **83**, no 85 (confirmado en el ensayo con `chequear()`).
- Corregidas en esta versión, por el ensayo: el bloque `RUTAS` está en `[slug].astro:131-137`, no en `:130-137`; el boletín 18.623-07 está en `:45` y `:58` del post de la Ley 21.719, no en `:27`; `privacidad/index.html:132` apunta solo a `/#evidencia` (`/#nosotros` está en `404.html:76`); el `dateModified` de los posts es `2026-08-25` en 6 y `2026-09-08` en uno; los 44 archivos que borra P5 son 20 de página y 24 del grupo A.
