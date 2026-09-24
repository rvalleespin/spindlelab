# Pendiente: el chequeo profundo con navegador real

**Para:** la sesión que retome Verifica y Cumple
**De:** la sesión del 23-sep-2026, que se quedó sin cuota justo al empezar esto
**Estado:** aprobado por Ramón y diseñado. Sin construir. Nada a medias: se detuvo limpio.

---

## Por qué

El chequeo corre en una Pages Function que lee el HTML y **no ejecuta JavaScript**. Por eso ve
"Google Tag Manager" y no puede saber qué hay adentro, y por eso varios ítems quedan en
"sin-confirmar".

El caso que lo define: **awasi.com saca 100/100** y es de los peores sitios reales. Abierto en un
navegador, a los 10 segundos ya escribió cookies de Google Analytics, Google Ads, el Pixel de
Meta y el de Reddit, sin ningún aviso en pantalla.

Ramón lo dijo así: *"no podemos ofrecer algo que sea superficial"*. Tiene razón, y de los tres
chequeos automáticos que hay en Chile el nuestro es el más superficial. **Es mejor sacar la
limitación que describirla bien.**

Además alinea el producto con el discurso: los correos prometen una mirada (abrir el sitio en un
navegador) que hoy el chequeo automático no da, y que se está haciendo a mano.

---

## Lo que Ramón aprobó el 23-sep

1. **Activar Cloudflare Browser Rendering en el plan pagado de Workers.** Él activa el plan.
2. **Resultado rápido primero, profundo después.** El de hoy aparece en menos de 1 s y no se
   toca; el profundo se carga debajo sin mover lo que la persona ya está leyendo.
3. **Los 12 puntos del Art. 14 ter, leyendo la política del prospecto, en modo conservador.**
   Nunca "no tienes X", siempre "no encontramos mención de X". Sección informativa aparte, no
   entra al puntaje.

---

## Números verificados (23-sep, documentación oficial)

| | Gratis | Pagado |
|---|---|---|
| Navegador | 10 min/día | 10 horas/mes incluidas |
| Concurrentes | 3 | 10 |
| Sesión | 60 s | 60 s (extensible a 10 min) |
| Extra | — | $0,09 la hora · $2 el navegador adicional |

Con un guion de ~20 s por chequeo, las 10 horas incluidas dan del orden de **1.800 chequeos al
mes**. Verificar el guion real antes de prometer ese número.

---

## Lo que hay que construir

- **`functions/api/profundo.js`** (nuevo). Abre el sitio con Browser Rendering, dos tramos:
  pasivo (~11 s) y después **mousemove + scroll sin clics**. Los dos tramos son obligatorios:
  varios sitios chilenos retrasan sus scripts hasta el primer gesto (WP Rocket). Quedarse en el
  pasivo hizo que dos de doce prospectos parecieran limpios y no lo estuvieran.
- **`functions/api/doce-puntos.js`** (nuevo). Lee la política y la contrasta con los 12 puntos,
  conservador.
- **`index.html`**: el segundo resultado debajo del primero, con estado de espera y aria-live.

---

## Las cuatro reglas que no se negocian

1. **Un "no lo sabemos" no suma NI resta**, y nunca se muestra verde algo no confirmado. Tres
   estados por ítem: ok / pendiente / sin-confirmar. El puntaje solo cuenta lo confirmado, y si
   se confirmó menos de la mitad del peso, no se muestra número.
2. **Cargar, dejar una cookie y enviar datos son tres cosas distintas**, y cada una se dice con
   sus palabras. Meta es el caso típico: carga y deja cookie sin llegar a enviar. Confundirlas
   fue el error que tres revisiones seguidas tuvieron que sacar de los correos.
3. **Si el navegador falla, se dice.** Jamás se muestra como "tu sitio está limpio". Una caída
   nuestra presentada como buena noticia sería el peor falso verde de todos.
4. **Tope de abuso.** Es un endpoint público y gratis: sin tope, alguien lo golpea y se come las
   horas de navegador en una tarde.

Y lo de siempre: el chequeo profundo pide páginas de terceros, así que pasa por el **mismo portón
de destinos** (`destinoPermitido`), sin excepciones ni lógica duplicada.

---

## Banco de pruebas que ya existe

`scratchpad/borradores/ev0/`, `ev1/` y `ev2/` (carpeta de sesión, efímera) tienen **peticiones y
cookies reales de 12 sitios** medidos con Chrome por CDP el 23-sep. Si esa carpeta ya no está, se
rehace: es abrir esos 12 dominios con contexto nuevo y registrar `Network.requestWillBeSent` y
`Network.getAllCookies`. Los dominios están en `marketing/lanzamiento-vyc-23sep/`.

La lógica de análisis conviene escribirla como **funciones puras exportadas**, porque el binding
de Cloudflare no se puede probar desde local.

---

## Cómo se retoma

El workflow quedó escrito y se detuvo en la fase de investigación:

`~/.claude/projects/.../workflows/scripts/vyc-navegador-real-wf_148be1aa-169.js`

Se puede reusar con `Workflow({scriptPath, resumeFromRunId: "wf_148be1aa-169"})` si la sesión es
la misma, o leerlo como especificación y relanzarlo. Trae el contexto completo, las reglas y las
tareas de los tres constructores y los dos revisores.

---

## El resto de lo pendiente, que no es de código

- **La lista de exclusión de outbound.** Los 40 correos ofrecen darse de baja. Tiene que existir
  antes del primer envío, y hay que honrarla.
- **Que el abogado revise** la frase de "interés legítimo" del punto 04 de `/privacidad/`.
- **La rama de la otra sesión** (chequeo lineal de spindlelab.cl): va a dejar un enlace para que
  Ramón decida si entra a main.
