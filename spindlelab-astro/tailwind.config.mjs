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
        // Aclarado el 27-sep: en #6B7580 reprobaba AA como texto chico sobre los tres
        // fondos oscuros del sistema (bg 3,95:1 · surface-2 3,74:1 · surface 3,62:1), y
        // este token existe justo para texto chico. En #828C9B da 5,44 / 5,15 / 4,99:1 y
        // sigue quedando por debajo de fg-muted (#9AA4B0), que es lo que lo distingue.
        'fg-faint': '#828C9B', // metadatos, disclaimers
        gold: '#C9A227', // el punto dorado (1 por vista)
        'gold-2': '#DCB52F',
        support: '#2FA99B', // petróleo elevado (acento funcional)
        'support-ink': '#0F766E', // petróleo canónico sobre papel
        paper: '#F7F5F0', // artefacto claro (el documento)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Gabarito', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
