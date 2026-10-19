# Brief de obra E12 · SpindleLab v3 · estudio de diseño y tecnología

**16-oct-2026, 14:05 (Chile) · Mauro** · rama `claude/magical-franklin-ckfki2`, base `947e6e1` · ficha
`oficina/clientes/spindlelab.md` · aprueba Ramón · nada se publica · `spindlelab-astro/` no se toca en este paso.
**Tipo: obra.** Cambian posicionamiento, referencia y sistema, y un cambio de dirección se encuadra como obra nueva
(protocolo, causa 5). E10 no llegó a la compuerta 2 y queda en pausa con E11. **Manda** `e12/insumos-ramon-16oct.md`.
Medidos los dos referentes en el navegador: Koto (`e12/medicion/koto/resumen.md`) y Accept & Proceed
(`e12/medicion/accept-and-proceed/resumen.md`); Javiera re-midió 13 filas y coinciden (`e12/acta-paso-1.md` §1.1). Lo
que este brief decía de Koto desde las capturas ya está corregido con la medición (§10).
**Desde el 19-oct, 09:55, manda primero la sección que sigue** (la compuerta 2), después «Compuerta 1» (16-oct,
19:50), sobre el resto de este brief y sobre `lock-koto.md` donde choquen. El paso 2 se encargó en
`e12/encargo-paso-2.md`; lo visual de la construcción lo fija `spec-visual.md`, que Lucía reescribe sobre A.

## Compuerta 2 (19-oct): lo que decidió Ramón

**19-oct-2026, a eso de las 09:50 (Chile) · registra Mauro a las 09:55.** Ramón contestó con el tablero de la compuerta
2 delante (`tableros/e12-direcciones/tablero.html`, publicado el 18-oct), después del veredicto de Javiera: Aprobado en
la vuelta 2, con los menores 20 a 23 abiertos (`acta-paso-2.md`, `70d7c23`). **Su respuesta textual, las preguntas y lo
que quedó por defecto están en `e12/insumos-ramon-19oct.md`.** Como en la compuerta 1, la cita es lo que escribió en la
conversación con la sesión que orquesta el estudio web, copiado por esa sesión. Cómo se lee cada respuesta lo decidió
el orquestador con Ramón, que aprobó el plan; aquí se registra. Lo superado en el resto del brief lleva **[C2.n]** junto
al texto viejo, que no se borra.

**En corto:** se construye **A · Archivo**, con el logo **El huso** y el **hero 3**; **la portada de la home es el video
del hilo de oro del sitio actual**, un desvío autorizado de «nunca un ambiente generado» (4); **no se paga ninguna
generación** (5); **Praxi y Combeau son los dos casos reales** con página propia (6), y el de Praxi nombra los modelos,
dice que se construyó con agentes de IA y no cuenta que está en pausa (7); lo que no contestó queda por defecto (8).

| # | Lo que decidió | Cita | Qué cambia del brief |
|---|---|---|---|
| 1 | **Dirección A · Archivo:** Google Sans Flex para la letra y DM Mono 500 para los datos, lienzo `#060606`, el trabajo carga la pantalla (`tableros/e12-direcciones/direccion-a.md`). **B · Banco queda como historia:** no se construye ni se borra, y no se le toman rasgos | «1 A» | §7: los criterios de la compuerta 2 quedan cumplidos. Los ejes del lock §16 dejan de ser una elección y van como en A (titular a la escala de Koto, 48 px; lo grande es el trabajo). [C1.8]: Mona Sans sale con B. Lucía reescribe `spec-visual.md` sobre A en esta corrida, y sin ella no se construye |
| 2 | **Logo: camino 2, «El huso»**, monocromo (pregunta 10, por defecto) y en Google Sans Flex wght 600, la letra de A (`e12/logo/camino-2-el-huso/`, `logo/caminos.md` §4) | «2 dos» | §6.8 [C1.9]: el dibujo final se hace ahora, desde el camino elegido. Tiene que probar lo que `caminos.md` §4 dejó como riesgo: que la tortera no se lea como alfiler, cerradura o seta, y que a 24 px se lea «SpindleLab». El giro de la tortera es una propuesta, no está construido: si entra, lo dice la spec, y con movimiento reducido queda quieto. Sin oro ni otro color (C1.7 y pregunta 10) |
| 3 | **Hero: la opción 3**, «hero-sitio» de `texto/texto-paso2.md`: el rótulo «Estudio de diseño y tecnología», el `h1` «Diseñamos y programamos sitios a medida. *Y los dejamos listos para que Google y ChatGPT puedan leerlos.*» y su entradilla | «3 tres» | §4, fila Hero: la frase del brief de Ramón («Diseñamos experiencias. Programamos inteligencia.») no es el titular; queda en `texto-paso2.json`, marcada, como las opciones 1 y 2 |
| 4 | **Portada: el video del hilo de oro del sitio actual**, `spindlelab-astro/public/hero-hilo-de-oro.mp4` (H.264, 1920 × 1080, 24 fps, 6,04 s, 5,1 MB, sin audio; póster `public/video/hero-hilo-de-oro.jpg`; nació en Higgsfield Cinema Studio 3.0, commit `41605cd` del 1-ago, como «metáfora del huso/hilo del nombre»). Va en la primera pantalla de la home de A, **en el lugar del showreel de Koto** (medido: a 1440 × 900 y 390 × 844, mudo, en bucle, sin controles nativos, con la frase de 48 px en una esquina encima; `medicion/koto/medicion.json`, `lock-koto.md:146` y `:256`). **La cinta de trabajo de A baja a ser la primera sección después de la portada** | «4 para la portada, re usar el video del sitio actual (hilo dorado)» | **Desvío autorizado por Ramón, y se registra como tal.** Es un video de marca generado con IA, y este brief (§5, «Huecos»: nunca un «ambiente de laboratorio» generado o de banco; §4, la fila de los clichés de IA) y el lock §20.2 (la imagen y el color son del trabajo, nunca de la interfaz) pedían solo trabajo real: van marcados [C2.4], sin borrar. Es la única excepción, y no abre la puerta a otra imagen generada (5). El oro ya no choca: el manual antiguo no rige el diseño (C1.7). **Lo que el video necesita para entrar** (criterio 14): versión VP9/WebM además de un H.264 más liviano; botón de pausa (WCAG 2.2.2: se mueve solo, en bucle, más de 5 s); velo en el negro `#060606`, no en la tinta vieja `#0E141B` del `Hero.astro` de hoy; contraste de la frase medido sobre el video; y quieto en el póster con movimiento reducido. **No cambia:** el chequeo sigue en la primera pantalla (C1.1; encargo del paso 2, criterio 10). Cómo conviven el video, la frase y el chequeo lo fija la spec |
| 5 | **Ninguna generación pagada:** las cuatro piezas de concepto siguen sin fotos ni clips generados, y la pauta de Bruno (9 fotos y 2 clips, `marketing/portafolio/plan-e12.md` §11) espera a que haya presupuesto | «cuando tenga plata vamos con lo faltante» | Nada de Higgsfield, Gemini u OpenAI, ni el plan PLUS (USD 49). Lo que falta en los conceptos queda como hueco nombrado (§5). La regla de la compuerta 1 sigue: ninguna generación pagada sin el OK de Ramón |
| 6 | **Praxi y Bernardo Combeau son los dos casos reales**, cada uno con su página en `/trabajo/<caso>/`. Combeau aún no tiene texto. Verifica y Cumple sigue como entrada del índice, como dice el inventario, sin su puntaje | «5f ambos son casos reales» | §3, `/trabajo/<caso>/`: dos casos reales con página, no uno (el encargo del paso 2, §9, suponía uno solo, en la vista 3). El caso Combeau va con lo medido o «Sin métrica» y sin sus medidas personales (8, y el defecto 21 del acta, aplicado a A) |
| 7 | **Lo que cuenta el caso de Praxi.** (a) **Capturas:** en los repos no hay capturas de la app con sesión iniciada; el caso va con las de las páginas públicas (`e12/praxi/capturas/`: landing, login, planes y empezar) y los recortes de `proto/a/medios/praxi-*.webp`, y el hueco de las pantallas internas queda nombrado. Si Ramón sube otras (su carpeta «PRAXI siembra» de iCloud), entran después. (b) **No dice que Praxi está en pausa** ni fuera de línea; sigue sin enlace a praxi.coach (responde 402) y sin `offers` ni `url` en su JSON-LD. (c) **Las tres fotos de la landing** (`landing-1.jpg` a `landing-3.jpg`), que la bitácora de Praxi llama «stock» (`praxis-coach/docs/encargos/bitacora-diseno.md:125` y `:327`) y que no tienen licencia escrita, **no se usan sueltas**: solo se ven dentro de las capturas de la landing, como parte del sitio construido. (d) **Nombra los modelos:** `claude-sonnet-5` hace de coach (`COACH_MODEL`) y `claude-haiku-4-5` extrae los registros y escribe la conclusión del día (`EXTRACTION_MODEL`), según `praxis-coach/lib/anthropic.ts:14` y `:17`. (e) **Dice que se construyó con agentes de IA:** sesiones de Claude Code, que los commits registran con `Co-Authored-By` | «5a tienes capturas en los archivos. 5b no se cuenta 5c las fotos están en la nube. 5d nombra. 5e. si fue con agentes de IA» | §5: Praxi pasa de hueco (C1.3) a caso con estas cinco condiciones. Cada nombre de modelo a la vista va con lo que hace para quien usa Praxi (§2, la regla de los términos técnicos). `/home/user/praxis-coach` sigue de solo lectura: nunca commit ni push, y no se toca su producción |
| 8 | **Lo que no contestó queda por defecto** (preguntas 6 a 10): los puntajes propios (Verifica y Cumple 54 → 94; spindlelab.cl 36 → 73) **no se muestran**; a Combeau **se le recortan sus medidas personales** (edad, estatura, pelo, ojos); **ninguna interior con el lienzo claro**; el círculo del cursor es **blanco**; el logo es **monocromo**. Los nombres de los conceptos quedan como en el tablero (`plan-e12.md` §14) | (sin respuesta) | §4, Casos: el 54 → 94 y el 36 → 73 no van a la vista; siguen medidos en el inventario. §4, Cursor: el círculo es blanco, no cobalto ni `#316BFF`. El lienzo es `#060606` en todas las páginas (lock §20.2, regla 1): la hoja blanca de B se fue con B |
| 9 | **Los defectos abiertos del acta, vuelta 2** | (lectura del orquestador, en el plan que aprobó Ramón) | **20** se cierra con el valor por defecto: la home de A muestra la alternativa de Clara, no el 54 → 94. **21** se aplica al caso Combeau en A: se recorta la línea de medidas y el `alt` no las menciona. **22** (el techo de campo de la vista 5 de A contra el lock §20.3) y **23** (la línea vieja de `direccion-a.md` §9.2) se cierran en la spec |

**Se mantiene:** Astro + Tailwind + Motion; casos reales solo con lo medido («Sin métrica» si no hay) y los conceptos
rotulados «Concepto» y sin métricas; cero prueba social inventada; ningún prospecto nombrado; precios y nombres
idénticos a `spindlelab-astro/src/data/oferta-v3.json` y `servicios-v3.json`; nada se publica ni va a `main`; tuteo de
Chile, sin voseo y sin raya de golpe; cada término técnico a la vista va con lo que le hace al cliente.

**Lo que sigue.** Corrida 1 (esta): el registro de la compuerta; la spec de E12 sobre A (Lucía); el logo final; el texto
de la obra; el inventario y las señales al día. **Nadie toca `spindlelab-astro/` en esta corrida.** Corrida 2: la
construcción de A en `spindlelab-astro/`, la QA de Javiera en subagente limpio y el cierre de Mauro.

## Compuerta 1 (16-oct): lo que decidió Ramón

**16-oct-2026, entre las 19:20 y las 19:45 (Chile), en la conversación con la sesión del estudio web · registra Mauro
a las 19:50.** Ramón decidió con el tablero del paso 1 delante (`tableros/e12-laboratorio/tablero.html`), después del
veredicto de Javiera: aprobado, en el cierre exprés de la vuelta 2 (`acta-paso-1.md`, `f248882`). Lo que queda
superado en el resto del brief lleva la marca **[C1.n]** junto al texto viejo, que no se borra (n es el número del punto
en la tabla de abajo).

**De dónde salen las citas.** Son fragmentos de lo que Ramón escribió en el chat, tal como los copió la sesión que
encargó este registro. Su texto completo no está en el repo: `insumos-ramon-16oct.md` llega hasta las 14:00. Los
puntos 8 y 9 llegaron sin cita, como decisión. El último mensaje suyo sobre esto es «no te contesté los 4 puntos»; la
respuesta que cubre esas cuatro preguntas es la del punto 1. **Si quiso decir que siguen abiertas, el paso 2 corre
igual:** usa la opción recomendada de cada una, lo dice en el tablero, y Ramón las cierra en la compuerta 2. Ninguna de
las cuatro cambia lo que hay que dibujar.

**En corto, lo que cambia del brief:** el claro pasa a **negro, con juegos de blanco u otros colores** en páginas o
secciones interiores (6); **el manual de marca antiguo deja de regir el diseño** del sitio y la identidad nueva sale de
esta obra (7, 8 y 9); **el índice suma cuatro piezas de concepto** con identidad, sitio y movimiento (5); **Praxi entra**
como caso (3); y el caso Combeau ya no espera un permiso escrito (2).

| # | Lo que decidió | Cita | Qué cambia del brief |
|---|---|---|---|
| 1 | Las preguntas 1 a 4 de §8 van con la opción recomendada: **el mismo comprador**; **la declaración arriba y el chequeo en la misma pantalla, como su prueba**; **`/trabajo/` como índice y una página por caso, sin ruta `/laboratorio/`**; **Redes y Paid Media siguen en la oferta y en `/servicios/`, y en la home bajan a una línea**. La pregunta 5 la responden el 2 y el 3 | «de acuerdo con todo lo que propones» | Nada se reescribe: §2, §3 y §8 ya decían lo recomendado. Las preguntas pasan de abiertas a decididas (§9). En la home, las dos direcciones ponen el chequeo en la primera pantalla a 1440; el lock §16 lo dejaba «justo debajo» en A, y eso cambia (encargo del paso 2, criterio 10) |
| 2 | Bernardo Combeau: no hace falta pedirle más permiso; Ramón ya lo pidió | «no se necesita más permiso. ya lo pedí hace un rato» | §5 y §8.5: el caso Combeau puede llevar grabaciones de su sitio y de su panel, y una medición fechada de su sitio, que el inventario §7 dejaba fuera porque el permiso verbal del 30-sep era solo del caso. **Queda registrado como lo dice Ramón:** no hay respaldo escrito en el repo, y la ficha de Bernardo (`oficina/clientes/bernardo-combeau.md:15`) y el pipeline (`:26`) siguen diciendo otra cosa; eso es de la troncal. El permiso no cambia lo medido: el sitio de Combeau no es vitrina de SEO (7 de 11 rutas sin `h1`, inventario §0.4) |
| 3 | **Praxi entra como caso** | «podría entrar praxi como caso ya que creó un sitio y una app» | §5: deja de ser hueco. Es producto propio de Ramón, con su marca (`oficina/clientes/praxi.md`): Next.js 14, Supabase y la API de Anthropic, en `/home/user/praxis-coach`, un clon de solo lectura. Es el único proyecto con IA programada que hay (inventario §8): el sitio puede decir que programamos una app con un coach de IA, y lo que Praxi hace de verdad, no más. «IA propietaria», «modelos RAG» y «despliegue de modelos» siguen fuera (§6.6). praxi.coach daba 402 el 23-sep: el caso no enlaza a un sitio que no responde, y las capturas salen de una copia fuera del repo. **En ese repo nunca se hace commit ni push, no se toca su producción y se respeta su `CLAUDE.md`** |
| 4 | Las páginas de caso siguen **la estructura medida de Koto**: ficha lateral pegajosa, secciones, imágenes grandes, y el resultado medido o «Sin métrica» | «hacer los casos como los hace la referencia» | Confirma §4 (Casos P/H/S/R) y el lock §13. Lo que suma: en Koto las cajas de imagen y video cubren del 33 al 72 % de cada página medida (lock §2.2), así que cada caso necesita material grande y real, y el encargo del paso 2 lo pide por caso |
| 5 | **Cuatro piezas de concepto**, una por rubro que vendemos: **industrial B2B, clínica, estudio legal y servicios**, cada una con **identidad, sitio y movimiento**, rotuladas «Concepto» con las reglas de `marketing/portafolio/README.md` | «para casos vamos a tener que abrirnos a crear algunas piezas para hacer un buen portafolio. no solo es poner cosas medidas si no que también mostrar el nivel de trabajo que puedo llegar a hacer» | §3, §4 (Índice) y §5: el índice pasa de seis entradas con un concepto (Raigal) a los casos reales más cuatro conceptos, y la decisión de tener una sola pieza de concepto en el sitio (README, fila de Aplomo) queda superada. Las reglas de la serie no se mueven: el rótulo se ve sin scroll y sale en una captura de la primera pantalla; la marca es inventada y suena inventada; cero cifras de resultado; cero testimonios; las restricciones del rubro son reales (en la clínica, ninguna promesa de resultado clínico y los profesionales dichos como ficticios; en el estudio legal, ninguna promesa de resultado de un caso) |
| 6 | **Color: base negra como Koto**, con páginas o secciones interiores que juegan con blanco u otros colores | «tomar el negro, pero así como muestra el sitio, también hay juegos con sitios interno con blanco u otros colores» | Reemplaza el supuesto «claro» de §8 y la fila Tokens de §4; en el lock, §1 y §5 (son de Lucía). Dos consecuencias medibles: **(a)** el cobalto `#0029FF` sobre el negro de Koto (`#060606`) da **2,66:1** (WCAG 2.1, calculado desde el hex): no llega al 3:1 de una forma ni al 4,5:1 de un texto, así que el color de señal se vuelve a decidir sobre negro. **(b)** El 15-oct Ramón rechazó de driftime «los colores de campo» y no marcó el negro (spec §7, fila del 15-oct): el juego de color no puede ser un campo de color por servicio, y el tablero dice en qué se diferencia. Las cuatro páginas de Koto medidas en el paso 1 son negras del 85 al 96 % de los píxeles fuera de los medios: dónde y cómo juega Koto con blanco u otros colores está por medir |
| 7 | **En diseño manda la referencia; el manual de marca antiguo deja de regir el sitio** | «en diseño regirse por la referencia. el manual antiguo se olvida. ahora tenemos que cambiar» | El oro `#C9A227` y su regla de un uso por vista, Gabarito e Inter, el wordmark actual y el color, la forma y la imagen del manual v3.0 (§02 a §07b) **no obligan en esta obra**; la identidad nueva (letra, color, logo) sale de E12 después de la compuerta 2. **Lo que sigue, porque es contenido y no diseño:** la voz (manual §08), cero prueba social inventada, ningún prospecto nombrado y ninguna raya usada como golpe. Supuesto, reversible en una línea: «en diseño» limita la decisión al aspecto. Desde aquí no se edita el manual (§6.10): lo avisa el encargo a la troncal |
| 8 | **Letra: una por dirección.** A usa **Google Sans Flex**, la más cercana a Koto; B usa **Mona Sans**. Mono: **DM Mono** en las dos | (sin cita) | El lock §6.2 elegía Mona Sans para las dos y dejaba Google Sans Flex como la opción de Ramón; ahora cada dirección lleva una, y la letra pasa a ser un eje más entre A y B. El riesgo que el lock dejó escrito para Google Sans Flex (la letra de los productos de Google, en un estudio que vende aparecer en Google) se dice en el tablero junto a A, y lo pesa Ramón mirándola. DM Mono 500, como en el lock §6.3 |
| 9 | **Logo:** Bruno propone **dos o tres caminos de wordmark** en la compuerta 2, junto con las direcciones | (sin cita) | §6.8 decía que el logo iba después de la compuerta 2: se adelanta la propuesta, no el dibujo final, que sale con la dirección elegida. Ningún camino usa el oro ni Gabarito por obligación (7) |

**Se mantiene:** Astro + Tailwind + Motion, no Next.js; casos reales solo con lo medido, y las piezas de concepto sin
métricas; cero prueba social inventada; ningún prospecto nombrado; precios y oferta idénticos a
`spindlelab-astro/src/data/oferta-v3.json` y `servicios-v3.json`; nada se publica; **`spindlelab-astro/` no se toca en
el paso 2**, porque los prototipos viven en `tableros/e12-direcciones/`; y **ninguna generación pagada de imágenes o
video sin el OK de Ramón** (Higgsfield, Gemini u OpenAI: si hace falta, se cotiza y se le pregunta antes de gastar).

## 0 · Qué tiene que lograr

El cuello sigue igual: 104 clics de Ads (CTR 16,05 %) y 0 contactos; 7 respuestas a 142 correos y 0 llamadas
(`marketing/metricas/checkpoint-dia77-2026-09-21.md`). Cambia la puerta: los dos únicos cierres son de Desarrollo
web (`ventas/pipeline.md`). **Objetivo:** que quien llega entienda en la primera pantalla que aquí se diseña y se
programa a medida, lo compruebe en el mismo sitio (obra, chequeo sobre su dominio, método, precios) y escriba. Se
mide con `generate_lead` al publicar; antes, con lectores fríos (§7).

## 1 · Posicionamiento

> **SpindleLab es un estudio de diseño y tecnología: diseñamos y programamos sitios y herramientas a medida, y lo
> que construimos se puede medir. También hacemos SEO técnico y visibilidad en IA, como servicios y como la parte
> que se comprueba: el chequeo de 21 señales corre sobre cualquier dominio, el nuestro incluido.**

**No es** una agencia de marketing (redes y pauta siguen en la oferta, no al frente: pregunta 4), **ni** una
consultora de IA (no hay un solo proyecto de IA a medida, §5), **ni** un equipo de veinte: es una persona «con agentes
de IA a mi lado y partners» (`v3/nosotros.astro:85`). **No se mueven** los seis servicios, sus planes y precios
(`servicios-v3.json`, `oferta-v3.json`, `v3/servicios/desarrollo-web.astro`), el chequeo ni el mini-diagnóstico.
Continúa el giro del 29-sep (el sitio al centro) y vuelve identidad lo que el manual ya llamaba personalidad: «un
laboratorio de creatividad que optimiza la maquinaria de un negocio» (§01).

## 2 · El lector

**Quién compra:** dueño, socio o gerente general de una pyme o estudio profesional B2B o YMYL, que decide solo o con
socios (de 51 a 200 personas, gerente de marketing: `ventas/pipeline-prospeccion.md:19-22`); a veces un gerente
comercial que le rinde a gerencia (lector 1 de E11). **Llega** por correo frío con un hallazgo de su sitio
(abogados, nicho principal desde el 21-sep: 4 respuestas de 69 correos, 5,8 %, contra 1 de 72 en salud, 1,4 %;
`marketing/metricas/checkpoint-dia77-2026-09-21.md:36-37`), por contacto directo o
recomendación (los dos cierres: el primero directo, el segundo recomendado por el primero) y, cuando se reencienda
la campaña, por Ads. Instagram lleva al chequeo, no a la home.
**Lo que el giro cambia:** los textos de Ramón le hablan al «C-Level» y al «CTO»; el pipeline no tiene una
conversación con un CTO, y un estudio de 8 personas o una clínica no tienen uno. Supuesto (pregunta 1): el mismo
comprador, y la técnica a la vista es prueba que él reenvía a su técnico o a su agencia, no el idioma principal.
**Lo que no sabe** (`e11/diagnostico-texto.md`): qué es SEO técnico, visibilidad en IA, AEO/GEO, una señal o «citar»;
que existe el mini-diagnóstico; qué es el circuito. E11 encontró un texto que hablaba desde adentro, y un laboratorio
tienta más (etiquetas, telemetría, jerga de despliegue). **Regla:** cada término técnico visible va con lo que le
hace al cliente, en palabras del dueño, o no va.

## 3 · Mapa de rutas (`spindlelab-astro/src/pages/v3/`, 21 rutas)

Ninguna de las 20 URLs del sitemap en vivo cambia. Las del v3 sin publicar se renombran solo como pregunta.

| Ruta | Estado | Para qué existe con el giro · acción pedida |
|---|---|---|
| `/` | Cambia de papel | Declaración + su prueba en la misma pantalla (pregunta 2) → índice corto de obra → Craft y Logic lado a lado, con datos reales → servicios, Desarrollo web primero (Redes y Paid: pregunta 4) → quién está detrás → contacto · correr el chequeo o escribir. **[C2.4: en A, la primera pantalla es la portada con el video del hilo de oro, con la frase y el chequeo; la cinta de trabajo baja a la primera sección después]** |
| `/trabajo/` (sin publicar) | Cambia de papel | Índice de laboratorio: tipo (cliente, propio, concepto, herramienta), año, ingredientes verificados y caso por entrada; suma el chequeo · abrir un caso. **[C1.3 y C1.5: suma Praxi y cuatro piezas de concepto]** |
| `/trabajo/<caso>/` | Se suma (pregunta 3) | Caso con método. Hay material para Combeau (un caso, dos sitios) y Verifica y Cumple; Raigal sigue como ficha rotulada · Desarrollo web o el chequeo. **[C1.3, C1.4 y C1.5: suma Praxi y una página por pieza de concepto, todas con la estructura medida de Koto]** **[C2.6: Praxi y Combeau son los dos casos reales con página; Verifica y Cumple queda como entrada del índice, sin su puntaje]** |
| `/diagnostico/` | Sube de papel | El sandbox de verdad: la parte Logic que el visitante corre sobre su dominio · correr el chequeo |
| `/servicios/` + 6 | Quedan | Desarrollo web pasa a ser la puerta del estudio; precios iguales · ver plan y precio |
| `/metodo/`, `/blog/` + 7, `/nosotros/`, `/contacto/` | Quedan | Artículos y bio (R4) tal cual; medición de contacto intacta. Las maquetas `a`, `b`, `c` y `maqueta-inicial` siguen fuera, con noindex |

## 4 · Las ideas de Ramón, una por una

**Se toma**: su intención, tal cual · **con datos reales**: solo con lo verificable · **se ajusta**: queda la
intención y la forma sale de lo medido. La forma final la fija el lock de Lucía. Una fila por idea de
`insumos-ramon-16oct.md` (el brief que pegaste, el segundo texto y las cuatro respuestas).

| Idea | Veredicto | Por qué |
|---|---|---|
| Identidad («Estudio de Diseño & Tecnología / Laboratorio Digital») y tono (Koto + A&P) | Se toma | El estudio es el §1. «Laboratorio» queda como manera de mostrar el trabajo (índice con tipo, año e ingredientes; casos con método), no como nombre ni como ruta (§8.3). El tono lo fijan Koto y A&P medidos (respuesta 4), no la etiqueta «escuela británica» |
| Filosofía «Form & Intelligence» (alta costura visual + arquitectura de software e IA propietaria) | Se ajusta | Queda la intención: la forma y la técnica en la misma pieza, que es lo que ordena Craft y Logic (la pieza al lado de lo que la prueba). No va como lema: es inglés en un sitio es-CL, y un rótulo que hay que explicar no pasa la regla de §2. Koto tampoco rotula su filosofía: la dice en una frase llana («Built on optimism. Driven by collaboration. Defined by craft.», `medicion/koto/resumen.md`, Contenido). «IA propietaria» no va (§6.6): no hay un proyecto así (§5). Si la quieres a la vista, en castellano y con lo que le hace al cliente, es insumo de Clara y la prueban los lectores fríos |
| Atmósfera: «microinteracciones táctiles» | Se toma | Lo medido en Koto: pocas, y cada una responde a algo que hizo el visitante (la pieza del índice se acorta 24 px y deja ver su bajada; el nav pasa del 70 al 100 % en 167 ms), y ninguna rebota. Aquí, las mismas tres familias (cursor, estado, entrada) con resortes que conservan la velocidad si se los interrumpe, que es lo táctil que se puede medir (lock §9), y con los techos del lock §14. En el teléfono, donde el toque es literal, no hay hover: lo que el hover revela queda a la vista (criterio 9). «Light Mode Editorial» y «rigor de plano»: filas Tokens y Planos. **[C1.6: «Light Mode Editorial» queda superado por la base negra]** |
| Atmósfera: «cero clichés de IA genérica (sin redes neuronales dibujadas ni gradientes púrpura)» | Se toma | Es regla del detector (refero, tell #1: índigo y violeta; antislop C3: degradé-mancha) y se extiende a sus parientes: ni cerebros, ni nodos conectados, ni partículas, ni «ambiente de laboratorio» generado (§5) **[C2.4: excepción única, autorizada por Ramón: la portada de la home reusa el video del hilo de oro, generado con IA]**. Medido: ninguno de los dos referentes pone color en la interfaz (Koto, el amarillo solo en el logo; A&P, cero acento): el color lo pone el trabajo. El cobalto de tu brief (`#0029FF`) está a 13° del `indigo-500`, con casi 50 % más croma (lock §5) |
| Hero de declaración | Se ajusta | Ninguno de los dos referentes es monumental: Koto abre diciendo qué es («We’re Koto / The Creative Company», 48 px en una esquina sobre el showreel); A&P abre con 810 px de video sin una frase, y su titular más grande mide 35 px. La escala es el eje de la compuerta 2 (lock §16). «DISEÑAMOS EXPERIENCIAS. PROGRAMAMOS INTELIGENCIA.» es insumo de Clara, que lo prueba con lectores fríos; «programamos inteligencia» promete IA a medida que no hay (§5). **[C2.3 y C2.4: el titular es el de la opción 3, y la primera pantalla de A es la portada con el video del hilo de oro, en el lugar del showreel de Koto]** |
| Párrafo mono de ficha: «[ LAB_01 ]» y «Un estudio de diseño y tecnología construyendo infraestructura digital a medida para líderes con visión»; en el brief, «[ LAB_STATUS: ACTIVE ]» y «[ DEPLOYMENT_CYCLE: 2026 ]» | Se ajusta | «Un estudio de diseño y tecnología» se toma: es el §1, dicho en la primera línea, como hace Koto. «[ LAB_01 ]» y las dos etiquetas no van: numeran o declaran un estado sin nada detrás (inventario §5.2), y los corchetes quedan solo alrededor de un enlace a un índice (lock §14). La ficha mono sí, con datos que se recalculan (lock §11). «Infraestructura digital» promete más de lo que hay: hacemos sitios y herramientas (§1, §5); y «construyendo» como adjetivo es calco del inglés. «Para líderes con visión» no va: elogia sin decir qué recibe el lector (el dueño o gerente de §2) ni a quién deja fuera. Koto hace el mismo gesto («Ambitious ideas for ambitious businesses»), pero como continuación del titular de su índice de trabajo, con el trabajo a la vista debajo. El texto final es de Clara |
| Índice de laboratorio | Con datos reales | Tipo, año, ingredientes y estado por entrada; son seis (inventario §0.1): dos sitios de un mismo cliente (Combeau), tres propias (Verifica y Cumple, el chequeo, spindlelab.cl) y un concepto (Raigal), y se dice. **[C1.3 y C1.5: entran Praxi y cuatro piezas de concepto; el conteo sale del inventario del paso 2]** Bento con bordes, no: Koto arma un muro de dos columnas sin bordes ni cajas de datos, y A&P, pares con columnas vacías y cero cajas con borde (lock §7); las «cajas de datos duros» piden datos que no hay |
| Cursor con texto | Se toma | Koto: etiqueta de vidrio sin color («PLAY», «VIEW CASE»), solo sobre el showreel y los destacados, sin retardo. A&P: pastilla «View Project» gris translúcida, sin color, desde 992 px. Aquí dice adónde lleva («Ver el caso»); el círculo cobalto lo fija el lock §8. **[C1.6: sobre negro, el cobalto da 2,66:1 y su color se decide de nuevo]** Solo con puntero fino, sin tapar el foco, quieto con movimiento reducido. **[C2.8: el círculo es blanco]** |
| Cursor magnético (del acento: «Úsalo únicamente para estados activos, cursores magnéticos y telemetría de código vivo») | Se ajusta: no | El círculo va donde va el puntero. Ni Koto ni A&P atraen el cursor, y un círculo que se corre hacia el centro de la pieza deja de decir dónde está quien visita (lo fija el lock §8, «Magnetismo: No»). El cobalto sí marca los estados activos y los datos vivos |
| Ingredientes técnicos | Con datos reales | Solo lo usado en ese proyecto, verificado en su repo o en el código servido, con lo que le hizo al cliente («Decap CMS: él carga sus series solo»). `[Modelos RAG]`, `[WebGL]`, `[Estrategia C-Level]`: nadie los usó. Sin `[ CORCHETES ]` |
| Craft vs Logic | Con datos reales | Una pieza al lado de lo que la prueba (su chequeo, su peso, su JSON-LD reales). Sin llamadas a API simuladas |
| Sandboxes | Se ajusta | Reescribir un texto o pasar a wireframe muestra un efecto, no el trabajo. El sandbox de verdad ya existe: el chequeo muestra qué robot entró al dominio del visitante y qué le respondió el servidor. A lo más uno más, con un hecho del sitio (esta página como la lee un robot) |
| Planos y registro | Se ajusta | Una línea entra si separa o alinea. Medido: Koto trae cero marcas de corte y sus filetes se cuentan con los dedos (el borde superior de cada sección del caso y dos o tres separadores); A&P usa 1 px solo en etiquetas y en una tabla. Con la condición de este brief, las marcas de corte en las esquinas no van. La cruz del lock §10, donde el borde de sección cruza la barra, es un desvío de esa condición: registrarlo en el lock §19 es el defecto 4 del acta, de Lucía |
| Telemetría | Con datos reales | Si «no significan nada crítico», no van: un número decorativo enseña a no creer en los demás. Medido: la telemetría de los dos referentes es toda verdadera. A&P tiene una sola, un reloj (en el pie y como salvapantallas); Koto, cuatro: la hora del visitante con su huso («15:07 UTC-3»), la de cada uno de sus cinco estudios (LA, NY, LDN, BER, SYD), conteos entre paréntesis («(148)», «(35)») y la ficha del caso («SOCIAL MEDIA · 2026») (`medicion/koto/resumen.md`, punto 5; `medicion/accept-and-proceed/resumen.md` §6). Aquí, solo lo que tiene fila en el inventario y en el lock §11: la hora de Santiago, el conteo del índice, la ficha de cada caso y, en Logic, lo que se recalcula (el resultado del visitante, la fecha del build, lo que pesó esta visita) |
| Casos P/H/S/R | Con datos reales | El caso medido de Koto (`/projects/instagram`) va en ese orden (Challenge, The Impossible Brief, The Process, Solution); de sus 35 casos, 0 dan un porcentaje y 0 un multiplicador, y uno solo (MachineX) da un resultado medido después del lanzamiento. Resultado con instrumento y fecha, o la parte no va (respuesta 3); 40 % y +150 % no existen. Hay medición en lo propio: Verifica y Cumple pasó de 54 a 94 en nuestro chequeo de 21 señales, el mismo instrumento el 14 y el 16-oct (inventario §0.2), y midió spindlelab.cl en 36 el 9-sep y 73 el 21-sep (dichos, sin crudo) y 100 el 14-oct con otra escala (solo en Trabajo, E9). Ninguna de negocio de un cliente (inventario §0.6). A&P deja «Metric» vacío en 20 de 20. **[C2.8: los puntajes propios (54 → 94 y 36 → 73) no se muestran; C2.6: los casos reales son Praxi y Combeau]** |
| Tokens | Se ajusta **[C1.6 y C1.7: superado. Base negra con juegos de blanco u otros colores; el manual antiguo no rige]** **[C2.1: los de A, lienzo `#060606`; los fija la spec]** | Queda la intención: claro, tinta casi negra, una señal escasa, una mono para datos. Tus valores pasan AA (calculado sobre `#F6F6F4`: `#666663` 5,32:1, `#0029FF` 7,03:1), pero los fija el lock. Space Grotesk y Plus Jakarta salen (respuesta 4) |
| Mono: Geist Mono o JetBrains Mono | Se ajusta (lo fija el lock §4) | Queda una mono para datos, como en Koto (11 px en mayúsculas para rótulos, 12 en caja normal para datos). Medida contra la de Koto, DM Mono 500 es la que más se le parece en las letras clave (0,787, 1.ª de 14; lock §6.3). Geist Mono mide primera y sale porque es la de la plantilla de Next.js (`create-next-app`); JetBrains Mono mide 13.ª de 14 y se lee «terminal» |
| Motion con resortes | Se toma | Motion tiene API sin React (`animate`, `spring`, `inView`) y corre en Astro. Medido: Koto, duraciones en cuadros a 60 Hz con curvas propias, cero rebote y scroll nativo; A&P, una entrada de 1,5 s y Lenis; los dos ignoran `prefers-reduced-motion`, y eso no se copia. Los resortes se calibran con los tiempos de Koto, con ζ ≥ 1, y Lenis sale del v3 (lock §9; lo confirma la spec) |
| Iconografía: minimalista, vectorial, trazo de 1,5 px (Lucide o SVG a medida) | Se ajusta (lo fija el lock §4) | Queda la intención: pocos, vectoriales, de trazo fino. Koto usa dos (↗ y play); aquí, ↗ como carácter de la mono y un SVG de pausa a medida, sin librería: para dos iconos no hace falta una, y Lucide es la de la plantilla shadcn |
| Next.js (App Router) + TypeScript | No | Respuesta 2: Astro + Tailwind + Motion sobre lo construido |

## 5 · Activos reales

Lista de partida, escrita antes del inventario. **Manda `e12/inventario-casos.md`** (Diego, con Simón, medido el 16-oct
entre las 14:50 y las 15:05): donde esta tabla y el inventario difieren, vale el inventario.

| Activo | Fuente | Permiso | Sirve para |
|---|---|---|---|
| Combeau, fotografía y modelo: dos sitios vivos, panel, mockups | `obra-v3.json`; `public/assets/img/obra/` | Verbal, 30-sep (`ventas/proyectos-en-curso.md:16`); su ficha aún dice «NO autorizado» (`oficina/clientes/bernardo-combeau.md:15`). **[C1.2: Ramón dice que no hace falta más permiso]** | Caso sin cifra. **[C2.6 y C2.8: caso real con página propia, sin sus medidas personales]** Ingredientes por confirmar en su repo: Astro, Decap CMS, login con GitHub, Netlify desde el 8-sep (`encargos-otras-sesiones/cierre-oauth-bernardo-y-vercel-desinstalado-23sep.md`) |
| Verifica y Cumple | `obra-v3.json`; `verifica.spindlelab.cl` | Propio | Caso con lo medido; Cloudflare Pages (`laboratorio/01-cumplimiento-ley-21719/brief.md`), a confirmar |
| El chequeo de 21 señales | `functions/api/chequeo.js`; `/v3/diagnostico/` | Propio | Sandbox y telemetría verdadera (sondas por robot, códigos HTTP) |
| Raigal, concepto | `marketing/portafolio/01-raigal/` | Propio, rotulado; Ramón lo revisa antes (R9) | Entrada rotulada, sin resultado. **[C1.5: pasan a ser cuatro piezas de concepto]** |
| El sitio: Astro, Tailwind, Cloudflare Pages | `spindlelab-astro/` | Propio | Fecha de despliegue y peso, medidos en el build |
| Precios · Ramón (nombre, retrato, CV) | los JSON · `v3/nosotros.astro:89-94` | Ratificados 27-sep · propio (bio: R4) | Idénticos · quién está detrás |
| Hallazgos generalizados (E1 a E18; 69 y 49 sitios) | `e11/material.md` §1-2 | Sin nombres | El problema que resuelve Logic |
| Grabaciones de pantalla de los sitios y del panel | Por producir, sin costo | Las de Combeau, con su OK (pregunta 5). **[C1.2]** | El video, protagonista en Koto y A&P |

**Huecos, no se rellenan:** ningún proyecto de IA a medida; Praxi, producto propio con un coach de IA, vive en otro
repo con otra marca y no entra sin decisión de Ramón (pregunta 5). **[C1.3: Praxi entra. Sigue sin haber un proyecto de IA
a medida para un cliente]** **[C2.7: el caso de Praxi va con las capturas de sus páginas públicas, nombra los modelos y dice que se construyó con agentes de IA]** Ninguna métrica de resultado de un cliente. Las
fotos con IA de E10 no existen (encargo en pausa). Módulo 369 y SimpleTrust, sin permiso. Koto y A&P son de imagen y
video: ese papel lo cubren capturas y grabaciones reales, nunca un «ambiente de laboratorio» generado o de banco
(tell #9 de `anti-ai-slop.md`). **[C2.4: desvío autorizado por Ramón el 19-oct: la portada de la home reusa el video del
hilo de oro, generado con IA en Higgsfield el 1-ago. Es la única excepción; los conceptos siguen sin fotos ni clips
generados (C2.5)]**

## 6 · Lo que NO se hace en esta obra

1. **Next.js.** Astro + Tailwind + Motion sobre lo que hay: chequeo, formulario, `verificar`, deploy en Cloudflare.
2. **Cifras inventadas:** ni 40 %, ni +150 %, ni «+X % de eficiencia», ni telemetría decorativa.
3. **Logos, marcas o nombres de clientes sin permiso escrito;** ningún prospecto nombrado.
4. **Tocar precios, planes o nombres de servicio:** diff 0 contra los JSON.
5. **Publicar**, reencender Ads o sacar algo de `/v3/` y del noindex.
6. **«IA propietaria», «modelos RAG» o «despliegue de modelos» como hecho**, mientras no haya un proyecto así.
7. **Cambiar URLs publicadas** o tocar `Layout.astro` (gtag, consentimiento, Pixel), `.contact-form`, `#f-utm-*`, `chq-*`, `/privacidad/` o `spindlelab-site/`.
8. **El logo nuevo:** va después de la compuerta 2 (decisión del 16-oct). **[C1.9: Bruno propone dos o tres caminos de
   wordmark en la compuerta 2; el dibujo final sigue después]** **[C2.2: camino 2, «El huso», monocromo, en Google Sans
   Flex wght 600; el dibujo final se hace ahora]**
9. **Retomar E10 o E11:** en pausa; de E11 se usan el diagnóstico y el material.
10. **Editar documentos compartidos** (estrategia, manual, fichas, pipeline, plan, outbound): los decide la troncal (`encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md`).
11. **[C2.1] Construir B, o tomarle rasgos a B para A:** la mezcla de dos direcciones es su promedio.
12. **[C2.4 y C2.5] Otra imagen o video generado** que no sea el hilo de oro de la portada, y cualquier generación pagada.
13. **[C2.7] Enlazar a praxi.coach, contar que Praxi está en pausa o usar sueltas las fotos de su landing.**

## 7 · Criterios de aceptación

**Compuerta 2 (lock y tablero):** **[C2: cumplidos. Javiera aprobó en la vuelta 2 (`acta-paso-2.md`) y Ramón eligió A el
19-oct]**
1. El lock mide koto.com y acceptandproceed.com en el navegador (letra, color, retícula, cursor, movimiento) a 390 y
   1440, y cada decisión del tablero cita su fila del lock.
2. Dos direcciones, cada una con su referente dominante, lo que toma y lo que sacrifica. Ninguna repite los tokens
   de E10 (tinta, resaltador, letra) ni los de driftime (negro con campos de color). **[C1.6: el negro ya no cuenta
   como repetir driftime; un campo de color por servicio, sí. Lo precisa el criterio 4 de `encargo-paso-2.md`]**
3. Cada una muestra el primer viewport de la home, el índice de Trabajo y un caso con método, a 390 y 1440, con texto
   real y precios idénticos. **[Ampliado por la compuerta 1: cinco vistas por dirección, los caminos de logo y los
   conceptos; lo lista `encargo-paso-2.md`]**
4. Cada número visible tiene fila con instrumento y fecha; cada etiqueta técnica, fila en el inventario (proyecto y
   dónde se verificó). Cero telemetría que no se pueda recalcular.
5. Cada idea de §4 sale como dice su veredicto; lo que dice «no», no aparece.
6. Contraste AA medido en todo texto; un solo color de señal.
7. Javiera, en subagente limpio, firma el tablero con los dos detectores anti-slop completos.

**Construcción:**
8. Motion con versión fija; con `prefers-reduced-motion: reduce`, ni resortes ni cursor que siga (medido emulando).
9. Cursor propio solo con `(pointer: fine)`; foco visible en todo enlace; nada que se entienda solo con hover.
10. `npm run build && npm run verificar` sin hallazgos a 390, 768 y 1440 en las rutas tocadas.
11. `generate_lead`, nombres del formulario, `chq-*`, `v3-chequeo.js` y `functions/api/chequeo.js`: diff 0, o cada
    cambio con su motivo en la spec. Las 20 URLs del sitemap sin cambio; `/v3/` con noindex.
12. Corrido con `chequeo.js` sobre el build servido en local, el sitio saca lo mismo o más que el build del 16-oct
    (el número va al acta; publicarlo lo decide Ramón).
13. Lectores fríos (los tres perfiles de E11) leen la home y un caso y escriben qué hacemos, que también hacemos SEO
    técnico y visibilidad en IA, y qué harían ahora, sin tropezar con un término sin explicar.
14. **[C2.4] La portada:** el video del hilo de oro se sirve en VP9/WebM y en un H.264 de menos de 5,1 MB, con su
    póster; tiene un botón de pausa que se alcanza con el teclado y dice su estado; el velo es `#060606`; la frase pasa
    AA medida sobre el video, en su cuadro más claro; y con `prefers-reduced-motion: reduce` queda quieto en el póster
    (medido emulando). El chequeo sigue en la primera pantalla a 1440.
15. **[C2.6 a C2.8] Los casos:** ningún puntaje propio a la vista (ni 54 → 94 ni 36 → 73); Combeau sin edad, estatura,
    pelo ni ojos, ni en la imagen ni en el `alt`; Praxi sin enlace a praxi.coach, sin `offers` ni `url` en su JSON-LD,
    sin decir que está en pausa, con los dos modelos nombrados y lo que hace cada uno, y las fotos de su landing solo
    dentro de las capturas.

## 8 · Para Ramón, todo junto

**[Respondidas el 16-oct: C1.1 a C1.3, arriba.]**

1. **¿A quién le vende el giro?** Recomendado: **al mismo comprador** (dueños, socios y gerentes de pymes B2B y
   estudios), con la técnica como prueba reenviable. Las empresas con CTO piden otra lista, otra evidencia y un caso
   que no hay.
2. **¿Qué va en la primera pantalla de la home?** Recomendado: **tu declaración arriba y el chequeo en la misma
   pantalla, como su prueba**: conserva «el instrumento primero» (2-oct) y suma tu hero; si a 390 no caben, el chequeo
   va justo debajo y Javiera lo mide. Las otras: solo la declaración, o el chequeo primero como hoy.
3. **¿Cómo se arma el laboratorio?** Recomendado: **`/trabajo/` como índice, una página por caso con material, sin
   ruta `/laboratorio/`.** Con seis entradas, una sola de cliente (inventario §0.1), dos índices se ven vacíos, y en
   el repo «laboratorio» ya nombra otra cosa (`laboratorio/`, ideas fuera de la agencia).
4. **Redes sociales y Paid Media, ¿en la home?** Recomendado: **siguen en la oferta y en `/servicios/` con sus
   precios, y en la home bajan a una línea.** Un estudio que abre con gestión de redes vuelve a leerse como agencia
   de marketing, lo que tu segundo texto quiere dejar atrás.
5. **¿Qué activos liberas?** Recomendado: **pedirle a Bernardo por escrito (un WhatsApp basta) el permiso del caso,
   de una medición fechada de su sitio y de grabar su sitio y su panel**; sin eso, su caso va sin cifra. **Praxi queda
   fuera** salvo que digas que entra: sin un proyecto de IA a la vista, el sitio no dice que la programamos.

**Supuestos, reversibles en una línea:** **[C1.6: superado, la base es negra]** claro, como pide tu brief, aunque Koto es negro (`#060606` en las cuatro
páginas medidas, del 85 al 96 % de los píxeles fuera de los medios; el negro, a lo más un momento, si Lucía lo
justifica con lo medido) · **[C1.7 y C1.9: superado; el oro no rige y el logo trae caminos a la compuerta 2]** el logo y el
oro siguen abiertos y el tablero usa el wordmark actual **[C2.2: el logo es el camino 2, «El huso», monocromo]** · el mini-diagnóstico
se sigue ofreciendo (`e11/material.md` §9.1) · R1 a R9 no frenan el tablero; R5 (tu cargo en el JSON-LD, «Consultor
de SEO técnico y visibilidad en IA») queda desalineado con el giro y entra a la construcción.

## 9 · Compuertas

- **Compuerta 1 · Aprobado por:** Ramón · **Fecha:** 16-oct-2026, entre las 19:20 y las 19:45 (Chile) · **Cambios pedidos al aprobar:**
  los puntos 2 a 9 de la sección «Compuerta 1» del principio. Las preguntas 1 a 4, con la opción recomendada (punto 1).
- **Compuerta 2 · Elegido por:** Ramón · **Fecha:** 19-oct-2026, a eso de las 09:50 (Chile) · **Elección:** A · Archivo,
  logo El huso y hero 3, con la portada del hilo de oro como desvío autorizado y sin generación pagada; Praxi y Combeau
  como casos reales; las preguntas 6 a 10, por defecto. Los nueve puntos están en la sección «Compuerta 2» del principio;
  el textual, en `insumos-ramon-19oct.md`.

## 10 · Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 16-oct | Primera versión | Mauro, compuerta 1 de E12 |
| 16-oct | §4: una fila por cada idea de `insumos-ramon-16oct.md` que no tenía respuesta: identidad y tono, la filosofía «Form & Intelligence», la atmósfera (dos filas: «microinteracciones táctiles» y «sin redes neuronales dibujadas ni gradientes púrpura»), el párrafo «[ LAB_01 ]» con su frase y las etiquetas «LAB_STATUS» y «DEPLOYMENT_CYCLE», la mono y la iconografía (estas dos, «lo fija el lock §4») | Acta del paso 1, defecto 1 |
| 16-oct | §4 Telemetría: la de los referentes no es «un reloj». A&P tiene solo el reloj; Koto, cuatro (hora del visitante con huso, hora de sus cinco estudios, conteos y ficha del caso), todas verdaderas | Acta, defecto 12 (a) |
| 16-oct | §4 Índice y §8.3: las entradas son **seis**, no cinco (inventario §0.1). El tablero §6 copia la pregunta 3 con «cinco»: lo corrige Lucía, que es la dueña del tablero | Acta, defecto 12 (b) |
| 16-oct | §2: el 5,8 % y el 1,4 % llevan su n (4 de 69 y 1 de 72) y su fuente (`checkpoint-dia77-2026-09-21.md:36-37`) | Acta, defecto 12 (c) |
| 16-oct | Lo que el brief decía de Koto desde las capturas, corregido con la medición: encabezado (Koto ya está medido); §4 Hero (A&P no abre diciendo qué es: abre con 810 px de video sin una frase); §4 Planos (Koto trae cero marcas de corte; la cruz del lock §10 queda como desvío de esta condición, defecto 4 de Lucía); §4 Cursor, Casos y Motion (con lo medido de Koto; Casos suma el 54 → 94 de Verifica y Cumple, inventario §0.2); §8 supuestos (el negro de Koto, medido); §5 (el inventario ya llegó y manda) | Acta, defecto 12 (a): «el brief dice que la medición de Koto lo corrige, y no se corrigió» |
| 16-oct, 19:50 | **Compuerta 1.** Sección nueva al principio con los nueve puntos que decidió Ramón, sus citas y qué cambia; §9 lleno; marcas **[C1.n]** en §3, §4, §5, §6.8, §7 (2 y 3) y §8, sin borrar el texto viejo. El paso 2 se encarga en `encargo-paso-2.md` | Ramón, compuerta 1; registra Mauro |
| 19-oct, 09:55 | **Compuerta 2.** Sección nueva al principio, antes de la de la compuerta 1, con los nueve puntos (A · Archivo, El huso, hero 3, la portada con el video del hilo de oro como desvío autorizado, ninguna generación pagada, Praxi y Combeau como casos reales, lo que cuenta el caso de Praxi, lo que quedó por defecto y los defectos 20 a 23 del acta), sus citas y qué cambia; encabezado: manda primero la compuerta 2; marcas **[C2.n]** en §3, §4 (clichés, Hero, Cursor, Casos, Tokens), §5 (Combeau y huecos), §6.8, §7 y §8, sin borrar el texto viejo; §6 suma 11 a 13; §7 suma los criterios 14 y 15; §9 pasa a «Compuertas». Textual: `insumos-ramon-19oct.md` | Ramón, compuerta 2; registra Mauro |
