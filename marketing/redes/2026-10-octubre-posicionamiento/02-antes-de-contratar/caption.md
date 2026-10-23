# Caption · Carrusel "Lo que puedes revisar antes de contratar"

**Cuenta:** Instagram `spindlelab.cl` · **Voz:** plural de marca · **Formato:** carrusel de 6 láminas, 1080x1350
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. Nada está publicado.
**Slug del UTM:** `antes-de-contratar`

---

## Pie de foto (copiar y pegar)

La primera línea es el gancho y entra completa antes del "ver más" (95 caracteres; Instagram corta el pie hacia los 125, así que entra entera).

```
Puedes leer cuánto cuesta, cómo trabajamos y cómo revisamos tu sitio antes de hablar con nadie.

Lo dejamos escrito porque es difícil contratar algo que no puedes comparar. Cada solución tiene su precio de partida publicado, con lo que incluye. El método tiene cuatro pasos y el primero es una revisión gratis. Y el chequeo con el que revisamos tu sitio lo puedes correr tú: 21 señales, gratis y sin dejar tu correo.

El chequeo mide si tu sitio está listo para que la IA lo lea, no si hoy te citan.

Córrelo sobre tu sitio en spindlelab.cl/diagnostico. Si prefieres que lo veamos nosotros, pide la revisión de una página en spindlelab.cl/contacto.
```

**Hashtags (opcionales, van al final del pie solo si Ramón los quiere):** `#SEO #IA #Chile`, los mismos de septiembre. Con 19 seguidores no mueven alcance; sirven para mantener la línea de la cuenta.

**Por qué las direcciones van sin UTM en el pie:** en Instagram el enlace del pie no se puede tocar, así que un UTM largo ahí solo ensucia el texto. El UTM va donde sí se toca: el sticker de la historia (abajo). Quien teclee la dirección del pie entra como "directo", y eso lo cubre la pregunta de la llamada de 20 minutos ("¿cómo llegaste?").

**Por qué el pie no repite los precios:** envejecen. Los precios viven solo en la lámina 2, con su fecha ("octubre 2026"). Si cambia alguno, se re-renderiza esa lámina y el pie sigue siendo cierto.

---

## Enlaces con UTM completo

Usar exactamente estos, con la barra final, directo a la página (no a la portada: el script que guarda el UTM vive solo en `/contacto/`).

| Dónde | URL |
|---|---|
| Sticker de enlace de la historia (principal) y primer comentario | `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar` |
| Segundo sticker opcional, si Ramón quiere ofrecer la revisión en la misma historia | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar` |

Las dos respondieron 200 el 23-oct (comprobado con `curl`). El chequeo de `/diagnostico/` no captura leads, así que esta pieza se lee por Instagram Insights y GA4. La revisión pedida por `/contacto/` sí trae `utm_campaign=antes-de-contratar` en el correo del formulario.

---

## Primer comentario

Dos líneas, un solo enlace, sin hashtags (estándar de primeros comentarios). Instagram no hace tocables los enlaces de los comentarios: sirve para copiar y deja el UTM puesto.

```
El chequeo de las 21 señales, sin registro:
https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar
```

---

## Historia (el mismo día)

Compartir el post a historias desde la cuenta de la empresa y desde la personal (un minuto, como el 30-sep). Sticker de enlace con la URL del chequeo de la tabla de arriba. Sin texto nuevo sobre la imagen.

---

## Texto alternativo por lámina (campo "Alt" de cada imagen)

1. Portada sobre fondo oscuro. Título: "Puedes leer cuánto cuesta, cómo trabajamos y cómo revisamos tu sitio antes de hablar con nadie." Debajo: "Las tres cosas están publicadas en spindlelab.cl." Marca SpindleLab con el punto final en dorado.
2. Lista de seis soluciones con su precio de partida, todos más IVA. Auditoría SEO técnica, desde 490.000 pesos. Visibilidad en IA (auditoría), desde 400.000. Google Ads, gestión, desde 350.000 al mes, pauta aparte. Gestión de redes, desde 390.000 al mes, el creativo lo pones tú. Página web a medida, desde 390.000, una página para una campaña. Acompañamiento mensual, desde 590.000 al mes, mínimo 3 meses. Nota al pie: "Precios de partida, más IVA, octubre 2026. El valor final se cierra por escrito."
3. Los cuatro pasos del método. 01 Revisión gratis: nos pasas la dirección de tu sitio y te devolvemos una página con lo más importante que encontramos. 02 Conversación y propuesta: 20 minutos por videollamada y, si hay trabajo, una propuesta por escrito con qué hacemos, en qué fases y cuánto cuesta. 03 Implementación por fases: hacemos lo acordado o entregamos las especificaciones para que lo implemente tu equipo. 04 Acompañamiento mensual: si quieres seguir, medimos cada mes con el mismo criterio. Cierre: "Cada fase termina con algo que apruebas antes de seguir."
4. Rótulo: "Qué mira el chequeo". El número 21 en dorado, grande, y al lado la palabra "señales". Tres preguntas con su peso: "¿Te pueden leer?", 30 puntos; "¿Te entienden?", 40 puntos; "¿Te pueden citar?", 30 puntos. Cierre: "Escribes tu dominio. Es gratis y no pedimos tu correo."
5. Rótulo: "Lo que no mide el chequeo". Texto grande: "No mide si hoy te citan." Debajo: eso depende de que te mencionen en fuentes que la IA lee, como rankings, directorios y artículos, y no se puede saber leyendo tu sitio; hay que preguntarle a los motores.
6. Cierre. "Córrelo sobre tu sitio, sin registro." En un recuadro, la dirección spindlelab.cl/diagnostico. Debajo, en letra más chica: si prefieres que lo veamos nosotros, pide la revisión de una página, también gratis, en spindlelab.cl/contacto.

---

## Qué NO dice el pie, a propósito

- Ningún precio, ningún plazo ("un día hábil" y "24 horas" están sin decidir) ni resultado (consultas, ventas, que una IA te cite).
- No dice que la revisión incluya preguntarle a ChatGPT: hoy es un paso manual de Ramón y no una parte fija del servicio.
- No dice "cómo medimos" para hablar del chequeo: en el sitio, "medir" es el protocolo de preguntas a los motores (cinco preguntas fijas por tres motores), que esta pieza no muestra. El chequeo "lee tu sitio"; por eso aquí se llama "cómo revisamos tu sitio".
- No dice que Google Ads tenga un mínimo de meses (pendiente de Ramón, ver `publicar.md`).
- No nombra clientes, prospectos ni a Verifica y Cumple.
