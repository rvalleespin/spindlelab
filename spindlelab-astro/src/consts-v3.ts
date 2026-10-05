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

export const SERVICIOS_V3 = [
  { href: '/v3/servicios/desarrollo-web/', label: 'Desarrollo Web' },
  { href: '/v3/servicios/visibilidad-en-ia/', label: 'Visibilidad en IA' },
  { href: '/v3/servicios/auditoria-seo-tecnica/', label: 'Auditoría SEO Técnica' },
  { href: '/v3/servicios/acompanamiento-mensual/', label: 'Acompañamiento Mensual' },
  { href: '/v3/servicios/redes-sociales/', label: 'Gestión de Redes Sociales' },
  { href: '/v3/servicios/paid-media/', label: 'Paid Media' },
];

export const CASA_V3 = [
  { href: '/v3/metodo/', label: 'Método' },
  { href: '/v3/nosotros/', label: 'Nosotros' },
  { href: '/v3/diagnostico/', label: 'Chequeo gratis' },
  { href: '/v3/blog/', label: 'Blog' },
  { href: CONTACTO_V3, label: 'Contacto' },
  // Privacidad no tiene versión v3: se deja apuntando a la publicada, que sí existe.
  { href: '/privacidad/', label: 'Privacidad' },
];
