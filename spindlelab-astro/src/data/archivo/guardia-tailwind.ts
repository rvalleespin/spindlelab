// GUARDIA DEL CSS DE PRODUCCIÓN (obra E12, corrida 2; desvios.md, tanda 4). No lo importa nadie: existe para que
// Tailwind lo lea.
//
// tailwind.config.mjs (que esta obra no toca) arma el CSS que comparten las páginas publicadas (/ y /nosotros/) con
// TODAS las palabras de los .astro, .ts y .js de src/, también las de un comentario. Las páginas v3 de driftime decían
// algunas palabras que son clases de Tailwind, y esas clases están hoy en el CSS publicado. Cuando una página de A
// reemplaza a una de driftime, su palabra se va con ella: la clase sale del CSS, el archivo cambia de nombre y las dos
// páginas publicadas dejan de ser iguales byte a byte (lo detecta comparar-produccion.mjs).
//
// Aquí queda cada palabra que se perdió así, con la página de la que venía. Se borra de esta lista solo el día que se
// publique el v3 y se rehaga la línea base.
//   · flex-grow: src/pages/v3/servicios/desarrollo-web.astro de driftime (un comentario de su galería), tanda 4.
//   · border-collapse, collapse, italic, static: src/pages/v3/blog/[slug].astro de driftime (su <style>), tanda 5.
//   · outline: src/pages/v3/blog/index.astro de driftime (su <style>), tanda 5.
//   · text-wrap: los <style> de método, nosotros y el blog de driftime, tanda 5.
export const PALABRAS = ['flex-grow', 'border-collapse', 'collapse', 'italic', 'static', 'outline', 'text-wrap'];
