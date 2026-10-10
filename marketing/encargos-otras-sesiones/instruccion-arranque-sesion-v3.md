# Instrucción de arranque — sesión que continúa el rediseño v3

Para pegar como primer mensaje de la sesión que toma el trabajo.

---

Vas a continuar el rediseño v3 del sitio de SpindleLab. Lo dejó otra sesión que se cerró el
10-oct-2026 y que te escribió un traspaso.

**Antes de tocar nada, dos cosas en este orden:**

**1 · Sal de la rama correcta, no de `main`.**

```bash
git fetch origin claude/rebranding-webdev-exploracion
git checkout -b <tu-rama> origin/claude/rebranding-webdev-exploracion
```

El v3 entero vive solo en esa rama: 111 archivos que `main` no tiene, cero páginas v3 en
`main`, y el manual de marca de `main` todavía es la v1.3 mientras la v2.0 solo está ahí. Si
ramificas desde `main` pierdes 53 commits.

**2 · Lee el traspaso entero antes de proponer nada.**

`marketing/encargos-otras-sesiones/traspaso-rediseno-v3-10oct.md`

Trae el estado, las decisiones ya cerradas, los 44 pendientes comprobados y 50 pistas sin
comprobar. Son 500 líneas y están ordenadas por peso; leerlas cuesta menos que repetir una
decisión que ya se tomó.

**Qué es el proyecto.** El sitio propio, versión 3, con driftime.com como referencia. Vive en
`spindlelab-astro/src/pages/v3/` y **no está publicado**: `main` no lo contiene, el deploy de
Cloudflare Pages sale de `main`, y las páginas llevan `noindex`. El eje del sitio se movió
desde la visibilidad en IA hacia el desarrollo web, y eso explica casi todas las decisiones
de la rama.

**Cuatro reglas que no se negocian:**

- **Los precios no se tocan.** Si algo se ve raro, se reporta. Hay uno reportado y pendiente
  de Ramón: Acompañamiento Mensual a $590.000/mes contra un precedente propio de $50.000/mes.
- **El §2 del traspaso son decisiones de Ramón ya cerradas.** El titular del hero, la bajada,
  las mayúsculas, Manrope, las cuatro piezas del índice. No se reabren.
- **El §7 son pistas, no hechos.** De los 45 que alcanzaron a verificarse, uno resultó falso
  y más de un tercio salió con el texto corregido. Compruébalos antes de actuar.
- **Nada se publica sin que Ramón lo diga.** Ni merge a `main`, ni deploy, ni PR sin pedirlo.

**Cómo trabaja esta rama, que es lo que más tiempo te va a ahorrar:**

- **Medir, no describir.** Hay un barrido propio: `cd spindlelab-astro && npm run build &&
  npm run verificar -- --prefijo /v3/`. Hoy pasa 21 páginas sin hallazgos; mantenlo así.
- **Renderizar antes de dar algo por bueno.** Los defectos más caros de esta rama aparecieron
  mirando el render, no el código.
- **Comentar dentro del archivo con `{/* */}`, nunca con `<!-- -->`.** Un comentario HTML en
  una plantilla Astro **se sirve**: ya pasó, y el 16,2 % del HTML de la home eran notas
  internas viajando al navegador.
- **Contar líneas de texto con un `Range`.** `getClientRects()` sobre un bloque devuelve la
  caja del bloque, no las líneas.

**Por dónde empezar.** Los 12 pendientes de peso alto del §6, y entre ellos hay uno que
ordena al resto: **el v3 está terminado pero no tiene ruta de publicación** (noindex en 20
páginas, canonical con prefijo `/v3/`, títulos de maqueta). Decidir con Ramón si las rutas
van a la raíz o se quedan con prefijo cambia el orden de todo lo demás, así que conviene
resolverlo antes que los defectos sueltos.

**Lo que no es tuyo:**
`marketing/encargos-otras-sesiones/encargo-h1-sitio-bernardo-10oct.md` es para la sesión que
mantiene `rvalleespin/bernardo-combeau`, que es otro repo. Pásalo, no lo ejecutes acá.
