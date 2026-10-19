# E12 · Inventario de verdad: obra, ingredientes, métricas, telemetría y sandboxes

**16-oct-2026, mediciones entre las 14:50 y las 15:05 (Chile) · Diego, con el criterio de Simón** · rama
`claude/magical-franklin-ckfki2`, base `347e07f` · `origin/main` leído en `28dbb85` (trae el código de Verifica y
Cumple desde `241c1ab`) · manda `e12/insumos-ramon-16oct.md` · gemelo legible por máquina: `inventario-casos.json` ·
**corregido el 16-oct a las 18:45** (defecto 13 del acta del paso 1: método del `h1` de Combeau y una sola unidad;
ver «Correcciones», al final) · **actualizado el 18-oct con el encargo del paso 2 §5** (defecto 3 de
`e12/acta-paso-2.md`): el índice pasa a diez entradas, las seis reales con Praxi y las cuatro piezas de concepto
(§2.5 y §2.7); Raigal sale (§8); el permiso de Combeau es el de la compuerta 1, punto 2 (§2); sus grabaciones, en §2.8;
la capa de señales de las rutas nuevas, en `e12/senales-trabajo.md` (Simón). Mediciones del 18-oct entre las 21:22 y
las 21:34 UTC, sobre `01ea00f`. **Actualizado el 19-oct con la compuerta 2** (Ramón, hacia las 09:50; `e12/insumos-ramon-19oct.md`):
Combeau es caso real con página propia y se le recortan sus medidas en todo medio (§2.8, corrección, y §2.9, el
material del caso, con los medios en `e12/casos/combeau/`); los puntajes propios no se muestran (§4.1); la capa de
señales de todas las rutas, en `e12/senales-obra.md`. Marcas **[C2]**.

**Qué es.** La fuente única de lo que el índice de Trabajo, los casos, las «etiquetas de ingredientes», la telemetría
y los sandboxes pueden decir. **Regla:** una etiqueta o un número que no tenga fila aquí no existe. **Qué no es:**
texto del sitio (eso es de Clara) ni dirección visual (eso es de Lucía). No se tocó `spindlelab-astro/` ni se publicó
nada. Ningún prospecto va con nombre.

**Cómo leer las fuentes.** *Servido*: HTML o cabecera bajados hoy. *Medido*: un instrumento corrido hoy, con su
respuesta cruda guardada. *Repo*: archivo o commit. *Dicho*: alguien lo afirmó y no hay respaldo guardado. Los crudos
están en `e12/inventario/crudo/` (lista con sha256 en el JSON).

---

## 0 · Lo que este inventario le cambia a la obra

1. **El índice tiene diez entradas: seis reales, dos de ellas de un mismo cliente, y cuatro piezas de concepto**
   (18-oct; §2). Reales: Combeau fotografía y Combeau modelo (un cliente, dos sitios), Verifica y Cumple, el chequeo
   de 21 señales, spindlelab.cl y Praxi, que entra por la compuerta 1, punto 3, con su propio inventario
   (`inventario-praxi.md`). Concepto: Tonela, Ocelo, Sesenta y Doceavo (§2.7), sin métrica por regla. **Raigal sale
   del índice** (§8): su nombre ya es de una empresa real. El permiso de Combeau es el que dio Ramón en la compuerta 1,
   punto 2: «no se necesita más permiso», y cubre grabar su sitio y publicar una medición fechada (§2).
   *Hasta el 18-oct decía: seis cosas reales con Raigal como concepto, sin Praxi, y un permiso verbal que no cubría
   las mediciones.*
2. **El único antes y después medido dos veces con el mismo instrumento, con los dos crudos guardados, es nuestro:**
   Verifica y Cumple sacaba **54** en el chequeo de visibilidad el 14-oct y saca **94** hoy, después de que el 15-oct
   se le publicaron robots, llms.txt, sitemap y su schema completo. Es la parte Logic contada con nuestro propio
   producto: aplicamos el servicio y el número se movió. Publicarlo lo decide Ramón.
3. **Los ingredientes del brief de obra §5 quedan confirmados por lo servido:** Astro, Decap CMS, login con GitHub y
   Netlify en Combeau; Cloudflare Pages y Functions en Verifica y en spindlelab.cl. Se suman dos que el brief no
   tenía: **Netlify Image CDN** en Combeau y **Cloudflare Browser Rendering** en Verifica. Tailwind solo está en
   spindlelab.cl, y Lenis solo en el v3. **Nadie usa React, WebGL, IA programada ni «modelos RAG».** *Desde el 18-oct,
   con Praxi en el índice: Praxi es la única con IA programada (la API de Anthropic) y con React (Next.js 14); WebGL y
   «modelos RAG», ninguna (`inventario-praxi.md` §4 y §5).*
4. **Combeau tiene una cifra de oficio real, y dos defectos abiertos.** La foto que él sube pesa 805 kB y el sitio la
   entrega en 95 kB (WebP, 828 px). Pero 7 de sus 11 rutas no tienen `<h1>`, el de la portada junta dos palabras
   para quien lo lee como texto («Se construyedirigiendo»; el encargo del 10-oct sigue sin aplicar) y el book en
   inglés declara `lang="es"`. Sirve como caso de diseño y de panel; no como vitrina de SEO. Desde la compuerta 1 la
   cifra se puede publicar con su fecha (§2); los dos defectos siguen abiertos (§4.3).
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
| Chequeo de la Ley 21.719 | `GET https://verifica.spindlelab.cl/api/chequeo?dominio=<dominio>` sobre los dos dominios propios. No se corrió sobre Combeau (el 16-oct, mostrarlo pedía su OK; desde la compuerta 1 ya no, y sigue sin correrse) ni el chequeo profundo (gasta la cuota mensual de navegador remoto) | 17:52 | `vyc-chequeo-<dominio>.json` |
| HTML servido y cabeceras | `curl` con user-agent de Chrome 141. De Combeau se guarda un extracto (generador, scripts, hojas, JSON-LD, colecciones del panel) con el sha256 del HTML completo, porque el HTML trae sus datos de contacto | 17:51 y 18:03 | `servido-*`, `cabeceras-varias.txt` |
| `h1` por ruta en Combeau | `curl -L` de las 11 rutas, contando `<h1` | 17:59 | `h1-bernardocombeau.cl.tsv` |
| La frase del `h1` de la portada de Combeau | `inventario/herramientas/medir-h1-portada.mjs`: Chromium 141 headless saca el `<h1>` del cuerpo de la respuesta (HTML servido, sin JS) y, tras `load`, lee su `textContent` y su `innerText`. Guarda el sha256 del HTML, no el HTML | 21:43 | `h1-portada-bernardocombeau.cl.json` |
| Carga y peso | `inventario/herramientas/medir-carga.mjs`: Chromium 141.0.7390.37 headless con Playwright 1.63.0, 390 × 844 (móvil, 3x) y 1440 × 900, 3 corridas por ancho, caché frío, sin scroll, sin aceptar cookies, 4 s tras `load`, bytes de CDP | 17:54 a 17:57 | `carga-playwright.json` |
| Imágenes de la portada de spindlelab.cl, una por una | `inventario/herramientas/medir-imagenes.mjs`: las mismas condiciones, una corrida por ancho, cada pedido de tipo imagen con sus bytes | 21:44 | `imagenes-spindlelab.cl.json` |
| Traza de Cloudflare | `GET https://spindlelab.cl/cdn-cgi/trace`, guardada sin las líneas `ip=` y `uag=` | 18:04 | `cdn-cgi-trace-spindlelab.cl.txt` |
| **18-oct ·** Grabaciones de los dos sitios de Combeau | `inventario/herramientas/grabar-combeau.mjs`: Chromium 141 headless, solo `GET` y scroll (ningún clic, ningún campo, ningún formulario); carga las imágenes diferidas, vuelve arriba y graba cuadro a cuadro (30 por segundo; 1 s quieto arriba, bajada con curva cúbica, 1 s quieto abajo) a 1440 × 810 y a 390 × 844 (dpr 2); ffmpeg arma H.264 y un póster. Se detiene antes de cualquier enlace de contacto: en `/modelo/`, antes de sus medidas (`#details`) y del pie con correo y WhatsApp | 21:24 a 21:32 | `grabaciones-combeau.json` y `inventario/grabaciones/` (§2.8) |
| **18-oct ·** La pantalla de entrada del panel de Combeau | El mismo script: `GET /admin/` y una captura, **sin hacer clic** en el botón de entrada | 21:32 | `grabaciones-combeau.json` (`panel`) |
| **18-oct ·** Los `@id` que publica Combeau | `curl` con user-agent de Chrome 141 y `inventario/herramientas/ids-jsonld-combeau.py`, que guarda de cada nodo del JSON-LD su `@id`, su `@type` y el nombre de sus claves, **nunca sus valores** (traen su teléfono, correo y dirección). El HTML dio el mismo sha256 que el 16-oct: el sitio no cambió | 21:24 | `jsonld-ids-bernardocombeau.cl.json` |
| **18-oct ·** La sección «Reel» de `/modelo/` | `inventario/herramientas/medir-reel-modelo.mjs`: las mismas condiciones de la grabación; posición de `#reel`, estilo computado de su título y tamaño de su `iframe`, y las reglas `.reel` de las hojas que enlaza la página | 21:33 | `reel-modelo-bernardocombeau.cl.json` |
| **18-oct ·** Lo que usan de verdad las cuatro piezas de concepto | `inventario/herramientas/medir-conceptos.py` sobre el árbol **comprometido** (`git show 01ea00f:…`), no la copia de trabajo: tipos de JSON-LD, `robots`, `h1`, scripts, las URL que cada página o hoja **pide** al abrirse aparte de las que solo **enlaza**, letras `woff2` con su licencia, y el recorrido grabado (ffprobe) | 21:22 | `conceptos-repo.json` |

**Los tiempos son de laboratorio, no de usuarios reales.** El contenedor sale a internet por la costa este de EE.UU.
(las respuestas de Cloudflare traen `cf-ray …-EWR` e `…-IAD`), sin limitar red ni CPU, y Chromium negoció HTTP/1.1
a través del proxy de la sesión, cuando un visitante real usa HTTP/2 o 3. Los kB transferidos dependen poco de eso;
los milisegundos, mucho. Ninguno es Core Web Vitals de campo.

**Unidad: kB = 1.000 bytes y MB = 1.000.000 bytes, en todo el inventario.** Redondeo al entero salvo donde va un
decimal; los bytes exactos están en cada crudo. Hasta las 18:45 de hoy este archivo mezclaba KiB (bytes ÷ 1.024)
escritos «KB» con kB: ver «Correcciones».

**Lo que no se pudo leer:** el repo de Combeau (`rvalleespin/bernardo-combeau`) no está habilitado en esta sesión, y no
se agregó porque nadie lo pidió. Su stack sale de lo que sirve el sitio, que en esto alcanza. **El panel de Combeau
por dentro** (18-oct): pide iniciar sesión con una cuenta de GitHub con acceso a su repo; esta sesión no tiene ninguna y
no se pide por el chat, así que queda como hueco nombrado (§2.8).

---

## 2 · Los proyectos

| Entrada | Tipo | Año | Para quién | Permiso y dónde consta | URL | Estado al 16-oct |
|---|---|---|---|---|---|---|
| Combeau, fotografía | Cliente | 2026 | Bernardo Combeau, fotógrafo de retrato | **«Ramón, 16-oct: no se necesita más permiso»**, dicho por él en la compuerta 1, punto 2 («no se necesita más permiso. ya lo pedí hace un rato»; `e12/brief-de-obra.md`, «Compuerta 1»). Queda registrado como lo dice Ramón: **no hay respaldo escrito de Bernardo en el repo.** Antes: verbal del 30-sep, solo del caso (`ventas/proyectos-en-curso.md:16`). Siguen diciendo otra cosa `oficina/clientes/bernardo-combeau.md:15` y `ventas/pipeline.md:26`, de la troncal (§9) | bernardocombeau.cl | En producción desde el 24-jul; Netlify desde el 8-sep; pagado al 100 % |
| Combeau, modelo | Cliente | 2026 | El mismo | El mismo permiso | bernardocombeau.cl/modelo/ | En producción |
| Verifica y Cumple | Producto propio | 2026 | Propio; servicio de SpindleLab desde el 21-sep (`ventas/casos-de-exito/verifica-y-cumple.md`, en main) | Propio | verifica.spindlelab.cl | En producción desde el 23-sep; el dominio viejo `verificaycumple.pages.dev` redirige con 301 |
| Chequeo de 21 señales | Herramienta propia | 2026 | Cualquiera, sobre su dominio | Propio | spindlelab.cl/diagnostico/ · `/api/chequeo` | En producción desde el 27-ago (`4bdfb62`); último cambio del código en main el 23-sep (`a453333`), igual en la rama v3 |
| spindlelab.cl | Propio | 2026 | Propio | Propio | spindlelab.cl · v3 en vista previa noindex | Producción v2. El v3 no está publicado (`spindlelab.cl/v3/` da 404); la vista previa sirve el build de `f0d911c` (14-oct): su `/v3/trabajo/` es idéntica byte a byte a `dist/` |
| **Praxi** (18-oct) | Propio | 2026 | Producto de Ramón: coach de hipertrofia por chat, con su propia marca (`oficina/clientes/praxi.md`) | Propio; entra por la compuerta 1, punto 3 («podría entrar praxi como caso ya que creó un sitio y una app») | praxi.coach, **que no se enlaza**: `402 DEPLOYMENT_DISABLED` el 16-oct (`inventario-praxi.md` §0.3) y el 17-oct (`tableros/e12-direcciones/datos/estado-praxi.txt`) | Fuera de línea; último cambio de código el 25-ago (y el 19-oct, igual: 402). **[C2] Dato interno: el caso no lo cuenta** (pregunta 5b), y sigue sin enlace ni `offers` ni `url`. Todo lo suyo, en `inventario-praxi.md` (§2.5) |
| **Tonela** (18-oct) | Concepto | 2026 | Nadie: «Tonela no existe». Proveedor de izaje inventado, Antofagasta | Propio, rotulado; reglas de `marketing/portafolio/README.md` | Ninguna: `marketing/portafolio/04-tonela/sitio/`, `noindex, nofollow` | Home e interior, identidad y recorrido en el repo (§2.7) |
| **Ocelo** (18-oct) | Concepto | 2026 | Nadie: «Ocelo no existe». Clínica de ojos inventada, Providencia | El mismo | Ninguna: `05-ocelo/sitio/` | El mismo |
| **Sesenta** (18-oct) | Concepto | 2026 | Nadie: «Sesenta no existe». Estudio laboral inventado, del lado del trabajador, Santiago | El mismo | Ninguna: `06-sesenta/sitio/` | El mismo. Es la pieza de la vista 4 del tablero |
| **Doceavo** (18-oct) | Concepto | 2026 | Nadie: «Doceavo no existe». Estudio contable inventado, Concepción | El mismo | Ninguna: `07-doceavo/sitio/` | El mismo |

**El índice son estas diez filas** (18-oct): seis reales (dos de cliente, cuatro propias) y cuatro de concepto. El
conteo visible de `/trabajo/` es 10 y cada filtro cuenta sus filas: Cliente 2, Propio 4, Concepto 4. Raigal, que
estaba aquí como concepto, salió (§8).

**Lo que cubre el permiso de Combeau, y lo que queda fuera igual.** Desde la compuerta 1, punto 2, el caso puede
llevar grabaciones de su sitio y de su panel y una medición fechada de su sitio (brief, «Compuerta 1», fila 2): lo
que hasta el 16-oct pedía su sí por escrito (brief de obra §8.5). **No lo cambia el permiso, y sigue fuera:** sus
datos de contacto (teléfono, correo, WhatsApp, dirección: su JSON-LD los trae y el caso no los repite), sus medidas y
su ficha de contratación de `/modelo/` (`#details`, `#booking`), lo que pagó, cualquier resultado de su negocio (no hay
ninguno medido, §4.4), y presentar su sitio como vitrina de SEO (§0.4). La foto del antes y después es la que él ya
publicó (`beto3.jpg`, §2.1), no una nueva. **[C2] Desde el 19-oct:** Combeau es uno de los dos casos reales con página
propia («5f ambos son casos reales»), y por defecto de la pregunta 7 se le recortan sus medidas personales (edad,
estatura, pelo, ojos) en todo medio. Lo que se usa y lo que no, con los medios ya recortados: §2.9.

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

### 2.5 · Praxi (18-oct; hasta entonces aquí iba Raigal, que pasó a §8)

Producto propio de Ramón: un coach de hipertrofia por chat, sitio y app (Next.js 14, Supabase, API de Anthropic), en
un clon de solo lectura (`/home/user/praxis-coach`, `a360d7a`). **Su inventario completo es `inventario-praxi.md`**,
con la misma regla: qué es, el stack verificado en el código (§4, 15 ingredientes), cómo trabaja la IA (§5), las
capturas (§6), lo que se puede y no se puede decir (§8) y sus señales (§11). Aquí van solo las dos filas que usa la
línea del índice, para que el índice tenga fila en este archivo:

| Ingrediente (línea del índice) | Lo que le hace al usuario | Evidencia |
|---|---|---|
| **API de Anthropic**, solo en el servidor | Le escribes como a una persona y el registro queda guardado sin formularios | `inventario-praxi.md` §4 (`lib/anthropic.ts:14,17`, `import "server-only"`) |
| **Lógica de entrenamiento en código** | El peso sube solo con dos sesiones confirmadas; la descarga llega por fatiga corroborada, no por calendario | `inventario-praxi.md` §4 (`lib/domain/`; 42 tests en verde, medido el 16-oct) |

**No tiene:** `praxi.coach` en línea (402 de Vercel), usuarios medidos, retención ni ventas: ninguna cifra de uso
(`inventario-praxi.md` §8.2). Las pantallas de la app con sesión iniciada son un hueco nombrado (§10 de ese archivo).

### 2.6 · spindlelab.cl

| Ingrediente | Evidencia |
|---|---|
| **Astro** | Servido: `Astro v4.16.19` en producción y en la vista previa. Repo: `package.json` |
| **Tailwind CSS** | Servido: 217 variables `--tw-` en `/_astro/index.DELdUd0E.css`. Repo: `tailwindcss` 3.4.19 |
| **Cloudflare Pages + Functions** | Servido: `server: cloudflare`. Repo: `functions/api/chequeo.js` |
| **GA4 y Meta Pixel tras el aviso de cookies** | Servido: `gtag` y `fbq`, `consent-banner.js?v=3`. Medido: sin aceptar, 11 kB de terceros y todos de Cloudflare; Verifica: política en ok, permiso previo sin confirmar desde afuera |
| **Lenis, solo en el v3** | Repo: `Layout.astro:213-246`, apagado con movimiento reducido. Servido: está en el JS de la vista previa (`hoisted.Bkkmjuy0.js`), no en el de producción |

**No tiene todavía:** Motion (lo pide el brief para la construcción). Next.js y React, no.

### 2.7 · Las cuatro piezas de concepto (18-oct)

Cuatro marcas inventadas, una por rubro que vendemos (compuerta 1, punto 5), hechas por Bruno el 16 y el 17-oct con el
texto de Clara, en `marketing/portafolio/04-tonela` a `07-doceavo`. **La regla de la serie, que este inventario aplica:**
ninguna lleva métrica ni testimonio; su resultado es «Sin métrica: es un concepto, no tuvo usuarios»
(`portafolio/README.md`). Lo que sí tiene fila es **lo que cada pieza usa de verdad**, comprobado en el árbol
comprometido (`conceptos-repo.json`, sobre `01ea00f`) y en su ficha y su caso. «Lo que hace en la pieza» es lo que le
haría a quien la visita si la marca existiera: **no es un efecto medido.**

**Común a las cuatro** (crudo, pieza por pieza): HTML, CSS y JS escritos a mano, sin dependencias; **0 URL pedidas a
terceros** al abrir sus ocho páginas y sus hojas de estilo; letras en `woff2` locales con su licencia OFL al lado; JSON-LD
con la ficción dentro (`disambiguatingDescription` en la marca y en cada persona inventada), sin `review`,
`aggregateRating`, `telephone`, `sameAs`, `taxID` ni `vatID`; `noindex, nofollow`; un `h1` por página; un recorrido de
10 s grabado del navegador desde su propio HTML (1440 × 810, H.264 y VP9, con póster en `movimiento/`); 0 llamadas a
generación pagada (fichas). La palabra «concepto» aparece de 5 a 15 veces en el HTML de cada página.

**★ = las dos filas que más hacen en la pieza**, candidatas a la línea mono del índice (lock §7: hasta dos). Hoy las
vistas 2 de A y B no ponen ninguna en los conceptos («Concepto · 2026»); si las ponen, salen de aquí.

**Tonela** · industrial B2B, izaje (Antofagasta, ficticio) · home e interior «Inspección»

| Ingrediente | Lo que hace en la pieza | Evidencia |
|---|---|---|
| ★ **Código de color de la norma de eslingas** | El color dice solo la capacidad de carga, como la etiqueta cosida de la eslinga; ningún botón, fondo ni ícono lleva color | `sitio/tonela.js` (`COLOR`, ocho capacidades); ficha, «Hechos de norma» (verificados por Simón el 17-oct) y «Restricciones del rubro» |
| ★ **Tabla de carga por modo de amarre** | Eliges cómo amarras (directo, ahorcado, en paralelo, en ángulo) y la tabla y el dibujo del ángulo cambian la capacidad con el factor de la norma; dice que es referencial y que manda la etiqueta | `tonela.js` §2 y §3 (`FACTOR`); ficha, hecho 4 |
| **Big Shoulders, Big Shoulders Stencil y Barlow Semi Condensed**, locales | (sin efecto que contar) | 7 `woff2`, de 22 a 60 kB; tres licencias OFL en `sitio/fuentes/` |
| **JSON-LD**: `Organization`, `Service`, `FAQPage`, `WebPage`; `BreadcrumbList` en la interior | Una máquina lee qué haría la empresa y que no existe | Crudo: `jsonldTipos`, `disambiguatingDescription` |
| **Formulario que no envía nada** | Valida los campos y dice que es un concepto | `tonela.js` §4 |
| **Recorrido** | (sin efecto que contar) | `movimiento/recorrido.mp4` (10 s, 30 cps, 1.260 kB) y `.webm` (VP9, 25 cps) |

**Ocelo** · clínica, oftalmología (Providencia, ficticia) · home e interior «La evaluación»

| Ingrediente | Lo que hace en la pieza | Evidencia |
|---|---|---|
| ★ **Interruptor de luz** | La página abre a oscuras, como la sala de examen, y se enciende con un botón que dice su estado y recuerda la elección; con movimiento reducido cambia sin transición | `sitio/ocelo.js` («El interruptor de luz»: `aria-pressed`, `localStorage`) |
| ★ **Atkinson Hyperlegible Next y Mono**, locales | La letra del Braille Institute hecha para lectores con baja visión, en el sitio de una clínica de ojos | 2 `woff2` (34 y 18 kB) y sus licencias OFL; ficha §4.1 (fuente: comunicado del Braille Institute del 10-feb-2025); `LICENCIAS.md` |
| **Comparador por pestañas** | LASIK o PRK, lente monofocal o multifocal: qué pesa en cada caso, sin prometer resultado | `ocelo.js` («El comparador»); `caso.md`, «Aplicación» |
| **JSON-LD médico**: `MedicalClinic`, dos `IndividualPhysician`, `MedicalProcedure`, `FAQPage`; `MedicalWebPage`, `MedicalCondition`, `MedicalTest` y `BreadcrumbList` en la interior | Una máquina lee qué haría la clínica, que no existe y que sus dos médicos son ficticios | Crudo. Lleva un `PostalAddress` sin calle (comuna, región, país): ver `senales-trabajo.md`, punto 2 |
| **Recorrido** | (sin efecto que contar) | `movimiento/recorrido.mp4` (10 s, 30 cps, 1.627 kB) y `.webm` |

**Sesenta** · estudio legal, laboral del lado del trabajador (Santiago, ficticio) · home e interior «Qué dice tu carta»
· es la pieza de la vista 4 del tablero

| Ingrediente | Lo que hace en la pieza | Evidencia |
|---|---|---|
| ★ **Contador de días hábiles** | Con la fecha del despido, cuenta los días hábiles que quedan para demandar (lunes a sábado, salvo feriados) y dice que es referencial | `sitio/sesenta.js` («Calendario» y «El 60 que baja»): separaciones de 2026 y 2027 (`DESDE`, `HASTA`), 32 feriados nacionales escritos en el código hasta mayo de 2028; ficha §4.1 |
| ★ **Lector de la carta** | Una pestaña por caso (art. 159, 160, 161 o «no dice ninguno»): marca en la carta el artículo que cita y explica qué significa | `sesenta.js` («El lector de la carta»); ficha §4.2 |
| **Hoja imprimible** | Imprime, sola, la lista de papeles que hay que traer a la primera reunión | `sesenta.js` («Hoja imprimible»), `estilo.css` `@media print` |
| **Schibsted Grotesk y Courier Prime**, locales | (sin efecto que contar) | 4 `woff2`; dos licencias OFL; `LICENCIAS.md` |
| **JSON-LD**: `LegalService`, dos `Person`, `FAQPage`, `WebPage`; `BreadcrumbList` y `FAQPage` en la interior | Una máquina lee qué haría el estudio, que no existe, que no es asesoría legal y que sus dos abogados son ficticios | Crudo. `PostalAddress` sin calle, como Ocelo |
| **Recorrido** | (sin efecto que contar) | `movimiento/recorrido.mp4` (10 s, 30 cps, 2.122 kB) y `.webm`; «hoy» fijado con `?hoy=` para que cuente siempre igual |

**Doceavo** · servicios profesionales, contable y tributario (Concepción, ficticio) · home e interior «Calendario»

| Ingrediente | Lo que hace en la pieza | Evidencia |
|---|---|---|
| ★ **El sitio sabe en qué mes estás** | El logo, el titular, el año en doce y la tabla del mes se dibujan con la fecha del día: el logo cambia solo cada mes, y el ícono de la pestaña también | `sitio/doceavo.js` (`pintarFecha`); `caso.md`, «El almanaque al revés» |
| ★ **Calendario tributario 2026 en los datos** | El F29 de cada mes, la Operación Renta y las declaraciones juradas, con las fechas del SII | `sitio/datos.js` (una sola implementación para el navegador y para `_herramientas/construir.mjs`); `_herramientas/sii-calendario-2026.json`; ficha §4 |
| **HTML con las fechas ya escritas** | Las fechas se leen sin JavaScript; el script repinta la fecha solo si hoy no es el día con que se construyó el HTML | `construir.mjs`; `datos.js` (`HOY_FIJO`) |
| **Recursive**, local | (sin efecto que contar) | 1 `woff2` variable (305 kB) y su licencia OFL |
| **JSON-LD**: `AccountingService`, `Person`, `FAQPage`, `OfferCatalog` sin precios; `WebPage`, `WebSite` y `BreadcrumbList` en la interior | Una máquina lee qué haría el estudio, que no existe y que su contadora es ficticia | Crudo. Su ficción dice «no tiene clientes ni dirección» y el nodo declara un `PostalAddress`: `senales-trabajo.md`, punto 2 (lo decide Bruno) |
| **Recorrido** | (sin efecto que contar) | `movimiento/recorrido.mp4` (10 s, 30 cps, 754 kB) y `.webm` |

**No tienen, ninguna:** métrica, usuarios, clientes, testimonios, precios con cifra, una URL servida (sus dominios
`.cl` estaban libres al 16-oct, según sus fichas, y nadie los sirve) ni React, WebGL o IA. Y no tienen fila de
resultado: en la sección «Resultado» del caso va «Sin métrica».

### 2.8 · Las grabaciones de Combeau (18-oct)

Material grande para el caso de cliente (vista 3; encargo §5), con el permiso de §2. `grabar-combeau.mjs`, método en
§1; registro con estado HTTP, alto del documento, hasta dónde baja, sha256 y ffprobe de cada archivo en
`crudo/grabaciones-combeau.json`. Los archivos, en `e12/inventario/grabaciones/`.

| Grabación | Ancho | Dura | Hasta dónde baja | Archivo (H.264, 30 cps) y póster |
|---|---|---|---|---|
| bernardocombeau.cl | 1440 × 810 | 10 s | El final de la página | `combeau-fotografia-1440.mp4` · `-poster.jpg` |
| bernardocombeau.cl | 390 × 844 (dpr 2) | 10 s | El final de la página | `combeau-fotografia-390.mp4` · `-poster.jpg` |
| bernardocombeau.cl/modelo/ | 1440 × 810 | 12 s | Antes de sus medidas (`#details`) | `combeau-modelo-1440.mp4` · `-poster.jpg` |
| bernardocombeau.cl/modelo/ | 390 × 844 (dpr 2) | 12 s | Antes de sus medidas (`#details`) | `combeau-modelo-390.mp4` · `-poster.jpg` |

Las cuatro respondieron 200; 0 elementos animados al scroll en las dos páginas, así que el cuadro a cuadro muestra lo
que ve una persona. En `/modelo/` a 1440 la red no llegó a quedar quieta en 10 s (su video y su reel se cargan al
entrar en pantalla) y se grabó igual; el registro lo anota (`redQuietaAntesDeGrabar`). Rehecha la corrida, las tres
grabaciones que ya existían salieron con los mismos bytes.

**Un defecto de su sitio que sale en las grabaciones de `/modelo/`:** la sección «Reel» no tiene estilos propios
(0 reglas `.reel` en sus dos hojas de estilo): el título queda pegado al borde izquierdo (x = 0), en la letra del
sistema, y el video en el tamaño por defecto de un `iframe`, 300 × 150, a 1440 y a 390
(`medir-reel-modelo.mjs` → `crudo/reel-modelo-bernardocombeau.cl.json`, 21:33 UTC). Entra al cuadro cerca del
segundo 7,5 de las dos grabaciones de `/modelo/`. Para el caso: usar el tramo anterior o esperar el arreglo (§9,
punto 3).

**Qué no se grabó, a propósito:** ningún enlace de contacto entra a un cuadro (la herramienta lo comprueba y se
detiene si alguno quedaría dentro); en `/modelo/`, ni sus medidas ni el pie de contratación con su correo y su
WhatsApp. **Hueco nombrado:** el panel por dentro. `/admin/` pide entrar con una cuenta de GitHub con acceso a su repo;
sin esa sesión no se graba, y la clave no se pide por el chat. Queda la captura de la pantalla de entrada, sin hacer clic
(`combeau-panel-entrada-1440.png`). Para grabarlo hace falta que lo abra Bernardo, o Ramón con su cuenta (§9).

**[C2] Corrección del 19-oct: las dos grabaciones de `/modelo/` sí muestran sus medidas.** «Hasta dónde baja: antes de
sus medidas (`#details`)» es cierto de la ficha de medidas, pero bajo el retrato de portada hay una línea con su
ciudad, su edad, su estatura, su pelo y sus ojos (cinco `span.meta-item`; su bloque va de y = 881 a 941 a 1440 × 810
y de 604 a 673 a 390, medido hoy), y las dos grabaciones la atraviesan: a 1440 entre los 2,5 y los 4,5 s; a 390 desde el primer cuadro hasta los
4,5 s (revisado cuadro a cuadro, 2 por segundo). **Quedan como registro del inventario y no van a ningún medio del
sitio.** Para el caso, los medios limpios de §2.9.

### 2.9 · Material para el caso Combeau en A (19-oct, compuerta 2)

**Por qué.** Ramón, en la compuerta 2: «5f ambos son casos reales». Combeau tiene página propia en `/trabajo/<caso>/`,
**un caso, dos sitios** (brief §3: «Hay material para Combeau (un caso, dos sitios)»), y por defecto de la pregunta 7
**se le recortan sus medidas personales** (edad, estatura, pelo, ojos), que es también el defecto 21 del acta del paso
2 aplicado a A. Todavía no tiene texto: lo escribe Clara con esta sección. Medido hoy entre las 13:09 y las 13:15 UTC
(10:09 a 10:15 en Chile), solo con `GET` y scroll.
**Los medios están listos en `e12/casos/combeau/medios/`**, con su registro en `e12/casos/combeau/medios.json` (origen,
px, bytes, sha256, nota y un `alt` de partida para Clara que no menciona sus medidas) y las herramientas que los
hicieron en `e12/casos/combeau/herramientas/`. Nada va a `spindlelab-astro/` en esta corrida.

**La ruta, para la spec y las señales.** Una sola página, `/trabajo/combeau/`, con las dos partes (fotografía y modelo).
El índice sigue con sus diez entradas (§2): las dos de Combeau abren la misma página, cada una en su parte
(`/trabajo/combeau/#fotografia` y `#modelo`). Los prototipos de A enlazaban `/v3/trabajo/combeau-fotografia/` y
`/v3/trabajo/combeau-modelo/`, y `senales-trabajo.md` les daba una fila a cada una: lo supera `senales-obra.md`. Si la
spec decide dos páginas, se cambia aquí en una línea.

#### Lo que se puede usar

| Medio (`casos/combeau/medios/`) | Qué muestra | Para qué en A | De dónde sale |
|---|---|---|---|
| `combeau-fotografia-recorrido-1440.webm` · `.mp4` · `-poster.webp` | La portada de su sitio de fotografía de punta a punta: el hero, «Retratos» y «Proyectos». 10 s, 1440 × 810; 359 kB en VP9, 558 kB en H.264 | El medio principal de la parte «fotografía» | Grabación del inventario del 18-oct (§2.8), recodificada; 0 enlaces de contacto |
| `combeau-fotografia-recorrido-390.*` | Lo mismo en un teléfono. 10 s, 780 × 1688 | El mismo, a 390 | Ídem |
| `combeau-modelo-recorrido-1440.webm` · `.mp4` · `-poster.webp` | Su book de modelo **desde que el retrato de portada ya salió por arriba** hasta antes de «Reel»: el book, su texto de presentación, «Selected Work» y «Commercials». 8 s, 1440 × 810; 590 kB en VP9, 917 kB en H.264 | El medio principal de la parte «modelo» | **Grabado de nuevo hoy** del sitio vivo (`grabar-modelo-sin-medidas.mjs`): en los 240 cuadros de cada ancho, el DOM confirma que la línea de medidas, las polaroids, `#details`, `#compcard`, `#booking` y todo enlace de correo, teléfono o WhatsApp quedan fuera (`crudo/grabacion-modelo-sin-medidas.json`) |
| `combeau-modelo-recorrido-390.*` | Lo mismo en un teléfono. 8 s, 780 × 1688 | El mismo, a 390 | Ídem |
| `combeau-fotografia-169.webp` · `combeau-fotografia-45.webp` | La primera pantalla de su sitio de fotografía, a 1440 (16:9, 1600 × 900) y a 390 (4:5, 780 × 975) | Portadas del caso y de la entrada del índice | `capturar-portadas.mjs`, dpr 2, hoy |
| `combeau-modelo-169.webp` | La primera pantalla del book, a 1440 (16:9): él de traje, apoyado en una columna. A ese ancho la línea de medidas cae bajo el pliegue | Portada de la parte «modelo» | Ídem; comprobado con el DOM (línea en y = 916, recorte hasta 900) |
| `combeau-modelo-45.webp` | El book en un teléfono, 4:5, **cortado sobre la línea de medidas** (la captura termina 8 px antes y el 4:5 corta más arriba aún), como el de A en `proto/a/medios/combeau-modelo-45.webp` | Entrada del índice y caso a 390 | Ídem |
| `combeau-panel-entrada-169.webp` | La puerta del panel: su nombre y «Iniciar sesión con GitHub» | Junto al ingrediente «login con GitHub» | Captura del inventario del 18-oct, sin hacer clic |
| `combeau-panel-encuadre-169.webp` | **El panel por dentro:** editando una serie de retratos, a la izquierda el punto que marca qué parte de la foto no se corta, a la derecha la página como va a quedar | Junto a «él carga sus series solo» | Captura del **3-sep-2026** de la revisión del panel (`encargos-otras-sesiones/revision-panel-admin-bernardo-capturas/11-…`): una copia de su repo corriendo en local con el backend local de Decap y **sus datos de ese día**, no su sesión (método en ese documento, «Cómo se hizo esta revisión»). Recortada arriba para que no entre el campo con el nombre de pila de la persona retratada. **Es una versión anterior a la de hoy:** después ese encuadre pasó a un botón «Editar foto (encuadre y zoom)» y se unificó con el del book (Actualizaciones 7 y 17); todo eso está en producción (`:586-588`). El pie lo dice |
| `combeau-panel-colecciones-169.webp` | El panel por dentro: la lista de lo que él edita (portada, sobre mí, estudio, servicios, contacto, retratos, proyectos) | Ídem | Captura del 3-sep (`08-…`), mismo método y la misma nota |
| `combeau-foto-servida-828.webp` | La foto de la portada como la entrega su sitio: 828 × 828, WebP, **94.576 bytes, sin recodificar** (los mismos que el 16-oct) | El sandbox «la foto que sube y la que ve su visitante» (§6.1) | `GET` a su Netlify Image CDN, hoy 13:14 UTC. **El original no se copia, se enlaza:** `bernardocombeau.cl/uploads/beto3.jpg`, 804.697 bytes (`HEAD` de hoy, mismo `etag` que el 16-oct) |
| `combeau-fotografia-cinta.*` · `combeau-modelo-cinta.*` | Dos tramos de 2 s, 1280 × 720, uno por parte | **Para rehacer la cinta de la home de A**, que ahora es la primera sección después de la portada | El de modelo, de la grabación limpia (cuadros 18 a 77); el de fotografía, de la del inventario (1,0 a 3,0 s) |

**Fechas con fila** (para la ficha del caso; ninguna inventada):

| Hecho | Fecha | Fuente |
|---|---|---|
| Aprobó el sitio en reunión y compró su dominio | 20-jul-2026 | Repo: `ventas/proyectos-en-curso.md:16` |
| En producción en `bernardocombeau.cl` | 24-jul-2026 | §2 (estado); `senales-trabajo.md` (`datePublished` del lanzamiento) |
| El panel, revisado y mejorado (encuadre de fotos, vistas previas, versión de teléfono) | 3-sep-2026 | Repo: `encargos-otras-sesiones/revision-panel-admin-bernardo.md` |
| Datos estructurados: de cero a `Person` + `LocalBusiness` | antes del 3-sep → servido el 16-oct | §4.3 |
| El sitio cambió de casa a Netlify | 8-sep-2026 | §2.1 (`cierre-oauth-…:20`) |
| Login con GitHub en el dominio, verificado | 23-sep-2026 | §2.1 |
| **Él usa el panel solo** | dicho después de la migración: «Bernardo ya volvió a usar el panel tras la migración: su campaña "Habitat" y fotos nuevas están en vivo, confirmado por HTTP directo» | Dicho: `revision-panel-admin-bernardo.md:589-590`; y «creó series de prueba él mismo» (`proyectos-en-curso.md:16`) |

**Ingredientes con fila** (los de §2.1 y §2.2, sin cambios; lo que le hacen a él o a quien lo visita va primero):
él carga sus series solo, desde un panel (**Decap CMS**); entra al panel con su cuenta de GitHub (**login con
GitHub**); sube la foto tal cual y el sitio la entrega recortada y liviana, 805 kB → 95 kB en una foto de la portada
(**Netlify Image CDN**); una máquina puede leer quién es y a qué se dedica (**datos estructurados**); el book no baja
el video ni el reel hasta que hacen falta, 0 kB de video en la carga inicial (**video con carga diferida**); las
páginas llegan armadas (**Astro**). **Uno nuevo, con fila desde hoy:** marca qué parte de cada foto no se corta en los
recuadros de la portada y las grillas (**encuadre de fotos en el panel**, un widget hecho para su panel el 3-sep y
unificado después con el del book; Repo: `revision-panel-admin-bernardo.md`, Actualizaciones 3, 7 y 17; en
producción, `:586-588`; **no medido hoy**: el panel por dentro no se pudo abrir, y lo que se ve es la captura del
3-sep). El resultado del caso: **«Sin métrica»** (§4.4): no hay un dato de su negocio.

#### Lo que no se usa, y dónde estaba

| Qué | Por qué | Dónde aparecía, y qué se hizo |
|---|---|---|
| **La línea de medidas bajo su retrato** (ciudad, edad, estatura, pelo y ojos) | Pregunta 7 de la compuerta 2, por defecto; defecto 21 del acta | **Recortada en todo medio del caso** (arriba). Aparecía en: las dos grabaciones de `/modelo/` del inventario (§2.8, se quedan como registro); **la cinta de la home de A** (`proto/a/medios/cinta.webm` y `.mp4`, tramo «Combeau, modelo», de los 12 a los 14 s: baja por la captura completa y la línea entra al final, comprobado hoy en el cuadro de los 13,9 s), que **no se reutiliza tal cual en la construcción**: se rehace con `combeau-modelo-cinta.*`; y la de B (`proto/b/medios/v-combeau-modelo.webp`), que queda como historia con B. El prototipo de A no se tocó: es lo que vio Ramón en la compuerta |
| **Su ficha de contratación de `/modelo/`**: `#details` (sus medidas completas), `#compcard` y `#booking` (el pie con su correo y su WhatsApp) | Inventario §2 y §7 | Ningún medio llega ahí: la grabación limpia se detiene antes de «Reel», y cada cuadro lo comprueba |
| **Las polaroids** | No son medidas, pero son fotos de casting del cuerpo, alguna sin camisa, que el caso no necesita | Los dos recorridos de `/modelo/` se detienen antes |
| **La sección «Reel» de `/modelo/`** | No tiene estilos (§2.8): el título pegado al borde y el video a 300 × 150 | Ídem |
| Su teléfono, correo, WhatsApp y dirección; lo que pagó; cualquier resultado de su negocio; su sitio como vitrina de SEO; el 76 de su portada como logro nuestro; «bilingüe» para el book | §2 y §7 | Ningún medio los muestra. En el menú de `/modelo/` se leen las palabras «Details», «Comp card» y «Booking»: son rótulos de enlace, no datos, y se quedan |
| La biblioteca de medios de su panel (capturas `05` y `09` del 3-sep) | Muestra nombres de archivo de terceros y el defecto del damero ya corregido | No se copió |
| El campo «Descripción para lectores de pantalla» de la captura `11` | Trae el nombre de pila de la persona retratada | Recortado |

**Para el `alt` y el texto (Clara):** ningún `alt` menciona sus medidas, ni «sus medidas debajo» (el defecto 21 lo
encontró en B). Los `alt` de partida, en `medios.json`. Las capturas del panel llevan pie con su fecha (3-sep) y su
método. El texto de ayuda del panel que se lee en `combeau-panel-encuadre-169.webp` trae rayas («— lo de afuera se
recorta»): es el panel que se le entregó, no texto del sitio, y no se retoca.

**Huecos que quedan nombrados:** el panel en producción por dentro (pide la sesión de GitHub de Bernardo o de Ramón,
§2.8); su texto (Clara); un resultado de su negocio («Sin métrica»).

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
| verifica.spindlelab.cl | Chequeo de visibilidad (el mismo dos veces) | **54 → 94** | 14-oct 22:29Z → 16-oct 17:51Z | `e9/piezas/crudo/2026-10-14/verifica.spindlelab.cl/chequeo-ia.json` · `chequeo-verifica.spindlelab.cl.json` | ~~Decide Ramón~~ **[C2] No se muestra** (compuerta 2, pregunta 6, por defecto); sigue medido aquí |
| spindlelab.cl | Chequeo de visibilidad | **85** (igual que el 14-oct) | 16-oct 17:51Z | `chequeo-spindlelab.cl.json` | ~~Decide Ramón~~ **[C2] No se muestra** (ídem) |
| bernardocombeau.cl | Chequeo de visibilidad | **76** | 16-oct 17:51Z | `chequeo-bernardocombeau.cl.json` | Con fecha, por el permiso de la compuerta 1 (§2); **no como logro nuestro**: mide su portada, que tiene defectos abiertos (§0.4 y §4.3), y no hay un antes con el que compararlo (§7) |
| spindlelab.cl | Verifica y Cumple | **36 → 73 → 100** | 9-sep y 21-sep: *dicho* (caso de éxito, `9ebf384`; post del 21-sep), sin crudo · 100: 14-oct y 16-oct, con crudo | `vyc-chequeo-spindlelab.cl.json` | Solo en Trabajo (E9), diciendo que el 23-sep cambió la regla y que el 100 es sobre 14 de 20 puntos de peso  **[C2] En E12, no se muestra** (compuerta 2, pregunta 6: «spindlelab.cl 36 → 73», por defecto) |
| verifica.spindlelab.cl | Verifica y Cumple | **100** sobre 18 de 24 puntos de peso | 16-oct 17:52Z | `vyc-chequeo-verifica.spindlelab.cl.json` | ~~Decide Ramón; con el «18 de 24» al lado~~ **[C2] No se muestra** (es puntaje propio; pregunta 6, por defecto) |

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
| Datos estructurados en Combeau | cero en todo el sitio → Person + LocalBusiness | 3-sep (`memoria/diego-web.md:66`) → servido hoy. Cualitativo: no hay puntaje del antes | Sí, cualitativo (permiso de la compuerta 1, §2) |
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
| **La foto que sube Bernardo y la que ve su visitante** | Por construir | La misma foto: 805 kB como la sube, 95 kB como la entrega el sitio | Las dos URLs reales. Cubierto por el permiso de la compuerta 1, punto 2 (§2) |

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
| «IA propietaria», «modelos RAG», «despliegue de modelos», «WebGL» o «Estrategia C-Level» como ingredientes; «React» o «IA» en una pieza que no sea Praxi | Ninguna pieza usa los primeros. Praxi es la única con IA programada y con React (Next.js 14, React 18), y lo que hace está en `inventario-praxi.md` §4 y §5 | §2 y §2.5 |
| El 40 % y el +150 % del segundo texto de Ramón | Son ejemplos, no datos | `insumos-ramon-16oct.md` §5 |
| Los datos de contacto de Bernardo, sus medidas y su ficha de contratación de `/modelo/`, lo que pagó, o el 76 de su sitio como logro nuestro | El permiso de la compuerta 1 cubre grabar su sitio y publicar una medición fechada (*hasta el 18-oct esta fila decía que no*); no cubre sus datos, que el caso no necesita; y el 76 es una foto de su portada del 16-oct, con defectos abiertos y sin un antes medido, no un resultado nuestro | §2; brief, «Compuerta 1», fila 2 |
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
| SimpleTrust (cliente de SEO) | Sin permiso; la solicitud nunca se envió (`ventas/pipeline.md:32`) |
| **Raigal, Aplomo y Deslinde** (primera serie de concepto, 27 a 29-sep; 18-oct) | **Sus nombres ya son de alguien** (NIC Chile y el sitio de cada dominio, 16-oct): `raigal.cl` es una empresa de arquitectura y construcción, `deslinde.cl` una de gestión inmobiliaria y `aplomo.cl` está registrado desde 2008 (`portafolio/plan-e12.md` §1; `README.md`, «Primera serie»). Las reemplazan las cuatro piezas de §2.7 (compuerta 1, punto 5). Quedan como archivo en sus carpetas. **Raigal estaba en el índice** (§2.5 hasta el 18-oct) y sigue en la vista previa del v3 (`spindlelab-astro/`: la tira de la home, `/v3/trabajo/` y `/v3/servicios/desarrollo-web/`, noindex), que en el paso 2 no se toca: **no puede llegar a producción con ese nombre**, y sale al construir `/trabajo/`. Su fila de antes (un archivo de HTML y CSS de 40 kB, JSON-LD `Dentist`, `Person`, `MedicalProcedure` y `FAQPage`, sin URL) sigue en el JSON: `fuera`, `registroHasta18oct` |
| Índice de Citabilidad | Retirado: `/indice/` redirige con 301 a `/diagnostico/` (`_redirects:1-2`) |
| Mini-diagnósticos entregados | Son de prospectos con nombre. Sirven como hallazgos generalizados (`e11/material.md` §1-2), nunca como caso |

---

## 9 · Lo que queda para otros

1. **Ramón:** el permiso de Combeau quedó resuelto por él en la compuerta 1, punto 2 (§2; *hasta el 18-oct este punto
   le pedía el sí por escrito de Bernardo*). ~~Queda decidir si se muestran los puntajes propios (85; 54 → 94), que es
   la pregunta 3 de la compuerta 2 (`encargo-paso-2.md` §10).~~ **[C2] Decidido por defecto el 19-oct: no se
   muestran** (pregunta 6 de la compuerta 2, sin respuesta; §4.1). Si el caso necesita el panel por dentro, abrirlo con una
   cuenta de GitHub con acceso al repo de Combeau (la suya, dueña de `rvalleespin/bernardo-combeau`, o la de Bernardo)
   para grabarlo (§2.8). Lo de Praxi, en `inventario-praxi.md` §10.
2. **Troncal:** la ficha de Bernardo (`oficina/clientes/bernardo-combeau.md:15`, «NO autorizado») y el pipeline
   (`ventas/pipeline.md:26`, «aún no pedido») siguen contradiciendo a `proyectos-en-curso` (verbal, 30-sep) y a la
   compuerta 1, punto 2 (16-oct). Releídos hoy: igual. Son documentos compartidos: no los toqué.
3. **Sesión del sitio de Bernardo:** el encargo de `h1` del 10-oct sigue sin aplicar, y /modelo/ declara `lang="es"`
   con el texto en inglés. Desde el 18-oct, además: la sección «Reel» de /modelo/ no tiene estilos (§2.8).
4. **Construcción E12:** el CLS de 0,106 de la home v3 a 1440 (laboratorio, 2 de 3 corridas).
5. **Lucía:** los kB cambiaron (ver «Correcciones»). El tablero de E12 los lee del JSON (`kbTransferidos` y el valor
   del `h1` de Combeau), así que se corrige al rearmarlo. `lock-koto.md:529` y `:556` dicen «786 KB → 92 KB», que en
   la unidad de este inventario son **805 kB → 95 kB**.
6. **Bruno** (18-oct): en Doceavo, la ficción del JSON-LD dice «no tiene clientes ni dirección» y el mismo nodo
   declara un `PostalAddress`; una de las dos sobra (`senales-trabajo.md`, punto 2).
7. **Construcción E12** (18-oct): la capa de señales de `/trabajo/` y de cada caso es la de `senales-trabajo.md`. Dos
   cosas de los prototipos que no se copian: el `@id` `#organizacion` de B (el grafo real usa `#org`) y su `/trabajo/`
   sin `ItemList`. Y Raigal sale de `spindlelab-astro/` (§8).
8. **El tablero de la compuerta 1** (`tableros/e12-laboratorio/`, 18-oct): su script lee este JSON (`proyectos`,
   `telemetria`, `sandboxes`, `noSePuedeDecir`). Se armó sobre `7e9f380` y se rehace idéntico sobre ese commit
   (comprobado hoy); sobre uno posterior ya no da el mismo archivo, aun antes de este cambio, porque sus fuentes
   cambiaron después de la compuerta. Con el JSON de hoy corre sin error y su sección 5 muestra las diez entradas en
   vez de las seis de entonces.
9. **Construcción E12** (19-oct): la cinta de la home de A (`proto/a/medios/cinta.*`) muestra la línea de medidas de
   Combeau en su tramo «Combeau, modelo» (12 a 14 s): al rehacerla, ese tramo sale de `casos/combeau/medios/combeau-modelo-cinta.*`
   (§2.9). Ningún medio de `inventario/grabaciones/combeau-modelo-*` va al sitio. La capa de señales de todas las rutas
   de la obra, con `/trabajo/combeau/` como una sola página, está en `e12/senales-obra.md` y supera a
   `senales-trabajo.md` donde choquen.

## Crudos

En `e12/inventario/crudo/`, con sha256 en `inventario-casos.json`: las tres respuestas del chequeo con sus cabeceras,
las dos de Verifica y Cumple, el HTML servido de spindlelab.cl y de Verifica, el extracto de Combeau, las cabeceras de
cada sitio, `cabeceras-varias.txt` (CDN de imágenes, original subido, login, video del hero, vista previa, dominio
viejo de Verifica, `/v3/` en producción), `h1-bernardocombeau.cl.tsv`, `h1-portada-bernardocombeau.cl.json`,
`carga-playwright.json`, `imagenes-spindlelab.cl.json` y la traza de Cloudflare sin IP. **Del 18-oct:**
`conceptos-repo.json` (las cuatro piezas, sobre `01ea00f`), `grabaciones-combeau.json` (registro de las cuatro
grabaciones y de la pantalla de entrada del panel), `jsonld-ids-bernardocombeau.cl.json` (solo `@id`, `@type` y
nombres de claves) y `reel-modelo-bernardocombeau.cl.json`. Las grabaciones y sus pósteres, en `e12/inventario/grabaciones/`. Las herramientas quedan en
`e12/inventario/herramientas/`: `medir-carga.mjs`, `medir-h1-portada.mjs` y `medir-imagenes.mjs`; y del 18-oct,
`medir-conceptos.py`, `grabar-combeau.mjs`, `ids-jsonld-combeau.py` y `medir-reel-modelo.mjs`.

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

**18-oct · defecto 3 del acta del paso 2** (`e12/acta-paso-2.md`, Javiera, vuelta 1: el inventario no se había
actualizado con el encargo del paso 2 §5).

| Qué | Antes | Ahora |
|---|---|---|
| Entradas del índice | Seis, con Raigal como concepto y sin Praxi (§0.1, §2) | Diez: seis reales con Praxi (§2.5) y las cuatro piezas de concepto (§2.7). Raigal, con Aplomo y Deslinde, a §8: sus nombres ya son de empresas reales |
| Permiso de Combeau | «Verbal… sin respaldo escrito», y «Lo que el permiso de Combeau no cubre»: publicar una medición fechada, grabar su sitio o su panel, la foto del antes y después | «Ramón, 16-oct: no se necesita más permiso» (compuerta 1, punto 2), dicho por él y sin respaldo escrito de Bernardo en el repo; cubre lo que antes no, y deja fuera sus datos de contacto, sus medidas, lo que pagó y su sitio como vitrina de SEO (§2). Cambian con él §0.4, §4.1 (el 76), §4.3, §6.1, §7 y §9 |
| Filas de los conceptos | Ninguna (las fichas las dejaban «para la fila del inventario que lleva Diego») | §2.7: lo común a las cuatro y de 5 a 6 ingredientes por pieza, cada uno con su evidencia en el repo y en `conceptos-repo.json`; dos marcados como candidatos a la línea del índice; sin métrica por regla |
| Grabaciones de Combeau | No había (`direccion-b.md` §10 lo dice) | §2.8: cuatro grabaciones y la pantalla de entrada del panel; el panel por dentro, hueco nombrado |
| Capa de señales de `/trabajo/` | No había | `e12/senales-trabajo.md` (Simón), con la clave `senales` en el JSON |
| Praxi en §8 («No entra sin su decisión») | Fuera del índice | En el índice desde la compuerta 1, punto 3 (§2.5) |

**Lo que no cambió:** las mediciones del 16-oct (§1 a §6) y sus crudos. El HTML de Combeau bajado el 18-oct dio el mismo
sha256 que el del 16-oct.

**Una corrida interrumpida, dicha.** `grabar-combeau.mjs` se corrió dos veces antes de esta: la primera (18-oct,
hacia las 21:08 UTC) se cayó en `/modelo/` a 390, porque esa versión esperaba la red quieta sin tope; la segunda
(21:15) se cortó con un reinicio del contenedor. Entre las dos dejaron tres grabaciones sin registro y ninguna del
panel. Se puso tope a la espera y se volvió a correr completa (§2.8): sus archivos reemplazaron a los anteriores y son
los que tienen fila en `grabaciones-combeau.json`. La medición de los conceptos se había hecho sobre `51a0735`; se rehizo sobre `01ea00f`
porque entremedio cambiaron dos hojas de estilo (Ocelo y Sesenta, `9122486`).

**19-oct · compuerta 2** (Ramón, hacia las 09:50; leída como la dejó el orquestador con Ramón).

| Qué | Antes | Ahora |
|---|---|---|
| Caso Combeau | Una entrada del índice sin página definida ni texto; sus medios, en el inventario y en los prototipos | Caso real con página propia (pregunta 5f), una sola para los dos sitios: §2.9, con lo que se usa y lo que no, y los medios recortados en `e12/casos/combeau/` |
| Grabaciones de `/modelo/` (§2.8) | «Se detiene antes de sus medidas (`#details`)» | Sí muestran la línea de medidas bajo el retrato (1440: 2,5 a 4,5 s; 390: 0 a 4,5 s): se quedan como registro y no van al sitio. Grabado de nuevo un tramo limpio, con la comprobación por cuadro |
| La cinta de la home de A | (no se había revisado) | Muestra la línea en su tramo «Combeau, modelo» (12 a 14 s): se rehace en la construcción con `combeau-modelo-cinta.*` (§9, punto 9) |
| Puntajes propios (§4.1, §9.1) | «Decide Ramón» | No se muestran (pregunta 6, por defecto); siguen medidos aquí |
| Praxi (§2) | «Fuera de línea» en la columna de estado | Igual el 19-oct, pero dato interno: el caso no lo cuenta (pregunta 5b) |
| Un ingrediente nuevo de Combeau | — | «Encuadre de fotos en el panel», con su fila en §2.9 (repo de otra sesión, 3-sep; en producción según ese documento; no medido hoy) |
