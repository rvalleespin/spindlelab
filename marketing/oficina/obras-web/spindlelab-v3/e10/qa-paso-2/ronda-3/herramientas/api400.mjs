import { appendFileSync } from 'node:fs';
const LOG = process.env.SINRED_LOG;
globalThis.fetch = async (u, o) => {
  const h = JSON.stringify(o?.headers ?? {});
  appendFileSync(LOG, `FETCH ${u} headers=${h.length}b url_tiene_clave=${String(u).includes(process.env.GEMINI_API_KEY||'@@')}\n`);
  const k = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
  return new Response(JSON.stringify({ error: { message: `API key not valid: ${k} (prefix ${k.slice(0,12)}...)` } }), { status: 400, statusText: 'Bad Request' });
};
