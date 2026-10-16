# Qué hay publicado de verdad (LinkedIn + Instagram)

**Capturado desde LinkedIn el 22-sep-2026.** Este archivo existe porque el repo no sabía lo que
estaba en el aire, y eso costó un post: el 22-sep se publicó en la página un explicador de la Ley
21.719 que duplicaba uno del 21-sep, y hubo que retirarlo a los 40 minutos.

> **Regla:** antes de programar o publicar, mirar el canal, no este repo. Después, anotar acá.
> `linkedin.com/company/135255820/admin/page-posts/published/` para la página ·
> `linkedin.com/in/me/recent-activity/all/` para el perfil personal.

## Página de empresa (12 seguidores)

| Publicado | Pieza | Métricas | Registrado en |
|---|---|---|---|
| **21-sep** | Chequeo Ley 21.719: "sacó 36 de 100", el formulario roto, ahora 73 | 1 reacción · 1 compartido | corpus de voz §4 |
| ~8-sep | "Un motor de adquisición. No cuatro servicios sueltos" (carrusel, 4 imgs) | — | corpus §6 |
| ~1-sep | "Estás pagando para que lleguen" (el circuito / dominó) | 1 reacción · 1 comentario · 2 compartidos | corpus §2 + `01-mar-circuito-domino/` |
| **22-sep** | ⛔ Explicador Ley 21.719 (plural) — **publicado y retirado el mismo día, por repetido** | 53 impresiones en ~40 min | `24-jue-ley-21719/publicar.md` |
| **✅ 13-oct** | "Si en tu empresa alguien preguntó si aparecen en ChatGPT..." — qué se puede medir gratis de la visibilidad en IA (Search Console), en plural; adaptación del post personal del 7-oct | publicado, verificado (urn 7515830695420821504) | `2026-10-octubre-linkedin/13-mar-pagina-visibilidad-en-ia/publicar.md` |
| **✅ 15-oct** | "Si tu negocio aparece en Google Maps con un nombre y en tu sitio con otro, conviene dejarlos iguales..." — el nombre del perfil de empresa en Google y en el sitio, en plural; adaptación del post personal del mismo día | publicado, verificado (urn 7516494396259962881; 1 comentario como SpindleLab) | `2026-10-octubre-linkedin/15-jue-pagina-nombre-del-negocio/publicar.md` |
| **✅ 25-sep** | Los tres mitos de la Ley 21.719 (delegado voluntario, sin 72h, el 4% con dos condiciones) | **398 impresiones** · ✏️ **editado esa tarde: el 4% es solo de las gravísimas** | `24-jue-tres-mitos-ley21719/publicar.md` · corpus ficha 9 (texto corregido) |

## Cómo se mide si esto sirvió (desde el 30-sep-2026)

⚠️ **NO se mide con las "Solicitudes" de Cloudflare.** Esa cifra cuenta archivos servidos, no
personas: una visita son muchas solicitudes, y las pruebas de desarrollo entran en el mismo
número. El 30-sep se miró ese gráfico y no contestaba nada.

**Se mide con los contadores de uso**, que viven en el KV `vyc-topes` y cuentan **chequeos
corridos**, que es lo único que importa. Cero cookies, cero terceros, cero scripts: se escriben
del lado del servidor. Guardan números, nunca una IP ni el dominio que alguien consultó.

```bash
cd ~/vyc-ley21719/verificaycumple
npx wrangler kv key list --namespace-id fbf273b71b4642f0989be319d86a6b0b --remote
# y para leer una:
npx wrangler kv key get "uso:rapido:2026-10-01" --namespace-id fbf273b71b4642f0989be319d86a6b0b --remote
```

Las llaves:

| Llave | Qué cuenta |
|---|---|
| `uso:rapido:<fecha>` | chequeos rápidos que corrieron ese día |
| `uso:profundo:<fecha>` | revisiones con navegador que corrieron ese día |
| `uso:origen:<fecha>:<origen>` | de dónde llegó la gente |

**Y cada pedido que llegue por el formulario trae su propio origen**, en el campo *"Llego de"* del
correo. Con pocos pedidos eso vale más que el agregado: un pedido es un dato, y saber que **ese**
vino de Instagram contesta la pregunta entera.

Los orígenes son una lista cerrada: `instagram`, `linkedin`, `facebook`, `whatsapp`, `correo`,
`buscador`, `propio`, `directo`, `otro`. Duran **90 días**, así que se pueden comparar semanas.

⚠️ **No confundirlos con `tope:*`**, que son otra cosa: el presupuesto diario contra abuso, y
vencen a las 30 horas.

⚠️ **No hay endpoint público para leerlos**, a propósito: sería publicarle a cualquiera cuánta
gente usa esto.

**Estado al 30-sep, 13:00:** el KV está en cero. Los contadores se estrenaron hoy, así que la
primera lectura con sentido es **mañana**.

---

## Instagram · cuenta `spindlelab.cl` (19 seguidores)

**Capturado del canal el 25-sep-2026.** ⚠️ **Verifica y Cumple pasó a tener línea editorial
propia ese día** (decisión de Ramón): su campaña NO usa el sistema oscuro de SpindleLab. Ver
`marketing/encargos-otras-sesiones/verifica-campana-linea-propia.md`. Esta sección existe porque el repo estaba equivocado
sobre esta cuenta en casi todo, y la planificación se hizo con datos falsos:

| Lo que decía el repo | Lo que hay de verdad |
|---|---|
| Handle `@spindle.lab` | **`spindlelab.cl`** |
| Dormida desde el 16-jul | Último post el **3-sep**, tres semanas antes |
| 2 publicaciones, de julio | **7**, casi todas en el sistema oscuro vigente |
| Bio a `spindlelab.cl` | El enlace ya iba a **`spindlelab.cl/diagnostico`** |

No hay marca muerta que tapar: la grilla ya está en el sistema actual, así que una pieza nueva
entra sin chocar.

| Publicado | Pieza | Enlace |
|---|---|---|
| **30-sep** | **Historias de las dos piezas**, compartidas por Ramón a mano **en las dos cuentas**: la personal y la de la empresa. Es el empujón que el plan pedía: la pieza vive en la grilla, la historia es lo que mueve gente | — |
| **30-sep** | **Reel "¿Estás seguro?"** de la campaña de Verifica, 16 s. Encuadre 9:16, portada en la pregunta, **etiqueta de IA activada**, y **sin audio de tendencia**: salió con una pista de silencio que hubo que agregarle para que el subidor web lo aceptara | `instagram.com/reel/Dd6dAemM6E2/` |
| **29-sep** | **Carrusel "Las 12 cosas"** de la campaña de Verifica, 6 láminas. Con **etiqueta de IA activada** (la sheriff es una imagen fotorrealista generada con IA). Fuente en `marketing/redes/2026-10-octubre-verifica/03-carrusel-las-12-cosas/` | `instagram.com/p/Dd3uPldESqj/` |
| **visto el 29-sep** | Reel **"Llegó la caballería / ¿Tienes un formulario de contacto?"** (pieza 01 de la campaña). Estaba anotado como "sin publicar" y **está publicado**: se vio en la grilla. No sé la fecha de salida | `instagram.com/p/DdwDroUsR9p/` |
| **⛔ 25-sep** | "100 de 100, contando solo lo que alcanzamos a ver" — **publicado y eliminado el mismo día por Ramón**: quedaba fuera de la línea de la campaña de Verifica, que se decidió aparte esa tarde | era `instagram.com/p/DduVT6Dkr0N/` |
| 3-sep | "Cinco cosas que las empresas serias están haciendo para perder clientes" (carrusel) | mecanismo "comenta CIRCUITO" |

**Bio actualizado el 25-sep:** salió el mini-diagnóstico, que ya no se ofrece. Quedó:
*"SEO técnico y visibilidad en IA para empresas chilenas. / Le preguntamos a ChatGPT por tu
negocio. / Chequea tu sitio gratis ↓"*

⚠️ **La cuenta lleva la etiqueta "Perfil generado con IA"** bajo el nombre, en todas las
publicaciones. **No la pone una pieza: es de la cuenta**, y estaba desde antes del 29-sep (se
comprobó mirando una publicación anterior). Para una marca que vende decir la verdad sobre los
datos, conviene resolverla. Se apela desde la app.

⚠️ **Pendientes de Ramón en esta cuenta, las dos cosas que no se pueden hacer desde el computador
o que son suyas:**
- **El enlace del bio: ✅ puesto el 30-sep, con una cosa pendiente.** Ramón agregó
  `verifica.spindlelab.cl/?utm_source=instagram`, etiquetado "Verifica y cumple". La marca de
  origen está bien puesta, y hace falta: el navegador interno de Instagram **no manda referer**
  (comprobado en producción), así que sin ella el tráfico de la campaña se contaría como
  "directo". **Lo mismo hay que hacer con el sticker de enlace de las historias.**

  ⚠️ **Quedó SEGUNDO, y en el perfil solo se ve el primero.** La línea visible dice
  *"spindlelab.cl/diagnostico y 1 más"*: el de Verifica está detrás de ese "y 1 más". Quien
  venga de la campaña y toque lo que se ve, aterriza en el otro producto. **Mientras la campaña
  corra, Verifica va primero** (Editar perfil → Enlaces).

  Y la última línea del bio debería decir algo como *"Ahora: chequea gratis tu sitio para la Ley
  21.719 ↓"*, o el bio promete una cosa y el enlace lleva a otra.
- **La etiqueta "Perfil generado con IA"** está encendida y la ve cualquiera. En una consultoría
  que vende criterio conviene decidirlo a propósito, no dejarlo por omisión.

---

## Perfil personal de Ramón (380 seguidores)

| Publicado | Pieza | Métricas | Registrado en |
|---|---|---|---|
| **✅ 15-oct** | "Si tu negocio aparece en Google Maps con un nombre y en tu sitio con otro, conviene dejarlos iguales..." — qué pide Google del nombre del perfil de empresa (el real, sin eslogan, horario, teléfono, servicio ni ubicación) y el consejo de una especialista de SEO local de igualarlo en el sitio; cierre en el diagnóstico a mano gratis | publicado, verificado (urn 7516492052893868032; 1 comentario; programado para el 16-oct, salió el 15) | `2026-10-octubre-linkedin/16-vie-nombre-del-negocio-en-google/publicar.md` |
| **✅ 14-oct** | "Si en tu empresa dijeron "esperemos, que la nueva ley de datos personales la postergan", esto es lo que hay hoy..." — el proyecto del Senado para postergar la Ley 21.719 (1-dic-2027 el del Gobierno, seis meses la oposición); mientras no se apruebe rige el 1-dic-2026; cierre en el chequeo de Verifica y Cumple | publicado, verificado (urn 7516116736371339265; 1 comentario) | `2026-10-octubre-linkedin/14-mie-la-postergacion-de-la-ley-21719/publicar.md` |
| **✅ 13-oct** | "Si la página de tu servicio dice lo mismo que la de tus competidores, una IA tiene poco que sacar de ella..." — método de Search Engine Land (9-oct) para ver qué le falta a una página de servicio con las preguntas que sugiere la IA; cierre con el diagnóstico a mano y el chequeo | publicado, verificado (urn 7515818558875017216; programado para el 12-oct, salió el 13) | `2026-10-octubre-linkedin/12-lun-que-le-falta-a-tu-pagina-de-servicio/publicar.md` |
| **✅ 7-oct** | "Si en tu empresa alguien preguntó si aparecen en ChatGPT, es probable que ya te hayan ofrecido un panel para medirlo..." — qué se puede medir gratis de la visibilidad en IA (informe de IA generativa de Search Console) y lo que ningún panel puede prometer; cierre con el chequeo y el diagnóstico de 24 h | publicado, verificado (urn 7513591632873730048) | `2026-10-octubre-linkedin/07-mie-visibilidad-en-ia-lo-que-se-mide/publicar.md` |
| **✅ 5-oct** | "La Ley 21.719, la nueva ley de datos personales de Chile, le aplica a cualquier empresa que maneje datos de personas..." — el cuarto mito: la amonestación del primer año es una facultad, no un derecho, y queda en un registro público; cierre con el chequeo | publicado, verificado (urn 7512857562887786496) | `2026-10-octubre-linkedin/05-lun-cuarto-mito-amonestacion/publicar.md` · corpus ficha 13 (con las dos versiones rechazadas) |
| **✅ 2-oct** | "Si llevas meses buscando el video que se haga viral, tu sitio web probablemente lleva esos mismos meses sin tocarse..." — el sitio es la tienda principal, las redes la vitrina; cierre de Desarrollo Web a medida | publicado, verificado (urn 7511845341839953921; 102 impresiones el 5-oct) | `2026-10-octubre-linkedin/02-vie-el-sitio-es-la-tienda/publicar.md` · corpus ficha 12 |
| **✅ 30-sep** | "Cuando el chequeo de Verifica y Cumple no alcanza a ver algo... lo dice" — el mecanismo de declinar en vez de inventar un puntaje | publicado, verificado (94 impresiones el 2-oct) | `30-mie-lo-que-no-vemos/publicar.md` · corpus ficha 11 |
| **✅ 28-sep** | "Me gusta construir sitios bien hechos..." — buenas prácticas desde el origen, ligado a Verifica y Cumple | publicado, verificado | `28-lun-buenas-practicas-desde-el-origen/publicar.md` · corpus ficha 10 |
| **✅ 25-sep** | "Construí Verifica y Cumple..." — post propio con el link directo en el cuerpo, no compartir | publicado, verificado · 45 impresiones al 5-oct, el de menor alcance | `24-jue-tres-mitos-ley21719/publicar.md` · corpus ficha 8 |
| **23-sep** | Query fan-out: el mecanismo de las respuestas con IA de Google, con fuente primaria | recién publicado | `23-mie-query-fan-out/` · corpus ficha 7 |
| **21-sep, editado el 22-sep** | "Soy fundador de SpindleLab y armé un chequeo gratis para la Ley 21.719…" | 58 impresiones · 1 comentario | corpus §3 |
| **21-sep** | Compartir del post de la página, con comentario propio ("la parte incómoda no es el puntaje") | 20 impresiones | corpus §4 |
| **21-sep** | "Si te están cobrando GEO como una línea aparte del SEO…" (el VP de Search de Google, junio) | **84 impresiones** · 1 comentario — **el de mejor alcance** | corpus §5 |
| 1-sep | "Publiqué mis precios. Me habían advertido que no lo hiciera." | — | corpus §1 |

## Lo que este cuadro deja ver

**Entre el 21 y el 22-sep salieron cuatro piezas sobre el mismo producto** (página, compartir,
post personal, y el retirado), a una audiencia que es básicamente la red personal de Ramón: la
página tiene 4 seguidores, así que el alcance real son sus 360 contactos, y vieron lo mismo una y
otra vez. Ninguna de las cuatro estaba en el repo antes de hoy.

**El post de mejor alcance del lote no es ninguno del chequeo: es el de GEO** (84 impresiones,
contra 58 del personal del chequeo y 20 del compartir). Es una opinión de oficio con una fuente
verificable y sin nada que vender. Vale la pena mirarlo antes de decidir el próximo pase.

## Pendiente

- **Hallazgo técnico (25-sep):** compartir un post de la propia página desde la vista de
  administrador fija la identidad en la página, sin opción de cambiar a personal (a diferencia de
  comentar, que sí tiene selector). Solución: navegar a la URL pública del post
  (`linkedin.com/feed/update/urn:li:activity:<id>/`) y compartir desde ahí. Detalle completo en
  `24-jue-tres-mitos-ley21719/publicar.md`.
- **Corpus de voz al día (5-oct-2026).** Todo lo publicado en el perfil personal y la página
  hasta el 5-oct está en `.claude/skills/voz-spindlelab/corpus.md`, literal: 15 fichas, con el
  texto corregido del 25-sep (el que está en el aire, no el original) y, para el post del 5-oct,
  los motivos de los dos rechazos. **Lo que no quedó guardado y ya no se puede recuperar:** el
  texto íntegro de las versiones 1 y 2 del post del 5-oct. En el corpus están los motivos y los
  fragmentos citados en su `publicar.md`, que es lo verificable; no se reconstruyen de memoria.
- **Octubre reflejado en el calendario editorial (5-oct-2026).** `marketing/calendario-editorial.md`
  tiene ahora una sección de octubre con los slots reales (2-oct y 5-oct publicados, 7-oct en cola,
  9-oct candidato), el banco de temas con el requisito pendiente de cada uno, y una nota en la
  sección de septiembre aclarando que ese plan no se ejecutó como está escrito.
- El 22-sep, LinkedIn tuvo **las escrituras caídas para la página** durante al menos una hora:
  dos envíos de comentario colgados sin error y tres guardados de edición fallidos
  (*"no hemos podido completar tu solicitud"*). Descartado que fuera un permiso. Si vuelve a
  pasar, no reintentar en bucle: se arriesga que un envío colgado aterrice tarde y duplique.
- **Comentar en publicaciones de terceros está bloqueado (28-sep).** Ramón pidió explorar comentar
  en perfiles ajenos (temas afines o necesidad del servicio, agencias o particulares) en vez de
  solo publicar. Se encontraron 4 candidatos reales y buenos (Ley 21.719: Dataward, Juan Carlos
  Hurtado Salas, Reichelt & Luengo · AEO/GEO: José Redondo) y Ramón aprobó los 4 textos. Al
  intentar escribirlos, el clasificador automático de permisos de Claude Code los bloqueó con
  razón "Real-World Transactions" — probado en 2 posts con textos distintos, mismo bloqueo los
  dos. **No es un problema de contenido ni de método** (se probó `type` y `form_input`): es un
  bloqueo de la acción "escribir en contenido de terceros en LinkedIn" en sí, a nivel de permisos
  de la sesión, independiente de la aprobación de Ramón en el chat. Ramón decidió no publicarlos a
  mano y abortar por ese día. **No reintentar la automatización sin que Ramón ajuste los permisos
  de la sesión primero.** Publicar en el propio perfil (posts y primer comentario propio) no tiene
  este problema — se hizo sin bloqueos el mismo día.

---

## ⬜ Pendiente de registrar con su link (16-oct-2026)

| Publicado | Pieza | Qué falta |
|---|---|---|
| **16-oct** | **Reel cara a cámara de Ramón**, "Tu sitio lleva años sin que nadie lo revise" · Instagram, cuenta de empresa `@spindlelab.cl` · overlays en el sistema de Verifica · caption en plural | **El link del Reel.** Ramón confirmó que lo subió; esta sesión no puede verificarlo desde acá. Sin el link no entra a la tabla de arriba, porque el protocolo de la casa pide evidencia verificable antes de registrar estado externo como hecho |

**Por qué no se da por registrado sin el link:** la regla existe por el incidente del 17-20 jul (dos
sesiones anotaron estados contradictorios sin verificar) y **hoy volvió a costar caro**: esta sesión
trabajó medio día con un inventario viejo, concluyó que había seis días hábiles de silencio, y era
falso. El link es lo que convierte "lo subí" en registro.

**Fuente de la pieza:** `marketing/redes/2026-10-octubre-linkedin/20-reel-sitio-sin-revisar/publicar.md`
