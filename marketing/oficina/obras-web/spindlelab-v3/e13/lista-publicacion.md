# Lista de publicación E13: el sitio nuevo en la raíz de spindlelab.cl

> **AVISO 30-oct-2026: esta lista y la rama `claude/v3-publicacion` quedaron VIEJAS.** El corte lleva el texto del 26-oct, con el titular «Te llegan consultas. Veamos dónde se cae el resto.», que Ramón retiró el 30-oct (el sitio a medida pasa a ser la línea principal). **No mergear `claude/v3-publicacion`.** La línea viva del texto es `claude/magical-franklin-ckfki2` (trae mi obra E13 y los cambios del 30-oct). Cuando Ramón cierre el texto, se rearma el corte desde el árbol de esa rama con `armar-corte.mjs --origen`, se regenera el sitemap (`lastmod`) y las imágenes al compartir (titular nuevo y logo sin la cruz de la i), se repite la batería de la sección 7 y Javiera da un cierre exprés en contexto limpio. Detalle en `revision-30oct.md`.

**Escrita el 26-oct-2026 · ensayada el 26-oct sobre `origin/main` `ba49edbd` y la rama `claude/v3-modelo-nuevo` (`078ceefe`).** **La rama del corte ya está armada y empujada: `claude/v3-publicacion` (`762b7295`, un solo commit sobre `ba49edbd`).** Si `origin/main` no se movió, publicar es abrir el PR (URL: `https://github.com/rvalleespin/spindlelab/pull/new/claude/v3-publicacion`), que Ramón confirme y el merge. Si se movió, o si Ramón pide un cambio, se vuelve a armar con la receta de la sección 2 (cinco minutos) y se fuerza el push de esa rama. Reemplaza a `../lista-publicacion.md` (la de E7, escrita para un v3 anterior). Nada de esto se ejecuta sin el OK de Ramón; **publicar es llegar a `main`**.

## 0 · Qué cambia respecto de la lista anterior

- **El corte no es un merge de la rama de la obra.** La rama de la obra pesa ~486 MB comprimidos (capturas y documentos de seis obras) y las rutinas en la nube clonan `main`. El corte es una rama nueva **desde `origin/main`** que lleva solo `spindlelab-astro/` y cinco documentos: **201 archivos, 11,2 MB sin comprimir** (medido en el corte real).
- **El sitio ya está en la raíz en la rama de la obra.** La conversión de `/v3/` a `/` (`herramientas/convertir-a-raiz.mjs`) se aplicó antes de la QA, así que Javiera revisó lo que se publica. El corte no vuelve a convertir nada.
- **Los medios siguen en `/v3/…`** (`public/v3/portada`, `medios`, `marca`, `trabajo/combeau`): son solo URL de archivos, no páginas. `/v3/` (la página) da 404, como hoy. No hay redirección de `/v3/*`.
- Todo lo de este documento se corrió el 26-oct en un worktree desechable fuera de iCloud (sección 7). Lo que no se pudo ensayar va marcado.

## 1 · Qué decide Ramón antes (y qué valor se usó)

| # | Decisión | Valor usado | Dónde se ve |
|---|---|---|---|
| 1 | El look del v3 sirve para «marketing y crecimiento con IA» | Sí | Toda la obra |
| 2 | Raíz o prefijo, y cuándo | Raíz, cuando Ramón diga | Este documento |
| 3 | Casos | Bernardo Combeau y Verifica y Cumple; salen Praxi y los cuatro conceptos | `/trabajo/` |
| 4 | Cadencia y monitoreo | Informe mensual; sin monitoreo de menciones ni puntaje a 3 meses | `/servicios/*`, `/metodo/` |
| 5 | Variante del hero | H-A (el botón a la derecha, donde estaba el chequeo) | Home |
| 6 | Lectura de aprobación del texto nuevo | Pendiente de Ramón | `desvios.md`, sección de decisiones |

Sin respuesta de Ramón a 1 a 4 al 26-oct, se avanzó con estos valores y se dejó dicho en `brief-de-obra.md`.

## 2 · Receta del corte

Todo desde el worktree de la obra (`gifted-spence-cf5936`, rama `claude/v3-modelo-nuevo`), con la carpeta de trabajo fuera de iCloud.

```bash
# 1 · Sincronizar
git fetch origin
git ls-remote origin refs/heads/claude/v3-modelo-nuevo      # tiene que dar el mismo hash que git rev-parse HEAD
# 2 · Un worktree desechable desde origin/main (el día real, con rama: -b claude/v3-publicacion)
CORTE=/tmp/spindlelab-corte
git worktree add --detach "$CORTE" origin/main               # día real: git worktree add -b claude/v3-publicacion "$CORTE" origin/main
# 3 · Armar el corte (reemplaza spindlelab-astro/, devuelve lo de producción, copia los documentos mínimos)
node marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/armar-corte.mjs --destino "$CORTE"
```
El script se detiene si el destino no está en `origin/main` o tiene cambios, e imprime al final el resumen contra `main`. **Resultado esperado** (corte real del 26-oct): `{"A":187,"M":14,"D":53,"R":0}`, «Nada fuera de spindlelab-astro/ y de marketing/…/e13/» y «protegido (functions/, _headers, _redirects, public/js/) contra main: idéntico».

Qué hace y por qué:
- **Reemplaza `spindlelab-astro/`** por el de la obra (rsync `--delete`, sin `node_modules`, `dist`, `.astro` ni `.wrangler`). Retira así los 18 HTML estáticos del sitio anterior (`public/{blog,servicios,contacto,diagnostico,metodo}`), los 12 componentes del sitio anterior, 11 imágenes de cabecera y 4 videos del sitio anterior que nadie usa (en total 44 archivos borrados; siguen en el historial de git).
- **Devuelve de `origin/main`** lo que es de producción y esta obra no toca: `functions/`, `public/_headers`, `public/_redirects`, `public/js/` (incluye el gestor de consentimiento), `public/robots.txt`, **`/privacidad/` y `404.html`** (páginas estáticas del diseño anterior) con `assets/css/style.css` y `assets/js/site-header.js`, que esas dos páginas piden.
- **En `404.html` y `/privacidad/`** cambia dos enlaces que ya no llevarían a nada: «Evidencia» (`/#evidencia`) pasa a «Trabajo» (`/trabajo/`) y «El Taller» a «Blog». Es el único cambio de marcado en esas páginas. **No** arregla lo que ya traía `/privacidad/` (dos `h1`, grises bajo 4,5:1): eso sigue como decisión de Ramón.
- **Copia a `marketing/oficina/obras-web/spindlelab-v3/e13/`** `brief-de-obra.md`, `spec-home.md`, `acta-qa.md`, `lista-publicacion.md`, `desvios.md`, `herramientas/` y `lectura-fria/`. Nada más.

```bash
# 4 · Sitemap con la fecha de publicación (reemplaza 2026-10-26 por el día real) y build
cd "$CORTE/spindlelab-astro"
ln -s <carpeta con node_modules> node_modules      # o npm ci en un clon limpio
npx astro build
node "$OLDPWD/marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/generar-sitemap.mjs" dist 2026-11-02 --escribir public/sitemap.xml
npx astro build                                    # otra vez, para que dist lleve el sitemap
# 5 · Verificación (sección 3)
# 6 · Commit y push. Excluir el enlace a node_modules (el .gitignore del sitio dice «node_modules/», que no calza con un enlace)
cd "$CORTE" && rm -f spindlelab-astro/node_modules
git add -A -- spindlelab-astro marketing/oficina/obras-web/spindlelab-v3/e13
git status --short | head        # solo spindlelab-astro/ y e13/
git commit -m "Publica el sitio nuevo: marketing y crecimiento con IA para empresas que ya venden"   # + las líneas de atribución
git push -u origin claude/v3-publicacion
```
`gh` no está instalado en la Mac: el PR se abre desde la URL `…/pull/new/claude/v3-publicacion` que imprime el push. Cuerpo del PR: qué cambia en producción (las 20 URL vivas cambian de contenido, `/trabajo/` y `/trabajo/combeau/` son nuevas, 18 HTML estáticos y 12 componentes salen, `/privacidad/` y 404 cambian dos enlaces), las decisiones de la sección 1 con su fecha, el resultado de la sección 3 y el acta de QA.

**Un PR chico pendiente puede chocar:** `claude/ajuste-frase-en-chile` quita «en Chile» de títulos, descripciones, JSON-LD y `llms.txt` **del sitio anterior** (`public/*.html`, `Layout.astro`, `llms.txt`). Si entra a `main` antes de este corte, el PR del corte tendrá conflictos en esos archivos: se resuelven **con el lado del corte**, que ya no tiene «en Chile» como relleno (la QA midió 0 en título y descripción de las 22 rutas). Si el corte entra primero, ese PR queda sin objeto y se cierra.

## 3 · Verificación antes del merge

Sobre el árbol del corte (el worktree, no la rama de la obra). Lo corre quien arma el corte; Javiera firma la QA exprés si algo cambió desde su acta.

| # | Qué | Cómo | Esperado | Ensayo 26-oct |
|---|---|---|---|---|
| 3.1 | Build | `npx astro build` | 22 páginas, sin errores | 22 páginas, sin errores (Node 24; producción usa el de `.nvmrc`, Node 20; sin ensayar con 20) |
| 3.2 | Enlaces | `enlaces.mjs dist` (revisa href, src, srcset y url() internos) | 0 sin resolver | 24 páginas, 712 referencias, 0 |
| 3.3 | Contraste, desborde, un `h1`, JSON-LD, `alt` | `node scripts/verificar.mjs --ancho 390` (y 768, 1440) con `--excluir /privacidad/` | «Sin hallazgos» | 390 y 768: sin hallazgos (22 páginas); 1440: ver acta |
| 3.4 | Atribución UTM | `utm.mjs dist ""` | 4 de 4 recorridos con los tres campos llenos | 4 de 4 (sin la corrección de `PaginaA.astro`: 3 de 4 fallaban) |
| 3.5 | Servidor de Cloudflare en local | `npx wrangler pages dev dist --port 18741` y `curl` a las 22 URL del sitemap, `/privacidad/`, `/no-existe/`, `/indice`, `/v3/`, `/v3/portada/hilo-960.webm`, `/diagnostico`, `/api/chequeo?dominio=localhost` | Las 22 y `/privacidad/` en 200; `/no-existe/` en 404 con el cuerpo de `404.html`; `/indice` 301 a `/diagnostico/`; `/v3/` 404; el medio 200; `/diagnostico` 308 a `/diagnostico/`; la API 400 | Todo como se esperaba |
| 3.6 | Protegido | `git diff origin/main -- spindlelab-astro/functions spindlelab-astro/public/_headers spindlelab-astro/public/_redirects spindlelab-astro/public/js` | vacío | vacío |
| 3.7 | Canonical de cada página | `grep -o 'rel="canonical" href="[^"]*"'` por archivo de `dist` | `https://spindlelab.cl/<ruta>` | `generar-sitemap.mjs` se detiene si alguna falla: pasó |
| 3.8 | Sin `noindex` | `grep -rl 'name="robots"' dist` | solo lo que ya traía `/privacidad/`, si algo | 0 |
| 3.9 | Chequeo propio sobre el build servido | `chequear()` de `functions/api/chequeo.js` contra la home | ≥ 83 | 94 en la home bajo `/v3/` (Diego); en la raíz: ver acta |
| 3.10 | Peso del corte | `git diff --cached --stat origin/main` y suma de blobs | ≤ 12 MB | 11,2 MB sin comprimir en 201 archivos |
| 3.11 | Ley 21.719 | Confirmar que la fecha que dice `/diagnostico/` («1 de diciembre de 2026») sigue vigente (hay un proyecto de postergación en el Senado, boletín 18.623-07) | Vigente, o corregir antes | **Sin ensayar: se confirma el día de publicar** |
| 3.12 | Precios | Comparar los de las seis páginas de servicio, el índice y la home contra `origin/main` | Idénticos | Idénticos (acta de QA) |

Capturas finales a 390, 768 y 1440 de las 22 rutas: se guardan en el scratchpad y **no** en el repositorio (lo que pese de más no llega a `main`). Las que cita el acta están en `e13/capturas-qa/`.

## 4 · Llegar a `main`

1. **Antes**, repetir 2 y 3 contra el `main` de ese momento: `main` recibe pushes todos los días. Si entró algo bajo `spindlelab-astro/`, se rehace el corte.
2. PR desde `claude/v3-publicacion` (URL del push). **Merge con método `merge`, nunca squash** (CLAUDE.md, «Git workflow»). Ramón confirma en el mismo turno; lo ejecuta él en GitHub o la troncal con su OK.
3. **Llegar a `main` ya es publicar** (Cloudflare Pages: proyecto `spindlelab-v2`, rama de producción `main`, directorio raíz `spindlelab-astro`). El check «Workers Builds: spindlelab» falla en toda rama que no es `main`: no lo causa esta obra.
4. Anotar el hash del merge, el ID del deploy, fecha y hora.

## 5 · Después del deploy (primera hora)

[Sin ensayar: corre contra producción. Lo que necesita navegador o paneles lo hace Ramón.]

- **Rutas:** `for u in $(curl -s https://spindlelab.cl/sitemap.xml | grep -o '<loc>[^<]*' | sed 's#<loc>##'); do printf '%-70s %s\n' "$u" "$(curl -s -o /dev/null -w '%{http_code}' "$u")"; done` → 22 en 200. `/privacidad/` 200, `/no-existe/` 404, `/indice` 301 a `/diagnostico/`, `/v3/` 404, `/v3/portada/hilo-960.webm` 200.
- **El HTML en vivo no calza byte a byte con `dist`:** Cloudflare reescribe los `mailto:`. Para comparar bytes, solo archivos que no son HTML.
- **API del chequeo:** `curl -sS 'https://spindlelab.cl/api/chequeo?dominio=localhost'` → 400; `…dominio=spindlelab.cl` → `"ok":true` y el puntaje de la raíz (ver acta). En el navegador, `/diagnostico/` pinta el resultado.
- **Envío real del formulario, uno solo, rotulado** (Ramón): entrar por `https://spindlelab.cl/servicios/desarrollo-web/?utm_source=test&utm_medium=publicacion&utm_campaign=sitio-nuevo`, aceptar cookies, ir a contacto con «Pedir la revisión», nombre «PRUEBA PUBLICACION · no es lead», mensaje «Prueba del día de publicación, no registrar». Llega el correo «Nuevo contacto desde spindlelab.cl» con los tres UTM, `generate_lead` en GA4 Tiempo real y `Lead` en Meta. Se avisa a la troncal que no entra a `ventas/pipeline.md`.
- **Consentimiento:** rechazar cookies en una ventana nueva: 0 peticiones a Google o Meta (red de DevTools).
- **Search Console y Bing** (Ramón): reenviar el sitemap (22 URL) y pedir indexación de `/`, `/trabajo/`, `/contacto/`, `/diagnostico/` y `/servicios/`. Cambian los títulos de las 20 URL vivas y las descripciones; las URL no cambian.
- **Vistas previas al compartir:** LinkedIn Post Inspector y Facebook Sharing Debugger sobre `/`, `/servicios/`, `/trabajo/` y `/diagnostico/`. Las imágenes cambian de nombre (`og-e12-*.jpg?v=2`), así que no hay caché vieja que purgar.
- **Enlaces de afuera:** `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://spindlelab.cl/diagnostico` → 308 a `/diagnostico/` (es la URL de la bio de Instagram, del DM y de varias publicaciones y correos). Los enlaces de Verifica y Cumple a `https://spindlelab.cl` responden 200, y la home sigue declarando el `@id` `https://spindlelab.cl/#org`.
- **Google Ads:** no se toca. Está detenida; reencenderla es decisión de Ramón.
- **Los correos de outbound dicen «diagnóstico gratis» y «24 horas»:** el sitio ya dice «revisión» y «un día hábil». Hay que alinear las plantillas de la rutina de outbound (lo hace la troncal) o el prospecto ve dos nombres para lo mismo.

## 6 · Vuelta atrás

**Cuándo:** una ruta del sitemap sirve un 404 o la raíz vacía, quedó `noindex` en una página, el formulario no envía, el aviso de cookies no hace nada, `/api/chequeo` da 5xx. Lo decide Ramón; si no se le ubica, y el defecto deja a un visitante sin poder contactar o saca al sitio del índice, se vuelve atrás primero.

1. **En minutos, desde el panel** (Ramón): Cloudflare → Workers & Pages → `spindlelab-v2` → Deployments → el último de producción anterior al merge → Rollback. **Es temporal**: `main` sigue teniendo el sitio nuevo y el próximo push lo vuelve a publicar. Se sigue el mismo día con el punto 2.
2. **Definitivo: devolver solo `spindlelab-astro/`** (rama nueva desde `origin/main`):
```bash
git fetch origin main
git log --oneline <sha-merge>..origin/main -- spindlelab-astro    # vacío; si no, se mira antes
git switch -c claude/vuelve-sitio-anterior origin/main
git checkout --no-overlay <sha-merge>^1 -- spindlelab-astro         # sin --no-overlay NO se borra lo que agregó el sitio nuevo
git diff --stat <sha-merge>^1 -- spindlelab-astro                   # vacío
git commit -m "Vuelve spindlelab-astro al estado anterior a la publicación del sitio nuevo"
```
No `git revert -m 1`: deshace también los documentos del corte. PR y merge con método `merge` y el OK de Ramón. Para volver a publicar después de arreglar: `git checkout --no-overlay <sha-merge> -- spindlelab-astro` sobre una rama nueva desde `origin/main`.
3. **Caché al volver:** el HTML (`max-age=0, must-revalidate`) cambia al instante; `/_astro/*` lleva hash; `/assets/*` y `/fonts/*` no cambian de contenido salvo las imágenes al compartir, que llevan nombre y versión nuevos. El consentimiento vive en `localStorage` con la misma clave: nadie vuelve a ver el aviso.

## 7 · Ensayo (26-oct-2026)

Dos veces: una al principio, sobre `1c65e6a6`, para depurar el script; y la definitiva sobre el estado final de la obra (`078ceefe`, QA de la ronda 2 y cierre exprés), que es la que quedó empujada como `claude/v3-publicacion`. Worktree desechable fuera de iCloud, desde `origin/main` `ba49edbd`.

| Paso | Resultado | Qué cambió en la lista |
|---|---|---|
| `armar-corte.mjs` | `{"A":172,"M":13,"D":44,"R":1}`, nada fuera de lo permitido, protegido idéntico | La primera versión devolvía de `main` imágenes del sitio anterior que nada usa (11 heros): el script ahora solo devuelve lo que nombra una página estática |
| Build del corte real | 22 páginas, 0 de 711 referencias rotas (24 páginas HTML con `/privacidad/` y 404); sitemap regenerado idéntico (22 URL) | |
| `utm.mjs` sobre el corte | 4 de 4 | |
| Servidor de Cloudflare en local (corte real) | Las 22 URL y `/privacidad/` en 200; `/no-existe/` 404; `/indice` 301 a `/diagnostico/`; `/v3/` 404; `/v3/portada/hilo-960.webm` 200; `/diagnostico` 308; la API, 400 | |
| Peso | 201 archivos, 11,2 MB; lo mayor: los videos de la portada y de Combeau (1,4 MB y menos) | |
| Sin ensayar | Node 20; `gh`; el envío real del formulario; Search Console; el chequeo de la Ley 21.719 el día de publicar | |

## 8 · Lo que queda para después de publicar

| Qué | Quién | Nota |
|---|---|---|
| `hero-hilo-de-oro.mp4` (4,9 MB) y su póster, `og.jpg`, `logo-spindlelab.png` en `public/`: nadie los usa en el sitio nuevo | Ramón decide | Se dejaron porque algo externo podría apuntar a ellos (firma de correo, redes). No se pueden saber desde el repositorio |
| `/privacidad/` y 404 siguen con el diseño anterior (dos `h1`, grises bajo 4,5:1 en privacidad) | Ramón autoriza el arreglo de marcado | No es parte de esta obra |
| Imágenes al compartir con Chrome: `og-e12-*.jpg` conserva el prefijo de la obra anterior en el nombre | Diego, sin apuro | Cambiar el nombre obliga a subir la versión de todas las referencias |
| `www.spindlelab.cl` no redirige al apex (se hace con Bulk Redirects en el panel) | Ramón | Ya existía |
| Los casos que salieron (Praxi y los cuatro conceptos) siguen en el historial de la rama `claude/magical-franklin-ckfki2` | | Si se quieren volver a mostrar, es otra obra |
| Texto que Ramón no leyó aún | Ramón | `desvios.md`, decisiones abiertas |
