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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Gabarito', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
