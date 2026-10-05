# Ficha de competidor — Agencia Bull

**Verificada el 27-sep-2026** con peticiones directas y navegador real. Cada afirmación es
comprobable; nada viene de su material de venta salvo donde se dice.

- **Dominio principal:** `agenciabull.cl` · versión internacional `agencia-bull.com`, más
  `.com.mx`, `.es`, `.pe` con hreflang por país.
- **Qué es:** agencia full service independiente (no pertenece a un holding). **8 años**,
  oficinas declaradas en **Santiago · Lima · Miami · Madrid**. Eslogan: *«Be Bold, Be Bull»*.
- **Qué vende:** desarrollo web, branding e identidad (metodología de los 12 arquetipos
  junguianos), y marketing digital (Google Ads, Meta Ads, SEO).
- **Precios declarados en su propio `llms.txt`:** desde **USD 2.000** para landings y
  corporativos básicos; **USD 4.000 a 12.000** para sitios completos y e-commerce. Al cambio,
  aproximadamente **$1,9 M a $11,4 M CLP**.
- **Clientes que declaran por nombre:** Coca Cola Andina, Pizza Hut, Cruz Verde, JUNJI, Chile
  Transparente, Copec Emoac, ICB Food Service, Volta.

## Dónde chocan con SpindleLab
**En desarrollo web y marketing digital, de frente.** Si SpindleLab mueve su puerta de entrada a
Desarrollo Web, este es el competidor que enfrenta: 8 años de historia, marcas reconocibles y
ticket en dólares, contra dos clientes cerrados y precios entre $390.000 y $1.190.000 CLP.

**En visibilidad en IA (AEO/GEO), no están.** No lo mencionan como servicio en ninguna parte.

## Lo que hacen mejor, y conviene copiarles el movimiento
1. **Tres herramientas gratuitas como gancho**, no una: una auditoría web automatizada, un
   playbook de 20 capítulos (con registro, o sea captura de leads) y un quiz de arquetipo de
   marca. Es la misma estrategia del chequeo de SpindleLab, con más superficie.
2. **Prueba social de primer nivel**, con marcas que cualquiera reconoce.
3. **Un `llms.txt` bien escrito**, con descripción, servicios, clientes, precios y FAQ. Mejor
   redactado que el propio contenido de su sitio.

## Sus debilidades, verificadas una por una
| Hallazgo | Evidencia |
|---|---|
| **El sitio entero renderiza 52 palabras**, y sin JavaScript solo 12 | medido en navegador real y con `curl` |
| **Cero datos estructurados** (ni un JSON-LD en toda la home) | búsqueda directa en el HTML |
| **`sitemap.xml` está roto:** devuelve HTML en vez de XML | `curl` a `/sitemap.xml` |
| **Las tres URLs que su propio `llms.txt` promete dan 404** (`/auditoria`, `/indice`, `/web`) | verificado sobre `agenciabull.cl` |
| **46/100** en el chequeo público de SpindleLab | `spindlelab.cl/api/chequeo` |

**La ironía aprovechable:** tienen `llms.txt` —o sea, saben que los motores de IA importan— pero
su sitio no le da nada que leer a una máquina, y el archivo que sí escribieron manda a las IA a
tres páginas que no existen. **Le están diciendo a ChatGPT que recomiende URLs rotas.**

## La lectura estratégica (lo que esto significa para decidir)
1. **Su auditoría gratuita mide lo viejo.** Corre sobre PageSpeed Insights: velocidad, Core Web
   Vitals, SEO on-page, con una lectura generada por IA encima. **No mide si los motores de IA
   pueden leer el sitio.** Ese hueco sigue vacío y es exactamente donde vive el chequeo propio.
2. **Refuerza el argumento contra pivotar a «Desarrollo Web» a secas.** En ese terreno Bull gana
   por historia, por clientes y por presencia internacional. Lo único donde SpindleLab tiene
   ventaja defendible es el AEO. **El pivote solo se sostiene si el AEO va adelante como el
   diferenciador, no escondido como una característica más.**
3. **Son un caso de estudio perfecto para el argumento de venta** — pero **no se nombran en
   piezas públicas** (regla de marca: nada de competidores con nombre). El patrón sí se puede
   contar en abstracto: *«una agencia chilena con ocho años y clientes grandes tiene un sitio que
   entrega 52 palabras a un robot»*.

---
**Estado:** ficha inicial. Si se profundiza (su auditoría gratuita por dentro, su blog, su
posicionamiento en búsquedas), el rol que corresponde es Marco (`agente-inteligencia-mercado`).
