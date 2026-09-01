# Coordinación — cierre del 31-ago (víspera del lanzamiento)

**De:** sesión coordinadora del relanzamiento · **Para:** todas las sesiones de la campaña + Tomás (troncal)
**Regla de siempre:** nada de lo afirmado acá se acepta sin verificar — cada punto trae su evidencia
(commit, archivo o hilo de Gmail).

## Estado por sesión (verificado contra diffs, no contra resúmenes)

| Sesión | Entrega | Estado | Evidencia |
|---|---|---|---|
| Renata (copy campaña) | Anuncio + ancla + posts 8/9-sep + blogs #1-#2 | ✅ mergeado a `main` | `bc231a0` |
| Bruno (visual) | 6 piezas re-render + 3 versiones del anuncio + carrusel + stories | ✅ mergeado | `c27498c` |
| Cata (social) | Copys Ventana 1 + estándar de 1eros comentarios | ✅ mergeado | `c7a77ac` |
| Renata (marca personal Ramón) | Kit de perfil + banco 10 posts | ✅ mergeado | `8bb0612` |
| Dereck (leads) | 70 leads limpios dedupeados (38 inmob + 32 contad) | ✅ **rescatados a `main` por la coordinación** (estaban solo en el worktree gitignoreado) | `git log -- ventas/contactos-google-maps-*.csv` |
| **Emilia (outbound)** | Lote 1 (secuencias) | ⬜ **ÚNICA ENTREGA PENDIENTE** | su encargo, con insumos nuevos |
| Tomás (troncal) | Cierre plan operativo + checkpoint día 60 (4-sep) | ⬜ pendiente | `relanzamiento-motor-y-cierre-plan-operativo.md` |

## Lo que hizo la coordinación hoy (31-ago, tarde)

1. **Corridas del chequeo: HECHAS.** 69/70 dominios de Dereck corridos por `GET /api/chequeo`
   (38 inmobiliarias + 31 contadores; 1 falló). Agregados en
   `marketing/metricas/corridas-chequeo-2026-08-31.md`, crudos en los `.jsonl`. **Esto destraba el
   Plan A del post del mié 9-sep** (aviso de Renata: resuelto) **y regala el gancho de los lotes de
   Emilia** (puntaje real por prospecto, sin re-correr).
2. **Bug del Copiloto outbound: verificado en Gmail y parchado.** Los 3 follow-ups del 28-ago con
   destinatario `hola@spindlelab.cl` son reales (hilos a la vista en enviados); la regla de
   DESTINATARIO explícito quedó en el prompt de la rutina (actualizada 31-ago ~20:45 Chile, corre
   mañana 09:30). Los 3 correos recuperados **ya salieron** a sus destinatarios reales hoy 09:51.
3. **Informe a Legal Prisma: ENVIADO por Ramón** hoy 15:25 con el PDF v3 adjunto (hilo
   `1a058ca9ec0a300e`). REGISTRO actualizado (toques=3, gestión: proponer llamada de 20 min).
4. **REGISTRO al día**: filas de aylwinestudio, provostematamala, ndiabogados (toque 2 real del
   31-ago) y legalprisma corregidas con lo verificado en Gmail.

## Dependencias que cambian para cada rol

- **Cata:** tu pendiente "pase de tono de lo de Renata" quedó DESBLOQUEADO (Renata mergeó).
  Anuncio (mar 1) y ancla (mié 2) van al pase de Ramón sin tu pase si no alcanzas: su edición
  humana cubre. Prioriza el del mar 8 y el post del 9 (Entrega 2, jue 3).
- **Renata:** post del mié 9-sep → Plan A viable con los agregados de
  `marketing/metricas/corridas-chequeo-2026-08-31.md` (mira el conteo de FAQ: 67 de 69 sitios).
- **Emilia:** abre tu encargo — tiene sección "Insumos nuevos" con todo listo (leads + corridas +
  caveat Cloudflare). Entregar lote 1 = lo único que falta para el Pase.
- **Tomás:** para el checkpoint día 60 (4-sep) suma estos hechos de hoy: campaña 100% producida y
  mergeada, 70 leads nuevos, corridas hechas, informe 006 entregado al prospecto activo, bug de
  rutina parchado. Los 6 respondedores de agosto siguen sin cargar al pipeline (Raquel).

## Decisiones que esperan a Ramón (su Pase 1+2)

1. ~~Visual del anuncio del mar 1~~ **RESUELTA (Ramón, 31-ago noche): sale la v2-motor.**
   Razón: en etapa inicial los precios no se queman en imágenes de redes; viven en el sitio,
   junto a su plan. La v1-cartera queda en reserva (no se publica). Regla canonizada en el
   brief de comunicación v2 (addendum 31-ago).
2. Ratificar etiqueta de serie "Chequea tu sitio · Septiembre" (ya producida así).
3. Cambiar el link de la bio de `@spindle.lab` a `spindlelab.cl/diagnostico` (hallazgo de Cata:
   IG no tiene links clicables en captions/comentarios).
4. R8: video a cámara (opcional, no bloquea).
5. Aprobar Ventana 1 (4 piezas) + blog #1 + perfil LinkedIn personal.
6. Abrir la sesión de Emilia para el lote 1 (o correr el Pase sin outbound esta semana).
7. Menor: ¿toppear los 8 contadores que faltan para 40? (Dereck, semi-manual).

**Estado:** vigente hasta el Pase 1+2 de Ramón · creado 31-ago-2026 por la coordinación
