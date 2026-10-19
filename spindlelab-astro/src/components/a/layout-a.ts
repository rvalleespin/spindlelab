// LAS PROPS DEL LAYOUT PARA TODA PÁGINA DE A. Son las cinco que aprobó Ramón el 19-oct-2026
// (e12/insumos-ramon-19oct.md §5; spec §0.5 y su fila del 19-oct en §7; desvios.md, tanda 1), más la clase del body:
//   · bodyClass: «a-body» (los tokens de archivo.css viven ahí) y «a-sin-js», que base.mjs quita;
//   · lenis: false (el <body> lleva data-lenis-prevent: scroll nativo);
//   · letras: solo Google Sans Flex y DM Mono se precargan (antislop C7);
//   · themeColor: #060606, el lienzo;
//   · iconos: El huso, con ?v=5 (spec §5.4);
//   · entidad: el #org y el jobTitle de Simón (senales-obra.md §1.1). El jobTitle es su propuesta: lo confirma Ramón
//     antes de publicar.
// Uso: <Layout title="…" description="…" {...LAYOUT_A}>. El noindex lo pone cada página en su slot «head».
export const LAYOUT_A = {
  bodyClass: 'a-body a-sin-js',
  lenis: false,
  letras: ['/fonts/google-sans-flex-latin.woff2', '/fonts/dm-mono-500-latin.woff2'],
  themeColor: '#060606',
  iconos: [
    { rel: 'icon', type: 'image/svg+xml', href: '/v3/marca/favicon.svg?v=5' },
    { rel: 'icon', sizes: '48x48', href: '/v3/marca/favicon.ico?v=5' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/v3/marca/favicon-16.png?v=5' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/v3/marca/favicon-32.png?v=5' },
    { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/v3/marca/favicon-48.png?v=5' },
    { rel: 'apple-touch-icon', href: '/v3/marca/apple-touch-icon.png?v=5' },
  ],
  entidad: {
    org: {
      description:
        'Estudio de diseño y tecnología en Santiago: diseñamos y programamos sitios y herramientas a medida, y hacemos SEO técnico y visibilidad en motores de IA (AEO/GEO) para que Google y ChatGPT puedan leerlos.',
      knowsAbout: [
        'SEO técnico',
        'AEO',
        'GEO',
        'Visibilidad en IA',
        'E-E-A-T',
        'Datos estructurados',
        'Desarrollo web a medida',
        'Diseño web',
        'Desarrollo de aplicaciones web',
      ],
      logo: 'https://spindlelab.cl/v3/marca/icon-512.png',
    },
    autor: {
      jobTitle: 'Fundador de SpindleLab: diseño y desarrollo web, SEO técnico y visibilidad en IA',
    },
  },
};
