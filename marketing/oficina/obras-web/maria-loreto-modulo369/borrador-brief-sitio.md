# Borrador · Brief de obra · Módulo 369 · etapa 2: sitio en producción

> **Borrador. No se aprueba en la compuerta 1 del 5-oct.** Se separó de `brief-de-obra.md` (la maqueta v2) porque su mapa y su alcance dependen de las preguntas 3 a 5 de ese brief, que María responde el 6-oct. Se cierra después de la reunión con esas respuestas y pasa por su propia compuerta 1. Lo que fija hoy sirve para que la maqueta no muestre algo que el sitio no va a entregar.

**Ficha:** `oficina/clientes/maria-loreto-hernandez.md` · **Repo:** `GALERIA-MARIA-LORETO/` · **Stack previsto:** Astro + Decap + Cloudflare Pages (`GALERIA-MARIA-LORETO/CLAUDE.md`)

## 1 · Qué tiene que lograr
El objetivo de la obra completa, en `brief-de-obra.md` §1.

## 2 · A quién le habla
- **Quien viene a mirar y comprar obra (manda en la home):** coleccionista o aficionado, en Chile o fuera (por eso EN). Supuesto: al principio llega por la red de María y de sus artistas (Instagram, boca a boca) más que por búsqueda, y ya sabe que es una galería.
- **Quien viene por Encuentro o por una edición:** llega a un proyecto puntual y tiene que entenderlo sin pasar por la home.
- **María como administradora:** si no puede publicar sola, el sitio falló aunque se vea bien.

## 3 · Mapa de rutas
Las 14 vistas de `brief-de-obra.md` §3 como rutas reales, cada una con su par bajo `/en/` (los slugs EN los fija Simón en `senales.md`). Se suman:

| Ruta | Origen | Para qué existe | Qué tiene que pasar ahí |
|---|---|---|---|
| `/privacidad/` | agregada | Decir qué se hace con los datos que recogen los formularios y la analítica | El aviso que entregue quien decida §9-a. Propuesta del encuadre, fuera del mapa de María |
| `/404` | técnica | Dar salida a un enlace roto | En los dos idiomas, con salida a Obras |
| `/admin/` | panel | Que María administre sola | Decap con login de su GitHub; fuera del diseño público y sin par EN |
| `/exposiciones/` | §9-3 del brief | Solo si María la pide | Una colección más en el panel |

**Tope cotizado: home + 12 páginas fijas** («Home y hasta 12 páginas»). Hoy van home + 10 con Privacidad; home + 11 si entra Exposiciones. *Supuestos de conteo (la cotización no los precisa):* ediciones y encuentros cuentan como colecciones del panel, igual que artistas, exposiciones y obras, que la cotización exime; una página en ES y EN cuenta una vez; 404 y panel no cuentan.
**Tienda:** «futuras categorías» de su mapa no se muestra hasta que exista una (§8-11).

## 4 · Jerarquía
La de `brief-de-obra.md` §3, con los estados de la ficha de su §4.

## 5 · Activos reales
En producción, un hueco nunca se rellena: la sección o el bloque sin material real no se muestra. Relleno de la maqueta: `brief-de-obra.md` §6.

| Activo | Dónde está | Permiso | Si falta en producción |
|---|---|---|---|
| Declaración creativa de María (correo 26-sep) | `BRIEF.md`, textual | Insumo de dirección: sí. Publicarla textual: no consultado | Solo con su OK |
| Mapa y 4 bocetos IDEA | Adjuntos de los correos del 26-sep; `referentes/` vacía | Insumo interno, sin publicar | n/a |
| Nombre «Módulo 369» | Correos de María | Sí | n/a |
| Dominios | .cl en NIC Chile; .com en GoDaddy según WHOIS público (5-oct) | De María; falta confirmar que la cuenta del .com es suya (brief §9-5) | Se conectan en la Fase 5 |
| Logo | No existe | n/a | El nombre compuesto en la tipografía de la dirección; se reemplaza si ella trae uno |
| Fotos de obra | No existen; María está con un fotógrafo | **Por pedir:** licencia de uso web del fotógrafo (y crédito si lo exige); consentimiento de cada artista por obra | Sin foto, la obra no se publica |
| Artistas 2 y 3 (una amiga y un tercero por definir) | Sin nombre | **Por pedir:** consentimiento de cada una para publicar obra y datos | Solo artistas confirmadas |
| Bio, statement, historia, visión curatorial, enunciado, criterio | No existen; los escribe María en ES y EN | Los entrega y autoriza ella o cada artista | El bloque no se muestra |
| Datos de obra (título, año, técnica, medidas, precio) | No existen | Los entrega y autoriza cada artista | Precio opcional (estado 2 de la ficha) |
| Links de MP por obra | No existen; los crea María | De María | Sin link no hay Comprar |
| Ediciones (3): portadas, interiores, links KDP | No recibidos | De María | Sin portada no se publica |
| Encuentro: textos, precio de la caja, fotos, registros | No existen (prototipo) | De María; cada registro, con permiso de quien aparece | Con 0 activados, el Libro muestra 369 posiciones vacías |
| Instagram de la galería | No informado | De María | Sin enlace |
| Correos hola@ y ventas@ | No creados (Zoho o Workspace, brief §9-5) | De María | Se crean en la Fase 5 |
| Caso público para SpindleLab | No existe | **No** | No se publica como caso |

## 6 · Restricciones
- **Los compromisos del 24-sep** (`BRIEF.md`) son contrato: fotos optimizadas, cuentas a su nombre desde el día 1, Comprar por obra con su link de MP que desaparece al marcarla vendida, JPG de 2.000 px mínimo y 10 MB máximo sin HEIC, textos fijos traducidos por SpindleLab, .cl redirigido al .com, prueba en su iPhone en staging antes de publicar.
- **Textos fijos, voz y precio/vendida:** `brief-de-obra.md` §6. El aviso de privacidad es contenido: lo entrega María o su abogado, salvo que Ramón decida otra cosa (§9-a).
- **Formularios** (Contacto, Activar): necesitan un proveedor que elige Ramón (§9-b).
- **Lecciones del sitio de Bernardo** (`GALERIA-MARIA-LORETO/CLAUDE.md`): Cloudflare Pages, rutas de Decap relativas a la raíz del repo, probar con una edición que cambie contenido.
- **Repo:** el remoto se crea en la cuenta de SpindleLab al empezar la construcción y se traspasa con el pago final.

## 7 · Criterios de aceptación (se comprueban mirando el sitio)
**Rutas y contenido**
- [ ] Cada ruta de §3, salvo `/admin/`, existe en ES y EN; el selector lleva a la misma página en el otro idioma y hay `hreflang` entre ambas. `/privacidad/` entra a esta lista cuando exista su texto.
- [ ] La ficha muestra los botones de la tabla de estados (`brief-de-obra.md` §4): Comprar solo en el estado 1, y desaparece al marcar la obra vendida.
- [ ] Con 0 encuentros activados, el Libro muestra 369 posiciones vacías, sin relleno.
- [ ] Buscar `class="pendiente"`, «relleno», «placeholder» o `img/obras/` en el sitio construido da cero resultados, y ninguna sección o bloque sin material real aparece vacío o con texto de espera.
- [ ] Cada página tiene title propio, description, canonical, OG y JSON-LD que parsea, según `senales.md`.

**Panel** (María, sola, desde su cuenta, sin que SpindleLab toque nada; cada prueba **cambia** contenido)
- [ ] Crea una artista, sube una obra JPG de 2.000 px o más, la ordena, la marca vendida, y el cambio aparece publicado.
- [ ] Edita el statement EN de una artista y `/en/` lo muestra.
- [ ] Cambia la obra de portada del carrusel de Inicio y se publica.
- [ ] Crea la edición 4 y el encuentro 001 y se publican (el encuentro, si §9-4 del brief confirma que los registros los sube ella).
- [ ] El panel rechaza un archivo de más de 10 MB y avisa: JPG, no HEIC, mínimo 2.000 px.
- [ ] Se sube un `.heic` real desde un iPhone: el panel lo rechaza o el build lo convierte; en ningún caso falla el deploy.
- [ ] Una foto subida desde el panel se sirve en varias medidas: a 390 px el teléfono no descarga el original.
- [ ] Borrar una obra no deja enlaces internos rotos.

**Correo, dominio y analítica**
- [ ] Un envío de prueba desde Contacto y otro desde Activar llegan a la casilla de la galería.
- [ ] hola@ y ventas@ reciben y envían desde la app de correo de su iPhone.
- [ ] modulo369.com responde con SSL y modulo369.cl redirige (301) al .com.
- [ ] La analítica registra una visita de prueba y no carga antes del consentimiento, salvo que sea una sin cookies y el aviso de privacidad lo declare.

**Entrega**
- [ ] SpindleLab hizo la carga inicial (hasta 30 obras por artista) con el material entregado, y la carga final de QA.
- [ ] Capacitación de uso (1 sesión) hecha y registrada con fecha en el cierre de obra; en ella María sube una obra sola.
- [ ] Cloudflare, GitHub, OAuth App y correo están a nombre de María (visible en cada panel); con el pago final, el repo pasa a su GitHub junto con el documento de cómo está armado.
- [ ] María aprobó por escrito después de probar en su iPhone en staging; antes de eso, nada en su dominio.
- [ ] Acta de QA con veredicto Aprobado y capturas a 390, 768 y 1440.

## 8 · Lo que NO se hace en esta obra
1. **Carrito, pago integrado, stock y envíos.** Es la tienda completa, aparte (desde $450.000 + IVA según `BRIEF.md`). La Tienda de esta obra es un índice que lleva a los botones por obra, a Amazon y a la caja.
2. **Newsletter.** Servicio externo no cotizado; se puede contratar aparte.
3. **Registros subidos por el público al Libro** (formulario con archivos, moderación, almacenamiento). Si los sube María, los carga desde el panel.
4. **Logo o identidad de Módulo 369.** El sitio usa el nombre compuesto con la tipografía.
5. **Fotografía de obras, redacción del contenido y su traducción.** Los entrega María en los dos idiomas.
6. **Reabrir la dirección 3·6·9 por iniciativa interna.** Si María la rechaza en la Fase 2: encabezado de `brief-de-obra.md`.
7. **Secciones fuera del mapa de María**, salvo Privacidad (propuesta) y Exposiciones si ella la pide. Pasar de home + 12 páginas fijas es otra cotización.
8. **Términos de venta o asesoría legal.**
9. **Mantención mensual, más de 3 rondas, cargas de material después de la final de QA:** adicionales de la cotización.
10. **Publicarlo como caso de SpindleLab** sin permiso escrito de María.
11. **Tipos de producto nuevos en Tienda** («futuras categorías»): nada se muestra hasta que exista uno, y crearlo es obra aparte.
12. **Cuentas en el panel para las artistas.** El panel es solo de María, sin multiusuario ni roles.
13. **Precios en más de una moneda.** Una sola, la del link de MP, sin conversión.
14. **Feed de Instagram incrustado.** Solo el enlace.
15. **Blog o novedades.**
16. **La retícula de la maqueta.** Queda en la maqueta.

## 9 · Lo que falta para cerrar este brief
- Las respuestas de María a `brief-de-obra.md` §9-3, 9-4 y 9-5.
- **a · Ramón: ¿quién redacta el aviso de privacidad?** Por la regla de textos fijos es contenido de María (o de su abogado), y no está en la cotización. Si lo redacta SpindleLab, se escribe aquí como excepción explícita y sin costo (ojo: una plantilla de privacidad es parte de lo que vende el kit de Verifica y Cumple). *Supuesto mientras tanto:* lo entrega María.
- **b · Ramón: proveedor de formularios** para Contacto y Activar.
- **c · Analítica:** cuál, y por lo tanto si hace falta control de consentimiento (criterio de §7).
