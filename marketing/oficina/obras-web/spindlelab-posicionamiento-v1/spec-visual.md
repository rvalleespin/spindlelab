# Spec visual: SpindleLab, posicionamiento nuevo (23-oct-2026)

**Esta obra no cambia el diseño.** La spec es un contrato de **continuidad**: el sitio publicado en `origin/main` es la referencia, y todo lo nuevo se construye con lo que ya existe en él. No hay referencias externas nuevas porque no hay decisiones visuales nuevas.

## Contrato
1. **Tokens:** los de `spindlelab-astro/tailwind.config.mjs` y `src/styles/global.css` (home y nosotros) y `public/assets/css/style.css` (páginas estáticas). No se agregan colores, tamaños de letra ni radios.
2. **Dorado `#C9A227`:** como máximo un uso por pantalla, donde ya está (el punto del wordmark y los datos que hoy lo llevan). Nunca en texto corrido, viñetas ni fondos.
3. **Tipografía:** Gabarito en títulos y wordmark, Manrope/Inter en cuerpo, tal como cada página la carga hoy.
4. **Secciones nuevas** (por ejemplo «Para quién» y el bloque de precios de la home): se componen copiando el patrón de una sección existente del mismo tipo (lista de pasos, tarjetas de servicio, bloque de texto con título). Si el patrón existente no admite el contenido, se simplifica el contenido, no se inventa un patrón.
5. **Densidad:** el documento de copy ya redujo texto. El diseño no debe quedar con huecos grandes por haberse quitado bloques; si queda un hueco, se anota en `desvios.md` y no se rellena.
6. **Responsive:** 390 / 768 / 1440 sin desborde horizontal. Los botones nuevos o más largos que los actuales no deben partir la barra de navegación en 390.
7. **Acciones:** el CTA principal sigue siendo el botón de contacto que ya existe en cada página; el texto cambia, el estilo no.
8. **Movimiento:** el video del hero y las animaciones existentes se conservan tal cual.

## Historial de correcciones
- **23-oct, ronda 2 (acta-qa.md).** El contrato de continuidad se mantuvo. Hallazgos que cambian reglas de la obra: la barra de navegación de las páginas estáticas no admite un botón de acción más largo que el anterior entre 681 y 940 px; el menú móvil debe llevar siempre el botón «Pedir la revisión»; las imágenes para compartir enlaces llevan texto horneado y por eso se revisan con el barrido de términos como cualquier otra pieza pública.
- **24-oct, ronda 3 (acta-qa-ronda3.md).** Se aplicaron las excepciones al brief que Ramón aprobó el 23-oct: se tocó `public/assets/css/style.css` (menú móvil hasta 1023 px, tabla de los artículos con scroll propio, velo del hero más oscuro bajo los textos chicos) y se creó una imagen social nueva con nombre nuevo (`og-posicionamiento.jpg`, para que LinkedIn y WhatsApp no sigan mostrando la anterior en caché). Reglas que quedan: toda imagen que se reemplace lleva nombre nuevo o `?v=N` en todas sus referencias; los chips pequeños sobre video se miden a 4,5:1 en el peor fotograma; las páginas estáticas y la home pueden diferir en lo que muestra la cabecera entre 681 y 1023 px (en las estáticas solo el logo y el menú), y se declara en `desvios.md`.
