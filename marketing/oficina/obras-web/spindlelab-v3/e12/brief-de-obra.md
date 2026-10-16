# Brief de obra E12 · SpindleLab v3 · estudio de diseño y tecnología

**16-oct-2026, 14:05 (Chile) · Mauro** · rama `claude/magical-franklin-ckfki2`, base `947e6e1` · ficha
`oficina/clientes/spindlelab.md` · aprueba Ramón · nada se publica · `spindlelab-astro/` no se toca en este paso.
**Tipo: obra.** Cambian posicionamiento, referencia y sistema, y un cambio de dirección se encuadra como obra nueva
(protocolo, causa 5). E10 no llegó a la compuerta 2 y queda en pausa con E11. **Manda** `e12/insumos-ramon-16oct.md`.
Medidos los dos referentes en el navegador: Koto (`e12/medicion/koto/resumen.md`) y Accept & Proceed
(`e12/medicion/accept-and-proceed/resumen.md`); Javiera re-midió 13 filas y coinciden (`e12/acta-paso-1.md` §1.1). Lo
que este brief decía de Koto desde las capturas ya está corregido con la medición (§10).

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
| `/` | Cambia de papel | Declaración + su prueba en la misma pantalla (pregunta 2) → índice corto de obra → Craft y Logic lado a lado, con datos reales → servicios, Desarrollo web primero (Redes y Paid: pregunta 4) → quién está detrás → contacto · correr el chequeo o escribir |
| `/trabajo/` (sin publicar) | Cambia de papel | Índice de laboratorio: tipo (cliente, propio, concepto, herramienta), año, ingredientes verificados y caso por entrada; suma el chequeo · abrir un caso |
| `/trabajo/<caso>/` | Se suma (pregunta 3) | Caso con método. Hay material para Combeau (un caso, dos sitios) y Verifica y Cumple; Raigal sigue como ficha rotulada · Desarrollo web o el chequeo |
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
| Atmósfera: «microinteracciones táctiles» | Se toma | Lo medido en Koto: pocas, y cada una responde a algo que hizo el visitante (la pieza del índice se acorta 24 px y deja ver su bajada; el nav pasa del 70 al 100 % en 167 ms), y ninguna rebota. Aquí, las mismas tres familias (cursor, estado, entrada) con resortes que conservan la velocidad si se los interrumpe, que es lo táctil que se puede medir (lock §9), y con los techos del lock §14. En el teléfono, donde el toque es literal, no hay hover: lo que el hover revela queda a la vista (criterio 9). «Light Mode Editorial» y «rigor de plano»: filas Tokens y Planos |
| Atmósfera: «cero clichés de IA genérica (sin redes neuronales dibujadas ni gradientes púrpura)» | Se toma | Es regla del detector (refero, tell #1: índigo y violeta; antislop C3: degradé-mancha) y se extiende a sus parientes: ni cerebros, ni nodos conectados, ni partículas, ni «ambiente de laboratorio» generado (§5). Medido: ninguno de los dos referentes pone color en la interfaz (Koto, el amarillo solo en el logo; A&P, cero acento): el color lo pone el trabajo. El cobalto de tu brief (`#0029FF`) está a 13° del `indigo-500`, con casi 50 % más croma (lock §5) |
| Hero de declaración | Se ajusta | Ninguno de los dos referentes es monumental: Koto abre diciendo qué es («We’re Koto / The Creative Company», 48 px en una esquina sobre el showreel); A&P abre con 810 px de video sin una frase, y su titular más grande mide 35 px. La escala es el eje de la compuerta 2 (lock §16). «DISEÑAMOS EXPERIENCIAS. PROGRAMAMOS INTELIGENCIA.» es insumo de Clara, que lo prueba con lectores fríos; «programamos inteligencia» promete IA a medida que no hay (§5) |
| Párrafo mono de ficha: «[ LAB_01 ]» y «Un estudio de diseño y tecnología construyendo infraestructura digital a medida para líderes con visión»; en el brief, «[ LAB_STATUS: ACTIVE ]» y «[ DEPLOYMENT_CYCLE: 2026 ]» | Se ajusta | «Un estudio de diseño y tecnología» se toma: es el §1, dicho en la primera línea, como hace Koto. «[ LAB_01 ]» y las dos etiquetas no van: numeran o declaran un estado sin nada detrás (inventario §5.2), y los corchetes quedan solo alrededor de un enlace a un índice (lock §14). La ficha mono sí, con datos que se recalculan (lock §11). «Infraestructura digital» promete más de lo que hay: hacemos sitios y herramientas (§1, §5); y «construyendo» como adjetivo es calco del inglés. «Para líderes con visión» no va: elogia sin decir qué recibe el lector (el dueño o gerente de §2) ni a quién deja fuera. Koto hace el mismo gesto («Ambitious ideas for ambitious businesses»), pero como continuación del titular de su índice de trabajo, con el trabajo a la vista debajo. El texto final es de Clara |
| Índice de laboratorio | Con datos reales | Tipo, año, ingredientes y estado por entrada; son seis (inventario §0.1): dos sitios de un mismo cliente (Combeau), tres propias (Verifica y Cumple, el chequeo, spindlelab.cl) y un concepto (Raigal), y se dice. Bento con bordes, no: Koto arma un muro de dos columnas sin bordes ni cajas de datos, y A&P, pares con columnas vacías y cero cajas con borde (lock §7); las «cajas de datos duros» piden datos que no hay |
| Cursor con texto | Se toma | Koto: etiqueta de vidrio sin color («PLAY», «VIEW CASE»), solo sobre el showreel y los destacados, sin retardo. A&P: pastilla «View Project» gris translúcida, sin color, desde 992 px. Aquí dice adónde lleva («Ver el caso»); el círculo cobalto lo fija el lock §8. Solo con puntero fino, sin tapar el foco, quieto con movimiento reducido |
| Ingredientes técnicos | Con datos reales | Solo lo usado en ese proyecto, verificado en su repo o en el código servido, con lo que le hizo al cliente («Decap CMS: él carga sus series solo»). `[Modelos RAG]`, `[WebGL]`, `[Estrategia C-Level]`: nadie los usó. Sin `[ CORCHETES ]` |
| Craft vs Logic | Con datos reales | Una pieza al lado de lo que la prueba (su chequeo, su peso, su JSON-LD reales). Sin llamadas a API simuladas |
| Sandboxes | Se ajusta | Reescribir un texto o pasar a wireframe muestra un efecto, no el trabajo. El sandbox de verdad ya existe: el chequeo muestra qué robot entró al dominio del visitante y qué le respondió el servidor. A lo más uno más, con un hecho del sitio (esta página como la lee un robot) |
| Planos y registro | Se ajusta | Una línea entra si separa o alinea. Medido: Koto trae cero marcas de corte y sus filetes se cuentan con los dedos (el borde superior de cada sección del caso y dos o tres separadores); A&P usa 1 px solo en etiquetas y en una tabla. Con la condición de este brief, las marcas de corte en las esquinas no van. La cruz del lock §10, donde el borde de sección cruza la barra, es un desvío de esa condición: registrarlo en el lock §19 es el defecto 4 del acta, de Lucía |
| Telemetría | Con datos reales | Si «no significan nada crítico», no van: un número decorativo enseña a no creer en los demás. Medido: la telemetría de los dos referentes es toda verdadera. A&P tiene una sola, un reloj (en el pie y como salvapantallas); Koto, cuatro: la hora del visitante con su huso («15:07 UTC-3»), la de cada uno de sus cinco estudios (LA, NY, LDN, BER, SYD), conteos entre paréntesis («(148)», «(35)») y la ficha del caso («SOCIAL MEDIA · 2026») (`medicion/koto/resumen.md`, punto 5; `medicion/accept-and-proceed/resumen.md` §6). Aquí, solo lo que tiene fila en el inventario y en el lock §11: la hora de Santiago, el conteo del índice, la ficha de cada caso y, en Logic, lo que se recalcula (el resultado del visitante, la fecha del build, lo que pesó esta visita) |
| Casos P/H/S/R | Con datos reales | El caso medido de Koto (`/projects/instagram`) va en ese orden (Challenge, The Impossible Brief, The Process, Solution); de sus 35 casos, 0 dan un porcentaje y 0 un multiplicador, y uno solo (MachineX) da un resultado medido después del lanzamiento. Resultado con instrumento y fecha, o la parte no va (respuesta 3); 40 % y +150 % no existen. Hay medición en lo propio: Verifica y Cumple pasó de 54 a 94 en nuestro chequeo de 21 señales, el mismo instrumento el 14 y el 16-oct (inventario §0.2), y midió spindlelab.cl en 36 el 9-sep y 73 el 21-sep (dichos, sin crudo) y 100 el 14-oct con otra escala (solo en Trabajo, E9). Ninguna de negocio de un cliente (inventario §0.6). A&P deja «Metric» vacío en 20 de 20 |
| Tokens | Se ajusta | Queda la intención: claro, tinta casi negra, una señal escasa, una mono para datos. Tus valores pasan AA (calculado sobre `#F6F6F4`: `#666663` 5,32:1, `#0029FF` 7,03:1), pero los fija el lock. Space Grotesk y Plus Jakarta salen (respuesta 4) |
| Mono: Geist Mono o JetBrains Mono | Se ajusta (lo fija el lock §4) | Queda una mono para datos, como en Koto (11 px en mayúsculas para rótulos, 12 en caja normal para datos). Medida contra la de Koto, DM Mono 500 es la que más se le parece en las letras clave (0,787, 1.ª de 14; lock §6.3). Geist Mono mide primera y sale porque es la de la plantilla de Next.js (`create-next-app`); JetBrains Mono mide 13.ª de 14 y se lee «terminal» |
| Motion con resortes | Se toma | Motion tiene API sin React (`animate`, `spring`, `inView`) y corre en Astro. Medido: Koto, duraciones en cuadros a 60 Hz con curvas propias, cero rebote y scroll nativo; A&P, una entrada de 1,5 s y Lenis; los dos ignoran `prefers-reduced-motion`, y eso no se copia. Los resortes se calibran con los tiempos de Koto, con ζ ≥ 1, y Lenis sale del v3 (lock §9; lo confirma la spec) |
| Iconografía: minimalista, vectorial, trazo de 1,5 px (Lucide o SVG a medida) | Se ajusta (lo fija el lock §4) | Queda la intención: pocos, vectoriales, de trazo fino. Koto usa dos (↗ y play); aquí, ↗ como carácter de la mono y un SVG de pausa a medida, sin librería: para dos iconos no hace falta una, y Lucide es la de la plantilla shadcn |
| Next.js (App Router) + TypeScript | No | Respuesta 2: Astro + Tailwind + Motion sobre lo construido |

## 5 · Activos reales

Lista de partida, escrita antes del inventario. **Manda `e12/inventario-casos.md`** (Diego, con Simón, medido el 16-oct
entre las 14:50 y las 15:05): donde esta tabla y el inventario difieren, vale el inventario.

| Activo | Fuente | Permiso | Sirve para |
|---|---|---|---|
| Combeau, fotografía y modelo: dos sitios vivos, panel, mockups | `obra-v3.json`; `public/assets/img/obra/` | Verbal, 30-sep (`ventas/proyectos-en-curso.md:16`); su ficha aún dice «NO autorizado» (`oficina/clientes/bernardo-combeau.md:15`) | Caso sin cifra. Ingredientes por confirmar en su repo: Astro, Decap CMS, login con GitHub, Netlify desde el 8-sep (`encargos-otras-sesiones/cierre-oauth-bernardo-y-vercel-desinstalado-23sep.md`) |
| Verifica y Cumple | `obra-v3.json`; `verifica.spindlelab.cl` | Propio | Caso con lo medido; Cloudflare Pages (`laboratorio/01-cumplimiento-ley-21719/brief.md`), a confirmar |
| El chequeo de 21 señales | `functions/api/chequeo.js`; `/v3/diagnostico/` | Propio | Sandbox y telemetría verdadera (sondas por robot, códigos HTTP) |
| Raigal, concepto | `marketing/portafolio/01-raigal/` | Propio, rotulado; Ramón lo revisa antes (R9) | Entrada rotulada, sin resultado |
| El sitio: Astro, Tailwind, Cloudflare Pages | `spindlelab-astro/` | Propio | Fecha de despliegue y peso, medidos en el build |
| Precios · Ramón (nombre, retrato, CV) | los JSON · `v3/nosotros.astro:89-94` | Ratificados 27-sep · propio (bio: R4) | Idénticos · quién está detrás |
| Hallazgos generalizados (E1 a E18; 69 y 49 sitios) | `e11/material.md` §1-2 | Sin nombres | El problema que resuelve Logic |
| Grabaciones de pantalla de los sitios y del panel | Por producir, sin costo | Las de Combeau, con su OK (pregunta 5) | El video, protagonista en Koto y A&P |

**Huecos, no se rellenan:** ningún proyecto de IA a medida; Praxi, producto propio con un coach de IA, vive en otro
repo con otra marca y no entra sin decisión de Ramón (pregunta 5). Ninguna métrica de resultado de un cliente. Las
fotos con IA de E10 no existen (encargo en pausa). Módulo 369 y SimpleTrust, sin permiso. Koto y A&P son de imagen y
video: ese papel lo cubren capturas y grabaciones reales, nunca un «ambiente de laboratorio» generado o de banco
(tell #9 de `anti-ai-slop.md`).

## 6 · Lo que NO se hace en esta obra

1. **Next.js.** Astro + Tailwind + Motion sobre lo que hay: chequeo, formulario, `verificar`, deploy en Cloudflare.
2. **Cifras inventadas:** ni 40 %, ni +150 %, ni «+X % de eficiencia», ni telemetría decorativa.
3. **Logos, marcas o nombres de clientes sin permiso escrito;** ningún prospecto nombrado.
4. **Tocar precios, planes o nombres de servicio:** diff 0 contra los JSON.
5. **Publicar**, reencender Ads o sacar algo de `/v3/` y del noindex.
6. **«IA propietaria», «modelos RAG» o «despliegue de modelos» como hecho**, mientras no haya un proyecto así.
7. **Cambiar URLs publicadas** o tocar `Layout.astro` (gtag, consentimiento, Pixel), `.contact-form`, `#f-utm-*`, `chq-*`, `/privacidad/` o `spindlelab-site/`.
8. **El logo nuevo:** va después de la compuerta 2 (decisión del 16-oct).
9. **Retomar E10 o E11:** en pausa; de E11 se usan el diagnóstico y el material.
10. **Editar documentos compartidos** (estrategia, manual, fichas, pipeline, plan, outbound): los decide la troncal (`encargos-otras-sesiones/encargo-troncal-giro-laboratorio.md`).

## 7 · Criterios de aceptación

**Compuerta 2 (lock y tablero):**
1. El lock mide koto.com y acceptandproceed.com en el navegador (letra, color, retícula, cursor, movimiento) a 390 y
   1440, y cada decisión del tablero cita su fila del lock.
2. Dos direcciones, cada una con su referente dominante, lo que toma y lo que sacrifica. Ninguna repite los tokens
   de E10 (tinta, resaltador, letra) ni los de driftime (negro con campos de color).
3. Cada una muestra el primer viewport de la home, el índice de Trabajo y un caso con método, a 390 y 1440, con texto
   real y precios idénticos.
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

## 8 · Para Ramón, todo junto

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

**Supuestos, reversibles en una línea:** claro, como pide tu brief, aunque Koto es negro (`#060606` en las cuatro
páginas medidas, del 85 al 96 % de los píxeles fuera de los medios; el negro, a lo más un momento, si Lucía lo
justifica con lo medido) · el logo y el oro siguen abiertos y el tablero usa el wordmark actual · el mini-diagnóstico
se sigue ofreciendo (`e11/material.md` §9.1) · R1 a R9 no frenan el tablero; R5 (tu cargo en el JSON-LD, «Consultor
de SEO técnico y visibilidad en IA») queda desalineado con el giro y entra a la construcción.

## 9 · Compuerta 1

- **Aprobado por:** · **Fecha:** · **Cambios pedidos al aprobar:**

## 10 · Historial de correcciones

| Fecha | Corrección | Origen |
|---|---|---|
| 16-oct | Primera versión | Mauro, compuerta 1 de E12 |
| 16-oct | §4: una fila por cada idea de `insumos-ramon-16oct.md` que no tenía respuesta: identidad y tono, la filosofía «Form & Intelligence», la atmósfera (dos filas: «microinteracciones táctiles» y «sin redes neuronales dibujadas ni gradientes púrpura»), el párrafo «[ LAB_01 ]» con su frase y las etiquetas «LAB_STATUS» y «DEPLOYMENT_CYCLE», la mono y la iconografía (estas dos, «lo fija el lock §4») | Acta del paso 1, defecto 1 |
| 16-oct | §4 Telemetría: la de los referentes no es «un reloj». A&P tiene solo el reloj; Koto, cuatro (hora del visitante con huso, hora de sus cinco estudios, conteos y ficha del caso), todas verdaderas | Acta, defecto 12 (a) |
| 16-oct | §4 Índice y §8.3: las entradas son **seis**, no cinco (inventario §0.1). El tablero §6 copia la pregunta 3 con «cinco»: lo corrige Lucía, que es la dueña del tablero | Acta, defecto 12 (b) |
| 16-oct | §2: el 5,8 % y el 1,4 % llevan su n (4 de 69 y 1 de 72) y su fuente (`checkpoint-dia77-2026-09-21.md:36-37`) | Acta, defecto 12 (c) |
| 16-oct | Lo que el brief decía de Koto desde las capturas, corregido con la medición: encabezado (Koto ya está medido); §4 Hero (A&P no abre diciendo qué es: abre con 810 px de video sin una frase); §4 Planos (Koto trae cero marcas de corte; la cruz del lock §10 queda como desvío de esta condición, defecto 4 de Lucía); §4 Cursor, Casos y Motion (con lo medido de Koto; Casos suma el 54 → 94 de Verifica y Cumple, inventario §0.2); §8 supuestos (el negro de Koto, medido); §5 (el inventario ya llegó y manda) | Acta, defecto 12 (a): «el brief dice que la medición de Koto lo corrige, y no se corrigió» |
