---
name: entrega-kit-verificaycumple
description: Ejecuta el kit pagado de Verifica y Cumple (verifica.spindlelab.cl, servicio de SpindleLab SpA — $149.000+IVA, $177.310 en total) en el pedido de un cliente que ya pagó por el checkout — saca el pedido de la cola, instala y configura un gestor de consentimiento cuando la compra lo incluye, aplica los ajustes técnicos que el chequeo detectó, redacta el borrador de la política de privacidad para que lo revise su abogado, verifica con el mismo chequeo público y CIERRA el pedido por /api/entregar. Usar cuando hay una venta pagada que atender, nunca antes.
---

# Entrega del kit de Verifica y Cumple

Ejecuto, sobre el pedido de un cliente **que ya pagó**, exactamente lo que la landing promete:

> Instalación y configuración de un gestor de consentimiento · Ajustes técnicos
> según lo que su chequeo detecte · Borrador de política de privacidad, para que
> lo revise su abogado · Verificación final con el mismo chequeo.

Es el mismo trabajo que ya se hizo una vez, de verdad, sobre spindlelab.cl el
21-sep-2026 (36→73/100, con un bug crítico de formulario encontrado y arreglado de
paso) — esta skill es ese mismo protocolo, generalizado para el sitio de un
tercero. La diferencia central frente a ese caso: **ahí yo tenía acceso total a mi
propio repo. Acá no lo tengo por defecto — y, en una parte de los pedidos, no hay
que pedirlo nunca.**

## ⚠️ LO PRIMERO: NO TODOS LOS PEDIDOS LLEVAN EL MISMO TRABAJO

**Decisión de Ramón, 2-nov-2026.** El kit también se le vende a quien solo le falta
**publicar su política de privacidad**. No fue un cambio de opinión: de 40 sitios reales de
las listas de prospección, cerca de la mitad llegaba al resultado sin nada que comprar, y el
caso dominante no era «no le falta nada» sino «no tiene un solo rastreador y le falta la
política». De cuatro validados con el chequeo profundo, tres salieron 100/100 con la política
como único pendiente.

Así que antes de hacer nada hay que mirar **qué se le vendió a ESTE pedido**, en la columna
`senales_contratadas` que la cola devuelve:

| Lo que contrató | Qué se entrega | ¿Acceso al sitio? |
|---|---|---|
| Solo `politica` | el borrador de la política, con sus datos | **NO. Nunca se le pide.** |
| Cualquier otra señal (`cmp`, `carga`, `cookies`, `envio`, `aviso`, `casilla`) | el gestor instalado + los ajustes + el borrador | Sí, y sin él no se empieza |

La lista viva está en `SIN_ENTRAR_AL_SITIO`, en
`verificaycumple/functions/api/etapas.js`: se mira ahí, no acá, porque acá se desactualiza.

**Cómo se nota en la pantalla del cliente:** un pedido de solo-política pasa de «Cuéntanos de
tu empresa» directo a la etapa `redactando` («Estamos redactando tu borrador»), sin pasar por
`falta-acceso`, y su formulario no le pregunta la plataforma. Si te aparece un pedido de
solo-política esperando un acceso, **eso es un defecto, no un cliente que no contestó** — se
arregló el 3-nov-2026 y hay una batería (`prueba-solo-politica.mjs`) que lo cuida.

## Antes de tocar nada: marca y acceso

- **Verifica y Cumple es un servicio de SpindleLab SpA** (RUT 78.474.925-8), en
  `verifica.spindlelab.cl`. ⚠️ Esto REVIRTIÓ el «Camino B» de marca aparte que
  decía antes esta guía: se decidió el 21-sep y se dio vuelta el 23-sep-2026. La
  factura sale de la SpA.
- **Pero la regla de la plantilla no cambió, y se sostiene por otro motivo:** la
  política de privacidad que se entrega **nunca nombra a SpindleLab SpA como
  responsable** — el responsable es siempre el cliente, porque los datos que
  trata son suyos. No confundir con la plantilla ya escrita para `spindlelab.cl`
  (esa sí nombra a SpindleLab SpA, porque ahí SpindleLab se audita a sí misma).
- **Acceso real, no asumido, no implícito — cuando corresponde.** Decisión explícita de Ramón
  (21-sep-2026): para instalar el gestor se pide **acceso real al hosting/repo/CMS** del
  cliente (o credenciales temporales de un usuario dedicado) antes de instalar nada. **No** se
  asume que un snippet autoinstalable es suficiente.
  ⚠️ Y el revés de la misma regla, desde el 2-nov: **a un pedido de solo-política no se le
  pide acceso a nada.** Pedirle una cuenta de administrador de su sitio a alguien que compró
  un texto es pedir de más justo cuando ya pagó, y es lo más probable que lo haga arrepentirse.
- Si en un pedido que SÍ necesita acceso nunca llega, o la plataforma del cliente lo hace
  inviable (ej. un CMS cerrado sin usuarios técnicos), eso es motivo para volver a Ramón y
  decidir caso a caso — **no** para instalar algo a ciegas ni para inventar un método nuevo
  sin avisar.

## Guardrails (los límites; el cómo técnico se adapta al sitio)

- **Nunca se certifica cumplimiento.** El chequeo (y este kit) señalan qué falta
  o qué mejoró — nunca dicen "ya cumples". Decirle a un cliente que cumple
  cuando no es así lo expone a él a una multa y a Ramón/SpindleLab a una demanda.
- **No es asesoría legal, y lo que se entrega es un BORRADOR.** No se publica la política: se
  redacta sobre la estructura del Art. 14 ter con los datos del cliente, **la revisa su
  abogado y la publica él**. Esto se dice al entregar, no se da por sobreentendido, y ya lo
  dicen por su cuenta la oferta, la pantalla del pedido y el correo de cierre: si acá se
  dijera distinto, seríamos la cuarta voz contradiciendo a las otras tres.
- **El precio es cerrado: $149.000 + IVA = $177.310, una vez.** Ya NO «se ajusta
  según lo que el chequeo muestre»: eso cambió el 24-oct-2026, con la compra
  directa. Quien ve el botón ya pasó una compuerta de elegibilidad del lado del
  servidor, y los casos fuera de alcance (tienda con carro, varios dominios) no
  lo ven — esos van al formulario. Si aun así, al levantar el sitio real, aparece
  algo mucho más grande de lo que el chequeo alcanzó a medir, se conversa con
  Ramón y con el cliente **antes** de seguir. Pero ya es la excepción, no el caso
  normal.
- **El "antes" no se corre: ya está guardado.** El pedido congeló el informe con el que se
  vendió (`informe_json`), y ése es el «antes» que vale, porque es el que la persona vio
  cuando decidió comprar. Correr uno nuevo al empezar mide un sitio que ya puede haber
  cambiado y produce un antes/después que no corresponde a la venta.
- **No se toca nada fuera de lo que el contrato congelado define**, aunque se
  encuentre algo más en el camino (ver más abajo qué hacer si eso pasa — se avisa, no se
  decide solo).

## Método

0. **Sacar el pedido de la cola.** ⚠️ Esto es nuevo (2-nov-2026) y reemplaza abrir la base de
   producción a mano, que es por donde el camino se cortaba: el aviso de venta manda solo 12
   de los 36 caracteres del id (a propósito, porque ese id es la única credencial de la
   pantalla del cliente) y `/api/entregar` exige el id completo.

   ```sh
   curl -s "https://verifica.spindlelab.cl/api/cola?estado=pagado" \
     -H "Authorization: Bearer $CLAVE_ENTREGA"
   ```

   Cada fila trae lo que hace falta para atender sin abrir nada más: el **id completo**, el
   **correo** del cliente, su **razón social, RUT, giro y dirección** (para la política y para
   la factura), la **plataforma**, `acceso_recibido_en`, `senales_contratadas` y
   `senales_fuera`, y la **etapa** calculada con el mismo criterio que ve el cliente
   (`etapa`, `titulo`, `quien_actua`). `?tope=N` cambia cuántas (25 por omisión, 200 máximo).
   Si contesta `sin-clave`, falta `CLAVE_ENTREGA` en los secretos de Pages: falla cerrado a
   propósito y no hay modo «sin clave, pasa».

   **Lee `quien_actua` antes de ponerte a trabajar.** Si dice `cliente`, el pedido está
   esperándolo a él y lo que toca es escribirle, no trabajar. Si dice `nosotros`, es tuyo.
1. **Mirar qué se vendió.** `senales_contratadas` manda sobre todo lo demás (ver el cuadro de
   arriba). Si es solo `politica`, **salta los pasos 3, 4 y 5**: no hay sitio al que entrar ni
   gestor que instalar, y el trabajo es el paso 6.
   Los datos de la empresa ya vienen en el pedido —el cliente los escribió en su pantalla— así
   que el dominio y la razón social no se preguntan.
2. **Leer el "antes" congelado.** Sale de `informe_json` del pedido: el puntaje y el detalle de
   cada ítem, tal como estaban cuando compró. Es la línea base del reporte final.
3. **Levantar el sitio real.** *(solo si hay gestor que instalar)* No asumir la configuración
   de spindlelab.cl (Astro + HTML a mano + Cloudflare Pages) — cada cliente puede estar en
   WordPress, Shopify, un builder, o código a medida. Identificar: qué plataforma, qué
   trackers corren de verdad (GA4, Meta Pixel, otros — el chequeo ya adelanta una lista, pero
   conviene confirmar en el código), qué formularios propios existen y si ya tienen o no
   checkbox de consentimiento.
4. **Instalar y configurar el gestor de consentimiento**, adaptado a esa
   plataforma. *(solo si hay gestor que instalar)* El patrón de referencia (spindlelab.cl,
   21-sep-2026): Google Consent Mode v2 con `gtag('consent','default',{...denied})` antes de
   `gtag('config',...)`, más los trackers sin API de consentimiento nativa (ej. Meta Pixel)
   envueltos en una función que solo corre si el consentimiento ya fue otorgado o cuando el
   banner lo otorga.

   **⚠️ DECISIÓN DEL 27-OCT-2026: el gestor por defecto es Klaro.** No se
   construye uno a mano salvo que no quede alternativa. Las razones, en orden:

   - **No le cuesta un peso a nadie, ni al cliente ni a SpindleLab.** Klaro es
     código abierto (BSD-3), se aloja en el propio sitio del cliente, sin cuenta
     y sin mensualidad. Eso no es un detalle de presupuesto: **la página vende el
     kit como «una vez» y la única exclusión que declara es el abogado.** Un
     gestor con suscripción mensual volvería falsa esa frase, y el cliente lo
     descubriría después de pagar.
   - **Bloquea de verdad.** No es un cartel decorativo: cambia el `src` del
     script por `data-src` y el `type` por `text/plain`, así que el navegador no
     ejecuta el rastreador hasta que la persona acepta.
   - **El chequeo lo reconoce**, así que el «después» muestra el cambio.

   Según dónde esté el sitio del cliente:

   | Plataforma | Qué se instala | Costo |
   |---|---|---|
   | A medida, HTML, Astro | **Klaro** (o tarteaucitron) | gratis, autoalojado |
   | WordPress | **Complianz** o **Cookie Notice**, versión gratis | gratis |
   | Shopify o constructor cerrado | hay que evaluar uno alojado | por ver, caso a caso |

   ⚠️ **El archivo tiene que quedar llamándose `klaro.js` o `klaro.min.js`.** El
   chequeo lo detecta por el nombre; si se renombra o se empaqueta dentro de otro
   bundle, nuestro propio instrumento no lo ve y el cliente recibe un «antes y
   después» plano aunque el arreglo sea real.
5. **Ajustes técnicos según lo que el contrato congelado incluye** *(solo si hay sitio al que
   entrar)* — exactamente esos, ni más ni menos: una casilla de consentimiento premarcada (no
   cumple el Art. 12, que exige un acto afirmativo), un formulario que manda datos sin
   checkbox, `lang` sin declarar.

   ⚠️ **HTTPS no es del kit, y esta guía lo mandaba igual.** `elegibilidad.js` dice que
   `https` «es del hosting del cliente» y lo deja fuera, así que arreglarlo es trabajo que
   nadie compró y que nosotros no controlamos. Lo contrario pasó con `casilla`: el 27-oct
   Ramón la metió en `TAMBIEN_ARREGLA`, o sea entra en el trabajo aunque por sí sola no
   justifique vender el kit, así que esa mitad de la contradicción quedó resuelta a favor de
   arreglarla. **Pendiente para Ramón:** cuando a un pedido le queda `https` en
   `senales_fuera`, ¿se le arregla igual de buena gana (y entonces entra al alcance escrito), o
   se le dice en el reporte que es de su hosting y se deja? Hoy la guía deja de mandarlo, que
   es lo que calza con el código.
6. **Borrador de política de privacidad**, sobre los 12 puntos del Art. 14 ter
   (política, responsable, medio de contacto, categorías de datos, medidas de
   seguridad, los cinco derechos, recurrir ante la Agencia, transferencias
   internacionales, plazo de conservación, origen de los datos, revocar el
   consentimiento, decisiones automatizadas). El responsable que va en el
   documento es **el cliente**, con los datos que él mismo escribió en su pedido — nunca
   copiar el bloque de SpindleLab ni el de Ramón personal de otro proyecto.

   ⚠️ **PENDIENTE PARA RAMÓN — cómo le llega el borrador.** El correo de cierre que manda
   `/api/entregar` **no lleva adjuntos**: dice qué quedó cerrado y el antes/después, y nada
   más. O sea que hoy el borrador se le manda **a mano**, respondiendo desde
   `hola@spindlelab.cl`, y no hay ninguna columna que registre que salió. La pregunta exacta:
   *¿el borrador se manda a mano por correo (y entonces el paso va en el criterio de término,
   antes de cerrar), o se le sube a su pantalla de pedido y el correo automático lo enlaza?*
   Mientras no esté decidido, **se manda a mano ANTES de cerrar el pedido**, porque la pantalla
   del cliente afirma que se mandó en el momento en que se cierra.
7. **Verificación final.** Correr el chequeo público de nuevo sobre **la misma página** que
   dice `url_medida` en el pedido, y capturar el "después". Comparar otra página no es un
   antes y un después, es dos mediciones distintas.

   ⚠️ **En un pedido de solo-política el puntaje casi no se mueve, y eso no es un fracaso.**
   La señal `politica` se cierra cuando el cliente **publica** el texto, y publicarlo es suyo.
   Decirlo en el reporte antes de que lo pregunte; la pantalla y el correo de cierre ya se lo
   dicen con las mismas palabras.
8. **Cerrar el pedido.** ⚠️ Esto también es nuevo (30-oct-2026) y antes no existía: `entregado`
   era un estado inalcanzable y el camino del producto terminaba en «Estamos trabajando en tu
   sitio» para siempre.

   ```sh
   curl -s -X POST "https://verifica.spindlelab.cl/api/entregar" \
     -H "Authorization: Bearer $CLAVE_ENTREGA" \
     -H 'Content-Type: application/json' \
     -d '{"id":"<el id completo de la cola>","informe_final":{ ...el chequeo del paso 7... }}'
   ```

   Qué hace y qué mirar en la respuesta:

   - marca el pedido como `entregado` y escribe `entregado_en` e `informe_final_json`;
   - **manda el correo de cierre al cliente** y dice si salió, en `correo_enviado`. Si viene
     `false`, el trabajo está igual de entregado y el correo no salió: hay que escribirle a
     mano. No se reintenta el endpoint — entregar dos veces contesta `ya_estaba: true` y **no**
     vuelve a mandar el correo, a propósito;
   - `hubo_informe_final: false` significa que el `informe_final` no se entendió y se guardó
     `null`. El correo entonces le dice, con razón, que no se rehizo la medición. Si lo
     corriste, revisa el cuerpo y vuelve a mandarlo **antes** de cerrar;
   - `sin_acceso_declarado: true` en un pedido que SÍ llevaba gestor es una señal de que algo
     no cuadra. En un pedido de solo-política es lo normal y correcto: nunca dio un acceso.

   Solo se puede cerrar un pedido en `pagado`. Cualquier otro estado contesta
   `no-se-puede-entregar` con el estado real, y eso es un dato, no un error que forzar.
9. **Reporte.** Antes/después con los dos resultados del chequeo (no solo el número), qué se
   instaló o qué se redactó, qué queda para el abogado del cliente, y — si apareció algo fuera
   del alcance original mientras se trabajaba — decirlo explícitamente en vez de callarlo o
   arreglarlo en silencio. Lo revisa Ramón antes de que salga.

## Limitación conocida del chequeo (para no confundirla con un error de la entrega)

`chequeo.js` solo reconoce gestores de consentimiento de una lista fija, hoy de
**20 entradas**: Cookiebot, OneTrust, Osano, iubenda, CookieYes, Axeptio,
Complianz, Klaro, tarteaucitron, CookieFirst, CookieScript, Usercentrics,
Didomi, CookieHub, Termly, y cinco plugins de WordPress (CookieAdmin, Real
Cookie Banner, Borlabs Cookie, GDPR Cookie Compliance, Cookie Notice). La lista
viva está en la constante `CMPS` de `functions/api/chequeo.js`: se mira ahí, no
acá, porque acá se desactualiza. Un gestor construido
a mano (como el de spindlelab.cl) **no lo detecta como "gestor reconocido"**,
aunque bloquee todo correctamente — el chequeo sí detecta si hay
`gtag('consent','default',...)` inline, pero esa señal es informativa, no suma
puntaje todavía. **La verificación real no es el score: es abrir el sitio y
comprobar en el navegador** que el banner bloquea Analytics/Pixel hasta aceptar,
que la elección persiste al recargar, y que el checkbox del formulario funciona.
Si el cliente pregunta por qué el número no subió más, esa es la explicación —
no un motivo para instalar algo distinto solo para que el detector lo reconozca.

## Criterios de calidad (bueno vs. aceptable)

- **El "antes" es el congelado del pedido**, el que la persona vio al comprar. ⚠️ medir de
  nuevo al empezar y llamar a eso «el antes» cambia la vara a mitad de camino.
- **El responsable de la política es el cliente**, con sus datos reales. ⚠️ una
  plantilla con el nombre de otro cliente (o de SpindleLab) pegada sin revisar
  es un error grave, no un detalle.
- **Los ajustes técnicos resuelven lo que el contrato incluía**, verificado en el
  navegador, no solo "debería funcionar".
- **Nada se instala sin acceso real confirmado** — y nada se le pide a quien no lo necesita.
  ⚠️ los dos lados de esa regla se rompen distinto: trabajar sobre una promesa de acceso que
  nunca llegó atrasa el pedido; pedirle un acceso a quien compró un texto lo hace desconfiar
  de la compra entera.
- **El pedido queda cerrado en el sistema, no solo en tu cabeza.** ⚠️ un trabajo hecho y un
  pedido que sigue diciendo «estamos trabajando en tu sitio» es, para el cliente, un trabajo
  no hecho.

## Errores típicos del oficio (y su señal temprana)

- **Pedirle un acceso a un pedido de solo-política.** **Señal:** vas a redactar el correo que
  pide la invitación sin haber mirado `senales_contratadas`. Si ya se lo pediste, no lo tapes:
  escríbele diciendo que no hace falta.
- **Empezar sin acceso real en un pedido que sí lo necesita.** **Señal:** vas a "probar algo"
  sobre un sitio cuyo hosting/repo no tienes abierto todavía.
- **Copiar la plantilla de política de otro caso sin cambiar el responsable.**
  **Señal:** el documento que vas a entregar todavía dice "SpindleLab" o el
  nombre de otro cliente.
- **Dar el trabajo por entregado sin cerrar el pedido.** **Señal:** terminaste, le escribiste
  al cliente, y nunca llamaste a `/api/entregar`. Su pantalla sigue diciendo que estamos
  trabajando, y el correo de cierre no salió.
- **Cerrar el pedido sin haberle mandado el borrador.** **Señal:** vas a hacer el POST y el
  correo con el documento todavía está sin enviar. La pantalla afirma que se mandó.
- **Confundir el score sin subir con un arreglo que no funcionó.** **Señal:**
  vas a decirle al cliente "no sirvió" sin haber abierto el navegador a
  comprobar el bloqueo real primero — o sin acordarte de que en un pedido de solo-política el
  número no se mueve hasta que él publique.
- **Encontrar algo más grande en el camino y absorberlo en silencio** (como pasó
  con el formulario roto de spindlelab.cl). **Señal:** vas a arreglar algo que no
  estaba en el alcance sin decírselo al cliente, o a ignorarlo porque "no es lo
  que pidieron".
- **Prometer cumplimiento.** **Señal:** estás por escribir o decir "ya cumples
  con la ley" en vez de "esto es lo que el chequeo ya no señala".

## Si piden la plata de vuelta (nuevo, 4-nov-2026)

Antes de hoy esto no tenía camino: `devuelto` era un estado al que nada podía llegar con Flow,
así que una devolución se hacía en el panel y **el pedido quedaba en `entregado` para siempre**,
con la pantalla del cliente mostrándole su kit. Ya no.

**El orden importa, y es este. No se invierte.**

1. **Primero se devuelve la plata en el panel de Flow.** A mano, por fuera del sistema.
2. **Después se anota**, con `POST /api/devolver`, con la misma clave que la cola:

   ```sh
   curl -s -X POST "https://verifica.spindlelab.cl/api/devolver" \
     -H "Authorization: Bearer $CLAVE_ENTREGA" \
     -H 'Content-Type: application/json' \
     -d '{"id":"<el id completo>","motivo":"retracto","ya_devuelto_en_flow":true}'
   ```

**Por qué en ese orden:** el correo que sale de ahí le dice al cliente que la devolución ya
salió. Anotarla antes de hacerla es afirmarle algo falso. La bandera `ya_devuelto_en_flow` existe
exactamente para que quien llama tenga que declararlo; sin ella el endpoint contesta 400 y no
toca nada.

**El motivo no es una etiqueta: elige el correo.** Son tres y no se pueden mezclar:

| motivo | cuándo | qué le dice el correo |
|---|---|---|
| `retracto` | el cliente ejerce su derecho (art. 3 bis, 10 días) | que está en su derecho y no tiene que explicar nada |
| `no-se-pudo-entregar` | no pudimos cumplir | que **la falla fue nuestra**, con esas palabras |
| `otro` | cualquier otro acuerdo | lo mínimo, sin inventar un motivo |

⚠️ **Decirle «perdón, algo falló» a quien solo usó un derecho es tratarlo de problema**, y
escribirle como si hubiera sido su decisión cuando la falla fue nuestra es esconderlo. Por eso
el motivo se elige con cuidado, no se deja en `otro` por comodidad.

**Lo que el endpoint NO hace, a propósito:** no mueve plata. Un endpoint que devolviera dinero
con una sola clave de cabecera es lo que, si esa clave se filtra, vacía la cuenta — y esa clave
ya se filtró una vez (4-nov, quedó en un transcripto y se rotó). La separación es deliberada.

**`devuelto` es terminal.** Un pedido devuelto no puede volver a `pagado` ni a `entregado`: la
tabla de transiciones no lo admite. Si pudiera, la cola lo mandaría a trabajar de nuevo y le
entregaríamos un kit a alguien a quien ya le devolvimos su dinero.

**Solo se devuelve desde `pagado`, `entregado` o `contracargado`.** Un pedido en `creado` o
`pendiente` contesta 409: ahí nadie pagó todavía, así que no hay nada que devolver y lo que hay
es un error de quien llama.

## Límite del rol

Instalo, arreglo lo técnico, redacto el borrador, verifico y cierro el pedido. **No**
reemplazo al abogado del cliente (el borrador lo revisa y adapta un abogado,
no yo), **no publico su política** (la publica él), **no** certifico cumplimiento, **no**
decido el precio final sin que Ramón confirme si el caso se salió de lo esperado, **no**
publico nada del cliente como caso de éxito sin su permiso explícito.

## De dónde saco los datos

- **El "antes":** del `informe_json` congelado en el pedido.
- **El "después":** del chequeo público, corrido de verdad contra la `url_medida` del pedido.
- **Los datos del cliente y qué contrató:** de `/api/cola`, no de la base a mano y no del
  correo de aviso, que manda solo un prefijo del id.
- **La configuración real del sitio:** del código/CMS del cliente, nunca asumida
  desde otro proyecto.
- **El contenido de la política:** la estructura sale de la ley (Art. 14 ter);
  los datos del responsable salen del pedido.

## Contrato

- **Recibe:** una venta del kit ya pagada en el checkout, sacada de `/api/cola` (trae id
  completo, dominio, correo, razón social, RUT, giro, dirección, plataforma y
  `senales_contratadas`) + el acceso real al sitio **cuando la compra lo requiere**, que se
  pide aparte por correo.
- **Entrega:** si la compra lleva gestor, gestor instalado y verificado en navegador + los
  ajustes del contrato; en todo pedido, el borrador de política con los datos del cliente, el
  reporte antes/después, y **el pedido cerrado por `/api/entregar`** con el correo de cierre
  salido.
- **Aprueba:** Ramón revisa el reporte final antes de que salga al cliente.

## Criterio de término (no está listo hasta que esto pasa)

**Siempre, en cualquier pedido:**

- [ ] `senales_contratadas` leída, y el camino elegido con eso (no con la plataforma ni con la
      pinta del sitio).
- [ ] "Antes" tomado del `informe_json` congelado del pedido.
- [ ] Borrador de política con el responsable y los datos del **cliente**, nunca copiados de
      otro caso.
- [ ] Borrador **enviado al cliente** (hoy a mano, ver el pendiente del paso 6) antes de cerrar.
- [ ] Chequeo "después" corrido sobre la `url_medida` del pedido y guardado.
- [ ] Si apareció algo fuera de alcance en el camino, se avisó al cliente — no
      se arregló ni se ignoró en silencio.
- [ ] Reporte antes/después entregado, con el límite de "no es asesoría legal" y "el borrador
      lo publicas tú" dichos explícitamente.
- [ ] **Pedido cerrado por `POST /api/entregar`**, con `informe_final`, y `correo_enviado`
      revisado en la respuesta.

**Además, solo en un pedido que incluya el gestor:**

- [ ] Acceso real confirmado antes de instalar nada.
- [ ] Gestor de consentimiento instalado y **verificado en el navegador**
      (bloquea hasta aceptar, persiste al recargar) — no solo asumido por el
      score del chequeo.
- [ ] Ajustes técnicos resueltos exactamente los que el contrato incluía.

⚠️ **Los tres de arriba NO se le exigen a un pedido de solo-política**, y por eso están
separados. Mientras estaban en una sola lista, el criterio de término bloqueaba la entrega de
un pedido perfectamente entregable: pedía un acceso que nunca se iba a pedir y un gestor que
nadie compró.

## Aprendido a golpes (principio + respaldo)

> ✅ **Principio:** *el acceso al sitio del cliente se pide real y explícito
> antes de instalar nada — nunca se asume, nunca se improvisa un snippet a
> mitad de camino porque el acceso no llegó.* **Respaldo:** decisión explícita
> de Ramón, 21-sep-2026, al definir este protocolo.

> ✅ **Principio:** *y no se le pide nada que su compra no requiera. Qué se le pide sale del
> contrato congelado, no de lo que el kit sabe hacer.* **Respaldo:** auditoría del 3-nov-2026
> — desde que `politica` entró a `CIERRA_EL_KIT` (2-nov), TODO pedido pagado se frenaba
> pidiendo acceso «para instalar el gestor de consentimiento», incluido el de quien solo había
> comprado un borrador de texto. La decisión estaba instalada donde se cobra y en ninguna parte
> de lo que pasa después de cobrar.

> ✅ **Principio:** *el score del chequeo automático no es la vara final — un
> gestor de consentimiento construido a mano puede funcionar perfecto y aun así
> no ser "reconocido" porque el detector solo conoce una lista fija de
> proveedores. La verificación real es el navegador, no el número.*
> **Respaldo:** spindlelab.cl, 21-sep-2026 — quedó en 73/100 con el banner
> funcionando correctamente, verificado en consola (localStorage, dataLayer,
> fbq), precisamente por esta limitación.

> ✅ **Principio:** *revisando el alcance pedido puede aparecer algo más grande
> y sin relación — se avisa y se prioriza, nunca se absorbe en silencio ni se
> ignora por no estar en el encargo original.* **Respaldo:** spindlelab.cl,
> 21-sep-2026 — arreglando el checkbox de consentimiento del formulario de
> contacto apareció un bug real que dejaba el botón "Enviando…" pegado para
> siempre; se reportó como más urgente que el trabajo de cumplimiento mismo y
> se arregló el mismo día.

> ✅ **Principio:** *una plantilla legal nunca se reutiliza entre proyectos sin
> revisar el responsable: el responsable de la política es SIEMPRE el cliente,
> porque los datos que trata son suyos.* **Respaldo:** ⚠️ este principio venía
> apoyado en un hecho que dejó de ser cierto — decía «porque Verifica y Cumple es
> marca aparte de SpindleLab», y esa decisión («Camino B») se revirtió el
> 23-sep-2026. El principio se sostiene igual por un motivo que no depende de la
> marca, pero sirve de recordatorio: **un principio atado a un hecho cambiante
> hay que volver a mirarlo cuando el hecho cambia**, o te quedas obedeciendo una
> regla por una razón que ya es falsa.

> ✅ **Principio:** *una guía que se desactualiza en silencio es peor que no tenerla, porque se
> obedece.* **Respaldo:** esta misma. La versión que se cargaba hasta el 3-nov-2026 era del
> 21-sep y decía cuatro cosas falsas (marca aparte en `verificaycumple.pages.dev`; intake por
> `mailto`; precio ajustable; 11 gestores reconocidos). La corrección se escribió el 27-oct en
> la rama `claude/guia-entrega-kit` y **no se mergeó**, así que durante una semana la copia
> buena existía y la que se cargaba era la mala. Por eso ahora, donde se puede, la guía apunta
> a la constante del código (`CMPS`, `SIN_ENTRAR_AL_SITIO`) en vez de repetir su contenido: lo
> que no se copia no se desactualiza.
