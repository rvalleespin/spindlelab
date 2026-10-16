# ✅ Resuelto · Encargo del 15-oct sobre verifica.spindlelab.cl

**Para:** la sesión del sitio de SpindleLab, que levantó el encargo
**De:** la sesión de Verifica y Cumple · 15-oct-2026
**Commit:** `9391a0b` en la rama `laboratorio/ley-21719`

Los dos problemas del encargo estaban, se arreglaron y se comprobaron en vivo. **Y apareció un
tercero que el encargo no traía y era el más grave de los tres.**

---

## 0. El hallazgo nuevo: el correo personal de Ramón, servido público

Buscando otros dominios de terceros apareció que la carpeta publicada incluía
`.wrangler/cache/wrangler-account.json`, **versionado en git**, y que se servía con 200:

```
https://verifica.spindlelab.cl/.wrangler/cache/wrangler-account.json  →  200 application/json
{ "account": { "id": "112fd685…", "name": "Manuvalleespin@gmail.com's Account" } }
```

El ID de cuenta no es una credencial, pero **el nombre es el correo personal de Ramón**,
público, en el sitio cuyo producto es la protección de datos.

**La causa de fondo, que es lo que importa:** `wrangler.toml` dice
`pages_build_output_dir = "."`. **Cloudflare publica la carpeta entera, incluidos los archivos
ocultos.** No había `.gitignore`.

**Arreglado:** el archivo salió de git y de la carpeta, y se creó un `.gitignore` que empieza
explicando por qué existe, para que el próximo no lo descubra por accidente.

| Antes | Después |
|---|---|
| `200` con el correo personal | **`404`** |

---

## 1. Nombres de terceros en el HTML público

**Confirmado.** Dos comentarios del `<script>` en línea nombraban a dos prospectos reales con su
puntaje, en las líneas 1740 y 1951 del HTML servido.

**a. Reescritos sin dominios.** "los sitios que sacan 0" y "hay sitios que sacan 100".

**c. Barrido completo.** Se revisaron los dos únicos archivos de texto que se publican
(`index.html` y `privacidad/index.html`). Los dominios que quedan son todos legítimos y se
quedan a propósito:

| Dominio | Por qué se queda |
|---|---|
| `bcn.cl`, `senado.cl` | fuentes legales citadas |
| `facebook.com`, `instagram.com`, `linkedin.com`, `whatsapp.com` | son el **catálogo de rastreadores** que el chequeo busca, no prospectos |
| `schema.org`, `w3.org` | espacios de nombres técnicos |
| `web3forms.com` | el servicio del formulario |
| `archive.org`, `cloudflare.com`, `google.com` | subencargados declarados en la política |
| `tuempresa.cl` | ejemplo del marcador de posición |
| `spindlelab.cl` | propio |

**Comprobación pedida:**

```
curl -s https://verifica.spindlelab.cl/ | grep -ciE "awasi|hotelescumbres"   →  0
```

**b. El build que quita los comentarios: NO se hizo, y es a propósito.** Ver §3.

---

## 2. robots.txt, llms.txt, sitemap.xml y el 404

**Confirmado.** Las cuatro rutas devolvían `200 text/html`, y el cuerpo de `/no-existe-xyz` era
**byte por byte idéntico a la portada**. Cloudflare Pages servía `index.html` como relleno en
cualquier ruta, porque no había `404.html`.

Publicados: `robots.txt` (mismo criterio que spindlelab.cl: entran los robots de IA a propósito,
con `/api/` cerrado porque cada llamada abre una revisión de verdad y gasta cuota),
`sitemap.xml` con las dos páginas reales, `llms.txt`, y `404.html`.

```
                antes                       después
robots.txt      200 text/html               200 text/plain
llms.txt        200 text/html               200 text/plain
sitemap.xml     200 text/html               200 application/xml
no-existe-xyz   200 text/html               404
```

El sitio siguió en pie: portada, `/privacidad/` y `/api/chequeo` responden 200.

### El puntaje del chequeo de IA

| | |
|---|---|
| 14-oct | **54** |
| 15-oct, después | **62** |

⚠️ **La primera corrida después del deploy dio 58 y decía "sitemap pendiente".** Era caché: la
segunda corrida, un minuto después, dio 62 y "Encontramos un sitemap válido". **Si vuelves a
medir justo después de desplegar, córrelo dos veces.**

### Lo que todavía falta para subir más

Siete pendientes, y **ninguno es de infraestructura: son todos de schema y metadatos.**

| Peso | Qué falta |
|---|---|
| 8 | No hay un nodo `Organization` |
| 6 | No hay `FAQPage` en el schema |
| 6 | El schema no tiene `sameAs` (3 perfiles externos) |
| 5 | La entidad no tiene dirección ni contacto |
| 5 | No hay un `Person` con cargo o formación |
| 4 | La meta description tiene 193 caracteres (el tope útil es 165) |
| 4 | No hay `datePublished` ni `dateModified` |

Suman **38 puntos de peso**.

### ✅ Hechos el mismo día (commit `7696d63`)

El disparador fue encontrar que un competidor del rubro sacaba **72** con el mismo instrumento,
diez puntos arriba de nuestro propio producto. Los siete dejaron de ser mejora opcional.

| | |
|---|---|
| 14-oct | 54 |
| 15-oct, tras robots/sitemap/404 | 62 |
| 15-oct, tras el schema | **94** |

Qué se hizo: nodo `ProfessionalService` completo (RUT, dirección, correo, `contactPoint`),
`Person` con cargo, `knowsAbout` y `alumniOf`, `FAQPage` con seis preguntas, `datePublished` y
`dateModified` en `WebApplication` y en un `WebPage` nuevo, y la meta description de 193 a 137
caracteres.

**Los datos salieron del schema canónico de `spindlelab.cl`, no de la cabeza de nadie.** Los
`sameAs` solo con perfiles comprobados uno por uno: Facebook devuelve 400 y quedó fuera.

⚠️ **Las seis preguntas se VEN en la página** (sección `#preguntas`, dos columnas en escritorio,
una en móvil, comprobado sin scroll horizontal a 375 px). El HTML se generó leyendo el propio
schema, así que no pueden quedar distintos. Marcar preguntas que nadie puede leer es spam de
datos estructurados.

⚠️ **La dirección (Los Leones 2270, Santiago) salió del perfil de empresa de Instagram.** Si no
es la correcta, hay que corregirla en el `@graph` de `index.html`.

### El único pendiente que queda

**"Te conectas con al menos 3 perfiles externos" (peso 6).** El schema declara 2: LinkedIn de
la empresa e Instagram. **No hay un tercero que exista.** Facebook da 400 y el Fiverr es de
Ramón, no de la empresa.

**Esto no se arregla escribiendo código: hace falta crear un perfil real.** El de más valor es
un **Perfil de Empresa de Google**, que además es gratis y ayuda en búsqueda local. Es de Ramón.

### Un error encontrado de paso, en el OTRO sitio

El `@graph` de `spindlelab.cl` declara `https://www.instagram.com/spindle.lab/` en su `sameAs`.
**Ese handle ya no existe**: la cuenta es `spindlelab.cl`. El sitio principal le está diciendo a
buscadores y modelos que el Instagram está en una dirección que no es. Es una línea y vive en el
otro repositorio.

---

## 3. Por qué NO se montó el build que quita los comentarios

El encargo pide que el build los quite. **Este proyecto no tiene build.** `wrangler.toml` dice
`pages_build_output_dir = "."`: Cloudflare publica la carpeta tal cual, sin compilar nada.

Montar un pipeline significa meterle a un sitio que hoy **no tiene cómo fallar al desplegar**
una pieza nueva que sí puede. Y además habría que configurar el comando de build en el panel,
que es fuera del repositorio.

Hay una razón técnica más dura: **quitar comentarios de JavaScript con expresiones regulares
rompe producción.** Cualquier `https://` dentro de un texto lleva `//` y un barrido ingenuo se
come la mitad de la línea. Este archivo tiene URLs en cadenas por todas partes.

**Lo que sí se hizo, que ataca el riesgo real:** el riesgo no era "hay comentarios", era "hay
nombres de terceros y datos personales en lo que se sirve". Eso está cerrado y comprobado: cero
menciones de terceros, y el archivo con el correo personal devuelve 404.

**Lo que queda propuesto, si se quiere cerrar del todo:** mover el sitio a una subcarpeta
(`pages_build_output_dir = "public"`) y dejar fuera `wrangler.toml`, `functions/` y cualquier
archivo de trabajo. Resuelve **por construcción** toda la clase de problema —nada interno puede
publicarse porque no está en la carpeta que se publica— sin necesidad de build.

⚠️ **Pendiente relacionado y menor:** `wrangler.toml` también se sirve público
(`200 application/toml`). No lleva credenciales, pero sí el ID del espacio de KV y notas
internas. Lo resuelve la misma mudanza a subcarpeta.

---

## Comprobación completa, para repetirla

```bash
curl -s https://verifica.spindlelab.cl/ | grep -ciE "awasi|hotelescumbres"          # 0
curl -s -o /dev/null -w "%{http_code}\n" \
  https://verifica.spindlelab.cl/.wrangler/cache/wrangler-account.json              # 404
for p in robots.txt llms.txt sitemap.xml no-existe-xyz; do
  curl -s -o /dev/null -w "$p %{http_code} %{content_type}\n" https://verifica.spindlelab.cl/$p
done
```

⚠️ **Una advertencia sobre cómo comprobar esto, aprendida acá.** La primera verificación dio un
falso positivo: buscaba el texto *"Verifica y Cumple"* dentro de `robots.txt`, pero esa ruta
devolvía la portada, que tiene ese texto. **Declaró desplegado algo que no lo estaba.** En un
sitio que sirve la portada en cualquier ruta, la señal no puede ser un texto que la portada
también tenga: hay que mirar el **tipo de contenido**, que no se puede falsear.
