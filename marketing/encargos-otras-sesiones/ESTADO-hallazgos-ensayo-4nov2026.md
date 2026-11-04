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

## Abierto, y es tuyo: #5, el aviso de venta que nunca llegó

**Lo que está verificado, no supuesto:**

1. El recibo al cliente y el aviso de venta salen del **mismo `Promise.all`**, con la misma
   clave de Resend y en el mismo instante (`flow-confirmacion.js:249`). El recibo llegó.
   Entonces Resend funcionó.
2. El destino del aviso es correcto: `hola@spindlelab.cl` (`aviso.js:67`).
3. **No está en ninguna carpeta de esa casilla.** Busqué bandeja, spam y papelera: el spam está
   **completamente vacío**, y lo único que aparece con «Verifica y Cumple» en el asunto después
   del 3-nov es el resumen diario del copiloto.
4. SPF y DKIM del subdominio de envío **están bien**. (Primero dije que faltaba el SPF; estaba
   mirando el nombre equivocado. Resend lo pone en `send.envios.spindlelab.cl`, y ahí está:
   `v=spf1 ip4:52.3.252.119 ...`. El DKIM también. DMARC del dominio es `p=quarantine`.)

**La única explicación que calza con las cuatro cosas:** el aviso tiene `From:`
`hola@envios.spindlelab.cl` y `To:` `hola@spindlelab.cl` — o sea, un correo que *parece de tu
propio dominio* entrando desde afuera. Google Workspace tiene una regla específica para eso
(«protección contra correos entrantes que falsifican tu dominio»), que alcanza a los
subdominios y **se aplica aunque SPF y DKIM pasen**, porque de eso justamente se trata. El
recibo no la cruzó porque fue a un Gmail de consumidor, que no tiene esa regla.

Y cuando esa regla actúa, el correo **no va al spam del usuario**: va a la *cuarentena del
administrador*, que es otro lugar y solo se ve desde la consola. Eso explica por qué no está en
ninguna de las tres carpetas.

**Dónde mirarlo (no lo puedo hacer yo, necesita tu consola de administrador):**

- `admin.google.com` → **Informes → Cuarentena**. Si el aviso está ahí, queda confirmado.
- Si está: `admin.google.com` → **Aplicaciones → Google Workspace → Gmail → Seguridad →
  Suplantación de identidad y autenticación**, y agregar `envios.spindlelab.cl` a la lista de
  remitentes permitidos (o cambiar la acción de «rechazar» a «mostrar advertencia»).

**Y el defecto de fondo, que sí es de código y queda anotado:** si Workspace descarta el correo
*después* de que Resend lo aceptó, Resend contesta 200 y el sistema registra «[aviso] salió».
O sea que hoy damos por entregado un correo que nunca llegó, y el reintento del punto 1 no
ayuda porque no hubo ningún fallo que reintentar. Cerrarlo de verdad pide escuchar el webhook
`email.bounced` de Resend, que es un trabajo aparte.

## Lo otro que sigue siendo tuyo

- Confirmar el plazo de 90 días corridos del art. 41 que asumí en los términos.
- Decidir si el reloj del retracto parte en un clic de botón sin verificar.
- El Juez de la campaña de Meta el 9-nov (quedan ~$78.000).
