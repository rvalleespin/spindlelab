# Contraste de las dos revisiones del brief de compra directa

**Fecha:** 23 de octubre de 2026
**Documento revisado:** `brief-producto-compra-directa-verifica-y-cumple.md` (149 líneas, sin cambios)
**Las dos revisiones:**
- `revision-claude-brief-verifica-y-cumple.md` — 34 hallazgos (de 46, tras auditoría)
- `~/codex-revision-brief/revision-codex.md` — 14 hallazgos

> El brief no se tocó. Mismo hash antes y después: `6c1749322175`.

---

## Por qué se hizo con dos modelos, y por qué uno vio menos a propósito

Las dos revisiones **no partieron del mismo material, y esa fue la decisión**:

| | Claude (esta sesión) | Codex |
|---|---|---|
| Qué recibió | el brief, el código del chequeo, mediciones reales, la historia del producto | el brief y las instrucciones: **14.088 caracteres** |
| Qué puede afirmar | lo que el producto hace y lo que no puede hacer | lo que el documento dice y lo que se contradice |
| Su punto ciego | validar el brief contra el producto que ya conoce | no distinguir «no está explicado» de «es imposible» |

La asimetría se ve en el mismo defecto visto por los dos. Sobre las exclusiones, Codex escribe:

> *«no se explica cómo detectará el sistema esas condiciones»*

Y la otra revisión puede decir algo distinto: **no es que no se explique, es que no se puede.** El
chequeo no clasifica plataforma, recibe un solo dominio y no tiene clasificador de tienda. Eso
sale de leer `functions/api/*.js`, no el brief.

**Por qué no se le dio el repo a Codex.** Dos razones, y las dos pesan. La primera es de datos:
el repo tiene **157 archivos con correos o RUT y 494 direcciones de terceros** —abogados,
clínicas y empresas reales de las listas de prospección— que nadie consintió enviar a un
procesador en Estados Unidos. La checklist de la propia guía de Codex lo prohíbe, y hacerlo desde
el repo del producto que vende cumplimiento de la Ley 21.719 sería difícil de defender. La
segunda es de método: **un segundo revisor que comparte tu contexto comparte tus puntos ciegos**,
y habría devuelto una versión de la primera revisión.

Nota sobre el método: `/codex:review` del plugin revisa **el estado de git**, no un archivo. Con
27 archivos sin commitear, ese comando habría enviado las veinte carpetas de skills. Por eso se
aisló el brief en su propia carpeta con su propio git, y se corrió `codex exec` con sandbox
`workspace-write` acotado a ella.

---

## El marcador

| | |
|---|---|
| Coinciden | **9** de los 14 de Codex |
| Solo Codex | **4** |
| Solo Claude | todo lo que exigía leer código o medir |
| Propuestas de Codex que no pasan el filtro | **0** |

---

## 1. Donde coinciden: tratarlos como reales

Dos modelos con material distinto llegaron al mismo defecto. Son los que no vale la pena
discutir más.

| El defecto | Codex | Claude |
|---|---|---|
| El alcance se define por referencia a sí mismo | 1.1 | sí, y es el primero de la lista |
| La exclusión no es una regla que opere antes del pago | 1.2 | sí, con el agravante de que 3 de 4 no son detectables |
| La plantilla de política no tiene límite operativo | 1.5 | sí, y además contradice el «intake mínimo» |
| El muro del acceso queda después de cobrar | 2.3 | sí, y es donde se muere el flujo |
| Los estados del pedido no tienen dueño ni salida | 2.5 | sí, y tampoco tienen fecha |
| La fricción de elegibilidad aparece después del pago | 2.2 | sí |
| El precio no se valida sin medir entregas comparables | 3.1 | sí, y la decisión 3 nombra 2 partidas de 14 |
| El costo completo de cada cobro está sin cuantificar | 3.2 | sí |
| «desde» no es un total y hay que fijarlo antes del pago | 3.4 | sí, y «+ IVA» tampoco es un total |

---

## 2. Lo que solo vio Codex

Son cuatro, y los cuatro se verificaron antes de darlos por buenos.

### 2.1 El alcance de cobertura: se vende «tu sitio» midiendo una página

**Codex (1.3):** «un dominio y el sitio principal asociado» deja ambiguo si entran subdominios,
zonas de inicio de sesión o páginas de campaña. El cliente entiende «todo lo que vive bajo mi
marca»; el equipo puede medir solo una parte.

**Verificado, y es peor de lo que él sospechaba.** El chequeo devuelve
`revisado: https://www.tuane.cl/`: mide **la portada, una sola página**, más la página de
política cuando logra encontrarla. En la medición de prueba ni siquiera pudo leer la política
(`legible: false`). Los propios textos del informe lo dicen —*«En tu página de inicio no vimos un
formulario»*— pero quien paga lo lee como su sitio entero.

**Por qué importa con un precio fijo:** el comprador puede tener la portada limpia y tres
subdominios cargando rastreadores, y el informe que disparó la compra no los miró. El desajuste
aparece durante la entrega, con la plata adentro.

**Ajuste:** decir en la oferta, con las mismas palabras del informe, **qué página se midió** y que
el kit cubre esa. Todo lo demás es revisión de alcance.

### 2.2 Las métricas del piloto: sin ellas no se sabe qué falló

**Codex (3.3):** no está definido qué observaciones permitirán concluir si el monto o el paquete
se sostienen. Sin registrar conversión, elegibilidad y costo por entrega, **no se podrá
distinguir un problema de precio de uno de alcance o de fricción**.

Nadie del panel de cuatro revisores lo dijo, y es el hallazgo más valioso de los suyos: no es un
defecto del producto, es un defecto del experimento.

**Y hay algo que Codex no podía saber:** la demanda orgánica del chequeo es prácticamente cero
desde que salió la campaña de octubre. Los contadores de uso no registran ninguna revisión de
origen orgánico. **El riesgo no es que el piloto diga que no; es que no diga nada**, porque la
muestra no llegue.

**Ajuste:** acordar antes de encender qué se registra —resultados elegibles, clics al checkout,
pagos aprobados, pedidos completados, tiempo y costo por pedido, pedidos pausados— y, dado el
volumen real, aceptar que la validación del precio probablemente **no va a venir del piloto**
sino de cronometrar entregas hechas a mano.

### 2.3 El espacio privado no tiene puerta

**Codex (2.4):** el brief crea un espacio privado después del pago y nunca dice cómo entra la
persona. ¿Contraseña? ¿Enlace? ¿El correo del pago?

**Verificado en el brief:** la palabra «contraseña» aparece dos veces, y las dos son para decir
que **no** se piden las del sitio del cliente. El punto 108 dice que el chequeo gratuito «sigue
sin pedir correo ni crear una cuenta». Entre eso y «se crea un espacio privado del cliente» no hay
nada escrito.

**Por qué importa:** choca de frente con el diferenciador del producto. Si para ver el estado hay
que crear una cuenta, el «sin registro» deja de ser cierto en el momento que más importa.

### 2.4 «No lo pudimos ver» se puede leer como una falla que el kit arregla

**Codex (2.1):** una persona no técnica puede confundir una señal sin confirmar con un problema
observado, y creer que el kit lo va a corregir.

**Verificado en el código de la portada:** el estado `sin-confirmar` se rotula literalmente
**«No lo pudimos ver»**. Es honesto y es correcto, pero puesto al lado de un botón de pago puede
leerse como una de las cosas por las que se está pagando.

**Ajuste:** en la tarjeta de la oferta, separar explícitamente las señales que el kit corrige de
las que quedaron sin confirmar, y decir que esas últimas **no** entran en el precio.

---

## 3. Lo que solo vio Claude, y por qué

Todo lo que exigía leer el código o medir. No es mérito del modelo: es acceso.

- **Tres de las cuatro exclusiones no son detectables.** El chequeo no clasifica plataforma, no
  detecta tienda con carro, recibe un dominio y no ve integraciones.
- **La compuerta que el brief quiere construir ya existe.** `pendientes > 0 ? kit : pregúntanos`,
  y el comentario del código dice «Sin pendientes no se vende nada».
- **Dos exclusiones que el brief no tiene y que sí son detectables:** el sitio que saca 100 (no hay
  nada que venderle) y el que no se pudo medir (no se puede cotizar). En 10 sitios reales fueron 6
  casos.
- **La política de privacidad publicada, versión 1.5**, menciona cero veces pago, compra, cobro,
  factura o Mercado Pago, y afirma que «no guarda nada».
- **La facturación electrónica de la SpA sigue pendiente**: no se puede recibir dinero sin poder
  emitir el documento.
- **El reintento de un pago pendiente puede cobrar dos veces.**
- **No hay techo de entregas** y el que entrega es una persona con horas limitadas.
- **El nombre que el comprador verá en su tarjeta** no es el nombre con el que compró.
- **El «antes y después» no está definido**: el chequeo rápido y el profundo miden cosas
  distintas y no son comparables entre sí.

---

## 4. Las propuestas de Codex contra el filtro

Los 14 hallazgos pasaron por el mismo filtro que mató 12 propuestas propias: ¿inventa un precio,
una garantía o una capacidad? ¿mata la compra directa? ¿borra la frontera entre señal técnica y
cumplimiento legal?

**No cayó ninguno.** Y conviene decir por qué, porque no era obvio:

- **No inventó ni una cifra.** Donde falta un número, lo pone en «dato faltante». En 3.2 llega a
  decir explícitamente que no se fije el monto hasta confirmar el tratamiento tributario.
- **Protegió la compra directa en sus propias palabras:** *«sin exigir una llamada como camino
  típico»* (2.2), *«Mantener el checkout directo para los casos estándar»* (1.2).
- **Sostuvo la frontera legal sin que se lo recordaran en cada punto.** Su síntesis la repite:
  *«no debe afirmar ni insinuar certificación o cumplimiento legal»*.

**Su límite, que es el esperable:** varios de sus ajustes son «definir mejor X». Nombra qué
definir, así que son accionables, pero no pueden decir *«esto no se puede, cambia el enfoque»* —
para eso hay que haber leído el código. Es exactamente el reparto que se buscó.

---

## 5. Qué cambia en las cinco decisiones previas

Las cinco siguen en pie. El contraste suma una sexta y corrige el alcance de una.

1. **Qué corrige el kit, con nombre y apellido.** Sin cambios.
2. **Qué pasa con la plata si el caso no se puede entregar.** Codex lo refuerza desde otro
   ángulo (1.4): la «revisión del alcance» posterior al pago contradice la promesa de paquete
   cerrado.
3. **Cómo se filtra lo que el chequeo no ve.** Sin cambios.
4. **Si el monto que viaja a Mercado Pago es el neto o el bruto.** Sin cambios.
5. **La política de privacidad, antes del botón.** Sin cambios.
6. **NUEVA — qué página se vende.** Decidir y decir que el kit cubre la portada medida, no «el
   sitio», o ampliar el chequeo antes de cobrar por algo que no mide.

Y una advertencia sobre el experimento, que no es una decisión del checkout pero condiciona todo
lo demás: **con la demanda actual, el piloto no va a producir los datos que el brief espera de
él.** El precio se cierra cronometrando entregas, no esperando compradores.

---

## Anexo · Cómo se montó, por si se repite

```bash
# 1. Aislar lo que se va a revisar, y nada más
mkdir ~/codex-revision-brief && cd ~/codex-revision-brief
cp <el-documento> brief.md
# + un INSTRUCCIONES.md con las preguntas y los límites del encargo
git init && git add -A && git commit -m "aislado para revisión externa"

# 2. Comprobar qué saldría: correos, RUTs, tamaño
# 3. Correr con el sandbox acotado a esa carpeta
codex exec -C ~/codex-revision-brief -s workspace-write \
  "Lee INSTRUCCIONES.md y haz exactamente lo que pide. Escribe tu revisión en revision-codex.md."
```

**Si el siguiente paso es que Codex construya y no solo revise**, el montaje cambia: para
construir necesita la estructura, y hoy no hay cómo dársela sin entregarle también las listas de
prospección, porque `verificaycumple/` vive dentro del repo grande. El paso previo sería sacar el
código de Verifica a un repo propio. Ahí sí tiene sentido el plugin y la revisión cruzada de la
guía: Claude construye en una rama, Codex revisa el diff, y las decisiones las toma Ramón.
