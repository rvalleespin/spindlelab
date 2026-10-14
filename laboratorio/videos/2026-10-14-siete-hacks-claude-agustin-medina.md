# Veredicto — "Estos Hacks de Claude te Harán Ganar Dinero TAN Rápido que Parece Ilegal"

- **Video:** https://www.youtube.com/watch?v=scXlgtap7DY · *Agustín Medina | AI Agency Academy* ·
  28:21 · transcripción completa leída (bajada por Ramón; YouTube bloqueó la sesión cloud).
- **Pedido de Ramón:** ideas para captación de clientes, equipo, mecanismos y estrategia.
- **Veredicto:** de los siete, **dos ya los hace la casa y mejor**, dos no aplican, uno es mejora
  menor y **dos son mejoras reales**: el reporte recurrente y la propuesta post-llamada.
- **Género:** título de clickbait y cierre en su academia. Las cifras del video no se citan.

## Los siete, con su veredicto

| # | Qué es | Veredicto |
|---|---|---|
| 1 | Extensión de Chrome hecha con Claude que extrae de un sitio nombre, correos, teléfonos, redes, si tiene Meta Pixel y si tiene chatbot | **No aplica.** Extraer contactos es categoría llena (Hunter, Apollo, Lusha, los scrapers de siempre). Y la casa ya tiene el extractor que importa, que no extrae contactos sino **señales**: el chequeo de 21 puntos |
| 2 | Subagentes en paralelo que investigan un CSV de leads y devuelven hallazgo + rompehielos | **Ya se hace, y con más rigor.** El aporte aprovechable es solo el **paralelismo** (ver abajo) |
| 3 | Rutinas programadas que leen la planilla del cliente, comparan semana contra semana y mandan un reporte de 200 palabras con 3 conclusiones y 2 recomendaciones | **Mejora real.** Es el espinazo del Acompañamiento |
| 4 | Un modelo clasificador barato, que solo responde sí/no, una opción entre varias, o un puntaje 0-10, casi determinista, vía OpenRouter | **Mejora menor, y sin verificar** (ver la advertencia) |
| 5 | n8n no murió: es barato, determinista y mantenible de un vistazo; y Claude puede montarle los flujos por MCP | **No aplica hoy.** La casa no usa n8n |
| 6 | La propuesta comercial generada desde la transcripción de la llamada, con diseño y exportable a PDF, enviada el mismo día | **La más valiosa**, y pega justo en el cuello verificado |
| 7 | El "tridente" de la entrega: brief corto antes de cada sesión · lo visual primero · una sola tarea por ventana de contexto | **Ya está institucionalizado acá, y mejor** |

## Lo que vale, en concreto

### A. La propuesta post-llamada (hack 6) — la que más mueve la aguja

El embudo tiene respuestas (7 de 142) y **cero llamadas originadas ahí**. Cuando por fin haya
llamada, lo que pasa después decide. Dos cosas del video sirven:

1. **La velocidad.** Mandarla el mismo día, no en tres. Su argumento: pasadas 24 horas el cliente
   se enfría y la decisión emocional ya se perdió. Es observación de oficio, no dato.
2. **La estructura**, que es lo que de verdad se roba: los puntos de dolor **con los números del
   propio cliente** · dónde se va el dinero hoy · **una pieza por cada fuga** · el potencial
   recuperable · y dos opciones de inversión, completa y por fases. Es la versión comercial de
   *resultado, plazo y condición*.

**Y acá está la línea que no se cruza.** En el video la propuesta dice *"vuestra clínica deja
escapar entre 20 y 25K cada mes"* y *"si recuperamos solo el 50%, son 10.000 € extra"*. Para
SpindleLab eso es **cifra proyectada = prueba fabricada**, y además promete un resultado que no
controlamos. **La estructura entra; las proyecciones de dinero, no.** La versión honesta usa lo
que sí se mide: el puntaje de partida, qué agentes no pueden entrar, qué páginas no son citables.

Ya existe la skill `cotizaciones` (PDF con 3 planes y fases con pago asociado). Esto no la
reemplaza: le cambia el orden. Hoy arranca de la oferta; debería arrancar del dolor medido en la
llamada.

### B. El reporte recurrente (hack 3) — el espinazo del Acompañamiento

El Acompañamiento ya vende informes quincenales. Lo que agrega el video es que **el informe se
genere solo**, desde los datos, sin que Ramón esté delante. Eso convierte la cuota en algo que se
justifica sin trabajo manual cada quincena, que es exactamente lo que sostiene una recurrencia.

**Compatible con la regla de la casa, con una condición:** se genera automático, **se revisa y se
manda a mano**. Nada sale sin pase humano. El video manda el correo solo; acá no.

### C. El paralelismo del hack 2, sin su parte peligrosa

La casa ya investiga cada prospecto antes de escribirle, y con reglas más duras que las del video
(hallazgo verificado a mano, un 200 no es una página, el competidor se filtra antes de sondear).
Lo único nuevo es **repartir la recolección en lotes paralelos** en vez de ir uno por uno.

**Lo que no se copia:** delegar la *verificación* a los subagentes. La estrategia de outbound
existe porque tres revisiones seguidas sacaron afirmaciones que no aguantaban una segunda mirada.
Paralelizar la recolección, sí. Paralelizar el criterio, no.

### D. El tridente de la entrega (hack 7): el video valida el Estudio Web

Sus tres reglas —brief antes de empezar, lo visual primero, una sola tarea por ventana— son
literalmente lo que el `estudio-web` ya hace con Mauro (brief), Lucía (`spec-visual.md` antes de
construir) y las dos compuertas. La casa además tiene lo que al video le falta: **QA independiente
en contexto limpio**. No hay nada que incorporar; sirve como confirmación de que el pipeline del
2-oct iba bien encaminado.

## Advertencia sobre el hack 4

La transcripción automática nombra el modelo clasificador como **"Jeff"**, y eso **no está
verificado**: puede ser una mala transcripción del nombre real. Sus cifras (100 correos en 4,3 s
por USD 0,003 frente a 12 s y USD 0,05, y hasta 85 % de ahorro de tokens) son **suyas, sin
reproducir**. Antes de tocar nada hay que confirmar qué modelo es y correr la prueba propia. El
patrón sí es sano y se entiende solo: **pregunta simple + mucho volumen → modelo chico; criterio
→ modelo grande.**

## Dónde entra en el mapa

**Columna A (dentro de SpindleLab).** No abre proyecto de laboratorio. Lo accionable son dos
encargos, si Ramón los aprueba: el orden de la propuesta post-llamada (a la skill de cotizaciones)
y el reporte automático del Acompañamiento (a quien opere la entrega).
