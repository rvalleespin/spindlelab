# E12 · Criterio 13 sobre el sitio construido: tres lectores fríos

**23-oct-2026, 17:15 a 17:25 (Chile) · Mauro, cierre de la obra (fase 5).** Javiera lo dejó sin verificar en las dos
vueltas de la QA de obra y lo pasó al cierre (`e12/acta-obra.md`, vuelta 2, «Para el cierre»). El criterio, tal como lo
escribe el brief (§7, 13): *«Lectores fríos (los tres perfiles de E11) leen la home y un caso y escriben qué hacemos, que
también hacemos SEO técnico y visibilidad en IA, y qué harían ahora, sin tropezar con un término sin explicar.»*

## Cómo se hizo

- **El texto sale del sitio construido, no del JSON de Clara:** `../herramientas/criterio13-texto.mjs` recorre el DOM de
  `/v3/` y `/v3/trabajo/praxi/` en el `dist/` (el build de `f3044fc`; `spindlelab-astro/` sin cambios desde `f2fe7b4`),
  servido en local, a 1440 × 900, con el aviso de cookies ya contestado, y escribe solo lo visible, en orden, con su papel
  entre corchetes; imágenes y videos, por su texto alternativo (`entrada.txt`, 90 + 87 líneas). El caso es **Praxi**: el
  real con más técnica a la vista, el que más fácil hace tropezar.
- **Los tres lectores de E11**, cada uno en su propia conversación: gerente comercial de una industrial B2B de 40
  personas que paga Google Ads; dueña de una clínica dental de regiones; socio de un estudio de abogados de 8 personas.
- **Contexto aparte:** `claude -p` en un directorio vacío del scratchpad, sin herramientas, sin skills, sin MCP, sin
  ajustes ni CLAUDE.md y sin las variables de la sesión (`../herramientas/criterio13-lector.py`, el aislamiento de Bruno y
  Clara). Recibe solo `instrucciones.txt` con su perfil y el texto. Respuestas íntegras: `lector-1.txt` a `lector-3.txt`.
- **Qué vale y qué no:** es una lectura simulada, no un test con personas. Sirve para encontrar dónde se pierde alguien que
  no sabe de SEO, no para medir cuántos se pierden. Yo no soy lector frío: leí el brief; por eso solo armé la entrada y
  junté lo que dijeron, sin corregirlo.

## Resultado, parte por parte

| Lo que pide el criterio | Gerente | Clínica | Abogado | |
|---|---|---|---|---|
| Qué hacemos y para quién | «Hacen sitios web a medida y los arreglan para que Google y ChatGPT los lean» | «Hacen páginas web a medida, y si ya tienes una, la revisan» | «Hace sitios web a medida y arregla los que ya existen» | **Cumple, 3 de 3**; los tres se ven dentro de «empresas, clínicas y estudios» |
| Que también hacemos SEO técnico y visibilidad en IA | Sí; lo entendió en Servicios | «Más o menos, y casi por descarte»; en Servicios | «Sí lo entendí, pero recién bajando, no arriba» | **Cumple, 3 de 3, tarde:** ninguno lo entendió en la primera pantalla |
| Qué harían ahora | Probar el chequeo y, si sale algo, el mini-diagnóstico | Probar el chequeo y después el mini-diagnóstico | Probar el chequeo; antes, preguntarle a su agencia | **Cumple, 3 de 3:** los tres prueban el chequeo; ninguno se va |
| Sin tropezar con un término sin explicar | Tropieza | Tropieza | Tropieza | **No cumple** (abajo) |

**Veredicto del criterio 13: no se cumple entero.** Las tres primeras partes, sí; la cuarta, no. No es un defecto de
construcción: el sitio lleva el texto de Clara tal cual (acta, vuelta 2, fila 16). Va a Clara, y lo que cambie lo decide
Ramón en su lectura de aprobación, antes de publicar (`pendientes-traspaso-revisados.md` §0.2, punto 10).

## Dónde tropezaron (con la cita, la página y cuántos de los tres)

**En la primera pantalla de la home, lo más grave porque es lo que el criterio mide:**

1. **«SEO técnico» y «visibilidad en IA» sin explicar** en la entradilla («Si tu sitio ya existe y no lo vas a rehacer,
   también hacemos SEO técnico y visibilidad en IA: revisamos qué le impide a Google y a ChatGPT leerlo, y lo
   arreglamos.»). **3 de 3.** Para el gerente y la clínica es la frase que más los frenó, y es la que describe su caso.
   La explicación existe, pero llega en Servicios.
2. **Qué es que Google o ChatGPT «lean» un sitio** («puedan leerlos», «leerlo»). **3 de 3.** «Yo pensaba que si el sitio
   se ve, se lee» (clínica); el abogado leyó «leer» como «recomendar».
3. **«ESTUDIO DE DISEÑO Y TECNOLOGÍA»** no les dice qué les venden («¿agencia, desarrolladora, consultora?»). **3 de 3.**
4. **«Mira 21 cosas de tu sitio»:** ¿cuáles? **3 de 3.**

**Más abajo en la home:**

5. **Chequeo gratis, mini-diagnóstico y auditoría:** tres cosas parecidas con nombres distintos. **3 de 3.**
6. **«Lo causaba una regla del servicio que protege su sitio, que alguien activó sin saber…»** (Visibilidad en IA). **3 de
   3:** «no entendí nada».
7. **«Diseña y programa con agentes de IA; él revisa y aprueba el código.»** **3 de 3** lo notan; para el abogado es lo
   más grave: «una persona, con IA escribiendo casi todo, y subcontratos que no nombra. Yo manejo información
   confidencial». La clínica: «me hizo dudar si lo hace una máquina o una persona».
8. **«Nadie puede prometerte que aparezcas»** junto al precio: honesto, pero «¿qué compro?». **2 de 3** (el abogado, en
   cambio, dice que eso le dio más confianza).
9. **Las marcas «Concepto»:** «no entendí para qué muestran marcas inventadas». **2 de 3**; el tercero lo entendió tarde.
10. **«Cookies: rechazadas»** en el pie: «no sé qué me quieren decir». **2 de 3.**
11. **Uno de tres:** «Tu sitio te frena, o no existe.» (le sonó a reproche); «805 kB… 95 kB» («no sé qué es kB»);
    «Paid Media (Google)» escondido en «También» (el gerente, que paga Google Ads: «es justo lo que yo pago»); los «desde»
    sin techo; «No guardamos la dirección que escribes» (sin cómo verificarlo).

**En el caso de Praxi:**

12. **La lista «Con qué está hecho»** (Claude Haiku 4.5, `claude-haiku-4-5`, Supabase, Resend, «Datos estructurados»,
    «pruebas automáticas») y «RIR 2». **3 de 3.** La página la presenta «para quien quiera mostrárselo a su técnico»: es
    a propósito, y los tres lo entendieron así, pero la clínica responde «yo no tengo técnico». «Hipótesis» y «Sin
    métrica» como rótulos: **2 de 3.**
13. **Lo que Praxi les dice de su empresa:** los tres entendieron qué hace la IA y qué no («conversa; no decide cuándo
    subir el peso ni la salud»), y a los tres les dio confianza que el caso cuente su propio error (la cuenta de 16 años
    y la creatina). Pero para su negocio solo encontraron una línea, la última («como una solicitud o una cotización»):
    «una línea suelta, sin ejemplo ni precio».

**Lo que no es texto y no se arregla con texto** (para Ramón, no para Clara): **3 de 3** ponen entre sus tres frenos
«No son cifras de ventas de clientes: esas no las tenemos medidas, y no las vamos a inventar.»: lo respetan y les deja
sin una prueba de resultado. Y **2 de 3** no ven su mundo en la home («No veo ninguna empresa industrial»; «No veo una
clínica»): los conceptos de esos rubros existen (Tonela, industrial; Ocelo, clínica), pero el índice corto de la home
muestra Combeau, Praxi, Verifica y Cumple y Sesenta, y ninguno de los lectores pasó a `/trabajo/`. Qué entradas van en ese
índice es de Lucía y Clara; la falta de resultados medidos de clientes es el inventario (brief §5), no el diseño.

## Lo que funcionó (no tocar al corregir)

- **El titular:** los tres dicen con sus palabras qué hacemos y para quién.
- **El chequeo como primer paso:** los tres lo probarían, por gratis, sin correo y en segundos.
- **Los precios publicados:** los tres los miraron y lo valoran.
- **La honestidad del caso de Praxi** (lo que la IA no decide y el error contado) dio confianza a los tres.

## A quién va

- **Clara:** los puntos 1 a 13, con la primera pantalla primero (1 a 4), que es lo que el criterio mide. Lo que
  proponga lo lee Ramón antes de publicar; si cambia texto, Diego lo vuelve a sacar con `extraer-texto.mjs` y Javiera lo
  comprueba en exprés.
- **Lucía y Clara:** qué entradas lleva el índice corto de la home (el párrafo «Lo que no es texto»).
- **Ramón:** el freno de los resultados de clientes (inventario, no texto) y cómo se dice que trabaja una persona con
  agentes de IA y con otros profesionales (punto 7): para el estudio de abogados es lo primero.
