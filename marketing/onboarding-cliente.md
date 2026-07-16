# Onboarding de cliente — accesos y modelo de implementación

Resuelve las dos brechas marcadas en `capacidad-servicios.md` (§1 y §3): qué se pide al cerrar un cliente, y cómo se implementan los cambios técnicos según el servicio contratado. Es el paso que falta entre "cotización aprobada" y "primer entregable" — se ejecuta una vez por cliente, al inicio.

---

## 1. Modelo de implementación técnica — la decisión de fondo

No es una sola respuesta para todos los servicios. Se define por dónde vive el sitio y qué se contrató:

| Situación | Modelo | Por qué |
|---|---|---|
| Cliente de **Desarrollo Web** que luego contrata Acompañamiento | **Acceso directo total** — SpindleLab ya tiene el repo/hosting porque construyó el sitio | No hay fricción: es el mismo flujo de trabajo que ya se usa para spindlelab.cl |
| Cliente externo (sitio ya existente, no construido por SpindleLab) — **Auditoría o Acompañamiento** | **Acceso CMS, no acceso a servidor** — usuario con rol admin (o rol acotado a SEO si la plataforma lo permite) en WordPress/Shopify/Wix/etc. | Cubre el 80% de lo que hay que tocar (contenido, meta tags, schema vía plugin, robots.txt) sin pedir algo tan sensible como acceso al servidor o al repositorio de un tercero |
| Cambios que exceden el CMS (config de servidor, redirects a nivel de hosting, código custom) | **Modelo de tickets** — SpindleLab entrega la instrucción exacta y priorizada; el equipo técnico o webmaster del cliente la implementa | Es lo que ya dice la página del servicio: "Directamente o con tu equipo" — formaliza esa frase en un proceso real |
| Cliente sin ningún equipo técnico propio y sin ánimo de dar acceso CMS | **Ticket detallado igual, entregado en lenguaje simple** — se pierde velocidad pero no se bloquea el servicio | Última opción, no la primera — ofrecerla solo si las dos anteriores no aplican |

**Regla práctica de venta:** en la llamada de cierre, preguntar directo "¿tienen alguien que les mantenga el sitio, o lo tocamos nosotros?" — la respuesta define el modelo antes de firmar, no después.

## 2. Checklist de accesos — al cerrar, antes del primer entregable

Pedir **todo lo que aplique según el servicio contratado**, en un solo correo (no ir goteando pedidos — genera fricción y desconfianza):

| Acceso | Para qué sirve | Cómo se pide | Aplica a |
|---|---|---|---|
| **Google Search Console** (usuario "Lectura" o "Completo") | Datos reales de indexación y posiciones — la brecha #1 de `capacidad-servicios.md` | Cliente entra a Search Console → Configuración → Usuarios y permisos → Agregar usuario → `hola@spindlelab.cl` | Auditoría, Acompañamiento |
| **Acceso CMS** (admin o rol SEO acotado) | Implementar cambios directamente si el modelo lo permite (ver §1) | Cliente crea un usuario nuevo en su WordPress/Shopify/etc. — nunca pedir la contraseña del usuario principal | Acompañamiento (si el modelo es acceso directo) |
| **Google Analytics / GA4** (si existe) | Cruzar tráfico real con los cambios implementados | Mismo mecanismo que Search Console: agregar como usuario, no compartir login | Acompañamiento, opcional en Auditoría |
| **Google Business Profile** (solo negocios con ubicación física — clínicas, ópticas, oficinas) | Señales locales, parte de E-E-A-T y de la sección "claridad de entidad" de Visibilidad en IA | Cliente agrega a `hola@spindlelab.cl` como Gerente en Google Business Profile | Cualquier servicio con componente local |
| **Nombre y contacto del equipo técnico/webmaster**, si existe | Define a quién van los tickets cuando el cambio excede el CMS | Se pregunta directo en la llamada de cierre | Cuando el modelo es tickets |

## 3. Seguridad — regla que no se negocia

**Nunca se guarda una contraseña compartida en este repositorio, en el chat, ni en ningún documento de texto plano.** Todos los accesos de la tabla anterior se piden como **usuario con rol propio** (Search Console, GA4, Google Business Profile y la mayoría de los CMS modernos lo permiten sin pedir contraseña) — exactamente el mismo mecanismo que ya se usó para dar acceso a Search Console de spindlelab.cl. Si una plataforma específica no soporta usuarios con rol y obliga a compartir una contraseña única, esa contraseña se maneja fuera de este repo (gestor de contraseñas), nunca committeada.

## 4. Registro — dónde queda anotado

Cuando se completan los accesos de un cliente, anotar en `ventas/pipeline.md` (columna Notas) qué se pidió y qué se recibió, para no tener que volver a preguntar en la siguiente fase del proyecto.

---

## Resumen para la llamada de cierre (lo que hay que decir)

1. "Antes de partir necesito 3 cosas: acceso de lectura a tu Search Console, [acceso CMS si aplica], y saber si tienen alguien que les mantenga el sitio o lo tocamos nosotros."
2. "Todo se pide como usuario con permiso, nunca como contraseña compartida — te mando el paso a paso de cada uno en el mismo correo de bienvenida."
3. "Si algún cambio queda fuera de lo que el CMS permite, te lo entrego como ticket priorizado para tu equipo — no se pierde nada, solo cambia quién aprieta el botón."
