/**
 * Los 12 puntos del Art. 14 ter: qué decide el módulo sobre políticas REALES.
 *
 * Cubre `verificaycumple/functions/api/doce-puntos.js` (rama `laboratorio/ley-21719`).
 *
 * Lo que se guarda acá son cinco políticas de verdad, bajadas el 25-sep-2026 con el mismo lector
 * que usa el chequeo, y la tabla de lo que el módulo dice de cada una punto por punto. La tabla
 * está comparada a mano contra el texto de cada política, no contra lo que el código devolvía:
 * es lo que un lector humano diría de esas cinco páginas.
 *
 * QUÉ SE GUARDÓ Y QUÉ NO. De cada política se guarda su TEXTO VISIBLE completo y literal, que es
 * lo que el módulo lee. No se guarda el HTML entero, que suma 1,9 MB entre las cinco (wolfenson
 * sola pesa 758 KB de tema de Wix). Donde el HTML importaba, se guarda también esa parte:
 *   - spindlelab.cl: la marca del correo que Cloudflare ofusca (`data-cfemail`). En el texto
 *     visible ese correo aparece como "[email protected]", que no es un correo, así que sin la
 *     marca el punto c) salía como que no hay medio de contacto en una política que lo da cuatro
 *     veces.
 *   - falabella.com: un tramo literal de 7 KB del JSON donde viaja su política. Es la mitad del
 *     caso: el texto visible no tiene nada y el código lo tiene todo.
 * Las direcciones quedan anotadas para poder volver a bajarlas y rehacer la tabla.
 *
 * Se corre con `node prueba-doce-puntos.mjs`. Sin runner y sin dependencias, como las demás.
 *
 * La carpeta del código se pasa por `VYC_SITIO` (la carpeta `verificaycumple/`). Sin ella se
 * busca dentro del repo con `rutas.mjs`, que imprime cuál eligió. Hasta el 26-sep la ruta
 * estaba escrita a mano y apuntaba a un worktree bajo /tmp, que el sistema borra solo.
 *
 * OJO, Y ES LO QUE HAY QUE SABER DE ESTE ARCHIVO: todo lo de acá afirma la forma ANIDADA de la
 * respuesta (`cuerpo.seccion.…`) contra el mismo código que la produce, así que no puede decir
 * nada sobre si la portada la sabe leer. El 26-sep no la sabía leer, la sección salía vacía en
 * producción, y estas comprobaciones pasaban igual. Quien cuida esa costura es
 * `prueba-portada-doce.mjs`, que levanta index.html en un navegador de verdad. Si cambias la
 * forma de esta respuesta, esa es la que tiene que seguir pasando.
 */

import path from 'node:path';
import { rutaEnElRepo } from './rutas.mjs';

const SITIO = process.env.VYC_SITIO
  || path.dirname(rutaEnElRepo('verificaycumple/index.html', 'VYC_INDEX_HTML'));
const doce = await import(SITIO + '/functions/api/doce-puntos.js');

let ok = 0, malo = 0;
// Minúsculas y sin tildes, para comparar frases sin pelear con la acentuación. Se escribe con
// \p{M} y no con el rango de combinantes: ese rango, escrito a mano, deja caracteres invisibles
// en el archivo (ver la nota del repo sobre Write y los escapes Unicode).
const llano = (s) => (s || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

const eq = (n, r, e) => {
  if (JSON.stringify(r) === JSON.stringify(e)) ok++;
  else { malo++; console.log(`  FALLA ${n}: esperado ${JSON.stringify(e)}, real ${JSON.stringify(r)}`); }
};

/* ================================================================== *
 * Las cinco políticas reales.                                        *
 * ================================================================== */

const POLITICAS = {
  'spindlelab.cl': {
    url: 'https://spindlelab.cl/privacidad/',
    texto: `Política de privacidad · SpindleLab

SpindleLab.

Soluciones

Método

Nosotros

Evidencia

Blog

Contacto

Diagnóstico gratis

Inicio

Política de privacidad

Política de privacidad

Art. 14 ter, punto por punto

Qué hacemos con tus datos

Versión 1.4, actualizada el 22 de septiembre de 2026.

Esta página explica, sin rodeos, qué datos procesamos en spindlelab.cl, para qué, y con
quién los compartimos, siguiendo los mismos 12 puntos que exige la Ley 21.719 para
cualquier sitio que trate datos personales.

01 · Política de tratamiento

Esta política

Versión 1.4, actualizada el 22 de septiembre de 2026, cuando sumamos a esta política el conteo de visitas sin cookies de Cloudflare, que funcionaba desde antes y no estaba escrito acá. La 1.3, del mismo día, es cuando Google Analytics dejó de cargarse antes de que aceptes. Hasta la 1.2 se cargaba igual con el consentimiento denegado, y le mandaba a Google un aviso sin cookies de cada página vista. La 1.2 (el control para cambiar la decisión) y la 1.1 son del mismo día; la 1.0 es del 21 de septiembre. Si la cambiamos, actualizamos esta fecha.

02 · El responsable

Quién trata los datos

SpindleLab SpA, RUT 78.474.925-8, representada por su fundador Ramón Vallejos Espíndola.

03 · Medio de contacto

Cómo escribirnos

Para cualquier solicitud relacionada con esta política o con tus datos: [email protected].

04 · Categorías de datos

Qué procesamos, y para qué

Si escribes el formulario de contacto: tu nombre, correo, sitio web y el mensaje que escribas, más los parámetros UTM de la campaña que te trajo (si vienes de un anuncio). La base de legitimidad es tu propia solicitud, y te pedimos un acto de consentimiento explícito (una casilla, sin marcar por defecto) antes de que el formulario se pueda enviar.

Además, si nos das permiso, en todas las páginas del sitio usamos Google Analytics (GA4) y Meta Pixel para entender cómo se usa el sitio. Cómo te lo pedimos y cómo cambiarlo, en el punto 11.

Y contamos las visitas con Cloudflare Web Analytics, que no usa cookies ni guarda nada en tu navegador. Registra qué página se vio, desde qué sitio llegaste, el país, el tipo de dispositivo, el navegador y cuánto tardó en cargar, y lo vemos siempre sumado, sin saber quién eres. Este conteo corre aunque rechaces las cookies, justamente porque no las usa.

05 · Medidas de seguridad

Cómo se procesa

El sitio se sirve por HTTPS. El formulario de contacto se procesa a través de un proveedor externo (web3forms.com) y llega directo a nuestro correo. No mantenemos una base de datos propia con las respuestas.

06 · Los cinco derechos

Acceso, rectificación, supresión, oposición y portabilidad

Puedes ejercerlos escribiendo a [email protected]. Respondemos directamente, sin formularios adicionales.

07 · Recurrir ante la Agencia

Si no te respondemos, o no estás conforme

Puedes recurrir ante la Agencia de Protección de Datos Personales.

08 · Transferencias internacionales

Con qué proveedores externos trabajamos

El formulario de contacto se procesa a través de web3forms.com, con infraestructura fuera de Chile. Google Analytics y Meta Pixel también procesan datos de navegación en servidores fuera de Chile, bajo las políticas de privacidad propias de Google y Meta. El sitio se sirve a través de la infraestructura de Cloudflare, con centros de datos fuera de Chile: como con cualquier sitio web, Cloudflare procesa metadatos técnicos de conexión (por ejemplo tu dirección IP) para entregarte la página, y es también quien hace el conteo de visitas. No compartimos tus datos con nadie más.

09 · Plazo de conservación

Cuánto tiempo se guarda

Los mensajes del formulario se conservan en nuestro correo mientras sean relevantes para la conversación que iniciaste, o hasta que pidas su eliminación. Los datos que procesan Analytics, Meta y el conteo de visitas de Cloudflare siguen la retención propia de esos proveedores, no la nuestra.

10 · Origen de los datos

De dónde salen

Directamente de ti: lo que escribes en el formulario, o tu navegación por el sitio.

11 · Revocar el consentimiento

Sobre pedirte permiso

Puedes elegir no marcar la casilla de consentimiento del formulario. En ese caso no vamos a poder procesar tu solicitud, pero puedes escribirnos directo a [email protected] en su lugar.

Para Google Analytics y Meta Pixel te preguntamos antes. La primera vez que entras
al sitio aparece un aviso abajo con dos opciones, aceptar o rechazar, y hasta que elijas
no se carga ninguno de los dos: tu navegador no descarga ni el archivo de Analytics ni
el Pixel de Meta.

Si rechazas, o mientras no elijas, siguen sin cargarse. Google Analytics y Meta no
reciben nada de tu visita desde este sitio, y no se guarda ninguna cookie de medición
en tu navegador. Lo único que sigue corriendo es el conteo de visitas de Cloudflare del
punto 04, que no usa cookies ni te identifica, y por eso no necesita tu permiso.

Puedes cambiar de opinión cuando quieras. Al final de cualquier página, junto al
enlace a esta política, hay un control que dice qué elegiste (Cookies: aceptadas
o Cookies: rechazadas) y que abre el mismo aviso para que elijas de nuevo.

Si pasas de aceptar a rechazar, tres cosas ocurren ahí mismo: le decimos a
Analytics que deje de usar cookies, borramos del navegador las cookies que dejaron
Analytics y el Pixel (_ga, _gid, _gcl,
_fbp y las de su familia), y recargamos la página un par de segundos
después, avisándote antes. Lo último es necesario: ni Analytics ni el Pixel de Meta se
pueden descargar una vez que arrancaron, y en esos segundos Analytics todavía puede
mandar un aviso sin cookies. La recarga es lo que los saca de verdad, porque la página
nueva ya no los carga. Y si después de rechazar vuelves con el botón Atrás a una
página que había quedado abierta con ellos corriendo, esa página también se recarga.

Aviso honesto: tu decisión se guarda en el navegador con el que
entraste, así que es por navegador y por dispositivo. Si entras desde otro, o si borras
los datos del sitio, te vamos a preguntar de nuevo. En una ventana privada se
recuerda hasta que la cierres. Y si tu navegador no nos deja guardar nada (por ejemplo,
con la opción de bloquear todas las cookies), la decisión se aplica pero no se puede
recordar: vale en la página donde la tomaste y te la volvemos a preguntar en la
siguiente. Te lo decimos en pantalla en vez de fingir que quedó. También puedes
bloquear los dos con una extensión, por ejemplo uBlock Origin. Y si tenías otra
pestaña de este sitio abierta, ahí borramos las cookies al momento pero no la
recargamos solos, por si estabas escribiendo algo: hasta que la recargues, los dos
siguen cargados en esa pestaña: al Pixel le retiramos el permiso y deja de mandar datos,
pero Analytics todavía puede mandar avisos sin cookies mientras esa pestaña siga
abierta. Te lo dejamos avisado en pantalla, con un botón para recargarla; el aviso no se
borra solo, lo cierras tú.

12 · Decisiones automatizadas

No hay ninguna

Nada en este sitio toma decisiones automatizadas que te afecten a ti o a tu empresa.

Esto describe lo que hacemos, no reemplaza asesoría legal. Si tienes dudas sobre cómo esta ley aplica a tu propio caso, esa evaluación corresponde a un abogado.

SpindleLab.

Soluciones

Auditoría SEO Técnica

Visibilidad en IA (AEO/GEO)

Acompañamiento Mensual

Gestión de Redes Sociales

Paid Media (Google)

Desarrollo Web

Sitio

Nuestro Método
Nosotros

Chequeo gratis

El Taller

Contacto

Contacto

Santiago, Chile

[email protected]

© 2026 SpindleLab. Todos los derechos reservados.
Política de privacidad
SEO técnico · AEO/GEO · Chile

Usamos Google Analytics y Meta Pixel para entender cómo se usa este sitio. Puedes aceptarlos o rechazarlos. Más detalle en la política de privacidad.

Rechazar
Aceptar`,
  },
  'wolfenson.cl': {
    url: 'https://www.wolfenson.cl/aviso-legal',
    texto: `Aviso Legal y Política de Privacidad - Wolfenson Abogados

top of page

NUESTRO ESTUDIO

ÁREAS DE PRÁCTICA

ABOGADOS

PRENSA

CONTACTO

 

Use tab to navigate through the menu items.

© Copyright

PRO BONO

MÉTODO

LA FIRMA

Aviso Legal y Política de Privacidad

El propósito de este sitio es proporcionar información general sobre Wolfenson Abogados (en adelante, “Wolfenson” o el “Estudio”) a clientes, potenciales clientes, estudiantes de derecho y otras personas que consideren una carrera en Wolfenson.

​

Este sitio no tiene la intención de proporcionar ni debe interpretarse como asesoría legal para ningún propósito.

​

La presentación de información en el sitio, su recepción, o el envío de una comunicación o consulta electrónica a través del sitio no creará una relación abogado/cliente con Wolfenson ni con ningún abogado del Estudio.

​

La información proporcionada en este sitio puede no ser la más actual ni completa respecto a temas o desarrollos legales. Por lo tanto, cualquier persona que reciba información de este sitio no debe actuar ni abstenerse de actuar basándose en dicha información sin antes buscar asesoría legal competente en la jurisdicción correspondiente. Wolfenson rechaza expresamente toda responsabilidad basada en cualquier información contenida en este sitio.

​​

Wolfenson no es responsable ni necesariamente respalda el contenido de terceros que pueda accederse o estar disponible a través de este sitio. Tampoco es responsable de las prácticas, incluidas las relativas a la privacidad de datos, de sitios de terceros accesibles a través de este sitio.

Wolfenson mantiene sus oficinas en Santiago de Chile. Las jurisdicciones en las que nuestros abogados están autorizados, admitidos o licenciados para ejercer se indican en la sección “Abogados” de este sitio.

​

Podemos monitorear el uso de este sitio y registrar las direcciones IP de los usuarios. Esta información es recopilada por el Estudio o sus agentes para fines internos únicamente y no será divulgada salvo que lo exija la ley. Todas las comunicaciones por correo electrónico con el personal o representantes del Estudio a través de cuentas de correo electrónico proporcionadas por el Estudio están sujetas a monitoreo y revisión conforme a nuestras políticas y la legislación aplicable.

​

En el curso normal de nuestras actividades, podemos recopilar información suya. Gran parte de los datos que recopilamos son información comercial, pero algunos pueden incluir datos personales que recibimos directamente de usted o de terceros como resultado de su relación con miembros de nuestro estudio o nuestros clientes. Ocasionalmente, también podemos contactarlo con memorandos legales, información sobre seminarios y otras publicaciones.

​

Aviso a residentes de la UE / Sujetos de datos bajo el RGPD: Como sujeto de datos bajo el Reglamento General de Protección de Datos (RGPD), usted tiene varios derechos respecto de sus datos personales. Usted puede:

acceder y obtener una copia de sus datos a petición;

requerir que corrijamos datos incorrectos o incompletos;

requerir que eliminemos o dejemos de procesar sus datos en ciertas situaciones, por ejemplo, cuando los datos ya no sean necesarios para el propósito del procesamiento; y

oponerse al procesamiento de sus datos cuando nos basamos en intereses legítimos como fundamento legal del procesamiento.

​

Si desea ejercer alguno de estos derechos, envíenos un correo electrónico a: contacto@wolfenson.cl. 

​

Tenga en cuenta que, en ciertas circunstancias, podemos compartir sus datos con terceros (como proveedores de servicios de TI) que nos prestan servicios, o con otros asesores profesionales en el contexto de un asunto que le involucre a usted o a su empleador y respecto del cual estemos o podamos estar involucrados. Debemos tener una base legal para procesar sus datos, y lo hacemos cuando es necesario para cumplir con nuestras obligaciones contractuales o legales, o por motivos de nuestros intereses legítimos.

​

Por favor, no utilice ninguna información de este sitio para distribuir correos electrónicos publicitarios masivos no solicitados o solicitudes. Cualquier uso de esta información con dichos fines constituye una violación de estos Términos de Uso.

Política de Transacciones: Toda transacción nacional o internacional realizada a Wolfenson Abogados por concepto de honorarios, montos dados en administración y/o intermediación, deben considerar y adicionar los montos asociados al pago de impuestos obligatorios en Chile. En particular, los dineros enviados deben considerar siempre (y a lo menos de forma provisoria) el Impuesto al Valor Agregado (IVA), cuya tasa vigente corresponde a la fecha al 19%. Por tanto, los montos proporcionados deben incluir los impuestos y tasas legales, facultando a la firma retener los montos que correspondan, cuestión que el cliente acepta al contratar los servicios de la firma. En caso de anulación de transacción nacional o internacional, la devolución de dineros se realizará hasta en 12 cuotas a discreción de la firma.

​

Puede consultar sobre nuestro Estudio por escrito, llamando o contactando a la persona correspondiente en Wolfenson, o enviando un correo electrónico a: contacto@wolfenson.cl.

​

En Wolfenson Abogados (“Wolfenson”), nos comprometemos firmemente a respetar y proteger la privacidad de quienes visitan nuestro sitio web. Usted no está obligado a proporcionar información personal para navegar en nuestro sitio. No obstante, puede optar por contactarnos a través del formulario disponible en la sección “Contacto”, caso en el cual se le solicitará su nombre y dirección de correo electrónico, y se le pedirá que acepte expresamente esta política de privacidad.

​

La información personal que proporcione será tratada exclusivamente con el fin de gestionar su consulta y brindarle una respuesta adecuada. No compartiremos sus datos personales con terceros, salvo cuando sea estrictamente requerido por la ley o por autoridades competentes.

​

Wolfenson también podrá utilizar sus datos de contacto para enviarle información sobre seminarios, publicaciones jurídicas, novedades legales u otros contenidos que puedan ser de su interés. Sin embargo, esto solo ocurrirá si usted ha otorgado su consentimiento expreso. En ningún caso será incluido automáticamente en listas de distribución sin su autorización previa. Asimismo, usted podrá suscribirse voluntariamente a nuestras alertas legales en la sección correspondiente de nuestro sitio web.

​

Wolfenson adopta medidas técnicas y organizativas razonables para proteger los datos personales que usted proporcione a través de este sitio contra accesos no autorizados, uso indebido, pérdida o destrucción.

​

Usted podrá ejercer los derechos que le reconoce la legislación vigente en materia de protección de datos, incluyendo el acceso, rectificación, cancelación, oposición, limitación del tratamiento y portabilidad, contactándonos a través del correo electrónico: contacto@wolfenson.cl.

​

Todos los contenidos publicados en este sitio web, incluyendo, pero no limitado a, textos, documentos, imágenes, gráficos, logotipos, videos y cualquier otro material, son propiedad de Wolfenson Abogados o de sus respectivos licenciantes. Su reproducción, distribución, transformación, adaptación, comunicación pública o cualquier otro uso, total o parcial, con o sin fines comerciales, queda estrictamente prohibido sin autorización previa, expresa y por escrito de Wolfenson.

​

El presente disclaimer se considera incorporado por referencia en cada contrato firmado con Wolfenson Abogados. 

​

2019–2025 Wolfenson Abogados. Todos los derechos reservados. Se prohíbe la reproducción o retransmisión del contenido de este sitio sin el consentimiento previo por escrito de la firma.​​

Wolfenson

Abogados

Wolfenson

Av. El Golf 40, Piso 12, Las Condes, Santiago.

Email. contacto@wolfenson.cl Tel. +56 2 2933 0384 / +56 9 9884 1289

​Aviso Legal / Política de Privacidad

Copyright 2026 Wolfenson. Todos los Derechos Reservados.

bottom of page`,
  },
  'jaukencosmetica.cl': {
    url: 'https://jaukencosmetica.cl/privacy-policy/',
    texto: `Política de privacidad - Jauken Cosmética Natural







Ir al contenido

Inicio

Nosotros

Contacto

Tienda

Inicio

Nosotros

Contacto

Tienda

Política de privacidad 

Política de Privacidad Fitocosmética Juaken Limitada

TÉRMINOS Y CONDICIONES

Te damos la Bienvenida a Fiocosmética Jauken Limitada  En adelante “Jauken” o “www.jauken.cl”.

Las transacciones que se efectúen a través de www.jauken.cl quedan sujetas a los presentes términos y condiciones.

Estos términos y condiciones deben ser aceptados como requisito para comprar en www.jauken.cl. Por lo anterior se entiende que cualquier persona que compre en jauken.cl conoce y acepta todas y cada una de las condiciones descritas a continuación.

Términos y Condiciones

Métodos de pago

FORMAS DE PAGO. Mediante Webpay. En la modalidad de Webpay las ventas se realizan de acuerdo al proceso normal de una tienda virtual, que incluye certificados de seguridad SSL.

Envío

ENTREGA DEL PEDIDO. Como norma general, el plazo de entrega máximo de los productos a la empresa de transporte es de 10 días hábiles desde la formalización del pedido. Este plazo puede ser inferior y se realizaran los máximos esfuerzos para disminuirlo.
El producto se envía embalado en caja de cartón y acolchado, si el producto así lo requiere. En el interior se adjunta toda la documentación relativa a la venta y el envío se realiza a través de Correos de chile o bluexpress .

Cambios y devoluciones

POLÍTICA DE DEVOLUCIONES. Todas las devoluciones se deben reclamar dentro del plazo de 2 días desde la fecha de recepción. La devolución podrá efectuarse siempre que se encuentre en el envoltorio original, con las etiquetas originales del producto, y no se aprecie el uso o deterioro de este. El producto no debe haber sido utilizado, lavado o alterado de ninguna forma. No se aceptarán reclamaciones pasadas 24 horas de la fecha de recepción de la mercancía, ya que, según las condiciones impuestas por las empresas de transporte, todas las reclamaciones relativas a roturas o pérdidas deben ser comunicadas a la empresa de transporte correspondiente  por teléfono o por e-mail en el plazo indicado anteriormente, incluyendo fotos digitales y una descripción detallada del problema detectado. Puede contactarse con nosotros de lunes a viernes de 10:00h a 17:00hrs. llamando al número de teléfono +56 974978133 o por e-mail a jauken.cosmetica@gmail.com. Para cualquier devolución que no tenga como causa, desperfecto o error de Jauken, los portes de ida y vuelta correrán a cargo del cliente. Es imprescindible que el artículo se devuelva en las mismas condiciones que se ha efectuado la entrega, de lo contrario no podrá ser devuelto. Todo desperfecto será reposicionado sin coste alguno por el cliente. En el caso de no querer la reposición todos los gastos de recogida y envío correrán a cargo del cliente. La devolución o cancelación total o parcial de cualquier pedido una vez entregado, por causas ajenas a Juaken, será penalizada con un 35% del total de la factura en concepto de gestión, igualmente los portes tanto de ida como de vuelta le serán facturados al cliente. Jauken dispone de una ventana de contacto en la página web para que los clientes nos hagan saber sus requerimientos. No se aceptarán devoluciones sin la previa autorización de Jauken. La ausencia de reclamación en la forma y plazo determinados anteriormente constituye la tácita aceptación del producto.
Con respecto a las devoluciones de dinero, solo se realizan al mismo medio de pago utilizado por el cliente.

Información adicional

CONDICIONES GENERALES DE VENTA y COSTOS DE ENVÍO. Como norma general, los precios del transporte, (envío del producto) indicados incluyen el transporte hasta el domicilio del cliente en Chile según la nómina de ciudades del país desplegada en el proceso de compra en www.jauken.cl. Por lo tanto, cualquier pedido realizado con una dirección de entrega que no esté reflejada en los perfiles de envío de esta tienda, será nulo. Es de absoluta responsabilidad del cliente indicar de forma correcta y clara la dirección de despacho en el proceso de compra en el sitio de Jauken Y, por tanto, Juaken no se responsabiliza por envíos a direcciones erróneas en base a la información entregada por el cliente.
PRECIOS. Cada producto ofrecido tendrá indicado su precio y si tiene incorporado el IVA, para el caso de las ventas nacionales, o cualquier otro impuesto que en su caso sea de aplicación. Los precios indicados en pantalla serán los vigentes en cada momento. Jakuen. se reserva el derecho de hacer modificación de precios.

OFERTA DE PRODUCTOS. Jauken se reserva el derecho a retirar, reponer o cambiar los productos que se ofrecen a sus clientes a través de su página web, mediante el simple cambio en el contenido de las mismas. Así mismo, Jauken tendrá la facultad de dejar de ofrecer, sin previo aviso y en cualquier momento, el acceso a los productos mencionados.

TERMINOS Y CONDICIONES GENERALES; Jauken se reserva el derecho a cancelar, variar o suspender la operación de venta o alquiler si se suceden situaciones que están fuera de su control como incendio, inundaciones, tormentas, derrumbes, disturbios, hostilidades, indisponibilidad de materiales y cualquier otro factor fuera del control, no haciéndose cargo de cualquier situación negativa que esto provoque. Jauken se compromete a hacer un esfuerzo por tratar de mostrar los colores lo más realistas posibles. De todos modos, dados los diferentes contrastes de reproducción digital en los diferentes navegadores, Jauken no garantiza la definición exacta del color. Todos los artículos de la web tienen medidas y colores que dan una aproximación de la realidad, pero no son 100% exactos.

Jauken se reserva el derecho a realizar las modificaciones que considere oportunas, sin aviso previo, en las Condiciones Generales. Dichas modificaciones podrán realizarse, a través de su sitio web, por cualquier forma admisible en derecho y serán de obligado cumplimiento durante el tiempo en que se encuentren publicadas en la web y hasta que no sean modificadas válidamente por otras posteriores. Una vez generada la compra aceptando las condiciones de contratación el cliente recibirá un correo electrónico con los detalles de facturación y numero de envío con el cual podrá rastrear su producto en el sitio web de la empresa de transporte correspondiente en todo momento. La confirmación del pedido y el comprobante de compra (impresión que hace el usuario) no tendrán validez como factura.

PROTECCIÓN DE DATOS De conformidad con lo que establece la Ley Orgánica 19.628 de Protección de Datos de Carácter Personal, Jauken informa a los usuarios de su SITIO WEB que los datos personales recabados mediante los formularios, sitos en sus páginas, serán introducidos en un fichero automatizado bajo la responsabilidad de Jauken con la finalidad de poder facilitar, agilizar y cumplir los compromisos establecidos entre ambas partes. Así mismo, Juaken informa de la posibilidad de ejercer los derechos de acceso, cancelación, rectificación y oposición mediante un escrito a la dirección de e-mail jauken.cosmetica@gmail.com . Mientras no nos comunique lo contrario, entenderemos que sus datos no han sido modificados, que usted se compromete a notificarnos cualquier variación y que tenemos el consentimiento para utilizarlos a fin de poder fidelizar la relación entre las partes. Cabe señalar que toda la información y transacciones de nuestros clientes se encuentran protegidas, ya que nuestra página web cuenta con un Certificado de seguridad SSL.

CONDICIONES DE USO La navegación, acceso y uso por el sitio web de Juaken confiere la condición de usuario, por la que se aceptan, desde la navegación por las páginas de Juaken, todas las condiciones de uso aquí establecidas sin perjuicio de la aplicación de la correspondiente normativa de obligado cumplimiento legal según el caso. La página web de Jauken. le proporcionan gran diversidad de información, servicios y datos. El usuario asume su responsabilidad en el uso correcto de los sitios web. Esta responsabilidad se extenderá a: La veracidad y licitud de las informaciones aportadas por el usuario en los formularios extendidos por Jauken. para el acceso a ciertos contenidos o servicios ofrecidos por la web.

ENLACES Y EXENCIONES DE RESPONSABILIDAD DE Jauken. No se hace responsable del contenido de las páginas web a las que el usuario pueda acceder a través de los enlaces establecidos en su sitio web y declara que en ningún caso procederá a examinar o ejercitar ningún tipo de control sobre el contenido de otras páginas de la red. Asimismo, tampoco garantizará la disponibilidad técnica, exactitud, veracidad, validez o legalidad de páginas ajenas a su propiedad a las que se pueda acceder por medio de los enlaces.

MODIFICACIONES Jauken; Se reserva el derecho a realizar las modificaciones que considere oportunas, sin aviso previo, en el contenido de su SITIO WEB. Tanto en lo referente a los contenidos de su sitio web, como en las condiciones de uso de las mismas, o en las condiciones generales de contratación. Dichas modificaciones podrán realizarse, a través de su sitio web, de cualquier forma admisible en derecho y serán de obligado cumplimiento durante el tiempo en que se encuentren publicadas en la web y hasta que no sean modificadas válidamente por otras posteriores.

RESERVA DE COOKIES Jauken; Se reserva el derecho de utilizar cookies en la navegación del usuario por su SITIO WEB para facilitar la personalización y comodidad de la navegación.

Siguiendo la política de protección de datos de la empresa, Jauken  informa que las cookies se asocian al usuario anónimo y a su ordenador, y no proporcionan por sí el nombre y apellidos del usuario.
PROPIEDAD INTELECTUAL Los derechos de propiedad intelectual e industrial derivados de todos los textos, imágenes, así como de los medios y formas de presentación y montaje de sus páginas pertenecen, por sí o como cesionaria, a Jauken. Serán, por consiguiente, obras protegidas como propiedad intelectual por el ordenamiento jurídico Chileno, siéndoles aplicables tanto la normativa Chilena y comunitaria en este campo, como los tratados internacionales relativos a la materia y suscritos por Chile. Todos los productos y la marca Jauken están registrados o en proceso de registro en la Oficina Chilena de Patentes y Marcas. Por tanto, cualquier copia o imitación será objeto de delito. Jauken. se reserva el derecho a la presentación de denuncias relacionadas con usurpación de derechos de Propiedad Industrial.

CONTÁCTENOS

Si tienes alguna pregunta sobre los términos y condiciones, por favor no dudes en ponerte en contacto con nosotros a Jauken.cosmetica@gmail.com en la sección de contacto. 

Despacho a todo Chile 

Dentro de la región de Aysén coordinamos entrega después de la compra. 

Contacto 

+569 74978133

jauken.cosmetica

jauken.cosmetica@gmail.com

Francisco Bilbao #670, Coyhaique, Chile.

Términos y Condiciones

Jauken® es una marca registrada.
Se usa bajo licencia. 

Todos los derechos reservados. 

Número de registro 1420440 

Prohibida su reproducción 

Términos y condiciones 

Carrito de compra`,
  },
  'abogadospyme.cl': {
    url: 'https://abogadospyme.cl/nosotros-politicas-de-privacidad-y-terminos-del-servicio/',
    texto: `Políticas de Privacidad y Términos del Servicio - Abogados Pyme Chile








Search for:

Click here 




Políticas de Privacidad y Términos del Servicio 

Todas las personas son iguales ante la ley. Un buen abogado es lo que marca la diferencia. 

Políticas de Privacidad y Términos del Servicio 

En Abogados Pyme Chile, entendemos que la confianza es un pilar esencial en la asesoría legal empresarial. Por ello, este sitio web cumple con altos estándares de legitimidad, transparencia y seguridad jurídica.

Nuestra información de contacto, ubicación y servicios es clara y accesible, permitiendo a empresas y emprendedores verificar fácilmente la existencia real del estudio jurídico y su equipo profesional.

Política de Privacidad

Los datos ingresados por empresas y representantes legales son utilizados únicamente para fines de asesoría jurídica, contacto profesional y gestión de servicios legales empresariales, concursales, laborales o tributarios.

Toda la información es protegida bajo estrictos criterios de confidencialidad profesional. No se comparten datos con terceros sin autorización expresa del titular.

Términos y Condiciones

El acceso a este sitio web implica la aceptación de estos términos.
Los contenidos legales publicados son de carácter general y no constituyen asesoría legal específica sin contratación formal.

La relación abogado–cliente se configura solo mediante acuerdo expreso y aceptación de honorarios y condiciones de servicio.

Contacto profesional: https://abogadospyme.cl/contacto/ 

Noticias y artículos 





2 

Ene 





Abogado Empresas QuiebraAbogado Laboral EmpresasAbogadosNoticias 


Abogado de empresa en Chile: qué hace y cuánto cobra para crear una sociedad 

En Ponce de León somos especialistas en derecho laboral empresarial, asesorando a pymes, sociedades y empresas en la gestión integral de sus relaciones laborales, defensa frente a demandas de trabajadores, fiscalizaciones de la Inspección del Trabajo y cumplimiento normativo, con un enfoque preventivo y estratégico conforme a la legislación laboral vigente en Chile.

Leer Más 








28 

Dic 





Abogado Empresas QuiebraAbogado Laboral EmpresasAbogadosNoticias 


Reducción de la jornada laboral a 42 horas: obligaciones y riesgos para las empresas desde abril de 2026 

En Ponce de León somos especialistas en derecho laboral empresarial, asesorando a pymes, sociedades y empresas en la gestión integral de sus relaciones laborales, defensa frente a demandas de trabajadores, fiscalizaciones de la Inspección del Trabajo y cumplimiento normativo, con un enfoque preventivo y estratégico conforme a la legislación laboral vigente en Chile.

Leer Más 








27 

Dic 





Abogado Empresas QuiebraAbogado Laboral EmpresasAbogadosNoticias 


Abogado tributario: sentencia declara prescrita una deuda tributaria millonaria 

En Ponce de León somos especialistas en derecho laboral empresarial, asesorando a pymes, sociedades y empresas en la gestión integral de sus relaciones laborales, defensa frente a demandas de trabajadores, fiscalizaciones de la Inspección del Trabajo y cumplimiento normativo, con un enfoque preventivo y estratégico conforme a la legislación laboral vigente en Chile.

Leer Más 








2 

Ene 





Abogado Empresas QuiebraAbogado Laboral EmpresasAbogadosNoticias 


Abogado de empresa en Chile: qué hace y cuánto cobra para crear una sociedad 

En Ponce de León somos especialistas en derecho laboral empresarial, asesorando a pymes, sociedades y empresas en la gestión integral de sus relaciones laborales, defensa frente a demandas de trabajadores, fiscalizaciones de la Inspección del Trabajo y cumplimiento normativo, con un enfoque preventivo y estratégico conforme a la legislación laboral vigente en Chile.

Leer Más 








28 

Dic 





Abogado Empresas QuiebraAbogado Laboral EmpresasAbogadosNoticias 


Reducción de la jornada laboral a 42 horas: obligaciones y riesgos para las empresas desde abril de 2026 

En Ponce de León somos especialistas en derecho laboral empresarial, asesorando a pymes, sociedades y empresas en la gestión integral de sus relaciones laborales, defensa frente a demandas de trabajadores, fiscalizaciones de la Inspección del Trabajo y cumplimiento normativo, con un enfoque preventivo y estratégico conforme a la legislación laboral vigente en Chile.

Leer Más 




Ver Blog 





Cristian Ponce de León
Abogado especialista en defensa judicial, compliance y asesoría estratégica a empresas y personas naturales. Su enfoque combina solidez técnica, pensamiento crítico y compromiso ético. 

Facebook-f

Twitter

Linkedin-in

Youtube

Instagram

Nuestros Servicios 







Derecho Laboral Empresa 








Insolvencia y Reorganización (Quiebras) 








Derecho Comercial 








Asesoría Previsional Empresas 








Derecho Tributario 








Propiedad Intelectual 








Derecho Penal Empresarial 








Servicios Legales 





Blog Quiebra 

Preguntas Frecuentes Quiebra de Empresa Chile

Cómo declararse en Quiebra Empresas

Declarar Quiebra Urgente

Embargos y Quiebras: Como detener los Embargos con la Quiebra

Quiebras por Deudas Bancarias

Quiebra por Deudas Laborales y Previsionales

Quiebra por Facturas Impagas

Preguntas Frecuentes Quiebra de Empresa Chile

Cómo declararse en Quiebra Empresas

Declarar Quiebra Urgente

Embargos y Quiebras: Como detener los Embargos con la Quiebra

Quiebras por Deudas Bancarias

Quiebra por Deudas Laborales y Previsionales

Quiebra por Facturas Impagas

Contacto 







Antonio Bellet 193, Oficina 1310, Providencia 















+56 9 5108 9856 












cponce@poncedeleon.cl 





AbogadosPyme.cl 

©2026 - Todos los derechos reservados. 




Customize
Reject All
Accept All

Powered by 

✖

►
Necessary Cookies 

Always Active 

Necessary cookies enable essential site features like secure log-ins and consent preference adjustments. They do not store personal data. 

None

►
Functional Cookies
Remark

Functional cookies support features like content sharing on social media, collecting feedback, and enabling third-party tools. 

None

►
Analytical Cookies
Remark

Analytical cookies track visitor interactions, providing insights on metrics like visitor count, bounce rate, and traffic sources. 

None

►
Advertisement Cookies
Remark

Advertisement cookies deliver personalized ads based on your previous visits and analyze the effectiveness of ad campaigns. 

None

►
Unclassified Cookies
Remark

Unclassified cookies are cookies that we are in the process of classifying, together with the providers of individual cookies. 

None

Reject All
Save My Preferences
Accept All

Powered by 

Nuestros Abogados te estan esperando.`,
  },
  'falabella.com': {
    url: 'https://www.falabella.com/falabella-cl/page/comprar-politica-privacidad',
    texto: `Políticas de privacidad | falabella.com

Menú

Search Bar

Hola,

Inicia sesión

Micuenta

0

location-icon
Ingresa tu ubicación

Venta EmpresasVende en falabella.com

Tarjetas y cuentas

Novios

Ayuda

Home
Políticas de privacidad

Loading...

Política de Privacidad de Mi Cuenta

En Falabella Retail, Sodimac y Tottus consideramos la protección de tus datos personales como parte de nuestra propuesta de valor. En ese marco, y en el contexto de acceso a nuestros Canales Digitales mediante la creación de un perfil en Mi Cuenta, tratamos tus datos personales de conformidad con la Regulación de Protección de Datos.

Por ello, en esta Política de Privacidad damos a conocer cómo se tratan los datos personales de los Titulares y los derechos que tienen sobre sus datos personales. Esta Política de Privacidad se aplica a todos los datos personales de los Titulares que los Corresponsables tratan con ocasión de Mi Cuenta, desde el momento en que adquieren dicha calidad. Esta Política de Privacidad no se extiende a quienes no son Titulares.

Los datos personales de los Titulares se tratarán principalmente para crear y gestionar un perfil de Mi Cuenta para así contratar o adquirir productos, servicios y/o experiencias, así como para navegar en sus Canales Digitales.

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

right-arrow-filter-7

Te ayudamos

Contáctanos
Centro de ayuda
Devoluciones y cambios
Boletas y facturas
Estado del pedido
Concursos y bases legales
Canal de integridad - Integrity Channel
Defensoría Vendedores y Proveedores
Cómo cuidamos tus datos
Consulta tu Gift Card
Compra Gift Card

En falabella.com

Vende en falabella.com
Nuestros inversionistas
Venta empresa
Trabaja en Grupo Falabella
Cyber Monday
Cyberday
Black Friday
Black Week
Hot Sale
Crate and barrel
Americanino
Aldo
Carters

Únete a nuestros programas

Fpuntos
Novios Falabella
Club Bebé
Círculo de especialistas - Sodimac constructor

Nuestras empresas

Sobre Falabella
Sobre Sodimac
Sobre Tottus
Sodimac
Tottus
IKEA
Banco Falabella
Seguros Falabella
Mallplaza

Términos y condicionesPolítica de cookiesPolítica de privacidad

© TODOS LOS DERECHOS RESERVADOSFalabella.com SPA. Av. Presidente Riesco N°5.685, oficina 401, Santiago de Chile`,
  },
};

// Tramo literal del JSON de falabella.com donde viven sus catorce secciones. Va partido en trozos
// solo para que no sea una línea de 7 KB; se vuelve a unir tal cual.
const JSON_FALABELLA =
  "ar las autorizaciones que hayan otorgado para el tratamiento de sus datos, sin efecto retroactivo re" +
  "specto de tratamientos ya realizados.\\n\\n\\u003cbr/\\u003ePara ejercer cualquiera de estos derechos lo" +
  "s Titulares podrán utilizar cualquiera de los siguientes mecanismos: a) enviando un correo electróni" +
  "co a \\u003ca href=\\\"mailto:tusdatospersonales@falabella.cl\\\"\\u003etusdatospersonales@falabella.cl\\u0" +
  "03c/a\\u003e; \\u003ca href=\\\"mailto:misdatospersonales@sodimac.cl\\\"\\u003emisdatospersonales@sodimac.c" +
  "l\\u003c/a\\u003e o \\u003ca href=\\\"mailto:contacto@tottus.cl\\\"\\u003econtacto@tottus.cl\\u003c/a\\u003e o" +
  ", b) mediante el formulario establecido en la sección Cómo Cuidamos tus Datos en los sitios web \\u00" +
  "3ca href=\\\"https://www.falabella.com\\\"\\u003ewww.falabella.com\\u003c/a\\u003e, \\u003ca href=\\\"https://" +
  "www.sodimac.cl\\\"\\u003ewww.sodimac.cl\\u003c/a\\u003e o \\u003ca href=\\\"https://www.tottus.cl\\\"\\u003ewww" +
  ".tottus.cl\\u003c/a\\u003e.\\n\\n\\u003cbr/\\u003e\\u003cstrong\\u003e12.2. Derecho a Recurrir ante la Agenc" +
  "ia de Protección de Datos\\u003c/strong\\u003e\\n\\n\\u003cbr/\\u003eSi un Titular considera que sus solic" +
  "itudes relativas a sus datos personales no son atendidas adecuadamente por una Empresa Falabella, ti" +
  "ene derecho a reclamar ante la Agencia de Protección de Datos Personales.\"},\"desktop\":{\"question\":\"\\" +
  "u003ch4\\u003e12. Derechos del Titular como Titular de Datos Personales\\u003c/h4\\u003e\",\"answer\":\"\\u0" +
  "03cstrong\\u003e12.1. Ejercicio de derechos\\u003c/strong\\u003e\\n\\n\\u003cbr/\\u003eLos Titulares podrán" +
  " ejercer los derechos reconocidos a los titulares de datos personales en la Regulación de Protección" +
  " de Datos, los que incluyen:\\n\\n\\u003cbr/\\u003e(i) Derecho de acceso: derecho a solicitar a los Corr" +
  "esponsables información respecto de los datos personales que tratan, su origen, la finalidad del tra" +
  "tamiento, las categorías o identidad de destinatarios de los datos, el período de tiempo durante el " +
  "cual serán tratados y, si aplica, los intereses legítimos del responsable y la información significa" +
  "tiva sobre la lógica aplicada si se toman decisiones basadas en tratamiento automatizado;\\n\\n\\u003cb" +
  "r/\\u003e(ii) Derecho de rectificación: derecho de los Titulares a solicitar a los Corresponsables la" +
  " modificación de sus datos personales en caso que sean inexactos, se encuentren desactualizados o in" +
  "completos;\\n\\n\\u003cbr/\\u003e(iii) Derecho de supresión o cancelación: derecho de los Titulares a so" +
  "licitar a los Corresponsables la eliminación de sus datos personales en caso que no sean necesarios " +
  "en relación con los fines del tratamiento, en caso que el Titular haya revocado su consentimiento y " +
  "el tratamiento no tenga otro fundamento legal, o se trate de datos caducos, entre otros escenarios i" +
  "ndicados en la Regulación de Protección de Datos, todo lo anterior sujeto a las excepciones que disp" +
  "one la Regulación de Protección de Datos;\\n\\n\\u003cbr/\\u003e(iv) Derecho de oposición: derecho de lo" +
  "s Titulares a oponerse a ciertos tratamientos de sus datos personales indicados en la Regulación de " +
  "Protección de Datos, incluyendo la oposición a ser objeto de decisiones basadas en el tratamiento au" +
  "tomatizado de datos personales que produzcan efectos jurídicos o te afecten significativamente, todo" +
  " lo anterior sujeto a las excepciones que dispone la Regulación de Protección de Datos;\\n\\n\\u003cbr/" +
  "\\u003e(v) Derecho de bloqueo: derecho de los Titulares a solicitar a los Corresponsables la suspensi" +
  "ón temporal de cualquier operación de tratamiento de sus datos personales cuando formulen una solici" +
  "tud de rectificación, supresión u oposición, mientras dicha solicitud no se resuelva;\\n\\n\\u003cbr/\\u" +
  "003e(vi) Derecho de portabilidad: derecho de los Titulares a solicitar a los Corresponsables la copi" +
  "a de sus datos personales en un formato electrónico estructurado, genérico y de uso común, que permi" +
  "ta ser operado por distintos sistemas; y,\\n\\n\\u003cbr/\\u003e(vii) Derecho de revocación: derecho de " +
  "los Titulares a revocar las autorizaciones que hayan otorgado para el tratamiento de sus datos, sin " +
  "efecto retroactivo respecto de tratamientos ya realizados.\\n\\n\\u003cbr/\\u003ePara ejercer cualquiera" +
  " de estos derechos los Titulares podrán utilizar cualquiera de los siguientes mecanismos: a) enviand" +
  "o un correo electrónico a \\u003ca href=\\\"mailto:tusdatospersonales@falabella.cl\\\"\\u003etusdatosperso" +
  "nales@falabella.cl\\u003c/a\\u003e; \\u003ca href=\\\"mailto:misdatospersonales@sodimac.cl\\\"\\u003emisdato" +
  "spersonales@sodimac.cl\\u003c/a\\u003e o \\u003ca href=\\\"mailto:contacto@tottus.cl\\\"\\u003econtacto@tott" +
  "us.cl\\u003c/a\\u003e o, b) mediante el formulario establecido en la sección Cómo Cuidamos tus Datos e" +
  "n los sitios web \\u003ca href=\\\"https://www.falabella.com\\\"\\u003ewww.falabella.com\\u003c/a\\u003e, \\u" +
  "003ca href=\\\"https://www.sodimac.cl\\\"\\u003ewww.sodimac.cl\\u003c/a\\u003e o \\u003ca href=\\\"https://www" +
  ".tottus.cl\\\"\\u003ewww.tottus.cl\\u003c/a\\u003e.\\n\\n\\u003cbr/\\u003e\\u003cstrong\\u003e12.2. Derecho a R" +
  "ecurrir ante la Agencia de Protección de Datos\\u003c/strong\\u003e\\n\\n\\u003cbr/\\u003eSi un Titular co" +
  "nsidera que sus solicitudes relativas a sus datos personales no son atendidas adecuadamente por una " +
  "Empresa Falabella, tiene derecho a reclamar ante la Agencia de Protección de Datos Personales.\"}},{\"" +
  "mobile\":{\"question\":\"\\u003ch4\\u003e13. Suspensión de Envío de Comunicaciones Promocionales o Publici" +
  "tarias\\u003c/h4\\u003e\",\"answer\":\"Sin necesariamente ejercer los derechos sobre sus datos personales " +
  "de que trata la sección anterior, los Titulares pueden solicitar la suspensión del envío de comunica" +
  "ciones promocionales o publicitarias de conformidad con lo dispuesto en las normas de protección al " +
  "consumidor. Para ello pueden utilizar los canales de cancelación de suscripción incluidos en la mism" +
  "a comunicación, o bien los canales que los Corresponsables o el Servicio Nacional del Consumidor (SE" +
  "RNAC) han dispuesto para ello.\"},\"desktop\":{\"question\":\"\\u003ch4\\u003e13. Suspensión de Envío de Com" +
  "unicaciones Promocionales o Publicitarias\\u003c/h4\\u003e\",\"answer\":\"Sin necesariamente ejercer los d" +
  "erechos sobre sus datos personales de que trata la sección anterior, los Titulares pueden solicitar " +
  "la suspensión del envío de comunicaciones promocionales o publicitarias de conformidad con lo dispue" +
  "sto en las normas de protección al consumidor. Para ello pueden utilizar los canales de cancelación " +
  "de suscripción incluidos en la misma comunicación, o bien los canales que los Corresponsables o el S" +
  "ervicio Nacional del Consumidor (SERNAC) han dispuesto para ello.\"}},{\"mobile\":{\"question\":\"\\u003ch4" +
  "\\u003e14. Decisiones Automatizadas y Elaboración de Perfiles\\u003c/h4\\u003e\",\"answer\":\"Los Correspon" +
  "sables podrán tomar decisiones automatizadas sobre los datos personales de los Titulares, incluida l" +
  "a elaboración de perfiles. Ello implica que mediante procesos automatizados ciertos datos personales" +
  " de los Titulares relacionados con su uso de Mi Cuenta serán analizados para prevenir fraudes o apli" +
  "car reglas establecidas en los Términos y Condiciones de Mi Cuenta (por ejemplo, alertas, validacion";

// El texto visible vuelve a un HTML mínimo, un párrafo por línea. `extra` es lo que iba en el
// código y no en el texto.
function envolver(texto, extra = '') {
  return '<!doctype html><html lang="es-CL"><head><title>Política de privacidad</title></head><body>' +
    extra + texto.split('\n').map((l) => '<p>' + l + '</p>').join('') + '</body></html>';
}

// spindlelab.cl sirve sus correos con la ofuscación de Cloudflare: cuatro enlaces a
// /cdn-cgi/l/email-protection con su data-cfemail.
const CORREO_OFUSCADO = '<a href="/cdn-cgi/l/email-protection#325a5d" class="__cf_email__" data-cfemail="325a5d">[email&#160;protected]</a>';

const HTML = {
  'spindlelab.cl': envolver(POLITICAS['spindlelab.cl'].texto, CORREO_OFUSCADO),
  'wolfenson.cl': envolver(POLITICAS['wolfenson.cl'].texto),
  'jaukencosmetica.cl': envolver(POLITICAS['jaukencosmetica.cl'].texto),
  'abogadospyme.cl': envolver(POLITICAS['abogadospyme.cl'].texto),
  'falabella.com': envolver(POLITICAS['falabella.com'].texto,
    '<script type="application/json" id="__NEXT_DATA__">' + JSON_FALABELLA + '</script>'),
};

const REVISION = Object.fromEntries(Object.entries(HTML).map(([d, h]) =>
  [d, doce.revisarPolitica(h, { fuente: POLITICAS[d].url })]));

const MARCA = { encontrado: 'si', 'sin-confirmar': '?', 'no-encontrado': 'no' };
const tabla = (r) => r.puntos.map((p) => `${p.letra}=${MARCA[p.estado]}`).join(' ');

/* ================================================================== *
 * 1. La tabla. Leída a mano contra cada política.                     *
 * ================================================================== */

console.log('=== las cinco políticas reales, punto por punto ===');

// spindlelab.cl está escrita siguiendo los doce puntos, con su número al lado de cada sección.
// Es el único de los cinco que los cubre todos, y era lo mínimo: el sitio que vende esto.
eq('spindlelab.cl: los doce', tabla(REVISION['spindlelab.cl']),
  'a=si b=si c=si d=si e=si f=si g=si h=si i=si j=si k=si l=si');

// wolfenson.cl (Wix): un aviso legal largo y escrito a mano, con un apartado para residentes de
// la UE. Cubre bien la mitad y no menciona ni la Agencia ni las transferencias ni las decisiones
// automatizadas. No lleva fecha ni versión: el pie dice "2019-2025" y "Copyright 2026", que es
// copyright y no la fecha de la política, y el módulo no lo confunde.
//   b) queda sin confirmar: nombra al estudio y da su dirección, pero no hay RUT, razón social ni
//      representante legal, que es lo que la letra b) pide. Vimos algo, no vimos eso.
//   i) queda sin confirmar por una frase de la lista de derechos RGPD ("cuando los datos ya no
//      sean necesarios"), que va en esa dirección pero no es un plazo de conservación.
//   k) queda sin confirmar: habla de consentimiento expreso y nunca dice que se pueda retirar.
eq('wolfenson.cl: la mitad, y tres sin confirmar', tabla(REVISION['wolfenson.cl']),
  'a=no b=? c=si d=si e=si f=si g=no h=no i=? j=si k=? l=no');

// jaukencosmetica.cl: unos términos y condiciones de tienda con una cláusula de "PROTECCIÓN DE
// DATOS" copiada de una plantilla española de la LOPD, que cita la "Ley Orgánica 19.628".
// Vieja, pero cubre seis puntos de verdad.
eq('jaukencosmetica.cl: la cláusula vieja cubre seis', tabla(REVISION['jaukencosmetica.cl']),
  'a=no b=si c=si d=si e=si f=si g=no h=no i=no j=si k=? l=no');

// abogadospyme.cl: cuatro párrafos. Es la política más delgada de las cinco y el resultado lo
// muestra sin decirle a un estudio de abogados que incumple nada.
eq('abogadospyme.cl: cuatro párrafos', tabla(REVISION['abogadospyme.cl']),
  'a=no b=? c=si d=si e=? f=no g=no h=no i=no j=? k=? l=no');

// falabella.com: tiene los doce, numerados hasta el 14, y ninguno se puede leer. Las secciones
// son un acordeón que monta su contenido al abrirlo. Medido el 25-sep con la página bajada Y con
// la página ya renderizada en Chrome: 2.893 y 3.885 caracteres visibles, casi todos de menú y
// pie. Este es el caso que obliga a declinar: sin la guardia, la política mejor escrita de las
// cinco recibía doce "no encontramos mención" seguidos.
eq('falabella.com: no se puede leer, así que no se opina', REVISION['falabella.com'].legible, false);
eq('falabella.com: y se dice por qué', REVISION['falabella.com'].motivo, 'armada-con-javascript');
eq('falabella.com: los doce quedan sin confirmar',
  REVISION['falabella.com'].puntos.every((p) => p.estado === 'sin-confirmar'), true);
eq('falabella.com: ninguno sale como ausente',
  REVISION['falabella.com'].puntos.some((p) => p.estado === 'no-encontrado'), false);
eq('falabella.com: se anota qué términos estaban en el código y no a la vista',
  REVISION['falabella.com'].terminosOcultos.length >= 4, true);

for (const [d, r] of Object.entries(REVISION)) {
  // La regla 2 del encargo, en los datos y no solo en el texto: esto nunca toca el puntaje.
  eq(`${d}: no puntúa`, r.puntua, false);
  eq(`${d}: los doce puntos viajan siempre`, r.puntos.length, 12);
}

const resumen = (d) => REVISION[d].resumen;
eq('spindlelab.cl: resumen', resumen('spindlelab.cl'), { encontrados: 12, sinConfirmar: 0, noEncontrados: 0, total: 12 });
eq('wolfenson.cl: resumen', resumen('wolfenson.cl'), { encontrados: 5, sinConfirmar: 3, noEncontrados: 4, total: 12 });
eq('jaukencosmetica.cl: resumen', resumen('jaukencosmetica.cl'), { encontrados: 6, sinConfirmar: 1, noEncontrados: 5, total: 12 });
eq('abogadospyme.cl: resumen', resumen('abogadospyme.cl'), { encontrados: 2, sinConfirmar: 4, noEncontrados: 6, total: 12 });

console.log('  ' + Object.keys(REVISION).map((d) => d.padEnd(20) + (REVISION[d].legible ? tabla(REVISION[d]) : 'declina: ' + REVISION[d].motivo)).join('\n  '));

/* ================================================================== *
 * 2. Los falsos positivos que aparecieron en estas cinco páginas.     *
 *    Cada uno es una frase REAL, con su sitio y su punto.             *
 * ================================================================== */

console.log('=== frases reales que NO pueden dar un punto por cubierto ===');

const RELLENO = 'Esta es la politica de privacidad del sitio y explica el tratamiento de los datos personales de quienes lo visitan. ' .repeat(8);
const conFrase = (frase) => doce.revisarPolitica(envolver(RELLENO + '\n' + frase), {});
const estado = (r, letra) => r.puntos.find((p) => p.letra === letra).estado;

for (const [nombre, frase, letra] of [
  // jaukencosmetica.cl, cláusula de tienda. "Derecho a retirar" a secas daba por cubierta la
  // letra k) en una política que nunca dice que se pueda retirar un permiso.
  ['jauken: retirar PRODUCTOS no es retirar el consentimiento',
    'Jauken se reserva el derecho a retirar, reponer o cambiar los productos que se ofrecen a sus clientes a traves de su pagina web.', 'k'],
  // jaukencosmetica.cl, sobre el plazo de sus CONDICIONES, no de los datos de nadie.
  ['jauken: el plazo de las condiciones no es el plazo de conservación',
    'Dichas modificaciones seran de obligado cumplimiento durante el tiempo en que se encuentren publicadas en la web.', 'i'],
  // jaukencosmetica.cl. "Fichero automatizado" es de una plantilla española de los noventa y no
  // tiene nada que ver con decidir sobre una persona.
  ['jauken: un fichero automatizado no es una decisión automatizada',
    'Los datos personales recabados mediante los formularios seran introducidos en un fichero automatizado bajo la responsabilidad de Jauken.', 'l'],
  // abogadospyme.cl tiene la lista de su blog en la misma página que su política.
  ['abogadospyme: la fecha de un titular del blog no es la fecha de la política',
    'Reduccion de la jornada laboral a 42 horas: obligaciones y riesgos para las empresas desde abril de 2026.', 'a'],
  // abogadospyme.cl carga un gestor de consentimiento en inglés en la misma página.
  ['abogadospyme: el banner de cookies en inglés no cubre el retiro del consentimiento',
    'Necessary Cookies Always Active. Functional Cookies. Analytical Cookies. Reject All. Save My Preferences. Accept All. Necessary cookies enable essential site features like secure log-ins and consent preference adjustments.', 'k'],
  // El acceso de la cláusula de uso, que está en cuatro de las cinco políticas.
  ['el acceso al sitio no es el derecho de acceso',
    'El acceso a este sitio web implica la aceptacion de estos terminos y condiciones de uso.', 'f'],
]) {
  eq(nombre, estado(conFrase(frase), letra) === 'encontrado', false);
}

/* ================================================================== *
 * 3. Lo contrario, que es el error que este módulo no puede cometer:  *
 *    decir "no encontramos" sobre algo que sí está, con otras palabras.*
 * ================================================================== */

console.log('=== dicho con otras palabras, igual cuenta ===');

for (const [nombre, frase, letra] of [
  // jaukencosmetica.cl y media Chile copian plantillas mexicanas o españolas, donde el derecho de
  // supresión se llama cancelación. El brief (§2, corrección 3) dice que NOSOTROS no usemos ese
  // vocabulario; leerlo en el ajeno y entenderlo es otra cosa.
  ['cancelación cuenta como supresión',
    'Puede ejercer los derechos de acceso, cancelacion, rectificacion y oposicion mediante un escrito.', 'f'],
  // spindlelab.cl no usa la palabra "finalidad" en ninguna parte y dice para qué usa cada cosa.
  ['decir para qué sirve cuenta como finalidad, sin usar la palabra',
    'Usamos Google Analytics y Meta Pixel para entender como se usa el sitio.', 'd'],
  // abogadospyme.cl: en Chile media dirección se escribe sin la palabra calle.
  ['una dirección sin la palabra calle igual es una dirección',
    'Antonio Bellet 193, Oficina 1310, Providencia.', 'b'],
  // wolfenson.cl.
  ['decir de quién se reciben los datos cuenta como origen',
    'Algunos datos personales los recibimos directamente de usted o de terceros.', 'j'],
  // spindlelab.cl. La letra l) pide informar si existen; decir que no hay ninguna la cubre.
  ['decir que no hay decisiones automatizadas cuenta como cubrir la letra l',
    'Nada en este sitio toma decisiones automatizadas que te afecten a ti o a tu empresa.', 'l'],
]) {
  eq(nombre, estado(conFrase(frase), letra) !== 'no-encontrado', true);
}

// El correo que Cloudflare ofusca. Es la razón de que exista una señal que mira el código.
{
  const sinMarca = doce.revisarPolitica(envolver(POLITICAS['spindlelab.cl'].texto), {});
  const conMarca = REVISION['spindlelab.cl'];
  eq('el correo ofuscado por Cloudflare cuenta como medio de contacto', estado(conMarca, 'c'), 'encontrado');
  eq('y en el texto visible ese correo no se ve', sinMarca.puntos.find((p) => p.letra === 'c').vimos.includes('una dirección de correo'), false);
}

/* ================================================================== *
 * 4. Modo conservador: lo que el texto NUNCA puede decir.             *
 * ================================================================== */

console.log('=== el texto, palabra por palabra ===');

const todasLasFrases = [];
for (const r of Object.values(REVISION)) {
  todasLasFrases.push(r.titulo, r.intro, r.nota, r.aviso || '');
  for (const p of r.puntos) todasLasFrases.push(p.titulo, p.detalle);
}
for (const m of Object.values(doce.PUNTOS)) todasLasFrases.push(m.titulo);

// Acusar es el error caro. Ninguna de estas formas puede salir de acá.
for (const prohibida of ['no tienes', 'no cumples', 'incumple', 'te falta', 'estas incumpliendo',
  'deberias tener', 'no cuentas con', 'careces', 'estas en infraccion', 'te arriesgas']) {
  const donde = todasLasFrases.filter((f) => llano(f).includes(prohibida));
  eq(`nunca dice "${prohibida}"`, donde, []);
}

// Y tampoco puede decir lo contrario, que sería peor: que alguien cumple.
for (const prohibida of ['cumples', 'estas al dia', 'certificamos', 'garantizamos']) {
  eq(`nunca dice "${prohibida}"`, todasLasFrases.filter((f) => f.toLowerCase().includes(prohibida)), []);
}

// Cada ausencia viene con su salida. Es la frase que convierte un veredicto en una observación.
for (const [d, r] of Object.entries(REVISION)) {
  for (const p of r.puntos.filter((x) => x.estado === 'no-encontrado')) {
    eq(`${d} ${p.letra}: dice "no encontramos mención"`, /no encontramos mencion/.test(llano(p.detalle)), true);
    eq(`${d} ${p.letra}: y deja la puerta abierta`, /Puede estar dicho con otras palabras/.test(p.detalle), true);
  }
  for (const p of r.puntos.filter((x) => x.estado === 'sin-confirmar')) {
    eq(`${d} ${p.letra}: lo no confirmado no cuenta ni a favor ni en contra`,
      /ni a favor ni en contra|no llegamos a leer/.test(p.detalle), true);
  }
}

// El descargo va siempre, también en el sitio que saca los doce. Es lo que separa esto de una
// certificación: buscamos palabras, no leemos como un abogado.
for (const [d, r] of Object.entries(REVISION)) {
  eq(`${d}: la nota va siempre`, /no reemplaza la revision de un abogado/.test(llano(r.nota)), true);
  eq(`${d}: y dice que no entra al puntaje`, /no entra en el puntaje/.test(r.intro), true);
}

// Regla de marca: la raya larga no aparece en nada que lea alguien de afuera.
eq('cero rayas largas', todasLasFrases.filter((f) => f.includes('—')), []);

/* ================================================================== *
 * 5. Cuando no se puede leer, no se opina.                            *
 * ================================================================== */

console.log('=== las cinco formas de no poder leer ===');

// Sin envolver: `envolver` le pone <title>Política de privacidad</title>, y el título cuenta como
// texto de la página. Una portada de verdad no lo tiene, y ese es justo el caso que se prueba.
const PORTADA = '<!doctype html><html lang="es-CL"><head><title>Clinica Ejemplo</title></head><body>' +
  '<p>Atendemos en Providencia desde 1990 con especialistas en cada area.</p>' .repeat(12) + '</body></html>';
const BLOQUEO = '<div class="error">Por razones de seguridad se ha restringido este acceso.</div>';

for (const [nombre, html, motivo] of [
  ['una página de bloqueo con 200', BLOQUEO, 'bloqueo'],
  ['una política casi vacía', envolver('Politica de privacidad. Datos personales.'), 'muy-corta'],
  ['el enlace lleva a la portada', PORTADA, 'no-parece-politica'],
  ['no llegó nada', '', 'sin-enlace'],
  ['la política se arma en el navegador', HTML['falabella.com'], 'armada-con-javascript'],
]) {
  const r = doce.revisarPolitica(html, {});
  eq(`${nombre}: declina`, r.legible, false);
  eq(`${nombre}: y dice cuál es el motivo`, r.motivo, motivo);
  eq(`${nombre}: los doce sin confirmar`, r.puntos.filter((p) => p.estado === 'sin-confirmar').length, 12);
  eq(`${nombre}: ninguno sale como ausente`, r.puntos.some((p) => p.estado === 'no-encontrado'), false);
  eq(`${nombre}: sigue sin puntuar`, r.puntua, false);
  // El aviso tiene que admitir un límite NUESTRO. Es la regla 3 del encargo: si el chequeo
  // falla, se dice; jamás se muestra como buena noticia ni se le carga al sitio.
  eq(`${nombre}: el aviso admite que el límite es nuestro`,
    /no (?:la )?pudimos|no nos dejo|no opinamos|no revisamos|no llegamos|no decimos nada|no sabemos/
      .test(llano(r.aviso)), true);
}

// Un texto que no es una cadena tampoco se inventa.
for (const basura of [null, undefined, 0, {}, []]) {
  eq('entrada que no es HTML: declina', doce.revisarPolitica(basura, {}).legible, false);
}

/* ================================================================== *
 * 6. Leída a medias: lo que no alcanzamos a leer no puede estar ausente. *
 * ================================================================== */

console.log('=== la política que no se leyó entera ===');
{
  // Una política real (wolfenson, que deja cuatro puntos sin encontrar) con medio megabyte de
  // relleno delante, para que el corte de texto se coma lo que sigue.
  const larga = envolver('Politica de privacidad y datos personales. ' .repeat(12000) + '\n' + POLITICAS['wolfenson.cl'].texto);
  const r = doce.revisarPolitica(larga, {});
  eq('leída a medias: sigue siendo legible', r.legible, true);
  eq('leída a medias: se avisa', /no la leimos entera/.test(llano(r.aviso || '')), true);
  eq('leída a medias: NINGÚN punto sale como ausente', r.puntos.some((p) => p.estado === 'no-encontrado'), false);
  eq('leída a medias: los que no aparecieron quedan sin confirmar',
    r.puntos.filter((p) => p.estado === 'sin-confirmar').length >= 4, true);
}
{
  // Y la brecha no se mide sobre un texto cortado. Si se midiera, todo lo que viniera después del
  // corte contaría como "está en el código y no a la vista", y una política larguísima pero
  // perfectamente legible se informaría como armada con JavaScript, que es falso. Con el texto
  // cortado la salida correcta ya la tenemos: es `parcial`.
  const larguisima = envolver('Politica de privacidad y datos personales. ' .repeat(12000) + '\n' + POLITICAS['wolfenson.cl'].texto);
  const r = doce.revisarPolitica(larguisima, {});
  eq('leída a medias: no se confunde con una política armada en el navegador', r.motivo, undefined);
  eq('leída a medias: sigue leyéndose', r.legible, true);
}

/* ================================================================== *
 * 7. El contrato: las doce letras y sus citas.                        *
 * ================================================================== */

console.log('=== las doce letras, contra el Diario Oficial ===');

// Copiadas del PDF del Diario Oficial N° 44.023 del 13-dic-2024 (CVE 2583630), artículo 14 ter.
// No de la API de la BCN, que sirve esta ley truncada (brief §2, corrección 6).
const LEY = {
  a: `La política de tratamiento de datos personales que haya adoptado, la fecha y versión de la misma.`,
  b: `La individualización del responsable de datos y su representante legal y la identificación del encargado de prevención, si existiere.`,
  c: `El domicilio postal, la dirección de correo electrónico, el formulario de contacto o la identificación del medio tecnológico equivalente de uso común y fácil acceso mediante el cual se le notifican las solicitudes que realicen los titulares.`,
  d: `Las categorías, clases o tipos de datos que trata; la descripción genérica del universo de personas que comprenden sus bases de datos; los destinatarios a los que se prevé comunicar o ceder los datos; las finalidades de los tratamientos que realiza; la base de legitimidad del tratamiento; y en caso de tratamientos que se basan en la satisfacción de intereses legítimos, cuáles serían éstos.`,
  e: `La política y las medidas de seguridad adoptadas para proteger las bases de datos personales que administra.`,
  f: `El derecho que le asiste al titular para solicitar ante el responsable, acceso, rectificación, supresión, oposición y portabilidad de sus datos personales, de conformidad a la ley.`,
  g: `El derecho que le asiste al titular de recurrir ante la Agencia, en caso de que el responsable rechace o no responda oportunamente las solicitudes que le formule.`,
  h: `En su caso, la transferencia de datos personales a un tercer país u organización internacional y si éstos ofrecen o no un nivel adecuado de protección. En caso de que no cuenten con un nivel adecuado de protección, se deberá informar si existen garantías que justifiquen tal transferencia.`,
  i: `El periodo durante el que se conservarán los datos personales.`,
  j: `La fuente de la cual provienen los datos personales y, en su caso, si proceden de fuentes de acceso público.`,
  k: `Cuando el tratamiento está basado en el consentimiento del titular, la existencia del derecho a retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.`,
  l: `La existencia de decisiones automatizadas, incluida la elaboración de perfiles. En tales casos, información significativa sobre la lógica aplicada, así como las consecuencias previstas de dicho tratamiento para el titular.`,
};

eq('son doce', doce.PUNTOS.length, 12);
eq('y van de la a a la l, en orden', doce.PUNTOS.map((p) => p.letra).join(''), 'abcdefghijkl');
eq('los id no se repiten', new Set(doce.PUNTOS.map((p) => p.id)).size, 12);
for (const p of doce.PUNTOS) {
  eq(`la cita de la letra ${p.letra} es literal`, p.pide, LEY[p.letra]);
  eq(`la letra ${p.letra} tiene al menos una señal`, p.senales.length >= 1, true);
  // Ningún patrón con la bandera g: `test` sobre una regex global se acuerda de dónde quedó, y
  // el segundo sitio revisado recibiría el resultado del primero.
  eq(`los patrones de la letra ${p.letra} no son globales`, p.senales.some(([, re]) => re.global), false);
}

/* ================================================================== *
 * 8. El endpoint.                                                     *
 * ================================================================== */

console.log('=== /api/doce-puntos ===');

function respuesta(cuerpo, status, url) {
  const bytes = new TextEncoder().encode(cuerpo);
  return {
    status, url,
    headers: { get: (k) => (k.toLowerCase() === 'content-length' ? String(bytes.length) : null) },
    get body() { return new ReadableStream({ start(c) { c.enqueue(bytes); c.close(); } }); },
    clone() { return respuesta(cuerpo, status, url); },
    text: async () => cuerpo,
  };
}

function sitio(rutas) {
  const pedidas = [];
  return {
    pedidas,
    fetch: async (url) => {
      pedidas.push(url);
      const r = rutas[url];
      if (r === undefined) throw new Error('no conecta: ' + url);
      if (typeof r === 'object' && r.a) {
        return { status: 301, url, headers: { get: (k) => (k.toLowerCase() === 'location' ? r.a : null) }, text: async () => '' };
      }
      return respuesta(r, 200, url);
    },
  };
}

const PORTADA_CON_POLITICA = '<!doctype html><html lang="es-CL"><head><title>Clinica</title></head><body><h1>Clinica Ejemplo</h1>' +
  '<p>Atendemos en Providencia desde 1990 con especialistas en cada area.</p>' +
  '<a href="/politica-de-privacidad/">Politica de privacidad</a></body></html>';
const PORTADA_SIN_POLITICA = '<!doctype html><html lang="es-CL"><head><title>Clinica</title></head><body><h1>Clinica Ejemplo</h1>' +
  '<p>Atendemos en Providencia desde 1990.</p><a href="/servicios/">Servicios</a></body></html>';

// `opciones` trae el env (con el KV del tope) y la IP del visitante. Sin ellas se comporta
// como antes, que es el caso "sin KV configurado".
async function pedir(dominio, rutas, opciones = {}) {
  const s = sitio(rutas);
  const anterior = globalThis.fetch;
  globalThis.fetch = s.fetch;
  try {
    const request = {
      url: 'https://verifica.spindlelab.cl/api/doce-puntos?dominio=' + encodeURIComponent(dominio),
      headers: { get: (k) => (k === 'CF-Connecting-IP' ? (opciones.ip || '') : null) },
    };
    const r = await doce.onRequestGet({ request, env: opciones.env });
    return { status: r.status, cuerpo: await r.json(), cabeceras: r.headers, pedidas: s.pedidas };
  } finally { globalThis.fetch = anterior; }
}

// El tope que el endpoint importa de profundo.js, para comprobar que es el MISMO número y no
// una copia que se pueda desincronizar.
const { TOPE_IP_DIA: doceTope } = await import(SITIO + '/functions/api/profundo.js');

{
  const r = await pedir('ejemplo.cl', {
    'https://ejemplo.cl/': PORTADA_CON_POLITICA,
    'https://ejemplo.cl/politica-de-privacidad/': HTML['wolfenson.cl'],
  });
  eq('camino completo: responde 200', r.status, 200);
  eq('camino completo: llegó a la política', r.cuerpo.seccion.fuente, 'https://ejemplo.cl/politica-de-privacidad/');
  eq('camino completo: y dice de ella lo mismo que la función pura', tabla(r.cuerpo.seccion), tabla(REVISION['wolfenson.cl']));
  eq('camino completo: no se guarda en caché', r.cabeceras.get('Cache-Control'), 'no-store');
}

{
  const r = await pedir('ejemplo.cl', { 'https://ejemplo.cl/': PORTADA_SIN_POLITICA });
  eq('sin enlace a la política: declina', r.cuerpo.seccion.legible, false);
  eq('sin enlace a la política: y lo dice', r.cuerpo.seccion.motivo, 'sin-enlace');
}

{
  // La política enlazada lleva de vuelta a la portada. Es el caso de un enlace que el sitio dejó
  // apuntando al inicio, y no es una política.
  const r = await pedir('ejemplo.cl', {
    'https://ejemplo.cl/': PORTADA_CON_POLITICA,
    'https://ejemplo.cl/politica-de-privacidad/': { a: 'https://ejemplo.cl/' },
  });
  eq('la política redirige a la portada: declina', r.cuerpo.seccion.legible, false);
  eq('la política redirige a la portada: y lo dice', r.cuerpo.seccion.motivo, 'no-abrio');
}

{
  // El portón. La política redirige a una dirección IP, que es la forma clásica de usar un
  // chequeo ajeno como sonda contra una red interna. La petición no puede salir.
  const r = await pedir('ejemplo.cl', {
    'https://ejemplo.cl/': PORTADA_CON_POLITICA,
    'https://ejemplo.cl/politica-de-privacidad/': { a: 'http://169.254.169.254/latest/meta-data/' },
  });
  eq('la política redirige a una IP: nunca se pide', r.pedidas.some((u) => u.includes('169.254')), false);
  eq('la política redirige a una IP: declina', r.cuerpo.seccion.legible, false);
}

for (const [entrada, trozo] of [
  ['localhost', 'red interna'],
  ['127.0.0.1', 'no una direccion ip'],
  ['metadata.google.internal', 'red interna'],
  ['127.0.0.1.nip.io', 'red interna'],
  ['esto no es un dominio', 'no parece un dominio'],
  ['', 'escribe un dominio'],
]) {
  const r = await pedir(entrada, {});
  eq(`entrada "${entrada}": 400`, r.status, 400);
  eq(`entrada "${entrada}": con su motivo`, llano(r.cuerpo.error).includes(trozo), true);
}

{
  const r = await pedir('nosirve.cl', {});
  eq('el sitio no abre: 400 y el mensaje del chequeo rápido', r.status, 400);
  eq('el sitio no abre: no inventa una sección', 'seccion' in r.cuerpo, false);
}

/* ================================================================== *
 * 9. Costo. El HTML lo escribe un tercero, así que se mide.           *
 * ================================================================== */

/* ================================================================== *
 * 8 bis. El tope por IP.                                             *
 *                                                                     *
 * Este endpoint corre `chequear()` entero, así que cada llamada       *
 * rastrea el sitio del prospecto por SEGUNDA vez con nuestro          *
 * User-Agent (la primera la hace /api/chequeo). Hasta el 25-sep no    *
 * tenía tope ninguno: un visitante podía hacernos golpear sitios de   *
 * terceros todo el día, con nuestro nombre puesto.                    *
 * ================================================================== */

console.log('=== el tope por IP de /api/doce-puntos ===');

function kvFalso(inicial = {}) {
  const d = new Map(Object.entries(inicial));
  return { d, get: async (k) => (d.has(k) ? d.get(k) : null), put: async (k, v) => { d.set(k, v); } };
}
const HOY = new Date().toISOString().slice(0, 10);

{
  // Sin KV configurado no se declina: esto no abre un navegador, es el mismo par de
  // peticiones del chequeo rápido. Declinar borraría los 12 puntos de la página entera.
  const r = await pedir('ejemplo.cl', {
    'https://ejemplo.cl/': PORTADA_CON_POLITICA,
    'https://ejemplo.cl/politica-de-privacidad/': HTML['wolfenson.cl'],
  }, {});
  eq('sin KV, los 12 puntos siguen saliendo', r.status, 200);
}

{
  // El contador sube, y con su propio prefijo.
  const kv = kvFalso();
  const r = await pedir('ejemplo.cl', {
    'https://ejemplo.cl/': PORTADA_CON_POLITICA,
    'https://ejemplo.cl/politica-de-privacidad/': HTML['wolfenson.cl'],
  }, { env: { VYC_TOPES: kv }, ip: '5.5.5.5' });
  eq('con KV, responde igual', r.status, 200);
  eq('y el intento quedó contado', kv.d.get(`tope:doce:ip:${HOY}:5.5.5.5`), '1');
  // El prefijo propio es lo que impide que las dos revisiones se coman el presupuesto entre
  // ellas: /api/profundo cuenta en 'tope:ip:…' y esto en 'tope:doce:ip:…'.
  eq('sin tocar el presupuesto del chequeo profundo', kv.d.get(`tope:ip:${HOY}:5.5.5.5`), undefined);
}

{
  // Alcanzado el tope: 429, y el sitio del prospecto NO se toca. Esa es toda la gracia.
  const kv = kvFalso({ [`tope:doce:ip:${HOY}:6.6.6.6`]: '20' });
  const r = await pedir('ejemplo.cl', {
    'https://ejemplo.cl/': PORTADA_CON_POLITICA,
    'https://ejemplo.cl/politica-de-privacidad/': HTML['wolfenson.cl'],
  }, { env: { VYC_TOPES: kv }, ip: '6.6.6.6' });
  eq('con el tope alcanzado, 429', r.status, 429);
  eq('y no se pidió NADA al sitio del prospecto', r.pedidas.length, 0);
  eq('no viaja como sección', 'seccion' in r.cuerpo, false);
  eq('dice hasta cuándo dura', /mañana/.test(r.cuerpo.error), true);
  eq('y no culpa al sitio', /tu sitio|no abre|no responde/i.test(r.cuerpo.error), false);
  eq('el tope es el mismo número que el del chequeo profundo', doceTope, 20);
}

{
  // Una entrada mala no gasta cupo: se rechaza antes de contar.
  const kv = kvFalso();
  const r = await pedir('localhost', {}, { env: { VYC_TOPES: kv }, ip: '7.7.7.7' });
  eq('una entrada mala sigue dando 400', r.status, 400);
  eq('y no consume cupo', kv.d.get(`tope:doce:ip:${HOY}:7.7.7.7`), undefined);
}

/* ================================================================== *
 * Lo que falta, como dato y no solo dentro de la prosa.               *
 * ================================================================== */

console.log('=== lo que falta viaja como dato, no solo dentro de la prosa ===');
{
  // La portada decide la etiqueta "lo encontramos en parte" CONTANDO `faltan`, nunca leyendo el
  // texto del detalle. Hasta el 25-sep `evaluar()` calculaba esa lista, la metía en la prosa y
  // no la devolvía, así que la portada no tenía con qué: un punto que la política cubre a
  // medias llegaba a pantalla con un visto verde, que es exactamente lo que este chequeo no
  // puede hacer.
  const punto = (d, letra) => REVISION[d].puntos.find((p) => p.letra === letra);

  // Los dos puntos que la ley enumera, sobre políticas reales. Las listas de abajo salieron de
  // las mismas cinco páginas bajadas el 25-sep, no de un ejemplo armado.
  eq('jaukencosmetica d): dice para qué, con qué permiso y qué datos, y no a quién se los da',
    punto('jaukencosmetica.cl', 'd').faltan, ['a quién se le entregan']);
  eq('jaukencosmetica f): cuatro de los cinco derechos, sin portabilidad',
    punto('jaukencosmetica.cl', 'f').faltan, ['portabilidad']);
  eq('abogadospyme d): faltan dos de las cuatro partes',
    punto('abogadospyme.cl', 'd').faltan, ['qué datos se tratan', 'a quién se le entregan']);

  // Y los que sí están enteros no traen nada, que es lo que deja pasar el visto verde.
  eq('spindlelab d): no falta nada', punto('spindlelab.cl', 'd').faltan, []);
  eq('spindlelab f): los cinco derechos', punto('spindlelab.cl', 'f').faltan, []);
  eq('wolfenson d): tampoco', punto('wolfenson.cl', 'd').faltan, []);

  // Encontrado CON algo que falta es lo único que la portada lee como "a medias". Un punto que
  // no encontramos trae su lista igual (es verdad: de los cinco derechos no vimos ninguno),
  // pero eso NO es "lo encontramos en parte": es "no lo encontramos", y quien lea `faltan`
  // tiene que mirar el estado primero. Se fija acá para que el día que alguien lo lea solo por
  // la cuenta, esta prueba se lo diga.
  eq('abogadospyme f): no encontrado', punto('abogadospyme.cl', 'f').estado, 'no-encontrado');
  eq('y aun así trae los cinco', punto('abogadospyme.cl', 'f').faltan.length, 5);
  eq('a medias es encontrado + falta algo, las dos cosas',
    ['jaukencosmetica.cl', 'abogadospyme.cl'].map((d) => {
      const p = punto(d, 'd');
      return p.estado === 'encontrado' && p.faltan.length > 0;
    }), [true, true]);

  // El campo va SIEMPRE, también donde no hay nada que enumerar y también cuando no pudimos
  // leer la política. Así la portada no tiene que distinguir entre "no falta nada" y "este
  // punto no enumera", que es justo la clase de distinción que se olvida.
  for (const [d, r] of Object.entries(REVISION)) {
    eq(`${d}: los doce traen faltan, y siempre es una lista`,
      r.puntos.filter((p) => Array.isArray(p.faltan)).length, 12);
  }
  eq('falabella: no se pudo leer, así que no falta nada, no faltan doce',
    REVISION['falabella.com'].puntos.every((p) => p.faltan.length === 0), true);

  // Solo d) y f) enumeran. En el resto las señales son formas distintas de decir lo mismo, y no
  // haber visto una de ellas no significa que falte nada.
  eq('solo las dos letras que la ley enumera pueden traer algo',
    [...new Set(Object.values(REVISION).flatMap((r) => r.puntos.filter((p) => p.faltan.length).map((p) => p.letra)))].sort(),
    ['d', 'f']);

  // Y el dato y la prosa dicen lo mismo: si se separan, uno de los dos miente.
  for (const d of ['jaukencosmetica.cl', 'abogadospyme.cl']) {
    for (const p of REVISION[d].puntos) {
      if (p.estado !== 'encontrado' || !p.faltan.length) continue;
      eq(`${d} ${p.letra}): el detalle nombra lo mismo que trae faltan`,
        p.faltan.every((n) => llano(p.detalle).includes(llano(n))), true);
    }
  }
}

console.log('=== costo con entradas hostiles ===');
{
  const cabeza = '<html><body><p>Esta es la politica de privacidad y trata datos personales. </p>';
  const casos = [
    ['prosa normal de 2 MB', cabeza + '<p>' + 'Tratamos tus datos personales con la finalidad de responder. ' .repeat(35000) + '</p>'],
    ['500.000 "<" sin cerrar', cabeza + '<' .repeat(500000)],
    ['anidamiento de 100.000', cabeza + '<div>' .repeat(100000) + 'datos personales privacidad' + '</div>' .repeat(100000)],
    ['1,5 MB de una sola palabra', cabeza + 'a' .repeat(1500000)],
    ['"av " repetido 400.000 veces', cabeza + 'av ' .repeat(400000) + '1'],
    ['"politica" y huecos largos', cabeza + ('politica ' + 'x ' .repeat(50)).repeat(20000)],
    ['<script> sin cerrar de 1,5 MB', cabeza + '<script>' + 'x' .repeat(1500000)],
    ['comentario sin cerrar de 1,5 MB', cabeza + '<!--' + 'x' .repeat(1500000)],
    ['200.000 etiquetas diminutas', cabeza + '<b>d</b>' .repeat(200000)],
  ];
  let peor = 0;
  for (const [nombre, html] of casos) {
    const t = process.hrtime.bigint();
    doce.revisarPolitica(html, {});
    const ms = Number(process.hrtime.bigint() - t) / 1e6;
    peor = Math.max(peor, ms);
    console.log('  ' + nombre.padEnd(34) + String(html.length).padStart(9) + ' b  ' + ms.toFixed(1).padStart(7) + ' ms');
  }
  // Medido el 25-sep en el Mac: el peor caso son 112 ms (1,5 MB de una sola palabra, donde el
  // corte de texto deja 400 KB que hay que normalizar y pasar por los patrones). El tope de acá
  // es holgado a propósito, para que no falle por una máquina ocupada; lo que vigila es que no se
  // vaya a segundos, que es lo que pasa cuando un patrón deja de ser lineal.
  eq(`el peor caso se queda bajo 2 s (medido: ${peor.toFixed(0)} ms)`, peor < 2000, true);
}

console.log(`\n${ok} bien, ${malo} mal`);
process.exit(malo ? 1 : 0);
