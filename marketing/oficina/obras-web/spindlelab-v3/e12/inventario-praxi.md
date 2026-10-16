# E12 · Inventario del caso Praxi: qué es, qué se construyó, cómo trabaja la IA y qué se puede decir

**16-oct-2026, mediciones entre las 19:56 y las 20:12 (Chile; 22:56 a 23:12 UTC) · Diego, con el criterio de Simón** ·
rama `claude/magical-franklin-ckfki2` · manda la sección «Compuerta 1» de `e12/brief-de-obra.md` (punto 3: «podría entrar
praxi como caso ya que creó un sitio y una app») y `e12/encargo-paso-2.md` §5 · gemelo legible por máquina:
`inventario-praxi.json` · material y capturas en `e12/praxi/`.

**Qué es.** La fila que le faltaba a `inventario-casos.md`: lo que el índice de Trabajo y una página de caso pueden decir
de Praxi, con la misma regla: **una etiqueta o un número que no tenga fila aquí no existe.** **Qué no es:** texto del
sitio (Clara) ni dirección visual (Lucía).

**Cómo leer las fuentes** (las mismas del inventario general). *Servido*: respuesta HTTP bajada hoy. *Medido*: un
instrumento corrido hoy, con su salida guardada en `e12/praxi/crudo/`. *Repo*: archivo o commit de
`/home/user/praxis-coach` (`a360d7a`) o de su historial en GitHub. *Dicho*: lo afirma un documento del repo de Praxi y
no se pudo volver a medir hoy.

**Lo que no se tocó.** `/home/user/praxis-coach` solo se leyó: al cerrar, `git log -1` sigue en `a360d7a` y
`git status` está limpio (sin `.env`, sin `node_modules`, sin `.next`). No se llamó a su Supabase, a la API de
Anthropic, a Mercado Pago, a PostHog ni a Meta. A `praxi.coach` solo se le hizo `GET` para medir su estado. Todo lo que
se construyó vive en una copia sin `.git` en el scratchpad de la sesión, y el servidor local se apagó al terminar.
`spindlelab-astro/` no se tocó.

---

## 0 · Lo que este inventario le cambia a la obra

1. **Praxi es la única pieza del portafolio con IA programada, y la única app con cuentas, datos de cada persona y
   cobro.** Es un coach de hipertrofia por chat, de Ramón, cobrado por SpindleLab SpA. Se construyó entre el **21-jul y
   el 25-ago-2026**:
   **349 commits en `main` y 131 pull requests** (GitHub, leído hoy). Hoy, sobre una copia del último commit, pasan
   **384 de 384 tests**, el gate de marca da **8/8**, el typecheck sale limpio y el build de producción termina sin error.
   Eso es lo que el caso puede decir con fecha y con instrumento.
2. **La IA de Praxi hace dos cosas, y las decisiones no las toma el modelo.** Un modelo pequeño (Haiku 4.5) convierte
   «hoy hice press banca 3x10 RIR 2» en series guardadas, obligado a responder con un esquema fijo. Un modelo grande
   (Sonnet 5) conversa. **Cuándo subir el peso, cuándo descargar y qué serie cuenta se calculan en código con tests**
   (42 tests en esas cinco piezas) y se le entregan al modelo ya resueltos. Los guardrails de salud y de edad también
   van en código. No hay RAG, ni embeddings, ni modelo propio, ni ajuste fino: búsqueda en el código, cero apariciones.
   Esto le da al brief su única afirmación de IA verificable (§5).
3. **`praxi.coach` no responde: `402` con `x-vercel-error: DEPLOYMENT_DISABLED`** en `/`, `www`, `/planes` y
   `/robots.txt` (medido hoy, 22:56 UTC). No es el muro de pago de la app (que también devuelve 402, pero con un JSON `{ error, motivo: "plan" }`, `lib/acceso-server.ts:72-80`): es
   Vercel diciendo que el despliegue está deshabilitado. **Ningún enlace a `praxi.coach`** en el sitio mientras sea así
   (encargo §7.12). El caso se cuenta con capturas de una copia local y con el material del repo.
4. **Resultado: «Sin métrica».** No hay un número de uso, retención o ventas que se pueda publicar. Lo que existe es un
   conteo interno del 24-ago, escrito en un documento del repo de Praxi, que no se puede volver a medir sin entrar a su
   base (y no se entra): dice que el producto **casi no se usó** (§8.2). No se publica, y no hace falta: el caso de
   Praxi es de oficio, no de tracción.
5. **Toda persona que aparece en el material de Praxi es generada con IA** (Higgsfield: Seedance 2.0 para el video del hero,
   sus modelos de imagen para las fotos, con dos personajes reutilizables). Las tipografías, la composición y los overlays son
   HTML renderizado. El caso lo tiene que decir junto a la imagen, no en una nota al pie. Tres fotos de la landing
   (`landing-1/2/3.jpg`) no tienen procedencia escrita en ningún lado: no se usan hasta que Ramón la diga.
6. **Las pantallas internas de la app no se pueden capturar** sin una cuenta y sin la base (todas redirigen a `/login`,
   307 medido). No se inventaron con datos falsos: quedan como **hueco nombrado** en «Pedir a Ramón» (§10). Lo que sí
   se ve sin cuenta (la landing completa, `/login`, `/planes`, `/empezar`) está capturado a 1440 y 390.
7. **¿Alcanza para la vista 3 del tablero?** El material cubre de sobra un tercio de página sin relleno (13 secciones
   de landing, video del hero, un reel, el carrusel, la identidad), pero **la sección «La pieza» quedaría sin la app**,
   que es justo lo que distingue a Praxi. Recomendación: **la vista 3 sigue siendo Combeau** (supuesto del encargo §9);
   Praxi entra al índice como «Propio» y su página se arma cuando Ramón entregue las capturas de la app o decida ir sin
   ellas.

---

## 1 · Cómo se midió

| Qué | Cómo | Cuándo (UTC) | Crudo |
|---|---|---|---|
| Estado de `praxi.coach` | `curl -sS -D -` con user-agent de Chrome 141 sobre `/`, `www.`, `/planes`, `/robots.txt`, y el cuerpo de `/` | 22:56 | `praxi/crudo/estado-praxi.coach-headers.txt` y `-cuerpo.txt`. La línea `HTTP/1.1 200 Connection Established` es del proxy de la sesión, no de Vercel |
| Historial | API de GitHub, solo lectura: commits de `main` (4 páginas de 100: 349) y pull requests (el primero, #1, el 26-jul; el último, #131, el 25-ago). El clon local es superficial (`--is-shallow-repository`: true, un solo commit) y no se le hizo `fetch` | 22:50 a 22:55 | Este archivo. Primer commit `c501964` «MVP inicial» (21-jul, 20:56 UTC); último `a360d7a` (25-ago, 18:18 UTC), que es también la cabeza de `main` en GitHub hoy |
| Copia de trabajo | `tar --exclude=.git` de `/home/user/praxis-coach` al scratchpad; `npm ci` (619 paquetes, Node 22.22.0) | 22:56 | |
| Tests, gate y tipos | `vitest run` con reporte JSON; `npm run design-check`; `tsc --noEmit` | 22:57 a 23:10 | `praxi/crudo/verificacion-copia.txt` (tests por archivo, salida del gate) |
| Build | `next build` con tres variables **en la línea de comandos**, nada escrito en disco: `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:9` (un puerto donde no escucha nadie), una anon key de texto inventado y `NEXT_PUBLIC_APP_URL` local. Las fuentes de `next/font` se bajaron de Google en el build | 22:58 | Tabla de rutas en §3 |
| Capturas | `next start -H 127.0.0.1 -p 3917` y `praxi/herramientas/capturar-praxi.mjs`: Chromium 141.0.7390.37 headless con Playwright, 1440 × 900 (1x) y 390 × 844 (2x, móvil), primera pantalla, página completa y cada sección de la landing; recorre la página antes de capturar para que lleguen los observadores | 23:01 a 23:03 | `praxi/crudo/capturas-praxi.json` (estado, `h1`, JSON-LD, videos, consola, pedidos fallidos y externos de cada vista) |
| Material | `ffmpeg` y ImageMagick sobre archivos de `public/` y `brand/` del repo de Praxi, sin generar nada | 23:05 a 23:06 | `praxi/material/` (§7) |
| Archivo web | `web.archive.org/cdx` para ver si hay capturas públicas del sitio en agosto | 23:08 | **No se pudo**: el proxy de la sesión cortó la conexión. Queda sin dato |

**Lo que las capturas no muestran bien:** el Chromium de Playwright **no reproduce H.264** (`canPlayType` vacío; los
`<video>` terminan con error 4). Por eso el hero y el login se ven con su **póster**, que es exactamente el repliegue que
Praxi programó para cuando el navegador no reproduce (bitácora del 4-ago). Un visitante con Chrome o Safari ve el video.
El movimiento del hero está en `praxi/material/praxi-hero-secuencia.mp4`.

---

## 2 · Qué es y para quién

| Campo | Valor | Fuente |
|---|---|---|
| Nombre | **Praxi** (el `package.json` dice `respinfitness-coach`, nombre viejo; antes fue «Praxis», renombrada el 22-jul para calzar con el dominio) | Repo: `README.md`, `CLAUDE.md:872`, commit `1916dd8` |
| Tipo | **Propio** (producto de Ramón). El cobro está a nombre de SpindleLab SpA | Repo: `CLAUDE.md:722`, `lib/comercio.ts` |
| Año | 2026 (21-jul a 25-ago) | GitHub |
| Qué es | Un coach de hipertrofia por chat, en español de Chile. La persona le cuenta cómo entrenó en una frase; la app guarda las series y decide con su historial cuándo subir el peso | Repo: `README.md`, `CLAUDE.md:24-42` |
| Para quién | Gente que entrena con pesas y quiere progresar con método, en Chile. La landing dice también para quién **no** es (rehabilitar una lesión, tratamiento médico o nutricional) | Repo: `brand/brand.json` `audience`; Servido (local): sección «¿Es para ti?» |
| Claim | «Entrena sabiendo por qué». Desde el 3-ago **dejó de ser el argumento de venta**: lo que se vende es la memoria («se acuerda de cada serie que hiciste») | Repo: `CLAUDE.md:523-532` |
| Precio | Gratis (10 mensajes por semana y el registro completo, sin fecha de término), Mensual CLP 7.990, Anual CLP 59.900, 7 días de prueba. **Son los precios de Praxi, no de SpindleLab**; si el caso los muestra, como precios de ese producto | Repo: `lib/flow/planes.ts`, `lib/acceso.ts`; Servido (local): `/planes` |
| Quién lo hizo | Ramón, con sesiones de Claude Code: los commits llevan la línea `Co-Authored-By: Claude`. Dos sesiones en paralelo (app, y marca y sitio) con un reparto de archivos escrito | GitHub; Repo: `docs/encargos/bitacora-diseno.md:12-24` |
| Estado al 16-oct | **Fuera de línea**: `402 DEPLOYMENT_DISABLED` de Vercel. Último cambio de código: 25-ago | Medido; GitHub |

---

## 3 · Qué se construyó: el sitio y la app

**El build de hoy** (`next build` sobre la copia) da **47 rutas**: 22 páginas, 20 rutas de API, `auth/callback`,
`manifest`, `robots`, `sitemap` y la 404. Todas las páginas se sirven por petición (`ƒ`), que es lo que exige su CSP
con nonce (`CLAUDE.md:295-302`), salvo la 404 y los tres archivos generados.

| Parte | Rutas | Qué hace | Se puede ver sin cuenta |
|---|---|---|---|
| **Sitio público** | `/` (landing), `/planes`, `/empezar`, `/terminos`, `/privacidad`, `/eliminar-cuenta`, `/baja` | La landing vende la memoria, explica el método «si ya entrenas con método», compara contra lo que ya probaste y muestra precios. `/empezar` es el paso entre el botón y el registro («lo que te llevas gratis»). `/eliminar-cuenta` existe porque Google Play la exige pública | **Sí**: capturadas `/`, `/planes`, `/empezar` (§6) |
| **Entrada** | `/login`, `/reset`, `/auth/callback` | Login con cinco clips de video detrás (repliegue al póster) | **Sí**: capturado `/login` (sin `h1`, ver §6) |
| **App** | `/onboarding`, `/home` (Inicio), `/chat` (Coach), `/registro` (rutina, dieta, pegar una rutina), `/progreso`, `/perfil`, `/planes/listo` | Inicio abre con **lo último que registraste** (el formato, con el ejemplo de la bitácora del 4-ago: «Press banca, 62,5 kg · fue hace 2 días y te quedaron 2 repeticiones»); el Coach es una lista de conversaciones con streaming; Registro marca ejercicios, cargas y el día; Progreso grafica adherencia, RIR real contra objetivo, series que cuentan por músculo y progresión de carga | **No**: 307 a `/login` sin sesión. Hueco nombrado (§10) |
| **Servidor** | 20 rutas en `app/api/`: chat, registro, planes, documentos, peso, perímetros, cobro (suscribir, webhook, cancelar), correo, borrado de cuenta, tres crons | El muro de pago se cumple aquí (402 con `motivo: "plan"`), no en los botones | (No es pantalla) |
| **Base** | 25 migraciones SQL en `supabase/migrations/`, RLS en todas las tablas, permisos de escritura **por columna** en `profiles` | Nadie puede escribirse un plan pagado desde el navegador (`0019`) | (No es pantalla) |

---

## 4 · El stack, verificado en el código

| Ingrediente | Lo que le hace al usuario (borrador para Clara) | Evidencia |
|---|---|---|
| **Next.js 14.2.35** (App Router, React 18, TypeScript estricto) | (sin efecto que contar) | Repo: `package.json`; Medido: build OK |
| **Tailwind + shadcn/ui** | (sin efecto que contar) | Repo: `tailwind.config.ts`, `components/ui/` (2 componentes) |
| **Supabase** (login con correo, Postgres, RLS, almacenamiento privado) | Cada persona ve y borra solo lo suyo; sus exámenes viven en un bucket privado | Repo: 25 migraciones, `0002_rls.sql`, `0015_user_documents.sql`, `0019_profiles_column_grants.sql` |
| **API de Anthropic, solo en el servidor**: `claude-sonnet-5` para conversar, `claude-haiku-4-5` para extraer | Le escribes como a una persona y el registro queda guardado sin formularios | Repo: `lib/anthropic.ts:14,17`, `import "server-only"` |
| **Lógica de entrenamiento en código, con tests** | El peso sube solo con dos sesiones confirmadas; la descarga llega por fatiga corroborada, no por calendario | Repo: `lib/domain/rir.ts`, `effectiveSet.ts`, `deload.ts`, `mesociclo.ts`, `lib/coach/signals.ts`; Medido: 42 tests en verde |
| **Guardrails en código** (salud y edad) | Si mencionas dolor, mareo o señales de trastorno alimentario, el coach no diagnostica y te deriva; a un menor no le recomienda suplementos | Repo: `lib/coach/healthGuardrail.ts`, `guardrailMenores.ts`; Medido: 16 tests en verde |
| **Mercado Pago, formulario embebido** | Pagas con tarjeta sin salir de Praxi y sin cuenta en Mercado Pago; el número de tarjeta nunca toca su servidor | Repo: `components/mp-card-form.tsx`, `lib/mp/`; `CLAUDE.md:144-164` |
| **Resend** (correos de cobro) | Te llega la fecha exacta del cobro, el monto y cómo cancelar | Repo: `lib/email/plantillas.ts`; Medido: 38 tests |
| **Vercel** (hosting y tres crons diarios) | (sin efecto que contar) | Repo: `vercel.json`; Servido: `server: Vercel` |
| **CSP con nonce por petición** | (sin efecto que contar; es seguridad) | Repo: `middleware.ts`, `lib/csp.ts`; Medido: 15 tests |
| **PostHog por proxy propio** y **Conversions API de Meta desde el servidor**, sin píxel | (sin efecto que contar) | Repo: `next.config.mjs` (`/ingest`), `lib/growth/meta.ts` |
| **PWA** | Se instala en el teléfono y abre a pantalla completa | Repo: `app/manifest.ts`, `public/sw.js`, íconos |
| **Gate de marca en el build** (`design-check`, 8 reglas) | Un color fuera del contrato no puede llegar a producción: el build se cae | Repo: `scripts/design-check.mjs`, `prebuild` en `package.json`; Medido: 8/8 |
| **Datos estructurados** (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`) | Un motor de IA puede leer qué es Praxi, cuánto cuesta y qué responde, y citarlo | Repo: `lib/seo/estructurados.ts` (18 tests: «todo lo declarado tiene que ser cierto y estar visible»); Medido: los cuatro tipos en el HTML local de `/` |
| **Vitest** | (sin efecto que contar) | Medido: **384/384** en 35 archivos |

**No tiene:** RAG, embeddings, base vectorial, modelo propio ni ajuste fino (búsqueda en `lib/`, `app/` y `supabase/`,
cero apariciones). Tampoco Astro, Motion ni WebGL: el stack del sitio de SpindleLab y el de Praxi son distintos.

---

## 5 · Cómo trabaja la IA: lo que de verdad hace el código

Esta sección es la fuente de **toda** afirmación de IA que aparezca en el sitio (encargo §7.13: «toda afirmación de IA
visible remite a Praxi y dice lo que Praxi hace»).

1. **Extrae con un modelo obligado a un esquema.** `lib/coach/extract.ts` llama a Haiku con una sola herramienta,
   `extraer_registro`, y `tool_choice` forzado: el modelo no puede contestar texto libre, solo series con ejercicio,
   series, repeticiones (o un rango), carga y RIR. Si el mensaje no es un registro, devuelve `es_registro=false`. Desde
   el 19-ago la descripción pide **solo lo que la persona dice haber hecho**: ante la duda, no se guarda nada. El mismo
   patrón se usa para el peso corporal (`extraer_peso`), para guardar un plan que propuso el coach (`guardar_plan`) y
   para leer documentos subidos.
2. **Antes de llamar al modelo, filtra en código.** `lib/coach/pareceRegistro.ts` descarta los mensajes que no pueden
   ser un registro y ahorra la llamada (805 ms de mediana, dicho en `CLAUDE.md:589-590`; 5 tests).
3. **Decide en código.** `lib/domain/` calcula el RIR objetivo de la semana (4 → 3 → 2 → 1 → descarga), si toca subir
   la carga (dos sesiones confirmadas con RIR real por sobre el objetivo, nunca una sesión suelta), qué serie cuenta
   (RIR ≤ 4; sin RIR no cuenta) y si toca descargar (dos señales a la vez: el RIR cae con la misma carga **y** tres
   sesiones seguidas con sensación baja). `lib/coach/signals.ts` lo resume y lo entrega al modelo como texto.
4. **Conversa con un prompt en dos capas.** La capa 1 (método, estática, sin datos de nadie) va cacheada; la capa 2
   (perfil, mesociclo, últimas sesiones, señales calculadas) se arma por persona y va después del corte de caché.
   Medido por Ramón sobre 48 llamadas reales de julio y agosto, la caché ahorró 20 a 25 % (dicho, `CLAUDE.md:69-76`).
5. **Los guardrails no dependen de que el modelo se acuerde.** Salud y edad se detectan en código y se inyectan como un
   bloque aparte en cada turno que corresponde. El de edad existe porque el 22-ago, con una cuenta de prueba de 16 años,
   el coach recomendó creatina pese a que el prompt lo prohibía (`lib/coach/guardrailMenores.ts:6-21`).

**Lo que el modelo NO decide:** el peso de la próxima sesión, la descarga, qué serie cuenta, el acceso a lo que es de
pago (402 en el servidor antes de llamar al modelo), el precio. **Frase verificable, para Clara:** «El modelo entiende
lo que le escribes y conversa; cuándo subir el peso lo calcula código con tests.»

---

## 6 · Las capturas

Todas desde la copia local, **nunca desde producción**. JPEG ≤ 450 kB. Las cifras que se ven dentro de la landing
(la conversación «Hoy hice press banca 3x10 con 60 kg, RIR 2», «RIR 2.1 · objetivo 2», «+7,5 kg en cinco semanas», «12
series a la semana») están **escritas a mano en `components/landing.tsx`**: son la demostración de la propia landing,
no datos de una persona. Si una de estas capturas va al sitio, va rotulada así («Datos de ejemplo de la landing de
Praxi»), y ninguna de esas cifras se cita como resultado.

| Archivo (`e12/praxi/capturas/`) | Qué muestra | Tamaño | Contenido de demostración |
|---|---|---|---|
| `landing-1440-primera.jpg` · `landing-390-primera.jpg` | Primera pantalla: «Se acuerda de cada serie que hiciste.», el hero (póster) y la franja de confianza | 1440×900 · 780×1688 | No; el hombre del hero es generado (§7) |
| `landing-1440-completa.jpg` · `landing-390-completa.jpg` | La landing entera, 7.514 px a 1440 y 11.754 a 390 (reducida a 1080 y 390 de ancho para el peso) | 1080×5636 · 390×11754 | Sí, las secciones de abajo |
| `landing-1440-sec00.jpg` | Hero sin la barra | 1440×632 | No |
| `landing-1440-sec02.jpg` | «Llevas tres meses en 60 kg»: el problema, en tres frases | 1440×311 | No |
| `landing-1440-sec03.jpg` · `landing-390-sec03.jpg` | «Tú le cuentas en una frase. Él lo vuelve método.»: una conversación de ejemplo y lo que queda guardado | 1440×500 · 780×1806 | **Sí** (la propia landing la rotula «Ejemplo de conversación con el coach» para lectores de pantalla) |
| `landing-1440-sec06.jpg` | «Un coach que acumula lo que haces.» Tres rasgos: se acuerda, calcula, te avisa | 1440×783 | No. ⚠️ Lleva la foto `landing-3.jpg` (el disco amarillo), **sin procedencia escrita** (§7): esta captura y las dos completas no salen al sitio hasta que Ramón la aclare |
| `landing-1440-sec08.jpg` · `landing-390-sec08.jpg` | «Tu progreso, en números.»: cuatro tarjetas con gráficos (RIR, carga, series, mesociclo) | 1440×1065 · 780×3626 | **Sí**, todas las cifras |
| `landing-1440-sec09.jpg` | «Debajo del chat hay reglas, no una corazonada.»: las tres reglas del código, en palabras | 1440×526 | No |
| `landing-1440-sec10.jpg` | Precios: Gratis, Mensual, Anual | 1440×974 | No (precios reales de Praxi al 25-ago) |
| `login-1440-primera.jpg` · `login-390-primera.jpg` | Login con el póster del video detrás | 1440×900 · 780×1688 | No; la mujer del fondo es generada |
| `planes-1440-completa.jpg` · `planes-390-primera.jpg` | `/planes` sin sesión: «Nada de lo que entrenas se pierde.» | 1440×1945 · 780×1688 | No |
| `empezar-1440-primera.jpg` · `empezar-390-primera.jpg` | `/empezar`: «Lo que te llevas gratis» | 1440×900 · 780×1688 | No |

**Lo medido en esas vistas** (`crudo/capturas-praxi.json`): las ocho responden 200; cero errores de consola; sin
desborde horizontal a 390 (ancho del documento = ancho de la ventana); un `h1` en `/`, `/planes` y `/empezar`, **cero
en `/login`**; ningún pedido a un origen externo (las fuentes van autoalojadas) y ninguno a la URL de Supabase de
mentira desde el navegador. Los pedidos fallidos son prefetch de Next cortados al cerrar la página y los videos que este
Chromium no reproduce.

**Dos detalles de Praxi que el caso no debe copiar:** la sección de progreso escribe «2.1» y «3.8» con punto al lado
de «+7,5» con coma, contra su propia regla de números (`lib/formato.ts`, coma decimal); y `/login` no tiene `h1`.

---

## 7 · El material visual que existe, y lo que se copió

**Regla para el caso:** toda imagen o video con una persona dice que es generada. Lo que no lo es: los íconos, el
avatar, los gráficos y toda la tipografía (HTML renderizado, `brand/lanzamiento/LEEME.md`, «Cómo se produce una pieza»).

| Material en el repo de Praxi | Qué es | Origen | Copiado a `e12/praxi/material/` |
|---|---|---|---|
| `public/video/hero-1…5-*.mp4` (5 clips, 1,11 MB en total, 480 a 568 px de ancho, 1,7 a 2,6 s cada uno) | El hero: entrena, come en casa, camina, una reunión, una cena. «La vida alrededor del entrenamiento» | **Generado**: Seedance 2.0 con el personaje PraxiChileno, receta documental (`components/landing.tsx:128-143`, `brand/lanzamiento/PERSONAJE.md`) | **`praxi-hero-secuencia.mp4`** (los cinco en el orden del hero, cortes secos en vez del fundido del sitio, 568×320, 11,1 s, 636 kB) y **`praxi-hero-poster.jpg`** (el póster del sitio, 99 kB). ⚠️ En el clip de la reunión, la pared muestra letras sin sentido («…SANTLARLA»): un rasgo de generación que se ve si el clip va grande |
| `public/video/01…05-*.mp4` (5 clips, 2,92 MB, 272×480) | El fondo del login | **Generado** («cinco clips propios… generados para esto», bitácora del 4-ago) | No (se ve en la captura del login; el hero cuenta mejor la idea) |
| `brand/lanzamiento/campana-meta/final-meta-a-memoria.mp4` (1080×1920, 15,4 s, 5,0 MB) | Reel de campaña: «¿Con cuánto entrenaste la semana pasada?», un chat con el coach encima y «Praxi se acuerda. Por eso sabe cuándo subir.» | **Generado** el atleta (personaje PraxiAtleta, ya archivado como principal); el chat y los textos son overlays en HTML | **`praxi-reel-a-memoria-720.mp4`** (720×1280, 1,0 MB, sin audio, como el original) y **`praxi-reel-a-memoria-poster.jpg`** (cuadro de los 8,2 s, con el chat completo) |
| `brand/lanzamiento/carrusel-v2/s1…s5.png` (1080×1350) | Carrusel publicado: «La mitad de tus series quizá no cuentan.» | **Generadas** las fotos (banco `hero-chileno/`: imágenes calibradas en Higgsfield y luego animadas para el hero, commit `8eb10b5` del 4-ago); texto en HTML | **`praxi-carrusel-v2-s1.jpg`, `-s3.jpg`, `-s4.jpg`** (120 a 154 kB). La s3 lleva «12/16 series efectivas» como ejemplo |
| `brand/lanzamiento/pieza-04-portada/pieza-04.png` | Portada de Facebook | El fondo (`accion.png`) no está en su carpeta ni tiene procedencia escrita; la dirección de arte manda los fondos de fierro a Higgsfield (`DIRECCION-DE-ARTE.md:33`): **se trata como generado** | **`praxi-portada-facebook.jpg`** (1640×624, 51 kB) |
| `brand/avatar/a-oscuro.png`, `b-amarillo.png` (1080×1080) | El avatar: «P.» en Gabarito con el punto amarillo | **No generado**: renderizado desde el wordmark del código («Por qué no se generó con IA», `brand/avatar/NOTA.md`) | **`praxi-avatar-oscuro.png`**, **`praxi-avatar-amarillo.png`** |
| `public/icon-*.png`, `apple-*.png` | Íconos de la app | No generados. ⚠️ El de 512 conserva un fondo violeta muy oscuro (`#18152C`, tono ≈ 248°, dentro de la banda que su propio contrato veta para el primario) del sistema anterior; el avatar usa `#0F1117` | No |
| `public/landing-1/2/3.jpg` (675 a 900 px) | Tres fotos con virado amarillo; `landing-3` sigue en la landing (sección 06) y `landing-2` es el `og:image` | **Sin procedencia escrita** en el repo (entraron el 28-jul, `26b9687`, sin decir de dónde) | **No**, hasta que Ramón diga de dónde salen (§10) |
| `brand/lanzamiento/siembra/*.mp4`, `pieza-06-reel/`, `hero-chileno/`, `pieza-01/02/05` | Siembra orgánica, reel #1 y su material crudo, el banco de fotos, piezas descartadas | Generados; las 01, 02 y 05 están marcadas «No publicar» (`LEEME.md`) | No |

**La identidad, para la lámina del caso** (de `brand/brand.json`, el contrato que el gate hace cumplir):

| Rol | Valor |
|---|---|
| Acento único | `#E2F349` (amarillo del punto del logo) con texto `#15170A` encima, 15,41:1 (dicho en `brand/README.md`). Reemplazó el 26-jul a un morado `#8069F2` por ser «el índigo de todo demo de IA», que quedó prohibido en el contrato |
| Fondo y superficies | `#0F1117`, `#171A21`, `#1E222B`; línea `#262B36` |
| Texto | `#F1F3F7`; apagado `#9AA2B1` |
| Letra | Gabarito (titulares, wordmark, cifras; 500, 600 y 700) e Inter (cuerpo). Es la pareja del manual antiguo de SpindleLab: Praxi la heredó el 22-jul (commit `59308a1`, «sistema de marca SpindleLab») |
| Forma | Tres radios: 9, 11 y 13 px |
| Voz | Tuteo chileno, nunca voseo; `hype: 1` (Sabio con algo de Héroe; «nada de ¡Felicidades!») |
| Wordmark | «Praxi.» en Gabarito 600 con el punto en el acento; vive en código (`components/wordmark.tsx`), no como archivo |

**Nota para Lucía y Bruno:** el caso Praxi lleva amarillo y Gabarito porque **es la identidad de Praxi**, no la de
SpindleLab. Que el sitio nuevo deje el manual antiguo (compuerta 1, punto 7) no obliga a recolorear el caso: en Koto el
color de cada caso lo pone el trabajo.

---

## 8 · Lo verificable: qué se puede decir y qué no

### 8.1 · Se puede decir (con su fuente)

| Afirmación | Fuente |
|---|---|
| Sitio y app hechos por Ramón entre el 21-jul y el 25-ago-2026 | GitHub: primer y último commit de `main` |
| 349 commits y 131 pull requests | GitHub, leído el 16-oct |
| 384 tests en verde sobre el último commit, el 16-oct | Medido: `crudo/verificacion-copia.txt` |
| Cuándo subir el peso, cuándo descargar y qué serie cuenta se calculan en código con tests, no los decide el modelo | Repo: `lib/domain/`, `lib/coach/signals.ts`; Medido: 42 tests |
| Un modelo convierte la frase en series guardadas, obligado a un esquema; ante la duda no guarda | Repo: `lib/coach/extract.ts` |
| Guardrails de salud y de edad en código, para todos, pague o no | Repo: `healthGuardrail.ts`, `guardrailMenores.ts`; Medido: 16 tests |
| Cobro con tarjeta dentro de la app; la tarjeta no pasa por su servidor | Repo: `mp-card-form.tsx`, `CLAUDE.md:144-151` |
| Un color fuera del contrato de marca no llega a producción: el build se cae | Repo: `prebuild`; Medido: gate 8/8 |
| La landing tiene `Organization`, `WebSite`, `SoftwareApplication` y `FAQPage`, y un test exige que lo declarado esté visible | Repo: `lib/seo/estructurados.ts`; Medido: HTML local |
| La landing la aprobó Ramón el 4-ago después de siete rondas de corrección | Dicho: `bitacora-diseno.md:207-250` |
| Las personas del material son generadas, con un personaje reutilizable | Repo: `PERSONAJE.md`, `landing.tsx:128-143` |
| Hoy el sitio no está en línea | Medido: `crudo/estado-praxi.coach-headers.txt` |

### 8.2 · No se puede decir

| Lo que no | Por qué |
|---|---|
| Cualquier número de **usuarios, retención, conversión, ventas o ingresos** | No hay medición publicable. Existe un conteo interno del 24-ago (`docs/encargos/2026-08-24-traspaso-sesion-app-para-pm.md:184-200`): **14 perfiles, 3 de pago (uno de cortesía y dos cancelados), un solo pago aprobado (6-ago), ningún suscriptor recurrente y el último mensaje de chat el 17-ago**; y la campaña de Meta trajo **548 personas con 0 registros** antes del arreglo del embudo (`2026-08-19-cierre-fix-registro-para-pm.md:43-45`). Es *dicho*, de hace siete semanas, no se puede volver a medir sin entrar a su base, y dice lo contrario de un éxito. Se anota para que nadie escriba «usado por» ni «clientes»: el caso dice **«Sin métrica»** |
| Cualquier **resultado físico** («ganas músculo», «+7,5 kg», «progresas más rápido») | Rubro salud y entrenamiento. Además, las cifras de la landing son de ejemplo (§6). Ni el caso ni su texto prometen un resultado en el cuerpo de nadie |
| Que Praxi es **«IA propietaria»**, usa **«modelos RAG»**, **«despliega modelos»** o cualquier porcentaje de mejora | No lo hace (§4, «No tiene»). Usa la API de Anthropic con dos modelos comerciales |
| Que «está en producción», «disponible» o cualquier enlace a `praxi.coach` | `402 DEPLOYMENT_DISABLED` hoy |
| «Basado en evidencia» como sello sin explicar | Es el posicionamiento de Praxi (cita a Schoenfeld y RP/Israetel en el prompt), no una validación externa. Si va, va como «el coach cita sus fuentes» |
| El ahorro de costo del caché, el costo por persona (0,68 USD) o «0,81 USD en toda la vida del proyecto» | Dicho, medido por Ramón en agosto, sin crudo guardado aquí; y es dato interno de operación. Solo si Ramón lo quiere mostrar |
| Que el material es fotografía | Es generado (§7) |

---

## 9 · La historia, con la estructura de Koto

La página de caso de Koto (lock §13) va con ficha lateral, secciones, imágenes grandes y el resultado medido o «Sin
métrica». Esto es lo que cada sección tiene detrás. **Las frases son borradores de hecho, no copy:** el texto es de
Clara.

| Sección | Lo que hay | Material que la sostiene | Fuente |
|---|---|---|---|
| **Ficha** (mono, verdadera) | Propio · 2026 · Sitio y app · Next.js, Supabase, API de Anthropic, Mercado Pago · 21-jul a 25-ago · Estado: fuera de línea | (texto) | §2, §4 |
| **Desafío** | Las apps de entrenamiento se olvidan de lo que hiciste (la queja más repetida contra todas, según la investigación del 3-ago), y ChatGPT ya explica el porqué gratis. El diferenciador que Praxi anunciaba al principio («te explico el porqué») no era defendible | `landing-1440-sec02.jpg` («Llevas tres meses en 60 kg») | `docs/2026-08-03-inteligencia-mercado-praxi.md` §1; `CLAUDE.md:523-532` |
| **Estrategia** | Vender la memoria, no la explicación: «se acuerda de lo que hiciste y por eso sabe si subir el peso». La jerga (RIR, deload) fuera de la portada porque en Chile no tiene búsquedas; el precio anclado contra el gimnasio, no contra Netflix; un plan gratis que no se vence | `landing-1440-primera.jpg`, `landing-1440-sec10.jpg` | `CLAUDE.md:523-541`; `inteligencia-mercado` §2 |
| **Identidad** | Un contrato de marca en archivos (`brand.json`, `voice.json`) y un gate que tumba el build si el diseño se sale. El acento pasó del morado de demo de IA al amarillo del punto del logo | `praxi-avatar-*.png`, lámina de tokens (§7) | `brand/README.md`; commit `56fdae2` |
| **Aplicación** | El sitio (landing aprobada en siete rondas, video en el hero), la app (un chat que guarda; Inicio que abre con lo último registrado; Progreso con una cifra que manda) y la campaña (carrusel, reels con el chat encima) | `praxi-hero-secuencia.mp4`, `landing-*-sec03/08`, `praxi-reel-a-memoria-720.mp4`, `praxi-carrusel-v2-*.jpg`. **Faltan las pantallas de la app** (§10) | `bitacora-diseno.md`; `CLAUDE.md:676-690` |
| **Cómo piensa** (la sección que solo tiene Praxi) | El modelo entiende y conversa; el código decide. Las tres reglas de la landing (`sec09`) dicen eso mismo en palabras | `landing-1440-sec09.jpg` | §5 |
| **Resultado** | **«Sin métrica»**. Lo medible es de oficio: 384 tests en verde, gate 8/8, build limpio, el 16-oct. Que el sitio hoy no está en línea se dice en la ficha | (texto) | §8 |

---

## 10 · Pedir a Ramón

Una sola pasada, todo junto:

1. **Capturas de la app** (lo que falta para la sección «Aplicación»): Inicio con «Lo último que registraste», el Coach
   con una conversación en la que se guarde un registro, Registro → entrenamiento (la tarjeta del día con cargas),
   Progreso (los gráficos) y Perfil, **a 390 de ancho, desde una cuenta de prueba suya, nunca la de un usuario**. Como
   `praxi.coach` está apagado, tendría que ser corriendo Praxi en su Mac con su `.env.local`. O decir que el caso va sin
   ellas.
2. **¿Se cuenta que Praxi está en pausa?** Hoy responde `402 DEPLOYMENT_DISABLED`. Si lo reactiva, se mide de nuevo y
   recién ahí se enlaza.
3. **De dónde salen `landing-1.jpg`, `landing-2.jpg` y `landing-3.jpg`** (generadas, banco o compradas, y con qué
   licencia). Mientras no se sepa, no entran al caso.
4. **¿Se nombran los modelos** (Sonnet 5 y Haiku 4.5) en el caso, o basta con «la API de Anthropic»?
5. **Los datos de uso del 24-ago no se publican** salvo que él lo decida; la recomendación es «Sin métrica».
6. **Permiso:** no hace falta de un tercero (es suyo). Lo único que se le pregunta es si quiere que el caso diga que lo
   construyó con agentes de IA (los commits lo dicen).

---

## 11 · Señales para `/trabajo/praxi/` (Simón)

- **JSON-LD:** `CreativeWork` del caso (autor `#autor-ramon`, `dateCreated` 2026-07-21, `about` un `SoftwareApplication`
  llamado Praxi con `applicationCategory` y `operatingSystem: "Web"`) más `BreadcrumbList`. Sin `offers`: el producto
  hoy no se puede comprar, y declararlo sería afirmar algo que la página no puede sostener.
- **No puede declarar:** `Review`, `AggregateRating`, `Organization` de Praxi con `url` o `sameAs` a `praxi.coach` (no
  responde), ni `isAccessibleForFree` ni precios. Nada de `MedicalWebPage` ni términos de salud con promesa.
- **La página no se declara de cliente:** Praxi es «Propio».
- **Para que una IA lo cite bien:** una frase de entidad arriba, en texto (no en imagen), que diga qué es y qué decide el
  código; las capturas con `alt` que diga «captura de la landing de Praxi, datos de ejemplo» cuando corresponda.

---

## 12 · Cierre de la medición

| Control | Resultado |
|---|---|
| `git -C /home/user/praxis-coach log -1` | `a360d7a` (sin cambios) |
| `git -C /home/user/praxis-coach status` | Limpio; sin `.env`, `.next` ni `node_modules` en el clon |
| Servidor local `127.0.0.1:3917` | Apagado al terminar (no responde) |
| Llamadas a servicios de Praxi | Ninguna: Supabase apuntado a un puerto vacío, sin claves de Anthropic, Mercado Pago, PostHog ni Meta |
| `spindlelab-astro/` | Sin tocar |
| Generación pagada de imagen o video | Ninguna |

## Correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 16-oct, 20:12 | Primera versión | Diego, con Simón |
