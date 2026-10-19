// EL TEXTO DE CLARA PARA LAS PÁGINAS DE A (obra E12). Las copias de texto/<pagina>.json salen tal cual de
// e12/texto/texto-obra.json con construccion/herramientas/extraer-texto.mjs (tanda 2): aquí solo se buscan por su id.
// Un id que no existe hace fallar el build, para que ningún texto se escriba a mano en una página.
//
//   import home from './texto/home.json';
//   const t = textoDe(home);
//   t('home.portada.rotulo').texto
//
// Es .mjs y no .ts a propósito: Tailwind (tailwind.config.mjs, que no se toca) lee las palabras de los .ts y .astro de
// src/, y una palabra suya que coincida con una clase cambiaría el CSS de las páginas publicadas (desvios.md, tanda 1).

export function textoDe(...copias) {
  const indice = new Map();
  const recorrer = (nodo) => {
    if (Array.isArray(nodo)) { nodo.forEach(recorrer); return; }
    if (!nodo || typeof nodo !== 'object') return;
    if (typeof nodo.id === 'string' && !indice.has(nodo.id)) indice.set(nodo.id, nodo);
    Object.values(nodo).forEach(recorrer);
  };
  copias.forEach((c) => recorrer(c.texto));
  return (id) => {
    const e = indice.get(id);
    if (!e) throw new Error(`Falta el texto «${id}» en las copias de texto-obra.json (extraer-texto.mjs)`);
    return e;
  };
}

// Un precio o un nombre de la oferta, comparado como texto con el de Clara (brief §6.4, spec §6.9): si no son iguales,
// el build se cae en vez de publicar una cifra distinta a la de los JSON.
export function igualQue(dato, deClara, donde) {
  if (dato !== deClara) {
    throw new Error(`${donde}: el dato dice «${dato}» y el texto de Clara «${deClara}»`);
  }
  return dato;
}

// Que un texto de Clara contenga el dato tal cual (el precio dentro de una frase).
export function contiene(deClara, dato, donde) {
  if (!deClara.includes(dato)) {
    throw new Error(`${donde}: el texto de Clara no contiene «${dato}»`);
  }
  return deClara;
}

// Un medio de Clara (su alt, su pie) por el nombre de su archivo, en la copia de una página: los medios de
// texto-obra.json no tienen id, se nombran por «archivo».
export function medioDe(copia, archivo) {
  let hallado = null;
  const recorrer = (nodo) => {
    if (hallado) return;
    if (Array.isArray(nodo)) { nodo.forEach(recorrer); return; }
    if (!nodo || typeof nodo !== 'object') return;
    if (typeof nodo.archivo === 'string' && nodo.archivo.endsWith(`/${archivo}`)) { hallado = nodo; return; }
    Object.values(nodo).forEach(recorrer);
  };
  recorrer(copia.texto);
  if (!hallado) throw new Error(`Falta el medio «${archivo}» en la copia «${copia.id}» de texto-obra.json`);
  return hallado;
}
