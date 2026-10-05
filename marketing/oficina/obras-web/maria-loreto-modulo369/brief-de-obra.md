# Brief de obra · María Loreto Hernández · Módulo 369 · etapa 1: maqueta v2

> Compuerta 1. Lo escribe Mauro (`/web-encuadre`), lo aprueba Ramón. Cubre **solo la maqueta navegable v2** para la reunión del 6-oct. El sitio en producción va en `borrador-brief-sitio.md`, que **no se aprueba en esta compuerta**: se cierra después de la reunión, con las preguntas 3 a 5 de §9 respondidas.

**Fecha:** 5-oct-2026 · **Ficha:** `oficina/clientes/maria-loreto-hernandez.md` · **Tipo:** obra, etapa 1 de 2
**Repo y rama:** `GALERIA-MARIA-LORETO/` (git propio, sin remoto) · `claude/maqueta-v2` (limpia, en `6119665` igual que `main`, donde queda la v1; esta sesión es la dueña)
**Aprueba del lado de la clienta:** María, la propuesta visual (Fase 2 de la cotización)

**Clasificación: obra.** 14 vistas en dos idiomas con composición propia, rehechas sobre la v1. Va separada del sitio porque el mapa del sitio depende de lo que María responda en la reunión.
**Dirección visual:** retícula 3·6·9, elegida por Ramón el 26-sep **fuera del protocolo** (sin `referencias.md`, tableros ni `spec-visual.md`; evidencia: commit `6119665` y `GALERIA-MARIA-LORETO/CLAUDE.md`). Esta obra no la reabre por iniciativa interna. Si María la rechaza, se anota con el formato de rechazo útil y se rehace dentro del contrato, como parte de la Fase 2, con su propio encuadre y sin cotización nueva.

## 1 · Qué tiene que lograr
**La obra completa:** que Módulo 369 exista como galería propia en modulo369.com, donde cualquiera, en español o en inglés, recorra la obra de sus artistas y compre o consulte por una pieza, y que María la haga crecer sola. **Se nota cuando** María publica una obra, una artista o un encuentro sin escribirle a SpindleLab, y las consultas y los pagos le llegan directo a ella (correo y Mercado Pago).
**Esta etapa:** que María recorra su mapa funcionando y que la reunión cierre lo que falta de la Fase 1 (brief creativo, hosting y correos). **Se nota cuando** el acta de la reunión trae respondidas las preguntas 3, 4 y 5 de §9 y dice, por cada disrupción del criterio de §7, si María la reconoce o la rechaza (qué, contra qué, regla o preferencia).

## 2 · A quién le habla
**Mañana, solo a María:** la v2 se juzga contra su mapa del 26-sep y contra las disrupciones que ella nombró (§7). Las audiencias del sitio, que la v2 anticipa en su jerarquía, están en el borrador §2.

## 3 · Mapa de rutas
La v2 imita con `#/…` las rutas del sitio. *Origen* = sección del mapa de María del 26-sep. *Para qué existe* es también lo que se entiende en los primeros 5 segundos.

| Vista | Origen | Para qué existe | Qué tiene que pasar ahí | Única acción |
|---|---|---|---|---|
| `/` | 1 | Que lo primero que se vea sea obra a gran tamaño | Carrusel de varias obras con controles (boceto IDEA - INICIO); asoman artistas, Encuentro y ediciones | Abrir la obra del carrusel (su ficha) |
| `/artistas/` | 2 | Mostrar quiénes están, cada una por su obra | 3 artistas, preparado para 6 y 9; visión curatorial | Entrar a una artista |
| `/artistas/<a>/` | 2 · dinámica | Que se entienda el trabajo de una artista | 6 bloques: nombre, statement, ~9 obras, bio, historia/proceso, foto opcional | Abrir una obra |
| `/obras/` | 3 | Encontrar una obra y ver qué está disponible | Filtros por artista, técnica, tamaño y disponibilidad | Abrir una obra |
| `/obras/<o>/` | 3 · dinámica | Decidir si comprar o consultar | Imágenes general y detalle; título, artista, año, técnica, medidas, precio, disponibilidad | La de su estado (§4) |
| `/ediciones/` | 4 | Mostrar que la galería edita cuadernos y libros | 3 ediciones | Abrir una edición |
| `/ediciones/<e>/` | 4 · dinámica | Llevar a la compra | Portada, descripción, interiores, detalles | Ir a Amazon KDP, a la edición del idioma de la página |
| `/encuentro/` | 5 | Explicar la caja numerada 001 a 369 y cuántas van | Qué es, cómo funciona, numeración 001/369, formas de activación, preguntas frecuentes; enlace vertical a la derecha, rotulado «Libro» | Activar un encuentro |
| `/encuentro/activar/` | 5 | Decir qué se recibe, cuánto tarda y cómo queda registrado | Proceso, qué recibes, tiempos, registro fotográfico; solicitud y compra, marcadas como opción a decidir (§9-4) | Enviar la solicitud o comprar la caja |
| `/encuentro/libro/` | 5 | Dejar registro numerado de lo que la gente hizo con la caja | Las 369 posiciones; las activadas con foto y enlace | Abrir un encuentro |
| `/encuentro/libro/<nnn>/` | 5 · dinámica | Mostrar un encuentro activado | Foto, número, fecha, lugar aproximado, breve descripción | Volver al Libro |
| `/acerca/` | 6 | Decir qué es Módulo 369 y con qué criterio elige | Enunciado, criterio curatorial, la acción (mirar, seleccionar, decidir), visión | Ir a Artistas |
| `/tienda/` | 7 | Juntar lo que se compra y la vía de cada cosa | Obras disponibles (botón por obra), Encuentro, ediciones (Amazon) y cómo se compra | Ir a una obra disponible |
| `/contacto/` | 8 | Recibir consultas | Formulario, correo, Instagram | Enviar la consulta |

**Supuesto:** la «página de archivo» de su mapa es el «Libro» de su boceto; una sola ruta, rotulada «Libro» hasta que María confirme el nombre. El «Archivo» de su lista de secciones (historial de exposiciones u obras pasadas, `BRIEF.md` l.48) es otra cosa y depende de §9-3. Rutas que solo tiene producción y tope de páginas: borrador §3.

## 4 · Jerarquía por página
Lo que se entiende en 5 segundos y la única acción de cada vista están en §3. La ficha cambia según el estado de la obra; esta tabla es la única fuente y la citan §7 y el borrador:

| Estado de la obra | Botones |
|---|---|
| 1 · Disponible, con precio y link de MP | **Comprar** (principal) y Consultar |
| 2 · Disponible, sin precio o sin link | **Consultar** |
| 3 · Vendida | Consultar |
| 4 · Colección privada | Consultar |

Comprar exige precio y link a la vez. En la v2, «[precio]» cuenta como precio y el link de MP es de muestra, así que el estado 1 muestra Comprar. **Supuesto:** Consultar aparece en los cuatro estados (una consulta por una obra vendida o en colección privada también le sirve a María).

## 5 · Activos reales
| Activo | Dónde está | Permiso |
|---|---|---|
| Declaración creativa de María (correo 26-sep) | `BRIEF.md`, textual | Insumo de dirección: sí. Publicarla textual: no consultado |
| Mapa «MÓDULO 369 · Mapa de la web» y 4 bocetos IDEA (INICIO, ARTISTAS, ENCUENTRO, LIBRO) | Adjuntos de los correos del 26-sep; `referentes/bocetos/` está **vacía** | Insumo interno, sin publicar (§9-2) |
| Nombre «Módulo 369» | Correos de María | Sí |
| Caso público para SpindleLab | No existe | **No** |

**Todo lo demás es hueco** (logo, fotos de obra, artistas 2 y 3, textos de María, datos de obra, links de MP, ediciones, Encuentro, Instagram, correos): en la v2 va relleno marcado según §6, regla de `GALERIA-MARIA-LORETO/CLAUDE.md` acordada con María el 26-sep. Inventario completo, permisos por pedir y qué pasa en producción: borrador §5.
Sus referentes y los de la cotización sirven de insumo puntual (`BRIEF.md`). Lo que María **rechazó** es restricción: textos fijos pegados encima de las fotos al bajar (Escat) y tanto blanco intenso (Perrotin).

## 6 · Restricciones
- **Nada inventado presentado como real:** ni nombres de artistas, ni precios, ni bios, ni textos curatoriales, ni encuentros activados.
- **Cómo se marca el relleno:** aviso global en cada vista (ES y EN); cada hueco de texto, entre corchetes y con la clase `.pendiente`, dice qué va ahí. Los datos de obra generados (título, año, técnica, medidas) se aceptan solo bajo el aviso global. Comprar, Amazon y los formularios avisan al usarlos que son de muestra. Nada de la v2 (imágenes de `maqueta/img/`, corchetes, textos de propuesta) llega a producción.
- **Voz:** habla la galería. Los textos fijos (menú, botones, etiquetas, avisos de formulario, 404, el «cómo se compra» de Tienda) los escribe Clara y los traduce SpindleLab; el resto lo escribe María en ES y EN. **Supuesto de registro: tú** (su mapa dice «qué recibes» y la v1 ya tutea); se revierte de una vez en los textos fijos.
- **Precio y vendida:** el estado vendida viene del compromiso del 24-sep (n.3) y el precio visible, de su mapa; en la cotización, «precio y stock por obra» y «marcar obra como vendida» eran de Plataforma a Medida. Entran sin stock.
- **Dirección 3·6·9:** solo los tokens de `maqueta/styles.css`; el cobalto es el único color disruptivo.
- **Repo sin remoto** (respaldo solo en iCloud, con riesgo de copias «nombre 2» en `.git/`): commit al cerrar la v2.

## 7 · Criterios de aceptación (se comprueban mirando la v2)
- [ ] Las 14 vistas abren desde el menú o desde otra vista, y ningún enlace interno termina en la vista de error.
- [ ] Cada vista muestra todo lo de su fila de §3 (lo que tiene que pasar y su única acción), con relleno marcado o corchete.
- [ ] Con EN activo no queda texto fijo en castellano en ninguna vista, y el idioma elegido se mantiene al navegar.
- [ ] Marcado según §6: aviso global ES/EN en todas las vistas; artistas «A / B / C»; cero precios en cifras; `alt` de obra que dice relleno; corchete y `.pendiente` en bio, statement, historia/proceso, visión curatorial, enunciado, criterio, descripción de cada obra y edición, Instagram, los textos de Encuentro y Activar (qué es, cómo funciona, proceso, qué recibes, tiempos, preguntas frecuentes) y la fecha, el lugar y la descripción de cada encuentro de muestra; el contador del Libro dice que los activados son de muestra.
- [ ] Ficha: dos imágenes recorribles (general y detalle) y una obra de muestra en cada estado de §4, con exactamente sus botones.
- [ ] Obras: los cuatro filtros filtran cada uno por su propio campo (en la v1 «técnica» compara contra la artista, `app.js` l.190), se combinan, muestran el conteo y un mensaje cuando no hay resultados.
- [ ] Artistas: ninguna representada por retrato. Acerca: ningún bloque habla de María como persona (su mapa: «no es una bio personal»).
- [ ] Tienda dice cómo se compra cada cosa y que no hay carrito; el newsletter, si aparece, dice que no está incluido.
- [ ] Disrupciones: Inicio, Artista, Ficha y Encuentro tienen cada una al menos una de las que nombra María (cambio de escala, palabra enorme, palabra casi escondida, color que desentona, imagen desplazada), y el acta de QA dice cuál en cada vista.
- [ ] Al hacer scroll, ningún elemento fijo o pegado queda encima de una imagen de obra (lo que María rechazó de Escat). Se exceptúa la retícula, que se activa a mano y es solo de la maqueta (§8).
- [ ] Sin scroll horizontal a 390, 768 y 1440; capturas a 390 y 1440 de Inicio, Artista, Ficha, Encuentro y Libro en `capturas/maqueta-v2/`.
- [ ] `styles.css` no agrega colores ni familias fuera de los tokens de la v1.
- [ ] Acta de QA de Javiera, en contexto limpio, con veredicto distinto de Rechazado, antes de la reunión.
- [ ] v2 commiteada en `claude/maqueta-v2`, v1 recuperable en `main`, y `?v=N` subido en cada CSS o JS tocado.

## 8 · Lo que NO se hace en esta etapa
1. **El sitio, el panel y las rutas reales.** Son el borrador, que se aprueba después del 6-oct.
2. **Mostrar como incluido algo que el sitio no entrega** (borrador §8: carrito, pago integrado, newsletter, registros del público, feed de Instagram, blog). Si aparece, va marcado como no incluido.
3. **Un panel dibujado.** Si María pregunta cómo se ve, se le muestra el demo público de Decap, que es lo que va a usar.
4. **Llevar la retícula al sitio.** El botón «Retícula» es herramienta de la maqueta: su capa fija tiñe las fotos, justo lo que María rechazó de Escat.
5. **Reabrir la dirección 3·6·9 por iniciativa interna** (si la rechaza María: encabezado).
6. **Logo, fotografía, redacción del contenido y su traducción.**
7. **Publicar la v2 sin el OK de Ramón** (§9-1), o como caso de SpindleLab.

## 9 · Preguntas bloqueantes (se hacen una sola vez)
**A Ramón, hoy (bloquean la v2):**
1. **¿Cómo ve María la maqueta?** ¿En tu pantalla (presencial o compartida) o con un link para recorrerla en su iPhone? Si es link, va en una URL no listada con `noindex` (la ve cualquiera que tenga el enlace; `noindex` solo la saca de los buscadores), en la cuenta de Cloudflare de SpindleLab, y se baja después de la reunión; publicarla requiere tu OK, y 390 px pasa a ser el ancho principal. *Si no hay respuesta:* tu pantalla, sin publicar.
2. **¿Puedes dejar hoy en `referentes/` los 4 bocetos y la imagen del mapa?** Sin ellos, Inicio, Artistas, Encuentro y Libro se construyen contra la descripción de `BRIEF.md`. *Si no:* se usa la descripción y en la reunión se compara contra sus originales.

**A María, en la reunión (bloquean el brief del sitio; la v2 muestra las alternativas):**
3. **¿Módulo 369 va a hacer exposiciones, con un Archivo que guarde las pasadas?** La cotización incluye «exposiciones que creas tú desde el panel», su lista de secciones nombra un «Archivo» (historial de exposiciones u obras pasadas) y le gustó el de Kurimanzutto, pero su mapa no tiene esa sección. Ese Archivo es otra cosa que el Libro de Encuentro. Si sí: una colección más en el panel y la ruta `/exposiciones/` (home + 11 de las home + 12 cotizadas). Si no: el historial vive en Obras, como vendidas y colección privada. *Si no hay respuesta:* sin Exposiciones; se puede sumar después dentro del tope.
4. **Encuentro: ¿la caja se vende o se reparte, y quién sube los registros al Libro?** Venderla es un botón Comprar con link de MP, como una obra; repartirla es una solicitud por formulario. Si los registros los sube el público, sale del alcance (borrador §8-3); si los sube ella desde el panel, cabe. *Si no hay respuesta:* Encuentro sigue como prototipo y se construye al final, sin frenar el resto.
5. **Correo y dominio: ¿Zoho o Google Workspace para hola@ y ventas@? Y el WHOIS público dice que modulo369.com está en GoDaddy: ¿es tu cuenta y puedes entrar?** Es la definición de hosting y correos de la Fase 1, y el acceso al registrador hace falta para el DNS. *Si no hay respuesta:* Zoho (opción A de la cotización, $0), y el acceso a GoDaddy se le pide por correo antes de la Fase 5.

*Supuestos escritos, reversibles en una línea, sin preguntar:* tuteo; Libro = página de archivo de su mapa; precio opcional por obra; Consultar en los cuatro estados; sin logo; Privacidad agregada; tráfico inicial por la red de María.
*Se le comunica en la reunión (son consecuencia del contrato):* Tienda sin carrito (la tienda completa va aparte, desde $450.000 + IVA; lo incluido es Comprar por obra con su link de MP) y sin newsletter (no está cotizado; se puede contratar aparte).

## 10 · Compuerta 1
- **Aprobado por:** · **Fecha:** · **Cambios pedidos al aprobar:**
