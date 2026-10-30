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

---

## 6 · Respuestas de Ramón (30-oct, tarde)

**Clara, 30-oct, desde las 14:40.** Ramón contestó por escrito, en la conversación con la orquestadora, las cuatro preguntas
de `desvios/construccion-30oct.md` §6. Aquí va lo aplicado, id por id. Cada id que cambió lleva en su JSON el `antes` (con la
versión anterior y la de antes de esa), el `por_que` que empieza «Ramón, 30-oct, eligió…» y la decisión al final de su `origen`.

**Lo que eligió:** A1, B1, C1, el plural y 7A, tal cual (las cinco recomendaciones); el panel viene en **todos** los planes de
Desarrollo web y la home queda como está; las cuatro líneas de `Layout.astro` quedan; los botones con texto propio de
/metodo/, /diagnostico/ y de cada servicio quedan; lo que no frena la publicación queda como lo dejó el equipo.

### 6.1 · Id por id

| Id | Dónde se ve | Decisión | Queda así | Antes |
|---|---|---|---|---|
| `home.quien.p3` | `/`, Quién está detrás | A1 | «Responde él por cada entrega: el código lo revisa y lo aprueba antes de que llegue a tu sitio. Para escribirlo trabaja con agentes de IA dentro del equipo.» y, sin cambio, las dos herramientas abiertas | «Trabaja con agentes de IA dentro del equipo, y el código de cada entrega lo revisa y lo aprueba él.» |
| `nosotros.oficio.1.d` | `/nosotros/`, Cómo trabaja, fila «Agentes de IA, con su revisión» | A1, en su forma de fila | Las mismas dos oraciones de A1. Las herramientas no van: en esta página tienen su propia fila (`nosotros.oficio.2`). El título de la fila no cambia | «Trabaja con agentes de IA dentro del equipo. El código de cada entrega lo revisa y lo aprueba él.» |
| `home.portada.rotulo` y sus repeticiones | title, tarjeta al compartir, `jobTitle`, `#org`, pie, `llms.txt` | B1 | **Sin cambio en ninguna parte**: «Sitios web a medida y marketing con IA» | |
| `home.soluciones.sitio.texto` | `/`, Soluciones, el sitio | C1 | «Diseñado y programado para tu negocio, con un panel para que edites tú. Desde una página de campaña hasta un sitio de doce páginas.» | con «sin plantillas ni WordPress,» después de «negocio» |
| `servicios.m3.nota` | `/servicios/`, bloque 01 | C1 | El mismo texto de la home | ídem |
| `llms.txt`, línea de Desarrollo web | `/llms.txt` | C1 | «sitios a medida, con un panel para que edites tú y SEO técnico desde el diseño. Desde una página de campaña hasta un sitio de doce páginas.» (el archivo se edita directo, no pasa por JSON) | ídem |
| `desarrollo-web.json` | `/servicios/desarrollo-web/` | C1 | **Nada que sacar en texto de venta**: la ronda 2 ya había sacado la frase del h1 y de «En todos los planes». Quedan, como pidió Ramón, la pregunta `dw.faq.1.p` («¿Usan plantillas o WordPress?») y su respuesta `dw.faq.1.r` («desde cero»): es la pregunta tal como alguien la hace, la respuesta dice lo que sí es, y el `FAQPage` repite las dos porque tiene que ser igual a lo visible | |
| `home.pruebas.propio.texto` | `/`, Lo que puedes revisar, «Probado primero en lo nuestro» | plural | «Antes de publicar Verifica y Cumple, el chequeo de la Ley 21.719 de datos personales, lo corrimos sobre nuestro propio sitio. Salió mal. Al arreglarlo encontramos además un formulario que perdía mensajes sin avisar, y lo corregimos.» | «lo corrí sobre mi propio sitio… encontré… lo corregí» |
| `home.problema.p` | `/`, sección 2 | 7A | «Si tu sitio no explica bien lo que haces, o el formulario no te avisa cuando alguien escribe, lo que pagaste para traer a esa persona se pierde ahí.» La entradilla de la portada no cambia | «El anuncio en Google, el post en Instagram, la respuesta de ChatGPT cuando alguien pregunta por tu rubro. Todos mandan a la persona al mismo lugar. Si ese lugar no explica…» |
| `oferta-v3.json`, `momentos[0].planes[0].puntos` | `/servicios/desarrollo-web/`, Página de Campaña | panel en todos | Tercer punto nuevo: «Panel donde cambias textos y fotos» (después de «Diseño a medida…», antes de «SEO técnico…») | 4 puntos, sin panel |
| `oferta-v3.json`, `momentos[0].planes[1].puntos` | ídem, Sitio Esencial | panel en todos | Segundo punto nuevo: «Panel donde cambias textos y fotos» (después de las páginas, en el mismo lugar que el CMS del Sitio Completo) | 4 puntos, sin panel |
| `planes[2]` y `planes[3]` | Sitio Completo y Plataforma a Medida | panel en todos | **Sin cambio**: el Completo ya dice «Blog o CMS que administras tú» y la Plataforma abre con «Todo lo del Sitio Completo, y más» | |
| `OFERTAS[0]` y `[1]` de `desarrollo-web.astro` (JSON-LD, `Offer.description`) | el grafo de la página | panel en todos | Campaña: «…con SEO técnico y medición desde el primer día y un panel donde cambias textos y fotos. Entrega en ~1 semana.» Esencial: «Home y hasta 5 páginas, panel donde cambias textos y fotos, SEO técnico base, un idioma. Entrega en ~3 semanas.» | sin el panel |
| `dw.planes.lista` | (registro, no se pinta) | panel en todos | Campo `nota` nuevo con lo de arriba, porque `oferta-v3.json` no tiene dónde llevar el porqué | |

**Ningún importe cambió.** En `oferta-v3.json` son dos líneas añadidas a dos listas `puntos`; ningún `p` ni `items[].p` se tocó.

### 6.2 · El punto del panel: por qué esas palabras

- **Las del glosario de la misma página:** «CMS: el panel donde cambias textos, fotos o artículos sin tocar el código».
- **Sin «artículos»:** la Página de Campaña y el Sitio Esencial no traen blog, y la palabra lo prometería.
- **Sin «sin tocar el código»:** la primera versión lo llevaba y en la captura a 1440 el punto partía en dos líneas, cuando
  casi todos los demás son de una. Lo dice el glosario justo arriba de las tarjetas. Con «Panel donde cambias textos y fotos»
  queda en una línea a 1440 y a 390.
- **El registro de la lista:** sustantivo al frente, sin punto final, en tú, como «Blog o CMS que administras tú».
- **El `.astro`:** el texto de la obra no se escribe a mano en un `.astro`, pero las cuatro descripciones de `Offer` ya vivían
  escritas en `desarrollo-web.astro` (las señales de Simón, `senales-obra.md` §2.7) y la regla del encargo es que el JSON-LD
  diga lo mismo que lo visible. Cambié solo esas dos cadenas y el comentario de arriba. Si Diego o Simón prefieren que salgan
  de `puntos`, es suyo.

### 6.3 · Verificación

| Qué | Cómo | Resultado |
|---|---|---|
| Texto con huella | `node e13/herramientas/extraer-texto.mjs home nosotros servicios desarrollo-web` y después `--comprobar` | **16 de 16 «igual»**, sale con 0 |
| Build | Copia con `git archive HEAD spindlelab-astro` + los archivos cambiados (comparada con `diff -rq` contra `src/` y `public/`), `node_modules` enlazado, `npm run build`. La de `1f02ece6`, igual, para comparar | 22 páginas, sin errores; pasan los guardianes (precios, nombres, largos, orden de servicios, «Siguiente», las 4 filas de `.int-par`) |
| Importes | Script que saca todo monto (`$…`, `/mes`, `minPrice`, `NNN.NNN`) de los 30 `.html`/`.txt`/`.xml` de los dos `dist` | **138 y 138; 0 archivos con diferencia** |
| Qué cambió en el `dist` | Comparación archivo por archivo, con el nombre de los `hoisted.*.js` normalizado | Contenido distinto solo en `/`, `/nosotros/`, `/servicios/`, `/servicios/desarrollo-web/` y `llms.txt`. Los demás `.html` difieren solo en el nombre del `hoisted` que cargan: el minificador renombra variables de una build a otra (los `hoisted*.js` pesan 84.120 bytes en las dos; ningún `.js` fuente se tocó) |
| Barrido | `node e13/herramientas/barrer-terminos.mjs <dist> --resumen` | **Rayas: 0.** Posicionamiento anterior, «¿Listo para…?», «sin compromiso», partners, «24 horas»: 0. «Agentes de IA»: 3 (home 1, `/nosotros/` 2: título y fila), igual que antes. Total 130, igual que antes |
| WordPress | El barrido no tiene regla para él; `grep -i wordpress` sobre el `dist` | **2, los dos en `/servicios/desarrollo-web/`:** la pregunta `dw.faq.1.p` a la vista y la misma en el `FAQPage`. Se quedan (ver 6.1). **Blog: 0.** En el build de `1f02ece6` eran 5: la home, `/servicios/`, `llms.txt` y estos 2. «sin plantillas»: 0 |
| JSON-LD | `JSON.parse` de cada bloque del `dist` | 45 bloques, 0 errores; las `Offer` de Campaña y Esencial dicen el panel, igual que sus tarjetas |
| `verificar` | `node scripts/verificar.mjs --excluir /privacidad/`, a 390 y con `--ancho 1440` | 22 páginas, **«Sin hallazgos»** las dos, salen con 0 |
| Peso de la home | `node e13/herramientas/peso-30oct.mjs <url>` sobre los dos `dist` servidos en local | Build de `1f02ece6`: 1.398,9 kB (calibra con la medición del acta). **Ahora: 1.398,8 kB** primera carga a 1440 (≤ 1.400; margen 1,2 kB) · 1.561,6 recorrida (≤ 1.600) · 755,5 a 390 (≤ 950) |
| Alto de la home | Playwright, aviso contestado | 7.438 px a 1440 y 8.951 a 390 (techos 7.800 y 9.300). Bajó: la sección 2 perdió la lista |
| A la vista | Capturas a 1440 y 390 de la sección 2, Quién está detrás, la fila de `/nosotros/`, el bloque 01 de `/servicios/` y los planes; Read de cada una | Sin desborde. El punto del panel en una línea a 1440 y a 390; las cuatro tarjetas quedan con cinco puntos |
| Protegidos | `git diff --stat 1f02ece6 --` `functions`, `_headers`, `_redirects`, `public/js`, `public/assets/js`, `Layout.astro`, `servicios-v3.json` | Vacío. El formulario, su `action` y sus `name`, sin tocar |

### 6.4 · Leído en voz alta, en el `dist`

- **(a) en la home.** El párrafo 2 termina en el plural del estudio («Construimos el sitio como el eje del negocio…») y el 3
  vuelve a él con «Responde él por cada entrega». El contraste se oye bien: el estudio construye y él responde. No repite
  nada del 2. **Una cosa para Javiera:** el párrafo 3 queda con dos veces dos puntos («Responde él por cada entrega:» y «dos
  herramientas abiertas:»), el tic que Ramón rechazó el 23-sep. No lo toqué porque las dos frases están fijadas (A1 tal cual,
  y las herramientas se conservan). Si la lectura en frío lo nota, lo más barato es el segundo: «También construyó dos
  herramientas abiertas, un chequeo que… y otro para…». Eso se le pregunta a Ramón antes de cambiarlo.
- **(a) en `/nosotros/`.** La fila se sostiene sola. Su título, «Agentes de IA, con su revisión», sigue nombrando primero la
  herramienta mientras la descripción ahora parte por quién responde. No estaba en lo decidido y no lo cambié. Si los
  lectores siguen tropezando ahí, ese título es lo siguiente que hay que mirar.
- **7A.** La sección 2 se sostiene sin la lista. El h2 dice la premisa, el párrafo lo que se pierde, las columnas por qué el
  sitio es tuyo y el cierre «Por eso partimos por el sitio». «Esa persona» se apoya en el «alguien» de la misma oración y se
  entiende. Un eco leve: «lo que haces» sale en el h2 y en la primera línea del párrafo, con dos sentidos. En voz alta se nota
  poco y es la frase de Ramón tal cual.
- **El plural.** Calza con el título de la fila («Probado primero en lo nuestro», que ya era plural) y con «Construimos su
  sitio» del caso de abajo. La home queda sin ningún «yo».
- **C1.** La home y `/servicios/` dicen lo mismo, más corto. «Con un panel para que edites tú» queda respaldado ahora por la
  tarjeta de cada plan.

### 6.5 · Lo que queda abierto

- **La QA exprés y la lectura en frío** de lo cambiado (`lectura-fria-texto.mjs` + `lectura-fria.py`, como pedía
  `construccion-30oct.md` §6). No la corrí: es de Javiera, en contexto limpio, y la orquestadora la asigna.
- **«En todos los planes»** (`dw.incluye.*`, en `/servicios/desarrollo-web/`) no nombra el panel. Ahora que viene en todos,
  ese sería su lugar natural. Ramón lo pidió plan por plan y así quedó; sumarlo ahí es una pregunta, no un cambio de oficio.
- **`lista-publicacion.md`** (fila 8, «(30-oct, abierto)») sigue diciendo que estas preguntas están abiertas. La pone al día
  quien la lleva.
- **Fuera de la obra, para la troncal:** la skill `cotizaciones` (`.claude/skills/cotizaciones/SKILL.md`, método, paso 1)
  lista el panel entre lo que «cambia el precio». Con la decisión de Ramón, eso ya no es así para Desarrollo web.
- **El corte** no lo armé ni se publicó nada.
