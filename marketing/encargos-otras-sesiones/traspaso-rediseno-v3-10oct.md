# Traspaso — rediseño v3 del sitio de SpindleLab

**Fecha:** 2026-10-10 · **De:** sesión cloud del rediseño v3 (se cierra con este documento)
**Para:** la sesión que continúa el trabajo
**Rama:** `claude/rebranding-webdev-exploracion` · 53 commits · todo subido · árbol limpio

---

## 0 · Lo primero, porque si se hace mal se pierde todo

**RAMA DESDE `claude/rebranding-webdev-exploracion`, NO DESDE `main`.**

El v3 entero vive solo en esta rama. Medido hoy:

| | |
|---|---|
| Archivos que la rama agrega sobre `main` | **111** nuevos, 7 modificados |
| Páginas v3 en `main` | **0** |
| Manual de marca en `main` | sigue en **v1.3**; la **v2.0** solo está en esta rama |
| Portafolio de piezas de concepto | solo en esta rama |

```bash
git fetch origin claude/rebranding-webdev-exploracion
git checkout -b <tu-rama> origin/claude/rebranding-webdev-exploracion
```

**No hay PR abierto para esta rama.** Los PR abiertos del repo son otros: el #41 (QA del
v2 antes de apuntar el dominio) y el #33 (presentación de marca, abierta desde el 3-sep).

**Sobre el #41, y va una corrección de esta misma sesión:** llegué a escribir que su rama
`claude/reposicion-sitio-v2-mejoras` no compartía ancestro con `main` y que el merge estaba
bloqueado. **Es falso.** Comprobado contra GitHub: la base común es `223fef2`, que está en el
historial de `main`, y el PR son **1 commit y 1 archivo, +61/-0**. Mi `git merge-base`
devolvió vacío porque la referencia no resolvía en ese momento, y al usar esa variable vacía
el `diff` comparó contra la nada y me devolvió la rama entera, de ahí el «141 archivos» que
también era falso. Lo real: es un PR de reporte, del **v2**, con cero archivos en `/v3/`, y
no pisa nada de acá.

---

## 1 · Qué es esto y en qué estado está

Rediseño completo del sitio propio, versión 3, tomando **driftime.com** como referencia.
Vive en `spindlelab-astro/src/pages/v3/` y **no está publicado**: `main` no lo contiene, el
deploy de Cloudflare Pages sale de `main`, y las páginas llevan `noindex, nofollow`.

Estado al cierre, comprobado hoy:

```
npm run build        27 páginas, sin error
npm run verificar    21 páginas revisadas, sin hallazgos
```

Las 15 plantillas de `src/pages/v3/`: `index`, `trabajo`, `metodo`, `nosotros`,
`contacto`, `diagnostico`, `servicios/index`, `servicios/[slug]`,
`servicios/desarrollo-web`, `blog/index`, `blog/[slug]`, más `a`, `b`, `c` y
`maqueta-inicial`, que son **maquetas internas de decisión** y no páginas del sitio.

### El giro que ordena todo

Ramón movió el eje del sitio **desde la visibilidad en IA hacia el desarrollo web**. Eso
es lo que explica casi todas las decisiones de la rama. El AEO deja de ser el producto y
pasa a ser la especificación del producto: *«El SEO técnico y el AEO van puestos desde el
primer commit, no parchados al final. Esa es la especificación del producto, no un
servicio aparte.»*

---

## 2 · Decisiones de Ramón, cerradas. No se reabren

Cuesta más reabrir una de éstas que cualquier trabajo pendiente del documento.

| Decisión | Cuándo | Nota |
|---|---|---|
| Titular del hero: **«El eje de tu negocio»** | 29-sep | elegido entre ocho candidatos, con jurado de tres criterios |
| La bajada del hero, **cuarta versión** | 30-sep | ver §5, tiene su propia historia |
| **Los titulares van en MAYÚSCULAS** | 29-sep | yo los bajé por error y él lo corrigió: *«no estoy en contra de que los títulos vayan en mayúscula, es sino que las frases sean más concisas»* |
| Tipografía **Manrope**, titulares y cuerpo | 29-sep | Gabarito queda reservada al wordmark |
| **Los precios no se tocan** | permanente | si algo se ve raro, se reporta, no se cambia |
| Las piezas de concepto **no se siguen trabajando** | 30-sep | *«si por los proyectos no nos gastemos»*; quedan para una revisión fina suya |
| El índice de trabajo lleva **cuatro piezas** | 30-sep | dos sitios de Bernardo, Verifica y Cumple, y **una sola** de concepto |
| El campo Desarrollo muestra **trabajo entregado** | 30-sep | dejó de mostrar piezas de concepto |

---

## 3 · Lo que quedó construido

- **Hero afirmativo** con el chequeo debajo. El formulario cambió de función: era la
  respuesta a una pregunta, ahora es la prueba de una afirmación. Está anotado en el
  archivo porque no se ve en el diff.
- **Índice de trabajo** en `/v3/trabajo/`, cuatro piezas rotuladas por lo que son, tres
  enlazando al sitio vivo.
- **Cuatro campos de color** a pantalla completa con pestañas de plan, y el color del
  campo viajando a su página interna.
- **Sistema de movimiento** medido en la referencia, en un solo componente
  (`MovimientoV3.astro`), con entrada, pestañas, video montado tarde y paralaje.
- **Menú overlay** a pantalla completa con las ocho páginas de primer nivel.
- **Barrido de verificación** propio (`npm run verificar`): contraste real renderizado,
  desborde a 390px, h1 por página, JSON-LD, `alt`, enlaces rotos.
- **Manual de marca v2.0**, reescrito sobre el sistema v3.
- **Tres piezas de concepto** en `marketing/portafolio/` (Raigal, Aplomo, Deslinde), cada
  una con su ficha y su bloqueo visual documentado.

---

## 4 · Cómo se trabaja en esta rama

Lo que más tiempo ahorra a quien retome.

**Medir, no describir.** Toda afirmación de diseño de esta rama está atada a un valor
medido. `npm run verificar` caza lo que la revisión a ojo no ve: encontró el pie del sitio
a 2,48:1 en todas las páginas, y dos casos de opacidades anidadas multiplicándose.

**Renderizar antes de dar algo por bueno.** Los defectos más caros de esta rama aparecieron
mirando el render, no el código: dos capturas del sitio de un cliente con las fotos rotas,
un rótulo que llamaba «pieza de concepto» a un sitio entregado, y el botón del chequeo
tapado por el aviso de cookies en teléfono.

**Contar las líneas con un Range.** `getClientRects()` sobre un bloque devuelve la caja del
bloque, no las líneas. Me hizo afirmar dos veces que un titular iba en una línea cuando
iba en dos.

**Comentar dentro del archivo, pero con `{/* */}`.** Esta rama documenta las decisiones en
los propios archivos. **Un `<!-- -->` en una plantilla Astro SE SIRVE**: el 16,2 % del HTML
de la home eran notas internas viajando al navegador. Se convirtieron 56 comentarios en 15
archivos.

**Verificar lo que otra sesión dice que hizo.** Es regla del repo y acá se pagó: heredé una
cifra («55 % del alto con marco de IA contra 31 % de desarrollo») que **no se reproduce**.
Dos métodos más dieron 45/13 y 32/56 sobre la misma página. La borré del archivo en vez de
dejarla como dato.

---

## 5 · La bajada del hero: cuatro intentos, y por qué importa

Es el caso que mejor enseña cómo escribir para este cliente, y está anotado entero en
`src/pages/v3/index.astro`.

1. **Muy larga.** Cinco líneas en escritorio, nueve en teléfono, y empujó el botón del
   chequeo debajo del aviso de cookies.
2. **«La redacción está muy extraña.»** Dos defectos concretos: «para que lleguen» no decía
   a dónde, y «la primera que lee» concordaba en femenino con un sustantivo que aparecía
   recién en la frase siguiente.
3. **Redundante.** «lleguen» y «lleva al mismo lugar» son el mismo movimiento dos veces.
4. **La que quedó.**

> Estás pagando para que lleguen a tu sitio. Pero el primero que llega es una máquina, y si
> no te puede leer, el camino se corta ahí. Diseñamos y construimos el sitio que esa
> máquina sí puede leer. Escribe tu dominio y te mostramos cómo está.

**La lección, y va en el archivo:** las cuatro veces escribí una paráfrasis de un texto de
Ramón **que ya estaba publicado y aprobado** (el post de Instagram del 1-sep, en el corpus
de voz), y cada paráfrasis rompió algo que el original tenía bien. **No reescribir de cero:
partir del corpus.**

---

## 6 · Pendientes confirmados

El barrido levantó **95** pendientes en cinco frentes. Cada uno pasó por un intento
de refutación antes de entrar acá: **44 sobrevivieron**, 1 se descartó por falso y
50 quedaron sin comprobar (§7).

### A · Decisiones que esperan a Ramón — 13

No se resuelven maquetando. Llevárselas juntas rinde más que una por una.

**[alto] El monitoreo quincenal de menciones en IA sigue prometido en el sitio y marcado como no entregable**
- *Dónde:* `spindlelab-astro/src/data/paginas-v3.json:26 y src/data/servicios-v3.json:370, 412, 423, 457, 480; la regla en /home/user/spindl…`
- *Paso:* Preguntarle a Ramón si la regla de no prometer monitoreo continuo cubre este caso acotado. Si cubre, hay que reescribir el paso 04 y los cinco textos, y el servicio mensual queda sin su entregable más concreto; si no cubre, anotar la excepción en la regla para que ninguna sesión futura lo borre.
- *La verificación corrigió esto:* El monitoreo quincenal de menciones en IA sigue prometido —y PUBLICADO— y la capacidad lo marca ❌. Dónde (v3, sin publicar): spindlelab-astro/src/data/paginas-v3.json:26 (paso «Monitoreo» del método) y :294; spindlelab-astro/src/data/oferta-v3.json:129; spindl…

**[alto] Acompañamiento Mensual a $590.000/mes contra el precedente propio de $50.000/mes**
- *Dónde:* `spindlelab-astro/src/data/oferta-v3.json:140 y marketing/exploracion-rebranding-webdev/recomendacion.md:97`
- *Paso:* Decisión de producto de Ramón, no de quien maqueta. Nadie debe cambiar la cifra en oferta-v3.json sin que él lo diga.
- *La verificación corrigió esto:* PENDIENTE (versión corregida para el traspaso) Qué falta: Acompañamiento Mensual a $590.000/mes contra el precedente propio de $50.000/mes de mantención. Decisión de producto de Ramón. Estado: decide-ramon. NO es un defecto de maqueta ni se arregla maquetando.…

**[medio] Los h1 del blog incumplen el límite de largo, y acortarlos es decisión de Ramón**
- *Dónde:* `marketing/brand/manual-de-marca.md §05 (la nota entre paréntesis de la escala) y spindlelab-astro/src/styles/prosa-v3.css:33-40`
- *Paso:* Llevarle a Ramón la lista de los 7 h1 con su largo y el costo SEO de cambiarlos (están atados al canonical y al JSON-LD de cada post), y decidir por bloque, no uno por uno. Dejar los 34 h2 como segunda tanda, que no tiene costo de canonical.
- *La verificación corrigió esto:* PENDIENTE (versión corregida, para el traspaso) Qué falta: los titulares del blog v3 incumplen el límite de largo del manual. Acortar los 7 h1 es decisión de Ramón; los h2 de dentro de los artículos son una segunda tanda sin ese costo. Dónde: · `marketing/bran…

**[medio] La mezcla de registro de /v3/nosotros/ espera a Ramón, y el hallazgo está medio desactualizado**
- *Dónde:* `spindlelab-astro/src/pages/v3/nosotros.astro:13-18`
- *Paso:* Llevarle a Ramón la frase exacta, una sola, con las dos opciones de redacción en singular, en vez de el reporte de dos frases que hoy dice el comentario.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, pero reescrito así (y NO como decisión de voz pendiente de Ramón): DEUDA DE COMENTARIO EN CÓDIGO: el aviso de voz de /v3/nosotros/ cita mal el manual y hay que borrarlo o reescribirlo, no escalarlo. Dónde: spindlelab-astro/src/pages/v3/nosot…

**[medio] Las fotos del índice del blog son una asignación editorial sin aprobar**
- *Dónde:* `spindlelab-astro/src/pages/v3/blog/index.astro:12-17 y el mapa `fotos` de las líneas 29-60`
- *Paso:* Mostrarle a Ramón el índice renderizado y preguntarle las dos cosas: si quiere fotos, y si estas siete son las correctas. Es una decisión de un minuto que hoy está tomada por omisión.
- *La verificación corrigió esto:* Qué falta: Las fotos del índice del blog son una asignación editorial sin aprobar Dónde: spindlelab-astro/src/pages/v3/blog/index.astro:13-17 (la advertencia) y el mapa `fotos` de las líneas 29-59 Cita: «⚠️ LAS IMÁGENES SON DECISIÓN EDITORIAL, NO DATO.» (línea…

**[medio] El titular de cierre del blog, en 8 páginas, es redacción no aprobada y el archivo lo dice**
- *Dónde:* `spindlelab-astro/src/pages/v3/blog/[slug].astro:177-185 y el bloque equivalente de blog/index.astro:171-180`
- *Paso:* Juntarlo con el pase de tono pendiente y mostrárselo a Ramón como pieza aparte: una sola decisión que cubre 8 páginas.
- *La verificación corrigió esto:* El pendiente es real y bien descrito en lo esencial; solo dos precisiones para el documento de traspaso. (a) LA REFERENCIA DE LÍNEA DE `blog/index.astro` ESTÁ CORRIDA. El pendiente dice «index.astro:171-180»; lo real es: sección navy en la línea 176, comentari…

**[medio] La bajada del hero no se puede acortar sin perder lo que sostiene el titular**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:145-148`
- *Paso:* Si aparece la presión de acortar el primer viewport (ver el punto del aviso de cookies), resolverla por maqueta y no por copy, y leer index.astro:112-148 completo antes de tocar una palabra de esa bajada.
- *La verificación corrigió esto:* ENTRA ASÍ (tres arreglos sobre lo levantado): · RANGO: index.astro:146-148, no 145-148. El bloque de contexto completo que hay que leer antes de tocar una palabra es 112-148. · ESTADO: no es "decide-ramon". Nada espera a Ramón. Él ya cerró las dos piezas: elig…

**[medio] Los titulares del blog incumplen el límite de largo del manual, y son más de los siete anotados**
- *Dónde:* `marketing/brand/manual-de-marca.md:154 y 272; medido sobre dist/v3/blog/`
- *Paso:* Llevarle a Ramón la lista medida (no solo los 7 h1) y decidir si se acortan, sabiendo que el h1 es el titular publicado, atado al canonical y al JSON-LD. Los h2 internos no tienen ese costo y podrían ir primero.
- *La verificación corrigió esto:* PENDIENTE (corregido, para el traspaso) Qué falta: Los titulares del v3 incumplen el límite de largo del manual. El manual lo anota solo para los 7 h1 del blog; el alcance real es mayor y además incluye páginas fuera del blog. Dónde: `marketing/brand/manual-de…

**[medio] Las tres piezas de concepto esperan la revisión fina de Ramón antes de usarse con un prospecto**
- *Dónde:* `marketing/portafolio/README.md:54-56 y las tres fichas (01-raigal/ficha.md:90, 02-aplomo/ficha.md:96, 03-deslinde/ficha.md:94)`
- *Paso:* Agendar la pasada de Ramón sobre las tres, empezando por Raigal porque es la única que hoy se muestra. No incorporar ni sacar ninguna sin él.
- *La verificación corrigió esto:* Las tres piezas de concepto siguen esperando la revisión fina de Ramón antes de usarse con un prospecto. Dónde está escrito, con la redacción real de cada archivo: · marketing/portafolio/01-raigal/ficha.md:90 — «- [ ] Revisión humana antes de usar esto con un …

**[bajo] El negro cálido #14110E, declarado extensión no aprobada y superada, sigue cableado quince veces en el v3**
- *Dónde:* `spindlelab-astro/src/styles/prosa-v3.css (14 usos: :57, :72, :84, :97, :104, :107, :113, :176, :193, :210, :260, :263, :267, :269) y src/styles/campos…`
- *Paso:* Preguntarle a Ramón si #14110E entra a la paleta o si estos quince usos pasan a noche/tinta, y en cualquiera de los dos casos convertirlo en token en vez de hex repetido, para que el próximo barrido lo pueda contar.
- *La verificación corrigió esto:* El hallazgo es correcto en lo esencial. Tres precisiones para que el traspaso no mande a la otra sesión a un callejón: A) EL TOKEN YA EXISTE; el paso no es «crearlo». `'tinta-galeria': '#14110E'` está en tailwind.config.mjs:34, vivo. El paso real es dejar de t…

**[bajo] Las «dos piezas de concepto más» quedaron cerradas por decisión, no por trabajo**
- *Dónde:* `marketing/exploracion-rebranding-webdev/auditoria-referencia-driftime.md:194 y lectura-estrategica-referencia.md:178`
- *Paso:* Registrar como cerrado. Si alguien quiere reabrirlo, es decisión de Ramón, no un pendiente de ejecución.
- *La verificación corrigió esto:* Está bien levantado; dos precisiones para que el traspaso no lleve nada inexacto, y un pendiente REAL y distinto que apareció al comprobar este. A) La cita es textual solo en auditoria-referencia-driftime.md:194. En lectura-estrategica-referencia.md:178 el tex…

**[bajo] La auditoría pide bajar los encabezados de artículo a caja baja y peso 500, contra la decisión de Ramón**
- *Dónde:* `marketing/exploracion-rebranding-webdev/auditoria-referencia-driftime.md:195 y spindlelab-astro/src/styles…`
- *Paso:* No ejecutarlo. Si se vuelve a proponer, es una decisión de Ramón sobre una regla que él ya cerró.
- *La verificación corrigió esto:* Entra al traspaso así, con el estado cambiado de «decide-ramon» a «cerrado por decisión — no ejecutar», y reencuadrado como aviso documental: Qué falta (lo real): nada que ejecutar en el CSS. Lo que falta es que la auditoría quedó sin anotar: el punto 5 de «§8…

**[bajo] El video salió de la home y el dato todavía lo apunta: decisión anotada como reversible**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:535 y src/data/oferta-v3.json:18`
- *Paso:* Que Ramón mire la home sin video y confirme. Si se confirma, limpiar el campo de dato muerto; si no, decidir dónde vuelve sin romper la regla de un servicio por pantalla.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, con esta redacción corregida: Qué falta: El video salió de la home y quedó dato muerto apuntándolo. Decisión anotada como reversible, esperando que Ramón mire la home sin video. Dónde: spindlelab-astro/src/pages/v3/index.astro:536-539 (la no…

### B · Trabajo pendiente — 18

Se puede hacer sin preguntar, con el criterio ya fijado en la rama.

**[alto] Los estilos del resultado del chequeo nunca se adaptaron al v3, y hoy renderizan con la jerarquía colapsada**
- *Dónde:* `spindlelab-astro/src/styles/chequeo-v3.css:1-4 y src/pages/v3/diagnostico.astro:13-14`
- *Paso:* Decidir una de dos: definir los cinco tokens que faltan en el ámbito del v3 con valores medidos sobre el lienzo negro, o reescribir chequeo-v3.css en el lenguaje v3 (crema por campo, .filete, .rotulo). Verificar inyectando el markup del script en #chq-out, porque el barrido no lo alcanza.
- *La verificación corrigió esto:* PENDIENTE (versión corregida para el traspaso) Qué falta: Los estilos del resultado del chequeo nunca se adaptaron al v3. Cinco tokens que el CSS usa no existen en el ámbito v3, así que el resultado renderiza con la jerarquía de tinta colapsada y sin ninguno d…

**[alto] /v3/trabajo/ es la única página del v3 sin noindex**
- *Dónde:* `spindlelab-astro/src/pages/v3/trabajo.astro (no hay <meta name="robots">; las otras 14 lo llevan)`
- *Paso:* Agregar el mismo Fragment slot="head" con noindex, nofollow que usa trabajo.astro como hermana más cercana (diagnostico.astro:57-61), y de paso dejar escrito en el archivo por qué lo lleva, para que no se vuelva a perder al copiar la plantilla.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, pero como PENDIENTE CERRADO EN LA RAMA AVANZADA, no como trabajo por hacer. Redacción correcta: «/v3/trabajo/ sin noindex — real en claude/rebranding-webdev-exploracion, YA ARREGLADO en origin/claude/magical-franklin-ckfki2. No hay nada que …

**[alto] El encargo de los h1 de bernardocombeau.cl está abierto, y lo comprobé hoy contra el sitio vivo**
- *Dónde:* `marketing/encargos-otras-sesiones/encargo-h1-sitio-bernardo-10oct.md (commit 49b6a93, el más nuevo de la rama)`
- *Paso:* Pasarle el encargo a la sesión de rvalleespin/bernardo-combeau y no cerrarlo con el commit: cerrarlo con el bucle de curl que el propio documento trae, que las ocho rutas digan h1=1. Mientras no esté, considerar si el índice de trabajo del v3 puede publicarse enlazando a ese sitio.
- *La verificación corrigió esto:* El pendiente es real y está bien levantado; lo que hay que corregir es el CRITERIO DE CIERRE del paso, que como está redactado da por arreglado algo que no lo está. «Pasarle el encargo a la sesión de rvalleespin/bernardo-combeau y no cerrarlo con el commit: ce…

**[alto] El índice de trabajo promete piezas de concepto que Ramón ya decidió no seguir**
- *Dónde:* `spindlelab-astro/src/pages/v3/trabajo.astro:134-137`
- *Paso:* Reescribir ese párrafo para que no prometa producción en curso (p. ej. decir qué hay y que el chequeo corre igual sobre cualquier sitio), y actualizar el comentario de arriba a una pieza de concepto, no dos.
- *La verificación corrigió esto:* El hallazgo es real, pero su justificación atribuye el cambio al commit equivocado. Versión correcta para el traspaso: QUÉ FALTA: El índice de trabajo (/v3/trabajo/) promete en presente producción de piezas de concepto que Ramón ya decidió detener, y el coment…

**[alto] El sitio de Bernardo sigue con siete páginas sin h1 y el titular de portada pegado**
- *Dónde:* `marketing/encargos-otras-sesiones/encargo-h1-sitio-bernardo-10oct.md:21 (el sitio vive en rvalleespin/bernardo-combeau)`
- *Paso:* Entregar el encargo a la sesión que mantiene rvalleespin/bernardo-combeau y volver a correr el bucle de comprobación que el propio encargo trae al final.
- *La verificación corrigió esto:* Tres correcciones al encargo, todas comprobadas sobre el código fuente (cloné rvalleespin/bernardo-combeau en lectura; es público). 1) EL ARREGLO DEL DEFECTO 1 NO SE PUEDE APLICAR COMO ESTÁ ESCRITO, Y UN ARREGLO EN EL DATO NO AGUANTA. El encargo propone editar…

**[alto] El v3 está terminado pero no tiene ruta de publicación: noindex, títulos de maqueta y prefijo /v3/**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:67-68, y 24 de las 25 páginas de dist/v3/ con meta robots noindex`
- *Paso:* Con el visto bueno de Ramón, definir la operación de corte (rutas en la raíz contra prefijo) y recién entonces tocar metas y sitemap. El manual advierte que hasta ese momento el sitio vivo corre con el sistema anterior y no hay que corregirlo contra el manual nuevo.
- *La verificación corrigió esto:* ENTRA, pero corrigiendo «títulos de maqueta» en plural: es el punto más engañoso del pendiente y haría perder tiempo. Solo 5 de las 25 páginas tienen título de maqueta, y hay que verlas como dos cosas distintas, no como «20 títulos por escribir»: · src/pages/v…

**[alto] La auditoría cita un titular de hero que Ramón ya descartó, y nombra «motor»**
- *Dónde:* `marketing/exploracion-rebranding-webdev/auditoria-referencia-driftime.md:188`
- *Paso:* Corregir esa línea del documento o marcarla como superada antes de que alguien la tome como mandato. La decisión no se reabre.
- *La verificación corrigió esto:* Qué falta: El §8 del documento de auditoría da por «en curso» un hero que ya está hecho, y deja escrita como dirección cerrada una frase de posicionamiento que nunca fue el titular. Dónde: /home/user/spindlelab/marketing/exploracion-rebranding-webdev/auditoria…

**[medio] El copy del v3 nunca pasó por Renata; solo el hero tiene aprobación**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:16-17 y marketing/encargos-otras-sesiones/brief-textos-estructura-sitio-v3.md:74-75`
- *Paso:* Pasar el copy del v3 (home más internas) por la skill de voz o por Renata antes de cualquier publicación, marcando aparte las piezas que Ramón ya cerró para que no se reescriban.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, con esta redacción. Qué falta: El copy del v3 nunca pasó por Renata ni por la skill de voz. La condición está escrita en el brief del que sale toda la rama y parafraseada en el encabezado de la home, y nunca se levantó en ninguno de los dos.…

**[medio] El chequeo de largo de titular existe, el manual lo cita, y nada lo ejecuta**
- *Dónde:* `spindlelab-astro/src/utils/caja.ts:23-28 (esLargo) frente a caja.ts:31-33`
- *Paso:* Decidir si esLargo se usa de verdad (llamarlo desde caja() y avisar en consola al construir, o sumarlo a scripts/verificar.mjs, que ya barre los encabezados del dist) o si se borra y se corrige el manual. Hoy es una red de seguridad que no está puesta.
- *La verificación corrigió esto:* PENDIENTE (versión corregida, lista para el traspaso) Qué falta: El chequeo de largo de titular existe y el manual lo cita como control vigente, pero nada lo ejecuta. Es una red de seguridad que no está puesta. Dónde: spindlelab-astro/src/utils/caja.ts:23-28 (…

**[medio] El comentario que frena el enlace de «Verifica y Cumple» quedó viejo: la URL ya está en el repo**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:672-673, contra src/data/obra-v3.json:40`
- *Paso:* Poner el enlace tomando la URL de obra-v3.json (no escribirla a mano, por lo mismo que los precios viven en un dato compartido) y borrar el comentario. Si la URL de pages.dev no es la definitiva, eso es lo que hay que confirmar con Ramón, no la existencia del dato.
- *La verificación corrigió esto:* PENDIENTE (versión corregida). El comentario que frena el enlace de «Verifica y Cumple» quedó viejo — y la URL que está en el repo tampoco es la definitiva. Dónde: `spindlelab-astro/src/pages/v3/index.astro:672-673` (el comentario), contra `spindlelab-astro/sr…

**[medio] La home sigue con doce secciones contra las ocho de la referencia**
- *Dónde:* `marketing/exploracion-rebranding-webdev/auditoria-referencia-driftime.md:190; medido en /v3/ (11.313 px, 12 secciones)`
- *Paso:* Decidir con Ramón qué dos o tres bloques bajan a páginas internas (la auditoría propone las tres cosas y las herramientas gratis) antes de publicar, porque después mover secciones cambia URLs y anclas.
- *La verificación corrigió esto:* El hallazgo es real y el paso es correcto. Lo que está mal descrito es el «Por qué» y la línea. Versión corregida: Dónde: …/auditoria-referencia-driftime.md:189-190 (el ítem arranca en 189, no en 190); medido en /v3/ a 1440 px: 11.313 px y 12 secciones de prim…

**[medio] El índice de trabajo promete piezas de concepto que Ramón pidió no seguir haciendo**
- *Dónde:* `spindlelab-astro/src/pages/v3/trabajo.astro:135`
- *Paso:* Reescribir ese párrafo para que explique el estado real sin prometer cadencia, y mantener el cierre del chequeo que sí funciona.
- *La verificación corrigió esto:* Está bien levantado; corrijo dos cosas de la descripción para que la otra sesión no pierda tiempo. QUÉ FALTA (versión corregida): «/v3/trabajo/ cierra con una promesa de cadencia que contradice la instrucción vigente: trabajo.astro:135 dice en presente continu…

**[medio] El giro no está canonizado en el brief ni en la ficha de cliente, y los documentos citados en el encargo no existen**
- *Dónde:* `marketing/exploracion-rebranding-webdev/comparacion-mensaje-giro-29sep.md:131; marketing/encargos-otras-se…`
- *Paso:* La troncal tiene que bajar el giro a la ficha de cliente y al brief, o decir que ese trabajo nunca existió. Hasta entonces, cualquier sesión que lea el brief va a construir contra la tesis vieja.
- *La verificación corrigió esto:* El pendiente es real y está bien descrito en lo esencial. Tres precisiones para que la otra sesión no pierda tiempo: (a) ORDEN DEL PASO — hay que descartar primero lo barato. El paso propuesto («bajar el giro, o decir que ese trabajo nunca existió») omite la t…

**[medio] La retrospectiva de los 90 días, que era condición previa al rediseño, nunca se hizo**
- *Dónde:* `marketing/plan-operativo-90-dias.md:159-163`
- *Paso:* Correr el test de menciones del mes 3 y la retrospectiva, aunque sea tarde, para que las decisiones del trimestre 2 no se tomen a ciegas.
- *La verificación corrigió esto:* Qué falta: El ciclo del plan de 90 días venció el 5-oct sin cierre formal. Quedan abiertas las cuatro casillas de la Semana 13 (29 sep-5 oct), y en particular: (a) el test de menciones IA, que no se corre desde el 25-ago (faltan Mes 2 y Mes 3, ambos con la sec…

**[medio] recomendacion.md recomienda no adoptar el rediseño y describe archivos que ya no existen así**
- *Dónde:* `marketing/exploracion-rebranding-webdev/recomendacion.md:112, 20-21, 71-73`
- *Paso:* Leerlo como registro histórico, no como recomendación vigente. Lo único de ahí que sigue abierto son las dos observaciones comerciales (retainer y vigilancia en IA), que van en sus propios puntos de esta lista.
- *La verificación corrigió esto:* recomendacion.md (27-sep) quedó como registro histórico y NO debe leerse como estado actual, pero no lleva ningún aviso que lo diga. Dónde: /home/user/spindlelab/marketing/exploracion-rebranding-webdev/recomendacion.md Qué quedó viejo, exactamente: · Línea 112…

**[medio] tres-direcciones.md pide elegir dirección y dice que no hay obra ni permiso**
- *Dónde:* `marketing/exploracion-rebranding-webdev/tres-direcciones.md:36-40 y 139-142`
- *Paso:* Marcarlo como cerrado salvo la pregunta de la paleta, que va en su propio punto.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, con esta redacción (la del pendiente original afirma de más en dos puntos y de menos en dos). Qué falta: `tres-direcciones.md` quedó viejo y hoy afirma datos falsos sobre el portafolio, pero NO se puede cerrar completo: guarda dos cosas viva…

**[medio] comparacion-mensaje-giro-29sep.md afirma que el hero sigue siendo la pregunta sobre la IA**
- *Dónde:* `marketing/exploracion-rebranding-webdev/comparacion-mensaje-giro-29sep.md:102`
- *Paso:* Corregir esa línea o fechar el documento como foto del 29-sep antes del cambio de hero.
- *La verificación corrigió esto:* Reemplazar la línea 102-103 de `marketing/exploracion-rebranding-webdev/comparacion-mensaje-giro-29sep.md` por un bullet que mueva el hero de «Lo que NO cambió» a lo que sí cambió, dejando en pie la parte que sigue siendo cierta: «- **El hero cambió el mismo 2…

**[medio] La auditoría dice que el índice de trabajo no existe, y existe desde el 30-sep**
- *Dónde:* `marketing/exploracion-rebranding-webdev/auditoria-referencia-driftime.md:192`
- *Paso:* Tachar el punto 3 del §8 y, si se quiere seguir la referencia, el trabajo restante es clasificar por rubro con más piezas, no crear la página.
- *La verificación corrigió esto:* VERSIÓN CORRECTA PARA EL TRASPASO Qué es: deuda de documentación, no de producto. El §8 de auditoria-referencia-driftime.md (/home/user/spindlelab/marketing/exploracion-rebranding-webdev/auditoria-referencia-driftime.md) quedó congelado el 29-sep 19:34 y nunca…

### C · Defectos conocidos y no arreglados — 11

Están medidos. Ninguno bloquea el build ni la verificación.

**[alto] La tira de obra de la home presenta Raigal junto a clientes reales sin decir que es concepto**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:207-238 (tira armada en la línea 54 desde obra-v3.json)`
- *Paso:* O sacar Raigal de la tira de la home (la tira pasa a tres piezas reales), o llevar el campo `tipo` al renglón de rótulos igual que hace trabajo.astro con su mapa ROTULO. No inventar un rótulo nuevo: el dato ya está en obra-v3.json.
- *La verificación corrigió esto:* La tira de obra de la home presenta Raigal junto a clientes reales sin rotularla como concepto en ningún texto visible. Dónde: spindlelab-astro/src/pages/v3/index.astro:207-237 (la tira se arma en index.astro:55 desde src/data/obra-v3.json; el renglón de rótul…

**[alto] Dos puntos dorados por vista, contra la regla que el propio código dice estar cumpliendo**
- *Dónde:* `spindlelab-astro/src/components/v3/FooterV3.astro:23 y NavV3.astro:45; las afirmaciones en index.astro:25 y NavV3.astro:21`
- *Paso:* Quitar el dorado del wordmark del pie (FooterV3.astro:23, dejar el punto en papel) o quitarlo de la nav, y corregir las dos afirmaciones. Captura del caso en /tmp/claude-0/-home-user-spindlelab/9b00318c-db4a-51e8-a510-7a1cdb474134/scratchpad/pie-dos-dorados.png.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, pero como CONTRADICCIÓN DEL MANUAL PENDIENTE DE RAMÓN, no como defecto con arreglo obvio. Versión corregida: Qué falta: El código afirma en tres lugares que hay un solo dorado por vista, y hay dos. No es un bug de implementación: es un choqu…

**[medio] El aviso de cookies tapa el botón del chequeo, y la condición escrita está mal medida**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:150-154`
- *Paso:* Volver a medir el solape por ALTO de viewport, no por ancho, y decidir con ese dato: o el aviso de cookies deja de ser fixed al pie en el primer viewport, o el bloque del chequeo reserva el alto del aviso. Y corregir la afirmación del comentario, que hoy manda a dar por libre un caso que no lo está.
- *La verificación corrigió esto:* Es real, pero está mal descrito en su segunda frase. La versión correcta del comentario (spindlelab-astro/src/pages/v3/index.astro:149-154) sería: /* EL AIRE DE ARRIBA ES 96px EN MÓVIL Y NO PUEDE BAJAR. La cabecera fija termina en el píxel 86, así que con pt-2…

**[medio] En la tira de obra del hero, la pieza de concepto aparece sin rótulo junto a tres trabajos reales**
- *Dónde:* `spindlelab-astro/src/pages/v3/index.astro:231`
- *Paso:* Rotular la pieza de concepto en la tira del hero (o sacarla de la tira y dejarla solo en el índice, donde está rotulada). Es una línea de maqueta, no una decisión de producto.
- *La verificación corrigió esto:* VERSIÓN CORRECTA DEL PENDIENTE Título: La pieza de concepto va sin rótulo legible en la tira de obra de la home. Dónde: /home/user/spindlelab/spindlelab-astro/src/pages/v3/index.astro:231 (el pie de nombres) y :55 (donde se arma `tira` y se pierde el dato `tip…

**[medio] /privacidad/ tiene dos h1 y tres nodos bajo contraste AA, y el v3 enlaza ahí**
- *Dónde:* `spindlelab-astro/dist/privacidad/index.html, enlazada desde src/consts-v3.ts:28 y src/pages/v3/contacto.astro:167`
- *Paso:* Arreglar el segundo h1 (pasarlo a h2) y los dos grises, o crear /v3/privacidad/ si el corte va a ser total. Cualquiera de las dos cierra también el enlace mixto del pie.
- *La verificación corrigió esto:* Qué falta: /privacidad/ tiene dos h1 y dos nodos bajo contraste AA; además la home tiene un tercer nodo bajo AA. Todas las páginas v3 enlazan a esa página vieja. Dónde: /home/user/spindlelab/spindlelab-astro/public/privacidad/index.html (NO dist/, que es salid…

**[bajo] El pendiente de llevar los cambios de tipografía al manual YA está hecho: el comentario manda a trabajo que no existe**
- *Dónde:* `spindlelab-astro/tailwind.config.mjs:88-90`
- *Paso:* Borrar las dos líneas del comentario. Cuesta nada y ahorra una búsqueda en falso.
- *La verificación corrigió esto:* VERSIÓN CORREGIDA PARA EL DOCUMENTO DE TRASPASO Qué falta: Nada — pero hay que BORRAR el aviso. El comentario de tipografía del tailwind.config quedó dos días atrás del manual y hoy afirma tres cosas falsas, entre ellas un pendiente ya saldado y una carpeta qu…

**[bajo] El menú pasó de siete filas a ocho y la escalera de entrada se quedó en seis**
- *Dónde:* `spindlelab-astro/src/components/v3/NavV3.astro:24 y :26-35, contra el <style> de las líneas 131-157`
- *Paso:* Agregar los delays de paso 0 y 7 (o generarlos desde el índice en vez de a mano) y corregir el conteo en los dos comentarios, dejando anotado que la medida que importa es el alto de viewport, no la cantidad de filas.
- *La verificación corrigió esto:* Tres partes de la descripción están mal y hay que reemplazarlas. El defecto de fondo es real. A) «la escalera arranca y remata en falso» — SOLO LA MITAD ES CIERTA. Paso 0 en 0s es el comportamiento CORRECTO: la primera fila de una escalera no lleva retardo. El…

**[bajo] prosa-v3.css guarda quince líneas de una nota superada que dicen lo contrario del CSS que tienen debajo**
- *Dónde:* `spindlelab-astro/src/styles/prosa-v3.css:41-55, contra las reglas de :56-62 y :69-75`
- *Paso:* Borrar las líneas 41-55 o moverlas a un registro de decisiones fuera del CSS. La parte que sí hay que conservar es el pendiente de copy de las líneas 33-40, que está vivo.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, con el paso corregido y con una advertencia explícita. Descripción correcta del defecto: prosa-v3.css arrastra una nota superada en las líneas 41-55 que contradice, con datos medidos y una cita de Ramón («grosero»), el CSS que tiene inmediat…

**[bajo] Dos comentarios cuentan «catorce páginas del v3»; son veintiuna**
- *Dónde:* `spindlelab-astro/src/components/v3/FooterV3.astro:14-15 y src/components/v3/MovimientoV3.astro:5-9`
- *Paso:* Actualizar el número en los dos comentarios al corregir cualquier otra cosa de esos archivos.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, con esta descripción corregida: Qué falta: Dos comentarios dicen «catorce páginas del v3»; hoy son 21 Dónde: spindlelab-astro/src/components/v3/FooterV3.astro:14-15 y spindlelab-astro/src/components/v3/MovimientoV3.astro:8-9 Cita: Movimiento…

**[bajo] paginas-v3.json arrastra una clave que ningún template lee, y la propia nota lo avisa**
- *Dónde:* `spindlelab-astro/src/data/paginas-v3.json:274`
- *Paso:* Nada urgente. Si se limpia el dato, conservar el aviso en el archivo que sí manda (src/pages/v3/servicios/index.astro).
- *La verificación corrigió esto:* No está mal descrito, pero esta versión es más exacta y evita que la otra sesión lo trate como un bug a cerrar: `spindlelab-astro/src/data/paginas-v3.json` arrastra la clave `servicios` completa (líneas 273 en adelante: title, description, h1, lead, secciones,…

**[bajo] Quedaron dos imágenes de obra huérfanas de las piezas de concepto que se detuvieron**
- *Dónde:* `spindlelab-astro/public/assets/img/obra/aplomo.jpg y raigal.jpg (ambas también copiadas a dist/)`
- *Paso:* Borrarlas al limpiar antes de publicar, y corregir de paso la referencia a la rama en index.astro:548-549, que apunta afuera cuando las fichas ya están acá.
- *La verificación corrigió esto:* ENTRA AL TRASPASO, con esta redacción corregida. Qué falta: dos imágenes huérfanas en public/, resto de cuando la tira de obra llevaba dos piezas de concepto, más un comentario de código que quedó viejo junto a ellas. Dónde: · spindlelab-astro/public/assets/im…

### D · Afirmaciones del repo que nadie comprobó — 2

Escritas como hechos sin respaldo. El riesgo es que alguien las dé por buenas.

**[alto] El permiso de caso público de Bernardo no tiene evidencia y el documento de ventas lo niega**
- *Dónde:* `ventas/proyectos-en-curso.md:16 contra marketing/portafolio/README.md:10`
- *Paso:* Pedirle a Ramón la evidencia del permiso (correo o mensaje) y, con ella, actualizar ventas/proyectos-en-curso.md. Si no aparece, bajar las cuatro piezas de cliente del índice antes de cualquier publicación.
- *La verificación corrigió esto:* Versión corregida para el documento de traspaso: **El permiso de caso público de Bernardo no tiene ningún respaldo, y el documento troncal de ventas lo sigue negando hoy.** Dónde: `ventas/proyectos-en-curso.md:16` («Sigue pendiente pedir permiso de caso públic…

**[medio] La prueba de los 20 abogados con el gancho de Desarrollo Web no tiene registro de haberse corrido**
- *Dónde:* `marketing/exploracion-rebranding-webdev/recomendacion.md:138 y marketing/encargos-otras-sesiones/estrategi…`
- *Paso:* Preguntar a la sesión de outbound o a Ramón si se envió algo con el gancho de Desarrollo Web. Si no, correrlo ahora: el sitio nuevo no reemplaza la prueba.
- *La verificación corrigió esto:* PENDIENTE — La prueba del gancho de Desarrollo Web nunca se corrió ni se cerró Qué falta: la prueba que `marketing/exploracion-rebranding-webdev/recomendacion.md:138` proponía — «**Correr la prueba de los 20 abogados** con el gancho de Desarrollo Web. Costo ce…


## 7 · Levantados y sin comprobar

El barrido se cortó con 50 hallazgos en cola de verificación. **No son hechos: son pistas.**
Quien retome debería comprobarlos antes de actuar, igual que se hizo con los de §6,
donde uno de cada tres cayó al verificarlo.

**codigo** — 1

- `[alto]` El defecto de copy «Sí.» bajo «¿Cuánto cuesta?» sigue vivo en el sitio que se despliega y en main

**coherencia** — 13

- `[alto]` «Eje» tiene cuatro referentes distintos en páginas servidas del v3
- `[alto]` «El sitio es el eje.» cierra 8 páginas del blog a tamaño display y Ramón nunca lo aprobó
- `[alto]` El cuerpo de la home no acompañó al hero: los dos bloques que arrastran el marco, medidos
- `[alto]` Tres textos servidos siguen suponiendo el hero viejo, que preguntaba
- `[alto]` «Chequeo» nombra dos productos distintos, y en /v3/nosotros/ el de 24 horas cuelga del botón del de 30 segundos
- `[medio]` El hero nombra la puerta «leer» y el bloque que la prueba mide «citar»; el puente se cortó
- `[medio]` nosotros.astro: dos referentes de «eje» en un párrafo, y la mezcla de voz anotada y no resuelta
- `[medio]` Los dos «eje» de paginas-v3.json no se sirven en el v3, pero sí están vivos en producción
- `[medio]` /v3/diagnostico/ se llama de tres maneras distintas dentro del mismo sitio
- `[medio]` El title y la description de la home siguen siendo texto interno de maqueta
- `[medio]` La tarjeta de Verifica y Cumple ofrece una herramienta sin manera de llegar a ella
- `[bajo]` /v3/trabajo/ es la única página del v3 sin noindex
- `[bajo]` «Una de las cuatro piezas del motor de adquisición»: la cuenta no cuadra con nada del v3

**documentos** — 7

- `[bajo]` nota-titulares-v3.md declara cero titulares sobre 40 caracteres, y hoy hay 28
- `[bajo]` /v3/trabajo/ es la única de las 25 páginas v3 sin noindex
- `[bajo]` #14110E sigue en el manual y en el CSS sin que nadie lo aprobara
- `[bajo]` Campos brasa y ciruela y el radio único de 6px están aplicados sin aprobación explícita
- `[bajo]` Tres radios de 8px contra la regla de un radio único de 6px
- `[bajo]` Las piezas de concepto no tienen páginas internas y la fotografía está bloqueada por el plan de Higgsfield
- `[bajo]` El titular de cierre de las ocho páginas del blog lo redactó la sesión, no Ramón

**medido** — 14

- `[alto]` El botón del chequeo también queda tapado a 360px y 375px; la nota escrita afirma que desde 360px está libre
- `[alto]` /v3/trabajo/ es la única de las 21 páginas sin noindex
- `[alto]` /v3/trabajo/ se renderiza entera en Inter, no en Manrope
- `[alto]` El título y la descripción de la home del v3 siguen siendo los de una maqueta interna
- `[alto]` Publicar el v3 exige quitar noindex en 20 páginas y reescribir 21 canonical: hoy no hay lista de ese cambio
- `[alto]` /privacidad/ no tiene versión v3, recibe 43 enlaces desde el v3 y falla la verificación
- `[medio]` La tarjeta «Verifica y Cumple» de la home sigue sin enlace porque la URL «no está confirmada», pero la URL ya está en el repo y re…
- `[medio]` El texto del índice de trabajo promete piezas de concepto por rubro, que es justo lo que Ramón pausó
- `[medio]` /v3/trabajo/ no aparece en el pie, que está en las 21 páginas
- `[medio]` /v3/blog/ pesa 1,50 MB, tres veces y media la mediana, por servir 7 imágenes al doble de su tamaño
- `[medio]` Las cuatro maquetas internas se construyen en dist/ y se publicarían con el sitio
- `[medio]` 3,55 MB en public/ que no referencia nadie y se publican igual
- `[bajo]` Tres comentarios del repo afirman cosas que el build desmiente
- `[bajo]` Inter se descarga en las 21 páginas (48 KB) para pintar 148 caracteres, y Gabarito viaja duplicada en dos rutas

**review** — 15

- `[alto]` «Eje» —la palabra del h1 que eligió Ramón— tiene tres referentes que se excluyen, y el sitio en producción dice que el eje es el S…
- `[alto]` Entre la tira de obra y la palabra DESARROLLO hay 2.263 px seguidos sin un solo marcador de desarrollo: dos pantallas y media de I…
- `[medio]` «Leer, entender, citar.» es el mayor bloque de marco IA de la home (1.270 px) y el hero nuevo ya no lo presenta
- `[medio]` El cierre de la home (1.056 px) vende un puntaje, no un sitio
- `[medio]` min-height:100svh le da al pilar del negocio exactamente el mismo alto que al servicio más chico: 900 px cada uno
- `[medio]` El resultado del chequeo contesta tres preguntas que la página todavía no ha hecho cuando el visitante aprieta el botón
- `[medio]` La bajada de /v3/servicios/desarrollo-web/ dice casi lo mismo que el hero, y el hero quedó en singular contra 21 páginas en plural
- `[medio]` /v3/nosotros/ usa «eje» dos veces en una sola frase, con dos referentes y ninguno es el del hero
- `[medio]` El titular que cierra las 8 páginas del blog lo escribió el agente, no Ramón, y está anotado como pendiente de su revisión
- `[medio]` El JSON-LD del sitio EN PRODUCCIÓN deja Desarrollo Web en último lugar, al revés del orden que la propia página muestra
- `[bajo]` El jobTitle de Ramón en el grafo del sitio en producción no menciona el oficio
- `[bajo]` El h1 va en dos líneas en todo ancho de teléfono y en la banda 768-859; el clamp no se tocó y el comentario pasó a declararlo acep…
- `[bajo]` A 320px de ancho el aviso de cookies todavía tapa el botón del chequeo, y queda asumido por escrito
- `[bajo]` No queda ningún instrumento para decir si el eje de la página se movió: el porcentaje se retiró y nada lo reemplazó
- `[bajo]` Queda anotada y sin resolver una objeción al titular elegido: se sostiene en la bajada, y la bajada ya se acortó tres veces

---

## 8 · Lo que NO es pendiente, para que nadie lo persiga

- **Las skills no repiten las reglas viejas del manual.** Lo anoté como pendiente y lo
  verifiqué al cerrar: cero menciones de Gabarito, Manrope o del dorado en `.claude/skills/`.
  Queda cerrado.
- **El permiso de caso público de Bernardo está dado y ya está registrado.** Ramón lo
  confirmó el 30-sep y `ventas/proyectos-en-curso.md` quedó actualizado el 10-oct: hasta
  ese día el documento decía lo contrario y la contradicción estuvo a punto de frenar el
  caso. **La confirmación es verbal, en sesión, sin correo archivado**, y así queda anotado
  en el registro. El permiso no está en duda; si alguna vez hace falta el respaldo escrito,
  hay que pedírselo a Bernardo.
- **Verifica y Cumple tiene URL pública**: `verificaycumple.pages.dev`. Ojo que
  **`verificaycumple.cl` NO resuelve** (el gateway devuelve 502).

---

## 9 · Encargo abierto que no es de este repo

`marketing/encargos-otras-sesiones/encargo-h1-sitio-bernardo-10oct.md`

Recapturando el sitio de Bernardo para el índice de trabajo aparecieron defectos **en su
sitio vivo**, no en nuestro portafolio: **siete de once rutas sin `<h1>`**, y la de la
portada se lee «Se construye**dirigiendo**». Su sitio vive en `rvalleespin/bernardo-combeau`,
fuera del alcance de esta sesión, así que va como encargo.

**El encargo se corrigió el mismo día y vale leer su §0.** La primera versión se escribió
midiendo solo el HTML servido, sin leer el código, y tenía tres errores: el `<h1>` de la
portada no existe como marcado (el titular es un dato que **Bernardo edita desde su panel**,
así que arreglar el dato se revierte solo), las seis interiores **no comparten plantilla**
(son seis ediciones más una de CSS), y el denominador era ocho rutas cuando son once.

Importa más de lo que parece: es el sitio del único caso de desarrollo web que la casa puede
mostrar, y el defecto es exactamente lo que SpindleLab vende que no hay que tener.

---

## 10 · Cómo se armó esta lista, y por qué importa el método

Cinco frentes en paralelo sobre la rama: lo que el código declara pendiente, lo que los
documentos declaran pendiente, los hallazgos de una revisión anterior que no se aplicaron,
la deuda que solo se ve midiendo el sitio construido, y las incoherencias de mensaje.
Después, un verificador por hallazgo, con la instrucción de **intentar refutarlo** y de
rechazarlo ante la duda.

Rindió. Un ejemplo de los que cayeron: un frente afirmó que esta rama no comparte ancestro
con `main` y que el merge estaba bloqueado de raíz. Se descartó por falso, y con razón.

**Pero el filtro no me cubrió a mí.** Yo había escrito lo mismo sobre OTRA rama
(`claude/reposicion-sitio-v2-mejoras`) y lo repetí tres veces antes de comprobarlo contra
GitHub: también era falso, y por el mismo error de método. Un `git merge-base` que devuelve
vacío no significa «no hay ancestro», significa que la referencia no resolvió, y usar esa
variable vacía en un `diff` compara contra la nada y devuelve la rama entera. De ahí salieron
dos cifras inventadas. **La lección es la del §4: comprobar también lo propio, no solo lo que
dice otro.**

Y otro que sobrevivió y corrigió a quien escribió el encargo: una verificación **clonó el
repo público de Bernardo** y encontró que el arreglo propuesto para su portada no se podía
aplicar como estaba escrito, que las seis interiores no comparten plantilla, y que el sitio
tiene once rutas y no ocho. El encargo quedó corregido con eso.

**La conclusión para quien retome:** un hallazgo sin verificar cuesta más que un hueco. De
los 45 que llegaron a verificarse, uno se cayó y más de un tercio salió con el texto
corregido. Los 50 de §7 no pasaron por ese filtro.
