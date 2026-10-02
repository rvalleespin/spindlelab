# SPL-DIAG-2026-007 — Focus Contable (focuscontable.cl)

**Fecha:** 2-oct-2026 · **Estado:** ⏳ **v3 LISTA, NO ENVIADA** (falta el pase de Ramón).

> **v3 (2-oct, noche) — reescritura de venta, por decisión de Ramón.** Dos cambios de criterio:
> 1. **No se regala nada.** La doctrina de la skill (`regala el paso 1 y haz visible la ruta`) queda
>    revertida para esta pieza por decisión del dueño. El diagnóstico demuestra que miramos a fondo y
>    encontramos cosas reales, específicas y verificables (eso es la autoridad y el gancho), pero el
>    **cómo** se arregla queda dentro de lo que se contrata. El bloque de impacto ya no dice «llene
>    /servicios/, se lo decimos gratis»; ahora nombra el costo («no es grave, es caro») y cierra en la
>    llamada. El riesgo de DIY que motivaba el regalo se cubre de otra forma: sin entregar el fix, no
>    hay qué copiar.
> 2. **Registro de ejecutivo de ventas**, con la voz real de SpindleLab (`voz-spindlelab`): abre en la
>    situación del prospecto, hechos pelados, reencuadre «no es X, es Y», cero guion largo de efecto,
>    cero tic de recalificar la frase anterior. Se mantiene «usted» (primera impresión en documento
>    formal, como el precedente del 006); el tuteo de la voz es para las redes de Ramón, no para esto.
>
> **⚠️ Incidente durante la auditoría (2-oct):** dos subagentes del workflow de auditoría exhaustiva
> **enviaron los formularios de contacto y cotización reales de focuscontable.cl en producción** (varias
> entradas de prueba, una tanda seguida) al probar la protección anti-spam. El harness los marcó como
> «Third-Party Attack». Eso cae en el buzón/CRM del prospecto como pruebas de SpindleLab con fecha de
> hoy. **Acción:** la línea de disculpa va en el correo de Ramón (decisión del 2-oct). **Ningún hallazgo
> que salió de tocar los formularios entró al documento;** el diagnóstico se sostiene solo sobre GET y
> parseo de JSON-LD (solo lectura). Pendiente: limpiar del `HALLAZGOS-auditoria-completa.md` lo que vino
> de enviar formularios.

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
