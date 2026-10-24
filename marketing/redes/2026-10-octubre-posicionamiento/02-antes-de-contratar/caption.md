# Caption · Carrusel «Antes de contratar» (pieza 2) · v2, 23-oct-2026

**Cuenta:** Instagram `spindlelab.cl` · **Voz:** plural de marca · **Formato:** 1080x1350 (4:5)
**Estado:** BORRADOR PARA REVISIÓN DE RAMÓN. Nada está publicado.
**Corregida el 23-oct-2026 (noche) tras la revisión independiente:** lámina 2 sin ninguna cifra, paso 04 sin cadencia, bajada de la 2A acotada a lo que la pantalla muestra, y lámina del límite con su cláusula completa. Detalle en `publicar.md` §9.
**Tres versiones en esta carpeta, la misma historia partida como la partió PLAN.md v2 (§3 y §5).** Se sube una sola por vez. Cuál y cuándo está en `publicar.md`.

| Versión | Láminas | Sale cuando | Slug del UTM |
|---|---|---|---|
| **Completa** | `lamina-1` a `lamina-6` (6) | El sitio nuevo ya está publicado. Es la que va el día 3 | `antes-de-contratar` |
| **2A, el chequeo** | `2a-lamina-1` a `2a-lamina-4` (4) | Cuando sea, incluso antes del sitio nuevo: solo cita `/diagnostico/`, que ya está vivo | `que-mira-el-chequeo` |
| **2B, precios y método** | `2b-lamina-1` a `2b-lamina-4` (4) | Solo si la 2A salió primero y el sitio nuevo ya está publicado. Si salió la completa, no se sube | `precios-y-metodo` |

Hashtags de las tres: los mismos de la pieza 1 (ver más abajo). El límite «el puntaje no dice si te citan ni garantiza una recomendación» se dice **una sola vez en cada versión**, en el titular de su lámina del límite (5 de la completa, 3 de la 2A). Ningún pie de foto, comentario ni historia lo repite. La 2B no habla del chequeo y no lo necesita.

---

## 1. Pie de foto de la versión completa (copiar y pegar)

La primera línea es el gancho y entra entera antes del «más» (96 caracteres; Instagram corta hacia los 125).

```
Puedes leer cuánto cuesta, cómo trabajamos y qué mira nuestro chequeo antes de hablar con nadie.

Cada solución publica su precio de partida, con lo que incluye y más IVA. El método tiene cuatro pasos y el primero es una revisión gratis de una página. El chequeo de visibilidad en IA lo corres tú: escribes tu dominio, ves 21 señales y no dejas tu correo.

Lo dejamos escrito porque es difícil contratar algo que no puedes comparar.

Los precios están en spindlelab.cl/servicios y el método en spindlelab.cl/metodo. El chequeo lo corres en spindlelab.cl/diagnostico, y la revisión de una página la pides en spindlelab.cl/contacto.

#SEOtecnico #SitioWeb #MarketingConIA #Chile
```

## 2. Pie de foto de la 2A, el chequeo (copiar y pegar)

Gancho de 66 caracteres.

```
Escribes tu dominio y ves 21 señales, ordenadas en tres preguntas.

Es el chequeo de visibilidad en IA de SpindleLab. Cada pregunta tiene su peso en el puntaje y las 21 señales están publicadas, para que puedas repetir el chequeo a mano si quieres.

Córrelo sobre tu sitio en spindlelab.cl/diagnostico.

#SEOtecnico #SitioWeb #MarketingConIA #Chile
```

## 3. Pie de foto de la 2B, precios y método (copiar y pegar)

Gancho de 70 caracteres.

```
Puedes leer cuánto cuesta y cómo trabajamos antes de hablar con nadie.

Cada solución publica su precio de partida, con lo que incluye y más IVA. El método tiene cuatro pasos y el primero es una revisión gratis de una página.

Lo dejamos escrito porque es difícil contratar algo que no puedes comparar.

Los precios están en spindlelab.cl/servicios y el método en spindlelab.cl/metodo. La revisión de una página la pides en spindlelab.cl/contacto.

#SEOtecnico #SitioWeb #MarketingConIA #Chile
```

## 4. Hashtags

`#SEOtecnico #SitioWeb #MarketingConIA #Chile`, idénticos a los de `01-donde-se-cae-una-consulta/caption.md` (23-oct, 23:20) y alineados con el posicionamiento nuevo («marketing y crecimiento con IA para empresas que ya venden»). Sin tilde: `#SEOtécnico` y `#SEOtecnico` son dos etiquetas distintas y parten el conteo. Opcionales, van al final del pie y solo si Ramón los quiere. **Cambió respecto de la v1:** antes eran `#SEO #IA #Chile`, los de septiembre, que ya no calzan con la pieza 1 ni con el posicionamiento. Si Ramón cambia los de la pieza 1, estos cambian con ellos.

## 5. Enlaces con UTM completo

Todo enlace que se puede tocar lleva su UTM, directo a la página (no a la portada: el script que guarda el UTM vive solo en `/contacto/`). **Las direcciones escritas dentro del pie de foto y dentro de las láminas no llevan UTM a propósito:** Instagram no las hace tocables y un UTM largo ahí solo ensucia el texto (regla de PLAN.md §3). Quien las teclea entra como «directo», y eso lo cubre la pregunta de la llamada de 20 minutos («¿cómo llegaste?»).

| Dónde | Versión | URL |
|---|---|---|
| Sticker de enlace de la historia (principal) | Completa | `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar` |
| Segundo sticker, opcional, para ofrecer la revisión en la misma historia | Completa | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar` |
| Sticker de enlace de la historia | 2A | `https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=que-mira-el-chequeo` |
| Sticker de enlace de la historia | 2B | `https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=precios-y-metodo` |

Las tres rutas respondieron 200 con su UTM el 23-oct (comprobado con `curl`). El chequeo de `/diagnostico/` no captura leads: los toques al chequeo se leen por Insights de la historia y GA4, y **no cuentan para el mínimo de revisiones del PLAN §8**. Lo que sí trae `utm_campaign` en el correo del formulario es lo que entra por `/contacto/`: el segundo sticker de la completa y el sticker de la 2B.

## 6. Primer comentario

Dos líneas, un solo enlace, sin hashtags. Instagram no hace tocables los enlaces de los comentarios: sirve para copiar y deja el UTM puesto.

**Completa:**
```
El chequeo, sin registro:
https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=antes-de-contratar
```

**2A:**
```
El chequeo, sin registro:
https://spindlelab.cl/diagnostico/?utm_source=instagram&utm_medium=social&utm_campaign=que-mira-el-chequeo
```

**2B:**
```
La revisión de una página, gratis:
https://spindlelab.cl/contacto/?utm_source=instagram&utm_medium=social&utm_campaign=precios-y-metodo
```

## 7. Historia (el mismo día, un minuto)

Se comparte la publicación a historias desde la cuenta de la empresa y desde la personal, con el sticker de la tabla 5. Sin texto nuevo sobre la imagen. Si Ramón quiere una línea:

| Versión | Cuenta de la empresa (plural) | Cuenta personal de Ramón (singular) |
|---|---|---|
| Completa | `Lo que puedes leer antes de contratar: precios, método y chequeo.` | `Dejé publicados los precios de partida de SpindleLab, cómo trabajo y qué mira el chequeo. Todo se lee antes de hablar conmigo.` |
| 2A | `Escribes tu dominio y ves 21 señales. Gratis, sin dejar tu correo.` | `Este es el chequeo gratis de SpindleLab: escribes tu dominio y ves 21 señales.` |
| 2B | `Precios de partida y método, escritos antes de que hables con nadie.` | `Dejé escritos los precios de partida de SpindleLab y cómo trabajo, para que los leas antes de hablar conmigo.` |

## 8. Texto alternativo por lámina (campo «Alt», máximo 120 caracteres)

El número entre paréntesis es el largo contado. El alt de la lámina del límite describe esa misma lámina: no es un segundo lugar donde se dice.

**Completa**
1. (114) `Portada oscura: «Puedes leer cuánto cuesta, cómo trabajamos y qué mira nuestro chequeo antes de hablar con nadie.»`
2. (106) `Las seis soluciones de SpindleLab, cada una con su precio de partida publicado en spindlelab.cl/servicios.`
3. (107) `Cuatro pasos: revisión gratis, conversación y propuesta, implementación por fases y acompañamiento mensual.`
4. (101) `21 señales en tres preguntas: ¿te pueden leer?, 30 puntos; ¿te entienden?, 40; ¿te pueden citar?, 30.`
5. (118) `El puntaje no dice si hoy te citan ni garantiza que te recomienden. Los motores usan fuentes ajenas, no solo tu sitio.`
6. (113) `Cierre: corre el chequeo en spindlelab.cl/diagnostico o pide la revisión de una página en spindlelab.cl/contacto.`

**2A**
1. (84) `Portada oscura: «Escribes tu dominio y ves 21 señales, ordenadas en tres preguntas.»`
2. (101) el mismo de la lámina 4 de la completa.
3. (118) el mismo de la lámina 5 de la completa.
4. (90) `Cierre: córrelo sobre tu sitio en spindlelab.cl/diagnostico. Leemos solo páginas públicas.`

**2B**
1. (88) `Portada oscura: «Puedes leer cuánto cuesta y cómo trabajamos antes de hablar con nadie.»`
2. (106) el mismo de la lámina 2 de la completa.
3. (107) el mismo de la lámina 3 de la completa.
4. (114) `Cierre: escríbenos la dirección de tu sitio en spindlelab.cl/contacto. Te respondemos con una página de hallazgos.`

## 9. Qué no dice la pieza, a propósito

- Ningún plazo («un día hábil» y «24 horas» están sin decidir; la revisión de octubre de un prospecto tardó 31 horas contra 24 prometidas), ningún resultado (consultas, ventas, que una IA te cite), ninguna cifra interna del outbound, ningún nombre de cliente ni de prospecto.
- **Ningún precio en las imágenes**, ni los seis juntos ni uno suelto. La lámina 2 lista las seis soluciones por nombre, dice que cada una publica su precio de partida y manda a `spindlelab.cl/servicios` (regla del 31-ago, reencuadrada el 1-sep; decisión C sin responder, ver `publicar.md` §2). La v2 inicial llevaba un «desde $490.000» rotulado «Un ejemplo»; la revisión independiente lo marcó porque no es el umbral de entrada que la regla deja pasar, y se sacó.
- **La cadencia de la medición** (mensual o quincenal: decisión 8 de `copy-secciones.md` §12). El paso 04 dice «volvemos a medir con el mismo criterio» y no dice cada cuánto.
- «Cómo medimos» para hablar del chequeo. En el sitio, «medir» es el protocolo con el que se le pregunta a los motores si te nombran (`/diagnostico/`, «Y cómo medimos si la IA te nombra»). El chequeo de 21 señales «lee tu sitio»; por eso se rotula «Qué mira el chequeo». El único «medir» de la pieza es el del paso 04 del método, que usa la palabra con el mismo sentido que el sitio.
- Que el resultado del chequeo traiga el detalle de **todas** las señales. En pantalla, las que se cumplen salen solo con su título; la explicación y cómo arreglarla salen en las que no se cumplen o no se pudieron confirmar (`public/diagnostico/index.html`, función que arma la lista). La portada de la 2A dice exactamente eso.
- Que la revisión incluya preguntarle a ChatGPT: hoy es un paso manual de Ramón y no una parte fija del servicio.
- «Cada fase termina con algo que apruebas» sin acotar: la lámina 3 lo dice solo para un sitio web, que es donde está probado.
- Nada de la Ley 21.719 ni de Verifica y Cumple.
