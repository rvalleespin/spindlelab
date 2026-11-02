# Caption · Imagen única «Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy»

**Cuenta:** `spindlelab.cl` en Instagram · voz de marca, plural · 1 lámina de 1080×1350 (4:5)
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. Nada está publicado.
**Slug del UTM:** `bots-que-buscan-y-bots-que-entrenan`
**Lugar en el plan:** día 5 (lunes 2-nov), en el lugar de la pieza 3, mientras la decisión A siga sin respuesta (opción segura). No depende del sitio nuevo: solo cita `/diagnostico/`, que está vivo.

---

## 1. Pie de foto (copiar y pegar)

La primera línea es el gancho (66 caracteres): entra entera antes del «más», que Instagram corta hacia los 125.

```
Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy.

GPTBot es el robot con el que OpenAI recoge texto que puede servir para entrenar sus modelos. En el robots.txt, el archivo de la raíz de tu sitio donde le dices a cada robot qué puede leer, bloquearlo indica que tu contenido no debe usarse para eso. Quien decide si ChatGPT te muestra en sus respuestas de búsqueda es otro robot, OAI-SearchBot, y OpenAI aclara que cada ajuste es independiente de los demás.

Si bloqueas a OAI-SearchBot, OpenAI dice que tu sitio no sale en esas respuestas, aunque puede quedar como enlace. Permitirlo es lo que OpenAI recomienda para aparecer, y no garantiza que ChatGPT te nombre.

Anthropic hace la misma separación. ClaudeBot es de entrenamiento, Claude-SearchBot es de búsqueda y Claude-User entra a una página cuando alguien le pregunta algo a Claude. Anthropic dice que bloquear a Claude-SearchBot o a Claude-User puede restarte visibilidad.

Para ver cuáles de estos robots tiene bloqueados el tuyo, el chequeo gratis lee tu robots.txt: spindlelab.cl/diagnostico
```

**Qué dice y qué no, a propósito.**
- Todo lo que se atribuye lleva su autor: «OpenAI dice», «OpenAI aclara», «Anthropic dice». Cada afirmación y su página están en `fuentes.md`, con la fecha de consulta (23-oct-2026). **Las dos páginas también van en el primer comentario** (§5), para que quien dude del gancho tenga adónde ir: la pieza corrige un mito y una corrección sin fuente a la vista se lee como una opinión más.
- **El aviso de visibilidad de Anthropic lo traen dos robots, no tres.** La página de Anthropic (releída el 23-oct, noche) dice «puede reducir la visibilidad» solo para Claude-SearchBot y Claude-User; para ClaudeBot dice que restringirlo deja el material futuro fuera del entrenamiento y nada de visibilidad. El pie nombra a los dos robots que corresponden, para que «estos dos» no se lea como ClaudeBot más uno.
- **No dice** que bloquear el entrenamiento sea buena o mala idea. No recomienda bloquear ni dejar de bloquear: es una decisión del dueño del sitio.
- **No dice** nada sobre lo que un modelo ya aprendió antes. La documentación de OpenAI habla de la búsqueda de ChatGPT y de que cada ajuste es independiente; sobre lo ya entrenado no dice nada. «De hoy» se queda en lo que la documentación cubre: las respuestas que ChatGPT arma buscando.
- **No nombra** ChatGPT-User ni los robots de Perplexity: OpenAI aclara que ChatGPT-User no decide si apareces en la búsqueda y que las reglas del robots.txt pueden no aplicarle, y Perplexity dice que Perplexity-User en general ignora el robots.txt. Nuestro propio sitio (`/diagnostico/`) dice más que eso sobre esos tres: ver `fuentes.md`, sección «Lo que nuestro sitio dice más fuerte que la documentación».
- **No promete** ningún resultado. El único límite («no garantiza que ChatGPT te nombre») se dice una vez, en el segundo párrafo.
- **No nombra** ninguna empresa ni usa ningún hallazgo de prospecto. Tampoco cifras de resultados, ni plazos, ni precios.

## 2. Hashtags (opcionales)

`#SEO #IA #ChatGPT #Chile`

Sin tilde. Si Ramón no los quiere, el pie queda igual sin ellos.

## 3. Texto alternativo (campo «Alt», 120 caracteres)

```
Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy. Debajo, dos reglas robots.txt: GPTBot y OAI-SearchBot.
```

## 4. Enlaces con UTM completo

El CTA es **correr el chequeo** (`/diagnostico/`), no pedir la revisión. Instagram no entrega referer, así que todo enlace que se pueda tocar lleva UTM. El pie de foto y los comentarios no son clicables: ahí la dirección va escrita sin UTM.

| Dónde va | Texto visible | URL |
|---|---|---|
| **Sticker de enlace** de la historia (empresa y personal) | Chequear mi sitio | `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=bots-que-buscan-y-bots-que-entrenan` |
| Pie de foto | `spindlelab.cl/diagnostico` | sin UTM (no clicable) |
| Primer comentario | `spindlelab.cl/diagnostico` | sin UTM (no clicable) |

La URL con UTM respondió 200 el 23-oct (`curl`). **El chequeo no captura leads:** esta pieza no pasa por el correo del formulario, se lee por los toques al sticker, y **no cuenta para el mínimo de revisiones** del plan (§8). Quien teclee la dirección del pie entra como «directo»; se cubre preguntando «¿cómo llegaste?» en la llamada.

## 5. Primer comentario (dos líneas de uso, una de fuentes, un solo enlace nuestro)

```
Para ver el robots.txt de tu sitio, escribe tudominio.cl/robots.txt en el navegador.
El chequeo lo lee por ti: spindlelab.cl/diagnostico

Fuentes, consultadas el 23-oct-2026:
OpenAI: developers.openai.com/api/docs/bots
Anthropic: support.claude.com, artículo 8896518
```

No repite el pie: contesta la duda que viene después de leerlo (dónde se mira ese archivo) y dice dónde verificar el gancho. Sin hashtags, voz plural. **La línea de fuentes se vuelve a comprobar el día de publicar**: se abren las dos páginas, se compara con `fuentes.md` y se pone en el comentario la fecha de ese día. Las dos direcciones son de OpenAI y de Anthropic, no nuestras, así que no llevan UTM; el único enlace nuestro sigue siendo `spindlelab.cl/diagnostico`, escrito sin UTM porque Instagram no hace tocables los comentarios. La dirección de OpenAI es la actual (la antigua, `platform.openai.com/docs/bots`, redirige a esta con un 301) y la de Anthropic es el artículo 8896518 de `support.claude.com`.

## 6. Historias (el mismo día)

Se comparte el post a historias en las dos cuentas, con el sticker de la sección 4. Un minuto.

- **Cuenta de la empresa (plural):** `Un robot entrena modelos y otro busca para responder. Bloquear al primero no te saca de la búsqueda de ChatGPT.`
- **Cuenta personal de Ramón (singular):** `Bloquear a GPTBot no te saca de las respuestas de ChatGPT de hoy. Lo leí en la documentación de OpenAI y en la de Anthropic.` Esta línea dice «lo leí»: Ramón abre las dos páginas antes de subirla (están en `fuentes.md`; son dos minutos).
