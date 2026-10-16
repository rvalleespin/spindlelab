// Precargado: registra y bloquea cualquier intento de red (fetch, net, tls, http, https, dns, undici).
import { appendFileSync } from 'node:fs';
import net from 'node:net'; import tls from 'node:tls'; import http from 'node:http'; import https from 'node:https'; import dns from 'node:dns';
const LOG = process.env.SINRED_LOG || '/dev/stderr';
const anota = (q) => { try { appendFileSync(LOG, `RED ${q}\n`); } catch {} };
globalThis.fetch = async (u) => { anota(`fetch ${u}`); throw new Error('red bloqueada'); };
for (const [m, o, ks] of [['net', net, ['connect','createConnection']], ['tls', tls, ['connect']], ['http', http, ['request','get']], ['https', https, ['request','get']], ['dns', dns, ['lookup','resolve']]]) {
  for (const k of ks) { const orig = o[k]; o[k] = (...a) => { anota(`${m}.${k}`); throw new Error('red bloqueada'); }; }
}
