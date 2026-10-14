// fetch con tiempo limite y UA elegible. En el entorno cloud hay que correr con
// NODE_USE_ENV_PROXY=1 (el fetch de Node no lee HTTPS_PROXY solo). En el Mac no hace falta.
export const UA_NORMAL =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

export async function pedir(url, { ua = UA_NORMAL, ms = 15000, metodo = 'GET', redirect = 'follow' } = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), ms);
  try {
    const r = await fetch(url, {
      method: metodo, redirect, signal: ctl.signal,
      headers: { 'user-agent': ua, accept: 'text/html,application/xhtml+xml,*/*;q=0.8', 'accept-language': 'es-CL,es;q=0.9' },
    });
    const cuerpo = metodo === 'HEAD' ? '' : (await r.text()).slice(0, 600000);
    const cab = {};
    r.headers.forEach((v, k) => { cab[k] = v; });
    return { ok: true, status: r.status, url: r.url, cab, cuerpo };
  } catch (e) {
    return { ok: false, error: e.name === 'AbortError' ? 'timeout' : String(e.cause?.code || e.message) };
  } finally { clearTimeout(t); }
}
