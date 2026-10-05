# Praxi

- **Quién es / qué se le vende:** **producto propio** de Ramón (no un cliente de
  agencia). Coach de hipertrofia conversacional basado en evidencia; claim
  *"Entrena sabiendo por qué"*. Marca **distinta** a SpindleLab — al producir para
  Praxi, olvidar la identidad de la agencia.
- **Marca y tono (dónde vive el contrato):** en **el repo de Praxi**, no acá.
  - ADN visual: `brand/brand.json` (acento primario **amarillo `#E2F349`**, el del
    logo — el morado viejo está prohibido).
  - Voz: `brand/voice.json` (español de **Chile, tuteo, nunca voseo**; `hype: 1` —
    nada de "¡Felicidades!"; arquetipo Sage/Hero).
  - **Apuntar ahí, no copiar.** Praxi tiene un gate `npm run design-check` que
    **falla el build** si el color se sale del contrato — pero atrapa el color, no
    el tono. El tono lo cuida quien produce.
- **Repo y ramas:** repositorio propio (**`praxis-coach`**, GitHub `rvalleespin`),
  separado de SPINDLELAB. Next.js 14 + Supabase. Auto-deploy a Vercel al hacer push
  a `main`. Tiene su propio `CLAUDE.md` — **leerlo antes de tocar nada**.
- **Restricciones:** respetar la política del producto (muro/free definitivo en
  `lib/acceso.ts`; guardrail de salud). Nunca prometer lo que el producto no
  cumple ni ocultar lo que el usuario ya pagó o generó. Nada masivo/de pago sin OK.
- **Quién aprueba:** Ramón.
- **Estado:** activo — en lanzamiento.

---

## Dirección creativa — lo que hay que saber antes de abrir el editor

Fiel a la regla de oro: **esto apunta, no copia.** Todo lo de abajo vive en el
repo de Praxi, en `brand/lanzamiento/`.

### El eje del mensaje (cambió el 7-ago-2026)

La campaña se escribió atada al *"por qué"*. **Hoy el eje es memoria · evidencia ·
ejecución**, y la regla que lo ordena es una sola:

> **Cada pieza cierra diciendo qué hacer, no qué entender.**

Ahí está la diferencia: el *"por qué"* termina en comprensión, y la comprensión ya
la regala ChatGPT gratis —y, medido, mejor que un entrenador certificado promedio
(investigación del 3-ago). *Memoria → evidencia → ejecución* termina en **una
decisión con fecha**: subir a 65 el jueves. Eso es un producto, no una clase.

| Capa | Qué afirma | Señal de que falta |
|---|---|---|
| **Memoria** | Se acuerda de lo que hiciste | La pieza podría hablarle a alguien sin historial |
| **Evidencia** | La decisión sale de un método | El consejo se sostiene solo en autoridad |
| **Ejecución** | Qué haces mañana, concreto | La pieza cierra en comprensión |

**El claim `"Entrena sabiendo por qué"` NO se retiró: bajó de titular a firma.**
Va junto al wordmark y en el pie, nunca como promesa de cada pieza. El porqué se
gana al final, no se anuncia al principio.

Desarrollo completo, con la revisión pieza por pieza: `brand/lanzamiento/BRIEF-CAMPANA.md` §6.

### Dónde vive cada cosa (leer antes de producir)

| Archivo (repo de Praxi) | Qué gobierna |
|---|---|
| `brand/brand.json` · `voice.json` | Color, tipografía, radios, voz. **Fuente única** |
| `brand/lanzamiento/BRIEF-CAMPANA.md` | El eje, las tres capas, las reglas de campaña |
| `brand/lanzamiento/DIRECCION-DE-ARTE.md` | La línea visual |
| `brand/lanzamiento/SISTEMA.md` | Las cuatro piezas base y sus formatos |
| `brand/lanzamiento/PERSONAJE.md` | PraxiAtleta (elemento IA reutilizable) y sus límites |
| `brand/lanzamiento/pieza-06-reel/GUION.md` | El reel, conceptos A (viejo) y A2 (vigente) |

### Reglas duras — las que rompen piezas en silencio

- **Amarillo `#E2F349`, dos usos por pieza como máximo** (punto del wordmark + el
  dato clave). Si aparece un tercero, sobra.
- **⚠️ Gabarito solo se descarga en 500/600/700.** `font-extrabold` (800) y
  `font-black` (900) **no existen**: caen al 700 y renderizan idéntico — medido,
  el mismo texto da 547,59 px en los tres. Se pierde tiempo "poniéndolo más
  grueso" sin que cambie un píxel.
- **El personaje no camina ni corre.** Sale sintético y en pauta se nota más,
  porque la misma pieza se ve varias veces.
- **Gente moviéndose, o no va.** La pieza estática es apoyo, jamás la principal.
- **No se genera metraje nuevo con IA para esta campaña.** Hay ~40 clips pagados
  sin estrenar (login, hero, reel, personaje). Generar de nuevo es plata y horas
  sobre algo ya resuelto.
- **La jerga no va en la puerta de entrada.** RIR, MEV/MAV/MRV y *deload* están
  bajo el piso de medición de Google Trends en Chile y con cero menciones en
  r/Chilefit. Arriba se habla de series, peso y estancamiento; la jerga vive
  adentro, en la sección para quien ya entrena con método.
- **Los datos del chip tienen que ser metodológicamente correctos**, aunque sean
  mockup: RIR 3 = semana 2 del meso (4→3→2→1); serie efectiva = RIR ≤ 4; +2,5 kg
  **solo tras dos sesiones** con RIR real ≥ objetivo. Un dato mal puesto lo caza
  el público que más nos sirve.

### ⚠️ Política de salud de Meta: el riesgo está en el metraje, no en el copy

El copy ya cumple por tono. Lo que hace rechazar una campaña es la imagen: nada de
antes/después, ni atribuirle una condición a quien mira, ni promesas con plazo, ni
**primeros planos de abdomen o torso desnudo de frente**. El metraje del reel
tiene varios de esos planos: para orgánico da lo mismo, para pauta hay que elegir
los frames con ese filtro puesto. Si se rechaza, Meta no dice por qué.

### El pipeline real (y sus dos ausencias)

- **Piezas gráficas = HTML → PNG con Chrome headless.** Cada pieza en su carpeta,
  con las fuentes copiadas dentro y referenciadas relativas.
  ```
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
    --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1350 --screenshot="<abs>/out.png" "file://<abs>/in.html"
  ```
  Overlays transparentes: agregar `--default-background-color=00000000` y
  **verificar el alfa** (color-type del PNG = 6, no 2).
- **⚠️ No hay `ffmpeg` NI Homebrew.** No es un `brew install` de un minuto. No se
  puede quemar texto sobre video acá: se entregan **clips + overlays + receta de
  montaje**, y el armado final lo hace Ramón en CapCut. Nunca prometer un MP4.
- **⚠️ Los PNG de `brand/lanzamiento/` están en `.gitignore`** (el repo se limpió
  de 341 MB a 18 MB). Al repo van **las fuentes HTML**; los renders se entregan a
  iCloud, en `PRAXI siembra/`.
- **⚠️ Trabajar SIEMPRE en un worktree propio.** El repo de Praxi vive en
  `~/Projects/` (movido desde iCloud el 1-sep-2026) y hay otra sesión trabajando
  encima: si cambian de rama mientras commiteas, tu trabajo aterriza en la rama de
  ellos y `git push origin main` reporta éxito **sin haber empujado nada**. Ya pasó
  dos veces. **El motivo de esta regla es la concurrencia, no iCloud: sigue vigente.**

### Aprendido a golpes

> **La pieza puede argumentar una cosa y firmar otra, y nadie lo nota.**
> El globo de la pieza 01 decía *"Cerraste sentadilla 4×6 a RIR 2… la próxima
> subimos 2,5 kg"* —memoria, evidencia y ejecución, las tres— y el titular encima
> decía *"Entrena sabiendo por qué"*. Revisar el **titular contra el cuerpo**, no
> cada uno por su lado. (7-ago-2026)

> **Lo producido se desvía del guion, y el guion no se entera.**
> El reel v1 se montó sobre una pregunta teórica del fallo muscular, cuando su
> propio guion ya decía *"progresas con 2 sesiones, no con una"*. El drift **no se
> ve revisando el texto: se ve mirando la pieza montada.** (7-ago-2026)

> **Renderiza y MIRA, siempre.** Al mirar el render de la 01 aparecieron tres
> defectos invisibles en el código: el globo tapaba a la persona, dejaba 440 px
> muertos hasta el pie, y partía `kg.` a una tercera línea. (7-ago-2026)

> **"Muy de principiantes, estilo IA"** — veredicto de Ramón sobre el carrusel de
> seis láminas (6-ago). El diagnóstico: fondo negro, tarjetas apiladas, tipografía
> centrada, **cero gente moviéndose**, y estructura de clase (*hook / definición /
> por qué / regla / producto / cta*). **El sitio tenía más vida que la campaña que
> iba a venderlo.** La referencia buena ya existía: los cinco clips del login.

> **Los archivos pueden cambiar bajo tus pies: si algo no cuadra, vuelve a leer el
> archivo antes de concluir que está mal.** Nació de la sincronización de iCloud, y
> esa causa desapareció con el traslado a `~/Projects/` (1-sep-2026). El hábito
> queda igual, porque la otra causa sigue viva: hay más de una sesión encima.

### Estado de las piezas (7-ago-2026)

| Pieza | Estado |
|---|---|
| 01 hero · 02 story | ✅ reencuadradas al eje nuevo |
| 03 cuadrado | ✅ **ya estaba en el eje**; es la pieza de referencia |
| 04 portada | ✅ sin cambios (el claim acá sí corresponde) |
| 05 carrusel (6 láminas) | ❌ archivado — era una clase |
| carrusel v2 | 🟡 3 de 5 láminas; la s3 tiene jerga y la s5 cierra en comprensión |
| 06 reel | ✅ overlays reescritos · falta montaje en CapCut |
| 5 piezas de siembra | ⛔ bloqueadas: son video y no hay ffmpeg |
