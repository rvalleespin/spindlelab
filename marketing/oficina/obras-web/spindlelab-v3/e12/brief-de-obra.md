# Brief de obra E12 · SpindleLab v3 · estudio de diseño y tecnología

**16-oct-2026, 14:05 (Chile) · Mauro** · rama `claude/magical-franklin-ckfki2`, base `947e6e1` · ficha
`oficina/clientes/spindlelab.md` · aprueba Ramón · nada se publica · `spindlelab-astro/` no se toca en este paso.
**Tipo: obra.** Cambian posicionamiento, referencia y sistema, y un cambio de dirección se encuadra como obra nueva
(protocolo, causa 5). E10 no llegó a la compuerta 2 y queda en pausa con E11. **Manda** `e12/insumos-ramon-16oct.md`.
Medido: Accept & Proceed (`e12/medicion/accept-and-proceed/resumen.md`). Koto sigue en medición: lo que aquí se dice
de Koto sale de las capturas de Lucía (`e12/medicion/koto/capturas/`), y su medición lo corrige.

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
(abogados, nicho principal desde el 21-sep: 5,8 % de respuesta contra 1,4 % de salud), por contacto directo o
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
intención y la forma sale de lo medido. La forma final la fija el lock de Lucía.

| Idea | Veredicto | Por qué |
|---|---|---|
| Hero de declaración | Se ajusta | Los dos referentes abren diciendo qué son, y ninguno es monumental: A&P, 35 px de tope; Koto, dos líneas en una esquina. La escala sale del lock. «DISEÑAMOS EXPERIENCIAS. PROGRAMAMOS INTELIGENCIA.» es insumo de Clara, que lo prueba con lectores fríos; «programamos inteligencia» promete IA a medida que no hay (§5) |
| Índice de laboratorio | Con datos reales | Tipo, año, ingredientes y estado por entrada; son cinco, tres propias, y se dice. Bento con bordes, no: A&P arma pares con columnas vacías y cero cajas con borde, y las «cajas de datos duros» piden datos que no hay |
| Cursor con texto | Se toma | A&P: pastilla «View Project» gris translúcida, sin color, desde 992 px. Aquí dice adónde lleva («Ver el caso»). Solo con puntero fino, sin tapar el foco, quieto con movimiento reducido |
| Ingredientes técnicos | Con datos reales | Solo lo usado en ese proyecto, verificado en su repo o en el código servido, con lo que le hizo al cliente («Decap CMS: él carga sus series solo»). `[Modelos RAG]`, `[WebGL]`, `[Estrategia C-Level]`: nadie los usó. Sin `[ CORCHETES ]` |
| Craft vs Logic | Con datos reales | Una pieza al lado de lo que la prueba (su chequeo, su peso, su JSON-LD reales). Sin llamadas a API simuladas |
| Sandboxes | Se ajusta | Reescribir un texto o pasar a wireframe muestra un efecto, no el trabajo. El sandbox de verdad ya existe: el chequeo muestra qué robot entró al dominio del visitante y qué le respondió el servidor. A lo más uno más, con un hecho del sitio (esta página como la lee un robot) |
| Planos y registro | Se ajusta | A&P usa 1 px solo en etiquetas y en una tabla. Una línea entra si separa o alinea; marcas de corte, solo si la medición de Koto las trae |
| Telemetría | Con datos reales | Si «no significan nada crítico», no van: un número decorativo enseña a no creer en los demás. Los dos referentes tienen una sola telemetría, y es verdadera: un reloj. Aquí, la hora de Santiago y, en Logic, lo que se recalcula (el resultado del visitante, la fecha del último despliegue, el peso medido) |
| Casos P/H/S/R | Con datos reales | El caso capturado de Koto va en ese orden (Challenge, The Impossible Brief, The Process, Solution). Resultado con instrumento y fecha, o la parte no va (respuesta 3); 40 % y +150 % no existen. Hay medición en Verifica y Cumple (spindlelab.cl: 36 el 9-sep, 73 el 21-sep, 100 el 14-oct con otra escala; solo en Trabajo, E9), no en Combeau. A&P deja «Metric» vacío en 20 de 20 |
| Tokens | Se ajusta | Queda la intención: claro, tinta casi negra, una señal escasa, una mono para datos. Tus valores pasan AA (calculado sobre `#F6F6F4`: `#666663` 5,32:1, `#0029FF` 7,03:1), pero los fija el lock. Space Grotesk y Plus Jakarta salen (respuesta 4) |
| Motion con resortes | Se toma | Motion tiene API sin React (`animate`, `spring`, `inView`) y corre en Astro. De A&P, una sola entrada igual en cada página, sin su descuido: ignora `prefers-reduced-motion`. Lenis, que hoy carga el build, se decide en la spec |
| Next.js | No | Respuesta 2 |

## 5 · Activos reales

`e12/inventario-casos.md` no existe a esta hora: esta es la lista de partida, y si llega el inventario, manda él.

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
   ruta `/laboratorio/`.** Con cinco entradas, dos índices se ven vacíos, y en el repo «laboratorio» ya nombra otra
   cosa (`laboratorio/`, ideas fuera de la agencia).
4. **Redes sociales y Paid Media, ¿en la home?** Recomendado: **siguen en la oferta y en `/servicios/` con sus
   precios, y en la home bajan a una línea.** Un estudio que abre con gestión de redes vuelve a leerse como agencia
   de marketing, lo que tu segundo texto quiere dejar atrás.
5. **¿Qué activos liberas?** Recomendado: **pedirle a Bernardo por escrito (un WhatsApp basta) el permiso del caso,
   de una medición fechada de su sitio y de grabar su sitio y su panel**; sin eso, su caso va sin cifra. **Praxi queda
   fuera** salvo que digas que entra: sin un proyecto de IA a la vista, el sitio no dice que la programamos.

**Supuestos, reversibles en una línea:** claro, como pide tu brief, aunque Koto es negro en las cuatro pantallas
capturadas (el negro, a lo más un momento, si Lucía lo justifica con lo medido) · el logo y el oro siguen abiertos y
el tablero usa el wordmark actual · el mini-diagnóstico se sigue ofreciendo (`e11/material.md` §9.1) · R1 a R9 no
frenan el tablero; R5 (tu cargo en el JSON-LD, «Consultor de SEO técnico y visibilidad en IA») queda desalineado con
el giro y entra a la construcción.

## 9 · Compuerta 1

- **Aprobado por:** · **Fecha:** · **Cambios pedidos al aprobar:**
