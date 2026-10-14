# Veredicto — "Deja de Usar n8n: Crea Agentes IA con Claude Code" (Álvaro Morales)

- **Video:** https://www.youtube.com/watch?v=-ZhBEQrrTVk · canal *Alvaro Morales | IA* · subido 7-ago-2026 · 37:54 · 4.216 vistas al 14-oct.
- **Pedido de Ramón (14-oct):** "¿existe esta información? ¿cómo lo ves para el público chileno?"
- **Veredicto:** **la idea del video MUERE en Chile por descarte 0.** Sobrevive una cosa, y no es la que vende el video.

## Qué construye, exactamente (transcripción completa leída)

Un **agente de voz que contesta el teléfono y agenda citas** para una clínica dental, más un **CRM
propio** donde el cliente ve citas, transcripciones, grabaciones, duración y **el costo de cada
llamada**. Stack nombrado en el video: **Claude Code** como constructor · **Retell** (el agente de
voz, configurado por API desde Claude Code, no a mano en su interfaz) · **Zadarma** (los números
de teléfono) · **Supabase** (base de datos) · **Google Calendar** (vía MCP) · **Next.js en Vercel**
(el frontend del CRM). Tres prompts largos, por fases.

**La información existe y es reproducible.** El stack es real, está nombrado y el flujo se ve
funcionando en cámara (llama al número, agenda, aparece en Google Calendar).

**Dos cosas que el video exagera, y conviene saber antes de copiarlo:**
1. El gancho dice "ni siquiera voy a tocar Retell" (00:34) y a los dos minutos (02:52, 05:51)
   está metiendo su API key de Retell. Lo que no toca es la **interfaz** de Retell; la plataforma
   de voz sigue siendo Retell. Lo que sí deja de usar es n8n.
2. Las cifras son **material de venta, no evidencia**: "se lo vendemos a un cliente por más de
   3.000 €", "mi agencia escalada a más de 10.000 €/mes", y el cierre es la suscripción a su
   comunidad (299 €/año). Él mismo lo dice a los 27:34: *"no existe un prompt perfecto que lo
   copies y al día siguiente vendas un agente por 15.500 €"*.

## Descarte 0 — por qué muere en Chile (diez minutos, fuente primaria)

**Dentalink** —empresa chilena fundada en 2009, el software de gestión dental dominante en Chile y
LatAm— **ya vende exactamente esto como módulo**: su página de IA declara un Contact Center que
automatiza la comunicación **"por WhatsApp y teléfono 24/7"**, integrado a la agenda, agendando
citas solo. Fuente: [softwaredentalink.com/ia](https://www.softwaredentalink.com/ia/en/start),
leída el 14-oct-2026. No publica precio.

Es el mismo muro que mató al **proyecto 02** (agendamiento por WhatsApp, caso Emma), y esta vez
más directo: no es una API contra la que integrarse, es una **casilla en una pantalla que la
clínica ya abre todos los días**, del proveedor que ya tiene su agenda, su ficha clínica y su
cobro mensual. Vender un agente de voz a una clínica chilena es pedirle que prefiera un
integrador externo antes que el checkbox de su propio sistema.

## Prueba de reutilización — por qué, además, sería un empleo y no un negocio

Lo único que se reutiliza del cliente 1 al cliente 10 es el **frontend del CRM**. El resto —el
prompt del agente, el calendario, los servicios y duraciones, el número, la integración con el
software que ya usa la clínica— se rearma por cliente. Sin apalancamiento: el décimo cliente
cuesta casi lo mismo que el primero.

## Lo específico de Chile que el video no cubre (verificado)

- **Teléfonos: no es el problema.** Zadarma sí tiene numeración chilena —nacional +56 44 y locales
  (Concepción, La Serena) a USD 5/mes, móvil +56 9 a USD 9, Santiago +56 2 con SMS a USD 18/mes
  ([zadarma.com](https://zadarma.com/en/tariffs/numbers/chile/)). El SMS exige verificación de
  identidad y tres meses prepagados.
- **Costo por minuto de Retell: pendiente.** No verificado; el video muestra el costo por llamada
  en céntimos pero no la tarifa. No citar ninguna cifra sin abrir su página de precios.
- **La voz en es-CL:** él mismo admite (13:41) que la voz "todavía suena a robot" y que es lo
  primero que hay que cambiar. En Chile el filtro es más duro: una voz neutra latina se nota.
- **La capa que nadie en el video menciona, y es la que un gerente chileno va a preguntar:** grabar
  llamadas de pacientes es tratar **datos de salud** (dato sensible) y además mandarlos a un
  proveedor de voz fuera de Chile. La Ley 21.719 rige desde el **1-dic-2026** (el proyecto que la
  posterga, boletín 18.623-07, sigue "En tramitación" con último movimiento 01/09/2026). **Esto no
  es asesoría legal y no se da como tal** — es la objeción comercial que mata la venta si no está
  respondida, y es terreno donde SpindleLab ya tiene instrumento (Verifica y Cumple).

## Qué sobrevive (y vale)

1. **El método, no el producto.** Construir con Claude Code por fases en vez de un orquestador
   visual es transferible a lo que SpindleLab ya hace: los instrumentos propios (el chequeo de 21
   señales, Verifica y Cumple) se construyen más rápido así. Es una **capacidad**, no algo que se
   venda.
2. **El CRM como entregable — esto sí es una idea.** La mejor frase del video es a los 28:01:
   darle al cliente una aplicación propia "para que nuestro trabajo fuese premium". Traducido al
   negocio real de SpindleLab: **un panel de visibilidad en IA, con la marca del cliente**, que
   muestre sus mediciones y su histórico del chequeo. Es lo que las herramientas de USD 29/mes
   hacen en inglés y sin contexto chileno, y **ningún incumbente chileno lo ocupa** — o sea, pasa
   descarte 0. Conecta directo con el movimiento M3 del estudio de mercado del 14-oct
   (`marketing/inteligencia-mercado/2026-10-estudio-categoria-llena-y-sitio-nuevo.md`): el
   entregable visible que hoy no existe.
3. **Verticales donde nadie es dueño de la agenda.** Si algún día se retoma el agente de voz, la
   única pregunta que importa es descarte 0: *¿qué software tiene hoy la agenda de ese rubro?* En
   dental está tomado por Dentalink. Antes de escribir una línea de brief, esa consulta.

## Lo que NO se hace con esto

No se abre proyecto. Queda registrado para que nadie vuelva a gastar una semana en el agente de
voz dental, y la idea 2 entra al radar como candidata, no como proyecto.
