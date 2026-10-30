# Lista de publicación E13: el sitio nuevo en la raíz de spindlelab.cl

**Escrita el 26-oct-2026 · ensayada el 26-oct sobre `origin/main` `ba49edbd` y la rama `claude/v3-modelo-nuevo` (`078ceefe`) · puesta al día el 30-oct por Mauro (sección «30-oct», justo abajo), sin ejecutar el corte.** La rama del corte que se armó el 26-oct, `claude/v3-publicacion` (`762b7295` más `2895a0ce`, los documentos), **ya no sirve tal cual: lleva la E13 del 26-oct y nada de lo del 30-oct.** Publicar ahora es volver a armarla con la receta de la sección 2 desde la rama de la obra, que hoy es `claude/magical-franklin-ckfki2`, forzar el push de esa rama y abrir el PR (URL: `https://github.com/rvalleespin/spindlelab/pull/new/claude/v3-publicacion`), que Ramón confirme y el merge. Reemplaza a `../lista-publicacion.md` (la de E7, escrita para un v3 anterior). Nada de esto se ejecuta sin el OK de Ramón; **publicar es llegar a `main`**.

## 30-oct · Lo que cambió y lo que hay que hacer distinto (leer primero)

**Medido el 30-oct en la rama de la obra (`0d9bce8a`) contra `origin/main` (`840dc024`) y contra la E13 del 26-oct (`9039b521`), con `git diff` y `git ls-tree`. No se corrió `armar-corte.mjs`: el corte se arma el día de publicar.**

1. **La rama del corte quedó atrás.** El `spindlelab-astro/` de `origin/claude/v3-publicacion` es idéntico al de `9039b521` (la E13 del 26-oct). Desde ahí el 30-oct cambió **59 archivos del sitio, todos modificados, ninguno nuevo ni borrado**: el texto (9 JSON de Clara y `paginas-v3.json`), la home, `/nosotros/`, `/contacto/`, `/servicios/` y sus páginas, el encabezado y el logo, `archivo.css`, `layout-a.ts`, `Layout.astro` (solo las dos hojas de letras que ya no se usan; gtag, consentimiento y Pixel intactos), `llms.txt` y los archivos de imagen de abajo. `origin/main` se movió de `ba49edbd` a `840dc024` (tres commits de redes y del pulso semanal), **ninguno bajo `spindlelab-astro/`**. Hay que rearmar el corte de todas formas, por lo de la obra.
2. **El logo nuevo, la i con su disco (Bruno), son archivos con el mismo nombre que los de El huso** en `public/v3/marca/`: `favicon.ico`, `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` y `favicon.svg` (este último ya no lo pide ninguna página). Todas las referencias del `<head>` y el `logo` de `#org` van con **`?v=6`**. El dibujo del encabezado y del pie vive en `src/components/a/Logo.astro`. El `favicon.ico` de la raíz de `public/` también es el de Bruno (md5 igual al de `/v3/marca/`; `armar-corte.mjs` lo comprueba e imprime el resultado en el paso 3). `/favicon.ico` no lleva versión: un navegador que ya tenía el del v2 puede seguir mostrándolo un tiempo.
3. **Las 22 imágenes al compartir se rehicieron con el logo nuevo** (`public/assets/img/og-e12-*.jpg`, mismos nombres, versión subida en cada referencia). Versiones que deben salir en el `dist`: `acompanamiento-mensual` 3, `auditoria-seo-tecnica` 4, los siete artículos del blog 3, `blog` 2, `combeau` 2, `contacto` 3, `desarrollo-web` 4, `diagnostico` 4, `marca` (la home) 3, `metodo` 3, `nosotros` 3, `paid-media` 3, `redes-sociales` 3, `servicios` 3, `trabajo` 3, `visibilidad-en-ia` 3. Ninguna referencia a una versión anterior (lo midió Javiera en la vuelta 2 y lo repetí sobre el build del 30-oct).
4. **`/404.html` y `/privacidad/`**: el paso 3 de `armar-corte.mjs` ahora, además de los dos enlaces, les cambia los tres iconos del v2 por los cinco de A (`?v=6`) y la línea de marca del pie de `/privacidad/` («Sitios web a medida y marketing con IA.»). Si no encuentra los `<link>` del v2 tal como los busca, se detiene.
5. **El sitemap.** `public/sitemap.xml` de la rama dice `2026-10-26` en las 22 URL. Las 15 páginas que no son artículos cambiaron de contenido el 30-oct, así que **regenerarlo con la fecha del día del corte (paso 4 de la receta) es obligatorio**, no un retoque. Los siete artículos toman su propio `dateModified` del JSON-LD, que hoy dice `2026-10-26`; el 30-oct les cambió el botón del cierre, la línea de la firma y la imagen al compartir, no el cuerpo. Si su fecha sube o no lo decide Simón (señales) antes del corte; si sube, se sube en el JSON del artículo, no a mano en el sitemap.
6. **Documentos que el paso 4 de `armar-corte.mjs` no copia:** `acta-qa-30oct.md` (la QA de lo que se publica) y `resumen-30oct.md`. Se copian a mano después del paso 3 de la receta (va escrito ahí). Las capturas (`capturas-30oct/`, `capturas-qa-30oct/`) no van a `main`.
7. **Peso de la home: 1,1 kB de margen** (1.398,9 kB primera carga a 1440, tope 1.400). Cualquier frase que Ramón sume con sus respuestas puede cruzarlo: por eso hay un paso nuevo, el 3.13.
8. **Antes de armar el corte, Ramón contesta las cuatro preguntas** de `desvios/construccion-30oct.md` §6 (el mayor 3 y los menores 5, 6 y 7 del acta del 30-oct; resumidas en `resumen-30oct.md`). Lo que cambie pasa por la QA exprés de Javiera (texto, build, `verificar`, peso y lectura en frío de la home). Si decide publicar con las frases como están, lo dice por escrito y se arma igual.

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
| 7 | **(30-oct, decidido)** El sitio parte por el desarrollo web: rótulo «Sitios web a medida y marketing con IA», `h1` «En redes arriendas. Tu sitio es lo único que es tuyo.», la acción «Hablemos de tu sitio» en amarillo `#FFE800` (solo ese botón y el «Hablemos» del encabezado), la sección 2 nueva, «Quién está detrás» en tercera persona, `/contacto/` con los dos caminos, la Ley 21.719 calificada y el logo de la i con su disco | Lo que eligió Ramón | Toda la obra; acta de QA del 30-oct |
| 8 | **(30-oct, abierto)** Las tres frases donde tropiezan los lectores («agentes de IA», el rótulo, «sin plantillas ni WordPress»), si todo plan trae panel, el «yo» de «Probado primero en lo nuestro» y la lista dicha dos veces | Pendiente de Ramón, **antes del corte** | `desvios/construccion-30oct.md` §6; `resumen-30oct.md` |
| 9 | **(30-oct, abierto)** Las que Ramón puede devolver o confirmar: la description de 157 caracteres, el `h1` de `/nosotros/`, el gris del de `/contacto/`, «el código de cada entrega lo revisa y lo aprueba él» para entregas a clientes, «una aerolínea regional», «visitarlo y entenderlo», la ayuda del campo, el asunto «Hablemos de mi sitio» y el permiso escrito de haber tocado `Layout.astro` (dos hojas de letras) | Lo que está construido | `acta-qa-30oct.md`, «Decisiones que son de Ramón (vuelta 2)» |

Sin respuesta de Ramón a 1 a 4 al 26-oct, se avanzó con estos valores y se dejó dicho en `brief-de-obra.md`.

## 2 · Receta del corte

Todo desde un worktree de la rama de la obra, **hoy `claude/magical-franklin-ckfki2`** (el 26-oct era `claude/v3-modelo-nuevo`, en el worktree `gifted-spence-cf5936`), con la carpeta de trabajo fuera de iCloud.

```bash
# 1 · Sincronizar
git fetch origin
git ls-remote origin refs/heads/claude/magical-franklin-ckfki2   # tiene que dar el mismo hash que git rev-parse HEAD
# 2 · Un worktree desechable desde origin/main. La rama claude/v3-publicacion ya existe (la del 26-oct): -B la vuelve a
#     poner en origin/main y el push del paso 6 va con --force-with-lease
CORTE=/tmp/spindlelab-corte
git worktree add --detach "$CORTE" origin/main               # día real: git worktree add -B claude/v3-publicacion "$CORTE" origin/main
# 3 · Armar el corte (reemplaza spindlelab-astro/, devuelve lo de producción, iconos y enlaces de 404 y /privacidad/,
#     copia los documentos mínimos)
node marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/armar-corte.mjs --destino "$CORTE"
# 3b · (30-oct) Los dos documentos del 30-oct que el paso 4 del script no copia
cp marketing/oficina/obras-web/spindlelab-v3/e13/acta-qa-30oct.md marketing/oficina/obras-web/spindlelab-v3/e13/resumen-30oct.md \
   "$CORTE/marketing/oficina/obras-web/spindlelab-v3/e13/"
```
El script se detiene si el destino no está en `origin/main` o tiene cambios, e imprime al final el resumen contra `main`. **Resultado esperado** (corte real del 26-oct): `{"A":187,"M":14,"D":53,"R":0}`, «Nada fuera de spindlelab-astro/ y de marketing/…/e13/» y «protegido (functions/, _headers, _redirects, public/js/) contra main: idéntico». **Al 30-oct (estimado en estático, sin correr el script):** en `spindlelab-astro/`, 160 nuevos y 53 borrados como el 26-oct (el 30-oct no agregó ni borró archivos del sitio) y unos 15 modificados (13 más `404.html` y `/privacidad/`); en `e13/`, unos 55 documentos nuevos (los cinco de siempre, `herramientas/` y `lectura-fria/`, que ahora trae `30oct/` y `30oct-v2/`, más los dos del paso 3b). El paso 3 tiene que imprimir además «/favicon.ico de la raíz es el de Bruno».

Qué hace y por qué:
- **Reemplaza `spindlelab-astro/`** por el de la obra (rsync `--delete`, sin `node_modules`, `dist`, `.astro` ni `.wrangler`). Retira así los 18 HTML estáticos del sitio anterior (`public/{blog,servicios,contacto,diagnostico,metodo}`), los 12 componentes del sitio anterior, 11 imágenes de cabecera y 4 videos del sitio anterior que nadie usa (en total 44 archivos borrados; siguen en el historial de git).
- **Devuelve de `origin/main`** lo que es de producción y esta obra no toca: `functions/`, `public/_headers`, `public/_redirects`, `public/js/` (incluye el gestor de consentimiento), `public/robots.txt`, **`/privacidad/` y `404.html`** (páginas estáticas del diseño anterior) con `assets/css/style.css` y `assets/js/site-header.js`, que esas dos páginas piden.
- **En `404.html` y `/privacidad/`** cambia dos enlaces que ya no llevarían a nada: «Evidencia» (`/#evidencia`) pasa a «Trabajo» (`/trabajo/`) y «El Taller» a «Blog». Es el único cambio de marcado en esas páginas. **No** arregla lo que ya traía `/privacidad/` (dos `h1`, grises bajo 4,5:1): eso sigue como decisión de Ramón.
- **Copia a `marketing/oficina/obras-web/spindlelab-v3/e13/`** `brief-de-obra.md`, `spec-home.md`, `acta-qa.md`, `lista-publicacion.md`, `desvios.md`, `herramientas/` y `lectura-fria/`. Nada más.

```bash
# 4 · Sitemap con la fecha del día del corte y build. La rama dice 2026-10-26 en las 22 URL: con lo del 30-oct, la fecha
#     del corte es obligatoria. <AAAA-MM-DD> es el día en que se publica, no el de hoy si no se publica hoy
cd "$CORTE/spindlelab-astro"
ln -s <carpeta con node_modules> node_modules      # o npm ci en un clon limpio
npx astro build
node "$OLDPWD/marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/generar-sitemap.mjs" dist <AAAA-MM-DD> --escribir public/sitemap.xml
grep -o '<lastmod>[^<]*' public/sitemap.xml | sort | uniq -c   # 15 con la fecha del corte y 7 (los artículos) con su dateModified
npx astro build                                    # otra vez, para que dist lleve el sitemap
# 5 · Verificación (sección 3)
# 6 · Commit y push. Excluir el enlace a node_modules (el .gitignore del sitio dice «node_modules/», que no calza con un enlace)
cd "$CORTE" && rm -f spindlelab-astro/node_modules
git add -A -- spindlelab-astro marketing/oficina/obras-web/spindlelab-v3/e13
git status --short | head        # solo spindlelab-astro/ y e13/
git commit -m "Publica el sitio nuevo: sitios web a medida y marketing con IA"   # + las líneas de atribución
git push --force-with-lease -u origin claude/v3-publicacion   # la rama ya existe (la del 26-oct) y se reemplaza
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
| 3.11 | Ley 21.719 | El día de publicar, releer la ficha del boletín 18.623-07 en el servicio público del Senado (`curl 'https://tramitacion.senado.cl/wspublico/tramitacion.php?boletin=18623'`: etapa, subetapa, último trámite y si ya tiene número de ley o fecha en el Diario Oficial) y compararla con la frase de `/diagnostico/` (`diagnostico.json`, la del párrafo de la ley: «El 28 de octubre el Senado aprobó un proyecto que posterga su entrada en vigencia (boletín 18.623-07), y ahora lo revisa la Cámara de Diputados. Mientras no se publique esa ley, la fecha legal sigue siendo el 1 de diciembre de 2026. El proyecto cambia cuándo, no qué.»). Exacta contra la ficha al 30-oct (Clara y Javiera la leyeron ese día: Sala del Senado el 28-oct, oficio a la Cámara el 29-oct, segundo trámite, discusión inmediata, sin número de ley) | La frase sigue diciendo lo que dice la ficha. **Si la ficha avanzó** (la Cámara lo despachó, hay comisión mixta, se publicó la ley), la corrige Clara en `diagnostico.json` antes del merge, con `extraer-texto.mjs diagnostico`, build y `--comprobar`; y se mira si `llms.txt` y el resto del sitio siguen sin fecha suelta (`grep -rn '21.719\|diciembre\|vigencia' dist`) | **Sin ensayar: se hace el día de publicar.** Paso puesto al día el 30-oct (acta de QA del 30-oct, menor 13): antes pedía confirmar el «1 de diciembre de 2026» como fecha suelta, y la frase ya no es esa |
| 3.12 | Precios | Comparar los de las seis páginas de servicio, el índice y la home contra `origin/main` | Idénticos | Idénticos (acta de QA) |
| 3.13 | **(30-oct)** Peso de la home | `node marketing/oficina/obras-web/spindlelab-v3/e13/herramientas/peso-30oct.mjs <url del dist servido>` (CDP, caché apagada, aviso contestado) | Primera carga a 1440 ≤ 1.400 kB, recorrida ≤ 1.600, a 390 ≤ 950 | Sin ensayar en el corte. En la rama, 30-oct: 1.398,9 · 1.561,7 · 755,6 kB (Diego y Javiera, la misma cifra al décimo). **Margen 1,1 kB**: si Ramón cambia texto de la home, se mide antes de armar |
| 3.14 | **(30-oct)** Logo e iconos | `md5sum dist/favicon.ico dist/v3/marca/favicon.ico` y, por archivo, `grep -o 'v3/marca/[a-z0-9.-]*?v=6' dist/index.html \| wc -l` (lo mismo con `dist/404.html` y `dist/privacidad/index.html`) | Los dos md5 iguales; en la home 6 referencias a `?v=6` (5 iconos y el `logo` de `#org`), en `404.html` y `/privacidad/` 5 cada una | Sin ensayar en el corte. En la rama, 30-oct: md5 iguales (`107b0646…`), 6 · 5 · 5 |
| 3.15 | **(30-oct)** Imágenes al compartir | `grep -rhoE 'og-e12-[a-z0-9-]+\.jpg\?v=[0-9]+' dist --include=*.html \| sort -u` | 22 líneas, cada imagen en una sola versión, las de la sección «30-oct», punto 3 | Sin ensayar en el corte. En la rama, 30-oct: las 22, sin versiones viejas |

Capturas finales a 390, 768 y 1440 de las 22 rutas: se guardan en el scratchpad y **no** en el repositorio (lo que pese de más no llega a `main`). Las que cita el acta están en `e13/capturas-qa/`. **Las del cierre del 30-oct** (las 22 rutas a 1440 × 900 y 390 × 844, la home y `/contacto/` enteras, dos hojas) están en la rama de la obra, en `e13/capturas-30oct/` (4,5 MB): `armar-corte.mjs` no las copia y no llegan a `main`.

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
- **Envío real del formulario, uno solo, rotulado** (Ramón): entrar por `https://spindlelab.cl/servicios/desarrollo-web/?utm_source=test&utm_medium=publicacion&utm_campaign=sitio-nuevo`, aceptar cookies, ir a contacto con «Hablemos de tu sitio» (desde el 30-oct, el botón de la página y el amarillo «Hablemos» del encabezado), nombre «PRUEBA PUBLICACION · no es lead», mensaje «Prueba del día de publicación, no registrar». Llega el correo «Nuevo contacto desde spindlelab.cl» con los tres UTM, `generate_lead` en GA4 Tiempo real y `Lead` en Meta. Se avisa a la troncal que no entra a `ventas/pipeline.md`.
- **Consentimiento:** rechazar cookies en una ventana nueva: 0 peticiones a Google o Meta (red de DevTools).
- **Search Console y Bing** (Ramón): reenviar el sitemap (22 URL) y pedir indexación de `/`, `/trabajo/`, `/contacto/`, `/diagnostico/` y `/servicios/`. Cambian los títulos de las 20 URL vivas y las descripciones; las URL no cambian.
- **Vistas previas al compartir:** LinkedIn Post Inspector y Facebook Sharing Debugger sobre `/`, `/servicios/`, `/trabajo/` y `/diagnostico/`. Las imágenes cambian de nombre (`og-e12-*.jpg`, con su `?v=` del 30-oct, de 2 a 4 según la página), así que no hay caché vieja que purgar. Tienen que mostrar el logo de la i con su disco, el mismo del encabezado.
- **(30-oct) El favicon:** abrir `https://spindlelab.cl/` en una ventana privada y mirar la pestaña: la i con su disco sobre negro. `/favicon.ico` no lleva versión, así que en un navegador que ya visitó el sitio puede seguir saliendo el del v2 (con el punto dorado) un tiempo; no es un defecto del corte. En el teléfono (Ramón), «Agregar a pantalla de inicio» muestra el `apple-touch-icon` nuevo: nadie lo vio aún en un iPhone real.
- **Enlaces de afuera:** `curl -s -o /dev/null -w '%{http_code} %{redirect_url}' https://spindlelab.cl/diagnostico` → 308 a `/diagnostico/` (es la URL de la bio de Instagram, del DM y de varias publicaciones y correos). Los enlaces de Verifica y Cumple a `https://spindlelab.cl` responden 200, y la home sigue declarando el `@id` `https://spindlelab.cl/#org`.
- **Google Ads:** no se toca. Está detenida; reencenderla es decisión de Ramón.
- **Los correos de outbound dicen «diagnóstico gratis» y «24 horas»:** el sitio ya dice «revisión» y «un día hábil». Hay que alinear las plantillas de la rutina de outbound (lo hace la troncal) o el prospecto ve dos nombres para lo mismo.
- **(30-oct) La línea de la casa cambió:** el sitio dice «Sitios web a medida y marketing con IA»; el outbound y las bios de LinkedIn todavía dicen «Marketing y crecimiento con IA para empresas que ya venden» (Clara, `desvios/texto-30oct.md` §5). El logo de las redes y los documentos (avatar y piezas de Bruno, `e13/logo/avatar/` y `documentos/`) también es de la troncal. Se avisa el mismo día.

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
| **(30-oct)** `/404.html` y `/privacidad/` siguen con el diseño del v2 (encabezado, logo con el punto dorado, `inter.css`, pie con «Quiero mi revisión gratis»); el corte solo les cambia iconos, dos enlaces y la línea de marca | Ramón decide si se rehacen en A | Es otra obra |
| **(30-oct)** No hay `manifest`: `icon-192.png` está en `/v3/marca/` y nada lo enlaza | Diego, sin apuro | No estaba en el sitio |
| **(30-oct)** `public/v3/marca/favicon.svg` se redibujó con la i con su disco pero ninguna página lo pide | Diego, sin apuro | Se puede quitar en la próxima pasada; no molesta |
