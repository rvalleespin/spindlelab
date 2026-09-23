# REPORTE → troncal — Login del panel /admin de Bernardo Combeau: operativo

**Fecha:** 2026-09-23 · **De:** sesión local (trabajo en `rvalleespin/bernardo-combeau`)
**Para:** sesión troncal · **Por qué te llega esto:** corrige dos líneas de
`ventas/proyectos-en-curso.md` que yo no edito por protocolo.

## Lo que hay que corregir en el registro

La ficha de Bernardo (fila de `proyectos-en-curso.md`) dice, del checklist técnico:

> "registros DNS en NIC Chile, actualizar callback de la OAuth App de GitHub,
> apuntar `site` del proyecto al dominio real" · "Proyecto en `bernardo-combeau` (Vercel)"

Estado real, verificado hoy:

- **Callback de la OAuth App: HECHO.** Apunta a `https://bernardocombeau.cl/api/callback`.
- **DNS: resolviendo.** `https://bernardocombeau.cl/` responde 200.
- **El proyecto NO está en Vercel, está en Netlify** (migrado el 8-sep). La ficha
  todavía dice Vercel. Se borró la carpeta `.vercel/` del repo (300 MB obsoletos).
- **La "Meta tope: viernes 24 jul" del checklist ya no aplica.**

## Lo que se hizo

1. **El panel `/admin` no funcionaba: `/api/auth` devolvía 500.** Faltaban las dos
   variables de la OAuth App en Netlify. Configuradas. Bernardo ya puede entrar.
2. **Arreglo de código, mergeado (PR #1, `773d57e`).** `auth.ts` y `callback.ts` leían
   las credenciales con `import.meta.env`, que Vite reemplaza al compilar: el client
   secret quedaba escrito en texto plano dentro del bundle desplegado. Ahora se leen en
   runtime con `process.env`. Comprobado con control A/B: el valor pasaba de aparecer en
   2 archivos del build a 0.
3. **Secret rotado y los viejos eliminados.** Probado con login real en incógnito antes
   de borrar nada.
4. **Doc corregida (PR #2, `29767c8`):** `.env.example` mandaba a Vercel y decía "copiar
   a .env para probar en local", que ya no basta.

## Dos premisas del encargo que resultaron falsas

- **"El client secret anterior quedó invalidado, no sirve más" — era falso.** Había
  **dos** secretos vivos en la OAuth App, incluido uno del 14-jul que GitHub reportaba
  como usado en las últimas 4 semanas. Generar uno nuevo no invalida los anteriores; hay
  que borrarlos a mano. Ya se hizo: queda uno solo.
- **"No hace falta tocar código" — era falso.** Ver punto 2. Sin ese cambio, marcar la
  variable como secreta en Netlify arriesgaba tumbar el deploy por secrets scanning.

## Pendientes menores (no bloquean nada)

- En Netlify, el contexto **Local development (Netlify CLI)** de `GITHUB_OAUTH_CLIENT_SECRET`
  quedó vacío. Solo afecta correr el sitio en local.
- Para probar el login en local ya no sirve `npm run dev`: hay que usar `netlify dev`.
- `AGENTS.md` del repo de Bernardo anota que "queda una integración vieja de Vercel"
  pendiente de limpiar. No se tocó.
- Riesgo residual: el secreto de julio que se borró figuraba como usado hace poco. Si
  algo distinto del CMS se autenticaba con él, dejaría de funcionar. No se encontró
  ningún otro consumidor de esa OAuth App.

## Ojo con el registro de pagos

Este trabajo es **posterior al 24-jul**, pero corresponde al mismo contrato de Bernardo,
que según la regla de corte va como **persona natural**. No genera cobro nuevo: es cierre
del checklist de Fase 5, ya pagada.
