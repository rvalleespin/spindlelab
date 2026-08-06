# Praxi

- **Quién es / qué se le vende:** **producto propio** de Ramón (no un cliente de
  agencia). Coach de hipertrofia conversacional basado en evidencia; claim
  *"Entrena sabiendo por qué"*. Marca **distinta** a SpindleLab — al producir para
  Praxi, olvidar la identidad de la agencia.
- **Marca y tono (dónde vive el contrato):** en **el repo de Praxi**, no acá.
  - ADN visual: `brand/brand.json` (acento primario **amarillo `#E2F349`**, el del
    logo — el morado viejo está prohibido).
  - Voz: `brand/voice.json` (español de **Chile, tuteo, nunca voseo**; `hype: 1` —
    nada de "¡Felicidades!"; arquetipo Sage/Hero).
  - **Apuntar ahí, no copiar.** Praxi tiene un gate `npm run design-check` que
    **falla el build** si el color se sale del contrato — pero atrapa el color, no
    el tono. El tono lo cuida quien produce.
- **Repo y ramas:** repositorio propio (**`praxis-coach`**, GitHub `rvalleespin`),
  separado de SPINDLELAB. Next.js 14 + Supabase. Auto-deploy a Vercel al hacer push
  a `main`. Tiene su propio `CLAUDE.md` — **leerlo antes de tocar nada**.
- **Restricciones:** respetar la política del producto (muro/free definitivo en
  `lib/acceso.ts`; guardrail de salud). Nunca prometer lo que el producto no
  cumple ni ocultar lo que el usuario ya pagó o generó. Nada masivo/de pago sin OK.
- **Quién aprueba:** Ramón.
- **Estado:** activo — en lanzamiento.
