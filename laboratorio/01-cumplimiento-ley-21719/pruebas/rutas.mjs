/**
 * Dónde está el código que estas pruebas prueban.
 *
 * Antes cada archivo lo decía con una ruta absoluta a `/tmp/vyc-sub-wt/...` o
 * `/tmp/spl-main-wt/...`, que son carpetas efímeras. Eso tiene dos formas de salir mal, y
 * las dos ya pasaron:
 *
 *   - la carpeta deja de ser un repositorio (o desaparece) y la prueba NO CORRE. El 26-sep
 *     los dos worktrees de /tmp seguían ahí con los archivos dentro, pero ya no colgaban de
 *     ningún `.git`: `prueba-gemelo-completa`, `prueba-robots` y `medir-cpu` reventaban con
 *     "fatal: not a git repository" antes de la primera aserción;
 *   - la carpeta sigue ahí pero con una copia VIEJA, y entonces la prueba pasa sobre código
 *     que no es el que se va a desplegar. Esta es la peor de las dos, porque se ve igual que
 *     un verde legítimo.
 *
 * Por eso ahora se busca dentro del repositorio, nunca fuera. El repositorio se resuelve
 * desde el propio archivo de prueba (`RAIZ_WORKTREE`), así que no hay ninguna ruta de
 * máquina escrita a mano: los worktrees cuelgan todos del mismo `.git` y comparten la base
 * de objetos, así que desde cualquiera de ellos se llega a los demás y al historial.
 *
 * DOS BÚSQUEDAS DISTINTAS, y confundirlas es justo el error que esto evita:
 *
 *   `rutaEnElRepo(rel, env)`     para el código que vive en la MISMA rama que las pruebas o
 *                                en una sola de las carpetas. Busca el archivo en los
 *                                worktrees y devuelve la ruta. Si lo encuentra en más de uno
 *                                CON CONTENIDOS DISTINTOS, no adivina: se planta y los
 *                                muestra. Adivinar ahí es exactamente el falso verde de
 *                                arriba.
 *
 *   `fuenteEnLaRama(rel, rama)`  para el código que vive en OTRA rama. `spindlelab-astro/`
 *                                se despliega desde `main` y las pruebas viven en otra rama:
 *                                el 26-sep había CUATRO copias de
 *                                `spindlelab-astro/functions/api/chequeo.js` en los
 *                                worktrees del repo y las cuatro eran distintas (f5fc8e6 en
 *                                main, 5afdb34 en el worktree de las pruebas, 25efc8f en el
 *                                de Verifica y Cumple, 582e601 en otro). Elegir "la
 *                                primera que exista" habría cambiado en silencio el archivo
 *                                bajo prueba. Acá manda la RAMA, no la carpeta.
 *
 * Y siempre se IMPRIME de dónde salió, con su hash. Una prueba que no dice qué archivo cargó
 * no permite descubrir que cargó el equivocado.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

// La raíz del worktree donde vive esta carpeta de pruebas.
export const RAIZ_WORKTREE = fileURLToPath(new URL('../../../', import.meta.url));

function git(args, binario = false) {
  return execFileSync('git', ['-C', RAIZ_WORKTREE, ...args],
    binario ? {} : { encoding: 'utf8' });
}

/** Todos los worktrees del repositorio, empezando por el que contiene esta prueba. */
function worktrees() {
  const otros = [];
  try {
    for (const linea of git(['worktree', 'list', '--porcelain']).split('\n')) {
      if (linea.startsWith('worktree ')) otros.push(linea.slice(9).trim());
    }
  } catch { /* sin git igual se intenta el worktree propio */ }
  return [RAIZ_WORKTREE, ...otros.filter((w) => path.resolve(w) !== path.resolve(RAIZ_WORKTREE))];
}

/** El hash del contenido de un archivo en disco, para poder compararlo con el de git. */
function hashDeArchivo(ruta) {
  try { return execFileSync('git', ['hash-object', ruta], { encoding: 'utf8' }).trim(); }
  catch { return null; }
}

/**
 * @param {string} rel  ruta del archivo dentro del repo, p. ej.
 *                      'verificaycumple/functions/api/profundo.js'
 * @param {string} env  nombre de la variable de entorno que la puede forzar
 */
export function rutaEnElRepo(rel, env) {
  if (process.env[env] && fs.existsSync(process.env[env])) {
    console.log(`  (código: ${process.env[env]} — forzado con ${env})`);
    return process.env[env];
  }
  // VYC_SITIO es el convenio de `prueba-portada-doce.mjs`: la carpeta `verificaycumple/`.
  if (process.env.VYC_SITIO && rel.startsWith('verificaycumple/')) {
    const c = path.join(process.env.VYC_SITIO, rel.slice('verificaycumple/'.length));
    if (fs.existsSync(c)) { console.log(`  (código: ${c} — forzado con VYC_SITIO)`); return c; }
  }

  const candidatas = worktrees().map((w) => path.join(w, rel)).filter((c) => fs.existsSync(c));
  if (!candidatas.length) {
    console.error(
      `\nNo encuentro ${rel} en ningún worktree de ${RAIZ_WORKTREE}.\n` +
      `Lo busqué en:\n${worktrees().map((w) => '  - ' + path.join(w, rel)).join('\n')}\n` +
      `Pásalo con ${env}=/ruta/al/repo/${rel}\n`);
    process.exit(2);
  }

  // Varias copias con el MISMO contenido es normal (dos worktrees en el mismo commit) y no
  // tiene nada de ambiguo. Varias copias DISTINTAS sí: ahí elegir la primera es elegir a
  // ciegas, y se ve igual que haber elegido bien.
  const porHash = new Map();
  for (const c of candidatas) porHash.set(hashDeArchivo(c) || c, c);
  if (porHash.size > 1) {
    console.error(
      `\n${rel} aparece en más de un worktree y las copias NO son iguales.\n` +
      [...porHash].map(([h, c]) => `  - ${String(h).slice(0, 10)}  ${c}`).join('\n') + '\n' +
      `No adivino cuál es la que se prueba: elegir la primera es elegir a ciegas.\n` +
      `Dilo con ${env}=/ruta/al/repo/${rel}, o usa fuenteEnLaRama() si el archivo\n` +
      `pertenece a una rama concreta (ver el comentario de arriba en rutas.mjs).\n`);
    process.exit(2);
  }
  const elegida = candidatas[0];
  console.log(`  (código: ${elegida})`);
  return elegida;
}

/**
 * El código que vive en OTRA rama, leído de git.
 *
 * Devuelve el texto. Si alguno de los worktrees tiene en disco exactamente ese contenido, se
 * informa además su ruta, que sirve para abrirlo y para leer una traza de error; pero quien
 * manda es la rama, y si ningún worktree la tiene puesta el texto igual sale (de la base de
 * objetos, sin escribir nada en disco).
 *
 * @param {string} rel   ruta dentro del repo
 * @param {string} rama  'main', por ejemplo. Se prueba también `origin/<rama>`.
 * @param {string} env   variable de entorno que fuerza un archivo concreto
 * @returns {{ texto: string, ruta: string|null, origen: string }}
 */
export function fuenteEnLaRama(rel, rama, env) {
  if (process.env[env] && fs.existsSync(process.env[env])) {
    const ruta = process.env[env];
    console.log(`  (código: ${ruta} — forzado con ${env})`);
    return { texto: fs.readFileSync(ruta, 'utf8'), ruta, origen: `${env}` };
  }

  let blob = null, refUsada = null;
  for (const ref of [rama, `origin/${rama}`]) {
    try { blob = git(['rev-parse', '--verify', `${ref}:${rel}`]).trim(); refUsada = ref; break; }
    catch { /* la siguiente */ }
  }
  if (!blob) {
    console.error(
      `\nNo encuentro ${rel} en la rama ${rama} (ni en origin/${rama}).\n` +
      `Repositorio: ${RAIZ_WORKTREE}\n` +
      `Pásalo con ${env}=/ruta/al/archivo\n`);
    process.exit(2);
  }

  const enDisco = worktrees().map((w) => path.join(w, rel))
    .find((c) => fs.existsSync(c) && hashDeArchivo(c) === blob) || null;
  const texto = git(['cat-file', 'blob', blob], true).toString('utf8');
  console.log(enDisco
    ? `  (código: ${enDisco} — es ${refUsada}:${rel}, blob ${blob.slice(0, 10)})`
    : `  (código: ${refUsada}:${rel}, blob ${blob.slice(0, 10)} — de git, ningún worktree lo tiene puesto)`);
  return { texto, ruta: enDisco, origen: `${refUsada}:${rel}` };
}

/**
 * Importa lo que devolvió `fuenteEnLaRama`. Si ese contenido está en disco se importa por
 * ruta —las trazas de error se leen, que con un `data:` de 60 KB no pasa—, y si no, como
 * `data:`, sin escribir nada.
 *
 * pathToFileURL: la carpeta del repositorio principal tiene espacios en el nombre (está en
 * iCloud Drive) y un specifier con espacios no es una URL válida.
 */
export async function moduloDe({ texto, ruta }) {
  if (ruta) return import(pathToFileURL(ruta).href);
  return import('data:text/javascript;base64,' + Buffer.from(texto, 'utf8').toString('base64'));
}

/** El código de otra rama, ya importado como módulo. */
export async function moduloEnLaRama(rel, rama, env) {
  return moduloDe(fuenteEnLaRama(rel, rama, env));
}

/**
 * Una versión VIEJA, de un commit concreto del historial. Es lo que comparan
 * `prueba-gemelo-completa`, `prueba-robots` y `medir-cpu`: el chequeo de hoy contra el de
 * antes de "El chequeo de /diagnostico/ deja de inventar informes".
 *
 * El commit se resuelve desde el repositorio de la propia prueba. Todos los worktrees
 * comparten la base de objetos, así que no hace falta saber en qué carpeta está la rama.
 */
export function fuenteEnElCommit(rel, commit) {
  let texto;
  try { texto = git(['show', `${commit}:${rel}`], true).toString('utf8'); }
  catch (e) {
    console.error(
      `\nNo puedo leer ${rel} en el commit ${commit}.\n` +
      `Repositorio: ${RAIZ_WORKTREE}\n${String(e.stderr || e.message || e)}\n`);
    process.exit(2);
  }
  console.log(`  (versión vieja: ${commit.slice(0, 10)}:${rel})`);
  return texto;
}

/** La versión vieja, ya importada. Se importa como `data:` para no escribir nada en disco. */
export async function moduloEnElCommit(rel, commit) {
  const texto = fuenteEnElCommit(rel, commit);
  return import('data:text/javascript;base64,' + Buffer.from(texto, 'utf8').toString('base64'));
}

/**
 * El banco de mediciones. Vive fuera del repo a propósito (son miles de archivos de una
 * sesión de trabajo), así que acá no se adivina nada: si no está, la prueba NO corre. Antes
 * el defecto era la carpeta de scratchpad de una sesión concreta, que se borra sola.
 */
export function bancoDeMediciones(env = 'PROFUNDO_DATOS') {
  const candidatas = [
    process.env[env],
    path.join(RAIZ_WORKTREE, 'laboratorio/01-cumplimiento-ley-21719/pruebas/banco'),
  ].filter(Boolean);
  for (const c of candidatas) {
    if (fs.existsSync(c)) { console.log(`  (banco: ${c})`); return c; }
  }
  console.error(
    `\nNo encuentro el banco de mediciones (ev0/ev1/ev2).\n` +
    `Lo busqué en:\n${candidatas.map((c) => '  - ' + c).join('\n')}\n` +
    `Es una carpeta de trabajo, no está versionada, y se rehace midiendo de nuevo.\n` +
    `Si la tienes en otro lado: ${env}=/ruta/al/banco node <prueba>.mjs\n` +
    `Sin banco esta prueba no corre. No se salta en silencio: un verde sin estas\n` +
    `comprobaciones no significa lo mismo.\n`);
  process.exit(2);
}
