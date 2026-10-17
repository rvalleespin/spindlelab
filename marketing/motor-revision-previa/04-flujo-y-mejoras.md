# Qué tocó la sesión del motor y qué mejorar (16-oct-2026)

## 1. El embudo real del lote (contactos que la búsqueda de leads ya tenía)
467 dominios únicos en los bancos de `ventas/` → 372 sin exclusión → 228 sin envío registrado → **94** sin correo previo en Gmail (cruce por dominio) → 94 medidos → 37 con hallazgo fuerte o medio → 33 verificados en vivo → 28 sostenidos → **4 ya contactados** (cruce por correo exacto) → 24 → **18** tras cortar a estudios que venden protección de datos → **11 con borrador** → 5 en la primera ola (el resto, catch-all).
Rendimiento: 11 de 94 medidos (12 %) y 11 de 467 contactos (2,4 %).

## 2. Partes del flujo que tocó esta sesión
| Parte | Qué se hizo | Estado |
|---|---|---|
| Lista de empresas | Se armó desde los CSV existentes, sin Apollo | nuevo, hecho a mano con un script |
| Filtros previos | Exclusión, registro de enviados, Gmail por dominio, Gmail por correo exacto, descartes previos y "vende protección de datos" | los dos últimos son nuevos y se agregaron tarde |
| Motor (medición) | Catálogo de hallazgos, 3 corridas, móvil, fuerza de la oferta, corte por hosting en construcción, redirecciones, plantillas, portada que no carga | construido y corregido |
| Verificación independiente | 2 revisores por hallazgo vuelven a medir en vivo | **nuevo**, 66 revisiones |
| Redacción del correo | 11 borradores con la voz de Ramón, 2 rondas de lectura independiente | **invade el rol de Emilia** por decisión de Ramón |
| Aprobación | Páginas de revisión con botón de copiar | nuevo |
| Coordinación | PR #47 y #48, traspasos en `encargos-otras-sesiones/`, mensaje a la sesión de leads (no llegó: archivada) | hecho |
No se tocó: Apollo y Dereck, el registro de envíos, el pipeline, la estrategia, el CRM, Valen, el copiloto ni el sitio.

## 3. Evaluación: qué funciona y qué no
- **Funcionó, y es lo mejor que salió:** la verificación independiente. De 33 hallazgos "fuertes", 5 no se sostenían y 3 cambiaban de frase. Sin ella, 5 de 33 correos (15 %) habrían afirmado algo falso.
- **Funcionó:** la lectura independiente de borradores. Encontró 3 correos a estudios que venden lo mismo que nosotros y frases que afirmaban más de lo medido.
- **No funcionó:** el orden. Los descartes baratos (competidor, "fuera de perfil", correo ya contactado, hosting) se aplicaron DESPUÉS de medir y verificar. De los 33 sitios verificados, 10 (30 %) no se debían escribir por un descarte barato (4 ya contactados y 6 que venden protección de datos): se gastaron unas 20 revisiones de las 66.
- **No funcionó:** el catálogo distingue poco. 31 de los 94 medidos salieron con "cookies" (21) o "formulario sin política" (10), y casi todos sirven la misma oferta. Un hallazgo chico (una cookie) no da una razón para contestar.
- **Riesgo estructural:** 6 de los 11 destinatarios son catch-all, al menos 4 son correos genéricos o cargos que no deciden, y 7 de los 11 son abogados, un rubro donde 6 de 13 verificados venden lo mismo que nosotros.

## 4. Mejoras, en orden de impacto sobre la respuesta
1. **Medir la respuesta.** Hasta hoy ~5 % (7 de 142 correos, 5 de ellas respuestas activas). Sin una columna `oferta`, `ola` y `variante` en el registro de envíos no se sabe qué hallazgo convierte. Prueba A/B mínima: 15 correos con este método contra 15 con el anterior.
2. **Filtrar antes de medir.** Un solo script de preparación que aplique todos los descartes baratos y el cruce con Gmail por correo exacto (el cruce por dominio falló en 4 de 28). Ahorra parte del tiempo de medición y de verificación [Probable].
3. **Subir la calidad del destinatario.** Pedir al buscador de leads un decisor con nombre (no `contacto@`, `info@` ni un cargo de pasante) y marcar el catch-all desde el origen. Cambiar de rubro: abogados es el más difícil (6 de 13 verificados venden protección de datos).
4. **Ordenar por consecuencia, no por tipo.** Un puntaje interno (nunca en el correo): formulario que pide teléfono y no explica qué hace con él, cookies de publicidad más grabación de sesión, y contacto escondido pesan más que una cookie suelta. Solo se escribe sobre un umbral.
5. **Verificar solo lo que se va a escribir,** y volver determinista lo repetible: identidad del sitio (dominio del correo contra el del sitio), redirecciones, hosting, plantilla. Ya quedó en el motor para redirecciones, hosting y plantilla; falta la identidad.
6. **Ampliar el lint de borradores:** derivación presente, "propia" si hay captcha, plazo respaldado, sin frases repetidas entre correos. La segunda ronda de lectura casi siempre pidió lo mismo.
7. **Alinear los documentos.** La estrategia §7 y `agente-outbound` dicen "sin pedir reunión"; el plazo "dos o tres días" va en correos ya enviados y no está en `capacidad-servicios.md`; los precios de esa hoja no son los del sitio. Lo hace el troncal.
8. **Infraestructura.** Un proceso en segundo plano muere si la sesión queda inactiva (el lote se detuvo 3 veces); correr en primer plano o programarlo. La sesión de leads tiene 25 commits sin subir: súbelos desde tu Mac antes de que se pierdan.

## 5. Lo que sigue siendo una hipótesis
Que el hallazgo mejore la respuesta, que el chequeo gratis lea los sitios de los correos, y que la medición desde una IP de EE. UU. se parezca a lo que ve un dueño en Chile.

## 6. Reactivación de contactos ya escritos (17-oct-2026)
**Hallazgo del historial en Gmail (lectura de los 134 dominios descartados por "ya contactados"):** no era una reserva dormida. 65 de los 134 recibieron un correo entre el 22-sep y el 15-oct (el Copiloto Verifica y Cumple, con hallazgos de cookies y toque 2 con precio); 69 llevan más de 4 semanas sin recibir nada. De los 134: 132 sin respuesta, 1 negativa, 1 sin clasificar. Sesgo: los que sí respondieron están en el registro o el pipeline y quedaron fuera de esta muestra, así que 98 % de silencio NO es una tasa de respuesta.
**Embudo de la reactivación:** 69 elegibles, 69 medidos, 28 con hallazgo fuerte, 22 elegidos a verificar (se dejaron 12 que solo tienen cookies de Google Analytics, 2 estudios que venden protección de datos y 4 que ya tenían un descarte), 16 confirmados, 5 refutados, 1 no concluyente. 1 retenido por identidad dudosa (propiedadescima.com redirige a inmocimapropiedades.cl) y 1 por cookies que aparecen solo al mover el mouse (gpremium.cl). 15 borradores.
**Qué aprendió el flujo:**
- Verificar F3 (botón de WhatsApp sin código de país) y F9 (enlace legal roto): son hallazgos que un encargado de marketing siente sin traducción. El workflow ahora los cubre y marca `vende_proteccion_datos`.
- 5 de 22 refutados por el verificador (3 por contacto visible que el motor no contó: botón flotante de WhatsApp, teléfono en texto con href "#"; 1 por formulario oculto en un modal; 1 por cookies que aparecen solo con el primer movimiento del mouse). El motor sigue contando mal el teléfono como texto con href "#" y el botón flotante de WhatsApp: **mejora pendiente en `lib/navegador.mjs` (F10/F2)**.
- La revisión independiente de borradores corrigió en 10 de 15: precio sin "desde", paso de verificación con "candado" (Chrome ya no lo muestra), una afirmación de ausencia de aviso donde el HTML sí trae un plugin que no se pinta desde IP de nube, y la coletilla "más concreto".
- Los links largos de Gmail (`google.com/url?q=...`) salieron del uso de `create_draft` con `body`: ver `borradores/html_correo.py`.
**Riesgo conocido:** el Copiloto Verifica y Cumple busca `in:sent` + `verifica.spindlelab.cl` y puede redactar su propio toque 2 sobre los correos del motor.
