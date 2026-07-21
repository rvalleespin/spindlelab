# Encargo: instalar el Meta Pixel en el sitio

**Para:** la sesión que mantiene `spindlelab-site/` · **De:** sesión de Meta Ads (`/persona-meta-ads`) · **Fecha:** 20 jul 2026

**✅ APLICADO — 20 jul 2026 por la propia sesión de Meta Ads** (Ramón lo autorizó). Las 15 páginas tienen el Pixel base en el `<head>` (justo tras el bloque de gtag) y `/contacto/` tiene el evento `Lead` junto al `generate_lead` de GA4. Verificado en local: `fbevents.js` carga (v2.9.358), `PageView` dispara, GA4 intacto, cero errores de consola. **Falta solo: merge de esta rama a `main` + deploy** (GitHub Desktop) para que el Pixel esté vivo en spindlelab.cl y empiece a acumular audiencia. El detalle de abajo queda como referencia de lo que se hizo.

## Contexto

Se abrió el frente de **Meta Ads** para SpindleLab, con enfoque de **remarketing** (traer de vuelta a quien ya visitó el sitio — no prospección fría). Para eso Meta necesita un **Pixel** instalado que vaya acumulando visitantes en un Custom Audience. Ya quedó creado del lado de Meta:

- **Portafolio comercial SpindleLab** — business ID `1025351160247165` (separado de Respinfitness)
- **Cuenta publicitaria SpindleLab** — ID `2050319242539058` (CLP, America/Santiago)
- **Meta Pixel / conjunto de datos "SpindleLab"** — **ID `2885353628478565`** ← el que hay que instalar
  - Creado **sin** la API de conversiones (CAPI) server-side a propósito: por ahora solo Pixel de navegador con eventos controlados, para no duplicar/inventar conversiones. Si más adelante se quiere CAPI, se configura aparte.

Esto es el análogo Meta de lo que ya se hizo con GA4 (`G-J40VW9E0TW` + evento `generate_lead`). Mismo patrón, otra plataforma.

## Qué hay que hacer (2 piezas)

### 1. Código base del Pixel — en el `<head>` de las 15 páginas

El gtag de GA4 hoy está copiado en el `<head>` de todas las páginas (sitio estático, sin include compartido). El Pixel va **igual**: en el `<head>` de las **15** páginas `.html`, idealmente justo debajo del bloque de gtag para mantenerlos juntos.

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2885353628478565');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=2885353628478565&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

Páginas (las mismas que ya tienen el gtag):
```
spindlelab-site/index.html
spindlelab-site/404.html
spindlelab-site/metodo/index.html
spindlelab-site/contacto/index.html
spindlelab-site/servicios/index.html
spindlelab-site/servicios/auditoria-seo-tecnica/index.html
spindlelab-site/servicios/visibilidad-en-ia/index.html
spindlelab-site/servicios/acompanamiento-mensual/index.html
spindlelab-site/servicios/desarrollo-web/index.html
spindlelab-site/blog/index.html
spindlelab-site/blog/que-es-un-mini-diagnostico-seo/index.html
spindlelab-site/blog/cuanto-cuesta-seo-tecnico-chile/index.html
spindlelab-site/blog/como-aparecer-en-chatgpt/index.html
spindlelab-site/blog/que-es-aeo-geo/index.html
spindlelab-site/blog/seo-tecnico-fintechs-chile/index.html
```

### 2. Evento de conversión `Lead` — al enviar el formulario de `/contacto/`

Análogo a `generate_lead` de GA4. En `spindlelab-site/contacto/index.html`, dentro del handler de submit (hoy ~línea 329, en el `.then(...)` cuando `data.success` es verdadero), **junto a** la línea de gtag ya existente:

```js
gtag('event','generate_lead',{form_id:'contacto',service_interest:serviceInterest});
```

agregar debajo:

```js
if(window.fbq){ fbq('track','Lead',{content_name:'contacto',service_interest:serviceInterest}); }
```

El guard `if(window.fbq)` evita que rompa si el Pixel no cargó (ej. bloqueadores). No reemplaza la línea de gtag — convive con ella.

## Cómo verificar

- Con la extensión **Meta Pixel Helper** (Chrome) o en el **Administrador de eventos** de Meta: al abrir cualquier página del sitio debe verse `PageView`, y al enviar el formulario de contacto, un evento `Lead`.
- El Custom Audience de remarketing recién tendrá a quién mostrarle algo tras unos días/semanas de tráfico acumulado — por eso instalarlo cuanto antes.

## Nota

Ramón autorizó abrir el frente de Meta Ads. Este cambio de código es tu territorio (`spindlelab-site/`), igual que el encargo de UTM/GA4 (`formulario-contacto-utm-google-ads.md`). Cuando esté aplicado, avísale a Ramón para que lo registre en el seguimiento.
