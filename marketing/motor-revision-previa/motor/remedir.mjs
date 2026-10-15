#!/usr/bin/env node
// Remedir ANTES de un seguimiento: ¿el hecho que se afirmo en el primer correo sigue siendo cierto hoy?
// (estrategia §14, trampa 4: "un toque 3 que afirma un hecho tecnico en presente deberia remedirse antes de enviarse").
//   node remedir.mjs <ficha.json> [--out <carpeta>]
// Respeta la lista de exclusion (si el prospecto pidio baja, NO se mide). Salida: remedicion.json y remedicion.md junto a la ficha original.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const fichaPath = path.resolve(process.argv[2] || '');
if (!fs.existsSync(fichaPath)) { console.error('Uso: node remedir.mjs <ficha.json> [--out <carpeta>]'); process.exit(2); }
const i = process.argv.indexOf('--out');
const antes = JSON.parse(fs.readFileSync(fichaPath, 'utf8'));
const salida = path.resolve(i >= 0 ? process.argv[i + 1] : path.dirname(fichaPath), 'remedicion');
fs.mkdirSync(salida, { recursive: true });
const aqui = path.dirname(new URL(import.meta.url).pathname);

if (!antes.hallazgo) { console.log(JSON.stringify({ sigue: null, motivo: 'la ficha original no tenia hallazgo: no hay nada que remedir' })); process.exit(0); }
const r = spawnSync(process.execPath, ['--no-warnings', path.join(aqui, 'revisar.mjs'), antes.dominio, '--id', 'R', '--out', salida, '--remedir'], { env: { ...process.env, NODE_USE_ENV_PROXY: '1' }, encoding: 'utf8', timeout: 900000 });
const nuevaPath = path.join(salida, 'R', 'ficha.json');
if (!fs.existsSync(nuevaPath)) { console.log(JSON.stringify({ sigue: null, motivo: 'no se pudo remedir', detalle: (r.stderr || '').slice(-300) })); process.exit(1); }
const ahora = JSON.parse(fs.readFileSync(nuevaPath, 'utf8'));

let veredicto;
if (ahora.resultado?.startsWith('descartado')) veredicto = { sigue: null, motivo: `no se pudo medir: ${ahora.resultado}`, accion: 'NO afirmar nada técnico en el seguimiento.' };
else {
  const id = antes.hallazgo.id;
  const vigentes = [ahora.hallazgo, ...(ahora.ruta_interna || [])].filter((c) => c && c.estado === 'estable');
  const igual = vigentes.find((c) => c.id === id);
  if (!igual) veredicto = { sigue: false, motivo: `el hallazgo ${id} ya no se repite en las corridas de hoy`, accion: 'NO afirmarlo en presente. Si hay otra oferta vigente, usarla; si no, el seguimiento va sin afirmación técnica.' };
  else if (id === 'C1') {   // las cookies que se afirmaron: ¿siguen?
    const antesC = new Set((antes.soporte?.c1?.cookies || []).map((c) => c.nombre)), hoy = new Set((ahora.soporte?.c1?.cookies || []).map((c) => c.nombre));
    const siguen = [...antesC].filter((n) => hoy.has(n));
    veredicto = siguen.length ? { sigue: true, motivo: `siguen ${siguen.length} de ${antesC.size} cookies afirmadas`, accion: 'Se puede afirmar en presente, solo con las que siguen.', cookies_que_siguen: siguen } : { sigue: false, motivo: 'las cookies afirmadas ya no aparecen', accion: 'NO afirmarlo.' };
  } else veredicto = { sigue: true, motivo: `el hallazgo ${id} se repite hoy`, accion: 'Se puede afirmar en presente.' };
}
const salidaJson = { dominio: antes.dominio, medido_antes: antes.cuando, medido_ahora: ahora.cuando, hallazgo_original: antes.hallazgo.id, resultado_ahora: ahora.resultado, principal_ahora: ahora.hallazgo?.id || null, ...veredicto };
fs.writeFileSync(path.join(salida, 'remedicion.json'), JSON.stringify(salidaJson, null, 2));
fs.writeFileSync(path.join(salida, 'remedicion.md'), `# Remedición\n\n- **sitio:** ${antes.dominio}\n- **medido antes:** ${antes.cuando} · **ahora:** ${ahora.cuando}\n- **hallazgo original:** ${antes.hallazgo.id}\n- **¿sigue siendo cierto?** ${veredicto.sigue === true ? 'SÍ' : veredicto.sigue === false ? 'NO' : 'NO SE PUDO MEDIR'}\n- **por qué:** ${veredicto.motivo}\n- **qué hacer en el seguimiento:** ${veredicto.accion}\n`);
console.log(JSON.stringify(salidaJson));
