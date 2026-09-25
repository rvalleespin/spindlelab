# Publicar — Los tres mitos de la Ley 21.719

**Cuándo:** publicado el VIERNES 25-sep-2026 (agendado para el jue 24, salió un día después
porque el pedido de publicar llegó el 25 y no hubo instrucción de mover la fecha).
**Canales:** página de LinkedIn de SpindleLab (cuerpo, plural) **+** perfil personal de Ramón,
que **comparte** el post de la página con su comentario en registro singular.
**Pieza visual:** ninguna. Texto puro.
**Escribe:** la sesión que construyó `verifica.spindlelab.cl` (23-sep) · **Programó la fecha:**
esta sesión, a pedido de Ramón ("esto es para mañana", 23-sep) · **Publicó:** esta sesión, a
pedido explícito de Ramón el 25-sep ("publica el post").

## ✅ ESTADO: PUBLICADO Y VERIFICADO (25-sep-2026)

| Pieza | URL / evidencia |
|---|---|
| Post en la página | `linkedin.com/feed/update/urn:li:activity:7509227560686227457/` |
| Primer comentario (como SpindleLab) | Confirmado: "1 comentario", autor SpindleLab, link vivo |
| ⛔ Compartir personal + comentario (v1) | **Eliminado a pedido de Ramón**: no le gustó el compartir del post de la página. Pidió en cambio un post propio, con el link de Verifica y Cumple directo en el cuerpo (no en comentario) y mencionando SpindleLab. |
| ✅ Post personal nuevo (v2) | Publicado por separado, ver abajo |

### Corrección pedida por Ramón (25-sep, mismo día): el compartir no funcionó para él

Rechazó el compartir del post de la página con dos pedidos concretos:
1. **No repetir "soy fundador de SpindleLab"** — ya lo dijo varias veces en el corpus, no aporta.
2. **El link va en el cuerpo del post, no en un comentario**, para que sea más visible a quien lo
   sigue, y que mencione SpindleLab.

Se eliminó el compartir (LinkedIn: menú "..." → Eliminar publicación → confirmado "Publicación
eliminada") y se publicó un **post nuevo e independiente** en su perfil, sin tocar el post de la
página:

> Construí Verifica y Cumple: un chequeo gratis para la Ley 21.719, la ley de datos personales.
>
> Antes de publicarlo leí la ley completa, artículo por artículo, en el texto del Diario Oficial.
> Encontré tres cosas que se están cobrando como obligaciones y que la ley no dice: que necesitas
> un delegado de protección de datos (el artículo 50 dice que es voluntario), que tienes 72 horas
> para avisar una filtración (ese número no está en ningún artículo, es del reglamento europeo), y
> que una pyme arriesga el 4% de sus ingresos (solo si reincide, y una primera infracción no
> cumple esa condición).
>
> El chequeo revisa qué tiene publicado tu sitio para esta ley y qué le falta. Sin registro, sin
> dejarme tu correo.
>
> https://verifica.spindlelab.cl

**Nota de tono dada y aceptada:** un link en el cuerpo suele bajar el alcance orgánico de LinkedIn
frente a dejarlo en el primer comentario. Se avisó una vez; Ramón lo pidió igual, así que se hizo.

**Detalle técnico:** LinkedIn no arma la tarjeta de previsualización de un dominio sin protocolo
(`verifica.spindlelab.cl` a secas queda en texto plano, no clickeable). Hay que escribir
`https://verifica.spindlelab.cl` y esperar unos segundos a que cargue el card antes de publicar.

### Cómo se hizo la primera versión (para la próxima vez que algo similar se automatice)

- **Antes de publicar se verificó el canal**, no el repo: ni la página ni el perfil tenían nada
  nuevo desde el 21-sep. Publicar era seguro.
- **Tropiezos durante la ejecución, ninguno con daño permanente:**
  1. Un clic cayó sobre "Recomendar" del post del 21-sep en vez del cuadro de texto → dio like
     por error → se deshizo al toque, verificado que volvió a su reacción original (1).
  2. El primer intento del comentario del chequeo se escribió bajo el post viejo del 21-sep en
     vez del nuevo, por un reflow de la página → se detectó antes de enviar (nunca se apretó
     "Comentar"), y se descartó recargando en una pestaña nueva en vez de forcejear con el
     editor.
  3. **Hallazgo que vale la pena anotar:** al compartir un post de la propia página desde la
     vista de administrador, LinkedIn ofrece el diálogo "Compartir con tus ideas" pero **fija la
     identidad en la página (SpindleLab), sin selector para cambiar a la personal** — a
     diferencia de comentar, donde sí hay selector de identidad. La solución fue navegar a la
     URL pública del post (`linkedin.com/feed/update/urn:li:activity:<id>/`, obtenida vía
     "Copiar enlace a la publicación" → como el portapapeles no se pudo leer, se sacó el URN
     directo del DOM con `data-urn`) y compartir desde ahí: en esa vista sí aparece "Ramón
     Vallejos · Publicar para todo el mundo" por defecto.
- **Verificación final:** los tres elementos (post, comentario, compartir) se confirmaron leyendo
  el estado real después de publicar, no asumiendo que el clic había funcionado.
**Origen completo, con toda la trazabilidad legal y el porqué de cada decisión de redacción:**
`marketing/lanzamiento-vyc-23sep/post-linkedin-tres-mitos.md`. Este archivo es la copia lista
para pegar, en el lugar donde la rutina del Copiloto la busca cada mañana (paso 4c).

## ⚠️ Cadencia — leer antes de publicar

El perfil personal ya llevaba **tres toques en esta semana** antes de este: GEO (21-sep), el
post de la Ley 21.719 (21-sep, editado 22-sep) y el de query fan-out (23-sep). Este sería el
cuarto. Se lo señalé a Ramón el 23-sep citando la propia estrategia de VyC (*"un post por
semana en el perfil personal, uno bueno, no tres tibios"*); su decisión fue moverlo un día, a
mañana, en vez de a la semana siguiente. **Queda su call, ya tomada — no volver a plantearlo.**

## Cuerpo del post — página de LinkedIn (copiar y pegar)

Leímos la Ley 21.719 completa, en el texto del Diario Oficial del 13 de diciembre de 2024.

Hay tres cosas que se están vendiendo como obligaciones de esa ley y que la ley no dice.

La primera es que tienes que nombrar un delegado de protección de datos. El artículo 50 dice que el responsable de datos podrá designar uno, y el artículo 49 dice que el programa de cumplimiento donde ese cargo aparece se adopta voluntariamente. Obligatorio es el artículo 48, que te pide tomar acciones para prevenir infracciones. Nombrar a alguien es una manera de hacerlo, no el requisito.

La segunda es que tienes 72 horas para avisar una filtración de datos. Ese plazo es del reglamento europeo. En el texto de la ley chilena el número no aparece. El artículo 14 sexies pide reportar a la Agencia por los medios más expeditos posibles y sin dilaciones indebidas, que es un estándar de conducta y no un reloj. Te obliga a moverte apenas te enteras, y tampoco te da tres días de colchón.

La tercera es que una pyme arriesga el 4% de sus ingresos. Ese 4% está en el artículo 35 con dos condiciones que van juntas. Se aplica a empresas que no son de menor tamaño según la ley 20.416, y solo cuando reinciden en una infracción grave o gravísima. Reincidir, dice el artículo 36, es haber sido sancionado dos o más veces en treinta meses. Una pyme en su primera infracción no cumple ninguna de las dos.

Las tres existen en el reglamento europeo. La ley chilena se le parece en varias cosas, y el atajo fue suponer que se le parecía en todas.

Si te llega una propuesta de cumplimiento, sirve preguntar de qué artículo sale cada obligación que te están cobrando. El número se puede ir a mirar.

Dejamos en el primer comentario el chequeo gratis, para la parte que sí se ve en tu sitio.

## Primer comentario (copiar y pegar, AL TIRO)

Acá está: https://verifica.spindlelab.cl

Se llama Verifica y Cumple. Escribes tu dominio y te muestra qué señales de la ley están publicadas en tu sitio y cuáles faltan. Gratis, sin registro, y no guarda el dominio que revisas. Lo que no alcanza a ver lo dice, en vez de darlo por bueno.

Y el texto completo de la ley está acá, por si quieres ir a los artículos: https://www.diariooficial.interior.gob.cl/publicaciones/2024/12/13/44023/01/2583630.pdf

## Al compartir desde el perfil personal (registro singular, copiar y pegar)

Las 72 horas las tenía yo también en mis notas, copiadas de un resumen de terceros. Las di por buenas sin ir al texto.

Se me cayeron cuando fui a buscar el artículo para citarlo y no estaba.

Por eso el post lleva el número de cada artículo, para que no tengas que creerme.

## Variante sin primer comentario (por si LinkedIn falla al publicarlo)

El 22-sep las escrituras de la página fallaron y el post quedó 40 minutos prometiendo un link
que no existía. Si vuelve a pasar, va esta versión: idéntica hasta "El número se puede ir a
mirar.", y después:

> Para la parte que sí se ve en tu sitio hicimos un chequeo gratis, sin registro: https://verifica.spindlelab.cl
>
> El texto completo de la ley está en el Diario Oficial del 13 de diciembre de 2024, por si quieres ir a los artículos.

---

## Verificación hecha antes de agendar (23-sep, esta sesión)

- **`verifica.spindlelab.cl` está en vivo** (HTTP 200) y sostiene lo que el post promete: no pide
  correo, no guarda el dominio, dice qué no alcanza a ver en vez de asumirlo. Precios coinciden
  con el post ($149.000 kit, $39.000 suscripción trimestral).
- **El 36 → 73 no se cita en este post** — correcto: ese número se retiró del sitio el 22-sep
  porque cambió la forma de puntuar, y el post nuevo no depende de él.
- **La verificación legal (citas a los artículos 50, 49, 48, 14 sexies, 35, 36) es de la sesión
  que escribió el post**, contra el texto oficial del Diario Oficial (PDF descargado, CVE
  2583630). No la reproduje de cero; el detalle completo con cada cita textual está en el
  archivo de origen.
- **No nombra competidores, no usa la multa como gancho, no menciona la fecha de vigencia.** Los
  tres son guardarraíles explícitos de `estrategia-linkedin-verifica-y-cumple.md`.

## Checklist antes de publicar mañana

- [ ] Cuerpo en la página de SpindleLab
- [ ] Primer comentario AL TIRO (o la variante sin link, si las escrituras de LinkedIn fallan)
- [ ] Compartir desde el perfil personal con el comentario de arriba
- [ ] Confirmar en `linkedin.com/company/135255820/admin/page-posts/published/` que no hay ya
      algo publicado hoy sobre VyC antes de tocar nada (regla del 22-sep)
