# Encargo · E10: generar las fotos con IA y ponerlas en el tablero de direcciones

- **Para:** una sesión nueva de Claude Code en la nube, abierta en la rama
  `claude/magical-franklin-ckfki2` **después** de que Ramón agregue su clave de API al entorno.
- **De:** Mauro (estudio web, `/web-encuadre`), 16-oct-2026.
- **Cómo lo pide Ramón:** «lee `marketing/encargos-otras-sesiones/encargo-e10-fotos-ia.md` y hazlo».
- **Quién hace qué en tu sesión:** Bruno (`/persona-director-creativo`) genera, revisa y elige; Lucía
  (`/web-direccion-arte`) pone las fotos en el tablero y lo vuelve a renderizar; Javiera
  (`/web-qa-critico`) revisa en un subagente nuevo; Mauro (`/web-encuadre`) publica, cierra y le avisa
  a Ramón. Carga cada skill cuando le toque.

URL del tablero: https://claude.ai/artifact/1cbk3JGS4vRR8xvqh4SFB9 (privado; publicado el 16-oct a las 12:27, Chile)

## Contexto en cinco líneas

1. SpindleLab rehace su sitio (el v3, sin publicar: vive bajo `/v3/` con `noindex`). El 15-oct Ramón
   cambió la referencia: **The Ready** como principal y **Gehl** como segunda.
2. Lucía midió The Ready y armó dos direcciones, **Taller** y **Pizarra limpia**, sobre tres páginas
   reales (home, Acompañamiento mensual y Trabajo) con el texto ya aprobado. Javiera las aprobó en la
   ronda 3 (`990b91d`).
3. Donde va una foto nueva, el tablero tiene un **espacio marcado** con su medida exacta: 9 espacios
   (F1 a F7, y F8 una vez por dirección).
4. Esas fotos se generan con IA y la clave de Ramón (Gemini «Nano Banana» u OpenAI). Puede haber
   personas, **solo como ambiente: nunca presentadas como el equipo de SpindleLab ni como clientes**.
5. Ramón elige dirección en la compuerta 2 mirando ese tablero con las fotos puestas. El logo y la regla
   del oro están abiertos desde el 16-oct: **no son criterio** en este encargo.

## Dónde está todo

Rutas desde la raíz del repo. `…/v3/` es `marketing/oficina/obras-web/spindlelab-v3/`.

| Qué | Ruta | Lo que necesitas de ahí |
|---|---|---|
| Lock de The Ready | `…/v3/e10/lock-the-ready.md` | §7 fotos, §9 Gehl y §13 techos. El §12 (oro) es historia |
| Tablero | `…/v3/tableros/e10-direcciones/tablero.html` | La página que se publica. Sus imágenes están en `img/` |
| Prototipos | `…/v3/tableros/e10-direcciones/proto/{taller,pizarra}/*.html` | Las 6 páginas. Cada espacio es un `<figure class="foto-slot" data-foto="F<n>">` |
| Espacios de foto | `…/v3/tableros/e10-direcciones/espacios-foto.json` | Medida y rótulo de cada espacio: el contrato con la pauta |
| Herramientas del tablero | `…/v3/tableros/e10-direcciones/herramientas/` | `armar-protos.py` escribe los espacios (función `slot`); `renderizar.mjs`, `armar-tablero.py` y las demás traen su «Uso:» en la cabecera |
| Pauta de fotos | `…/v3/e10/fotos/pauta.json` (la fuente) y `pauta.md` (para leer) | §1 estilo fijo y personas, §2 las 9 fichas, §4 uso del script, §5 revisión, §6 acabado |
| Script | `…/v3/e10/fotos/generar.mjs` | Node 22, sin dependencias. `node generar.mjs --ayuda` |
| Acta de QA | `…/v3/e10/acta-paso-2.md` | La ronda 3, arriba: lo medido y lo que quedó abierto |
| Lo que eligió Ramón | `…/v3/e10/referentes/marcas-15oct.json` | Sus comentarios, tal cual |
| Las reglas | `…/v3/spec-visual.md` §7 (filas del 15 y 16-oct) y `marketing/brand/manual-de-marca.md` §07b | La regla de personas y la del logo |

## Antes de empezar

```sh
git fetch origin claude/magical-franklin-ckfki2
git switch claude/magical-franklin-ckfki2 && git pull --ff-only
git merge-base --is-ancestor 990b91d HEAD && echo "trae la ronda 3"
npm ci --prefix spindlelab-astro && npm run build --prefix spindlelab-astro   # Playwright y dist/ para las herramientas; escriben en carpetas ignoradas
find /opt/pw-browsers -iname chrome -type f                                   # el Chromium del contenedor
```

Las herramientas del tablero apuntan a `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Si tu
contenedor trae otra versión, cambia esa ruta y dilo en el commit.

## La clave: comprobar que está, sin imprimirla

```sh
[ -n "$GEMINI_API_KEY" ] && echo "GEMINI_API_KEY: está" || echo "GEMINI_API_KEY: no está"
[ -n "$OPENAI_API_KEY" ] && echo "OPENAI_API_KEY: está" || echo "OPENAI_API_KEY: no está"
```

`node generar.mjs` dice lo mismo en su segunda línea («Claves en el entorno: …»), sin mostrar el valor.

- **Nunca** `echo $GEMINI_API_KEY`, `env`, `printenv`, `set`, `export -p`, `set -x` ni `env | grep`:
  todos imprimen la clave. Tampoco la escribas en un archivo, un commit, una URL o el chat.
- **Si no está ninguna, no sigas.** Dile a Ramón que la agregue en el menú del entorno de la barra de
  título, «Editar», como variable de entorno con el nombre exacto (`GEMINI_API_KEY` u
  `OPENAI_API_KEY`), y que abra **otra** sesión: la clave solo la toma una sesión abierta después del
  cambio. Nunca le pidas que la pegue en el chat.
- Si están las dos, el script usa Gemini salvo que se pida `--proveedor=openai`.

## La secuencia

Todo desde `…/v3/e10/fotos/`, salvo donde se nombra otra carpeta.

1. **Verificar, sin red.** `node generar.mjs --verificar` tiene que terminar en código 0: «9 espacios, 9
   fichas, ningún vacío». Los 5 avisos de cobertura de Gemini (F1 a 390; F5 y F7 a 1440 y a 390) son
   conocidos y no bloquean. Si termina en 2, **no generes ni fuerces la pauta**: algo cambió en el
   tablero o en la pauta. Lee la salida y avísale a Ramón. Después, `node generar.mjs --prioridad=1
   --variantes=2` lista lo que pediría y cuánto cuesta, también sin red.
2. **Generar la tanda 1.** Di el tope en el chat antes de correr, y corre:

   ```sh
   node generar.mjs --prioridad=1 --variantes=2 --tope=18
   ```

   Son las 9 fichas con 2 variantes cada una: 18 imágenes, unos USD 0,70 con Gemini o 4,50 con OpenAI
   en calidad alta. Cada una queda en `salida/<F>-<dirección>-<n>.png` (por ejemplo `F8-taller-1.png`),
   con su línea en `salida/registro.json`: el prompt exacto, la fecha y el sha256. Si la red falla,
   repite con `NODE_USE_ENV_PROXY=1` delante. Un error de red no se reintenta a ciegas: la imagen pudo
   cobrarse.
3. **Revisar cada una con Read**, abriendo el PNG, una por una y al 100 %. Se descarta si falla
   cualquiera de estas:
   - **Manos y caras:** cinco dedos, sin dedos fundidos ni caras derretidas, tampoco al fondo.
   - **Texto basura:** nada legible inventado en papeles, pantallas, letreros o cajas. Con seudoletras
     nítidas se descarta, o se recorta si quedan fuera del encuadre final.
   - **Logos:** ninguna marca en notebooks, ropa, tazas, cajas ni muros.
   - **Equipo o cliente:** nadie mira a cámara, nadie posa, nadie le explica algo a otro con un informe
     o una pantalla. Si alguien podría leer a esa gente como el equipo de SpindleLab o como un cliente,
     no va. Cuántas personas lleva cada foto lo dice el campo «Personas» de su ficha (`pauta.md` §2):
     F7 y las dos F8 van sin nadie.
   - **«Pastoral gringa»** (lo que Ramón dijo de Hoare): ni loft de ladrillo, ampolletas Edison, casa de
     campo, jardín, otoño, enchufes americanos ni letreros en inglés. Tiene que poder ser una oficina,
     una bodega o un taller de Santiago.
   - **Familia:** puesta junto a las otras, parece del mismo fotógrafo (luz de día neutra, grano fino,
     nada de acabado de render).
   - **El oro no descarta.** El registro trae el oro medido: es un dato para el logo nuevo, nada más.

   Anota el veredicto en `registro.json`: `estado` «elegida» o «descartada: <motivo>».
4. **Rehacer solo lo que falta.** Para las fichas sin una candidata buena, juntas en una corrida:
   `node generar.mjs --solo=F3,F6 --variantes=2 --tope=4` (con las que sean). Si las dos variantes de
   una ficha fallaron por lo mismo, el arreglo es de la pauta y no del momento: Bruno corrige la escena
   o el negativo en `pauta.json`, corre `--sincronizar` y `--verificar`, y lo anota en el historial de la
   pauta. Nunca un prompt escrito a mano fuera de la pauta.
5. **Elegir una por espacio** (9). Si una ficha no se resuelve dentro del tope, ese espacio queda con su
   rótulo y se dice por qué. Nunca una foto de banco ni una forzada.
6. **Acabado común** (`pauta.md` §6), igual para las 9, con Python y Pillow: recorte a la proporción del
   espacio a 1440 y a 390 (los px de cada ficha están en `pauta.md` §2), balance neutro (si el modelo
   calentó la imagen se enfría, nunca al revés), el mismo grano fino en todas, sin viñeta ni virado, JPG
   de calidad ~82 y su versión de 800 px. Nombres nuevos, nunca sobre una ruta que ya existe. Lugar
   propuesto: `…/v3/tableros/e10-direcciones/proto/assets/img/e10/fotos/`.
7. **Ponerlas en el tablero** (Lucía), desde `…/v3/tableros/e10-direcciones/`:
   - En `herramientas/armar-protos.py`, la función `slot` escribe cada espacio. Un espacio con foto
     elegida lleva su `<img>` con el alt propuesto en su ficha, `width`, `height`, `srcset` con la de
     800 y `loading="lazy"`, sin el rótulo «Foto por generar» y **con la misma proporción**: el espacio
     no cambia de medida. Los alt los revisa Clara antes de que algo vaya al sitio; aquí van los de la
     ficha.
   - `herramientas/texto-igual.mjs` hoy exige que cada rótulo empiece con «Foto por generar»: ajústalo
     para que un espacio con foto no lleve rótulo, sin aflojar la comparación del resto del texto.
   - Después se arma todo de nuevo, como dice la cabecera de cada herramienta: `armar-protos.py`;
     servir `proto/` en 8770 y `spindlelab-astro/dist` en 8771; `renderizar.mjs`; las mediciones que lee
     el tablero (`texto-igual.mjs`, `anchos.mjs`, `probar-cinta.mjs`, `orden-hero.mjs` y `ronda2.mjs`);
     y `armar-tablero.py`.
   - En «Espacios de foto», el tablero muestra cada foto elegida con su ficha y dice que son generadas
     con IA y que las personas son ambiente.
   - Al terminar, `git diff --stat -- espacios-foto.json` vacío y `node generar.mjs --verificar` otra vez
     en código 0.
8. **QA de Javiera en contexto limpio.** Un subagente nuevo que carga `/web-qa-critico` y no ve esta
   conversación. Recibe solo rutas: este encargo, `acta-paso-2.md` (ronda 3), `pauta.md` §1 y §5,
   `salida/registro.json`, el tablero y los prototipos. Le pides que mida y no que opine:
   - cada foto elegida, abierta con Read, contra los siete puntos del paso 3;
   - la regla de personas en el lugar donde quedó cada foto;
   - los 18 espacios al píxel contra `espacios-foto.json`, a 1440 y a 390;
   - el texto visible igual al de `dist/v3`, sin desborde de 360 a 1440, y el contraste;
   - el contrato del Artifact y el peso (la imagen más grande y el total; en la ronda 3, 431 KB y
     10,45 MB);
   - que la clave no esté en ningún archivo ni en el diff (`AIza`, `sk-`).

   Escribe su acta en `…/v3/e10/acta-fotos-ia.md`. Hasta dos rondas. Si algo sigue abierto después de
   la segunda, se lleva a Ramón como decisión.
9. **Publicar el tablero en la MISMA URL**, con la herramienta Artifact:
   - primero `action: "read"` con la URL de arriba (un publish sobre un artifact que tu sesión no leyó
     se rechaza);
   - después `action: "publish"` con `url` igual a esa URL, `file_path` igual a `tablero.html` y
     `files` con un mapa de cada `img/…` que el tablero pide (sácalo de los `src="img/…"` del HTML);
   - sin `url` se crea un link nuevo: no lo hagas. Sin `icon`, para que conserve el suyo. Confirma en la
     respuesta que la URL es la misma.
10. **Commit y push** en `claude/magical-franklin-ckfki2`:
    - Agrega rutas explícitas, nunca `git add -A`: `salida/registro.json`, los PNG de las elegidas, las
      fotos con acabado, lo que cambió del tablero (`tablero.html`, `img/`, `proto/`, `herramientas/`) y
      el acta.
    - **Las candidatas descartadas no se versionan:** pesan 1 a 2 MB cada una y quedan descritas en
      `registro.json` con su prompt, su sha256 y el motivo.
    - Antes del commit, `git diff --cached --stat -- spindlelab-astro` vacío y
      `git diff --cached | grep -cE 'AIza|sk-[A-Za-z0-9]'` en 0.
    - Después del push, `git ls-remote origin claude/magical-franklin-ckfki2` tiene que mostrar tu
      commit.
11. **Avisarle a Ramón, en hora de Chile** (`TZ=America/Santiago date`; desde septiembre es UTC−3):
    - el link del tablero, el mismo de siempre;
    - cuántas imágenes se generaron y cuánto costaron, más o menos;
    - qué espacios tienen foto, y cuáles quedaron con rótulo y por qué;
    - el veredicto de Javiera;
    - lo que le toca decidir en la compuerta 2: Taller o Pizarra limpia, los colores (los propios o los
      exactos de The Ready) y los cambios del manual de «Lo que tu elección cambia». El logo no se
      decide ahí.

## El tope de gasto

- **Tanda 1: 18 imágenes** (`--tope=18`). Nunca más de 18 en una sola corrida.
- **Rehacer:** solo las fichas sin candidata buena, con `--tope` igual a lo que pides (2 por ficha).
- **Total del encargo: 30 imágenes**, contando todas las tandas: la suma de los `--tope` usados.
- **Antes de pasar de 30, paras y le avisas a Ramón:** cuántas llevas, cuánto costaron, qué espacios
  faltan y por qué, y cuántas más pides. No sigues sin su sí.
- Para tener la cifra: 30 imágenes son unos USD 1,20 con Gemini y unos USD 7,50 con OpenAI en calidad
  alta (precios de lista que se confirman en la consola del proveedor).

## Lo que no se toca

- **`spindlelab-astro/`**: solo `npm ci` y `npm run build`, que escriben en carpetas ignoradas.
  `git diff -- spindlelab-astro` vacío al final.
- **El texto de E8**, los precios, el chequeo y el formulario: el texto visible de los prototipos
  sigue igual al de `dist/v3`.
- **La composición de las direcciones:** el lock, `tokens.css`, `taller.css`, `pizarra.css` y la
  medida de los espacios. Si una foto pide otro espacio, se avisa; el espacio no se mueve.
- **La pauta**, salvo lo del paso 4 y siempre con `--sincronizar`.
- **El logo y la regla del oro:** no se rediseñan aquí y no son criterio.
- **La elección de dirección**, que es de Ramón. Los documentos de estado compartido
  (`marketing/plan-operativo-90-dias.md`, `ventas/pipeline.md`) los actualiza la troncal con tu
  reporte.
- **`main` y el sitio publicado:** nada va ahí, y ninguna foto entra a `spindlelab-astro/public/`.
- **Lo que Javiera dejó para la spec:** la flecha del chequeo de Taller entre 1024 y 1258 px y el
  tamaño de las fotos en tableta no son de este encargo.

## Si algo falla

- **400, 401, 403 o 404 del proveedor:** la corrida se corta sola (clave inválida, modelo o permiso).
  No pruebes otra cosa por tu cuenta: avísale a Ramón con el mensaje, que sale con la clave tapada.
- **Respuesta sin imagen** (un filtro de seguridad): queda en `fallos` del registro y no cuenta como
  foto. Si se repite en una ficha, es de la pauta (paso 4).
- **Una herramienta del tablero no encuentra Chromium:** ver «Antes de empezar».

## Está terminado cuando

- [ ] `generar.mjs --verificar` da código 0, antes de generar y después de poner las fotos.
- [ ] Cada espacio tiene una foto elegida y revisada con Read, o su rótulo con el motivo escrito.
- [ ] `registro.json` dice el estado de cada imagen generada, y la suma de los topes es 30 o menos
      (o Ramón aprobó más).
- [ ] Javiera aprobó en `e10/acta-fotos-ia.md`.
- [ ] El tablero está publicado en la misma URL, con las fotos.
- [ ] Commit y push hechos, sin la clave y sin cambios en `spindlelab-astro/`.
- [ ] Ramón recibió el aviso, con la hora de Chile.
