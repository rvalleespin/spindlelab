/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sistema "Oscuro Editorial" — ver marketing/brand/manual-de-marca.md
        bg: '#0E141B', // tinta profunda (fondo página)
        surface: '#161D26', // tarjetas, inputs
        'surface-2': '#131A22', // banda alterna (tinta canónica)
        'surface-3': '#0A0F15', // footer, fondo más profundo
        fg: '#F2EFE8', // papel cálido (texto)
        'fg-muted': '#9AA4B0', // gris pluma elevado
        'fg-faint': '#6B7580', // metadatos, disclaimers
        gold: '#C9A227', // el punto dorado (1 por vista)
        'gold-2': '#DCB52F',
        support: '#2FA99B', // petróleo elevado (acento funcional)
        'support-ink': '#0F766E', // petróleo canónico sobre papel
        paper: '#F7F5F0', // artefacto claro (el documento)

        // --- Paleta estricta V2 (valores canónicos del manual de marca) ---
        // Se agregan, no reemplazan: los tokens de arriba mantienen el render
        // actual intacto para poder comparar las dos versiones lado a lado.
        tinta: '#131A22',
        papel: '#F7F5F0',
        pluma: '#5D6673',

        // Solo dirección C (galería). Es una EXTENSIÓN de marca propuesta, no
        // aprobada: negro cálido en vez del azulado #0E141B del sitio actual.
        // Cambia porque el dorado sobre un negro frío tira a mostaza, y sobre
        // este lee como dorado. Papel encima da 17,3:1 y el dorado 7,8:1.
        'tinta-galeria': '#14110E',

        // Campos de color por sección. NO son colores nuevos: el manual §04 ya los tiene
        // como «soporte web (heredados, bajan de rango)» — navy para fondos profundos de
        // secciones y petróleo como color funcional. Acá vuelven a subir de rango para que
        // el scroll pase por mundos de color en vez de alternar dos neutros.
        // Contraste verificado con papel encima: navy 13,4:1 · petróleo 5,0:1.
        'campo-navy': '#0E2A47',
        'campo-petroleo': '#0F766E',

        // Medidos de la referencia con canvas (sus fondos vienen en oklch, así que leerlos
        // como texto daba basura). El azul de allá es #122955: el navy de la casa ya estaba
        // a unos pocos puntos, así que ese slot no se toma prestado de nadie.
        'campo-ciruela': '#341F34',
        // OJO con brasa: papel encima da 4,31:1 y reprueba AA para texto normal.
        // Sobre este campo el cuerpo va en BLANCO PURO (4,70:1), no en papel.
        'campo-brasa': '#DA3400',

        // --- V3: el lienzo es NEGRO PURO ---
        // Medido en la referencia: su body es #000000, no un negro cálido. El
        // 'tinta-galeria' (#14110E) era una extensión MÍA que nunca aprobaste, así que
        // acá no se reemplaza un token de marca: se reemplaza una suposición mía por el
        // valor real de la referencia. Papel encima da 19,3:1 y el dorado 8,7:1, así que
        // el punto dorado sigue leyendo como dorado y no como mostaza.
        noche: '#000000',
        // Tinta (#131A22, canónica del manual) baja a SUPERFICIE: tarjetas y paneles
        // elevados sobre el negro. Es el rol que el manual §04 ya le da.

        // --- Cremas por campo de color ---
        // Esto es lo que hacía que los campos se vieran planos. La referencia NO pone
        // blanco con opacidad sobre sus paneles: tiñe el texto hacia una familia distinta
        // a la del panel (oliva→ámbar, azul→menta, naranja→rosa, ciruela→ámbar). Blanco
        // al 45% lee gris y muerto; una crema teñida lee decidida.
        // Contraste verificado con math real, todas aprueban AA de cuerpo (≥4,5:1):
        'crema-navy': '#E4F1EC', // sobre navy    12,56:1
        'crema-petroleo': '#FFF4E2', // sobre petróleo  5,03:1
        'crema-ciruela': '#FFEFDD', // sobre ciruela  13,40:1
        // Brasa NO lleva crema: la única opción que aprueba AA de cuerpo sobre #DA3400 es
        // el blanco puro (4,70:1). La propia referencia falla acá — su naranja lleva
        // #f5e0db y da 3,70:1, que reprueba. Ese par no se copia.

        // Gris de metadatos sobre negro. Reemplaza el text-white/45 y /30: la opacidad
        // sobre un fondo que cambia de color da un gris distinto en cada sección.
        // Gris pluma (#5D6673) no sirve de cuerpo acá: sobre negro da 3,61:1 y reprueba.
        humo: '#96948E', // sobre negro 6,92:1
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Gabarito', 'Inter', 'system-ui', 'sans-serif'],

        // --- Sistema tipográfico V2 (solo maquetas /v2/*) ---
        // Manrope toma titulares Y cuerpo; Gabarito queda reservada al wordmark.
        // El manual §05 hoy asigna Gabarito a titulares, así que esto lo reemplaza y
        // necesita tu visto bueno. El argumento: si Gabarito aparece en un solo lugar,
        // el wordmark deja de ser «el titular más grande» y pasa a leerse como firma.
        // Manrope ya es de la marca (sistema live v2 de redes, manual §04) y ya está
        // auto-alojada, así que no agrega ni una petición a terceros.
        texto: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        wordmark: ['Gabarito', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Escala fluida para titulares editoriales. El segundo valor es el
        // line-height: por debajo de 1 en los tamaños grandes, que es lo que
        // hace que un titular enorme se lea como un bloque y no como renglones.
        'fluid-xl': ['clamp(2.75rem, 1.6rem + 5.8vw, 5rem)', { lineHeight: '1.02' }],
        'fluid-2xl': ['clamp(2.75rem, 1.25rem + 7.6vw, 7.5rem)', { lineHeight: '0.95' }],
      },
      maxWidth: {
        prosa: '62ch', // ancho de lectura controlado (cuerpo editorial)
      },
      borderRadius: {
        // UN radio, 6px, para todo. Medido en la referencia: 6px usado 156 veces y
        // CERO píldoras. La píldora (rounded-full) es la forma más genérica que existe
        // en la web hoy; es lo primero que hace que una página lea a plantilla.
        v3: '6px',
      },
      spacing: {
        // El aire de sección de la referencia: 256px arriba y abajo en escritorio.
        // El v3 venía en 176px, un 69% de eso.
        seccion: '16rem', // 256px
        medianil: '2.5rem', // 40px — el medianil plano de la referencia (2,8% de 1440)
      },
    },
  },
  plugins: [],
};
