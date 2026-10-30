# Desvíos de Clara: el texto del 30-oct (sitio propio, «Hablemos de tu sitio», Quién está detrás)

**Clara (copy de interfaz), 30-oct-2026.** Rama `claude/magical-franklin-ckfki2`.
**Qué se hizo:** se pasó al texto todo lo que Ramón decidió el 30-oct sobre las maquetas de `copy/maquetas-30oct/` y el borrador `copy/sitio-propio-direcciones.md`. Lo pedido está en el encargo de la orquestadora.

**Archivos:**
- fuentes en `e13/texto/`: `home`, `comun`, `contacto`, `nosotros`, `servicios`, `desarrollo-web`, `diagnostico`, `blog` y `caso-combeau`;
- sus copias con huella en `spindlelab-astro/src/data/archivo/texto/`;
- `spindlelab-astro/public/llms.txt`;
- una respuesta de las preguntas frecuentes de `/contacto/` en `spindlelab-astro/src/data/paginas-v3.json`.

Cada elemento que cambió lleva en su JSON `antes`, `por_que` y `origen`.

## 1 · Qué cambié, por qué, de dónde sale

| Qué cambié | Por qué | De dónde sale |
|---|---|---|
| **Portada.** Rótulo «Sitios web a medida y marketing con IA». H1 en dos tintas: «En redes arriendas.» + «Tu sitio es lo único que es tuyo.». Entradilla nueva | El negocio principal es el sitio. El titular anterior «queda muerto» | Ramón, 30-oct |
| **Recuadro de acción.** Botón «Hablemos de tu sitio». Microcopy de los dos caminos. Enlace nuevo `home.portada.secundario` («Ver cómo hacemos un sitio y cuánto cuesta», a `/servicios/desarrollo-web/`). `home.portada.chequeo` queda marcado «sale» | El botón anterior solo le servía a quien ya tiene sitio | Ramón, 30-oct |
| **Color.** Botón de la portada y del encabezado en amarillo lleno `#FFE800`, texto `#060606`. Anotado en `home.portada.boton` y `comun.nav.revision` | Desvío autorizado de spec §1.1 y §20.2. Lo mide Lucía | Ramón, 30-oct |
| **Encabezado.** Botón «Hablemos» (`comun.nav.revision`) | En el encabezado no cabe el complemento | Ramón, 30-oct |
| **Sección 2.** H2 «Todo lo que haces para vender termina en tu sitio», párrafo, dos columnas y cierre. Ids nuevos `home.problema.redes.*`, `.sitio.*` y `.cierre`. Componente sugerido en `home.problema.columnas` | Reemplaza a «Dónde puede caerse una consulta» | Ramón, 30-oct (dirección B) |
| **Para quién.** p2 pasa a «Si estás partiendo y todavía no tienes sitio, también es por acá: es lo primero que hacemos.» | Reemplaza a la frase anterior. Sumarla repetía la idea | Ramón, 30-oct |
| **Cómo partimos.** `home.como.1` suma «Si todavía no tienes, te contamos cómo lo haríamos y cuánto cuesta.» | Sin esto, quien no tiene sitio no encontraba su primer paso | Microcopy de la portada |
| **Soluciones.** El sitio va primero (`home.soluciones.orden`). Texto nuevo del sitio. Frase de enlace en la intro y en Anuncios («que llevan a tu sitio») | El sitio es el eje y lo demás se le conecta. Precios sin cambios | Ramón, 30-oct |
| **Preguntas frecuentes.** Pregunta nueva primero: `home.faq.sitio.p` y `.r`. `faq.1.r` nombra primero la página web. `faq.2.r` le dice qué mandar a quien no tiene sitio | El FAQPage debe repetir las seis preguntas en el orden visible | Ramón, 30-oct |
| **Quién está detrás, en tercera persona.** Pie «Fundador y director de SpindleLab». Cuatro párrafos: `home.quien.p1` a `p4`. `home.quien.cv` queda como id de transición. Las tres reglas en plural | Ramón: «no está profesional», «no tiene mucha épica» | Texto base del encargo, afinado (detalle abajo) |
| **Cierre de la home.** «Partamos por tu sitio.» + «Tengas uno o no, te respondemos dentro de un día hábil.» Botón «Hablemos de tu sitio» | El cierre anterior dejaba fuera a quien no tiene sitio | La acción y el plazo de Ramón |
| **Señales de la home.** Title y description de Ramón, con un ajuste para que quepa (ver §3) | Build: la description no puede pasar de 160 caracteres | Ramón, 30-oct |
| **Pie y #org.** `comun.pie.marca` y `comun.entidad.descripcion` con la línea nueva. `comun.entidad.cargo` = «Fundador de SpindleLab: sitios web a medida y marketing con IA» | jobTitle y #org en la misma línea | Ramón, 30-oct |
| **/nosotros/.** Tercera persona, más extensa. h1 nuevo, línea de Ramón, bio y firma. «De dónde viene», sin agencias ni clientes. Dos secciones nuevas: `idea` y `oficio`. «Lo que puedes esperar» con las tres reglas en plural. Cierre «Partamos por tu sitio.» y los dos botones «Hablemos de tu sitio» | Mismo tono que la home | Ramón, 30-oct, y el texto base |
| **/contacto/.** h1 «Hablemos de tu sitio.» + gris. Línea de Ramón. Ayuda del campo «Si todavía no tienes sitio, escribe «no tengo».». Botón «Enviar». Confirmación «Te escribimos dentro de un día hábil.». Paso 2 «Te respondemos en un día hábil», con lo que recibe cada uno. Pasos 1 y 3 ajustados a los dos casos. Title y description nuevos | La página tiene que calzar con el botón | Ramón, 30-oct |
| **Pregunta de /contacto/** en `paginas-v3.json`. «¿Qué información necesitan para empezar?» pasa de «Solo la dirección de tu sitio» a «La dirección de tu sitio o, si todavía no tienes, qué vendes» | Contradecía la ayuda del campo | Coherencia con lo de arriba |
| **/servicios/.** Title. Entradilla con la frase de enlace. Bloque del sitio con el texto de la home. Cierre para los dos casos y botón «Hablemos de tu sitio» | La misma línea que la home. El orden de los bloques no lo cambio (ver §2) | Ramón, 30-oct |
| **/servicios/desarrollo-web/.** «Escribir a SpindleLab» y «Conversar mi proyecto» pasan a «Hablemos de tu sitio» | Es la página adonde lleva el enlace nuevo de la portada | Ramón, 30-oct |
| **/diagnostico/, Ley 21.719.** El párrafo ya no da el 1-dic-2026 sin más (detalle abajo) | Esa fecha ya no es firme | Ficha del boletín, leída el 30-oct |
| **Blog y caso Combeau.** `blog.cierre.cta` y `combeau.siguiente.boton` pasan a «Hablemos de tu sitio». `combeau.siguiente.contacto`: «escríbenos y te respondemos en un día hábil, tengas sitio o no». Firma `articulo.autor` = «Fundador y director de SpindleLab» | Ya no queda «Pedir la revisión de una página» en ningún texto visible | Ramón, 30-oct |
| **`llms.txt`.** Posicionamiento nuevo, sin agencias. Desarrollo web primero en Soluciones. Contacto con los dos caminos. Trabajo nombra la Ley 21.719 | «llms.txt al día» | Ramón, 30-oct |

### Quién está detrás: cómo afiné el texto base

**Lo que no cambié: los hechos.** Agencias de medios y de marketing, algunas parte de redes globales. Producción, pauta, contenido y SEO para marcas de alcance nacional y regional. Campañas en varios países. La idea de dónde se pierde la inversión. Los agentes de IA y la revisión del código. Las dos herramientas abiertas. Los estudios.

**Lo que cambié:**
- **p3.** Decía «Las herramientas que usa las construyó él», y no todas lo son. Ahora dice las dos que sí construyó.
- **El chequeo.** «Mide si la IA puede entender un sitio» pasa a «mide si un sitio está preparado para que la IA lo entienda». Es lo que mide, y así lo dice el resto del sitio.
- **p2.** Saqué el segundo «dos puntos» del párrafo («todo lo demás: la búsqueda…»). Dos por párrafo es el tic que Ramón rechazó (voz, 23-sep).
- **El orden.** La formación va al final, para cerrar bajo.

**Lo que no va, como pidió Ramón:**
- «SpindleLab soy yo» ni «pocos proyectos»;
- ninguna agencia ni cliente por su nombre, ni sus cifras;
- la explicación literal del nombre: el spindle queda como la idea del sitio como eje.

**Ids de la home.** `home.quien.cv` lleva hoy el texto de p2, para que la página construya y se lea bien. Cuando Diego lea p1 a p4, ese id se borra.

### /nosotros/: el h1, decisión de Clara

**Elegido:** «Construimos el sitio como eje y le conectamos lo demás.»

**Por qué sale «No te prometo. Te muestro.»:**
- está en singular, en una página que pasa entera a tercera persona y al plural;
- como cita de Ramón pediría atribución;
- su versión en plural («Mostramos, no prometemos») ya la habían marcado los lectores en frío como eslogan (copy §2.6).

El h1 nuevo dice la idea del estudio. La línea de abajo dice quién. Los descartes están en el JSON (`nosotros.h1`).

### /diagnostico/: la Ley 21.719

**Leí la ficha del boletín 18.623-07** el 30-oct en el servicio público del Senado (`tramitacion.senado.cl/wspublico/tramitacion.php?boletin=18623`). La página de noticias de senado.cl devolvió 403. La ficha dice:
- **20-oct:** aprobado en general en la Comisión de Constitución.
- **28-oct:** en la Sala, «Aprobado en general y particular a la vez».
- **29-oct:** oficio N° 355/SEC/26 a la Cámara de Diputados. Va en segundo trámite, con urgencia de discusión inmediata.

Es más de lo que traía el encargo (que llegaba al 20-oct). Lo uso porque el encargo pide la ficha si se puede leer.

**El texto queda así:** el Senado lo aprobó el 28 de octubre y ahora lo revisa la Cámara. Mientras no se publique la ley, la fecha legal sigue siendo el 1 de diciembre de 2026. «El proyecto cambia cuándo, no qué.»

**La fecha nueva no va.** El oficio pone la entrada en vigencia en el «15 de octubre de 2027», pero la Cámara todavía puede cambiarla.

**Dónde más se miró la fecha:**
- en el sitio (blog incluido) y en `llms.txt`, nadie más decía «1 de diciembre». `llms.txt` nombra la ley sin fecha;
- Verifica y Cumple (`verifica.spindlelab.cl`) no está en este repo. Lo sigue su sesión, según `URGENTE-vyc-la-postergacion-avanzo-20oct.md`.

## 2 · Lo que Diego tiene que cambiar en el código (los ids ya existen)

El build pasa hoy con el texto nuevo. Lo que no se ve todavía es lo que necesita código.

**`index.astro` (home):**
1. **Portada.** El enlace del recuadro pasa a leer `home.portada.secundario`, y `home.portada.chequeo` se borra del JSON cuando ya no se lea. El botón va en amarillo, según la spec de Lucía.
2. **Sección 2.** Leer las dos columnas `home.problema.redes.t` + `.redes.1` a `3` y `home.problema.sitio.t` + `.sitio.1` a `4`, y el cierre `home.problema.cierre`. La sugerencia de componente está en `home.problema.columnas`: dos `ul.int-lista` que ya existen.
3. **Soluciones.** El arreglo `bloques` pasa al orden sitio, búsqueda, anuncios, acompañamiento (`home.soluciones.orden`).
4. **Quién está detrás.** Leer `home.quien.p1`, `p2`, `p3` y `p4`, en ese orden, y dejar de leer `home.quien.cv`.
5. **Preguntas.** `[1, 2, 3, 4, 5]` pasa a `['sitio', 1, 2, 3, 4, 5]`. El FAQPage sale solo de la misma lista.
6. **Imagen al compartir.** `og-e12-marca.jpg` se regenera con el rótulo y el titular nuevos, a `?v=3`. Su alt es `home.portada.og-alt`.

**El encabezado** ya lee «Hablemos» de `comun.nav.revision`. Falta el amarillo.

**`interiores.mjs`, `nosotros()`:**
- dos secciones nuevas entre la trayectoria y «Lo que puedes esperar»: `nosotros.idea.*` y `nosotros.oficio.*`. Cada sección trae en el JSON su `componente` sugerido;
- `og-e12-nosotros.jpg` se regenera con el h1 nuevo, a `?v=3`.

**`interiores.mjs`, `contacto()`:** `og-e12-contacto.jpg` se regenera con el h1 nuevo, a `?v=3`.

**`/servicios/`, orden de los bloques: no lo cambié.** Lo fija `ORDEN` de `servicios.mjs` y lo compara el guardián «servicios, el orden», que también arma «Siguiente». Moverlo es decisión de Diego con Lucía (`servicios.bloques.nota`).

**El barrido de términos** (`herramientas/barrer-terminos.mjs`) marca la description nueva de la home como «posicionamiento anterior» por «diseñamos y programamos sitios a medida». Lo mismo vale para la guía de roles §3 («sitios a medida» como claim). Ramón dio vuelta las dos cosas el 30-oct. Quien lleve la herramienta y la guía las pone al día. Yo no las toqué.

## 3 · Lo que no cabe en una regla (para Diego, Lucía y Javiera)

1. **La description de la home medía 161 y el build corta sobre 160.** «y conectamos a ellos» pasa a «y les conectamos» (157). Dice lo mismo. Ramón lo confirma.
2. **El h2 de la sección 2 tiene 10 palabras en una sola tinta.** Si el tope de 8 de la parte en blanco (spec §1.3) vale para un h2 de una sola tinta, no cabe. No lo corté: lo decide Lucía.
3. **El h1 de /contacto/ lleva una parte gris que no es de Ramón** («Del que ya tienes o del que todavía no.»). La plantilla y `contacto()` exigen dos tintas. Si Ramón lo quiere solo, Diego lo pasa a una tinta, como `nosotros.h1`, y el gris se borra.
4. **La entradilla de la portada y el párrafo de la sección 2 nombran la misma lista** (el anuncio, el post, Google, ChatGPT). Ramón eligió los dos. Javiera mira si se lee como repetición.
5. **«Google y las IA pueden leerlo y citarlo.»** «Leer» fue la palabra que no se entendió en la ronda 2, y «citarlo» es lo más cerca de una promesa que tiene la home. Se deja: es de Ramón y afirma una posibilidad.
6. **El cierre de la sección 2 lleva dos veces dos puntos.** Es de Ramón y se deja.

## 4 · Verificación

**`extraer-texto.mjs`:** copié `home`, `comun`, `contacto`, `nosotros`, `servicios`, `desarrollo-web`, `diagnostico`, `blog` y `caso-combeau`. `--comprobar` da «igual» en las 16 copias y sale con 0.

**Build** (`astro build` sobre una copia de `spindlelab-astro/`): 22 páginas, sin errores. Pasan los guardianes de precios, nombres, largos de title y description, montos de las preguntas y la firma de /nosotros/.

**`barrer-terminos.mjs` sobre ese `dist`:**
- **En cero:** rayas, «24 horas», partners, «agentes de IA» (hoy p3 no se pinta), promesas, «sin compromiso» y «¿Listo para…?».
- «posicionamiento anterior» = 3, todos en la description nueva de la home (ver §2).
- «motor», solo en «motores de IA».
- «mini-diagnóstico» = 25, en el blog y en la dirección de un artículo, que no se cambia. Ya estaba y no es de esta pasada.

**Barrido de los JSON** (`e13/texto` y `src/data/archivo/texto`), buscando:
- McCann, Graphene, LATAM, Incrementa, Maggiore;
- «ocho marcas», «cuatro países»;
- «SpindleLab soy yo», «pocos proyectos»;
- «Te llegan consultas», «Pedir la revisión de una página»;
- rayas.

**Resultado:**
- **0 en texto visible:** texto, tinta, gris, rótulos, title y description.
- Solo quedan en campos de registro (`antes`, `fuente`, `borrado`, `por_que`), que no se publican.
- En el `dist` construido: 0 apariciones.

**Lectura en voz alta** del texto construido de la home, /nosotros/ y /contacto/. Corregí una repetición: la línea y la bio de /nosotros/ decían seguidas «SpindleLab lo dirige Ramón Vallejos». Ahora la bio empieza «Antes de fundar SpindleLab…».

## 5 · Lo que queda para Ramón

1. **El h1 de /nosotros/** (§1). Si prefiere conservar «No te prometo. Te muestro.», se puede volver a poner como cita suya.
2. **«El código de cada entrega lo revisa y lo aprueba él».** Es su frase. El 26-oct había salido porque en Praxi 50 de 219 commits fueron directo a main. Confirmar que vale para las entregas a clientes.
3. **La home tiene un solo «yo».** Es `home.pruebas.propio.texto` («lo corrí sobre mi propio sitio. Salió mal…»). Con «Quién está detrás» en tercera persona, quedó sola. Hay dos opciones:
   - plural: «lo corrimos sobre nuestro propio sitio… encontramos… lo corregimos»;
   - dejarla, como hallazgo propio dicho en primera persona (regla de voz del manual).

   No la toqué porque no estaba en lo decidido.
4. **Dos hechos sin confirmar:**
   - si el dominio queda registrado a nombre del cliente;
   - si se le entrega el código.

   Si los dos son ciertos, «Va en tu dominio.» puede pasar a «Va en tu dominio, a tu nombre.»
5. **Botones que dejé como están,** porque dicen algo propio de su página:
   - en /metodo/: «Enviar mi dirección» y «Pedir mi revisión»;
   - en /diagnostico/: «Pedir la revisión a mano»;
   - los cierres de cada servicio: «Pedir la revisión de mi sitio», «Pedir la auditoría», «Conversar mi caso»;
   - el «Escríbenos» de la cabecera de cada servicio.

   El primer paso del método («Revisión gratis») tampoco habla todavía a quien no tiene sitio. Hay que decidir si el método se alinea con la home.
6. **Ley 21.719.** Releer la ficha el día de publicar. Si la Cámara lo despacha o la ley se publica, la frase de /diagnostico/ cambia.
7. **Fuera del sitio** (para la troncal): el outbound y las bios de LinkedIn todavía dicen la línea anterior («Marketing y crecimiento con IA para empresas que ya venden»).

**El logo** (opción 2, «la i con su disco») no es texto: no está en esta pasada. Su nombre accesible sigue siendo «SpindleLab» (`comun.logo`).
