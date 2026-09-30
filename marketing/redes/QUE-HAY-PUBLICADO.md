# Qué hay publicado de verdad (LinkedIn + Instagram)

**Capturado desde LinkedIn el 22-sep-2026.** Este archivo existe porque el repo no sabía lo que
estaba en el aire, y eso costó un post: el 22-sep se publicó en la página un explicador de la Ley
21.719 que duplicaba uno del 21-sep, y hubo que retirarlo a los 40 minutos.

> **Regla:** antes de programar o publicar, mirar el canal, no este repo. Después, anotar acá.
> `linkedin.com/company/135255820/admin/page-posts/published/` para la página ·
> `linkedin.com/in/me/recent-activity/all/` para el perfil personal.

## Página de empresa (4 seguidores)

| Publicado | Pieza | Métricas | Registrado en |
|---|---|---|---|
| **21-sep** | Chequeo Ley 21.719: "sacó 36 de 100", el formulario roto, ahora 73 | 1 reacción · 1 compartido | corpus de voz §4 |
| ~8-sep | "Un motor de adquisición. No cuatro servicios sueltos" (carrusel, 4 imgs) | — | corpus §6 |
| ~1-sep | "Estás pagando para que lleguen" (el circuito / dominó) | 1 reacción · 1 comentario · 2 compartidos | corpus §2 + `01-mar-circuito-domino/` |
| **22-sep** | ⛔ Explicador Ley 21.719 (plural) — **publicado y retirado el mismo día, por repetido** | 53 impresiones en ~40 min | `24-jue-ley-21719/publicar.md` |
| **✅ 25-sep** | Los tres mitos de la Ley 21.719 (delegado voluntario, sin 72h, el 4% con dos condiciones) | **398 impresiones** · ✏️ **editado esa tarde: el 4% es solo de las gravísimas** | `24-jue-tres-mitos-ley21719/publicar.md` |

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
- **El enlace del bio, y ahora está costando.** Instagram solo deja editarlo **desde la app del
  teléfono**. Hoy va a `spindlelab.cl/diagnostico`, que es otro producto: quien vea una pieza de
  la campaña, entre al perfil y toque el único enlace clicable **aterriza en otra parte**.

  ⚠️ **Va con la marca de origen pegada, no pelado:**

  ```
  https://verifica.spindlelab.cl/?utm_source=instagram
  ```

  Sin ese `?utm_source=instagram`, casi todo el tráfico de la campaña se cuenta como "directo":
  el navegador interno de Instagram **no manda referer**. Comprobado el 30-sep en producción.
  Lo mismo para el sticker de enlace de las historias.

  Y la última línea del bio debería decir algo como *"Ahora: chequea gratis tu sitio para la Ley
  21.719 ↓"*, o el bio promete una cosa y el enlace lleva a otra.
- **La etiqueta "Perfil generado con IA"** está encendida y la ve cualquiera. En una consultoría
  que vende criterio conviene decidirlo a propósito, no dejarlo por omisión.

---

## Perfil personal de Ramón (360 seguidores)

| Publicado | Pieza | Métricas | Registrado en |
|---|---|---|---|
| **✅ 25-sep** | "Construí Verifica y Cumple..." — post propio con el link directo en el cuerpo, no compartir | publicado, verificado | `24-jue-tres-mitos-ley21719/publicar.md` |
| **23-sep** | Query fan-out: el mecanismo de las respuestas con IA de Google, con fuente primaria | recién publicado | `23-mie-query-fan-out/` |
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
- **Ya no falta capturar nada**: los cuatro textos vivos están en el corpus (§1 a §6), literales.
- El 22-sep, LinkedIn tuvo **las escrituras caídas para la página** durante al menos una hora:
  dos envíos de comentario colgados sin error y tres guardados de edición fallidos
  (*"no hemos podido completar tu solicitud"*). Descartado que fuera un permiso. Si vuelve a
  pasar, no reintentar en bucle: se arriesga que un envío colgado aterrice tarde y duplique.
