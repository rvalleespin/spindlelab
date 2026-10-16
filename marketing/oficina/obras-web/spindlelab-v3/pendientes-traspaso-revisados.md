# Pendientes del traspaso viejo, revisados contra la rama vigente

**Fecha:** 10 y 11-oct-2026 · **Rama revisada:** `claude/magical-franklin-ckfki2` (70f1343)
**Pedido de Ramón:** *«queda el actual, trae los documentos y revisa los pendientes»*, y después
*«te paso lo de la sesión antigua por si hay algo del trabajo que se pueda rescatar»*.
**Detalle ítem por ítem, con evidencia:** `pendientes-traspaso-detalle.md` (misma carpeta).

## Qué se revisó y cómo

La sesión antigua dejó `marketing/encargos-otras-sesiones/traspaso-rediseno-v3-10oct.md` con
44 pendientes comprobados (§6) y 50 pistas sin comprobar (§7). Los escribió sobre su rama,
que quedó en el estado del 30-sep, así que sus rutas y cifras describen un sitio anterior a la
reconstrucción. Se sumó un ítem, X01: la URL de Verifica y Cumple, porque el traspaso y esta
rama decían cosas distintas.

- **Cada uno de los 95** pasó por un verificador que lo comprobó en la rama vigente (código, el
  sitio compilado servido en local, mediciones con Chromium) y después por un escéptico que
  intentó tumbar el veredicto con su propia evidencia. El escéptico corrigió 11 de 95.
- **Rescate:** el v3 de la sesión antigua se compiló y se comparó con el vigente en las 21 rutas
  y en las fuentes y los documentos. Salieron 85 diferencias. Un escéptico filtró las que se
  quitaron a propósito.
- **Cobertura:** un crítico final revisó el conjunto. Encontró 9 huecos y 14 contradicciones
  entre ítems, y volvió a medir por su cuenta los «resueltos» de peso alto. Tumbó uno (P92) y
  agregó dos pendientes nuevos.

## El resultado en una tabla

| Estado | Cuántos | Qué significa |
|---|---|---|
| Resuelto | 28 | Ya está arreglado en esta rama, comprobado en el sitio servido |
| Obsoleto | 19 | Se lo llevó la reconstrucción o una decisión posterior de Ramón (sobre todo el hero del 10-oct y las mayúsculas del 5-oct) |
| Sigue vivo | 44 | 11 tal como estaban escritos y 33 con otra descripción (otras rutas, cifras o alcance) |
| Solo en producción | 2 | El defecto ya no está en el v3, pero sigue en spindlelab.cl |
| De otro repo | 2 | Los h1 del sitio de Bernardo (el encargo ya existe) |
| Falso | 0 | |

De los 44 vivos, **12 son decisiones de Ramón, 29 son trabajo del estudio web y 3 son de la
troncal**. Muchos son el mismo asunto visto desde dos lados. Agrupados, quedan **9 decisiones
para Ramón** y **8 frentes de trabajo**.

Lo que más cambió respecto del traspaso: casi todo lo de peso alto ya estaba resuelto (el
resultado del chequeo, noindex en Trabajo, el rótulo de concepto de Raigal, un solo oro por
vista) o se volvió obsoleto con la decisión del hero. De peso alto siguen vivos solo tres: la ruta
de publicación, la lista para ejecutarla y la promesa de monitoreo de menciones.

---

## 1 · Decisiones para Ramón

Ordenadas por lo que destraban. Ninguna se ejecuta sin su respuesta.

### R1 · La ruta de publicación · alto · B19, P70

El v3 está terminado y no tiene ruta de salida. Decide: **¿va a la raíz o se queda con prefijo?**,
**¿qué pasa con las rutas v2** (redirecciones, y `/privacidad/`, que no tiene versión v3)? y
**cuándo**. El costo real es menor que lo que decía el traspaso: canonical y og:url salen de la
ruta y se corrigen solos, y el JSON-LD ya trae URLs de producción. Lo que sí hay que mover es el
prefijo `/v3/` en 14 archivos y 767 enlaces, retirar los 20 HTML estáticos y las 2 páginas Astro
v2 que ocupan las mismas rutas, sacar las cuatro maquetas internas del build (P76) y reescribir
`llms.txt`. La lista completa la escribe el estudio web en el frente E7, sin esperar la decisión.

### R2 · El monitoreo de menciones en IA, y su cadencia · alto · A01, más dos huecos del crítico

El v3 promete medir menciones en IA dentro del Acompañamiento, en texto visible y en el JSON-LD.
`capacidad-servicios.md:55` lo marca ❌ y choca con la regla del 27-sep de no prometer monitoreo
continuo, que siguió en pie después del giro. La cadencia además se contradice: Método y
Acompañamiento dicen «quincenal», el plan Esencial y Visibilidad en IA dicen «mensual», y
Diagnóstico dice «cada mes». Son dos preguntas:

1. ¿La regla del 27-sep cubre también el monitoreo acotado de un plan pagado?
2. ¿Mensual o quincenal? Ya estaba reservada en la spec.

La respuesta toca `servicios-v3.json` (Acompañamiento y **Visibilidad en IA**), `paginas-v3.json`,
`oferta-v3.json`, cuatro líneas escritas directo en las páginas (una de ellas dentro del JSON-LD de
Método) y `public/llms.txt:13` y `:18`. Producción promete lo mismo.

### R3 · El Acompañamiento y la mantención de $50.000 · medio · A02

**El precio no está en duda**: Ramón ratificó la lista el 27-sep. Lo que sigue abierto es de
producto: ¿el Acompañamiento (desde $590.000/mes) y la mantención web de $50.000/mes que
registra ventas son dos productos distintos? El sitio los roza en una línea: el plan «A medida»
del Acompañamiento dice «Integra desarrollo web y mantención». Si son distintos, el sitio o la
cotización lo dicen.

### R4 · El paquete de la bio de Nosotros · medio · P46, P52, P87, A04

Todo en una conversación, porque la bio va tal cual y es de Ramón:

- La bio usa «eje» dos veces en el mismo párrafo, con dos referentes, y **«con el orgánico como
  eje» contradice su giro del 29-sep** (el sitio al centro).
- «Orquestando el motor» y «poner el motor a funcionar entero» son la jerga interna que ya se
  sacó de los servicios.
- La frase reservada desde el 6-oct («El objetivo no es solo…»).
- **«Te lo muestro antes de que pagues nada.»** Una nota de código equivocada pasó al singular
  lo que producción dice en plural («Te lo mostramos»). Mostrar el diagnóstico antes de cobrar
  es algo que entrega la empresa, y el manual §08 lo pone en plural. Él elige.
- Si la bio cambia de «eje», la frase de Paid Media «El sitio es el eje; la pauta lo acelera.»
  se revisa con ella. La regla del 10-oct no la alcanza: habla solo del titular del hero.

Si cambia la bio, cambia también en producción y en su LinkedIn.

### R5 · El paquete de Layout · bajo · P79, P89, P90

Tocan `Layout.astro`, que solo se toca con su permiso:

- **Su cargo.** El jobTitle dice «Consultor de SEO técnico y visibilidad en IA (AEO/GEO)» y no
  nombra el desarrollo web, que hoy es la línea que abre la oferta. Si cambia, cambia también en
  la home, en Nosotros y en la línea de autor de los 7 artículos.
- **El orden de los servicios en el grafo.** Pone Desarrollo web sexto mientras la home lo
  pone primero. Si se reordena, va junto con la publicación.
- **La precarga de Inter.** Cada página v3 descarga 48 KB de Inter. Inter no pinta nada al
  cargar, pero sí el aviso que aparece después de aceptar o rechazar las cookies (el crítico
  midió 81 caracteres). Si el estudio web repinta ese aviso en Manrope (frente E1), Inter
  deja de usarse del todo y la decisión queda limpia.
- Y lo que ya estaba reservado: el tercer `sameAs`.

### R6 · El paquete del hero · bajo · P85 y dos rescates

El 10-oct dejó el hero «como está». Hay tres mejoras que caen dentro de esa sección y que, por
eso, no se hacen sin él:

- **Que las cuatro piezas de la fila lleven a su ficha en Trabajo** (`/v3/trabajo/#o-raigal`,
  etc.). La home vieja las enlazaba, y hoy la home no tiene ningún enlace a Trabajo en el cuerpo.
- **Que «la metodología publicada» enlace a `/v3/diagnostico/`**, sin cambiar una palabra.
- Que la nota del chequeo anuncie las tres preguntas del resultado (leer, entender, citar).
  Es la menor de las tres, porque cada pregunta del resultado ya trae su explicación.

### R7 · Lo que se puede rescatar que es copy o dato suyo · bajo

- **El dato «67 de 69».** Era el único dato propio de la home y salió con el tablero del 5-oct
  sin que nadie lo decidiera. Tiene fuente (`marketing/metricas/corridas-chequeo-2026-08-31.md`),
  pero el texto viejo decía más de lo que se midió. Lo medido es: **67 de 69 sitios sin preguntas
  frecuentes marcadas (FAQPage)**, en corredoras y oficinas contables de Santiago, agosto de 2026.
  El mejor lugar es Diagnóstico, junto a «¿Te pueden citar?». Redacta Clara.
- **Verifica y Cumple en la home.** Hoy solo aparece como pieza de obra. La Ley 21.719 entra en
  plena vigencia el 1-dic, en 51 días. ¿Lo nombra la home? Si se aprueba R6, la pieza ya lleva a su
  ficha y desde ahí al producto.
- **La FAQ de Diagnóstico.** La QA cambió «qué mueve la aguja» por «qué arreglar primero», y la
  spec dice que esa FAQ había quedado fuera. Él elige una de las dos.
- **Método dice «cada proyecto sigue… nuestro proceso de auditoría»**, y Desarrollo web tiene sus
  propias cinco fases. ¿Se acota Método a los proyectos de SEO y visibilidad (una palabra) o suma
  la construcción?
- **La FAQ de la home**, que ya estaba reservada: el crítico confirmó la cuenta. El chequeo propio
  da 83 sin ella y ~94 con preguntas visibles y su FAQPage.

### R8 · Producción, mientras el v3 no sale · medio · C36, P71, P45, P53, nuevo del crítico

Defectos que el v3 ya no tiene pero que siguen vivos en spindlelab.cl:

- `/privacidad/` tiene dos h1 y dos textos bajo contraste AA. Esta no se va sola al publicar: el
  v3 la enlaza 43 veces y no tiene versión propia. Es un arreglo de marcado (el segundo h1 pasa a
  h2 y el gris sube), sin tocar el texto legal.
- Frases que no se sostienen: «Equipo dedicado» en el Acompañamiento (también en su JSON-LD),
  «acostumbrados a trabajar bajo NDA» en contacto, «Ninguna herramienta del rubro publica su
  metodología» en diagnóstico (Nitten la publica), «cinco preguntas fijas por tres motores», el
  «Sí.» bajo «¿Cuánto cuesta?» en Desarrollo web y los «eje» del v2 en `/servicios/`.

Decide si se arreglan ya en producción o se dejan morir con la publicación (R1). Si la fecha
de publicación está cerca, lo segundo. `/privacidad/` hay que arreglarla igual.

### R9 · Raigal antes de mostrarlo · medio · A09, P64

Raigal aparece en tres páginas con su rótulo de concepto y nadie ha marcado su revisión fina.
**Antes de mandarle la vista previa a un prospecto, Ramón la revisa.** Aparte, ¿se completa el
portafolio de concepto (páginas internas, fotos) o se cierra por decisión? La generación pagada
quedó fuera el 5-oct.

---

## 2 · Trabajo del estudio web

> **Estado al 13-oct:** E1 a E6 hechos, con QA de Javiera en contexto limpio (Aprobado en la
> ronda completa y en la exprés de cierre) y los desvíos decididos por Lucía. Commits de
> 511bb86 a 7b60c6c; el registro está en el §7 de `spec-visual.md` (filas del 13-oct). Quedan
> E7 (la lista de publicación) y E8 (el pase de voz de Clara).
>
> **Estado al 14-oct:** E7 hecho el 13-oct (`lista-publicacion.md`, ensayada; `63f1e55`) y E8
> hecho el 14-oct, aprobado por Javiera en la ronda 2 (detalle abajo, en E8). Los ocho frentes
> del estudio están cerrados. Lo que sigue espera respuestas de Ramón, salvo una propuesta de
> Clara (la frase de la prueba de Trabajo) antes de su lectura de aprobación.
>
> **Estado al 15-oct:** E9 (interiores, imágenes y prueba visible) llegó a su tablero, y Ramón no
> eligió ninguna dirección: quiere cambiar la referencia del sitio (fila del 15-oct en el §7 de
> `spec-visual.md`). E9 queda descartado y su Tanda B no se construye; sus piezas reales se conservan.
> Empezó **E10, referencia nueva**: 12 referentes en `e10/referentes/` para que Ramón marque. Las
> decisiones R1 a R9 y las confirmaciones de E8 siguen abiertas y no dependen del aspecto.
>
> **Estado al 16-oct:** Ramón eligió The Ready como referencia principal y Gehl como segunda (15-oct),
> y E10 paso 2 quedó hecho y aprobado por Javiera en la ronda 3 (`990b91d`, `e10/acta-paso-2.md`): el
> lock de The Ready, dos direcciones (Taller y Pizarra limpia) en `tableros/e10-direcciones/` y la pauta
> de 9 fotos con IA. Ramón dejó abiertos el logo y la regla del oro: el logo se rediseña después de
> elegir dirección. Siguen las fotos, en una sesión nueva con su clave
> (`marketing/encargos-otras-sesiones/encargo-e10-fotos-ia.md`), y después la compuerta 2, donde Ramón
> elige dirección. R1 a R9 y las confirmaciones de E8 siguen abiertas. Registro: filas del 15 y 16-oct
> en el §7 de `spec-visual.md`.
>
> **Estado al 16-oct, 14:05 (E12):** Ramón cambió de dirección: SpindleLab pasa a presentarse como estudio de
> diseño y tecnología («laboratorio digital») que también hace SEO técnico y visibilidad en IA, con Koto como
> referente y Accept & Proceed como segundo; stack Astro + Tailwind + Motion; casos solo con lo medido; precios y
> oferta iguales (`e12/insumos-ramon-16oct.md`). **E10 queda en pausa como historia**, sin compuerta 2 (el
> encargo de fotos con IA, también en pausa), y **E11 en pausa** antes de escribir direcciones. Accept & Proceed
> está medido (`e12/medicion/accept-and-proceed/`); Koto, en medición. El brief de E12 espera la compuerta 1
> (`e12/brief-de-obra.md`, cinco preguntas con su opción recomendada). La medición de los referentes sigue; las
> dos direcciones se dibujan sobre las respuestas, o sobre la opción recomendada de cada pregunta, dicho en el
> tablero, si Ramón no alcanza a responder antes. El giro toca documentos compartidos
> (estrategia, manual, fichas, bios, outbound): va a la troncal en
> `marketing/encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md`, y desde esta rama no se edita
> ninguno. **Lo que el giro le cambia a lo abierto:** R5 (el cargo de Ramón en el JSON-LD dice «Consultor de SEO
> técnico y visibilidad en IA») queda desalineado con la identidad nueva y entra a la construcción de E12; R9
> (Raigal) sigue antes de mostrar el índice; R1 a R4 y R6 a R8 siguen como estaban, y ninguna frena el tablero.
> Registro: fila del 16-oct (E12) en el §7 de `spec-visual.md`.

No necesita decisión. Se hace en esta rama, se mide y queda anotado en el §7 de la spec.

**E1 · El aviso de cookies** (C34, P66, P92, P63). En la home y en vertical ya no tapa el
chequeo, pero sí lo tapa en la página propia del chequeo, `/v3/diagnostico/`: a 320×568 cubre el
botón entero, y con el teléfono apaisado (667×375, 844×390) cubre el campo y el botón. En la
home queda un caso apaisado (568×320). Además, el aviso que aparece después de decidir sale con
radio de 16 px, sombra, un fondo fuera de la paleta y letra Inter. **Arreglo:** repintarlo desde
`driftime.css` con el método del 6-oct (sin tocar `Layout.astro` ni el script compartido con
producción) y compactarlo en pantallas bajas. Se mide por alto y en horizontal, no solo por
ancho.

**E2 · El menú** (C38). Tiene 8 filas y la escalera de entrada anima 6. La última, «Contacto»,
queda fuera de la pantalla en notebooks de 768 y 720 de alto. Hay que darle retardo al paso 7,
corregir el conteo en los comentarios y achicar el tope para que entre en ~650 px.

**E3 · Semántica y accesibilidad que tenía el v3 viejo** (rescate):
- Los enlaces del pie salen pegados en el texto plano («Desarrollo webVisibilidad en IA…»)
  porque dejaron de ir en listas. Vuelven a `ul/li`, que se ven igual.
- Las fases de Desarrollo web y de cada servicio vuelven a ser listas ordenadas, como ya lo son
  en Método.
- El `<article>` del artículo vuelve a envolver el h1, la fecha y el autor.
- El índice lateral del artículo numera dos veces en fintechs («01 1. La aplicación…»): se omite
  el contador cuando el título ya trae número.
- El alt de las piezas de obra suma el titular que se ve en la portada, como ya lo hace Verifica
  y Cumple. Es un atributo, así que lo que se ve en el hero no cambia.
- El cierre del índice del blog recupera el botón a contacto, como el cierre de cada artículo.

**E4 · Código y datos muertos** (B22, C39, P61, A13, C42, P77, C41, C40, P78, C37, A04):
`caja.ts` (su cabecera contradice el 5-oct), `prosa-v3.css` (305 líneas) y `campos-v3.css`, que
nada importa y que guardan el negro cálido #14110E, los campos sin uso en `oferta-v3.json` y
`obra-v3.json`, y 11 imágenes de obra que el build no pide: nueve que solo nombran esos campos, más
`aplomo.jpg` y `raigal.jpg`, que no nombra nadie. `aplomo.jpg` va primero, porque es una pieza que
Ramón decidió no publicar y hoy quedaría servida en una URL. Las imágenes se borran junto con sus
campos, para que el dato no apunte a archivos que no existen. Los nombres de planes en `oferta-v3.json` esperan a R7, porque pueden
volver. A eso se suman comentarios que dicen lo contrario del código: «catorce páginas», «el sitio
tiene veinte», la tipografía de `tailwind.config.mjs`, la `_nota` de `paginas-v3.json` (si alguien
le cree, rompe el JSON-LD) y el aviso de voz de `nosotros.astro`, que cita el §07 del manual en vez
del §08.

**E5 · Documentos superados** (A11, B20, B28, B29, B30, B31, P59): la auditoría de referencia (§8
completo), `recomendacion.md`, `tres-direcciones.md`, `comparacion-mensaje-giro-29sep.md` y
`nota-titulares-v3.md` siguen diciendo cosas que las decisiones del 2, 5 y 10-oct cambiaron. Cada
uno lleva arriba una nota de «superado» que remite a la spec. No se reescriben.

**E6 · Lo que la sesión antigua sabía y no quedó escrito:**
- En una plantilla Astro, un comentario `<!-- -->` se sirve al navegador, así que se comenta con
  `{/* */}`. Va como regla al §7 y a la memoria de Diego. Las páginas v3 ya cumplen, pero la home
  v2 del mismo build sirve 12 notas internas.
- Su corrección sobre el PR #41: la rama del v2 sí comparte ancestro con `main`, y el clon
  superficial engaña a quien lo compruebe en local. Se aplica al traspaso.
  **Hecho por el merge 2a62f1f** (trae c9d6f6a): §0 y §10 del traspaso ya lo dicen (13-oct).
- La memoria de Clara no registra la obra v3.

**E7 · La lista de publicación** (P70, P76, P77, nuevo del crítico). Se escribe ahora en la
carpeta de la obra, para que el día que Ramón decida R1 sea ejecutarla: el robots de 11
plantillas, el prefijo en 14 archivos, los 20 HTML y 2 páginas v2 que hay que retirar, las
maquetas fuera del build, `/trabajo/` en el sitemap, `llms.txt` reescrito (hoy presenta la casa
como «agencia de marketing con IA», con la tesis anterior al giro), los huérfanos recalculados y
la verificación final con `npm run verificar`.

**E8 · El pase de voz** (B21, P86). Nadie pasó `voz-spindlelab` sobre todo el copy nuevo del v3.
Clara corrigió textos puntuales en la QA final, pero eso no es un pase completo. Se hace antes
de publicar, sin tocar lo cerrado por Ramón (hero, bio, «acá») ni los cuerpos de los artículos,
que van tal cual. En la misma pasada: la guía de entrada de Desarrollo web repite casi palabra
por palabra la línea del campo de la home y la del menú.

**E8 hecho el 14-oct** (P0.3 de `lista-publicacion.md`), en la rama y sin publicar. Clara pasó
`voz-spindlelab` sobre todo el copy nuevo: 886 filas, que son las 851 ranuras abiertas del
inventario (el 100 %) y 35 del encargo de la oferta de Marco. Cambian 141, se mantienen 690 con su
motivo, 54 esperan R2 y 1 es un dato a verificar. La guía de Desarrollo web (P86) entró en el pase
(fila 983). Las seis filas transitorias de la spec y el punto 4 de la revisión cruzada («Visibilidad
en IA») quedaron cerrados. Documentos en `e8/`: `copy-secciones.md` (el entregable de Clara),
`hoja-de-voz.md`, `e8-antes-despues.md` (lo que lee Ramón con la vista previa) y `acta-qa-E8.md`.
- **Commits:** `28c5d85` (la migración al JSON, sin cambio visible), `3877e51`, `2dbaa09` y
  `eaa0c33` (la aplicación), `9b9d590` (el antes y después), `f0d911c` y `f57f227` (los arreglos de
  la QA). El último que toca el sitio es `f0d911c`.
- **QA:** Javiera, en contexto limpio. Ronda 1 (`8417701`): aprobado con reparos, 6 menores. Ronda
  2 (`ad7fea5`): **aprobado**. 245 de 245 diferencias explicadas por una fila, 141 de 141 filas en el
  sitio, lo cerrado intacto y `verificar` sin hallazgos a 390, 768 y 1440.
- **Registro:** tres filas del 14-oct en el §7 de `spec-visual.md`.

**Lo que queda abierto de E8:**
- **De Ramón:** R2 (el texto de cada lugar para cada respuesta está en el anexo A de
  `copy-secciones.md`, y lo aplica Diego en P0.2), R4 y R7 (anexo C), el plazo de la Auditoría +
  Visibilidad en IA y desde cuándo corren las ~2 semanas de la Auditoría de Visibilidad, y las diez
  confirmaciones sobre texto ya aplicado que abren `e8-antes-despues.md`. La 10 es el descuadre de la
  fila de dos de Trabajo (202 px a 768, 185 a 1440), que iba a decidir Lucía y pasó a Ramón.
- **De Clara, antes de la lectura de aprobación (P0.4):** proponerle a Ramón la frase de la prueba
  de Trabajo que tropieza en voz alta («como si el aviso de cookies frena…», confirmación 9).
- **Antes de publicar:** volver a correr el chequeo de la Ley 21.719 sobre la vista previa para la
  frase del 100, y la fecha de la ley (1-dic-2026) el día del corte.
- **Fuera de E8, para la troncal y la sesión de Marco:**
  `marketing/encargos-otras-sesiones/encargo-chequeo-google-extended-y-estudio-marco.md`
  (Google-Extended en el chequeo, en dos artículos y en la regla del 8-sep, y la corrección del
  estudio de Marco). Decide Ramón. Al final de ese encargo va también una nota para la troncal:
  que la skill `mini-diagnostico` obligue a hacerles de verdad las preguntas a ChatGPT, Gemini y
  Perplexity, porque el sitio ahora lo afirma (`copy-secciones.md`, anexo D, punto 4).

---

## 3 · De la troncal

Tocan `main` y los documentos compartidos, así que no los hace esta sesión. Cada merge a `main`
lo confirma Ramón.

- **D43 · El permiso de Bernardo.** En esta rama dice «CONCEDIDO» (confirmación verbal del
  30-sep). En `main` sigue diciendo «no se ha pedido todavía», así que la troncal y el outbound
  no usarían el caso. Basta llevar esa línea a `main` (commit 75bfffc).
- **B26 · El giro del 28 y 29-sep.** Ya está escrito, pero solo en la rama
  `claude/outbound-pozo-seco-28sep`, que nunca entró a `main`: la sección 0 del brief, la
  decisión en la ficha de cliente y dos estudios de competencia. Hay que traer esos commits, no
  reescribirlos. Si no, la ficha queda con la decisión dos veces. Al traerlos se anota «aplicado
  en el v3, sin publicar».
- **B27 · La retrospectiva de los 90 días.** El ciclo venció el 5-oct sin cierre, y el test de
  menciones no se corre desde el 25-ago. El test necesita navegador limpio, así que lo corre una
  sesión local o Ramón.

---

## 4 · Lo que no hay que perseguir

- **Obsoletos (19):** todo lo que dependía de «El eje de tu negocio», su bajada, los titulares
  en mayúsculas fuera de los cinco lugares y los bloques de la home vieja («No es un mal sitio»,
  «Leer, entender, citar», «Tres herramientas, gratis», «El mismo número, después»). También la
  prueba de los 20 abogados, que el giro del 29-sep dejó sin objeto.
- **Rescate descartado (64 de 85):** las pestañas de planes, el bloque de herramientas, los
  titulares en mayúsculas y la grilla de fotos del blog, entre otros, salieron por decisión
  registrada (tablero aprobado el 5-oct, spec §3, §4 y §7). Cuatro diferencias más no se
  sostuvieron al comprobarlas. El detalle está en el anexo.
- **X01 · Verifica y Cumple:** la URL del v3, `https://verifica.spindlelab.cl/`, responde y es la
  definitiva. `verificaycumple.pages.dev` redirige a ella. `verificaycumple.cl` no existe en el
  DNS, y por eso el traspaso vio un 502.
- **Los h1 del sitio de Bernardo** (B16, B18) siguen igual en su sitio vivo. El encargo está en
  `marketing/encargos-otras-sesiones/encargo-h1-sitio-bernardo-10oct.md` y es para la sesión del
  repo `rvalleespin/bernardo-combeau`.
