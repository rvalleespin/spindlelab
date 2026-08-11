# Memoria — Fran (persona-meta-ads)

**Rol:** Paid media en Meta (Facebook + Instagram). Monta y gestiona campañas con
criterio de media buyer; desconfía de los defaults de Meta.
**Carpeta de trabajo:** la del cliente. Para Praxi, los encargos viven en su repo
(`docs/encargos/`).
**Skill:** .claude/skills/persona-meta-ads/SKILL.md

## Estado actual
- 2026-08-11 — **Praxi, campaña de lanzamiento.** `praxi-lanzamiento-ago`, cuenta
  `act_2120963542133903`. Dos conjuntos separados de $50.000 CLP total cada uno,
  ventana 11→18 ago, un ángulo por conjunto (`a-memoria`, `b-series`). Objetivo
  Tráfico. `b-series` en revisión al cierre.

## Aprendido a pulso (gotchas de la plataforma)

- **⚠️ "Compartir hasta 20% del presupuesto entre conjuntos" viene ACTIVADO** (a
  nivel campaña). Deja a Meta mover plata entre conjuntos: **anula un test A/B
  aunque los conjuntos estén separados.** Y es peor que no separarlos, porque el
  test parece sano. Revisarlo SIEMPRE al montar un A/B por conjuntos.
- **⚠️ Duplicar un conjunto de presupuesto TOTAL con compartir-presupuesto activo
  hereda entrega "Acelerada" con un límite de puja fantasma** que la UI no deja
  editar, y bloquea la publicación. **Salida:** duplicar desde un conjunto ya
  limpio (sin compartir, presupuesto y ventana definitivos), copiar el anuncio
  dentro, borrar el sobrante y descartar el corrupto.
- **"Permitir gasto limitado en ubicaciones excluidas" se re-activa solo** cada
  vez que se excluye una ubicación. Destildarlo después de cada cambio.
- **Los checkboxes de sub-ubicaciones no responden a clic por coordenada**: usar
  clic por referencia.
- **UI 2026, objetivo Tráfico:** ya no existe "audiencia original"; el default es
  Público Advantage+. Para audiencia dura: *"Limitar aún más tu público" →
  "Llegar a un público restringido"*.
- **Ubicaciones manuales** están en *"Mostrar más opciones de configuración" →
  "Controles de ubicación"*.
- **Subir archivos:** la automatización corre en sandbox y rechaza rutas de disco.
  Lo único que funciona es el selector nativo, y **el archivo lo elige Ramón**.
- En Meta no existe el interés "musculación": usar "Fisicoculturismo".

## Gotchas de criterio (no de la plataforma)

- **⚠️ La métrica de decisión de un test de ángulo NO es el CTR.** El CTR dice si
  el creativo detiene el scroll, nada más. Lo que decide es **conversión ÷ clic**,
  y pueden ir al revés: un gancho de curiosidad gana clics y pierde altas. En
  Praxi esto se corrigió tres veces; anotado acá para que no vuelva a pasar.
- **Con presupuesto chico, objetivo Tráfico > Conversión.** Una campaña de
  conversión necesita ~50 conversiones semanales para salir de aprendizaje; bajo
  eso se paga el aprendizaje sin cobrarlo.
- **Verificar la premisa del encargo contra la cuenta antes de ejecutar.** El
  encargo de Praxi decía "aún no gasta" y la campaña ya llevaba $1.589 y el
  reparto desigual en curso. Se avisó y se ejecutó igual — correcto.

## Pendientes que dejé
- [ ] Praxi — `b-series` en revisión: confirmar que pasa a Activo y **entrega**.
- [ ] Praxi — entregar el **desglose por ubicación** (Feed FB / Feed IG / Stories
      IG / Reels IG) en gasto, clics y costo por visita del 10–11 ago.

## Con quién trabajo
- **Tomás** (troncal) da el encargo y recibe el informe. **Nora** lee el resultado
  en PostHog — yo no declaro ganadores. **Bruno/Renata** hacen los creativos.
  **Ramón** aprueba todo gasto y toca el método de pago.
