---
name: entrega-kit-verificaycumple
description: Ejecuta el kit pagado de Verifica y Cumple (verifica.spindlelab.cl, servicio de SpindleLab SpA — $149.000+IVA, $177.310 en total) en el sitio real de un cliente que ya pagó por el checkout — instala un gestor de consentimiento, aplica los ajustes técnicos que el chequeo detectó, entrega una plantilla de política de privacidad para que la revise su abogado, y verifica con el mismo chequeo público. Usar cuando un cliente de Verifica y Cumple confirma que quiere el kit, nunca antes de tener acceso real a su sitio.
---

# Entrega del kit de Verifica y Cumple

Ejecuto, sobre el sitio **real de un cliente que ya pagó**, exactamente lo que la
landing promete:

> Instalación y configuración de un gestor de consentimiento · Ajustes técnicos
> según lo que su chequeo detecte · Plantilla de política de privacidad, para que
> la revise su abogado · Verificación final con el mismo chequeo.

Es el mismo trabajo que ya se hizo una vez, de verdad, sobre spindlelab.cl el
21-sep-2026 (36→73/100, con un bug crítico de formulario encontrado y arreglado de
paso) — esta skill es ese mismo protocolo, generalizado para el sitio de un
tercero. La diferencia central frente a ese caso: **ahí yo tenía acceso total a mi
propio repo. Acá no lo tengo por defecto — hay que pedirlo.**

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
- **Acceso real, no asumido, no implícito.** Decisión explícita de Ramón
  (21-sep-2026): esta skill pide **acceso real al hosting/repo/CMS** del cliente
  (o credenciales temporales de un usuario dedicado) antes de instalar nada — el
  mismo modelo que ya funcionó en spindlelab.cl. **No** se asume que un snippet
  autoinstalable es suficiente; si el cliente no puede o no quiere dar acceso,
  eso es un bloqueador que se resuelve por email antes de empezar, no un
  problema técnico que se improvisa a mitad del trabajo.
- Si después de pedirlo el acceso nunca llega, o la plataforma del cliente hace
  el acceso real inviable (ej. un CMS cerrado sin usuarios técnicos), eso es
  motivo para volver a Ramón y decidir caso a caso — **no** para instalar algo a
  ciegas ni para inventar un método nuevo sin avisar.

## Guardrails (los límites; el cómo técnico se adapta al sitio)

- **Nunca se certifica cumplimiento.** El chequeo (y este kit) señalan qué falta
  o qué mejoró — nunca dicen "ya cumples". Decirle a un cliente que cumple
  cuando no es así lo expone a él a una multa y a Ramón/SpindleLab a una demanda.
- **No es asesoría legal.** La política de privacidad que se entrega es una
  **plantilla** sobre la estructura del Art. 14 ter — el texto final y la
  evaluación del caso del cliente los define su abogado. Esto se dice
  explícitamente al entregar, no se da por sobreentendido.
- **El precio es cerrado: $149.000 + IVA = $177.310, una vez.** Ya NO «se ajusta
  según lo que el chequeo muestre»: eso cambió el 24-oct-2026, con la compra
  directa. Quien ve el botón ya pasó una compuerta de elegibilidad del lado del
  servidor, y los casos fuera de alcance (tienda con carro, varios dominios) no
  lo ven — esos van al formulario. Si aun así, al levantar el sitio real, aparece
  algo mucho más grande de lo que el chequeo alcanzó a medir, se conversa con
  Ramón y con el cliente **antes** de seguir. Pero ya es la excepción, no el caso
  normal.
- **El "antes" se corre siempre, y se guarda.** Sin un resultado del chequeo
  tomado *antes* de tocar nada, no hay antes/después real que mostrar — y es lo
  que hace creíble la entrega (ver el caso de SpindleLab).
- **No se toca nada fuera de lo que el chequeo + la conversación con el cliente
  definieron**, aunque se encuentre algo más en el camino (ver más abajo qué
  hacer si eso pasa — se avisa, no se decide solo).

## Método

1. **Intake.** ⚠️ Cambió entero el 24-oct-2026: **ya no llega por `mailto`.**
   El cliente **paga en el sitio** y cae en su pantalla privada de pedido
   (`/pedido/?id=…`), donde llena razón social, RUT, giro, dirección y en qué
   plataforma está su sitio. Recibe además un correo automático con ese enlace,
   que es su única credencial: no hay cuenta ni contraseña.
   El dominio ya viene congelado en el pedido, así que no hay que preguntarlo.
   Lo que el formulario NO pide, y se pide por correo, es **el acceso real**
   (hosting/repo/CMS o un usuario técnico temporal). Sin acceso no se agenda
   trabajo.
2. **Chequear el "antes".** Correr el chequeo público
   (`https://verifica.spindlelab.cl`) contra el dominio del cliente **antes**
   de cualquier cambio. Guardar el resultado completo (score + detalle de cada
   ítem, no solo el número) — es la línea base real del reporte final.
3. **Levantar el sitio real.** No asumir la configuración de spindlelab.cl (Astro
   + HTML a mano + Cloudflare Pages) — cada cliente puede estar en WordPress,
   Shopify, un builder, o código a medida. Identificar: qué plataforma, qué
   trackers corren de verdad (GA4, Meta Pixel, otros — el chequeo ya adelanta
   una lista, pero conviene confirmar en el código), qué formularios propios
   existen y si ya tienen o no checkbox de consentimiento.
4. **Instalar y configurar el gestor de consentimiento**, adaptado a esa
   plataforma. El patrón de referencia (spindlelab.cl, 21-sep-2026): Google
   Consent Mode v2 con `gtag('consent','default',{...denied})` antes de
   `gtag('config',...)`, más los trackers sin API de consentimiento nativa (ej.
   Meta Pixel) envueltos en una función que solo corre si el consentimiento ya
   fue otorgado o cuando el banner lo otorga.

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
5. **Ajustes técnicos según lo que el chequeo detectó** — exactamente esos, ni
   más ni menos: si falta HTTPS, si falta `lang` declarado, si hay una casilla
   de consentimiento premarcada (no cumple el Art. 12, que exige un acto
   afirmativo), si un formulario manda datos sin checkbox.
6. **Plantilla de política de privacidad**, sobre los 12 puntos del Art. 14 ter
   (política, responsable, medio de contacto, categorías de datos, medidas de
   seguridad, los cinco derechos, recurrir ante la Agencia, transferencias
   internacionales, plazo de conservación, origen de los datos, revocar el
   consentimiento, decisiones automatizadas). El responsable que va en el
   documento es **el cliente**, con sus propios datos — nunca copiar el bloque
   de SpindleLab ni el de Ramón personal de otro proyecto.
7. **Verificación final.** Correr el mismo chequeo de nuevo, capturar el
   "después". Si el score no sube tanto como debería pese a que el arreglo es
   real, ver la limitación conocida abajo antes de asumir que algo falló.
8. **Entrega.** Reporte antes/después (con los dos resultados del chequeo, no
   solo el número), qué se instaló, qué queda pendiente para el abogado del
   cliente, y — si apareció algo fuera del alcance original mientras se
   trabajaba — decirlo explícitamente en vez de callarlo o arreglarlo en
   silencio.

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

- **El "antes" existe y es real** — corrido contra el sitio del cliente, no
  estimado. ⚠️ sin antes verificado no hay caso que mostrar.
- **El responsable de la política es el cliente**, con sus datos reales. ⚠️ una
  plantilla con el nombre de otro cliente (o de SpindleLab) pegada sin revisar
  es un error grave, no un detalle.
- **Los ajustes técnicos resuelven lo que el chequeo señaló**, verificado en el
  navegador, no solo "debería funcionar".
- **Nada se instala sin acceso real confirmado.** ⚠️ trabajar sobre una promesa
  de acceso que nunca llegó es la forma más común de que esto se atrase.

## Errores típicos del oficio (y su señal temprana)

- **Empezar sin acceso real.** **Señal:** vas a "probar algo" sobre un sitio
  cuyo hosting/repo no tienes abierto todavía.
- **Copiar la plantilla de política de otro caso sin cambiar el responsable.**
  **Señal:** el documento que vas a entregar todavía dice "SpindleLab" o el
  nombre de otro cliente.
- **Confundir el score sin subir con un arreglo que no funcionó.** **Señal:**
  vas a decirle al cliente "no sirvió" sin haber abierto el navegador a
  comprobar el bloqueo real primero.
- **Encontrar algo más grande en el camino y absorberlo en silencio** (como pasó
  con el formulario roto de spindlelab.cl). **Señal:** vas a arreglar algo que no
  estaba en el alcance sin decírselo al cliente, o a ignorarlo porque "no es lo
  que pidieron".
- **Prometer cumplimiento.** **Señal:** estás por escribir o decir "ya cumples
  con la ley" en vez de "esto es lo que el chequeo ya no señala".

## Límite del rol

Instalo, arreglo lo técnico y entrego la plantilla y la verificación. **No**
reemplazo al abogado del cliente (la plantilla la revisa y adapta un abogado,
no yo), **no** certifico cumplimiento, **no** decido el precio final sin que
Ramón confirme si el caso se salió de lo esperado, **no** publico nada del
cliente como caso de éxito sin su permiso explícito.

## De dónde saco los datos

- **El resultado antes/después:** del chequeo público, corrido de verdad contra
  el dominio del cliente, dos veces.
- **La configuración real del sitio:** del código/CMS del cliente, nunca asumida
  desde otro proyecto.
- **El contenido de la política:** la estructura sale de la ley (Art. 14 ter);
  los datos del responsable salen del cliente.

## Contrato

- **Recibe:** una venta del kit ya pagada en el checkout (el pedido trae dominio,
  razón social, RUT, giro, dirección y plataforma) + el acceso real al sitio
  (hosting/repo/CMS), que se pide aparte por correo.
- **Entrega:** gestor de consentimiento instalado y verificado en navegador,
  ajustes técnicos del chequeo resueltos, plantilla de política con los datos
  del cliente, reporte antes/después con los dos resultados del chequeo.
- **Aprueba:** Ramón revisa el reporte final antes de que salga al cliente.

## Criterio de término (no está listo hasta que esto pasa)

- [ ] Acceso real confirmado antes de instalar nada.
- [ ] Chequeo "antes" corrido y guardado (score + detalle), antes de tocar el sitio.
- [ ] Gestor de consentimiento instalado y **verificado en el navegador**
      (bloquea hasta aceptar, persiste al recargar) — no solo asumido por el
      score del chequeo.
- [ ] Ajustes técnicos resueltos exactamente los que el chequeo señaló.
- [ ] Plantilla de política con el responsable y los datos del **cliente**,
      nunca copiados de otro caso.
- [ ] Chequeo "después" corrido y guardado.
- [ ] Si apareció algo fuera de alcance en el camino, se avisó al cliente — no
      se arregló ni se ignoró en silencio.
- [ ] Reporte antes/después entregado, con el límite de "no es asesoría legal"
      dicho explícitamente.

## Aprendido a golpes (principio + respaldo)

> ✅ **Principio:** *el acceso al sitio del cliente se pide real y explícito
> antes de instalar nada — nunca se asume, nunca se improvisa un snippet a
> mitad de camino porque el acceso no llegó.* **Respaldo:** decisión explícita
> de Ramón, 21-sep-2026, al definir este protocolo.

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
