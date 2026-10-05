# Arranque de la sesión dedicada a la reunión con Legal Prisma

**Para:** una sesión nueva de Claude Code, abierta por Ramón el jue 10 o vie 11-sep-2026.
**Por qué una sesión aparte:** la reunión es mañana y merece una sesión sin el ruido de la
campaña, el laboratorio y los otros clientes. Esta hoja es lo único que necesita leer para
ponerse al día.

---

## Pega esto al abrir la sesión

> Reunión de venta mañana viernes 11-sep a las 10:00 con Sebastián Escudero (Legal Prisma),
> 20 minutos por Meet. Está todo preparado y verificado; tu trabajo no es producir material
> nuevo, es dejarme listo a mí.
>
> Lee, en este orden:
> 1. `ventas/reunion-legalprisma-2026-09-11.md` — el speech, bloque por bloque
> 2. `ventas/presentaciones/legalprisma-2026-09-11/preguntas-y-hallazgos.md` — los datos
>    verificados y las dos correcciones al informe que ya le mandé
> 3. `ventas/presentaciones/legalprisma-2026-09-11/README.md` — qué es cada archivo
>
> Después de leer, hazme tres cosas:
> 1. **Dime en 10 líneas qué tengo que tener claro**, sin repetirme el documento entero.
> 2. **Hazme de Sebastián**: tú eres un abogado socio de un estudio, escéptico y con poco
>    tiempo. Yo abro la llamada y tú me respondes como él. Córtame cuando suene a vendedor.
> 3. **Tírame las objeciones difíciles** una por una, y evalúa mis respuestas.
>
> Reglas: los datos del sitio están verificados a mano (el 9 y el 10-sep), no inventes ni un
> número nuevo. Si algo no está comprobado, dilo en vez de rellenarlo.

---

## Estado al cerrar el 10-sep (lo que la sesión nueva NO tiene que rehacer)

**Todo el material está hecho, verificado y en `main`:**

| Archivo | Estado |
|---|---|
| `presentacion.html` / `.pdf` | 9 slides, listas. Fecha y datos corregidos |
| `dashboard.html` | Pieza interactiva (la puerta + 12 preguntas + circuito). Probada en navegador |
| `preguntas-y-hallazgos.md` | Las dos listas + los hallazgos con sus citas textuales |
| `anexo-tecnico.html` / `.pdf` | Versión imprimible, para adjuntar a la propuesta |
| `ventas/reunion-legalprisma-2026-09-11.md` | El speech, mapeado slide por slide |

**Los datos duros, comprobados dos veces (9 y 10 de septiembre):**
- Navegador, Googlebot y Bingbot reciben **200**. OAI-SearchBot, ChatGPT-User, PerplexityBot
  y Claude-SearchBot reciben **403**. El bloqueo lo hace el servidor, no el robots.txt.
- **257 artículos** publicados, con FAQ marcado, uno cada 3-4 días.
- **0 de 9** áreas de práctica responden preguntas; la portada no declara al estudio como
  entidad ni a sus 9 profesionales.
- Cero precios, cero plazos, cero testimonios en todo el sitio. Los logos de clientes son
  imágenes con el alt vacío o `eo (1)`.

**La logística, confirmada en Gmail:** vie 11, 10:00. Link único
`meet.google.com/noz-bfum-uyv`. Sebastián lo confirmó con 👍 el 8-sep. No hay mensajes
posteriores.

---

## Lo único que queda pendiente

1. **Correo de recordatorio a Sebastián** (hoy jueves en la tarde), con el informe adjunto de
   nuevo: *«nos vemos mañana a las 10:00 en meet.google.com/noz-bfum-uyv, te dejo el informe
   a mano para la llamada»*. No es para re-preguntar la hora: es para que llegue con el
   documento abierto.
2. **Ensayar el speech en voz alta**, una vez completa. Es lo que más mueve la aguja.
3. **Abrir `dashboard.html` en Chrome y pasarlo una vez** para que el viernes no sea la
   primera vez que lo tocas.
4. **Viernes 09:45:** volver a correr la sonda de user-agent. Si su equipo destrabó
   Cloudflare, el hallazgo principal cambia y la jugada es felicitarlos, no insistir.
   El comando está en `preguntas-y-hallazgos.md`.

## Lo que esa sesión NO debe hacer

- Producir material nuevo (ya está todo; agregar más solo genera cosas que no vas a mirar).
- Inventar o estimar un dato del sitio. Todo lo publicable está verificado a mano.
- Correr el chequeo público de spindlelab.cl sobre legalprisma.cl y mostrar ese número en la
  llamada: su Cloudflare lo distorsiona. Los hallazgos van por el informe y el dashboard.
- Tocar la campaña, el laboratorio ni otros clientes. Esa sesión es solo la reunión.
