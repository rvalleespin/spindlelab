# Legal Prisma — las preguntas, y lo que el sitio puede y no puede responder

**Verificado el 9-sep-2026** con peticiones directas a www.legalprisma.cl (HTML público,
robots.txt, JSON-LD, WP REST API y sonda de user-agent). Todo lo de acá se puede volver a
comprobar; nada está inferido. **Para la llamada del vie 11, 10:00.**

> **Mecanismo:** es el de Citable («para qué preguntas servirías, y para cuáles no»), aplicado
> a mano. La lista de la derecha es la que vende: convierte el diagnóstico en una cotización
> con el alcance ya dibujado. Ver `marketing/encargos-otras-sesiones/chequeo-v2-brief-citable.md`.

---

## ⚠️ Primero: dos cosas del informe 006 que hay que decir mejor el viernes

No son errores de conclusión — **la conclusión se sostiene y ahora es más grave** — pero la
precisión importa, y Sebastián es abogado de ese mismo estudio.

**1. El robots.txt NO es el problema.** El informe dijo que bloquea a los rastreadores de
OpenAI, Anthropic y Google-Extended. Es cierto que los bloquea, pero **esos tres son bots de
entrenamiento**: no deciden las citas de hoy, y bloquearlos es una decisión legítima sobre
propiedad intelectual (es el default de Cloudflare). Su robots.txt incluso **autoriza
explícitamente la búsqueda**: `Content-Signal: search=yes` y `Allow: /`.

**2. El problema real es el servidor, y es peor.** Pedí la portada presentándome como cada
robot. Resultado de hoy:

| Se presenta como | Qué recibe | Qué significa |
|---|---|---|
| Navegador normal | **200** | la página completa |
| **OAI-SearchBot** | **403** | el índice con el que ChatGPT busca en la web |
| **ChatGPT-User** | **403** | el que entra en vivo cuando alguien pregunta en ChatGPT |
| **PerplexityBot** | **403** | Perplexity |
| **Claude-SearchBot** | **403** | Claude |
| Googlebot | 200 | Google y sus resúmenes de IA: pasa |
| Bingbot | 200 | Copilot: pasa |

**El robots.txt les da permiso y el servidor les cierra la puerta en la cara.** Google y Bing
entran; los buscadores de IA no. Eso no está escrito en ninguna parte del sitio: es una regla
del CDN que alguien activó sin saber qué apagaba.

*Caveat honesto que hay que decir tal cual:* nuestras peticiones salen de nuestro servidor, no
de los de OpenAI. Que responda 403 al nombre del agente prueba que **filtra por nombre**, y eso
afecta igual al robot de verdad. Lo que no podemos descartar desde afuera es que además filtre
por dirección de origen.

**3. Sí tienen material citable, y el informe lo subestimó.** Los artículos del blog llevan
`Article` + `FAQPage` con preguntas y respuestas marcadas. Lo que NO tiene marcado es lo que
vende: la home y las páginas de área (revisé 5 de 9: cero FAQ, cero `Service`, cero
`LegalService`; solo `WebPage` genérico).

**Cómo queda el argumento, mejor que antes:** *«Ustedes hicieron el trabajo difícil. Tienen 257
artículos que responden preguntas reales de cliente, y están bien marcados. El problema es que
los buscadores de IA reciben un 403 en la puerta: da lo mismo lo bueno que sea el contenido si
no lo pueden leer. Y las páginas que venden no responden ninguna pregunta.»*

---

## Los números actualizados (el informe decía 246)

- **257 artículos publicados**, y siguen: el último es del **7 de septiembre**, con cadencia de
  uno cada 3-4 días. Es un activo que crece.
- Distribución por tema (categorías del propio sitio): **Derecho Laboral 64** · Constitución de
  empresa 32 · Litigios 23 · Inversión extranjera 17 · Insolvencia 16 · Herencias 14 +
  Herencias y tributación 12 · Arrendamiento 10 · Boletas de honorarios 10 · Renta/F22 9 ·
  **Protección de Datos Personales 9** · Regímenes tributarios 9 · resto menor.
- **9 áreas de práctica**, ninguna de las 5 revisadas con una sola pregunta marcada.
- **9 profesionales** con currículum real y verificable en la portada.

---

## Lista A — Preguntas donde Legal Prisma SERÍA buena fuente

*(el material existe y es verificable; hoy la IA no lo puede leer por el 403)*

| Pregunta de un cliente real | Con qué responde el sitio hoy |
|---|---|
| ¿Qué abogado laboral con experiencia en sindicatos hay en Santiago? | Jorge Paredes: *«Magíster en Derecho del Trabajo y Seguridad Social de la Universidad Adolfo Ibáñez»*, litigante laboral en derecho individual y colectivo |
| ¿Quién me asesora en una auditoría con estándares internacionales? | Rodrigo Lacroix: *«más de 20 años… forjada como gerente en firmas como EY y KPMG»*, con emisiones *«144A Reg S y ADRs»* |
| ¿Dónde consulto por marcas y propiedad industrial en Chile? | Fernanda Olmedo: *«Entre 2017 y 2022 se desempeñó en el Tribunal de Propiedad Industrial (TDPI)»* |
| ¿Qué régimen tributario me conviene al crear mi empresa? | Artículos propios: *«SPA vs EIRL vs Sociedad de Profesionales: ¿cuál conviene para tu negocio?»*, *«Régimen ProPyme vs. Régimen General»* |
| ¿Cuánto se paga de impuesto a la herencia en Chile? | Artículo propio: *«Impuesto a la herencia en Chile: cómo se calcula y quién debe pagarlo»* |
| ¿Qué hago si el SII fiscaliza mi empresa? | Artículo propio: *«Qué hacer si el SII fiscaliza a tu empresa: errores que se deben evitar»* |
| ¿Dónde queda y en qué horario atienden? | *«Avenida Presidente Kennedy 7440, oficina 321, Vitacura»* · *«Lunes a viernes de 10 a 19 hrs»* |

**Todas las frases entrecomilladas están copiadas del sitio, verificadas contra el HTML.**

## Lista B — Preguntas donde NO servirían (esto es lo que se vende)

*(las hace el mismo cliente; el sitio hoy no las responde, ni marcado ni en texto)*

| Pregunta de un cliente real | Qué falta, concretamente |
|---|---|
| **¿Cuánto cobra un estudio así por constituir una SpA / una posesión efectiva?** | Ni un rango, ni una referencia, ni un «desde». Cero cifras de honorarios en todo el sitio |
| **¿Cuánto se demora una posesión efectiva o un juicio laboral?** | Ningún plazo declarado en ninguna de las 9 áreas |
| **¿Qué opinan los clientes de Legal Prisma?** | Cero testimonios, cero reseñas, cero casos. La palabra «testimonio» no aparece en el sitio |
| **¿Con qué empresas han trabajado?** | La sección «Algunos de Nuestros Clientes» son **logos en imágenes con el alt vacío o genérico** (`eo`, `eo (1)`, `Diseño sin título`). Solo 3 de ~13 tienen nombre legible. Para una máquina, esa sección está en blanco |
| **¿Cómo es el proceso para trabajar con ustedes, paso a paso?** | No existe. Solo un formulario de contacto con dos opciones |
| **¿Atienden mi industria en particular?** | Dice *«diversas industrias»* sin nombrar ninguna |
| **¿Qué es Legal Prisma?** (la pregunta de identidad) | El sitio nunca lo declara en datos: sin `Organization`, sin `LegalService`, sin `Person` para los 9 profesionales. Solo `WebPage` genérico |

---

## Cómo usar esto el viernes (no leerlo, conversarlo)

**Va en el bloque 2 (escuchar), después de la pregunta de los artículos.** El orden importa:
que él diga primero qué le preguntan sus clientes, y recién ahí mostrarle la lista B. Si la
lista sale antes que su respuesta, es una presentación; si sale después, es un espejo.

> «¿Qué es lo que más te preguntan los clientes antes de contratar? …
> Te muestro algo: estas son las preguntas que su sitio hoy no puede responder. No es que estén
> mal escritas: no están. Y son justo las que alguien hace antes de elegir un estudio.»

**El remate, que es el que abre la propuesta:**

> «Ustedes ya escriben, y escriben bien: 257 artículos, uno cada tres días. Lo que falta no es
> producir más contenido. Es que las páginas donde ustedes cobran respondan lo que la gente
> pregunta, y que la puerta esté abierta para que la máquina pueda leerlo.»

**Lo que NO se hace:** correr el chequeo público en pantalla. Los hallazgos van por el informe
y por este documento, que están verificados a mano.
