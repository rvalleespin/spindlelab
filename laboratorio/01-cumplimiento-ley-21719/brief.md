# Brief — Cumplimiento web de la Ley 21.719

**Abierto:** 3-sep-2026 · **Pedido por:** Ramón · **Estado:** en construcción, en
`laboratorio/ley-21719`. Primera versión de la landing lista y verificada (código, no
desplegada todavía — falta conectar el proyecto a Cloudflare Pages, ver §8). Camino B,
lanzamiento liviano, `verificaycumple.pages.dev` (gratis, el `.cl` sigue pendiente).
**Fecha que manda todo:** **1 de diciembre de 2026** (entrada en plena vigencia)

---

## 1. La oportunidad, en una línea

La Ley 21.719 de protección de datos personales entra en vigencia el 1-dic-2026. Aplica a
**toda organización que trate datos personales en Chile, sin importar su tamaño** — una pyme
con formulario de contacto ya está tratando datos personales. Buena parte de lo que exige
**es técnico y vive en el sitio web**, que es exactamente el oficio que ya existe acá.

Es demanda forzada por una fecha. No hay que convencer a nadie de que la necesita.

## 2. Lo verificado contra el texto oficial de la ley

> ✅ **Verificado el 3-sep-2026 contra el texto oficial** (BCN/Ley Chile, Ley 21.719, versión
> con vigencia diferida al 01-dic-2026, idNorma=1209272 —
> `https://www.bcn.cl/leychile/navegar?idNorma=1209272&f=2026-12-01`, url corta
> `https://bcn.cl/gJo3hf`). El PDF de la BCN se descargó y se extrajo su texto completo para
> citar artículos exactos. **Los datos de mercado (precios, competidores) siguen sin fuente
> primaria** — eso no se verifica contra un texto legal, solo contra la realidad del mercado,
> y siguen etiquetados como tal más abajo.

### Confirmado tal cual estaba en el brief original

- Promulgada 25-nov-2024, publicada 13-dic-2024. **Vigencia plena: 1-dic-2026** — el propio
  texto lo fija como "el día primero del mes vigésimo cuarto posterior a la publicación"
  (artículo primero transitorio). 24 meses exactos, confirmado.
- **Artículo primero** modifica la Ley 19.628 (hoy "sobre la vida privada", pasa a llamarse
  "sobre protección de los datos personales").
- Crea la **Agencia de Protección de Datos Personales**, con facultad de fiscalizar y de
  iniciar procedimiento sancionatorio **de oficio o a petición de parte** (regla especial del
  procedimiento sancionatorio), y administra el **Registro Nacional de Sanciones y
  Cumplimiento**, público y de acceso gratuito (Art. 39).
- **Atenuantes** (Art. 36): autodenuncia, colaboración con la investigación de la Agencia,
  reparación unilateral/acuerdos reparatorios con los titulares, y haber cumplido
  diligentemente los deberes de dirección y supervisión — certificado según el Art. 51 (el
  "modelo de prevención certificado" del brief original). Hay un quinto atenuante que el
  brief no listaba: ausencia de sanciones previas.
- **Multa máxima 20.000 UTM** existe, pero solo para infracciones **gravísimas** — ver
  corrección más abajo, la cifra sola sin ese matiz es engañosa.

### Correcciones (lo que las fuentes secundarias tenían mal o impreciso)

Esto importa porque el producto le va a decir a empresas qué les falta para cumplir — un
error acá no es un detalle de redacción, es exponer a alguien a información falsa sobre su
propio riesgo legal.

1. **"20.000 UTM o 4% de los ingresos anuales" no son dos techos paralelos — es una
   estructura escalonada, y el 4% solo aplica en reincidencia.** El texto real: infracciones
   leves → amonestación escrita o multa hasta 5.000 UTM; graves → hasta 10.000 UTM;
   gravísimas → hasta 20.000 UTM. El 2% (graves) o 4% (gravísimas) de los ingresos anuales
   **solo entra si hay reincidencia** (2+ sanciones en 30 meses) de una empresa que **no** sea
   "de menor tamaño" (Ley 20.416), y ahí la multa es la más alta entre 3 veces la multa
   original o ese porcentaje — no un tope fijo alternativo desde la primera infracción. Decir
   "puedes pagar hasta 4% de tus ingresos" a una pyme en su primera falta es alarmismo con
   datos incorrectos, exactamente lo que el guardrail de §5 prohíbe.

2. **"Notificación de brechas en 72 horas" no está en el texto — eso es RGPD europeo, no esta
   ley.** El Art. 14 sexies dice que el responsable debe reportar "por los medios más
   expeditos posibles y **sin dilaciones indebidas**", sin plazo numérico. Las fuentes
   secundarias mezclaron el estándar europeo con la ley chilena. Sacar "72 horas" de
   cualquier pieza pública; el criterio correcto es "sin dilación, por el medio más rápido
   disponible."

3. **"Derechos ARCOP" no es el acrónimo correcto para esta ley.** El Art. 14 ter, letra f)
   enumera acceso, rectificación, **supresión**, oposición y portabilidad — no "cancelación"
   (eso es terminología mexicana). El acrónimo que calza con el texto chileno sería ARSOP, o
   más seguro: listar los cinco derechos sin acrónimo.

4. **"Casilla desmarcada por defecto" es una inferencia razonable, no una cita literal.** El
   Art. 12 exige que el consentimiento sea previo, inequívoco, y se manifieste mediante "un
   acto afirmativo que dé cuenta con claridad de la voluntad del titular" — eso excluye
   casillas premarcadas porque el silencio no es un acto afirmativo, igual que en RGPD. Pero
   la ley nunca usa las palabras "casilla" ni "premarcada". El chequeo puede seguir
   evaluándolo (la inferencia es sólida), pero cualquier copy público tiene que decir
   "consentimiento mediante acción afirmativa", no citarlo como texto literal de la ley.

5. **La amonestación en vez de multa para pymes no es una regla permanente ni automática.**
   Es el **Art. sexto transitorio**: aplica solo durante los **primeros 12 meses desde la
   entrada en vigencia** (aprox. dic-2026 a dic-2027), y dice que la Agencia **"podrá"** — no
   "deberá" — aplicar amonestación en vez de multa. Es discrecional y con fecha de
   vencimiento, no un derecho garantizado de las pymes para siempre. El producto no puede
   prometer "tu primera multa es solo una amonestación" fuera de esa ventana de 12 meses, ni
   presentarlo como automático.

6. **No hay un artículo llamado "registro de tratamientos" ni el término "DPA" — pero el
   contenido que sí importa está, y es más preciso de lo que el brief resumía.** El hallazgo
   más útil de esta verificación es el **Art. 14 ter (Deber de información y transparencia)**:
   exige tener PÚBLICAMENTE DISPONIBLE en el sitio web, como mínimo, una lista de 12 puntos
   (política de tratamiento con fecha y versión; identificación del responsable y su
   representante; medio de contacto para solicitudes; categorías de datos, destinatarios,
   finalidades y base de legitimidad; medidas de seguridad; los cinco derechos y cómo
   ejercerlos; el derecho a recurrir ante la Agencia; transferencias internacionales y su
   nivel de protección; plazo de conservación; origen de los datos; derecho a revocar el
   consentimiento; existencia de decisiones automatizadas). Esto reemplaza al bullet suelto
   del brief original — es la base literal, verificable y con artículo citado del checklist,
   mejor que la paráfrasis de blogs. Sobre "DPA": la ley usa "responsable" y "encargado del
   tratamiento", y exige cláusulas contractuales o nivel adecuado de protección para
   transferencias internacionales (Art. 27-28) — sustenta la idea de "necesitas un contrato
   con tus proveedores extranjeros", pero "DPA" es la sigla en inglés del mundo RGPD, no un
   término de esta ley; usarla como jerga de mercado está bien, citarla como legal no.

7. **No mencionado en el brief original: el "delegado de protección de datos" NO es
   obligatorio para toda empresa.** Solo aparece como parte del "modelo de prevención de
   infracciones" — el programa de cumplimiento OPCIONAL que, si se certifica, sirve como
   atenuante (Art. 51). A diferencia del RGPD, donde el DPO es obligatorio para ciertos tipos
   de tratamiento, acá es voluntario. No prometerle a cada prospecto que "necesita nombrar un
   DPO".

8. **La ley nunca usa la palabra "cookie".** Es tecnológicamente neutra: regula el
   consentimiento para tratar datos personales en general (Art. 12), y un banner de cookies es
   la forma en que la práctica de mercado (igual que en RGPD, que tampoco es una "ley de
   cookies") aplica esa regla general a rastreadores. Es una interpretación defendible, no una
   cita — lo mismo que el punto 4.

**Sobre los datos de mercado (sin cambios, siguen sin fuente primaria):** ~$49.990 por informe
técnico (Presencia 360) · ~$149.000 por implementación (ProtecciónDatosWeb, regalada como
lanzamiento hasta el 30-nov-2026) · implementación en menos de 30 días (Klevo) · y al menos una
plataforma gratuita (cumple21719.cl). Esto es lectura de mercado, no verificación legal —
sigue viniendo de blogs de proveedores y no hay como contrastarlo contra un texto oficial.

Fuentes secundarias originales (precios/competencia, no para afirmaciones legales):
preyproject.com/es/blog/ley-de-proteccion-de-datos-en-chile ·
klevo.cl/blog/ley-21719-proteccion-datos-sitio-web-chile-2026/ · privacidadweb.cl/aprende/ley-21719 ·
presencia360.cl · protecciondatosweb.cl · xepelin.com/blog/pymes/desafios-pymes-chile

## 3. Las cuatro ideas, en orden de calce

1. **El chequeo gratuito de Ley 21.719 — el mismo motor, otra checklist.** El chequeo de 21
   señales que ya existe es un Worker que descarga un sitio y evalúa reglas técnicas. Acá
   cambia la checklist, no el producto — **con matices: ver §4, no todas las señales caen
   limpio en el patrón actual.** Gratis, sin registro, con la fecha en pantalla.
2. **Kit de implementación a precio fijo.** Alcance y precio cerrados, dentro del rango que
   ya cobra el mercado. La parte que vale es la recurrente: el contenido del Art. 14 ter se
   mantiene publicado y actualizado, y la normativa se va a mover.
3. **Vender a los proveedores, no a las empresas.** La ley exige acuerdos de tratamiento con
   todo encargado que procese datos por cuenta de otro (Art. 27-28 para el caso
   internacional): agencias, desarrolladores, integradores de CRM tienen dos problemas —
   cumplir ellos y poder entregarle a sus clientes algo que cumpla. Venderle a una agencia con
   30 clientes alcanza 30 sitios. Venta a pares, white-label.
4. **Descartada con criterio:** la Ley 21.663 de ciberseguridad (ANCI) suena parecida pero
   obliga solo a organismos del Estado y operadores de servicios esenciales. Universo chico,
   venta larga, requisitos que no son este oficio. No confundirla con la otra.

## 4. Factibilidad técnica del chequeo, señal por señal

Evaluado contra la arquitectura real de `spindlelab-astro/functions/api/chequeo.js`: una
Cloudflare Pages Function que hace 4 `fetch()` en paralelo (home, robots.txt, llms.txt,
sitemap.xml), con timeout de 8s y tope de 900KB por recurso, y analiza el HTML crudo con
regex — **no ejecuta JavaScript, no hay DOM, no hay navegador.** Esa arquitectura es rápida,
gratis de operar y es la razón de que el chequeo actual sea instantáneo y sin registro.

### A. Fácil — mismo patrón, fetch + regex, sin tocar la arquitectura

- **¿Existe una política de privacidad/tratamiento de datos?** Buscar en el HTML de la home un
  `<a>` cuyo texto o `href` matchee "privacidad", "proteccion de datos", "aviso legal", y
  opcionalmente hacer un segundo fetch a esa URL para confirmar que responde 200. Mismo patrón
  que ya usa el Worker para robots/llms/sitemap.
- **¿Esa política menciona los puntos del Art. 14 ter?** Con el texto plano de esa página, buscar
  por palabras clave (derechos, transferencia internacional, plazo de conservación, contacto del
  responsable, etc.). **Ojo:** esto detecta presencia de palabras, no que el contenido sea
  legalmente correcto o completo — hay que declararlo así en el copy, igual que el chequeo
  actual declara sus propias limitaciones (ej. la nota sobre Cloudflare y robots.txt gestionado).
- **Banner de cookies de un proveedor conocido** (Cookiebot, OneTrust, Osano, iubenda, CookieYes,
  Axeptio, Complianz, Klaro, tarteaucitron) — detectable por el `<script src>` o strings
  características en el HTML crudo. Fácil.
- **Presencia de scripts de terceros que procesan datos** (gtag.js/GA4, GTM, fbevents.js/Meta
  Pixel, Hotjar, Clarity) — solo "¿existe el script?", no su comportamiento. Sirve como bandera
  de "tienes proveedores que necesitan contrato" (punto 6 de §2), no como prueba de
  incumplimiento.
- **Consent Mode declarado inline** — buscar `gtag('consent', 'default'` en el HTML si está
  inline en el documento. Solo funciona si no vive dentro de un contenedor GTM externo (ver C).
- **Formulario HTML plano con checkbox premarcado** — detectable solo si el formulario está en
  el HTML que llega en el fetch inicial, con el atributo `checked` visible. No detectable si es
  un iframe de terceros (HubSpot, Typeform, Google Forms) o si un framework JS lo renderiza en
  el cliente.
- `lang="es-CL"` ya existe en el motor actual, reutilizable tal cual.

### B. Heurística débil — factible pero hay que declarar el límite

- **"GA4 o el Pixel de Meta disparan antes del consentimiento"** — esto es lo que el brief
  vende como el diferencial estrella ("lo que un vendedor de plantillas no puede detectar"), y
  es exactamente lo que la arquitectura actual **no puede probar**. Un solo fetch de HTML
  crudo no observa comportamiento en tiempo de ejecución. Lo máximo que da el patrón actual es
  una heurística: "encontramos el script de GA4/Meta sin gating de consentimiento visible en
  el HTML" — con falsos positivos (el gating puede vivir en un JS externo no analizado, o
  dentro del contenedor de GTM, que es una caja negra hospedada por Google y no se ve desde
  afuera) y falsos negativos posibles. Es una sospecha razonable para priorizar, no una prueba.

### C. No factible con la arquitectura actual — requiere una pieza nueva

- **Verificar en runtime si un tracker realmente dispara antes del consentimiento** (cookies
  puestas al cargar antes de cualquier clic, orden real de requests de red) requiere renderizar
  el sitio en un navegador real. Cloudflare tiene "Browser Rendering" (Puppeteer/Playwright
  sobre Workers) — sigue siendo la misma infraestructura (cumple la regla 2 del laboratorio,
  no hay que aprender un oficio nuevo), pero es un salto real: de ~1s por chequeo (4 fetches en
  paralelo) a varios segundos por levantar un Chromium headless; tiene un costo de invocación
  aparte del plan de Pages Functions actual; y probablemente rompe la propuesta de valor de
  "gratis, sin registro, instantáneo" que tiene el chequeo hoy.
- **Casilla premarcada en formularios renderizados por JS o embebidos en iframe de terceros** —
  mismo problema: sin navegador real, el chequeo queda ciego para una porción importante de
  sitios B2B en Chile que hoy corren sobre esos widgets.
- **Que exista efectivamente un contrato con cada proveedor externo** — esto nunca es visible
  desde el sitio público, sin importar cuánta tecnología se use. Es un documento interno. Lo
  único que el chequeo puede hacer es señalar los proveedores externos detectados y advertir
  que cada uno necesita su contrato.
- **Registro interno de tratamientos, brecha efectivamente notificada, delegado de protección
  nombrado** — todos organizacionales, no visibles desde afuera bajo ninguna arquitectura.

### Conclusión de factibilidad

La mayoría de las señales nuevas que propone la idea 1 (política presente, banner de un CMP
conocido, scripts de terceros presentes, contenido de la política vs. Art. 14 ter por palabra
clave, lang) caen limpio en "cambia la checklist, no el producto" — mismo patrón fetch+regex
que ya existe, costo marginal bajo. Pero el gancho que el brief vende como el gran diferencial
— si GA4/Meta disparan antes del consentimiento — no cae en ese patrón: es una pieza de
infraestructura distinta (navegador headless), con costo, latencia y honestidad de la
afirmación distintos, y aun con esa inversión solo da una heurística, nunca una prueba
definitiva. Dos caminos honestos, no excluyentes:

- **(a) Lanzar liviano:** vender la detección de terceros como "te avisamos qué scripts
  tienes instalados, no si disparan antes o después del consentimiento" — más barato, más
  rápido, y coherente con el guardrail de §5 ("el chequeo describe, no certifica").
- **(b) Invertir en navegador real solo para la parte paga** (kit de implementación, idea 2),
  no en el chequeo gratuito — ahí sí se puede ofrecer una medición más fuerte como parte de lo
  que se cobra, sin comprometer la velocidad del gancho gratuito.

**Decisión de Ramón (3-sep-2026): (a), lanzamiento liviano.** El chequeo gratuito sale con
fetch+regex sobre el mismo patrón de `chequeo.js` — sin navegador real, sin ejecutar JS. La
detección de scripts de terceros se comunica como "qué tienes instalado", no como "si dispara
antes o después del consentimiento". Navegador real (Browser Rendering) queda descartado para
esta primera versión; solo vuelve a la mesa si el kit de implementación (idea 2) lo justifica
más adelante.

## 5. Guardrails (no negociables)

- **No se da asesoría legal.** El texto de la política de privacidad y la evaluación jurídica
  son de abogado. Acá se hace **la capa técnica**. Consecuencia útil: conviene una alianza con
  un abogado, que además es canal de derivación en las dos direcciones.
- **El chequeo describe, no certifica.** Jamás decirle a una empresa que "cumple". Se reportan
  **señales técnicas presentes o ausentes**, con la instrucción de cómo corregir cada una.
  Decirle "cumples" a quien no cumple es exponerlo a una multa y exponerse a uno mismo.
- **Cero prueba social inventada** y cero cifras sin fuente. Aplica la regla de la casa.
- **Nada de alarmismo.** El gancho es la fecha y el hecho, no el miedo. La verificación de §2
  ya encontró dos casos concretos de esto: nombrar la multa máxima de 20.000 UTM o el 4% de
  ingresos como si fuera lo que le va a pasar a una pyme en su primera infracción es mentir —
  la estructura real es escalonada y el 4% solo aplica en reincidencia de empresas que no son
  pequeñas (Art. 20.416).
- **Nunca citar como texto literal de la ley algo que es inferencia o jerga de mercado.**
  "72 horas" para brechas no está en el texto (es RGPD). "ARCOP" no es el acrónimo que usa
  esta ley (es "acceso, rectificación, supresión, oposición y portabilidad" — Art. 14 ter,
  letra f). "DPA" y "casilla desmarcada" son forma correcta de pensar el problema, no palabras
  del texto — decirlo como inferencia razonable, no como cita.
- **No consume la atención de la agencia.** Costo declarado por pieza, y si choca con un pase
  de contenido o con un cliente, gana la agencia.

## 6. La decisión de marca — los dos caminos

**¿Esto va bajo la marca SpindleLab o como marca aparte?** No está decidido, y cambia todo lo
demás (dominio, sitio, voz, si el chequeo vive en `spindlelab.cl` o en otro lado). Los dos
caminos, con el mismo nivel de detalle, para que Ramón elija:

### Camino A — Bajo SpindleLab

- Vive en `spindlelab.cl` (subruta o landing dentro del sitio actual), reutilizando el dominio
  y el tráfico que ya llega al chequeo de visibilidad en IA existente — cross-sell directo en
  las dos direcciones, sin nueva cuenta ni nuevo calendario editorial.
- Reutiliza el sistema de marca ya construido (`manual-de-marca.md`, tipografía, dorado, tono,
  las sesiones/skills existentes) — cero trabajo de diseño de marca nueva.
- **Riesgo:** SpindleLab se reposicionó en agosto-2026 específicamente en "SEO técnico +
  visibilidad en motores de IA (AEO/GEO)". Cumplimiento legal es una categoría de compra
  distinta — el comprador puede ser el mismo gerente pyme, pero la intención de búsqueda no
  tiene nada que ver con SEO/AEO. Mezclarlo diluye qué es SpindleLab en la mente de quien ya
  la conoce, y en SEO propio: una página de "cumplimiento legal" en el dominio que se
  posicionó para "SEO técnico" puede confundir la relevancia temática que el buscador o la IA
  le asignan al dominio para su tema núcleo.
- **Costo de atención:** el más bajo de los dos caminos al arrancar, porque no hay nada nuevo
  que construir de marca — solo la checklist técnica (§4) y el contenido legal (con abogado).

### Camino B — Marca aparte, firmada por Ramón

- Dominio propio nuevo (el nombre queda fuera de este documento — es una decisión aparte).
  Sitio propio, chico, una sola promesa: "tu sitio cumple con la Ley 21.719 antes del
  1-dic-2026." Sin mezclarlo con SEO/AEO.
- Usa el mismo motor técnico: el patrón de `chequeo.js` se clona con otra checklist y se
  despliega como un segundo proyecto de Cloudflare Pages. Bajo Cloudflare esto es un
  despliegue nuevo, no una tecnología nueva.
- "Firmada por Ramón" significa que la marca nueva se apoya en su perfil personal (nombre,
  LinkedIn, credibilidad técnica ya construida ahí) — no en el de SpindleLab. Coherente con la
  regla de voz existente (perfil personal en singular).
- **Riesgo:** hay que construir confianza, dominio y contenido desde cero, en una ventana de
  apenas 3 meses (ya es un sprint según §7). Necesita mínimo: nombre + dominio + landing +
  chequeo + un canal de distribución (probablemente el mismo LinkedIn personal de Ramón,
  reutilizado, no uno nuevo) + separación clara de calendario y atención respecto a
  SpindleLab (guardrail de §5: si choca con la agencia, gana la agencia).
- **Ventaja no mencionada antes:** si la idea gradúa (regla 2 de `laboratorio/README.md`), ya
  nace en su propio dominio y repo — no hay nada que desenredar después. Bajo SpindleLab, si
  algún día hay que separarlo, hay que desenredar contenido, SEO y backlinks de un dominio
  compartido.
- **Costo de atención:** más alto al arrancar (construir marca desde cero), más bajo el riesgo
  de diluir el posicionamiento que SpindleLab recién afiló.

**Decisión de Ramón (3-sep-2026): Camino B.** Marca aparte, dominio propio, firmada por
Ramón — no bajo SpindleLab.

**Nombre y dominio (3-sep-2026, revisado):** `verificaycumple` se mantiene como nombre, pero
**sin comprar el `.cl`** — a US$64.99/año vía Vercel, Ramón lo marcó como gasto que no puede
asumir ahora. **Arranca gratis en `verificaycumple.pages.dev`**, el subdominio que Cloudflare
Pages entrega sin costo al crear el proyecto — misma plataforma donde ya vive `chequeo.js`,
sin tecnología nueva, y sigue siendo un dominio propio y separado de `spindlelab.cl` (Camino B
intacto). Es menos "sitio chileno profesional" a primera vista que un `.cl`, pero sirve para
validar sin gastar nada. **Si la idea empieza a generar ingresos, ahí se justifica pagar el
`.cl`** — y conviene cotizarlo directo con un registrador chileno (NIC Chile o un revendedor
local) en vez de Vercel: un `.cl` ahí suele salir CLP 10.000-20.000/año (~US$10-20), bastante
menos que el precio que cotizó Vercel.

**Secuencia acordada (3-sep-2026):** landing primero (idea 1 de §3, el chequeo gratis, con la
checklist de §4 y el lanzamiento liviano ya decidido), monetización después (idea 2 de §3, el
kit de implementación a precio fijo).

**Arquitectura respecto a SpindleLab (3-sep-2026), confirmada tras revisar tres opciones:**
Ramón preguntó si convenía que la landing saliera del propio `spindlelab.cl` para generar
autoridad de dominio. Se evaluaron tres caminos — subruta (`spindlelab.cl/ley-21719`, hereda
autoridad directa pero revierte la decisión de marca aparte y vuelve a exponer el riesgo de
diluir el posicionamiento SEO/AEO de Camino A), subdominio (`cumplimiento.spindlelab.cl`, ni
la autoridad limpia de una subruta ni la separación limpia de un dominio propio), y **dominio
separado con enlace cruzado** — y Ramón confirmó el tercero. `verificaycumple.cl` se mantiene
como dominio propio (Camino B sigue en pie), y se suma una pieza nueva: **una página o post en
`spindlelab.cl` que mencione y enlace a `verificaycumple.cl`**, para capturar algo de
autoridad cruzada en las dos direcciones sin mezclar los temas ni los posicionamientos. Esa
página se agrega al alcance de "landing" en la secuencia de arriba — no es un paso aparte.

Cuando arranque la construcción, corresponde abrir `laboratorio/ley-21719` a partir de esta
rama (regla 3 de `laboratorio/README.md`) para no mezclar el trabajo del proyecto con el resto
del laboratorio.

## 7. Reparo de fondo, escrito para que no se olvide

**La ventana se cierra el 1-dic-2026.** Después la urgencia baja mucho y lo que queda es el
retainer de mantención, que es bastante más chico. Esto es un **sprint de tres meses**, no un
negocio permanente. Tratarlo como sprint desde el día uno evita la decepción de enero.

## 8. Registro

| Fecha | Qué pasó |
|---|---|
| 2026-09-03 | Brief abierto. Nada construido. Pendiente: decisión de marca (§6) y verificación contra el texto oficial de la ley (§2). |
| 2026-09-03 | Verificación contra el texto oficial hecha (BCN/Ley Chile, idNorma=1209272) — 6 correcciones encontradas, la más importante: "72 horas" para brechas no existe en el texto (es RGPD) y "20.000 UTM o 4%" no son techos paralelos desde la primera infracción. Factibilidad técnica del chequeo señal por señal hecha contra `chequeo.js` real — el diferencial estrella (GA4/Meta disparando antes del consentimiento) no cae en la arquitectura actual, necesita navegador real. Los dos caminos de la decisión de marca (§6) desarrollados con el mismo detalle. Nada construido todavía; decisión de marca sigue pendiente de Ramón. |
| 2026-09-03 | **Decisión de Ramón: Camino B** (§6) — marca aparte, dominio propio, firmada por Ramón, no bajo SpindleLab. **Y lanzamiento liviano** (§4) — el chequeo gratuito sale con fetch+regex, sin navegador real; Browser Rendering queda descartado para esta versión. Falta: nombre y dominio de la marca nueva. Sigue sin construirse nada; cuando arranque la construcción, abrir `laboratorio/ley-21719` desde esta rama. |
| 2026-09-03 | **Nombre y dominio: `verificaycumple.cl`** — verificado disponible por Vercel, $64.99 USD/año, compra sin ejecutar (pendiente de confirmación explícita de Ramón, es gasto real). **Secuencia acordada: landing (idea 1, el chequeo gratis) primero, monetización (idea 2, el kit) después.** Sigue sin construirse nada. |
| 2026-09-03 | Ramón preguntó si la landing podía salir del propio `spindlelab.cl` para generar autoridad. Se evaluaron subruta, subdominio y dominio separado con enlace cruzado — **confirmó dominio separado con enlace cruzado**: `verificaycumple.cl` se mantiene (Camino B sigue en pie), y se suma al alcance de la landing una página/post en `spindlelab.cl` que lo enlace. Compra del dominio sigue sin confirmarse. Sigue sin construirse nada. |
| 2026-09-03 | Ramón no puede asumir los US$64.99/año del `.cl` ahora. **Se descarta comprar dominio por el momento** — arranca gratis en `verificaycumple.pages.dev` (subdominio sin costo de Cloudflare Pages, misma plataforma que `chequeo.js`). El `.cl` queda para cuando la idea genere ingresos, y ahí cotizar directo con un registrador chileno (~CLP 10.000-20.000/año) en vez de Vercel. Camino B y el enlace cruzado con `spindlelab.cl` siguen en pie. Sigue sin construirse nada. |
| 2026-09-03 | **Arrancó la construcción**, en `laboratorio/ley-21719` (abierta desde esta rama, regla 3). Primera versión de `verificaycumple/`: `functions/api/chequeo.js` (checklist liviana de §4 categoría A — política de privacidad enlazada y accesible, HTTPS, idioma, gestor de consentimiento conocido; proveedores externos/Consent Mode/casilla van sin puntuar, como informativos) e `index.html` (hero + resultado, explicador de qué revisa y qué no, aviso de que no es asesoría legal, enlace a `spindlelab.cl` en el footer). Probado end-to-end con Node (lógica del chequeo) y Playwright/Chromium headless (flujo completo contra `spindlelab.cl` real, desktop/mobile/dark/foco de teclado) — un bug de layout encontrado y corregido en esa verificación. Paleta y tipografía propias, sin gold ni Gabarito/Inter de SpindleLab. **Pendiente:** desplegar en Cloudflare Pages (necesita acceso a la cuenta, que esta sesión no tiene) y construir la página de enlace cruzado en `spindlelab.cl` (el lado `spindlelab → verificaycumple` — el inverso ya está en el footer). |
| 2026-09-03 | Instrucciones dadas a Ramón para conectar `verificaycumple/` a un proyecto nuevo de Cloudflare Pages (dashboard, rama `laboratorio/ley-21719`, root directory `verificaycumple`) — sin tocar el proyecto de `spindlelab-astro`. Ramón propuso promocionar la landing reusando el video del lunes 7-sep y subiendo ads de Google. **Se marcó el choque real:** ese video ya es el lanzamiento de marca de SpindleLab (guion, utilería y b-roll listos), y reusarlo revierte la separación de Camino B; ads de Google no está disponible en esta sesión y es dominio de persona-paid-media, nunca sin confirmación de presupuesto. Ramón aceptó la alternativa: dejar el video del lunes intacto y armar una pieza aparte. Se redactó un post personal (voz singular de Ramón, hallazgo real y verificado: el mito de las "72 horas" no está en el texto de la ley) y se dejó como encargo en `marketing/encargos-otras-sesiones/verificaycumple-post-personal-cata.md` (en `main`, para que Cata lo tome) — bloqueado hasta que el sitio esté desplegado y pase el filtro de tono + revisión humana. |
