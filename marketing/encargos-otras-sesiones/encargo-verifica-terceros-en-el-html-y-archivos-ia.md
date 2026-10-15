# Encargo para la sesión de Verifica y Cumple (verifica.spindlelab.cl) · 15-oct-2026

**De:** la sesión del sitio de SpindleLab (rama `claude/magical-franklin-ckfki2`, obra E9).
**Para:** la sesión que mantiene verifica.spindlelab.cl. Su código no está en este repo.
**Lo pidió Ramón** el 14-oct a las 22:30 (Chile): «dame las indicaciones para que la sesión de ese sitio lo tome».

Desde la sesión del sitio de SpindleLab se encontraron dos problemas en verifica.spindlelab.cl en vivo
(los encontró Bruno al capturar las piezas de E9 y los comprobé de nuevo el 14-oct a las 22:30 con
`curl`). Compruébalos con los comandos de abajo antes de tocar nada.

## 1. Urgente: el HTML público nombra a sitios de terceros con su puntaje

En el `<script>` en línea de la portada hay dos comentarios que cualquiera ve con «ver código fuente»:

- **Cerca de la línea 1740 del HTML servido**, dentro de `anilloDe()`: «awasi.com y hotelescumbres.cl
  sacan 0 y su anillo se veía igual que…».
- **Cerca de la línea 1951:** «awasi.com saca 100 leyendo el código y, abierto de verdad, ya avisó a
  cinco empresas».

Va contra la regla de la marca: no se nombra a terceros sin permiso (`CLAUDE.md`, «Zero fabricated
social proof … never named without explicit permission»). Qué hacer:

- a. Reescribe esos dos comentarios sin dominios, por ejemplo «un sitio de prueba saca 0», o sácalos.
- b. Haz que el build quite los comentarios del HTML y del JS en línea antes de publicar. El 14-oct se
  servían 22 comentarios HTML y unas 360 líneas `//`. Las notas internas se quedan en el repo, no en
  lo que se sirve.
- c. Busca otros dominios de terceros en todo lo que se publica. No cuentan spindlelab.cl,
  verifica.spindlelab.cl ni los ejemplos como tuempresa.cl.

**Comprobación**, después del deploy (si sigue saliendo, purga la caché de Cloudflare):

```
curl -s https://verifica.spindlelab.cl/ | grep -ciE "awasi|hotelescumbres"   # tiene que dar 0
```

Este arreglo se publica apenas esté comprobado.

## 2. robots.txt, llms.txt y sitemap.xml no existen

Esas tres rutas responden 200 con la aplicación (`text/html`), igual que cualquier ruta inventada:
`/no-existe-xyz` también da 200. Es la respuesta de una aplicación de una sola página cuando el sitio
no tiene `404.html`. Por esto, en parte, el chequeo de IA de SpindleLab le da **54** a
verifica.spindlelab.cl (14-oct), que es un producto nuestro.

Qué hacer:

- a. Publicar un `/robots.txt` real, en texto plano, con el mismo criterio que
  https://spindlelab.cl/robots.txt: dejar entrar a los buscadores y a los robots de IA, y apuntar al
  sitemap.
- b. Publicar `/sitemap.xml` con las URL reales del sitio.
- c. Publicar `/llms.txt` con qué es Verifica y Cumple y sus páginas. Sin prometer monitoreo de
  menciones ni una frecuencia de informes: eso todavía está en decisión de Ramón (R2 en
  `marketing/oficina/obras-web/spindlelab-v3/pendientes-traspaso-revisados.md`).
- d. Agregar un `404.html`, para que las rutas que no existen den 404 y no 200.

**Comprobación:**

```
for p in robots.txt llms.txt sitemap.xml no-existe-xyz; do
  curl -s -o /dev/null -w "$p %{http_code} %{content_type}\n" https://verifica.spindlelab.cl/$p
done
```

Lo esperado:

- robots.txt y llms.txt: 200 y `text/plain`;
- sitemap.xml: 200 y XML;
- no-existe-xyz: 404.

Después corre `https://spindlelab.cl/api/chequeo?dominio=verifica.spindlelab.cl` y anota el antes
(54 el 14-oct) y el después.

## Al terminar

Deja el resultado en `marketing/encargos-otras-sesiones/` de este repo, con el antes y el después
de cada comprobación y los commits. La sesión de SpindleLab lo verifica antes de darlo por hecho.

## Lo medido el 14-oct, 22:30 (Chile)

```
robots.txt 200 text/html; charset=utf-8
llms.txt 200 text/html; charset=utf-8
sitemap.xml 200 text/html; charset=utf-8
no-existe-xyz 200 text/html; charset=utf-8
server: cloudflare
```
