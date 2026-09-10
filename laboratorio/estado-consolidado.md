# Estado consolidado del laboratorio

**Sesión troncal · 9-sep-2026.** Escrito según el rol de §"Cómo se trabaja" del
[README](README.md): revisar coherencia entre lo escrito y lo desplegado, perseguir lo
pegado, y no hacer el trabajo fino de las partes.

Todo lo de abajo se verificó contra la realidad (URL que responde, respuesta de API, `git`),
no contra lo que dice el brief. Cada afirmación lleva con qué se comprobó.

---

## 1. Lo que está realmente en vivo

| Qué | Estado | Con qué se verificó |
|---|---|---|
| `verificaycumple.pages.dev` | **vivo**, HTTP 200, 33.6 KB, 0,15 s | `curl -sIL` + lectura del HTML: `<title>Verifica y Cumple — Chequeo técnico Ley 21.719`, `<h1>¿Tu sitio tiene las señales que exige la Ley 21.719?` |
| API `/api/chequeo` | **funciona**, HTTP 200, 0,11 s | `curl "…/api/chequeo?dominio=spindlelab.cl"` → JSON completo, **36/100**, el mismo puntaje que registró el despliegue del 8-sep |
| Rediseño "más vendible" desplegado | **sí**, es lo que está servido | En el HTML vivo: "ejemplo ilustrativo" ×1, sección `<h2>Los 12 puntos del Art. 14 ter` presente, `<h2>Qué es esto, y qué no es`, CTA a `hola@spindlelab.cl` |
| Enlace cruzado → `verificaycumple` | **vivo** en `spindlelab.cl/diagnostico/` | `curl` de la página: 2 apariciones, `href="https://verificaycumple.pages.dev/"`, en la sección "Aparte de esto — Un chequeo distinto, para la Ley 21.719", ubicada entre "Dos caminos, y ninguno te cobra" y el FAQ, tal como dice el registro |
| Enlace cruzado inverso | **vivo** | `href="https://spindlelab.cl"` en el HTML de `verificaycumple.pages.dev` |
| Commit desplegado = HEAD de la rama | **sí**, sin deriva | `git ls-remote` → `laboratorio/ley-21719` = `4267d39`, exactamente el commit que el registro dice haber desplegado. No hay código sin desplegar |

**Los guardrails de §5 se sostienen en producción** (esto también se verificó, no se asumió):

- `"72 horas"` aparece **0 veces** en el HTML vivo — la corrección de §2 punto 2 llegó al producto.
- El bloque `informativos` de la API dice literalmente *"No podemos saber si disparan antes o
  después del consentimiento… eso requiere revisar el comportamiento en un navegador real"* —
  la decisión (a) "lanzamiento liviano" de §4 está honrada en el texto que ve el usuario.
- El aviso de que no es asesoría legal está presente.

## 2. Dónde el brief no calza con la realidad

### 2.1 El código y su registro viven en ramas distintas, y ninguna tiene las dos cosas

Es el hallazgo estructural de esta revisión.

- `laboratorio/ley-21719` contiene **el producto** (`verificaycumple/index.html`,
  `verificaycumple/functions/api/chequeo.js`) y **una copia del brief congelada el 3-sep**: su
  registro termina en la fila "descarta comprar el `.cl`". No sabe que se construyó, ni que se
  desplegó, ni que hubo dos rediseños.
- `laboratorio/ideas` contiene **el registro completo** (12 filas) y **nada del producto**.
- Verificado: `git merge-base --is-ancestor origin/laboratorio/ley-21719 origin/laboratorio/ideas`
  → **falso**. `git rev-list --count` → ley-21719 está **42 commits detrás de `ideas`** y
  **24 detrás de `main`**. Se separó el 3-sep en `d15c21c` y nunca volvió.

Esto rompe dos reglas del README a la vez: la regla 1 (*"sale de `main` y vuelve a traer de
`main`"* — ley-21719 nunca lo hizo) y la regla 3 (*"vuelve acá al cerrar"* — el proyecto está
declarado "alcance planeado completo" y la rama no volvió).

**Y tiene una trampa operativa:** Cloudflare Pages construye producción **desde
`laboratorio/ley-21719`**. Cerrar esa rama con el movimiento normal de la regla 3 — fusionar a
`ideas` y borrarla — **apaga el sitio**. Una sesión de parte que lea solo el README puede hacer
exactamente eso creyendo que ordena.

### 2.2 El encabezado del brief se contradice con su propia última fila

El **Estado** (línea 3) dice: *"alcance planeado completo (8-sep-2026) … Abierto: el post de
Cata (ver §8)"* — un solo pendiente. La **última fila del registro**, del mismo día, cierra
con dos pendientes más: reconectar Cloudflare por dashboard y decidir cómo ver el Figma. El
encabezado es lo primero que lee cualquier sesión nueva, y subdeclara lo abierto.

### 2.3 El encargo de Cata quedó bloqueado por una condición que ya no existe

`marketing/encargos-otras-sesiones/verificaycumple-post-personal-cata.md` (en `main`) tiene un
solo commit, `ef5b670`, del 3-sep. Sigue diciendo:

> **1. El sitio todavía no está desplegado.** … Publicar este post antes de eso manda a un
> link roto.

El sitio está desplegado desde el 8-sep. Y el pie del post todavía dice *"o el `.cl` si ya está
comprado — confirmar cuál URL está viva"*, cuando la compra ya está descartada por costo.
**Cata lee su encargo y ve una pieza bloqueada.** Esta es la explicación más probable de por
qué el post lleva seis días pegado: no está esperando un pase de tono, está esperando que
alguien le levante un bloqueo caducado.

### 2.4 Lo que el brief no vio: SpindleLab no pasa el chequeo que ahora promociona

`spindlelab.cl/diagnostico/` enlaza públicamente a un chequeo de Ley 21.719. Corrido contra el
propio `spindlelab.cl`, ese chequeo da **36/100**:

- **No tiene política de privacidad.** Verificado dos veces: el chequeo no encuentra el enlace,
  y `/privacidad/`, `/politica-de-privacidad/`, `/legal/` y `/cookies/` devuelven **404** las cuatro.
- **No tiene gestor de consentimiento.**
- **Sí tiene GA4, Google Tag Manager y Meta Pixel** (`gtag` ×5, `googletagmanager`, `fbevents`
  en el HTML).
- **`/contacto/` recolecta datos personales** — `Nombre`, `Email`, `Sitio web` más UTMs — y los
  envía por `action="https://api.web3forms.com/submit"`, un tercero extranjero. Sin checkbox de
  consentimiento (el único `type="checkbox"` es un honeypot `botcheck`). Eso es, en los términos
  del propio brief §2, un encargado del tratamiento y una transferencia internacional (Art.
  27-28), sin política publicada (Art. 14 ter) ni acto afirmativo previo (Art. 12).

No es un problema de marca del laboratorio — es de SpindleLab. Pero lo detecta el laboratorio y
nadie más lo está mirando. La ventana es la misma: 1-dic-2026.

### 2.5 Lo mismo, un nivel más incómodo: el chequeo tampoco se pasa a sí mismo

`/api/chequeo?dominio=verificaycumple.pages.dev` → **36/100**, sin política de privacidad y sin
gestor de consentimiento. El sitio que le dice a las pymes "publica tu política del Art. 14 ter"
no tiene la suya. Trata muchos menos datos que `spindlelab.cl` (no pide correo ni registro),
así que el riesgo legal es menor — pero el riesgo de credibilidad es directo y es lo primero que
va a probar cualquier persona técnica que lo visite.

### 2.6 Menor, y a favor del brief

- El `.cl` sigue sin registrar: `dig +short verificaycumple.cl` no devuelve nada. (El WHOIS de
  NIC Chile no respondió desde acá, así que "libre para comprar" queda **sin verificar del
  todo** — solo está confirmado que nadie lo tiene en uso.)
- La tabla de Proyectos del README describe bien el estado real.
- El radar (`herramientas/radar-de-ideas.md`) sigue marcado **v1 sin probar** y efectivamente
  no hay rastro de que se haya usado. Coherente.

## 3. Lo pegado — los tres pendientes que se repiten

### (a) Reconectar `verificaycumple` por el dashboard de Cloudflare
**Aparece en:** filas del 8-sep ×3 (rediseño visual, token revocado, rediseño vendible).
**Qué pasa:** el proyecto se creó por API, quedó sin webhook de auto-deploy. Cada cambio exige
un token nuevo de Ramón + disparo manual. Ya consumió tres tokens en un día.
**No verificable desde afuera:** sin token, la conexión del proyecto no se puede inspeccionar.
La última evidencia registrada (8-sep) dice que no está conectado, y no hay nada posterior.
**Recomendación: hacerlo ahora y que lo haga Ramón, no una sesión.** Es la única de las tres que
solo él puede ejecutar (requiere su dashboard), toma minutos, y mientras siga así **cada
iteración futura del sitio cuesta un token nuevo** — es decir, este pendiente encarece todos
los demás. Al conectarlo hay que dejar la rama de producción explícita en el proyecto, por §2.1.

### (b) El post de Cata
**Aparece en:** 3-sep (encargado y bloqueado), 8-sep (*"ya puede salir de su bloqueo"*), y en
el README como uno de los tres pegados.
**Por qué sigue pegado:** §2.3 — el archivo del encargo nunca se actualizó. El brief anotó que
el bloqueo cayó; el encargo, que es lo único que Cata lee, no se enteró.
**Recomendación: desbloquearlo editando el encargo, no volviendo a escribir el post.** El
borrador ya está calibrado y el hallazgo de las "72 horas" sigue siendo verdadero y verificado.
Basta reemplazar el bloqueo 1 por "desplegado y vivo desde el 8-sep", fijar
`verificaycumple.pages.dev` como la URL del primer comentario y borrar la duda del `.cl`. Es un
encargo a una sesión de parte de marketing (toca `main`), no trabajo de la troncal.

### (c) El Figma de referencia
**Aparece en:** 8-sep (bloqueado por la API de Community), y en el README como el tercer pegado.
**Recomendación: matarlo, o convertirlo en algo que no dependa de la API de Figma.** Es el único
de los tres que no bloquea nada — el sitio ya tuvo dos rediseños y está desplegado sin él. Si
Ramón todavía lo quiere, la vía barata es que mande **una captura**; duplicar el archivo a sus
borradores es la vía completa pero es trabajo suyo. Mientras no elija, no debería seguir
ocupando un renglón de "pendiente": aplica la regla del registro del README — *una idea sin
fecha de revisión es una idea que va a seguir dando vueltas en la cabeza*.

## 4. Ramas vivas del laboratorio

`git ls-remote --heads origin` → **45 ramas**. Del laboratorio:

| Rama | Último commit | ¿En `main`? | ¿En `ideas`? | Estado |
|---|---|---|---|---|
| `laboratorio/ideas` | 10-sep | no (+26) | — | **Troncal, viva y al día con `main`** (contiene `origin/main`, 0 detrás) |
| `laboratorio/ley-21719` | 8-sep | no (+11/−24) | **no** | **Viva y huérfana** — ver §2.1. Es además la rama de producción |
| `claude/verificaycumple-mencion-diagnostico` | 8-sep | **sí** (+0) | sí | **Huérfana benigna** — era el PR #34, ya fusionado. Sin commits propios. Borrable |

**Huérfanas, en los dos sentidos del término:**

- `laboratorio/ley-21719` es la huérfana **que importa**: nadie la ha traído de vuelta, no
  recibe `main`, su copia del brief está congelada hace seis días, y está sirviendo
  producción. Está viva por accidente, no por decisión.
- `claude/verificaycumple-mencion-diagnostico` es huérfana **inofensiva**: cumplió su función.
  No es un caso aislado — **26 de las 45 ramas del repo están totalmente fusionadas a `main`
  con cero commits propios**. Es higiene del repo entero, no del laboratorio, y no urge.

**No hay señal de otra sesión trabajando el laboratorio en paralelo.** Ninguna rama nueva toca
`laboratorio/` ni `verificaycumple/`. La única rama creada desde el último `fetch`
(`claude/spotify-landing-page-campaigns-a4pvct`, 9-sep) es de la agencia.

---

## Encargos abiertos para sesiones de parte

La troncal no los ejecuta. Cada uno es acotado y verificable.

### E1 — Devolver `laboratorio/ley-21719` sin apagar el sitio · *bloquea el orden del proyecto*
Fusionar `ley-21719` → `ideas` para que el código y su registro queden juntos, y traer `main` a
`ley-21719`. **Condición dura: no borrar `laboratorio/ley-21719`** mientras Cloudflare Pages
construya producción desde ella. El orden correcto depende de (E2): si el proyecto queda
reconectado por dashboard, ahí se decide con qué rama se queda producción y recién entonces se
puede retirar la otra. Verificar al terminar con un `curl` a `verificaycumple.pages.dev` que
siga en 200 y con `git merge-base --is-ancestor` en las dos direcciones.

### E2 — Reconectar `verificaycumple` en el dashboard de Cloudflare · *solo Ramón*
Dejar auto-deploy en push, como `spindlelab-astro`. Fijar y anotar en el brief cuál es la rama
de producción. Cierra el pendiente (a) y desbloquea E1.

### E3 — Desbloquear el post de Cata · *sesión de marketing, toca `main`*
Editar `marketing/encargos-otras-sesiones/verificaycumple-post-personal-cata.md`: quitar el
bloqueo 1 (el sitio está vivo desde el 8-sep, verificado hoy en 200), fijar
`verificaycumple.pages.dev` como URL del primer comentario y eliminar el condicional del `.cl`.
El borrador y el hallazgo no se tocan — solo queda el pase de tono de Cata y la revisión de
Ramón, que es como debía estar desde el 8-sep.

### E4 — Poner a `spindlelab.cl` en regla con la Ley 21.719 · *sesión de la agencia*
No es del laboratorio, pero lo encontró el laboratorio. `spindlelab.cl` da 36/100 en su propio
chequeo enlazado: sin política de privacidad (404 en las cuatro rutas probables), sin gestor de
consentimiento, con GA4 + GTM + Meta Pixel, y `/contacto/` mandando nombre y correo a
`api.web3forms.com`. Es exposición real antes del 1-dic-2026 y, además, la agencia está
enlazando un chequeo que la reprueba. Requiere abogado para el texto (guardrail de §5: acá se
hace la capa técnica, no la legal).

### E5 — Darle su política de privacidad a `verificaycumple` · *sesión de parte del laboratorio*
36/100 en su propio chequeo. Es el caso más chico (no pide correo ni registro) pero el más
visible: es lo primero que va a probar cualquier visitante técnico. Mismo guardrail: el texto
es de abogado, la publicación es de acá.

### E6 — Decidir el Figma, o matarlo · *decisión de Ramón, no de una sesión*
Captura, duplicado del archivo, o descartarlo. Sin fecha de revisión, sale del registro.

### E7 — Alinear el encabezado del brief con su registro · *sesión de parte, trivial*
El **Estado** de la línea 3 declara un solo pendiente abierto (el post de Cata) cuando la
última fila del registro deja tres. Es lo primero que lee una sesión nueva. Una línea.
