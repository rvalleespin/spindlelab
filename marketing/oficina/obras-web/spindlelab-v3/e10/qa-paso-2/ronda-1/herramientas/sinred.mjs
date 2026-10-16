// Preload: cualquier intento de red se registra y falla.
import net from 'node:net'; import tls from 'node:tls'; import dns from 'node:dns'; import http from 'node:http'; import https from 'node:https';
const marca = (q) => { process.stderr.write(`\n[SINRED] intento de red: ${q}\n`); };
globalThis.fetch = async (u, o) => { marca('fetch ' + String(u) + ' headers=' + JSON.stringify(o?.headers ?? {})); throw new TypeError('fetch failed (bloqueado por la prueba)'); };
for (const [m, k] of [[net,'connect'],[net,'createConnection'],[tls,'connect'],[http,'request'],[https,'request'],[http,'get'],[https,'get'],[dns,'lookup']]) { const o=m[k]; m[k]=(...a)=>{ marca(k+' '+JSON.stringify(a[0]).slice(0,80)); return o.apply(m,a); }; }
