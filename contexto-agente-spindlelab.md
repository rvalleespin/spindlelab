# Contexto SpindleLab — brief para agente de Claude Code

## Quién es el usuario
Ramón Vallejos Espíndola (manuvalleespin@gmail.com), Chile. Está lanzando **SpindleLab**, consultoría unipersonal de SEO técnico + visibilidad en motores de IA (AEO/GEO) para empresas B2B y financieras chilenas (fintechs, asesoras de inversión — sector YMYL). Opera bajo marca separada de su nombre por discreción frente a su empleador actual (Maggiore); en el sitio NO aparece su nombre ni foto ("consultor anónimo", primera persona singular). No es desarrollador: explicarle los pasos técnicos de forma simple y ejecutar por él lo que se pueda.

## El negocio
- Método propio: «Workflow de Auditoría SEO + Visibilidad en IA» v2.1 (Fase 0 prospección → Capa 0 intake → Capa 1 auditoría técnica → Capa 2 visibilidad IA → Capa 3 entregable).
- Oferta de entrada: mini-diagnóstico gratis de 1 página en 48 h → llamada de 20 min. Sin precios públicos (auditoría desde $350k CLP, retainer desde $500k/mes — solo se conversan en llamada).
- Caso validado: simpletrust.cl. Prospección activa en Apollo.io (nicho servicios financieros Chile).
- El sitio web es prerrequisito para iniciar el envío de mails de Fase 0.

## Estado de la infraestructura (al 5 jul 2026)
- **Dominio:** spindlelab.cl inscrito en NIC Chile a nombre de Ramón (creado 3 jul 2026, expira jul 2028). Nameservers apuntados a Cloudflare: `lennon.ns.cloudflare.com` y `marjory.ns.cloudflare.com` (whois confirmado). Zona ACTIVA en Cloudflare (correo de activación recibido).
- **Cloudflare:** cuenta manuvalleespin@gmail.com, Account ID `112fd68506c4a4f40ed1c8eacaf8cf71`, Zone ID `cdb4979a227aaa13ede9322b60fde204`, plan Free. Políticas de bots IA: Search/Agent/Training = Allow, sin bloqueo en robots.txt (decisión deliberada: su negocio es visibilidad en IA).
- **Deploy en curso:** proyecto Cloudflare Pages `spindlelab` vía "Drag and drop" (subida directa, sin Git aún). Carpeta lista: `spindlelab-site/` con `index.html`.
- **GitHub:** el usuario tiene cuenta; plan futuro = repo `spindlelab` conectado a Pages para republicación automática.

## Pendientes inmediatos
1. Completar deploy en Pages (drag & drop de `spindlelab-site/`).
2. Custom domains en el proyecto Pages: `spindlelab.cl` y `www.spindlelab.cl`.
3. Email Routing en Cloudflare: `hola@spindlelab.cl` → reenvío a manuvalleespin@gmail.com (requiere verificación del Gmail).
4. Antes de producción definitiva: descargar las 2 imágenes de Unsplash y servirlas localmente; favicon; imagen og:image.
5. Futuro: migrar deploy a GitHub → Pages; Search Console; actualizar Context Center de Apollo al nombre SpindleLab.

## Archivos clave (carpeta de proyecto "OPTIMIZACIÓN SEO SIMPLYTRUST")
- `spindle-landing.html` — fuente de verdad del sitio (single-file: HTML+CSS inline).
- `spindlelab-site/index.html` — copia para deploy (regenerar desde el anterior tras cada cambio).
- `prompt-diseno-claude.md` — prompt e instrucciones para iterar diseño en claude.ai (artifacts).
- `Workflow-SEO-IA-v2.docx`, `Mini-Diagnostico-SimpleTrust.docx`, `fase0-mensajes-top10-financieros.md` — material del método y prospección.

## Especificaciones del sitio
- **Landing one-page es-CL.** Secciones: hero → banda pregunta → servicios (3) → método (4 pasos) → por qué SpindleLab → CTA contacto → footer.
- **Dirección de diseño ("solidez cercana"):** un CEO debe pensar "confío en él y además se entiende lo que dice". Minimalista editorial, sobrio pero humano. Fotografía de autor + elementos geométricos abstractos sutiles (nada de robots/cerebros IA). Micro-animaciones discretas solamente.
- **Paleta:** navy #0E2A47, petróleo #0F766E, dorado #C9A227, papel #F7F5F0, tinta #131A22.
- **Tipografías:** Fraunces (títulos) + Inter (texto), Google Fonts.
- **Restricciones técnicas:** single-file, sin frameworks; mantener intactos canonical, Open Graph, JSON-LD (ProfessionalService) del `<head>`; HTML semántico (1 solo h1, jerarquía correcta, alt en imágenes); responsive; performance ejemplar — el sitio es la credencial de un consultor SEO técnico.
- **CTA único:** mailto a hola@spindlelab.cl (mini-diagnóstico gratis). Sin precios.

## Referentes de diseño acordados (usar el mecanismo, no copiar)
anthropic.com (serifa editorial + IA sin clichés), stripe.com (micro-interacciones), ia.net (disciplina tipográfica), craigmod.com (fotografía + primera persona), fintual.cl (cercanía en finanzas chilenas), pentagram.com (grillas para futuros casos).
