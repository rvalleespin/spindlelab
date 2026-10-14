# Hoja de voz del v3 (E8, paso 1)

14-oct-2026 · Clara · base `63f1e55` (el código del sitio en `e3ebc78` es el mismo) · contrato:
el plan E8 aprobado por Ramón, paso 1.

**Qué es.** La vara del pase de voz. La usan las tres Claras del paso 3 para llenar sus
registros, yo en el paso 4 para unificar, y los críticos del paso 5 para revisar. No propone
texto ranura por ranura, que es el paso 3, salvo dos cosas que el plan pide aquí: el glosario
y el nombre de Visibilidad (2.11, que decido con Simón).

**Cómo se comprobó.** Cada texto del sitio que cito sale de la extracción del build de
`63f1e55` (`e8/herramientas/extraer.mjs`: 21 rutas a 1440, sin las maquetas; el resultado,
`antes.json`, está en el scratchpad y no se commitea) o del código, con archivo y línea de
`63f1e55`. Los punteros van como JSON Pointer, igual que en `censo-parches.md`. La migración
de Diego (paso 1, en paralelo) mueve líneas; los punteros, en general, no. Los conteos
«visibles» cuentan el menú y el pie una sola vez.

---

## 0 · Orden de autoridad y estados

Cuando dos fuentes dicen distinto, manda la de más arriba:

1. Lo cerrado por Ramón y lo que el encargo deja fuera (lista de abajo).
2. El manual de marca, §08: persona, «aquí», sin voseo. Manda sobre `voz-spindlelab` donde
   chocan (spec §7:280).
3. Las ranuras ya decididas en la spec §7 y en `acta-qa-final.md` (sección 4 de esta hoja).
4. Esta hoja.
5. `voz-spindlelab` y su `corpus.md`: el sonido, no las reglas.

Simón tiene veto en sus ranuras (sección 6), en cualquier fila.

**Lo que no se toca nunca:** `section.d-hero` de la home y `.d-pres`; la línea del campo
Desarrollo (`oferta-v3.json#/momentos/0/items/0/d`); la bio de Nosotros (`nosotros.astro`,
sus constantes); los cuerpos de los 7 artículos (`src/data/blog-v3/*.html`) y `_indice.json`;
los precios; los `name` del formulario y los ids `chq-*`; `Layout.astro`; `functions/`;
`public/js/consent-banner.js`; `public/assets/js/v3-contacto.js`.

**Estados de una ranura** (los pone el inventario del paso 2):

| Estado | Qué puede proponer Clara |
|---|---|
| `cerrado` | Nada. No lleva fila. R3, R4 y R7 entran aquí, con el motivo «R3: …», «R4: …» o «R7: …» (sección 7). |
| `R2` | Solo arreglar una regla dura de la sección 5a, dejando la promesa y la cadencia idénticas palabra por palabra. Si no, «se mantiene · R2». |
| `Simón` | Solo cambios de voz (sección 6). Simón veta. Sin prueba del 30 %. |
| `decidido-§7` | Se mantiene, salvo un motivo que responda al motivo de la fila (sección 4). |
| `libre` | Todo, con esta hoja y la prueba del 30 %. |

Si una ranura tiene dos estados (la meta de Diagnóstico es `Simón` y `decidido-§7`), valen
los dos límites.

---

## 1 · Persona y registro

**1.1 Quién habla.** Plural de marca para lo que el negocio entrega u ofrece; singular solo
para lo observado y lo personal (manual §08). Manda el §08 y no `voz-spindlelab`:24
(«nunca se mezclan en la misma pieza»), que el manual ya cuenta entre las skills
desactualizadas y que la spec §7:280 deja escrita. En el v3 eso se ve así: el sitio entero
habla en plural, salvo Nosotros y dos titulares.

**1.2 Regla de E8 sobre el singular: no se agrega ninguno (R4 es de Ramón), y tampoco se
quita el que hay.** El singular vigente, medido, está todo cerrado:

- la bio de Nosotros (`nosotros.astro`: `presentacion`, `trayectoriaEti`, `trayectoria`,
  `porque`, `primero`, `puntos`), publicada en producción;
- «Te lo muestro antes de que pagues nada.» (`nosotros.astro:196`), R4;
- «No te prometo. Te muestro.», h1 de Nosotros (`nosotros.astro:150`) y h2 de la home
  (`index.astro:267`). Es el titular publicado (`origin/main:spindlelab-astro/src/pages/nosotros.astro:63`).

Prueba: buscar en cada propuesta verbos de la marca en primera singular (reviso, muestro,
prometo, mido, entrego, arreglo, soy, puedo, me hago cargo). Uno nuevo fuera de esa lista es
defecto.

**1.3 El «yo» del visitante no es el singular de Ramón.** Los botones y las preguntas hablan
con la voz de quien visita: «Pedir mi mini-diagnóstico», «Revisar mi sitio», «Acepto que
estos datos se usen…», «Prefiero hablarlo contigo», «¿Puedo salir antes si no veo valor?».
Está bien y no cuenta para 1.2.

**1.4 Tuteo siempre.** «Ustedes» aparece solo cuando el visitante le pregunta a SpindleLab
en una FAQ («¿Manejan ustedes el presupuesto de pauta?», «¿Ustedes crean el contenido
(gráficas y video)?»): es el registro correcto de esa voz. «Usted» al visitante: 0, y así
se queda.

**1.5 «Aquí», nunca «acá», en texto nuevo o tocado** (manual §08, 7-oct). Medido: 0 «acá»
en el v3 fuera de los 3 del cuerpo del artículo de los 21 chequeos, que van verbatim. Ojo con
lo tapado: `paginas-v3.json#/diagnostico/secciones/0/parrafos/0` dice «Acá está la nuestra» y
hoy no se ve; con la migración no puede volver.

**1.6 Sin voseo.** Medido: 0. Los imperativos van en tú: escribe, pon, mira, cuéntanos.

**1.7 Castellano de Chile.** Celular, computador, costo, correo, plan, pauta. Medido: «móvil»
y «coste» en 0 fuera de los cuerpos de artículo (dentro hay 3 «móvil», verbatim). Se quedan
los términos del oficio que el comprador usa tal cual: SEO, Core Web Vitals, schema,
robots.txt, Google Ads, Search Console, keywords, y «fee de gestión» en Paid Media. Tienen
palabra aquí y se cambian si la ranura se toca: «pack» («Cada pack tiene…», FAQ de precio de
Desarrollo web, que en la misma página dice «Tres planes»), «email» en prosa (la etiqueta
«Email» de contacto es la única; el h1 de esa página ya dice «Un correo»), «(social ads)»
(Redes, dos veces). «Retainer mensual» está en tres Offer que también llevan cadencia: R2.

**1.8 Sin raya.** Medido: 0 rayas (— ni –) en las 21 rutas, cuerpos incluidos. El resultado
tiene que dar 0. Si una aclaración la pide, va entre comas o entre paréntesis.

**1.9 Sin Title Case.** Mayúscula inicial y nombres propios. Los nombres de plan son nombres
de producto y se quedan como están (2.10). El resto del Title Case que queda vive en los nodos
que emite `Layout.astro` (R5) y en el `<title>` y el nodo Service, que conservan el nombre de
producto a propósito (§7:190, :203).

**1.10 Cadencia (R2): no se agrega ni se quita ninguna palabra de cadencia, en ninguna
página.** Línea base medida en la extracción, que es la que Diego repite en el paso 7:

- búsqueda del plan, `quincen|cada mes|mes a mes|al mes`: **51** (32 visibles, 12 en JSON-LD,
  2 en head, 5 en cuerpos de artículo);
- búsqueda amplia, que suma `mensual`, `quincenal`, `quincena`, `cada quince días`, `/mes` y
  `a diario`: **238**.

**1.11 Cifras, plazos y precios son datos, no copy.** No cambian: los precios y su notación
(§7:139, :206); 24 horas; ~1, ~2, ~3 y ~4 a 6 semanas; 2 a 3 y 2 a 6 semanas; mínimo 3 meses;
aviso de 30 días; 30 días de garantía; 20 y 45 minutos; 21 señales o 21 chequeos, 100 puntos y
los pesos 30, 40 y 30; ~10 y ~20 consultas; 3 y 4 motores; hasta 8 y 15 keywords; hasta 5 y 12
páginas. La frase que los lleva se puede reescribir alrededor; la cifra sale idéntica.

**1.12 Tipografía.** Comillas latinas «» (dentro, “ ”). Puntos suspensivos «…», no «...»
(§7:189; queda uno, «Revisando...», en `v3-chequeo.js:128`). Los h2 van sin punto final
(§7:211; la plantilla lo quita igual). Sin signos de exclamación.

---

## 2 · Glosario de ofertas

Una forma por oferta en lo visible. La **forma única** va cuando el texto nombra la oferta:
menú, pie, miga, botones, rótulos y la primera mención en la página. **En prosa** es como se
la retoma después.

### 2.1 Chequeo gratis

- **Forma única:** «Chequeo gratis» como nombre de la página (menú, pie, miga y BreadcrumbList
  de `/v3/diagnostico/`, §7:203). En prosa, «el chequeo». El rótulo largo «Chequeo de
  visibilidad en IA» vive en el hero (cerrado) y en el title de Diagnóstico (Simón).
- **Qué es:** automático, en segundos, sobre tu dominio. Lee solo páginas públicas y no pide
  correo. Revisa si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio y si
  la IA puede entender qué haces y citarte. 21 señales, 100 puntos, tres bloques (leerte 30,
  entenderte 40, citarte 30).
- **No puede decir** que mide si la IA te nombra o te recomienda: eso es el mini-diagnóstico
  (§7:156, :179). Tampoco que prueba Gemini: `functions/api/chequeo.js` revisa OAI-SearchBot,
  ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot y Perplexity-User (§7:168, :183).
- **«gratis» o «gratuito»:** los dos están en uso y los dos son correctos. En texto nuevo,
  «gratis», que es lo que usa el corpus en los dos registros. Una ranura no se cambia solo por
  esto.
- **«los 21 chequeos»** nombra los ítems del instrumento y vive en Diagnóstico y en el
  artículo. Fuera de ahí, «21 señales» (Método). «El chequeo», sin más, es siempre este; el de
  la ley se nombra (2.9).

### 2.2 Mini-diagnóstico

- **Forma única:** «mini-diagnóstico» en el cuerpo (§7:174, :217). «El diagnóstico» es la
  forma corta en los botones («Pedir el diagnóstico») y cuando la misma página ya lo nombró
  («Recibes el diagnóstico», en contacto).
- **Qué es:** lo hacemos a mano. Le preguntamos a ChatGPT, Gemini y Perplexity por tu
  categoría y vemos quién aparece en tu lugar y qué fuentes citan. Una página, gratis, en 24
  horas: qué te frena y qué arreglar primero.
- **No se dice:** «diagnóstico completo» (0 hoy, §7:217), «análisis completo» (§7:202),
  «auditoría gratis».
- **Una forma por página.** Tres páginas mezclan «diagnóstico gratuito» con
  «mini-diagnóstico», y ahí se unifica a «mini-diagnóstico»: Visibilidad (nota de la entrada y
  FAQ de precio, contra el cierre), Redes (FAQ de precio, contra el cierre) y Método («Con eso
  parte el diagnóstico gratuito.», contra la fase 01 y el cierre). Otras tres dicen solo
  «diagnóstico gratuito» y son candidatas por glosario: Acompañamiento (FAQ de precio y
  cierre), Trabajo (cierre) y Desarrollo web (nota, nota de planes, FAQ de precio y cierre). En
  Desarrollo web, ojo: a quien parte de cero no hay sitio que diagnosticar, y el cierre
  publicado (§7:241) ya separa los dos caminos; ahí decide Clara H si la palabra es
  «mini-diagnóstico» o otra. Auditoría ya dice «mini-diagnóstico» en todas sus ranuras.
- **No confundir** con «Diagnóstico técnico», la fase 01 de Método (h3 y HowToStep, de Simón):
  es el nombre de la fase, que contiene el mini-diagnóstico.
- Las metas de la home y de Nosotros dicen «Diagnóstico gratis en 24 horas». La de Nosotros va
  verbatim (§7:179); la de la home es de Simón.

### 2.3 Auditoría SEO técnica

- **Forma única:** «Auditoría SEO técnica» (§7:203). En prosa, «la auditoría». El title y el
  nodo Service conservan «Auditoría SEO Técnica» (§7:190, :203).
- **Planes:** «Mini-diagnóstico» (gratis), «Auditoría Completa», «Auditoría + Visibilidad IA».
  Propuesta para el último: «Auditoría + Visibilidad en IA» (2.11).
- «la auditoría completa», en minúscula y en prosa (contacto, Método), es el plan pagado y está
  bien.
- No confundir con «Auditoría de Visibilidad», el plan de una vez de Visibilidad en IA.

### 2.4 Visibilidad en IA

Forma única propuesta: «Visibilidad en IA», sin paréntesis. La propuesta y su razón están en
2.11. En prosa, «visibilidad en IA» como tema («SEO técnico y visibilidad en IA»); «visibilidad
en motores de IA» se queda donde ya está (metas, Layout), sin cambiarlo solo por esto.

### 2.5 Acompañamiento mensual

- **Forma única:** «Acompañamiento mensual». En prosa, «el acompañamiento» o «el servicio de
  acompañamiento mensual». Esta última es un enlace en Auditoría (`ENLACES`): si la frase
  cambia, el enlace se pierde en silencio.
- **Planes:** «Esencial», «Pro» y «A medida» en su página. Desde Visibilidad se nombran
  «Acompañamiento Esencial» y «Acompañamiento Pro» (Offer, Simón): son el mismo plan y el
  mismo precio, y por eso la cadencia es R2.2.
- R2 y R3 viven en esta oferta (sección 7).

### 2.6 Desarrollo web

- **Forma única:** «Desarrollo web». El nodo Service dice «Desarrollo Web» (producto). El h1,
  «Desarrollo web que los motores de IA pueden leer», es de Simón.
- **Planes:** «Página de Campaña», «Sitio Esencial», «Sitio Completo», «Plataforma a Medida»
  (2.10).
- «Plan», no «pack».
- La guía de la entrada (`desarrollo-web.astro:231`) se reescribe en el pase (P86, sección 8).

### 2.7 Gestión de redes sociales

- **Forma única:** «Gestión de redes sociales». En prosa, «la gestión de redes» o «tus redes».
- **Planes:** «Orgánico», «Orgánico + Pauta», «A medida».
- «pauta social», sin el paréntesis en inglés.
- Es un servicio, no una «pieza» (2.12).

### 2.8 Paid Media (Google)

- **Forma única:** «Paid Media (Google)» (§7:203). En prosa, «la pauta en Google» o «Google Ads».
- **Planes:** «Gestión Esencial», «Gestión Pro», «A medida».
- El paréntesis dice el alcance: la pauta en Instagram y Facebook vive en Gestión de redes
  sociales, y la FAQ de la página lo explica. Por eso se queda, y por eso no sirve de
  precedente para Visibilidad (2.11).

### 2.9 Verifica y Cumple

- **Forma única:** «Verifica y Cumple», siempre entero. Rótulo «Verifica y Cumple · Producto
  propio» (§7:233); en Trabajo, «Herramienta · Producto propio» (§7:200).
- **Qué es:** el chequeo gratis de las señales técnicas que pide la Ley 21.719. Lo construimos
  y lo mantenemos nosotros, en verifica.spindlelab.cl.
- Nunca «el chequeo» a secas, que es 2.1. Su voz la rige su propia línea editorial (manual,
  cabecera): el v3 solo lo describe.
- Botón: «Revisar mi sitio para la Ley 21.719» (§7:184).

### 2.10 Nombres de plan

Son nombres de producto, los mismos en la tarjeta, en las Offer, en las cotizaciones
(`.claude/skills/cotizaciones/plantilla_generador.py`) y en `ventas/pipeline.md`. No cambian
en E8, aunque algunos lleven mayúscula de producto («Auditoría Completa», «Plataforma a
Medida»). Única propuesta: «Visibilidad IA» → «Visibilidad en IA» en el plan de Auditoría,
por glosario. Cuando una frase nombra un plan, lo nombra igual que su tarjeta.

### 2.11 Visibilidad en IA: la propuesta para Simón

**Hoy, medido.** El menú, el pie, la home (pestaña y «Ver Visibilidad en IA»), el índice y
«Siguiente» dicen «Visibilidad en IA». El h1, la miga visible y la posición 3 del
BreadcrumbList dicen «Visibilidad en IA (AEO/GEO)» (`servicios-v3.json#/visibilidad-en-ia/h1`
y `#/visibilidad-en-ia/breadcrumb/2/name`; `CAJA` no las toca). Es el punto 4 de spec §7:213.

**Propuesta.** «Visibilidad en IA», sin paréntesis, en todo lo visible que nombra el
servicio: el h1, la miga y su BreadcrumbList (miga = menú, §7:203), y el plan «Auditoría +
Visibilidad en IA» (`#/auditoria-seo-tecnica/secciones/1/planes/2/nombre`, su FAQ de precio,
su Offer y la línea de precio `oferta-v3.json#/momentos/1/items/1/p`, «$690.000 con Visibilidad
en IA»). «AEO/GEO» se queda donde hace trabajo de búsqueda, que es de Simón: el `title`, la
meta, `serviceName`, `serviceType`, `OfferCatalog.name` y la pregunta «¿Qué es AEO y GEO?», que
define la sigla en la misma página.

**Por qué.**

1. El rótulo usa la palabra del visitante y la sigla va después, como precisión (paso 4 de
   `web-copy-interfaz`). Quien llega pregunta por aparecer en ChatGPT, no por una sigla, y la
   página ya la explica en su FAQ.
2. Es la postura publicada de Ramón. Su post con más alcance (corpus §5) cita a Google
   diciendo que el buen SEO es buen GEO, «o AEO, o AI SEO, o como se llame», y desarma la sigla
   como línea aparte. Un h1 que rotula el servicio con la sigla vende justo eso.
3. «Paid Media (Google)» no es precedente: «(Google)» dice el alcance y «(AEO/GEO)» repite el
   nombre en jerga.
4. Cierra el punto 4 por el lado corto. Con el paréntesis, el menú (ocho filas que tienen que
   entrar a 768 × 720, §7:267) y las pestañas de la home crecen sin ganar nada.

**Lo que decide Simón, con veto:** si el h1 pierde el paréntesis. Si lo veta, el h1 se queda
«Visibilidad en IA (AEO/GEO)» y la miga y su BreadcrumbList pasan igual a «Visibilidad en IA»
(miga = menú; el h1 puede ser más largo que el nombre del menú, como en Desarrollo web).

**Para Diego:** «$690.000 con Visibilidad en IA» va en `nowrap` (§7:155). Hay que medir a 390
que la línea de precio de la home y del índice no desborde.

### 2.12 Las palabras alrededor de las ofertas

- **Servicio, no «pieza».** En el v3, «pieza» es una obra o una pieza gráfica (`Pieza.astro`,
  «Pieza de concepto»). Para un servicio es resto de «las cuatro piezas del motor». Visible hoy
  en dos FAQ: Redes («viven en su propia pieza: Paid Media (Google)») y Paid Media («Esta pieza
  se enfoca en Google»).
- **Qué motores se nombran.** El chequeo nombra «ChatGPT, Claude y Perplexity», que es lo que
  prueba en vivo. El mini-diagnóstico y los servicios pagados nombran «ChatGPT, Gemini y
  Perplexity», que es lo que se pregunta a mano (el plan Pro suma AI Overviews). Pasar la lista
  de un lado al otro es cambiar un hecho.
- **«los motores de IA», «la IA» o el nombre de cada uno.** «Motor» en singular, como metáfora
  del negocio, no (sección 5). «La máquina», en singular, solo en `.d-pres` (verbatim de Ramón,
  cerrado). «Las máquinas que hoy recomiendan tu negocio» es la fórmula de la línea cerrada del
  campo Desarrollo: fuera de ahí no se repite (P86).
- **«sitio»**, no «web» como sustantivo ni «página web».
- **«pauta»** para la publicidad pagada; «inversión en pauta» para la plata del cliente; «fee
  de gestión» para lo que se nos paga, solo en Paid Media.

---

## 3 · Llamados a la acción

**La regla.** Un botón dice qué pasa al hacer clic: infinitivo más lo que se pide o se ve
(«Pedir el diagnóstico», «Correr el chequeo», «Ver planes»). Se tiene que poder completar con
«…y entonces pasa X»; si no se puede, está vacío. No pregunta ni invita («Empezar ahora», «Más
información», «¿Listo para…?») y no lleva exclamación. La única forma en imperativo es
«Escríbenos», la acción de contacto del sistema (spec §3), que se completa bien: «…y entonces
llegas al formulario». El texto pegado a un botón no repite su verbo: hoy el pie dice «Si
quieres hablar de tu sitio, escríbenos.» y debajo «Escríbenos», en las 21 rutas (candidato).

**Los pares.** El botón papel es la conversión (contacto); el `--alt`, la puerta secundaria
(el chequeo). El par «Pedir el diagnóstico» + «Correr el chequeo» se repite en Nosotros, el
índice de servicios, Trabajo, Método y los cierres de servicio (§7:176, :179, :192, :196). El
del blog es «Correr el chequeo» + «Escríbenos» (§7:275).

| Llamado | …y entonces pasa | Dónde (medido) | Estado |
|---|---|---|---|
| Escríbenos | llegas al formulario (dentro de contacto, baja a `#contacto-form`) | módulo de navegación y pie de las 21 rutas, cabecera de los 6 servicios y de Nosotros, campos de la home, cierres de Desarrollo web y de las 8 páginas del blog: 64 ranuras | decidido (spec §3, §7:173) |
| Correr el chequeo | vas a `/v3/diagnostico/` | 16 rutas: cierres del blog, Nosotros, Método, índice, Trabajo, Visibilidad, Auditoría, Acompañamiento, Desarrollo web | decidido (§7:156, :179, :192, :196, :241, :275) |
| Pedir el diagnóstico | vas a contacto | Diagnóstico (entrada, «Dos caminos» y `.d-siguiente`), Método, Nosotros, índice, Trabajo, resultado del chequeo | decidido, sin «completo» (§7:168, :202, :217) |
| Pedir el diagnóstico gratis | vas a contacto | cierres de Visibilidad, Auditoría, Acompañamiento, Redes y Paid Media | decidido (§7:192); propuesta abajo |
| Pedir mi mini-diagnóstico → | se envía el formulario | contacto | decidido (§7:174) |
| Revisar mi sitio | corre el chequeo | Diagnóstico (`#chq-btn`) | libre (en la home el mismo botón dice «Ver cómo lo lee»: hero, cerrado) |
| Volver al chequeo | subes al instrumento | Diagnóstico, «Dos caminos» | libre |
| Revisar mi sitio para la Ley 21.719 | vas a verifica.spindlelab.cl, en la misma pestaña | Diagnóstico | decidido (§7:184) |
| Ver planes | bajas a `#planes` | cabecera de los 6 servicios | libre |
| Ver + nombre del servicio | vas al servicio | campos de la home | decidido (§7:203) |
| Ver las cuatro fases | bajas a las fases | Método | decidido (§7:196) |
| Ver el método | vas a Método | home, `.d-pres` | cerrado |
| Ver el trabajo · Ver todo · Leer el artículo | vas a Trabajo, al blog, al post | Desarrollo web · home · índice del blog | libre |
| Quién está detrás | vas a Nosotros | home, bloque «No te prometo. Te muestro.» | libre: no tiene verbo y no se completa con «…y entonces pasa» |
| Siguiente + nombre · Siguiente artículo | vas a la página siguiente del ciclo | componente | decidido (§7:230, :240) |
| Prefiero hablarlo contigo | vas a contacto | resultado del chequeo, segunda rama | decidido (§7:202) |
| «Ver la auditoría →», «Ver Visibilidad en IA →», «Ver el acompañamiento →» | vas al servicio | Método, «Cuánto cuesta» de cada fase | libre, con los nombres de la sección 2 |

**Propuesta para «Pedir el diagnóstico gratis»:** una sola forma, «Pedir el diagnóstico».
Motivo que responde al de §7:192: esa fila decidió la estructura del cierre (h2, guía, botón a
contacto y el chequeo como segunda puerta), no la palabra. La forma corta la fijaron §7:168 y
§7:217 para el resto del sitio, y en los cinco cierres la guía que va justo encima ya dice
«mini-diagnóstico gratuito» (A10). Decide Clara S con el crítico; si se queda, se queda en los
cinco y en ningún otro lugar.

---

## 4 · Ranuras ya decididas

Una ranura `decidido-§7` se mantiene. Se reabre solo si el motivo nuevo responde al de la
fila: por ejemplo, la fila sacó una frase por A2 y la propuesta la reescribe sin A2, o la fila
decidió la estructura y no la palabra. En el registro, la fila lleva el número de §7 y esa
respuesta. «Se mantiene», con su número, también es una fila válida. Todos los textos de esta
tabla están comprobados en la extracción, salvo los del resultado del chequeo, que se leyeron
en `v3-chequeo.js`.

| # | Dónde | Texto vigente | Fila | Motivo |
|---|---|---|---|---|
| 1 | Home, hero | ojillo «Estás pagando para que lleguen a tu sitio.», h1 «Ahí se corta el circuito» | §7:261 | Ramón, 10-oct. Cerrado. |
| 2 | Nombres de servicio | Desarrollo web · Visibilidad en IA · Auditoría SEO técnica · Acompañamiento mensual · Gestión de redes sociales · Paid Media (Google); la página del chequeo, «Chequeo gratis» | §7:203, :190 | Un nombre por servicio, en caja de oración; miga = menú. Abierto solo el punto 4 de :213 (2.11). |
| 3 | Diagnóstico, línea bajo el h1 | «Pon tu dominio y revisamos al instante si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio, y si la IA puede entender qué haces y citarte.» | §7:168 | Nombraba a Gemini, que no se prueba en vivo, y omitía a Claude. |
| 4 | Diagnóstico, guía de la entrada | «El chequeo de esta página lee tu sitio; el mini-diagnóstico le pregunta a los motores. Los dos son gratis.» | §7:168, :217 | Sin «Cada vez más…» (A2); «mini-diagnóstico». |
| 5 | Diagnóstico, rótulo de «Los 21 chequeos» | «La metodología completa, con el peso de cada bloque, para que puedas repetir el chequeo a mano si quieres.» | §7:168 | Sin «Ninguna herramienta del rubro…», más amplia que su respaldo. |
| 6 | Diagnóstico, cierre (`.d-siguiente`) | «Una página, gratis, en 24 horas.» + «Pedir el diagnóstico →» | §7:165, :168 | Sin pregunta ni «sin compromiso»; una herramienta cierra con conversión. |
| 7 | Diagnóstico, meta y og:description (también Simón) | «Pon tu dominio y revisamos al instante si ChatGPT, Claude y Perplexity pueden leerte, entenderte y citarte. Gratis, con los 21 chequeos y su puntaje publicados.» | §7:183 | Gemini fuera (C8). |
| 8 | Diagnóstico, «Y cómo medimos si la IA te nombra» | «No mide si hoy te citan: para eso hay que preguntarle a los motores. En los planes con acompañamiento lo hacemos cada mes …» | §7:183 | Regla: sin las cifras del Índice de Citabilidad, que no es lo que traen los planes. Además es R2 («cada mes»). |
| 9 | Diagnóstico, el paso gratis | «mini-diagnóstico» en el h3, la FAQ y el FAQPage; botones «Pedir el diagnóstico» | §7:217 | C8. |
| 10 | Diagnóstico, «Lo que este chequeo no mide» y sus dos h3 | «Y cómo medimos si la IA te nombra», «Lo que muestran las corridas» | §7:164, :211 | De la página publicada; sin guía (A10); h2 y h3 sin punto. |
| 11 | Contacto, h2 | «Pide tu mini-diagnóstico», «Qué pasa después» | §7:174 | Eran «Cuéntanos de tu proyecto» (no se pide un proyecto) y «Tres pasos, cero fricción» (jerga, manual §01). |
| 12 | Contacto, junto al correo | «O escríbenos directo a» | §7:174 | Era «¿Prefieres ir directo?» (A5). |
| 13 | Contacto, botón | «Pedir mi mini-diagnóstico →» | §7:174 | Era «Enviar →». |
| 14 | Contacto, línea bajo el h1 | «Escríbenos con la dirección de tu sitio y recibes el mini-diagnóstico, gratis.» | §7:174 | Sin «sin compromiso». |
| 15 | Contacto, respuesta del NDA (visible y FAQPage) | «Sí, sin problema. En sectores financieros es práctica habitual y trabajamos bajo NDA cuando el cliente lo requiere.» | §7:174 | Regla: «acostumbrados a trabajar bajo NDA» no tiene respaldo (A9). La pregunta no se toca: el parche calza por la pregunta exacta (censo #67) hasta que entre la migración. |
| 16 | Contacto, paso 01 | **Decidido y sin aplicar.** Hoy: «Un correo con tu URL basta. Si quieres, agrega contexto: qué vendes, quién es tu cliente, qué te preocupa.» Decidido: «Un correo con tu URL basta. Si quieres, cuéntanos qué vendes y qué te preocupa de tu sitio.» | §7:189 | Segunda serie de tres de la página (A3). Clara P lo aplica en `paginas-v3.json#/contacto/secciones/1/bloques/0/d` (la copia muerta está en `…/secciones/1/parrafos/0`). |
| 17 | Contacto, ayuda bajo «Sitio web» | «Si partes de cero, escribe «no tengo» y cuéntanos tu proyecto abajo.» | §7:222 | Transitoria, con «redacción final: Clara»: la redacción es libre. El campo sigue obligatorio (decide Ramón). |
| 18 | Contacto, meta | sin «Sin compromiso.» | §7:223 | Regla. |
| 19 | Índice de servicios, nota de Visibilidad | «No hace falta reconstruir para que una IA pueda citarte.» | §7:176 | La primera frase repetía el h2. |
| 20 | Índice, banda Desarrollo | sin nota | §7:176 | Tres textos seguidos decían que el sitio nace legible para la IA. |
| 21 | Índice, descripción de Desarrollo web | «El sitio nace legible para las máquinas que hoy recomiendan tu negocio. Lo compruebas con el chequeo gratis, sobre tu dominio, antes y después.» | §7:176 | «el chequeo gratis» y no «el mismo chequeo». La hoja de la home es cerrada; el índice necesita hoja propia (`dIndice`, censo #81). |
| 22 | Índice, lo que pone el cliente | h2 «Lo que pones tú», «Contenido creativo: redacción y guiones de piezas.», pie «Si no tienes quién lo produzca, te conectamos con partners.» | §7:176 | De la publicada; «Creación de contenido» negaba el contenido de Acompañamiento. |
| 23 | Índice, cierre | «Empieza por el chequeo»; guía con ChatGPT, Claude y Perplexity; «Correr el chequeo» + «Pedir el diagnóstico» | §7:176, :156 | El botón del chequeo describe el chequeo automático. |
| 24 | Índice, title (Simón) | «Soluciones: SEO técnico, visibilidad en IA y desarrollo web · SpindleLab» | §7:177 | Lo decide Simón. |
| 25 | Servicios, cierre | h2 + guía + «Pedir el diagnóstico gratis»; «Correr el chequeo» en Visibilidad, Auditoría y Acompañamiento | §7:192 | La oferta concreta en 24 horas, que el pie no dice. Ver la propuesta de la sección 3. |
| 26 | Servicios, `PROPIO` y `CORRIGE` | líneas bajo el h1, notas, entradas, «Lo que incluye» de Acompañamiento, cierres de Acompañamiento y Paid Media; «celular y computador»; «Del mini-diagnóstico gratis a la auditoría»; FAQ «Desde el plan Orgánico + Pauta.»; sin «equipo dedicado», «sin compromiso», «motor», «200 hallazgos» ni «el creativo lo pones tú» en la nota de Redes | §7:193 | Transitoria en cuanto a dónde vive el texto (lo cierra la migración); el contenido de cada corrección es regla. Quedan para Clara S las dos cosas que la fila pide: una serie de tres por página, y los dobles de Visibilidad (protocolo repetible ×4, la no-garantía ×2, ojo con R2) y de Redes. |
| 27 | Servicios, enlaces del texto | «protocolo público», «servicio de acompañamiento mensual», «Gestión de redes sociales», «Paid Media (Google)» | §7:191 | Una vez por página y solo en lo visible. Si la frase cambia, el enlace se pierde sin aviso (censo §1.7): la propuesta conserva la frase o lo dice. |
| 28 | Visibilidad, cierre | «Te mostramos qué dicen de tu empresa los motores de IA» + «Envíanos tu URL y en 24 horas tienes el mini-diagnóstico gratuito.» | §7:250 | Afirmación, no pregunta (A5). |
| 29 | Auditoría y home | «Qué te frena y qué arreglar primero.» (`oferta-v3.json`, dos hojas); «Primero lo que hay que arreglar, no lo cosmético.» (Auditoría, bloque B) | §7:250 | Fuera «qué mueve la aguja». El h2 del cierre de Auditoría, «Te mostramos qué arreglar primero», no viene de esta fila: es libre. |
| 30 | Home, una serie de tres | Acompañamiento «Implementación continua e informes quincenales de SEO técnico o de visibilidad en IA.»; Redes «Orgánico y pauta social en LinkedIn y Meta.» | §7:250 | A3. La de Acompañamiento además es R2. |
| 31 | Home, title (Simón) | «SEO técnico y visibilidad en IA en Chile · SpindleLab» | §7:238 | Title de producción, 53 caracteres. |
| 32 | Método, cabecera y cierre | «Correr el chequeo» + «Ver las cuatro fases»; h2 «El primer paso es gratis» | §7:196, :211 | |
| 33 | Método, fase 04 | «nuestro protocolo público» enlaza al artículo | §7:197 | Regla: la prueba de una afirmación no la contradice. La cadencia es R2. |
| 34 | Nosotros | bio verbatim; «chequeo» nombra solo el automático; cierre «Pedir el diagnóstico» + «Correr el chequeo»; h2 «¿Apareces cuando tus clientes preguntan?» entero | §7:179 | Regla (manual §08). |
| 35 | Nosotros, dos decisiones abiertas | «El objetivo no es solo que vendas. Es que…» (A4) y «Gratis, en 24 horas» dos veces (A10) | §7:180 | R4 (sección 7). |
| 36 | Trabajo | Raigal: «Clínica de implantología. Por ahora, solo la portada: costo y plazos, etapas, la especialista, lo que no se promete y preguntas frecuentes.»; rubro de Verifica y Cumple «Herramienta» | §7:200 | Regla: ninguna afirmación sin respaldo (era «Sitio completo…»). |
| 37 | Trabajo, title (Simón) | «Trabajo: sitios que construimos · SpindleLab» | §7:248 | |
| 38 | Rótulos de obra | «Combeau, fotografía · Cliente», «Combeau, modelo · Cliente», «Verifica y Cumple · Producto propio», «Raigal · Implantología», más «Pieza de concepto · no es un cliente» | §7:233, :243 | Un rótulo por obra (A6). |
| 39 | Alt de las imágenes | una imagen, un alt; el de una obra nombra el titular de su portada | §7:210, :274 | Se cambia solo si describe mal, y en todas las páginas a la vez. |
| 40 | Desarrollo web, cierre | «Cuéntanos qué necesita comunicar tu sitio» / «Si ya tienes uno, empezamos con el diagnóstico gratuito. Si partes de cero, conversemos tu proyecto directamente.» + «Escríbenos» + «Correr el chequeo» | §7:241 | Verbatim del cierre publicado. «diagnóstico gratuito» choca con 2.2: la fila decidió el cierre, no el nombre del paso, y la página mezcla; se puede unificar con ese motivo. |
| 41 | Blog y artículos, cierre | h2 «Leer ayuda; medir, más.», guía, «Es el mismo chequeo con el que partimos cada proyecto.», «Correr el chequeo» + «Escríbenos» | §7:159, :211, :275 | Mismas palabras en el índice y en el artículo. El texto está escrito dos veces (`blog/index.astro:182-186` y `blog/[slug].astro:319-323`): un cambio va a los dos. |
| 42 | Titulares con punto | «Leer ayuda; medir, más.», «No te prometo. Te muestro.» | §7:211 | Titulares de dos frases. |
| 43 | Resultado del chequeo (`v3-chequeo.js`) | «Pedir el diagnóstico»; el remate «El diagnóstico te dice…» sin «completo»; veredicto ≥ 90 «…ya no está dentro de tu sitio.»; «Prefiero hablarlo contigo» | §7:202 | Conversión; sin «acá». |

**De `acta-qa-final.md`, «Decide Ramón»** (no se tocan en E8): la FAQ de la home (R7), la
cadencia del Esencial (R2), los tres «acá» del artículo y la frase de la bio (R4), y «Sitio
web» obligatorio en contacto.

---

## 5 · Frases y tics prohibidos, con su prueba rápida

Dos grupos, porque se resuelven distinto en el paso 5: en **5a** la objeción del crítico gana;
en **5b** decido yo y dejo la razón escrita. «Hoy» está medido en la extracción, fuera de lo
cerrado salvo que diga otra cosa.

### 5a · Reglas duras

| Qué | Prueba rápida | Hoy |
|---|---|---|
| Raya | `[—–]` | 0, cuerpos incluidos |
| «acá» | `\bacá\b` | 0 (3 en el cuerpo del artículo de los 21 chequeos, verbatim) |
| Voseo | `\b(querís\|podís\|tenís\|sabís\|vos)\b`, más leer los imperativos en voz alta | 0 |
| Castellano de otro lado (A7) | `\b(móvil(es)?\|coste\|ordenador\|os)\b`; «vale la pena» no cuenta | 0 (3 «móvil» en cuerpos de artículo) |
| «Usted» al visitante (A7) | `\busted\b`, y «su sitio», «su empresa» dirigidos al lector | 0 |
| Prueba social o plural de tamaño sin respaldo (A9) | `equipo dedicado\|nuestro equipo\|expertos\|clientes satisfechos\|años de experiencia\|\d+ clientes` | 0 visible. «Equipo dedicado» sigue tapado en `servicios-v3.json#/acompanamiento-mensual/secciones/1/planes/2/tagline` y `#/acompanamiento-mensual/offerCatalog/itemListElement/2/description`, y muerto en `oferta-v3.json#/momentos/2/planes/2/d` |
| «acostumbrados a trabajar bajo NDA» (A9) | `acostumbrados` | 0 visible; tapado en `paginas-v3.json#/contacto/faq/2/r`. «trabajamos bajo NDA cuando el cliente lo requiere» se queda: las 2 apariciones de «bajo NDA» en contacto son correctas |
| Comparación más amplia que su respaldo (como «Ninguna herramienta del rubro…») | `ninguna\|nadie más\|la mayoría\|únic[oa]\|el único\|líder`, y preguntar qué fuente lo mide y si la frase dice más que la fuente | La frase vetada, 0 (tapada en `paginas-v3.json#/diagnostico/secciones/0/parrafos/0`). Caso vivo para revisar: índice, «Los publicamos a propósito: la mayoría del rubro no lo hace.». La fuente (`marketing/inteligencia-mercado/competidores.md:33`) cuenta tres competidores directos que no publican precios. |
| Title Case (A6) | dos o más palabras seguidas con mayúscula que no son nombre propio ni nombre de plan | 0 visible fuera de nombres de plan |
| Cadencia agregada o quitada (R2) | los dos conteos de 1.10 antes y después | 51 y 238 |
| Singular nuevo de la marca (R4) | verbos en primera singular fuera de la lista de 1.2 | 0 nuevos |
| Cifra, plazo o precio cambiado | comparar contra 1.11 | · |

### 5b · Estilo

| Qué | Por qué | Prueba rápida | Hoy |
|---|---|---|---|
| Verbos de folleto (A1) | dicen que algo bueno pasa sin decir qué | `impuls\|potenci\|transform\|revolucion\|maximiz\|siguiente nivel\|a tu medida\|soluciones`, y preguntar si el verbo tiene un objeto verificable. «optimizamos las señales que los modelos usan para elegir fuentes» lo tiene; «optimiza tu presencia», no | 0 |
| Relleno de apertura (A2): «Cada vez más…», «Cada día más…», «Hoy más que nunca», «En un mundo…» | carraspeo antes de hablar | `cada (vez\|día) más\|hoy más que nunca\|en un mundo\|en la era`, y borrar la primera frase: si no se pierde nada, era relleno | 0 fuera de lo cerrado. «cada vez más» está en `.d-pres` (verbatim de Ramón) y en un cuerpo de artículo. «Cada día más…» y «Cada vez más…» viven tapados en `servicios-v3.json#/visibilidad-en-ia/lead` y `paginas-v3.json#/diagnostico/lead` |
| Serie de tres (A3) | ritmo, no contenido | una por página: borrar el tercero y ver si mejora. Leer, entender y citar no es tic donde nombra los tres bloques del chequeo, pero ocupa la serie de esa página | §7:193 pide revisarlo en Servicios; §7:189 en Contacto |
| «No solo X, sino Y» (A4) | contraste vacío | `no (es )?solo .{0,60}(sino\|es)` | 0 fuera de la bio («El objetivo no es solo que vendas», R4). «no solo con tu sitio» en la FAQ de Diagnóstico es un contraste real y se queda. El reencuadre de Ramón «No es X. Es Y.» sí vale, una vez por página y si el contraste se puede verificar |
| Pregunta retórica y «¿Listo para…?» (A5) | pregunta lo que debería afirmar | una pregunta por página fuera de la FAQ, y solo si la responde un dato propio. Las preguntas de FAQ no cuentan | el h1 de Diagnóstico «¿Te puede leer la IA?» (lo responde el instrumento) y el h2 de Nosotros «¿Apareces cuando tus clientes preguntan?» (publicado, §7:179) |
| «sin compromiso», «sin costo ni compromiso» | frase de folleto que la respuesta ya cubre (§7:168, :174, :223) | `sin (costo ni )?compromiso`. Ojo: `sin compromiso` solo no encuentra la segunda | 1 visible, con su copia en el FAQPage: contacto, «¿El diagnóstico es realmente gratis?» (`paginas-v3.json#/contacto/faq/0/r`). Además, un título del cuerpo de un artículo (verbatim) |
| «motor» como metáfora del negocio (B8) | jerga interna | `\bmotor\b` en singular. «los motores de IA» es otra cosa y se queda | 0 fuera de la bio («orquestando el motor», «poner el motor a funcionar entero», R4) y de los cuerpos de artículo. Tapado en ocho hojas de Redes y Paid Media (censo, primera tabla) |
| «eje» fuera de la bio | jerga del posicionamiento anterior | `\beje\b` | 1: Paid Media, «El sitio es el eje; la pauta lo acelera.», que va con R4 (P46) y no se toca |
| «orquestar» | jerga de la bio | `orquest` | 2 visibles en Redes («nosotros orquestamos el brief…», «SpindleLab orquesta la estrategia…») y la meta de Redes (Simón). Candidatos |
| «pieza» por servicio | 2.12 | `(esta\|su propia) pieza` | 2 (FAQ de Redes y de Paid Media) |
| Tic 1: la frase que evalúa a la anterior (`voz-spindlelab`) | Ramón lo rechazó por escrito | leer la última frase de cada párrafo: ¿agrega un hecho o solo califica? Más de dos remates por página suena a máquina (corpus §3) | Para mirar, sin veredicto: «Sin sorpresas.» (precio de Desarrollo web), «Sí, y ahí está la diferencia.» (Paid Media), «Sin permanencias largas ni letra chica.» (Acompañamiento), «Eso se mueve y se mide.» (Visibilidad), «Solo lo que la IA de verdad responde.» (Visibilidad, R2) |
| Tic 2: dos puntos como anuncio, párrafo tras párrafo, y secciones rotuladas («Lo práctico…», «Una precisión…») | se lee como informe | contar los «X: Y» de la página. Los de «Título: cuerpo» en las listas de servicios no cuentan: la plantilla los parte en h3 y p (`partir`, censo §1.7) | |
| Sobreescritura (A10) y la prueba del 30 % | la IA escribe de más | en cada ranura libre, borrar un 30 % y leer: si mejora, la propuesta borra. En una página, la misma idea dos veces es defecto; entre páginas, solo si una repite el texto con el que el visitante llega (P86) | sección 8 |
| «diagnóstico completo», «análisis completo», «auditoría gratis» | el paso gratis es el mini-diagnóstico | `diagnóstico completo\|análisis completo\|auditoría gratis` | 0 |
| Gemini en lo que hace el chequeo | es falso | «Gemini» en una frase sobre el chequeo automático | 0. Los 20 «Gemini» que quedan hablan del mini-diagnóstico, de los servicios pagados o de un artículo |
| Anglicismos con palabra aquí | 1.7 | `\bpacks?\b\|retainer\|social ads\|\bemail\b` | «Cada pack» (Desarrollo web), «Retainer mensual» (tres Offer, R2), «(social ads)» (Redes ×2), «Email» (etiqueta de contacto). «share-of-voice» va con R2 |

**La búsqueda del plan, ajustada.** El plan pide que
`equipo dedicado|bajo NDA … acostumbrados|el motor|sin compromiso|Cada (día|vez) más|ninguna herramienta del rubro|móvil|coste`
dé 0 en el texto de `dist/v3`. Con lo cerrado adentro no puede dar 0: hoy hay 1 «cada vez más»
en `.d-pres`, 2 «el motor» en la bio, y en los cuerpos de artículo 1 «cada vez más», 3 «el
motor», 3 «móvil» y 2 «sin compromiso» (un h2 del cuerpo y su fila en el índice del
artículo). Propongo que la aserción sea **0 fuera de las zonas cerradas, e igual a la base
dentro de ellas**, y que `sin compromiso` pase a `sin (costo ni )?compromiso`, que hoy sí
encuentra la de contacto (2: visible y FAQPage).

---

## 6 · Límites: las ranuras de Simón

**Cuáles son:**

- `<title>`, meta description, og:title y og:description, en las 21 rutas.
- El h1 de las 21 rutas, y todo h2 que lleve un término de búsqueda: nombre de servicio, SEO,
  IA, AEO, GEO, visibilidad, auditoría, Google, ChatGPT, chequeo, diagnóstico, precio o costo.
- Las preguntas de FAQ, que son el `name` del FAQPage. Visible y grafo dicen lo mismo y cambian
  juntos. Las respuestas no son de Simón: aceptan cualquier cambio de esta hoja.
- Las Offer: `name`, `description` y `OfferCatalog.name`.
- El HowTo de Método: `name`, `description`, `HowToStep.name` (que es el h3 de cada fase) y
  `HowToStep.text` (escrito aparte en `metodo.astro:162-167`, con R2 en el paso 4).
- Los nombres del grafo: `serviceName`, `serviceType`, `WebPage.name`, `CollectionPage.name` y
  su `description`, `ItemList.name`.
- Fuera de todo: los nodos que emite `Layout.astro` (organización, persona, `makesOffer`,
  `jobTitle`), que son R5.

**Qué aceptan: solo cambios de voz.** Un cambio de voz arregla algo de la sección 5 o del
glosario de la sección 2 y deja igual el término de búsqueda, el sentido, el largo dentro de
su tope (el title, hasta 65 caracteres, §7:238; la meta, el largo que tiene) y la igualdad
entre lo visible y el grafo. Simón veta cualquier propuesta de Clara en estas ranuras. Si el
texto vigente rompe una regla dura de 5a, el arreglo es obligatorio y la redacción la elige
Simón.

**La prueba del 30 % no aplica aquí.** En estas ranuras no se borra para aligerar: el largo lo
pone su uso.

**Lo que dejo anotado para Simón**, sin proponerlo como cambio por mi cuenta:

- Visibilidad: el h1 sin «(AEO/GEO)» (2.11) y el plan «Auditoría + Visibilidad en IA» en su
  Offer (2.10).
- Contacto: la pregunta «¿El diagnóstico es realmente gratis?» en una página que llama al paso
  «mini-diagnóstico» en el h2, el botón y la respuesta. Propuesta de voz: «¿El mini-diagnóstico
  es realmente gratis?».
- La meta de Redes dice «orquestado con agentes de IA» (5b).
- La meta de la home («…para que ChatGPT, Gemini y Perplexity te recomienden antes que tu
  competencia») promete un resultado que el mismo sitio dice que nadie garantiza («No
  prometemos: Garantizar una respuesta exacta», Visibilidad; «Sin promesas mágicas», Método).
  Es de contenido, no solo de voz: lo anoto y no lo propongo.
- El title de Método, «Nuestro método de auditoría SEO + visibilidad en IA», es también R7
  (alcance): no se toca.

---

## 7 · Lo que queda para Ramón y cómo se marca

**Cómo se marca.** R2 tiene estado propio. R3, R4 y R7 van `cerrado`, con el motivo empezando
por la R («R4: bio verbatim, decide Ramón»), `propuesta` igual a `actual` y sin fila en el
registro de ranuras abiertas. Las opciones para Ramón no van en la ranura: van al anexo de
`copy-secciones.md` (paso 4), y en `e8-antes-despues.md` aparecen arriba, como decisiones
pendientes.

### R2 · El monitoreo de menciones en IA y su cadencia

- **Qué abarca:** toda frase que prometa medir menciones en IA (monitoreo, medición, «protocolo
  público», «consultas medidas», «share-of-voice», «Solo lo que la IA de verdad responde») y
  toda palabra de cadencia de 1.10. Los lugares son los de la compuerta G2 de
  `lista-publicacion.md` (:74), más las descripciones de las Offer con «Retainer mensual».
- **Qué puede hacer el pase:** nada en la promesa ni en la cadencia. Si la ranura tiene además
  un defecto de 5a, se arregla dejando la promesa y la cadencia idénticas, palabra por palabra.
  Lo demás, «se mantiene · R2».
- **Qué deja el pase:** en `copy-secciones.md`, la tabla de R2 escrita sobre el texto nuevo,
  lista para aplicar en P0.2 con cualquier respuesta (mensual o quincenal; con monitoreo o sin
  él).
- Los enlaces de «protocolo público» (Visibilidad y Acompañamiento) caen en frases R2 y siguen
  enlazados.

### R3 · «Integra desarrollo web y mantención»

- **Ranuras:** `servicios-v3.json#/acompanamiento-mensual/secciones/1/planes/2/puntos/2` y la
  Offer `#/acompanamiento-mensual/offerCatalog/itemListElement/2/description`. Estado
  `cerrado`, motivo «R3».
- Esa misma Offer empieza con «Equipo dedicado y multi-servicio», que hoy tapa `CORRIGE`
  (censo #5). La migración lleva al JSON lo corregido; la parte de R3 no cambia.

### R4 · El paquete de la bio de Nosotros

- **Ranuras, todas `cerrado` con motivo «R4»:** la bio entera (`nosotros.astro`: `presentacion`,
  `trayectoriaEti`, `trayectoria`, `porque`, `primero`, `puntos`); «Te lo muestro antes de que
  pagues nada.» (`nosotros.astro:196`); y en Paid Media, «El sitio es el eje; la pauta lo
  acelera.», la segunda mitad de `servicios-v3.json#/paid-media/secciones/0/lista/4` (P46).
- **Lo que Ramón decide en el paquete:** singular o plural en «Te lo muestro» (la publicada dice
  «Te lo mostramos»); los dos «eje» y los dos «motor» de la bio; «El objetivo no es solo que
  vendas…» (A4, §7:180a); «Gratis, en 24 horas» dos veces (A10, §7:180b); y, si la bio deja de
  decir «eje», la frase de Paid Media.
- **Lo que sumo al paquete:** el criterio de singular o plural que Ramón elija para «Te lo
  muestro» alcanza también a «No te prometo. Te muestro.», el h1 de Nosotros y el h2 de la
  home. Es el mismo caso (mostrar antes de cobrar es algo que la empresa entrega), y el
  traspaso pidió un solo criterio para los dos (`pendientes-traspaso-detalle.md`, hueco de
  A04). E8 no lo cambia.

### R7 · Copy nuevo o dato que decide Ramón

- **FAQ de Diagnóstico:** `paginas-v3.json#/diagnostico/faq/4/r` («… qué te frena y qué
  arreglar primero …», visible y FAQPage). Estado `cerrado`, motivo «R7».
- **Alcance de Método:** `paginas-v3.json#/metodo/lead`, que hoy, tras los parches, se lee
  «Cada proyecto sigue el Método SpindleLab, nuestro proceso de auditoría SEO + visibilidad en
  IA. Aquí está completo, fase por fase, para que sepas qué esperar antes de escribirnos.», y
  el title de Método. Estado `cerrado`, motivo «R7».
- **«67 de 69»:** hoy no está en el sitio. Va como opción en el anexo, con su fuente
  (`marketing/metricas/corridas-chequeo-2026-08-31.md`) y lo que se midió de verdad: 67 de 69
  sitios sin preguntas frecuentes marcadas (FAQPage), en corredoras y oficinas contables de
  Santiago, agosto de 2026. Lugar propuesto: Diagnóstico, junto a «¿Te pueden citar?». No se
  aplica.
- **Verifica y Cumple en la home y la FAQ de la home:** no tienen ranura (el hero está cerrado,
  R6). No se marcan en E8.

**Lo que no es de E8, ni se marca ni se toca:** R1, R5 (Layout: cargo, orden de `makesOffer`,
Inter, `sameAs`), R6 (hero), R8 (producción) y R9 (Raigal). Tampoco «Sitio web» obligatorio:
la ayuda bajo el campo se puede redactar; el campo no cambia.

---

## 8 · Repeticiones conocidas (para el paso 4)

- **P86.** «Las máquinas que hoy recomiendan tu negocio» está en la línea del campo Desarrollo
  de la home (cerrada), en la guía de la entrada de Desarrollo web (`desarrollo-web.astro:231`,
  que se reescribe) y en el párrafo del menú (`NavV3.astro:163`, en las 21 rutas). La guía
  nueva no puede repetir ni la línea ni el menú.
- **El clic de «Correr el chequeo» desde el índice.** El cierre del índice dice «Pon tu dominio
  y ves en segundos si los robots de ChatGPT, Claude y Perplexity pueden entrar a tu sitio.
  Gratis y sin dejar tu correo.» y la primera línea que se lee al llegar a Diagnóstico es «Pon
  tu dominio y revisamos al instante si los robots de ChatGPT, Claude y Perplexity pueden
  entrar a tu sitio, …». El cierre de Trabajo dice lo mismo que el del índice. Es el criterio
  de P86, y la línea de Diagnóstico está decidida (§7:168): lo que cambia es el cierre.
- **«Es el mismo chequeo con el que partimos cada proyecto.»** En el cierre de los 8 del blog y
  en Trabajo, y casi igual en la nota del hero y en `.d-pres` (cerradas). En la home se lee dos
  veces antes del primer campo, pero las dos son cerradas.
- **Redes** dice «métricas de vanidad» dos veces (lo que incluye y la FAQ «¿Cómo miden
  resultados?»).
- **Visibilidad:** «protocolo repetible» ×4 y la no-garantía ×2 (§7:193). Ojo con R2.
- **Nosotros:** «Gratis, en 24 horas» ×2 (R4).
- Los cierres de servicio repiten «Envíanos tu URL y en 24 horas tienes el mini-diagnóstico
  gratuito.». Es el mismo componente en cada página y se acepta, como el pie.

---

## 9 · Cómo se llena el registro (paso 3)

Cada ranura no cerrada lleva su fila:
`{clave, rutas, fuente:{archivo, puntero|ancla}, actual, propuesta, motivo, estado, toca_jsonld}`.

- `motivo` nombra la regla (A3, tic 1, glosario 2.2, P86, §7:189…), nunca «suena mejor». Si la
  ranura es `decidido-§7`, dice el número y cómo la propuesta responde al motivo de la fila.
- «Se mantiene» es una fila válida y lleva su motivo. Eso es lo que hace al pase completo.
- `toca_jsonld` en sí cuando la hoja también va al grafo (FAQ, Offer, HowTo, CORRIGE).
- Una frase enlazada (`ENLACES`, `PROTOCOLO`, el «chequeo» de Desarrollo web) o partida
  (`partir`) se conserva tal cual, o el motivo dice que el enlace o el corte se mueve.
- Antes de cerrar la fila: leerla en voz alta. Si no suena a algo que Ramón diría en una
  reunión, no es su voz.
