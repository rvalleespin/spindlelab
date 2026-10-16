# E12 · Lo que mandó Ramón el 16-oct-2026 (textual)

Cambio de dirección del sitio, entre las 13:50 y las 14:00 (Chile). Va copiado tal cual, sin
corregir: es el insumo de la obra, no su texto final. Lo que se toma, lo que se ajusta y por
qué lo deciden el brief de Mauro y el lock de Lucía.

## 1. «hay un tema que quiero hacer. cambio de dirección»

## 2. El brief que pegó

> # SPINDLELAB — ARCHITECTURE & DESIGN SYSTEM BRIEF
>
> ## 1. POSICIONAMIENTO Y DIRECCIÓN DE ARTE
> - **Identidad:** Spindlelab — Estudio de Diseño & Tecnología / Laboratorio Digital.
> - **Tono Visual:** Escuela Británica de Vanguardia (Referente directo: Koto Studio + Accept & Proceed).
> - **Filosofía:** "Form & Intelligence" (Alta costura visual frontend + arquitectura de software e IA propietaria).
> - **Atmósfera:** Light Mode Editorial, rigor de plano arquitectónico/industrial, microinteracciones táctiles, cero clichés de IA genérica (sin redes neuronales dibujadas ni gradientes púrpura).
>
> ## 2. DESIGN TOKENS (TAILWIND CSS CONFIG)
> - **Background Base:** `#F6F6F4` (Lino/Papel mineral claro).
> - **Surface / Cards:** `#EFEFEA` y `#FFFFFF`.
> - **Texto Principal:** `#111111` (Carbón profundo, no `#000000` puro).
> - **Texto Secundario / Labels:** `#666663`.
> - **Bordes y Guías:** `rgba(17, 17, 17, 0.08)` (Líneas de 1px tipo retícula técnica).
> - **Acento Funcional (Signal Color):** `#0029FF` (Azul Cobalto de alta precisión) o `#0B25B7`. Úsalo únicamente para estados activos, cursores magnéticos y telemetría de código vivo.
> - **Tipografía Display:** Sans-Serif geométrica con proporciones anchas y gran escala (ej. `PP Neue Montreal`, `Söhne`, o en Google Fonts: `Space Grotesk` / `Plus Jakarta Sans` en peso Bold/Extrabold con tracking ajustado).
> - **Tipografía Mono (Telemetría / Lab):** `Geist Mono` o `JetBrains Mono` para metadatos, tags y números de versión.
>
> ## 3. LAYOUT & UX PATTERNS (NO CONVENCIONALES)
> 1. **Retícula Asimétrica / Bento Brutalista:**
>    - Evitar bloques apilados tradicionales. Utilizar grillas modulares con bordes visibles de 1px donde convivan bloques gigantes de video/render con cajas compactas de datos.
> 2. **Hero de Declaración Tipográfica:**
>    - Titular a escala monumental pegado a los márgenes del viewport.
>    - Párrafo técnico en fuente monoespaciada estructurado como ficha técnica de laboratorio (`[ LAB_STATUS: ACTIVE ]`, `[ DEPLOYMENT_CYCLE: 2026 ]`).
> 3. **Mecánica Dual: "Craft" vs "Logic":**
>    - Incorporar módulos donde se muestre el frontend interactivo junto con el pipeline técnico (diagrama de flujo de datos, latencia de modelos o llamadas a API simuladas).
> 4. **Casos de Estudio con Foco en ROI:**
>    - Estructura: Hipótesis de Negocio -> Solución Técnica -> Métrica Clave C-Level (+X% Eficiencia) -> Showcase Interactivo.
>
> ## 4. STACK RECOMENDADO PARA CLAUDE CODE
> - Framework: Next.js (App Router) + TypeScript.
> - Estilos: Tailwind CSS.
> - Animación & Físicas: Framer Motion (con configuraciones tipo `spring`, evitando `ease-in-out` estándar para lograr sensación de inercia y masa).
> - Iconografía: Minimalista, vectorial, de 1.5px stroke (Lucide Icons o SVG a medida).

## 3. «https://koto.com/ referencia»

## 4. Sus respuestas a las cuatro preguntas (16-oct, ~13:58)

| Pregunta | Respuesta |
|---|---|
| Posicionamiento: ¿qué pasa con SEO técnico y visibilidad en IA? | **Estudio que también hace SEO e IA.** El marco es el estudio de diseño y tecnología; SEO técnico, visibilidad en IA y el chequeo quedan como servicios y como la parte «Logic» que se puede comprobar. Precios y oferta siguen. |
| Stack | **Astro + Tailwind + Motion.** Se conserva lo construido (chequeo, formularios, verificación, deploy en Cloudflare); Motion da los mismos resortes que Framer Motion. |
| Casos con métrica C-Level | **Solo lo medido.** Hipótesis, solución y lo que de verdad se midió; donde no hay métrica, no se pone. |
| Cosas del brief que hoy son clichés de sitios hechos con IA (Space Grotesk, bento, etiquetas «[ LAB_STATUS: ACTIVE ]») | **Koto manda, el brief orienta.** Se mide koto.com y Accept & Proceed; se mantiene la intención del brief y se reemplaza lo que huela a plantilla, diciendo por qué. |

## 5. El segundo texto que pegó («elección de posicionamiento»)

> Esta elección de posicionamiento es perfecta. Definirse como un "Laboratorio Digital / Estudio de Diseño y Tecnología" te aleja inmediatamente del mar de "agencias de marketing" tradicionales y te coloca en la mesa de los consultores de alto nivel y creadores de producto.
> Un laboratorio experimenta, crea desde cero (no usa plantillas) y une el método científico (tecnología/IA) con la sensibilidad artística (diseño). Si a esto le inyectamos la actitud y el estilo editorial de Koto, el resultado es explosivo.
> Aquí te detallo cómo aterrizar este concepto de "Laboratorio Digital estilo Koto" en decisiones exactas de diseño y UX para que el cliente pueda empezar a visualizar (y programar) su propia web:
>
> 1. El "Hero" (Primer Impacto): Una Declaración, no un Saludo
> La escuela británica no dice "Bienvenidos a nuestra agencia". Hacen afirmaciones audaces con tipografía gigante.
>
> * La visual: Fondo color hueso/lino (`#F6F6F4`). Un bloque tipográfico masivo que ocupe casi toda la pantalla. Letras grotescas (sans-serif de proporciones anchas) en color grafito o tinta.
> * El Copy (Texto):
> (En tipografía gigante y contundente) DISEÑAMOS EXPERIENCIAS. PROGRAMAMOS INTELIGENCIA. (En un párrafo pequeño y monoespaciado, tipo etiqueta de laboratorio) `[ LAB_01 ] — Un estudio de diseño y tecnología construyendo infraestructura digital a medida para líderes con visión.`
>
> 2. El Portafolio como un "Archivo de Laboratorio" (Index)
> En lugar de la clásica cuadrícula de imágenes estáticas llamada "Nuestros Trabajos", el trabajo de un laboratorio se presenta como un Índice de Experimentos y Despliegues.
>
> * La visual: Un Bento Grid asimétrico. Algunas cajas tienen fotos de alta calidad de los sitios web diseñados. Otras cajas son puramente tipográficas con datos duros.
> * El detalle "Koto": Cuando pasas el mouse (Hover) sobre un proyecto, el cursor no cambia a una manito genérica. Cambia a un círculo de color vibrante (ej. Naranja neón o Azul eléctrico) que dice "Ver Despliegue" o "Analizar Caso".
> * El detalle "Tech": Al lado de cada proyecto, pon etiquetas de "ingredientes" técnicos (ej. `[React]`, `[Modelos RAG]`, `[WebGL]`, `[Estrategia C-Level]`). Esto le grita al CTO que entienden de qué están hablando.
>
> 3. "Sandboxes" (Cajas de Arena Interactivas) en el Medio del Sitio
> Un laboratorio tiene que demostrar lo que hace, no solo contarlo. Para convencer al C-Level de que programan desde cero (y no usan plantillas), el sitio debe incluir microinterfaces con las que se pueda jugar.
>
> * Idea de implementación: En la sección donde explican que hacen "Despliegue de modelos IA y Software a medida", coloca un pequeño módulo interactivo. Puede ser un simple botón que diga "Ejecutar optimización" y, al hacerle clic, el bloque de texto de al lado se reescribe frente a los ojos del usuario, o los colores de la pantalla cambian de Light Mode a Wireframe (esqueleto del sitio). Es un "truco" de programación simple (Frontend), pero el efecto Wow intelectual es gigante.
>
> 4. La Estética de los "Planos" (Blueprints)
> Para materializar el concepto de "Laboratorio y Tecnología" sin perder la elegancia de Koto, usa recursos gráficos tomados de la ingeniería civil y el diseño industrial:
>
> * Líneas de corte y registro: Usa líneas de 1px muy sutiles para dividir secciones, cruzándose en las esquinas como si fueran marcas de impresión o de un plano de arquitectura.
> * Telemetría visual: Coloca pequeños números o coordenadas en las esquinas de los contenedores de la web (ej. `LAT. 33.44° S | SYS. ACTIVO | VOL. 04`). No significan nada crítico, pero aportan esa estética de "interfaz de alta precisión" que fascina a los perfiles corporativos.
>
> 5. Casos de Estudio enfocados en el "Problema / Hipótesis / Solución"
> Ya que son un laboratorio, la narrativa de los proyectos debe seguir un método.
>
> * En lugar de solo mostrar pantallas bonitas, divide el caso así:
>    1. El Problema (Tipografía gigante): "El cliente perdía el 40% de sus leads por una web estática."
>    2. La Hipótesis del Laboratorio: "Integrar un RAG de IA con un diseño UI sin fricción."
>    3. El Resultado (Data): "+150% de retención de usuarios."
>    4. El Craft (Visual): Ahora sí, despliega los videos fluidos de cómo quedó el sitio web, las microinteracciones perfectas y el código limpio.

## 6. Lo que esto deja en pausa
- **E10** (The Ready, «Taller» y «Pizarra limpia»): queda como historia. Su tablero
  (https://claude.ai/artifact/1cbk3JGS4vRR8xvqh4SFB9) no se borra.
- **El encargo de fotos con IA de E10** (`marketing/encargos-otras-sesiones/encargo-e10-fotos-ia.md`):
  en pausa, para que nadie gaste en fotos de una dirección que ya no corre.
- **E11** (texto): se detuvo antes de escribir las direcciones. Siguen sirviendo el diagnóstico
  de lo que el texto daba por sabido (`e11/diagnostico-texto.md`), el material real
  (`e11/material.md`) y, en lo que no dependa del posicionamiento viejo, el brief de texto
  (`e11/brief-texto.md`).
