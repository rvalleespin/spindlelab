/**
 * Middleware de Cloudflare Pages: manda verificaycumple.pages.dev al dominio definitivo.
 *
 * Verifica y Cumple es un servicio de SpindleLab SpA y se mudó a verifica.spindlelab.cl. El
 * pages.dev tiene que seguir funcionando, porque ya hay enlaces publicados que apuntan ahí (el
 * post del 21-sep, correos enviados), pero no puede seguir sirviendo la página: dos
 * direcciones con el mismo contenido parten la confianza y el SEO en dos, y un *.pages.dev es
 * justo el tipo de dominio que los filtros de phishing miran con sospecha.
 *
 * 301 y no 302: la mudanza es definitiva, y así buscadores y vistas previas actualizan la
 * dirección guardada. Se conservan la ruta y la consulta, para que /privacidad/ lleve a
 * /privacidad/ y un enlace con ?dominio= siga trayendo el dominio.
 *
 * Solo el host exacto. Las vistas previas de cada despliegue (<hash>.verificaycumple.pages.dev)
 * y las de rama se dejan pasar: son para revisar un cambio ANTES de que llegue al dominio
 * definitivo, y redirigirlas mostraría la versión publicada en vez de la que se quiere ver. Lo
 * mismo con localhost al probar en local.
 *
 * Costo a saber: un _middleware.js en la raíz de functions/ corre en TODAS las peticiones,
 * también las de imágenes y fuentes, y cada una cuenta como una invocación de Functions. Para
 * el tráfico de este sitio sobra con el plan gratis. Si algún día pesa, lo mismo se puede
 * hacer sin código con una Bulk Redirect de la cuenta de Cloudflare.
 */

const HOST_VIEJO = 'verificaycumple.pages.dev';
const DESTINO = 'https://verifica.spindlelab.cl';

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === HOST_VIEJO) {
    return Response.redirect(DESTINO + url.pathname + url.search, 301);
  }
  return context.next();
}
