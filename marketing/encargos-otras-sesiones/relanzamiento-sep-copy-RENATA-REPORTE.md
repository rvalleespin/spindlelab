# Reporte de entrega → Marta, Cata, Ramón y Diego: copy del relanzamiento de septiembre

**De:** Renata (agente-copywriter) · **31-ago-2026**
**Encargo:** `relanzamiento-sep-copy-renata.md` (Marta, 28-ago) · **Cliente:** SpindleLab (la casa)

Las 6 piezas están redactadas, incluidas las dos entregas. Nada está publicado ni listo para
publicar por sí solo: **todo pasa por pase de tono de Cata y por la tanda de Ramón que le
corresponde a cada pieza.**

## Entrega 1 (se revisa en el Pase 1+2, hoy lun 31-ago)

| Pieza | Archivo |
|---|---|
| Anuncio del motor, página LinkedIn, plural, mar 1-sep 09:00 | `marketing/redes/2026-09-septiembre/2026-09-01-pagina-anuncio-motor.md` |
| Post ancla, perfil de Ramón, singular y texto puro, mié 2-sep 12:30 | `marketing/redes/2026-09-septiembre/2026-09-02-personal-post-ancla.md` |
| Blog #1, "Los 21 chequeos de visibilidad en IA, explicados uno por uno", jue 3-sep | `marketing/articulos/2026-09-articulo-03-los-21-chequeos-de-visibilidad-en-ia.md` |

## Entrega 2 (Pase 3, vie 4-sep)

| Pieza | Archivo |
|---|---|
| Blog #2, "Un motor de adquisición, no cuatro servicios sueltos", jue 10-sep | `marketing/articulos/2026-09-articulo-04-un-motor-de-adquisicion.md` |
| Reciclaje del blog #1, página, Formato 2, mar 8-sep | `marketing/redes/2026-09-septiembre/2026-09-08-pagina-reciclaje-blog-1.md` |
| Hallazgo del chequeo, perfil, mié 9-sep | `marketing/redes/2026-09-septiembre/2026-09-09-personal-hallazgo-chequeo.md` ⚠️ |

## Lo que hay que decidir, no solo aprobar

**1. El post del 9-sep está bloqueado por dato (para Marta y Ramón, corte jue 3-sep).**
No existe ninguna corrida guardada del chequeo: revisé `marketing/outbound/` y
`marketing/metricas/` archivo por archivo, y el encargo de Emilia sigue ⬜ pendiente. Dejé el
**Plan B redactado y verificado** (hallazgo real del lote dental del 21-jul, anonimizado) para
sostener la fila sin inventar nada, y el aviso formal en `aviso-renata-a-marta-post-9sep.md` con el
mínimo de datos que necesito si se quiere el Plan A. **No voy a estimar un número.**

**2. El post del 8-sep depende de que el blog #1 esté en vivo.** Enlaza el artículo. Si el jue 3
Diego no alcanza a publicar, ese post se corre o se reemplaza; no puede salir apuntando a un 404.

**3. Dos enlaces en el primer comentario del 8-sep** (artículo + chequeo). Si Cata prefiere uno
solo, el que se queda es el del artículo.

**4. El cierre del primer comentario del post ancla** abre atención directa por mensaje
("escríbeme por acá"). Si Ramón no quiere ese canal abierto esta semana, se corta esa frase.

## De dónde salió cada dato (para que Ramón pueda auditarlo rápido)

- **Los 21 chequeos, sus pesos y sus instrucciones de arreglo** salen de
  `spindlelab-astro/functions/api/chequeo.js`, verificados uno por uno. Los bloques suman
  30 + 40 + 30 = 100. Los tramos de puntaje (90 / 70 / 45) salen del mismo archivo de
  `/diagnostico/`.
- **El motor y sus piezas** salen del sitio en vivo: el H1 del home, la sección "El problema", el
  eje y las piezas de `Servicios.astro`, y las cuatro fases del `HowTo` de `/metodo/`.
- **Las seis soluciones con precio "desde"**, la metodología publicada, el "sin registro" y el "no
  guardamos el dominio" están en `/diagnostico/` y en `/servicios/`.
- **El hallazgo del Plan B** está documentado en `marketing/outbound/lote-frente-b-dental-21jul.md`,
  verificado el 21-jul.
- **Cero cifras inventadas.** El blog #2 va sin estadísticas a propósito: argumenta con mecanismo
  porque no tenemos una fuente propia que respalde números sobre eso.

## Vetos revisados pieza por pieza

Sin "rebranding" ni "nueva imagen" · sin el 0/15 propio · sin `/indice/` ni "Índice de Citabilidad" ·
sin competidores nombrados · sin urgencia fabricada · sin prueba social inventada · sin em-dash de
muletilla ni relleno de transición · sin lo saturado de la línea v2 ("el SEO ha muerto", "era
zero-click", "share of model"). Voz plural en las piezas de página y en los dos artículos; singular
en las dos piezas del perfil de Ramón, sin cifras ni precios en el cuerpo y sin las aperturas
vetadas.

## Lo que no es mío y queda esperando

- **Cata:** pase de tono de las 6 piezas y los ajustes de copy de las recicladas de agosto.
- **Bruno:** las piezas visuales (el copy no depende de la etiqueta de serie; si cambia, no se toca).
- **Diego:** montaje de los dos artículos, con `FAQPage` textual desde la sección de preguntas
  frecuentes de cada uno, más la deuda técnica del `FAQPage` del post de fintechs.
- **Emilia:** las corridas del chequeo, que además de mi post del 9-sep alimentan el Research (#10)
  de la línea editorial.
- **Ramón:** editar los dos artículos y aprobar todo antes de publicar.
