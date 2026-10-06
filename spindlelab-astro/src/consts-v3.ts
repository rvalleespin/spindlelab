// Rutas de la MAQUETA v3.
//
// Existe aparte de consts.ts a propósito: ese archivo lo usa el sitio vivo, y cambiarle
// las rutas para que la maqueta navegue habría movido los enlaces de producción.
//
// El síntoma que esto arregla: el menú, el pie y todos los botones de «Conversemos tu
// proyecto» apuntaban a /contacto/, /servicios/..., /blog/ — las rutas publicadas. Al
// recorrer la maqueta, el primer clic en el menú te sacaba del v3 y te dejaba en el sitio
// en vivo, que es justo lo que no sirve para evaluar una propuesta.
export const CONTACTO_V3 = '/v3/contacto/';

// UN NOMBRE POR SERVICIO, en caja de oración (antislop A6: sin Title Case, tampoco en la nav).
// Es el mismo nombre del h1, la miga, el «Siguiente» de cada servicio, la home y el índice
// (oferta-v3.json). «Paid Media (Google)» y no «Paid Media»: así se llama en el h1, la miga y
// el índice. El <title> y el nodo Service del JSON-LD conservan el nombre de producto.
// Revisión cruzada, 6-oct (spec §7).
export const SERVICIOS_V3 = [
  { href: '/v3/servicios/desarrollo-web/', label: 'Desarrollo web' },
  { href: '/v3/servicios/visibilidad-en-ia/', label: 'Visibilidad en IA' },
  { href: '/v3/servicios/auditoria-seo-tecnica/', label: 'Auditoría SEO técnica' },
  { href: '/v3/servicios/acompanamiento-mensual/', label: 'Acompañamiento mensual' },
  { href: '/v3/servicios/redes-sociales/', label: 'Gestión de redes sociales' },
  { href: '/v3/servicios/paid-media/', label: 'Paid Media (Google)' },
];

export const CASA_V3 = [
  { href: '/v3/trabajo/', label: 'Trabajo' },
  { href: '/v3/metodo/', label: 'Método' },
  { href: '/v3/nosotros/', label: 'Nosotros' },
  { href: '/v3/diagnostico/', label: 'Chequeo gratis' },
  { href: '/v3/blog/', label: 'Blog' },
  { href: CONTACTO_V3, label: 'Contacto' },
  // Privacidad no tiene versión v3: se deja apuntando a la publicada, que sí existe.
  { href: '/privacidad/', label: 'Privacidad' },
];
