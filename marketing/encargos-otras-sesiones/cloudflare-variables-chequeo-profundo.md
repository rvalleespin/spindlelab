# ✅ RESUELTO — 28-sep-2026, noche. El chequeo profundo corre.

**Prueba de que funciona** (no "debería funcionar"):

```
GET /api/profundo?dominio=tuane.cl
  28,6 segundos          ← abre un navegador de verdad; antes fallaba en 0,3
  puntaje 77 · parcial: false · 4 items (3 ok, 1 pendiente)
  el aviso de cookies queda PENDIENTE, no verde: el sitio no muestra ninguno
```

Los dos modos `?diagnostico=` ya se sacaron (commit `0c2c04d`). Las 12 baterías de pruebas
siguen en **2.309 bien / 0 mal**.

Fueron **tres** causas encadenadas, no una, y por eso costó tanto. Lo de abajo es el registro.

---

# Las tres causas

Este encargo nació pidiendo ayuda con tres variables de Cloudflare. Las variables terminaron
siendo la mitad del problema, y la otra mitad no tenía nada que ver con el panel.

| | |
|---|---|
| El sitio | ✅ funcionando, nunca se cayó |
| `CF_ACCOUNT_ID` | ✅ llega |
| `VYC_TOPES` (KV) | ✅ llega — espacio `vyc-topes`, id `fbf273b71b4642f0989be319d86a6b0b` |
| `CF_BROWSER_TOKEN` | ⚠️ llega, pero **el valor guardado está roto** (ver causa 2) |
| La conexión al navegador | ✅ arreglada en el código (ver causa 1) |

## Causa 1 — la URL decía `wss://`

**El `fetch` del runtime de Cloudflare no conoce el esquema `wss:`.** Revienta antes de salir a
la red, con `Fetch API cannot load: wss://...`, y como no hay status ni cuerpo el error parece
de permisos o de plan. No lo es.

Los WebSockets salientes se abren con **`https://` + `Upgrade: websocket`**, y eso es lo que
dice toda la doc de WebSockets de Workers. El `wss://` que muestra la doc del endpoint de
Browser Rendering está escrita para un cliente CDP normal (puppeteer, playwright), que corre en
un navegador de verdad.

Se probaron **los dos esquemas en el mismo despliegue** para no volver a adivinar:

```
"wss://"   → el fetch reventó: Fetch API cannot load
"https://" → la API contestó: status 401
```

Arreglado en `functions/api/profundo.js`, commit `13bd23b`.

⚠️ **Esto tumba el "camino de respaldo" que el archivo arrastraba desde el 25-sep.** El supuesto
era que el header `Authorization` no viajaba junto al `Upgrade`, y que por eso habría que migrar
a un Worker aparte con el binding nativo de browser. **Viaja bien. No hace falta ningún Worker
aparte.** La cabecera del archivo ya está corregida.

## Causa 2 — el token guardado trae un espacio o un salto de línea

Con el esquema arreglado la API contesta, y contesta `401` con el cuerpo
`{"code":10000,"message":"Authentication error"}` — **idéntico, carácter por carácter, al que
devuelve una petición sin token ninguno.**

El diagnóstico de forma lo dejó claro:

```
tokenSegunCloudflare → status 400   ← ni siquiera 401: rechaza la CABECERA, no el token
formaDelToken        → largoEsperado: false
                       soloCaracteresValidos: false
                       traeEspaciosOSaltos: true
```

Un espacio o un salto pegado del copiar y pegar rompe la cabecera `Authorization` entera. El
prompt interactivo de `wrangler pages secret put` acepta cualquier cosa sin chistar — ya había
aceptado el token **vacío** dos veces antes, en este mismo encargo.

**El arreglo** es volver a cargarlo limpiando y validando **antes** de enviar:

```bash
cd ~/vyc-ley21719/verificaycumple && T=$(pbpaste | tr -d '[:space:]') && if [[ "$T" =~ ^[A-Za-z0-9_-]{30,60}$ ]]; then printf '%s' "$T" | CI=1 npx --yes wrangler@latest pages secret put CF_BROWSER_TOKEN --project-name verificaycumple && echo "LISTO: ${#T} caracteres, sin espacios"; else echo "NO SE ENVIO NADA: el portapapeles tiene ${#T} caracteres y no tiene forma de token"; fi; unset T
```

Si el token ya no lo tiene (Cloudflare lo muestra una sola vez), se rota:
`dash.cloudflare.com` → foto de perfil → **Perfil** → **Tokens de API** → menú **···** de la
fila → **Rotar**.

## Causa 3 — el token no tenía el permiso, y eso se vio en la lista, no en el error

Al abrir **Perfil → Tokens de API**, el token que estaba cargado (se llamaba `ley`) tenía como
permiso **`Cuenta.Cloudflare Pages` y nada más**. Ningún permiso de navegador. Aunque se hubiera
pegado limpio, no habría funcionado.

Se creó uno nuevo, `verifica-navegador`, con **un solo permiso**:
`Cuenta → Ejecución del navegador → Editar` ("Ejecución del navegador" es como aparece Browser
Rendering en la interfaz en español). El token `ley` quedó intacto.

⚠️ **Los tokens de Cloudflare NO son de 40 caracteres.** El nuevo tiene 53. El primer
diagnóstico daba `largoEsperado: false` porque comprobaba contra 40 exactos, y eso era un error
mío, no un síntoma. El largo se valida como rango (30-60), nunca como número fijo: una regla de
forma demasiado estrecha reporta roto lo que está sano.

## La lección, que vale más que el arreglo

Las dos causas son la misma enfermedad que llevamos el mes entero sacando de los informes del
chequeo: **dar por bueno lo que no se comprobó.** Acá estaba escrita en la herramienta de
diagnóstico, que es peor, porque es la que se supone que no miente.

- El primer diagnóstico reportaba `typeof` → un secreto **vacío** salía como `'string'`, o sea
  presente. Costó dos vueltas.
- El segundo reportaba "texto con contenido (ok)" → un secreto **con basura adentro** salía como
  bueno. Costó esta.

Un diagnóstico de secreto reporta la **forma**, nunca el valor y nunca la mera presencia: si los
caracteres son los válidos, si trae espacios, si trae comillas pegadas, y el largo como rango.
Y cuando el secreto es una credencial, la lista de permisos del panel dice cosas que el mensaje
de error nunca va a decir: mirarla antes de seguir sospechando del código.

⚠️ **Los dos modos `?diagnostico=` de `profundo.js` son temporales y hay que sacarlos** apenas
esto quede verificado punta a punta.

---

# Cargar las variables del chequeo profundo en Cloudflare

**Para:** una sesión con acceso al navegador de Ramón (él ya está con sesión iniciada en Cloudflare)
**De:** la sesión de Verifica y Cumple · 28-sep-2026
**Por qué:** el chequeo profundo está publicado y funcionando, pero le faltan tres ajustes en
Cloudflare. Sin ellos contesta *"la revisión con navegador todavía no está disponible"*.

⚠️ **Ramón pidió expresamente que no lo metan en lo técnico.** Hagan los pasos que se pueden
hacer y pídanle solo lo que él tiene que hacer sí o sí, que es una cosa y toma diez segundos.

---

## El límite que no se cruza

**El token de API lo pega ÉL.** Ninguna sesión escribe claves de API, tokens ni contraseñas en
un formulario, y esto no es una excepción negociable: es la regla de siempre. Si el token pasa
por una sesión, queda en un historial que no es el suyo.

Lo que sí puede hacer una sesión: los otros dos ajustes, que no son secretos.

| Paso | ¿Quién? |
|---|---|
| 1. `CF_ACCOUNT_ID` | La sesión. El ID de cuenta **no es secreto**, está a la vista en la URL |
| 2. `CF_BROWSER_TOKEN` | **Ramón.** Es un token de API |
| 3. Vinculación del KV `VYC_TOPES` | La sesión. Es elegir de una lista, no hay valor que escribir |

---

## Dónde está todo

Cloudflare → **Workers y Pages** → proyecto **verificaycumple** → pestaña **Configuración**.
En la columna derecha, con **Producción** seleccionado arriba:
- **Variables y secretos** (pasos 1 y 2)
- **Vinculaciones** (paso 3)

Confirmado el 28-sep: la rama de producción ya es `laboratorio/ley-21719`, que es la correcta.
Eso no hay que tocarlo. Las dos secciones estaban **vacías**.

---

## Paso 1 — `CF_ACCOUNT_ID` (lo hace la sesión)

El valor está en la barra de direcciones. La URL tiene esta forma:

```
dash.cloudflare.com/<ACCOUNT_ID>/pages/view/verificaycumple/...
```

Lo que va entre `dash.cloudflare.com/` y `/pages` es el ID: 32 caracteres, letras y números.
También aparece con un botón de copiar en la columna derecha de Workers y Pages.

En **Variables y secretos → Agregar**:

- Tipo: **Texto** (no secreto: este ID no lo es, y ponerlo como secreto solo estorba después)
- Nombre de variable: `CF_ACCOUNT_ID`
- Valor: el ID copiado de la URL

**Sin espacios al principio ni al final.** Un espacio invisible al pegar hace que el código no
la encuentre y el síntoma es idéntico a que no exista.

## Paso 2 — `CF_BROWSER_TOKEN` (lo hace RAMÓN)

En el mismo cuadro, **Agregar variable**, y se le deja preparado:

- Tipo: **Secreto**
- Nombre de variable: `CF_BROWSER_TOKEN`
- Valor: **lo pega él**

Si todavía no tiene el token, se crea así (y lo hace él, porque el token aparece una sola vez):
menú de usuario arriba a la derecha → **My Profile** → **API Tokens** → **Create Token** →
**Create Custom Token**. Permiso: **Account → Browser Rendering → Edit**.

Después, **Guardar**.

## Paso 3 — la vinculación del KV (lo hace la sesión)

⚠️ **Esto NO va en Variables y secretos.** `VYC_TOPES` no es texto, es un enlace a otro recurso,
y por eso vive en otra pantalla. Es el error que más se repite con estos tres.

En **Vinculaciones → Agregar**:

- Tipo: **KV namespace**
- Nombre de la variable: `VYC_TOPES`
- Espacio de nombres KV: elegir uno. Si no existe, se crea antes en
  **Workers y Pages → KV → Crear un espacio de nombres**, con cualquier nombre (`vyc-topes`
  sirve). El nombre del espacio no importa; lo que importa es que la variable se llame
  `VYC_TOPES`, que es como la busca el código.

Sin esto el chequeo profundo no puede llevar la cuenta del tope diario, y es un endpoint
público y gratis: alguien lo golpea y se come las horas de navegador en una tarde.

---

## Cómo se comprueba que quedó bien

**Guardar no basta.** El propio panel lo avisa: *"este cambio entrará en vigor en la próxima
implementación"*. Hay que volver a desplegar, con **Retry deployment** en la última
implementación, o pidiéndole a la sesión de Verifica que haga un push.

Y después, esta URL dice la verdad sin entrar al panel:

```
https://verifica.spindlelab.cl/api/profundo?diagnostico=1
```

Devuelve los **nombres** de las variables que el código ve, nunca los valores. Tiene que decir
`"string"` en las tres:

```json
"esperadas": {
  "CF_ACCOUNT_ID": "string",
  "CF_BROWSER_TOKEN": "string",
  "VYC_TOPES": "object"
}
```

`VYC_TOPES` sale como `object` porque es un enlace a un recurso, no un texto. Eso está bien.

Si las tres aparecen, la prueba final es correr el chequeo de verdad:

```
https://verifica.spindlelab.cl/api/profundo?dominio=tuane.cl
```

**La señal más clara es el tiempo.** Hoy responde en 0,3 segundos porque falla antes de
intentarlo. Cuando funcione va a tardar unos 20, porque abre un navegador de verdad.

⚠️ **El modo `?diagnostico=1` es temporal** y hay que sacarlo cuando esto quede resuelto. Está
marcado como tal en `verificaycumple/functions/api/profundo.js`. Avisar a la sesión de Verifica
para que lo quite.

---

## Lo que NO hay que hacer

- **No cambiar la rama de producción.** Ya es `laboratorio/ley-21719` y es la correcta.
- **No desconectar el repositorio Git** ni tocar la configuración de compilación.
- **No pedirle el token a Ramón por chat ni anotarlo en ningún archivo.** Él lo pega directo en
  el formulario y ahí se queda.
- **No cargar las variables en otro proyecto.** El que sirve el sitio es `verificaycumple`,
  verificado el 28-sep leyendo la rama y la URL desde el propio código desplegado.
