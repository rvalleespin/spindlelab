# Encargo — de empleados de SpindleLab a expertos multicliente

**Tomás (PM) · 5-ago-2026.** Para la sesión que está configurando las skills.

Ramón pidió que la oficina pueda **trabajar con varios clientes siendo de verdad
experta en su área**. Hoy no puede: cada rol está escrito como *empleado de
SpindleLab*, no como *profesional de un oficio*. Este documento dice qué cambiar
y con qué criterio.

---

## 0. El dato que ordena todo el encargo

Medido hoy sobre `~/.claude/skills/`:

| Skill | Líneas | Veces que dice "SpindleLab" |
|---|---|---|
| `refero-design` | **538** | **0** |
| `producto-ui-ux` | **527** | **0** |
| `dream` | 291 | 0 |
| `buscar-leads` | 130 | 7 |
| `agente-outbound` | 129 | 2 |
| `agente-crm` | 114 | 2 |
| `persona-paid-media` | 90 | 7 |
| `agente-analitica` | 90 | 5 |
| `persona-social-media` | 68 | 6 |
| `persona-meta-ads` | 59 | 9 |
| `persona-disenador-web` | **43** | **8** |

**Las tres skills que ya son excelentes son exactamente las tres que no nombran a
ningún cliente.** No es casualidad: describir a un empleado de una empresa ocupa
el lugar donde debería ir el oficio. `persona-disenador-web` gasta 43 líneas en
decir dónde están los archivos de SpindleLab; `producto-ui-ux` gasta 527 en
enseñar a diseñar.

**El objetivo de este encargo es cerrar esa brecha.** No es "sacarle el nombre a
SpindleLab": es que sobre el espacio para el oficio.

---

## 1. Por qué urge (el caso concreto que ya casi pasa)

Praxi —producto propio, marca distinta— está en lanzamiento. En su plan hay que
pedirle piezas a Bruno (`persona-director-creativo`) y copy a Renata
(`agente-copywriter`).

Las dos skills están escritas para la marca de SpindleLab. **Si se las invoca sin
reencuadrarlas a mano, producen una pieza de Praxi con la identidad de la
agencia.** Praxi tiene un gate (`npm run design-check`) que falla el build si el
color se sale del contrato — **pero atrapa el color, no el tono.**

Hoy eso se evita porque quien reparte el trabajo se acuerda de decirlo cada vez.
Eso no es un sistema: es una persona acordándose.

---

## 2. El principio: separar el OFICIO del CLIENTE

> **La skill es el oficio. El cliente es un parámetro.**

Un buen diseñador web sabe diseñar para quien sea; lo que cambia entre clientes
es la marca, el repo y las restricciones — no el método. Hoy las dos cosas están
mezcladas en el mismo archivo, y por eso el oficio queda chico.

Tres capas, y cada cosa vive en una sola:

| Capa | Qué contiene | Dónde vive |
|---|---|---|
| **Oficio** | Método, criterios de calidad, errores típicos, límites del rol | `SKILL.md` — **sin un solo nombre de cliente** |
| **Cliente** | Marca, tono, repo, restricciones, quién aprueba | `marketing/oficina/clientes/<cliente>.md`, o el contrato propio del cliente si lo tiene |
| **Memoria** | Lo aprendido a golpes, por rol | `marketing/oficina/memoria/<rol>.md` |

**Praxi ya tiene su capa de cliente y no hay que inventarla:** `brand/brand.json`
(ADN visual) y `brand/voice.json` (cómo habla) en su propio repo. La ficha de
cliente de Praxi debería **apuntar ahí**, no copiar el contenido — un contrato
copiado se desactualiza y nadie se entera.

---

## 3. El protocolo de arranque (lo primero de cada skill)

Toda skill de la oficina parte igual:

```markdown
## Antes de producir nada

1. **¿Para quién trabajo en esta sesión?** Si no está dicho, pregúntalo. No
   asumas SpindleLab por defecto — es el error más caro de este sistema.
2. **Carga su ficha** (`oficina/clientes/<cliente>.md`) y los contratos de marca
   que apunte. Si el cliente no tiene ficha, créala antes de trabajar: sin marca
   ni tono definidos, lo que produzcas va a ser genérico.
3. **Confirma qué te toca a ti y qué no.** Si el encargo se sale de tu oficio,
   dilo y nombra a quién le corresponde.
```

Con eso, invocar a Bruno para Praxi deja de depender de que alguien se acuerde.

---

## 4. Los seis elementos que hacen experto a un rol

Esto es lo que Ramón pidió con *"bien expertos en su área"*, desglosado. **A
ninguna skill de la oficina le pueden faltar los seis.** Hoy la mayoría tiene
uno o dos.

**1 · Un método propio, ordenado y repetible.** Los pasos que sigue un buen
profesional del oficio, en orden, con qué produce cada paso. No "haz lo que te
pidan": *así se hace esto bien*. (Modelo a copiar: el bucle
genera→mira→corrige de `producto-ui-ux`.)

**2 · Criterios de calidad explícitos y verificables.** Qué distingue el trabajo
bueno del aceptable, **con ejemplos de los dos**. Un criterio que no se puede
comprobar mirando el entregable no es un criterio, es una intención.

**3 · Los errores típicos del oficio, y cómo se detectan.** Lo que sale mal una y
otra vez en esa disciplina, y la señal temprana de cada uno. Es lo que convierte
a un ejecutor en alguien con criterio.

**4 · El límite del rol.** Qué NO hace y a quién deriva. Un experto que acepta
todo no es un experto, es un ayudante. Y sin límites escritos, dos roles hacen
el mismo trabajo distinto y nadie sabe cuál vale.

**5 · Cómo verifica su propio trabajo antes de entregar.** Un checklist corto que
se corre siempre. Sin esto, el control de calidad se lo come el que recibe.

**6 · De dónde saca los datos.** Benchmarks, fuentes, herramientas del oficio, y
la regla de no inventar cifras. Lo que hoy solo tienen Vera y Nora, y deberían
tener todos.

**Qué NO cuenta como experticia** (y hoy ocupa la mitad de varias skills): rutas
de archivos, nombres de clientes, y la lista de dónde se guarda cada cosa. Eso es
capa de cliente.

---

## 5. Qué se saca y qué se conserva

**Se saca del `SKILL.md`:**
- Nombres de clientes y de proyectos.
- Rutas duras a `marketing/...` de este repo.
- El supuesto de que hay un solo repo y una sola marca.
- Los flujos internos de SpindleLab (van al doc de flujos, que sí es de la casa).

**Se conserva, y es el activo más valioso:** las lecciones aprendidas a golpes.
Están repartidas en varias skills y **valen más que todo lo demás junto** — pero
hoy están escritas como anécdota de SpindleLab y se pierden al generalizar.

**Cómo se traducen, con un ejemplo real de `persona-paid-media`:**

> ❌ *"Claude no tiene navegador en las Routines; solo la sesión local que Ramón
> abre a mano en su Mac lo tiene (probado 23 jul)."*
>
> ✅ **Principio del oficio:** *nunca asumas que la sesión donde corres tiene
> navegador. Verifícalo antes de prometer que vas a ejecutar algo en una
> plataforma; si no lo tienes, tu entregable es la guía paso a paso con capturas,
> no la ejecución.*
> **Aprendido:** SpindleLab, 23-jul-2026, Google Ads.

El principio viaja a cualquier cliente. La anécdota queda como respaldo, que es
lo que le da autoridad.

---

## 6. Contrato de entrada y salida

Cada skill declara, en dos líneas: **qué necesita recibir** para arrancar y **qué
entrega**. Sin eso no se pueden encadenar, y encadenarlas es todo el punto de
tener una oficina.

```markdown
## Contrato
- **Recibe:** cliente + objetivo + [lo específico del oficio].
- **Entrega:** [el artefacto, dónde queda] + lo que le falta para estar listo.
- **Aprueba:** [quién] — y siempre Ramón si envía correos o gasta plata.
```

Ejemplo ya en uso, del plan de lanzamiento de Praxi: Renata **recibe** un gancho
y el `voice.json` del cliente, y **entrega** el guion; Bruno **recibe** el guion
aprobado y **entrega** la pieza. Con contratos escritos, esa cadena la arma
cualquiera.

---

## 7. El registro de clientes

Un archivo por cliente en `marketing/oficina/clientes/`, con lo mínimo:

- **Quién es** y qué se le vende.
- **Marca y tono:** dónde vive el contrato (para Praxi, `brand/brand.json` +
  `brand/voice.json` de su repo; para clientes de agencia, su manual).
- **Repo y ramas**, si tiene código.
- **Restricciones**: lo que no se puede decir, prometer ni publicar.
- **Quién aprueba** de su lado.
- **Estado**: activo / pausado / cerrado.

Arrancar con tres: **SpindleLab** (la casa es un cliente más), **Praxi**, y el
cliente de desarrollo web que esté vivo.

---

## 8. Dos limpiezas obligatorias ANTES de reescribir nada

Si no se hacen primero, el trabajo se hace dos veces.

**8.1 · Las skills están duplicadas en dos lugares y no coinciden.**
`~/.claude/skills/` tiene **19**; `.claude/skills/` de este repo, en
`origin/main`, tiene **10**. Las globales son las que están cargadas y las más
nuevas. Hay que decidir cuál manda —recomiendo las del repo, porque quedan
versionadas y viajan con el proyecto— y borrar la otra copia. Mientras existan
las dos, editar una es un trabajo que se pierde.

**8.2 · El mismo puesto tiene dos nombres.** La skill
`agente-inteligencia-mercado` es **Vera** en la copia global y en el organigrama
de la rama local, y **Marco** en el organigrama de `origin/main`, con otra
carpeta de trabajo y otra memoria. El informe de mercado de Praxi del 3-ago está
firmado por Vera. **Hay que elegir un nombre y dejarlo en un solo lugar** antes
de que alguien escriba con el otro.

⚠️ Y un aviso de contexto: este repo está en la rama `redesign`, con **13 commits
locales y 25 en `origin/main` que no están acá** — incluida una migración
completa del sitio a Astro. **Sincronizar antes de tocar nada compartido**, o se
edita sobre una foto vieja.

---

## 9. Orden de trabajo, y cuándo está listo

**Orden sugerido** — de lo que más se usa a lo que menos, para que el beneficio
llegue antes:

1. Las dos limpiezas del §8.
2. La plantilla común + el registro de clientes.
3. Los tres roles que Praxi necesita esta semana: `agente-copywriter`,
   `persona-director-creativo`, `persona-meta-ads`.
4. El resto de la oficina.
5. `agente-troncal-marketing` (Tomás) al final: es el que reparte, y conviene
   reescribirlo cuando ya estén los contratos de los demás.

**Una skill está lista cuando:**

- [ ] No nombra a ningún cliente en `SKILL.md`.
- [ ] Tiene los **seis elementos** del §4.
- [ ] Tiene el protocolo de arranque del §3 y el contrato del §6.
- [ ] Las lecciones a golpes están como **principio + respaldo**, no como anécdota.
- [ ] **Prueba real:** invocarla para Praxi y para un cliente de agencia, y que en
      los dos casos cargue la marca correcta sin que nadie se lo recuerde. Si hay
      que recordárselo, no está lista.

**Y una advertencia sobre el tamaño.** El objetivo no es que todas lleguen a 500
líneas: es que lo que digan sea oficio. Una skill de 120 líneas de método vale
más que una de 300 con rutas de archivos. Si al sacar lo de SpindleLab una queda
en 25 líneas, eso no es un archivo corto — **es un rol que nunca se escribió**, y
hay que escribirlo.
