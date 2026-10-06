# Memoria — Lucía (web-direccion-arte)

**Rol:** Dirección de arte web — lock de referencias, dos direcciones, spec visual.
**Carpeta de trabajo:** `marketing/oficina/obras-web/<cliente>-<obra>/` (referencias,
tableros, spec)
**Skill:** .claude/skills/web-direccion-arte/SKILL.md

## Estado actual
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

## Con quién trabajo
- Recibo el brief de **Mauro** y el copy real de **Clara** (sin copy real, el tablero
  miente). Entrego la spec a **Diego**, que construye contra ella, y la audita
  **Javiera**. La imagen o el video generado para un hero premium es de **Bruno**
  (dirección creativa), que tiene el pipeline.

## Pendientes que dejé
- [ ] Armar un `referencias.md` base del rubro (SEO técnico / AEO-GEO B2B) reutilizable
      entre obras de la casa, para no repetir la búsqueda cada vez.
