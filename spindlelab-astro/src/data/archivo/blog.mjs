// EL BLOG SOBRE A (obra E12, corrida 2, tanda 5): el índice /v3/blog/ y la plantilla de los siete artículos. Diego,
// 19-oct-2026.
//
// Contrato: spec-visual.md §2.5. El índice es el /latest de Koto sin imágenes: la barra lateral (h1 en dos tintas, «(7)»
// y la línea de Clara) y los siete como filas (fecha y tema en dato mono a la izquierda, el título a Título enlazado a
// la derecha), con el cierre del blog al final. El artículo es la plantilla del caso (§2.3) con otro contenido: en la
// barra, la miga, el h1, la ficha, el autor y el índice de sus h2; en la columna, el cuerpo verbatim con tope de 493.
//
// EL CUERPO VA TAL CUAL ESTÁ EN data/blog-v3/<slug>.html (en E12 era el HTML publicado; en E13 se corrigió a mano donde
// afirmaba algo que no se sostenía, ver e13/desvios/blog.md). Esta plantilla no le cambia una letra. Lo que toca es
// marcado, nunca texto:
//   · los enlaces internos apuntan a /v3/ y los que van a un id de la misma página llevan su ruta (spec §5.2.2: nunca
//     «#x» suelto);
//   · cada h2 sin id recibe uno (el mismo cálculo que en driftime: el id #como-medir-si-esta-funcionando lo usan el
//     método y Visibilidad en IA) y el id pasa del h2 a su sección;
//   · el cuerpo se parte en secciones, una por h2, con el h2 a la izquierda y lo demás a la derecha, como las secciones
//     del caso; una tabla ocupa las dos mitades;
//   · el índice en prosa («En esta guía: …», en los 21 chequeos) lleva `hidden`, porque el de la barra dice lo mismo.
// El build se cae si un artículo no trae esa estructura, si al partirlo se pierde un carácter, si un tema no es uno de
// los que nombra Clara, o si el FAQPage marca una pregunta que no se ve.
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .astro, .ts y .js
// de src/, y una que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1).
import indice from '../blog-v3/_indice.json';
import paginas from '../paginas-v3.json';
import { textoDe, igualQue } from './texto.mjs';
import comun from './texto/comun.json';
import tBlog from './texto/blog.json';

const cuerpos = import.meta.glob('../blog-v3/*.html', { query: '?raw', import: 'default', eager: true });
const datos = import.meta.glob('../blog-v3/*.json', { eager: true });
const slugDe = (ruta) => ruta.split('/').pop().replace(/\.(html|json)$/, '');

const t = textoDe(tBlog, comun);
const SITIO = 'https://spindlelab.cl';
// El cierre del blog (E13): el texto sale de blog.cierre.* de Clara y se compara con el dato (paginas-v3.json blog.cierre).
// La acción principal es «Pedir la revisión de una página» a /contacto/; el chequeo queda como segundo botón.
const cierre = () => {
  const c = { h2: t('blog.cierre.h2').texto, guia: t('blog.cierre.guia').texto, cuerpo: t('blog.cierre.cuerpo').texto };
  for (const k of Object.keys(c)) igualQue(c[k], paginas.blog.cierre[k], `blog, el cierre (${k})`);
  const [cta, chequeo] = [t('blog.cierre.cta'), t('blog.cierre.chequeo')];
  return { ...c, botones: [{ texto: cta.texto, href: cta.destino }, { texto: chequeo.texto, href: chequeo.destino }] };
};

// Del más reciente al más antiguo, con el mismo comparador de antes (los tres del 7-jul quedan en el mismo orden que en
// el ItemList de hoy y que «Siguiente artículo»)
export const POSTS = [...indice].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
export const SLUGS = POSTS.map((p) => p.slug);

const fechaCorta = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
const fechaLarga = (iso) => new Date(String(iso).slice(0, 10) + 'T12:00:00').toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
const plano = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;| /g, ' ').replace(/\s+/g, ' ').trim();

// Los temas que nombra Clara (blog.filas): el de cada artículo tiene que ser uno de ellos. El byline publicado de
// fintechs dice «SEO Técnico»: va en caja de oración, como lo escribe Clara y como lo hacía driftime (antislop A6).
const TEMAS = ['Metodología', 'Visibilidad en IA', 'Guía de compra', 'Guía de precios', 'Guía para gerentes', 'Guía del método', 'SEO técnico'];
const CAJA = { 'SEO Técnico': 'SEO técnico' };

const crudoDe = (slug) => {
  const c = Object.entries(cuerpos).find(([r]) => slugDe(r) === slug)?.[1];
  if (!c) throw new Error(`blog: no está data/blog-v3/${slug}.html`);
  return c;
};
const infoDe = (slug) => {
  const e = Object.entries(datos).find(([r]) => slugDe(r) === slug)?.[1];
  if (!e) throw new Error(`blog: no está data/blog-v3/${slug}.json`);
  return e.default ?? e;
};

// ---- la cabeza del post publicado: miga, h1, byline (tema · fecha · lectura) y autor
const MARCA_PROSA = '<div class="prose">';
function cabezaDe(slug) {
  const crudo = crudoDe(slug);
  const i = crudo.indexOf(MARCA_PROSA);
  if (i < 0) throw new Error(`blog-v3/${slug}.html: no trae el bloque <div class="prose">`);
  const cabeza = crudo.slice(0, i);
  const h1 = cabeza.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].trim();
  if (!h1) throw new Error(`blog-v3/${slug}.html: no trae <h1>`);
  const corta = [...(cabeza.match(/<nav class="crumbs"[\s\S]*?<\/nav>/)?.[0] ?? '').matchAll(/<li>([\s\S]*?)<\/li>/g)].pop()?.[1].trim();
  if (!corta) throw new Error(`blog-v3/${slug}.html: su miga no trae el nombre corto`);
  const byline = cabeza.match(/<p class="byline">([\s\S]*?)<\/p>/)?.[1] ?? '';
  const temaPublicado = byline.match(/<b>([\s\S]*?)<\/b>/)?.[1].trim();
  const tema = CAJA[temaPublicado] ?? temaPublicado;
  if (!TEMAS.includes(tema)) throw new Error(`blog-v3/${slug}.html: el tema «${tema}» no es uno de los de Clara`);
  const lectura = [...byline.matchAll(/<span>([\s\S]*?)<\/span>/g)].map((m) => m[1].trim()).find((x) => /^Lectura: /.test(x));
  if (!lectura) throw new Error(`blog-v3/${slug}.html: el byline no dice el tiempo de lectura`);
  return { crudo, iProsa: i, h1, corta: plano(corta), tema, lectura: lectura.replace(/^Lectura: /, '') };
}

// ---- un id para cada h2 (el de driftime: el que ya trae se respeta; si no, sale del texto)
const idDe = (texto) => texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

// ---- el cuerpo partido en sus elementos de primer nivel, sin perder un carácter
const VACIOS = new Set(['br', 'img', 'hr', 'input', 'meta', 'link', 'source', 'wbr', 'col']);
function primerNivel(html, slug) {
  const out = [];
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  let prof = 0;
  let inicio = -1;
  let fin = 0;
  let m;
  while ((m = re.exec(html))) {
    const etiqueta = m[0];
    const nombre = m[1].toLowerCase();
    if (VACIOS.has(nombre) || etiqueta.endsWith('/>')) {
      if (prof === 0) { out.push(etiqueta); fin = re.lastIndex; }
      continue;
    }
    if (etiqueta.startsWith('</')) {
      prof--;
      if (prof === 0) { out.push(html.slice(inicio, re.lastIndex)); fin = re.lastIndex; }
      if (prof < 0) throw new Error(`blog-v3/${slug}.html: el cuerpo cierra una etiqueta que no abrió`);
    } else {
      if (prof === 0) {
        if (html.slice(fin, m.index).trim()) throw new Error(`blog-v3/${slug}.html: texto suelto fuera de un elemento`);
        inicio = m.index;
      }
      prof++;
    }
  }
  if (prof !== 0 || html.slice(fin).trim()) throw new Error(`blog-v3/${slug}.html: el cuerpo no cierra donde se espera`);
  if (plano(out.join(' ')) !== plano(html)) throw new Error(`blog-v3/${slug}.html: al partir el cuerpo cambió el texto`);
  return out;
}

// El autor (Clara, «articulo.autor»: «Ramón Vallejos · Fundador de SpindleLab»): el nombre en blanco y el rol debajo,
// con el retrato que ya existe (la miniatura de 132 × 132 que hizo la QA de driftime; alt vacío: el nombre está al lado)
const autor = () => {
  const texto = t('articulo.autor').texto;
  const i = texto.indexOf(' · ');
  if (i < 0) throw new Error('blog: el autor de Clara no trae «nombre · rol»');
  return { src: '/assets/img/ramon-vallejos-avatar.jpg', nombre: texto.slice(0, i), rol: texto.slice(i + 3) };
};

export function articulo(slug) {
  const info = infoDe(slug);
  const meta = info.meta;
  const { crudo, iProsa, h1, corta, tema, lectura } = cabezaDe(slug);
  const ruta = `/v3/blog/${slug}/`;

  // El bloque .prose: el archivo termina en «</div> </div>» (prose y el contenedor .wrap)
  const iCierreWrap = crudo.lastIndexOf('</div>');
  const iCierreProsa = crudo.lastIndexOf('</div>', iCierreWrap - 1);
  if (crudo.slice(iCierreWrap + 6).trim() || crudo.slice(iCierreProsa + 6, iCierreWrap).trim()) {
    throw new Error(`blog-v3/${slug}.html: el bloque .prose no cierra donde se espera`);
  }
  const prosa = crudo.slice(iProsa + MARCA_PROSA.length, iCierreProsa);

  // Los enlaces: los del sitio publicado pasan a /v3/ (solo los prefijos que existen en v3: no se inventan destinos) y
  // los que van a un id de esta misma página llevan su ruta
  const RUTAS = ['blog', 'servicios', 'diagnostico', 'contacto', 'metodo', 'nosotros'];
  const enlazado = prosa
    .replace(new RegExp(`href="/(${RUTAS.join('|')})/`, 'g'), 'href="/v3/$1/')
    .replace(/href="\/"/g, 'href="/v3/"')
    .replace(/href="#([^"]+)"/g, `href="${ruta}#$1"`);

  // Las secciones: una por h2, con su id (el que trae o uno nuevo)
  const nodos = primerNivel(enlazado, slug);
  const usados = new Set();
  const intro = [];
  const secciones = [];
  for (const n of nodos) {
    const h2 = n.match(/^<h2([^>]*)>([\s\S]*?)<\/h2>$/);
    if (h2) {
      const texto = plano(h2[2]);
      const trae = h2[1].match(/\bid="([^"]+)"/);
      let id = trae ? trae[1] : idDe(texto);
      const base = id;
      let k = 2;
      while (usados.has(id)) id = `${base}-${k++}`;
      usados.add(id);
      const otros = h2[1].replace(/\s*\bid="[^"]*"/, '').trim();
      if (otros) throw new Error(`blog-v3/${slug}.html: un h2 trae atributos que esta plantilla no sabe llevar (${otros})`);
      secciones.push({ id, nombre: texto, h2: h2[2], partes: [] });
      continue;
    }
    const destino = secciones.length ? secciones[secciones.length - 1].partes : intro;
    const tabla = /^<table\b/.test(n);
    const ultima = destino[destino.length - 1];
    if (!tabla && ultima && ultima.tipo === 'texto') ultima.html += `\n${n}`;
    else destino.push({ tipo: tabla ? 'tabla' : 'texto', html: n });
  }
  if (secciones.length < 3) throw new Error(`blog-v3/${slug}.html: con menos de tres h2 el índice no orienta`);
  // Todo enlace a un id de esta página tiene que llevar a una sección o a un id que exista
  const ids = new Set([...secciones.map((s) => s.id), ...[...prosa.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1])]);
  for (const [, id] of enlazado.matchAll(new RegExp(`href="${ruta}#([^"]+)"`, 'g'))) {
    if (!ids.has(id)) throw new Error(`blog-v3/${slug}.html: un enlace lleva a #${id}, que no existe`);
  }
  // El índice en prosa («En esta guía: …»): con el de la barra, eran dos índices (QA del 5-oct, antislop A10)
  const ocultarGuia = (p) => p.replace(/<p>(\s*<strong>En esta guía:<\/strong>)/, '<p hidden>$1');
  intro.forEach((p) => { p.html = ocultarGuia(p.html); });

  // FAQPage = FAQ visible (QA final de driftime, técnica #10)
  const faqVisible = [...prosa.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p class="faq-a">([\s\S]*?)<\/p>/g)].map((x) => ({ p: plano(x[1]), r: plano(x[2]) }));
  for (const n of info.jsonLd['@graph'].filter((x) => x['@type'] === 'FAQPage')) {
    for (const q of n.mainEntity ?? []) {
      const v = faqVisible.find((x) => x.p === plano(q.name));
      if (!v || !v.r.includes(plano(q.acceptedAnswer?.text ?? ''))) {
        throw new Error(`blog-v3/${slug}.json: la pregunta «${q.name}» del FAQPage no está visible en el post (o su respuesta dice otra cosa)`);
      }
    }
  }

  // El grafo del post (Simón §2.9: queda), sin los nodos que ya emite el Layout (#org, #autor-ramon), con la miga que se
  // ve (posición 2 «Blog», 3 el nombre corto) y la imagen del Article en su tarjeta nueva
  // ?v=2 (E13): tres de las siete tarjetas se rehicieron porque su titular cambió
  const og = { src: `/assets/img/og-e12-blog-${slug}.jpg?v=2`, alt: `SpindleLab: ${plano(h1)}` };
  const DEL_LAYOUT = new Set([`${SITIO}/#org`, `${SITIO}/#autor-ramon`]);
  const jsonLd = {
    ...info.jsonLd,
    '@graph': info.jsonLd['@graph']
      .filter((n) => !DEL_LAYOUT.has(n['@id']))
      .map((n) => (n['@type'] === 'Article' ? { ...n, image: `${SITIO}${og.src}` } : n))
      .map((n) => (n['@type'] === 'BreadcrumbList'
        ? { ...n, itemListElement: n.itemListElement.map((it) => (it.position === 2 ? { ...it, name: 'Blog' } : it.position === 3 ? { ...it, name: corta } : it)) }
        : n)),
  };

  const i = SLUGS.indexOf(slug);
  const sig = POSTS[(i + 1) % POSTS.length];
  return {
    ruta, meta, jsonLd, og,
    miga: ['Inicio', 'Blog', corta],
    h1,
    ficha: [
      { rotulo: 'Tema', valor: tema },
      { rotulo: 'Fecha', valor: fechaLarga(meta.datePublished), iso: meta.datePublished },
      { rotulo: 'Lectura', valor: lectura },
    ],
    autor: autor(),
    indiceRotulo: t('articulo.indice.rotulo').texto,
    nombreSecciones: t('comun.secciones').texto,
    nombreBarra: t('comun.secciones.barra').texto,
    intro,
    secciones,
    cierre: cierre(),
    siguiente: { rotulo: t('articulo.siguiente').texto, titulo: sig.headline, href: `/v3/blog/${sig.slug}/` },
  };
}

export function indiceBlog() {
  const pagina = tBlog.texto;
  const miga = t('blog.miga').texto.split(' · ');
  const h1 = t('blog.h1');
  igualQue(t('blog.conteo').texto, `(${POSTS.length})`, 'blog, el conteo');
  igualQue(t('blog.linea').texto, paginas.blog.linea, 'blog, la línea');
  const filas = POSTS.map((p) => ({
    titulo: p.headline,
    href: `/v3/blog/${p.slug}/`,
    fecha: fechaCorta(p.datePublished),
    iso: p.datePublished,
    tema: cabezaDe(p.slug).tema,
  }));
  const title = pagina.title;
  const description = pagina.description;
  if (title.length > 60 || description.length < 120 || description.length > 160) throw new Error('blog: title o description fuera de los largos de Simón');
  const url = `${SITIO}/blog/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collectionpage`,
        url,
        name: 'Blog · SpindleLab',
        description,
        inLanguage: 'es-CL',
        isPartOf: { '@id': `${SITIO}/#website` },
        mainEntity: { '@id': `${url}#itemlist` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: miga[0], item: `${SITIO}/` },
          { '@type': 'ListItem', position: 2, name: miga[1] },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        itemListElement: POSTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.headline, url: p.canonical })),
      },
    ],
  };
  return {
    title, description, jsonLd,
    og: { src: '/assets/img/og-e12-blog.jpg?v=1', alt: `SpindleLab: ${h1.tinta} ${h1.gris}` },
    miga, h1: { tinta: h1.tinta, gris: h1.gris }, conteo: t('blog.conteo').texto, linea: t('blog.linea').texto,
    filas,
    cierre: cierre(),
  };
}
