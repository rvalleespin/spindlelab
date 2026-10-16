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
- **Funcionó, y es lo mejor que salió:** la verificación independiente. De 33 hallazgos "fuertes", 5 no se sostenían y 3 cambiaban de frase. Sin ella, 1 de cada 6 correos afirmaba algo falso.
- **Funcionó:** la lectura independiente de borradores. Encontró 3 correos a estudios que venden lo mismo que nosotros y frases que afirmaban más de lo medido.
- **No funcionó:** el orden. Los descartes baratos (competidor, "fuera de perfil", correo ya contactado, hosting) se aplicaron DESPUÉS de medir y verificar. Se gastaron ~66 revisiones y ~55 minutos en 6 sitios que no debían escribirse.
- **No funcionó:** el catálogo distingue poco. 38 de 94 salieron con "cookies" o "formulario sin política", y casi todos sirven la misma oferta. Un hallazgo chico (una cookie) no da una razón para contestar.
- **Riesgo estructural:** 6 de 11 destinatarios son catch-all, 4 son correos genéricos o cargos que no deciden, y 10 de los 11 primeros candidatos eran abogados, un rubro que en parte vende lo mismo.

## 4. Mejoras, en orden de impacto sobre la respuesta
1. **Medir la respuesta.** Hasta hoy ~5 % (7 de 142). Sin una columna `oferta`, `ola` y `variante` en el registro de envíos no se sabe qué hallazgo convierte. Prueba A/B mínima: 15 correos con este método contra 15 con el anterior.
2. **Filtrar antes de medir.** Un solo script de preparación que aplique todos los descartes baratos y el cruce con Gmail por correo exacto (el cruce por dominio falló en 4 de 28). Ahorra más de la mitad del tiempo de medición.
3. **Subir la calidad del destinatario.** Pedir al buscador de leads un decisor con nombre (no `contacto@`, `info@` ni un cargo de pasante) y marcar el catch-all desde el origen. Cambiar de rubro: abogados es el más difícil (6 de 10 venden protección de datos).
4. **Ordenar por consecuencia, no por tipo.** Un puntaje interno (nunca en el correo): formulario que pide teléfono y no explica qué hace con él, cookies de publicidad más grabación de sesión, y contacto escondido pesan más que una cookie suelta. Solo se escribe sobre un umbral.
5. **Verificar solo lo que se va a escribir,** y volver determinista lo repetible: identidad del sitio (dominio del correo contra el del sitio), redirecciones, hosting, plantilla. Ya quedó en el motor para redirecciones, hosting y plantilla; falta la identidad.
6. **Ampliar el lint de borradores:** derivación presente, "propia" si hay captcha, plazo respaldado, sin frases repetidas entre correos. La segunda ronda de lectura casi siempre pidió lo mismo.
7. **Alinear los documentos.** La estrategia §7 y `agente-outbound` dicen "sin pedir reunión"; el plazo "dos o tres días" va en correos ya enviados y no está en `capacidad-servicios.md`; los precios de esa hoja no son los del sitio. Lo hace el troncal.
8. **Infraestructura.** Un proceso en segundo plano muere si la sesión queda inactiva (el lote se detuvo 3 veces); correr en primer plano o programarlo. La sesión de leads tiene 25 commits sin subir: súbelos desde tu Mac antes de que se pierdan.

## 5. Lo que sigue siendo una hipótesis
Que el hallazgo mejore la respuesta, que el chequeo gratis lea los sitios de los correos, y que la medición desde una IP de EE. UU. se parezca a lo que ve un dueño en Chile.
