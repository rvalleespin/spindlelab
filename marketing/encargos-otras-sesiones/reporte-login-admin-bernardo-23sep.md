# Reporte — Login OAuth del panel de administración (bernardocombeau.cl)

**Fecha:** 2026-09-23 · **De:** sesión cloud (Claude Code Remote) + sesión local (trabajo directo
en `rvalleespin/bernardo-combeau`) — trabajaron en paralelo sobre el mismo pendiente, sin
sincronizar entre sí, y este documento consolida ambas partes.
**Para:** sesión troncal / Ramón
**Cliente:** Bernardo Combeau (fotógrafo, Santiago)
**Contexto:** cierra el único cabo suelto que había quedado abierto de la migración del sitio de
Vercel a Netlify — ver `revision-panel-admin-bernardo.md`, Actualización 19 (8/9-sep-2026) y su
"Estado a 9-sep-2026".

> **Nota de consolidación:** la sesión cloud escribió una primera versión de este reporte que
> daba por buenas dos cosas que resultaron **falsas** (ver más abajo, "Dos premisas del encargo
> que resultaron falsas") — la sesión local las encontró y las corrigió trabajando directo sobre
> el repo del sitio. Se deja este documento único, ya corregido, en vez de mantener dos reportes
> contradictorios con el mismo nombre.

## Qué estaba pendiente

Tres puntos, sin resolver desde la migración (Actualización 19):

1. La "Authorization callback URL" de la GitHub OAuth App ("Bernardo Combeau CMS", Client ID
   `0v23liAvKegJ3yyZFfBt`, propiedad de `rvalleespin`) seguía apuntando a
   `bernardo-combeau.vercel.app` en vez de `bernardocombeau.cl`.
2. El Client Secret original no se podía **ver** de nuevo (GitHub solo lo muestra una vez, al
   crearlo) — hacía falta generar uno nuevo.
3. Netlify (proyecto `strong-cheesecake-b03639`) tenía cero variables de entorno configuradas —
   faltaba cargar `GITHUB_OAUTH_CLIENT_ID` y `GITHUB_OAUTH_CLIENT_SECRET`.

## Qué se hizo

- **GitHub:** Homepage URL y Authorization callback URL de la OAuth App corregidas a
  `https://bernardocombeau.cl` y `https://bernardocombeau.cl/api/callback` (sesión cloud, con
  Ramón operando el navegador).
- **Netlify:** cargadas `GITHUB_OAUTH_CLIENT_ID` y `GITHUB_OAUTH_CLIENT_SECRET` como variables de
  entorno, marcadas "Contains secret values", con deploy disparado para aplicarlas (sesión cloud).
  El panel `/admin` dejó de dar 500 en `/api/auth` — Bernardo ya puede entrar.
- **Arreglo de código real, mergeado (`rvalleespin/bernardo-combeau` PR #1, commit `773d57e`,
  sesión local):** `api/auth.ts` y `api/callback.ts` leían las credenciales con
  `import.meta.env`, que Vite reemplaza en tiempo de compilación — el client secret quedaba
  escrito en texto plano dentro del bundle de la función desplegada. Se cambió a leerlas en
  runtime con `process.env`. Verificado con control A/B sobre el build real: con el código viejo
  el valor literal aparecía en 2 archivos del output (`.netlify/.../chunks/auth_*.mjs`), con el
  nuevo en 0. Esto es además lo que permite marcar la variable como "Contains secret values" en
  Netlify sin que el *secrets scanning* del build la encuentre dentro del output y tumbe el
  deploy.
- **Secret rotado y los viejos eliminados de la OAuth App** (sesión local) — probado con login
  real en incógnito antes de borrar nada.
- **`.env.example` corregido** (PR #2, commit `29767c8`, sesión local): mandaba a Vercel y decía
  "copiar a `.env` para probar en local", instrucción que ya no basta (ver "para correr en local"
  más abajo).
- Este tramo del lado de GitHub/Netlify se hizo a mano por Ramón desde su navegador (la sesión
  cloud no tiene uno propio) — relay paso a paso por captura de pantalla, con un desvío inicial:
  el campo del callback se buscó primero en la pestaña "Advanced" de GitHub (ahí solo vive
  "Danger zone" / borrar la app); el campo real está en "General", más abajo de lo que mostraban
  las primeras capturas.

## Dos premisas del encargo que resultaron falsas

Encontradas y corregidas por la sesión local, trabajando directo sobre el repo — quedan
registradas para que no se repitan:

- **"El client secret anterior quedó invalidado, no sirve más" — era falso.** Generar un secret
  nuevo en una GitHub OAuth App **no invalida los anteriores**; había **dos** secretos vivos en la
  app, incluido uno del 14-jul que GitHub reportaba como usado en las últimas 4 semanas. Hay que
  borrarlos a mano. Ya se hizo — queda uno solo, el rotado.
- **"No hace falta tocar código" — era falso.** Ver el arreglo de `import.meta.env` → `process.env`
  arriba. Sin ese cambio, marcar la variable como secreta en Netlify arriesgaba tumbar el deploy
  por *secrets scanning*, y el client secret seguía quedando expuesto en el bundle desplegado.

## Verificación

- **Sesión cloud, curl directo contra el sitio en vivo**, antes/después del cambio en Netlify:
  ```
  GET https://bernardocombeau.cl/api/auth
  → antes: 500, "Falta configurar GITHUB_OAUTH_CLIENT_ID en Netlify."
  → después: 302, Location: https://github.com/login/oauth/authorize?client_id=0v23liAvKegJ3yyZFfBt
             &redirect_uri=https%3A%2F%2Fbernardocombeau.cl%2Fapi%2Fcallback&scope=repo%2Cuser&state=...
  GET https://bernardocombeau.cl/admin → 301 (redirect normal a /admin/, sirve sin error)
  ```
- **Sesión local, control A/B sobre el build real** (ver arreglo de código arriba): confirma que
  el client secret ya no queda escrito en el output desplegado.
- **Login real, dos veces:** la sesión local lo probó en incógnito antes de borrar los secrets
  viejos; Ramón lo probó después, en vivo, en `bernardocombeau.cl/admin` — confirmó directamente
  "entró bien, ya estoy adentro".

## Pendientes menores (no bloquean nada)

- En Netlify, el contexto **Local development (Netlify CLI)** de `GITHUB_OAUTH_CLIENT_SECRET`
  quedó vacío — solo afecta correr el sitio en local.
- Para probar el login en local ya no sirve `npm run dev`: hace falta `netlify dev`.
- `AGENTS.md` del repo de Bernardo anota que "queda una integración vieja de Vercel" pendiente de
  limpiar. No se tocó.
- Riesgo residual: el secret de julio que se borró figuraba como usado hace poco. Si algo
  distinto del CMS se autenticaba con él, dejaría de funcionar — no se encontró ningún otro
  consumidor de esa OAuth App.

## Para el troncal — dos líneas desactualizadas en `ventas/proyectos-en-curso.md`

Ninguna de las dos sesiones edita esa ficha directamente (protocolo: solo la troncal). La fila de
Bernardo en el checklist técnico todavía dice:

> "registros DNS en NIC Chile, actualizar callback de la OAuth App de GitHub, apuntar `site` del
> proyecto al dominio real" · "Proyecto en `bernardo-combeau` (Vercel)"

Estado real, verificado hoy:

- **Callback de la OAuth App: HECHO.**
- **DNS: resolviendo** (`https://bernardocombeau.cl/` responde 200).
- **El proyecto NO está en Vercel, está en Netlify** (migrado el 8-sep). Se borró además la
  carpeta `.vercel/` del repo (300 MB obsoletos).
- La **"Meta tope: viernes 24 jul"** del checklist ya no aplica.

## Nota de cobro

Este trabajo es posterior al 24-jul, pero corresponde al mismo contrato de Bernardo, que según la
regla de corte va como **persona natural**. No genera cobro nuevo — es cierre del checklist de
Fase 5, ya pagada.

## Estado

**Resuelto de punta a punta**, con evidencia verificada en ambas sesiones (curl contra el sitio en
vivo, control A/B sobre el build, y dos logins reales — uno de prueba, uno de Bernardo/Ramón). Con
esto se cierra el "único cabo suelto" que señalaba la Actualización 19 de
`revision-panel-admin-bernardo.md`: la migración completa de `bernardocombeau.cl` de Vercel a
Netlify queda terminada — sitio público, panel de administración y login, los tres funcionando en
producción, sin ningún vínculo con Vercel, y sin el secret expuesto en el bundle desplegado.
