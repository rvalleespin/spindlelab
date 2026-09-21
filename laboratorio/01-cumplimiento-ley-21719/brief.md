# Brief — Cumplimiento web de la Ley 21.719

**Abierto:** 3-sep-2026 · **Pedido por:** Ramón · **Estado:** **alcance planeado completo**
(8-sep-2026) — chequeo desplegado y vivo en `https://verificaycumple.pages.dev`, enlace
cruzado en ambas direcciones ya en vivo (incluido en `spindlelab.cl/diagnostico/`). Camino B,
lanzamiento liviano, `.cl` propio sigue pausado por costo. **Abierto (corregido 9-sep, ver
estado consolidado §2.2 y fila 9-sep de más abajo):** (1) el post de Cata, desbloqueo
pendiente en su encargo; (2) reconectar `verificaycumple` por el dashboard de Cloudflare;
(3) el Figma de referencia bloqueado (Community) — matarlo, sin fecha de revisión; (4)
**resuelto 9-sep** — Ramón comparó el rediseño explorado en Figma (foto/calma) contra lo
"más vendible" ya desplegado y **se queda con lo desplegado**; el Figma no se lleva a código.
(5) **nuevo 9-sep** — construir la sección de kit de implementación a precio fijo (idea 2
del brief, ver §3 y la fila de hoy) en `laboratorio/ley-21719`, **desde una sesión en el
clon bueno** (`~/Projects/spindlelab`), no desde esta copia de iCloud.
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
| 2026-09-08 | **Desplegado.** Ramón creó un token de API de Cloudflare acotado (solo `Cloudflare Pages: Edit`, 1 día de vigencia) y esta sesión creó el proyecto por API — sin dashboard, apuntando al repo `rvalleespin/spindlelab`, rama `laboratorio/ley-21719`, root directory `verificaycumple`. Deploy disparado y verificado en producción: `https://verificaycumple.pages.dev` responde 200 y `/api/chequeo?dominio=spindlelab.cl` da el mismo resultado (36/100) que en las pruebas locales. Token recomendado revocar apenas terminó, no esperar a que expire solo. **Pendiente:** la página de enlace cruzado en `spindlelab.cl` (el sentido inverso) y el post de Cata, que ya puede salir de su bloqueo porque el sitio ya está vivo. |
| 2026-09-08 | **Enlace cruzado del lado `spindlelab.cl` armado.** Ramón pidió explícitamente que esta sesión lo construyera. Se detectó que la copia local de `diagnostico/index.html` estaba desactualizada (otra sesión había desplegado "MOTOR v2" ahí mismo) — se partió de `origin/main` fresco para no pisar ese trabajo. Sección nueva entre "Dos caminos, y ninguno te cobra" y el FAQ, dejando explícito que no es un servicio de SpindleLab sino un proyecto aparte de Ramón; sin dorado (escaso, ya en uso en esa página). Verificado con Playwright, desktop y mobile. **No se hizo push directo a `main`** — por la regla de límite de sesión de `persona-disenador-web` y porque hay evidencia de edición concurrente reciente en `spindlelab-astro`, quedó en la rama `claude/verificaycumple-mencion-diagnostico`, pendiente de que Ramón revise y confirme el merge. |
| 2026-09-08 | **PR abierto:** [rvalleespin/spindlelab#34](https://github.com/rvalleespin/spindlelab/pull/34), a pedido de Ramón. Contiene la sección de enlace cruzado de la fila anterior. Pendiente de que Ramón lo revise y confirme el merge a `main`. |
| 2026-09-08 | **Ramón revisó y confirmó — PR #34 fusionado a `main`** (merge commit, no squash), verificado en vivo en `https://spindlelab.cl/diagnostico/`. **Con esto, el alcance planeado del proyecto queda completo:** verificación legal (§2), chequeo técnico desplegado (`verificaycumple.pages.dev`), y el enlace cruzado en ambas direcciones. Queda abierto: el post de Cata (encargado, esperando su pase de tono) y el dominio `.cl` propio (pausado por costo, para cuando genere ingresos). Sin fecha de cierre — sigue siendo el sprint hasta el 1-dic-2026 de §7. |
| 2026-09-08 | **Rediseño visual de `verificaycumple`** (Ramón: "le falta diseño", activó `persona-disenador-web`). Identidad propia sin fuentes ni imágenes externas: motivo de "sello de verificación" en SVG (header, marca de agua del hero, footer), paleta con papel cálido + acento terracota (distinto del teal de "verificado"), jerarquía tipográfica más fuerte, anillo de progreso SVG para el puntaje, tarjetas comparativas para "qué revisa / qué no revisa". Verificado con Playwright (desktop, mobile, dark mode, foco) — un bug (bloque vacío dejando un hueco) encontrado y corregido antes de subir. **Hallazgo operativo:** el proyecto de Cloudflare Pages creado por API no quedó con el webhook de auto-deploy en push (sí lo tiene `spindlelab-astro`, conectado por el dashboard) — cada push a `laboratorio/ley-21719` requiere disparar el deploy a mano por API hasta que alguien lo conecte por el dashboard. Token de Cloudflare de Ramón seguía activo y sin revocar desde el primer despliegue; se reutilizó y se le insistió de nuevo en revocarlo. |
| 2026-09-08 | **Token de Cloudflare revocado por Ramón** — confirmado (la API responde "Invalid API Token"). Pendiente real: reconectar `verificaycumple` por el dashboard para que quede con auto-deploy en push, como `spindlelab-astro`; mientras tanto, cualquier cambio futuro necesita un token nuevo y disparar el deploy a mano. |
| 2026-09-08 | **Segundo rediseño, "más vendible"** (Ramón, vía `/persona-disenador-web`). Se revisaron referentes reales del rubro (Vanta, iubenda) para principios aplicables, descartando lo que exige inventar prueba social (logos, testimonios, cifras — no hay clientes todavía). Se sumó: mockup de "ejemplo ilustrativo" en el hero (etiquetado sin ambigüedad), iconos por categoría en la comparación, sección "Los 12 puntos del Art. 14 ter" (contenido real de la ley), sección de ayuda con CTA honesto a `hola@spindlelab.cl`, grano de textura y numeración en serif del sistema, reveal-on-scroll con red de seguridad a 1.5s. Verificado con Playwright — con un matiz metodológico: las capturas de página completa sin scroll real daban falsos positivos (contenido "invisible", header duplicado) por cómo Playwright stitchea con `position: sticky` y reveal-on-scroll; se confirmó con scroll real que ambos funcionan bien. Código en `laboratorio/ley-21719`, **sin desplegar todavía** — necesita un token de Cloudflare nuevo (el anterior está revocado) o que se conecte el proyecto por el dashboard. |
| 2026-09-08 | **Rediseño "más vendible" desplegado y verificado en vivo** — Ramón dio un tercer token acotado de Cloudflare (`Cloudflare Pages: Edit`), se disparó el deploy por API (commit `4267d39`) y se confirmó en `https://verificaycumple.pages.dev`: mockup de ejemplo, los 3 pasos, la sección del Art. 14 ter y el chequeo real (`/api/chequeo`, 200 OK) todos en producción. Token recomendado revocar apenas se confirme que ya no se necesita, como las veces anteriores. Se intentó además conectar el archivo de Figma Community que le gustó a Ramón (`Straightforward-Brand-Guidelines--Community-`) vía MCP: bloqueado, la API de Figma no da acceso a archivos de Community sin duplicarlos primero a los borradores de la cuenta conectada. **Sigue pendiente:** reconectar el proyecto por el dashboard de Cloudflare para tener auto-deploy en push (hoy cada cambio requiere token + disparo manual), y decidir cómo ver el Figma de referencia (captura de Ramón, duplicar el archivo, o sesión local con su navegador). |
| 2026-09-09 | **Sesión troncal — estado consolidado** ([`laboratorio/estado-consolidado.md`](../estado-consolidado.md)). Verificado en vivo, no asumido: `verificaycumple.pages.dev` responde 200 con el rediseño "más vendible" servido; `/api/chequeo?dominio=spindlelab.cl` da 200 y **36/100**, el mismo puntaje del despliegue del 8-sep; el enlace cruzado está vivo en `spindlelab.cl/diagnostico/` apuntando a `verificaycumple.pages.dev`, y el inverso también; el commit desplegado (`4267d39`) sigue siendo el HEAD de `laboratorio/ley-21719`, o sea no hay código sin desplegar; y "72 horas" aparece 0 veces en el HTML vivo — los guardrails de §5 llegaron al producto. **Cuatro descalces encontrados:** (1) `laboratorio/ley-21719` nunca volvió a `laboratorio/ideas` ni trajo `main` — está 42 commits detrás de `ideas` y 24 de `main`, su copia del brief está congelada el 3-sep, y **es la rama desde la que Cloudflare construye producción**, así que cerrarla como manda la regla 3 apagaría el sitio; (2) el encabezado de este brief declara un pendiente abierto y el registro deja tres; (3) el encargo de Cata en `main` sigue bloqueado por "el sitio todavía no está desplegado", condición caducada el 8-sep — esa es la razón de que el post lleve seis días pegado, no un pase de tono; (4) no visto antes: **`spindlelab.cl` da 36/100 en el chequeo que ahora enlaza** — sin política de privacidad (404 en las cuatro rutas probables), sin gestor de consentimiento, con GA4 + GTM + Meta Pixel, y `/contacto/` enviando nombre y correo a `api.web3forms.com`; el propio `verificaycumple.pages.dev` también da 36/100. **Nada construido ni rediseñado** — todo queda como encargos E1-E7 en el estado consolidado. Ramas: sin señal de otra sesión en el laboratorio; `claude/verificaycumple-mencion-diagnostico` quedó huérfana pero ya fusionada (borrable), como otras 25 del repo. |
| 2026-09-09 | **Exploración de un tercer rediseño visual, en Figma nativo** (Ramón, en una sesión de parte sin acceso a `laboratorio/ley-21719` ni a este brief hasta este punto — se enteró de los dos rediseños ya desplegados solo al escribir esta fila). **No es el Figma de referencia bloqueado** de la fila 8-sep (el archivo Community "Straightforward Brand Guidelines", pendiente (3) del encabezado) — es un archivo nuevo, `file_key YvOMi6hmHsYwsMF0xZVjia` ("Verifica y Cumple — Landing", en los borradores de la cuenta de Ramón), construido desde cero con la Plugin API de Figma (`use_figma`) después de que varias rondas de mockups HTML/CSS (Claude Design) salieran planas y fueran rechazadas. Dirección explorada: foto real de cielo/nubes en el hero (el "ánimo de calma/seguridad" que Ramón pidió explícitamente, distinto de lo desplegado), Instrument Serif + Inter + Space Mono reservado a datos/etiquetas, investigada con Refero (estilos `Duna`, `Vectary`, `Programa`). Cubre hero + 4 secciones (qué es esto/no es, sí/no revisa, los 12 puntos del Art. 14 ter, cierre) con el copy real ya publicado en `verificaycumple.pages.dev` — nada inventado, corregido en el camino un dato que sí se había inventado ("DPO" como chequeo, que no existe en el producto real). **Hallazgo de implementación (nav):** un nav fijo sobre esta foto necesita **dos estados según el scroll** — vidrio oscuro + texto blanco mientras está sobre la foto del hero; vidrio claro (blanco ~72% opacidad + blur) y texto oscuro una vez que el scroll pasa a las secciones claras del cuerpo. Verificado probando el tratamiento oscuro sobre una sección clara: se leía como una franja gris ajena, sin integrarse. Es el mismo patrón de nav adaptable que usa `Duna` (una de las referencias). En código: dos clases/estados del nav alternados por un listener de scroll (umbral = borde inferior del hero), no un solo tratamiento fijo. **Sin reconciliar con lo real — decisión de Ramón, no de una sesión:** esta dirección (foto/calma) es visualmente distinta del rediseño "más vendible" ya desplegado y verificado (papel cálido + terracota + sello de verificación). Nadie ha comparado ambas ni decidido si el Figma reemplaza lo desplegado, lo informa parcialmente (p.ej. solo la idea del nav adaptable), o se descarta. El archivo vive solo en Figma — no hay código ni commit asociado todavía. |
| 2026-09-09 | **Ramón vio el sitio real en vivo (esta sesión abrió `verificaycumple.pages.dev` con captura headless, no solo el HTML) y decidió: se queda con el rediseño "más vendible" ya desplegado.** El Figma de foto/calma explorado en la fila anterior queda descartado como dirección visual — no se lleva a código. Feedback textual de Ramón sobre el título actual del hero ("¿Tu sitio tiene las señales que exige la Ley 21.719?"): "muy fome", pidió algo "más ingenioso" y propuso el ángulo **"¿Estás seguro?"** (doble sentido: certeza/seguridad). Encargó además: (a) hacerlo "más atractiva para monetizarla" y (b) "presentarlo como caso de éxito". **Se construyeron dos piezas de copy** (no de diseño ni de código), en [`ventas/casos-de-exito/verifica-y-cumple.md`](../../ventas/casos-de-exito/verifica-y-cumple.md): una ficha de venta con los hechos verificados (incluido el hallazgo de que `spindlelab.cl` saca 36/100 en su propio chequeo — el ángulo real, no inventado, para usar en llamada) y un borrador de post de LinkedIn en voz personal singular, calibrado contra el post real del 1-sep de `voz-spindlelab/corpus.md` — **sin pasar por revisión de tono de Ramón, no publicar tal cual.** **Precio del kit decidido:** Ramón eligió la banda de mercado, **$149.000 + IVA · una vez** (el mismo formato "Desde $X + IVA" que usan las páginas de `servicios/` de SpindleLab, con la nota de que el valor final se ajusta según lo que el chequeo muestre — mismo espíritu de la "garantía honesta": no se promete resultado, se promete transparencia). **Queda como encargo, no ejecutado:** construir la sección de precio en el sitio (`laboratorio/ley-21719`) con esta estructura — incluye instalación/configuración de gestor de consentimiento, ajustes técnicos según lo que el chequeo detecte, y una plantilla de política de privacidad para que la revise un abogado (nunca la redacción legal final, guardrail de §4); no incluye asesoría legal. Ramón pidió explícitamente que esto **no se construya desde esta sesión** (copia de iCloud, marcada corrupta en `CLAUDE.md`) sino desde una sesión en `~/Projects/spindlelab`. Y aplicar el título nuevo ("¿Estás seguro?" o variante) al hero desplegado, con pase de tono antes de subir. |
| 2026-09-09 | **Título del hero, elegido.** De cuatro variantes propuestas, Ramón confirmó: **"¿Estás seguro?"**, con la bajada *"En 40 segundos sabes si tu sitio cumple lo básico de la Ley 21.719, sin registro."* — reemplaza el actual `<h1>¿Tu sitio tiene las señales que exige la Ley 21.719?`. Se suma al encargo pendiente de la fila anterior (kit de precio fijo): quien tome ambos desde `~/Projects/spindlelab` puede aplicarlos juntos en el mismo cambio. **Nada de esto está aplicado al sitio en vivo todavía.** |
| 2026-09-10 | **Troncal — la rama queda consolidada como orquestador** (Ramón: *"que funcione como orquestador de ideas para monetizarlas… de esta nacen, evalúa, audita y lanza las ideas"*). El [README](../README.md) pasa a tener el **pipeline con sus cuatro compuertas** (nace · evalúa · audita · lanza, más gradúa/muere) y un **tablero** con la etapa real de cada idea; la cola de trabajo se separa en [`encargos.md`](../encargos.md), E1-E12; el [estado consolidado](../estado-consolidado.md) queda solo como la auditoría fechada. **Primero se rescató el trabajo del 9-sep** (commit `3791ca9`): tres filas de este registro y `ventas/casos-de-exito/verifica-y-cumple.md` estaban sin commitear en el árbol de trabajo, sin existir para nadie más — tercer episodio de este tipo en el repo, ahora escrito como regla. **Auditoría de hoy, verificada en vivo:** el sitio, la API (36/100) y el enlace cruzado en ambas direcciones siguen bien; y **nada de lo decidido ayer está aplicado** — el H1 viejo sigue en vivo y `149.000`, `precio` y `Estás seguro` aparecen 0 veces en el HTML. **Cuatro hallazgos nuevos:** (1) el proyecto está declarado "alcance planeado completo" pero eso era solo el gancho gratuito — **la idea 2, la única que cobra, tiene precio decidido y cero construido**, con 82 días de ventana; por eso el tablero lo marca *lanzado a medias*, no lanzado. (2) `CLAUDE.md:37` manda trabajar en `~/Projects/spindlelab` y **ese directorio no existe** en la máquina, mientras la copia de iCloud que declara corrupta pasa `git fsck` limpia — los tres encargos de ayer que dicen "hazlo desde el clon bueno" apuntan al aire (E8, bloquea a E9 y E10). (3) la ficha de venta nueva afirma que "la primera infracción de una empresa pequeña es amonestación escrita", que es justo lo que corrige §2 punto 5 — el Art. sexto transitorio dice "podrá" y solo por 12 meses (E11). (4) el proyecto entró sin declarar costo de atención semanal, que el filtro 3 del README exige (E12). El encargo E7 del encabezado quedó cerrado ayer por la sesión de parte. **Nada construido ni rediseñado.** |
| 2026-09-10 | **E8, E9, E10 y E11 cerrados, en la misma sesión de parte que leyó la auditoría de hoy.** Ramón confirmó que se trabaja en la copia de iCloud (no existe `~/Projects/spindlelab`, y esta copia pasa `git fsck` limpio) — `CLAUDE.md:37` corregido para no volver a mandar a un directorio inexistente (E8). Se corrigió la afirmación legal incorrecta de `ventas/casos-de-exito/verifica-y-cumple.md` sobre la amonestación (E11). **Construido y desplegado a GitHub (no a producción todavía):** título nuevo del hero ("¿Estás seguro?") y la sección del kit de implementación ($149.000 + IVA, qué incluye/no incluye, CTA "Quiero el kit"), en un worktree aislado sobre `laboratorio/ley-21719` para no tocar el árbol de trabajo de `laboratorio/ideas`. Verificado con Chrome headless en modo claro y oscuro antes de subir — la tarjeta de precio reutiliza los tokens de color existentes del sitio, sin inventar paleta nueva. Commit `c718c74`, pusheado con `git push origin HEAD:laboratorio/ley-21719` (fast-forward, sin conflicto). **Cierran E9 y E10 en el código; el cierre real (verlo responder en `verificaycumple.pages.dev`) sigue pendiente de E2** — el proyecto de Cloudflare sigue sin auto-deploy, necesita que Ramón reconecte por dashboard o dé un token nuevo. |
| 2026-09-10 | **E2 cerrado — Ramón reconectó `verificaycumple` por el dashboard de Cloudflare** (Settings → Builds & deployments → Connect to Git), con **production branch `laboratorio/ley-21719`** y **root directory `verificaycumple`**. Confirmado con captura: "Implementaciones automáticas habilitadas", el commit `c718c74` se desplegó solo, sin token. **Verificado en el dominio público real** (no solo el subdominio de preview): `curl https://verificaycumple.pages.dev` responde `<h1>¿Estás seguro?</h1>`, `149.000` y "Quiero el kit". **E9 y E10 quedan cerrados de verdad, no solo en el código — están en vivo.** Con esto la idea 2 del proyecto (la única que cobra) deja de estar en cero: existe, está en producción, y tiene una forma de decir "lo quiero". |
| 2026-09-21 | **Retomado tras 11 días.** Ramón: "ahora le tengo que dedicar al 100 a este proyecto" — pasa a ser el foco principal. Antes de tocar nada, `git fetch` falló con `fatal: bad object refs/remotes/origin/HEAD 2`: un archivo de ref duplicado por sincronización de iCloud dentro de `.git/` (nombre literal con espacio y "2"). Se encontró y borró; `git fsck` quedó limpio. **`CLAUDE.md` reconciliado** (en `main`) con la evidencia real: ni "clon corrupto, no usar" (nota del 1-sep) ni "está todo perfecto" (corrección del 10-sep) eran del todo ciertas — el riesgo de duplicados por iCloud es real pero se detecta y arregla fácil, no amerita abandonar la copia. **E5 cerrado:** página nueva `/privacidad/`, contra los 12 puntos del Art. 14 ter, contenido verificado contra el código real de `chequeo.js` (sin estado, no guarda el dominio ni el resultado) antes de afirmarlo. Commit `51e1988` en `laboratorio/ley-21719`, desplegado solo. **Verificado en vivo: el puntaje propio subió de 36 a 73.** El único ítem que queda sin marcar (gestor de consentimiento) se deja así a propósito — el sitio no usa cookies ni rastreadores, y poner un banner sin nada que consentir sería falso, no una mejora. |
| 2026-09-21 | **Ramón pidió post de LinkedIn ("dale con el post de LinkedIn").** Había dos borradores (el de Cata, ángulo "72 horas"; el propio, ángulo "spindlelab.cl sacó 36/100") — se presentaron ambos con su trade-off real (el propio expone públicamente que la agencia no cumple, y seguía sin arreglarse). **Ramón: "arreglemos la casa primero antes de publicar cualquier cosa."** El post queda pausado; se pasó a E4. **E4 avanzado, commit `fdae9c4` en `main`, verificado en vivo — spindlelab.cl subió de 36 a 73.** Al revisar `/contacto/` para el checkbox de consentimiento, se encontró un bug no relacionado pero más urgente: el submit handler llamaba a un campo de formulario que ya no existe, lanzando un error antes del `fetch()` — **el formulario de contacto real de la agencia estaba roto, cada envío se perdía silenciosamente.** Confirmado en el sitio en vivo antes de tocar nada. Arreglado en el mismo cambio, junto con el checkbox de consentimiento (Art. 12), la página `/privacidad/` (con los datos reales: formulario vía web3forms.com, GA4, Meta Pixel), y el enlace en el footer de las 20 páginas del sitio. **Sin cerrar del todo:** GA4 y Meta Pixel siguen cargando sin pedir consentimiento primero en todo el sitio (no solo el formulario) — falta un gestor de cookies real, declarado como "aviso honesto" en la política nueva, no escondido. Queda como encargo nuevo, sin número asignado todavía. |
| 2026-09-21 | **E4 cerrado — "vamos con lo único que falta. Dejemos todo listo antes de publicar nada."** Commit `362b88f` en `main`, verificado en vivo: banner de cookies propio en las 20 páginas del sitio y en `Layout.astro`. Google Consent Mode v2 arranca en `denied`; Meta Pixel no se inicializa hasta que hay consentimiento; se quitó el `<noscript>` del pixel (no se puede pedir consentimiento sin JS, tampoco se debía rastrear sin JS). Probado con `astro dev` antes de subir: consent denegado confirmado en `dataLayer`, `fbq` no carga hasta "Aceptar", la decisión persiste entre recargas, responsive en escritorio y móvil. **El puntaje se queda en 73/100, y está bien que así sea:** `chequeo.js` solo reconoce gestores de cookies de terceros conocidos por nombre — uno propio no aparece en esa lista, pero el bloqueo real está verificado directo en el navegador. **Con esto, `spindlelab.cl` queda en regla de verdad: política real, formulario arreglado (bug crítico encontrado de paso), consentimiento antes de tratar datos, y trackers bloqueados hasta que se autoriza.** El post de LinkedIn sigue pausado — Ramón pidió resolver esto primero. |
| 2026-09-21 | **El post de LinkedIn se actualizó** para contar la historia real completa (36→73, el bug del formulario encontrado y arreglado, no solo "lo estoy corrigiendo") en `ventas/casos-de-exito/verifica-y-cumple.md` — sigue en borrador v2, sin pase de tono ni confirmación de Ramón, no publicar tal cual. **Ramón trajo un mensaje estratégico más amplio:** confirmó que el precio del kit ($149.000) está bien, pero **no existe protocolo de qué pasa después de que un cliente paga** — propuso construirlo como skill; preguntó por un modelo de suscripción; y pidió incluir Verifica y Cumple en el correo frío de la sesión de búsqueda de leads (fuera del alcance de este brief, queda anotado para esa sesión). Antes de eso, un mensaje suelto ("había dicho que verifica y cumple era algo que salía de spindlelab") sonó como que podía revertir la decisión de marca — **se confirmó explícitamente que no**: sigue Camino B, marca aparte cruzada con SpindleLab, sin cambios al texto legal ya escrito (que asume a Ramón, no a SpindleLab SpA, como responsable). |
| 2026-09-21 | **Protocolo de entrega del kit, construido como skill.** Ramón: "empecemos con el protocolo de entrega". Antes de escribir nada se identificó un vacío real: todo el trabajo de hoy (spindlelab.cl, verificaycumple) se hizo con acceso total al propio repo — un cliente real de pago no da eso por defecto. Se preguntó explícitamente cómo resolver el acceso al sitio del cliente (real vs. snippet autoinstalable vs. según plataforma) — **Ramón eligió pedir acceso real** (hosting/repo/CMS o credenciales temporales), el mismo modelo que ya funcionó en spindlelab.cl. Creada `.claude/skills/entrega-kit-verificaycumple/SKILL.md`: los 4 pasos ya prometidos en la landing (gestor de consentimiento, ajustes técnicos, plantilla de política, verificación final) como método concreto, con el caso real de spindlelab.cl como plantilla de referencia, la limitación conocida de `chequeo.js` (no reconoce gestores caseros, solo una lista fija de proveedores) documentada para no confundirla con un fallo, y la regla de que la plantilla de política nunca lleva el responsable de otro caso pegado sin revisar. **Queda pendiente, no ejecutado todavía:** el diseño del modelo de suscripción (solo una recomendación corta dada — re-chequeos recurrentes + alerta de regresiones) y reforzar la landing para que la oferta pagada sea más visible que un CTA de pie de página. |
| 2026-09-21 | **Modelo de suscripción diseñado y construido (código, sin desplegar).** Ramón: "sí, dale con la suscripción". Cadencia **trimestral, no mensual** (a diferencia del Acompañamiento Mensual de SEO) — propuesto explícitamente por capacidad: Ramón ejecuta solo, y 4 toques/año por cliente es sostenible si esto escala, 12 no. Precio: se preguntó una banda ($19-29k / $39-59k / "verlo con tiers") — **Ramón eligió $39.000-59.000/mes + IVA**. Plan "Suscripción de vigilancia": re-chequeo trimestral automático, alerta si el puntaje baja, registro de actividades de tratamiento actualizado; **Desde $39.000 + IVA/mes, mínimo 2 trimestres**, explícitamente "no reemplaza el kit — lo sostiene". Construido como segundo panel junto al del kit en la sección de ayuda (mismo componente `.kit-precio`, ahora en grid de dos columnas que se apila en mobile), con su propio CTA (`mailto:` con asunto propio). Verificado renderizado en un worktree aislado (`/tmp/vyc-sub-wt`), desktop y mobile, con scroll real (no `scroll_to`, por el mismo falso-positivo de reveal-on-scroll ya documentado el 8-sep). Commit `f4e64c2` en el worktree, **sin pushear todavía** — pendiente de que Ramón confirme subirlo (cambia `laboratorio/ley-21719`, que autodeploya a producción). |
| 2026-09-21 | **Suscripción subida a producción** (Ramón: "dale, súbelo"). `git push origin HEAD:laboratorio/ley-21719`, commit `f4e64c2`, confirmado en vivo (`verificaycumple.pages.dev` sirve "Suscripción de vigilancia", "Quiero la suscripción" y "39.000"). Ficha de venta actualizada de paso (`ventas/casos-de-exito/verifica-y-cumple.md`): no tenía ningún precio, ni siquiera el del kit — se agregó sección "Cómo se cobra" con ambos montos, más un punto sobre ofrecer la suscripción después de cerrar el kit, no antes. |
| 2026-09-21 | **Rediseño de la landing para enfatizar la oferta paga, con criterio de diseño real (no genérico).** Ramón: "quiero una landing con un buen criterio de diseño. no algo genérico a la IA... invoca esas habilidades [de diseño/creativo/UI-UX]". Se cargó la skill `persona-director-creativo` (Bruno) — `frontend-design` resultó ser una carpeta vacía en el repo (huérfana de la poda del 1-sep, pese a que el organigrama la marca como "nativa"), así que no se pudo invocar. Se lanzó un workflow de 8 agentes: 1 de research real contra Refero (6 referencias encontradas: Pipe, Inngest, Vanta, Symbolic.ai, Fingerprint, Deel), 3 direcciones divergentes ancladas en esas referencias, 3 jueces (genericidad / prominencia de la oferta paga / factibilidad) y 1 síntesis final. **Hallazgo del propio workflow, verificado antes de usarlo:** la síntesis detectó que una de las 3 direcciones citaba 5 de 6 referencias de Refero con IDs inventados — se descartó esa parte y se rescató solo el concepto de fondo (que no dependía de la cita falsa), en vez de arrastrar el error a producción. Implementado a mano (no por los agentes) sobre `/tmp/vyc-sub-wt`: link "Ver el kit y precios" en el header; la tarjeta de ejemplo del hero pasa de un mockup inventado (`ejemplo.cl`, 62/100) al caso real (`spindlelab.cl`, 36→73); una franja angosta con el mismo caso entre el explicador y el Art. 14 ter; un panel de resolución **dentro del propio resultado del chequeo** que aparece solo si el visitante tiene señales pendientes, con su dominio y su conteo real; y las dos tarjetas de precio pasan de dos columnas idénticas a un tratamiento de "documentos sellados" superpuestos (kit: esquinas rectas + el sello de verificación estampado; suscripción: redondeada, detrás). Todo reutiliza los tokens `:root` existentes — cero colores nuevos, cero librerías. Verificado a mano: desktop y mobile, claro y oscuro (el franja/panel usan el par `--texto`/`--panel`, que invierte polaridad correctamente en ambos temas sin CSS adicional), el panel de resolución con datos de prueba inyectados, foco de teclado, sin errores de consola. Un bug menor encontrado y corregido en el camino: el monto del kit envolvía mal en mobile (el "+" quedaba huérfano) — `white-space:nowrap` en el span del IVA. Commit `adf3db9` en el worktree, **sin pushear todavía** — pendiente de que Ramón lo vea y confirme. |
| 2026-09-21 | **Rediseño completo del sitio, calcando una referencia que trajo Ramón** ([Behance, "Creative Course Landing Page"](https://www.behance.net/gallery/249058265/Creative-Course-Landing-Page)). Cuatro rondas antes de acertar, y vale escribir por qué falló cada una: (1) *sello de autor* — timbre de cera, serif, papel crema: "no me gusta para nada este estilo"; (2) *editorial* con imagen, construido en **Lovable** (proyecto "Sello Chile Data", conectado por MCP) — la dirección gustó pero **se agotaron los créditos gratis del plan en un día** (5,4 + 3,24 de 8 diarios), así que Lovable quedó descartado como herramienta y el sitio se siguió construyendo a mano; (3) paleta naranja/mostaza inventada por esta sesión en vez de los colores reales de la referencia: "no entiendo por qué sigues con esta misma paleta... tómalo tal como es"; (4) tipografía serif donde la referencia usa una grotesca pesada. **Lo que finalmente cerró la brecha fue el recorte**: Ramón preguntó "¿dónde están los recortes que están en la referencia?" — en la referencia el jinete es un PNG sin fondo con la tipografía pasando por detrás, y lo que había era una foto rectangular en una caja. Esa era la diferencia estructural, no el color. **Estado final, en vivo:** fondo azul eléctrico, titular en Archivo Black mayúsculas a dos tintas (blanco + verde neón) cruzado por el recorte de una fiscalizadora a caballo (generada en Higgsfield contra fondo verde croma y recortada con PIL por dominancia de canal — el primer intento contra el fondo azul original dejó las patas rotas por las sombras azuladas), secciones inferiores en bloques de color plano alternados con cifras grandes en rosa, y la política de privacidad al mismo estilo. **Fuente auto-alojada a propósito** (no Google Fonts): ese enlace manda la IP del visitante a un tercero, que es justo una de las señales que este chequeo le marca a otros sitios; verificado en el navegador que el sitio hace cero peticiones externas. Commits `698821e`→`077aa93` en `laboratorio/ley-21719`. Maqueta del hero en Figma: archivo "Verifica y Cumple — Landing (ref Behance)" (`ZPH50mImRSdWgcleGGASgD`). **Contenido intacto en todo el rediseño:** los 12 puntos del Art. 14 ter, los montos, las notas de "no incluye asesoría legal" y el caso real 36→73. |
| 2026-09-21 | **Aviso de coordinación:** a mitad de esta sesión la carpeta compartida de iCloud saltó sola a la rama `claude/ines-red-presencial` (otra sesión trabajando en paralelo; su skill `agente-red-presencial` apareció en vivo durante la sesión). No se perdió nada — los commits ya estaban en `origin` — pero desde ese punto **todo el trabajo siguió en worktrees aislados** (`/tmp/vyc-sub-wt` para el sitio, `/tmp/vyc-ideas-wt` para este registro) sin tocar la rama que la otra sesión tenía activa. Es el mismo choque que ya está documentado en `CLAUDE.md`; la práctica de worktree aislado es lo que evitó que se convirtiera en pérdida de trabajo. |
| 2026-09-21 | **Se revirtió la decisión de marca: Verifica y Cumple es un servicio de SpindleLab, no un proyecto aparte de Ramón.** Ramón, al revisar el pie del sitio: "el pie donde dice mi nombre no me gusta. di que esto es algo solamente de spindlelab". Esto **anula el Camino B** decidido el 3-sep (§6) y con él el supuesto de marca aparte firmada por Ramón. Cambios hechos: el pie y la política de privacidad de `verificaycumple.pages.dev` ahora nombran a **SpindleLab SpA, RUT 78.474.925-8** como responsable del tratamiento (antes: Ramón como persona natural) — commit `9777a2c`; y en `spindlelab.cl` se sacó de `/diagnostico/` la frase "No es un servicio de SpindleLab — es un proyecto aparte de Ramón", que había quedado falsa — commit `e0e9a1e` en `main`. **Pendiente de confirmación de Ramón:** que SpindleLab SpA (y no él como persona natural) sea efectivamente la entidad que corresponde nombrar ahí; se asumió por la regla de corte del 24-jul (contratos nuevos → SpA), pero es un dato legal y conviene que lo confirme. |
| 2026-09-21 | **Lanzamiento publicado en LinkedIn, por la página de SpindleLab** (Ramón: "sí, reescríbelo para la voz de SpindleLab" → "dale, súbelo a la página de SpindleLab"). El borrador v2 estaba escrito en singular, la voz personal de Ramón; con el cambio de marca del punto anterior eso quedó inconsistente, así que se reescribió completo en registro plural, calibrado contra `voz-spindlelab/corpus.md`. Publicado como `urn:li:activity:7507924615218823168`, verificado público. El primer comentario (el link al chequeo) **costó cuatro intentos**: los tres primeros, hechos desde la vista de administrador de la página, se quedaron colgados en un spinner y no llegaron a crear nada — verificado cada vez en la vista pública para no dejar comentarios duplicados. El que funcionó fue desde el **permalink del post** (`/feed/update/<urn>/`), cambiando la identidad a SpindleLab en el diálogo "Comenta, reacciona y comparte contenido en nombre de" antes de escribir. Anotado para la próxima vez que haya que comentar como página. **Pendiente:** decidir si el perfil personal de Ramón hace algo — la nota del propio borrador dice que no debe repetir la misma historia en singular; o comparte el post de la página, o se escribe otro con un ángulo distinto. |
