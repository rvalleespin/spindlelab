# Ronda 2: qué se corrige de la QA de la ronda 1 y quién

Fuente: `acta-qa.md` (Javiera, 26-oct, **Aprobado con reparos**: 0 bloqueantes, 6 mayores, 12 menores) y `lectura-fria/lector-1..3.txt`. El sitio ya está **en la raíz** (rutas sin `/v3/`; los medios siguen en `/v3/…`). Las fuentes de texto (`e13/texto/*.json`) ya tienen el prefijo de raíz y `extraer-texto.mjs --comprobar` da 16 de 16 «igual»: **después de editar una fuente, vuelve a extraer solo esa página y comprueba que siga «igual»**. Reglas de siempre: guía §3 y §4, sin commit, sin tocar archivos de otro dueño, construir con `construir.sh <tu-nombre>`, medir y declarar en tu `desvios/*.md` (una línea por cosa).

## Frases que se unifican (las decide Clara y las aplica cada dueño en su archivo)

Lo que dijeron los tres lectores en frío, sin conocer la empresa:
- **«si Google y las IA pueden leerlo» (3 de 3) y «en si la IA puede leerlo»**: «leer un sitio» no se entiende («¿está en chino?», «yo pensaba que si el sitio se ve, se lee»). Se dice una vez, en palabras simples, y en todas partes igual. Dirección: *pueden entrar y entender de qué trata tu empresa* (y «como ChatGPT» la primera vez que aparece una IA). Aparece en la home (entradilla, microcopy, soluciones), contacto, servicios, método, diagnóstico y los artículos del blog.
- **«ves 21 señales, con lo que pesa cada bloque» (3 de 3)**: «señal» y «bloque» no se entienden. Dirección: *21 revisiones concretas de tu sitio, agrupadas en tres, con los puntos que vale cada una*.
- **«Paid Media (Google)» (2 de 3) y «Visibilidad en IA» (2 de 3)**: los nombres de servicio no se tocan (los guardianes los comparan), pero donde se nombren por primera vez junto a un texto de la home o de `/servicios/`, una glosa corta: *anuncios en Google*; *que ChatGPT y otras IA entiendan y describan bien tu empresa*.
- **«sin plantillas ni WordPress» (2 de 3)** lo leyeron como desventaja: *sitio a medida, hecho para tu negocio*.
- **Dos precios para lo mismo (2 de 3)**: el bloque «Búsqueda y visibilidad en IA» de la home muestra «Desde $400.000 + IVA · una vez» y enlaza a Auditoría SEO técnica (desde $490.000) y a Visibilidad en IA (auditoría desde $400.000). Se muestra cada precio junto a su enlace, como ya hace el bloque de anuncios.

## Mayores

| # | Qué | Dueño | Cómo |
|---|---|---|---|
| 1 | Franja de `/servicios/visibilidad-en-ia/` (`public/v3/medios/chequeo-239.webp` y `-43.webp`): captura del chequeo anterior con «citarte», «Ninguna herramienta del rubro publica su metodología», frase cortada y un campo de formulario falso | **Servicios** | Retira la franja (o reemplázala por algo verdadero y dicho en el lenguaje de A · Archivo) y comprueba que la plantilla no deje un hueco; si ningún archivo vivo usa `chequeo-239/-43` después del cambio, bórralos y su fila de `medios.json` (`grep` antes). No la reemplaces por una captura que parezca un campo interactivo |
| 2 | Huella de texto: ya corregida por la orquestadora | — | Mantenerla: ver arriba |
| 3 | Lectura en frío: términos sin explicar + dos precios | **Clara** (textos), **Diego-home** (el bloque de precios) | Las frases de arriba. Clara aplica en todos los `e13/texto/*.json` y re-extrae solo lo que cambie; **Diego-home** cambia el bloque «Búsqueda y visibilidad en IA» de la home (`index.astro` y el elemento `home.soluciones.busqueda.precio`) para mostrar los dos precios, cada uno con su enlace, con los guardianes de precios activos. El **blog** aplica las mismas frases dentro de sus `.html` (con `Edit` de texto exacto) |
| 4 | «hoy lo opera él» (home) y «lo opera él» (`/trabajo/combeau/`) sin registro de uso | **Clara** | Valor conservador (el que propone `desvios/home.md` §7.1): «Construimos su sitio con un panel para que él mismo edite textos y series.» y en el caso «El panel existe y está hecho para que él lo opere. No tenemos un número ni una fecha de uso que mostrar.» Si hay más menciones del mismo verbo, igual |
| 5 | `/trabajo/combeau/` sin pie: no hay control de cookies ni enlace a `/privacidad/` tras contestar el aviso; con el aviso abierto, «Todo el trabajo» queda tapado a 390, 360 y 768 | **Diego-trabajo** | El caso lleva el pie común (cookies, privacidad, correo, enlaces) como las demás rutas; que la página termine donde se pueda llegar con aviso abierto sin tapar nada. Mide a 360, 390, 768 y 1440 con y sin aviso. Declara el cambio respecto de `spec-visual.md` §2 («el caso no tiene pie») |
| 6 | Registro de desvíos desactualizado | cada dueño | `desvios/trabajo.md` §5.1 (el muro parejo SÍ se aplicó en `1c65e6a6`: `PORTADAS` con `combeau-fotografia-169` en `p-53`), `desvios/interiores.md` (las cuatro interiores usan `og-e12-<ruta>.jpg?v=2`, no `og-posicionamiento`), y el sitemap tiene 22 URL, no 21 |

## Menores que se corrigen

| # | Qué | Dueño |
|---|---|---|
| 8 | `/metodo/` a 390: 3 enlaces de `.datos-fase` miden 17 px (≥ 44 × 44 en bajo 834 o puntero grueso, como en la home); en `/contacto/` el enlace de privacidad y el botón de envío se pisan 1 px | **Interiores** |
| 11 | Blog: afirmaciones comparativas o causales sin fuente que sobrevivieron (lista en el acta, defecto 11: «ganan por goleada», «superan siempre al folleto», «una parte creciente de las decisiones… empieza con una pregunta a una IA», «una distinción que casi ninguna herramienta hace», «el fallo que menos se detecta y el que más caro sale», «casi nadie bloquea estos bots a propósito», «llms.txt… todavía no lo tiene casi nadie», «Los modelos citan con confianza lo que entienden sin ambigüedad», «Es una sola inversión con dos retornos» y el cierre «Puedes usar esta misma vara con nosotros»). Cada una se quita o se reescribe como lo que sí se sabe; el cierre de `elegir` queda sin invitar a medirnos con un caso que no existe | **Blog** |
| 18 | Dos h2 de la home con punto final y seis sin él: «Lo que puedes revisar antes de contratar.» y «Lo esencial, en claro.» | **Clara** |
| 9, 10, 13, 15, 16 | `llms.txt` (lista de bots del chequeo), medios del sitio anterior sin uso en `public/`, `/privacidad/` y 404 al día con `main`, `robots.txt`, hojas `inter.css`/`manrope.css` sin uso en `Layout.astro` | **Orquestadora** |

## Se anotan, no se corrigen (decide Ramón o es de la spec)

7 (texto a 8 a 13 px de la columna vecina a ≥ 1194 px, es de la spec de E12), 12 (Title Case de los nombres de plan: contradicción entre brief §6.3 y §7.11), 14 (chequeo propio 94: falta un tercer perfil externo real), 17 (pista visual de la tabla de 21 chequeos a 390).
