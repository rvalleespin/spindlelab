# Plan — Cosecha final de Apollo (antes de dar de baja)

**Fecha:** 24-ago-2026 · **Objetivo:** extraer la MÁXIMA cantidad de contactos verificados con buen encaje ICP, gastar los créditos que quedan, y **luego cancelar Apollo**. Los CSV quedan como banco de outbound permanente (las rutinas siguen funcionando sin Apollo).

**Cuenta Apollo:** prospectar SIEMPRE desde `manuvalleespin@gmail.com` (Plan Básico). NUNCA enviar.
**Créditos disponibles (declarado 24-ago):** ~1.500 a 3.000. Cada lead verificado ≈ 1 crédito.

---

## Receta operativa (misma que funcionó con abogados — cero desperdicio)
1. Filtro: **industria/tag del rubro + ubicación (Santiago primero) + keyword del sub-rubro + "Estado del email = Verificado"** (`contactEmailStatusV2=verified` en la URL). Así solo se revela lo que tiene email real.
2. Selección: checkbox del header → diálogo **"Máx personas por empresa = 1"** → Aplicar (1 contacto por empresa, no se queman créditos en 5 personas del mismo lugar).
3. Revelar: **Exportar → "solo correos verificados"** (revela en bloque server-side, NO congela la cuenta). NO revelar de a uno en ráfaga (congela).
4. El CSV descarga en el **Mac donde corre Chrome (el iMac)** → Ramón lo mueve a la carpeta iCloud SPINDLELAB → se lee con Bash/Read (**puente iCloud**).
5. Curar: descartar soporte (secretaria/RRHH/admin/contable interno), off-ICP (proveedores, retail, cadenas grandes), y dedup contra lo ya contactado.

**Truco de industria:** el autocompletado en español es finicky; mejor navegar por URL con `organizationIndustryTagIds[]=<TAG>`. Tags conocidos: Medical Practice `5567d0467369645dbc200000`, Law Practice `5567ce1f7369644d391c0000`, Veterinary `5567ce9673696439d5c10000`. Los demás se buscan en la sesión (autocomplete o inspeccionando una empresa conocida).

---

## Presupuesto por rubro (orden = encaje ICP)
Caps aproximados que suman ~2.100 (deja reserva). **Si un rubro rinde menos, el saldo pasa al siguiente.** Parar al quedar ~200 créditos de reserva.

| # | Rubro | Sub-segmentos (keywords) | Cap créditos | CSV salida |
|---|-------|--------------------------|--------------|------------|
| 1 | **Financiero y profesional** | contadores, auditores, asesoría tributaria, corredoras de seguros, asesoras de inversión/wealth | ~700 | `ventas/contactos-financiero-profesional.csv` |
| 2 | **Inmobiliario y propiedades** | inmobiliarias, corredoras de propiedades, estudios de arquitectura | ~600 | `ventas/contactos-inmobiliario.csv` |
| 3 | **Salud de alto ticket** | cirugía plástica, oftalmología, dermatología, fertilidad, centros médicos especializados, kinesiología deportiva | ~500 | `ventas/contactos-salud-alto-ticket.csv` |
| 4 | **Turismo y hospitalidad** | hoteles boutique, tour operators/agencias premium | ~300 | `ventas/contactos-turismo.csv` |

**Prioridad justificada:** Financiero y profesional replica a abogados (alta densidad de email verificado + confianza + ticket) → mejor rendimiento por crédito. Inmobiliario: ticket altísimo, muy googleado. Salud: mejor encaje temático, pero en Apollo las clínicas chilenas tienen densidad de verificado más baja (~15%) → tomar lo que haya. Turismo: encaje medio, cap chico.

## Ubicación
- **Santiago (RM) primero** en todos.
- Extender a **Viña/Valparaíso, Concepción, La Serena** solo si el pool de Santiago de ese rubro queda chico y sobran créditos. (Nota: para clínicas, regiones ya se probó = pozo seco en Apollo; para financiero/inmobiliario puede sumar algo.)
- Turismo: sí conviene regiones/destinos (Puerto Varas, San Pedro de Atacama, Pucón) porque el hotelería boutique vive fuera de Santiago.

## Salida (formato de cada CSV)
Header de 6 columnas, igual que abogados:
`nombre,cargo,empresa,email,ciudad,estado`
- En `estado`: marcar si el dominio es **catch-all** ("CATCH-ALL (2a ola)") vs limpio, para el orden de envío.
- **Dedup obligatorio** contra: `contactos-abogados-santiago.csv`, `contactos-clinicas-*.csv` y lo ya enviado en Gmail.

## Regla de corte / ledger
- Llevar un conteo de créditos gastados por rubro (el historial de export de Apollo + la baja del saldo).
- Parar cada rubro al llegar a su cap O al agotar el pool verificado (lo que ocurra primero).
- Parar TODO al quedar ~200 créditos de reserva.
- Cuando termine la cosecha: dar de baja Apollo. Actualizar memoria `project_spindlelab_prospeccion_verticales`.

## ⚠️ BLOQUEO 26-ago: FALLO DE PAGO EN APOLLO
Al intentar el primer export (contabilidad, 274 firmas), Apollo devolvió: **"There is a payment failure. Please ensure your credit card information is correct before prospecting again."** El banner "corrige tu facturación en 26 días" NO es cosmético: **la extracción/reveal está bloqueada** hasta corregir el medio de pago. Los ~2.500 créditos están CONGELADOS, no perdidos.
- **No se gastó ningún crédito** (el export fue rechazado).
- **Decisión de Ramón:** corregir el pago en Apollo desbloquea la cosecha completa (~2.500 contactos). Solo Ramón puede hacerlo (datos de pago). Tensión real: se quiere cancelar Apollo por caro, pero para usar los créditos hay que regularizar el pago una vez. Recomendación: si el cargo pendiente ≈ una mensualidad del plan que ya pagas, conviene pagarlo UNA vez, cosechar los 2.500, y recién ahí cancelar.
- Cuando esté corregido: retomar con las URLs de abajo (todo queda listo, la receta ya está validada).

## Tags de industria capturados 26-ago (reusar por URL, saltando el autocompletado)
- **contabilidad** (Accounting) = `5567ce1f7369643b78570000` → Santiago+verificado = **1.685 personas / 274 firmas distintas** (máx-1-empresa). ICP LIMPIO (contadores/auditoras). Curar fuera Big-4: EY, Deloitte, PwC, KPMG, Grant Thornton, BDO.
- servicios financieros = `5567cdd67369643e64020000` (17.540 — MUY enterprise: bancos, retail-finance. Solo con filtro de tamaño ≤200 empleados).
- seguro = `5567cdd973696453d93f0000` (aseguradoras grandes; el ICP son "corredoras de seguros" → filtrar por keyword o tamaño).
- gestión de inversiones = `5567e0bc7369641d11550200` (AFPs, bancos, gestoras grandes; boutiques son minoría).
- **Aprendizaje:** en Chile solo **contabilidad** es ICP limpio por tag. Los otros 3 necesitan filtro de tamaño (# empleados ≤ ~200) para servir. El autocompletado de industrias matchea escribiendo en INGLÉS (accounting/insurance/investment) aunque muestre la etiqueta en español.

### URL lista para el rubro 1 (Financiero, contabilidad limpia)
`https://app.apollo.io/#/people?page=1&contactEmailStatusV2[]=verified&personLocations[]=Santiago%2C%20Chile&organizationIndustryTagIds[]=5567ce1f7369643b78570000&sortAscending=false&sortByField=%5Bnone%5D`
→ luego: checkbox header → Máx personas por empresa=1 → número 700 → Aplicar → Exportar → "solo correos verificados" → Guardar → historial de export → descargar → puente iCloud.

## Cómo se ejecuta
- Un rubro por sesión, con la skill **buscar-leads (Dereck)**, browser en el iMac + puente iCloud.
- La extracción pesada corre en subagente barato (Sonnet), no en Opus.
- Al terminar cada rubro, alimentar esos leads a las rutinas de outbound (o crear una rutina hermana por rubro, como la de abogados).
