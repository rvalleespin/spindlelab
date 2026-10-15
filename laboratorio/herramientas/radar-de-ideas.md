# El radar — herramienta de detección de ideas

**v2, estrenado una vez** · v1 escrita el 10-sep-2026 · Corregido el 10-sep-2026 contra su
primer uso real · Origen: método del video *"Cómo crear un Negocio de UNA Persona con Claude"*
(Agustín Medina), **corregido y ampliado** — ver §7 y §9.

> ✅ **Estrenado el 10-sep-2026** en el proyecto 02 (agente de agendamiento por WhatsApp). El
> radar mató la idea en una tarde, que es lo que tenía que hacer. **Tres de las nueve fuentes se
> probaron; seis siguen sin probar.** Lo que rindió y lo que no está en el §9 — leerlo antes de
> confiar en el orden del §2.

---

## 1. El principio

**No buscas temas, buscas quejas con dinero detrás.** Una tendencia ("la IA está creciendo")
no sirve para nada. Una queja sirve cuando cumple al menos **dos de estas tres**:

1. **Se repite** en fuentes independientes.
2. **Ya hay alguien pagando** por resolverla, aunque sea mal.
3. **Tiene fecha** — una ley, un plazo, un cambio de plataforma que la hace doler *ahora*.

La tercera es la más escasa y la más valiosa. Es la diferencia entre un dolor permanente,
que se tolera para siempre, y una urgencia que se compra este trimestre.

## 2. Las nueve fuentes, por fuerza de señal

**1. Reseñas de software que ya se vende.** *(Ascendida al primer lugar el 10-sep-2026: es la
única fuente que rindió de verdad en el primer uso.)* Gente que **ya paga** y está descontenta,
diciendo qué le falta, con nombre, fecha y cita textual que se puede abrir meses después. Es el
hueco de la competencia, con evidencia y con fecha. *Capterra, G2, Trustpilot, reseñas dentro de
las tiendas de apps y plugins.*

No leer solo las de 1 a 3 estrellas. En el proyecto 02 el producto tenía **4,8 de 5** y las cinco
quejas que importaban estaban en el campo "Contras" de reseñas de 5 estrellas: gente que ama el
producto y aun así reclama por lo mismo. **Filtrar por estrellas bajas habría escondido el
hallazgo.** Se leen los "Contras" de todas.

**2. Avisos de empleo.** Si muchas empresas publican el mismo cargo repetitivo, ese dolor está
**presupuestado**. El sueldo publicado te da el techo de precio, y ese es su mejor uso.
*Chiletrabajos, Laborum, Computrabajo, LinkedIn Jobs.*

> ⚠️ **Degradada del primer lugar el 10-sep-2026, por dos fallas medidas.** (1) **El volumen no
> existe en Chile.** El radar imaginaba "cuarenta empresas publicando el mismo cargo";
> Computrabajo mostró **2 avisos en todo el país** para "recepcionista clínica dental", y uno ni
> siquiera era de una clínica. La heurística está calibrada para un mercado del tamaño de EE.UU.
> (2) **La evidencia se vence.** Dos de los avisos que intenté abrir devolvieron *HTTP 410 Gone*
> dentro de la misma sesión. Un aviso de empleo **no es citable a tres meses**, o sea que choca
> con la regla del §4 por construcción. Si se usa: sirve para el **techo de sueldo**, no para
> medir volumen, y hay que guardar captura y texto en el momento.

**3. Muerte o encarecimiento de un producto.** Cuando un SaaS sube precios, cierra o deprecia
una API, sus usuarios buscan alternativa con urgencia real. Es una ventana con fecha, igual
que una ley. *Foros de soporte de esa plataforma, hilos de "alternativas a X".*

**4. Marketplaces de freelance.** Lo que ya se paga por que un humano haga a mano, repetitivo
y con precio publicado. Cien encargos iguales son un producto. *Workana, Fiverr, Upwork.*

**5. Reseñas de Google Maps de negocios locales.** Las quejas de los clientes **hacia** el
negocio dicen dónde ese negocio pierde plata ("nunca contestan", "me confirmaron y no había
hora"). Ese dolor se le vende al dueño con la evidencia de sus propios clientes.

**6. Grupos cerrados por rubro.** Facebook y WhatsApp de gremios y oficios. En Chile pesan
más que Reddit: es donde los pares se quejan sin filtro.

**7. Foros de soporte y comunidades de plataformas.** Cuando una plataforma cambia algo, se
llenan de gente diciendo qué se le rompió.

**8. Cambios normativos.** Diario Oficial, boletines de gremios, circulares del SII. Es la
fuente que produce **fechas límite**, la señal más fuerte del §1.

**9. Lo que la gente le pregunta a buscadores y a la IA.** Autocompletado, "otras preguntas de
los usuarios", y los hilos donde alguien pega la respuesta que le dio un modelo y pregunta si
está bien — eso muestra lo que no logran resolver solos.

**Reddit y LinkedIn van al final a propósito.** Reddit en español chileno es flaco, y LinkedIn
está lleno de gente construyendo marca personal, no quejándose de verdad. Sirven, pero no son
por donde se empieza.

## 3. Qué preguntarle a cada fuente

- **Avisos de empleo:** *¿qué tareas se repiten en las descripciones de este cargo en los
  últimos 3 meses, en cuántas empresas distintas, y con qué rango de sueldo?*
- **Reseñas de competidores:** *dame las quejas que aparecen en 3 o más reseñas distintas, con
  la cita textual y el link de cada una.*
- **Grupos y foros:** *los hilos con más comentarios sobre este problema, y las palabras
  literales con que lo describen.*
- **Cambios normativos:** *qué obligación nueva hay, desde qué fecha, a quién aplica, y qué
  pasa si no se cumple.*

## 4. La regla que sostiene todo: cita con fuente o no existe

Un modelo puede devolver una queja perfectamente plausible que **nadie escribió nunca**. Si esa
frase inventada termina en una propuesta o en una landing, estás construyendo sobre nada.

**Regla dura: sin link que puedas abrir, la cita no entra a ningún documento.** Se exige URL y
cita textual de cada hallazgo, y se abren. Es la misma regla que ya rige el outbound de Emilia
y el contenido de Cata: el hallazgo es real o no se usa.

> ✅ **Esta regla se ganó el sueldo en el primer uso (10-sep-2026), dos veces:**
> - Un resumen de búsqueda afirmó que los avisos de recepcionista incluían "gestión de mensajes
>   de WhatsApp" entre sus funciones. **Al abrir el aviso, WhatsApp no aparecía.** Era una
>   síntesis plausible que la fuente no sostenía — exactamente el fallo que este §4 describe.
> - Varios blogs daban la tarifa de WhatsApp en Chile como "utility $18,94 / marketing $84,17",
>   y uno afirmaba que desde el 1-oct-2026 se cobrarían los mensajes de servicio. **El tarifario
>   oficial de Meta dice $17,6584 y $78,4917, y Chile no está en la lista de cambios de octubre.**
>   Los dos datos habrían entrado a un modelo de precios.
>
> **Corolario operativo:** el resumen de un buscador **no es la fuente**. Es un puntero. La cita
> sale del documento abierto, y si el documento no la tiene, el hallazgo no existe. Cuando la
> fuente publica un archivo oficial (un tarifario, un PDF de ley), **se descarga el archivo** en
> vez de citar la página que lo comenta.

## 5. Los descartes

**Descarte 0 — ¿el dueño del software que ya usa el cliente lanzó esto?** *(agregado el
10-sep-2026, y va primero porque es el que decide más rápido)*

Antes de mirar quejas y precios: ir a la web del software incumbente de esa vertical y buscar su
página de funcionalidades y de IA. Si el producto que ibas a construir ya es un módulo del sistema
que el cliente **ya tiene instalado, ya paga y donde ya viven su agenda y su ficha**, la idea está
muerta y no hace falta nada más. No compites contra un producto: compites contra una casilla de
verificación en una pantalla que el cliente ya abre todos los días.

Esto no estaba en el radar y **decidió el proyecto 02 entero**. Toda la evaluación de quejas,
precios y márgenes fue posterior y, en rigor, sobraba: la respuesta ya estaba en la página de
producto del incumbente. Cuesta diez minutos y va antes que todo lo demás.

Después, sobre el listado en bruto, en este orden:

1. **¿Se repite?** Menos de tres fuentes independientes: es anécdota.
2. **¿Alguien ya paga?** Si nadie cobra, puede ser hueco o puede ser que no haya mercado.
   Averígualo antes de construir, no después.
3. **¿Duele ahora?** Si duele igual hoy que en marzo, la venta va a ser lenta.
4. **¿Cuánto cuesta sostenerlo por semana?** Montar es barato; mantener es lo que compite con
   todo lo demás. Sin estimación, no pasa.

Lo que sobrevive a los cuatro es una idea. **Lo que no, se anota con la fecha en que murió**,
para no volver a evaluarlo en tres meses.

## 6. La rutina

Una hora, un día fijo, **una sola fuente por vez**. Se rota: esta semana avisos de empleo de un
rubro, la siguiente reseñas de un software, la siguiente un cambio normativo. Al mes son cuatro
sondeos y un registro de qué murió y por qué.

Es más barato y produce más que un maratón de investigación cada seis meses.

## 7. Qué se tomó del video y qué se corrigió

**Se tomó:** la idea de ir a buscar el **lenguaje literal** de la gente donde se queja, y sobre
todo el paso de mirar **las quejas contra los competidores que ya cobran** — que es la mejor
señal de demanda validada que existe.

**Se corrigió, y son tres cosas:**
- **El video no verifica.** Afirma que el modelo "navega, lee y sintetiza" y no se inventa la
  respuesta. Eso es optimista. De ahí sale el §4.
- **El video asume foros anglosajones.** Reddit no rinde para B2B chileno; de ahí el orden de
  fuentes del §2 y la incorporación de Google Maps, gremios y avisos de empleo.
- **El video encuentra dolores, no ventanas.** Todo lo que detecta duele igual siempre. De ahí
  el criterio de fecha del §1 y el descarte 3 del §5.

## 8. Qué rindió y qué no, en el primer uso real (10-sep-2026)

Proyecto 02, agente de agendamiento por WhatsApp. Resultado: idea descartada en una tarde, con
fuentes. El método funcionó; el orden de las fuentes estaba mal.

**Rindió:**
- **Reseñas de competidores (era la #2, ahora es la #1).** La única fuente que entregó lo que
  prometía: cinco reseñistas independientes, con nombre, fecha y cita textual, quejándose de lo
  mismo. De ahí salió el único hallazgo comercial nítido de todo el sondeo.
- **La regla del §4.** Dos datos falsos interceptados. Ver el recuadro del §4.
- **Los tarifarios y textos oficiales descargados.** El tarifario de Meta en CLP y el texto de la
  ley en la BCN se bajaron como archivo y se leyeron enteros. Ahí están las cifras exactas que
  ninguna fuente secundaria tenía bien.

**No rindió:**
- **Avisos de empleo (era la #1).** Sin volumen en Chile y con la evidencia venciéndose. Ver el
  recuadro del §2.
- **Los espejos regionales de sitios de reseñas.** `capterra.cl` devolvió *410 Gone* y otro
  agregador chileno devolvió *403*. Usar siempre `capterra.com`.
- **La web de la BCN no se puede leer directo**: es una aplicación con JavaScript y devuelve una
  página vacía. El texto de una ley se saca por su API en XML
  (`leychile.cl/Consulta/obtxml?opt=7&idNorma=<id>`), no del navegador. **Ojo:** ese extracto no
  trae el título sancionatorio, así que las multas hay que buscarlas aparte.

**Sin probar todavía** (seis de nueve): muerte o encarecimiento de un producto, marketplaces de
freelance, reseñas de Google Maps de negocios locales, grupos cerrados por rubro, foros de
soporte, y lo que la gente le pregunta a buscadores y a la IA. **No se debe afirmar que el radar
está validado.** Se probó un tercio.

**Lo que le faltaba al método:** no tenía ningún paso para preguntar si el incumbente ya lanzó la
funcionalidad. Es lo que decidió el proyecto entero. Quedó como **descarte 0** en el §5.

## 9. Registro de la herramienta

| Fecha | Qué pasó |
|---|---|
| 2026-09-10 | v1 escrita, **sin probar**. Pendiente: someterla a prueba y corregirla. |
| 2026-09-10 | **v2 tras el primer uso real** (proyecto 02). Reseñas de competidores ascendida a fuente #1 y se corrige el filtro (leer los "Contras" de todas las reseñas, no solo las de 1-3 estrellas). Avisos de empleo degradada a #2 con dos fallas medidas: sin volumen en Chile (2 avisos en todo el país) y evidencia que se vence (*410 Gone* en la misma sesión). Agregado el **descarte 0** (¿el incumbente ya lo lanzó?), que es lo que decidió el proyecto. Agregado al §4 el corolario de que el resumen del buscador no es la fuente, con los dos datos falsos que interceptó. Nuevo §9 con lo que rindió y lo que no. **Siguen sin probar 6 de las 9 fuentes.** |
