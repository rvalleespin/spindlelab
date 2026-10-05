# Mockups de la obra (5-oct-2026)

Ocho imágenes en `spindlelab-astro/public/assets/img/obra/mock-<caso>-{ancho,alto}.jpg`:
la obra real montada en un notebook y un teléfono dibujados en CSS, sobre un fondo de
color de estudio. Costo cero, nada generado.

- **Qué hay en las pantallas:** capturas de los sitios en vivo tomadas el 5-oct
  (bernardocombeau.cl, bernardocombeau.cl/modelo/, verifica.spindlelab.cl) y de Raigal
  servido desde `marketing/portafolio/01-raigal/sitio/`. Raigal muestra su propia franja
  de «Pieza de concepto» en la pantalla, y en el sitio además lleva el rótulo.
- **Por qué no van sobre fotografía propia, como decía la spec:** en las dos fotos del
  pool con un notebook (`escritorio.jpg`, `ventana.jpg`) el notebook está **cerrado**, y la
  mesa se ve en un ángulo tan rasante que un teléfono apoyado no se lee. Montarlo igual
  habría dado un collage falso. El fondo de color es lo que hace driftime con sus
  dispositivos.
- **Cómo se regeneran** (si un sitio cambia): `cap-movil.mjs` captura 390×844 @3x y
  1440×900 @2x; `barras.json` es el color de la barra de estado de cada teléfono (el del
  borde superior de la captura); `mock-render.mjs` arma `escena.html` con esos datos y
  rinde a 2x. Las rutas de los scripts apuntan al scratchpad de la sesión que los hizo:
  cámbialas antes de correrlos.
- **Fondos:** salvia `#C5CFC0` (Combeau fotografía), piedra `#D6D0C8` (Combeau modelo),
  lavanda `#C3C8EE` (Verifica y Cumple), arcilla `#B7AC9A` (Raigal). Ninguno cerca del oro.
