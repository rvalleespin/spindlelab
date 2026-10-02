# Instructivo contable de SpindleLab — para entenderlo, no para memorizarlo

> **Para qué sirve.** Ahora entra dinero a la cuenta de la empresa. Eso cambia el juego:
> hasta septiembre la pregunta era "¿hay que declarar aunque no entre nada?" (sí, y está
> resuelto en `ventas/obligaciones-tributarias.md`). Desde ahora la pregunta es **qué hacer
> con cada peso que entra**, y eso sí se puede hacer mal de formas que cuestan plata.
>
> Este documento explica la lógica, no los formularios. Son **seis ideas**. Si se entienden,
> el resto es rutina; si no, ningún contador alcanza a salvarlo.
>
> **Advertencia que no se borra.** Esto lo escribió una sesión de Claude Code, no un contador.
> Las fuentes están linkeadas y las cifras marcadas. **La decisión de régimen y la de cómo
> sacar plata de la empresa se toman con contador, no con este documento.** Lo que sí hace
> este documento es que llegues a esa conversación sabiendo qué preguntar.
>
> Última actualización: 2026-10-02.

---

## Las seis ideas

### 1. La empresa es otra persona, y su plata no es tu plata

SpindleLab SpA (RUT 78.474.925-8) es un contribuyente distinto de Ramón. Tiene su propio RUT,
sus propias declaraciones y su propia plata. Que seas el único accionista no cambia nada de eso.

Consecuencia práctica, y es la que más cuesta internalizar: **sacar plata de la cuenta de la
empresa para gastos personales no es "usar mi plata", es un retiro**, y los retiros tienen
tratamiento tributario (idea 6). Mezclar las dos cuentas es el error que convierte una
contabilidad de 20 minutos al mes en una pesadilla de marzo.

**La regla operativa es una sola:** cuenta de empresa para cosas de la empresa, cuenta personal
para cosas tuyas, y cuando cruces plata de una a otra, que tenga nombre (sueldo, retiro,
aporte).

### 2. El IVA no es ingreso tuyo. Es plata del fisco que pasa por tu cuenta

Cuando facturas $1.000.000 + IVA, al banco llegan $1.190.000. **$190.000 de eso nunca fueron
tuyos.** Los recaudaste y los tienes que entregar en el F29 del mes siguiente.

Este es el error que quiebra empresas chicas que iban bien: ven el saldo del banco, lo cuentan
como ingreso, lo gastan, y el día 20 descubren que debían el 19 %.

**Contra eso hay una sola defensa, y es de disciplina, no de contabilidad:** cuando entra un
pago, el IVA se aparta mentalmente (o literalmente, a otra cuenta) el mismo día. No el día 19.

El IVA que pagas en tus propias compras (**crédito fiscal**) se resta del que recaudaste
(**débito fiscal**). Pagas la diferencia. Si compraste más IVA del que recaudaste, el saldo
queda como **remanente** a favor para el mes siguiente: no se pierde.

### 3. El IVA se debe cuando emites la factura **o** cuando recibes la plata, lo que pase primero

Esta es la idea nueva y la más importante ahora mismo, porque es la que la intuición pone al
revés. No es "debo el IVA cuando facturo". El artículo 9 del DL 825 dice que en servicios el
impuesto se devenga **a la emisión de la factura o boleta**, y si no se emitió, **en la fecha en
que la remuneración se percibe o se pone a disposición del prestador**
([DL 825, texto del SII](https://www.sii.cl/normativa_legislacion/sobreventasyservicios.pdf)).

En español: **si la plata ya entró a la cuenta de la empresa, el IVA de ese mes se debe, hayas
emitido la factura o no.** Recibir primero y facturar después no corre el plazo: lo único que
hace es dejarte sin el documento que respalda un impuesto que igual debes.

> ⚠️ **Esto decide en qué F29 cae el pago 1.** El pago 1 está **en proceso** al 2-oct, así que lo
> más probable es que la plata se perciba y la factura se emita en **octubre**: entonces el IVA va
> en el **F29 de oct-2026, que vence el 20-nov**, y el **F29 de sep-2026 (20-oct) todavía va en
> ceros**. Lo que define el mes no es cuándo cerraste el trato: es la fecha de la factura o la de
> la plata, la que ocurra primero. **Si algo entró en septiembre, ese F29 deja de ir en ceros.**

### 4. El impuesto a la renta se paga sobre la utilidad, no sobre lo que entró

Son dos impuestos distintos y se confunden todo el tiempo:

| | **IVA** | **Impuesto a la renta** |
|---|---|---|
| Sobre qué | cada venta, 19 % del neto | la **utilidad** del año: ingresos menos gastos |
| Cuándo | mensual, F29 | anual, F22 en abril (con anticipos mensuales, los PPM) |
| Si no hay utilidad | **igual se debe** si hubo ventas | no hay impuesto que pagar, pero **igual se declara** |

Que entren $10 millones no significa que debas impuesto a la renta sobre $10 millones. Si
gastaste $4 millones en cosas de la empresa, la utilidad son $6 millones y el impuesto se
calcula sobre eso. **Por eso los gastos importan: cada gasto legítimo documentado baja el
impuesto.** Y por eso la idea 5 es la que más plata mueve.

### 5. Un gasto solo existe si hay documento a nombre de la empresa

Un gasto que no está documentado a nombre del RUT de la empresa, para el SII **no existe**. No
baja la utilidad, no da crédito fiscal de IVA, no sirve de nada.

Hoy esto está costando plata de verdad. Google Workspace, Apollo, Higgsfield, Metricool,
Cloudflare, los dominios: todo sale de la tarjeta personal y con documento a nombre de Ramón.
**Son gastos reales del negocio que tributariamente no cuentan.**

**Qué hacer, en orden de impacto:**

1. Cambiar el RUT y los datos de facturación de cada suscripción al de la SpA, y pagar con la
   cuenta o tarjeta de la empresa.
2. Pedir factura, no boleta, siempre que el proveedor pueda emitirla.
3. Guardar todo. La factura electrónica chilena llega sola al SII, así que esas se registran
   casi solas; las compras al extranjero son las que hay que juntar a mano.

⚠️ Los servicios digitales extranjeros (Google, Meta, OpenAI, Higgsfield) tienen regla propia de
IVA y no todos dan crédito fiscal igual. **Eso lo resuelve el contador, no este documento.**

### 6. Sacar plata de la empresa es una decisión, y hay tres formas

Cuando quieras pasar plata de la SpA a tu bolsillo, no es "transferir". Hay tres caminos y
tributan distinto:

| Forma | Qué es | Efecto en la empresa | Efecto en ti |
|---|---|---|---|
| **Sueldo empresarial** | te asignas una remuneración por el trabajo que realmente haces en la empresa (art. 31 N°6 LIR) | **es gasto**: baja la utilidad y por lo tanto el impuesto de la empresa | es renta del trabajo (art. 42 N°1), afecta a Impuesto Único de Segunda Categoría |
| **Retiro de utilidades** | sacas utilidad ya generada | **no es gasto**: no baja nada | tributa en tu Global Complementario |
| **Boleta de honorarios** a la empresa | le facturas a tu propia empresa como independiente | es gasto, pero es la vía que más miradas atrae del SII | retención + Global Complementario |

El sueldo empresarial es la única de las tres que **reduce la base imponible de la empresa**
([ref](https://f5contable.cl/blog/sueldo-empresarial-o-retiros)), y requiere que el trabajo sea
real y el monto razonablemente proporcionado. Según el criterio vigente a 2026, no es
obligatorio enterar cotizaciones previsionales para que el gasto califique como tal
([ref](https://www.circuloverde.cl/que-debemos-entender-por-sueldo-empresarial-segun-los-criterios-vigentes-al-ano-2026-en-los-ambitos-tributario-laboral-y-previsional/)),
aunque eso no significa que convenga no cotizar: es tu previsión y tu salud.

⚠️ **Cuál de las tres conviene depende del régimen** (sección siguiente) y de cuánto piensas
sacar. Es la segunda pregunta para el contador.

---

## La respuesta a lo de la exención de IVA

Preguntaste qué te conviene "en cuanto al pago o exención de impuesto según la categoría de la
empresa". La respuesta corta es incómoda pero es mejor saberla ahora:

> ### SpindleLab SpA no puede acceder a la exención de IVA de los servicios profesionales.

La exención que existe para consultorías es la de las **sociedades de profesionales**, que
emiten documentos **exentos de IVA**. Pero el SII exige, como primer requisito, que
**"debe tratarse de una sociedad de personas"**
([SII, requisitos](https://www.sii.cl/preguntas_frecuentes/iva_servicios_profesionales/001_320_8297.htm)).
Eso deja fuera a la SpA y a la sociedad anónima: solo califican la **Ltda.** y la sociedad en
comandita simple.

Los otros requisitos, para que se vea el cuadro completo:

- objeto **exclusivo**: prestación de servicios o asesorías profesionales;
- los servicios se prestan por intermedio de los socios;
- **todos** los socios ejercen su profesión para la sociedad: ninguno puede solo poner capital;
- las profesiones de los socios deben ser idénticas, similares, afines o complementarias;
- todos deben tener el título que los habilita.

La Ley 21.713 agregó flexibilidad en la **categoría**: una sociedad de profesionales puede
tributar en segunda categoría (boletas de honorarios) o acogerse a primera categoría emitiendo
**facturas exentas**, sin perder la exención de IVA. Pero esa flexibilidad es para quien ya
califica. **La forma societaria es el filtro, y la SpA no lo pasa.**

### Entonces, ¿qué significa esto en la práctica?

**SpindleLab SpA factura con 19 % de IVA. Punto.** Y hay que dejar de tratarlo como un problema,
porque para la mayor parte de la cartera no lo es:

- **Cliente empresa con giro** (el ICP real: contadores, abogados, clínicas, corredoras):
  el IVA que le cobras es **crédito fiscal para él**. Lo recupera. Le da exactamente lo mismo.
  Para este cliente el 19 % es neutro.
- **Cliente persona natural o exento** (el caso de María Loreto): el 19 % es **costo real** para
  ella. Ahí sí encarece.

En ese segundo caso no hay truco disponible: la cotización ya pactó **"+ IVA"**, que es la regla
correcta y la que evitó regalar IVA en el contrato de Bernardo. Se mantiene.

> **Lo único que de verdad habría que evaluar algún día**, y no es urgente ni gratis: si la
> cartera se llenara de clientes personas naturales, existiría la discusión de constituir una
> **Ltda. de profesionales** aparte para esa línea. Es una decisión de estructura, con costo de
> constitución y de contabilidad, y requiere socios profesionales reales (no basta con uno).
> **Hoy no se hace.** Queda anotado para no redescubrirlo en seis meses.

---

## La categoría y el régimen: lo que falta saber

**La categoría ya está definida y no es opcional:** una SpA que presta servicios es
contribuyente de **Primera Categoría**. Lo que sí es opcional, y es donde está la plata, es el
**régimen** dentro de ProPyme. Hay dos, y **todavía no sabemos cuál quedó marcado** en el inicio
de actividades. Esa es la pregunta 2 de `ventas/obligaciones-tributarias.md` y sigue abierta.

| | **ProPyme General — 14 D N°3** | **ProPyme Transparente — 14 D N°8** |
|---|---|---|
| Impuesto que paga la empresa | **sí**: Impuesto de Primera Categoría. Tasa general 25 %, con rebaja transitoria a **12,5 %** (AT 2026-2027) y 15 % (AT 2028) ⚠️ confirmar vigencia | **0 %**: la empresa no paga impuesto a la renta |
| Quién paga, entonces | la empresa ahora; tú después, al retirar | **tú, en tu Global Complementario**, el mismo año en que la empresa genera la utilidad |
| ¿Tributas sin haber retirado? | no: tributas cuando retiras | **sí**: la base se te asigna completa, hayas retirado o no |
| Contabilidad | más exigente | simplificada, más barata de mantener |
| PPM mensual | 0,25 %, rebajado a 0,125 % ⚠️ confirmar | igual, 0,125 % ⚠️ confirmar |

Fuentes: [comparativo 14D3 / 14D8](https://contable.app/blog/regimen-pro-pyme-14d3-14d8) ·
[14 D N°3](https://edig.cl/2020/10/07/regimen-pro-pyme-general-14-d-n-3/) ·
[14 D N°8](https://edig.cl/2020/10/07/regimen-pro-pyme-transparente-14-d-n8/).

### Qué apunta a qué, en tu caso concreto

No es una recomendación cerrada, es el razonamiento que hay que llevarle al contador:

**A favor de Transparente (14 D N°8), que es lo que a primera vista calza con un solo dueño y
facturación todavía baja:**

- La empresa no paga Primera Categoría. La utilidad llega directo a tu declaración personal.
- Y ahí está el punto que decide: el **primer tramo del Global Complementario es 0 %** hasta
  **13,5 UTA**, del orden de **$11,6 millones al año** con valores de 2026. Si la utilidad total
  tuya cabe en ese tramo, el impuesto a la renta es **cero**, mientras que en 14 D N°3 la
  empresa habría pagado 12,5 % de todas formas. ⚠️ El valor de la UTA y los tramos los confirma
  el contador.
- Contabilidad simplificada: menos trabajo y menos honorarios.
- Permite retirar sin período mínimo de permanencia.

**A favor de General (14 D N°3):**

- Si la facturación crece y tu renta personal sube de tramo, el marginal del Global
  Complementario supera el 25 %. Ahí conviene que la utilidad quede tributando en la empresa y
  retirar de a poco.
- Si quieres **reinvertir** en vez de sacar: en Transparente pagas impuesto personal igual,
  aunque la plata se quede adentro. Eso puede doler justo en el año en que más necesitas
  capital.

**Conclusión honesta:** con un solo dueño y la facturación actual, Transparente tiene buena
pinta. Pero esto depende de **tu renta personal total**, que incluye lo que cobraste como
persona natural este año, y de cuánto pienses reinvertir en 2027. Son datos que yo no tengo.
**Es exactamente la conversación de 30 minutos que justifica el contador.**

⚠️ **Y antes de pensar en cambiarse:** el cambio de régimen tiene plazos (en general se ejerce
dentro de los primeros meses del año comercial). Si el régimen que quedó marcado no es el que
conviene, **saber eso en octubre es muy distinto a saberlo en mayo.**

---

## El pago 1, con números

Es la Fase 1 de María Loreto: **30 % = $424.830 con IVA** (del proyecto de $1.190.000 + IVA).
Vale desarmarlo, porque el saldo del banco va a decir $424.830 y esa cifra engaña:

| Concepto | Monto | De quién es |
|---|---|---|
| Entra a la cuenta | **$424.830** | |
| IVA (19 % sobre el neto) | **−$67.830** | **del fisco.** Se entrega en el F29 del mes siguiente |
| Ingreso real de la empresa | **$357.000** | de la empresa |
| PPM (0,125 % del neto) ⚠️ tasa a confirmar | **−$446** | anticipo de la renta, va en el mismo F29 |
| Queda para gastos del mes y retiro | **≈ $356.550** | |

**La cifra que importa recordar es $67.830.** Ese es el pedazo que no es tuyo ni de la empresa.
Antes de mover un peso a tu cuenta personal, ese monto se aparta.

Y de los $356.550 restantes, primero salen los gastos del negocio del mes (las suscripciones,
los dominios, lo que sea que esté pagando la operación). **Lo que sobra después de eso es lo que
se puede retirar sin dejar la empresa en descubierto el día 20.**

## Cómo sacar ese dinero: retiro, no contrato

Para este pago, **retiro**. Sin discusión, y por tres razones:

1. **No requiere nada.** Un retiro es una transferencia de la cuenta de la empresa a la tuya,
   registrada como retiro del accionista. No hay contrato que firmar, ni liquidación que emitir,
   ni planilla mensual que mantener. Es legal y es lo normal en una SpA de un solo dueño.
2. **Un sueldo empresarial para un pago de $357.000 no se sostiene.** El sueldo empresarial exige
   una remuneración mensual **razonablemente proporcionada** por un trabajo real, y eso supone un
   flujo estable que todavía no existe. Montarlo ahora significa asumir una obligación mensual
   fija con el primer ingreso de la empresa en la mano.
3. **Y su principal ventaja depende del régimen, que todavía no sabemos.** El sueldo empresarial
   sirve porque **es gasto** y baja la utilidad. Pero si el régimen quedó en **14 D N°8
   (Transparente), la empresa paga 0 % de todas formas**: no hay impuesto que bajar, y la ventaja
   casi se esfuma. Montar una estructura de sueldo antes de saber el régimen es trabajar al revés.

**Entonces, el orden correcto es este:**

| Cuándo | Qué |
|---|---|
| Ahora | Emitir la factura, apartar el IVA, pagar los gastos del mes, **retirar el resto** |
| Al saber el régimen | Recién ahí evaluar sueldo empresarial, con el contador |
| Cuando haya ingreso mensual recurrente | Ahí el sueldo empresarial empieza a tener sentido de verdad |

⚠️ **Lo único que un retiro sí necesita:** que quede registrado como retiro en la contabilidad de
la empresa, y que la transferencia tenga una descripción clara ("retiro accionista oct-2026").
No es burocracia: es lo que evita que en abril esa plata parezca un misterio.

## La idea de que el próximo cliente "boletee" a tu nombre

Es una pregunta razonable y la respuesta es **no**, pero el motivo principal no es legal. Es
aritmético, y conviene verlo antes del argumento de riesgo.

### Primero, la aritmética: para tu cliente objetivo, no ahorras nada

Es cierto que una **boleta de honorarios de persona natural está exenta de IVA**
(art. 12 letra E N°8 de la Ley del IVA, en relación con el art. 42 de la LIR — exención que la
Ley 21.420 mantuvo intacta,
[ref](https://www.sii.cl/destacados/iva_prestacion_servicios/)). El 19 % desaparece. Pero mira
qué pasa según quién sea el cliente:

| Cliente | Facturando por la SpA | Boleteando como persona natural |
|---|---|---|
| **Empresa con giro** (tu ICP: contadores, abogados, clínicas) | le cobras 19 %, **que él recupera como crédito fiscal**. Costo real para él: **cero** | no hay IVA, **pero te retiene 15,25 %** (2026) y el resto va a tu Global Complementario |
| **Persona natural** (María Loreto) | el 19 % es costo real para ella | no hay IVA ni retención, pero el ingreso completo entra a tu Global Complementario |

**Para el cliente empresa, que es el ICP del negocio, cambiar a boleta te deja peor:** sacrificas
un IVA que a él no le costaba nada y a cambio te comes una retención de 15,25 % sobre el bruto.
No es una optimización, es un intercambio desfavorable.

Solo en el caso del cliente persona natural hay un ahorro para *él*, y lo pagas tú en forma de
renta personal más alta y de una empresa que vuelve a no facturar nada.

### Segundo, el riesgo, que es real pero secundario

Si el cliente llega por spindlelab.cl, recibe una cotización de SpindleLab, conversa con
hola@spindlelab.cl y contrata a la marca, entonces **quien presta el servicio es la empresa**. Que
el documento salga de tu RUT personal es una desalineación entre lo que ocurre y lo que se
documenta.

El Código Tributario sanciona como elusión dos conductas: el **abuso de las formas jurídicas**
(actos que no producen resultados relevantes más allá del ahorro tributario) y la **simulación**
(usar actos o contratos para disfrazar la naturaleza real del negocio). La Ley 21.713 de 2024
reforzó esa norma general
([ref](https://mirada.fen.uchile.cl/articulo/ver/modernizacion-tributaria-en-marcha-lo-que-cambia-con-la-ley-21-713)).
Un arreglo cuyo único efecto relevante es no pagar IVA, sobre un negocio que todo el resto de la
evidencia atribuye a la SpA, es exactamente la figura que esa norma describe.

Y hay un detalle que lo hace peor en este caso particular: **el sitio publica el RUT y la razón
social de la SpA como señal de confianza**. Operar visiblemente como SpindleLab SpA y documentar
como persona natural es una contradicción que queda escrita en tu propio sitio.

### Lo que sí es legítimo

Que tomes un trabajo **genuinamente aparte**, a tu nombre, no vendido como SpindleLab, sin usar la
marca ni el aparato de la empresa, y lo boletees como independiente. Eso no es un truco: es
trabajo freelance, y cualquiera puede tener una empresa y además trabajar por su cuenta. **Lo que
no funciona es que "el próximo cliente de SpindleLab" sea ese caso.**

### La regla que queda

> **Contrato vendido como SpindleLab → factura de la SpA, + IVA. Sin excepciones por conveniencia
> tributaria.** Es la misma regla del 25-jul-2026 (`ventas/proyectos-en-curso.md`), y esta
> conversación la confirma en vez de abrirla.

Si el 19 % se vuelve un problema comercial recurrente con clientes personas naturales, el camino
no es boletear: es la discusión de estructura que quedó anotada arriba (una Ltda. de profesionales
para esa línea), que cuesta plata y requiere socios profesionales reales. Hoy no se hace.

---

## La rutina mensual, en concreto

Esto es el instructivo propiamente. Son cuatro movimientos, no cuarenta.

**Cada vez que cierras una venta:**

1. Emites la **factura electrónica** de la SpA, con el neto y el 19 % separados. Si el cliente
   paga por fase, una factura por fase.
2. Apartas el IVA el día que entra la plata. No el día 19.

**Cada vez que compras algo para el negocio:**

3. Que el documento salga a nombre de **SpindleLab SpA, RUT 78.474.925-8**. Factura si se puede.

**Entre el 1 y el 20 de cada mes:**

4. Se declara el **F29** del mes anterior: IVA recaudado menos IVA de las compras, más el PPM.
   Y se guarda el comprobante con folio, como ya quedó convenido en §8 de
   `ventas/obligaciones-tributarias.md`.

Una vez al año, en marzo y abril, van las declaraciones juradas y el F22. Eso lo arma el
contador con lo que tú hayas hecho bien durante los doce meses. **Si los doce meses están
ordenados, abril es un trámite; si no, abril es una reconstrucción.**

---

## Los errores que cuestan plata, en una lista

1. **Gastarse el IVA.** El más común y el más caro.
2. **Pagar gastos del negocio con la tarjeta personal.** Deja de ser gasto deducible y pierdes
   el crédito fiscal.
3. **Recibir plata sin facturar.** No postergas el IVA (idea 3): te quedas sin el documento y
   con el impuesto.
4. **Mezclar las cuentas.** Convierte 20 minutos al mes en un fin de semana en marzo.
5. **Cotizar con "IVA incluido".** Ya costó ~$37.553 una vez. Las cotizaciones dicen "+ IVA".
6. **Dejar el régimen al azar.** Es la diferencia entre pagar 12,5 % y pagar 0 %, y la ventana
   para corregirlo no está abierta todo el año.

---

## Lo que falta para cerrar esto

| # | Pregunta | Quién | Por qué urge |
|---|---|---|---|
| 1 | **¿Entró algo en septiembre, o el pago 1 cae recién en octubre?** Y la fecha de la factura | Ramón | Define si el F29 de sep-2026 (vence 20-oct) va en ceros o con IVA, y si el pago 1 cae en el F29 de oct (vence 20-nov) |
| 2 | **¿Qué régimen quedó marcado, 14 D N°3 o 14 D N°8?** | Mi SII → situación tributaria | Decide si pagas 12,5 % o 0 %, y si hay que corregirlo hay plazo |
| 3 | **¿Cuál fue tu renta personal total de 2026?** (honorarios incluidos) | Ramón | Sin ese número, la comparación de regímenes es teoría |
| 4 | **Contador.** | Ramón | Las preguntas 2 y 3 se cruzan en una conversación de 30 minutos. Es el mejor dinero que vas a gastar este mes |
