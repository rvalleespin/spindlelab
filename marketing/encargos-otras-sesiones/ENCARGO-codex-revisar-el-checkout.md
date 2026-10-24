# Encargo a Codex: revisar el checkout de Verifica y Cumple

**Para:** una sesión de Codex, en modo solo lectura
**De:** la sesión que escribió el código · 24-oct-2026
**Cómo se corre:** el comando está al final de este archivo.

---

## Qué es esto

Verifica y Cumple vende un kit de cumplimiento de la Ley 21.719 chilena por compra directa en el
sitio, $149.000 + IVA = **$177.310**. Corre en Cloudflare Pages Functions (runtime de Workers:
Web Crypto, sin Node, sin npm en runtime) con D1 (SQLite) y KV.

El camino del dinero, entero:

1. La persona corre un chequeo gratuito de su sitio.
2. Si el resultado la hace elegible, aparece un botón que abre un paso de dos campos (correo +
   consentimiento).
3. `POST /api/pedido` rearma la elegibilidad **en el servidor**, congela el contrato, crea la
   fila en D1 y crea una orden en Mercado Pago.
4. La persona paga. Mercado Pago avisa a `POST /api/webhook-mp`, que verifica la firma y marca
   el pedido como pagado.
5. La persona vuelve a `/pedido/?id=...`, manda los datos de su empresa por `POST /api/intake`,
   y nosotros hacemos el trabajo.

**Nada de esto está desplegado todavía.** Nadie ha pagado nunca. Es el momento de encontrar los
errores.

---

## Los archivos

Código, en `/Users/ramon/vyc-ley21719/verificaycumple/`:

| archivo | qué hace |
|---|---|
| `functions/api/pedido.js` | `GET` (lee el pedido) y `POST` (lo crea y abre el pago) |
| `functions/api/webhook-mp.js` | la notificación de Mercado Pago: el único punto que marca «pagado» |
| `functions/api/firma-mp.js` | verificación de la firma HMAC |
| `functions/api/cobro.js` | decide si una orden habilita el trabajo; crea y lee órdenes |
| `functions/api/pedidos.js` | estados, transiciones, ids, el cuerpo de la orden, el esquema de D1 |
| `functions/api/almacen.js` | acceso a D1 |
| `functions/api/elegibilidad.js` | la compuerta de venta |
| `functions/api/etapas.js` | qué ve el cliente en cada estado |
| `functions/api/intake.js` | los datos de la empresa, después de pagar |
| `public/index.html` | la portada: el chequeo, la compuerta del botón y el paso de compra |
| `public/pedido/index.html` | la pantalla privada del pedido |

Pruebas, en `/Users/ramon/vyc-ideas/laboratorio/01-cumplimiento-ley-21719/pruebas/`:
`prueba-crear-pedido.mjs`, `prueba-webhook.mjs`, `prueba-cobro.mjs`, `prueba-almacen.mjs`,
`prueba-pedidos.mjs`, `prueba-etapas.mjs`, `prueba-elegibilidad.mjs`, `prueba-firma-mp.mjs`,
`prueba-intake.mjs`, `prueba-compuerta-boton.mjs`. Se corren con `node prueba-X.mjs`.

---

## Lo que ya está verificado: no hace falta repetirlo

- **813 aserciones en verde**, y **24 mutaciones comprobadas**: se rompe el código a propósito y
  se confirma que la prueba se pone roja. Ese es el estándar del proyecto.
- El webhook está desplegado y verificado en producción: `GET` da 405, los `POST` con firma mala
  dan 401 con su motivo, las rutas inventadas dan 404 de verdad.
- La firma HMAC se comprobó contra el vector de ejemplo de la documentación de Mercado Pago.
- El contrato con la Orders API se verificó contra la referencia oficial: `X-Idempotency-Key`
  obligatoria, respuesta 201 con `checkout_url` de primer nivel, y el enum de nueve estados.

---

## Lo que necesito de ti

Encuentra **defectos concretos**, cada uno con un escenario reproducible: entradas o secuencia de
eventos → resultado incorrecto. No quiero una auditoría de estilo ni propuestas de reescritura.

Mira en este orden, que es el de lo que más cuesta si está mal:

### 1. El camino del dinero, en las dos direcciones

- ¿Hay alguna forma de **recibir el kit sin pagar**? Entradas manipuladas, estados intermedios,
  carreras entre el checkout y el webhook, reintentos.
- ¿Hay alguna forma de **pagar y que el pedido nunca llegue a `pagado`**? Es el peor resultado:
  la plata salió y no queda rastro de que alguien está esperando algo.
- ¿Alguna de **cobrar dos veces** por lo mismo?

### 2. Las pruebas: ¿restringen el código o lo copian?

Es donde más falta un ojo de afuera, y lo digo porque ya pasó tres veces hoy: una aserción que
compara contra un literal **copiado de la salida** del código no protege nada, lo clava. Un
ejemplo real de este repo, ya corregido: la prueba de la clave de idempotencia afirmaba
`clave === 'ev_123456'` pasándole un `dataId` distinto, o sea que fijaba como correcto que el
`dataId` se descartara, que era justamente el defecto.

Concretamente: **por cada aserción que compara contra un valor literal, pregúntate si ese literal
se eligió por una razón o se copió de lo que el código devuelve.** Y dime cuáles seguirían verdes
si el código estuviera mal.

También: ¿alguna prueba **muere** (lanza) en vez de fallar limpio cuando el código se rompe? En
la batería eso se ve como una línea de cierre que falta y es fácil de confundir con otra cosa.

### 3. Lo que la pantalla dice contra lo que el dato sostiene

El producto entero se trata de no afirmar lo que no se puede confirmar, así que esto no es un
detalle de redacción. Varios de los defectos de hoy fueron de esta forma: una etapa que decía
«recibimos el acceso» cuando el dato solo decía que el cliente lo había mandado; una pantalla que
decía «estamos confirmando tu pago» cuando la orden nunca se había creado.

Busca más: ¿hay alguna frase en `etapas.js`, en la portada o en la pantalla del pedido que afirme
algo que los datos disponibles no respaldan?

### 4. La superficie nueva

`POST /api/pedido` y `POST /api/intake` son públicos, escriben en D1 y uno de ellos dispara una
llamada saliente con nuestro token de Mercado Pago. ¿Qué puede hacer alguien sin ninguna
credencial? ¿Qué filtran los mensajes de error? La llave del espacio privado es el enlace —un id
de 32 caracteres hexadecimales de azar— y no hay cuenta ni contraseña: ¿esa decisión está bien
sostenida en el código o hay algún camino que la rodea?

---

## Reglas de la casa, para que tus sugerencias sirvan

- **No propongas reescrituras grandes, frameworks, ORMs ni librerías de prueba.** No hay `npm`
  en runtime y las pruebas corren con Node pelado a propósito.
- **No propongas migraciones de esquema a la ligera.** La base ya está en producción.
- Si algo te parece mal pero no puedes reproducirlo leyendo el código, **dilo como sospecha y no
  como hallazgo**. Un hallazgo inventado cuesta más que uno que se escapa, porque manda a
  arreglar algo que no está roto.
- Si encuentras que una defensa ya existe en otra parte del código y hace redundante lo que ibas
  a señalar, **dilo igual**: saber que algo está cubierto dos veces también es útil.

---

## Dónde dejas tu respuesta

Escribe un archivo nuevo en
`/Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/marketing/encargos-otras-sesiones/revision-codex-checkout.md`

con esta forma, un bloque por hallazgo:

```
### N. Título corto del defecto

- **Dónde:** archivo:línea
- **Gravedad:** alta / media / baja
- **Escenario:** entradas o secuencia concreta → qué pasa mal
- **Por qué importa:** la consecuencia en plata, en confianza o en trabajo perdido
- **Arreglo:** concreto y acotado
- **Cómo comprobarlo:** la prueba o la mutación que lo dejaría cubierto
```

Y al final, una sección **«Lo que miré y está bien»**, breve. Sirve para saber qué quedó cubierto
y qué no alcanzaste a ver.

Si no encuentras nada en alguna de las cuatro áreas, dilo. Es un resultado, no un vacío.

---

## El comando

```bash
codex exec --cd /Users/ramon/vyc-ley21719/verificaycumple \
  --add-dir /Users/ramon/vyc-ideas/laboratorio/01-cumplimiento-ley-21719/pruebas \
  --add-dir "/Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/marketing/encargos-otras-sesiones" \
  -s workspace-write \
  - < "/Users/ramon/Library/Mobile Documents/com~apple~CloudDocs/SPINDLELAB/marketing/encargos-otras-sesiones/ENCARGO-codex-revisar-el-checkout.md"
```

Va con `workspace-write` y no con `read-only` por una sola razón: tiene que poder **escribir su
informe**. No necesita tocar nada más, y este encargo le pide explícitamente que no proponga
cambios aplicados sino hallazgos.
