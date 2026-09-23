# Cierre — Login OAuth de Bernardo Combeau + hallazgo aparte: Vercel desinstalado de GitHub

**Fecha:** 2026-09-23 · **De:** sesión local (trabajo directo en `rvalleespin/bernardo-combeau`)
**Para:** sesión troncal / la sesión que reconcilió los dos reportes
**Contexto:** confirma el reporte ya consolidado (`reporte-login-admin-bernardo-23sep.md`,
commit `c8de033`) y agrega un hallazgo posterior a ese reporte, no incluido en él.

## 1. El reporte reconciliado — verificado, sin correcciones

Se leyó `reporte-login-admin-bernardo-23sep.md` tal como quedó tras la reconciliación
(`c8de033`). **Es preciso.** Da el crédito correcto a los dos hallazgos que corrigieron las
premisas falsas del encargo original (el secret viejo no estaba invalidado; sí hacía falta
tocar código), y no contiene ninguna afirmación que contradiga lo verificado por esta sesión.
Nada que reabrir ahí.

## 2. Hallazgo nuevo: se desinstaló la app de Vercel de GitHub (a nivel de cuenta)

Los dos merges de hoy en `bernardo-combeau` (`773d57e` y `29767c8`) quedaron con un check
**failure** de una integración de Vercel que seguía conectada al repo, con el mensaje
`"Account is blocked."` — residuo de la migración a Netlify del 8-sep, no diagnosticado hasta
ahora. Ramón decidió sacarla.

**Lo que se hizo:** Ramón confirmó el acceso (2FA) y desinstaló la **GitHub App de Vercel** por
completo — no solo le quitó el acceso al repo de Bernardo, la sacó de toda la cuenta
`rvalleespin`. Verificado en `github.com/settings/installations` y en
`github.com/rvalleespin/bernardo-combeau/settings/installations`: ya no aparece.

**Verificación de impacto (vía API de Vercel, antes de dar esto por inocuo):** la cuenta de
Vercel conectada (`manuvalleespin-8100s-projects`) tiene 3 proyectos, no 1. Se revisaron los 3:

| Proyecto | Estado antes de hoy | ¿Lo afectó la desinstalación? |
|---|---|---|
| `bernardo-combeau` | migrado a Netlify hace semanas, ya no se usaba | No — era exactamente el objetivo |
| `bernardo-vista-previa` | `live: false`, sin deploys desde principios de julio | No — ya estaba inactivo antes de hoy |
| `praxi-coach` (praxi.coach) | `live: false`, **402 / DEPLOYMENT_DISABLED** desde fines de agosto (cuenta de Vercel bloqueada, probablemente facturación) | No — la cuenta ya no desplegaba nada, con o sin la GitHub App conectada |

**Conclusión: la desinstalación no cortó ningún despliegue activo.** Los tres proyectos de esa
cuenta de Vercel ya estaban parados antes de tocar nada.

## 3. Praxi — no es un incidente, no proponerlo

Al verificar lo de arriba se encontró que `praxi.coach` está caído (402). **Ramón fue explícito:
"no toques lo de Praxi, es un proyecto que tengo dormido."** No se investigó más ni se tocó nada
del proyecto. Esto ya quedó en la memoria de esta sesión local
(`ramon-temas-que-maneja-el.md`), pero lo dejo también acá porque cualquier sesión que lea el
repo de Bernardo o el dashboard de Vercel puede toparse con el mismo 402 y reportarlo como caída
sin ese contexto. **No es una caída que reportar ni un pendiente que levantar.**

## 4. Consecuencia práctica, si Praxi se retoma alguna vez

Cuando ese proyecto se despierte, para que vuelva a desplegar solo con cada push va a hacer
falta **reinstalar la GitHub App de Vercel**, dándole acceso a `rvalleespin/praxis-coach`
específicamente (no a toda la cuenta, para no repetir el ruido que causó esto en el repo de
Bernardo). No es una acción de hoy — es una nota para cuando corresponda.

## Estado final de esta sesión

- `bernardo-combeau`: `main`, limpio, sincronizado con `origin`.
- `spindlelab`: `main`, limpio, sincronizado con `origin`.
- `bernardocombeau.cl`: sitio público 200, `/api/auth` 302, login verificado (dos veces: prueba
  en incógnito de esta sesión, y login real de Ramón/Bernardo).
- Sin cabos sueltos de esta tarea. El único pendiente menor documentado (contexto *Local
  development* vacío en Netlify) no bloquea nada y ya está en el reporte reconciliado.
