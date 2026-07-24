# Reel — "Su propio sitio le decía a ChatGPT que no lo leyera" (4 ago)

**Pieza 1 del encargo `piezas-visuales-agosto.md`.** Kickoff del tema del mes
("Lo que la IA ve y no ve de tu negocio"). Doble uso: **LinkedIn empresa + Reel de Instagram**.
**Estado:** clips propios generados + overlays renderizados y verificados sobre esos clips.
Pendiente tu revisión + montaje en CapCut.

## El concepto: "La puerta"

El sitio como una puerta cerrada. Una fachada premium al atardecer, impecable y encendida por
dentro, vista desde afuera. Alguien mira hacia adentro y no entra. La sala de espera, perfecta,
vacía. Y al final la puerta se abre.

Es el hallazgo del robots.txt hecho imagen: **te ves perfecto y estás cerrado para quien pregunta.**
Cero clichés de IA (nada de robots, pantallas ni circuitos), fotografía real, luz natural,
mood editorial. Reemplaza el b-roll genérico de oficina de julio, que servía para ilustrar
cualquier agencia del mundo y no decía nada de esta historia.

## Material

**Clips propios** en `clips/`, 9:16, 8 s c/u, generados con **Veo 3.1 fast** (Higgsfield):

| Archivo | Qué es |
|---|---|
| `01-fachada-cerrada.mp4` | Fachada de vidrio al atardecer, interior encendido y vacío, calle sola. Dolly in lento. |
| `02-mirando-desde-afuera.mp4` | Mujer de espaldas frente al vidrio, mirando hacia adentro. El plano más fuerte de los cuatro. |
| `04-sala-espera-vacia.mp4` | Sala de espera impecable y vacía, cortinas, luz de mañana. Dolly lateral. |
| `03-puerta-se-abre.mp4` | La puerta se abre y la cámara entra a una recepción profesional. Cierre / CTA. |
| `_descartado-03-living.mp4` | Primera versión del cierre: el interior salió como living de casa, lee doméstico. Descartada, se deja por si sirve de textura. |

**Costo:** 110 créditos Higgsfield (5 generaciones × 22). Saldo consultado antes de generar.

**6 overlays 1080×1920 con fondo transparente** (`ov-1.png` a `ov-6.png`) + su HTML + `base.css`
+ las fuentes `.woff2`. Alfa verificado (PNG color-type 6) y legibilidad probada **compuesta sobre
los clips reales**, no sobre fondo blanco.

## Guion y montaje

| # | Texto | Clip |
|---|---|---|
| 1 | Su propio sitio le decía a ChatGPT que no lo leyera. | `01-fachada-cerrada` |
| 2 | Lo encontré revisando el sitio de una clínica, en un archivo que casi nadie mira. | `01-fachada-cerrada` |
| 3 | **Bloque `robots.txt`** (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, meta-externalagent → `Disallow: /`) | `02-mirando-desde-afuera` |
| 4 | Casi seguro sin querer: un ajuste de seguridad activado por defecto. | `02-mirando-desde-afuera` |
| 5 | El resultado es el mismo de todos modos: para esos sistemas, no existe. | `04-sala-espera-vacia` |
| 6 | ¿Y el tuyo? Lo revisamos gratis, en 48 horas. + wordmark + spindlelab.cl | `03-puerta-se-abre` |

El arco: **cerrado → alguien mira y no puede entrar → la prueba en el código → la sala vacía →
la puerta se abre.** El hook está en el primer frame, que es donde se decide la retención.
El beat 3 es el corazón: muestra las líneas reales del archivo en vez de contarlas, y los
user-agents son los verdaderos de cada motor.

**`preview-montaje.png`** es la hoja de revisión: los 6 beats ya compuestos sobre sus clips.
Es el archivo que hay que aprobar; los overlays sueltos casi no se ven porque son transparentes.

### En CapCut (~4 min)

1. Importa los clips en el orden del guion: `01` → `02` → `04` → `03`.
2. Sobre el `01` van ov-1 y ov-2; sobre el `02`, ov-3 y ov-4; sobre el `04`, ov-5; sobre el `03`, ov-6.
   Unos 4 s por overlay, ~24 s de Reel.
3. Los overlays entran a pantalla completa, sin escalar: ya están a 1080×1920.
4. Al beat 3 dale un pelo más de aire (~5 s): la gente lo lee, no solo lo mira.
5. Los clips traen audio ambiente de Veo: **múltealos** y pon una pista tranquila. Exporta 1080×1920.

**Para LinkedIn:** el mismo MP4 sirve; ahí el autoplay es mudo y todo el mensaje está en texto quemado.

## Caption (LinkedIn empresa — texto completo en la grilla, Semana 5, Mar 4)

> Revisé el sitio de una clínica y encontré algo que no esperaba: su propio sitio le estaba diciendo a ChatGPT que no lo leyera.
>
> En el archivo que controla qué robots pueden entrar (el robots.txt), estaban bloqueados uno por uno los rastreadores de ChatGPT, Claude, Gemini y Perplexity. Casi seguro sin querer, un ajuste de seguridad activado por defecto.
>
> El resultado es el mismo de todos modos: por muy buena que sea la clínica, para esos sistemas no existe.
>
> Lo que la IA ve de tu negocio empieza por lo que tu sitio le deja ver. Este mes voy a mostrar, con casos reales, la diferencia entre las dos cosas.
>
> #SEO #IA #Chile

**Instagram:** mismo video, caption más corta + "Link en bio". Hashtags: #SEO #InteligenciaArtificial #ChatGPT #Chile #AEO #MarketingDigital

## Pendiente / a vigilar

- En `01-fachada-cerrada` hay un rótulo de vidrio **borroso e ilegible** en el interior (artefacto
  del modelo). A tamaño de Reel no se lee, pero si te molesta lo regenero por 22 créditos.
- Los clips de julio (`../reel-no-es-presupuesto/clips/`) quedan libres para otras piezas.

## Notas de marca

- Dorado una sola vez en toda la pieza: el punto del wordmark en `ov-6`.
- `ov-5` y `ov-6` llevan un velo suave a tinta porque caen sobre planos claros; el resto va solo
  con sombra.
- Prospecto anonimizado: "una clínica", sin nombre.
