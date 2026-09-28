# ✅ 28-sep, tarde: causa encontrada. Léelo antes que todo lo de abajo.

**Lo de abajo está resuelto en parte y una cosa cambió de raíz.** Estado real:

| | |
|---|---|
| El sitio | ✅ funcionando, sin interrupciones |
| `CF_ACCOUNT_ID` | ✅ llega (declarado en `verificaycumple/wrangler.toml`) |
| `VYC_TOPES` (KV) | ✅ llega. El espacio existe: `vyc-topes`, id `fbf273b71b4642f0989be319d86a6b0b` |
| `CF_BROWSER_TOKEN` | ❌ **se borra en cada despliegue** |

## La causa

El token **no está mal ni le falta permiso**. Se carga bien (`wrangler pages secret list` lo
muestra encriptado en production), aparece en el entorno, y **desaparece en el siguiente build**.

Pasó dos veces, con el mismo patrón: se carga el secreto → el diagnóstico lo ve → se despliega
→ el diagnóstico ya no lo ve.

**Por qué:** al crear `verificaycumple/wrangler.toml` con un bloque `[vars]`, ese archivo pasó a
ser la fuente de verdad del entorno del proyecto, y los secretos que viven a nivel de proyecto
no sobreviven a un build desde Git. Los reemplaza lo declarado en el archivo.

## El arreglo, que es de una línea

**Sacar el bloque `[vars]` de `verificaycumple/wrangler.toml` y dejar solo `[[kv_namespaces]]`.**

El enlace del KV era lo único que *necesitaba* estar en configuración, porque es lo único sin
comando en wrangler. Las dos variables de texto sí tienen comando y panel, así que no ganan nada
estando ahí y a cambio pisan el secreto.

Después:
1. Volver a cargar `CF_ACCOUNT_ID` (valor: `112fd68506c4a4f40ed1c8eacaf8cf71`, no es secreto) y
   `CF_BROWSER_TOKEN` por comando o por panel.
2. Desplegar.
3. Comprobar con `?diagnostico=1` que las tres aparezcan **después** del build, no antes.

⚠️ **La comprobación tiene que ser después del build, y comparando el commit.** El endpoint
`?diagnostico=1` devuelve `quienSirveEsto.commit`: si no calza con el último commit, se está
midiendo un despliegue viejo. Ese error costó dos diagnósticos falsos hoy.

## Si después de eso el token llega y la conexión igual falla

Entonces sí es el supuesto que el código arrastra desde el 25-sep, anotado en la cabecera de
`profundo.js`: que el `fetch` de una Pages Function no deja pasar el header `Authorization`
junto con el `Upgrade` del WebSocket. Eso obliga al camino de respaldo, un Worker aparte con el
binding nativo de browser, llamado por service binding. Es medio día de trabajo, está mapeado,
y no es urgente.

Para distinguirlo hay un diagnóstico puesto: `?diagnostico=conexion` devuelve el status crudo
de la API y si vino WebSocket, sin exponer el token.

⚠️ **Los dos modos de diagnóstico son temporales** y hay que sacarlos al cerrar esto.

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
