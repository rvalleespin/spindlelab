# Obras web — los artefactos de control del Estudio Web

Una carpeta por obra: `<cliente>-<obra>/`. Acá viven los documentos que hacen que un
sitio se construya de una pasada en vez de corregirse en cuatro. **El código no vive
acá**: vive en el repo del sitio.

```
<cliente>-<obra>/
├── brief-de-obra.md     Mauro   · compuerta 1 — qué se construye y qué no
├── referencias.md       Lucía   · lock de referencias reales, con su rol
├── copy-secciones.md    Clara   · el texto por slot, en la voz del sitio
├── senales.md           Simón   · JSON-LD, metas y enlazado previstos
├── tableros/            Lucía   · compuerta 2 — dos direcciones renderizadas
├── spec-visual.md       Lucía   · el contrato: tokens con rol + composición
├── desvios.md           Diego   · lo que se apartó de la spec, y por qué
├── acta-qa.md           Javiera · veredicto con defectos numerados
└── capturas/            Javiera · evidencia a 390 / 768 / 1440
```

El protocolo está en `.claude/skills/estudio-web/` (`SKILL.md`,
`protocolo-compuertas.md`, `antislop-web.md`, `tablero-de-estilo.md`) y las plantillas
de brief, spec y acta en `estudio-web/plantillas/`.

**Reglas de la carpeta**
- Una obra abierta tiene su carpeta creada desde la fase 0, aunque esté a medias.
- Las correcciones se escriben en `spec-visual.md` (historial al final), no en el chat:
  una corrección que no quedó escrita vuelve como defecto en la pasada siguiente.
- Cuando la obra cierra, se deja el acta final y se anota el aprendizaje en la memoria
  del rol que corresponda (`oficina/memoria/`). La carpeta se conserva: es el
  antecedente de la obra siguiente para ese cliente.
