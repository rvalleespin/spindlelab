# Memoria — Lucía (web-direccion-arte)

**Rol:** Dirección de arte web — lock de referencias, dos direcciones, spec visual.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/` (referencias,
tableros, spec)
**Skill:** .claude/skills/web-direccion-arte/SKILL.md

## Estado actual
- **2026-10-23 · E12 (v3 sobre A · Archivo): spec escrita, construida y con la QA de obra cerrada con reparos.** Lock
  de Koto medido en el navegador (`obras-web/spindlelab-v3/e12/lock-koto.md`), dos direcciones sobre negro (A Archivo y B
  Banco, `tableros/e12-direcciones/`); Ramón eligió A el 19-oct. Ese día reescribí `spec-visual.md` sobre A (la de
  driftime pasó entera a `spec-visual-driftime.md`) y el 23-oct cerré en ella los mayores 2, 3 y 4 de la vuelta 1 (tres
  filas en §7). **Me queda antes de publicar:** el defecto 10, una contradicción de mi spec (§1.3 contra §2.1, fila 5),
  y lo que Diego declaró para mi decisión (`pendientes-traspaso-revisados.md` §0.2, punto 2, y §0.3).
- **2026-10-16 · E10 (The Ready): lock y dos direcciones (Taller y Pizarra limpia), aprobados por Javiera en la ronda
  3** (`e10/acta-paso-2.md`). Quedó en pausa como historia el mismo día, con el giro a E12.
- **2026-10-02 — rol creado.** Sale del hueco más caro del flujo web: nadie fijaba el
  lenguaje visual **antes** de construir, así que el juicio estético llegaba sobre el
  sitio terminado. Sin obras propias todavía.

## Aprendido a pulso (heredado, antes de mi primera obra)
- **Componer desde adjetivos sale plano.** sep-2026, landing de cliente: tres
  direcciones compuestas desde una descripción de estilo, las tres rechazadas por
  planas. Funcionó recién al anclar en referencias reales (vía Refero) y sumar
  profundidad y asimetría en vez de cajas con borde centradas.
- **Dos direcciones, no tres.** Tres se promedian en la cabeza de quien decide, y el
  promedio de referencias fuertes es exactamente el diseño que huele a IA (tell #7 de
  `refero-design/references/anti-ai-slop.md`).
- **El rol de un token es parte del token** (tell #8). Un acento que la referencia
  reserva para el CTA y termina de fondo de sección es slop con hex correctos.
- **El tablero se mira antes de presentarlo.** Si las fuentes no están locales, el
  headless cae al fallback y la captura muestra una tipografía que no es la de la
  dirección: se rechaza un defecto de render creyendo que se rechaza la dirección.
- **Herencia del sitio propio: pueden convivir dos árboles de plantillas.** En
  `spindlelab-astro` el home son componentes Astro y las internas son HTML estático
  con un CSS compartido; un cambio de nav o de estilo hay que hacerlo en los dos
  lados, y el footer está duplicado. La spec tiene que decir en cuál de los dos vive
  cada decisión.
- **Igualar dos plantillas se mide, no se mira.** Las diferencias que importan eran
  logo 21px vs 20/24px, cuerpo 15px vs 16px, y una barra translúcida al scroll que
  faltaba: solo aparecen comparando valores computados.

## Aprendido en la primera obra (spindlelab-v3, 5–6 oct 2026)
- **La escasez se mide**: 5 mayúsculas 800 en todo el sitio y un oro por vista, contado
  también DENTRO de las fotos (hilos.jpg traía una línea de oro de lado a lado: se recortó).
- **Con 6 fotos el sitio repite**, y la revisión cruzada lo marca como bloqueante en
  páginas seguidas. El pool de imagen se dimensiona antes de construir 21 rutas, no después.
- **Etiquetas de pieza**: arriba en el primer pantallazo (el aviso de cookies tapa abajo);
  abajo en capturas planas, cuyo arriba es la cabecera del sitio retratado.
- **Mockups sin costo**: dispositivo dibujado en CSS + captura real, sobre color de estudio.
  Sobre fotografía propia no se pudo (notebooks cerrados en las fotos del pool).

## Aprendido en E12 (spindlelab-v3 sobre A · Archivo, 16 al 23-oct-2026)
- **La referencia se mide entre los cortes, no solo en 390 y 1440.** Koto medido a 834, 900, 1024, 1100, 1193, 1194 y
  1440 movió las barras laterales del caso de 1024 (el prototipo) a 1194: con el corte del prototipo la caja del cuerpo
  quedaba en 292 px, de 42 a 44 caracteres por línea (spec §1.4, `koto-entre-cortes.json`).
- **Una regla «en todos los anchos» se escribe con sus excepciones al lado.** El tope de 493 (§1.3) y la línea
  «También: Paid Media…» en c5–c12 (§2.1) se contradicen desde 1194, y nadie lo vio hasta la vuelta 2 (defecto 10). Las
  excepciones van en §0.3, con su porqué, el día que se escribe la regla.
- **Un criterio de campo de color se calibra contra la referencia contada con la misma regla.** La cubeta no veía un
  degradé (la franja de Auditoría, defecto 3); la regla 2 (familia de 40° de tono × 0,30 de valor) salió de once
  combinaciones probadas contra 614 medios de Koto, y los techos se recalibraron contra Koto contado igual.
- **«A la vista sin scroll» se mide en los tamaños intermedios.** A 768 × 1024 y 1024 × 768 la ficha «Concepto» caía bajo
  el pliegue (defecto 2); lo único que está en la ventana a todo scroll es la barra flotante, y ahí fue.
- **El aviso de cookies necesita escrito qué es «lo importante» que nunca tapa** (§4.3), medido abierto en todos los
  tamaños: a 834 × 1112, que nadie había medido, tapaba el chequeo.
- **Una excepción autorizada se busca también dentro de las capturas.** El hilo de oro va solo en la portada de la home,
  y la captura de spindlelab.cl que la spec ponía en el índice era ese mismo video detrás del titular: la spec chocaba
  consigo misma (Diego, `desvios.md`, tanda 2 §1). Es la misma lección del oro dentro de `hilos.jpg` (5-oct).

## Con quién trabajo
- Recibo el brief de **Mauro** y el copy real de **Clara** (sin copy real, el tablero
  miente). Entrego la spec a **Diego**, que construye contra ella, y la audita
  **Javiera**. La imagen o el video generado para un hero premium es de **Bruno**
  (dirección creativa), que tiene el pipeline.

## Pendientes que dejé
- [ ] **E12, antes de publicar:** el defecto 10 (escribir si el tope de 493 rige también desde 1194 o si la línea
      «También» es excepción, con su fila en §7). Diego construye lo que cambie.
- [ ] **E12, declarado y abierto:** el `favicon.svg` contra el README de Bruno; los casos sin pie (y sin el botón de
      cookies) y el pie sin `/privacidad/`; la ficha bajo la barra a 390 en Praxi y Combeau; Tonela con la misma captura
      dos veces a 390; el alt y el recorte de la franja de Visibilidad; y la nota 1 de Javiera (con el aviso abierto, los
      últimos controles quedan bajo el aviso y la barra) (`pendientes-traspaso-revisados.md` §0.3). Y, con Clara, qué
      entradas lleva el índice corto de la home: en el criterio 13, dos de tres lectores no vieron su rubro (Tonela y
      Ocelo existen, pero no están ahí; `e12/cierre/criterio-13/lectura.md`).
- [ ] **Si la troncal lo encarga:** traducir A a piezas de redes a 1080, con Bruno (`encargo-manual-marca-e12.md` §6,
      punto 4).
- [ ] Armar un `referencias.md` base del rubro (SEO técnico / AEO-GEO B2B) reutilizable
      entre obras de la casa, para no repetir la búsqueda cada vez.
