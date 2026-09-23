# Los 12 correos, reescritos con el hallazgo comprobado

**23-sep-2026.** Nada se envió, nada se tocó en Gmail, nada se publicó, git limpio.
Acá hay **10 correos listos para pegar** y **2 empresas descartadas**.

**Segunda pasada hecha.** Otra sesión volvió a abrir los diez sitios y encontró seis
afirmaciones que no se sostenían y cuatro que iban más lejos de lo medido. Están todas
corregidas; el detalle está abajo, en *Lo que corrigió la revisión*.

| Archivo | Empresa | Para |
|---|---|---|
| `01-awasi.txt` | Awasi | ppereira@awasi.com |
| `02-hoteles-cumbres.txt` | Hoteles Cumbres | gfernandez@hotelescumbres.cl |
| `03-terrado.txt` | Terrado | ruperto.edwards@terrado.cl |
| `04-time.txt` | Time | afuenzalida@time.cl |
| `05-patagonia-camp.txt` | Patagonia Camp | mramirez@patagoniacamp.com |
| `06-las-torres.txt` | Las Torres | jyk@lastorres.com |
| `07-skinology.txt` | Skinology | antonia@skinology.cl |
| `08-revitalaser.txt` | Revitalaser | arriojasem@revitalaser.cl |
| `09-kydoft.txt` | Kydoft | paoladorta@kydoft.cl |
| `10-aurea-med.txt` | Aurea Med | claudio.valdivia@aureamed.cl |

`indice.csv` tiene lo mismo en tabla, con el hallazgo de cada uno.

---

## Qué cambió respecto del borrador viejo

El molde viejo (el de Awasi) tenía cinco cosas que ya no están, y la revisión sacó una sexta:

1. **El hallazgo ahora es lo que se vio en un navegador real, no lo que se dedujo del código.**
   El borrador decía *"carga Google Analytics sin pedir consentimiento"* mirando la portada, donde
   solo se ve Tag Manager. En Awasi resultó ser cierto, pero eso se supo después de abrirlo en
   Chrome. Cada correo dice ahora exactamente lo que se midió, con el número de cookies, los
   nombres de los rastreadores y si hubo aviso en pantalla. Tres casos cambiaron de eje por esto:
   - **Hoteles Cumbres**: su aviso de cookies **sí funciona** (las etiquetas de Google salen
     denegadas, cero cookies de Google). Acusarlos de rastreadores sin permiso era falso y se
     notaba, porque cualquiera que abra el sitio ve el banner. Su hallazgo es la política ausente,
     y el correo parte reconociéndoles lo que tienen bien. **No son los únicos del lote que lo
     hacen bien: lastorres.com da la misma señal denegada y tampoco guarda `_ga`.**
   - **Revitalaser**: quieto no carga nada. El correo no dice "carga al entrar" (sería falso y lo
     desmiente en diez segundos), dice lo que pasa: basta mover el mouse, y el retraso es un plugin
     de velocidad, no un permiso.
   - **Las Torres**: sacó 100 en el chequeo y **igual tiene hallazgo**. Su aviso frena a Google
     pero no a Meta ni a Microsoft. Va con el matiz adentro, porque es lo que lo hace creíble.
2. **El link es `https://verifica.spindlelab.cl`** en los diez. Desapareció `verificaycumple.pages.dev`.
3. **El argumento se ancla en el sitio, no en la fecha.** Ya no existe el *"¿lo dejamos listo antes
   del 1 de diciembre?"*. El motivo es que el formulario o la reserva ya trata datos personales
   **hoy**. El 1 de diciembre no aparece en ningún correo, así que si el proyecto del Senado
   (boletín 18.623-07) corre la fecha a 2027, ningún correo queda desmentido.
4. **"Dejamos el sitio cumpliendo" ya no se dice.** Lo que se promete es lo que de verdad se
   entrega, con las palabras del sitio: instalar el aviso de cookies que bloquea los rastreadores
   hasta que la persona acepta, y **la plantilla de política de privacidad la revisa un abogado**.
   En todos aparece "Desde $149.000 + IVA, una vez", con el "desde", porque el valor sube si el
   sitio tiene más de lo que se alcanzó a ver.
   La promesa está partida en dos según lo que se vio: a los cinco que **no tienen** política
   enlazada (Cumbres, Time, Patagonia Camp, Kydoft, Aurea) se les ofrece dejar publicado lo que
   pide el artículo 14 ter. A los cinco que **sí la tienen** (Awasi, Terrado, Las Torres,
   Skinology, Revitalaser) no, porque no sé qué dice esa política por dentro y prometerles el
   artículo 14 ter daría por sentado que les falta. A ellos se les ofrece el aviso de cookies y
   "lo demás que el chequeo deje pendiente".
5. **Cierre bajo.** Ninguno pide reunión, llamada, respuesta ni pone plazo. El cierre es el link al
   chequeo. Todos quedaron **bajo 130 palabras** (entre 118 y 129), en primera persona singular,
   sin raya larga y sin una sola cifra que no salga de la medición.
6. **Ningún correo le dice a la ley qué exige.** Después de la revisión, la frase "la Ley 21.719
   pide que el permiso exista antes de que esos rastreadores carguen" salió de los cuatro correos
   donde estaba. En su lugar va la redacción del sitio publicado, que describe la señal en vez de
   dictar la obligación: *ese permiso se pide con el aviso de cookies, y en tu portada no hay
   ninguno*. Lo de **"el artículo 14 ter"** (correos 02, 04, 05, 09, 10) sí está verificado contra
   el texto oficial y se queda.

## Lo que corrigió la revisión

Una segunda sesión volvió a abrir los diez sitios, en contexto nuevo y sin tocar nada, y comparó
cada frase contra lo que se ve en las herramientas del navegador. Encontró diez cosas. Todas están
corregidas en los archivos de esta carpeta.

**La regla que las explica casi todas:** *cargar* y *enviar* no son lo mismo. Que el script baje
(`fbevents.js`, `signals/config/...`) es una cosa; que se vea salir un hit con datos
(`/g/collect`, `/rmkt/collect`, `ct.pinterest.com/v3`) es otra. Donde solo hay lo primero, el
correo ahora dice **"cargó y dejó su cookie"**, con esas palabras.

### Las seis que estaban mal

1. **Awasi (01) — el motor de reservas no está en la portada.** Los siete botones *Book now*
   apuntan a un ancla rota (`awasi.com/##booknow##`). El único formulario de la portada es el de
   suscripción, y **ya trae la casilla "I agree to the privacy policy", sin marcar**. El correo
   ahora se ancla ahí y les reconoce la casilla, igual que se hace con Cumbres y Las Torres. El
   argumento no se debilita: sostiene que saben pedir permiso en el formulario y no lo piden para
   los rastreadores.
2. **Time (04) — no piden teléfono.** Los dos formularios son de **solo correo**. El campo extra
   va en `display:none` (señuelo antispam) y la palabra "teléfono" aparece **0 veces** en la
   página. Salió del asunto y del cuerpo. Lo de "sin casilla de consentimiento" sí es correcto y
   se queda.
3. **Time (04) — sí cargaba algo estando quieto.** En la pasada pasiva se descarga `fbevents.js`.
   El correo decía "no cargó ningún rastreador"; ahora dice lo que de verdad se midió: **no se
   escribió ni una cookie**. El contraste con "bastó mover el mouse" queda igual de fuerte.
4. **Aurea Med (10) — el Pixel de Meta no recibió la visita.** Carga y deja `_fbp`, pero **no hubo
   ninguna petición a `facebook.com/tr` en dos corridas**. El correo separa: Google Analytics (dos
   propiedades) y Google Ads recibieron la visita; el Pixel cargó y dejó su cookie.
5. **Skinology (07) — lo mismo con Meta.** Google, TikTok, Pinterest y Clarity sí tienen hits
   reales; Meta no. Salió de esa lista (y del asunto) y quedó mencionado aparte, como cookie.
6. **Cumbres (02) — no es el único.** Decía "de los hoteles que revisé esta semana, es el único"
   cuyo aviso frena a Google. **lastorres.com (correo 06) da el mismo `gcs=G100` y tampoco guarda
   `_ga`**, o sea el propio lote lo desmentía. La frase se borró: la concesión queda como hecho
   pelado, sin conteo que defender.

### Las cuatro que iban más lejos de lo medido

7. **01, 03, 07 y 08 — le decían a la ley qué exige.** Ver el punto 6 de la sección anterior.
8. **Terrado (03) — 17 cookies y "el Pixel de Meta en tres" iban en la misma frase**, lo que
   invitaba a responder "son tres pixeles pero una sola cookie, y no dispararon". Ahora van
   separados: GA4 (dos propiedades), Google Ads (dos cuentas) y Clarity mandaron datos; los tres
   pixeles de Meta cargaron y dejaron su cookie.
9. **Aurea Med (10) — la reserva de hora no es del sitio.** La agenda es de terceros (Dentalink,
   Medilink, HealthAtom). El ancla ahora es algo que sí está publicado en su portada: el **acceso
   de clientes con usuario y contraseña** (WooCommerce, `/mi-cuenta/`).
10. **Kydoft (09) — el conteo de enlaces no es estable.** La primera medición dio 118 y la
    revisión dio 119 en tres corridas seguidas. Quedó como **"todos los enlaces de la portada"**,
    que no depende de la corrida. El hallazgo (ninguno lleva a una política de privacidad) no
    cambia.

**Lo que la revisión confirmó entero y no se tocó:** 05 (Patagonia Camp), 06 (Las Torres),
08 (Revitalaser, salvo la frase de la ley) y el matiz de 03.

---

## Lo que se dejó fuera a propósito

- **El puntaje del chequeo no aparece en ningún correo.** Awasi saca 100 y es de los peores casos
  reales; Las Torres también saca 100. Decir "sacaste 100, pero tienes un problema" nos deja mal
  parados. El puntaje mide lo que se lee sin ejecutar JavaScript, y estos casos cruzan justo ese
  límite.
- **Ningún mito de mercado.** No se nombra el delegado de datos (no es obligatorio en Chile), ni las
  72 horas para brechas, ni el 4% de los ingresos. Tampoco la multa máxima: la primera infracción de
  una empresa pequeña es amonestación escrita, y usar el 4% como amenaza sería mentir.
- **Ningún correo afirma que la empresa incumple.** Describen qué se instaló en el navegador sin que
  nadie preguntara. En Patagonia Camp está dicho con todas sus letras.
- **La revisión trimestral ($39.000 + IVA/mes, mínimo 2 trimestres) no se menciona.** Cabía mal en
  130 palabras y está publicada en el sitio. Va en la respuesta, si contestan.

## Los dos que no reciben correo

- **Ópticas CL Visión** (`canguita@opticasclvision.cl`) — **no hay sitio**. `opticasclvision.cl` es un
  WordPress recién instalado con el tema Twenty Twenty-Four y el contenido de demostración sin tocar:
  habla de "Études", una empresa de arquitectura, y tiene un "Sample Page" en el menú. Cero
  rastreadores, cero cookies, cero formularios. Escribirle "tu formulario ya trata datos personales
  hoy" sería falso. Si el negocio existe, su sitio real está en otra dirección y hay que encontrarla
  antes de escribir nada.
- **SG Fertility** (`lorena.pardo@sgfertility.com`) — **el dominio no sirve un sitio web**. El HTTPS
  está roto (el servidor corta el handshake y no entrega certificado; confirmado con tres clientes
  distintos) y por HTTP devuelve 404. El correo sí funciona, los MX apuntan a Outlook. No se puede
  decir nada sobre su tratamiento de datos, y tampoco se puede descartar que su sitio real viva en
  otra dirección.

Los dos quedan para la lista de "buscar el sitio real antes de volver a escribir", no para el lote.

## Qué tienes que hacer tú para mandarlos

1. **Léelos uno por uno.** Nada sale de acá directo al correo.
2. **Arregla los saludos.** Seis dicen "Hola, equipo de X" porque la dirección no deja ver el nombre
   de pila (ppereira, gfernandez, afuenzalida, mramirez, jyk, arriojasem). Si sabes el nombre,
   cámbialo. Los cuatro que ya van con nombre: Ruperto, Antonia, Paola, Claudio.
3. **Borra tú los 12 borradores viejos en Gmail.** No los toqué ni los voy a tocar. Si mandas el
   nuevo sin borrar el viejo, queda el riesgo de enviar los dos.
4. **Pega asunto y cuerpo** en un correo nuevo desde `hola@spindlelab.cl`. Los archivos ya traen
   `Para:` y `Asunto:` en las dos primeras líneas, y la firma al final.
5. **Tope de dos correos por empresa**, y el seguimiento a las 24 h si contestan, como el resto del
   outbound.
6. Si alguien pregunta por la fecha, ahí sí se le cuenta el estado real: entra en plena vigencia el
   1 de diciembre de 2026 y hay un proyecto en el Senado que podría correrla. No al revés.

## Dónde está la evidencia de cada afirmación

Todo se midió el 23-sep-2026 con Chrome 153 headless por CDP, contexto nuevo por sitio, sin cookies
previas y **sin un solo clic**. Cada captura se miró a ojo para confirmar si había aviso en pantalla.

- Hoteles (Awasi, Cumbres, Terrado, Time): `../ev0/hallazgos-grupo1.md`
- Patagonia Camp, Las Torres, Ópticas CL Visión, SG Fertility: `../ev1/hallazgos-grupo-2.md`
- Skinology, Revitalaser, Kydoft, Aurea Med: `../ev2/hallazgos-grupo3.md`
- **Segunda pasada independiente, los diez sitios: `../revisor/`.** Ahí están
  `probe-<slug>.json` (peticiones, cookies y enlaces de cada corrida),
  `forms-<slug>.json` y `deep-<slug>.json` (formularios, casillas, conteo de palabras) y las
  capturas `-A` / `-B`. Es lo que sostiene las diez correcciones de más arriba: las tres corridas
  de Kydoft, los dos pases sin hit a `facebook.com/tr`, el `gcs=G100` de Cumbres **y** de Las
  Torres, y el ancla rota de los *Book now* de Awasi.
- Un dato que no estaba en ninguna evidencia previa y se midió para esta corrección: la casilla
  `field-privacy-policy` de Awasi viene **visible y desmarcada** (`checked: false`,
  `defaultChecked: false`). Se comprobó con Chrome headless en `../fix/` (`check.mjs`).

En cada carpeta están el JSON crudo del chequeo, las peticiones de red, las cookies con su duración,
las capturas PNG y los scripts para repetir la prueba. Si alguien responde "eso no es así", la
respuesta está ahí y es reproducible por él mismo en una ventana de incógnito.
