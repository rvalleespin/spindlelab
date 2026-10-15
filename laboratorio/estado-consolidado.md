# Estado consolidado del laboratorio

**Sesión troncal · 10-sep-2026.** La auditoría de la etapa 3 del pipeline: qué está verificado
en vivo, y dónde lo escrito no calza con lo que existe. La cola de trabajo no vive acá — vive
en [`encargos.md`](encargos.md). Este archivo se reescribe en cada pasada de la troncal; la
historia queda en el registro de cada brief.

Todo lo de abajo se comprobó contra la realidad (URL que responde, respuesta de API, `git`),
no contra lo que dice el brief. Cada afirmación lleva con qué se comprobó.

---

## 1. Dónde está el laboratorio, en una línea

Una sola idea viva. **Etapa 4 — lanzada a medias:** el gancho gratuito está vivo y verificado,
pero de las tres condiciones de la compuerta de lanzamiento (vivo · algo comprable · canal
activo) **solo se cumple la primera**, con 82 días de ventana. Lo que falta no es diseño: es
la sección de precio que no existe y el post que lleva una semana pegado.

## 2. Lo que está realmente en vivo

| Qué | Estado | Con qué se verificó |
|---|---|---|
| `verificaycumple.pages.dev` | **vivo**, HTTP 200, 33,6 KB, 0,15 s | `curl -sIL` + lectura del HTML |
| API `/api/chequeo` | **funciona**, HTTP 200, 0,11 s | `curl "…/api/chequeo?dominio=spindlelab.cl"` → JSON completo, **36/100**, el mismo puntaje que registró el despliegue del 8-sep |
| Rediseño "más vendible" | **es lo que está servido** | En el HTML vivo: "ejemplo ilustrativo", `<h2>Los 12 puntos del Art. 14 ter`, `<h2>Qué es esto, y qué no es`, CTA a `hola@spindlelab.cl` |
| Enlace cruzado → `verificaycumple` | **vivo** en `spindlelab.cl/diagnostico/` | 2 apariciones, `href="https://verificaycumple.pages.dev/"`, en la sección "Aparte de esto", entre "Dos caminos" y el FAQ |
| Enlace cruzado inverso | **vivo** | `href="https://spindlelab.cl"` en el HTML |
| Deriva código↔despliegue | **ninguna** | `4267d39` (el commit desplegado) sigue siendo el HEAD de `laboratorio/ley-21719` |
| Lo decidido el 9-sep | **nada aplicado** | Re-verificado el 10-sep: el H1 sigue siendo el viejo ("¿Tu sitio tiene las señales…"), y `149.000`, `precio` y `Estás seguro` aparecen **0 veces** en el HTML vivo |

**Los guardrails de §5 se sostienen en producción**, esto también verificado y no asumido:
`"72 horas"` aparece **0 veces** en el HTML vivo; el bloque `informativos` de la API dice
literalmente que no puede saber si los trackers disparan antes o después del consentimiento
(la decisión (a) "lanzamiento liviano" de §4, honrada en el texto que ve el usuario); y el
aviso de que no es asesoría legal está presente.

## 3. Dónde lo escrito no calza con lo que existe

### 3.1 El proyecto está declarado "alcance planeado completo" y no tiene ruta de ingreso construida
El brief cierra el alcance el 8-sep. Pero el alcance planeado era **solo el gancho gratuito**
(idea 1 de §3). La idea 2 —el kit de implementación a precio fijo, que es la única que cobra—
tiene **precio decidido el 9-sep ($149.000 + IVA) y cero construido**: no hay archivo, ni
sección, ni rama. Y §7 del propio brief avisa que esto es un sprint de tres meses, no un
negocio permanente.

Verificado: `149.000` y `precio` aparecen 0 veces en el HTML vivo; no hay ningún archivo con
"kit" o "precio" en `laboratorio/ley-21719`; ninguna rama de `git ls-remote` menciona kit,
precio ni monetización.

**Por qué importa más que todo lo demás:** "alcance completo" es cierto de la landing y falso
del negocio, y es la frase que hace que el proyecto se sienta terminado cuando le falta lo
único que produce ingreso. Quedan **82 días**.

### 3.2 El código y su registro viven en ramas distintas, y ninguna tiene las dos cosas
`laboratorio/ley-21719` tiene el producto (`verificaycumple/index.html`,
`functions/api/chequeo.js`) y una copia del brief **congelada el 3-sep**: no sabe que se
construyó, ni que se desplegó, ni que hubo tres rediseños. `laboratorio/ideas` tiene el
registro completo y **nada del producto**. Verificado con `git merge-base --is-ancestor`
(falso) y `git rev-list --count`: **42 commits detrás de `ideas`, 24 detrás de `main`**. Se
separó el 3-sep en `d15c21c` y nunca volvió — rompe las reglas 1 y 3 del README a la vez.

**Y tiene una trampa:** Cloudflare construye producción **desde esa rama**. Cerrarla con el
movimiento normal de la regla 3 —fusionar y borrar— **apaga el sitio**.

### 3.3 El encargo de Cata está bloqueado por una condición que caducó hace nueve días
Un solo commit (`ef5b670`, 3-sep). Sigue diciendo *"el sitio todavía no está desplegado…
manda a un link roto"*. Está vivo desde el 8-sep. **Cata lee su encargo y ve una pieza
bloqueada** — esa es la razón de la semana pegado, no un pase de tono. Y ahora hay dos
borradores del mismo post (el de Cata y el de `ventas/casos-de-exito/`) sin que nadie haya
elegido cuál sale.

### 3.4 SpindleLab no pasa el chequeo que ahora promociona
`spindlelab.cl/diagnostico/` enlaza públicamente el chequeo. Corrido contra `spindlelab.cl`:
**36/100**. Sin política de privacidad —404 en `/privacidad/`, `/politica-de-privacidad/`,
`/legal/` y `/cookies/`, las cuatro—, sin gestor de consentimiento, con GA4 + GTM + Meta Pixel
(`gtag` ×5, `googletagmanager`, `fbevents`), y `/contacto/` recolectando `Nombre`, `Email`,
`Sitio web` y UTMs hacia `action="https://api.web3forms.com/submit"` sin checkbox de
consentimiento (el único `type="checkbox"` es un honeypot `botcheck`). En los términos del
propio brief: encargado del tratamiento y transferencia internacional (Art. 27-28), sin
política publicada (Art. 14 ter) ni acto afirmativo previo (Art. 12).

**Un nivel más incómodo:** `/api/chequeo?dominio=verificaycumple.pages.dev` → **36/100**
también. El sitio que dice "publica tu política del Art. 14 ter" no tiene la suya.

### 3.5 La ficha de venta nueva ya trae un guardrail roto
`ventas/casos-de-exito/verifica-y-cumple.md` (escrita el 9-sep, rescatada en el commit
`3791ca9`) afirma en "Cómo usarlo en la llamada": *"La primera infracción de una empresa
pequeña es amonestación escrita, no la multa de 20.000 UTM."* El brief §2 punto 5 dice lo
contrario: es el Art. sexto transitorio, la Agencia **"podrá"** —no "deberá"—, y solo durante
los primeros 12 meses. Dicho como regla en una llamada es el mismo error que el proyecto
existe para no cometer. Todo el resto del documento está verificado y limpio.

### 3.6 El clon que las reglas de la casa mandan usar no existe
`CLAUDE.md:37`: *"the good clone is `~/Projects/spindlelab` — the older copy under iCloud Drive
is corrupt and must not be used"* (1-sep). Verificado el 10-sep: **`~/Projects/spindlelab` no
existe**, y la copia de iCloud pasa `git fsck --connectivity-only` con exit 0 y solo objetos
colgantes normales —sin objetos faltantes ni enlaces rotos—, sin marcadores `.icloud` sin
descargar. El único árbol adicional (`~/spindlelab-oficina-wt`) es un worktree *de esa misma
copia*. Tres filas del registro del 9-sep encargan trabajo "desde el clon bueno": quien las
tome no encuentra el directorio.

### 3.7 Dos sesiones escribieron en paralelo, otra vez
El 9-sep, después de la pasada anterior de la troncal, una sesión de parte escribió tres filas
del registro y la ficha de venta completa **y las dejó sin commitear** en el árbol de trabajo.
No existían para nadie más. Esta sesión las commiteó tal cual (`3791ca9`), sin editarlas.
Es el tercer episodio de este tipo en el repo; ahora está escrito como regla en el README y
como riesgo conocido.

### 3.8 El proyecto 01 entró sin cumplir el filtro 3
El filtro de entrada exige **costo de atención semanal declarado** y dice *"si no se puede
estimar, no entra"*. No hay número en ninguna parte del brief — solo menciones cualitativas
("el más bajo de los dos caminos", "más alto al arrancar"). Con la agencia con prioridad por
guardrail, ese número es justamente lo que decide si el kit se construye.

### 3.9 Menor, y a favor del brief
- El `.cl` sigue sin registrar: `dig +short verificaycumple.cl` no devuelve nada. (El WHOIS de
  NIC Chile no respondió desde acá, así que "libre para comprar" queda **sin verificar del
  todo** — solo está confirmado que nadie lo tiene en uso.)
- El encabezado del brief ya fue corregido por la sesión de parte el 9-sep: ahora lista los
  pendientes numerados en vez de uno solo. Era el encargo E7; queda cerrado.
- El radar sigue **v1 sin probar** y no hay rastro de uso. Coherente con lo declarado.

## 4. Ramas

`git ls-remote --heads origin` → **45 ramas**. Del laboratorio:

| Rama | Último commit | ¿En `main`? | ¿En `ideas`? | Estado |
|---|---|---|---|---|
| `laboratorio/ideas` | 10-sep | no (+28) | — | **Troncal, viva y al día con `main`** |
| `laboratorio/ley-21719` | 8-sep | no (+11/−24) | **no** | **Viva y huérfana** (§3.2). Es además la rama de producción |
| `claude/verificaycumple-mencion-diagnostico` | 8-sep | **sí** (+0) | sí | **Huérfana inofensiva** — era el PR #34, ya fusionado. Borrable |

`laboratorio/ley-21719` es la huérfana que importa: nadie la trajo de vuelta, no recibe `main`,
su brief está congelado hace una semana, y está sirviendo producción. Está viva por accidente.

`claude/verificaycumple-mencion-diagnostico` no es un caso aislado: **26 de las 45 ramas están
totalmente fusionadas a `main` con cero commits propios**. Es higiene del repo entero, no del
laboratorio, y no urge.

**Sin señal de otra sesión trabajando el laboratorio en paralelo** — ninguna rama nueva toca
`laboratorio/` ni `verificaycumple/`. Sí hay una sesión de la agencia trabajando ahora mismo
(archivos sin commitear de una auditoría de cliente, 10-sep): no se tocaron.

---

**Todo lo que hay que hacer está en [`encargos.md`](encargos.md), E1 a E12.** Esta pasada no
construyó ni rediseñó nada.
