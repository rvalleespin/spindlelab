# Los 9 hallazgos del ensayo del 4-nov-2026 — estado al cierre

El ensayo fue la compra real de $1.190 de punta a punta: creado 13:13 → pagado 13:35 →
inicio avisado 13:40 → entregado 13:51. Salió completo, y dejó 9 hallazgos.

## Cerrados con código y prueba (6)

| # | Qué era | Qué se hizo | Mutaciones |
|---|---|---|---|
| 1 | El aviso de venta no reintentaba: `esPasajero` clasificaba el fallo y nadie actuaba sobre esa clasificación | Un reintento, honrando el `retry-after` de Resend con tope de 5 s | 4, todas discriminan |
| 3 | El borrador de un pedido entregado no se podía corregir: la rama de `entregado` cortaba en seco | `corregir_borrador: true`, sin mandar otro correo, con la misma vara de largo que el cierre | 5, todas discriminan |
| 4 | «Acceso declarado» no decía ningún dato de acceso | Dice dónde llega la invitación, de quién viene, y que se mire el spam antes de escribir | 5, todas discriminan |
| 7 | El aviso de «dejamos de revisar» les decía lo mismo a dos esperas distintas | En «pago pendiente» dice que la demora es normal y cuánto puede tardar | 5, todas discriminan |
| 8 | El borrador salió en Markdown y el canal es texto plano | Reescrito sin un solo símbolo de formato | — |
| 9 | El borrador se entregaba sin decir qué hacer con él | Guía de 4 pasos + el bloque «¿Y si no lo publico?» | — |

## Retirados: me los había anotado y eran falsos (2)

**#2 — «el chequeo profundo contesta 409 y la pantalla no lo dice».** Falso. `index.html:3813`
corta con `if (estadoDelProfundo() !== 'listo')` y pinta «No alcanzamos a medirlo». Vi el 409
porque probé con `curl` en vez de con la página.

**La mitad de #4 — «la plataforma "otro" no tiene instrucciones».** Falso. `no-se` y `otro`
caen en `SIN_PLATAFORMA`, que es un genérico deliberado y bien escrito. Las otras 7 plataformas
sí tienen ficha propia.

## CERRADO: #5, el aviso de venta — resuelto el 4-nov por la tarde

**La causa, con la evidencia del registro de correo de Workspace:**

    Asunto:       Venta de Verifica y Cumple · sitio-de-prueba-vyc.pages.dev
    Remitente:    …@rsend.envios.spindlelab.cl
    Destinatario: hola@spindlelab.cl
    10:35:07      Recibido desde un servidor SMTP · 250 2.0.0 OK
    10:35:08      Insertado en la canalización de entrega de Gmail
    10:35:08      Marcado como spam
    Estado:       0/1 entregados

Gmail **lo recibió y lo marcó como spam**. La causa es la dirección, no el contenido ni el
envío: un `From` de un subdominio del propio dominio de Workspace, entrando desde una IP de
afuera, es la señal clásica de suplantación, y Gmail la filtra aunque SPF y DKIM pasen — que
pasan, los dos están bien configurados. El recibo al comprador, mandado en el mismo
`Promise.all` y en el mismo segundo, llegó sin problema porque va a un Gmail de consumidor,
que no tiene esa regla.

**El arreglo (decisión de Ramón, 4-nov):** el aviso interno pasa a su Gmail personal, que ya
está probado —recibe el recibo del comprador y el resumen diario del copiloto— en vez de poner
una lista blanca en la consola de Workspace, que es una configuración que alguien puede cambiar
sin acordarse de por qué estaba. Nada de lo que ve un cliente cambia.

Hay una aserción que impide la regresión: el destino de los avisos no puede estar en
`spindlelab.cl` ni en ninguno de sus subdominios. Validada con tres mutaciones, incluida la
sutil —un subdominio que parece distinto y no lo es—.

### Dos cosas que afirmé y eran falsas

**«El spam está completamente vacío.»** Lo di por verificado y no lo estaba: el conector de
Gmail no ve esa carpeta, así que mi búsqueda devolvió vacío por una limitación de la
herramienta y lo leí como un hecho. El correo estaba ahí todo el tiempo.

**«Workspace lo rechazó o lo puso en cuarentena de administrador.»** No: lo aceptó con un
`250 OK` y lo filtró a spam. La dirección de la hipótesis era correcta (suplantación del propio
dominio); el mecanismo, no.

**Y el reintento que agregué por la mañana no servía para esto.** Resend contestó 250 OK: no
hubo ningún fallo que reintentar. El sistema registraba «[aviso] salió» para un correo que
nunca llegó a una bandeja, y por eso estuvo un día entero dándose por enviado.

## Lo otro que sigue siendo tuyo

- Confirmar el plazo de 90 días corridos del art. 41 que asumí en los términos.
- Decidir si el reloj del retracto parte en un clic de botón sin verificar.
- El Juez de la campaña de Meta el 9-nov (quedan ~$78.000).
