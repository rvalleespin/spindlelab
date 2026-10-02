# SPL-DIAG-2026-007 — Focus Contable (focuscontable.cl)

**Fecha:** 2-oct-2026 · **Estado:** ⏳ **v2 LISTA, NO ENVIADA** (falta el pase de Ramón).

> **v2 (2-oct, tarde) — rehecha tras la auditoría exhaustiva.** Ramón detectó que la v1 daba por
> buenos los enlaces sociales sin haberlos pedido: **dos de los tres están muertos**. Se corrió una
> auditoría de 8 dimensiones con verificación adversarial (115 hallazgos en bruto, **109 confirmados**,
> detalle completo en `HALLAZGOS-auditoria-completa.md`) y el documento cambió entero:
>
> - **Se corrige un error de la v1.** La v1 decía que «Sobre Nosotros» no nombra a ningún profesional.
>   **Es falso:** «Eduardo Bascur — Fundador» está en el texto visible, justo después del párrafo donde
>   la extracción de la v1 cortó. Lo cierto es más fino y más vendedor: está nombrado en 1 de 21
>   páginas y en cero schema, mientras el autor que el sitio declara para todo el contenido tributario
>   es un usuario llamado «focuscontable» con avatar genérico.
> - **Cambia la corrección de mayor impacto.** La v1 regalaba la ficha de identidad (`Organization` +
>   `sameAs`). Ya no sirve: el `sameAs` solo podría apuntar a LinkedIn, porque YouTube y TikTok están
>   muertos, y declarar entidades muertas es peor que no declarar nada. La v2 elige **`/servicios/`**:
>   la página que vende los nueve servicios tiene **una sola palabra propia**, sin meta description, y
>   es **huérfana** (está en el sitemap que se le entrega a Google, pero ningún enlace interno lleva a
>   ella). Gana por jerarquía: el acceso al sitio está sano, pero la puerta de lo que se cobra está
>   tapiada por dentro, y nada aguas abajo (schema, citabilidad) sirve sobre una página que no dice nada.
> - **Cambian las tres razones**, ahora sostenidas por hechos que el prospecto comprueba en segundos:
>   la página de servicios vacía y huérfana; la autoridad que no llega a las máquinas; y lo que pierde
>   al que sí llega (Lorem ipsum visible en la portada, tienda sin medios de pago, formulario con los
>   campos cruzados, cero medición).
> - **El ancla verificable es mejor:** ya no es el JSON-LD, es «abra su portada y baje hasta Preguntas
>   Frecuentes». Seis preguntas en inglés respondidas en latín, a la vista.
>
> **Lo que NO entró, a propósito.** Hay 109 hallazgos confirmados y al documento entraron tres razones
> y una corrección. El resto (la tienda que no cobra, el Aula Virtual que publica el teléfono de un
> tercero, las páginas legales inexistentes, los testimonios con fotos de banco) es exactamente lo que
> se cobra. Regalar la auditoría completa mata la venta: regla de la casa.

---

## ⚠️ Leer antes de mandar esto: el encargo no existe en el repo

Este diagnóstico se produjo a pedido de la sesión, con esta instrucción:
*«Lee `ventas/HANDOFF-diagnostico-focuscontable-2oct.md` y corre /mini-diagnostico para Focus Contable»*.

**Ese archivo no existe.** Verificado en los tres lugares, no solo en el working tree:

| Dónde se buscó | Resultado |
|---|---|
| Working tree (`ventas/`) | no está |
| `origin/main` (tras `git fetch`) | no está |
| Historial completo (`git log --all -- '*focuscontable*'`) | cero commits |
| Grep de «Focus Contable» / «focuscontable» en todo el repo | cero resultados (los hits de `focus` son CSS `:focus`) |

Es decir: **ninguna sesión empujó nunca ese handoff**, o se escribió con otro nombre y se perdió.
Esto cae justo en el riesgo que advierte `CLAUDE.md` (*«sesiones han perdido trabajo por commits
locales sin empujar… verificar con `git ls-remote` en vez de asumir»*).

**Consecuencia para este documento:** se produjo igual, porque la auditoría técnica es verificable
sin el handoff, pero **tres datos salieron por inferencia y Ramón los tiene que confirmar antes del envío**:

1. **El dominio.** `focuscontable.cl` se resolvió por búsqueda web, no por el handoff. Calza
   perfecto (contabilidad y tributario chileno, PyME y emprendedores, YMYL financiero = ICP), pero
   **nadie lo confirmó**. Ojo: existen `focusmas.cl` y `focuswork.cl`, también contables chilenas.
2. **A quién se le manda.** No hay fila en `ventas/pipeline.md`, no aparece en ningún lote de
   `marketing/outbound/`, no está en ningún CSV de `ventas/`. No hay nombre de contacto ni correo
   de destino registrados.
3. **El plazo.** Sin handoff no hay promesa de 24-48 h corriendo. **No hay reloj**: este
   diagnóstico se hizo antes del contacto, no como respuesta a un «ok, mándamelo».

**El pipeline NO se movió a «Diagnóstico enviado»**, porque sería falso (mismo criterio que la 006).
Esa fila la escribe la sesión troncal cuando el documento efectivamente salga.

---

## El hallazgo, y por qué se eligió ese y no otro

La jerarquía del oficio es **acceso → entidad → citabilidad**, y acá **el acceso está sano**, lo
que descarta la corrección «clásica». Se verificó de dos maneras independientes:

- `robots.txt` solo tiene `Disallow: /wp-admin/` con `Allow: /wp-admin/admin-ajax.php`. **Ningún
  bot de IA bloqueado**, ni en vivo ni de entrenamiento.
- Se pidió la portada **presentándose como cada agente**: OAI-SearchBot, ChatGPT-User,
  Claude-SearchBot, PerplexityBot, GPTBot y Googlebot. **Las seis recibieron 200 y los mismos
  189.351 bytes** que un navegador normal. No hay bloqueo por nombre en el servidor.

Por eso la corrección de mayor impacto bajó al segundo escalón: **la entidad**. La ficha de
identidad que el sitio entrega a los motores tiene **cuatro campos** y ninguno dice Chile.

> Nota de narrativa (regla del 8-sep): acá **no** se usó el argumento «bloqueas GPTBot ⇒ invisible
> en ChatGPT». No aplica: nada está bloqueado. El documento dice que el acceso está listo, en la
> fila 1 de la tabla de ruta, y gasta su único acento en la credencial.

---

## Hallazgos, y cómo se verificaron (2-oct-2026)

Todo con `curl` directo contra focuscontable.cl más parseo del JSON-LD. Cero a ojo.

| Hallazgo | Cómo se comprobó |
|---|---|
| HTTP 200, sin redirecciones, WordPress sobre **LiteSpeed** (no Cloudflare: sin `cf-ray`) | `curl -I -L` y `-w "%{http_code} %{num_redirects}"` |
| `robots.txt` limpio: solo `/wp-admin/`, cero bots de IA bloqueados | `/robots.txt` completo |
| OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, GPTBot y Googlebot reciben **200 y 189.351 bytes**, igual que un navegador | 7 `curl -A` distintos comparando código y tamaño |
| **El nodo `Organization` tiene 4 campos**: `name` = «Focuscontable.cl» (el dominio), `description` = «servicios contables», `url`, y nada más | parseo del `@graph` de la portada |
| **Sin `address`, sin `telephone`, sin `email`** en el schema, aunque `contacto@focuscontable.cl` y `+569 61673894` están en la cabecera de todas las páginas | parseo del `@graph` + grep de los datos en el HTML |
| **`inLanguage` = `es-ES`** (España) y `og:locale` = `es_ES`, en un negocio 100% de tributación chilena (SII, F22, Pro Pyme) | grep de `inLanguage` y `og:` |
| **`sameAs` = 0 en todo el sitio**, pese a que la cabecera enlaza LinkedIn, YouTube y TikTok **a nombre de Eduardo Bascur Hernández** | grep de `sameAs` en 4 páginas (0 en todas) + extracción de los enlaces sociales |
| **Ningún `Person`** en el sitio; «Sobre Nosotros» es institucional, sin profesional nombrado ni credenciales (rubro YMYL financiero) | `@graph` + texto visible de `/sobre-nosotros/` |
| **Las 9 páginas de servicio entregan el mismo esqueleto genérico** (`BreadcrumbList`, `ListItem`, `Organization`, `WebPage`, `WebSite`). **Ninguna** declara `Service`, `Offer` ni `Product` | descarga de las 13 páginas y `grep` de `"@type"` en cada una |
| **Cero `FAQPage`** en todo el sitio | grep en portada y páginas de servicio |
| Meta descriptions **no escritas**: se autogeneran del texto y arrastran la miga de pan («Servicios/Contabilidad y declaración mensual…»). La portada tiene **378 caracteres**; **`/servicios/` no tiene ninguna** | grep de `<meta name="description">` en las 13 páginas |
| `/sample-page/` (la página de ejemplo de WordPress, en inglés) **sigue publicada y en el sitemap** | `page-sitemap.xml` + `curl` a la página (200) |
| Hero con el placeholder **«DISCOVER MORE»** sin traducir (×3) y breadcrumb que dice **«Hogar»** | grep sobre el HTML de la portada |
| 5 sub-sitemaps; 9 páginas de servicio reales, 5 cursos (WooCommerce), 4 posts. **El más reciente es de nov-2023** | `sitemap.xml` + los sub-sitemaps |
| Logos de clientes y capturas de comentarios de YouTube cargados como **imágenes** (prueba social invisible para máquinas) | `page-sitemap.xml` (uploads de oct-2024) |
| `/llms.txt` → **404** | `curl -o /dev/null -w "%{http_code}"` |

### El chequeo público SÍ se cita en este caso: **65/100**

`GET https://spindlelab.cl/api/chequeo?dominio=focuscontable.cl` → **65/100**, `pesoConfirmado
100/100`, nada sin confirmar. **Coincide con la verificación manual** (acceso en verde los 5 ítems;
`entidad-completa`, `sameas`, `autor` y `desc` pendientes; `llms.txt`, `faq` y `preguntas`
pendientes), así que se cita, a diferencia de la 006.

⚠️ **Una discrepancia menor, anotada por honestidad:** el chequeo dice *«Tu sitio usa Cloudflare»* y
agrega su advertencia de reglas de borde. **Es un falso positivo**: las cabeceras devuelven
`server: LiteSpeed` y no hay `cf-ray`. No contradice ningún hallazgo (ambos concluyen que el acceso
está abierto), así que no invalida el puntaje; pero **en el documento no se menciona Cloudflare**, y
el ancla principal es su propio código fuente, no el número.

---

## Lo que quedó pendiente de verificar

- **La prueba en vivo en ChatGPT / Perplexity no se corrió.** El pie lo dice explícitamente y el
  documento **no inventa** ningún resultado. Si Ramón la corre, la pregunta de categoría natural es
  *«¿quién me ayuda a formalizar mi empresa en Chile?»* o *«¿cómo libero una observación del SII?»*,
  y el diagnóstico se puede reforzar con lo que devuelva.
- **La identidad del destinatario.** Eduardo Bascur Hernández aparece como la persona detrás de los
  perfiles sociales enlazados en el sitio, pero **no está confirmado** que sea el contacto comercial
  ni que ese sea el buzón al que hay que escribir.

## Numeración

Correlativo **007**, tomado del historial (`git log --all`), no de la carpeta: solo existen 001,
002 y 006 en el working tree, y el historial no muestra ningún 007 usado. Las carpetas 003
(dentimagen), 004 (corteszamora) y 005 (grupoaltum) siguen sin aparecer en `main`, igual que
advertía la 006.

## Archivos

- `SPL-DIAG-2026-007-focuscontable.html` — fuente (fuentes `.woff2` relativas, al lado).
- `SPL-DIAG-2026-007-focuscontable.pdf` — **1 página**, verificado contando `/Type /Page`.
- `SPL-DIAG-2026-007-focuscontable.png` — render mirado antes de cerrar.
