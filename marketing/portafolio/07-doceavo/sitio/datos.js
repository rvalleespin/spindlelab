// Doceavo · datos del calendario 2026 y las funciones que pintan lo que cambia con la fecha.
// Lo usa el navegador (doceavo.js) y lo usa _herramientas/construir.mjs para dejar el HTML
// estático con la fecha de las capturas. Una sola implementación para los dos.
//
// Fuentes (ficha.md §4 y _herramientas/sii-calendario-2026.json, consultadas el 16-oct-2026):
// - F29: calendario tributario del SII, vista F29 de cada mes de 2026.
// - F22 y declaraciones juradas: calendario del SII y Res. Ex. SII N° 123 de 2025.
// - Cotizaciones por internet, día 13 aunque sea feriado: Superintendencia de Pensiones.
// - Feriados nacionales de 2026: feriados.cl.

export const ANIO = 2026;
export const HOY_FIJO = { m: 10, d: 16 }; // el día de las capturas: viernes 16 de octubre de 2026

export const MES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
export const MES_CORTO = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
export const DIA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
export const DIA_CORTO = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

// [PEC general, PEL general (día 12), PEC facturador electrónico, PEL facturador electrónico (día 20), sin movimiento]
export const F29 = {
  1: [11, 12, 19, 20, 28], 2: [11, 12, 19, 20, 28], 3: [11, 12, 19, 20, 28], 4: [12, 13, 19, 20, 28],
  5: [11, 12, 19, 20, 28], 6: [11, 12, 19, 22, 28], 7: [12, 13, 19, 20, 28], 8: [11, 12, 19, 20, 28],
  9: [13, 14, 20, 21, 28], 10: [11, 13, 19, 20, 28], 11: [11, 12, 19, 20, 28], 12: [13, 14, 20, 21, 28],
};
export const COTIZACIONES = 13;

export const FERIADOS = {
  "1-1": "Año Nuevo", "4-3": "Viernes Santo", "4-4": "Sábado Santo", "5-1": "Día del Trabajo",
  "5-21": "Glorias Navales", "6-21": "Día de los Pueblos Indígenas", "6-29": "San Pedro y San Pablo",
  "7-16": "Virgen del Carmen", "8-15": "Asunción de la Virgen", "9-18": "Independencia Nacional",
  "9-19": "Glorias del Ejército", "10-12": "Encuentro de Dos Mundos", "10-31": "Iglesias Evangélicas y Protestantes",
  "11-1": "Todos los Santos", "12-8": "Inmaculada Concepción", "12-25": "Navidad",
};

export const ANUALES = [
  { m: 3, d: 27, tipo: "dj", corto: "DJ", que: "Declaraciones juradas de sueldos (1887) y de honorarios (1879), entre otras", hacemos: "Las presentamos." },
  { m: 4, d: 30, tipo: "f22", corto: "F22", que: "F22 de la Operación Renta, con pago", hacemos: "Lo presentamos." },
  { m: 5, d: 8, tipo: "f22", corto: "F22", que: "F22 de la Operación Renta, sin pago", hacemos: "Lo presentamos." },
  { m: 6, d: 30, tipo: "dj", corto: "DJ", que: "Declaraciones juradas como la del balance (1847)", hacemos: "Las presentamos." },
];

// ---------------------------------------------------------------- fechas
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const diasEnMes = (m) => new Date(Date.UTC(ANIO, m, 0)).getUTCDate();
export const dow = (m, d) => new Date(Date.UTC(ANIO, m - 1, d)).getUTCDay();
export const feriado = (m, d) => FERIADOS[`${m}-${d}`] || null;
export const libre = (m, d) => { const w = dow(m, d); return w === 0 || w === 6 || !!feriado(m, d); };
export const habil = (m, d) => !libre(m, d);
const mesAnterior = (m) => MES[(m + 10) % 12];
const mesSiguiente = (m) => MES[m % 12];
// «Cotizaciones…» pasa a «cotizaciones…», pero «F29…» queda como está
const minuscula = (t) => (/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t);
const lista = (xs) => xs.length < 2 ? xs.join("") : xs.slice(0, -1).join(", ") + " y " + xs[xs.length - 1];

// El día de hoy: ?hoy=AAAA-MM-DD manda; si no, la fecha real si cae en 2026; si no, el día de las capturas.
export function obtenerHoy(busqueda = "", ahora = new Date()) {
  const q = /[?&]hoy=(\d{4})-(\d{2})-(\d{2})/.exec(busqueda);
  if (q && Number(q[1]) === ANIO) return { m: Number(q[2]), d: Number(q[3]), fijo: true };
  // la hora de Chile: el día cambia a medianoche de Santiago, no de Greenwich
  let y = ahora.getFullYear(), m = ahora.getMonth() + 1, d = ahora.getDate();
  try {
    const p = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Santiago", year: "numeric", month: "2-digit", day: "2-digit" }).format(ahora).split("-");
    y = Number(p[0]); m = Number(p[1]); d = Number(p[2]);
  } catch (e) { /* sin Intl: la del equipo */ }
  if (y === ANIO) return { m, d, fijo: false };
  return { ...HOY_FIJO, fijo: true };
}

// Lo que vence en el mes m (sin PEC general, que el sitio solo muestra en la tabla del año).
export function vence(m, { pec = true, sin = true } = {}) {
  const [, pelG, pecFE, pelFE, sinMov] = F29[m];
  const v = [
    { d: pelG, tipo: "f29", corto: "F29", que: "F29, en general", largo: "F29, en general (pago en línea)", hacemos: "Lo presentamos si no facturas electrónico.", toca: "Pagar, o dejarnos el mandato al banco." },
    { d: COTIZACIONES, tipo: "cotiz", corto: "Cotiz.", que: `Cotizaciones de ${mesAnterior(m)}, pagadas por internet`, largo: `Cotizaciones de ${mesAnterior(m)}, pagadas por internet`, hacemos: "Las declaramos en Previred.", toca: "Pagarlas." },
  ];
  if (pec) v.push({ d: pecFE, tipo: "pec", corto: "F29", que: "F29 con mandato al banco, si facturas electrónico", largo: "F29 con mandato al banco, si facturas electrónico", hacemos: "Si pagas con mandato, ya quedó enviado.", toca: "" });
  v.push({ d: pelFE, tipo: "f29", corto: "F29", que: "F29, si facturas electrónico", largo: "F29, si facturas electrónico y pagas en sii.cl", hacemos: "Lo presentamos.", toca: "Tener el saldo en la cuenta." });
  if (sin) v.push({ d: sinMov, tipo: "sin", corto: "Sin mov.", que: "F29 sin movimiento, si no vendiste nada", largo: "F29 sin movimiento", hacemos: "Lo presentamos aunque no hayas vendido nada.", toca: "" });
  for (const a of ANUALES) if (a.m === m) v.push({ d: a.d, tipo: a.tipo, corto: a.corto, que: a.que, largo: a.que, hacemos: a.hacemos, toca: "" });
  return v.sort((a, b) => a.d - b.d);
}

// La rutina del estudio (ficción declarada): se calcula desde las fechas del SII.
export function rutina(m) {
  const [, pelG, , pelFE] = F29[m];
  const n = diasEnMes(m);
  let cierre = 1; while (!habil(m, cierre)) cierre++;
  let borrador = Math.min(pelG, COTIZACIONES), k = 0;
  while (k < 3) { borrador--; if (habil(m, borrador)) k++; }
  let comprobante = pelFE + 1; while (comprobante <= n && !habil(m, comprobante)) comprobante++;
  let ultimo = n; while (!habil(m, ultimo)) ultimo--;
  return [
    { d: cierre, hacemos: `Cerramos ${mesAnterior(m)}: cuadramos tu Registro de Compras y Ventas del SII con tus papeles.`, toca: "Mandarnos lo que no está en el registro: boletas de gasto, compras sin factura." },
    { d: borrador, hacemos: "Te mandamos el borrador del F29 con el monto, y la planilla de cotizaciones.", toca: "Revisarlos y avisarnos si algo no calza." },
    { d: comprobante, hacemos: `Te mandamos el comprobante y lo que vence en ${mesSiguiente(m)}.`, toca: "Guardarlo." },
    { d: ultimo, hacemos: `Liquidaciones de sueldo de ${MES[m - 1]}, antes de que pagues.`, toca: "Pagar los sueldos." },
  ].filter((r) => r.d >= 1 && r.d <= n);
}

// ---------------------------------------------------------------- el titular
export function titular(hoy) {
  const { m, d } = hoy;
  const fe = F29[m][3];
  if (d <= fe) return { periodo: mesAnterior(m), mes: m, dia: fe, otroMes: false };
  if (m < 12) return { periodo: MES[m - 1], mes: m + 1, dia: F29[m + 1][3], otroMes: true };
  return null; // pasado el 21 de diciembre: el calendario de 2027 todavía no existe
}

export function h1(hoy) {
  const t = titular(hoy);
  if (!t) return `El calendario de 2027 lo publica el SII. Lo ponemos aquí <span class="vence">apenas salga</span>.`;
  return `El IVA de ${t.periodo} se declara hasta el ${DIA[dow(t.mes, t.dia)]} <span class="vence">${t.dia}&nbsp;de&nbsp;${MES[t.mes - 1]}</span>.`;
}

export function bajada(hoy) {
  const t = titular(hoy);
  if (!t) return "Mientras tanto, las fechas de 2026 siguen en el calendario.";
  const g = F29[t.mes][1];
  const paso = !t.otroMes && hoy.d > g;
  const cuando = `${DIA[dow(t.mes, g)]} ${g}${t.otroMes ? ` de ${MES[t.mes - 1]}` : ""}`;
  return `Es el plazo del F29 si facturas electrónico y pagas en sii.cl. Si no, ${paso ? "venció" : "vence"} el ${cuando}.`;
}

// ---------------------------------------------------------------- el año en doce
export function celdaMes(m, hoy, { boton = true } = {}) {
  const ahora = m === hoy.m;
  const puntos = new Set(vence(m, { pec: false, sin: false }).map((v) => v.d));
  const off = (dow(m, 1) + 6) % 7; // la semana parte el lunes
  let dias = "";
  for (let i = 0; i < off; i++) dias += "<i></i>";
  for (let d = 1; d <= diasEnMes(m); d++) {
    const c = [];
    if (puntos.has(d)) c.push(m < hoy.m || (ahora && d < hoy.d) ? "vencio" : "vence");
    if (ahora && d === hoy.d) c.push("hoy");
    if (libre(m, d)) c.push("libre");
    dias += `<span${c.length ? ` class="${c.join(" ")}"` : ""}>${d}</span>`;
  }
  const dichos = [...puntos].sort((a, b) => a - b);
  const etiqueta = `${cap(MES[m - 1])}${ahora ? ", el mes en curso" : ""}: vence el ${lista(dichos.map(String))}`;
  const estado = ahora ? " ahora" : m < hoy.m ? " pasado" : "";
  const abre = boton
    ? `<button type="button" class="mes-b" data-mes="${m}" aria-pressed="${ahora}" aria-label="${etiqueta}">`
    : `<div class="mes-b" role="img" aria-label="${etiqueta}">`;
  const cierra = boton ? "</button>" : "</div>";
  return `<li class="mes${estado}" style="--i:${m - 1}">${abre}<span class="mes-n">${MES[m - 1]}</span><span class="dias" aria-hidden="true">${dias}</span>${cierra}</li>`;
}

export function anioEnDoce(hoy, opciones) {
  let s = "";
  for (let m = 1; m <= 12; m++) s += celdaMes(m, hoy, opciones);
  return s;
}

// La hoja del taco de la home: lo que vence en el mes m
export function hojaVence(m, hoy) {
  const items = vence(m, { pec: false });
  let s = "";
  let hoyPuesto = m !== hoy.m;
  const filaHoy = () => `<li class="hoy-l"><span class="vd">${hoy.d}</span><span class="vw">${DIA_CORTO[dow(m, hoy.d)]}</span><span class="vq">Hoy</span><span class="ve"></span></li>`;
  for (const v of items) {
    if (!hoyPuesto && v.d > hoy.d) { s += filaHoy(); hoyPuesto = true; }
    const pasado = m < hoy.m || (m === hoy.m && v.d < hoy.d);
    const esHoy = m === hoy.m && v.d === hoy.d;
    if (esHoy) hoyPuesto = true;
    s += `<li class="${pasado ? "vencio" : esHoy ? "vence hoyvence" : "vence"}"><span class="vd">${v.d}</span><span class="vw">${DIA_CORTO[dow(m, v.d)]}</span><span class="vq">${v.que}</span><span class="ve">${pasado ? "venció" : esHoy ? "hoy" : ""}</span></li>`;
  }
  if (!hoyPuesto) s += filaHoy();
  return `<p class="taco-t"><span class="taco-m">${cap(MES[m - 1])}</span> <span class="taco-a">${ANIO}</span></p><ol class="vence-l" aria-label="Lo que vence en ${MES[m - 1]}">${s}</ol>`;
}

// El canto del taco: una línea por cada hoja que queda debajo (los meses que faltan del año)
export function canto(m) {
  return "<i></i>".repeat(12 - m);
}

// ---------------------------------------------------------------- este mes, día por día
export function tablaMes(m, hoy) {
  const n = diasEnMes(m);
  const vs = vence(m, { pec: true });
  const rs = rutina(m);
  const [, pelG, , pelFE] = F29[m];
  let s = "";
  for (let d = 1; d <= n; d++) {
    const v = vs.filter((x) => x.d === d);
    const r = rs.filter((x) => x.d === d);
    const f = feriado(m, d);
    const esHoy = m === hoy.m && d === hoy.d;
    const pasado = m < hoy.m || (m === hoy.m && d < hoy.d);
    const c = [];
    if (libre(m, d)) c.push("libre");
    if (esHoy) c.push("hoy");
    if (v.length) c.push(pasado ? "vencio" : "vence");
    if (pasado) c.push("pasado");
    const venceTxt = [];
    if (f) venceTxt.push(`<span class="fer">Feriado: ${f}.${(d === 12 && pelG !== 12) || (d === 20 && pelFE !== 20) ? " Lo que vencía hoy pasa al día hábil siguiente." : ""}</span>`);
    for (const x of v) venceTxt.push(`<span class="vq">${x.largo}</span>`);
    const hac = [...v.map((x) => x.hacemos), ...r.map((x) => x.hacemos)].filter(Boolean);
    const toc = [...v.map((x) => x.toca), ...r.map((x) => x.toca)].filter(Boolean);
    if (esHoy && !v.length) {
      const prox = vs.find((x) => x.d > d && x.tipo !== "pec");
      venceTxt.push(`<span class="vq">Hoy.${prox ? ` Lo próximo: ${DIA[dow(m, prox.d)]} ${prox.d}, ${minuscula(prox.que)}.` : ""}</span>`);
    }
    const vacio = !venceTxt.length && !hac.length && !toc.length;
    if (vacio) c.push("vacio");
    const dia = `<th scope="row"><span class="dn">${d}</span><span class="dw">${DIA_CORTO[dow(m, d)]}</span>${esHoy ? '<span class="dh">hoy</span>' : ""}</th>`;
    const celda = (et, xs) => `<td data-et="${et}">${xs.map((x) => `<p>${x}</p>`).join("")}</td>`;
    s += `<tr${c.length ? ` class="${c.join(" ")}"` : ""}${esHoy ? ' id="hoy" aria-current="date"' : ""}>${dia}${celda("Vence", venceTxt)}${celda("Hacemos", hac)}${celda("Te toca", toc)}</tr>`;
  }
  return s;
}

// ---------------------------------------------------------------- la hoja grande (interior)
export function hojaGrande(m, hoy) {
  const vs = vence(m, { pec: false });
  const off = (dow(m, 1) + 6) % 7;
  let dias = "";
  for (let i = 0; i < off; i++) dias += '<li class="nada" aria-hidden="true"></li>';
  for (let d = 1; d <= diasEnMes(m); d++) {
    const v = vs.filter((x) => x.d === d);
    const f = feriado(m, d);
    const esHoy = m === hoy.m && d === hoy.d;
    const pasado = m < hoy.m || (m === hoy.m && d < hoy.d);
    const c = [];
    if (libre(m, d)) c.push("libre");
    if (esHoy) c.push("hoy");
    if (v.length) c.push(pasado ? "vencio" : "vence");
    const ets = v.map((x) => `<span class="et">${x.corto}</span>`).join("");
    dias += `<li${c.length ? ` class="${c.join(" ")}"` : ""}${esHoy ? ' aria-current="date"' : ""}><span class="n">${d}</span>${ets}${f ? `<span class="fe">${f}</span>` : ""}</li>`;
  }
  const quedan = 12 - m; // hojas que quedan debajo en el taco
  return `<div class="hoja-cab"><h2 class="hoja-mes">${cap(MES[m - 1])}</h2><span class="hoja-anio">${ANIO}</span></div>`
    + `<ol class="hoja-sem" aria-hidden="true"><li>lun</li><li>mar</li><li>mié</li><li>jue</li><li>vie</li><li>sáb</li><li>dom</li></ol>`
    + `<ol class="hoja-dias">${dias}</ol>`
    + `<p class="sr">Quedan ${quedan + 1} ${quedan ? "hojas" : "hoja"} en el taco: ${lista(MES.slice(m - 1).map(String))}.</p>`;
}

// ---------------------------------------------------------------- el año completo (interior, estático)
export function tablaAnio(hoy = HOY_FIJO) {
  let s = "";
  for (let m = 1; m <= 12; m++) {
    const [pecG, pelG, pecFE, pelFE, sinMov] = F29[m];
    const b = (x, normal) => (x !== normal ? `<b title="Corrido al día hábil siguiente">${x}</b>` : `${x}`);
    const ademas = ANUALES.filter((a) => a.m === m).map((a) => `${a.d}: ${minuscula(a.que)}`).join("; ");
    s += `<tr${m === hoy.m ? ' class="ahora"' : ""}><th scope="row">${cap(MES[m - 1])}</th><td data-et="F29 en general (PEC · PEL)">${pecG} · ${b(pelG, 12)}</td><td data-et="F29 facturador electrónico (PEC · PEL)">${pecFE} · ${b(pelFE, 20)}</td><td data-et="Sin movimiento">${sinMov}</td><td data-et="Cotizaciones por internet">${COTIZACIONES}</td><td data-et="Además" class="ad">${ademas ? `<span>${ademas}</span>` : "" }${ademas ? "" : '<i class="raya-c" aria-hidden="true"></i><span class="sr">nada</span>'}</td></tr>`;
  }
  return s;
}

// El selector de meses del calendario: la misma retícula de 3 × 4 del símbolo
export function selector(hoy) {
  let s = "";
  for (let m = 1; m <= 12; m++) {
    const c = m === hoy.m ? "ahora" : m < hoy.m ? "pasado" : "";
    s += `<li${c ? ` class="${c}"` : ""}><button type="button" data-mes="${m}" aria-pressed="${m === hoy.m}" aria-controls="hoja"><span aria-hidden="true">${MES_CORTO[m - 1]}</span><span class="sr">${cap(MES[m - 1])}${m === hoy.m ? ", el mes en curso" : ""}</span></button></li>`;
  }
  return s;
}

// Las fechas que se corrieron en 2026: abril, la semana del 12
export function corre() {
  let s = "";
  for (let d = 10; d <= 14; d++) {
    const c = libre(4, d) ? "libre" : d === 13 ? "vence" : "";
    const x = d === 12 ? "no vence" : d === 13 ? "vence el F29" : "";
    s += `<li${c ? ` class="${c}"` : ""}><span class="d">${d}</span><span class="w">${DIA_CORTO[dow(4, d)]}</span>${x ? `<span class="x">${x}</span>` : ""}</li>`;
  }
  return s;
}

// ---------------------------------------------------------------- el símbolo
// Retícula de 3 × 4 casillas (enero arriba a la izquierda, diciembre abajo a la derecha);
// la del mes en curso va llena.
export function simbolo(mes, { celda = 6, hueco = 2, trazo = 1, chico = false, clase = "simbolo", titulo = "" } = {}) {
  const w = 3 * celda + 2 * hueco, h = 4 * celda + 3 * hueco;
  let r = "";
  for (let i = 0; i < 12; i++) {
    const x = (i % 3) * (celda + hueco), y = Math.floor(i / 3) * (celda + hueco);
    if (i + 1 === mes) r += `<rect class="lleno" x="${x}" y="${y}" width="${celda}" height="${celda}"/>`;
    else if (chico) r += `<rect class="vacio" x="${x}" y="${y}" width="${celda}" height="${celda}"/>`;
    else r += `<rect class="vacio" x="${x + trazo / 2}" y="${y + trazo / 2}" width="${celda - trazo}" height="${celda - trazo}" stroke-width="${trazo}"/>`;
  }
  const t = titulo ? `<title>${titulo}</title>` : "";
  return `<svg class="${clase}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" ${titulo ? 'role="img"' : 'aria-hidden="true"'} data-mes="${mes}">${t}${r}</svg>`;
}
