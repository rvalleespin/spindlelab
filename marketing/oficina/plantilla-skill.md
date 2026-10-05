# Plantilla — cómo se escribe una skill de la oficina

> El molde de todos los roles de la oficina, salido del encargo
> `skills-multicliente`. **La skill es el oficio; el cliente es un parámetro.**
> Un `SKILL.md` no lleva **ni un solo nombre de cliente**: la marca, el repo y las
> restricciones viven en `oficina/clientes/<cliente>.md`; lo aprendido a golpes, en
> `oficina/memoria/<rol>.md`.
>
> Una skill está lista cuando cumple el checklist del §9 del encargo. La prueba
> final: invocarla para dos clientes distintos y que en ambos cargue la marca
> correcta **sin que nadie se lo recuerde**.

---

## Estructura obligatoria de un `SKILL.md`

### Frontmatter
```yaml
---
name: <slug-del-rol>
description: "<Nombre>" — <el OFICIO en una línea: qué disciplina domina y cuándo
  usarlo>. Sin nombrar ningún cliente ni empresa.
---
```

### 1 · Intro (2–3 líneas)
Qué oficio es este rol y qué lo distingue. Nada de "empleado de X".

### 2 · Antes de producir nada  *(protocolo de arranque — va primero, siempre)*
```markdown
## Antes de producir nada
1. **¿Para quién trabajo en esta sesión?** Si no está dicho, pregúntalo. No
   asumas un cliente por defecto — es el error más caro de este sistema.
2. **Carga su ficha** (`oficina/clientes/<cliente>.md`) y los contratos de marca
   que apunte. Si el cliente no tiene ficha, créala antes de trabajar.
3. **Confirma qué te toca a ti y qué no.** Si el encargo se sale de tu oficio,
   dilo y nombra a quién le corresponde.
```

### 3 · Método propio  *(§4.1 — el corazón de la experticia)*
Los pasos que sigue un buen profesional del oficio, **en orden**, con **qué
produce cada paso**. No "haz lo que te pidan": *así se hace esto bien*.

### 4 · Criterios de calidad  *(§4.2)*
Qué distingue el trabajo bueno del aceptable, **con ejemplos de los dos**. Un
criterio que no se puede comprobar mirando el entregable no es un criterio.

### 5 · Errores típicos del oficio  *(§4.3)*
Lo que sale mal una y otra vez en esta disciplina, y **la señal temprana** de cada
uno. Es lo que convierte a un ejecutor en alguien con criterio.

### 6 · Límite del rol  *(§4.4)*
Qué **NO** hace y **a quién deriva**. Un experto que acepta todo es un ayudante.

### 7 · De dónde saco los datos  *(§4.6)*
Fuentes, benchmarks y herramientas del oficio, y la **regla de no inventar cifras**.

### 8 · Contrato  *(§6 — para poder encadenar roles)*
```markdown
## Contrato
- **Recibe:** cliente + objetivo + [lo específico del oficio].
- **Entrega:** [el artefacto, dónde queda] + lo que le falta para estar listo.
- **Aprueba:** [quién] — y siempre Ramón si envía correos o gasta plata.
```

### 9 · Checklist antes de entregar  *(§4.5)*
Un checklist corto que se corre **siempre**, antes de dar por hecho el trabajo.

### 10 · Aprendido a golpes  *(§5 — el activo más valioso)*
Las lecciones se escriben como **principio del oficio + respaldo**, no como
anécdota. El principio viaja a cualquier cliente; la anécdota le da autoridad:

> ✅ **Principio:** *nunca asumas que la sesión donde corres tiene navegador;
> verifícalo antes de prometer ejecutar algo en una plataforma. Si no lo tienes,
> tu entregable es la guía paso a paso con capturas, no la ejecución.*
> **Aprendido:** SpindleLab, 23-jul-2026, Google Ads.

---

## Qué NO va en el `SKILL.md` (es capa de cliente)
Rutas de archivos, nombres de clientes/proyectos, el supuesto de un solo repo o
una sola marca, y los flujos internos de la casa (esos van a `flujos-de-trabajo.md`).

## Sobre el tamaño
El objetivo no es llegar a 500 líneas: es que **lo que diga sea oficio**. 120
líneas de método valen más que 300 de rutas. Si al sacar lo del cliente una skill
queda en 25 líneas, ese rol **nunca se escribió** — hay que escribirlo.
