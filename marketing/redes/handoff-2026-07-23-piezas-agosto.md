# Handoff — Piezas visuales de agosto producidas (23 jul 2026)

> ⚠️ **Documento superado.** El enfoque cambió el mismo día tras la revisión de Ramón: las piezas
> se rehicieron con estrategia de comunicación y ganchos. **Ver `PLAN-AGOSTO-PIEZAS.md`** (índice
> maestro del mes) y `estrategia-ganchos-agosto.md` (el porqué). Esto se conserva como registro
> de la v1.

**De:** sesión de dirección creativa · **Para:** sesión troncal + `/persona-social-media` + Ramón
**Encargo que responde:** `encargos-otras-sesiones/piezas-visuales-agosto.md`
**Copy fuente:** `redes/grilla-agosto-2026.md` (no se reescribió ningún texto: solo se vistió)

## Lo que quedó listo (todo pendiente de la pasada de Ramón)

| Prioridad | Pieza | Carpeta | Qué hay |
|---|---|---|---|
| ALTA | Reel kickoff · 4 ago | `redes/reel-agosto-robots/` | **4 clips propios 9:16** (concepto "La puerta") + 6 overlays 1080×1920 transparentes + hoja de montaje `preview-montaje.png` + receta CapCut |
| ALTA | Carrusel 5 chequeos · 11 ago | `redes/carrusel-03-cinco-chequeos/` | 7 láminas 1080×1080 + `ad-resumen.png` para Meta Ads + HTML |
| MEDIA | Sistema de post de empresa | `redes/posts-agosto/` | 2 direcciones a elegir + los 4 posts aplicados (6, 13, 18, 25 ago) |
| BAJA | Posts personales | — | No se produjo pieza (el encargo los declara opcionales; funcionan como texto solo) |

**Créditos Higgsfield gastados: 110** (5 generaciones Veo 3.1 fast × 22; una descartada y rehecha).
El carrusel y los posts no gastaron nada: reusan fotos de julio. La primera versión del Reel
reusaba el b-roll de oficina de julio, pero Ramón la rechazó con razón (servía para ilustrar
cualquier agencia), así que se generó material propio para el concepto "La puerta".

## Lo que necesito de vuelta

1. **Ramón:** elegir dirección del sistema de posts (mi recomendación está en `posts-agosto/README.md`:
   usar A y B alternadas como un solo sistema) y aprobar las tres piezas.
2. **Ramón:** montar el Reel en CapCut siguiendo `reel-agosto-robots/copy-reel.md` (no hay ffmpeg
   de este lado, así que el MP4 final lo armas tú, ~4 min).
3. **`/persona-social-media`:** confirmar que ningún titular de imagen se contradice con el copy
   final si la grilla cambia tras tu revisión. Los titulares salen textuales de la grilla actual.

## Decisiones de criterio que conviene conocer

- **Concepto del Reel: "La puerta".** El sitio como una puerta cerrada — fachada premium encendida
  y vacía, alguien mirando desde afuera, la sala de espera perfecta y sola, y al final la puerta
  que se abre. Cero clichés de IA. Detalle en `reel-agosto-robots/copy-reel.md`.
- **El hallazgo del robots.txt se muestra, no se cuenta.** El corazón del Reel es un bloque con las
  líneas reales del archivo (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, meta-externalagent
  → `Disallow: /`). Los user-agents son los verdaderos de cada motor.
- **Ese mismo "bloque de máquina" es el hilo visual del mes**: aparece en el Reel, en las tarjetas
  del carrusel y en el post del 13. Es lo que hace que agosto se lea como un bloque y no como
  piezas sueltas, y encaja con el tema ("lo que la IA ve").
- **Precios fuera de la imagen** en el post del 25 (solo en el caption): un precio quemado en un
  creativo envejece mal y le pone fricción al ad.
- **Prospectos anonimizados** en todas las piezas ("una clínica", "varias clínicas"), cero cifras
  o testimonios inventados.
- **Variedad de feed:** agosto queda con video, carrusel, dos posts tipográficos y dos con foto real.
  No hay dos piezas seguidas del mismo formato.

## Verificación hecha

- Los 6 overlays tienen alfa real (PNG color-type 6) y se probaron **compuestos sobre los clips
  reales** antes de darlos por buenos; el CTA lleva un velo suave porque la escena 3 es clara.
- Las 7 láminas del carrusel y los 4 posts se revisaron renderizados, no en código.
- HTML fuente + fuentes `.woff2` guardados junto a cada PNG, según convención del repo.
