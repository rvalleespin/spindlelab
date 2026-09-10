# Encargos abiertos del laboratorio

La cola viva. **La troncal la mantiene; las sesiones de parte la ejecutan.** Cada encargo es
acotado, dice quién lo puede hacer y con qué se verifica que quedó cerrado.

Al cerrar uno: marcarlo acá **y** escribir la fila en el registro del brief que corresponda.

**Última revisión de la troncal: 10-sep-2026.**

## Orden recomendado

E8 está resuelto — ya no bloquea nada. E2 abarata todo lo que venga después y es lo único que
falta para que E9/E10 se vean en vivo. E9 y E10 tienen el código listo, ventana de 82 días.

| # | Encargo | Para quién | Estado |
|---|---|---|---|
| E2 | Reconectar `verificaycumple` en el dashboard de Cloudflare | Ramón | **abierto — es lo único que falta para que E9/E10 se vean en vivo** |
| E9 | Construir la sección del kit de precio fijo | parte del laboratorio | **cerrado 10-sep** — código en `laboratorio/ley-21719`, falta desplegar (ver E2) |
| E10 | Aplicar el título nuevo del hero | parte del laboratorio | **cerrado 10-sep** — código en `laboratorio/ley-21719`, falta desplegar (ver E2) |
| E3 | Desbloquear el post de Cata | parte de marketing | **abierto — pegado desde el 8-sep** |
| E1 | Devolver `laboratorio/ley-21719` sin apagar el sitio | parte del laboratorio | **abierto — depende de E2** |
| E4 | Poner a `spindlelab.cl` en regla con la Ley 21.719 | parte de la agencia | **abierto** |
| E5 | Darle su política de privacidad a `verificaycumple` | parte del laboratorio | **abierto** |
| E12 | Declarar el costo de atención semanal del proyecto 01 | Ramón | **abierto — incumple el filtro 3** |
| E6 | Decidir el Figma de referencia (Community) | Ramón | **abierto** (el otro Figma ya se resolvió) |
| E7 | Alinear el encabezado del brief con su registro | — | **cerrado 9-sep** por la sesión de parte |
| E11 | Corregir una afirmación de la ficha de venta | parte de marketing/ventas | **cerrado 10-sep** por la sesión de parte |
| E8 | Resolver dónde se trabaja (el clon que no existe) | Ramón | **cerrado 10-sep** — Ramón confirmó: se trabaja en la copia de iCloud; `CLAUDE.md` corregido |

---

## E8 — Resolver dónde se trabaja · *Ramón* · **cerrado 10-sep**
`CLAUDE.md:37` dice que el clon bueno es `~/Projects/spindlelab` y que la copia de iCloud está
corrupta y no debe usarse. **Verificado el 10-sep: `~/Projects/spindlelab` no existe en la
máquina**, y la copia de iCloud pasa `git fsck --connectivity-only` limpia (solo objetos
colgantes normales, exit 0, sin objetos faltantes ni enlaces roto). El único árbol de trabajo
adicional (`~/spindlelab-oficina-wt`) es un worktree *de la copia de iCloud*, no un clon
aparte.

Las tres filas del registro del 9-sep encargan trabajo "desde una sesión en el clon bueno".
Quien lo tome hoy no encuentra el directorio. **Hay que elegir una de dos y anotarla en
`CLAUDE.md`:** clonar de nuevo en `~/Projects/spindlelab` y trabajar ahí, o retirar la
advertencia si ya no aplica. Mientras no se resuelva, cada encargo que dependa de un clon
local queda en el aire.
**Cierre:** el directorio existe y `git -C ~/Projects/spindlelab status` responde, o `CLAUDE.md`
ya no manda a un lugar inexistente.

**Resuelto el 10-sep:** Ramón eligió la segunda opción — se trabaja en la copia de iCloud, no
se crea el clon nuevo. `CLAUDE.md:37` corregido para no mandar más a un directorio que no
existe (queda registrado que la advertencia de "corrupta" ya no aplicaba).

## E2 — Reconectar `verificaycumple` en el dashboard de Cloudflare · *Ramón*
El proyecto se creó por API y quedó sin webhook de auto-deploy. Cada cambio exige un token
nuevo de Ramón más un disparo manual: ya consumió tres tokens en un día. **Este pendiente
encarece todos los demás** — E9 y E10 tocan el sitio y hoy no pueden desplegarse solos.
Al conectarlo, fijar y anotar en el brief cuál es la rama de producción (ver E1).
**Cierre:** un push a la rama de producción dispara deploy sin token.

## E9 — Construir la sección del kit de precio fijo · *parte del laboratorio* · **cerrado 10-sep**
Decidido por Ramón el 9-sep: **$149.000 + IVA, una vez**, con el formato "Desde $X + IVA" que
usan las páginas de `servicios/` y la nota de que el valor final se ajusta según lo que el
chequeo muestre (mismo espíritu de la garantía honesta: no se promete resultado, se promete
transparencia). **Incluye:** instalación y configuración de gestor de consentimiento, ajustes
técnicos según lo que detecte el chequeo, y una plantilla de política de privacidad para que la
revise un abogado. **No incluye asesoría legal** — guardrail de §5 del brief.
**Construido el 10-sep** (sesión de parte, worktree aislado sobre `laboratorio/ley-21719`):
tarjeta de precio en `section.ayuda`, mismos tokens de color del sitio (funciona en modo claro
y oscuro, verificado con Chrome headless antes de subir), CTA cambiado a "Quiero el kit".
Commit `c718c74`, pusheado a `origin/laboratorio/ley-21719`. **No está en vivo todavía** — el
proyecto de Cloudflare sigue sin auto-deploy (E2), necesita un token o la reconexión por
dashboard para que el commit se sirva.
**Cierre real:** la sección responde en `verificaycumple.pages.dev` (pendiente de E2).

## E10 — Aplicar el título nuevo del hero · *parte del laboratorio* · **cerrado 10-sep**
Elegido por Ramón el 9-sep entre cuatro variantes: **"¿Estás seguro?"** con la bajada *"En 40
segundos sabes si tu sitio publica lo básico que exige la Ley 21.719 de protección de datos
personales. Sin registrarte, sin que guardemos tu dominio."* Reemplaza el
`<h1>¿Tu sitio tiene las señales que exige la Ley 21.719?` que Ramón calificó de "muy fome".
**Aplicado el 10-sep** en el mismo commit que E9 (`c718c74`, `laboratorio/ley-21719`),
verificado con Chrome headless antes de subir. **No está en vivo todavía** — mismo bloqueo
de despliegue que E9 (ver E2).
**Cierre real:** el H1 nuevo responde en `curl` sobre el sitio en vivo (pendiente de E2).

## E3 — Desbloquear el post de Cata · *parte de marketing, toca `main`* · **pegado desde el 8-sep**
`marketing/encargos-otras-sesiones/verificaycumple-post-personal-cata.md` tiene un solo commit
(`ef5b670`, 3-sep) y sigue diciendo *"el sitio todavía no está desplegado… manda a un link
roto"*. El sitio está vivo desde el 8-sep (verificado hoy, 200). **Esa condición caducada es la
razón de que el post lleve una semana pegado, no un pase de tono.** Quitar el bloqueo 1, fijar
`verificaycumple.pages.dev` como URL del primer comentario y borrar el condicional del `.cl`
(la compra está descartada). El borrador y el hallazgo de las "72 horas" no se tocan.
Ojo: ahora hay **dos** borradores de post sobre esto — el de Cata y el de
`ventas/casos-de-exito/verifica-y-cumple.md`. Elegir uno, no publicar los dos.
**Cierre:** el encargo ya no declara un bloqueo falso, y queda solo esperando pase de tono.

## E11 — Corregir una afirmación de la ficha de venta · *parte de marketing/ventas* · **cerrado 10-sep**
`ventas/casos-de-exito/verifica-y-cumple.md`, sección "Cómo usarlo en la llamada", punto 3,
afirma: *"La primera infracción de una empresa pequeña es amonestación escrita, no la multa de
20.000 UTM."* Dicho así es falso, y es exactamente lo que corrige el brief §2 punto 5: es el
**Art. sexto transitorio**, la Agencia **"podrá"** —no "deberá"— aplicar amonestación, y solo
durante los **primeros 12 meses** desde la entrada en vigencia. Es discrecional y con fecha de
vencimiento. Decirlo como regla en una llamada de venta es el mismo tipo de error que el
proyecto entero existe para no cometer.
**Cierre:** la frase queda como "durante el primer año la Agencia puede aplicar amonestación en
vez de multa, a su criterio" o equivalente.

## E1 — Devolver `laboratorio/ley-21719` sin apagar el sitio · *parte del laboratorio* · **depende de E2**
La rama tiene el producto y una copia del brief congelada el 3-sep; `laboratorio/ideas` tiene el
registro completo y nada del producto. Está 42 commits detrás de `ideas` y 24 de `main`.
Fusionar `ley-21719` → `ideas` para que código y registro queden juntos, y traer `main` a
`ley-21719`. **Condición dura: no borrar la rama** mientras Cloudflare construya producción
desde ella. Con E2 resuelto se decide con qué rama se queda producción y recién entonces se
puede retirar la otra.
**Cierre:** `curl` al sitio sigue en 200 y `git merge-base --is-ancestor` da verdadero en las
dos direcciones.

## E4 — Poner a `spindlelab.cl` en regla con la Ley 21.719 · *parte de la agencia*
No es del laboratorio, pero lo encontró el laboratorio. Verificado el 9 y el 10-sep:
`spindlelab.cl` da **36/100** en el chequeo que ahora enlaza desde `/diagnostico/` — sin
política de privacidad (404 en `/privacidad/`, `/politica-de-privacidad/`, `/legal/`,
`/cookies/`), sin gestor de consentimiento, con GA4 + GTM + Meta Pixel, y `/contacto/`
enviando nombre, correo y sitio a `api.web3forms.com` sin checkbox de consentimiento (el único
`type="checkbox"` es un honeypot). Encargado del tratamiento y transferencia internacional
(Art. 27-28) sin política publicada (Art. 14 ter) ni acto afirmativo previo (Art. 12). Misma
fecha límite: 1-dic-2026. El texto legal es de abogado; acá se hace la capa técnica.
**Cierre:** el chequeo sube de 36/100 y `/contacto/` pide consentimiento.

## E5 — Darle su política de privacidad a `verificaycumple` · *parte del laboratorio*
El sitio da **36/100 en su propio chequeo** (verificado 10-sep). Trata muchos menos datos que
`spindlelab.cl` —no pide correo ni registro— así que el riesgo legal es menor, pero es lo
primero que va a probar cualquier visitante técnico, y hoy el sitio que pide publicar la
política del Art. 14 ter no tiene la suya. Texto de abogado, publicación de acá.
**Cierre:** `/api/chequeo?dominio=verificaycumple.pages.dev` sube de 36/100.

## E12 — Declarar el costo de atención semanal del proyecto 01 · *Ramón* · **filtro 3**
El filtro de entrada del laboratorio exige un costo de atención semanal estimado y dice *"si no
se puede estimar, no entra"*. El proyecto 01 entró sin declararlo y ya lleva una semana
consumiendo sesiones. Con 82 días de ventana y la agencia con prioridad (guardrail de §5), el
número importa: es lo que decide si E9 se hace o no se hace.
**Cierre:** hay un número en la fila del tablero.

## E6 — Decidir el Figma de referencia (Community) · *Ramón*
El archivo Community "Straightforward Brand Guidelines" sigue bloqueado: la API de Figma no da
acceso sin duplicarlo antes a los borradores de la cuenta. **No confundir con el otro Figma:**
el archivo nuevo de foto/calma ya se resolvió el 9-sep — Ramón vio el sitio real y se quedó con
el rediseño desplegado, así que esa dirección está descartada y no se lleva a código.
Este es el único de los pegados que no bloquea nada: hubo tres rediseños sin él. Recomendación:
matarlo, o mandar una captura. Sin fecha de revisión sale del registro, por la regla del README.
**Cierre:** una captura, un duplicado en los borradores, o una fila que diga que se descartó.
