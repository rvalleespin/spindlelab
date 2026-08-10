import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Solo-dev: el dev server de Astro/Vite no resuelve el índice de carpetas de
// public/ (p. ej. /blog/ -> /blog/index.html). Este middleware lo hace para las
// páginas internas estáticas, para poder previsualizarlas. No afecta el build
// ni producción (Cloudflare Pages ya resuelve el índice por sí mismo).
const servePublicDirIndex = {
  name: 'serve-public-dir-index',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      const url = req.url || '';
      const [path, query] = url.split('?');
      if (/^\/(blog|servicios|metodo|contacto)(\/.*)?\/$/.test(path)) {
        req.url = path + 'index.html' + (query ? '?' + query : '');
      }
      next();
    });
  },
};

// https://astro.build
export default defineConfig({
  site: 'https://spindlelab.cl',
  integrations: [tailwind()],
  vite: {
    plugins: [servePublicDirIndex],
  },
});
