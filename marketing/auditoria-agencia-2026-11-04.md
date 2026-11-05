# Auditoría de SpindleLab · 4-nov-2026

**Pedido de Ramón (4-nov):** una revisión exhaustiva de la agencia: cómo estamos, qué se construyó, qué está obsoleto, qué no vende y qué podría adquirir para mejorar la intención de compra. En cuatro meses no ha logrado ventas por el sistema y siente que otros ganan con servicios hechos con IA.

**Quién la escribe:** la sesión maestra, con tres análisis en paralelo (inventario del repositorio, cifras comerciales, investigación de mercado) y verificaciones propias.

**Cómo leer la evidencia.** Cada dato lleva una marca:
- **[V]** lo comprobé yo hoy (sitio vivo, Gmail, cuenta de Meta, git, la página oficial).
- **[M]** medido en un archivo del repositorio, con fecha.
- **[R]** reportado por Ramón o por una sesión, sin comprobante a la vista.
- **[E]** cálculo o inferencia mía.
- **[W]** dato de la web, de fuente externa; si dice «extracto», solo vi el resumen del buscador.

---

## 0. Veredicto en diez líneas

1. **No es un problema de «quedarse atrás de la IA».** En cuatro meses salieron **tres clientes**: dos de sitio web (Bernardo y María) y uno de marketing en Meta (Carlos Soya, piloto de tres meses acordado el 28-oct). Son unos **$2,5 millones contratados** y unos **$937.000 cobrados** sin contar a Carlos, cuyo primer pago no consta en Gmail [R]. No es cero, pero no lo produjo el sistema que se construyó. *(La primera versión de este informe no contó a Carlos como cliente; fue un error.)*
2. **Lo que vende es un sitio web a medida, vendido a personas que ya conocían o les recomendaron a Ramón.** Los dos cierres y las dos propuestas de origen frío que más avanzaron (Cortes Zamora y Eduardo) son sitios web [M]. El único servicio de marketing vendido es el piloto de Meta de Carlos Soya, a $200.000 al mes, muy por debajo del catálogo. Ninguna venta vino de SEO, visibilidad en IA, anuncios propios, redes propias ni de la campaña masiva de Verifica y Cumple.
3. **Se construyó una máquina enorme para producir y casi nada para que alguien compre.** 893 commits en `main` y unos 916 más solo en ramas; 26 skills; 2.242 archivos de marketing; un producto de 12.400 líneas. El alcance real es mínimo: 383 seguidores en el LinkedIn personal, 15 en la página, 19 en Instagram, 0 consultas por el formulario del sitio en 90 días [V].
4. **El embudo pierde después de que alguien responde.** El correo frío responde 4,9 %, una cifra normal a buena. Las conversaciones mueren con «quedo atento», silencio tras la cotización, cancelación o presupuesto.
5. **El test fue demasiado pequeño para condenar la oferta.** Con las tasas típicas de correo frío, 142 correos dan unos 1 interesado [W, extracto]. Que dieran 0 clientes no prueba que «no vende»: prueba que casi no se probó.
6. **Hubo seis mensajes distintos en cuatro meses** (cinco cambios), y cada cambio rehízo sitio, skills y documentos. Ninguna oferta corrió el tiempo ni el volumen suficientes para medirse.
7. **El sitio se pule mientras nadie llega a él.** Entre el 3 y el 4-nov se mergearon seis solicitudes de cambio visual (#58, #59, #64, #65, #67 y #68: portada, encabezado, imágenes, videos e ilustraciones animadas), y los visitantes no se miden (todos los pulsos dicen «sin dato»).
8. **Verifica y Cumple consumió muchísimo y tiene 0 ventas a clientes reales.** Y su razón de comprar ahora (la ley, el 1-dic) puede moverse al 15-oct-2027 si la Cámara confirma al Senado [V].
9. **Lo que hoy funciona y casi nadie usa:** entrega de calidad (Bernardo pagó, volvió a pedir +31 % y refirió a María) y referidos. Es el canal que cerró.
10. **Las ayudas del Estado para digitalizar pymes pagan justo el tipo de cosa que Ramón vende** (el Kit Digital de Sercotec cubre sitio web: $1,2 millones, [V]). Es la palanca de dinero externo más concreta que encontré, con la salvedad de que la próxima convocatoria no está confirmada.

---

## 0b. Lo de fondo: seis ideas que ordenan todo lo demás

*(Agregado el 5-nov, después de que Ramón dijo que el informe no se entendía y que había cosas más profundas. Son hipótesis con pocos casos; abajo está qué las desmentiría.)*

**1. Los que compran son personas que se venden a sí mismas, no empresas.** Los cuatro que llegaron a una cotización real tienen una cara y un nombre propio: Bernardo (fotógrafo y modelo), María (galería de arte, con artistas), Carlos (cantante y productor, ahora academia vocal) y Eduardo (contador con canal de YouTube y cursos propios) [M, V]. En cambio, las 270 primeras tomas de contacto fueron a abogados, clínicas, asesoras financieras, hoteles e inmobiliarias [M]: 0 ventas. La agencia se describe como consultoría de SEO técnico para empresas B2B y de salud, legal y finanzas, pero quienes han pagado son creadores y marcas personales.

**2. Se compra en una conversación, no leyendo el sitio.** Cada venta tuvo una conversación en vivo antes del precio: contacto directo, WhatsApp de un cliente, reunión por Meet. Ninguna vino del sitio, de anuncios ni de redes. Por eso hay 0 consultas por el formulario en 90 días. El sitio no genera clientes hoy: sirve para que el referido compruebe que Ramón es serio (Hinge: la gente revisa el sitio antes de hablar).

**3. Compran a alguien que lo haga con ellos, no «IA».** Lo que describen las ventas es un proceso: cotización a medida, fases con aprobación, un panel para editar. La IA es el motor de producción y el cliente no la compra. Por eso comparar a SpindleLab con quienes «ganan con IA» confunde: ellos suelen vender agentes y automatizaciones a empresas medianas, o cursos a otros que quieren vender IA. Ese comprador no es el de Ramón.

**4. Todo lo que se vendió se construyó después de que alguien lo pidió; todo lo que se construyó antes de que alguien lo pidiera tiene 0 ventas.** Vendido: los dos sitios y el piloto de Carlos, cotizados tras una conversación. Construido primero y sin ventas: el servicio de visibilidad en IA y su blog, el motor de revisión previa (6.892 archivos), Verifica y Cumple (12.402 líneas), el agente de WhatsApp (descartado), el rediseño del sitio en tres rondas. Es la regla más útil de esta auditoría: **no construir nada que no tenga un nombre propio al lado.**

**5. Los canales construidos apuntan a donde no están los compradores.** El correo frío y LinkedIn (383 y 15 seguidores) apuntan a profesionales de empresa; los compradores reales están en Instagram, en galerías, en el mundo de la música y de la fotografía y en la red de Bernardo. Instagram tiene 19 seguidores y llevaba 43 días sin publicar al 19-oct [M]. Es la hipótesis más fácil de probar: diez mensajes a creadores del círculo de Bernardo y de María, comparados con la tasa de abogados.

**6. Falta la meta escrita.** El plan de 90 días pedía «1 a 2 clientes al día 60» y hay tres. No existe en ningún documento cuánto necesita Ramón facturar al mes ni desde cuándo. Sin ese número, «no he tenido éxito» no se puede medir, y la comparación termina siendo con desconocidos de internet. Es el dato que falta para decidir cuánto tiempo darle a cada camino.

**Qué desmentiría estas ideas:** si diez conversaciones con creadores en dos semanas dan menos respuesta que los abogados (5,8 %), o si los cuatro de arriba tienen en común otra cosa (por ejemplo, haber conocido antes a Ramón en persona), entonces el factor es la relación y no el tipo de cliente. Esa diferencia importa: cambia dónde buscar.

**Una advertencia sobre Carlos.** Es el primer cliente de marketing, y por eso el más valioso para probar la línea «marketing con IA». También el más frágil: el alcance cambió dos veces (de terapias 5D a academia vocal), su cuenta tiene unos 1.019 seguidores, nunca ha dado clases formalmente y la pauta la paga con su tarjeta. Si el piloto logra alumnos en EE.UU., es el segundo caso; si no, hay que saber pronto por qué.

---

## 1. Dónde estamos: los números

### 1.1 Clientes y dinero

| Quién | Cómo llegó | Servicio y precio | Cobro | Marca |
|---|---|---|---|---|
| Bernardo Combeau | Contacto directo (8-jul) | Plan Esencial $392.000 + ampliación $120.000 = **$512.000** (IVA incluido, como persona natural) | Pagado al 100 % según Ramón; solo $156.800 con comprobante en el repo | [R] |
| María Loreto (Módulo 369) | Referida por Bernardo (26-sep) | Sitio Completo $1.190.000 + IVA = **$1.416.100** | 30 % ($424.830) cobrado; saldo ≈ $991.270 en entrega | [R] |
| Carlos Soya (academia vocal) | Reunión 10-sep, origen no consta | **Piloto de Meta y Reels, 3 meses**: $200.000/mes de honorarios (= $600.000) + $100.000/mes de pauta con su tarjeta. Cliente según Ramón | Primer pago: no consta en Gmail | [R] |
| Focus Contable (Eduardo Bascur) | Correo frío (30-sep) | Sitio Completo, cotización SPL-COT-2026-017 | Dijo que sí con fecha: **posterga a mayo-junio de 2027** | [V] |
| Bla! (redes, $390.000/mes) | LinkedIn | Cotización de redes, envío sin verificar | $0 | [R] |
| Cortes Zamora, Chef & Hotel, Legal Prisma, Altum, Dentimagen | Correo frío | Cotizaciones o diagnósticos | $0. Cortes cerrado por tope, Legal Prisma en pausa por rebrand con otra consultora | [M] |

**Resumen:** contratado ≈ $2,53 M (sitios $1,93 M + piloto de Carlos $0,6 M); cobrado ≈ $937.000 sin contar a Carlos [R]; propuestas con precio, unas 8 [E]. De las 3 propuestas nacidas de correo frío, 0 se ganaron, y una (Eduardo) quedó en «sí, más adelante».

### 1.2 Embudo por canal

| Canal | Qué se hizo | Resultado | Marca |
|---|---|---|---|
| Correo frío SEO / visibilidad en IA | 142 contactos, 226 toques (agosto) | 7 respuestas (4,9 %), 1 llamada, 2 propuestas, 0 clientes | [M] |
| Correo frío Verifica y Cumple | ≈ 36 + 10 + 27 + 31 correos (sep-oct) | 0 respuestas positivas, 0 entradas al pipeline, varios «no me escriba más» | [R] |
| Motor de revisión previa (kit $149.000) | 58 primeros toques, 56 segundos, 33 terceros (16-30 oct) | 0 respuestas, 2 rebotes | [M] |
| DiarioEmprende (guía de emprendimiento) | 14 correos | 1 respuesta (Focus Contable): reunión, cotización, «sí, en 2027» | [M] |
| Reencuentros a calientes (19-oct) | 4 correos | 3 respuestas (Carlos, Eduardo, Sebastián) | [M] |
| Formulario de spindlelab.cl | 90 días | **0 consultas reales** (los 4 avisos que hay son pruebas de Ramón o de QA) | [V] |
| LinkedIn y Instagram | ≈ 19 publicaciones personales y ≈ 8 de la página | 20 a 102 impresiones por pieza en el perfil personal; 10 a 398 en la página; 0 ventas | [M] |

### 1.3 Anuncios

| Campaña | Gasto | Resultado | Marca |
|---|---|---|---|
| Google Ads (13-jul a 24-ago) | $100.411 | 104 clics (CTR 16 %), **0 conversiones** | [M] |
| Meta, julio | $20.656 | 280 vistas de página, 0 leads | [M] |
| Meta, Verifica y Cumple (activa) | **$21.653** de $100.000 al 3-nov | 11.527 impresiones, 1.062 clics, 647 vistas de página, **0 pedidos de clientes** | [V] |
| **Total** | **≈ $142.700** | 0 ventas | [E] |

### 1.4 Verifica y Cumple

- Chequeos públicos del 23-oct al 2-nov: 66 rápidos y 23 profundos, mezclados con pruebas propias [M].
- Base de pedidos: 21, de los cuales 20 «creado» y 1 «pagado» (24-oct), todos internos o de prueba [M].
- 4-nov: Ramón compró su propio kit por $1.190 como ensayo [M]. **Ventas reales a clientes: 0.**

### 1.5 Lo que no se mide

Visitas al sitio, Search Console, alcance de Instagram, resultados de ManyChat y llamadas reales hechas. Todos los pulsos semanales dicen «sin dato». Sin esto, ninguna decisión de canal se puede tomar con evidencia.

---

## 2. Qué se construyó y cuánto esfuerzo costó

### 2.1 El inventario

| Bloque | Tamaño | Estado |
|---|---|---|
| Sitio vigente (`spindlelab-astro`) | 23 páginas, 7 artículos, 6 servicios, 2 casos, chequeo propio de 21 puntos | Vivo. Último cambio: 4-nov [V] |
| Verifica y Cumple | 12.402 líneas, 21 módulos, Cloudflare + D1 + pagos Flow/Mercado Pago + correo Resend, 40 scripts de prueba (≈ 3.600 aserciones) | Vivo; **fuera de `main`** (rama `laboratorio/ley-21719`, 83 commits) [M] |
| Motor de revisión previa | 1.176 archivos en `main`; 6.892 en su rama | Vivo en rama; envía los toques del kit [M] |
| Marketing | 2.242 archivos (redes 590, oficina 130, encargos entre sesiones 87, lanzamiento VyC 73, marca 69…) | Mezcla de vivo y obsoleto [M] |
| Ventas | 64 archivos, 20 listas de prospectos con solapamiento, ≈ 754 filas | Listas agotadas o sin uso [M] |
| Skills (roles de agentes) | 26 | Seis al día con la línea del 30-oct; al menos siete obsoletas o dudosas [M] |
| Sitios antiguos y laboratorio | `spindlelab-site`, `spindlelab-site-v2`, agente de WhatsApp (muerto el 10-sep) | Obsoletos [M] |

### 2.2 Dónde se fue el esfuerzo (commits en `main` desde julio)

| Área | % de los 765 commits | Qué dice |
|---|---|---|
| Archivos con que las sesiones se pasan trabajo (`encargos-otras-sesiones`) | 20 % | Una quinta parte de los commits tocó esa carpeta; no todo es coordinación, pero es el mayor bloque |
| Redes + lanzamiento de Verifica y Cumple | 16 % | Alcance resultante: 15 a 383 seguidores |
| Sitio (`spindlelab-astro`) | 13 % | Sin tráfico medido |
| Ventas (listas, pipeline, registro) | 11 % | La parte que más se parece a vender |
| Oficina y obras web | 11 % | Equipo de roles para construir el sitio |
| Laboratorio (ideas) | 10 % | 72 commits en septiembre, casi nada después |
| Skills | 8 % | |
| Producto Verifica y Cumple (en `main`) | 8 % | Más 75 archivos y 83 commits en su rama |

Por mes: julio 143, agosto 159, **septiembre 394**, octubre 158, noviembre 39 (al día 4). Septiembre fue el mes de mayor esfuerzo y el que dejó una sola venta nueva (María, por referido). Además hay **916 commits que solo existen en ramas**, así que el esfuerzo real es casi el doble.

**Lectura:** la proporción de esfuerzo puesto en tocar a un comprador (ventas, 11 %) es una fracción de la puesta en coordinar, construir y publicar. No es una crítica a las personas ni a las herramientas; es el patrón que explica por qué la máquina produce y el dinero no entra.

---

## 3. Qué está obsoleto

| Qué | Lo reemplazó | Evidencia |
|---|---|---|
| `spindlelab-site/` y `spindlelab-site-v2/` | Sitio Astro (2-ago) | commits 72808881 y 682655ab; aún contienen el Pixel equivocado |
| «Mostramos, no prometemos» (ago) | Línea del 30-oct | cabecera «Superado» en el plan de agosto |
| «Motor de adquisición» (sep) | Línea del 30-oct | cabecera en el brief de agosto y artículos del blog |
| «Sitio al centro, AEO como especificación» (28-sep) | «Hablemos de tu sitio» | ficha de la casa, nota del 2-nov |
| «Socio de marketing y crecimiento con IA» (23-oct) | Línea del 30-oct | publicada el 26-oct y cambiada el 30-oct |
| Frente EE.UU. | Cerrado el 19-oct | cabecera de la skill y del plan |
| Apollo | Google Maps + curl | cancelado el 26-ago; la skill `buscar-leads` aún lo nombra |
| Google Ads | Nada (detenida desde 24-ago) | encargo del 21-sep |
| Mini-diagnóstico en 48 h | Revisión gratis de una página, un día hábil | nota del 2-nov |
| ManyChat y Metricool | Sin uso comprobado | última mención 1-sep |
| Plan de 90 días | Sin sucesor | venció el 5-oct sin retrospectiva |
| Skills `persona-frente-eeuu`, `buscar-leads`, `agente-copywriter`, `agente-calendario-editorial`, `agente-inteligencia-mercado`, `agente-crm`, `agente-red-presencial` | Sin reemplazo | sin edición desde antes de la línea del 30-oct, o declaradas cerradas |
| Listas de prospectos | Pozo seco | 142 correos, 0 clientes; 105 filas en la lista de exclusión |

**Seis mensajes distintos en cuatro meses** (cinco cambios) es el dato central de esta sección: cada cambio obligó a reescribir el sitio, el blog, las skills y los correos. Los textos viejos que aún circulan en los documentos hacen que sesiones nuevas trabajen con información falsa (ver sección 10).

---

## 4. Qué vendió y qué no: el patrón

**Lo que se repite en las conversaciones que sí avanzaron** (Eduardo, Cortes Zamora, Legal Prisma, Bernardo, María) [E sobre M]:
1. Un **hecho concreto y comprobable en el propio sitio del prospecto** («vende cursos y no tiene política de privacidad», «su sitio está caído», «su robots.txt bloquea a la IA») más algo gratis y verificable.
2. **Los dos cierres y las dos propuestas de origen frío que más avanzaron fueron sitios web.** Nunca SEO/visibilidad en IA, Verifica y Cumple ni suscripción. La propuesta de redes para Bla! no cerró; el piloto de Meta de Carlos sí, a un precio bajo el catálogo y con el alcance cambiado dos veces.
3. La respuesta llegó **en el primer toque y dentro de un día**.
4. Las que murieron murieron **después** de la respuesta: «quedo atento», silencio tras la cotización, cancelación, presupuesto, o un pago que no llega.
5. **Cero conversaciones vienen de anuncios, de redes o del mensaje masivo de Verifica y Cumple.**

**Lo que nunca se ha vendido:** el acompañamiento mensual ($590.000), la auditoría SEO ($490.000), la visibilidad en IA ($400.000), las redes, el paid y el kit de Verifica y Cumple. De los seis servicios del sitio, cuatro tienen 0 ventas; el kit también. El quinto (redes con pauta) tiene solo el piloto de Carlos, a menos de la mitad del precio de lista.

**Una verdad incómoda sobre el producto estrella:** SpindleLab vende «visibilidad en IA» y el propio equipo midió **0 menciones en 45 pruebas** de respuestas de IA [M, informe del 27-sep]. Es una contradicción que un comprador puede comprobar en un minuto.

---

## 5. ¿Y los demás que ganan con IA? Qué dice la evidencia externa

**Lo que encontré** (fuente de EE.UU., casi todo precio chileno sale de blogs de proveedores, así que sesgado al alza):

- **Los servicios con IA que más se venden hoy son agentes de WhatsApp y automatizaciones**: en Chile, de USD 5.000 a 12.000 de implementación más USD 150 a 300 al mes para empresa mediana; en pyme chica de LatAm, USD 500 único más USD 200 al mes [W]. Eso es un ticket y un mercado distinto al de SpindleLab.
- **La demanda existe, pero el freno es la integración, no el acceso**: 87 % de líderes chilenos usa IA en atención al cliente y solo 2 de 10 la tiene integrada [W, Emol 26-may-2026]. La adopción real en empresas es menor y depende de la definición (13,5 % a 45 %).
- **El bot básico se está regalando**: Meta lanzó un agente propio para WhatsApp e Instagram, con respuestas, agenda y calificación de leads [W, TechCrunch, 3-jun-2026].
- **El extremo barato del sitio web está saturado**: Wix incluye IA en todos sus planes, incluso el gratis; TuPagina.cl cobra $45.000 al año [W, extracto]. Los packs desde $390.000 de SpindleLab caen donde GoDaddy pone «landing» ($150.000 a $500.000); el «institucional» va de $500.000 a $2 millones [W].
- **La pyme chilena tiene la caja apretada**: 67 % con caída de ventas mensual, 74 % financia con recursos personales [W, muestra autoseleccionada de 2.838 empresas]. Un ticket de $400.000 a $1,2 millones compite con eso. Encaja con el «yo te aviso» que se repite.
- **Nadie mostró cuánto gana un consultor unipersonal vendiendo servicios con IA.** No encontré ninguna fuente fiable. La mayor parte de lo visible son proveedores vendiendo, no clientes comprando.

**Lectura honesta de «los demás ganan y yo me quedo atrás»:** parte es cierta (hay demanda real de automatización y atención con IA) y parte es ruido (las cifras de ganancias vienen de quien las vende). Lo que sí muestran los datos es que **quien gana suele vender a empresas medianas, ya integradas con un cliente existente, o aprovecha un subsidio o una compra pública**. Ninguna de las tres cosas es lo que SpindleLab ha intentado todavía.

---

## 6. Por qué no se vende: las causas, en orden de peso

| # | Causa | Evidencia |
|---|---|---|
| 1 | **Se vende lo que el comprador no siente como problema.** «Visibilidad en IA» y «cumple la ley de datos» son problemas anticipados; «mi web está vieja o no me trae clientes» es un problema vivo | Seis servicios sin una venta; los cierres son sitios web [M] |
| 2 | **El tramo humano se cae después de la respuesta.** Seguimiento, llamada y cierre | Evaluaciones del 27-sep y del 19-oct; patrón «quedo atento» [M] |
| 3 | **Confianza insuficiente en la vitrina.** La portada muestra un solo cliente (fotógrafo) y una herramienta propia; no hay testimonios con nombre ni casos con cifras | Portada leída hoy [V]; regla de la casa: cero prueba social inventada |
| 4 | **Alcance casi nulo.** Sin audiencia propia ni anuncios que conviertan, depende del correo frío y de referidos | 383, 15 y 19 seguidores; 0 consultas en 90 días [V][M] |
| 5 | **Demasiados frentes sin completar ninguno.** Seis mensajes, siete servicios, un producto aparte, cuatro ramas | Secciones 2 y 3 |
| 6 | **Se pule el sitio antes de tener tráfico.** Entre el 3 y el 4-nov: 6 solicitudes de cambio visual (#58, #59, #64, #65, #67, #68), imágenes, videos con IA, ilustraciones animadas | git de `main` [V] |
| 7 | **Falta medición.** No se sabe quién visita, qué lee ni dónde se va | Todos los pulsos «sin dato» [M] |
| 8 | **Precio y caja.** Un ticket de $390.000 a $1,19 millones frente a pymes con caja apretada. Eduardo lo dijo expresamente | Correo del 3-nov [V] |

**Una advertencia contra la conclusión fácil.** Las evaluaciones anteriores y esta apuntan a lo mismo: seguimiento y foco. El 19-oct se escribió la receta («no abrir frentes nuevos mientras haya calientes sin trabajar») y el mismo mes se abrió el motor de revisión previa, el sitio nuevo con tres rondas de rediseño y la campaña de Verifica y Cumple. **El problema no es de diagnóstico, es de ejecución del corte que ya está escrito.**

---

## 7. Qué adquirir o cambiar para subir la intención de compra

Ordenado por cuánto respalda la evidencia y cuánto cuesta. «Adquirir» incluye activos, relaciones y hábitos, no solo herramientas.

### Prioridad 1: cuesta poco y ya tiene evidencia propia

| # | Qué | Por qué | Costo | Cómo se mide |
|---|---|---|---|---|
| 1 | **Dos casos reales con nombre y cifras**: el de Bernardo (permiso concedido) y el de María Loreto, pedido al entregar (el proceso ya lo contempla) | La única prueba que hoy se muestra es una; el estudio de Hinge dice que el 52 % descartó un referido antes de hablar, por sitio poco convincente, contenido pobre o no salir en búsqueda [W, 2015, viejo] | Horas de Ramón; $0 | Casos publicados con permiso por escrito |
| 2 | **Dos presentaciones por cada cliente al entregar** (Bernardo, María; más Eduardo y Carlos cuando retomen) | El único canal que cerró, y cuesta casi nada | $0 | Presentaciones pedidas y obtenidas por semana |
| 3 | **Hacerle al prospecto una muestra concreta antes de cotizar** (su portada rehecha, un informe de su sitio) | Los tres inicios fríos que avanzaron partieron de un hecho verificable en su sitio. La IA abarata justo esto | Horas de producción | Conversaciones por muestra enviada |
| 4 | **Un bloque diario e inamovible de seguimiento y llamadas, antes de tocar cualquier otra cosa** | El tramo que se cae es humano y ya está nombrado tres veces en los documentos | 1 hora al día | Calientes con más de 48 h sin toque (la meta es 0) |
| 5 | **Mantención pequeña como segundo ingreso** (el precedente propio es $50.000/mes) en vez del acompañamiento de $590.000 que nunca se vendió | Es lo único recurrente que algún cliente aceptó | $0 | Mantenciones vendidas al entregar cada sitio |

### Prioridad 2: dinero o canal externo, con verificación previa

| # | Qué | Por qué | Costo | Qué falta confirmar |
|---|---|---|---|---|
| 6 | **Posicionar el Sitio Completo como compra financiable con el Kit Digital de Sercotec** | La página oficial dice $1,2 millones, de los cuales $600.000 a $1,2 millones van a activos intangibles como sitio web y marketing [V]. El Sitio Completo cuesta $1.190.000 + IVA | Horas de Ramón | Fecha de la próxima convocatoria (la última fue en junio de 2026 [W]); cómo entra un proveedor; el cliente debe haber aprobado 9 cursos de Ruta Digital [V] |
| 7 | **Preguntarle a Eduardo si su presupuesto espera un subsidio** | Su «mayo-junio de 2027» puede coincidir con una convocatoria. Es una hipótesis mía | Una pregunta | Su respuesta |
| 8 | **Inscribirse en el Registro de Proveedores de ChileCompra y mirar la Compra Ágil durante dos semanas** | Hasta 100 UTM (≈ $6,7 millones); el 82,9 % se adjudica a empresas pequeñas [W, ChileCompra, 2025] | Trámite + horas | Cuántas solicitudes de sitio web o marketing aparecen. **Nadie publica ese dato** |
| 9 | **Tres alianzas con quienes ven los sitios de las pymes**: contadores (Eduardo lo es), abogados (Legal Prisma), fotógrafos (Bernardo) | Hipótesis sin estudio que la respalde, pero apoyada en que el único canal que funcionó es la recomendación | $0 | Presentaciones obtenidas |

### Prioridad 3: probar solo si las anteriores ya corren

| # | Qué | Por qué esperar |
|---|---|---|
| 10 | **Sitio + captura de consultas a WhatsApp o a una planilla** como complemento del sitio, no como producto aparte | El agente de WhatsApp propio se declaró muerto el 10-sep; el mercado básico lo cubre Meta. La brecha es la integración, y eso se vende encima de un sitio ya vendido |
| 11 | **Oferta de entrada más pequeña con plazo y precio cerrados** | Evidencia solo de vendedores; probar con 5 prospectos antes de cambiar la portada |
| 12 | **Claude Partner Network** (gratis, abierta a organizaciones que llevan Claude al mercado) | Señal de marca barata, pero no confirmé si acepta unipersonales [W] |

### Lo que **no** hay que comprar ni hacer

- Más listas de prospectos (Apollo, Vibe Prospecting): la entrada no es el problema.
- Certificaciones que exigen gasto publicitario ajeno: Google Partner pide USD 10.000 de gasto a 90 días; el programa de HubSpot, USD 400 al mes [W]. No son viables.
- Más herramientas de redes (Metricool, ManyChat) hasta tener algo que publicar para quien ya compró.
- Más rondas de diseño del sitio antes de medir cuánta gente lo visita.

---

## 8. Qué dejar de hacer (propuesta, decide Ramón)

1. **No abrir frentes nuevos** hasta el 3-dic, tal como ya está escrito. Incluye: nuevos productos, nuevos mensajes, nuevos verticales.
2. **Congelar el sitio** tal como está (cambios solo de texto o de cifras reales) hasta tener medición de visitas.
3. **Verifica y Cumple: no sumar funciones.** Cortar la decisión de la campaña el 7-nov con los datos que haya. Si la Cámara confirma la postergación, la urgencia comercial desaparece y el kit pasa a ser un producto de otra época.
4. **Una sola oferta en el mensaje: sitio a medida.** Los otros servicios quedan en la página como «lo que se conecta», no en el gancho del correo.
5. **Dejar de coordinar a cuatro sesiones a la vez** por archivos. Una quinta parte de los commits toca esa carpeta de traspasos.

---

## 9. Plan de 30 días con cortes (propuesta)

**Meta del corte ya escrito:** ≥ 3 llamadas de venta sostenidas al **19-nov**; ≥ 1 cliente nuevo al **3-dic**.

| Semana | Foco | Entregable verificable |
|---|---|---|
| 4 al 10-nov | Responder a Eduardo (hecho el borrador); pedir a María y a Bernardo dos presentaciones cada uno; cerrar la decisión de la campaña de Meta el 7-nov; abrir el registro de seguimiento diario | Lista de calientes con próximo paso fechado y 0 sin toque en 48 h |
| 11 al 17-nov | 15 muestras concretas (portada rehecha o informe) a negocios con un sitio claramente viejo o roto; llamadas de seguimiento; consultar al Sercotec por la convocatoria | Número de conversaciones nuevas y de llamadas realizadas |
| 18 al 24-nov | **Corte del 19-nov.** Si hay 0 llamadas habiendo corrido el ritual todos los días, el problema es falta de calientes y se reabre la parte alta del embudo | Llamadas sostenidas |
| 25-nov al 3-dic | Propuestas con precio; mantención ofrecida al entregar; revisar Compra Ágil | **Corte del 3-dic:** ≥ 1 cliente nuevo |

**Qué se mide cada viernes (cuatro números):** conversaciones nuevas, llamadas hechas, propuestas enviadas, pasos siguientes con fecha. Si no están escritos, no existen.

---

## 10. Contradicciones entre documentos que hoy confunden

El análisis encontró trece. Las que más daño hacen:

1. `CLAUDE.md` todavía llama sitio público a `spindlelab-site/` y dice que no hay `package.json`; el sitio real es `spindlelab-astro/`.
2. La ficha dice que `git push` no funciona desde Bash; `CLAUDE.md` y la práctica de las sesiones dicen que sí.
3. La ficha dice que Google Ads está activa; está detenida desde el 24-ago.
4. La ficha da el Pixel de Meta `2885353628478565`; el commit del 2-nov dice que ese ID era ajeno y que el correcto es `1027024050073502`.
5. Cadencia de redes: «mar y jue» y «mié y jue» en la misma ficha.
6. Verifica y Cumple: `laboratorio/README.md` y una skill de `main` dicen que el kit no está construido y apuntan a `verificaycumple.pages.dev`; el producto vive en otra rama y en `verifica.spindlelab.cl`.
7. Aserciones de pruebas: 2.354, 3.752 y 1.206, sin reconciliar.
8. Focus Contable: `pipeline.md` de `main` dice «llamar el jueves 5-nov»; Ramón ya aceptó el plazo (esta corrección está en la rama del tablero, sin mergear).
9. Cifras de respuesta por nicho y de diagnósticos entregados distintas entre registros.
10. Fecha de cierre del frente EE.UU.: «septiembre» y «19-oct».

**Recomendación:** una sola hoja de cifras (`marketing/cifras-de-la-agencia.md`) que se actualice los viernes, y que las demás referencias la citen.

---

## 11. Lo que no pude verificar

- Cuánto ganan los consultores unipersonales que venden servicios con IA: no hay fuente fiable.
- Visitas al sitio, Search Console, alcance de Instagram, resultados de ManyChat y llamadas reales: no constan.
- Cómo entra un proveedor al Kit Digital o a otros subsidios, y si habrá convocatoria en 2027.
- Cuánto de la Compra Ágil corresponde a sitio web, marketing o IA.
- Si el pago de $300.000 de Carlos Soya llegó; los $937.000 cobrados dependen de lo que dice Ramón.
- Presupuesto de marketing, plazos de decisión y objeciones de pymes chilenas: no hay estudio.
- Disponibilidad y precio en Chile del agente de Meta para WhatsApp.
- Si el Claude Partner Network acepta unipersonales.
- Estado final de la franquicia Sence y del proyecto de ley que la elimina.
- Las cifras de seguidores de la página de LinkedIn tienen dos valores (15 y 4) en el mismo archivo.
- Los porcentajes de esfuerzo cuentan un commit en cada área que toca, así que no suman 100 %.
