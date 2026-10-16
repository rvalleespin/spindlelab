import { readFileSync, appendFileSync } from 'node:fs';
const png = readFileSync(process.env.PNG_PRUEBA).toString('base64');
globalThis.fetch = async (u, o) => { appendFileSync(process.env.SINRED_LOG, `FETCH ${u}\n`);
  return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ inlineData: { mimeType: 'image/png', data: png } }] }, finishReason: 'STOP' }], modelVersion: 'x' }), { status: 200 }); };
