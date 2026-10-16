# Brief de texto E11 · Home, Acompañamiento mensual y Trabajo (v3)

**16-oct-2026, 13:20 (Chile) · Mauro** · Base `b971a82`, rama `claude/magical-franklin-ckfki2` · **Obra**:
texto de tres rutas en dos direcciones; reabre el hero que Ramón cerró el 10-oct (`e8/hoja-de-voz.md` §4,
fila 1) · Aprueba Ramón · Nada se publica · Este brief no escribe el sitio.

## 0 · El encargo y lo medido

> «siento que se está dando por sabido al cliente. me gustaría un mejor texto. estratégico para venta pero
> también con una buena pluma. la idea gancho hay que explicarlo mejor si lo queremos hacer durar (lo de
> "ahí se corta el circuito") no tiene contexto» (Ramón, 16-oct, 13:14, sobre el tablero E10)

**Objetivo:** que quien llega sin conocernos entienda qué le resolvemos y cuánto le cuesta hoy **antes** de
que le pidamos algo, y dé el paso. Es el cuello del brief de obra §1: Ads trajo 104 clics (CTR 16,05 %) y 0
contactos (`marketing/metricas/checkpoint-dia77-2026-09-21.md` §3).

**Medido** en `dist/v3` (igual al tablero en más de 0,997, `e10/acta-paso-2.md`), con `e8/herramientas/extraer.mjs`
y Playwright a 390×844 y 1440×900. La primera pantalla de la home trae rótulo, botón y nota del chequeo,
ojillo, h1 y rótulos de obra: **ninguno dice qué hacemos ni qué pierde el lector**; la explicación («Tu sitio
está escrito para personas…») queda bajo las obras, fuera de pantalla. «Ver cómo lo lee» no dice quién lee.
«Visibilidad en IA» sale 6 veces y «SEO técnico» 3, sin explicar; el cuerpo nunca ofrece el mini-diagnóstico.
Acompañamiento usa keywords, share-of-voice, AI Overviews, indexación y CDN sin explicarlos; Trabajo abre
hablando de la página. Es un patrón: Ramón ya pidió «el idioma del dueño, no el del técnico» (31-ago, ficha de
SpindleLab) y rechazó correos «demasiado técnicos» que «no venden bien el servicio» (`voz-spindlelab/corpus.md` §8).

## 1 · El lector

| Perfil | Decide y llega | Qué **no** sabe al llegar |
|---|---|---|
| **A · Tiene sitio y no le rinde.** Canal vivo: abogados responden 5,8 % y salud 1,4 % (checkpoint §2) | Socio, gerente o dueño, a veces con socios. **Correo frío con un hallazgo de su sitio**; entra a ver quién le escribió | Que ChatGPT y Perplexity recomiendan proveedores por nombre y mandan robots a leer los sitios; que una regla del CDN puede cerrarles la puerta; qué es SEO técnico, visibilidad en IA o «21 señales». Sabe el síntoma que le contamos, no su costo, y no nos conoce |
| **B · Necesita sitio o rehacerlo.** Los 2 cierres ganados son Desarrollo web, por recomendación (`ventas/pipeline.md`) | Dueño o profesional, decide solo. Recomendación o anuncio | Que hoy también lo lee una máquina. Pregunta como dueño: qué edito solo, a nombre de quién quedan las cuentas, si puedo cambiar de técnico, cuánto cuesta al mes (24-sep) |
| **C · Sabe qué falta y busca quién lo sostenga** (Acompañamiento) | Gerente o encargado que tiene que convencer a otro | Qué se hace cada mes y qué significa cada línea de los planes; compara con su agencia |

Redes (CIRCUITO) llega al chequeo, no a la home: la bio apunta a `/diagnostico/`.

## 2 · La secuencia de venta

**Home:** (1) **la escena:** alguien que necesita lo que vendes pregunta (a Google, a ChatGPT, a un colega) y
mira tu sitio antes de escribirte; (2) **dónde se corta y qué cuesta:** la respuesta no te nombra o tu sitio
no contesta lo que se pregunta antes de elegir, y la consulta se va a otro; lo invertido antes (sitio, pauta,
artículos, recomendaciones) se pierde al final; (3) **qué cambia y cómo lo compruebas tú**, con el chequeo
antes y después; (4) **qué hacemos según tu situación:** los cuatro campos en palabras del dueño, el nombre
técnico después; (5) **por qué creernos:** solo lo comprobable (precios y método publicados, chequeo con
metodología, una persona con nombre, obra rotulada); (6) **qué haces ahora**, de menos a más: correr el
chequeo (segundos, gratis, sin correo) o pedir el mini-diagnóstico (a mano, una página, gratis, 24 horas).
El chequeo del hero pide antes del paso 1: se queda si su rótulo, nota y botón se explican solos.

**Acompañamiento:** sabes qué arreglar y no se ejecuta, o se vuelve a romper («Una auditoría no se ejecuta
sola», hoy al final) → lo que cuesta mientras espera → qué pasa cada mes, en tareas reconocibles → planes con
cada término explicado → compromiso de 3 meses que compruebas tú, salida con 30 días, trabajo junto a tu
agencia → pedir el diagnóstico o correr el chequeo.

**Trabajo:** qué vas a ver y por qué te sirve antes de contratar → por pieza: problema, lo construido, lo que
compruebas tú → por qué decimos qué es cliente, qué es nuestro y qué es concepto → Desarrollo web o el chequeo.

## 3 · Objeciones reales y dónde se responden

Las cinco primeras: `ventas/pipeline-reconstruido-2026-09-22.md`, fila entre paréntesis.

| Objeción, sin nombres | Dónde |
|---|---|
| «Ya estamos trabajando en esto con una empresa de marketing digital» (abogados, 25-ago; 6) | Home paso 4 · FAQ de Acompañamiento sobre la agencia |
| Canceló por «una emergencia con mis socios» y quedó en avisar (11-sep; 1) | Pedidos chicos a la vista, que se reenvían · el informe para gerencia |
| «Dame la próxima para conversar más tranquilos» (17-ago; 3) | Home paso 6: ninguna puerta pide reunión |
| Recibieron el diagnóstico y callaron (dos casos, ago; 4 y 5) | Home paso 2: el costo en sus términos |
| Pidió cotización en 24 minutos y calló ante tres planes (20-ago; 2) | Campo Desarrollo y cierre de Trabajo: el paso más chico primero |
| Qué edito solo, cuentas a mi nombre, costo mensual (cliente de Desarrollo web, 24-sep) | Trabajo (Combeau carga sus series solo) · campo Desarrollo |
| Esperables (`ventas/objeciones-y-perdidas.md`): marca nueva de una persona, «¿cómo sé que funciona?», «es caro», «¿por qué gratis?» | Home paso 5 · compromiso de 3 meses · qué incluye antes del precio · por qué el chequeo es gratis |

## 4 · El gancho

**Cualquier gancho:** en la primera pantalla, a 390 y 1440, el lector entiende quién pregunta, qué pasa y qué
pierde él. La palabra fuerte puede llegar después; el contexto no. Vale para A (quizás sin pauta) y B (quizás
sin sitio).

**El circuito** (manual §06b, Ramón, 1-sep) es el camino de un cliente nuevo hasta escribirte: necesita algo,
pregunta, la respuesta lo manda a tu sitio, tu sitio le da lo que necesita para elegirte, te escribe. **Se
corta en el último tramo, tu sitio, «justo donde se cobra»:** la máquina que responde no puede leerlo y no te
nombra, o la persona llega y no encuentra lo que pregunta. En el post del 1-sep el titular llegaba armado
(«Meta empuja. Google empuja…», `marketing/redes/2026-09-septiembre/01-mar-circuito-domino/publicar.md`); en
el sitio quedaron el ojillo y el h1 solos.

**Para que dure:** (1) en la pantalla del h1, quién pregunta, a quién y adónde llega; (2) que «pagar» alcance al
que no paga pauta (el sitio, los artículos, las recomendaciones) o que el ojillo hable de invertir para que te
encuentren; (3) retomarlo abajo con el mismo sentido (cada campo arregla un tramo), dos o tres veces en total;
(4) decir qué es una máquina que responde por tu rubro antes de «leerte, entenderte, citarte».

**Dos direcciones**, con el mismo orden, datos, pedidos, precios y nombres:
- **1 · El circuito, contado.** El circuito cose la home: la primera pantalla cuenta la escena y el h1 llega
  como consecuencia. Acompañamiento y Trabajo lo usan a lo más una vez.
- **2 · La pregunta de tu cliente.** Sin metáfora arriba: el h1 dice el problema en la escena del cliente, en
  llano; «circuito», una vez más abajo o ninguna. Mide si el circuito se gana su lugar.

## 5 · Alcance

**Entra:** todo el texto visible de `/v3/` (rótulo, nota y botón del chequeo, ojillo, h1, presentación,
campos, párrafo de «quién está detrás», entrada del blog), `/v3/servicios/acompanamiento-mensual/` y
`/v3/trabajo/`, ranura por ranura (hoja §9), con `e11/material.md`: una fila por hecho y su fuente. El resto
del sitio, cuando Ramón elija.

**No se hace:** precios, notación, nombres de servicio y de plan (iguales a `oferta-v3.json` y
`servicios-v3.json`; cifras de la hoja §1.11 idénticas) · el diseño (Taller o Pizarra limpia va aparte; mover
un bloque es nota para Lucía) · el chequeo (21 señales, metodología, resultado, `chq-*`) · R2 palabra por
palabra, R3, R4 (h2 «No te prometo. Te muestro.» y bio) y R7 · h1 de Acompañamiento y Trabajo, rótulos de
obra, menú y pie · ranuras de Simón, solo voz y con su veto (incluye el h1 de la home) · 36 → 73 → 100 fuera
de Trabajo (E9).

**Material real** (nada más entra): un estudio con años de artículos cuyo CDN respondía 403 a los buscadores
de ChatGPT, Perplexity y Claude mientras dejaba entrar a Google (SPL-DIAG-2026-006); las preguntas que ese
sitio no contestaba (cuánto cobran, cuánto demora, quién responde); un sitio con un error en vez de portada
por más de un mes (fila 2); ChatGPT dando tres agencias por nombre al pedirle un consultor SEO en Chile
(`test-menciones-ia.md`, 10-jul; repetir antes de citar) · Combeau ×2 (permiso del 30-sep), Verifica y
Cumple, Raigal rotulado, compromiso de 3 meses, precios y método publicados, Ramón con nombre y retrato.
**Testimonios y resultados de clientes: cero.**

## 6 · Criterios de aceptación

1. **Lector frío:** tres subagentes nuevos, uno por perfil, leen la primera pantalla a 390 y luego la página,
   y escriben qué hacemos, por qué les importa y qué harían. Pasa si, en cada ruta y dirección, las tres
   respuestas nombran la escena, el costo y uno de los dos pasos.
2. **El h1 con su contexto:** a 390×844 y 1440×900, sin scroll, una frase dice qué se corta (o el problema
   del h1), dónde y qué pierde el lector. Medido en el render.
3. **Si queda el circuito,** la primera pantalla nombra quién pregunta y adónde llega, y la home lo dice 2 o
   3 veces con el mismo sentido.
4. **Nada se da por sabido:** SEO técnico, visibilidad en IA, AEO/GEO, datos estructurados, rastreo,
   indexación, Core Web Vitals, keywords, robots, CDN, AI Overviews, share-of-voice, señales y citar se
   explican en palabras del dueño la primera vez en cada página, o no aparecen (en ranuras R2 o de Simón, al lado).
5. **Cada afirmación tiene fila en `material.md`** con archivo y línea o comando. Cero cifras sin fila.
6. **Cada pedido va después de lo que necesita** (§2), salvo el chequeo del hero.
7. **Cada objeción de §3 tiene respuesta** en su lugar, con la ranura anotada.
8. **Datos intactos:** diff 0 de precios y nombres contra los JSON; cifras de §1.11 y conteo de cadencia R2
   iguales antes y después.
9. **Reglas duras, por búsqueda:** 0 rayas, «acá», voseo, «usted», verbos de folleto, «¿Listo para…?»,
   prueba social (regex hoja §5a), promesas (`garantiz|primer lugar|te recomiend|aparecer en ChatGPT`) y
   dominios de `ventas/enviados/REGISTRO-enviados.csv`; singular solo para lo observado (hoja §1.2).
10. **Pluma, contada:** cada página abre en la situación del lector; párrafos de una a tres frases, ninguna de
    más de 35 palabras; a lo más dos remates por página que solo califican la frase anterior (tic 1); ningún
    párrafo que se anuncie con «X:» fuera de las listas (tic 2).
11. **Dos direcciones de verdad:** Javiera, en subagente limpio, dice en una frase en qué apuesta cada una;
    las dos completas en las tres rutas y sin mezclarse.

## 7 · Para Ramón, todo junto (con su supuesto, para que nada espere)

1. ¿Usamos nuestro propio Ads (104 clics, 0 contactos) como escena del costo? **Supuesto: no.**
2. ¿Entra a la home una cifra de las corridas (67 de 69, R7)? **Supuesto: no.**
3. El gancho le habla a quien tiene sitio, y los dos cierres vinieron de quien necesitaba uno. **Supuesto:** le
   habla a quien tiene un sitio que no le rinde (incluye al que lo rehace); el campo Desarrollo es la puerta de
   quien no tiene.
4. Si con el chequeo primero no cabe el contexto del h1 a 390, ¿el titular puede ir antes? **Supuesto: el orden
   queda;** Javiera lo mide y, si no cabe, te llega como decisión de composición.
5. R2 sigue abierta. **Supuesto: palabra por palabra;** si respondes antes, se aplica el anexo A de
   `e8/copy-secciones.md`.
