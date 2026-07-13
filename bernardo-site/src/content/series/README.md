Cada serie (obra personal) es un archivo `.md` en esta carpeta con este frontmatter:

```yaml
---
title: "Nombre de la serie"
year: "2024–2025"
excerpt: "Una o dos frases de contexto, no descripción literal de las fotos."
order: 1
cover:
  src: "/series/nombre-de-la-serie/portada.jpg"
  alt: "Descripción de la imagen para lectores de pantalla"
images:
  - src: "/series/nombre-de-la-serie/01.jpg"
    alt: "..."
    credit: "© Bernardo Combeau"
    place: "Valparaíso, Chile"
    year: "2024"
---
Texto breve de la serie en el cuerpo del markdown (opcional, si excerpt no basta).
```

Reglas (de `SPL-INT-2026-014_referentes_interno.html`):
- Máximo 60 imágenes por serie (techo de alcance de la cotización).
- Toda imagen lleva crédito y contexto cuando se conoce: lugar, año, ©.
- No inventar datos: si no hay lugar/año confirmado, omitir el campo, no rellenar.
- Las imágenes reales las provee Bernardo — esta carpeta queda vacía hasta que lleguen.
