# Setup semana 1 — estado real y pasos exactos

**✅ CORREO COMPLETO — cerrado el 8 jul 2026.** Google Workspace activo; hola@spindlelab.cl envía y recibe.

| Registro | Estado | Detalle |
|---|---|---|
| MX | ✅ | `smtp.google.com` prio 10 (gestionado por Google) |
| SPF | ✅ | `v=spf1 include:_spf.google.com ~all` |
| DKIM | ✅ | `google._domainkey` creado por la autorización de Google |
| DMARC | ✅ | `p=quarantine`, reportes a hola@ — **recordatorio: subir a `p=reject` en agosto** |

Proceso que se siguió (por si hay que repetirlo en otro dominio): Workspace verificó el dominio → Email Routing de Cloudflare se desactivó con «Eliminar y desactivar» (soltó el candado de los MX) → flujo «Acceder a Cloudflare / Autorizar» de Google creó MX + DKIM. DMARC y SPF se gestionaron vía API. El token de API de Cloudflare ya puede revocarse.

---

## Paso 1 — Contratar Google Workspace (~USD 7/mes)

1. Ir a workspace.google.com → «Comenzar» → usar el dominio **spindlelab.cl** (elegir «Ya tengo un dominio»).
2. Crear el usuario **hola@spindlelab.cl**.
3. En la verificación del dominio, Google pide agregar un registro TXT → se agrega en Cloudflare (dash.cloudflare.com → spindlelab.cl → DNS → Add record).

> ⚠️ Decisión importante: al activar Gmail en Workspace, Google pide reemplazar los MX de Cloudflare por los suyos. Eso **desactiva el Email Routing de Cloudflare** (ya no haría falta: Gmail recibe directo). Es el camino correcto — el reenvío a manuvalleespin@gmail.com se reconfigura dentro de Gmail (Configuración → Reenvío) o simplemente agregas la cuenta hola@ a tu app de Gmail.

## Paso 2 — Registros DNS en Cloudflare (después de activar Workspace)

Crear/modificar en dash.cloudflare.com → spindlelab.cl → DNS:

| Tipo | Nombre | Contenido | Nota |
|---|---|---|---|
| MX | `spindlelab.cl` | `smtp.google.com` prioridad 1 | Eliminar los 3 MX de Cloudflare |
| TXT | `spindlelab.cl` | `v=spf1 include:_spf.google.com ~all` | **Reemplaza** el SPF actual de Cloudflare |
| TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:hola@spindlelab.cl; fo=1` | Empezar con `p=quarantine`; subir a `p=reject` al mes |
| TXT | `google._domainkey` | (lo entrega Google) | Admin Console → Apps → Gmail → Autenticar correo → «Generar registro DKIM» → pegar en Cloudflare → «Iniciar autenticación» |

Verificación final: en https://toolbox.googleapps.com/apps/checkmx/ ingresar spindlelab.cl — todo debe salir verde.

## Paso 3 — Google Search Console (10 min)

1. search.google.com/search-console → «Agregar propiedad» → tipo **Dominio** → spindlelab.cl.
2. Google entrega un TXT de verificación → agregarlo en Cloudflare DNS (igual que antes).
3. Ya verificado: Sitemaps → enviar `https://spindlelab.cl/sitemap.xml`.
4. Repetir en Bing: bing.com/webmasters → se puede **importar directo desde Search Console** (1 clic).

## Paso 4 — Cloudflare Web Analytics (5 min)

1. dash.cloudflare.com → Analytics & Logs → Web Analytics → habilitar para spindlelab.cl.
2. Si el sitio está en Cloudflare Pages con el dominio conectado, la medición puede activarse sin tocar código (automatic setup). Si pide un snippet JS, avísame y lo integro yo en el sitio.

## Paso 5 — Los otros dos que son tuyos

- **Email a SimpleTrust** → plantilla en `plantillas/solicitud-testimonio-simpletrust.md`.
- **Página de LinkedIn** → linkedin.com/company/setup/new → nombre «SpindleLab», los textos están en `plantillas/linkedin-posts.md` (sección «Perfil de la página»). El logo/favicon está en `spindlelab-site/assets/img/favicon.svg`.

---

**Checklist de arranque** (cuando los 5 pasos estén listos, el outbound de la semana 2 puede partir):

- [x] Google Workspace activo, hola@spindlelab.cl envía y recibe (probado ida y vuelta, 8 jul)
- [x] SPF actualizado + DKIM activo + DMARC creado
- [x] Remitente cambiado a «SpindleLab» (Gmail «Enviar como» + perfil de la cuenta)
- [x] Token de API de Cloudflare revocado (verificado: «Invalid API Token»)
- [x] Search Console verificado + sitemap enviado ✅ estado «Correcto», 11 páginas descubiertas (confirmado 8 jul)
- [ ] Bing Webmaster Tools: importar desde Search Console (1 clic en bing.com/webmasters — alimenta a ChatGPT)
- [ ] Web Analytics de Cloudflare activo
- [x] Sistema de marca v1.2 aplicado al sitio (Gabarito, favicon monograma, 4ª línea de servicio Desarrollo Web) ✅ 8 jul — ver `brand/manual-de-marca.md` §08
- [~] Email a SimpleTrust — **en pausa hasta nuevo aviso**, reemplazado en prioridad por la cotización de Bernardo (ver `analisis-cotizacion-fotografo.md` y el checklist «listo para enviar» ahí mismo)
- [ ] Página LinkedIn creada
- [ ] Línea base del test de menciones IA (5 prompts en marketing/metricas/)

**Siguiente hito:** cerrar el checklist «listo para enviar a Bernardo» en `analisis-cotizacion-fotografo.md`. Después: lote 1 de outbound — 15 asesoras del Frente A (pedir «prepara el lote 1»).
