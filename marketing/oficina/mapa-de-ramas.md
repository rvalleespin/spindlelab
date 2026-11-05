# Mapa de ramas y de despliegue

**Fecha:** 5-nov-2026 · **Lo escribe:** la sesión maestra, con `git` sobre `origin` (88 ramas remotas) · **Se actualiza:** cuando se mergea o se abre una rama.

**Para qué sirve:** en este repo el trabajo no está todo en `main`. Hay un producto en línea, un motor de envíos y las redes de una campaña que viven en ramas. Este mapa dice dónde está cada cosa y qué hacer con cada rama. **No se borró ni se mergeó nada**: cada acción de la sección 4 espera el OK de Ramón.

## 1. De dónde sale cada cosa que está en línea

| Qué | Se publica desde | Quién lo mueve | Marca |
|---|---|---|---|
| spindlelab.cl | Rama `main` (Cloudflare Pages). Los cambios del sitio llegan por PR desde `claude/v3-publicacion` | Ramón mergea con método «merge» | [M] |
| verifica.spindlelab.cl | Rama **`laboratorio/ley-21719`**, carpeta `verificaycumple/`. **No está en `main`**: allí queda una foto vieja de 19 archivos (23-oct) | Ramón empuja a producción | [R] según la sesión de Verifica y Cumple |
| Correos de seguimiento (rutina «Copiloto outbound») | Lee `main`. Todo archivo que necesite (por ejemplo `ventas/lista-exclusion.csv`) tiene que estar en `main` | Rutina en la nube | [M] |
| Motor de revisión previa | Rama `claude/motor-revision-previa-build` | Sesión del motor; Ramón envía | [M] |

## 2. Riesgos de orden, comprobados hoy

1. **El producto y su historia están fuera de `main`:** 83 commits en `laboratorio/ley-21719` y 59 en `claude/rescate-pruebas-profundo`. Si esa rama se pierde o se confunde, se pierde el producto.
2. **Registros de envíos de octubre solo en `claude/leads-sesion-19oct`** (25 commits). Son el dedup que el correo frío necesita.
3. **El aviso de la fecha de la ley vive solo en la rama de redes** (`AVISO-vyc-el-sitio-dice-dos-cosas-falsas-2nov.md`). Y el sitio de Verifica y Cumple **sigue mostrando la fecha falsa hoy** (comprobado: «1 de diciembre de 2027» y «Todavía no se aprueba»).
4. **La carpeta de «Busqueda de Leads» está 772 commits atrás de `main` con ~1.025 cambios pendientes.** Un `git commit -a` ahí borraría archivos.
5. **36 archivos sin versionar en la carpeta raíz** (encargos y decisiones de Verifica y Cumple, insumos de Focus Contable). Si se borra la carpeta, se pierden.
6. **Seis PR de la sesión de la nube en dos días** (#58, #59, #64, #65, #67, #68). El flujo funciona; solo hay que vigilar el peso: `spindlelab-astro/public/v3` ya pesa 18 MB.

## 3. Ramas con trabajo que no está en `main` (47)

«Commits nuevos» cuenta solo los que no tienen equivalente en `main` (`git cherry`), no los que entraron por copia.

| Tipo | Rama | Commits nuevos | Último | Qué es |
|---|---|---|---|---|
| viva | `claude/auditoria-agencia-4nov` | 2 | 2026-11-05 | Sesión maestra: auditoría (opcional). |
| viva | `claude/motor-revision-previa-build` | 88 | 2026-11-05 | Motor de revisión previa: envíos del kit, registros y pruebas. |
| viva | `claude/magical-franklin-ckfki2` | 401 | 2026-11-04 | Sitio v3 (obras E13 a E15), sesión en la nube. Sale a `main` por `claude/v3-publicacion`. |
| viva | `claude/mp-resultado-vyc` | 22 | 2026-11-04 | Rama de la carpeta raíz: hallazgos de Verifica y Cumple, Workspace y pagos. |
| viva | `claude/rescate-pruebas-profundo` | 59 | 2026-11-04 | Pruebas de Verifica y Cumple (40 scripts). |
| viva | `laboratorio/ley-21719` | 83 | 2026-11-04 | **Verifica y Cumple, el producto en línea.** Un push a esta rama despliega verifica.spindlelab.cl. |
| viva | `claude/tablero-sesiones-3nov` | 2 | 2026-11-03 | Sesión maestra: tablero y Eduardo. |
| viva | `claude/relanzamiento-sep-social-wygda1` | 67 | 2026-11-02 | Redes de Verifica y Cumple: guiones, reels, posts. **Aquí está solo el aviso de la fecha de la ley.** |
| respaldo | `claude/v3-modelo-nuevo` | 327 | 2026-10-30 | Historia del sitio v3 y revisión del 30-oct. Revisar si ya está todo en `claude/magical-franklin-ckfki2`. |
| respaldo | `claude/gallant-turing-obsop8` | 16 | 2026-10-27 | Focus Contable: toque 1 y su hilo. |
| respaldo | `claude/guia-entrega-kit` | 1 | 2026-10-27 | Guía de entrega del kit de Verifica y Cumple. |
| respaldo | `claude/spotify-landing-page-campaigns-a4pvct` | 37 | 2026-10-27 | Briefing de la reunión con Carlos Soya (28-oct). |
| respaldo | `claude/ajuste-frase-en-chile` | 1 | 2026-10-26 | Quitaba «en Chile» del sitio anterior. **Probablemente obsoleta** tras el sitio v3. |
| respaldo | `claude/outbound-pozo-seco-28sep` | 8 | 2026-10-23 | Configuración de Mercado Pago y la campaña de septiembre. |
| respaldo | `claude/webhook-mp-vistaprevia` | 10 | 2026-10-23 | Pagos de Mercado Pago (bloqueado desde el 26-oct; hoy se cobra por Flow). |
| respaldo | `claude/leads-sesion-19oct` | 25 | 2026-10-19 | **Registros de envíos de octubre (25 commits) que no están en `main`.** |
| respaldo | `claude/cata-evalua-manual-v3` | 119 | 2026-10-10 | Piezas de redes y manual de marca v3. |
| respaldo | `claude/rebranding-webdev-exploracion` | 54 | 2026-10-10 | Exploración del giro a desarrollo web (origen del sitio v3). |
| respaldo | `claude/obra-modulo369` | 10 | 2026-10-07 | Obra del sitio de María Loreto (repo aparte tiene la v4). |
| reciente | `claude/modelo-negocio-y-textos-sitio-borradores` | 2 | 2026-10-23 | marketing: el sitio nuevo sale en menos de un mes (decision de Ramon, 23-oct) |
| dormida | `claude/video-suggestion-analysis-bwwcxo` | 5 | 2026-10-14 | Encargo a leads y correos: el cierre del correo pasa de entregable a promesa |
| dormida | `laboratorio/ideas` | 5 | 2026-10-14 | El hack 4 tenia nombre: es Jev, de TypeSafe, no "Jeff" |
| dormida | `claude/great-ritchie-rs34lm` | 1 | 2026-10-05 | Frente EE.UU.: el fundamento y la memoria de Sam dicen que está cerrado |
| dormida | `claude/reposicion-sitio-v2-mejoras` | 1 | 2026-10-05 | Reporte pre-lanzamiento: QA del v2 antes de apuntar el dominio |
| dormida | `claude/exciting-fermi-77udge` | 6 | 2026-10-02 | tributario: retiro y no contrato, y por que no conviene boletear el proximo |
| dormida | `claude/arreglos-accesibilidad-sitio-vivo` | 1 | 2026-09-27 | Arregla dos defectos de accesibilidad del sitio vivo |
| dormida | `claude/barrido-x-temas-linkedin` | 2 | 2026-09-27 | Traspaso: tres posts personales de LinkedIn a la sesión con navegador |
| dormida | `claude/portafolio-clinica-implantologia` | 1 | 2026-09-27 | Raigal: primera pieza de concepto del portafolio (implantología) |
| dormida | `claude/portafolio-constructora` | 2 | 2026-09-27 | Aplomo: segunda pieza de concepto (constructora industrial B2B) |
| dormida | `claude/chequeo-lineal` | 1 | 2026-09-23 | Merge remote-tracking branch 'origin/main' into claude/chequeo-lineal |
| dormida | `claude/pruebas-chequeo-lineal` | 2 | 2026-09-23 | Pone al día el pin y los números tras el AWS WAF |
| dormida | `claude/post-personal-search-console` | 1 | 2026-09-21 | Post personal para el mie 23: el informe de IA generativa de Search Console y su letra chi |
| dormida | `claude/rescatar-hero-v2` | 1 | 2026-09-21 | Rescata la v2 del hero: su único respaldo eran stashes sueltos |
| dormida | `claude/creative-direction-september-xttmfi` | 6 | 2026-09-07 | Encargo a Renata: titular + caption de la comparativa de Instagram |
| dormida | `claude/spindlelab-brand-presentation-b7zspr` | 3 | 2026-09-03 | Presentación de marca v3: mapa de posicionamiento en el benchmark, tabla a anexo, y plazo |
| dormida | `claude/flooded-home-image-cepvf6` | 1 | 2026-08-25 | Ilustración editorial 'casa inundada': 6 renders, nota de uso y prompts fuente |
| dormida | `claude/spindlelab-marketing-strategy-v98w8h` | 9 | 2026-08-25 | Cierre de esta sesión troncal: nota de handoff para quien continúe |
| dormida | `claude/agente-inteligencia-mercado-xys6c9` | 14 | 2026-08-15 | Mensaje de correo Chef&Hotel: la reunión fue hoy |
| dormida | `claude/spindlelab-main-repo-16a5c5` | 2 | 2026-08-11 | Informe de la campaña Meta de lanzamiento de Praxi |
| dormida | `docs/ficha-praxi-bruno` | 1 | 2026-08-11 | Memoria de Fran: los defaults de Meta que rompen un test A/B en silencio |
| dormida | `oficina-multicliente` | 1 | 2026-08-07 | Oficina: renombrar Vera -> Marco en flujos y guia (quedaron sin actualizar en el rename) |
| dormida | `redesign` | 11 | 2026-08-05 | Oficina: Tomás pasa a ser PM / cabeza operadora + guía de uso |
| dormida | `claude/reposicionamiento-sitio-v2-575bb8` | 8 | 2026-08-02 | Merge remote-tracking branch 'origin/redesign' into claude/reposicionamiento-sitio-v2-575b |
| dormida | `claude/reposicionamiento-sitio-v2-ca32c9` | 1 | 2026-08-02 | Reposicionamiento sitio v2: "Mostramos, no prometemos" |
| dormida | `claude/refero-skill-add-aefb71` | 1 | 2026-07-27 | Instalar skill refero-design en .claude/skills (fuente versionada) |
| dormida | `claude/persona-social-google-ads-773632` | 2 | 2026-07-23 | Merge branch 'claude/persona-social-google-ads-773632' of https://github.com/rvalleespin/s |
| dormida | `claude/performance-marketing-agent-file-1dd1da` | 3 | 2026-07-20 | Doc: inventario de skills (propios + plugins) con función y cuándo usar cada uno |

**Viva** = hay trabajo hoy. **Respaldo** = contiene algo que no está en otro lado; no borrar sin revisar. **Reciente** = último commit en las últimas dos semanas. **Dormida** = más de dos semanas sin tocarse; revisar una por una antes de decidir.

## 4. Acciones propuestas (ninguna ejecutada)

| # | Acción | Por defecto | Riesgo |
|---|---|---|---|
| 1 | Mergear este PR (tablero, mapa y correcciones de `CLAUDE.md` y de la ficha) | Sí | Ninguno: son documentos |
| 2 | Corregir en `verifica.spindlelab.cl` la fecha de la ley (sección 2, punto 3) | Sí, con el texto aprobado por Ramón | Bajo; es un cambio de dos frases |
| 3 | Traer a `main` una copia de `verificaycumple/` y de los registros de `leads-sesion-19oct` | Sí, como PR aparte y chico, sin tocar la rama que despliega | Medio: no mezclar con el despliegue |
| 4 | Borrar las ramas ya dentro de `main` que no usa nadie (lista abajo) | Sí, tras el OK | Bajo: el contenido ya está en `main` |
| 5 | Revisar las ramas «dormidas» una por una | Ramón decide con una lista corta | Ninguno si no se borra sin mirar |

**Ramas ya dentro de `main` (41).** No se deben borrar las que hoy usa una sesión o una carpeta de trabajo:

- **En uso, no borrar:** `claude/agente-troncal-marketing-spindlelab-bdf96e` (troncal anterior (sesión abierta)); `claude/chile-dental-clinic-leads-100b3b` (sesión «Busqueda de Leads»); `claude/motor-revision-previa` (hermana de la rama del motor); `claude/spindlelab-market-competition-eb5eeb` (tiene una carpeta de trabajo en la Mac); `claude/troncal-linea-30oct-cargo-fundador` (tiene una carpeta de trabajo en la Mac); `claude/v3-publicacion` (canal de PR del sitio (lo usa la sesión de la nube)).
- **Libres para borrar con OK (35):** `claude/agente-copywriter-relaunch-ftokpr`, `claude/bernardo-admin-improvements-1afdli`, `claude/centinela-clientes`, `claude/coherencia-visual-videos`, `claude/diagnostico-instantaneo`, `claude/encargo-focus-contable-pipeline`, `claude/encargo-servicios-motor`, `claude/estudio-mercado-14oct`, `claude/fixes-movil-og-blog`, `claude/guiones-largos-blog`, `claude/guiones-resto-sitio`, `claude/jolly-fermi-f2799a`, `claude/laboratorio-a-main`, `claude/marta-calendario-septiembre-eu4ik6`, `claude/migracion-blog-servicios-v2`, `claude/nav-blog-link`, `claude/parte-1-bernardo-combeau-hecha`, `claude/pixel-spindlelab-cl`, `claude/propuesta-post-llamada`, `claude/pruebas-23sep`, `claude/pull-origin-issue-07a7c2`, `claude/ramon-linkedin-personal-brand-0ocl0n`, `claude/relanzamiento-visual-bruno-axki01`, `claude/reposicionamiento-astro-v2`, `claude/seo-fixes-diego`, `claude/servicios-motor-adquisicion`, `claude/sitio-posicionamiento-nuevo`, `claude/skills-sessions-missing-rtyqjd`, `claude/spl-chequeo-23sep`, `claude/troncal-sitio-nuevo`, `claude/verificaycumple-mencion-diagnostico`, `claude/vyc-lanzamiento-25sep`, `claude/vyc-revision-23sep`, `claude/zen-lamarr-e1917d`, `encargo/skills-multicliente`.

## 5. Reglas para que no se vuelva a desordenar

1. **Lo que una rutina o una sesión necesita leer tiene que estar en `main`.** Si no, no existe para ella.
2. **Todo lo que se publica tiene su fila en la sección 1.** Si algo se publica desde una rama, esa rama lleva un aviso en su primera línea.
3. **Una sesión, una rama, un PR chico.** El PR se abre al terminar cada pieza, no al final de la semana.
4. **Al terminar una sesión:** commit, push y una línea en el tablero. Lo que no está en el tablero no se da por hecho.
5. **Los avisos entre sesiones van a `main`, no a la rama de quien los escribe.** Un aviso en una rama que nadie lee es un aviso que no se envió.
6. **Los viernes** se revisan las ramas sin commits nuevos y sin sesión, y se proponen para borrar.
