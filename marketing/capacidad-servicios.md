# Capacidad real por servicio — qué se puede ejecutar hoy y qué falta

Auditoría honesta de las acciones que cada servicio promete (tomadas directo de `spindlelab-site/servicios/`), qué de eso es ejecutable hoy con las herramientas disponibles en una sesión de Claude Code, y qué brecha de herramientas/acceso hay que cerrar antes de vender el servicio a escala. Sirve para no prometer en una cotización algo que no se puede entregar consistentemente.

**Convención:** ✅ ejecutable hoy sin nada adicional · ⚠️ ejecutable con limitaciones/manual · ❌ requiere herramienta o acceso que no existe todavía.

---

## 1. Auditoría SEO Técnica

| Acción prometida en el sitio | ¿Es posible hoy? | Detalle |
|---|---|---|
| Rastreo e indexación: robots.txt, sitemap, canonicals | ✅ | `curl` directo, mismo método usado en los hallazgos de outbound (Frente A/B/C) |
| Qué está indexado que no debería / qué quedó fuera | ❌ | Esto es el reporte "Cobertura del índice" de **Google Search Console** — no se puede reconstruir desde afuera con curl. Se necesita que el cliente dé acceso de lectura a su Search Console (gratis, 2 minutos: agregar hola@spindlelab.cl como usuario). |
| Rendimiento y Core Web Vitals | ⚠️ | Se puede aproximar con Chromium headless, pero no da el dato real de campo (CrUX) que usa Google. La **API de PageSpeed Insights** (gratis, solo necesita una API key de Google Cloud) da el dato real y es mucho más rápido que hacerlo a mano cada vez. |
| Arquitectura y enlazado interno, contenido huérfano | ⚠️ | Para sitios chicos-medianos (10-50 páginas, el tamaño típico de los prospectos actuales) se puede armar con un crawler propio en bash/curl siguiendo enlaces recursivamente — no existe todavía como script reusable, pero es construible sin herramienta externa. Para sitios grandes (e-commerce, cientos de páginas) sí haría falta un crawler dedicado (Screaming Frog u otro). |
| Datos estructurados (JSON-LD): qué hay, qué es inválido, qué falta | ✅ | Extracción con curl+grep ya probada constantemente esta sesión. La validación contra el estándar la hago con criterio propio — no es tan autoritativo como el validador oficial de Google, pero es suficiente para el nivel de auditoría prometido. |
| Señales de confianza (E-E-A-T) | ⚠️ | Verificable con curl (contenido propio) + búsqueda web (menciones externas, prensa), pero de forma manual/puntual. Una herramienta de consistencia de citas (BrightLocal, Moz Local) escalaría esto si hay muchos directorios que revisar — no es bloqueante con el volumen actual. |

**Conclusión:** el 80% de la auditoría es ejecutable hoy. La pieza que falta de verdad es **acceso a Search Console del cliente** — sin eso, la sección de indexación (una de las 5 capas prometidas) se queda incompleta. Esto debería pedirse como parte del onboarding de cualquier cliente nuevo, igual que se hizo con spindlelab.cl.

## 2. Visibilidad en IA (AEO/GEO)

| Acción prometida | ¿Es posible hoy? | Detalle |
|---|---|---|
| Línea base de presencia (ejecutar preguntas en ChatGPT/Gemini/Perplexity) | ❌ | **La limitación más real de todo el catálogo de servicios.** Claude no puede consultar esos productos directamente — lo comprobamos con la línea base de menciones IA de SpindleLab: hubo que pedírtelo a ti. Para un cliente esto significa que Ramón (o el cliente mismo) tiene que ejecutar manualmente las preguntas cada vez. No escala más allá de 1-2 clientes en acompañamiento mensual sin resolver esto. |
| Claridad de entidad (sitio + datos estructurados + directorios) | ⚠️ | Igual que E-E-A-T arriba — verificable pero manual. |
| Contenido citable (reescribir páginas para responder preguntas) | ✅ | Es redacción/edición de contenido — lo mismo que ya hago con artículos del blog. Sin brecha. |
| Acceso y medición (robots.txt para bots de IA + protocolo repetible) | ✅ | El robots.txt se edita directo. El "protocolo de medición repetible" ya existe: es literalmente `metricas/test-menciones-ia.md`, reutilizable para cualquier cliente. |

**Conclusión:** la promesa central del servicio (línea base + monitoreo en motores de IA) depende de un paso manual que no escala. Opciones reales para cerrar la brecha:
- Seguir manual mientras la capacidad sea 1-2 clientes (funciona, pero es el techo de crecimiento de este servicio específico).
- Contratar acceso a una herramienta de "share of voice en IA" — existen productos especializados en esto (mencionados por la competencia detectada en la línea base: Futture usa "medición del share of model en LLMs"). Tiene costo mensual, a evaluar cuando haya 2+ clientes de Acompañamiento simultáneos.
- La API de Perplexity (Sonar) sí devuelve citas web reales y es consultable programáticamente — cubre uno de los tres motores sin depender de un humano. ChatGPT y Gemini no tienen un equivalente consumer-facing accesible por API de la misma forma.

## 3. Acompañamiento Mensual

| Acción prometida | ¿Es posible hoy? | Detalle |
|---|---|---|
| Implementación priorizada (arreglar lo técnico) | ❌ | Brecha operativa, no de herramienta: **no hay definido cómo SpindleLab obtiene acceso al sitio de un cliente** para implementar cambios (a diferencia de Desarrollo Web, donde el sitio se construye desde cero y SpindleLab controla el repo). Falta decidir el modelo: ¿acceso directo (CMS/repo del cliente) o SpindleLab entrega tickets priorizados y el equipo del cliente los implementa? |
| Contenido optimizado para búsqueda e IA | ✅ | Redacción — sin brecha. |
| Monitoreo doble (posiciones + presencia en IA), quincenal | ❌ | Posiciones de Google: no se puede scrapear de forma confiable ni segura (Google bloquea scraping masivo de resultados). El dato real está en el reporte "Rendimiento" de Search Console — misma dependencia de acceso que en la Auditoría. Presencia en IA: misma limitación humana del punto anterior, ahora repetida cada 15 días en vez de una vez. |
| Informe quincenal | ✅ | Redacción/formato — sin brecha, una vez que los datos de arriba existen. |
| Reunión mensual (45 min) | — | 100% humano, no aplica automatización. |

**Conclusión:** este es el servicio con más brechas reales, y es justo el que la estrategia prioriza económicamente (retainer por sobre auditorías one-shot). Antes de vender el primer Acompañamiento Mensual, conviene resolver dos cosas: (1) pedir acceso a Search Console del cliente como paso de onboarding estándar, (2) decidir el modelo de implementación técnica (acceso directo vs. tickets). **Ambas resueltas en `onboarding-cliente.md`.**

---

## Resumen — qué conviene resolver, en orden de prioridad

1. ✅ **Search Console del cliente como paso de onboarding obligatorio** — resuelto en `onboarding-cliente.md` §2, junto con el resto de los accesos por servicio.
2. **API key de PageSpeed Insights** (gratis, Google Cloud) — mejora la velocidad y consistencia de la sección de Core Web Vitals. No bloqueante, pero barato de resolver. Pendiente.
3. ✅ **Modelo de implementación técnica** para Acompañamiento Mensual — resuelto en `onboarding-cliente.md` §1 (acceso directo si SpindleLab construyó el sitio, acceso CMS acotado si es externo, tickets para lo que exceda el CMS).
4. **Crawler propio reusable** (bash/curl) para arquitectura/enlazado interno — construible sin costo externo, queda pendiente como un Skill más (mismo patrón que `/mini-diagnostico`).
5. **Herramienta de share-of-voice en IA** — solo se justifica con 2+ clientes de Acompañamiento simultáneos corriendo el monitoreo quincenal; hasta entonces, manual funciona.
