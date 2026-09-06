# Brief → Chequeo v2: lo que vale la pena adoptar de "Citable" (análisis 4-sep)

**De:** coordinación (pedido de Ramón: analizar app10.reto.icebergmarketingdigital.com)
**Qué es:** "Citable", auditoría de visibilidad en IA (España, nacida de un reto de Iceberg
Marketing Digital). Primo directo de nuestro /diagnostico, con la misma filosofía (sin
registro, honesto, pedagógico). No compite en Chile hoy, pero valida la categoría y ejecuta
varias cosas MEJOR que nosotros.

## Las 5 ideas robables, por orden de impacto

### 1. ⭐ DOS TIPOS DE ROBOTS (búsqueda-en-vivo vs entrenamiento) — corrección técnica a nuestro motor
Su distinción es CORRECTA y nuestro chequeo hoy la ignora:
- **Búsqueda en vivo** (deciden si te citan HOY): OAI-SearchBot, ChatGPT-User,
  Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot, Bingbot.
- **Entrenamiento** (deciden si los modelos futuros te conocen; bloquearlos NO quita citas
  hoy y es decisión legítima de PI): GPTBot, ClaudeBot, Google-Extended, CCBot,
  Applebot-Extended, Bytespider, meta-externalagent.
**Nuestro motor chequea GPTBot/ClaudeBot/PerplexityBot/Google-Extended con peso parejo**:
3 de 4 son de entrenamiento, y nos faltan los agentes en vivo. Su frase nos retrata:
"la mayoría de herramientas alerta de los segundos e ignora los primeros".
**Cambio:** re-categorizar los checks de acceso (los en-vivo pesan, los de entrenamiento
informan sin castigar el puntaje) + sumar los agentes en vivo que faltan.

### 2. ⭐ PRUEBA DE SUPLANTACIÓN DE USER-AGENT (la que nos faltaba contra Cloudflare)
Piden la página presentándose como CADA robot y comparan contra un navegador normal:
un 403 al UA-bot = el servidor/CDN filtra por nombre (el toggle "Bloquear bots de IA" de
Cloudflare), aunque el robots.txt esté impecable. Con caveat honesto: "no podemos descartar
filtros por IP de origen". **Detecta exactamente el caso legalprisma que nosotros solo
pudimos caveatear.** Cambio: agregar la ronda de fetches con UAs de bots al motor + tabla
"qué recibió cada robot" en el resultado.

### 3. "Lo que una IA diría de ti ahora mismo" — el gancho emocional
Respuesta generada usando SOLO tu página. Es el elemento más compartible del informe.
Requiere llamada a LLM por corrida (costo) → FASE 2 (Workers AI o API con tope diario).
También: "para qué preguntas servirías / para cuáles NO" (la lista de huecos ES nuestro
pitch de venta hecho producto).

### 4. INFORME DE EJEMPLO COMPLETO en la landing (empresa ficticia)
Ves el resultado entero ANTES de pegar tu URL. Fricción mínima. Para nosotros: una empresa
chilena ficticia (constructora o clínica) con el informe completo renderizado en
/diagnostico. Solo página, cero motor. QUICK WIN.

### 5. Detalles menores que suman
"N palabras legibles sin JavaScript" como dato concreto · check de fecha de actualización
visible · informe imprimible/compartible (CSS de impresión + URL del resultado) · citas
textuales verificadas contra el HTML antes de mostrarse (disciplina anti-alucinación).

## ⚠️ ALERTA para nuestro propio material (revisar con calma, no en pánico)
Nuestra narrativa de outbound y piezas dice "bloqueas GPTBot ⇒ invisible en ChatGPT HOY".
Con la distinción correcta, GPTBot/ClaudeBot/Google-Extended son de ENTRENAMIENTO: su
bloqueo no borra citas hoy (los que sí: OAI-SearchBot/ChatGPT-User/etc.). Dónde nos toca:
- El informe a Legal Prisma citó bloqueos de bots de entrenamiento como causa de invisibilidad
  actual (el edge-blocking de Cloudflare que también encontramos SÍ afecta a los en-vivo, así
  que la conclusión de fondo se sostiene, pero la precisión importa).
- La lámina 4 del carrusel y el copy del robots.txt: revisar el matiz en piezas FUTURAS.
- La ficha de Valen y la guía del mini-diagnóstico: actualizar la jerarquía de acceso con
  la distinción en-vivo/entrenamiento.

## Secuencia recomendada (decide Ramón)
1. **Semana del 8:** motor v2 (ideas 1+2, aditivas, con tests) + informe de ejemplo en la
   landing (4) + print CSS (5). Lo hace la coordinación con el molde de Diego, verificado
   contra dominios reales antes de deploy.
2. **Fase 2 (post-Fiestas / octubre):** las secciones con IA (3) con tope de costo.
3. La revisión de narrativa (⚠️) va junto al punto 1: mismo vocabulario en motor, piezas
   y ficha de Valen.

**Estado:** ⬜ esperando OK de Ramón para la secuencia · creado 4-sep por la coordinación
