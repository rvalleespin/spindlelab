# ¿Es posible el nuevo enfoque? Validación con datos de la plataforma

- **Fecha:** 19-oct-2026 · **Autor:** Fran (Meta Ads) con Gonzalo (paid media) · **Estado:** validado.
- **Encargo de Ramón:** *«validar que sea posible la propuesta del cambio del enfoque. no quiero
  perder a este cliente. lo que estaría haciendo la agencia es la administración de las campañas
  publicitarias en meta. comprometer la elaboración de un funnel de compra para lo que el cliente
  quiere»*.
- **Qué agrega este documento** sobre `sr-soya-academia-vocal-analisis.md`: ese tiene la aritmética
  del negocio. Este responde si la plataforma permite hacerlo, y con qué arquitectura.

---

## 1. Veredicto

**Sí es posible, y hay una sola arquitectura con la que lo es.**

La frase corta para Carlos: **la campaña no puede optimizar hacia la venta con $100.000 al mes, pero
sí puede optimizar hacia la conversación, y la venta la cierra él.** Ese es el embudo, y es la
propia documentación de Meta la que indica ese camino cuando el presupuesto es chico.

Lo que **no** es posible, y conviene no prometerlo nunca:

- Una campaña que optimice hacia «clase pagada» con este presupuesto.
- Prospección en frío en Estados Unidos como motor del mes 1.
- Un costo por alumno comprometido de antemano. No existe el dato todavía.

## 2. Lo que se verificó en la plataforma, con fuente

### 2.1 La fase de aprendizaje, en palabras de Meta

Artículo del propio centro de ayuda ([about learning
limited](https://www.facebook.com/business/help/269269737396981)), consultado el 19-oct-2026:

> «an ad set becomes learning limited when it is unlikely to receive about **50 optimization
> events** in the week after your last significant edit»

Y entre las causas que el mismo artículo enumera está **low budget**. Hasta acá es lo que ya
sabíamos. **Lo que cambia la conversación es la lista de arreglos que Meta propone**, porque uno de
ellos es exactamente esto:

> «**change your optimization event.** consider choosing an optimization event that occurs more
> frequently. for example, move from purchases to add to cart»

**Eso convierte el embudo en la solución documentada y no en un parche nuestro.** Si el presupuesto
no alcanza para acumular 50 compras por semana, se optimiza hacia un evento más arriba y más
frecuente. En este negocio ese evento es **la consulta de diagnóstico vocal**.

### 2.2 La cuenta publicitaria disponible hoy

Consultada directamente (`ads_get_ad_accounts`, `ads_get_datasets`), 19-oct-2026:

| Dato | Valor | Por qué importa |
|---|---|---|
| Cuenta | `27048475`, ACTIVE, con medio de pago | Hay con qué operar desde el día uno |
| Moneda | **CLP** | Se puede pautar a Estados Unidos igual; la moneda es solo facturación |
| Mínimo diario por conjunto | **987** (unidad menor de CLP) | Del orden de mil pesos al día por conjunto de anuncios |
| **Conjuntos de datos (píxeles)** | **cero** | ⚠️ No hay ninguna señal acumulada. Nada que optimizar todavía |

Dos consecuencias prácticas:

1. **Con $100.000 al mes hay $3.333 diarios.** Al mínimo de la cuenta eso da para unos tres
   conjuntos de anuncios, y solo si cada uno corre al piso. La estructura tiene que ser **una
   campaña y pocos conjuntos**, nunca una por audiencia.
2. **El píxel hay que crearlo.** Esto confirma y amplía el hallazgo del 10-sep sobre srsoya.com:
   no es solo que el sitio no tenga medición, es que **la cuenta publicitaria tampoco**. El mes 1
   construye la señal desde cero, y eso es trabajo real que conviene nombrar en la propuesta.

### 2.3 El mercado existe y está pautando ahora mismo

Biblioteca de Anuncios de Meta, anuncios **activos** con entrega en Estados Unidos, 19-oct-2026:

| Búsqueda | Anuncios activos | Quiénes |
|---|---|---|
| `online singing lessons vocal coach` | 4 | Profesores individuales (Mallory Mundy, Natalia Chase Music) y academias (The Lisa Kelly Voice Academy, Artium Academy). Facturan en USD |
| `clases de canto online` | 25 | Academias hispanohablantes pautando hacia Estados Unidos: Academia Musical Magdiel, TEDMA, More Music Academy, Resureczion Music Seattle. Facturan en USD, COP, MXN, PEN, BRL |

**Dos lecturas, y las dos sirven:**

- **Un profesor solo sí pauta y sostiene anuncios en ese mercado.** No hace falta ser academia. Dos
  de los cuatro resultados en inglés empezaron a entregar el mismo 19-oct.
- **En español hacia Estados Unidos hay seis veces más competencia que en inglés.** Más demanda
  probada y también subasta más cara. Es un argumento a favor de que el inglés, que es donde a
  Carlos ya le escriben, sea la puerta principal.

**El hallazgo que más pesa para el producto.** Entre los anuncios activos aparece Foxboro School of
Music con esta oferta de entrada:

> *«Your First Month of Music Lessons for Just $99!»*

**El mercado no vende la primera clase: vende el primer mes.** Es la misma recomendación que ya
estaba en el análisis por aritmética, y ahora tiene un respaldo observable en la plataforma.

### 2.4 Límite honesto de esta evidencia

La búsqueda de la Biblioteca de Anuncios hace coincidencia por texto del anuncio, y es ruidosa: el
término `voice lessons` devolvió 5.423 resultados estimados que en su mayoría no tienen relación con
clases de canto. **Los números de arriba sirven como prueba de que el mercado está pautando, no como
tamaño de mercado.** Ninguna de las dos cifras se usa en el documento que va al cliente como si
fuera una medición.

## 3. El embudo de compra que se compromete

Seis etapas. La columna que importa es la tercera: **dónde se mide**, porque es lo que hoy no existe
en ninguna parte.

| # | Etapa | Qué ve la persona | Qué se construye | Evento |
|---|---|---|---|---|
| 1 | **Atracción** | Un reel suyo cantando, como anuncio | Campaña, conjuntos, audiencias, el creativo adaptado del orgánico | Reproducción de 15s |
| 2 | **Interés** | Una página de la academia con una sola acción | La página, el píxel instalado y verificado | Vista de contenido |
| 3 | **Captura** | Formulario corto: qué canta, qué quiere lograr, su zona horaria | El formulario, el aviso instantáneo a Carlos, el registro | **Lead ← evento de optimización** |
| 4 | **Diagnóstico** | 15 minutos por Meet, sin costo | La agenda con franjas horarias, el guion del diagnóstico, el recordatorio | Agendamiento |
| 5 | **Compra** | Paga su plan | El cobro, la confirmación, el registro | Compra (se mide, no se optimiza) |
| 6 | **Retención** | Sigue viniendo cada semana | El recordatorio y el seguimiento de clases por alumno | Clases por alumno |

**La etapa 3 es el evento de optimización, y es la decisión técnica central de todo el plan.** Una
consulta cuesta una fracción de lo que cuesta una compra, así que es el único evento que puede
acumular algo con US$2,9 diarios. La compra se mide igual, para saber el costo real por alumno, pero
no se usa para optimizar hasta que haya volumen.

**La puerta que ya está abierta se conserva.** Hoy la demanda llega por mensaje directo de
Instagram. Eso no se reemplaza: se ordena. Se le entrega a Carlos un guion de respuesta, una forma
de registrar cada consulta y el enlace a la agenda del diagnóstico. **Cuesta cero y es la fuente del
primer dato de conversión real.** La página se construye en paralelo porque es la que acumula
audiencia y señal, cosa que el mensaje directo no hace.

## 4. Las cinco condiciones para que esto funcione

Ninguna es negociable desde el oficio; dos son decisiones de Carlos.

| # | Condición | Estado |
|---|---|---|
| 1 | **La cuenta publicitaria y el píxel a nombre de Carlos**, con acceso de socio para SpindleLab, y su tarjeta como medio de pago | Resuelve el punto abierto desde septiembre. Si se pauta desde la cuenta de SpindleLab, la audiencia y la señal quedan en el nombre equivocado |
| 2 | **La página de la academia no va en srsoya.com** | srsoya.com es WordPress.com y es un sitio de prensa del proyecto musical. La academia necesita su propia página, donde el código sea nuestro. Se construye y se publica como los demás sitios de la casa |
| 3 | **Vender un plan, no clases sueltas** | Decisión de Carlos. Respaldo: la aritmética del CAC y la oferta de primer mes que usa el mercado |
| 4 | **Cobro en dólares operativo antes de pautar** | ⚠️ El cuello de botella más probable. Se verifica, no se afirma |
| 5 | **Franjas horarias definidas** | Decisión de Carlos. Sin esto no se puede prometer disponibilidad en la página |

## 5. Qué cambia en el alcance, y qué no

**No cambia el precio.** Siguen siendo $200.000 de honorario y hasta $100.000 de inversión
publicitaria. Lo que cambia es que **el entregable queda nombrado** en vez de quedar como «gestión
de redes»:

| Lo que SpindleLab hace | Lo que hace Carlos |
|---|---|
| Administración de las campañas en Meta: estructura, audiencias, creativo adaptado, optimización, umbral de corte y reporte semanal | Dar las clases y el diagnóstico vocal |
| Construcción del embudo completo: página, formulario, píxel y eventos, agenda, cobro y medición de punta a punta | Las conversaciones de venta. En un servicio que entrega su propio tiempo, vende él |
| El contenido que invita a inscribirse y el guion para responder las consultas | Decidir el plan, el precio y las franjas horarias |

**Precedente de septiembre que conviene repetir:** la página, en la lista de precios de SpindleLab,
es un trabajo de $290.000 aparte, y va incluida en el arranque. Decirlo otra vez acá tiene sentido,
porque ahora la página es más que una landing: es el embudo completo.

## 6. Lo que queda para Ramón

Las cuatro decisiones de `sr-soya-academia-vocal-analisis.md` §1 siguen vigentes y no las resuelvo.
Esta validación agrega una quinta, y es nueva:

> **¿La cuenta publicitaria se abre a nombre de Carlos o se pauta desde la cuenta `27048475` de
> SpindleLab?** La recomendación es la primera, y el borrador de correo está escrito así. Cambia la
> conversación operativa del arranque, porque implica pedirle que cree su Business Manager y cargue
> su tarjeta.
