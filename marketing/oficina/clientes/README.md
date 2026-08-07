# Clientes de la oficina

La **capa de cliente** del sistema (ver `plantilla-skill.md`). Cada rol de la
oficina es experto en su oficio y **agnóstico del cliente**; lo que cambia entre
uno y otro —marca, tono, repo, restricciones, quién aprueba— vive acá, un archivo
por cliente.

**Toda skill, antes de producir, pregunta "¿para quién trabajo?" y carga la ficha
correspondiente.** Si un cliente no tiene ficha, se crea antes de trabajar: sin
marca ni tono definidos, lo que salga va a ser genérico.

## Regla de oro de las fichas
**Apuntar al contrato de marca, no copiarlo.** Si un cliente tiene su marca en un
`brand.json`/`voice.json` o en un manual, la ficha **enlaza** ahí. Un contrato
copiado se desactualiza y nadie se entera.

## Clientes
- **`spindlelab.md`** — la casa (un cliente más).
- **`praxi.md`** — producto propio, marca distinta, repo propio.
- **`bernardo-combeau.md`** — cliente de Desarrollo Web.

## Plantilla de ficha
```markdown
# <Cliente>
- **Quién es / qué se le vende:**
- **Marca y tono (dónde vive el contrato):**
- **Repo y ramas:** (si tiene código)
- **Restricciones:** lo que no se puede decir, prometer ni publicar.
- **Quién aprueba** de su lado:
- **Estado:** activo / pausado / cerrado.
```
