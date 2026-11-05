#!/usr/bin/env node
// Paquete de verificacion humana. Una pagina HTML con una tarjeta por hallazgo fuerte: la captura que lo prueba,
// la frase exacta que el correo diria y los 30 segundos de pasos para comprobarlo. Ramon marca Coincide / No coincide / Dudoso
// y descarga `verificaciones.csv`. El exportador usa ese CSV para dejar pasar a Emilia solo lo verificado.
//   node verificar.mjs <carpeta-del-lote> [--fuerza fuerte,media]
// NO envia nada. NO toca ventas/. Escribe <carpeta>/verificacion/index.html (con capturas copiadas al lado).
import fs from 'node:fs';
import path from 'node:path';
import { descartadoAntes } from './pasadas/p0.mjs';

const args = process.argv.slice(2);
const dir = path.resolve(args.find((a) => !a.startsWith('--')) || '');
const fi = args.indexOf('--fuerza'); const fuerzas = new Set((fi >= 0 ? args[fi + 1] : 'fuerte').split(','));
if (!fs.existsSync(dir)) { console.error('Uso: node verificar.mjs <carpeta-del-lote> [--fuerza fuerte,media]'); process.exit(2); }
const GENERICO = /^(contacto|info|hola|gerencia|administracion\d*|secretaria|ventas|atencionalcliente|comunicaciones|operaciones|propiedades|infochile|somos|reservas|recepcion)@/i;
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const lista = fs.existsSync(path.join(dir, 'lista.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'lista.json'), 'utf8')).leads : [];
const out = path.join(dir, 'verificacion'); fs.mkdirSync(out, { recursive: true });

const tarjetas = []; let omitidos = 0;
for (const id of fs.readdirSync(dir).filter((x) => /^[A-Z]+\d+$/.test(x)).sort()) {
  const p = path.join(dir, id, 'ficha.json'); if (!fs.existsSync(p)) continue;
  const f = JSON.parse(fs.readFileSync(p, 'utf8')); const h = f.hallazgo, pr = h?.propuesta;
  if (!h || !pr || !fuerzas.has(pr.fuerza) || h.estado !== 'estable') { omitidos++; continue; }
  const previo = descartadoAntes(f.dominio); if (previo) { omitidos++; continue; }   // ya marcado como no escribir en ventas/
  const lead = lista.find((l) => l.id === id) || {};
  const correo = lead.correo || ''; const generico = GENERICO.test(correo);
  const capturas = ['r1-A.jpg', 'r1-B.jpg'].filter((c) => fs.existsSync(path.join(dir, id, c)));
  for (const c of capturas) fs.copyFileSync(path.join(dir, id, c), path.join(out, `${id}-${c}`));
  tarjetas.push({ id, dominio: f.dominio, empresa: lead.empresa || '', correo, generico, oferta: h.id, linea: h.linea, fuerza: pr.fuerza,
    dice: h.afirmable, no: h.no_afirmable || [], donde: h.donde_mirar, castellano: pr.en_castellano, avisos: [...(h.advertencias || []), ...(f.notas?.advertencias || f.notas || []).filter?.((x) => typeof x === 'string') || []], capturas });
}
const html = `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Verificación de hallazgos</title>
<style>:root{--bg:#fafaf7;--fg:#1a1a1a;--mut:#666;--card:#fff;--bd:#ddd;--ok:#1d7a3a;--no:#b3261e;--du:#8a6d00}@media(prefers-color-scheme:dark){:root{--bg:#141414;--fg:#eee;--mut:#9a9a9a;--card:#1d1d1d;--bd:#333;--ok:#6fcf8a;--no:#ff8a80;--du:#e6c75a}}
body{background:var(--bg);color:var(--fg);font:16px/1.5 Inter,system-ui,sans-serif;margin:0;padding:16px;max-width:900px;margin-inline:auto}h1{font-size:1.3rem}.c{background:var(--card);border:1px solid var(--bd);border-radius:10px;padding:14px;margin:14px 0}
.m{color:var(--mut);font-size:.9rem}.b{display:inline-block;border:1px solid var(--bd);border-radius:6px;padding:2px 8px;font-size:.8rem;margin-right:6px}.w{border-color:var(--no);color:var(--no)}
img{max-width:100%;border:1px solid var(--bd);border-radius:6px;margin:6px 0}button{font:inherit;padding:8px 14px;border-radius:8px;border:1px solid var(--bd);background:var(--card);color:var(--fg);cursor:pointer;margin-right:8px}
button.s{outline:3px solid currentColor}.ok{color:var(--ok)}.no{color:var(--no)}.du{color:var(--du)}ul{margin:.3rem 0 .3rem 1.1rem;padding:0}.top{position:sticky;top:0;background:var(--bg);padding:8px 0;border-bottom:1px solid var(--bd)}</style>
<div class="top"><h1>Verificación de hallazgos (${tarjetas.length})</h1><span class="m">Abre el sitio, mira lo que dice la tarjeta, marca una opción. Al terminar: </span><button id="dl">Descargar verificaciones.csv</button> <span id="n" class="m"></span></div>
${tarjetas.map((t) => `<section class="c" data-id="${t.id}" data-dom="${esc(t.dominio)}"><div><span class="b">${t.id}</span><span class="b">${esc(t.oferta)} · ${esc(t.fuerza)}</span>${t.generico ? '<span class="b w">correo genérico: buscar dueño</span>' : ''}</div>
<h2><a href="https://${esc(t.dominio)}" target="_blank" rel="noopener">${esc(t.empresa || t.dominio)}</a> <span class="m">${esc(t.dominio)}</span></h2>
<p><b>Lo que el correo diría:</b> ${esc(t.castellano)}</p><p><b>Lo que midió el motor:</b> ${esc(t.dice)}</p><p><b>Cómo comprobarlo (30 s):</b> ${esc(t.donde)}</p>
<details><summary class="m">Lo que NO se puede afirmar (${t.no.length})</summary><ul>${t.no.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>
${t.avisos.length ? `<p class="no">Avisos: ${t.avisos.map(esc).join(' | ')}</p>` : ''}${t.capturas.map((c) => `<div class="m">${c.replace('.jpg', '')}</div><img loading="lazy" src="${t.id}-${c}" alt="Captura ${c} de ${esc(t.dominio)}">`).join('')}
<div><button data-v="coincide" class="ok">Coincide</button><button data-v="no_coincide" class="no">No coincide</button><button data-v="dudoso" class="du">Dudoso</button> <input placeholder="nota (opcional)" size="30"></div></section>`).join('\n')}
<script>
const K='verif-${path.basename(dir)}';let S={};try{S=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}document.getElementById('n').textContent=Object.values(S).filter(x=>x.v).length+' de ${tarjetas.length} marcados'};
document.querySelectorAll('.c').forEach(c=>{const id=c.dataset.id;S[id]=S[id]||{v:'',n:''};const inp=c.querySelector('input');inp.value=S[id].n||'';inp.oninput=()=>{S[id].n=inp.value;save()};
c.querySelectorAll('button').forEach(b=>{if(S[id].v===b.dataset.v)b.classList.add('s');b.onclick=()=>{S[id].v=b.dataset.v;c.querySelectorAll('button').forEach(x=>x.classList.toggle('s',x===b));save()}})});save();
document.getElementById('dl').onclick=()=>{const rows=[['id','dominio','veredicto','nota']];document.querySelectorAll('.c').forEach(c=>{const s=S[c.dataset.id];rows.push([c.dataset.id,c.dataset.dom,s.v,s.n])});
const csv=rows.map(r=>r.map(x=>'"'+String(x||'').replace(/"/g,'""')+'"').join(',')).join('\\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='verificaciones.csv';a.click()};
</script></html>`;
fs.writeFileSync(path.join(out, 'index.html'), html);
console.log(`${tarjetas.length} tarjetas (${omitidos} omitidos: sin hallazgo estable de fuerza ${[...fuerzas].join('/')}) -> ${path.relative(process.cwd(), path.join(out, 'index.html'))}`);
