# Encargo · El schema de spindlelab.cl: un error y tres huecos

**Para:** la sesión que mantiene el sitio de SpindleLab (`spindlelab.cl`, Astro)
**De:** la sesión de Verifica y Cumple · 15-oct-2026
**Por qué ahora:** hoy se cerraron exactamente estos mismos puntos en
`verifica.spindlelab.cl` y el chequeo de IA subió **de 54 a 94 en un día**. La receta está
probada y medida. Acá va para aplicarla donde todavía falta.

---

## 0. Primero el error, porque es incorrecto y no solo mejorable

El `@graph` de `spindlelab.cl` declara:

```json
"sameAs": [
  "https://www.linkedin.com/company/spindlelab/",
  "https://www.instagram.com/spindle.lab/"     ← ESTE HANDLE YA NO EXISTE
]
```

**La cuenta es `spindlelab.cl`.** Confirmado por Ramón el 15-oct y verificado en el propio
Instagram: en el selector de cuentas no aparece ningún `spindle.lab`.

Hoy el sitio le está diciendo a buscadores y modelos que el Instagram de SpindleLab está en una
dirección que no es suya.

```json
"https://www.instagram.com/spindlelab.cl/"
```

⚠️ **No lo verifiques con `curl`.** Instagram devuelve **200 también para perfiles que no
existen**: sirve una página de error con código 200. Ese test da falso positivo. Se comprueba
abriendo el perfil en un navegador con sesión, o en el selector de cuentas.

El mismo handle muerto aparece en los enlaces visibles de la portada y de `/nosotros/`.

---

## 1. Los tres huecos, medidos hoy

`GET https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl` → **85**, con tres pendientes:

| Peso | Qué falta | Qué dice el detalle |
|---|---|---|
| 6 | Te conectas con al menos 3 perfiles externos | "Tu schema declara 2 perfil(es) en sameAs" |
| 5 | Respondes preguntas en tus títulos | "Ningún H2 o H3 está escrito como pregunta" |
| 4 | Tu contenido tiene fecha | "No hay fechas en tu schema" |

Son 15 puntos. **85 → 100 si se cierran los tres.**

### Cómo se resolvió cada uno en Verifica

**Fechas (peso 4).** `datePublished` y `dateModified` en el nodo de la página. Se agregó además
un nodo `WebPage` que no existía.

⚠️ **`dateModified` se actualiza a mano cuando cambia el contenido de verdad.** Una fecha que
miente es peor que no tener fecha, y nadie la detecta.

**Preguntas en los títulos (peso 5).** Esto **no se resuelve solo con schema**: hace falta que
en la página haya `<h2>` o `<h3>` escritos como pregunta. En Verifica se agregó una sección
`#preguntas` con seis preguntas reales y sus respuestas, y encima el nodo `FAQPage`.

⚠️ **El `FAQPage` tiene que reflejar preguntas que SE VEAN.** Marcar preguntas que el visitante
no puede leer es lo que Google llama spam de datos estructurados. En Verifica el HTML de la
sección se **generó leyendo el propio schema**, para que no puedan quedar diciendo cosas
distintas con el tiempo. Vale la pena repetir ese truco.

**Tres perfiles externos (peso 6).** Este es el que **no se arregla escribiendo código.** Solo
existen dos perfiles reales: LinkedIn de empresa e Instagram. Se comprobó uno por uno:
`facebook.com/spindlelab.cl` devuelve **400**, no existe. El Fiverr es de Ramón, no de la
empresa.

**Hace falta crear un tercer perfil que exista.** El de más valor es un **Perfil de Empresa de
Google**: es gratis, ayuda en búsqueda local y es exactamente lo que el arreglo del chequeo
sugiere. **Es de Ramón, no de una sesión.**

⚠️ **No inventar un `sameAs`.** Un perfil declarado que no existe es peor que faltar uno: le
dice a los modelos que la entidad está donde no está, que es justo el error que este encargo
viene a corregir.

---

## 2. De dónde salen los datos

El `@graph` de `spindlelab.cl` ya es la fuente canónica de la organización y de la persona: de
ahí se copiaron a Verifica el RUT, el cargo, las universidades y el LinkedIn. **No hay que
inventar nada; hay que completarlo.**

Dato que Verifica tiene y el sitio principal no: la dirección postal completa,
**Los Leones 2270, Santiago, Región Metropolitana, CL**, confirmada por Ramón el 15-oct.
Hoy `spindlelab.cl` solo declara `addressLocality` y `addressCountry`.

---

## 3. Cómo se comprueba

```bash
curl -s "https://spindlelab.cl/api/chequeo?dominio=spindlelab.cl" \
  | python3 -c "import sys,json;d=json.load(sys.stdin);print(d['puntaje']);[print(' -',i['titulo']) for i in d['items'] if not i['ok']]"
```

⚠️ **Córrelo dos veces.** La primera corrida después de un despliegue puede pegar en caché y
dar un número viejo: hoy pasó exactamente eso en Verifica (dio 58 y "sitemap pendiente" cuando
el sitemap ya estaba; un minuto después, 62 y "sitemap válido").

**Estado al 15-oct, con el mismo instrumento:**

| | |
|---|---|
| `verifica.spindlelab.cl` | **94** |
| `spindlelab.cl` | **85** |
| un competidor del rubro | 72 |

El producto puntúa más alto que el sitio de la agencia. Conviene darlo vuelta, sobre todo
ahora que el centro del servicio pasó a ser el sitio web y el argumento es que **se puede
comprobar**.
