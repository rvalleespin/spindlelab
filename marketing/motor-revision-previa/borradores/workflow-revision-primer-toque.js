export const meta = {
  name: 'revision-independiente-borradores-primer-toque',
  description: 'Un lector independiente por borrador de primer toque: contrasta cada frase con los hechos verificados, la fuente del correo, la voz de SpindleLab y el criterio de corte de Ramón',
  phases: [{ title: 'Leer', detail: 'un revisor con contexto limpio por borrador' }],
}

// args: { ids: [..], borradores: ruta al json de borradores, verificacion: ruta al json de verificacion, contactos: ruta a contactos.csv, entrada: ruta a entrada.csv, medicion: carpeta con las fichas y capturas }
const BASE = '/home/user/spindlelab/marketing/motor-revision-previa'
const SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    veredicto: { type: 'string', enum: ['ok', 'ajustar', 'no_enviar'] },
    problemas: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          tipo: { type: 'string', enum: ['hecho_no_respaldado', 'afirma_de_mas', 'tono_o_voz', 'regla_dura', 'fuente_o_baja', 'destinatario', 'claridad_para_quien_decide', 'criterio_de_corte', 'otro'] },
          frase: { type: 'string', description: 'La frase exacta del borrador que tiene el problema' },
          por_que: { type: 'string' },
          correccion: { type: 'string', description: 'Cómo dejarla (texto propuesto)' },
        },
        required: ['tipo', 'frase', 'por_que', 'correccion'],
      },
    },
    comentario: { type: 'string', description: 'Una o dos frases: si tú fueras el dueño del sitio, qué harías al leerlo' },
  },
  required: ['id', 'veredicto', 'problemas', 'comentario'],
}

const prompt = (id) => `Eres un lector independiente y crítico de correos comerciales en frío para SpindleLab (consultora chilena de SEO técnico, visibilidad en IA y cumplimiento web). No escribiste este borrador y no conoces el razonamiento de quien lo escribió: lees lo que dice el papel. Tu trabajo es encontrar lo que un dueño de negocio o un jefe de marketing chileno notaría mal, y lo que sería falso, exagerado o de mala educación.

Este correo es un PRIMER TOQUE: SpindleLab nunca le ha escrito a esta persona (se comprobó en Gmail: sin correos enviados, recibidos ni borradores). No hay puente ni "te escribí antes". El correo abre con un hallazgo concreto, verificado y comprobable en 30 segundos por el dueño del sitio. Ramón Vallejos (el remitente) aprueba y envía cada correo a mano; tú no envías nada ni creas borradores ni tocas Gmail.

LEE (solo lectura, con la herramienta Read):
1. El borrador: ${args.borradores} (arreglo; toma el objeto con "id" = "${id}"). Lo que se envía es "cuerpo" (lista de párrafos, el primero es el saludo) más "baja" (línea de baja al final) y "asunto". "notas" son las notas internas de quien lo escribió: léelas al final, después de formarte tu propia opinión.
2. Los hechos verificados por dos revisores independientes: ${args.verificacion} (arreglo; objeto con "id" = "${id}"). Campos: hechos (lo que cada revisor puede afirmar), advertencias (lo que NO se debe afirmar), cookies_medicion_en_ambos (para C1: las cookies que vieron los DOS revisores), final.
3. La fuente de la dirección: ${args.contactos} (columnas dominio, correo_principal, pagina = la URL donde el sitio publica ese correo) y ${args.entrada} (empresa, dominio, email, tipo = rol|personal, fuente). La línea de baja dice "Saqué tu correo del sitio de ustedes": comprueba que ese correo está realmente publicado por el propio sitio (columna pagina) y que la frase es verdadera para este destinatario.
4. Las capturas del motor, si dudas de un hecho: ${args.medicion}/${id}/r1-A.jpg y r1-B.jpg (antes y después del primer gesto), con Read.
5. La voz de la marca: /home/user/spindlelab/.claude/skills/voz-spindlelab/SKILL.md (lee también los textos de referencia que cite) y /home/user/spindlelab/marketing/brand/manual-de-marca.md (solo voz y reglas de redacción).
6. Las reglas de correos en frío: /home/user/spindlelab/marketing/estrategia-marketing-spindlelab.md (Grep: "150 palabras", "toque", "baja", "catch-all", "protección de datos", "consecuencia"); los precios y alcance permitidos en /home/user/spindlelab/marketing/capacidad-servicios.md; y el criterio de corte y las trampas de medición de Ramón: /home/user/spindlelab/marketing/encargos-otras-sesiones/estrategia-outbound-verifica-y-cumple.md, secciones 9, 11 y 14 (lee la 14 entera).

REVISA, frase por frase:
- HECHOS: cada afirmación sobre el sitio debe estar respaldada por "hechos" y no chocar con "advertencias". Marca afirma_de_mas cualquier cosa que vaya más allá: decir que "no tienen política" cuando solo se miró la portada; decir que Google o Meta "reciben" la visita (la medición prueba cookies escritas, no envío de datos); decir que "no hay aviso de cookies" sin que ambos revisores lo hayan visto en la captura de los DOS tramos; nombrar una cookie que no vieron ambos revisores; decir que el formulario pide teléfono si solo pide correo, o al revés; ubicar el formulario "en la primera pantalla" si está al final.
- CRITERIO DE CORTE de Ramón (14-oct, sección 14): se escribe todo hecho verdadero, comprobable en 30 segundos por el dueño y RELEVANTE PARA ÉL. No se escribe si no hay una consecuencia que el dueño sienta (solo Analytics, sin formularios, sin grabación de sesión y sin publicidad). Si ves que este correo es de ese tipo, marca criterio_de_corte y explica.
- DESTINATARIO: saludo coherente con el nombre real (no inventes nombres; con una inicial + apellido el saludo correcto es "Hola:"), derivación "¿con quién lo hablo?" presente, línea de baja con la fuente correcta. Si el correo es de un buzón de rol (columna tipo = rol), comprueba que el texto funciona para quien lo lea sin conocer a Ramón. Si la empresa PARECE vender protección de datos, privacidad, ciberseguridad o cumplimiento de la ley de datos (compétidor), eso es no_enviar.
- REGLAS DURAS: menos de 150 palabras sin el saludo; sin raya larga (—); sin signos de exclamación; sin nombres técnicos de cookies ni jerga (píxel, tramo, plugin, GA4); sin afirmar lo que la ley exige ni citar leyes (la frase "conforme a la ley" que cita el SITIO puede mencionarse como lo que el sitio dice, pero SpindleLab no cita leyes); sin garantías; singular para lo observado ("entré", "revisé"); asunto en minúsculas y específico; menciona la llamada de 20 minutos; el precio es el del kit Verifica y Cumple, $149.000 + IVA, SIN la palabra "desde" y SIN plazo (decisión de Ramón del 19-oct; el plazo "dos o tres días" no está confirmado y no debe aparecer en correos nuevos); para Desarrollo Web solo "precios de referencia en spindlelab.cl", sin cifra.
- CLARIDAD PARA QUIEN DECIDE: ¿lo entiende un encargado de marketing o un gerente sin saber de programación? ¿La consecuencia viene antes que la mecánica? ¿Hay alguna frase que suene a folleto o a IA ("soluciones", "impulsa", "en el mundo actual", pares retóricos "no es X, es Y")?
- TONO: se parece a los textos de referencia de Ramón, es directo, no presiona, no suena a plantilla masiva. Un primer toque a un desconocido debe ser más corto y más cuidadoso que un seguimiento.

Sé específico y breve. Si el borrador está bien, di "ok" sin inventar problemas. "ajustar" = hay correcciones concretas que lo dejan listo. "no_enviar" = hay una afirmación falsa, una identidad dudosa, un competidor o un riesgo que no se arregla con una frase.`

phase('Leer')
const ids = args.ids
const res = await parallel(ids.map((id) => () => agent(prompt(id), { label: `lector-${id}`, phase: 'Leer', schema: SCHEMA })))
const ok = res.filter(Boolean)
const resumen = { ok: 0, ajustar: 0, no_enviar: 0 }
ok.forEach((r) => { resumen[r.veredicto]++ })
log(`ok ${resumen.ok}, ajustar ${resumen.ajustar}, no_enviar ${resumen.no_enviar}; ${ids.length - ok.length} sin respuesta`)
return { resumen, revisiones: ok }
