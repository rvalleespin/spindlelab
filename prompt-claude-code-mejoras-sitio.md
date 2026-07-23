# Prompt para Claude Code — mejoras editoriales a spindlelab.cl

Contexto: soy dueño de SpindleLab (spindlelab.cl), una agencia de SEO técnico y visibilidad en IA (AEO/GEO) en Chile. Quiero aplicar una serie de cambios de branding editorial al sitio, inspirados en cómo agencias como Animalz, Siege Media, Foundation Marketing, NoGood y SparkToro presentan su contenido. Antes de tocar nada, revisa la estructura del repo (framework, generador de sitio, dónde viven las plantillas de blog, home y la página /metodo/) y dime qué stack es, para adaptar las instrucciones de abajo a los archivos reales.

Páginas involucradas (URLs en producción, puede que los slugs de archivo sean distintos):
- Home: `/` (secciones: hero, "Lo que ven tus clientes" con simulación tipo ChatGPT, "Nuestros servicios", "Nuestro método" con 4 pasos numerados 01–04)
- Listado de blog: `/blog/`
- Plantilla de post individual (ver ejemplos: `/blog/como-aparecer-en-chatgpt/`, `/blog/seo-tecnico-fintechs-chile/`, `/blog/que-es-aeo-geo/`)
- Página de método: `/metodo/`

## Tarea 1 — Renombrar el blog con marca propia

Ahora mismo el nav dice "Blog" y el título de la página es "Blog Técnico". Cambia:
- El texto del link en el nav principal (actualmente "Blog") por: **"El Taller"** (o la variante que prefieras entre estas opciones — usa la primera si no hay preferencia: "El Taller", "Bitácora", "El Cuaderno").
- El H1 de `/blog/` (actualmente "Ideas claras sobre búsqueda e IA") — mantenlo como subtítulo/descripción, pero agrega el nombre de marca como título principal, ej: "El Taller de SpindleLab".
- El `<title>` y meta-description de la página de blog para reflejar el nuevo nombre, conservando las keywords de SEO técnico/AEO/GEO que ya tiene.
- Actualiza cualquier referencia cruzada al blog en el footer ("Blog Técnico" → nombre nuevo).

No cambies las URLs (`/blog/...`) para no romper SEO existente — el cambio es solo de nombre visible, no de slug.

## Tarea 2 — Firma de autor en cada post

Los posts del blog no muestran quién los escribió. Agrega a la plantilla de post individual, justo debajo del título/metadata de fecha-categoría:
- Nombre del autor (por defecto: Ramón, o el nombre que uses en el sitio — pregúntame si no está definido en ningún lado del código).
- Una línea corta de bio/rol (ej: "Fundador de SpindleLab · SEO técnico y GEO").
- Espacio para foto/avatar circular (si no hay imagen disponible todavía, deja el componente listo con un placeholder y avísame para que suba la foto).

Aplica esto a los 3 posts existentes y a la plantilla para que se herede automáticamente en publicaciones futuras.

## Tarea 3 — Nombrar el método de 4 pasos

En `/metodo/` y en la sección "Nuestro método" del home, los pasos están numerados 01–04 sin nombre de marca propio. Envuelve esos 4 pasos bajo un nombre de framework propio. Sugerencia si no tengo otra preferencia: **"Método Señal"** (juega con la idea de "señal" en SEO/IA — que el sitio emita señales claras a buscadores y modelos de lenguaje). Alternativas: "Protocolo SpindleLab", "Ruta GEO".

Cambios concretos:
- Agrega el nombre del framework como encabezado antes de los 4 pasos, tanto en `/metodo/` como en el home.
- Mantén los 4 pasos y su copy actual (Diagnóstico técnico, Estrategia AEO/GEO, Implementación, Monitoreo) — solo envuélvelos bajo el nombre de marca.
- Usa el nombre del framework de forma consistente en cualquier futura pieza de blog o pitch de venta (déjalo como variable/constante reutilizable si el stack lo permite, para no tener que buscar y reemplazar manualmente después).

## Tarea 4 — Reemplazar fotografía genérica de stock

Las imágenes actuales (`equipo-creativo.jpg` en el home, `hero-blog.jpg` en el blog) son fotos de stock de "equipo trabajando/pizarra con ideas" que no comunican nada específico de SEO/GEO. No generes fotos nuevas — en su lugar:
- Reemplaza `equipo-creativo.jpg` por una captura o mockup de la simulación tipo ChatGPT que ya existe en el home (es lo más distintivo que tiene el sitio hoy), ampliada o rediseñada como imagen hero.
- Para `hero-blog.jpg`, evalúa un mockup simple de un dashboard/gráfico de menciones en IA en vez de la foto de pizarra. Si no tienes assets para esto, deja un comentario TODO en el código señalando qué tipo de imagen falta, en vez de dejar la foto de stock actual.

## Tarea 5 — Plantilla visual reutilizable para reportes de datos

Aún no hay contenido de investigación propia publicado, pero prepara el terreno: crea un componente/plantilla de "thumbnail de research" (tarjeta con formato fijo: título corto + cifra destacada + categoría "Research") que se pueda reutilizar cada vez que publique un post con datos propios (ej. futuros benchmarks de visibilidad en IA en Chile). El objetivo es que estas piezas sean visualmente reconocibles como una serie, no posts sueltos.

## Fuera de alcance para Claude Code (decisiones mías, no de código)

No necesito que resuelvas esto ahora, es contexto para que no te distraigas con ello:
- Contenido "de cultura/marca" (piezas que no venden directo, tipo análisis de casos chilenos) — es una decisión editorial futura, no un cambio de sitio.
- Fotografía real del equipo/oficina — la subiré yo cuando la tenga.

## Criterio de aceptación

Al terminar, quiero poder revisar un diff claro de: nav y título del blog renombrados, plantilla de post con firma de autor aplicada a los 3 posts existentes, el método de 4 pasos con nombre de framework en ambas páginas, y el componente de thumbnail de research creado (aunque no tenga contenido real todavía). No cambies URLs ni rompas el SEO existente en el proceso.
