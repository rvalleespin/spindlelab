# Reporte — Login OAuth del panel de administración (bernardocombeau.cl)

**Fecha:** 2026-09-23 · **De:** sesión cloud (Claude Code Remote) · **Para:** sesión troncal / Ramón
**Cliente:** Bernardo Combeau (fotógrafo, Santiago)
**Contexto:** cierra el único cabo suelto que había quedado abierto de la migración del sitio de
Vercel a Netlify — ver `revision-panel-admin-bernardo.md`, Actualización 19 (8/9-sep-2026) y su
"Estado a 9-sep-2026".

## Qué estaba pendiente

Tres puntos, sin resolver desde la migración:

1. La "Authorization callback URL" de la GitHub OAuth App ("Bernardo Combeau CMS", Client ID
   `0v23liAvKegJ3yyZFfBt`, propiedad de `rvalleespin`) seguía apuntando a
   `bernardo-combeau.vercel.app` en vez de `bernardocombeau.cl`.
2. El Client Secret original no se podía recuperar (GitHub solo lo muestra una vez, al crearlo) —
   había que generar uno nuevo.
3. Netlify (proyecto `strong-cheesecake-b03639`) tenía cero variables de entorno configuradas —
   faltaba cargar `GITHUB_OAUTH_CLIENT_ID` y `GITHUB_OAUTH_CLIENT_SECRET`.

## Qué se hizo (23-sep-2026)

- **GitHub:** Homepage URL y Authorization callback URL de la OAuth App corregidas a
  `https://bernardocombeau.cl` y `https://bernardocombeau.cl/api/callback`. Se generó un Client
  Secret nuevo (el anterior, enmascarado como `*****c3a01878`, quedó invalidado al generar el
  siguiente).
- **Netlify:** cargadas `GITHUB_OAUTH_CLIENT_ID` (`0v23liAvKegJ3yyZFfBt`) y
  `GITHUB_OAUTH_CLIENT_SECRET` (el valor nuevo) como variables de entorno, marcadas "Contains
  secret values", scopes Builds/Functions/Runtime. Deploy disparado manualmente para que
  tomaran efecto.
- Sin cambios de código — `api/auth.ts`/`api/callback.ts` ya derivaban su `redirect_uri` del
  dominio real que los sirve, como había quedado confirmado en la Actualización 19.
- Este tramo se hizo a mano por Ramón desde su navegador (esta sesión cloud no tiene navegador
  propio) — relay paso a paso por captura de pantalla, con un desvío inicial: el campo se buscó
  primero en la pestaña "Advanced" de GitHub (ahí solo vive "Danger zone" / borrar la app); el
  campo real está en "General", más abajo de lo que mostraban las primeras capturas.

## Verificación (esta sesión, curl directo contra el sitio en vivo)

```
GET https://bernardocombeau.cl/api/auth
→ 302
  Location: https://github.com/login/oauth/authorize?client_id=0v23liAvKegJ3yyZFfBt
            &redirect_uri=https%3A%2F%2Fbernardocombeau.cl%2Fapi%2Fcallback&scope=repo%2Cuser&state=...

GET https://bernardocombeau.cl/admin
→ 301 (redirect normal a /admin/, sirve sin error)
```

Antes de este cambio, `/api/auth` daba **500** con el cuerpo
`"Falta configurar GITHUB_OAUTH_CLIENT_ID en Netlify."` — confirmado repetidas veces durante la
sesión. El `client_id` y `redirect_uri` del redirect actual coinciden exactamente con lo esperado,
así que no es solo "se guardó en el panel de Netlify": el comportamiento del sitio en vivo
efectivamente cambió.

## Login real — confirmado

Ramón probó el flujo completo en vivo el mismo 23-sep-2026: entró a
`https://bernardocombeau.cl/admin`, hizo "Login with GitHub", autorizó la app, y volvió al panel
ya autenticado. Confirmado por él directamente ("entró bien, ya estoy adentro"), no inferido.

## Estado

**Resuelto de punta a punta** — configuración/infraestructura verificada por esta sesión (curl
contra el sitio en vivo, 500→302 con los valores correctos) y login real confirmado por Ramón.
Con esto se cierra el "único cabo suelto" que señalaba la Actualización 19 de
`revision-panel-admin-bernardo.md`: la migración completa de `bernardocombeau.cl` de Vercel a
Netlify queda terminada — sitio público, panel de administración y login, los tres funcionando en
producción, sin ningún vínculo con Vercel.
