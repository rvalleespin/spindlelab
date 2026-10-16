# E12 · Inventario de verdad: obra, ingredientes, métricas, telemetría y sandboxes

**16-oct-2026, mediciones entre las 14:50 y las 15:05 (Chile) · Diego, con el criterio de Simón** · rama
`claude/magical-franklin-ckfki2`, base `347e07f` · `origin/main` leído en `28dbb85` (trae el código de Verifica y
Cumple desde `241c1ab`) · manda `e12/insumos-ramon-16oct.md` · gemelo legible por máquina: `inventario-casos.json` ·
**corregido el 16-oct a las 18:45** (defecto 13 del acta del paso 1: método del `h1` de Combeau y una sola unidad;
ver «Correcciones», al final).

**Qué es.** La fuente única de lo que el índice de Trabajo, los casos, las «etiquetas de ingredientes», la telemetría
y los sandboxes pueden decir. **Regla:** una etiqueta o un número que no tenga fila aquí no existe. **Qué no es:**
texto del sitio (eso es de Clara) ni dirección visual (eso es de Lucía). No se tocó `spindlelab-astro/` ni se publicó
nada. Ningún prospecto va con nombre.

**Cómo leer las fuentes.** *Servido*: HTML o cabecera bajados hoy. *Medido*: un instrumento corrido hoy, con su
respuesta cruda guardada. *Repo*: archivo o commit. *Dicho*: alguien lo afirmó y no hay respaldo guardado. Los crudos
están en `e12/inventario/crudo/` (lista con sha256 en el JSON).

---

## 0 · Lo que este inventario le cambia a la obra

1. **Hay seis cosas reales que mostrar, y una sola de cliente.** Combeau (dos sitios, un cliente), Verifica y Cumple,
   el chequeo de 21 señales, Raigal (concepto) y el propio spindlelab.cl. Tres son propias, una es concepto. El
   permiso de Combeau es verbal y no cubre publicar mediciones de su sitio.
2. **El único antes y después medido dos veces con el mismo instrumento, con los dos crudos guardados, es nuestro:**
   Verifica y Cumple sacaba **54** en el chequeo de visibilidad el 14-oct y saca **94** hoy, después de que el 15-oct
   se le publicaron robots, llms.txt, sitemap y su schema completo. Es la parte Logic contada con nuestro propio
   producto: aplicamos el servicio y el número se movió. Publicarlo lo decide Ramón.
3. **Los ingredientes del brief de obra §5 quedan confirmados por lo servido:** Astro, Decap CMS, login con GitHub y
   Netlify en Combeau; Cloudflare Pages y Functions en Verifica y en spindlelab.cl. Se suman dos que el brief no
   tenía: **Netlify Image CDN** en Combeau y **Cloudflare Browser Rendering** en Verifica. Tailwind solo está en
   spindlelab.cl, y Lenis solo en el v3. **Nadie usa React, WebGL, IA programada ni «modelos RAG».**
4. **Combeau tiene una cifra de oficio real, y dos defectos abiertos.** La foto que él sube pesa 805 kB y el sitio la
   entrega en 95 kB (WebP, 828 px). Pero 7 de sus 11 rutas no tienen `<h1>`, el de la portada junta dos palabras
   para quien lo lee como texto («Se construyedirigiendo»; el encargo del 10-oct sigue sin aplicar) y el book en
   inglés declara `lang="es"`. Sirve como caso de diseño y de panel; no como vitrina de SEO.
5. **Telemetría verdadera hay de sobra**, y casi toda se recalcula por visita: el resultado del chequeo del visitante,
   el datacenter de Cloudflare que le respondió (`/cdn-cgi/trace`, sin la IP), lo que pesó y tardó su visita, el
   commit del build. Las etiquetas del brief («LAB_STATUS: ACTIVE», «SYS. ACTIVO», «VOL. 04») no tienen nada detrás.
6. **Ningún resultado de negocio de un cliente existe medido.** Ni visitas, ni consultas, ni contactos. Donde el
   método de Koto pone «Solution» con dato, aquí va lo que se hizo y lo que se midió del sitio, con fecha.

---

## 1 · Cómo se midió

| Qué | Cómo | Cuándo (UTC) | Crudo |
|---|---|---|---|
| Chequeo de visibilidad en IA | `curl -s "https://spindlelab.cl/api/chequeo?dominio=<dominio>"` para spindlelab.cl, bernardocombeau.cl y verifica.spindlelab.cl. Lee solo la portada de cada dominio | 17:51 | `chequeo-<dominio>.json` y `.headers.txt` |
| Chequeo de la Ley 21.719 | `GET https://verifica.spindlelab.cl/api/chequeo?dominio=<dominio>` sobre los dos dominios propios. No se corrió sobre Combeau (mostrarlo pediría su OK) ni el chequeo profundo (gasta la cuota mensual de navegador remoto) | 17:52 | `vyc-chequeo-<dominio>.json` |
| HTML servido y cabeceras | `curl` con user-agent de Chrome 141. De Combeau se guarda un extracto (generador, scripts, hojas, JSON-LD, colecciones del panel) con el sha256 del HTML completo, porque el HTML trae sus datos de contacto | 17:51 y 18:03 | `servido-*`, `cabeceras-varias.txt` |
| `h1` por ruta en Combeau | `curl -L` de las 11 rutas, contando `<h1` | 17:59 | `h1-bernardocombeau.cl.tsv` |
| La frase del `h1` de la portada de Combeau | `inventario/herramientas/medir-h1-portada.mjs`: Chromium 141 headless saca el `<h1>` del cuerpo de la respuesta (HTML servido, sin JS) y, tras `load`, lee su `textContent` y su `innerText`. Guarda el sha256 del HTML, no el HTML | 21:43 | `h1-portada-bernardocombeau.cl.json` |
| Carga y peso | `inventario/herramientas/medir-carga.mjs`: Chromium 141.0.7390.37 headless con Playwright 1.63.0, 390 × 844 (móvil, 3x) y 1440 × 900, 3 corridas por ancho, caché frío, sin scroll, sin aceptar cookies, 4 s tras `load`, bytes de CDP | 17:54 a 17:57 | `carga-playwright.json` |
| Imágenes de la portada de spindlelab.cl, una por una | `inventario/herramientas/medir-imagenes.mjs`: las mismas condiciones, una corrida por ancho, cada pedido de tipo imagen con sus bytes | 21:44 | `imagenes-spindlelab.cl.json` |
| Traza de Cloudflare | `GET https://spindlelab.cl/cdn-cgi/trace`, guardada sin las líneas `ip=` y `uag=` | 18:04 | `cdn-cgi-trace-spindlelab.cl.txt` |

**Los tiempos son de laboratorio, no de usuarios reales.** El contenedor sale a internet por la costa este de EE.UU.
(las respuestas de Cloudflare traen `cf-ray …-EWR` e `…-IAD`), sin limitar red ni CPU, y Chromium negoció HTTP/1.1
a través del proxy de la sesión, cuando un visitante real usa HTTP/2 o 3. Los kB transferidos dependen poco de eso;
los milisegundos, mucho. Ninguno es Core Web Vitals de campo.

**Unidad: kB = 1.000 bytes y MB = 1.000.000 bytes, en todo el inventario.** Redondeo al entero salvo donde va un
decimal; los bytes exactos están en cada crudo. Hasta las 18:45 de hoy este archivo mezclaba KiB (bytes ÷ 1.024)
escritos «KB» con kB: ver «Correcciones».

**Lo que no se pudo leer:** el repo de Combeau (`rvalleespin/bernardo-combeau`) no está habilitado en esta sesión, y no
se agregó porque nadie lo pidió. Su stack sale de lo que sirve el sitio, que en esto alcanza.

---

## 2 · Los proyectos

| Entrada | Tipo | Año | Para quién | Permiso y dónde consta | URL | Estado al 16-oct |
|---|---|---|---|---|---|---|
| Combeau, fotografía | Cliente | 2026 | Bernardo Combeau, fotógrafo de retrato | **Verbal**, 30-sep, confirmado por Ramón en sesión: `ventas/proyectos-en-curso.md:16` y `marketing/portafolio/README.md:10`. **Sin respaldo escrito.** Lo contradicen, desactualizados, `oficina/clientes/bernardo-combeau.md:15` («NO autorizado») y `ventas/pipeline.md:26` («aún no pedido») | bernardocombeau.cl | En producción desde el 24-jul; Netlify desde el 8-sep; pagado al 100 % |
| Combeau, modelo | Cliente | 2026 | El mismo | El mismo permiso | bernardocombeau.cl/modelo/ | En producción |
| Verifica y Cumple | Producto propio | 2026 | Propio; servicio de SpindleLab desde el 21-sep (`ventas/casos-de-exito/verifica-y-cumple.md`, en main) | Propio | verifica.spindlelab.cl | En producción desde el 23-sep; el dominio viejo `verificaycumple.pages.dev` redirige con 301 |
| Chequeo de 21 señales | Herramienta propia | 2026 | Cualquiera, sobre su dominio | Propio | spindlelab.cl/diagnostico/ · `/api/chequeo` | En producción desde el 27-ago (`4bdfb62`); último cambio del código en main el 23-sep (`a453333`), igual en la rama v3 |
| Raigal | Concepto | 2026 | Nadie: «Raigal no existe» | Propio, rotulado; Ramón lo revisa antes de mostrarlo a un prospecto (R9; `portafolio/01-raigal/ficha.md:90`) | Ninguna | Solo la portada, en el repo; en el v3, solo como maqueta |
| spindlelab.cl | Propio | 2026 | Propio | Propio | spindlelab.cl · v3 en vista previa noindex | Producción v2. El v3 no está publicado (`spindlelab.cl/v3/` da 404); la vista previa sirve el build de `f0d911c` (14-oct): su `/v3/trabajo/` es idéntica byte a byte a `dist/` |

**Lo que el permiso de Combeau no cubre** (brief de obra §8.5): publicar una medición fechada de su sitio, grabar su
sitio o su panel, y usar una foto suya en un antes y después. Para eso hace falta su sí por escrito; un WhatsApp basta.

### 2.1 · Combeau, fotografía

**Qué se hizo.** Sitio y panel de administración: él carga sus series y el sitio se arma solo (`obra-v3.json:16`). Plan
Esencial más una sección adicional cobrada y entregada (`proyectos-en-curso.md`, «Estado de pagos»).

| Ingrediente | Lo que le hace al cliente (borrador para Clara) | Evidencia |
|---|---|---|
| **Astro** | Las páginas llegan armadas: la portada no carga ningún script externo y trae uno solo en línea | Servido: `meta generator «Astro v7.3.1»`, hojas en `/_astro/`; 0 scripts externos (extracto) |
| **Decap CMS** | Él carga sus series solo, desde un panel | Servido: `/admin/` carga `decap-cms@3.15.1`, backend `github`, 8 colecciones. Repo: «creó series de prueba él mismo» (`proyectos-en-curso.md:16`) |
| **Login con GitHub** | Entra al panel con su cuenta de GitHub | Servido: `/api/auth` → 302 a `github.com/login/oauth/authorize`. Repo: login verificado el 23-sep (`cierre-oauth-bernardo-…-23sep.md`) |
| **Netlify** | (sin efecto que contar) | Servido: `server: Netlify`, `x-nf-request-id`. Repo: migración del 8-sep (`cierre-oauth-…:20`) |
| **Netlify Image CDN** | Sube la foto tal cual y el sitio la entrega recortada y en WebP: 805 kB → 95 kB en una foto de la portada | Servido: 11 rutas `/.netlify/images` en la portada. Medido: `beto3.jpg` original `image/jpeg` 804.697 bytes; servida a 828 px, `image/webp` 94.576 bytes |
| **Datos estructurados** (Person, LocalBusiness) | Una máquina puede leer quién es, a qué se dedica y dónde trabaja | Servido: JSON-LD en `/` y `/modelo/`. Repo: antes del 3-sep, «JSON-LD: cero en todo el sitio» (`memoria/diego-web.md:66`). Medido: el chequeo los encuentra |
| **llms.txt** | (sin efecto que contar) | Medido: chequeo, señal en ok |

**No tiene:** Tailwind (0 variables `--tw-` en sus dos hojas), React, WebGL, IA. Vercel lo usó hasta el 8-sep, hoy no.

**Una contradicción que se resuelve con precisión.** `ventas/pipeline.md:25` dice que en Bernardo las fotos «se
publican tal cual». Es cierto del archivo guardado (el original queda en `/uploads/` con 805 kB) y falso de lo que ve
el visitante, que recibe la versión del CDN. La etiqueta dice lo segundo.

### 2.2 · Combeau, modelo

Book en inglés en el mismo dominio, con su propia marca y navegación (`obra-v3.json:33`).

| Ingrediente | Lo que le hace al cliente | Evidencia |
|---|---|---|
| Astro, Netlify Image CDN, datos estructurados | Los mismos de 2.1 | Servido: generador `Astro v7.3.1`, 52 rutas `/.netlify/images`, JSON-LD Person + LocalBusiness |
| **Decap CMS** | El book también se edita desde el panel | Servido: colección «Modelo» con 9 archivos (`bernardo-site/src/data/modelo/*.json`). Que él lo haya editado, no consta |
| **Video con carga diferida** | La página no baja el video ni el reel hasta que hacen falta | Servido: `<video preload="none" data-src=…>` desde un CDN externo y reel de YouTube sin cookies con `data-src`. Medido: 0 kB de video en la carga inicial |

**No tiene:** marcado de idioma correcto. El texto está en inglés y la página declara `lang="es"`: no se puede
etiquetar «bilingüe». El chequeo lee solo la raíz del dominio, así que /modelo/ no tiene puntaje propio.

### 2.3 · Verifica y Cumple

**Qué se hizo.** Chequeo gratuito de las señales de la Ley 21.719 que se ven desde afuera (política enlazada, HTTPS,
permiso antes de rastreadores, casilla de consentimiento), más un chequeo profundo que abre un navegador remoto.
Primera versión el 3-sep (`b7b8fb7`), en `verifica.spindlelab.cl` desde el 23-sep.

| Ingrediente | Lo que le hace al cliente | Evidencia |
|---|---|---|
| **HTML y CSS escritos a mano** | Una sola página: 8 pedidos y 270 kB en la carga | Servido: sin generador, CSS en línea. Repo: `verificaycumple/public/index.html` (main). Medido: carga |
| **Cloudflare Pages** | (sin efecto que contar) | Servido: `server: cloudflare`, `cf-ray`. Repo: `wrangler.toml`, `pages_build_output_dir = "public"` |
| **Cloudflare Pages Functions** | El chequeo corre en el servidor, en segundos, sobre el dominio que escribas | Medido: `/api/chequeo` respondió 200 en 0,52 s. Repo: `functions/api/chequeo.js`, `doce-puntos.js`, `profundo.js` |
| **Cloudflare Browser Rendering** | El chequeo profundo abre un navegador de verdad para ver qué se dispara antes del permiso | Repo: `profundo.js` habla CDP con un navegador remoto; `wrangler.toml` documenta el token. **No se corrió hoy**: la etiqueta la respalda el repo, no una corrida |
| **Cloudflare KV** | Un tope de abuso para el chequeo profundo | Repo: `[[kv_namespaces]]`, binding `VYC_TOPES` |
| **Cloudflare Web Analytics** | (sin efecto que contar) | Servido: `beacon.min.js` de `static.cloudflareinsights.com` |
| **Web3Forms** | (sin efecto que contar) | Servido: formulario hacia `web3forms.com/submit` |
| **Datos estructurados** (WebApplication, WebPage, ProfessionalService, Person, FAQPage) | Explican 32 de los 40 puntos que subió el chequeo entre el 14 y el 16-oct; los otros 8 son llms.txt y sitemap (§4.1) | Servido: JSON-LD con fechas 2026-09-23 y 2026-10-15. Repo: `7696d63`, 15-oct |
| **robots.txt, llms.txt y sitemap.xml** | Antes, las tres rutas devolvían la portada con 200 | Repo: `9391a0b`, 15-oct. Medido: chequeo, llms y sitemap en ok |

### 2.4 · Chequeo de 21 señales

Lee la portada de un dominio y reporta 21 señales: ¿te pueden leer? (30), ¿te entienden? (40), ¿te pueden citar?
(30). Contado hoy en las tres respuestas: 21 ítems, 100 puntos.

| Ingrediente | Lo que le hace al cliente | Evidencia |
|---|---|---|
| **Cloudflare Pages Functions** | El chequeo corre en el servidor; tu navegador solo pregunta | Repo: `functions/api/chequeo.js:1246`. Medido: 3 corridas, 200 en 0,6 a 1,4 s, `cache-control: no-store` |
| **Prueba con el nombre de tres robots de IA** | Te dice si tu servidor echa a los robots de ChatGPT o Perplexity aunque tu robots.txt los deje entrar | Medido: detalle de la señal «El servidor no expulsa a los robots de IA» (OAI-SearchBot, ChatGPT-User, PerplexityBot) |

### 2.5 · Raigal

Portada de una clínica de implantología que no existe (`portafolio/01-raigal/ficha.md`). HTML y CSS a mano en un
archivo de 40 kB (40.093 bytes); JSON-LD Dentist, Person, MedicalProcedure y FAQPage. **No está servida en ninguna URL**, así que sus
etiquetas solo pueden decir «en la maqueta», y por regla de la serie no lleva cifras (`portafolio/README.md`, regla 3).

### 2.6 · spindlelab.cl

| Ingrediente | Evidencia |
|---|---|
| **Astro** | Servido: `Astro v4.16.19` en producción y en la vista previa. Repo: `package.json` |
| **Tailwind CSS** | Servido: 217 variables `--tw-` en `/_astro/index.DELdUd0E.css`. Repo: `tailwindcss` 3.4.19 |
| **Cloudflare Pages + Functions** | Servido: `server: cloudflare`. Repo: `functions/api/chequeo.js` |
| **GA4 y Meta Pixel tras el aviso de cookies** | Servido: `gtag` y `fbq`, `consent-banner.js?v=3`. Medido: sin aceptar, 11 kB de terceros y todos de Cloudflare; Verifica: política en ok, permiso previo sin confirmar desde afuera |
| **Lenis, solo en el v3** | Repo: `Layout.astro:213-246`, apagado con movimiento reducido. Servido: está en el JS de la vista previa (`hoisted.Bkkmjuy0.js`), no en el de producción |

**No tiene todavía:** Motion (lo pide el brief para la construcción). Next.js y React, no.

---

## 3 · El stack de cada sitio en vivo, de un vistazo

| | spindlelab.cl (v2) | v3 (vista previa) | bernardocombeau.cl | verifica.spindlelab.cl |
|---|---|---|---|---|
| Generador | Astro 4.16.19 | Astro 4.16.19 | Astro 7.3.1 | ninguno (a mano) |
| Hosting (cabecera) | Cloudflare | Cloudflare, `x-robots-tag: noindex` | Netlify | Cloudflare |
| CSS | Tailwind | Tailwind | CSS propio por componente | CSS en línea |
| JS en la carga | 3 scripts externos (uno enlazado dos veces), 4 en línea; 23,6 kB (mediana a 390) | 3 externos, 5 en línea; 24,5 kB (mediana a 390), con Lenis | 0 externos, 1 en línea | 1 externo (analítica), 2 en línea |
| Contenido editable | no | no | Decap CMS 3.15.1 + GitHub | no |
| Imágenes | archivos propios | archivos propios | Netlify Image CDN (WebP) | PNG y WebP propios |
| Funciones | `/api/chequeo` | `/api/chequeo` (responde 200) | `/api/auth` (OAuth) | `/api/chequeo`, `doce-puntos`, `profundo` |
| Analítica | GA4 + Pixel tras consentimiento; beacon de Cloudflare | GA4 + Pixel tras consentimiento (mismo Layout) | ninguna detectada | Cloudflare Web Analytics |
| Datos estructurados | ProfessionalService, WebSite, Person, FAQPage | ProfessionalService, WebSite, Person, WebPage | Person, LocalBusiness | WebApplication, WebPage, ProfessionalService, Person, FAQPage |

---

## 4 · Métricas que existen hoy

### 4.1 · Puntajes

| Sitio | Instrumento | Valor | Fecha | Crudo | Publicable |
|---|---|---|---|---|---|
| verifica.spindlelab.cl | Chequeo de visibilidad (el mismo dos veces) | **54 → 94** | 14-oct 22:29Z → 16-oct 17:51Z | `e9/piezas/crudo/2026-10-14/verifica.spindlelab.cl/chequeo-ia.json` · `chequeo-verifica.spindlelab.cl.json` | Decide Ramón |
| spindlelab.cl | Chequeo de visibilidad | **85** (igual que el 14-oct) | 16-oct 17:51Z | `chequeo-spindlelab.cl.json` | Decide Ramón |
| bernardocombeau.cl | Chequeo de visibilidad | **76** | 16-oct 17:51Z | `chequeo-bernardocombeau.cl.json` | Pide OK escrito de Bernardo |
| spindlelab.cl | Verifica y Cumple | **36 → 73 → 100** | 9-sep y 21-sep: *dicho* (caso de éxito, `9ebf384`; post del 21-sep), sin crudo · 100: 14-oct y 16-oct, con crudo | `vyc-chequeo-spindlelab.cl.json` | Solo en Trabajo (E9), diciendo que el 23-sep cambió la regla y que el 100 es sobre 14 de 20 puntos de peso |
| verifica.spindlelab.cl | Verifica y Cumple | **100** sobre 18 de 24 puntos de peso | 16-oct 17:52Z | `vyc-chequeo-verifica.spindlelab.cl.json` | Decide Ramón; con el «18 de 24» al lado |

**Lo que dice el 54 → 94, señal por señal.** El 14-oct faltaban nueve: entidad, entidad con dirección, perfiles externos,
persona detrás, descripción, llms.txt, preguntas frecuentes, sitemap y fecha. Hoy falta una: los tres perfiles externos.
`functions/api/chequeo.js` no cambió en main entre las dos fechas. El commit `7696d63` nombra un 62 intermedio y el
puntaje de un competidor: sin crudo, no se usan.

**Lo que le falta a cada uno hoy**, para quien construya la parte Logic: spindlelab.cl, perfiles externos (declara 2,
pide 3), títulos como pregunta y fecha en el schema. Combeau, perfiles externos, preguntas frecuentes, títulos como
pregunta, fecha y contenido suficiente en la portada.

### 4.2 · Carga y peso (laboratorio; mediana de 3; método en §1; kB = 1.000 bytes)

| Página | Ancho | Primer byte | Primera pintura | LCP | load | CLS | Pedidos | Transferido | De terceros |
|---|---|---|---|---|---|---|---|---|---|
| spindlelab.cl (v2) | 390 | 217 ms | 732 ms | 732 ms | 1202 ms | 0 | 18 | 929 kB | 11 kB |
| | 1440 | 298 ms | 820 ms | 820 ms | 1200 ms | 0,084 | 18 | 929 kB | 11 kB |
| v3 `/v3/` (vista previa) | 390 | 229 ms | 740 ms | 792 ms | 1065 ms | 0 | 18 | 401 kB | 0 |
| | 1440 | 152 ms | 672 ms | 672 ms | 853 ms | **0,106** | 21 | 443 kB | 0 |
| v3 `/v3/trabajo/` | 390 | 181 ms | 648 ms | 760 ms | 821 ms | 0 | 16 | 502 kB | 0 |
| | 1440 | 124 ms | 564 ms | 684 ms | 769 ms | 0 | 16 | 482 kB | 0 |
| bernardocombeau.cl | 390 | 188 ms | 548 ms | 1536 ms | 1373 ms | 0 | 15 | 528 kB | 0 |
| | 1440 | 125 ms | 780 ms | 832 ms | 684 ms | 0 | 12 | 417 kB | 0 |
| bernardocombeau.cl/modelo/ | 390 | 218 ms | 460 ms | 1296 ms | 1214 ms | 0 | 11 | 571 kB | 0 |
| | 1440 | 138 ms | 408 ms | 1044 ms | 943 ms | 0 | 11 | 571 kB | 0 |
| verifica.spindlelab.cl | 390 | 290 ms | 524 ms | 1132 ms | 1083 ms | 0 | 8 | 270 kB | 11 kB |
| | 1440 | 246 ms | 636 ms | 1012 ms | 1015 ms | 0,067 | 8 | 270 kB | 11 kB |

- **El peso de spindlelab.cl no incluye su video del hero**, que en la medición no llegó a bajarse. Ese archivo pesa
  5.091.275 bytes (5,1 MB, `HEAD` de hoy): un visitante cuyo navegador lo reproduce baja hasta eso de más. De los 929
  kB medidos, 793 son imágenes, y las cinco son posters de video: cuatro de 171 a 196 kB y el del hero, 41 kB
  (`imagenes-spindlelab.cl.json`, 21:44).
- **CLS de 0,106 en la home v3 a 1440**, en 2 de 3 corridas: pasa el umbral de 0,1. Va a la construcción de E12.
- Las corridas variaron: el `load` de una misma página se movió hasta 970 ms entre corridas (crudo, campo `corridas`).
  Por eso va la mediana, y por eso no se publica el milisegundo.

### 4.3 · Otros antes y después que ya estaban en el repo

| Qué | Antes → después | Fecha y fuente | Publicable |
|---|---|---|---|
| Datos estructurados en Combeau | cero en todo el sitio → Person + LocalBusiness | 3-sep (`memoria/diego-web.md:66`) → servido hoy. Cualitativo: no hay puntaje del antes | Con OK de Bernardo |
| `h1` en Combeau | 7 de 11 rutas sin `h1` → igual | 10-oct (`encargo-h1-sitio-bernardo-10oct.md` §2) → hoy (`h1-bernardocombeau.cl.tsv`) | No: es un defecto abierto |
| La frase del `h1` de la portada de Combeau | Servida como `Se construye<br>dirigiendo`; su `textContent` dice «Se construyedirigiendo» y su `innerText` (lo que se ve) las separa con un salto de línea → igual | 10-oct (`encargo-h1-sitio-bernardo-10oct.md` §3, que encontró la causa: el `split` de `fraseHero` en `index.astro:50`) → hoy 21:43 (`h1-portada-bernardocombeau.cl.json`) | No: es un defecto abierto |
| Foco de teclado en el v3 | 111 paradas tapadas hacia adelante y 14 hacia atrás → 0 | QA del 6-oct (`acta-qa-final.md:29`) | Decide Ramón; es proceso interno |
| UTM hasta el formulario del v3 | se perdían al segundo salto → llegan en 8 de 8 recorridos | QA del 6-oct (`acta-qa-final.md:30`) | Decide Ramón |
| robots, llms y sitemap de Verifica | las tres rutas devolvían la portada con 200 → archivos propios | 14-oct (los tres con el mismo sha256 que la portada en `e9/piezas/crudo/2026-10-14/registro.json`) → `9391a0b`, 15-oct | Junto con el 54 → 94 |

### 4.4 · Sin métrica

- **Resultados de negocio de cualquier cliente:** visitas, consultas, contactos, ventas. Combeau no tiene analítica
  detectable en lo servido; el repo no tiene ningún dato.
- **Lighthouse, PageSpeed y datos de campo (CrUX):** no se corrieron.
- **Cuántos chequeos se han corrido:** el chequeo no guarda dominios; el evento `chequeo_completado` de GA4 cuenta solo
  a quien aceptó cookies y no está exportado.
- **Puntaje del chequeo para la home v3:** el chequeo lee la raíz del dominio, no `/v3/`. La línea base del criterio 12
  se toma en la construcción (el 6-oct, el acta registró 83 sobre el build de entonces).
- **Tiempo de entrega de Combeau de punta a punta:** el repo tiene el lanzamiento (24-jul) y no el inicio.
- **El chequeo profundo de Verifica:** no se corrió (cuota).
- **Kits o suscripciones de Verifica vendidos:** el repo no registra ninguno.

---

## 5 · Telemetría: lo que el sitio puede mostrar en vivo o en el build

### 5.1 · Verdadera (se recalcula y tiene fuente)

| Qué | De dónde sale | Cuándo cambia | ¿Existe hoy? |
|---|---|---|---|
| El resultado del chequeo del visitante | `/api/chequeo`: puntaje, 21 ítems, respuesta por robot, `revisadoEn` | Por visita | Sí. `v3-chequeo.js` no muestra la hora todavía |
| El puntaje de spindlelab.cl, con su fecha | `chequear()` exportado de `chequeo.js`, en el build; o `/api/chequeo` en vivo | Por build o por visita | No. Pide el OK de Ramón |
| Commit y fecha del build | `CF_PAGES_COMMIT_SHA` y `CF_PAGES_BRANCH` en el build de Cloudflare Pages, o `git log -1` | Por despliegue | No. Es la fecha del build, no del último cambio de texto, y se dice así |
| Lo que pesó esta página | En el build, sumando `dist/`; o en el navegador del visitante con Resource Timing | Por build o por visita | No. `transferSize` da 0 con caché o sin `Timing-Allow-Origin`: se rotula «esta visita» |
| Lo que tardó esta visita | Navigation Timing y el observador de LCP, en su navegador | Por visita | No. Es su equipo y su red, y se dice |
| El datacenter que le respondió y con qué protocolo | `GET /cdn-cgi/trace` en el mismo dominio: `colo`, `http`, `tls` | Por visita | Sí (`cdn-cgi-trace-spindlelab.cl.txt`). **Nunca mostrar `ip=`** |
| La hora de Santiago | `Intl.DateTimeFormat`, zona `America/Santiago` | En vivo | No |
| Las 21 señales y sus pesos | Leídas de `chequeo.js` en el build | Por build | Sí |
| Los datos estructurados y los encabezados de la propia página | El DOM | En vivo | Sí |
| El robots.txt propio | `fetch("/robots.txt")` | En vivo | Sí |
| Fecha de publicación y de actualización de cada artículo | `datePublished` y `dateModified` de su JSON-LD | Por build | Sí |
| El chequeo de la Ley 21.719 del visitante | `verifica.spindlelab.cl/api/chequeo`, que responde con `access-control-allow-origin: *` | Por visita | Sí. Verifica tiene línea editorial propia (E9): mejor enlazar que incrustar |

### 5.2 · Falsa o decorativa (no va)

| Qué | Por qué |
|---|---|
| «[ LAB_STATUS: ACTIVE ]», «SYS. ACTIVO» | No hay un estado detrás que pueda cambiar |
| «[ DEPLOYMENT_CYCLE: 2026 ]», «VOL. 04», «LAB_01» | Numeración sin referente. Si numera algo real (las entradas del índice), dice qué |
| «LAT. 33.44° S» | Es la latitud aproximada del centro de Santiago, no la del estudio, y no cambia: decoración aunque sea cierta. La dirección exacta no está confirmada: el schema de Verifica dice «Los Leones 2270», tomada de Instagram y marcada para confirmar (`7696d63`); el de spindlelab.cl dice solo «Santiago, CL». Si va una coordenada, es de la ciudad y dice de dónde sale |
| Latencia de modelos, llamadas a API simuladas, diagramas de flujo de datos con números | No hay modelos ni flujo de datos en ninguna pieza |
| Contadores de proyectos, clientes o chequeos | Hay 2 clientes de desarrollo web y uno con permiso; el chequeo no guarda dominios |
| Uptime, «99,9 %» | No hay monitoreo |
| Una fecha de despliegue escrita a mano | Se queda vieja al siguiente despliegue; si va, la escribe el build |

---

## 6 · Sandboxes

### 6.1 · Verdaderos

| Sandbox | Estado | Qué hace | Cómo, sin fingir |
|---|---|---|---|
| **El chequeo en vivo** | Existe | El visitante escribe su dominio; el servidor lo lee y le dice qué robot entró y qué falta | `v3-chequeo.js` + `/api/chequeo`. Es el único que corre sobre el sitio del visitante |
| **Esta página, como la lee un robot** | Por construir | Muestra el HTML que llega sin estilos ni scripts, los encabezados, los datos estructurados y lo que el servidor le respondió a cada robot | `fetch(location.href)` para el texto servido; el DOM para JSON-LD y encabezados; `/api/chequeo?dominio=spindlelab.cl` para la respuesta por robot. Pedir con el nombre de un robot solo se puede desde el servidor: el navegador no deja cambiar el user-agent |
| **Modo esqueleto** | Por construir | Contornea los elementos reales y dibuja las columnas de la retícula leídas de su CSS | Una clase en `<html>` con `outline` y una capa que lee `getComputedStyle(...).gridTemplateColumns`. Reversible, quieto con movimiento reducido, sin ocultar nada al lector de pantalla. **Si es un dibujo aparte, es decoración** |
| **Tu visita, medida** | Por construir | Cuánto pesó y tardó esta página en tu navegador, y qué datacenter respondió | Resource Timing, Navigation Timing, LCP, `/cdn-cgi/trace` sin la IP |
| **La foto que sube Bernardo y la que ve su visitante** | Por construir | La misma foto: 805 kB como la sube, 95 kB como la entrega el sitio | Las dos URLs reales. **Pide su OK escrito** |

### 6.2 · No verdaderos

| Idea | Por qué no |
|---|---|
| «Ejecutar optimización» que reescribe un texto | Finge un proceso que no ocurre |
| Chat o «RAG» con respuestas escritas de antemano | No hay IA programada en ninguna pieza |
| Terminal que «despliega» con líneas inventadas | Logs que nadie generó |
| Pasar de Light Mode a Wireframe cambiando colores | Es un tema visual, no la estructura. Como estética lo decide Lucía; como sandbox, no |

---

## 7 · Lo que no se puede decir

| Qué | Por qué | Fuente |
|---|---|---|
| Ningún resultado de negocio de un cliente (+X %, leads, retención, ventas) | No existe ninguna medición de resultado de cliente | `ventas/proyectos-en-curso.md`; `e11/material.md` §5-6 |
| «IA propietaria», «modelos RAG», «despliegue de modelos», «WebGL», «React», «Estrategia C-Level» como ingredientes | Ninguna pieza los usa. La única con IA programada es Praxi, y está fuera | §2 y §8 |
| El 40 % y el +150 % del segundo texto de Ramón | Son ejemplos, no datos | `insumos-ramon-16oct.md` §5 |
| El 76 de Combeau, el peso de sus páginas o su foto en un antes y después | El permiso verbal es del caso, no de sus mediciones | Brief de obra §8.5 |
| El 85 de spindlelab.cl y el 54 → 94 de Verifica, sin el OK de Ramón | Los puntajes del chequeo propio esperan su decisión | `e11/material.md` §6 |
| El 36 → 73 → 100 fuera de Trabajo, o sin decir que cambió la regla y que el 100 es sobre 14 de 20 | E9 lo deja solo en Trabajo; el caso de éxito trae el aviso del 16-oct | `e9/brief-e9.md` §3; caso de éxito (main) |
| Los tiempos de este inventario como velocidad para tus visitantes o como Core Web Vitals | Laboratorio, desde EE.UU., sin limitar la red | §1 |
| «Bilingüe» para el book de modelo | `lang="es"` sobre texto en inglés | Extracto servido |
| Que el sitio de Combeau es un ejemplo de SEO técnico | 7 de 11 rutas sin `h1` | `h1-bernardocombeau.cl.tsv` |
| «Clientes», en plural y con nombre, en desarrollo web | Hay dos ganados y uno solo con permiso | `ventas/pipeline.md:25-26` |
| Que Verifica y Cumple certifica cumplimiento | Describe señales; no certifica | Caso de éxito (main) |
| Cualquier dato de un prospecto, incluido el competidor que nombra `7696d63` | Sin permiso | Manual de marca; `CLAUDE.md` |

---

## 8 · Lo que existe y queda fuera del índice

| Qué | Por qué queda fuera |
|---|---|
| Módulo 369 (cliente) | Sin permiso de caso; en construcción (Fase 1 desde el 6-oct). No se midió (`proyectos-en-curso.md:15`) |
| Praxi (propio) | Otra marca y otro repo (Next.js 14 + Supabase, coach de IA). Dormido: daba 402 el 23-sep y Ramón pidió no tocarlo. No entra sin su decisión (brief §5) |
| SimpleTrust (cliente de SEO) | Sin permiso; la solicitud nunca se envió (`ventas/pipeline.md:32`) |
| Aplomo y Deslinde (concepto) | Ramón eligió una sola pieza de concepto; sin revisión fina (`portafolio/README.md`) |
| Índice de Citabilidad | Retirado: `/indice/` redirige con 301 a `/diagnostico/` (`_redirects:1-2`) |
| Mini-diagnósticos entregados | Son de prospectos con nombre. Sirven como hallazgos generalizados (`e11/material.md` §1-2), nunca como caso |

---

## 9 · Lo que queda para otros

1. **Ramón:** pedirle a Bernardo por escrito el caso, una medición fechada de su sitio, grabar su sitio y su panel, y
   una foto para el antes y después. Y decidir si se muestran los puntajes propios (85; 54 → 94).
2. **Troncal:** la ficha de Bernardo (`:15`) y el pipeline (`:26`) siguen diciendo que no hay permiso, y
   `proyectos-en-curso` dice que sí, verbal. Son documentos compartidos: no los toqué.
3. **Sesión del sitio de Bernardo:** el encargo de `h1` del 10-oct sigue sin aplicar, y /modelo/ declara `lang="es"`
   con el texto en inglés.
4. **Construcción E12:** el CLS de 0,106 de la home v3 a 1440 (laboratorio, 2 de 3 corridas).
5. **Lucía:** los kB cambiaron (ver «Correcciones»). El tablero de E12 los lee del JSON (`kbTransferidos` y el valor
   del `h1` de Combeau), así que se corrige al rearmarlo. `lock-koto.md:529` y `:556` dicen «786 KB → 92 KB», que en
   la unidad de este inventario son **805 kB → 95 kB**.

## Crudos

En `e12/inventario/crudo/`, con sha256 en `inventario-casos.json`: las tres respuestas del chequeo con sus cabeceras,
las dos de Verifica y Cumple, el HTML servido de spindlelab.cl y de Verifica, el extracto de Combeau, las cabeceras de
cada sitio, `cabeceras-varias.txt` (CDN de imágenes, original subido, login, video del hero, vista previa, dominio
viejo de Verifica, `/v3/` en producción), `h1-bernardocombeau.cl.tsv`, `h1-portada-bernardocombeau.cl.json`,
`carga-playwright.json`, `imagenes-spindlelab.cl.json` y la traza de Cloudflare sin IP. Las herramientas quedan en
`e12/inventario/herramientas/`: `medir-carga.mjs`, `medir-h1-portada.mjs` y `medir-imagenes.mjs`.

## Correcciones

**16-oct, 18:45 · defecto 13 del acta del paso 1** (`e12/acta-paso-1.md` §2, Javiera, vuelta 1).

1. **El `h1` «pegado» de Combeau no tenía método que lo midiera.** El valor lo afirmaba, pero el método y el crudo
   citados solo contaban `h1`. Ahora la frase tiene su propia medición (`medir-h1-portada.mjs` →
   `h1-portada-bernardocombeau.cl.json`, 21:43 UTC): servido `Se construye<br>dirigiendo`, `textContent` «Se
   construyedirigiendo», `innerText` con salto de línea. Por eso el valor dice «leído como `textContent`»: lo pegado
   es lo que lee una máquina que junta el texto del nodo, no lo que ve una persona. La fuente de la frase y de su
   causa es el encargo del 10-oct §3. Va en §1, §0.4 y §4.3, y en el JSON (método, dos crudos y `fuente`).
2. **Una sola unidad.** El acta vio «786 KB → 92 KB» en KiB junto a cargas en kB. Releído contra los crudos, **las
   cargas también estaban en KiB** (bytes ÷ 1.024, que es lo que imprimía `medir-carga.mjs`) aunque el rótulo decía
   «kB»: el 515 de Combeau eran 527.852 bytes. Solo los 40 kB de Raigal estaban ya en kB. Ahora todo va en
   kB = 1.000 bytes y MB = 1.000.000 bytes, y `medir-carga.mjs` imprime en esa unidad (su crudo guarda bytes y no
   cambió). Lo que cambió:

   | Qué | Antes | Ahora | Bytes |
   |---|---|---|---|
   | Foto de Combeau, original | 786 KB | 805 kB | 804.697 |
   | La misma, servida | 92 KB | 95 kB | 94.576 |
   | spindlelab.cl (v2), transferido · de terceros | 908 · 10 | 929 · 11 | 929.485 · 10.664 (390) |
   | v3 `/v3/`, 390 · 1440 | 391 · 432 | 401 · 443 | 400.676 · 442.810 |
   | v3 `/v3/trabajo/`, 390 · 1440 | 490 · 471 | 502 · 482 | 501.938 · 482.278 |
   | Combeau, 390 · 1440 | 515 · 408 | 528 · 417 | 527.852 · 417.337 |
   | Combeau `/modelo/`, los dos anchos | 558 | 571 | 571.218 · 571.128 |
   | Verifica, los dos anchos (de terceros: 11, igual) | 264 | 270 | 270.140 · 270.136 |
   | Video del hero | 4,9 MB | 5,1 MB | 5.091.275 |
   | JS en la carga, spindlelab.cl · v3 | 23 · 24 | 23,6 · 24,5 | 23.646 · 24.516 (390) |
   | Imágenes de spindlelab.cl | 774 | 793 | 793.047 (390) |

3. **Al pasar a kB las imágenes de spindlelab.cl apareció un error de contenido.** «Los posters de cuatro videos, de
   167 a 191 KB cada uno» no tenía crudo por pedido y contaba cuatro: son **cinco**, cuatro de 171 a 196 kB y el del
   hero, 41 kB (`medir-imagenes.mjs` → `imagenes-spindlelab.cl.json`, 21:44 UTC). Corregido en §4.2.
